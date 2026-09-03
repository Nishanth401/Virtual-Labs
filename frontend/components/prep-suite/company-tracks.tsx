"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Target,
  Award,
  Zap,
  Info
} from "lucide-react";

interface CompanyTrack {
  id: string;
  name: string;
  badgeColor: string;
  interviewFormat: string[];
  keyEmphasis: string;
  recommendedTopics: {
    title: string;
    href: string;
    whyTested: string;
    difficulty: "Medium" | "Hard";
  }[];
}

const TRACKS: Record<string, CompanyTrack> = {
  google: {
    id: "google",
    name: "Google Engineering Track",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    keyEmphasis: "Heavy emphasis on Graph algorithms, Dynamic Programming, Segment Trees, Scalability, and handling ambiguity with clean mathematical abstractions.",
    interviewFormat: [
      "1. Recruiter Fit Screen (30m)",
      "2. Technical Phone Screen: 1-2 Algorithmic coding problems (45m)",
      "3. Onsite Loop: 3 Algorithmic Coding Rounds (45m each)",
      "4. Onsite Loop: 1 System Design (HLD) Round (45m)",
      "5. Onsite Loop: 1 'Googliness' & Leadership Behavioral Round (45m)"
    ],
    recommendedTopics: [
      { title: "KMP String Matching (LPS Table)", href: "/visualizer/algo-kmp-string", whyTested: "Sublinear pattern matching without text index rewind.", difficulty: "Hard" },
      { title: "Line Sweep & Geometry", href: "/visualizer/algo-line-sweep", whyTested: "Classic Google Meeting Rooms & Skyline interval overlap.", difficulty: "Hard" },
      { title: "Game Theory & Minimax with Alpha-Beta", href: "/visualizer/algo-minimax", whyTested: "Game state recursion and branch pruning.", difficulty: "Hard" },
      { title: "Distributed Consensus (Raft)", href: "/visualizer/hld-distributed-consensus", whyTested: "Distributed coordination (Chubby, Spanner Paxos).", difficulty: "Hard" },
      { title: "Advanced Tree & Digit DP", href: "/visualizer/algo-advanced-dp", whyTested: "High-tier DP state compression frequently tested.", difficulty: "Hard" }
    ]
  },
  amazon: {
    id: "amazon",
    name: "Amazon SDE Track",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    keyEmphasis: "Heavy emphasis on the 16 Leadership Principles (tested in EVERY round), Low-Level Design (Machine Coding with SOLID principles), and Scalable Distributed Systems.",
    interviewFormat: [
      "1. Online Assessment (OA): 2 Coding questions + Work Style Survey (90m)",
      "2. Onsite Loop: 1 Low-Level Design (LLD) / Machine Coding + LP (60m)",
      "3. Onsite Loop: 1 High-Level System Design (HLD) + LP (60m)",
      "4. Onsite Loop: 2 Data Structures & Problem Solving + LP (60m each)",
      "5. Onsite Loop: 1 Bar Raiser Behavioral & Architecture Deep Dive (60m)"
    ],
    recommendedTopics: [
      { title: "Machine Coding & LLD Studio", href: "/visualizer/machine-coding", whyTested: "Core Amazon round: Parking Lot, Splitwise, Elevator design.", difficulty: "Medium" },
      { title: "16 Leadership Principles (STAR)", href: "/interview-prep/behavioral", whyTested: "Amazon dealbreaker: 50% of your interview score is LP.", difficulty: "Medium" },
      { title: "Load Balancers & Consistent Hashing", href: "/visualizer/hld-load-balancers", whyTested: "Amazon Dynamo ring architecture and partition routing.", difficulty: "Medium" },
      { title: "Database Sharding & Replication", href: "/visualizer/hld-database-sharding", whyTested: "Partition keys, hot partition mitigation, DynamoDB.", difficulty: "Hard" },
      { title: "Caching Strategies & CDNs", href: "/visualizer/hld-caching-cdn", whyTested: "Write-through and Cache-aside caching in AWS CloudFront.", difficulty: "Medium" }
    ]
  },
  meta: {
    id: "meta",
    name: "Meta Engineering Track",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    keyEmphasis: "Extremely fast execution pace: Candidates must solve 2 medium/hard questions in 45 minutes with bug-free code, followed by Product Architecture System Design.",
    interviewFormat: [
      "1. Technical Phone Screen: 2 Coding problems at high speed (45m)",
      "2. Onsite Loop: 2 Algorithmic Coding Rounds (2 problems in 45m each)",
      "3. Onsite Loop: 1 Product Architecture / System Design Round (45m)",
      "4. Onsite Loop: 1 Behavioral Round ('Move Fast', 'Impact') (45m)"
    ],
    recommendedTopics: [
      { title: "Sliding Window & Two Pointers (SRS)", href: "/interview-prep/analytics", whyTested: "Meta loves fast pointer partition and window problems.", difficulty: "Medium" },
      { title: "45-Minute System Design Simulator", href: "/interview-prep/system-design-simulator", whyTested: "Strictly adhere to the 45-min pacing required by Meta.", difficulty: "Hard" },
      { title: "Message Brokers & Kafka Partitions", href: "/visualizer/hld-message-brokers", whyTested: "Real-time feed ingestion and event streaming.", difficulty: "Hard" },
      { title: "Twitter Snowflake 64-Bit ID", href: "/visualizer/hld-unique-id", whyTested: "Generating billions of unique IDs across global data centers.", difficulty: "Medium" },
      { title: "WebSockets vs SSE Real-Time", href: "/visualizer/net-realtime-comms", whyTested: "Messenger and Instagram real-time notification streams.", difficulty: "Medium" }
    ]
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft Engineering Track",
    badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    keyEmphasis: "Strong focus on fundamental data structures, Linked Lists, Trees, Multithreading/Concurrency primitives, and OS Kernel mechanisms.",
    interviewFormat: [
      "1. Technical Phone Screen (45m)",
      "2. Onsite Loop: 3 Data Structures & Algorithm Rounds (45m each)",
      "3. Onsite Loop: 1 System Design (Azure Cloud Architecture) (45m)",
      "4. Onsite Loop: 1 'As-Appropriate' (AA) Executive Bar Raiser Round (45m)"
    ],
    recommendedTopics: [
      { title: "Concurrency & Multithreading Studio", href: "/visualizer/concurrency-studio", whyTested: "Mutexes, Semaphores, Producer-Consumer, and Deadlocks.", difficulty: "Medium" },
      { title: "Virtual Memory & MMU Paging", href: "/visualizer/os-virtual-memory", whyTested: "OS internals, page tables, TLB hits/misses.", difficulty: "Hard" },
      { title: "Process Scheduling (Linux CFS)", href: "/visualizer/os-cfs-scheduler", whyTested: "CPU time slicing, vruntime, priority scheduling.", difficulty: "Medium" },
      { title: "TCP 3-Way Handshake & Flow", href: "/visualizer/net-tcp-handshake", whyTested: "Network reliability, packet drops, and sliding window.", difficulty: "Medium" },
      { title: "DBMS B-Tree Indexing & ACID", href: "/visualizer/dbms-sql", whyTested: "SQL Server internals and query execution plans.", difficulty: "Medium" }
    ]
  }
};

