"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { SortingStep } from "@/hooks/use-sorting";
import { soundFx } from "@/lib/sound-fx";
import { Volume2, VolumeX, BarChart3, Clock, Database, Layers, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SortingDisplayProps {
  currentStep: SortingStep;
  algorithmName: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  currentStepIndex?: number;
  totalSteps?: number;
}

export function SortingDisplay({
  currentStep,
  algorithmName,
  timeComplexity = "O(n²)",
  spaceComplexity = "O(1)",
  currentStepIndex = 0,
  totalSteps = 20,
}: SortingDisplayProps) {
  const { array, comparingIndices, swappedIndices, sortedIndices, specialIndices, message } = currentStep;
  const maxValue = Math.max(...array, 100);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    soundFx.enabled = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    if (!soundEnabled) return;
    if (swappedIndices.length >= 2) {
      soundFx.playSwapSound(array[swappedIndices[0]], array[swappedIndices[1]], maxValue);
    } else if (comparingIndices.length >= 1) {
      soundFx.playStepSound(array[comparingIndices[0]], maxValue);
    } else if (sortedIndices.length === array.length && array.length > 0) {
      soundFx.playSuccessSound();
    }
  }, [comparingIndices, swappedIndices, sortedIndices, array, maxValue, soundEnabled]);

  // Y-axis grid levels matching image.png
  const yAxisLevels = [100, 75, 50, 25, 0];

  return (
    <div className="space-y-5">
      {/* ============================================================== */}
      {/* TOP CANVAS & LEGEND GRID MATCHING IMAGE.PNG                    */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Bar Chart Canvas (Left 9 Cols) */}
        <div className="lg:col-span-9 space-y-3">
          {/* Top Metric Cards (Size & Step) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">Size</span>
                  <span className="text-base font-black text-foreground font-mono">{array.length}</span>
                </div>
                <div className="h-6 w-[1px] bg-border/60" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">Step</span>
                  <span className="text-base font-black text-[#1e88e5] font-mono">
                    {currentStepIndex + 1} / {totalSteps || 20}
                  </span>
                </div>
              </div>
            </div>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="px-3 py-1.5 rounded-lg border border-border/70 text-xs font-semibold flex items-center gap-1.5 text-muted-foreground hover:text-foreground bg-card shadow-xs"
            >
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5 text-emerald-500" /> : <VolumeX className="h-3.5 w-3.5" />}
              <span>{soundEnabled ? "Audio On" : "Muted"}</span>
            </button>
          </div>

          {/* Canvas with Y-Axis Grids and Vibrant Pillars matching image.png */}
          <Card className="border-border/80 bg-card shadow-md relative overflow-hidden rounded-2xl">
            <CardContent className="p-6 pt-4">
              <div className="h-72 sm:h-80 relative flex flex-col justify-between">
                {/* Horizontal Dashed Y-Axis Grid Lines matching image.png */}
                <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none pb-6">
                  {yAxisLevels.map((lvl) => (
                    <div key={lvl} className="flex items-center gap-3 w-full">
                      <span className="text-[11px] font-mono text-muted-foreground w-6 text-right select-none font-semibold">
                        {lvl}
                      </span>
                      <div className="flex-1 border-b border-dashed border-border/60" />
                    </div>
                  ))}
                </div>

                {/* Bars Container */}
                <div className="h-full flex items-end justify-center gap-3 sm:gap-5 pl-10 pr-4 pb-6 pt-6 z-10">
                  {array.map((value, idx) => {
                    const isComparing = comparingIndices.includes(idx);
                    const isSwapped = swappedIndices.includes(idx);
                    const isSorted = sortedIndices.includes(idx);

                    // Colors strictly adhering to image.png
                    let barBg = "bg-[#1e88e5]"; // Vibrant Blue for unsorted
                    if (isSorted) {
                      barBg = "bg-[#10b981]"; // Emerald Green for sorted
                    } else if (isSwapped) {
                      barBg = "bg-[#ef4444]"; // Coral Red for swap
                    } else if (isComparing) {
                      barBg = "bg-[#f59e0b]"; // Warm Amber for comparing
                    }

                    const heightPercentage = Math.max((value / maxValue) * 100, 10);

                    return (
                      <div key={idx} className="flex-1 max-w-[56px] flex flex-col items-center justify-end h-full relative group">
                        {/* Number Value On Top of Bar matching image.png */}
                        <span className="text-xs sm:text-sm font-black font-mono text-foreground mb-1 drop-shadow-xs">
                          {value}
                        </span>

                        {/* Pillar Bar with Rounded Corners matching image.png */}
                        <motion.div
                          layout
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPercentage}%` }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className={`w-full rounded-t-xl transition-colors duration-200 shadow-sm ${barBg}`}
                        />

                        {/* Index Label Underneath Bar matching image.png */}
                        <span className="text-xs font-bold font-mono text-foreground pt-1.5 select-none">
                          {idx}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Solid Baseline Divider matching image.png */}
                <div className="absolute inset-x-0 bottom-6 pl-9 border-b-2 border-foreground/80 z-20 pointer-events-none" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Legend Card & Current Array matching image.png (Right 3 Cols) */}
        <div className="lg:col-span-3 space-y-4 flex flex-col justify-start">
          {/* Legend Card */}
          <Card className="border-border/80 bg-card p-4 rounded-2xl shadow-sm space-y-3">
            <h4 className="font-black text-xs uppercase tracking-wider text-foreground font-heading">
              Legend
            </h4>
            <div className="space-y-2.5 text-xs font-medium">
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-4 rounded-md bg-[#1e88e5] shrink-0 shadow-xs" />
                <span className="text-foreground font-semibold">Unsorted Element</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-4 rounded-md bg-[#f59e0b] shrink-0 shadow-xs" />
                <span className="text-foreground font-semibold">Comparing</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-4 rounded-md bg-[#ef4444] shrink-0 shadow-xs" />
                <span className="text-foreground font-semibold">Swap</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-4 rounded-md bg-[#10b981] shrink-0 shadow-xs" />
                <span className="text-foreground font-semibold">Sorted / Locked</span>
              </div>
            </div>
          </Card>

          {/* Current Array Card */}
          <Card className="border-border/80 bg-card p-4 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-black text-xs uppercase tracking-wider text-foreground font-heading">
              Current Array
            </h4>
            <div className="p-2.5 bg-muted/60 rounded-xl font-mono text-xs text-foreground font-bold border border-border/50 break-all">
              [{array.join(", ")}]
            </div>
          </Card>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM STATUS BAR WITH TC & SC PILLS MATCHING IMAGE.PNG        */}
      {/* ============================================================== */}
      <Card className="border-border/80 bg-card p-4 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Running Status & Narrative */}
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-[#1e88e5] text-white flex items-center justify-center shrink-0 shadow-sm">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <h5 className="text-xs font-black text-foreground font-heading">
                {algorithmName} is active...
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {message || "Comparing adjacent elements and swapping if they are in wrong order."}
              </p>
            </div>
          </div>

          {/* Time Complexity & Space Complexity Badges matching image.png */}
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="text-muted-foreground text-[11px]">Time Complexity</span>
              <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 font-mono text-xs font-bold px-2.5 py-0.5">
                {timeComplexity}
              </Badge>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="text-muted-foreground text-[11px]">Space Complexity</span>
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-xs font-bold px-2.5 py-0.5">
                {spaceComplexity}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

