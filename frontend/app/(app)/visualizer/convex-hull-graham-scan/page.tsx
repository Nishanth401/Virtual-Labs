import { ComputationalGeometryVisualizer } from "@/components/visualizer/geometry-suite/geometry-visualizer";

export const metadata = {
  title: "Convex Hull (Graham Scan) Visualizer | Computational Geometry",
  description: "Construct 2D convex hull via polar angle sorting and stack orientation checks in O(N log N).",
};

export default function GrahamScanPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ComputationalGeometryVisualizer initialModule="graham-scan" />
    </div>
  );
}
