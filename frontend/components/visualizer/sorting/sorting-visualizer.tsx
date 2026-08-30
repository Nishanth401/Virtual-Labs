"use client";

import { useSorting, SortingAlgorithm } from "@/hooks/use-sorting";
import { SortingControls } from "@/components/visualizer/sorting/sorting-controls";
import { SortingDisplay } from "@/components/visualizer/sorting/sorting-display";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JavaCodeViewer } from "@/components/visualizer/code/java-code-viewer";
import { ComplexityPanel } from "@/components/visualizer/sorting/complexity-panel";

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
  ],
  merge: [
    "procedure mergeSort(A : list, left, right)",
    "  if left >= right then return",
    "  mid := (left + right) / 2",
    "  mergeSort(A, left, mid)",
    "  mergeSort(A, mid + 1, right)",
    "  merge(A, left, mid, right)",
    "end procedure",
    "procedure merge(A, left, mid, right)",
    "  create temporary array for merge",
    "  compare left and right pointers",
    "  copy smaller element to temp",
    "  copy temp back to A[left..right]",
    "end procedure"
  ],
  cyclic: [
    "procedure cyclicSort(A : array of numbers)",
    "  i := 0",
    "  while i < length(A) do",
    "    correct_idx := (A[i] - min(A)) mod n",
    "    if A[i] != A[correct_idx] then",
    "      swap(A[i], A[correct_idx])",
    "    else",
    "      i := i + 1",
    "    end if",
    "  end while",
    "end procedure"
  ],
  quick: [
    "procedure quickSort(A : list, low, high)",
    "  if low < high then",
    "    pi := partition(A, low, high)",
    "    quickSort(A, low, pi - 1)",
    "    quickSort(A, pi + 1, high)",
    "  end if",
    "end procedure",
    "procedure partition(A, low, high)",
    "  pivot := A[high], i := low - 1",
    "  for j := low to high - 1 do",
    "    if A[j] < pivot then swap(A[++i], A[j])",
    "  swap(A[i + 1], A[high])",
    "  return i + 1",
    "end procedure"
  ]
};

const COMPLEXITY_MAP: Record<SortingAlgorithm, { best: string; avg: string; worst: string; space: string; stable: boolean }> = {
  bubble: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: true },
  selection: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: false },
  insertion: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: true },
  merge: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)", stable: true },
  cyclic: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)", stable: true },
  quick: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)", space: "O(log n)", stable: false }
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
}`,
  merge: `// Java Implementation of Merge Sort (Divide and Conquer)
public class MergeSort {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;

            // Sort first and second halves
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);

            // Merge the sorted halves
            merge(arr, left, mid, right);
        }
    }

    private static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        int[] L = new int[n1];
        int[] R = new int[n2];

        for (int i = 0; i < n1; ++i) L[i] = arr[left + i];
        for (int j = 0; j < n2; ++j) R[j] = arr[mid + 1 + j];

        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i++];
            } else {
                arr[k] = R[j++];
            }
            k++;
        }

        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
}`,
  cyclic: `// Java Implementation of Cyclic Sort (O(n) In-Place Pattern)
public class CyclicSort {
    public static void cyclicSort(int[] arr) {
        int i = 0;
        int n = arr.length;
        int minVal = Integer.MAX_VALUE;
        for (int val : arr) minVal = Math.min(minVal, val);

        while (i < n) {
            // Expected index for value
            int correctIndex = (arr[i] - minVal) % n;
            if (correctIndex >= 0 && correctIndex < n && arr[i] != arr[correctIndex]) {
                // Swap element to its correct index position
                int temp = arr[i];
                arr[i] = arr[correctIndex];
                arr[correctIndex] = temp;
            } else {
                i++;
            }
        }
    }
}`,
  quick: `// Java Implementation of Quick Sort (Lomuto Partition Scheme)
public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);

            // Recursively sort elements before and after partition
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);

        for (int j = low; j < high; j++) {
            // If current element is smaller than pivot
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // Swap pivot into correct position
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1;
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
          <JavaCodeViewer
            code={javaCode}
            title={`${title} Java Implementation`}
            subtitle="Production-ready Java implementation following standard academic curriculum."
            badge="Java 17+"
            fileName={`${title.replace(/\s+/g, "")}.java`}
            maxHeight="600px"
            onSendToVisualizer={(arr) => {
              setCustomArray(arr);
            }}
          />
        </TabsContent>

        {/* TAB 3: ASYMPTOTIC COMPLEXITY ANALYSIS (TC & SC) */}
        <TabsContent value="pseudocode" className="space-y-6">
          <ComplexityPanel algorithm={algorithm} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
