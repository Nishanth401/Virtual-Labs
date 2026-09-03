"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileCode,
  Hash,
  BarChart3,
  BrainCircuit,
  GitBranch,
  Play,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Scissors,
  Layers,
  ArrowRight,
  Activity,
  Info
} from "lucide-react";

export type AdvancedAlgoModule = 
  | "kmp" 
  | "rabin-karp" 
  | "line-sweep" 
  | "minimax" 
  | "advanced-dp";

export function AdvancedAlgosVisualizer({ initialModule = "kmp" }: { initialModule?: AdvancedAlgoModule }) {
  const [activeModule, setActiveModule] = useState<AdvancedAlgoModule>(initialModule);

  // 1. KMP LPS State
  const pattern = "ABABCABAB";
  const [lpsStep, setLpsStep] = useState<number>(4);
  const lpsArray = [0, 0, 1, 2, 0, 1, 2, 3, 4];

  // 2. Rabin-Karp State
  const textRK = "ABCCDABCE";
  const patternRK = "ABC";
  const [windowIdx, setWindowIdx] = useState<number>(0);

  // 3. Line Sweep State
  const [sweepTime, setSweepTime] = useState<number>(3);
  const intervals = [
    { name: "Meeting A", start: 1, end: 4, rooms: 1 },
    { name: "Meeting B", start: 2, end: 6, rooms: 2 },
    { name: "Meeting C", start: 5, end: 8, rooms: 1 },
    { name: "Meeting D", start: 7, end: 9, rooms: 1 },
  ];

  // 4. Minimax Alpha-Beta State
  const [pruningRevealed, setPruningRevealed] = useState<boolean>(true);

  // 5. Advanced DP State
  const [dpType, setDpType] = useState<"tree" | "digit">("tree");

  return (
    <div className="space-y-6">
      {/* Module Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono font-bold">
            Hard Algos
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Advanced &amp; Hard-Tier Algorithms Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeModule === "kmp" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("kmp")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <FileCode className="h-3.5 w-3.5 mr-1" />
            KMP (LPS Array)
          </Button>
          <Button
            variant={activeModule === "rabin-karp" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("rabin-karp")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Hash className="h-3.5 w-3.5 mr-1" />
            Rabin-Karp Rolling Hash
          </Button>
          <Button
            variant={activeModule === "line-sweep" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("line-sweep")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <BarChart3 className="h-3.5 w-3.5 mr-1" />
            Line Sweep Geometry
          </Button>
          <Button
            variant={activeModule === "minimax" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("minimax")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <BrainCircuit className="h-3.5 w-3.5 mr-1" />
            Minimax &amp; Alpha-Beta
          </Button>
          <Button
            variant={activeModule === "advanced-dp" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("advanced-dp")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <GitBranch className="h-3.5 w-3.5 mr-1" />
            Tree &amp; Digit DP
          </Button>
        </div>
      </div>

      {/* ========================================== */}
      {/* 1. KMP STRING MATCHING & LPS TABLE         */}
      {/* ========================================== */}
      {activeModule === "kmp" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Knuth-Morris-Pratt (KMP) Longest Prefix Suffix (LPS) Table
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Text index never decrements! On mismatch at <code>pattern[j]</code>, fallback to <code>j = lps[j - 1]</code> in O(1).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setLpsStep((s) => (s + 1) % pattern.length)}
                  className="h-8 text-xs font-mono font-bold"
                >
                  Step LPS Index ({lpsStep + 1} / {pattern.length})
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setLpsStep(0)}
                  className="h-8 text-xs font-mono"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Pattern & LPS Grid Table */}
            <div className="p-4 bg-muted/20 rounded-2xl border border-border space-y-3">
              <span className="text-xs font-mono text-muted-foreground font-bold uppercase tracking-wider block">
                Pattern: "{pattern}"
              </span>

              <div className="grid grid-cols-9 gap-2">
                {pattern.split("").map((ch, idx) => {
                  const isActive = lpsStep === idx;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center font-mono transition-all ${
                        isActive
                          ? "bg-rose-500/20 border-rose-500 shadow-md scale-105"
                          : idx < lpsStep
                          ? "bg-muted/40 border-border"
                          : "bg-card border-border/60 opacity-60"
                      }`}
                    >
                      <span className="text-[10px] text-muted-foreground">idx {idx}</span>
                      <span className="text-xl font-black text-foreground my-1">{ch}</span>
                      <Badge variant="outline" className={`text-xs font-bold ${isActive ? "text-rose-400 border-rose-400" : ""}`}>
                        LPS: {lpsArray[idx]}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explanation Note */}
            <div className="p-4 bg-muted/30 rounded-xl border border-border text-xs font-mono text-muted-foreground space-y-1">
              <span className="text-foreground font-bold block">Current LPS Logic:</span>
              <p>
                At index {lpsStep} ('{pattern[lpsStep]}'): Longest proper prefix matching a suffix has length <strong className="text-rose-400">{lpsArray[lpsStep]}</strong>.
                When a mismatch occurs after this character, shift pattern forward to resume matching from index {lpsArray[lpsStep]}.
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. RABIN-KARP ROLLING HASH                 */}
      {/* ========================================== */}
      {activeModule === "rabin-karp" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Rabin-Karp Rolling Hash Sliding Window
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Rolling hash formula: <code>H_new = (H_old - leading * d^(m-1)) * d + trailing (mod q)</code>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setWindowIdx((w) => (w + 1) % (textRK.length - patternRK.length + 1))}
                  className="h-8 text-xs font-mono font-bold"
                >
                  Slide Window ({windowIdx + 1} / {textRK.length - patternRK.length + 1})
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setWindowIdx(0)}
                  className="h-8 text-xs font-mono"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Text Strip with Window */}
            <div className="p-5 bg-muted/20 rounded-2xl border border-border space-y-4">
              <span className="text-xs font-mono text-muted-foreground font-bold uppercase block">
                Target Pattern: "{patternRK}" (Hash = 216)
              </span>

              <div className="flex items-center gap-2 overflow-x-auto py-2">
                {textRK.split("").map((ch, idx) => {
                  const isInWindow = idx >= windowIdx && idx < windowIdx + patternRK.length;
                  const isMatch = isInWindow && textRK.substring(windowIdx, windowIdx + patternRK.length) === patternRK;

                  return (
                    <div
                      key={idx}
                      className={`h-14 w-14 rounded-xl border flex flex-col items-center justify-center font-mono transition-all ${
                        isMatch
                          ? "bg-emerald-500/25 border-emerald-500 text-emerald-400 font-bold shadow-md scale-105"
                          : isInWindow
                          ? "bg-rose-500/20 border-rose-500 text-rose-300 font-bold"
                          : "bg-card border-border text-muted-foreground"
                      }`}
                    >
                      <span className="text-[10px] opacity-60">{idx}</span>
                      <span className="text-lg font-bold">{ch}</span>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-card rounded-xl border border-border/80 text-xs font-mono flex items-center justify-between">
                <span>Active Window: "{textRK.substring(windowIdx, windowIdx + patternRK.length)}"</span>
                {textRK.substring(windowIdx, windowIdx + patternRK.length) === patternRK ? (
                  <Badge className="bg-emerald-500 text-white font-mono font-bold">MATCH FOUND!</Badge>
                ) : (
                  <Badge variant="outline" className="font-mono text-rose-400">Mismatch</Badge>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. LINE SWEEP & COMPUTATIONAL GEOMETRY     */}
      {/* ========================================== */}
      {activeModule === "line-sweep" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Line Sweep Algorithm (Meeting Rooms II / Skyline Problem)
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Sort interval start/end events in O(N log N). Vertical sweep line tracks active concurrent rooms.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSweepTime((t) => (t % 9) + 1)}
                  className="h-8 text-xs font-mono font-bold"
                >
                  Advance Sweep Line (T = {sweepTime})
                </Button>
              </div>
            </div>

            {/* Interval Bars & Vertical Sweep Line */}
            <div className="p-6 bg-muted/20 rounded-2xl border border-border space-y-4 relative">
              <span className="text-xs font-mono text-muted-foreground font-bold uppercase block">
                Timeline Intervals (1 to 9 Hours) ── Vertical Sweep Line at T = {sweepTime}
              </span>

              <div className="space-y-3 relative py-2">
                {intervals.map((item, idx) => {
                  const isActive = sweepTime >= item.start && sweepTime <= item.end;
                  const leftPercent = (item.start / 9) * 100;
                  const widthPercent = ((item.end - item.start) / 9) * 100;

                  return (
                    <div key={idx} className="h-10 bg-muted/40 rounded-xl relative border border-border/60 overflow-hidden">
                      <div
                        style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                        className={`absolute top-1 bottom-1 rounded-lg px-3 flex items-center justify-between font-mono text-xs font-bold transition-all ${
                          isActive
                            ? "bg-rose-500 text-white shadow-md"
                            : "bg-primary/20 text-primary border border-primary/30"
                        }`}
                      >
                        <span>{item.name}</span>
                        <span className="text-[10px] opacity-80">[{item.start}h - {item.end}h]</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. MINIMAX & ALPHA-BETA PRUNING            */}
      {/* ========================================== */}
      {activeModule === "minimax" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Game Theory: Minimax Tree with Alpha-Beta Pruning
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Prune branch whenever <code>β ≤ α</code>. Avoids evaluating moves that an opponent would never allow.
                </p>
              </div>

              <Button
                size="sm"
                variant={pruningRevealed ? "default" : "outline"}
                onClick={() => setPruningRevealed(!pruningRevealed)}
                className="h-8 text-xs font-mono font-bold"
              >
                {pruningRevealed ? "Hide Pruned Branches" : "Show Alpha-Beta Pruned"}
              </Button>
            </div>

            {/* Tree Levels */}
            <div className="space-y-4 p-6 bg-muted/20 rounded-2xl border border-border text-center">
              {/* MAX ROOT */}
              <div className="flex flex-col items-center">
                <Badge className="bg-primary text-primary-foreground font-mono text-xs font-bold mb-1">
                  MAX Root Node: Score = 3
                </Badge>
                <div className="h-6 w-0.5 bg-border" />
              </div>

              {/* MIN LEVEL */}
              <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto">
                <div className="p-4 rounded-xl border border-border bg-card flex flex-col items-center">
                  <span className="text-xs font-mono font-bold text-muted-foreground">MIN Left (Score: 3)</span>
                  <span className="text-[10px] text-muted-foreground font-mono">α = -∞, β = 3</span>
                </div>

                <div className={`p-4 rounded-xl border flex flex-col items-center transition-all ${
                  pruningRevealed
                    ? "border-rose-500/40 bg-rose-500/10 text-rose-400"
                    : "border-border bg-card text-muted-foreground"
                }`}>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold">MIN Right (Pruned)</span>
                    <Scissors className="h-3.5 w-3.5 text-rose-500" />
                  </div>
                  <span className="text-[10px] font-mono mt-0.5">β ≤ α condition met!</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* 5. ADVANCED DP: TREE DP & DIGIT DP        */}
      {/* ========================================== */}
      {activeModule === "advanced-dp" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Advanced Dynamic Programming Topologies
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Tree DP (Subtree independent sets) and Digit DP (Number constraints in [L, R]).
                </p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border text-xs">
                <Button
                  size="sm"
                  variant={dpType === "tree" ? "default" : "ghost"}
                  onClick={() => setDpType("tree")}
                  className="h-7 text-xs font-mono font-bold rounded-lg"
                >
                  Tree DP
                </Button>
                <Button
                  size="sm"
                  variant={dpType === "digit" ? "default" : "ghost"}
                  onClick={() => setDpType("digit")}
                  className="h-7 text-xs font-mono font-bold rounded-lg"
                >
                  Digit DP
                </Button>
              </div>
            </div>

            {/* Pattern Card */}
            <div className="p-5 rounded-2xl bg-muted/20 border border-border space-y-3">
              <span className="text-xs font-mono font-bold text-foreground uppercase block">
                {dpType === "tree" ? "Tree DP: Maximum Independent Set Formula" : "Digit DP: State Vector memo[idx][tight][sum]"}
              </span>
              <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                {dpType === "tree"
                  ? "dp[u][0] = ∑ max(dp[v][0], dp[v][1])   (u is NOT chosen)\ndp[u][1] = weight[u] + ∑ dp[v][0]          (u is chosen, children cannot be)"
                  : "solve(idx, tight, sum): if (idx == len) return condition_met;\nif (!tight && memo[idx][sum] != -1) return memo[idx][sum];\nlimit = tight ? digit[idx] : 9;"}
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
