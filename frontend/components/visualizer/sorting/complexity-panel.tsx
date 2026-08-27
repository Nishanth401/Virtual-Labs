"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  HardDrive,
  Check,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  GitBranch,
  ExternalLink,
  Award
} from "lucide-react";
import { SortingAlgorithm } from "@/hooks/use-sorting";

interface ComplexityPanelProps {
  algorithm: SortingAlgorithm;
}

interface LeetCodeMetricData {
  name: string;
  currentApproach: string;
  suggestedApproach: string;
  keyIdea: string;
  considerQuestion: string;
  runtimeMs: number;
  runtimePercentile: number;
  memoryMb: number;
  memoryPercentile: number;
  runtimeBins: { label: string; height: number; isUser: boolean }[];
  memoryBins: { label: string; height: number; isUser: boolean }[];
  runtimeXAxis: string[];
  memoryXAxis: string[];
}

const LEETCODE_DATA: Record<SortingAlgorithm, LeetCodeMetricData> = {
  cyclic: {
    name: "Cyclic Sort",
    currentApproach: "Cyclic Sort",
    suggestedApproach: "In-Place Index Matching Pattern",
    keyIdea: "Iterate through the array and swap each element arr[i] into its correct target index in-place with at most n-1 swaps.",
    considerQuestion: "Can you extend this approach to solve LeetCode #41 (First Missing Positive) in O(n) time and O(1) auxiliary space?",
    runtimeMs: 0,
    runtimePercentile: 99.42,
    memoryMb: 41.35,
    memoryPercentile: 98.15,
    runtimeBins: [
      { label: "0ms", height: 82, isUser: true },
      { label: "1ms", height: 4, isUser: false },
      { label: "2ms", height: 4, isUser: false },
      { label: "3ms", height: 4, isUser: false },
      { label: "4ms", height: 4, isUser: false },
      { label: "5ms", height: 4, isUser: false },
      { label: "6ms", height: 4, isUser: false },
      { label: "7ms", height: 4, isUser: false },
      { label: "8ms", height: 4, isUser: false },
      { label: "9ms", height: 4, isUser: false },
      { label: "10ms", height: 4, isUser: false },
      { label: "11ms", height: 4, isUser: false },
      { label: "12ms", height: 4, isUser: false },
      { label: "13ms", height: 4, isUser: false },
      { label: "14ms", height: 4, isUser: false },
      { label: "15ms", height: 4, isUser: false },
      { label: "16ms", height: 4, isUser: false },
      { label: "17ms", height: 4, isUser: false },
      { label: "18ms", height: 4, isUser: false },
      { label: "19ms", height: 4, isUser: false },
      { label: "20ms", height: 4, isUser: false },
    ],
    memoryBins: [
      { label: "40.8MB", height: 8, isUser: false },
      { label: "41.3MB", height: 78, isUser: true },
      { label: "41.8MB", height: 35, isUser: false },
      { label: "42.3MB", height: 18, isUser: false },
      { label: "42.8MB", height: 8, isUser: false },
      { label: "43.3MB", height: 5, isUser: false },
      { label: "43.8MB", height: 4, isUser: false },
      { label: "44.3MB", height: 4, isUser: false },
      { label: "44.8MB", height: 4, isUser: false },
      { label: "45.3MB", height: 4, isUser: false },
      { label: "45.8MB", height: 4, isUser: false },
      { label: "46.3MB", height: 4, isUser: false },
      { label: "46.8MB", height: 4, isUser: false },
      { label: "47.3MB", height: 4, isUser: false },
      { label: "47.8MB", height: 4, isUser: false },
      { label: "48.3MB", height: 4, isUser: false },
      { label: "48.8MB", height: 4, isUser: false },
      { label: "49.3MB", height: 4, isUser: false },
      { label: "49.8MB", height: 4, isUser: false },
      { label: "50.3MB", height: 4, isUser: false },
      { label: "50.8MB", height: 4, isUser: false },
    ],
    runtimeXAxis: ["5ms", "10ms", "15ms", "20ms"],
    memoryXAxis: ["42MB", "44MB", "46MB", "48MB"]
  },
  merge: {
    name: "Merge Sort",
    currentApproach: "Merge Sort",
    suggestedApproach: "Divide & Conquer (O(n log n))",
    keyIdea: "Recursively divide the array into halves, sort each subarray, and merge the sorted partitions using a linear two-way pointer pass.",
    considerQuestion: "Can you implement this iteratively using bottom-up merge sort to reduce recursion call-stack depth?",
    runtimeMs: 1,
    runtimePercentile: 98.54,
    memoryMb: 42.46,
    memoryPercentile: 79.12,
    runtimeBins: [
      { label: "0ms", height: 8, isUser: false },
      { label: "1ms", height: 75, isUser: true },
      { label: "2ms", height: 4, isUser: false },
      { label: "3ms", height: 4, isUser: false },
      { label: "4ms", height: 4, isUser: false },
      { label: "5ms", height: 4, isUser: false },
      { label: "6ms", height: 4, isUser: false },
      { label: "7ms", height: 4, isUser: false },
      { label: "8ms", height: 4, isUser: false },
      { label: "9ms", height: 4, isUser: false },
      { label: "10ms", height: 4, isUser: false },
      { label: "11ms", height: 4, isUser: false },
      { label: "12ms", height: 4, isUser: false },
      { label: "13ms", height: 4, isUser: false },
      { label: "14ms", height: 4, isUser: false },
      { label: "15ms", height: 4, isUser: false },
      { label: "16ms", height: 4, isUser: false },
      { label: "17ms", height: 4, isUser: false },
      { label: "18ms", height: 4, isUser: false },
      { label: "19ms", height: 4, isUser: false },
      { label: "20ms", height: 4, isUser: false },
    ],
    memoryBins: [
      { label: "41.0MB", height: 12, isUser: false },
      { label: "41.5MB", height: 22, isUser: false },
      { label: "42.4MB", height: 68, isUser: true },
      { label: "43.0MB", height: 35, isUser: false },
      { label: "43.5MB", height: 15, isUser: false },
      { label: "44.0MB", height: 8, isUser: false },
      { label: "44.5MB", height: 4, isUser: false },
      { label: "45.0MB", height: 4, isUser: false },
      { label: "45.5MB", height: 4, isUser: false },
      { label: "46.0MB", height: 4, isUser: false },
      { label: "46.5MB", height: 4, isUser: false },
      { label: "47.0MB", height: 4, isUser: false },
      { label: "47.5MB", height: 4, isUser: false },
      { label: "48.0MB", height: 4, isUser: false },
      { label: "48.5MB", height: 4, isUser: false },
      { label: "49.0MB", height: 4, isUser: false },
      { label: "49.5MB", height: 4, isUser: false },
      { label: "50.0MB", height: 4, isUser: false },
      { label: "50.5MB", height: 4, isUser: false },
      { label: "51.0MB", height: 4, isUser: false },
      { label: "51.5MB", height: 4, isUser: false },
    ],
    runtimeXAxis: ["5ms", "10ms", "15ms", "20ms"],
    memoryXAxis: ["42MB", "44MB", "46MB", "48MB"]
  },
  quick: {
    name: "Quick Sort",
    currentApproach: "Quick Sort",
    suggestedApproach: "3-Way Dutch Partitioning",
    keyIdea: "Select a pivot element, partition smaller elements to the left and larger to the right, and recursively sort sub-partitions in-place.",
    considerQuestion: "Can you implement randomized pivot selection to prevent worst-case O(n²) degradation on adversarial sorted arrays?",
    runtimeMs: 1,
    runtimePercentile: 97.80,
    memoryMb: 42.10,
    memoryPercentile: 91.30,
    runtimeBins: [
      { label: "0ms", height: 6, isUser: false },
      { label: "1ms", height: 72, isUser: true },
      { label: "2ms", height: 4, isUser: false },
      { label: "3ms", height: 4, isUser: false },
      { label: "4ms", height: 4, isUser: false },
      { label: "5ms", height: 4, isUser: false },
      { label: "6ms", height: 4, isUser: false },
      { label: "7ms", height: 4, isUser: false },
      { label: "8ms", height: 4, isUser: false },
      { label: "9ms", height: 4, isUser: false },
      { label: "10ms", height: 4, isUser: false },
      { label: "11ms", height: 4, isUser: false },
      { label: "12ms", height: 4, isUser: false },
      { label: "13ms", height: 4, isUser: false },
      { label: "14ms", height: 4, isUser: false },
      { label: "15ms", height: 4, isUser: false },
      { label: "16ms", height: 4, isUser: false },
      { label: "17ms", height: 4, isUser: false },
      { label: "18ms", height: 4, isUser: false },
      { label: "19ms", height: 4, isUser: false },
      { label: "20ms", height: 4, isUser: false },
    ],
    memoryBins: [
      { label: "41.0MB", height: 10, isUser: false },
      { label: "42.1MB", height: 74, isUser: true },
      { label: "42.8MB", height: 28, isUser: false },
      { label: "43.5MB", height: 12, isUser: false },
      { label: "44.0MB", height: 6, isUser: false },
      { label: "44.5MB", height: 4, isUser: false },
      { label: "45.0MB", height: 4, isUser: false },
      { label: "45.5MB", height: 4, isUser: false },
      { label: "46.0MB", height: 4, isUser: false },
      { label: "46.5MB", height: 4, isUser: false },
      { label: "47.0MB", height: 4, isUser: false },
      { label: "47.5MB", height: 4, isUser: false },
      { label: "48.0MB", height: 4, isUser: false },
      { label: "48.5MB", height: 4, isUser: false },
      { label: "49.0MB", height: 4, isUser: false },
      { label: "49.5MB", height: 4, isUser: false },
      { label: "50.0MB", height: 4, isUser: false },
      { label: "50.5MB", height: 4, isUser: false },
      { label: "51.0MB", height: 4, isUser: false },
      { label: "51.5MB", height: 4, isUser: false },
      { label: "52.0MB", height: 4, isUser: false },
    ],
    runtimeXAxis: ["5ms", "10ms", "15ms", "20ms"],
    memoryXAxis: ["42MB", "44MB", "46MB", "48MB"]
  },
  bubble: {
    name: "Bubble Sort",
    currentApproach: "Bubble Sort",
    suggestedApproach: "Flag-Optimized Early Exit",
    keyIdea: "Repeatedly step through the list, compare adjacent elements, and swap them if in wrong order until no swaps occur.",
    considerQuestion: "Can you explain why Bubble Sort performs O(n²) comparisons in worst case, and how the swapped flag provides O(n) best case?",
    runtimeMs: 12,
    runtimePercentile: 45.10,
    memoryMb: 41.90,
    memoryPercentile: 95.80,
    runtimeBins: [
      { label: "0ms", height: 4, isUser: false },
      { label: "1ms", height: 4, isUser: false },
      { label: "2ms", height: 4, isUser: false },
      { label: "3ms", height: 4, isUser: false },
      { label: "4ms", height: 4, isUser: false },
      { label: "5ms", height: 4, isUser: false },
      { label: "6ms", height: 4, isUser: false },
      { label: "7ms", height: 4, isUser: false },
      { label: "8ms", height: 4, isUser: false },
      { label: "9ms", height: 4, isUser: false },
      { label: "10ms", height: 4, isUser: false },
      { label: "11ms", height: 4, isUser: false },
      { label: "12ms", height: 65, isUser: true },
      { label: "13ms", height: 4, isUser: false },
      { label: "14ms", height: 4, isUser: false },
      { label: "15ms", height: 4, isUser: false },
      { label: "16ms", height: 4, isUser: false },
      { label: "17ms", height: 4, isUser: false },
      { label: "18ms", height: 4, isUser: false },
      { label: "19ms", height: 4, isUser: false },
      { label: "20ms", height: 4, isUser: false },
    ],
    memoryBins: [
      { label: "41.0MB", height: 10, isUser: false },
      { label: "41.9MB", height: 75, isUser: true },
      { label: "42.5MB", height: 25, isUser: false },
      { label: "43.0MB", height: 10, isUser: false },
      { label: "43.5MB", height: 5, isUser: false },
      { label: "44.0MB", height: 4, isUser: false },
      { label: "44.5MB", height: 4, isUser: false },
      { label: "45.0MB", height: 4, isUser: false },
      { label: "45.5MB", height: 4, isUser: false },
      { label: "46.0MB", height: 4, isUser: false },
      { label: "46.5MB", height: 4, isUser: false },
      { label: "47.0MB", height: 4, isUser: false },
      { label: "47.5MB", height: 4, isUser: false },
      { label: "48.0MB", height: 4, isUser: false },
      { label: "48.5MB", height: 4, isUser: false },
      { label: "49.0MB", height: 4, isUser: false },
      { label: "49.5MB", height: 4, isUser: false },
      { label: "50.0MB", height: 4, isUser: false },
      { label: "50.5MB", height: 4, isUser: false },
      { label: "51.0MB", height: 4, isUser: false },
      { label: "51.5MB", height: 4, isUser: false },
    ],
    runtimeXAxis: ["5ms", "10ms", "15ms", "20ms"],
    memoryXAxis: ["42MB", "44MB", "46MB", "48MB"]
  },
  selection: {
    name: "Selection Sort",
    currentApproach: "Selection Sort",
    suggestedApproach: "Minimum Index Scanning",
    keyIdea: "Find the minimum element in the unsorted subarray and swap it with the element at the beginning boundary.",
    considerQuestion: "Why is Selection Sort unstable by default, and how can long-range swaps invert the relative order of duplicate items?",
    runtimeMs: 14,
    runtimePercentile: 38.40,
    memoryMb: 41.85,
    memoryPercentile: 96.20,
    runtimeBins: [
      { label: "0ms", height: 4, isUser: false },
      { label: "1ms", height: 4, isUser: false },
      { label: "2ms", height: 4, isUser: false },
      { label: "3ms", height: 4, isUser: false },
      { label: "4ms", height: 4, isUser: false },
      { label: "5ms", height: 4, isUser: false },
      { label: "6ms", height: 4, isUser: false },
      { label: "7ms", height: 4, isUser: false },
      { label: "8ms", height: 4, isUser: false },
      { label: "9ms", height: 4, isUser: false },
      { label: "10ms", height: 4, isUser: false },
      { label: "11ms", height: 4, isUser: false },
      { label: "12ms", height: 4, isUser: false },
      { label: "13ms", height: 4, isUser: false },
      { label: "14ms", height: 60, isUser: true },
      { label: "15ms", height: 4, isUser: false },
      { label: "16ms", height: 4, isUser: false },
      { label: "17ms", height: 4, isUser: false },
      { label: "18ms", height: 4, isUser: false },
      { label: "19ms", height: 4, isUser: false },
      { label: "20ms", height: 4, isUser: false },
    ],
    memoryBins: [
      { label: "41.0MB", height: 12, isUser: false },
      { label: "41.8MB", height: 76, isUser: true },
      { label: "42.5MB", height: 22, isUser: false },
      { label: "43.0MB", height: 8, isUser: false },
      { label: "43.5MB", height: 4, isUser: false },
      { label: "44.0MB", height: 4, isUser: false },
      { label: "44.5MB", height: 4, isUser: false },
      { label: "45.0MB", height: 4, isUser: false },
      { label: "45.5MB", height: 4, isUser: false },
      { label: "46.0MB", height: 4, isUser: false },
      { label: "46.5MB", height: 4, isUser: false },
      { label: "47.0MB", height: 4, isUser: false },
      { label: "47.5MB", height: 4, isUser: false },
      { label: "48.0MB", height: 4, isUser: false },
      { label: "48.5MB", height: 4, isUser: false },
      { label: "49.0MB", height: 4, isUser: false },
      { label: "49.5MB", height: 4, isUser: false },
      { label: "50.0MB", height: 4, isUser: false },
      { label: "50.5MB", height: 4, isUser: false },
      { label: "51.0MB", height: 4, isUser: false },
      { label: "51.5MB", height: 4, isUser: false },
    ],
    runtimeXAxis: ["5ms", "10ms", "15ms", "20ms"],
    memoryXAxis: ["42MB", "44MB", "46MB", "48MB"]
  },
  insertion: {
    name: "Insertion Sort",
    currentApproach: "Insertion Sort",
    suggestedApproach: "Binary Insertion / Adaptive Card Sort",
    keyIdea: "Build the sorted array one element at a time by extracting key = arr[i] and shifting preceding greater elements rightward.",
    considerQuestion: "How does Java's Dual-Pivot QuickSort and Python's Timsort use Insertion Sort for small subarrays of size <= 32?",
    runtimeMs: 4,
    runtimePercentile: 74.60,
    memoryMb: 41.95,
    memoryPercentile: 95.10,
    runtimeBins: [
      { label: "0ms", height: 4, isUser: false },
      { label: "1ms", height: 4, isUser: false },
      { label: "2ms", height: 4, isUser: false },
      { label: "3ms", height: 4, isUser: false },
      { label: "4ms", height: 68, isUser: true },
      { label: "5ms", height: 4, isUser: false },
      { label: "6ms", height: 4, isUser: false },
      { label: "7ms", height: 4, isUser: false },
      { label: "8ms", height: 4, isUser: false },
      { label: "9ms", height: 4, isUser: false },
      { label: "10ms", height: 4, isUser: false },
      { label: "11ms", height: 4, isUser: false },
      { label: "12ms", height: 4, isUser: false },
      { label: "13ms", height: 4, isUser: false },
      { label: "14ms", height: 4, isUser: false },
      { label: "15ms", height: 4, isUser: false },
      { label: "16ms", height: 4, isUser: false },
      { label: "17ms", height: 4, isUser: false },
      { label: "18ms", height: 4, isUser: false },
      { label: "19ms", height: 4, isUser: false },
      { label: "20ms", height: 4, isUser: false },
    ],
    memoryBins: [
      { label: "41.0MB", height: 10, isUser: false },
      { label: "41.9MB", height: 75, isUser: true },
      { label: "42.5MB", height: 24, isUser: false },
      { label: "43.0MB", height: 10, isUser: false },
      { label: "43.5MB", height: 5, isUser: false },
      { label: "44.0MB", height: 4, isUser: false },
      { label: "44.5MB", height: 4, isUser: false },
      { label: "45.0MB", height: 4, isUser: false },
      { label: "45.5MB", height: 4, isUser: false },
      { label: "46.0MB", height: 4, isUser: false },
      { label: "46.5MB", height: 4, isUser: false },
      { label: "47.0MB", height: 4, isUser: false },
      { label: "47.5MB", height: 4, isUser: false },
      { label: "48.0MB", height: 4, isUser: false },
      { label: "48.5MB", height: 4, isUser: false },
      { label: "49.0MB", height: 4, isUser: false },
      { label: "49.5MB", height: 4, isUser: false },
      { label: "50.0MB", height: 4, isUser: false },
      { label: "50.5MB", height: 4, isUser: false },
      { label: "51.0MB", height: 4, isUser: false },
      { label: "51.5MB", height: 4, isUser: false },
    ],
    runtimeXAxis: ["5ms", "10ms", "15ms", "20ms"],
    memoryXAxis: ["42MB", "44MB", "46MB", "48MB"]
  }
};

