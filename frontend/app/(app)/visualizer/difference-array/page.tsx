import { DifferenceArrayVisualizer } from "@/components/visualizer/difference-array/difference-array-visualizer";

export const metadata = {
  title: "Difference Array Algorithm Visualizer | Virtual Labs",
  description: "Interactive step-by-step visualization of O(1) Difference Array range updates.",
};

export default function DifferenceArrayPage() {
  return (
    <div className="container mx-auto py-6">
      <DifferenceArrayVisualizer />
    </div>
  );
}
