"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  FastForward,
  Crown,
  CheckCircle2,
  XCircle,
  Sparkles,
  Layers,
  Info,
  ShieldAlert,
  ListOrdered
} from "lucide-react";

// ==========================================
// TYPES & DATA STRUCTURES
// ==========================================

export type BoardSize = 4 | 5 | 6;

export interface NQueensStep {
  stepIndex: number;
  callNumber: number; // 1-based call index in state-space tree
  row: number; // recursion depth (0 to N)
  col: number; // placed col (-1 if none)
  queens: number[]; // row -> col (-1 if unplaced)
  board: number[][]; // 0: empty, 1: placed queen, -1: conflict cell, 2: solution queen
  actionType: "root" | "call" | "place" | "conflict" | "backtrack" | "solution";
  conflictCell: { r: number; c: number } | null;
  conflictLines: { r: number; c: number }[];
  conflictReason: string;
  solutionNumber: number | null; // 1, 2, ... if this state found a solution
  callStack: { row: number; col: number; depth: number }[];
  levelCountsSoFar: number[];
  title: string;
  description: string;
  whyPruned?: string;
}

export interface SavedSolution {
  number: number;
  stepIndex: number;
  queens: number[];
}

export interface BoardConfigInfo {
  size: BoardSize;
  totalSolutions: number;
  totalCalls: number;
  unoptimizedPermutations: number; // N!
  levelBreakdown: { level: number; label: string; count: number; desc: string }[];
}

export const BOARD_CONFIGS: Record<BoardSize, BoardConfigInfo> = {
  4: {
    size: 4,
    totalSolutions: 2,
    totalCalls: 17,
    unoptimizedPermutations: 24,
    levelBreakdown: [
      { level: 0, label: "Level 0 (Root)", count: 1, desc: "1 state (Empty board)" },
      { level: 1, label: "Level 1 (Row 1)", count: 4, desc: "4 states (Valid 1-queen placements)" },
      { level: 2, label: "Level 2 (Row 2)", count: 6, desc: "6 states (Valid 2-queen placements)" },
      { level: 3, label: "Level 3 (Row 3)", count: 4, desc: "4 states (Valid 3-queen placements)" },
      { level: 4, label: "Level 4 (Row 4)", count: 2, desc: "2 states (The 2 completed valid solutions)" }
    ]
  },
  5: {
    size: 5,
    totalSolutions: 10,
    totalCalls: 54,
    unoptimizedPermutations: 120,
    levelBreakdown: [
      { level: 0, label: "Level 0 (Root)", count: 1, desc: "1 state (Empty board)" },
      { level: 1, label: "Level 1 (Row 1)", count: 5, desc: "5 states (Valid 1-queen placements)" },
      { level: 2, label: "Level 2 (Row 2)", count: 12, desc: "12 states (Valid 2-queen placements)" },
      { level: 3, label: "Level 3 (Row 3)", count: 14, desc: "14 states (Valid 3-queen placements)" },
      { level: 4, label: "Level 4 (Row 4)", count: 12, desc: "12 states (Valid 4-queen placements)" },
      { level: 5, label: "Level 5 (Row 5)", count: 10, desc: "10 states (The 10 completed valid solutions)" }
    ]
  },
  6: {
    size: 6,
    totalSolutions: 4,
    totalCalls: 153,
    unoptimizedPermutations: 720,
    levelBreakdown: [
      { level: 0, label: "Level 0 (Root)", count: 1, desc: "1 state (Empty board)" },
      { level: 1, label: "Level 1 (Row 1)", count: 6, desc: "6 states (Valid 1-queen placements)" },
      { level: 2, label: "Level 2 (Row 2)", count: 20, desc: "20 states (Valid 2-queen placements)" },
      { level: 3, label: "Level 3 (Row 3)", count: 36, desc: "36 states (Valid 3-queen placements)" },
      { level: 4, label: "Level 4 (Row 4)", count: 46, desc: "46 states (Valid 4-queen placements)" },
      { level: 5, label: "Level 5 (Row 5)", count: 40, desc: "40 states (Valid 5-queen placements)" },
      { level: 6, label: "Level 6 (Row 6)", count: 4, desc: "4 states (The 4 completed valid solutions)" }
    ]
  }
};

