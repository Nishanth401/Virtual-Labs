"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  TrendingUp,
  Layers,
  Flag,
  Vote,
  Code2,
  GitBranch,
  Cpu,
  Zap,
  Crown,
  BarChart3,
  CheckCircle2,
  Circle,
  Flame,
  RotateCcw,
  ArrowRight
} from "lucide-react";

interface TopicItem {
  id: string;
  name: string;
  phase: "Phase 1" | "Phase 2" | "Phase 3" | "Phase 4" | "Phase 6";
  phaseColor: string;
  description: string;
  href: string;
  icon: React.ElementType;
  timeComplexity: string;
  spaceComplexity: string;
  tags: string[];
}

interface PhaseSection {
  id: string;
  phaseNumber: string;
  title: string;
  badge: string;
  badgeColor: string;
  borderColor: string;
  description: string;
  items: TopicItem[];
}

const FAANG_SECTIONS: PhaseSection[] = [
  // ==========================================
  // PHASE 1: COMPLEXITY & PREREQUISITES
  // ==========================================
  {
    id: "phase-1",
    phaseNumber: "Phase 1",
    title: "Complexity Analysis & Fundamentals",
    badge: "Prerequisites",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    borderColor: "border-emerald-500/20",
    description: "Foundational mathematical and asymptotic frameworks: Big-O, Big-Omega, Big-Theta, and memory profiling.",
    items: [
      {
        id: "complexity-matrix",
        name: "Complexity & DS Matrix",
        phase: "Phase 1",
        phaseColor: "text-emerald-500",
        description: "Comprehensive Time & Space complexity comparison matrix (Big-O, Big-Omega, Big-Theta) for all data structures & algorithms.",
        href: "/visualizer/complexity-matrix",
        icon: BarChart3,
        timeComplexity: "O(1) to O(2ⁿ)",
        spaceComplexity: "Asymptotics",
        tags: ["Big-O", "Asymptotics", "Master Theorem"],
      },
      {
        id: "amortized-analysis",
        name: "Amortized Analysis Visualizer",
        phase: "Phase 1",
        phaseColor: "text-emerald-500",
        description: "Step through dynamic array resizing and hash table rehashing to understand why occasional O(n) operations average out to O(1).",
        href: "/visualizer/cyclic-sort",
        icon: TrendingUp,
        timeComplexity: "O(1) Amortized",
        spaceComplexity: "O(n)",
        tags: ["Amortization", "Capacity Doubling", "Rehashing"],
      },
      {
        id: "space-complexity",
        name: "Space Complexity Analyzer",
        phase: "Phase 1",
        phaseColor: "text-emerald-500",
        description: "Interactive breakdown of Auxiliary Space vs. Total Space, visualizing call stack memory during deep recursion and dynamic memory heaps.",
        href: "/visualizer/custom-recursion",
        icon: Layers,
        timeComplexity: "O(1)",
        spaceComplexity: "Aux vs Total",
        tags: ["Stack vs Heap", "Memory Footprint", "Call Frames"],
      },
    ],
  },

  // ==========================================
  // PHASE 2: CORE DATA STRUCTURES
  // ==========================================
  {
    id: "phase-2",
    phaseNumber: "Phase 2",
    title: "Core Data Structures",
    badge: "Building Blocks",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    borderColor: "border-blue-500/20",
    description: "Fundamental memory structures, sequential access buffers, linked nodes, balanced trees, and hash mappings.",
    items: [
      {
        id: "linked-list",
        name: "Linked List (Singly, Doubly, Circular)",
        phase: "Phase 2",
        phaseColor: "text-blue-500",
        description: "Dynamic data structure with nodes connected through references. Visualize singly, doubly, and circular linked lists, plus advanced pointer manipulations.",
        href: "/visualizer/linked-list",
        icon: List,
        timeComplexity: "O(1) Head",
        spaceComplexity: "O(n)",
        tags: ["Singly", "Doubly", "Circular", "Pointers"],
      },
      {
        id: "stack",
        name: "Stack & Monotonic Stack",
        phase: "Phase 2",
        phaseColor: "text-blue-500",
        description: "LIFO data structure supporting push and pop operations. Visualize stack memory, state transitions, and Monotonic Stacks (Next Greater/Smaller Element).",
        href: "/visualizer/stack",
        icon: ArrowLeftRight,
        timeComplexity: "O(1)",
        spaceComplexity: "O(n)",
        tags: ["LIFO", "Monotonic Stack", "Next Greater Element"],
      },
      {
        id: "queue",
        name: "Queue, Circular Queue & Deque",
        phase: "Phase 2",
        phaseColor: "text-blue-500",
        description: "FIFO data structure for managing ordered elements. Visualize enqueue, dequeue, circular queues, deques, and Monotonic Queues (Sliding Window Maximum).",
        href: "/visualizer/queue",
        icon: ArrowLeftRight,
        timeComplexity: "O(1)",
        spaceComplexity: "O(n)",
        tags: ["FIFO", "Circular Queue", "Deque", "Monotonic Queue"],
      },
      {
        id: "binary-tree",
        name: "Binary Search Tree (BST)",
        phase: "Phase 2",
        phaseColor: "text-blue-500",
        description: "Binary tree that maintains sorted data with O(log n) search, insert, and Inorder/Preorder/Postorder traversals.",
        href: "/visualizer/binary-tree",
        icon: Binary,
        timeComplexity: "O(h)",
        spaceComplexity: "O(n)",
        tags: ["BST", "Tree Traversal", "Inorder", "Floor/Ceil"],
      },
      {
        id: "avl-tree",
        name: "AVL Tree (Balanced BST)",
        phase: "Phase 2",
        phaseColor: "text-blue-500",
        description: "Self-balancing BST that maintains height balance factor via LL, RR, LR, and RL rotation passes in real-time.",
        href: "/visualizer/avl-tree",
        icon: TreePine,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(n)",
        tags: ["Self-Balancing", "Rotations", "Height Balanced"],
      },
      {
        id: "heap",
        name: "Heap / Priority Queue",
        phase: "Phase 2",
        phaseColor: "text-blue-500",
        description: "Complete binary tree with heap property. Switch interactively between min-heap and max-heap array representations, and visualize K-way merging.",
        href: "/visualizer/heap",
        icon: Box,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(n)",
        tags: ["Min-Heap", "Max-Heap", "Priority Queue", "K-Way Merge"],
      },
      {
        id: "hash-table",
        name: "Hash Table & Collisions",
        phase: "Phase 2",
        phaseColor: "text-blue-500",
        description: "Hash map internal mechanics showcasing Chaining (linked lists) and Open Addressing (linear/quadratic probing) collision handling, plus load-factor rehashing.",
        href: "/visualizer/hashing",
        icon: Hash,
        timeComplexity: "O(1) Avg",
        spaceComplexity: "O(n)",
        tags: ["Chaining", "Open Addressing", "Rehashing", "Load Factor"],
      },
      {
        id: "trie",
        name: "Trie (Prefix Tree)",
        phase: "Phase 2",
        phaseColor: "text-blue-500",
        description: "Prefix tree for dictionary retrieval and search autocomplete. Visualize node branching, prefix matching, and Compressed Tries (Radix Trees).",
        href: "/visualizer/trie",
        icon: Code2,
        timeComplexity: "O(L) Length",
        spaceComplexity: "O(Alphabet × N)",
        tags: ["Prefix Tree", "Autocomplete", "Radix Tree"],
      },
    ],
  },

  // ==========================================
  // PHASE 3: SORTING ALGORITHMS
  // ==========================================
  {
    id: "phase-3-sorting",
    phaseNumber: "Phase 3",
    title: "Sorting Algorithms",
    badge: "Core Algorithms",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    borderColor: "border-amber-500/20",
    description: "Comparison-based and non-comparison sorting with audio pitch synthesis, step scrubbers, and live line highlighters.",
    items: [
      {
        id: "bubble-sort",
        name: "Bubble Sort",
        phase: "Phase 3",
        phaseColor: "text-amber-500",
        description: "Adjacent comparison and in-place swapping passes with animated vertical bars, sound synthesis, and live execution metrics.",
        href: "/visualizer/bubble-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        tags: ["Stable", "Comparison", "In-Place"],
      },
      {
        id: "selection-sort",
        name: "Selection Sort",
        phase: "Phase 3",
        phaseColor: "text-amber-500",
        description: "Scans unsorted partition to find minimum element and swaps it to beginning with minimal total memory writes.",
        href: "/visualizer/selection-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        tags: ["Unstable", "In-Place", "Min Swaps"],
      },
      {
        id: "insertion-sort",
        name: "Insertion Sort",
        phase: "Phase 3",
        phaseColor: "text-amber-500",
        description: "Adaptive online card-sorting algorithm that builds sorted output one item at a time via backward shifting.",
        href: "/visualizer/insertion-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        tags: ["Adaptive", "Stable", "Online"],
      },
      {
        id: "merge-sort",
        name: "Merge Sort",
        phase: "Phase 3",
        phaseColor: "text-amber-500",
        description: "Divide-and-conquer O(n log n) stable sorting splitting arrays into halves and recursively merging ordered sub-arrays.",
        href: "/visualizer/merge-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        tags: ["Divide & Conquer", "Stable", "Guaranteed O(n log n)"],
      },
      {
        id: "quick-sort",
        name: "Quick Sort",
        phase: "Phase 3",
        phaseColor: "text-amber-500",
        description: "Lomuto/Hoare pivot partitioning and recursive sub-array sorting. Highly cache-efficient industry standard algorithm.",
        href: "/visualizer/quick-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        tags: ["Partitioning", "In-Place", "Cache Locality"],
      },
      {
        id: "heap-sort",
        name: "Heap Sort",
        phase: "Phase 3",
        phaseColor: "text-amber-500",
        description: "Constructs max-heap from input and repeatedly extracts root to achieve in-place O(n log n) sorting.",
        href: "/visualizer/heap-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        tags: ["In-Place", "Priority Queue", "Heapify"],
      },
      {
        id: "counting-sort",
        name: "Counting Sort",
        phase: "Phase 3",
        phaseColor: "text-amber-500",
        description: "Non-comparison linear integer sorting using frequency tallying arrays and cumulative prefix sums.",
        href: "/visualizer/counting-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n+k)",
        spaceComplexity: "O(k)",
        tags: ["Non-Comparison", "Linear Time", "Frequency Count"],
      },
      {
        id: "cyclic-sort",
        name: "Cyclic Sort",
        phase: "Phase 3",
        phaseColor: "text-amber-500",
        description: "In-place number placement pattern for array containing numbers 1 to N in O(n) time and O(1) space.",
        href: "/visualizer/cyclic-sort",
        icon: ArrowDownUp,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        tags: ["Competitive Pattern", "1 to N", "In-Place"],
      },
    ],
  },

  // ==========================================
  // PHASE 3: SEARCHING & ALGORITHMIC PATTERNS
  // ==========================================
  {
    id: "phase-3-patterns",
    phaseNumber: "Phase 3",
    title: "Searching & Algorithmic Patterns",
    badge: "FAANG Interview Core",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    borderColor: "border-purple-500/20",
    description: "The algorithmic techniques that solve 80% of LeetCode Medium/Hard interview challenges.",
    items: [
      {
        id: "binary-search",
        name: "Binary Search",
        phase: "Phase 3",
        phaseColor: "text-purple-500",
        description: "Logarithmic divide-and-conquer search halving search partition at each step using Low, Mid, and High pointers. (Includes Search Space Reduction & Rotated Arrays).",
        href: "/visualizer/binary-search",
        icon: Search,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        tags: ["Divide & Conquer", "Lower/Upper Bound", "Rotated Array"],
      },
      {
        id: "linear-search",
        name: "Linear Search",
        phase: "Phase 3",
        phaseColor: "text-purple-500",
        description: "Sequential search checking elements one by one across unsorted memory arrays from start to finish.",
        href: "/visualizer/linear-search",
        icon: Search,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        tags: ["Sequential", "Brute Force", "Unsorted"],
      },
      {
        id: "two-pointers",
        name: "Two Pointers",
        phase: "Phase 3",
        phaseColor: "text-purple-500",
        description: "Inward & synchronized pointer stepping across sorted arrays. Solve Two Sum II and Container With Most Water in O(n).",
        href: "/visualizer/two-pointers",
        icon: ArrowRightLeft,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        tags: ["Opposite Direction", "Two Sum II", "Most Water"],
      },
      {
        id: "sliding-window",
        name: "Sliding Window",
        phase: "Phase 3",
        phaseColor: "text-purple-500",
        description: "Contiguous window overlay tracking running metrics across subarrays. Master fixed-size and dynamic-expansion windows.",
        href: "/visualizer/sliding-window",
        icon: ArrowRightLeft,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        tags: ["Fixed Window", "Dynamic Window", "Subarrays"],
      },
      {
        id: "kadanes-algorithm",
        name: "Kadane's Algorithm",
        phase: "Phase 3",
        phaseColor: "text-purple-500",
        description: "Maximum contiguous subarray sum tracking with dynamic resets. Solve the classic LeetCode 53 problem interactively.",
        href: "/visualizer/kadanes-algorithm",
        icon: TrendingUp,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        tags: ["Max Subarray", "Dynamic Resets", "LeetCode 53"],
      },
      {
        id: "prefix-sum",
        name: "Prefix Sum",
        phase: "Phase 3",
        phaseColor: "text-purple-500",
        description: "Precomputed cumulative sum array enabling instant O(1) Range Sum Queries across any interval [L, R].",
        href: "/visualizer/prefix-sum",
        icon: Calculator,
        timeComplexity: "O(1) Query",
        spaceComplexity: "O(n)",
        tags: ["Range Sum Query", "O(1) Lookup", "Subarray Sum"],
      },
      {
        id: "difference-array",
        name: "Difference Array",
        phase: "Phase 3",
        phaseColor: "text-purple-500",
        description: "Efficient O(1) interval range updates with prefix sum reconstruction for multiple concurrent updates.",
        href: "/visualizer/difference-array",
        icon: Layers,
        timeComplexity: "O(1) Update",
        spaceComplexity: "O(n)",
        tags: ["Range Update", "Reconstruction", "Interval Operations"],
      },
      {
        id: "dutch-national-flag",
        name: "Dutch National Flag",
        phase: "Phase 3",
        phaseColor: "text-purple-500",
        description: "3-way partitioning of 0s, 1s, and 2s in a single pass using Low, Mid, High pointers (LeetCode 75 Sort Colors).",
        href: "/visualizer/dutch-national-flag",
        icon: Flag,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        tags: ["3-Way Partition", "Sort Colors", "Single Pass"],
      },
      {
        id: "boyer-moore",
        name: "Boyer-Moore Majority Vote",
        phase: "Phase 3",
        phaseColor: "text-purple-500",
        description: "Identify majority elements (> N/2) in linear time and O(1) space with candidate cancellation passes.",
        href: "/visualizer/boyer-moore",
        icon: Vote,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        tags: ["Majority Element", "Cancellation Pass", "O(1) Space"],
      },
    ],
  },

  // ==========================================
  // PHASE 3: RECURSION & BACKTRACKING
  // ==========================================
  {
    id: "phase-3-recursion",
    phaseNumber: "Phase 3",
    title: "Recursion & Backtracking Studio",
    badge: "Recursion Engine",
    badgeColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
    borderColor: "border-pink-500/20",
    description: "Live call stack unwinding, recursive tree branching, state restoring, and combinatorial search.",
    items: [
      {
        id: "custom-recursion",
        name: "Custom Recursion Studio (Call Stack & Tree)",
        phase: "Phase 3",
        phaseColor: "text-pink-500",
        description: "Live Call Stack and Recursion Tree Visualizer with step-by-step frame unwinding, Factorial, Fibonacci, and custom code execution from Recursion Visualizer.",
        href: "/visualizer/custom-recursion",
        icon: BrainCircuit,
        timeComplexity: "Branching",
        spaceComplexity: "Call Stack",
        tags: ["Call Stack", "Recursion Tree", "Frame Unwinding", "Custom Code"],
      },
      {
        id: "n-queens",
        name: "N-Queens Backtracking",
        phase: "Phase 3",
        phaseColor: "text-pink-500",
        description: "Constraint satisfaction backtracking tree placing N non-attacking queens on an N×N chessboard with row/col/diagonal pruning.",
        href: "/visualizer/n-queens",
        icon: Crown,
        timeComplexity: "O(N!)",
        spaceComplexity: "O(N)",
        tags: ["Constraint Satisfaction", "Pruning", "Chessboard"],
      },
    ],
  },

  // ==========================================
  // PHASE 4: GRAPH ALGORITHMS
  // ==========================================
  {
    id: "phase-4",
    phaseNumber: "Phase 4",
    title: "Graph Algorithms & Networks",
    badge: "FAANG Heavy",
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    borderColor: "border-rose-500/20",
    description: "Traversals, shortest paths, minimum spanning trees, and network topologies tested heavily in FAANG interviews.",
    items: [
      {
        id: "graph-traversal",
        name: "Graph Traversals (BFS & DFS)",
        phase: "Phase 4",
        phaseColor: "text-rose-500",
        description: "Breadth-First Search (queue level-order) and Depth-First Search (stack/recursion) connected component exploration.",
        href: "/visualizer/graph-traversal",
        icon: GitBranch,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        tags: ["BFS", "DFS", "Level Order", "Connected Components"],
      },
      {
        id: "dijkstra",
        name: "Dijkstra's Algorithm",
        phase: "Phase 4",
        phaseColor: "text-rose-500",
        description: "Greedy single-source shortest path algorithm on weighted graphs with priority queue distance relaxation.",
        href: "/visualizer/dijkstra",
        icon: ArrowRightLeft,
        timeComplexity: "O((V+E)logV)",
        spaceComplexity: "O(V)",
        tags: ["Shortest Path", "Priority Queue", "Edge Relaxation"],
      },
    ],
  },

  // ==========================================
  // PHASE 3 & 4: DYNAMIC PROGRAMMING & GREEDY
  // ==========================================
  {
    id: "phase-dp-greedy",
    phaseNumber: "Phase 3/4",
    title: "Dynamic Programming & Greedy",
    badge: "High Frequency",
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    borderColor: "border-indigo-500/20",
    description: "Optimal substructure, overlapping subproblems, memoization vs. tabulation, and greedy choice properties.",
    items: [
      {
        id: "knapsack",
        name: "0/1 & Unbounded Knapsack",
        phase: "Phase 3",
        phaseColor: "text-indigo-500",
        description: "2D dynamic programming grid solving capacity vs. value maximization with optimal substructure.",
        href: "/visualizer/knapsack",
        icon: Cpu,
        timeComplexity: "O(N × W)",
        spaceComplexity: "O(N × W)",
        tags: ["2D DP Grid", "Capacity Subproblems", "Optimal Substructure"],
      },
      {
        id: "greedy-activity",
        name: "Activity Selection (Greedy)",
        phase: "Phase 3",
        phaseColor: "text-indigo-500",
        description: "Interval scheduling maximizing non-overlapping activities using the greedy choice property.",
        href: "/visualizer/greedy-activity",
        icon: Zap,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        tags: ["Greedy Choice", "Interval Scheduling", "Earliest Finish"],
      },
    ],
  },

  // ==========================================
  // PHASE 6: APPLIED SYSTEMS, LLD & ENGINEERING
  // ==========================================
  {
    id: "phase-6",
    phaseNumber: "Phase 6",
    title: "Applied Systems & Engineering Applications",
    badge: "SDE Add-ons",
    badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    borderColor: "border-cyan-500/20",
    description: "Expression parsers, distributed message queues, compression algorithms, and production data structures.",
    items: [
      {
        id: "stack-applications",
        name: "Infix to Postfix Conversion",
        phase: "Phase 6",
        phaseColor: "text-cyan-500",
        description: "Convert infix expressions to postfix notation using stacks. Step through operator precedence and parentheses.",
        href: "/visualizer/stack-applications",
        icon: Calculator,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        tags: ["Shunting-Yard", "Operator Precedence", "Stack Evaluator"],
      },
      {
        id: "queue-applications",
        name: "Message Queue Simulation",
        phase: "Phase 6",
        phaseColor: "text-cyan-500",
        description: "Simulate message queuing systems with producers and consumers. Visualize bounded queue capacity and message flow.",
        href: "/visualizer/queue-applications",
        icon: MessageSquare,
        timeComplexity: "O(1)",
        spaceComplexity: "O(n)",
        tags: ["Producer-Consumer", "Bounded Buffer", "Distributed Flow"],
      },
      {
        id: "polynomial",
        name: "Polynomial Multiplication",
        phase: "Phase 6",
        phaseColor: "text-cyan-500",
        description: "Multiply two polynomials using linked lists. Step through term-by-term multiplication and coefficient combining.",
        href: "/visualizer/polynomial",
        icon: Calculator,
        timeComplexity: "O(m*n)",
        spaceComplexity: "O(m+n)",
        tags: ["Linked List Application", "Term Multiplication", "Algebra"],
      },
      {
        id: "huffman",
        name: "Huffman Coding Compression",
        phase: "Phase 6",
        phaseColor: "text-cyan-500",
        description: "Lossless data compression technique creating variable-length prefix codes based on character frequency trees.",
        href: "/visualizer/huffman",
        icon: Hash,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        tags: ["Prefix Codes", "Compression", "Frequency Trees"],
      },
    ],
  },
];

