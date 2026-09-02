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
  Layers,
  ArrowRightLeft,
  Calculator,
  MessageSquare,
  Hash,
  ArrowDownUp,
  FlaskConical,
  Code2,
  GitBranch,
  ArrowRight,
  Sparkles,
  Award,
  TrendingUp,
  Flag,
  Vote,
  Search,
  BookOpen,
  SquareStack,
  SquareChevronLeft,
  List,
  Database,
  ExternalLink
} from "lucide-react";

interface VisualizerCardItem {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
  badge: string;
  badgeColor?: string;
}

const VISUALIZER_SECTIONS: { title: string; desc: string; icon: React.ElementType; items: VisualizerCardItem[] }[] = [
  {
    title: "Sorting Simulators",
    desc: "Interactive vertical bar chart animations with timeline scrubbers, audio frequency synthesis, and live Java execution pointers.",
    icon: ArrowDownUp,
    items: [
      { name: "Bubble Sort", description: "Adjacent comparison and swapping with early-termination flag", href: "/visualizer/bubble-sort", icon: ArrowDownUp, badge: "O(n²)" },
      { name: "Selection Sort", description: "Minimum index scanning and linear partition placement", href: "/visualizer/selection-sort", icon: ArrowDownUp, badge: "O(n²)" },
      { name: "Insertion Sort", description: "Online card sorting with adaptive backward shifting", href: "/visualizer/insertion-sort", icon: ArrowDownUp, badge: "O(n²)" },
      { name: "Merge Sort", description: "Divide-and-conquer O(n log n) recursive split and stable merge", href: "/visualizer/merge-sort", icon: ArrowDownUp, badge: "O(n log n)" },
      { name: "Quick Sort", description: "Lomuto pivot partitioning and recursive sub-array sorting", href: "/visualizer/quick-sort", icon: ArrowDownUp, badge: "O(n log n)" },
      { name: "Heap Sort", description: "Max-heap construction and root extraction sorting", href: "/visualizer/heap-sort", icon: ArrowDownUp, badge: "O(n log n)" },
      { name: "Cyclic Sort", description: "In-place number placement pattern for range 1 to N", href: "/visualizer/cyclic-sort", icon: ArrowDownUp, badge: "O(n)" },
      { name: "Counting Sort", description: "Non-comparison frequency tallying and cumulative sum prefix", href: "/visualizer/counting-sort", icon: ArrowDownUp, badge: "O(n+k)" },
    ],
  },
  {
    title: "Searching Simulators",
    desc: "Logarithmic and linear interval probe visualizers with comparisons counters.",
    icon: Search,
    items: [
      { name: "Linear Search", description: "Sequential scan across unsorted memory elements", href: "/visualizer/linear-search", icon: Search, badge: "O(n)" },
      { name: "Binary Search", description: "Logarithmic space halving with Left, Mid, Right pointers", href: "/visualizer/binary-search", icon: Search, badge: "O(log n)" },
    ],
  },
  {
    title: "Array & Algorithmic Patterns",
    desc: "Master classical competitive programming and interview paradigms.",
    icon: BrainCircuit,
    items: [
      { name: "Two Pointers", description: "Inward and synchronized stepping for Two Sum II and Container With Most Water", href: "/visualizer/two-pointers", icon: ArrowRightLeft, badge: "O(n)" },
      { name: "Sliding Window", description: "Contiguous overlay tracking running sum and subarray metrics", href: "/visualizer/sliding-window", icon: ArrowRightLeft, badge: "O(n)" },
      { name: "Kadane's Algorithm", description: "Maximum contiguous subarray sum tracking with dynamic resets", href: "/visualizer/kadanes-algorithm", icon: TrendingUp, badge: "O(n)" },
      { name: "Prefix Sum", description: "Precomputed cumulative array and O(1) Range Sum Queries", href: "/visualizer/prefix-sum", icon: Calculator, badge: "O(1) Query" },
      { name: "Difference Array", description: "O(1) interval range updates with prefix sum reconstruction", href: "/visualizer/difference-array", icon: Layers, badge: "O(1) Update" },
      { name: "Dutch National Flag", description: "3-way partitioning of 0s, 1s, and 2s in one single pass", href: "/visualizer/dutch-national-flag", icon: Flag, badge: "O(n)" },
      { name: "Boyer-Moore Majority", description: "Identify majority elements (> N/2) in O(1) space", href: "/visualizer/boyer-moore", icon: Vote, badge: "O(1) Space" },
      { name: "Custom Recursion Studio", description: "Build custom recursive algorithms with real-time call tree and stack frames", href: "/visualizer/custom-recursion", icon: Code2, badge: "Interactive" },
    ],
  },
  {
    title: "Core Data Structures",
    desc: "Dynamic heap memory structures with pointer manipulation animations.",
    icon: Layers,
    items: [
      { name: "Stack (LIFO)", description: "Push, pop, peek with TOP pointer tracking and overflow guards", href: "/visualizer/stack", icon: SquareStack, badge: "LIFO" },
      { name: "Queue (FIFO)", description: "Enqueue at Rear, Dequeue at Front with circular modulo wrap", href: "/visualizer/queue", icon: SquareChevronLeft, badge: "FIFO" },
      { name: "Linked List", description: "Singly, Doubly, and Circular dynamic heap node linkages", href: "/visualizer/linked-list", icon: List, badge: "O(1) Head" },
      { name: "Binary Search Tree", description: "BST insertion, lookup, and Inorder / Preorder traversals", href: "/visualizer/binary-tree", icon: Binary, badge: "O(h)" },
      { name: "AVL Tree", description: "Self-balancing BST with LL, RR, LR, RL rotation animations", href: "/visualizer/avl-tree", icon: TreePine, badge: "O(log n)" },
      { name: "Binary Heap", description: "Max-heap and min-heap with percolate-up and percolate-down", href: "/visualizer/heap", icon: Database, badge: "Priority" },
    ],
  },
  {
    title: "Graphs & Applied Algorithms",
    desc: "Graph traversal, shortest path networks, and information encoding.",
    icon: GitBranch,
    items: [
      { name: "Dijkstra's Algorithm", description: "Greedy single-source shortest path with priority relaxation", href: "/visualizer/dijkstra", icon: GitBranch, badge: "O((V+E)logV)" },
      { name: "Huffman Coding", description: "Lossless prefix tree encoding and compression bitstreams", href: "/visualizer/huffman", icon: Hash, badge: "Greedy" },
      { name: "Message Queue", description: "Asynchronous producer-consumer buffer simulation", href: "/visualizer/queue-applications", icon: MessageSquare, badge: "Applied" },
      { name: "Infix to Postfix", description: "Shunting-yard operator precedence parser using stacks", href: "/visualizer/stack-applications", icon: Code2, badge: "Parser" },
      { name: "Polynomial Math", description: "Polynomial term multiplication and addition with linked lists", href: "/visualizer/polynomial", icon: Calculator, badge: "Algebra" },
    ],
  },
];

