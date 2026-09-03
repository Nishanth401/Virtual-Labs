import { AdvancedAlgosVisualizer } from "@/components/visualizer/system-design-suite/advanced-algos-visualizer";

export const metadata = {
  title: "KMP String Matching (LPS Table) | Advanced Algos Studio",
  description: "Interactive Knuth-Morris-Pratt failure function and LPS array visualizer.",
};

export default function AlgoKmpStringPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedAlgosVisualizer initialModule="kmp" />
    </div>
  );
}
