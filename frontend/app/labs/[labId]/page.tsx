"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LABS_DATA, VideoTimestamp } from "@/data/labs";
import { EXPERIMENTS_DATA } from "@/data/experiments";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { LabSidebar, LabTab } from "@/components/vlab/lab-sidebar";
import { LabHeaderBanner } from "@/components/vlab/lab-header-banner";
import { CourseAlignmentCard } from "@/components/vlab/course-alignment-card";
import { MLPrerequisitesTrack } from "@/components/vlab/ml-prerequisites-track";
import { DSARoadmap } from "@/components/vlab/dsa-roadmap";
import { LAB_ROADMAPS_DATA } from "@/data/all-labs-roadmap-data";
import { VideoTimeline, TamilVideoTimeline } from "@/components/vlab/tamil-video-timeline";
import { QuizEngine } from "@/components/quiz/quiz-engine";
import { QUIZZES_DATA, Quiz, getQuizForExperiment } from "@/data/quizzes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  FlaskConical,
  PlayCircle,
  CheckCircle2,
  Users,
  Target,
  ArrowRight,
  BookOpen,
  Send,
  GraduationCap,
  Trophy,
  Award,
  HelpCircle,
  FileQuestion,
  ChevronRight,
  Code2,
  BrainCircuit,
  Database,
  Network,
  Video,
  ExternalLink,
  ListTree,
  Sparkles,
  Calendar,
  Clock,
  CheckSquare,
  Terminal,
  Cpu,
  Layers,
  Flame,
  ShieldCheck
} from "lucide-react";

interface LabDetailPageProps {
  params: Promise<{ labId: string }>;
}

