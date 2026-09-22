"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { StudentProfile } from "@/lib/supabase";
import { LABS_DATA, Lab } from "@/data/labs";
import { EXPERIMENTS_DATA, Experiment } from "@/data/experiments";
import { CODING_PROBLEMS, CodingProblem } from "@/data/coding-sheets";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
  Code2,
  Sparkles,
  BarChart3,
  Calendar,
  Mail,
  GraduationCap,
  Copy,
  Check,
  FileSpreadsheet,
  Trophy,
  ArrowUpRight
} from "lucide-react";

interface StudentAnalyticsModalProps {
  student: StudentProfile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Helper to normalize and check if an experiment is completed
function isExpCompleted(completedIds: string[], exp: Experiment): boolean {
  if (!completedIds || completedIds.length === 0 || !exp) return false;
  
  const cleanExpId = (exp.id || "").toLowerCase();
  const cleanSlug = (exp.slug || "").toLowerCase();
  
  return completedIds.some((id) => {
    if (!id) return false;
    const cleanId = id.toLowerCase();
    if (cleanId === cleanExpId || cleanId === cleanSlug) return true;
    if (cleanExpId && cleanExpId.includes(cleanId)) return true;
    if (cleanSlug && cleanSlug.includes(cleanId)) return true;

    // Common alias mappings
    if (cleanId === "stack-operations" && (cleanSlug.includes("stack") || cleanExpId.includes("stack"))) return true;
    if (cleanId === "queue-operations" && (cleanSlug.includes("queue") || cleanExpId.includes("queue"))) return true;
    if (cleanId === "bubble-sort" && (cleanSlug.includes("bubble") || cleanExpId.includes("bubble"))) return true;
    if (cleanId === "selection-sort" && (cleanSlug.includes("selection") || cleanExpId.includes("selection"))) return true;
    if (cleanId === "insertion-sort" && (cleanSlug.includes("insertion") || cleanExpId.includes("insertion"))) return true;
    if (cleanId === "singly-linked-list" && (cleanSlug.includes("linked-list") || cleanExpId.includes("linked-list"))) return true;
    if (cleanId === "cpu-scheduling-fcfs-sjf" && (cleanSlug.includes("fcfs") || cleanExpId.includes("fcfs") || cleanSlug.includes("cpu"))) return true;
    if (cleanId === "producer-consumer-semaphores" && (cleanSlug.includes("producer") || cleanSlug.includes("semaphore"))) return true;
    if (cleanId === "bankers-deadlock-algorithm" && cleanSlug.includes("banker")) return true;
    if (cleanId === "crc-error-detection" && (cleanSlug.includes("crc") || cleanSlug.includes("error-detection"))) return true;
    if (cleanId === "astar-search-8puzzle" && (cleanSlug.includes("astar") || cleanExpId.includes("ai-exp-1"))) return true;
    if (cleanId === "aws-ec2-vpc-infrastructure" && (cleanSlug.includes("ec2") || cleanExpId.includes("cloud") || cleanExpId.includes("csml"))) return true;
    if (cleanId === "hadoop-hdfs-cluster-management" && (cleanSlug.includes("hadoop") || cleanSlug.includes("hdfs") || cleanExpId.includes("bd-exp-1"))) return true;
    if (cleanId === "sql-ddl-dml-operations" && (cleanSlug.includes("sql") || cleanSlug.includes("ddl") || cleanExpId.includes("dbms"))) return true;
    if (cleanId === "scikit-learn-linear-regression" && (cleanSlug.includes("regression") || cleanSlug.includes("linear"))) return true;
    if (cleanId === "minimax-alpha-beta-tictactoe" && (cleanSlug.includes("minimax") || cleanSlug.includes("alpha-beta"))) return true;

    return false;
  });
}

// Helper to map lab IDs between LABS_DATA and EXPERIMENTS_DATA
function getLabExperiments(lab: Lab): Experiment[] {
  if (!lab) return [];
  const labId = (lab.id || "").toLowerCase();
  return (EXPERIMENTS_DATA || []).filter((e) => {
    if (!e || !e.labId) return false;
    const eLabId = e.labId.toLowerCase();
    if (eLabId === labId) return true;
    if (labId === "dsa" || labId === "data-structures" || labId === "data-structures-algorithms") {
      return eLabId === "dsa" || eLabId === "data-structures" || eLabId === "data-structures-algorithms";
    }
    if (labId === "dbms-lab" || labId === "databases") {
      return eLabId === "dbms-lab" || eLabId === "databases" || eLabId === "dbms";
    }
    if (labId === "cloud-service-management" || labId === "cloud-computing") {
      return eLabId === "cloud-service-management" || eLabId === "cloud-computing";
    }
    if (labId === "ai-machine-learning" || labId === "machine-learning") {
      return eLabId === "ai-machine-learning" || eLabId === "machine-learning" || eLabId === "ml";
    }
    return false;
  });
}

export function StudentAnalyticsModal({
  student,
  open,
  onOpenChange,
}: StudentAnalyticsModalProps) {
  // State hooks
  const [activeTab, setActiveTab] = useState<string>("labs");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedLabId, setExpandedLabId] = useState<string | null>(null);
  const [copiedReg, setCopiedReg] = useState<boolean>(false);
  const [labFilter, setLabFilter] = useState<"all" | "completed" | "pending">("all");

