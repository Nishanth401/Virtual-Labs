import { ProbabilisticVisualizer } from "@/components/visualizer/probabilistic-suite/probabilistic-visualizer";

export const metadata = {
  title: "Skip Lists Visualizer | Probabilistic Data Structures",
  description: "Probabilistic multi-level balanced express tracks with O(log N) expected operations.",
};

export default function SkipListsPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ProbabilisticVisualizer initialModule="skip-list" />
    </div>
  );
}
