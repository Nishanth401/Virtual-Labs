import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer";

export const metadata = {
  title: "Quick Sort Visualizer | Virtual Labs",
  description: "Interactive Quick Sort algorithm visualization with Lomuto partition scheme, pivot selection, and recursive subarray sorting.",
};

export default function QuickSortPage() {
  return (
    <SortingVisualizer
      algorithm="quick"
      title="Quick Sort Visualizer"
      description="Quick Sort picks a pivot element, partitions the array into values less than and greater than the pivot, and recursively sorts the sub-partitions."
    />
  );
}
