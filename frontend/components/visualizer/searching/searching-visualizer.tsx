"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { DSALearningShell } from "@/components/visualizer/common/dsa-learning-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Shuffle, Search, CheckCircle2, XCircle } from "lucide-react";

export interface SearchingVisualizerProps {
  type: "linear" | "binary";
}

interface SearchStep {
  array: number[];
  currentIndex?: number;
  low?: number;
  mid?: number;
  high?: number;
  target: number;
  foundIndex?: number;
  message: string;
  comparisons: number;
  codeLine?: number;
}

export function SearchingVisualizer({ type }: SearchingVisualizerProps) {
  const [array, setArray] = useState<number[]>([12, 24, 35, 47, 58, 69, 73, 81, 95]);
  const [target, setTarget] = useState<number>(58);
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(700);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateSteps = useCallback((arr: number[], tgt: number, searchType: "linear" | "binary") => {
    const newSteps: SearchStep[] = [];
    let comps = 0;

    if (searchType === "linear") {
      newSteps.push({
        array: [...arr],
        target: tgt,
        message: `Starting Linear Search for target = ${tgt}.`,
        comparisons: 0,
      });

      let found = false;
      for (let i = 0; i < arr.length; i++) {
        comps++;
        if (arr[i] === tgt) {
          found = true;
          newSteps.push({
            array: [...arr],
            currentIndex: i,
            target: tgt,
            foundIndex: i,
            message: `Target ${tgt} FOUND at index ${i} after ${comps} comparison(s)!`,
            comparisons: comps,
          });
          break;
        } else {
          newSteps.push({
            array: [...arr],
            currentIndex: i,
            target: tgt,
            message: `Checking index ${i}: arr[${i}] = ${arr[i]} != ${tgt}. Moving next.`,
            comparisons: comps,
          });
        }
      }

      if (!found) {
        newSteps.push({
          array: [...arr],
          target: tgt,
          message: `Target ${tgt} NOT FOUND in array after ${comps} comparison(s).`,
          comparisons: comps,
        });
      }
    } else {
      // Binary Search (Requires sorted array)
      const sortedArr = [...arr].sort((a, b) => a - b);
      newSteps.push({
        array: sortedArr,
        low: 0,
        high: sortedArr.length - 1,
        target: tgt,
        message: `Starting Binary Search for target = ${tgt} on sorted array.`,
        comparisons: 0,
      });

      let low = 0;
      let high = sortedArr.length - 1;
      let found = false;

      while (low <= high) {
        comps++;
        const mid = Math.floor((low + high) / 2);
        const midVal = sortedArr[mid];

        if (midVal === tgt) {
          found = true;
          newSteps.push({
            array: sortedArr,
            low,
            mid,
            high,
            target: tgt,
            foundIndex: mid,
            message: `Target ${tgt} FOUND at middle index ${mid}! (${comps} comparisons)`,
            comparisons: comps,
          });
          break;
        } else if (midVal < tgt) {
          newSteps.push({
            array: sortedArr,
            low,
            mid,
            high,
            target: tgt,
            message: `arr[mid] (${midVal}) < ${tgt}. Target lies in RIGHT half. Moving low = mid + 1 (${mid + 1}).`,
            comparisons: comps,
          });
          low = mid + 1;
        } else {
          newSteps.push({
            array: sortedArr,
            low,
            mid,
            high,
            target: tgt,
            message: `arr[mid] (${midVal}) > ${tgt}. Target lies in LEFT half. Moving high = mid - 1 (${mid - 1}).`,
            comparisons: comps,
          });
          high = mid - 1;
        }
      }

      if (!found) {
        newSteps.push({
          array: sortedArr,
          low,
          high,
          target: tgt,
          message: `low (${low}) > high (${high}). Target ${tgt} NOT FOUND in array.`,
          comparisons: comps,
        });
      }
    }

    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    generateSteps(array, target, type);
  }, [array, target, type, generateSteps]);

  useEffect(() => {
    if (isPlaying) {
      if (currentStepIndex >= steps.length - 1) {
        setIsPlaying(false);
        return;
      }
      timerRef.current = setTimeout(() => {
        setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
      }, speedMs);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length, speedMs]);

  const handleRandomize = () => {
    const len = 9;
    const newArr = Array.from({ length: len }, () => Math.floor(Math.random() * 85) + 10);
    if (type === "binary") newArr.sort((a, b) => a - b);
    setArray(newArr);
    setTarget(newArr[Math.floor(Math.random() * len)]);
  };

  const step = steps[currentStepIndex] || {
    array,
    target,
    message: "Ready",
    comparisons: 0,
  };

  const title = type === "linear" ? "Linear Search Visualizer" : "Binary Search Visualizer";
  const category = "Searching Algorithms";
  const description =
    type === "linear"
      ? "Sequential search algorithm scanning elements one-by-one from left to right in O(N) time."
      : "Divide-and-conquer logarithmic O(log N) search algorithm repeatedly partitioning sorted search space.";

  const timeComplexity =
    type === "linear"
      ? { best: "O(1)", average: "O(N)", worst: "O(N)" }
      : { best: "O(1)", average: "O(log N)", worst: "O(log N)" };

  const spaceComplexity = "O(1)";

  const learnContent = {
    overview:
      type === "linear"
        ? "Linear Search checks every element of an array sequentially from start to end until the target value is matched or the end of the container is reached."
        : "Binary Search compares the target value to the middle element of a sorted array. If unequal, half of the search space is eliminated in each step.",
    steps:
      type === "linear"
        ? [
            "Start at index 0.",
            "Compare current element arr[i] with target.",
            "If arr[i] == target, return index i (Found!).",
            "Otherwise, increment i by 1 and repeat until the array ends.",
          ]
        : [
            "Maintain search boundaries low = 0 and high = N - 1.",
            "Calculate mid = floor((low + high) / 2).",
            "If arr[mid] == target, return mid.",
            "If arr[mid] < target, search right half: low = mid + 1.",
            "If arr[mid] > target, search left half: high = mid - 1.",
          ],
    keyConcepts: [
      {
        title: type === "linear" ? "Unsorted Arrays" : "Prerequisite",
        description: type === "linear" ? "Works on unsorted arrays." : "Array MUST be sorted.",
      },
      {
        title: "Comparisons",
        description: type === "linear" ? "Up to N comparisons worst-case." : "At most log₂(N) comparisons.",
      },
    ],
  };

  const codeSnippets = {
    java:
      type === "linear"
        ? `public class LinearSearch {
    public static int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i; // Found
        }
        return -1; // Not found
    }
}`
        : `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
    python:
      type === "linear"
        ? `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`
        : `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    javascript:
      type === "linear"
        ? `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}`
        : `function binarySearch(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
    typescript:
      type === "linear"
        ? `function linearSearch(arr: number[], target: number): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}`
        : `function binarySearch(arr: number[], target: number): number {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
  };

  return (
    <DSALearningShell
      title={title}
      category={category}
      description={description}
      timeComplexity={timeComplexity}
      spaceComplexity={spaceComplexity}
      learnContent={learnContent}
      codeSnippets={codeSnippets}
    >
      <div className="space-y-6">
        {/* Top Control Panel */}
        <Card className="border shadow-sm">
          <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">Target Value:</span>
                <Input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(Number(e.target.value))}
                  className="w-20 h-8 text-xs font-mono text-center"
                />
              </div>
              <Button size="sm" variant="outline" onClick={handleRandomize} className="h-8 gap-1.5 text-xs">
                <Shuffle className="h-3.5 w-3.5" /> Randomize
              </Button>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentStepIndex === 0}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-8 gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white min-w-[85px]"
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                disabled={currentStepIndex === steps.length - 1}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex(0);
                }}
                className="h-8 w-8 p-0"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Speed slider */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono">Speed:</span>
              <input
                type="range"
                min="200"
                max="1500"
                step="100"
                value={1700 - speedMs}
                onChange={(e) => setSpeedMs(1700 - Number(e.target.value))}
                className="w-24 accent-blue-600 cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {/* Message Banner */}
        <div className="p-3.5 rounded-xl border border-blue-500/30 bg-blue-500/10 text-xs font-mono flex items-center justify-between text-foreground">
          <span>{step.message}</span>
          <Badge variant="outline" className="font-mono text-[10px]">
            Comparisons: {step.comparisons}
          </Badge>
        </div>

        {/* Visualizer Array Canvas */}
        <Card className="border shadow-md bg-card/60">
          <CardContent className="p-8 flex flex-col items-center justify-center min-h-[220px]">
            <div className="flex flex-wrap items-end justify-center gap-3">
              {step.array.map((val, idx) => {
                const isFound = step.foundIndex === idx;
                const isCurrent = step.currentIndex === idx;
                const isMid = step.mid === idx;
                const isLow = step.low === idx;
                const isHigh = step.high === idx;
                const isOutOfRange =
                  type === "binary" &&
                  step.low !== undefined &&
                  step.high !== undefined &&
                  (idx < step.low || idx > step.high);

                let colorStyle = "border-border bg-muted/30 text-foreground";
                if (isFound) colorStyle = "border-emerald-500 bg-emerald-500 text-white font-bold scale-110 shadow-lg";
                else if (isMid) colorStyle = "border-amber-500 bg-amber-500/20 text-amber-500 font-bold border-2";
                else if (isCurrent) colorStyle = "border-blue-500 bg-blue-500/20 text-blue-500 font-bold border-2";
                else if (isOutOfRange) colorStyle = "opacity-30 border-border/40 bg-muted/10";

                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 transition-all duration-300">
                    {/* Top Pointer Badge */}
                    <div className="h-6 flex items-center gap-1 text-[10px] font-mono font-bold">
                      {isLow && <span className="px-1 rounded bg-blue-500/20 text-blue-500">L</span>}
                      {isMid && <span className="px-1 rounded bg-amber-500/20 text-amber-500">M</span>}
                      {isHigh && <span className="px-1 rounded bg-purple-500/20 text-purple-500">H</span>}
                    </div>

                    {/* Array Cell Box */}
                    <div
                      className={`w-14 h-14 rounded-xl border flex items-center justify-center font-mono text-base transition-all ${colorStyle}`}
                    >
                      {val}
                    </div>

                    {/* Index Label */}
                    <span className="text-[11px] font-mono text-muted-foreground">[{idx}]</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DSALearningShell>
  );
}
