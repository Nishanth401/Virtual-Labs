import { HLDVisualizer } from "@/components/visualizer/system-design-suite/hld-visualizer";

export const metadata = {
  title: "Unique ID Generation (Twitter Snowflake) | System Design Studio",
  description: "Interactive Twitter Snowflake 64-bit distributed UUID architecture visualizer.",
};

export default function HldUniqueIdPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <HLDVisualizer initialModule="snowflake" />
    </div>
  );
}
