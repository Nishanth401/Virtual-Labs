"use client";

import React, { useState } from "react";
import { DSA_CATEGORIES_DATA, DSATopic } from "@/data/dsa-topic-data";
import { LAB_ROADMAPS_DATA } from "@/data/all-labs-roadmap-data";
import { DSACategorySidebar } from "./dsa-category-sidebar";
import { DSATopicArticle } from "./dsa-topic-article";

interface DSARoadmapProps {
  labId?: string;
}

export function DSARoadmap({ labId = "data-structures" }: DSARoadmapProps) {
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

  const currentIndex = allTopics.findIndex((t) => t.id === activeTopic.id);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const handleToggleCompleted = (topicId: string) => {
    setCompletedTopicIds((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start w-full min-w-0">
      {/* Left Collapsible Categories Navigation */}
      <DSACategorySidebar
        categories={categories}
        activeTopicId={activeTopic ? activeTopic.id : ""}
        onSelectTopic={setActiveTopic}
        completedTopicIds={completedTopicIds}
      />

      {/* Right Code & Practice View with Embedded Visualizers */}
      {activeTopic && (
        <DSATopicArticle
          topic={activeTopic}
          prevTopic={prevTopic}
          nextTopic={nextTopic}
          onSelectTopic={setActiveTopic}
          isCompleted={completedTopicIds.includes(activeTopic.id)}
          onToggleCompleted={handleToggleCompleted}
        />
      )}
    </div>
  );
}
