import { ProbabilisticVisualizer } from "@/components/visualizer/probabilistic-suite/probabilistic-visualizer";

export const metadata = {
  title: "Las Vegas vs Monte Carlo Algorithms | Algorithm Theory",
  description: "Theoretical computer science comparison of deterministic correctness vs bounded error probability.",
};

export default function LasVegasVsMonteCarloPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ProbabilisticVisualizer initialModule="las-vegas-vs-monte-carlo" />
    </div>
  );
}
