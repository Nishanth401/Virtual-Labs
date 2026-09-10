"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  GraduationCap
} from "lucide-react";

interface PricingSectionProps {
  onOpenDemoModal: () => void;
}

export function PricingSection({ onOpenDemoModal }: PricingSectionProps) {
  const plans = [
    {
      name: "Department Starter",
      tagline: "Ideal for a single engineering department (e.g. AI&DS or CSE) launching virtual labs.",
      price: "₹24,999",
      period: "/ year / department",
      popular: false,
      badge: "Single Branch",
      features: [
        "Up to 500 Active Student Accounts",
        "Dedicated College URL (/c/yourcollege)",
        "Isolated Student Database & Passwords",
        "Full Access to Chosen Department Labs",
        "Custom Observation PDF & Manual Uploads",
        "Faculty CIE Assessment Dashboard",
        "Email & WhatsApp Technical Support"
      ],
      ctaText: "Book Department Demo"
    },
    {
      name: "Enterprise Campus",
      tagline: "The gold standard for engineering colleges seeking NAAC 'A++' & NBA Tier-I accreditation.",
      price: "₹89,999",
      period: "/ year (Full Campus)",
      popular: true,
      badge: "Most Popular for Colleges",
      features: [
        "All Engineering Branches (CSE, AIDS, IT, ECE, EEE, MECH)",
        "Up to 2,500 Active Student Accounts",
        "Dedicated Custom Subdomain (e.g. psg.vlab.cloud)",
        "All 12 Virtual Engineering Laboratories",
        "Pre-Recommended Faculty Video Lectures Hosting",
        "1-Click NAAC & NBA Audit Excel Export",
        "Admin Portal with Full Student Roster Management",
        "Dedicated Technical Account Manager"
      ],
      ctaText: "Book Campus Free Demo"
    },
    {
      name: "Autonomous University",
      tagline: "Tailored enterprise agreement for universities, multi-campus trusts, and deemed universities.",
      price: "Custom SLA",
      period: "Multi-Campus Pricing",
      popular: false,
      badge: "Universities & Trusts",
      features: [
        "Unlimited Student Accounts Across All Campuses",
        "Custom Domain Mapping (lab.youruniversity.edu)",
        "LMS Integration (Moodle, Blackboard, Google Classroom)",
        "On-Premise / Private Cloud Deployment Options",
        "Custom Experiment Transpiler & Simulator Authoring",
        "Custom Anna University / State Regulation Mapping",
        "24/7 Dedicated Priority Engineering SLA"
      ],
      ctaText: "Request University Consultation"
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-muted/20 border-b border-border/60 relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="text-xs uppercase font-mono px-3 py-1 bg-rose-500/10 text-rose-500 border-rose-500/25">
            Institutional Licensing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground tracking-tight">
            Transparent Pricing for Engineering Institutions
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            All plans include private database tenancy, custom college branding, student onboarding workflows, and continuous evaluation engines.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`border bg-card/80 backdrop-blur-xl relative flex flex-col justify-between rounded-3xl transition-all duration-300 ${
                plan.popular
                  ? "border-rose-500/80 shadow-2xl shadow-rose-600/15 scale-[1.03] z-10"
                  : "border-border/80 shadow-sm hover:shadow-xl hover:border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-rose-600 text-white font-mono text-[11px] font-bold shadow-md uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <CardHeader className="p-6 sm:p-8 pb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-[10px] font-mono uppercase">
                    {plan.badge}
                  </Badge>
                </div>

                <CardTitle className="text-xl font-bold font-heading text-foreground">
                  {plan.name}
                </CardTitle>

                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  {plan.tagline}
                </CardDescription>

                <div className="pt-3 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black font-heading text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 pt-2 flex-1 flex flex-col justify-between space-y-6">
                <ul className="space-y-2.5 text-xs text-muted-foreground">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-foreground/90 font-medium">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={onOpenDemoModal}
                  className={`w-full h-11 rounded-xl text-xs font-bold gap-2 cursor-pointer shadow-md ${
                    plan.popular
                      ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/25"
                      : "bg-primary hover:bg-primary/90 text-white"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
