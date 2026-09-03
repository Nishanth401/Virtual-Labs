"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  GitBranch, 
  ArrowDown, 
  Layers 
} from "lucide-react";

export interface TreeNodeData {
  id: number;
  parentId: number | null;
  label: string;
  params?: Record<string, any>;
  returnValue?: any;
  isBaseCase?: boolean;
  phase?: "calling" | "returning" | "completed";
}

interface RecursionTreeEngineProps {
  nodes: TreeNodeData[];
  currentNodeId: number | null;
  executionPhase: "calling" | "returning" | null;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const NODE_H = 42;
const NODE_PAD_X = 22;
const LEVEL_GAP_Y = 64;
const SIBLING_GAP = 24;
const RETURN_TAG_H = 20;

function measureTextWidth(text: string) {
  return text.length * 8.0 + NODE_PAD_X * 2;
}

function getNodeLabel(node: TreeNodeData): string {
  if (!node.params || Object.keys(node.params).length === 0) return node.label;
  const fnName = node.label.split("(")[0] || "call";
  const vals = Object.entries(node.params).map(([_, v]) => {
    if (Array.isArray(v)) return v.length > 3 ? `[${v.slice(0, 2).join(",")},..]` : `[${v.join(",")}]`;
    if (typeof v === "boolean") return v ? "T" : "F";
    return String(v);
  });
  const str = vals.join(", ");
  const truncated = str.length > 20 ? str.slice(0, 18) + ".." : str;
  return `${fnName}(${truncated})`;
}

interface PositionedNode extends TreeNodeData {
  x: number;
  y: number;
  w: number;
  displayLabel: string;
}

interface TreeEdge {
  parentId: number;
  childId: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function layoutTree(root: (TreeNodeData & { children: any[] }) | null) {
  if (!root) return { positioned: [], edges: [], width: 0, height: 0 };

  const subtreeWidth: Record<number, number> = {};

  const computeWidth = (node: any): number => {
    const label = getNodeLabel(node);
    const nodeW = Math.max(90, measureTextWidth(label));
    const children = node.children ?? [];
    if (children.length === 0) {
      subtreeWidth[node.id] = nodeW;
      return nodeW;
    }
    const childWidths = children.map(computeWidth);
    const totalChildSpan = childWidths.reduce((a, b) => a + b, 0) + SIBLING_GAP * (children.length - 1);
    subtreeWidth[node.id] = Math.max(nodeW, totalChildSpan);
    return subtreeWidth[node.id];
  };

  computeWidth(root);

  const positioned: PositionedNode[] = [];
  const edges: TreeEdge[] = [];

  const assign = (node: any, cx: number, depth: number) => {
    const label = getNodeLabel(node);
    const nodeW = Math.max(90, measureTextWidth(label));
    const y = depth * (NODE_H + RETURN_TAG_H + LEVEL_GAP_Y);

    positioned.push({
      ...node,
      x: cx,
      y,
      w: nodeW,
      displayLabel: label
    });

    const children = node.children ?? [];
    if (children.length === 0) return;

    const childWidths = children.map((c: any) => subtreeWidth[c.id]);
    const totalChildSpan = childWidths.reduce((a: number, b: number) => a + b, 0) + SIBLING_GAP * (children.length - 1);

    let startX = cx - totalChildSpan / 2;
    children.forEach((child: any, i: number) => {
      const childCx = startX + childWidths[i] / 2;
      const childY = (depth + 1) * (NODE_H + RETURN_TAG_H + LEVEL_GAP_Y);
      edges.push({
        parentId: node.id,
        childId: child.id,
        x1: cx,
        y1: y + NODE_H,
        x2: childCx,
        y2: childY
      });
      assign(child, childCx, depth + 1);
      startX += childWidths[i] + SIBLING_GAP;
    });
  };

  assign(root, subtreeWidth[root.id] / 2, 0);

  let minX = Infinity, maxX = -Infinity, maxY = 0;
  positioned.forEach(n => {
    const halfW = n.w / 2;
    if (n.x - halfW < minX) minX = n.x - halfW;
    if (n.x + halfW > maxX) maxX = n.x + halfW;
    if (n.y + NODE_H + RETURN_TAG_H > maxY) maxY = n.y + NODE_H + RETURN_TAG_H;
  });

  const PAD = 50;
  positioned.forEach(n => { n.x -= minX - PAD; n.y += PAD; });
  edges.forEach(e => { e.x1 -= minX - PAD; e.x2 -= minX - PAD; e.y1 += PAD; e.y2 += PAD; });

  return {
    positioned,
    edges,
    width: Math.max(300, maxX - minX + PAD * 2),
    height: Math.max(250, maxY + PAD * 2)
  };
}

export function RecursionTreeEngine({
  nodes,
  currentNodeId,
  executionPhase,
  isExpanded = false,
  onToggleExpand
}: RecursionTreeEngineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Build tree hierarchy
  const treeData = useMemo(() => {
    if (!nodes || nodes.length === 0) return null;

    const map: Record<number, TreeNodeData & { children: any[] }> = {};
    nodes.forEach(n => {
      map[n.id] = { ...n, children: [] };
    });

    let root: (TreeNodeData & { children: any[] }) | null = null;
    nodes.forEach(n => {
      if (n.parentId === null) {
        root = map[n.id];
      } else if (map[n.parentId]) {
        map[n.parentId].children.push(map[n.id]);
      }
    });

    return root;
  }, [nodes]);

  const { positioned, edges, width: treeW, height: treeH } = useMemo(() => {
    return layoutTree(treeData);
  }, [treeData]);

  // Auto-fit on initial load or node changes
  useEffect(() => {
    if (!containerRef.current || treeW === 0) return;
    const availW = containerRef.current.clientWidth;
    const availH = containerRef.current.clientHeight || 400;
    const fitScale = Math.min(1.1, Math.max(0.4, Math.min((availW - 40) / treeW, (availH - 40) / treeH)));
    setScale(fitScale);
    setPan({
      x: Math.max(20, (availW - treeW * fitScale) / 2),
      y: 20
    });
  }, [treeW, treeH, isExpanded]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className={`flex flex-col h-full bg-card rounded-2xl border border-border/80 overflow-hidden shadow-xs relative ${isExpanded ? "fixed inset-4 z-50 shadow-2xl bg-card" : ""}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b border-border/70">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-bold text-foreground font-heading">
            Recursion Call Tree Visualizer
          </span>
          <Badge variant="outline" className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            {nodes.length} Nodes
          </Badge>
        </div>

        {/* Pan / Zoom / Fullscreen controls */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setScale(s => Math.min(2, s + 0.15))}
            className="h-7 w-7 p-0"
            title="Zoom In"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setScale(s => Math.max(0.3, s - 0.15))}
            className="h-7 w-7 p-0"
            title="Zoom Out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (containerRef.current) {
                const availW = containerRef.current.clientWidth;
                const fitScale = Math.min(1, Math.max(0.5, (availW - 40) / treeW));
                setScale(fitScale);
                setPan({ x: Math.max(20, (availW - treeW * fitScale) / 2), y: 20 });
              }
            }}
            className="h-7 w-7 p-0"
            title="Reset View"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>

          {onToggleExpand && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpand}
              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
              title={isExpanded ? "Collapse View" : "Fullscreen Tree"}
            >
              {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </Button>
          )}
        </div>
      </div>

      {/* SVG Canvas with Pan/Zoom */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex-1 w-full overflow-hidden bg-slate-950/40 cursor-grab active:cursor-grabbing min-h-[380px] relative select-none"
      >
        {nodes.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2">
            <Layers className="h-8 w-8 opacity-40 animate-pulse" />
            <p className="text-xs font-mono">No active recursion tree. Run an algorithm to visualize branching.</p>
          </div>
        ) : (
          <svg
            width={treeW}
            height={treeH}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
              transformOrigin: "top left",
              transition: isDragging ? "none" : "transform 0.15s ease-out"
            }}
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
              </linearGradient>
              <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Tree Edges (Connectors) */}
            {edges.map((e, idx) => {
              const midY = (e.y1 + e.y2) / 2;
              const pathD = `M ${e.x1} ${e.y1} C ${e.x1} ${midY}, ${e.x2} ${midY}, ${e.x2} ${e.y2}`;

              return (
                <path
                  key={`edge-${idx}`}
                  d={pathD}
                  fill="none"
                  stroke="url(#edgeGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="opacity-80"
                />
              );
            })}

            {/* Tree Nodes */}
            {positioned.map((n) => {
              const isActive = n.id === currentNodeId;
              const isCalling = isActive && executionPhase === "calling";
              const isReturning = isActive && executionPhase === "returning";
              const isBase = n.isBaseCase;

              let bgColor = "#1e293b";
              let strokeColor = "#334155";
              let textColor = "#f1f5f9";

              if (isCalling) {
                bgColor = "#d97706";
                strokeColor = "#fbbf24";
                textColor = "#ffffff";
              } else if (isReturning) {
                bgColor = "#059669";
                strokeColor = "#34d399";
                textColor = "#ffffff";
              } else if (n.returnValue !== undefined) {
                bgColor = "#1e3a8a";
                strokeColor = "#3b82f6";
              } else if (isBase) {
                bgColor = "#065f46";
                strokeColor = "#10b981";
              }

              return (
                <g key={`node-${n.id}`} className="transition-all duration-200">
                  {/* Active glowing ring */}
                  {isActive && (
                    <rect
                      x={n.x - n.w / 2 - 4}
                      y={n.y - 4}
                      width={n.w + 8}
                      height={NODE_H + 8}
                      rx="16"
                      fill="none"
                      stroke={isReturning ? "#34d399" : "#fbbf24"}
                      strokeWidth="3"
                      filter="url(#nodeGlow)"
                      className="animate-pulse"
                    />
                  )}

                  {/* Main Node Capsule */}
                  <rect
                    x={n.x - n.w / 2}
                    y={n.y}
                    width={n.w}
                    height={NODE_H}
                    rx="12"
                    fill={bgColor}
                    stroke={strokeColor}
                    strokeWidth={isActive ? "2.5" : "1.5"}
                    className="shadow-md"
                  />

                  {/* Base Case indicator dot */}
                  {isBase && (
                    <circle
                      cx={n.x - n.w / 2 + 12}
                      cy={n.y + NODE_H / 2}
                      r="4"
                      fill="#34d399"
                    />
                  )}

                  {/* Function Call Label */}
                  <text
                    x={n.x}
                    y={n.y + NODE_H / 2 + 4}
                    textAnchor="middle"
                    fill={textColor}
                    fontSize="12"
                    fontFamily="monospace"
                    fontWeight={isActive ? "bold" : "600"}
                  >
                    {n.displayLabel}
                  </text>

                  {/* Return value tag below capsule */}
                  {n.returnValue !== undefined && (
                    <g transform={`translate(${n.x}, ${n.y + NODE_H + 4})`}>
                      <rect
                        x="-30"
                        y="0"
                        width="60"
                        height={RETURN_TAG_H - 2}
                        rx="6"
                        fill="#0f766e"
                        stroke="#2dd4bf"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="12"
                        textAnchor="middle"
                        fill="#ccfbf1"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        ➜ {typeof n.returnValue === "object" ? JSON.stringify(n.returnValue) : String(n.returnValue)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-muted/20 border-t border-border/60 text-[11px] font-mono text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span>Active / Calling</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span>Returning Frame</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            <span>Completed Branch</span>
          </div>
        </div>
        <span className="hidden sm:inline text-[10px]">Drag canvas to pan • Use buttons to zoom</span>
      </div>
    </div>
  );
}
