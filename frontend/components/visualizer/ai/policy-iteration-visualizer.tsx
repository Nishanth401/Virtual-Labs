"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Play, Pause, RotateCcw, StepForward, FastForward, CheckCircle2, Info } from "lucide-react";

export type CellType = "empty" | "blocked" | "goal" | "trap";
export type ActionDirection = "UP" | "RIGHT" | "DOWN" | "LEFT";

interface GridCell {
  row: number;
  col: number;
  type: CellType;
  value: number;
  policy: ActionDirection;
  reward: number;
}

const ACTION_ARROWS: Record<ActionDirection, string> = {
  UP: "↑",
  RIGHT: "→",
  DOWN: "↓",
  LEFT: "←",
};

const ACTION_VECTORS: Record<ActionDirection, { dr: number; dc: number }> = {
  UP: { dr: -1, dc: 0 },
  RIGHT: { dr: 0, dc: 1 },
  DOWN: { dr: 1, dc: 0 },
  LEFT: { dr: 0, dc: -1 },
};

const ALL_ACTIONS: ActionDirection[] = ["UP", "RIGHT", "DOWN", "LEFT"];

export function PolicyIterationVisualizer() {
  const [gridSize, setGridSize] = useState<number>(3);
  const [discountFactor, setDiscountFactor] = useState<number>(0.9);
  const [defaultReward, setDefaultReward] = useState<number>(0.0);
  const [speed, setSpeed] = useState<number>(50); // slider: 10 to 100
  const [iterations, setIterations] = useState<number>(0);
  const [subIterations, setSubIterations] = useState<number>(0);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isOptimal, setIsOptimal] = useState<boolean>(false);
  const [currentEvalCell, setCurrentEvalCell] = useState<{ r: number; c: number } | null>(null);
  const [calculationLog, setCalculationLog] = useState<string>(
    "Calculation of value function of a state appears here"
  );

  // Initialize standard 3x3 grid matching Screenshot 104625
  const createInitialGrid = useCallback((size: number): GridCell[][] => {
    const grid: GridCell[][] = [];
    for (let r = 0; r < size; r++) {
      const row: GridCell[] = [];
      for (let c = 0; c < size; c++) {
        let type: CellType = "empty";
        let policy: ActionDirection = "LEFT";
        let reward = 0;
        let value = 0;

        if (size === 3) {
          // Exactly matching Screenshot 2026-09-30 104625.png:
          // Top row: [0,0]=LEFT, [0,1]=RIGHT, [0,2]=GOAL (+1.000 green)
          // Middle row: [1,0]=BLOCKED (black), [1,1]=LEFT, [1,2]=TRAP (-1.000 red)
          // Bottom row: [2,0]=LEFT, [2,1]=LEFT, [2,2]=LEFT
          if (r === 0 && c === 1) policy = "RIGHT";
          if (r === 0 && c === 2) {
            type = "goal";
            reward = 1.0;
            value = 1.0;
          }
          if (r === 1 && c === 0) {
            type = "blocked";
            reward = 0.0;
            value = 0.0;
          }
          if (r === 1 && c === 2) {
            type = "trap";
            reward = -1.0;
            value = -1.0;
          }
        } else {
          // 4x4 default grid setup
          if (r === 0 && c === size - 1) {
            type = "goal";
            reward = 1.0;
            value = 1.0;
          } else if (r === 1 && c === size - 1) {
            type = "trap";
            reward = -1.0;
            value = -1.0;
          } else if (r === 1 && c === 1) {
            type = "blocked";
          }
        }

        row.push({ row: r, col: c, type, value, policy, reward });
      }
      grid.push(row);
    }
    return grid;
  }, []);

  const [grid, setGrid] = useState<GridCell[][]>(() => createInitialGrid(3));

  // Reset grid whenever size changes
  const handleGridSizeChange = (newSize: number) => {
    setGridSize(newSize);
    setGrid(createInitialGrid(newSize));
    setIterations(0);
    setSubIterations(0);
    setIsRunning(false);
    setIsOptimal(false);
    setCurrentEvalCell(null);
    setCalculationLog("Calculation of value function of a state appears here");
  };

  const handleReset = () => {
    setGrid(createInitialGrid(gridSize));
    setIterations(0);
    setSubIterations(0);
    setIsRunning(false);
    setIsOptimal(false);
    setCurrentEvalCell(null);
    setCalculationLog("Calculation of value function of a state appears here");
  };

  // Helper to determine next state given an action (with boundary & obstacle check)
  const getNextState = (r: number, c: number, action: ActionDirection, currentGrid: GridCell[][]) => {
    const { dr, dc } = ACTION_VECTORS[action];
    const nr = r + dr;
    const nc = c + dc;
    if (nr < 0 || nr >= gridSize || nc < 0 || nc >= gridSize) {
      return { r, c }; // hit outer wall, stays in place
    }
    if (currentGrid[nr][nc].type === "blocked") {
      return { r, c }; // hit obstacle, stays in place
    }
    return { r: nr, c: nc };
  };

  // Calculate expected return for a state given an action
  // Uses standard Gridworld transition dynamics: 0.8 intended action, 0.1 drift right, 0.1 drift left
  const getQValue = (r: number, c: number, action: ActionDirection, currentGrid: GridCell[][]) => {
    const perpendiculars: Record<ActionDirection, [ActionDirection, ActionDirection]> = {
      UP: ["LEFT", "RIGHT"],
      RIGHT: ["UP", "DOWN"],
      DOWN: ["RIGHT", "LEFT"],
      LEFT: ["DOWN", "UP"],
    };

    const intended = getNextState(r, c, action, currentGrid);
    const [p1, p2] = perpendiculars[action];
    const perp1 = getNextState(r, c, p1, currentGrid);
    const perp2 = getNextState(r, c, p2, currentGrid);

    const targetCell = currentGrid[intended.r][intended.c];
    const reward = targetCell.type === "goal" ? 1.0 : targetCell.type === "trap" ? -1.0 : defaultReward;

    const termIntendedVal = currentGrid[intended.r][intended.c].value;
    const termPerp1Val = currentGrid[perp1.r][perp1.c].value;
    const termPerp2Val = currentGrid[perp2.r][perp2.c].value;

    const expectedFutureVal = 0.8 * termIntendedVal + 0.1 * termPerp1Val + 0.1 * termPerp2Val;
    return reward + discountFactor * expectedFutureVal;
  };

  // Single step evaluation for a cell ("Next Value")
  const stepNextValue = useCallback(() => {
    if (isOptimal) return;

    setGrid((prevGrid) => {
      // Find non-terminal, non-blocked cells in order
      const cellsToEval: { r: number; c: number }[] = [];
      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          if (prevGrid[r][c].type === "empty") {
            cellsToEval.push({ r, c });
          }
        }
      }

      if (cellsToEval.length === 0) return prevGrid;

      // Determine which cell to update based on subIterations
      const cellIdx = subIterations % cellsToEval.length;
      const target = cellsToEval[cellIdx];
      setCurrentEvalCell(target);

      const cell = prevGrid[target.r][target.c];
      const qVal = getQValue(target.r, target.c, cell.policy, prevGrid);
      const roundedVal = Math.round(qVal * 1000) / 1000;

      // Update calculation display string matching screenshot
      setCalculationLog(
        `V(${target.r + 1},${target.c + 1}) = R + γ ∑ P(s'|s,π) V(s') = ${defaultReward.toFixed(1)} + (${discountFactor.toFixed(1)} × ${((qVal - defaultReward) / (discountFactor || 1)).toFixed(3)}) = ${roundedVal.toFixed(3)} [Action: ${cell.policy}]`
      );

      const newGrid = prevGrid.map((row) => row.map((c) => ({ ...c })));
      newGrid[target.r][target.c].value = roundedVal;

      setSubIterations((prev) => prev + 1);

      // If we reached the end of all cells, increment iteration count
      if ((subIterations + 1) % cellsToEval.length === 0) {
        setIterations((prev) => prev + 1);
      }

      return newGrid;
    });
  }, [discountFactor, defaultReward, gridSize, isOptimal, subIterations]);

  // Full Policy Iteration Cycle (Evaluation to convergence + Policy Improvement)
  const stepNextIteration = useCallback(() => {
    if (isOptimal) return;

    setGrid((prevGrid) => {
      const nextGrid = prevGrid.map((row) => row.map((c) => ({ ...c })));

      // 1. Policy Evaluation (iterate until max difference < 0.001)
      let delta = 1;
      let evalPasses = 0;
      while (delta > 0.001 && evalPasses < 100) {
        delta = 0;
        evalPasses++;
        for (let r = 0; r < gridSize; r++) {
          for (let c = 0; c < gridSize; c++) {
            if (nextGrid[r][c].type !== "empty") continue;
            const currentPolicy = nextGrid[r][c].policy;
            const newV = getQValue(r, c, currentPolicy, nextGrid);
            const diff = Math.abs(nextGrid[r][c].value - newV);
            if (diff > delta) delta = diff;
            nextGrid[r][c].value = Math.round(newV * 1000) / 1000;
          }
        }
      }

      // 2. Policy Improvement (greedy action selection)
      let policyChanged = false;
      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          if (nextGrid[r][c].type !== "empty") continue;

          let bestAction = nextGrid[r][c].policy;
          let maxQ = -Infinity;

          for (const action of ALL_ACTIONS) {
            const q = getQValue(r, c, action, nextGrid);
            if (q > maxQ) {
              maxQ = q;
              bestAction = action;
            }
          }

          if (bestAction !== nextGrid[r][c].policy) {
            policyChanged = true;
            nextGrid[r][c].policy = bestAction;
          }
        }
      }

      setIterations((prev) => prev + 1);
      setSubIterations(0);
      setCurrentEvalCell(null);

      if (!policyChanged) {
        setIsOptimal(true);
        setIsRunning(false);
        setCalculationLog("Optimal Policy Reached! The policy is now stable and maximizes total expected discounted rewards.");
      } else {
        setCalculationLog(`Iteration ${iterations + 1} completed: Policy improved based on updated state values.`);
      }

      return nextGrid;
    });
  }, [discountFactor, defaultReward, gridSize, isOptimal, iterations]);

  // Handle cell click to cycle through cell types
  const handleCellClick = (r: number, c: number) => {
    if (isRunning) return;

    setGrid((prevGrid) => {
      const nextGrid = prevGrid.map((row) => row.map((cell) => ({ ...cell })));
      const cell = nextGrid[r][c];
      if (cell.type === "empty") {
        cell.type = "blocked";
        cell.value = 0.0;
      } else if (cell.type === "blocked") {
        cell.type = "goal";
        cell.value = 1.0;
        cell.reward = 1.0;
      } else if (cell.type === "goal") {
        cell.type = "trap";
        cell.value = -1.0;
        cell.reward = -1.0;
      } else {
        cell.type = "empty";
        cell.value = 0.0;
        cell.reward = 0.0;
      }
      return nextGrid;
    });
    setIsOptimal(false);
  };

  // Timer loop for Auto Run
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && !isOptimal) {
      const delay = Math.max(150, 1500 - speed * 13);
      timer = setTimeout(() => {
        stepNextValue();
      }, delay);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isRunning, isOptimal, speed, stepNextValue]);

  return (
    <div className="w-full bg-[#f8fafc] dark:bg-slate-950 p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-none space-y-6">
      {/* Title matching Screenshot 104625 */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-normal text-slate-800 dark:text-slate-100 font-sans tracking-wide">
          Policy Iteration Demo
        </h2>
      </div>

      {/* Instructions Accordion matching Screenshot 104625 */}
      <div className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-full overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full py-2.5 px-6 flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
        >
          <span>Instructions</span>
          {showInstructions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showInstructions && (
          <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="font-semibold text-slate-800 dark:text-slate-100">Quick Guide:</div>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Click on any cell</strong> in the grid to cycle its state: <em>Empty State → Blocked Obstacle → Terminal Goal (+1.0) → Terminal Trap (-1.0)</em>.</li>
              <li><strong>Next Value:</strong> Evaluates the state value function for one cell at a time. The current calculated cell will glow.</li>
              <li><strong>Next Iteration:</strong> Evaluates state values to convergence, then performs policy improvement across the entire grid.</li>
              <li><strong>Observations:</strong> Shows the active iteration number, sub-iteration count, discount factor γ, and speed slider.</li>
              <li><strong>Optimal Policy:</strong> Once the policy stabilizes (no further directional arrow changes occur), the simulation confirms optimal convergence!</li>
            </ul>
          </div>
        )}
      </div>

      {/* Subtitle / Live Equation Banner matching Screenshot 104625 */}
      <div className="text-center py-2 px-4 rounded-none bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 font-mono tracking-tight break-all">
          {calculationLog}
        </p>
      </div>

      {/* Optimal Policy Alert Banner */}
      {isOptimal && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-center justify-center gap-2 font-medium">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Optimal Policy Reached! The directional arrows indicate the optimal actions to maximize total expected reward.</span>
        </div>
      )}

      {/* Main 3-Column Layout: Policy Representation Grid | Calculation of State Values Grid | Observations Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Policy Representation (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-center text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 font-sans tracking-tight">
            Policy Representation
          </h3>

          <div
            className="grid gap-1 bg-slate-300 dark:bg-slate-700 p-1 mx-auto max-w-[340px] shadow-sm select-none"
            style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
          >
            {grid.map((row, rIdx) =>
              row.map((cell, cIdx) => {
                const isEvaluating = currentEvalCell?.r === rIdx && currentEvalCell?.c === cIdx;
                let bgClass = "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100";
                if (cell.type === "goal") {
                  bgClass = "bg-[#008000] text-white font-bold";
                } else if (cell.type === "trap") {
                  bgClass = "bg-[#ff0000] text-white font-bold";
                } else if (cell.type === "blocked") {
                  bgClass = "bg-black text-white";
                }

                return (
                  <button
                    key={`policy-${rIdx}-${cIdx}`}
                    type="button"
                    onClick={() => handleCellClick(rIdx, cIdx)}
                    title={`Cell (${rIdx + 1}, ${cIdx + 1}) - Click to toggle state`}
                    className={`h-20 sm:h-24 flex flex-col items-center justify-center p-1 text-xs sm:text-sm font-mono transition-all relative cursor-pointer border ${
                      isEvaluating
                        ? "ring-2 ring-amber-500 scale-95 z-10"
                        : "border-slate-200 dark:border-slate-800"
                    } ${bgClass}`}
                  >
                    {cell.type === "blocked" ? (
                      <span className="text-xs">0.000</span>
                    ) : cell.type === "goal" ? (
                      <span className="text-sm font-bold">1.000</span>
                    ) : cell.type === "trap" ? (
                      <span className="text-sm font-bold">-1.000</span>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span>{cell.value.toFixed(3)}</span>
                        <span className="text-base sm:text-lg text-blue-600 dark:text-blue-400 font-black">
                          {ACTION_ARROWS[cell.policy]}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
          <p className="text-center text-[11px] text-muted-foreground">
            Click any cell to toggle: normal ⇄ blocked ⇄ goal ⇄ trap
          </p>
        </div>

        {/* Center Column: Calculation of State values (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-center text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 font-sans tracking-tight">
            Calculation of State values
          </h3>

          <div
            className="grid gap-1 bg-slate-300 dark:bg-slate-700 p-1 mx-auto max-w-[340px] shadow-sm select-none"
            style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
          >
            {grid.map((row, rIdx) =>
              row.map((cell, cIdx) => {
                const isEvaluating = currentEvalCell?.r === rIdx && currentEvalCell?.c === cIdx;
                let bgClass = "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100";
                if (cell.type === "goal") {
                  bgClass = "bg-[#008000] text-white font-bold";
                } else if (cell.type === "trap") {
                  bgClass = "bg-[#ff0000] text-white font-bold";
                } else if (cell.type === "blocked") {
                  bgClass = "bg-black text-white";
                }

                return (
                  <div
                    key={`val-${rIdx}-${cIdx}`}
                    className={`h-20 sm:h-24 flex items-center justify-center p-1 text-xs sm:text-sm font-mono transition-all border ${
                      isEvaluating
                        ? "ring-2 ring-amber-500 scale-95 z-10"
                        : "border-slate-200 dark:border-slate-800"
                    } ${bgClass}`}
                  >
                    <span>{cell.value.toFixed(3)}</span>
                  </div>
                );
              })
            )}
          </div>
          <p className="text-center text-[11px] text-muted-foreground">
            Real-time evaluated state value function V(s)
          </p>
        </div>

        {/* Right Column: Observations Card matching Screenshot 104625 (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-center text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 font-sans tracking-tight">
            Observations
          </h3>

          {/* Green-Bordered Rounded Box from Screenshot 104625 */}
          <div className="p-4 sm:p-5 border-2 border-emerald-500/70 bg-slate-100 dark:bg-slate-900 rounded-2xl space-y-3.5 shadow-sm text-xs sm:text-sm">
            <div className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Iterations :</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{iterations}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Sub Iterations :</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{subIterations}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Discount Factor :</span>
              <input
                type="number"
                step="0.05"
                min="0.1"
                max="0.99"
                value={discountFactor}
                onChange={(e) => setDiscountFactor(parseFloat(e.target.value) || 0.9)}
                className="w-16 h-7 text-right px-1 font-mono font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-xs"
              />
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Reward :</span>
              <input
                type="number"
                step="0.01"
                value={defaultReward}
                onChange={(e) => setDefaultReward(parseFloat(e.target.value) || 0.0)}
                className="w-16 h-7 text-right px-1 font-mono font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-xs"
              />
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Grid Size :</span>
              <select
                value={gridSize}
                onChange={(e) => handleGridSizeChange(parseInt(e.target.value))}
                className="h-7 px-2 font-mono font-bold bg-emerald-500 text-white rounded text-xs cursor-pointer outline-hidden"
              >
                <option value={3}>3x3</option>
                <option value={4}>4x4</option>
              </select>
            </div>

            {/* Min.Speed - Max.Speed Slider from Screenshot 104625 */}
            <div className="pt-2 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                <span>Min.Speed</span>
                <span>Max.Speed</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                onClick={stepNextValue}
                disabled={isOptimal || isRunning}
                className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold rounded-none h-9 gap-1"
              >
                <StepForward className="h-3.5 w-3.5" />
                <span>Next Value</span>
              </Button>

              <Button
                type="button"
                onClick={stepNextIteration}
                disabled={isOptimal || isRunning}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-none h-9 gap-1"
              >
                <FastForward className="h-3.5 w-3.5" />
                <span>Next Iteration</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                onClick={() => setIsRunning(!isRunning)}
                disabled={isOptimal}
                variant={isRunning ? "destructive" : "default"}
                className={`w-full text-xs font-semibold rounded-none h-9 gap-1 ${
                  !isRunning ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-3.5 w-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" />
                    <span>Auto Run</span>
                  </>
                )}
              </Button>

              <Button
                type="button"
                onClick={handleReset}
                variant="outline"
                className="w-full text-xs font-semibold rounded-none h-9 gap-1 border-slate-300 dark:border-slate-700"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
