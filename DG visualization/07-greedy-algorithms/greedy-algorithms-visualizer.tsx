"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Play, 
  RotateCcw, 
  Zap, 
  Calculator, 
  CheckCircle2, 
  Info,
  Layers
} from "lucide-react";

export type GreedyDpMode = "activity" | "knapsack-fractional" | "dp-fib" | "dp-knapsack-2d";

export function GreedyDpVisualizer({ defaultMode = "dp-knapsack-2d" }: { defaultMode?: GreedyDpMode }) {
  const [mode, setMode] = useState<GreedyDpMode>(defaultMode);

  // --- ACTIVITY SELECTION STATE ---
  const [activities] = useState([
    { name: "A1", start: 1, end: 3 },
    { name: "A2", start: 2, end: 5 },
    { name: "A3", start: 4, end: 6 },
    { name: "A4", start: 6, end: 8 },
    { name: "A5", start: 5, end: 9 }
  ]);
  const [selectedActs, setSelectedActs] = useState<string[]>(["A1", "A3", "A4"]);
  const [actMessage, setActMessage] = useState<string>("Sorted by finish time. Greedily selected 3 non-overlapping activities: A1 [1-3], A3 [4-6], A4 [6-8].");

  // --- 1D DP FIBONACCI STATE ---
  const [fibN, setFibN] = useState<number>(6);
  const [fibTable, setFibTable] = useState<number[]>([0, 1, 1, 2, 3, 5, 8]);
  const [activeFibIdx, setActiveFibIdx] = useState<number | null>(null);
  const [fibMessage, setFibMessage] = useState<string>("Tabulation fills bottom-up: dp[i] = dp[i-1] + dp[i-2]. O(n) linear time.");

  // --- 2D DP 0/1 KNAPSACK STATE ---
  const weights = [2, 3, 4];
  const values = [3, 4, 5];
  const capacity = 5;
  const [dpGrid, setDpGrid] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 3, 3, 3, 3],
    [0, 0, 3, 4, 4, 7],
    [0, 0, 3, 4, 5, 7]
  ]);
  const [highlightedCell, setHighlightedCell] = useState<{ r: number; c: number } | null>({ r: 2, c: 5 });
  const [knapsackMessage, setKnapsackMessage] = useState<string>("Cell dp[2][5] = 7: Choose max(exclude: dp[1][5]=3, include: val[2]=4 + dp[1][5-3]=3) ──> max(3, 7) = 7.");

  const runKnapsackAnimation = async () => {
    for (let r = 1; r <= weights.length; r++) {
      for (let c = 1; c <= capacity; c++) {
        setHighlightedCell({ r, c });
        const wt = weights[r - 1];
        const val = values[r - 1];
        if (wt <= c) {
          const exclude = dpGrid[r - 1][c];
          const include = val + dpGrid[r - 1][c - wt];
          setKnapsackMessage(`dp[${r}][${c}]: Item ${r} (wt:${wt}, val:${val}) fits capacity ${c}. max(exclude:${exclude}, include:${include}) = ${Math.max(exclude, include)}.`);
        } else {
          setKnapsackMessage(`dp[${r}][${c}]: Item ${r} (wt:${wt}) exceeds capacity ${c}. Carry forward cell above: ${dpGrid[r - 1][c]}.`);
        }
        await new Promise((res) => setTimeout(res, 350));
      }
    }
    setHighlightedCell({ r: weights.length, c: capacity });
    setKnapsackMessage("2D DP Knapsack computation finished! Maximum achievable profit for capacity 5 is 7.");
  };

  return (
    <div className="space-y-6">
      {/* Sub-mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-mono">
            Modules 7 &amp; 8
          </Badge>
          <span className="text-sm font-bold text-foreground">Greedy Algorithms &amp; Dynamic Programming</span>
        </div>

        <div className="flex items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={mode === "activity" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("activity")}
            className="h-7 text-xs font-semibold"
          >
            <Zap className="h-3.5 w-3.5 mr-1" /> Activity Selection
          </Button>
          <Button
            variant={mode === "dp-fib" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("dp-fib")}
            className="h-7 text-xs font-semibold"
          >
            <Calculator className="h-3.5 w-3.5 mr-1" /> 1D DP Fibonacci
          </Button>
          <Button
            variant={mode === "dp-knapsack-2d" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("dp-knapsack-2d")}
            className="h-7 text-xs font-semibold"
          >
            <Layers className="h-3.5 w-3.5 mr-1" /> 2D DP Knapsack Table
          </Button>
        </div>
      </div>

      {/* VIEW 1: ACTIVITY SELECTION (GREEDY) */}
      {mode === "activity" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="text-xs font-mono text-muted-foreground">
              Compatible Selected: <strong className="text-emerald-500">{selectedActs.join(", ")}</strong> (Total: 3)
            </div>
            <Badge variant="outline" className="text-xs font-mono bg-primary/10 text-primary border-primary/20">
              Greedy Choice: Earliest Finish Time
            </Badge>
          </div>

          <Card className="border-border bg-card/80 p-6 space-y-4">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
              Interval Timeline [0 .. 10 hrs]
            </span>
            <div className="space-y-2.5 max-w-xl mx-auto py-2">
              {activities.map((act) => {
                const isSelected = selectedActs.includes(act.name);
                const leftPercent = act.start * 10;
                const widthPercent = (act.end - act.start) * 10;

                return (
                  <div key={act.name} className="flex items-center gap-3">
                    <span className="w-8 font-mono text-xs font-bold text-foreground">{act.name}</span>
                    <div className="relative flex-1 h-8 bg-muted/30 rounded-xl overflow-hidden border border-border/40">
                      <div
                        style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                        className={`absolute h-full rounded-lg flex items-center justify-between px-2 text-[10px] font-mono font-bold transition-all shadow-xs ${
                          isSelected
                            ? "bg-emerald-500 text-white shadow-emerald-500/30"
                            : "bg-muted-foreground/30 text-muted-foreground line-through"
                        }`}
                      >
                        <span>{act.start}h</span>
                        <span>{act.end}h</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>{actMessage}</span>
            </div>
          </Card>
        </div>
      )}

      {/* VIEW 2: 1D DP FIBONACCI */}
      {mode === "dp-fib" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="text-xs font-mono text-muted-foreground">
              Fibonacci N = <strong>{fibN}</strong> ── Result = <strong className="text-emerald-500">{fibTable[fibN]}</strong>
            </div>
            <Badge variant="outline" className="text-xs font-mono bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
              O(N) Time vs Naive O(2ⁿ)
            </Badge>
          </div>

          <Card className="border-border bg-card/80 p-6 flex flex-col items-center space-y-4">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              1D DP Memoization / Tabulation Array
            </span>

            <div className="flex items-center justify-center gap-2 py-4 overflow-x-auto">
              {fibTable.map((val, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveFibIdx(idx);
                    if (idx <= 1) setFibMessage(`dp[${idx}] = ${val} (Base case).`);
                    else setFibMessage(`dp[${idx}] = dp[${idx - 1}] (${fibTable[idx - 1]}) + dp[${idx - 2}] (${fibTable[idx - 2]}) = ${val}.`);
                  }}
                  className={`flex flex-col items-center justify-center h-16 w-14 rounded-xl border-2 cursor-pointer transition-all ${
                    activeFibIdx === idx
                      ? "border-primary bg-primary/20 text-primary scale-110 shadow-lg"
                      : "border-border bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  <span className="text-sm font-mono font-bold">{val}</span>
                  <span className="text-[9px] font-mono text-muted-foreground mt-1">[{idx}]</span>
                </div>
              ))}
            </div>

            <div className="w-full max-w-lg p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>{fibMessage}</span>
            </div>
          </Card>
        </div>
      )}

      {/* VIEW 3: 2D DP 0/1 KNAPSACK */}
      {mode === "dp-knapsack-2d" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <Button
              size="sm"
              onClick={runKnapsackAnimation}
              className="h-8 gap-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              <Play className="h-3.5 w-3.5" /> Animate 2D Table Transitions
            </Button>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span>Items: <strong>3</strong></span>
              <span>•</span>
              <span>Capacity: <strong>5</strong></span>
              <span>•</span>
              <span>Max Profit: <strong className="text-emerald-500">7</strong></span>
            </div>
          </div>

          <Card className="border-border bg-card/80 p-6 flex flex-col items-center space-y-4">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              2D DP Capacity Grid: dp[item][capacity]
            </span>

            <div className="border border-border rounded-xl overflow-hidden shadow-xs">
              <div className="grid grid-cols-7 bg-muted/60 text-center font-mono text-xs font-bold text-muted-foreground p-2 border-b border-border">
                <span>Item</span>
                <span>Cap 0</span>
                <span>Cap 1</span>
                <span>Cap 2</span>
                <span>Cap 3</span>
                <span>Cap 4</span>
                <span>Cap 5</span>
              </div>

              {dpGrid.map((row, r) => (
                <div key={r} className="grid grid-cols-7 border-b border-border/50 text-center text-xs font-mono items-center">
                  <span className="p-2 font-bold text-foreground bg-muted/20">
                    {r === 0 ? "None" : `Itm ${r} (w:${weights[r - 1]},v:${values[r - 1]})`}
                  </span>
                  {row.map((val, c) => {
                    const isHighlighted = highlightedCell?.r === r && highlightedCell?.c === c;
                    return (
                      <span
                        key={c}
                        onClick={() => setHighlightedCell({ r, c })}
                        className={`p-2.5 transition-all cursor-pointer ${
                          isHighlighted
                            ? "bg-amber-500/25 text-amber-300 font-bold border-2 border-amber-500"
                            : val > 0
                            ? "text-emerald-400 font-medium"
                            : "text-muted-foreground/60"
                        }`}
                      >
                        {val}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="w-full max-w-2xl p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>{knapsackMessage}</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
