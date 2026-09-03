"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Code2, Copy, Check } from "lucide-react";

interface CodeViewerProps {
  code: string;
  language: string;
  activeLine?: number | null; // 1-indexed
  onCodeChange?: (newCode: string) => void;
  readOnly?: boolean;
}

export function CodeViewer({
  code,
  language,
  activeLine = null,
  onCodeChange,
  readOnly = true
}: CodeViewerProps) {
  const [copied, setCopied] = React.useState(false);
  const lines = code.split("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-border/80 bg-slate-950 text-slate-100 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-blue-400" />
          <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
            {language} Recursive Function
          </span>
          <Badge variant="outline" className="text-[10px] font-mono border-blue-500/30 text-blue-400 bg-blue-500/10">
            AST Monitored
          </Badge>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Copy Code"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Editor / Viewer Body */}
      <div className="flex-1 overflow-auto p-3 font-mono text-xs leading-relaxed select-text">
        {readOnly ? (
          <div className="space-y-0.5">
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isHighlight = activeLine === lineNum;

              return (
                <div
                  key={lineNum}
                  className={`flex items-start px-2 py-0.5 rounded-md transition-colors ${
                    isHighlight
                      ? "bg-amber-500/25 text-amber-200 font-bold border-l-2 border-amber-400"
                      : "hover:bg-slate-900/60 text-slate-300"
                  }`}
                >
                  <span className="w-8 shrink-0 text-slate-600 select-none text-[11px] text-right pr-3">
                    {lineNum}
                  </span>
                  <span className="whitespace-pre flex-1">{line || " "}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <textarea
            value={code}
            onChange={(e) => onCodeChange && onCodeChange(e.target.value)}
            rows={12}
            className="w-full h-full bg-transparent font-mono text-xs text-slate-200 outline-none resize-none"
            spellCheck={false}
          />
        )}
      </div>
    </div>
  );
}
