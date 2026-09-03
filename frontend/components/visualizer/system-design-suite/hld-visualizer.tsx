"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Split,
  Zap,
  Database,
  Workflow,
  Share2,
  KeyRound,
  Play,
  RotateCcw,
  CheckCircle2,
  Server,
  Cpu,
  Layers,
  Activity,
  ArrowRight,
  ShieldAlert,
  Info
} from "lucide-react";

export type HldModule = 
  | "load-balancer" 
  | "caching" 
  | "sharding" 
  | "kafka" 
  | "consensus" 
  | "snowflake";

export function HLDVisualizer({ initialModule = "load-balancer" }: { initialModule?: HldModule }) {
  const [activeModule, setActiveModule] = useState<HldModule>(initialModule);

  // 1. Consistent Hashing Ring State
  const [nodes, setNodes] = useState<string[]>(["Node A (0°)", "Node B (90°)", "Node C (180°)", "Node D (270°)"]);
  const [requestKey, setRequestKey] = useState<string>("user_1084");
  const [assignedNode, setAssignedNode] = useState<string>("Node B (90°)");

  // 2. Caching Strategy
  const [cachePattern, setCachePattern] = useState<"aside" | "through" | "back">("aside");
  const [cacheStep, setCacheStep] = useState<number>(0);

  // 3. Database Sharding
  const [shardsCount, setShardsCount] = useState<number>(4);
  const [testId, setTestId] = useState<number>(42);

  // 4. Kafka Topic Partitions
  const [partitionOffset, setPartitionOffset] = useState<number[]>([14, 18, 11]);

  // 5. Raft Consensus State
  const [raftLeader, setRaftLeader] = useState<number>(1);
  const [term, setTerm] = useState<number>(3);
  const [heartbeatActive, setHeartbeatActive] = useState<boolean>(true);

  // 6. Snowflake ID State
  const [snowflakeTs, setSnowflakeTs] = useState<number>(Date.now());
  const [datacenterId, setDatacenterId] = useState<number>(3);
  const [workerId, setWorkerId] = useState<number>(7);
  const [sequence, setSequence] = useState<number>(142);

  // Handler for Consistent Hashing
  const handleRouteRequest = (key: string) => {
    setRequestKey(key);
    // Simple hash simulation
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) % 360;
    if (hash <= 90) setAssignedNode(nodes[1] || nodes[0]);
    else if (hash <= 180) setAssignedNode(nodes[2] || nodes[0]);
    else if (hash <= 270) setAssignedNode(nodes[3] || nodes[0]);
    else setAssignedNode(nodes[0]);
  };

  return (
    <div className="space-y-6">
      {/* Module Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30 font-mono font-bold">
            HLD Suite
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            High-Level System Design Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeModule === "load-balancer" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("load-balancer")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Split className="h-3.5 w-3.5 mr-1" />
            Load Balancer &amp; Ring
          </Button>
          <Button
            variant={activeModule === "caching" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("caching")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Zap className="h-3.5 w-3.5 mr-1" />
            Caching Patterns
          </Button>
          <Button
            variant={activeModule === "sharding" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("sharding")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Database className="h-3.5 w-3.5 mr-1" />
            DB Sharding
          </Button>
          <Button
            variant={activeModule === "kafka" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("kafka")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Workflow className="h-3.5 w-3.5 mr-1" />
            Kafka Partitions
          </Button>
          <Button
            variant={activeModule === "consensus" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("consensus")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Share2 className="h-3.5 w-3.5 mr-1" />
            Raft Consensus &amp; CAP
          </Button>
          <Button
            variant={activeModule === "snowflake" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("snowflake")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <KeyRound className="h-3.5 w-3.5 mr-1" />
            Snowflake ID (64-bit)
          </Button>
        </div>
      </div>

      {/* ========================================== */}
      {/* 1. LOAD BALANCER & CONSISTENT HASHING RING */}
      {/* ========================================== */}
      {activeModule === "load-balancer" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Consistent Hashing Hash Ring (0° to 360°)
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Requests map to the clockwise next available server node. Adding or removing a server only relocates k/N keys.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRouteRequest(`user_${Math.floor(Math.random() * 9000 + 1000)}`)}
                  className="h-8 text-xs font-mono font-bold"
                >
                  Generate New Request Key
                </Button>
              </div>
            </div>

            {/* Visual Ring Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {nodes.map((node, nIdx) => {
                const isAssigned = assignedNode === node;
                return (
                  <div
                    key={nIdx}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isAssigned
                        ? "bg-purple-500/20 border-purple-500 shadow-lg scale-105"
                        : "bg-muted/30 border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Server className={`h-5 w-5 ${isAssigned ? "text-purple-400" : "text-muted-foreground"}`} />
                      <Badge variant={isAssigned ? "default" : "outline"} className="text-[10px] font-mono">
                        {isAssigned ? "ROUTED TARGET" : "STANDBY"}
                      </Badge>
                    </div>

                    <div className="my-4">
                      <span className="text-base font-bold font-mono text-foreground block">{node}</span>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        IP: 10.0.1.{nIdx + 10} • Health: OK
                      </span>
                    </div>

                    {isAssigned && (
                      <div className="p-2 bg-purple-500/15 rounded-xl border border-purple-500/30 text-[11px] font-mono text-purple-300 flex items-center gap-1.5 animate-pulse">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Servicing {requestKey}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Routing Explanation Note */}
            <div className="p-4 bg-muted/30 rounded-xl border border-border text-xs font-mono text-muted-foreground space-y-1">
              <span className="text-foreground font-bold block">Current Route Decision:</span>
              <p>
                Request Key: <code className="text-purple-400 font-bold">{requestKey}</code> ──→ Hashes to degree position on circular ring ──→ Clockwise scan routes to <strong className="text-foreground">{assignedNode}</strong>.
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. CACHING STRATEGIES & PATTERNS           */}
      {/* ========================================== */}
      {activeModule === "caching" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Caching Topologies &amp; Write Invalidation Patterns
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Compare Cache-Aside (Lazy loading), Write-Through (Synchronous sync), and Write-Back (Asynchronous batching).
                </p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border text-xs">
                {(["aside", "through", "back"] as const).map((pat) => (
                  <Button
                    key={pat}
                    size="sm"
                    variant={cachePattern === pat ? "default" : "ghost"}
                    onClick={() => setCachePattern(pat)}
                    className="h-7 text-xs font-mono font-bold rounded-lg uppercase"
                  >
                    Cache-{pat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Visual Architecture Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-6 bg-muted/20 rounded-2xl border border-border">
              {/* App Server */}
              <div className="p-5 rounded-2xl bg-card border-2 border-primary/40 flex flex-col items-center text-center space-y-2">
                <Cpu className="h-8 w-8 text-primary" />
                <span className="font-bold text-sm text-foreground">Application Server</span>
                <span className="text-[11px] text-muted-foreground">API Worker Thread</span>
              </div>

              {/* Cache Layer */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/50 flex flex-col items-center text-center space-y-2">
                <Zap className="h-8 w-8 text-amber-500" />
                <span className="font-bold text-sm text-foreground">Redis / Memcached</span>
                <span className="text-[11px] text-amber-400 font-mono">Sub-millisecond RAM (LRU Pool)</span>
              </div>

              {/* Database Layer */}
              <div className="p-5 rounded-2xl bg-card border-2 border-border flex flex-col items-center text-center space-y-2">
                <Database className="h-8 w-8 text-emerald-500" />
                <span className="font-bold text-sm text-foreground">Primary Database</span>
                <span className="text-[11px] text-muted-foreground font-mono">Durable Disk Storage</span>
              </div>
            </div>

            {/* Pattern Explanation */}
            <div className="p-4 bg-muted/30 rounded-xl border border-border text-xs leading-relaxed space-y-2">
              <span className="font-bold text-foreground font-mono uppercase">
                {cachePattern === "aside" && "Cache-Aside Pattern (Lazy Loading):"}
                {cachePattern === "through" && "Write-Through Pattern (Strict Consistency):"}
                {cachePattern === "back" && "Write-Back / Write-Behind Pattern (High Throughput):"}
              </span>
              <p className="text-muted-foreground">
                {cachePattern === "aside" && "The application checks the cache first. If a cache miss occurs, it queries the database, writes the record into the cache with a TTL, and returns the result."}
                {cachePattern === "through" && "Data is written to the cache and the primary database simultaneously in a single synchronous transaction before returning success to the client."}
                {cachePattern === "back" && "Data is written exclusively to the fast cache in-memory immediately. The cache asynchronously batches and persists writes to the database in the background."}
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. DATABASE SHARDING & HORIZONTAL SCALING */}
      {/* ========================================== */}
      {activeModule === "sharding" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Database Hash-Based Horizontal Sharding
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Partition formula: <code>Shard ID = Hash(User_ID) % Number_Of_Shards</code>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground font-bold">User ID:</span>
                <input
                  type="number"
                  value={testId}
                  onChange={(e) => setTestId(Number(e.target.value) || 1)}
                  className="w-20 px-2 py-1 rounded-lg border border-border bg-background text-xs font-mono text-center font-bold"
                />
              </div>
            </div>

            {/* Shard Cluster Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: shardsCount }).map((_, sIdx) => {
                const isTargetShard = testId % shardsCount === sIdx;
                return (
                  <div
                    key={sIdx}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isTargetShard
                        ? "bg-emerald-500/20 border-emerald-500 shadow-md scale-105"
                        : "bg-muted/20 border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Database className={`h-6 w-6 ${isTargetShard ? "text-emerald-400" : "text-muted-foreground"}`} />
                      <Badge variant={isTargetShard ? "default" : "outline"} className="text-[10px] font-mono">
                        Shard {sIdx}
                      </Badge>
                    </div>

                    <div className="my-4">
                      <span className="text-sm font-mono font-bold text-foreground block">DB Node #{sIdx}</span>
                      <span className="text-[11px] text-muted-foreground font-mono mt-1 block">
                        Range: ID % {shardsCount} == {sIdx}
                      </span>
                    </div>

                    {isTargetShard ? (
                      <div className="p-2 bg-emerald-500/20 rounded-xl text-[11px] font-mono text-emerald-300 text-center font-bold animate-pulse">
                        User {testId} Stored Here!
                      </div>
                    ) : (
                      <div className="p-2 bg-muted/40 rounded-xl text-[11px] font-mono text-muted-foreground text-center">
                        Idle
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. KAFKA TOPIC PARTITIONS & CONSUMERS      */}
      {/* ========================================== */}
      {activeModule === "kafka" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Kafka Topic Partition Log &amp; Consumer Group Offsets
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Topics are distributed into partitions. Consumer group workers read with independent committed offsets.
                </p>
              </div>

              <Button
                size="sm"
                onClick={() => setPartitionOffset(prev => prev.map(o => o + Math.floor(Math.random() * 3 + 1)))}
                className="h-8 text-xs font-mono font-bold gap-1"
              >
                Produce Next Message Batch
              </Button>
            </div>

            {/* Partitions Visualization */}
            <div className="space-y-4">
              {partitionOffset.map((offset, pIdx) => (
                <div key={pIdx} className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-foreground">Topic: orders-v1 ── Partition [{pIdx}]</span>
                    <Badge variant="outline" className="text-[10px]">Committed Offset: {offset}</Badge>
                  </div>

                  {/* Offset Message Blocks */}
                  <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                    {Array.from({ length: 8 }).map((_, bIdx) => {
                      const msgOffset = offset - 7 + bIdx;
                      return (
                        <div
                          key={bIdx}
                          className="h-10 px-3 rounded-lg border border-border bg-card flex flex-col items-center justify-center text-[10px] font-mono font-bold text-muted-foreground shrink-0 shadow-xs"
                        >
                          <span>msg</span>
                          <span className="text-primary font-black">#{msgOffset}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* 5. RAFT CONSENSUS & CAP THEOREM           */}
      {/* ========================================== */}
      {activeModule === "consensus" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Raft Distributed Consensus (Term #{term})
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Heartbeats maintain leader authority. Quorum of (N/2 + 1) nodes required to commit state changes.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setTerm(t => t + 1);
                    setRaftLeader((raftLeader % 3) + 1);
                  }}
                  className="h-8 text-xs font-mono font-bold"
                >
                  Trigger Leader Election (Term {term + 1})
                </Button>
              </div>
            </div>

            {/* 3-Node Raft Cluster */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((nodeId) => {
                const isLeader = raftLeader === nodeId;
                return (
                  <div
                    key={nodeId}
                    className={`p-6 rounded-2xl border transition-all flex flex-col items-center text-center space-y-3 ${
                      isLeader
                        ? "bg-amber-500/15 border-amber-500 shadow-lg scale-105"
                        : "bg-muted/30 border-border"
                    }`}
                  >
                    <Server className={`h-8 w-8 ${isLeader ? "text-amber-400" : "text-muted-foreground"}`} />
                    <div>
                      <span className="text-base font-bold font-mono text-foreground block">Raft Node {nodeId}</span>
                      <Badge variant={isLeader ? "default" : "outline"} className="mt-1 font-mono text-[10px]">
                        {isLeader ? "👑 LEADER" : "FOLLOWER"}
                      </Badge>
                    </div>

                    <span className="text-xs font-mono text-muted-foreground">
                      {isLeader ? "Emitting Heartbeat (50ms)" : "Heartbeat Received: Healthy"}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* 6. TWITTER SNOWFLAKE 64-BIT UNIQUE ID     */}
      {/* ========================================== */}
      {activeModule === "snowflake" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Twitter Snowflake 64-Bit Unique ID Generator
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  1 Sign Bit • 41 Timestamp Bits (69 years) • 5 Datacenter Bits • 5 Worker Bits • 12 Sequence Bits (4096/ms)
                </p>
              </div>

              <Button
                size="sm"
                onClick={() => {
                  setSnowflakeTs(Date.now());
                  setSequence(s => (s + 1) % 4096);
                }}
                className="h-8 text-xs font-mono font-bold"
              >
                Generate Next 64-Bit ID
              </Button>
            </div>

            {/* 64-Bit Segment Breakdown Bar */}
            <div className="grid grid-cols-12 gap-2 p-4 bg-muted/20 rounded-2xl border border-border">
              {/* Sign Bit (1 bit) */}
              <div className="col-span-1 p-3 bg-card border border-border rounded-xl text-center flex flex-col justify-between">
                <span className="text-[10px] font-mono text-muted-foreground">Sign</span>
                <span className="text-lg font-bold font-mono text-foreground">0</span>
                <span className="text-[9px] text-muted-foreground font-mono">1 bit</span>
              </div>

              {/* Timestamp (41 bits) */}
              <div className="col-span-6 p-3 bg-purple-500/15 border border-purple-500/40 rounded-xl text-center flex flex-col justify-between">
                <span className="text-[10px] font-mono text-purple-400 font-bold">Epoch Milliseconds</span>
                <span className="text-lg font-bold font-mono text-purple-300">{snowflakeTs}</span>
                <span className="text-[9px] text-purple-400 font-mono">41 bits (~69 Years)</span>
              </div>

              {/* Datacenter (5 bits) */}
              <div className="col-span-2 p-3 bg-blue-500/15 border border-blue-500/40 rounded-xl text-center flex flex-col justify-between">
                <span className="text-[10px] font-mono text-blue-400 font-bold">Datacenter</span>
                <span className="text-lg font-bold font-mono text-blue-300">DC-{datacenterId}</span>
                <span className="text-[9px] text-blue-400 font-mono">5 bits (32 DCs)</span>
              </div>

              {/* Worker Machine (5 bits) */}
              <div className="col-span-1 p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl text-center flex flex-col justify-between">
                <span className="text-[10px] font-mono text-emerald-400 font-bold">Worker</span>
                <span className="text-lg font-bold font-mono text-emerald-300">W-{workerId}</span>
                <span className="text-[9px] text-emerald-400 font-mono">5 bits (32)</span>
              </div>

              {/* Sequence (12 bits) */}
              <div className="col-span-2 p-3 bg-amber-500/15 border border-amber-500/40 rounded-xl text-center flex flex-col justify-between">
                <span className="text-[10px] font-mono text-amber-400 font-bold">Sequence</span>
                <span className="text-lg font-bold font-mono text-amber-300">#{sequence}</span>
                <span className="text-[9px] text-amber-400 font-mono">12 bits (4096/ms)</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
