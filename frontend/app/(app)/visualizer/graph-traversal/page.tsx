"use client";

import React from "react";
import { GraphSuiteVisualizer } from "@/components/dsa-visualization/graph-suite-visualizer";

export default function GraphTraversalPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Graph Traversals (BFS &amp; DFS)</h1>
        <p className="text-muted-foreground text-sm">
          Interactive graph exploration using Breadth-First Search (queue) and Depth-First Search (stack/recursion).
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
        <GraphSuiteVisualizer defaultMode="bfs" />
      </div>
    </div>
  );
}
