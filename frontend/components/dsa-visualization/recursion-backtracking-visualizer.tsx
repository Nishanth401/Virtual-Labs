"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
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
  GitFork,
  FastForward,
  Box
} from "lucide-react";
import { NQueensVisualizer } from "@/components/visualizer/advanced-suite/n-queens-visualizer";

export type RecBacktrackMode = "factorial" | "nqueens" | "hanoi" | "subsets" | "maze";

interface RecStep {
  callStack?: { func: string; param: number; ret?: number; status: "active" | "returning" | "waiting" }[];
  hanoiPegs?: { A: number[]; B: number[]; C: number[] };
  hanoiMove?: { disk: number; from: string; to: string; moveNumber: number; totalMoves: number };
  subsetState?: { current: number[]; index: number; action: "include" | "exclude" | "base"; pool: number[] };
  discoveredSubsets?: number[][];
  mazeGrid?: { r: number; c: number; state: "path" | "deadend" | "current" | "wall" | "target" }[][];
  mazePath?: { r: number; c: number }[];
  actionType?: "call" | "place" | "conflict" | "backtrack" | "success" | "move";
  message: string;
  what: string;
  why: string;
  next: string;
}

export function RecursionBacktrackingVisualizer({ defaultMode = "nqueens" }: { defaultMode?: RecBacktrackMode }) {
  const [mode, setMode] = useState<RecBacktrackMode>(defaultMode);
  const [factorialN, setFactorialN] = useState<number>(4);
  const [hanoiDisksCount, setHanoiDisksCount] = useState<number>(3);
  const [subsetsLength, setSubsetsLength] = useState<number>(3); // 3 or 4
  const [mazeSize, setMazeSize] = useState<number>(4); // 4, 5, 6
  
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1); // 0.5x, 1x, 2x, 4x
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ========================================================
  // STEP GENERATOR FOR ALL MODES
  // ========================================================
  const steps: RecStep[] = useMemo(() => {
    const list: RecStep[] = [];

    // 1. FACTORIAL CALL STACK (DYNAMIC N = 3, 4, 5, 6)
    if (mode === "factorial") {
      const n = factorialN;
      const stack: { func: string; param: number; ret?: number; status: "active" | "returning" | "waiting" }[] = [];

      // Phase 1: Call Stack Expansion (Push phase)
      for (let k = n; k >= 1; k--) {
        if (k === n) {
          stack.unshift({ func: "factorial", param: k, status: "active" });
          list.push({
            actionType: "call",
            callStack: stack.map(s => ({ ...s })),
            message: `Invoke factorial(${k}). Stack frame pushed at depth 1.`,
            what: `Calling factorial(${k}). Checking base case (n <= 1).`,
            why: `${k} > 1, so mathematical recursion requires computing ${k} × factorial(${k - 1}).`,
            next: `Push new stack frame for factorial(${k - 1}).`
          });
        } else if (k > 1) {
          // Mark previous active frame as waiting
          stack[0].status = "waiting";
          stack.unshift({ func: "factorial", param: k, status: "active" });
          list.push({
            actionType: "call",
            callStack: stack.map(s => ({ ...s })),
            message: `Invoke factorial(${k}). Stack depth = ${stack.length}.`,
            what: `Calling factorial(${k}). Waiting on subproblem factorial(${k - 1}).`,
            why: `Call stack grows linearly: O(N) auxiliary space footprint.`,
            next: `Push new stack frame for factorial(${k - 1}).`
          });
        } else {
          // Base Case: k = 1
          stack[0].status = "waiting";
          stack.unshift({ func: "factorial", param: 1, ret: 1, status: "returning" });
          list.push({
            actionType: "success",
            callStack: stack.map(s => ({ ...s })),
            message: `Base Case Reached: factorial(1) returns 1! Call stack begins unwinding.`,
            what: `n = 1 satisfies terminal condition: if (n <= 1) return 1.`,
            why: `Base case prevents infinite recursion and initiates value propagation upward.`,
            next: `Pop frame 1 and multiply return value 1 with waiting frame factorial(2).`
          });
        }
      }

      // Phase 2: Call Stack Unwinding (Return phase)
      let currentVal = 1;
      for (let k = 2; k <= n; k++) {
        // Pop the child frame
        stack.shift();
        currentVal = currentVal * k;
        stack[0].ret = currentVal;
        stack[0].status = "returning";

        list.push({
          actionType: k === n ? "success" : "backtrack",
          callStack: stack.map(s => ({ ...s })),
          message: k === n 
            ? `Final Result: factorial(${n}) = ${currentVal}! Stack fully unwound.`
            : `Unwind Frame ${stack.length}: factorial(${k}) = ${k} × ${currentVal / k} = ${currentVal}.`,
          what: `Multiplying parameter ${k} × returned value = ${currentVal}.`,
          why: `Stack frame for factorial(${k}) has now resolved its recursive dependency.`,
          next: k === n ? "Computation complete." : `Pop frame and pass ${currentVal} upward.`
        });
      }
    }

    // 2. TOWER OF HANOI (DYNAMIC DISKS: 3, 4, 5)
    else if (mode === "hanoi") {
      const n = hanoiDisksCount;
      const initialDisks = Array.from({ length: n }, (_, i) => n - i); // e.g. [3, 2, 1]
      const pegs: { A: number[]; B: number[]; C: number[] } = {
        A: [...initialDisks],
        B: [],
        C: []
      };
      const clonePegs = () => ({ A: [...pegs.A], B: [...pegs.B], C: [...pegs.C] });

      const totalMoves = Math.pow(2, n) - 1;
      let moveCount = 0;

      list.push({
        hanoiPegs: clonePegs(),
        actionType: "call",
        message: `Tower of Hanoi (${n} Disks): Target Peg C in minimum 2ⁿ - 1 = ${totalMoves} moves.`,
        what: `Initial state: [${initialDisks.join(", ")}] stacked on Source Peg A (largest Disk ${n} at bottom).`,
        why: `Rule 1: Move only 1 disk at a time. Rule 2: Never place larger disk over smaller disk.`,
        next: "Begin recursive decomposition: solve(n-1, Source -> Aux)."
      });

      const hanoiSolve = (disks: number, from: "A" | "B" | "C", to: "A" | "B" | "C", aux: "A" | "B" | "C") => {
        if (disks === 1) {
          moveCount++;
          const movingDisk = pegs[from].pop()!;
          pegs[to].push(movingDisk);
          list.push({
            hanoiPegs: clonePegs(),
            hanoiMove: { disk: movingDisk, from, to, moveNumber: moveCount, totalMoves },
            actionType: "move",
            message: `Move ${moveCount}/${totalMoves}: Disk ${movingDisk} from Peg ${from} ──→ Peg ${to}.`,
            what: `Transferred top Disk ${movingDisk} from Peg ${from} to Peg ${to}.`,
            why: `Valid move: Target Peg ${to} had larger disk base or was empty.`,
            next: moveCount === totalMoves ? "Final move reached!" : "Continue recursive sequence."
          });
          return;
        }

        hanoiSolve(disks - 1, from, aux, to);

        moveCount++;
        const movingDisk = pegs[from].pop()!;
        pegs[to].push(movingDisk);
        list.push({
          hanoiPegs: clonePegs(),
          hanoiMove: { disk: movingDisk, from, to, moveNumber: moveCount, totalMoves },
          actionType: "move",
          message: `Move ${moveCount}/${totalMoves}: Base Disk ${movingDisk} from Peg ${from} ──→ Peg ${to}!`,
          what: `Base disk ${movingDisk} safely moved to destination Peg ${to}.`,
          why: `Unblocking disk ${movingDisk} was enabled by transferring top ${disks - 1} disks to Peg ${aux}.`,
          next: `Now transfer the ${disks - 1} auxiliary disks from Peg ${aux} to Peg ${to}.`
        });

        hanoiSolve(disks - 1, aux, to, from);
      };

      hanoiSolve(n, "A", "C", "B");

      list.push({
        hanoiPegs: clonePegs(),
        actionType: "success",
        message: `🎉 Tower of Hanoi Solved! All ${n} disks placed on Peg C in exactly ${totalMoves} moves!`,
        what: `Target Peg C contains all ${n} disks correctly ordered: [${initialDisks.join(", ")}].`,
        why: "Mathematical recurrence T(n) = 2T(n-1) + 1 yields strictly minimal moves: 2ⁿ - 1.",
        next: "Hanoi simulation complete."
      });
    }

    // 3. SUBSETS & COMBINATIONS (POWER SET O(2^N))
    else if (mode === "subsets") {
      const nums = subsetsLength === 4 ? [1, 2, 3, 4] : [1, 2, 3];
      const discoveredSubsets: number[][] = [];

      list.push({
        subsetState: { current: [], index: 0, action: "base", pool: nums },
        discoveredSubsets: [],
        actionType: "call",
        message: `Power Set Generation for [${nums.join(", ")}]: Total Subsets = 2^${nums.length} = ${Math.pow(2, nums.length)}.`,
        what: `Binary combinatorial tree: each element has exactly 2 branches (INCLUDE or EXCLUDE).`,
        why: `Systematic depth-first enumeration avoids duplicate subsets.`,
        next: `Evaluate element ${nums[0]}.`
      });

      const traceSubsets = (idx: number, current: number[]) => {
        if (idx === nums.length) {
          discoveredSubsets.push([...current]);
          list.push({
            subsetState: { current: [...current], index: idx, action: "base", pool: nums },
            discoveredSubsets: discoveredSubsets.map(s => [...s]),
            actionType: "success",
            message: `🎉 Generated Subset #${discoveredSubsets.length}: [ ${current.join(", ")} ]`,
            what: `Leaf reached at tree depth ${idx}. Subset [${current.join(", ")}] added to power set.`,
            why: `All ${nums.length} element inclusion/exclusion decisions finalized along this branch.`,
            next: `Backtrack to parent decision node.`
          });
          return;
        }

        // Branch A: INCLUDE
        list.push({
          subsetState: { current: [...current, nums[idx]], index: idx, action: "include", pool: nums },
          discoveredSubsets: discoveredSubsets.map(s => [...s]),
          actionType: "place",
          message: `Decision at Element ${nums[idx]}: INCLUDE into subset candidate [${[...current, nums[idx]].join(", ")}].`,
          what: `Element ${nums[idx]} added to subset.`,
          why: `Branch 1 of binary decision tree explores presence of element ${nums[idx]}.`,
          next: `Recur for element index ${idx + 1}.`
        });
        traceSubsets(idx + 1, [...current, nums[idx]]);

        // Branch B: EXCLUDE (Backtrack)
        list.push({
          subsetState: { current: [...current], index: idx, action: "exclude", pool: nums },
          discoveredSubsets: discoveredSubsets.map(s => [...s]),
          actionType: "backtrack",
          message: `Decision at Element ${nums[idx]}: EXCLUDE ${nums[idx]} (candidate: [${current.join(", ")}]).`,
          what: `Removed ${nums[idx]} from candidate. Now exploring alternative branch where ${nums[idx]} is absent.`,
          why: `Branch 2 of binary decision tree explores absence of element ${nums[idx]}.`,
          next: `Recur for element index ${idx + 1}.`
        });
        traceSubsets(idx + 1, [...current]);
      };

      traceSubsets(0, []);
    }

    // 4. RAT IN A MAZE (DYNAMIC 4x4, 5x5, 6x6)
    else if (mode === "maze") {
      const N = mazeSize;
      // Predefined solvable maze layouts
      const layouts: Record<number, number[][]> = {
        4: [
          [1, 0, 0, 0],
          [1, 1, 0, 1],
          [0, 1, 0, 0],
          [1, 1, 1, 1]
        ],
        5: [
          [1, 0, 0, 0, 0],
          [1, 1, 1, 0, 1],
          [0, 0, 1, 0, 0],
          [1, 1, 1, 1, 0],
          [0, 0, 0, 1, 1]
        ],
        6: [
          [1, 0, 0, 0, 0, 0],
          [1, 1, 0, 1, 1, 0],
          [0, 1, 0, 0, 1, 0],
          [0, 1, 1, 1, 1, 0],
          [0, 0, 0, 1, 0, 0],
          [0, 0, 0, 1, 1, 1]
        ]
      };

      const mazeLayout = layouts[N] || layouts[4];
      const visited: boolean[][] = Array.from({ length: N }, () => Array(N).fill(false));
      const currentPath: { r: number; c: number }[] = [];
      const deadEnds: { r: number; c: number }[] = [];

      const buildGrid = (currR: number, currC: number) => {
        return mazeLayout.map((row, r) =>
          row.map((val, c) => {
            if (val === 0) return { r, c, state: "wall" as const };
            if (r === N - 1 && c === N - 1) return { r, c, state: "target" as const };
            if (r === currR && c === currC) return { r, c, state: "current" as const };
            if (deadEnds.some(p => p.r === r && p.c === c)) return { r, c, state: "deadend" as const };
            if (currentPath.some(p => p.r === r && p.c === c)) return { r, c, state: "path" as const };
            return { r, c, state: "path" as const };
          })
        );
      };

      list.push({
        mazeGrid: buildGrid(0, 0),
        mazePath: [{ r: 0, c: 0 }],
        actionType: "call",
        message: `Rat in a Maze (${N}×${N}): Start at (0, 0) ──→ Goal at (${N - 1}, ${N - 1}).`,
        what: `DFS Backtracking pathfinder traversing directional priority: Down ──→ Right ──→ Up ──→ Left.`,
        why: `Obstacles (dark walls) force backtracking when all directional options are exhausted.`,
        next: "Examine first step from (0, 0)."
      });

      // Direction vectors: Down, Right, Up, Left
      const dr = [1, 0, -1, 0];
      const dc = [0, 1, 0, -1];
      const dName = ["DOWN", "RIGHT", "UP", "LEFT"];

      const solveMaze = (r: number, c: number): boolean => {
        currentPath.push({ r, c });
        visited[r][c] = true;

        if (r === N - 1 && c === N - 1) {
          list.push({
            mazeGrid: buildGrid(r, c),
            mazePath: [...currentPath],
            actionType: "success",
            message: `🎉 Goal Reached at (${N - 1}, ${N - 1})! Escape path successfully discovered!`,
            what: `All ${currentPath.length} steps along the valid escape route verified.`,
            why: `Continuous uninterrupted path through open corridors found.`,
            next: "Maze traversal complete."
          });
          return true;
        }

        for (let i = 0; i < 4; i++) {
          const nr = r + dr[i];
          const nc = c + dc[i];

          // Check boundary and wall
          if (nr >= 0 && nr < N && nc >= 0 && nc < N) {
            if (mazeLayout[nr][nc] === 1 && !visited[nr][nc]) {
              list.push({
                mazeGrid: buildGrid(nr, nc),
                mazePath: [...currentPath, { r: nr, c: nc }],
                actionType: "place",
                message: `Move ${dName[i]} to (${nr}, ${nc}): Valid open corridor.`,
                what: `Advancing rat into cell (${nr}, ${nc}).`,
                why: `Corridor is free of obstacles and unvisited.`,
                next: `Explore next move from (${nr}, ${nc}).`
              });

              if (solveMaze(nr, nc)) return true;
            } else if (mazeLayout[nr][nc] === 0) {
              deadEnds.push({ r: nr, c: nc });
              list.push({
                mazeGrid: buildGrid(r, c),
                mazePath: [...currentPath],
                actionType: "conflict",
                message: `Try ${dName[i]} to (${nr}, ${nc}): BLOCKED by wall!`,
                what: `Square (${nr}, ${nc}) is impassable wall.`,
                why: `Corridor boundary check failed.`,
                next: `Attempt alternative directional candidate from (${r}, ${c}).`
              });
            }
          }
        }

        // Backtrack
        currentPath.pop();
        visited[r][c] = false;
        deadEnds.push({ r, c });
        list.push({
          mazeGrid: buildGrid(currentPath.length > 0 ? currentPath[currentPath.length - 1].r : 0, currentPath.length > 0 ? currentPath[currentPath.length - 1].c : 0),
          mazePath: [...currentPath],
          actionType: "backtrack",
          message: `Backtrack from (${r}, ${c})! No forward moves remain.`,
          what: `Unwinding search to previous cell in call stack.`,
          why: `All adjacent corridors resulted in walls or visited cycles.`,
          next: `Explore alternate direction from previous position.`
        });
        return false;
      };

      solveMaze(0, 0);
    }

    return list;
  }, [mode, factorialN, hanoiDisksCount, subsetsLength, mazeSize]);

  // Reset step index when mode or parameters change
  useEffect(() => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [mode, factorialN, hanoiDisksCount, subsetsLength, mazeSize]);

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      const delay = Math.max(80, 800 / playbackSpeed);
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
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

  const currentStep = steps[currentStepIdx] || steps[0] || { message: "", what: "", why: "", next: "" };

  const getActionBadge = () => {
    switch (currentStep.actionType) {
      case "call":
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Call Push</Badge>;
      case "place":
        return <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">Step Forward</Badge>;
      case "conflict":
        return <Badge variant="destructive" className="bg-rose-500/20 text-rose-500 border-rose-500/30">Obstacle Collision</Badge>;
      case "backtrack":
        return <Badge variant="outline" className="bg-slate-500/20 text-slate-400 border-slate-500/30">Backtrack Unwind</Badge>;
      case "success":
        return <Badge className="bg-emerald-500 text-white animate-bounce">Goal Achieved</Badge>;
      case "move":
        return <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">Disk Transfer</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-mono font-bold">
            Module 04
          </Badge>
          <span className="text-base font-bold text-foreground font-heading">
            Recursion &amp; Backtracking Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={mode === "nqueens" ? "default" : "ghost"}
            size="sm"
            onClick={() => { setMode("nqueens"); setIsPlaying(false); }}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Crown className="h-3.5 w-3.5 mr-1" />
            N-Queens (4×4, 5×5, 6×6)
          </Button>

          <Button
            variant={mode === "factorial" ? "default" : "ghost"}
            size="sm"
            onClick={() => { setMode("factorial"); setIsPlaying(false); }}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Layers className="h-3.5 w-3.5 mr-1" />
            Factorial (Call Stack)
          </Button>

          <Button
            variant={mode === "hanoi" ? "default" : "ghost"}
            size="sm"
            onClick={() => { setMode("hanoi"); setIsPlaying(false); }}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Box className="h-3.5 w-3.5 mr-1" />
            Tower of Hanoi
          </Button>

          <Button
            variant={mode === "subsets" ? "default" : "ghost"}
            size="sm"
            onClick={() => { setMode("subsets"); setIsPlaying(false); }}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <GitFork className="h-3.5 w-3.5 mr-1" />
            Subsets (Power Set 2ⁿ)
          </Button>

          <Button
            variant={mode === "maze" ? "default" : "ghost"}
            size="sm"
            onClick={() => { setMode("maze"); setIsPlaying(false); }}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Compass className="h-3.5 w-3.5 mr-1" />
            Rat in a Maze Grid
          </Button>
        </div>
      </div>

      {/* RENDER N-QUEENS DEDICATED VISUALIZER */}
      {mode === "nqueens" ? (
        <NQueensVisualizer />
      ) : (
        <>
          {/* ======================================================== */}
          {/* PLAYBACK CONTROLS & DYNAMIC PARAMETER TOGGLES            */}
          {/* ======================================================== */}
          <Card className="p-4 bg-card border-border/80 rounded-2xl shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Playback Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`h-9 px-4 rounded-xl font-mono text-xs font-bold gap-1.5 ${
                    isPlaying ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-primary text-primary-foreground"
                  }`}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isPlaying ? "Pause" : "Play"}</span>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentStepIdx === 0}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStepIdx((p) => Math.max(0, p - 1));
                  }}
                  className="h-9 w-9 rounded-xl"
                  title="Step Back"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentStepIdx >= steps.length - 1}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStepIdx((p) => Math.min(steps.length - 1, p + 1));
                  }}
                  className="h-9 w-9 rounded-xl"
                  title="Step Forward"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStepIdx(0);
                  }}
                  className="h-9 w-9 rounded-xl"
                  title="Reset"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Dynamic Parameter Selector based on mode */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Factorial N selector */}
                {mode === "factorial" && (
                  <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border">
                    <span className="text-[11px] font-mono text-muted-foreground font-bold px-2">Input N:</span>
                    {[3, 4, 5, 6].map((n) => (
                      <Button
                        key={n}
                        size="sm"
                        variant={factorialN === n ? "default" : "ghost"}
                        onClick={() => { setFactorialN(n); setIsPlaying(false); }}
                        className="h-7 px-2.5 text-xs font-mono font-bold rounded-lg"
                      >
                        N = {n} ({n}!)
                      </Button>
                    ))}
                  </div>
                )}

                {/* Hanoi Disks selector */}
                {mode === "hanoi" && (
                  <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border">
                    <span className="text-[11px] font-mono text-muted-foreground font-bold px-2">Disks:</span>
                    {[3, 4, 5].map((d) => (
                      <Button
                        key={d}
                        size="sm"
                        variant={hanoiDisksCount === d ? "default" : "ghost"}
                        onClick={() => { setHanoiDisksCount(d); setIsPlaying(false); }}
                        className="h-7 px-2.5 text-xs font-mono font-bold rounded-lg"
                      >
                        {d} Disks ({Math.pow(2, d) - 1} moves)
                      </Button>
                    ))}
                  </div>
                )}

                {/* Subsets Pool selector */}
                {mode === "subsets" && (
                  <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border">
                    <span className="text-[11px] font-mono text-muted-foreground font-bold px-2">Pool Size:</span>
                    {[3, 4].map((len) => (
                      <Button
                        key={len}
                        size="sm"
                        variant={subsetsLength === len ? "default" : "ghost"}
                        onClick={() => { setSubsetsLength(len); setIsPlaying(false); }}
                        className="h-7 px-2.5 text-xs font-mono font-bold rounded-lg"
                      >
                        {len} Elements (2^{len} = {Math.pow(2, len)} subsets)
                      </Button>
                    ))}
                  </div>
                )}

                {/* Maze Grid Size selector */}
                {mode === "maze" && (
                  <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border">
                    <span className="text-[11px] font-mono text-muted-foreground font-bold px-2">Maze Grid:</span>
                    {[4, 5, 6].map((sz) => (
                      <Button
                        key={sz}
                        size="sm"
                        variant={mazeSize === sz ? "default" : "ghost"}
                        onClick={() => { setMazeSize(sz); setIsPlaying(false); }}
                        className="h-7 px-2.5 text-xs font-mono font-bold rounded-lg"
                      >
                        {sz} × {sz} Grid
                      </Button>
                    ))}
                  </div>
                )}

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

            {/* Timeline Scrub Slider */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-2">
                  {getActionBadge()}
                  <span>
                    Step <strong className="text-foreground font-bold">{currentStepIdx + 1}</strong> of {steps.length}
                  </span>
                </div>
                <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                  {mode === "factorial"
                    ? `O(N) Stack Depth • N = ${factorialN}`
                    : mode === "hanoi"
                    ? `O(2ⁿ) Moves (${Math.pow(2, hanoiDisksCount) - 1})`
                    : mode === "subsets"
                    ? `O(2ⁿ) Combinatorial (${Math.pow(2, subsetsLength)})`
                    : `O(4ⁿ) Grid Backtrack (${mazeSize}×${mazeSize})`}
                </Badge>
              </div>
              <Slider
                value={[currentStepIdx]}
                max={steps.length - 1}
                step={1}
                onValueChange={(val) => {
                  setIsPlaying(false);
                  setCurrentStepIdx(val[0]);
                }}
                className="cursor-pointer"
              />
            </div>
          </Card>

          {/* ======================================================== */}
          {/* MAIN INTERACTIVE CANVAS PER MODE                         */}
          {/* ======================================================== */}
          <Card className="border-border bg-card/80 p-6 flex flex-col items-center min-h-[380px] justify-center shadow-xs">
            {/* VIEW 1: FACTORIAL CALL STACK */}
            {mode === "factorial" && currentStep.callStack && (
              <div className="w-full max-w-lg space-y-4 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-bold">
                    JVM Call Stack Activation Records (LIFO Frame Stack)
                  </span>
                  <Badge variant="outline" className="text-xs font-mono">
                    Depth: {currentStep.callStack.length} / {factorialN}
                  </Badge>
                </div>

                <div className="flex flex-col space-y-2 border-b-4 border-x-4 border-primary/40 rounded-b-2xl p-4 bg-muted/20 min-h-[260px] justify-end">
                  {currentStep.callStack.map((frame, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between font-mono text-xs transition-all ${
                        frame.status === "returning"
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold shadow-xs"
                          : frame.status === "active"
                          ? "bg-primary/20 border-primary text-primary font-bold shadow-md shadow-primary/20 scale-[1.02]"
                          : "bg-card border-border text-muted-foreground opacity-70"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted border border-border">
                          Frame {currentStep.callStack!.length - idx}
                        </span>
                        <span>factorial({frame.param})</span>
                      </div>
                      <span className="font-bold">
                        {frame.ret !== undefined ? `return ${frame.ret}` : "waiting on subproblem..."}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 2: TOWER OF HANOI */}
            {mode === "hanoi" && currentStep.hanoiPegs && (
              <div className="w-full max-w-2xl space-y-4 py-2">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="uppercase tracking-wider font-bold">
                    Peg A (Source) ── Peg B (Auxiliary) ── Peg C (Destination)
                  </span>
                  {currentStep.hanoiMove && (
                    <Badge variant="secondary" className="font-bold text-primary">
                      Move {currentStep.hanoiMove.moveNumber} of {currentStep.hanoiMove.totalMoves}
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-6 p-6 bg-muted/20 rounded-2xl border border-border min-h-[250px] items-end">
                  {(["A", "B", "C"] as const).map((pegKey) => {
                    const disks = currentStep.hanoiPegs![pegKey];
                    return (
                      <div key={pegKey} className="flex flex-col items-center relative">
                        {/* Spindle Rod */}
                        <div className="w-2.5 h-36 bg-slate-600/60 rounded-t-full absolute bottom-4 -z-0" />

                        {/* Stacked Disks */}
                        <div className="flex flex-col-reverse items-center gap-1.5 z-10 w-full mb-4 min-h-[140px] justify-start">
                          {disks.map((d) => {
                            const widthPercent = 30 + (d / hanoiDisksCount) * 65;
                            const colors = [
                              "from-rose-500 to-pink-600",
                              "from-amber-500 to-yellow-600",
                              "from-emerald-500 to-teal-600",
                              "from-blue-500 to-cyan-600",
                              "from-purple-500 to-violet-600"
                            ];
                            const bgGradient = colors[(d - 1) % colors.length];

                            return (
                              <div
                                key={d}
                                style={{ width: `${widthPercent}%` }}
                                className={`h-6 rounded-lg bg-gradient-to-r ${bgGradient} text-white font-mono text-[11px] font-bold flex items-center justify-center shadow-md transition-all`}
                              >
                                Disk {d}
                              </div>
                            );
                          })}
                        </div>

                        {/* Base Pedestal */}
                        <div className="w-full h-4 bg-slate-700 rounded-lg flex items-center justify-center border-t border-slate-600 shadow-sm z-20">
                          <span className="text-[10px] font-mono font-bold text-slate-300">
                            Peg {pegKey}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VIEW 3: SUBSETS (POWER SET) */}
            {mode === "subsets" && currentStep.subsetState && (
              <div className="w-full max-w-2xl space-y-4 py-2">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="text-xs font-mono text-muted-foreground font-bold">
                    Pool: [ {currentStep.subsetState.pool.join(", ")} ]
                  </span>
                  <Badge variant="outline" className="text-xs font-mono">
                    Depth: {currentStep.subsetState.index} / {currentStep.subsetState.pool.length}
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
                        className={`p-3 rounded-xl border flex flex-col items-center min-w-[85px] transition-all ${
                          isCurrent
                            ? "border-primary bg-primary/20 shadow-md scale-105"
                            : isDecided && isIncluded
                            ? "border-emerald-500 bg-emerald-500/15 text-emerald-400 font-bold"
                            : isDecided && !isIncluded
                            ? "border-slate-700 bg-slate-800/40 text-slate-500 line-through"
                            : "border-border bg-card text-muted-foreground"
                        }`}
                      >
                        <span className="text-[10px] font-mono uppercase">Element</span>
                        <span className="text-xl font-bold font-mono">{num}</span>
                        <span className="text-[9px] font-mono mt-1">
                          {isCurrent ? "Deciding..." : isDecided ? (isIncluded ? "INCLUDED" : "EXCLUDED") : "Pending"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Current Constructed Subset */}
                <div className="p-3.5 bg-card rounded-xl border border-border/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">Active Candidate Subset:</span>
                  <span className="font-mono text-base font-bold text-primary">
                    [ {currentStep.subsetState.current.join(", ")} ]
                  </span>
                </div>

                {/* Discovered Subsets Gallery */}
                {currentStep.discoveredSubsets && currentStep.discoveredSubsets.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-muted-foreground font-bold uppercase tracking-wider block">
                      Discovered Subsets ({currentStep.discoveredSubsets.length} / {Math.pow(2, subsetsLength)})
                    </span>
                    <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto p-2 bg-muted/20 rounded-xl border border-border/60">
                      {currentStep.discoveredSubsets.map((sub, sIdx) => (
                        <Badge key={sIdx} variant="secondary" className="font-mono text-xs py-1 px-2.5">
                          [ {sub.join(", ")} ]
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 4: RAT IN A MAZE GRID */}
            {mode === "maze" && currentStep.mazeGrid && (
              <div className="flex flex-col items-center space-y-3 py-2">
                <div className="flex items-center justify-between w-full max-w-md px-2">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-bold">
                    {mazeSize}×{mazeSize} Maze (Start: 0,0 ──→ Goal: {mazeSize - 1},{mazeSize - 1})
                  </span>
                  <Badge variant="outline" className="text-xs font-mono">
                    Path Length: {currentStep.mazePath?.length || 0}
                  </Badge>
                </div>

                <div
                  className="grid gap-1 border-2 border-border rounded-2xl overflow-hidden shadow-xl p-2 bg-muted/40"
                  style={{ gridTemplateColumns: `repeat(${mazeSize}, minmax(0, 1fr))` }}
                >
                  {currentStep.mazeGrid.map((row, r) =>
                    row.map((cell, c) => {
                      const isWall = cell.state === "wall";
                      const isTarget = cell.state === "target";
                      const isCurrent = cell.state === "current";
                      const isPath = cell.state === "path";
                      const isDeadend = cell.state === "deadend";

                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl border flex flex-col items-center justify-center font-mono text-xs relative transition-all ${
                            isTarget
                              ? "bg-emerald-500/30 border-emerald-500 text-emerald-400 font-bold"
                              : isCurrent
                              ? "bg-amber-500/30 border-amber-500 text-amber-300 font-black shadow-md scale-105"
                              : isPath
                              ? "bg-primary/20 border-primary/40 text-primary font-bold"
                              : isDeadend
                              ? "bg-rose-500/15 border-rose-500/30 text-rose-400 opacity-60"
                              : isWall
                              ? "bg-slate-900 border-slate-800 text-slate-600"
                              : "bg-card border-border text-muted-foreground"
                          }`}
                        >
                          <span className="text-[8px] opacity-60 absolute top-1 left-1">
                            {r},{c}
                          </span>
                          {isCurrent && "🐀"}
                          {isTarget && "🏁"}
                          {isWall && "🧱"}
                          {isDeadend && "✕"}
                          {isPath && !isCurrent && !isTarget && "•"}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Educational Rationale Strip */}
            <div className="w-full max-w-2xl mt-4 p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>{currentStep.message}</span>
            </div>

            {/* Pedagogical 3-Questions Grid */}
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
        </>
      )}
    </div>
  );
}
