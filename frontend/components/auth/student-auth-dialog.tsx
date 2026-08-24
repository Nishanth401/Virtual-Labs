"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Lock,
  Mail,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  LogOut,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Building2,
  BookOpen
} from "lucide-react";

interface StudentAuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudentAuthDialog({ open, onOpenChange }: StudentAuthDialogProps) {
  const {
    user,
    studentProfile,
    loginWithRegisterNumber,
    registerWithRegisterNumber,
    loginWithGoogle,
    logout,
    loading
  } = useAuth();

  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("Artificial Intelligence & Data Science");
  const [yearSemester, setYearSemester] = useState("Year III / Semester VI");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!regNo.trim() || !password.trim()) {
      setErrorMsg("Please enter your Register Number and Password.");
      return;
    }
    try {
      await loginWithRegisterNumber(regNo, password);
      onOpenChange(false);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to login. Please check your credentials.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!name.trim() || !regNo.trim() || !password.trim()) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }
    try {
      await registerWithRegisterNumber(name, regNo, password, department, yearSemester);
      onOpenChange(false);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create student account.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      onOpenChange(false);
    } catch (err: any) {
      setErrorMsg("Google Sign-In failed.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white dark:bg-card/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl">
        {studentProfile ? (
          /* ============================================================== */
          /* LOGGED IN STUDENT PROFILE VIEW                                */
          /* ============================================================== */
          <div className="p-6 space-y-5">
            <DialogHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-500 border-emerald-500/30 gap-1 font-mono">
                  <ShieldCheck className="h-3.5 w-3.5" /> Authenticated Student
                </Badge>
                <Badge variant="secondary" className="text-[10px] font-mono">
                  VSB AI &amp; DS
                </Badge>
              </div>
              <DialogTitle className="text-xl font-bold font-heading text-foreground pt-1">
                {studentProfile.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground font-mono">
                Reg No: {studentProfile.registerNumber} • {studentProfile.yearSemester}
              </DialogDescription>
            </DialogHeader>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-muted/50 border border-border/60">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">
                  Completed Labs
                </span>
                <span className="text-xl font-black text-primary font-mono">
                  {studentProfile.completedExperiments.length}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-muted/50 border border-border/60">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">
                  Quizzes Passed
                </span>
                <span className="text-xl font-black text-amber-500 font-mono">
                  {Object.keys(studentProfile.quizScores || {}).length}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold gap-2"
                onClick={() => onOpenChange(false)}
              >
                <Link href="/dashboard">
                  <span>Open Student Learning Dashboard &amp; Certificates</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={async () => {
                  await logout();
                  onOpenChange(false);
                }}
                className="w-full text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 gap-2 border-border"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </Button>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* LOGIN / REGISTRATION MODAL                                    */
          /* ============================================================== */
          <div className="p-6 space-y-5">
            <DialogHeader className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border border-yellow-400 p-0.5 bg-white shrink-0">
                  <img src="/vsb-logo.png" alt="VSB College" className="w-full h-full object-contain" />
                </div>
                <Badge variant="outline" className="text-[10px] font-mono uppercase bg-primary/10 text-primary border-primary/20">
                  Student Portal Authentication
                </Badge>
              </div>
              <DialogTitle className="text-xl font-bold font-heading text-foreground">
                VSB Virtual Labs Login
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
                Sign in to save your lab experiment completions, code runs, and self-assessment certificates.
              </DialogDescription>
            </DialogHeader>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {/* Google One-Click Sign-In */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-5 rounded-xl border-border bg-white dark:bg-card hover:bg-muted font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
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
            </Button>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-[1px] flex-1 bg-border/60" />
              <span className="font-mono text-[10px] uppercase">Or Student Register No</span>
              <div className="h-[1px] flex-1 bg-border/60" />
            </div>

            {/* Tabs for Login vs Register */}
            <Tabs value={authTab} onValueChange={(v) => setAuthTab(v as any)} className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-3 bg-muted/60 p-1">
                <TabsTrigger value="login" className="text-xs py-1.5 font-bold">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="register" className="text-xs py-1.5 font-bold">
                  Register New
                </TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold">Student Register Number</Label>
                    <div className="relative">
                      <GraduationCap className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
                      <Input
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                        placeholder="e.g. 922521104001"
                        className="pl-9 text-xs font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold">Password</Label>
                    <div className="relative">
                      <Lock className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-9 text-xs"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2 mt-2"
                  >
                    {loading ? "Authenticating..." : "Sign In to Laboratory"}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-2.5">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold">Full Student Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rohith E"
                      className="text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold">Register Number</Label>
                    <Input
                      value={regNo}
                      onChange={(e) => setRegNo(e.target.value)}
                      placeholder="e.g. 922521104001"
                      className="text-xs font-mono"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold">Password</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="text-xs"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">Department</Label>
                      <Input
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">Year / Sem</Label>
                      <Input
                        value={yearSemester}
                        onChange={(e) => setYearSemester(e.target.value)}
                        className="text-[11px]"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2 mt-2"
                  >
                    {loading ? "Creating Profile..." : "Create Student Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
