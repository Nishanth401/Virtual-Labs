import { AdvancedGraphsPatternsVisualizer } from "@/components/visualizer/advanced-graphs-suite/advanced-graphs-patterns-visualizer";

export const metadata = {
  title: "Min-Cost Max Flow (MCMF) Visualizer | Advanced Graphs",
  description: "Successive shortest path algorithm minimizing overall flow transmission costs in O(V · E · log V).",
};

export default function MinCostMaxFlowPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedGraphsPatternsVisualizer initialModule="min-cost-max-flow" />
    </div>
  );
}
