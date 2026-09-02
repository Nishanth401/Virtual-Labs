"use client";

import * as React from "react";
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
  Award,
  FlaskConical,
  TrendingUp,
  Calculator,
  Layers,
  Flag,
  Vote,
  Search,
  Zap,
  GitBranch,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/navigation/nav-main";
import { NavProjects } from "@/components/navigation/nav-projects";
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

const sortingAlgorithms = [
  {
    name: "Bubble Sort",
    url: "/visualizer/bubble-sort",
    icon: ArrowDownUp,
    description: "Adjacent comparison and swapping pass with early exit",
  },
  {
    name: "Selection Sort",
    url: "/visualizer/selection-sort",
    icon: ArrowDownUp,
    description: "Finds minimum element in unsorted partition",
  },
  {
    name: "Insertion Sort",
    url: "/visualizer/insertion-sort",
    icon: ArrowDownUp,
    description: "Online card sorting with linear performance on nearly sorted inputs",
  },
  {
    name: "Merge Sort",
    url: "/visualizer/merge-sort",
    icon: ArrowDownUp,
    description: "Divide-and-conquer O(n log n) stable sorting",
  },
  {
    name: "Cyclic Sort",
    url: "/visualizer/cyclic-sort",
    icon: ArrowDownUp,
    description: "In-place placement pattern for numbers 1..N",
  },
  {
    name: "Quick Sort",
    url: "/visualizer/quick-sort",
    icon: ArrowDownUp,
    description: "Pivot partitioning and recursive sub-array sorting",
  },
  {
    name: "Heap Sort",
    url: "/visualizer/heap-sort",
    icon: ArrowDownUp,
    description: "Max-heap construction and root extraction",
  },
  {
    name: "Counting Sort",
    url: "/visualizer/counting-sort",
    icon: ArrowDownUp,
    description: "Non-comparison linear sorting",
  },
];

const searchingAlgorithms = [
  {
    name: "Linear Search",
    url: "/visualizer/linear-search",
    icon: Search,
    description: "Sequential search across array elements",
  },
  {
    name: "Binary Search",
    url: "/visualizer/binary-search",
    icon: Search,
    description: "Logarithmic divide-and-conquer search",
  },
];

const algorithmicPatterns = [
  {
    name: "Custom Recursion Studio",
    url: "/visualizer/custom-recursion",
    icon: BrainCircuit,
    description: "Build custom recursive Java algorithms with call-tree and stack frames",
  },
  {
    name: "Two Pointers Algorithm",
    url: "/visualizer/two-pointers",
    icon: ArrowRightLeft,
    description: "Inward & synchronized pointer stepping across sorted arrays",
  },
  {
    name: "Sliding Window Algorithm",
    url: "/visualizer/sliding-window",
    icon: ArrowRightLeft,
    description: "Contiguous window overlay tracking sub-segment metrics",
  },
  {
    name: "Kadane's Algorithm",
    url: "/visualizer/kadanes-algorithm",
    icon: TrendingUp,
    description: "Maximum contiguous subarray sum tracking",
  },
  {
    name: "Prefix Sum",
    url: "/visualizer/prefix-sum",
    icon: Calculator,
    description: "Precomputed cumulative sum array and O(1) Range Sum Query",
  },
  {
    name: "Difference Array",
    url: "/visualizer/difference-array",
    icon: Layers,
    description: "Efficient O(1) range updates with prefix sum reconstruction",
  },
  {
    name: "Dutch National Flag",
    url: "/visualizer/dutch-national-flag",
    icon: Flag,
    description: "3-way partitioning of 0s, 1s, and 2s in O(N)",
  },
  {
    name: "Boyer-Moore Majority Vote",
    url: "/visualizer/boyer-moore",
    icon: Vote,
    description: "Identify majority elements (> N/2) in O(N) time & O(1) space",
  },
];

const dataStructures = [
  {
    name: "Stack",
    url: "/visualizer/stack",
    icon: SquareStack,
    description: "LIFO data structure with push and pop operations",
  },
  {
    name: "Queue",
    url: "/visualizer/queue",
    icon: SquareChevronLeft,
    description: "FIFO data structure with enqueue and dequeue operations",
  },
  {
    name: "Linked List",
    url: "/visualizer/linked-list",
    icon: List,
    description: "Linear data structure with elements linked using pointers",
  },
  {
    name: "Binary Search Tree",
    url: "/visualizer/binary-tree",
    icon: Binary,
    description: "Basic binary tree with BST properties",
  },
  {
    name: "AVL Tree",
    url: "/visualizer/avl-tree",
    icon: TreePine,
    description: "Self-balancing binary search tree",
  },
  {
    name: "Heap",
    url: "/visualizer/heap",
    icon: Database,
    description: "Binary heap implementation with max/min heap variants",
  },
];

const applications = [
  {
    name: "Message Queue",
    url: "/visualizer/queue-applications",
    icon: MessageSquare,
    description: "Asynchronous message processing system with producers and consumers",
  },
  {
    name: "Infix to Postfix Conversion",
    url: "/visualizer/stack-applications",
    icon: Equal,
    description: "Convert infix expressions to postfix notation using a stack",
  },
  {
    name: "Polynomial Multiplication",
    url: "/visualizer/polynomial",
    icon: X,
    description: "Multiply two polynomials using linked lists",
  },
  {
    name: "Huffman Coding",
    url: "/visualizer/huffman",
    icon: Hash,
    description: "Data compression technique using Huffman prefix trees",
  },
  {
    name: "Dijkstra's Algorithm",
    url: "/visualizer/dijkstra",
    icon: ArrowRightLeft,
    description: "Graph shortest path search algorithm",
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

        {/* Categorized Collapsible Visualizer Groups (Closed initially by default) */}
        <NavProjects
          title="Sorting Simulators"
          icon={ArrowDownUp}
          defaultOpen={false}
          iconColor="bg-amber-500/15 text-amber-600 border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400"
          accentColor="text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30"
          projects={sortingAlgorithms}
        />
        <NavProjects
          title="Searching Simulators"
          icon={Search}
          defaultOpen={false}
          iconColor="bg-emerald-500/15 text-emerald-600 border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-400"
          accentColor="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
          projects={searchingAlgorithms}
        />
        <NavProjects
          title="Array & Patterns"
          icon={BrainCircuit}
          defaultOpen={false}
          iconColor="bg-cyan-500/15 text-cyan-600 border-cyan-500/30 dark:bg-cyan-500/20 dark:text-cyan-400"
          accentColor="text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/30"
          projects={algorithmicPatterns}
        />
        <NavProjects
          title="Core Data Structures"
          icon={Layers}
          defaultOpen={false}
          iconColor="bg-purple-500/15 text-purple-600 border-purple-500/30 dark:bg-purple-500/20 dark:text-purple-400"
          accentColor="text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/30"
          projects={dataStructures}
        />
        <NavProjects
          title="Graphs & Applications"
          icon={GitBranch}
          defaultOpen={false}
          iconColor="bg-pink-500/15 text-pink-600 border-pink-500/30 dark:bg-pink-500/20 dark:text-pink-400"
          accentColor="text-pink-600 dark:text-pink-400 bg-pink-500/10 border-pink-500/30"
          projects={applications}
        />
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