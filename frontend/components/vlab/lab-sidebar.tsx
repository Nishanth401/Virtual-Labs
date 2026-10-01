"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useStudentProgress } from "@/hooks/use-student-progress";
import { EXPERIMENTS_DATA } from "@/data/experiments";
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
  Users,
  Award,
  ArrowUp,
} from "lucide-react";

export type LabTab =
  | "introduction"
  | "objective"
  | "experiments"
  | "target-audience"
  | "course-alignment"
  | "video-tutorials"
  | "dsa-roadmap"
  | "quizzes"
  | "resources"
  | "feedback"
  | "manual-specs"
  | "case-study"
  | "c-study-plan"
  | "mini-projects";

interface LabSidebarProps {
  activeTab: LabTab;
  onTabChange: (tab: LabTab) => void;
  experimentsCount?: number;
  resourcesCount?: number;
  progressPercent?: number;
  labId?: string;
  className?: string;
}

// Fixed 10-Tab Structure specified in Virtual Labs Prompts
const DEFAULT_TABS: { id: LabTab; label: string; icon: React.ElementType }[] = [
  { id: "introduction", label: "Introduction", icon: BookOpen },
  { id: "objective", label: "Objective", icon: Target },
  { id: "experiments", label: "List of Experiments", icon: ListTree },
  { id: "target-audience", label: "Target Audience", icon: Users },
  { id: "course-alignment", label: "Course Alignment", icon: GraduationCap },
  { id: "video-tutorials", label: "Video Tutorials", icon: Video },
  { id: "dsa-roadmap", label: "Topic Roadmap", icon: Layers },
  { id: "quizzes", label: "Self-Assessment Quiz", icon: FileQuestion },
  { id: "resources", label: "Resources & Tutorials", icon: ExternalLink },
  { id: "feedback", label: "Feedback", icon: MessageSquareHeart },
];

// Official Tabs for Artificial Intelligence Lab (IIIT Hyderabad / MoE Virtual Labs)
const AI_LAB_TABS: { id: LabTab; label: string; icon: React.ElementType }[] = [
  { id: "introduction", label: "Introduction", icon: BookOpen },
  { id: "objective", label: "Objective", icon: Target },
  { id: "experiments", label: "List of Experiments", icon: ListTree },
  { id: "target-audience", label: "Target Audience", icon: Users },
  { id: "course-alignment", label: "Course Alignment", icon: GraduationCap },
  { id: "video-tutorials", label: "Video Tutorials", icon: Video },
  { id: "quizzes", label: "Self-Assessment Quiz", icon: FileQuestion },
  { id: "resources", label: "Resources & Tutorials", icon: ExternalLink },
  { id: "feedback", label: "Feedback", icon: MessageSquareHeart },
];

export function LabSidebar({
  activeTab,
  onTabChange,
  experimentsCount = 8,
  resourcesCount = 6,
  progressPercent,
  labId,
  className,
}: LabSidebarProps) {
  const { progress } = useStudentProgress();

  // Compute real progress: completed experiments that belong to this lab
  const computedProgress = useMemo(() => {
    if (progressPercent !== undefined) return progressPercent;
    if (!labId) return 0;
    const labExperiments = EXPERIMENTS_DATA.filter((e) => e.labId === labId);
    const total = labExperiments.length;
    if (total === 0) return 0;
    const done = labExperiments.filter((e) =>
      progress.completedExperiments.includes(e.id)
    ).length;
    return Math.round((done / total) * 100);
  }, [progressPercent, labId, progress.completedExperiments]);
  const tabs = labId === "artificial-intelligence" ? AI_LAB_TABS : DEFAULT_TABS;
  const displayPercent = computedProgress;

  return (
    <aside className={cn("w-full lg:w-64 shrink-0", className)}>
      <div className="sticky top-24 pr-4 border-r border-border/60 min-h-[460px] flex flex-col justify-between">
        <div className="space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "w-full text-left py-2 px-2.5 text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer rounded-none",
                  isActive
                    ? "text-[#ea580c] dark:text-[#f97316] font-bold bg-orange-500/10 dark:bg-orange-950/20 border-l-2 border-l-[#ea580c]"
                    : "text-[#0284c7] dark:text-[#38bdf8] font-normal hover:text-[#ea580c] hover:bg-muted/40"
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <tab.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[#ea580c]" : "text-[#0284c7] dark:text-[#38bdf8]")} />
                  <span className="truncate">{tab.label}</span>
                </div>

                {tab.id === "experiments" && (
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[11px] font-mono shrink-0",
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

        {/* Progress Indicator & Floating Back to Top Button */}
        <div className="pt-4 mt-6 border-t border-border/60 space-y-3">
          <div className="bg-muted/30 p-2.5 rounded-none border border-border/60 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
              <span>Progress</span>
              <span className="font-mono text-[#0284c7] dark:text-[#38bdf8] font-bold">{displayPercent}%</span>
            </div>
            <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#0284c7] to-[#ea580c] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, displayPercent))}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium text-muted-foreground hover:text-[#0284c7] hover:bg-muted/50 border border-dashed border-border/80 transition-all cursor-pointer rounded-none"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
