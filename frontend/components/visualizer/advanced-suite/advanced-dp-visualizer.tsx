"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, Play, RotateCcw, ChevronRight, ChevronLeft, Info, CheckCircle2 } from "lucide-react";

export function AdvancedDPVisualizer() {
  const [stepIdx, setStepIdx] = useState<number>(0);

  // Stock Trading with Cooldown (State Machine DP):
  // 3 States: HELD (holding stock), SOLD (sold today, enter cooldown), REST (idle)
  // Prices: [1, 2, 3, 0, 2]
  const steps = [
    { day: 0, price: 1, held: -1, sold: 0, rest: 0, desc: "Day 0 (Price $1): Can buy stock (Held: -$1) or Rest ($0)." },
    { day: 1, price: 2, held: -1, sold: 1, rest: 0, desc: "Day 1 (Price $2): Selling stock gives profit $1 (Sold: $1)." },
    { day: 2, price: 3, held: -1, sold: 2, rest: 1, desc: "Day 2 (Price $3): Selling gives profit $2. Rest state moves to $1." },
    { day: 3, price: 0, held: 1, sold: -1, rest: 2, desc: "Day 3 (Price $0): Cooldown active from sale! Rest state remains $2. Can buy cheap at $0 (Held: $2 - $0 = $2)." },
    { day: 4, price: 2, held: 1, sold: 3, rest: 2, desc: "🎉 Day 4 (Price $2): Sell stock bought on Day 3 for profit $2 + $1 = $3! Max achievable profit with cooldown = $3!" }
  ];

  const cur = steps[Math.min(stepIdx, steps.length - 1)];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
            Phase 4: Dynamic Programming
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            State Machine DP (Stock Trading with Cooldown)
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Advanced DP Patterns Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Model complex transitions using Finite State Machine (FSM) Dynamic Programming: HELD, SOLD, and REST states ensuring mandatory cooling-off periods in linear $O(N)$ time.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => setStepIdx(p => p + 1)}
            disabled={stepIdx >= steps.length - 1}
            className="h-8 text-xs font-bold gap-1 rounded-xl bg-primary text-primary-foreground"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Next Trading Day</span>
          </Button>

          <Button size="sm" variant="outline" onClick={() => setStepIdx(0)} className="h-8 w-8 p-0 rounded-xl" title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span>Day: <strong>{cur.day}</strong> (Price: ${cur.price})</span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            O(N) Time • O(1) Space FSM
          </Badge>
        </div>
      </div>

      {/* Main Canvas: FSM State Bubbles */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div className="space-y-6 max-w-xl mx-auto py-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center font-bold">
            State Machine Transitions: HELD ──→ SOLD ──→ REST ──→ HELD
          </span>

          <div className="grid grid-cols-3 gap-4">
            {/* HELD STATE */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 flex flex-col items-center shadow-xs">
              <span className="text-[10px] font-mono text-amber-500 uppercase font-bold">HELD State</span>
              <span className="text-2xl font-bold font-mono text-foreground mt-1">
                ${cur.held}
              </span>
              <span className="text-[9px] font-mono text-muted-foreground mt-1 text-center">
                Holding share
              </span>
            </div>

            {/* SOLD STATE */}
            <div className="p-4 rounded-2xl bg-rose-500/10 border-2 border-rose-500/40 flex flex-col items-center shadow-xs">
              <span className="text-[10px] font-mono text-rose-500 uppercase font-bold">SOLD State</span>
              <span className="text-2xl font-bold font-mono text-foreground mt-1">
                ${cur.sold}
              </span>
              <span className="text-[9px] font-mono text-muted-foreground mt-1 text-center">
                Enters cooldown
              </span>
            </div>

            {/* REST STATE */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 flex flex-col items-center shadow-xs">
              <span className="text-[10px] font-mono text-emerald-500 uppercase font-bold">REST State</span>
              <span className="text-2xl font-bold font-mono text-foreground mt-1">
                ${cur.rest}
              </span>
              <span className="text-[9px] font-mono text-muted-foreground mt-1 text-center">
                Ready to buy
              </span>
            </div>
          </div>
        </div>

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>{cur.desc}</span>
        </div>
      </Card>
    </div>
  );
}
