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
  Flag,
  Code2,
  Layers,
  ArrowRightLeft,
  Info
} from "lucide-react";

interface ExecutionStep {
  low: number;
  mid: number;
  high: number;
  array: number[];
  swapped?: [number, number];
  explanation: string;
  codeLine: number;
  isComplete?: boolean;
}

const JAVA_CODE = `// Dutch National Flag (3-Way Partitioning - Sort Colors)
public void sortColors(int[] nums) {
    int low = 0, mid = 0, high = nums.length - 1;
    
    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums, low, mid);
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else { // nums[mid] == 2
            swap(nums, mid, high);
            high--;
        }
    }
}`;

const PSEUDOCODE = [
  "1. Initialize low = 0, mid = 0, high = arr.length - 1",
  "2. While mid <= high:",
  "3.    If arr[mid] == 0: Swap(low, mid); low++; mid++;",
  "4.    Else if arr[mid] == 1: mid++;",
  "5.    Else (arr[mid] == 2): Swap(mid, high); high--;",
  "6. Array is fully sorted into 0s, 1s, and 2s!"
];

export function DNFVisualizer() {
  const [inputArrayStr, setInputArrayStr] = useState<string>("2, 0, 2, 1, 1, 0, 2, 1, 0");
  const [activeTab, setActiveTab] = useState<"pseudocode" | "java">("pseudocode");
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1000);

  const generateSteps = (rawArrStr: string) => {
    let arr = rawArrStr
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n) && (n === 0 || n === 1 || n === 2));

    if (arr.length === 0) {
      arr = [2, 0, 2, 1, 1, 0, 2, 1, 0];
    }

    const generated: ExecutionStep[] = [];
    let low = 0;
    let mid = 0;
    let high = arr.length - 1;

    // Initial Step
    generated.push({
      low,
      mid,
      high,
      array: [...arr],
      explanation: `Initialize: low = 0, mid = 0, high = ${high}. Array state ready for 3-way partitioning.`,
      codeLine: 1
    });

    while (mid <= high) {
      const val = arr[mid];

      if (val === 0) {
        // Swap low and mid
        const temp = arr[low];
        arr[low] = arr[mid];
        arr[mid] = temp;

        const swappedIndices: [number, number] = [low, mid];
        low++;
        mid++;

        generated.push({
          low,
          mid,
          high,
          array: [...arr],
          swapped: swappedIndices,
          explanation: `arr[mid] is 0! Swapped arr[${swappedIndices[0]}] and arr[${swappedIndices[1]}]. Advanced low -> ${low}, mid -> ${mid}.`,
          codeLine: 3
        });
      } else if (val === 1) {
        mid++;
        generated.push({
          low,
          mid,
          high,
          array: [...arr],
          explanation: `arr[mid] is 1! It is already in the middle partition. Advanced mid -> ${mid}.`,
          codeLine: 4
        });
      } else {
        // val === 2 -> Swap mid and high
        const temp = arr[mid];
        arr[mid] = arr[high];
        arr[high] = temp;

        const swappedIndices: [number, number] = [mid, high];
        high--;

        generated.push({
          low,
          mid,
          high,
          array: [...arr],
          swapped: swappedIndices,
          explanation: `arr[mid] is 2! Swapped arr[${swappedIndices[0]}] and arr[${swappedIndices[1]}]. Decremented high -> ${high}.`,
          codeLine: 5
        });
      }
    }

    // Completion Step
    generated.push({
      low,
      mid,
      high,
      array: [...arr],
      explanation: `🎉 Dutch National Flag Algorithm Complete! Array is perfectly partitioned in O(N) single-pass: [${arr.join(", ")}].`,
      codeLine: 6,
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
    low: 0,
    mid: 0,
    high: 0,
    array: [],
    explanation: "",
    codeLine: 1
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card border border-border p-6 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge className="bg-red-600 text-white font-mono text-xs uppercase font-bold tracking-wider px-2.5 py-0.5">
              3-Way Partitioning
            </Badge>
            <Badge className="bg-blue-600 text-white font-mono text-xs font-bold px-2.5 py-0.5">
              O(N) Time | O(1) Space
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight font-heading flex items-center gap-2.5">
            <Flag className="h-7 w-7 text-red-600 dark:text-red-400" />
            Dutch National Flag Algorithm Visualizer
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl font-medium leading-relaxed">
            Sort an array containing 0s, 1s, and 2s in-place using three pointers (low, mid, high) in a single O(N) pass.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Input
            value={inputArrayStr}
            onChange={(e) => setInputArrayStr(e.target.value)}
            placeholder="2, 0, 2, 1, 1, 0, 2, 1, 0"
            className="bg-background text-foreground border-input font-mono text-xs font-bold w-full md:w-64"
          />
          <Button
            onClick={() => generateSteps(inputArrayStr)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold shrink-0 shadow"
          >
            Apply Input
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas & Controls */}
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
                  className="bg-red-600 hover:bg-red-700 text-white font-bold"
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
                        ? "bg-red-600 text-white font-bold text-xs px-2.5 py-1 h-7"
                        : "text-xs px-2.5 py-1 h-7 font-bold"
                    }
                  >
                    {idx === 0 ? "0.5x" : idx === 1 ? "1.0x" : "2.0x"}
                  </Button>
                ))}
              </div>

              <div className="text-xs font-mono text-muted-foreground font-bold">
                Step <span className="text-red-600 dark:text-red-400 font-extrabold">{currentStepIdx + 1}</span> of {steps.length}
              </div>
            </CardContent>
          </Card>

          {/* Interactive Canvas */}
          <Card className="border-border p-6 min-h-[340px] flex flex-col justify-between shadow-sm">
            <CardHeader className="p-0 mb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <Layers className="h-5 w-5 text-red-600 dark:text-red-400" />
                Partition Array & 3-Pointer View
              </CardTitle>

              {/* Legend */}
              <div className="flex items-center gap-3 text-xs font-mono font-bold">
                <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                  <span className="h-3 w-3 rounded-full bg-red-600"></span> 0 (Red)
                </span>
                <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                  <span className="h-3 w-3 rounded-full bg-slate-300 dark:bg-white"></span> 1 (White)
                </span>
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <span className="h-3 w-3 rounded-full bg-blue-600"></span> 2 (Blue)
                </span>
              </div>
            </CardHeader>

            <CardContent className="p-0 space-y-10 my-auto">
              {/* Array Elements */}
              <div className="flex flex-wrap items-center justify-center gap-4 py-6">
                {currentStep.array.map((val, idx) => {
                  const isLow = idx === currentStep.low;
                  const isMid = idx === currentStep.mid;
                  const isHigh = idx === currentStep.high;
                  const isSwapped = currentStep.swapped && currentStep.swapped.includes(idx);

                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 relative">
                      {/* Top Pointer Badges */}
                      <div className="flex items-center justify-center gap-1 h-6">
                        {isLow && (
                          <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase shadow">
                            Low
                          </span>
                        )}
                        {isMid && (
                          <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase shadow">
                            Mid
                          </span>
                        )}
                        {isHigh && (
                          <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase shadow">
                            High
                          </span>
                        )}
                      </div>

                      {/* Element Card */}
                      <div
                        className={`w-14 h-16 rounded-xl flex items-center justify-center font-mono font-black text-2xl transition-all duration-300 border shadow-md ${
                          val === 0
                            ? "bg-red-600 text-white border-red-700"
                            : val === 1
                            ? "bg-slate-100 text-slate-950 border-slate-300 font-black"
                            : "bg-blue-600 text-white border-blue-700"
                        } ${isSwapped ? "ring-4 ring-amber-400 scale-110" : ""}`}
                      >
                        {val}
                      </div>

                      {/* Index Label */}
                      <span className="text-xs font-mono font-bold text-muted-foreground">[{idx}]</span>
                    </div>
                  );
                })}
              </div>

              {/* Pointer Positions Summary */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="bg-muted/50 p-3 rounded-xl border border-border text-center">
                  <span className="text-[11px] font-mono text-red-600 dark:text-red-400 font-bold uppercase block">low pointer</span>
                  <span className="text-xl font-mono font-black text-foreground">{currentStep.low}</span>
                </div>
                <div className="bg-muted/50 p-3 rounded-xl border border-border text-center">
                  <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase block">mid pointer</span>
                  <span className="text-xl font-mono font-black text-foreground">{currentStep.mid}</span>
                </div>
                <div className="bg-muted/50 p-3 rounded-xl border border-border text-center">
                  <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase block">high pointer</span>
                  <span className="text-xl font-mono font-black text-foreground">{currentStep.high}</span>
                </div>
              </div>
            </CardContent>

            {/* Explanation */}
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
              <Info className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-foreground leading-relaxed">
                {currentStep.explanation}
              </p>
            </div>
          </Card>
        </div>

        {/* Trace Panel */}
        <div className="space-y-6">
          <Card className="border-border shadow-sm flex flex-col">
            <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                <Code2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                Algorithm Code Trace
              </CardTitle>

              <div className="flex bg-muted p-1 rounded-lg border border-border">
                <button
                  onClick={() => setActiveTab("pseudocode")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    activeTab === "pseudocode"
                      ? "bg-red-600 text-white shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Pseudocode
                </button>
                <button
                  onClick={() => setActiveTab("java")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    activeTab === "java"
                      ? "bg-red-600 text-white shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Java
                </button>
              </div>
            </CardHeader>

            <CardContent className="p-4 font-mono text-xs overflow-x-auto">
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
                            ? "bg-red-500/20 text-red-950 dark:text-red-100 border-l-4 border-red-600 font-black"
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
