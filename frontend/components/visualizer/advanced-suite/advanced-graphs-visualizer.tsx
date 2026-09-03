"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Network, Play, RotateCcw, ChevronRight, ChevronLeft, Info, CheckCircle2 } from "lucide-react";

export function AdvancedGraphsVisualizer() {
  const [topic, setTopic] = useState<"bipartite" | "flow">("bipartite");
  const [stepIdx, setStepIdx] = useState<number>(0);

  // Bipartite 2-Coloring BFS steps
  const bipartiteSteps = [
    { desc: "Start Bipartite Verification on 4 vertices: (0-1, 1-2, 2-3, 3-0). Color palette: BLUE (1) vs ORANGE (-1).", colors: [0, 0, 0, 0] },
    { desc: "Color Node 0 = BLUE. Enqueue Node 0 into BFS queue.", colors: [1, 0, 0, 0] },
    { desc: "Inspect neighbors of Node 0: Nodes 1 and 3 are uncolored. Color them opposite: ORANGE (-1)!", colors: [1, -1, 0, -1] },
    { desc: "Inspect neighbor of Node 1: Node 2 is uncolored. Color it opposite: BLUE (1)!", colors: [1, -1, 1, -1] },
    { desc: "🎉 Check remaining edges: All adjacent vertices have strictly alternate colors! Graph is valid BIPARTITE (No odd-length cycle).", colors: [1, -1, 1, -1] }
  ];

  // Ford-Fulkerson Network Flow steps
  const flowSteps = [
    { desc: "Source (s) to Sink (t) network. Initial Flow = 0. Capacities: s->u (10), s->v (10), u->v (2), u->t (8), v->t (9).", flow: 0, path: "None" },
    { desc: "Augmenting Path 1: s -> u -> t. Bottleneck capacity = min(10, 8) = 8. Flow increases by 8 to 8.", flow: 8, path: "s -> u -> t (+8)" },
    { desc: "Augmenting Path 2: s -> v -> t. Bottleneck capacity = min(10, 9) = 9. Flow increases by 9 to 17.", flow: 17, path: "s -> v -> t (+9)" },
    { desc: "Augmenting Path 3: s -> u -> v -> t (via residual edge). Bottleneck capacity = 1. Flow increases to 18.", flow: 18, path: "s -> u -> v -> t (+1)" },
    { desc: "🎉 No more s-t augmenting paths in residual graph! Max Flow = 18. Verified by Min-Cut Theorem (Max Flow = Min Cut = 18).", flow: 18, path: "Max Flow Reached" }
  ];

  const curB = bipartiteSteps[Math.min(stepIdx, bipartiteSteps.length - 1)];
  const curF = flowSteps[Math.min(stepIdx, flowSteps.length - 1)];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
            Phase 4: Graph Algorithms
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Bipartite 2-Coloring &amp; Ford-Fulkerson Max Flow
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Advanced Graph Concepts Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Explore advanced graph theory: Bipartite 2-coloring BFS to detect odd cycles, and Ford-Fulkerson augmenting paths computing Maximum Network Flow.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60">
            <Button
              variant={topic === "bipartite" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setTopic("bipartite"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              Bipartite 2-Coloring
            </Button>
            <Button
              variant={topic === "flow" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setTopic("flow"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              Ford-Fulkerson Max Flow
            </Button>
          </div>

          <Button
            size="sm"
            onClick={() => setStepIdx(p => p + 1)}
            disabled={stepIdx >= (topic === "bipartite" ? bipartiteSteps.length - 1 : flowSteps.length - 1)}
            className="h-8 text-xs font-bold gap-1 rounded-xl bg-primary text-primary-foreground"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Step Progress</span>
          </Button>

          <Button size="sm" variant="outline" onClick={() => setStepIdx(0)} className="h-8 w-8 p-0 rounded-xl" title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            {topic === "bipartite" ? "O(V + E) BFS Coloring" : "Max-Flow Min-Cut Theorem"}
          </Badge>
        </div>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div className="flex flex-col items-center justify-center py-4">
          {topic === "bipartite" ? (
            <div className="space-y-4 w-full max-w-md">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center">
                Bipartite 2-Coloring State
              </span>
              <div className="grid grid-cols-2 gap-4 py-4 max-w-xs mx-auto">
                {curB.colors.map((c, i) => (
                  <div
                    key={i}
                    className={`h-20 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-bold text-sm shadow-md transition-all ${
                      c === 1
                        ? "bg-blue-500/20 text-blue-400 border-blue-500 scale-105"
                        : c === -1
                        ? "bg-amber-500/20 text-amber-400 border-amber-500 scale-105"
                        : "bg-muted/40 border-border text-muted-foreground"
                    }`}
                  >
                    <span>Node {i}</span>
                    <span className="text-[10px] opacity-70 mt-1">
                      {c === 1 ? "SET A (BLUE)" : c === -1 ? "SET B (ORANGE)" : "Uncolored"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 w-full max-w-md text-center">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
                Network Flow &amp; Augmenting Paths
              </span>
              <div className="p-6 rounded-2xl bg-muted/20 border border-border flex flex-col items-center justify-center gap-2">
                <span className="text-xs font-mono text-muted-foreground uppercase font-bold">Total Pushed Flow</span>
                <span className="text-4xl font-black font-mono text-emerald-400">{curF.flow} Units</span>
                <Badge variant="outline" className="text-xs font-mono mt-2 bg-primary/10 text-primary border-primary/30">
                  Last Path: {curF.path}
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>{topic === "bipartite" ? curB.desc : curF.desc}</span>
        </div>
      </Card>
    </div>
  );
}
