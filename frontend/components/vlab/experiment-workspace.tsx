"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Experiment, EXPERIMENTS_DATA } from "@/data/experiments";
import { QUIZZES_DATA } from "@/data/quizzes";
import { useStudentProgress } from "@/hooks/use-student-progress";

// Visualizer imports
import { StackVisualizer } from "@/components/visualizer/stack/stack-visualizer";
import { QueueVisualizer } from "@/components/visualizer/queue/queue-visualizer";
import { LinkedListVisualizer } from "@/components/visualizer/linked-list/linked-list-visualizer";
import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer";
import { RecursionVisualizerPanel } from "@/components/visualizer/recursion/recursion-visualizer-panel";
import { LeetCodePracticeCard } from "@/components/vlab/leetcode-practice-card";
import { QuizEngine } from "@/components/quiz/quiz-engine";

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Video,
  PlayCircle,
  Code2,
  Trophy,
  MessageSquareHeart,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  CheckCircle2,
  Cpu,
  Layers,
  BookOpen,
  Send,
  Sparkles
} from "lucide-react";

interface ExperimentWorkspaceProps {
  experiment: Experiment;
}

export function ExperimentWorkspace({ experiment }: ExperimentWorkspaceProps) {
  const { progress, saveFeedback } = useStudentProgress();
  const [activeTab, setActiveTab] = useState<string>("video-concept");
  const [userRating, setUserRating] = useState<number>(5);
  const [feedbackComment, setFeedbackComment] = useState<string>("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  const quiz = QUIZZES_DATA[experiment.quizId];
  const isCompleted = progress.completedExperiments.includes(experiment.id);

  // Find prev and next experiments
  const currentIndex = EXPERIMENTS_DATA.findIndex((e) => e.id === experiment.id);
  const prevExp = currentIndex > 0 ? EXPERIMENTS_DATA[currentIndex - 1] : null;
  const nextExp = currentIndex < EXPERIMENTS_DATA.length - 1 ? EXPERIMENTS_DATA[currentIndex + 1] : null;

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackComment.trim()) {
      alert("Please provide a short comment with your rating.");
      return;
    }
    saveFeedback(experiment.id, userRating, feedbackComment);
    setFeedbackSubmitted(true);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/labs" className="hover:text-primary transition-colors">Virtual Labs</Link>
            <span>/</span>
            <Link href={`/labs/${experiment.labId}`} className="hover:text-primary transition-colors">
              {experiment.labId === "data-structures" ? "Data Structures Lab (Java)" : "AI & ML Lab"}
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">{experiment.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight font-heading">
              {experiment.title}
            </h1>
            {isCompleted && (
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 gap-1 text-xs">
                <CheckCircle2 className="h-3.5 w-3.5" /> Completed
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-semibold font-mono">
              Java DSA
            </Badge>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {experiment.estimatedMinutes} mins
            </span>
            <span>•</span>
            <Badge variant="outline" className="text-[11px] font-medium">
              {experiment.difficulty}
            </Badge>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="h-3.5 w-3.5 fill-current" /> {experiment.rating} ({experiment.ratingsCount} verified reviews)
            </span>
          </div>
        </div>

        {/* Prev / Next navigation buttons */}
        <div className="flex items-center gap-2">
          {prevExp && (
            <Button asChild variant="outline" size="sm" className="gap-1 text-xs">
              <Link href={`/experiments/${prevExp.slug}`}>
                <ChevronLeft className="h-4 w-4" /> Prev Exp
              </Link>
            </Button>
          )}
          {nextExp && (
            <Button asChild variant="outline" size="sm" className="gap-1 text-xs">
              <Link href={`/experiments/${nextExp.slug}`}>
                Next Exp <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* 4 CORE PART WORKSPACE TABS */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full p-1 bg-muted/60 backdrop-blur-md rounded-xl border border-border h-auto gap-1">
          <TabsTrigger value="video-concept" className="text-xs py-2.5 gap-1.5 font-bold">
            <Video className="h-4 w-4 text-blue-500" /> Part 1: Video Tutorial &amp; Theory
          </TabsTrigger>
          <TabsTrigger value="simulation" className="text-xs py-2.5 gap-1.5 font-bold text-primary">
            <PlayCircle className="h-4 w-4 text-primary" /> Part 2: Interactive Simulator
          </TabsTrigger>
          <TabsTrigger value="recursion-trace" className="text-xs py-2.5 gap-1.5 font-bold text-indigo-400">
            <Code2 className="h-4 w-4 text-indigo-400" /> Part 3: Java Code &amp; Call Stack
          </TabsTrigger>
          <TabsTrigger value="leetcode-quiz" className="text-xs py-2.5 gap-1.5 font-bold text-amber-500">
            <Trophy className="h-4 w-4 text-amber-500" /> Part 4: LeetCode &amp; Quiz
          </TabsTrigger>
          <TabsTrigger value="feedback" className="text-xs py-2.5 gap-1.5 font-semibold">
            <MessageSquareHeart className="h-4 w-4 text-rose-400" /> Lab Feedback
          </TabsTrigger>
        </TabsList>

        {/* ============================================================== */}
        {/* PART 1: VIDEO TUTORIAL & TECHNICAL THEORY */}
        {/* ============================================================== */}
        <TabsContent value="video-concept" className="space-y-6">
          {/* Targeted YouTube Video Embed Frame */}
          <Card className="border-border bg-card/90 overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
              {/* Left 7 Cols: Video Player */}
              <div className="lg:col-span-7 space-y-3">
                <div className="aspect-video w-full rounded-xl bg-slate-950 border border-border overflow-hidden shadow-md">
                  <iframe
                    src={experiment.sections.videoUrl || "https://www.youtube-nocookie.com/embed/zWg7U0OEAoE"}
                    title={experiment.sections.videoTitle}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{experiment.sections.videoTitle}</span>
                  <Badge variant="outline" className="text-[10px]">{experiment.sections.videoChannel}</Badge>
                </div>
              </div>

              {/* Right 5 Cols: Overview & Objectives */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                    Concept &amp; Objectives
                  </Badge>
                  <h3 className="text-xl font-bold text-foreground font-heading">
                    {experiment.title} Overview
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {experiment.sections.introduction}
                  </p>

                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                      Learning Objective
                    </span>
                    <p className="text-xs text-foreground font-medium leading-relaxed">
                      {experiment.sections.objective}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-muted/40 rounded-xl border border-border/50 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase font-bold text-muted-foreground">
                    Required Prerequisites
                  </span>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {experiment.sections.prerequisites.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Theory, Complexities & Applications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 border-border bg-card/80 p-6 space-y-4">
              <CardTitle className="text-lg font-bold font-heading">
                Technical Principles &amp; Asymptotic Complexity
              </CardTitle>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {experiment.sections.theory.overview}
              </p>

              {/* Key Concept Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {experiment.sections.theory.keyConcepts.map((concept, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-border bg-muted/20 space-y-1">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-primary">
                      {concept.title}
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">{concept.desc}</p>
                  </div>
                ))}
              </div>

              {/* Complexity Table */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase text-foreground">
                  Asymptotic Runtime Complexity Summary
                </span>
                <div className="border border-border rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-muted/60 text-muted-foreground border-b border-border">
                      <tr>
                        <th className="p-2.5 font-semibold">Case / Operation</th>
                        <th className="p-2.5 font-semibold">Best</th>
                        <th className="p-2.5 font-semibold">Average</th>
                        <th className="p-2.5 font-semibold">Worst</th>
                        <th className="p-2.5 font-semibold">Space</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50 font-mono">
                      {experiment.sections.theory.complexities.map((c, idx) => (
                        <tr key={idx} className="hover:bg-muted/20">
                          <td className="p-2.5 font-sans font-medium text-foreground">{c.operation}</td>
                          <td className="p-2.5 text-emerald-500 font-bold">{c.best}</td>
                          <td className="p-2.5 text-amber-500 font-bold">{c.avg}</td>
                          <td className="p-2.5 text-rose-500 font-bold">{c.worst}</td>
                          <td className="p-2.5 text-teal-500">{c.space}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>

            {/* Real World Applications */}
            <Card className="border-border bg-card/80 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <CardTitle className="text-lg font-bold font-heading flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  <span>Engineering Impact</span>
                </CardTitle>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Real-world software engineering domains where this data structure or algorithm is utilized:
                </p>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {experiment.sections.theory.realWorldApplications.map((app, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-muted/30 border border-border/50">
                      <span className="text-primary font-bold">•</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button onClick={() => setActiveTab("simulation")} className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold gap-1.5 mt-4">
                <PlayCircle className="h-4 w-4" /> Open Interactive Simulator
              </Button>
            </Card>
          </div>
        </TabsContent>

        {/* ============================================================== */}
        {/* PART 2: INTERACTIVE JAVA DSA SIMULATOR */}
        {/* ============================================================== */}
        <TabsContent value="simulation" className="space-y-6">
          <div className="p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-border shadow-sm">
            {experiment.simulator === "stack" && (
              <StackVisualizer content={<p>Java Stack LIFO simulation sandbox.</p>} />
            )}
            {experiment.simulator === "queue" && (
              <QueueVisualizer content={<p>Java Queue FIFO simulation sandbox.</p>} />
            )}
            {experiment.simulator === "linked-list" && (
              <LinkedListVisualizer content={<p>Java Singly Linked List dynamic pointer visualizer.</p>} />
            )}
            {experiment.simulator === "bubble-sort" && (
              <SortingVisualizer
                algorithm="bubble"
                title="Bubble Sort Simulation (Java)"
                description="Observe adjacent comparison passes and bubbling of maximum unsorted values."
              />
            )}
            {experiment.simulator === "selection-sort" && (
              <SortingVisualizer
                algorithm="selection"
                title="Selection Sort Simulation (Java)"
                description="Observe minimum index scanning across unsorted partition and minimal memory swaps."
              />
            )}
            {experiment.simulator === "insertion-sort" && (
              <SortingVisualizer
                algorithm="insertion"
                title="Insertion Sort Simulation (Java)"
                description="Observe element extraction, backward shifting, and adaptive linear performance."
              />
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/60">
            <Button variant="outline" onClick={() => setActiveTab("video-concept")} className="text-xs gap-1.5">
              <ChevronLeft className="h-4 w-4" /> Back to Video &amp; Theory
            </Button>
            <Button onClick={() => setActiveTab("recursion-trace")} className="bg-primary hover:bg-primary/90 text-white text-xs gap-1.5 font-bold">
              <Code2 className="h-4 w-4" /> Next: Java Code &amp; Call Stack Trace <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* ============================================================== */}
        {/* PART 3: JAVA CODE & RECURSION CALL STACK TRACE */}
        {/* ============================================================== */}
        <TabsContent value="recursion-trace" className="space-y-6">
          <RecursionVisualizerPanel
            initialCode={experiment.sections.recursionPreset?.javaCode || experiment.sections.sampleCode.code}
            functionName={experiment.sections.recursionPreset?.functionName}
            sampleCall={experiment.sections.recursionPreset?.sampleCall}
            description={experiment.sections.recursionPreset?.description}
          />

          <div className="flex items-center justify-between pt-4 border-t border-border/60">
            <Button variant="outline" onClick={() => setActiveTab("simulation")} className="text-xs gap-1.5">
              <ChevronLeft className="h-4 w-4" /> Back to Simulator
            </Button>
            <Button onClick={() => setActiveTab("leetcode-quiz")} className="bg-primary hover:bg-primary/90 text-white text-xs gap-1.5 font-bold">
              <Trophy className="h-4 w-4" /> Next: LeetCode &amp; Self-Assessment <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* ============================================================== */}
        {/* PART 4: LEETCODE CHALLENGES & SELF-ASSESSMENT QUIZ */}
        {/* ============================================================== */}
        <TabsContent value="leetcode-quiz" className="space-y-8">
          {/* Top: Curated LeetCode Problem Cards */}
          <LeetCodePracticeCard problems={experiment.sections.leetcodeProblems} />

          {/* Bottom: Interactive Quiz Engine */}
          <div className="space-y-4 pt-4 border-t border-border/60">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground font-heading">
                  Self-Assessment Evaluation Quiz
                </h3>
                <p className="text-xs text-muted-foreground">
                  Verify your comprehension with instant scoring and rationale explanations.
                </p>
              </div>
              <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
                Passing Score: 75%
              </Badge>
            </div>

            {quiz ? (
              <QuizEngine quiz={quiz} />
            ) : (
              <Card className="border-border p-6 text-center text-muted-foreground text-xs">
                Quiz questions loading for this experiment...
              </Card>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/60">
            <Button variant="outline" onClick={() => setActiveTab("recursion-trace")} className="text-xs gap-1.5">
              <ChevronLeft className="h-4 w-4" /> Back to Java Code &amp; Call Stack
            </Button>
            <Button onClick={() => setActiveTab("feedback")} className="text-xs gap-1.5">
              Share Laboratory Feedback <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* ============================================================== */}
        {/* LAB FEEDBACK TAB */}
        {/* ============================================================== */}
        <TabsContent value="feedback" className="space-y-6 max-w-2xl mx-auto">
          <Card className="border-border bg-card/90 backdrop-blur-xs shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold font-heading">Laboratory Evaluation &amp; Review</CardTitle>
              <CardDescription className="text-xs">
                Your feedback helps our faculty refine virtual laboratory animations and instructional notes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {feedbackSubmitted ? (
                <div className="p-6 text-center space-y-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-500">
                  <CheckCircle2 className="h-8 w-8 mx-auto" />
                  <h4 className="font-bold text-base">Thank You for Your Feedback!</h4>
                  <p className="text-xs text-muted-foreground">
                    Your rating of {userRating}/5 stars and review has been saved to your student learning record.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setFeedbackSubmitted(false)} className="text-xs mt-2">
                    Submit Another Response
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold">How would you rate this experiment simulation?</label>
                    <div className="flex items-center gap-2 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setUserRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= userRating ? "text-amber-500 fill-amber-500" : "text-muted"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-muted-foreground ml-2">({userRating} out of 5 stars)</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold">Your Comments / Suggestions</label>
                    <Textarea
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      placeholder="Share your experience with the Java visualizer, call stack frames, or theory explanations..."
                      rows={4}
                      className="text-xs"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold gap-1.5">
                    <Send className="h-3.5 w-3.5" /> Submit Evaluation
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
