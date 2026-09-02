import React from "react";
import { SearchingVisualizer } from "@/components/visualizer/searching/searching-visualizer";

export const metadata = {
  title: "Binary Search Visualizer | Virtual Labs",
  description: "Interactive visualizer for Binary Search algorithm dividing search space logarithmically in O(log N) time.",
};

export default function BinarySearchPage() {
  return <SearchingVisualizer type="binary" />;
}
