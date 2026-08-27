"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  ArrowLeftRight,
  Info,
  BookOpen
} from "lucide-react";

export type TwoPointersMode = "two-sum-ii" | "container-water";

interface ExecutionStep {
  left: number;
  right: number;
  array: number[];
  target?: number;
  currentVal?: number;
  explanation: string;
  found?: boolean;
  codeLine: number;
  waterArea?: number;
  maxArea?: number;
}

const JAVA_CODE_TWO_SUM = `// Two Pointers - Two Sum II (Sorted Array)
public int[] twoSum(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length - 1;
    
    while (left < right) {
        int currentSum = numbers[left] + numbers[right];
        
        if (currentSum == target) {
            return new int[]{left + 1, right + 1}; // 1-based indices
        } else if (currentSum < target) {
            left++;  // Move left pointer right to increase sum
        } else {
            right--; // Move right pointer left to decrease sum
        }
    }
    return new int[]{-1, -1};
}`;

const JAVA_CODE_CONTAINER = `// Two Pointers - Container With Most Water
public int maxArea(int[] height) {
    int left = 0;
    int right = height.length - 1;
    int maxArea = 0;
    
    while (left < right) {
        int currentArea = (right - left) * Math.min(height[left], height[right]);
        maxArea = Math.max(maxArea, currentArea);
        
        if (height[left] < height[right]) {
            left++;  // Move shorter line inward
        } else {
            right--; // Move shorter line inward
        }
    }
    return maxArea;
}`;

const PSEUDOCODE_MAP: Record<TwoPointersMode, string[]> = {
  "two-sum-ii": [
    "1. Initialize left = 0, right = arr.length - 1",
    "2. while left < right:",
    "3.    sum = arr[left] + arr[right]",
    "4.    if sum == target -> return [left, right] (FOUND!)",
    "5.    else if sum < target -> left++ (increase sum)",
    "6.    else -> right-- (decrease sum)",
    "7. return not found"
  ],
  "container-water": [
    "1. Initialize left = 0, right = arr.length - 1, maxArea = 0",
    "2. while left < right:",
    "3.    area = (right - left) * min(arr[left], arr[right])",
    "4.    maxArea = max(maxArea, area)",
    "5.    if arr[left] < arr[right] -> left++",
    "6.    else -> right--",
    "7. return maxArea"
  ]
};

