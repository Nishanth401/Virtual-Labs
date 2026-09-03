"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { 
  runCodeLocally, 
  ExecutionStep, 
  StepCall, 
  StepReturn, 
  RECURSION_EXAMPLES 
} from "@/lib/code-runner-engine";
import { CallStack, StackFrame } from "@/components/visualizer/recursion/call-stack";
import { RecursionTreeEngine, TreeNodeData } from "@/components/visualizer/recursion/recursion-tree-engine";
import { CodeViewer } from "@/components/visualizer/recursion/code-viewer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Code2, 
  Layers, 
  GitBranch, 
  Gauge, 
  AlertCircle,
  CheckCircle2,
  Cpu
} from "lucide-react";

interface RecursionVisualizerPanelProps {
  initialCode?: string;
  functionName?: string;
  sampleCall?: string;
  description?: string;
}

export function RecursionVisualizerPanel({
  initialCode,
  functionName: propFuncName,
  sampleCall: propSampleCall,
  description
}: RecursionVisualizerPanelProps) {
  const [selectedExampleId, setSelectedExampleId] = useState<string>("factorial");
  const [language, setLanguage] = useState<"java" | "python" | "cpp" | "js">("java");

  // Active code and call string
  const currentPreset = useMemo(() => {
    return RECURSION_EXAMPLES.find(ex => ex.id === selectedExampleId) || RECURSION_EXAMPLES[0];
  }, [selectedExampleId]);

  const getPresetCodeForLang = (preset: typeof currentPreset, lang: string) => {
    switch (lang) {
      case "python": return preset.codePython;
      case "cpp": return preset.codeCpp;
      case "js": return preset.codeJs;
      default: return preset.codeJava;
    }
  };

  const [code, setCode] = useState<string>(initialCode || getPresetCodeForLang(currentPreset, language));
  const [callStr, setCallStr] = useState<string>(propSampleCall || currentPreset.defaultCall);

  // Execution state
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [stepIdx, setStepIdx] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(750);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isTreeExpanded, setIsTreeExpanded] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Run transpiler & AST tracer when code changes
  const runEngine = useCallback((customCode = code, customLang = language, customCall = callStr) => {
    try {
      setErrorMsg(null);
      const result = runCodeLocally(customCode, customLang, customCall);
      setSteps(result.steps);
      setStepIdx(0);
      setIsPlaying(false);
    } catch (err: any) {
      console.error("Execution error:", err);
      setErrorMsg(err.message || String(err));
      setSteps([]);
      setStepIdx(-1);
    }
  }, [code, language, callStr]);

  // Initial execution on mount
  useEffect(() => {
    runEngine();
  }, []);

  const handleSelectPreset = (presetId: string) => {
    setSelectedExampleId(presetId);
    const ex = RECURSION_EXAMPLES.find(e => e.id === presetId) || RECURSION_EXAMPLES[0];
    const newCode = getPresetCodeForLang(ex, language);
    setCode(newCode);
    setCallStr(ex.defaultCall);
    runEngine(newCode, language, ex.defaultCall);
  };

  const handleLanguageChange = (newLang: "java" | "python" | "cpp" | "js") => {
    setLanguage(newLang);
    const newCode = getPresetCodeForLang(currentPreset, newLang);
    setCode(newCode);
    runEngine(newCode, newLang, callStr);
  };

  // Autoplay timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStepIdx((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, speedMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, speedMs]);

  // Derive active CallStack and RecursionTree from current step index
  const { stack, treeNodes, currentNodeId, executionPhase, activeLine } = useMemo(() => {
    if (stepIdx < 0 || steps.length === 0) {
      return { stack: [], treeNodes: [], currentNodeId: null, executionPhase: null, activeLine: null };
    }

    const currentStack: StackFrame[] = [];
    const nodeMap: Record<number, TreeNodeData> = {};

    let curId: number | null = null;
    let curPhase: "calling" | "returning" | null = null;

    for (let i = 0; i <= stepIdx; i++) {
      const step = steps[i];

      if (step.type === "call") {
        curId = step.nodeId;
        curPhase = "calling";
        currentStack.push({
          id: step.nodeId,
          label: step.label,
          params: step.params,
          isBaseCase: step.isBaseCase
        });

        nodeMap[step.nodeId] = {
          id: step.nodeId,
          parentId: step.parentId,
          label: step.label,
          params: step.params,
          isBaseCase: step.isBaseCase,
          phase: "calling"
        };
      } else if (step.type === "return") {
        curId = step.nodeId;
        curPhase = "returning";
        const frame = currentStack.find(f => f.id === step.nodeId);
        if (frame) {
          frame.returned = true;
          frame.returnValue = step.value;
        }

        if (nodeMap[step.nodeId]) {
          nodeMap[step.nodeId].returnValue = step.value;
          nodeMap[step.nodeId].phase = "returning";
        }

        // Pop from stack
        const stackIdx = currentStack.findIndex(f => f.id === step.nodeId);
        if (stackIdx !== -1) {
          currentStack.splice(stackIdx, 1);
        }
      }
    }

    // Active line estimation based on current step
    let line: number | null = null;
    const currentStep = steps[stepIdx];
    const lines = code.split("\n");

    if (currentStep) {
      if (currentStep.type === "call" && currentStep.isBaseCase) {
        line = lines.findIndex(l => l.includes("return 1") || l.includes("return 0") || l.includes("return -1") || l.includes("return;"));
      } else if (currentStep.type === "call") {
        line = lines.findIndex(l => l.includes("factorial(") || l.includes("fibonacci(") || l.includes("binarySearch(") || l.includes("power(") || l.includes("mergeSort("));
      } else if (currentStep.type === "return") {
        line = lines.findIndex(l => l.includes("return"));
      }
      if (line !== -1 && line !== null) line = line + 1; // 1-indexed
    }

    return {
      stack: currentStack,
      treeNodes: Object.values(nodeMap),
      currentNodeId: curId,
      executionPhase: curPhase,
      activeLine: line
    };
  }, [stepIdx, steps, code]);

  const currentStep = steps[stepIdx];

  return (
    <div className="space-y-6">
      {/* Preset & Language Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-card p-3.5 rounded-2xl border border-border/80 shadow-xs">
        {/* Preset buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-muted-foreground mr-1.5 font-heading">Algorithms:</span>
          {RECURSION_EXAMPLES.map((ex) => (
            <Button
              key={ex.id}
              variant={selectedExampleId === ex.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleSelectPreset(ex.id)}
              className="h-7 text-xs font-bold rounded-xl"
            >
              {ex.name}
            </Button>
          ))}
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60">
          {(["java", "python", "cpp", "js"] as const).map((lang) => (
            <Button
              key={lang}
              variant={language === lang ? "default" : "ghost"}
              size="sm"
              onClick={() => handleLanguageChange(lang)}
              className="h-6 text-[11px] font-mono uppercase px-2 font-bold"
            >
              {lang}
            </Button>
          ))}
        </div>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-mono flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block">Transpilation or Execution Notice:</span>
            <pre className="whitespace-pre-wrap">{errorMsg}</pre>
          </div>
        </div>
      )}

      {/* Playback Controls & Progress Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={steps.length === 0}
            className="h-8 gap-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-xl"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>{isPlaying ? "Pause" : "Play Trace"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={stepIdx <= 0 || steps.length === 0}
            onClick={() => {
              setIsPlaying(false);
              setStepIdx(prev => Math.max(0, prev - 1));
            }}
            className="h-8 w-8 p-0 rounded-xl"
            title="Step Back"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={stepIdx >= steps.length - 1 || steps.length === 0}
            onClick={() => {
              setIsPlaying(false);
              setStepIdx(prev => Math.min(steps.length - 1, prev + 1));
            }}
            className="h-8 w-8 p-0 rounded-xl"
            title="Step Next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsPlaying(false);
              setStepIdx(0);
            }}
            className="h-8 w-8 p-0 rounded-xl"
            title="Reset to Start"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>

          {/* Speed slider */}
          <div className="hidden sm:flex items-center gap-2 ml-3 pl-3 border-l border-border/60">
            <Gauge className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[11px] font-mono text-muted-foreground">Speed:</span>
            <input
              type="range"
              min="200"
              max="1500"
              step="100"
              value={1700 - speedMs}
              onChange={(e) => setSpeedMs(1700 - Number(e.target.value))}
              className="w-20 h-1.5 bg-muted rounded-lg accent-primary cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span>
            Step: <strong>{stepIdx >= 0 ? stepIdx + 1 : 0} / {steps.length}</strong>
          </span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            Time: {currentPreset.time} | Space: {currentPreset.space}
          </Badge>
        </div>
      </div>

      {/* Main Studio Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Code Editor / Viewer */}
        <div className="lg:col-span-5 h-[480px]">
          <CodeViewer
            code={code}
            language={language}
            activeLine={activeLine}
            onCodeChange={(newCode) => {
              setCode(newCode);
              runEngine(newCode, language, callStr);
            }}
            readOnly={false}
          />
        </div>

        {/* Center/Right Column: Live SVG Recursion Tree */}
        <div className="lg:col-span-4 h-[480px]">
          <RecursionTreeEngine
            nodes={treeNodes}
            currentNodeId={currentNodeId}
            executionPhase={executionPhase}
            isExpanded={isTreeExpanded}
            onToggleExpand={() => setIsTreeExpanded(!isTreeExpanded)}
          />
        </div>

        {/* Right Column: LIFO Call Stack */}
        <div className="lg:col-span-3 h-[480px]">
          <CallStack
            stack={stack}
            currentNodeId={currentNodeId}
            executionPhase={executionPhase || undefined}
          />
        </div>
      </div>

      {/* Real-time State Card */}
      {currentStep && (
        <Card className="p-4 bg-muted/30 border-border/80 rounded-2xl">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-foreground">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Execution Trace Step {stepIdx + 1}:</span>
            <Badge variant="outline" className={`text-[10px] ${currentStep.type === "call" ? "bg-amber-500/10 text-amber-500 border-amber-500/30" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"}`}>
              {currentStep.type.toUpperCase()}
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-card rounded-xl border border-border/60">
              <span className="text-[10px] font-mono text-muted-foreground uppercase block font-bold">Action</span>
              <span className="font-mono text-foreground font-semibold mt-1 block">
                {currentStep.type === "call" ? `Push Frame: ${currentStep.label}` : `Pop Frame: return ${(currentStep as StepReturn).value}`}
              </span>
            </div>
            <div className="p-3 bg-card rounded-xl border border-border/60">
              <span className="text-[10px] font-mono text-muted-foreground uppercase block font-bold">Parameters</span>
              <span className="font-mono text-foreground mt-1 block">
                {currentStep.type === "call" ? JSON.stringify(currentStep.params) : "Returning value"}
              </span>
            </div>
            <div className="p-3 bg-card rounded-xl border border-border/60">
              <span className="text-[10px] font-mono text-muted-foreground uppercase block font-bold">Condition</span>
              <span className="font-mono text-emerald-500 font-bold mt-1 block">
                {currentStep.isBaseCase ? "✓ Base Case Active" : "Recursive Step"}
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
