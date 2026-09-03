"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, Play, RotateCcw, ChevronRight, ChevronLeft, Info, CheckCircle2 } from "lucide-react";

export function SpaceComplexityVisualizer() {
  const [recursionDepth, setRecursionDepth] = useState<number>(4);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Phase 1: Complexity &amp; Interview Prep
          </Badge>
          <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
            Auxiliary Space vs. Total Memory
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Space Complexity Analyzer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Interactive memory profiler differentiating between Input Space, Auxiliary Working Memory, and Call Stack Execution Frames.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-muted-foreground font-bold">Call Stack Depth:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6].map(d => (
              <Button
                key={d}
                size="sm"
                variant={recursionDepth === d ? "default" : "outline"}
                onClick={() => setRecursionDepth(d)}
                className="h-7 w-7 p-0 text-xs font-mono font-bold rounded-lg"
              >
                {d}
              </Button>
            ))}
          </div>
        </div>

        <Badge variant="outline" className="text-[10px] font-mono bg-primary/10 text-primary border-primary/20">
          O(D) Stack RAM • Stack Overflow Boundary
        </Badge>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
          {/* Stack Memory Frames */}
          <div className="p-4 bg-muted/20 border border-border rounded-2xl space-y-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block font-bold">
              Call Stack Allocation (Auxiliary Space = O({recursionDepth}))
            </span>
            <div className="flex flex-col-reverse gap-2 min-h-[220px] justify-start p-3 bg-card rounded-xl border border-border">
              {Array.from({ length: recursionDepth }).map((_, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-primary/20 border border-primary/40 text-primary font-mono text-xs font-bold flex items-center justify-between shadow-xs animate-in slide-in-from-bottom duration-200"
                >
                  <span>Frame #{i + 1}: recurse({recursionDepth - i})</span>
                  <span className="text-[10px] opacity-70">~64 bytes</span>
                </div>
              ))}
            </div>
          </div>

          {/* Heap vs Stack Explanations */}
          <div className="p-4 bg-muted/20 border border-border rounded-2xl space-y-3 flex flex-col justify-between">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block font-bold">
              Memory Segment Architecture
            </span>
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-card border border-border">
                <span className="text-primary font-bold block mb-1">Stack Memory (LIFO):</span>
                <span className="text-muted-foreground">Stores activation records, local primitive variables, and return address pointers. Extremely fast, bounded by thread stack limit.</span>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border">
                <span className="text-emerald-400 font-bold block mb-1">Heap Memory (Dynamic):</span>
                <span className="text-muted-foreground">Stores dynamically allocated objects, hash tables, and large arrays via `new` or `malloc()`. Garbage collected.</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground text-center">
              Auxiliary Space strictly measures extra memory beyond the input size.
            </span>
          </div>
        </div>

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>
            Deep recursion without tail-call optimization consumes O(N) auxiliary stack memory, creating StackOverflowError risks.
          </span>
        </div>
      </Card>
    </div>
  );
}
