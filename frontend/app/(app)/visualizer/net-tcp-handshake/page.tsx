import { NetworksVisualizer } from "@/components/visualizer/system-design-suite/networks-visualizer";

export const metadata = {
  title: "TCP 3-Way Handshake & Flow Control | Networks Studio",
  description: "Interactive TCP SYN / SYN-ACK / ACK handshake and flow control visualizer.",
};

export default function NetTcpHandshakePage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <NetworksVisualizer initialModule="tcp" />
    </div>
  );
}
