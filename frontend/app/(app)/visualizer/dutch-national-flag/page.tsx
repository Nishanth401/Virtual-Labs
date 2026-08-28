import { DNFVisualizer } from "@/components/visualizer/dutch-national-flag/dnf-visualizer";

export const metadata = {
  title: "Dutch National Flag Algorithm Visualizer | Virtual Labs",
  description: "Interactive step-by-step visualization of 3-way partitioning for 0s, 1s, and 2s.",
};

export default function DNFPage() {
  return (
    <div className="container mx-auto py-6">
      <DNFVisualizer />
    </div>
  );
}
