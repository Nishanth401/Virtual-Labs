import { AdvancedDPPatternsVisualizer } from "@/components/visualizer/advanced-dp-suite/advanced-dp-patterns-visualizer";

export const metadata = {
  title: "Bitmask DP (Travelling Salesperson) | Advanced DP Patterns",
  description: "Subset state compression dynamic programming solving TSP in O(2ⁿ · n²).",
};

export default function DpBitmaskTspPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedDPPatternsVisualizer initialModule="bitmask-tsp" />
    </div>
  );
}
