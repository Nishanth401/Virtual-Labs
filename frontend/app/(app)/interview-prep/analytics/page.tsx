import { PlatformAnalytics } from "@/components/prep-suite/platform-analytics";

export const metadata = {
  title: "Readiness Radar & Spaced Repetition (SRS) | Virtual Labs",
  description: "10-phase interview competency radar chart and Anki-style spaced repetition pattern review deck.",
};

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <PlatformAnalytics />
    </div>
  );
}
