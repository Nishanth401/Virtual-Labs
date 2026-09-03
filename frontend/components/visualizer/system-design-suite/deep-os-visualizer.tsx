"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  Terminal,
  HardDrive,
  Layers,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sliders,
  Zap,
  Activity,
  Info
} from "lucide-react";

export type DeepOsModule = 
  | "virtual-memory" 
  | "cfs-scheduler" 
  | "inode-fs";

export function DeepOSVisualizer({ initialModule = "virtual-memory" }: { initialModule?: DeepOsModule }) {
  const [activeModule, setActiveModule] = useState<DeepOsModule>(initialModule);

  // 1. Virtual Memory State
  const [virtualAddr, setVirtualAddr] = useState<string>("0x7FFF1234");
  const [tlbState, setTlbState] = useState<"hit" | "miss" | "fault">("hit");

  // 2. CFS Scheduler Tasks
  const [tasks, setTasks] = useState([
    { pid: 101, name: "nginx-worker", vruntime: 120, nice: 0, priority: "Normal" },
    { pid: 102, name: "postgres-query", vruntime: 85, nice: -5, priority: "High" },
    { pid: 103, name: "cron-job", vruntime: 240, nice: 10, priority: "Low" },
  ]);

  // 3. Inode FS State
  const [inodeFileSize, setInodeFileSize] = useState<number>(64); // KB

  return (
    <div className="space-y-6">
      {/* Module Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono font-bold">
            Kernel Suite
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Deep-Dive Operating Systems &amp; Kernel Internals
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeModule === "virtual-memory" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("virtual-memory")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Cpu className="h-3.5 w-3.5 mr-1" />
            Virtual Memory &amp; MMU
          </Button>
          <Button
            variant={activeModule === "cfs-scheduler" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("cfs-scheduler")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Terminal className="h-3.5 w-3.5 mr-1" />
            Linux CFS Scheduler
          </Button>
          <Button
            variant={activeModule === "inode-fs" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("inode-fs")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <HardDrive className="h-3.5 w-3.5 mr-1" />
            Inode &amp; File Systems
          </Button>
        </div>
      </div>

      {/* ========================================== */}
      {/* 1. VIRTUAL MEMORY & MMU PAGING             */}
      {/* ========================================== */}
      {activeModule === "virtual-memory" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  MMU Two-Level Page Table Address Translation
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Translates 32-bit Virtual Address: Page Directory (10 bits) + Page Table (10 bits) + Offset (12 bits).
                </p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border text-xs">
                {(["hit", "miss", "fault"] as const).map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={tlbState === status ? "default" : "ghost"}
                    onClick={() => setTlbState(status)}
                    className="h-7 text-xs font-mono font-bold rounded-lg uppercase"
                  >
                    TLB {status}
                  </Button>
                ))}
              </div>
            </div>

            {/* Address Bit Fields */}
            <div className="grid grid-cols-12 gap-2 p-4 bg-muted/20 rounded-2xl border border-border text-center font-mono">
              <div className="col-span-4 p-3 bg-amber-500/15 border border-amber-500/40 rounded-xl">
                <span className="text-[10px] text-amber-500 font-bold block">Page Directory Index</span>
                <span className="text-base font-bold text-foreground">Bits [31:22]</span>
                <span className="text-[9px] text-muted-foreground block mt-1">1024 Directory Entries</span>
              </div>

              <div className="col-span-4 p-3 bg-blue-500/15 border border-blue-500/40 rounded-xl">
                <span className="text-[10px] text-blue-400 font-bold block">Page Table Index</span>
                <span className="text-base font-bold text-foreground">Bits [21:12]</span>
                <span className="text-[9px] text-muted-foreground block mt-1">1024 Page Table Entries</span>
              </div>

              <div className="col-span-4 p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl">
                <span className="text-[10px] text-emerald-400 font-bold block">Physical Frame Offset</span>
                <span className="text-base font-bold text-foreground">Bits [11:0]</span>
                <span className="text-[9px] text-muted-foreground block mt-1">4KB Frame Granularity</span>
              </div>
            </div>

            {/* Translation Status Badge */}
            <div className="p-4 bg-card rounded-xl border border-border flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <span>Active Lookup: {virtualAddr}</span>
              </div>
              <Badge
                variant={tlbState === "hit" ? "default" : tlbState === "miss" ? "secondary" : "destructive"}
                className="font-bold text-xs"
              >
                {tlbState === "hit" && "⚡ TLB HIT (1 CPU Cycle)"}
                {tlbState === "miss" && "⚠️ TLB MISS (Page Table Walk: ~50ns)"}
                {tlbState === "fault" && "🚨 PAGE FAULT (OS Swaps From Disk: ~5ms)"}
              </Badge>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. LINUX CFS SCHEDULER (COMPLETELY FAIR)   */}
      {/* ========================================== */}
      {activeModule === "cfs-scheduler" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Linux Completely Fair Scheduler (CFS) Runqueue
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Tasks stored in Red-Black tree indexed by <code>vruntime</code>. Task with lowest vruntime executes next.
                </p>
              </div>

              <Button
                size="sm"
                onClick={() => {
                  setTasks((prev) =>
                    prev.map((t, idx) => ({
                      ...t,
                      vruntime: idx === 0 ? t.vruntime + 30 : t.vruntime,
                    })).sort((a, b) => a.vruntime - b.vruntime)
                  );
                }}
                className="h-8 text-xs font-mono font-bold"
              >
                Simulate 1 CPU Timeslice
              </Button>
            </div>

            {/* Tasks Queue Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tasks.map((task, idx) => {
                const isNext = idx === 0;
                return (
                  <div
                    key={task.pid}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isNext
                        ? "bg-amber-500/20 border-amber-500 shadow-md scale-105"
                        : "bg-muted/20 border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-muted-foreground">PID: {task.pid}</span>
                      <Badge variant={isNext ? "default" : "outline"} className="text-[10px] font-mono">
                        {isNext ? "RUNNING ON CPU" : "WAITING"}
                      </Badge>
                    </div>

                    <div className="my-3">
                      <span className="text-base font-bold font-mono text-foreground block">{task.name}</span>
                      <span className="text-xs text-muted-foreground font-mono mt-0.5 block">
                        vruntime: <strong className="text-amber-400">{task.vruntime} ms</strong>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-2 border-t border-border/60">
                      <span>Nice: {task.nice}</span>
                      <span>Priority: {task.priority}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. INODE FILE SYSTEM & JOURNALING          */}
      {/* ========================================== */}
      {activeModule === "inode-fs" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Unix / Ext4 Inode Metadata Architecture
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  12 Direct Pointers • 1 Single Indirect Pointer • 1 Double Indirect Pointer • 1 Triple Indirect Pointer.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground font-bold">File Size:</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setInodeFileSize(s => s >= 512 ? 32 : s * 2)}
                  className="h-8 text-xs font-mono font-bold"
                >
                  {inodeFileSize} KB
                </Button>
              </div>
            </div>

            {/* Inode Pointer Architecture Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className={`p-4 rounded-xl border ${inodeFileSize <= 48 ? "bg-amber-500/20 border-amber-500" : "bg-muted/20 border-border"}`}>
                <span className="text-xs font-mono font-bold block text-foreground">12 Direct Blocks</span>
                <span className="text-[11px] text-muted-foreground mt-1 block">
                  Capacity: Up to 48 KB (12 × 4KB)
                </span>
              </div>

              <div className={`p-4 rounded-xl border ${inodeFileSize > 48 && inodeFileSize <= 4096 ? "bg-blue-500/20 border-blue-500" : "bg-muted/20 border-border"}`}>
                <span className="text-xs font-mono font-bold block text-foreground">Single Indirect</span>
                <span className="text-[11px] text-muted-foreground mt-1 block">
                  Capacity: Up to 4 MB (1024 blocks)
                </span>
              </div>

              <div className="p-4 rounded-xl border bg-muted/20 border-border">
                <span className="text-xs font-mono font-bold block text-foreground">Double Indirect</span>
                <span className="text-[11px] text-muted-foreground mt-1 block">
                  Capacity: Up to 4 GB (1024² blocks)
                </span>
              </div>

              <div className="p-4 rounded-xl border bg-muted/20 border-border">
                <span className="text-xs font-mono font-bold block text-foreground">Triple Indirect</span>
                <span className="text-[11px] text-muted-foreground mt-1 block">
                  Capacity: Up to 4 TB (1024³ blocks)
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
