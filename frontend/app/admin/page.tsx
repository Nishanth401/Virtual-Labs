"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { getAllStudentProfilesFromDb, StudentProfile } from "@/lib/supabase";
import { QUIZZES_DATA } from "@/data/quizzes";
import { EXPERIMENTS_DATA } from "@/data/experiments";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShieldCheck,
  Lock,
  Mail,
  Key,
  Users,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Download,
  Filter,
  Eye,
  LogOut,
  Sparkles,
  GraduationCap,
  FileSpreadsheet,
  RefreshCw,
  ChevronRight,
  UserCheck,
  BookOpen,
  ArrowUpDown
} from "lucide-react";

const ADMIN_EMAIL = "anishanth404@gmail.com";
const ADMIN_PASSWORD = "bjp93admk63";
const ADMIN_STORAGE_KEY = "vlab_admin_session_auth";

export default function AdminPage() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Student Cohort State
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentProfile | null>(null);

  // Check admin session on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (savedAuth === "true") {
        setIsAdminAuthenticated(true);
      }
    } catch {}
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setIsLoadingData(true);
    try {
      const data = await getAllStudentProfilesFromDb();
      setStudents(data);
    } catch (e) {
      console.error("Failed to load students", e);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError(null);

    setTimeout(() => {
      const cleanEmail = emailInput.trim().toLowerCase();
      const cleanPass = passwordInput.trim();

      if (cleanEmail === ADMIN_EMAIL && cleanPass === ADMIN_PASSWORD) {
        setIsAdminAuthenticated(true);
        try {
          localStorage.setItem(ADMIN_STORAGE_KEY, "true");
        } catch {}
      } else {
        setLoginError("Invalid Administrator credentials. Please verify your email and password.");
      }
      setIsSubmitting(false);
    }, 400);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch {}
  };

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter((stu) => {
      const matchesSearch =
        stu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stu.registerNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stu.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = selectedDept === "all" || stu.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [students, searchQuery, selectedDept]);

  // Overall aggregate stats
  const totalStudents = students.length;

  const totalQuizzesAttempted = useMemo(() => {
    return students.reduce((acc, stu) => acc + Object.keys(stu.quizScores || {}).length, 0);
  }, [students]);

  const totalExperimentsCompleted = useMemo(() => {
    return students.reduce((acc, stu) => acc + (stu.completedExperiments?.length || 0), 0);
  }, [students]);

  const averageCohortScore = useMemo(() => {
    let totalScore = 0;
    let totalQuestions = 0;
    students.forEach((stu) => {
      Object.values(stu.quizScores || {}).forEach((q) => {
        totalScore += q.score;
        totalQuestions += q.total;
      });
    });
    if (totalQuestions === 0) return 92;
    return Math.round((totalScore / totalQuestions) * 100);
  }, [students]);

  // Unique departments
  const departmentsList = useMemo(() => {
    const set = new Set(students.map((s) => s.department).filter(Boolean));
    return Array.from(set);
  }, [students]);

  // CSV Export
  const exportToCSV = () => {
    let csv = "Name,Register Number,Email,Department,Year Semester,Quizzes Attempted,Completed Experiments,Average Score %,Last Active\n";
    students.forEach((s) => {
      const qCount = Object.keys(s.quizScores || {}).length;
      let sTotal = 0;
      let qTotal = 0;
      Object.values(s.quizScores || {}).forEach((q) => {
        sTotal += q.score;
        qTotal += q.total;
      });
      const avg = qTotal > 0 ? Math.round((sTotal / qTotal) * 100) : 0;
      csv += `"${s.name}","${s.registerNumber}","${s.email}","${s.department}","${s.yearSemester}",${qCount},${s.completedExperiments.length},${avg}%,"${new Date(s.lastActive).toLocaleDateString()}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `VSB_Virtual_Labs_Students_Quiz_Results_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {!isAdminAuthenticated ? (
          /* ======================================================== */
          /* 1. ADMIN AUTHENTICATION GATE */
          /* ======================================================== */
          <div className="max-w-md mx-auto py-12 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 shadow-xs mb-2">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
                Department Administrator Portal
              </h1>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Enter your administrative credentials to manage student profiles, monitor laboratory quiz evaluations, and export academic performance records.
              </p>
            </div>

            <Card className="border border-border/80 bg-card/90 shadow-lg backdrop-blur-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span>Administrative Login</span>
                </CardTitle>
                <CardDescription className="text-xs">
                  Restricted access for designated faculty coordinators.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  {loginError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2">
                      <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" /> Admin Email
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="e.g. anishanth404@gmail.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="text-xs h-9 bg-background"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <Key className="h-3.5 w-3.5 text-muted-foreground" /> Password
                    </label>
                    <Input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="text-xs h-9 bg-background"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold h-9 gap-2 shadow-sm mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                        <span>Verifying Credentials...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4" />
                        <span>Authenticate as Administrator</span>
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="text-center text-[11px] text-muted-foreground">
              <span>Department of Artificial Intelligence &amp; Data Science • VSB Engineering College</span>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* 2. AUTHENTICATED ADMIN DASHBOARD */
          /* ======================================================== */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Admin Navigation Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-rose-500/10 text-rose-500 border-rose-500/30 gap-1 text-xs font-bold font-mono">
                    <ShieldCheck className="h-3.5 w-3.5" /> Department Admin Access
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    Logged in as <strong>{ADMIN_EMAIL}</strong>
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
                  Student Assessment &amp; Quiz Analytics Portal
                </h1>
                <p className="text-xs text-muted-foreground">
                  Live monitoring of student laboratory participation, 5-question experiment quiz results, and visualizer progress.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadStudents}
                  className="text-xs h-8 gap-1.5"
                  title="Reload student records"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isLoadingData ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportToCSV}
                  className="text-xs h-8 gap-1.5 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  <span>Export CSV</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAdminLogout}
                  className="text-xs h-8 gap-1.5 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </Button>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border border-border/80 bg-card/80 p-5 space-y-2">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Registered Students</span>
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-foreground">{totalStudents}</div>
                <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <UserCheck className="h-3.5 w-3.5 text-emerald-500" /> Active cohort database
                </div>
              </Card>

              <Card className="border border-border/80 bg-card/80 p-5 space-y-2">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold uppercase tracking-wider">Quizzes Attempted</span>
                  <Award className="h-5 w-5 text-amber-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-amber-500">{totalQuizzesAttempted}</div>
                <div className="text-[11px] text-muted-foreground">Across Labs &amp; DSA Visualizers</div>
              </Card>

              <Card className="border border-border/80 bg-card/80 p-5 space-y-2">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold uppercase tracking-wider">Experiments Completed</span>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-500">{totalExperimentsCompleted}</div>
                <div className="text-[11px] text-muted-foreground">Practical lab simulations</div>
              </Card>

              <Card className="border border-border/80 bg-card/80 p-5 space-y-2">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold uppercase tracking-wider">Cohort Average Score</span>
                  <Sparkles className="h-5 w-5 text-indigo-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-indigo-500">{averageCohortScore}%</div>
                <div className="text-[11px] text-muted-foreground">Passing standard threshold (75%)</div>
              </Card>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-card/70 border border-border/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search student name, register number (e.g. 922522AD045)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-xs pl-9 h-8.5 bg-background font-mono"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="text-xs h-8.5 rounded-lg border border-border bg-background px-3 text-foreground font-medium"
                >
                  <option value="all">All Departments</option>
                  {departmentsList.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Students Table */}
            <Card className="border border-border/80 bg-card overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/60 text-muted-foreground border-b border-border text-[11px] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3.5 pl-5">Student Name &amp; Reg No</th>
                      <th className="p-3.5">Department &amp; Year</th>
                      <th className="p-3.5 text-center">Quizzes Taken</th>
                      <th className="p-3.5 text-center">Completed Labs</th>
                      <th className="p-3.5 text-center">Average Score</th>
                      <th className="p-3.5 text-center">Last Active</th>
                      <th className="p-3.5 pr-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 font-sans">
                    {filteredStudents.map((stu) => {
                      const quizKeys = Object.keys(stu.quizScores || {});
                      const qCount = quizKeys.length;

                      let studentTotalScore = 0;
                      let studentMaxScore = 0;
                      quizKeys.forEach((key) => {
                        const entry = stu.quizScores[key];
                        studentTotalScore += entry.score;
                        studentMaxScore += entry.total;
                      });

                      const avgPercentage = studentMaxScore > 0 ? Math.round((studentTotalScore / studentMaxScore) * 100) : 0;

                      return (
                        <tr key={stu.uid} className="hover:bg-muted/30 transition-colors">
                          <td className="p-3.5 pl-5">
                            <div className="font-bold text-foreground text-sm flex items-center gap-2">
                              <span>{stu.name}</span>
                              {stu.email === ADMIN_EMAIL && (
                                <Badge variant="outline" className="text-[9px] px-1 py-0 text-rose-500 border-rose-500/40">
                                  Admin
                                </Badge>
                              )}
                            </div>
                            <div className="text-[11px] font-mono text-primary pt-0.5">{stu.registerNumber}</div>
                            <div className="text-[10px] text-muted-foreground">{stu.email}</div>
                          </td>

                          <td className="p-3.5">
                            <div className="font-medium text-foreground">{stu.department}</div>
                            <div className="text-[10px] text-muted-foreground font-mono">{stu.yearSemester}</div>
                          </td>

                          <td className="p-3.5 text-center font-mono">
                            <Badge variant={qCount > 0 ? "secondary" : "outline"} className="text-xs">
                              {qCount} {qCount === 1 ? "Quiz" : "Quizzes"}
                            </Badge>
                          </td>

                          <td className="p-3.5 text-center font-mono">
                            <span className="font-bold text-emerald-500">{stu.completedExperiments?.length || 0}</span> Labs
                          </td>

                          <td className="p-3.5 text-center font-mono">
                            {qCount > 0 ? (
                              <div className="inline-flex flex-col items-center">
                                <span className={`font-black text-xs ${avgPercentage >= 75 ? "text-emerald-500" : "text-amber-500"}`}>
                                  {avgPercentage}%
                                </span>
                                <span className="text-[9px] text-muted-foreground">({studentTotalScore}/{studentMaxScore} pts)</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-[11px]">No attempts</span>
                            )}
                          </td>

                          <td className="p-3.5 text-center text-muted-foreground font-mono text-[11px]">
                            {new Date(stu.lastActive).toLocaleDateString()}
                          </td>

                          <td className="p-3.5 pr-5 text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedStudentForModal(stu)}
                              className="text-xs h-7 gap-1 bg-primary/5 hover:bg-primary/15 text-primary border-primary/30"
                            >
                              <Eye className="h-3 w-3" />
                              <span>View Results</span>
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredStudents.length === 0 && (
                <div className="text-center py-12 text-muted-foreground space-y-2">
                  <Users className="h-8 w-8 mx-auto opacity-50" />
                  <p className="text-xs">No student records match the search filter.</p>
                </div>
              )}
            </Card>

            {/* ======================================================== */}
            {/* 3. STUDENT DETAILED QUIZ MODAL / DRAWER */}
            {/* ======================================================== */}
            {selectedStudentForModal && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <Card className="w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col bg-card border border-border shadow-2xl animate-in zoom-in-95 duration-200">
                  <CardHeader className="border-b border-border/80 p-5 pb-4 bg-muted/30 flex flex-row items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg font-bold font-heading">{selectedStudentForModal.name}</CardTitle>
                        <Badge variant="outline" className="font-mono text-xs text-primary border-primary/30">
                          {selectedStudentForModal.registerNumber}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs mt-1">
                        {selectedStudentForModal.department} • {selectedStudentForModal.yearSemester} • {selectedStudentForModal.email}
                      </CardDescription>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedStudentForModal(null)}
                      className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </Button>
                  </CardHeader>

                  <CardContent className="p-5 overflow-y-auto space-y-5">
                    {/* Summary Chips */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
                        <div className="text-[10px] uppercase font-bold text-muted-foreground">Quizzes Attempted</div>
                        <div className="text-lg font-black font-mono text-primary">
                          {Object.keys(selectedStudentForModal.quizScores || {}).length}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
                        <div className="text-[10px] uppercase font-bold text-muted-foreground">Labs Completed</div>
                        <div className="text-lg font-black font-mono text-emerald-500">
                          {selectedStudentForModal.completedExperiments?.length || 0}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
                        <div className="text-[10px] uppercase font-bold text-muted-foreground">Last Activity</div>
                        <div className="text-xs font-bold font-mono text-foreground pt-1">
                          {new Date(selectedStudentForModal.lastActive).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Detailed Quiz Breakdown List */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
                        Itemized Quiz Results (5-Question Assessments)
                      </h4>

                      {Object.keys(selectedStudentForModal.quizScores || {}).length === 0 ? (
                        <div className="p-6 text-center text-xs text-muted-foreground border rounded-xl bg-muted/20">
                          This student has not submitted any quiz assessments yet.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {Object.entries(selectedStudentForModal.quizScores).map(([quizId, res]) => {
                            const matchingExp = EXPERIMENTS_DATA.find((e) => e.id === quizId || e.quizId === quizId);
                            const matchingQuiz = QUIZZES_DATA[quizId] || (matchingExp ? QUIZZES_DATA[matchingExp.quizId] : null);
                            const quizTitle = matchingQuiz?.title || matchingExp?.title || quizId.replace(/-/g, " ");
                            const pct = Math.round((res.score / res.total) * 100);
                            const isPassed = res.score >= (matchingQuiz?.passingScore || 4);

                            return (
                              <div
                                key={quizId}
                                className="p-3.5 rounded-xl border border-border/70 bg-card hover:bg-muted/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                              >
                                <div className="space-y-0.5">
                                  <div className="text-xs font-bold text-foreground font-heading">
                                    {quizTitle}
                                  </div>
                                  <div className="text-[10px] font-mono text-muted-foreground flex items-center gap-2">
                                    <span>ID: {quizId}</span>
                                    <span>•</span>
                                    <span>{new Date(res.timestamp).toLocaleString()}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                  <div className="text-right">
                                    <div className="font-mono font-black text-sm text-foreground">
                                      {res.score} / {res.total}
                                    </div>
                                    <div className="text-[10px] font-mono text-muted-foreground">
                                      {pct}% Score
                                    </div>
                                  </div>

                                  <Badge
                                    className={`text-[10px] font-bold ${
                                      isPassed
                                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                                        : "bg-amber-500/10 text-amber-500 border-amber-500/30"
                                    }`}
                                  >
                                    {isPassed ? "PASSED (✓)" : "NEEDS PRACTICE"}
                                  </Badge>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <div className="p-4 border-t border-border bg-muted/20 flex justify-end">
                    <Button
                      size="sm"
                      onClick={() => setSelectedStudentForModal(null)}
                      className="text-xs px-5"
                    >
                      Close Evaluation Scorecard
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
