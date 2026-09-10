import { NumberTheoryVisualizer } from "@/components/visualizer/number-theory-suite/number-theory-visualizer";

export const metadata = {
  title: "Modular Arithmetic Visualizer | Number Theory",
  description: "Explore modular addition, subtraction, multiplication, and congruence rings Z/mZ.",
};

export default function ModularArithmeticPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <NumberTheoryVisualizer initialModule="modular-arithmetic" />
    </div>
  );
}
