import { NumberTheoryVisualizer } from "@/components/visualizer/number-theory-suite/number-theory-visualizer";

export const metadata = {
  title: "Fast Binary Exponentiation Visualizer | Number Theory",
  description: "Compute (a^b mod m) in O(log b) using bitwise exponent decomposition and repeated squaring.",
};

export default function FastExponentiationPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <NumberTheoryVisualizer initialModule="fast-exponentiation" />
    </div>
  );
}
