import { ComputationalGeometryVisualizer } from "@/components/visualizer/geometry-suite/geometry-visualizer";

export const metadata = {
  title: "Closest Pair of Points Visualizer | Computational Geometry",
  description: "Divide-and-conquer geometric median split and delta strip scan in O(N log N).",
};

export default function ClosestPairPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ComputationalGeometryVisualizer initialModule="closest-pair" />
    </div>
  );
}
