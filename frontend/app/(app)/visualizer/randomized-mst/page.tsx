import { ProbabilisticVisualizer } from "@/components/visualizer/probabilistic-suite/probabilistic-visualizer";

export const metadata = {
  title: "Randomized MST (Karger-Klein-Tarjan) | Randomized Algorithms",
  description: "Expected linear time Minimum Spanning Tree via random edge sampling and Borůvka contraction.",
};

export default function RandomizedMstPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ProbabilisticVisualizer initialModule="randomized-mst" />
    </div>
  );
}
