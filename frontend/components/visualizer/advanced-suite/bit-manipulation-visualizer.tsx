"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sliders, Play, RotateCcw, Info, Sparkles, Binary } from "lucide-react";

export function BitManipulationVisualizer() {
  const [numA, setNumA] = useState<number>(29); // 00011101
  const [numB, setNumB] = useState<number>(15); // 00001111
  const [op, setOp] = useState<"AND" | "OR" | "XOR" | "LSHIFT" | "RSHIFT" | "KERNIGHAN">("AND");
  const [kernighanSteps, setKernighanSteps] = useState<{ val: number; bitStr: string; msg: string }[]>([]);

  const to8Bits = (val: number): string => {
    return (val & 0xff).toString(2).padStart(8, "0");
  };

  const toggleBitA = (bitIndex: number) => {
    // bitIndex 0 is LSB, 7 is MSB
    setNumA(prev => prev ^ (1 << bitIndex));
  };

  const toggleBitB = (bitIndex: number) => {
    setNumB(prev => prev ^ (1 << bitIndex));
  };

  const computeResult = () => {
    switch (op) {
      case "AND": return numA & numB;
      case "OR": return numA | numB;
      case "XOR": return numA ^ numB;
      case "LSHIFT": return (numA << 1) & 0xff;
      case "RSHIFT": return (numA >> 1) & 0xff;
      default: return numA;
    }
  };

  const runKernighan = () => {
    let n = numA;
    const history: { val: number; bitStr: string; msg: string }[] = [];
    let count = 0;

    history.push({
      val: n,
      bitStr: to8Bits(n),
      msg: `Start Brian Kernighan bit count for ${n}.`
    });

    while (n > 0) {
      const nextN = n & (n - 1);
      count++;
      history.push({
        val: nextN,
        bitStr: to8Bits(nextN),
        msg: `Iteration ${count}: n & (n - 1) cleared lowest set bit! New value = ${nextN}.`
      });
      n = nextN;
    }

    history.push({
      val: 0,
      bitStr: to8Bits(0),
      msg: `Finished! Total set bits (Hamming weight) = ${count}. Time complexity O(number of set bits).`
    });

    setKernighanSteps(history);
  };

  const result = computeResult();
  const bitsA = to8Bits(numA).split("");
  const bitsB = to8Bits(numB).split("");
  const bitsRes = to8Bits(result).split("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30">
            Phase 3: Searching &amp; Algorithmic Patterns
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Bitwise Arithmetic &amp; Brian Kernighan
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Bit Manipulation Studio
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Interactive binary byte registers. Click on individual bits to toggle 0 and 1, test bitwise operators (AND, OR, XOR, Shifts), and run Brian Kernighan’s set-bit counting algorithm.
        </p>
      </div>

      {/* Control Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {(["AND", "OR", "XOR", "LSHIFT", "RSHIFT", "KERNIGHAN"] as const).map((operation) => (
            <Button
              key={operation}
              variant={op === operation ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setOp(operation);
                if (operation === "KERNIGHAN") runKernighan();
              }}
              className="h-8 text-xs font-mono font-bold rounded-xl"
            >
              {operation}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span>A: <strong>{numA}</strong> (0x{numA.toString(16).toUpperCase()})</span>
          <span>•</span>
          <span>B: <strong>{numB}</strong> (0x{numB.toString(16).toUpperCase()})</span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            Single Cycle O(1) Machine Operations
          </Badge>
        </div>
      </div>

      {/* Bit Registers Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        {op !== "KERNIGHAN" ? (
          <div className="space-y-6 max-w-2xl mx-auto py-2">
            {/* Register A */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-foreground">Register A = {numA} (Click bit to toggle)</span>
                <span className="text-muted-foreground">MSB ──> LSB</span>
              </div>
              <div className="grid grid-cols-8 gap-2">
                {bitsA.map((bit, idx) => {
                  const bitPower = 7 - idx;
                  const isOne = bit === "1";
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleBitA(bitPower)}
                      className={`h-14 rounded-xl border font-mono font-bold text-lg flex flex-col items-center justify-center transition-all ${
                        isOne
                          ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                          : "bg-muted/40 border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <span>{bit}</span>
                      <span className="text-[8px] opacity-70">2^{bitPower}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Operator Symbol */}
            <div className="flex items-center justify-center font-mono font-bold text-lg text-primary">
              <span>[ {op} ]</span>
            </div>

            {/* Register B */}
            {op !== "LSHIFT" && op !== "RSHIFT" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-foreground">Register B = {numB} (Click bit to toggle)</span>
                  <span className="text-muted-foreground">MSB ──> LSB</span>
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {bitsB.map((bit, idx) => {
                    const bitPower = 7 - idx;
                    const isOne = bit === "1";
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleBitB(bitPower)}
                        className={`h-14 rounded-xl border font-mono font-bold text-lg flex flex-col items-center justify-center transition-all ${
                          isOne
                            ? "bg-indigo-600 text-white border-indigo-500 shadow-md scale-105"
                            : "bg-muted/40 border-border text-muted-foreground hover:border-indigo-500/50"
                        }`}
                      >
                        <span>{bit}</span>
                        <span className="text-[8px] opacity-70">2^{bitPower}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Result Divider & Row */}
            <div className="pt-4 border-t-2 border-dashed border-border/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-emerald-500">Output Result = {result} (0b{to8Bits(result)})</span>
                <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-500 border-emerald-500/30 font-mono">
                  Calculated
                </Badge>
              </div>
              <div className="grid grid-cols-8 gap-2">
                {bitsRes.map((bit, idx) => {
                  const bitPower = 7 - idx;
                  const isOne = bit === "1";
                  return (
                    <div
                      key={idx}
                      className={`h-14 rounded-xl border font-mono font-bold text-lg flex flex-col items-center justify-center shadow-xs ${
                        isOne
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-black scale-105 shadow-md"
                          : "bg-muted/20 border-border text-muted-foreground"
                      }`}
                    >
                      <span>{bit}</span>
                      <span className="text-[8px] opacity-70">2^{bitPower}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Brian Kernighan Set-Bit Counting Trace */
          <div className="space-y-4 max-w-xl mx-auto py-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-muted-foreground">
                Brian Kernighan’s Algorithm Execution Trace: n = n &amp; (n - 1)
              </span>
              <Button size="sm" onClick={runKernighan} className="h-7 text-xs font-bold rounded-xl">
                Re-Run
              </Button>
            </div>

            <div className="space-y-2.5">
              {kernighanSteps.map((step, idx) => (
                <div key={idx} className="p-3 bg-muted/30 rounded-xl border border-border/70 flex items-center justify-between font-mono text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] text-primary block font-bold">Step {idx}</span>
                    <span className="text-foreground">{step.msg}</span>
                  </div>
                  <div className="px-2.5 py-1 rounded bg-card border font-bold text-emerald-400 text-sm">
                    {step.bitStr}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>
            {op === "XOR"
              ? "XOR Property: A ^ A = 0, A ^ 0 = A. Used to find single non-duplicate element in linear time and O(1) space."
              : op === "KERNIGHAN"
              ? "Brian Kernighan: clears lowest set bit in each iteration. Loops exactly K times where K = number of set bits!"
              : `Bitwise ${op} operation executed directly across all 8 bit positions.`}
          </span>
        </div>
      </Card>
    </div>
  );
}
