"use client";

import { cn } from "@/lib/utils";
import { BookOpen, Target, ListTree, GraduationCap, MessageSquareHeart, FileQuestion, Sparkles, ExternalLink, Video } from "lucide-react";

export type LabTab =
  | "introduction"
  | "video-tutorials"
  | "dsa-roadmap"
  | "objective"
  | "experiments"
  | "quizzes"
  | "course-alignment"
  | "resources"
  | "feedback";

interface LabSidebarProps {
  activeTab: LabTab;
  onTabChange: (tab: LabTab) => void;
  experimentsCount?: number;
  resourcesCount?: number;
}

const TABS: { id: LabTab; label: string; icon: React.ElementType }[] = [
  { id: "introduction", label: "Introduction", icon: BookOpen },
  { id: "video-tutorials", label: "Video Tutorials", icon: Video },
  { id: "dsa-roadmap", label: "Roadmap & Practice", icon: Sparkles },
  { id: "objective", label: "Objective", icon: Target },
  { id: "experiments", label: "List of experiments", icon: ListTree },
  { id: "quizzes", label: "Self-Assessment Quiz", icon: FileQuestion },
  { id: "course-alignment", label: "Course Alignment", icon: GraduationCap },
  { id: "resources", label: "Resources & Tutorials", icon: ExternalLink },
  { id: "feedback", label: "Feedback", icon: MessageSquareHeart },
];

export function LabSidebar({ activeTab, onTabChange, experimentsCount = 6, resourcesCount = 6 }: LabSidebarProps) {
  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-card/80 backdrop-blur-md rounded-2xl border border-secondary/40 p-4 sticky top-24 shadow-sm space-y-2">
        <div className="px-3 py-2 border-b border-border/50">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
            Lab Navigation
          </span>
        </div>

        <nav className="space-y-1.5">
          {TABS.map((tab) => {
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
                      "px-2 py-0.5 rounded text-xs font-mono font-bold",
                      isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
                    )}
                  >
                    2 Tracks
                  </span>
                )}

                {tab.id === "experiments" && (
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-xs font-mono font-bold",
                      isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {experimentsCount}
                  </span>
                )}

                {tab.id === "resources" && (
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-xs font-mono font-bold",
                      isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {resourcesCount}
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
