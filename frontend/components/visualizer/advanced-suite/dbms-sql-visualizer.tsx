"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HardDrive, Play, RotateCcw, ChevronRight, ChevronLeft, Info, CheckCircle2 } from "lucide-react";

export function DBMSSQLVisualizer() {
  const [topic, setTopic] = useState<"btree" | "acid">("btree");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">
            Phase 6: DBMS &amp; SQL Engineering
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            B-Tree Indexing &amp; ACID Transaction Isolation
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          DBMS &amp; SQL Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Explore relational storage engines. Visualize B-Tree disk page splits, logarithmic search queries, and ACID transactional guarantees (Atomicity, Consistency, Isolation, Durability).
        </p>
      </div>

      {/* Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-2">
          <Button
            variant={topic === "btree" ? "default" : "outline"}
            size="sm"
            onClick={() => setTopic("btree")}
            className="h-8 text-xs font-bold rounded-xl"
          >
            B-Tree Index Structure
          </Button>
          <Button
            variant={topic === "acid" ? "default" : "outline"}
            size="sm"
            onClick={() => setTopic("acid")}
            className="h-8 text-xs font-bold rounded-xl"
          >
            ACID Properties
          </Button>
        </div>

        <Badge variant="outline" className="text-[10px] font-mono bg-primary/10 text-primary border-primary/20">
          O(log_B N) Disk Block I/O
        </Badge>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        {topic === "btree" ? (
          <div className="space-y-6 max-w-2xl mx-auto py-2">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center font-bold">
              B+ Tree Multi-Level Index Node Hierarchy
            </span>

            {/* Root Page */}
            <div className="flex justify-center">
              <div className="p-3 bg-primary/20 border-2 border-primary rounded-xl font-mono text-xs font-bold text-primary flex items-center gap-3">
                <span>Root Page:</span>
                <span className="bg-card px-2 py-1 rounded border">[ Key: 50 ]</span>
              </div>
            </div>

            {/* Internal Pages */}
            <div className="grid grid-cols-2 gap-8">
              <div className="p-3 bg-muted/30 border border-border rounded-xl font-mono text-xs text-center">
                <span className="text-[10px] text-muted-foreground block mb-1 font-bold">Left Child (Keys &lt; 50)</span>
                <div className="flex justify-center gap-1.5 font-bold text-foreground">
                  <span className="bg-card px-2 py-1 rounded border">20</span>
                  <span className="bg-card px-2 py-1 rounded border">35</span>
                </div>
              </div>

              <div className="p-3 bg-muted/30 border border-border rounded-xl font-mono text-xs text-center">
                <span className="text-[10px] text-muted-foreground block mb-1 font-bold">Right Child (Keys ≥ 50)</span>
                <div className="flex justify-center gap-1.5 font-bold text-foreground">
                  <span className="bg-card px-2 py-1 rounded border">65</span>
                  <span className="bg-card px-2 py-1 rounded border">80</span>
                </div>
              </div>
            </div>

            {/* Leaf Records */}
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center font-mono text-xs text-emerald-400">
              Leaf Pages: Doubly-linked sequential disk blocks containing actual row pointers (RID).
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { letter: "A", name: "Atomicity", desc: "All-or-nothing execution. If any operation fails, the transaction rolls back completely via write-ahead log (WAL)." },
              { letter: "C", name: "Consistency", desc: "Transactions move the database from one valid state to another, maintaining all schema constraints and foreign keys." },
              { letter: "I", name: "Isolation", desc: "Concurrent transactions execute without dirty reads or phantom rows via MVCC or two-phase locking (2PL)." },
              { letter: "D", name: "Durability", desc: "Once committed, changes survive system crashes and power outages via non-volatile disk persistence." }
            ].map(ac => (
              <div key={ac.letter} className="p-4 rounded-2xl bg-muted/20 border border-border flex flex-col items-center text-center shadow-xs">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground font-mono font-bold text-xl flex items-center justify-center shadow-md mb-2">
                  {ac.letter}
                </div>
                <span className="text-xs font-bold text-foreground font-heading">{ac.name}</span>
                <span className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">{ac.desc}</span>
              </div>
            ))}
          </div>
        )}

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>
            {topic === "btree"
              ? "B-Trees keep disk page lookups to 3-4 I/O reads even for billions of rows!"
              : "ACID guarantees provide rock-solid reliability for financial and high-throughput transactional databases."}
          </span>
        </div>
      </Card>
    </div>
  );
}
