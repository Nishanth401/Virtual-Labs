import { GreedyExtensionsVisualizer } from "@/components/visualizer/greedy-suite/greedy-extensions-visualizer";

export const metadata = {
  title: "Coin Change (Greedy vs DP) Visualizer | Greedy Algorithms",
  description: "Canonical currency optimality vs arbitrary coin system failure cases in O(N).",
};

export default function CoinChangeGreedyPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <GreedyExtensionsVisualizer initialModule="coin-change-greedy" />
    </div>
  );
}
