import { AdvancedAlgosVisualizer } from "@/components/visualizer/system-design-suite/advanced-algos-visualizer";

export const metadata = {
  title: "Line Sweep Algorithm & Geometry | Advanced Algos Studio",
  description: "Interactive 2D line sweep and interval overlap visualizer.",
};

export default function AlgoLineSweepPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedAlgosVisualizer initialModule="line-sweep" />
    </div>
  );
}
