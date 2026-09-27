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
import { motion } from "framer-motion";
import Link from "next/link";

export default function StudentDashboardPage() {
  const router = useRouter();
  const { user, studentProfile, logout, deleteAccount } = useAuth();
  const { progress, isLoaded, resetProgress } = useStudentProgress();

  const studentName =
    studentProfile?.name ||
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : progress.studentName);

  const studentRollNo =
    studentProfile?.registerNumber ||
    (user?.email ? user.email.split("@")[0].toUpperCase() : progress.studentRollNo);

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
        <main className="flex-1 flex items-center justify-center pt-24 pb-12">
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
      <main className="flex-1 bg-muted/20 pt-36 sm:pt-40 pb-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Animated Motion Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-2"
            >
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                  Academic Progress Hub
                </Badge>
                <Badge variant="secondary" className="text-xs font-mono">
                  {studentProfile?.semester || (studentProfile?.registerNumber?.startsWith("922525") ? "Semester III" : "Semester V")}
                </Badge>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Student Session
                </span>
              </div>

              {/* Animated Welcome & Student Name */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <motion.h1
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight font-heading flex items-center gap-2 flex-wrap"
                >
                  <span>Welcome back,</span>
                  <motion.span
                    className="bg-gradient-to-r from-primary via-rose-500 to-amber-500 bg-clip-text text-transparent font-extrabold"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {studentName}
                  </motion.span>
                </motion.h1>

                <motion.span
                  className="inline-block text-2xl sm:text-3xl origin-[70%_70%] cursor-default"
                  animate={{
                    rotate: [0, 14, -8, 14, -4, 10, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                >
                  👋
                </motion.span>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex items-center gap-2 text-xs text-muted-foreground font-mono flex-wrap pt-0.5"
              >
                <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-semibold border border-primary/20">
                  Reg No: {studentRollNo}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 font-semibold border border-teal-500/20">
                  {studentProfile?.cohort || studentProfile?.className || (studentProfile?.registerNumber?.startsWith("922525") ? "II AIDS" : "III AIDS")}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold border border-sky-500/20">
                  {studentProfile?.semester || (studentProfile?.registerNumber?.startsWith("922525") ? "Semester III" : "Semester V")}
                </span>
                {studentProfile?.advisor && (
                  <>
                    <span>•</span>
                    <span className="text-foreground/90 font-medium">Advisor: {studentProfile.advisor}</span>
                  </>
                )}
                <span>•</span>
                <span>Dept. of Artificial Intelligence &amp; Data Science</span>
                <span>•</span>
                <span className="text-slate-500">VSB Engineering College</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 flex-wrap"
            >
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
            </motion.div>
          </div>

          {/* Academic Semester Awareness Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-500/10 via-teal-500/10 to-transparent border border-sky-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/30">
                  {studentProfile?.registerNumber?.startsWith("922525") ? "Semester III Curriculum Active" : "Semester V Curriculum Active"}
                </Badge>
                <span className="text-xs font-bold text-foreground">
                  {studentProfile?.registerNumber?.startsWith("922525") ? "Second Year (II AIDS) Laboratories" : "Third Year (III AIDS) Laboratories"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {studentProfile?.registerNumber?.startsWith("922525") ? (
                  <>Your official practical courses are <strong>AD8302 OOP (Java)</strong>, <strong>AD8301 Data Structures Design</strong>, and <strong>AD8303 DBMS</strong>. The <strong>DSA Studio</strong> is universal for all students.</>
                ) : (
                  <>Your official practical courses are <strong>AI3401 Artificial Intelligence Lab</strong>, <strong>CS8711 Big Data Analytics Lab</strong>, and <strong>CS8811 Cloud Service Management Lab</strong>. The <strong>DSA Studio</strong> is universal for all students.</>
                )}
              </p>
            </div>

            <Button asChild size="sm" className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold gap-1 shrink-0">
              <Link href="/labs">
                <span>View Full Lab Catalogue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {/* Progress Overview Card with Certificate Generator */}
          <ProgressCard progress={progress} totalExperiments={6} />

          {/* Quick Shortcuts: Tailored to Student's Year & Semester + Universal DSA */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block px-1">
              {studentProfile?.registerNumber?.startsWith("922525") ? "Semester III Laboratory Portals" : "Semester V Laboratory Portals"} &amp; Universal Studio
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {studentProfile?.registerNumber?.startsWith("922525") ? (
                <>
                  {/* Semester 3 Lab 1 */}
                  <div className="p-4 rounded-2xl border border-secondary/40 bg-card/60 backdrop-blur-xs flex flex-col justify-between shadow-xs space-y-3">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-[10px] font-mono text-teal-600 bg-teal-500/10 border-teal-500/30">
                        AD8302 • Semester III
                      </Badge>
                      <h3 className="font-bold text-sm text-foreground">OOP (Java) Laboratory</h3>
                      <p className="text-xs text-muted-foreground">Classes, Encapsulation, Polymorphism &amp; JDBC.</p>
                    </div>
                    <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90 text-white text-xs gap-1">
                      <Link href="/labs/oops-java">
                        Open Lab <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>

                  {/* Semester 3 Lab 2 */}
                  <div className="p-4 rounded-2xl border border-secondary/40 bg-card/60 backdrop-blur-xs flex flex-col justify-between shadow-xs space-y-3">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-[10px] font-mono text-teal-600 bg-teal-500/10 border-teal-500/30">
                        AD8301 • Semester III
                      </Badge>
                      <h3 className="font-bold text-sm text-foreground">Data Structures Design</h3>
                      <p className="text-xs text-muted-foreground">Stacks, Queues, BST, AVL Trees &amp; Dijkstra.</p>
                    </div>
                    <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90 text-white text-xs gap-1">
                      <Link href="/labs/data-structures">
                        Open Lab <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>

                  {/* Semester 3 Lab 3 */}
                  <div className="p-4 rounded-2xl border border-secondary/40 bg-card/60 backdrop-blur-xs flex flex-col justify-between shadow-xs space-y-3">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-[10px] font-mono text-teal-600 bg-teal-500/10 border-teal-500/30">
                        AD8303 • Semester III
                      </Badge>
                      <h3 className="font-bold text-sm text-foreground">DBMS Laboratory</h3>
                      <p className="text-xs text-muted-foreground">SQL DDL/DML, Joins, Normalization &amp; PL/SQL.</p>
                    </div>
                    <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90 text-white text-xs gap-1">
                      <Link href="/labs/dbms-lab">
                        Open Lab <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Semester 5 Lab 1 */}
                  <div className="p-4 rounded-2xl border border-secondary/40 bg-card/60 backdrop-blur-xs flex flex-col justify-between shadow-xs space-y-3">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-[10px] font-mono text-[#0284c7] bg-[#0284c7]/10 border-[#0284c7]/30">
                        AI3401 • Semester V
                      </Badge>
                      <h3 className="font-bold text-sm text-foreground">Artificial Intelligence Lab</h3>
                      <p className="text-xs text-muted-foreground">A* Search, Minimax Alpha-Beta, N-Queens &amp; Logic.</p>
                    </div>
                    <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90 text-white text-xs gap-1">
                      <Link href="/labs/artificial-intelligence">
                        Open Lab <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>

                  {/* Semester 5 Lab 2 */}
                  <div className="p-4 rounded-2xl border border-secondary/40 bg-card/60 backdrop-blur-xs flex flex-col justify-between shadow-xs space-y-3">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-[10px] font-mono text-[#0284c7] bg-[#0284c7]/10 border-[#0284c7]/30">
                        CS8711 • Semester V
                      </Badge>
                      <h3 className="font-bold text-sm text-foreground">Big Data Analytics Lab</h3>
                      <p className="text-xs text-muted-foreground">Hadoop HDFS, MapReduce, Spark &amp; PySpark.</p>
                    </div>
                    <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90 text-white text-xs gap-1">
                      <Link href="/labs/big-data-analytics">
                        Open Lab <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>

                  {/* Semester 5 Lab 3 */}
                  <div className="p-4 rounded-2xl border border-secondary/40 bg-card/60 backdrop-blur-xs flex flex-col justify-between shadow-xs space-y-3">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-[10px] font-mono text-[#0284c7] bg-[#0284c7]/10 border-[#0284c7]/30">
                        CS8811 • Semester V
                      </Badge>
                      <h3 className="font-bold text-sm text-foreground">Cloud Service Management</h3>
                      <p className="text-xs text-muted-foreground">AWS EC2/S3, Docker Compose &amp; Kubernetes.</p>
                    </div>
                    <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90 text-white text-xs gap-1">
                      <Link href="/labs/cloud-service-management">
                        Open Lab <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </>
              )}

              {/* Universal DSA Visualizer Studio (For All Years) */}
              <div className="p-4 rounded-2xl border border-amber-500/40 bg-amber-500/5 backdrop-blur-xs flex flex-col justify-between shadow-xs space-y-3">
                <div className="space-y-1">
                  <Badge variant="outline" className="text-[10px] font-mono text-amber-600 bg-amber-500/10 border-amber-500/30">
                    ⚡ Universal (All Years)
                  </Badge>
                  <h3 className="font-bold text-sm text-foreground">DSA Visualization Studio</h3>
                  <p className="text-xs text-muted-foreground">Interactive Sorting, BST, AVL Trees &amp; 75 Sheets.</p>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full text-xs font-bold gap-1 border-amber-500/40 hover:bg-amber-500/10 text-amber-700 dark:text-amber-400">
                  <Link href="/visualizer">
                    Explore Studio <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
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
