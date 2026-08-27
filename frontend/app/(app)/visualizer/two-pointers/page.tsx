import { TwoPointersVisualizer } from "@/components/visualizer/two-pointers/two-pointers-visualizer";

export const metadata = {
  title: "Two Pointers Algorithm Visualizer | Virtual Labs",
  description: "Interactive step-by-step visualization of the Two Pointers algorithmic pattern including Two Sum II and Container With Most Water.",
};

export default function TwoPointersPage() {
  return (
    <div className="container mx-auto py-6">
      <TwoPointersVisualizer />
    </div>
  );
}
