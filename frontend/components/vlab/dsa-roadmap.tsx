"use client";

import React, { useState } from "react";
import { DSA_CATEGORIES_DATA, DSATopic } from "@/data/dsa-topic-data";
import { LAB_ROADMAPS_DATA } from "@/data/all-labs-roadmap-data";
import { DSACategorySidebar } from "./dsa-category-sidebar";
import {
  DSATopicOverview,
  DSATopicResources,
  DSATopicNavigation,
} from "./dsa-topic-article";
import { MultiLangCodeViewer } from "@/components/visualizer/code/multi-lang-code-viewer";
import { SqlCompiler } from "./sql-compiler";

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

      {/* 2. CENTER SECTION: FULL-WIDTH LIVE COMPILER & CODE RUNNER STUDIO */}
      {activeTopic && (
        <div className="w-full space-y-8">
          <div className="w-full">
            {isSqlTopic ? (
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
                snippets={activeTopic.codeSnippets || []}
              />
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
    </div>
  );
}
