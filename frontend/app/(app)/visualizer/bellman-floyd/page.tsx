import { BellmanFloydVisualizer } from "@/components/visualizer/advanced-suite/bellman-floyd-visualizer";

export const metadata = {
  title: "Bellman-Ford & Floyd-Warshall Visualizer | Virtual Labs",
  description: "Interactive visualization of negative edge weight relaxation, negative cycle detection, and All-Pairs Shortest Path.",
};

export default function BellmanFloydPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <BellmanFloydVisualizer />
    </div>
  );
}
