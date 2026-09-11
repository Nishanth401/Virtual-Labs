"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Shuffle,
  Filter,
  BarChart3,
  Layers,
  Activity,
  Binary,
  Cpu
} from "lucide-react";

export type ProbabilisticModule =
  | "randomized-quicksort"
  | "randomized-mst"
  | "las-vegas-vs-monte-carlo"
  | "skip-list"
  | "bloom-filter"
  | "count-min-sketch"
  | "hyperloglog";

interface Props {
  initialModule?: ProbabilisticModule;
}

export function ProbabilisticVisualizer({ initialModule = "bloom-filter" }: Props) {
  const [activeModule, setActiveModule] = useState<ProbabilisticModule>(initialModule);

  // 1. Bloom filter state
  const [bloomBitArray, setBloomBitArray] = useState([0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1]);
  const [testItem, setTestItem] = useState("user_104");

  // 2. HyperLogLog State
  const [hllUniqueEstimate, setHllUniqueEstimate] = useState(14820);

  return (
    <div className="space-y-6">
      {/* Module Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30 font-mono font-bold">
            Probabilistic &amp; Randomized
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Probabilistic Data Structures &amp; Randomized Algorithms
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeModule === "bloom-filter" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("bloom-filter")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Filter className="h-3.5 w-3.5 mr-1" />
            Bloom Filter
          </Button>
          <Button
            variant={activeModule === "count-min-sketch" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("count-min-sketch")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <BarChart3 className="h-3.5 w-3.5 mr-1" />
            Count-Min Sketch
          </Button>
          <Button
            variant={activeModule === "hyperloglog" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("hyperloglog")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Cpu className="h-3.5 w-3.5 mr-1" />
            HyperLogLog
          </Button>
          <Button
            variant={activeModule === "skip-list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("skip-list")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Layers className="h-3.5 w-3.5 mr-1" />
            Skip Lists
          </Button>
          <Button
            variant={activeModule === "randomized-quicksort" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("randomized-quicksort")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Shuffle className="h-3.5 w-3.5 mr-1" />
            Rand QuickSort
          </Button>
          <Button
            variant={activeModule === "randomized-mst" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("randomized-mst")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Rand MST
          </Button>
          <Button
            variant={activeModule === "las-vegas-vs-monte-carlo" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("las-vegas-vs-monte-carlo")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Binary className="h-3.5 w-3.5 mr-1" />
            Las Vegas / Monte Carlo
          </Button>
        </div>
      </div>

      {/* Module 1: Bloom Filter */}
      {activeModule === "bloom-filter" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Filter className="h-5 w-5 text-indigo-500" />
                  Bloom Filter: Probabilistic Set Membership
                </CardTitle>
                <CardDescription>
                  Space-efficient bit array with K independent hash functions: NO FALSE NEGATIVES (100% certainty if reported absent).
                </CardDescription>
              </div>
              <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
                O(K) Hash Time | O(M) Bits
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Query Key</label>
              <Input
                value={testItem}
                onChange={(e) => setTestItem(e.target.value)}
                className="max-w-xs font-mono"
                placeholder="e.g. user_104"
              />
            </div>

            <div className="p-4 bg-card rounded-xl border border-border space-y-4">
              <div className="text-xs text-muted-foreground">Bloom Filter Bit Array (M = 16 bits, K = 3 Hash Functions):</div>

              <div className="flex flex-wrap gap-1.5">
                {bloomBitArray.map((bit, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center p-2 rounded border text-xs font-mono font-bold transition-all ${
                      bit === 1
                        ? "bg-indigo-500/20 border-indigo-500 text-indigo-400"
                        : "bg-muted/40 border-border text-muted-foreground"
                    }`}
                    style={{ minWidth: "36px" }}
                  >
                    <span className="text-[9px] text-muted-foreground">{idx}</span>
                    <span className="text-base my-0.5">{bit}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-xs font-mono space-y-1">
                <div className="text-indigo-400 font-bold">Query Result for &quot;{testItem}&quot;:</div>
                <div>Hash1(key) = 3 (Bit: 1) | Hash2(key) = 7 (Bit: 1) | Hash3(key) = 12 (Bit: 1)</div>
                <div className="text-emerald-400 font-bold mt-1">Verdict: PROBABLY PRESENT (Potential False Positive)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 2: Count-Min Sketch */}
      {activeModule === "count-min-sketch" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-teal-500" />
                  Count-Min Sketch (Streaming Frequency Estimation)
                </CardTitle>
                <CardDescription>
                  Sublinear 2D matrix of counters estimating frequency of events in massive continuous data streams.
                </CardDescription>
              </div>
              <Badge className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30">
                Time: O(d) | Point Query: min(counters)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-teal-400">Point Query Principle:</div>
              <div>Estimated Frequency(x) = min_{`1 ≤ i ≤ d`} (Table[i][Hash_i(x)])</div>
              <div className="text-muted-foreground mt-1">Overestimation error bounded by ε with probability 1 - δ.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 3: HyperLogLog */}
      {activeModule === "hyperloglog" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-purple-500" />
                  HyperLogLog: Cardinality Estimation
                </CardTitle>
                <CardDescription>
                  Estimate billions of unique items with standard error ~1.04/√m using only 1.5 KB of memory.
                </CardDescription>
              </div>
              <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30">
                Space: O(log log N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="text-sm font-bold text-purple-400">
                Harmonic Mean Bucket Averaging: E = α_m · m² · ( ∑ 2^(-M[j]) )⁻¹
              </div>
              <div className="text-muted-foreground">
                Tracks the maximum number of leading zeros in hash outputs across 1024 registers.
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 4: Skip List */}
      {activeModule === "skip-list" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Layers className="h-5 w-5 text-amber-500" />
                  Skip Lists (Probabilistic Multi-Level Express Lanes)
                </CardTitle>
                <CardDescription>
                  Linked list with layered express tracks achieving O(log N) search, insertion, and deletion via coin flips (used in Redis Sorted Sets).
                </CardDescription>
              </div>
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                Expected: O(log N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-amber-400">Multi-Level Express Lanes:</div>
              <div>Level 3: [Head] ───────────────→ [17] ─────────────────→ [NIL]</div>
              <div>Level 2: [Head] ───────→ [9] ───→ [17] ─────────→ [25] ──→ [NIL]</div>
              <div>Level 1: [Head] → [3] → [9] → [12] → [17] → [19] → [25] → [NIL]</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 5: Randomized QuickSort */}
      {activeModule === "randomized-quicksort" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Shuffle className="h-5 w-5 text-rose-500" />
                  Randomized Quick Sort
                </CardTitle>
                <CardDescription>
                  Guarantees expected O(N log N) runtime on all inputs, neutralizing adversarial pre-sorted inputs.
                </CardDescription>
              </div>
              <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
                Expected: O(N log N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-rose-400">Random Pivot Selection:</div>
              <div>pivotIndex = random(low, high); swap(arr[low], arr[pivotIndex]);</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 6: Randomized MST */}
      {activeModule === "randomized-mst" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-cyan-500" />
                  Randomized MST (Karger-Klein-Tarjan)
                </CardTitle>
                <CardDescription>
                  Expected linear time MST algorithm using random edge sampling and Borůvka contraction steps.
                </CardDescription>
              </div>
              <Badge className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">
                Expected: O(V + E)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-cyan-400">Borůvka + Random Subgraph Sampling:</div>
              <div>Samples edges with probability p = 1/2, recurses to compute sub-MST, and filters non-F-heavy edges.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 7: Las Vegas vs Monte Carlo */}
      {activeModule === "las-vegas-vs-monte-carlo" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Binary className="h-5 w-5 text-emerald-500" />
                  Las Vegas vs. Monte Carlo Algorithms
                </CardTitle>
                <CardDescription>
                  Theoretical computer science classification of randomized algorithms.
                </CardDescription>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                Theory &amp; Classification
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <div className="font-bold text-emerald-400">Las Vegas Algorithms</div>
                <div className="text-foreground mt-2">• Result is ALWAYS CORRECT</div>
                <div className="text-muted-foreground">• Runtime is a random variable (e.g. Randomized QuickSort)</div>
              </div>
              <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                <div className="font-bold text-purple-400">Monte Carlo Algorithms</div>
                <div className="text-foreground mt-2">• Runtime is STRICTLY DETERMINISTIC / BOUNDED</div>
                <div className="text-muted-foreground">• Result has small, bounded probability of error (e.g. Miller-Rabin Primality)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
