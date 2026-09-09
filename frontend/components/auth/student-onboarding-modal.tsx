"use client";

import React, { useState, useEffect } from "react";
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
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  Loader2
} from "lucide-react";

import {
  saveStudentProfileToDb,
  verifyEmailAndRegNoUnique,
  StudentProfile
} from "@/lib/supabase";

export function StudentOnboardingModal() {
  const router = useRouter();
  const auth = useAuth();
  const { user, studentProfile, isProfileComplete, completeStudentProfile, loading } = auth || {};

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [year, setYear] = useState("III Year");
  const [className, setClassName] = useState("AIDS - A");
  const [customClass, setCustomClass] = useState("");
  const [isCustomClass, setIsCustomClass] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger modal if user is authenticated with Google but profile is not completed
  useEffect(() => {
    if (!mounted) return;
    if (user && !loading) {
      if (!isProfileComplete) {
        setOpen(true);
        if (!name) {
          setName(user.displayName || studentProfile?.name || "");
        }
        if (!regNo && studentProfile?.registerNumber && !studentProfile.registerNumber.startsWith("STUDENT")) {
          setRegNo(studentProfile.registerNumber);
        }
        if (studentProfile?.year) {
          setYear(studentProfile.year);
        }
        if (studentProfile?.className) {
          setClassName(studentProfile.className);
        }
      } else {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  }, [mounted, user, isProfileComplete, loading, studentProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
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
        // Resilient fallback in case React context HMR is desynced
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

      setOpen(false);
      // Redirect to labs or dashboard
      router.push("/labs");
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to save profile details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted || !open) return null;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-md p-0 overflow-hidden bg-white dark:bg-card/95 backdrop-blur-2xl border border-border shadow-2xl rounded-2xl [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="p-6 space-y-5">
          {/* Header Brand */}
          <DialogHeader className="space-y-1.5 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ff2a5f] to-[#dc2626] flex items-center justify-center text-white mb-1 shadow-lg shadow-red-500/20">
              <FlaskConical className="h-6 w-6" />
            </div>

            <div className="flex justify-center">
              <Badge variant="outline" className="text-[10px] font-mono uppercase bg-primary/10 text-primary border-primary/25">
                Academic Profile Activation
              </Badge>
            </div>

            <DialogTitle className="text-xl font-bold font-heading text-foreground">
              Complete Student Details
            </DialogTitle>

            <DialogDescription className="text-xs text-muted-foreground leading-relaxed pt-0.5">
              Welcome to VSB Virtual Labs! Please confirm your student name, register number, year, and class to unlock full access.
            </DialogDescription>
          </DialogHeader>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-xl font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Details Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans">
            {/* 1. Student Name */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-primary" />
                <span>Student Full Name</span>
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rohith E"
                  className="text-xs bg-muted/30 border-border"
                  required
                />
              </div>
            </div>

            {/* 2. Register Number */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-primary" />
                <span>College Register Number</span>
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

            {/* 4. Class / Section */}
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
              disabled={isSubmitting || loading}
              className="w-full h-11 mt-3 bg-gradient-to-r from-[#ff2a5f] to-[#dc2626] hover:from-[#e11d48] hover:to-[#b91c1c] text-white text-xs font-bold rounded-xl shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
      </DialogContent>
    </Dialog>
  );
}

export default StudentOnboardingModal;
