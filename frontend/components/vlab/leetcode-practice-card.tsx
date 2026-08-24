"use client";

import React, { useState } from "react";
import { LeetCodeProblem } from "@/data/experiments";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Code2, CheckCircle2, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

interface LeetCodePracticeCardProps {
  problems: LeetCodeProblem[];
}

export function LeetCodePracticeCard({ problems }: LeetCodePracticeCardProps) {
  const [expandedId, setExpandedId] = useState<number | null>(problems.length > 0 ? problems[0].id : null);

  if (!problems || problems.length === 0) {
    return (
      <Card className="border-border bg-card/60 p-6 text-center text-muted-foreground text-xs">
        LeetCode problems will be synchronized for this algorithmic module soon.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground font-heading">
            Curated LeetCode Practice Challenges
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Test your Java algorithmic implementation on top interview problems.
          </p>
        </div>
        <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-500 border-amber-500/30">
          LeetCode Verified
        </Badge>
      </div>

      <div className="space-y-3">
        {problems.map((problem) => {
          const isExpanded = expandedId === problem.id;

          let diffColor = "bg-emerald-500/10 text-emerald-500 border-emerald-500/30";
          if (problem.difficulty === "Medium") diffColor = "bg-amber-500/10 text-amber-500 border-amber-500/30";
          if (problem.difficulty === "Hard") diffColor = "bg-rose-500/10 text-rose-500 border-rose-500/30";

          return (
            <Card key={problem.id} className="border-border bg-card/80 backdrop-blur-xs overflow-hidden transition-all">
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : problem.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-xs text-muted-foreground w-12">
                    #{problem.id}
                  </span>
                  <span className="font-bold text-sm text-foreground hover:text-primary transition-colors">
                    {problem.title}
                  </span>
                  <Badge variant="outline" className={`text-[10px] font-semibold ${diffColor}`}>
                    {problem.difficulty}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a href={problem.url} target="_blank" rel="noopener noreferrer">
                      <span>Solve on LeetCode</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </div>
              </div>

              {isExpanded && (
                <CardContent className="px-4 pb-4 pt-0 border-t border-border/40 space-y-3 bg-muted/20 text-xs">
                  <p className="text-muted-foreground leading-relaxed pt-3">
                    {problem.description}
                  </p>

                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-primary text-xs">
                      <Lightbulb className="h-3.5 w-3.5" />
                      <span>Recommended Java Approach</span>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{problem.approach}</p>
                  </div>

                  {problem.javaSnippet && (
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold font-mono">
                        Java Solution Starter Template
                      </span>
                      <pre className="p-3 rounded-lg bg-slate-950 text-slate-100 font-mono text-[11px] overflow-x-auto border border-border leading-relaxed">
                        <code>{problem.javaSnippet}</code>
                      </pre>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
