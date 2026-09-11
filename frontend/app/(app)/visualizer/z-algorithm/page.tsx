import { StringAlgosVisualizer } from "@/components/visualizer/string-algos-suite/string-algos-visualizer";

export const metadata = {
  title: "Z-Algorithm Visualizer | String Algorithms Studio",
  description: "Linear O(N+M) pattern matching without text backtracking using Z-array.",
};

export default function ZAlgorithmPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <StringAlgosVisualizer initialModule="z-algorithm" />
    </div>
  );
}
