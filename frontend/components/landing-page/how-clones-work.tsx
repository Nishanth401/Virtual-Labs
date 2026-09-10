"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  PhoneCall,
  Lock,
  UserCheck,
  FlaskConical,
  ArrowRight,
  ShieldCheck,
  Database,
  Globe2,
  Video,
  FileSpreadsheet,
  Award
} from "lucide-react";

export function HowClonesWork() {
  const steps = [
    {
      step: "01",
      icon: PhoneCall,
      title: "Contact & Institutional Booking",
      desc: "Your Dean, Principal, or HOD contacts us or books a free campus demo. We capture your college name, engineering branches, and assigned domain/subdomain.",
      badge: "24-Hour Setup",
      highlights: ["Custom Subdomain (e.g. psg.vlab.cloud)", "College Emblem & Color Branding", "Branch Syllabus Configuration"]
    },
    {
      step: "02",
      icon: Lock,
      title: "Private Database & Student Credentials",
      desc: "We provision an isolated, secure database specifically for your college. We generate dedicated student login credentials (institutional email & password).",
      badge: "Strict Data Isolation",
      highlights: ["Zero Cross-College Data Access", "Encrypted Password Authentication", "Faculty Mentor & Admin Accounts"]
    },
    {
      step: "03",
      icon: UserCheck,
      title: "Student Verification & Onboarding",
      desc: "Students log in and enter their University Register Number, Academic Year, Department, and Section. They are immediately routed to their personal dashboard.",
      badge: "Frictionless Flow",
      highlights: ["5-Field Instant Registration", "Automatic Section Mapping", "Continuous Progress Memory"]
    },
    {
      step: "04",
      icon: FlaskConical,
      title: "College-Tailored Virtual Lab Experience",
      desc: "Students access the lab pre-configured with your syllabus, your faculty's video lectures, and observation manuals. Progress is saved directly to your college's database.",
      badge: "Curriculum Aligned",
      highlights: ["Pre-recommended Faculty Videos", "Observation Sheet / Manual Hosting", "Continuous Evaluation (CIE) & NAAC/NBA Export"]
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-muted/20 border-b border-border/60 relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="text-xs uppercase font-mono px-3 py-1 bg-rose-500/10 text-rose-500 border-rose-500/25">
            The Institutional Cloning Pipeline
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground tracking-tight">
            How Every College Gets a Dedicated Virtual Lab Clone
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            We don&apos;t just give you a shared account. We clone the entire Virtual Lab platform for your institution with your branding, your students&apos; credentials, and an isolated database.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.step}
                className="border border-border/80 bg-card/80 backdrop-blur-xs flex flex-col justify-between rounded-2xl shadow-xs hover:border-rose-500/40 hover:shadow-xl transition-all duration-300 relative group"
              >
                <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Step Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black font-mono text-rose-600/60 group-hover:text-rose-600 transition-colors">
                        {item.step}
                      </span>
                      <Badge variant="secondary" className="text-[10px] font-mono uppercase bg-muted text-muted-foreground">
                        {item.badge}
                      </Badge>
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title & Desc */}
                    <h3 className="font-bold text-base text-foreground font-heading leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="pt-3 border-t border-border/50 space-y-1.5">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-foreground/80 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Isolation Callout Banner */}
        <div className="mt-12 p-5 rounded-2xl bg-card border border-rose-500/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-foreground">
                Strict Multi-Tenant Database Isolation Guarantee
              </div>
              <div className="text-[11px] text-muted-foreground">
                College A students cannot view or access College B records. Progress, assessments, and observation notes are kept private to your college.
              </div>
            </div>
          </div>

          <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-xs font-mono shrink-0 px-3 py-1">
            Zero Data Leakage
          </Badge>
        </div>
      </div>
    </section>
  );
}
