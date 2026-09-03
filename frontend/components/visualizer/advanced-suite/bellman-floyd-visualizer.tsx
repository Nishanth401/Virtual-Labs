"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Network, Play, RotateCcw, ChevronRight, ChevronLeft, Info, AlertTriangle } from "lucide-react";

export function BellmanFloydVisualizer() {
  const [algo, setAlgo] = useState<"bellman" | "floyd">("bellman");
  const [stepIdx, setStepIdx] = useState<number>(0);

  // Bellman-Ford 4 nodes, directed edges with negative weight:
  // 0 -> 1 (4), 0 -> 2 (5), 1 -> 2 (-3), 2 -> 3 (3), 1 -> 3 (10)
  const bellmanSteps = [
    { desc: "Initialize distances from Source (0): dist[0]=0, dist[1..3]=∞.", dist: [0, Infinity, Infinity, Infinity] },
    { desc: "Pass 1: Relax Edge (0 -> 1, wt: 4): dist[1] updated to 4. Relax Edge (0 -> 2, wt: 5): dist[2] updated to 5.", dist: [0, 4, 5, Infinity] },
    { desc: "Pass 2: Relax Edge (1 -> 2, wt: -3): dist[2] = min(5, 4 + (-3)) = 1! Negative edge successfully handled.", dist: [0, 4, 1, Infinity] },
    { desc: "Pass 3: Relax Edge (2 -> 3, wt: 3): dist[3] = 1 + 3 = 4.", dist: [0, 4, 1, 4] },
    { desc: "Pass 4: Negative Cycle Check pass. No distances reduced. Shortest paths verified with negative edge support!", dist: [0, 4, 1, 4] }
  ];

  // Floyd-Warshall 4x4 matrix
  const floydSteps = [
    { k: "-", desc: "Initial direct adjacency distance matrix D^0.", matrix: [
      [0, 3, Infinity, 7],
      [8, 0, 2, Infinity],
      [5, Infinity, 0, 1],
      [2, Infinity, Infinity, 0]
    ]},
    { k: 0, desc: "k = 0: Allow intermediate paths via Node 0. Updated matrix D^1.", matrix: [
      [0, 3, Infinity, 7],
      [8, 0, 2, 15],
      [5, 8, 0, 1],
      [2, 5, Infinity, 0]
    ]},
    { k: 1, desc: "k = 1: Allow intermediate paths via Node 1. Updated matrix D^2.", matrix: [
      [0, 3, 5, 7],
      [8, 0, 2, 15],
      [5, 8, 0, 1],
      [2, 5, 7, 0]
    ]},
    { k: 2, desc: "k = 2: Allow intermediate paths via Node 2. Updated matrix D^3.", matrix: [
      [0, 3, 5, 6],
      [7, 0, 2, 3],
      [5, 8, 0, 1],
      [2, 5, 7, 0]
    ]},
    { k: 3, desc: "🎉 k = 3: Final All-Pairs Shortest Path matrix D^4 complete in O(V³) time!", matrix: [
      [0, 3, 5, 6],
      [5, 0, 2, 3],
      [3, 6, 0, 1],
      [2, 5, 7, 0]
    ]}
  ];

  const currentBellman = bellmanSteps[Math.min(stepIdx, bellmanSteps.length - 1)];
  const currentFloyd = floydSteps[Math.min(stepIdx, floydSteps.length - 1)];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
            Phase 4: Graph Algorithms
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Negative Edge Weights &amp; All-Pairs Shortest Paths
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Bellman-Ford &amp; Floyd-Warshall Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Single-source shortest paths with negative edge detection ($O(V \times E)$) and All-Pairs dynamic programming distance matrix ($O(V^3)$).
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60">
            <Button
              variant={algo === "bellman" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setAlgo("bellman"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              Bellman-Ford (O(V×E))
            </Button>
            <Button
              variant={algo === "floyd" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setAlgo("floyd"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              Floyd-Warshall (O(V³))
            </Button>
          </div>

          <Button
            size="sm"
            onClick={() => setStepIdx(p => p + 1)}
            disabled={stepIdx >= (algo === "bellman" ? bellmanSteps.length - 1 : floydSteps.length - 1)}
            className="h-8 text-xs font-bold gap-1 rounded-xl bg-primary text-primary-foreground"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Step Pass</span>
          </Button>

          <Button size="sm" variant="outline" onClick={() => setStepIdx(0)} className="h-8 w-8 p-0 rounded-xl" title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            {algo === "bellman" ? "Detects Negative Cycles" : "All-Pairs DP Matrix"}
          </Badge>
        </div>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div className="flex flex-col items-center justify-center py-4">
          {algo === "bellman" ? (
            <div className="space-y-4 w-full max-w-xl">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center">
                Shortest Distances from Source Vertex 0
              </span>
              <div className="grid grid-cols-4 gap-3">
                {currentBellman.dist.map((d, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-muted/20 border border-border flex flex-col items-center shadow-xs">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold">Node {idx}</span>
                    <span className="text-2xl font-bold font-mono text-foreground mt-1">
                      {d === Infinity ? "∞" : d}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-500 mt-1">
                      {idx === 0 ? "Source" : "Relaxed"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 w-full max-w-md">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center">
                All-Pairs Distance Matrix D^{currentFloyd.k}
              </span>
              <table className="w-full text-xs font-mono text-center border-collapse">
                <thead>
                  <tr className="bg-muted/40 text-muted-foreground">
                    <th className="p-2 border border-border">u \ v</th>
                    <th className="p-2 border border-border">0</th>
                    <th className="p-2 border border-border">1</th>
                    <th className="p-2 border border-border">2</th>
                    <th className="p-2 border border-border">3</th>
                  </tr>
                </thead>
                <tbody>
                  {currentFloyd.matrix.map((row, r) => (
                    <tr key={r}>
                      <td className="p-2 font-bold border border-border bg-muted/20">{r}</td>
                      {row.map((val, c) => (
                        <td key={c} className="p-2 border border-border font-bold text-foreground">
                          {val === Infinity ? "∞" : val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>{algo === "bellman" ? currentBellman.desc : currentFloyd.desc}</span>
        </div>
      </Card>
    </div>
  );
}
