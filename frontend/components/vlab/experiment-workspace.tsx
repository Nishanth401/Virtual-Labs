"use client";

import { useState } from "react";
import Link from "next/link";
import { Experiment, EXPERIMENTS_DATA } from "@/data/experiments";
import { QUIZZES_DATA } from "@/data/quizzes";
import { useStudentProgress } from "@/hooks/use-student-progress";

// Visualizer imports
import { StackVisualizer } from "@/components/visualizer/stack/stack-visualizer";
import { QueueVisualizer } from "@/components/visualizer/queue/queue-visualizer";
import { LinkedListVisualizer } from "@/components/visualizer/linked-list/linked-list-visualizer";
import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer";
import { QuizEngine } from "@/components/quiz/quiz-engine";

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  Target,
  FileText,
  PlayCircle,
  Award,
  MessageSquareHeart,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Send
} from "lucide-react";

interface ExperimentWorkspaceProps {
  experiment: Experiment;
}

export function ExperimentWorkspace({ experiment }: ExperimentWorkspaceProps) {
  const { progress, saveFeedback } = useStudentProgress();
  const [activeTab, setActiveTab] = useState<string>("introduction");
  const [userRating, setUserRating] = useState<number>(5);
  const [feedbackComment, setFeedbackComment] = useState<string>("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  const quiz = QUIZZES_DATA[experiment.quizId];
  const isCompleted = progress.completedExperiments.includes(experiment.id);
  const pastScore = progress.quizAttempts[experiment.id];

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/50 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/labs" className="hover:text-primary transition-colors">Labs</Link>
            <span>/</span>
            <Link href="/labs/data-structures" className="hover:text-primary transition-colors">Data Structures</Link>
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
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {experiment.estimatedMinutes} mins
            </span>
            <span>•</span>
            <Badge variant="outline" className="text-[11px] font-medium">
              {experiment.difficulty}
            </Badge>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="h-3.5 w-3.5 fill-current" /> {experiment.rating} ({experiment.ratingsCount} reviews)
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

      {/* Main Educational Multi-Tab Layout */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList className="grid grid-cols-3 sm:grid-cols-7 w-full p-1 bg-muted/60 backdrop-blur-md rounded-xl border border-border/50 h-auto">
          <TabsTrigger value="introduction" className="text-xs py-2 gap-1.5">
            <BookOpen className="h-3.5 w-3.5" /> Introduction
          </TabsTrigger>
          <TabsTrigger value="objective" className="text-xs py-2 gap-1.5">
            <Target className="h-3.5 w-3.5" /> Objective
          </TabsTrigger>
          <TabsTrigger value="theory" className="text-xs py-2 gap-1.5">
            <FileText className="h-3.5 w-3.5" /> Theory
          </TabsTrigger>
          <TabsTrigger value="procedure" className="text-xs py-2 gap-1.5">
            <Layers className="h-3.5 w-3.5" /> Procedure
          </TabsTrigger>
          <TabsTrigger value="simulation" className="text-xs py-2 gap-1.5 font-bold text-primary">
            <PlayCircle className="h-3.5 w-3.5" /> Simulation
          </TabsTrigger>
          <TabsTrigger value="quiz" className="text-xs py-2 gap-1.5">
            <Award className="h-3.5 w-3.5" /> Self-Assessment
          </TabsTrigger>
          <TabsTrigger value="feedback" className="text-xs py-2 gap-1.5">
            <MessageSquareHeart className="h-3.5 w-3.5" /> Feedback
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: INTRODUCTION */}
        <TabsContent value="introduction" className="space-y-6">
          <Card className="border-secondary/40 bg-card/60 backdrop-blur-xs shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold font-heading">Experiment Introduction & Background</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              <p className="text-base text-foreground font-medium">
                {experiment.sections.introduction}
              </p>

              {/* Prerequisites Card */}
              <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-primary">
                  Required Prerequisites
                </h4>
                <ul className="space-y-1 text-xs">
                  {experiment.sections.prerequisites.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <Button onClick={() => setActiveTab("objective")} className="text-xs gap-1.5">
                  Proceed to Learning Objectives <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: OBJECTIVE */}
        <TabsContent value="objective" className="space-y-6">
          <Card className="border-secondary/40 bg-card/60 backdrop-blur-xs shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold font-heading">Learning Objectives & Target Audience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-foreground">
                <strong className="text-primary block text-xs uppercase tracking-wider mb-1">Primary Objective</strong>
                <p className="text-sm font-medium">{experiment.sections.objective}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">
                    Undergraduate (UG) Alignment
                  </h4>
                  <ul className="space-y-1 text-xs">
                    {experiment.sections.targetAudience.ug.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">
                    Postgraduate & Competitive Alignment
                  </h4>
                  <ul className="space-y-1 text-xs">
                    {experiment.sections.targetAudience.pg.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <Button variant="outline" onClick={() => setActiveTab("introduction")} className="text-xs gap-1.5">
                  <ChevronLeft className="h-4 w-4" /> Back to Introduction
                </Button>
                <Button onClick={() => setActiveTab("theory")} className="text-xs gap-1.5">
                  Explore Theory & Formulas <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: THEORY */}
        <TabsContent value="theory" className="space-y-6">
          <Card className="border-secondary/40 bg-card/60 backdrop-blur-xs shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold font-heading">Technical Theory & Core Principles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              <p className="text-foreground text-sm font-medium">
                {experiment.sections.theory.overview}
              </p>

              {/* Key Concept Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experiment.sections.theory.keyConcepts.map((concept, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1.5">
                    <h5 className="font-bold text-foreground text-xs uppercase tracking-wider text-primary">
                      {concept.title}
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">{concept.desc}</p>
                  </div>
                ))}
              </div>

              {/* Asymptotic Complexities Table */}
              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">
                  Asymptotic Time & Space Complexity Summary
                </h4>
                <div className="border border-border/60 rounded-xl overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/60 text-muted-foreground border-b border-border/60">
                      <tr>
                        <th className="p-3 font-semibold">Operation / Case</th>
                        <th className="p-3 font-semibold">Best Case</th>
                        <th className="p-3 font-semibold">Average Case</th>
                        <th className="p-3 font-semibold">Worst Case</th>
                        <th className="p-3 font-semibold">Auxiliary Space</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40 font-mono">
                      {experiment.sections.theory.complexities.map((comp, idx) => (
                        <tr key={idx} className="hover:bg-muted/20">
                          <td className="p-3 font-sans font-medium text-foreground">{comp.operation}</td>
                          <td className="p-3 text-emerald-500 font-bold">{comp.best}</td>
                          <td className="p-3 text-amber-500 font-bold">{comp.avg}</td>
                          <td className="p-3 text-rose-500 font-bold">{comp.worst}</td>
                          <td className="p-3 text-teal-600">{comp.space}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Real World Applications */}
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-foreground flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-primary" /> Real-World Engineering Applications
                </h4>
                <ul className="space-y-1 text-xs">
                  {experiment.sections.theory.realWorldApplications.map((app, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <Button variant="outline" onClick={() => setActiveTab("objective")} className="text-xs gap-1.5">
                  <ChevronLeft className="h-4 w-4" /> Back to Objective
                </Button>
                <Button onClick={() => setActiveTab("procedure")} className="text-xs gap-1.5">
                  View Experiment Procedure <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4: PROCEDURE & SAMPLE CODE */}
        <TabsContent value="procedure" className="space-y-6">
          <Card className="border-secondary/40 bg-card/60 backdrop-blur-xs shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold font-heading">Step-by-Step Procedure & Code Implementation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-sm leading-relaxed">
              {/* Step list */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-primary">
                  Laboratory Execution Procedure
                </h4>
                <div className="space-y-2 bg-muted/30 p-4 rounded-xl border border-border/50 text-xs text-muted-foreground">
                  {experiment.sections.procedure.map((step, sIdx) => (
                    <p key={sIdx} className="leading-relaxed">{step}</p>
                  ))}
                </div>
              </div>

              {/* Sample Code Script */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">
                    C++ Reference Implementation
                  </h4>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {experiment.sections.sampleCode.language.toUpperCase()}
                  </Badge>
                </div>
                <pre className="p-4 bg-slate-950 text-slate-100 rounded-xl overflow-x-auto text-xs font-mono border border-border leading-relaxed">
                  <code>{experiment.sections.sampleCode.code}</code>
                </pre>
              </div>

              {/* Expected Output */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">
                  Expected Console Output
                </h4>
                <pre className="p-4 bg-slate-950 text-emerald-400 rounded-xl overflow-x-auto text-xs font-mono border border-border">
                  <code>{experiment.sections.expectedOutput}</code>
                </pre>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <Button variant="outline" onClick={() => setActiveTab("theory")} className="text-xs gap-1.5">
                  <ChevronLeft className="h-4 w-4" /> Back to Theory
                </Button>
                <Button onClick={() => setActiveTab("simulation")} className="bg-primary hover:bg-primary/90 text-white text-xs gap-1.5 font-bold shadow-md">
                  <PlayCircle className="h-4 w-4" /> Open Simulation Sandbox
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 5: SIMULATION SANDBOX */}
        <TabsContent value="simulation" className="space-y-6">
          <div className="p-4 rounded-2xl bg-card/60 backdrop-blur-md border border-secondary/40 shadow-sm">
            {experiment.simulator === "stack" && (
              <StackVisualizer content={<p>Stack LIFO simulation sandbox.</p>} />
            )}
            {experiment.simulator === "queue" && (
              <QueueVisualizer content={<p>Queue FIFO simulation sandbox.</p>} />
            )}
            {experiment.simulator === "linked-list" && (
              <LinkedListVisualizer content={<p>Singly Linked List dynamic node pointer visualizer.</p>} />
            )}
            {experiment.simulator === "bubble-sort" && (
              <SortingVisualizer
                algorithm="bubble"
                title="Bubble Sort Simulation"
                description="Observe adjacent comparison passes and bubbling of maximum unsorted values."
              />
            )}
            {experiment.simulator === "selection-sort" && (
              <SortingVisualizer
                algorithm="selection"
                title="Selection Sort Simulation"
                description="Observe minimum index scanning across unsorted partition and minimal memory swaps."
              />
            )}
            {experiment.simulator === "insertion-sort" && (
              <SortingVisualizer
                algorithm="insertion"
                title="Insertion Sort Simulation"
                description="Observe element extraction, backward shifting, and adaptive linear performance."
              />
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <Button variant="outline" onClick={() => setActiveTab("procedure")} className="text-xs gap-1.5">
              <ChevronLeft className="h-4 w-4" /> Back to Procedure
            </Button>
            <Button onClick={() => setActiveTab("quiz")} className="bg-primary hover:bg-primary/90 text-white text-xs gap-1.5 font-bold">
              Take Self-Assessment Quiz <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* TAB 6: SELF-ASSESSMENT (QUIZ) */}
        <TabsContent value="quiz" className="space-y-6">
          {quiz ? (
            <QuizEngine quiz={quiz} />
          ) : (
            <Card className="border-secondary/40 p-6 text-center text-muted-foreground">
              Quiz questions loading for this experiment...
            </Card>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <Button variant="outline" onClick={() => setActiveTab("simulation")} className="text-xs gap-1.5">
              <ChevronLeft className="h-4 w-4" /> Back to Simulation
            </Button>
            <Button onClick={() => setActiveTab("feedback")} className="text-xs gap-1.5">
              Leave Feedback & Rating <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* TAB 7: FEEDBACK */}
        <TabsContent value="feedback" className="space-y-6 max-w-2xl mx-auto">
          <Card className="border-secondary/40 bg-card/60 backdrop-blur-xs shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold font-heading">Experiment Feedback & Review</CardTitle>
              <CardDescription className="text-xs">
                Your feedback helps improve our laboratory demonstrations and instructional clarity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {feedbackSubmitted ? (
                <div className="p-6 text-center space-y-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-500">
                  <CheckCircle2 className="h-8 w-8 mx-auto" />
                  <h4 className="font-bold text-base">Thank You for Your Feedback!</h4>
                  <p className="text-xs text-muted-foreground">
                    Your rating of {userRating}/5 stars and review has been saved to your local learning record.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setFeedbackSubmitted(false)} className="text-xs mt-2">
                    Submit Another Response
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  {/* Star Rating */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">How would you rate this experiment simulation?</Label>
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
                              star <= userRating ? "text-amber-500 fill-amber-500" : "text-muted border-border"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-muted-foreground ml-2">({userRating} out of 5 stars)</span>
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Your Review / Suggestions</Label>
                    <Textarea
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      placeholder="Share what you learned or suggest improvements for this virtual experiment..."
                      rows={4}
                      className="text-xs"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold gap-1.5">
                    <Send className="h-3.5 w-3.5" /> Submit Feedback
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
