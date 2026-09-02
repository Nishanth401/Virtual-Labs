"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Play, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  Layers, 
  Grid3X3, 
  Link2,
  Database,
  Info,
  Shuffle,
  Eye,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export function BasicDSVisualizer({ initialMode = "array" }: { initialMode?: "array" | "matrix" | "linked-list" | "stack-queue" }) {
  const [mode, setMode] = useState<"array" | "matrix" | "linked-list" | "stack-queue">(initialMode);

  // ==========================================
  // 1. ARRAY & DYNAMIC ARRAY STATE & HANDLERS
  // ==========================================
  const [arrayElements, setArrayElements] = useState<number[]>([15, 28, 42, 67, 89]);
  const [arrayCapacity, setArrayCapacity] = useState<number>(8);
  const [arrayInputValue, setArrayInputValue] = useState<string>("");
  const [arrayIndexValue, setArrayIndexValue] = useState<string>("");
  const [arrayActiveIndex, setArrayActiveIndex] = useState<number | null>(null);
  const [arrayComparingIndices, setArrayComparingIndices] = useState<number[]>([]);
  const [arrayFoundIndex, setArrayFoundIndex] = useState<number | null>(null);
  const [arrayIsBusy, setArrayIsBusy] = useState<boolean>(false);
  const [arrayMessage, setArrayMessage] = useState<string>("Array initialized. Direct memory access available via index O(1).");

  // Append O(1)
  const handleArrayAppend = () => {
    if (arrayIsBusy) return;
    const val = parseInt(arrayInputValue) || Math.floor(Math.random() * 90 + 10);
    if (arrayElements.length >= arrayCapacity) {
      const newCap = arrayCapacity * 2;
      setArrayCapacity(newCap);
      setArrayElements([...arrayElements, val]);
      setArrayActiveIndex(arrayElements.length);
      setArrayMessage(`Capacity full! Doubled capacity from ${arrayCapacity} to ${newCap} (amortized O(1)). Appended ${val}.`);
    } else {
      setArrayElements([...arrayElements, val]);
      setArrayActiveIndex(arrayElements.length);
      setArrayMessage(`Appended ${val} at index [${arrayElements.length}] in O(1) time.`);
    }
    setArrayInputValue("");
    setArrayFoundIndex(null);
    setArrayComparingIndices([]);
  };

  // Insert at Index O(n)
  const handleArrayInsertAtIndex = async () => {
    if (arrayIsBusy) return;
    const val = parseInt(arrayInputValue) || Math.floor(Math.random() * 90 + 10);
    let targetIdx = parseInt(arrayIndexValue);
    if (isNaN(targetIdx) || targetIdx < 0) targetIdx = 0;
    if (targetIdx > arrayElements.length) targetIdx = arrayElements.length;

    setArrayIsBusy(true);
    setArrayMessage(`Inserting ${val} at index [${targetIdx}]. Shifting elements right from index ${arrayElements.length - 1} down to ${targetIdx} in O(n) time...`);

    // Animate shift
    for (let i = arrayElements.length; i > targetIdx; i--) {
      setArrayActiveIndex(i - 1);
      await new Promise((r) => setTimeout(r, 250));
    }

    let nextCap = arrayCapacity;
    if (arrayElements.length + 1 > arrayCapacity) {
      nextCap = arrayCapacity * 2;
      setArrayCapacity(nextCap);
    }

    const nextArr = [...arrayElements];
    nextArr.splice(targetIdx, 0, val);
    setArrayElements(nextArr);
    setArrayActiveIndex(targetIdx);
    setArrayIsBusy(false);
    setArrayMessage(`Successfully inserted ${val} at index [${targetIdx}]. Shifted ${arrayElements.length - targetIdx} elements.`);
    setArrayInputValue("");
    setArrayIndexValue("");
  };

  // Delete at Index O(n)
  const handleArrayDelete = async (idx: number) => {
    if (arrayIsBusy || idx < 0 || idx >= arrayElements.length) return;
    const val = arrayElements[idx];
    setArrayIsBusy(true);
    setArrayActiveIndex(idx);
    setArrayMessage(`Deleting element ${val} at index [${idx}]. Shifting subsequent elements left to maintain contiguous order in O(n)...`);

    await new Promise((r) => setTimeout(r, 300));

    // Shift left animation
    for (let i = idx + 1; i < arrayElements.length; i++) {
      setArrayComparingIndices([i]);
      await new Promise((r) => setTimeout(r, 200));
    }

    const newArr = arrayElements.filter((_, i) => i !== idx);
    setArrayElements(newArr);
    setArrayActiveIndex(null);
    setArrayComparingIndices([]);
    setArrayIsBusy(false);
    setArrayMessage(`Deleted ${val} at index [${idx}]. Elements shifted left in O(n) time.`);
  };

  // Access by Index O(1)
  const handleArrayAccess = (idx: number) => {
    if (idx < 0 || idx >= arrayElements.length) {
      setArrayMessage(`IndexOutOfBoundsException: Index ${idx} out of bounds for length ${arrayElements.length}.`);
      return;
    }
    setArrayActiveIndex(idx);
    setArrayFoundIndex(null);
    setArrayComparingIndices([]);
    const baseAddr = 0x1000;
    const cellAddr = baseAddr + idx * 4;
    setArrayMessage(`O(1) Direct Access: array[${idx}] = ${arrayElements[idx]}. Calculated RAM address = 0x${baseAddr.toString(16)} + (${idx} * 4) = 0x${cellAddr.toString(16).toUpperCase()}.`);
  };

  // Linear Search O(n)
  const handleArraySearch = async () => {
    if (arrayIsBusy) return;
    const target = parseInt(arrayInputValue);
    if (isNaN(target)) {
      setArrayMessage("Please enter a numeric value in the Value input to search for.");
      return;
    }

    setArrayIsBusy(true);
    setArrayActiveIndex(null);
    setArrayFoundIndex(null);
    setArrayMessage(`Beginning Linear Search for value ${target}. Scanning indices 0 to ${arrayElements.length - 1} sequentially in O(n)...`);

    let found = false;
    for (let i = 0; i < arrayElements.length; i++) {
      setArrayComparingIndices([i]);
      setArrayMessage(`Step ${i + 1}: Checking array[${i}] = ${arrayElements[i]} vs target ${target}...`);
      await new Promise((r) => setTimeout(r, 380));

      if (arrayElements[i] === target) {
        setArrayFoundIndex(i);
        setArrayComparingIndices([]);
        setArrayMessage(`FOUND! Value ${target} discovered at index [${i}] in ${i + 1} comparisons.`);
        found = true;
        break;
      }
    }

    if (!found) {
      setArrayComparingIndices([]);
      setArrayMessage(`NOT FOUND: Value ${target} does not exist in array after ${arrayElements.length} comparisons (O(n)).`);
    }
    setArrayIsBusy(false);
  };

  const handleArrayRandomize = () => {
    const size = Math.floor(Math.random() * 4 + 4);
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 90 + 10));
    setArrayElements(newArr);
    setArrayCapacity(Math.max(8, Math.pow(2, Math.ceil(Math.log2(size)))));
    setArrayActiveIndex(null);
    setArrayFoundIndex(null);
    setArrayComparingIndices([]);
    setArrayMessage(`Generated random array with ${size} elements.`);
  };

  const handleArrayReset = () => {
    setArrayElements([15, 28, 42, 67, 89]);
    setArrayCapacity(8);
    setArrayActiveIndex(null);
    setArrayFoundIndex(null);
    setArrayComparingIndices([]);
    setArrayMessage("Array reset to default state: 5 elements, capacity 8.");
  };

  // ==========================================
  // 2. 2D MATRIX STATE & HANDLERS
  // ==========================================
  const [matrixData, setMatrixData] = useState<number[][]>([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
  ]);
  const [matrixActiveCell, setMatrixActiveCell] = useState<{ r: number; c: number } | null>(null);
  const [matrixVisited, setMatrixVisited] = useState<string[]>([]);
  const [matrixIsBusy, setMatrixIsBusy] = useState<boolean>(false);
  const [matrixSearchVal, setMatrixSearchVal] = useState<string>("");
  const [matrixMessage, setMatrixMessage] = useState<string>("2D Matrix (3 rows x 4 columns). Contiguous row-major order RAM mapping.");

  const runSpiralTraversal = async () => {
    if (matrixIsBusy) return;
    setMatrixIsBusy(true);
    const rCount = matrixData.length;
    const cCount = matrixData[0].length;
    let top = 0, bottom = rCount - 1, left = 0, right = cCount - 1;
    const order: { r: number; c: number }[] = [];

    while (top <= bottom && left <= right) {
      for (let c = left; c <= right; c++) order.push({ r: top, c });
      top++;
      for (let r = top; r <= bottom; r++) order.push({ r, c: right });
      right--;
      if (top <= bottom) {
        for (let c = right; c >= left; c--) order.push({ r: bottom, c });
        bottom--;
      }
      if (left <= right) {
        for (let r = bottom; r >= top; r--) order.push({ r, c: left });
        left++;
      }
    }

    setMatrixVisited([]);
    for (let i = 0; i < order.length; i++) {
      const cell = order[i];
      setMatrixActiveCell(cell);
      setMatrixVisited((prev) => [...prev, `${cell.r}-${cell.c}`]);
      setMatrixMessage(`Spiral Step ${i + 1}/${order.length}: Visited matrix[${cell.r}][${cell.c}] = ${matrixData[cell.r][cell.c]}`);
      await new Promise((r) => setTimeout(r, 280));
    }
    setMatrixActiveCell(null);
    setMatrixIsBusy(false);
    setMatrixMessage("Spiral boundary traversal completed successfully in O(R x C) time!");
  };

  const runRowMajorScan = async () => {
    if (matrixIsBusy) return;
    setMatrixIsBusy(true);
    setMatrixVisited([]);
    for (let r = 0; r < matrixData.length; r++) {
      for (let c = 0; c < matrixData[0].length; c++) {
        setMatrixActiveCell({ r, c });
        setMatrixVisited((prev) => [...prev, `${r}-${c}`]);
        const ramOffset = r * matrixData[0].length + c;
        setMatrixMessage(`Row-Major Scan: matrix[${r}][${c}] = ${matrixData[r][c]} | RAM Offset = Base + (${r}*4 + ${c})*sizeof = Offset ${ramOffset}`);
        await new Promise((r) => setTimeout(r, 220));
      }
    }
    setMatrixActiveCell(null);
    setMatrixIsBusy(false);
    setMatrixMessage("Row-Major sequential scan complete! RAM memory cache hits are maximized.");
  };

  const runColMajorScan = async () => {
    if (matrixIsBusy) return;
    setMatrixIsBusy(true);
    setMatrixVisited([]);
    for (let c = 0; c < matrixData[0].length; c++) {
      for (let r = 0; r < matrixData.length; r++) {
        setMatrixActiveCell({ r, c });
        setMatrixVisited((prev) => [...prev, `${r}-${c}`]);
        setMatrixMessage(`Col-Major Scan: matrix[${r}][${c}] = ${matrixData[r][c]}`);
        await new Promise((r) => setTimeout(r, 220));
      }
    }
    setMatrixActiveCell(null);
    setMatrixIsBusy(false);
    setMatrixMessage("Column-Major scan complete! Note cache misses in row-major languages like Java/C.");
  };

  const handleMatrixCellClick = (r: number, c: number) => {
    setMatrixActiveCell({ r, c });
    const cols = matrixData[0].length;
    const offset = r * cols + c;
    setMatrixMessage(`Cell matrix[${r}][${c}] = ${matrixData[r][c]}. Address = Base + (${r} × ${cols} + ${c}) × 4 bytes = Base + ${offset * 4} bytes.`);
  };

  // ==========================================
  // 3. LINKED LIST STATE & HANDLERS
  // ==========================================
  const [llType, setLlType] = useState<"singly" | "doubly" | "circular">("singly");
  const [llNodes, setLlNodes] = useState<number[]>([10, 20, 30, 40]);
  const [llActiveNode, setLlActiveNode] = useState<number | null>(null);
  const [llInputValue, setLlInputValue] = useState<string>("");
  const [llIsBusy, setLlIsBusy] = useState<boolean>(false);
  const [llMessage, setLlMessage] = useState<string>("Heap-allocated nodes dynamically linked via next/prev pointer addresses.");

  const handleLLInsertHead = () => {
    const val = parseInt(llInputValue) || Math.floor(Math.random() * 90 + 10);
    setLlNodes([val, ...llNodes]);
    setLlActiveNode(0);
    setLlInputValue("");
    setLlMessage(`Inserted ${val} at HEAD in O(1) time. newNode.next points to old head. No memory shifting needed!`);
  };

  const handleLLInsertTail = () => {
    const val = parseInt(llInputValue) || Math.floor(Math.random() * 90 + 10);
    setLlNodes([...llNodes, val]);
    setLlActiveNode(llNodes.length);
    setLlInputValue("");
    setLlMessage(`Appended ${val} at TAIL. In singly list with tail pointer, this is O(1) time.`);
  };

  const handleLLDeleteHead = () => {
    if (llNodes.length === 0) {
      setLlMessage("Cannot delete from empty linked list!");
      return;
    }
    const val = llNodes[0];
    setLlNodes(llNodes.slice(1));
    setLlActiveNode(null);
    setLlMessage(`Deleted HEAD node (${val}) in O(1) time. head = head.next.`);
  };

  const handleLLDeleteTail = () => {
    if (llNodes.length === 0) {
      setLlMessage("Cannot delete from empty linked list!");
      return;
    }
    const val = llNodes[llNodes.length - 1];
    setLlNodes(llNodes.slice(0, -1));
    setLlActiveNode(null);
    setLlMessage(`Traversed to node before tail and updated second-to-last node.next = null in O(n) time.`);
  };

  const handleLLReverse = async () => {
    if (llNodes.length <= 1 || llIsBusy) return;
    setLlIsBusy(true);
    setLlMessage("Reversing Linked List iteratively using 3 pointers: prev, curr, next in O(n) time and O(1) auxiliary space...");
    
    for (let i = 0; i < llNodes.length; i++) {
      setLlActiveNode(i);
      setLlMessage(`Reversing pointer at Node [${i}] (value = ${llNodes[i]}): curr.next = prev.`);
      await new Promise((r) => setTimeout(r, 350));
    }
    
    setLlNodes([...llNodes].reverse());
    setLlActiveNode(0);
    setLlIsBusy(false);
    setLlMessage("Linked list completely reversed! Head pointer now points to original tail.");
  };

  // ==========================================
  // 4. STACK & QUEUE STATE & HANDLERS
  // ==========================================
  const [sqMode, setSqMode] = useState<"stack" | "queue" | "circular-queue">("stack");
  const [stackItems, setStackItems] = useState<number[]>([10, 20, 30]);
  const [queueItems, setQueueItems] = useState<number[]>([100, 200, 300]);
  const [sqInputValue, setSqInputValue] = useState<string>("");
  const [sqMessage, setSqMessage] = useState<string>("Stack operations restricted to TOP pointer (LIFO).");

  const handlePushStack = () => {
    const val = parseInt(sqInputValue) || Math.floor(Math.random() * 90 + 10);
    if (stackItems.length >= 7) {
      setSqMessage("Stack Overflow! Maximum demonstration capacity reached (7 items).");
      return;
    }
    setStackItems([val, ...stackItems]);
    setSqInputValue("");
    setSqMessage(`PUSH(${val}) onto TOP of call stack. Top pointer advanced (O(1)).`);
  };

  const handlePopStack = () => {
    if (stackItems.length === 0) {
      setSqMessage("Stack Underflow! Cannot pop from an empty stack.");
      return;
    }
    const popped = stackItems[0];
    setStackItems(stackItems.slice(1));
    setSqMessage(`POP() removed ${popped} from TOP. Top pointer retreated (O(1)).`);
  };

  const handlePeekStack = () => {
    if (stackItems.length === 0) {
      setSqMessage("Stack is empty! Peek returned null.");
      return;
    }
    setSqMessage(`PEEK(): Top element is ${stackItems[0]} (O(1) inspection without removal).`);
  };

  const handleEnqueue = () => {
    const val = parseInt(sqInputValue) || Math.floor(Math.random() * 900 + 100);
    if (queueItems.length >= 8) {
      setSqMessage("Queue Overflow! Buffer capacity reached.");
      return;
    }
    setQueueItems([...queueItems, val]);
    setSqInputValue("");
    setSqMessage(`ENQUEUE(${val}) placed at REAR position. Rear pointer updated (O(1)).`);
  };

  const handleDequeue = () => {
    if (queueItems.length === 0) {
      setSqMessage("Queue Underflow! Buffer is currently empty.");
      return;
    }
    const dequeued = queueItems[0];
    setQueueItems(queueItems.slice(1));
    setSqMessage(`DEQUEUE() removed ${dequeued} from FRONT. Front pointer advanced (O(1)).`);
  };

  return (
    <div className="space-y-6">
      {/* Sub-DS Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-mono">
            Module 1
          </Badge>
          <span className="text-sm font-bold text-foreground">Basic Data Structures Interactive Lab</span>
        </div>

        <div className="flex items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={mode === "array" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("array")}
            className="h-7 text-xs font-semibold"
          >
            <Layers className="h-3.5 w-3.5 mr-1" /> Array &amp; Dynamic
          </Button>
          <Button
            variant={mode === "matrix" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("matrix")}
            className="h-7 text-xs font-semibold"
          >
            <Grid3X3 className="h-3.5 w-3.5 mr-1" /> 2D Matrix
          </Button>
          <Button
            variant={mode === "linked-list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("linked-list")}
            className="h-7 text-xs font-semibold"
          >
            <Link2 className="h-3.5 w-3.5 mr-1" /> Linked List
          </Button>
          <Button
            variant={mode === "stack-queue" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("stack-queue")}
            className="h-7 text-xs font-semibold"
          >
            <Database className="h-3.5 w-3.5 mr-1" /> Stack &amp; Queue
          </Button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* VIEW 1: ARRAY & DYNAMIC ARRAY */}
      {/* ========================================================= */}
      {mode === "array" && (
        <div className="space-y-5">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <Input
                type="number"
                placeholder="Value..."
                value={arrayInputValue}
                onChange={(e) => setArrayInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleArrayAppend();
                }}
                className="w-24 h-9 text-xs"
              />
              <Input
                type="number"
                placeholder="Index..."
                value={arrayIndexValue}
                onChange={(e) => setArrayIndexValue(e.target.value)}
                className="w-20 h-9 text-xs"
              />

              <Button size="sm" onClick={handleArrayAppend} disabled={arrayIsBusy} className="h-9 gap-1 text-xs">
                <Plus className="h-3.5 w-3.5" /> Append (O(1))
              </Button>

              <Button variant="secondary" size="sm" onClick={handleArrayInsertAtIndex} disabled={arrayIsBusy} className="h-9 gap-1 text-xs">
                Insert at Idx (O(n))
              </Button>

              <Button variant="outline" size="sm" onClick={handleArraySearch} disabled={arrayIsBusy} className="h-9 gap-1 text-xs">
                <Search className="h-3.5 w-3.5" /> Search (O(n))
              </Button>

              <Button variant="outline" size="sm" onClick={() => handleArrayDelete(parseInt(arrayIndexValue) || 0)} disabled={arrayIsBusy} className="h-9 gap-1 text-xs text-rose-500 hover:text-rose-600">
                <Trash2 className="h-3.5 w-3.5" /> Delete Idx
              </Button>

              <Button variant="ghost" size="sm" onClick={handleArrayRandomize} disabled={arrayIsBusy} className="h-9 text-xs">
                <Shuffle className="h-3.5 w-3.5" />
              </Button>

              <Button variant="ghost" size="sm" onClick={handleArrayReset} disabled={arrayIsBusy} className="h-9 text-xs">
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-muted-foreground">Size: <strong className="text-foreground">{arrayElements.length}</strong></span>
              <span className="text-muted-foreground">Capacity: <strong className="text-emerald-500">{arrayCapacity}</strong></span>
              <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                Resizing: x2 Doubling
              </Badge>
            </div>
          </div>

          {/* Array Canvas */}
          <Card className="border-border bg-card/80 p-6 overflow-x-auto">
            <div className="space-y-4 min-w-[550px]">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                <span>Contiguous Memory Buffer [0 .. {arrayCapacity - 1}]</span>
                <span className="text-[11px] text-primary/80 lowercase">Click any element to access O(1)</span>
              </div>

              <div className="flex items-center gap-2">
                {Array.from({ length: arrayCapacity }).map((_, idx) => {
                  const isFilled = idx < arrayElements.length;
                  const val = isFilled ? arrayElements[idx] : null;
                  const isActive = arrayActiveIndex === idx;
                  const isComparing = arrayComparingIndices.includes(idx);
                  const isFound = arrayFoundIndex === idx;

                  let borderStyle = "border-dashed border-border/80 bg-muted/20 text-muted-foreground/40";
                  if (isFound) {
                    borderStyle = "border-emerald-500 bg-emerald-500/25 scale-105 shadow-md shadow-emerald-500/30 text-emerald-400";
                  } else if (isActive) {
                    borderStyle = "border-primary bg-primary/20 scale-105 shadow-md shadow-primary/30";
                  } else if (isComparing) {
                    borderStyle = "border-amber-500 bg-amber-500/20 scale-105 text-amber-400 animate-pulse";
                  } else if (isFilled) {
                    borderStyle = "border-emerald-500/50 bg-emerald-500/10 hover:border-emerald-500 hover:scale-102";
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => isFilled && handleArrayAccess(idx)}
                      className={`relative flex flex-col items-center justify-center h-20 w-16 rounded-xl border-2 transition-all cursor-pointer select-none ${borderStyle}`}
                    >
                      <span className="text-[10px] font-mono text-muted-foreground absolute top-1">
                        [{idx}]
                      </span>
                      <span className="text-base font-bold font-mono text-foreground mt-2">
                        {isFilled ? val : "-"}
                      </span>
                      {isFilled && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArrayDelete(idx);
                          }}
                          className="absolute bottom-1 p-1 text-muted-foreground/60 hover:text-rose-500 transition-colors"
                          title={`Delete element at index ${idx}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Status Message */}
              <div className="p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
                <Info className="h-4 w-4 text-primary shrink-0" />
                <span>{arrayMessage}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 2: 2D MATRIX */}
      {/* ========================================================= */}
      {mode === "matrix" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" onClick={runSpiralTraversal} disabled={matrixIsBusy} className="h-9 gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white">
                <Play className="h-3.5 w-3.5" /> Animate Spiral Traversal
              </Button>
              <Button variant="outline" size="sm" onClick={runRowMajorScan} disabled={matrixIsBusy} className="h-9 text-xs">
                Row-Major Scan (O(R x C))
              </Button>
              <Button variant="outline" size="sm" onClick={runColMajorScan} disabled={matrixIsBusy} className="h-9 text-xs">
                Col-Major Scan
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMatrixVisited([]);
                  setMatrixActiveCell(null);
                  setMatrixMessage("Matrix reset. Contiguous memory offsets ready.");
                }}
                disabled={matrixIsBusy}
                className="h-9 text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </div>

            <Badge variant="outline" className="text-xs font-mono">
              Dimensions: 3 x 4 (12 cells)
            </Badge>
          </div>

          <Card className="border-border bg-card/80 p-6 flex flex-col items-center">
            <div className="grid grid-cols-4 gap-3 select-none">
              {matrixData.map((row, rIdx) =>
                row.map((val, cIdx) => {
                  const key = `${rIdx}-${cIdx}`;
                  const isActive = matrixActiveCell?.r === rIdx && matrixActiveCell?.c === cIdx;
                  const isVisited = matrixVisited.includes(key);

                  return (
                    <div
                      key={key}
                      onClick={() => handleMatrixCellClick(rIdx, cIdx)}
                      className={`h-16 w-16 sm:h-20 sm:w-20 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all shadow-xs ${
                        isActive
                          ? "border-amber-400 bg-amber-400/25 scale-110 shadow-lg shadow-amber-400/30 z-10"
                          : isVisited
                          ? "border-emerald-500 bg-emerald-500/15"
                          : "border-border bg-card hover:border-primary/60 hover:scale-102"
                      }`}
                    >
                      <span className="text-[9px] font-mono text-muted-foreground">
                        [{rIdx}][{cIdx}]
                      </span>
                      <span className="text-base sm:text-lg font-bold font-mono text-foreground mt-0.5">
                        {val}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            <div className="w-full max-w-xl mt-6 p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>{matrixMessage}</span>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 3: LINKED LIST */}
      {/* ========================================================= */}
      {mode === "linked-list" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <Input
                type="number"
                placeholder="Value..."
                value={llInputValue}
                onChange={(e) => setLlInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLLInsertHead();
                }}
                className="w-24 h-9 text-xs"
              />
              <Button size="sm" onClick={handleLLInsertHead} disabled={llIsBusy} className="h-9 gap-1 text-xs">
                <Plus className="h-3.5 w-3.5" /> Insert Head (O(1))
              </Button>
              <Button variant="secondary" size="sm" onClick={handleLLInsertTail} disabled={llIsBusy} className="h-9 gap-1 text-xs">
                Insert Tail
              </Button>
              <Button variant="outline" size="sm" onClick={handleLLDeleteHead} disabled={llIsBusy} className="h-9 text-xs text-rose-500">
                Delete Head
              </Button>
              <Button variant="outline" size="sm" onClick={handleLLDeleteTail} disabled={llIsBusy} className="h-9 text-xs text-rose-500">
                Delete Tail
              </Button>
              <Button variant="outline" size="sm" onClick={handleLLReverse} disabled={llIsBusy} className="h-9 text-xs">
                Reverse (O(n))
              </Button>
            </div>

            <div className="flex items-center gap-2 bg-muted/60 p-1 rounded-lg border border-border text-xs">
              <Button
                variant={llType === "singly" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLlType("singly")}
                className="h-7 text-xs"
              >
                Singly
              </Button>
              <Button
                variant={llType === "doubly" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLlType("doubly")}
                className="h-7 text-xs"
              >
                Doubly
              </Button>
              <Button
                variant={llType === "circular" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLlType("circular")}
                className="h-7 text-xs"
              >
                Circular
              </Button>
            </div>
          </div>

          <Card className="border-border bg-card/80 p-6 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-[550px] py-4">
              {/* Head Pointer indicator */}
              <div className="flex flex-col items-center mr-2">
                <span className="text-[10px] font-mono font-bold text-primary">HEAD</span>
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>

              {llNodes.length === 0 ? (
                <span className="text-xs font-mono text-muted-foreground">null (Empty List)</span>
              ) : (
                llNodes.map((val, idx) => {
                  const isActive = llActiveNode === idx;
                  const isTail = idx === llNodes.length - 1;

                  return (
                    <React.Fragment key={idx}>
                      <div
                        onClick={() => {
                          setLlActiveNode(idx);
                          setLlMessage(`Node [${idx}]: Value = ${val}, RAM Heap Pointer = 0x${(1000 + idx * 32).toString(16).toUpperCase()}`);
                        }}
                        className={`flex items-center rounded-xl border-2 bg-card cursor-pointer transition-all shadow-xs ${
                          isActive
                            ? "border-primary bg-primary/15 scale-105"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {/* Prev Pointer block if Doubly */}
                        {llType === "doubly" && (
                          <div className="px-2 py-3 border-r border-border text-[9px] font-mono text-muted-foreground bg-muted/30">
                            {idx === 0 ? "null" : "prev"}
                          </div>
                        )}

                        {/* Node Data Block */}
                        <div className="px-4 py-3 text-center">
                          <span className="text-xs font-mono text-muted-foreground block text-[9px]">Data</span>
                          <strong className="text-base font-mono font-bold text-foreground">{val}</strong>
                        </div>

                        {/* Next Pointer Block */}
                        <div className="px-2.5 py-3 border-l border-border text-[9px] font-mono text-muted-foreground bg-muted/30">
                          {isTail ? (llType === "circular" ? "head" : "null") : "next"}
                        </div>
                      </div>

                      {/* Arrow to Next Node */}
                      {!isTail ? (
                        <div className="flex flex-col items-center text-primary px-1">
                          <ArrowRight className="h-4 w-4" />
                          {llType === "doubly" && <ArrowLeft className="h-4 w-4 -mt-1 text-muted-foreground" />}
                        </div>
                      ) : llType === "circular" ? (
                        <Badge variant="outline" className="text-[9px] font-mono text-primary ml-1">
                          loops to Head
                        </Badge>
                      ) : (
                        <span className="text-xs font-mono text-muted-foreground ml-1">null</span>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </div>

            <div className="p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground mt-4">
              <Info className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>{llMessage}</span>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 4: STACK & QUEUE */}
      {/* ========================================================= */}
      {mode === "stack-queue" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Value..."
                value={sqInputValue}
                onChange={(e) => setSqInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (sqMode === "stack") handlePushStack();
                    else handleEnqueue();
                  }
                }}
                className="w-24 h-9 text-xs"
              />
              {sqMode === "stack" ? (
                <>
                  <Button size="sm" onClick={handlePushStack} className="h-9 gap-1 text-xs">
                    <Plus className="h-3.5 w-3.5" /> Push (Top)
                  </Button>
                  <Button variant="outline" size="sm" onClick={handlePopStack} className="h-9 gap-1 text-xs text-rose-500">
                    <Trash2 className="h-3.5 w-3.5" /> Pop (Top)
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handlePeekStack} className="h-9 gap-1 text-xs">
                    <Eye className="h-3.5 w-3.5" /> Peek
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" onClick={handleEnqueue} className="h-9 gap-1 text-xs">
                    <Plus className="h-3.5 w-3.5" /> Enqueue (Rear)
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDequeue} className="h-9 gap-1 text-xs text-rose-500">
                    <Trash2 className="h-3.5 w-3.5" /> Dequeue (Front)
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 bg-muted/60 p-1 rounded-lg border border-border text-xs">
              <Button
                variant={sqMode === "stack" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => {
                  setSqMode("stack");
                  setSqMessage("Stack (LIFO): Last In, First Out. Elements pushed/popped at Top.");
                }}
                className="h-7 text-xs"
              >
                Stack (LIFO)
              </Button>
              <Button
                variant={sqMode === "queue" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => {
                  setSqMode("queue");
                  setSqMessage("Queue (FIFO): First In, First Out. Enqueue at Rear, Dequeue at Front.");
                }}
                className="h-7 text-xs"
              >
                Queue (FIFO)
              </Button>
            </div>
          </div>

          <Card className="border-border bg-card/80 p-6 flex flex-col items-center">
            {sqMode === "stack" ? (
              // Stack Vertical Box
              <div className="w-52 flex flex-col items-center space-y-2 border-b-4 border-x-4 border-primary/50 rounded-b-2xl p-4 bg-muted/20 min-h-[220px] justify-end">
                {stackItems.length === 0 && (
                  <span className="text-xs font-mono text-muted-foreground/60 pb-8">Empty Stack (Underflow)</span>
                )}
                {stackItems.map((val, idx) => (
                  <div
                    key={idx}
                    className={`w-full py-2.5 rounded-lg text-center font-bold text-sm transition-all border ${
                      idx === 0
                        ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/30 scale-102"
                        : "bg-card text-foreground border-border"
                    }`}
                  >
                    <span>{val}</span>
                    {idx === 0 && <span className="text-[10px] ml-2 font-mono opacity-80">(TOP)</span>}
                  </div>
                ))}
              </div>
            ) : (
              // Queue Horizontal Pipe
              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-2xl border border-border w-full max-w-2xl overflow-x-auto justify-center">
                <div className="text-center font-mono text-[10px] text-muted-foreground shrink-0">
                  <span className="block text-emerald-500 font-bold">FRONT</span>
                  <span>(Dequeue)</span>
                </div>

                <div className="flex items-center gap-2 border-y-2 border-border/80 py-3 px-4 min-w-[260px]">
                  {queueItems.length === 0 && (
                    <span className="text-xs font-mono text-muted-foreground/60 w-full text-center">Empty Queue (Underflow)</span>
                  )}
                  {queueItems.map((val, idx) => (
                    <div
                      key={idx}
                      className={`h-12 w-14 rounded-xl border flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                        idx === 0
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-black shadow-xs"
                          : idx === queueItems.length - 1
                          ? "bg-amber-500/20 border-amber-500 text-amber-400 font-black shadow-xs"
                          : "bg-card border-border text-foreground"
                      }`}
                    >
                      {val}
                    </div>
                  ))}
                </div>

                <div className="text-center font-mono text-[10px] text-muted-foreground shrink-0">
                  <span className="block text-amber-500 font-bold">REAR</span>
                  <span>(Enqueue)</span>
                </div>
              </div>
            )}

            <div className="w-full max-w-lg mt-6 p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-purple-400 shrink-0" />
              <span>{sqMessage}</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
