"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useStudentProgress } from "@/hooks/use-student-progress";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { AttemptsTable } from "@/components/dashboard/attempts-table";
import { UserFilesSection } from "@/components/dashboard/user-files-section";
import { UserNotesSection } from "@/components/dashboard/user-notes-section";
import { UserTeamSection } from "@/components/dashboard/user-team-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  RotateCcw,
  Sparkles,
  BookOpen,
  Layers,
  ArrowRight,
  LogOut,
  Trash2,
  FolderOpen,
  StickyNote,
  Users,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function StudentDashboardPage() {
  const router = useRouter();
  const { user, logout, deleteAccount } = useAuth();
  const { progress, isLoaded, resetProgress } = useStudentProgress();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "Are you sure you want to permanently delete your account? All progress, certificates, notes, and bound Register Number will be erased."
      )
    ) {
      await deleteAccount();
      router.push("/");
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto" />
            <p className="text-xs text-muted-foreground">Loading student learning records...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-muted/20 py-8">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                  Academic Progress Hub
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Virtual Labs Nodal Center
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight font-heading">
                Student Learning Dashboard
              </h1>
              <p className="text-sm font-bold text-[#e11d48] dark:text-[#f43f5e] flex items-center gap-1.5 mt-1 font-mono">
                <span>Student: {progress.studentName} ({progress.studentRollNo})</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Department of Artificial Intelligence &amp; Data Science • VSB Engineering College
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (confirm("Reset demo progress data to initial state?")) {
                    resetProgress();
                  }
                }}
                className="text-xs gap-1.5 text-muted-foreground hover:text-destructive"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset Demo Data
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-xs gap-1.5 text-slate-700 dark:text-slate-300 hover:bg-muted border-border"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteAccount}
                className="text-xs gap-1.5 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 border-rose-500/30"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete Account
              </Button>
            </div>
          </div>

          {/* Progress Overview Card with Certificate Generator */}
          <ProgressCard progress={progress} totalExperiments={6} />

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-secondary/40 bg-card/60 backdrop-blur-xs flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-foreground">Data Structures - I Lab</h3>
                <p className="text-xs text-muted-foreground">Continue 6 lab experiments with live simulation.</p>
              </div>
              <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs gap-1">
                <Link href="/labs/data-structures">
                  Open Lab <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            <div className="p-5 rounded-2xl border border-secondary/40 bg-card/60 backdrop-blur-xs flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-foreground">DSA Visualization Studio</h3>
                <p className="text-xs text-muted-foreground">Practice Bubble Sort, BST, AVL Trees, and Graphs.</p>
              </div>
              <Button asChild variant="outline" size="sm" className="text-xs gap-1">
                <Link href="/visualizer">
                  Explore Studio <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Dashboard Tabs for Assessments, Lab Files, Viva Notes, and Lab Team */}
          <Tabs defaultValue="attempts" className="w-full space-y-4">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full bg-muted/60 p-1 rounded-xl">
              <TabsTrigger value="attempts" className="text-xs font-bold gap-1.5 py-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Lab Assessments</span>
              </TabsTrigger>
              <TabsTrigger value="files" className="text-xs font-bold gap-1.5 py-2">
                <FolderOpen className="h-3.5 w-3.5 text-primary" />
                <span>Lab Files &amp; Manuals</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="text-xs font-bold gap-1.5 py-2">
                <StickyNote className="h-3.5 w-3.5 text-amber-500" />
                <span>Viva Notes</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="text-xs font-bold gap-1.5 py-2">
                <Users className="h-3.5 w-3.5 text-emerald-500" />
                <span>Batch Partners</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="attempts" className="space-y-4">
              <AttemptsTable progress={progress} />
            </TabsContent>

            <TabsContent value="files" className="space-y-4">
              <UserFilesSection />
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <UserNotesSection />
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <UserTeamSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
