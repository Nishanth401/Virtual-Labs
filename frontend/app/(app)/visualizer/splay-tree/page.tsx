import { AdvancedTreesVisualizer } from "@/components/visualizer/advanced-trees-suite/advanced-trees-visualizer";

export const metadata = {
  title: "Splay Tree Visualizer | Advanced Trees",
  description: "Self-adjusting binary search tree rotating accessed elements to root in O(log N) amortized.",
};

export default function SplayTreePage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedTreesVisualizer initialModule="splay-tree" />
    </div>
  );
}
