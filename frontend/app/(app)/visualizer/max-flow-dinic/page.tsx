import { AdvancedGraphsPatternsVisualizer } from "@/components/visualizer/advanced-graphs-suite/advanced-graphs-patterns-visualizer";

export const metadata = {
  title: "Max Flow (Dinic's Algorithm) Visualizer | Advanced Graphs",
  description: "Level graph BFS and blocking flow DFS pushing maximum network flow in O(V² · E).",
};

export default function DinicFlowPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedGraphsPatternsVisualizer initialModule="dinic-flow" />
    </div>
  );
}
