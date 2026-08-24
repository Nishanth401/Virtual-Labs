"use client";

import React from "react";
import { StackNode } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Layers, Clock, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StackDisplayProps {
  stack: StackNode[];
  highlightedIndex: number | null;
}

export function StackDisplay({ stack, highlightedIndex }: StackDisplayProps) {
  const yAxisLevels = [8, 6, 4, 2, 0];

  return (
    <div className="space-y-5">
      {/* Top Metric Cards matching image.png */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">
                Stack Size
              </span>
              <span className="text-base font-black text-foreground font-mono">{stack.length} / 8</span>
            </div>
            <div className="h-6 w-[1px] bg-border/60" />
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">
                Top Pointer
              </span>
              <span className="text-base font-black text-[#1e88e5] font-mono">
                {stack.length > 0 ? `index ${stack.length - 1}` : "-1 (Empty)"}
              </span>
            </div>
          </div>
        </div>

        <Badge variant="outline" className="text-xs font-mono bg-muted/50 border-border/80">
          LIFO Principle (Last-In-First-Out)
        </Badge>
      </div>

      {/* Main Grid Canvas + Right Legend Side Panel matching image.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Stack Canvas (Left 9 Cols) */}
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

          {/* Central Vertical Stack Column */}
          <div className="relative z-10 flex-1 flex items-end justify-center pb-2">
            <div className="w-48 sm:w-56 h-[340px] border-2 border-dashed border-[#1e88e5]/40 rounded-2xl bg-muted/10 p-2 flex flex-col-reverse gap-1.5 overflow-hidden shadow-inner">
              <AnimatePresence mode="popLayout">
                {stack.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-center p-4">
                    <span className="text-xs text-muted-foreground font-mono">
                      Stack is Empty<br />(Push an element to begin)
                    </span>
                  </div>
                ) : (
                  stack.map((node, idx) => {
                    const isTop = idx === stack.length - 1;
                    const isHighlighted = highlightedIndex === node.index;
                    return (
                      <motion.div
                        key={node.id}
                        layout
                        initial={{ opacity: 0, y: -40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -40, scale: 0.8 }}
                        transition={{ duration: 0.25 }}
                        className={`h-11 rounded-xl flex items-center justify-between px-4 font-mono font-bold text-sm shadow-md transition-all ${
                          isHighlighted
                            ? "bg-[#f59e0b] text-slate-950 border border-amber-300 ring-2 ring-amber-400/40"
                            : isTop
                            ? "bg-[#1e88e5] text-white border border-blue-400"
                            : "bg-card border border-border/80 text-foreground"
                        }`}
                      >
                        <span className="text-xs opacity-70">[{idx}]</span>
                        <span className="text-base font-black">{node.value}</span>
                        {isTop ? (
                          <Badge className="bg-white/20 text-white hover:bg-white/20 text-[9px] font-mono uppercase px-1 py-0">
                            TOP
                          </Badge>
                        ) : (
                          <span className="w-6" />
                        )}
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

        {/* Right Info Cards (Legend & Current Stack Elements) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Legend Card matching image.png */}
          <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-xs space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
              Legend
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="h-3.5 w-3.5 rounded-sm bg-[#1e88e5]" />
                <span className="font-medium text-foreground">Top Element</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-3.5 w-3.5 rounded-sm bg-card border border-border" />
                <span className="font-medium text-foreground">Stack Frame</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-3.5 w-3.5 rounded-sm bg-[#f59e0b]" />
                <span className="font-medium text-foreground">Active Mutate</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-3.5 w-3.5 rounded-sm bg-[#ef4444]" />
                <span className="font-medium text-foreground">Popped Element</span>
              </div>
            </div>
          </div>

          {/* Current Stack Array Card */}
          <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-xs space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
              Current Array Representation
            </h4>
            <div className="p-3 bg-muted/60 rounded-xl font-mono text-xs text-foreground break-all border border-border/60">
              [{stack.map((n) => n.value).join(", ")}]
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status & Complexity Badges matching image.png */}
      <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#1e88e5]/10 text-[#1e88e5] border border-[#1e88e5]/20">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-foreground block">
              Stack Operations Status
            </span>
            <span className="text-[11px] text-muted-foreground">
              {stack.length === 0
                ? "Stack is empty. Click PUSH to insert items."
                : `Top element is ${stack[stack.length - 1]?.value} at index ${stack.length - 1}.`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            Push: O(1)
          </Badge>
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            Pop: O(1)
          </Badge>
          <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30">
            Space: O(N)
          </Badge>
        </div>
      </div>
    </div>
  );
}