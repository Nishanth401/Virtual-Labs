"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Quiz } from "@/data/quizzes";
import { useStudentProgress } from "@/hooks/use-student-progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Award, RotateCcw, HelpCircle, Check, Sparkles } from "lucide-react";

interface QuizEngineProps {
  quiz: Quiz;
  onCompleted?: (score: number) => void;
}

export function QuizEngine({ quiz, onCompleted }: QuizEngineProps) {
  const { progress, saveQuiz } = useStudentProgress();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Check if previously attempted
  const pastAttempt = progress.quizAttempts[quiz.experimentId];

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length < quiz.questions.length) {
      alert("Please answer all questions before submitting your assessment.");
      return;
    }

    let calculatedScore = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
    setIsSubmitted(true);

    // Save to localStorage
    saveQuiz(quiz.experimentId, calculatedScore, quiz.questions.length, quiz.passingScore);

    // Celebrate if passed
    if (calculatedScore >= quiz.passingScore) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback if canvas is unavailable
      }
    }

    if (onCompleted) {
      onCompleted(calculatedScore);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  const isPassed = score >= quiz.passingScore;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Quiz Header Banner */}
      <Card className="border-secondary/40 bg-card/60 backdrop-blur-xs">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-medium">
                  Self-Assessment Evaluation
                </Badge>
                {pastAttempt && (
                  <Badge variant="secondary" className="text-xs">
                    Previous Best: {pastAttempt.score}/{pastAttempt.totalQuestions} ({pastAttempt.percentage}%)
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl font-bold">{quiz.title}</CardTitle>
              <CardDescription className="text-xs mt-1">{quiz.description}</CardDescription>
            </div>

            {isSubmitted && (
              <div className={`px-4 py-3 rounded-xl border text-center shrink-0 ${
                isPassed
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-500"
              }`}>
                <div className="text-xs font-semibold uppercase tracking-wider">Your Score</div>
                <div className="text-2xl font-black font-mono">
                  {score} / {quiz.questions.length}
                </div>
                <div className="text-[11px] font-medium">
                  {isPassed ? "🎉 Passed & Recorded!" : "Keep practicing!"}
                </div>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Questions List */}
      <div className="space-y-4">
        {quiz.questions.map((question, qIdx) => {
          const selectedOption = selectedAnswers[qIdx];
          const isCorrect = selectedOption === question.correctIndex;

          return (
            <Card
              key={question.id}
              className={`transition-all border ${
                isSubmitted
                  ? isCorrect
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : "border-rose-500/40 bg-rose-500/5"
                  : "border-secondary/30 bg-card/60 hover:border-secondary/60"
              }`}
            >
              <CardContent className="p-5 space-y-3.5">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <p className="font-semibold text-sm text-foreground leading-relaxed">
                    {question.question}
                  </p>
                </div>

                {/* Option Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 pl-9">
                  {question.options.map((optionText, oIdx) => {
                    const isOptionSelected = selectedOption === oIdx;
                    const isActualCorrect = question.correctIndex === oIdx;

                    let btnClass = "border-border/60 hover:bg-muted/60 text-muted-foreground";

                    if (isOptionSelected && !isSubmitted) {
                      btnClass = "border-primary bg-primary/10 text-primary font-medium ring-1 ring-primary";
                    }

                    if (isSubmitted) {
                      if (isActualCorrect) {
                        btnClass = "border-emerald-500 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold ring-1 ring-emerald-500";
                      } else if (isOptionSelected && !isCorrect) {
                        btnClass = "border-rose-500 bg-rose-500/20 text-rose-600 dark:text-rose-400 font-medium";
                      } else {
                        btnClass = "opacity-50 border-border/40";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelectOption(qIdx, oIdx)}
                        disabled={isSubmitted}
                        className={`text-left text-xs p-3 rounded-lg border transition-all flex items-start justify-between gap-2 ${btnClass}`}
                      >
                        <span className="leading-relaxed">
                          <strong className="mr-1.5 opacity-70">
                            {String.fromCharCode(65 + oIdx)}.
                          </strong>
                          {optionText}
                        </span>

                        {isSubmitted && isActualCorrect && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        )}
                        {isSubmitted && isOptionSelected && !isCorrect && (
                          <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Post-Submission Explanation */}
                {isSubmitted && (
                  <div className="mt-3 ml-9 p-3 rounded-lg bg-muted/50 border border-border/50 text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground font-semibold">Explanation: </strong>
                      {question.explanation}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-border/60 bg-card/40">
        <div className="text-xs text-muted-foreground">
          {!isSubmitted ? (
            <span>Answered {answeredCount} of {quiz.questions.length} questions</span>
          ) : (
            <span>
              Pass mark requirement: <strong>{quiz.passingScore}/{quiz.questions.length}</strong> (75%)
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!isSubmitted ? (
            <Button
              onClick={handleSubmit}
              disabled={answeredCount < quiz.questions.length}
              className="bg-primary hover:bg-primary/90 text-white text-xs px-6 font-semibold"
            >
              Submit Assessment
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleReset}
              className="text-xs gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Re-attempt Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