  // Safe data extraction (runs every render, no early return!)
  const completedExps = useMemo(() => student?.completedExperiments || [], [student?.completedExperiments]);
  const completedProblems = useMemo(() => student?.completedProblems || [], [student?.completedProblems]);
  const quizScoresRaw = useMemo(() => student?.quizScores || {}, [student?.quizScores]);

  // Safe quiz parser
  const parsedQuizScores = useMemo(() => {
    if (!quizScoresRaw) return [];
    return Object.entries(quizScoresRaw).map(([quizKey, val]) => {
      let score = 0;
      let total = 5;
      let timestamp = "";
      if (typeof val === "number") {
        score = val;
        total = 5;
      } else if (val && typeof val === "object") {
        score = typeof val.score === "number" ? val.score : 0;
        total = typeof val.total === "number" ? val.total : 5;
        timestamp = val.timestamp || "";
      }
      const pct = Math.min(100, Math.round((score / (total || 5)) * 100));
      return {
        key: quizKey,
        name: quizKey.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        score,
        total,
        percentage: pct,
        isPassed: pct >= 60,
        timestamp,
      };
    });
  }, [quizScoresRaw]);

  // Lab Calculations
  const labStats = useMemo(() => {
    return (LABS_DATA || []).map((lab) => {
      const exps = getLabExperiments(lab);
      const totalExps = exps.length > 0 ? exps.length : (lab.experimentsCount || 10);
      
      const completedList = exps.filter((exp) => isExpCompleted(completedExps, exp));
      const completedCount = completedList.length;
      const percentage = Math.min(100, Math.round((completedCount / totalExps) * 100));

      return {
        lab,
        experiments: exps,
        totalExps,
        completedExps: completedList,
        completedCount,
        percentage,
        isCompleted: completedCount === totalExps && totalExps > 0,
        isInProgress: completedCount > 0 && completedCount < totalExps,
        isNotStarted: completedCount === 0,
      };
    });
  }, [completedExps]);

  // Overall Stats
  const totalCompletedExperiments = completedExps.length;
  const labsTouchedCount = labStats.filter((l) => l.completedCount > 0).length;
  const averageCompletion = Math.round(
    labStats.reduce((acc, curr) => acc + curr.percentage, 0) / (labStats.length || 1)
  );

