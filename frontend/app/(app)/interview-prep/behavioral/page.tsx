import { BehavioralStudio } from "@/components/prep-suite/behavioral-studio";

export const metadata = {
  title: "Behavioral & Leadership Principles Studio | Virtual Labs",
  description: "Interactive STAR method builder, Amazon 16 Leadership Principles, Google/Meta values matrices, and response evaluation rubric.",
};

export default function BehavioralPrepPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <BehavioralStudio />
    </div>
  );
}
