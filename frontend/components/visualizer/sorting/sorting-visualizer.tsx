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
  const complexity = COMPLEXITY_MAP[algorithm];

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs uppercase tracking-wider bg-primary/10 text-primary border-primary/30">
            Advanced Interactive Visualizer
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {complexity.stable ? "Stable Sort" : "Unstable Sort"}
          </Badge>
          <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-500 border-amber-500/30">
            🔊 Web Audio Synthesizer Enabled
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1 text-sm max-w-2xl">{description}</p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="visualization">Visualizer & Timeline</TabsTrigger>
          <TabsTrigger value="pseudocode">Pseudocode & Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-6">
          {/* TIMELINE REWIND SCRUBBER BAR */}
          <Card className="border-secondary/40 bg-card/60 backdrop-blur-xs p-4 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-foreground flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                  Execution Timeline Scrubber (Step {currentStepIndex + 1} of {totalSteps})
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
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
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

              {/* Live Pseudocode Line Sync */}
              <Card className="border-secondary/40 bg-card/70">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                    <span>Live Code Execution Pointer</span>
                    <span className="font-mono text-primary font-bold">Line {currentStep.codeLine || 1}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-muted/80 rounded-xl font-mono text-[11px] space-y-1 border border-border/60 overflow-x-auto">
                    {pseudocode.map((line, idx) => {
                      const isCurrentLine = (currentStep.codeLine || 1) === idx + 1;
                      return (
                        <div
                          key={idx}
                          className={`px-2 py-0.5 rounded transition-colors ${
                            isCurrentLine
                              ? "bg-primary text-primary-foreground font-bold shadow-xs"
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

              {/* Complexity Mini Card */}
              <Card className="border-secondary/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">
                    Runtime Complexity Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground block text-[11px]">Best Case</span>
                    <span className="font-mono font-bold text-emerald-500">{complexity.best}</span>
                  </div>
                  <div className="p-2 rounded bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground block text-[11px]">Average Case</span>
                    <span className="font-mono font-bold text-amber-500">{complexity.avg}</span>
                  </div>
                  <div className="p-2 rounded bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground block text-[11px]">Worst Case</span>
                    <span className="font-mono font-bold text-rose-500">{complexity.worst}</span>
                  </div>
                  <div className="p-2 rounded bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground block text-[11px]">Auxiliary Space</span>
                    <span className="font-mono font-bold text-teal-600">{complexity.space}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="xl:col-span-2">
              <SortingDisplay currentStep={currentStep} algorithmName={title} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pseudocode" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-secondary/40">
              <CardHeader>
                <CardTitle className="text-base font-bold">Standard Algorithm Pseudocode</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="p-4 bg-muted/70 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-border/60">
                  {pseudocode.map((line, idx) => (
                    <div
                      key={idx}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        currentStep.codeLine === idx + 1
                          ? "bg-primary/20 text-primary font-bold border-l-2 border-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span className="inline-block w-6 text-right mr-3 opacity-40 select-none">{idx + 1}</span>
                      {line}
                    </div>
                  ))}
                </pre>
              </CardContent>
            </Card>

            <Card className="border-secondary/40">
              <CardHeader>
                <CardTitle className="text-base font-bold">Comparative Asymptotic Complexities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs text-muted-foreground">
                <p>
                  Sorting algorithms are evaluated by their asymptotic growth in comparisons and data swaps.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 rounded bg-muted/30 border">
                    <span>Best Case (Optimized pass)</span>
                    <span className="font-mono font-bold text-foreground">{complexity.best}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-muted/30 border">
                    <span>Average Case (Random inputs)</span>
                    <span className="font-mono font-bold text-foreground">{complexity.avg}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-muted/30 border">
                    <span>Worst Case (Reverse sorted)</span>
                    <span className="font-mono font-bold text-foreground">{complexity.worst}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-muted/30 border">
                    <span>Auxiliary Memory</span>
                    <span className="font-mono font-bold text-foreground">{complexity.space}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