export function ComplexityPanel({ algorithm }: ComplexityPanelProps) {
  const [activeTab, setActiveTab] = useState<"runtime" | "memory">("runtime");
  const [liked, setLiked] = useState<boolean | null>(null);

  const data = LEETCODE_DATA[algorithm] || LEETCODE_DATA.cyclic;
  const currentBins = activeTab === "runtime" ? data.runtimeBins : data.memoryBins;
  const currentXAxis = activeTab === "runtime" ? data.runtimeXAxis : data.memoryXAxis;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 font-sans select-none">
      {/* ========================================================================= */}
      {/* TOP SECTION: LEETCODE APPROACH & CODE STYLE FEEDBACK CARD                 */}
      {/* ========================================================================= */}
      <div className="rounded-2xl bg-[#13141f] border border-white/10 p-5 shadow-xl space-y-4 text-slate-300">
        {/* Top bar: ✓ Approach ✓ Code Style and Thumbs */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-4 text-xs font-semibold text-[#a78bfa]">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#a78bfa]" /> Approach
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#a78bfa]" /> Code Style
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              type="button"
              onClick={() => setLiked(true)}
              className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${
                liked === true ? "text-[#a78bfa]" : ""
              }`}
              title="Helpful"
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setLiked(false)}
              className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${
                liked === false ? "text-rose-400" : ""
              }`}
              title="Not helpful"
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Purple Congratulatory Header Message */}
        <p className="text-sm font-medium text-[#c084fc] leading-relaxed">
          Congratulations! You passed. Although not your first attempt, you solved it efficiently!
        </p>

        {/* Approach Insights Sub-block */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#818cf8]">
            <GitBranch className="w-4 h-4" />
            <span>Approach</span>
          </div>

          <div className="space-y-1.5 pl-6 text-[13px] leading-relaxed">
            <div>
              <span className="text-slate-400">Current: </span>
              <span className="font-bold text-white">{data.currentApproach}</span>
            </div>
            <div>
              <span className="text-slate-400">Suggested: </span>
              <span className="font-bold text-[#4ade80]">{data.suggestedApproach}</span>
            </div>
            <div>
              <span className="text-slate-400">Key Idea: </span>
              <span className="text-slate-200">{data.keyIdea}</span>
            </div>
            <div>
              <span className="text-slate-400">Consider: </span>
              <span className="text-slate-200">{data.considerQuestion}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN LEETCODE RUNTIME & MEMORY DISTRIBUTION GRAPH CONTAINER               */}
      {/* ========================================================================= */}
      <div className="rounded-2xl bg-[#1a1b26] border border-white/10 p-6 shadow-2xl space-y-6">
        {/* Top Two Switchable Metrics Tabs Header */}
        <div className="grid grid-cols-2 gap-4">
          {/* TAB 1: RUNTIME TAB */}
          <button
            type="button"
            onClick={() => setActiveTab("runtime")}
            className={`p-4 rounded-xl text-left transition-all relative overflow-hidden flex items-center justify-between border cursor-pointer ${
              activeTab === "runtime"
                ? "bg-[#282a36] border-white/20 shadow-lg"
                : "bg-transparent border-transparent hover:bg-white/5 opacity-60"
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Clock className="w-4 h-4" />
                <span>Runtime</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono text-white tracking-tight">
                  {data.runtimeMs} <span className="text-base font-normal">ms</span>
                </span>
                <span className="text-xs text-slate-400">
                  | Beats <span className="font-bold text-white">{data.runtimePercentile}%</span> 👏
                </span>
              </div>
            </div>

            <Sparkles className="w-4 h-4 text-[#818cf8]" />
          </button>

          {/* TAB 2: MEMORY TAB */}
          <button
            type="button"
            onClick={() => setActiveTab("memory")}
            className={`p-4 rounded-xl text-left transition-all relative overflow-hidden flex items-center justify-between border cursor-pointer ${
              activeTab === "memory"
                ? "bg-[#282a36] border-white/20 shadow-lg"
                : "bg-transparent border-transparent hover:bg-white/5 opacity-60"
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <HardDrive className="w-4 h-4" />
                <span>Memory</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono text-white tracking-tight">
                  {data.memoryMb} <span className="text-base font-normal">MB</span>
                </span>
                <span className="text-xs text-slate-400">
                  | Beats <span className="font-bold text-white">{data.memoryPercentile}%</span> 👏
                </span>
              </div>
            </div>

            <Sparkles className="w-4 h-4 text-[#818cf8]" />
          </button>
        </div>

        {/* ======================================================================= */}
        {/* LEETCODE DISTRIBUTION HISTOGRAM GRAPH                                   */}
        {/* ======================================================================= */}
        <div className="space-y-3 pt-2">
          {/* Main Chart Area with Y-Axis and Dotted Grid Lines */}
          <div className="relative h-64 w-full flex items-end">
            {/* Left Y-Axis Percentage Labels */}
            <div className="absolute left-0 top-0 bottom-6 w-12 flex flex-col justify-between text-[11px] font-mono text-slate-500 select-none">
              <span>100%</span>
              <span>50%</span>
              <span>0%</span>
            </div>

            {/* Horizontal Dotted Grid Lines */}
            <div className="absolute left-14 right-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
              <div className="w-full border-t border-slate-800/80" />
              <div className="w-full border-t border-slate-800/80" />
              <div className="w-full border-t border-slate-800/80" />
            </div>

            {/* Histogram Bars Container */}
            <div className="ml-14 w-full h-[calc(100%-24px)] flex items-end justify-between gap-1.5 pb-1 relative z-10">
              {currentBins.map((bin, idx) => (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center justify-end h-full relative group"
                >
                  {/* Floating User Avatar Badge on top of User Bar */}
                  {bin.isUser && (
                    <div className="absolute -top-7 z-20 flex flex-col items-center animate-bounce">
                      <div className="w-6 h-6 rounded-full bg-[#1e293b] border-2 border-[#38bdf8] shadow-lg shadow-sky-500/50 flex items-center justify-center text-[10px]">
                        🐾
                      </div>
                      <div className="w-1.5 h-1.5 bg-[#38bdf8] rotate-45 -mt-1" />
                    </div>
                  )}

                  {/* Individual Distribution Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${bin.height}%` }}
                    transition={{ duration: 0.5, delay: idx * 0.02 }}
                    className={`w-full rounded-full transition-all duration-300 ${
                      bin.isUser
                        ? "bg-[#007aff] shadow-lg shadow-[#007aff]/60 w-[85%]"
                        : "bg-[#007aff] hover:bg-[#38bdf8] w-[70%]"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom X-Axis Timestamps / Intervals */}
          <div className="ml-14 flex justify-between text-xs font-mono text-slate-400 px-2 pt-1 border-t border-slate-800">
            {currentXAxis.map((label, idx) => (
              <span key={idx}>{label}</span>
            ))}
          </div>

          {/* ===================================================================== */}
          {/* BOTTOM TIMELINE OVERVIEW RANGE SCRUBBER TRACK                         */}
          {/* ===================================================================== */}
          <div className="ml-14 p-2.5 rounded-xl bg-[#13141f] border border-white/5 space-y-1.5 mt-4">
            <div className="h-8 w-full flex items-end justify-between gap-1 px-1">
              {currentBins.map((bin, idx) => (
                <div
                  key={idx}
                  style={{ height: `${Math.max(bin.height * 0.4, 4)}%` }}
                  className={`flex-1 rounded-xs ${
                    bin.isUser ? "bg-[#007aff]" : "bg-slate-700/50"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500 px-1">
              {currentXAxis.map((label, idx) => (
                <span key={idx}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
