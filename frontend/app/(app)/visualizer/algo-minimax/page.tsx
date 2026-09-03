import { AdvancedAlgosVisualizer } from "@/components/visualizer/system-design-suite/advanced-algos-visualizer";

export const metadata = {
  title: "Game Theory & Minimax with Alpha-Beta | Advanced Algos Studio",
  description: "Interactive minimax game tree and alpha-beta pruning visualizer.",
};

export default function AlgoMinimaxPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedAlgosVisualizer initialModule="minimax" />
    </div>
  );
}
