"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Maximize2, Minimize2 } from "lucide-react";

export interface TreeNode {
  id: number;
  parentId: number | null;
  label: string;
  params?: Record<string, any>;
  returned?: boolean;
  returnValue?: any;
  isBaseCase?: boolean;
  children?: TreeNode[];
  x?: number;
  y?: number;
  w?: number;
}

interface RecursionTreeProps {
  nodes: TreeNode[];
  currentNodeId: number | null;
  executionPhase: "calling" | "returning" | "idle";
}

const NODE_H = 46;
const LEVEL_GAP_Y = 65;
const SIBLING_GAP = 24;
const RETURN_TAG_H = 20;

function measureTextWidth(text: string) {
  return text.length * 9.5 + 40;
}

function layoutTree(root: TreeNode | null) {
  if (!root) return { positioned: [], edges: [], width: 0, height: 0 };

  const subtreeWidth: Record<number, number> = {};
  const computeWidth = (node: TreeNode): number => {
    const nodeW = Math.max(75, measureTextWidth(node.label));
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

  const positioned: TreeNode[] = [];
  const edges: { parentId: number; childId: number; x1: number; y1: number; x2: number; y2: number }[] = [];

  const assign = (node: TreeNode, cx: number, depth: number) => {
    const nodeW = Math.max(75, measureTextWidth(node.label));
    const y = depth * (NODE_H + RETURN_TAG_H + LEVEL_GAP_Y);

    positioned.push({ ...node, x: cx, y, w: nodeW });

    const children = node.children ?? [];
    if (children.length === 0) return;

    const childWidths = children.map((c) => subtreeWidth[c.id]);
    const totalChildSpan = childWidths.reduce((a, b) => a + b, 0) + SIBLING_GAP * (children.length - 1);

    let startX = cx - totalChildSpan / 2;
    children.forEach((child, i) => {
      const childCx = startX + childWidths[i] / 2;
      const childY = (depth + 1) * (NODE_H + RETURN_TAG_H + LEVEL_GAP_Y);
      edges.push({ parentId: node.id, childId: child.id, x1: cx, y1: y + NODE_H, x2: childCx, y2: childY });
      assign(child, childCx, depth + 1);
      startX += childWidths[i] + SIBLING_GAP;
    });
  };

  assign(root, subtreeWidth[root.id] / 2, 0);

  let minX = Infinity, maxX = -Infinity, maxY = 0;
  positioned.forEach((n) => {
    const halfW = (n.w || 80) / 2;
    if ((n.x || 0) - halfW < minX) minX = (n.x || 0) - halfW;
    if ((n.x || 0) + halfW > maxX) maxX = (n.x || 0) + halfW;
    if ((n.y || 0) + NODE_H + RETURN_TAG_H > maxY) maxY = (n.y || 0) + NODE_H + RETURN_TAG_H;
  });

  const PAD = 30;
  positioned.forEach((n) => { if (n.x !== undefined) n.x -= minX - PAD; if (n.y !== undefined) n.y += PAD; });
  edges.forEach((e) => { e.x1 -= minX - PAD; e.x2 -= minX - PAD; e.y1 += PAD; e.y2 += PAD; });

  return {
    positioned,
    edges,
    width: maxX - minX + PAD * 2,
    height: maxY + PAD * 2,
  };
}

export function RecursionTree({ nodes, currentNodeId, executionPhase }: RecursionTreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ scale: 1, translateX: 0, translateY: 0 });

  const treeData = useMemo(() => {
    if (!nodes || nodes.length === 0) return null;

    const nodeMap: Record<number, TreeNode> = {};
    nodes.forEach((node) => {
      nodeMap[node.id] = { ...node, children: [] };
    });

    let root: TreeNode | null = null;
    nodes.forEach((node) => {
      if (node.parentId === null) {
        root = nodeMap[node.id];
      } else if (nodeMap[node.parentId]) {
        nodeMap[node.parentId].children?.push(nodeMap[node.id]);
      }
    });

    return root;
  }, [nodes]);

  const { positioned, edges, width: treeW, height: treeH } = useMemo(() => {
    return layoutTree(treeData);
  }, [treeData]);

  useEffect(() => {
    if (!containerRef.current || !treeData || treeW === 0) return;
    const el = containerRef.current;
    const availW = el.clientWidth;
    const availH = el.clientHeight;
    const padding = 20;
    const scaleX = (availW - padding) / (treeW || 1);
    const scaleY = (availH - padding) / (treeH || 1);
    const autoScale = Math.min(1, scaleX, scaleY);
    const scale = autoScale > 0.2 ? autoScale : 0.6;
    const scaledWidth = treeW * scale;
    const translateX = Math.max((availW - scaledWidth) / 2, padding / 2);
    setDimensions({ scale, translateX, translateY: padding / 2 });
  }, [treeData, treeW, treeH]);

  return (
    <div className="flex h-full min-h-[300px] flex-col bg-card/80 backdrop-blur-md relative w-full overflow-hidden shadow-sm border border-border rounded-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 px-4 font-bold text-sm tracking-wide flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4" />
          <span>Recursion Tree</span>
        </div>
        <span className="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full font-mono">
          {nodes.length} calls
        </span>
      </div>

      {/* SVG Canvas Area */}
      <div ref={containerRef} className="flex-1 overflow-auto bg-slate-950/40 p-4 relative min-h-[260px]">
        {treeData && positioned.length > 0 ? (
          <svg width="100%" height="100%" className="block overflow-visible" style={{ minHeight: `${treeH}px` }}>
            <defs>
              <marker
                id="tree-arrow"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#cbd5e1" />
              </marker>
              <marker
                id="tree-arrow-active"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#f59e0b" />
              </marker>
              <filter id="active-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#f59e0b" floodOpacity="0.8" />
              </filter>
            </defs>

            <g transform={`translate(${dimensions.translateX}, ${dimensions.translateY}) scale(${dimensions.scale})`}>
              {/* Edges */}
              {edges.map((e) => {
                const childActive = e.childId === currentNodeId;
                const isCalling = childActive && executionPhase === "calling";
                const isReturning = childActive && executionPhase === "returning";
                const midY = (e.y1 + e.y2) / 2;
                const path = `M ${e.x1} ${e.y1} C ${e.x1} ${midY}, ${e.x2} ${midY}, ${e.x2} ${e.y2}`;

                return (
                  <path
                    key={`edge-${e.childId}`}
                    d={path}
                    fill="none"
                    stroke={isCalling ? "#f59e0b" : isReturning ? "#10b981" : "#94a3b8"}
                    strokeWidth={childActive ? 2.5 : 1.8}
                    markerEnd={childActive ? "url(#tree-arrow-active)" : "url(#tree-arrow)"}
                    className="transition-colors duration-300"
                  />
                );
              })}

              {/* Nodes */}
              {positioned.map((node) => {
                const isActive = node.id === currentNodeId;
                const nodeWidth = Math.max(90, node.w || 90);

                let fill = "#2563eb";
                let stroke = "#1d4ed8";
                if (isActive) {
                  fill = "#2563eb";
                  stroke = "#f59e0b";
                } else if (node.returned) {
                  fill = "#1d4ed8";
                  stroke = "#10b981";
                }

                return (
                  <g
                    key={`node-${node.id}`}
                    transform={`translate(${node.x || 0}, ${node.y || 0})`}
                    filter={isActive ? "url(#active-glow)" : undefined}
                  >
                    <rect
                      x={-nodeWidth / 2}
                      y={0}
                      width={nodeWidth}
                      height={NODE_H}
                      rx={NODE_H / 2}
                      ry={NODE_H / 2}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={isActive ? 3.5 : 1.5}
                      className="transition-all duration-300 shadow-md cursor-pointer"
                    />
                    <text
                      x={0}
                      y={NODE_H / 2 + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ffffff"
                      fontSize="14"
                      fontWeight="800"
                      fontFamily="var(--font-mono)"
                    >
                      {node.label}
                    </text>

                    {/* Return Value Pill */}
                    {node.returned && node.returnValue !== undefined && (
                      <g transform={`translate(0, ${NODE_H + 4})`}>
                        <rect
                          x={-28}
                          y={0}
                          width={56}
                          height={18}
                          rx={9}
                          fill="#ffffff"
                          stroke="#10b981"
                          strokeWidth={1.5}
                        />
                        <text
                          x={0}
                          y={10}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#0f172a"
                          fontSize="10"
                          fontWeight="900"
                        >
                          → {String(node.returnValue)}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        ) : (
          <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-2 text-muted-foreground">
            <GitBranch className="h-8 w-8 text-muted-foreground/40" />
            <p className="text-xs font-bold text-foreground">No recursion tree generated yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
