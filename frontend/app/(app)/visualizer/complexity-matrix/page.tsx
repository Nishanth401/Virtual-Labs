import React from "react";
import { ComplexityMatrix } from "@/components/visualizer/complexity/complexity-matrix";

export const metadata = {
  title: "Complexity Analysis & DS Matrix | Virtual Labs",
  description: "Interactive Big-O growth calculator, data structures comparison matrix, and sorting benchmarks.",
};

export default function ComplexityMatrixPage() {
  return <ComplexityMatrix />;
}
