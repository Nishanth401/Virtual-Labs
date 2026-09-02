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
  BarChart3
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
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "DSA Visualization",
    url: "/dsa-visualization",
    icon: BrainCircuit,
  },
  {
    title: "Complexity Matrix",
    url: "/visualizer/complexity-matrix",
    icon: BarChart3,
  },
];

const dataStructures = [
  { name: "Linked List", url: "/visualizer/linked-list", icon: List, description: "Singly, doubly & circular linked lists" },
  { name: "Stack", url: "/visualizer/stack", icon: SquareStack, description: "LIFO data structure with push/pop" },
  { name: "Queue", url: "/visualizer/queue", icon: SquareChevronLeft, description: "FIFO queue & circular buffer" },
  { name: "Binary Search Tree", url: "/visualizer/binary-tree", icon: Binary, description: "BST properties & traversals" },
  { name: "AVL Tree", url: "/visualizer/avl-tree", icon: TreePine, description: "Self-balancing AVL tree rotations" },
  { name: "Heap / Priority Queue", url: "/visualizer/heap", icon: Database, description: "Min/Max binary heap" },
  { name: "Hash Table & Collisions", url: "/visualizer/hashing", icon: Hash, description: "Chaining & linear probing" },
  { name: "Trie (Prefix Tree)", url: "/visualizer/trie", icon: Code2, description: "Prefix dictionary autocomplete" },
];

const sortingAlgorithms = [
  { name: "Bubble Sort", url: "/visualizer/bubble-sort", icon: ArrowDownUp, description: "Adjacent comparisons & swaps" },
  { name: "Selection Sort", url: "/visualizer/selection-sort", icon: ArrowDownUp, description: "Minimum element selection" },
  { name: "Insertion Sort", url: "/visualizer/insertion-sort", icon: ArrowDownUp, description: "Adaptive backward shifting" },
  { name: "Merge Sort", url: "/visualizer/merge-sort", icon: ArrowDownUp, description: "Divide-and-conquer O(n log n)" },
  { name: "Quick Sort", url: "/visualizer/quick-sort", icon: ArrowDownUp, description: "Pivot partitioning" },
  { name: "Heap Sort", url: "/visualizer/heap-sort", icon: ArrowDownUp, description: "In-place heap sorting" },
  { name: "Counting Sort", url: "/visualizer/counting-sort", icon: ArrowDownUp, description: "Non-comparison linear sorting" },
  { name: "Cyclic Sort", url: "/visualizer/cyclic-sort", icon: ArrowDownUp, description: "1 to N in-place placement" },
];

const searchingAlgorithms = [
  { name: "Binary Search", url: "/visualizer/binary-search", icon: Search, description: "Logarithmic O(log n) search" },
  { name: "Linear Search", url: "/visualizer/linear-search", icon: Search, description: "Sequential scan" },
];

const algorithmicPatterns = [
  { name: "Two Pointers", url: "/visualizer/two-pointers", icon: ArrowRightLeft, description: "Two Sum II & Container Most Water" },
  { name: "Sliding Window", url: "/visualizer/sliding-window", icon: ArrowRightLeft, description: "Running subarray metrics" },
  { name: "Kadane's Algorithm", url: "/visualizer/kadanes-algorithm", icon: TrendingUp, description: "Max contiguous subarray sum" },
  { name: "Prefix Sum", url: "/visualizer/prefix-sum", icon: Layers, description: "O(1) Range sum queries" },
  { name: "Difference Array", url: "/visualizer/difference-array", icon: Layers, description: "O(1) Interval range updates" },
  { name: "Dutch National Flag", url: "/visualizer/dutch-national-flag", icon: Flag, description: "3-Way sort colors partitioning" },
  { name: "Boyer-Moore", url: "/visualizer/boyer-moore", icon: Vote, description: "Majority element voting" },
];

const recursionAndBacktracking = [
  { name: "Custom Recursion Studio", url: "/visualizer/custom-recursion", icon: BrainCircuit, description: "Live call stack & recursion tree" },
  { name: "N-Queens Backtracking", url: "/visualizer/n-queens", icon: Crown, description: "N-Queens chessboard backtracking" },
];

const graphAndDp = [
  { name: "Dijkstra's Algorithm", url: "/visualizer/dijkstra", icon: ArrowRightLeft, description: "Shortest path algorithm" },
  { name: "Graph Traversals (BFS/DFS)", url: "/visualizer/graph-traversal", icon: GitBranch, description: "BFS & DFS graph search" },
  { name: "0/1 Knapsack (DP)", url: "/visualizer/knapsack", icon: Cpu, description: "Dynamic programming capacity matrix" },
  { name: "Activity Selection (Greedy)", url: "/visualizer/greedy-activity", icon: Zap, description: "Greedy interval scheduling" },
];

const applications = [
  { name: "Message Queue", url: "/visualizer/queue-applications", icon: MessageSquare, description: "Producer-consumer queue simulation" },
  { name: "Infix to Postfix", url: "/visualizer/stack-applications", icon: Equal, description: "Shunting-yard operator precedence" },
  { name: "Polynomial Multiplication", url: "/visualizer/polynomial", icon: X, description: "Multiply polynomials using linked lists" },
  { name: "Huffman Coding", url: "/visualizer/huffman", icon: Hash, description: "Prefix tree compression" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-6 py-4 border-b flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-foreground" />
          <h1 className="text-sm font-semibold tracking-tight">Data Structure Visualizer</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        <NavProjects
          title="Data Structures"
          projects={dataStructures.map((ds) => ({
            name: ds.name,
            url: ds.url,
            icon: ds.icon,
            description: ds.description,
          }))}
        />
        <NavProjects
          title="Sorting Simulators"
          projects={sortingAlgorithms.map((s) => ({
            name: s.name,
            url: s.url,
            icon: s.icon,
            description: s.description,
          }))}
        />
        <NavProjects
          title="Searching Simulators"
          projects={searchingAlgorithms.map((s) => ({
            name: s.name,
            url: s.url,
            icon: s.icon,
            description: s.description,
          }))}
        />
        <NavProjects
          title="Algorithmic Patterns"
          projects={algorithmicPatterns.map((p) => ({
            name: p.name,
            url: p.url,
            icon: p.icon,
            description: p.description,
          }))}
        />
        <NavProjects
          title="Recursion Studio"
          projects={recursionAndBacktracking.map((r) => ({
            name: r.name,
            url: r.url,
            icon: r.icon,
            description: r.description,
          }))}
        />
        <NavProjects
          title="Graphs & DP"
          projects={graphAndDp.map((g) => ({
            name: g.name,
            url: g.url,
            icon: g.icon,
            description: g.description,
          }))}
        />
        <NavProjects
          title="Applications"
          projects={applications.map((app) => ({
            name: app.name,
            url: app.url,
            icon: app.icon,
            description: app.description,
          }))}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}