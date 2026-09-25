import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { HeroObjectives } from "@/components/vlab/hero-objectives";
import { BroadAreasGrid } from "@/components/vlab/broad-areas-grid";
import { AnnouncementsSection } from "@/components/vlab/announcements-section";
import { TestimonialsSection } from "@/components/vlab/testimonials-section";

export const metadata = {
  title: "Department Virtual Labs | Artificial Intelligence & Data Science — VSB Engineering College",
  description: "Official interactive virtual laboratory platform for engineering students. Explore artificial intelligence, data science, data structures, algorithms, machine learning labs, simulations, and self-assessment evaluations.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroObjectives />
        <BroadAreasGrid />
        <AnnouncementsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
