import { AdvancedGraphsPatternsVisualizer } from "@/components/visualizer/advanced-graphs-suite/advanced-graphs-patterns-visualizer";

export const metadata = {
  title: "Maximum Bipartite Matching Visualizer | Advanced Graphs",
  description: "Hopcroft-Karp algorithm for maximum cardinality bipartite matching in O(E √V).",
};

export default function BipartiteMatchingPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedGraphsPatternsVisualizer initialModule="bipartite-matching" />
    </div>
  );
}
