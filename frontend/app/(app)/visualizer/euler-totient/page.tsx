import { NumberTheoryVisualizer } from "@/components/visualizer/number-theory-suite/number-theory-visualizer";

export const metadata = {
  title: "Euler's Totient Function φ(n) Visualizer | Number Theory",
  description: "Count coprimes up to N using Euler's product formula: φ(n) = n · ∏ (1 - 1/p).",
};

export default function EulerTotientPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <NumberTheoryVisualizer initialModule="totient" />
    </div>
  );
}
