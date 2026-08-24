import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer";

export const metadata = {
  title: "Bubble Sort Visualizer | Virtual Labs",
  description: "Interactive Bubble Sort algorithm visualization with step-by-step adjacent comparison and swapping animations.",
};

export default function BubbleSortPage() {
  return (
    <SortingVisualizer
      algorithm="bubble"
      title="Bubble Sort Visualizer"
      description="Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order, bubbling the largest unsorted value to the end in each pass."
    />
  );
}
