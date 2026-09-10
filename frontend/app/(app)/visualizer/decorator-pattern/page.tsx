import { LLDPatternsVisualizer } from "@/components/visualizer/lld-suite/lld-patterns-visualizer";

export const metadata = {
  title: "Decorator Pattern Visualizer | Low-Level Design Studio",
  description: "Dynamic runtime behavior extension layering without exploding subclass inheritance trees.",
};

export default function DecoratorPatternPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <LLDPatternsVisualizer initialModule="decorator-pattern" />
    </div>
  );
}
