import { FastSlowVisualizer } from "@/components/visualizer/advanced-suite/fast-slow-visualizer";

export const metadata = {
  title: "Fast & Slow Pointers Visualizer | Virtual Labs",
  description: "Interactive Floyd's cycle detection and loop entrance locator with Tortoise and Hare pointers.",
};

export default function FastSlowPointersPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <FastSlowVisualizer />
    </div>
  );
}
