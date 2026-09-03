import { DeepOSVisualizer } from "@/components/visualizer/system-design-suite/deep-os-visualizer";

export const metadata = {
  title: "File Systems, Inodes & Journaling | Kernel Studio",
  description: "Interactive Unix/Ext4 Inode direct/indirect pointers and journaling visualizer.",
};

export default function OsInodeFilesystemPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <DeepOSVisualizer initialModule="inode-fs" />
    </div>
  );
}
