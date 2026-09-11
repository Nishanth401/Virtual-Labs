import { LLDPatternsVisualizer } from "@/components/visualizer/lld-suite/lld-patterns-visualizer";

export const metadata = {
  title: "Visitor Pattern Visualizer | Low-Level Design Studio",
  description: "Double dispatch design pattern separating operational logic from complex object structures.",
};

export default function VisitorPatternPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <LLDPatternsVisualizer initialModule="visitor-pattern" />
    </div>
  );
}
