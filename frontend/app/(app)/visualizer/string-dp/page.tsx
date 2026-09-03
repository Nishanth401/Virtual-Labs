import { StringDPVisualizer } from "@/components/visualizer/advanced-suite/string-dp-visualizer";

export const metadata = {
  title: "String DP Visualizer (LCS & Edit Distance) | Virtual Labs",
  description: "Interactive 2D DP grids for Longest Common Subsequence and Levenshtein Edit Distance.",
};

export default function StringDPPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <StringDPVisualizer />
    </div>
  );
}
