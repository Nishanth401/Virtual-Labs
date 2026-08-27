"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export type SortingAlgorithm = "bubble" | "selection" | "insertion" | "merge" | "cyclic" | "quick";

export interface SortingStep {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
  sortedIndices: number[];
  specialIndices?: { min?: number; key?: number; pivot?: number };
  codeLine?: number;
  message: string;
  comparisons: number;
  swaps: number;
}

export function generateBubbleSortSteps(initial: number[]): SortingStep[] {
  const arr = [...initial];
  const n = arr.length;
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [];

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: [],
    codeLine: 1,
    message: "Starting Bubble Sort algorithm on initial array.",
    comparisons: 0,
    swaps: 0
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      steps.push({
        array: [...arr],
        comparingIndices: [j, j + 1],
        swappedIndices: [],
        sortedIndices: [...sortedIndices],
        codeLine: 4,
        message: `Pass ${i + 1}: Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`,
        comparisons,
        swaps
      });

      if (arr[j] > arr[j + 1]) {
        swaps++;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        steps.push({
          array: [...arr],
          comparingIndices: [],
          swappedIndices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          codeLine: 6,
          message: `Swapping ${arr[j + 1]} and ${arr[j]} because ${arr[j + 1]} > ${arr[j]}.`,
          comparisons,
          swaps
        });
      }
    }

    sortedIndices.push(n - 1 - i);
    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappedIndices: [],
      sortedIndices: [...sortedIndices],
      codeLine: 8,
      message: `Element ${arr[n - 1 - i]} is now locked in its final sorted position.`,
      comparisons,
      swaps
    });

    if (!swapped) {
      for (let k = 0; k < n - 1 - i; k++) {
        if (!sortedIndices.includes(k)) sortedIndices.push(k);
      }
      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappedIndices: [],
        sortedIndices: Array.from({ length: n }, (_, idx) => idx),
        codeLine: 10,
        message: "No swaps occurred in this pass. Array is fully sorted (O(n) early exit)!",
        comparisons,
        swaps
      });
      break;
    }
  }

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    codeLine: 12,
    message: `Bubble Sort complete! Total comparisons: ${comparisons}, Total swaps: ${swaps}.`,
    comparisons,
    swaps
  });

  return steps;
}

export function generateSelectionSortSteps(initial: number[]): SortingStep[] {
  const arr = [...initial];
  const n = arr.length;
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [];

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: [],
    codeLine: 1,
    message: "Starting Selection Sort algorithm.",
    comparisons: 0,
    swaps: 0
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      array: [...arr],
      comparingIndices: [i],
      swappedIndices: [],
      sortedIndices: [...sortedIndices],
      specialIndices: { min: minIdx },
      codeLine: 3,
      message: `Pass ${i + 1}: Assuming arr[${i}] (${arr[i]}) is the initial minimum in unsorted subarray.`,
      comparisons,
      swaps
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      steps.push({
        array: [...arr],
        comparingIndices: [minIdx, j],
        swappedIndices: [],
        sortedIndices: [...sortedIndices],
        specialIndices: { min: minIdx },
        codeLine: 5,
        message: `Comparing current min arr[${minIdx}] (${arr[minIdx]}) with arr[${j}] (${arr[j]}).`,
        comparisons,
        swaps
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...arr],
          comparingIndices: [],
          swappedIndices: [],
          sortedIndices: [...sortedIndices],
          specialIndices: { min: minIdx },
          codeLine: 6,
          message: `Found new minimum element: arr[${minIdx}] (${arr[minIdx]}).`,
          comparisons,
          swaps
        });
      }
    }

    if (minIdx !== i) {
      swaps++;
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappedIndices: [i, minIdx],
        sortedIndices: [...sortedIndices],
        specialIndices: { min: i },
        codeLine: 8,
        message: `Swapping arr[${i}] (${arr[minIdx]}) with min element arr[${minIdx}] (${arr[i]}).`,
        comparisons,
        swaps
      });
    }

    sortedIndices.push(i);
    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappedIndices: [],
      sortedIndices: [...sortedIndices],
      codeLine: 9,
      message: `Position ${i} is now locked with sorted element ${arr[i]}.`,
      comparisons,
      swaps
    });
  }

  sortedIndices.push(n - 1);
  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    codeLine: 10,
    message: `Selection Sort complete! Total comparisons: ${comparisons}, Total swaps: ${swaps}.`,
    comparisons,
    swaps
  });

  return steps;
}

