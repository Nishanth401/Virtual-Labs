"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type ExperimentTab =
  | "aim"
  | "theory"
  | "pretest"
  | "procedure"
  | "simulation"
  | "posttest"
  | "references"
  | "contributors"
  | "feedback";

interface ExperimentNavigationSidebarProps {
  activeTab: ExperimentTab;
  onTabChange: (tab: ExperimentTab) => void;
  className?: string;
}

export const EXPERIMENT_TABS: { id: ExperimentTab; label: string }[] = [
  { id: "aim", label: "Aim" },
  { id: "theory", label: "Theory" },
  { id: "pretest", label: "Pretest" },
  { id: "procedure", label: "Procedure" },
  { id: "simulation", label: "Simulation" },
  { id: "posttest", label: "Posttest" },
  { id: "references", label: "References" },
  { id: "contributors", label: "Contributors" },
  { id: "feedback", label: "Feedback" },
];

export function ExperimentNavigationSidebar({
  activeTab,
  onTabChange,
  className,
}: ExperimentNavigationSidebarProps) {
  return (
    <aside className={cn("w-full lg:w-56 shrink-0", className)}>
      <div className="sticky top-24 space-y-1 pr-4 border-r border-border/80 min-h-[420px]">
        {EXPERIMENT_TABS.map((tab) => {
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
            </button>
          );
        })}
      </div>
    </aside>
  );
}
