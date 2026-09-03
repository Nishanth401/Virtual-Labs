"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Activity, ArrowRight, Info, CheckCircle2 } from "lucide-react";

export function FastSlowVisualizer() {
  // Linked list nodes: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> (loops back to node 3)
  const nodes = [0, 1, 2, 3, 4, 5, 6];
  const nextPointers = [1, 2, 3, 4, 5, 6, 3]; // node 6 points back to 3

  const [slow, setSlow] = useState<number>(0);
  const [fast, setFast] = useState<number>(0);
  const [phase, setPhase] = useState<"find_meeting" | "find_start" | "detected">("find_meeting");
  const [stepsCount, setStepsCount] = useState<number>(0);
  const [log, setLog] = useState<string>("Initialize Slow (Tortoise) and Fast (Hare) at Node 0. Goal: Detect cycle in O(n) time and O(1) space.");

  const handleStep = () => {
    if (phase === "detected") return;

    if (phase === "find_meeting") {
      const nextSlow = nextPointers[slow];
      const nextFast = nextPointers[nextPointers[fast]];

      setSlow(nextSlow);
      setFast(nextFast);
      setStepsCount(s => s + 1);

      if (nextSlow === nextFast) {
        setPhase("find_start");
        setLog(`🎉 Meeting Point Encountered at Node ${nextSlow}! Slow and Fast collided. Cycle confirmed! Now resetting Slow to Head (0) to locate loop entrance.`);
        setSlow(0); // reset slow to head
      } else {
        setLog(`Step ${stepsCount + 1}: Slow moved 1 step to Node ${nextSlow}. Fast moved 2 steps to Node ${nextFast}.`);
      }
    } else if (phase === "find_start") {
      const nextSlow = nextPointers[slow];
      const nextFast = nextPointers[fast];

      setSlow(nextSlow);
      setFast(nextFast);
      setStepsCount(s => s + 1);

      if (nextSlow === nextFast) {
        setPhase("detected");
        setLog(`🎯 Loop Entrance Discovered at Node ${nextSlow}! Mathematical distance guarantees Slow and Fast meet at the cycle start when stepped at speed 1.`);
      } else {
        setLog(`Phase 2: Advancing both Slow and Fast at 1 step/sec. Slow at ${nextSlow}, Fast at ${nextFast}.`);
      }
    }
  };

  const handleReset = () => {
    setSlow(0);
    setFast(0);
    setPhase("find_meeting");
    setStepsCount(0);
    setLog("Reset pointers to start at Node 0.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30">
            Phase 3: Searching &amp; Algorithmic Patterns
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Floyd's Cycle-Finding Algorithm (Tortoise &amp; Hare)
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Fast &amp; Slow Pointers Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Master Floyd's cycle detection in linked lists. Observe the 2x speed differential guarantee a collision inside any finite cycle in $O(n)$ time and $O(1)$ memory.
        </p>
      </div>

      {/* Control Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={handleStep}
            disabled={phase === "detected"}
            className="h-8 gap-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-xl"
          >
            <Play className="h-3.5 w-3.5" />
            <span>{phase === "find_meeting" ? "Advance (Slow 1x, Fast 2x)" : phase === "find_start" ? "Advance Both 1x (Find Entrance)" : "Cycle Verified"}</span>
          </Button>

          <Button size="sm" variant="outline" onClick={handleReset} className="h-8 w-8 p-0 rounded-xl" title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span>Step Count: <strong>{stepsCount}</strong></span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            O(n) Time • O(1) Auxiliary Space
          </Badge>
        </div>
      </div>

      {/* Linked List Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-4">
            Linked List Nodes (Cycle: Node 6 ──→ Node 3)
          </span>

          {/* Node Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 py-6">
            {nodes.map((n) => {
              const isSlowHere = slow === n;
              const isFastHere = fast === n;
              const isCycleEntrance = n === 3;

              return (
                <div key={n} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-2">
                    {/* Pointer Badges */}
                    <div className="h-6 flex items-center gap-1 font-mono text-[10px] font-bold">
                      {isSlowHere && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white shadow-xs">
                          🐢 Slow
                        </span>
                      )}
                      {isFastHere && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white shadow-xs">
                          🐇 Fast
                        </span>
                      )}
                    </div>

                    {/* Node Circle */}
                    <div
                      className={`h-14 w-14 rounded-full border-2 flex flex-col items-center justify-center font-mono font-bold text-sm shadow-md transition-all ${
                        isSlowHere && isFastHere
                          ? "bg-rose-500 text-white border-rose-400 ring-4 ring-rose-400/40 scale-110"
                          : isSlowHere
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500 ring-4 ring-emerald-500/20"
                          : isFastHere
                          ? "bg-amber-500/20 text-amber-400 border-amber-500 ring-4 ring-amber-500/20"
                          : isCycleEntrance
                          ? "bg-indigo-500/20 text-indigo-400 border-indigo-500 border-dashed"
                          : "bg-muted/40 border-border text-foreground"
                      }`}
                    >
                      <span>Node {n}</span>
                      {isCycleEntrance && (
                        <span className="text-[8px] font-mono text-indigo-300">Loop Entry</span>
                      )}
                    </div>
                  </div>

                  {/* Forward Arrow */}
                  {n < nodes.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-6" />
                  )}
                  {n === nodes.length - 1 && (
                    <span className="text-xs font-mono font-bold text-indigo-400 mt-6 pl-1 border-l-2 border-indigo-400">
                      ↩ loops to Node 3
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>{log}</span>
        </div>
      </Card>
    </div>
  );
}
