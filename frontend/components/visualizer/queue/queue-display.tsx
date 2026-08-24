"use client";

import React from "react";
import { QueueNode } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QueueDisplayProps {
  queue: QueueNode[];
  highlightedIndex: number | null;
}

export function QueueDisplay({ queue, highlightedIndex }: QueueDisplayProps) {
  const yAxisLevels = [8, 6, 4, 2, 0];

  return (
    <div className="space-y-5">
      {/* Top Metric Cards matching image.png */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">
                Queue Size
              </span>
              <span className="text-base font-black text-foreground font-mono">{queue.length} / 8</span>
            </div>
            <div className="h-6 w-[1px] bg-border/60" />
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">
                Front / Rear
              </span>
              <span className="text-base font-black text-[#1e88e5] font-mono">
                {queue.length > 0 ? `0 (Front) → ${queue.length - 1} (Rear)` : "Empty"}
              </span>
            </div>
          </div>
        </div>

        <Badge variant="outline" className="text-xs font-mono bg-muted/50 border-border/80">
          FIFO Principle (First-In-First-Out)
        </Badge>
      </div>

      {/* Main Grid Canvas + Right Legend Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Queue Horizontal Channel (Left 9 Cols) */}
        <div className="lg:col-span-9 p-6 rounded-2xl bg-card border border-border/80 shadow-sm relative min-h-[460px] flex flex-col justify-between overflow-hidden">
          {/* Y-Axis Dashed Grid Lines */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
            {yAxisLevels.map((lvl) => (
              <div key={lvl} className="w-full flex items-center gap-3">
                <span className="text-[11px] font-mono text-muted-foreground/60 w-5 text-right select-none">
                  {lvl}
                </span>
                <div className="flex-1 border-b border-dashed border-border/50" />
              </div>
            ))}
          </div>

          {/* Central Horizontal Queue Flow */}
          <div className="relative z-10 flex-1 flex flex-col justify-center gap-4 py-8">
            <div className="flex justify-between items-center text-xs font-mono font-bold text-muted-foreground px-4">
              <span className="text-emerald-500 flex items-center gap-1">
                <ArrowRight className="h-3.5 w-3.5" /> FRONT (Dequeue Point)
              </span>
              <span className="text-[#1e88e5] flex items-center gap-1">
                REAR (Enqueue Point) <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>

            <div className="w-full h-36 border-2 border-dashed border-[#1e88e5]/40 rounded-2xl bg-muted/10 p-3 flex items-center gap-3 overflow-x-auto shadow-inner">
              <AnimatePresence mode="popLayout">
                {queue.length === 0 ? (
                  <div className="w-full text-center">
                    <span className="text-xs text-muted-foreground font-mono">
                      Queue is Empty<br />(Enqueue elements to begin FIFO pipeline)
                    </span>
                  </div>
                ) : (
                  queue.map((node, idx) => {
                    const isFront = idx === 0;
                    const isRear = idx === queue.length - 1;
                    const isHighlighted = highlightedIndex === node.index;
                    return (
                      <motion.div
                        key={node.id}
                        layout
                        initial={{ opacity: 0, x: 80, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -80, scale: 0.8 }}
                        transition={{ duration: 0.25 }}
                        className={`shrink-0 w-20 h-24 rounded-xl flex flex-col items-center justify-between p-2 font-mono font-bold shadow-md transition-all ${
                          isHighlighted
                            ? "bg-[#f59e0b] text-slate-950 border border-amber-300 ring-2 ring-amber-400/40"
                            : isFront
                            ? "bg-emerald-600 text-white border border-emerald-400"
                            : isRear
                            ? "bg-[#1e88e5] text-white border border-blue-400"
                            : "bg-card border border-border/80 text-foreground"
                        }`}
                      >
                        <span className="text-[10px] opacity-70">Idx {idx}</span>
                        <span className="text-xl font-black">{node.value}</span>
                        <span className="text-[9px] uppercase tracking-wider opacity-80">
                          {isFront ? "FRONT" : isRear ? "REAR" : "NODE"}
                        </span>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Baseline */}
          <div className="h-[2px] w-full bg-border/90 relative z-10" />
        </div>

        {/* Right Info Cards (Legend & Current Queue Elements) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-xs space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
              Legend
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="h-3.5 w-3.5 rounded-sm bg-emerald-600" />
                <span className="font-medium text-foreground">Front Node (Dequeue)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-3.5 w-3.5 rounded-sm bg-[#1e88e5]" />
                <span className="font-medium text-foreground">Rear Node (Enqueue)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-3.5 w-3.5 rounded-sm bg-[#f59e0b]" />
                <span className="font-medium text-foreground">Active Mutate</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-3.5 w-3.5 rounded-sm bg-card border border-border" />
                <span className="font-medium text-foreground">Buffer Element</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-xs space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
              Current Array Representation
            </h4>
            <div className="p-3 bg-muted/60 rounded-xl font-mono text-xs text-foreground break-all border border-border/60">
              [{queue.map((n) => n.value).join(", ")}]
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status & Complexity Badges */}
      <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#1e88e5]/10 text-[#1e88e5] border border-[#1e88e5]/20">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-foreground block">
              Queue Pipeline Status
            </span>
            <span className="text-[11px] text-muted-foreground">
              {queue.length === 0
                ? "Queue is empty. Click ENQUEUE to insert items."
                : `Front item is ${queue[0]?.value}, ready for FIFO dequeue.`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            Enqueue: O(1)
          </Badge>
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            Dequeue: O(1)
          </Badge>
          <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30">
            Space: O(N)
          </Badge>
        </div>
      </div>
    </div>
  );
}