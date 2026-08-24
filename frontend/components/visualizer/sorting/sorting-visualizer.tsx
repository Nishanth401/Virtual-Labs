"use client";

import { useSorting, SortingAlgorithm } from "@/hooks/use-sorting";
import { SortingControls } from "@/components/visualizer/sorting/sorting-controls";
import { SortingDisplay } from "@/components/visualizer/sorting/sorting-display";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SortingVisualizerProps {
  algorithm: SortingAlgorithm;
  title: string;
  description: string;
}

const PSEUDOCODE_MAP: Record<SortingAlgorithm, string[]> = {
  bubble: [
    "procedure bubbleSort(A : list of sortable items)",
    "  n := length(A)",
    "  for i := 0 to n-1 do",
    "    swapped := false",
    "    for j := 0 to n-i-2 do",
    "      if A[j] > A[j+1] then",
    "        swap(A[j], A[j+1])",
    "        swapped := true",
    "      end if",
    "    end for",
    "    if not swapped then break",
    "  end for",
    "end procedure"
  ],
  selection: [
    "procedure selectionSort(A : list of sortable items)",
    "  n := length(A)",
    "  for i := 0 to n-2 do",
    "    min_idx := i",
    "    for j := i+1 to n-1 do",
    "      if A[j] < A[min_idx] then",
    "        min_idx := j",
    "      end if",
    "    end for",
    "    if min_idx != i then swap(A[i], A[min_idx])",
    "  end for",
    "end procedure"
  ],
  insertion: [
    "procedure insertionSort(A : list of sortable items)",
    "  n := length(A)",
    "  for i := 1 to n-1 do",
    "    key := A[i]",
    "    j := i - 1",
    "    while j >= 0 and A[j] > key do",
    "      A[j + 1] := A[j]",
    "      j := j - 1",
    "    end while",
    "    A[j + 1] := key",
    "  end for",
    "end procedure"
  ]
};

const COMPLEXITY_MAP: Record<SortingAlgorithm, { best: string; avg: string; worst: string; space: string; stable: boolean }> = {
  bubble: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: true },
  selection: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: false },
  insertion: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: true }
};

const JAVA_CODE_MAP: Record<SortingAlgorithm, string> = {
  bubble: `// Java Implementation of Bubble Sort with Flag Optimization
public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            // Last i elements are already in place
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap adjacent elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            // If no two elements were swapped, array is sorted
            if (!swapped) break;
        }
    }
}`,
  selection: `// Java Implementation of Selection Sort
public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        // One by one move boundary of unsorted subarray
        for (int i = 0; i < n - 1; i++) {
            // Find the minimum element in unsorted array
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            // Swap found minimum element with first element
            if (minIdx != i) {
                int temp = arr[minIdx];
                arr[minIdx] = arr[i];
                arr[i] = temp;
            }
        }
    }
}`,
  insertion: `// Java Implementation of Insertion Sort
public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; ++i) {
            int key = arr[i];
            int j = i - 1;

            /* Move elements of arr[0..i-1], that are
               greater than key, to one position ahead
               of their current position */
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
}`
};

