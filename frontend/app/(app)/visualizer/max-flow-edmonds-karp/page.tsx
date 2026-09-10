import { AdvancedGraphsPatternsVisualizer } from "@/components/visualizer/advanced-graphs-suite/advanced-graphs-patterns-visualizer";

export const metadata = {
  title: "Max Flow (Edmonds-Karp) Visualizer | Advanced Graphs",
  description: "BFS shortest augmenting path Ford-Fulkerson maximum network flow in O(V · E²).",
};

export default function EdmondsKarpPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedGraphsPatternsVisualizer initialModule="edmonds-karp" />
    </div>
  );
}