export function generateInsertionSortSteps(initial: number[]): SortingStep[] {
  const arr = [...initial];
  const n = arr.length;
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [0];

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: [0],
    codeLine: 1,
    message: `First element arr[0] (${arr[0]}) is already considered sorted. Starting from index 1.`,
    comparisons: 0,
    swaps: 0
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      comparingIndices: [i],
      swappedIndices: [],
      sortedIndices: [...sortedIndices],
      specialIndices: { key: i },
      codeLine: 3,
      message: `Extracting key = arr[${i}] (${key}) for insertion into sorted prefix.`,
      comparisons,
      swaps
    });

    while (j >= 0) {
      comparisons++;
      steps.push({
        array: [...arr],
        comparingIndices: [j],
        swappedIndices: [],
        sortedIndices: [...sortedIndices],
        specialIndices: { key },
        codeLine: 5,
        message: `Comparing sorted element arr[${j}] (${arr[j]}) with key (${key}).`,
        comparisons,
        swaps
      });

      if (arr[j] > key) {
        swaps++;
        arr[j + 1] = arr[j];
        steps.push({
          array: [...arr],
          comparingIndices: [],
          swappedIndices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          specialIndices: { key },
          codeLine: 6,
          message: `Shifting arr[${j}] (${arr[j]}) rightward to make space for key.`,
          comparisons,
          swaps
        });
        j--;
      } else {
        break;
      }
    }

    arr[j + 1] = key;
    sortedIndices.push(i);

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappedIndices: [j + 1],
      sortedIndices: Array.from({ length: i + 1 }, (_, idx) => idx),
      specialIndices: { key: j + 1 },
      codeLine: 8,
      message: `Inserted key (${key}) at position ${j + 1}. Sorted prefix is now 0..${i}.`,
      comparisons,
      swaps
    });
  }

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    codeLine: 9,
    message: `Insertion Sort complete! Total comparisons: ${comparisons}, Total shifts: ${swaps}.`,
    comparisons,
    swaps
  });

  return steps;
}

export function generateMergeSortSteps(initial: number[]): SortingStep[] {
  const arr = [...initial];
  const n = arr.length;
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: Set<number> = new Set();

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: [],
    codeLine: 1,
    message: "Starting Merge Sort: Divide-and-Conquer recursive algorithm.",
    comparisons: 0,
    swaps: 0
  });

  function mergeSortHelper(left: number, right: number) {
    if (left >= right) {
      if (left === right) sortedIndices.add(left);
      return;
    }

    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...arr],
      comparingIndices: [left, right],
      swappedIndices: [],
      sortedIndices: Array.from(sortedIndices),
      specialIndices: { pivot: mid },
      codeLine: 4,
      message: `Dividing range [${left}..${right}] at mid = ${mid} into [${left}..${mid}] and [${mid + 1}..${right}].`,
      comparisons,
      swaps
    });

    mergeSortHelper(left, mid);
    mergeSortHelper(mid + 1, right);
    merge(left, mid, right);
  }

  function merge(left: number, mid: number, right: number) {
    const temp: number[] = [];
    let i = left;
    let j = mid + 1;

    steps.push({
      array: [...arr],
      comparingIndices: [i, j],
      swappedIndices: [],
      sortedIndices: Array.from(sortedIndices),
      specialIndices: { min: left, key: right, pivot: mid },
      codeLine: 7,
      message: `Merging sorted subarrays [${left}..${mid}] and [${mid + 1}..${right}].`,
      comparisons,
      swaps
    });

    while (i <= mid && j <= right) {
      comparisons++;
      steps.push({
        array: [...arr],
        comparingIndices: [i, j],
        swappedIndices: [],
        sortedIndices: Array.from(sortedIndices),
        specialIndices: { min: left, key: right, pivot: mid },
        codeLine: 9,
        message: `Comparing left arr[${i}] (${arr[i]}) with right arr[${j}] (${arr[j]}).`,
        comparisons,
        swaps
      });

      if (arr[i] <= arr[j]) {
        temp.push(arr[i]);
        i++;
      } else {
        temp.push(arr[j]);
        j++;
      }
    }

    while (i <= mid) {
      temp.push(arr[i]);
      i++;
    }
    while (j <= right) {
      temp.push(arr[j]);
      j++;
    }

    for (let k = 0; k < temp.length; k++) {
      swaps++;
      arr[left + k] = temp[k];
      sortedIndices.add(left + k);

      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappedIndices: [left + k],
        sortedIndices: Array.from(sortedIndices),
        codeLine: 13,
        message: `Placed merged value ${temp[k]} at index ${left + k}.`,
        comparisons,
        swaps
      });
    }
  }

  mergeSortHelper(0, n - 1);

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    codeLine: 15,
    message: `Merge Sort complete! Total comparisons: ${comparisons}, Total merge writes: ${swaps}.`,
    comparisons,
    swaps
  });

  return steps;
}