export function SortingVisualizer({ algorithm, title, description }: SortingVisualizerProps) {
  const {
    currentStep,
    currentStepIndex,
    totalSteps,
    isPlaying,
    speedMs,
    setSpeedMs,
    play,
    pause,
    stepNext,
    stepPrev,
    goToStep,
    reset,
    setCustomArray,
    randomize
  } = useSorting(algorithm);

  const pseudocode = PSEUDOCODE_MAP[algorithm];
  const javaCode = JAVA_CODE_MAP[algorithm];
  const complexity = COMPLEXITY_MAP[algorithm];

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs uppercase tracking-wider bg-primary/10 text-primary border-primary/30">
            Interactive Java Visualizer
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {complexity.stable ? "Stable Sort" : "Unstable Sort"}
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
            Java Standard
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading">{title}</h1>
        <p className="text-muted-foreground mt-1 text-sm max-w-2xl">{description}</p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="visualization" className="text-xs font-bold">Simulator &amp; Timeline</TabsTrigger>
          <TabsTrigger value="javacode" className="text-xs font-bold">Java Source Code</TabsTrigger>
          <TabsTrigger value="pseudocode" className="text-xs font-bold">TC &amp; SC Complexity</TabsTrigger>
        </TabsList>

        {/* TAB 1: VISUALIZATION SIMULATOR */}
        <TabsContent value="visualization" className="space-y-6">
          {/* TIMELINE REWIND SCRUBBER BAR */}
          <Card className="border-border/80 bg-card p-4 shadow-sm rounded-2xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-foreground flex items-center gap-1.5 font-mono">
                  <span className="h-2 w-2 rounded-full bg-[#1e88e5] animate-ping" />
                  Timeline Scrubber: Step {currentStepIndex + 1} of {totalSteps}
                </span>
                <span className="font-mono text-muted-foreground">
                  {Math.round(((currentStepIndex + 1) / Math.max(totalSteps, 1)) * 100)}% Progress
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.max(totalSteps - 1, 0)}
                value={currentStepIndex}
                onChange={(e) => goToStep(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-[#1e88e5]"
              />
            </div>
          </Card>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
              <SortingControls
                isPlaying={isPlaying}
                onPlay={play}
                onPause={pause}
                onStepNext={stepNext}
                onStepPrev={stepPrev}
                onReset={reset}
                onRandomize={() => randomize(8)}
                onCustomArray={setCustomArray}
                speedMs={speedMs}
                onSpeedChange={setSpeedMs}
                comparisons={currentStep.comparisons}
                swaps={currentStep.swaps}
                currentStepIndex={currentStepIndex}
                totalSteps={totalSteps}
              />

              {/* Live Code Line Sync */}
              <Card className="border-border/80 bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground flex items-center justify-between font-mono">
                    <span>Live Code Execution Pointer</span>
                    <span className="font-mono text-[#1e88e5] font-bold">Line {currentStep.codeLine || 1}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-muted/70 rounded-xl font-mono text-[11px] space-y-1 border border-border/60 overflow-x-auto">
                    {pseudocode.map((line, idx) => {
                      const isCurrentLine = (currentStep.codeLine || 1) === idx + 1;
                      return (
                        <div
                          key={idx}
                          className={`px-2 py-0.5 rounded transition-colors ${
                            isCurrentLine
                              ? "bg-[#1e88e5] text-white font-bold shadow-xs"
                              : "text-muted-foreground opacity-80"
                          }`}
                        >
                          <span className="inline-block w-5 opacity-50 text-[9px] select-none">{idx + 1}</span>
                          <span>{line}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="xl:col-span-2">
              <SortingDisplay
                currentStep={currentStep}
                algorithmName={title}
                timeComplexity={complexity.worst}
                spaceComplexity={complexity.space}
                currentStepIndex={currentStepIndex}
                totalSteps={totalSteps}
              />
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: PURE JAVA CODE TAB */}
        <TabsContent value="javacode" className="space-y-6">
          <Card className="border-border/80 bg-card p-6 shadow-sm rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Official Java Source Code
                </h3>
                <p className="text-xs text-muted-foreground">
                  Production-ready Java implementation following standard academic curriculum.
                </p>
              </div>
              <Badge variant="outline" className="font-mono text-xs text-[#1e88e5] border-[#1e88e5]/30">
                Java 17+
              </Badge>
            </div>

            <div className="relative">
              <pre className="p-5 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 shadow-inner">
                <code>{javaCode}</code>
              </pre>
            </div>
          </Card>
        </TabsContent>

        {/* TAB 3: ASYMPTOTIC COMPLEXITY ANALYSIS (TC & SC) */}
        <TabsContent value="pseudocode" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border/80 bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <CardTitle className="text-base font-bold font-heading">
                Time Complexity (TC) Analysis
              </CardTitle>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-muted/40 border flex items-center justify-between">
                  <span className="font-semibold text-foreground">Best Case Time Complexity</span>
                  <Badge className="bg-emerald-500/10 text-emerald-600 font-mono text-xs">{complexity.best}</Badge>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border flex items-center justify-between">
                  <span className="font-semibold text-foreground">Average Case Time Complexity</span>
                  <Badge className="bg-amber-500/10 text-amber-600 font-mono text-xs">{complexity.avg}</Badge>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border flex items-center justify-between">
                  <span className="font-semibold text-foreground">Worst Case Time Complexity</span>
                  <Badge className="bg-rose-500/10 text-rose-600 font-mono text-xs">{complexity.worst}</Badge>
                </div>
              </div>
            </Card>

            <Card className="border-border/80 bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <CardTitle className="text-base font-bold font-heading">
                Space Complexity (SC) Analysis
              </CardTitle>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-muted/40 border flex items-center justify-between">
                  <span className="font-semibold text-foreground">Auxiliary Space Complexity</span>
                  <Badge className="bg-teal-500/10 text-teal-600 font-mono text-xs">{complexity.space}</Badge>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border flex items-center justify-between">
                  <span className="font-semibold text-foreground">In-Place Algorithm</span>
                  <Badge className="bg-blue-500/10 text-blue-600 font-mono text-xs">Yes (In-Place)</Badge>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border flex items-center justify-between">
                  <span className="font-semibold text-foreground">Stability Guarantee</span>
                  <Badge className="bg-purple-500/10 text-purple-600 font-mono text-xs">
                    {complexity.stable ? "Stable (Preserves Order)" : "Unstable"}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
