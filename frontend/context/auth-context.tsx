"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  supabase,
  User,
  StudentProfile,
  saveStudentProfileToDb,
  getStudentProfileFromDb,
  deleteStudentAccountFromDb,
  verifyEmailAndRegNoUnique,
  markExperimentCompletedInDb,
  toggleProblemCompletedInDb,
  toggleProblemStarredInDb,
  saveProblemNoteInDb
} from "@/lib/supabase";

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

function formatAuthEmail(input: string): string {
  const trimmed = input.trim();
  if (trimmed.includes("@")) {
    return trimmed.toLowerCase();
  }
  return `${trimmed.toLowerCase()}@vsb.ac.in`;
}

function mapSupabaseAuthError(err: any, mode: "signin" | "signup"): string {
  const msg = (err?.message || "").toLowerCase();
  if (mode === "signin") {
    if (msg.includes("invalid login credentials") || msg.includes("invalid email or password")) {
      return "Email or password is incorrect";
    }
    return err?.message || "Email or password is incorrect";
  }
  if (mode === "signup") {
    if (msg.includes("already registered") || msg.includes("user already exists")) {
      return "User already exists. Please sign in";
    }
    if (msg.includes("password should be at least")) {
      return "Password should be at least 6 characters.";
    }
    return err?.message || "Failed to create account. Please try again.";
  }
  return err?.message || "Authentication error occurred.";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Synchronize Supabase Auth state
  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        handleUserSession(session.user);
      } else {
        checkLocalFallback();
      }
      setLoading(false);
    });

    // Listen to Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await handleUserSession(session.user);
      } else {
        setUser(null);
        setStudentProfile(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("vlab_auth_token");
        }
        checkLocalFallback();
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleUserSession = async (currentUser: any) => {
    const email = currentUser.email || "";
    const regNo = currentUser.user_metadata?.register_number || (email.includes("@") ? email.split("@")[0].toUpperCase() : "STUDENT");
    const displayName = currentUser.user_metadata?.name || currentUser.user_metadata?.full_name || "Student";
    const userWithCompat: User = {
      ...currentUser,
      uid: currentUser.id,
      displayName
    };
    setUser(userWithCompat);

    const defaultProfile: StudentProfile = {
      uid: currentUser.id,
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

    const existing = await getStudentProfileFromDb(currentUser.id);
    if (existing) {
      setStudentProfile(existing);
    } else {
      await saveStudentProfileToDb(defaultProfile);
      setStudentProfile(defaultProfile);
    }
  };

  const checkLocalFallback = () => {
    if (typeof window !== "undefined") {
      const local = localStorage.getItem("vsb_student_profile_data");
      if (local) {
        try {
          setStudentProfile(JSON.parse(local));
        } catch {
          setStudentProfile(null);
        }
      }
    }
  };

  const signInWithEmail = async (emailInput: string, pass: string, regNoInput?: string) => {
    setLoading(true);
    try {
      const email = formatAuthEmail(emailInput);
      const regNo = regNoInput ? regNoInput.trim().toUpperCase() : email.split("@")[0].toUpperCase();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        await handleUserSession(data.user);
      }

      return { email, emailVerified: true };
    } catch (err: any) {
      const errorMsg = mapSupabaseAuthError(err, "signin");
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

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

      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            name: name?.trim() || "Student",
            register_number: regNo,
            department,
            year_semester: yearSemester
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        const profile: StudentProfile = {
          uid: data.user.id,
          name: name?.trim() || "Student",
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
      }

      return { email, emailVerified: true };
    } catch (err: any) {
      const errorMsg = mapSupabaseAuthError(err, "signup");
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const updateStudentRegisterNumber = async (regNo: string, name?: string) => {
    if (!studentProfile) return;
    const cleanRegNo = regNo.trim().toUpperCase();

    const uniqueCheck = await verifyEmailAndRegNoUnique(studentProfile.email, cleanRegNo, studentProfile.uid);
    if (!uniqueCheck.regNoUnique) {
      throw new Error("Register Number already bound to another account.");
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
    return signUpWithEmail(regNoOrEmail, pass, name, regNoOrEmail, department, yearSemester);
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined
        }
      });
      if (error) throw error;
    } catch (err: any) {
      console.warn("Google OAuth error fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setStudentProfile(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("vsb_student_profile_data");
        localStorage.removeItem("vlab_auth_token");
      }
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const deleteAccount = async () => {
    setLoading(true);
    try {
      if (studentProfile) {
        await deleteStudentAccountFromDb(studentProfile.uid);
      }
      await supabase.auth.signOut();
      setUser(null);
      setStudentProfile(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("vsb_student_profile_data");
        localStorage.removeItem("vlab_auth_token");
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
