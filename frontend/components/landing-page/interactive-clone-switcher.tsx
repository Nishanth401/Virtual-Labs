"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { COLLEGES_REGISTRY, CollegeData } from "@/data/colleges";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  GraduationCap,
  Video,
  Globe2,
  ExternalLink,
  Lock,
  UserCheck
} from "lucide-react";

interface InteractiveCloneSwitcherProps {
  onOpenDemoModal: () => void;
}

export function InteractiveCloneSwitcher({ onOpenDemoModal }: InteractiveCloneSwitcherProps) {
  const router = useRouter();
  const [selectedCollege, setSelectedCollege] = useState<CollegeData>(COLLEGES_REGISTRY[0]);

  const handleLaunchCollege = (slug: string) => {
    router.push(`/c/${slug}`);
  };

  return (
    <section id="college-clones" className="py-20 md:py-28 bg-background border-b border-border/60 relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <Badge variant="outline" className="text-xs uppercase font-mono px-3 py-1 bg-rose-500/10 text-rose-500 border-rose-500/25">
            Live Institutional Sandbox
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground tracking-tight">
            Preview Live Clones Created for Other Engineering Colleges
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            See how the platform dynamically transforms with each institution&apos;s accreditation, branding colors, department roster, and autonomous regulation.
          </p>
        </div>

        {/* College Selector Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {COLLEGES_REGISTRY.map((col) => {
            const isSelected = selectedCollege.slug === col.slug;
            return (
              <button
                key={col.slug}
                onClick={() => setSelectedCollege(col)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20 scale-105"
                    : "bg-card text-muted-foreground hover:text-foreground border-border hover:border-border/80"
                }`}
              >
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span>{col.shortName}</span>
                <span className="text-[10px] font-mono opacity-80">({col.code})</span>
              </button>
            );
          })}
        </div>

        {/* Live Interactive Preview Card */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-2xl">
            {/* Top Browser URL Bar Simulation */}
            <div className="px-5 py-3 border-b border-border/60 bg-muted/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="px-4 py-1 rounded-md bg-background border border-border/60 font-mono text-[11px] text-muted-foreground flex items-center gap-1.5 max-w-xs truncate">
                <Lock className="h-3 w-3 text-emerald-500 shrink-0" />
                <span>https://{selectedCollege.slug}.vlab.cloud</span>
              </div>
              <div className="text-[10px] font-mono text-muted-foreground">
                TENANT: {selectedCollege.code}
              </div>
            </div>

            {/* Branded College Header Simulation */}
            <div className={`p-6 sm:p-8 bg-gradient-to-r ${selectedCollege.bannerGradient} text-white space-y-4`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge className="bg-white/15 hover:bg-white/20 text-white border border-white/20 text-xs font-mono">
                  Code: {selectedCollege.code} • {selectedCollege.location}
                </Badge>
                <div className="flex items-center gap-1.5">
                  {selectedCollege.accreditation.slice(0, 3).map((acc) => (
                    <span key={acc} className="px-2 py-0.5 rounded bg-black/30 text-[10px] font-mono font-semibold">
                      {acc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white">
                  {selectedCollege.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-medium">
                  {selectedCollege.tagline}
                </p>
              </div>

              <div className="text-xs text-white/70 font-mono flex items-center gap-2 pt-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>{selectedCollege.affiliations}</span>
              </div>
            </div>

            {/* Inside the Cloned Workspace Details */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Available Departments */}
                <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2.5">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-rose-500" />
                    <span>Configured Branches</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-foreground font-medium">
                    {selectedCollege.departments.map((d) => (
                      <li key={d.code} className="flex items-center justify-between">
                        <span>{d.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-card border text-muted-foreground">
                          {d.code}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Regulation Alignment */}
                <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2.5">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-rose-500" />
                    <span>Curriculum Regulation</span>
                  </div>
                  <div className="text-xs font-bold text-foreground">
                    {selectedCollege.curriculumInfo.regulation}
                  </div>
                  <ul className="space-y-1 text-[11px] text-muted-foreground">
                    {selectedCollege.curriculumInfo.autonomousLabFeatures.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Student Login Flow */}
                <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2.5">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5">
                    <UserCheck className="h-3.5 w-3.5 text-rose-500" />
                    <span>Student Access Pipeline</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-muted-foreground">
                    <div className="p-2 rounded bg-card border text-foreground font-mono text-[10px]">
                      1. Login: student@{selectedCollege.slug}.edu
                    </div>
                    <div className="p-2 rounded bg-card border text-foreground font-mono text-[10px]">
                      2. Verify: RegNo ({selectedCollege.code}...) + Section
                    </div>
                    <div className="p-2 rounded bg-card border text-foreground font-mono text-[10px]">
                      3. Dedicated Student Dashboard &amp; Lab
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions for This College */}
              <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-muted-foreground text-center sm:text-left">
                  Previewing live clone for <strong>{selectedCollege.name}</strong>.
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    onClick={() => handleLaunchCollege(selectedCollege.slug)}
                    className="w-full sm:w-auto h-10 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs gap-2 shadow-md cursor-pointer"
                  >
                    <span>Enter {selectedCollege.shortName} Virtual Lab</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Book Demo Prompt */}
          <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Don&apos;t see your college here? We can provision your institution&apos;s custom clone within 24 hours.{" "}
              <button
                onClick={onOpenDemoModal}
                className="text-rose-600 hover:text-rose-700 font-bold underline cursor-pointer inline-flex items-center gap-1"
              >
                <span>Book a Free Campus Demo</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
