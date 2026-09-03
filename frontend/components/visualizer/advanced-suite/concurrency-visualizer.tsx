"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Play, RotateCcw, ChevronRight, ChevronLeft, Info, Lock, Unlock, ShieldAlert } from "lucide-react";

export function ConcurrencyVisualizer() {
  const [topic, setTopic] = useState<"mutex" | "philosophers">("mutex");
  const [stepIdx, setStepIdx] = useState<number>(0);

  // Mutex Lock Steps
  const mutexSteps = [
    { desc: "Threads T1 and T2 spawned. Mutex is UNLOCKED (0). Shared balance = $100.", t1State: "Idle", t2State: "Idle", isLocked: false, lockedBy: "None", balance: 100 },
    { desc: "T1 calls mutex.lock(): Lock acquired! T1 enters Critical Section.", t1State: "Running", t2State: "Idle", isLocked: true, lockedBy: "Thread 1", balance: 100 },
    { desc: "T2 calls mutex.lock(): Mutex is already held by T1! T2 is BLOCKED and put in Wait Queue.", t1State: "Running", t2State: "Blocked", isLocked: true, lockedBy: "Thread 1", balance: 100 },
    { desc: "T1 updates balance: balance = balance + $50 = $150. Safe from race conditions!", t1State: "Running", t2State: "Blocked", isLocked: true, lockedBy: "Thread 1", balance: 150 },
    { desc: "T1 calls mutex.unlock(): Lock released! T2 is unblocked and notified.", t1State: "Idle", t2State: "Ready", isLocked: false, lockedBy: "None", balance: 150 },
    { desc: "🎉 T2 acquires lock and enters Critical Section! Mutex prevented dirty reads & race conditions.", t1State: "Idle", t2State: "Running", isLocked: true, lockedBy: "Thread 2", balance: 150 }
  ];

  // Dining Philosophers Steps
  const philoSteps = [
    { desc: "5 Philosophers seated at round table with 5 chopsticks. All currently THINKING.", states: ["Thinking", "Thinking", "Thinking", "Thinking", "Thinking"] },
    { desc: "Philosopher 0 and Philosopher 2 pick up both adjacent chopsticks. States: EATING!", states: ["Eating", "Thinking", "Eating", "Thinking", "Thinking"] },
    { desc: "Philosopher 1 tries to eat: Left chopstick held by P0, right by P2. P1 is WAITING (Hungry)!", states: ["Eating", "Waiting", "Eating", "Thinking", "Thinking"] },
    { desc: "Philosopher 0 and 2 finish eating and put down chopsticks. Philosopher 1 and 3 now acquire chopsticks and EAT!", states: ["Thinking", "Eating", "Thinking", "Eating", "Thinking"] },
    { desc: "🎉 Resource Hierarchy / Asymmetric solution prevents circular wait: Zero DEADLOCK achieved!", states: ["Thinking", "Thinking", "Thinking", "Thinking", "Thinking"] }
  ];

  const curM = mutexSteps[Math.min(stepIdx, mutexSteps.length - 1)];
  const curP = philoSteps[Math.min(stepIdx, philoSteps.length - 1)];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">
            Phase 6: Concurrency &amp; Multithreading
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Mutex Locks, Race Conditions &amp; Deadlock Prevention
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Concurrency &amp; Multithreading Studio
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Explore synchronization primitives, Critical Section Mutual Exclusion (Mutex), Semaphore bounds, and classic deadlock avoidance in the Dining Philosophers problem.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60">
            <Button
              variant={topic === "mutex" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setTopic("mutex"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              Mutex &amp; Critical Section
            </Button>
            <Button
              variant={topic === "philosophers" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setTopic("philosophers"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              Dining Philosophers
            </Button>
          </div>

          <Button
            size="sm"
            onClick={() => setStepIdx(p => p + 1)}
            disabled={stepIdx >= (topic === "mutex" ? mutexSteps.length - 1 : philoSteps.length - 1)}
            className="h-8 text-xs font-bold gap-1 rounded-xl bg-primary text-primary-foreground"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Next Event</span>
          </Button>

          <Button size="sm" variant="outline" onClick={() => setStepIdx(0)} className="h-8 w-8 p-0 rounded-xl" title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            Thread Synchronization &amp; Atomic Primitives
          </Badge>
        </div>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div className="flex flex-col items-center justify-center py-4">
          {topic === "mutex" ? (
            <div className="space-y-6 w-full max-w-lg">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-border">
                <div className="flex items-center gap-2 font-mono text-xs">
                  {curM.isLocked ? (
                    <Lock className="h-5 w-5 text-rose-500" />
                  ) : (
                    <Unlock className="h-5 w-5 text-emerald-500" />
                  )}
                  <span>Status: <strong>{curM.isLocked ? `LOCKED by ${curM.lockedBy}` : "UNLOCKED"}</strong></span>
                </div>
                <div className="font-mono text-xs">
                  Shared Balance: <strong className="text-emerald-400 text-sm">${curM.balance}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border flex flex-col items-center ${
                  curM.t1State === "Running" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold" : "bg-card border-border"
                }`}>
                  <span className="font-mono text-xs">Thread 1</span>
                  <span className="text-lg font-bold mt-1 font-heading">{curM.t1State}</span>
                </div>

                <div className={`p-4 rounded-2xl border flex flex-col items-center ${
                  curM.t2State === "Blocked" ? "bg-rose-500/20 border-rose-500 text-rose-400 font-bold" : curM.t2State === "Running" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold" : "bg-card border-border"
                }`}>
                  <span className="font-mono text-xs">Thread 2</span>
                  <span className="text-lg font-bold mt-1 font-heading">{curM.t2State}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 w-full max-w-xl text-center">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block font-bold">
                5 Philosophers Dining Table
              </span>
              <div className="flex flex-wrap items-center justify-center gap-3 py-4">
                {curP.states.map((st, idx) => (
                  <div
                    key={idx}
                    className={`h-24 w-24 rounded-2xl border-2 flex flex-col items-center justify-center p-2 transition-all ${
                      st === "Eating"
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-md scale-105"
                        : st === "Waiting"
                        ? "bg-amber-500/20 border-amber-500 text-amber-400"
                        : "bg-muted/30 border-border text-muted-foreground"
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold">Philo {idx}</span>
                    <span className="text-xs font-bold mt-1 font-heading">{st}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>{topic === "mutex" ? curM.desc : curP.desc}</span>
        </div>
      </Card>
    </div>
  );
}
