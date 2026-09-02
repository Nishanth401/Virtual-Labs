"use client";

import * as React from "react";
import {
  Binary,
  Home,
  Database,
  BrainCircuit,
  FlaskConical,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/navigation/nav-main";
import { Badge } from "@/components/ui/badge";

const navItems = [
  {
    title: "VLab Home",
    url: "/",
    icon: FlaskConical,
  },
  {
    title: "Lab Catalogue",
    url: "/labs",
    icon: Database,
    badge: "LABS",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
  },
  {
    title: "DG Visualization",
    url: "/dg-visualization",
    icon: BrainCircuit,
    badge: "12 MODULES",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  {
    title: "AI & ML Labs",
    url: "/labs/ai-machine-learning",
    icon: Binary,
  },
  {
    title: "Complexity & DS Matrix",
    url: "/visualizer/complexity-matrix",
    icon: TrendingUp,
    badge: "MATRIX",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
  },
  {
    title: "Student Portal",
    url: "/dashboard",
    icon: Home,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border/80 bg-background text-foreground dark:bg-[#0d1117]/95 backdrop-blur-md">
      {/* Brand Header */}
      <SidebarHeader>
        <div className="px-4 py-4 border-b border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
              <FlaskConical className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xs font-bold font-heading text-slate-900 dark:text-white tracking-tight leading-none">
                Virtual Labs
              </h1>
              <p className="text-[10px] text-blue-600 dark:text-blue-400 font-mono mt-1 font-semibold">
                AI &amp; DS Department
              </p>
            </div>
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" title="System Online" />
        </div>
      </SidebarHeader>

      {/* Main Content Area */}
      <SidebarContent className="px-1 py-2 space-y-2">
        <NavMain items={navItems} />
      </SidebarContent>

      {/* Footer Status Widget */}
      <SidebarFooter className="p-3 border-t border-border/60">
        <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 dark:bg-blue-900/30 dark:border-blue-500/20 dark:text-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span className="text-[11px] font-semibold">Interactive Mode</span>
          </div>
          <Badge variant="outline" className="text-[9px] bg-blue-600 text-white border-transparent dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-400/30">
            v2.4
          </Badge>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}