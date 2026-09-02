"use client";

import React, { useState } from "react";
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
  Info
} from "lucide-react";

export function BasicDSVisualizer({ initialMode = "array" }: { initialMode?: "array" | "matrix" | "linked-list" | "stack-queue" }) {
  const [mode, setMode] = useState<"array" | "matrix" | "linked-list" | "stack-queue">(initialMode);

  // --- ARRAY STATE ---
  const [arrayElements, setArrayElements] = useState<number[]>([15, 28, 42, 67, 89]);
  const [arrayCapacity, setArrayCapacity] = useState<number>(8);
  const [arrayInputValue, setArrayInputValue] = useState<string>("");
  const [arrayActiveIndex, setArrayActiveIndex] = useState<number | null>(null);
  const [arrayMessage, setArrayMessage] = useState<string>("Array ready. Direct memory access available via index.");

  // --- MATRIX STATE ---
  const [matrixData, setMatrixData] = useState<number[][]>([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
  ]);
  const [matrixActiveCell, setMatrixActiveCell] = useState<{ r: number; c: number } | null>(null);
  const [matrixVisited, setMatrixVisited] = useState<string[]>([]);
  const [matrixMessage, setMatrixMessage] = useState<string>("2D Matrix 3x4 layout in contiguous row-major order.");

  // --- LINKED LIST STATE ---
  const [llType, setLlType] = useState<"singly" | "doubly" | "circular">("singly");
  const [llNodes, setLlNodes] = useState<number[]>([10, 20, 30, 40]);
  const [llActiveNode, setLlActiveNode] = useState<number | null>(null);
  const [llMessage, setLlMessage] = useState<string>("Heap allocated nodes linked by memory references.");

  // --- STACK & QUEUE STATE ---
  const [sqMode, setSqMode] = useState<"stack" | "queue" | "circular-queue">("stack");
  const [stackItems, setStackItems] = useState<number[]>([10, 20, 30]);
  const [queueItems, setQueueItems] = useState<number[]>([100, 200, 300]);
  const [sqInputValue, setSqInputValue] = useState<string>("");
  const [sqMessage, setSqMessage] = useState<string>("Stack operations restricted to TOP pointer.");

  // Array Handlers
  const handleArrayAppend = () => {
    const val = parseInt(arrayInputValue) || Math.floor(Math.random() * 90 + 10);
    if (arrayElements.length >= arrayCapacity) {
      const newCap = arrayCapacity * 2;
      setArrayCapacity(newCap);
      setArrayElements([...arrayElements, val]);
      setArrayActiveIndex(arrayElements.length);
      setArrayMessage(`Capacity full! Doubled capacity from ${arrayCapacity} to ${newCap} (amortized O(1)).`);
    } else {
      setArrayElements([...arrayElements, val]);
      setArrayActiveIndex(arrayElements.length);
      setArrayMessage(`Appended ${val} at index ${arrayElements.length} in O(1) time.`);
    }
    setArrayInputValue("");
  };

  const handleArrayDelete = (idx: number) => {
    const val = arrayElements[idx];
    const newArr = arrayElements.filter((_, i) => i !== idx);
    setArrayElements(newArr);
    setArrayActiveIndex(null);
    setArrayMessage(`Deleted ${val} at index ${idx}. Shifted remaining elements left in O(n) time.`);
  };

  const handleArrayAccess = (idx: number) => {
    setArrayActiveIndex(idx);
    setArrayMessage(`Access array[${idx}] = ${arrayElements[idx]}. Memory address = Base + ${idx} * sizeof(int) (O(1)).`);
  };

  // Matrix Handlers
  const runSpiralTraversal = async () => {
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
      await new Promise((r) => setTimeout(r, 350));
    }
    setMatrixActiveCell(null);
    setMatrixMessage("Spiral boundary traversal completed successfully!");
  };

  // Linked List Handlers
  const handleLLInsertHead = () => {
    const val = Math.floor(Math.random() * 90 + 10);
    setLlNodes([val, ...llNodes]);
    setLlActiveNode(0);
    setLlMessage(`Created new Heap Node(${val}) and set newNode.next = head. O(1) time without array shifting.`);
  };

  const handleLLDeleteTail = () => {
    if (llNodes.length === 0) return;
    const val = llNodes[llNodes.length - 1];
    setLlNodes(llNodes.slice(0, -1));
    setLlActiveNode(null);
    setLlMessage(`Removed tail node (${val}) and reclaimed pointer memory.`);
  };

  // Stack / Queue Handlers
  const handlePushStack = () => {
    const val = parseInt(sqInputValue) || Math.floor(Math.random() * 90 + 10);
    setStackItems([val, ...stackItems]);
    setSqInputValue("");
    setSqMessage(`PUSH(${val}) onto TOP of call stack. Top pointer advanced (O(1)).`);
  };

  const handlePopStack = () => {
    if (stackItems.length === 0) {
      setSqMessage("Stack Underflow! Cannot pop from empty stack.");
      return;
    }
    const popped = stackItems[0];
    setStackItems(stackItems.slice(1));
    setSqMessage(`POP() returned ${popped} from TOP. Top pointer retreated (O(1)).`);
  };

  const handleEnqueue = () => {
    const val = parseInt(sqInputValue) || Math.floor(Math.random() * 900 + 100);
    setQueueItems([...queueItems, val]);
    setSqInputValue("");
    setSqMessage(`ENQUEUE(${val}) placed at REAR. Rear pointer updated (O(1)).`);
  };

  const handleDequeue = () => {
    if (queueItems.length === 0) {
      setSqMessage("Queue Underflow! Buffer is currently empty.");
      return;
    }
    const dequeued = queueItems[0];
    setQueueItems(queueItems.slice(1));
    setSqMessage(`DEQUEUE() removed ${dequeued} from FRONT. Front pointer updated (O(1)).`);
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

      {/* VIEW 1: ARRAY & DYNAMIC ARRAY */}
      {mode === "array" && (
        <div className="space-y-5">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Value..."
                value={arrayInputValue}
                onChange={(e) => setArrayInputValue(e.target.value)}
                className="w-24 h-9 text-xs"
              />
              <Button size="sm" onClick={handleArrayAppend} className="h-9 gap-1 text-xs">
                <Plus className="h-3.5 w-3.5" /> Append (O(1))
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setArrayElements([10, 20, 30]);
                  setArrayCapacity(4);
                  setArrayActiveIndex(null);
                  setArrayMessage("Array reset to size 3, capacity 4.");
                }}
                className="h-9 text-xs"
              >
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
            <div className="space-y-4 min-w-[500px]">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <span>Contiguous Memory Buffer [0 .. {arrayCapacity - 1}]</span>
              </div>

              <div className="flex items-center gap-2">
                {Array.from({ length: arrayCapacity }).map((_, idx) => {
                  const isFilled = idx < arrayElements.length;
                  const val = isFilled ? arrayElements[idx] : null;
                  const isActive = arrayActiveIndex === idx;

                  return (
                    <div
                      key={idx}
                      onClick={() => isFilled && handleArrayAccess(idx)}
                      className={`relative flex flex-col items-center justify-center h-20 w-16 rounded-xl border-2 transition-all cursor-pointer select-none ${
                        isActive
                          ? "border-primary bg-primary/20 scale-105 shadow-md shadow-primary/30"
                          : isFilled
                          ? "border-emerald-500/50 bg-emerald-500/10 hover:border-emerald-500 hover:scale-102"
                          : "border-dashed border-border/80 bg-muted/20 text-muted-foreground/40"
                      }`}
                    >
                      <span className="text-[10px] font-mono text-muted-foreground absolute top-1">
                        [{idx}]
                      </span>
                      <span className="text-base font-bold font-mono text-foreground mt-2">
                        {isFilled ? val : "—"}
                      </span>
                      {isFilled && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArrayDelete(idx);
                          }}
                          className="absolute bottom-1 p-0.5 text-muted-foreground/60 hover:text-rose-500 transition-colors"
                          title="Delete element"
                        >
                          <Trash2 className="h-3 w-3" />
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

      {/* VIEW 2: 2D MATRIX */}
      {mode === "matrix" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <Button size="sm" onClick={runSpiralTraversal} className="h-9 gap-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white">
              <Play className="h-3.5 w-3.5" /> Animate Spiral Traversal
            </Button>
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span>Rows: <strong>3</strong></span>
              <span>•</span>
              <span>Cols: <strong>4</strong></span>
              <span>•</span>
              <span>Offset: <strong>row * 4 + col</strong></span>
            </div>
          </div>

          <Card className="border-border bg-card/80 p-6 flex flex-col items-center">
            <div className="grid grid-cols-4 gap-3">
              {matrixData.map((row, r) =>
                row.map((val, c) => {
                  const isCurrent = matrixActiveCell?.r === r && matrixActiveCell?.c === c;
                  const isVisited = matrixVisited.includes(`${r}-${c}`);

                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => {
                        setMatrixActiveCell({ r, c });
                        setMatrixMessage(`Selected matrix[${r}][${c}] = ${val}. Stored in RAM at row-major offset ${r * 4 + c}.`);
                      }}
                      className={`h-16 w-20 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
                        isCurrent
                          ? "border-amber-500 bg-amber-500/20 scale-110 shadow-lg shadow-amber-500/30"
                          : isVisited
                          ? "border-indigo-500/60 bg-indigo-500/10 text-indigo-400"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <span className="text-[10px] font-mono text-muted-foreground">({r},{c})</span>
                      <span className="font-bold text-sm text-foreground">{val}</span>
                    </div>
                  );
                })
              )}
            </div>

            <div className="w-full max-w-lg mt-6 p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>{matrixMessage}</span>
            </div>
          </Card>
        </div>
      )}

      {/* VIEW 3: LINKED LIST */}
      {mode === "linked-list" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={handleLLInsertHead} className="h-9 gap-1 text-xs">
                <Plus className="h-3.5 w-3.5" /> Insert Head (O(1))
              </Button>
              <Button variant="outline" size="sm" onClick={handleLLDeleteTail} className="h-9 gap-1 text-xs text-rose-500">
                <Trash2 className="h-3.5 w-3.5" /> Delete Tail
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
                Doubly (Next+Prev)
              </Button>
              <Button
                variant={llType === "circular" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLlType("circular")}
                className="h-7 text-xs"
              >
                Circular (Tail→Head)
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

              {llNodes.map((val, idx) => {
                const isActive = llActiveNode === idx;
                const isTail = idx === llNodes.length - 1;

                return (
                  <React.Fragment key={idx}>
                    <div
                      onClick={() => {
                        setLlActiveNode(idx);
                        setLlMessage(`Node ${idx}: value = ${val}, address = 0x${(1000 + idx * 32).toString(16).toUpperCase()}`);
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

                      {/* Data Payload */}
                      <div className="px-4 py-3 text-center">
                        <span className="text-xs font-mono text-muted-foreground block text-[9px]">Data</span>
                        <span className="font-bold text-sm text-foreground">{val}</span>
                      </div>

                      {/* Next Pointer block */}
                      <div className="px-2 py-3 border-l border-border text-[9px] font-mono text-muted-foreground bg-muted/30">
                        {isTail ? (llType === "circular" ? "head" : "null") : "next"}
                      </div>
                    </div>

                    {/* Connector Arrow */}
                    {!isTail ? (
                      <div className="flex items-center text-muted-foreground">
                        {llType === "doubly" ? (
                          <div className="flex flex-col items-center">
                            <ArrowRight className="h-3.5 w-3.5 text-primary" />
                            <ArrowLeft className="h-3.5 w-3.5 text-muted-foreground" />
                          </div>
                        ) : (
                          <ArrowRight className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    ) : (
                      llType === "circular" && (
                        <div className="flex items-center text-emerald-500 font-mono text-[10px] pl-2 border-l border-emerald-500/40">
                          ↺ loops back to HEAD
                        </div>
                      )
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="mt-4 p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>{llMessage}</span>
            </div>
          </Card>
        </div>
      )}

      {/* VIEW 4: STACK & QUEUE */}
      {mode === "stack-queue" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Value..."
                value={sqInputValue}
                onChange={(e) => setSqInputValue(e.target.value)}
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
              <div className="w-48 flex flex-col items-center space-y-2 border-b-4 border-x-4 border-primary/50 rounded-b-2xl p-4 bg-muted/20 min-h-[200px] justify-end">
                {stackItems.length === 0 && (
                  <span className="text-xs font-mono text-muted-foreground/60 pb-8">Empty Stack</span>
                )}
                {stackItems.map((val, idx) => (
                  <div
                    key={idx}
                    className={`w-full py-2.5 rounded-lg text-center font-bold text-sm transition-all border ${
                      idx === 0
                        ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/30"
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
              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-2xl border border-border w-full max-w-xl overflow-x-auto justify-center">
                <div className="text-center font-mono text-[10px] text-muted-foreground shrink-0">
                  <span className="block text-emerald-500 font-bold">FRONT</span>
                  <span>(Dequeue)</span>
                </div>

                <div className="flex items-center gap-2 border-y-2 border-border/80 py-3 px-4 min-w-[240px]">
                  {queueItems.length === 0 && (
                    <span className="text-xs font-mono text-muted-foreground/60 w-full text-center">Empty Queue</span>
                  )}
                  {queueItems.map((val, idx) => (
                    <div
                      key={idx}
                      className={`h-12 w-14 rounded-xl border flex items-center justify-center font-bold text-xs shrink-0 ${
                        idx === 0
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                          : idx === queueItems.length - 1
                          ? "bg-amber-500/20 border-amber-500 text-amber-400"
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
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>{sqMessage}</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
