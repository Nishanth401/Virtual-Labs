import { SystemDesignComponentsVisualizer } from "@/components/visualizer/system-design-components-suite/system-design-components-visualizer";

export const metadata = {
  title: "Sticky Sessions & Session Affinity | System Design",
  description: "Client to server binding, cookie injection, and session persistence across load balancer pools.",
};

export default function StickySessionsPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <SystemDesignComponentsVisualizer initialModule="sticky-sessions" />
    </div>
  );
}
