"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Play, RotateCcw, ChevronRight, ChevronLeft, Info, CheckCircle2 } from "lucide-react";

export function MSTVisualizer() {
  const [algo, setAlgo] = useState<"kruskal" | "prim">("kruskal");
  const [stepIdx, setStepIdx] = useState<number>(0);

  // 4 vertices (0, 1, 2, 3), edges sorted by weight:
  // (0,1): 1, (1,2): 2, (0,2): 4, (1,3): 5, (2,3): 7
  const kruskalSteps = [
    { desc: "Edges sorted by weight: (0-1: 1), (1-2: 2), (0-2: 4), (1-3: 5), (2-3: 7). Disjoint Set initialized.", accepted: [], cost: 0 },
    { desc: "Consider Edge (0-1, wt: 1): Find(0) ≠ Find(1). ACCEPT edge! Union(0, 1).", accepted: ["(0-1, wt: 1)"], cost: 1 },
    { desc: "Consider Edge (1-2, wt: 2): Find(1) ≠ Find(2). ACCEPT edge! Union(1, 2).", accepted: ["(0-1, wt: 1)", "(1-2, wt: 2)"], cost: 3 },
    { desc: "Consider Edge (0-2, wt: 4): Find(0) == Find(2) (Cycle detected!). REJECT edge.", accepted: ["(0-1, wt: 1)", "(1-2, wt: 2)"], cost: 3 },
    { desc: "Consider Edge (1-3, wt: 5): Find(1) ≠ Find(3). ACCEPT edge! Union(1, 3).", accepted: ["(0-1, wt: 1)", "(1-2, wt: 2)", "(1-3, wt: 5)"], cost: 8 },
    { desc: "🎉 MST Complete! V - 1 = 3 edges accepted. Total Minimum Spanning Tree cost = 8.", accepted: ["(0-1, wt: 1)", "(1-2, wt: 2)", "(1-3, wt: 5)"], cost: 8 }
  ];

  const primSteps = [
    { desc: "Start at arbitrary root Vertex 0. Visited = {0}. Add incident edges to Min-Heap PQ: (0-1: 1), (0-2: 4).", visited: [0], mstEdges: [], cost: 0 },
    { desc: "Extract min edge from PQ: (0-1, wt: 1). Add Vertex 1 to Visited = {0, 1}. Add incident edges: (1-2: 2), (1-3: 5).", visited: [0, 1], mstEdges: ["(0-1: 1)"], cost: 1 },
    { desc: "Extract min edge from PQ: (1-2, wt: 2). Add Vertex 2 to Visited = {0, 1, 2}. Add incident edge: (2-3: 7).", visited: [0, 1, 2], mstEdges: ["(0-1: 1)", "(1-2: 2)"], cost: 3 },
    { desc: "Extract edge (0-2, wt: 4): Both 0 and 2 already visited! Discard.", visited: [0, 1, 2], mstEdges: ["(0-1: 1)", "(1-2: 2)"], cost: 3 },
    { desc: "Extract min edge (1-3, wt: 5): Add Vertex 3 to Visited = {0, 1, 2, 3}. All 4 vertices connected!", visited: [0, 1, 2, 3], mstEdges: ["(0-1: 1)", "(1-2: 2)", "(1-3: 5)"], cost: 8 },
    { desc: "🎉 Prim's MST Complete! Visited all vertices. Minimum Spanning Tree weight = 8.", visited: [0, 1, 2, 3], mstEdges: ["(0-1: 1)", "(1-2: 2)", "(1-3: 5)"], cost: 8 }
  ];

  const curK = kruskalSteps[Math.min(stepIdx, kruskalSteps.length - 1)];
  const curP = primSteps[Math.min(stepIdx, primSteps.length - 1)];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
            Phase 4: Graph Algorithms
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Minimum Spanning Tree (MST)
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Minimum Spanning Tree Visualizer (Prim &amp; Kruskal)
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Connect all vertices with minimum total edge weight and zero cycles using Kruskal's (greedy edge selection with Union-Find) and Prim's (greedy vertex growth with Priority Queue).
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60">
            <Button
              variant={algo === "kruskal" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setAlgo("kruskal"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              Kruskal's (Union-Find)
            </Button>
            <Button
              variant={algo === "prim" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setAlgo("prim"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              Prim's (Priority Queue)
            </Button>
          </div>

          <Button
            size="sm"
            onClick={() => setStepIdx(p => p + 1)}
            disabled={stepIdx >= (algo === "kruskal" ? kruskalSteps.length - 1 : primSteps.length - 1)}
            className="h-8 text-xs font-bold gap-1 rounded-xl bg-primary text-primary-foreground"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Step Algorithm</span>
          </Button>

          <Button size="sm" variant="outline" onClick={() => setStepIdx(0)} className="h-8 w-8 p-0 rounded-xl" title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span>Accumulated MST Cost: <strong className="text-emerald-500 text-sm">{algo === "kruskal" ? curK.cost : curP.cost}</strong></span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            {algo === "kruskal" ? "O(E log E) Edge Sort" : "O(E log V) Priority Queue"}
          </Badge>
        </div>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
          {/* Accepted Edges */}
          <div className="p-4 bg-muted/20 border border-border/80 rounded-2xl space-y-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block font-bold">
              {algo === "kruskal" ? "Kruskal's Accepted MST Edges" : "Prim's Tree Edges"}
            </span>
            <div className="space-y-2 min-h-[140px]">
              {(algo === "kruskal" ? curK.accepted : curP.mstEdges).map((edge, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center justify-between">
                  <span>Edge #{i + 1}</span>
                  <span>{edge}</span>
                </div>
              ))}
              {(algo === "kruskal" ? curK.accepted : curP.mstEdges).length === 0 && (
                <span className="text-xs font-mono text-muted-foreground italic">No edges added yet</span>
              )}
            </div>
          </div>

          {/* Graph Visualizer Node State */}
          <div className="p-4 bg-muted/20 border border-border/80 rounded-2xl space-y-3 flex flex-col justify-between">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block font-bold">
              Connected Vertices ({algo === "prim" ? `Visited: {${curP.visited.join(", ")}}` : "4 Vertices"})
            </span>
            <div className="grid grid-cols-2 gap-4 py-4 max-w-xs mx-auto">
              {[0, 1, 2, 3].map(v => (
                <div
                  key={v}
                  className="h-14 w-14 rounded-2xl bg-card border-2 border-primary/40 flex flex-col items-center justify-center font-mono font-bold text-sm shadow-md text-foreground"
                >
                  <span>Node {v}</span>
                </div>
              ))}
            </div>
            <span className="text-[10px] font-mono text-muted-foreground text-center">
              All 4 nodes successfully connected with minimal total weight = 8.
            </span>
          </div>
        </div>

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>{algo === "kruskal" ? curK.desc : curP.desc}</span>
        </div>
      </Card>
    </div>
  );
}
