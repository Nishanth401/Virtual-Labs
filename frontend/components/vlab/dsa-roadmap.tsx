"use client";

import React, { useState } from "react";
import { DSA_CATEGORIES_DATA, DSATopic } from "@/data/dsa-topic-data";
import { LAB_ROADMAPS_DATA } from "@/data/all-labs-roadmap-data";
import { DSACategorySidebar } from "./dsa-category-sidebar";
import {
  DSATopicOverview,
  DSATopicResources,
  DSATopicNavigation,
  PersistentVLabToolbar,
} from "./dsa-topic-article";
import { MultiLangCodeViewer } from "@/components/visualizer/code/multi-lang-code-viewer";
import { SqlCompiler } from "./sql-compiler";
import { Badge } from "@/components/ui/badge";
import { Terminal, CheckCircle2 } from "lucide-react";

export const LABS_WITH_CODE_EDITOR = new Set([
  "c-programming",
  "python-programming",
  "oops-java",
  "data-structures",
  "dbms-lab",
]);

interface DSARoadmapProps {
  labId?: string;
  sidebar?: React.ReactNode;
}

export function DSARoadmap({ labId = "data-structures", sidebar }: DSARoadmapProps) {
  const labRoadmap = LAB_ROADMAPS_DATA[labId];
  const categories = labRoadmap?.categories || DSA_CATEGORIES_DATA;

  // Collect flat list of all topics across categories for prev/next calculations
  const allTopics: DSATopic[] = categories.flatMap((cat) => cat.topics);

  const [activeTopic, setActiveTopic] = useState<DSATopic>(allTopics[0]);
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);

  // Update activeTopic when labId changes
  React.useEffect(() => {
    if (allTopics.length > 0) {
      setActiveTopic(allTopics[0]);
    }
  }, [labId]);

  const currentIndex = allTopics.findIndex((t) => t.id === activeTopic?.id);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const handleToggleCompleted = (topicId: string) => {
    setCompletedTopicIds((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const isSqlTopic =
    activeTopic?.categoryId?.startsWith("dbms-") ||
    activeTopic?.id?.startsWith("dbms-") ||
    activeTopic?.codeSnippets?.some((s) => s.language?.toLowerCase() === "sql");

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* 1. TOP ROW: 3 SUITABLE & FLEXIBLE BLOCKS (NAV + CATEGORIES + TOPIC OVERVIEW) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full min-w-0">
        {/* Block 1: Main Lab Navigation Sidebar */}
        {sidebar && (
          <div className="lg:col-span-3 xl:col-span-3 min-w-0">
            {sidebar}
          </div>
        )}

        {/* Block 2: Topic & Experiment Category Sidebar */}
        <div className={sidebar ? "lg:col-span-4 xl:col-span-3 min-w-0" : "lg:col-span-4 min-w-0"}>
          <DSACategorySidebar
            categories={categories}
            activeTopicId={activeTopic ? activeTopic.id : ""}
            onSelectTopic={setActiveTopic}
            completedTopicIds={completedTopicIds}
            roadmapTitle={labRoadmap?.title}
            className="w-full"
          />
        </div>

        {/* Block 3: Topic Overview & Complexity Summary */}
        <div className={sidebar ? "lg:col-span-5 xl:col-span-6 min-w-0" : "lg:col-span-8 min-w-0"}>
          {activeTopic && (
            <DSATopicOverview
              topic={activeTopic}
              isCompleted={completedTopicIds.includes(activeTopic.id)}
              onToggleCompleted={handleToggleCompleted}
              className="w-full"
            />
          )}
        </div>
      </div>

      {/* 2. CENTER SECTION: LIVE COMPILER / CODE RUNNER OR ARCHITECTURE WORKBENCH */}
      {activeTopic && (
        <div className="w-full space-y-8">
          <div className="w-full">
            {LABS_WITH_CODE_EDITOR.has(labId) ? (
              isSqlTopic ? (
                <SqlCompiler
                  title={`${activeTopic.title}`}
                  subtitle="Interactive Relational SQL Studio & Live Query Execution Sandbox"
                  initialSql={
                    activeTopic.codeSnippets?.find((s) => s.language?.toLowerCase() === "sql")?.code ||
                    activeTopic.codeSnippets?.[0]?.code ||
                    ""
                  }
                  currentExperimentId={activeTopic.id}
                />
              ) : (
                <MultiLangCodeViewer
                  title={`${activeTopic.title} - Implementation`}
                  subtitle="Interactive Multi-Language Source Code & Live Compiler Runner"
                  defaultLanguage={
                    labId === "c-programming"
                      ? "cpp"
                      : labId === "python-programming"
                      ? "python"
                      : "java"
                  }
                  snippets={activeTopic.codeSnippets || []}
                />
              )
            ) : (
              /* High-contrast Concept Architecture & Workflow Specification (NO code editor) */
              <div className="p-5 sm:p-6 rounded-none bg-card border border-border/80 shadow-xs space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-[#0284c7]" />
                      <h3 className="font-bold text-base text-foreground font-heading">
                        {activeTopic.title} Architecture &amp; Execution Specification
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Theoretical model, system architecture flow, and verification benchmarks.
                    </p>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs rounded-none bg-sky-500/10 text-[#0284c7] border-sky-500/30">
                    SIMULATION &amp; CONCEPT WORKBENCH
                  </Badge>
                </div>

                {activeTopic.diagram && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground">
                      {activeTopic.diagramTitle || "System Architecture & Protocol Flow"}
                    </h4>
                    <pre className="p-4 rounded-none bg-slate-950 text-emerald-400 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed max-h-72">
                      <code>{activeTopic.diagram}</code>
                    </pre>
                  </div>
                )}

                {activeTopic.keyPoints && activeTopic.keyPoints.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground">
                      Key Engineering Concepts
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-foreground/90">
                      {activeTopic.keyPoints.map((kp, kIdx) => (
                        <li key={kIdx} className="p-2.5 rounded-none bg-muted/20 border border-border/50 flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#0284c7] shrink-0 mt-0.5" />
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. CURATED TOPIC RESOURCES & REFERENCES */}
          <DSATopicResources topic={activeTopic} />

          {/* 4. PREV / NEXT TOPIC NAVIGATION */}
          <DSATopicNavigation
            prevTopic={prevTopic}
            nextTopic={nextTopic}
            onSelectTopic={setActiveTopic}
          />
        </div>
      )}

      {/* Persistent Bottom-Right Quick Navigation Toolbar */}
      <PersistentVLabToolbar />
    </div>
  );
}
