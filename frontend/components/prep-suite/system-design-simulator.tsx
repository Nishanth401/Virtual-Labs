"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Calculator,
  Server,
  Database,
  Layers,
  ArrowRight,
  ShieldAlert,
  Zap,
  Split,
  ChevronRight,
  Info
} from "lucide-react";

interface InterviewStage {
  id: number;
  name: string;
  durationMinutes: number;
  color: string;
  goal: string;
}

const STAGES: InterviewStage[] = [
  { id: 1, name: "1. Scope & Requirements", durationMinutes: 5, color: "text-blue-500", goal: "Clarify functional & non-functional requirements. Define scale and out-of-scope boundaries." },
  { id: 2, name: "2. Back-of-the-Envelope", durationMinutes: 5, color: "text-purple-500", goal: "Calculate QPS, peak throughput, storage over 5 years, memory cache (80/20 rule), and bandwidth." },
  { id: 3, name: "3. API & Data Model", durationMinutes: 10, color: "text-cyan-500", goal: "Design REST/gRPC endpoints, define SQL vs NoSQL storage paradigm, and outline schema entities." },
  { id: 4, name: "4. High-Level Design", durationMinutes: 15, color: "text-emerald-500", goal: "Draft end-to-end architecture: Clients, Load Balancers, Gateways, Services, Caching, and DB." },
  { id: 5, name: "5. Deep-Dive & Bottlenecks", durationMinutes: 10, color: "text-amber-500", goal: "Identify Single Points of Failure (SPOFs), replication lag, cache stampedes, and rate limiting." }
];

