"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  Zap,
  Sliders,
  Layers,
  ArrowRight,
  Sparkles,
  Info,
  ShieldCheck,
  ShieldAlert,
  Flame,
  Activity,
  Trophy,
  ExternalLink,
  TrendingUp,
  Cpu,
  BarChart3,
  Check
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SortingAlgorithm } from "@/hooks/use-sorting";

interface ComplexityPanelProps {
  algorithm: SortingAlgorithm;
}

interface CaseDetails {
  caseType: "best" | "avg" | "worst";
  title: string;
  badge: string;
  badgeColor: string;
  condition: string;
  sampleInput: string;
  explanation: string;
  formula: string;
  calcOps: (n: number) => { comparisons: number; swaps: number; total: number };
}

interface LeetCodeProblem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  companies: string[];
  pattern: string;
  url: string;
}

interface AlgorithmMetadata {
  name: string;
  runtimeMs: number;
  runtimePercentile: number;
  memoryMb: number;
  memoryPercentile: number;
  tcWorst: string;
  tcAvg: string;
  tcBest: string;
  scAux: string;
  cases: Record<"best" | "avg" | "worst", CaseDetails>;
  spaceExplanation: string;
  variables: { name: string; type: string; size: string; purpose: string }[];
  isStable: boolean;
  stabilityExplanation: string;
  stabilityExample: {
    input: string;
    output: string;
    note: string;
  };
  problems: LeetCodeProblem[];
  distPoints: { x: number; y: number }[]; // LeetCode distribution curve
}

