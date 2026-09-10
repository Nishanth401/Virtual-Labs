import { LLDPatternsVisualizer } from "@/components/visualizer/lld-suite/lld-patterns-visualizer";

export const metadata = {
  title: "Template Method Pattern Visualizer | Low-Level Design",
  description: "Invariant algorithm skeleton in base class with customizable polymorphic subclass step hooks.",
};

export default function TemplateMethodPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <LLDPatternsVisualizer initialModule="template-method" />
    </div>
  );
}
