"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
  Layers,
  Sparkles,
  Award,
  TrendingUp,
  Flag,
  Vote,
  Code2,
  GitBranch,
  ArrowRight,
  Zap,
  CheckCircle2,
  Cpu,
  BarChart3,
  BookOpen
} from "lucide-react";

interface VisualizerCard {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
  timeComplexity: string;
  spaceComplexity: string;
  badge?: string;
  accentColor?: string;
}

interface SectionGroup {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  items: VisualizerCard[];
}

const ALL_SECTIONS: SectionGroup[] = [
  // 1. DATA STRUCTURES
  {
    id: "data-structures",
    title: "Core Data Structures",
    subtitle: "Dynamic memory structures with pointer linkages, push/pop mechanisms, and self-balancing trees.",
    icon: Layers,
    items: [
      {
        name: "Linked List",
        description: "Dynamic heap data structure with nodes connected via memory pointers. Explore Singly, Doubly, and Circular linked lists.",
        href: "/visualizer/linked-list",
        icon: List,
        timeComplexity: "O(1) Head",
        spaceComplexity: "O(n)",
        badge: "Pointers",
        accentColor: "from-blue-500/10 to-indigo-500/10 text-blue-500 border-blue-500/30",
      },
      {
        name: "Stack",
        description: "Last-In First-Out (LIFO) data structure supporting push, pop, and peek operations with TOP pointer tracking.",
        href: "/visualizer/stack",
        icon: ArrowLeftRight,
        timeComplexity: "O(1)",
        spaceComplexity: "O(n)",
        badge: "LIFO",
        accentColor: "from-purple-500/10 to-pink-500/10 text-purple-500 border-purple-500/30",
      },
      {
        name: "Queue",
        description: "First-In First-Out (FIFO) data structure for managed buffers with Front and Rear circular modulo wrap.",
        href: "/visualizer/queue",
        icon: ArrowLeftRight,
        timeComplexity: "O(1)",
        spaceComplexity: "O(n)",
        badge: "FIFO",
        accentColor: "from-cyan-500/10 to-teal-500/10 text-cyan-500 border-cyan-500/30",
      },
      {
        name: "Binary Search Tree",
        description: "Binary tree maintaining sorted invariant with logarithmic lookup, insertion, and Inorder/Preorder/Postorder traversals.",
        href: "/visualizer/binary-tree",
        icon: Binary,
        timeComplexity: "O(h)",
        spaceComplexity: "O(n)",
        badge: "BST",
        accentColor: "from-emerald-500/10 to-green-500/10 text-emerald-500 border-emerald-500/30",
      },
      {
        name: "AVL Tree",
        description: "Self-balancing binary search tree that maintains height balance factor via LL, RR, LR, RL rotation passes.",
        href: "/visualizer/avl-tree",
        icon: TreePine,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(n)",
        badge: "Self-Balancing",
        accentColor: "from-emerald-500/10 to-teal-500/10 text-teal-500 border-teal-500/30",
      },
      {
        name: "Binary Heap",
        description: "Complete binary tree satisfying the heap invariant. Switch interactively between Min-Heap and Max-Heap.",
        href: "/visualizer/heap",
        icon: Box,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(n)",
        badge: "Priority Queue",
        accentColor: "from-amber-500/10 to-orange-500/10 text-amber-500 border-amber-500/30",
      },
    ],
  },

  // 2. SORTING ALGORITHMS
  {
    id: "sorting-algorithms",
    title: "Sorting Simulators",
    subtitle: "High-performance vertical bar visualizations with step scrubbers, comparison & swap metrics, and audio pitch synthesis.",
    icon: ArrowDownUp,
    items: [
      {
        name: "Bubble Sort",
        description: "Adjacent comparison and swapping pass with early exit flag. Bubbles maximum unsorted element to the end.",
        href: "/visualizer/bubble-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        badge: "Stable",
        accentColor: "from-rose-500/10 to-red-500/10 text-rose-500 border-rose-500/30",
      },
      {
        name: "Selection Sort",
        description: "Linear scan to find minimum unsorted value and place it in sorted position with minimal total swaps.",
        href: "/visualizer/selection-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        badge: "In-Place",
        accentColor: "from-orange-500/10 to-amber-500/10 text-orange-500 border-orange-500/30",
      },
      {
        name: "Insertion Sort",
        description: "Adaptive online card-sorting algorithm with linear performance on nearly sorted inputs.",
        href: "/visualizer/insertion-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        badge: "Online",
        accentColor: "from-amber-500/10 to-yellow-500/10 text-amber-500 border-amber-500/30",
      },
      {
        name: "Merge Sort",
        description: "Classic divide-and-conquer algorithm splitting arrays into halves and recursively merging ordered subsegments.",
        href: "/visualizer/merge-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        badge: "Divide & Conquer",
        accentColor: "from-blue-500/10 to-cyan-500/10 text-blue-500 border-blue-500/30",
      },
      {
        name: "Quick Sort",
        description: "Lomuto pivot partitioning and recursive sub-array sorting. Industry standard for high cache locality.",
        href: "/visualizer/quick-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        badge: "Partitioning",
        accentColor: "from-indigo-500/10 to-purple-500/10 text-indigo-500 border-indigo-500/30",
      },
      {
        name: "Heap Sort",
        description: "Constructs a max-heap from unsorted elements and repeatedly extracts the root to sort in O(n log n) in-place.",
        href: "/visualizer/heap-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        badge: "In-Place",
        accentColor: "from-violet-500/10 to-purple-500/10 text-violet-500 border-violet-500/30",
      },
      {
        name: "Counting Sort",
        description: "Non-comparison linear sorting using frequency tallying and cumulative prefix sums for discrete integer domains.",
        href: "/visualizer/counting-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n+k)",
        spaceComplexity: "O(k)",
        badge: "Non-Comparison",
        accentColor: "from-teal-500/10 to-emerald-500/10 text-teal-500 border-teal-500/30",
      },
      {
        name: "Cyclic Sort",
        description: "In-place number placement pattern for array containing numbers 1 to N in O(n) time and O(1) space.",
        href: "/visualizer/cyclic-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        badge: "Competitive Pattern",
        accentColor: "from-emerald-500/10 to-green-500/10 text-emerald-500 border-emerald-500/30",
      },
    ],
  },

  // 3. SEARCHING ALGORITHMS
  {
    id: "searching-algorithms",
    title: "Searching Simulators",
    subtitle: "Logarithmic interval bisecting and linear search with comparison step highlights.",
    icon: Search,
    items: [
      {
        name: "Binary Search",
        description: "Logarithmic divide-and-conquer search halving the search space on each iteration using Low, Mid, and High pointers.",
        href: "/visualizer/binary-search",
        icon: Search,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        badge: "Divide & Conquer",
        accentColor: "from-blue-500/10 to-cyan-500/10 text-blue-500 border-blue-500/30",
      },
      {
        name: "Linear Search",
        description: "Sequential element scan across unsorted memory arrays from index 0 to N-1 until target is discovered.",
        href: "/visualizer/linear-search",
        icon: Search,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        badge: "Sequential",
        accentColor: "from-amber-500/10 to-yellow-500/10 text-amber-500 border-amber-500/30",
      },
    ],
  },

  // 4. ALGORITHMIC PATTERNS
  {
    id: "algorithmic-patterns",
    title: "Algorithmic Patterns",
    subtitle: "Essential interview patterns: two pointers, sliding window, prefix sums, and majority vote.",
    icon: BrainCircuit,
    items: [
      {
        name: "Two Pointers",
        description: "Inward & synchronized pointer stepping across sorted arrays. Solve Two Sum II and Container With Most Water in O(n).",
        href: "/visualizer/two-pointers",
        icon: ArrowRightLeft,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        badge: "Pattern",
        accentColor: "from-indigo-500/10 to-blue-500/10 text-indigo-500 border-indigo-500/30",
      },
      {
        name: "Sliding Window",
        description: "Contiguous window overlay tracking running metrics across subarrays. Master fixed-size and dynamic-expansion windows.",
        href: "/visualizer/sliding-window",
        icon: ArrowRightLeft,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        badge: "Pattern",
        accentColor: "from-cyan-500/10 to-blue-500/10 text-cyan-500 border-cyan-500/30",
      },
      {
        name: "Kadane's Algorithm",
        description: "Maximum contiguous subarray sum tracking with dynamic resets. Solve the classic LeetCode 53 problem interactively.",
        href: "/visualizer/kadanes-algorithm",
        icon: TrendingUp,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        badge: "Dynamic",
        accentColor: "from-emerald-500/10 to-teal-500/10 text-emerald-500 border-emerald-500/30",
      },
      {
        name: "Prefix Sum",
        description: "Precomputed cumulative sum array enabling instant O(1) Range Sum Queries across any interval [L, R].",
        href: "/visualizer/prefix-sum",
        icon: Calculator,
        timeComplexity: "O(1) Query",
        spaceComplexity: "O(n)",
        badge: "Range Query",
        accentColor: "from-purple-500/10 to-pink-500/10 text-purple-500 border-purple-500/30",
      },
      {
        name: "Difference Array",
        description: "Efficient O(1) interval range updates with prefix sum reconstruction for multiple concurrent updates.",
        href: "/visualizer/difference-array",
        icon: Layers,
        timeComplexity: "O(1) Update",
        spaceComplexity: "O(n)",
        badge: "Range Update",
        accentColor: "from-violet-500/10 to-indigo-500/10 text-violet-500 border-violet-500/30",
      },
      {
        name: "Dutch National Flag",
        description: "3-way partitioning of 0s, 1s, and 2s in a single pass using Low, Mid, High pointers (LeetCode 75 Sort Colors).",
        href: "/visualizer/dutch-national-flag",
        icon: Flag,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        badge: "3-Way Partition",
        accentColor: "from-rose-500/10 to-pink-500/10 text-rose-500 border-rose-500/30",
      },
      {
        name: "Boyer-Moore Majority Vote",
        description: "Identify majority elements (> N/2) in linear time and O(1) space with candidate cancellation passes.",
        href: "/visualizer/boyer-moore",
        icon: Vote,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        badge: "Majority Element",
        accentColor: "from-amber-500/10 to-orange-500/10 text-amber-500 border-amber-500/30",
      },
      {
        name: "Custom Recursion Studio",
        description: "Interactive Recursion Studio with live call stack frames, recursive tree branching, Factorial, Fibonacci, and custom Java code.",
        href: "/visualizer/custom-recursion",
        icon: Code2,
        timeComplexity: "Dynamic",
        spaceComplexity: "Call Stack",
        badge: "Recursion Visualizer",
        accentColor: "from-pink-500/10 to-purple-500/10 text-pink-500 border-pink-500/30",
      },
    ],
  },

  // 5. APPLICATIONS & SYSTEMS
  {
    id: "applications",
    title: "Applied Systems & Graph Algorithms",
    subtitle: "Real-world engineering applications: expression evaluation, shortest paths, compression, and asynchronous queues.",
    icon: GitBranch,
    items: [
      {
        name: "Infix to Postfix Conversion",
        description: "Convert infix arithmetic expressions to postfix notation using a stack. Step through operator precedence and parentheses.",
        href: "/visualizer/stack-applications",
        icon: Calculator,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        badge: "Shunting-Yard",
        accentColor: "from-purple-500/10 to-indigo-500/10 text-purple-500 border-purple-500/30",
      },
      {
        name: "Message Queue Simulation",
        description: "Simulate asynchronous message queuing systems with producers, consumers, and bounded queue capacity buffers.",
        href: "/visualizer/queue-applications",
        icon: MessageSquare,
        timeComplexity: "O(1)",
        spaceComplexity: "O(n)",
        badge: "Distributed Systems",
        accentColor: "from-blue-500/10 to-cyan-500/10 text-blue-500 border-blue-500/30",
      },
      {
        name: "Polynomial Multiplication",
        description: "Visualize polynomial multiplication using linked lists. Inspect term-by-term multiplication and coefficient combining.",
        href: "/visualizer/polynomial",
        icon: Calculator,
        timeComplexity: "O(m*n)",
        spaceComplexity: "O(m+n)",
        badge: "Algebra",
        accentColor: "from-cyan-500/10 to-teal-500/10 text-cyan-500 border-cyan-500/30",
      },
      {
        name: "Huffman Coding Compression",
        description: "Lossless prefix tree encoding that assigns variable-length codes based on character frequencies for file compression.",
        href: "/visualizer/huffman",
        icon: Hash,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        badge: "Compression",
        accentColor: "from-emerald-500/10 to-teal-500/10 text-emerald-500 border-emerald-500/30",
      },
      {
        name: "Dijkstra's Algorithm",
        description: "Greedy single-source shortest path algorithm on weighted graphs with priority queue distance relaxation.",
        href: "/visualizer/dijkstra",
        icon: ArrowRightLeft,
        timeComplexity: "O((V+E)logV)",
        spaceComplexity: "O(V)",
        badge: "Graph Shortest Path",
        accentColor: "from-indigo-500/10 to-violet-500/10 text-indigo-500 border-indigo-500/30",
      },
    ],
  },
];

