"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Info
} from "lucide-react";

interface MatrixStep {
  matrix: number[][];
  stepName: string;
  description: string;
  highlightIndices: [number, number][];
  highlightColor?: string;
  codeLine?: string;
}

export function ArraysStringsVisualizer() {
  const [topic, setTopic] = useState<"matrix" | "stringbuilder">("matrix");

  // --- MATRIX ROTATION STEP SYSTEM ---
  const initialMatrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  const generateMatrixSteps = (initMat: number[][]): MatrixStep[] => {
    const steps: MatrixStep[] = [];

    // Step 0: Initial
    steps.push({
      matrix: initMat.map(row => [...row]),
      stepName: "Initial Matrix State",
      description: "Original 3×3 matrix laid out in row-major memory format.",
      highlightIndices: [],
      codeLine: "// Input matrix N×N"
    });

    // Step 1: Transpose Diagonal Swap (0,1) <-> (1,0)
    const mat1 = initMat.map(row => [...row]);
    let tmp = mat1[0][1];
    mat1[0][1] = mat1[1][0];
    mat1[1][0] = tmp;
    steps.push({
      matrix: mat1.map(row => [...row]),
      stepName: "Transpose: Swap (0,1) & (1,0)",
      description: "Diagonal Transpose: Swapping elements across main diagonal: matrix[0][1] (2) ↔ matrix[1][0] (4).",
      highlightIndices: [[0, 1], [1, 0]],
      highlightColor: "border-amber-500 bg-amber-500/20 text-amber-500",
      codeLine: "swap(matrix[i][j], matrix[j][i]);"
    });

    // Step 2: Transpose Swap (0,2) <-> (2,0)
    const mat2 = mat1.map(row => [...row]);
    tmp = mat2[0][2];
    mat2[0][2] = mat2[2][0];
    mat2[2][0] = tmp;
    steps.push({
      matrix: mat2.map(row => [...row]),
      stepName: "Transpose: Swap (0,2) & (2,0)",
      description: "Diagonal Transpose: Swapping elements matrix[0][2] (3) ↔ matrix[2][0] (7).",
      highlightIndices: [[0, 2], [2, 0]],
      highlightColor: "border-amber-500 bg-amber-500/20 text-amber-500",
      codeLine: "swap(matrix[i][j], matrix[j][i]);"
    });

    // Step 3: Transpose Swap (1,2) <-> (2,1)
    const mat3 = mat2.map(row => [...row]);
    tmp = mat3[1][2];
    mat3[1][2] = mat3[2][1];
    mat3[2][1] = tmp;
    steps.push({
      matrix: mat3.map(row => [...row]),
      stepName: "Transpose Complete: Swap (1,2) & (2,1)",
      description: "Diagonal Transpose Finished: Swapping matrix[1][2] (6) ↔ matrix[2][1] (8). All rows are now columns.",
      highlightIndices: [[1, 2], [2, 1]],
      highlightColor: "border-amber-500 bg-amber-500/20 text-amber-500",
      codeLine: "// Matrix Transpose complete"
    });

    // Step 4: Reverse Row 0
    const mat4 = mat3.map(row => [...row]);
    tmp = mat4[0][0];
    mat4[0][0] = mat4[0][2];
    mat4[0][2] = tmp;
    steps.push({
      matrix: mat4.map(row => [...row]),
      stepName: "Reverse Row 0 (Swap left & right)",
      description: "Row Inversion: Reversing row 0 by swapping matrix[0][0] (1) ↔ matrix[0][2] (3).",
      highlightIndices: [[0, 0], [0, 2]],
      highlightColor: "border-blue-500 bg-blue-500/20 text-blue-500",
      codeLine: "swap(matrix[r][c], matrix[r][n - 1 - c]);"
    });

    // Step 5: Reverse Row 1
    const mat5 = mat4.map(row => [...row]);
    tmp = mat5[1][0];
    mat5[1][0] = mat5[1][2];
    mat5[1][2] = tmp;
    steps.push({
      matrix: mat5.map(row => [...row]),
      stepName: "Reverse Row 1 (Swap left & right)",
      description: "Row Inversion: Reversing row 1 by swapping matrix[1][0] (4) ↔ matrix[1][2] (6).",
      highlightIndices: [[1, 0], [1, 2]],
      highlightColor: "border-blue-500 bg-blue-500/20 text-blue-500",
      codeLine: "swap(matrix[r][c], matrix[r][n - 1 - c]);"
    });

    // Step 6: Reverse Row 2
    const mat6 = mat5.map(row => [...row]);
    tmp = mat6[2][0];
    mat6[2][0] = mat6[2][2];
    mat6[2][2] = tmp;
    steps.push({
      matrix: mat6.map(row => [...row]),
      stepName: "90° Clockwise Rotation Complete!",
      description: "Row Inversion Finished: Swapped matrix[2][0] (7) ↔ matrix[2][2] (9). The matrix is successfully rotated 90° in O(1) auxiliary space!",
      highlightIndices: [[2, 0], [2, 2]],
      highlightColor: "border-emerald-500 bg-emerald-500/20 text-emerald-500",
      codeLine: "// Complete In-Place Rotation in O(N²) time & O(1) space"
    });

    return steps;
  };

  const [matrixSteps] = useState<MatrixStep[]>(() => generateMatrixSteps(initialMatrix));
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1000);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        if (currentStepIdx < matrixSteps.length - 1) {
          setCurrentStepIdx((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, speedMs);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIdx, matrixSteps.length, speedMs]);

  const handlePlayToggle = () => {
    if (currentStepIdx >= matrixSteps.length - 1) {
      setCurrentStepIdx(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleStepNext = () => {
    if (currentStepIdx < matrixSteps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
      setIsPlaying(false);
    }
  };

  const handleStepPrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  // --- STRINGBUILDER STATE ---
  const [sbContent, setSbContent] = useState<string>("Hello");
  const [sbCapacity, setSbCapacity] = useState<number>(16);
  const [sbLog, setSbLog] = useState<string>("StringBuilder initialized with initial char[] capacity of 16.");

  const appendToSb = (text: string) => {
    const nextStr = sbContent + text;
    let nextCap = sbCapacity;
    let doubled = false;
    if (nextStr.length > sbCapacity) {
      nextCap = (sbCapacity + 1) * 2;
      doubled = true;
    }
    setSbContent(nextStr);
    setSbCapacity(nextCap);
    if (doubled) {
      setSbLog(`BUFFER OVERFLOW: Length ${nextStr.length} exceeded capacity ${sbCapacity}. Allocated new contiguous heap array with doubled capacity ${nextCap} chars.`);
    } else {
      setSbLog(`Appended "${text}". Total length: ${nextStr.length} chars (within available capacity ${nextCap}).`);
    }
  };

  const playSbDemo = () => {
    setSbContent("H");
    setSbCapacity(8);
    setSbLog("Starting StringBuilder Dynamic Expansion Demo...");
    const chunks = ["e", "l", "l", "o", " ", "W", "o", "r", "l", "d", "!", "🚀"];
    chunks.forEach((chunk, i) => {
      setTimeout(() => {
        setSbContent((prev) => {
          const next = prev + chunk;
          setSbCapacity((prevCap) => {
            if (next.length > prevCap) {
              const newCap = (prevCap + 1) * 2;
              setSbLog(`Capacity Doubled: Buffer grew to ${newCap} chars to fit "${chunk}".`);
              return newCap;
            }
            setSbLog(`Appended '${chunk}' (Length: ${next.length}/${prevCap}).`);
            return prevCap;
          });
          return next;
        });
      }, (i + 1) * 450);
    });
  };

  const currentStep = matrixSteps[currentStepIdx];

  const isCellHighlighted = (r: number, c: number) => {
    return currentStep.highlightIndices.some(([hr, hc]) => hr === r && hc === c);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
            Phase 2: Core Data Structures
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            1D/2D Matrix Rotations &amp; StringBuilder Buffer
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Arrays &amp; Strings Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Explore memory layout in row-major 2D grids, step through in-place matrix rotations ($90^\circ$ clockwise), and watch StringBuilder dynamic character buffer reallocation in real-time.
        </p>
      </div>

      {/* Module Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-2">
          <Button
            variant={topic === "matrix" ? "default" : "outline"}
            size="sm"
            onClick={() => setTopic("matrix")}
            className="h-8 text-xs font-bold rounded-xl"
          >
            2D Matrix Rotation (90° In-Place)
          </Button>
          <Button
            variant={topic === "stringbuilder" ? "default" : "outline"}
            size="sm"
            onClick={() => setTopic("stringbuilder")}
            className="h-8 text-xs font-bold rounded-xl"
          >
            StringBuilder Dynamic Buffer
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono bg-primary/10 text-primary border-primary/20">
            {topic === "matrix" ? "In-Place O(1) Space" : "Amortized O(1) Append"}
          </Badge>
        </div>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        {topic === "matrix" ? (
          <div className="space-y-6">
            {/* Control Bar with Play Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-muted/40 rounded-2xl border border-border/60">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handlePlayToggle}
                  className={`h-9 px-4 font-bold text-xs gap-1.5 rounded-xl shadow-xs transition-all ${
                    isPlaying
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isPlaying ? "Pause" : currentStepIdx >= matrixSteps.length - 1 ? "Replay Rotation" : "Play Rotation"}</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleStepPrev}
                  disabled={currentStepIdx === 0 || isPlaying}
                  className="h-9 px-2.5 text-xs rounded-xl"
                  title="Step Backward"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleStepNext}
                  disabled={currentStepIdx >= matrixSteps.length - 1 || isPlaying}
                  className="h-9 px-2.5 text-xs rounded-xl"
                  title="Step Forward"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="h-9 px-3 text-xs rounded-xl gap-1 text-muted-foreground hover:text-foreground"
                  title="Reset to Initial Matrix"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </Button>
              </div>

              {/* Step indicator & Speed Selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground">
                  Step <strong>{currentStepIdx + 1}</strong> of <strong>{matrixSteps.length}</strong>
                </span>
                <select
                  value={speedMs}
                  onChange={(e) => setSpeedMs(Number(e.target.value))}
                  className="h-8 text-xs font-mono rounded-lg border border-border bg-card px-2 text-foreground"
                >
                  <option value={1500}>0.6x Speed</option>
                  <option value={1000}>1.0x Speed</option>
                  <option value={600}>1.5x Speed</option>
                </select>
              </div>
            </div>

            {/* Matrix Display */}
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="text-center space-y-1">
                <h3 className="text-base font-bold font-heading text-foreground flex items-center justify-center gap-2">
                  <span>{currentStep.stepName}</span>
                </h3>
                <p className="text-xs text-muted-foreground font-mono max-w-lg">
                  {currentStep.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 p-5 bg-muted/20 border-2 border-border/80 rounded-2xl shadow-inner">
                {currentStep.matrix.map((row, r) =>
                  row.map((val, c) => {
                    const highlighted = isCellHighlighted(r, c);
                    return (
                      <div
                        key={`${r}-${c}`}
                        className={`h-20 w-20 rounded-2xl border-2 font-mono font-bold text-xl flex flex-col items-center justify-center transition-all duration-300 shadow-xs ${
                          highlighted
                            ? (currentStep.highlightColor || "border-amber-500 bg-amber-500/20 text-amber-500 scale-105 shadow-md")
                            : "bg-card border-border text-foreground hover:border-primary/40"
                        }`}
                      >
                        <span>{val}</span>
                        <span className="text-[10px] font-normal opacity-60 text-muted-foreground">
                          [{r}][{c}]
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Active Step Progress Dots */}
              <div className="flex items-center gap-1.5 pt-2">
                {matrixSteps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setIsPlaying(false); setCurrentStepIdx(idx); }}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentStepIdx
                        ? "w-6 bg-primary"
                        : "w-2 bg-muted hover:bg-muted-foreground/40"
                    }`}
                    title={`Jump to step ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* STRINGBUILDER VIEW */
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-muted/40 rounded-2xl border border-border/60">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={playSbDemo}
                  className="h-9 px-4 font-bold text-xs gap-1.5 rounded-xl bg-primary text-primary-foreground shadow-xs"
                >
                  <Play className="h-4 w-4" />
                  <span>Play Auto Expansion Demo</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setSbContent("Hello"); setSbCapacity(16); setSbLog("Reset to default 5 chars / 16 capacity."); }}
                  className="h-9 px-3 text-xs rounded-xl text-muted-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
                </Button>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span>Occupied: <strong className="text-primary">{sbContent.length}</strong></span>
                <span>•</span>
                <span>Capacity: <strong className="text-emerald-500">{sbCapacity} chars</strong></span>
              </div>
            </div>

            {/* Array buffer canvas */}
            <div className="p-5 bg-muted/20 border border-border rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground uppercase font-bold">Contiguous Heap char[] Buffer:</span>
                <span className="text-muted-foreground">
                  Load Factor: {Math.round((sbContent.length / sbCapacity) * 100)}%
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: sbCapacity }).map((_, idx) => {
                  const char = sbContent[idx];
                  return (
                    <div
                      key={idx}
                      className={`h-11 w-11 rounded-xl border-2 flex flex-col items-center justify-center font-mono text-sm font-bold transition-all ${
                        char
                          ? "bg-primary/15 border-primary text-primary shadow-xs scale-100"
                          : "bg-muted/10 border-dashed border-border/70 text-muted-foreground/40"
                      }`}
                    >
                      <span>{char || "•"}</span>
                      <span className="text-[9px] font-normal text-muted-foreground opacity-60">{idx}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Manual Append Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button size="sm" variant="outline" onClick={() => appendToSb(" World")} className="text-xs font-mono font-bold rounded-xl">
                + append(" World")
              </Button>
              <Button size="sm" variant="outline" onClick={() => appendToSb("!")} className="text-xs font-mono font-bold rounded-xl">
                + append("!")
              </Button>
              <Button size="sm" variant="outline" onClick={() => appendToSb(" [Extra Long String Forcing Reallocation]")} className="text-xs font-mono font-bold rounded-xl text-amber-500 border-amber-500/40 hover:bg-amber-500/10">
                + append(LargeChunk)
              </Button>
            </div>
          </div>
        )}

        {/* Informative Status Strip */}
        <div className="p-4 bg-muted/50 rounded-xl border border-border/70 text-xs font-mono flex items-start gap-3 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <span className="font-bold block text-foreground">
              {topic === "matrix" ? "Algorithm Mechanics:" : "Dynamic Memory Architecture:"}
            </span>
            <span>
              {topic === "matrix"
                ? "In-place 90° clockwise matrix rotation consists of two canonical operations: (1) Main Diagonal Transposition (swap matrix[i][j] with matrix[j][i]), followed by (2) Horizontal Row Reversal. This avoids allocating an auxiliary N×N matrix, achieving strict O(1) auxiliary space."
                : (sbLog || "Strings in memory are immutable. StringBuilder uses dynamic geometric array resizing (doubling capacity on saturation) to avoid continuous memory copies and garbage collection churn.")}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
