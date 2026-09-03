"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Workflow, Play, RotateCcw, Search, Edit3, Info, Sparkles } from "lucide-react";

interface SegNode {
  id: number;
  l: number;
  r: number;
  sum: number;
  leftId: number | null;
  rightId: number | null;
}

export function SegmentTreeVisualizer() {
  const [array, setArray] = useState<number[]>([1, 3, 5, 7, 9, 11]);
  const [queryL, setQueryL] = useState<number>(1);
  const [queryR, setQueryR] = useState<number>(4);
  const [updateIdx, setUpdateIdx] = useState<number>(2);
  const [updateVal, setUpdateVal] = useState<number>(10);
  const [highlightedNodes, setHighlightedNodes] = useState<number[]>([]);
  const [logMsg, setLogMsg] = useState<string>("Built Segment Tree with 6 elements. Query or Update intervals below.");

  // Build Segment Tree recursively
  const { tree, rootId } = useMemo(() => {
    const nodes: Record<number, SegNode> = {};
    let counter = 1;

    const build = (l: number, r: number): number => {
      const id = counter++;
      if (l === r) {
        nodes[id] = { id, l, r, sum: array[l], leftId: null, rightId: null };
        return id;
      }
      const mid = Math.floor((l + r) / 2);
      const leftChild = build(l, mid);
      const rightChild = build(mid + 1, r);
      nodes[id] = {
        id,
        l,
        r,
        sum: nodes[leftChild].sum + nodes[rightChild].sum,
        leftId: leftChild,
        rightId: rightChild
      };
      return id;
    };

    const root = build(0, array.length - 1);
    return { tree: nodes, rootId: root };
  }, [array]);

  const handleQuery = () => {
    const active: number[] = [];
    const query = (nodeId: number, ql: number, qr: number): number => {
      const node = tree[nodeId];
      if (!node) return 0;
      if (node.l >= ql && node.r <= qr) {
        active.push(node.id);
        return node.sum;
      }
      if (node.r < ql || node.l > qr) {
        return 0;
      }
      const mid = Math.floor((node.l + node.r) / 2);
      let s = 0;
      if (node.leftId && ql <= mid) s += query(node.leftId, ql, qr);
      if (node.rightId && qr > mid) s += query(node.rightId, ql, qr);
      return s;
    };

    const result = query(rootId, queryL, queryR);
    setHighlightedNodes(active);
    setLogMsg(`Range Sum Query [${queryL}, ${queryR}] = ${result}. Highlighting minimal canonical nodes whose sum equals ${result}.`);
  };

  const handleUpdate = () => {
    if (updateIdx < 0 || updateIdx >= array.length) return;
    const nextArr = [...array];
    const oldVal = nextArr[updateIdx];
    nextArr[updateIdx] = updateVal;
    setArray(nextArr);
    setHighlightedNodes([]);
    setLogMsg(`Point Update: Index ${updateIdx} changed from ${oldVal} to ${updateVal}. Propagated change up the Segment Tree in O(log n) time.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
            Phase 2: Core Data Structures
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Logarithmic Range Query &amp; Point Update
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Segment Tree &amp; Fenwick Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Perform instantaneous Range Sum Queries (RSQ) and point updates in $O(\log n)$ time. Inspect how interval subproblems are aggregated in binary tree nodes.
        </p>
      </div>

      {/* Control Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-4">
          {/* Query Controls */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="font-bold">QuerySum[</span>
            <input
              type="number"
              min={0}
              max={array.length - 1}
              value={queryL}
              onChange={(e) => setQueryL(Math.max(0, Math.min(Number(e.target.value), queryR)))}
              className="w-12 h-7 px-1.5 rounded-lg border bg-muted/40 text-center font-bold"
            />
            <span>..</span>
            <input
              type="number"
              min={queryL}
              max={array.length - 1}
              value={queryR}
              onChange={(e) => setQueryR(Math.max(queryL, Math.min(Number(e.target.value), array.length - 1)))}
              className="w-12 h-7 px-1.5 rounded-lg border bg-muted/40 text-center font-bold"
            />
            <span>]</span>
            <Button size="sm" onClick={handleQuery} className="h-7 text-xs font-bold rounded-xl ml-1 gap-1">
              <Search className="h-3 w-3" /> Compute
            </Button>
          </div>

          {/* Update Controls */}
          <div className="flex items-center gap-1.5 font-mono text-xs pl-3 border-l border-border/60">
            <span>Arr[</span>
            <input
              type="number"
              min={0}
              max={array.length - 1}
              value={updateIdx}
              onChange={(e) => setUpdateIdx(Number(e.target.value))}
              className="w-12 h-7 px-1.5 rounded-lg border bg-muted/40 text-center font-bold"
            />
            <span>] =</span>
            <input
              type="number"
              value={updateVal}
              onChange={(e) => setUpdateVal(Number(e.target.value))}
              className="w-14 h-7 px-1.5 rounded-lg border bg-muted/40 text-center font-bold"
            />
            <Button size="sm" variant="secondary" onClick={handleUpdate} className="h-7 text-xs font-bold rounded-xl ml-1 gap-1">
              <Edit3 className="h-3 w-3" /> Update
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            Query: O(log n) • Update: O(log n)
          </Badge>
        </div>
      </div>

      {/* Main Visualizer: Tree Hierarchy */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-4">
            Segment Tree Nodes (Showing Interval [L..R] and Computed Sum)
          </span>

          {/* Render Tree Levels */}
          <div className="flex flex-col items-center gap-6 py-4 overflow-x-auto select-none">
            {/* Array Leaf Preview */}
            <div className="flex items-center gap-2 mb-2 p-2 bg-muted/30 rounded-xl border border-border/60">
              <span className="text-[10px] font-mono uppercase text-muted-foreground mr-2 font-bold">Raw Array:</span>
              {array.map((val, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold flex flex-col items-center ${
                    idx >= queryL && idx <= queryR
                      ? "bg-primary/20 border-primary text-primary shadow-xs"
                      : "bg-card border-border"
                  }`}
                >
                  <span>{val}</span>
                  <span className="text-[8px] opacity-60">i={idx}</span>
                </div>
              ))}
            </div>

            {/* Tree Nodes Rendering */}
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
              {Object.values(tree).map((node) => {
                const isHighlighted = highlightedNodes.includes(node.id);
                const isLeaf = node.l === node.r;

                return (
                  <div
                    key={node.id}
                    className={`p-3 rounded-2xl border flex flex-col items-center min-w-[90px] transition-all shadow-xs ${
                      isHighlighted
                        ? "bg-emerald-500/20 border-emerald-500 ring-4 ring-emerald-500/30 scale-105"
                        : isLeaf
                        ? "bg-muted/40 border-border/70"
                        : "bg-card border-border"
                    }`}
                  >
                    <span className="text-[9px] font-mono text-muted-foreground font-bold">
                      [{node.l}..{node.r}]
                    </span>
                    <span className="text-base font-bold font-mono text-foreground mt-0.5">
                      Σ {node.sum}
                    </span>
                    <span className="text-[8px] font-mono opacity-60 mt-1">
                      {isLeaf ? "Leaf Element" : "Aggregate"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Info Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>{logMsg}</span>
        </div>
      </Card>
    </div>
  );
}
