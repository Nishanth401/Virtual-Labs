"use client";

import React from "react";
import { GreedyDpVisualizer } from "@/components/dsa-visualization/greedy-dp-visualizer";

export default function KnapsackPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">0/1 Knapsack &amp; Dynamic Programming</h1>
        <p className="text-muted-foreground text-sm">
          Interactive dynamic programming table computation, overlapping subproblem visualization, and optimal substructure.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
        <GreedyDpVisualizer defaultMode="dp-knapsack-2d" />
      </div>
    </div>
  );
}
