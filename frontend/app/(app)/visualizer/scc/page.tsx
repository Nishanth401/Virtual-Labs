import { SCCVisualizer } from "@/components/visualizer/advanced-suite/scc-visualizer";

export const metadata = {
  title: "Strongly Connected Components (SCC) Visualizer | Virtual Labs",
  description: "Interactive visualization of Tarjan's Single-Pass DFS Low-Link Algorithm for SCC detection.",
};

export default function SCCPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <SCCVisualizer />
    </div>
  );
}
