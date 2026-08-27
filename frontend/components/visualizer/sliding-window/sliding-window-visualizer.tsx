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
  Sparkles,
  CheckCircle2,
  Code2,
  Layers,
  Box,
  Info,
  BookOpen
} from "lucide-react";

export type SlidingWindowMode = "fixed-k" | "variable-sum";

interface ExecutionStep {
  windowStart: number;
  windowEnd: number;
  array: number[];
  currentSum: number;
  maxSum: number;
  targetK?: number;
  targetS?: number;
  explanation: string;
  codeLine: number;
  isComplete?: boolean;
}

const JAVA_CODE_FIXED_K = `// Sliding Window - Maximum Sum Subarray of Size K
public int maxSumSubarray(int[] arr, int k) {
    int n = arr.length;
    if (n < k) return -1;
    
    int windowSum = 0;
    for (int i = 0; i < k; i++) {
        windowSum += arr[i]; // First window
    }
    
    int maxSum = windowSum;
    for (int i = k; i < n; i++) {
        windowSum += arr[i] - arr[i - k]; // Slide window right
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}`;

const PSEUDOCODE_MAP: Record<SlidingWindowMode, string[]> = {
  "fixed-k": [
    "1. Compute sum of first window [0 ... K-1]",
    "2. Set maxSum = currentWindowSum",
    "3. For i from K to arr.length - 1:",
    "4.    windowSum += arr[i] - arr[i - K] (add right, remove left)",
    "5.    maxSum = max(maxSum, windowSum)",
    "6. Return maxSum"
  ],
  "variable-sum": [
    "1. Initialize windowStart = 0, windowSum = 0, minLen = infinity",
    "2. For windowEnd from 0 to arr.length - 1:",
    "3.    windowSum += arr[windowEnd] (expand right)",
    "4.    While windowSum >= Target S:",
    "5.       minLen = min(minLen, windowEnd - windowStart + 1)",
    "6.       windowSum -= arr[windowStart] -> windowStart++ (shrink left)",
    "7. Return minLen"
  ]
};

