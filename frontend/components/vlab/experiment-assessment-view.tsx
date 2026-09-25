"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, RefreshCw, Award, CheckSquare, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/data/quizzes";

interface ExperimentAssessmentViewProps {
  type: "pretest" | "posttest";
  quiz?: Quiz;
  experimentTitle: string;
  onComplete?: (score: number, total: number) => void;
}

export function ExperimentAssessmentView({
  type,
  quiz,
  experimentTitle,
  onComplete,
}: ExperimentAssessmentViewProps) {
  // Difficulty checkbox states matching Screenshot 112615 & 112742
  const [selectedDifficulties, setSelectedDifficulties] = useState<{
    beginner: boolean;
    intermediate: boolean;
    advanced: boolean;
  }>({
    beginner: true,
    intermediate: true,
    advanced: true,
  });

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Default fallback questions if experiment quiz questions are fewer
  const defaultQuestions = quiz?.questions || [
    {
      id: 1,
      question: `What primary computational problem is solved in ${experimentTitle}?`,
      options: [
        "In-place state transformation and step-by-step memory manipulation",
        "Random unbuffered execution without invariants",
        "Infinite recursive stack expansion",
        "Static compilation error without memory allocation",
      ],
      correctAnswer: 0,
      explanation: "Virtual laboratory experiments demonstrate verifiable state transformation, memory invariants, and time complexities.",
    },
    {
      id: 2,
      question: "Which of the following describes the best-case execution invariant?",
      options: [
        "O(N^3) unbounded passes",
        "Optimal traversal with early termination when preconditions are met",
        "Uncontrolled branch hazard",
        "Complete cache miss penalty",
      ],
      correctAnswer: 1,
      explanation: "Adaptive algorithms check sortedness / baseline conditions to achieve optimal lower-bound runtime.",
    },
    {
      id: 3,
      question: "In standard hardware and memory models, what is the primary space constraint?",
      options: [
        "Infinite auxiliary memory heap",
        "O(1) auxiliary space for in-place algorithms versus O(N) auxiliary buffers",
        "Zero register usage",
        "Direct disk page swaps for all register operations",
      ],
      correctAnswer: 1,
      explanation: "In-place memory algorithms prioritize O(1) auxiliary space to avoid unnecessary memory overhead.",
    },
  ];

  const handleDifficultyToggle = (diff: "beginner" | "intermediate" | "advanced") => {
    setSelectedDifficulties((prev) => {
      const updated = { ...prev, [diff]: !prev[diff] };
      // Ensure at least one is selected
      if (!updated.beginner && !updated.intermediate && !updated.advanced) {
        return prev;
      }
      return updated;
    });
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    defaultQuestions.forEach((q, idx) => {
      const correctIdx = (q as any).correctIndex ?? (q as any).correctAnswer ?? 0;
      if (selectedAnswers[idx] === correctIdx) {
        correct += 1;
      }
    });
    return correct;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const score = calculateScore();
    if (onComplete) {
      onComplete(score, defaultQuestions.length);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const score = calculateScore();

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Choose Difficulty Bar matching Screenshots 112615 & 112742 */}
      <div className="flex flex-wrap items-center gap-6 py-2 px-1 text-sm font-semibold border-b border-border/60">
        <span className="text-foreground">Choose difficulty:</span>

        <label className="inline-flex items-center gap-2 cursor-pointer select-none text-foreground">
          <input
            type="checkbox"
            checked={selectedDifficulties.beginner}
            onChange={() => handleDifficultyToggle("beginner")}
            className="w-4 h-4 rounded-none text-[#0284c7] focus:ring-primary accent-[#0284c7] cursor-pointer"
          />
          <span className="font-normal text-xs sm:text-sm">Beginner</span>
        </label>

        <label className="inline-flex items-center gap-2 cursor-pointer select-none text-foreground">
          <input
            type="checkbox"
            checked={selectedDifficulties.intermediate}
            onChange={() => handleDifficultyToggle("intermediate")}
            className="w-4 h-4 rounded-none text-[#0284c7] focus:ring-primary accent-[#0284c7] cursor-pointer"
          />
          <span className="font-normal text-xs sm:text-sm">Intermediate</span>
        </label>

        <label className="inline-flex items-center gap-2 cursor-pointer select-none text-foreground">
          <input
            type="checkbox"
            checked={selectedDifficulties.advanced}
            onChange={() => handleDifficultyToggle("advanced")}
            className="w-4 h-4 rounded-none text-[#0284c7] focus:ring-primary accent-[#0284c7] cursor-pointer"
          />
          <span className="font-normal text-xs sm:text-sm">Advanced</span>
        </label>
      </div>

      {/* Questions List */}
      <form onSubmit={handleSubmit} className="space-y-6 pt-2">
        {defaultQuestions.map((q, qIdx) => {
          const correctIdx = (q as any).correctIndex ?? (q as any).correctAnswer ?? 0;
          const selected = selectedAnswers[qIdx];
          const isCorrect = isSubmitted && selected === correctIdx;
          const isWrong = isSubmitted && selected !== undefined && selected !== correctIdx;

          return (
            <div key={q.id || qIdx} className="space-y-2.5 text-sm">
              <div className="font-bold text-foreground leading-snug">
                <span>{qIdx + 1}. </span>
                <span>{q.question}</span>
              </div>

              {/* Options */}
              <div className="space-y-2 pl-4">
                {q.options.map((opt, optIdx) => {
                  const letter = String.fromCharCode(97 + optIdx); // a, b, c, d
                  const isOptSelected = selected === optIdx;
                  const isOptAnswer = isSubmitted && optIdx === correctIdx;

                  return (
                    <label
                      key={optIdx}
                      className={`flex items-start gap-2.5 text-xs sm:text-sm cursor-pointer select-none py-1 px-2 rounded-none transition-colors ${
                        isOptAnswer
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold"
                          : isWrong && isOptSelected
                          ? "bg-rose-500/10 text-rose-700 dark:text-rose-300 line-through"
                          : "text-foreground/90 hover:text-foreground"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question_${qIdx}`}
                        checked={isOptSelected}
                        onChange={() => handleSelectOption(qIdx, optIdx)}
                        disabled={isSubmitted}
                        className="mt-0.5 accent-[#0284c7] cursor-pointer"
                      />
                      <span className="font-mono text-xs opacity-75">{letter}: </span>
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>

              {/* Post-submit feedback per question */}
              {isSubmitted && q.explanation && (
                <div className="mt-2 ml-4 p-2.5 rounded-none bg-muted/50 border border-border text-xs text-muted-foreground">
                  <span className="font-bold text-foreground">Explanation: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}

        {/* Action Controls & Score Display */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60">
          {!isSubmitted ? (
            <Button
              type="submit"
              disabled={Object.keys(selectedAnswers).length === 0}
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs h-9 px-5 shadow-xs rounded-none"
            >
              Submit {type === "pretest" ? "Pretest" : "Posttest"}
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <div className="px-3.5 py-1.5 rounded-none bg-primary/10 border border-primary/20 text-xs font-bold text-primary flex items-center gap-1.5">
                <Award className="h-4 w-4" />
                <span>
                  Score: {score} / {defaultQuestions.length} ({Math.round((score / defaultQuestions.length) * 100)}%)
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="h-9 text-xs font-semibold gap-1.5 rounded-none"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Retake Assessment
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
