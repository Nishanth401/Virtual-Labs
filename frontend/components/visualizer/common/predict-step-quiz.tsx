"use client";

import React, { useState } from "react";
import { HelpCircle, CheckCircle2, XCircle, RefreshCw, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface PredictQuestion {
  id: string;
  question: string;
  context?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PredictStepQuizProps {
  questions: PredictQuestion[];
  algorithmName?: string;
  onComplete?: (score: number) => void;
}

export function PredictStepQuiz({ questions, algorithmName = "Algorithm", onComplete }: PredictStepQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === q.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setFinished(true);
      if (onComplete) onComplete(score + (selectedOption === q.correctIndex ? 1 : 0));
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setFinished(false);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground border rounded-xl bg-card/40">
        No active prediction questions configured for this module yet.
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="border shadow-lg bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-8 text-center space-y-4">
          <div className="inline-flex p-4 rounded-full bg-amber-500/10 text-amber-500 mb-2">
            <Trophy className="h-10 w-10" />
          </div>
          <CardTitle className="text-2xl font-heading">Practice Challenge Completed!</CardTitle>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            You scored <span className="font-bold text-primary">{score}</span> out of {questions.length} ({percentage}%) on {algorithmName} prediction checks.
          </p>

          <div className="flex justify-center gap-3 pt-4">
            <Button onClick={handleRestart} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" /> Retake Practice
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border shadow-md bg-card/70 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-base font-heading">Predict Next Step Practice</CardTitle>
        </div>
        <Badge variant="secondary" className="text-xs font-mono">
          Question {currentIdx + 1} of {questions.length}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {q.context && (
          <div className="p-3 text-xs font-mono rounded-lg bg-muted/60 border border-border/40 text-muted-foreground">
            {q.context}
          </div>
        )}

        <h3 className="font-medium text-sm text-foreground">{q.question}</h3>

        <div className="grid gap-2.5">
          {q.options.map((option, idx) => {
            let stateStyle = "border-border/60 hover:border-blue-500/50 hover:bg-muted/40";
            if (isAnswered) {
              if (idx === q.correctIndex) {
                stateStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium";
              } else if (selectedOption === idx) {
                stateStyle = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-300";
              } else {
                stateStyle = "opacity-50 border-border/40";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`flex items-center justify-between text-left p-3 text-xs rounded-lg border transition-all ${stateStyle}`}
              >
                <span>{option}</span>
                {isAnswered && idx === q.correctIndex && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 ml-2" />}
                {isAnswered && selectedOption === idx && idx !== q.correctIndex && <XCircle className="h-4 w-4 text-red-500 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-950 dark:text-blue-200">
            <span className="font-bold">Explanation: </span>
            {q.explanation}
          </div>
        )}
      </CardContent>

      {isAnswered && (
        <CardFooter className="justify-end pt-0">
          <Button onClick={handleNext} size="sm" className="gap-2">
            Next Question <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
