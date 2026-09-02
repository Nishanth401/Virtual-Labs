"use client";

import React from "react";
import { HashingSuiteVisualizer } from "@/components/dsa-visualization/hashing-suite-visualizer";

export default function HashingPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Hash Table & Collision Resolution</h1>
        <p className="text-muted-foreground text-sm">
          Interactive hash table simulation showcasing Chaining (linked lists) and Open Addressing (Linear Probing) collision resolution with modulo hashing.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
        <HashingSuiteVisualizer />
      </div>
    </div>
  );
}
