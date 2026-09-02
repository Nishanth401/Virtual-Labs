"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DSATopic } from "@/data/dsa-topic-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Sparkles, 
  ExternalLink, 
  Layers, 
  Tv, 
  FlaskConical, 
  ArrowRight,
  Code2
} from "lucide-react";

// Classic Visualizer Components from @/components/visualizer/
import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer";
import { SearchingVisualizer } from "@/components/visualizer/searching/searching-visualizer";
import { StackVisualizer } from "@/components/visualizer/stack/stack-visualizer";
import { QueueVisualizer } from "@/components/visualizer/queue/queue-visualizer";
import { LinkedListVisualizer } from "@/components/visualizer/linked-list/linked-list-visualizer";
import { BinaryTreeVisualizer } from "@/components/visualizer/binary-tree/binary-tree-visualizer";
import { AVLTreeVisualizer } from "@/components/visualizer/avl-tree/avl-tree-visualizer";
import { HeapVisualizer } from "@/components/visualizer/heap/heap-visualizer";
import { DijkstraVisualizer } from "@/components/visualizer/dijkstra/dijkstra-visualizer";
import { TwoPointersVisualizer } from "@/components/visualizer/two-pointers/two-pointers-visualizer";
import { SlidingWindowVisualizer } from "@/components/visualizer/sliding-window/sliding-window-visualizer";
import { KadanesVisualizer } from "@/components/visualizer/kadanes-algorithm/kadanes-visualizer";
import { PrefixSumVisualizer } from "@/components/visualizer/prefix-sum/prefix-sum-visualizer";
import { DifferenceArrayVisualizer } from "@/components/visualizer/difference-array/difference-array-visualizer";
import { DNFVisualizer } from "@/components/visualizer/dutch-national-flag/dnf-visualizer";
import { BoyerMooreVisualizer } from "@/components/visualizer/boyer-moore/boyer-moore-visualizer";
import { HuffmanVisualizer } from "@/components/visualizer/huffman/huffman-visualizer";

// Modular Interactive Lab Simulators
import { BasicDSVisualizer } from "./basic-ds-visualizer";
import { SearchingSuiteVisualizer } from "./searching-suite-visualizer";
import { SortingSuiteVisualizer } from "./sorting-suite-visualizer";
import { RecursionBacktrackingVisualizer } from "./recursion-backtracking-visualizer";
import { TreeSuiteVisualizer } from "./tree-suite-visualizer";
import { GraphSuiteVisualizer } from "./graph-suite-visualizer";
import { GreedyDpVisualizer } from "./greedy-dp-visualizer";
import { HashingSuiteVisualizer } from "./hashing-suite-visualizer";
import { StringSuiteVisualizer } from "./string-suite-visualizer";
import { ComplexityComparator } from "./complexity-comparator";

interface DSATopicVisualizerProps {
  topic: DSATopic;
}

