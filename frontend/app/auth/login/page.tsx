"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  ArrowRight,
  LogOut,
  Loader2,
  Database,
  Code2,
  BookOpen,
  User,
  GraduationCap,
  Calendar,
  School,
  CheckCircle2,
  FlaskConical,
  AlertCircle
} from "lucide-react";

export default function AuthLoginPage() {
  const router = useRouter();
  const {
    user,
    studentProfile,
    isProfileComplete,
    completeStudentProfile,
    loginWithGoogle,
    logout,
    loading: authLoading
  } = useAuth();

  const [signingIn, setSigningIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form states for profile completion
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [year, setYear] = useState("III Year");
  const [className, setClassName] = useState("AIDS - A");
  const [customClass, setCustomClass] = useState("");
  const [isCustomClass, setIsCustomClass] = useState(false);
  const [savingDetails, setSavingDetails] = useState(false);

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

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setSigningIn(true);
    try {
      await loginWithGoogle();
      // On web OAuth, the browser redirects automatically to Google
    } catch (err: any) {
      console.error("Google sign in error:", err);
      setErrorMsg("Google Sign-In failed or was cancelled. Please try again.");
      setSigningIn(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your full student name.");
      return;
    }
    if (!regNo.trim()) {
      setErrorMsg("Please enter your official Register Number.");
      return;
    }

    const selectedClass = isCustomClass ? customClass.trim() : className.trim();
    if (!selectedClass) {
      setErrorMsg("Please select or enter your class/section.");
      return;
    }

    setSavingDetails(true);
    try {
      await completeStudentProfile({
        name: name.trim(),
        registerNumber: regNo.trim().toUpperCase(),
        year: year.trim(),
        className: selectedClass,
        department: "Artificial Intelligence & Data Science"
      });

      // After saving profile, redirect to Virtual Labs!
      router.push("/labs");
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to save profile details. Please try again.");
    } finally {
      setSavingDetails(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-card border border-border shadow-2xl rounded-2xl space-y-6">
          
          {/* Header Brand */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ff2a5f] to-[#dc2626] text-white mb-1 shadow-lg shadow-red-500/20">
              <FlaskConical className="h-7 w-7" />
            </div>

            <div className="flex justify-center">
              <Badge variant="outline" className="text-[10px] font-mono uppercase bg-primary/10 text-primary border-primary/20">
                Department Virtual Labs Portal
              </Badge>
            </div>

            <h1 className="text-2xl font-bold font-heading text-foreground">
              {user && !isProfileComplete ? "Complete Student Details" : "Student Authentication"}
            </h1>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
              V.S.B. Engineering College • Dept. of AI &amp; DS
            </p>
          </div>

          {/* Error message display if any */}
          {errorMsg && (
            <div className="p-3 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-xl text-center font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* 1. USER LOGGED IN BUT MISSING PROFILE DETAILS            */}
          {/* ======================================================== */}
          {user && !isProfileComplete ? (
            <form onSubmit={handleProfileSubmit} className="space-y-4 pt-1 text-left font-sans">
              <div className="p-3 bg-muted/40 border border-border/60 rounded-xl text-xs space-y-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Google Account:</span>
                  <Badge variant="outline" className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 border-emerald-500/25">
                    Connected
                  </Badge>
                </div>
                <p className="font-mono text-[11px] text-foreground font-semibold truncate">
                  {user.email}
                </p>
              </div>

              {/* 1. Student Name */}
              <div className="space-y-1.5">
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
              <div className="space-y-1.5">
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
              <div className="space-y-1.5">
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
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
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
              <div className="space-y-1.5">
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
                        className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
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
                disabled={savingDetails || authLoading}
                className="w-full h-11 mt-2 bg-gradient-to-r from-[#ff2a5f] to-[#dc2626] hover:from-[#e11d48] hover:to-[#b91c1c] text-white text-xs font-bold rounded-xl shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {savingDetails ? (
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

              <Button
                type="button"
                variant="ghost"
                onClick={async () => await logout()}
                className="w-full text-xs text-muted-foreground hover:text-foreground"
              >
                Cancel / Sign in with different account
              </Button>
            </form>
          ) : user && isProfileComplete ? (
            /* ======================================================== */
            /* 2. USER ALREADY COMPLETED DETAILS                        */
            /* ======================================================== */
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-500 border-emerald-500/30 gap-1 font-mono">
                    <ShieldCheck className="h-3.5 w-3.5" /> Authenticated Student
                  </Badge>
                  <span className="text-[11px] font-mono text-primary font-bold">
                    {studentProfile?.registerNumber || "VERIFIED"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {studentProfile?.name || user.displayName || "Active Student"}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {studentProfile?.year} • {studentProfile?.className}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-mono truncate pt-0.5">
                    {user.email}
                  </p>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-gradient-to-r from-[#ff2a5f] to-[#dc2626] hover:from-[#e11d48] hover:to-[#b91c1c] text-white text-xs font-bold gap-2 py-5 rounded-xl shadow-lg shadow-red-500/25 cursor-pointer"
              >
                <Link href="/labs">
                  <span>Enter Virtual Labs</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={async () => {
                  await logout();
                }}
                className="w-full text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 gap-2 border-border"
              >
                <LogOut className="h-3.5 w-3.5" /> Switch Account / Sign Out
              </Button>
            </div>
          ) : (
            /* ======================================================== */
            /* 3. READY TO SIGN IN WITH GOOGLE                          */
            /* ======================================================== */
            <div className="space-y-6 pt-2">
              <p className="text-xs text-center text-muted-foreground leading-relaxed">
                Sign in with your Google account to access all interactive laboratory experiments, Java simulators, and DSA problem assessments.
              </p>

              {/* Single Continue with Google Button */}
              <Button
                type="button"
                variant="outline"
                disabled={signingIn || authLoading}
                onClick={handleGoogleSignIn}
                className="w-full h-12 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-foreground border border-slate-300 dark:border-slate-700 font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                {signingIn ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span>Connecting to Google...</span>
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </Button>

              {/* Data Persistence Features */}
              <div className="pt-2 border-t border-border/60 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block text-center">
                  Automatic Student Record Linking
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-muted/40 border border-border/40">
                    <BookOpen className="h-4 w-4 mx-auto mb-1 text-primary" />
                    <span className="text-[10px] font-medium text-foreground block">Lab Records</span>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/40 border border-border/40">
                    <Code2 className="h-4 w-4 mx-auto mb-1 text-emerald-500" />
                    <span className="text-[10px] font-medium text-foreground block">DSA Sheets</span>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/40 border border-border/40">
                    <Database className="h-4 w-4 mx-auto mb-1 text-indigo-500" />
                    <span className="text-[10px] font-medium text-foreground block">Cloud Verified</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