const ALGO_METADATA: Record<SortingAlgorithm, AlgorithmMetadata> = {
  cyclic: {
    name: "Cyclic Sort",
    runtimeMs: 0,
    runtimePercentile: 100.0,
    memoryMb: 41.2,
    memoryPercentile: 98.4,
    tcWorst: "O(n)",
    tcAvg: "O(n)",
    tcBest: "O(n)",
    scAux: "O(1)",
    cases: {
      best: {
        caseType: "best",
        title: "Best Case Scenario",
        badge: "O(n)",
        badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
        condition: "Array Already In-Place (1..N Permutation)",
        sampleInput: "[1, 2, 3, 4, 5]",
        explanation:
          "Every element is already at its correct target index (arr[i] == i + 1). The pointer i iterates linearly from 0 to n - 1 with 0 swaps performed.",
        formula: "Comparisons = n, Swaps = 0",
        calcOps: (n) => ({ comparisons: n, swaps: 0, total: n })
      },
      avg: {
        caseType: "avg",
        title: "Average Case Scenario",
        badge: "O(n)",
        badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
        condition: "Random Displaced Numbers (1..N)",
        sampleInput: "[3, 5, 2, 1, 4]",
        explanation:
          "Each swap places at least one element directly into its final destination slot. At most n - 1 swaps occur across the entire traversal.",
        formula: "Comparisons ≤ 2n - 1, Swaps ≤ n - 1",
        calcOps: (n) => {
          const swaps = Math.round(n * 0.7);
          const comps = n + swaps;
          return { comparisons: comps, swaps, total: comps + swaps };
        }
      },
      worst: {
        caseType: "worst",
        title: "Worst Case Scenario",
        badge: "O(n)",
        badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
        condition: "Single Full Inversion Cycle",
        sampleInput: "[5, 4, 3, 2, 1]",
        explanation:
          "Maximum number of swaps is bounded by n - 1, and pointer i advances n times. Total operations are strictly linear O(n).",
        formula: "Comparisons = 2n - 1, Swaps = n - 1",
        calcOps: (n) => ({ comparisons: 2 * n - 1, swaps: n - 1, total: 3 * n - 2 })
      }
    },
    spaceExplanation:
      "Cyclic Sort operates strictly in-place with O(1) auxiliary space, using only a single iteration index pointer and an integer register for element swapping.",
    variables: [
      { name: "i", type: "int", size: "4 bytes", purpose: "Current array scan pointer" },
      { name: "correctIndex", type: "int", size: "4 bytes", purpose: "Calculated target placement slot" },
      { name: "temp", type: "int", size: "4 bytes", purpose: "Register for cyclic value swap" }
    ],
    isStable: true,
    stabilityExplanation:
      "Stable Pattern: Duplicate values are checked with `arr[i] == arr[correctIndex]` and skipped without extra swaps, maintaining relative ordering.",
    stabilityExample: {
      input: "[2, 1, 3a, 3b]",
      output: "[1, 2, 3a, 3b]",
      note: "3a and 3b remain in their relative arrival order."
    },
    problems: [
      { id: 268, title: "Missing Number", difficulty: "Easy", companies: ["Amazon", "Google", "Microsoft"], pattern: "Cyclic Sort Range [0..n]", url: "https://leetcode.com/problems/missing-number/" },
      { id: 448, title: "Find All Numbers Disappeared in an Array", difficulty: "Easy", companies: ["Amazon", "Google"], pattern: "In-Place Index Negation / Cyclic Swaps", url: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/" },
      { id: 287, title: "Find the Duplicate Number", difficulty: "Medium", companies: ["Amazon", "Microsoft", "Meta"], pattern: "Floyd Cycle / Cyclic Index Jump", url: "https://leetcode.com/problems/find-the-duplicate-number/" },
      { id: 41, title: "First Missing Positive", difficulty: "Hard", companies: ["Google", "Meta", "Apple"], pattern: "Cyclic Sort on Unbounded Range [1..n]", url: "https://leetcode.com/problems/first-missing-positive/" }
    ],
    distPoints: [
      { x: 0, y: 88 },
      { x: 1, y: 62 },
      { x: 2, y: 35 },
      { x: 3, y: 15 },
      { x: 4, y: 6 },
      { x: 5, y: 2 }
    ]
  },
  merge: {
    name: "Merge Sort",
    runtimeMs: 1,
    runtimePercentile: 96.5,
    memoryMb: 43.8,
    memoryPercentile: 89.2,
    tcWorst: "O(n log n)",
    tcAvg: "O(n log n)",
    tcBest: "O(n log n)",
    scAux: "O(n)",
    cases: {
      best: {
        caseType: "best",
        title: "Best Case Scenario",
        badge: "O(n log n)",
        badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
        condition: "Any Permutation (Guaranteed O(n log n))",
        sampleInput: "[10, 20, 30, 40, 50]",
        explanation:
          "Merge Sort recursively splits the array into log₂(n) levels and performs linear work O(n) on each level during the merge phase regardless of initial order.",
        formula: "Comparisons = n log₂(n) - n + 1, Writes = n log₂(n)",
        calcOps: (n) => {
          const logN = Math.log2(Math.max(n, 2));
          const comps = Math.round(n * logN - n + 1);
          const swaps = Math.round(n * logN);
          return { comparisons: comps, swaps, total: comps + swaps };
        }
      },
      avg: {
        caseType: "avg",
        title: "Average Case Scenario",
        badge: "O(n log n)",
        badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
        condition: "Random Order Permutations",
        sampleInput: "[38, 27, 43, 3, 9, 82, 10]",
        explanation:
          "Guaranteed divide-and-conquer tree depth of ceil(log₂ n) with linear merging time at every tier of the recursion tree.",
        formula: "T(n) = 2T(n/2) + O(n) = O(n log n)",
        calcOps: (n) => {
          const logN = Math.log2(Math.max(n, 2));
          const comps = Math.round(n * logN);
          const swaps = Math.round(n * logN);
          return { comparisons: comps, swaps, total: comps + swaps };
        }
      },
      worst: {
        caseType: "worst",
        title: "Worst Case Scenario",
        badge: "O(n log n)",
        badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
        condition: "Pathological Merge Patterns",
        sampleInput: "[4, 8, 2, 6, 1, 5, 3, 7]",
        explanation:
          "Even in the worst possible alternating configuration, the merge step never exceeds n - 1 comparisons per recursive level.",
        formula: "Comparisons = n log₂(n) - n + 1, Writes = n log₂(n)",
        calcOps: (n) => {
          const logN = Math.log2(Math.max(n, 2));
          const comps = Math.round(n * logN);
          const swaps = Math.round(n * logN);
          return { comparisons: comps, swaps, total: comps + swaps };
        }
      }
    },
    spaceExplanation:
      "Merge Sort allocates O(n) auxiliary memory to hold temporary subarrays (L and R) during the two-way merge phase, plus O(log n) call stack frames.",
    variables: [
      { name: "L[], R[]", type: "int[]", size: "O(n) bytes", purpose: "Temporary buffer arrays for merging split partitions" },
      { name: "mid", type: "int", size: "4 bytes", purpose: "Subarray midpoint calculation index" },
      { name: "i, j, k", type: "int, int, int", size: "12 bytes", purpose: "Merge pointer indices for left, right, and destination" }
    ],
    isStable: true,
    stabilityExplanation:
      "Stable Sort: When comparing left (L[i]) and right (R[j]), ties (L[i] == R[j]) are broken by picking the element from the left array L first, preserving input relative ordering.",
    stabilityExample: {
      input: "[5a, 2, 5b, 1]",
      output: "[1, 2, 5a, 5b]",
      note: "5a was in the left subarray and gets merged before 5b from the right subarray."
    },
    problems: [
      { id: 912, title: "Sort an Array", difficulty: "Medium", companies: ["Amazon", "Microsoft", "Apple"], pattern: "Divide and Conquer Merge", url: "https://leetcode.com/problems/sort-an-array/" },
      { id: 148, title: "Sort List", difficulty: "Medium", companies: ["Meta", "Google", "Amazon"], pattern: "Top-Down / Bottom-Up Merge Sort on Linked List", url: "https://leetcode.com/problems/sort-list/" },
      { id: 88, title: "Merge Sorted Array", difficulty: "Easy", companies: ["Meta", "Microsoft", "Amazon"], pattern: "Two-Pointer In-Place Merge from Right", url: "https://leetcode.com/problems/merge-sorted-array/" },
      { id: 493, title: "Reverse Pairs", difficulty: "Hard", companies: ["Google", "Amazon"], pattern: "Count Inversions during Merge Phase", url: "https://leetcode.com/problems/reverse-pairs/" }
    ],
    distPoints: [
      { x: 0, y: 22 },
      { x: 1, y: 78 },
      { x: 2, y: 55 },
      { x: 3, y: 28 },
      { x: 4, y: 12 },
      { x: 5, y: 4 }
    ]
  },
  quick: {
    name: "Quick Sort",
    runtimeMs: 1,
    runtimePercentile: 95.8,
    memoryMb: 42.4,
    memoryPercentile: 94.6,
    tcWorst: "O(n²)",
    tcAvg: "O(n log n)",
    tcBest: "O(n log n)",
    scAux: "O(log n)",
    cases: {
      best: {
        caseType: "best",
        title: "Best Case Scenario",
        badge: "O(n log n)",
        badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
        condition: "Pivot Always Bisects Array in Exact Halves",
        sampleInput: "[4, 2, 6, 1, 3, 5, 7]",
        explanation:
          "Every partition splits the problem into two equal subproblems of size n/2, yielding a balanced recursion tree of height log₂(n).",
        formula: "T(n) = 2T(n/2) + O(n) = O(n log n)",
        calcOps: (n) => {
          const logN = Math.log2(Math.max(n, 2));
          const comps = Math.round(n * logN);
          const swaps = Math.round(n * 0.5 * logN);
          return { comparisons: comps, swaps, total: comps + swaps };
        }
      },
      avg: {
        caseType: "avg",
        title: "Average Case Scenario",
        badge: "O(n log n)",
        badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
        condition: "Random Pivot Distributions",
        sampleInput: "[24, 9, 29, 14, 19, 27]",
        explanation:
          "On average, the partitions are reasonably well-balanced, yielding O(n log n) total depth and minimal memory footprint.",
        formula: "Comparisons ≈ 1.39 n log₂(n)",
        calcOps: (n) => {
          const logN = Math.log2(Math.max(n, 2));
          const comps = Math.round(1.39 * n * logN);
          const swaps = Math.round(0.6 * n * logN);
          return { comparisons: comps, swaps, total: comps + swaps };
        }
      },
      worst: {
        caseType: "worst",
        title: "Worst Case Scenario",
        badge: "O(n²)",
        badgeColor: "bg-rose-500/15 text-rose-500 border-rose-500/30",
        condition: "Already Sorted or Reverse Sorted (Lomuto Extreme Partitioning)",
        sampleInput: "[10, 20, 30, 40, 50]",
        explanation:
          "When the pivot is consistently the smallest or largest element, each partition reduces the problem size by only 1, degrading recursion depth to O(n).",
        formula: "Comparisons = n(n - 1) / 2, Swaps = n",
        calcOps: (n) => {
          const comps = (n * (n - 1)) / 2;
          return { comparisons: comps, swaps: n, total: comps + n };
        }
      }
    },
    spaceExplanation:
      "In-place partitioning requires O(1) auxiliary memory, but the recursion call stack takes O(log n) space on average.",
    variables: [
      { name: "pivot", type: "int", size: "4 bytes", purpose: "Partition boundary value" },
      { name: "i", type: "int", size: "4 bytes", purpose: "Boundary index of smaller elements" },
      { name: "j", type: "int", size: "4 bytes", purpose: "Forward partition scanner pointer" }
    ],
    isStable: false,
    stabilityExplanation:
      "Unstable Sort: Partitioning involves long-distance swaps across the pivot boundary, disrupting the relative ordering of equal elements.",
    stabilityExample: {
      input: "[5a, 5b, 3]",
      output: "[3, 5b, 5a]",
      note: "5a is swapped with 3 over 5b, inverting their original relative order."
    },
    problems: [
      { id: 215, title: "Kth Largest Element in an Array", difficulty: "Medium", companies: ["Meta", "Amazon", "Microsoft"], pattern: "Quickselect O(n) Average Partition", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
      { id: 75, title: "Sort Colors (Dutch National Flag)", difficulty: "Medium", companies: ["Microsoft", "Amazon", "Apple"], pattern: "3-Way Quick Partitioning (0, 1, 2)", url: "https://leetcode.com/problems/sort-colors/" },
      { id: 912, title: "Sort an Array", difficulty: "Medium", companies: ["Amazon", "Google"], pattern: "Dual-Pivot QuickSort with Randomized Pivot", url: "https://leetcode.com/problems/sort-an-array/" }
    ],
    distPoints: [
      { x: 0, y: 35 },
      { x: 1, y: 82 },
      { x: 2, y: 48 },
      { x: 3, y: 22 },
      { x: 4, y: 10 },
      { x: 5, y: 3 }
    ]
  },
  bubble: {
    name: "Bubble Sort",
    runtimeMs: 12,
    runtimePercentile: 45.2,
    memoryMb: 42.1,
    memoryPercentile: 95.0,
    tcWorst: "O(n²)",
    tcAvg: "O(n²)",
    tcBest: "O(n)",
    scAux: "O(1)",
    cases: {
      best: {
        caseType: "best",
        title: "Best Case Scenario",
        badge: "O(n)",
        badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
        condition: "Already Sorted Array",
        sampleInput: "[10, 20, 30, 40, 50]",
        explanation:
          "With the boolean `swapped` flag optimization, the first pass checks all adjacent pairs and detects zero swaps. The outer loop immediately breaks after 1 pass.",
        formula: "Comparisons = n - 1, Swaps = 0",
        calcOps: (n) => ({ comparisons: n - 1, swaps: 0, total: n - 1 })
      },
      avg: {
        caseType: "avg",
        title: "Average Case Scenario",
        badge: "O(n²)",
        badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
        condition: "Randomly Ordered Elements",
        sampleInput: "[34, 12, 56, 10, 22]",
        explanation:
          "On average, each element is out of order with half the elements after it. Requires roughly n/2 passes and quadratic comparisons.",
        formula: "Comparisons ≈ n(n - 1) / 2, Swaps ≈ n(n - 1) / 4",
        calcOps: (n) => {
          const comps = Math.round((n * (n - 1)) / 2);
          const swaps = Math.round((n * (n - 1)) / 4);
          return { comparisons: comps, swaps, total: comps + swaps };
        }
      },
      worst: {
        caseType: "worst",
        title: "Worst Case Scenario",
        badge: "O(n²)",
        badgeColor: "bg-rose-500/15 text-rose-500 border-rose-500/30",
        condition: "Reverse Sorted Array",
        sampleInput: "[50, 40, 30, 20, 10]",
        explanation:
          "Every adjacent pair is inverted. The algorithm must execute all n - 1 passes, performing a swap on every single comparison step.",
        formula: "Comparisons = n(n - 1) / 2, Swaps = n(n - 1) / 2",
        calcOps: (n) => {
          const comps = (n * (n - 1)) / 2;
          return { comparisons: comps, swaps: comps, total: comps * 2 };
        }
      }
    },
    spaceExplanation:
      "Bubble Sort operates entirely in-place. It only requires a few primitive 32-bit registers on the JVM call stack to hold the loop pointers and swapped flag.",
    variables: [
      { name: "swapped", type: "boolean", size: "1 byte", purpose: "Early exit flag tracker" },
      { name: "temp", type: "int", size: "4 bytes", purpose: "Value buffer for adjacent swap" },
      { name: "i, j", type: "int, int", size: "8 bytes", purpose: "Outer and inner loop index iterators" }
    ],
    isStable: true,
    stabilityExplanation:
      "Stable Sort: Adjacent elements are only swapped when arr[j] > arr[j + 1]. Equal elements are never swapped, preserving their original relative order.",
    stabilityExample: {
      input: "[5a, 2, 5b, 1]",
      output: "[1, 2, 5a, 5b]",
      note: "5a remains before 5b because adjacent equal elements are never swapped."
    },
    problems: [
      { id: 912, title: "Sort an Array", difficulty: "Medium", companies: ["Amazon", "Microsoft"], pattern: "Elementary Adjacent Swapping", url: "https://leetcode.com/problems/sort-an-array/" }
    ],
    distPoints: [
      { x: 0, y: 10 },
      { x: 1, y: 25 },
      { x: 5, y: 60 },
      { x: 10, y: 85 },
      { x: 15, y: 40 },
      { x: 20, y: 15 }
    ]
  },
  selection: {
    name: "Selection Sort",
    runtimeMs: 14,
    runtimePercentile: 38.6,
    memoryMb: 42.0,
    memoryPercentile: 95.5,
    tcWorst: "O(n²)",
    tcAvg: "O(n²)",
    tcBest: "O(n²)",
    scAux: "O(1)",
    cases: {
      best: {
        caseType: "best",
        title: "Best Case Scenario",
        badge: "O(n²)",
        badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
        condition: "Already Sorted Array",
        sampleInput: "[10, 20, 30, 40, 50]",
        explanation:
          "Selection Sort lacks an early-exit flag. Even on sorted arrays, it scans every unsorted subarray to confirm the minimum element.",
        formula: "Comparisons = n(n - 1) / 2, Swaps = 0",
        calcOps: (n) => {
          const comps = (n * (n - 1)) / 2;
          return { comparisons: comps, swaps: 0, total: comps };
        }
      },
      avg: {
        caseType: "avg",
        title: "Average Case Scenario",
        badge: "O(n²)",
        badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
        condition: "Randomly Permuted Elements",
        sampleInput: "[25, 64, 12, 22, 11]",
        explanation:
          "Scans remaining unsorted partition to find minIdx, executing exactly 1 swap per outer pass.",
        formula: "Comparisons = n(n - 1) / 2, Swaps ≤ n - 1",
        calcOps: (n) => {
          const comps = (n * (n - 1)) / 2;
          const swaps = Math.round(n * 0.7);
          return { comparisons: comps, swaps, total: comps + swaps };
        }
      },
      worst: {
        caseType: "worst",
        title: "Worst Case Scenario",
        badge: "O(n²)",
        badgeColor: "bg-rose-500/15 text-rose-500 border-rose-500/30",
        condition: "Reverse Sorted Array",
        sampleInput: "[50, 40, 30, 20, 10]",
        explanation:
          "Executes full sum 1 + 2 + ... + (n - 1) comparisons and maximum n - 1 swaps.",
        formula: "Comparisons = n(n - 1) / 2, Swaps = n - 1",
        calcOps: (n) => {
          const comps = (n * (n - 1)) / 2;
          return { comparisons: comps, swaps: n - 1, total: comps + n - 1 };
        }
      }
    },
    spaceExplanation:
      "Selection Sort is an in-place algorithm requiring O(1) auxiliary memory. It records the minimum index with a single integer variable and swaps elements directly.",
    variables: [
      { name: "minIdx", type: "int", size: "4 bytes", purpose: "Tracks index of current minimum element" },
      { name: "temp", type: "int", size: "4 bytes", purpose: "Temporary register for swapping" },
      { name: "i, j", type: "int, int", size: "8 bytes", purpose: "Outer partition & inner scan pointers" }
    ],
    isStable: false,
    stabilityExplanation:
      "Unstable Sort: Long-range swaps can displace equal elements over intervening items.",
    stabilityExample: {
      input: "[4a, 4b, 2]",
      output: "[2, 4b, 4a]",
      note: "4a swaps with 2, placing 4a AFTER 4b, breaking relative order."
    },
    problems: [
      { id: 912, title: "Sort an Array", difficulty: "Medium", companies: ["Amazon"], pattern: "Minimum Value Boundary Scanning", url: "https://leetcode.com/problems/sort-an-array/" }
    ],
    distPoints: [
      { x: 0, y: 8 },
      { x: 2, y: 22 },
      { x: 8, y: 55 },
      { x: 14, y: 82 },
      { x: 18, y: 45 },
      { x: 24, y: 12 }
    ]
  },
  insertion: {
    name: "Insertion Sort",
    runtimeMs: 4,
    runtimePercentile: 74.3,
    memoryMb: 41.9,
    memoryPercentile: 96.2,
    tcWorst: "O(n²)",
    tcAvg: "O(n²)",
    tcBest: "O(n)",
    scAux: "O(1)",
    cases: {
      best: {
        caseType: "best",
        title: "Best Case Scenario",
        badge: "O(n)",
        badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
        condition: "Already Sorted / Nearly Sorted Array",
        sampleInput: "[10, 20, 30, 40, 50]",
        explanation:
          "The inner while loop condition `arr[j] > key` immediately evaluates to false on the first check. Only 1 comparison is made per element with 0 shifts.",
        formula: "Comparisons = n - 1, Shifts = 0",
        calcOps: (n) => ({ comparisons: n - 1, swaps: 0, total: n - 1 })
      },
      avg: {
        caseType: "avg",
        title: "Average Case Scenario",
        badge: "O(n²)",
        badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
        condition: "Random Order Permutations",
        sampleInput: "[12, 11, 13, 5, 6]",
        explanation:
          "On average, each element must be shifted past approximately half of the sorted prefix subarray.",
        formula: "Comparisons ≈ n(n - 1) / 4, Shifts ≈ n(n - 1) / 4",
        calcOps: (n) => {
          const comps = Math.round((n * (n - 1)) / 4);
          return { comparisons: comps, swaps: comps, total: comps * 2 };
        }
      },
      worst: {
        caseType: "worst",
        title: "Worst Case Scenario",
        badge: "O(n²)",
        badgeColor: "bg-rose-500/15 text-rose-500 border-rose-500/30",
        condition: "Reverse Sorted Array",
        sampleInput: "[50, 40, 30, 20, 10]",
        explanation:
          "Every new element is smaller than all preceding elements in the sorted prefix, requiring every previous element to be shifted right.",
        formula: "Comparisons = n(n - 1) / 2, Shifts = n(n - 1) / 2",
        calcOps: (n) => {
          const comps = (n * (n - 1)) / 2;
          return { comparisons: comps, swaps: comps, total: comps * 2 };
        }
      }
    },
    spaceExplanation:
      "Insertion Sort executes strictly in-place with O(1) auxiliary space, holding only the current `key` value and loop indexes in registers.",
    variables: [
      { name: "key", type: "int", size: "4 bytes", purpose: "Element currently being inserted" },
      { name: "j", type: "int", size: "4 bytes", purpose: "Backward scan pointer for sorted partition" },
      { name: "i", type: "int", size: "4 bytes", purpose: "Forward card-pickup index pointer" }
    ],
    isStable: true,
    stabilityExplanation:
      "Stable Sort: Elements are shifted right while `arr[j] > key`. When an equal element is encountered, the shift stops, guaranteeing the key is placed AFTER equal elements.",
    stabilityExample: {
      input: "[3, 5a, 5b, 2]",
      output: "[2, 3, 5a, 5b]",
      note: "5b stops scanning right after 5a, preserving the original relative order."
    },
    problems: [
      { id: 147, title: "Insertion Sort List", difficulty: "Medium", companies: ["Amazon", "Microsoft"], pattern: "Online Linked List Insertion", url: "https://leetcode.com/problems/insertion-sort-list/" }
    ],
    distPoints: [
      { x: 0, y: 15 },
      { x: 1, y: 35 },
      { x: 4, y: 72 },
      { x: 8, y: 50 },
      { x: 12, y: 25 },
      { x: 18, y: 8 }
    ]
  }
};

export function ComplexityPanel({ algorithm }: ComplexityPanelProps) {
  const [activeCase, setActiveCase] = useState<"best" | "avg" | "worst">("avg");
  const [arraySizeN, setArraySizeN] = useState<number>(25);

  const data = ALGO_METADATA[algorithm];
  const currentCase = data.cases[activeCase];

  // Dynamic calculations based on N slider
  const liveOps = useMemo(() => {
    return currentCase.calcOps(arraySizeN);
  }, [currentCase, arraySizeN]);

  // Asymptotic growth comparison for current N
  const growthStats = useMemo(() => {
    const o_1 = 1;
    const o_n = arraySizeN;
    const o_nlogn = Math.round(arraySizeN * Math.log2(Math.max(arraySizeN, 2)));
    const o_n2 = arraySizeN * arraySizeN;
    return { o_1, o_n, o_nlogn, o_n2 };
  }, [arraySizeN]);

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* LEETCODE SUBMISSION SUMMARY CARD (Runtime & Memory Beats Graphs)          */}
      {/* ========================================================================= */}
      <Card className="border-border/80 bg-card p-5 rounded-2xl shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-emerald-500 tracking-tight">Accepted</span>
                <Badge variant="outline" className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                  Passed All Testcases
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Java 17 Solution for <span className="font-semibold text-foreground">{data.name}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs font-bold text-primary">
              Time: {data.tcAvg}
            </Badge>
            <Badge variant="outline" className="font-mono text-xs font-bold text-teal-600">
              Space: {data.scAux}
            </Badge>
          </div>
        </div>

        {/* LeetCode Distribution Bell Curve Graphs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Runtime Distribution Graph */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-border/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-200">Runtime</span>
              </div>
              <span className="text-base font-black font-mono text-emerald-400">
                {data.runtimeMs} ms
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Beats</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 font-mono text-xs border border-emerald-500/40">
                {data.runtimePercentile}% of Java submissions
              </Badge>
            </div>

            {/* Interactive SVG Bell Curve for Runtime */}
            <div className="pt-2">
              <div className="text-[10px] font-mono text-slate-400 mb-1 flex justify-between">
                <span>Distribution Curve (ms)</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> You ({data.runtimeMs} ms)
                </span>
              </div>
              <div className="h-24 w-full relative flex items-end justify-between gap-1 pt-4 px-2 bg-slate-900/60 rounded-lg border border-slate-800">
                {/* SVG Histogram Bars & Curve */}
                {[12, 28, 65, 92, 54, 38, 22, 14, 8, 4].map((height, i) => {
                  const isUserTier = i === 1 || (data.runtimeMs === 0 && i === 0);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group relative">
                      {isUserTier && (
                        <div className="absolute -top-3 text-[9px] font-bold text-emerald-400 font-mono">
                          ▼
                        </div>
                      )}
                      <div
                        style={{ height: `${height}%` }}
                        className={`w-full rounded-t-sm transition-all duration-300 ${
                          isUserTier
                            ? "bg-emerald-500 shadow-md shadow-emerald-500/50"
                            : "bg-slate-700/60 hover:bg-slate-600"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                <span>0 ms</span>
                <span>5 ms</span>
                <span>10 ms</span>
                <span>15 ms</span>
                <span>20 ms</span>
              </div>
            </div>
          </div>

          {/* 2. Memory Distribution Graph */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-border/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-slate-200">Memory</span>
              </div>
              <span className="text-base font-black font-mono text-sky-400">
                {data.memoryMb} MB
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Beats</span>
              <Badge className="bg-sky-500/20 text-sky-300 font-mono text-xs border border-sky-500/40">
                {data.memoryPercentile}% of Java submissions
              </Badge>
            </div>

            {/* Interactive SVG Histogram for Memory */}
            <div className="pt-2">
              <div className="text-[10px] font-mono text-slate-400 mb-1 flex justify-between">
                <span>Memory Distribution (MB)</span>
                <span className="text-sky-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" /> You ({data.memoryMb} MB)
                </span>
              </div>
              <div className="h-24 w-full relative flex items-end justify-between gap-1 pt-4 px-2 bg-slate-900/60 rounded-lg border border-slate-800">
                {[8, 22, 58, 88, 70, 42, 26, 16, 10, 5].map((height, i) => {
                  const isUserTier = i === 2 || (data.scAux === "O(1)" && i === 1);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group relative">
                      {isUserTier && (
                        <div className="absolute -top-3 text-[9px] font-bold text-sky-400 font-mono">
                          ▼
                        </div>
                      )}
                      <div
                        style={{ height: `${height}%` }}
                        className={`w-full rounded-t-sm transition-all duration-300 ${
                          isUserTier
                            ? "bg-sky-500 shadow-md shadow-sky-500/50"
                            : "bg-slate-700/60 hover:bg-slate-600"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                <span>40.0 MB</span>
                <span>41.5 MB</span>
                <span>43.0 MB</span>
                <span>44.5 MB</span>
                <span>46.0 MB</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ========================================================================= */}
      {/* ASYMPTOTIC TIME COMPLEXITY EXPLORER & LIVE SCENARIO SIMULATOR             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Scenario Selector */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="border-border/80 bg-card p-5 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-foreground">
                    Asymptotic Complexity Inspector
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Select a case to inspect Big-O mathematical behavior.
                  </p>
                </div>
              </div>

              <Badge variant="outline" className="font-mono text-xs font-bold text-primary">
                Big-O Analysis
              </Badge>
            </div>

            {/* Interactive 3 Case Selector Tabs */}
            <div className="grid grid-cols-3 gap-2">
              {(["best", "avg", "worst"] as const).map((cKey) => {
                const c = data.cases[cKey];
                const isSelected = activeCase === cKey;
                return (
                  <button
                    key={cKey}
                    type="button"
                    onClick={() => setActiveCase(cKey)}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? "bg-gradient-to-b from-primary/10 to-primary/5 border-primary shadow-sm ring-1 ring-primary/40"
                        : "bg-muted/40 border-border/70 hover:bg-muted/70 text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 w-full">
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        {cKey === "best" ? "Best Case" : cKey === "avg" ? "Average" : "Worst Case"}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                      )}
                    </div>
                    <div className="flex items-baseline justify-between w-full">
                      <span className="text-lg font-black font-mono text-foreground">
                        {c.badge}
                      </span>
                      <span className="text-[10px] text-muted-foreground capitalize font-medium">
                        {cKey === "best" ? "Optimal" : cKey === "avg" ? "Random" : "Degenerate"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Case Interactive Breakdown Banner */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-xl bg-slate-950/70 border border-border/70 space-y-3 text-slate-200"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                      {activeCase === "best" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : activeCase === "avg" ? (
                        <Activity className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Flame className="w-4 h-4 text-rose-400" />
                      )}
                      {currentCase.title}
                    </span>
                    <Badge className={`font-mono text-xs px-2 py-0.5 ${currentCase.badgeColor}`}>
                      {currentCase.badge}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
                    <span className="text-slate-500">Condition:</span>
                    <span className="font-semibold text-primary">{currentCase.condition}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs leading-relaxed text-slate-300">
                  <p>{currentCase.explanation}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Sample Input:</span>
                    <span className="text-amber-300 font-bold">{currentCase.sampleInput}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Math Formula:</span>
                    <span className="text-emerald-300 font-bold">{currentCase.formula}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>

        {/* Right Column: Live N-Size Slider & Dynamic Math Counter */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border-border/80 bg-card p-5 rounded-2xl shadow-sm space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#1e88e5]/10 text-[#1e88e5]">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-heading text-foreground">
                      Live Operations Scaler
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Drag N to observe real execution operations.
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="font-mono text-xs font-bold text-[#1e88e5]">
                  N = {arraySizeN}
                </Badge>
              </div>

              {/* Slider Input */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Array Size (N):</span>
                  <span className="font-bold text-[#1e88e5] text-sm">{arraySizeN} elements</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={arraySizeN}
                  onChange={(e) => setArraySizeN(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-[#1e88e5]"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>N = 5</span>
                  <span>N = 25</span>
                  <span>N = 50</span>
                  <span>N = 75</span>
                  <span>N = 100</span>
                </div>
              </div>

              {/* Live Calculated Stats for Selected N */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="p-3 rounded-xl bg-muted/40 border border-border/70 text-center space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    Comparisons
                  </span>
                  <div className="text-xl font-black font-mono text-[#1e88e5]">
                    {liveOps.comparisons.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border border-border/70 text-center space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    Swaps / Shifts
                  </span>
                  <div className="text-xl font-black font-mono text-amber-500">
                    {liveOps.swaps.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Asymptotic Growth Comparison Bars */}
            <div className="space-y-2 pt-3 border-t border-border/60">
              <span className="text-[11px] font-bold text-muted-foreground flex items-center justify-between">
                <span>Theoretical Big-O Curves at N={arraySizeN}:</span>
                <span className="font-mono text-[10px] text-primary">{currentCase.badge} Active</span>
              </span>

              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>O(1) Constant:</span>
                  <span className="font-bold text-teal-500">{growthStats.o_1} op</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>O(n) Linear:</span>
                  <span className="font-bold text-emerald-500">{growthStats.o_n} ops</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>O(n log n) Log-Linear:</span>
                  <span className="font-bold text-blue-500">{growthStats.o_nlogn} ops</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>O(n²) Quadratic:</span>
                  <span className="font-bold text-rose-500">{growthStats.o_n2.toLocaleString()} ops</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEETCODE PROBLEM CLASSIFICATION & INTERVIEW ROADMAP CARD                  */}
      {/* ========================================================================= */}
      <Card className="border-border/80 bg-card p-5 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-foreground">
                LeetCode Interview Problems &amp; Core Patterns
              </h3>
              <p className="text-xs text-muted-foreground">
                Real interview questions that test this specific algorithm pattern.
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 border-amber-500/30">
            Interview Prep
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.problems.map((prob) => (
            <a
              key={prob.id}
              href={prob.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-muted/40 border border-border/70 hover:border-amber-500/50 hover:bg-muted/70 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">#{prob.id}</span>
                    <span className="font-bold text-xs text-foreground group-hover:text-amber-500 transition-colors">
                      {prob.title}
                    </span>
                  </div>
                  <Badge
                    className={`text-[10px] font-bold ${
                      prob.difficulty === "Easy"
                        ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/30"
                        : prob.difficulty === "Medium"
                        ? "bg-amber-500/15 text-amber-600 border-amber-500/30"
                        : "bg-rose-500/15 text-rose-600 border-rose-500/30"
                    }`}
                  >
                    {prob.difficulty}
                  </Badge>
                </div>
                <div className="text-[11px] text-muted-foreground font-mono">
                  Pattern: <span className="text-foreground">{prob.pattern}</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                <div className="flex flex-wrap gap-1">
                  {prob.companies.map((c) => (
                    <span key={c} className="px-1.5 py-0.5 rounded bg-muted text-[9px] font-mono border">
                      {c}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1 font-semibold text-amber-500 group-hover:underline">
                  Solve <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </Card>

      {/* ========================================================================= */}
      {/* SPACE COMPLEXITY & STABILITY GUARANTEE ANALYSIS                           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Space Complexity Register Visualizer */}
        <Card className="border-border/80 bg-card p-5 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-heading text-foreground">
                  Space Complexity (SC) Breakdown
                </h3>
                <p className="text-xs text-muted-foreground">
                  In-place memory allocations on JVM call stack.
                </p>
              </div>
            </div>

            <Badge className="bg-teal-500/15 text-teal-600 font-mono text-xs font-bold border-teal-500/30">
              {data.scAux} Auxiliary Space
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {data.spaceExplanation}
          </p>

          {/* JVM Stack Register Allocation Table */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-foreground uppercase tracking-wider font-mono">
              JVM Activation Stack Variables:
            </span>
            <div className="space-y-1.5 font-mono text-xs">
              {data.variables.map((v, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-muted/40 border border-border/70 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] text-teal-600 font-mono bg-teal-500/10">
                      {v.type}
                    </Badge>
                    <span className="font-bold text-foreground">{v.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <span className="text-[10px] text-muted-foreground">{v.purpose}</span>
                    <span className="text-[10px] font-bold text-teal-600 bg-teal-500/10 px-1.5 py-0.5 rounded">
                      {v.size}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Stability Guarantee Interactive Card */}
        <Card className="border-border/80 bg-card p-5 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <div
                className={`p-2 rounded-xl ${
                  data.isStable
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-rose-500/10 text-rose-600"
                }`}
              >
                {data.isStable ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : (
                  <ShieldAlert className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 className="text-base font-bold font-heading text-foreground">
                  Stability Guarantee
                </h3>
                <p className="text-xs text-muted-foreground">
                  Preservation of equal element arrival order.
                </p>
              </div>
            </div>

            <Badge
              className={`font-mono text-xs font-bold ${
                data.isStable
                  ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/30"
                  : "bg-rose-500/15 text-rose-600 border-rose-500/30"
              }`}
            >
              {data.isStable ? "Stable Sort" : "Unstable Sort"}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {data.stabilityExplanation}
          </p>

          {/* Stability Interactive Example Box */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-border/70 space-y-2.5 font-mono text-xs text-slate-200">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Input Sequence:</span>
              <span className="text-amber-300 font-bold">{data.stabilityExample.input}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Sorted Output:</span>
              <span className="text-emerald-400 font-bold">{data.stabilityExample.output}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 font-sans">
              ℹ️ <span className="font-semibold">{data.stabilityExample.note}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
