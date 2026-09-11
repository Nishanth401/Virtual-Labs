import { AdvancedDPPatternsVisualizer } from "@/components/visualizer/advanced-dp-suite/advanced-dp-patterns-visualizer";

export const metadata = {
  title: "DP on DAG Visualizer | Advanced DP Patterns",
  description: "Topological sorting and path dynamic programming on directed acyclic graphs in O(V + E).",
};

export default function DpOnDagPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedDPPatternsVisualizer initialModule="dp-on-dag" />
    </div>
  );
}
