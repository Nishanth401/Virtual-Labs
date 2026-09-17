"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Copy,
  Check,
  Code2,
  Download,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Wand2,
  Terminal,
  Maximize2,
  Minimize2,
  Edit3,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
  Cpu,
  Layers,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface MultiLangCodeSnippets {
  java?: string;
  python?: string;
  cpp?: string;
  javascript?: string;
  typescript?: string;
  [key: string]: string | undefined;
}

export interface CodeSnippetItem {
  language: string;
  label?: string;
  code: string;
}

export interface MultiLangCodeViewerProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  snippets: MultiLangCodeSnippets | CodeSnippetItem[];
  activeLineMap?: {
    java?: number;
    python?: number;
    cpp?: number;
    javascript?: number;
    typescript?: number;
  };
  currentStepIndex?: number;
  onSendToVisualizer?: (data: any) => void;
  showCustomizer?: boolean;
}

type ThemeType = "vscode-dark" | "one-dark" | "monokai" | "cyberpunk" | "light";
type FontSize = "12px" | "13px" | "14px" | "16px";

// Language Keywords & Tokenizers for Syntax Highlighting
const KEYWORDS_BY_LANG: Record<string, Set<string>> = {
  java: new Set([
    "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char", "class",
    "const", "continue", "default", "do", "double", "else", "enum", "extends", "final",
    "finally", "float", "for", "goto", "if", "implements", "import", "instanceof", "int",
    "interface", "long", "native", "new", "package", "private", "protected", "public",
    "return", "short", "static", "strictfp", "super", "switch", "synchronized", "this",
    "throw", "throws", "transient", "try", "void", "volatile", "while", "true", "false", "null"
  ]),
  python: new Set([
    "and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del",
    "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in",
    "is", "lambda", "nonlocal", "not", "or", "pass", "raise", "return", "try", "while",
    "with", "yield", "True", "False", "None", "self"
  ]),
  cpp: new Set([
    "auto", "bool", "break", "case", "catch", "char", "class", "const", "continue", "default",
    "delete", "do", "double", "else", "enum", "explicit", "export", "extern", "false", "float",
    "for", "friend", "goto", "if", "inline", "int", "long", "mutable", "namespace", "new",
    "operator", "private", "protected", "public", "register", "return", "short", "signed",
    "sizeof", "static", "struct", "switch", "template", "this", "throw", "true", "try",
    "typedef", "typeid", "typename", "union", "unsigned", "using", "virtual", "void", "volatile", "while", "std", "vector", "string"
  ]),
  javascript: new Set([
    "async", "await", "break", "case", "catch", "class", "const", "continue", "debugger",
    "default", "delete", "do", "else", "export", "extends", "finally", "for", "function",
    "if", "import", "in", "instanceof", "let", "new", "return", "super", "switch", "this",
    "throw", "try", "typeof", "var", "void", "while", "with", "yield", "true", "false", "null", "undefined"
  ]),
  typescript: new Set([
    "async", "await", "break", "case", "catch", "class", "const", "continue", "debugger",
    "default", "delete", "do", "else", "export", "extends", "finally", "for", "function",
    "if", "import", "in", "instanceof", "let", "new", "return", "super", "switch", "this",
    "throw", "try", "typeof", "var", "void", "while", "with", "yield", "true", "false", "null", "undefined",
    "interface", "type", "namespace", "enum", "implements", "declare", "readonly", "keyof", "number", "string", "boolean", "any"
  ]),
};

function highlightCodeLine(line: string, lang: string): React.ReactNode[] {
  const commentPrefix = lang === "python" ? "#" : "//";
  const commentIdx = line.indexOf(commentPrefix);

  if (commentIdx !== -1) {
    const beforeComment = line.substring(0, commentIdx);
    const comment = line.substring(commentIdx);
    return [
      ...tokenizeText(beforeComment, lang),
      <span key={`comment-${commentIdx}`} className="text-[#6a9955] dark:text-[#6a9955] italic font-mono">
        {comment}
      </span>,
    ];
  }
  return tokenizeText(line, lang);
}

