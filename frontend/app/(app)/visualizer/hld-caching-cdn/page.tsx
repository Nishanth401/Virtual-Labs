import { HLDVisualizer } from "@/components/visualizer/system-design-suite/hld-visualizer";

export const metadata = {
  title: "Caching Strategies & CDNs | System Design Studio",
  description: "Interactive Cache-Aside, Write-Through, and Write-Back pattern visualizer.",
};

export default function HldCachingCdnPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <HLDVisualizer initialModule="caching" />
    </div>
  );
}