export function TwoPointersVisualizer() {
  const [mode, setMode] = useState<TwoPointersMode>("two-sum-ii");
  const [inputArrayStr, setInputArrayStr] = useState<string>("2, 7, 11, 15, 18, 22");
  const [targetInputStr, setTargetInputStr] = useState<string>("26");

  const [activeTab, setActiveTab] = useState<"pseudocode" | "java">("pseudocode");
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1000);

  // Generate simulation steps based on mode and inputs
  const generateSteps = (selectedMode: TwoPointersMode, rawArrStr: string, rawTargetStr: string) => {
    let arr = rawArrStr
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));

    if (arr.length < 2) {
      arr = selectedMode === "container-water" ? [1, 8, 6, 2, 5, 4, 8, 3, 7] : [2, 7, 11, 15, 18, 22];
    }

    const generated: ExecutionStep[] = [];

    if (selectedMode === "two-sum-ii") {
      // Sort array for Two Sum II
      arr.sort((a, b) => a - b);
      const target = parseInt(rawTargetStr) || 26;

      let left = 0;
      let right = arr.length - 1;

      generated.push({
        left,
        right,
        array: [...arr],
        target,
        currentVal: arr[left] + arr[right],
        explanation: `Initial pointers placed at ends: arr[${left}] = ${arr[left]} (LEFT) and arr[${right}] = ${arr[right]} (RIGHT). Target sum = ${target}.`,
        codeLine: 1
      });

      while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) {
          generated.push({
            left,
            right,
            array: [...arr],
            target,
            currentVal: sum,
            found: true,
            explanation: `🎉 MATCH FOUND! arr[${left}] (${arr[left]}) + arr[${right}] (${arr[right]}) = ${sum} equals target ${target}!`,
            codeLine: 4
          });
          break;
        } else if (sum < target) {
          generated.push({
            left,
            right,
            array: [...arr],
            target,
            currentVal: sum,
            explanation: `Current sum arr[${left}] (${arr[left]}) + arr[${right}] (${arr[right]}) = ${sum} < Target (${target}). Advance left pointer (left++).`,
            codeLine: 5
          });
          left++;
        } else {
          generated.push({
            left,
            right,
            array: [...arr],
            target,
            currentVal: sum,
            explanation: `Current sum arr[${left}] (${arr[left]}) + arr[${right}] (${arr[right]}) = ${sum} > Target (${target}). Decrement right pointer (right--).`,
            codeLine: 6
          });
          right--;
        }
      }

      if (left >= right && !generated[generated.length - 1]?.found) {
        generated.push({
          left: Math.min(left, arr.length - 1),
          right: Math.max(0, right),
          array: [...arr],
          target,
          explanation: `Pointers crossed. No pair in the array sums to ${target}.`,
          codeLine: 7
        });
      }
    } else if (selectedMode === "container-water") {
      let left = 0;
      let right = arr.length - 1;
      let maxArea = 0;

      generated.push({
        left,
        right,
        array: [...arr],
        waterArea: 0,
        maxArea: 0,
        explanation: `Initialize Left=0, Right=${right}. Calculate maximum water trapped between vertical lines.`,
        codeLine: 1
      });

      while (left < right) {
        const height = Math.min(arr[left], arr[right]);
        const width = right - left;
        const currentArea = height * width;
        maxArea = Math.max(maxArea, currentArea);

        const explanation = `Width = ${right} - ${left} = ${width}. Height = min(${arr[left]}, ${arr[right]}) = ${height}. Current Area = ${currentArea}. Max Area = ${maxArea}.`;

        if (arr[left] < arr[right]) {
          generated.push({
            left,
            right,
            array: [...arr],
            waterArea: currentArea,
            maxArea,
            explanation: `${explanation} Line at Left (${arr[left]}) is shorter than Right (${arr[right]}), advance left (left++).`,
            codeLine: 5
          });
          left++;
        } else {
          generated.push({
            left,
            right,
            array: [...arr],
            waterArea: currentArea,
            maxArea,
            explanation: `${explanation} Line at Right (${arr[right]}) is shorter or equal to Left (${arr[left]}), decrement right (right--).`,
            codeLine: 6
          });
          right--;
        }
      }

      generated.push({
        left: Math.min(left, arr.length - 1),
        right: Math.max(0, right),
        array: [...arr],
        waterArea: 0,
        maxArea,
        found: true,
        explanation: `🏆 Simulation complete! Maximum water container capacity is ${maxArea} units!`,
        codeLine: 7
      });
    }

    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  // Run steps generation whenever inputs change
  useEffect(() => {
    generateSteps(mode, inputArrayStr, targetInputStr);
  }, [mode, inputArrayStr, targetInputStr]);

  // Handle Play/Pause Auto-Timer
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

  const defaultArray = mode === "container-water" ? [1, 8, 6, 2, 5, 4, 8, 3, 7] : [2, 7, 11, 15, 18, 22];

  const currentStep = steps[currentStepIdx] || {
    left: 0,
    right: defaultArray.length - 1,
    array: defaultArray,
    explanation: "Ready to start visualization",
    codeLine: 1
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-background p-6 rounded-2xl border border-blue-500/30 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 gap-1 font-mono">
              <ArrowLeftRight className="h-3.5 w-3.5" /> Algorithmic Pattern
            </Badge>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-mono">O(N) Time Complexity</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight font-heading">
            Two Pointers Algorithm Visualizer
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Simulate two indices moving inwards or in sync across an array to solve target sum and container area in optimal linear time.
          </p>
        </div>

        {/* Algorithm Mode Switcher */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={mode === "two-sum-ii" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setMode("two-sum-ii");
              setInputArrayStr("2, 7, 11, 15, 18, 22");
              setTargetInputStr("26");
            }}
            className="text-xs font-semibold cursor-pointer"
          >
            Two Sum II (Sorted)
          </Button>
          <Button
            variant={mode === "container-water" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setMode("container-water");
              setInputArrayStr("1, 8, 6, 2, 5, 4, 8, 3, 7");
            }}
            className="text-xs font-semibold cursor-pointer"
          >
            Container With Most Water
          </Button>
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
                placeholder="2, 7, 11, 15, 18, 22"
                className="font-mono text-xs"
              />
            </div>

            {mode === "two-sum-ii" && (
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                  Target Sum
                </label>
                <Input
                  value={targetInputStr}
                  onChange={(e) => setTargetInputStr(e.target.value)}
                  placeholder="26"
                  className="font-mono text-xs"
                />
              </div>
            )}

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
                className="w-full mt-3 accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-end">
              <Button
                onClick={() => generateSteps(mode, inputArrayStr, targetInputStr)}
                className="w-full bg-primary hover:bg-primary/90 text-xs font-bold gap-1.5 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" /> Load &amp; Reset Simulation
              </Button>
            </div>
          </div>

          {/* Stepper Control Buttons */}
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

      {/* Main Interactive Stage & Dynamic Array Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Array Canvas */}
        <Card className="lg:col-span-2 border-border/60 shadow-lg flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" /> Memory Array &amp; Pointer Track
              </CardTitle>
              {currentStep.found && (
                <Badge className="bg-emerald-500 text-white font-mono gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> SOLUTION FOUND
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-8 py-6">
            {/* Pointer Labels Header */}
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
                LEFT Pointer (index: {currentStep.left})
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs font-bold">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
                RIGHT Pointer (index: {currentStep.right})
              </div>
            </div>

            {/* Array Box Layout */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 px-2 min-h-[160px]">
              {(currentStep.array || defaultArray).map((val, idx) => {
                const isLeft = idx === currentStep.left;
                const isRight = idx === currentStep.right;
                const isBetween = idx > currentStep.left && idx < currentStep.right;

                let cardStyle = "border-border bg-card text-foreground";
                if (isLeft && isRight) {
                  cardStyle = "border-purple-500 bg-purple-500/20 text-purple-300 ring-2 ring-purple-500 shadow-lg scale-105";
                } else if (isLeft) {
                  cardStyle = "border-blue-500 bg-blue-500/20 text-blue-400 ring-2 ring-blue-500 shadow-lg scale-105";
                } else if (isRight) {
                  cardStyle = "border-rose-500 bg-rose-500/20 text-rose-400 ring-2 ring-rose-500 shadow-lg scale-105";
                } else if (isBetween) {
                  cardStyle = "border-primary/30 bg-primary/5 text-muted-foreground";
                }

                return (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    {/* Top Pointer Badge */}
                    <div className="h-6 flex items-center justify-center">
                      {isLeft && !isRight && (
                        <Badge className="bg-blue-500 text-white text-[10px] px-1.5 py-0 font-mono">LEFT</Badge>
                      )}
                      {isRight && !isLeft && (
                        <Badge className="bg-rose-500 text-white text-[10px] px-1.5 py-0 font-mono">RIGHT</Badge>
                      )}
                      {isLeft && isRight && (
                        <Badge className="bg-purple-600 text-white text-[10px] px-1.5 py-0 font-mono">L &amp; R</Badge>
                      )}
                    </div>

                    {/* Array Element Box */}
                    <div
                      className={`w-14 h-16 md:w-16 md:h-20 rounded-xl border-2 font-mono font-black text-lg md:text-xl flex flex-col items-center justify-center transition-all duration-300 ${cardStyle}`}
                    >
                      {val}
                    </div>

                    {/* Array Index Label */}
                    <span className="text-[11px] font-mono text-muted-foreground font-bold">[{idx}]</span>
                  </div>
                );
              })}
            </div>

            {/* Mode Specific Metrics Summary */}
            {mode === "two-sum-ii" && currentStep.currentVal !== undefined && (
              <div className="p-4 rounded-xl bg-muted/40 border border-border/50 text-center space-y-1">
                <div className="text-xs text-muted-foreground uppercase font-mono tracking-wider font-bold">
                  Calculation Metric
                </div>
                <div className="text-lg font-black font-mono text-foreground">
                  arr[{currentStep.left}] ({currentStep.array[currentStep.left]}) + arr[{currentStep.right}] (
                  {currentStep.array[currentStep.right]}) ={" "}
                  <span className={currentStep.found ? "text-emerald-400 font-bold" : "text-primary"}>
                    {currentStep.currentVal}
                  </span>{" "}
                  {currentStep.target !== undefined && (
                    <span className="text-muted-foreground text-sm font-normal">
                      (Target: {currentStep.target})
                    </span>
                  )}
                </div>
              </div>
            )}

            {mode === "container-water" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                  <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold">Current Container Area</span>
                  <div className="text-xl font-black text-blue-400 font-mono mt-1">{currentStep.waterArea || 0} sq. units</div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold">Maximum Water Trapped</span>
                  <div className="text-xl font-black text-emerald-400 font-mono mt-1">{currentStep.maxArea || 0} sq. units</div>
                </div>
              </div>
            )}

            {/* Explanation Banner */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm font-mono text-blue-200 leading-relaxed">
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
                className={`flex-1 py-1.5 text-xs font-bold font-mono rounded-lg transition-all cursor-pointer ${
                  activeTab === "pseudocode"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Pseudocode
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("java")}
                className={`flex-1 py-1.5 text-xs font-bold font-mono rounded-lg transition-all cursor-pointer ${
                  activeTab === "java"
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
                      className={`px-2 py-1 rounded transition-colors ${
                        isCurrent
                          ? "bg-blue-600/30 text-blue-300 border-l-4 border-blue-500 font-bold"
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
                <pre className="leading-relaxed">{mode === "two-sum-ii" ? JAVA_CODE_TWO_SUM : JAVA_CODE_CONTAINER}</pre>
              </div>
            )}

            {/* Complexity Card */}
            <div className="p-4 rounded-xl bg-card border border-border/60 space-y-2">
              <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-primary" /> Complexity Analysis
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-muted/40">
                  <span className="text-muted-foreground block text-[10px]">Time Complexity</span>
                  <span className="font-bold text-emerald-400">O(N)</span>
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
