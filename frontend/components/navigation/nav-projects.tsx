"use client";

import React from "react";
import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function NavProjects({
  title,
  projects,
}: {
  title: string;
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
    description?: string;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 py-1.5 block">
        {title}
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          const isActive = pathname === item.url;
          return (
            <SidebarMenuItem key={item.url}>
              <a
                href={item.url}
                title={item.description || item.name}
                className={`flex w-full items-center gap-2 overflow-hidden rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-primary/15 text-primary font-bold border-l-2 border-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0 text-primary/80" />
                <span className="truncate">{item.name}</span>
              </a>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
