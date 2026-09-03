import { HLDVisualizer } from "@/components/visualizer/system-design-suite/hld-visualizer";

export const metadata = {
  title: "Database Scaling & Sharding | System Design Studio",
  description: "Interactive horizontal database sharding and hash partitioning visualizer.",
};

export default function HldDatabaseShardingPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <HLDVisualizer initialModule="sharding" />
    </div>
  );
}
