import { BitManipulationVisualizer } from "@/components/visualizer/advanced-suite/bit-manipulation-visualizer";

export const metadata = {
  title: "Bit Manipulation Studio | Virtual Labs",
  description: "Interactive 8-bit registers, bit toggling, bitwise logic gates, and Brian Kernighan bit counter.",
};

export default function BitManipulationPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <BitManipulationVisualizer />
    </div>
  );
}
