import { SpaceComplexityVisualizer } from "@/components/visualizer/advanced-suite/space-complexity-visualizer";

export const metadata = {
  title: "Space Complexity Analyzer | Virtual Labs",
  description: "Interactive visualizer of Stack vs. Heap memory, activation call stack frames, and auxiliary working space.",
};

export default function SpaceComplexityPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <SpaceComplexityVisualizer />
    </div>
  );
}
