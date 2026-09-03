import { MSTVisualizer } from "@/components/visualizer/advanced-suite/mst-visualizer";

export const metadata = {
  title: "Minimum Spanning Tree (MST) Visualizer | Virtual Labs",
  description: "Interactive visualization of Kruskal's (Union-Find) and Prim's (Priority Queue) algorithms.",
};

export default function MSTPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <MSTVisualizer />
    </div>
  );
}
