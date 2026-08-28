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
  TrendingUp,
  Info,
  Code2,
  Layers,
  Sparkles
} from "lucide-react";

interface ExecutionStep {
  currentIndex: number;
  array: number[];
  currentSum: number;
  maxSum: number;
  currentStart: number;
  bestStart: number;
  bestEnd: number;
  explanation: string;
  codeLine: number;
  isComplete?: boolean;
}

const JAVA_CODE = `// Kadane's Algorithm - Maximum Subarray Sum
public int maxSubArray(int[] nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    
    for (int i = 1; i < nums.length; i++) {
        if (currentSum + nums[i] < nums[i]) {
            currentSum = nums[i]; // Start new subarray
        } else {
            currentSum += nums[i]; // Extend current subarray
        }
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}`;

const PSEUDOCODE = [
  "1. Initialize maxSum = arr[0], currentSum = arr[0]",
  "2. For i from 1 to arr.length - 1:",
  "3.   If currentSum + arr[i] < arr[i]:",
  "4.      currentSum = arr[i] (Start new subarray at i)",
  "5.   Else:",
  "6.      currentSum += arr[i] (Extend current subarray)",
  "7.   If currentSum > maxSum:",
  "8.      maxSum = currentSum (Update best overall subarray)",
  "9. Return maxSum"
];

