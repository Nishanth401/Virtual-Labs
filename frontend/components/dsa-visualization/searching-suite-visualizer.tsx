"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Shuffle, 
  Search, 
  CheckCircle2, 
  XCircle,
  Info
} from "lucide-react";

export type SearchAlgo = "linear" | "binary" | "jump" | "interpolation" | "exponential";

interface SearchStep {
  low?: number;
  mid?: number;
  high?: number;
  currIndex?: number;
  blockStart?: number;
  blockEnd?: number;
  message: string;
  comparisons: number;
  found?: boolean;
  what: string;
  why: string;
  next: string;
}

export function SearchingSuiteVisualizer({ defaultAlgo = "binary" }: { defaultAlgo?: SearchAlgo }) {
  const [algo, setAlgo] = useState<SearchAlgo>(defaultAlgo);
  const [array, setArray] = useState<number[]>([10, 20, 30, 40, 50, 60, 70, 80, 90]);
  const [target, setTarget] = useState<number>(60);
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(800);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateSearchSteps = (arr: number[], tgt: number, selectedAlgo: SearchAlgo) => {
    const list: SearchStep[] = [];
    let comps = 0;

    if (selectedAlgo === "linear") {
      list.push({
        currIndex: 0,
        message: `Starting Linear Search for target = ${tgt}.`,
        comparisons: 0,
        what: `Evaluating array element from left to right.`,
        why: `Linear search does not assume data is sorted; every item may need inspection.`,
        next: `Compare arr[0] with target.`
      });

      let found = false;
      for (let i = 0; i < arr.length; i++) {
        comps++;
        if (arr[i] === tgt) {
          found = true;
          list.push({
            currIndex: i,
            message: `FOUND target ${tgt} at index ${i} after ${comps} comparison(s)!`,
            comparisons: comps,
            found: true,
            what: `Target ${tgt} matches arr[${i}]!`,
            why: `arr[${i}] == ${tgt} satisfies the search condition.`,
            next: `Search terminates successfully.`
          });
          break;
        } else {
          list.push({
            currIndex: i,
            message: `arr[${i}] (${arr[i]}) != ${tgt}. Moving to next index.`,
            comparisons: comps,
            found: false,
            what: `Checked index ${i}. Value ${arr[i]} does not match ${tgt}.`,
            why: `Element did not match target; continuing scan.`,
            next: i + 1 < arr.length ? `Inspect arr[${i + 1}].` : `End of array reached.`
          });
        }
      }
      if (!found) {
        list.push({
          message: `Target ${tgt} NOT FOUND in array after ${comps} comparisons.`,
          comparisons: comps,
          found: false,
          what: `All elements exhausted.`,
          why: `Target does not exist in this dataset.`,
          next: `Return -1.`
        });
      }
    } else if (selectedAlgo === "binary") {
      let l = 0, r = arr.length - 1;
      list.push({
        low: l,
        high: r,
        message: `Binary Search initialized across full range [${l} .. ${r}].`,
        comparisons: 0,
        what: `Setting search boundaries L = ${l} and R = ${r}.`,
        why: `Array is sorted, allowing logarithmic O(log n) space halving.`,
        next: `Calculate midpoint M = L + (R - L) / 2.`
      });

      let found = false;
      while (l <= r) {
        const m = Math.floor(l + (r - l) / 2);
        comps++;

        if (arr[m] === tgt) {
          found = true;
          list.push({
            low: l,
            mid: m,
            high: r,
            message: `FOUND ${tgt} at midpoint index ${m}! (${comps} comparisons)`,
            comparisons: comps,
            found: true,
            what: `Midpoint element arr[${m}] = ${tgt} matches target.`,
            why: `Target matches midpoint immediately.`,
            next: `Return index ${m}.`
          });
          break;
        } else if (arr[m] < tgt) {
          list.push({
            low: l,
            mid: m,
            high: r,
            message: `arr[${m}] (${arr[m]}) < ${tgt}. Discard left half [${l} .. ${m}]. Move L -> ${m + 1}.`,
            comparisons: comps,
            found: false,
            what: `Midpoint value ${arr[m]} is smaller than target ${tgt}.`,
            why: `Since array is sorted, target can only exist to the right of index ${m}.`,
            next: `Adjust left pointer L = ${m + 1}.`
          });
          l = m + 1;
        } else {
          list.push({
            low: l,
            mid: m,
            high: r,
            message: `arr[${m}] (${arr[m]}) > ${tgt}. Discard right half [${m} .. ${r}]. Move R -> ${m - 1}.`,
            comparisons: comps,
            found: false,
            what: `Midpoint value ${arr[m]} is greater than target ${tgt}.`,
            why: `Since array is sorted, target can only exist to the left of index ${m}.`,
            next: `Adjust right pointer R = ${m - 1}.`
          });
          r = m - 1;
        }
      }
      if (!found) {
        list.push({
          message: `Target ${tgt} not found in sorted array.`,
          comparisons: comps,
          found: false,
          what: `Pointers crossed (L > R). Search space empty.`,
          why: `Every possible candidate interval was eliminated.`,
          next: `Return -1.`
        });
      }
    } else if (selectedAlgo === "jump") {
      const n = arr.length;
      const step = Math.max(1, Math.floor(Math.sqrt(n)));
      let prev = 0;
      let curr = step;

      list.push({
        blockStart: prev,
        blockEnd: Math.min(curr, n) - 1,
        message: `Jump Search: Step size √${n} ≈ ${step}. Probing blocks.`,
        comparisons: 0,
        what: `Initializing block step size √n = ${step}.`,
        why: `Jumping in √n intervals balances block leaps with linear verification steps.`,
        next: `Check boundary element at index ${Math.min(curr, n) - 1}.`
      });

      let found = false;
      while (arr[Math.min(curr, n) - 1] < tgt) {
        comps++;
        list.push({
          blockStart: prev,
          blockEnd: Math.min(curr, n) - 1,
          message: `arr[${Math.min(curr, n) - 1}] (${arr[Math.min(curr, n) - 1]}) < ${tgt}. Jump to next block!`,
          comparisons: comps,
          found: false,
          what: `Block end value is still less than target.`,
          why: `Target lies beyond current block.`,
          next: `Jump forward by ${step} positions.`
        });
        prev = curr;
        curr += step;
        if (prev >= n) break;
      }

      // Linear search inside block
      const limit = Math.min(curr, n);
      for (let i = prev; i < limit; i++) {
        comps++;
        if (arr[i] === tgt) {
          found = true;
          list.push({
            currIndex: i,
            blockStart: prev,
            blockEnd: limit - 1,
            message: `FOUND ${tgt} at index ${i} inside block [${prev} .. ${limit - 1}]!`,
            comparisons: comps,
            found: true,
            what: `Target located during block verification scan.`,
            why: `arr[${i}] equals target ${tgt}.`,
            next: `Return index ${i}.`
          });
          break;
        }
      }
      if (!found) {
        list.push({
          message: `Target ${tgt} not found after checking bounded block.`,
          comparisons: comps,
          found: false,
          what: `Linear scan of candidate block finished without match.`,
          why: `Target is absent from the array.`,
          next: `Return -1.`
        });
      }
    } else if (selectedAlgo === "interpolation") {
      let low = 0, high = arr.length - 1;
      list.push({
        low,
        high,
        message: `Interpolation Search: Probing estimated positions based on key distribution.`,
        comparisons: 0,
        what: `Calculating probe position pos = low + [(target - arr[low]) * (high - low)] / (arr[high] - arr[low]).`,
        why: `Directly calculates likely index on uniformly distributed data in O(log log n).`,
        next: `Compute initial probe index.`
      });

      let found = false;
      while (low <= high && tgt >= arr[low] && tgt <= arr[high]) {
        comps++;
        if (arr[high] === arr[low]) {
          if (arr[low] === tgt) found = true;
          break;
        }
        const pos = low + Math.floor(((tgt - arr[low]) * (high - low)) / (arr[high] - arr[low]));
        if (arr[pos] === tgt) {
          found = true;
          list.push({
            low,
            mid: pos,
            high,
            message: `FOUND ${tgt} at interpolated probe index ${pos}!`,
            comparisons: comps,
            found: true,
            what: `Probe index matched target directly!`,
            why: `Uniform formula accurately predicted position.`,
            next: `Return index ${pos}.`
          });
          break;
        }
        if (arr[pos] < tgt) {
          list.push({
            low,
            mid: pos,
            high,
            message: `arr[${pos}] (${arr[pos]}) < ${tgt}. Search upper sub-interval.`,
            comparisons: comps,
            found: false,
            what: `Probe value is below target.`,
            why: `Target is situated in the upper portion.`,
            next: `Set low = ${pos + 1}.`
          });
          low = pos + 1;
        } else {
          list.push({
            low,
            mid: pos,
            high,
            message: `arr[${pos}] (${arr[pos]}) > ${tgt}. Search lower sub-interval.`,
            comparisons: comps,
            found: false,
            what: `Probe value exceeds target.`,
            why: `Target is situated in the lower portion.`,
            next: `Set high = ${pos - 1}.`
          });
          high = pos - 1;
        }
      }
      if (!found) {
        list.push({
          message: `Target ${tgt} not found in interpolation search space.`,
          comparisons: comps,
          found: false,
          what: `Target is outside bounding values or not present.`,
          why: `Search interval exhausted.`,
          next: `Return -1.`
        });
      }
    } else if (selectedAlgo === "exponential") {
      let bound = 1;
      comps++;
      list.push({
        currIndex: 0,
        message: `Exponential Search: Check index 0, then double bounds: 1, 2, 4, 8...`,
        comparisons: comps,
        what: `Checking if arr[0] matches target.`,
        why: `Exponential search identifies the bounding power-of-2 interval first.`,
        next: `Double search boundary.`
      });

      if (arr[0] === tgt) {
        list.push({
          currIndex: 0,
          message: `FOUND ${tgt} at index 0 immediately!`,
          comparisons: comps,
          found: true,
          what: `Target is first element.`,
          why: `arr[0] == target.`,
          next: `Return 0.`
        });
      } else {
        while (bound < arr.length && arr[bound] <= tgt) {
          comps++;
          list.push({
            currIndex: bound,
            message: `arr[${bound}] (${arr[bound]}) <= ${tgt}. Double bound to ${bound * 2}.`,
            comparisons: comps,
            what: `Target is at or beyond index ${bound}.`,
            why: `Exponentially expanding range reduces search interval in O(log i) time.`,
            next: `Advance to bound = ${bound * 2}.`
          });
          bound *= 2;
        }

        const l = Math.floor(bound / 2);
        const r = Math.min(bound, arr.length - 1);
        list.push({
          low: l,
          high: r,
          message: `Range identified: [${l} .. ${r}]. Running Binary Search.`,
          comparisons: comps,
          what: `Bounded search range between ${l} and ${r}.`,
          why: `Target must lie between previous power of 2 and current bound.`,
          next: `Switch to standard binary search on this interval.`
        });
      }
    }

    setSteps(list);
    setCurrentStepIdx(0);
  };

  useEffect(() => {
    generateSearchSteps(array, target, algo);
  }, [array, target, algo]);

  // Autoplay loop
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

  const currentStep = steps[currentStepIdx] || {
    message: "Ready to search.",
    comparisons: 0,
    what: "Ready.",
    why: "Ready.",
    next: "Ready."
  };

  const handleRandomize = () => {
    const newArr = Array.from({ length: 9 }, () => Math.floor(Math.random() * 90 + 10))
      .sort((a, b) => a - b);
    setArray(newArr);
    setTarget(newArr[Math.floor(Math.random() * newArr.length)]);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      {/* Algorithm Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-mono">
            Module 2
          </Badge>
          <span className="text-sm font-bold text-foreground">Searching Algorithms Studio</span>
        </div>

        <div className="flex items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          {(["linear", "binary", "jump", "interpolation", "exponential"] as SearchAlgo[]).map((a) => (
            <Button
              key={a}
              variant={algo === a ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setAlgo(a);
                setIsPlaying(false);
              }}
              className="h-7 text-xs font-semibold capitalize"
            >
              {a}
            </Button>
          ))}
        </div>
      </div>

      {/* Controls & Target Setting */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-muted-foreground">Target:</span>
            <Input
              type="number"
              value={target}
              onChange={(e) => {
                setTarget(parseInt(e.target.value) || 0);
                setIsPlaying(false);
              }}
              className="w-20 h-8 text-xs font-bold font-mono"
            />
          </div>

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

        {/* Live Counters */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <span>Step: <strong>{currentStepIdx + 1}/{Math.max(1, steps.length)}</strong></span>
          <span>•</span>
          <span>Comparisons: <strong className="text-amber-500">{currentStep.comparisons}</strong></span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            {algo === "linear" ? "O(n)" : algo === "interpolation" ? "O(log log n)" : "O(log n)"}
          </Badge>
        </div>
      </div>

      {/* Main Visualizer Array Canvas */}
      <Card className="border-border bg-card/80 p-6 overflow-x-auto">
        <div className="flex flex-col items-center space-y-6 min-w-[550px]">
          <div className="flex items-center gap-2">
            {array.map((val, idx) => {
              const isLow = currentStep.low === idx;
              const isMid = currentStep.mid === idx;
              const isHigh = currentStep.high === idx;
              const isCurr = currentStep.currIndex === idx;
              const isInBlock = currentStep.blockStart !== undefined && currentStep.blockEnd !== undefined && idx >= currentStep.blockStart && idx <= currentStep.blockEnd;
              const isFound = currentStep.found && (isMid || isCurr || val === target);

              return (
                <div key={idx} className="flex flex-col items-center space-y-1">
                  {/* Top Pointer Badges */}
                  <div className="h-6 flex items-center justify-center font-mono text-[10px] font-bold">
                    {isLow && <span className="text-blue-500">L</span>}
                    {isMid && <span className="text-amber-500 ml-1">M</span>}
                    {isHigh && <span className="text-purple-500 ml-1">R</span>}
                    {isCurr && <span className="text-primary">PTR</span>}
                  </div>

                  {/* Element Box */}
                  <div
                    className={`h-16 w-14 rounded-xl border-2 flex flex-col items-center justify-center font-mono transition-all select-none ${
                      isFound
                        ? "border-emerald-500 bg-emerald-500/25 scale-110 shadow-lg shadow-emerald-500/40 text-emerald-400 font-bold"
                        : isMid
                        ? "border-amber-500 bg-amber-500/20 scale-105 shadow-md shadow-amber-500/30 text-amber-300 font-bold"
                        : isCurr
                        ? "border-primary bg-primary/20 scale-105 shadow-md shadow-primary/30 text-primary font-bold"
                        : isInBlock
                        ? "border-blue-500/60 bg-blue-500/10 text-blue-300"
                        : "border-border bg-card text-foreground"
                    }`}
                  >
                    <span className="text-sm">{val}</span>
                  </div>

                  {/* Bottom Index */}
                  <span className="text-[10px] font-mono text-muted-foreground">
                    [{idx}]
                  </span>
                </div>
              );
            })}
          </div>

          {/* Action Message Banner */}
          <div className="w-full max-w-2xl p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
            {currentStep.found ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            ) : (
              <Info className="h-4 w-4 text-primary shrink-0" />
            )}
            <span>{currentStep.message}</span>
          </div>

          {/* Student Mode 3-Question Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-3xl pt-2">
            <div className="p-3 bg-card rounded-xl border border-border/80 space-y-1">
              <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider block">
                What is happening?
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {currentStep.what || "Evaluating current pointer bounds."}
              </p>
            </div>

            <div className="p-3 bg-card rounded-xl border border-border/80 space-y-1">
              <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider block">
                Why did this happen?
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {currentStep.why || "Search criteria checks whether value matches or guides range halving."}
              </p>
            </div>

            <div className="p-3 bg-card rounded-xl border border-border/80 space-y-1">
              <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-wider block">
                What will happen next?
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {currentStep.next || "Search bounds will advance."}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
