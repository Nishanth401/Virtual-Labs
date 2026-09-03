import { MachineCodingStudio } from "@/components/visualizer/lld-studio/machine-coding-studio";

export const metadata = {
  title: "Machine Coding & LLD Studio | Virtual Labs",
  description: "60-minute timed machine coding simulator, UML class diagram generator, and design patterns playground.",
};

export default function MachineCodingPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <MachineCodingStudio />
    </div>
  );
}
