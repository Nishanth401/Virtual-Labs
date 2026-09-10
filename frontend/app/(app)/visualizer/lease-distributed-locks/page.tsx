import { SystemDesignComponentsVisualizer } from "@/components/visualizer/system-design-components-suite/system-design-components-visualizer";

export const metadata = {
  title: "Lease-Based Distributed Locks & Fencing | System Design",
  description: "Fault-tolerant distributed locking, heartbeat renewal, and monotonic fencing tokens.",
};

export default function LeaseDistributedLocksPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <SystemDesignComponentsVisualizer initialModule="lease-distributed-locks" />
    </div>
  );
}
