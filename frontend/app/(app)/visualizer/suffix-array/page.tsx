import { StringAlgosVisualizer } from "@/components/visualizer/string-algos-suite/string-algos-visualizer";

export const metadata = {
  title: "Suffix Array & LCP Visualizer | String Algorithms Studio",
  description: "Lexicographically sorted suffixes with Kasai's Longest Common Prefix (LCP) array.",
};

export default function SuffixArrayPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <StringAlgosVisualizer initialModule="suffix-array" />
    </div>
  );
}
