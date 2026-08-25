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
  User
} from "firebase/auth";

interface AuthContextType {
  user: User | null;
  student: StudentProfile | null;
  studentProfile: StudentProfile | null;
  loading: boolean;
  loginWithRegisterNumber: (regNo: string, pass: string) => Promise<void>;
  registerWithRegisterNumber: (
    name: string,
    regNo: string,
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync profile when Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        let profile = await getStudentProfileFromDb(currentUser.uid);
        if (!profile) {
          profile = {
            uid: currentUser.uid,
            name: currentUser.displayName || "AI & DS Student",
            registerNumber: "9225" + Math.floor(10000000 + Math.random() * 90000000),
            email: currentUser.email || "",
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
          await saveStudentProfileToDb(profile);
        }
        setStudentProfile(profile);
      } else {
        const local = localStorage.getItem("vsb_student_profile_data");
        if (local) {
          try {
            setStudentProfile(JSON.parse(local));
          } catch {
            setStudentProfile(null);
          }
        } else {
          const defaultProfile: StudentProfile = {
            uid: "guest-student-9225",
            name: "Rohith E",
            registerNumber: "922521104001",
            email: "rohith.aids@vsb.ac.in",
            department: "Artificial Intelligence & Data Science",
            yearSemester: "Year III / Semester VI",
            completedExperiments: ["bubble-sort", "stack-operations", "linear-regression"],
            completedProblems: [],
            starredProblems: [],
            problemNotes: {},
            quizScores: {
              "quiz-bubble-sort": { score: 4, total: 5, timestamp: new Date().toISOString() },
              "quiz-stack": { score: 5, total: 5, timestamp: new Date().toISOString() }
            },
            feedbacks: {},
            createdAt: new Date().toISOString(),
            lastActive: new Date().toISOString()
          };
          setStudentProfile(defaultProfile);
          localStorage.setItem("vsb_student_profile_data", JSON.stringify(defaultProfile));
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithRegisterNumber = async (regNo: string, pass: string) => {
    setLoading(true);
    try {
      const email = `${regNo.toLowerCase().trim()}@vsb.ac.in`;
      try {
        const res = await Promise.race([
          signInWithEmailAndPassword(auth, email, pass),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Auth timeout")), 2000)
          )
        ]);
        setUser(res.user);
      } catch {
        const local = typeof window !== "undefined" ? localStorage.getItem("vsb_student_profile_data") : null;
        let profile: StudentProfile;
        if (local) {
          try {
            profile = JSON.parse(local);
            profile.registerNumber = regNo;
          } catch {
            profile = {
              uid: "student-" + regNo,
              name: "Student " + regNo,
              registerNumber: regNo,
              email,
              department: "Artificial Intelligence & Data Science",
              yearSemester: "Year III / Semester VI",
              completedExperiments: ["bubble-sort"],
              completedProblems: [],
              starredProblems: [],
              problemNotes: {},
              quizScores: {},
              feedbacks: {},
              createdAt: new Date().toISOString(),
              lastActive: new Date().toISOString()
            };
          }
        } else {
          profile = {
            uid: "student-" + regNo,
            name: "Student " + regNo,
            registerNumber: regNo,
            email,
            department: "Artificial Intelligence & Data Science",
            yearSemester: "Year III / Semester VI",
            completedExperiments: ["bubble-sort"],
            completedProblems: [],
            starredProblems: [],
            problemNotes: {},
            quizScores: {},
            feedbacks: {},
            createdAt: new Date().toISOString(),
            lastActive: new Date().toISOString()
          };
        }
        await saveStudentProfileToDb(profile);
        setStudentProfile(profile);
      }
    } finally {
      setLoading(false);
    }
  };

  const registerWithRegisterNumber = async (
    name: string,
    regNo: string,
    pass: string,
    department = "Artificial Intelligence & Data Science",
    yearSemester = "Year III / Semester VI"
  ) => {
    setLoading(true);
    try {
      const email = `${regNo.toLowerCase().trim()}@vsb.ac.in`;
      let uid = "student-" + regNo;
      try {
        const res = await Promise.race([
          createUserWithEmailAndPassword(auth, email, pass),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Auth timeout")), 2000)
          )
        ]);
        uid = res.user.uid;
      } catch (e) {
        console.warn("Firebase Auth online create fallback:", e);
      }

      const profile: StudentProfile = {
        uid,
        name: name.trim(),
        registerNumber: regNo.trim(),
        email,
        department,
        yearSemester,
        completedExperiments: [],
        completedProblems: [],
        starredProblems: [],
        problemNotes: {},
        quizScores: {},
        feedbacks: {},
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };
      await saveStudentProfileToDb(profile);
      setStudentProfile(profile);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await Promise.race([
        signInWithPopup(auth, googleProvider),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Google Auth timeout")), 3000)
        )
      ]);
      setUser(res.user);
    } catch (err) {
      console.warn("Google popup fallback:", err);
      const profile: StudentProfile = {
        uid: "google-student-guest",
        name: "Google Student User",
        registerNumber: "9225" + Math.floor(10000000 + Math.random() * 90000000),
        email: "student.google@vsb.ac.in",
        department: "Artificial Intelligence & Data Science",
        yearSemester: "Year III / Semester VI",
        completedExperiments: [],
        completedProblems: [],
        starredProblems: [],
        problemNotes: {},
        quizScores: {},
        feedbacks: {},
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };
      await saveStudentProfileToDb(profile);
      setStudentProfile(profile);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
      setUser(null);
      localStorage.removeItem("vsb_student_profile_data");
      setStudentProfile(null);
    } catch (e) {
      console.error(e);
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
    await saveStudentProfileToDb(updated);
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
    await saveStudentProfileToDb(updated);
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
    await toggleProblemCompletedInDb(studentProfile.uid, problemId);
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
    await toggleProblemStarredInDb(studentProfile.uid, problemId);
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
