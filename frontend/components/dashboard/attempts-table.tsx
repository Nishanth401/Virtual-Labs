"use client";

import Link from "next/link";
import { StudentProgressState } from "@/lib/storage";
import { EXPERIMENTS_DATA } from "@/data/experiments";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, PlayCircle, ArrowRight, Star } from "lucide-react";

interface AttemptsTableProps {
  progress: StudentProgressState;
}

export function AttemptsTable({ progress }: AttemptsTableProps) {
  return (
    <Card className="border-secondary/40 bg-card/60 backdrop-blur-xs shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold font-heading">Data Structures Laboratory Modules</CardTitle>
        <CardDescription className="text-xs">
          Track experiment progress, review assessment scores, and resume interactive simulations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border border-border/60 rounded-xl overflow-hidden">
          <div className="divide-y divide-border/40">
            {EXPERIMENTS_DATA.map((exp, idx) => {
              const isCompleted = progress.completedExperiments.includes(exp.id);
              const attempt = progress.quizAttempts[exp.id];
              const feedback = progress.feedbacks[exp.id];

              return (
                <div
                  key={exp.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center h-7 w-7 rounded-full bg-muted text-muted-foreground text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/experiments/${exp.slug}`}
                          className="font-bold text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {exp.title}
                        </Link>
                        {isCompleted ? (
                          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 text-[10px]">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Passed
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px]">
                            Not Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {exp.sections.objective}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground pt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {exp.estimatedMinutes} mins
                        </span>
                        <span>•</span>
                        <span>{exp.category}</span>
                        {attempt && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-primary font-semibold">
                              Score: {attempt.score}/{attempt.totalQuestions} ({attempt.percentage}%)
                            </span>
                          </>
                        )}
                        {feedback && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                              <Star className="h-3 w-3 fill-current" /> {feedback.rating}/5
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <Button asChild size="sm" variant={isCompleted ? "outline" : "default"} className="text-xs gap-1.5">
                      <Link href={`/experiments/${exp.slug}`}>
                        <PlayCircle className="h-3.5 w-3.5" />
                        <span>{isCompleted ? "Review Lab" : "Start Lab"}</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
