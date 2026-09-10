import { LLDPatternsVisualizer } from "@/components/visualizer/lld-suite/lld-patterns-visualizer";

export const metadata = {
  title: "Composite Pattern Visualizer | Low-Level Design Studio",
  description: "Recursive tree structures where individual leaf elements and branch compositions share uniform APIs.",
};

export default function CompositePatternPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <LLDPatternsVisualizer initialModule="composite-pattern" />
    </div>
  );
}
