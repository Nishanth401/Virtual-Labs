import { GreedyExtensionsVisualizer } from "@/components/visualizer/greedy-suite/greedy-extensions-visualizer";

export const metadata = {
  title: "Interval Scheduling & Partitioning | Greedy Algorithms",
  description: "Earliest Finish Time greedy heuristic for maximum non-overlapping intervals and room allocation in O(N log N).",
};

export default function IntervalSchedulingPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <GreedyExtensionsVisualizer initialModule="interval-scheduling" />
    </div>
  );
}
