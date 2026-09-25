"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Experiment, EXPERIMENTS_DATA } from "@/data/experiments";
import { LABS_DATA } from "@/data/labs";
import { QUIZZES_DATA, getQuizForExperiment } from "@/data/quizzes";
import { useStudentProgress } from "@/hooks/use-student-progress";

// Visualizer imports
import { StackVisualizer } from "@/components/visualizer/stack/stack-visualizer";
import { QueueVisualizer } from "@/components/visualizer/queue/queue-visualizer";
import { LinkedListVisualizer } from "@/components/visualizer/linked-list/linked-list-visualizer";
import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer";
import { RecursionVisualizerPanel } from "@/components/visualizer/recursion/recursion-visualizer-panel";
import { LeetCodePracticeCard } from "@/components/vlab/leetcode-practice-card";
import { SqlCompiler } from "@/components/vlab/sql-compiler";
import { VideoTimeline, TamilVideoTimeline } from "@/components/vlab/tamil-video-timeline";

// Sub-components for 9 authentic sections
import { LabHeaderBanner } from "@/components/vlab/lab-header-banner";
import {
  ExperimentNavigationSidebar,
  ExperimentTab,
} from "@/components/vlab/experiment-navigation-sidebar";
import { ExperimentAssessmentView } from "@/components/vlab/experiment-assessment-view";
import { ExperimentContributors } from "@/components/vlab/experiment-contributors";
import { ExperimentReferences } from "@/components/vlab/experiment-references";

// UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Video,
  PlayCircle,
  Code2,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Cpu,
  Terminal,
  ExternalLink,
  MessageSquareHeart,
  Send,
  BookOpen,
  Trash2,
  Plus,
  RotateCcw,
  StepForward,
  Zap,
  Settings2,
  Sliders,
  Star,
} from "lucide-react";

interface PipelineInstruction {
  id: string;
  op: string;
  rd: string;
  rs1: string;
  rs2: string;
}

const DEFAULT_PIPELINE_INSTRUCTIONS: PipelineInstruction[] = [
  { id: "inst-1", op: "ADD", rd: "R1", rs1: "R2", rs2: "R3" },
  { id: "inst-2", op: "SUB", rd: "R4", rs1: "R1", rs2: "R5" },
  { id: "inst-3", op: "MUL", rd: "R6", rs1: "R4", rs2: "R2" },
];

interface ExperimentWorkspaceProps {
  experiment: Experiment;
}

