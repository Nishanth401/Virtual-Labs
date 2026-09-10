import { LLDPatternsVisualizer } from "@/components/visualizer/lld-suite/lld-patterns-visualizer";

export const metadata = {
  title: "Iterator Pattern Visualizer | Low-Level Design Studio",
  description: "Sequential container iteration abstraction decoupling data traversal from underlying memory layout.",
};

export default function IteratorPatternPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <LLDPatternsVisualizer initialModule="iterator-pattern" />
    </div>
  );
}
