import { SlidingWindowVisualizer } from "@/components/visualizer/sliding-window/sliding-window-visualizer";

export const metadata = {
  title: "Sliding Window Algorithm Visualizer | Virtual Labs",
  description: "Interactive step-by-step visualization of fixed and variable Sliding Window algorithmic techniques.",
};

export default function SlidingWindowPage() {
  return (
    <div className="container mx-auto py-6">
      <SlidingWindowVisualizer />
    </div>
  );
}
