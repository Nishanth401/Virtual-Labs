"use client";

import React from "react";
import { StringSuiteVisualizer } from "@/components/dsa-visualization/string-suite-visualizer";

export default function TriePage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Trie (Prefix Tree) & String Matching</h1>
        <p className="text-muted-foreground text-sm">
          Interactive Trie tree node branching and KMP Longest Prefix Suffix (LPS) string searching.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
        <StringSuiteVisualizer />
      </div>
    </div>
  );
}
