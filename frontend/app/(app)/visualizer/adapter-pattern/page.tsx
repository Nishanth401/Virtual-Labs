import { LLDPatternsVisualizer } from "@/components/visualizer/lld-suite/lld-patterns-visualizer";

export const metadata = {
  title: "Adapter Pattern Visualizer | Low-Level Design Studio",
  description: "Wrapper pattern enabling incompatible interfaces to collaborate seamlessly.",
};

export default function AdapterPatternPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <LLDPatternsVisualizer initialModule="adapter-pattern" />
    </div>
  );
}
