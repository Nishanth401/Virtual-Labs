import { ComputationalGeometryVisualizer } from "@/components/visualizer/geometry-suite/geometry-visualizer";

export const metadata = {
  title: "Polygon Area (Shoelace Formula) Visualizer | Computational Geometry",
  description: "Calculate exact polygon area in linear O(N) using Gauss shoelace formula.",
};

export default function ShoelaceFormulaPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ComputationalGeometryVisualizer initialModule="shoelace-formula" />
    </div>
  );
}
