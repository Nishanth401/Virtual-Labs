"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Eye, Code2, HelpCircle, Trophy, Clock, Cpu, Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MultiLangCodeViewer, MultiLangCodeSnippets } from "@/components/visualizer/code/multi-lang-code-viewer";
import { PredictStepQuiz, PredictQuestion } from "@/components/visualizer/common/predict-step-quiz";

export interface DSALearningShellProps {
  title: string;
  category: string;
  description: string;
  realWorldUseCase?: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  learnContent: {
    overview: string;
    steps: string[];
    keyConcepts: { title: string; description: string }[];
  };
  codeSnippets: MultiLangCodeSnippets;
  activeLineMap?: {
    java?: number;
    python?: number;
    javascript?: number;
    typescript?: number;
  };
  predictQuestions?: PredictQuestion[];
  children: React.ReactNode;
}

export function DSALearningShell({
  title,
  category,
  description,
  realWorldUseCase,
  timeComplexity,
  spaceComplexity,
  learnContent,
  codeSnippets,
  activeLineMap,
  predictQuestions,
  children,
}: DSALearningShellProps) {
  const [activeTab, setActiveTab] = useState("visualize");

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="h-8 gap-1 pl-2 text-muted-foreground hover:text-foreground">
              <Link href="/visualizer">
                <ArrowLeft className="h-4 w-4" /> Visualizers
              </Link>
            </Button>
            <span className="text-muted-foreground">/</span>
            <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider text-blue-500 border-blue-500/30">
              {category}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight font-heading flex items-center gap-3">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground max-w-3xl">{description}</p>
        </div>

        {/* Complexity Quick Badges */}
        <div className="flex flex-wrap items-center gap-2 bg-muted/40 p-2.5 rounded-xl border border-border/40">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-card text-xs">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-muted-foreground">Avg Time:</span>
            <span className="font-mono font-bold text-amber-500">{timeComplexity.average}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-card text-xs">
            <Cpu className="h-3.5 w-3.5 text-purple-500" />
            <span className="text-muted-foreground">Space:</span>
            <span className="font-mono font-bold text-purple-500">{spaceComplexity}</span>
          </div>
        </div>
      </div>

      {/* Main 4-Tab Learning System Switcher */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 max-w-2xl bg-muted/70 p-1 border border-border/60 rounded-xl">
          <TabsTrigger value="learn" className="gap-2 text-xs font-medium data-[state=active]:bg-background">
            <BookOpen className="h-4 w-4 text-emerald-500" />
            <span>1. Learn</span>
          </TabsTrigger>
          <TabsTrigger value="visualize" className="gap-2 text-xs font-medium data-[state=active]:bg-background">
            <Eye className="h-4 w-4 text-blue-500" />
            <span>2. Visualize</span>
          </TabsTrigger>
          <TabsTrigger value="code" className="gap-2 text-xs font-medium data-[state=active]:bg-background">
            <Code2 className="h-4 w-4 text-purple-500" />
            <span>3. Multi-Lang Code</span>
          </TabsTrigger>
          <TabsTrigger value="practice" className="gap-2 text-xs font-medium data-[state=active]:bg-background">
            <HelpCircle className="h-4 w-4 text-amber-500" />
            <span>4. Predict & Practice</span>
          </TabsTrigger>
        </TabsList>

        {/* 🎓 TAB 1: LEARN */}
        <TabsContent value="learn" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-heading flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-emerald-500" /> Concept Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>{learnContent.overview}</p>

                <h4 className="font-semibold text-foreground text-sm pt-2">Step-by-Step Logic:</h4>
                <ol className="list-decimal list-inside space-y-1.5 pl-1">
                  {learnContent.steps.map((step, idx) => (
                    <li key={idx} className="text-xs text-foreground/90">
                      {step}
                    </li>
                  ))}
                </ol>

                {realWorldUseCase && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-950 dark:text-emerald-200 mt-4">
                    <span className="font-bold">Real-World Application: </span>
                    {realWorldUseCase}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Complexity Cards */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-heading">Complexity Analysis</CardTitle>
                <CardDescription>Asymptotic performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs p-2 rounded-lg bg-muted/40">
                    <span className="text-muted-foreground">Best Case Time</span>
                    <span className="font-mono font-bold text-emerald-500">{timeComplexity.best}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs p-2 rounded-lg bg-muted/40">
                    <span className="text-muted-foreground">Average Case Time</span>
                    <span className="font-mono font-bold text-amber-500">{timeComplexity.average}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs p-2 rounded-lg bg-muted/40">
                    <span className="text-muted-foreground">Worst Case Time</span>
                    <span className="font-mono font-bold text-red-500">{timeComplexity.worst}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs p-2 rounded-lg bg-muted/40">
                    <span className="text-muted-foreground">Space Complexity</span>
                    <span className="font-mono font-bold text-purple-500">{spaceComplexity}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="font-semibold text-xs text-foreground mb-2">Key Takeaways:</h4>
                  <div className="space-y-2">
                    {learnContent.keyConcepts.map((item, idx) => (
                      <div key={idx} className="p-2 rounded-md bg-card border border-border/40 text-xs">
                        <span className="font-medium text-foreground">{item.title}: </span>
                        <span className="text-muted-foreground">{item.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 👁️ TAB 2: VISUALIZE */}
        <TabsContent value="visualize" className="space-y-4">
          {children}
        </TabsContent>

        {/* 💻 TAB 3: MULTI-LANG CODE */}
        <TabsContent value="code" className="space-y-4">
          <MultiLangCodeViewer
            title={`${title} - Implementation`}
            snippets={codeSnippets}
            activeLineMap={activeLineMap}
          />
        </TabsContent>

        {/* 🎯 TAB 4: PRACTICE & PREDICT */}
        <TabsContent value="practice" className="space-y-4 max-w-3xl">
          <PredictStepQuiz
            algorithmName={title}
            questions={
              predictQuestions && predictQuestions.length > 0
                ? predictQuestions
                : [
                    {
                      id: "q1",
                      question: `What is the average time complexity of ${title}?`,
                      options: [timeComplexity.best, timeComplexity.average, timeComplexity.worst, "O(n^3)"],
                      correctIndex: 1,
                      explanation: `The average case runtime of ${title} is ${timeComplexity.average}.`,
                    },
                    {
                      id: "q2",
                      question: `What is the space complexity required by ${title}?`,
                      options: [spaceComplexity, "O(n^2)", "O(2^n)", "O(n log n)"],
                      correctIndex: 0,
                      explanation: `${title} uses ${spaceComplexity} space complexity during runtime.`,
                    },
                  ]
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