export function ExperimentWorkspace({ experiment }: ExperimentWorkspaceProps) {
  const { progress, saveFeedback, saveQuiz } = useStudentProgress();
  const markExperimentComplete = (id: string) => {
    saveQuiz(id, 5, 5, 4);
  };
  const [activeTab, setActiveTab] = useState<ExperimentTab>("aim");
  const [userRating, setUserRating] = useState<number>(5);
  const [feedbackComment, setFeedbackComment] = useState<string>("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simOutput, setSimOutput] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  // Official Instruction Studio State (Screenshot 112701)
  const [pipelineInstructions, setPipelineInstructions] = useState<PipelineInstruction[]>(DEFAULT_PIPELINE_INSTRUCTIONS);
  const [currOp, setCurrOp] = useState<string>("ADD");
  const [currRd, setCurrRd] = useState<string>("R1");
  const [currRs1, setCurrRs1] = useState<string>("R2");
  const [currRs2, setCurrRs2] = useState<string>("R3");
  const [dataForwarding, setDataForwarding] = useState<boolean>(true);
  const [latencies, setLatencies] = useState<{ IF: number; ID: number; EX: number; MEM: number; WB: number }>({
    IF: 1,
    ID: 1,
    EX: 2,
    MEM: 1,
    WB: 1,
  });
  const [pipelineClockCycle, setPipelineClockCycle] = useState<number>(0);
  const [isPipelineRunning, setIsPipelineRunning] = useState<boolean>(false);

  const handleAddPipelineInstruction = () => {
    const newInst: PipelineInstruction = {
      id: `inst-${Date.now()}`,
      op: currOp,
      rd: currRd,
      rs1: currRs1,
      rs2: currRs2,
    };
    setPipelineInstructions((prev) => [...prev, newInst]);
  };

  const handleRemovePipelineInstruction = (id: string) => {
    setPipelineInstructions((prev) => prev.filter((i) => i.id !== id));
  };

  const handleResetPipeline = () => {
    setPipelineClockCycle(0);
    setIsPipelineRunning(false);
  };

  const handleStepPipeline = () => {
    setPipelineClockCycle((prev) => Math.min(prev + 1, 12));
  };

  const handleRunPipeline = () => {
    setIsPipelineRunning(true);
    setPipelineClockCycle(1);
    let cycle = 1;
    const interval = setInterval(() => {
      cycle += 1;
      setPipelineClockCycle(cycle);
      if (cycle >= 8 + pipelineInstructions.length) {
        clearInterval(interval);
        setIsPipelineRunning(false);
        markExperimentComplete(experiment.id);
      }
    }, 600);
  };

  // Video language state
  const [expVideoLang, setExpVideoLang] = useState<"english" | "tamil">("english");
  const [expTamilVideoTime, setExpTamilVideoTime] = useState<number>(0);
  const [activeExpTamilTimestampIdx, setActiveExpTamilTimestampIdx] = useState<number | null>(null);
  const [expEnglishVideoTime, setExpEnglishVideoTime] = useState<number>(0);
  const [activeExpEnglishTimestampIdx, setActiveExpEnglishTimestampIdx] = useState<number | null>(null);

  const handleSelectExpTamilTimestamp = (seconds: number, idx: number) => {
    setExpTamilVideoTime(seconds);
    setActiveExpTamilTimestampIdx(idx);
  };

  const handleSelectExpEnglishTimestamp = (seconds: number, idx: number) => {
    setExpEnglishVideoTime(seconds);
    setActiveExpEnglishTimestampIdx(idx);
  };

  const lab = LABS_DATA.find((l) => l.id === experiment.labId);
  const quiz =
    QUIZZES_DATA[experiment.quizId] ||
    getQuizForExperiment(experiment.id, experiment.title) ||
    getQuizForExperiment(experiment.slug, experiment.title);
  const isCompleted = progress.completedExperiments.includes(experiment.id);

  // Find prev and next experiments
  const currentIndex = EXPERIMENTS_DATA.findIndex((e) => e.id === experiment.id);
  const prevExp = currentIndex > 0 ? EXPERIMENTS_DATA[currentIndex - 1] : null;
  const nextExp =
    currentIndex < EXPERIMENTS_DATA.length - 1 ? EXPERIMENTS_DATA[currentIndex + 1] : null;

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackComment.trim()) {
      alert("Please provide a short comment with your rating.");
      return;
    }
    saveFeedback(experiment.id, userRating, feedbackComment);
    setFeedbackSubmitted(true);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimOutput(experiment.sections.expectedOutput);
      setIsSimulating(false);
      markExperimentComplete(experiment.id);
    }, 600);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Discipline Breadcrumbs & Rating Header Banner matching Screenshots 112538 - 112841 */}
      <LabHeaderBanner
        discipline={lab?.department || "Artificial Intelligence & Data Science"}
        labName={lab?.name || "Virtual Laboratory"}
        experimentTitle={experiment.title}
        labId={lab?.id}
      />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Sub-Header with Experiment Title and Prev/Next Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-2 border-b border-border/60">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0284c7] dark:text-[#38bdf8] font-heading tracking-tight">
              {experiment.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-[10px] font-mono text-primary bg-primary/10 border-primary/20 rounded-none">
                {experiment.category}
              </Badge>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {experiment.estimatedMinutes || 60} mins
              </span>
              <span>•</span>
              <Badge variant="outline" className="text-[10px] font-medium rounded-none">
                {experiment.difficulty}
              </Badge>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-none border border-emerald-500/20">
                  <CheckCircle2 className="h-3 w-3" /> Completed
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {prevExp && (
              <Button asChild variant="outline" size="sm" className="h-8 text-xs gap-1 rounded-none">
                <Link href={`/experiments/${prevExp.slug}`}>
                  <ChevronLeft className="h-3.5 w-3.5" /> Prev Experiment
                </Link>
              </Button>
            )}
            {nextExp && (
              <Button asChild variant="outline" size="sm" className="h-8 text-xs gap-1 rounded-none">
                <Link href={`/experiments/${nextExp.slug}`}>
                  Next Experiment <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* 2-Column Standard Virtual Labs Layout: Left 9-Tab Sidebar + Right Content Area */}
        <div className="flex flex-col lg:flex-row gap-8 items-start min-h-[600px] pt-2">
          {/* Left 9-Section Sidebar */}
          <ExperimentNavigationSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Right Main Content Area */}
          <div className="flex-1 w-full min-w-0 space-y-6">
            {/* ============================================================== */}
            {/* 1. AIM (Screenshot 112538)                                     */}
            {/* ============================================================== */}
            {activeTab === "aim" && (
              <div className="space-y-8 max-w-4xl text-sm leading-relaxed">
                <h2 className="text-2xl sm:text-3xl font-normal text-[#0284c7] dark:text-[#38bdf8] font-sans">
                  {experiment.title}
                </h2>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-foreground underline decoration-[#ea580c] underline-offset-4 font-heading">
                    Estimated Time
                  </h3>
                  <p className="text-foreground/90 font-sans">1 hour ({experiment.estimatedMinutes || 60} minutes)</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-foreground underline decoration-[#ea580c] underline-offset-4 font-heading">
                    Learning Objective of the Experiment
                  </h3>
                  <div className="text-foreground/90 font-sans leading-relaxed space-y-2">
                    <p>
                      {experiment.sections.objective ||
                        `To analyze, visualize, and simulate the core mechanisms of ${experiment.title}, verifying step-by-step memory transitions, asymptotic time complexities, and state invariants.`}
                    </p>
                    <ul className="list-disc pl-6 space-y-1.5 text-foreground/90 font-sans pt-1">
                      <li>Understand operational pipeline latency, dynamic states, and memory boundaries.</li>
                      <li>Simulate instruction flow, hazard detection, and operand bypassing mechanisms.</li>
                      <li>Inspect asymptotic bounds across best, average, and worst-case execution paths.</li>
                    </ul>
                  </div>
                </div>

                {experiment.sections.introduction && (
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-foreground underline decoration-[#ea580c] underline-offset-4 font-heading">
                      Experiment Overview
                    </h3>
                    <p className="text-foreground/90 font-sans leading-relaxed">
                      {experiment.sections.introduction}
                    </p>
                  </div>
                )}

                {experiment.sections.prerequisites && experiment.sections.prerequisites.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-foreground underline decoration-[#ea580c] underline-offset-4 font-heading">
                      Prerequisites
                    </h3>
                    <ul className="list-disc list-outside pl-5 space-y-1.5 text-foreground/90 font-sans">
                      {experiment.sections.prerequisites.map((req, rIdx) => (
                        <li key={rIdx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Video Preview Card */}
                {experiment.sections.videoUrl && (
                  <div className="pt-4 border-t border-border/60">
                    <h3 className="text-base sm:text-lg font-bold text-foreground underline decoration-[#ea580c] underline-offset-4 mb-3 font-heading">
                      Video Concept Walkthrough
                    </h3>
                    <div className="aspect-video w-full max-w-2xl rounded-none bg-slate-950 border border-border overflow-hidden shadow-sm">
                      <iframe
                        src={experiment.sections.videoUrl}
                        title={experiment.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">Pedagogical Step 1 of 9</span>
                  <Button onClick={() => setActiveTab("theory")} className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold gap-1.5 shadow-xs rounded-none">
                    Next: Theory <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 2. THEORY (Screenshot 112558)                                  */}
            {/* ============================================================== */}
            {activeTab === "theory" && (
              <div className="space-y-8 max-w-4xl text-sm leading-relaxed">
                <h2 className="text-2xl sm:text-3xl font-normal text-[#0284c7] dark:text-[#38bdf8] font-sans">
                  {experiment.title}
                </h2>

                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-foreground underline decoration-[#ea580c] underline-offset-4 font-heading">
                    🔍 {experiment.title}
                  </h3>
                  <p className="text-foreground/90 font-sans leading-relaxed">
                    {experiment.sections.theory.overview}
                  </p>
                </div>

                {/* Key Concepts List */}
                {experiment.sections.theory.keyConcepts && experiment.sections.theory.keyConcepts.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-foreground underline decoration-[#ea580c] underline-offset-4 font-heading">
                      🔴 Key Concepts &amp; Invariants
                    </h3>
                    <div className="space-y-3 pl-1">
                      {experiment.sections.theory.keyConcepts.map((concept, cIdx) => (
                        <div key={cIdx} className="p-3.5 rounded-none border border-border bg-muted/20 space-y-1">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-[#0284c7]">
                            {cIdx + 1}. {concept.title}
                          </h4>
                          <p className="text-xs text-foreground/80 leading-relaxed font-sans">{concept.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Complexity Table */}
                {experiment.sections.theory.complexities && experiment.sections.theory.complexities.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-foreground underline decoration-[#ea580c] underline-offset-4 font-heading">
                      ⚡ Asymptotic Runtime &amp; Space Complexity
                    </h3>
                    <div className="overflow-x-auto rounded-none border border-border shadow-2xs">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-muted/60 border-b border-border font-bold text-foreground">
                          <tr>
                            <th className="py-2.5 px-4">Operation / Case</th>
                            <th className="py-2.5 px-4 text-emerald-600">Best Case</th>
                            <th className="py-2.5 px-4 text-amber-600">Average Case</th>
                            <th className="py-2.5 px-4 text-rose-600">Worst Case</th>
                            <th className="py-2.5 px-4 text-teal-600">Space Complexity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60 bg-card font-mono">
                          {experiment.sections.theory.complexities.map((comp, idx) => (
                            <tr key={idx} className="hover:bg-muted/30 transition-colors">
                              <td className="py-2.5 px-4 font-sans font-medium text-foreground">{comp.operation}</td>
                              <td className="py-2.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">{comp.best}</td>
                              <td className="py-2.5 px-4 font-bold text-amber-600 dark:text-amber-400">{comp.avg}</td>
                              <td className="py-2.5 px-4 font-bold text-rose-600 dark:text-rose-400">{comp.worst}</td>
                              <td className="py-2.5 px-4 text-teal-600 dark:text-teal-400">{comp.space}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Critical Conditions & Invariants */}
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-foreground underline decoration-[#ea580c] underline-offset-4 font-heading">
                    ⚠️ Critical Conditions &amp; Invariants
                  </h3>
                  <ul className="list-disc list-outside pl-5 space-y-1.5 text-foreground/90 font-sans">
                    <li>Boundary validation on empty, single-element, and maximum buffer sizes.</li>
                    <li>Pointer and memory integrity preservation across all transformation steps.</li>
                    <li>Hazard mitigation ensuring deterministic state propagation without race conditions.</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("aim")} className="text-xs gap-1 rounded-none">
                    <ChevronLeft className="h-4 w-4" /> Aim
                  </Button>
                  <Button onClick={() => setActiveTab("pretest")} className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold gap-1.5 shadow-xs rounded-none">
                    Next: Pretest <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 3. PRETEST (Screenshot 112615)                                 */}
            {/* ============================================================== */}
            {activeTab === "pretest" && (
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-normal text-[#0284c7] dark:text-[#38bdf8] font-sans">
                  {experiment.title}
                </h2>

                <ExperimentAssessmentView
                  type="pretest"
                  quiz={quiz}
                  experimentTitle={experiment.title}
                />

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("theory")} className="text-xs gap-1 rounded-none">
                    <ChevronLeft className="h-4 w-4" /> Theory
                  </Button>
                  <Button onClick={() => setActiveTab("procedure")} className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold gap-1.5 shadow-xs rounded-none">
                    Next: Procedure <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 4. PROCEDURE (Screenshot 112635)                               */}
            {/* ============================================================== */}
            {activeTab === "procedure" && (
              <div className="space-y-8 max-w-4xl text-sm leading-relaxed">
                <h2 className="text-2xl sm:text-3xl font-normal text-[#0284c7] dark:text-[#38bdf8] font-sans">
                  {experiment.title}
                </h2>

                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-foreground underline decoration-[#ea580c] underline-offset-4 font-heading flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#0284c7]" />
                    Simulation Instructions
                  </h3>
                  <p className="text-foreground/90 font-sans">
                    Follow the sequential steps below to configure inputs, observe dynamic transitions, and analyze outputs in the simulation workspace:
                  </p>
                </div>

                <div className="space-y-3 pl-1">
                  <div className="p-4 rounded-none bg-card border border-border shadow-2xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center h-5 w-5 rounded-none bg-[#0284c7]/10 text-[#0284c7] text-xs font-mono font-bold shrink-0">
                        1
                      </span>
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                        Step 1: Build Your Instruction Sequence / Configure Parameters
                      </h4>
                    </div>
                    <p className="text-xs text-foreground/80 pl-7 leading-relaxed font-sans">
                      Select target operations, destination registers (rd), and source registers (rs1, rs2). Add instructions to build your simulation sequence or choose preset parameters.
                    </p>
                  </div>

                  <div className="p-4 rounded-none bg-card border border-border shadow-2xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center h-5 w-5 rounded-none bg-[#0284c7]/10 text-[#0284c7] text-xs font-mono font-bold shrink-0">
                        2
                      </span>
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                        Step 2: Step Through Cycle-by-Cycle or Step-by-Step
                      </h4>
                    </div>
                    <p className="text-xs text-foreground/80 pl-7 leading-relaxed font-sans">
                      Advance simulation clock cycles using the Step button. Observe stage transitions across IF, ID, EX, MEM, and WB, inspecting data forwarding paths and hazard stalls.
                    </p>
                  </div>

                  <div className="p-4 rounded-none bg-card border border-border shadow-2xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center h-5 w-5 rounded-none bg-[#0284c7]/10 text-[#0284c7] text-xs font-mono font-bold shrink-0">
                        3
                      </span>
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                        Step 3: Analyze Pipeline / Data Structure State
                      </h4>
                    </div>
                    <p className="text-xs text-foreground/80 pl-7 leading-relaxed font-sans">
                      Verify output results, memory contents, execution throughput, and latency bounds against theoretical calculations.
                    </p>
                  </div>
                </div>

                {/* Sample Code Preview */}
                {experiment.sections.sampleCode?.code && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
                      Reference Code Implementation ({experiment.sections.sampleCode.language.toUpperCase()})
                    </h4>
                    <pre className="p-4 rounded-none bg-slate-950 text-slate-100 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed max-h-72">
                      <code>{experiment.sections.sampleCode.code}</code>
                    </pre>
                  </div>
                )}

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("pretest")} className="text-xs gap-1 rounded-none">
                    <ChevronLeft className="h-4 w-4" /> Pretest
                  </Button>
                  <Button onClick={() => setActiveTab("simulation")} className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold gap-1.5 shadow-xs rounded-none">
                    Next: Enter Simulation <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 5. SIMULATION (Screenshot 112701)                              */}
            {/* ============================================================== */}
            {activeTab === "simulation" && (
              <div className="space-y-8">
                <h2 className="text-2xl sm:text-3xl font-normal text-[#0284c7] dark:text-[#38bdf8] font-sans">
                  {experiment.title}
                </h2>

                {/* OFFICIAL GOVERNMENT INSTRUCTION STUDIO (Screenshot 112701) */}
                <Card className="border-border bg-card shadow-xs rounded-none">
                  <CardHeader className="py-3 border-b border-border/60 text-center bg-muted/20">
                    <h3 className="text-base font-bold text-foreground font-sans">
                      Build Instruction
                    </h3>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-6">
                    {/* Top Row: Instruction Dropdowns & Add Button */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-end">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground">Instruction</label>
                        <select
                          value={currOp}
                          onChange={(e) => setCurrOp(e.target.value)}
                          className="w-full h-9 px-2.5 text-xs bg-background border border-border rounded-none focus:outline-hidden focus:border-[#0284c7]"
                        >
                          {["ADD", "SUB", "MUL", "DIV", "AND", "OR", "LOAD", "STORE", "BEQ", "BNE"].map((op) => (
                            <option key={op} value={op}>{op}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground">Destination (rd)</label>
                        <select
                          value={currRd}
                          onChange={(e) => setCurrRd(e.target.value)}
                          className="w-full h-9 px-2.5 text-xs bg-background border border-border rounded-none focus:outline-hidden focus:border-[#0284c7]"
                        >
                          {["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"].map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground">Source 1 (rs1)</label>
                        <select
                          value={currRs1}
                          onChange={(e) => setCurrRs1(e.target.value)}
                          className="w-full h-9 px-2.5 text-xs bg-background border border-border rounded-none focus:outline-hidden focus:border-[#0284c7]"
                        >
                          {["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"].map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground">Source 2 (rs2)</label>
                        <select
                          value={currRs2}
                          onChange={(e) => setCurrRs2(e.target.value)}
                          className="w-full h-9 px-2.5 text-xs bg-background border border-border rounded-none focus:outline-hidden focus:border-[#0284c7]"
                        >
                          {["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"].map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <Button
                          type="button"
                          onClick={handleAddPipelineInstruction}
                          className="w-full h-9 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold gap-1 rounded-none shadow-xs"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add Instruction</span>
                        </Button>
                      </div>
                    </div>

                    {/* Middle 2 Columns: Sequence List vs Latencies Table */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-border/60">
                      {/* Left Column: Instruction Sequence & Data Forwarding */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-sans">
                            Instruction Sequence ({pipelineInstructions.length})
                          </h4>
                          <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-foreground">
                            <input
                              type="checkbox"
                              checked={dataForwarding}
                              onChange={(e) => setDataForwarding(e.target.checked)}
                              className="accent-[#0284c7] rounded-none cursor-pointer"
                            />
                            <span>⇄ Data Forwarding</span>
                          </label>
                        </div>

                        <div className="border border-border rounded-none bg-muted/20 p-2 space-y-1.5 min-h-[120px] max-h-48 overflow-y-auto">
                          {pipelineInstructions.map((inst, idx) => (
                            <div
                              key={inst.id}
                              className="flex items-center justify-between px-3 py-1.5 bg-card border border-border text-xs font-mono rounded-none shadow-2xs"
                            >
                              <span className="font-bold text-foreground">
                                {idx + 1}. {inst.op} {inst.rd}, {inst.rs1}, {inst.rs2}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemovePipelineInstruction(inst.id)}
                                className="text-muted-foreground hover:text-rose-600 transition-colors cursor-pointer"
                                title="Delete Instruction"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                          {pipelineInstructions.length === 0 && (
                            <div className="p-4 text-center text-xs text-muted-foreground">
                              No instructions added. Use the controls above to add instructions.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Column: Instruction Latencies Inputs */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-sans">
                          ⚙ Instruction Latencies (Cycles)
                        </h4>
                        <div className="border border-border rounded-none bg-muted/20 p-3">
                          <div className="grid grid-cols-5 gap-2 text-center text-xs">
                            <div className="space-y-1">
                              <span className="font-bold text-foreground">IF</span>
                              <input
                                type="number"
                                min={1}
                                max={5}
                                value={latencies.IF}
                                onChange={(e) => setLatencies({ ...latencies, IF: parseInt(e.target.value) || 1 })}
                                className="w-full text-center h-8 bg-background border border-border rounded-none text-xs font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="font-bold text-foreground">ID</span>
                              <input
                                type="number"
                                min={1}
                                max={5}
                                value={latencies.ID}
                                onChange={(e) => setLatencies({ ...latencies, ID: parseInt(e.target.value) || 1 })}
                                className="w-full text-center h-8 bg-background border border-border rounded-none text-xs font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="font-bold text-foreground">EX</span>
                              <input
                                type="number"
                                min={1}
                                max={5}
                                value={latencies.EX}
                                onChange={(e) => setLatencies({ ...latencies, EX: parseInt(e.target.value) || 1 })}
                                className="w-full text-center h-8 bg-background border border-border rounded-none text-xs font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="font-bold text-foreground">MEM</span>
                              <input
                                type="number"
                                min={1}
                                max={5}
                                value={latencies.MEM}
                                onChange={(e) => setLatencies({ ...latencies, MEM: parseInt(e.target.value) || 1 })}
                                className="w-full text-center h-8 bg-background border border-border rounded-none text-xs font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="font-bold text-foreground">WB</span>
                              <input
                                type="number"
                                min={1}
                                max={5}
                                value={latencies.WB}
                                onChange={(e) => setLatencies({ ...latencies, WB: parseInt(e.target.value) || 1 })}
                                className="w-full text-center h-8 bg-background border border-border rounded-none text-xs font-mono"
                              />
                            </div>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-2">
                            Pipelined stage delays for ALU execution and memory operations.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/60">
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          onClick={handleRunPipeline}
                          disabled={isPipelineRunning || pipelineInstructions.length === 0}
                          className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold gap-1.5 h-8 px-4 rounded-none shadow-xs"
                        >
                          <PlayCircle className="h-3.5 w-3.5" />
                          <span>{isPipelineRunning ? "Simulating..." : "Simulate Pipeline Execution"}</span>
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleStepPipeline}
                          disabled={isPipelineRunning}
                          className="text-xs font-semibold gap-1.5 h-8 px-3 rounded-none"
                        >
                          <StepForward className="h-3.5 w-3.5" />
                          <span>Step Clock Cycle</span>
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleResetPipeline}
                          className="text-xs font-semibold gap-1.5 h-8 px-3 rounded-none"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Reset</span>
                        </Button>
                      </div>

                      <Badge variant="outline" className="text-xs font-mono rounded-none">
                        Clock Cycle: CC{pipelineClockCycle}
                      </Badge>
                    </div>

                    {/* Pipeline Space-Time Timing Diagram */}
                    {pipelineClockCycle > 0 && (
                      <div className="space-y-2 pt-2 border-t border-border/60 overflow-x-auto">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
                          Pipeline Space-Time Diagram (Clock Cycles vs Stages)
                        </h4>
                        <table className="w-full text-center text-xs border-collapse font-mono border border-border">
                          <thead>
                            <tr className="bg-muted/60 border-b border-border text-foreground font-bold">
                              <th className="py-2 px-3 text-left">Instruction</th>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                                <th
                                  key={c}
                                  className={`py-2 px-2.5 ${pipelineClockCycle === c ? "bg-[#0284c7] text-white" : ""}`}
                                >
                                  CC{c}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60 bg-card">
                            {pipelineInstructions.map((inst, iIdx) => {
                              const stages = ["IF", "ID", "EX", "MEM", "WB"];
                              const startCycle = iIdx + 1;
                              return (
                                <tr key={inst.id} className="hover:bg-muted/20">
                                  <td className="py-2 px-3 text-left font-semibold text-foreground whitespace-nowrap">
                                    I{iIdx + 1}: {inst.op} {inst.rd}
                                  </td>
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => {
                                    const stageIdx = c - startCycle;
                                    const stage = stageIdx >= 0 && stageIdx < stages.length ? stages[stageIdx] : null;
                                    const isReached = c <= pipelineClockCycle;
                                    return (
                                      <td key={c} className="py-2 px-2 font-bold">
                                        {stage && isReached ? (
                                          <span
                                            className={`px-1.5 py-0.5 text-[10px] rounded-none ${
                                              stage === "IF"
                                                ? "bg-sky-500/20 text-[#0284c7]"
                                                : stage === "ID"
                                                ? "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400"
                                                : stage === "EX"
                                                ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                                                : stage === "MEM"
                                                ? "bg-purple-500/20 text-purple-600 dark:text-purple-400"
                                                : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                            }`}
                                          >
                                            {stage}
                                          </span>
                                        ) : (
                                          <span className="text-muted-foreground/30">-</span>
                                        )}
                                      </td>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Specific Visualizer Engine or Interactive Workbench */}
                <div className="p-4 sm:p-6 rounded-none bg-card border border-border shadow-sm">
                  {experiment.labId === "dbms-lab" ? (
                    <SqlCompiler
                      title={experiment.title}
                      subtitle="Interactive Relational Schema & SQL Query Simulation Studio"
                      initialSql={experiment.sections.sampleCode.code}
                      currentExperimentId={experiment.id}
                    />
                  ) : experiment.simulator === "stack" ? (
                    <StackVisualizer content={<p>Java Stack LIFO simulation sandbox.</p>} />
                  ) : experiment.simulator === "queue" ? (
                    <QueueVisualizer content={<p>Java Queue FIFO simulation sandbox.</p>} />
                  ) : experiment.simulator === "linked-list" ? (
                    <LinkedListVisualizer content={<p>Java Singly Linked List dynamic pointer visualizer.</p>} />
                  ) : experiment.simulator === "bubble-sort" ? (
                    <SortingVisualizer
                      algorithm="bubble"
                      title="Bubble Sort Simulation (Java)"
                      description="Observe adjacent comparison passes and bubbling of maximum unsorted values."
                    />
                  ) : experiment.simulator === "selection-sort" ? (
                    <SortingVisualizer
                      algorithm="selection"
                      title="Selection Sort Simulation (Java)"
                      description="Observe minimum index scanning across unsorted partition and minimal memory swaps."
                    />
                  ) : experiment.simulator === "insertion-sort" ? (
                    <SortingVisualizer
                      algorithm="insertion"
                      title="Insertion Sort Simulation (Java)"
                      description="Observe element extraction, backward shifting, and adaptive linear performance."
                    />
                  ) : (
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/50">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Terminal className="h-5 w-5 text-[#0284c7]" />
                            <h3 className="font-bold text-base text-foreground font-heading">
                              {experiment.title} Interactive Simulation Sandbox
                            </h3>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Execute step-by-step algorithm trace, inspect memory state transitions, and verify outputs.
                          </p>
                        </div>
                        <Button
                          onClick={handleRunSimulation}
                          disabled={isSimulating}
                          className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold gap-2 shadow-xs rounded-none"
                        >
                          {isSimulating ? (
                            <>
                              <span className="w-3 h-3 rounded-none border-2 border-white/30 border-t-white animate-spin" />
                              <span>Simulating Execution...</span>
                            </>
                          ) : (
                            <>
                              <PlayCircle className="h-4 w-4" />
                              <span>Run Simulation Sandbox</span>
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Procedure Checklist & Console */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3 p-4 rounded-none bg-muted/30 border border-border/60">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0284c7] font-mono flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4" /> Execution Procedure Steps
                          </h4>
                          <div className="space-y-2">
                            {experiment.sections.procedure.map((step, sIdx) => (
                              <div key={sIdx} className="p-2.5 rounded-none bg-card border border-border/50 text-xs text-muted-foreground flex items-start gap-2">
                                <span className="flex items-center justify-center h-4 w-4 rounded-none bg-[#0284c7]/10 text-[#0284c7] text-[10px] font-bold shrink-0 mt-0.5 font-mono">
                                  {sIdx + 1}
                                </span>
                                <span className="leading-snug">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Live Output Terminal */}
                        <div className="space-y-3 p-4 rounded-none bg-slate-950 text-slate-100 border border-slate-800 shadow-inner flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse" />
                                Simulation Console Stream
                              </span>
                              <Badge variant="outline" className="text-[10px] font-mono border-slate-700 text-slate-300 rounded-none">
                                {experiment.sections.sampleCode.language.toUpperCase()} ENGINE
                              </Badge>
                            </div>
                            <pre className="font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto p-2 bg-black/40 rounded-none">
                              {simOutput || experiment.sections.expectedOutput}
                            </pre>
                          </div>

                          <div className="pt-2 text-[10px] text-slate-500 font-mono flex items-center justify-between border-t border-slate-800/60">
                            <span>Status: 0 Errors | Memory Verified</span>
                            <span>State: READY</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recursion / Call Stack Panel if preset exists */}
                {experiment.sections.recursionPreset && (
                  <div className="pt-4 border-t border-border/60">
                    <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-indigo-400" />
                      Call Stack &amp; Recursion Tree Inspector
                    </h3>
                    <RecursionVisualizerPanel
                      initialCode={experiment.sections.recursionPreset.javaCode}
                      functionName={experiment.sections.recursionPreset.functionName}
                      sampleCall={experiment.sections.recursionPreset.sampleCall}
                      description={experiment.sections.recursionPreset.description}
                    />
                  </div>
                )}

                {/* LeetCode Practice Cards */}
                {experiment.sections.leetcodeProblems && experiment.sections.leetcodeProblems.length > 0 && (
                  <div className="pt-4 border-t border-border/60">
                    <LeetCodePracticeCard problems={experiment.sections.leetcodeProblems} />
                  </div>
                )}

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("procedure")} className="text-xs gap-1 rounded-none">
                    <ChevronLeft className="h-4 w-4" /> Procedure
                  </Button>
                  <Button onClick={() => setActiveTab("posttest")} className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold gap-1.5 shadow-xs rounded-none">
                    Next: Posttest <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 6. POSTTEST (Screenshot 112742)                                */}
            {/* ============================================================== */}
            {activeTab === "posttest" && (
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-normal text-[#0284c7] dark:text-[#38bdf8] font-sans">
                  {experiment.title}
                </h2>

                <ExperimentAssessmentView
                  type="posttest"
                  quiz={quiz}
                  experimentTitle={experiment.title}
                  onComplete={(score, total) => {
                    if (score / total >= 0.7) {
                      markExperimentComplete(experiment.id);
                    }
                  }}
                />

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("simulation")} className="text-xs gap-1 rounded-none">
                    <ChevronLeft className="h-4 w-4" /> Simulation
                  </Button>
                  <Button onClick={() => setActiveTab("references")} className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold gap-1.5 shadow-xs rounded-none">
                    Next: References <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 7. REFERENCES (Screenshot 112757)                              */}
            {/* ============================================================== */}
            {activeTab === "references" && (
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-normal text-[#0284c7] dark:text-[#38bdf8] font-sans">
                  {experiment.title}
                </h2>

                <ExperimentReferences
                  defaultTopic={experiment.title}
                  defaultVideoUrl={experiment.sections.videoUrl}
                />

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("posttest")} className="text-xs gap-1 rounded-none">
                    <ChevronLeft className="h-4 w-4" /> Posttest
                  </Button>
                  <Button onClick={() => setActiveTab("contributors")} className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold gap-1.5 shadow-xs rounded-none">
                    Next: Contributors <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 8. CONTRIBUTORS (Screenshot 112821)                            */}
            {/* ============================================================== */}
            {activeTab === "contributors" && (
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-normal text-[#0284c7] dark:text-[#38bdf8] font-sans">
                  {experiment.title}
                </h2>

                <ExperimentContributors labInstitute={lab?.institute} />

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("references")} className="text-xs gap-1 rounded-none">
                    <ChevronLeft className="h-4 w-4" /> References
                  </Button>
                  <Button onClick={() => setActiveTab("feedback")} className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold gap-1.5 shadow-xs rounded-none">
                    Next: Feedback <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 9. FEEDBACK (Screenshot 112841)                                */}
            {/* ============================================================== */}
            {activeTab === "feedback" && (
              <div className="space-y-6 max-w-4xl text-sm leading-relaxed">
                <h2 className="text-2xl sm:text-3xl font-normal text-[#0284c7] dark:text-[#38bdf8] font-sans">
                  {experiment.title}
                </h2>

                <div className="space-y-4 font-sans text-foreground">
                  <h3 className="text-base sm:text-lg font-bold text-foreground underline decoration-[#ea580c] underline-offset-4 font-heading">
                    Feedback
                  </h3>
                  <p className="font-bold text-foreground">Dear User,</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Thanks for using Virtual Labs. Your opinion is valuable to us. To help us improve, we&apos;d like to ask you a few questions about your experience. It will only take 3 minutes and your answers will help us make Virtual Labs better for you and other users.
                  </p>

                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsShareModalOpen(true)}
                      className="h-9 px-4 text-xs font-semibold rounded-none border-[#0284c7] text-[#0284c7] hover:bg-[#0284c7]/10"
                    >
                      Share Your Experience
                    </Button>
                  </div>

                  <div className="pt-2 text-foreground space-y-0.5">
                    <p>Thanks for your time !</p>
                    <p className="font-bold underline decoration-[#0284c7] underline-offset-4">
                      The Virtual Labs Team
                    </p>
                  </div>
                </div>

                {/* Dialog Modal for Share Your Experience matching Screenshot 112841 */}
                <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
                  <DialogContent className="max-w-md rounded-none p-6">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-bold font-heading">Share Your Experience</DialogTitle>
                      <DialogDescription className="text-xs text-muted-foreground">
                        Help us improve Virtual Labs for all students and faculty.
                      </DialogDescription>
                    </DialogHeader>

                    {feedbackSubmitted ? (
                      <div className="py-6 text-center space-y-2 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-10 w-10 mx-auto animate-bounce" />
                        <p className="font-bold text-sm">Thank you for your feedback!</p>
                        <p className="text-xs text-muted-foreground">— The Virtual Labs Team</p>
                      </div>
                    ) : (
                      <form onSubmit={handleFeedbackSubmit} className="space-y-4 pt-2">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold">Laboratory Rating (1 - 5 Stars)</label>
                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setUserRating(s)}
                                className={`h-8 w-8 rounded-none text-xs font-bold border transition-all cursor-pointer ${
                                  s === userRating
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
                          <label className="text-xs font-semibold">Your Review &amp; Suggestions</label>
                          <Textarea
                            value={feedbackComment}
                            onChange={(e) => setFeedbackComment(e.target.value)}
                            placeholder="Type your feedback here regarding simulations or curriculum preparation..."
                            rows={4}
                            className="text-xs rounded-none"
                            required
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="rounded-none"
                            onClick={() => setIsShareModalOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" size="sm" className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold gap-1.5 shadow-xs rounded-none">
                            <Send className="h-3.5 w-3.5" /> Submit Experience
                          </Button>
                        </div>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
