import { ComputationalGeometryVisualizer } from "@/components/visualizer/geometry-suite/geometry-visualizer";

export const metadata = {
  title: "Line Segment Intersection (Sweep Line) | Computational Geometry",
  description: "Bentley-Ottmann sweep line detecting intersections among N segments in O((N + K) log N).",
};

export default function LineIntersectionPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ComputationalGeometryVisualizer initialModule="line-intersection" />
    </div>
  );
}
