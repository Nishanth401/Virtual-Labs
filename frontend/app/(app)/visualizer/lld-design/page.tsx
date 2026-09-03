import { MachineCodingStudio } from "@/components/visualizer/lld-studio/machine-coding-studio";

export const metadata = {
  title: "Low-Level Design (LLD) & Machine Coding | Virtual Labs",
  description: "Interactive Low-Level Design (LLD), UML class diagram generator, 60-minute timed machine coding simulator, and GoF design patterns.",
};

export default function LLDDesignPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <MachineCodingStudio />
    </div>
  );
}
