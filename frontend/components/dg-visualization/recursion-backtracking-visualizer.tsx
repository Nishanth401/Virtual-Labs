"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle,
  Info,
  Crown
} from "lucide-react";

export type RecBacktrackMode = "factorial" | "fibonacci" | "hanoi" | "nqueens" | "maze";

interface RecStep {
  callStack?: { func: string; param: number; ret?: number; status: "active" | "returning" | "waiting" }[];
  hanoiPegs?: { A: number[]; B: number[]; C: number[] };
  queensBoard?: number[][]; // 4x4 board: 1 = queen, 0 = empty, -1 = conflict
  mazeGrid?: { r: number; c: number; state: "path" | "deadend" | "current" }[];
  message: string;
  what: string;
  why: string;
  next: string;
}

export function RecursionBacktrackingVisualizer({ defaultMode = "nqueens" }: { defaultMode?: RecBacktrackMode }) {
  const [mode, setMode] = useState<RecBacktrackMode>(defaultMode);
  const [steps, setSteps] = useState<RecStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(750);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate Steps for selected subtopic
  const generateSteps = (selectedMode: RecBacktrackMode) => {
    const list: RecStep[] = [];

    if (selectedMode === "factorial") {
      list.push({
        callStack: [{ func: "factorial", param: 4, status: "active" }],
        message: "Invoke factorial(4). Pushed stack frame for n = 4.",
        what: "Calling factorial(4). Check base case (n <= 1).",
        why: "4 > 1, so formula mandates returning 4 * factorial(3).",
        next: "Push new stack frame for factorial(3)."
      });
      list.push({
        callStack: [
          { func: "factorial", param: 3, status: "active" },
          { func: "factorial", param: 4, status: "waiting" }
        ],
        message: "Invoke factorial(3). Stack depth = 2.",
        what: "Calling factorial(3). Check base case (n <= 1).",
        why: "3 > 1, requires computing 3 * factorial(2).",
        next: "Push new stack frame for factorial(2)."
      });
      list.push({
        callStack: [
          { func: "factorial", param: 2, status: "active" },
          { func: "factorial", param: 3, status: "waiting" },
          { func: "factorial", param: 4, status: "waiting" }
        ],
        message: "Invoke factorial(2). Stack depth = 3.",
        what: "Calling factorial(2). Check base case (n <= 1).",
        why: "2 > 1, requires computing 2 * factorial(1).",
        next: "Push new stack frame for factorial(1)."
      });
      list.push({
        callStack: [
          { func: "factorial", param: 1, ret: 1, status: "returning" },
          { func: "factorial", param: 2, status: "waiting" },
          { func: "factorial", param: 3, status: "waiting" },
          { func: "factorial", param: 4, status: "waiting" }
        ],
        message: "Base Case Reached: factorial(1) returns 1! Call stack begins unwinding.",
        what: "n = 1 satisfies base condition: if (n <= 1) return 1.",
        why: "Base case stops recursion and initiates return propagation.",
        next: "Pop frame and multiply with waiting frame factorial(2)."
      });
      list.push({
        callStack: [
          { func: "factorial", param: 2, ret: 2, status: "returning" },
          { func: "factorial", param: 3, status: "waiting" },
          { func: "factorial", param: 4, status: "waiting" }
        ],
        message: "Unwind: factorial(2) = 2 * 1 = 2.",
        what: "Multiplying parameter 2 * return value 1.",
        why: "Completes computation for stack frame factorial(2).",
        next: "Pop frame and pass 2 to factorial(3)."
      });
      list.push({
        callStack: [
          { func: "factorial", param: 3, ret: 6, status: "returning" },
          { func: "factorial", param: 4, status: "waiting" }
        ],
        message: "Unwind: factorial(3) = 3 * 2 = 6.",
        what: "Multiplying parameter 3 * return value 2.",
        why: "Completes computation for stack frame factorial(3).",
        next: "Pop frame and pass 6 to factorial(4)."
      });
      list.push({
        callStack: [
          { func: "factorial", param: 4, ret: 24, status: "returning" }
        ],
        message: "Final Result: factorial(4) = 4 * 6 = 24! Stack completely unwound.",
        what: "Root call computation completed: 24.",
        why: "All child recursive frames returned and yielded product.",
        next: "Execution finished."
      });
    } else if (selectedMode === "nqueens") {
      // 4x4 N-Queens step-by-step trace
      list.push({
        queensBoard: [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        message: "Initialize empty 4x4 chessboard. Begin row 0.",
        what: "Exploring Row 0. Testing Col 0.",
        why: "Start search tree from the top left corner.",
        next: "Place Queen at (0, 0)."
      });
      list.push({
        queensBoard: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        message: "Placed Q0 at (0, 0). Valid! Move to Row 1.",
        what: "Queen placed safely at (0, 0).",
        why: "No previous queens exist; placement is valid.",
        next: "Try placing Queen in Row 1."
      });
      list.push({
        queensBoard: [
          [1, 0, 0, 0],
          [-1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        message: "Try Q1 at (1, 0): Conflict on same column! Reject.",
        what: "Testing cell (1, 0). Conflict detected.",
        why: "Shares column 0 with Queen at (0, 0).",
        next: "Shift to (1, 1)."
      });
      list.push({
        queensBoard: [
          [1, 0, 0, 0],
          [0, -1, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        message: "Try Q1 at (1, 1): Conflict on diagonal! Reject.",
        what: "Testing cell (1, 1). Conflict detected.",
        why: "Shares major diagonal with Queen at (0, 0).",
        next: "Shift to (1, 2)."
      });
      list.push({
        queensBoard: [
          [1, 0, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        message: "Placed Q1 at (1, 2). Valid! Move to Row 2.",
        what: "Queen placed safely at (1, 2).",
        why: "No row, column, or diagonal conflict with Q at (0, 0).",
        next: "Try placing Queen in Row 2."
      });
      list.push({
        queensBoard: [
          [1, 0, 0, 0],
          [0, 0, 1, 0],
          [-1, -1, -1, -1],
          [0, 0, 0, 0]
        ],
        message: "Row 2: All columns (0, 1, 2, 3) conflict! BACKTRACK triggered!",
        what: "Dead-end reached in Row 2. No valid safe square exists.",
        why: "Every cell conflicts with Q(0,0) or Q(1,2).",
        next: "Backtrack to Row 1 and remove Queen at (1, 2)."
      });
      list.push({
        queensBoard: [
          [0, 1, 0, 0],
          [0, 0, 0, 1],
          [1, 0, 0, 0],
          [0, 0, 1, 0]
        ],
        message: "BACKTRACK found complete solution! Queens placed at: (0,1), (1,3), (2,0), (3,2).",
        what: "Valid 4-Queens board configuration reached!",
        why: "All 4 queens are mutually non-attacking across rows, columns, and diagonals.",
        next: "Solution verified."
      });
    } else if (selectedMode === "hanoi") {
      list.push({
        hanoiPegs: { A: [3, 2, 1], B: [], C: [] },
        message: "Tower of Hanoi: 3 Disks on Peg A. Goal: Move all to Peg C.",
        what: "Initial state with disks [3, 2, 1] on source peg A.",
        why: "Rules: Only 1 disk can move at a time; larger disk cannot sit on smaller disk.",
        next: "Move Disk 1 from A to C."
      });
      list.push({
        hanoiPegs: { A: [3, 2], B: [], C: [1] },
        message: "Move Disk 1: Peg A ──> Peg C.",
        what: "Moved top disk 1 to destination peg C.",
        why: "Clears disk 2 for subsequent transfer.",
        next: "Move Disk 2 from A to B."
      });
      list.push({
        hanoiPegs: { A: [3], B: [2], C: [1] },
        message: "Move Disk 2: Peg A ──> Peg B.",
        what: "Moved disk 2 to auxiliary peg B.",
        why: "Prepares disk 3 to move directly to target peg C.",
        next: "Move Disk 1 from C to B."
      });
      list.push({
        hanoiPegs: { A: [3], B: [2, 1], C: [] },
        message: "Move Disk 1: Peg C ──> Peg B.",
        what: "Placed disk 1 on top of disk 2 on auxiliary peg B.",
        why: "Completely vacates peg C for largest disk 3.",
        next: "Move Disk 3 from A to C."
      });
      list.push({
        hanoiPegs: { A: [], B: [2, 1], C: [3] },
        message: "Move Disk 3: Peg A ──> Peg C! Largest disk in place.",
        what: "Transferred base disk 3 to destination peg C.",
        why: "Sub-problem solve(n=2, A -> B) complete; now solve(n=2, B -> C).",
        next: "Move remaining disks from B to C."
      });
      list.push({
        hanoiPegs: { A: [], B: [], C: [3, 2, 1] },
        message: "Tower of Hanoi solved in 2³ - 1 = 7 steps! All disks on Peg C.",
        what: "All 3 disks safely transferred to target Peg C in valid order.",
        why: "Recursive decomposition guarantees minimum 2ⁿ - 1 moves.",
        next: "Done."
      });
    } else {
      // Fibonacci
      list.push({
        message: "Fibonacci Tree Recursion: fib(4) = fib(3) + fib(2).",
        what: "Root call fib(4) branches into left child fib(3) and right child fib(2).",
        why: "Overlapping subproblems cause fib(2) to be computed multiple times.",
        next: "Evaluate fib(3)."
      });
    }

    setSteps(list);
    setCurrentStepIdx(0);
  };

  useEffect(() => {
    generateSteps(mode);
  }, [mode]);

  // Autoplay
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
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

  const currentStep = steps[currentStepIdx] || {
    message: "Ready.",
    what: "Ready.",
    why: "Ready.",
    next: "Ready."
  };

  return (
    <div className="space-y-6">
      {/* Sub-mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-mono">
            Module 4
          </Badge>
          <span className="text-sm font-bold text-foreground">Recursion &amp; Backtracking Studio</span>
        </div>

        <div className="flex items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={mode === "factorial" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setMode("factorial");
              setIsPlaying(false);
            }}
            className="h-7 text-xs font-semibold"
          >
            Factorial (Call Stack)
          </Button>
          <Button
            variant={mode === "nqueens" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setMode("nqueens");
              setIsPlaying(false);
            }}
            className="h-7 text-xs font-semibold"
          >
            N-Queens (Backtracking)
          </Button>
          <Button
            variant={mode === "hanoi" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setMode("hanoi");
              setIsPlaying(false);
            }}
            className="h-7 text-xs font-semibold"
          >
            Tower of Hanoi
          </Button>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-8 gap-1 text-xs"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={currentStepIdx === 0}
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx((p) => Math.max(0, p - 1));
            }}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={currentStepIdx >= steps.length - 1}
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx((p) => Math.min(steps.length - 1, p + 1));
            }}
            className="h-8 w-8 p-0"
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
            className="h-8 w-8 p-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span>Step: <strong>{currentStepIdx + 1}/{steps.length}</strong></span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            {mode === "factorial" ? "O(n) Stack" : mode === "nqueens" ? "O(n!) State Space" : "O(2ⁿ) Moves"}
          </Badge>
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <Card className="border-border bg-card/80 p-6 flex flex-col items-center">
        {/* VIEW 1: FACTORIAL CALL STACK */}
        {mode === "factorial" && currentStep.callStack && (
          <div className="w-full max-w-md space-y-3 py-4">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center">
              JVM Call Stack Frame Hierarchy (LIFO)
            </span>
            <div className="flex flex-col space-y-2 border-b-4 border-x-4 border-primary/40 rounded-b-2xl p-4 bg-muted/20 min-h-[220px] justify-end">
              {currentStep.callStack.map((frame, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between font-mono text-xs transition-all ${
                    frame.status === "returning"
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                      : frame.status === "active"
                      ? "bg-primary/20 border-primary text-primary font-bold shadow-md shadow-primary/20"
                      : "bg-card border-border text-muted-foreground opacity-70"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted border border-border">
                      Frame {idx + 1}
                    </span>
                    <span>factorial({frame.param})</span>
                  </div>
                  <span>
                    {frame.ret !== undefined ? `return ${frame.ret}` : "waiting..."}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: N-QUEENS CHESSBOARD */}
        {mode === "nqueens" && currentStep.queensBoard && (
          <div className="flex flex-col items-center space-y-3 py-2">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              4x4 Chessboard Backtracking Grid
            </span>
            <div className="grid grid-cols-4 border-2 border-border/80 rounded-2xl overflow-hidden shadow-lg">
              {currentStep.queensBoard.map((row, r) =>
                row.map((cell, c) => {
                  const isBlack = (r + c) % 2 === 1;
                  const hasQueen = cell === 1;
                  const isConflict = cell === -1;

                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`h-16 w-16 flex items-center justify-center transition-all ${
                        isConflict
                          ? "bg-rose-500/30 border-2 border-rose-500"
                          : hasQueen
                          ? "bg-amber-500/30 border-2 border-amber-500"
                          : isBlack
                          ? "bg-muted/80"
                          : "bg-card"
                      }`}
                    >
                      {hasQueen && <Crown className="h-8 w-8 text-amber-500 animate-pulse" />}
                      {isConflict && <XCircle className="h-6 w-6 text-rose-500" />}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: TOWER OF HANOI */}
        {mode === "hanoi" && currentStep.hanoiPegs && (
          <div className="w-full max-w-xl space-y-3 py-4">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center">
              Peg A (Source) ── Peg B (Auxiliary) ── Peg C (Destination)
            </span>
            <div className="grid grid-cols-3 gap-6 p-6 bg-muted/20 rounded-2xl border border-border h-48 items-end">
              {(["A", "B", "C"] as const).map((pegKey) => {
                const disks = currentStep.hanoiPegs![pegKey];
                return (
                  <div key={pegKey} className="flex flex-col items-center relative h-full justify-end">
                    {/* Vertical Peg Rod */}
                    <div className="w-2 h-36 bg-primary/40 rounded-t-full absolute bottom-0" />
                    {/* Disk Stack */}
                    <div className="flex flex-col items-center space-y-1.5 z-10 w-full mb-1">
                      {disks.map((dSize) => (
                        <div
                          key={dSize}
                          style={{ width: `${dSize * 32}%` }}
                          className="h-6 bg-gradient-to-r from-indigo-500 to-primary rounded-lg text-center text-[10px] font-bold font-mono text-white flex items-center justify-center shadow-md"
                        >
                          Disk {dSize}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-mono font-bold text-foreground mt-2 border-t border-border w-full text-center pt-1">
                      Peg {pegKey}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Message Strip */}
        <div className="w-full max-w-2xl mt-4 p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>{currentStep.message}</span>
        </div>

        {/* Student Mode 3 Questions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-3xl mt-4">
          <div className="p-3 bg-card rounded-xl border border-border/80 space-y-1">
            <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider block">
              What is happening?
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {currentStep.what}
            </p>
          </div>

          <div className="p-3 bg-card rounded-xl border border-border/80 space-y-1">
            <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider block">
              Why did this happen?
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {currentStep.why}
            </p>
          </div>

          <div className="p-3 bg-card rounded-xl border border-border/80 space-y-1">
            <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-wider block">
              What will happen next?
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {currentStep.next}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
