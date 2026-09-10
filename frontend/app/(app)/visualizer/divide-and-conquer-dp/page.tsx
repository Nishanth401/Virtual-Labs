import { AdvancedDPPatternsVisualizer } from "@/components/visualizer/advanced-dp-suite/advanced-dp-patterns-visualizer";

export const metadata = {
  title: "Divide & Conquer DP Optimization | Advanced DP Patterns",
  description: "Monotone decision boundary optimization reducing complexity to O(K·N log N).",
};

export default function DivideAndConquerDpPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedDPPatternsVisualizer initialModule="divide-and-conquer-dp" />
    </div>
  );
}
