import { NumberTheoryVisualizer } from "@/components/visualizer/number-theory-suite/number-theory-visualizer";

export const metadata = {
  title: "Sieve of Eratosthenes Visualizer | Number Theory",
  description: "Generate all prime numbers ≤ N in O(N log log N) with interactive composite cancellation.",
};

export default function SievePage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <NumberTheoryVisualizer initialModule="sieve" />
    </div>
  );
}
