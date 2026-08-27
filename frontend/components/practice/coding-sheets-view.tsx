"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  CodingProblem,
  CODING_PROBLEMS,
  CODING_SHEETS_META,
  SheetType,
  DifficultyLevel
} from "@/data/coding-sheets";
import { useAuth } from "@/context/auth-context";
import { NotesDialog } from "@/components/practice/notes-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Circle,
  Star,
  ExternalLink,
  Search,
  BookOpen,
  FileText,
  Sparkles,
  Trophy,
  Filter,
  Layers,
  Code2,
  Database,
  Building2,
  Zap,
  Globe,
  Terminal,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Check,
  Edit3
} from "lucide-react";

export function CodingSheetsView() {
  const { student, toggleProblemCompleted, toggleProblemStarred, saveProblemNote } = useAuth();

  const [activeSheet, setActiveSheet] = useState<SheetType>("top-interview-150");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedCompany, setSelectedCompany] = useState<string>("ALL");

  // Pagination state for ultra-fast rendering
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);

  // Notes Modal state
  const [activeNoteProblem, setActiveNoteProblem] = useState<CodingProblem | null>(null);

  const completedSet = useMemo(() => new Set(student?.completedProblems || []), [student?.completedProblems]);
  const starredSet = useMemo(() => new Set(student?.starredProblems || []), [student?.starredProblems]);
  const notesMap = useMemo(() => student?.problemNotes || {}, [student?.problemNotes]);

  // Problems for active sheet
  const sheetProblems = useMemo(() => {
    return CODING_PROBLEMS.filter((p) => p.sheet.includes(activeSheet));
  }, [activeSheet]);

  // Unique categories for active sheet
  const categories = useMemo(() => {
    const set = new Set<string>();
    sheetProblems.forEach((p) => set.add(p.category));
    return ["ALL", ...Array.from(set)];
  }, [sheetProblems]);

  // Filtered problems
  const filteredProblems = useMemo(() => {
    return sheetProblems.filter((p) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesNum = p.problemNumber.toString().includes(q);
        const matchesCompany = [...p.productCompanies, ...p.serviceCompanies].some((c) =>
          c.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesCat && !matchesNum && !matchesCompany) return false;
      }

      // Category filter
      if (selectedCategory !== "ALL" && p.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== "ALL" && p.difficulty !== selectedDifficulty) {
        return false;
      }

      // Status filter
      if (selectedStatus === "SOLVED" && !completedSet.has(p.id)) return false;
      if (selectedStatus === "UNSOLVED" && completedSet.has(p.id)) return false;
      if (selectedStatus === "STARRED" && !starredSet.has(p.id)) return false;

      // Company filter
      if (selectedCompany !== "ALL") {
        const hasCompany = [...p.productCompanies, ...p.serviceCompanies].some((c) =>
          c.toLowerCase().includes(selectedCompany.toLowerCase())
        );
        if (!hasCompany) return false;
      }

      return true;
    });
  }, [
    sheetProblems,
    searchQuery,
    selectedCategory,
    selectedDifficulty,
    selectedStatus,
    selectedCompany,
    completedSet,
    starredSet
  ]);

  // Pagination calculation
  const totalItems = filteredProblems.length;
  const effectivePageSize = pageSize === -1 ? totalItems : pageSize;
  const totalPages = Math.max(1, Math.ceil(totalItems / (effectivePageSize || 1)));

  // Ensure current page is valid when filters change
  const validPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedProblems = useMemo(() => {
    if (pageSize === -1) return filteredProblems;
    const start = (validPage - 1) * pageSize;
    return filteredProblems.slice(start, start + pageSize);
  }, [filteredProblems, validPage, pageSize]);

  // Statistics for active sheet
  const stats = useMemo(() => {
    const total = sheetProblems.length;
    let solved = 0;
    let easySolved = 0;
    let easyTotal = 0;
    let medSolved = 0;
    let medTotal = 0;
    let hardSolved = 0;
    let hardTotal = 0;
    let starredCount = 0;

    sheetProblems.forEach((p) => {
      const isDone = completedSet.has(p.id);
      if (isDone) solved++;
      if (starredSet.has(p.id)) starredCount++;

      if (p.difficulty === "Easy") {
        easyTotal++;
        if (isDone) easySolved++;
      } else if (p.difficulty === "Medium") {
        medTotal++;
        if (isDone) medSolved++;
      } else if (p.difficulty === "Hard") {
        hardTotal++;
        if (isDone) hardSolved++;
      }
    });

    const percent = total > 0 ? Math.round((solved / total) * 100) : 0;

    return {
      total,
      solved,
      easySolved,
      easyTotal,
      medSolved,
      medTotal,
      hardSolved,
      hardTotal,
      starredCount,
      percent
    };
  }, [sheetProblems, completedSet, starredSet]);

  const currentMeta = CODING_SHEETS_META[activeSheet];

  return (
    <div className="space-y-6">
      {/* ============================================================== */}
      {/* 1. HERO HEADER & SHEET SELECTOR TABS                           */}
      {/* ============================================================== */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="outline" className="text-xs font-mono uppercase bg-[#1e88e5]/10 text-[#1e88e5] border-[#1e88e5]/30">
                DSA Coding Practice &amp; Interview Roadmaps
              </Badge>
              <Badge variant="secondary" className="text-xs font-mono">
                Official Department Curriculum
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight text-foreground">
              Master Coding Interview Sheets
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl mt-1">
              Structured interview practice roadmaps with Product (FAANG) &amp; Service companies tags, difficulty ratings (7.0 - 9.9), revision bookmarks, personal notes taking, and direct problem links.
            </p>
          </div>

          {/* Quick Stats Capsule */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-card border border-border/80 shadow-xs flex items-center gap-4 sm:gap-5 min-w-[240px]">
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">
                Sheet Progress
              </span>
              <span className="text-xl sm:text-2xl font-black text-foreground font-mono">
                {stats.solved} / {stats.total}
              </span>
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="flex justify-between text-xs font-bold font-mono">
                <span className="text-[#1e88e5]">{stats.percent}% Completed</span>
                <span className="text-amber-500 font-normal">{stats.starredCount} ⭐</span>
              </div>
              <Progress value={stats.percent} className="h-2 bg-muted accent-[#1e88e5]" />
            </div>
          </div>
        </div>

        {/* Master Sheet Switcher Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {(["top-interview-150", "leetcode-75", "sql-50"] as SheetType[]).map((sheetKey) => {
            const meta = CODING_SHEETS_META[sheetKey];
            const isActive = activeSheet === sheetKey;
            return (
              <button
                key={sheetKey}
                onClick={() => {
                  setActiveSheet(sheetKey);
                  setSelectedCategory("ALL");
                  setCurrentPage(1);
                }}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "bg-card border-[#1e88e5] shadow-md ring-2 ring-[#1e88e5]/20"
                    : "bg-card/50 border-border/70 hover:border-border hover:bg-card"
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-mono font-bold ${
                        isActive ? "bg-[#1e88e5]/10 text-[#1e88e5] border-[#1e88e5]/30" : "text-muted-foreground"
                      }`}
                    >
                      {meta.badge}
                    </Badge>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-[#1e88e5] animate-ping" />
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-foreground">{meta.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{meta.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. LEARNING & CODING PLATFORMS INTEGRATION BAR (NO TUF)         */}
      {/* ============================================================== */}
      <Card className="border-border/80 bg-gradient-to-r from-card via-muted/20 to-card p-3.5 sm:p-4 rounded-2xl shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
              <Globe className="h-4 w-4" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-foreground">Integrated Practice &amp; Coding Platforms</h4>
              <p className="text-[11px] text-muted-foreground">Practice directly on global competitive programming and tutorial hubs:</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" size="sm" className="h-8 text-xs font-semibold gap-1.5 rounded-xl border-border bg-card">
              <a href="https://leetcode.com/studyplan/" target="_blank" rel="noopener noreferrer">
                <span className="text-[#FFA116] font-bold">LC</span> LeetCode
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            </Button>

            <Button asChild variant="outline" size="sm" className="h-8 text-xs font-semibold gap-1.5 rounded-xl border-border bg-card">
              <a href="https://www.hackerrank.com/dashboard" target="_blank" rel="noopener noreferrer">
                <span className="text-[#00EA64] font-bold">HR</span> HackerRank
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            </Button>

            <Button asChild variant="outline" size="sm" className="h-8 text-xs font-semibold gap-1.5 rounded-xl border-border bg-card">
              <a href="https://codeforces.com/" target="_blank" rel="noopener noreferrer">
                <span className="text-[#1F8ACB] font-bold">CF</span> Codeforces
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            </Button>

            <Button asChild variant="outline" size="sm" className="h-8 text-xs font-semibold gap-1.5 rounded-xl border-border bg-card">
              <a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer">
                <span className="text-[#2F8D46] font-bold">GFG</span> GeeksforGeeks
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            </Button>

            <Button asChild variant="outline" size="sm" className="h-8 text-xs font-semibold gap-1.5 rounded-xl border-border bg-card">
              <a href="https://www.w3schools.com/sql/" target="_blank" rel="noopener noreferrer">
                <span className="text-[#04AA6D] font-bold">W3</span> W3Schools
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            </Button>
          </div>
        </div>
      </Card>

      {/* ============================================================== */}
      {/* 3. METRICS BREAKDOWN & SEARCH / FILTER CONTROLS                */}
      {/* ============================================================== */}
      <div className="space-y-3">
        {/* Difficulty Breakdown Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-card border border-border/80 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground font-mono">Total Problems</span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg sm:text-xl font-black text-foreground font-mono">{stats.total}</span>
              <span className="text-xs text-muted-foreground font-mono">{stats.solved} done</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-card border border-emerald-500/20 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 font-mono">Easy Level</span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg sm:text-xl font-black text-emerald-500 font-mono">
                {stats.easySolved} / {stats.easyTotal}
              </span>
              <span className="text-xs text-emerald-600/70 font-mono">
                {stats.easyTotal > 0 ? Math.round((stats.easySolved / stats.easyTotal) * 100) : 0}%
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-card border border-amber-500/20 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 font-mono">Medium Level</span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg sm:text-xl font-black text-amber-500 font-mono">
                {stats.medSolved} / {stats.medTotal}
              </span>
              <span className="text-xs text-amber-600/70 font-mono">
                {stats.medTotal > 0 ? Math.round((stats.medSolved / stats.medTotal) * 100) : 0}%
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-card border border-rose-500/20 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400 font-mono">Hard Level</span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg sm:text-xl font-black text-rose-500 font-mono">
                {stats.hardSolved} / {stats.hardTotal}
              </span>
              <span className="text-xs text-rose-600/70 font-mono">
                {stats.hardTotal > 0 ? Math.round((stats.hardSolved / stats.hardTotal) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <Card className="border-border/80 bg-card p-3.5 rounded-2xl shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="relative sm:col-span-2 lg:col-span-5">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search problem, #number, or company (Google, TCS)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 text-xs rounded-xl bg-muted/30 border-border/80 h-9"
              />
            </div>

            {/* Topic Filter */}
            <div className="lg:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-9 rounded-xl bg-muted/30 border border-border/80 px-3 text-xs text-foreground font-mono focus:outline-hidden"
              >
                <option value="ALL">All Topics ({sheetProblems.length})</option>
                {categories.filter((c) => c !== "ALL").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedDifficulty}
                onChange={(e) => {
                  setSelectedDifficulty(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-9 rounded-xl bg-muted/30 border border-border/80 px-3 text-xs text-foreground font-mono focus:outline-hidden"
              >
                <option value="ALL">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-9 rounded-xl bg-muted/30 border border-border/80 px-3 text-xs text-foreground font-mono focus:outline-hidden"
              >
                <option value="ALL">All Statuses</option>
                <option value="SOLVED">✅ Solved Only</option>
                <option value="UNSOLVED">⏳ Unsolved Only</option>
                <option value="STARRED">⭐ Starred for Revision</option>
              </select>
            </div>
          </div>
        </Card>
      </div>

      {/* ============================================================== */}
      {/* 4. MASTER STRUCTURED INTERACTIVE PRACTICE TABLE                */}
      {/* ============================================================== */}
      <Card className="border-border/80 bg-card rounded-2xl shadow-sm overflow-hidden">
        {/* Table Header with Pagination & View Options */}
        <div className="p-3.5 sm:p-4 border-b border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-sm sm:text-base font-heading text-foreground">
              {currentMeta.title}
            </h3>
            <Badge variant="outline" className="text-xs font-mono">
              Showing {paginatedProblems.length} of {filteredProblems.length} filtered ({sheetProblems.length} total)
            </Badge>
          </div>

          {/* Quick Page Size & Navigation Capsule */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono mr-2">
              <span>Per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-7 rounded-lg bg-muted/50 border border-border/80 px-2 text-xs text-foreground font-mono"
              >
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="-1">All ({filteredProblems.length})</option>
              </select>
            </div>

            {/* Pagination buttons */}
            {totalPages > 1 && pageSize !== -1 && (
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={validPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="h-7 w-7 p-0 rounded-lg"
                  title="Previous Page"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>

                <span className="text-xs font-mono text-foreground px-2">
                  {validPage} / {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={validPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="h-7 w-7 p-0 rounded-lg"
                  title="Next Page"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Responsive Table Container with explicit scrollbar styling */}
        <div className="overflow-x-auto max-w-full">
          <table className="w-full text-left text-xs border-collapse min-w-[960px]">
            <thead>
              <tr className="bg-muted/50 border-b border-border/80 text-[11px] font-mono uppercase tracking-wider text-muted-foreground select-none">
                <th className="py-3 px-2.5 text-center w-10">Done</th>
                <th className="py-3 px-2 text-center w-10">Rev</th>
                <th className="py-3 px-2 w-14"># No.</th>
                <th className="py-3 px-3 min-w-[260px]">Problem Title &amp; Quick Notes</th>
                <th className="py-3 px-3 min-w-[130px]">Topic / Process</th>
                <th className="py-3 px-2.5 text-center w-20">Difficulty</th>
                <th className="py-3 px-2 text-center w-20">Rating / 10</th>
                <th className="py-3 px-3 min-w-[170px]">Product Companies (FAANG)</th>
                <th className="py-3 px-3 min-w-[150px]">Service Companies</th>
                <th className="py-3 px-2 text-center w-24">Practice Hubs</th>
                <th className="py-3 px-3 text-center w-20">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {paginatedProblems.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-muted-foreground">
                    <p className="text-sm font-semibold">No problems match the current filter query.</p>
                    <p className="text-xs mt-1">Try clearing filters or changing search keywords.</p>
                  </td>
                </tr>
              ) : (
                paginatedProblems.map((problem) => {
                  const isCompleted = completedSet.has(problem.id);
                  const isStarred = starredSet.has(problem.id);
                  const hasNotes = Boolean(notesMap[problem.id]?.note);

                  return (
                    <tr
                      key={problem.id}
                      className={`hover:bg-muted/40 transition-colors ${
                        isCompleted ? "bg-emerald-500/[0.02]" : ""
                      }`}
                    >
                      {/* Checkbox Status Column */}
                      <td className="py-2.5 px-2.5 text-center">
                        <button
                          type="button"
                          onClick={() => toggleProblemCompleted(problem.id)}
                          className="p-1 rounded-md hover:bg-muted transition-colors cursor-pointer"
                          title={isCompleted ? "Mark as Incomplete" : "Mark as Solved"}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 fill-emerald-500/20" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground/50 hover:text-foreground" />
                          )}
                        </button>
                      </td>

                      {/* Star / Revision Column */}
                      <td className="py-2.5 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => toggleProblemStarred(problem.id)}
                          className="p-1 rounded-md hover:bg-muted transition-colors cursor-pointer"
                          title={isStarred ? "Remove Bookmark" : "Bookmark for Revision"}
                        >
                          <Star
                            className={`h-4 w-4 transition-colors ${
                              isStarred
                                ? "text-amber-500 fill-amber-500"
                                : "text-muted-foreground/40 hover:text-amber-500"
                            }`}
                          />
                        </button>
                      </td>

                      {/* Problem Number */}
                      <td className="py-2.5 px-2 font-mono text-muted-foreground font-semibold">
                        #{problem.problemNumber}
                      </td>

                      {/* Problem Title & Inline Notes Quick Trigger */}
                      <td className="py-2.5 px-3 font-medium">
                        <div className="flex items-center gap-2 flex-wrap">
                          <a
                            href={problem.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-foreground hover:text-[#1e88e5] font-semibold transition-colors group"
                          >
                            <span className={isCompleted ? "line-through text-muted-foreground" : ""}>
                              {problem.title}
                            </span>
                            <ExternalLink className="h-3 w-3 opacity-40 group-hover:opacity-100 text-[#1e88e5]" />
                          </a>

                          {/* Quick Inline Notes Button so notes are ALWAYS 100% reachable with 0 scroll! */}
                          <button
                            type="button"
                            onClick={() => setActiveNoteProblem(problem)}
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                              hasNotes
                                ? "bg-primary/10 text-primary border-primary/40 font-bold"
                                : "bg-muted/40 text-muted-foreground border-border/60 hover:text-foreground hover:border-foreground/40"
                            }`}
                            title="Open / Edit Revision Notes"
                          >
                            <FileText className="h-2.5 w-2.5" />
                            <span>{hasNotes ? "Note" : "+Note"}</span>
                          </button>
                        </div>
                      </td>

                      {/* Topic Category */}
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-md bg-muted/60 text-[10px] font-mono border border-border/50 text-foreground font-medium whitespace-nowrap">
                          {problem.category}
                        </span>
                      </td>

                      {/* Difficulty Level */}
                      <td className="py-2.5 px-2.5 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase inline-block ${
                            problem.difficulty === "Easy"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                              : problem.difficulty === "Medium"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                              : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>

                      {/* Importance Rating (7.0 - 9.9) */}
                      <td className="py-2.5 px-2 text-center font-mono font-bold">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-muted/40 text-foreground text-[10px]">
                          <span className="text-amber-500 text-[10px]">★</span>
                          <span>{problem.importanceRating.toFixed(1)}</span>
                        </span>
                      </td>

                      {/* Product-Based Companies Column */}
                      <td className="py-2.5 px-3">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {problem.productCompanies.slice(0, 3).map((comp, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 text-[9px] font-mono font-medium"
                            >
                              {comp}
                            </span>
                          ))}
                          {problem.productCompanies.length > 3 && (
                            <span className="px-1 py-0.2 rounded bg-muted text-muted-foreground text-[8px] font-mono">
                              +{problem.productCompanies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Service-Based Companies Column */}
                      <td className="py-2.5 px-3">
                        <div className="flex flex-wrap gap-1 max-w-[160px]">
                          {problem.serviceCompanies.slice(0, 2).map((comp, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 text-[9px] font-mono font-medium"
                            >
                              {comp}
                            </span>
                          ))}
                          {problem.serviceCompanies.length > 2 && (
                            <span className="px-1 py-0.2 rounded bg-muted text-muted-foreground text-[8px] font-mono">
                              +{problem.serviceCompanies.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Direct Platform Links (LeetCode, GFG, HackerRank, W3Schools) */}
                      <td className="py-2.5 px-2 text-center">
                        <div className="inline-flex items-center gap-1 justify-center flex-wrap">
                          {/* LeetCode Direct Button */}
                          <a
                            href={problem.leetcodeUrl || `https://leetcode.com/problems/${problem.slug}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="LeetCode Problem"
                            className="px-1.5 py-0.5 rounded hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold font-mono text-[9px] border border-amber-500/25 transition-colors"
                          >
                            LC
                          </a>

                          {/* GeeksforGeeks Tutorial / Solution */}
                          <a
                            href={
                              problem.gfgUrl ||
                              `https://www.geeksforgeeks.org/explore?page=1&search=${encodeURIComponent(problem.title)}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            title="GeeksforGeeks Tutorial"
                            className="px-1.5 py-0.5 rounded hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-[9px] border border-emerald-500/25 transition-colors"
                          >
                            GFG
                          </a>

                          {/* HackerRank Challenge */}
                          {problem.hackerrankUrl && (
                            <a
                              href={problem.hackerrankUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="HackerRank Challenge"
                              className="px-1.5 py-0.5 rounded hover:bg-emerald-500/10 text-[#00EA64] font-bold font-mono text-[9px] border border-emerald-500/25 transition-colors"
                            >
                              HR
                            </a>
                          )}

                          {/* W3Schools SQL Tutorial */}
                          {problem.w3schoolsUrl && (
                            <a
                              href={problem.w3schoolsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="W3Schools SQL Tutorial"
                              className="px-1.5 py-0.5 rounded hover:bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold font-mono text-[9px] border border-teal-500/25 transition-colors"
                            >
                              W3S
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Notes Modal Action Button */}
                      <td className="py-2.5 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => setActiveNoteProblem(problem)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono font-semibold border transition-all cursor-pointer ${
                            hasNotes
                              ? "bg-primary/10 text-primary border-primary/40 hover:bg-primary/20 shadow-xs"
                              : "bg-muted/30 text-muted-foreground border-border/70 hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          <FileText className="h-3 w-3" />
                          <span>{hasNotes ? "Notes (1)" : "Notes"}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Bar */}
        {totalPages > 1 && pageSize !== -1 && (
          <div className="p-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-mono">
              Page {validPage} of {totalPages} ({filteredProblems.length} questions)
            </span>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                disabled={validPage <= 1}
                onClick={() => setCurrentPage(1)}
                className="h-7 w-7 p-0 rounded-lg"
                title="First Page"
              >
                <ChevronsLeft className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={validPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="h-7 w-7 p-0 rounded-lg"
                title="Previous Page"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>

              <span className="font-mono px-2 text-foreground font-bold">
                {validPage}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={validPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="h-7 w-7 p-0 rounded-lg"
                title="Next Page"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={validPage >= totalPages}
                onClick={() => setCurrentPage(totalPages)}
                className="h-7 w-7 p-0 rounded-lg"
                title="Last Page"
              >
                <ChevronsRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Notes Dialog Modal */}
      <NotesDialog
        isOpen={Boolean(activeNoteProblem)}
        onClose={() => setActiveNoteProblem(null)}
        problem={activeNoteProblem}
        savedNote={activeNoteProblem ? notesMap[activeNoteProblem.id] : undefined}
        onSaveNote={(problemId, noteText) => {
          saveProblemNote(problemId, noteText);
        }}
      />
    </div>
  );
}