  // DSA Coding Problem Categorized Stats
  const dsaCategoryStats = useMemo(() => {
    const categoryMap: Record<
      string,
      { total: number; completed: number; problems: CodingProblem[] }
    > = {};

    (CODING_PROBLEMS || []).forEach((prob) => {
      if (!prob) return;
      const cat = prob.category || "General DSA";
      if (!categoryMap[cat]) {
        categoryMap[cat] = { total: 0, completed: 0, problems: [] };
      }
      categoryMap[cat].total += 1;
      categoryMap[cat].problems.push(prob);

      // Check if problem completed by student
      const isSolved = completedProblems.some(
        (id) =>
          id === prob.id ||
          id === prob.slug ||
          id === `lc-${prob.problemNumber}` ||
          id === `prob-${prob.problemNumber}` ||
          (prob.problemNumber === 1 && id === "lc-1") ||
          (prob.problemNumber === 2 && id === "lc-2") ||
          (prob.problemNumber === 3 && id === "lc-3") ||
          (prob.problemNumber === 4 && id === "lc-4") ||
          (prob.problemNumber === 5 && id === "lc-5")
      );

      if (isSolved) {
        categoryMap[cat].completed += 1;
      }
    });

    return Object.entries(categoryMap).map(([category, data]) => {
      const percentage = Math.round((data.completed / (data.total || 1)) * 100);
      return {
        category,
        total: data.total,
        completed: data.completed,
        percentage,
        problems: data.problems,
      };
    });
  }, [completedProblems]);

  const totalDsaProblemsSolved = completedProblems.length;

  // Filtered Labs based on Search & Status
  const filteredLabStats = useMemo(() => {
    return labStats.filter((stat) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (stat.lab.name && stat.lab.name.toLowerCase().includes(q)) ||
        (stat.lab.code && stat.lab.code.toLowerCase().includes(q)) ||
        (stat.lab.shortTitle && stat.lab.shortTitle.toLowerCase().includes(q)) ||
        stat.experiments.some((e) => e.title && e.title.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (labFilter === "completed") return stat.completedCount > 0;
      if (labFilter === "pending") return stat.completedCount === 0;
      return true;
    });
  }, [labStats, searchQuery, labFilter]);

  // Quiz calculations
  const averageQuizScore = useMemo(() => {
    if (parsedQuizScores.length === 0) return 0;
    const totalPct = parsedQuizScores.reduce((acc, curr) => acc + curr.percentage, 0);
    return Math.round(totalPct / parsedQuizScores.length);
  }, [parsedQuizScores]);

  // Copy register number safely
  const handleCopyReg = () => {
    if (student?.registerNumber && typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(student.registerNumber).catch(() => {});
      setCopiedReg(true);
      setTimeout(() => setCopiedReg(false), 2000);
    }
  };