export function DSATopicVisualizer({ topic }: DSATopicVisualizerProps) {
  // Mode: "studio" (classic timeline/bar-chart animation) or "lab" (modular step-by-step sandbox)
  const [engineMode, setEngineMode] = useState<"studio" | "lab">("studio");
  const [sortingSubAlgo, setSortingSubAlgo] = useState<"bubble" | "selection" | "insertion" | "merge" | "quick">("bubble");
  const [sqSubMode, setSqSubMode] = useState<"stack" | "queue">("stack");
  const [treeSubMode, setTreeSubMode] = useState<"bst" | "avl" | "heap">("bst");

  // Determine dedicated route URL for external launch
  const getDedicatedUrl = () => {
    if (topic.categoryId === "sorting-algorithms") return `/visualizer/${sortingSubAlgo}-sort`;
    if (topic.categoryId === "searching-algorithms") return `/visualizer/binary-search`;
    if (topic.id === "stack-queue-all") return sqSubMode === "stack" ? `/visualizer/stack` : `/visualizer/queue`;
    if (topic.id === "linked-list-all") return `/visualizer/linked-list`;
    if (topic.categoryId === "trees-balanced") return `/visualizer/${treeSubMode === "bst" ? "binary-tree" : treeSubMode === "avl" ? "avl-tree" : "heap"}`;
    if (topic.categoryId === "graphs-networks") return `/visualizer/dijkstra`;
    if (topic.id === "custom-recursion") return `/visualizer/custom-recursion`;
    return null;
  };

  const dedicatedUrl = getDedicatedUrl();

  // Render Studio Mode Visualizer
  const renderStudioVisualizer = () => {
    // 1. Basic Data Structures
    if (topic.categoryId === "basic-data-structures") {
      if (topic.id === "stack-queue-all") {
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <span className="text-xs font-mono text-muted-foreground">Select DS:</span>
              <Button
                size="sm"
                variant={sqSubMode === "stack" ? "default" : "outline"}
                onClick={() => setSqSubMode("stack")}
                className="h-7 text-xs"
              >
                Stack (LIFO)
              </Button>
              <Button
                size="sm"
                variant={sqSubMode === "queue" ? "default" : "outline"}
                onClick={() => setSqSubMode("queue")}
                className="h-7 text-xs"
              >
                Queue (FIFO)
              </Button>
            </div>
            {sqSubMode === "stack" ? <StackVisualizer /> : <QueueVisualizer />}
          </div>
        );
      }
      if (topic.id === "linked-list-all") {
        return <LinkedListVisualizer />;
      }
      // Array / Matrix fallback to rich BasicDSVisualizer
      return <BasicDSVisualizer initialMode={topic.id === "matrix-ds" ? "matrix" : "array"} />;
    }

    // 2. Searching Algorithms
    if (topic.categoryId === "searching-algorithms") {
      return (
        <div className="space-y-4">
          <SearchingVisualizer type={topic.id === "advanced-searching" ? "binary" : "linear"} />
        </div>
      );
    }

    // 3. Sorting Algorithms
    if (topic.categoryId === "sorting-algorithms") {
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-border">
            <span className="text-xs font-mono text-muted-foreground">Select Algorithm:</span>
            {(["bubble", "selection", "insertion", "merge", "quick"] as const).map((algo) => (
              <Button
                key={algo}
                size="sm"
                variant={sortingSubAlgo === algo ? "default" : "outline"}
                onClick={() => setSortingSubAlgo(algo)}
                className="h-7 text-xs capitalize font-semibold"
              >
                {algo} Sort
              </Button>
            ))}
          </div>

          <SortingVisualizer
            algorithm={sortingSubAlgo}
            title={`${sortingSubAlgo.toUpperCase()} Sort Visualizer`}
            description={`Interactive ${sortingSubAlgo} sort with animated vertical bars, step scrubber, comparison counters, and live pseudocode pointer.`}
          />
        </div>
      );
    }

    // 4. Recursion & Backtracking
    if (topic.categoryId === "recursion-backtracking") {
      return <RecursionBacktrackingVisualizer defaultMode={topic.id === "backtracking-nqueens" ? "nqueens" : "factorial"} />;
    }

    // 5. Trees & Balanced Trees
    if (topic.categoryId === "trees-balanced") {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <span className="text-xs font-mono text-muted-foreground">Select Tree:</span>
            <Button
              size="sm"
              variant={treeSubMode === "bst" ? "default" : "outline"}
              onClick={() => setTreeSubMode("bst")}
              className="h-7 text-xs"
            >
              Binary Search Tree
            </Button>
            <Button
              size="sm"
              variant={treeSubMode === "avl" ? "default" : "outline"}
              onClick={() => setTreeSubMode("avl")}
              className="h-7 text-xs"
            >
              AVL Tree (Self-Balancing)
            </Button>
            <Button
              size="sm"
              variant={treeSubMode === "heap" ? "default" : "outline"}
              onClick={() => setTreeSubMode("heap")}
              className="h-7 text-xs"
            >
              Binary Heap
            </Button>
          </div>

          {treeSubMode === "bst" && <BinaryTreeVisualizer />}
          {treeSubMode === "avl" && <AVLTreeVisualizer />}
          {treeSubMode === "heap" && <HeapVisualizer />}
        </div>
      );
    }

    // 6. Graphs & Networks
    if (topic.categoryId === "graphs-networks") {
      if (topic.id === "bfs-dfs-traversal") return <GraphSuiteVisualizer defaultMode="bfs" />;
      if (topic.id === "mst-union-find") return <GraphSuiteVisualizer defaultMode="union-find" />;
      return <DijkstraVisualizer />;
    }

    // 7. Greedy & DP
    if (topic.categoryId === "greedy-algorithms") {
      return <GreedyDpVisualizer defaultMode="activity" />;
    }

    if (topic.categoryId === "dynamic-programming") {
      return <GreedyDpVisualizer defaultMode="dp-knapsack-2d" />;
    }

    // 8. Hashing
    if (topic.categoryId === "hashing-collisions") {
      return <HashingSuiteVisualizer defaultMode="chaining" />;
    }

    // 9. Strings
    if (topic.categoryId === "string-algorithms") {
      return <StringSuiteVisualizer defaultMode="trie" />;
    }

    // 10. Divide & Conquer / Algorithmic Patterns
    if (topic.id === "two-pointers") return <TwoPointersVisualizer />;
    if (topic.id === "sliding-window") return <SlidingWindowVisualizer />;
    if (topic.id === "kadanes-algorithm") return <KadanesVisualizer />;
    if (topic.id === "prefix-sum") return <PrefixSumVisualizer />;
    if (topic.id === "difference-array") return <DifferenceArrayVisualizer />;
    if (topic.id === "dutch-national-flag") return <DNFVisualizer />;
    if (topic.id === "boyer-moore") return <BoyerMooreVisualizer />;
    if (topic.id === "huffman") return <HuffmanVisualizer />;

    if (topic.categoryId === "divide-conquer") {
      return <SortingSuiteVisualizer defaultAlgo="merge" />;
    }

    if (topic.categoryId === "complexity-analysis") {
      return <ComplexityComparator />;
    }

    // Fallback
    return <SortingVisualizer algorithm="bubble" title="Bubble Sort" description="Adjacent comparison visualizer." />;
  };

  // Render Lab Mode Visualizer (Compact modular simulation sandbox)
  const renderLabVisualizer = () => {
    if (topic.categoryId === "basic-data-structures") {
      if (topic.id === "matrix-ds") return <BasicDSVisualizer initialMode="matrix" />;
      if (topic.id === "linked-list-all") return <BasicDSVisualizer initialMode="linked-list" />;
      if (topic.id === "stack-queue-all") return <BasicDSVisualizer initialMode="stack-queue" />;
      return <BasicDSVisualizer initialMode="array" />;
    }

    if (topic.categoryId === "searching-algorithms") {
      if (topic.id === "advanced-searching") return <SearchingSuiteVisualizer defaultAlgo="jump" />;
      return <SearchingSuiteVisualizer defaultAlgo="binary" />;
    }

    if (topic.categoryId === "sorting-algorithms") {
      if (topic.id === "efficient-sorts") return <SortingSuiteVisualizer defaultAlgo="quick" />;
      if (topic.id === "linear-sorts") return <SortingSuiteVisualizer defaultAlgo="counting" />;
      return <SortingSuiteVisualizer defaultAlgo="bubble" />;
    }

    if (topic.categoryId === "recursion-backtracking") {
      if (topic.id === "backtracking-nqueens") return <RecursionBacktrackingVisualizer defaultMode="nqueens" />;
      return <RecursionBacktrackingVisualizer defaultMode="factorial" />;
    }

    if (topic.categoryId === "trees-balanced") {
      if (topic.id === "avl-rotations") return <TreeSuiteVisualizer defaultMode="avl" />;
      if (topic.id === "binary-heap-pq") return <TreeSuiteVisualizer defaultMode="heap" />;
      return <TreeSuiteVisualizer defaultMode="bst" />;
    }

    if (topic.categoryId === "graphs-networks") {
      if (topic.id === "bfs-dfs-traversal") return <GraphSuiteVisualizer defaultMode="bfs" />;
      if (topic.id === "mst-union-find") return <GraphSuiteVisualizer defaultMode="union-find" />;
      return <GraphSuiteVisualizer defaultMode="dijkstra" />;
    }

    if (topic.categoryId === "greedy-algorithms") return <GreedyDpVisualizer defaultMode="activity" />;
    if (topic.categoryId === "dynamic-programming") return <GreedyDpVisualizer defaultMode="dp-knapsack-2d" />;
    if (topic.categoryId === "hashing-collisions") return <HashingSuiteVisualizer defaultMode="chaining" />;
    if (topic.categoryId === "string-algorithms") return <StringSuiteVisualizer defaultMode="trie" />;
    if (topic.categoryId === "complexity-analysis") return <ComplexityComparator />;

    return <SortingSuiteVisualizer defaultAlgo="bubble" />;
  };

  return (
    <div className="space-y-4">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-muted/40 rounded-xl border border-border text-xs">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-mono">
            Interactive Engine
          </Badge>
          <div className="flex items-center bg-background rounded-lg border border-border p-0.5">
            <Button
              size="sm"
              variant={engineMode === "studio" ? "default" : "ghost"}
              onClick={() => setEngineMode("studio")}
              className="h-7 text-xs gap-1 font-semibold"
            >
              <Tv className="h-3.5 w-3.5" /> Video Animation Studio
            </Button>
            <Button
              size="sm"
              variant={engineMode === "lab" ? "default" : "ghost"}
              onClick={() => setEngineMode("lab")}
              className="h-7 text-xs gap-1 font-semibold"
            >
              <FlaskConical className="h-3.5 w-3.5" /> Curriculum Lab Mode
            </Button>
          </div>
        </div>

        {dedicatedUrl && (
          <Button asChild variant="outline" size="sm" className="h-7 text-xs gap-1 text-primary hover:text-primary">
            <Link href={dedicatedUrl} target="_blank">
              <span>Fullscreen Studio Page</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </Button>
        )}
      </div>

      {/* Render Active Engine */}
      <div className="transition-all duration-200">
        {engineMode === "studio" ? renderStudioVisualizer() : renderLabVisualizer()}
      </div>
    </div>
  );
}
