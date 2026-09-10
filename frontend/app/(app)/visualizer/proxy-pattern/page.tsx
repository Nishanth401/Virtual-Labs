import { LLDPatternsVisualizer } from "@/components/visualizer/lld-suite/lld-patterns-visualizer";

export const metadata = {
  title: "Proxy Pattern Visualizer | Low-Level Design Studio",
  description: "Virtual lazy loading, protection access control, and caching proxy placeholders.",
};

export default function ProxyPatternPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <LLDPatternsVisualizer initialModule="proxy-pattern" />
    </div>
  );
}
