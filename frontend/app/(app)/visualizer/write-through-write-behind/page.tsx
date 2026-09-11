import { SystemDesignComponentsVisualizer } from "@/components/visualizer/system-design-components-suite/system-design-components-visualizer";

export const metadata = {
  title: "Write-Through vs Write-Behind Caching | System Design",
  description: "Cache consistency, latency, and durability trade-offs in distributed database tiers.",
};

export default function WriteThroughWriteBehindPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <SystemDesignComponentsVisualizer initialModule="write-through-write-behind" />
    </div>
  );
}
