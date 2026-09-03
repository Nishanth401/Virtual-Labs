"use client";

import React from "react";
import {
  Binary,
  Home,
  Database,
  BrainCircuit,
  TreePine,
  List,
  SquareStack,
  SquareChevronLeft,
  Equal,
  MessageSquare,
  X,
  Hash,
  ArrowRightLeft,
  ArrowDownUp,
  Search,
  Layers,
  TrendingUp,
  Flag,
  Vote,
  Code2,
  GitBranch,
  Cpu,
  Zap,
  Crown,
  BarChart3,
  Network,
  GitMerge,
  Table,
  HardDrive,
  Sliders,
  Sparkles,
  Server,
  Workflow,
  Compass,
  Repeat,
  Share2,
  Boxes,
  Activity,
  FileText
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/navigation/nav-main";
import { NavProjects } from "@/components/navigation/nav-projects";

const navItems = [
  {
    title: "Virtual Lab",
    url: "/",
    icon: Home,
  },
  {
    title: "DSA Visualization",
    url: "/dsa-visualization",
    icon: BrainCircuit,
    badge: "Core",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
  },
  {
    title: "DSA Practice Sheets",
    url: "/dsa-visualization?tab=sheets",
    icon: FileText,
  },
  {
    title: "Complexity Matrix",
    url: "/visualizer/complexity-matrix",
    icon: BarChart3,
  },
];

// Phase 1: Complexity & Analysis (3)
const complexityAnalysis = [
  { name: "Complexity & DS Matrix", url: "/visualizer/complexity-matrix", icon: BarChart3, description: "Big-O, Omega, Theta matrix" },
  { name: "Amortized Analysis", url: "/visualizer/amortized-analysis", icon: TrendingUp, description: "Dynamic array capacity doubling" },
  { name: "Space Complexity Analyzer", url: "/visualizer/space-complexity", icon: Layers, description: "Auxiliary vs total call stack RAM" },
];

// Phase 2: Core Data Structures (11)
const dataStructures = [
  { name: "Arrays & Strings", url: "/visualizer/arrays-strings", icon: Table, description: "1D/2D matrix & String Buffer" },
  { name: "Linked List", url: "/visualizer/linked-list", icon: List, description: "Singly, doubly, circular & skip lists" },
  { name: "Stack", url: "/visualizer/stack", icon: SquareStack, description: "LIFO stack & monotonic stacks" },
  { name: "Queue", url: "/visualizer/queue", icon: SquareChevronLeft, description: "FIFO, circular & monotonic queues" },
  { name: "Binary Search Tree", url: "/visualizer/binary-tree", icon: Binary, description: "BST properties & traversals" },
  { name: "AVL & Red-Black Tree", url: "/visualizer/avl-tree", icon: TreePine, description: "Self-balancing rotation passes" },
  { name: "Heap / Priority Queue", url: "/visualizer/heap", icon: Database, description: "Min/Max binary heap & K-way merge" },
  { name: "Hash Table & Collisions", url: "/visualizer/hashing", icon: Hash, description: "Chaining & open addressing" },
  { name: "Trie (Prefix Tree)", url: "/visualizer/trie", icon: Code2, description: "Prefix dictionary autocomplete" },
  { name: "Disjoint Set (Union-Find)", url: "/visualizer/union-find", icon: Share2, description: "Path compression & union by rank" },
  { name: "Segment & Fenwick Tree", url: "/visualizer/segment-tree", icon: Workflow, description: "Range queries & point updates" },
];

// Phase 3: Sorting Simulators (9)
const sortingAlgorithms = [
  { name: "Bubble Sort", url: "/visualizer/bubble-sort", icon: ArrowDownUp, description: "Adjacent comparisons & swaps" },
  { name: "Selection Sort", url: "/visualizer/selection-sort", icon: ArrowDownUp, description: "Minimum element selection" },
  { name: "Insertion Sort", url: "/visualizer/insertion-sort", icon: ArrowDownUp, description: "Adaptive backward shifting" },
  { name: "Merge Sort", url: "/visualizer/merge-sort", icon: ArrowDownUp, description: "Divide-and-conquer O(n log n)" },
  { name: "Quick Sort", url: "/visualizer/quick-sort", icon: ArrowDownUp, description: "Pivot partitioning" },
  { name: "Heap Sort", url: "/visualizer/heap-sort", icon: ArrowDownUp, description: "In-place heap sorting" },
  { name: "Counting Sort", url: "/visualizer/counting-sort", icon: ArrowDownUp, description: "Non-comparison linear sorting" },
  { name: "Radix & Bucket Sort", url: "/visualizer/radix-bucket-sort", icon: Boxes, description: "Base-digit extraction & buckets" },
  { name: "Cyclic Sort", url: "/visualizer/cyclic-sort", icon: Repeat, description: "1 to N in-place placement" },
];

// Phase 3: Searching & Algorithmic Patterns (11)
const algorithmicPatterns = [
  { name: "Binary Search", url: "/visualizer/binary-search", icon: Search, description: "Logarithmic O(log n) search" },
  { name: "Linear Search", url: "/visualizer/linear-search", icon: Search, description: "Sequential scan" },
  { name: "Two Pointers", url: "/visualizer/two-pointers", icon: ArrowRightLeft, description: "Two Sum II & Most Water" },
  { name: "Fast & Slow Pointers", url: "/visualizer/fast-slow-pointers", icon: Activity, description: "Floyd's cycle detection" },
  { name: "Sliding Window", url: "/visualizer/sliding-window", icon: ArrowRightLeft, description: "Running subarray metrics" },
  { name: "Kadane's Algorithm", url: "/visualizer/kadanes-algorithm", icon: TrendingUp, description: "Max contiguous subarray sum" },
  { name: "Prefix Sum", url: "/visualizer/prefix-sum", icon: Layers, description: "O(1) Range sum queries" },
  { name: "Difference Array", url: "/visualizer/difference-array", icon: Layers, description: "O(1) Interval range updates" },
  { name: "Dutch National Flag", url: "/visualizer/dutch-national-flag", icon: Flag, description: "3-Way sort colors partitioning" },
  { name: "Boyer-Moore", url: "/visualizer/boyer-moore", icon: Vote, description: "Majority element voting" },
  { name: "Bit Manipulation Studio", url: "/visualizer/bit-manipulation", icon: Sliders, description: "Bitwise tricks, masks & subsets" },
];

// Phase 3: Recursion & Backtracking (4)
const recursionAndBacktracking = [
  { name: "Custom Recursion Studio", url: "/visualizer/custom-recursion", icon: BrainCircuit, description: "SVG tree, call stack & runner" },
  { name: "Subsets & Permutations", url: "/visualizer/subsets-permutations", icon: GitMerge, description: "Include/exclude decision tree" },
  { name: "N-Queens Backtracking", url: "/visualizer/n-queens", icon: Crown, description: "Chessboard constraint tree" },
  { name: "Grid & Matrix Backtrack", url: "/visualizer/grid-backtracking", icon: Compass, description: "Rat in Maze & Sudoku solver" },
];

// Phase 4: Graph Algorithms (7)
const graphAlgorithms = [
  { name: "Graph Traversals (BFS/DFS)", url: "/visualizer/graph-traversal", icon: GitBranch, description: "BFS & DFS graph search" },
  { name: "Dijkstra's Algorithm", url: "/visualizer/dijkstra", icon: ArrowRightLeft, description: "Shortest path relaxation" },
  { name: "Bellman-Ford & Floyd", url: "/visualizer/bellman-floyd", icon: Network, description: "Negative edges & all-pairs" },
  { name: "Topological Sorting", url: "/visualizer/topological-sort", icon: Workflow, description: "Kahn's algorithm & DAG order" },
  { name: "Minimum Spanning Tree", url: "/visualizer/mst", icon: Share2, description: "Prim's & Kruskal's algorithms" },
  { name: "Strongly Connected (SCC)", url: "/visualizer/scc", icon: GitMerge, description: "Tarjan's & Kosaraju's algorithms" },
  { name: "Advanced Graph Concepts", url: "/visualizer/advanced-graphs", icon: Network, description: "Bipartite coloring & max flow" },
];

// Phase 3 & 4: Dynamic Programming & Greedy (5)
const dynamicProgrammingGreedy = [
  { name: "0/1 & Unbounded Knapsack", url: "/visualizer/knapsack", icon: Cpu, description: "2D DP capacity matrix" },
  { name: "String DP (LCS & Edit)", url: "/visualizer/string-dp", icon: Code2, description: "LCS & Levenshtein distance" },
  { name: "Advanced DP Patterns", url: "/visualizer/advanced-dp", icon: Layers, description: "Tree DP & bitmask TSP" },
  { name: "Activity Selection (Greedy)", url: "/visualizer/greedy-activity", icon: Zap, description: "Greedy interval scheduling" },
  { name: "Advanced Greedy Patterns", url: "/visualizer/advanced-greedy", icon: Sparkles, description: "Merge intervals & jump game" },
];

// Phase 6: Applied Systems, LLD & Engineering (7)
const appliedSystemsAndLld = [
  { name: "Infix to Postfix", url: "/visualizer/stack-applications", icon: Equal, description: "Shunting-yard operator parser" },
  { name: "Message Queue", url: "/visualizer/queue-applications", icon: MessageSquare, description: "Producer-consumer simulation" },
  { name: "Polynomial Multiplication", url: "/visualizer/polynomial", icon: X, description: "Linked list polynomial math" },
  { name: "Huffman Coding", url: "/visualizer/huffman", icon: Hash, description: "Prefix tree compression" },
  { name: "Low-Level Design (LLD)", url: "/visualizer/lld-design", icon: Server, description: "SOLID & Design Patterns" },
  { name: "Concurrency Studio", url: "/visualizer/concurrency-studio", icon: Activity, description: "Mutex, semaphores & deadlocks" },
  { name: "DBMS & SQL Visualizer", url: "/visualizer/dbms-sql", icon: HardDrive, description: "B-Tree index & ACID engine" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-6 py-4 border-b flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <h1 className="text-sm font-semibold tracking-tight font-heading">Data Structure Visualizer</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />

        <NavProjects
          title="Complexity & Analysis"
          projects={complexityAnalysis}
          accentColor="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
          iconColor="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400"
        />

        <NavProjects
          title="Data Structures"
          projects={dataStructures}
          accentColor="text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30"
          iconColor="bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400"
        />

        <NavProjects
          title="Sorting Simulators"
          projects={sortingAlgorithms}
          accentColor="text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30"
          iconColor="bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400"
        />

        <NavProjects
          title="Searching & Patterns"
          projects={algorithmicPatterns}
          accentColor="text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/30"
          iconColor="bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400"
        />

        <NavProjects
          title="Recursion Studio"
          projects={recursionAndBacktracking}
          accentColor="text-pink-600 dark:text-pink-400 bg-pink-500/10 border-pink-500/30"
          iconColor="bg-pink-500/10 text-pink-600 border-pink-500/20 dark:bg-pink-500/20 dark:text-pink-400"
        />

        <NavProjects
          title="Graph Algorithms"
          projects={graphAlgorithms}
          accentColor="text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/30"
          iconColor="bg-rose-500/10 text-rose-600 border-rose-500/20 dark:bg-rose-500/20 dark:text-rose-400"
        />

        <NavProjects
          title="DP & Greedy"
          projects={dynamicProgrammingGreedy}
          accentColor="text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/30"
          iconColor="bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:bg-indigo-500/20 dark:text-indigo-400"
        />

        <NavProjects
          title="Applied Systems & LLD"
          projects={appliedSystemsAndLld}
          accentColor="text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/30"
          iconColor="bg-cyan-500/10 text-cyan-600 border-cyan-500/20 dark:bg-cyan-500/20 dark:text-cyan-400"
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}