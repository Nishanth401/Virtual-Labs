"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
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
  Crown,
  Layers,
  ArrowRight,
  Sparkles,
  Compass,
  GitFork
} from "lucide-react";

export type RecBacktrackMode = "factorial" | "nqueens" | "hanoi" | "subsets" | "maze";

interface RecStep {
  callStack?: { func: string; param: number; ret?: number; status: "active" | "returning" | "waiting" }[];
  hanoiPegs?: { A: number[]; B: number[]; C: number[] };
  hanoiMove?: { disk: number; from: string; to: string };
  queensBoard?: number[][]; // 4x4 board: 1 = queen, 0 = empty, -1 = conflict, 2 = testing
  conflictCell?: { r: number; c: number } | null;
  conflictLines?: { r: number; c: number }[];
  subsetState?: { current: number[]; index: number; action: "include" | "exclude" | "base"; pool: number[] };
  mazeGrid?: { r: number; c: number; state: "path" | "deadend" | "current" | "wall" | "target" }[][];
  actionType?: "call" | "place" | "conflict" | "backtrack" | "success" | "move";
  message: string;
  what: string;
  why: string;
  next: string;
}

export function RecursionBacktrackingVisualizer({ defaultMode = "nqueens" }: { defaultMode?: RecBacktrackMode }) {
  const [mode, setMode] = useState<RecBacktrackMode>(defaultMode);
  const [hanoiDisksCount, setHanoiDisksCount] = useState<number>(3);
  const [steps, setSteps] = useState<RecStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(750);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate Steps for selected subtopic
  const generateSteps = (selectedMode: RecBacktrackMode, disksCount = 3) => {
    const list: RecStep[] = [];

    // ========================================================
    // 1. FACTORIAL CALL STACK
    // ========================================================
    if (selectedMode === "factorial") {
      list.push({
        actionType: "call",
        callStack: [{ func: "factorial", param: 4, status: "active" }],
        message: "Invoke factorial(4). Pushed stack frame for n = 4.",
        what: "Calling factorial(4). Check base condition (n <= 1).",
        why: "4 > 1, so formula mandates computing 4 * factorial(3).",
        next: "Push new stack frame for factorial(3)."
      });
      list.push({
        actionType: "call",
        callStack: [
          { func: "factorial", param: 3, status: "active" },
          { func: "factorial", param: 4, status: "waiting" }
        ],
        message: "Invoke factorial(3). Call stack depth = 2.",
        what: "Calling factorial(3). Check base condition (n <= 1).",
        why: "3 > 1, requires computing 3 * factorial(2). Frame 4 remains blocked.",
        next: "Push new stack frame for factorial(2)."
      });
      list.push({
        actionType: "call",
        callStack: [
          { func: "factorial", param: 2, status: "active" },
          { func: "factorial", param: 3, status: "waiting" },
          { func: "factorial", param: 4, status: "waiting" }
        ],
        message: "Invoke factorial(2). Call stack depth = 3.",
        what: "Calling factorial(2). Check base condition (n <= 1).",
        why: "2 > 1, requires computing 2 * factorial(1).",
        next: "Push new stack frame for factorial(1)."
      });
      list.push({
        actionType: "success",
        callStack: [
          { func: "factorial", param: 1, ret: 1, status: "returning" },
          { func: "factorial", param: 2, status: "waiting" },
          { func: "factorial", param: 3, status: "waiting" },
          { func: "factorial", param: 4, status: "waiting" }
        ],
        message: "Base Case Reached: factorial(1) returns 1! Call stack begins unwinding.",
        what: "n = 1 satisfies base condition: if (n <= 1) return 1.",
        why: "Base case stops recursion and initiates return propagation upward.",
        next: "Pop frame 1 and multiply result with waiting frame factorial(2)."
      });
      list.push({
        actionType: "backtrack",
        callStack: [
          { func: "factorial", param: 2, ret: 2, status: "returning" },
          { func: "factorial", param: 3, status: "waiting" },
          { func: "factorial", param: 4, status: "waiting" }
        ],
        message: "Unwind Frame 2: factorial(2) = 2 * 1 = 2.",
        what: "Multiplying parameter 2 * child return value 1 = 2.",
        why: "Resolves computation for stack frame factorial(2).",
        next: "Pop frame 2 and pass 2 to factorial(3)."
      });
      list.push({
        actionType: "backtrack",
        callStack: [
          { func: "factorial", param: 3, ret: 6, status: "returning" },
          { func: "factorial", param: 4, status: "waiting" }
        ],
        message: "Unwind Frame 3: factorial(3) = 3 * 2 = 6.",
        what: "Multiplying parameter 3 * child return value 2 = 6.",
        why: "Resolves computation for stack frame factorial(3).",
        next: "Pop frame 3 and pass 6 to root frame factorial(4)."
      });
      list.push({
        actionType: "success",
        callStack: [
          { func: "factorial", param: 4, ret: 24, status: "returning" }
        ],
        message: "Final Result: factorial(4) = 4 * 6 = 24! Stack completely unwound.",
        what: "Root call computation completed: return value is 24.",
        why: "All child recursive frames successfully returned and multiplied.",
        next: "Execution finished."
      });
    } 
    // ========================================================
    // 2. N-QUEENS BACKTRACKING (FULL STEP-BY-STEP TRACE)
    // ========================================================
    else if (selectedMode === "nqueens") {
      const N = 4;
      const board: number[][] = Array.from({ length: N }, () => Array(N).fill(0));
      const queens: number[] = Array(N).fill(-1); // row -> col

      const cloneBoard = () => board.map(r => [...r]);

      list.push({
        queensBoard: cloneBoard(),
        actionType: "call",
        message: "Initialize empty 4x4 chessboard. Begin Row 0.",
        what: "Starting N-Queens Backtracking search. Target: 4 mutually non-attacking queens.",
        why: "Backtracking builds candidates row by row, pruning any cell that shares col or diagonal.",
        next: "Test Col 0 in Row 0."
      });

      const isSafe = (row: number, col: number) => {
        for (let r = 0; r < row; r++) {
          const c = queens[r];
          if (c === col) return { safe: false, reason: `Column ${col} attacked by Queen at (${r}, ${col})` };
          if (Math.abs(r - row) === Math.abs(c - col)) {
            return { safe: false, reason: `Diagonal attacked by Queen at (${r}, ${c})` };
          }
        }
        return { safe: true, reason: "" };
      };

      // Helper to generate conflict attack lines
      const getConflictLines = (attackingRow: number, attackingCol: number, targetRow: number, targetCol: number) => {
        const lines: { r: number; c: number }[] = [];
        // Col
        for (let r = 0; r < N; r++) lines.push({ r, c: attackingCol });
        // Diagonals
        for (let r = 0; r < N; r++) {
          const diff = r - attackingRow;
          if (attackingCol + diff >= 0 && attackingCol + diff < N) lines.push({ r, c: attackingCol + diff });
          if (attackingCol - diff >= 0 && attackingCol - diff < N) lines.push({ r, c: attackingCol - diff });
        }
        return lines;
      };

      // Step-by-step interactive backtrack solver (record key pedagogical events)
      const solve = (row: number): boolean => {
        if (row === N) {
          list.push({
            queensBoard: cloneBoard(),
            actionType: "success",
            message: "🎉 Valid Solution Discovered! 4 Queens placed safely without mutual attack!",
            what: `All 4 queens placed safely: rows 0-3 at columns [${queens.join(", ")}].`,
            why: "No row, column, or diagonal conflict exists between any pair of queens.",
            next: "Verification complete."
          });
          return true;
        }

        for (let col = 0; col < N; col++) {
          const check = isSafe(row, col);

          // Show testing candidate
          board[row][col] = check.safe ? 1 : -1;
          const attackingRow = queens.findIndex((c, r) => r < row && (c === col || Math.abs(r - row) === Math.abs(c - col)));
          const conflictLines = attackingRow !== -1 ? getConflictLines(attackingRow, queens[attackingRow], row, col) : [];

          if (check.safe) {
            queens[row] = col;
            board[row][col] = 1;
            list.push({
              queensBoard: cloneBoard(),
              conflictCell: null,
              conflictLines: [],
              actionType: "place",
              message: `Row ${row}: Placed Queen safely at (${row}, ${col}). Advance to Row ${row + 1}.`,
              what: `Queen successfully positioned at Row ${row}, Column ${col}.`,
              why: "No column or diagonal collisions with any existing queens on previous rows.",
              next: row + 1 < N ? `Explore placements for Row ${row + 1}.` : "Verify solution."
            });

            if (solve(row + 1)) return true;

            // Backtracking unwind
            board[row][col] = 0;
            queens[row] = -1;
            list.push({
              queensBoard: cloneBoard(),
              actionType: "backtrack",
              message: `Backtracking triggered from Row ${row + 1}! Remove Queen at (${row}, ${col}).`,
              what: `Dead-end encountered in child rows. Reverting queen from square (${row}, ${col}).`,
              why: "No valid placement existed in subsequent rows, mandating exploration of alternate column.",
              next: col + 1 < N ? `Test next candidate (${row}, ${col + 1}).` : `Backtrack further to Row ${row - 1}.`
            });
          } else {
            list.push({
              queensBoard: cloneBoard(),
              conflictCell: { r: row, c: col },
              conflictLines,
              actionType: "conflict",
              message: `Row ${row}, Col ${col}: Conflict! ${check.reason}. Square REJECTED.`,
              what: `Candidate square (${row}, ${col}) is threatened by an existing queen.`,
              why: check.reason,
              next: col + 1 < N ? `Shift candidate pointer to Col ${col + 1}.` : `No valid square left in Row ${row}. Backtrack!`
            });
            board[row][col] = 0; // reset tested cell
          }
        }
        return false;
      };

      solve(0);
    } 
    // ========================================================
    // 3. TOWER OF HANOI (COMPLETE 2^N - 1 MOVES WITH NO SKIPS)
    // ========================================================
    else if (selectedMode === "hanoi") {
      const n = disksCount;
      const initialDisks = Array.from({ length: n }, (_, i) => n - i); // e.g. [3, 2, 1] (3 bottom, 1 top)
      const pegs: { A: number[]; B: number[]; C: number[] } = {
        A: [...initialDisks],
        B: [],
        C: []
      };

      const clonePegs = () => ({
        A: [...pegs.A],
        B: [...pegs.B],
        C: [...pegs.C]
      });

      list.push({
        hanoiPegs: clonePegs(),
        actionType: "call",
        message: `Tower of Hanoi: ${n} Disks on Peg A. Target: Move all to Peg C in minimum 2ⁿ - 1 = ${Math.pow(2, n) - 1} moves.`,
        what: `Initial state with disks [${initialDisks.join(", ")}] stacked on Source Peg A (largest Disk ${n} at bottom).`,
        why: "Rules: 1) Move one disk at a time. 2) A larger disk can NEVER rest atop a smaller disk.",
        next: "Begin recursive decomposition: solve(n-1, Source -> Aux)."
      });

      // Recursive Hanoi step generator
      const hanoiSolve = (disks: number, from: "A" | "B" | "C", to: "A" | "B" | "C", aux: "A" | "B" | "C") => {
        if (disks === 1) {
          const movingDisk = pegs[from].pop()!;
          pegs[to].push(movingDisk);
          list.push({
            hanoiPegs: clonePegs(),
            hanoiMove: { disk: movingDisk, from, to },
            actionType: "move",
            message: `Move Disk ${movingDisk}: Peg ${from} ──> Peg ${to}.`,
            what: `Transferred top Disk ${movingDisk} from Peg ${from} to Peg ${to}.`,
            why: `Valid move: Peg ${to} was either empty or had a larger disk base.`,
            next: "Continue recursive plan."
          });
          return;
        }

        // 1. Move top n-1 disks from Source to Aux using Dest
        hanoiSolve(disks - 1, from, aux, to);

        // 2. Move bottom-most disk from Source to Dest
        const movingDisk = pegs[from].pop()!;
        pegs[to].push(movingDisk);
        list.push({
          hanoiPegs: clonePegs(),
          hanoiMove: { disk: movingDisk, from, to },
          actionType: "move",
          message: `Move Largest Disk ${movingDisk}: Peg ${from} ──> Peg ${to}! (Key Subproblem)`,
          what: `Base disk ${movingDisk} safely moved to destination Peg ${to}.`,
          why: `Clearing the top ${disks - 1} disks to Peg ${aux} allowed unblocking disk ${movingDisk}.`,
          next: `Now transfer the ${disks - 1} auxiliary disks from Peg ${aux} to Peg ${to}.`
        });

        // 3. Move n-1 disks from Aux to Dest using Source
        hanoiSolve(disks - 1, aux, to, from);
      };

      hanoiSolve(n, "A", "C", "B");

      list.push({
        hanoiPegs: clonePegs(),
        actionType: "success",
        message: `🎉 Tower of Hanoi Solved! All ${n} disks placed on Peg C in exactly 2ⁿ - 1 = ${Math.pow(2, n) - 1} moves!`,
        what: `Target Peg C contains all disks correctly ordered: [${initialDisks.join(", ")}].`,
        why: "Mathematical induction guarantees that 2ⁿ - 1 moves is strictly optimal and minimal.",
        next: "Problem completed."
      });
    }
    // ========================================================
    // 4. SUBSETS & COMBINATIONS (INCLUDE / EXCLUDE TREE)
    // ========================================================
    else if (selectedMode === "subsets") {
      const nums = [1, 2, 3];
      const traceSubsets = (idx: number, current: number[]) => {
        if (idx === nums.length) {
          list.push({
            subsetState: { current: [...current], index: idx, action: "base", pool: nums },
            actionType: "success",
            message: `Subset Output Generated: [${current.join(", ")}]`,
            what: `Leaf reached in decision tree at depth ${idx}. Subset [${current.join(", ")}] recorded.`,
            why: "All elements have had their include/exclude decision evaluated.",
            next: "Backtrack and explore other decision branch."
          });
          return;
        }

        // 1. Include nums[idx]
        list.push({
          subsetState: { current: [...current, nums[idx]], index: idx, action: "include", pool: nums },
          actionType: "place",
          message: `Decision at Element ${nums[idx]}: INCLUDE into subset [${[...current, nums[idx]].join(", ")}].`,
          what: `Adding ${nums[idx]} to the active combination candidate.`,
          why: "First branch of the binary combinatorial tree explores the presence of element.",
          next: `Recur for index ${idx + 1}.`
        });
        traceSubsets(idx + 1, [...current, nums[idx]]);

        // 2. Exclude nums[idx] (Backtrack)
        list.push({
          subsetState: { current: [...current], index: idx, action: "exclude", pool: nums },
          actionType: "backtrack",
          message: `Backtrack & Decision at Element ${nums[idx]}: EXCLUDE ${nums[idx]} (current: [${current.join(", ")}]).`,
          what: `Removed ${nums[idx]} from subset. Now exploring branch where ${nums[idx]} is absent.`,
          why: "Second branch ensures all 2ⁿ possible subsets are systematically generated.",
          next: `Recur for index ${idx + 1}.`
        });
        traceSubsets(idx + 1, [...current]);
      };

      list.push({
        subsetState: { current: [], index: 0, action: "base", pool: nums },
        actionType: "call",
        message: "Start generating Subsets (Power Set) for [1, 2, 3] via Binary Decision Tree.",
        what: "Every element has 2 choices: Include or Exclude. Total subsets = 2³ = 8.",
        why: "Divide-and-conquer combinatorial generation.",
        next: "Evaluate element 1."
      });

      traceSubsets(0, []);
    }
    // ========================================================
    // 5. MAZE BACKTRACKING (RAT IN A MAZE 4x4)
    // ========================================================
    else {
      const mazeLayout = [
        [1, 0, 0, 0],
        [1, 1, 0, 1],
        [0, 1, 0, 0],
        [1, 1, 1, 1]
      ];

      const getMazeGrid = (currentR: number, currentC: number, path: { r: number; c: number }[], deadEnds: { r: number; c: number }[]) => {
        return mazeLayout.map((row, r) =>
          row.map((val, c) => {
            if (val === 0) return { r, c, state: "wall" as const };
            if (r === 3 && c === 3) return { r, c, state: "target" as const };
            if (r === currentR && c === currentC) return { r, c, state: "current" as const };
            if (deadEnds.some(p => p.r === r && p.c === c)) return { r, c, state: "deadend" as const };
            if (path.some(p => p.r === r && p.c === c)) return { r, c, state: "path" as const };
            return { r, c, state: "path" as const };
          })
        );
      };

      list.push({
        mazeGrid: getMazeGrid(0, 0, [{ r: 0, c: 0 }], []),
        actionType: "call",
        message: "Rat in a Maze: Start at (0, 0). Destination is (3, 3). Walls are blocked.",
        what: "Initial position (0, 0). Exploring path using Down and Right recursive moves.",
        why: "Depth-first search with backtracking unwinds when hitting dead-ends or walls.",
        next: "Try moving Down to (1, 0)."
      });

      list.push({
        mazeGrid: getMazeGrid(1, 0, [{ r: 0, c: 0 }, { r: 1, c: 0 }], []),
        actionType: "place",
        message: "Move DOWN to (1, 0): Valid open cell! Continue search.",
        what: "Position (1, 0) is open and unvisited.",
        why: "Forward search progression.",
        next: "Try moving DOWN to (2, 0)."
      });

      list.push({
        mazeGrid: getMazeGrid(2, 0, [{ r: 0, c: 0 }, { r: 1, c: 0 }], [{ r: 2, c: 0 }]),
        actionType: "conflict",
        message: "Try DOWN to (2, 0): BLOCKED by wall! BACKTRACK.",
        what: "Square (2, 0) contains a wall (value 0). Cannot traverse.",
        why: "Constraint check failed.",
        next: "Backtrack to (1, 0) and try moving RIGHT to (1, 1)."
      });

      list.push({
        mazeGrid: getMazeGrid(1, 1, [{ r: 0, c: 0 }, { r: 1, c: 0 }, { r: 1, c: 1 }], [{ r: 2, c: 0 }]),
        actionType: "place",
        message: "Move RIGHT to (1, 1): Valid path! Continue exploring.",
        what: "Cell (1, 1) is open. Path extended.",
        why: "Successful alternative branch.",
        next: "Try moving DOWN to (2, 1)."
      });

      list.push({
        mazeGrid: getMazeGrid(2, 1, [{ r: 0, c: 0 }, { r: 1, c: 0 }, { r: 1, c: 1 }, { r: 2, c: 1 }], [{ r: 2, c: 0 }]),
        actionType: "place",
        message: "Move DOWN to (2, 1): Open cell! Keep moving.",
        what: "Cell (2, 1) safe.",
        why: "Advancing toward destination (3, 3).",
        next: "Try moving DOWN to (3, 1)."
      });

      list.push({
        mazeGrid: getMazeGrid(3, 1, [{ r: 0, c: 0 }, { r: 1, c: 0 }, { r: 1, c: 1 }, { r: 2, c: 1 }, { r: 3, c: 1 }], [{ r: 2, c: 0 }]),
        actionType: "place",
        message: "Move DOWN to (3, 1): Open cell! Reached bottom row.",
        what: "Cell (3, 1) safe.",
        why: "Only 2 steps away from destination.",
        next: "Move RIGHT to (3, 2)."
      });

      list.push({
        mazeGrid: getMazeGrid(3, 2, [{ r: 0, c: 0 }, { r: 1, c: 0 }, { r: 1, c: 1 }, { r: 2, c: 1 }, { r: 3, c: 1 }, { r: 3, c: 2 }], [{ r: 2, c: 0 }]),
        actionType: "place",
        message: "Move RIGHT to (3, 2): Valid cell! Almost there.",
        what: "Cell (3, 2) open.",
        why: "Contiguous path towards goal.",
        next: "Move RIGHT to (3, 3) Destination!"
      });

      list.push({
        mazeGrid: getMazeGrid(3, 3, [{ r: 0, c: 0 }, { r: 1, c: 0 }, { r: 1, c: 1 }, { r: 2, c: 1 }, { r: 3, c: 1 }, { r: 3, c: 2 }, { r: 3, c: 3 }], [{ r: 2, c: 0 }]),
        actionType: "success",
        message: "🎉 Target (3, 3) Reached! Optimal maze escape path discovered!",
        what: "Path: (0,0) -> (1,0) -> (1,1) -> (2,1) -> (3,1) -> (3,2) -> (3,3).",
        why: "DFS backtracking found valid unobstructed route from start to finish.",
        next: "Maze solved."
      });
    }

    setSteps(list);
    setCurrentStepIdx(0);
  };

  useEffect(() => {
    generateSteps(mode, hanoiDisksCount);
  }, [mode, hanoiDisksCount]);

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

  const getActionBadge = () => {
    switch (currentStep.actionType) {
      case "conflict":
        return <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/30 gap-1"><XCircle className="h-3 w-3" /> Conflict Detected</Badge>;
      case "backtrack":
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30 gap-1"><RotateCcw className="h-3 w-3" /> Backtracking</Badge>;
      case "place":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30 gap-1"><Sparkles className="h-3 w-3" /> Valid Move</Badge>;
      case "success":
        return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 gap-1"><CheckCircle2 className="h-3 w-3" /> Solved</Badge>;
      case "move":
        return <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 border-indigo-500/30 gap-1"><ArrowRight className="h-3 w-3" /> Disk Move</Badge>;
      default:
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">Step {currentStepIdx + 1}</Badge>;
    }
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

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
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

          <Button
            variant={mode === "subsets" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setMode("subsets");
              setIsPlaying(false);
            }}
            className="h-7 text-xs font-semibold"
          >
            Subsets (Include/Exclude)
          </Button>

          <Button
            variant={mode === "maze" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setMode("maze");
              setIsPlaying(false);
            }}
            className="h-7 text-xs font-semibold"
          >
            Rat in Maze Grid
          </Button>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card/90 p-4 rounded-2xl border border-border shadow-xs">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-8 gap-1.5 text-xs font-bold bg-primary text-primary-foreground"
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
            title="Step Back"
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
            title="Step Forward"
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
            title="Reset"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>

          {mode === "hanoi" && (
            <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-border/80">
              <span className="text-[11px] font-mono text-muted-foreground">Disks:</span>
              <Button
                variant={hanoiDisksCount === 3 ? "secondary" : "outline"}
                size="sm"
                onClick={() => {
                  setHanoiDisksCount(3);
                  setIsPlaying(false);
                }}
                className="h-7 text-xs px-2"
              >
                3 Disks (7 moves)
              </Button>
              <Button
                variant={hanoiDisksCount === 4 ? "secondary" : "outline"}
                size="sm"
                onClick={() => {
                  setHanoiDisksCount(4);
                  setIsPlaying(false);
                }}
                className="h-7 text-xs px-2"
              >
                4 Disks (15 moves)
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          {getActionBadge()}
          <span>Step: <strong>{currentStepIdx + 1}/{steps.length}</strong></span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            {mode === "factorial" ? "O(n) Stack" : mode === "nqueens" ? "O(n!) Backtracking" : mode === "hanoi" ? `O(2ⁿ) Moves (${Math.pow(2, hanoiDisksCount) - 1})` : mode === "subsets" ? "O(2ⁿ) Combinatorial" : "O(4ⁿ) Grid Backtrack"}
          </Badge>
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <Card className="border-border bg-card/80 p-6 flex flex-col items-center min-h-[380px] justify-center">
        {/* VIEW 1: FACTORIAL CALL STACK */}
        {mode === "factorial" && currentStep.callStack && (
          <div className="w-full max-w-md space-y-3 py-4">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center">
              JVM Call Stack Frame Hierarchy (LIFO)
            </span>
            <div className="flex flex-col space-y-2 border-b-4 border-x-4 border-primary/40 rounded-b-2xl p-4 bg-muted/20 min-h-[240px] justify-end">
              {currentStep.callStack.map((frame, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between font-mono text-xs transition-all ${
                    frame.status === "returning"
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold"
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

        {/* VIEW 2: N-QUEENS CHESSBOARD WITH ATTACK RAY TRACING */}
        {mode === "nqueens" && currentStep.queensBoard && (
          <div className="flex flex-col items-center space-y-4 py-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                4×4 Chessboard State Space Tree
              </span>
              {currentStep.conflictCell && (
                <Badge variant="destructive" className="text-[10px] animate-pulse">
                  Attacked Square: Row {currentStep.conflictCell.r}, Col {currentStep.conflictCell.c}
                </Badge>
              )}
            </div>

            <div className="relative border-4 border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
              <div className="grid grid-cols-4">
                {currentStep.queensBoard.map((row, r) =>
                  row.map((cell, c) => {
                    const isBlack = (r + c) % 2 === 1;
                    const hasQueen = cell === 1;
                    const isConflict = cell === -1;
                    const isAttackedLine = currentStep.conflictLines?.some(p => p.r === r && p.c === c);

                    return (
                      <div
                        key={`${r}-${c}`}
                        className={`h-16 w-16 sm:h-20 sm:w-20 flex flex-col items-center justify-center transition-all relative border border-slate-700/40 ${
                          hasQueen
                            ? "bg-amber-500/25 border-2 border-amber-400 shadow-inner"
                            : isConflict
                            ? "bg-rose-600/40 border-2 border-rose-500 animate-pulse"
                            : isAttackedLine
                            ? "bg-rose-500/15"
                            : isBlack
                            ? "bg-slate-800/80"
                            : "bg-slate-700/40"
                        }`}
                      >
                        {/* Cell Coordinate Label */}
                        <span className="absolute top-1 left-1.5 text-[9px] font-mono text-slate-400 select-none">
                          {String.fromCharCode(65 + c)}{4 - r}
                        </span>

                        {/* Queen Icon */}
                        {hasQueen && (
                          <div className="flex flex-col items-center animate-in zoom-in-75 duration-200">
                            <Crown className="h-8 w-8 sm:h-10 sm:w-10 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                            <span className="text-[10px] font-bold font-mono text-amber-300">Q{r}</span>
                          </div>
                        )}

                        {/* Conflict Icon */}
                        {isConflict && (
                          <div className="flex flex-col items-center animate-in zoom-in-50 duration-150">
                            <XCircle className="h-8 w-8 sm:h-9 sm:w-9 text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                            <span className="text-[9px] font-bold font-mono text-rose-300">COLLISION</span>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: TOWER OF HANOI (PROPER DISK STACKING & BASE PEDESTAL) */}
        {mode === "hanoi" && currentStep.hanoiPegs && (
          <div className="w-full max-w-2xl space-y-4 py-4">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center">
              Peg A (Source) ── Peg B (Auxiliary) ── Peg C (Destination)
            </span>
            <div className="grid grid-cols-3 gap-6 p-6 bg-muted/20 rounded-2xl border border-border min-h-[220px] items-end">
              {(["A", "B", "C"] as const).map((pegKey) => {
                const disks = currentStep.hanoiPegs![pegKey];
                return (
                  <div key={pegKey} className="flex flex-col items-center relative h-full justify-end">
                    {/* Vertical Peg Rod */}
                    <div className="w-2.5 h-40 bg-slate-400/50 dark:bg-slate-600 rounded-t-full absolute bottom-3 z-0" />

                    {/* Disk Stack: Renders from BOTTOM to TOP using flex-col-reverse */}
                    <div className="flex flex-col-reverse items-center space-y-reverse space-y-1.5 z-10 w-full mb-3">
                      {disks.map((dSize) => {
                        const totalDisks = hanoiDisksCount;
                        const widthPct = 25 + (dSize / totalDisks) * 65; // disk 1 smallest, disk N widest
                        return (
                          <div
                            key={dSize}
                            style={{ width: `${widthPct}%` }}
                            className={`h-7 rounded-lg text-center text-xs font-bold font-mono text-white flex items-center justify-center shadow-lg transition-all duration-300 ${
                              dSize === 1
                                ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                                : dSize === 2
                                ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                                : dSize === 3
                                ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                                : "bg-gradient-to-r from-purple-600 to-pink-600"
                            }`}
                          >
                            Disk {dSize}
                          </div>
                        );
                      })}
                    </div>

                    {/* Sturdy Peg Base Plate */}
                    <div className="w-full h-3 bg-slate-300 dark:bg-slate-700 rounded-full z-10 shadow-xs" />

                    <span className="text-xs font-mono font-bold text-foreground mt-2 w-full text-center">
                      Peg {pegKey}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 4: SUBSETS / COMBINATIONS DECISION TREE */}
        {mode === "subsets" && currentStep.subsetState && (
          <div className="w-full max-w-xl space-y-4 py-4">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center">
              Binary Combinatorial Decision State (Include vs Exclude)
            </span>

            <div className="p-5 rounded-2xl bg-muted/30 border border-border/80 space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-xs font-mono text-muted-foreground">Original Set: [1, 2, 3]</span>
                <Badge variant="outline" className="text-xs font-mono">
                  Current Depth: {currentStep.subsetState.index} / {currentStep.subsetState.pool.length}
                </Badge>
              </div>

              {/* Elements Decision Bar */}
              <div className="flex items-center justify-center gap-3">
                {currentStep.subsetState.pool.map((num, i) => {
                  const isDecided = i < currentStep.subsetState!.index;
                  const isCurrent = i === currentStep.subsetState!.index;
                  const isIncluded = currentStep.subsetState!.current.includes(num);

                  return (
                    <div
                      key={num}
                      className={`p-3 rounded-xl border flex flex-col items-center min-w-[75px] transition-all ${
                        isCurrent
                          ? "border-primary bg-primary/20 shadow-md scale-105"
                          : isDecided && isIncluded
                          ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                          : isDecided && !isIncluded
                          ? "border-slate-700 bg-slate-800/40 text-slate-500 line-through"
                          : "border-border bg-card text-muted-foreground"
                      }`}
                    >
                      <span className="text-[10px] font-mono uppercase">Element</span>
                      <span className="text-lg font-bold font-mono">{num}</span>
                      <span className="text-[9px] font-mono mt-1">
                        {isCurrent ? "Deciding..." : isDecided ? (isIncluded ? "INCLUDED" : "EXCLUDED") : "Pending"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Current Constructed Subset */}
              <div className="p-3 bg-card rounded-xl border border-border/80 flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">Constructed Subset:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-sm font-bold text-primary">
                    [ {currentStep.subsetState.current.join(", ")} ]
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: MAZE GRID PATHFINDING */}
        {mode === "maze" && currentStep.mazeGrid && (
          <div className="flex flex-col items-center space-y-3 py-2">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              4×4 Grid Maze Traversal (Start: 0,0 ── Goal: 3,3)
            </span>

            <div className="grid grid-cols-4 border-2 border-border rounded-2xl overflow-hidden shadow-lg p-1 bg-muted/40">
              {currentStep.mazeGrid.map((row, r) =>
                row.map((cell, c) => {
                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`h-14 w-14 sm:h-16 sm:w-16 flex flex-col items-center justify-center m-1 rounded-xl transition-all font-mono text-xs font-bold border ${
                        cell.state === "current"
                          ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/40 scale-105"
                          : cell.state === "path"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                          : cell.state === "deadend"
                          ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                          : cell.state === "target"
                          ? "bg-indigo-500/30 text-indigo-400 border-indigo-500 animate-pulse"
                          : "bg-slate-900 text-slate-600 border-slate-800"
                      }`}
                    >
                      {cell.state === "current" && "RAT"}
                      {cell.state === "target" && "GOAL"}
                      {cell.state === "wall" && "WALL"}
                      {cell.state === "deadend" && "X"}
                      {cell.state === "path" && "•"}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Message Strip */}
        <div className="w-full max-w-2xl mt-4 p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>{currentStep.message}</span>
        </div>

        {/* Student Mode 3 Questions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-3xl mt-4">
          <div className="p-3.5 bg-card rounded-xl border border-border/80 space-y-1">
            <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider block">
              What is happening?
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {currentStep.what}
            </p>
          </div>

          <div className="p-3.5 bg-card rounded-xl border border-border/80 space-y-1">
            <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider block">
              Why did this happen?
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {currentStep.why}
            </p>
          </div>

          <div className="p-3.5 bg-card rounded-xl border border-border/80 space-y-1">
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
