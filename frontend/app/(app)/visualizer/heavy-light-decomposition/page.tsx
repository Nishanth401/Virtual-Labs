import { AdvancedTreesVisualizer } from "@/components/visualizer/advanced-trees-suite/advanced-trees-visualizer";

export const metadata = {
  title: "Heavy-Light Decomposition (HLD) Visualizer | Advanced Trees",
  description: "Tree chain partitioning for O(log² N) path queries and updates using segment trees.",
};

export default function HldPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedTreesVisualizer initialModule="hld" />
    </div>
  );
}
