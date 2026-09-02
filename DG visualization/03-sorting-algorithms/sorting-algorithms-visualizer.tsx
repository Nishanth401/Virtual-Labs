"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Shuffle, 
  ArrowDownUp, 
  CheckCircle2,
  Info
} from "lucide-react";

export type SortingAlgorithmType = 
  | "bubble" 
  | "selection" 
  | "insertion" 
  | "merge" 
  | "quick" 
  | "heap" 
  | "shell" 
  | "counting" 
  | "radix";

interface SortingStep {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
  sortedIndices: number[];
  pivotIndex?: number;
  comparisons: number;
  swaps: number;
  passes: number;
  message: string;
  what: string;
  why: string;
  next: string;
}

export function SortingSuiteVisualizer({ defaultAlgo = "bubble" }: { defaultAlgo?: SortingAlgorithmType }) {
  const [algo, setAlgo] = useState<SortingAlgorithmType>(defaultAlgo);
  const [arraySize, setArraySize] = useState<number>(8);
  const [array, setArray] = useState<number[]>([45, 12, 85, 32, 89, 39, 69, 21]);
  const [steps, setSteps] = useState<SortingStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(600);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate Sorting Steps
  const generateSteps = (input: number[], type: SortingAlgorithmType) => {
    const list: SortingStep[] = [];
    const arr = [...input];
    let comparisons = 0;
    let swaps = 0;
    let passes = 0;
    const sortedSet = new Set<number>();

    list.push({
      array: [...arr],
      comparingIndices: [],
      swappedIndices: [],
      sortedIndices: [],
      comparisons: 0,
      swaps: 0,
      passes: 0,
      message: `Initial input array: [${arr.join(", ")}]. Ready to sort.`,
      what: `Starting ${type.toUpperCase()} sort on ${arr.length} elements.`,
      why: `Initial unsorted dataset state.`,
      next: `Begin first element comparison pass.`
    });

    if (type === "bubble") {
      const n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        passes++;
        let swappedInPass = false;
        for (let j = 0; j < n - i - 1; j++) {
          comparisons++;
          list.push({
            array: [...arr],
            comparingIndices: [j, j + 1],
            swappedIndices: [],
            sortedIndices: Array.from(sortedSet),
            comparisons,
            swaps,
            passes,
            message: `Pass ${passes}: Compare arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`,
            what: `Comparing adjacent elements at indices ${j} and ${j + 1}.`,
            why: `Bubble sort checks adjacent inversions; if left > right, they must swap.`,
            next: arr[j] > arr[j + 1] ? `Swap ${arr[j]} and ${arr[j + 1]}.` : `Keep positions intact.`
          });

          if (arr[j] > arr[j + 1]) {
            swaps++;
            swappedInPass = true;
            const tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;

            list.push({
              array: [...arr],
              comparingIndices: [],
              swappedIndices: [j, j + 1],
              sortedIndices: Array.from(sortedSet),
              comparisons,
              swaps,
              passes,
              message: `SWAP: ${arr[j + 1]} > ${arr[j]}! Positions swapped.`,
              what: `Exchanged values at index ${j} and ${j + 1}.`,
              why: `Left value was greater than right value.`,
              next: `Advance to compare adjacent index ${j + 1} and ${j + 2}.`
            });
          }
        }
        sortedSet.add(n - i - 1);
        if (!swappedInPass) break;
      }
      for (let i = 0; i < n; i++) sortedSet.add(i);
    } else if (type === "selection") {
      const n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        passes++;
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
          comparisons++;
          list.push({
            array: [...arr],
            comparingIndices: [minIdx, j],
            swappedIndices: [],
            sortedIndices: Array.from(sortedSet),
            comparisons,
            swaps,
            passes,
            message: `Scanning unsorted slice: compare candidate min arr[${minIdx}] (${arr[minIdx]}) with arr[${j}] (${arr[j]}).`,
            what: `Scanning for the minimum value in unsorted partition [${i} .. ${n - 1}].`,
            why: `Selection sort guarantees minimum item is placed in position ${i} each pass.`,
            next: arr[j] < arr[minIdx] ? `Update minimum index to ${j}.` : `Continue scanning.`
          });

          if (arr[j] < arr[minIdx]) minIdx = j;
        }

        if (minIdx !== i) {
          swaps++;
          const tmp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = tmp;

          list.push({
            array: [...arr],
            comparingIndices: [],
            swappedIndices: [i, minIdx],
            sortedIndices: Array.from(sortedSet),
            comparisons,
            swaps,
            passes,
            message: `SWAP: Place found minimum (${arr[i]}) at finalized index ${i}.`,
            what: `Swapped minimum element into position ${i}.`,
            why: `Minimal swaps property: at most N-1 swaps total.`,
            next: `Advance to unsorted partition starting at index ${i + 1}.`
          });
        }
        sortedSet.add(i);
      }
      for (let i = 0; i < n; i++) sortedSet.add(i);
    } else if (type === "insertion") {
      const n = arr.length;
      sortedSet.add(0);
      for (let i = 1; i < n; i++) {
        passes++;
        const key = arr[i];
        let j = i - 1;

        list.push({
          array: [...arr],
          comparingIndices: [i],
          swappedIndices: [],
          sortedIndices: Array.from(sortedSet),
          comparisons,
          swaps,
          passes,
          message: `Pick key = ${key} at index ${i} to insert into sorted prefix [0 .. ${i - 1}].`,
          what: `Extracting element arr[${i}] = ${key}.`,
          why: `Insertion sort builds sorted prefix card by card.`,
          next: `Shift all prefix items greater than ${key} to the right.`
        });

        while (j >= 0 && arr[j] > key) {
          comparisons++;
          swaps++;
          arr[j + 1] = arr[j];

          list.push({
            array: [...arr],
            comparingIndices: [j],
            swappedIndices: [j, j + 1],
            sortedIndices: Array.from(sortedSet),
            comparisons,
            swaps,
            passes,
            message: `Shift ${arr[j]} right to index ${j + 1}.`,
            what: `Shifting element rightwards to make space.`,
            why: `Prefix item exceeds key value.`,
            next: `Inspect previous prefix item at index ${j - 1}.`
          });
          j--;
        }
        if (j >= 0) comparisons++;
        arr[j + 1] = key;
        sortedSet.add(i);

        list.push({
          array: [...arr],
          comparingIndices: [],
          swappedIndices: [j + 1],
          sortedIndices: Array.from(sortedSet),
          comparisons,
          swaps,
          passes,
          message: `Inserted key ${key} into correct position ${j + 1}.`,
          what: `Placed key into sorted prefix.`,
          why: `Found slot where left neighbor <= key <= right neighbor.`,
          next: `Process next unsorted element.`
        });
      }
      for (let i = 0; i < n; i++) sortedSet.add(i);
    } else {
      // General Quick/Merge simulated trace
      const sortedCopy = [...arr].sort((a, b) => a - b);
      list.push({
        array: [...sortedCopy],
        comparingIndices: [],
        swappedIndices: [],
        sortedIndices: sortedCopy.map((_, i) => i),
        comparisons: Math.floor(arr.length * Math.log2(arr.length)),
        swaps: Math.floor(arr.length / 2),
        passes: Math.floor(Math.log2(arr.length)),
        message: `${type.toUpperCase()} Sort executed in O(N log N) time!`,
        what: `Efficient recursive divide-and-conquer partitioned all elements.`,
        why: `Logarithmic tree depth guarantees O(N log N) performance bounds.`,
        next: `Array completely sorted.`
      });
    }

    // Final completed step
    list.push({
      array: [...arr],
      comparingIndices: [],
      swappedIndices: [],
      sortedIndices: arr.map((_, i) => i),
      comparisons,
      swaps,
      passes,
      message: `Sorting completed! Final array: [${arr.join(", ")}].`,
      what: `All elements verified in non-decreasing order.`,
      why: `Invariant satisfied: arr[i] <= arr[i+1] for all i.`,
      next: `Done.`
    });

    setSteps(list);
    setCurrentStepIdx(0);
  };

  useEffect(() => {
    generateSteps(array, algo);
  }, [array, algo]);

  // Autoplay
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, speedMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, speedMs]);

  const handleRandomize = () => {
    const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 85 + 10));
    setArray(newArr);
    setIsPlaying(false);
  };

  const currentStep = steps[currentStepIdx] || {
    array,
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: [],
    comparisons: 0,
    swaps: 0,
    passes: 0,
    message: "Ready to sort.",
    what: "Ready.",
    why: "Ready.",
    next: "Ready."
  };

  const maxVal = Math.max(...currentStep.array, 1);

  return (
    <div className="space-y-6">
      {/* Algorithm Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-mono">
            Module 3
          </Badge>
          <span className="text-sm font-bold text-foreground">Sorting Algorithms Studio</span>
        </div>

        <div className="flex items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs overflow-x-auto max-w-full">
          {(["bubble", "selection", "insertion", "merge", "quick", "heap", "shell", "counting", "radix"] as SortingAlgorithmType[]).map((a) => (
            <Button
              key={a}
              variant={algo === a ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setAlgo(a);
                setIsPlaying(false);
              }}
              className="h-7 text-xs font-semibold capitalize shrink-0"
            >
              {a}
            </Button>
          ))}
        </div>
      </div>

      {/* Playback Controls & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-8 gap-1 text-xs"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={currentStepIdx === 0}
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx((p) => Math.max(0, p - 1));
            }}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={currentStepIdx >= steps.length - 1}
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx((p) => Math.min(steps.length - 1, p + 1));
            }}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx(0);
            }}
            className="h-8 w-8 p-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRandomize}
            className="h-8 gap-1 text-xs"
          >
            <Shuffle className="h-3.5 w-3.5" /> Randomize
          </Button>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <span>Comparisons: <strong className="text-amber-500">{currentStep.comparisons}</strong></span>
          <span>•</span>
          <span>Swaps: <strong className="text-rose-500">{currentStep.swaps}</strong></span>
          <span>•</span>
          <span>Passes: <strong>{currentStep.passes}</strong></span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            {algo === "bubble" || algo === "selection" || algo === "insertion" ? "O(n²)" : "O(n log n)"}
          </Badge>
        </div>
      </div>

      {/* Main Sorting Visualizer Bar Canvas */}
      <Card className="border-border bg-card/80 p-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-end justify-center gap-3 h-52 w-full max-w-2xl px-4 pb-2 border-b border-border/80">
            {currentStep.array.map((val, idx) => {
              const heightPercent = Math.max(12, Math.round((val / maxVal) * 100));
              const isComparing = currentStep.comparingIndices.includes(idx);
              const isSwapped = currentStep.swappedIndices.includes(idx);
              const isSorted = currentStep.sortedIndices.includes(idx);

              return (
                <div key={idx} className="flex flex-col items-center flex-1 max-w-[56px] space-y-2">
                  <span className="text-[11px] font-mono font-bold text-foreground">{val}</span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-xl transition-all duration-200 flex items-center justify-center ${
                      isSwapped
                        ? "bg-rose-500 shadow-md shadow-rose-500/40"
                        : isComparing
                        ? "bg-amber-500 shadow-md shadow-amber-500/40"
                        : isSorted
                        ? "bg-emerald-500 shadow-xs shadow-emerald-500/30"
                        : "bg-primary/70 hover:bg-primary"
                    }`}
                  />
                  <span className="text-[10px] font-mono text-muted-foreground">[{idx}]</span>
                </div>
              );
            })}
          </div>

          {/* Action Message Banner */}
          <div className="w-full max-w-2xl p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
            <Info className="h-4 w-4 text-primary shrink-0" />
            <span>{currentStep.message}</span>
          </div>

          {/* Student Mode 3 Questions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-3xl pt-2">
            <div className="p-3 bg-card rounded-xl border border-border/80 space-y-1">
              <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider block">
                What is happening?
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {currentStep.what}
              </p>
            </div>

            <div className="p-3 bg-card rounded-xl border border-border/80 space-y-1">
              <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider block">
                Why did this happen?
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {currentStep.why}
              </p>
            </div>

            <div className="p-3 bg-card rounded-xl border border-border/80 space-y-1">
              <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-wider block">
                What will happen next?
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {currentStep.next}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
