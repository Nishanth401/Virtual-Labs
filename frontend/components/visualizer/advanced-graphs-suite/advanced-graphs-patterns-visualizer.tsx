"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Network,
  GitMerge,
  Activity,
  Layers,
  Workflow,
  Share2,
  RefreshCw,
  Palette,
  Route
} from "lucide-react";

export type AdvancedGraphModule =
  | "bridges-articulation"
  | "bipartite-matching"
  | "bipartite-check"
  | "eulerian-path"
  | "hamiltonian-path"
  | "edmonds-karp"
  | "dinic-flow"
  | "min-cost-max-flow"
  | "cycle-detection-directed"
  | "graph-coloring";

interface Props {
  initialModule?: AdvancedGraphModule;
}

export function AdvancedGraphsPatternsVisualizer({ initialModule = "bridges-articulation" }: Props) {
  const [activeModule, setActiveModule] = useState<AdvancedGraphModule>(initialModule);

  return (
    <div className="space-y-6">
      {/* Module Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono font-bold">
            Advanced Graphs
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Advanced Graph Algorithms &amp; Network Flow Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeModule === "bridges-articulation" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("bridges-articulation")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <GitMerge className="h-3.5 w-3.5 mr-1" />
            Bridges &amp; Cut Vertices
          </Button>
          <Button
            variant={activeModule === "bipartite-matching" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("bipartite-matching")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Share2 className="h-3.5 w-3.5 mr-1" />
            Bipartite Matching
          </Button>
          <Button
            variant={activeModule === "bipartite-check" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("bipartite-check")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Palette className="h-3.5 w-3.5 mr-1" />
            2-Coloring Check
          </Button>
          <Button
            variant={activeModule === "eulerian-path" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("eulerian-path")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Route className="h-3.5 w-3.5 mr-1" />
            Eulerian Path
          </Button>
          <Button
            variant={activeModule === "hamiltonian-path" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("hamiltonian-path")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Route className="h-3.5 w-3.5 mr-1" />
            Hamiltonian Path
          </Button>
          <Button
            variant={activeModule === "edmonds-karp" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("edmonds-karp")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Activity className="h-3.5 w-3.5 mr-1" />
            Edmonds-Karp
          </Button>
          <Button
            variant={activeModule === "dinic-flow" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("dinic-flow")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Workflow className="h-3.5 w-3.5 mr-1" />
            Dinic Flow
          </Button>
          <Button
            variant={activeModule === "min-cost-max-flow" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("min-cost-max-flow")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Network className="h-3.5 w-3.5 mr-1" />
            Min-Cost Flow
          </Button>
          <Button
            variant={activeModule === "cycle-detection-directed" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("cycle-detection-directed")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Directed Cycle (3-Color)
          </Button>
          <Button
            variant={activeModule === "graph-coloring" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("graph-coloring")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Layers className="h-3.5 w-3.5 mr-1" />
            K-Coloring
          </Button>
        </div>
      </div>

      {/* Module 1: Bridges & Articulation Points */}
      {activeModule === "bridges-articulation" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <GitMerge className="h-5 w-5 text-rose-500" />
                  Bridges &amp; Articulation Points (Tarjan&apos;s DFS)
                </CardTitle>
                <CardDescription>
                  Find critical bottleneck edges and vertices whose removal disconnects the graph in linear O(V + E) time.
                </CardDescription>
              </div>
              <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
                Time: O(V + E)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border space-y-3 font-mono text-xs">
              <div className="text-sm font-bold text-rose-400">
                Bridge Condition: low[v] &gt; disc[u] | Articulation: low[v] ≥ disc[u]
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <div className="font-bold text-foreground">disc[u] (Discovery Time)</div>
                  <div className="text-muted-foreground mt-1">Timestamp when DFS first enters node u</div>
                </div>
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <div className="font-bold text-foreground">low[u] (Low-Link Value)</div>
                  <div className="text-muted-foreground mt-1">Lowest disc reachable from u via subtree + back edges</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 2: Maximum Bipartite Matching */}
      {activeModule === "bipartite-matching" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-indigo-500" />
                  Maximum Bipartite Matching (Hopcroft-Karp)
                </CardTitle>
                <CardDescription>
                  Find the maximum set of disjoint edges connecting two independent sets in O(E √V).
                </CardDescription>
              </div>
              <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
                Time: O(E √V)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-indigo-400">Augmenting Path Theorem (Berge&apos;s Lemma):</div>
              <div>A matching M is maximum if and only if there are no augmenting paths with respect to M.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 3: Bipartite Graph Checking */}
      {activeModule === "bipartite-check" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Palette className="h-5 w-5 text-teal-500" />
                  Bipartite Graph Checking (2-Coloring)
                </CardTitle>
                <CardDescription>
                  Color graph using 2 colors via BFS/DFS: graph is bipartite if and only if it contains no odd-length cycles.
                </CardDescription>
              </div>
              <Badge className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30">
                Time: O(V + E)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-teal-400">2-Coloring Validation:</div>
              <div>If neighbor has same color as current node → ODD CYCLE DETECTED → NOT BIPARTITE.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 4: Eulerian Path */}
      {activeModule === "eulerian-path" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Route className="h-5 w-5 text-amber-500" />
                  Eulerian Path &amp; Circuit (Hierholzer&apos;s Algorithm)
                </CardTitle>
                <CardDescription>
                  Traverse every edge in the graph exactly once in O(V + E) time.
                </CardDescription>
              </div>
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                Time: O(V + E)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-amber-400">Degree Parity Conditions:</div>
              <div>• <strong>Eulerian Circuit:</strong> Every node has an EVEN degree.</div>
              <div>• <strong>Eulerian Path:</strong> Exactly TWO nodes have an ODD degree (start and end).</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 5: Hamiltonian Path */}
      {activeModule === "hamiltonian-path" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Route className="h-5 w-5 text-purple-500" />
                  Hamiltonian Path &amp; Cycle (NP-Complete)
                </CardTitle>
                <CardDescription>
                  Visit every vertex in the graph exactly once. Solved via backtracking in O(N!) or Bitmask DP in O(2ⁿ · n²).
                </CardDescription>
              </div>
              <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30">
                Complexity: NP-Complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-purple-400">Backtracking Exploration State:</div>
              <div>Validates vertex visits with unvisited neighbor expansion and branch pruning.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 6: Edmonds-Karp */}
      {activeModule === "edmonds-karp" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Max Flow: Edmonds-Karp (BFS Ford-Fulkerson)
                </CardTitle>
                <CardDescription>
                  Find maximum network flow by repeatedly finding shortest augmenting paths in residual capacity graph via BFS.
                </CardDescription>
              </div>
              <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
                Time: O(V · E²)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-blue-400">Residual Edge Capacity:</div>
              <div>c_res(u, v) = capacity(u, v) - flow(u, v) | Back-edge: c_res(v, u) = flow(u, v)</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 7: Dinic's Algorithm */}
      {activeModule === "dinic-flow" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-cyan-500" />
                  Max Flow: Dinic&apos;s Algorithm (Level Graph + Blocking Flow)
                </CardTitle>
                <CardDescription>
                  Construct BFS level graphs and push blocking flows via DFS in O(V² · E) time.
                </CardDescription>
              </div>
              <Badge className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">
                Time: O(V² · E)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-cyan-400">Dinic Two-Phase Cycle:</div>
              <div>1. <strong>BFS Level Graph:</strong> Assign level[v] = level[u] + 1 to prevent backward flow exploration.</div>
              <div>2. <strong>DFS Blocking Flow:</strong> Push flow along admissible level edges until no path remains.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 8: Min-Cost Max Flow */}
      {activeModule === "min-cost-max-flow" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Network className="h-5 w-5 text-emerald-500" />
                  Min-Cost Max Flow (MCMF)
                </CardTitle>
                <CardDescription>
                  Find the maximum flow from Source to Sink that incurs the minimum total transmission cost.
                </CardDescription>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                Successive Shortest Path (SPFA)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-emerald-400">Cost Optimization Metric:</div>
              <div>Total Cost = ∑ (flow(e) × cost(e)) for all directed edges in network.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 9: Directed Cycle Detection */}
      {activeModule === "cycle-detection-directed" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-yellow-500" />
                  Directed Graph Cycle Detection (3-Color DFS)
                </CardTitle>
                <CardDescription>
                  Classify nodes into WHITE (unvisited), GRAY (currently in recursion stack), and BLACK (finished) to detect back-edges.
                </CardDescription>
              </div>
              <Badge className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30">
                Time: O(V + E)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-muted/40 rounded-lg border border-border">
                <div className="font-bold text-foreground">WHITE (0)</div>
                <div className="text-muted-foreground mt-1">Unvisited node</div>
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="font-bold text-yellow-400">GRAY (1) - Active Frame</div>
                <div className="text-muted-foreground mt-1">Encountering GRAY = CYCLE FOUND!</div>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <div className="font-bold text-emerald-400">BLACK (2)</div>
                <div className="text-muted-foreground mt-1">Fully explored subtree</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 10: Graph K-Coloring */}
      {activeModule === "graph-coloring" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Layers className="h-5 w-5 text-pink-500" />
                  Graph K-Coloring (Chromatic Number)
                </CardTitle>
                <CardDescription>
                  Assign at most K colors to vertices such that no two adjacent vertices share the same color.
                </CardDescription>
              </div>
              <Badge className="bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30">
                Complexity: NP-Complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-pink-400">Backtracking State Machine:</div>
              <div>Tests color assignment c ∈ [1..K] for vertex v. Prunes branch immediately if any neighbor has color c.</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
