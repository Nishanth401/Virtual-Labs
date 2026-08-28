import { PrefixSumVisualizer } from "@/components/visualizer/prefix-sum/prefix-sum-visualizer";

export const metadata = {
  title: "Prefix Sum Algorithm Visualizer | Virtual Labs",
  description: "Interactive step-by-step visualization of Prefix Sum construction and O(1) Range Sum Queries.",
};

export default function PrefixSumPage() {
  return (
    <div className="container mx-auto py-6">
      <PrefixSumVisualizer />
    </div>
  );
}
