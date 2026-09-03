import { DeepOSVisualizer } from "@/components/visualizer/system-design-suite/deep-os-visualizer";

export const metadata = {
  title: "Process Scheduling (Linux CFS) | Kernel Studio",
  description: "Interactive Linux Completely Fair Scheduler and vruntime Red-Black tree visualizer.",
};

export default function OsCfsSchedulerPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <DeepOSVisualizer initialModule="cfs-scheduler" />
    </div>
  );
}