export function generateCyclicSortSteps(initial: number[]): SortingStep[] {
  const arr = [...initial];
  const n = arr.length;
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: Set<number> = new Set();

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: [],
    codeLine: 1,
    message: "Starting Cyclic Sort: In-place index placement O(n) algorithm.",
    comparisons: 0,
    swaps: 0
  });

  // Calculate target sorted index for each element
  // Works seamlessly for 1..N, 0..N-1, or arbitrary random integers
  const sortedCopy = [...arr].sort((a, b) => a - b);
  const getCorrectIndex = (val: number, currentIdx: number) => {
    // If consecutive 1..N numbers
    const isOneToN = arr.every(x => x >= 1 && x <= n);
    if (isOneToN) return val - 1;

    // If consecutive 0..N-1 numbers
    const isZeroToNMinusOne = arr.every(x => x >= 0 && x < n);
    if (isZeroToNMinusOne) return val;

    // General Rank Mapping for arbitrary integers
    let rank = sortedCopy.indexOf(val);
    while (rank < n && sortedCopy[rank] === val && arr[rank] === val && rank !== currentIdx) {
      rank++;
    }
    return Math.min(Math.max(rank, 0), n - 1);
  };

  let i = 0;
  let safetyLimit = 0;
  while (i < n && safetyLimit < n * 3) {
    safetyLimit++;
    const correctIndex = getCorrectIndex(arr[i], i);

    comparisons++;
    steps.push({
      array: [...arr],
      comparingIndices: [i, correctIndex],
      swappedIndices: [],
      sortedIndices: Array.from(sortedIndices),
      specialIndices: { key: i, min: correctIndex },
      codeLine: 3,
      message: `Inspecting pointer i = ${i}, value = ${arr[i]}. Its target sorted position is index ${correctIndex}.`,
      comparisons,
      swaps
    });

    if (arr[i] !== arr[correctIndex] && i !== correctIndex) {
      swaps++;
      const valToPlace = arr[i];
      const displacedVal = arr[correctIndex];
      [arr[i], arr[correctIndex]] = [arr[correctIndex], arr[i]];

      if (getCorrectIndex(arr[correctIndex], correctIndex) === correctIndex) {
        sortedIndices.add(correctIndex);
      }

      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappedIndices: [i, correctIndex],
        sortedIndices: Array.from(sortedIndices),
        specialIndices: { key: i, min: correctIndex },
        codeLine: 5,
        message: `Swapped ${valToPlace} into target index ${correctIndex}, moving ${displacedVal} to index ${i} to resolve cycle.`,
        comparisons,
        swaps
      });
    } else {
      sortedIndices.add(i);
      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappedIndices: [],
        sortedIndices: Array.from(sortedIndices),
        codeLine: 7,
        message: `Element arr[${i}] (${arr[i]}) is in its correct sorted position. Advancing pointer i to ${i + 1}.`,
        comparisons,
        swaps
      });
      i++;
    }
  }

  // Ensure all elements marked sorted
  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    codeLine: 9,
    message: `Cyclic Sort complete! Total comparisons: ${comparisons}, Total swaps: ${swaps}. Array is fully sorted!`,
    comparisons,
    swaps
  });

  return steps;
}

