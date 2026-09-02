"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DSA_CATEGORIES_DATA, DSACategory, DSATopic } from "@/data/dsa-topic-data";
import { DSACategorySidebar } from "@/components/vlab/dsa-category-sidebar";
import { DGTopicVisualizer } from "@/components/dg-visualization/dg-topic-visualizer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BookOpen,
  PlayCircle,
  Code2,
  CheckCircle2,
  ExternalLink,
  Clock,
  Zap,
  ChevronLeft,
  ChevronRight,
  Trophy,
  BrainCircuit,
  ArrowRight,
  Sparkles,
  Layers
} from "lucide-react";

export default function DGVisualizationPage() {
  const allTopics: DSATopic[] = DSA_CATEGORIES_DATA.flatMap((cat) => cat.topics);
  const [activeTopic, setActiveTopic] = useState<DSATopic>(allTopics[0]);
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"visualizer" | "code" | "theory" | "practice">("visualizer");
  const [selectedCodeLang, setSelectedCodeLang] = useState<"java" | "python" | "cpp" | "javascript">("java");

  const currentIndex = allTopics.findIndex((t) => t.id === activeTopic.id);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const handleToggleDone = (topicId: string) => {
    setCompletedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const isDone = completedTopicIds.includes(activeTopic.id);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Hero Banner */}
      <div className="bg-card/90 backdrop-blur-md rounded-2xl border border-border p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-mono font-bold">
              <Sparkles className="h-3.5 w-3.5 mr-1 text-primary" /> DG &amp; DSA Complete Learning Platform
            </Badge>
            <Badge variant="secondary" className="text-xs font-mono">
              12 Core Modules • Top to Bottom
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
            Interactive DSA &amp; DG Visualization System
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Master Data Structures and Algorithms with step-by-step simulations, live execution metrics, multi-language code traces, and curated LeetCode interview practice.
          </p>
        </div>

        {/* Global Progress pill */}
        <div className="flex items-center gap-3 bg-muted/40 p-3 rounded-2xl border border-border shrink-0 font-mono text-xs">
          <div className="text-right">
            <span className="text-[10px] text-muted-foreground block">Curriculum Progress</span>
            <strong className="text-emerald-500 font-bold">
              {completedTopicIds.length} / {allTopics.length} Completed
            </strong>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-500">
            {Math.round((completedTopicIds.length / allTopics.length) * 100)}%
          </div>
        </div>
      </div>

      {/* 2-Column Layout: Left Category Navigation + Right Active Studio */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full min-w-0">
        {/* Left Sidebar */}
        <DSACategorySidebar
          categories={DSA_CATEGORIES_DATA}
          activeTopicId={activeTopic.id}
          onSelectTopic={(t) => {
            setActiveTopic(t);
            setActiveTab("visualizer");
          }}
          completedTopicIds={completedTopicIds}
        />

        {/* Right Active Content Area */}
        <div className="flex-1 w-full min-w-0 space-y-6">
          {/* Topic Header Card */}
          <div className="bg-card/90 backdrop-blur-md rounded-2xl border border-border p-5 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="text-primary font-bold">{activeTopic.categoryName}</span>
                <span>/</span>
                <span>{activeTopic.title}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeTopic.gfgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20"
                >
                  <span>GeeksforGeeks</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <Button
                  variant={isDone ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleToggleDone(activeTopic.id)}
                  className={
                    isDone
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 font-bold"
                      : "text-xs gap-1.5"
                  }
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{isDone ? "Completed ✓" : "Mark as Done"}</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground font-heading">
                  {activeTopic.title}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                  {activeTopic.quickSummary}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className="text-xs font-mono bg-primary/10 text-primary border-primary/30 font-semibold">
                  {activeTopic.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs font-mono">
                  <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" /> {activeTopic.estimatedTime}
                </Badge>
              </div>
            </div>
          </div>

          {/* Standard Navigation Tabs: Visualizer, Code, Theory & Practice */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full space-y-5">
            <TabsList className="grid grid-cols-4 w-full p-1 bg-muted/60 backdrop-blur-md rounded-xl border border-border h-auto">
              <TabsTrigger value="visualizer" className="text-xs py-2.5 gap-1.5 font-bold text-primary data-[state=active]:bg-background">
                <PlayCircle className="h-4 w-4 text-primary" /> Interactive Simulator
              </TabsTrigger>
              <TabsTrigger value="code" className="text-xs py-2.5 gap-1.5 font-bold data-[state=active]:bg-background">
                <Code2 className="h-4 w-4 text-indigo-400" /> Multi-Language Code
              </TabsTrigger>
              <TabsTrigger value="theory" className="text-xs py-2.5 gap-1.5 font-bold data-[state=active]:bg-background">
                <BookOpen className="h-4 w-4 text-emerald-400" /> Theory &amp; Architecture
              </TabsTrigger>
              <TabsTrigger value="practice" className="text-xs py-2.5 gap-1.5 font-bold data-[state=active]:bg-background">
                <Trophy className="h-4 w-4 text-amber-500" /> Practice ({activeTopic.practiceProblems.length})
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: INTERACTIVE SIMULATOR */}
            <TabsContent value="visualizer" className="space-y-5">
              <Card className="border-border bg-card/90 shadow-sm p-4">
                <DGTopicVisualizer topic={activeTopic} />
              </Card>
            </TabsContent>

            {/* TAB 2: MULTI-LANGUAGE CODE */}
            <TabsContent value="code" className="space-y-5">
              <Card className="border-border bg-card/90 shadow-sm p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-indigo-400" />
                    <span className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">
                      Reference Implementations
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-xl border border-border text-xs">
                    {(["java", "python", "cpp", "javascript"] as const).map((lang) => (
                      <Button
                        key={lang}
                        variant={selectedCodeLang === lang ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedCodeLang(lang)}
                        className="h-7 text-xs font-mono capitalize"
                      >
                        {lang === "cpp" ? "C++" : lang}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-black/90 rounded-xl p-4 border border-border/80 font-mono text-xs overflow-x-auto text-emerald-400 leading-relaxed">
                  <pre>
                    {activeTopic.codeSnippets.find((s) => s.language === selectedCodeLang)?.code ||
                      activeTopic.codeSnippets[0]?.code ||
                      "// Implementation coming soon."}
                  </pre>
                </div>
              </Card>
            </TabsContent>

            {/* TAB 3: THEORY & ARCHITECTURE */}
            <TabsContent value="theory" className="space-y-5">
              {/* 3 Key Points */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeTopic.keyPoints.map((pt, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-border/80 bg-card flex items-start gap-2.5">
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary font-bold text-[10px] shrink-0 mt-0.5 font-mono">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pt}
                    </p>
                  </div>
                ))}
              </div>

              {/* Diagram Banner if exists */}
              {activeTopic.diagram && (
                <Card className="border-border bg-card/90 shadow-sm p-4 space-y-2">
                  <span className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider block">
                    {activeTopic.diagramTitle || "Structural Diagram"}
                  </span>
                  <div className="bg-black/90 rounded-xl p-4 border border-border/80 font-mono text-xs overflow-x-auto text-indigo-300">
                    <pre>{activeTopic.diagram}</pre>
                  </div>
                </Card>
              )}

              {/* Asymptotic Complexity Summary */}
              <Card className="border-border bg-card/90 shadow-sm p-4 space-y-3">
                <span className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-500" /> Asymptotic Complexity Matrix
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                  {activeTopic.complexities.map((c, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-muted/40 border border-border/50 text-center">
                      <div className="text-[10px] text-muted-foreground font-sans truncate">{c.operation}</div>
                      <div className="font-bold text-emerald-500 mt-1">{c.avg || c.worst}</div>
                      <div className="text-[10px] text-teal-400 mt-0.5">{c.space} space</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Real World Applications */}
              {activeTopic.realWorld && (
                <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-xs text-foreground flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold block text-indigo-300 mb-0.5">Real-World Engineering Application:</strong>
                    <span className="text-muted-foreground">{activeTopic.realWorld}</span>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* TAB 4: PRACTICE CHALLENGES */}
            <TabsContent value="practice" className="space-y-5">
              <Card className="border-border bg-card/90 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    <h3 className="text-base font-bold font-heading text-foreground">
                      Curated Practice Challenges ({activeTopic.practiceProblems.length})
                    </h3>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono bg-amber-500/10 text-amber-500 border-amber-500/30">
                    LeetCode &amp; GFG
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {activeTopic.practiceProblems.map((prob, idx) => (
                    <a
                      key={idx}
                      href={prob.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-muted/30 hover:bg-primary/5 hover:border-primary/40 transition-all group"
                    >
                      <div className="space-y-1 min-w-0 pr-2">
                        <span className="font-bold text-xs text-foreground group-hover:text-primary transition-colors truncate block">
                          {idx + 1}. {prob.title}
                        </span>
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
            </TabsContent>
          </Tabs>

          {/* Bottom Prev / Next Navigation Bar */}
          <div className="flex items-center justify-between p-4 bg-card/90 border border-border rounded-2xl shadow-sm text-xs font-semibold">
            {prevTopic ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveTopic(prevTopic);
                  setActiveTab("visualizer");
                }}
                className="gap-1.5 text-xs hover:bg-muted"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="truncate max-w-[140px] sm:max-w-none">Prev: {prevTopic.title}</span>
              </Button>
            ) : <div />}

            {nextTopic ? (
              <Button
                size="sm"
                onClick={() => {
                  setActiveTopic(nextTopic);
                  setActiveTab("visualizer");
                }}
                className="bg-primary hover:bg-primary/90 text-white text-xs gap-1.5 font-bold shadow-sm"
              >
                <span className="truncate max-w-[140px] sm:max-w-none">Next: {nextTopic.title}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
}
