import { AdvancedTreesVisualizer } from "@/components/visualizer/advanced-trees-suite/advanced-trees-visualizer";

export const metadata = {
  title: "Lowest Common Ancestor (LCA) Visualizer | Advanced Trees",
  description: "Interactive Lowest Common Ancestor tree traversal and queries in O(H).",
};

export default function LcaPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedTreesVisualizer initialModule="lca-standard" />
    </div>
  );
}
