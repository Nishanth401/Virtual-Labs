import { GridBacktrackingVisualizer } from "@/components/visualizer/advanced-suite/grid-backtracking-visualizer";

export const metadata = {
  title: "Grid & Matrix Backtracking Visualizer | Virtual Labs",
  description: "Interactive visualization of 2D Rat in a Maze and Sudoku Solver constraint satisfaction backtracking.",
};

export default function GridBacktrackingPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <GridBacktrackingVisualizer />
    </div>
  );
}
