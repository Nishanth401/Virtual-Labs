"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Boxes, Play, RotateCcw, ChevronRight, ChevronLeft, Info, CheckCircle2 } from "lucide-react";

export function RadixBucketVisualizer() {
  const initialArray = [170, 45, 75, 90, 802, 24, 2, 66];
  const [array, setArray] = useState<number[]>(initialArray);
  const [currentExp, setCurrentExp] = useState<number>(1); // 1 = 1s place, 10 = 10s place, 100 = 100s place
  const [stepPhase, setStepPhase] = useState<"distribute" | "gather">("distribute");
  const [buckets, setBuckets] = useState<number[][]>(Array.from({ length: 10 }, () => []));
  const [log, setLog] = useState<string>("Radix Sort: Start with 1s place (Least Significant Digit - LSD).");
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const handleStep = () => {
    if (isSorted) return;

    if (stepPhase === "distribute") {
      // Distribute array into buckets based on digit (num / exp) % 10
      const b: number[][] = Array.from({ length: 10 }, () => []);
      array.forEach(num => {
        const digit = Math.floor(num / currentExp) % 10;
        b[digit].push(num);
      });
      setBuckets(b);
      setStepPhase("gather");
      setLog(`Distributed elements into buckets 0-9 based on digit at 10^${Math.log10(currentExp)} place.`);
    } else {
      // Gather elements from buckets
      const gathered: number[] = [];
      buckets.forEach(b => {
        b.forEach(num => gathered.push(num));
      });
      setArray(gathered);

      const nextExp = currentExp * 10;
      const maxVal = Math.max(...array);

      if (Math.floor(maxVal / nextExp) > 0) {
        setCurrentExp(nextExp);
        setStepPhase("distribute");
        setBuckets(Array.from({ length: 10 }, () => []));
        setLog(`Gathered elements in order. Next: distribute based on 10^${Math.log10(nextExp)} place.`);
      } else {
        setIsSorted(true);
        setStepPhase("distribute");
        setBuckets(Array.from({ length: 10 }, () => []));
        setLog(`🎉 Radix Sort Complete! All digit passes finished. Final sorted array achieved in linear O(d × (n + b)) time.`);
      }
    }
  };

  const handleReset = () => {
    setArray(initialArray);
    setCurrentExp(1);
    setStepPhase("distribute");
    setBuckets(Array.from({ length: 10 }, () => []));
    setIsSorted(false);
    setLog("Reset to original array.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
            Phase 3: Sorting Algorithms
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Non-Comparison LSD Digit Extraction
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Radix &amp; Bucket Sort Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Non-comparison sorting that operates in $O(d \times (n + b))$ time by distributing numbers into 10 decimal buckets according to individual radix digit positions.
        </p>
      </div>

      {/* Control Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={handleStep}
            disabled={isSorted}
            className="h-8 gap-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-xl"
          >
            <Play className="h-3.5 w-3.5" />
            <span>{stepPhase === "distribute" ? `Distribute (Digit Place ${currentExp})` : "Gather from Buckets"}</span>
          </Button>

          <Button size="sm" variant="outline" onClick={handleReset} className="h-8 w-8 p-0 rounded-xl" title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span>Active Digit Place: <strong>{currentExp}s ({currentExp === 1 ? "Units" : currentExp === 10 ? "Tens" : "Hundreds"})</strong></span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            O(d × (n + k)) Linear Time
          </Badge>
        </div>
      </div>

      {/* Array Elements */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-3">
            Current Array Sequence ({isSorted ? "SORTED" : "PASS IN PROGRESS"})
          </span>
          <div className="flex flex-wrap items-center gap-2.5">
            {array.map((num, i) => {
              const activeDigit = Math.floor(num / currentExp) % 10;
              return (
                <div
                  key={i}
                  className={`px-4 py-3 rounded-2xl border font-mono font-bold text-sm flex flex-col items-center shadow-xs transition-all ${
                    isSorted
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                      : "bg-muted/40 border-border text-foreground"
                  }`}
                >
                  <span className="text-base">{num}</span>
                  <span className="text-[9px] text-muted-foreground mt-0.5">
                    Digit: <strong className="text-primary">{activeDigit}</strong>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 10 Decimal Buckets (0-9) */}
        <div>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-3">
            Buckets 0 through 9 (Distribution Slots)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-3">
            {buckets.map((bList, bIdx) => (
              <div
                key={bIdx}
                className="flex flex-col items-center p-3 rounded-xl bg-muted/20 border border-border/70 min-h-[140px] justify-between"
              >
                <div className="flex flex-col items-center gap-1.5 w-full">
                  {bList.map((val, idx) => (
                    <div
                      key={idx}
                      className="w-full text-center py-1 rounded-lg bg-primary/20 border border-primary/40 text-primary font-mono text-xs font-bold animate-in zoom-in-75 duration-150"
                    >
                      {val}
                    </div>
                  ))}
                  {bList.length === 0 && (
                    <span className="text-[10px] text-muted-foreground italic mt-4">Empty</span>
                  )}
                </div>

                <div className="w-full text-center pt-2 border-t border-border/60 mt-2">
                  <span className="text-xs font-bold font-mono text-foreground">
                    [{bIdx}]
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>{log}</span>
        </div>
      </Card>
    </div>
  );
}
