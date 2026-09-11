import { NumberTheoryVisualizer } from "@/components/visualizer/number-theory-suite/number-theory-visualizer";

export const metadata = {
  title: "Prime Factorization Visualizer | Number Theory",
  description: "Decompose any positive integer into unique prime powers in O(√N).",
};

export default function PrimeFactorizationPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <NumberTheoryVisualizer initialModule="prime-factorization" />
    </div>
  );
}
