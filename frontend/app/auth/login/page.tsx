"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
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
  GraduationCap,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  KeyRound,
  CheckCircle2
} from "lucide-react";

type CohortType = "II AIDS" | "III AIDS" | "IV AIDS";

const COHORT_CONFIG: Record<
  CohortType,
  {
    label: string;
    year: string;
    semester: string;
    batch: string;
    sampleReg: string;
    sampleName: string;
    prefix: string;
  }
> = {
  "II AIDS": {
    label: "II AIDS",
    year: "Second Year",
    semester: "Semester III",
    batch: "2025 - 2029 Batch",
    sampleReg: "922525243001",
    sampleName: "ABINAYA G",
    prefix: "922525"
  },
  "III AIDS": {
    label: "III AIDS",
    year: "Third Year",
    semester: "Semester V",
    batch: "2024 - 2028 Batch",
    sampleReg: "92252423172",
    sampleName: "ROHITH E",
    prefix: "922524"
  },
  "IV AIDS": {
    label: "IV AIDS",
    year: "Fourth Year",
    semester: "Semester VII / Capstone",
    batch: "2023 - 2027 Batch",
    sampleReg: "922523243001",
    sampleName: "S.AARTHI",
    prefix: "922523"
  }
};

export default function AuthLoginPage() {
  const router = useRouter();
  const {
    user,
    studentProfile,
    loginWithRegisterNumber,
    logout,
    loading: authLoading
  } = useAuth();

  // 1. Ordered cohorts: 2nd year, 3rd year, 4th year
  // 2. Default Register Number: 92252423172
  // 3. Default Password (Name in CAPS): ROHITH E
  const [selectedCohort, setSelectedCohort] = useState<CohortType>("III AIDS");
  const [registerNumber, setRegisterNumber] = useState("92252423172");
  const [password, setPassword] = useState("ROHITH E");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Auto-detect cohort as student types register number
  useEffect(() => {
    const clean = registerNumber.trim();
    if (clean.startsWith("922525")) {
      setSelectedCohort("II AIDS");
    } else if (clean.startsWith("922524") || clean.startsWith("92252423")) {
      setSelectedCohort("III AIDS");
    } else if (clean.startsWith("922523")) {
      setSelectedCohort("IV AIDS");
    }
  }, [registerNumber]);

  // Check caps lock status on keydown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState && e.getModifierState("CapsLock")) {
      setCapsLockActive(true);
    } else {
      setCapsLockActive(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const cleanReg = registerNumber.trim().toUpperCase();
    const cleanPass = password.trim().toUpperCase();

    if (!cleanReg) {
      setErrorMsg("Please enter your official Register Number.");
      return;
    }
    if (!cleanPass) {
      setErrorMsg("Please enter your Password (Name in CAPITAL LETTERS).");
      return;
    }

    setSubmitting(true);
    try {
      await loginWithRegisterNumber(cleanReg, cleanPass);
      setSuccessMsg("Authentication verified! Loading your student dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    } catch (err: any) {
      setErrorMsg(
        err?.message ||
          "Invalid Register Number or Password. Password must be your Name in CAPITAL LETTERS."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {/* Main container with generous top spacing to prevent navbar overlap (fixes edge case in Image 1) */}
      <main className="flex-1 flex flex-col items-center justify-start pt-44 sm:pt-48 pb-20 px-4">
        <div className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-card border border-border shadow-2xl rounded-2xl space-y-6">
          
          {/* Header Brand */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 mb-1">
              <img
                src="/virtual-lab-icon.png"
                alt="Virtual Lab"
                className="w-14 h-14 object-contain rounded-xl shadow-md"
              />
            </div>

            <div className="flex justify-center">
              <Badge variant="outline" className="text-[10px] font-mono uppercase bg-primary/10 text-primary border-primary/20">
                Department Virtual Labs Portal
              </Badge>
            </div>

            <h1 className="text-2xl font-bold font-heading text-foreground">
              Student Authentication
            </h1>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
              V.S.B. Engineering College • Dept. of AI &amp; DS
            </p>
          </div>

          {/* ======================================================== */}
          {/* 1. STUDENT ALREADY LOGGED IN                             */}
          {/* ======================================================== */}
          {user || studentProfile ? (
            <div className="space-y-4 pt-1">
              <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1 font-mono">
                    <ShieldCheck className="h-3.5 w-3.5" /> Authenticated Student
                  </Badge>
                  <span className="text-xs font-mono text-primary font-bold">
                    {studentProfile?.registerNumber || user?.email?.split("@")[0].toUpperCase()}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-base font-bold text-foreground">
                    {studentProfile?.name || user?.displayName || "Student"}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {studentProfile?.className || studentProfile?.year || "Dept. of AI & DS"}
                    {studentProfile?.year && ` • ${studentProfile.year}`}
                    {studentProfile?.yearSemester && ` (${studentProfile.yearSemester})`}
                  </p>
                  {studentProfile?.advisor && (
                    <p className="text-[11px] text-muted-foreground">
                      <span className="font-semibold text-foreground/80">Advisor:</span> {studentProfile.advisor}
                    </p>
                  )}
                  <p className="text-[11px] text-muted-foreground font-mono pt-0.5">
                    {studentProfile?.email || user?.email}
                  </p>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-gradient-to-r from-[#ff2a5f] to-[#dc2626] hover:from-[#e11d48] hover:to-[#b91c1c] text-white text-xs font-bold gap-2 py-5 rounded-xl shadow-lg shadow-red-500/25 cursor-pointer"
              >
                <Link href="/dashboard">
                  <span>Enter Student Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full text-xs hover:bg-muted gap-1.5 border-border"
                >
                  <Link href="/labs">
                    <BookOpen className="h-3.5 w-3.5" /> Virtual Labs
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  onClick={async () => {
                    await logout();
                  }}
                  className="w-full text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 gap-1.5 border-border"
                >
                  <LogOut className="h-3.5 w-3.5" /> Sign Out
                </Button>
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* 2. REGISTER NUMBER & PASSWORD (CAPS LOCK) LOGIN FORM     */
            /* ======================================================== */
            <div className="space-y-5 pt-1">
              
              {/* Cohort Tabs: Ordered 2nd year, 3rd year, 4th year */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between px-0.5">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Select AIDS Cohort:
                  </span>
                  <span className="text-[10px] text-primary font-semibold font-mono">
                    {COHORT_CONFIG[selectedCohort].semester}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 p-1 bg-muted/40 rounded-xl border border-border/60">
                  {(["II AIDS", "III AIDS", "IV AIDS"] as CohortType[]).map((cohort) => {
                    const isSelected = selectedCohort === cohort;
                    return (
                      <button
                        key={cohort}
                        type="button"
                        onClick={() => {
                          setSelectedCohort(cohort);
                          setErrorMsg("");
                        }}
                        className={`py-2 px-2 text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
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
              </div>

              {/* Error / Success Notifications */}
              {errorMsg && (
                <div className="p-3 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-xl font-medium flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 text-xs text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 rounded-xl font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                
                {/* 1. Register Number Input (Default: 92252423172) */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold flex items-center gap-1.5 text-foreground">
                      <GraduationCap className="h-3.5 w-3.5 text-primary" />
                      <span>Register Number</span>
                    </Label>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      Official Reg No
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      type="text"
                      value={registerNumber}
                      onChange={(e) => setRegisterNumber(e.target.value.toUpperCase())}
                      onKeyDown={handleKeyDown}
                      placeholder={COHORT_CONFIG[selectedCohort].sampleReg}
                      className="text-xs font-mono uppercase bg-muted/30 border-border h-11 pl-3 pr-8 focus:ring-1 focus:ring-primary"
                      required
                      autoComplete="username"
                    />
                    {registerNumber && (
                      <span className="absolute right-3 top-3 text-[10px] text-muted-foreground font-mono">
                        {registerNumber.length}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Password (Name in CAPS LOCK) Input (Default: ROHITH E) */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold flex items-center gap-1.5 text-foreground">
                      <Lock className="h-3.5 w-3.5 text-primary" />
                      <span>Password (Name in CAPS)</span>
                    </Label>
                    <Badge variant="outline" className="text-[9px] font-mono uppercase text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30">
                      Caps Lock
                    </Badge>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value.toUpperCase())}
                      onKeyDown={handleKeyDown}
                      placeholder={COHORT_CONFIG[selectedCohort].sampleName}
                      className="text-xs font-mono uppercase bg-muted/30 border-border h-11 pl-3 pr-10 focus:ring-1 focus:ring-primary"
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  
                  {/* Caps Lock Indicator */}
                  {capsLockActive && (
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1 font-mono pt-0.5">
                      <KeyRound className="h-3 w-3" /> Caps Lock is ON
                    </p>
                  )}
                </div>

                {/* Submit Action */}
                <Button
                  type="submit"
                  disabled={submitting || authLoading}
                  className="w-full h-11 bg-gradient-to-r from-[#ff2a5f] to-[#dc2626] hover:from-[#e11d48] hover:to-[#b91c1c] text-white text-xs font-bold rounded-xl shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Verifying Student Record...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Virtual Labs</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Data Linking Badges */}
              <div className="pt-2 border-t border-border/60 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block text-center">
                  Department Verified Cloud Records
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
                    <span className="text-[10px] font-medium text-foreground block">Postgres Sync</span>
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
