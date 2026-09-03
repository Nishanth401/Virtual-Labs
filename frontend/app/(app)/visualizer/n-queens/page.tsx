"use client";

import { NQueensVisualizer } from "@/components/visualizer/advanced-suite/n-queens-visualizer";

export default function NQueensPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto space-y-6">
      <NQueensVisualizer />
    </div>
  );
}
