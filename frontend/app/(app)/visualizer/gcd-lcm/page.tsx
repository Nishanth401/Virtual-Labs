import { NumberTheoryVisualizer } from "@/components/visualizer/number-theory-suite/number-theory-visualizer";

export const metadata = {
  title: "GCD & LCM (Euclidean Algorithm) Visualizer | Number Theory",
  description: "Step-by-step Euclidean algorithm for Greatest Common Divisor and Least Common Multiple in O(log min(a,b)).",
};

export default function GcdLcmPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <NumberTheoryVisualizer initialModule="gcd-lcm" />
    </div>
  );
}
