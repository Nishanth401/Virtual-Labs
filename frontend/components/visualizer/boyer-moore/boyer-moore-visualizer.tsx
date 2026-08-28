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
  Vote,
  Code2,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Info
} from "lucide-react";

interface ExecutionStep {
  phase: "candidate-selection" | "verification";
  currentIndex: number;
  array: number[];
  candidate: number | null;
  count: number;
  verificationCount?: number;
  explanation: string;
  codeLine: number;
  isComplete?: boolean;
}

const JAVA_CODE = `// Boyer-Moore Majority Vote Algorithm
public int majorityElement(int[] nums) {
    // Phase 1: Find candidate
    int candidate = 0;
    int count = 0;
    
    for (int num : nums) {
        if (count == 0) {
            candidate = num;
        }
        count += (num == candidate) ? 1 : -1;
    }
    
    // Phase 2: Verify candidate
    int actualCount = 0;
    for (int num : nums) {
        if (num == candidate) actualCount++;
    }
    
    return (actualCount > nums.length / 2) ? candidate : -1;
}`;

const PSEUDOCODE = [
  "Phase 1: Find Potential Candidate",
  "1. Initialize candidate = null, count = 0",
  "2. For each element num in array:",
  "3.    If count == 0: candidate = num",
  "4.    If num == candidate: count++",
  "5.    Else: count--",
  "Phase 2: Verification Pass",
  "6. Count total occurrences of candidate",
  "7. If actualCount > N / 2: Return candidate (Majority Found!)"
];

