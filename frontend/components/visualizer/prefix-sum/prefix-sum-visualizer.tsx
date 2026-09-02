"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Calculator,
  Code2,
  Layers,
  ArrowRight,
  Info,
  Sparkles
} from "lucide-react";

interface ExecutionStep {
  currentIndex: number;
  array: number[];
  prefixArray: (number | null)[];
  explanation: string;
  codeLine: number;
  isComplete?: boolean;
}

const JAVA_CODE = `// Prefix Sum Array Construction & Range Sum Query
public int[] buildPrefixSum(int[] arr) {
    int n = arr.length;
    int[] prefix = new int[n];
    prefix[0] = arr[0];
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }
    return prefix;
}

// O(1) Range Sum Query for range [L, R]
public int queryRangeSum(int[] prefix, int L, int R) {
    if (L == 0) return prefix[R];
    return prefix[R] - prefix[L - 1];
}`;

const PSEUDOCODE = [
  "1. Initialize prefix[0] = arr[0]",
  "2. For i from 1 to arr.length - 1:",
  "3.    prefix[i] = prefix[i-1] + arr[i]",
  "4. Range Query Sum(L, R):",
  "5.    If L == 0: return prefix[R]",
  "6.    Else: return prefix[R] - prefix[L - 1]"
];

export function PrefixSumVisualizer() {
  const [inputArrayStr, setInputArrayStr] = useState<string>("3, 1, 4, 2, 5, 8, 2");
  const [leftQuery, setLeftQuery] = useState<string>("2");
  const [rightQuery, setRightQuery] = useState<string>("5");
  const [activeTab, setActiveTab] = useState<"pseudocode" | "java">("pseudocode");
  const [mode, setMode] = useState<"construction" | "query">("construction");

  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1000);

  const generateSteps = (rawArrStr: string) => {
    let arr = rawArrStr
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));

    if (arr.length === 0) {
      arr = [3, 1, 4, 2, 5, 8, 2];
    }

    const generated: ExecutionStep[] = [];
    const pArr: (number | null)[] = new Array(arr.length).fill(null);

    // Step 0: Initialize prefix[0]
    pArr[0] = arr[0];
    generated.push({
      currentIndex: 0,
      array: [...arr],
      prefixArray: [...pArr],
      explanation: `Initialize: prefix[0] = arr[0] = ${arr[0]}.`,
      codeLine: 1
    });

    for (let i = 1; i < arr.length; i++) {
      pArr[i] = (pArr[i - 1] as number) + arr[i];
      generated.push({
        currentIndex: i,
        array: [...arr],
        prefixArray: [...pArr],
        explanation: `At index ${i}: prefix[${i}] = prefix[${i - 1}] (${pArr[i - 1]}) + arr[${i}] (${arr[i]}) = ${pArr[i]}.`,
        codeLine: 3
      });
    }

    // Completion Step
    generated.push({
      currentIndex: arr.length - 1,
      array: [...arr],
      prefixArray: [...pArr],
      explanation: `🎉 Prefix Sum Construction Complete! You can now execute Range Sum Queries in O(1) constant time.`,
      codeLine: 4,
      isComplete: true
    });

    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    generateSteps(inputArrayStr);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx((prev) => prev + 1);
      }, speedMs);
    } else if (currentStepIdx >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length, speedMs]);

  const currentStep = steps[currentStepIdx] || {
    currentIndex: 0,
    array: [],
    prefixArray: [],
    explanation: "",
    codeLine: 1
  };

  const arr = currentStep.array;
  const prefixArr = currentStep.prefixArray;
  const L = Math.max(0, Math.min(arr.length - 1, parseInt(leftQuery) || 0));
  const R = Math.max(L, Math.min(arr.length - 1, parseInt(rightQuery) || arr.length - 1));

  const pR = (prefixArr[R] as number) ?? 0;
  const pLMinus1 = L > 0 ? ((prefixArr[L - 1] as number) ?? 0) : 0;
  const queryResult = L === 0 ? pR : pR - pLMinus1;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card border border-border p-6 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge className="bg-violet-600 text-white font-mono text-xs uppercase font-bold tracking-wider px-2.5 py-0.5">
              Array Preprocessing
            </Badge>
            <Badge className="bg-cyan-600 text-white font-mono text-xs font-bold px-2.5 py-0.5">
              O(N) Build | O(1) Query
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight font-heading flex items-center gap-2.5">
            <Calculator className="h-7 w-7 text-violet-600 dark:text-violet-400" />
            Prefix Sum Algorithm Visualizer
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl font-medium leading-relaxed">
            Precompute cumulative sum arrays to perform instant Range Sum Queries in constant O(1) time.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Input
            value={inputArrayStr}
            onChange={(e) => setInputArrayStr(e.target.value)}
            placeholder="3, 1, 4, 2, 5, 8, 2"
            className="bg-background text-foreground border-input font-mono text-xs font-bold w-full md:w-64"
          />
          <Button
            onClick={() => generateSteps(inputArrayStr)}
            className="bg-violet-600 hover:bg-violet-700 text-white font-bold shrink-0 shadow"
          >
            Apply Input
          </Button>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex bg-muted p-1.5 rounded-xl border border-border w-fit shadow-sm">
        <button
          onClick={() => setMode("construction")}
          className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
            mode === "construction"
              ? "bg-violet-600 text-white shadow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Layers className="h-4 w-4" />
          1. Prefix Array Construction
        </button>
        <button
          onClick={() => setMode("query")}
          className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
            mode === "query"
              ? "bg-violet-600 text-white shadow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Calculator className="h-4 w-4" />
          2. Interactive O(1) Range Query Tester
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {mode === "construction" ? (
            <>
              {/* Controls */}
              <Card className="border-border shadow-sm">
                <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStepIdx(0);
                      }}
                      disabled={currentStepIdx === 0}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStepIdx((prev) => Math.max(0, prev - 1));
                      }}
                      disabled={currentStepIdx === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      onClick={() => setIsPlaying(!isPlaying)}
                      disabled={currentStepIdx >= steps.length - 1}
                      className="bg-violet-600 hover:bg-violet-700 text-white font-bold"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStepIdx((prev) => Math.min(steps.length - 1, prev + 1));
                      }}
                      disabled={currentStepIdx >= steps.length - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Speed:</span>
                    {[1500, 1000, 400].map((ms, idx) => (
                      <Button
                        key={ms}
                        size="sm"
                        variant={speedMs === ms ? "default" : "outline"}
                        onClick={() => setSpeedMs(ms)}
                        className={
                          speedMs === ms
                            ? "bg-violet-600 text-white font-bold text-xs px-2.5 py-1 h-7"
                            : "text-xs px-2.5 py-1 h-7 font-bold"
                        }
                      >
                        {idx === 0 ? "0.5x" : idx === 1 ? "1.0x" : "2.0x"}
                      </Button>
                    ))}
                  </div>

                  <div className="text-xs font-mono text-muted-foreground font-bold">
                    Step <span className="text-violet-600 dark:text-violet-400 font-extrabold">{currentStepIdx + 1}</span> of {steps.length}
                  </div>
                </CardContent>
              </Card>

              {/* Canvas */}
              <Card className="border-border p-6 min-h-[360px] flex flex-col justify-between shadow-sm">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Layers className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    Dual Array Construction View
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0 space-y-8 my-auto">
                  {/* Row 1: Original Array A */}
                  <div>
                    <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                      Original Array A:
                    </span>
                    <div className="flex flex-wrap items-center justify-start gap-3">
                      {currentStep.array.map((val, idx) => {
                        const isCurrent = idx === currentStep.currentIndex;
                        return (
                          <div key={idx} className="flex flex-col items-center gap-1">
                            <span className="text-xs font-mono font-bold text-muted-foreground">[{idx}]</span>
                            <div
                              className={`w-14 h-14 rounded-xl flex items-center justify-center font-mono font-black text-lg transition-all border ${
                                isCurrent
                                  ? "bg-blue-600 text-white border-blue-700 ring-4 ring-blue-400/40 scale-105"
                                  : "bg-slate-800 text-white border-slate-700"
                              }`}
                            >
                              {val}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 2: Prefix Sum Array P */}
                  <div>
                    <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider block mb-2">
                      Prefix Sum Array P:
                    </span>
                    <div className="flex flex-wrap items-center justify-start gap-3">
                      {currentStep.prefixArray.map((pVal, idx) => {
                        const isCurrent = idx === currentStep.currentIndex;
                        const isComputed = pVal !== null;
                        return (
                          <div key={idx} className="flex flex-col items-center gap-1">
                            <span className="text-xs font-mono font-bold text-muted-foreground">[{idx}]</span>
                            <div
                              className={`w-14 h-14 rounded-xl flex items-center justify-center font-mono font-black text-lg transition-all border ${
                                isCurrent
                                  ? "bg-violet-600 text-white border-violet-700 ring-4 ring-violet-400/40 scale-110 shadow-lg"
                                  : isComputed
                                  ? "bg-violet-100 dark:bg-violet-950 text-violet-900 dark:text-violet-100 border-violet-400"
                                  : "bg-muted text-muted-foreground border-dashed border-border"
                              }`}
                            >
                              {isComputed ? pVal : "?"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>

                {/* Explanation */}
                <div className="mt-6 p-4 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-start gap-3">
                  <Info className="h-5 w-5 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                  <p className="text-sm font-bold text-foreground leading-relaxed">
                    {currentStep.explanation}
                  </p>
                </div>
              </Card>
            </>
          ) : (
            /* Query Mode */
            <Card className="border-border p-6 space-y-6 shadow-sm">
              <CardHeader className="p-0">
                <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  Range Sum Query Simulator: Sum(L ... R)
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1 font-medium">
                  Select range boundaries [L, R] to see how Prefix Sum computes range sums in O(1) time.
                </p>
              </CardHeader>

              <CardContent className="p-0 space-y-6">
                {/* L & R Controls */}
                <div className="flex flex-wrap items-center gap-4 bg-muted/60 p-4 rounded-xl border border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-foreground font-bold">L (Start Index):</span>
                    <Input
                      type="number"
                      min={0}
                      max={arr.length - 1}
                      value={leftQuery}
                      onChange={(e) => setLeftQuery(e.target.value)}
                      className="w-20 bg-background text-foreground border-input font-mono text-center font-bold"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-foreground font-bold">R (End Index):</span>
                    <Input
                      type="number"
                      min={0}
                      max={arr.length - 1}
                      value={rightQuery}
                      onChange={(e) => setRightQuery(e.target.value)}
                      className="w-20 bg-background text-foreground border-input font-mono text-center font-bold"
                    />
                  </div>
                </div>

                {/* Subarray Range */}
                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider block">
                    Range Highlighting on Original Array A:
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    {arr.map((val, idx) => {
                      const isInRange = idx >= L && idx <= R;
                      return (
                        <div key={idx} className="flex flex-col items-center gap-1">
                          <span className="text-xs font-mono font-bold text-muted-foreground">[{idx}]</span>
                          <div
                            className={`w-14 h-14 rounded-xl flex items-center justify-center font-mono font-black text-lg transition-all border ${
                              isInRange
                                ? "bg-violet-600 text-white border-violet-700 ring-4 ring-violet-400/40 scale-105"
                                : "bg-slate-800 text-white opacity-40 border-slate-700"
                            }`}
                          >
                            {val}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Formula Breakdown */}
                <div className="p-6 rounded-2xl bg-muted/80 border border-violet-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" /> O(1) Range Formula Calculation
                    </span>
                    <Badge className="bg-violet-600 text-white font-mono text-xs font-bold">
                      Time Complexity: O(1)
                    </Badge>
                  </div>

                  <div className="text-xl font-mono font-bold text-foreground bg-background p-4 rounded-xl border border-border flex flex-wrap items-center justify-center gap-3 text-center shadow-sm">
                    <span>Sum({L}...{R})</span>
                    <span>=</span>
                    {L === 0 ? (
                      <span>prefix[{R}] ({pR})</span>
                    ) : (
                      <>
                        <span className="text-violet-600 dark:text-violet-400 font-black">prefix[{R}] ({pR})</span>
                        <span>-</span>
                        <span className="text-amber-600 dark:text-amber-400 font-black">prefix[{L - 1}] ({pLMinus1})</span>
                      </>
                    )}
                    <span>=</span>
                    <span className="text-2xl text-white bg-emerald-600 px-4 py-1 rounded-xl font-black shadow">
                      {queryResult}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Code Trace */}
        <div className="space-y-6">
          <Card className="border-border shadow-sm h-full flex flex-col">
            <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                <Code2 className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                Algorithm Code Trace
              </CardTitle>

              <div className="flex bg-muted p-1 rounded-lg border border-border">
                <button
                  onClick={() => setActiveTab("pseudocode")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    activeTab === "pseudocode"
                      ? "bg-violet-600 text-white shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Pseudocode
                </button>
                <button
                  onClick={() => setActiveTab("java")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    activeTab === "java"
                      ? "bg-violet-600 text-white shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Java
                </button>
              </div>
            </CardHeader>

            <CardContent className="p-4 font-mono text-xs overflow-x-auto flex-1">
              {activeTab === "pseudocode" ? (
                <div className="space-y-1.5">
                  {PSEUDOCODE.map((line, idx) => {
                    const lineNo = idx + 1;
                    const isActive = mode === "construction" && currentStep.codeLine === lineNo;
                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg transition-colors flex items-center gap-3 ${
                          isActive
                            ? "bg-violet-500/20 text-violet-950 dark:text-violet-100 border-l-4 border-violet-600 font-black"
                            : "text-foreground hover:bg-muted font-medium"
                        }`}
                      >
                        <span className="text-[10px] text-muted-foreground w-4 text-right select-none font-bold">
                          {lineNo}
                        </span>
                        <span>{line}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <pre className="text-foreground text-xs leading-relaxed overflow-x-auto font-mono">
                  <code>{JAVA_CODE}</code>
                </pre>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
