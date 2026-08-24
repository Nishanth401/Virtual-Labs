"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LABS_DATA } from "@/data/labs";
import { EXPERIMENTS_DATA } from "@/data/experiments";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { LabSidebar, LabTab } from "@/components/vlab/lab-sidebar";
import { CourseAlignmentCard } from "@/components/vlab/course-alignment-card";
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
  Sparkles,
  ChevronRight
} from "lucide-react";

interface LabDetailPageProps {
  params: Promise<{ labId: string }>;
}

export default function LabDetailPage({ params }: LabDetailPageProps) {
  const { labId } = use(params);
  const lab = LABS_DATA.find((l) => l.id === labId) || LABS_DATA[0];

  const [activeTab, setActiveTab] = useState<LabTab>("introduction");
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  // Filter experiments for this lab
  const experiments = EXPERIMENTS_DATA.filter((e) => e.labId === "data-structures");

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
          {/* VLab Header Banner matching Screenshots 110143 & 110225 */}
          <div className="bg-card/70 backdrop-blur-md rounded-2xl border border-secondary/40 p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="outline" className="text-xs text-primary border-primary/30">
                    {lab.discipline}
                  </Badge>
                  <span className="text-xs text-muted-foreground">• {lab.institute}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading">
                  {lab.name}
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  {lab.department}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{lab.rating} / 5.0</span>
                  <span className="text-xs text-muted-foreground font-normal">({lab.ratingsCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column VLab Layout: Left Sidebar + Right Content Area */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left VLab Navigation Sidebar */}
            <LabSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              experimentsCount={experiments.length}
            />

            {/* Right Tab Content View matching Screenshots */}
            <div className="flex-1 w-full min-w-0">
              {/* TAB 1: INTRODUCTION matching Screenshot 110143 */}
              {activeTab === "introduction" && (
                <Card className="border-secondary/40 bg-card/70 backdrop-blur-xs shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary font-heading">
                      Welcome to the {lab.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
                    <p className="text-foreground text-sm font-medium">
                      {lab.description}
                    </p>

                    <p>
                      Data Structures (also called Data Structures and Algorithms in some places) is a core course in all computer science undergraduate curricula. The course is the basis for understanding several data structures and also algorithms that operate on them. The course forms the foundation for almost all computer science subjects: compilers, operating systems, databases, AI and software engineering.
                    </p>

                    <p>
                      The course comes with a lab in most universities in India. The associated lab in university curricula focuses on implementation of algorithms operating on the data structures, i.e., coding programs on the data structures and algorithms.
                    </p>

                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2 text-foreground">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-primary">
                        Why Virtual Laboratory Simulations?
                      </h4>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        Students embarking on the task of writing programs often have difficulty visualizing how operations and algorithms modify a data structure. Furthermore, students are unable to visually reason about the time and space complexities associated with an algorithm running on a data structure. The interactive experiments in this lab give students an opportunity for learning and better understanding.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/40 flex justify-end">
                      <Button onClick={() => setActiveTab("experiments")} className="text-xs gap-1.5">
                        View List of Experiments <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* TAB 2: OBJECTIVE matching Screenshot 110225 */}
              {activeTab === "objective" && (
                <Card className="border-secondary/40 bg-card/70 backdrop-blur-xs shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary font-heading">
                      Objective of Data Structures Lab
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
                    <p className="text-foreground text-sm">
                      The Virtual Lab for Data Structures will focus on creating an environment where the student interactively explores data structures. The role of this Virtual Lab is to complement lectures and reading material in three distinct ways:
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="p-4 rounded-xl bg-muted/40 border border-border/60 flex items-start gap-3">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white font-bold text-xs shrink-0 mt-0.5">
                          1
                        </span>
                        <div>
                          <strong className="text-foreground font-semibold block text-sm">Present Visual Animations</strong>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Present high-fidelity visual animations of data structures during insertions, deletions, re-balancing, and traversals.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-muted/40 border border-border/60 flex items-start gap-3">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white font-bold text-xs shrink-0 mt-0.5">
                          2
                        </span>
                        <div>
                          <strong className="text-foreground font-semibold block text-sm">Interactive Algorithm Execution</strong>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Allow students to interactively execute algorithms in step-by-step mode with custom user inputs and pseudocode synchronizations.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-muted/40 border border-border/60 flex items-start gap-3">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white font-bold text-xs shrink-0 mt-0.5">
                          3
                        </span>
                        <div>
                          <strong className="text-foreground font-semibold block text-sm">Compute Asymptotic Costs</strong>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Allow students to interactively compute and compare the time and memory costs of using different data structures for standard operations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* TAB 3: LIST OF EXPERIMENTS matching Screenshot 110410 */}
              {activeTab === "experiments" && (
                <div className="space-y-6">
                  {/* Sorting Category */}
                  <Card className="border-secondary/40 bg-card/70 backdrop-blur-xs shadow-sm">
                    <CardHeader className="pb-3 border-b border-border/50">
                      <CardTitle className="text-lg font-bold text-primary font-heading">
                        Sorting Algorithms Laboratory Experiments
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 divide-y divide-border/40">
                      {experiments
                        .filter((e) => e.category === "Sorting Algorithms")
                        .map((exp, idx) => (
                          <div
                            key={exp.id}
                            className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                                  {idx + 1}. {exp.title}
                                </span>
                                <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-3 w-3 fill-current" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {exp.sections.objective}
                              </p>
                            </div>

                            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs gap-1.5 self-start sm:self-center">
                              <Link href={`/experiments/${exp.slug}`}>
                                <PlayCircle className="h-3.5 w-3.5" /> Start Experiment
                              </Link>
                            </Button>
                          </div>
                        ))}
                    </CardContent>
                  </Card>

                  {/* Linear Structures Category */}
                  <Card className="border-secondary/40 bg-card/70 backdrop-blur-xs shadow-sm">
                    <CardHeader className="pb-3 border-b border-border/50">
                      <CardTitle className="text-lg font-bold text-primary font-heading">
                        Linear Data Structures Laboratory Experiments
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 divide-y divide-border/40">
                      {experiments
                        .filter((e) => e.category === "Linear Structures")
                        .map((exp, idx) => (
                          <div
                            key={exp.id}
                            className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                                  {idx + 1}. {exp.title}
                                </span>
                                <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-3 w-3 fill-current" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {exp.sections.objective}
                              </p>
                            </div>

                            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs gap-1.5 self-start sm:self-center">
                              <Link href={`/experiments/${exp.slug}`}>
                                <PlayCircle className="h-3.5 w-3.5" /> Start Experiment
                              </Link>
                            </Button>
                          </div>
                        ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* TAB 4: TARGET AUDIENCE matching Screenshot 110427 */}
              {activeTab === "target-audience" && (
                <Card className="border-secondary/40 bg-card/70 backdrop-blur-xs shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary font-heading">
                      Target Audience & Beneficiaries
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
                        <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span>Undergraduate (UG) Level</span>
                        </h4>
                        <ul className="space-y-1 text-xs pl-6 list-disc">
                          <li>
                            Data Structures & Algorithms for 1st & 2nd year B. Tech. / B.E. in Computer Science & Engineering, Information Technology, Artificial Intelligence & Data Science, and Electronics & Communication.
                          </li>
                          <li>
                            B.Sc / B.S. in Computer Science, Data Science, and Information Systems.
                          </li>
                          <li>
                            BCA (Bachelor of Computer Applications) candidates.
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
                        <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span>Postgraduate (PG) & Research Level</span>
                        </h4>
                        <ul className="space-y-1 text-xs pl-6 list-disc">
                          <li>
                            M.Tech / M.E / MCA in Computer Science, Compilers, Operating Systems, Databases, AI, and Software Engineering.
                          </li>
                          <li>
                            Ph.D. beginners and algorithmic researchers refreshing asymptotic foundations.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* TAB 5: COURSE ALIGNMENT matching Screenshots 110440 & 111240 */}
              {activeTab === "course-alignment" && (
                <CourseAlignmentCard />
              )}

              {/* TAB 6: FEEDBACK matching Screenshot 110504 */}
              {activeTab === "feedback" && (
                <Card className="border-secondary/40 bg-card/70 backdrop-blur-xs shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary font-heading">
                      Share Your Experience with Virtual Labs
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Thanks for using Virtual Labs. Your opinion is valuable to us.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {feedbackSent ? (
                      <div className="p-6 text-center space-y-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-500">
                        <CheckCircle2 className="h-8 w-8 mx-auto" />
                        <h4 className="font-bold">Thank you for your time!</h4>
                        <p className="text-xs text-muted-foreground">— The Department Virtual Labs Team</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSendFeedback} className="space-y-4">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          To help us improve, please share your thoughts regarding the animations, instructional notes, and simulation accuracy. It will only take 1 minute and your answers help make Virtual Labs better for everyone.
                        </p>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold">Laboratory Rating</label>
                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setFeedbackRating(s)}
                                className="p-1"
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
                            placeholder="Type your feedback here..."
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
