import React from "react";
import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer";

export const metadata = {
  title: "Counting Sort Visualizer | Virtual Labs",
  description: "Interactive visualizer for Counting Sort using frequency counting in O(N + K) time.",
};

export default function CountingSortPage() {
  return (
    <SortingVisualizer
      algorithm="counting"
      title="Counting Sort Visualizer"
      description="Non-comparison integer sorting algorithm with linear O(N + K) time complexity."
    />
  );
}