export function generateQuickSortSteps(initial: number[]): SortingStep[] {
  const arr = [...initial];
  const n = arr.length;
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: Set<number> = new Set();

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: [],
    codeLine: 1,
    message: "Starting Quick Sort: Divide-and-Conquer with pivot partitioning.",
    comparisons: 0,
    swaps: 0
  });

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      sortedIndices.add(pi);

      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappedIndices: [],
        sortedIndices: Array.from(sortedIndices),
        specialIndices: { pivot: pi },
        codeLine: 8,
        message: `Pivot ${arr[pi]} is now locked at index ${pi}. Recursing on left and right sub-arrays.`,
        comparisons,
        swaps
      });

      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high) {
      sortedIndices.add(low);
    }
  }

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...arr],
      comparingIndices: [high],
      swappedIndices: [],
      sortedIndices: Array.from(sortedIndices),
      specialIndices: { pivot: high },
      codeLine: 3,
      message: `Selecting rightmost element arr[${high}] (${pivot}) as pivot for partition [${low}..${high}].`,
      comparisons,
      swaps
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      steps.push({
        array: [...arr],
        comparingIndices: [j, high],
        swappedIndices: [],
        sortedIndices: Array.from(sortedIndices),
        specialIndices: { pivot: high, min: i >= 0 ? i : undefined },
        codeLine: 5,
        message: `Comparing arr[${j}] (${arr[j]}) with pivot (${pivot}).`,
        comparisons,
        swaps
      });

      if (arr[j] < pivot) {
        i++;
        swaps++;
        [arr[i], arr[j]] = [arr[j], arr[i]];

        steps.push({
          array: [...arr],
          comparingIndices: [],
          swappedIndices: [i, j],
          sortedIndices: Array.from(sortedIndices),
          specialIndices: { pivot: high },
          codeLine: 6,
          message: `arr[${j}] < pivot: Swapping arr[${i}] and arr[${j}] to place smaller element on left.`,
          comparisons,
          swaps
        });
      }
    }

    swaps++;
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappedIndices: [i + 1, high],
      sortedIndices: Array.from(sortedIndices),
      specialIndices: { pivot: i + 1 },
      codeLine: 7,
      message: `Placing pivot (${pivot}) into its correct final sorted position at index ${i + 1}.`,
      comparisons,
      swaps
    });

    return i + 1;
  }

  quickSortHelper(0, n - 1);

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    codeLine: 10,
    message: `Quick Sort complete! Total comparisons: ${comparisons}, Total swaps: ${swaps}.`,
    comparisons,
    swaps
  });

  return steps;
}

export function useSorting(
  algorithm: SortingAlgorithm = "bubble",
  initialArray: number[] = [45, 12, 89, 34, 23, 76, 50, 9]
) {
  // Preset array tailored for cyclic sort (1..N permutation)
  const defaultArr = algorithm === "cyclic" 
    ? [3, 5, 2, 1, 4, 8, 6, 7] 
    : initialArray;

  const [arrayInput, setArrayInput] = useState<number[]>(defaultArr);
  const [steps, setSteps] = useState<SortingStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(600);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate steps based on algorithm
  const generateSteps = useCallback((arr: number[], algo: SortingAlgorithm) => {
    let generated: SortingStep[] = [];
    if (algo === "bubble") generated = generateBubbleSortSteps(arr);
    else if (algo === "selection") generated = generateSelectionSortSteps(arr);
    else if (algo === "insertion") generated = generateInsertionSortSteps(arr);
    else if (algo === "merge") generated = generateMergeSortSteps(arr);
    else if (algo === "cyclic") generated = generateCyclicSortSteps(arr);
    else if (algo === "quick") generated = generateQuickSortSteps(arr);
    setSteps(generated);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    generateSteps(arrayInput, algorithm);
  }, [algorithm, arrayInput, generateSteps]);

  // Animation player
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

  const play = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
  };

  const pause = () => setIsPlaying(false);

  const stepNext = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const stepPrev = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const setCustomArray = (newArr: number[]) => {
    setArrayInput(newArr);
  };

  const randomize = (size: number = 8) => {
    if (algorithm === "cyclic") {
      // Generate a shuffled 1..size permutation for clear cycle showcase
      const perm = Array.from({ length: size }, (_, i) => i + 1);
      for (let i = perm.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [perm[i], perm[j]] = [perm[j], perm[i]];
      }
      setArrayInput(perm);
    } else {
      const randomArr = Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 10);
      setArrayInput(randomArr);
    }
  };

  const currentStep = steps[currentStepIndex] || {
    array: arrayInput,
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: [],
    message: "Ready to start",
    comparisons: 0,
    swaps: 0
  };

  const goToStep = (index: number) => {
    setIsPlaying(false);
    setCurrentStepIndex(Math.max(0, Math.min(index, steps.length - 1)));
  };

  return {
    algorithm,
    arrayInput,
    currentStep,
    currentStepIndex,
    totalSteps: steps.length,
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
  };
}
