import { ProbabilisticVisualizer } from "@/components/visualizer/probabilistic-suite/probabilistic-visualizer";

export const metadata = {
  title: "Count-Min Sketch Visualizer | Probabilistic Data Structures",
  description: "Sublinear frequency estimation for streaming analytics and heavy hitter detection in O(1) query time.",
};

export default function CountMinSketchPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ProbabilisticVisualizer initialModule="count-min-sketch" />
    </div>
  );
}
