"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LABS_DATA } from "@/data/labs";
import { EXPERIMENTS_DATA } from "@/data/experiments";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { LabSidebar, LabTab } from "@/components/vlab/lab-sidebar";
import { CourseAlignmentCard } from "@/components/vlab/course-alignment-card";
import { MLPrerequisitesTrack } from "@/components/vlab/ml-prerequisites-track";
import { DSARoadmap } from "@/components/vlab/dsa-roadmap";
import { LAB_ROADMAPS_DATA } from "@/data/all-labs-roadmap-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  FlaskConical,
  Star,
  PlayCircle,
  CheckCircle2,
  Users,
  Target,
  ArrowRight,
  BookOpen,
  Send,
  Trophy,
  ChevronRight,
  Code2,
  BrainCircuit,
  Database,
  Network,
  Video,
  ExternalLink
} from "lucide-react";

interface LabDetailPageProps {
  params: Promise<{ labId: string }>;
}

export default function LabDetailPage({ params }: LabDetailPageProps) {
  const { labId } = use(params);
  const lab = LABS_DATA.find((l) => l.id === labId) || LABS_DATA[0];

  const [activeTab, setActiveTab] = useState<LabTab>("dsa-roadmap");
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Filter experiments for this lab
  const experiments = EXPERIMENTS_DATA.filter((e) => e.labId === lab.id);

  const handleQuizOptionSelect = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-muted/20 py-8">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          {/* Header Banner */}
          <div className="bg-card/80 backdrop-blur-md rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="outline" className="text-xs text-primary border-primary/30 font-mono font-bold">
                    {lab.code} • {lab.shortTitle}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">• {lab.institute}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading">
                  {lab.name}
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  {lab.department} • {lab.semester}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center">
                <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/20">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{lab.rating} / 5.0</span>
                  <span className="text-xs text-muted-foreground font-normal">({lab.ratingsCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Layout: Left Sidebar + Right Content Area */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Sidebar */}
            <LabSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              experimentsCount={experiments.length}
            />

            {/* Right Tab Content View */}
            <div className="flex-1 w-full min-w-0">
              {/* TAB 0: ROADMAP & PRACTICE */}
              {activeTab === "dsa-roadmap" && (
                <DSARoadmap labId={lab.id} />
              )}

              {/* TAB 1: INTRODUCTION */}
              {activeTab === "introduction" && (
                <Card className="border-border bg-card/80 backdrop-blur-xs shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary font-heading">
                      Welcome to the {lab.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
                    <p className="text-foreground text-sm font-medium">
                      {lab.description}
                    </p>

                    {/* VIDEO PLAYER FRAME */}
                    <div className="py-2 my-4">
                      <div className="max-w-3xl mx-auto">
                        <div className="aspect-video w-full rounded-2xl bg-black/90 border border-primary/30 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
                          <iframe
                            src={lab.videoUrl}
                            title={`${lab.name} Laboratory Video Demonstration`}
                            className="w-full h-full rounded-2xl border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2 text-foreground">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-primary font-mono">
                        Why Simulation-Based Learning?
                      </h4>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        Students writing algorithms often struggle to intuit pointer rewiring, stack frame lifecycles, and matrix transformations. The interactive Java/Python simulators in this virtual laboratory offer self-paced visual exploration.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/40 flex justify-end">
                      <Button onClick={() => setActiveTab("experiments")} className="text-xs gap-1.5 font-bold">
                        View List of Experiments <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* TAB 2: OBJECTIVE */}
              {activeTab === "objective" && (
                <Card className="border-border bg-card/80 backdrop-blur-xs shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary font-heading">
                      Objectives of {lab.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
                    <p className="text-foreground text-sm font-medium">
                      The role of this Department Virtual Lab is to complement classroom lectures and textbooks in three distinct ways:
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="p-4 rounded-xl bg-muted/40 border border-border flex items-start gap-3">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white font-bold text-xs shrink-0 mt-0.5 font-mono">
                          1
                        </span>
                        <div>
                          <strong className="text-foreground font-semibold block text-sm">Interactive Visual Animations</strong>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            High-fidelity visual animations of memory states during insertions, deletions, recursion frames, and data filtering.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-muted/40 border border-border flex items-start gap-3">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white font-bold text-xs shrink-0 mt-0.5 font-mono">
                          2
                        </span>
                        <div>
                          <strong className="text-foreground font-semibold block text-sm">Step-by-Step Code Execution</strong>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Execute algorithms step-by-step with custom inputs, call stack frame inspection, and variable watch scopes.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-muted/40 border border-border flex items-start gap-3">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white font-bold text-xs shrink-0 mt-0.5 font-mono">
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

              {/* TAB 3: LIST OF EXPERIMENTS */}
              {activeTab === "experiments" && (
                <div className="space-y-6">
                  {/* If Machine Learning Lab, show the Prerequisite NumPy/Pandas Track first! */}
                  {lab.id === "ai-machine-learning" && (
                    <MLPrerequisitesTrack />
                  )}

                  {/* Experiments List Card */}
                  <Card className="border-border bg-card/80 backdrop-blur-xs shadow-sm">
                    <CardHeader className="pb-3 border-b border-border/50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-primary font-heading">
                          Laboratory Experiments Syllabus ({experiments.length})
                        </CardTitle>
                        <Badge variant="outline" className="text-xs font-mono">
                          {LAB_ROADMAPS_DATA[lab.id]?.badge || (lab.id === "data-structures" ? "100% Pure Java" : "Engineering Sandbox")}
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
                              <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                                {idx + 1}. {exp.title}
                              </span>
                              <Badge variant="outline" className="text-[10px] font-mono">
                                {exp.difficulty}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {exp.sections.objective}
                            </p>
                            <div className="flex items-center gap-3 text-[11px] text-muted-foreground pt-1">
                              <span className="flex items-center gap-1">
                                <Video className="h-3 w-3 text-blue-400" /> Video Tutorial
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Code2 className="h-3 w-3 text-indigo-400" /> Call Stack Trace
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> {exp.rating}
                              </span>
                            </div>
                          </div>

                          <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs gap-1.5 self-start sm:self-center font-bold shadow-xs">
                            <Link href={`/experiments/${exp.slug}`}>
                              <PlayCircle className="h-4 w-4" />
                              <span>Start Experiment</span>
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}



              {/* TAB 4: SELF-ASSESSMENT & LEETCODE PROBLEMS */}
              {activeTab === "quizzes" && (
                <div className="space-y-6">
                  {/* Part 1: Topic-Related LeetCode Practice Problems */}
                  <Card className="border-border bg-card/80 backdrop-blur-xs shadow-sm p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <CardTitle className="text-xl font-bold text-primary font-heading flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-amber-500" />
                          <span>Topic-by-Topic LeetCode &amp; GFG Practice Problems</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          Solve these curated coding challenges directly on LeetCode to master {lab.name} topics for technical interview placement rounds.
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs font-mono bg-amber-500/10 text-amber-500 border-amber-500/30">
                        {LAB_ROADMAPS_DATA[lab.id]?.categories.flatMap(c => c.topics.flatMap(t => t.practiceProblems)).length || 10} Challenges
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {(LAB_ROADMAPS_DATA[lab.id]?.categories.flatMap(c => c.topics.flatMap(t => t.practiceProblems)) || [
                        { title: "Two Sum", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum/", platform: "LeetCode" },
                        { title: "Reverse Linked List", difficulty: "Easy", url: "https://leetcode.com/problems/reverse-linked-list/", platform: "LeetCode" },
                        { title: "Valid Parentheses", difficulty: "Easy", url: "https://leetcode.com/problems/valid-parentheses/", platform: "LeetCode" },
                        { title: "Binary Search", difficulty: "Easy", url: "https://leetcode.com/problems/binary-search/", platform: "LeetCode" }
                      ]).map((prob, idx) => (
                        <a
                          key={idx}
                          href={prob.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30 hover:bg-primary/5 hover:border-primary/40 transition-all group shadow-2xs"
                        >
                          <div className="space-y-1 min-w-0 pr-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-foreground group-hover:text-primary transition-colors truncate">
                                {idx + 1}. {prob.title}
                              </span>
                            </div>
                            <span className="text-[10px] text-muted-foreground font-mono">{prob.platform}</span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <Badge
                              variant="outline"
                              className={
                                prob.difficulty === "Easy"
                                  ? "text-emerald-500 border-emerald-500/30 text-[10px]"
                                  : prob.difficulty === "Medium"
                                  ? "text-amber-500 border-amber-500/30 text-[10px]"
                                  : "text-rose-500 border-rose-500/30 text-[10px]"
                              }
                            >
                              {prob.difficulty}
                            </Badge>
                            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* TAB 5: COURSE ALIGNMENT */}
              {activeTab === "course-alignment" && (
                <CourseAlignmentCard />
              )}

              {/* TAB 6: FEEDBACK */}
              {activeTab === "feedback" && (
                <Card className="border-border bg-card/80 backdrop-blur-xs shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary font-heading">
                      Laboratory Feedback &amp; Suggestions
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Thanks for using Virtual Labs. Your review helps us continuously enhance simulation precision.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {feedbackSent ? (
                      <div className="p-6 text-center space-y-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-500">
                        <CheckCircle2 className="h-8 w-8 mx-auto" />
                        <h4 className="font-bold">Thank you for your feedback!</h4>
                        <p className="text-xs text-muted-foreground">— Department of AI &amp; DS Virtual Labs Team</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSendFeedback} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold">Laboratory Rating</label>
                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setFeedbackRating(s)}
                                className="p-1 hover:scale-110 transition-transform"
                              >
                                <Star
                                  className={`h-5 w-5 ${
                                    s <= feedbackRating ? "text-amber-500 fill-amber-500" : "text-muted"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold">Comments / Suggestions</label>
                          <Textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder="Type your feedback here regarding Java simulations or video tutorials..."
                            rows={4}
                            className="text-xs"
                          />
                        </div>

                        <Button type="submit" className="bg-primary hover:bg-primary/90 text-white text-xs font-bold gap-1.5">
                          <Send className="h-3.5 w-3.5" /> Submit Experience
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
