import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer";

export const metadata = {
  title: "Cyclic Sort Visualizer | Virtual Labs",
  description: "Interactive Cyclic Sort algorithm visualization with O(n) in-place value-to-index placement animations.",
};

export default function CyclicSortPage() {
  return (
    <SortingVisualizer
      algorithm="cyclic"
      title="Cyclic Sort Visualizer"
      description="Cyclic Sort iterates through the array and swaps each element to its correct index (value - min), sorting continuous ranges in guaranteed O(n) time."
    />
  );
}
