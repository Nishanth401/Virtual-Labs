"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, Search, RotateCcw, Hash, Info, ArrowRight } from "lucide-react";

export function HashingSuiteVisualizer() {
  const [method, setMethod] = useState<"chaining" | "linear-probing">("chaining");
  const [inputValue, setInputValue] = useState<string>("");

  // Chaining table: 10 buckets, each an array of numbers
  const [chainBuckets, setChainBuckets] = useState<number[][]>([
    [], [11], [], [], [], [25, 35], [], [], [18], []
  ]);

  // Linear probing table: 10 slots
  const [probeTable, setProbeTable] = useState<(number | null)[]>([
    null, 11, null, null, null, 25, 35, null, 18, null
  ]);

  const [activeBucket, setActiveBucket] = useState<number | null>(5);
  const [message, setMessage] = useState<string>("Hash function: hash(k) = k % 10. Key 25 hashes to bucket 5.");

  const handleInsert = () => {
    const val = parseInt(inputValue) || Math.floor(Math.random() * 90 + 10);
    const hash = val % 10;

    if (method === "chaining") {
      const next = [...chainBuckets];
      next[hash] = [...next[hash], val];
      setChainBuckets(next);
      setActiveBucket(hash);
      if (next[hash].length > 1) {
        setMessage(`COLLISION on bucket ${hash}! Key ${val} appended to chained linked list at bucket ${hash}.`);
      } else {
        setMessage(`Inserted ${val} into bucket ${hash} (hash = ${val} % 10).`);
      }
    } else {
      // Linear Probing
      let slot = hash;
      let probes = 0;
      const next = [...probeTable];
      while (next[slot] !== null && probes < 10) {
        probes++;
        slot = (slot + 1) % 10;
      }
      if (probes >= 10) {
        setMessage("Hash Table is completely full! Rehash / resize required.");
      } else {
        next[slot] = val;
        setProbeTable(next);
        setActiveBucket(slot);
        if (probes > 0) {
          setMessage(`COLLISION at hash ${hash}! Linear probed forward ${probes} step(s) to slot ${slot}.`);
        } else {
          setMessage(`Inserted ${val} directly at initial slot ${hash}.`);
        }
      }
    }
    setInputValue("");
  };

  const handleReset = () => {
    setChainBuckets([[], [11], [], [], [], [25, 35], [], [], [18], []]);
    setProbeTable([null, 11, null, null, null, 25, 35, null, 18, null]);
    setActiveBucket(null);
    setMessage("Hash table reset to default initial keys.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-mono">
            Module 9
          </Badge>
          <span className="text-sm font-bold text-foreground">Hashing &amp; Collision Resolution Studio</span>
        </div>

        <div className="flex items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={method === "chaining" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setMethod("chaining");
              setMessage("Separate Chaining: Each bucket holds an independent linked list of colliding nodes.");
            }}
            className="h-7 text-xs font-semibold"
          >
            Separate Chaining
          </Button>
          <Button
            variant={method === "linear-probing" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setMethod("linear-probing");
              setMessage("Open Addressing (Linear Probing): On collision, probe forward index (hash + 1) % size.");
            }}
            className="h-7 text-xs font-semibold"
          >
            Linear Probing
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Key..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-24 h-9 text-xs font-mono"
          />
          <Button size="sm" onClick={handleInsert} className="h-9 gap-1 text-xs">
            <Plus className="h-3.5 w-3.5" /> Insert Key
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset} className="h-9 text-xs">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span>Formula: <strong>hash(k) = k % 10</strong></span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            Average O(1) Lookup
          </Badge>
        </div>
      </div>

      {/* Main Canvas */}
      <Card className="border-border bg-card/80 p-6">
        <div className="space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center">
            {method === "chaining" ? "10 Buckets with Chained Linked Lists" : "10 Linear Probing Slots"}
          </span>

          {method === "chaining" ? (
            // Separate Chaining
            <div className="space-y-2 pt-2">
              {chainBuckets.map((bucket, bIdx) => {
                const isActive = activeBucket === bIdx;
                return (
                  <div key={bIdx} className="flex items-center gap-3">
                    <div
                      className={`h-10 w-24 rounded-xl border-2 flex items-center justify-center font-mono text-xs font-bold transition-all shrink-0 ${
                        isActive
                          ? "border-primary bg-primary/20 text-primary shadow-md"
                          : "border-border bg-card text-foreground"
                      }`}
                    >
                      Bucket [{bIdx}]
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto py-1">
                      {bucket.length === 0 ? (
                        <span className="text-[10px] font-mono text-muted-foreground/50">null</span>
                      ) : (
                        bucket.map((val, idx) => (
                          <React.Fragment key={idx}>
                            <div className="h-8 px-3 rounded-lg border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                              {val}
                            </div>
                            {idx < bucket.length - 1 && (
                              <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                            )}
                          </React.Fragment>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Linear Probing
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              {probeTable.map((val, slot) => {
                const isActive = activeBucket === slot;
                const isOccupied = val !== null;
                return (
                  <div
                    key={slot}
                    className={`h-20 rounded-xl border-2 flex flex-col items-center justify-center p-2 font-mono transition-all ${
                      isActive
                        ? "border-primary bg-primary/20 text-primary scale-105 shadow-md"
                        : isOccupied
                        ? "border-emerald-500/50 bg-emerald-500/10 text-foreground"
                        : "border-dashed border-border bg-muted/20 text-muted-foreground/50"
                    }`}
                  >
                    <span className="text-[10px] text-muted-foreground">Slot [{slot}]</span>
                    <span className="text-sm font-bold mt-1">{isOccupied ? val : "empty"}</span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="w-full mt-4 p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
            <Info className="h-4 w-4 text-primary shrink-0" />
            <span>{message}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
