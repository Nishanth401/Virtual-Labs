import { LLDVisualizer } from "@/components/visualizer/advanced-suite/lld-visualizer";

export const metadata = {
  title: "Low-Level Design (LLD) & OOP Visualizer | Virtual Labs",
  description: "Interactive Low-Level Design (LLD) and OOP visualizer covering SOLID principles and GoF Design Patterns.",
};

export default function LLDDesignPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <LLDVisualizer />
    </div>
  );
}
