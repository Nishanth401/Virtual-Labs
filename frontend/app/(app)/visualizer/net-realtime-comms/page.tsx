import { NetworksVisualizer } from "@/components/visualizer/system-design-suite/networks-visualizer";

export const metadata = {
  title: "WebSockets vs SSE vs Long Polling | Networks Studio",
  description: "Interactive real-time communication architectures and stream visualizer.",
};

export default function NetRealtimeCommsPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <NetworksVisualizer initialModule="realtime" />
    </div>
  );
}
