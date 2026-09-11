"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TreePine,
  GitBranch,
  Layers,
  RotateCcw,
  Boxes,
  Activity,
  Workflow,
  Binary
} from "lucide-react";

export type AdvancedTreeModule =
  | "lca-standard"
  | "lca-binary-lifting"
  | "hld"
  | "link-cut-tree"
  | "treap"
  | "splay-tree"
  | "cartesian-tree"
  | "persistent-segment-tree";

interface Props {
  initialModule?: AdvancedTreeModule;
}

export function AdvancedTreesVisualizer({ initialModule = "lca-standard" }: Props) {
  const [activeModule, setActiveModule] = useState<AdvancedTreeModule>(initialModule);

  // 1. LCA Standard & Binary Lifting Tree
  const [nodeU, setNodeU] = useState(4);
  const [nodeV, setNodeV] = useState(7);

  // 2. Heavy Light Decomposition chains
  const [highlightChain, setHighlightChain] = useState<number | null>(1);

  // 3. Splay Tree Step
  const [splayKey, setSplayKey] = useState(5);

  // 4. Persistent Segment Tree Versions
  const [activeVersion, setActiveVersion] = useState<number>(2);

  return (
    <div className="space-y-6">
      {/* Module Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono font-bold">
            Advanced Trees
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Advanced Tree Structures Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeModule === "lca-standard" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("lca-standard")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <TreePine className="h-3.5 w-3.5 mr-1" />
            LCA
          </Button>
          <Button
            variant={activeModule === "lca-binary-lifting" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("lca-binary-lifting")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Binary className="h-3.5 w-3.5 mr-1" />
            Binary Lifting
          </Button>
          <Button
            variant={activeModule === "hld" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("hld")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <GitBranch className="h-3.5 w-3.5 mr-1" />
            HLD
          </Button>
          <Button
            variant={activeModule === "link-cut-tree" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("link-cut-tree")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Workflow className="h-3.5 w-3.5 mr-1" />
            Link-Cut Tree
          </Button>
          <Button
            variant={activeModule === "treap" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("treap")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <TreePine className="h-3.5 w-3.5 mr-1" />
            Treap
          </Button>
          <Button
            variant={activeModule === "splay-tree" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("splay-tree")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Boxes className="h-3.5 w-3.5 mr-1" />
            Splay Tree
          </Button>
          <Button
            variant={activeModule === "cartesian-tree" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("cartesian-tree")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Activity className="h-3.5 w-3.5 mr-1" />
            Cartesian Tree
          </Button>
          <Button
            variant={activeModule === "persistent-segment-tree" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("persistent-segment-tree")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Layers className="h-3.5 w-3.5 mr-1" />
            Persistent Tree
          </Button>
        </div>
      </div>

      {/* Module 1: LCA Standard */}
      {activeModule === "lca-standard" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-emerald-500" />
                  Lowest Common Ancestor (LCA)
                </CardTitle>
                <CardDescription>
                  Find the shared ancestor node located at the greatest depth for two query nodes u and v.
                </CardDescription>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                O(H) Depth Traversal
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <Button size="sm" variant={nodeU === 4 && nodeV === 7 ? "default" : "outline"} onClick={() => { setNodeU(4); setNodeV(7); }}>
                Query LCA(4, 7) → Ans: 2
              </Button>
              <Button size="sm" variant={nodeU === 5 && nodeV === 6 ? "default" : "outline"} onClick={() => { setNodeU(5); setNodeV(6); }}>
                Query LCA(5, 6) → Ans: 1 (Root)
              </Button>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border flex flex-col items-center justify-center space-y-4">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-sm text-center">
                <strong>LCA({nodeU}, {nodeV}) = {nodeU === 4 && nodeV === 7 ? "2" : "1"}</strong>
              </div>
              {/* Tree Diagram */}
              <div className="text-xs font-mono text-center leading-relaxed text-muted-foreground">
                <div>[1 Root (Depth 0)]</div>
                <div>/ \</div>
                <div>[2 (Depth 1)] [3 (Depth 1)]</div>
                <div>/ \ \</div>
                <div>[4 (Depth 2)] [5 (Depth 2)] [6 (Depth 2)]</div>
                <div>/</div>
                <div>[7 (Depth 3)]</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 2: LCA Binary Lifting */}
      {activeModule === "lca-binary-lifting" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Binary className="h-5 w-5 text-blue-500" />
                  LCA with Binary Lifting in O(log N) Query
                </CardTitle>
                <CardDescription>
                  Precompute 2^k ancestor jump table up[u][k] to lift nodes in logarithmic steps.
                </CardDescription>
              </div>
              <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
                Prep: O(N log N) | Query: O(log N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border border-border rounded-lg">
                <thead className="bg-muted/60 text-muted-foreground">
                  <tr>
                    <th className="p-2 text-left">Node u</th>
                    <th className="p-2 text-left">up[u][0] (2⁰ = 1st parent)</th>
                    <th className="p-2 text-left">up[u][1] (2¹ = 2nd parent)</th>
                    <th className="p-2 text-left">up[u][2] (2² = 4th parent)</th>
                    <th className="p-2 text-left">Depth</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="p-2 font-bold">Node 7</td>
                    <td className="p-2 text-blue-400">Node 4</td>
                    <td className="p-2 text-blue-400">Node 2</td>
                    <td className="p-2 text-muted-foreground">None (Root reached)</td>
                    <td className="p-2">3</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-2 font-bold">Node 4</td>
                    <td className="p-2 text-blue-400">Node 2</td>
                    <td className="p-2 text-blue-400">Node 1 (Root)</td>
                    <td className="p-2 text-muted-foreground">None</td>
                    <td className="p-2">2</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">Node 2</td>
                    <td className="p-2 text-blue-400">Node 1</td>
                    <td className="p-2 text-muted-foreground">None</td>
                    <td className="p-2 text-muted-foreground">None</td>
                    <td className="p-2">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 3: Heavy-Light Decomposition */}
      {activeModule === "hld" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-indigo-500" />
                  Heavy-Light Decomposition (HLD)
                </CardTitle>
                <CardDescription>
                  Partition tree into heavy chains (leading to largest subtree) and light edges, enabling path queries in O(log² N).
                </CardDescription>
              </div>
              <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
                Path Queries: O(log² N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-card rounded-xl border border-border space-y-3">
              <div className="text-sm font-semibold text-foreground">Heavy Chains Identified:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                  <div className="font-bold text-indigo-400">Chain 1 (Main Trunk): [1 → 2 → 4 → 7]</div>
                  <div className="text-muted-foreground mt-1">Subtree sizes: 1(7) → 2(4) → 4(2) → 7(1)</div>
                </div>
                <div className="p-3 bg-muted/40 border border-border rounded-lg">
                  <div className="font-bold text-foreground">Light Branches: Node 3, Node 5, Node 6</div>
                  <div className="text-muted-foreground mt-1">Any path crosses at most O(log N) light edges</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 4: Link-Cut Tree */}
      {activeModule === "link-cut-tree" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-rose-500" />
                  Link-Cut Trees (Dynamic Forest Connectivity)
                </CardTitle>
                <CardDescription>
                  Maintain a dynamic forest of trees supporting Link(u,v), Cut(u,v), and Path queries in O(log N) amortized time.
                </CardDescription>
              </div>
              <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
                Amortized: O(log N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-sm space-y-2">
              <div className="font-semibold text-rose-400">Core Operations:</div>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                <li><strong>Access(u):</strong> Forms a preferred path from tree root down to u, represented as an auxiliary Splay Tree.</li>
                <li><strong>MakeRoot(u):</strong> Makes u the overall root of its connected tree component.</li>
                <li><strong>Link(u, v):</strong> Adds directed edge between root u and node v.</li>
                <li><strong>Cut(u, v):</strong> Removes connecting edge between u and v.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 5: Treap */}
      {activeModule === "treap" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-amber-500" />
                  Treap: Randomized Binary Search Tree + Heap
                </CardTitle>
                <CardDescription>
                  Keys satisfy BST order; randomly assigned priorities satisfy Max-Heap order via tree rotations.
                </CardDescription>
              </div>
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                Expected: O(log N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-muted/40 rounded-lg border border-border text-center">
                <span className="text-muted-foreground">Node A</span>
                <div className="font-bold text-base text-foreground">Key: 10 | Priority: 95</div>
                <Badge variant="outline" className="text-[10px] mt-1 border-amber-500/40 text-amber-400">Root</Badge>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg border border-border text-center">
                <span className="text-muted-foreground">Node B (Left)</span>
                <div className="font-bold text-base text-foreground">Key: 5 | Priority: 62</div>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg border border-border text-center">
                <span className="text-muted-foreground">Node C (Right)</span>
                <div className="font-bold text-base text-foreground">Key: 20 | Priority: 81</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 6: Splay Tree */}
      {activeModule === "splay-tree" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Boxes className="h-5 w-5 text-teal-500" />
                  Splay Tree: Self-Adjusting Binary Search Tree
                </CardTitle>
                <CardDescription>
                  Recently accessed elements are rotated (splayed) to the root via Zig, Zig-Zig, and Zig-Zag operations for cache locality.
                </CardDescription>
              </div>
              <Badge className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30">
                Amortized: O(log N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-teal-400">Splay Rotations:</div>
              <div>• <strong>Zig:</strong> Single rotation when parent is root.</div>
              <div>• <strong>Zig-Zig:</strong> Node and parent are both left/right children (Double rotation in same direction).</div>
              <div>• <strong>Zig-Zag:</strong> Node is left child, parent is right child (Double rotation in opposite directions).</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 7: Cartesian Tree */}
      {activeModule === "cartesian-tree" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-500" />
                  Cartesian Tree (RMQ Range Minimum Query)
                </CardTitle>
                <CardDescription>
                  Binary tree derived from a sequence where in-order traversal recovers the original array sequence and root is the minimum element.
                </CardDescription>
              </div>
              <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30">
                Linear Build: O(N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono">
              <div className="text-muted-foreground mb-1">Array: [9, 3, 7, 1, 8, 12, 10, 20, 15, 18, 5]</div>
              <div className="text-purple-400 font-bold">Root = 1 (Global Minimum)</div>
              <div className="text-foreground mt-1">Left Subtree = CartesianTree([9, 3, 7]) → Root 3</div>
              <div className="text-foreground">Right Subtree = CartesianTree([8, 12, 10, 20, 15, 18, 5]) → Root 5</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 8: Persistent Segment Tree */}
      {activeModule === "persistent-segment-tree" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Layers className="h-5 w-5 text-cyan-500" />
                  Persistent Segment Tree (Versioned Trees)
                </CardTitle>
                <CardDescription>
                  Preserves previous historical versions by creating O(log N) new cloned nodes per point update instead of rewriting in-place.
                </CardDescription>
              </div>
              <Badge className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">
                Query &amp; Update: O(log N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold">Select Historical Version:</span>
              <Button size="sm" variant={activeVersion === 0 ? "default" : "outline"} onClick={() => setActiveVersion(0)}>
                Version 0 (Initial Array)
              </Button>
              <Button size="sm" variant={activeVersion === 1 ? "default" : "outline"} onClick={() => setActiveVersion(1)}>
                Version 1 (arr[2] = 10)
              </Button>
              <Button size="sm" variant={activeVersion === 2 ? "default" : "outline"} onClick={() => setActiveVersion(2)}>
                Version 2 (arr[0] = 5)
              </Button>
            </div>

            <div className="p-4 bg-card rounded-xl border border-border space-y-3">
              <div className="text-xs text-muted-foreground font-mono">
                Active Root Pointer: <strong>root[{activeVersion}]</strong> | Shared unmodified subtree nodes reused across versions.
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-muted/30 rounded-lg border border-border">
                  <div className="font-bold text-foreground">Range Sum [0..3]</div>
                  <div className="text-cyan-400 font-bold mt-1">
                    {activeVersion === 0 ? "Sum = 12" : activeVersion === 1 ? "Sum = 20" : "Sum = 23"}
                  </div>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg border border-border">
                  <div className="font-bold text-foreground">Cloned Nodes in Path</div>
                  <div className="text-muted-foreground mt-1">⌈log₂ N⌉ + 1 = 3 nodes</div>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg border border-border">
                  <div className="font-bold text-foreground">Memory Saved</div>
                  <div className="text-emerald-400 font-bold mt-1">~75% via node sharing</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
