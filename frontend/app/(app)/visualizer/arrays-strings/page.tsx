import { ArraysStringsVisualizer } from "@/components/visualizer/advanced-suite/arrays-strings-visualizer";

export const metadata = {
  title: "Arrays & Strings Visualizer | Virtual Labs",
  description: "Interactive visualization of 2D matrix rotations and StringBuilder dynamic character buffer resizing.",
};

export default function ArraysStringsPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ArraysStringsVisualizer />
    </div>
  );
}
