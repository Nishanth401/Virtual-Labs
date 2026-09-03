"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Workflow, Play, RotateCcw, ChevronRight, ChevronLeft, Info, CheckCircle2 } from "lucide-react";

export function TopologicalSortVisualizer() {
  const [stepIdx, setStepIdx] = useState<number>(0);

  // DAG: 5 nodes (0 to 4)
  // 0 -> 2, 0 -> 3, 1 -> 3, 1 -> 4, 2 -> 3, 3 -> 4
  const steps = [
    {
      desc: "Initialize In-Degree counts for all DAG vertices: InDeg[0]=0, InDeg[1]=0, InDeg[2]=1, InDeg[3]=3, InDeg[4]=2.",
      inDegrees: [0, 0, 1, 3, 2],
      queue: [0, 1],
      order: []
    },
    {
      desc: "Enqueue nodes with In-Degree 0: Queue = [0, 1]. Begin Kahn's BFS queue extraction.",
      inDegrees: [0, 0, 1, 3, 2],
      queue: [0, 1],
      order: []
    },
    {
      desc: "Dequeue Node 0: Added to Topological Order. Decrement In-Degree of neighbors 2 and 3. InDeg[2] becomes 0 -> Enqueue Node 2!",
      inDegrees: [0, 0, 0, 2, 2],
      queue: [1, 2],
      order: [0]
    },
    {
      desc: "Dequeue Node 1: Added to Topological Order. Decrement In-Degree of neighbors 3 and 4.",
      inDegrees: [0, 0, 0, 1, 1],
      queue: [2],
      order: [0, 1]
    },
    {
      desc: "Dequeue Node 2: Added to Topological Order. Decrement In-Degree of neighbor 3: InDeg[3] becomes 0 -> Enqueue Node 3!",
      inDegrees: [0, 0, 0, 0, 1],
      queue: [3],
      order: [0, 1, 2]
    },
    {
      desc: "Dequeue Node 3: Added to Topological Order. Decrement In-Degree of neighbor 4: InDeg[4] becomes 0 -> Enqueue Node 4!",
      inDegrees: [0, 0, 0, 0, 0],
      queue: [4],
      order: [0, 1, 2, 3]
    },
    {
      desc: "🎉 Dequeue Node 4: Added to Topological Order. Queue empty. Valid DAG linear ordering: [0, 1, 2, 3, 4] achieved in O(V + E) time!",
      inDegrees: [0, 0, 0, 0, 0],
      queue: [],
      order: [0, 1, 2, 3, 4]
    }
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
            Kahn’s In-Degree BFS Algorithm (DAG)
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Topological Sorting Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge $u \to v$, vertex $u$ appears before $v$. Essential for dependency resolution and build systems.
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
            <span>Step Kahn's BFS</span>
          </Button>

          <Button size="sm" variant="outline" onClick={() => setStepIdx(0)} className="h-8 w-8 p-0 rounded-xl" title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span>Step: <strong>{stepIdx + 1} / {steps.length}</strong></span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            O(V + E) Linear Time
          </Badge>
        </div>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
          {/* In-Degree Table */}
          <div className="p-4 bg-muted/20 border border-border/80 rounded-2xl space-y-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block font-bold">
              Vertex In-Degree Table
            </span>
            <div className="space-y-2">
              {cur.inDegrees.map((deg, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-2 rounded-xl border text-xs font-mono ${
                    deg === 0
                      ? "bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold"
                      : "bg-card border-border text-muted-foreground"
                  }`}
                >
                  <span>Vertex {i}</span>
                  <span>In-Degree: {deg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active 0-Degree Queue */}
          <div className="p-4 bg-muted/20 border border-border/80 rounded-2xl space-y-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block font-bold">
              Kahn's Zero In-Degree Queue
            </span>
            <div className="flex flex-wrap items-center gap-2 min-h-[120px] p-3 rounded-xl bg-card border border-border">
              {cur.queue.map(qNode => (
                <div
                  key={qNode}
                  className="h-12 w-12 rounded-xl bg-primary text-primary-foreground font-mono font-bold text-lg flex items-center justify-center shadow-md animate-in zoom-in-75 duration-200"
                >
                  {qNode}
                </div>
              ))}
              {cur.queue.length === 0 && (
                <span className="text-xs font-mono text-muted-foreground italic">Queue Empty</span>
              )}
            </div>
          </div>

          {/* Output Topological Sequence */}
          <div className="p-4 bg-muted/20 border border-border/80 rounded-2xl space-y-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block font-bold">
              Topological Order Output
            </span>
            <div className="flex flex-wrap items-center gap-2 min-h-[120px] p-3 rounded-xl bg-card border border-border">
              {cur.order.map((node, i) => (
                <div key={node} className="flex items-center gap-1.5">
                  <div className="h-12 w-12 rounded-xl bg-emerald-600 text-white font-mono font-bold text-lg flex items-center justify-center shadow-md animate-in zoom-in-75 duration-200">
                    {node}
                  </div>
                  {i < cur.order.length - 1 && <span className="text-muted-foreground font-mono">→</span>}
                </div>
              ))}
              {cur.order.length === 0 && (
                <span className="text-xs font-mono text-muted-foreground italic">No nodes processed yet</span>
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
