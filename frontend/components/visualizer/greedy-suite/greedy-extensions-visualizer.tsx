"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Boxes,
  Calendar,
  Layers,
  Divide,
  Coins,
  Sparkles,
  ArrowRight
} from "lucide-react";

export type GreedyModule =
  | "fractional-knapsack"
  | "job-sequencing"
  | "interval-scheduling"
  | "egyptian-fractions"
  | "coin-change-greedy";

interface Props {
  initialModule?: GreedyModule;
}

export function GreedyExtensionsVisualizer({ initialModule = "fractional-knapsack" }: Props) {
  const [activeModule, setActiveModule] = useState<GreedyModule>(initialModule);

  return (
    <div className="space-y-6">
      {/* Module Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono font-bold">
            Greedy Extensions
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Greedy Algorithm Extensions &amp; Edge Cases Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeModule === "fractional-knapsack" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("fractional-knapsack")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Boxes className="h-3.5 w-3.5 mr-1" />
            Fractional Knapsack
          </Button>
          <Button
            variant={activeModule === "job-sequencing" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("job-sequencing")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Job Sequencing
          </Button>
          <Button
            variant={activeModule === "interval-scheduling" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("interval-scheduling")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Layers className="h-3.5 w-3.5 mr-1" />
            Interval Scheduling
          </Button>
          <Button
            variant={activeModule === "egyptian-fractions" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("egyptian-fractions")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Divide className="h-3.5 w-3.5 mr-1" />
            Egyptian Fractions
          </Button>
          <Button
            variant={activeModule === "coin-change-greedy" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("coin-change-greedy")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Coins className="h-3.5 w-3.5 mr-1" />
            Coin Change (Greedy vs DP)
          </Button>
        </div>
      </div>

      {/* Module 1: Fractional Knapsack */}
      {activeModule === "fractional-knapsack" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Boxes className="h-5 w-5 text-amber-500" />
                  Fractional Knapsack (Greedy Value-to-Weight Ratio)
                </CardTitle>
                <CardDescription>
                  Greedily take items with maximum (Value / Weight) ratio; fractions of items are allowed to maximize profit.
                </CardDescription>
              </div>
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                Time: O(N log N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border space-y-3 font-mono text-xs">
              <div className="text-sm font-bold text-amber-400">Sorting by Ratio = v_i / w_i:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                  <div className="font-bold text-emerald-400">Item 1: Val $60, Wt 10kg</div>
                  <div className="text-muted-foreground mt-1">Ratio: 6.0 | Taken: 100% (10kg)</div>
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                  <div className="font-bold text-emerald-400">Item 2: Val $100, Wt 20kg</div>
                  <div className="text-muted-foreground mt-1">Ratio: 5.0 | Taken: 100% (20kg)</div>
                </div>
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <div className="font-bold text-amber-400">Item 3: Val $120, Wt 30kg</div>
                  <div className="text-muted-foreground mt-1">Ratio: 4.0 | Taken: 66.7% (20kg)</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 2: Job Sequencing with Deadlines */}
      {activeModule === "job-sequencing" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-indigo-500" />
                  Job Sequencing with Deadlines
                </CardTitle>
                <CardDescription>
                  Maximize total profit by scheduling jobs with deadlines into the latest available time slot before their deadline.
                </CardDescription>
              </div>
              <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
                Time: O(N²) or O(N log N) Disjoint Set
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-indigo-400">Time Slot Assignment:</div>
              <div>Sort jobs by descending profit. Place each job J in highest vacant slot t ≤ deadline(J).</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 3: Interval Scheduling */}
      {activeModule === "interval-scheduling" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Layers className="h-5 w-5 text-teal-500" />
                  Interval Scheduling &amp; Partitioning (Meeting Rooms)
                </CardTitle>
                <CardDescription>
                  Earliest Finish Time (EFT) greedy heuristic maximizes mutually compatible non-overlapping intervals.
                </CardDescription>
              </div>
              <Badge className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30">
                Time: O(N log N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-teal-400">Greedy Choice Property:</div>
              <div>Selecting the interval with earliest end time leaves maximum remaining time for subsequent intervals.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 4: Egyptian Fractions */}
      {activeModule === "egyptian-fractions" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Divide className="h-5 w-5 text-purple-500" />
                  Egyptian Fractions Decomposition
                </CardTitle>
                <CardDescription>
                  Greedily express any positive fraction a/b as a sum of distinct unit fractions 1/d by taking d = ⌈b/a⌉.
                </CardDescription>
              </div>
              <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30">
                Greedy Unit Fractions
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-purple-400">Example: 6/14</div>
              <div>6/14 = 1/3 + 1/11 + 1/231</div>
              <div className="text-muted-foreground mt-1">Formula: d = ⌈b / a⌉, then recurse on (a/b - 1/d).</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 5: Coin Change Greedy vs DP */}
      {activeModule === "coin-change-greedy" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Coins className="h-5 w-5 text-rose-500" />
                  Coin Change: Canonical (Greedy) vs Non-Canonical (DP)
                </CardTitle>
                <CardDescription>
                  Understand why Greedy works for standard currencies (1, 5, 10, 25) but FAILS for arbitrary denominations like [1, 3, 4] for amount 6.
                </CardDescription>
              </div>
              <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
                Canonical vs Arbitrary
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                <div className="font-bold text-rose-400">Greedy Approach on [1, 3, 4] for Target 6</div>
                <div className="text-foreground mt-2">1. Takes 4 (rem 2) → Takes 1 → Takes 1</div>
                <div className="text-rose-400 font-bold mt-1">Total Coins = 3 ([4, 1, 1]) ❌ SUBOPTIMAL</div>
              </div>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <div className="font-bold text-emerald-400">Dynamic Programming (DP) Approach</div>
                <div className="text-foreground mt-2">1. Evaluates min coins for each subproblem</div>
                <div className="text-emerald-400 font-bold mt-1">Total Coins = 2 ([3, 3]) ✅ OPTIMAL</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
