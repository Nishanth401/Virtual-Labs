"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { COLLEGES_REGISTRY, CollegeData, getCollegeBySlug } from "@/data/colleges";
import {
  getStudentsByCollege,
  getCollegeMaterials,
  saveCollegeMaterial,
  deleteCollegeMaterial,
  getCollegeLabManuals,
  saveCollegeLabManual,
  deleteCollegeLabManual,
  getCollegeCustomLabs,
  saveCollegeCustomLab,
  deleteCollegeCustomLab,
  getCollegeVideoTutorials,
  saveCollegeVideoTutorial,
  deleteCollegeVideoTutorial,
  getCollegeAnnouncements,
  saveCollegeAnnouncement,
  deleteCollegeAnnouncement,
  CollegeMaterial,
  CollegeLabManual,
  CollegeCustomLab,
  CollegeVideoTutorial,
  CollegeAnnouncement
} from "@/lib/supabase-multitenant";
import { StudentProfile } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  GraduationCap,
  FileSpreadsheet,
  RefreshCw,
  ChevronRight,
  BookOpen,
  FileText,
  Video,
  FlaskConical,
  Plus,
  Trash2,
  ExternalLink,
  Edit,
  Building,
  Radio
} from "lucide-react";

const ADMIN_EMAIL = "anishanth404@gmail.com";
const ADMIN_PASSWORD = "bjp93admk63";
const ADMIN_STORAGE_KEY = "vlab_admin_session_auth";

