"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BrainCircuit,
  Search,
  CheckCircle2,
  Circle,
  Flame,
  RotateCcw,
  ArrowRight,
  FileText,
  BookOpen,
  Sparkles
} from "lucide-react";
import { DSA_SECTIONS, TopicItem, PhaseSection } from "@/data/dsa-sections";
import { CodingSheetsView } from "@/components/practice/coding-sheets-view";

export default function DSAVisualizationPage() {
  const [activeView, setActiveView] = useState<"visualizers" | "sheets">("visualizers");
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<string>("all");
  const [filterState, setFilterState] = useState<"all" | "completed" | "pending">("all");

  // Load persistence from localStorage & read URL query params
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dsa_master_completed_topics");
      if (saved) {
        setCompletedMap(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load progress from localStorage", e);
    }

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab") === "sheets") {
        setActiveView("sheets");
      }
    }
  }, []);

  const switchView = (view: "visualizers" | "sheets") => {
    setActiveView(view);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (view === "sheets") {
        url.searchParams.set("tab", "sheets");
      } else {
        url.searchParams.delete("tab");
      }
      window.history.replaceState(null, "", url.toString());
    }
  };

  // Save persistence to localStorage
  const toggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCompletedMap((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("dsa_master_completed_topics", JSON.stringify(next));
      } catch (err) {
        console.error("Failed to save progress", err);
      }
      return next;
    });
  };

  const resetAllProgress = () => {
    if (confirm("Are you sure you want to reset your DSA study checklist progress?")) {
      setCompletedMap({});
      try {
        localStorage.removeItem("dsa_master_completed_topics");
      } catch (e) {}
    }
  };

  // Flattened total topic list
  const allTopics = useMemo(() => {
    return DSA_SECTIONS.flatMap((sec) => sec.items);
  }, []);

  const totalCount = allTopics.length;
  const completedCount = useMemo(() => {
    return allTopics.filter((t) => completedMap[t.id]).length;
  }, [allTopics, completedMap]);

  const progressPercentage = Math.round((completedCount / (totalCount || 1)) * 100);

  // Readiness Tier
  const readinessTier = useMemo(() => {
    if (progressPercentage >= 80) return { label: "DSA Master", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/30" };
    if (progressPercentage >= 50) return { label: "Interview Ready", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/30" };
    if (progressPercentage >= 20) return { label: "Intermediate", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/30" };
    return { label: "Novice Preparation", color: "text-slate-500", bg: "bg-muted border-border" };
  }, [progressPercentage]);

  // Filtered Sections
  const filteredSections = useMemo(() => {
    return DSA_SECTIONS.map((sec) => {
      if (selectedPhase !== "all" && sec.id !== selectedPhase) {
        return { ...sec, items: [] };
      }

      const matching = sec.items.filter((item) => {
        const matchesQuery =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const isDone = !!completedMap[item.id];
        const matchesStatus =
          filterState === "all" ||
          (filterState === "completed" && isDone) ||
          (filterState === "pending" && !isDone);

        return matchesQuery && matchesStatus;
      });

      return { ...sec, items: matching };
    }).filter((sec) => sec.items.length > 0);
  }, [searchQuery, selectedPhase, filterState, completedMap]);

  return (
    <div className="container py-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="flex items-center gap-3">
          <BrainCircuit className="h-10 w-10 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading">Data Structure Visualizer</h1>
        </div>
        <p className="text-muted-foreground text-base sm:text-lg max-w-3xl">
          Comprehensive data structures, interactive algorithms visualizer, and practice interview sheets suite.
          Explore interactive models, step through recursion trees, and master coding challenges.
        </p>
      </div>

      {/* Main Mode Toggle: DSA Visualizers vs DSA Sheets */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-muted/70 border border-border/80 shadow-xs gap-1.5">
          <button
            onClick={() => switchView("visualizers")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold transition-all ${
              activeView === "visualizers"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-card/60"
            }`}
          >
            <BrainCircuit className="h-4 w-4" />
            <span>DSA Visualizers &amp; Roadmap</span>
            <Badge variant="secondary" className="text-[10px] ml-1">57 Topics</Badge>
          </button>
          <button
            onClick={() => switchView("sheets")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold transition-all ${
              activeView === "sheets"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-card/60"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>DSA Practice Sheets</span>
            <Badge
              variant="outline"
              className={`text-[10px] ml-1 ${
                activeView === "sheets"
                  ? "border-primary-foreground/40 text-primary-foreground"
                  : "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
              }`}
            >
              Top 150 &amp; 75
            </Badge>
          </button>
        </div>
      </div>

      {/* VIEW 1: DSA Practice Sheets */}
      {activeView === "sheets" ? (
        <div className="pt-2 animate-in fade-in duration-300">
          <CodingSheetsView />
        </div>
      ) : (
        /* VIEW 2: DSA Visualizers Roadmap */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Interactive Progress Tracking Banner */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`font-mono text-xs font-bold ${readinessTier.bg} ${readinessTier.color}`}>
                    <Flame className="h-3.5 w-3.5 mr-1 inline animate-bounce" /> {readinessTier.label}
                  </Badge>
                  <Badge variant="secondary" className="font-mono text-xs">
                    DSA Syllabus Tracker
                  </Badge>
                </div>
                <div className="text-lg font-bold text-foreground flex items-center gap-2">
                  <span>{completedCount} of {totalCount} Topics Mastered</span>
                  <span className="text-xs font-mono text-muted-foreground">({progressPercentage}% Completed)</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {completedCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetAllProgress}
                    className="h-8 text-xs font-mono text-muted-foreground hover:text-rose-500 gap-1.5"
                    title="Reset all completed checkboxes"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => switchView("sheets")}
                  className="h-8 text-xs font-bold gap-1.5 rounded-xl border-border hover:border-primary/50"
                  title="Switch to DSA Practice Sheets"
                >
                  <FileText className="h-3.5 w-3.5 text-primary" />
                  <span>DSA Sheets</span>
                </Button>

                <Button asChild size="sm" className="h-8 text-xs font-bold gap-1.5 bg-primary text-primary-foreground rounded-xl">
                  <Link href="/visualizer/custom-recursion">
                    <BrainCircuit className="h-3.5 w-3.5" />
                    <span>Custom Recursion Studio</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Dynamic Animated Progress Bar */}
            <div className="space-y-1.5">
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden relative">
                <div
                  style={{ width: `${progressPercentage}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>Phase 1: Complexity</span>
                <span>Phase 2: Core DS</span>
                <span>Phase 3: Algorithms</span>
                <span>Phase 4: Graphs &amp; DP</span>
                <span>Phase 6: LLD &amp; Systems</span>
              </div>
            </div>

            {/* Phase Filter Tabs & Search Bar */}
            <div className="pt-2 border-t border-border/60 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Phase Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                <Button
                  size="sm"
                  variant={selectedPhase === "all" ? "default" : "outline"}
                  onClick={() => setSelectedPhase("all")}
                  className="h-7 text-xs font-semibold shrink-0"
                >
                  All Topics ({totalCount})
                </Button>
                <Button
                  size="sm"
                  variant={selectedPhase === "phase-1" ? "default" : "outline"}
                  onClick={() => setSelectedPhase("phase-1")}
                  className="h-7 text-xs font-semibold shrink-0"
                >
                  Phase 1: Complexity
                </Button>
                <Button
                  size="sm"
                  variant={selectedPhase === "phase-2" ? "default" : "outline"}
                  onClick={() => setSelectedPhase("phase-2")}
                  className="h-7 text-xs font-semibold shrink-0"
                >
                  Phase 2: Core DS
                </Button>
                <Button
                  size="sm"
                  variant={selectedPhase === "phase-3-sorting" ? "default" : "outline"}
                  onClick={() => setSelectedPhase("phase-3-sorting")}
                  className="h-7 text-xs font-semibold shrink-0"
                >
                  Phase 3: Sorting
                </Button>
                <Button
                  size="sm"
                  variant={selectedPhase === "phase-3-patterns" ? "default" : "outline"}
                  onClick={() => setSelectedPhase("phase-3-patterns")}
                  className="h-7 text-xs font-semibold shrink-0"
                >
                  Phase 3: Patterns
                </Button>
                <Button
                  size="sm"
                  variant={selectedPhase === "phase-3-recursion" ? "default" : "outline"}
                  onClick={() => setSelectedPhase("phase-3-recursion")}
                  className="h-7 text-xs font-semibold shrink-0"
                >
                  Phase 3: Recursion
                </Button>
                <Button
                  size="sm"
                  variant={selectedPhase === "phase-4" ? "default" : "outline"}
                  onClick={() => setSelectedPhase("phase-4")}
                  className="h-7 text-xs font-semibold shrink-0"
                >
                  Phase 4: Graphs
                </Button>
                <Button
                  size="sm"
                  variant={selectedPhase === "phase-dp-greedy" ? "default" : "outline"}
                  onClick={() => setSelectedPhase("phase-dp-greedy")}
                  className="h-7 text-xs font-semibold shrink-0"
                >
                  Phase 3/4: DP &amp; Greedy
                </Button>
                <Button
                  size="sm"
                  variant={selectedPhase === "phase-6" ? "default" : "outline"}
                  onClick={() => setSelectedPhase("phase-6")}
                  className="h-7 text-xs font-semibold shrink-0"
                >
                  Phase 6: Systems &amp; LLD
                </Button>
              </div>

              {/* Status & Search Control */}
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={filterState}
                  onChange={(e) => setFilterState(e.target.value as any)}
                  className="h-8 text-xs font-mono rounded-lg border border-border bg-card px-2.5 text-foreground"
                >
                  <option value="all">Status: All</option>
                  <option value="completed">Status: Mastered (✓)</option>
                  <option value="pending">Status: Incomplete</option>
                </select>

                <div className="relative w-48 sm:w-56">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Filter topic..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8 text-xs pl-8 font-mono bg-card"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sections and Cards Grid */}
          <div className="space-y-12">
            {filteredSections.map((section) => (
              <section key={section.id} className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`font-mono text-xs font-bold ${section.badgeColor}`}>
                        {section.badge}
                      </Badge>
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading">
                        {section.title}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{section.description}</p>
                  </div>

                  <Badge variant="secondary" className="font-mono text-xs self-start sm:self-auto">
                    {section.items.filter((i) => completedMap[i.id]).length} / {section.items.length} Done
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isDone = !!completedMap[item.id];

                    return (
                      <div
                        key={item.id}
                        className="transition-all duration-300 hover:-translate-y-1.5"
                      >
                        <Card
                          className={`h-full border transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                            isDone
                              ? "bg-emerald-500/[0.04] border-emerald-500/40 shadow-xs hover:border-emerald-500/60 hover:shadow-md"
                              : "hover:bg-muted/40 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 shadow-xs"
                          }`}
                        >
                          {/* Status Checkmark Ribbon Top-Right */}
                          {isDone && (
                            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                              <div className="bg-emerald-500 text-white text-[9px] font-bold py-0.5 text-center transform rotate-45 translate-x-3 translate-y-1 shadow-xs animate-in fade-in zoom-in duration-200">
                                DONE
                              </div>
                            </div>
                          )}

                          <CardHeader className="p-5 pb-2">
                            <div className="flex items-start justify-between gap-3">
                              <Link
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 group-hover:text-primary transition-colors flex-1 min-w-0"
                                title={`Open ${item.name} in new tab`}
                              >
                                <div className={`p-2 rounded-xl border shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                                  isDone ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-muted text-foreground border-border group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary"
                                }`}>
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <CardTitle className="text-base font-bold tracking-tight line-clamp-1 flex items-center gap-1.5">
                                    <span>{item.name}</span>
                                    <span className="text-xs opacity-0 group-hover:opacity-70 transition-opacity font-mono text-muted-foreground">↗</span>
                                  </CardTitle>
                                </div>
                              </Link>

                              {/* Interactive Checklist Checkbox */}
                              <button
                                onClick={(e) => toggleComplete(item.id, e)}
                                title={isDone ? "Mark as Incomplete" : "Mark as Mastered (Check off)"}
                                className={`p-1.5 rounded-lg border transition-all duration-200 shrink-0 hover:scale-110 active:scale-95 ${
                                  isDone
                                    ? "bg-emerald-500 text-white border-emerald-600 shadow-xs scale-105"
                                    : "bg-muted/50 border-border text-muted-foreground hover:border-emerald-500/50 hover:text-emerald-500 hover:bg-emerald-500/10"
                                }`}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="h-4 w-4" />
                                ) : (
                                  <Circle className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </CardHeader>

                          <CardContent className="p-5 pt-1 space-y-4">
                            <Link
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                              title={`Open ${item.name} in new tab`}
                            >
                              <CardDescription className="text-xs leading-relaxed line-clamp-3 text-muted-foreground group-hover:text-foreground/90 transition-colors">
                                {item.description}
                              </CardDescription>
                            </Link>

                            {/* Tags & Complexity Row */}
                            <div className="pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                              <div className="flex items-center gap-1.5">
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-border text-muted-foreground group-hover:border-primary/30 transition-colors">
                                  {item.timeComplexity}
                                </Badge>
                              </div>

                              <Button
                                asChild
                                size="sm"
                                variant="ghost"
                                className="h-6 text-[11px] font-semibold gap-1 text-primary group-hover:text-primary group-hover:bg-primary/10 px-2 transition-all"
                              >
                                <Link
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={`Open ${item.name} Studio in new tab`}
                                >
                                  <span>Launch Studio</span>
                                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