// ==========================================
// STEP GENERATOR ENGINE
// ==========================================

function generateNQueensSteps(N: BoardSize, mode: "calls" | "detailed"): {
  steps: NQueensStep[];
  solutions: SavedSolution[];
} {
  const steps: NQueensStep[] = [];
  const solutions: SavedSolution[] = [];
  const queens: number[] = Array(N).fill(-1);
  const board: number[][] = Array.from({ length: N }, () => Array(N).fill(0));
  const stack: { row: number; col: number; depth: number }[] = [];
  const levelCounts: number[] = Array(N + 1).fill(0);

  let callCounter = 0;
  let solutionCounter = 0;

  const cloneBoard = () => board.map((r) => [...r]);

  const isSafe = (row: number, col: number) => {
    for (let r = 0; r < row; r++) {
      const c = queens[r];
      if (c === col) {
        return {
          safe: false,
          reason: `Column ${col} is threatened by Queen at Row ${r}, Col ${c}`,
          attacker: { r, c }
        };
      }
      if (Math.abs(r - row) === Math.abs(c - col)) {
        return {
          safe: false,
          reason: `Diagonal is threatened by Queen at Row ${r}, Col ${c}`,
          attacker: { r, c }
        };
      }
    }
    return { safe: true, reason: "", attacker: null };
  };

  const getConflictRays = (attackingRow: number, attackingCol: number, targetRow: number, targetCol: number) => {
    const lines: { r: number; c: number }[] = [];
    for (let r = 0; r < N; r++) lines.push({ r, c: attackingCol });
    for (let r = 0; r < N; r++) {
      const diff = r - attackingRow;
      if (attackingCol + diff >= 0 && attackingCol + diff < N) lines.push({ r, c: attackingCol + diff });
      if (attackingCol - diff >= 0 && attackingCol - diff < N) lines.push({ r, c: attackingCol - diff });
    }
    return lines;
  };

  // BACKTRACKING RECURSIVE ENGINE
  function solve(row: number) {
    callCounter++;
    levelCounts[row]++;
    const currentCallNum = callCounter;

    // Push Step for Call Entry (State in State-Space Tree)
    if (row === N) {
      solutionCounter++;
      const currentSolNum = solutionCounter;

      // Mark solution board
      const solBoard = cloneBoard();
      for (let r = 0; r < N; r++) {
        solBoard[r][queens[r]] = 2; // special solution styling
      }

      const step: NQueensStep = {
        stepIndex: steps.length,
        callNumber: currentCallNum,
        row,
        col: -1,
        queens: [...queens],
        board: solBoard,
        actionType: "solution",
        conflictCell: null,
        conflictLines: [],
        conflictReason: "",
        solutionNumber: currentSolNum,
        callStack: [...stack],
        levelCountsSoFar: [...levelCounts],
        title: `🎉 Solution #${currentSolNum} Discovered!`,
        description: `All ${N} queens placed safely at rows 0-${N - 1} with zero mutual threats: [${queens.join(", ")}].`
      };

      steps.push(step);
      solutions.push({
        number: currentSolNum,
        stepIndex: step.stepIndex,
        queens: [...queens]
      });
      return;
    }

    if (mode === "calls") {
      steps.push({
        stepIndex: steps.length,
        callNumber: currentCallNum,
        row,
        col: row > 0 ? queens[row - 1] : -1,
        queens: [...queens],
        board: cloneBoard(),
        actionType: row === 0 ? "root" : "call",
        conflictCell: null,
        conflictLines: [],
        conflictReason: "",
        solutionNumber: null,
        callStack: [...stack],
        levelCountsSoFar: [...levelCounts],
        title: row === 0 ? "Level 0 (Root): Empty Board" : `Level ${row} (Row ${row}): solve(row = ${row})`,
        description:
          row === 0
            ? `State 1 of ${BOARD_CONFIGS[N].totalCalls}: Initializing search on ${N}×${N} board. Exploring candidates for Row 0.`
            : `Recursive call #${currentCallNum}: Examining candidate column placements for Row ${row}.`
      });
    }

    for (let col = 0; col < N; col++) {
      const check = isSafe(row, col);

      if (check.safe) {
        // Place Queen
        queens[row] = col;
        board[row][col] = 1;
        stack.push({ row, col, depth: row });

        if (mode === "detailed") {
          steps.push({
            stepIndex: steps.length,
            callNumber: currentCallNum,
            row,
            col,
            queens: [...queens],
            board: cloneBoard(),
            actionType: "place",
            conflictCell: null,
            conflictLines: [],
            conflictReason: "",
            solutionNumber: null,
            callStack: [...stack],
            levelCountsSoFar: [...levelCounts],
            title: `Row ${row}: Placed Queen at (${row}, ${col})`,
            description: `Square (${row}, ${col}) is structurally safe. Placing queen and recursing to Row ${row + 1}.`
          });
        }

        solve(row + 1);

        // Backtrack
        board[row][col] = 0;
        queens[row] = -1;
        stack.pop();

        if (mode === "detailed") {
          steps.push({
            stepIndex: steps.length,
            callNumber: callCounter,
            row,
            col,
            queens: [...queens],
            board: cloneBoard(),
            actionType: "backtrack",
            conflictCell: null,
            conflictLines: [],
            conflictReason: "",
            solutionNumber: null,
            callStack: [...stack],
            levelCountsSoFar: [...levelCounts],
            title: `Row ${row}: Backtrack from (${row}, ${col})`,
            description: `Dead-end encountered in child levels. Removed Queen from (${row}, ${col}) to test next available column.`,
            whyPruned: "Unwinding recursive call stack"
          });
        }
      } else {
        if (mode === "detailed") {
          const lines = check.attacker
            ? getConflictRays(check.attacker.r, check.attacker.c, row, col)
            : [];

          board[row][col] = -1;
          steps.push({
            stepIndex: steps.length,
            callNumber: currentCallNum,
            row,
            col,
            queens: [...queens],
            board: cloneBoard(),
            actionType: "conflict",
            conflictCell: { r: row, c: col },
            conflictLines: lines,
            conflictReason: check.reason,
            solutionNumber: null,
            callStack: [...stack],
            levelCountsSoFar: [...levelCounts],
            title: `Row ${row}, Col ${col}: Collision Pruned`,
            description: `Square (${row}, ${col}) rejected: ${check.reason}.`,
            whyPruned: `Immediately pruned branch before descending into O(N!) search space.`
          });
          board[row][col] = 0;
        }
      }
    }
  }

  solve(0);
  return { steps, solutions };
}

