import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer";

export const metadata = {
  title: "Selection Sort Visualizer | Virtual Labs",
  description: "Interactive Selection Sort algorithm visualization with minimum element scanning and swap tracking.",
};

export default function SelectionSortPage() {
  return (
    <SortingVisualizer
      algorithm="selection"
      title="Selection Sort Visualizer"
      description="Selection Sort divides the array into sorted and unsorted subarrays, finding the minimum unsorted element in each pass and swapping it into place."
    />
  );
}
