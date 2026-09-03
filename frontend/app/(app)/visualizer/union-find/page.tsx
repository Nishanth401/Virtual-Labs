import { UnionFindVisualizer } from "@/components/visualizer/advanced-suite/union-find-visualizer";

export const metadata = {
  title: "Disjoint Set (Union-Find) Visualizer | Virtual Labs",
  description: "Interactive visualization of Disjoint Set Union-Find with Path Compression and Union by Rank.",
};

export default function UnionFindPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <UnionFindVisualizer />
    </div>
  );
}
