import { AdvancedTreesVisualizer } from "@/components/visualizer/advanced-trees-suite/advanced-trees-visualizer";

export const metadata = {
  title: "Cartesian Tree (RMQ) Visualizer | Advanced Trees",
  description: "Linear O(N) Cartesian Tree construction for Range Minimum Queries and LCA mappings.",
};

export default function CartesianTreePage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedTreesVisualizer initialModule="cartesian-tree" />
    </div>
  );
}
