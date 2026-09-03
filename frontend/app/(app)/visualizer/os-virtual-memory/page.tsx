import { DeepOSVisualizer } from "@/components/visualizer/system-design-suite/deep-os-visualizer";

export const metadata = {
  title: "Virtual Memory & MMU Paging | Kernel Studio",
  description: "Interactive MMU two-level address translation and TLB cache hit/miss visualizer.",
};

export default function OsVirtualMemoryPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <DeepOSVisualizer initialModule="virtual-memory" />
    </div>
  );
}
