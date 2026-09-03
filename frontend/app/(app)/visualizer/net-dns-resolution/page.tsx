import { NetworksVisualizer } from "@/components/visualizer/system-design-suite/networks-visualizer";

export const metadata = {
  title: "DNS Resolution Hierarchy | Networks Studio",
  description: "Interactive recursive DNS lookup flow from local cache to authoritative NS.",
};

export default function NetDnsResolutionPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <NetworksVisualizer initialModule="dns" />
    </div>
  );
}
