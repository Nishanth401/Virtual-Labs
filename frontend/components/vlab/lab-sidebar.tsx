"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Target,
  ListTree,
  GraduationCap,
  MessageSquareHeart,
  FileQuestion,
  Layers,
  ExternalLink,
  Video,
  Sparkles,
  Users
} from "lucide-react";

export type LabTab =
  | "introduction"
  | "objective"
  | "experiments"
  | "target-audience"
  | "course-alignment"
  | "feedback"
  | "video-tutorials"
  | "dsa-roadmap"
  | "quizzes"
  | "resources"
  | "nptel-plan"
  | "mini-projects";

interface LabSidebarProps {
  activeTab: LabTab;
  onTabChange: (tab: LabTab) => void;
  experimentsCount?: number;
  resourcesCount?: number;
  labId?: string;
  className?: string;
}

// Standard National Virtual Labs Tabs matching Screenshot 112419 - 112512 & 112910 - 112939
const DEFAULT_TABS: { id: LabTab; label: string; icon: React.ElementType }[] = [
  { id: "introduction", label: "Introduction", icon: BookOpen },
  { id: "objective", label: "Objective", icon: Target },
  { id: "experiments", label: "List of experiments", icon: ListTree },
  { id: "target-audience", label: "Target Audience", icon: Users },
  { id: "course-alignment", label: "Course Alignment", icon: GraduationCap },
  { id: "video-tutorials", label: "Video Tutorials", icon: Video },
  { id: "dsa-roadmap", label: "Topic Roadmap", icon: Layers },
  { id: "quizzes", label: "Self-Assessment Quiz", icon: FileQuestion },
  { id: "resources", label: "Resources & Tutorials", icon: ExternalLink },
  { id: "feedback", label: "Feedback", icon: MessageSquareHeart },
];

const C_PROGRAMMING_TABS: { id: LabTab; label: string; icon: React.ElementType }[] = [
  { id: "nptel-plan", label: "8-Week NPTEL Study Plan", icon: BookOpen },
  { id: "introduction", label: "Introduction", icon: Target },
  { id: "objective", label: "Objective", icon: Target },
  { id: "experiments", label: "List of experiments", icon: ListTree },
  { id: "target-audience", label: "Target Audience", icon: Users },
  { id: "course-alignment", label: "Course Alignment", icon: GraduationCap },
  { id: "dsa-roadmap", label: "Weekly Topic Roadmap", icon: Layers },
  { id: "quizzes", label: "Weekly Evaluation Tests", icon: FileQuestion },
  { id: "mini-projects", label: "AI&DS Mini Projects", icon: Sparkles },
  { id: "video-tutorials", label: "Video Masterclasses", icon: Video },
  { id: "feedback", label: "Feedback", icon: MessageSquareHeart },
];

export function LabSidebar({
  activeTab,
  onTabChange,
  experimentsCount = 6,
  resourcesCount = 6,
  labId,
  className,
}: LabSidebarProps) {
  const tabs = labId === "c-programming" ? C_PROGRAMMING_TABS : DEFAULT_TABS;

  return (
    <aside className={cn("w-full lg:w-64 shrink-0", className)}>
      <div className="sticky top-24 pr-4 border-r border-border/80 min-h-[420px] space-y-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "w-full text-left py-2.5 px-3 text-sm font-semibold transition-all rounded-lg flex items-center justify-between cursor-pointer",
                isActive
                  ? "text-[#ea580c] dark:text-[#f97316] font-bold bg-orange-500/10 dark:bg-orange-950/30 border-l-4 border-l-[#ea580c] pl-3"
                  : "text-[#0284c7] dark:text-[#38bdf8] hover:text-[#ea580c] hover:bg-muted/40"
              )}
            >
              <span>{tab.label}</span>

              {tab.id === "experiments" && (
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-mono",
                    isActive ? "bg-orange-500/20 text-[#ea580c]" : "bg-muted text-muted-foreground"
                  )}
                >
                  {experimentsCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
