import { NetworksVisualizer } from "@/components/visualizer/system-design-suite/networks-visualizer";

export const metadata = {
  title: "TLS 1.3 Handshake & HTTPS | Networks Studio",
  description: "Interactive TLS 1.3 cryptographic handshake and symmetric cipher visualizer.",
};

export default function NetTlsHandshakePage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <NetworksVisualizer initialModule="tls" />
    </div>
  );
}
