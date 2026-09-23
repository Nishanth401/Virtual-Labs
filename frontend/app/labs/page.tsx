"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { LABS_DATA } from "@/data/labs";
import { LabCatalogueCard } from "@/components/vlab/lab-catalogue-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  FlaskConical,
  Bell,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Award,
} from "lucide-react";

export default function LabsCataloguePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLabs = useMemo(() => {
    return LABS_DATA.filter((lab) => {
      const query = searchQuery.toLowerCase();
      return (
        lab.name.toLowerCase().includes(query) ||
        lab.shortDesc.toLowerCase().includes(query) ||
        lab.shortTitle.toLowerCase().includes(query) ||
        lab.tags.some((t) => t.toLowerCase().includes(query))
      );
    });
  }, [searchQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-14 bg-muted/20">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Top Breadcrumb & Broad Areas Header (Screenshot 112326) */}
          <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground font-mono">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Broad Areas of Virtual Labs</span>
              <span>/</span>
              <span className="text-primary font-bold">Computer Science &amp; Engineering</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#0284c7] dark:text-[#38bdf8] font-heading tracking-tight">
                  Computer Science &amp; Engineering Virtual Labs
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  National Virtual Laboratories in Algorithms, Data Structures, AI, Database Systems, Computer Networks, and Cloud Systems.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search labs or topics..."
                  className="pl-9 h-10 text-xs bg-background border-border shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* Main 2-Column Catalogue Layout (Screenshot 112326) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Lab Cards List (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  Available Laboratories ({filteredLabs.length})
                </span>
                <span className="text-xs text-muted-foreground">
                  Click any lab name or institute to enter
                </span>
              </div>

              <div className="space-y-3.5">
                {filteredLabs.map((lab) => (
                  <LabCatalogueCard key={lab.id} lab={lab} />
                ))}
              </div>

              {filteredLabs.length === 0 && (
                <div className="p-12 text-center bg-card rounded-2xl border border-dashed border-border space-y-3">
                  <FlaskConical className="h-10 w-10 text-muted-foreground mx-auto" />
                  <h3 className="font-bold text-base">No laboratories matched your search</h3>
                  <p className="text-xs text-muted-foreground">
                    Try searching for C, Java, Sorting, Stack, or Python.
                  </p>
                  <Button size="sm" variant="outline" onClick={() => setSearchQuery("")}>
                    Reset Search Filter
                  </Button>
                </div>
              )}
            </div>

            {/* Right Column: Announcements, Workshops & Academic Notices (4 Cols) */}
            <div className="lg:col-span-4 space-y-5">
              {/* Announcements Box matching Screenshot 112326 */}
              <Card className="border-border bg-card shadow-2xs overflow-hidden">
                <CardHeader className="bg-primary/5 pb-3 border-b border-border/60">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-foreground font-heading flex items-center gap-2">
                      <Bell className="h-4 w-4 text-primary" />
                      <span>Announcements</span>
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px] font-mono bg-primary/10 text-primary border-primary/20">
                      Live Updates
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-4 space-y-4 text-xs">
                  {/* Notice 1 */}
                  <div className="p-3 rounded-xl bg-muted/40 border border-border/70 space-y-1.5 hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-semibold text-primary font-mono">Upcoming Workshop</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="h-3 w-3" /> Oct 2026
                      </span>
                    </div>
                    <p className="font-bold text-foreground leading-snug">
                      Faculty Development Program on Cloud &amp; AI Virtual Laboratories
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-[11px]">
                      Hands-on sandbox demonstrations, interactive algorithm tracing, and student evaluation pipelines.
                    </p>
                  </div>

                  {/* Notice 2 */}
                  <div className="p-3 rounded-xl bg-muted/40 border border-border/70 space-y-1.5 hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-semibold text-amber-600 dark:text-amber-400 font-mono">Curriculum Alignment</span>
                      <span className="font-mono">AICTE / AU</span>
                    </div>
                    <p className="font-bold text-foreground leading-snug">
                      NPTEL 8-Week AI&amp;DS C Programming Track Live
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-[11px]">
                      Integrated weekly practice programs, 5-question quizzes, and NPTEL mock evaluation tests.
                    </p>
                  </div>

                  {/* Notice 3 */}
                  <div className="p-3 rounded-xl bg-muted/40 border border-border/70 space-y-1.5 hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">New Simulators</span>
                      <span className="font-mono">v3.2</span>
                    </div>
                    <p className="font-bold text-foreground leading-snug">
                      Interactive Call Stack &amp; Memory Buffer Visualizer
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-[11px]">
                      Recursion trees, stack pointer tracking, and variable scope inspector enabled across all labs.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* NPTEL & Academic Credit Box */}
              <Card className="border-border bg-gradient-to-br from-primary/5 via-card to-card shadow-2xs p-4 space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider font-mono">
                  <GraduationCap className="h-4 w-4" />
                  <span>Academic Credit Mapping</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All lab simulations are strictly mapped to the AICTE Model Curriculum and Anna University Regulation 2021/2026 for continuous assessment and practical laboratory credits.
                </p>
                <div className="pt-1 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>View Syllabus Mapping</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

