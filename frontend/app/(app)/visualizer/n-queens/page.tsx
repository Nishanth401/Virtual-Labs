"use client";

import React from "react";
import { RecursionBacktrackingVisualizer } from "@/components/dsa-visualization/recursion-backtracking-visualizer";

export default function NQueensPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">N-Queens &amp; Backtracking</h1>
        <p className="text-muted-foreground text-sm">
          Interactive constraint satisfaction and backtracking tree traversal placing N non-attacking queens on an N×N chessboard.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
        <RecursionBacktrackingVisualizer defaultMode="nqueens" />
      </div>
    </div>
  );
}
