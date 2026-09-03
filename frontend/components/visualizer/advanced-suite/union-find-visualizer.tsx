"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Share2, Info, CheckCircle2, Workflow } from "lucide-react";

export function UnionFindVisualizer() {
  const [numElements, setNumElements] = useState<number>(7);
  // Union by Rank & Path Compression parent array
  const [parent, setParent] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [rank, setRank] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [unionU, setUnionU] = useState<number>(0);
  const [unionV, setUnionV] = useState<number>(1);
  const [findNode, setFindNode] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([
    "Initialized Disjoint Set with 7 singleton elements. Each element is its own root (Parent[i] = i)."
  ]);
  const [pathCompressionActive, setPathCompressionActive] = useState<boolean>(true);

  const findRoot = (i: number, pArr = parent): { root: number; path: number[] } => {
    const path: number[] = [i];
    let curr = i;
    while (curr !== pArr[curr]) {
      curr = pArr[curr];
      path.push(curr);
    }
    return { root: curr, path };
  };

  const handleUnion = () => {
    if (unionU < 0 || unionU >= numElements || unionV < 0 || unionV >= numElements) return;

    const find1 = findRoot(unionU);
    const find2 = findRoot(unionV);

    if (find1.root === find2.root) {
      setHistory(prev => [
        `Union(${unionU}, ${unionV}): Nodes ${unionU} and ${unionV} already belong to the same component (Root: ${find1.root}). No change.`,
        ...prev.slice(0, 8)
      ]);
      return;
    }

    const nextParent = [...parent];
    const nextRank = [...rank];

    // Path compression on traversed nodes if enabled
    if (pathCompressionActive) {
      find1.path.forEach(node => { nextParent[node] = find1.root; });
      find2.path.forEach(node => { nextParent[node] = find2.root; });
    }

    // Union by rank
    if (nextRank[find1.root] < nextRank[find2.root]) {
      nextParent[find1.root] = find2.root;
      setHistory(prev => [
        `Union(${unionU}, ${unionV}): Root ${find1.root} (Rank ${nextRank[find1.root]}) attached under Root ${find2.root} (Rank ${nextRank[find2.root]}).`,
        ...prev.slice(0, 8)
      ]);
    } else if (nextRank[find1.root] > nextRank[find2.root]) {
      nextParent[find2.root] = find1.root;
      setHistory(prev => [
        `Union(${unionU}, ${unionV}): Root ${find2.root} (Rank ${nextRank[find2.root]}) attached under Root ${find1.root} (Rank ${nextRank[find1.root]}).`,
        ...prev.slice(0, 8)
      ]);
    } else {
      nextParent[find2.root] = find1.root;
      nextRank[find1.root] += 1;
      setHistory(prev => [
        `Union(${unionU}, ${unionV}): Ranks tied. Attached ${find2.root} under ${find1.root}. Incremented Rank[${find1.root}] to ${nextRank[find1.root]}.`,
        ...prev.slice(0, 8)
      ]);
    }

    setParent(nextParent);
    setRank(nextRank);
  };

  const handleFind = () => {
    if (findNode < 0 || findNode >= numElements) return;
    const res = findRoot(findNode);
    if (pathCompressionActive && res.path.length > 2) {
      const nextParent = [...parent];
      res.path.forEach(n => { nextParent[n] = res.root; });
      setParent(nextParent);
      setHistory(prev => [
        `Find(${findNode}): Traced path [${res.path.join(" -> ")}]. Path Compression flattened pointers directly to root ${res.root}!`,
        ...prev.slice(0, 8)
      ]);
    } else {
      setHistory(prev => [
        `Find(${findNode}): Root is ${res.root}. Search path: [${res.path.join(" -> ")}].`,
        ...prev.slice(0, 8)
      ]);
    }
  };

  const resetSet = () => {
    setParent([0, 1, 2, 3, 4, 5, 6]);
    setRank([0, 0, 0, 0, 0, 0, 0]);
    setHistory(["Reset Disjoint Set structure."]);
  };

  // Group into connected components
  const components: Record<number, number[]> = {};
  for (let i = 0; i < numElements; i++) {
    const root = findRoot(i).root;
    if (!components[root]) components[root] = [];
    components[root].push(i);
  }

  const componentColors = ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4", "#64748b"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
            Phase 2: Core Data Structures
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Path Compression &amp; Union by Rank
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Disjoint Set (Union-Find) Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Interactive connected components manager with near-constant $O(\alpha(n))$ time complexity. Observe tree merging and pointer flattening in real-time.
        </p>
      </div>

      {/* Control Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span>Union(</span>
            <input
              type="number"
              min={0}
              max={numElements - 1}
              value={unionU}
              onChange={(e) => setUnionU(Number(e.target.value))}
              className="w-12 h-7 px-1.5 rounded-lg border bg-muted/40 text-center font-bold"
            />
            <span>,</span>
            <input
              type="number"
              min={0}
              max={numElements - 1}
              value={unionV}
              onChange={(e) => setUnionV(Number(e.target.value))}
              className="w-12 h-7 px-1.5 rounded-lg border bg-muted/40 text-center font-bold"
            />
            <span>)</span>
            <Button size="sm" onClick={handleUnion} className="h-7 text-xs font-bold rounded-xl ml-1">
              Merge
            </Button>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs pl-3 border-l border-border/60">
            <span>Find(</span>
            <input
              type="number"
              min={0}
              max={numElements - 1}
              value={findNode}
              onChange={(e) => setFindNode(Number(e.target.value))}
              className="w-12 h-7 px-1.5 rounded-lg border bg-muted/40 text-center font-bold"
            />
            <span>)</span>
            <Button size="sm" variant="secondary" onClick={handleFind} className="h-7 text-xs font-bold rounded-xl ml-1">
              Query
            </Button>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setPathCompressionActive(!pathCompressionActive)}
            className={`h-7 text-xs font-bold rounded-xl ${pathCompressionActive ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" : ""}`}
          >
            {pathCompressionActive ? "✓ Path Compression ON" : "Path Compression OFF"}
          </Button>

          <Button size="sm" variant="ghost" onClick={resetSet} className="h-7 w-7 p-0 rounded-xl" title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span>Components: <strong>{Object.keys(components).length}</strong></span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            Inverse Ackermann O(α(n)) ≈ O(1)
          </Badge>
        </div>
      </div>

      {/* Main Visualizer Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Component Clusters & Forests */}
        <Card className="lg:col-span-8 p-6 bg-card border-border/80 rounded-2xl flex flex-col justify-between min-h-[360px]">
          <div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-4">
              Forest of Disjoint Trees (Roots highlighted with halo)
            </span>

            <div className="flex flex-wrap items-start justify-around gap-8 py-4">
              {Object.entries(components).map(([rootStr, members], compIdx) => {
                const root = Number(rootStr);
                const color = componentColors[compIdx % componentColors.length];

                return (
                  <div key={root} className="flex flex-col items-center p-4 rounded-2xl bg-muted/20 border border-border/60 min-w-[140px] shadow-xs">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold mb-2">
                      Component Root: {root}
                    </span>

                    {/* Root Node */}
                    <div
                      style={{ borderColor: color, backgroundColor: `${color}25` }}
                      className="h-12 w-12 rounded-full border-2 flex flex-col items-center justify-center font-mono font-bold text-sm shadow-md ring-4 ring-primary/20"
                    >
                      <span>{root}</span>
                      <span className="text-[8px] opacity-70">r={rank[root]}</span>
                    </div>

                    {/* Tree Edges and Children */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-3 border-t border-border/60 w-full">
                      {members.filter(m => m !== root).map(child => (
                        <div
                          key={child}
                          style={{ borderColor: color, backgroundColor: `${color}15` }}
                          className="h-9 w-9 rounded-full border flex flex-col items-center justify-center font-mono text-xs font-bold text-foreground"
                          title={`Parent: ${parent[child]}`}
                        >
                          <span>{child}</span>
                          <span className="text-[7px] text-muted-foreground">↑{parent[child]}</span>
                        </div>
                      ))}
                      {members.length === 1 && (
                        <span className="text-[10px] font-mono text-muted-foreground italic">Singleton</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Internal Array Mapping Table */}
          <div className="mt-6 pt-4 border-t border-border/60">
            <span className="text-[10px] font-mono uppercase text-muted-foreground block mb-2 font-bold">
              Parent[] and Rank[] Memory Arrays
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-center border-collapse">
                <thead>
                  <tr className="bg-muted/40 text-muted-foreground text-[10px]">
                    <th className="p-1.5 border border-border/60">Index (i)</th>
                    {parent.map((_, i) => (
                      <th key={i} className="p-1.5 border border-border/60">{i}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-1.5 font-bold border border-border/60 bg-muted/20">Parent[i]</td>
                    {parent.map((p, i) => (
                      <td key={i} className={`p-1.5 border border-border/60 font-bold ${p === i ? "text-primary bg-primary/10" : ""}`}>
                        {p}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold border border-border/60 bg-muted/20">Rank[i]</td>
                    {rank.map((r, i) => (
                      <td key={i} className="p-1.5 border border-border/60 text-muted-foreground">
                        {r}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Operation History / Audit Log */}
        <Card className="lg:col-span-4 p-5 bg-card border-border/80 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/60">
              <Info className="h-4 w-4 text-blue-500" />
              <span className="text-xs font-bold font-heading">Event Log &amp; Explanations</span>
            </div>

            <div className="space-y-2.5 overflow-y-auto max-h-[300px] pr-1">
              {history.map((entry, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-muted/30 border border-border/60 text-xs font-mono leading-relaxed">
                  <span className="text-[10px] text-primary block font-bold">Event #{history.length - idx}</span>
                  <span className="text-foreground">{entry}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-muted-foreground">
            💡 Path compression flattens tree depth to 1 during find queries.
          </div>
        </Card>
      </div>
    </div>
  );
}
