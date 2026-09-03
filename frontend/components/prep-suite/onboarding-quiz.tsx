"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Building2,
  Briefcase,
  Calendar,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  RotateCcw
} from "lucide-react";
import { supabase, saveUserReadinessProfile } from "@/lib/supabase";

export function OnboardingQuiz() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState<string>("Backend SDE");
  const [selectedCompany, setSelectedCompany] = useState<string>("Google");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("1-3 Months");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const roles = [
    { id: "Backend SDE", desc: "Distributed systems, HLD, concurrency, data structures, and database scaling." },
    { id: "Full-Stack SDE", desc: "End-to-end architectures, APIs, state management, and algorithmic problem-solving." },
    { id: "Frontend Engineer", desc: "Browser internals, DOM trees, web performance, networking, and UI design patterns." },
    { id: "Systems / Infra", desc: "Linux kernel, MMU virtual memory, OS process scheduling, and network protocols." }
  ];

  const companies = [
    { id: "Google", desc: "Algorithms, Graph theory, Hard DP, Segment trees, and Scalability." },
    { id: "Amazon", desc: "16 Leadership Principles, Low-Level Design (Machine Coding), and Consistent Hashing." },
    { id: "Meta", desc: "High-speed coding execution (2 problems in 45m) and Product Architecture." },
    { id: "Microsoft", desc: "Fundamental data structures, Azure cloud architectures, and Multithreading." }
  ];

  const timelines = [
    { id: "< 1 Month (Crash Course)", desc: "High-yield topics: Sliding window, HLD caching, STAR story formatting." },
    { id: "1-3 Months", desc: "Recommended sweet spot: Full 10 phases, machine coding sprints, and mock interviews." },
    { id: "3-6 Months", desc: "Deep mastery: Advanced hard algorithms, kernel internals, and comprehensive LLD." }
  ];

  const handleFinishDiagnostic = async () => {
    setIsCompleted(true);
    const { data: { session } } = await supabase.auth.getSession();
    const uid = session?.user?.id || "guest_user";
    await saveUserReadinessProfile(uid, {
      targetCompany: selectedCompany,
      targetRole: selectedRole,
      experienceLevel: selectedTimeline,
      phaseScores: {
        "Phase 1": 85,
        "Phase 2": 90,
        "Phase 3": 82,
        "Phase 4": 75,
        "Phase 6": 78,
        "Phase 7": 88,
        "Phase 8": 80,
        "Phase 9": 70,
        "Phase 10": 75,
        "LLD": 85
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="text-center space-y-2">
        <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-mono font-bold">
          Diagnostic Career Profiler
        </Badge>
        <h1 className="text-3xl font-black font-heading text-foreground">
          Calibrate Your Interview Preparation Roadmap
        </h1>
        <p className="text-xs text-muted-foreground max-w-lg mx-auto">
          Tailors your 10-Phase Readiness Radar, highlights your company track, and builds your custom curriculum.
        </p>
      </div>

      {!isCompleted ? (
        <Card className="p-8 bg-card border-border/80 rounded-3xl shadow-xl space-y-6">
          {/* Step Stepper */}
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <span className="text-xs font-mono font-bold uppercase text-primary">
              Step {currentStep} of 3
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all ${
                    s === currentStep ? "w-8 bg-primary" : s < currentStep ? "w-3 bg-primary/40" : "w-3 bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* STEP 1: TARGET ROLE */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold font-heading text-foreground flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                What engineering role are you targeting?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {roles.map((r) => {
                  const isSelected = selectedRole === r.id;
                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRole(r.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-primary/15 border-primary shadow-md scale-[1.02]"
                          : "bg-muted/20 border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="text-sm font-bold font-heading text-foreground block">{r.id}</span>
                      <span className="text-[11px] text-muted-foreground mt-1 block leading-relaxed">{r.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: TARGET COMPANY */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold font-heading text-foreground flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Which company loop are you preparing for?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {companies.map((c) => {
                  const isSelected = selectedCompany === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCompany(c.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-primary/15 border-primary shadow-md scale-[1.02]"
                          : "bg-muted/20 border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="text-sm font-bold font-heading text-foreground block">{c.id}</span>
                      <span className="text-[11px] text-muted-foreground mt-1 block leading-relaxed">{c.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: TIMELINE */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold font-heading text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                What is your preparation timeline?
              </h3>
              <div className="space-y-3">
                {timelines.map((t) => {
                  const isSelected = selectedTimeline === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTimeline(t.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-primary/15 border-primary shadow-md"
                          : "bg-muted/20 border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="text-sm font-bold font-heading text-foreground block">{t.id}</span>
                      <span className="text-[11px] text-muted-foreground mt-1 block leading-relaxed">{t.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stepper Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border/60">
            <Button
              variant="ghost"
              size="sm"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
              className="text-xs font-mono"
            >
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                size="sm"
                onClick={() => setCurrentStep((s) => s + 1)}
                className="gap-1.5 font-bold text-xs h-9 px-4"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleFinishDiagnostic}
                className="gap-1.5 font-bold text-xs h-9 px-5 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Sparkles className="h-4 w-4" />
                <span>Generate Tailored Plan</span>
              </Button>
            )}
          </div>
        </Card>
      ) : (
        /* SUCCESS COMPLETION DASHBOARD */
        <Card className="p-8 bg-card border-border/80 rounded-3xl shadow-xl space-y-6 text-center animate-in zoom-in-95 duration-200">
          <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black font-heading text-foreground">
              Your {selectedCompany} {selectedRole} Roadmap is Ready!
            </h2>
            <p className="text-xs text-muted-foreground">
              Timeline: {selectedTimeline} • All 10 phases synchronized to your target profile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left">
            <div className="p-4 rounded-xl border border-border bg-muted/20">
              <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Target Track</span>
              <span className="text-sm font-bold text-foreground mt-1 block">{selectedCompany} Engineering</span>
            </div>
            <div className="p-4 rounded-xl border border-border bg-muted/20">
              <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Starting Readiness</span>
              <span className="text-sm font-bold text-emerald-500 mt-1 block">82.8% Calibrated</span>
            </div>
            <div className="p-4 rounded-xl border border-border bg-muted/20">
              <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Top Priority</span>
              <span className="text-sm font-bold text-primary mt-1 block">System Design &amp; LLD</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link href="/interview-prep/company-tracks">
              <Button size="sm" className="font-bold text-xs h-9 px-4 gap-1.5">
                <span>View {selectedCompany} Track</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>

            <Link href="/interview-prep/analytics">
              <Button size="sm" variant="outline" className="font-bold text-xs h-9 px-4">
                View Readiness Radar
              </Button>
            </Link>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsCompleted(false);
                setCurrentStep(1);
              }}
              className="text-xs font-mono"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Retake Diagnostic
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
