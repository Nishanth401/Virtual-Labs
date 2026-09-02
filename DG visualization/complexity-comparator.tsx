"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Table, Info, CheckCircle2, ShieldAlert } from "lucide-react";

export function ComplexityComparator() {
  const [activeTab, setActiveTab] = useState<"matrix" | "curves">("matrix");
  const [selectedDS, setSelectedDS] = useState<string | null>(null);

  const dsData = [
    { name: "Array", access: "O(1)", search: "O(n)", insert: "O(n)", delete: "O(n)", space: "O(n)", note: "Contiguous RAM memory. Instant index read; element shifting on mutations." },
    { name: "Dynamic Array", access: "O(1)", search: "O(n)", insert: "O(1)*", delete: "O(n)", space: "O(n)", note: "Amortized O(1) append via capacity doubling; worst case O(n) copy." },
    { name: "Singly Linked List", access: "O(n)", search: "O(n)", insert: "O(1)*", delete: "O(1)*", space: "O(n)", note: "O(1) insertion at head; O(n) traversal to find arbitrary elements." },
    { name: "Doubly Linked List", access: "O(n)", search: "O(n)", insert: "O(1)*", delete: "O(1)*", space: "O(n)", note: "Bi-directional navigation. O(1) removal when node pointer is known." },
    { name: "Stack (LIFO)", access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)", space: "O(n)", note: "Push and Pop strictly at Top pointer." },
    { name: "Queue (FIFO)", access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)", space: "O(n)", note: "Enqueue at Rear, Dequeue at Front. O(1) time endpoints." },
    { name: "Hash Table", access: "O(1)*", search: "O(1)*", insert: "O(1)*", delete: "O(1)*", space: "O(n)", note: "Average O(1) direct bucket lookup; worst-case O(n) on heavy hash collisions." },
    { name: "Binary Search Tree", access: "O(log n)*", search: "O(log n)*", insert: "O(log n)*", delete: "O(log n)*", space: "O(n)", note: "Average O(log n) when balanced; degrades to O(n) skewed linear tree." },
    { name: "AVL Tree", access: "O(log n)", search: "O(log n)", insert: "O(log n)", delete: "O(log n)", space: "O(n)", note: "Self-balancing invariant (|BF| <= 1) guarantees strict O(log n) worst case." },
    { name: "Binary Heap", access: "O(1) [min/max]", search: "O(n)", insert: "O(log n)", delete: "O(log n)", space: "O(n)", note: "Root is always extreme value. Heapify up/down takes O(log n)." },
    { name: "Trie (Prefix Tree)", access: "O(L)", search: "O(L)", insert: "O(L)", delete: "O(L)", space: "O(L*Σ)", note: "Time depends only on word length L, completely independent of total entries N." }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-mono">
            Module 12
          </Badge>
          <span className="text-sm font-bold text-foreground">Complexity Analysis &amp; DS Comparison</span>
        </div>

        <div className="flex items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeTab === "matrix" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("matrix")}
            className="h-7 text-xs font-semibold"
          >
            <Table className="h-3.5 w-3.5 mr-1" /> Operations Matrix
          </Button>
          <Button
            variant={activeTab === "curves" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("curves")}
            className="h-7 text-xs font-semibold"
          >
            <TrendingUp className="h-3.5 w-3.5 mr-1" /> Big-O Growth Curves
          </Button>
        </div>
      </div>

      {/* VIEW 1: OPERATIONS MATRIX */}
      {activeTab === "matrix" && (
        <Card className="border-border bg-card/80 p-6 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-muted-foreground">
                  <th className="p-3 font-bold">Data Structure</th>
                  <th className="p-3 font-bold">Access</th>
                  <th className="p-3 font-bold">Search</th>
                  <th className="p-3 font-bold">Insert</th>
                  <th className="p-3 font-bold">Delete</th>
                  <th className="p-3 font-bold">Space</th>
                </tr>
              </thead>
              <tbody>
                {dsData.map((item) => {
                  const isSelected = selectedDS === item.name;
                  return (
                    <tr
                      key={item.name}
                      onClick={() => setSelectedDS(item.name)}
                      className={`border-b border-border/50 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-primary/15 font-bold"
                          : "hover:bg-muted/30"
                      }`}
                    >
                      <td className="p-3 font-bold text-foreground flex items-center gap-1.5">
                        <span>{item.name}</span>
                      </td>
                      <td className="p-3">
                        <span className={item.access.includes("O(1)") ? "text-emerald-500 font-bold" : "text-amber-500"}>
                          {item.access}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={item.search.includes("O(1)") ? "text-emerald-500 font-bold" : item.search.includes("log") ? "text-blue-400" : "text-amber-500"}>
                          {item.search}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={item.insert.includes("O(1)") ? "text-emerald-500 font-bold" : item.insert.includes("log") ? "text-blue-400" : "text-amber-500"}>
                          {item.insert}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={item.delete.includes("O(1)") ? "text-emerald-500 font-bold" : item.delete.includes("log") ? "text-blue-400" : "text-amber-500"}>
                          {item.delete}
                        </span>
                      </td>
                      <td className="p-3 text-muted-foreground">{item.space}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Details strip */}
          <div className="p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
            <Info className="h-4 w-4 text-primary shrink-0" />
            <span>
              {selectedDS 
                ? dsData.find((d) => d.name === selectedDS)?.note 
                : "Click on any data structure row above to read architectural trade-offs and runtime characteristics."}
            </span>
          </div>
        </Card>
      )}

      {/* VIEW 2: BIG-O GROWTH CURVES */}
      {activeTab === "curves" && (
        <Card className="border-border bg-card/80 p-6 flex flex-col items-center space-y-4">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider text-center">
            Asymptotic Execution Cost Growth as Input Size N Approaches Infinity
          </span>

          <svg className="w-full max-w-lg h-64 overflow-visible">
            {/* Axis lines */}
            <line x1="50" y1="20" x2="50" y2="220" stroke="currentColor" strokeWidth="2" className="text-border" />
            <line x1="50" y1="220" x2="450" y2="220" stroke="currentColor" strokeWidth="2" className="text-border" />
            <text x="450" y="240" textAnchor="end" className="text-[10px] font-mono fill-muted-foreground">Input Size (N) ──→</text>
            <text x="30" y="30" textAnchor="middle" transform="rotate(-90 30,30)" className="text-[10px] font-mono fill-muted-foreground">Operations ──→</text>

            {/* O(1) Constant */}
            <line x1="50" y1="210" x2="430" y2="210" stroke="#10b981" strokeWidth="2.5" />
            <text x="435" y="214" className="text-[10px] font-mono font-bold fill-emerald-500">O(1)</text>

            {/* O(log n) Logarithmic */}
            <path d="M 50 210 Q 150 185, 430 175" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="435" y="178" className="text-[10px] font-mono font-bold fill-blue-500">O(log n)</text>

            {/* O(n) Linear */}
            <line x1="50" y1="210" x2="430" y2="120" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="435" y="124" className="text-[10px] font-mono font-bold fill-amber-500">O(n)</text>

            {/* O(n log n) */}
            <path d="M 50 210 Q 200 130, 410 70" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
            <text x="415" y="74" className="text-[10px] font-mono font-bold fill-purple-500">O(n log n)</text>

            {/* O(n²) Quadratic */}
            <path d="M 50 210 Q 180 180, 240 30" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
            <text x="245" y="35" className="text-[10px] font-mono font-bold fill-rose-500">O(n²)</text>
          </svg>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full max-w-xl text-center font-mono text-[11px] pt-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
              O(1) Excellent
            </div>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
              O(log n) Good
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              O(n) Fair
            </div>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
              O(n log n) Acceptable
            </div>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30">
              O(n²) Horrible
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
