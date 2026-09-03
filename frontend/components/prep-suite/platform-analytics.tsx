"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  BrainCircuit,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Award,
  Sparkles,
  Layers,
  ArrowRight,
  Activity,
  AlertCircle,
  HelpCircle,
  Clock,
  Eye,
  Info
} from "lucide-react";

interface PatternCard {
  id: string;
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  trigger: string;
  coreInvariant: string;
  classicProblems: string[];
  intervalDays: number;
}

const SRS_DECK: PatternCard[] = [
  {
    id: "sliding-window",
    name: "Sliding Window Pattern",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k) or O(1)",
    trigger: "Contiguous subarray/substring problems looking for min/max/exact length satisfying a condition.",
    coreInvariant: "Expand right pointer to satisfy constraint. Contract left pointer to optimize or restore valid window.",
    classicProblems: ["Longest Substring Without Repeating Characters", "Minimum Window Substring", "Max Consecutive Ones III"],
    intervalDays: 7
  },
  {
    id: "two-pointers",
    name: "Two Pointers (Opposite Ends)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    trigger: "Sorted array search for pairs, triplets, or partitioning elements without extra auxiliary memory.",
    coreInvariant: "Left pointer moves right to increase sum; right pointer moves left to decrease sum.",
    classicProblems: ["Two Sum II (Sorted)", "3Sum", "Container With Most Water"],
    intervalDays: 14
  },
  {
    id: "fast-slow",
    name: "Fast & Slow Pointers (Floyd's Cycle)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    trigger: "Linked list or cyclic array traversal detecting loops, finding cycle start, or finding list midpoint.",
    coreInvariant: "Fast moves 2x speed of Slow. Meeting inside loop guarantees cycle. Reset one pointer to head to find loop start.",
    classicProblems: ["Linked List Cycle", "Find the Duplicate Number", "Middle of the Linked List"],
    intervalDays: 4
  },
  {
    id: "monotonic-stack",
    name: "Monotonic Stack",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    trigger: "Next Greater Element, Previous Smaller Element, or histogram boundary span queries in linear time.",
    coreInvariant: "Stack maintains strictly increasing or decreasing elements. Pop elements that violate monotonicity.",
    classicProblems: ["Next Greater Element I", "Daily Temperatures", "Largest Rectangle in Histogram"],
    intervalDays: 2
  },
  {
    id: "top-k-heap",
    name: "Top-K Elements (Min/Max Heap)",
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    trigger: "Finding the Kth largest or smallest element in an unsorted stream or collection.",
    coreInvariant: "Keep a Min-Heap of size K. If stream element is larger than heap top, pop top and insert new element.",
    classicProblems: ["Kth Largest Element in an Array", "Top K Frequent Elements", "Find Median from Data Stream"],
    intervalDays: 10
  }
];

