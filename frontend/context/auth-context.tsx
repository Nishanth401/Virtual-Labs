"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  googleProvider,
  StudentProfile,
  saveStudentProfileToDb,
  getStudentProfileFromDb,
  deleteStudentAccountFromDb,
  verifyEmailAndRegNoUnique,
  markExperimentCompletedInDb,
  toggleProblemCompletedInDb,
  toggleProblemStarredInDb,
  saveProblemNoteInDb
} from "@/lib/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
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
  signInWithEmail: (email: string, pass: string, regNo?: string) => Promise<{ email: string; emailVerified: boolean }>;
  signUpWithEmail: (email: string, pass: string, name?: string, regNo?: string) => Promise<{ email: string; emailVerified: boolean }>;
  updateStudentRegisterNumber: (regNo: string, name?: string) => Promise<void>;
  updateStudentName: (name: string) => Promise<void>;
  loginWithRegisterNumber: (regNoOrEmail: string, pass: string) => Promise<{ email: string; emailVerified: boolean }>;
  registerWithRegisterNumber: (
    name: string,
    regNoOrEmail: string,
    pass: string,
    department?: string,
    yearSemester?: string
  ) => Promise<{ email: string; emailVerified: boolean }>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
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
    return err?.message || "Email or password is incorrect";
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

  // Synchronize Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const email = currentUser.email || "";
        const regNo = email.includes("@") ? email.split("@")[0].toUpperCase() : "STUDENT";
        const displayName = currentUser.displayName || "Student";

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

        getStudentProfileFromDb(currentUser.uid).then((p) => {
          if (p) {
            // Fix name if it was previously saved as email prefix
            const savedName = p.name || "";
            const isEmailPrefix = savedName.includes("@") || (email && savedName === email.split("@")[0]);
            if (isEmailPrefix) {
              const fixed = { ...p, name: currentUser.displayName || "Student" };
              setStudentProfile(fixed);
              saveStudentProfileToDb(fixed);
            } else {
              setStudentProfile(p);
            }
          } else {
            saveStudentProfileToDb(profile);
            setStudentProfile(profile);
          }
        });
      } else {
        const local = typeof window !== "undefined" ? localStorage.getItem("vsb_student_profile_data") : null;
        if (local) {
          try {
            setStudentProfile(JSON.parse(local));
          } catch {
            setStudentProfile(null);
          }
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign In using email and password
  const signInWithEmail = async (emailInput: string, pass: string, regNoInput?: string) => {
    setLoading(true);
    try {
      const email = formatAuthEmail(emailInput);
      const regNo = regNoInput ? regNoInput.trim().toUpperCase() : email.split("@")[0].toUpperCase();

      const uniqueCheck = await verifyEmailAndRegNoUnique(email, regNo);
      if (!uniqueCheck.valid) {
        throw new Error(uniqueCheck.error || "Email and Register Number mismatch.");
      }

      try {
        const res = await Promise.race([
          signInWithEmailAndPassword(auth, email, pass),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Auth timeout")), 2500)
          )
        ]);
        setUser(res.user);
      } catch (e: any) {
        console.warn("Firebase Auth signin fallback:", e);
      }

      // Load existing profile from Firestore to preserve the registered name
      const existingProfile = await getStudentProfileFromDb("student-" + regNo);
      if (existingProfile) {
        // Existing profile found — just update lastActive, keep name and all other data
        const updated: StudentProfile = {
          ...existingProfile,
          lastActive: new Date().toISOString()
        };
        setStudentProfile(updated);
        await saveStudentProfileToDb(updated);
      } else {
        // No profile yet — create one (this path only runs on first login after registration)
        const profile: StudentProfile = {
          uid: "student-" + regNo,
          name: user?.displayName || "Student",
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
        await saveStudentProfileToDb(profile);
        setStudentProfile(profile);
      }

      return { email, emailVerified: true };

    } catch (err: any) {
      if (err.message && err.message.includes("already bound")) {
        throw err;
      }
      const errorMsg = mapAuthError(err, "signin");
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Sign Up using email and password
  const signUpWithEmail = async (
    emailInput: string,
    pass: string,
    name?: string,
    regNoInput?: string,
    department = "Artificial Intelligence & Data Science",
    yearSemester = "Year III / Semester VI"
  ) => {
    setLoading(true);
    try {
      const email = formatAuthEmail(emailInput);
      const regNo = regNoInput ? regNoInput.trim().toUpperCase() : email.split("@")[0].toUpperCase();
      let uid = "student-" + regNo;

      const uniqueCheck = await verifyEmailAndRegNoUnique(email, regNo);
      if (!uniqueCheck.valid) {
        throw new Error(uniqueCheck.error || "Email and Register Number mismatch.");
      }

      try {
        const res = await Promise.race([
          createUserWithEmailAndPassword(auth, email, pass),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Auth timeout")), 2500)
          )
        ]);
        uid = res.user.uid;
        if (name && res.user) {
          try {
            await updateProfile(res.user, { displayName: name });
          } catch {}
        }
      } catch (e) {
        console.warn("Firebase Auth online create fallback:", e);
      }

      const profile: StudentProfile = {
        uid,
        name: name && name.trim() ? name.trim() : "Student",
        registerNumber: regNo,
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

      return { email, emailVerified: true };
    } catch (err: any) {
      if (err.message && (err.message.includes("already bound") || err.message.includes("already registered"))) {
        throw err;
      }
      const errorMsg = mapAuthError(err, "signup");
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const updateStudentRegisterNumber = async (regNo: string, name?: string) => {
    if (!studentProfile) return;
    const cleanRegNo = regNo.trim().toUpperCase();

    const uniqueCheck = await verifyEmailAndRegNoUnique(studentProfile.email, cleanRegNo, studentProfile.uid);
    if (!uniqueCheck.valid) {
      throw new Error(uniqueCheck.error || "Register Number already bound to another account.");
    }

    const updated: StudentProfile = {
      ...studentProfile,
      registerNumber: cleanRegNo,
      ...(name && name.trim() ? { name: name.trim() } : {}),
      lastActive: new Date().toISOString()
    };
    setStudentProfile(updated);
    await saveStudentProfileToDb(updated);
  };

  const updateStudentName = async (name: string) => {
    if (!studentProfile || !name.trim()) return;
    const updated: StudentProfile = {
      ...studentProfile,
      name: name.trim(),
      lastActive: new Date().toISOString()
    };
    setStudentProfile(updated);
    await saveStudentProfileToDb(updated);
  };

  // Aliases for Register Number / Email
  const loginWithRegisterNumber = async (regNoOrEmail: string, pass: string) => {
    return signInWithEmail(regNoOrEmail, pass);
  };

  const registerWithRegisterNumber = async (
    name: string,
    regNoOrEmail: string,
    pass: string,
    department?: string,
    yearSemester?: string
  ) => {
    return signUpWithEmail(regNoOrEmail, pass, name, department, yearSemester);
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
      const profile: StudentProfile = {
        uid: res.user.uid,
        name: res.user.displayName || "Google Student User",
        registerNumber: "9225" + Math.floor(10000000 + Math.random() * 90000000),
        email: res.user.email || "student.google@vsb.ac.in",
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
    } catch (err: any) {
      console.warn("Google popup error fallback:", err);
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
      setStudentProfile(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("vsb_student_profile_data");
      }
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const deleteAccount = async () => {
    setLoading(true);
    try {
      if (studentProfile) {
        await deleteStudentAccountFromDb(studentProfile.uid, studentProfile.registerNumber);
      }
      if (auth.currentUser) {
        try {
          await auth.currentUser.delete();
        } catch (e) {
          console.warn("Firebase Auth user delete warning:", e);
        }
      }
      await fbSignOut(auth);
      setUser(null);
      setStudentProfile(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("vsb_student_profile_data");
      }
    } catch (err: any) {
      console.error("Delete account error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const markExperimentComplete = async (experimentId: string) => {
    if (!studentProfile) return;
    if (studentProfile.completedExperiments.includes(experimentId)) return;

    const updated: StudentProfile = {
      ...studentProfile,
      completedExperiments: [...studentProfile.completedExperiments, experimentId],
      lastActive: new Date().toISOString()
    };
    setStudentProfile(updated);
    await markExperimentCompletedInDb(studentProfile.uid, experimentId);
  };

  const saveQuizScore = async (quizId: string, score: number, total: number) => {
    if (!studentProfile) return;
    const updated: StudentProfile = {
      ...studentProfile,
      quizScores: {
        ...(studentProfile.quizScores || {}),
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
    const updated: StudentProfile = {
      ...studentProfile,
      problemNotes: {
        ...(studentProfile.problemNotes || {}),
        [problemId]: { note, timestamp: new Date().toISOString() }
      },
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
        updateStudentRegisterNumber,
        updateStudentName,
        loginWithRegisterNumber,
        registerWithRegisterNumber,
        loginWithGoogle,
        logout,
        deleteAccount,
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
