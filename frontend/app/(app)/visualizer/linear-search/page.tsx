import React from "react";
import { SearchingVisualizer } from "@/components/visualizer/searching/searching-visualizer";

export const metadata = {
  title: "Linear Search Visualizer | Virtual Labs",
  description: "Interactive visualizer for Linear Search algorithm scanning array elements sequentially in O(N) time.",
};

export default function LinearSearchPage() {
  return <SearchingVisualizer type="linear" />;
}
