import { SystemDesignSimulator } from "@/components/prep-suite/system-design-simulator";

export const metadata = {
  title: "45-Minute System Design Interview Simulator | Virtual Labs",
  description: "Guided 45-minute timed system design interview simulator with back-of-the-envelope capacity estimator and bottleneck auditor.",
};

export default function SystemDesignSimulatorPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <SystemDesignSimulator />
    </div>
  );
}
