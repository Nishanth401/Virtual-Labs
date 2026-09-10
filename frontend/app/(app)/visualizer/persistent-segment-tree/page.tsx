import { AdvancedTreesVisualizer } from "@/components/visualizer/advanced-trees-suite/advanced-trees-visualizer";

export const metadata = {
  title: "Persistent Segment Tree Visualizer | Advanced Trees",
  description: "Versioned segment tree with node cloning for historical point and range queries in O(log N).",
};

export default function PersistentSegmentTreePage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedTreesVisualizer initialModule="persistent-segment-tree" />
    </div>
  );
}
