"use client";

import React from "react";
import { DSATopic } from "@/data/dsa-topic-data";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ExternalLink,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Zap,
  BookOpen,
} from "lucide-react";
import { MultiLangCodeViewer } from "@/components/visualizer/code/multi-lang-code-viewer";
import { SqlCompiler } from "@/components/vlab/sql-compiler";

interface DSATopicArticleProps {
  topic: DSATopic;
  prevTopic?: DSATopic | null;
  nextTopic?: DSATopic | null;
  onSelectTopic: (topic: DSATopic) => void;
  isCompleted: boolean;
  onToggleCompleted: (topicId: string) => void;
}

export function DSATopicArticle({
  topic,
  prevTopic,
  nextTopic,
  onSelectTopic,
  isCompleted,
  onToggleCompleted,
}: DSATopicArticleProps) {
  return (
    <div className="space-y-6 flex-1 min-w-0">
      {/* 1. Top Concise Banner Header */}
      <div className="bg-card/90 backdrop-blur-md border border-border p-5 sm:p-6 rounded-2xl shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground min-w-0">
            <span className="text-primary font-semibold truncate">{topic.categoryName}</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
            <span className="text-foreground font-semibold truncate max-w-xs sm:max-w-md">{topic.title}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {topic.gfgUrl && (
              <a
                href={topic.gfgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 shadow-2xs"
              >
                <span>GeeksforGeeks</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}

            <Button
              variant={isCompleted ? "default" : "outline"}
              size="sm"
              onClick={() => onToggleCompleted(topic.id)}
              className={
                isCompleted
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 font-bold h-8 cursor-pointer shadow-xs"
                  : "text-xs gap-1.5 h-8 cursor-pointer"
              }
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{isCompleted ? "Completed" : "Mark Done"}</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground tracking-tight font-heading leading-tight">
              {topic.title}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed max-w-3xl pt-0.5">
              {topic.quickSummary}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border shadow-2xs ${
                topic.difficulty === "Easy" || topic.difficulty === "Beginner"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                  : topic.difficulty === "Medium" || topic.difficulty === "Intermediate"
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
              <span>{topic.difficulty}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 text-muted-foreground border border-border/60 text-xs font-medium shadow-2xs">
              <Clock className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" />
              <span>{topic.estimatedTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content: Key Concepts, Complexities, & Practice Problems */}
      <div className="space-y-6">
        {/* Quick Key-Points Summary Cards (3 Perfectly Symmetrical & Equal-Height Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {topic.keyPoints.map((pt, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/40 flex flex-col justify-between shadow-2xs transition-all h-full min-h-[120px]"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center h-6 w-6 rounded-lg bg-primary/10 text-primary font-bold text-xs shrink-0 font-mono">
                    0{idx + 1}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                    Core Concept 0{idx + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                  {pt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Asymptotic Complexity Quick Strip (Balanced 4-Column Metric Grid) */}
        <Card className="border-border bg-card p-5 sm:p-6 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-sans text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" /> Time &amp; Space Complexity Summary
            </span>
            <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground hidden sm:inline-flex">
              Performance Benchmark
            </Badge>
          </div>

          <div className="space-y-4">
            {topic.complexities && topic.complexities.length > 0 ? (
              topic.complexities.map((c, idx) => (
                <div key={idx} className="space-y-2">
                  {topic.complexities.length > 1 && (
                    <div className="flex items-center gap-2 text-xs font-bold text-foreground font-mono">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      <span>Target: {c.operation}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-sm items-stretch">
                    {/* Metric 1: Operation Scope */}
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 flex flex-col justify-center text-center h-full">
                      <div className="text-[11px] text-muted-foreground font-sans font-medium">Operation Scope</div>
                      <div className="font-bold text-foreground mt-1 text-xs sm:text-sm truncate" title={c.operation}>
                        {c.operation}
                      </div>
                      <div className="text-[10px] text-muted-foreground/80 mt-0.5 font-sans">Execution Target</div>
                    </div>

                    {/* Metric 2: Average Time */}
                    <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col justify-center text-center h-full">
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-sans font-medium">Average Time</div>
                      <div className="font-bold text-emerald-500 mt-1 text-sm sm:text-base truncate">
                        {c.avg || c.best || "O(1)"}
                      </div>
                      <div className="text-[10px] text-muted-foreground/80 mt-0.5 font-sans">Execution Plan</div>
                    </div>

                    {/* Metric 3: Worst Case */}
                    <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 flex flex-col justify-center text-center h-full">
                      <div className="text-[11px] text-amber-600 dark:text-amber-400 font-sans font-medium">Worst Case</div>
                      <div className="font-bold text-amber-500 mt-1 text-sm sm:text-base truncate">
                        {c.worst || "O(N)"}
                      </div>
                      <div className="text-[10px] text-muted-foreground/80 mt-0.5 font-sans">Table / Scan Bound</div>
                    </div>

                    {/* Metric 4: Space Complexity */}
                    <div className="p-3.5 rounded-xl bg-sky-500/5 border border-sky-500/20 flex flex-col justify-center text-center h-full">
                      <div className="text-[11px] text-sky-600 dark:text-sky-400 font-sans font-medium">Space Complexity</div>
                      <div className="font-bold text-sky-500 mt-1 text-sm sm:text-base truncate">
                        {c.space || "O(1)"}
                      </div>
                      <div className="text-[10px] text-muted-foreground/80 mt-0.5 font-sans">Buffer / Memory</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-muted-foreground bg-muted/20 rounded-xl border border-border/60 font-sans">
                Standard relational asymptotic complexity applies.
              </div>
            )}
          </div>
        </Card>

        {/* 4. Interactive Source Code & Live Compiler Runner */}
        {topic.categoryId?.startsWith("dbms-") || topic.id?.startsWith("dbms-") || topic.codeSnippets?.some((s) => s.language?.toLowerCase() === "sql") ? (
          <SqlCompiler
            title={`${topic.title}`}
            subtitle="Interactive Relational SQL Studio & Live Query Execution Sandbox"
            initialSql={
              topic.codeSnippets?.find((s) => s.language?.toLowerCase() === "sql")?.code ||
              topic.codeSnippets?.[0]?.code ||
              ""
            }
            currentExperimentId={topic.id}
          />
        ) : (
          <MultiLangCodeViewer
            title={`${topic.title} - Implementation`}
            subtitle="Interactive Multi-Language Source Code & Live Compiler Runner"
            snippets={topic.codeSnippets || []}
          />
        )}

        {/* 5. Curated Topic Resources & References Section (Equal Height 2-Column Grid) */}
        <Card className="border-border bg-card/90 shadow-sm p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold font-heading text-foreground">
                  Curated Learning Resources ({topic.practiceProblems.length + (topic.gfgUrl ? 1 : 0)})
                </CardTitle>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  Handpicked reference documentation, guides, and practical study problems for {topic.title}.
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs font-sans bg-primary/10 text-primary border-primary/20 font-semibold px-2.5 py-1 rounded-full hidden sm:inline-flex">
              Study &amp; References
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1 items-stretch">
            {topic.gfgUrl && (
              <a
                href={topic.gfgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30 hover:bg-card hover:border-emerald-500/40 hover:shadow-xs transition-all group shadow-2xs h-full min-h-[76px]"
              >
                <div className="space-y-1 min-w-0 pr-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-foreground group-hover:text-emerald-500 transition-colors truncate">
                      Complete {topic.title} Handbook
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono block">GeeksforGeeks Documentation</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant="outline"
                    className="text-emerald-500 border-emerald-500/30 text-[10px] font-mono font-semibold"
                  >
                    Handbook
                  </Badge>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                </div>
              </a>
            )}

            {topic.practiceProblems.map((prob, idx) => (
              <a
                key={idx}
                href={prob.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30 hover:bg-card hover:border-primary/40 hover:shadow-xs transition-all group shadow-2xs h-full min-h-[76px]"
              >
                <div className="space-y-1 min-w-0 pr-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors truncate">
                      {prob.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono block">{prob.platform} Reference</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] font-mono font-semibold",
                      prob.difficulty === "Easy"
                        ? "text-emerald-500 border-emerald-500/30"
                        : prob.difficulty === "Medium"
                        ? "text-amber-500 border-amber-500/30"
                        : "text-rose-500 border-rose-500/30"
                    )}
                  >
                    {prob.difficulty}
                  </Badge>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </Card>
      </div>

      {/* 6. Bottom Prev/Next Topic Navigation (Evenly Balanced) */}
      <div className="flex items-center justify-between p-4 bg-card/90 border border-border rounded-2xl shadow-sm text-sm font-semibold">
        {prevTopic ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectTopic(prevTopic)}
            className="gap-2 text-xs sm:text-sm hover:bg-muted h-10 px-4 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="truncate max-w-[140px] sm:max-w-none">Prev: {prevTopic.title}</span>
          </Button>
        ) : <div />}

        {nextTopic ? (
          <Button
            size="sm"
            onClick={() => onSelectTopic(nextTopic)}
            className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm gap-2 font-bold shadow-sm h-10 px-4 cursor-pointer"
          >
            <span className="truncate max-w-[140px] sm:max-w-none">Next: {nextTopic.title}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : <div />}
      </div>
    </div>
  );
}
