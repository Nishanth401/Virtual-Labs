"use client";

import React from "react";
import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: string;
  badgeColor?: string;
}

export function NavMain({ items }: { items: NavMainItem[] }) {
  const pathname = usePathname();

  return (
    <div className="space-y-1.5 py-2 px-2 border-b border-border/60 pb-3">
      <div className="px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Platform Navigation
      </div>
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.url;
          const Icon = item.icon;

          return (
            <Link
              key={item.url}
              href={item.url}
              prefetch={true}
              className={`group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-heading font-semibold transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {Icon && (
                  <div
                    className={`p-1.5 rounded-lg border transition-all ${
                      isActive
                        ? "bg-white/20 border-white/30 text-white"
                        : "bg-slate-100 border-slate-200 text-slate-600 group-hover:border-slate-300 group-hover:text-blue-600 dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-400 dark:group-hover:border-slate-700 dark:group-hover:text-blue-400"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                  </div>
                )}
                <span className="truncate font-heading">{item.title}</span>
              </div>

              {item.badge ? (
                <Badge
                  variant="outline"
                  className={`text-[9px] px-1.5 py-0 font-heading font-bold ${
                    item.badgeColor || "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
                  }`}
                >
                  {item.badge}
                </Badge>
              ) : isActive ? (
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse shrink-0" />
              ) : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
