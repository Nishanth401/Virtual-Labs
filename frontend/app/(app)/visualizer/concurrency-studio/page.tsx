import { ConcurrencyVisualizer } from "@/components/visualizer/advanced-suite/concurrency-visualizer";

export const metadata = {
  title: "Concurrency & Multithreading Studio | Virtual Labs",
  description: "Interactive visualizer for Mutex locks, critical sections, and Dining Philosophers deadlock prevention.",
};

export default function ConcurrencyStudioPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ConcurrencyVisualizer />
    </div>
  );
}
