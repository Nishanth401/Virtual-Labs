"use client";

import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Lock,
  Mail,
  CheckCircle2,
  LogOut,
  ArrowRight,
  ShieldCheck,
  MailCheck,
  GraduationCap,
  Trash2,
  AlertTriangle
} from "lucide-react";

interface StudentAuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudentAuthDialog({ open, onOpenChange }: StudentAuthDialogProps) {
  const router = useRouter();
  const {
    user,
    studentProfile,
    signInWithEmail,
    signUpWithEmail,
    updateStudentRegisterNumber,
    updateStudentName,
    loginWithGoogle,
    logout,
    deleteAccount,
    loading
  } = useAuth();

  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);

  // Google 2nd step state for Register Number
  const [googleRegNoStep, setGoogleRegNoStep] = useState(false);
  const [googleRegNo, setGoogleRegNo] = useState("");
  const [googleName, setGoogleName] = useState("");

  // Edit name state (for logged-in profile panel)
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [nameSuccess, setNameSuccess] = useState(false);

  const isAuthenticated = Boolean(user || studentProfile);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email.trim() || !password.trim() || !regNo.trim()) {
      setErrorMsg("Please enter your email, register number, and password.");
      return;
    }
    try {
      const res = await signInWithEmail(email, password, regNo);
      if (res.emailVerified) {
        onOpenChange(false);
        router.push("/dashboard");
      }
    } catch (err: any) {
      if (err.code === "auth/email-not-verified" || err.message === "EMAIL_NOT_VERIFIED") {
        setUnverifiedEmail(err.email || email.trim());
        setErrorMsg("");
        return;
      }
      setErrorMsg(err.message || "Email, Register Number, or password is incorrect");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!name.trim() || !email.trim() || !regNo.trim() || !password.trim()) {
      setErrorMsg("Please fill in your name, email, register number, and password.");
      return;
    }
    try {
      const res = await signUpWithEmail(email, password, name, regNo);
      setUnverifiedEmail(res.email);
    } catch (err: any) {
      setErrorMsg(err.message || "User already exists. Please sign in");
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    try {
      await loginWithGoogle();
      // Pre-fill name from Google displayName if available
      setGoogleName(""); // user will enter manually
      setGoogleRegNoStep(true);
    } catch (err: any) {
      setErrorMsg("Google Sign-In was cancelled or failed.");
    }
  };

  const handleGoogleRegNoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!googleName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!googleRegNo.trim()) {
      setErrorMsg("Please enter your official Register Number to proceed.");
      return;
    }
    try {
      await updateStudentRegisterNumber(googleRegNo, googleName.trim());
      setGoogleRegNoStep(false);
      onOpenChange(false);
      router.push("/");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save details. Please try again.");
    }
  };

  const handleLogout = async () => {
    await logout();
    setUnverifiedEmail(null);
    setGoogleRegNoStep(false);
    setConfirmDeleteAccount(false);
    setAuthTab("login");
  };

  const handleDeleteAccount = async () => {
    setErrorMsg("");
    try {
      await deleteAccount();
      setConfirmDeleteAccount(false);
      setGoogleRegNoStep(false);
      setUnverifiedEmail(null);
      setAuthTab("login");
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
          setUnverifiedEmail(null);
          setGoogleRegNoStep(false);
          setConfirmDeleteAccount(false);
        }
      }}
    >
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white dark:bg-card/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl [&>button]:hidden sm:[&>button]:block">
        {confirmDeleteAccount ? (
          /* ============================================================== */
          /* CONFIRM DELETE ACCOUNT SCREEN                                 */
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
        ) : googleRegNoStep ? (
          /* ============================================================== */
          /* GOOGLE SIGN IN - REGISTER NUMBER STEP                         */
          /* ============================================================== */
          <div className="p-6 space-y-5">
            <DialogHeader className="space-y-1.5 text-center">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-1">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex justify-center">
                <Badge variant="outline" className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                  Profile Completion
                </Badge>
              </div>
              <DialogTitle className="text-xl font-bold font-heading text-foreground">
                Enter Student Register Number
              </DialogTitle>
              <DialogDescription className="text-xs text-foreground/90 font-medium leading-relaxed pt-1">
                Welcome <span className="font-bold text-primary">{studentProfile?.name || user?.displayName}</span>! Please enter your official college Register Number to activate your portal.
              </DialogDescription>
            </DialogHeader>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleGoogleRegNoSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Full Student Name</Label>
                <div className="relative">
                  <User className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    placeholder="e.g. Praveen S"
                    className="pl-9 text-xs"
                    required
                    autoFocus
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Student Register Number</Label>
                <div className="relative">
                  <GraduationCap className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={googleRegNo}
                    onChange={(e) => setGoogleRegNo(e.target.value)}
                    placeholder="e.g. 922521104001"
                    className="pl-9 text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2.5 cursor-pointer gap-2"
              >
                <span>Enter Virtual Labs Portal</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </form>
          </div>
        ) : unverifiedEmail ? (
          /* ============================================================== */
          /* EMAIL VERIFICATION SCREEN                                      */
          /* ============================================================== */
          <div className="p-6 space-y-5">
            <DialogHeader className="space-y-1.5 text-center">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-1">
                <MailCheck className="h-6 w-6" />
              </div>
              <div className="flex justify-center">
                <Badge variant="outline" className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                  Email Verification Required
                </Badge>
              </div>
              <DialogTitle className="text-xl font-bold font-heading text-foreground">
                Verify Your Email
              </DialogTitle>
              <DialogDescription className="text-xs text-foreground/90 font-medium leading-relaxed pt-1">
                We have sent you a verification email to <span className="font-bold text-primary font-mono">{unverifiedEmail}</span>. Please verify it and log in.
              </DialogDescription>
            </DialogHeader>

            <div className="p-3.5 rounded-xl bg-muted/50 border border-border/60 text-left text-xs text-muted-foreground space-y-1 font-sans">
              <p className="font-semibold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Instructions:
              </p>
              <p className="pl-5">1. Check your email inbox (and spam folder).</p>
              <p className="pl-5">2. Click the verification link from Firebase.</p>
              <p className="pl-5">3. Click the Login button below to proceed.</p>
            </div>

            <Button
              type="button"
              onClick={() => {
                setUnverifiedEmail(null);
                setAuthTab("login");
                setErrorMsg("");
              }}
              className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2.5 mt-2 cursor-pointer gap-2"
            >
              <span>Login</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : isAuthenticated && open ? (
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

              {editingName ? (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newName.trim()) return;
                    await updateStudentName(newName.trim());
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
                    className="text-[10px] text-muted-foreground hover:text-primary border border-border rounded px-1.5 py-0.5 font-mono transition-colors"
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
                Artificial Intelligence &amp; Data Science
              </DialogDescription>
            </DialogHeader>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-muted/50 border border-border/60">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">
                  Status
                </span>
                <span className="text-sm font-black text-primary font-mono">
                  Verified User
                </span>
              </div>
              <div className="p-3 rounded-xl bg-muted/50 border border-border/60">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">
                  Auth Method
                </span>
                <span className="text-sm font-black text-amber-500 font-mono">
                  Firebase
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
                  <span>Open Student Learning Dashboard</span>
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
                Please sign in with your Google account to enter the laboratory platform.
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
              className="w-full py-5 rounded-xl border-border bg-white dark:bg-card hover:bg-muted font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
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
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
