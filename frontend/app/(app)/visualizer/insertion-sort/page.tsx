import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer";

export const metadata = {
  title: "Insertion Sort Visualizer | Virtual Labs",
  description: "Interactive Insertion Sort algorithm visualization with key extraction and backward element shifting.",
};

export default function InsertionSortPage() {
  return (
    <SortingVisualizer
      algorithm="insertion"
      title="Insertion Sort Visualizer"
      description="Insertion Sort builds a sorted array one item at a time by extracting a key element and shifting larger sorted elements rightward to insert it."
    />
  );
}
