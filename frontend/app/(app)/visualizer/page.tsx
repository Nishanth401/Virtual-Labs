"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BrainCircuit,
  Binary,
  TreePine,
  Box,
  List,
  ArrowLeftRight,
  Calculator,
  MessageSquare,
  Hash,
  ArrowRightLeft,
  ArrowDownUp,
  Layers,
  FlaskConical,
  Code2,
  GitBranch,
  ArrowRight,
  BookOpen,
  Trophy
} from "lucide-react";

const sections = {
  customAndFeatured: [
    {
      name: "Custom Recursion & Method Studio",
      description: "Build custom recursive Java methods with interactive signature builder, AST tracer, recursion tree & JVM call stack.",
      href: "/visualizer/custom-recursion",
      icon: Code2,
      badge: "NEW STUDIO",
      color: "from-blue-500/20 to-indigo-500/20 text-[#1e88e5] border-[#1e88e5]/40"
    },
    {
      name: "Master Coding Practice (LeetCode 150)",
      description: "Interactive practice sheet with company tags (FAANG & Service), difficulty ratings, revision notes & direct problem links.",
      href: "/practice",
      icon: Trophy,
      badge: "INTERVIEW ROADMAP",
      color: "from-amber-500/20 to-orange-500/20 text-amber-500 border-amber-500/40"
    }
  ],
  sorting: [
    {
      name: "Bubble Sort Visualizer",
      description: "Adjacent comparison and swapping pass with early exit flag optimization.",
      href: "/visualizer/bubble-sort",
      icon: ArrowDownUp,
      badge: "O(n²)"
    },
    {
      name: "Selection Sort Visualizer",
      description: "Finds minimum element in unsorted partition. Executes minimal swaps (at most n-1).",
      href: "/visualizer/selection-sort",
      icon: ArrowDownUp,
      badge: "O(n²)"
    },
    {
      name: "Insertion Sort Visualizer",
      description: "Online card sorting. Adaptive O(n) linear performance on nearly sorted inputs.",
      href: "/visualizer/insertion-sort",
      icon: ArrowDownUp,
      badge: "Adaptive"
    },
    {
      name: "Merge Sort Visualizer",
      description: "Divide-and-conquer algorithm with guaranteed O(n log n) stable sorting and recursive split visualization.",
      href: "/visualizer/merge-sort",
      icon: ArrowDownUp,
      badge: "O(n log n)"
    },
    {
      name: "Cyclic Sort Visualizer",
      description: "In-place cycle placement pattern for numbers 1..N with linear O(n) runtime and minimal swaps.",
      href: "/visualizer/cyclic-sort",
      icon: ArrowDownUp,
      badge: "O(n) Pattern"
    },
    {
      name: "Quick Sort Visualizer",
      description: "Pivot partitioning and recursive sub-array sorting with Lomuto partitioning trace.",
      href: "/visualizer/quick-sort",
      icon: ArrowDownUp,
      badge: "O(n log n)"
    },
  ],
  dataStructures: [
    {
      name: "Stack Operations",
      description: "LIFO data structure supporting push, pop, and peek with overflow & underflow checks.",
      href: "/visualizer/stack",
      icon: ArrowLeftRight,
      badge: "LIFO"
    },
    {
      name: "Queue & Circular Buffer",
      description: "FIFO data structure for managing sequential ordered streams and buffer queues.",
      href: "/visualizer/queue",
      icon: ArrowLeftRight,
      badge: "FIFO"
    },
    {
      name: "Linked List Studio",
      description: "Dynamic data structures with nodes connected via references (Singly & Doubly).",
      href: "/visualizer/linked-list",
      icon: List,
      badge: "Dynamic"
    },
    {
      name: "Binary Search Tree (BST)",
      description: "Binary tree maintaining sorted invariant with average O(log n) search and insertion.",
      href: "/visualizer/binary-tree",
      icon: Binary,
      badge: "O(log n)"
    },
    {
      name: "AVL Self-Balancing Tree",
      description: "Self-balancing BST maintaining strict height balance via LL, RR, LR, RL rotations.",
      href: "/visualizer/avl-tree",
      icon: TreePine,
      badge: "Self-Balancing"
    },
    {
      name: "Min / Max Binary Heap",
      description: "Complete binary tree satisfying heap invariant for priority queue scheduling.",
      href: "/visualizer/heap",
      icon: Box,
      badge: "Priority Queue"
    },
  ],
  applications: [
    {
      name: "Infix to Postfix Converter",
      description: "Convert arithmetic expressions to postfix notation using an operator stack.",
      href: "/visualizer/stack-applications",
      icon: Calculator,
      badge: "Stack App"
    },
    {
      name: "Message Queue Pipeline",
      description: "Simulate asynchronous message queues with producer and consumer threads.",
      href: "/visualizer/queue-applications",
      icon: MessageSquare,
      badge: "Queue App"
    },
    {
      name: "Polynomial Multiplication",
      description: "Represent and multiply algebraic polynomials using linked list node arithmetic.",
      href: "/visualizer/polynomial",
      icon: Calculator,
      badge: "Linked List App"
    },
    {
      name: "Huffman Tree Compression",
      description: "Lossless variable-length prefix data compression using Huffman frequency trees.",
      href: "/visualizer/huffman",
      icon: Hash,
      badge: "Tree App"
    },
    {
      name: "Dijkstra's Shortest Path",
      description: "Find single-source shortest paths on weighted non-negative graphs.",
      href: "/visualizer/dijkstra",
      icon: ArrowRightLeft,
      badge: "Graph Search"
    },
  ]
};