export default function LabDetailPage({ params }: LabDetailPageProps) {
  const { labId } = use(params);
  const lab = LABS_DATA.find((l) => l.id === labId) || LABS_DATA[0];

  const [activeTab, setActiveTab] = useState<LabTab>(
    lab.id === "c-programming" ? "nptel-plan" : "dsa-roadmap"
  );
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
  const [videoLanguageTab, setVideoLanguageTab] = useState<"english" | "tamil">("english");
  const [tamilVideoTime, setTamilVideoTime] = useState<number>(0);
  const [activeTamilTimestampIdx, setActiveTamilTimestampIdx] = useState<number | null>(null);
  const [selectedTamilVideoUrl, setSelectedTamilVideoUrl] = useState<string | null>(null);
  const [englishVideoTime, setEnglishVideoTime] = useState<number>(0);
  const [activeEnglishTimestampIdx, setActiveEnglishTimestampIdx] = useState<number | null>(null);
  const [selectedEnglishVideoUrl, setSelectedEnglishVideoUrl] = useState<string | null>(null);
  const [resourceSourceFilter, setResourceSourceFilter] = useState<string>("ALL");
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  const handleSelectTamilTimestamp = (seconds: number, idx: number, item?: VideoTimestamp) => {
    setTamilVideoTime(seconds);
    setActiveTamilTimestampIdx(idx);
    if (item?.embedUrl) {
      setSelectedTamilVideoUrl(item.embedUrl);
    }
  };

  const handleSelectEnglishTimestamp = (seconds: number, idx: number, item?: VideoTimestamp) => {
    setEnglishVideoTime(seconds);
    setActiveEnglishTimestampIdx(idx);
    if (item?.embedUrl) {
      setSelectedEnglishVideoUrl(item.embedUrl);
    }
  };

  // Filter experiments for this lab
  const experiments = EXPERIMENTS_DATA.filter((e) => e.labId === lab.id);
  const [selectedQuizExpId, setSelectedQuizExpId] = useState<string>(experiments[0]?.id || "");

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
  };

  // NPTEL 8-Week Curriculum Breakdown for AI&DS
  const NPTEL_WEEKS_DATA = [
    {
      week: 1,
      title: "Introduction to C Programming & Basics",
      assessment: "Basic C Quiz",
      slug: "c-fundamentals-variables-formatted-io",
      expId: "c-exp-1",
      topics: [
        "History and features of C",
        "Structure of C program",
        "Compilation process (Preprocessor -> Compiler -> Assembler -> Linker)",
        "Variables and constants",
        "Data types (char, int, float, double)",
        "Input/output statements (printf, scanf)"
      ],
      programs: [
        "Hello World",
        "Simple calculator",
        "Temperature conversion (Celsius to Fahrenheit)",
        "Area and perimeter calculation (Circle & Rectangle)"
      ],
      nptelFocus: [
        "Learn basic syntax & tokenization",
        "Practice data type sizing questions",
        "Solve 25 Week-1 MCQs"
      ],
      aidsConnection: "Why C? Understanding memory management, building the foundation for high-performance computing, and understanding tensor computation backends used in AI libraries."
    },
    {
      week: 2,
      title: "Operators, Expressions & Decision Making",
      assessment: "Conditional Programming Test",
      slug: "control-flow-decision-making-switch-case",
      expId: "c-exp-2",
      topics: [
        "Arithmetic operators",
        "Relational operators",
        "Logical operators & short-circuit evaluation",
        "Assignment & bitwise operators",
        "if, if-else ladders",
        "Nested conditions",
        "Switch statement & jump tables"
      ],
      programs: [
        "Largest of three numbers",
        "Student grade calculation",
        "Simple menu-driven program",
        "Electricity bill calculation (Tiered tariff)"
      ],
      nptelFocus: [
        "Output prediction questions on pre/post increment",
        "Operator precedence & associativity problems",
        "25 MCQ + 5 Programming Questions"
      ],
      aidsConnection: "Decision trees, threshold classification models, and conditional inference logic directly mirror nested conditional structures."
    },
    {
      week: 3,
      title: "Loop Constructs & Iterative Algorithms",
      assessment: "Loop Coding Challenge",
      slug: "iterative-loops-and-pattern-generation",
      expId: "c-exp-3",
      topics: [
        "for loop",
        "while loop",
        "do-while loop",
        "Nested loops",
        "Break and continue control statements"
      ],
      programs: [
        "Factorial calculation",
        "Prime number checking in O(sqrt(n))",
        "Fibonacci series generation",
        "Pattern printing (Star pyramid)",
        "Number reverse"
      ],
      nptelFocus: [
        "Loop execution tracing & step verification",
        "Infinite loop identification",
        "Nested loop output analysis"
      ],
      miniTask: "Student Mark Analysis Program: Calculate class average, highest score, lowest score, and pass/fail distribution.",
      aidsConnection: "Gradient descent optimization loops, epoch training cycles, and matrix batch aggregation pipelines run on loop constructs."
    },
    {
      week: 4,
      title: "Functions and Recursion",
      assessment: "Function & Recursion Test",
      slug: "functions-and-recursion-factorial-gcd",
      expId: "c-exp-4",
      topics: [
        "Function declaration (prototypes)",
        "Function definition & execution frames",
        "Parameters and return values (Pass by value)",
        "Scope of variables (Local, Global, Static)",
        "Recursive functions & call stack mechanics"
      ],
      programs: [
        "Calculator using functions",
        "Factorial using recursion",
        "Fibonacci using recursion",
        "Greatest Common Divisor (GCD) using Euclidean Algorithm"
      ],
      nptelFocus: [
        "Pass by value copying behavior",
        "Local vs global vs static variable state persistence",
        "30 NPTEL MCQs & Recursion stack tracing"
      ],
      aidsConnection: "Divide-and-conquer machine learning algorithms (Decision Tree splitting, MergeSort, Fast Fourier Transform) and recursive AST parsers."
    },
    {
      week: 5,
      title: "Arrays and Pointers",
      assessment: "Array & Pointer Challenge",
      slug: "1d-arrays-and-statistical-calculations",
      expId: "c-exp-5",
      topics: [
        "One-dimensional arrays",
        "Two-dimensional arrays & row-major layout",
        "Array operations (Searching & Sorting)",
        "Pointer basics & dereferencing (*)",
        "Pointer arithmetic (stride sizing)",
        "Relationship between arrays and pointers *(a+i)"
      ],
      programs: [
        "Linear search & Binary search",
        "Bubble sorting / Selection sorting",
        "Matrix addition & Transpose",
        "Matrix multiplication (2D dot products)"
      ],
      nptelFocus: [
        "⭐ *(a+i) address dereferencing concept",
        "⭐ Contiguous memory address calculation: Base + (i * size)",
        "⭐ Pointer increment/decrement precedence"
      ],
      aidsConnection: "Arrays and 2D matrices are the primary foundation for tensors, numerical computing, machine learning datasets, and image processing."
    },
    {
      week: 6,
      title: "Dynamic Memory & File Handling",
      assessment: "File Handling Assignment",
      slug: "pointers-and-dynamic-memory-allocation",
      expId: "c-exp-6",
      topics: [
        "Memory allocation: malloc(), calloc(), realloc(), free()",
        "Memory leaks & dangling pointer prevention",
        "File stream operations: fopen(), fclose()",
        "Formatted file I/O: fprintf(), fscanf()"
      ],
      programs: [
        "Dynamic array creation and resizing",
        "Student database file storage",
        "File-based mark persistence & retrieval"
      ],
      nptelFocus: [
        "Memory leaks & proper free() invocation",
        "File access modes (\"w\", \"r\", \"a\")",
        "Pointer handling & allocation validation (NULL checks)"
      ],
      aidsConnection: "Dynamic batch loading for streaming big datasets that exceed RAM, saving model weight checkpoints, and persistent training telemetry."
    },
    {
      week: 7,
      title: "Structures and Linked Lists",
      assessment: "Mini Project Test",
      slug: "structures-unions-and-typedef",
      expId: "c-exp-7",
      topics: [
        "Structure declaration & typedef",
        "Nested structures & word alignment padding",
        "Structure pointers (arrow operator ->)",
        "Linked list concepts & self-referential structs",
        "Node creation via malloc()",
        "Insert and delete operations"
      ],
      programs: [
        "Student record using structure",
        "Employee database system",
        "Singly linked list implementation (insert, traverse, free)"
      ],
      nptelFocus: [
        "Structure padding & sizeof(struct) calculations",
        "Pointer arrow dereferencing ptr->member",
        "Linked list insertion and pointer boundary safety"
      ],
      aidsConnection: "Custom node representations are required for AI search graph nodes (A*, Dijkstra), decision tree branches, and sparse graph processing."
    },
    {
      week: 8,
      title: "Complete Revision + NPTEL Exam Preparation",
      assessment: "NPTEL Mock Exam",
      slug: "file-handling-and-preprocessor-directives",
      expId: "c-exp-8",
      topics: [
        "Comprehensive Revision: Variables, Operators, Conditions, Loops",
        "Functions, Recursion, Arrays, *(a+i) Pointers",
        "Dynamic Heap Memory, Files, Structures, Linked Lists",
        "NPTEL Elite/Gold Exam Strategy"
      ],
      programs: [
        "Comprehensive diagnostic program",
        "Previous years' NPTEL assignment problem solving",
        "100-Question Full NPTEL Mock Examination"
      ],
      nptelFocus: [
        "Day 1–2: Revise core concepts",
        "Day 3–4: Solve previous NPTEL questions",
        "Day 5: Full mock test (100 questions)",
        "Day 6: Analyse mistakes & diagnose weak spots",
        "Day 7: Final revision"
      ],
      aidsConnection: "Consolidates rigorous systems programming competency required for competitive coding, placement interviews, and AI engineering."
    }
  ];

  // AI&DS Mini Projects
  const AI_DS_MINI_PROJECTS = [
    {
      id: "proj-1",
      title: "1. Student Performance Analysis System",
      desc: "Calculates cohort averages, GPA distributions, grade ranking, and identifies students requiring academic intervention using arrays, loops, and file persistence.",
      concepts: ["Arrays", "Functions", "Structs", "File I/O"],
      highlight: "AI&DS Analytics Foundation"
    },
    {
      id: "proj-2",
      title: "2. Attendance Management System",
      desc: "Tracks daily student attendance records, computes percentage statistics, and flags shortage alerts with file-based persistence and date indexing.",
      concepts: ["2D Arrays", "Structures", "File Streams", "Conditionals"],
      highlight: "Operations Automation"
    },
    {
      id: "proj-3",
      title: "3. Simple Data Analytics Tool",
      desc: "Computes statistical metrics (mean, median, mode, variance, standard deviation, and min-max normalization) on dynamic floating-point datasets.",
      concepts: ["Pointers", "Dynamic Memory", "Math", "Sorting"],
      highlight: "Data Science Primitive"
    },
    {
      id: "proj-4",
      title: "4. Library Management System",
      desc: "Performs book catalog indexing, issue/return timestamp tracking, fine calculation, and search queries with structured records and disk persistence.",
      concepts: ["Array of Structs", "Searching", "File I/O", "Menus"],
      highlight: "Database Simulation"
    },
    {
      id: "proj-5",
      title: "5. File-based Customer Database",
      desc: "Provides CRUD operations (Create, Read, Update, Delete) on encrypted customer profile records stored permanently in binary disk files.",
      concepts: ["Binary File Streams", "malloc/free", "Structs", "Pointers"],
      highlight: "Enterprise Systems"
    },
    {
      id: "proj-6",
      title: "6. Linked List Based Task Manager",
      desc: "Implements a dynamic prioritized task scheduler with insert, delete, and priority reordering operations utilizing dynamic self-referential nodes.",
      concepts: ["Singly Linked List", "Pointers", "Dynamic Memory", "Queues"],
      highlight: "AI Scheduling Engine"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-muted/20 pt-20 sm:pt-24 pb-14">
        {/* Discipline Breadcrumbs & Rating Header Banner matching Screenshots 112419 - 112512 */}
        <LabHeaderBanner
          discipline={lab.department || "Artificial Intelligence & Data Science"}
          labName={lab.name}
          labId={lab.id}
        />

        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6 font-sans">
          {/* Header Banner */}
          <div className="bg-card rounded-none border border-border/80 p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-none bg-sky-500/10 border border-sky-500/20 text-[#0284c7] dark:text-[#38bdf8] text-xs font-semibold">
                    <span>{lab.shortTitle}</span>
                    <span className="w-1.5 h-1.5 bg-[#0284c7]" />
                    <span className="font-mono text-xs font-bold">{lab.code}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground font-medium">• {lab.institute}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0284c7] dark:text-[#38bdf8] font-heading tracking-tight">
                  {lab.name}
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">
                  {lab.department} • <span className="text-[#ea580c] dark:text-[#f97316] font-semibold">{lab.semester}</span>
                </p>
              </div>

              {lab.id === "c-programming" && (
                <div className="flex items-center gap-2 shrink-0">
                  <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 px-3 py-1 text-xs font-mono font-bold rounded-none">
                    ★ NPTEL 8-Week AI&amp;DS Track
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => setActiveTab("nptel-plan")}
                    className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs gap-1.5 cursor-pointer rounded-none"
                  >
                    <BookOpen className="h-4 w-4" />
                    View Study Plan
                  </Button>
                </div>
              )}
            </div>

            {/* C PROGRAMMING EXCLUSIVE: WEEKLY LEARNING PATTERN WORKFLOW RIBBON */}
            {lab.id === "c-programming" && (
              <div className="mt-6 pt-5 border-t border-border/60">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#0284c7]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground font-mono">
                      Weekly Learning Pattern &amp; Engineering Workflow
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-medium">
                    Continuous 7-Day Cycle for NPTEL Success
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                  <div className="p-3 rounded-none bg-blue-500/10 border border-blue-500/30 flex flex-col justify-between space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold font-mono text-blue-600 dark:text-blue-400">Mon – Wed</span>
                      <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-blue-500/30 text-blue-500 rounded-none">Day 1-3</Badge>
                    </div>
                    <p className="text-xs font-bold text-foreground">Concept Learning</p>
                    <p className="text-[11px] text-muted-foreground">+ NPTEL Video Lectures</p>
                  </div>

                  <div className="p-3 rounded-none bg-indigo-500/10 border border-indigo-500/30 flex flex-col justify-between space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold font-mono text-indigo-600 dark:text-indigo-400">Thursday</span>
                      <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-indigo-500/30 text-indigo-500 rounded-none">Day 4</Badge>
                    </div>
                    <p className="text-xs font-bold text-foreground">Program Practice</p>
                    <p className="text-[11px] text-muted-foreground">Hands-on Sandbox Coding</p>
                  </div>

                  <div className="p-3 rounded-none bg-purple-500/10 border border-purple-500/30 flex flex-col justify-between space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold font-mono text-purple-600 dark:text-purple-400">Friday</span>
                      <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-purple-500/30 text-purple-500 rounded-none">Day 5</Badge>
                    </div>
                    <p className="text-xs font-bold text-foreground">MCQ / MSQ Practice</p>
                    <p className="text-[11px] text-muted-foreground">NPTEL Type Questions</p>
                  </div>

                  <div className="p-3 rounded-none bg-emerald-500/10 border border-emerald-500/30 flex flex-col justify-between space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold font-mono text-emerald-600 dark:text-emerald-400">Saturday</span>
                      <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-emerald-500/30 text-emerald-500 rounded-none">Day 6</Badge>
                    </div>
                    <p className="text-xs font-bold text-foreground">Coding Assignment</p>
                    <p className="text-[11px] text-muted-foreground">+ Peer Discussion Circle</p>
                  </div>

                  <div className="p-3 rounded-none bg-amber-500/10 border border-amber-500/30 flex flex-col justify-between space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold font-mono text-amber-600 dark:text-amber-400">Sunday</span>
                      <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-amber-500/30 text-amber-500 rounded-none">Day 7</Badge>
                    </div>
                    <p className="text-xs font-bold text-foreground">Revision &amp; Mock Test</p>
                    <p className="text-[11px] text-muted-foreground">Weekly Evaluation Assessment</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Layout: If Roadmap tab, render the 3-block top row + centered compiler studio; otherwise render 2-column sidebar layout */}
          {activeTab === "dsa-roadmap" ? (
            <DSARoadmap
              labId={lab.id}
              sidebar={
                <LabSidebar
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  experimentsCount={experiments.length}
                  resourcesCount={lab.resources?.length || 6}
                  labId={lab.id}
                  className="w-full h-full"
                />
              }
            />
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left Sidebar */}
              <LabSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                experimentsCount={experiments.length}
                resourcesCount={lab.resources?.length || 6}
                labId={lab.id}
              />

              {/* Right Tab Content View */}
              <div className="flex-1 w-full min-w-0">
                {/* TAB: NPTEL 8-WEEK STUDY PLAN (C PROGRAMMING CORE) */}
                {activeTab === "nptel-plan" && (
                  <div className="space-y-6">
                    {/* Goal & Department Alignment Card */}
                    <Card className="border border-border/80 bg-card rounded-none shadow-xs overflow-hidden border-l-4 border-l-[#0284c7]">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-amber-500" />
                            <CardTitle className="text-xl font-bold text-[#0284c7] dark:text-[#38bdf8] font-heading">
                              NPTEL C Programming – 8 Week Study Plan
                            </CardTitle>
                          </div>
                          <Badge variant="outline" className="bg-sky-500/10 text-[#0284c7] border-sky-500/20 font-mono text-xs rounded-none">
                            For AI&amp;DS Students (Engineering Level)
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 text-sm leading-relaxed">
                        <div className="p-3.5 rounded-none bg-sky-500/5 border border-sky-500/20">
                          <p className="font-semibold text-foreground">
                            <strong>Goal:</strong> To help AI&amp;DS students successfully complete NPTEL C Programming certification and build a strong programming foundation required for <strong>Data Structures, AI/ML programming, competitive coding, and projects</strong>.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                          <div className="p-3.5 rounded-none bg-muted/30 border border-border space-y-1">
                            <div className="flex items-center gap-2 text-[#0284c7] dark:text-[#38bdf8] font-bold text-xs">
                              <BrainCircuit className="h-4 w-4" />
                              <span>Memory Management</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Understanding contiguous buffers, stack frames, and dynamic heap allocation.
                            </p>
                          </div>

                          <div className="p-3.5 rounded-none bg-muted/30 border border-border space-y-1">
                            <div className="flex items-center gap-2 text-indigo-500 font-bold text-xs">
                              <Cpu className="h-4 w-4" />
                              <span>AI &amp; Tensor Foundation</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Low-level C/C++ foundation powering PyTorch, TensorFlow XLA, and CUDA kernels.
                            </p>
                          </div>

                          <div className="p-3.5 rounded-none bg-muted/30 border border-border space-y-1">
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                              <ShieldCheck className="h-4 w-4" />
                              <span>NPTEL Certification</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Structured 8-week path to secure Elite / Gold NPTEL certification.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 8 Weeks Accordion & Details View */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-foreground font-heading flex items-center gap-2">
                          <ListTree className="h-5 w-5 text-[#0284c7]" />
                          <span>Week-by-Week Curriculum Breakdown (Weeks 1 – 8)</span>
                        </h3>
                        <span className="text-xs text-muted-foreground font-mono">
                          Click any week to expand details
                        </span>
                      </div>

                      <div className="space-y-3">
                        {NPTEL_WEEKS_DATA.map((w) => {
                          const isExpanded = expandedWeek === w.week;

                          return (
                            <div
                              key={w.week}
                              className={`rounded-none border transition-all overflow-hidden ${
                                isExpanded
                                  ? "bg-card border-[#0284c7]/50 shadow-xs ring-1 ring-[#0284c7]/20"
                                  : "bg-card/70 border-border hover:border-border/80"
                              }`}
                            >
                              {/* Week Header Row */}
                              <button
                                type="button"
                                onClick={() => setExpandedWeek(isExpanded ? null : w.week)}
                                className="w-full p-4 flex items-center justify-between gap-4 text-left cursor-pointer"
                              >
                                <div className="flex items-center gap-3.5 min-w-0">
                                  <div className={`flex items-center justify-center h-9 w-9 rounded-none font-bold text-xs shrink-0 font-mono shadow-2xs ${
                                    isExpanded ? "bg-[#0284c7] text-white" : "bg-muted text-foreground"
                                  }`}>
                                    W{w.week}
                                  </div>
                                  <div className="space-y-0.5 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-bold text-sm text-foreground">
                                        Week {w.week}: {w.title}
                                      </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">
                                      Assessment: <span className="font-semibold text-[#0284c7]">{w.assessment}</span> • {w.programs.length} Practice Programs
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2.5 shrink-0">
                                  <Badge variant="outline" className="text-[11px] font-mono hidden sm:inline-flex rounded-none">
                                    {w.assessment}
                                  </Badge>
                                  <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                                    isExpanded ? "rotate-90 text-[#0284c7]" : ""
                                  }`} />
                                </div>
                              </button>

                              {/* Expanded Week Content */}
                              {isExpanded && (
                                <div className="px-5 pb-5 pt-2 border-t border-border/50 space-y-4 bg-muted/10">
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
                                    {/* Topics */}
                                    <div className="p-3.5 rounded-none bg-card border border-border space-y-2">
                                      <div className="flex items-center gap-2">
                                        <CheckSquare className="h-4 w-4 text-[#0284c7]" />
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono">
                                          Core Topics
                                        </h4>
                                      </div>
                                      <ul className="space-y-1.5 text-xs text-muted-foreground">
                                        {w.topics.map((top, tIdx) => (
                                          <li key={tIdx} className="flex items-start gap-2">
                                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                                            <span className="text-foreground/90 font-medium">{top}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* Programs to Practice */}
                                    <div className="p-3.5 rounded-none bg-card border border-border space-y-2">
                                      <div className="flex items-center gap-2">
                                        <Code2 className="h-4 w-4 text-[#0284c7]" />
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono">
                                          Programs to Practice
                                        </h4>
                                      </div>
                                      <ul className="space-y-1.5 text-xs text-muted-foreground">
                                        {w.programs.map((prog, pIdx) => (
                                          <li key={pIdx} className="flex items-start gap-2">
                                            <span className="text-[#0284c7] font-mono font-bold">•</span>
                                            <span className="text-foreground/90 font-semibold">{prog}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>

                                  {/* NPTEL Focus & AI&DS Connection */}
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {/* NPTEL Preparation / Focus */}
                                    <div className="p-3.5 rounded-none bg-amber-500/5 border border-amber-500/20 space-y-2">
                                      <div className="flex items-center gap-2">
                                        <Award className="h-4 w-4 text-amber-500" />
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono">
                                          NPTEL Focus &amp; Evaluation
                                        </h4>
                                      </div>
                                      <ul className="space-y-1 text-xs text-muted-foreground">
                                        {w.nptelFocus.map((foc, fIdx) => (
                                          <li key={fIdx} className="flex items-start gap-2">
                                            <span className="text-amber-500">★</span>
                                            <span>{foc}</span>
                                          </li>
                                        ))}
                                      </ul>
                                      {w.miniTask && (
                                        <div className="mt-2 pt-2 border-t border-amber-500/20 text-xs font-medium text-foreground">
                                          <strong className="text-amber-600 dark:text-amber-400">Mini Task:</strong> {w.miniTask}
                                        </div>
                                      )}
                                    </div>

                                    {/* AI&DS Connection */}
                                    <div className="p-3.5 rounded-none bg-sky-500/5 border border-sky-500/20 space-y-2">
                                      <div className="flex items-center gap-2">
                                        <BrainCircuit className="h-4 w-4 text-[#0284c7]" />
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0284c7] dark:text-[#38bdf8] font-mono">
                                          AI&amp;DS Engineering Connection
                                        </h4>
                                      </div>
                                      <p className="text-xs text-muted-foreground leading-relaxed">
                                        {w.aidsConnection}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                    <div className="text-xs text-muted-foreground">
                                      Assessment: <strong className="text-foreground font-mono">{w.assessment}</strong>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setSelectedQuizExpId(w.expId);
                                          setActiveTab("quizzes");
                                        }}
                                        className="text-xs gap-1.5 font-semibold border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 cursor-pointer rounded-none"
                                      >
                                        <HelpCircle className="h-3.5 w-3.5" />
                                        <span>Take {w.assessment}</span>
                                      </Button>

                                      <Button asChild size="sm" className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs gap-1.5 font-semibold cursor-pointer rounded-none">
                                        <Link href={`/experiments/${w.slug}`}>
                                          <PlayCircle className="h-4 w-4" />
                                          <span>Start Week {w.week} Lab</span>
                                        </Link>
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* WEEKLY EVALUATION PATTERN TABLE */}
                    <Card className="border border-border/80 bg-card rounded-none shadow-xs p-5 sm:p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base sm:text-lg font-bold text-[#0284c7] dark:text-[#38bdf8] font-heading flex items-center gap-2">
                            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
                            <span>Weekly Evaluation Pattern for Students</span>
                          </CardTitle>
                          <CardDescription className="text-xs mt-0.5">
                            Weekly milestone assessments aligned directly with the NPTEL curriculum schedule.
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-xs font-mono bg-sky-500/10 text-[#0284c7] border-sky-500/20 rounded-none">
                          8 Weekly Tests
                        </Badge>
                      </div>

                      <div className="overflow-x-auto rounded-none border border-border">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-muted/60 border-b border-border text-muted-foreground font-mono uppercase text-[11px]">
                              <th className="p-2.5 font-bold">Week</th>
                              <th className="p-2.5 font-bold">Assessment Name</th>
                              <th className="p-2.5 font-bold">Core Topic Coverage</th>
                              <th className="p-2.5 font-bold">Questions</th>
                              <th className="p-2.5 font-bold text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60 text-foreground">
                            {NPTEL_WEEKS_DATA.map((w) => (
                              <tr key={w.week} className="hover:bg-muted/30 transition-colors">
                                <td className="p-2.5 font-mono font-bold text-[#0284c7]">Week {w.week}</td>
                                <td className="p-2.5 font-bold">{w.assessment}</td>
                                <td className="p-2.5 text-muted-foreground">{w.title}</td>
                                <td className="p-2.5 font-mono text-muted-foreground">5 Questions</td>
                                <td className="p-2.5 text-right">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedQuizExpId(w.expId);
                                      setActiveTab("quizzes");
                                    }}
                                    className="text-xs py-1 h-7 font-semibold border-[#0284c7]/30 text-[#0284c7] hover:bg-[#0284c7]/10 cursor-pointer rounded-none"
                                  >
                                    Launch Test
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>
                )}

              {/* TAB: AI&DS MINI PROJECTS & FACULTY CHAMPIONS */}
              {activeTab === "mini-projects" && (
                <div className="space-y-6">
                  {/* Mini Projects Showcase Card */}
                  <Card className="border border-border/80 bg-card rounded-none shadow-xs p-5 sm:p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 rounded-none">
                            Hands-on Engineering
                          </Badge>
                          <Badge variant="outline" className="text-xs font-mono text-[#0284c7] border-[#0284c7]/30 bg-sky-500/10 rounded-none">
                            C Applications in AI&amp;DS
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-[#0284c7] dark:text-[#38bdf8] font-heading flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-amber-500" />
                          <span>Suggested AI&amp;DS Mini Projects Using C</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          Practical engineering mini-projects applying C procedural design, dynamic memory, structs, and disk persistence to AI&amp;DS use cases.
                        </CardDescription>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                      {AI_DS_MINI_PROJECTS.map((proj) => (
                        <div
                          key={proj.id}
                          className="p-4 rounded-none border border-border bg-card hover:border-[#0284c7]/50 transition-all flex flex-col justify-between space-y-3 shadow-2xs group"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <Badge variant="outline" className="text-[10px] font-mono font-bold bg-sky-500/10 text-[#0284c7] border-sky-500/20 rounded-none">
                                {proj.highlight}
                              </Badge>
                            </div>
                            <h4 className="text-sm font-bold text-foreground group-hover:text-[#0284c7] transition-colors leading-snug">
                              {proj.title}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {proj.desc}
                            </p>
                          </div>

                          <div className="space-y-2.5 pt-2 border-t border-border/50">
                            <div className="flex flex-wrap gap-1">
                              {proj.concepts.map((c, cIdx) => (
                                <span key={cIdx} className="px-1.5 py-0.5 rounded-none text-[10px] font-mono bg-muted text-foreground/80">
                                  {c}
                                </span>
                              ))}
                            </div>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setActiveTab("experiments")}
                              className="w-full text-xs font-semibold border-[#0284c7]/30 text-[#0284c7] hover:bg-[#0284c7] hover:text-white transition-all cursor-pointer rounded-none"
                            >
                              Explore Related Labs <ArrowRight className="h-3.5 w-3.5 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Faculty Implementation Idea Card */}
                  <Card className="border border-border/80 bg-card rounded-none shadow-xs p-5 sm:p-6 space-y-4 border-l-4 border-l-[#0284c7]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-none bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-[#0284c7]">
                          <Users className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <CardTitle className="text-base sm:text-lg font-bold text-foreground font-heading">
                            Faculty Implementation Idea: C Programming Champions
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Peer Learning &amp; Department Academic Success Framework
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-sky-500/10 text-[#0284c7] border-sky-500/20 font-mono text-xs rounded-none">
                        20–30 Champions Roster
                      </Badge>
                    </div>

                    <div className="p-3.5 rounded-none bg-sky-500/5 border border-sky-500/20 text-xs text-foreground leading-relaxed">
                      Select <strong>20–30 interested students as C Programming Champions</strong>. They support peer learning and student retention by conducting:
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div className="p-3.5 rounded-none bg-card border border-border space-y-1">
                        <span className="text-[#0284c7] font-mono font-bold text-xs block">01. Practice Circles</span>
                        <h5 className="text-xs font-bold text-foreground">Weekly Coding Practice</h5>
                        <p className="text-[11px] text-muted-foreground">
                          Hands-on Thursday problem-solving circles in college computer labs.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-none bg-card border border-border space-y-1">
                        <span className="text-[#0284c7] font-mono font-bold text-xs block">02. Mentorship</span>
                        <h5 className="text-xs font-bold text-foreground">Doubt-Clearing Sessions</h5>
                        <p className="text-[11px] text-muted-foreground">
                          Targeted peer support on pointer arithmetic, recursion, and memory bugs.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-none bg-card border border-border space-y-1">
                        <span className="text-[#0284c7] font-mono font-bold text-xs block">03. Certification</span>
                        <h5 className="text-xs font-bold text-foreground">NPTEL Quiz Discussions</h5>
                        <p className="text-[11px] text-muted-foreground">
                          Friday MCQ/MSQ problem analysis and Sunday mock test reviews.
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground italic pt-1">
                      💡 <strong>Department Impact:</strong> This initiative dramatically improves both <strong>NPTEL certification success rates</strong> and the <strong>engineering programming culture</strong> across the Artificial Intelligence &amp; Data Science department.
                    </p>
                  </Card>
                </div>
              )}

              {/* TAB 1: INTRODUCTION */}
              {activeTab === "introduction" && (
                <Card className="border-border bg-card shadow-xs rounded-none">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-[#0284c7] dark:text-[#38bdf8] font-heading">
                      Welcome to the {lab.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
                    <p className="text-foreground text-sm font-medium">
                      {lab.description}
                    </p>

                  {/* LAB VIDEO TUTORIALS: SEPARATE ENGLISH & TAMIL SECTIONS */}
                  <div className="py-2 my-4 space-y-4">
                    {/* Language Selection Header */}
                    <div className="flex items-center justify-between gap-2 p-1.5 bg-muted/60 rounded-none border border-border">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setVideoLanguageTab("english")}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-none transition-all ${
                            videoLanguageTab === "english"
                              ? "bg-[#0284c7] text-white shadow-xs font-bold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span>🇬🇧 English Tutorial</span>
                          <Badge variant="outline" className={`text-[9px] px-1.5 py-0 border-0 rounded-none ${videoLanguageTab === "english" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
                            {lab.englishVideo?.timestamps?.length ? `${lab.englishVideo.timestamps.length} Chapters` : (lab.englishVideo?.duration || "Full Course")}
                          </Badge>
                        </button>
                        {lab.tamilVideo && (
                          <button
                            type="button"
                            onClick={() => setVideoLanguageTab("tamil")}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-none transition-all ${
                              videoLanguageTab === "tamil"
                                ? "bg-[#ea580c] text-white shadow-xs font-bold"
                                : "text-muted-foreground hover:text-orange-500"
                            }`}
                          >
                            <span>🇮🇳 தமிழ் Tutorial (Tamil)</span>
                            <Badge variant="outline" className={`text-[9px] px-1.5 py-0 border-0 rounded-none ${videoLanguageTab === "tamil" ? "bg-white/20 text-white" : "bg-orange-500/10 text-orange-600 dark:text-orange-400"}`}>
                              {lab.tamilVideo.timestamps?.length ? `${lab.tamilVideo.timestamps.length} Chapters` : (lab.tamilVideo.duration || "Full Course")}
                            </Badge>
                          </button>
                        )}
                      </div>
                      <Badge variant="outline" className="hidden sm:inline-flex text-[10px] font-mono text-muted-foreground rounded-none">
                        {videoLanguageTab === "english" ? "English Video Track" : "Tamil Video Track"}
                      </Badge>
                    </div>

                    {/* ENGLISH VIDEO SECTION */}
                    {videoLanguageTab === "english" && (() => {
                      const activeEnglishItem = activeEnglishTimestampIdx !== null && lab.englishVideo?.timestamps
                        ? lab.englishVideo.timestamps[activeEnglishTimestampIdx]
                        : null;
                      const baseEnglishUrl = selectedEnglishVideoUrl || lab.englishVideo?.url || lab.videoUrl;
                      const iframeEnglishSrc = englishVideoTime > 0
                        ? `${baseEnglishUrl}${baseEnglishUrl.includes("?") ? "&" : "?"}start=${englishVideoTime}&autoplay=1`
                        : `${baseEnglishUrl}${baseEnglishUrl.includes("?") ? "&" : "?"}autoplay=1`;

                      return (
                        <div className="space-y-4">
                          <div className="aspect-video w-full rounded-none bg-black/90 border border-[#0284c7]/30 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
                            <iframe
                              key={`english-overview-${baseEnglishUrl}-${englishVideoTime}`}
                              src={iframeEnglishSrc}
                              title={`${lab.name} English Video Tutorial`}
                              className="w-full h-full rounded-none border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>

                          <div className="p-4 bg-sky-500/5 rounded-none border border-[#0284c7]/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[10px] font-mono font-bold text-[#0284c7] dark:text-[#38bdf8] bg-sky-500/10 border-[#0284c7]/30 rounded-none">
                                  🇬🇧 {activeEnglishItem?.category || "English Video Tutorial & Theory"}
                                </Badge>
                                {lab.englishVideo?.channel && (
                                  <Badge variant="outline" className="text-[10px] font-mono border-border bg-background/50 rounded-none">
                                    {lab.englishVideo.channel}
                                  </Badge>
                                )}
                                <span className="text-xs text-muted-foreground font-mono">
                                  • {activeEnglishItem?.time || lab.englishVideo?.duration || "Full Course Video"}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-foreground">
                                {activeEnglishItem?.title || lab.englishVideo?.title || `${lab.name} — English Full Lecture & Practical Demonstration`}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {activeEnglishItem?.description || lab.englishVideo?.description || lab.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                              <a
                                href={activeEnglishItem?.url || (lab.englishVideo?.url || lab.videoUrl).replace("youtube-nocookie.com/embed/", "youtube.com/watch?v=")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none border border-[#0284c7]/30 text-xs font-semibold text-[#0284c7] dark:text-[#38bdf8] hover:bg-[#0284c7]/10 transition-colors"
                              >
                                <span>Watch on YouTube</span>
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            </div>
                          </div>

                          {lab.englishVideo?.timestamps && lab.englishVideo.timestamps.length > 0 && (
                            <VideoTimeline
                              video={lab.englishVideo}
                              activeTimestampIdx={activeEnglishTimestampIdx}
                              onSelectTimestamp={handleSelectEnglishTimestamp}
                              currentVideoTime={englishVideoTime}
                              compact={true}
                              accentColor="blue"
                            />
                          )}
                        </div>
                      );
                    })()}

                    {/* TAMIL VIDEO SECTION */}
                    {videoLanguageTab === "tamil" && lab.tamilVideo && (() => {
                      const activeTamilItem = activeTamilTimestampIdx !== null && lab.tamilVideo?.timestamps
                        ? lab.tamilVideo.timestamps[activeTamilTimestampIdx]
                        : null;
                      const baseTamilUrl = selectedTamilVideoUrl || lab.tamilVideo.url;
                      const iframeTamilSrc = tamilVideoTime > 0
                        ? `${baseTamilUrl}${baseTamilUrl.includes("?") ? "&" : "?"}start=${tamilVideoTime}&autoplay=1`
                        : `${baseTamilUrl}${baseTamilUrl.includes("?") ? "&" : "?"}autoplay=1`;

                      return (
                        <div className="space-y-4">
                          <div className="aspect-video w-full rounded-none bg-black/90 border border-[#ea580c]/30 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
                            <iframe
                              key={`tamil-overview-${baseTamilUrl}-${tamilVideoTime}`}
                              src={iframeTamilSrc}
                              title={lab.tamilVideo.title}
                              className="w-full h-full rounded-none border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>

                          <div className="p-4 bg-orange-500/5 rounded-none border border-[#ea580c]/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[10px] font-mono font-bold text-[#ea580c] dark:text-[#f97316] bg-orange-500/10 border-[#ea580c]/30 rounded-none">
                                  {activeTamilItem?.category || "தமிழ் Full Course Tutorial"}
                                </Badge>
                                {lab.tamilVideo.channel && (
                                  <Badge variant="outline" className="text-[10px] font-mono border-border bg-background/50 rounded-none">
                                    {lab.tamilVideo.channel}
                                  </Badge>
                                )}
                                <span className="text-xs text-muted-foreground font-mono">
                                  • {activeTamilItem?.time || lab.tamilVideo.duration || "Full Course"}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-foreground">
                                {activeTamilItem?.title || lab.tamilVideo.title}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {activeTamilItem?.description || lab.tamilVideo.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                              <a
                                href={activeTamilItem?.url || lab.tamilVideo.url.replace("youtube-nocookie.com/embed/", "youtube.com/watch?v=")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none border border-[#ea580c]/30 text-xs font-semibold text-[#ea580c] dark:text-[#f97316] hover:bg-orange-500/10 transition-colors"
                              >
                                <span>Watch on YouTube</span>
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            </div>
                          </div>

                          {lab.tamilVideo.timestamps && lab.tamilVideo.timestamps.length > 0 && (
                            <TamilVideoTimeline
                              tamilVideo={lab.tamilVideo}
                              activeTimestampIdx={activeTamilTimestampIdx}
                              onSelectTimestamp={handleSelectTamilTimestamp}
                              currentVideoTime={tamilVideoTime}
                              compact={true}
                            />
                          )}
                        </div>
                      );
                    })()}
                  </div>
                  </CardContent>
                </Card>
              )}

              {/* TAB 2: VIDEO TUTORIALS */}
              {activeTab === "video-tutorials" && (
                <div className="space-y-6">
                  <Card className="border-border bg-card shadow-xs rounded-none">
                    <CardHeader className="pb-4 border-b border-border/50">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs font-mono bg-sky-500/10 text-[#0284c7] dark:text-[#38bdf8] border-[#0284c7]/20 rounded-none">
                              Comprehensive Masterclasses
                            </Badge>
                            <Badge variant="outline" className="text-xs font-mono text-[#059669] dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10 rounded-none">
                              2 Language Tracks
                            </Badge>
                          </div>
                          <CardTitle className="text-xl sm:text-2xl font-bold text-[#0284c7] dark:text-[#38bdf8] font-heading">
                            {lab.name} — Full Video Tutorial Series
                          </CardTitle>
                          <CardDescription className="text-xs mt-1">
                            Follow step-by-step video lectures in English or Tamil with timestamped experiment chapter navigation.
                          </CardDescription>
                        </div>

                        {/* Language Selector */}
                        <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-none border border-border shrink-0">
                          <button
                            type="button"
                            onClick={() => setVideoLanguageTab("english")}
                            className={`px-3 py-1 text-xs font-semibold rounded-none transition-all ${
                              videoLanguageTab === "english"
                                ? "bg-[#0284c7] text-white shadow-xs font-bold"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            🇬🇧 English Suite
                          </button>
                          {lab.tamilVideo && (
                            <button
                              type="button"
                              onClick={() => setVideoLanguageTab("tamil")}
                              className={`px-3 py-1 text-xs font-semibold rounded-none transition-all ${
                                videoLanguageTab === "tamil"
                                  ? "bg-[#ea580c] text-white shadow-xs font-bold"
                                  : "text-muted-foreground hover:text-orange-500"
                              }`}
                            >
                              🇮🇳 தமிழ் Course
                            </button>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                      {/* ENGLISH SECTION */}
                      {videoLanguageTab === "english" && (() => {
                        const activeEnglishItem = activeEnglishTimestampIdx !== null && lab.englishVideo?.timestamps
                          ? lab.englishVideo.timestamps[activeEnglishTimestampIdx]
                          : null;
                        const baseEnglishUrl = selectedEnglishVideoUrl || lab.englishVideo?.url || lab.videoUrl;
                        const iframeEnglishSrc = englishVideoTime > 0
                          ? `${baseEnglishUrl}${baseEnglishUrl.includes("?") ? "&" : "?"}start=${englishVideoTime}&autoplay=1`
                          : `${baseEnglishUrl}${baseEnglishUrl.includes("?") ? "&" : "?"}autoplay=1`;

                        return (
                          <div className="space-y-6">
                            <div className="aspect-video w-full rounded-none bg-black/90 border border-[#0284c7]/30 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
                              <iframe
                                key={`english-tab-${baseEnglishUrl}-${englishVideoTime}`}
                                src={iframeEnglishSrc}
                                title={`${lab.name} English Video Suite`}
                                className="w-full h-full rounded-none border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>

                            <div className="p-5 bg-sky-500/5 rounded-none border border-[#0284c7]/20 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-[10px] font-mono font-bold text-[#0284c7] dark:text-[#38bdf8] bg-sky-500/10 border-[#0284c7]/30 rounded-none">
                                    🇬🇧 {activeEnglishItem?.category || "English Lecture & Practical Demonstration"}
                                  </Badge>
                                  {lab.englishVideo?.channel && (
                                    <Badge variant="outline" className="text-[10px] font-mono border-border bg-background/50 rounded-none">
                                      Channel: {lab.englishVideo.channel}
                                    </Badge>
                                  )}
                                  <span className="text-xs text-muted-foreground font-mono">
                                    • {activeEnglishItem?.time || lab.englishVideo?.duration || "Full Course"}
                                  </span>
                                </div>
                                <h3 className="text-base font-bold text-foreground font-heading">
                                  {activeEnglishItem?.title || lab.englishVideo?.title || `${lab.name} — Full Laboratory Video Walkthrough`}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                                  {activeEnglishItem?.description || lab.englishVideo?.description || lab.description}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                                <a
                                  href={activeEnglishItem?.url || (lab.englishVideo?.url || lab.videoUrl).replace("youtube-nocookie.com/embed/", "youtube.com/watch?v=")}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none border border-[#0284c7]/30 text-xs font-semibold text-[#0284c7] dark:text-[#38bdf8] hover:bg-[#0284c7]/10 transition-colors"
                                >
                                  <span>Watch on YouTube</span>
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                                <Button onClick={() => setActiveTab("experiments")} size="sm" className="text-xs font-bold gap-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-none">
                                  Practice Experiments <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {lab.englishVideo?.timestamps && lab.englishVideo.timestamps.length > 0 && (
                              <VideoTimeline
                                video={lab.englishVideo}
                                activeTimestampIdx={activeEnglishTimestampIdx}
                                onSelectTimestamp={handleSelectEnglishTimestamp}
                                currentVideoTime={englishVideoTime}
                                compact={false}
                                accentColor="blue"
                              />
                            )}
                          </div>
                        );
                      })()}

                      {/* TAMIL FULL COURSE SECTION */}
                      {videoLanguageTab === "tamil" && lab.tamilVideo && (() => {
                        const activeTamilItem = activeTamilTimestampIdx !== null && lab.tamilVideo?.timestamps
                          ? lab.tamilVideo.timestamps[activeTamilTimestampIdx]
                          : null;
                        const baseTamilUrl = selectedTamilVideoUrl || lab.tamilVideo.url;
                        const iframeTamilSrc = tamilVideoTime > 0
                          ? `${baseTamilUrl}${baseTamilUrl.includes("?") ? "&" : "?"}start=${tamilVideoTime}&autoplay=1`
                          : `${baseTamilUrl}${baseTamilUrl.includes("?") ? "&" : "?"}autoplay=1`;

                        return (
                          <div className="space-y-6">
                            <div className="aspect-video w-full rounded-none bg-black/90 border border-[#ea580c]/30 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
                              <iframe
                                key={`tamil-tab-${baseTamilUrl}-${tamilVideoTime}`}
                                src={iframeTamilSrc}
                                title={lab.tamilVideo.title}
                                className="w-full h-full rounded-none border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>

                            <div className="p-5 bg-orange-500/5 rounded-none border border-[#ea580c]/20 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-[10px] font-mono font-bold text-[#ea580c] dark:text-[#f97316] bg-orange-500/10 border-[#ea580c]/30 rounded-none">
                                    {activeTamilItem?.category || "தமிழ் Full Course Tutorial"}
                                  </Badge>
                                  {lab.tamilVideo.channel && (
                                    <Badge variant="outline" className="text-[10px] font-mono border-border bg-background/50 rounded-none">
                                      Channel: {lab.tamilVideo.channel}
                                    </Badge>
                                  )}
                                  <span className="text-xs text-muted-foreground font-mono">
                                    • {activeTamilItem?.time || lab.tamilVideo.duration || "Full Course"}
                                  </span>
                                </div>
                                <h3 className="text-base font-bold text-foreground font-heading">
                                  {activeTamilItem?.title || lab.tamilVideo.title}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                                  {activeTamilItem?.description || lab.tamilVideo.description}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                                <a
                                  href={activeTamilItem?.url || lab.tamilVideo.url.replace("youtube-nocookie.com/embed/", "youtube.com/watch?v=")}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none border border-[#ea580c]/30 text-xs font-semibold text-[#ea580c] dark:text-[#f97316] hover:bg-orange-500/10 transition-colors"
                                >
                                  <span>Watch on YouTube</span>
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                                <Button onClick={() => setActiveTab("experiments")} size="sm" className="text-xs font-bold gap-1.5 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-none">
                                  Practice Experiments <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {lab.tamilVideo.timestamps && lab.tamilVideo.timestamps.length > 0 && (
                              <TamilVideoTimeline
                                tamilVideo={lab.tamilVideo}
                                activeTimestampIdx={activeTamilTimestampIdx}
                                onSelectTimestamp={handleSelectTamilTimestamp}
                                currentVideoTime={tamilVideoTime}
                                compact={false}
                              />
                            )}
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* TAB 3: OBJECTIVE */}
              {activeTab === "objective" && (
                <Card className="border-border bg-card shadow-xs rounded-none">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-[#0284c7] dark:text-[#38bdf8] font-heading">
                      Objectives of {lab.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
                    <p className="text-foreground text-sm font-medium">
                      The role of this Department Virtual Lab is to complement classroom lectures and textbooks in three distinct ways:
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="p-4 rounded-none bg-card border border-border flex items-start gap-3 shadow-2xs">
                        <span className="flex items-center justify-center h-6 w-6 rounded-none bg-[#0284c7] text-white font-bold text-xs shrink-0 mt-0.5 font-mono">
                          1
                        </span>
                        <div>
                          <strong className="text-foreground font-semibold block text-sm">Interactive Visual Animations</strong>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            High-fidelity visual animations of memory states during insertions, deletions, recursion frames, and data filtering.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-none bg-card border border-border flex items-start gap-3 shadow-2xs">
                        <span className="flex items-center justify-center h-6 w-6 rounded-none bg-[#0284c7] text-white font-bold text-xs shrink-0 mt-0.5 font-mono">
                          2
                        </span>
                        <div>
                          <strong className="text-foreground font-semibold block text-sm">Step-by-Step Code Execution</strong>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Execute algorithms step-by-step with custom inputs, call stack frame inspection, and variable watch scopes.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-none bg-card border border-border flex items-start gap-3 shadow-2xs">
                        <span className="flex items-center justify-center h-6 w-6 rounded-none bg-[#0284c7] text-white font-bold text-xs shrink-0 mt-0.5 font-mono">
                          3
                        </span>
                        <div>
                          <strong className="text-foreground font-semibold block text-sm">LeetCode &amp; Industry Alignment</strong>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Direct problem solving on curated LeetCode challenges and self-assessment evaluations for placement readiness.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* TAB: TARGET AUDIENCE */}
              {activeTab === "target-audience" && (
                <Card className="border-border bg-card shadow-xs rounded-none">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-[#0284c7] dark:text-[#38bdf8] font-heading">
                      Target Audience
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Primary academic cohorts and engineering profiles benefiting from this laboratory.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                    <p className="text-foreground text-sm font-medium">
                      The {lab.name} curriculum, algorithmic visualizations, and interactive sandboxes are designed for:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-none bg-card border border-border space-y-2 shadow-2xs">
                        <div className="flex items-center gap-2 text-[#0284c7] dark:text-[#38bdf8] font-bold text-sm">
                          <GraduationCap className="h-4 w-4" />
                          <span>Undergraduate Students</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          B.E. / B.Tech students in Artificial Intelligence &amp; Data Science, Computer Science &amp; Engineering, and Information Technology taking core laboratory courses.
                        </p>
                      </div>

                      <div className="p-4 rounded-none bg-card border border-border space-y-2 shadow-2xs">
                        <div className="flex items-center gap-2 text-[#0284c7] dark:text-[#38bdf8] font-bold text-sm">
                          <Users className="h-4 w-4" />
                          <span>Postgraduate &amp; Research Scholars</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          M.E. / M.Tech and Ph.D. scholars requiring foundational computational simulation models, asymptotic complexity benchmarking, and data structures analysis.
                        </p>
                      </div>

                      <div className="p-4 rounded-none bg-card border border-border space-y-2 shadow-2xs">
                        <div className="flex items-center gap-2 text-[#ea580c] dark:text-[#f97316] font-bold text-sm">
                          <Trophy className="h-4 w-4" />
                          <span>Competitive Coders &amp; GATE Aspirants</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Learners preparing for GATE CSE/DA, NPTEL Certification exams, LeetCode / HackerRank technical interview rounds, and university evaluations.
                        </p>
                      </div>

                      <div className="p-4 rounded-none bg-card border border-border space-y-2 shadow-2xs">
                        <div className="flex items-center gap-2 text-[#059669] dark:text-emerald-400 font-bold text-sm">
                          <BookOpen className="h-4 w-4" />
                          <span>Faculty Educators &amp; Instructors</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Academic faculty seeking classroom demonstration tools, live call stack visualizations, interactive algorithm walkthroughs, and automated rubric assessments.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* TAB 4: LIST OF EXPERIMENTS */}
              {activeTab === "experiments" && (
                <div className="space-y-6">
                  {/* If Machine Learning Lab, show the Prerequisite NumPy/Pandas Track first! */}
                  {lab.id === "ai-machine-learning" && (
                    <MLPrerequisitesTrack />
                  )}

                  {/* Experiments List Card */}
                  <Card className="border-border bg-card shadow-xs rounded-none">
                    <CardHeader className="pb-3 border-b border-border/50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl sm:text-2xl font-bold text-[#0284c7] dark:text-[#38bdf8] font-heading">
                          Laboratory Experiments Syllabus ({experiments.length})
                        </CardTitle>
                        <Badge variant="outline" className="text-xs font-mono rounded-none">
                          {LAB_ROADMAPS_DATA[lab.id]?.badge || "Engineering Sandbox"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 divide-y divide-border/50">
                      {experiments.map((exp, idx) => (
                        <div
                          key={exp.id}
                          className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group"
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-foreground group-hover:text-[#0284c7] transition-colors">
                                {idx + 1}. {exp.title}
                              </span>
                              <Badge variant="outline" className="text-[10px] font-mono rounded-none">
                                {exp.difficulty}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {exp.sections.objective}
                            </p>
                            <div className="flex items-center gap-3 text-[11px] text-muted-foreground pt-1">
                              <span className="flex items-center gap-1">
                                <Video className="h-3 w-3 text-[#0284c7]" /> Video Tutorial
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Code2 className="h-3 w-3 text-[#ea580c]" /> Call Stack Trace
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedQuizExpId(exp.id);
                                setActiveTab("quizzes");
                              }}
                              className="text-xs gap-1.5 font-semibold border-[#0284c7]/30 text-[#0284c7] dark:text-[#38bdf8] hover:bg-[#0284c7]/10 cursor-pointer shadow-2xs rounded-none"
                            >
                              <HelpCircle className="h-3.5 w-3.5" />
                              <span>5-Q Quiz</span>
                            </Button>
                            <Button asChild size="sm" className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs gap-1.5 font-bold shadow-xs rounded-none">
                              <Link href={`/experiments/${exp.slug}`}>
                                <PlayCircle className="h-4 w-4" />
                                <span>Start Experiment</span>
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* TAB 5: 5-QUESTION EXPERIMENT EVALUATION QUIZZES */}
              {activeTab === "quizzes" && (() => {
                const currentQuizExp = experiments.find((e) => e.id === selectedQuizExpId) || experiments[0];
                const activeQuiz = currentQuizExp
                  ? (QUIZZES_DATA[currentQuizExp.quizId] || getQuizForExperiment(currentQuizExp.id, currentQuizExp.title))
                  : Object.values(QUIZZES_DATA)[0];

                return (
                  <div className="space-y-8">
                    {/* Section 1: Interactive 5-Question Lab Assessment */}
                    <Card className="border-border bg-card shadow-xs p-6 space-y-6 rounded-none">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs font-mono bg-sky-500/10 text-[#0284c7] dark:text-[#38bdf8] border-[#0284c7]/20 rounded-none">
                              {lab.id === "c-programming" ? "NPTEL Weekly Assessment" : "5-Question Assessment"}
                            </Badge>
                            <Badge variant="outline" className="text-xs font-mono text-[#059669] dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10 rounded-none">
                              Passing: 80% (4/5)
                            </Badge>
                          </div>
                          <CardTitle className="text-xl sm:text-2xl font-bold text-[#0284c7] dark:text-[#38bdf8] font-heading flex items-center gap-2">
                            <Award className="h-5 w-5 text-amber-500" />
                            <span>{lab.name} — Evaluation Tests</span>
                          </CardTitle>
                          <CardDescription className="text-xs mt-1">
                            Select an assessment below to test your conceptual and complexity mastery with instant scoring synced to your student profile and faculty admin roster.
                          </CardDescription>
                        </div>
                      </div>

                      {/* Experiment Selector Pills */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                          Select Assessment ({experiments.length} Available):
                        </label>
                        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                          {experiments.map((exp, idx) => {
                            const isSelected = (selectedQuizExpId || experiments[0]?.id) === exp.id;
                            return (
                              <button
                                key={exp.id}
                                type="button"
                                onClick={() => setSelectedQuizExpId(exp.id)}
                                className={`px-3 py-1.5 rounded-none text-xs font-semibold transition-all border flex items-center gap-1.5 cursor-pointer ${
                                  isSelected
                                    ? "bg-[#0284c7] text-white border-[#0284c7] shadow-xs"
                                    : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border-border"
                                }`}
                              >
                                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-none ${
                                  isSelected ? "bg-white/20 text-white" : "bg-muted text-foreground"
                                }`}>
                                  {lab.id === "c-programming" ? `Week ${idx + 1}` : `Exp ${idx + 1}`}
                                </span>
                                <span>{exp.title}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Render Interactive Quiz Engine */}
                      {activeQuiz ? (
                        <div className="pt-2">
                          <QuizEngine key={activeQuiz.id} quiz={activeQuiz} />
                        </div>
                      ) : (
                        <div className="p-8 text-center text-sm text-muted-foreground bg-muted/20 rounded-none border border-border">
                          Select an assessment above to launch its evaluation quiz.
                        </div>
                      )}
                    </Card>
                  </div>
                );
              })()}

              {/* TAB 6: COURSE ALIGNMENT */}
              {activeTab === "course-alignment" && (
                <CourseAlignmentCard />
              )}

              {/* TAB 7: RESOURCES & TUTORIALS */}
              {activeTab === "resources" && (
                <div className="space-y-6">
                  <Card className="border-border bg-card shadow-xs rounded-none">
                    <CardHeader className="pb-4 border-b border-border/50">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs font-mono bg-sky-500/10 text-[#0284c7] dark:text-[#38bdf8] border-[#0284c7]/20 rounded-none">
                              Curated Study Material
                            </Badge>
                            {lab.id === "c-programming" && (
                              <Badge variant="outline" className="text-xs font-mono border-orange-500/30 text-orange-600 dark:text-orange-400 bg-orange-500/10 rounded-none">
                                SWAYAM / NPTEL
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs font-mono border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-none">
                              GeeksforGeeks
                            </Badge>
                            <Badge variant="outline" className="text-xs font-mono border-sky-500/30 text-sky-600 dark:text-sky-400 bg-sky-500/10 rounded-none">
                              W3Schools
                            </Badge>
                          </div>
                          <CardTitle className="text-xl sm:text-2xl font-bold text-[#0284c7] dark:text-[#38bdf8] font-heading">
                            {lab.name} — Handbooks &amp; Interactive Tutorials
                          </CardTitle>
                          <CardDescription className="text-xs mt-1">
                            Master core concepts through curated, industry-standard tutorials and documentation from NPTEL, GeeksforGeeks, and W3Schools.
                          </CardDescription>
                        </div>

                        {/* Source Filter Buttons */}
                        <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-none border border-border shrink-0">
                          <button
                            type="button"
                            onClick={() => setResourceSourceFilter("ALL")}
                            className={`px-3 py-1 text-xs font-semibold rounded-none transition-all ${
                              resourceSourceFilter === "ALL"
                                ? "bg-[#0284c7] text-white shadow-xs font-bold"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            All ({lab.resources?.length || 0})
                          </button>
                          <button
                            type="button"
                            onClick={() => setResourceSourceFilter("GeeksforGeeks")}
                            className={`px-3 py-1 text-xs font-semibold rounded-none transition-all ${
                              resourceSourceFilter === "GeeksforGeeks"
                                ? "bg-[#059669] text-white shadow-xs font-bold"
                                : "text-muted-foreground hover:text-emerald-500"
                            }`}
                          >
                            GeeksforGeeks
                          </button>
                          <button
                            type="button"
                            onClick={() => setResourceSourceFilter("W3Schools")}
                            className={`px-3 py-1 text-xs font-semibold rounded-none transition-all ${
                              resourceSourceFilter === "W3Schools"
                                ? "bg-[#0284c7] text-white shadow-xs font-bold"
                                : "text-muted-foreground hover:text-sky-500"
                            }`}
                          >
                            W3Schools
                          </button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(lab.resources || [])
                          .filter((res) => resourceSourceFilter === "ALL" || res.source === resourceSourceFilter)
                          .map((res, rIdx) => {
                            const isGfg = res.source === "GeeksforGeeks";
                            const isOfficial = res.source === "Official Docs";

                            return (
                              <a
                                key={rIdx}
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-4 rounded-none bg-card hover:bg-muted/30 border border-border hover:border-[#0284c7]/50 transition-all duration-200 shadow-2xs hover:shadow-xs flex flex-col justify-between"
                              >
                                <div className="space-y-2.5">
                                  <div className="flex items-center justify-between gap-2">
                                    <Badge
                                      variant="outline"
                                      className={`text-[10px] font-bold font-mono rounded-none ${
                                        isOfficial
                                          ? "bg-orange-500/10 text-[#ea580c] dark:text-[#f97316] border-orange-500/30"
                                          : isGfg
                                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                                          : "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30"
                                      }`}
                                    >
                                      {isOfficial ? "★ NPTEL Official" : isGfg ? "🟢 GeeksforGeeks" : "🔵 W3Schools"}
                                    </Badge>

                                    <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground rounded-none">
                                      {res.category}
                                    </Badge>
                                  </div>

                                  <h4 className="text-sm font-bold text-foreground group-hover:text-[#0284c7] transition-colors leading-snug">
                                    {res.title}
                                  </h4>

                                  <p className="text-xs text-muted-foreground leading-relaxed">
                                    {res.description}
                                  </p>
                                </div>

                                <div className="pt-3 mt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-[#0284c7] dark:text-[#38bdf8]">
                                  <span>{isOfficial ? "Visit NPTEL Course Portal" : isGfg ? "Read on GeeksforGeeks" : "Practice on W3Schools"}</span>
                                  <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </div>
                              </a>
                            );
                          })}
                      </div>

                      {/* Portal Direct Links */}
                      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border/50">
                        {lab.id === "c-programming" && (
                          <div className="p-4 rounded-none bg-orange-500/5 border border-[#ea580c]/20 flex items-center justify-between">
                            <div className="space-y-0.5">
                              <span className="text-xs font-bold text-[#ea580c] dark:text-[#f97316] block font-mono">
                                SWAYAM NPTEL Portal
                              </span>
                              <p className="text-[11px] text-muted-foreground">Official course notes &amp; assignment tests</p>
                            </div>
                            <Button asChild size="sm" variant="outline" className="text-xs border-[#ea580c]/30 hover:bg-orange-500/10 text-[#ea580c] dark:text-[#f97316] font-bold shrink-0 rounded-none">
                              <a href="https://nptel.ac.in/courses/106104128" target="_blank" rel="noopener noreferrer">
                                NPTEL ↗
                              </a>
                            </Button>
                          </div>
                        )}

                        <div className="p-4 rounded-none bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block font-mono">
                              GeeksforGeeks Portal
                            </span>
                            <p className="text-[11px] text-muted-foreground">10,000+ computer science articles</p>
                          </div>
                          <Button asChild size="sm" variant="outline" className="text-xs border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shrink-0 rounded-none">
                            <a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer">
                              Visit GfG ↗
                            </a>
                          </Button>
                        </div>

                        <div className="p-4 rounded-none bg-sky-500/5 border border-[#0284c7]/20 flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-[#0284c7] dark:text-[#38bdf8] block font-mono">
                              W3Schools C Editor
                            </span>
                            <p className="text-[11px] text-muted-foreground">Interactive sandbox &amp; cheatsheets</p>
                          </div>
                          <Button asChild size="sm" variant="outline" className="text-xs border-[#0284c7]/30 hover:bg-sky-500/10 text-[#0284c7] dark:text-[#38bdf8] font-bold shrink-0 rounded-none">
                            <a href="https://www.w3schools.com/c/index.php" target="_blank" rel="noopener noreferrer">
                              W3Schools ↗
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* TAB 8: FEEDBACK */}
              {activeTab === "feedback" && (
                <Card className="border-border bg-card shadow-xs rounded-none">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-[#0284c7] dark:text-[#38bdf8] font-heading">
                      Laboratory Feedback &amp; Suggestions
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Thanks for using Virtual Labs. Your review helps us continuously enhance simulation precision.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {feedbackSent ? (
                      <div className="p-6 text-center space-y-2 bg-emerald-500/10 border border-emerald-500/30 rounded-none text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-8 w-8 mx-auto" />
                        <h4 className="font-bold">Thank you for your feedback!</h4>
                        <p className="text-xs text-muted-foreground">— Department of AI &amp; DS Virtual Labs Team</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSendFeedback} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold">Laboratory Rating (1 - 5)</label>
                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setFeedbackRating(s)}
                                className={`h-8 w-8 rounded-none text-xs font-bold border transition-all cursor-pointer ${
                                  s === feedbackRating
                                    ? "bg-[#0284c7] text-white border-[#0284c7] shadow-xs"
                                    : "bg-muted/50 hover:bg-muted text-muted-foreground border-border"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold">Comments / Suggestions</label>
                          <Textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder="Type your feedback here regarding simulations or curriculum preparation..."
                            rows={4}
                            className="text-xs rounded-none"
                          />
                        </div>

                        <Button type="submit" className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold gap-1.5 shadow-xs rounded-none">
                          <Send className="h-3.5 w-3.5" /> Submit Experience
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
