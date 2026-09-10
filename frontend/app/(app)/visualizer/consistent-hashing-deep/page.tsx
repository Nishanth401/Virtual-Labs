import { SystemDesignComponentsVisualizer } from "@/components/visualizer/system-design-components-suite/system-design-components-visualizer";

export const metadata = {
  title: "Consistent Hashing Deep Dive Visualizer | System Design",
  description: "Virtual nodes, ring topology, and minimal key migration in distributed caching clusters.",
};

export default function ConsistentHashingDeepPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <SystemDesignComponentsVisualizer initialModule="consistent-hashing-deep" />
    </div>
  );
}
