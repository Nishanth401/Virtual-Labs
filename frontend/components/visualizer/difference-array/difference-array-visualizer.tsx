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
  PlusCircle,
  Trash2,
  Layers,
  Code2,
  Info,
  Sparkles
} from "lucide-react";

interface RangeQuery {
  id: string;
  L: number;
  R: number;
  val: number;
}

interface ExecutionStep {
  stepType: "init" | "query" | "prefix";
  activeQueryIdx?: number;
  array: number[];
  diffArray: number[];
  reconstructedArray?: number[];
  explanation: string;
  codeLine: number;
  isComplete?: boolean;
}

const JAVA_CODE = `// Difference Array - Efficient O(1) Range Updates
public int[] applyRangeUpdates(int[] arr, int[][] queries) {
    int n = arr.length;
    int[] D = new int[n + 1];
    
    // 1. Build Difference Array
    D[0] = arr[0];
    for (int i = 1; i < n; i++) D[i] = arr[i] - arr[i - 1];
    
    // 2. Process O(1) Range Updates [L, R, val]
    for (int[] q : queries) {
        int L = q[0], R = q[1], val = q[2];
        D[L] += val;
        if (R + 1 < n) D[R + 1] -= val;
    }
    
    // 3. Prefix Sum Reconstruction
    int[] result = new int[n];
    result[0] = D[0];
    for (int i = 1; i < n; i++) {
        result[i] = result[i - 1] + D[i];
    }
    return result;
}`;

const PSEUDOCODE = [
  "1. Initialize Difference Array D: D[0]=A[0], D[i]=A[i]-A[i-1]",
  "2. For each query [L, R, val]:",
  "3.    D[L] += val",
  "4.    If R + 1 < N: D[R + 1] -= val",
  "5. Reconstruct Array by computing Prefix Sum of D:",
  "6.    A'[0] = D[0]",
  "7.    For i from 1 to N-1: A'[i] = A'[i-1] + D[i]"
];

