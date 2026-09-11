import { AdvancedGraphsPatternsVisualizer } from "@/components/visualizer/advanced-graphs-suite/advanced-graphs-patterns-visualizer";

export const metadata = {
  title: "Bridges & Articulation Points Visualizer | Advanced Graphs",
  description: "Tarjan's DFS low-link algorithm identifying critical graph edges and cut vertices in linear O(V + E).",
};

export default function BridgesArticulationPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedGraphsPatternsVisualizer initialModule="bridges-articulation" />
    </div>
  );
}
