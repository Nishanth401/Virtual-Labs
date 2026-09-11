import { GreedyExtensionsVisualizer } from "@/components/visualizer/greedy-suite/greedy-extensions-visualizer";

export const metadata = {
  title: "Job Sequencing with Deadlines Visualizer | Greedy Algorithms",
  description: "Greedy slot scheduling maximizing total job profit before deadlines in O(N²).",
};

export default function JobSequencingPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <GreedyExtensionsVisualizer initialModule="job-sequencing" />
    </div>
  );
}
