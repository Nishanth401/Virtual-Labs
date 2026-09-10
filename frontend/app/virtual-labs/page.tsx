import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { HeroObjectives } from "@/components/vlab/hero-objectives";
import { BroadAreasGrid } from "@/components/vlab/broad-areas-grid";
import { AnnouncementsSection } from "@/components/vlab/announcements-section";
import { TestimonialsSection } from "@/components/vlab/testimonials-section";

export const metadata = {
  title: "Virtual Laboratories Ecosystem | Interactive Simulation & Practice",
  description: "Official interactive virtual laboratory platform. Master Data Structures, Machine Learning, Operating Systems, DBMS, and Computer Networks with simulation-based experiments.",
};

export default function VirtualLabsOverviewPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Laboratory Highlights & Objectives */}
        <HeroObjectives />
        <BroadAreasGrid />
        <AnnouncementsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
