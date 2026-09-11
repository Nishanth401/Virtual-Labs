import { LLDPatternsVisualizer } from "@/components/visualizer/lld-suite/lld-patterns-visualizer";

export const metadata = {
  title: "Chain of Responsibility Visualizer | Low-Level Design",
  description: "Sequential request processing pipeline decoupling sender from multiple potential receiver handlers.",
};

export default function ChainOfResponsibilityPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <LLDPatternsVisualizer initialModule="chain-of-responsibility" />
    </div>
  );
}