export default function VisualizerPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto py-2">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-border p-6 sm:p-8 backdrop-blur-md shadow-lg">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-mono font-bold text-xs">
              <Sparkles className="h-3.5 w-3.5 mr-1 text-primary" /> Visualizer Studio &amp; Simulators
            </Badge>
            <Badge variant="secondary" className="text-xs font-mono">
              24+ Interactive Simulators
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-foreground font-heading tracking-tight">
            Interactive Algorithm &amp; Data Structure Studios
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Experience high-performance simulations featuring timeline scrubbers, vertical bar charts, audio sound synthesis, live Java execution line pointers, and step-by-step memory inspections.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold gap-2 text-xs shadow-md">
              <Link href="/dg-visualization">
                <Sparkles className="h-4 w-4" />
                <span>Launch DG Visualization (12 Modules)</span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="border-border font-semibold gap-2 text-xs">
              <Link href="/practice">
                <Award className="h-4 w-4 text-amber-500" />
                <span>Master Coding Interview 150 Sheets</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Visualizer Sections */}
      <div className="space-y-10">
        {VISUALIZER_SECTIONS.map((section) => {
          const SectionIcon = section.icon;

          return (
            <div key={section.title} className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-border/60">
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <SectionIcon className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-heading text-foreground">{section.title}</h2>
                  <p className="text-xs text-muted-foreground">{section.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {section.items.map((item) => {
                  const ItemIcon = item.icon;

                  return (
                    <Card
                      key={item.name}
                      className="group border-border bg-card/80 hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between"
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="p-2 rounded-lg bg-muted text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <ItemIcon className="h-4 w-4" />
                          </div>
                          <Badge variant="outline" className="font-mono text-[10px] text-primary border-primary/20">
                            {item.badge}
                          </Badge>
                        </div>
                        <CardTitle className="text-sm font-bold mt-2 group-hover:text-primary transition-colors">
                          {item.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="p-4 pt-0 space-y-3">
                        <CardDescription className="text-xs line-clamp-2 leading-relaxed">
                          {item.description}
                        </CardDescription>

                        <div className="pt-2 border-t border-border/40 flex justify-end">
                          <Button asChild size="sm" variant="ghost" className="h-7 text-xs gap-1 group-hover:text-primary p-0">
                            <Link href={item.href}>
                              <span>Open Studio</span>
                              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}