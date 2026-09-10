import { AdvancedGraphsPatternsVisualizer } from "@/components/visualizer/advanced-graphs-suite/advanced-graphs-patterns-visualizer";

export const metadata = {
  title: "Graph K-Coloring Visualizer | Advanced Graphs",
  description: "Backtracking chromatic number solver assigning K colors with zero adjacent conflicts.",
};

export default function GraphKColoringPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedGraphsPatternsVisualizer initialModule="graph-coloring" />
    </div>
  );
}
