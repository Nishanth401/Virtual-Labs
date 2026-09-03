import { AdvancedGreedyVisualizer } from "@/components/visualizer/advanced-suite/advanced-greedy-visualizer";

export const metadata = {
  title: "Advanced Greedy Patterns Visualizer | Virtual Labs",
  description: "Interactive visualization of Merge Intervals and Jump Game maximum reach tracking.",
};

export default function AdvancedGreedyPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedGreedyVisualizer />
    </div>
  );
}
