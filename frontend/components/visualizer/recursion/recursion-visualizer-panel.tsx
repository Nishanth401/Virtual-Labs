"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { runRecursiveCodeLocally, ExecutionStep, StepCall, StepReturn } from "@/lib/recursion-code-runner";
import { CallStack, StackFrame } from "@/components/visualizer/recursion/call-stack";
import { RecursionTree, TreeNode } from "@/components/visualizer/recursion/recursion-tree";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JavaCodeViewer } from "@/components/visualizer/code/java-code-viewer";
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Sparkles, Code2, Layers, GitBranch, Gauge } from "lucide-react";

interface RecursionVisualizerPanelProps {
  initialCode?: string;
  functionName?: string;
  sampleCall?: string;
  description?: string;
}

const DEFAULT_JAVA_PRESETS: Record<string, { title: string; code: string; call: string; desc: string }> = {
  factorial: {
    title: "Factorial (n!)",
    code: `public static int factorial(int n) {
    if (n <= 1) return 1; // Base Case
    return n * factorial(n - 1); // Recursive Step
}`,
    call: "factorial(4)",
    desc: "Computes n! by unwinding recursive call frames from base case n=1."
  },
  fibonacci: {
    title: "Fibonacci Tree",
    code: `public static int fib(int n) {
    if (n <= 1) return n; // Base Case
    return fib(n - 1) + fib(n - 2); // Binary Recursive Branches
}`,
    call: "fib(4)",
    desc: "Binary recursion branching into two subproblems at each step."
  },
  binarySearch: {
    title: "Recursive Binary Search",
    code: `public static int binarySearch(int[] arr, int target, int low, int high) {
    if (low > high) return -1; // Base Case: Not found
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid; // Found
    if (arr[mid] > target) return binarySearch(arr, target, low, mid - 1);
    return binarySearch(arr, target, mid + 1, high);
}`,
    call: "binarySearch(new int[]{2, 5, 8, 12, 16, 23, 38, 56}, 23, 0, 7)",
    desc: "Halves the search partition on each recursive call frame in O(log n) time."
  },
  bubbleSort: {
    title: "Recursive Bubble Sort",
    code: `public static void bubbleSort(int[] arr, int n) {
    if (n <= 1) return; // Base Case
    
    // One pass of bubble sort: move largest element to end
    for (int i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            int temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
    }
    
    // Recur for remaining n - 1 elements
    bubbleSort(arr, n - 1);
}`,
    call: "bubbleSort(new int[]{64, 34, 25, 12, 22}, 5)",
    desc: "Fixes the largest element at the end and recursively calls for n-1 items."
  }
};

