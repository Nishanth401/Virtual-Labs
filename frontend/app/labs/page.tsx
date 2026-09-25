"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { LABS_DATA } from "@/data/labs";
import { LabCatalogueCard } from "@/components/vlab/lab-catalogue-card";
import { ConstellationBackground } from "@/components/vlab/constellation-background";
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
  ChevronDown,
  ChevronUp,
  BookOpen,
  GraduationCap,
  Award,
} from "lucide-react";

export default function LabsCataloguePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDisciplineBooksOpen, setIsDisciplineBooksOpen] = useState(false);
  const [isDisciplineSyllabusOpen, setIsDisciplineSyllabusOpen] = useState(false);

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
      <main className="flex-1 pt-20 pb-14 bg-muted/20">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Top Discipline Constellation Banner (Screenshot 112326) */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#002b49] via-[#003e6b] to-[#00223a] text-white p-6 sm:p-8 rounded-none border border-[#004b80] shadow-md space-y-4">
            <ConstellationBackground />

            <div className="relative z-10 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-200 font-sans">
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Home
                </Link>
                <span>&gt;</span>
                <span className="text-white font-bold">Computer Science &amp; Engineering</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-1">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
                    Computer Science &amp; Engineering
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl leading-relaxed">
                    National Virtual Laboratories in Artificial Intelligence, Machine Learning, Data Structures, Operating Systems, Computer Architecture, and Relational Database Systems.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-80 shrink-0">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search labs or topics..."
                    className="pl-9 h-10 text-xs bg-black/40 text-white placeholder:text-slate-300 border-white/20 shadow-2xs rounded-none focus-visible:ring-1 focus-visible:ring-white/40"
                  />
                </div>
              </div>

              {/* Expandable Discipline Buttons matching Screenshot 112326 */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-amber-300">
                <button
                  type="button"
                  onClick={() => setIsDisciplineBooksOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/30 hover:bg-black/50 border border-white/20 rounded-none cursor-pointer transition-colors"
                >
                  <BookOpen className="h-3.5 w-3.5 text-amber-300" />
                  <span>Reference Books</span>
                  {isDisciplineBooksOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => setIsDisciplineSyllabusOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/30 hover:bg-black/50 border border-white/20 rounded-none cursor-pointer transition-colors"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-amber-300" />
                  <span>Syllabus Mapping</span>
                  {isDisciplineSyllabusOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* Collapsible Reference Books Panel */}
              {isDisciplineBooksOpen && (
                <div className="mt-3 p-4 bg-black/60 border border-white/20 rounded-none text-xs space-y-2 text-slate-200">
                  <h4 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                    Recommended Core Textbooks across Computer Science &amp; Engineering:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-slate-300">
                    <li>Mark Allen Weiss. Data Structures and Algorithm Analysis in Java, 3rd Edition. Pearson.</li>
                    <li>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein. Introduction to Algorithms. MIT Press.</li>
                    <li>John L. Hennessy and David A. Patterson. Computer Architecture: A Quantitative Approach, 6th Edition. Morgan Kaufmann.</li>
                    <li>Abraham Silberschatz, Peter B. Galvin, Greg Gagne. Operating System Concepts, 10th Edition. Wiley.</li>
                    <li>Ramez Elmasri and Shamkant B. Navathe. Fundamentals of Database Systems, 7th Edition. Pearson.</li>
                  </ul>
                </div>
              )}

              {/* Collapsible Syllabus Mapping Panel */}
              {isDisciplineSyllabusOpen && (
                <div className="mt-3 p-4 bg-black/60 border border-white/20 rounded-none text-xs space-y-2 text-slate-200">
                  <h4 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                    AICTE Model Curriculum &amp; Anna University Regulation 2021/2026 Mapping:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-slate-300">
                    <li>PCC-CS301: Data Structures and Algorithms Laboratory (Semester III)</li>
                    <li>PCC-CS402: Computer Organisation and Architecture Laboratory (Semester IV)</li>
                    <li>PCC-CS403: Operating Systems Laboratory (Semester IV)</li>
                    <li>PCC-CS502: Database Management Systems Laboratory (Semester V)</li>
                    <li>PEC-CS-S501: Machine Learning &amp; Artificial Intelligence Laboratory (Semester VI)</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Main 2-Column Catalogue Layout (Screenshot 112326) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Lab Cards List (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-sans">
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
                <div className="p-12 text-center bg-card rounded-none border border-dashed border-border space-y-3">
                  <FlaskConical className="h-10 w-10 text-muted-foreground mx-auto" />
                  <h3 className="font-bold text-base">No laboratories matched your search</h3>
                  <p className="text-xs text-muted-foreground">
                    Try searching for C, Java, Sorting, Stack, or Python.
                  </p>
                  <Button size="sm" variant="outline" className="rounded-none" onClick={() => setSearchQuery("")}>
                    Reset Search Filter
                  </Button>
                </div>
              )}
            </div>

            {/* Right Column: Announcements, Workshops & Academic Notices (4 Cols) */}
            <div className="lg:col-span-4 space-y-5">
              {/* Announcements Box matching Screenshot 112326 */}
              <Card className="border-border bg-card shadow-2xs overflow-hidden rounded-none">
                <CardHeader className="bg-primary/5 pb-3 border-b border-border/60">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-foreground font-heading flex items-center gap-2">
                      <Bell className="h-4 w-4 text-primary" />
                      <span>Announcements</span>
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px] font-sans font-semibold bg-primary/10 text-primary border-primary/20 rounded-none">
                      Live Updates
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-4 space-y-4 text-xs">
                  {/* Notice 1 */}
                  <div className="p-3 rounded-none bg-muted/40 border border-border/70 space-y-1.5 hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-semibold text-primary font-sans">Upcoming Workshop</span>
                      <span className="flex items-center gap-1 font-sans font-medium">
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
                  <div className="p-3 rounded-none bg-muted/40 border border-border/70 space-y-1.5 hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-semibold text-amber-600 dark:text-amber-400 font-sans">Curriculum Alignment</span>
                      <span className="font-sans font-medium">AICTE / AU</span>
                    </div>
                    <p className="font-bold text-foreground leading-snug">
                      NPTEL 8-Week AI&amp;DS C Programming Track Live
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-[11px]">
                      Integrated weekly practice programs, 5-question quizzes, and NPTEL mock evaluation tests.
                    </p>
                  </div>

                  {/* Notice 3 */}
                  <div className="p-3 rounded-none bg-muted/40 border border-border/70 space-y-1.5 hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-sans">New Simulators</span>
                      <span className="font-sans font-medium">v3.2</span>
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
              <Card className="border-border bg-gradient-to-br from-primary/5 via-card to-card shadow-2xs p-4 space-y-3 rounded-none">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider font-sans">
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

