import { AdvancedGraphsPatternsVisualizer } from "@/components/visualizer/advanced-graphs-suite/advanced-graphs-patterns-visualizer";

export const metadata = {
  title: "Hamiltonian Path & Cycle Visualizer | Advanced Graphs",
  description: "Backtracking and branch pruning state space for NP-complete Hamiltonian graph paths.",
};

export default function HamiltonianPathPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <AdvancedGraphsPatternsVisualizer initialModule="hamiltonian-path" />
    </div>
  );
}
