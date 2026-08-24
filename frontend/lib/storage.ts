export interface QuizAttempt {
  experimentId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
}

export interface ExperimentProgress {
  experimentId: string;
  completed: boolean;
  completedAt?: string;
  timeSpentMinutes: number;
  quizScore?: number;
  ratingGiven?: number;
}

export interface StudentProgressState {
  role: "STUDENT" | "FACULTY" | "ADMIN";
  studentName: string;
  studentRollNo: string;
  department: string;
  completedExperiments: string[];
  quizAttempts: Record<string, QuizAttempt>;
  feedbacks: Record<string, { rating: number; comment: string; submittedAt: string }>;
  certificateUnlocked: boolean;
}

const STORAGE_KEY = "vlab_student_progress_v1";

const DEFAULT_STATE: StudentProgressState = {
  role: "STUDENT",
  studentName: "Anish R.",
  studentRollNo: "922521104012",
  department: "Department of Artificial Intelligence & Data Science",
  completedExperiments: ["stack-operations"],
  quizAttempts: {
    "stack-operations": {
      experimentId: "stack-operations",
      score: 4,
      totalQuestions: 4,
      percentage: 100,
      passed: true,
      completedAt: new Date(Date.now() - 3600000 * 24).toISOString()
    }
  },
  feedbacks: {
    "stack-operations": {
      rating: 5,
      comment: "The visual stack animation and underflow/overflow alerts made LIFO crystal clear!",
      submittedAt: new Date(Date.now() - 3600000 * 24).toISOString()
    }
  },
  certificateUnlocked: false
};

export function getStoredProgress(): StudentProgressState {
  if (typeof window === "undefined") {
    return DEFAULT_STATE;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
      return DEFAULT_STATE;
    }
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch (err) {
    console.error("Error reading localStorage:", err);
    return DEFAULT_STATE;
  }
}

export function saveStoredProgress(state: StudentProgressState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
}

export function recordQuizResult(
  experimentId: string,
  score: number,
  totalQuestions: number,
  passingScore: number = 3
): QuizAttempt {
  const state = getStoredProgress();
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = score >= passingScore;

  const attempt: QuizAttempt = {
    experimentId,
    score,
    totalQuestions,
    percentage,
    passed,
    completedAt: new Date().toISOString()
  };

  state.quizAttempts[experimentId] = attempt;

  if (passed && !state.completedExperiments.includes(experimentId)) {
    state.completedExperiments.push(experimentId);
  }

  // Check if student unlocked certificate (at least 3 experiments passed)
  if (state.completedExperiments.length >= 3) {
    state.certificateUnlocked = true;
  }

  saveStoredProgress(state);
  return attempt;
}

export function recordExperimentFeedback(
  experimentId: string,
  rating: number,
  comment: string
): void {
  const state = getStoredProgress();
  state.feedbacks[experimentId] = {
    rating,
    comment,
    submittedAt: new Date().toISOString()
  };
  saveStoredProgress(state);
}

export function setDemoRole(role: "STUDENT" | "FACULTY" | "ADMIN"): void {
  const state = getStoredProgress();
  state.role = role;
  saveStoredProgress(state);
}

export function resetProgressToDefaults(): StudentProgressState {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_STATE;
}
