"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DSATopic } from "@/data/dsa-topic-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  ExternalLink, 
  Layers, 
  Tv, 
  ArrowRight
} from "lucide-react";

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

// Dedicated visualizers
import { StackVisualizer } from "@/components/visualizer/stack/stack-visualizer";
import { QueueVisualizer } from "@/components/visualizer/queue/queue-visualizer";
import { LinkedListVisualizer } from "@/components/visualizer/linked-list/linked-list-visualizer";
import { SearchingVisualizer } from "@/components/visualizer/searching/searching-visualizer";
import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer";
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

interface DSATopicVisualizerProps {
  topic: DSATopic;
}

export function DSATopicVisualizer({ topic }: DSATopicVisualizerProps) {
  const [sqSubMode, setSqSubMode] = useState<"stack" | "queue">("stack");
  const [sortingSubAlgo, setSortingSubAlgo] = useState<"bubble" | "selection" | "insertion" | "merge" | "quick">("bubble");
  const [treeSubMode, setTreeSubMode] = useState<"bst" | "avl" | "heap">("bst");

  // Mapping topic to dedicated standalone studio route if available
  const getDedicatedStudioUrl = () => {
    switch (topic.id) {
      case "comparison-sorts":
        return { url: "/visualizer/bubble-sort", label: "Bubble / Comparison Sort Studio" };
      case "efficient-sorts":
        return { url: "/visualizer/quick-sort", label: "Quick / Merge Sort Studio" };
      case "linear-sorts":
        return { url: "/visualizer/counting-sort", label: "Counting Sort Studio" };
      case "linear-binary-search":
        return { url: "/visualizer/binary-search", label: "Binary Search Studio" };
      case "advanced-searching":
        return { url: "/visualizer/linear-search", label: "Linear Search Studio" };
      case "stack-queue-all":
        return { url: "/visualizer/stack", label: "Stack & Queue Studio" };
      case "linked-list-all":
        return { url: "/visualizer/linked-list", label: "Linked List Studio" };
      case "bst-traversals":
        return { url: "/visualizer/binary-tree", label: "Binary Tree Studio" };
      case "avl-rotations":
        return { url: "/visualizer/avl-tree", label: "AVL Tree Studio" };
      case "binary-heap-pq":
        return { url: "/visualizer/heap", label: "Binary Heap Studio" };
      case "shortest-path-dijkstra":
        return { url: "/visualizer/dijkstra", label: "Dijkstra Graph Studio" };
      case "two-pointers":
        return { url: "/visualizer/two-pointers", label: "Two Pointers Studio" };
      case "sliding-window":
        return { url: "/visualizer/sliding-window", label: "Sliding Window Studio" };
      case "kadanes-algorithm":
        return { url: "/visualizer/kadanes-algorithm", label: "Kadane's Studio" };
      case "prefix-sum":
        return { url: "/visualizer/prefix-sum", label: "Prefix Sum Studio" };
      case "difference-array":
        return { url: "/visualizer/difference-array", label: "Difference Array Studio" };
      case "dutch-national-flag":
        return { url: "/visualizer/dutch-national-flag", label: "Dutch National Flag Studio" };
      case "boyer-moore":
        return { url: "/visualizer/boyer-moore", label: "Boyer-Moore Studio" };
      case "backtracking-nqueens":
        return { url: "/visualizer/custom-recursion", label: "Custom Recursion Studio" };
      default:
        return null;
    }
  };

  const dedicatedStudio = getDedicatedStudioUrl();

  const renderVisualizerContent = () => {
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
      if (topic.id === "avl-rotations") return <TreeSuiteVisualizer defaultMode="avl" />;
      if (topic.id === "binary-heap-pq") return <TreeSuiteVisualizer defaultMode="heap" />;
      return <TreeSuiteVisualizer defaultMode="bst" />;
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

  return (
    <div className="space-y-4">
      {/* Studio Banner if dedicated standalone studio exists */}
      {dedicatedStudio && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-muted/40 rounded-xl border border-border text-xs">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-mono">
              <Tv className="h-3 w-3 mr-1" /> Dedicated Studio
            </Badge>
            <span className="text-muted-foreground">
              Experience the full-page video-like animation with audio synthesis &amp; timeline scrubber.
            </span>
          </div>

          <Button asChild size="sm" variant="default" className="h-7 text-xs gap-1.5 font-bold shadow-xs">
            <Link href={dedicatedStudio.url} target="_blank">
              <span>Open {dedicatedStudio.label}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      )}

      {/* Embedded Visualizer */}
      <div className="w-full">
        {renderVisualizerContent()}
      </div>
    </div>
  );
}
