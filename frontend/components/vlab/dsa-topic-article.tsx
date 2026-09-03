"use client";

import React, { useState } from "react";
import { DSATopic } from "@/data/dsa-topic-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Clock,
  PlayCircle,
  Code2,
  ChevronLeft,
  ChevronRight,
  Zap,
  Trophy,
} from "lucide-react";

import { DSATopicVisualizer } from "@/components/dsa-visualization/dsa-topic-visualizer";

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
  const [activeTab, setActiveTab] = useState<"code-practice" | "visualizer">("code-practice");

  return (
    <div className="space-y-6 flex-1 min-w-0">
      {/* Top Concise Banner Header */}
      <div className="bg-card/90 backdrop-blur-md border border-border p-6 rounded-2xl shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
            <span className="text-primary font-bold">{topic.categoryName}</span>
            <span>/</span>
            <span>{topic.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={topic.gfgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/20"
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
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 font-bold h-8"
                  : "text-xs gap-1.5 h-8"
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
            <Badge variant="outline" className="text-xs font-mono bg-primary/10 text-primary border-primary/30 font-bold px-3 py-1">
              {topic.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs font-mono px-3 py-1">
              <Clock className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" /> {topic.estimatedTime}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Mode Toggle: Code & Practice vs Interactive Visualizer */}
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full space-y-6">
        <TabsList className="grid grid-cols-2 w-full p-1.5 bg-muted/60 backdrop-blur-md rounded-2xl border border-border h-auto">
          <TabsTrigger value="code-practice" className="text-sm py-3 gap-2 font-bold">
            <BookOpen className="h-4.5 w-4.5 text-indigo-400" /> Key Concepts &amp; Practice ({topic.practiceProblems.length})
          </TabsTrigger>
          <TabsTrigger
            value="visualizer"
            className="text-sm py-3 gap-2 font-bold text-primary"
          >
            <PlayCircle className="h-4.5 w-4.5 text-primary" /> Interactive Visualizer
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: CODE IMPLEMENTATIONS & PRACTICE PROBLEMS */}
        <TabsContent value="code-practice" className="space-y-6">
          {/* Quick Key-Points Summary Cards (3 Bullet Points Max) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topic.keyPoints.map((pt, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-border/80 bg-card/80 flex items-start gap-3 shadow-xs">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0 mt-0.5 font-mono">
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
              <span className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-2">
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

          {/* Extensive Practice Problems Section */}
          <Card className="border-border bg-card/90 shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-lg font-bold font-heading">
                  Coding Practice Problems ({topic.practiceProblems.length})
                </CardTitle>
              </div>
              <Badge variant="outline" className="text-xs font-mono bg-amber-500/10 text-amber-500 border-amber-500/30 font-bold px-2.5 py-0.5">
                LeetCode &amp; GFG
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {topic.practiceProblems.map((prob, idx) => (
                <a
                  key={idx}
                  href={prob.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30 hover:bg-primary/5 hover:border-primary/40 transition-all group shadow-xs"
                >
                  <div className="space-y-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                        {idx + 1}. {prob.title}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{prob.platform}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant="outline"
                      className={
                        prob.difficulty === "Easy"
                          ? "text-emerald-500 border-emerald-500/30 text-xs font-mono font-bold"
                          : prob.difficulty === "Medium"
                          ? "text-amber-500 border-amber-500/30 text-xs font-mono font-bold"
                          : "text-rose-500 border-rose-500/30 text-xs font-mono font-bold"
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
        </TabsContent>

        {/* TAB 2: INTERACTIVE VISUALIZER */}
        <TabsContent value="visualizer" className="space-y-6">
          <Card className="border-border bg-card/90 shadow-sm p-5">
            <DSATopicVisualizer topic={topic} />
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Prev/Next Topic Navigation */}
      <div className="flex items-center justify-between p-4 bg-card/90 border border-border rounded-2xl shadow-sm text-sm font-semibold">
        {prevTopic ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectTopic(prevTopic)}
            className="gap-2 text-sm hover:bg-muted h-10 px-4"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="truncate max-w-[160px] sm:max-w-none">Prev: {prevTopic.title}</span>
          </Button>
        ) : <div />}

        {nextTopic ? (
          <Button
            size="sm"
            onClick={() => onSelectTopic(nextTopic)}
            className="bg-primary hover:bg-primary/90 text-white text-sm gap-2 font-bold shadow-sm h-10 px-4"
          >
            <span className="truncate max-w-[160px] sm:max-w-none">Next: {nextTopic.title}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : <div />}
      </div>
    </div>
  );
}
