import { LLDPatternsVisualizer } from "@/components/visualizer/lld-suite/lld-patterns-visualizer";

export const metadata = {
  title: "Strategy Pattern Visualizer | Low-Level Design Studio",
  description: "Runtime interchangeable algorithm families complying with Open/Closed SOLID principle.",
};

export default function StrategyPatternPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <LLDPatternsVisualizer initialModule="strategy-pattern" />
    </div>
  );
}
