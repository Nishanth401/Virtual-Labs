"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Compass, Play, RotateCcw, ChevronRight, ChevronLeft, Info, CheckCircle2 } from "lucide-react";

export function GridBacktrackingVisualizer() {
  const [activeTab, setActiveTab] = useState<"maze" | "sudoku">("maze");
  const [stepIdx, setStepIdx] = useState<number>(0);

  // 4x4 Rat in a Maze
  const mazeSteps = [
    { r: 0, c: 0, val: "RAT", desc: "Start at (0, 0). Exploring paths towards Destination (3, 3)." },
    { r: 1, c: 0, val: "•", desc: "Move DOWN to (1, 0): Valid open cell." },
    { r: 2, c: 0, val: "X", desc: "Try DOWN to (2, 0): Hit WALL! Backtrack to (1, 0)." },
    { r: 1, c: 1, val: "•", desc: "Move RIGHT to (1, 1): Valid path cell." },
    { r: 2, c: 1, val: "•", desc: "Move DOWN to (2, 1): Path clear." },
    { r: 3, c: 1, val: "•", desc: "Move DOWN to (3, 1): Reached target row." },
    { r: 3, c: 2, val: "•", desc: "Move RIGHT to (3, 2): One step from goal." },
    { r: 3, c: 3, val: "GOAL", desc: "🎉 Reached Destination (3, 3)! Valid escape path discovered." }
  ];

  // 4x4 Mini Sudoku
  const sudokuSteps = [
    { desc: "Initial 4x4 Mini-Sudoku puzzle with empty cells at (0,1), (1,0), (2,3), (3,2).", grid: [
      [1, 0, 3, 4],
      [0, 4, 1, 2],
      [4, 1, 2, 0],
      [2, 3, 0, 1]
    ]},
    { desc: "Testing Cell (0, 1): Candidate 2 satisfies row, col, and 2x2 box!", grid: [
      [1, 2, 3, 4],
      [0, 4, 1, 2],
      [4, 1, 2, 0],
      [2, 3, 0, 1]
    ]},
    { desc: "Testing Cell (1, 0): Candidate 3 valid!", grid: [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [4, 1, 2, 0],
      [2, 3, 0, 1]
    ]},
    { desc: "Testing Cell (2, 3): Candidate 3 valid!", grid: [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [4, 1, 2, 3],
      [2, 3, 0, 1]
    ]},
    { desc: "🎉 Sudoku Solved! Cell (3, 2) filled with 4. All constraints satisfied.", grid: [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [4, 1, 2, 3],
      [2, 3, 4, 1]
    ]}
  ];

  const currentMazeStep = mazeSteps[Math.min(stepIdx, mazeSteps.length - 1)];
  const currentSudokuStep = sudokuSteps[Math.min(stepIdx, sudokuSteps.length - 1)];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30">
            Phase 3: Recursion &amp; Backtracking
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            2D Constraint Satisfaction &amp; Pathfinding
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Grid &amp; Matrix Backtracking Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Explore spatial constraint algorithms. Step through Rat in a Maze and Sudoku Solver with state-saving, candidate constraint verification, and dead-end backtracks.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60">
            <Button
              variant={activeTab === "maze" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setActiveTab("maze"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              Rat in a Maze
            </Button>
            <Button
              variant={activeTab === "sudoku" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setActiveTab("sudoku"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              Sudoku Solver
            </Button>
          </div>

          <Button
            size="sm"
            onClick={() => setStepIdx(p => p + 1)}
            disabled={stepIdx >= (activeTab === "maze" ? mazeSteps.length - 1 : sudokuSteps.length - 1)}
            className="h-8 text-xs font-bold gap-1 rounded-xl bg-primary text-primary-foreground"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Step Next</span>
          </Button>

          <Button size="sm" variant="outline" onClick={() => setStepIdx(0)} className="h-8 w-8 p-0 rounded-xl" title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            O(4^(N×M)) State Search Tree
          </Badge>
        </div>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div className="flex flex-col items-center justify-center py-4">
          {activeTab === "maze" ? (
            <div className="grid grid-cols-4 gap-2 border-2 border-border p-3 rounded-2xl bg-muted/20">
              {Array.from({ length: 4 }).map((_, r) =>
                Array.from({ length: 4 }).map((_, c) => {
                  const isWall = (r === 0 && c > 0) || (r === 2 && (c === 0 || c === 2 || c === 3));
                  const isCurrent = currentMazeStep.r === r && currentMazeStep.c === c;
                  const isGoal = r === 3 && c === 3;

                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`h-16 w-16 rounded-xl border flex items-center justify-center font-mono font-bold text-xs transition-all ${
                        isCurrent
                          ? "bg-amber-500 text-slate-950 border-amber-400 scale-105 shadow-md shadow-amber-500/30"
                          : isGoal
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500"
                          : isWall
                          ? "bg-slate-900 border-slate-800 text-slate-600"
                          : "bg-card border-border text-foreground"
                      }`}
                    >
                      {isCurrent ? currentMazeStep.val : isGoal ? "GOAL" : isWall ? "WALL" : "•"}
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 border-4 border-slate-700 p-3 rounded-2xl bg-slate-950">
              {currentSudokuStep.grid.map((row, r) =>
                row.map((val, c) => (
                  <div
                    key={`${r}-${c}`}
                    className={`h-16 w-16 rounded-xl border flex items-center justify-center font-mono font-bold text-lg transition-all ${
                      val === 0
                        ? "bg-muted/10 border-dashed border-slate-700 text-muted-foreground"
                        : "bg-slate-900 border-slate-700 text-emerald-400 shadow-xs"
                    }`}
                  >
                    {val !== 0 ? val : ""}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>{activeTab === "maze" ? currentMazeStep.desc : currentSudokuStep.desc}</span>
        </div>
      </Card>
    </div>
  );
}
