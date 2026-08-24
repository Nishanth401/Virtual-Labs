"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FlaskConical,
  Sparkles,
  BookOpen,
  Menu,
  Award,
  GraduationCap,
  FolderOpen,
  Calendar,
  Users,
  Search,
  ExternalLink,
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/global/mode-toggle";
import { RoleSwitcherDialog } from "@/components/navigation/role-switcher-dialog";
import { Badge } from "@/components/ui/badge";

const DSA_VISUALIZERS_LIST = [
  { title: "Bubble Sort", desc: "Adjacent comparisons & bubbling passes", url: "/visualizer/bubble-sort" },
  { title: "Selection Sort", desc: "Minimum index scanning & swaps", url: "/visualizer/selection-sort" },
  { title: "Insertion Sort", desc: "Key extraction & backward shifts", url: "/visualizer/insertion-sort" },
  { title: "Stack Visualizer", desc: "LIFO operations, push/pop/peek", url: "/visualizer/stack" },
  { title: "Queue Visualizer", desc: "FIFO operations, enqueue/dequeue", url: "/visualizer/queue" },
  { title: "Linked List", desc: "Singly, Doubly, Circular node links", url: "/visualizer/linked-list" },
  { title: "Binary Search Tree", desc: "Dynamic BST insert & traversals", url: "/visualizer/binary-tree" },
  { title: "AVL Tree", desc: "Self-balancing rotations (LL/RR/LR/RL)", url: "/visualizer/avl-tree" },
  { title: "Dijkstra's Algorithm", desc: "Shortest path finding on graphs", url: "/visualizer/dijkstra" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md shadow-xs">
      {/* Top National Virtual Labs (MoE / NMEICT) Ribbon */}
      <div className="bg-gradient-to-r from-amber-600 via-primary-700 to-emerald-700 text-white py-1 px-4 text-center text-[11px] font-medium flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
            Govt. of India Initiative
          </span>
          <span className="hidden sm:inline">Ministry of Education • NMEICT Mission • Sakshat Portal</span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-[10px]">
          <span className="font-semibold">Nodal Center: VSB Engineering College, Karur</span>
          <a
            href="https://www.vlab.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white/90 hover:text-white underline underline-offset-2"
          >
            <span>vlab.co.in</span>
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 font-bold text-base sm:text-lg text-foreground hover:opacity-90 transition-opacity">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-cyan-600 text-white shadow-md shadow-primary/20">
            <FlaskConical className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black tracking-tight leading-tight text-lg">Virtual Labs</span>
              <Badge variant="outline" className="text-[9px] px-1 py-0 border-primary/40 text-primary font-bold">
                vlab.co.in
              </Badge>
            </div>
            <span className="text-[10px] text-muted-foreground font-normal">Department of AI & Data Science</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center gap-1">
          <Button asChild variant="ghost" size="sm" className="text-xs font-semibold">
            <Link href="/">Home</Link>
          </Button>

          <Button asChild variant="ghost" size="sm" className="text-xs font-semibold">
            <Link href="/labs">Broad Areas & Labs</Link>
          </Button>

          <Button asChild variant="ghost" size="sm" className="text-xs font-semibold">
            <Link href="/labs/data-structures">Data Structures Lab</Link>
          </Button>

          <Button asChild variant="ghost" size="sm" className="text-xs font-semibold">
            <Link href="/courses">Curriculum</Link>
          </Button>

          <Button asChild variant="ghost" size="sm" className="text-xs font-semibold">
            <Link href="/resources">Resource Vault</Link>
          </Button>

          <Button asChild variant="ghost" size="sm" className="text-xs font-semibold">
            <Link href="/events">Events</Link>
          </Button>

          <Button asChild variant="ghost" size="sm" className="text-xs font-semibold">
            <Link href="/faculty">Faculty</Link>
          </Button>

          {/* DSA Visualizer Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-xs font-semibold h-8">
                  DSA Visualizers
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[450px] p-4 bg-popover/95 backdrop-blur-md rounded-xl border border-border shadow-xl">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/50">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Interactive Algorithm Simulators
                      </span>
                      <Link href="/visualizer" className="text-xs text-primary font-bold hover:underline">
                        View All (11) →
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {DSA_VISUALIZERS_LIST.slice(0, 6).map((item) => (
                        <NavigationMenuLink key={item.title} asChild>
                          <Link
                            href={item.url}
                            className="p-2 rounded-lg hover:bg-muted/70 transition-colors block text-left"
                          >
                            <div className="font-bold text-xs text-foreground">{item.title}</div>
                            <div className="text-[11px] text-muted-foreground line-clamp-1">{item.desc}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button asChild variant="default" size="sm" className="text-xs font-bold bg-primary text-white hover:bg-primary/90 ml-1">
            <Link href="/dashboard">
              <Award className="h-3.5 w-3.5 mr-1" /> Student Portal
            </Link>
          </Button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <RoleSwitcherDialog />
          <ModeToggle />

          {/* Mobile Sheet Trigger */}
          <div className="xl:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col justify-between">
                <div>
                  <SheetHeader className="mb-4">
                    <SheetTitle className="flex items-center gap-2 text-left">
                      <FlaskConical className="h-5 w-5 text-primary" />
                      <span>Virtual Labs</span>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-1.5">
                    <Button asChild variant="ghost" className="justify-start text-sm" onClick={() => setIsOpen(false)}>
                      <Link href="/">Home Portal</Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start text-sm" onClick={() => setIsOpen(false)}>
                      <Link href="/labs">Broad Areas & Labs Catalogue</Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start text-sm" onClick={() => setIsOpen(false)}>
                      <Link href="/labs/data-structures">Data Structures Virtual Lab</Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start text-sm" onClick={() => setIsOpen(false)}>
                      <Link href="/courses">Semester Curriculum (Sem 1-8)</Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start text-sm" onClick={() => setIsOpen(false)}>
                      <Link href="/resources">Resource Vault</Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start text-sm" onClick={() => setIsOpen(false)}>
                      <Link href="/events">Department Events & Bootcamps</Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start text-sm" onClick={() => setIsOpen(false)}>
                      <Link href="/faculty">Faculty Profiles</Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start text-sm" onClick={() => setIsOpen(false)}>
                      <Link href="/visualizer">DSA Visualizers Studio</Link>
                    </Button>
                    <Button asChild variant="default" className="justify-start text-sm bg-primary text-white mt-2" onClick={() => setIsOpen(false)}>
                      <Link href="/dashboard">Student Progress & Verified Certificate</Link>
                    </Button>
                  </div>
                </div>

                <SheetFooter className="flex-col items-start gap-2 pt-4 border-t">
                  <div className="text-xs text-muted-foreground">
                    National Mission on Education through ICT • VSB Engineering College
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}