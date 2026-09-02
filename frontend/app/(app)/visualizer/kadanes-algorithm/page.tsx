import { KadanesVisualizer } from "@/components/visualizer/kadanes-algorithm/kadanes-visualizer";

export const metadata = {
  title: "Kadane's Algorithm Visualizer | Virtual Labs",
  description: "Interactive step-by-step visualization of Kadane's maximum subarray sum algorithm.",
};

export default function KadanesAlgorithmPage() {
  return (
    <div className="container mx-auto py-6">
      <KadanesVisualizer />
    </div>
  );
}
