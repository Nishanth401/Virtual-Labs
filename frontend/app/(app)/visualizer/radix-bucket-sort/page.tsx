import { RadixBucketVisualizer } from "@/components/visualizer/advanced-suite/radix-bucket-visualizer";

export const metadata = {
  title: "Radix & Bucket Sort Visualizer | Virtual Labs",
  description: "Interactive non-comparison radix digit extraction and bucket sorting visualizer.",
};

export default function RadixBucketSortPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <RadixBucketVisualizer />
    </div>
  );
}
