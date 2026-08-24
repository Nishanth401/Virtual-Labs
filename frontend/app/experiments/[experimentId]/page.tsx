"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { EXPERIMENTS_DATA } from "@/data/experiments";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ExperimentWorkspace } from "@/components/vlab/experiment-workspace";

interface ExperimentPageProps {
  params: Promise<{ experimentId: string }>;
}

export default function ExperimentPage({ params }: ExperimentPageProps) {
  const { experimentId } = use(params);
  const experiment = EXPERIMENTS_DATA.find(
    (e) => e.slug === experimentId || e.id === experimentId
  );

  if (!experiment) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-muted/20 py-4">
        <ExperimentWorkspace experiment={experiment} />
      </main>
      <Footer />
    </div>
  );
}
