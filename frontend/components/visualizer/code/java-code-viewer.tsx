"use client";

import React, { useState, useMemo } from "react";
import { Copy, Check, Terminal, FileCode2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface JavaCodeViewerProps {
  code: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  fileName?: string;
  maxHeight?: string;
  showLineNumbers?: boolean;
}

// Java Tokenizer for IDE-grade Syntax Highlighting matching Reference 2
function highlightJavaLine(line: string): React.ReactNode[] {
  // Check for line comments
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
  // Regex to capture:
  // 1: Annotations (@[A-Za-z0-9_]+)
  // 2: String literals ("[^"]*")
  // 3: Numbers (\b\d+\b)
  // 4: Words ([A-Za-z_][A-Za-z0-9_]*)
  // 5: Special characters & operators ( [{}();,=<>!+\-*/%&|^~] )
  // 6: Whitespace (\s+)
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
    "SimpleGrantedAuthority"
  ]);

  const tokens: React.ReactNode[] = [];
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    const [raw, annotation, strLit, numLit, word, punct, space, other] = match;
    const key = `tok-${idx++}`;

    if (space) {
      tokens.push(<span key={key}>{space}</span>);
    } else if (annotation) {
      // Annotations like @JsonIgnore, @Column, @Enumerated in Sky Blue / Cyan
      tokens.push(
        <span key={key} className="text-[#38bdf8] font-semibold">
          {annotation}
        </span>
      );
    } else if (strLit) {
      // String literals in soft amber/orange
      tokens.push(
        <span key={key} className="text-[#fb923c]">
          {strLit}
        </span>
      );
    } else if (numLit) {
      // Numbers in bright yellow/gold
      tokens.push(
        <span key={key} className="text-[#fde047]">
          {numLit}
        </span>
      );
    } else if (word) {
      if (KEYWORDS.has(word)) {
        // Keywords (private, public, static, void, int, boolean, for, if, return, class) -> Bold Sky Blue
        tokens.push(
          <span key={key} className="text-[#38bdf8] font-bold">
            {word}
          </span>
        );
      } else if (BUILTIN_TYPES.has(word) || /^[A-Z][A-Za-z0-9_]*$/.test(word)) {
        // Types & Classes (String, Integer, Role, SelectionSort, BubbleSort) -> Bold Mint Cyan / Teal
        tokens.push(
          <span key={key} className="text-[#2dd4bf] font-bold">
            {word}
          </span>
        );
      } else {
        // Identifiers & variable names (password, fullName, minIdx, arr, temp) -> Off-white
        tokens.push(
          <span key={key} className="text-[#f8fafc] font-medium">
            {word}
          </span>
        );
      }
    } else if (punct) {
      if (punct === "(" || punct === ")" || punct === "{" || punct === "}") {
        // Brackets in pink/magenta
        tokens.push(
          <span key={key} className="text-[#f472b6] font-bold">
            {punct}
          </span>
        );
      } else if (punct === "=" || punct === "==" || punct === "!=" || punct === "<" || punct === ">") {
        // Comparison/Assignment in gold/cyan
        tokens.push(
          <span key={key} className="text-[#38bdf8] font-bold">
            {punct}
          </span>
        );
      } else {
        // Semicolons, commas, dots in slate
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
}: JavaCodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const lines = useMemo(() => {
    return code.trim().split("\n");
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div className="h-full rounded-2xl border border-slate-800 bg-[#0b0f19] shadow-2xl overflow-hidden flex flex-col">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0f172a] border-b border-slate-800/80 gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block border border-rose-600/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block border border-amber-600/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/50" />
          </div>

          <div className="h-3.5 w-px bg-slate-700/60 mx-0.5 shrink-0" />

          {fileName ? (
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-200 font-bold min-w-0">
              <FileCode2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
              <span className="truncate">{fileName}</span>
            </div>
          ) : title ? (
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-200 font-bold min-w-0">
              <Terminal className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
              <span className="truncate">{title}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-200 font-bold min-w-0">
              <FileCode2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
              <span className="truncate">Solution.java</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {badge && (
            <Badge
              variant="outline"
              className="font-mono text-[10px] font-bold bg-[#38bdf8]/10 text-[#38bdf8] border-[#38bdf8]/30 px-2 py-0.5 whitespace-nowrap shrink-0 leading-tight"
            >
              {badge}
            </Badge>
          )}

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

      {subtitle && (
        <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/60 text-xs font-mono font-bold text-slate-300 shrink-0">
          {subtitle}
        </div>
      )}

      {/* Code Body with Highlighting & Line Numbers */}
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
    </div>
  );
}
