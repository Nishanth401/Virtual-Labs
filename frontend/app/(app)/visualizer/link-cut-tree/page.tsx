import { AdvancedTreesVisualizer } from "@/components/visualizer/advanced-trees-suite/advanced-trees-visualizer";

export const metadata = {
  title: "Link-Cut Tree Visualizer | Advanced Trees",
  description: "Dynamic tree forest maintenance supporting Link, Cut, and Path operations in O(log N) amortized.",
};

export default function LinkCutTreePage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedTreesVisualizer initialModule="link-cut-tree" />
    </div>
  );
}