export function SlidingWindowVisualizer() {
  const [mode, setMode] = useState<SlidingWindowMode>("fixed-k");
  const [inputArrayStr, setInputArrayStr] = useState<string>("2, 1, 5, 1, 3, 2, 8, 4");
  const [kInputStr, setKInputStr] = useState<string>("3");

  const [activeTab, setActiveTab] = useState<"pseudocode" | "java">("pseudocode");
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1000);

  const generateSteps = (selectedMode: SlidingWindowMode, rawArrStr: string, rawKStr: string) => {
    let arr = rawArrStr
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));

    if (arr.length < 3) {
      arr = [2, 1, 5, 1, 3, 2, 8, 4];
    }

    const generated: ExecutionStep[] = [];

    if (selectedMode === "fixed-k") {
      const k = Math.min(arr.length, Math.max(1, parseInt(rawKStr) || 3));

      let currentSum = 0;
      for (let i = 0; i < k; i++) {
        currentSum += arr[i];
      }
      let maxSum = currentSum;

      generated.push({
        windowStart: 0,
        windowEnd: k - 1,
        array: [...arr],
        currentSum,
        maxSum,
        targetK: k,
        explanation: `Initial window of size K=${k} covering indices [0 ... ${k - 1}]. Initial Sum = ${currentSum}.`,
        codeLine: 1
      });

      for (let i = k; i < arr.length; i++) {
        const prevStart = i - k;
        const newStart = i - k + 1;
        const newEnd = i;

        const removedVal = arr[prevStart];
        const addedVal = arr[newEnd];

        currentSum = currentSum - removedVal + addedVal;
        maxSum = Math.max(maxSum, currentSum);

        generated.push({
          windowStart: newStart,
          windowEnd: newEnd,
          array: [...arr],
          currentSum,
          maxSum,
          targetK: k,
          explanation: `Slid window right by 1 index. Removed arr[${prevStart}] (${removedVal}) from left, Added arr[${newEnd}] (${addedVal}) to right. New Sum = ${currentSum}. Max Sum = ${maxSum}.`,
          codeLine: 4
        });
      }

      generated.push({
        windowStart: arr.length - k,
        windowEnd: arr.length - 1,
        array: [...arr],
        currentSum: generated[generated.length - 1].currentSum,
        maxSum,
        targetK: k,
        isComplete: true,
        explanation: `🏆 Sliding window scan complete! Maximum subarray sum of size K=${k} is ${maxSum}!`,
        codeLine: 6
      });
    }

    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    generateSteps(mode, inputArrayStr, kInputStr);
  }, [mode, inputArrayStr, kInputStr]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speedMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length, speedMs]);

  const handlePlayPause = () => {
    if (!isPlaying) {
      if (currentStepIdx >= steps.length - 1) {
        setCurrentStepIdx(0);
      }
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const defaultArray = [2, 1, 5, 1, 3, 2, 8, 4];

  const currentStep = steps[currentStepIdx] || {
    windowStart: 0,
    windowEnd: 2,
    array: defaultArray,
    currentSum: 8,
    maxSum: 8,
    explanation: "Ready to start simulation",
    codeLine: 1
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-background p-6 rounded-2xl border border-emerald-500/30 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 gap-1 font-mono">
              <Box className="h-3.5 w-3.5" /> Algorithmic Pattern
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 font-mono">O(N) Time Complexity</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight font-heading">
            Sliding Window Algorithm Visualizer
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Simulate a contiguous subarray box expanding and shrinking dynamically across an array to compute sub-segment maximums and minimum lengths in linear time.
          </p>
        </div>
      </div>

      {/* Control Panel Bar */}
      <Card className="border-border/60 shadow-md">
        <CardContent className="p-4 md:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                Input Array (Comma Separated)
              </label>
              <Input
                value={inputArrayStr}
                onChange={(e) => setInputArrayStr(e.target.value)}
                placeholder="2, 1, 5, 1, 3, 2, 8, 4"
                className="font-mono text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                Window Size (K)
              </label>
              <Input
                value={kInputStr}
                onChange={(e) => setKInputStr(e.target.value)}
                placeholder="3"
                className="font-mono text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                Animation Speed ({speedMs}ms)
              </label>
              <input
                type="range"
                min={200}
                max={1800}
                step={100}
                value={2000 - speedMs}
                onChange={(e) => setSpeedMs(2000 - Number(e.target.value))}
                className="w-full mt-3 accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="flex items-end">
              <Button
                onClick={() => generateSteps(mode, inputArrayStr, kInputStr)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold gap-1.5 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" /> Load &amp; Reset Window
              </Button>
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border/40">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
                className="gap-1.5 text-xs font-bold min-w-[120px] cursor-pointer"
              >
                {isPlaying ? <Pause className="h-4 w-4 text-amber-500" /> : <Play className="h-4 w-4 text-emerald-500" />}
                {isPlaying ? "Pause" : "Play Animation"}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIdx((prev) => Math.max(0, prev - 1));
                }}
                disabled={currentStepIdx === 0}
                className="cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIdx((prev) => Math.min(steps.length - 1, prev + 1));
                }}
                disabled={currentStepIdx >= steps.length - 1}
                className="cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIdx(0);
                }}
                className="gap-1 text-xs text-muted-foreground cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Restart
              </Button>
            </div>

            <div className="text-xs font-mono font-bold text-muted-foreground">
              Step <span className="text-foreground">{currentStepIdx + 1}</span> of <span className="text-foreground">{steps.length || 1}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Display Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/60 shadow-lg flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Layers className="h-4 w-4 text-emerald-400" /> Sliding Window Overlay Box
              </CardTitle>
              {currentStep.isComplete && (
                <Badge className="bg-emerald-500 text-white font-mono gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> SCAN COMPLETE
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-8 py-6">
            {/* Window Tracker Header */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Window: [{currentStep.windowStart} ... {currentStep.windowEnd}] (Size: {currentStep.windowEnd - currentStep.windowStart + 1})
              </div>
            </div>

            {/* Array Boxes with Sliding Window Glowing Outline */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 px-2 min-h-[160px]">
              {(currentStep.array || defaultArray).map((val, idx) => {
                const insideWindow = idx >= currentStep.windowStart && idx <= currentStep.windowEnd;
                const isStart = idx === currentStep.windowStart;
                const isEnd = idx === currentStep.windowEnd;

                let cardStyle = "border-border bg-card text-muted-foreground opacity-60";
                if (insideWindow) {
                  cardStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/80 shadow-xl scale-105 opacity-100 font-bold";
                }

                return (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    {/* Top Pointer Badge */}
                    <div className="h-6 flex items-center justify-center">
                      {isStart && !isEnd && (
                        <Badge className="bg-emerald-600 text-white text-[10px] px-1.5 py-0 font-mono">START</Badge>
                      )}
                      {isEnd && !isStart && (
                        <Badge className="bg-emerald-600 text-white text-[10px] px-1.5 py-0 font-mono">END</Badge>
                      )}
                      {isStart && isEnd && (
                        <Badge className="bg-emerald-700 text-white text-[10px] px-1.5 py-0 font-mono">S &amp; E</Badge>
                      )}
                    </div>

                    {/* Array Box */}
                    <div
                      className={`w-14 h-16 md:w-16 md:h-20 rounded-xl border-2 font-mono font-black text-lg md:text-xl flex flex-col items-center justify-center transition-all duration-300 ${cardStyle}`}
                    >
                      {val}
                    </div>

                    <span className="text-[11px] font-mono text-muted-foreground font-bold">[{idx}]</span>
                  </div>
                );
              })}
            </div>

            {/* Window Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold">Current Window Sum</span>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{currentStep.currentSum}</div>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-center">
                <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold">Maximum Subarray Sum</span>
                <div className="text-2xl font-black text-blue-400 font-mono mt-1">{currentStep.maxSum}</div>
              </div>
            </div>

            {/* Explanation Banner */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
              <Info className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm font-mono text-emerald-200 leading-relaxed">
                {currentStep.explanation}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Code & Pseudocode View Panel */}
        <Card className="border-border/60 shadow-lg flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Code2 className="h-4 w-4 text-emerald-500" /> Implementation &amp; Pseudocode
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            {/* Custom Tab Switcher (100% Reliable Click State) */}
            <div className="flex border-b border-border/80 bg-muted/40 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab("pseudocode")}
                className={`flex-1 py-1.5 text-xs font-bold font-mono rounded-lg transition-all cursor-pointer ${activeTab === "pseudocode"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Pseudocode
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("java")}
                className={`flex-1 py-1.5 text-xs font-bold font-mono rounded-lg transition-all cursor-pointer ${activeTab === "java"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Java Code
              </button>
            </div>

            {activeTab === "pseudocode" ? (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 min-h-[220px]">
                {(PSEUDOCODE_MAP[mode] || []).map((line, idx) => {
                  const isCurrent = idx + 1 === currentStep.codeLine;
                  return (
                    <div
                      key={idx}
                      className={`px-2 py-1 rounded transition-colors ${isCurrent
                        ? "bg-emerald-600/30 text-emerald-300 border-l-4 border-emerald-500 font-bold"
                        : "hover:bg-slate-900"
                        }`}
                    >
                      {line}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto min-h-[220px]">
                <pre className="leading-relaxed">{JAVA_CODE_FIXED_K}</pre>
              </div>
            )}

            <div className="p-4 rounded-xl bg-card border border-border/60 space-y-2">
              <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-emerald-400" /> Complexity Analysis
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-muted/40">
                  <span className="text-muted-foreground block text-[10px]">Time Complexity</span>
                  <span className="font-bold text-emerald-400">O(N) Linear</span>
                </div>
                <div className="p-2 rounded bg-muted/40">
                  <span className="text-muted-foreground block text-[10px]">Space Complexity</span>
                  <span className="font-bold text-blue-400">O(1) Auxiliary</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
