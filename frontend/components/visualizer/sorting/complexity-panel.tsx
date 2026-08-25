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
  Activity
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

const ALGO_DETAILS: Record<
  SortingAlgorithm,
  {
    name: string;
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
  }
> = {
  bubble: {
    name: "Bubble Sort",
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
      "Stable Sort: Adjacent elements are only swapped when arr[j] > arr[j + 1]. Equal elements (arr[j] == arr[j + 1]) are never swapped, preserving their original relative order.",
    stabilityExample: {
      input: "[5a, 2, 5b, 1]",
      output: "[1, 2, 5a, 5b]",
      note: "5a remains before 5b because adjacent equal elements are never swapped."
    }
  },
  selection: {
    name: "Selection Sort",
    cases: {
      best: {
        caseType: "best",
        title: "Best Case Scenario",
        badge: "O(n²)",
        badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
        condition: "Already Sorted Array",
        sampleInput: "[10, 20, 30, 40, 50]",
        explanation:
          "Unlike Bubble Sort, Selection Sort lacks an adaptive early-exit mechanism. Even if the array is already sorted, it must scan every unsorted subarray to verify the minimum element.",
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
          "The algorithm scans the entire remaining unsorted partition to find the minimum index minIdx, performing exactly 1 swap per outer pass.",
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
        condition: "Reverse Sorted or Specific Shifted Array",
        sampleInput: "[50, 40, 30, 20, 10]",
        explanation:
          "Always executes the full sum 1 + 2 + ... + (n - 1) comparisons. Executes the maximum possible swaps (n - 1) across all passes.",
        formula: "Comparisons = n(n - 1) / 2, Swaps = n - 1",
        calcOps: (n) => {
          const comps = (n * (n - 1)) / 2;
          return { comparisons: comps, swaps: n - 1, total: comps + n - 1 };
        }
      }
    },
    spaceExplanation:
      "Selection Sort is an in-place algorithm requiring O(1) auxiliary memory. It records the minimum index with a single integer variable and swaps elements directly in the array buffer.",
    variables: [
      { name: "minIdx", type: "int", size: "4 bytes", purpose: "Tracks index of current minimum element" },
      { name: "temp", type: "int", size: "4 bytes", purpose: "Temporary register for swapping" },
      { name: "i, j", type: "int, int", size: "8 bytes", purpose: "Outer partition & inner scan pointers" }
    ],
    isStable: false,
    stabilityExplanation:
      "Unstable Sort: Long-range swaps can displace equal elements over intervening items. When swapping arr[i] with arr[minIdx], an earlier duplicate element can jump behind a later duplicate.",
    stabilityExample: {
      input: "[4a, 4b, 2]",
      output: "[2, 4b, 4a]",
      note: "4a swaps with 2, placing 4a AFTER 4b, which breaks relative ordering."
    }
  },
  insertion: {
    name: "Insertion Sort",
    cases: {
      best: {
        caseType: "best",
        title: "Best Case Scenario",
        badge: "O(n)",
        badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
        condition: "Already Sorted / Nearly Sorted Array",
        sampleInput: "[10, 20, 30, 40, 50]",
        explanation:
          "For each element, the inner while loop condition `arr[j] > key` immediately evaluates to false on the first check. Only 1 comparison is made per element with 0 shifts.",
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
    }
  }
};

export function ComplexityPanel({ algorithm }: ComplexityPanelProps) {
  const [activeCase, setActiveCase] = useState<"best" | "avg" | "worst">("avg");
  const [arraySizeN, setArraySizeN] = useState<number>(20);

  const data = ALGO_DETAILS[algorithm];
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
      {/* SECTION 1: INTERACTIVE ASYMPTOTIC TIME COMPLEXITY EXPLORER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Case Selector & Deep-Dive */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="border-border/80 bg-card p-5 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-foreground">
                    Time Complexity (TC) Analysis
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Click any case below to inspect algorithm step mechanics.
                  </p>
                </div>
              </div>

              <Badge variant="outline" className="font-mono text-xs font-bold text-primary">
                Asymptotic Big-O
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
                        {cKey === "best" ? "Sorted" : cKey === "avg" ? "Random" : "Inverted"}
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
                className="p-4 rounded-xl bg-slate-950/60 border border-border/70 space-y-3"
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
                      Live Operation Simulator
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Slide N to see real operations executed.
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="font-mono text-xs font-bold text-[#1e88e5]">
                  N = {arraySizeN} Elements
                </Badge>
              </div>

              {/* Slider Input */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Array Size (N):</span>
                  <span className="font-bold text-[#1e88e5] text-sm">{arraySizeN} items</span>
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
                <span>Theoretical Complexity Growth for N={arraySizeN}:</span>
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

      {/* SECTION 2: SPACE COMPLEXITY & STABILITY GUARANTEE ANALYSIS */}
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
                  Space Complexity (SC) Analysis
                </h3>
                <p className="text-xs text-muted-foreground">
                  In-place memory allocations on JVM call stack.
                </p>
              </div>
            </div>

            <Badge className="bg-teal-500/15 text-teal-600 font-mono text-xs font-bold border-teal-500/30">
              O(1) Auxiliary Space
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {data.spaceExplanation}
          </p>

          {/* JVM Stack Register Allocation Table */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-foreground uppercase tracking-wider font-mono">
              JVM Activation Stack Variables (Constant 16 Bytes):
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
                  Preservation of equal element order.
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
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-border/70 space-y-2.5 font-mono text-xs">
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
