import { GreedyExtensionsVisualizer } from "@/components/visualizer/greedy-suite/greedy-extensions-visualizer";

export const metadata = {
  title: "Fractional Knapsack Visualizer | Greedy Algorithms",
  description: "Greedy value-to-weight ratio sorting and continuous resource allocation in O(N log N).",
};

export default function FractionalKnapsackPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <GreedyExtensionsVisualizer initialModule="fractional-knapsack" />
    </div>
  );
}
