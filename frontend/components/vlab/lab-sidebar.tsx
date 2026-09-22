"use client";

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
  Award,
  Users
} from "lucide-react";

export type LabTab =
  | "introduction"
  | "video-tutorials"
  | "dsa-roadmap"
  | "objective"
  | "experiments"
  | "quizzes"
  | "course-alignment"
  | "resources"
  | "feedback"
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

const DEFAULT_TABS: { id: LabTab; label: string; icon: React.ElementType }[] = [
  { id: "introduction", label: "Introduction", icon: BookOpen },
  { id: "video-tutorials", label: "Video Tutorials", icon: Video },
  { id: "dsa-roadmap", label: "Topic Roadmap & Resources", icon: Layers },
  { id: "objective", label: "Objective", icon: Target },
  { id: "experiments", label: "List of experiments", icon: ListTree },
  { id: "quizzes", label: "Self-Assessment Quiz", icon: FileQuestion },
  { id: "course-alignment", label: "Course Alignment", icon: GraduationCap },
  { id: "resources", label: "Resources & Tutorials", icon: ExternalLink },
  { id: "feedback", label: "Feedback", icon: MessageSquareHeart },
];

const C_PROGRAMMING_TABS: { id: LabTab; label: string; icon: React.ElementType }[] = [
  { id: "nptel-plan", label: "8-Week NPTEL Study Plan", icon: BookOpen },
  { id: "dsa-roadmap", label: "Weekly Topic Roadmap", icon: Layers },
  { id: "experiments", label: "Weekly Experiments", icon: ListTree },
  { id: "quizzes", label: "Weekly Evaluation Tests", icon: FileQuestion },
  { id: "mini-projects", label: "AI&DS Mini Projects & Champions", icon: Sparkles },
  { id: "video-tutorials", label: "Video Masterclasses", icon: Video },
  { id: "introduction", label: "Lab Overview & Goal", icon: Target },
  { id: "resources", label: "NPTEL Portal & Resources", icon: ExternalLink },
  { id: "feedback", label: "Feedback", icon: MessageSquareHeart },
];

export function LabSidebar({
  activeTab,
  onTabChange,
  experimentsCount = 6,
  resourcesCount = 6,
  labId,
  className
}: LabSidebarProps) {
  const tabs = labId === "c-programming" ? C_PROGRAMMING_TABS : DEFAULT_TABS;

  return (
    <aside className={cn("w-full lg:w-72 shrink-0", className)}>
      <div className="bg-card/80 backdrop-blur-md rounded-2xl border border-border p-4 sticky top-24 shadow-sm space-y-2.5">
        <div className="px-3 py-2 border-b border-border/50 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-sans">
            {labId === "c-programming" ? "NPTEL AI&DS Navigation" : "Lab Navigation"}
          </span>
          {labId === "c-programming" && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary/10 text-primary border border-primary/20">
              8 Weeks
            </span>
          )}
        </div>

        <nav className="space-y-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 font-bold"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("h-4.5 w-4.5 shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                  <span>{tab.label}</span>
                </div>

                {tab.id === "video-tutorials" && (
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold tracking-tight border",
                      isActive ? "bg-primary-foreground/20 text-primary-foreground border-white/20" : "bg-primary/10 text-primary border-primary/20"
                    )}
                  >
                    2 Tracks
                  </span>
                )}

                {tab.id === "experiments" && (
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold border",
                      isActive ? "bg-primary-foreground/20 text-primary-foreground border-white/20" : "bg-muted/80 text-foreground/80 border-border/60"
                    )}
                  >
                    {experimentsCount}
                  </span>
                )}

                {tab.id === "quizzes" && (
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold border",
                      isActive ? "bg-primary-foreground/20 text-primary-foreground border-white/20" : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                    )}
                  >
                    {labId === "c-programming" ? "8 Tests" : "5-Q"}
                  </span>
                )}

                {tab.id === "resources" && (
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold border",
                      isActive ? "bg-primary-foreground/20 text-primary-foreground border-white/20" : "bg-muted/80 text-foreground/80 border-border/60"
                    )}
                  >
                    {resourcesCount}
                  </span>
                )}

                {tab.id === "mini-projects" && (
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold border",
                      isActive ? "bg-primary-foreground/20 text-primary-foreground border-white/20" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                    )}
                  >
                    6 Projects
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
