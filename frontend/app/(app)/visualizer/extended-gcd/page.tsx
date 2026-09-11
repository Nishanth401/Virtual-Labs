import { NumberTheoryVisualizer } from "@/components/visualizer/number-theory-suite/number-theory-visualizer";

export const metadata = {
  title: "Extended Euclidean Algorithm Visualizer | Number Theory",
  description: "Find integer solutions to Bézout's identity: a·x + b·y = gcd(a,b) and linear Diophantine equations.",
};

export default function ExtendedGcdPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <NumberTheoryVisualizer initialModule="extended-gcd" />
    </div>
  );
}
