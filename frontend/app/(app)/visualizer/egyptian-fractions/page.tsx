import { GreedyExtensionsVisualizer } from "@/components/visualizer/greedy-suite/greedy-extensions-visualizer";

export const metadata = {
  title: "Egyptian Fractions Decomposition | Greedy Algorithms",
  description: "Greedy fraction decomposition into distinct unit fractions 1/d in O(N).",
};

export default function EgyptianFractionsPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <GreedyExtensionsVisualizer initialModule="egyptian-fractions" />
    </div>
  );
}
