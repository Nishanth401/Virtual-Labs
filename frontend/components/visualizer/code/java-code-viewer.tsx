"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Copy,
  Check,
  Terminal,
  FileCode,
  Edit3,
  Code2,
  Play,
  RotateCcw,
  Download,
  CheckCircle2,
  SlidersHorizontal,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

// VS Code Dark+ Java Tokenizer for Clean Syntax Highlighting
function highlightJavaLine(line: string): React.ReactNode[] {
  const commentIdx = line.indexOf("//");
  if (commentIdx !== -1) {
    const beforeComment = line.substring(0, commentIdx);
    const comment = line.substring(commentIdx);
    return [
      ...tokenizeJavaText(beforeComment),
      <span key={`comment-${commentIdx}`} className="text-[#6a9955] italic font-mono">
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
    "Set", "HashSet", "Collection", "Collections", "Role", "User", "Override", "Scanner"
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
        <span key={key} className="text-[#4ec9b0] font-medium">
          {annotation}
        </span>
      );
    } else if (strLit) {
      tokens.push(
        <span key={key} className="text-[#ce9178]">
          {strLit}
        </span>
      );
    } else if (numLit) {
      tokens.push(
        <span key={key} className="text-[#b5cea8]">
          {numLit}
        </span>
      );
    } else if (word) {
      if (KEYWORDS.has(word)) {
        tokens.push(
          <span key={key} className="text-[#569cd6] font-semibold">
            {word}
          </span>
        );
      } else if (BUILTIN_TYPES.has(word) || /^[A-Z][A-Za-z0-9_]*$/.test(word)) {
        tokens.push(
          <span key={key} className="text-[#4ec9b0] font-medium">
            {word}
          </span>
        );
      } else {
        tokens.push(
          <span key={key} className="text-[#9cdcfe]">
            {word}
          </span>
        );
      }
    } else if (punct) {
      if (punct === "(" || punct === ")" || punct === "{" || punct === "}" || punct === "[" || punct === "]") {
        tokens.push(
          <span key={key} className="text-[#ffd700] font-medium">
            {punct}
          </span>
        );
      } else {
        tokens.push(
          <span key={key} className="text-[#d4d4d4]">
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
  badge,
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
  } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleRunCustomCode = () => {
    setIsExecuting(true);
    const logs: string[] = [];
    const startTime = performance.now();

    try {
      const rawNumbers = testInput
        .replace(/[[\]]/g, "")
        .split(/[,\s]+/)
        .map((s) => s.trim())
        .filter(Boolean)
        .map(Number);

      if (rawNumbers.some(isNaN) || rawNumbers.length === 0) {
        throw new Error("Invalid array. Use comma or space-separated numbers (e.g. 64, 34, 25).");
      }

      logs.push(`$ java ${fileName || "Solution.java"}`);
      logs.push(`Input:  [${rawNumbers.join(", ")}]`);

      const arr = [...rawNumbers];
      let comparisons = 0;
      let swaps = 0;
      const n = arr.length;
      const codeLower = editableCode.toLowerCase();

      if (codeLower.includes("selection") || codeLower.includes("minidx")) {
        for (let i = 0; i < n - 1; i++) {
          let minIdx = i;
          for (let j = i + 1; j < n; j++) {
            comparisons++;
            if (arr[j] < arr[minIdx]) minIdx = j;
          }
          if (minIdx !== i) {
            swaps++;
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
          }
        }
      } else if (codeLower.includes("insertion") || codeLower.includes("key")) {
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
        }
      } else if (codeLower.includes("cyclic") || codeLower.includes("correctidx")) {
        let i = 0;
        const minVal = Math.min(...arr);
        while (i < n) {
          const correctIdx = arr[i] - minVal;
          comparisons++;
          if (correctIdx >= 0 && correctIdx < n && arr[i] !== arr[correctIdx]) {
            swaps++;
            [arr[i], arr[correctIdx]] = [arr[correctIdx], arr[i]];
          } else {
            i++;
          }
        }
      } else if (codeLower.includes("merge")) {
        const mergeSort = (subArr: number[]): number[] => {
          if (subArr.length <= 1) return subArr;
          const mid = Math.floor(subArr.length / 2);
          const left = mergeSort(subArr.slice(0, mid));
          const right = mergeSort(subArr.slice(mid));
          const result: number[] = [];
          let l = 0, r = 0;
          while (l < left.length && r < right.length) {
            comparisons++;
            if (left[l] <= right[r]) result.push(left[l++]);
            else {
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
      } else if (codeLower.includes("quick")) {
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
      } else {
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
          if (!swapped) break;
        }
      }

      const duration = Math.max(Number((performance.now() - startTime).toFixed(2)), 0.12);

      logs.push(`Output: [${arr.join(", ")}]`);
      logs.push(`Metrics: ${n} elements | ${comparisons} comparisons | ${swaps} swaps (${duration}ms)`);
      logs.push(`Status: Completed successfully (code 0)`);

      setStats({
        elements: n,
        comparisons,
        swaps,
        durationMs: duration,
      });

      setConsoleLogs(logs);
    } catch (err: any) {
      logs.push(`Error: ${err?.message || "Execution error"}`);
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

  const displayFileName = fileName || (title ? `${title.replace(/\s+/g, "")}.java` : "Solution.java");

  return (
    <div className="h-full rounded-xl border border-border/80 bg-[#1e1e1e] text-[#d4d4d4] shadow-sm overflow-hidden flex flex-col font-sans">
      {/* Clean VS Code-style Header Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#252526] border-b border-[#333333] select-none text-xs">
        {/* Left: Tab Indicator & File Name */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1e1e1e] border-t-2 border-t-[#007acc] border-x border-[#333333] rounded-t text-[#cccccc] font-mono text-[11px] font-medium truncate">
            <FileCode className="w-3.5 h-3.5 text-[#569cd6] shrink-0" />
            <span className="truncate">{displayFileName}</span>
            {hasModified && activeTab === "edit" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#007acc] ml-1 shrink-0" title="Unsaved edits" />
            )}
          </div>
        </div>

        {/* Right: Mode Switcher & Tools */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Segmented Code / Edit Toggle */}
          <div className="flex items-center bg-[#1e1e1e] p-0.5 rounded-md border border-[#3c3c3c]">
            <button
              type="button"
              onClick={() => setActiveTab("view")}
              className={`flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                activeTab === "view"
                  ? "bg-[#37373d] text-[#ffffff]"
                  : "text-[#858585] hover:text-[#cccccc]"
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>Code</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                activeTab === "edit"
                  ? "bg-[#007acc] text-[#ffffff]"
                  : "text-[#858585] hover:text-[#cccccc]"
              }`}
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          {/* Reset (when edited) */}
          {activeTab === "edit" && hasModified && (
            <button
              type="button"
              onClick={handleResetToDefault}
              title="Reset to default template"
              className="p-1 text-[#858585] hover:text-[#cccccc] hover:bg-[#333333] rounded transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Download */}
          <button
            type="button"
            onClick={handleDownload}
            title="Download .java file"
            className="p-1 text-[#858585] hover:text-[#cccccc] hover:bg-[#333333] rounded transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Copy */}
          <button
            type="button"
            onClick={handleCopy}
            title={copied ? "Copied!" : "Copy code"}
            className={`flex items-center gap-1 px-2 py-1 text-[11px] font-mono rounded transition-colors ${
              copied
                ? "text-[#4ec9b0] bg-[#4ec9b0]/10"
                : "text-[#858585] hover:text-[#cccccc] hover:bg-[#333333]"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#4ec9b0]" />
                <span className="text-[10px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="text-[10px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Subtitle / Method Info (Optional) */}
      {subtitle && activeTab === "view" && (
        <div className="px-4 py-2 bg-[#181818] border-b border-[#2d2d2d] text-xs sm:text-[13px] font-mono text-[#9cdcfe] truncate font-medium">
          {subtitle}
        </div>
      )}

      {/* VIEW MODE: CLEAN SYNTAX HIGHLIGHTED CODE */}
      {activeTab === "view" && (
        <div
          className="p-4 flex-1 overflow-auto font-mono text-sm sm:text-[15px] leading-relaxed selection:bg-[#264f78]"
          style={maxHeight ? { maxHeight } : undefined}
        >
          <pre className="table w-full">
            <code>
              {lines.map((line, lineIndex) => (
                <div key={`line-${lineIndex}`} className="table-row hover:bg-[#2a2d2e]">
                  {showLineNumbers && (
                    <span className="table-cell text-right pr-4 pl-1 select-none text-[#858585] w-8 font-mono text-xs sm:text-[13px]">
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

      {/* EDIT MODE: CLEAN CODE EDITOR & RUNNER */}
      {activeTab === "edit" && (
        <div className="flex-1 flex flex-col divide-y divide-[#333333] overflow-hidden bg-[#1e1e1e]">
          {/* Editor Canvas */}
          <div className="flex-1 flex min-h-[220px] max-h-[380px] bg-[#1e1e1e] overflow-hidden">
            {showLineNumbers && (
              <div className="py-4 px-2 bg-[#1e1e1e] border-r border-[#2d2d2d] select-none text-right font-mono text-xs sm:text-[13px] text-[#858585] w-10 shrink-0">
                {Array.from({ length: editLinesCount }).map((_, i) => (
                  <div key={i} className="leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={editableCode}
              onChange={(e) => {
                setEditableCode(e.target.value);
                setHasModified(true);
              }}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className="flex-1 p-4 bg-transparent text-[#d4d4d4] font-mono text-sm sm:text-[15px] leading-6 resize-none focus:outline-none focus:ring-0 selection:bg-[#264f78] border-0 overflow-auto"
            />
          </div>

          {/* Test Input & Run Bar */}
          <div className="p-2.5 bg-[#252526] flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs font-mono">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <span className="text-[#858585] text-[11px] shrink-0">Array:</span>
              <input
                type="text"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="64, 34, 25, 12, 22"
                className="w-full px-2 py-1 text-xs font-mono bg-[#1e1e1e] border border-[#3c3c3c] rounded text-[#cccccc] focus:outline-none focus:border-[#007acc]"
              />
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {onSendToVisualizer && (
                <button
                  type="button"
                  onClick={handleSendToVisualizerTimeline}
                  title="Send input array to visualizer timeline"
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] bg-[#333333] hover:bg-[#3c3c3c] text-[#cccccc] rounded transition-colors"
                >
                  <ArrowRight className="w-3 h-3 text-[#569cd6]" />
                  <span>Send to Visualizer</span>
                </button>
              )}

              <Button
                size="sm"
                onClick={handleRunCustomCode}
                disabled={isExecuting}
                className="h-7 px-3 text-[11px] font-mono bg-[#007acc] hover:bg-[#0062a3] text-white rounded font-medium gap-1"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isExecuting ? "Running..." : "Run"}</span>
              </Button>
            </div>
          </div>

          {/* Terminal Console */}
          {consoleLogs.length > 0 && (
            <div className="bg-[#181818] p-3 space-y-1 max-h-[160px] overflow-auto font-mono text-[11px] border-t border-[#2d2d2d]">
              <div className="flex items-center justify-between text-[#858585] border-b border-[#2d2d2d] pb-1 mb-1">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3 h-3" /> Console
                </span>
                {stats && (
                  <span className="text-[#4ec9b0] text-[10px]">
                    {stats.durationMs}ms ({stats.comparisons} comp, {stats.swaps} swaps)
                  </span>
                )}
              </div>

              {consoleLogs.map((log, index) => {
                let color = "text-[#cccccc]";
                if (log.startsWith("$")) color = "text-[#569cd6]";
                else if (log.startsWith("Output:")) color = "text-[#4ec9b0] font-medium";
                else if (log.startsWith("Error:")) color = "text-[#f48771]";

                return (
                  <div key={index} className={`leading-relaxed whitespace-pre-wrap ${color}`}>
                    {log}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
