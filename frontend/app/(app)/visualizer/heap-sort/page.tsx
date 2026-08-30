import React from "react";
import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer";

export const metadata = {
  title: "Heap Sort Visualizer | Virtual Labs",
  description: "Interactive visualizer for Heap Sort using binary max-heap construction and root extraction.",
};

export default function HeapSortPage() {
  return (
    <SortingVisualizer
      algorithm="heap"
      title="Heap Sort Visualizer"
      description="In-place non-stable O(n log n) sorting algorithm using binary max-heap data structure."
    />
  );
}
