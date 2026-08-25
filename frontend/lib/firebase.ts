/**
 * firebase.ts
 *
 * Client Firebase configuration with Auth & Firestore initialization.
 * Includes graceful offline / local persistence fallback if credentials are unconfigured.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
  query,
  getDocs
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDemoKeyVirtualLabsVSBECollege2026",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "vsb-virtual-labs.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "vsb-virtual-labs",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "vsb-virtual-labs.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "102938475610",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:102938475610:web:abcdef123456789",
};

// Initialize App safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
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

// Student Data Storage Helpers (Firestore with local fallback)
const LOCAL_STORAGE_KEY = "vsb_student_profile_data";

export async function saveStudentProfileToDb(profile: StudentProfile): Promise<void> {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn("LocalStorage write error:", e);
    }
  }

  try {
    const userRef = doc(db, "students", profile.uid);
    await Promise.race([
      setDoc(userRef, profile, { merge: true }),
      new Promise((resolve) => setTimeout(resolve, 1500))
    ]);
  } catch (err) {
    console.warn("Firestore sync fallback to localStorage:", err);
  }
}

export async function getStudentProfileFromDb(uid: string): Promise<StudentProfile | null> {
  try {
    const userRef = doc(db, "students", uid);
    const docSnap = await Promise.race([
      getDoc(userRef),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500))
    ]);
    if (docSnap && docSnap.exists()) {
      return docSnap.data() as StudentProfile;
    }
  } catch (err) {
    console.warn("Firestore fetch fallback to localStorage:", err);
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.uid === uid || parsed.registerNumber) return parsed;
      } catch {}
    }
  }

  return null;
}

export async function markExperimentCompletedInDb(uid: string, experimentId: string): Promise<void> {
  try {
    const userRef = doc(db, "students", uid);
    await updateDoc(userRef, {
      completedExperiments: arrayUnion(experimentId),
      lastActive: new Date().toISOString()
    });
  } catch (err) {
    console.warn("Firestore update fallback to localStorage:", err);
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      try {
        const parsed: StudentProfile = JSON.parse(local);
        if (!parsed.completedExperiments.includes(experimentId)) {
          parsed.completedExperiments.push(experimentId);
          parsed.lastActive = new Date().toISOString();
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
        }
      } catch {}
    }
  }
}

export async function toggleProblemCompletedInDb(uid: string, problemId: string): Promise<void> {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      try {
        const parsed: StudentProfile = JSON.parse(local);
        const existing = parsed.completedProblems || [];
        if (existing.includes(problemId)) {
          parsed.completedProblems = existing.filter((p) => p !== problemId);
        } else {
          parsed.completedProblems = [...existing, problemId];
        }
        parsed.lastActive = new Date().toISOString();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
        const userRef = doc(db, "students", uid);
        await setDoc(userRef, parsed, { merge: true });
      } catch {}
    }
  }
}

export async function toggleProblemStarredInDb(uid: string, problemId: string): Promise<void> {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      try {
        const parsed: StudentProfile = JSON.parse(local);
        const existing = parsed.starredProblems || [];
        if (existing.includes(problemId)) {
          parsed.starredProblems = existing.filter((p) => p !== problemId);
        } else {
          parsed.starredProblems = [...existing, problemId];
        }
        parsed.lastActive = new Date().toISOString();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
        const userRef = doc(db, "students", uid);
        await setDoc(userRef, parsed, { merge: true });
      } catch {}
    }
  }
}

export async function saveProblemNoteInDb(uid: string, problemId: string, noteText: string): Promise<void> {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      try {
        const parsed: StudentProfile = JSON.parse(local);
        parsed.problemNotes = {
          ...(parsed.problemNotes || {}),
          [problemId]: { note: noteText, timestamp: new Date().toISOString() }
        };
        parsed.lastActive = new Date().toISOString();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
        const userRef = doc(db, "students", uid);
        await setDoc(userRef, parsed, { merge: true });
      } catch {}
    }
  }
}
