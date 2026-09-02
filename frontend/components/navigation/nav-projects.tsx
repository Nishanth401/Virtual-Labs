"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { type LucideIcon, ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export interface ProjectItem {
  name: string;
  url: string;
  icon: LucideIcon;
  description?: string;
}

export interface NavProjectsProps {
  title: string;
  icon?: LucideIcon;
  projects: ProjectItem[];
  defaultOpen?: boolean;
  accentColor?: string;
  iconColor?: string;
}

export function NavProjects({
  title,
  icon: CategoryIcon,
  projects,
  defaultOpen = false,
  accentColor = "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30",
  iconColor = "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400",
}: NavProjectsProps) {
  const pathname = usePathname();

  // Auto-expand only if current route belongs to this section
  const hasActiveItem = projects.some((p) => pathname === p.url);
  const [isOpen, setIsOpen] = useState(defaultOpen || hasActiveItem);

  useEffect(() => {
    if (hasActiveItem) {
      setIsOpen(true);
    }
  }, [pathname, hasActiveItem]);

  return (
    <div className="space-y-1.5 py-1.5 px-2">
      {/* Category Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50 rounded-xl transition-all border border-transparent hover:border-border/60 group shadow-2xs"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {CategoryIcon && (
            <div className={`p-1.5 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs ${iconColor}`}>
              <CategoryIcon className="h-4 w-4" />
            </div>
          )}
          <span className="font-heading tracking-wide text-xs font-bold truncate">{title}</span>
          <Badge
            variant="outline"
            className={`text-[10px] px-1.5 py-0 font-heading font-bold rounded-md shrink-0 ${accentColor}`}
          >
            {projects.length}
          </Badge>
        </div>
        <div className="text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-transform duration-200">
          {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        </div>
      </button>

      {/* Accordion Content List */}
      {isOpen && (
        <div className="space-y-1 pl-2 pt-0.5 border-l-2 border-border/70 dark:border-border/40 ml-4">
          {projects.map((item) => {
            const isActive = pathname === item.url;
            const Icon = item.icon;

            return (
              <Link
                key={item.url}
                href={item.url}
                prefetch={true}
                title={item.description || item.name}
                className={`group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-heading font-semibold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30 dark:bg-gradient-to-r dark:from-blue-600/25 dark:to-indigo-600/15 dark:text-blue-300 dark:border dark:border-blue-500/40"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`p-1.5 rounded-lg border transition-all ${
                      isActive
                        ? "bg-white/20 border-white/30 text-white dark:bg-blue-600 dark:text-white dark:border-blue-400 dark:shadow-sm"
                        : "bg-slate-100 border-slate-200 text-slate-600 group-hover:border-slate-300 group-hover:text-blue-600 dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-400 dark:group-hover:border-slate-700 dark:group-hover:text-blue-400 dark:group-hover:bg-slate-800/80"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                  </div>
                  <span className="truncate font-heading">{item.name}</span>
                </div>

                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-blue-400 animate-pulse shrink-0" />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