export default function DSAVisualizationPage() {
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<string>("all");
  const [filterState, setFilterState] = useState<"all" | "completed" | "pending">("all");

  // Load persistence from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dsa_master_completed_topics");
      if (saved) {
        setCompletedMap(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load progress from localStorage", e);
    }
  }, []);

  // Save persistence to localStorage
  const toggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCompletedMap((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("dsa_master_completed_topics", JSON.stringify(next));
      } catch (err) {
        console.error("Failed to save progress", err);
      }
      return next;
    });
  };

  const resetAllProgress = () => {
    if (confirm("Are you sure you want to reset your FAANG study checklist progress?")) {
      setCompletedMap({});
      try {
        localStorage.removeItem("dsa_master_completed_topics");
      } catch (e) {}
    }
  };

  // Flattened total topic list
  const allTopics = useMemo(() => {
    return FAANG_SECTIONS.flatMap((sec) => sec.items);
  }, []);

  const totalCount = allTopics.length;
  const completedCount = useMemo(() => {
    return allTopics.filter((t) => completedMap[t.id]).length;
  }, [allTopics, completedMap]);

  const progressPercentage = Math.round((completedCount / (totalCount || 1)) * 100);

  // Readiness Tier
  const readinessTier = useMemo(() => {
    if (progressPercentage >= 80) return { label: "FAANG / MAANG Master", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/30" };
    if (progressPercentage >= 50) return { label: "Interview Ready", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/30" };
    if (progressPercentage >= 20) return { label: "Intermediate", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/30" };
    return { label: "Novice Preparation", color: "text-slate-500", bg: "bg-muted border-border" };
  }, [progressPercentage]);

  // Filtered Sections
  const filteredSections = useMemo(() => {
    return FAANG_SECTIONS.map((sec) => {
      if (selectedPhase !== "all" && sec.id !== selectedPhase) {
        return { ...sec, items: [] };
      }

      const matching = sec.items.filter((item) => {
        const matchesQuery =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const isDone = !!completedMap[item.id];
        const matchesStatus =
          filterState === "all" ||
          (filterState === "completed" && isDone) ||
          (filterState === "pending" && !isDone);

        return matchesQuery && matchesStatus;
      });

      return { ...sec, items: matching };
    }).filter((sec) => sec.items.length > 0);
  }, [searchQuery, selectedPhase, filterState, completedMap]);

  return (
    <div className="container py-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section matching dsa-visualizer-main */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="flex items-center gap-3">
          <BrainCircuit className="h-10 w-10 text-foreground" />
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Data Structure Visualizer</h1>
        </div>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
          Interactive visualizations to help you understand data structures and algorithms.
          Explore, learn, and see how they work in real-time.
        </p>
      </div>

      {/* Interactive Progress Tracking Banner */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`font-mono text-xs font-bold ${readinessTier.bg} ${readinessTier.color}`}>
                <Flame className="h-3.5 w-3.5 mr-1 inline animate-bounce" /> {readinessTier.label}
              </Badge>
              <Badge variant="secondary" className="font-mono text-xs">
                FAANG / MAANG Preparation Checklist
              </Badge>
            </div>
            <div className="text-lg font-bold text-foreground flex items-center gap-2">
              <span>{completedCount} of {totalCount} Topics Mastered</span>
              <span className="text-xs font-mono text-muted-foreground">({progressPercentage}% Completed)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {completedCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetAllProgress}
                className="h-8 text-xs font-mono text-muted-foreground hover:text-rose-500 gap-1.5"
                title="Reset all completed checkboxes"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </Button>
            )}

            <Button asChild size="sm" className="h-8 text-xs font-bold gap-1.5 bg-primary text-primary-foreground">
              <Link href="/visualizer/custom-recursion">
                <BrainCircuit className="h-3.5 w-3.5" />
                <span>Recursion Studio</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Dynamic Animated Progress Bar */}
        <div className="space-y-1.5">
          <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden relative">
            <div
              style={{ width: `${progressPercentage}%` }}
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
            <span>Phase 1: Foundations</span>
            <span>Phase 2: Core DS</span>
            <span>Phase 3: Patterns</span>
            <span>Phase 4: Graphs</span>
            <span>Phase 6: Engineering</span>
          </div>
        </div>

        {/* Phase Filter Tabs & Search Bar */}
        <div className="pt-2 border-t border-border/60 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Phase Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <Button
              size="sm"
              variant={selectedPhase === "all" ? "default" : "outline"}
              onClick={() => setSelectedPhase("all")}
              className="h-7 text-xs font-semibold shrink-0"
            >
              All Topics
            </Button>
            <Button
              size="sm"
              variant={selectedPhase === "phase-1" ? "default" : "outline"}
              onClick={() => setSelectedPhase("phase-1")}
              className="h-7 text-xs font-semibold shrink-0"
            >
              Phase 1: Complexity
            </Button>
            <Button
              size="sm"
              variant={selectedPhase === "phase-2" ? "default" : "outline"}
              onClick={() => setSelectedPhase("phase-2")}
              className="h-7 text-xs font-semibold shrink-0"
            >
              Phase 2: Core DS
            </Button>
            <Button
              size="sm"
              variant={selectedPhase === "phase-3-sorting" ? "default" : "outline"}
              onClick={() => setSelectedPhase("phase-3-sorting")}
              className="h-7 text-xs font-semibold shrink-0"
            >
              Phase 3: Sorting
            </Button>
            <Button
              size="sm"
              variant={selectedPhase === "phase-3-patterns" ? "default" : "outline"}
              onClick={() => setSelectedPhase("phase-3-patterns")}
              className="h-7 text-xs font-semibold shrink-0"
            >
              Phase 3: Patterns
            </Button>
            <Button
              size="sm"
              variant={selectedPhase === "phase-4" ? "default" : "outline"}
              onClick={() => setSelectedPhase("phase-4")}
              className="h-7 text-xs font-semibold shrink-0"
            >
              Phase 4: Graphs
            </Button>
          </div>

          {/* Status & Search Control */}
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value as any)}
              className="h-8 text-xs font-mono rounded-lg border border-border bg-card px-2.5 text-foreground"
            >
              <option value="all">Status: All</option>
              <option value="completed">Status: Mastered (✓)</option>
              <option value="pending">Status: Incomplete</option>
            </select>

            <div className="relative w-48 sm:w-56">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Filter topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 text-xs pl-8 font-mono bg-card"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sections and Cards Grid */}
      <div className="space-y-12">
        {filteredSections.map((section) => (
          <section key={section.id} className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`font-mono text-xs font-bold ${section.badgeColor}`}>
                    {section.badge}
                  </Badge>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    {section.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">{section.description}</p>
              </div>

              <Badge variant="secondary" className="font-mono text-xs self-start sm:self-auto">
                {section.items.filter((i) => completedMap[i.id]).length} / {section.items.length} Done
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isDone = !!completedMap[item.id];

                return (
                  <div
                    key={item.id}
                    className="transition-all duration-200 hover:-translate-y-1"
                  >
                    <Card
                      className={`h-full border transition-all duration-200 flex flex-col justify-between relative overflow-hidden group ${
                        isDone
                          ? "bg-emerald-500/[0.04] border-emerald-500/40 shadow-xs"
                          : "hover:bg-muted/40 hover:border-primary/40 shadow-xs"
                      }`}
                    >
                      {/* Status Checkmark Ribbon Top-Right */}
                      {isDone && (
                        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                          <div className="bg-emerald-500 text-white text-[9px] font-bold py-0.5 text-center transform rotate-45 translate-x-3 translate-y-1 shadow-xs">
                            DONE
                          </div>
                        </div>
                      )}

                      <CardHeader className="p-5 pb-2">
                        <div className="flex items-start justify-between gap-3">
                          <Link href={item.href} className="flex items-center gap-3 group-hover:text-primary transition-colors flex-1 min-w-0">
                            <div className={`p-2 rounded-xl border shrink-0 transition-transform group-hover:scale-105 ${
                              isDone ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-muted text-foreground border-border"
                            }`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-base font-bold tracking-tight line-clamp-1">
                              {item.name}
                            </CardTitle>
                          </Link>

                          {/* Interactive Checklist Checkbox */}
                          <button
                            onClick={(e) => toggleComplete(item.id, e)}
                            title={isDone ? "Mark as Incomplete" : "Mark as Mastered (Check off)"}
                            className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                              isDone
                                ? "bg-emerald-500 text-white border-emerald-600 shadow-xs scale-105"
                                : "bg-muted/50 border-border text-muted-foreground hover:border-emerald-500/50 hover:text-emerald-500"
                            }`}
                          >
                            {isDone ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <Circle className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </CardHeader>

                      <CardContent className="p-5 pt-1 space-y-4">
                        <Link href={item.href} className="block">
                          <CardDescription className="text-xs leading-relaxed line-clamp-3 text-muted-foreground group-hover:text-foreground/80 transition-colors">
                            {item.description}
                          </CardDescription>
                        </Link>

                        {/* Tags & Complexity Row */}
                        <div className="pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                          <div className="flex items-center gap-1.5">
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-border text-muted-foreground">
                              {item.timeComplexity}
                            </Badge>
                          </div>

                          <Button
                            asChild
                            size="sm"
                            variant="ghost"
                            className="h-6 text-[11px] font-semibold gap-1 text-primary group-hover:text-primary group-hover:bg-primary/10 px-2"
                          >
                            <Link href={item.href}>
                              <span>Launch Studio</span>
                              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
