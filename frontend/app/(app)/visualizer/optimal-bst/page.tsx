import { AdvancedDPPatternsVisualizer } from "@/components/visualizer/advanced-dp-suite/advanced-dp-patterns-visualizer";

export const metadata = {
  title: "Optimal Binary Search Tree (OBST) Visualizer | Advanced DP",
  description: "Dynamic programming for minimum expected BST search cost in O(N³).",
};

export default function OptimalBstPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedDPPatternsVisualizer initialModule="optimal-bst" />
    </div>
  );
}
