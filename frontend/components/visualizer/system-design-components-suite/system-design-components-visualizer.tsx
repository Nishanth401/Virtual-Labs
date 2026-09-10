"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Server,
  Filter,
  Users,
  HardDrive,
  Cpu,
  KeyRound,
  RotateCcw,
  Sparkles,
  Layers,
  Activity
} from "lucide-react";

export type SystemDesignModule =
  | "consistent-hashing-deep"
  | "bloom-filter-caching"
  | "sticky-sessions"
  | "write-through-write-behind"
  | "token-leaky-bucket"
  | "lease-distributed-locks";

interface Props {
  initialModule?: SystemDesignModule;
}

export function SystemDesignComponentsVisualizer({ initialModule = "consistent-hashing-deep" }: Props) {
  const [activeModule, setActiveModule] = useState<SystemDesignModule>(initialModule);

  // Rate Limiting Demo State
  const [tokensAvailable, setTokensAvailable] = useState(7);

  return (
    <div className="space-y-6">
      {/* Module Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 font-mono font-bold">
            System Design
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Distributed Systems &amp; High-Scale Components Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeModule === "consistent-hashing-deep" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("consistent-hashing-deep")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Server className="h-3.5 w-3.5 mr-1" />
            Consistent Hashing
          </Button>
          <Button
            variant={activeModule === "bloom-filter-caching" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("bloom-filter-caching")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Filter className="h-3.5 w-3.5 mr-1" />
            Bloom Caching
          </Button>
          <Button
            variant={activeModule === "sticky-sessions" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("sticky-sessions")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Users className="h-3.5 w-3.5 mr-1" />
            Sticky Sessions
          </Button>
          <Button
            variant={activeModule === "write-through-write-behind" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("write-through-write-behind")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <HardDrive className="h-3.5 w-3.5 mr-1" />
            Write-Through / Behind
          </Button>
          <Button
            variant={activeModule === "token-leaky-bucket" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("token-leaky-bucket")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Cpu className="h-3.5 w-3.5 mr-1" />
            Token vs Leaky Bucket
          </Button>
          <Button
            variant={activeModule === "lease-distributed-locks" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("lease-distributed-locks")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <KeyRound className="h-3.5 w-3.5 mr-1" />
            Distributed Locks
          </Button>
        </div>
      </div>

      {/* Module 1: Consistent Hashing */}
      {activeModule === "consistent-hashing-deep" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Server className="h-5 w-5 text-blue-500" />
                  Consistent Hashing &amp; Virtual Nodes (vnodes)
                </CardTitle>
                <CardDescription>
                  Distribute keys across circular hash ring [0..2³² - 1] where adding or removing a server migrates only K/N keys.
                </CardDescription>
              </div>
              <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
                Key Migration: K / N
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border space-y-3 font-mono text-xs">
              <div className="text-sm font-bold text-blue-400">Circular Hash Ring Topology:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="font-bold text-blue-400">Node A (3 Virtual Nodes)</div>
                  <div className="text-muted-foreground mt-1">Positions: 120°, 240°, 350°</div>
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                  <div className="font-bold text-emerald-400">Node B (3 Virtual Nodes)</div>
                  <div className="text-muted-foreground mt-1">Positions: 40°, 160°, 280°</div>
                </div>
                <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <div className="font-bold text-purple-400">Node C (3 Virtual Nodes)</div>
                  <div className="text-muted-foreground mt-1">Positions: 80°, 200°, 320°</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 2: Bloom Filters in Distributed Caching */}
      {activeModule === "bloom-filter-caching" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Filter className="h-5 w-5 text-indigo-500" />
                  Bloom Filters in Distributed Caching (Cache Penetration Defense)
                </CardTitle>
                <CardDescription>
                  Intercept non-existent malicious/missing keys before querying Redis cache or PostgreSQL database to prevent cache penetration.
                </CardDescription>
              </div>
              <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
                Cache Defense
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-indigo-400">Request Interception Workflow:</div>
              <div>Client ──→ Bloom Filter Check: NOT FOUND ──→ Return 404 (DB is NEVER touched!)</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 3: Sticky Sessions */}
      {activeModule === "sticky-sessions" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal-500" />
                  Sticky Sessions &amp; Session Affinity
                </CardTitle>
                <CardDescription>
                  Load balancers route all consecutive requests from the same user to the identical backend instance via IP Hash or Cookie Injection.
                </CardDescription>
              </div>
              <Badge className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30">
                Load Balancing
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-teal-400">Affinity Mechanism:</div>
              <div>Set-Cookie: SERVERID=backend_03; HttpOnly; SameSite=Lax</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 4: Write-Through vs Write-Behind */}
      {activeModule === "write-through-write-behind" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-amber-500" />
                  Write-Through vs. Write-Behind (Write-Back) Caching
                </CardTitle>
                <CardDescription>
                  Compare synchronous durable cache updates (Write-Through) vs asynchronous buffered batched disk writes (Write-Behind).
                </CardDescription>
              </div>
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                Durability vs Latency
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-muted/40 rounded-xl border border-border">
                <div className="font-bold text-foreground">Write-Through Caching</div>
                <div className="text-muted-foreground mt-2">• App writes to Cache &amp; DB synchronously</div>
                <div className="text-emerald-400 font-bold mt-1">High data consistency, higher write latency</div>
              </div>
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <div className="font-bold text-amber-400">Write-Behind (Write-Back)</div>
                <div className="text-muted-foreground mt-2">• App writes to Cache; async worker batches writes to DB</div>
                <div className="text-amber-400 font-bold mt-1">Ultra-low write latency; risk of loss on crash</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 5: Token Bucket vs Leaky Bucket */}
      {activeModule === "token-leaky-bucket" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-purple-500" />
                  Token Bucket vs. Leaky Bucket Rate Limiting
                </CardTitle>
                <CardDescription>
                  Token Bucket accommodates short traffic bursts; Leaky Bucket forces smooth, constant outflow traffic shaping.
                </CardDescription>
              </div>
              <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30">
                API Rate Limiting
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                onClick={() => setTokensAvailable((t) => Math.max(0, t - 1))}
                disabled={tokensAvailable <= 0}
              >
                Consume Token (Send API Request)
              </Button>
              <Button size="sm" variant="outline" onClick={() => setTokensAvailable(10)}>
                Refill Bucket (10 Tokens)
              </Button>
            </div>

            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="text-purple-400 font-bold">Bucket Capacity: 10 Tokens | Current Tokens: {tokensAvailable}</div>
              <div className="text-muted-foreground">
                {tokensAvailable > 0
                  ? "HTTP 200 OK: Request processed within rate quota."
                  : "HTTP 429 Too Many Requests: Rate limit exceeded. Try again in 1 second."}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 6: Lease-Based Distributed Locks */}
      {activeModule === "lease-distributed-locks" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-rose-500" />
                  Lease-Based Distributed Locks &amp; Fencing Tokens
                </CardTitle>
                <CardDescription>
                  Fault-tolerant locking via Redis Redlock / etcd leases with monotonic fencing tokens to prevent split-brain race conditions.
                </CardDescription>
              </div>
              <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
                Fencing Tokens
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-rose-400">Fencing Token Invariant:</div>
              <div>Client 1 acquires Lock (Token: 33) → GC Pause occurs → Lease expires → Client 2 acquires Lock (Token: 34). Storage rejects late write from Token 33!</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
