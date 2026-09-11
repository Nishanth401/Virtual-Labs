import { NumberTheoryVisualizer } from "@/components/visualizer/number-theory-suite/number-theory-visualizer";

export const metadata = {
  title: "Modular Multiplicative Inverse Visualizer | Number Theory",
  description: "Compute modular inverses using Fermat's Little Theorem and Extended Euclidean Algorithm in O(log m).",
};

export default function ModularInversePage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <NumberTheoryVisualizer initialModule="modular-inverse" />
    </div>
  );
}
