"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Layers, Database, ArrowDownUp, TrendingUp, Sliders, Info, Check, X } from "lucide-react";

export function ComplexityMatrix() {
  const [inputN, setInputN] = useState<number>(16);

  const calculateOps = (n: number) => {
    return {
      o1: 1,
      oLogN: Math.round(Math.log2(n || 1)),
      oN: n,
      oNLogN: Math.round(n * Math.log2(n || 1)),
      oN2: n * n,
      o2N: n <= 20 ? Math.pow(2, n) : "> 1,000,000",
    };
  };

  const ops = calculateOps(inputN);

  const dsData = [
    { name: "Array", access: "O(1)", search: "O(n)", insert: "O(n)", delete: "O(n)", space: "O(n)" },
    { name: "Singly Linked List", access: "O(n)", search: "O(n)", insert: "O(1)*", delete: "O(1)*", space: "O(n)" },
    { name: "Doubly Linked List", access: "O(n)", search: "O(n)", insert: "O(1)*", delete: "O(1)*", space: "O(n)" },
    { name: "Stack", access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)", space: "O(n)" },
    { name: "Queue / Deque", access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)", space: "O(n)" },
    { name: "Hash Table", access: "O(1)**", search: "O(1)**", insert: "O(1)**", delete: "O(1)**", space: "O(n)" },
    { name: "Binary Search Tree (BST)", access: "O(log n)**", search: "O(log n)**", insert: "O(log n)**", delete: "O(log n)**", space: "O(n)" },
    { name: "AVL Tree (Balanced)", access: "O(log n)", search: "O(log n)", insert: "O(log n)", delete: "O(log n)", space: "O(n)" },
    { name: "Binary Heap (Min/Max)", access: "N/A", search: "O(n)", insert: "O(log n)", delete: "O(log n)", space: "O(n)" },
    { name: "Trie (Prefix Tree)", access: "O(K)", search: "O(K)", insert: "O(K)", delete: "O(K)", space: "O(N * K)" },
  ];

  const sortingData = [
    { name: "Bubble Sort", best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: true },
    { name: "Selection Sort", best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: false },
    { name: "Insertion Sort", best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: true },
    { name: "Merge Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)", stable: true },
    { name: "Quick Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)", space: "O(log n)", stable: false },
    { name: "Heap Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(1)", stable: false },
    { name: "Counting Sort", best: "O(n + k)", avg: "O(n + k)", worst: "O(n + k)", space: "O(k)", stable: true },
    { name: "Radix Sort", best: "O(nk)", avg: "O(nk)", worst: "O(nk)", space: "O(n + k)", stable: true },
  ];

  const formatComplexityColor = (comp: string) => {
    if (comp.includes("O(1)") || comp.includes("O(K)")) return "text-emerald-500 font-bold";
    if (comp.includes("O(log n)") || comp.includes("O(n)")) return "text-blue-500 font-bold";
    if (comp.includes("O(n log n)") || comp.includes("O(n + k)")) return "text-amber-500 font-bold";
    if (comp.includes("O(n²)")) return "text-red-500 font-bold";
    return "text-purple-500 font-bold";
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider text-purple-500 border-purple-500/30">
          Core Foundation
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight font-heading flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-purple-500" />
          Complexity Analysis & Comparison Matrix
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl">
          Compare asymptotic time and space complexities across Data Structures and Algorithms with dynamic input growth simulations.
        </p>
      </div>

      {/* 1. Dynamic Big-O Growth Simulation */}
      <Card className="border shadow-md">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-heading flex items-center gap-2">
                <Sliders className="h-5 w-5 text-blue-500" /> Interactive Big-O Growth Calculator
              </CardTitle>
              <CardDescription>
                Adjust input size <span className="font-mono font-bold text-foreground">N = {inputN}</span> to see real-time operation counts
              </CardDescription>
            </div>
            <div className="flex items-center gap-3 bg-muted/50 p-2 rounded-xl border border-border/40">
              <span className="text-xs font-medium text-muted-foreground">Input Size (N):</span>
              <input
                type="range"
                min="2"
                max="64"
                value={inputN}
                onChange={(e) => setInputN(Number(e.target.value))}
                className="w-36 accent-blue-600 cursor-pointer"
              />
              <span className="font-mono font-bold text-blue-500 w-8 text-right">{inputN}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3 rounded-xl border bg-card text-center space-y-1">
              <span className="text-xs text-muted-foreground font-mono">O(1) Constant</span>
              <p className="text-xl font-mono font-bold text-emerald-500">{ops.o1}</p>
              <span className="text-[10px] text-muted-foreground">Instant</span>
            </div>
            <div className="p-3 rounded-xl border bg-card text-center space-y-1">
              <span className="text-xs text-muted-foreground font-mono">O(log N) Logarithmic</span>
              <p className="text-xl font-mono font-bold text-blue-500">{ops.oLogN}</p>
              <span className="text-[10px] text-muted-foreground">Very Fast</span>
            </div>
            <div className="p-3 rounded-xl border bg-card text-center space-y-1">
              <span className="text-xs text-muted-foreground font-mono">O(N) Linear</span>
              <p className="text-xl font-mono font-bold text-cyan-500">{ops.oN}</p>
              <span className="text-[10px] text-muted-foreground">Proportional</span>
            </div>
            <div className="p-3 rounded-xl border bg-card text-center space-y-1">
              <span className="text-xs text-muted-foreground font-mono">O(N log N) Linearithmic</span>
              <p className="text-xl font-mono font-bold text-amber-500">{ops.oNLogN}</p>
              <span className="text-[10px] text-muted-foreground">Efficient Sort</span>
            </div>
            <div className="p-3 rounded-xl border bg-card text-center space-y-1">
              <span className="text-xs text-muted-foreground font-mono">O(N²) Quadratic</span>
              <p className="text-xl font-mono font-bold text-red-500">{ops.oN2}</p>
              <span className="text-[10px] text-muted-foreground">Nested Loops</span>
            </div>
            <div className="p-3 rounded-xl border bg-card text-center space-y-1">
              <span className="text-xs text-muted-foreground font-mono">O(2ᴺ) Exponential</span>
              <p className="text-xl font-mono font-bold text-purple-500">{ops.o2N}</p>
              <span className="text-[10px] text-muted-foreground">Brute Force</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Data Structure Comparison Matrix */}
      <Card className="border shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-heading flex items-center gap-2">
            <Database className="h-5 w-5 text-emerald-500" /> Data Structure Operations Matrix
          </CardTitle>
          <CardDescription>
            Time complexity comparison for fundamental operations across common data structures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-bold">Data Structure</TableHead>
                  <TableHead className="font-bold">Access</TableHead>
                  <TableHead className="font-bold">Search</TableHead>
                  <TableHead className="font-bold">Insertion</TableHead>
                  <TableHead className="font-bold">Deletion</TableHead>
                  <TableHead className="font-bold">Space Complexity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dsData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium text-foreground">{row.name}</TableCell>
                    <TableCell className={`font-mono text-xs ${formatComplexityColor(row.access)}`}>{row.access}</TableCell>
                    <TableCell className={`font-mono text-xs ${formatComplexityColor(row.search)}`}>{row.search}</TableCell>
                    <TableCell className={`font-mono text-xs ${formatComplexityColor(row.insert)}`}>{row.insert}</TableCell>
                    <TableCell className={`font-mono text-xs ${formatComplexityColor(row.delete)}`}>{row.delete}</TableCell>
                    <TableCell className="font-mono text-xs text-purple-500 font-bold">{row.space}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic">
            * Assuming node position is already known. ** Average case under balanced/amortized assumptions.
          </p>
        </CardContent>
      </Card>

      {/* 3. Sorting Algorithms Comparison Matrix */}
      <Card className="border shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-heading flex items-center gap-2">
            <ArrowDownUp className="h-5 w-5 text-amber-500" /> Sorting Algorithm Benchmarks
          </CardTitle>
          <CardDescription>
            Comparison of time complexity bounds, auxiliary memory space, and stability guarantees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-bold">Algorithm</TableHead>
                  <TableHead className="font-bold">Best Case</TableHead>
                  <TableHead className="font-bold">Average Case</TableHead>
                  <TableHead className="font-bold">Worst Case</TableHead>
                  <TableHead className="font-bold">Space Complexity</TableHead>
                  <TableHead className="font-bold">Stable?</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortingData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium text-foreground">{row.name}</TableCell>
                    <TableCell className={`font-mono text-xs ${formatComplexityColor(row.best)}`}>{row.best}</TableCell>
                    <TableCell className={`font-mono text-xs ${formatComplexityColor(row.avg)}`}>{row.avg}</TableCell>
                    <TableCell className={`font-mono text-xs ${formatComplexityColor(row.worst)}`}>{row.worst}</TableCell>
                    <TableCell className="font-mono text-xs text-purple-500 font-bold">{row.space}</TableCell>
                    <TableCell>
                      {row.stable ? (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 gap-1 text-[11px]">
                          <Check className="h-3 w-3" /> Yes
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-muted text-muted-foreground border-border gap-1 text-[11px]">
                          <X className="h-3 w-3" /> No
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