export default function VisualizerHubPage() {
  return (
    <div className="container py-6 max-w-7xl mx-auto space-y-10">
      {/* Hero Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-[#1e88e5]/10 text-[#1e88e5] border-[#1e88e5]/30">
            <FlaskConical className="h-3.5 w-3.5 mr-1" /> Department Simulator Suite
          </Badge>
          <Badge variant="secondary" className="text-xs">
            16+ Interactive Studios
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-heading text-foreground">
          DSA Visualization &amp; Practice Studio
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Interactive step-by-step simulators to visualize data structures, custom recursive algorithms, and practice LeetCode 150/75 interview roadmaps with live pointer tracking.
        </p>
      </div>

      {/* Featured Studios (Custom Recursion & Practice Sheets) */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sections.customAndFeatured.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Card className="h-full border-border/80 bg-card hover:border-[#1e88e5] transition-all hover:shadow-lg rounded-2xl group relative overflow-hidden">
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} border shadow-xs group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="text-[10px] font-mono font-bold bg-[#1e88e5]/10 text-[#1e88e5] border-[#1e88e5]/30">
                        {item.badge}
                      </Badge>
                    </div>

                    <CardTitle className="text-xl font-bold font-heading text-foreground group-hover:text-[#1e88e5] transition-colors">
                      {item.name}
                    </CardTitle>

                    <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </CardDescription>

                    <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#1e88e5]">
                      <span>Open Interactive Studio</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Sorting Algorithms Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
            <ArrowDownUp className="h-5 w-5 text-[#1e88e5]" />
            <span>Sorting Algorithms</span>
          </h2>
          <Badge variant="secondary" className="text-xs">{sections.sorting.length} Simulators</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.sorting.map((algo) => {
            const Icon = algo.icon;
            return (
              <Link key={algo.href} href={algo.href}>
                <Card className="h-full border-border/80 bg-card hover:border-[#1e88e5] transition-all hover:shadow-md rounded-2xl group">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-[#1e88e5] group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {algo.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-bold mt-2 group-hover:text-[#1e88e5] transition-colors">
                      {algo.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs leading-relaxed">
                      {algo.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Data Structures Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
            <List className="h-5 w-5 text-[#1e88e5]" />
            <span>Core Data Structures</span>
          </h2>
          <Badge variant="secondary" className="text-xs">6 Simulators</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.dataStructures.map((ds) => {
            const Icon = ds.icon;
            return (
              <Link key={ds.href} href={ds.href}>
                <Card className="h-full border-border/80 bg-card hover:border-[#1e88e5] transition-all hover:shadow-md rounded-2xl group">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-[#1e88e5] group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {ds.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-bold mt-2 group-hover:text-[#1e88e5] transition-colors">
                      {ds.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs leading-relaxed">
                      {ds.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Applications Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
            <Layers className="h-5 w-5 text-[#1e88e5]" />
            <span>Algorithmic Applications &amp; Graphs</span>
          </h2>
          <Badge variant="secondary" className="text-xs">5 Applications</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.applications.map((app) => {
            const Icon = app.icon;
            return (
              <Link key={app.href} href={app.href}>
                <Card className="h-full border-border/80 bg-card hover:border-[#1e88e5] transition-all hover:shadow-md rounded-2xl group">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-[#1e88e5] group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {app.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-bold mt-2 group-hover:text-[#1e88e5] transition-colors">
                      {app.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs leading-relaxed">
                      {app.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}