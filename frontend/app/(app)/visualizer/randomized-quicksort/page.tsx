import { ProbabilisticVisualizer } from "@/components/visualizer/probabilistic-suite/probabilistic-visualizer";

export const metadata = {
  title: "Randomized Quick Sort Visualizer | Randomized Algorithms",
  description: "Randomized pivot selection guaranteeing expected O(N log N) time and neutralizing worst-case partitions.",
};

export default function RandomizedQuickSortPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ProbabilisticVisualizer initialModule="randomized-quicksort" />
    </div>
  );
}
