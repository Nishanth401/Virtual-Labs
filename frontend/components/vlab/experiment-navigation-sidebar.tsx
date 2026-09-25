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
      <div className="sticky top-24 space-y-2 pr-4 border-r border-border/60 min-h-[460px]">
        {EXPERIMENT_TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "w-full text-left py-2 px-2 text-base transition-all flex items-center justify-between cursor-pointer",
                isActive
                  ? "text-[#ea580c] dark:text-[#f97316] font-bold"
                  : "text-[#0284c7] dark:text-[#38bdf8] font-normal hover:text-[#ea580c] hover:underline"
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
