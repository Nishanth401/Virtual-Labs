"use client";

import React from "react";
import { GreedyDpVisualizer } from "@/components/dsa-visualization/greedy-dp-visualizer";

export default function GreedyActivityPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Greedy Algorithms: Activity Selection</h1>
        <p className="text-muted-foreground text-sm">
          Interactive interval scheduling and greedy choice property: always picking the activity with earliest finish time.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
        <GreedyDpVisualizer defaultMode="activity" />
      </div>
    </div>
  );
}
