import { TopologicalSortVisualizer } from "@/components/visualizer/advanced-suite/topological-sort-visualizer";

export const metadata = {
  title: "Topological Sorting Visualizer | Virtual Labs",
  description: "Interactive Kahn's Algorithm in-degree BFS queue and DAG linear ordering visualizer.",
};

export default function TopologicalSortPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <TopologicalSortVisualizer />
    </div>
  );
}
