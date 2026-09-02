"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Play, 
  RotateCcw, 
  Network, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  GitFork
} from "lucide-react";

export type GraphSuiteMode = "bfs" | "dfs" | "dijkstra" | "mst" | "union-find";

export function GraphSuiteVisualizer({ defaultMode = "dijkstra" }: { defaultMode?: GraphSuiteMode }) {
  const [mode, setMode] = useState<GraphSuiteMode>(defaultMode);

  // --- TRAVERSALS (BFS / DFS) ---
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [queueOrStack, setQueueOrStack] = useState<string[]>([]);
  const [graphMessage, setGraphMessage] = useState<string>("Ready to explore graph. Select an algorithm above.");

  // --- DIJKSTRA STATE ---
  const [dijkstraDistances, setDijkstraDistances] = useState<Record<string, number>>({
    A: 0,
    B: 999,
    C: 999,
    D: 999
  });
  const [dijkstraSettled, setDijkstraSettled] = useState<string[]>([]);
  const [dijkstraMessage, setDijkstraMessage] = useState<string>("Dijkstra: Single-source shortest paths. Initial distances: A=0, others=∞.");

  // --- UNION FIND STATE ---
  const [parents, setParents] = useState<Record<number, number>>({ 1: 1, 2: 2, 3: 3, 4: 4 });
  const [ufMessage, setUfMessage] = useState<string>("Disjoint sets initialized: {1}, {2}, {3}, {4}. Each node is its own root.");

  // Simulation: BFS
  const runBfs = async () => {
    setVisitedNodes([]);
    setQueueOrStack(["A"]);
    setActiveNode("A");
    setGraphMessage("Enqueue Start Node 'A'. Queue = [A].");
    await new Promise((r) => setTimeout(r, 600));

    // A -> B, C
    setVisitedNodes(["A"]);
    setQueueOrStack(["B", "C"]);
    setActiveNode("B");
    setGraphMessage("De-queue A, mark visited. Enqueue neighbors B, C. Queue = [B, C].");
    await new Promise((r) => setTimeout(r, 700));

    // B -> D
    setVisitedNodes(["A", "B"]);
    setQueueOrStack(["C", "D"]);
    setActiveNode("C");
    setGraphMessage("De-queue B, mark visited. Enqueue neighbor D. Queue = [C, D].");
    await new Promise((r) => setTimeout(r, 700));

    // C
    setVisitedNodes(["A", "B", "C"]);
    setQueueOrStack(["D"]);
    setActiveNode("D");
    setGraphMessage("De-queue C, mark visited. Queue = [D].");
    await new Promise((r) => setTimeout(r, 700));

    // D
    setVisitedNodes(["A", "B", "C", "D"]);
    setQueueOrStack([]);
    setActiveNode(null);
    setGraphMessage("De-queue D. Queue is empty. BFS Wavefront traversal complete!");
  };

  // Simulation: DFS
  const runDfs = async () => {
    setVisitedNodes([]);
    setQueueOrStack(["A"]);
    setActiveNode("A");
    setGraphMessage("Push 'A' onto DFS Call Stack.");
    await new Promise((r) => setTimeout(r, 600));

    // A -> B -> D
    setVisitedNodes(["A"]);
    setActiveNode("B");
    setQueueOrStack(["A", "B"]);
    setGraphMessage("DFS descends deep: visit neighbor 'B'. Stack = [A, B].");
    await new Promise((r) => setTimeout(r, 700));

    setVisitedNodes(["A", "B"]);
    setActiveNode("D");
    setQueueOrStack(["A", "B", "D"]);
    setGraphMessage("DFS descends deep: visit neighbor 'D'. Stack = [A, B, D].");
    await new Promise((r) => setTimeout(r, 700));

    // Backtrack to A, then visit C
    setVisitedNodes(["A", "B", "D"]);
    setQueueOrStack(["A"]);
    setGraphMessage("D has no unvisited neighbors. Backtrack to 'A'.");
    await new Promise((r) => setTimeout(r, 600));

    setVisitedNodes(["A", "B", "D", "C"]);
    setActiveNode("C");
    setQueueOrStack(["A", "C"]);
    setGraphMessage("Visit alternate branch 'C'. Stack = [A, C].");
    await new Promise((r) => setTimeout(r, 700));

    setVisitedNodes(["A", "B", "D", "C"]);
    setQueueOrStack([]);
    setActiveNode(null);
    setGraphMessage("DFS traversal complete! Visited order: A ──> B ──> D ──> C.");
  };

  // Simulation: Dijkstra
  const runDijkstra = async () => {
    setDijkstraSettled([]);
    setDijkstraDistances({ A: 0, B: 999, C: 999, D: 999 });
    setDijkstraMessage("Extract min tentative node 'A' (dist = 0).");
    await new Promise((r) => setTimeout(r, 600));

    // Relax from A: edge(A, B)=4, edge(A, C)=2
    setDijkstraDistances({ A: 0, B: 4, C: 2, D: 999 });
    setDijkstraSettled(["A"]);
    setDijkstraMessage("Relax outgoing edges from A: dist[C] = 2, dist[B] = 4.");
    await new Promise((r) => setTimeout(r, 800));

    // Next min node is C (dist = 2)
    // edge(C, D)=1 -> dist[D] = 2 + 1 = 3
    setDijkstraDistances({ A: 0, B: 4, C: 2, D: 3 });
    setDijkstraSettled(["A", "C"]);
    setDijkstraMessage("Extract min node C (dist = 2). Relax edge(C, D, wt:1): dist[D] = 2 + 1 = 3.");
    await new Promise((r) => setTimeout(r, 900));

    // Next min node is D (dist = 3)
    setDijkstraSettled(["A", "C", "D"]);
    setDijkstraMessage("Extract min node D (dist = 3). Next nearest is B (dist = 4).");
    await new Promise((r) => setTimeout(r, 800));

    // Settle B
    setDijkstraSettled(["A", "C", "D", "B"]);
    setDijkstraMessage("All vertices settled! Optimal shortest paths found: A=0, C=2, D=3, B=4.");
  };

  // Union-Find Actions
  const handleUnion = (x: number, y: number) => {
    const rootX = parents[x];
    const rootY = parents[y];
    if (rootX === rootY) {
      setUfMessage(`Find(${x}) == Find(${y}) == ${rootX}. Already in same set! Union creates cycle.`);
      return;
    }
    const newParents = { ...parents, [rootY]: rootX };
    setParents(newParents);
    setUfMessage(`Union(${x}, ${y}): Pointed root of ${y} (${rootY}) to root of ${x} (${rootX}).`);
  };

  return (
    <div className="space-y-6">
      {/* Sub-mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-mono">
            Module 6
          </Badge>
          <span className="text-sm font-bold text-foreground">Graphs &amp; Networks Studio</span>
        </div>

        <div className="flex items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={mode === "bfs" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("bfs")}
            className="h-7 text-xs font-semibold"
          >
            BFS (Queue)
          </Button>
          <Button
            variant={mode === "dfs" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("dfs")}
            className="h-7 text-xs font-semibold"
          >
            DFS (Stack)
          </Button>
          <Button
            variant={mode === "dijkstra" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("dijkstra")}
            className="h-7 text-xs font-semibold"
          >
            Dijkstra Shortest Path
          </Button>
          <Button
            variant={mode === "union-find" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("union-find")}
            className="h-7 text-xs font-semibold"
          >
            Disjoint Set / Union-Find
          </Button>
        </div>
      </div>

      {/* VIEW 1 & 2: BFS / DFS */}
      {(mode === "bfs" || mode === "dfs") && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <Button
              size="sm"
              onClick={mode === "bfs" ? runBfs : runDfs}
              className="h-8 gap-1 text-xs bg-primary text-primary-foreground font-bold"
            >
              <Play className="h-3.5 w-3.5" /> Start {mode.toUpperCase()} Traversal
            </Button>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span>Visited: <strong className="text-emerald-500">{visitedNodes.join(" ──> ") || "None"}</strong></span>
              <span>•</span>
              <span>{mode === "bfs" ? "Queue" : "Stack"}: <strong className="text-primary">[{queueOrStack.join(", ")}]</strong></span>
            </div>
          </div>

          <Card className="border-border bg-card/80 p-6 flex flex-col items-center">
            {/* SVG Graph Network */}
            <svg className="w-full max-w-md h-56 overflow-visible">
              {/* Edges */}
              <line x1="80" y1="50" x2="280" y2="50" stroke="currentColor" strokeWidth="2" className="text-border" />
              <line x1="80" y1="50" x2="80" y2="180" stroke="currentColor" strokeWidth="2" className="text-border" />
              <line x1="80" y1="180" x2="280" y2="180" stroke="currentColor" strokeWidth="2" className="text-border" />
              <line x1="280" y1="50" x2="280" y2="180" stroke="currentColor" strokeWidth="2" className="text-border" />

              {/* Node Vertices */}
              {[
                { id: "A", x: 80, y: 50 },
                { id: "B", x: 280, y: 50 },
                { id: "C", x: 80, y: 180 },
                { id: "D", x: 280, y: 180 }
              ].map((v) => {
                const isActive = activeNode === v.id;
                const isVisited = visitedNodes.includes(v.id);

                return (
                  <g key={v.id} className="cursor-pointer">
                    <circle
                      cx={v.x}
                      cy={v.y}
                      r="22"
                      className={`transition-all duration-300 ${
                        isActive
                          ? "fill-primary stroke-primary stroke-4 filter drop-shadow"
                          : isVisited
                          ? "fill-emerald-500/20 stroke-emerald-500 stroke-2"
                          : "fill-card stroke-border stroke-2"
                      }`}
                    />
                    <text
                      x={v.x}
                      y={v.y + 4}
                      textAnchor="middle"
                      className={`text-xs font-mono font-bold select-none ${
                        isActive ? "fill-primary-foreground" : "fill-foreground"
                      }`}
                    >
                      {v.id}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="w-full max-w-lg mt-4 p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>{graphMessage}</span>
            </div>
          </Card>
        </div>
      )}

      {/* VIEW 3: DIJKSTRA SHORTEST PATH */}
      {mode === "dijkstra" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <Button
              size="sm"
              onClick={runDijkstra}
              className="h-8 gap-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              <Play className="h-3.5 w-3.5" /> Run Dijkstra from Node A
            </Button>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span>Settled Nodes: <strong className="text-emerald-500">{dijkstraSettled.join(", ") || "None"}</strong></span>
            </div>
          </div>

          <Card className="border-border bg-card/80 p-6 flex flex-col items-center">
            {/* SVG Weighted Graph */}
            <svg className="w-full max-w-md h-56 overflow-visible">
              <line x1="80" y1="50" x2="280" y2="50" stroke="currentColor" strokeWidth="2" className="text-border" />
              <text x="180" y="40" textAnchor="middle" className="text-[10px] font-mono fill-muted-foreground">wt: 4</text>

              <line x1="80" y1="50" x2="80" y2="180" stroke="currentColor" strokeWidth="2" className="text-border" />
              <text x="60" y="115" textAnchor="middle" className="text-[10px] font-mono fill-muted-foreground">wt: 2</text>

              <line x1="80" y1="180" x2="280" y2="180" stroke="currentColor" strokeWidth="2" className="text-border" />
              <text x="180" y="200" textAnchor="middle" className="text-[10px] font-mono fill-muted-foreground">wt: 1</text>

              <line x1="280" y1="50" x2="280" y2="180" stroke="currentColor" strokeWidth="2" className="text-border" />
              <text x="300" y="115" textAnchor="middle" className="text-[10px] font-mono fill-muted-foreground">wt: 3</text>

              {[
                { id: "A", x: 80, y: 50 },
                { id: "B", x: 280, y: 50 },
                { id: "C", x: 80, y: 180 },
                { id: "D", x: 280, y: 180 }
              ].map((v) => {
                const isSettled = dijkstraSettled.includes(v.id);
                return (
                  <g key={v.id}>
                    <circle
                      cx={v.x}
                      cy={v.y}
                      r="22"
                      className={`transition-all duration-300 ${
                        isSettled
                          ? "fill-emerald-500/20 stroke-emerald-500 stroke-2"
                          : "fill-card stroke-border stroke-2"
                      }`}
                    />
                    <text
                      x={v.x}
                      y={v.y + 4}
                      textAnchor="middle"
                      className="text-xs font-mono font-bold fill-foreground select-none"
                    >
                      {v.id}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Distance Table */}
            <div className="w-full max-w-md mt-4 border border-border rounded-xl overflow-hidden shadow-xs">
              <div className="grid grid-cols-4 bg-muted/60 p-2 text-center text-xs font-mono font-bold text-muted-foreground border-b border-border">
                <span>Vertex</span>
                <span>Tentative Dist</span>
                <span>Status</span>
                <span>Formula</span>
              </div>
              {(["A", "B", "C", "D"] as const).map((node) => {
                const dist = dijkstraDistances[node];
                const isSettled = dijkstraSettled.includes(node);
                return (
                  <div key={node} className="grid grid-cols-4 p-2.5 text-center text-xs font-mono border-b border-border/50 items-center">
                    <span className="font-bold text-foreground">{node}</span>
                    <span className={dist === 999 ? "text-muted-foreground" : "text-emerald-500 font-bold"}>
                      {dist === 999 ? "∞" : dist}
                    </span>
                    <span>
                      {isSettled ? (
                        <Badge variant="outline" className="text-[9px] bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
                          Settled ✓
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[9px]">Tentative</Badge>
                      )}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {node === "A" ? "src = 0" : "dist[u] + wt"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="w-full max-w-lg mt-4 p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>{dijkstraMessage}</span>
            </div>
          </Card>
        </div>
      )}

      {/* VIEW 4: DISJOINT SET / UNION-FIND */}
      {mode === "union-find" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={() => handleUnion(1, 2)} className="h-8 text-xs font-mono">
                Union(1, 2)
              </Button>
              <Button size="sm" onClick={() => handleUnion(3, 4)} className="h-8 text-xs font-mono">
                Union(3, 4)
              </Button>
              <Button size="sm" onClick={() => handleUnion(2, 4)} className="h-8 text-xs font-mono">
                Union(2, 4)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setParents({ 1: 1, 2: 2, 3: 3, 4: 4 });
                  setUfMessage("Reset Disjoint Sets: {1}, {2}, {3}, {4}.");
                }}
                className="h-8 text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </div>

            <Badge variant="outline" className="text-xs font-mono bg-primary/10 text-primary border-primary/20">
              Near O(1) α(n) Inverse Ackermann
            </Badge>
          </div>

          <Card className="border-border bg-card/80 p-6 flex flex-col items-center">
            <div className="grid grid-cols-4 gap-4 w-full max-w-md py-4">
              {[1, 2, 3, 4].map((node) => {
                const parent = parents[node];
                const isRoot = parent === node;
                return (
                  <div
                    key={node}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center space-y-1 ${
                      isRoot
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-border bg-card text-foreground"
                    }`}
                  >
                    <span className="text-sm font-bold font-mono">Node {node}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Parent: <strong>{parent}</strong>
                    </span>
                    {isRoot && (
                      <span className="text-[9px] font-mono text-emerald-500 font-bold">
                        (Root)
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="w-full max-w-lg mt-4 p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>{ufMessage}</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
