import { AdvancedGraphsVisualizer } from "@/components/visualizer/advanced-suite/advanced-graphs-visualizer";

export const metadata = {
  title: "Advanced Graph Concepts Visualizer | Virtual Labs",
  description: "Interactive visualization of Bipartite 2-Coloring and Ford-Fulkerson Network Max Flow.",
};

export default function AdvancedGraphsPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedGraphsVisualizer />
    </div>
  );
}
