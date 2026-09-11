"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { COLLEGES_REGISTRY, CollegeData } from "@/data/colleges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Building2,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Layers,
  Award,
  Globe2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  School
} from "lucide-react";

export function CollegeSelectorHero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollege, setSelectedCollege] = useState<CollegeData>(COLLEGES_REGISTRY[0]);

  const filteredColleges = COLLEGES_REGISTRY.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.code.includes(searchTerm) ||
    college.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCollege = (college: CollegeData) => {
    setSelectedCollege(college);
  };

  const handleLaunchPortal = (slug?: string) => {
    const targetSlug = slug || selectedCollege.slug;
    router.push(`/c/${targetSlug.toLowerCase().trim()}`);
  };

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-border/60 bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Institutional Badge */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold shadow-sm animate-pulse">
            <Globe2 className="h-3.5 w-3.5" />
            <span>Multi-Campus Virtual Laboratories Enterprise Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-foreground leading-[1.15]">
            One Virtual Lab Platform. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600">
              Customized for Every College.
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Select your college below or search your institutional code to access dedicated syllabus tracks, lab manuals, and student simulations.
          </p>

          {/* 3-Step Student Access Workflow */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-4">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border/80 text-left shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-600 font-bold text-xs flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Select College</p>
                <p className="text-[11px] text-muted-foreground">Pick institution or URL</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border/80 text-left shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Student Sign In</p>
                <p className="text-[11px] text-muted-foreground">Verify student credentials</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border/80 text-left shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 font-bold text-xs flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Virtual Labs & DSA</p>
                <p className="text-[11px] text-muted-foreground">Practice & simulate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Direct URL Jump Box */}
        <div className="max-w-3xl mx-auto bg-card/85 backdrop-blur-xl border border-border/80 p-3 sm:p-4 rounded-2xl shadow-xl shadow-black/5 mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search college by name, code (e.g. 9225, 7176), or enter slug (e.g. vsb, cit)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-background border-border/80 text-sm focus-visible:ring-primary rounded-xl"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filteredColleges.length > 0) {
                    handleLaunchPortal(filteredColleges[0].slug);
                  }
                }}
              />
            </div>
            <Button
              onClick={() => handleLaunchPortal()}
              className="w-full sm:w-auto h-12 px-6 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg shadow-rose-600/25 shrink-0 flex items-center justify-center gap-2"
            >
              <span>Open College Portal</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Slug Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border/40 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground/80 flex items-center gap-1">
              <Globe2 className="h-3 w-3 text-amber-500" /> Direct URLs:
            </span>
            {COLLEGES_REGISTRY.map((c) => (
              <button
                key={c.slug}
                onClick={() => {
                  setSelectedCollege(c);
                  handleLaunchPortal(c.slug);
                }}
                className={`px-2.5 py-1 rounded-lg border transition-all ${
                  selectedCollege.slug === c.slug
                    ? "bg-primary text-primary-foreground border-primary font-bold shadow-sm"
                    : "bg-muted/40 hover:bg-muted text-foreground/80 border-border"
                }`}
              >
                /c/{c.slug}
              </button>
            ))}
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {filteredColleges.map((college) => {
            const isSelected = selectedCollege.slug === college.slug;
            return (
              <Card
                key={college.slug}
                onClick={() => handleSelectCollege(college)}
                className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border overflow-hidden ${
                  isSelected
                    ? "border-primary ring-2 ring-primary/20 bg-card shadow-lg"
                    : "border-border/70 hover:border-primary/50 bg-card/60"
                }`}
              >
                {/* College Banner Strip */}
                <div className={`h-3 w-full bg-gradient-to-r ${college.bannerGradient}`} />

                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-muted to-muted/80 border border-border/80 flex items-center justify-center font-black text-xs text-foreground shadow-sm">
                        {college.shortName.slice(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm text-foreground leading-tight line-clamp-1">
                            {college.name}
                          </h3>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono">
                          Code: {college.code} • {college.location}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] uppercase font-bold shrink-0 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                      {college.status}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {college.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {college.accreditation.slice(0, 3).map((acc, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-muted font-medium text-foreground/70">
                        {acc}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-primary font-semibold">
                      /c/{college.slug}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLaunchPortal(college.slug);
                      }}
                      className="h-8 px-2.5 text-xs text-primary hover:text-primary hover:bg-primary/10 gap-1"
                    >
                      <span>Enter Lab</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* SaaS Platform Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-muted/40 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Complete Data Isolation</h4>
              <p className="text-[11px] text-muted-foreground">Each college has its own private student database and records.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Custom Lab Manuals</h4>
              <p className="text-[11px] text-muted-foreground">Upload and manage department observation notes and manuals.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Autonomous Curriculum</h4>
              <p className="text-[11px] text-muted-foreground">Tailored for Anna University & Autonomous regulations.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Admin Access Controls</h4>
              <p className="text-[11px] text-muted-foreground">Full CRUD control for faculty and administrators.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
