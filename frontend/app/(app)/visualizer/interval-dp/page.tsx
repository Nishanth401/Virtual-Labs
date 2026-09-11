import { AdvancedDPPatternsVisualizer } from "@/components/visualizer/advanced-dp-suite/advanced-dp-patterns-visualizer";

export const metadata = {
  title: "Interval DP Visualizer | Advanced DP Patterns",
  description: "Subarray merging and Burst Balloons interval dynamic programming in O(N³).",
};

export default function IntervalDpPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedDPPatternsVisualizer initialModule="interval-dp" />
    </div>
  );
}
