import { AdvancedAlgosVisualizer } from "@/components/visualizer/system-design-suite/advanced-algos-visualizer";

export const metadata = {
  title: "Rabin-Karp Rolling Hash | Advanced Algos Studio",
  description: "Interactive polynomial rolling hash and sliding window visualizer.",
};

export default function AlgoRabinKarpPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedAlgosVisualizer initialModule="rabin-karp" />
    </div>
  );
}
