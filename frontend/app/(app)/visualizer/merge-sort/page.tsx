import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer";

export const metadata = {
  title: "Merge Sort Visualizer | Virtual Labs",
  description: "Interactive Merge Sort algorithm visualization with divide-and-conquer splitting and two-way merging animations.",
};

export default function MergeSortPage() {
  return (
    <SortingVisualizer
      algorithm="merge"
      title="Merge Sort Visualizer"
      description="Merge Sort divides the input array into halves, recursively sorts each half, and merges the sorted halves in linear time O(n log n)."
    />
  );
}
