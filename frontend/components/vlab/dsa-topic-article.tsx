"use client";

import React from "react";
import { DSATopic } from "@/data/dsa-topic-data";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      {/* Top Concise Banner Header */}
      <div className="bg-card/90 backdrop-blur-md border border-border p-6 rounded-2xl shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="text-primary font-semibold">{topic.categoryName}</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
            <span className="text-foreground font-semibold truncate max-w-md">{topic.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={topic.gfgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/20 shadow-2xs"
            >
              <span>GeeksforGeeks</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

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
              <CheckCircle2 className="h-4 w-4" />
              <span>{isCompleted ? "Completed" : "Mark Done"}</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight font-heading">
              {topic.title}
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5 font-medium leading-relaxed">
              {topic.quickSummary}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
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

      {/* Main Content: Key Concepts, Complexities, & Practice Problems */}
      <div className="space-y-6">
        {/* Quick Key-Points Summary Cards (3 Bullet Points Max) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topic.keyPoints.map((pt, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-border/80 bg-card/80 flex items-start gap-3 shadow-xs">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0 mt-0.5 font-sans">
                {idx + 1}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pt}
              </p>
            </div>
          ))}
        </div>

        {/* Asymptotic Complexity Quick Strip */}
        <Card className="border-border bg-card/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-sans text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" /> Time &amp; Space Complexity Summary
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 font-mono text-sm">
            {topic.complexities.map((c, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-muted/40 border border-border/50 text-center">
                <div className="text-xs text-muted-foreground font-sans truncate">{c.operation}</div>
                <div className="font-bold text-emerald-500 mt-1 text-base">{c.avg || c.worst}</div>
                <div className="text-xs text-teal-400 mt-0.5">{c.space}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Interactive Source Code & Live Compiler Runner */}
        <MultiLangCodeViewer
          title={`${topic.title} - Implementation`}
          subtitle="Interactive Multi-Language Source Code & Live Compiler Runner"
          snippets={topic.codeSnippets || []}
        />

        {/* Curated Topic Resources & References Section */}
        <Card className="border-border bg-card/90 shadow-sm p-6 space-y-5">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            {topic.gfgUrl && (
              <a
                href={topic.gfgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30 hover:bg-card hover:border-emerald-500/40 hover:shadow-xs transition-all group shadow-2xs"
              >
                <div className="space-y-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground group-hover:text-emerald-500 transition-colors truncate">
                      Complete {topic.title} Concept Handbook
                    </span>
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">GeeksforGeeks Documentation</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant="outline"
                    className="text-emerald-500 border-emerald-500/30 text-xs font-mono font-semibold"
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
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30 hover:bg-card hover:border-primary/40 hover:shadow-xs transition-all group shadow-2xs"
              >
                <div className="space-y-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                      {prob.title}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{prob.platform} Reference</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant="outline"
                    className={
                      prob.difficulty === "Easy"
                        ? "text-emerald-500 border-emerald-500/30 text-xs font-mono font-semibold"
                        : prob.difficulty === "Medium"
                        ? "text-amber-500 border-amber-500/30 text-xs font-mono font-semibold"
                        : "text-rose-500 border-rose-500/30 text-xs font-mono font-semibold"
                    }
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

      {/* Bottom Prev/Next Topic Navigation */}
      <div className="flex items-center justify-between p-4 bg-card/90 border border-border rounded-2xl shadow-sm text-sm font-semibold">
        {prevTopic ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectTopic(prevTopic)}
            className="gap-2 text-sm hover:bg-muted h-10 px-4 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="truncate max-w-[160px] sm:max-w-none">Prev: {prevTopic.title}</span>
          </Button>
        ) : <div />}

        {nextTopic ? (
          <Button
            size="sm"
            onClick={() => onSelectTopic(nextTopic)}
            className="bg-primary hover:bg-primary/90 text-white text-sm gap-2 font-bold shadow-sm h-10 px-4 cursor-pointer"
          >
            <span className="truncate max-w-[160px] sm:max-w-none">Next: {nextTopic.title}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : <div />}
      </div>
    </div>
  );
}
