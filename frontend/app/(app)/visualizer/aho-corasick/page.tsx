import { StringAlgosVisualizer } from "@/components/visualizer/string-algos-suite/string-algos-visualizer";

export const metadata = {
  title: "Aho-Corasick Automaton Visualizer | String Algorithms Studio",
  description: "Multi-keyword dictionary matching using Trie and failure links in linear O(N+M+Z).",
};

export default function AhoCorasickPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <StringAlgosVisualizer initialModule="aho-corasick" />
    </div>
  );
}
