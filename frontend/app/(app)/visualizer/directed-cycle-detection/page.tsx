import { AdvancedGraphsPatternsVisualizer } from "@/components/visualizer/advanced-graphs-suite/advanced-graphs-patterns-visualizer";

export const metadata = {
  title: "Directed Graph Cycle Detection (3-Color DFS) | Advanced Graphs",
  description: "White / Gray / Black three-color DFS back-edge cycle detection in O(V + E).",
};

export default function DirectedCycleDetectionPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedGraphsPatternsVisualizer initialModule="cycle-detection-directed" />
    </div>
  );
}