function AdminPageContent() {
  const searchParams = useSearchParams();
  const initialCollege = searchParams.get("college") || "vsb";

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Active Tenant Scope
  const [activeCollegeSlug, setActiveCollegeSlug] = useState<string>(initialCollege);
  const activeCollege = useMemo(() => getCollegeBySlug(activeCollegeSlug) || COLLEGES_REGISTRY[0], [activeCollegeSlug]);

  // Tenant Data Collections
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [materials, setMaterials] = useState<CollegeMaterial[]>([]);
  const [manuals, setManuals] = useState<CollegeLabManual[]>([]);
  const [customLabs, setCustomLabs] = useState<CollegeCustomLab[]>([]);
  const [videos, setVideos] = useState<CollegeVideoTutorial[]>([]);
  const [announcements, setAnnouncements] = useState<CollegeAnnouncement[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentProfile | null>(null);

  // Modals for CRUD
  const [activeModal, setActiveModal] = useState<"material" | "manual" | "lab" | "video" | "announcement" | null>(null);

  // Form states for adding items
  const [newMaterial, setNewMaterial] = useState<Partial<CollegeMaterial>>({
    title: "", description: "", category: "Lecture Notes", department: "AIDS", semester: "Semester III", fileUrl: "", fileType: "pdf", uploadedBy: "Department Admin"
  });
  const [newManual, setNewManual] = useState<Partial<CollegeLabManual>>({
    labName: "", labCode: "", department: "AIDS & CSE", semester: "Semester III", manualUrl: "", observationUrl: "", description: "", uploadedBy: "Lab Incharge"
  });
  const [newCustomLab, setNewCustomLab] = useState<Partial<CollegeCustomLab>>({
    title: "", domain: "Algorithms & Simulation", department: "AIDS", labUrl: "/experiments/dsa", description: "", semester: "Semester III", difficulty: "Intermediate", uploadedBy: "Faculty Admin"
  });
  const [newVideo, setNewVideo] = useState<Partial<CollegeVideoTutorial>>({
    title: "", topic: "Algorithm Simulation", department: "AIDS / CSE", youtubeUrl: "https://www.youtube.com", language: "Tamil", duration: "15:00 mins", uploadedBy: "V-Lab Studio"
  });
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<CollegeAnnouncement>>({
    title: "", content: "", priority: "normal", date: "Sep 2026", category: "Lab Schedule"
  });

  // Check auth session
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (savedAuth === "true") {
        setIsAdminAuthenticated(true);
      }
    } catch {}
  }, []);

  // Fetch data whenever active college changes
  useEffect(() => {
    loadAllTenantData(activeCollegeSlug);
  }, [activeCollegeSlug]);

  const loadAllTenantData = async (slug: string) => {
    setIsLoadingData(true);
    try {
      const [stuData, matData, manData, labData, vidData, annData] = await Promise.all([
        getStudentsByCollege(slug),
        getCollegeMaterials(slug),
        getCollegeLabManuals(slug),
        getCollegeCustomLabs(slug),
        getCollegeVideoTutorials(slug),
        getCollegeAnnouncements(slug)
      ]);
      setStudents(stuData);
      setMaterials(matData);
      setManuals(manData);
      setCustomLabs(labData);
      setVideos(vidData);
      setAnnouncements(annData);
    } catch (e) {
      console.error("Failed to load tenant data", e);
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
    }, 300);
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch {}
  };

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.registerNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept =
        selectedDept === "all" ||
        student.department.toLowerCase().includes(selectedDept.toLowerCase()) ||
        (student.className && student.className.toLowerCase().includes(selectedDept.toLowerCase()));

      return matchesSearch && matchesDept;
    });
  }, [students, searchQuery, selectedDept]);

  // Export CSV of students
  const handleExportCSV = () => {
    if (filteredStudents.length === 0) return;
    const headers = ["Register Number", "Student Name", "Email", "Department", "Year / Class", "Experiments Completed", "Quizzes Completed", "Last Active"];
    const rows = filteredStudents.map((s) => [
      `"${s.registerNumber}"`,
      `"${s.name}"`,
      `"${s.email}"`,
      `"${s.department}"`,
      `"${s.yearSemester || s.year || s.className || 'N/A'}"`,
      s.completedExperiments.length,
      Object.keys(s.quizScores || {}).length,
      `"${s.lastActive || 'N/A'}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeCollege.slug}_student_analytics_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- CRUD Handlers ---

  // 1. Save Material
  const handleSaveMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaterial.title || !newMaterial.fileUrl) return;
    const item: CollegeMaterial = {
      id: `mat_${activeCollege.slug}_${Date.now()}`,
      collegeSlug: activeCollege.slug,
      title: newMaterial.title.trim(),
      description: newMaterial.description?.trim() || "",
      category: (newMaterial.category as any) || "Lecture Notes",
      department: newMaterial.department || "AIDS",
      semester: newMaterial.semester || "Semester III",
      fileUrl: newMaterial.fileUrl.trim(),
      fileType: (newMaterial.fileType as any) || "pdf",
      uploadedBy: newMaterial.uploadedBy || "Faculty Incharge",
      createdAt: new Date().toISOString()
    };
    await saveCollegeMaterial(item);
    setMaterials([item, ...materials]);
    setActiveModal(null);
    setNewMaterial({ title: "", description: "", category: "Lecture Notes", department: "AIDS", semester: "Semester III", fileUrl: "", fileType: "pdf", uploadedBy: "Department Admin" });
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this study material?")) return;
    await deleteCollegeMaterial(id, activeCollege.slug);
    setMaterials(materials.filter((m) => m.id !== id));
  };

  // 2. Save Lab Manual
  const handleSaveManual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newManual.labName || !newManual.manualUrl) return;
    const item: CollegeLabManual = {
      id: `man_${activeCollege.slug}_${Date.now()}`,
      collegeSlug: activeCollege.slug,
      labName: newManual.labName.trim(),
      labCode: newManual.labCode?.trim() || "LAB01",
      department: newManual.department || "AIDS & CSE",
      semester: newManual.semester || "Semester III",
      manualUrl: newManual.manualUrl.trim(),
      observationUrl: newManual.observationUrl?.trim() || undefined,
      description: newManual.description?.trim() || "",
      uploadedBy: newManual.uploadedBy || "Lab Coordinator",
      createdAt: new Date().toISOString()
    };
    await saveCollegeLabManual(item);
    setManuals([item, ...manuals]);
    setActiveModal(null);
    setNewManual({ labName: "", labCode: "", department: "AIDS & CSE", semester: "Semester III", manualUrl: "", observationUrl: "", description: "", uploadedBy: "Lab Incharge" });
  };

  const handleDeleteManual = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lab manual?")) return;
    await deleteCollegeLabManual(id, activeCollege.slug);
    setManuals(manuals.filter((m) => m.id !== id));
  };

  // 3. Save Custom Lab
  const handleSaveCustomLab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomLab.title || !newCustomLab.labUrl) return;
    const item: CollegeCustomLab = {
      id: `lab_${activeCollege.slug}_${Date.now()}`,
      collegeSlug: activeCollege.slug,
      title: newCustomLab.title.trim(),
      domain: newCustomLab.domain?.trim() || "Computer Science",
      department: newCustomLab.department || "AIDS",
      labUrl: newCustomLab.labUrl.trim(),
      description: newCustomLab.description?.trim() || "",
      semester: newCustomLab.semester || "Semester III",
      difficulty: (newCustomLab.difficulty as any) || "Intermediate",
      uploadedBy: newCustomLab.uploadedBy || "Academic Head",
      createdAt: new Date().toISOString()
    };
    await saveCollegeCustomLab(item);
    setCustomLabs([item, ...customLabs]);
    setActiveModal(null);
    setNewCustomLab({ title: "", domain: "Algorithms & Simulation", department: "AIDS", labUrl: "/experiments/dsa", description: "", semester: "Semester III", difficulty: "Intermediate", uploadedBy: "Faculty Admin" });
  };

  const handleDeleteCustomLab = async (id: string) => {
    if (!confirm("Are you sure you want to delete this custom lab?")) return;
    await deleteCollegeCustomLab(id, activeCollege.slug);
    setCustomLabs(customLabs.filter((l) => l.id !== id));
  };

  // 4. Save Video
  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.title || !newVideo.youtubeUrl) return;
    const item: CollegeVideoTutorial = {
      id: `vid_${activeCollege.slug}_${Date.now()}`,
      collegeSlug: activeCollege.slug,
      title: newVideo.title.trim(),
      topic: newVideo.topic?.trim() || "Virtual Lab Simulation",
      department: newVideo.department || "AIDS / CSE",
      youtubeUrl: newVideo.youtubeUrl.trim(),
      language: (newVideo.language as any) || "Tamil",
      duration: newVideo.duration?.trim() || "15:00 mins",
      uploadedBy: newVideo.uploadedBy || "Studio",
      createdAt: new Date().toISOString()
    };
    await saveCollegeVideoTutorial(item);
    setVideos([item, ...videos]);
    setActiveModal(null);
    setNewVideo({ title: "", topic: "Algorithm Simulation", department: "AIDS / CSE", youtubeUrl: "https://www.youtube.com", language: "Tamil", duration: "15:00 mins", uploadedBy: "V-Lab Studio" });
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video tutorial?")) return;
    await deleteCollegeVideoTutorial(id, activeCollege.slug);
    setVideos(videos.filter((v) => v.id !== id));
  };

  // 5. Save Announcement
  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.content) return;
    const item: CollegeAnnouncement = {
      id: `ann_${activeCollege.slug}_${Date.now()}`,
      collegeSlug: activeCollege.slug,
      title: newAnnouncement.title.trim(),
      content: newAnnouncement.content.trim(),
      priority: (newAnnouncement.priority as any) || "normal",
      date: newAnnouncement.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: (newAnnouncement.category as any) || "Lab Schedule",
      createdAt: new Date().toISOString()
    };
    await saveCollegeAnnouncement(item);
    setAnnouncements([item, ...announcements]);
    setActiveModal(null);
    setNewAnnouncement({ title: "", content: "", priority: "normal", date: "Sep 2026", category: "Lab Schedule" });
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    await deleteCollegeAnnouncement(id, activeCollege.slug);
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  // --- LOGIN SCREEN IF NOT AUTHENTICATED ---
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
          <Card className="w-full max-w-md border-border/80 shadow-2xl bg-card/90 backdrop-blur-xl rounded-2xl overflow-hidden">
            <div className="h-2.5 w-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600" />
            
            <CardHeader className="text-center space-y-2 pt-8 pb-4">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/20">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <Badge variant="outline" className="mx-auto text-[10px] uppercase font-mono bg-primary/10 text-primary border-primary/20">
                Multi-Campus Control Room
              </Badge>
              <CardTitle className="text-2xl font-black font-heading text-foreground">
                Institutional Admin Access
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Enter your administrative credentials to manage college lab materials, manuals, custom simulators, and student cohorts.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 pt-2">
              {loginError && (
                <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-center gap-2 font-medium">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    <span>Administrator Email</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="admin@vsb.ac.in"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    className="h-10 text-xs bg-muted/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1.5">
                    <Key className="h-3.5 w-3.5 text-primary" />
                    <span>Master Access Key</span>
                  </Label>
                  <Input
                    type="password"
                    placeholder="••••••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                    className="h-10 text-xs bg-muted/40 font-mono"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-rose-600/20 text-xs cursor-pointer"
                >
                  <Lock className="h-3.5 w-3.5 mr-2" />
                  <span>{isSubmitting ? "Authenticating Master Key..." : "Unlock Management Panel"}</span>
                </Button>

                <div className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEmailInput(ADMIN_EMAIL);
                      setPasswordInput(ADMIN_PASSWORD);
                      setIsAdminAuthenticated(true);
                      try {
                        localStorage.setItem(ADMIN_STORAGE_KEY, "true");
                      } catch {}
                    }}
                    className="w-full h-9 text-xs border-dashed border-rose-500/40 text-rose-600 hover:text-rose-700 hover:bg-rose-500/10 rounded-xl font-semibold gap-1.5 cursor-pointer"
                  >
                    <Key className="h-3.5 w-3.5 text-rose-500" />
                    <span>Instant Admin Access (Auto-fill &amp; Login)</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // --- AUTHENTICATED ADMIN DASHBOARD ---
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Admin Header Bar with College Switcher */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-red-600 text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black font-heading text-foreground">
                    Institutional Control Room
                  </h1>
                  <Badge variant="outline" className="text-[10px] uppercase font-mono bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                    Live Cloud Sync
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Managing isolated tenant resources, lab manuals, and student rosters for accredited colleges.
                </p>
              </div>
            </div>

            {/* College Tenant Selector */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-muted/60 p-1.5 rounded-xl border border-border">
                <Building className="h-4 w-4 text-primary ml-2 shrink-0" />
                <span className="text-xs font-semibold text-muted-foreground">Active College:</span>
                <select
                  value={activeCollegeSlug}
                  onChange={(e) => setActiveCollegeSlug(e.target.value)}
                  className="h-8 px-2.5 rounded-lg bg-background border border-border text-xs font-bold text-foreground focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  {COLLEGES_REGISTRY.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name} ({c.shortName})
                    </option>
                  ))}
                </select>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="h-10 text-xs font-semibold rounded-xl gap-1.5"
                asChild
              >
                <Link href={`/c/${activeCollege.slug}`} target="_blank">
                  <ExternalLink className="h-3.5 w-3.5 text-primary" />
                  <span>View College Portal</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="h-10 text-xs text-destructive hover:bg-destructive/10 rounded-xl gap-1.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </Button>
            </div>
          </div>

          {/* College Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="border border-border/80 bg-card">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Registered Students</p>
                  <p className="text-2xl font-black font-heading text-foreground mt-0.5">{students.length}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/80 bg-card">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Lab Manuals</p>
                  <p className="text-2xl font-black font-heading text-foreground mt-0.5">{manuals.length}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <BookOpen className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/80 bg-card">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Study Materials</p>
                  <p className="text-2xl font-black font-heading text-foreground mt-0.5">{materials.length}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/80 bg-card">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Custom Experiments</p>
                  <p className="text-2xl font-black font-heading text-foreground mt-0.5">{customLabs.length}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <FlaskConical className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tenant Tabs: Students, Materials, Manuals, Custom Labs, Videos, Announcements */}
          <Tabs defaultValue="students" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-3">
              <TabsList className="bg-muted/60 p-1 rounded-xl flex-wrap h-auto">
                <TabsTrigger value="students" className="text-xs font-semibold gap-1.5 rounded-lg">
                  <Users className="h-3.5 w-3.5" />
                  <span>Students ({students.length})</span>
                </TabsTrigger>
                <TabsTrigger value="manuals" className="text-xs font-semibold gap-1.5 rounded-lg">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Lab Manuals ({manuals.length})</span>
                </TabsTrigger>
                <TabsTrigger value="materials" className="text-xs font-semibold gap-1.5 rounded-lg">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Study Notes ({materials.length})</span>
                </TabsTrigger>
                <TabsTrigger value="labs" className="text-xs font-semibold gap-1.5 rounded-lg">
                  <FlaskConical className="h-3.5 w-3.5" />
                  <span>Custom Labs ({customLabs.length})</span>
                </TabsTrigger>
                <TabsTrigger value="videos" className="text-xs font-semibold gap-1.5 rounded-lg">
                  <Video className="h-3.5 w-3.5" />
                  <span>Video Tutorials ({videos.length})</span>
                </TabsTrigger>
                <TabsTrigger value="announcements" className="text-xs font-semibold gap-1.5 rounded-lg">
                  <Radio className="h-3.5 w-3.5" />
                  <span>Notices ({announcements.length})</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* TAB 1: STUDENTS ROSTER */}
            <TabsContent value="students" className="space-y-4 mt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/30 p-4 rounded-xl border border-border">
                <div className="flex flex-1 items-center gap-3 w-full">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={`Search ${activeCollege.shortName} students by name or register number...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9 text-xs bg-background"
                    />
                  </div>
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="h-9 px-3 rounded-md border border-input bg-background text-xs font-medium text-foreground shrink-0"
                  >
                    <option value="all">All Departments</option>
                    {activeCollege.departments.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleExportCSV}
                    disabled={filteredStudents.length === 0}
                    className="h-9 text-xs font-semibold gap-1.5"
                  >
                    <Download className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Export CIE Sheet (CSV)</span>
                  </Button>
                </div>
              </div>

              {/* Students Table */}
              <div className="rounded-xl border border-border overflow-hidden bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/60 text-muted-foreground font-semibold border-b border-border">
                      <tr>
                        <th className="p-3.5">Student Name</th>
                        <th className="p-3.5">Register Number</th>
                        <th className="p-3.5">Department & Class</th>
                        <th className="p-3.5 text-center">Labs Completed</th>
                        <th className="p-3.5 text-center">Quiz Scores</th>
                        <th className="p-3.5 text-center">Last Active</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-muted-foreground">
                            {isLoadingData ? "Loading student records..." : `No students registered under ${activeCollege.shortName} yet.`}
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((s) => (
                          <tr key={s.uid} className="hover:bg-muted/30 transition-colors">
                            <td className="p-3.5 font-bold text-foreground flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                                {s.name.charAt(0)}
                              </div>
                              <span>{s.name}</span>
                            </td>
                            <td className="p-3.5 font-mono text-primary font-bold">
                              {s.registerNumber}
                            </td>
                            <td className="p-3.5 text-muted-foreground">
                              {s.department} • <span className="text-foreground font-medium">{s.className || s.year || "III Year"}</span>
                            </td>
                            <td className="p-3.5 text-center">
                              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold">
                                {s.completedExperiments?.length || 0} Labs
                              </Badge>
                            </td>
                            <td className="p-3.5 text-center">
                              <Badge variant="secondary" className="font-mono text-[11px]">
                                {Object.keys(s.quizScores || {}).length} Tests
                              </Badge>
                            </td>
                            <td className="p-3.5 text-center text-muted-foreground text-[11px]">
                              {s.lastActive ? new Date(s.lastActive).toLocaleDateString() : "Active Today"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: LAB MANUALS (CRUD) */}
            <TabsContent value="manuals" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Lab Manuals for {activeCollege.shortName}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Upload and manage official practical manuals, observation sheets, and syllabus mapping.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setActiveModal("manual")}
                  className="h-9 bg-primary text-primary-foreground font-semibold text-xs gap-1.5 rounded-xl shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Lab Manual</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {manuals.map((man) => (
                  <Card key={man.id} className="border border-border/80 bg-card">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-[10px] font-mono bg-primary/10 text-primary border-primary/20">
                          {man.labCode}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">{man.semester}</span>
                      </div>
                      <CardTitle className="text-sm font-bold text-foreground line-clamp-1 pt-1">
                        {man.labName}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                        {man.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex items-center justify-between border-t border-border/40 mt-2">
                      <span className="text-[10px] text-muted-foreground">{man.department}</span>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs px-2 gap-1" asChild>
                          <a href={man.manualUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-3 w-3" />
                            <span>Link</span>
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteManual(man.id)}
                          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* TAB 3: STUDY MATERIALS (CRUD) */}
            <TabsContent value="materials" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Study Notes & Question Banks for {activeCollege.shortName}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Manage 2-Marks, 16-Marks, lecture PDFs, and lab sheets.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setActiveModal("material")}
                  className="h-9 bg-primary text-primary-foreground font-semibold text-xs gap-1.5 rounded-xl shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Study Material</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {materials.map((mat) => (
                  <Card key={mat.id} className="border border-border/80 bg-card">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-[10px] font-mono">
                          {mat.category}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">{mat.semester}</span>
                      </div>
                      <CardTitle className="text-sm font-bold text-foreground line-clamp-1 pt-1">
                        {mat.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                        {mat.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex items-center justify-between border-t border-border/40 mt-2">
                      <span className="text-[10px] text-muted-foreground">{mat.uploadedBy}</span>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs px-2.5 gap-1" asChild>
                          <a href={mat.fileUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                            <span>Open</span>
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteMaterial(mat.id)}
                          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* TAB 4: CUSTOM LABS (CRUD) */}
            <TabsContent value="labs" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Additional & Custom Experiments for {activeCollege.shortName}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Add new simulation modules or external simulator links for your department.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setActiveModal("lab")}
                  className="h-9 bg-primary text-primary-foreground font-semibold text-xs gap-1.5 rounded-xl shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Custom Lab</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customLabs.map((lab) => (
                  <Card key={lab.id} className="border border-border/80 bg-card">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20">
                          {lab.domain}
                        </Badge>
                        <span className="text-[10px] font-medium text-emerald-600">{lab.difficulty}</span>
                      </div>
                      <CardTitle className="text-sm font-bold text-foreground line-clamp-1 pt-1">
                        {lab.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                        {lab.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex items-center justify-between border-t border-border/40 mt-2">
                      <span className="text-[10px] text-muted-foreground">{lab.department}</span>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs px-2.5 gap-1" asChild>
                          <Link href={lab.labUrl}>
                            <ExternalLink className="h-3 w-3" />
                            <span>Test</span>
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteCustomLab(lab.id)}
                          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* TAB 5: VIDEO TUTORIALS (CRUD) */}
            <TabsContent value="videos" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Video Tutorials & Walkthroughs for {activeCollege.shortName}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Manage Tamil/English lab explanation videos and viva voce walkthroughs.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setActiveModal("video")}
                  className="h-9 bg-primary text-primary-foreground font-semibold text-xs gap-1.5 rounded-xl shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Video Guide</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((vid) => (
                  <Card key={vid.id} className="border border-border/80 bg-card">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-[10px] bg-red-500/10 text-red-600 border-red-500/20">
                          {vid.language} • {vid.duration}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">{vid.topic}</span>
                      </div>
                      <CardTitle className="text-sm font-bold text-foreground line-clamp-1 pt-1">
                        {vid.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex items-center justify-between border-t border-border/40 mt-2">
                      <span className="text-[10px] text-muted-foreground">{vid.department}</span>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs px-2.5 gap-1 text-red-600" asChild>
                          <a href={vid.youtubeUrl} target="_blank" rel="noopener noreferrer">
                            <Video className="h-3 w-3" />
                            <span>Watch</span>
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteVideo(vid.id)}
                          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* TAB 6: ANNOUNCEMENTS (CRUD) */}
            <TabsContent value="announcements" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    College Circulars & Notices for {activeCollege.shortName}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Publish model exam timetables, assessment deadlines, and lab instructions.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setActiveModal("announcement")}
                  className="h-9 bg-primary text-primary-foreground font-semibold text-xs gap-1.5 rounded-xl shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Publish Notice</span>
                </Button>
              </div>

              <div className="space-y-3">
                {announcements.map((ann) => (
                  <Card key={ann.id} className="border border-border/80 bg-card">
                    <CardContent className="p-4 flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] font-mono">
                            {ann.category}
                          </Badge>
                          <span className="text-xs font-bold text-foreground">{ann.title}</span>
                          <span className="text-[10px] text-muted-foreground">• {ann.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{ann.content}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteAnnouncement(ann.id)}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* --- CRUD MODALS --- */}

      {/* 1. Modal: Add Lab Manual */}
      <Dialog open={activeModal === "manual"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Add Lab Manual for {activeCollege.shortName}</DialogTitle>
            <DialogDescription className="text-xs">Upload new semester manual and observation PDF link.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveManual} className="space-y-3 text-xs">
            <div>
              <Label className="text-xs">Laboratory Name</Label>
              <Input
                placeholder="e.g. Data Structures & Algorithms Lab"
                value={newManual.labName}
                onChange={(e) => setNewManual({ ...newManual, labName: e.target.value })}
                required
                className="text-xs h-8 mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Lab Subject Code</Label>
                <Input
                  placeholder="e.g. CS3351"
                  value={newManual.labCode}
                  onChange={(e) => setNewManual({ ...newManual, labCode: e.target.value })}
                  required
                  className="text-xs h-8 mt-1 font-mono"
                />
              </div>
              <div>
                <Label className="text-xs">Semester</Label>
                <Input
                  placeholder="e.g. Semester III"
                  value={newManual.semester}
                  onChange={(e) => setNewManual({ ...newManual, semester: e.target.value })}
                  className="text-xs h-8 mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Department</Label>
              <Input
                placeholder="e.g. AIDS & CSE"
                value={newManual.department}
                onChange={(e) => setNewManual({ ...newManual, department: e.target.value })}
                className="text-xs h-8 mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Manual PDF / Drive URL</Label>
              <Input
                placeholder="https://drive.google.com/..."
                value={newManual.manualUrl}
                onChange={(e) => setNewManual({ ...newManual, manualUrl: e.target.value })}
                required
                className="text-xs h-8 mt-1 font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Input
                placeholder="Key topics and algorithm outlines"
                value={newManual.description}
                onChange={(e) => setNewManual({ ...newManual, description: e.target.value })}
                className="text-xs h-8 mt-1"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-white h-9 mt-2 text-xs font-bold">
              Save Lab Manual
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2. Modal: Add Study Material */}
      <Dialog open={activeModal === "material"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Add Study Notes for {activeCollege.shortName}</DialogTitle>
            <DialogDescription className="text-xs">Add lecture notes, 2-marks question banks, or reference material.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveMaterial} className="space-y-3 text-xs">
            <div>
              <Label className="text-xs">Title</Label>
              <Input
                placeholder="e.g. Unit-3 B-Trees & Graph Algorithms Notes"
                value={newMaterial.title}
                onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                required
                className="text-xs h-8 mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Category</Label>
                <select
                  value={newMaterial.category}
                  onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value as any })}
                  className="w-full h-8 px-2 rounded-md border border-input bg-background text-xs mt-1"
                >
                  <option value="Lecture Notes">Lecture Notes</option>
                  <option value="Question Bank">Question Bank</option>
                  <option value="Lab Sheet">Lab Sheet</option>
                  <option value="Syllabus & Curriculum">Syllabus</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">Semester</Label>
                <Input
                  placeholder="e.g. Semester IV"
                  value={newMaterial.semester}
                  onChange={(e) => setNewMaterial({ ...newMaterial, semester: e.target.value })}
                  className="text-xs h-8 mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Resource Link / File URL</Label>
              <Input
                placeholder="https://drive.google.com/..."
                value={newMaterial.fileUrl}
                onChange={(e) => setNewMaterial({ ...newMaterial, fileUrl: e.target.value })}
                required
                className="text-xs h-8 mt-1 font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Input
                placeholder="Brief summary of the notes"
                value={newMaterial.description}
                onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                className="text-xs h-8 mt-1"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-white h-9 mt-2 text-xs font-bold">
              Save Study Material
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* 3. Modal: Add Custom Lab */}
      <Dialog open={activeModal === "lab"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Add Custom Lab for {activeCollege.shortName}</DialogTitle>
            <DialogDescription className="text-xs">Connect an additional simulation module or custom testbed.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveCustomLab} className="space-y-3 text-xs">
            <div>
              <Label className="text-xs">Experiment Title</Label>
              <Input
                placeholder="e.g. Memory Allocation Simulator"
                value={newCustomLab.title}
                onChange={(e) => setNewCustomLab({ ...newCustomLab, title: e.target.value })}
                required
                className="text-xs h-8 mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Domain</Label>
                <Input
                  placeholder="e.g. Operating Systems"
                  value={newCustomLab.domain}
                  onChange={(e) => setNewCustomLab({ ...newCustomLab, domain: e.target.value })}
                  className="text-xs h-8 mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Difficulty</Label>
                <select
                  value={newCustomLab.difficulty}
                  onChange={(e) => setNewCustomLab({ ...newCustomLab, difficulty: e.target.value as any })}
                  className="w-full h-8 px-2 rounded-md border border-input bg-background text-xs mt-1"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div>
              <Label className="text-xs">Simulator URL / Route</Label>
              <Input
                placeholder="e.g. /experiments/c-programming or external URL"
                value={newCustomLab.labUrl}
                onChange={(e) => setNewCustomLab({ ...newCustomLab, labUrl: e.target.value })}
                required
                className="text-xs h-8 mt-1 font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Input
                placeholder="Instructions and goals"
                value={newCustomLab.description}
                onChange={(e) => setNewCustomLab({ ...newCustomLab, description: e.target.value })}
                className="text-xs h-8 mt-1"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-white h-9 mt-2 text-xs font-bold">
              Save Custom Lab
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* 4. Modal: Add Video */}
      <Dialog open={activeModal === "video"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Add Video Tutorial for {activeCollege.shortName}</DialogTitle>
            <DialogDescription className="text-xs">Attach Tamil or English video guides for lab experiments.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveVideo} className="space-y-3 text-xs">
            <div>
              <Label className="text-xs">Video Title</Label>
              <Input
                placeholder="e.g. Quick Sort Algorithm Live Walkthrough in Tamil"
                value={newVideo.title}
                onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                required
                className="text-xs h-8 mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Language</Label>
                <select
                  value={newVideo.language}
                  onChange={(e) => setNewVideo({ ...newVideo, language: e.target.value as any })}
                  className="w-full h-8 px-2 rounded-md border border-input bg-background text-xs mt-1"
                >
                  <option value="Tamil">Tamil</option>
                  <option value="English">English</option>
                  <option value="Bilingual">Bilingual</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">Duration</Label>
                <Input
                  placeholder="e.g. 18:30 mins"
                  value={newVideo.duration}
                  onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                  className="text-xs h-8 mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">YouTube / Video URL</Label>
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                value={newVideo.youtubeUrl}
                onChange={(e) => setNewVideo({ ...newVideo, youtubeUrl: e.target.value })}
                required
                className="text-xs h-8 mt-1 font-mono"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-white h-9 mt-2 text-xs font-bold">
              Save Video Tutorial
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* 5. Modal: Add Announcement */}
      <Dialog open={activeModal === "announcement"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Publish Notice for {activeCollege.shortName}</DialogTitle>
            <DialogDescription className="text-xs">Publish lab exam announcements, submission deadlines, or circulars.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveAnnouncement} className="space-y-3 text-xs">
            <div>
              <Label className="text-xs">Notice Heading</Label>
              <Input
                placeholder="e.g. Practical Model Examination - Cycle 1 Announced"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                required
                className="text-xs h-8 mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Category</Label>
                <select
                  value={newAnnouncement.category}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value as any })}
                  className="w-full h-8 px-2 rounded-md border border-input bg-background text-xs mt-1"
                >
                  <option value="Lab Schedule">Lab Schedule</option>
                  <option value="Model Exam">Model Exam</option>
                  <option value="Assignment">Assignment</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">Priority</Label>
                <select
                  value={newAnnouncement.priority}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value as any })}
                  className="w-full h-8 px-2 rounded-md border border-input bg-background text-xs mt-1"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            <div>
              <Label className="text-xs">Notice Content</Label>
              <Input
                placeholder="Detailed circular text"
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                required
                className="text-xs h-8 mt-1"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-white h-9 mt-2 text-xs font-bold">
              Publish Notice
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading Admin Portal...</div>}>
      <AdminPageContent />
    </Suspense>
  );
}
