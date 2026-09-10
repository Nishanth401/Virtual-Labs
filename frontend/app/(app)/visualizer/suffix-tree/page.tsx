import { StringAlgosVisualizer } from "@/components/visualizer/string-algos-suite/string-algos-visualizer";

export const metadata = {
  title: "Suffix Tree (Ukkonen's) Visualizer | String Algorithms Studio",
  description: "Compressed suffix trie with suffix links supporting linear O(N) substring queries.",
};

export default function SuffixTreePage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <StringAlgosVisualizer initialModule="suffix-tree" />
    </div>
  );
}
