"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building2,
  Lock,
  Globe2,
  CheckCircle2,
  Play,
  Layers,
  GraduationCap,
  Users
} from "lucide-react";

interface HeroSectionProps {
  onOpenDemoModal: () => void;
  onScrollToClones: () => void;
}

export function HeroSection({ onOpenDemoModal, onScrollToClones }: HeroSectionProps) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-border/60 bg-gradient-to-b from-background via-muted/15 to-background">
      {/* Ambient Radial Lighting Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-rose-600/10 dark:bg-rose-600/15 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          {/* Institutional Accreditation Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-500 text-xs font-semibold shadow-xs font-mono">
            <Globe2 className="h-3.5 w-3.5" />
            <span>Turnkey B2B Virtual Lab Platform for Engineering Colleges</span>
          </div>

          {/* Main Value Proposition Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-foreground leading-[1.15]">
            Deploy a Dedicated Virtual Lab Clone for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600">
              Your College in 24 Hours.
            </span>
          </h1>

          {/* Subheading focusing on the exact requirement */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Give your students a dedicated virtual laboratory customized with your <strong>college name</strong>, your <strong>subdomain</strong>, and <strong>private student login credentials</strong>. Pre-loaded with your autonomous curriculum, your faculty&apos;s video lectures, and strictly isolated student databases.
          </p>

          {/* CTA Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md">
            <Button
              onClick={onOpenDemoModal}
              size="lg"
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-xl shadow-rose-600/25 gap-2 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <Sparkles className="h-4 w-4" />
              <span>Book a Free Campus Demo</span>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              onClick={onScrollToClones}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 px-6 rounded-xl border-border bg-card/60 hover:bg-muted text-foreground font-semibold text-sm gap-2 cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
              <span>Explore College Clones</span>
            </Button>
          </div>

          {/* Key Value Guarantee Badges */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl text-left">
            <div className="p-3 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs flex items-center gap-2.5 shadow-xs">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 shrink-0">
                <Lock className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="font-bold text-xs text-foreground">Isolated Database</div>
                <div className="text-[10px] text-muted-foreground">Zero cross-college access</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs flex items-center gap-2.5 shadow-xs">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="font-bold text-xs text-foreground">Custom Subdomain</div>
                <div className="text-[10px] text-muted-foreground">yourcollege.vlab.cloud</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs flex items-center gap-2.5 shadow-xs">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="font-bold text-xs text-foreground">Autonomous CBCS</div>
                <div className="text-[10px] text-muted-foreground">Anna Univ &amp; NBA aligned</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs flex items-center gap-2.5 shadow-xs">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
                <Layers className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="font-bold text-xs text-foreground">12 Core Labs</div>
                <div className="text-[10px] text-muted-foreground">DSA, OS, Networks, ML</div>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Trust Banner */}
        <div className="mt-16 pt-8 border-t border-border/60 text-center space-y-4">
          <p className="text-xs uppercase font-mono tracking-wider text-muted-foreground font-semibold">
            Adopted &amp; Benchmarked for Leading Engineering Institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-muted-foreground font-medium">
            <span className="px-3 py-1 rounded-lg bg-card border border-border">VSB Engineering College (9225)</span>
            <span className="px-3 py-1 rounded-lg bg-card border border-border">Coimbatore Institute of Technology (7176)</span>
            <span className="px-3 py-1 rounded-lg bg-card border border-border">PSG College of Technology (7177)</span>
            <span className="px-3 py-1 rounded-lg bg-card border border-border">Sri Krishna College of Technology (7214)</span>
            <span className="px-3 py-1 rounded-lg bg-card border border-border">Anna University Campus (0001)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
