import { HLDVisualizer } from "@/components/visualizer/system-design-suite/hld-visualizer";

export const metadata = {
  title: "Distributed Consensus & CAP Theorem | System Design Studio",
  description: "Interactive Raft consensus leader election and CAP theorem visualizer.",
};

export default function HldDistributedConsensusPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <HLDVisualizer initialModule="consensus" />
    </div>
  );
}
