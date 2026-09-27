"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { LABS_DATA, Lab } from "@/data/labs";
import { LabCatalogueCard } from "@/components/vlab/lab-catalogue-card";
import { ConstellationBackground } from "@/components/vlab/constellation-background";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth-context";
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
  Layers,
  Code2,
  BrainCircuit,
  Database,
  Cloud,
  CheckCircle2,
  Info,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

type SemesterFilter = "all" | "sem5" | "sem3";

export default function LabsCataloguePage() {
  const { user, studentProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<SemesterFilter>("sem5");
  const [isDisciplineBooksOpen, setIsDisciplineBooksOpen] = useState(false);
  const [isDisciplineSyllabusOpen, setIsDisciplineSyllabusOpen] = useState(false);

  // Automatically select semester based on authenticated student's year/cohort
  useEffect(() => {
    if (studentProfile) {
      const reg = studentProfile.registerNumber || "";
      const year = studentProfile.year || "";
      const cohort = studentProfile.cohort || studentProfile.className || "";

      if (cohort.includes("II") || year.includes("II") || year.includes("Second") || reg.startsWith("922525")) {
        setSelectedSemester("sem3");
      } else if (cohort.includes("III") || year.includes("III") || year.includes("Third") || reg.startsWith("922524")) {
        setSelectedSemester("sem5");
      }
    }
  }, [studentProfile]);

  // Filter labs according to semester selection & search query
  const filteredLabs = useMemo(() => {
    return LABS_DATA.filter((lab) => {
      // 1. Semester matching
      if (selectedSemester === "sem5") {
        if (lab.semester !== "Semester 5") return false;
      } else if (selectedSemester === "sem3") {
        if (lab.semester !== "Semester 3") return false;
      }

      // 2. Search matching
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        lab.name.toLowerCase().includes(query) ||
        lab.shortDesc.toLowerCase().includes(query) ||
        lab.shortTitle.toLowerCase().includes(query) ||
        lab.code?.toLowerCase().includes(query) ||
        lab.tags.some((t) => t.toLowerCase().includes(query))
      );
    });
  }, [selectedSemester, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {/* Main container with ample top padding to avoid any navbar overlap */}
      <main className="flex-1 pt-36 sm:pt-40 pb-16 bg-muted/20">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Top Discipline Constellation Banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#002b49] via-[#003e6b] to-[#00223a] text-white p-6 sm:p-8 rounded-none border border-[#004b80] shadow-md space-y-4">
            <ConstellationBackground />

            <div className="relative z-10 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-200 font-sans">
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Home
                </Link>
                <span>&gt;</span>
                <span className="text-white font-bold">Artificial Intelligence &amp; Data Science</span>
                <span>&gt;</span>
                <span className="text-amber-300 font-mono">
                  {selectedSemester === "sem5"
                    ? "III Year • Semester V Labs"
                    : selectedSemester === "sem3"
                    ? "II Year • Semester III Labs"
                    : "All Academic Labs"}
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-1">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-sans">
                    Department of Artificial Intelligence &amp; Data Science
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl leading-relaxed">
                    Anna University &amp; Autonomous Curriculum Virtual Laboratories: AI Systems, Big Data Analytics, Cloud Infrastructure, Java OOP, Data Structures, and Relational Databases.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-80 shrink-0">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search labs (e.g. AI, Big Data, Java, DSA)..."
                    className="pl-9 h-10 text-xs bg-black/40 text-white placeholder:text-slate-300 border-white/20 shadow-2xs rounded-none focus-visible:ring-1 focus-visible:ring-white/40"
                  />
                </div>
              </div>

              {/* Expandable Discipline Buttons */}
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
                    Recommended Core Textbooks across AI &amp; DS:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-slate-300">
                    <li>Stuart Russell, Peter Norvig. Artificial Intelligence: A Modern Approach, 4th Edition. Pearson.</li>
                    <li>Tom White. Hadoop: The Definitive Guide, 4th Edition. O&apos;Reilly Media.</li>
                    <li>Arshdeep Bahga, Vijay Madisetti. Cloud Computing: A Hands-On Approach. Universities Press.</li>
                    <li>Mark Allen Weiss. Data Structures and Algorithm Analysis in Java, 3rd Edition. Pearson.</li>
                    <li>Abraham Silberschatz, Peter B. Galvin, Greg Gagne. Operating System Concepts, 10th Edition. Wiley.</li>
                  </ul>
                </div>
              )}

              {/* Collapsible Syllabus Mapping Panel */}
              {isDisciplineSyllabusOpen && (
                <div className="mt-3 p-4 bg-black/60 border border-white/20 rounded-none text-xs space-y-2 text-slate-200">
                  <h4 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                    Anna University &amp; Autonomous Regulation Laboratory Mapping:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-slate-300">
                    <li>Semester III (II Year): AD8302 OOP (Java) Lab • AD8301 Data Structures Design Lab • AD8303 DBMS Lab</li>
                    <li>Semester V (III Year): AI3401 Artificial Intelligence Lab • CS8711 Big Data Analytics Lab • CS8811 Cloud Service Management Lab</li>
                    <li>Universal Core: Data Structures &amp; Algorithm Analysis visual simulations for all batches</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SEMESTER AWARENESS & YEAR FILTER BAR                                      */}
          {/* ========================================================================= */}
          <div className="bg-white dark:bg-card border border-border/80 p-4 sm:p-5 shadow-xs space-y-4">
            
            {/* Student Awareness Alert */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-teal-500/10 via-sky-500/10 to-transparent border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs">
                  <p className="font-bold text-foreground">
                    Year-Wise Laboratory Semesters:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-teal-700 dark:text-teal-300">Second Year (II AIDS)</span> is mapped specifically to <span className="font-semibold text-foreground">Semester III</span>.{" "}
                    <span className="font-semibold text-sky-700 dark:text-sky-300">Third Year (III AIDS)</span> is mapped specifically to <span className="font-semibold text-foreground">Semester V</span>.{" "}
                    <span className="font-semibold text-amber-600 dark:text-amber-400">DSA Studio</span> is universal for all students.
                  </p>
                </div>
              </div>

              {studentProfile && (
                <div className="shrink-0 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1 font-mono">
                    <ShieldCheck className="h-3 w-3" />
                    <span>{studentProfile.name}</span>
                    <span>({studentProfile.year || studentProfile.className})</span>
                  </Badge>
                </div>
              )}
            </div>

            {/* Semester Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-border/60">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">
                  Filter by Year &amp; Semester:
                </span>

                {/* III Year (Semester V) Button */}
                <button
                  type="button"
                  onClick={() => setSelectedSemester("sem5")}
                  className={`px-4 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    selectedSemester === "sem5"
                      ? "bg-[#0284c7] text-white shadow-md font-bold"
                      : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  <BrainCircuit className="h-3.5 w-3.5" />
                  <span>III Year (Semester V Labs)</span>
                  <Badge variant="secondary" className="text-[10px] ml-1 bg-white/20 text-white font-mono">
                    3rd Year AIDS
                  </Badge>
                </button>

                {/* II Year (Semester III) Button */}
                <button
                  type="button"
                  onClick={() => setSelectedSemester("sem3")}
                  className={`px-4 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    selectedSemester === "sem3"
                      ? "bg-[#0284c7] text-white shadow-md font-bold"
                      : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>II Year (Semester III Labs)</span>
                  <Badge variant="secondary" className="text-[10px] ml-1 bg-white/20 text-white font-mono">
                    2nd Year AIDS
                  </Badge>
                </button>

                {/* All Labs Button */}
                <button
                  type="button"
                  onClick={() => setSelectedSemester("all")}
                  className={`px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedSemester === "all"
                      ? "bg-[#002b49] text-white shadow-md font-bold"
                      : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>All Laboratories</span>
                </button>
              </div>

              <span className="text-xs text-muted-foreground font-mono">
                Showing {filteredLabs.length} {selectedSemester === "sem5" ? "Semester V" : selectedSemester === "sem3" ? "Semester III" : "Catalogue"} Labs
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* MAIN 2-COLUMN CATALOGUE LAYOUT                                            */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Universal DSA Banner + Filtered Labs List (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* UNIVERSAL DSA HIGHLIGHT BANNER (FOR ALL YEARS) */}
              <div className="p-4 sm:p-5 rounded-none bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-500/30 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40">
                      ⚡ Universal for All Batches
                    </Badge>
                    <span className="text-xs font-bold text-foreground">
                      DSA is For All Years &amp; Students
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    II, III &amp; IV Year AIDS
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Data Structures &amp; Algorithms visual simulations and problem sheets are universal. Any student regardless of year can practice sorting, linked lists, stacks, queues, trees, graphs, and 75 curated LeetCode coding problems.
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold gap-1.5 rounded-none">
                    <Link href="/visualizer">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Open DSA Visualizer Studio</span>
                    </Link>
                  </Button>

                  <Button asChild variant="outline" size="sm" className="text-xs font-semibold gap-1.5 border-amber-500/40 hover:bg-amber-500/10 rounded-none">
                    <Link href="/dsa-visualization">
                      <Code2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                      <span>75 DSA Problem Sheets</span>
                    </Link>
                  </Button>

                  <Button asChild variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground gap-1">
                    <Link href="/labs/data-structures">
                      <span>Data Structures Lab [AD8301]</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Lab List Header */}
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-sans flex items-center gap-2">
                  <span>
                    {selectedSemester === "sem5"
                      ? "Third Year (Semester V) Laboratories"
                      : selectedSemester === "sem3"
                      ? "Second Year (Semester III) Laboratories"
                      : "All Department Laboratories"}
                  </span>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {filteredLabs.length} Available
                  </Badge>
                </span>
                <span className="text-xs text-muted-foreground">
                  Click any lab name to launch simulation
                </span>
              </div>

              {/* Lab Cards List */}
              <div className="space-y-3.5">
                {filteredLabs.map((lab) => (
                  <LabCatalogueCard key={lab.id} lab={lab} />
                ))}
              </div>

              {/* Empty Search Feedback */}
              {filteredLabs.length === 0 && (
                <div className="p-12 text-center bg-card rounded-none border border-dashed border-border space-y-3">
                  <FlaskConical className="h-10 w-10 text-muted-foreground mx-auto" />
                  <h3 className="font-bold text-base">No laboratories matched your search query</h3>
                  <p className="text-xs text-muted-foreground">
                    Try searching for AI, Big Data, Java, SQL, or switch the semester filter.
                  </p>
                  <Button size="sm" variant="outline" className="rounded-none" onClick={() => setSearchQuery("")}>
                    Reset Search Filter
                  </Button>
                </div>
              )}
            </div>

            {/* Right Column: Curriculum Guide, Announcements & Credits (4 Cols) */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Year-Wise Curriculum Mapping Card */}
              <Card className="border-border bg-card shadow-2xs overflow-hidden rounded-none">
                <CardHeader className="bg-primary/5 pb-3 border-b border-border/60">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-foreground font-heading flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span>Academic Lab Mapping</span>
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px] font-mono uppercase bg-primary/10 text-primary border-primary/20">
                      AI &amp; DS Dept
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-4 space-y-3 text-xs">
                  {/* III Year AIDS */}
                  <div className={`p-3 rounded-none border transition-colors ${
                    selectedSemester === "sem5"
                      ? "bg-sky-50 dark:bg-sky-950/40 border-sky-500/40"
                      : "bg-muted/30 border-border/60"
                  }`}>
                    <div className="flex items-center justify-between font-bold text-foreground mb-1">
                      <span className="text-[#0284c7] dark:text-[#38bdf8]">III Year • Semester V</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 bg-[#0284c7]/10 text-[#0284c7] rounded">
                        2024 - 2028 Batch
                      </span>
                    </div>
                    <ul className="space-y-1 text-muted-foreground font-mono text-[11px] list-disc list-inside">
                      <li><strong className="text-foreground">AI3401:</strong> Artificial Intelligence Lab</li>
                      <li><strong className="text-foreground">CS8711:</strong> Big Data Analytics Lab</li>
                      <li><strong className="text-foreground">CS8811:</strong> Cloud Service Management Lab</li>
                    </ul>
                  </div>

                  {/* II Year AIDS */}
                  <div className={`p-3 rounded-none border transition-colors ${
                    selectedSemester === "sem3"
                      ? "bg-teal-50 dark:bg-teal-950/40 border-teal-500/40"
                      : "bg-muted/30 border-border/60"
                  }`}>
                    <div className="flex items-center justify-between font-bold text-foreground mb-1">
                      <span className="text-teal-700 dark:text-teal-400">II Year • Semester III</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 bg-teal-500/10 text-teal-600 rounded">
                        2025 - 2029 Batch
                      </span>
                    </div>
                    <ul className="space-y-1 text-muted-foreground font-mono text-[11px] list-disc list-inside">
                      <li><strong className="text-foreground">AD8302:</strong> Object Oriented Programming (Java)</li>
                      <li><strong className="text-foreground">AD8301:</strong> Data Structures Design Lab</li>
                      <li><strong className="text-foreground">AD8303:</strong> Database Management Systems (DBMS)</li>
                    </ul>
                  </div>

                  {/* Universal DSA */}
                  <div className="p-3 rounded-none border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
                    <div className="flex items-center justify-between font-bold text-foreground mb-1">
                      <span className="text-amber-700 dark:text-amber-300">Universal For All Years</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 bg-amber-500/10 text-amber-600 rounded">
                        Core Studio
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Interactive Algorithm Visualizer &amp; 75 LeetCode DSA Sheets are universal across all semesters.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Announcements Box */}
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
                      Semester V Big Data &amp; AI Lab Sandbox Live
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-[11px]">
                      Integrated Hadoop HDFS cluster emulation, PySpark jobs, and A* heuristic search visualizations.
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