export function SystemDesignSimulator() {
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [totalSecondsRemaining, setTotalSecondsRemaining] = useState<number>(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Back-of-the-envelope Calculator State
  const [dauMillions, setDauMillions] = useState<number>(10); // 10 Million DAU
  const [readWriteRatio, setReadWriteRatio] = useState<number>(10); // 10:1 Read-to-Write
  const [writePayloadKb, setWritePayloadKb] = useState<number>(2); // 2 KB per write

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTotalSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  // Derived Capacity Metrics
  const dailySeconds = 86400;
  const writeOpsDaily = (dauMillions * 1_000_000 * 2); // 2 writes/day/user
  const readOpsDaily = writeOpsDaily * readWriteRatio;
  const writeQps = Math.round(writeOpsDaily / dailySeconds);
  const readQps = Math.round(readOpsDaily / dailySeconds);
  const peakQps = Math.round((readQps + writeQps) * 2); // 2x peak multiplier
  const dailyStorageGb = ((writeOpsDaily * writePayloadKb) / (1024 * 1024)).toFixed(2);
  const fiveYearStorageTb = (((Number(dailyStorageGb) * 365 * 5) / 1024)).toFixed(1);
  const ramCacheGb = (((readOpsDaily * writePayloadKb * 0.2) / (1024 * 1024))).toFixed(1); // 80/20 rule: 20% of reads cached

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const currentStage = STAGES[currentStageIdx];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30 font-mono font-bold">
            Interview Simulator
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            The 45-Minute System Design Interview Simulator
          </span>
        </div>

        {/* Master Countdown Timer Bar */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-card rounded-xl border border-border flex items-center gap-2.5 font-mono shadow-xs">
            <Clock className="h-4 w-4 text-purple-500 animate-pulse" />
            <span className="text-lg font-black text-foreground tracking-wider">
              {formatTimer(totalSecondsRemaining)}
            </span>
          </div>

          <Button
            size="sm"
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={`h-9 px-4 font-mono font-bold text-xs gap-1.5 ${
              isTimerRunning ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-primary text-primary-foreground"
            }`}
          >
            {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isTimerRunning ? "Pause" : "Start 45m Session"}</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setIsTimerRunning(false);
              setTotalSecondsRemaining(45 * 60);
              setCurrentStageIdx(0);
            }}
            className="h-9 w-9 rounded-xl"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 5-Stage Stepper Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
        {STAGES.map((stage, idx) => {
          const isActive = currentStageIdx === idx;
          const isCompleted = currentStageIdx > idx;
          return (
            <div
              key={stage.id}
              onClick={() => setCurrentStageIdx(idx)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isActive
                  ? "bg-purple-500/20 border-purple-500 shadow-md scale-[1.02]"
                  : isCompleted
                  ? "bg-muted/30 border-border/80 opacity-70"
                  : "bg-card border-border/60 hover:border-border"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className={`font-bold ${isActive ? "text-purple-400" : "text-muted-foreground"}`}>
                  Step {stage.id}
                </span>
                <Badge variant="outline" className="text-[10px]">
                  {stage.durationMinutes}m
                </Badge>
              </div>
              <span className="text-xs font-bold font-heading text-foreground mt-2 block">
                {stage.name.split(". ")[1]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Stage Interactive Work area */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div>
            <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider block">
              Stage Goal
            </span>
            <h3 className="text-lg font-bold font-heading text-foreground mt-1">
              {currentStage.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {currentStage.goal}
            </p>
          </div>

          <Button
            size="sm"
            onClick={() => setCurrentStageIdx((prev) => Math.min(STAGES.length - 1, prev + 1))}
            disabled={currentStageIdx >= STAGES.length - 1}
            className="h-8 text-xs font-mono font-bold gap-1"
          >
            <span>Next Stage</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* ========================================== */}
        {/* STAGE 1: REQUIREMENTS CHECKLIST            */}
        {/* ========================================== */}
        {currentStageIdx === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted/20 rounded-2xl border border-border space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-primary block">
                1. Functional Requirements (What features does it have?)
              </span>
              <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Core user journey (e.g. users can post tweets, follow users, view home timeline).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Clarify search and analytics scope (e.g. full-text search out of scope for MVP).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Device support: Mobile apps, Web clients, third-party public API keys.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-muted/20 rounded-2xl border border-border space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-purple-400 block">
                2. Non-Functional Requirements (System SLAs &amp; Guarantees)
              </span>
              <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>High Availability (HA):</strong> 99.99% uptime (four 9s = max 52 mins downtime/year).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Low Latency SLA:</strong> Read timeline latency p99 &lt; 50ms; write latency &lt; 200ms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Consistency Model:</strong> Eventual consistency is acceptable for feeds; strict consistency for payments.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* STAGE 2: BACK-OF-THE-ENVELOPE CALCULATOR   */}
        {/* ========================================== */}
        {currentStageIdx === 1 && (
          <div className="space-y-6">
            {/* Interactive Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-muted/20 rounded-2xl border border-border">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Daily Active Users:</span>
                  <span className="font-bold text-foreground">{dauMillions} Million</span>
                </div>
                <Slider
                  value={[dauMillions]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={(v) => setDauMillions(v[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Read-to-Write Ratio:</span>
                  <span className="font-bold text-foreground">{readWriteRatio} : 1</span>
                </div>
                <Slider
                  value={[readWriteRatio]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={(v) => setReadWriteRatio(v[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Write Payload Size:</span>
                  <span className="font-bold text-foreground">{writePayloadKb} KB</span>
                </div>
                <Slider
                  value={[writePayloadKb]}
                  min={1}
                  max={50}
                  step={1}
                  onValueChange={(v) => setWritePayloadKb(v[0])}
                />
              </div>
            </div>

            {/* Calculated Results Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 rounded-xl border border-border bg-card text-center">
                <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Write QPS</span>
                <span className="text-xl font-black font-mono text-foreground mt-1 block">{writeQps.toLocaleString()}</span>
                <span className="text-[9px] text-muted-foreground font-mono">ops / sec</span>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card text-center">
                <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Read QPS</span>
                <span className="text-xl font-black font-mono text-primary mt-1 block">{readQps.toLocaleString()}</span>
                <span className="text-[9px] text-muted-foreground font-mono">ops / sec</span>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card text-center">
                <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Peak QPS (2x)</span>
                <span className="text-xl font-black font-mono text-amber-500 mt-1 block">{peakQps.toLocaleString()}</span>
                <span className="text-[9px] text-muted-foreground font-mono">traffic burst</span>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card text-center">
                <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">5-Year Storage</span>
                <span className="text-xl font-black font-mono text-emerald-500 mt-1 block">{fiveYearStorageTb} TB</span>
                <span className="text-[9px] text-muted-foreground font-mono">{dailyStorageGb} GB / day</span>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card text-center">
                <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">RAM Cache (80/20)</span>
                <span className="text-xl font-black font-mono text-purple-400 mt-1 block">{ramCacheGb} GB</span>
                <span className="text-[9px] text-muted-foreground font-mono">Redis cluster</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* STAGE 3: API & SCHEMA DESIGN               */}
        {/* ========================================== */}
        {currentStageIdx === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted/20 rounded-2xl border border-border space-y-3 font-mono text-xs">
              <span className="font-bold text-primary block uppercase">REST API Endpoints Specification</span>
              <div className="space-y-2 text-muted-foreground">
                <div className="p-2.5 rounded-lg bg-card border border-border">
                  <span className="text-emerald-400 font-bold">POST</span> /v1/posts
                  <p className="text-[10px] text-muted-foreground mt-0.5">Payload: &#123; user_id, content, media_urls &#125;</p>
                </div>
                <div className="p-2.5 rounded-lg bg-card border border-border">
                  <span className="text-blue-400 font-bold">GET</span> /v1/users/&#123;id&#125;/timeline?limit=20&amp;cursor=xyz
                  <p className="text-[10px] text-muted-foreground mt-0.5">Returns array of Post entities + pagination cursor</p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-muted/20 rounded-2xl border border-border space-y-3 font-mono text-xs">
              <span className="font-bold text-purple-400 block uppercase">Database Choice &amp; Schema</span>
              <div className="p-3 rounded-xl bg-card border border-border space-y-1.5 leading-relaxed">
                <span className="text-foreground font-bold block">UserPosts Table (Cassandra / DynamoDB)</span>
                <p className="text-muted-foreground text-[11px]">
                  • Partition Key: <code>user_id (UUID)</code><br />
                  • Clustering Key: <code>created_at (Timestamp DESC)</code><br />
                  • Attributes: <code>post_id, content, likes_count, media_list</code>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* STAGE 4: HIGH-LEVEL ARCHITECTURE           */}
        {/* ========================================== */}
        {currentStageIdx === 3 && (
          <div className="p-6 bg-muted/20 rounded-2xl border border-border space-y-6">
            <span className="text-xs font-mono font-bold uppercase text-primary block">
              End-to-End System Topology (Client ──→ Storage)
            </span>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="p-4 rounded-xl bg-card border border-border text-center min-w-[120px]">
                <span className="text-xs font-mono font-bold text-foreground">Web / Mobile</span>
                <span className="text-[10px] text-muted-foreground block">Clients</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />

              <div className="p-4 rounded-xl bg-card border border-border text-center min-w-[120px]">
                <span className="text-xs font-mono font-bold text-blue-400">Route 53 DNS</span>
                <span className="text-[10px] text-muted-foreground block">Anycast Routing</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />

              <div className="p-4 rounded-xl bg-card border border-border text-center min-w-[120px]">
                <span className="text-xs font-mono font-bold text-purple-400">Load Balancer</span>
                <span className="text-[10px] text-muted-foreground block">Nginx / AWS ALB</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />

              <div className="p-4 rounded-xl bg-card border border-border text-center min-w-[120px]">
                <span className="text-xs font-mono font-bold text-primary">API Gateway</span>
                <span className="text-[10px] text-muted-foreground block">Auth &amp; Rate Limit</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />

              <div className="p-4 rounded-xl bg-card border border-border text-center min-w-[120px]">
                <span className="text-xs font-mono font-bold text-amber-500">Redis Cache</span>
                <span className="text-[10px] text-muted-foreground block">Sub-ms Timeline</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />

              <div className="p-4 rounded-xl bg-card border border-border text-center min-w-[120px]">
                <span className="text-xs font-mono font-bold text-emerald-500">Primary DB</span>
                <span className="text-[10px] text-muted-foreground block">Replication Cluster</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* STAGE 5: DEEP DIVE & BOTTLENECK AUDIT      */}
        {/* ========================================== */}
        {currentStageIdx === 4 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" />
                Single Points of Failure (SPOF)
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ensure load balancers have active-passive standby failovers via VRRP / Keepalived and multi-AZ database clustering.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <Zap className="h-4 w-4" />
                Cache Stampede Mitigation
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Apply TTL jitter (randomizing expiration by ±10%) and mutex locking around cache miss queries to prevent DB overload.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <span className="text-xs font-mono font-bold text-blue-400 flex items-center gap-1.5">
                <Split className="h-4 w-4" />
                Celebrity Fan-Out Problem
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Users with &gt;100k followers are not fanned out on write. Instead, their posts are merged into feeds on-demand (Pull model).
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
