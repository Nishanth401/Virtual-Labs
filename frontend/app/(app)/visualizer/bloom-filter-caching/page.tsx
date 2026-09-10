import { SystemDesignComponentsVisualizer } from "@/components/visualizer/system-design-components-suite/system-design-components-visualizer";

export const metadata = {
  title: "Bloom Filters in Distributed Caching | System Design",
  description: "Cache penetration defense and high-throughput non-existent key interception.",
};

export default function BloomFilterCachingPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <SystemDesignComponentsVisualizer initialModule="bloom-filter-caching" />
    </div>
  );
}
