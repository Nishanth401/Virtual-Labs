"use client";

import React, { useState } from "react";
import { ManualExperimentItem } from "@/data/lab-manuals-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Code2,
  Terminal,
  HelpCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  Sparkles,
  FileCode2,
  Layers
} from "lucide-react";

interface LabManualExperimentsBrowserProps {
  experiments: ManualExperimentItem[];
  courseCode: string;
  courseTitle: string;
}

export function LabManualExperimentsBrowser({
  experiments,
  courseCode,
  courseTitle,
}: LabManualExperimentsBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedExps, setExpandedExps] = useState<Record<number, boolean>>({ 1: true });
  const [copiedExp, setCopiedExp] = useState<number | null>(null);
  const [revealedViva, setRevealedViva] = useState<Record<string, boolean>>({});

  const filteredExperiments = experiments.filter((exp) => {
    const q = searchQuery.toLowerCase();
    return (
      exp.title.toLowerCase().includes(q) ||
      exp.aim.toLowerCase().includes(q) ||
      exp.expNo.toString().includes(q) ||
      (exp.vivaQuestions && exp.vivaQuestions.some(v => v.question.toLowerCase().includes(q)))
    );
  });

  const toggleExpand = (expNo: number) => {
    setExpandedExps((prev) => ({
      ...prev,
      [expNo]: !prev[expNo],
    }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    experiments.forEach((e) => (all[e.expNo] = true));
    setExpandedExps(all);
  };

  const collapseAll = () => {
    setExpandedExps({});
  };

  const handleCopyCode = async (expNo: number, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedExp(expNo);
      setTimeout(() => setCopiedExp(null), 2000);
    } catch (e) {
      console.error("Failed to copy code", e);
    }
  };

  const toggleViva = (key: string) => {
    setRevealedViva((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!experiments || experiments.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 pt-4">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-sky-500/10 via-indigo-500/5 to-cyan-500/10 border border-[#0284c7]/30 rounded-none space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#0284c7] dark:text-[#38bdf8]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284c7] dark:text-[#38bdf8]">
              Official Lab Manual Curriculum
            </span>
          </div>
          <Badge className="bg-[#0284c7] text-white rounded-none font-mono text-xs">
            {experiments.length} Experiments Verified
          </Badge>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-foreground">
          Laboratory Manual Experiments &amp; Practice Records
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-medium">
          Structured Anna University &amp; Autonomous curriculum laboratory record containing experiment aims, step-by-step algorithms, executable source code, test inputs/outputs, and viva-voce questionnaires.
        </p>

        {/* Search and Action Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search experiment or viva topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs rounded-none border-border bg-background"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={expandAll}
              className="text-xs rounded-none h-8 px-2.5"
            >
              Expand All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={collapseAll}
              className="text-xs rounded-none h-8 px-2.5"
            >
              Collapse All
            </Button>
          </div>
        </div>
      </div>

      {/* Experiments Accordion List */}
      <div className="space-y-4">
        {filteredExperiments.map((exp) => {
          const isExpanded = !!expandedExps[exp.expNo];
          const isCopied = copiedExp === exp.expNo;

          return (
            <Card
              key={exp.expNo}
              className={`border-border rounded-none transition-all ${
                isExpanded ? "shadow-sm border-[#0284c7]/40 ring-1 ring-[#0284c7]/20" : "hover:border-border/80"
              }`}
            >
              {/* Card Header (Clickable) */}
              <div
                onClick={() => toggleExpand(exp.expNo)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-muted/20 select-none transition-colors border-b border-border/40"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-none bg-sky-500/10 border border-[#0284c7]/30 text-[#0284c7] dark:text-[#38bdf8] font-mono font-bold text-xs sm:text-sm shrink-0">
                    {exp.expNo < 10 ? `0${exp.expNo}` : exp.expNo}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] font-semibold text-[#0284c7] dark:text-[#38bdf8] uppercase">
                        Experiment #{exp.expNo}
                      </span>
                      {exp.vivaQuestions && exp.vivaQuestions.length > 0 && (
                        <Badge variant="outline" className="text-[10px] py-0 h-4 border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/5">
                          {exp.vivaQuestions.length} Viva Questions
                        </Badge>
                      )}
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-foreground mt-0.5 leading-snug">
                      {exp.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-none text-muted-foreground"
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Card Body */}
              {isExpanded && (
                <CardContent className="p-4 sm:p-6 space-y-6 bg-card/50">
                  {/* Aim */}
                  <div className="p-3.5 bg-muted/40 border-l-2 border-[#0284c7] rounded-none space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#0284c7] dark:text-[#38bdf8] block">
                      Aim of the Experiment
                    </span>
                    <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                      {exp.aim}
                    </p>
                  </div>

                  {/* Algorithm */}
                  {exp.algorithm && exp.algorithm.length > 0 && (
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-[#ea580c]" />
                        <h5 className="text-xs sm:text-sm font-bold font-mono uppercase tracking-wider text-foreground">
                          Step-by-Step Algorithm &amp; Execution Procedure
                        </h5>
                      </div>
                      <div className="p-4 bg-muted/20 border border-border/60 rounded-none">
                        <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-foreground/90 font-sans">
                          {exp.algorithm.map((step, idx) => (
                            <li key={idx} className="leading-relaxed pl-1">
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}

                  {/* Source Code */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <h5 className="text-xs sm:text-sm font-bold font-mono uppercase tracking-wider text-foreground">
                          Verified Implementation Code
                        </h5>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyCode(exp.expNo, exp.code)}
                        className="h-7 text-xs rounded-none gap-1.5 border-border"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                            <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="relative border border-border bg-[#090d16] text-slate-100 rounded-none overflow-hidden">
                      <div className="px-4 py-1.5 bg-[#111827] border-b border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                        <span>Solution Source ({courseCode})</span>
                        <span>Standard Output Compatible</span>
                      </div>
                      <pre className="p-4 text-xs font-mono overflow-x-auto max-h-[380px] leading-relaxed select-text text-sky-100">
                        <code>{exp.code}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Sample Input / Output */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-[#ea580c]" />
                      <h5 className="text-xs sm:text-sm font-bold font-mono uppercase tracking-wider text-foreground">
                        Standard Input &amp; Terminal Verification Output
                      </h5>
                    </div>
                    <div className="border border-border/80 bg-[#070b12] text-emerald-400 font-mono text-xs p-4 rounded-none overflow-x-auto leading-relaxed whitespace-pre-wrap">
                      {exp.sampleInput && (
                        <div className="mb-2 text-slate-400 pb-2 border-b border-slate-800">
                          <span className="text-slate-300 font-bold block mb-1">Standard Input:</span>
                          {exp.sampleInput}
                        </div>
                      )}
                      <div>
                        <span className="text-slate-400 font-bold block mb-1">Program Output:</span>
                        {exp.sampleOutput}
                      </div>
                    </div>
                  </div>

                  {/* Viva Voce Questions & Answers */}
                  {exp.vivaQuestions && exp.vivaQuestions.length > 0 && (
                    <div className="space-y-3 pt-2 border-t border-border/60">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-amber-500" />
                        <h5 className="text-xs sm:text-sm font-bold font-mono uppercase tracking-wider text-foreground">
                          Official Viva-Voce Questions &amp; Model Answers
                        </h5>
                      </div>
                      <div className="space-y-2.5">
                        {exp.vivaQuestions.map((viva, vIdx) => {
                          const vKey = `${exp.expNo}-${vIdx}`;
                          const isRevealed = !!revealedViva[vKey];

                          return (
                            <div
                              key={vIdx}
                              className="border border-border/70 rounded-none overflow-hidden bg-muted/10"
                            >
                              <div
                                onClick={() => toggleViva(vKey)}
                                className="p-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-muted/30 select-none text-xs sm:text-sm font-medium text-foreground"
                              >
                                <span className="flex items-center gap-2">
                                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold shrink-0">
                                    Q{vIdx + 1}:
                                  </span>
                                  <span>{viva.question}</span>
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-[10px] font-mono text-[#0284c7] shrink-0"
                                >
                                  {isRevealed ? "Hide Answer" : "Show Answer"}
                                </Button>
                              </div>
                              {isRevealed && (
                                <div className="p-3 pt-0 border-t border-border/30 bg-sky-500/5 text-xs text-foreground/90 leading-relaxed font-sans">
                                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold block mb-1">
                                    Model Answer:
                                  </span>
                                  {viva.answer}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
