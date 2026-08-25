/**
 * firebase.ts
 *
 * Client Firebase configuration with Firebase Authentication.
 * Note: Firestore and Storage are intentionally disabled per configuration.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  User
} from "firebase/auth";

// Web App Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAYS8N8C25-VWYUfCDh1OrUq__DxgVBgXk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "virtual-lab-e7495.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "virtual-lab-e7495",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "virtual-lab-e7495.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "341602998056",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:341602998056:web:3e78ace74d2fd34680e21d"
};

// Initialize Firebase (Auth only)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export interface StudentProfile {
  uid: string;
  name: string;
  registerNumber: string;
  email: string;
  department: string;
  yearSemester: string;
  completedExperiments: string[];
  completedProblems?: string[];
  starredProblems?: string[];
  problemNotes?: Record<string, { note: string; timestamp: string }>;
  quizScores: Record<string, { score: number; total: number; timestamp: string }>;
  feedbacks: Record<string, { rating: number; comment: string; timestamp: string }>;
  createdAt: string;
  lastActive: string;
}

// Local UI helpers (In-memory / localStorage only, NO Firestore)
const LOCAL_STORAGE_KEY = "vsb_student_profile_data";

export async function saveStudentProfileToDb(profile: StudentProfile): Promise<void> {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
    } catch {}
  }
}

export async function getStudentProfileFromDb(uid: string): Promise<StudentProfile | null> {
  if (typeof window !== "undefined") {
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.uid === uid) return parsed;
      }
    } catch {}
  }
  return null;
}

export async function markExperimentCompletedInDb(uid: string, experimentId: string): Promise<void> {
  if (typeof window !== "undefined") {
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        const parsed: StudentProfile = JSON.parse(local);
        if (!parsed.completedExperiments.includes(experimentId)) {
          parsed.completedExperiments.push(experimentId);
          parsed.lastActive = new Date().toISOString();
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
        }
      }
    } catch {}
  }
}

export async function toggleProblemCompletedInDb(uid: string, problemId: string, _completed?: boolean): Promise<void> {
  if (typeof window !== "undefined") {
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        const parsed: StudentProfile = JSON.parse(local);
        const existing = parsed.completedProblems || [];
        if (existing.includes(problemId)) {
          parsed.completedProblems = existing.filter((p) => p !== problemId);
        } else {
          parsed.completedProblems = [...existing, problemId];
        }
        parsed.lastActive = new Date().toISOString();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      }
    } catch {}
  }
}

export async function toggleProblemStarredInDb(uid: string, problemId: string, _starred?: boolean): Promise<void> {
  if (typeof window !== "undefined") {
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        const parsed: StudentProfile = JSON.parse(local);
        const existing = parsed.starredProblems || [];
        if (existing.includes(problemId)) {
          parsed.starredProblems = existing.filter((p) => p !== problemId);
        } else {
          parsed.starredProblems = [...existing, problemId];
        }
        parsed.lastActive = new Date().toISOString();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      }
    } catch {}
  }
}

export async function saveProblemNoteInDb(uid: string, problemId: string, noteText: string): Promise<void> {
  if (typeof window !== "undefined") {
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        const parsed: StudentProfile = JSON.parse(local);
        parsed.problemNotes = {
          ...(parsed.problemNotes || {}),
          [problemId]: { note: noteText, timestamp: new Date().toISOString() }
        };
        parsed.lastActive = new Date().toISOString();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      }
    } catch {}
  }
}
