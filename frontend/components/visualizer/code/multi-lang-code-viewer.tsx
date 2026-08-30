"use client";

import React, { useState, useMemo } from "react";
import { Copy, Check, Code2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface MultiLangCodeSnippets {
  java: string;
  python: string;
  javascript: string;
  typescript: string;
}

export interface MultiLangCodeViewerProps {
  title?: string;
  snippets: MultiLangCodeSnippets;
  activeLineMap?: {
    java?: number;
    python?: number;
    javascript?: number;
    typescript?: number;
  };
  currentStepIndex?: number;
}

export function MultiLangCodeViewer({
  title = "Algorithm Implementation",
  snippets,
  activeLineMap,
}: MultiLangCodeViewerProps) {
  const [copied, setCopied] = useState(false);
  const [activeLang, setActiveLang] = useState<keyof MultiLangCodeSnippets>("java");

  const currentCode = snippets[activeLang] || "";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extensions: Record<keyof MultiLangCodeSnippets, string> = {
      java: "java",
      python: "py",
      javascript: "js",
      typescript: "ts",
    };
    const blob = new Blob([currentCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `solution.${extensions[activeLang]}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const activeLine = activeLineMap?.[activeLang];

  const codeLines = useMemo(() => {
    return currentCode.split("\n");
  }, [currentCode]);

  return (
    <div className="rounded-xl border border-border/60 bg-[#0d1117] text-slate-100 shadow-xl overflow-hidden font-mono text-sm">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 bg-[#161b22] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="h-4 w-px bg-border/60 mx-1" />
          <Code2 className="h-4 w-4 text-blue-400" />
          <span className="font-sans text-xs font-medium text-slate-300">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language selector tabs */}
          <div className="flex rounded-lg bg-[#0d1117] p-1 border border-border/40">
            {(["java", "python", "javascript", "typescript"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-2.5 py-1 text-xs font-sans rounded-md capitalize transition-all ${
                  activeLang === lang
                    ? "bg-blue-600 font-semibold text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                {lang === "javascript" ? "JS" : lang === "typescript" ? "TS" : lang}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="h-8 text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="max-h-[480px] overflow-y-auto py-3">
        {codeLines.map((line, idx) => {
          const lineNumber = idx + 1;
          const isHighlighted = activeLine === lineNumber;

          return (
            <div
              key={idx}
              className={`flex items-start px-4 py-0.5 transition-colors ${
                isHighlighted
                  ? "bg-blue-500/20 border-l-4 border-blue-400 text-blue-100 font-bold"
                  : "hover:bg-slate-800/40 text-slate-300"
              }`}
            >
              <span className="w-10 select-none text-right pr-4 text-xs text-slate-600 font-mono">
                {lineNumber}
              </span>
              <pre className="font-mono text-xs whitespace-pre leading-relaxed tracking-wide">
                {line || " "}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
}
