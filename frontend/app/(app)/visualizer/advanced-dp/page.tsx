import { AdvancedDPVisualizer } from "@/components/visualizer/advanced-suite/advanced-dp-visualizer";

export const metadata = {
  title: "Advanced DP Patterns Visualizer | Virtual Labs",
  description: "Interactive State Machine DP for Stock Trading with Cooldown and Finite State Machine transitions.",
};

export default function AdvancedDPPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedDPVisualizer />
    </div>
  );
}
