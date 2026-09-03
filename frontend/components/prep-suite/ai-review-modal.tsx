"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Award,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Zap,
  TrendingUp,
  Copy,
  Check
} from "lucide-react";
import { CodeReviewResult, StarEvaluationResult } from "@/lib/ai-evaluation-engine";

interface AiReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewType: "code" | "star";
  codeReview?: CodeReviewResult;
  starReview?: StarEvaluationResult;
}

export function AiReviewModal({
  isOpen,
  onClose,
  reviewType,
  codeReview,
  starReview,
}: AiReviewModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "solid" | "improvements">("overview");

  if (!isOpen) return null;

  const score = reviewType === "code" ? codeReview?.score || 85 : starReview?.score || 88;
  const grade = reviewType === "code" ? codeReview?.grade || "A" : score >= 90 ? "A+" : score >= 80 ? "A" : "B";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-card border-border/80 rounded-2xl p-6 space-y-4 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold font-heading text-foreground">
                  {reviewType === "code" ? "AI Machine Coding Code Review" : "AI Behavioral STAR Evaluation"}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Automated calibration against interview hiring bar and engineering standards.
                </DialogDescription>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Score</span>
                <span className="text-xl font-black font-mono text-primary">{score}/100</span>
              </div>
              <Badge className="bg-primary text-primary-foreground font-mono font-bold text-sm px-2.5 py-1">
                {grade}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        {/* Subtabs for Code Review */}
        {reviewType === "code" && (
          <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border text-xs">
            <Button
              size="sm"
              variant={activeTab === "overview" ? "default" : "ghost"}
              onClick={() => setActiveTab("overview")}
              className="h-7 text-xs font-semibold rounded-lg"
            >
              Overview &amp; Strengths
            </Button>
            <Button
              size="sm"
              variant={activeTab === "solid" ? "default" : "ghost"}
              onClick={() => setActiveTab("solid")}
              className="h-7 text-xs font-semibold rounded-lg"
            >
              SOLID Audit
            </Button>
            <Button
              size="sm"
              variant={activeTab === "improvements" ? "default" : "ghost"}
              onClick={() => setActiveTab("improvements")}
              className="h-7 text-xs font-semibold rounded-lg"
            >
              Actionable Fixes
            </Button>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 1: CODE REVIEW                       */}
        {/* ========================================== */}
        {reviewType === "code" && codeReview && (
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {activeTab === "overview" && (
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-xl border border-border text-xs leading-relaxed text-foreground">
                  {codeReview.summary}
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-emerald-500 block">
                    Detected Engineering Strengths
                  </span>
                  <div className="space-y-1.5">
                    {codeReview.strengths.map((str, idx) => (
                      <div key={idx} className="p-2.5 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-xs text-foreground flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "solid" && (
              <div className="space-y-2.5">
                {codeReview.solidAudit.map((solid, idx) => (
                  <div key={idx} className="p-3 bg-muted/20 rounded-xl border border-border space-y-1.5 text-xs">
                    <div className="flex items-center justify-between font-mono">
                      <span className="font-bold text-foreground">{solid.principle}</span>
                      <Badge
                        variant={solid.status === "Pass" ? "default" : solid.status === "Warning" ? "secondary" : "destructive"}
                        className="text-[10px]"
                      >
                        {solid.score}% • {solid.status}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {solid.feedback}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "improvements" && (
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-amber-500 block">
                  Recommended Refactors for Onsite Loop
                </span>
                <div className="space-y-2">
                  {codeReview.improvements.map((imp, idx) => (
                    <div key={idx} className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-foreground flex items-start gap-2.5">
                      <Zap className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{imp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 2: STAR BEHAVIORAL REVIEW             */}
        {/* ========================================== */}
        {reviewType === "star" && starReview && (
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            <div className="p-4 bg-muted/20 rounded-xl border border-border text-xs leading-relaxed text-foreground">
              {starReview.feedbackSummary}
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl border border-border bg-card text-center">
                <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Ownership Index</span>
                <span className="text-lg font-black font-mono text-primary mt-1 block">{starReview.ownershipRatio}%</span>
                <span className="text-[9px] text-muted-foreground font-mono">"I" vs "We" ratio</span>
              </div>
              <div className="p-3 rounded-xl border border-border bg-card text-center">
                <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Action Density</span>
                <span className="text-lg font-black font-mono text-emerald-500 mt-1 block">{starReview.actionDensity}%</span>
                <span className="text-[9px] text-muted-foreground font-mono">Target: ~60%</span>
              </div>
              <div className="p-3 rounded-xl border border-border bg-card text-center">
                <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Quantified Metrics</span>
                <span className="text-lg font-black font-mono text-purple-400 mt-1 block">{starReview.quantifiableMetricsCount}</span>
                <span className="text-[9px] text-muted-foreground font-mono">numbers / % found</span>
              </div>
            </div>

            {/* Rubric Details */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-primary block">Rubric Evaluation</span>
              {starReview.rubricScores.map((rubric, idx) => (
                <div key={idx} className="p-3 bg-muted/20 rounded-xl border border-border text-xs space-y-1">
                  <div className="flex items-center justify-between font-mono font-bold text-foreground">
                    <span>{rubric.category}</span>
                    <span className="text-primary">{rubric.score}%</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{rubric.feedback}</p>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-amber-500 block">Coaching Suggestions</span>
              {starReview.suggestedActionImprovements.map((sug, idx) => (
                <div key={idx} className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-foreground flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{sug}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-border/60">
          <Button size="sm" onClick={onClose} className="h-8 text-xs font-mono font-bold">
            Close Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
