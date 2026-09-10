import { ProbabilisticVisualizer } from "@/components/visualizer/probabilistic-suite/probabilistic-visualizer";

export const metadata = {
  title: "Bloom Filters Visualizer | Probabilistic Data Structures",
  description: "Space-efficient set membership with zero false negatives and tunable false positive probabilities.",
};

export default function BloomFiltersPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ProbabilisticVisualizer initialModule="bloom-filter" />
    </div>
  );
}
