import { AdvancedAlgosVisualizer } from "@/components/visualizer/system-design-suite/advanced-algos-visualizer";

export const metadata = {
  title: "Advanced DP: Trees & Digit DP | Advanced Algos Studio",
  description: "Interactive Tree DP and Digit DP memoization visualizer.",
};

export default function AlgoAdvancedDpPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedAlgosVisualizer initialModule="advanced-dp" />
    </div>
  );
}
