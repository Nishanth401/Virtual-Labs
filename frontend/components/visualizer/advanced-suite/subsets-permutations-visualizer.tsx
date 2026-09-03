"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitMerge, Play, RotateCcw, ChevronRight, ChevronLeft, Info, Sparkles } from "lucide-react";

export function SubsetsPermutationsVisualizer() {
  const [mode, setMode] = useState<"subsets" | "permutations">("subsets");
  const [elements, setElements] = useState<number[]>([1, 2, 3]);
  const [stepIdx, setStepIdx] = useState<number>(0);

  // Generate steps for Subsets (Include / Exclude)
  const subsetSteps = [
    { desc: "Root: Empty subset candidate [] at Index 0", current: [], index: 0, type: "branch" },
    { desc: "Element 1: INCLUDE -> Subset becomes [1]", current: [1], index: 1, type: "include" },
    { desc: "Element 2: INCLUDE -> Subset becomes [1, 2]", current: [1, 2], index: 2, type: "include" },
    { desc: "Element 3: INCLUDE -> Subset becomes [1, 2, 3] (LEAF OUTPUT)", current: [1, 2, 3], index: 3, type: "leaf" },
    { desc: "Element 3: EXCLUDE -> Subset becomes [1, 2] (LEAF OUTPUT)", current: [1, 2], index: 3, type: "leaf" },
    { desc: "Backtrack to Element 2: EXCLUDE -> Subset becomes [1]", current: [1], index: 2, type: "exclude" },
    { desc: "Element 3: INCLUDE -> Subset becomes [1, 3] (LEAF OUTPUT)", current: [1, 3], index: 3, type: "leaf" },
    { desc: "Element 3: EXCLUDE -> Subset becomes [1] (LEAF OUTPUT)", current: [1], index: 3, type: "leaf" },
    { desc: "Backtrack to Element 1: EXCLUDE -> Subset becomes []", current: [], index: 1, type: "exclude" },
    { desc: "Element 2: INCLUDE -> Subset becomes [2]", current: [2], index: 2, type: "include" },
    { desc: "Element 3: INCLUDE -> Subset becomes [2, 3] (LEAF OUTPUT)", current: [2, 3], index: 3, type: "leaf" },
    { desc: "Element 3: EXCLUDE -> Subset becomes [2] (LEAF OUTPUT)", current: [2], index: 3, type: "leaf" },
    { desc: "Backtrack to Element 2: EXCLUDE -> Subset becomes []", current: [], index: 2, type: "exclude" },
    { desc: "Element 3: INCLUDE -> Subset becomes [3] (LEAF OUTPUT)", current: [3], index: 3, type: "leaf" },
    { desc: "Element 3: EXCLUDE -> Subset becomes [] (LEAF OUTPUT)", current: [], index: 3, type: "leaf" },
    { desc: "🎉 Complete Power Set Generated: 2³ = 8 total subsets!", current: [], index: 3, type: "done" }
  ];

  // Generate steps for Permutations (Swapping)
  const permSteps = [
    { desc: "Root: Start with array [1, 2, 3] at index 0", current: [1, 2, 3], type: "branch" },
    { desc: "Fix Index 0 (Swap 1 with 1) -> [1, 2, 3]. Move to index 1", current: [1, 2, 3], type: "branch" },
    { desc: "Fix Index 1 (Swap 2 with 2) -> [1, 2, 3]. Leaf Permutation [1, 2, 3]!", current: [1, 2, 3], type: "leaf" },
    { desc: "Swap index 1 and 2 -> Permutation [1, 3, 2]!", current: [1, 3, 2], type: "leaf" },
    { desc: "Backtrack index 1 & Swap index 0 with 1 -> [2, 1, 3]", current: [2, 1, 3], type: "branch" },
    { desc: "Fix Index 1 -> Permutation [2, 1, 3]!", current: [2, 1, 3], type: "leaf" },
    { desc: "Swap index 1 and 2 -> Permutation [2, 3, 1]!", current: [2, 3, 1], type: "leaf" },
    { desc: "Backtrack index 0 & Swap index 0 with 2 -> [3, 2, 1]", current: [3, 2, 1], type: "branch" },
    { desc: "Fix Index 1 -> Permutation [3, 2, 1]!", current: [3, 2, 1], type: "leaf" },
    { desc: "Swap index 1 and 2 -> Permutation [3, 1, 2]!", current: [3, 1, 2], type: "leaf" },
    { desc: "🎉 Complete Permutations Generated: 3! = 6 total permutations!", current: [1, 2, 3], type: "done" }
  ];

  const activeSteps = mode === "subsets" ? subsetSteps : permSteps;
  const currentStep = activeSteps[Math.min(stepIdx, activeSteps.length - 1)];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30">
            Phase 3: Recursion &amp; Backtracking
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Include/Exclude &amp; Swapping Decision Trees
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Subsets &amp; Permutations Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Explore combinatorial generation patterns. Watch the binary include/exclude decision tree generate the power set in $O(2^n)$ or permutation swapping in $O(n!)$.
        </p>
      </div>

      {/* Control Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60">
            <Button
              variant={mode === "subsets" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setMode("subsets"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              Subsets (2ⁿ = 8)
            </Button>
            <Button
              variant={mode === "permutations" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setMode("permutations"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              Permutations (n! = 6)
            </Button>
          </div>

          <Button
            size="sm"
            onClick={() => setStepIdx(prev => Math.min(activeSteps.length - 1, prev + 1))}
            disabled={stepIdx >= activeSteps.length - 1}
            className="h-8 text-xs font-bold gap-1 rounded-xl bg-primary text-primary-foreground"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Step Forward</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={stepIdx === 0}
            onClick={() => setStepIdx(prev => Math.max(0, prev - 1))}
            className="h-8 w-8 p-0 rounded-xl"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button size="sm" variant="outline" onClick={() => setStepIdx(0)} className="h-8 w-8 p-0 rounded-xl" title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span>Step: <strong>{stepIdx + 1} / {activeSteps.length}</strong></span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            {mode === "subsets" ? "O(2ⁿ) Power Set" : "O(n!) Permutations"}
          </Badge>
        </div>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div className="flex flex-col items-center justify-center py-8 space-y-6">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Current Candidate Buffer
          </span>

          <div className="p-5 rounded-2xl bg-muted/30 border border-border/80 flex items-center justify-center gap-3 min-w-[280px]">
            <span className="text-sm font-mono text-muted-foreground font-bold">[</span>
            {currentStep.current.map((item, idx) => (
              <div
                key={idx}
                className="h-12 w-12 rounded-xl bg-primary text-primary-foreground font-mono font-bold text-lg flex items-center justify-center shadow-md animate-in zoom-in-75 duration-200"
              >
                {item}
              </div>
            ))}
            {currentStep.current.length === 0 && (
              <span className="text-xs font-mono text-muted-foreground italic">Empty Candidate []</span>
            )}
            <span className="text-sm font-mono text-muted-foreground font-bold">]</span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-xs font-mono px-3 py-1 ${
              currentStep.type === "leaf" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500 font-bold" : "bg-card border-border"
            }`}>
              {currentStep.type === "leaf" ? "✓ Output Recorded" : currentStep.type === "include" ? "+ Include Branch" : currentStep.type === "exclude" ? "- Exclude Branch" : "Exploring Branch"}
            </Badge>
          </div>
        </div>

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>{currentStep.desc}</span>
        </div>
      </Card>
    </div>
  );
}
