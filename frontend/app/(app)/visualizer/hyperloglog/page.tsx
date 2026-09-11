import { ProbabilisticVisualizer } from "@/components/visualizer/probabilistic-suite/probabilistic-visualizer";

export const metadata = {
  title: "HyperLogLog Visualizer | Probabilistic Data Structures",
  description: "Cardinality estimation for billions of unique records in O(1) time and O(log log N) space.",
};

export default function HyperLogLogPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ProbabilisticVisualizer initialModule="hyperloglog" />
    </div>
  );
}