export function DifferenceArrayVisualizer() {
  const [inputArrayStr, setInputArrayStr] = useState<string>("10, 5, 20, 40, 0");
  const [queries, setQueries] = useState<RangeQuery[]>([
    { id: "1", L: 1, R: 3, val: 3 },
    { id: "2", L: 0, R: 2, val: 5 },
    { id: "3", L: 2, R: 4, val: -2 }
  ]);

  const [newL, setNewL] = useState<string>("1");
  const [newR, setNewR] = useState<string>("3");
  const [newVal, setNewVal] = useState<string>("10");

  const [activeTab, setActiveTab] = useState<"pseudocode" | "java">("pseudocode");
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1200);

  const generateSteps = (rawArrStr: string, activeQueries: RangeQuery[]) => {
    let arr = rawArrStr
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));

    if (arr.length === 0) {
      arr = [10, 5, 20, 40, 0];
    }

    const n = arr.length;
    const diff: number[] = new Array(n).fill(0);
    diff[0] = arr[0];
    for (let i = 1; i < n; i++) {
      diff[i] = arr[i] - arr[i - 1];
    }

    const generated: ExecutionStep[] = [];

    // Step 0: Init Difference Array
    generated.push({
      stepType: "init",
      array: [...arr],
      diffArray: [...diff],
      explanation: `Initialized Difference Array D where D[0]=A[0] and D[i] = A[i] - A[i-1]. Initial D = [${diff.join(", ")}].`,
      codeLine: 1
    });

    // Step 1..Q: Apply Queries
    activeQueries.forEach((q, qIdx) => {
      const L = Math.max(0, Math.min(n - 1, q.L));
      const R = Math.max(L, Math.min(n - 1, q.R));
      const val = q.val;

      diff[L] += val;
      if (R + 1 < n) {
        diff[R + 1] -= val;
      }

      generated.push({
        stepType: "query",
        activeQueryIdx: qIdx,
        array: [...arr],
        diffArray: [...diff],
        explanation: `Query ${qIdx + 1}: Add ${val >= 0 ? `+${val}` : val} to range [${L} ... ${R}]. Updated D[${L}] += ${val}${R + 1 < n ? ` and D[${R + 1}] -= ${val}` : ""}.`,
        codeLine: 3
      });
    });

    // Step Final: Prefix Sum Scan to Reconstruct
    const reconstructed: number[] = new Array(n).fill(0);
    reconstructed[0] = diff[0];
    for (let i = 1; i < n; i++) {
      reconstructed[i] = reconstructed[i - 1] + diff[i];
    }

    generated.push({
      stepType: "prefix",
      array: [...arr],
      diffArray: [...diff],
      reconstructedArray: [...reconstructed],
      explanation: `🎉 All range updates applied in O(1) per query! Reconstructed Final Array A' = [${reconstructed.join(", ")}].`,
      codeLine: 7,
      isComplete: true
    });

    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    generateSteps(inputArrayStr, queries);
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

  const addQuery = () => {
    const arrLen = inputArrayStr.split(",").length || 5;
    const L = Math.max(0, Math.min(arrLen - 1, parseInt(newL) || 0));
    const R = Math.max(L, Math.min(arrLen - 1, parseInt(newR) || 0));
    const val = parseInt(newVal) || 5;

    const updated = [...queries, { id: Date.now().toString(), L, R, val }];
    setQueries(updated);
    generateSteps(inputArrayStr, updated);
  };

  const removeQuery = (id: string) => {
    const updated = queries.filter((q) => q.id !== id);
    setQueries(updated);
    generateSteps(inputArrayStr, updated);
  };

  const currentStep = steps[currentStepIdx] || {
    stepType: "init",
    array: [],
    diffArray: [],
    explanation: "",
    codeLine: 1
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card border border-border p-6 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge className="bg-rose-600 text-white font-mono text-xs uppercase font-bold tracking-wider px-2.5 py-0.5">
              Range Update Optimization
            </Badge>
            <Badge className="bg-emerald-600 text-white font-mono text-xs font-bold px-2.5 py-0.5">
              O(1) Range Update | O(N+Q) Total
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight font-heading flex items-center gap-2.5">
            <Layers className="h-7 w-7 text-rose-600 dark:text-rose-400" />
            Difference Array Visualizer
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl font-medium leading-relaxed">
            Execute multiple range update queries [L, R, val] in O(1) constant time per query, followed by a single prefix sum sweep.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Input
            value={inputArrayStr}
            onChange={(e) => setInputArrayStr(e.target.value)}
            placeholder="10, 5, 20, 40, 0"
            className="bg-background text-foreground border-input font-mono text-xs font-bold w-full md:w-64"
          />
          <Button
            onClick={() => generateSteps(inputArrayStr, queries)}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold shrink-0 shadow"
          >
            Apply Input
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualizer Panel */}
        <div className="lg:col-span-2 space-y-6">
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
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
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
                        ? "bg-rose-600 text-white font-bold text-xs px-2.5 py-1 h-7"
                        : "text-xs px-2.5 py-1 h-7 font-bold"
                    }
                  >
                    {idx === 0 ? "0.5x" : idx === 1 ? "1.0x" : "2.0x"}
                  </Button>
                ))}
              </div>

              <div className="text-xs font-mono text-muted-foreground font-bold">
                Step <span className="text-rose-600 dark:text-rose-400 font-extrabold">{currentStepIdx + 1}</span> of {steps.length}
              </div>
            </CardContent>
          </Card>

          {/* 3-Tier Array Canvas */}
          <Card className="border-border p-6 min-h-[380px] flex flex-col justify-between shadow-sm">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <Layers className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                3-Tier State: Original A, Difference D, Reconstructed A&apos;
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 space-y-6 my-auto">
              {/* Row 1: Base Array A */}
              <div>
                <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                  1. Initial Base Array A:
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {currentStep.array.map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <span className="text-xs font-mono font-bold text-muted-foreground">[{idx}]</span>
                      <div className="w-13 h-13 rounded-xl flex items-center justify-center font-mono font-black text-base bg-slate-800 text-white border border-slate-700 shadow">
                        {val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Difference Array D */}
              <div>
                <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block mb-2">
                  2. Difference Array D:
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {currentStep.diffArray.map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <span className="text-xs font-mono font-bold text-muted-foreground">[{idx}]</span>
                      <div className="w-13 h-13 rounded-xl flex items-center justify-center font-mono font-black text-base bg-rose-600 text-white border border-rose-700 shadow">
                        {val >= 0 ? `+${val}` : val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 3: Reconstructed Array A' */}
              {currentStep.reconstructedArray && (
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-2">
                    3. Reconstructed Final Array A&apos; (Prefix Sum of D):
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    {currentStep.reconstructedArray.map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <span className="text-xs font-mono font-bold text-muted-foreground">[{idx}]</span>
                        <div className="w-13 h-13 rounded-xl flex items-center justify-center font-mono font-black text-lg bg-emerald-600 text-white border border-emerald-700 ring-2 ring-emerald-500/50 shadow scale-105">
                          {val}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>

            {/* Explanation Box */}
            <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
              <Info className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-foreground leading-relaxed">
                {currentStep.explanation}
              </p>
            </div>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Query Creator */}
          <Card className="border-border p-4 space-y-4 shadow-sm">
            <CardHeader className="p-0 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-foreground uppercase tracking-wider">
                Range Queries Manager
              </CardTitle>
              <Badge className="bg-rose-600 text-white font-mono text-[10px] font-bold">
                {queries.length} Active Queries
              </Badge>
            </CardHeader>

            {/* Query Form */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] font-mono text-muted-foreground font-bold">L:</span>
                <Input
                  type="number"
                  value={newL}
                  onChange={(e) => setNewL(e.target.value)}
                  className="bg-background text-foreground border-input font-mono text-xs h-8 font-bold"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono text-muted-foreground font-bold">R:</span>
                <Input
                  type="number"
                  value={newR}
                  onChange={(e) => setNewR(e.target.value)}
                  className="bg-background text-foreground border-input font-mono text-xs h-8 font-bold"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono text-muted-foreground font-bold">Val:</span>
                <Input
                  type="number"
                  value={newVal}
                  onChange={(e) => setNewVal(e.target.value)}
                  className="bg-background text-foreground border-input font-mono text-xs h-8 font-bold"
                />
              </div>
            </div>

            <Button
              onClick={addQuery}
              size="sm"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
            >
              <PlusCircle className="h-3.5 w-3.5" /> Add Range Query
            </Button>

            {/* Queries List */}
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {queries.map((q, idx) => (
                <div
                  key={q.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted border border-border text-xs font-mono text-foreground font-semibold"
                >
                  <span>
                    Q{idx + 1}: Range [{q.L} ... {q.R}] += {q.val >= 0 ? `+${q.val}` : q.val}
                  </span>
                  <button
                    onClick={() => removeQuery(q.id)}
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Trace Panel */}
          <Card className="border-border shadow-sm flex flex-col">
            <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                <Code2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                Algorithm Code Trace
              </CardTitle>

              <div className="flex bg-muted p-1 rounded-lg border border-border">
                <button
                  onClick={() => setActiveTab("pseudocode")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    activeTab === "pseudocode"
                      ? "bg-rose-600 text-white shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Pseudocode
                </button>
                <button
                  onClick={() => setActiveTab("java")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    activeTab === "java"
                      ? "bg-rose-600 text-white shadow"
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
                            ? "bg-rose-500/20 text-rose-950 dark:text-rose-100 border-l-4 border-rose-600 font-black"
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
