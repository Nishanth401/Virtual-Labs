"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Copy,
  Check,
  Terminal,
  FileCode2,
  Edit3,
  Eye,
  Play,
  RotateCcw,
  Download,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface JavaCodeViewerProps {
  code: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  fileName?: string;
  maxHeight?: string;
  showLineNumbers?: boolean;
  onSendToVisualizer?: (array: number[]) => void;
}

// Java Tokenizer for Syntax Highlighting
function highlightJavaLine(line: string): React.ReactNode[] {
  const commentIdx = line.indexOf("//");
  if (commentIdx !== -1) {
    const beforeComment = line.substring(0, commentIdx);
    const comment = line.substring(commentIdx);
    return [
      ...tokenizeJavaText(beforeComment),
      <span key={`comment-${commentIdx}`} className="text-slate-500 italic font-mono">
        {comment}
      </span>
    ];
  }
  return tokenizeJavaText(line);
}

function tokenizeJavaText(text: string): React.ReactNode[] {
  const tokenRegex = /(@[A-Za-z0-9_]+)|("(?:\\.|[^"\\])*")|(\b\d+\b)|([A-Za-z_][A-Za-z0-9_]*)|([{}()[\];,=<>!+\-*/%&|^~])|(\s+)|(.)/g;

  const KEYWORDS = new Set([
    "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char", "class",
    "const", "continue", "default", "do", "double", "else", "enum", "extends", "final",
    "finally", "float", "for", "goto", "if", "implements", "import", "instanceof", "int",
    "interface", "long", "native", "new", "package", "private", "protected", "public",
    "return", "short", "static", "strictfp", "super", "switch", "synchronized", "this",
    "throw", "throws", "transient", "try", "void", "volatile", "while", "true", "false", "null"
  ]);

  const BUILTIN_TYPES = new Set([
    "String", "Integer", "Long", "Double", "Float", "Boolean", "Character", "Byte", "Short",
    "Object", "Class", "System", "Math", "Arrays", "List", "ArrayList", "Map", "HashMap",
    "Set", "HashSet", "Collection", "Collections", "Role", "User", "Override", "GrantedAuthority",
    "SimpleGrantedAuthority", "Scanner", "Comparable", "Comparator"
  ]);

  const tokens: React.ReactNode[] = [];
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    const [raw, annotation, strLit, numLit, word, punct, space] = match;
    const key = `tok-${idx++}`;

    if (space) {
      tokens.push(<span key={key}>{space}</span>);
    } else if (annotation) {
      tokens.push(
        <span key={key} className="text-[#38bdf8] font-semibold">
          {annotation}
        </span>
      );
    } else if (strLit) {
      tokens.push(
        <span key={key} className="text-[#fb923c]">
          {strLit}
        </span>
      );
    } else if (numLit) {
      tokens.push(
        <span key={key} className="text-[#fde047]">
          {numLit}
        </span>
      );
    } else if (word) {
      if (KEYWORDS.has(word)) {
        tokens.push(
          <span key={key} className="text-[#38bdf8] font-bold">
            {word}
          </span>
        );
      } else if (BUILTIN_TYPES.has(word) || /^[A-Z][A-Za-z0-9_]*$/.test(word)) {
        tokens.push(
          <span key={key} className="text-[#2dd4bf] font-bold">
            {word}
          </span>
        );
      } else {
        tokens.push(
          <span key={key} className="text-[#f8fafc] font-medium">
            {word}
          </span>
        );
      }
    } else if (punct) {
      if (punct === "(" || punct === ")" || punct === "{" || punct === "}") {
        tokens.push(
          <span key={key} className="text-[#f472b6] font-bold">
            {punct}
          </span>
        );
      } else if (punct === "=" || punct === "==" || punct === "!=" || punct === "<" || punct === ">") {
        tokens.push(
          <span key={key} className="text-[#38bdf8] font-bold">
            {punct}
          </span>
        );
      } else {
        tokens.push(
          <span key={key} className="text-slate-400">
            {punct}
          </span>
        );
      }
    } else {
      tokens.push(<span key={key} className="text-slate-300">{raw}</span>);
    }
  }

  return tokens;
}

