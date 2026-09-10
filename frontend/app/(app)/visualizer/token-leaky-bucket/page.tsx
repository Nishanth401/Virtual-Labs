import { SystemDesignComponentsVisualizer } from "@/components/visualizer/system-design-components-suite/system-design-components-visualizer";

export const metadata = {
  title: "Token Bucket vs Leaky Bucket Visualizer | System Design",
  description: "Traffic burst accommodation vs smooth constant-rate outflow rate limiting algorithms.",
};

export default function TokenLeakyBucketPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <SystemDesignComponentsVisualizer initialModule="token-leaky-bucket" />
    </div>
  );
}
