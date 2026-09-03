import { NetworksVisualizer } from "@/components/visualizer/system-design-suite/networks-visualizer";

export const metadata = {
  title: "HTTP/1.1 vs HTTP/2 vs HTTP/3 | Networks Studio",
  description: "Interactive protocol evolution and binary stream multiplexing visualizer.",
};

export default function NetHttpProtocolsPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <NetworksVisualizer initialModule="http" />
    </div>
  );
}
