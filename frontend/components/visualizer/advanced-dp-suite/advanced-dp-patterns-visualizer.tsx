"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GitBranch,
  Layers,
  Sparkles,
  Workflow,
  TrendingUp,
  Boxes,
  Binary,
  Maximize2
} from "lucide-react";

export type AdvancedDPModule =
  | "interval-dp"
  | "matrix-chain"
  | "dp-on-dag"
  | "optimal-bst"
  | "convex-hull-trick"
  | "divide-and-conquer-dp"
  | "bitmask-tsp";

interface Props {
  initialModule?: AdvancedDPModule;
}

export function AdvancedDPPatternsVisualizer({ initialModule = "interval-dp" }: Props) {
  const [activeModule, setActiveModule] = useState<AdvancedDPModule>(initialModule);

  // 1. Matrix Chain Multiplication
  const [mcmDims, setMcmDims] = useState([10, 20, 30, 40, 30]);

  // 2. Bitmask TSP State
  const [activeMask, setActiveMask] = useState(7); // Binary 111 (Cities 0, 1, 2 visited)

  return (
    <div className="space-y-6">
      {/* Module Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30 font-mono font-bold">
            Advanced DP
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Advanced Dynamic Programming Patterns Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeModule === "interval-dp" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("interval-dp")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Layers className="h-3.5 w-3.5 mr-1" />
            Interval DP
          </Button>
          <Button
            variant={activeModule === "matrix-chain" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("matrix-chain")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Boxes className="h-3.5 w-3.5 mr-1" />
            Matrix Chain
          </Button>
          <Button
            variant={activeModule === "dp-on-dag" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("dp-on-dag")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Workflow className="h-3.5 w-3.5 mr-1" />
            DP on DAG
          </Button>
          <Button
            variant={activeModule === "optimal-bst" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("optimal-bst")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Binary className="h-3.5 w-3.5 mr-1" />
            Optimal BST
          </Button>
          <Button
            variant={activeModule === "convex-hull-trick" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("convex-hull-trick")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <TrendingUp className="h-3.5 w-3.5 mr-1" />
            Convex Hull Trick
          </Button>
          <Button
            variant={activeModule === "divide-and-conquer-dp" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("divide-and-conquer-dp")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Maximize2 className="h-3.5 w-3.5 mr-1" />
            D&amp;C DP
          </Button>
          <Button
            variant={activeModule === "bitmask-tsp" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("bitmask-tsp")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Bitmask TSP
          </Button>
        </div>
      </div>

      {/* Module 1: Interval DP */}
      {activeModule === "interval-dp" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Layers className="h-5 w-5 text-purple-500" />
                  Interval DP: Subarray Merging &amp; Burst Balloons
                </CardTitle>
                <CardDescription>
                  Solve problems over contiguous intervals [i, j] ordered by interval length len = 1 to N.
                </CardDescription>
              </div>
              <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30">
                Time: O(N³) | Space: O(N²)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border space-y-3 font-mono text-xs">
              <div className="text-sm font-bold text-purple-400">
                DP State Transition: dp[i][j] = min_{`i ≤ k < j`} (dp[i][k] + dp[k+1][j] + cost(i, k, j))
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <div className="font-bold text-foreground">1. Outer Loop</div>
                  <div className="text-muted-foreground mt-1">Iterate interval length len from 2 up to N</div>
                </div>
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <div className="font-bold text-foreground">2. Left Boundary</div>
                  <div className="text-muted-foreground mt-1">Start pointer i from 0 to N - len</div>
                </div>
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <div className="font-bold text-foreground">3. Split Point k</div>
                  <div className="text-muted-foreground mt-1">Partition interval into [i..k] and [k+1..j]</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 2: Matrix Chain Multiplication */}
      {activeModule === "matrix-chain" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Boxes className="h-5 w-5 text-indigo-500" />
                  Matrix Chain Multiplication (MCM) Table
                </CardTitle>
                <CardDescription>
                  Find the most optimal parenthesization of matrices A₁ · A₂ · ... · A_n to minimize scalar multiplications.
                </CardDescription>
              </div>
              <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
                Time: O(N³) | Space: O(N²)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border space-y-3 font-mono text-xs">
              <div className="text-muted-foreground">Matrix Dimensions: [10×20, 20×30, 30×40, 40×30]</div>
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-400 font-bold">
                Optimal Cost = 30,000 Multiplications | Optimal Split: ((A₁ A₂) (A₃ A₄))
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 3: DP on DAG */}
      {activeModule === "dp-on-dag" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-emerald-500" />
                  DP on Directed Acyclic Graph (DAG)
                </CardTitle>
                <CardDescription>
                  Compute longest or shortest paths on DAGs in linear O(V + E) by evaluating nodes in Topological Sort order.
                </CardDescription>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                Time: O(V + E)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-emerald-400">Topological Evaluation Order:</div>
              <div>dp[v] = max_{`(u, v) ∈ E`} (dp[u] + weight(u, v))</div>
              <div className="text-muted-foreground mt-1">Guarantees no cycles and single-pass linear time calculation.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 4: Optimal BST */}
      {activeModule === "optimal-bst" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Binary className="h-5 w-5 text-amber-500" />
                  Optimal Binary Search Tree (OBST)
                </CardTitle>
                <CardDescription>
                  Construct a binary search tree with minimum expected search cost given query access frequencies.
                </CardDescription>
              </div>
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                Time: O(N³)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-amber-400">Search Cost Formula:</div>
              <div>cost[i][j] = sum_freq(i, j) + min_{`i ≤ r ≤ j`} (cost[i][r-1] + cost[r+1][j])</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 5: Convex Hull Trick */}
      {activeModule === "convex-hull-trick" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-rose-500" />
                  Convex Hull Trick (CHT) &amp; Slope Optimization
                </CardTitle>
                <CardDescription>
                  Optimize 1D DP transitions of the form dp[i] = min_{`j < i`} (dp[j] + m_j · x_i + c_j) from O(N²) to O(N log N) / O(N).
                </CardDescription>
              </div>
              <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
                Optimized: O(N log N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-rose-400">Lower Envelope of Lines:</div>
              <div>Maintains an envelope of linear equations y = m·x + c. Irrelevant dominated lines are pruned at intersection points.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 6: Divide & Conquer DP */}
      {activeModule === "divide-and-conquer-dp" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Maximize2 className="h-5 w-5 text-cyan-500" />
                  Divide &amp; Conquer DP (Monotone Optimization)
                </CardTitle>
                <CardDescription>
                  Applies when optimal split decision point is monotonic: opt[i][j] ≤ opt[i][j+1], reducing O(K·N²) to O(K·N log N).
                </CardDescription>
              </div>
              <Badge className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">
                Time: O(K·N log N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-cyan-400">Knuth &amp; Quadrangle Inequality Condition:</div>
              <div>Cost function C(a, c) + C(b, d) ≤ C(a, d) + C(b, c) for all a ≤ b ≤ c ≤ d.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 7: Bitmask TSP */}
      {activeModule === "bitmask-tsp" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  Bitmask DP: Travelling Salesperson Problem (TSP)
                </CardTitle>
                <CardDescription>
                  Compress visited cities state into binary bitmask integer mask ∈ [0..2^N - 1] to solve TSP in O(2^N · N²).
                </CardDescription>
              </div>
              <Badge className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30">
                Time: O(2ⁿ · n²) | Space: O(2ⁿ · n)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border space-y-3 font-mono text-xs">
              <div className="text-sm font-bold text-yellow-400">
                DP State: dp(mask, u) = min_{`v ∉ mask`} (dp(mask | (1 &lt;&lt; v), v) + dist(u, v))
              </div>
              <div className="p-3 bg-muted/40 rounded-lg border border-border">
                <div>Active Bitmask: {activeMask} ({activeMask.toString(2).padStart(4, "0")}₂)</div>
                <div className="text-emerald-400 font-bold mt-1">Visited Cities: [City 0, City 1, City 2]</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
