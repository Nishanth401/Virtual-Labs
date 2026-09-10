import { ComputationalGeometryVisualizer } from "@/components/visualizer/geometry-suite/geometry-visualizer";

export const metadata = {
  title: "Point in Polygon (Ray Casting) Visualizer | Computational Geometry",
  description: "Test point inclusion within arbitrary 2D polygons using horizontal ray casting and winding numbers.",
};

export default function PointInPolygonPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ComputationalGeometryVisualizer initialModule="point-in-polygon" />
    </div>
  );
}
