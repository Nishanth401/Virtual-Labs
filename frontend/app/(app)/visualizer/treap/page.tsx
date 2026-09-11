import { AdvancedTreesVisualizer } from "@/components/visualizer/advanced-trees-suite/advanced-trees-visualizer";

export const metadata = {
  title: "Treap (Cartesian Tree + Heap) Visualizer | Advanced Trees",
  description: "Randomized BST + Max-Heap structure for balanced dynamic order statistics.",
};

export default function TreapPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedTreesVisualizer initialModule="treap" />
    </div>
  );
}
