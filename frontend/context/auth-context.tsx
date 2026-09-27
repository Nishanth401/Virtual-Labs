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
  isProfileComplete: boolean;
  loading: boolean;
  signInWithEmail: (email: string, pass: string, regNo?: string) => Promise<{ email: string; emailVerified: boolean }>;
  signUpWithEmail: (email: string, pass: string, name?: string, regNo?: string) => Promise<{ email: string; emailVerified: boolean }>;
  updateStudentRegisterNumber: (regNo: string, name?: string) => Promise<void>;
  updateStudentName: (name: string) => Promise<void>;
  completeStudentProfile: (details: {
    name: string;
    registerNumber: string;
    year: string;
    className: string;
    department?: string;
  }) => Promise<void>;
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
        checkLocalFallback();
      }
      setLoading(false);
    });

    // Listen to storage events for student form submissions
    const handleStorageChange = () => {
      checkLocalFallback();
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
    }

    return () => {
      subscription.unsubscribe();
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorageChange);
      }
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

    let existing: StudentProfile | null = null;
    try {
      existing = await getStudentProfileFromDb(currentUser.id);
      if (!existing && regNo && !regNo.startsWith("STUDENT")) {
        existing = await getStudentProfileFromDb(regNo);
      }
    } catch {
      // fallback
    }

    if (existing) {
      setStudentProfile({
        ...existing,
        profileCompleted: true
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("vsb_student_profile_data", JSON.stringify(existing));
        localStorage.setItem("vlab_active_student", JSON.stringify({
          regNo: existing.registerNumber,
          name: existing.name,
          year: existing.year,
          className: existing.className,
          department: existing.department
        }));
      }
    } else {
      let resolvedYear = currentUser.user_metadata?.year || "III Year";
      let resolvedSemester = "Semester V";
      let resolvedCohort = currentUser.user_metadata?.cohort || "III AIDS";

      if (resolvedCohort.includes("II") || resolvedYear.includes("II") || regNo.startsWith("922525")) {
        resolvedYear = "II Year";
        resolvedSemester = "Semester III";
        resolvedCohort = "II AIDS";
      } else if (resolvedCohort.includes("IV") || resolvedYear.includes("IV") || regNo.startsWith("922523")) {
        resolvedYear = "IV Year";
        resolvedSemester = "Semester VII";
        resolvedCohort = "IV AIDS";
      } else {
        resolvedYear = "III Year";
        resolvedSemester = "Semester V";
        resolvedCohort = "III AIDS";
      }

      const defaultProfile: StudentProfile = {
        uid: currentUser.id,
        name: displayName,
        registerNumber: regNo,
        email,
        department: "Artificial Intelligence & Data Science",
        year: resolvedYear,
        semester: resolvedSemester,
        cohort: resolvedCohort,
        className: resolvedCohort,
        yearSemester: `${resolvedYear} / ${resolvedSemester}`,
        profileCompleted: true,
        completedExperiments: ["bubble-sort", "stack-operations"],
        completedProblems: [],
        starredProblems: [],
        problemNotes: {},
        quizScores: {},
        feedbacks: {},
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };
      await saveStudentProfileToDb(defaultProfile);
      setStudentProfile(defaultProfile);
    }
  };

  const checkLocalFallback = () => {
    if (typeof window !== "undefined") {
      const active = localStorage.getItem("vlab_active_student");
      const local = localStorage.getItem("vsb_student_profile_data");
      if (active) {
        try {
          const act = JSON.parse(active);
          setStudentProfile({
            uid: `stu_${act.regNo || "active"}`,
            name: act.name,
            registerNumber: act.regNo,
            department: act.department || "Artificial Intelligence & Data Science",
            year: act.year || "3rd Year",
            className: act.className || "Section A",
            yearSemester: `${act.year || "3rd Year"} / ${act.className || "Section A"}`,
            collegeSlug: act.collegeSlug,
            collegeName: act.collegeName,
            profileCompleted: true,
            email: `${(act.regNo || "student").toLowerCase()}@college.edu`,
            completedExperiments: ["bubble-sort", "stack-operations"],
            completedProblems: [],
            starredProblems: [],
            problemNotes: {},
            quizScores: {},
            feedbacks: {},
            createdAt: act.timestamp || new Date().toISOString(),
            lastActive: new Date().toISOString(),
          });
          return;
        } catch {}
      }
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
    setLoading(true);
    try {
      const cleanReg = regNoOrEmail.trim().toUpperCase();
      const cleanPass = pass.trim().toUpperCase();
      const email = cleanReg.includes("@") ? cleanReg.toLowerCase() : `${cleanReg.toLowerCase()}@vsb.ac.in`;

      let authenticatedStudent: any = null;

      // 1. Try Supabase Auth signInWithPassword
      try {
        const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
          email,
          password: cleanPass
        });
        if (authData?.user) {
          await handleUserSession(authData.user);
          return { email, emailVerified: true };
        }
      } catch (authErr) {
        // Fall through to RPC verification
      }

      // 2. Try authenticate_student RPC in Supabase Postgres
      try {
        const { data: rpcData, error: rpcErr } = await supabase.rpc("authenticate_student", {
          p_reg_no: cleanReg,
          p_password: cleanPass
        });
        if (rpcData && rpcData.success && rpcData.student) {
          authenticatedStudent = rpcData.student;
        }
      } catch (rpcErr) {
        // Fall through to table query
      }

      // 3. Fallback direct query to public.students table
      if (!authenticatedStudent) {
        const { data: stRow } = await supabase
          .from("students")
          .select("*")
          .eq("register_number", cleanReg)
          .maybeSingle();

        if (stRow) {
          const passMatch =
            stRow.password.toUpperCase() === cleanPass ||
            stRow.password.replace(/\s+/g, "").toUpperCase() === cleanPass.replace(/\s+/g, "") ||
            stRow.password.replace(/\./g, "").toUpperCase() === cleanPass.replace(/\./g, "") ||
            stRow.password.replace(/[\s\.]/g, "").toUpperCase() === cleanPass.replace(/[\s\.]/g, "");
          if (passMatch) {
            authenticatedStudent = {
              registerNumber: stRow.register_number,
              name: stRow.name,
              email: stRow.email,
              year: stRow.year,
              cohort: stRow.cohort,
              className: stRow.class_name,
              department: stRow.department,
              advisor: stRow.advisor
            };
          }
        }
      }

      if (!authenticatedStudent) {
        throw new Error("Invalid Register Number or Password. Password must be your Name in CAPITAL LETTERS.");
      }

      // Set user session and profile from verified student
      const userObj: User = {
        id: authenticatedStudent.registerNumber,
        uid: authenticatedStudent.registerNumber,
        email: authenticatedStudent.email,
        displayName: authenticatedStudent.name,
        app_metadata: {},
        user_metadata: {
          name: authenticatedStudent.name,
          register_number: authenticatedStudent.registerNumber,
          year: authenticatedStudent.year,
          cohort: authenticatedStudent.cohort
        },
        aud: "authenticated",
        created_at: new Date().toISOString()
      };

      // Map year and semester accurately based on cohort/reg
      const reg = authenticatedStudent.registerNumber;
      const rawCohort = authenticatedStudent.cohort || "";
      const rawYear = authenticatedStudent.year || "";
      let resolvedYear = rawYear || "III Year";
      let resolvedSemester = "Semester V";
      let resolvedCohort = rawCohort || "III AIDS";

      if (rawCohort.includes("II") || rawYear.includes("II") || rawYear.includes("Second") || reg.startsWith("922525")) {
        resolvedYear = "II Year";
        resolvedSemester = "Semester III";
        resolvedCohort = "II AIDS";
      } else if (rawCohort.includes("IV") || rawYear.includes("IV") || rawYear.includes("Fourth") || reg.startsWith("922523")) {
        resolvedYear = "IV Year";
        resolvedSemester = "Semester VII";
        resolvedCohort = "IV AIDS";
      } else {
        resolvedYear = "III Year";
        resolvedSemester = "Semester V";
        resolvedCohort = "III AIDS";
      }

      const profileObj: StudentProfile = {
        uid: authenticatedStudent.registerNumber,
        name: authenticatedStudent.name,
        registerNumber: authenticatedStudent.registerNumber,
        email: authenticatedStudent.email,
        collegeSlug: "vsb",
        collegeName: "VSB Engineering College",
        collegeCode: "9225",
        department: authenticatedStudent.department || "Artificial Intelligence & Data Science",
        year: resolvedYear,
        semester: resolvedSemester,
        cohort: resolvedCohort,
        className: authenticatedStudent.className || resolvedCohort,
        yearSemester: `${resolvedYear} / ${resolvedSemester}`,
        advisor: authenticatedStudent.advisor,
        profileCompleted: true,
        completedExperiments: ["bubble-sort", "stack-operations"],
        completedProblems: [],
        starredProblems: [],
        problemNotes: {},
        quizScores: {},
        feedbacks: {},
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };

      setUser(userObj);
      setStudentProfile(profileObj);

      if (typeof window !== "undefined") {
        localStorage.setItem("vlab_active_student", JSON.stringify({
          regNo: authenticatedStudent.registerNumber,
          name: authenticatedStudent.name,
          year: authenticatedStudent.year,
          className: authenticatedStudent.className || authenticatedStudent.cohort,
          department: authenticatedStudent.department,
          advisor: authenticatedStudent.advisor,
          collegeSlug: "vsb",
          collegeName: "VSB Engineering College"
        }));
        localStorage.setItem("vsb_student_profile_data", JSON.stringify(profileObj));
        localStorage.setItem(`vlab_student_${authenticatedStudent.registerNumber}`, JSON.stringify(profileObj));
        window.dispatchEvent(new Event("storage"));
      }

      return { email: authenticatedStudent.email, emailVerified: true };
    } finally {
      setLoading(false);
    }
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

  const completeStudentProfile = async (details: {
    name: string;
    registerNumber: string;
    year: string;
    className: string;
    department?: string;
  }) => {
    setLoading(true);
    try {
      const cleanRegNo = details.registerNumber.trim().toUpperCase();
      const cleanName = details.name.trim();
      const cleanYear = details.year.trim();
      const cleanClass = details.className.trim();
      const dept = details.department || studentProfile?.department || "Artificial Intelligence & Data Science";
      const currentUid = user?.uid || studentProfile?.uid || "";
      const email = user?.email || studentProfile?.email || "";

      if (!currentUid) throw new Error("No active student session. Please sign in with Google first.");

      const uniqueCheck = await verifyEmailAndRegNoUnique(email, cleanRegNo, currentUid);
      if (!uniqueCheck.regNoUnique) {
        throw new Error("This Register Number is already registered with another student account.");
      }

      const updated: StudentProfile = {
        ...(studentProfile || {
          uid: currentUid,
          email,
          completedExperiments: ["bubble-sort", "stack-operations"],
          completedProblems: [],
          starredProblems: [],
          problemNotes: {},
          quizScores: {},
          feedbacks: {},
          createdAt: new Date().toISOString(),
        }),
        uid: currentUid,
        name: cleanName,
        registerNumber: cleanRegNo,
        email,
        department: dept,
        year: cleanYear,
        className: cleanClass,
        yearSemester: `${cleanYear} / ${cleanClass}`,
        profileCompleted: true,
        lastActive: new Date().toISOString()
      };

      setStudentProfile(updated);
      await saveStudentProfileToDb(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem(`vlab_student_${currentUid}`, JSON.stringify(updated));
        localStorage.setItem("vsb_student_profile_data", JSON.stringify(updated));
      }
    } finally {
      setLoading(false);
    }
  };

  const isProfileComplete = Boolean(
    studentProfile?.profileCompleted || (
      studentProfile?.registerNumber &&
      !studentProfile.registerNumber.startsWith("STUDENT") &&
      studentProfile?.className &&
      studentProfile?.year &&
      studentProfile?.name
    )
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        student: studentProfile,
        studentProfile,
        isProfileComplete,
        loading,
        signInWithEmail,
        signUpWithEmail,
        updateStudentRegisterNumber,
        updateStudentName,
        completeStudentProfile,
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
