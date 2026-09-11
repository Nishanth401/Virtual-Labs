import { AdvancedTreesVisualizer } from "@/components/visualizer/advanced-trees-suite/advanced-trees-visualizer";

export const metadata = {
  title: "LCA with Binary Lifting Visualizer | Advanced Trees",
  description: "Logarithmic LCA queries using 2^k ancestor jump tables in O(log N).",
};

export default function LcaBinaryLiftingPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedTreesVisualizer initialModule="lca-binary-lifting" />
    </div>
  );
}
