import { AdvancedDPPatternsVisualizer } from "@/components/visualizer/advanced-dp-suite/advanced-dp-patterns-visualizer";

export const metadata = {
  title: "Matrix Chain Multiplication Visualizer | Advanced DP Patterns",
  description: "Optimal parenthesization DP cost table and split indices in O(N³).",
};

export default function MatrixChainPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedDPPatternsVisualizer initialModule="matrix-chain" />
    </div>
  );
}
