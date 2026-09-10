"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, ShieldCheck, Building2, PhoneCall } from "lucide-react";

interface CtaBannerProps {
  onOpenDemoModal: () => void;
}

export function CtaBanner({ onOpenDemoModal }: CtaBannerProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-rose-950/20 to-background border-b border-border/60 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-rose-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <Badge className="bg-rose-500/15 text-rose-500 border border-rose-500/30 text-xs font-mono uppercase px-3 py-1">
          Zero Commitment • 100% Free Campus Demo
        </Badge>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-foreground tracking-tight max-w-3xl mx-auto leading-tight">
          Ready to Launch an Accredited Virtual Lab Clone for Your College?
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Join leading engineering colleges empowering their students with interactive algorithm simulators, continuous internal evaluation, and verified lab certification.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Button
            onClick={onOpenDemoModal}
            size="lg"
            className="w-full sm:w-auto h-12 px-8 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-xl shadow-rose-600/25 gap-2 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <Sparkles className="h-4 w-4" />
            <span>Book Your Free Campus Demo</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Dedicated Tenant Database</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-rose-500" />
            <span>Custom College Subdomain</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Live in 24 Hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}
