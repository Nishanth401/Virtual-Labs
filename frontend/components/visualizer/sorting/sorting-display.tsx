"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { SortingStep } from "@/hooks/use-sorting";
import { soundFx } from "@/lib/sound-fx";
import { Volume2, VolumeX, Activity, ArrowLeftRight, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SortingDisplayProps {
  currentStep: SortingStep;
  algorithmName: string;
}

export function SortingDisplay({ currentStep, algorithmName }: SortingDisplayProps) {
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

  return (
    <div className="space-y-4">
      {/* HUD Metrics Header Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-card/80 backdrop-blur-md border border-border/60 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Comparisons</span>
            <span className="text-lg font-black font-mono text-amber-500">{currentStep.comparisons}</span>
          </div>
          <Activity className="h-5 w-5 text-amber-500/60 shrink-0" />
        </div>

        <div className="p-3 rounded-xl bg-card/80 backdrop-blur-md border border-border/60 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Swaps / Shifts</span>
            <span className="text-lg font-black font-mono text-orange-500">{currentStep.swaps}</span>
          </div>
          <ArrowLeftRight className="h-5 w-5 text-orange-500/60 shrink-0" />
        </div>

        <div className="p-3 rounded-xl bg-card/80 backdrop-blur-md border border-border/60 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Sorted Items</span>
            <span className="text-lg font-black font-mono text-emerald-500">{sortedIndices.length} / {array.length}</span>
          </div>
          <CheckCircle className="h-5 w-5 text-emerald-500/60 shrink-0" />
        </div>

        <div className="p-3 rounded-xl bg-card/80 backdrop-blur-md border border-border/60 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Audio FX</span>
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-xs font-bold flex items-center gap-1 text-primary hover:underline"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4 text-emerald-500" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
              <span>{soundEnabled ? "On" : "Muted"}</span>
            </button>
          </div>
          <Sparkles className="h-5 w-5 text-primary/60 shrink-0" />
        </div>
      </div>

      {/* ULTRA-PREMIUM GLASSMORPHIC CANVAS */}
      <Card className="border-secondary/40 overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-black text-white shadow-2xl relative">
        {/* Subtle LED Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <CardContent className="p-6 relative z-10">
          <div className="h-72 sm:h-96 flex items-end justify-center gap-2 sm:gap-4 px-2 pt-10 pb-6 border-b border-white/10 relative">
            {array.map((value, idx) => {
              const isComparing = comparingIndices.includes(idx);
              const isSwapped = swappedIndices.includes(idx);
              const isSorted = sortedIndices.includes(idx);
              const isMin = specialIndices?.min === idx;
              const isKey = specialIndices?.key === idx;

              // Premium Gradient Styling
              let pillarStyle = "bg-gradient-to-t from-stone-800 to-amber-700/60 border-t-2 border-amber-400/80 text-amber-100 shadow-[0_0_15px_rgba(217,119,6,0.15)]";
              let labelBadge = null;

              if (isSorted) {
                pillarStyle = "bg-gradient-to-t from-emerald-950 via-emerald-800 to-emerald-400 border-t-2 border-emerald-200 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)]";
                labelBadge = "Sorted";
              } else if (isSwapped) {
                pillarStyle = "bg-gradient-to-t from-red-950 via-red-700 to-amber-400 border-t-2 border-amber-200 ring-2 ring-red-400 shadow-[0_0_35px_rgba(239,68,68,0.7)] animate-pulse";
                labelBadge = "Swap";
              } else if (isComparing) {
                pillarStyle = "bg-gradient-to-t from-amber-950 via-orange-600 to-yellow-300 border-t-2 border-yellow-100 ring-2 ring-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.7)] scale-[1.03]";
                labelBadge = "Compare";
              } else if (isMin) {
                pillarStyle = "bg-gradient-to-t from-rose-950 via-rose-700 to-rose-400 border-t-2 border-rose-200 ring-2 ring-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.6)]";
                labelBadge = "Min";
              } else if (isKey) {
                pillarStyle = "bg-gradient-to-t from-amber-950 via-amber-800 to-yellow-500 border-t-2 border-yellow-300 ring-2 ring-yellow-400 shadow-[0_0_25px_rgba(234,179,8,0.6)]";
                labelBadge = "Key";
              }

              const heightPercentage = Math.max((value / maxValue) * 100, 14);

              return (
                <div key={idx} className="flex-1 max-w-[56px] flex flex-col items-center justify-end h-full group relative">
                  {/* Floating Action Badge */}
                  <AnimatePresence>
                    {labelBadge && (
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute -top-8 text-[10px] font-black px-2 py-0.5 rounded-full bg-black/90 border border-white/20 shadow-lg text-amber-400 uppercase tracking-widest z-20 whitespace-nowrap"
                      >
                        {labelBadge}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* 3D Gradient Pillar Bar */}
                  <motion.div
                    layout
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercentage}%` }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className={`w-full rounded-t-xl flex flex-col items-center justify-between p-1.5 transition-all duration-200 relative overflow-hidden ${pillarStyle}`}
                  >
                    {/* Top Inner Light Specular Highlight */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-white/40 blur-[1px]" />

                    <span className="text-[11px] sm:text-xs font-black font-mono pt-1 text-white tracking-tight drop-shadow-md">
                      {value}
                    </span>

                    <span className="text-[9px] font-mono opacity-80 pb-0.5 text-white/80">
                      [{idx}]
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Color Legend Footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400 pt-5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-amber-700/60 border border-amber-400/80 shadow-xs" />
              <span className="text-stone-300">Unsorted Array</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-amber-400 border border-yellow-100 ring-1 ring-amber-400 shadow-xs" />
              <span className="text-amber-400 font-semibold">Active Compare</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500 border border-amber-200 ring-1 ring-red-400 shadow-xs" />
              <span className="text-red-400 font-semibold">Swap Step</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-400 border border-emerald-200 shadow-xs" />
              <span className="text-emerald-400 font-semibold">Sorted Lock</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Explanation Narration */}
      <div className="bg-card/80 backdrop-blur-md border border-primary/20 p-4 rounded-xl flex items-start gap-3 shadow-sm">
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mt-1 shrink-0 animate-ping" />
        <p className="text-sm font-semibold text-foreground leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}
