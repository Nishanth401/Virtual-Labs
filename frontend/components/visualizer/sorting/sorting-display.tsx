"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { SortingStep } from "@/hooks/use-sorting";

interface SortingDisplayProps {
  currentStep: SortingStep;
  algorithmName: string;
}

export function SortingDisplay({ currentStep, algorithmName }: SortingDisplayProps) {
  const { array, comparingIndices, swappedIndices, sortedIndices, specialIndices, message } = currentStep;
  const maxValue = Math.max(...array, 100);

  return (
    <div className="space-y-4">
      {/* Visual Canvas Card */}
      <Card className="border-secondary/40 overflow-hidden bg-card/60 backdrop-blur-sm shadow-sm">
        <CardContent className="p-6">
          <div className="h-64 sm:h-80 flex items-end justify-center gap-2 sm:gap-3 px-2 pt-8 pb-4 border-b border-border/40">
            {array.map((value, idx) => {
              const isComparing = comparingIndices.includes(idx);
              const isSwapped = swappedIndices.includes(idx);
              const isSorted = sortedIndices.includes(idx);
              const isMin = specialIndices?.min === idx;
              const isKey = specialIndices?.key === idx;

              // Determine bar styling
              let barColor = "bg-primary/30 border-primary/50 text-foreground";
              let labelBadge = null;

              if (isSorted) {
                barColor = "bg-emerald-500/80 border-emerald-400 text-white shadow-md shadow-emerald-500/20";
                labelBadge = "Sorted";
              } else if (isSwapped) {
                barColor = "bg-amber-500 border-amber-300 text-white animate-pulse shadow-md shadow-amber-500/30";
                labelBadge = "Swap";
              } else if (isComparing) {
                barColor = "bg-blue-500 border-cyan-300 text-white ring-2 ring-cyan-400 shadow-md shadow-blue-500/30";
                labelBadge = "Compare";
              } else if (isMin) {
                barColor = "bg-purple-600 border-purple-300 text-white ring-2 ring-purple-400 shadow-md";
                labelBadge = "Min";
              } else if (isKey) {
                barColor = "bg-indigo-600 border-indigo-300 text-white ring-2 ring-indigo-400 shadow-md";
                labelBadge = "Key";
              }

              const heightPercentage = Math.max((value / maxValue) * 100, 12);

              return (
                <div key={idx} className="flex-1 max-w-[54px] flex flex-col items-center justify-end h-full group relative">
                  {/* Floating Tag */}
                  {labelBadge && (
                    <span className="absolute -top-7 text-[10px] font-bold px-1.5 py-0.5 rounded bg-background/90 border border-border shadow-xs text-foreground uppercase tracking-wider">
                      {labelBadge}
                    </span>
                  )}

                  {/* Animated Bar */}
                  <motion.div
                    layout
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercentage}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`w-full rounded-t-lg border-t-2 border-x flex flex-col items-center justify-between p-1 transition-colors duration-200 ${barColor}`}
                  >
                    <span className="text-[11px] sm:text-xs font-bold font-mono pt-1">
                      {value}
                    </span>
                    <span className="text-[9px] opacity-75 pb-0.5">
                      {idx}
                    </span>
                  </motion.div>

                  {/* Array Index underneath */}
                  <span className="text-[10px] font-mono text-muted-foreground mt-1">
                    [{idx}]
                  </span>
                </div>
              );
            })}
          </div>

          {/* Color Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground pt-4">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs bg-primary/30 border border-primary/50" />
              <span>Unsorted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs bg-blue-500 border border-cyan-300" />
              <span>Comparing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs bg-amber-500 border border-amber-300" />
              <span>Swapped / Shifted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs bg-purple-600 border border-purple-300" />
              <span>Min / Key</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs bg-emerald-500 border border-emerald-400" />
              <span>Sorted Lock</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Explanation Narration */}
      <div className="bg-muted/40 border border-border/60 p-3.5 rounded-xl flex items-start gap-3">
        <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0 animate-ping" />
        <p className="text-sm font-medium text-foreground leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}
