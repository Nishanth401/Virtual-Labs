"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitMerge, Play, RotateCcw, ChevronRight, ChevronLeft, Info, CheckCircle2 } from "lucide-react";

export function SCCVisualizer() {
  const [stepIdx, setStepIdx] = useState<number>(0);

  // 5 vertices directed graph:
  // 1 -> 0, 0 -> 2, 2 -> 1 (Cycle {0, 1, 2})
  // 0 -> 3, 3 -> 4
  const steps = [
    { desc: "Start Tarjan's Single-Pass DFS traversal at Node 0. Time counter = 0. Maintain DFS recursion stack.", scc: [], active: [0] },
    { desc: "DFS(0): discoveryTime[0]=0, low[0]=0. Push 0 to stack. Visit neighbor 2.", scc: [], active: [0, 2] },
    { desc: "DFS(2): discoveryTime[2]=1, low[2]=1. Push 2 to stack. Visit neighbor 1.", scc: [], active: [0, 2, 1] },
    { desc: "DFS(1): discoveryTime[1]=2, low[1]=2. Push 1 to stack. Neighbor 0 is already on stack! low[1] = min(low[1], disc[0]) = 0.", scc: [], active: [0, 2, 1] },
    { desc: "Backtrack to 2: low[2] = min(low[2], low[1]) = 0. Backtrack to 0: low[0] == discoveryTime[0] (Root of SCC found!).", scc: ["Component 1: {0, 1, 2}"], active: [3] },
    { desc: "Pop from stack until Node 0: Identified SCC #1: {0, 1, 2}. Now explore edge 0 -> 3.", scc: ["Component 1: {0, 1, 2}"], active: [3] },
    { desc: "DFS(3): discoveryTime[3]=3, low[3]=3. Explore 3 -> 4. DFS(4): low[4]=4. Pop 4 -> SCC #2: {4}.", scc: ["Component 1: {0, 1, 2}", "Component 2: {4}"], active: [3] },
    { desc: "🎉 Pop 3: Identified SCC #3: {3}. Complete graph partitioned into 3 Strongly Connected Components in O(V + E) time!", scc: ["Component 1: {0, 1, 2}", "Component 2: {4}", "Component 3: {3}"], active: [] }
  ];

  const cur = steps[Math.min(stepIdx, steps.length - 1)];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
            Phase 4: Graph Algorithms
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Tarjan’s DFS Low-Link Algorithm
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Strongly Connected Components (SCC) Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Partition directed graphs into maximal strongly connected subgraphs where every vertex is mutually reachable from every other vertex using Tarjan's single-pass low-link values and DFS stack.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => setStepIdx(p => p + 1)}
            disabled={stepIdx >= steps.length - 1}
            className="h-8 text-xs font-bold gap-1 rounded-xl bg-primary text-primary-foreground"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Step Tarjan's DFS</span>
          </Button>

          <Button size="sm" variant="outline" onClick={() => setStepIdx(0)} className="h-8 w-8 p-0 rounded-xl" title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span>Identified SCCs: <strong>{cur.scc.length}</strong></span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            O(V + E) Linear Time
          </Badge>
        </div>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
          {/* Identified SCCs */}
          <div className="p-4 bg-muted/20 border border-border/80 rounded-2xl space-y-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block font-bold">
              Identified Strongly Connected Components
            </span>
            <div className="space-y-2 min-h-[140px]">
              {cur.scc.map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold animate-in zoom-in-75 duration-200">
                  {c}
                </div>
              ))}
              {cur.scc.length === 0 && (
                <span className="text-xs font-mono text-muted-foreground italic">Searching for components...</span>
              )}
            </div>
          </div>

          {/* Active DFS Stack */}
          <div className="p-4 bg-muted/20 border border-border/80 rounded-2xl space-y-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block font-bold">
              Current DFS Stack
            </span>
            <div className="flex flex-wrap items-center gap-2 min-h-[140px] p-3 rounded-xl bg-card border border-border">
              {cur.active.map(node => (
                <div
                  key={node}
                  className="h-12 w-12 rounded-xl bg-primary text-primary-foreground font-mono font-bold text-lg flex items-center justify-center shadow-md animate-in zoom-in-75 duration-200"
                >
                  {node}
                </div>
              ))}
              {cur.active.length === 0 && (
                <span className="text-xs font-mono text-muted-foreground italic">Stack empty</span>
              )}
            </div>
          </div>
        </div>

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>{cur.desc}</span>
        </div>
      </Card>
    </div>
  );
}
