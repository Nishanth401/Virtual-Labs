"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export type SortingAlgorithm = "bubble" | "selection" | "insertion";

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
      // All remaining elements are sorted
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

  // Ensure all sorted
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

export function useSorting(
  algorithm: SortingAlgorithm = "bubble",
  initialArray: number[] = [45, 12, 89, 34, 23, 76, 50, 9]
) {
  const [arrayInput, setArrayInput] = useState<number[]>(initialArray);
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
    const randomArr = Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 10);
    setArrayInput(randomArr);
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
    reset,
    setCustomArray,
    randomize
  };
}
