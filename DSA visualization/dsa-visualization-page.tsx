"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  ArrowDownUp,
  Search,
  Layers,
  BrainCircuit,
  GitBranch,
  Hash,
  Award,
  ExternalLink,
  Sparkles,
  BookOpen,
  Code2,
  Trophy,
  Zap,
  CheckCircle2,
  ChevronRight,
  Tv,
  Maximize2,
  SquareStack,
  SquareChevronLeft,
  List,
  Binary,
  TreePine,
  Database,
  Calculator,
  Flag,
  Vote,
  TrendingUp,
  ArrowRightLeft,
  X,
  Equal,
  MessageSquare
} from "lucide-react";

// Loading Skeleton for dynamically imported visualizers
function VisualizerSkeleton() {
  return (
    <div className="w-full h-[520px] rounded-2xl border border-border/80 bg-muted/20 animate-pulse flex flex-col items-center justify-center p-8 space-y-4">
      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
        <Sparkles className="h-5 w-5 animate-spin" />
      </div>
      <p className="text-xs font-mono text-muted-foreground">Loading Visualizer Studio...</p>
    </div>
  );
}

// Dynamically loaded Visualizers with SSR: false (matching frontend/components/visualizer/ and Recursion_Visualizer-main)
const SortingVisualizer = dynamic(
  () => import("@/components/visualizer/sorting/sorting-visualizer").then((m) => m.SortingVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const SearchingVisualizer = dynamic(
  () => import("@/components/visualizer/searching/searching-visualizer").then((m) => m.SearchingVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const StackVisualizer = dynamic(
  () => import("@/components/visualizer/stack/stack-visualizer").then((m) => m.StackVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const QueueVisualizer = dynamic(
  () => import("@/components/visualizer/queue/queue-visualizer").then((m) => m.QueueVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const LinkedListVisualizer = dynamic(
  () => import("@/components/visualizer/linked-list/linked-list-visualizer").then((m) => m.LinkedListVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const BinaryTreeVisualizer = dynamic(
  () => import("@/components/visualizer/binary-tree/binary-tree-visualizer").then((m) => m.BinaryTreeVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const AVLTreeVisualizer = dynamic(
  () => import("@/components/visualizer/avl-tree/avl-tree-visualizer").then((m) => m.AVLTreeVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const HeapVisualizer = dynamic(
  () => import("@/components/visualizer/heap/heap-visualizer").then((m) => m.HeapVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const TwoPointersVisualizer = dynamic(
  () => import("@/components/visualizer/two-pointers/two-pointers-visualizer").then((m) => m.TwoPointersVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const SlidingWindowVisualizer = dynamic(
  () => import("@/components/visualizer/sliding-window/sliding-window-visualizer").then((m) => m.SlidingWindowVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const KadanesVisualizer = dynamic(
  () => import("@/components/visualizer/kadanes-algorithm/kadanes-visualizer").then((m) => m.KadanesVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const PrefixSumVisualizer = dynamic(
  () => import("@/components/visualizer/prefix-sum/prefix-sum-visualizer").then((m) => m.PrefixSumVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const DifferenceArrayVisualizer = dynamic(
  () => import("@/components/visualizer/difference-array/difference-array-visualizer").then((m) => m.DifferenceArrayVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const DNFVisualizer = dynamic(
  () => import("@/components/visualizer/dutch-national-flag/dnf-visualizer").then((m) => m.DNFVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const BoyerMooreVisualizer = dynamic(
  () => import("@/components/visualizer/boyer-moore/boyer-moore-visualizer").then((m) => m.BoyerMooreVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const RecursionVisualizerPanel = dynamic(
  () => import("@/components/visualizer/recursion/recursion-visualizer-panel").then((m) => m.RecursionVisualizerPanel),
  { ssr: false, loading: VisualizerSkeleton }
);

const DijkstraVisualizer = dynamic(
  () => import("@/components/visualizer/dijkstra/dijkstra-visualizer").then((m) => m.DijkstraVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const HuffmanVisualizer = dynamic(
  () => import("@/components/visualizer/huffman/huffman-visualizer").then((m) => m.HuffmanVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const PolynomialVisualizer = dynamic(
  () => import("@/components/visualizer/polynomial/polynomial-visualizer").then((m) => m.PolynomialVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const InfixPostfixVisualizer = dynamic(
  () => import("@/components/visualizer/stack-applications/infix-postfix-visualizer").then((m) => m.InfixPostfixVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

const MessageQueueVisualizer = dynamic(
  () => import("@/components/visualizer/queue-applications/message-queue-visualizer").then((m) => m.MessageQueueVisualizer),
  { ssr: false, loading: VisualizerSkeleton }
);

// Algorithm Definitions
interface AlgorithmDef {
  id: string;
  name: string;
  category: string;
  categoryIcon: React.ElementType;
  timeComplexity: string;
  spaceComplexity: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  dedicatedUrl: string;
  renderComponent: () => React.ReactNode;
}

export default function DSAVisualizationPage() {
  const [activeAlgoId, setActiveAlgoId] = useState<string>("bubble-sort");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortingSubAlgo, setSortingSubAlgo] = useState<"bubble" | "selection" | "insertion" | "merge" | "quick" | "heap" | "counting" | "cyclic">("bubble");

  const ALGORITHMS: AlgorithmDef[] = [
    // 1. SORTING
    {
      id: "bubble-sort",
      name: "Bubble Sort",
      category: "Sorting Simulators",
      categoryIcon: ArrowDownUp,
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      difficulty: "Easy",
      description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
      dedicatedUrl: "/visualizer/bubble-sort",
      renderComponent: () => (
        <SortingVisualizer
          algorithm="bubble"
          title="Bubble Sort Visualizer"
          description="Adjacent comparison and swapping animation with step scrubber and live code line highlighter."
        />
      ),
    },
    {
      id: "selection-sort",
      name: "Selection Sort",
      category: "Sorting Simulators",
      categoryIcon: ArrowDownUp,
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      difficulty: "Easy",
      description: "Finds the minimum element from unsorted part and puts it at the beginning.",
      dedicatedUrl: "/visualizer/selection-sort",
      renderComponent: () => (
        <SortingVisualizer
          algorithm="selection"
          title="Selection Sort Visualizer"
          description="Finds minimum element in unsorted partition and places it in sorted order."
        />
      ),
    },
    {
      id: "insertion-sort",
      name: "Insertion Sort",
      category: "Sorting Simulators",
      categoryIcon: ArrowDownUp,
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      difficulty: "Easy",
      description: "Builds the final sorted array one item at a time by backward shifting.",
      dedicatedUrl: "/visualizer/insertion-sort",
      renderComponent: () => (
        <SortingVisualizer
          algorithm="insertion"
          title="Insertion Sort Visualizer"
          description="Adaptive backward shifting for online streaming insertion."
        />
      ),
    },
    {
      id: "merge-sort",
      name: "Merge Sort",
      category: "Sorting Simulators",
      categoryIcon: ArrowDownUp,
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      difficulty: "Medium",
      description: "Divide and conquer algorithm that splits array into halves and merges sorted subarrays.",
      dedicatedUrl: "/visualizer/merge-sort",
      renderComponent: () => (
        <SortingVisualizer
          algorithm="merge"
          title="Merge Sort Visualizer"
          description="O(n log n) stable divide-and-conquer sorting with auxiliary merging array."
        />
      ),
    },
    {
      id: "quick-sort",
      name: "Quick Sort",
      category: "Sorting Simulators",
      categoryIcon: ArrowDownUp,
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(log n)",
      difficulty: "Medium",
      description: "Picks an element as pivot and partitions the array around the picked pivot.",
      dedicatedUrl: "/visualizer/quick-sort",
      renderComponent: () => (
        <SortingVisualizer
          algorithm="quick"
          title="Quick Sort Visualizer"
          description="Lomuto pivot partitioning and recursive sub-array sorting."
        />
      ),
    },
    {
      id: "heap-sort",
      name: "Heap Sort",
      category: "Sorting Simulators",
      categoryIcon: ArrowDownUp,
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
      difficulty: "Medium",
      description: "Comparison-based sorting technique based on Binary Heap data structure.",
      dedicatedUrl: "/visualizer/heap-sort",
      renderComponent: () => (
        <SortingVisualizer
          algorithm="heap"
          title="Heap Sort Visualizer"
          description="Max-heap construction and root extraction sorting."
        />
      ),
    },
    {
      id: "counting-sort",
      name: "Counting Sort",
      category: "Sorting Simulators",
      categoryIcon: ArrowDownUp,
      timeComplexity: "O(n+k)",
      spaceComplexity: "O(k)",
      difficulty: "Medium",
      description: "Non-comparison sorting algorithm that operates by counting the number of objects having distinct key values.",
      dedicatedUrl: "/visualizer/counting-sort",
      renderComponent: () => (
        <SortingVisualizer
          algorithm="counting"
          title="Counting Sort Visualizer"
          description="Non-comparison integer sorting using frequency counts and prefix sums."
        />
      ),
    },
    {
      id: "cyclic-sort",
      name: "Cyclic Sort",
      category: "Sorting Simulators",
      categoryIcon: ArrowDownUp,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      difficulty: "Medium",
      description: "In-place number placement pattern for range 1 to N.",
      dedicatedUrl: "/visualizer/cyclic-sort",
      renderComponent: () => (
        <SortingVisualizer
          algorithm="cyclic"
          title="Cyclic Sort Visualizer"
          description="Linear in-place sorting for 1 to N permutation arrays."
        />
      ),
    },

    // 2. SEARCHING
    {
      id: "binary-search",
      name: "Binary Search",
      category: "Searching Simulators",
      categoryIcon: Search,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      difficulty: "Easy",
      description: "Search a sorted array by repeatedly dividing the search interval in half.",
      dedicatedUrl: "/visualizer/binary-search",
      renderComponent: () => <SearchingVisualizer type="binary" />,
    },
    {
      id: "linear-search",
      name: "Linear Search",
      category: "Searching Simulators",
      categoryIcon: Search,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      difficulty: "Easy",
      description: "Sequentially checks each element of the list until a match is found or the whole list has been searched.",
      dedicatedUrl: "/visualizer/linear-search",
      renderComponent: () => <SearchingVisualizer type="linear" />,
    },

    // 3. CORE DATA STRUCTURES
    {
      id: "stack",
      name: "Stack (LIFO)",
      category: "Core Data Structures",
      categoryIcon: SquareStack,
      timeComplexity: "O(1)",
      spaceComplexity: "O(n)",
      difficulty: "Easy",
      description: "Linear data structure following Last-In First-Out principle with push, pop, and peek operations.",
      dedicatedUrl: "/visualizer/stack",
      renderComponent: () => <StackVisualizer />,
    },
    {
      id: "queue",
      name: "Queue (FIFO)",
      category: "Core Data Structures",
      categoryIcon: SquareChevronLeft,
      timeComplexity: "O(1)",
      spaceComplexity: "O(n)",
      difficulty: "Easy",
      description: "Linear structure following First-In First-Out principle with enqueue at rear and dequeue at front.",
      dedicatedUrl: "/visualizer/queue",
      renderComponent: () => <QueueVisualizer />,
    },
    {
      id: "linked-list",
      name: "Linked List",
      category: "Core Data Structures",
      categoryIcon: List,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      difficulty: "Easy",
      description: "Linear collection of data elements whose order is not given by their physical placement in memory.",
      dedicatedUrl: "/visualizer/linked-list",
      renderComponent: () => <LinkedListVisualizer />,
    },
    {
      id: "binary-tree",
      name: "Binary Search Tree",
      category: "Core Data Structures",
      categoryIcon: Binary,
      timeComplexity: "O(h)",
      spaceComplexity: "O(n)",
      difficulty: "Medium",
      description: "Binary tree where every node has at most two children with ordered left/right keys.",
      dedicatedUrl: "/visualizer/binary-tree",
      renderComponent: () => <BinaryTreeVisualizer />,
    },
    {
      id: "avl-tree",
      name: "AVL Tree (Balanced)",
      category: "Core Data Structures",
      categoryIcon: TreePine,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(n)",
      difficulty: "Hard",
      description: "Self-balancing binary search tree where height difference of any node's children is at most 1.",
      dedicatedUrl: "/visualizer/avl-tree",
      renderComponent: () => <AVLTreeVisualizer />,
    },
    {
      id: "heap",
      name: "Binary Heap",
      category: "Core Data Structures",
      categoryIcon: Database,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(n)",
      difficulty: "Medium",
      description: "Complete binary tree satisfying the heap property with fast min/max extraction.",
      dedicatedUrl: "/visualizer/heap",
      renderComponent: () => <HeapVisualizer />,
    },

    // 4. ALGORITHMIC PATTERNS
    {
      id: "two-pointers",
      name: "Two Pointers Pattern",
      category: "Algorithmic Patterns",
      categoryIcon: ArrowRightLeft,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      difficulty: "Medium",
      description: "Inward & synchronized pointer stepping across sorted arrays for Two Sum II and Container With Most Water.",
      dedicatedUrl: "/visualizer/two-pointers",
      renderComponent: () => <TwoPointersVisualizer />,
    },
    {
      id: "sliding-window",
      name: "Sliding Window Pattern",
      category: "Algorithmic Patterns",
      categoryIcon: ArrowRightLeft,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      difficulty: "Medium",
      description: "Contiguous window overlay tracking running sum and subarray metrics.",
      dedicatedUrl: "/visualizer/sliding-window",
      renderComponent: () => <SlidingWindowVisualizer />,
    },
    {
      id: "kadanes-algorithm",
      name: "Kadane's Algorithm",
      category: "Algorithmic Patterns",
      categoryIcon: TrendingUp,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      difficulty: "Medium",
      description: "Maximum contiguous subarray sum tracking with dynamic resets.",
      dedicatedUrl: "/visualizer/kadanes-algorithm",
      renderComponent: () => <KadanesVisualizer />,
    },
    {
      id: "prefix-sum",
      name: "Prefix Sum & Range Query",
      category: "Algorithmic Patterns",
      categoryIcon: Calculator,
      timeComplexity: "O(1) Query",
      spaceComplexity: "O(n)",
      difficulty: "Easy",
      description: "Precomputed cumulative sum array enabling instant O(1) interval sum lookups.",
      dedicatedUrl: "/visualizer/prefix-sum",
      renderComponent: () => <PrefixSumVisualizer />,
    },
    {
      id: "difference-array",
      name: "Difference Array Range Update",
      category: "Algorithmic Patterns",
      categoryIcon: Layers,
      timeComplexity: "O(1) Update",
      spaceComplexity: "O(n)",
      difficulty: "Medium",
      description: "Efficient O(1) interval range updates with prefix sum reconstruction.",
      dedicatedUrl: "/visualizer/difference-array",
      renderComponent: () => <DifferenceArrayVisualizer />,
    },
    {
      id: "dutch-national-flag",
      name: "Dutch National Flag (Sort Colors)",
      category: "Algorithmic Patterns",
      categoryIcon: Flag,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      difficulty: "Medium",
      description: "3-way partitioning of 0s, 1s, and 2s in a single pass using Low, Mid, High pointers.",
      dedicatedUrl: "/visualizer/dutch-national-flag",
      renderComponent: () => <DNFVisualizer />,
    },
    {
      id: "boyer-moore",
      name: "Boyer-Moore Majority Vote",
      category: "Algorithmic Patterns",
      categoryIcon: Vote,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      difficulty: "Medium",
      description: "Finds the majority element occurring > N/2 times in linear time and O(1) space.",
      dedicatedUrl: "/visualizer/boyer-moore",
      renderComponent: () => <BoyerMooreVisualizer />,
    },

    // 5. RECURSION STUDIO (from Recursion_Visualizer-main)
    {
      id: "custom-recursion",
      name: "Recursion & Call Stack Studio",
      category: "Recursion Studio",
      categoryIcon: BrainCircuit,
      timeComplexity: "Dynamic",
      spaceComplexity: "Dynamic",
      difficulty: "Medium",
      description: "Visualizes the execution call stack, recursion tree, frame unwinding, Factorial, Fibonacci, and custom algorithms.",
      dedicatedUrl: "/visualizer/custom-recursion",
      renderComponent: () => <RecursionVisualizerPanel />,
    },

    // 6. GRAPHS & APPLIED
    {
      id: "dijkstra",
      name: "Dijkstra's Shortest Path",
      category: "Graphs & Networks",
      categoryIcon: GitBranch,
      timeComplexity: "O((V+E)logV)",
      spaceComplexity: "O(V)",
      difficulty: "Hard",
      description: "Greedy single-source shortest path on weighted graphs with priority queue relaxation.",
      dedicatedUrl: "/visualizer/dijkstra",
      renderComponent: () => <DijkstraVisualizer />,
    },
    {
      id: "huffman",
      name: "Huffman Coding Compression",
      category: "Applied Systems",
      categoryIcon: Hash,
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      difficulty: "Medium",
      description: "Lossless prefix tree encoding and compression bitstreams based on character frequencies.",
      dedicatedUrl: "/visualizer/huffman",
      renderComponent: () => <HuffmanVisualizer />,
    },
    {
      id: "message-queue",
      name: "Message Queue Buffer",
      category: "Applied Systems",
      categoryIcon: MessageSquare,
      timeComplexity: "O(1)",
      spaceComplexity: "O(n)",
      difficulty: "Easy",
      description: "Asynchronous producer-consumer buffer simulation with buffer capacity control.",
      dedicatedUrl: "/visualizer/queue-applications",
      renderComponent: () => <MessageQueueVisualizer />,
    },
    {
      id: "infix-postfix",
      name: "Infix to Postfix Parser",
      category: "Applied Systems",
      categoryIcon: Equal,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      difficulty: "Medium",
      description: "Shunting-yard operator precedence parser and postfix evaluator using stacks.",
      dedicatedUrl: "/visualizer/stack-applications",
      renderComponent: () => <InfixPostfixVisualizer />,
    },
    {
      id: "polynomial",
      name: "Polynomial Multiplication",
      category: "Applied Systems",
      categoryIcon: X,
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m+n)",
      difficulty: "Medium",
      description: "Multiply two polynomials term-by-term using linked list structures.",
      dedicatedUrl: "/visualizer/polynomial",
      renderComponent: () => <PolynomialVisualizer />,
    },
  ];

  // Group algorithms by Category
  const categories = Array.from(new Set(ALGORITHMS.map((a) => a.category)));

  const activeAlgo = ALGORITHMS.find((a) => a.id === activeAlgoId) || ALGORITHMS[0];
  const CategoryIcon = activeAlgo.categoryIcon;

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Top Banner Header */}
      <div className="bg-card/90 backdrop-blur-md rounded-2xl border border-border p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-mono font-bold">
              <Sparkles className="h-3.5 w-3.5 mr-1 text-primary" /> DSA Visualization Platform
            </Badge>
            <Badge variant="secondary" className="text-xs font-mono">
              Full Interactive Studios
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
            Interactive DSA Visualization System
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Professional algorithm simulators with timeline scrubbers, audio synthesis, live Java code execution, and data structure visualizations.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button asChild variant="outline" size="sm" className="h-8 text-xs gap-1.5 font-semibold">
            <Link href="/practice">
              <Award className="h-3.5 w-3.5 text-amber-500" />
              <span>Practice 150 Sheet</span>
            </Link>
          </Button>

          <Button asChild variant="outline" size="sm" className="h-8 text-xs gap-1.5 font-semibold">
            <Link href="/visualizer">
              <Layers className="h-3.5 w-3.5 text-primary" />
              <span>All Studios Grid</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Main 2-Column Workstation */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full min-w-0">
        {/* Left Professional Sidebar */}
        <div className="w-full lg:w-72 shrink-0 bg-card/90 rounded-2xl border border-border p-4 shadow-xs space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-foreground uppercase tracking-wider block">
              DSA Simulators ({ALGORITHMS.length})
            </span>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Filter algorithm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 text-xs pl-8 font-mono bg-muted/30"
              />
            </div>
          </div>

          <div className="space-y-4 max-h-[720px] overflow-y-auto pr-1">
            {categories.map((cat) => {
              const catAlgos = ALGORITHMS.filter(
                (a) =>
                  a.category === cat &&
                  (a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    a.description.toLowerCase().includes(searchQuery.toLowerCase()))
              );

              if (catAlgos.length === 0) return null;

              return (
                <div key={cat} className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider px-2 block">
                    {cat}
                  </span>
                  <div className="space-y-1">
                    {catAlgos.map((algo) => {
                      const isActive = algo.id === activeAlgoId;
                      const Icon = algo.categoryIcon;

                      return (
                        <button
                          key={algo.id}
                          onClick={() => setActiveAlgoId(algo.id)}
                          className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                            isActive
                              ? "bg-primary text-primary-foreground font-bold shadow-xs"
                              : "hover:bg-muted text-foreground/80 hover:text-foreground font-medium"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Icon className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{algo.name}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-[9px] font-mono uppercase px-1.5 py-0 shrink-0 ${
                              isActive
                                ? "border-white/30 text-white bg-white/10"
                                : "text-muted-foreground border-border"
                            }`}
                          >
                            {algo.timeComplexity}
                          </Badge>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Full-Featured Visualizer */}
        <div className="flex-1 w-full min-w-0 space-y-4">
          {/* Active Title & Info Bar */}
          <div className="bg-card/90 rounded-2xl border border-border p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-primary">{activeAlgo.category}</span>
                <span className="text-xs text-muted-foreground">/</span>
                <h2 className="text-lg font-bold font-heading text-foreground">{activeAlgo.name}</h2>
              </div>
              <p className="text-xs text-muted-foreground max-w-2xl">{activeAlgo.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="outline" className="font-mono text-xs text-primary border-primary/30">
                Time: {activeAlgo.timeComplexity}
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Space: {activeAlgo.spaceComplexity}
              </Badge>
              <Button asChild variant="outline" size="sm" className="h-7 text-xs gap-1">
                <Link href={activeAlgo.dedicatedUrl} target="_blank">
                  <span>Full Screen</span>
                  <Maximize2 className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Real Old Visualizer Component Canvas */}
          <Card className="border-border bg-card/90 shadow-sm p-4 overflow-hidden min-h-[500px]">
            {activeAlgo.renderComponent()}
          </Card>
        </div>
      </div>
    </div>
  );
}