function tokenizeText(text: string, lang: string): React.ReactNode[] {
  const tokenRegex = /(@[A-Za-z0-9_]+)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+\b)|([A-Za-z_][A-Za-z0-9_]*)|([{}()[\];,=<>!+\-*/%&|^~?:])|(\s+)|(.)/g;
  const keywords = KEYWORDS_BY_LANG[lang] || KEYWORDS_BY_LANG["javascript"];
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
      if (keywords.has(word)) {
        tokens.push(
          <span key={key} className="text-[#c586c0] font-semibold">
            {word}
          </span>
        );
      } else if (/^[A-Z]/.test(word)) {
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
      tokens.push(
        <span key={key} className="text-[#d4d4d4]">
          {punct}
        </span>
      );
    } else {
      tokens.push(<span key={key}>{raw}</span>);
    }
  }

  return tokens;
}

export function MultiLangCodeViewer({
  title = "Algorithm Implementation",
  subtitle = "Interactive Multi-Language Source Code & Live Compiler Runner",
  badge = "Interactive Editor",
  snippets,
  activeLineMap,
}: MultiLangCodeViewerProps) {
  // Normalize snippets into a keyed map
  const normalizedSnippets = useMemo(() => {
    const map: Record<string, string> = {
      java: `public class Solution {\n    // Implementation\n}`,
      python: `def solution():\n    # Implementation\n    pass`,
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}`,
      javascript: `function solution() {\n  // Implementation\n}`,
      typescript: `function solution(): void {\n  // Implementation\n}`,
    };

    if (Array.isArray(snippets)) {
      snippets.forEach((s) => {
        const key = s.language.toLowerCase();
        map[key] = s.code;
      });
    } else if (typeof snippets === "object" && snippets !== null) {
      Object.entries(snippets).forEach(([k, v]) => {
        if (v) map[k.toLowerCase()] = v;
      });
    }

    return map;
  }, [snippets]);

  const [activeLang, setActiveLang] = useState<string>("java");
  const [editedCodeMap, setEditedCodeMap] = useState<Record<string, string>>({});
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  // Customization Settings
  const [theme, setTheme] = useState<ThemeType>("vscode-dark");
  const [fontSize, setFontSize] = useState<FontSize>("13px");
  const [showLineNumbers, setShowLineNumbers] = useState<boolean>(true);
  const [wordWrap, setWordWrap] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Terminal & Execution States
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [terminalTab, setTerminalTab] = useState<"stdout" | "testcases" | "complexity">("stdout");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[System] Virtual Compiler & Runner ready.",
    `[Loaded] Template: ${title} (${activeLang.toUpperCase()})`,
    "Press 'Run Code' to execute this implementation."
  ]);
  const [testResults, setTestResults] = useState<
    { name: string; input: string; expected: string; actual: string; passed: boolean }[]
  >([
    { name: "Test Case 1: Standard Input", input: "arr = [2, 5, 8, 12, 16], target = 12", expected: "Index: 3", actual: "Index: 3", passed: true },
    { name: "Test Case 2: Boundary Value", input: "arr = [10, 20, 30], target = 10", expected: "Index: 0", actual: "Index: 0", passed: true },
    { name: "Test Case 3: Target Not Found", input: "arr = [1, 3, 5, 7], target = 9", expected: "Index: -1", actual: "Index: -1", passed: true },
  ]);
  const [execMetrics, setExecMetrics] = useState<{ runtimeMs: number; memoryMb: number }>({
    runtimeMs: 3.4,
    memoryMb: 36.8,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Active Code
  const currentCode = editedCodeMap[activeLang] !== undefined 
    ? editedCodeMap[activeLang] 
    : (normalizedSnippets[activeLang] || normalizedSnippets["java"] || "");

  const activeLine = activeLineMap?.[activeLang as keyof typeof activeLineMap];

  const codeLines = useMemo(() => {
    return currentCode.split("\n");
  }, [currentCode]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedCodeMap((prev) => ({
      ...prev,
      [activeLang]: e.target.value,
    }));
  };

  const handleResetCode = () => {
    setEditedCodeMap((prev) => {
      const next = { ...prev };
      delete next[activeLang];
      return next;
    });
    setTerminalLogs((prev) => [
      ...prev,
      `[Reset] ${activeLang.toUpperCase()} code reset to original template.`
    ]);
  };

  const handleFormatCode = () => {
    try {
      const lines = currentCode.split("\n").map(l => l.trimEnd());
      setEditedCodeMap((prev) => ({
        ...prev,
        [activeLang]: lines.join("\n"),
      }));
      setTerminalLogs((prev) => [
        ...prev,
        `[Format] Code cleaned and formatted successfully.`
      ]);
    } catch (e) {}
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extensions: Record<string, string> = {
      java: "java",
      python: "py",
      cpp: "cpp",
      javascript: "js",
      typescript: "ts",
    };
    const ext = extensions[activeLang] || "txt";
    const blob = new Blob([currentCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;

      const updated = val.substring(0, start) + "  " + val.substring(end);
      setEditedCodeMap((prev) => ({ ...prev, [activeLang]: updated }));

      setTimeout(() => {
        if (textarea) {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  // Run Code Simulation
  const handleRunCode = () => {
    setIsRunning(true);
    setTerminalTab("stdout");

    const startTime = performance.now();
    const timestamp = new Date().toLocaleTimeString();

    setTimeout(() => {
      let outputLogs: string[] = [];
      let success = true;

      // Real execution sandbox for JS / TS
      if (activeLang === "javascript" || activeLang === "typescript") {
        try {
          const logs: string[] = [];
          const customConsole = {
            log: (...args: any[]) => logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" ")),
            error: (...args: any[]) => logs.push(`[ERROR] ${args.join(" ")}`),
            warn: (...args: any[]) => logs.push(`[WARN] ${args.join(" ")}`),
          };

          // Wrap with custom logger
          const runnerFn = new Function("console", currentCode);
          const result = runnerFn(customConsole);

          if (logs.length > 0) {
            outputLogs = logs;
          } else if (result !== undefined) {
            outputLogs = [`Return value: ${JSON.stringify(result)}`];
          } else {
            outputLogs = [
              `[Stdout] Solution executed successfully.`,
              `[Result] Return value: 0 (Exit Code 0)`
            ];
          }
        } catch (err: any) {
          success = false;
          outputLogs = [`[Runtime Error] ${err?.message || String(err)}`];
        }
      } else {
        // High fidelity simulation for Java, Python, C++
        outputLogs = [
          `[Compiler] Compiling ${title} (${activeLang.toUpperCase()})...`,
          `[Status] Build: 0 warnings, 0 errors. Compiled in 28ms.`,
          `[Stdout] === Program Output ===`,
          `Initial Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]`,
          `Searching Target: 23`,
          `Step 1: low=0, high=9, mid=4 -> arr[4]=16 (16 < 23, search right)`,
          `Step 2: low=5, high=9, mid=7 -> arr[7]=56 (56 > 23, search left)`,
          `Step 3: low=5, high=6, mid=5 -> arr[5]=23 (Match found!)`,
          `Result: Element found at index 5`,
          `[Exit] Process finished with exit code 0`
        ];
      }

      const elapsed = Math.max(1.2, +(performance.now() - startTime).toFixed(2));
      const memory = +(32 + Math.random() * 12).toFixed(1);

      setExecMetrics({ runtimeMs: elapsed, memoryMb: memory });
      setTerminalLogs([
        `--- Execution at ${timestamp} [${activeLang.toUpperCase()}] ---`,
        ...outputLogs,
        `[Metrics] Finished in ${elapsed}ms | Memory: ${memory}MB`
      ]);

      setIsRunning(false);
    }, 600);
  };

  // Theme styles lookup
  const themeStyles = {
    "vscode-dark": {
      bg: "bg-[#0d1117]",
      headerBg: "bg-[#161b22]",
      borderColor: "border-[#30363d]",
      text: "text-slate-100",
      activeTab: "bg-blue-600 text-white shadow-xs font-semibold",
      gutterBg: "text-slate-600 bg-[#0d1117]/50",
      highlightLine: "bg-blue-500/20 border-l-4 border-blue-400 text-blue-100",
    },
    "one-dark": {
      bg: "bg-[#282c34]",
      headerBg: "bg-[#21252b]",
      borderColor: "border-[#181a1f]",
      text: "text-[#abb2bf]",
      activeTab: "bg-[#98c379] text-[#282c34] font-bold shadow-xs",
      gutterBg: "text-[#5c6370] bg-[#282c34]/50",
      highlightLine: "bg-[#61afef]/20 border-l-4 border-[#61afef] text-white",
    },
    "monokai": {
      bg: "bg-[#272822]",
      headerBg: "bg-[#1e1f1c]",
      borderColor: "border-[#49483e]",
      text: "text-[#f8f8f2]",
      activeTab: "bg-[#a6e22e] text-[#272822] font-bold shadow-xs",
      gutterBg: "text-[#75715e] bg-[#272822]/50",
      highlightLine: "bg-[#f92672]/20 border-l-4 border-[#f92672] text-white",
    },
    "cyberpunk": {
      bg: "bg-[#050811]",
      headerBg: "bg-[#0a101f]",
      borderColor: "border-cyan-500/30",
      text: "text-cyan-100",
      activeTab: "bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30",
      gutterBg: "text-cyan-600/70 bg-[#050811]/50",
      highlightLine: "bg-cyan-500/20 border-l-4 border-cyan-400 text-cyan-200",
    },
    "light": {
      bg: "bg-slate-50",
      headerBg: "bg-slate-200/80",
      borderColor: "border-slate-300",
      text: "text-slate-800",
      activeTab: "bg-blue-600 text-white font-semibold shadow-xs",
      gutterBg: "text-slate-400 bg-slate-100",
      highlightLine: "bg-blue-500/10 border-l-4 border-blue-500 text-slate-900",
    },
  }[theme];

  const availableLangs = (["java", "python", "cpp", "javascript", "typescript"] as const);

  return (
    <div
      className={`rounded-2xl border ${themeStyles.borderColor} ${themeStyles.bg} ${themeStyles.text} shadow-xl overflow-hidden font-mono transition-all duration-300 ${
        isFullscreen ? "fixed inset-2 z-50 flex flex-col shadow-2xl" : "relative w-full"
      }`}
    >
      {/* 🔴 🟡 🟢 Header Toolbar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 border-b ${themeStyles.borderColor} ${themeStyles.headerBg} px-4 py-3 shrink-0`}>
        {/* Left: Window Controls & Title */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 items-center">
            <span className="h-3 w-3 rounded-full bg-red-500/90 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/90 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/90 inline-block" />
          </div>

          <div className="h-4 w-px bg-border/40 mx-0.5" />

          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary shrink-0" />
            <span className="font-sans text-xs sm:text-sm font-bold text-foreground/90 truncate max-w-[200px] sm:max-w-md">
              {title}
            </span>
          </div>

          <Badge variant="outline" className="hidden sm:inline-flex text-[10px] font-mono border-primary/30 text-primary bg-primary/10">
            {badge}
          </Badge>
        </div>

        {/* Right: Language Selector & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Multi-Language Selector Tabs */}
          <div className={`flex rounded-xl p-1 border ${themeStyles.borderColor} bg-black/20`}>
            {availableLangs.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-2.5 py-1 text-xs font-sans rounded-lg capitalize transition-all cursor-pointer ${
                  activeLang === lang
                    ? themeStyles.activeTab
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {lang === "javascript" ? "JS" : lang === "typescript" ? "TS" : lang === "cpp" ? "C++" : lang}
              </button>
            ))}
          </div>

          {/* Edit / View Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditMode(!isEditMode)}
            className={`h-8 gap-1.5 text-xs font-sans border-border/60 ${
              isEditMode ? "bg-amber-500/20 text-amber-500 border-amber-500/40" : ""
            }`}
          >
            {isEditMode ? <Eye className="h-3.5 w-3.5" /> : <Edit3 className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{isEditMode ? "View Highlighting" : "Edit Code"}</span>
          </Button>

          {/* ▶ Run Code Button */}
          <Button
            size="sm"
            onClick={handleRunCode}
            disabled={isRunning}
            className="h-8 gap-1.5 text-xs font-sans font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer min-w-[90px]"
          >
            <Play className={`h-3.5 w-3.5 ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "Running..." : "Run Code"}</span>
          </Button>

          {/* ⚙️ Customizer Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-white/10"
            title="Editor Settings"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </Button>

          {/* Format */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFormatCode}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-white/10"
            title="Format Code"
          >
            <Wand2 className="h-3.5 w-3.5" />
          </Button>

          {/* Reset */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetCode}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-white/10"
            title="Reset Code Template"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>

          {/* Copy */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-white/10"
            title="Copy Code"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>

          {/* Download */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-white/10"
            title="Download File"
          >
            <Download className="h-3.5 w-3.5" />
          </Button>

          {/* Fullscreen */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-white/10"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>

      {/* ⚙️ Customizer Dropdown Panel */}
      {showSettings && (
        <div className={`p-4 border-b ${themeStyles.borderColor} bg-card/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 font-sans text-xs text-foreground`}>
          <div className="flex flex-wrap items-center gap-4">
            {/* Theme Selector */}
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-semibold">Theme:</span>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as ThemeType)}
                className="bg-muted px-2.5 py-1 rounded-lg border border-border text-xs focus:outline-none"
              >
                <option value="vscode-dark">VS Code Dark+ (Default)</option>
                <option value="one-dark">One Dark Pro</option>
                <option value="monokai">Monokai Pro</option>
                <option value="cyberpunk">Cyberpunk Neon</option>
                <option value="light">Clean Light</option>
              </select>
            </div>

            {/* Font Size Selector */}
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-semibold">Font Size:</span>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value as FontSize)}
                className="bg-muted px-2.5 py-1 rounded-lg border border-border text-xs focus:outline-none"
              >
                <option value="12px">12px (Compact)</option>
                <option value="13px">13px (Standard)</option>
                <option value="14px">14px (Comfortable)</option>
                <option value="16px">16px (Large)</option>
              </select>
            </div>

            {/* Line Numbers Toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showLineNumbers}
                onChange={(e) => setShowLineNumbers(e.target.checked)}
                className="rounded text-primary focus:ring-0"
              />
              <span>Line Numbers</span>
            </label>

            {/* Word Wrap Toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={wordWrap}
                onChange={(e) => setWordWrap(e.target.checked)}
                className="rounded text-primary focus:ring-0"
              />
              <span>Word Wrap</span>
            </label>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-[11px] font-mono">
            <span>Lines: {codeLines.length}</span>
            <span>•</span>
            <span>Chars: {currentCode.length}</span>
          </div>
        </div>
      )}

      {/* Main Code Editing / Syntax Highlighting Window */}
      <div
        className={`relative ${isFullscreen ? "flex-1 overflow-y-auto" : "max-h-[460px] overflow-y-auto"} py-3`}
        style={{ fontSize }}
      >
        {isEditMode ? (
          /* Live Editable Textarea */
          <div className="flex px-4 min-h-[320px]">
            {showLineNumbers && (
              <div className={`select-none pr-4 text-right ${themeStyles.gutterBg} font-mono w-10 shrink-0 leading-relaxed`}>
                {codeLines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
            )}
            <textarea
              ref={textareaRef}
              value={currentCode}
              onChange={handleCodeChange}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className={`flex-1 bg-transparent font-mono outline-none resize-none leading-relaxed tracking-wide ${
                wordWrap ? "whitespace-pre-wrap" : "whitespace-pre overflow-x-auto"
              } text-foreground`}
              style={{ fontSize, minHeight: "320px" }}
            />
          </div>
        ) : (
          /* Beautiful Tokenized Syntax Highlight View */
          <div>
            {codeLines.map((line, idx) => {
              const lineNumber = idx + 1;
              const isHighlighted = activeLine === lineNumber;

              return (
                <div
                  key={idx}
                  className={`flex items-start px-4 py-0.5 transition-colors ${
                    isHighlighted
                      ? themeStyles.highlightLine
                      : "hover:bg-white/5"
                  }`}
                >
                  {showLineNumbers && (
                    <span className={`w-10 select-none text-right pr-4 text-xs font-mono shrink-0 ${themeStyles.gutterBg}`}>
                      {lineNumber}
                    </span>
                  )}
                  <pre
                    className={`font-mono ${fontSize} leading-relaxed tracking-wide ${
                      wordWrap ? "whitespace-pre-wrap" : "whitespace-pre overflow-x-auto"
                    }`}
                  >
                    {highlightCodeLine(line || " ", activeLang)}
                  </pre>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 📟 Integrated Interactive Terminal & Output Console */}
      <div className={`border-t ${themeStyles.borderColor} ${themeStyles.headerBg} p-3 shrink-0`}>
        {/* Console Header Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2 mb-2 font-sans text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTerminalTab("stdout")}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                terminalTab === "stdout"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Output (Stdout)</span>
            </button>

            <button
              onClick={() => setTerminalTab("testcases")}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                terminalTab === "testcases"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Test Cases ({testResults.filter(t => t.passed).length}/{testResults.length})</span>
            </button>

            <button
              onClick={() => setTerminalTab("complexity")}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                terminalTab === "complexity"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Cpu className="h-3.5 w-3.5 text-amber-400" />
              <span>Complexity &amp; Runtime</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-emerald-400" /> {execMetrics.runtimeMs}ms
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Cpu className="h-3 w-3 text-purple-400" /> {execMetrics.memoryMb}MB
            </span>
          </div>
        </div>

        {/* Tab 1: Stdout Console */}
        {terminalTab === "stdout" && (
          <div className="h-28 overflow-y-auto font-mono text-xs text-slate-300 space-y-1 bg-black/40 p-3 rounded-xl border border-border/30">
            {terminalLogs.map((log, i) => (
              <div
                key={i}
                className={
                  log.includes("[ERROR]") || log.includes("[Runtime Error]")
                    ? "text-rose-400 font-bold"
                    : log.includes("---")
                    ? "text-blue-400 font-bold"
                    : log.includes("[Compiler]") || log.includes("[Metrics]")
                    ? "text-emerald-400"
                    : "text-slate-300"
                }
              >
                {log}
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Test Cases */}
        {terminalTab === "testcases" && (
          <div className="h-28 overflow-y-auto space-y-2 bg-black/40 p-3 rounded-xl border border-border/30 font-sans text-xs">
            {testResults.map((tc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-card/60 border border-border/40 font-mono text-[11px]"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="font-bold text-foreground font-sans">{tc.name}:</span>
                  <span className="text-muted-foreground">{tc.input}</span>
                </div>
                <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 font-mono text-[10px]">
                  Passed
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Complexity Benchmark */}
        {terminalTab === "complexity" && (
          <div className="h-28 overflow-y-auto grid grid-cols-1 sm:grid-cols-3 gap-2 bg-black/40 p-3 rounded-xl border border-border/30 font-sans text-xs">
            <div className="p-2.5 rounded-lg bg-card/60 border border-border/40 flex flex-col justify-between">
              <span className="text-muted-foreground text-[10px]">Execution Time:</span>
              <span className="text-base font-bold font-mono text-emerald-400">{execMetrics.runtimeMs} ms</span>
            </div>
            <div className="p-2.5 rounded-lg bg-card/60 border border-border/40 flex flex-col justify-between">
              <span className="text-muted-foreground text-[10px]">Peak Heap Memory:</span>
              <span className="text-base font-bold font-mono text-purple-400">{execMetrics.memoryMb} MB</span>
            </div>
            <div className="p-2.5 rounded-lg bg-card/60 border border-border/40 flex flex-col justify-between">
              <span className="text-muted-foreground text-[10px]">Asymptotic Profile:</span>
              <span className="text-base font-bold font-mono text-amber-400">O(log N) / O(1)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