export function KadanesVisualizer() {
  const [inputArrayStr, setInputArrayStr] = useState<string>("-2, 1, -3, 4, -1, 2, 1, -5, 4");
  const [activeTab, setActiveTab] = useState<"pseudocode" | "java">("pseudocode");
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
      arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    }

    const generated: ExecutionStep[] = [];
    let currentSum = arr[0];
    let maxSum = arr[0];
    let currentStart = 0;
    let bestStart = 0;
    let bestEnd = 0;

    // Step 0: Initialization
    generated.push({
      currentIndex: 0,
      array: [...arr],
      currentSum,
      maxSum,
      currentStart: 0,
      bestStart: 0,
      bestEnd: 0,
      explanation: `Initialize: currentSum = arr[0] (${arr[0]}), maxSum = arr[0] (${arr[0]}). Subarray starts at index 0.`,
      codeLine: 1
    });

    for (let i = 1; i < arr.length; i++) {
      const val = arr[i];
      const sumIfExtended = currentSum + val;

      if (sumIfExtended < val) {
        currentSum = val;
        currentStart = i;
        generated.push({
          currentIndex: i,
          array: [...arr],
          currentSum,
          maxSum,
          currentStart,
          bestStart,
          bestEnd,
          explanation: `At index ${i} (${val}): currentSum + arr[i] (${sumIfExtended}) is less than arr[i] (${val}). Resetting currentSum to ${val} starting at index ${i}.`,
          codeLine: 4
        });
      } else {
        currentSum = sumIfExtended;
        generated.push({
          currentIndex: i,
          array: [...arr],
          currentSum,
          maxSum,
          currentStart,
          bestStart,
          bestEnd,
          explanation: `At index ${i} (${val}): Adding ${val} to currentSum maintains/increases sum to ${currentSum}. Subarray extended from index ${currentStart} to ${i}.`,
          codeLine: 6
        });
      }

      if (currentSum > maxSum) {
        maxSum = currentSum;
        bestStart = currentStart;
        bestEnd = i;
        generated.push({
          currentIndex: i,
          array: [...arr],
          currentSum,
          maxSum,
          currentStart,
          bestStart,
          bestEnd,
          explanation: `🌟 New maximum sum found! Updated maxSum = ${maxSum} for subarray range [${bestStart} ... ${bestEnd}].`,
          codeLine: 8
        });
      }
    }

    // Final Completion Step
    generated.push({
      currentIndex: arr.length - 1,
      array: [...arr],
      currentSum,
      maxSum,
      currentStart,
      bestStart,
      bestEnd,
      explanation: `🎉 Kadane's Algorithm Complete! Maximum Subarray Sum is ${maxSum} (Subarray range: [${bestStart} ... ${bestEnd}] with elements [${arr.slice(bestStart, bestEnd + 1).join(", ")}]).`,
      codeLine: 9,
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
    currentSum: 0,
    maxSum: 0,
    currentStart: 0,
    bestStart: 0,
    bestEnd: 0,
    explanation: "",
    codeLine: 1
  };

  const isCurrentSubarray = (idx: number) => {
    return idx >= currentStep.currentStart && idx <= currentStep.currentIndex;
  };

  const isBestSubarray = (idx: number) => {
    return idx >= currentStep.bestStart && idx <= currentStep.bestEnd;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner - Theme Adaptive High Contrast */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card border border-border p-6 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge className="bg-emerald-600 text-white font-mono text-xs uppercase font-bold tracking-wider px-2.5 py-0.5">
              Dynamic Programming / Greedy
            </Badge>
            <Badge className="bg-blue-600 text-white font-mono text-xs font-bold px-2.5 py-0.5">
              O(N) Time | O(1) Space
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight font-heading flex items-center gap-2.5">
            <TrendingUp className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            Kadane&apos;s Algorithm Visualizer
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl font-medium leading-relaxed">
            Find the contiguous subarray within a one-dimensional numerical array that has the maximum sum in linear time.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Input
            value={inputArrayStr}
            onChange={(e) => setInputArrayStr(e.target.value)}
            placeholder="-2, 1, -3, 4, -1, 2, 1, -5, 4"
            className="bg-background text-foreground border-input font-mono text-xs font-bold w-full md:w-64"
          />
          <Button
            onClick={() => generateSteps(inputArrayStr)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shrink-0 shadow"
          >
            Apply Input
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualizer & Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Controls Bar */}
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
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
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

              {/* Speed */}
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
                        ? "bg-emerald-600 text-white font-bold text-xs px-2.5 py-1 h-7"
                        : "text-xs px-2.5 py-1 h-7 font-bold"
                    }
                  >
                    {idx === 0 ? "0.5x" : idx === 1 ? "1.0x" : "2.0x"}
                  </Button>
                ))}
              </div>

              <div className="text-xs font-mono text-muted-foreground font-bold">
                Step <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{currentStepIdx + 1}</span> of {steps.length}
              </div>
            </CardContent>
          </Card>

          {/* Visualization Canvas */}
          <Card className="border-border min-h-[340px] flex flex-col justify-between p-6 shadow-sm">
            <CardHeader className="p-0 mb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                Subarray Visualization & Trackers
              </CardTitle>

              <div className="flex items-center gap-4 text-xs font-mono font-bold">
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <span className="h-3 w-3 rounded-full bg-blue-600"></span> Active Window
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <span className="h-3 w-3 rounded-full bg-emerald-600"></span> Best Subarray
                </span>
              </div>
            </CardHeader>

            <CardContent className="p-0 space-y-8 my-auto">
              {/* Array Cards */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 py-4">
                {currentStep.array.map((val, idx) => {
                  const isCurrent = idx === currentStep.currentIndex;
                  const isSub = isCurrentSubarray(idx);
                  const isBest = isBestSubarray(idx);

                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5">
                      <span className="text-xs font-mono font-bold text-muted-foreground">
                        [{idx}]
                      </span>

                      <div
                        className={`w-14 h-16 rounded-xl flex flex-col items-center justify-center font-mono font-black text-xl transition-all duration-300 border shadow-md relative ${
                          isCurrent
                            ? "bg-blue-600 text-white border-blue-700 ring-4 ring-blue-400/40 scale-110"
                            : isBest
                            ? "bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-500/50"
                            : isSub
                            ? "bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-100 border-blue-400"
                            : "bg-slate-800 text-white border-slate-700"
                        }`}
                      >
                        {val >= 0 ? `+${val}` : val}

                        {isCurrent && (
                          <span className="absolute -top-2.5 bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tight shadow">
                            i
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* State Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                <div className="bg-muted/50 p-3.5 rounded-xl border border-border">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                    Current Element
                  </span>
                  <span className="text-lg font-mono font-black text-blue-600 dark:text-blue-400">
                    arr[{currentStep.currentIndex}] = {currentStep.array[currentStep.currentIndex] ?? "-"}
                  </span>
                </div>

                <div className="bg-muted/50 p-3.5 rounded-xl border border-border">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                    Current Subarray Sum
                  </span>
                  <span className="text-lg font-mono font-black text-amber-600 dark:text-amber-400">
                    {currentStep.currentSum}
                  </span>
                </div>

                <div className="bg-muted/50 p-3.5 rounded-xl border border-border">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                    Max Subarray Sum
                  </span>
                  <span className="text-lg font-mono font-black text-emerald-600 dark:text-emerald-400">
                    {currentStep.maxSum}
                  </span>
                </div>

                <div className="bg-muted/50 p-3.5 rounded-xl border border-border">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                    Best Subarray Range
                  </span>
                  <span className="text-lg font-mono font-black text-purple-600 dark:text-purple-400">
                    [{currentStep.bestStart} ... {currentStep.bestEnd}]
                  </span>
                </div>
              </div>
            </CardContent>

            {/* Explanation Footer Box */}
            <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
              <Info className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-foreground leading-relaxed">
                {currentStep.explanation}
              </p>
            </div>
          </Card>
        </div>

        {/* Code & Pseudocode Side Panel */}
        <div className="space-y-6">
          <Card className="border-border shadow-sm h-full flex flex-col">
            <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                <Code2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Algorithm Code Trace
              </CardTitle>

              <div className="flex bg-muted p-1 rounded-lg border border-border">
                <button
                  onClick={() => setActiveTab("pseudocode")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    activeTab === "pseudocode"
                      ? "bg-emerald-600 text-white shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Pseudocode
                </button>
                <button
                  onClick={() => setActiveTab("java")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    activeTab === "java"
                      ? "bg-emerald-600 text-white shadow"
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
                    const isActive = currentStep.codeLine === lineNo;
                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg transition-colors flex items-center gap-3 ${
                          isActive
                            ? "bg-emerald-500/20 text-emerald-950 dark:text-emerald-100 border-l-4 border-emerald-600 font-black"
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
