"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Plus, RotateCcw, Info, CheckCircle2 } from "lucide-react";

export function AmortizedAnalysisVisualizer() {
  const [capacity, setCapacity] = useState<number>(2);
  const [elements, setElements] = useState<number[]>([10, 20]);
  const [totalCost, setTotalCost] = useState<number>(3); // 1 + (1+1)
  const [history, setHistory] = useState<string[]>([
    "Initial array: Capacity = 2, Elements = [10, 20]."
  ]);

  const handlePush = () => {
    const nextVal = (elements.length + 1) * 10;
    let nextCap = capacity;
    let opCost = 1;

    if (elements.length === capacity) {
      // Must resize: double capacity and copy existing elements
      nextCap = capacity * 2;
      opCost = elements.length + 1; // copying old elements + 1 new insertion
      setHistory(prev => [
        `Capacity Exceeded! Doubled Capacity from ${capacity} to ${nextCap}. Cost = ${elements.length} copies + 1 insert = ${opCost}.`,
        ...prev.slice(0, 5)
      ]);
    } else {
      setHistory(prev => [
        `Standard Insert: Pushed ${nextVal} into slot index ${elements.length}. Cost = 1.`,
        ...prev.slice(0, 5)
      ]);
    }

    setCapacity(nextCap);
    setElements([...elements, nextVal]);
    setTotalCost(c => c + opCost);
  };

  const handleReset = () => {
    setCapacity(2);
    setElements([10, 20]);
    setTotalCost(3);
    setHistory(["Reset dynamic array."]);
  };

  const amortizedAverage = (totalCost / (elements.length || 1)).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Phase 1: Complexity &amp; Interview Prep
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Accounting Method &amp; Capacity Doubling
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Amortized Analysis Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Demystify why dynamic array resizing (like Java ArrayList or Python list) has $O(1)$ amortized insertion despite occasional $O(N)$ reallocation spikes.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={handlePush}
            className="h-8 text-xs font-bold gap-1.5 rounded-xl bg-primary text-primary-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>push_back({(elements.length + 1) * 10})</span>
          </Button>

          <Button size="sm" variant="outline" onClick={handleReset} className="h-8 w-8 p-0 rounded-xl" title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span>Size / Capacity: <strong>{elements.length} / {capacity}</strong></span>
          <span>•</span>
          <span>Amortized Avg: <strong className="text-emerald-400">{amortizedAverage} ops/insert (≤ 3.00)</strong></span>
        </div>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div className="space-y-6 max-w-2xl mx-auto py-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center font-bold">
            Contiguous Memory Buffer Slots
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: capacity }).map((_, idx) => {
              const isFilled = idx < elements.length;
              return (
                <div
                  key={idx}
                  className={`h-14 w-14 rounded-xl border-2 font-mono flex flex-col items-center justify-center transition-all ${
                    isFilled
                      ? "bg-primary/20 border-primary text-primary font-bold shadow-xs scale-105"
                      : "bg-muted/10 border-dashed border-border text-muted-foreground"
                  }`}
                >
                  <span className="text-sm">{isFilled ? elements[idx] : "null"}</span>
                  <span className="text-[8px] opacity-70">[{idx}]</span>
                </div>
              );
            })}
          </div>

          {/* Event Log */}
          <div className="space-y-2 pt-4 border-t border-border/60">
            {history.map((h, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-muted/30 border border-border/60 text-xs font-mono text-foreground">
                {h}
              </div>
            ))}
          </div>
        </div>

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>
            By doubling capacity every time the buffer fills, total copy operations across N insertions sum to N + N/2 + N/4 + ... &lt; 2N, guaranteeing O(1) amortized time!
          </span>
        </div>
      </Card>
    </div>
  );
}
