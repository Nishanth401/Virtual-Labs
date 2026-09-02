"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Play, 
  RotateCcw, 
  Plus, 
  Search, 
  TreePine, 
  Binary, 
  Layers, 
  Info,
  CheckCircle2,
  RefreshCw
} from "lucide-react";

export type TreeSuiteMode = "traversals" | "bst" | "avl" | "heap";

interface TreeNodeData {
  id: string;
  val: number;
  left?: TreeNodeData;
  right?: TreeNodeData;
  bf?: number; // balance factor
  x: number;
  y: number;
}

export function TreeSuiteVisualizer({ defaultMode = "bst" }: { defaultMode?: TreeSuiteMode }) {
  const [mode, setMode] = useState<TreeSuiteMode>(defaultMode);

  // --- TRAVERSALS STATE ---
  const [traversalType, setTraversalType] = useState<"inorder" | "preorder" | "postorder" | "levelorder">("inorder");
  const [traversalVisited, setTraversalVisited] = useState<number[]>([]);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [traversalMessage, setTraversalMessage] = useState<string>("Click 'Run Traversal' to watch step-by-step tree navigation.");

  // --- BST STATE ---
  const [bstRoot, setBstRoot] = useState<number[]>([50, 30, 70, 20, 40, 60, 80]);
  const [bstInputVal, setBstInputVal] = useState<string>("");
  const [bstMessage, setBstMessage] = useState<string>("BST maintains sorted invariant: left < node < right.");

  // --- AVL ROTATIONS STATE ---
  const [avlRotationType, setAvlRotationType] = useState<"LL" | "RR" | "LR" | "RL">("LL");
  const [avlMessage, setAvlMessage] = useState<string>("LL Imbalance detected at node 30 (Balance Factor = +2). Right rotation restores balance.");

  // --- HEAP STATE ---
  const [heapArray, setHeapArray] = useState<number[]>([10, 20, 30, 40, 50, 60, 70]);
  const [heapType, setHeapType] = useState<"min" | "max">("min");
  const [heapMessage, setHeapMessage] = useState<string>("Root element at array index 0. Left child at 2i+1, Right child at 2i+2.");

  // Run Traversal Simulation
  const runTraversal = async (type: "inorder" | "preorder" | "postorder" | "levelorder") => {
    setTraversalVisited([]);
    setActiveNodeId(null);

    // Hardcoded demo sequence corresponding to tree:
    //         50
    //       /    \
    //     30      70
    //    /  \    /  \
    //   20  40  60  80
    let seq: { val: number; id: string }[] = [];
    if (type === "inorder") {
      seq = [
        { val: 20, id: "20" },
        { val: 30, id: "30" },
        { val: 40, id: "40" },
        { val: 50, id: "50" },
        { val: 60, id: "60" },
        { val: 70, id: "70" },
        { val: 80, id: "80" }
      ];
      setTraversalMessage("Inorder (Left ──> Root ──> Right): Yields strictly sorted ascending order.");
    } else if (type === "preorder") {
      seq = [
        { val: 50, id: "50" },
        { val: 30, id: "30" },
        { val: 20, id: "20" },
        { val: 40, id: "40" },
        { val: 70, id: "70" },
        { val: 60, id: "60" },
        { val: 80, id: "80" }
      ];
      setTraversalMessage("Preorder (Root ──> Left ──> Right): Useful for tree cloning and serialization.");
    } else if (type === "postorder") {
      seq = [
        { val: 20, id: "20" },
        { val: 40, id: "40" },
        { val: 30, id: "30" },
        { val: 60, id: "60" },
        { val: 80, id: "80" },
        { val: 70, id: "70" },
        { val: 50, id: "50" }
      ];
      setTraversalMessage("Postorder (Left ──> Right ──> Root): Useful for bottom-up memory deletion.");
    } else {
      seq = [
        { val: 50, id: "50" },
        { val: 30, id: "30" },
        { val: 70, id: "70" },
        { val: 20, id: "20" },
        { val: 40, id: "40" },
        { val: 60, id: "60" },
        { val: 80, id: "80" }
      ];
      setTraversalMessage("Level Order (BFS): Explores nodes horizontal tier by tier using a FIFO queue.");
    }

    for (let i = 0; i < seq.length; i++) {
      const item = seq[i];
      setActiveNodeId(item.id);
      setTraversalVisited((prev) => [...prev, item.val]);
      await new Promise((r) => setTimeout(r, 600));
    }
    setActiveNodeId(null);
  };

  // BST Insert
  const handleBstInsert = () => {
    const val = parseInt(bstInputVal) || Math.floor(Math.random() * 90 + 10);
    if (!bstRoot.includes(val)) {
      setBstRoot([...bstRoot, val]);
      setBstMessage(`Inserted ${val} into BST. Traversed branches according to left < node < right.`);
    } else {
      setBstMessage(`Value ${val} already exists in BST.`);
    }
    setBstInputVal("");
  };

  // BST Search
  const handleBstSearch = () => {
    const val = parseInt(bstInputVal) || 60;
    if (bstRoot.includes(val)) {
      setActiveNodeId(val.toString());
      setBstMessage(`Found ${val} in BST! Traversed O(log n) tree depth.`);
    } else {
      setActiveNodeId(null);
      setBstMessage(`Value ${val} not found in BST.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-mono">
            Module 5
          </Badge>
          <span className="text-sm font-bold text-foreground">Trees &amp; Balanced Trees Studio</span>
        </div>

        <div className="flex items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={mode === "traversals" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("traversals")}
            className="h-7 text-xs font-semibold"
          >
            <TreePine className="h-3.5 w-3.5 mr-1" /> Traversals
          </Button>
          <Button
            variant={mode === "bst" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("bst")}
            className="h-7 text-xs font-semibold"
          >
            <Binary className="h-3.5 w-3.5 mr-1" /> BST Operations
          </Button>
          <Button
            variant={mode === "avl" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("avl")}
            className="h-7 text-xs font-semibold"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" /> AVL Rotations
          </Button>
          <Button
            variant={mode === "heap" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("heap")}
            className="h-7 text-xs font-semibold"
          >
            <Layers className="h-3.5 w-3.5 mr-1" /> Binary Heap &amp; Array
          </Button>
        </div>
      </div>

      {/* VIEW 1: TREE TRAVERSALS */}
      {mode === "traversals" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="flex items-center gap-2">
              {(["inorder", "preorder", "postorder", "levelorder"] as const).map((t) => (
                <Button
                  key={t}
                  variant={traversalType === t ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setTraversalType(t);
                    runTraversal(t);
                  }}
                  className="h-8 text-xs capitalize"
                >
                  {t}
                </Button>
              ))}
            </div>
            <div className="text-xs font-mono text-muted-foreground">
              Visited: <strong className="text-emerald-500">{traversalVisited.join(" ──> ") || "None"}</strong>
            </div>
          </div>

          <Card className="border-border bg-card/80 p-6 flex flex-col items-center">
            {/* SVG Binary Tree Display */}
            <svg className="w-full max-w-lg h-64 overflow-visible">
              {/* Lines */}
              <line x1="250" y1="40" x2="140" y2="100" stroke="currentColor" strokeWidth="2" className="text-border" />
              <line x1="250" y1="40" x2="360" y2="100" stroke="currentColor" strokeWidth="2" className="text-border" />
              <line x1="140" y1="100" x2="80" y2="180" stroke="currentColor" strokeWidth="2" className="text-border" />
              <line x1="140" y1="100" x2="190" y2="180" stroke="currentColor" strokeWidth="2" className="text-border" />
              <line x1="360" y1="100" x2="310" y2="180" stroke="currentColor" strokeWidth="2" className="text-border" />
              <line x1="360" y1="100" x2="420" y2="180" stroke="currentColor" strokeWidth="2" className="text-border" />

              {/* Nodes */}
              {[
                { val: 50, x: 250, y: 40, id: "50" },
                { val: 30, x: 140, y: 100, id: "30" },
                { val: 70, x: 360, y: 100, id: "70" },
                { val: 20, x: 80, y: 180, id: "20" },
                { val: 40, x: 190, y: 180, id: "40" },
                { val: 60, x: 310, y: 180, id: "60" },
                { val: 80, x: 420, y: 180, id: "80" }
              ].map((n) => {
                const isActive = activeNodeId === n.id;
                const isVisited = traversalVisited.includes(n.val);

                return (
                  <g key={n.id} className="cursor-pointer">
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r="20"
                      className={`transition-all duration-300 ${
                        isActive
                          ? "fill-primary stroke-primary stroke-4 filter drop-shadow"
                          : isVisited
                          ? "fill-emerald-500/20 stroke-emerald-500 stroke-2"
                          : "fill-card stroke-border stroke-2"
                      }`}
                    />
                    <text
                      x={n.x}
                      y={n.y + 4}
                      textAnchor="middle"
                      className={`text-xs font-mono font-bold select-none ${
                        isActive ? "fill-primary-foreground" : "fill-foreground"
                      }`}
                    >
                      {n.val}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="w-full max-w-lg mt-4 p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>{traversalMessage}</span>
            </div>
          </Card>
        </div>
      )}

      {/* VIEW 2: BST OPERATIONS */}
      {mode === "bst" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Key..."
                value={bstInputVal}
                onChange={(e) => setBstInputVal(e.target.value)}
                className="w-24 h-9 text-xs"
              />
              <Button size="sm" onClick={handleBstInsert} className="h-9 gap-1 text-xs">
                <Plus className="h-3.5 w-3.5" /> Insert (O(log n))
              </Button>
              <Button variant="outline" size="sm" onClick={handleBstSearch} className="h-9 gap-1 text-xs">
                <Search className="h-3.5 w-3.5" /> Search
              </Button>
            </div>
            <div className="text-xs font-mono text-muted-foreground">
              Elements count: <strong>{bstRoot.length}</strong>
            </div>
          </div>

          <Card className="border-border bg-card/80 p-6 flex flex-col items-center">
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl py-4">
              {bstRoot.map((val) => (
                <div
                  key={val}
                  className={`h-12 w-14 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-xs ${
                    activeNodeId === val.toString()
                      ? "border-primary bg-primary/20 text-primary scale-110 shadow-lg"
                      : "border-border bg-card text-foreground"
                  }`}
                >
                  {val}
                </div>
              ))}
            </div>

            <div className="w-full max-w-lg mt-4 p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>{bstMessage}</span>
            </div>
          </Card>
        </div>
      )}

      {/* VIEW 3: AVL ROTATIONS */}
      {mode === "avl" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="flex items-center gap-2">
              {(["LL", "RR", "LR", "RL"] as const).map((rot) => (
                <Button
                  key={rot}
                  variant={avlRotationType === rot ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setAvlRotationType(rot);
                    if (rot === "LL") setAvlMessage("LL Imbalance: Right rotation on node 30 balances tree with 20 as new root.");
                    else if (rot === "RR") setAvlMessage("RR Imbalance: Left rotation on node 10 balances tree with 20 as new root.");
                    else if (rot === "LR") setAvlMessage("LR Imbalance: Left-Right double rotation restores equilibrium.");
                    else setAvlMessage("RL Imbalance: Right-Left double rotation restores equilibrium.");
                  }}
                  className="h-8 text-xs font-mono font-bold"
                >
                  {rot} Rotation
                </Button>
              ))}
            </div>
            <Badge variant="outline" className="text-xs font-mono bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
              |Balance Factor| ≤ 1
            </Badge>
          </div>

          <Card className="border-border bg-card/80 p-6 flex flex-col items-center">
            {/* Before vs After Rotation Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl py-4">
              <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/5 flex flex-col items-center space-y-2">
                <span className="text-xs font-mono text-rose-500 font-bold uppercase">Before Rotation (Imbalanced)</span>
                <div className="flex flex-col items-center space-y-2 pt-2">
                  <div className="h-10 w-12 rounded-xl border-2 border-rose-500 bg-rose-500/20 flex items-center justify-center font-bold text-xs text-rose-400">
                    30 (BF: +2)
                  </div>
                  <div className="h-10 w-12 rounded-xl border-2 border-border bg-card flex items-center justify-center font-bold text-xs text-foreground mr-10">
                    20 (BF: +1)
                  </div>
                  <div className="h-10 w-12 rounded-xl border-2 border-border bg-card flex items-center justify-center font-bold text-xs text-foreground mr-20">
                    10 (BF: 0)
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col items-center space-y-2">
                <span className="text-xs font-mono text-emerald-500 font-bold uppercase">After {avlRotationType} Rotation (Balanced)</span>
                <div className="flex flex-col items-center space-y-2 pt-2">
                  <div className="h-10 w-12 rounded-xl border-2 border-emerald-500 bg-emerald-500/20 flex items-center justify-center font-bold text-xs text-emerald-400">
                    20 (BF: 0)
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="h-10 w-12 rounded-xl border-2 border-border bg-card flex items-center justify-center font-bold text-xs text-foreground">
                      10
                    </div>
                    <div className="h-10 w-12 rounded-xl border-2 border-border bg-card flex items-center justify-center font-bold text-xs text-foreground">
                      30
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full max-w-lg mt-4 p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>{avlMessage}</span>
            </div>
          </Card>
        </div>
      )}

      {/* VIEW 4: BINARY HEAP & ARRAY REPRESENTATION */}
      {mode === "heap" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="flex items-center gap-2">
              <Button
                variant={heapType === "min" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setHeapType("min");
                  setHeapArray([10, 20, 30, 40, 50, 60, 70]);
                  setHeapMessage("Min-Heap: Root has minimum value (10). Parent <= Children.");
                }}
                className="h-8 text-xs font-mono"
              >
                Min Heap
              </Button>
              <Button
                variant={heapType === "max" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setHeapType("max");
                  setHeapArray([70, 60, 50, 40, 30, 20, 10]);
                  setHeapMessage("Max-Heap: Root has maximum value (70). Parent >= Children.");
                }}
                className="h-8 text-xs font-mono"
              >
                Max Heap
              </Button>
            </div>
            <div className="text-xs font-mono text-muted-foreground">
              Array mapping: <strong>Left = 2i+1, Right = 2i+2</strong>
            </div>
          </div>

          <Card className="border-border bg-card/80 p-6 flex flex-col items-center space-y-6">
            {/* Heap Tree View */}
            <div className="flex flex-col items-center space-y-3">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Hierarchical Tree View
              </span>
              <div className="flex flex-col items-center space-y-3">
                {/* Level 0 */}
                <div className="h-10 w-12 rounded-xl border-2 border-primary bg-primary/20 flex items-center justify-center font-bold text-xs text-primary shadow-md">
                  {heapArray[0]}
                </div>
                {/* Level 1 */}
                <div className="flex items-center gap-12">
                  <div className="h-10 w-12 rounded-xl border-2 border-border bg-card flex items-center justify-center font-bold text-xs text-foreground">
                    {heapArray[1]}
                  </div>
                  <div className="h-10 w-12 rounded-xl border-2 border-border bg-card flex items-center justify-center font-bold text-xs text-foreground">
                    {heapArray[2]}
                  </div>
                </div>
                {/* Level 2 */}
                <div className="flex items-center gap-4">
                  <div className="h-10 w-12 rounded-xl border border-border bg-muted/40 flex items-center justify-center font-mono text-xs text-muted-foreground">
                    {heapArray[3]}
                  </div>
                  <div className="h-10 w-12 rounded-xl border border-border bg-muted/40 flex items-center justify-center font-mono text-xs text-muted-foreground">
                    {heapArray[4]}
                  </div>
                  <div className="h-10 w-12 rounded-xl border border-border bg-muted/40 flex items-center justify-center font-mono text-xs text-muted-foreground">
                    {heapArray[5]}
                  </div>
                  <div className="h-10 w-12 rounded-xl border border-border bg-muted/40 flex items-center justify-center font-mono text-xs text-muted-foreground">
                    {heapArray[6]}
                  </div>
                </div>
              </div>
            </div>

            {/* Heap Array View */}
            <div className="w-full max-w-xl space-y-2 border-t border-border/80 pt-4">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center">
                Simultaneous 1D Array Representation
              </span>
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
                {heapArray.map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center space-y-1">
                    <div className="h-12 w-14 rounded-xl border-2 border-border bg-card flex items-center justify-center font-mono font-bold text-xs">
                      {val}
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">[{idx}]</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full max-w-lg mt-2 p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>{heapMessage}</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