export function PlatformAnalytics() {
  const [activeTab, setActiveTab] = useState<"radar" | "srs">("radar");
  const [cardIdx, setCardIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [deck, setDeck] = useState<PatternCard[]>(SRS_DECK);

  // Skill Mastery Scores across 10 phases (0 to 100)
  const skillsData = [
    { name: "Phase 1: Complexity & Math", score: 92, status: "Mastered", color: "bg-emerald-500" },
    { name: "Phase 2: Core Data Structures", score: 88, status: "Strong", color: "bg-blue-500" },
    { name: "Phase 3: Algorithms & Backtracking", score: 85, status: "Strong", color: "bg-cyan-500" },
    { name: "Phase 4: Advanced Non-Linear", score: 74, status: "Proficient", color: "bg-amber-500" },
    { name: "Phase 6: CS Fundamentals & Concurrency", score: 78, status: "Proficient", color: "bg-amber-500" },
    { name: "Phase 7: High-Level System Design (HLD)", score: 90, status: "Mastered", color: "bg-emerald-500" },
    { name: "Phase 8: Computer Networks", score: 82, status: "Strong", color: "bg-blue-500" },
    { name: "Phase 9: Advanced Hard Algos", score: 65, status: "Needs Practice", color: "bg-rose-500" },
    { name: "Phase 10: Deep-Dive Operating Systems", score: 80, status: "Strong", color: "bg-blue-500" },
    { name: "LLD: Machine Coding & Design Patterns", score: 86, status: "Strong", color: "bg-cyan-500" }
  ];

  const currentCard = deck[cardIdx];

  const handleRateCard = (daysDelta: number) => {
    setIsFlipped(false);
    setCardIdx((prev) => (prev + 1) % deck.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 font-mono font-bold">
            Analytics &amp; SRS
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Proficiency Radar &amp; Spaced Repetition (SRS)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeTab === "radar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("radar")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <BarChart3 className="h-3.5 w-3.5 mr-1" />
            10-Phase Readiness Radar
          </Button>
          <Button
            variant={activeTab === "srs" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("srs")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <BrainCircuit className="h-3.5 w-3.5 mr-1" />
            Spaced Repetition Flashcards
          </Button>
        </div>
      </div>

      {/* ========================================== */}
      {/* TAB 1: 10-PHASE READINESS RADAR            */}
      {/* ========================================== */}
      {activeTab === "radar" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Summary Stat Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-5 bg-card border-border/80 rounded-2xl shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Overall Interview Readiness</span>
                <span className="text-3xl font-black font-heading text-emerald-500 mt-1 block">82.8%</span>
                <span className="text-[11px] text-muted-foreground mt-0.5 block">Top 5% of candidate pool</span>
              </div>
              <Award className="h-10 w-10 text-emerald-500/40" />
            </Card>

            <Card className="p-5 bg-card border-border/80 rounded-2xl shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Strongest Superpower</span>
                <span className="text-lg font-bold font-heading text-foreground mt-1 block">High-Level System Design</span>
                <span className="text-[11px] text-emerald-400 font-mono mt-0.5 block">92% score • Consistent Hashing &amp; Raft</span>
              </div>
              <Sparkles className="h-10 w-10 text-primary/40" />
            </Card>

            <Card className="p-5 bg-card border-border/80 rounded-2xl shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Recommended Focus</span>
                <span className="text-lg font-bold font-heading text-rose-400 mt-1 block">Advanced Hard-Tier Algos</span>
                <span className="text-[11px] text-muted-foreground mt-0.5 block">65% score • KMP &amp; Line Sweep</span>
              </div>
              <TrendingUp className="h-10 w-10 text-rose-500/40" />
            </Card>
          </div>

          {/* 10-Phase Progress Bars Grid */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h3 className="text-base font-bold font-heading text-foreground">
                  Competency Breakdown Across All 10 Curriculum Phases
                </h3>
                <Badge variant="outline" className="text-xs font-mono">10 Domains Evaluated</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillsData.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-foreground">{item.name}</span>
                      <span className="font-black text-primary">{item.score}%</span>
                    </div>

                    {/* Progress Track */}
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        style={{ width: `${item.score}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                      <span>Status: {item.status}</span>
                      <span>Target: &gt;80%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 2: SPACED REPETITION FLASHCARDS (SRS)  */}
      {/* ========================================== */}
      {activeTab === "srs" && (
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <span className="text-xs font-mono text-muted-foreground uppercase font-bold block">
                  Algorithmic Patterns Deck
                </span>
                <span className="text-sm font-bold text-foreground font-mono">
                  Card {cardIdx + 1} of {deck.length}
                </span>
              </div>
              <Badge variant="outline" className="text-xs font-mono">
                Review Interval: {currentCard.intervalDays} Days
              </Badge>
            </div>

            {/* Interactive Flashcard */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`p-8 rounded-2xl border-2 cursor-pointer transition-all min-h-[260px] flex flex-col justify-between text-center select-none ${
                isFlipped
                  ? "bg-purple-500/15 border-purple-500 shadow-lg"
                  : "bg-muted/30 border-border hover:border-primary/50"
              }`}
            >
              {!isFlipped ? (
                // FRONT
                <div className="space-y-4 my-auto">
                  <Badge variant="outline" className="text-xs font-mono mx-auto">
                    CLICK TO FLIP CARD
                  </Badge>
                  <h3 className="text-2xl font-black font-heading text-foreground">
                    {currentCard.name}
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                    <strong>When do you reach for this pattern?</strong><br />
                    {currentCard.trigger}
                  </p>
                </div>
              ) : (
                // BACK
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold font-heading text-purple-400">
                      Core Invariant &amp; Mechanics
                    </span>
                    <Badge variant="secondary" className="text-[10px] font-mono">
                      Time: {currentCard.timeComplexity} • Space: {currentCard.spaceComplexity}
                    </Badge>
                  </div>

                  <p className="text-xs text-foreground leading-relaxed">
                    {currentCard.coreInvariant}
                  </p>

                  <div className="pt-2 border-t border-border/60">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">
                      Canonical LeetCode Problems:
                    </span>
                    <ul className="mt-1 space-y-1">
                      {currentCard.classicProblems.map((prob, pIdx) => (
                        <li key={pIdx} className="text-xs text-muted-foreground font-mono">
                          • {prob}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* SRS Confidence Buttons */}
            {isFlipped && (
              <div className="space-y-2 pt-2 animate-in fade-in duration-200">
                <span className="text-center block text-[11px] font-mono text-muted-foreground">
                  How well did you recall this pattern? (Schedules next review)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleRateCard(1)}
                    className="border-rose-500/40 text-rose-400 hover:bg-rose-500/15 h-9 text-xs font-mono font-bold"
                  >
                    Again (1d)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleRateCard(3)}
                    className="border-amber-500/40 text-amber-400 hover:bg-amber-500/15 h-9 text-xs font-mono font-bold"
                  >
                    Hard (3d)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleRateCard(7)}
                    className="border-blue-500/40 text-blue-400 hover:bg-blue-500/15 h-9 text-xs font-mono font-bold"
                  >
                    Good (7d)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleRateCard(14)}
                    className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/15 h-9 text-xs font-mono font-bold"
                  >
                    Easy (14d)
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