  // Export Individual Student CIE Record
  const handleExportStudentReport = () => {
    if (!student) return;
    const headers = [
      "Student Name",
      "Register Number",
      "Department",
      "Lab Name",
      "Lab Code",
      "Completion Percentage",
      "Completed Exps",
      "Total Exps",
    ];

    const rows = labStats.map((l) => [
      `"${student.name || ""}"`,
      `"${student.registerNumber || ""}"`,
      `"${student.department || ""}"`,
      `"${l.lab.name || ""}"`,
      `"${l.lab.code || ""}"`,
      `"${l.percentage}%"`,
      l.completedCount,
      l.totalExps,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `CIE_${student.registerNumber || "Student"}_${(student.name || "Student").replace(/\s+/g, "_")}_Analytics.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const studentName = student?.name || "Student";
  const studentInitial = (studentName.charAt(0) || "S").toUpperCase();
  const studentReg = student?.registerNumber || "N/A";
  const studentDept = student?.department || "General Engineering";
  const studentClass = student?.className || student?.yearSemester || student?.year || "Semester VI";
  const studentEmail = student?.email || "student@vlab.edu";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden bg-background border border-border shadow-2xl rounded-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Student Laboratory &amp; DSA Progress Analytics: {studentName}</DialogTitle>
          <DialogDescription>
            Continuous Internal Evaluation and interactive laboratory module completion details.
          </DialogDescription>
        </DialogHeader>

        {/* MODAL HEADER: Student Profile Info */}
        <div className="bg-muted/40 border-b border-border p-5 sm:p-6 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-primary/20">
                  {studentInitial}
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    {studentName}
                  </h2>
                  <div
                    onClick={handleCopyReg}
                    className="cursor-pointer group inline-flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary font-mono text-xs font-bold px-2.5 py-0.5 rounded-full transition-colors"
                    title="Click to copy Register Number"
                  >
                    <span>{studentReg}</span>
                    {copiedReg ? (
                      <Check className="h-3 w-3 text-emerald-600" />
                    ) : (
                      <Copy className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                    )}
                  </div>
                  <Badge variant="outline" className="text-[11px] font-semibold bg-background">
                    {studentDept}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-primary" />
                    {studentClass}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    {studentEmail}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Last Active:{" "}
                    <strong className="text-foreground font-medium">
                      {student?.lastActive
                        ? new Date(student.lastActive).toLocaleDateString()
                        : "Active Today"}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <Button
                size="sm"
                variant="outline"
                onClick={handleExportStudentReport}
                className="h-8 text-xs font-semibold gap-1.5 border-primary/30 text-primary hover:bg-primary/10"
              >
                <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
                <span>Export CIE Record</span>
              </Button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
            <div className="bg-card border border-border/80 p-3 rounded-xl shadow-2xs">
              <div className="text-[11px] text-muted-foreground font-medium flex items-center justify-between">
                <span>Labs Started</span>
                <BookOpen className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="text-lg font-bold text-foreground mt-0.5">
                {labsTouchedCount}{" "}
                <span className="text-xs font-normal text-muted-foreground">/ {labStats.length} Labs</span>
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                {totalCompletedExperiments} Experiments Completed
              </div>
            </div>

            <div className="bg-card border border-border/80 p-3 rounded-xl shadow-2xs">
              <div className="text-[11px] text-muted-foreground font-medium flex items-center justify-between">
                <span>Overall Lab Mastery</span>
                <BarChart3 className="h-3.5 w-3.5 text-indigo-500" />
              </div>
              <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                {averageCompletion}%
              </div>
              <div className="w-full bg-muted h-1 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${averageCompletion}%` }}
                />
              </div>
            </div>

            <div className="bg-card border border-border/80 p-3 rounded-xl shadow-2xs">
              <div className="text-[11px] text-muted-foreground font-medium flex items-center justify-between">
                <span>DSA Mastery</span>
                <Code2 className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <div className="text-lg font-bold text-foreground mt-0.5">
                {totalDsaProblemsSolved}{" "}
                <span className="text-xs font-normal text-muted-foreground">Solved</span>
              </div>
              <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
                {dsaCategoryStats.filter((c) => c.completed > 0).length} DSA Topics Touched
              </div>
            </div>

            <div className="bg-card border border-border/80 p-3 rounded-xl shadow-2xs">
              <div className="text-[11px] text-muted-foreground font-medium flex items-center justify-between">
                <span>Quiz Performance</span>
                <Trophy className="h-3.5 w-3.5 text-emerald-500" />
              </div>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {parsedQuizScores.length > 0 ? `${averageQuizScore}%` : "No Tests"}
              </div>
              <div className="text-[10px] text-muted-foreground font-medium mt-0.5">
                {parsedQuizScores.length} Quizzes Passed
              </div>
            </div>
          </div>
        </div>

        {/* MODAL BODY TABS */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <div className="border-b border-border px-5 bg-card/60">
            <TabsList className="h-10 bg-transparent gap-6 p-0">
              <TabsTrigger
                value="labs"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-2 h-10 text-xs font-bold gap-1.5"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Lab Progress Breakdown ({labStats.length})</span>
              </TabsTrigger>

              <TabsTrigger
                value="dsa"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-2 h-10 text-xs font-bold gap-1.5"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>DSA Topics &amp; Sheets ({totalDsaProblemsSolved} Solved)</span>
              </TabsTrigger>

              <TabsTrigger
                value="quizzes"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-2 h-10 text-xs font-bold gap-1.5"
              >
                <Award className="h-3.5 w-3.5" />
                <span>Quiz Scores ({parsedQuizScores.length})</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {/* TAB 1: LABS & EXPERIMENTS BREAKDOWN */}
            <TabsContent value="labs" className="m-0 space-y-4">
              {/* Search & Filter bar inside modal */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search labs (e.g. Data Structures, Computer Networks, OS)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-8 text-xs bg-muted/30"
                  />
                </div>

                <div className="flex items-center gap-1.5 w-full sm:w-auto shrink-0">
                  <Button
                    size="sm"
                    variant={labFilter === "all" ? "default" : "outline"}
                    onClick={() => setLabFilter("all")}
                    className="h-8 text-xs px-2.5 font-semibold"
                  >
                    All Labs ({labStats.length})
                  </Button>
                  <Button
                    size="sm"
                    variant={labFilter === "completed" ? "default" : "outline"}
                    onClick={() => setLabFilter("completed")}
                    className="h-8 text-xs px-2.5 font-semibold"
                  >
                    Active ({labStats.filter((l) => l.completedCount > 0).length})
                  </Button>
                  <Button
                    size="sm"
                    variant={labFilter === "pending" ? "default" : "outline"}
                    onClick={() => setLabFilter("pending")}
                    className="h-8 text-xs px-2.5 font-semibold"
                  >
                    Pending ({labStats.filter((l) => l.completedCount === 0).length})
                  </Button>
                </div>
              </div>

              {/* Lab List Cards with Progress Bar & Accordion Details */}
              <div className="space-y-3">
                {filteredLabStats.length === 0 ? (
                  <div className="p-8 text-center text-xs text-muted-foreground border border-dashed rounded-xl">
                    No laboratories found matching your criteria.
                  </div>
                ) : (
                  filteredLabStats.map((item) => {
                    const isExpanded = expandedLabId === item.lab.id;
                    const hasProgress = item.percentage > 0;

                    // Color determination
                    let badgeColor = "bg-muted text-muted-foreground border-border";
                    let progressColor = "bg-primary";
                    if (item.percentage >= 75) {
                      badgeColor = "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
                      progressColor = "bg-emerald-500";
                    } else if (item.percentage >= 30) {
                      badgeColor = "bg-blue-500/10 text-blue-600 border-blue-500/20";
                      progressColor = "bg-blue-500";
                    } else if (item.percentage > 0) {
                      badgeColor = "bg-amber-500/10 text-amber-600 border-amber-500/20";
                      progressColor = "bg-amber-500";
                    }

                    return (
                      <div
                        key={item.lab.id}
                        className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                          hasProgress
                            ? "bg-card border-border/90 shadow-2xs hover:border-primary/40"
                            : "bg-muted/10 border-border/50 opacity-80 hover:opacity-100"
                        }`}
                      >
                        {/* Lab Summary Header Row */}
                        <div
                          onClick={() => setExpandedLabId(isExpanded ? null : item.lab.id)}
                          className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none hover:bg-muted/30 transition-colors"
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-sm text-foreground">
                                {item.lab.name}
                              </span>
                              <Badge variant="outline" className="font-mono text-[10px] px-2 py-0">
                                {item.lab.code}
                              </Badge>
                              <Badge variant="secondary" className="text-[10px] px-2 py-0">
                                {item.lab.semester}
                              </Badge>
                            </div>

                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {item.lab.shortDesc}
                            </p>
                          </div>

                          {/* Progress Display */}
                          <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                            <div className="w-36 space-y-1 text-right">
                              <div className="flex items-center justify-between text-xs font-bold">
                                <span className="text-muted-foreground text-[11px] font-normal">
                                  {item.completedCount} / {item.totalExps} Exps
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-extrabold border ${badgeColor}`}
                                >
                                  {item.lab.shortTitle || "Lab"} &gt; {item.percentage}%
                                </span>
                              </div>
                              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                                  style={{ width: `${item.percentage}%` }}
                                />
                              </div>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 shrink-0 text-muted-foreground hover:text-foreground"
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Accordion Experiments Details */}
                        {isExpanded && (
                          <div className="border-t border-border/70 bg-muted/20 p-4 space-y-2">
                            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground pb-1">
                              <span>Laboratory Experiments ({item.experiments.length})</span>
                              <span>Status &amp; Verification</span>
                            </div>

                            {item.experiments.length === 0 ? (
                              <p className="text-xs text-muted-foreground py-2">
                                Experiment list dynamically linked to syllabus curriculum ({item.totalExps} modules total).
                              </p>
                            ) : (
                              item.experiments.map((exp, expIdx) => {
                                const completed = isExpCompleted(completedExps, exp);

                                return (
                                  <div
                                    key={exp.id}
                                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-3 transition-colors ${
                                      completed
                                        ? "bg-emerald-500/5 border-emerald-500/20 text-foreground"
                                        : "bg-background border-border/60 text-muted-foreground"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                      <span className="w-5 h-5 rounded-full bg-muted text-muted-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                                        {expIdx + 1}
                                      </span>
                                      <div className="min-w-0">
                                        <p
                                          className={`font-medium line-clamp-1 ${
                                            completed ? "text-foreground font-semibold" : ""
                                          }`}
                                        >
                                          {exp.title}
                                        </p>
                                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
                                          <span>{exp.category}</span>
                                          <span>•</span>
                                          <span>{exp.difficulty}</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                      {completed ? (
                                        <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/30 font-bold text-[10px] gap-1">
                                          <CheckCircle2 className="h-3 w-3" />
                                          <span>Completed</span>
                                        </Badge>
                                      ) : (
                                        <Badge variant="outline" className="text-[10px] gap-1 text-muted-foreground">
                                          <Clock className="h-3 w-3" />
                                          <span>Pending</span>
                                        </Badge>
                                      )}

                                      <Link
                                        href={`/experiments/${exp.slug}`}
                                        target="_blank"
                                        className="p-1 text-muted-foreground hover:text-primary transition-colors"
                                        title="Preview Experiment Workspace"
                                      >
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                      </Link>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </TabsContent>

            {/* TAB 2: DSA TOPICS & CODING SHEETS PROGRESS */}
            <TabsContent value="dsa" className="m-0 space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    DSA Problem Solving &amp; Coding Sheets Mastery
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Includes LeetCode Top 150, LeetCode 75, SQL 50 &amp; Topic Visualizers
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">Total Solved</span>
                    <div className="text-lg font-bold text-primary font-mono">
                      {totalDsaProblemsSolved} Problems
                    </div>
                  </div>
                </div>
              </div>

              {/* Categorized DSA Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dsaCategoryStats.map((catStat) => {
                  const hasSolved = catStat.completed > 0;
                  return (
                    <div
                      key={catStat.category}
                      className={`p-3.5 rounded-xl border transition-all ${
                        hasSolved
                          ? "bg-card border-border shadow-2xs"
                          : "bg-muted/10 border-border/50 opacity-70"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-foreground">{catStat.category}</span>
                        <Badge
                          variant="outline"
                          className={`font-mono text-[10px] font-bold ${
                            hasSolved
                              ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                              : "text-muted-foreground"
                          }`}
                        >
                          {catStat.completed} / {catStat.total} Solved
                        </Badge>
                      </div>

                      <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mb-2">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${catStat.percentage}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>Topic Mastery</span>
                        <strong className="text-foreground">{catStat.percentage}%</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* TAB 3: QUIZ & ASSESSMENT SCORES */}
            <TabsContent value="quizzes" className="m-0 space-y-4">
              <div className="rounded-xl border border-border overflow-hidden bg-card">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted/60 text-muted-foreground font-semibold border-b border-border">
                    <tr>
                      <th className="p-3">Quiz / Topic</th>
                      <th className="p-3 text-center">Score</th>
                      <th className="p-3 text-center">Mastery %</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3 text-right">Date Taken</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {parsedQuizScores.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                          No assessment quizzes recorded for this student yet.
                        </td>
                      </tr>
                    ) : (
                      parsedQuizScores.map((attempt) => {
                        return (
                          <tr key={attempt.key} className="hover:bg-muted/30">
                            <td className="p-3 font-semibold text-foreground">
                              {attempt.name}
                            </td>
                            <td className="p-3 text-center font-mono font-bold">
                              {attempt.score} / {attempt.total}
                            </td>
                            <td className="p-3 text-center">
                              <span
                                className={`font-mono font-bold ${
                                  attempt.percentage >= 80 ? "text-emerald-600" : "text-amber-600"
                                }`}
                              >
                                {attempt.percentage}%
                              </span>
                            </td>
                            <td className="p-3 text-center">
                              {attempt.isPassed ? (
                                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">
                                  Passed
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-rose-600 text-[10px]">
                                  Retake Recommended
                                </Badge>
                              )}
                            </td>
                            <td className="p-3 text-right text-muted-foreground text-[11px]">
                              {attempt.timestamp
                                ? new Date(attempt.timestamp).toLocaleDateString()
                                : "Recent"}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
