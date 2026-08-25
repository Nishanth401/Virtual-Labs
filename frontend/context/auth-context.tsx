"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  googleProvider,
  StudentProfile,
  saveStudentProfileToDb,
  getStudentProfileFromDb,
  markExperimentCompletedInDb,
  toggleProblemCompletedInDb,
  toggleProblemStarredInDb,
  saveProblemNoteInDb
} from "@/lib/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  updateProfile,
  User
} from "firebase/auth";

interface AuthContextType {
  user: User | null;
  student: StudentProfile | null;
  studentProfile: StudentProfile | null;
  loading: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  loginWithRegisterNumber: (regNoOrEmail: string, pass: string) => Promise<void>;
  registerWithRegisterNumber: (
    name: string,
    regNoOrEmail: string,
    pass: string,
    department?: string,
    yearSemester?: string
  ) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  markExperimentComplete: (experimentId: string) => Promise<void>;
  saveQuizScore: (quizId: string, score: number, total: number) => Promise<void>;
  toggleProblemCompleted: (problemId: string) => Promise<void>;
  toggleProblemStarred: (problemId: string) => Promise<void>;
  saveProblemNote: (problemId: string, note: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to format email from either email or student register number
function formatAuthEmail(input: string): string {
  const trimmed = input.trim();
  if (trimmed.includes("@")) {
    return trimmed.toLowerCase();
  }
  return `${trimmed.toLowerCase()}@vsb.ac.in`;
}

// Convert Firebase Auth errors to required user-friendly error messages
function mapAuthError(err: any, mode: "signin" | "signup"): string {
  const code = err?.code || "";
  if (mode === "signin") {
    if (
      code === "auth/invalid-credential" ||
      code === "auth/wrong-password" ||
      code === "auth/user-not-found" ||
      code === "auth/invalid-email" ||
      code === "auth/invalid-login-credentials"
    ) {
      return "Email or password is incorrect";
    }
    return "Email or password is incorrect";
  }

  if (mode === "signup") {
    if (code === "auth/email-already-in-use") {
      return "User already exists. Please sign in";
    }
    if (code === "auth/weak-password") {
      return "Password should be at least 6 characters.";
    }
    if (code === "auth/invalid-email") {
      return "Please enter a valid email address.";
    }
    return err?.message || "Failed to create account. Please try again.";
  }

  return err?.message || "Authentication error occurred.";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Synchronize Firebase Auth state (Firebase Authentication only, No Firestore)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const email = currentUser.email || "";
        const regNo = email.includes("@") ? email.split("@")[0].toUpperCase() : "STUDENT";
        const displayName = currentUser.displayName || (email ? email.split("@")[0] : "Student");

        const profile: StudentProfile = {
          uid: currentUser.uid,
          name: displayName,
          registerNumber: regNo,
          email,
          department: "Artificial Intelligence & Data Science",
          yearSemester: "Year III / Semester VI",
          completedExperiments: ["bubble-sort", "stack-operations"],
          completedProblems: [],
          starredProblems: [],
          problemNotes: {},
          quizScores: {},
          feedbacks: {},
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString()
        };
        setStudentProfile(profile);
      } else {
        setStudentProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign In using email and password
  const signInWithEmail = async (emailInput: string, pass: string) => {
    setLoading(true);
    try {
      const email = formatAuthEmail(emailInput);
      const res = await signInWithEmailAndPassword(auth, email, pass);
      setUser(res.user);
    } catch (err: any) {
      const errorMsg = mapAuthError(err, "signin");
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Sign Up using email and password
  const signUpWithEmail = async (emailInput: string, pass: string, name?: string) => {
    setLoading(true);
    try {
      const email = formatAuthEmail(emailInput);
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      if (name && res.user) {
        try {
          await updateProfile(res.user, { displayName: name });
        } catch {}
      }
      setUser(res.user);
    } catch (err: any) {
      const errorMsg = mapAuthError(err, "signup");
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Aliases for Register Number / Email
  const loginWithRegisterNumber = async (regNoOrEmail: string, pass: string) => {
    return signInWithEmail(regNoOrEmail, pass);
  };

  const registerWithRegisterNumber = async (
    name: string,
    regNoOrEmail: string,
    pass: string,
    _department?: string,
    _yearSemester?: string
  ) => {
    return signUpWithEmail(regNoOrEmail, pass, name);
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setUser(res.user);
    } catch (err: any) {
      console.warn("Google popup error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
      setUser(null);
      setStudentProfile(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("vsb_student_profile_data");
      }
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const markExperimentComplete = async (experimentId: string) => {
    if (!studentProfile) return;
    if (studentProfile.completedExperiments.includes(experimentId)) return;

    const updated = {
      ...studentProfile,
      completedExperiments: [...studentProfile.completedExperiments, experimentId],
      lastActive: new Date().toISOString()
    };
    setStudentProfile(updated);
    await markExperimentCompletedInDb(studentProfile.uid, experimentId);
  };

  const saveQuizScore = async (quizId: string, score: number, total: number) => {
    if (!studentProfile) return;
    const updated = {
      ...studentProfile,
      quizScores: {
        ...studentProfile.quizScores,
        [quizId]: { score, total, timestamp: new Date().toISOString() }
      },
      lastActive: new Date().toISOString()
    };
    setStudentProfile(updated);
  };

  const toggleProblemCompleted = async (problemId: string) => {
    if (!studentProfile) return;
    const currentList = studentProfile.completedProblems || [];
    const isCompleted = currentList.includes(problemId);
    const updatedList = isCompleted
      ? currentList.filter((id) => id !== problemId)
      : [...currentList, problemId];

    const updated: StudentProfile = {
      ...studentProfile,
      completedProblems: updatedList,
      lastActive: new Date().toISOString()
    };
    setStudentProfile(updated);
    await toggleProblemCompletedInDb(studentProfile.uid, problemId, !isCompleted);
  };

  const toggleProblemStarred = async (problemId: string) => {
    if (!studentProfile) return;
    const currentList = studentProfile.starredProblems || [];
    const isStarred = currentList.includes(problemId);
    const updatedList = isStarred
      ? currentList.filter((id) => id !== problemId)
      : [...currentList, problemId];

    const updated: StudentProfile = {
      ...studentProfile,
      starredProblems: updatedList,
      lastActive: new Date().toISOString()
    };
    setStudentProfile(updated);
    await toggleProblemStarredInDb(studentProfile.uid, problemId, !isStarred);
  };

  const saveProblemNote = async (problemId: string, note: string) => {
    if (!studentProfile) return;
    const currentNotes = studentProfile.problemNotes || {};
    const updatedNotes = {
      ...currentNotes,
      [problemId]: { note, timestamp: new Date().toISOString() }
    };

    const updated: StudentProfile = {
      ...studentProfile,
      problemNotes: updatedNotes,
      lastActive: new Date().toISOString()
    };
    setStudentProfile(updated);
    await saveProblemNoteInDb(studentProfile.uid, problemId, note);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        student: studentProfile,
        studentProfile,
        loading,
        signInWithEmail,
        signUpWithEmail,
        loginWithRegisterNumber,
        registerWithRegisterNumber,
        loginWithGoogle,
        logout,
        markExperimentComplete,
        saveQuizScore,
        toggleProblemCompleted,
        toggleProblemStarred,
        saveProblemNote
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
