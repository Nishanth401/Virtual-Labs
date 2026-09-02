"use client";

import React from "react";
import { DSATopic } from "@/data/dsa-topic-data";
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

interface DGTopicVisualizerProps {
  topic: DSATopic;
}

export function DGTopicVisualizer({ topic }: DGTopicVisualizerProps) {
  // Category-based routing & visualizerType matching
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

  if (topic.categoryId === "greedy-algorithms") {
    return <GreedyDpVisualizer defaultMode="activity" />;
  }

  if (topic.categoryId === "dynamic-programming") {
    if (topic.id === "dp-1d-basics") return <GreedyDpVisualizer defaultMode="dp-fib" />;
    return <GreedyDpVisualizer defaultMode="dp-knapsack-2d" />;
  }

  if (topic.categoryId === "hashing-collisions") {
    return <HashingSuiteVisualizer />;
  }

  if (topic.categoryId === "string-algorithms-suite") {
    return <StringSuiteVisualizer />;
  }

  if (topic.categoryId === "divide-and-conquer") {
    return <SortingSuiteVisualizer defaultAlgo="merge" />;
  }

  if (topic.categoryId === "complexity-analysis") {
    return <ComplexityComparator />;
  }

  // Fallback to Sorting Suite
  return <SortingSuiteVisualizer defaultAlgo="bubble" />;
}