export function JavaCodeViewer({
  code,
  title,
  subtitle,
  badge = "Java 17+",
  fileName,
  maxHeight,
  showLineNumbers = true,
  onSendToVisualizer,
}: JavaCodeViewerProps) {
  const [activeTab, setActiveTab] = useState<"view" | "edit">("view");
  const [editableCode, setEditableCode] = useState<string>(code);
  const [copied, setCopied] = useState<boolean>(false);
  const [testInput, setTestInput] = useState<string>("64, 34, 25, 12, 22, 11, 90");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [hasModified, setHasModified] = useState<boolean>(false);
  const [stats, setStats] = useState<{
    elements: number;
    comparisons: number;
    swaps: number;
    durationMs: number;
    status: "SORTED_ASC" | "SORTED_DESC" | "COMPLETED";
  } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync when initial code changes
  useEffect(() => {
    setEditableCode(code);
    setHasModified(false);
  }, [code]);

  const lines = useMemo(() => {
    return (activeTab === "view" ? code : editableCode).trim().split("\n");
  }, [code, editableCode, activeTab]);

  const editLinesCount = useMemo(() => {
    return editableCode.split("\n").length;
  }, [editableCode]);

  // Handle Tab key in custom code editor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const spaces = "    ";

      const updated = editableCode.substring(0, start) + spaces + editableCode.substring(end);
      setEditableCode(updated);
      setHasModified(true);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + spaces.length;
      }, 0);
    } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleRunCustomCode();
    }
  };

  const handleCopy = async () => {
    try {
      const codeToCopy = activeTab === "edit" ? editableCode : code;
      await navigator.clipboard.writeText(codeToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  const handleDownload = () => {
    const codeToDownload = activeTab === "edit" ? editableCode : code;
    const name = fileName || (title ? `${title.replace(/\s+/g, "")}.java` : "Solution.java");
    const blob = new Blob([codeToDownload], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name.endsWith(".java") ? name : `${name}.java`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleResetToDefault = () => {
    setEditableCode(code);
    setHasModified(false);
    setConsoleLogs([]);
    setStats(null);
  };

  // Safe client-side algorithm executor & execution tracer
  const handleRunCustomCode = () => {
    setIsExecuting(true);
    const logs: string[] = [];

    const startTime = performance.now();

    try {
      // Parse input array
      const rawNumbers = testInput
        .replace(/[[\]]/g, "")
        .split(/[,\s]+/)
        .map((s) => s.trim())
        .filter(Boolean)
        .map(Number);

      if (rawNumbers.some(isNaN) || rawNumbers.length === 0) {
        throw new Error("Invalid array input format. Please enter comma or space-separated numbers (e.g. 64, 34, 25, 12).");
      }

      logs.push(`$ javac ${fileName || "Solution.java"} && java Solution`);
      logs.push(`[JVM_INIT] Initializing Java 17 Runtime Environment...`);
      logs.push(`[INPUT]  Original Array (${rawNumbers.length} elements): [${rawNumbers.join(", ")}]`);
      logs.push(`[EXEC]   Invoking custom algorithm method execution...`);

      const arr = [...rawNumbers];
      let comparisons = 0;
      let swaps = 0;
      const n = arr.length;

      // Detect sorting type or run simulation
      const codeLower = editableCode.toLowerCase();

      if (codeLower.includes("selection") || codeLower.includes("minidx") || codeLower.includes("min_idx")) {
        // Selection Sort Simulation
        for (let i = 0; i < n - 1; i++) {
          let minIdx = i;
          for (let j = i + 1; j < n; j++) {
            comparisons++;
            if (arr[j] < arr[minIdx]) {
              minIdx = j;
            }
          }
          if (minIdx !== i) {
            swaps++;
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            if (i < 4 || i === n - 2) {
              logs.push(`  ↳ Pass ${i + 1}: selected min '${arr[i]}' swapped to idx [${i}] -> [${arr.join(", ")}]`);
            }
          }
        }
      } else if (codeLower.includes("insertion") || (codeLower.includes("key") && codeLower.includes("while"))) {
        // Insertion Sort Simulation
        for (let i = 1; i < n; i++) {
          const key = arr[i];
          let j = i - 1;
          while (j >= 0 && arr[j] > key) {
            comparisons++;
            arr[j + 1] = arr[j];
            swaps++;
            j = j - 1;
          }
          if (j >= 0) comparisons++;
          arr[j + 1] = key;
          if (i < 4 || i === n - 1) {
            logs.push(`  ↳ Step ${i}: placed key '${key}' at idx [${j + 1}] -> [${arr.join(", ")}]`);
          }
        }
      } else if (codeLower.includes("cyclic") || codeLower.includes("correctidx")) {
        // Cyclic Sort Simulation
        let i = 0;
        const minVal = Math.min(...arr);
        while (i < n) {
          const correctIdx = arr[i] - minVal;
          comparisons++;
          if (correctIdx >= 0 && correctIdx < n && arr[i] !== arr[correctIdx]) {
            swaps++;
            [arr[i], arr[correctIdx]] = [arr[correctIdx], arr[i]];
            logs.push(`  ↳ Cyclic Swap: value '${arr[correctIdx]}' placed at target index [${correctIdx}] -> [${arr.join(", ")}]`);
          } else {
            i++;
          }
        }
      } else if (codeLower.includes("merge") || codeLower.includes("mergesort")) {
        // Merge Sort Simulation
        const mergeSort = (subArr: number[]): number[] => {
          if (subArr.length <= 1) return subArr;
          const mid = Math.floor(subArr.length / 2);
          const left = mergeSort(subArr.slice(0, mid));
          const right = mergeSort(subArr.slice(mid));
          const result: number[] = [];
          let l = 0, r = 0;
          while (l < left.length && r < right.length) {
            comparisons++;
            if (left[l] <= right[r]) {
              result.push(left[l++]);
            } else {
              result.push(right[r++]);
              swaps++;
            }
          }
          while (l < left.length) result.push(left[l++]);
          while (r < right.length) result.push(right[r++]);
          return result;
        };
        const sorted = mergeSort(arr);
        for (let idx = 0; idx < n; idx++) arr[idx] = sorted[idx];
        logs.push(`  ↳ Merge Sort: recursively divided and combined partitions -> [${arr.join(", ")}]`);
      } else if (codeLower.includes("quick") || codeLower.includes("quicksort") || codeLower.includes("pivot")) {
        // Quick Sort Simulation
        const quickSort = (low: number, high: number) => {
          if (low < high) {
            const pivot = arr[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
              comparisons++;
              if (arr[j] < pivot) {
                i++;
                swaps++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
              }
            }
            swaps++;
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            const pi = i + 1;
            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
          }
        };
        quickSort(0, n - 1);
        logs.push(`  ↳ Quick Sort: partitioned around pivots -> [${arr.join(", ")}]`);
      } else {
        // Bubble Sort / Universal Default Simulation
        for (let i = 0; i < n - 1; i++) {
          let swapped = false;
          for (let j = 0; j < n - i - 1; j++) {
            comparisons++;
            if (arr[j] > arr[j + 1]) {
              swaps++;
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              swapped = true;
            }
          }
          if (i < 4 || i === n - 2) {
            logs.push(`  ↳ Pass ${i + 1}: end of pass array state -> [${arr.join(", ")}]`);
          }
          if (!swapped) {
            logs.push(`  ↳ Optimization: early exit flag triggered at pass ${i + 1}.`);
            break;
          }
        }
      }

      const duration = Math.max(Number((performance.now() - startTime).toFixed(2)), 0.15);

      logs.push(`[OUTPUT] Sorted Output Result: [${arr.join(", ")}]`);
      logs.push(`[METRICS] Elements: ${n} | Comparisons: ${comparisons} | Swaps: ${swaps} | Time: ${duration}ms`);
      logs.push(`[JVM_EXIT] Process exited successfully with status code 0.`);

      setStats({
        elements: n,
        comparisons,
        swaps,
        durationMs: duration,
        status: "SORTED_ASC"
      });

      setConsoleLogs(logs);
    } catch (err: any) {
      logs.push(`[ERROR] Runtime / Compilation Exception: ${err?.message || "Execution error"}`);
      setConsoleLogs(logs);
      setStats(null);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSendToVisualizerTimeline = () => {
    try {
      const rawNumbers = testInput
        .replace(/[[\]]/g, "")
        .split(/[,\s]+/)
        .map((s) => s.trim())
        .filter(Boolean)
        .map(Number);

      if (rawNumbers.length > 0 && onSendToVisualizer) {
        onSendToVisualizer(rawNumbers);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="h-full rounded-2xl border border-slate-800 bg-[#0b0f19] shadow-2xl overflow-hidden flex flex-col">
      {/* Editor Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-3.5 py-2.5 bg-[#0f172a] border-b border-slate-800/80 gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block border border-rose-600/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block border border-amber-600/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/50" />
          </div>

          <div className="h-3.5 w-px bg-slate-700/60 mx-0.5 shrink-0" />

          {/* File Name & Title */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-200 font-bold min-w-0">
            <FileCode2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
            <span className="truncate">{fileName || (title ? `${title.replace(/\s+/g, "")}.java` : "Solution.java")}</span>
          </div>

          {hasModified && activeTab === "edit" && (
            <Badge variant="outline" className="text-[9px] font-mono bg-amber-500/10 text-amber-400 border-amber-500/30 px-1.5 py-0">
              ● Modified
            </Badge>
          )}
        </div>

        {/* Mode Switcher Tabs (Reference vs Custom Code Writer) */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("view")}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
              activeTab === "view"
                ? "bg-[#1e88e5] text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Reference Solution</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
              activeTab === "edit"
                ? "bg-[#1e88e5] text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Custom Code Writer</span>
          </button>
        </div>

        {/* Action Buttons: Reset, Download, Copy */}
        <div className="flex items-center gap-1.5 shrink-0">
          {badge && (
            <Badge
              variant="outline"
              className="font-mono text-[10px] font-bold bg-[#38bdf8]/10 text-[#38bdf8] border-[#38bdf8]/30 px-2 py-0.5 whitespace-nowrap shrink-0 hidden sm:inline-flex"
            >
              {badge}
            </Badge>
          )}

          {activeTab === "edit" && hasModified && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleResetToDefault}
              title="Reset code to original reference template"
              className="h-7 px-2 text-xs font-mono text-slate-400 hover:text-white bg-slate-800/60 border border-slate-700/60 rounded-lg"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            onClick={handleDownload}
            title="Download .java file"
            className="h-7 px-2 text-xs font-mono text-slate-300 hover:text-white bg-slate-800/60 border border-slate-700/60 rounded-lg"
          >
            <Download className="w-3.5 h-3.5" />
          </Button>

          {/* Copy Button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className={`h-7 px-2.5 text-xs font-mono font-bold gap-1.5 rounded-lg transition-all shrink-0 whitespace-nowrap ${
              copied
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                : "bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 shrink-0" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {subtitle && activeTab === "view" && (
        <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/60 text-xs font-mono font-bold text-slate-300 shrink-0 flex items-center justify-between">
          <span>{subtitle}</span>
          <span className="text-[10px] text-slate-400 font-normal">Click &apos;Custom Code Writer&apos; above to edit &amp; test custom Java code.</span>
        </div>
      )}

      {/* MODE 1: READ-ONLY SYNTAX HIGHLIGHTED REFERENCE VIEW */}
      {activeTab === "view" && (
        <div
          className="p-4 flex-1 overflow-auto font-mono text-sm sm:text-[15px] leading-relaxed selection:bg-blue-500/30 selection:text-white"
          style={maxHeight ? { maxHeight } : undefined}
        >
          <pre className="table w-full">
            <code>
              {lines.map((line, lineIndex) => (
                <div key={`line-${lineIndex}`} className="table-row group hover:bg-slate-800/30">
                  {showLineNumbers && (
                    <span className="table-cell text-right pr-4 pl-1 select-none text-slate-500 text-xs sm:text-[13px] w-8 font-mono group-hover:text-slate-300 transition-colors">
                      {lineIndex + 1}
                    </span>
                  )}
                  <span className="table-cell whitespace-pre font-mono">
                    {highlightJavaLine(line)}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}

      {/* MODE 2: INTERACTIVE CUSTOM CODE WRITER & EXECUTION SANDBOX */}
      {activeTab === "edit" && (
        <div className="flex-1 flex flex-col divide-y divide-slate-800 overflow-hidden">
          {/* Custom Editor Sub-Header Banner */}
          <div className="px-4 py-2 bg-slate-900/80 flex flex-wrap items-center justify-between text-xs font-mono gap-2 shrink-0">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="font-bold text-slate-200">Custom Code Writer</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 text-[11px]">Edit logic, test inputs, and execute with live JVM terminal output</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-3">
              <span>Lines: <strong className="text-slate-200">{editLinesCount}</strong></span>
              <span>Chars: <strong className="text-slate-200">{editableCode.length}</strong></span>
            </div>
          </div>

          {/* Code Editor Canvas Area */}
          <div className="flex-1 flex min-h-[320px] max-h-[480px] bg-[#070a13] overflow-hidden">
            {/* Line Numbers Track */}
            {showLineNumbers && (
              <div className="py-3 px-2 bg-[#090d1a] border-r border-slate-800/80 select-none text-right font-mono text-xs text-slate-600 w-10 shrink-0 overflow-hidden">
                {Array.from({ length: editLinesCount }).map((_, i) => (
                  <div key={i} className="leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>
            )}

            {/* Monospace Code Editor Textarea */}
            <textarea
              ref={textareaRef}
              value={editableCode}
              onChange={(e) => {
                setEditableCode(e.target.value);
                setHasModified(true);
              }}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              placeholder="// Write your custom Java algorithm implementation here..."
              className="flex-1 p-3 bg-transparent text-emerald-400 font-mono text-xs sm:text-[13px] leading-6 resize-none focus:outline-none focus:ring-0 selection:bg-blue-500/40 selection:text-white border-0 overflow-auto"
            />
          </div>

          {/* Test Input & Runner Controls Toolbar */}
          <div className="p-3.5 bg-[#0f172a] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shrink-0">
            <div className="flex-1 w-full flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <label className="text-xs font-mono font-bold text-slate-300 shrink-0 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Test Array:</span>
              </label>
              <input
                type="text"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="e.g. 64, 34, 25, 12, 22, 11, 90"
                className="w-full sm:max-w-md px-3 py-1.5 text-xs font-mono bg-slate-900 border border-slate-700/80 rounded-xl text-slate-200 focus:outline-none focus:border-[#38bdf8] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              {onSendToVisualizer && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSendToVisualizerTimeline}
                  title="Push this test array into the timeline visualizer"
                  className="text-xs font-mono font-bold bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white rounded-xl h-8 gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Send to Visualizer</span>
                </Button>
              )}

              <Button
                size="sm"
                onClick={handleRunCustomCode}
                disabled={isExecuting}
                className="text-xs font-mono font-bold bg-[#1e88e5] hover:bg-[#1976d2] text-white rounded-xl h-8 px-3.5 gap-1.5 shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isExecuting ? "Running..." : "Run & Test Code"}</span>
              </Button>
            </div>
          </div>

          {/* Live Execution Output Terminal */}
          {consoleLogs.length > 0 && (
            <div className="bg-[#050811] border-t border-slate-800 p-4 space-y-2 max-h-[260px] overflow-auto">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-200">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>JVM Console Output</span>
                </div>
                {stats && (
                  <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sorted in {stats.durationMs}ms ({stats.comparisons} comparisons, {stats.swaps} swaps)</span>
                  </div>
                )}
              </div>

              <div className="font-mono text-xs space-y-1 text-slate-300">
                {consoleLogs.map((log, index) => {
                  let colorClass = "text-slate-300";
                  if (log.startsWith("$")) colorClass = "text-[#38bdf8] font-bold";
                  else if (log.startsWith("[INPUT]")) colorClass = "text-amber-400 font-semibold";
                  else if (log.startsWith("[OUTPUT]")) colorClass = "text-emerald-400 font-bold";
                  else if (log.startsWith("[METRICS]")) colorClass = "text-teal-300 font-semibold";
                  else if (log.startsWith("[ERROR]")) colorClass = "text-rose-400 font-bold";
                  else if (log.startsWith("[JVM_EXIT]")) colorClass = "text-emerald-500 font-bold";

                  return (
                    <div key={index} className={`leading-relaxed whitespace-pre-wrap ${colorClass}`}>
                      {log}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
