import { AdvancedGraphsPatternsVisualizer } from "@/components/visualizer/advanced-graphs-suite/advanced-graphs-patterns-visualizer";

export const metadata = {
  title: "Bipartite Graph 2-Coloring Check | Advanced Graphs",
  description: "Verify bipartite properties and detect odd-length cycles in O(V + E).",
};

export default function BipartiteCheckPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedGraphsPatternsVisualizer initialModule="bipartite-check" />
    </div>
  );
}
