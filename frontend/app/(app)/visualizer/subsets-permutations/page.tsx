import { SubsetsPermutationsVisualizer } from "@/components/visualizer/advanced-suite/subsets-permutations-visualizer";

export const metadata = {
  title: "Subsets & Permutations Visualizer | Virtual Labs",
  description: "Interactive visualization of Include/Exclude combinatorial decision trees and permutation swapping.",
};

export default function SubsetsPermutationsPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <SubsetsPermutationsVisualizer />
    </div>
  );
}
