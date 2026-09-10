import { StringAlgosVisualizer } from "@/components/visualizer/string-algos-suite/string-algos-visualizer";

export const metadata = {
  title: "Manacher's Algorithm Visualizer | String Algorithms Studio",
  description: "Find longest palindromic substring in strictly linear O(N) time with radius expansion.",
};

export default function ManachersAlgorithmPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <StringAlgosVisualizer initialModule="manachers" />
    </div>
  );
}
