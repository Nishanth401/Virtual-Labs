import { AdvancedGraphsPatternsVisualizer } from "@/components/visualizer/advanced-graphs-suite/advanced-graphs-patterns-visualizer";

export const metadata = {
  title: "Eulerian Path & Circuit Visualizer | Advanced Graphs",
  description: "Hierholzer's algorithm finding Eulerian trails traversing every edge exactly once in O(V + E).",
};

export default function EulerianPathPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedGraphsPatternsVisualizer initialModule="eulerian-path" />
    </div>
  );
}