export default function DSAVisualizationHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const totalSimulators = ALL_SECTIONS.reduce((acc, s) => acc + s.items.length, 0);

  const filteredSections = ALL_SECTIONS.map((sec) => {
    if (selectedCategory !== "all" && sec.id !== selectedCategory) {
      return { ...sec, items: [] };
    }
    const matchingItems = sec.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.badge && item.badge.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return { ...sec, items: matchingItems };
  }).filter((sec) => sec.items.length > 0);

  return (
    <div className="space-y-10 max-w-7xl mx-auto py-4 px-2 sm:px-4">
      {/* Grand Hero Section matching dsa-visualizer-main */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card/90 to-primary/5 border border-border/80 p-6 sm:p-10 shadow-lg backdrop-blur-md">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-mono font-bold text-xs py-1 px-3">
              <BrainCircuit className="h-3.5 w-3.5 mr-1.5 text-primary" /> Data Structure &amp; Algorithm Visualizer
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs py-1 px-3">
              {totalSimulators} Interactive Simulators
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-foreground font-heading tracking-tight leading-tight">
            Data Structure Visualizer
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Interactive visualizations to help you understand data structures and algorithms.
            Explore, learn, and see how they work in real-time with step scrubbers, sound synthesis, and live Java code execution.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold gap-2 text-xs h-10 px-5 shadow-md">
              <Link href="/visualizer/bubble-sort">
                <Sparkles className="h-4 w-4" />
                <span>Launch Sorting Studio</span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="border-border font-semibold gap-2 text-xs h-10 px-5">
              <Link href="/practice">
                <Award className="h-4 w-4 text-amber-500" />
                <span>Master Coding Interview 150 Sheets</span>
              </Link>
            </Button>

            <Button asChild variant="ghost" className="text-xs font-mono gap-1.5 h-10 text-muted-foreground hover:text-foreground">
              <Link href="/visualizer/complexity-matrix">
                <Zap className="h-3.5 w-3.5 text-purple-400" />
                <span>Complexity Matrix</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Filter and Category Pills Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <Button
            size="sm"
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className="h-8 text-xs font-semibold shrink-0"
          >
            All Topics ({totalSimulators})
          </Button>
          <Button
            size="sm"
            variant={selectedCategory === "data-structures" ? "default" : "outline"}
            onClick={() => setSelectedCategory("data-structures")}
            className="h-8 text-xs font-semibold shrink-0 gap-1.5"
          >
            <Layers className="h-3.5 w-3.5" /> Core DS (6)
          </Button>
          <Button
            size="sm"
            variant={selectedCategory === "sorting-algorithms" ? "default" : "outline"}
            onClick={() => setSelectedCategory("sorting-algorithms")}
            className="h-8 text-xs font-semibold shrink-0 gap-1.5"
          >
            <ArrowDownUp className="h-3.5 w-3.5" /> Sorting (8)
          </Button>
          <Button
            size="sm"
            variant={selectedCategory === "searching-algorithms" ? "default" : "outline"}
            onClick={() => setSelectedCategory("searching-algorithms")}
            className="h-8 text-xs font-semibold shrink-0 gap-1.5"
          >
            <Search className="h-3.5 w-3.5" /> Searching (2)
          </Button>
          <Button
            size="sm"
            variant={selectedCategory === "algorithmic-patterns" ? "default" : "outline"}
            onClick={() => setSelectedCategory("algorithmic-patterns")}
            className="h-8 text-xs font-semibold shrink-0 gap-1.5"
          >
            <BrainCircuit className="h-3.5 w-3.5" /> Patterns &amp; Recursion (8)
          </Button>
          <Button
            size="sm"
            variant={selectedCategory === "applications" ? "default" : "outline"}
            onClick={() => setSelectedCategory("applications")}
            className="h-8 text-xs font-semibold shrink-0 gap-1.5"
          >
            <GitBranch className="h-3.5 w-3.5" /> Applications &amp; Graphs (5)
          </Button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search visualizer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 text-xs pl-8 font-mono bg-card"
          />
        </div>
      </div>

      {/* Sections and Cards Grid */}
      <div className="space-y-12">
        {filteredSections.map((sec) => {
          const SectionIcon = sec.icon;

          return (
            <section key={sec.id} className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
                  <SectionIcon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-heading text-foreground tracking-tight">
                    {sec.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{sec.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sec.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Card
                      key={item.href}
                      className="group border-border bg-card/80 hover:bg-card hover:border-primary/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
                    >
                      <CardHeader className="p-5 pb-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className={`p-2.5 rounded-xl border bg-gradient-to-br ${item.accentColor || "from-primary/10 to-primary/5 text-primary border-primary/20"} group-hover:scale-105 transition-transform`}>
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="flex items-center gap-1.5">
                            {item.badge && (
                              <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground border-border">
                                {item.badge}
                              </Badge>
                            )}
                            <Badge variant="outline" className="font-mono text-[10px] text-primary border-primary/30">
                              {item.timeComplexity}
                            </Badge>
                          </div>
                        </div>

                        <CardTitle className="text-base font-bold font-heading mt-3 group-hover:text-primary transition-colors">
                          {item.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="p-5 pt-0 space-y-4">
                        <CardDescription className="text-xs line-clamp-3 leading-relaxed text-muted-foreground">
                          {item.description}
                        </CardDescription>

                        <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-muted-foreground">
                            Space: <strong className="text-foreground">{item.spaceComplexity}</strong>
                          </span>

                          <Button
                            asChild
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs font-semibold gap-1 text-primary group-hover:text-primary group-hover:bg-primary/10 p-2"
                          >
                            <Link href={item.href}>
                              <span>Launch Visualizer</span>
                              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
