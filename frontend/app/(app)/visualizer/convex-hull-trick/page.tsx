import { AdvancedDPPatternsVisualizer } from "@/components/visualizer/advanced-dp-suite/advanced-dp-patterns-visualizer";

export const metadata = {
  title: "Convex Hull Trick (CHT) Visualizer | Advanced DP Patterns",
  description: "Slope envelope optimization reducing 1D DP transitions from O(N²) to O(N log N).",
};

export default function ConvexHullTrickPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedDPPatternsVisualizer initialModule="convex-hull-trick" />
    </div>
  );
}
