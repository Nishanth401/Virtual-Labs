"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Play, RotateCcw, ChevronRight, ChevronLeft, Info, CheckCircle2 } from "lucide-react";

export function AdvancedGreedyVisualizer() {
  const [topic, setTopic] = useState<"intervals" | "jump">("intervals");
  const [stepIdx, setStepIdx] = useState<number>(0);

  // Merge Intervals: Input = [[1, 3], [2, 6], [8, 10], [15, 18]]
  const intervalSteps = [
    { desc: "Sort intervals by start time: [[1, 3], [2, 6], [8, 10], [15, 18]]. Initialize merged list with [1, 3].", merged: [[1, 3]] },
    { desc: "Inspect [2, 6]: start (2) <= lastEnd (3) -> OVERLAP! Merge: lastEnd = max(3, 6) = 6. Active: [[1, 6]].", merged: [[1, 6]] },
    { desc: "Inspect [8, 10]: start (8) > lastEnd (6) -> NO overlap! Append new interval [8, 10]. Active: [[1, 6], [8, 10]].", merged: [[1, 6], [8, 10]] },
    { desc: "Inspect [15, 18]: start (15) > lastEnd (10) -> NO overlap! Append [15, 18]. Active: [[1, 6], [8, 10], [15, 18]].", merged: [[1, 6], [8, 10], [15, 18]] },
    { desc: "🎉 Greedy Interval Merging Complete! Output: [[1, 6], [8, 10], [15, 18]] in O(n log n) time.", merged: [[1, 6], [8, 10], [15, 18]] }
  ];

  // Jump Game (LeetCode 55): nums = [2, 3, 1, 1, 4]
  const jumpSteps = [
    { idx: 0, maxReach: 2, desc: "Index 0 (val 2): Can jump up to 2 steps. maxReach = max(0, 0 + 2) = 2." },
    { idx: 1, maxReach: 4, desc: "Index 1 (val 3): Can jump up to 3 steps. maxReach = max(2, 1 + 3) = 4 (Target reached!)." },
    { idx: 2, maxReach: 4, desc: "Index 2 (val 1): maxReach remains 4." },
    { idx: 3, maxReach: 4, desc: "Index 3 (val 1): maxReach remains 4." },
    { idx: 4, maxReach: 4, desc: "🎉 Reached last index! Greedy Jump Game returns TRUE in single O(n) pass." }
  ];

  const curI = intervalSteps[Math.min(stepIdx, intervalSteps.length - 1)];
  const curJ = jumpSteps[Math.min(stepIdx, jumpSteps.length - 1)];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
            Phase 3: Greedy Algorithms
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Merge Intervals &amp; Jump Game Max Reach
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Advanced Greedy Patterns Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Master interview-critical greedy strategies: merging overlapping intervals on a continuous number line, and tracking the maximum reachable horizon in the Jump Game.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60">
            <Button
              variant={topic === "intervals" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setTopic("intervals"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              Merge Intervals
            </Button>
            <Button
              variant={topic === "jump" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setTopic("jump"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              Jump Game (Reach)
            </Button>
          </div>

          <Button
            size="sm"
            onClick={() => setStepIdx(p => p + 1)}
            disabled={stepIdx >= (topic === "intervals" ? intervalSteps.length - 1 : jumpSteps.length - 1)}
            className="h-8 text-xs font-bold gap-1 rounded-xl bg-primary text-primary-foreground"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Step Forward</span>
          </Button>

          <Button size="sm" variant="outline" onClick={() => setStepIdx(0)} className="h-8 w-8 p-0 rounded-xl" title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            {topic === "intervals" ? "O(n log n) Sort + O(n) Merge" : "O(n) Single Pass Greedy"}
          </Badge>
        </div>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div className="flex flex-col items-center justify-center py-4">
          {topic === "intervals" ? (
            <div className="space-y-4 w-full max-w-lg">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center font-bold">
                Merged Interval Segments
              </span>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {curI.merged.map((iv, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-primary/20 border border-primary/40 text-primary font-mono font-bold text-sm flex items-center gap-2 shadow-xs animate-in zoom-in-75 duration-200"
                  >
                    <span>[{iv[0]}, {iv[1]}]</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 w-full max-w-lg">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center font-bold">
                Jump Game Array: [2, 3, 1, 1, 4]
              </span>
              <div className="grid grid-cols-5 gap-2">
                {[2, 3, 1, 1, 4].map((val, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex flex-col items-center font-mono font-bold transition-all ${
                      curJ.idx === idx
                        ? "bg-amber-500 text-slate-950 border-amber-400 scale-105 shadow-md"
                        : idx <= curJ.maxReach
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500"
                        : "bg-muted/40 border-border text-muted-foreground"
                    }`}
                  >
                    <span className="text-lg">{val}</span>
                    <span className="text-[9px] opacity-70">i={idx}</span>
                  </div>
                ))}
              </div>
              <div className="text-center font-mono text-xs text-emerald-400 font-bold">
                Current Max Reach Horizon = Index {curJ.maxReach}
              </div>
            </div>
          )}
        </div>

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>{topic === "intervals" ? curI.desc : curJ.desc}</span>
        </div>
      </Card>
    </div>
  );
}
