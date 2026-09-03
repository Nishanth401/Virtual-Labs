import { AmortizedAnalysisVisualizer } from "@/components/visualizer/advanced-suite/amortized-analysis-visualizer";

export const metadata = {
  title: "Amortized Analysis Visualizer | Virtual Labs",
  description: "Interactive visualizer of dynamic array capacity doubling and O(1) amortized insertion cost.",
};

export default function AmortizedAnalysisPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AmortizedAnalysisVisualizer />
    </div>
  );
}