export function RecursionVisualizerPanel({
  initialCode,
  functionName,
  sampleCall,
  description
}: RecursionVisualizerPanelProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>("bubbleSort");
  const [code, setCode] = useState<string>(initialCode || DEFAULT_JAVA_PRESETS.bubbleSort.code);
  const [callStr, setCallStr] = useState<string>(sampleCall || DEFAULT_JAVA_PRESETS.bubbleSort.call);

  // Execution state
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [stepIdx, setStepIdx] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(800);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Run transpiler & AST tracer when code changes
  const runCode = (customCode = code, customCall = callStr) => {
    try {
      setErrorMsg(null);
      const result = runRecursiveCodeLocally(customCode, "java", customCall);
      setSteps(result.steps);
      setStepIdx(0);
      setIsPlaying(false);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to execute recursive Java code.");
      setSteps([]);
      setStepIdx(-1);
    }
  };

  useEffect(() => {
    const activeCode = initialCode || code;
    const activeCall = sampleCall || callStr;
    if (initialCode) setCode(initialCode);
    if (sampleCall) setCallStr(sampleCall);
    runCode(activeCode, activeCall);
  }, [initialCode, sampleCall]);

  // Compute live stack and tree nodes from steps up to stepIdx
  const { liveStack, liveNodes, currentNodeId, executionPhase } = useMemo(() => {
    if (stepIdx < 0 || steps.length === 0) {
      return { liveStack: [], liveNodes: [], currentNodeId: null, executionPhase: "idle" as const };
    }

    const currentStep = steps[stepIdx];
    const stack: StackFrame[] = [];
    const nodeMap: Record<number, TreeNode> = {};

    for (let i = 0; i <= stepIdx; i++) {
      const s = steps[i];
      if (s.type === "call") {
        const frame: StackFrame = {
          id: s.nodeId,
          label: s.label,
          params: s.params,
          isBaseCase: s.isBaseCase,
          returned: false
        };
        stack.push(frame);

        nodeMap[s.nodeId] = {
          id: s.nodeId,
          parentId: s.parentId,
          label: s.label,
          params: s.params,
          isBaseCase: s.isBaseCase,
          returned: false
        };
      } else if (s.type === "return") {
        const popped = stack.pop();
        if (popped) {
          popped.returned = true;
          popped.returnValue = s.value;
        }
        if (nodeMap[s.nodeId]) {
          nodeMap[s.nodeId].returned = true;
          nodeMap[s.nodeId].returnValue = s.value;
        }
      }
    }

    return {
      liveStack: stack,
      liveNodes: Object.values(nodeMap),
      currentNodeId: currentStep.nodeId,
      executionPhase: currentStep.type === "call" ? ("calling" as const) : ("returning" as const)
    };
  }, [steps, stepIdx]);

  // Handle Play/Pause timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, speedMs]);

  const handleTogglePlay = () => {
    if (steps.length === 0) return;
    if (!isPlaying && stepIdx >= steps.length - 1) {
      setStepIdx(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleStepNext = () => {
    if (stepIdx < steps.length - 1) {
      setStepIdx((prev) => prev + 1);
    }
  };

  const handleStepPrev = () => {
    if (stepIdx > 0) {
      setStepIdx((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStepIdx(0);
  };

  const handlePresetSelect = (presetKey: string) => {
    setSelectedPreset(presetKey);
    const preset = DEFAULT_JAVA_PRESETS[presetKey];
    if (preset) {
      setCode(preset.code);
      setCallStr(preset.call);
      runCode(preset.code, preset.call);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Preset Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border/70 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
              AST Call Stack & Tree Engine
            </Badge>
            <span className="text-xs text-muted-foreground">• Pure Java Execution</span>
          </div>
          <h3 className="text-lg font-bold text-foreground font-heading">
            Java Code Execution & Recursion Call Stack Trace
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {description || "Observe JVM call frames, active stack depth, parameter scopes, and return unwinding in real time."}
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-center">
          {Object.entries(DEFAULT_JAVA_PRESETS).map(([key, item]) => (
            <Button
              key={key}
              size="sm"
              variant={selectedPreset === key ? "default" : "outline"}
              onClick={() => handlePresetSelect(key)}
              className="text-xs h-7.5"
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-500 font-mono">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Playback Controls & Timeline */}
      <Card className="border-border bg-card/80 backdrop-blur-md p-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleTogglePlay}
              disabled={steps.length === 0}
              className="bg-primary hover:bg-primary/90 text-white text-xs gap-1.5 font-bold shadow-xs"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isPlaying ? "Pause" : "Play Trace"}</span>
            </Button>
            <Button size="sm" variant="outline" onClick={handleStepPrev} disabled={stepIdx <= 0} className="text-xs gap-1">
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <Button size="sm" variant="outline" onClick={handleStepNext} disabled={stepIdx >= steps.length - 1} className="text-xs gap-1">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleReset} className="text-xs gap-1">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </Button>
          </div>

          {/* Timeline slider */}
          <div className="flex-1 w-full max-w-md px-2 space-y-1">
            <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
              <span>Step {stepIdx + 1} of {Math.max(steps.length, 1)}</span>
              <span>{steps.length > 0 ? Math.round(((stepIdx + 1) / steps.length) * 100) : 0}% Done</span>
            </div>
            <input
              type="range"
              min={0}
              max={Math.max(steps.length - 1, 0)}
              value={Math.max(stepIdx, 0)}
              onChange={(e) => { setIsPlaying(false); setStepIdx(Number(e.target.value)); }}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Speed slider */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Gauge className="h-4 w-4 text-primary" />
            <span>Speed:</span>
            <select
              value={speedMs}
              onChange={(e) => setSpeedMs(Number(e.target.value))}
              className="bg-muted px-2 py-1 rounded text-xs border border-border text-foreground font-mono"
            >
              <option value={1400}>0.5x (Slow)</option>
              <option value={800}>1.0x (Normal)</option>
              <option value={400}>2.0x (Fast)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Main 3-Column Visualization Workspace (Equal Size Panels) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        {/* Panel 1: Java Code Display */}
        <div className="h-[480px]">
          <JavaCodeViewer
            code={code}
            title="Java Source Code"
            subtitle={`Entry Call: ${callStr}`}
            badge="Java 17 / 21"
            fileName={`${functionName || "Algorithm"}.java`}
          />
        </div>

        {/* Panel 2: JVM Call Stack */}
        <div className="h-[480px]">
          <CallStack
            stack={liveStack}
            currentNodeId={currentNodeId}
            executionPhase={executionPhase}
          />
        </div>

        {/* Panel 3: Recursion Call Tree Diagram */}
        <div className="h-[480px]">
          <RecursionTree
            nodes={liveNodes}
            currentNodeId={currentNodeId}
            executionPhase={executionPhase}
          />
        </div>
      </div>
    </div>
  );
}
