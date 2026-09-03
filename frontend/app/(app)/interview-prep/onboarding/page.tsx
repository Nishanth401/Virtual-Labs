import { OnboardingQuiz } from "@/components/prep-suite/onboarding-quiz";

export const metadata = {
  title: "Career Diagnostic & Onboarding Profiler | Virtual Labs",
  description: "Personalized 3-step diagnostic assessment to calibrate your technical interview preparation roadmap.",
};

export default function OnboardingPage() {
  return (
    <div className="container mx-auto py-10 max-w-7xl">
      <OnboardingQuiz />
    </div>
  );
}
