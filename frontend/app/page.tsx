"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import {
  HeroSection,
  HowClonesWork,
  InteractiveCloneSwitcher,
  LabsDirectoryGrid,
  StudentJourneyFlow,
  SecurityAndIsolation,
  AccreditationAndRoi,
  PricingSection,
  InstitutionalFaqSection,
  CtaBanner,
  BookDemoModal
} from "@/components/landing-page";

export default function HomePage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleScrollToClones = () => {
    const el = document.getElementById("college-clones");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-rose-500/20 selection:text-rose-500">
      <Navbar />

      <main className="flex-1">
        {/* 1. High-Converting B2B Hero Section */}
        <HeroSection
          onOpenDemoModal={() => setIsDemoModalOpen(true)}
          onScrollToClones={handleScrollToClones}
        />

        {/* 2. The 4-Step Institutional Cloning Pipeline */}
        <HowClonesWork />

        {/* 3. Live Interactive College Clone Switcher (VSB, CIT, PSG, SKCT, Anna Univ) */}
        <InteractiveCloneSwitcher
          onOpenDemoModal={() => setIsDemoModalOpen(true)}
        />

        {/* 4. Complete 12 Engineering Laboratories Showcase */}
        <LabsDirectoryGrid />

        {/* 5. Student Onboarding & Verification Flow */}
        <StudentJourneyFlow />

        {/* 6. Strict Multi-Tenant Security & Database Isolation */}
        <SecurityAndIsolation />

        {/* 7. NAAC / NBA Accreditation & CIE Automation */}
        <AccreditationAndRoi />

        {/* 8. Institutional Licensing & Pricing */}
        <PricingSection
          onOpenDemoModal={() => setIsDemoModalOpen(true)}
        />

        {/* 9. Administrative Leadership FAQs */}
        <InstitutionalFaqSection />

        {/* 10. High-Impact Closing CTA Banner */}
        <CtaBanner
          onOpenDemoModal={() => setIsDemoModalOpen(true)}
        />
      </main>

      {/* Global B2B Platform Footer */}
      <Footer />

      {/* Interactive Institutional Free Demo Booking Modal */}
      <BookDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}