// ==========================================
// COMPONENT IMPLEMENTATION
// ==========================================

export function NQueensVisualizer() {
  const [boardSize, setBoardSize] = useState<BoardSize>(4);
  const [viewGranularity, setViewGranularity] = useState<"calls" | "detailed">("calls");
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1); // 0.5x, 1x, 2x, 4x

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate steps whenever board size or granularity changes
  const { steps, solutions } = useMemo(() => {
    return generateNQueensSteps(boardSize, viewGranularity);
  }, [boardSize, viewGranularity]);

  const config = BOARD_CONFIGS[boardSize];

  // Clamp step index
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [boardSize, viewGranularity]);

  // Current active step
  const currentStep = steps[currentStepIndex] || steps[0];

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      const delay = Math.max(80, 800 / playbackSpeed);
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, steps.length]);

  // Navigation handlers
  const handlePlayPause = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((p) => p + 1);
    }
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((p) => p - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleJumpNextSolution = () => {
    setIsPlaying(false);
    const nextSol = solutions.find((s) => s.stepIndex > currentStepIndex);
    if (nextSol) {
      setCurrentStepIndex(nextSol.stepIndex);
    } else if (solutions.length > 0) {
      // wrap to first solution
      setCurrentStepIndex(solutions[0].stepIndex);
    }
  };

  // Solutions found so far
  const solutionsFoundSoFar = useMemo(() => {
    return solutions.filter((s) => s.stepIndex <= currentStepIndex);
  }, [solutions, currentStepIndex]);

  // Dynamic board cell sizing
  const cellSizeClass =
    boardSize === 4
      ? "h-16 w-16 sm:h-20 sm:w-20"
      : boardSize === 5
      ? "h-14 w-14 sm:h-16 sm:w-16"
      : "h-12 w-12 sm:h-14 sm:w-14";

  return (
    <div className="space-y-6">
      {/* ========================================== */}
      {/* 1. TOP HEADER & METRICS BAR               */}
      {/* ========================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-muted/40 border border-border">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
              <Crown className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold font-heading text-foreground">
              {boardSize}×{boardSize} N-Queens Backtracking Visualizer
            </h2>
            <Badge variant="outline" className="text-xs font-mono text-primary border-primary/30">
              O(N!) State Space
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Complete recursive call tree traversal with constraint satisfaction pruning and mutual attack ray tracing.
          </p>
        </div>

        {/* Board Size Selector Pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground font-semibold">Board Size:</span>
          <div className="flex items-center p-1 bg-background rounded-xl border border-border shadow-xs">
            {([4, 5, 6] as BoardSize[]).map((size) => (
              <Button
                key={size}
                size="sm"
                variant={boardSize === size ? "default" : "ghost"}
                onClick={() => setBoardSize(size)}
                className={`h-8 px-3.5 text-xs font-mono font-bold rounded-lg transition-all ${
                  boardSize === size
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {size} × {size}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 2. STATS & EFFICIENCY SCORECARD            */}
      {/* ========================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-4 bg-card border-border/80 rounded-2xl shadow-xs">
          <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold">Total Solutions</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-black font-mono text-foreground">
              {solutionsFoundSoFar.length}
            </span>
            <span className="text-xs font-mono text-muted-foreground">/ {config.totalSolutions}</span>
          </div>
          <span className="text-[10px] text-muted-foreground block mt-1">
            {solutionsFoundSoFar.length === config.totalSolutions
              ? "All solutions discovered!"
              : `${config.totalSolutions - solutionsFoundSoFar.length} remaining`}
          </span>
        </Card>

        <Card className="p-4 bg-card border-border/80 rounded-2xl shadow-xs">
          <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold">States Explored</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-black font-mono text-amber-500">
              {currentStep.callNumber}
            </span>
            <span className="text-xs font-mono text-muted-foreground">/ {config.totalCalls}</span>
          </div>
          <span className="text-[10px] text-muted-foreground block mt-1">Exact recursive calls</span>
        </Card>

        <Card className="p-4 bg-card border-border/80 rounded-2xl shadow-xs">
          <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold">Unoptimized Space</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-black font-mono text-rose-400">
              {config.unoptimizedPermutations}
            </span>
            <span className="text-xs font-mono text-muted-foreground">({boardSize}!)</span>
          </div>
          <span className="text-[10px] text-muted-foreground block mt-1">Permutations without pruning</span>
        </Card>

        <Card className="p-4 bg-card border-border/80 rounded-2xl shadow-xs">
          <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold">Pruning Efficiency</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-black font-mono text-emerald-400">
              {Math.round(((config.unoptimizedPermutations - config.totalCalls) / config.unoptimizedPermutations) * 100)}%
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground block mt-1">
            {config.unoptimizedPermutations - config.totalCalls} calls saved by pruning
          </span>
        </Card>
      </div>

      {/* ========================================== */}
      {/* 3. PLAYBACK CONTROLS & TIMELINE            */}
      {/* ========================================== */}
      <Card className="p-4 bg-card border-border/80 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Controls: Play, Step, Reset */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handlePlayPause}
              className={`h-9 px-4 rounded-xl font-mono text-xs font-bold gap-1.5 ${
                isPlaying
                  ? "bg-amber-600 hover:bg-amber-700 text-white"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              }`}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={handleStepBackward}
              disabled={currentStepIndex === 0}
              className="h-9 w-9 rounded-xl"
              title="Step Backward"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={handleStepForward}
              disabled={currentStepIndex >= steps.length - 1}
              className="h-9 w-9 rounded-xl"
              title="Step Forward"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={handleReset}
              className="h-9 w-9 rounded-xl"
              title="Reset to Root"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="secondary"
              onClick={handleJumpNextSolution}
              className="h-9 px-3 rounded-xl text-xs font-mono font-bold gap-1 text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20"
              title="Fast Forward to Next Valid Solution"
            >
              <FastForward className="h-3.5 w-3.5" />
              Next Solution
            </Button>
          </div>

          {/* Granularity & Speed Controls */}
          <div className="flex items-center gap-3">
            {/* Granularity Mode */}
            <div className="flex items-center p-0.5 bg-muted/60 rounded-xl border border-border text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setViewGranularity("calls")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  viewGranularity === "calls"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Calls Only ({config.totalCalls})
              </button>
              <button
                type="button"
                onClick={() => setViewGranularity("detailed")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  viewGranularity === "detailed"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Full Granular Trace
              </button>
            </div>

            {/* Speed Selector */}
            <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-xl border border-border">
              {[0.5, 1, 2, 4].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-md transition-all ${
                    playbackSpeed === speed
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>
              Step <strong className="text-foreground font-bold">{currentStepIndex + 1}</strong> of{" "}
              {steps.length}
            </span>
            <span className="font-bold text-amber-500">
              Call #{currentStep.callNumber} / {config.totalCalls}
            </span>
          </div>
          <Slider
            value={[currentStepIndex]}
            max={steps.length - 1}
            step={1}
            onValueChange={(val) => {
              setIsPlaying(false);
              setCurrentStepIndex(val[0]);
            }}
            className="cursor-pointer"
          />
        </div>
      </Card>

      {/* ========================================== */}
      {/* 4. MAIN INTERACTIVE CHESSBOARD & SIDE PANEL */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / CENTER: CHESSBOARD CANVAS (7 COLS) */}
        <Card className="lg:col-span-7 p-6 bg-card border-border/80 rounded-2xl flex flex-col items-center justify-center min-h-[460px] shadow-xs relative overflow-hidden">
          {/* Solution celebratory glow */}
          {currentStep.actionType === "solution" && (
            <div className="absolute inset-0 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-2xl pointer-events-none animate-pulse" />
          )}

          {/* Board Header Status */}
          <div className="w-full flex items-center justify-between mb-4 px-2">
            <span className="text-xs font-mono text-muted-foreground font-bold uppercase tracking-wider">
              {boardSize}×{boardSize} Chessboard Grid
            </span>

            {currentStep.actionType === "solution" ? (
              <Badge className="bg-emerald-500 text-white font-mono font-bold animate-bounce gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                Solution #{currentStep.solutionNumber} Discovered!
              </Badge>
            ) : currentStep.conflictCell ? (
              <Badge variant="destructive" className="font-mono font-bold text-[10px] animate-pulse">
                Collision: Row {currentStep.conflictCell.r}, Col {currentStep.conflictCell.c}
              </Badge>
            ) : (
              <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
                Row {currentStep.row} active
              </Badge>
            )}
          </div>

          {/* Board Outer Frame */}
          <div className="relative p-2.5 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900/90 border-4 border-amber-900/50 shadow-2xl">
            {/* Chessboard Grid */}
            <div
              className="grid gap-0 rounded-xl overflow-hidden border border-amber-900/60"
              style={{
                gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`
              }}
            >
              {currentStep.board.map((row, r) =>
                row.map((cell, c) => {
                  const isBlack = (r + c) % 2 === 1;
                  const hasQueen = cell === 1 || cell === 2;
                  const isSolutionQueen = cell === 2;
                  const isConflictCell = cell === -1 || (currentStep.conflictCell?.r === r && currentStep.conflictCell?.c === c);
                  const isAttackLine = currentStep.conflictLines?.some((p) => p.r === r && p.c === c);
                  const isCurrentRow = currentStep.row === r;

                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`${cellSizeClass} flex flex-col items-center justify-center transition-all relative select-none border border-slate-700/20 ${
                        isSolutionQueen
                          ? "bg-emerald-500/30 border-2 border-emerald-400 shadow-inner"
                          : hasQueen
                          ? "bg-amber-500/25 border-2 border-amber-400 shadow-inner"
                          : isConflictCell
                          ? "bg-rose-600/40 border-2 border-rose-500 animate-pulse"
                          : isAttackLine
                          ? "bg-rose-500/15"
                          : isCurrentRow
                          ? isBlack
                            ? "bg-primary/20 border-b border-primary/40"
                            : "bg-primary/10 border-b border-primary/40"
                          : isBlack
                          ? "bg-slate-800/80"
                          : "bg-slate-700/30"
                      }`}
                    >
                      {/* Cell Coordinate Label */}
                      <span className="absolute top-1 left-1.5 text-[8px] font-mono text-slate-400 opacity-60">
                        {String.fromCharCode(65 + c)}
                        {boardSize - r}
                      </span>

                      {/* Placed Queen Icon */}
                      {hasQueen && (
                        <div className="flex flex-col items-center animate-in zoom-in-75 duration-200">
                          <Crown
                            className={`h-7 w-7 sm:h-9 sm:w-9 ${
                              isSolutionQueen
                                ? "text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                                : "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]"
                            }`}
                          />
                          <span
                            className={`text-[9px] font-mono font-black ${
                              isSolutionQueen ? "text-emerald-200" : "text-amber-300"
                            }`}
                          >
                            Q{r}
                          </span>
                        </div>
                      )}

                      {/* Conflict Collision Icon */}
                      {isConflictCell && !hasQueen && (
                        <div className="flex flex-col items-center animate-in zoom-in-50 duration-150">
                          <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.7)]" />
                          <span className="text-[8px] font-bold font-mono text-rose-300">CLASH</span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Coordinate Guide Legend */}
          <div className="flex items-center gap-4 mt-4 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-amber-500 border border-amber-400" />
              <span>Placed Queen</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-emerald-500 border border-emerald-400" />
              <span>Solution Queen</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-rose-500/40 border border-rose-500" />
              <span>Collision</span>
            </div>
          </div>
        </Card>

        {/* RIGHT: CALL STACK & STEP EXPLANATION (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Current Step Explanation Card */}
          <Card className="p-5 bg-card border-border/80 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Algorithmic Step Trace
              </span>
              <Badge
                variant={
                  currentStep.actionType === "solution"
                    ? "default"
                    : currentStep.actionType === "conflict" || currentStep.actionType === "backtrack"
                    ? "destructive"
                    : "outline"
                }
                className="text-[10px] font-mono uppercase font-bold"
              >
                {currentStep.actionType}
              </Badge>
            </div>

            <h3 className="text-base font-bold font-heading text-foreground">
              {currentStep.title}
            </h3>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {currentStep.description}
            </p>

            {currentStep.conflictReason && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs font-mono text-rose-400 flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{currentStep.conflictReason}</span>
              </div>
            )}

            {currentStep.whyPruned && (
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] font-mono text-amber-500">
                ⚡ {currentStep.whyPruned}
              </div>
            )}
          </Card>

          {/* Call Stack Visualizer */}
          <Card className="p-5 bg-card border-border/80 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-muted-foreground">
                <Layers className="h-4 w-4 text-primary" />
                <span>Call Stack Frame Trace</span>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">
                Depth: {currentStep.callStack.length} / {boardSize}
              </span>
            </div>

            <div className="space-y-1.5">
              {currentStep.callStack.length === 0 ? (
                <div className="p-3 bg-muted/30 rounded-xl text-center text-xs font-mono text-muted-foreground">
                  Stack Empty: solve(row = 0)
                </div>
              ) : (
                currentStep.callStack
                  .slice()
                  .reverse()
                  .map((frame, fIdx) => (
                    <div
                      key={fIdx}
                      className={`p-2 rounded-xl text-xs font-mono flex items-center justify-between border ${
                        fIdx === 0
                          ? "bg-primary/10 border-primary/40 text-primary font-bold shadow-xs"
                          : "bg-muted/40 border-border/60 text-muted-foreground"
                      }`}
                    >
                      <span>solve(row = {frame.row})</span>
                      <span className="text-[10px] opacity-80">Placed at Col {frame.col}</span>
                    </div>
                  ))
              )}
            </div>
          </Card>

          {/* Solutions Found Shelf */}
          <Card className="p-5 bg-card border-border/80 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Discovered Solutions Gallery ({solutionsFoundSoFar.length}/{config.totalSolutions})
              </span>
            </div>

            {solutionsFoundSoFar.length === 0 ? (
              <p className="text-xs font-mono text-muted-foreground p-3 bg-muted/20 rounded-xl text-center">
                No solutions reached yet. Press Play to auto-traverse the tree!
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
                {solutionsFoundSoFar.map((sol) => (
                  <button
                    key={sol.number}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStepIndex(sol.stepIndex);
                    }}
                    className={`p-2.5 rounded-xl border text-left font-mono transition-all flex flex-col justify-between ${
                      currentStep.solutionNumber === sol.number
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-xs"
                        : "bg-muted/30 border-border hover:border-primary/50 text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>Solution #{sol.number}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1">
                      [{sol.queens.join(", ")}]
                    </span>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* ========================================== */}
      {/* 5. ANATOMY OF CALLS TABLE & LEVEL BREAKDOWN */}
      {/* ========================================== */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ListOrdered className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold font-heading text-foreground">
              Anatomy of the Recursive Calls ({boardSize}×{boardSize})
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            In standard N-Queens backtracking, a recursive call is only executed when a grid position is structurally safe from existing queens. Summing these levels yields the exact {config.totalCalls} recursive calls.
          </p>
        </div>

        {/* Master Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-xs font-mono text-left">
            <thead className="bg-muted/60 text-muted-foreground font-bold uppercase border-b border-border">
              <tr>
                <th className="p-3">Board Size (N x N)</th>
                <th className="p-3">Total Solutions</th>
                <th className="p-3">States Explored (Recursive Calls)</th>
                <th className="p-3">Unoptimized Space (N!)</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {([4, 5, 6] as BoardSize[]).map((sz) => {
                const isSelected = sz === boardSize;
                const c = BOARD_CONFIGS[sz];
                return (
                  <tr
                    key={sz}
                    onClick={() => setBoardSize(sz)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "bg-primary/10 font-bold text-foreground" : "hover:bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    <td className="p-3 font-bold flex items-center gap-1.5">
                      {sz} x {sz}
                      {isSelected && <Badge className="text-[9px] h-4 px-1.5 bg-primary">Active</Badge>}
                    </td>
                    <td className="p-3 text-emerald-400 font-bold">{c.totalSolutions}</td>
                    <td className="p-3 text-amber-500 font-bold">{c.totalCalls}</td>
                    <td className="p-3 text-rose-400">{c.unoptimizedPermutations}</td>
                    <td className="p-3">
                      {isSelected ? "Visualizing" : "Click to view"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Level-by-Level Tree Anatomy */}
        <div className="space-y-3">
          <span className="text-xs font-mono text-muted-foreground uppercase font-bold tracking-wider block">
            State Space Tree Levels ({boardSize}×{boardSize} — Total {config.totalCalls} Calls)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {config.levelBreakdown.map((lvl) => {
              const isCurrentLevel = currentStep.row === lvl.level;
              return (
                <div
                  key={lvl.level}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isCurrentLevel
                      ? "bg-amber-500/15 border-amber-500/50 shadow-xs scale-[1.02]"
                      : "bg-muted/20 border-border/70 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className={isCurrentLevel ? "text-amber-400" : "text-foreground"}>
                      {lvl.label}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-mono font-bold ${
                        isCurrentLevel ? "bg-amber-500 text-slate-900 border-amber-500" : ""
                      }`}
                    >
                      {lvl.count} {lvl.count === 1 ? "state" : "states"}
                    </Badge>
                  </div>
                  <span className="text-[11px] text-muted-foreground mt-1.5 block leading-relaxed">
                    {lvl.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pedagogical Explanation Note */}
        <div className="p-4 bg-muted/30 border border-border/80 rounded-xl space-y-2 text-xs leading-relaxed text-muted-foreground">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Info className="h-4 w-4 text-primary" />
            <span>Why Backtracking Circumvents O(N!) Permutations</span>
          </div>
          <p>
            While the unoptimized permutation space calculates all N! possibilities ({config.unoptimizedPermutations} candidate rows), the backtracking algorithm circumvents calculating dead ends. By checking <code>isSafe(row, col)</code> before making each recursive call, it prunes whole subtrees the instant a diagonal or column collision occurs.
          </p>
        </div>
      </Card>
    </div>
  );
}
