"use client";

import { useState, useEffect, useCallback } from "react";
import {
  StudentProgressState,
  DEFAULT_STATE,
  getStoredProgress,
  recordQuizResult,
  recordExperimentFeedback,
  setDemoRole,
  resetProgressToDefaults,
  QuizAttempt
} from "@/lib/storage";

export function useStudentProgress() {
  const [progress, setProgress] = useState<StudentProgressState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProgress(getStoredProgress());
    setIsLoaded(true);
  }, []);

  const saveQuiz = useCallback((experimentId: string, score: number, totalQuestions: number, passingScore?: number) => {
    const attempt = recordQuizResult(experimentId, score, totalQuestions, passingScore);
    setProgress(getStoredProgress());
    return attempt;
  }, []);

  const saveFeedback = useCallback((experimentId: string, rating: number, comment: string) => {
    recordExperimentFeedback(experimentId, rating, comment);
    setProgress(getStoredProgress());
  }, []);

  const updateRole = useCallback((role: "STUDENT" | "FACULTY" | "ADMIN") => {
    setDemoRole(role);
    setProgress(getStoredProgress());
  }, []);

  const resetProgress = useCallback(() => {
    const defaultState = resetProgressToDefaults();
    setProgress(defaultState);
  }, []);

  return {
    progress,
    isLoaded,
    saveQuiz,
    saveFeedback,
    updateRole,
    resetProgress
  };
}
