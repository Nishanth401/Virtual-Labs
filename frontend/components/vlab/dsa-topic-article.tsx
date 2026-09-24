"use client";

import React, { useState } from "react";
import { DSATopic } from "@/data/dsa-topic-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ExternalLink,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { MultiLangCodeViewer } from "@/components/visualizer/code/multi-lang-code-viewer";
import { SqlCompiler } from "@/components/vlab/sql-compiler";
import { MaterialReaderDialog } from "@/components/resources/material-reader-dialog";

export interface DSATopicOverviewProps {
  topic: DSATopic;
  isCompleted: boolean;
  onToggleCompleted: (topicId: string) => void;
  className?: string;
}

export function DSATopicOverview({
  topic,
  isCompleted,
  onToggleCompleted,
  className,
}: DSATopicOverviewProps) {
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  return (
    <div className={cn("bg-card border border-border/80 p-5 sm:p-6 rounded-xl shadow-xs space-y-5 font-sans", className)}>
      {/* 1. Header with Breadcrumb and Actions */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
            <span className="text-[#0284c7] dark:text-[#38bdf8] font-medium truncate">{topic.categoryName}</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
            <span className="text-foreground font-medium truncate max-w-xs">{topic.title}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {topic.gfgUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsReaderOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284c7] dark:text-[#38bdf8] bg-sky-500/10 hover:bg-sky-500/20 px-2.5 h-8 rounded-lg border border-sky-500/20 cursor-pointer"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>In-App Handbook</span>
              </Button>
            )}

            <Button
              variant={isCompleted ? "default" : "outline"}
              size="sm"
              onClick={() => onToggleCompleted(topic.id)}
              className={
                isCompleted
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 font-semibold h-8 px-2.5 cursor-pointer"
                  : "text-xs gap-1.5 h-8 px-2.5 cursor-pointer text-foreground/80 hover:text-[#ea580c]"
              }
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{isCompleted ? "Completed" : "Mark Done"}</span>
            </Button>
          </div>
        </div>

        {/* Title, Difficulty & Estimated Time */}
        <div className="space-y-1.5">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0284c7] dark:text-[#38bdf8] font-heading tracking-tight">
              {topic.title}
            </h2>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border",
                  topic.difficulty === "Easy" || topic.difficulty === "Beginner"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
                    : topic.difficulty === "Medium" || topic.difficulty === "Intermediate"
                    ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
                    : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800"
                )}
              >
                {topic.difficulty}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-sans">
                <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
                <span>{topic.estimatedTime}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Learning Objective / Overview Section */}
      <div className="space-y-2 pt-2 border-t border-border/60">
        <h3 className="text-sm sm:text-base font-bold text-foreground underline decoration-[#0284c7]/40 underline-offset-4 font-heading">
          Learning Objective &amp; Overview
        </h3>
        <p className="text-sm text-foreground/90 font-sans leading-relaxed">
          {topic.quickSummary || topic.summary}
        </p>
      </div>

      {/* 3. Key Concepts & Principles Section */}
      {topic.keyPoints && topic.keyPoints.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm sm:text-base font-bold text-foreground underline decoration-[#0284c7]/40 underline-offset-4 font-heading">
            Key Concepts &amp; Principles
          </h3>
          <ol className="list-decimal list-outside pl-5 space-y-1.5 text-sm text-foreground/90 font-sans leading-relaxed">
            {topic.keyPoints.map((pt, idx) => {
              const colonIdx = pt.indexOf(":");
              if (colonIdx > 0 && colonIdx < 40) {
                const title = pt.slice(0, colonIdx);
                const desc = pt.slice(colonIdx + 1);
                return (
                  <li key={idx}>
                    <strong className="text-foreground">{title}:</strong>{desc}
                  </li>
                );
              }
              return <li key={idx}>{pt}</li>;
            })}
          </ol>
        </div>
      )}

      {/* 4. Time & Space Complexity Summary Table */}
      <div className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-foreground underline decoration-[#0284c7]/40 underline-offset-4 font-heading">
          Time &amp; Space Complexity Summary
        </h3>
        {topic.complexities && topic.complexities.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-border/80">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-muted/60 border-b border-border text-muted-foreground uppercase text-[11px] font-semibold">
                  <th className="p-2.5">Scope / Operation</th>
                  <th className="p-2.5">Best Time</th>
                  <th className="p-2.5">Average Time</th>
                  <th className="p-2.5">Worst Time</th>
                  <th className="p-2.5">Space</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-foreground font-sans">
                {topic.complexities.map((comp, cIdx) => (
                  <tr key={cIdx} className="hover:bg-muted/30">
                    <td className="p-2.5 font-semibold text-foreground">{comp.operation || "Core Operation"}</td>
                    <td className="p-2.5 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{comp.best || (comp as any).bestTime || "O(1)"}</td>
                    <td className="p-2.5 font-mono text-[#0284c7] dark:text-[#38bdf8]">{comp.avg || "-"}</td>
                    <td className="p-2.5 font-mono text-amber-600 dark:text-amber-400 font-semibold">{comp.worst || (comp as any).worstTime || "O(N)"}</td>
                    <td className="p-2.5 font-mono text-foreground font-semibold">{comp.space || "O(1)"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground font-sans">Standard execution complexity benchmark.</p>
        )}
      </div>

      {/* 5. Architecture Diagram (if present) */}
      {topic.diagram && (
        <div className="space-y-2">
          <h3 className="text-sm sm:text-base font-bold text-foreground underline decoration-[#0284c7]/40 underline-offset-4 font-heading">
            {topic.diagramTitle || "Architecture Diagram"}
          </h3>
          <pre className="p-3.5 rounded-lg bg-muted/40 border border-border/80 font-mono text-xs overflow-x-auto text-foreground/90 whitespace-pre leading-relaxed">
            {topic.diagram}
          </pre>
        </div>
      )}

      {/* In-App Reader Dialog */}
      <MaterialReaderDialog
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
        resource={{
          subject: topic.categoryName,
          title: topic.title,
          unit: "All",
          type: "Lab Material",
          provider: "GeeksforGeeks",
          format: "Web Guide",
          fileUrl: topic.gfgUrl || "",
          description: topic.quickSummary,
          tags: [topic.categoryName, topic.difficulty]
        }}
      />
    </div>
  );
}

export interface DSATopicResourcesProps {
  topic: DSATopic;
}

export function DSATopicResources({ topic }: DSATopicResourcesProps) {
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  return (
    <div className="bg-card border border-border/80 rounded-xl p-5 sm:p-6 shadow-xs space-y-4 font-sans">
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-foreground underline decoration-[#0284c7]/40 underline-offset-4 font-heading">
          References &amp; Learning Resources
        </h3>
        <p className="text-xs text-muted-foreground">
          Textbooks, guides, and practical benchmark problem sets for {topic.title}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
        {topic.gfgUrl && (
          <button
            type="button"
            onClick={() => setIsReaderOpen(true)}
            className="flex items-center justify-between p-3.5 rounded-lg border border-border bg-muted/20 hover:bg-card hover:border-[#0284c7]/50 transition-all text-left cursor-pointer group"
          >
            <div className="space-y-1 min-w-0 pr-2">
              <span className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-[#0284c7] transition-colors truncate block">
                {topic.title} Handbook
              </span>
              <span className="text-[11px] text-[#0284c7] dark:text-[#38bdf8] block">GeeksforGeeks In-App Guide</span>
            </div>
            <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-[#0284c7] shrink-0" />
          </button>
        )}

        <MaterialReaderDialog
          isOpen={isReaderOpen}
          onClose={() => setIsReaderOpen(false)}
          resource={{
            subject: topic.categoryName,
            title: topic.title,
            unit: "All",
            type: "Lab Material",
            provider: "GeeksforGeeks",
            format: "Web Guide",
            fileUrl: topic.gfgUrl || "",
            description: topic.quickSummary,
            tags: [topic.categoryName, topic.difficulty]
          }}
        />

        {topic.practiceProblems.map((prob, idx) => (
          <a
            key={idx}
            href={prob.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-lg border border-border bg-muted/20 hover:bg-card hover:border-[#0284c7]/50 transition-all group"
          >
            <div className="space-y-1 min-w-0 pr-2">
              <span className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-[#0284c7] transition-colors truncate block">
                {prob.title}
              </span>
              <span className="text-[11px] text-muted-foreground block">{prob.platform} Reference</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] text-muted-foreground font-medium px-1.5 py-0.5 rounded bg-muted border border-border">
                {prob.difficulty}
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-[#0284c7]" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export interface DSATopicNavigationProps {
  prevTopic?: DSATopic | null;
  nextTopic?: DSATopic | null;
  onSelectTopic: (topic: DSATopic) => void;
}

export function DSATopicNavigation({
  prevTopic,
  nextTopic,
  onSelectTopic,
}: DSATopicNavigationProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-card border border-border/80 rounded-xl shadow-xs text-sm">
      {prevTopic ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelectTopic(prevTopic)}
          className="gap-1.5 text-xs sm:text-sm h-9 px-3.5 cursor-pointer text-foreground hover:text-[#0284c7] hover:border-[#0284c7]/40"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="truncate max-w-[160px] sm:max-w-none">Prev: {prevTopic.title}</span>
        </Button>
      ) : (
        <div />
      )}

      {nextTopic ? (
        <Button
          size="sm"
          onClick={() => onSelectTopic(nextTopic)}
          className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm gap-1.5 font-semibold h-9 px-4 cursor-pointer"
        >
          <span className="truncate max-w-[160px] sm:max-w-none">Next: {nextTopic.title}</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}

export interface DSATopicArticleProps {
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
      <DSATopicOverview
        topic={topic}
        isCompleted={isCompleted}
        onToggleCompleted={onToggleCompleted}
      />

      {/* Compiler / Live Visualizer */}
      {topic.categoryId?.startsWith("dbms-") ||
      topic.id?.startsWith("dbms-") ||
      topic.codeSnippets?.some((s) => s.language?.toLowerCase() === "sql") ? (
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

      <DSATopicResources topic={topic} />

      <DSATopicNavigation
        prevTopic={prevTopic}
        nextTopic={nextTopic}
        onSelectTopic={onSelectTopic}
      />
    </div>
  );
}
