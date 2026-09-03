"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, Play, RotateCcw, ChevronRight, ChevronLeft, Info, CheckCircle2 } from "lucide-react";

export function ArraysStringsVisualizer() {
  const [topic, setTopic] = useState<"matrix" | "stringbuilder">("matrix");
  const [matrix, setMatrix] = useState<number[][]>([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]);
  const [sbContent, setSbContent] = useState<string>("Hello");
  const [sbCapacity, setSbCapacity] = useState<number>(16);

  const rotate90Clockwise = () => {
    // Transpose then reverse rows
    const n = matrix.length;
    const next: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        next[c][n - 1 - r] = matrix[r][c];
      }
    }
    setMatrix(next);
  };

  const appendToSb = (text: string) => {
    const nextStr = sbContent + text;
    let nextCap = sbCapacity;
    if (nextStr.length > sbCapacity) {
      nextCap = (sbCapacity + 1) * 2;
    }
    setSbContent(nextStr);
    setSbCapacity(nextCap);
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
          Explore memory layout in row-major 2D grids, in-place matrix rotations ($90^\circ$ clockwise), and StringBuilder dynamic character buffer resizing.
        </p>
      </div>

      {/* Selector */}
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

        <Badge variant="outline" className="text-[10px] font-mono bg-primary/10 text-primary border-primary/20">
          O(1) Memory In-Place Rotations
        </Badge>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div className="flex flex-col items-center justify-center py-4">
          {topic === "matrix" ? (
            <div className="space-y-4 text-center">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block font-bold">
                3x3 Matrix Grid (Row-Major Memory Order)
              </span>

              <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto p-4 bg-muted/20 border border-border rounded-2xl">
                {matrix.map((row, r) =>
                  row.map((val, c) => (
                    <div
                      key={`${r}-${c}`}
                      className="h-16 w-16 rounded-xl bg-card border-2 border-primary/30 font-mono font-bold text-lg flex items-center justify-center text-foreground shadow-xs"
                    >
                      {val}
                    </div>
                  ))
                )}
              </div>

              <Button
                size="sm"
                onClick={rotate90Clockwise}
                className="h-8 text-xs font-bold gap-1.5 rounded-xl bg-primary text-primary-foreground mt-2"
              >
                <RotateCcw className="h-3.5 w-3.5 transform -scale-x-100" />
                <span>Rotate 90° Clockwise</span>
              </Button>
            </div>
          ) : (
            <div className="space-y-6 w-full max-w-lg">
              <div className="flex items-center justify-between font-mono text-xs">
                <span>Length: <strong>{sbContent.length}</strong></span>
                <span>•</span>
                <span>Buffer Capacity: <strong className="text-emerald-400">{sbCapacity} chars</strong></span>
              </div>

              <div className="p-4 bg-muted/20 border border-border rounded-2xl">
                <span className="text-[10px] font-mono text-muted-foreground uppercase block mb-2 font-bold">
                  Internal char[] Array:
                </span>
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: sbCapacity }).map((_, idx) => {
                    const char = sbContent[idx];
                    return (
                      <div
                        key={idx}
                        className={`h-9 w-9 rounded-lg border flex items-center justify-center font-mono text-xs font-bold ${
                          char
                            ? "bg-primary/20 border-primary text-primary"
                            : "bg-muted/10 border-dashed border-border text-muted-foreground"
                        }`}
                      >
                        {char || "•"}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <Button size="sm" variant="outline" onClick={() => appendToSb(" World")} className="text-xs font-mono font-bold rounded-xl">
                  + append(" World")
                </Button>
                <Button size="sm" variant="outline" onClick={() => appendToSb("!")} className="text-xs font-mono font-bold rounded-xl">
                  + append("!")
                </Button>
                <Button size="sm" variant="outline" onClick={() => appendToSb(" Extra Long String That Forces Growth")} className="text-xs font-mono font-bold rounded-xl">
                  + append(LargeChunk)
                </Button>
                <Button size="sm" variant="ghost" onClick={() => { setSbContent("Hello"); setSbCapacity(16); }} className="text-xs font-mono text-muted-foreground rounded-xl">
                  Reset
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>
            {topic === "matrix"
              ? "In-place 90° matrix rotation is performed by: (1) Transposing matrix along main diagonal, (2) Reversing each row."
              : "In Java/C++, strings are immutable. StringBuilder uses an internal resizable char[] to prevent continuous O(N) heap allocations during concatenation."}
          </span>
        </div>
      </Card>
    </div>
  );
}
