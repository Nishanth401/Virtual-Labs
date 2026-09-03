import { SegmentTreeVisualizer } from "@/components/visualizer/advanced-suite/segment-tree-visualizer";

export const metadata = {
  title: "Segment Tree & Fenwick Visualizer | Virtual Labs",
  description: "Interactive Range Sum Queries and Point Updates using Segment Trees and Binary Indexed Trees.",
};

export default function SegmentTreePage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <SegmentTreeVisualizer />
    </div>
  );
}
