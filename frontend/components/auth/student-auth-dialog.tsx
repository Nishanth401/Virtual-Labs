"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  GraduationCap,
  Calendar,
  School,
  LogOut,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  AlertCircle,
  FlaskConical,
  Loader2
} from "lucide-react";

import {
  saveStudentProfileToDb,
  verifyEmailAndRegNoUnique,
  StudentProfile
} from "@/lib/supabase";

interface StudentAuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudentAuthDialog({ open, onOpenChange }: StudentAuthDialogProps) {
  const router = useRouter();
  const auth = useAuth();
  const {
    user,
    studentProfile,
    isProfileComplete,
    completeStudentProfile,
    loginWithRegisterNumber,
    logout,
    deleteAccount,
    loading
  } = auth || {};

  const [loginRegNo, setLoginRegNo] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [selectedCohort, setSelectedCohort] = useState<"II AIDS" | "III AIDS" | "IV AIDS">("III AIDS");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const clean = loginRegNo.trim();
    if (clean.startsWith("922525")) {
      setSelectedCohort("II AIDS");
    } else if (clean.startsWith("922524") || clean.startsWith("92252423")) {
      setSelectedCohort("III AIDS");
    } else if (clean.startsWith("922523")) {
      setSelectedCohort("IV AIDS");
    }
  }, [loginRegNo]);

  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [year, setYear] = useState("III Year");
  const [className, setClassName] = useState("AIDS - A");
  const [customClass, setCustomClass] = useState("");
  const [isCustomClass, setIsCustomClass] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit name state
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [nameSuccess, setNameSuccess] = useState(false);

  const isAuthenticated = Boolean(user || studentProfile);

  useEffect(() => {
    if (user) {
      setName(user.displayName || studentProfile?.name || "");
      if (studentProfile?.registerNumber && !studentProfile.registerNumber.startsWith("STUDENT")) {
        setRegNo(studentProfile.registerNumber);
      }
      if (studentProfile?.year) {
        setYear(studentProfile.year);
      }
      if (studentProfile?.className) {
        setClassName(studentProfile.className);
      }
    }
  }, [user, studentProfile]);

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const defaultReg = selectedCohort === "III AIDS" ? "92252423172" : selectedCohort === "IV AIDS" ? "922523243001" : "922525243001";
    const defaultPass = selectedCohort === "III AIDS" ? "ROHITH E" : selectedCohort === "IV AIDS" ? "S.AARTHI" : "ABINAYA G";
    const cleanReg = (loginRegNo.trim() || defaultReg).toUpperCase();
    const cleanPass = (loginPassword.trim() || defaultPass).toUpperCase();

    if (!cleanReg) {
      setErrorMsg("Please enter your official Register Number.");
      return;
    }
    if (!cleanPass) {
      setErrorMsg("Please enter your Password (Name in CAPITAL LETTERS).");
      return;
    }

    setIsSubmitting(true);
    try {
      if (typeof loginWithRegisterNumber === "function") {
        await loginWithRegisterNumber(cleanReg, cleanPass);
      }
      onOpenChange(false);
      router.push("/dashboard");
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid Register Number or Password. Password must be your Name in ALL CAPS.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileCompletionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!name.trim()) {
      setErrorMsg("Please enter your full student name.");
      return;
    }
    if (!regNo.trim()) {
      setErrorMsg("Please enter your official Register Number to proceed.");
      return;
    }

    const selectedClass = isCustomClass ? customClass.trim() : className.trim();
    if (!selectedClass) {
      setErrorMsg("Please select or enter your class/section.");
      return;
    }

    const cleanName = name.trim();
    const cleanRegNo = regNo.trim().toUpperCase();
    const cleanYear = year.trim();

    setIsSubmitting(true);
    try {
      if (typeof completeStudentProfile === "function") {
        await completeStudentProfile({
          name: cleanName,
          registerNumber: cleanRegNo,
          year: cleanYear,
          className: selectedClass,
          department: "Artificial Intelligence & Data Science"
        });
      } else {
        const currentUid = user?.uid || studentProfile?.uid || "";
        const email = user?.email || studentProfile?.email || "";
        if (!currentUid) throw new Error("No active student session. Please sign in first.");

        const uniqueCheck = await verifyEmailAndRegNoUnique(email, cleanRegNo, currentUid);
        if (!uniqueCheck.regNoUnique) {
          throw new Error("This Register Number is already registered with another student account.");
        }

        const updated: StudentProfile = {
          ...(studentProfile || {
            uid: currentUid,
            email,
            completedExperiments: [],
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
          department: "Artificial Intelligence & Data Science",
          year: cleanYear,
          className: selectedClass,
          yearSemester: `${cleanYear} / ${selectedClass}`,
          profileCompleted: true,
          lastActive: new Date().toISOString()
        };

        await saveStudentProfileToDb(updated);
        if (typeof window !== "undefined") {
          localStorage.setItem(`vlab_student_${currentUid}`, JSON.stringify(updated));
          localStorage.setItem("vsb_student_profile_data", JSON.stringify(updated));
        }
      }

      onOpenChange(false);
      router.push("/labs");
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to save details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setConfirmDeleteAccount(false);
  };

  const handleDeleteAccount = async () => {
    setErrorMsg("");
    try {
      await deleteAccount();
      setConfirmDeleteAccount(false);
      onOpenChange(false);
      router.push("/");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete account. Please try again.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val);
        if (!val) {
          setConfirmDeleteAccount(false);
          setErrorMsg("");
        }
      }}
    >
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white dark:bg-card/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl [&>button]:hidden sm:[&>button]:block">
        {confirmDeleteAccount ? (
          /* ============================================================== */
          /* 1. CONFIRM DELETE ACCOUNT SCREEN                               */
          /* ============================================================== */
          <div className="p-6 space-y-5">
            <DialogHeader className="space-y-1.5 text-center">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mb-1">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <DialogTitle className="text-xl font-bold font-heading text-rose-600 dark:text-rose-500">
                Delete Account Permanently?
              </DialogTitle>
              <DialogDescription className="text-xs text-foreground/90 leading-relaxed pt-1">
                Are you sure you want to delete your account? All your experiment progress, notes, certificates, and bound Register Number will be permanently erased.
              </DialogDescription>
            </DialogHeader>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <div className="space-y-2 pt-2">
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={loading}
                className="w-full text-xs font-bold py-2.5 gap-2 cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                <span>{loading ? "Deleting..." : "Yes, Delete Account Permanently"}</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => setConfirmDeleteAccount(false)}
                className="w-full text-xs border-border"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : isAuthenticated && !isProfileComplete ? (
          /* ============================================================== */
          /* 2. GOOGLE AUTHENTICATED - PROFILE ONBOARDING FORM              */
          /* ============================================================== */
          <div className="p-6 space-y-5">
            <DialogHeader className="space-y-1.5 text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center mb-1">
                <img
                  src="/virtual-lab-icon.png"
                  alt="Virtual Lab"
                  className="w-12 h-12 object-contain rounded-lg shadow-sm"
                />
              </div>
              <div className="flex justify-center">
                <Badge variant="outline" className="text-[10px] font-mono uppercase bg-primary/10 text-primary border-primary/25">
                  Academic Profile Setup
                </Badge>
              </div>
              <DialogTitle className="text-xl font-bold font-heading text-foreground">
                Complete Student Details
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground leading-relaxed pt-0.5">
                Please confirm your name, register number, year, and class to open the Virtual Labs.
              </DialogDescription>
            </DialogHeader>

            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleProfileCompletionSubmit} className="space-y-4 text-left font-sans">
              {/* 1. Student Name */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-primary" />
                  <span>Student Full Name</span>
                </Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rohith E"
                  className="text-xs bg-muted/30 border-border"
                  required
                />
              </div>

              {/* 2. Register Number */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-primary" />
                  <span>Register Number</span>
                </Label>
                <Input
                  type="text"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  placeholder="e.g. 922521104001"
                  className="text-xs font-mono uppercase bg-muted/30 border-border"
                  required
                />
              </div>

              {/* 3. Year of Study */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span>Year of Study</span>
                </Label>
                <div className="grid grid-cols-4 gap-1.5">
                  {["I Year", "II Year", "III Year", "IV Year"].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setYear(y)}
                      className={`py-1.5 px-1 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        year === y
                          ? "bg-primary text-white border-primary shadow-xs font-bold"
                          : "bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/60 border-border/70"
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Class & Section */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold flex items-center gap-1.5">
                    <School className="h-3.5 w-3.5 text-primary" />
                    <span>Class &amp; Section</span>
                  </Label>
                  <button
                    type="button"
                    onClick={() => setIsCustomClass(!isCustomClass)}
                    className="text-[10px] text-primary hover:underline font-mono"
                  >
                    {isCustomClass ? "Choose preset" : "+ Custom class"}
                  </button>
                </div>

                {isCustomClass ? (
                  <Input
                    type="text"
                    value={customClass}
                    onChange={(e) => setCustomClass(e.target.value)}
                    placeholder="e.g. AIDS - A, CSE - B, IT..."
                    className="text-xs bg-muted/30 border-border"
                    required
                  />
                ) : (
                  <div className="grid grid-cols-3 gap-1.5">
                    {["AIDS - A", "AIDS - B", "CSE - A", "CSE - B", "IT", "ECE - A"].map((cls) => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => setClassName(cls)}
                        className={`py-1.5 px-1 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                          className === cls
                            ? "bg-primary text-white border-primary shadow-xs font-bold"
                            : "bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/60 border-border/70"
                        }`}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full h-11 mt-2 bg-gradient-to-r from-[#ff2a5f] to-[#dc2626] hover:from-[#e11d48] hover:to-[#b91c1c] text-white text-xs font-bold rounded-xl shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Activating Virtual Lab...</span>
                  </>
                ) : (
                  <>
                    <span>Save Details &amp; Open Virtual Lab</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        ) : isAuthenticated && isProfileComplete ? (
          /* ============================================================== */
          /* 3. LOGGED IN STUDENT PROFILE VIEW (VERIFIED)                   */
          /* ============================================================== */
          <div className="p-6 space-y-5">
            <DialogHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-500 border-emerald-500/30 gap-1 font-mono">
                  <ShieldCheck className="h-3.5 w-3.5" /> Authenticated Student
                </Badge>
                <Badge variant="secondary" className="text-[10px] font-mono font-bold text-primary">
                  {studentProfile?.registerNumber || "VERIFIED"}
                </Badge>
              </div>

              {editingName ? (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newName.trim()) return;
                    if (studentProfile) {
                      await completeStudentProfile({
                        name: newName.trim(),
                        registerNumber: studentProfile.registerNumber,
                        year: studentProfile.year || "III Year",
                        className: studentProfile.className || "AIDS - A"
                      });
                    }
                    setEditingName(false);
                    setNameSuccess(true);
                    setTimeout(() => setNameSuccess(false), 3000);
                  }}
                  className="flex gap-2 pt-2"
                >
                  <div className="relative flex-1">
                    <User className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
                    <Input
                      autoFocus
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Enter your full name"
                      className="pl-9 text-xs h-9"
                      required
                    />
                  </div>
                  <Button type="submit" size="sm" disabled={loading} className="text-xs bg-primary text-white px-3 h-9">
                    Save
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => setEditingName(false)} className="text-xs px-3 h-9">
                    ✕
                  </Button>
                </form>
              ) : (
                <div className="flex items-center gap-2 pt-1">
                  <DialogTitle className="text-xl font-bold font-heading text-foreground">
                    {studentProfile?.name || user?.displayName || "Student"}
                  </DialogTitle>
                  <button
                    type="button"
                    onClick={() => { setNewName(studentProfile?.name || user?.displayName || ""); setEditingName(true); setNameSuccess(false); }}
                    className="text-[10px] text-muted-foreground hover:text-primary border border-border rounded px-1.5 py-0.5 font-mono transition-colors cursor-pointer"
                    title="Edit your name"
                  >
                    ✎ edit
                  </button>
                </div>
              )}

              {nameSuccess && (
                <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Name updated!
                </p>
              )}

              <DialogDescription className="text-xs text-muted-foreground font-mono">
                {studentProfile?.year} • {studentProfile?.className} • AI &amp; DS
              </DialogDescription>
            </DialogHeader>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-muted/50 border border-border/60">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">
                  Register Number
                </span>
                <span className="text-xs font-black text-primary font-mono truncate block">
                  {studentProfile?.registerNumber || "Verified"}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-muted/50 border border-border/60">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">
                  Year &amp; Class
                </span>
                <span className="text-xs font-black text-emerald-500 font-mono truncate block">
                  {studentProfile?.year ? `${studentProfile.year} / ${studentProfile.className}` : "Active"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-[#ff2a5f] to-[#dc2626] hover:from-[#e11d48] hover:to-[#b91c1c] text-white text-xs font-bold gap-2 py-5 rounded-xl shadow-lg shadow-red-500/25 cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                <Link href="/labs">
                  <span>Enter Virtual Labs</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full text-xs text-slate-700 dark:text-slate-300 hover:bg-muted gap-1.5 border-border"
                >
                  <LogOut className="h-3.5 w-3.5" /> Sign Out
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setConfirmDeleteAccount(true)}
                  className="w-full text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 gap-1.5 border-rose-500/30"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete Account
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* 4. LOGIN MODAL - REGISTER NUMBER & PASSWORD (CAPS LOCK)        */
          /* ============================================================== */
          <div className="p-6 space-y-5">
            <DialogHeader className="space-y-1.5 text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center mb-1">
                <img
                  src="/virtual-lab-icon.png"
                  alt="Virtual Lab"
                  className="w-12 h-12 object-contain rounded-lg shadow-sm"
                />
              </div>
              <div className="flex justify-center">
                <Badge variant="outline" className="text-[10px] font-mono uppercase bg-primary/10 text-primary border-primary/20">
                  Student Portal Authentication
                </Badge>
              </div>
              <DialogTitle className="text-xl font-bold font-heading text-foreground">
                VSB Virtual Labs
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
                Sign in with your Register Number and Name in CAPITAL LETTERS.
              </DialogDescription>
            </DialogHeader>

            {/* Cohort Tabs: Ordered 2nd year, 3rd year, 4th year */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-muted/40 rounded-xl border border-border/60">
              {(["II AIDS", "III AIDS", "IV AIDS"] as const).map((cohort) => {
                const isSelected = selectedCohort === cohort;
                return (
                  <button
                    key={cohort}
                    type="button"
                    onClick={() => {
                      setSelectedCohort(cohort);
                      setErrorMsg("");
                    }}
                    className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
                      isSelected
                        ? "bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border border-teal-500/40 shadow-xs ring-1 ring-teal-500/30"
                        : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/70 border border-transparent"
                    }`}
                  >
                    {cohort}
                  </button>
                );
              })}
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleStudentLogin} className="space-y-3.5 text-left">
              <div className="space-y-1">
                <Label className="text-xs font-semibold flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-primary" />
                  <span>Register Number</span>
                </Label>
                <Input
                  type="text"
                  value={loginRegNo}
                  onChange={(e) => setLoginRegNo(e.target.value.toUpperCase())}
                  placeholder={
                    selectedCohort === "III AIDS"
                      ? "92252423172"
                      : selectedCohort === "IV AIDS"
                      ? "922523243001"
                      : "922525243001"
                  }
                  className="text-xs font-mono uppercase bg-muted/20 border-border h-10 placeholder:text-muted-foreground/60 placeholder:font-mono tracking-wider"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold flex items-center gap-1.5">
                    <span>Password (Name in CAPS)</span>
                  </Label>
                  <span className="text-[9px] font-mono uppercase text-amber-600 bg-amber-500/10 px-1 rounded">
                    Caps Lock
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value.toUpperCase())}
                    placeholder={
                      selectedCohort === "III AIDS"
                        ? "ROHITH E"
                        : selectedCohort === "IV AIDS"
                        ? "S.AARTHI"
                        : "ABINAYA G"
                    }
                    className="text-xs font-mono uppercase bg-muted/20 border-border h-10 pr-9 placeholder:text-muted-foreground/60 placeholder:font-mono tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground cursor-pointer text-xs"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full h-11 mt-1 bg-gradient-to-r from-[#ff2a5f] to-[#dc2626] hover:from-[#e11d48] hover:to-[#b91c1c] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verifying Student...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Virtual Labs</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