export function CompanyTracks() {
  const [selectedCompanyKey, setSelectedCompanyKey] = useState<string>("google");

  const track = TRACKS[selectedCompanyKey];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30 font-mono font-bold">
            Company Tracks
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Targeted Product Company Preparation Tracks
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          {Object.keys(TRACKS).map((key) => {
            const trk = TRACKS[key];
            const isSelected = selectedCompanyKey === key;
            return (
              <Button
                key={key}
                variant={isSelected ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCompanyKey(key)}
                className="h-8 text-xs font-semibold rounded-lg capitalize"
              >
                {key} Track
              </Button>
            );
          })}
        </div>
      </div>

      {/* Track Overview Card */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div>
            <Badge variant="outline" className={`text-xs font-mono mb-1 ${track.badgeColor}`}>
              {track.name}
            </Badge>
            <h3 className="text-2xl font-black font-heading text-foreground">
              {track.name} Strategy Guide
            </h3>
            <p className="text-xs text-muted-foreground max-w-2xl mt-1 leading-relaxed">
              {track.keyEmphasis}
            </p>
          </div>
        </div>

        {/* 2-Column Grid: Round Format & Curated Topics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interview Stages Breakdown */}
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase text-primary block">
              Typical Onsite Interview Structure
            </span>
            <div className="space-y-2">
              {track.interviewFormat.map((fmt, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-border bg-muted/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-foreground font-medium">{fmt}</span>
                  <Badge variant="outline" className="text-[10px]">Standard</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Curated Recommended Modules */}
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase text-purple-400 block">
              Curated Practice Checklist
            </span>
            <div className="space-y-2.5">
              {track.recommendedTopics.map((top, idx) => (
                <Link
                  key={idx}
                  href={top.href}
                  className="p-3.5 rounded-xl border border-border bg-muted/20 hover:border-primary/50 transition-all flex items-center justify-between group block"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-heading text-foreground group-hover:text-primary transition-colors">
                        {top.title}
                      </span>
                      <Badge variant={top.difficulty === "Hard" ? "destructive" : "secondary"} className="text-[9px] font-mono">
                        {top.difficulty}
                      </Badge>
                    </div>
                    <span className="text-[11px] text-muted-foreground block">
                      {top.whyTested}
                    </span>
                  </div>

                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
