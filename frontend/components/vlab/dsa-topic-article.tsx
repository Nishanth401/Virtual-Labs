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
  Sparkles,
  Copy,
  Check
} from "lucide-react";

// Visualizer imports
import { StackVisualizer } from "@/components/visualizer/stack/stack-visualizer";
import { QueueVisualizer } from "@/components/visualizer/queue/queue-visualizer";
import { LinkedListVisualizer } from "@/components/visualizer/linked-list/linked-list-visualizer";
import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer";
import { RecursionVisualizerPanel } from "@/components/visualizer/recursion/recursion-visualizer-panel";
import { BinaryTreeVisualizer } from "@/components/visualizer/binary-tree/binary-tree-visualizer";
import { AVLTreeVisualizer } from "@/components/visualizer/avl-tree/avl-tree-visualizer";
import { HeapVisualizer } from "@/components/visualizer/heap/heap-visualizer";
import { DijkstraVisualizer } from "@/components/visualizer/dijkstra/dijkstra-visualizer";

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
  const [selectedLang, setSelectedLang] = useState<string>(
    topic.codeSnippets[0]?.language || "java"
  );
  const [copied, setCopied] = useState<boolean>(false);

  // Sync selected lang when topic changes
  React.useEffect(() => {
    setSelectedLang(topic.codeSnippets[0]?.language || "java");
  }, [topic.id]);

  const activeSnippet =
    topic.codeSnippets.find((s) => s.language === selectedLang) ||
    topic.codeSnippets[0];

  const handleCopyCode = () => {
    if (!activeSnippet) return;
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 flex-1 min-w-0">
      {/* Top Concise Banner Header */}
      <div className="bg-card/90 backdrop-blur-md border border-border p-5 rounded-2xl shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="text-primary font-bold">{topic.categoryName}</span>
            <span>/</span>
            <span>{topic.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={topic.gfgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20"
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
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 font-bold"
                  : "text-xs gap-1.5"
              }
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isCompleted ? "Completed" : "Mark Done"}</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight font-heading">
              {topic.title}
            </h1>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              {topic.quickSummary}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="outline" className="text-xs font-mono bg-primary/10 text-primary border-primary/30 font-semibold">
              {topic.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs font-mono">
              <Clock className="h-3 w-3 mr-1 text-muted-foreground" /> {topic.estimatedTime}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Mode Toggle: Code & Practice vs Interactive Visualizer */}
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full space-y-5">
        <TabsList className="grid grid-cols-2 w-full p-1 bg-muted/60 backdrop-blur-md rounded-xl border border-border h-auto">
          <TabsTrigger value="code-practice" className="text-xs py-2.5 gap-1.5 font-bold">
            <Code2 className="h-4 w-4 text-indigo-400" /> Code Implementations &amp; Practice ({topic.practiceProblems.length})
          </TabsTrigger>
          <TabsTrigger
            value="visualizer"
            className="text-xs py-2.5 gap-1.5 font-bold text-primary"
            disabled={!topic.visualizerType}
          >
            <PlayCircle className="h-4 w-4 text-primary" /> Interactive Visualizer
            {!topic.visualizerType && <span className="text-[10px] opacity-60">(Theory Only)</span>}
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: CODE IMPLEMENTATIONS & PRACTICE PROBLEMS */}
        <TabsContent value="code-practice" className="space-y-5">
          {/* Quick Key-Points Summary Cards (3 Bullet Points Max) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {topic.keyPoints.map((pt, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-border/80 bg-card/80 flex items-start gap-2.5">
                <span className="flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary font-bold text-[10px] shrink-0 mt-0.5 font-mono">
                  {idx + 1}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {pt}
                </p>
              </div>
            ))}
          </div>

          {/* Asymptotic Complexity Quick Strip */}
          <Card className="border-border bg-card/80 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-500" /> Time &amp; Space Complexity Summary
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
              {topic.complexities.map((c, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-muted/40 border border-border/50 text-center">
                  <div className="text-[10px] text-muted-foreground font-sans truncate">{c.operation}</div>
                  <div className="font-bold text-emerald-500 mt-0.5">{c.avg || c.worst}</div>
                  <div className="text-[10px] text-teal-400">{c.space}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Visual Architecture Diagram & Flowchart */}
          {topic.diagram && (
            <Card className="border-border bg-card/90 shadow-sm p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                <span className="font-bold text-sm text-foreground font-heading">
                  {topic.diagramTitle || "Architecture Flowchart & Step-by-step Execution Diagram"}
                </span>
              </div>
              <div className="rounded-xl border border-emerald-500/20 bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed shadow-inner">
                <pre><code>{topic.diagram}</code></pre>
              </div>
            </Card>
          )}

          {/* Multi-Language Code Snippets */}
          <Card className="border-border bg-card/90 shadow-sm p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-indigo-400" />
                <span className="font-bold text-sm text-foreground font-heading">
                  Algorithm Implementation Code
                </span>
              </div>

              {/* Language Switcher Tabs */}
              <div className="flex items-center gap-1 bg-muted p-1 rounded-lg border border-border">
                {topic.codeSnippets.map((s) => (
                  <button
                    key={s.language}
                    onClick={() => setSelectedLang(s.language)}
                    className={`px-3 py-1 text-xs font-bold font-mono rounded-md transition-all ${
                      selectedLang === s.language
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyCode}
                  className="h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground ml-1"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              </div>
            </div>

            {/* Code Box */}
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-4">
              <pre className="text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                <code>{activeSnippet?.code}</code>
              </pre>
            </div>
          </Card>

          {/* Extensive Practice Problems Section */}
          <Card className="border-border bg-card/90 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-base font-bold font-heading">
                  Coding Practice Problems ({topic.practiceProblems.length})
                </CardTitle>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono bg-amber-500/10 text-amber-500 border-amber-500/30">
                LeetCode &amp; GFG
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {topic.practiceProblems.map((prob, idx) => (
                <a
                  key={idx}
                  href={prob.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-muted/30 hover:bg-primary/5 hover:border-primary/40 transition-all group"
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
        </TabsContent>

        {/* TAB 2: INTERACTIVE VISUALIZER */}
        <TabsContent value="visualizer" className="space-y-5">
          <Card className="border-border bg-card/90 shadow-sm p-4">
            {topic.visualizerType === "stack" && (
              <StackVisualizer content={<p>Java Stack LIFO simulation sandbox.</p>} />
            )}
            {topic.visualizerType === "queue" && (
              <QueueVisualizer content={<p>Java Queue FIFO simulation sandbox.</p>} />
            )}
            {topic.visualizerType === "linked-list" && (
              <LinkedListVisualizer content={<p>Java Singly Linked List dynamic pointer visualizer.</p>} />
            )}
            {topic.visualizerType === "bubble-sort" && (
              <SortingVisualizer
                algorithm="bubble"
                title="Bubble Sort Simulation"
                description="Observe adjacent comparison passes and bubbling of maximum unsorted values."
              />
            )}
            {topic.visualizerType === "selection-sort" && (
              <SortingVisualizer
                algorithm="selection"
                title="Selection Sort Simulation"
                description="Observe minimum index scanning across unsorted partition and minimal memory swaps."
              />
            )}
            {topic.visualizerType === "insertion-sort" && (
              <SortingVisualizer
                algorithm="insertion"
                title="Insertion Sort Simulation"
                description="Observe element extraction, backward shifting, and adaptive linear performance."
              />
            )}
            {topic.visualizerType === "recursion" && (
              <RecursionVisualizerPanel />
            )}
            {topic.visualizerType === "binary-tree" && (
              <BinaryTreeVisualizer />
            )}
            {topic.visualizerType === "avl-tree" && (
              <AVLTreeVisualizer />
            )}
            {topic.visualizerType === "heap" && (
              <HeapVisualizer />
            )}
            {topic.visualizerType === "dijkstra" && (
              <DijkstraVisualizer />
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Prev/Next Topic Navigation */}
      <div className="flex items-center justify-between p-4 bg-card/90 border border-border rounded-2xl shadow-sm text-xs font-semibold">
        {prevTopic ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectTopic(prevTopic)}
            className="gap-1.5 text-xs hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="truncate max-w-[140px] sm:max-w-none">Prev: {prevTopic.title}</span>
          </Button>
        ) : <div />}

        {nextTopic ? (
          <Button
            size="sm"
            onClick={() => onSelectTopic(nextTopic)}
            className="bg-primary hover:bg-primary/90 text-white text-xs gap-1.5 font-bold shadow-sm"
          >
            <span className="truncate max-w-[140px] sm:max-w-none">Next: {nextTopic.title}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : <div />}
      </div>
    </div>
  );
}
