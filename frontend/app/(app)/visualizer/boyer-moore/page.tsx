import { BoyerMooreVisualizer } from "@/components/visualizer/boyer-moore/boyer-moore-visualizer";

export const metadata = {
  title: "Boyer-Moore Majority Vote Algorithm Visualizer | Virtual Labs",
  description: "Interactive step-by-step visualization of the Boyer-Moore Majority Vote algorithm.",
};

export default function BoyerMoorePage() {
  return (
    <div className="container mx-auto py-6">
      <BoyerMooreVisualizer />
    </div>
  );
}
