import { ComputationalGeometryVisualizer } from "@/components/visualizer/geometry-suite/geometry-visualizer";

export const metadata = {
  title: "Convex Hull (Jarvis March) Visualizer | Computational Geometry",
  description: "Gift-wrapping algorithm finding convex hull vertices in output-sensitive O(N·H) time.",
};

export default function JarvisMarchPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ComputationalGeometryVisualizer initialModule="jarvis-march" />
    </div>
  );
}