export function BoyerMooreVisualizer() {
  const [inputArrayStr, setInputArrayStr] = useState<string>("2, 2, 1, 1, 1, 2, 2");
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
      arr = [2, 2, 1, 1, 1, 2, 2];
    }

    const generated: ExecutionStep[] = [];
    let candidate: number | null = null;
    let count = 0;

    // Step 0: Init
    generated.push({
      phase: "candidate-selection",
      currentIndex: 0,
      array: [...arr],
      candidate: null,
      count: 0,
      explanation: "Phase 1 Starts: Finding potential majority candidate. Initial candidate = null, count = 0.",
      codeLine: 1
    });

    // Phase 1 Loop
    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];

      if (count === 0) {
        candidate = val;
        generated.push({
          phase: "candidate-selection",
          currentIndex: i,
          array: [...arr],
          candidate,
          count,
          explanation: `Count reached 0! Selected new candidate = ${candidate} at index ${i}.`,
          codeLine: 3
        });
      }

      if (val === candidate) {
        count++;
        generated.push({
          phase: "candidate-selection",
          currentIndex: i,
          array: [...arr],
          candidate,
          count,
          explanation: `arr[${i}] (${val}) matches candidate (${candidate}). Incremented count -> ${count}.`,
          codeLine: 4
        });
      } else {
        count--;
        generated.push({
          phase: "candidate-selection",
          currentIndex: i,
          array: [...arr],
          candidate,
          count,
          explanation: `arr[${i}] (${val}) does not match candidate (${candidate}). Decremented count -> ${count}.`,
          codeLine: 5
        });
      }
    }

    // Phase 2: Verification Pass
    let actualCount = 0;
    generated.push({
      phase: "verification",
      currentIndex: 0,
      array: [...arr],
      candidate,
      count,
      verificationCount: 0,
      explanation: `Phase 2 Starts: Verifying if candidate (${candidate}) appears more than N/2 times (${Math.floor(arr.length / 2)}).`,
      codeLine: 6
    });

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === candidate) {
        actualCount++;
      }
      generated.push({
        phase: "verification",
        currentIndex: i,
        array: [...arr],
        candidate,
        count,
        verificationCount: actualCount,
        explanation: `Verifying index ${i} (${arr[i]}): ${arr[i] === candidate ? `Matches candidate! Total frequency = ${actualCount}.` : "Does not match candidate."}`,
        codeLine: 6
      });
    }

    const isMajority = actualCount > Math.floor(arr.length / 2);
    generated.push({
      phase: "verification",
      currentIndex: arr.length - 1,
      array: [...arr],
      candidate,
      count,
      verificationCount: actualCount,
      explanation: isMajority
        ? `🎉 Majority Element Verified! Candidate ${candidate} occurs ${actualCount} times ( > N/2 = ${Math.floor(arr.length / 2)}).`
        : `⚠️ No Majority Element! Candidate ${candidate} occurs ${actualCount} times (not > N/2 = ${Math.floor(arr.length / 2)}).`,
      codeLine: 7,
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
    phase: "candidate-selection",
    currentIndex: 0,
    array: [],
    candidate: null,
    count: 0,
    explanation: "",
    codeLine: 1
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card border border-border p-6 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge className="bg-amber-600 text-white font-mono text-xs uppercase font-bold tracking-wider px-2.5 py-0.5">
              Boyer-Moore Voting
            </Badge>
            <Badge className="bg-emerald-600 text-white font-mono text-xs font-bold px-2.5 py-0.5">
              O(N) Time | O(1) Space
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight font-heading flex items-center gap-2.5">
            <Vote className="h-7 w-7 text-amber-600 dark:text-amber-400" />
            Boyer-Moore Majority Vote Visualizer
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl font-medium leading-relaxed">
            Find the element that appears more than N/2 times using pairwise cancellation in linear time and O(1) auxiliary space.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Input
            value={inputArrayStr}
            onChange={(e) => setInputArrayStr(e.target.value)}
            placeholder="2, 2, 1, 1, 1, 2, 2"
            className="bg-background text-foreground border-input font-mono text-xs font-bold w-full md:w-64"
          />
          <Button
            onClick={() => generateSteps(inputArrayStr)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold shrink-0 shadow"
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
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
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
                        ? "bg-amber-600 text-white font-bold text-xs px-2.5 py-1 h-7"
                        : "text-xs px-2.5 py-1 h-7 font-bold"
                    }
                  >
                    {idx === 0 ? "0.5x" : idx === 1 ? "1.0x" : "2.0x"}
                  </Button>
                ))}
              </div>

              <div className="text-xs font-mono text-muted-foreground font-bold">
                Step <span className="text-amber-600 dark:text-amber-400 font-extrabold">{currentStepIdx + 1}</span> of {steps.length}
              </div>
            </CardContent>
          </Card>

          {/* Visualization Canvas */}
          <Card className="border-border p-6 min-h-[340px] flex flex-col justify-between shadow-sm">
            <CardHeader className="p-0 mb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <Layers className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                Array Pass & Candidate Counter
              </CardTitle>

              <Badge
                className={
                  currentStep.phase === "candidate-selection"
                    ? "bg-amber-600 text-white font-bold"
                    : "bg-blue-600 text-white font-bold"
                }
              >
                {currentStep.phase === "candidate-selection"
                  ? "Phase 1: Candidate Selection"
                  : "Phase 2: Frequency Verification"}
              </Badge>
            </CardHeader>

            <CardContent className="p-0 space-y-8 my-auto">
              {/* Array Cards */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 py-4">
                {currentStep.array.map((val, idx) => {
                  const isCurrent = idx === currentStep.currentIndex;
                  const isCandidateMatch = val === currentStep.candidate;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5">
                      <span className="text-xs font-mono font-bold text-muted-foreground">[{idx}]</span>
                      <div
                        className={`w-14 h-16 rounded-xl flex flex-col items-center justify-center font-mono font-black text-xl transition-all border relative shadow-md ${
                          isCurrent
                            ? "bg-blue-600 text-white border-blue-700 ring-4 ring-blue-400/40 scale-110"
                            : isCandidateMatch
                            ? "bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-100 border-amber-400"
                            : "bg-slate-800 text-white border-slate-700"
                        }`}
                      >
                        {val}
                        {isCurrent && (
                          <span className="absolute -top-2.5 bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase shadow">
                            i
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* State Meters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                <div className="bg-muted/50 p-3.5 rounded-xl border border-border">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                    Current Candidate
                  </span>
                  <span className="text-xl font-mono font-black text-amber-600 dark:text-amber-400">
                    {currentStep.candidate !== null ? currentStep.candidate : "None"}
                  </span>
                </div>

                <div className="bg-muted/50 p-3.5 rounded-xl border border-border">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                    Count Balance Meter
                  </span>
                  <span className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                    {currentStep.count}
                  </span>
                </div>

                <div className="bg-muted/50 p-3.5 rounded-xl border border-border">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                    Actual Frequency
                  </span>
                  <span className="text-xl font-mono font-black text-blue-600 dark:text-blue-400">
                    {currentStep.verificationCount !== undefined ? currentStep.verificationCount : "-"}
                  </span>
                </div>

                <div className="bg-muted/50 p-3.5 rounded-xl border border-border">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                    Majority Cutoff (N/2)
                  </span>
                  <span className="text-xl font-mono font-black text-purple-600 dark:text-purple-400">
                    &gt; {Math.floor(currentStep.array.length / 2)}
                  </span>
                </div>
              </div>
            </CardContent>

            {/* Explanation Box */}
            <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-foreground leading-relaxed">
                {currentStep.explanation}
              </p>
            </div>
          </Card>
        </div>

        {/* Trace Panel */}
        <div className="space-y-6">
          <Card className="border-border shadow-sm flex flex-col font-mono">
            <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                <Code2 className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                Algorithm Code Trace
              </CardTitle>

              <div className="flex bg-muted p-1 rounded-lg border border-border">
                <button
                  onClick={() => setActiveTab("pseudocode")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    activeTab === "pseudocode"
                      ? "bg-amber-600 text-white shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Pseudocode
                </button>
                <button
                  onClick={() => setActiveTab("java")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    activeTab === "java"
                      ? "bg-amber-600 text-white shadow"
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
                            ? "bg-amber-500/20 text-amber-950 dark:text-amber-100 border-l-4 border-amber-600 font-black"
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
