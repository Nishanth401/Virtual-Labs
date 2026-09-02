"use client";

import React from "react";
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

interface DSATopicVisualizerProps {
  topic: DSATopic;
}

export function DSATopicVisualizer({ topic }: DSATopicVisualizerProps) {
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
      if (topic.id === "matrix-ds") return <BasicDSVisualizer initialMode="matrix" />;
      if (topic.id === "linked-list-all") return <BasicDSVisualizer initialMode="linked-list" />;
      if (topic.id === "stack-queue-all") return <BasicDSVisualizer initialMode="stack-queue" />;
      return <BasicDSVisualizer initialMode="array" />;
    }

    // 2. Searching Algorithms
    if (topic.categoryId === "searching-algorithms") {
      if (topic.id === "advanced-searching") return <SearchingSuiteVisualizer defaultAlgo="jump" />;
      return <SearchingSuiteVisualizer defaultAlgo="binary" />;
    }

    // 3. Sorting Algorithms
    if (topic.categoryId === "sorting-algorithms") {
      if (topic.id === "efficient-sorts") return <SortingSuiteVisualizer defaultAlgo="quick" />;
      if (topic.id === "linear-sorts") return <SortingSuiteVisualizer defaultAlgo="counting" />;
      return <SortingSuiteVisualizer defaultAlgo="bubble" />;
    }

    // 4. Recursion & Backtracking
    if (topic.categoryId === "recursion-backtracking") {
      if (topic.id === "backtracking-nqueens") return <RecursionBacktrackingVisualizer defaultMode="nqueens" />;
      return <RecursionBacktrackingVisualizer defaultMode="factorial" />;
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
      return <GraphSuiteVisualizer defaultMode="dijkstra" />;
    }

    // 7. Greedy Algorithms
    if (topic.categoryId === "greedy-algorithms") {
      return <GreedyDpVisualizer defaultMode="activity" />;
    }

    // 8. Dynamic Programming
    if (topic.categoryId === "dynamic-programming") {
      return <GreedyDpVisualizer defaultMode="knapsack" />;
    }

    // 9. Hashing & Collisions
    if (topic.categoryId === "hashing-collisions") {
      return <HashingSuiteVisualizer defaultMode="chaining" />;
    }

    // 10. String Algorithms & Tries
    if (topic.categoryId === "string-algorithms") {
      return <StringSuiteVisualizer defaultMode="trie" />;
    }

    // 11. Divide & Conquer
    if (topic.categoryId === "divide-conquer") {
      return <SortingSuiteVisualizer defaultAlgo="merge" />;
    }

    // 12. Complexity Analysis
    if (topic.categoryId === "complexity-analysis") {
      return <ComplexityComparator />;
    }

    return <BasicDSVisualizer initialMode="array" />;
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
