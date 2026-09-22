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
  CollegeMaterial,
  CollegeLabManual,
  CollegeCustomLab,
  CollegeVideoTutorial,
} from "@/lib/supabase-multitenant";
import { StudentProfile } from "@/lib/supabase";
import { StudentAnalyticsModal } from "@/components/admin/student-analytics-modal";
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
  Play,
  Pencil,
  Upload,
  FileUp,
  FileCode,
  Paperclip
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
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [labSearchQuery, setLabSearchQuery] = useState<string>("");
  const [labFilterDept, setLabFilterDept] = useState<string>("all");

  // Modals for CRUD (Add & Edit)
  const [activeModal, setActiveModal] = useState<
    "manual" | "edit-manual" | "material" | "edit-material" | "lab" | "edit-lab" | "video" | "edit-video" | null
  >(null);

  // Form states for adding items
  const [newManual, setNewManual] = useState<Partial<CollegeLabManual>>({
    labName: "", labCode: "", department: "AIDS & CSE", semester: "Semester III", manualUrl: "", observationUrl: "", description: "", uploadedBy: "Lab Incharge"
  });
  const [newMaterial, setNewMaterial] = useState<Partial<CollegeMaterial>>({
    title: "", description: "", category: "Lecture Notes", department: "AIDS & CSE", semester: "Semester III", fileUrl: "", fileType: "pdf", uploadedBy: "Department Faculty"
  });
  const [newCustomLab, setNewCustomLab] = useState<Partial<CollegeCustomLab>>({
    title: "", domain: "Core Computing", department: "AIDS & CSE", labUrl: "/labs/data-structures", description: "", semester: "Semester III", difficulty: "Intermediate", uploadedBy: "Academic Head"
  });
  const [newVideo, setNewVideo] = useState<Partial<CollegeVideoTutorial>>({
    title: "", topic: "Algorithm Simulation", department: "AIDS / CSE", youtubeUrl: "https://www.youtube.com", language: "Tamil", duration: "15:00 mins", uploadedBy: "V-Lab Studio"
  });

  // Form states for editing items
  const [editingManual, setEditingManual] = useState<CollegeLabManual | null>(null);
  const [editingMaterial, setEditingMaterial] = useState<CollegeMaterial | null>(null);
  const [editingLab, setEditingLab] = useState<CollegeCustomLab | null>(null);
  const [editingVideo, setEditingVideo] = useState<CollegeVideoTutorial | null>(null);

  // Uploaded File Helper State
  const [uploadedManualFileName, setUploadedManualFileName] = useState<string>("");
  const [uploadedMaterialFileName, setUploadedMaterialFileName] = useState<string>("");

  // Student Profile Analytics Modal State
  const [selectedStudentForAnalytics, setSelectedStudentForAnalytics] = useState<StudentProfile | null>(null);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState<boolean>(false);

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
      const [stuData, matData, manData, labData, vidData] = await Promise.all([
        getStudentsByCollege(slug),
        getCollegeMaterials(slug),
        getCollegeLabManuals(slug),
        getCollegeCustomLabs(slug),
        getCollegeVideoTutorials(slug),
      ]);
      setStudents(stuData);
      setMaterials(matData);
      setManuals(manData);
      setCustomLabs(labData);
      setVideos(vidData);
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

  // Filtered Labs
  const filteredLabs = useMemo(() => {
    return customLabs.filter((lab) => {
      const matchesSearch =
        lab.title.toLowerCase().includes(labSearchQuery.toLowerCase()) ||
        lab.domain.toLowerCase().includes(labSearchQuery.toLowerCase()) ||
        lab.description.toLowerCase().includes(labSearchQuery.toLowerCase()) ||
        lab.labUrl.toLowerCase().includes(labSearchQuery.toLowerCase());

      const matchesDept =
        labFilterDept === "all" ||
        lab.department.toLowerCase().includes(labFilterDept.toLowerCase());

      return matchesSearch && matchesDept;
    });
  }, [customLabs, labSearchQuery, labFilterDept]);

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

  // --- File Upload Handler for Lab Manuals ---
  const handleManualFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedManualFileName(file.name);
    // Create a local blob/URL for demonstration and direct viewing
    const fileUrl = URL.createObjectURL(file);
    setNewManual((prev) => ({
      ...prev,
      manualUrl: fileUrl,
      labName: prev.labName || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
    }));
  };

  // --- File Upload Handler for Lab Materials ---
  const handleMaterialFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedMaterialFileName(file.name);
    const fileUrl = URL.createObjectURL(file);
    setNewMaterial((prev) => ({
      ...prev,
      fileUrl: fileUrl,
      title: prev.title || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      fileType: "pdf"
    }));
  };

  // --- CRUD HANDLERS ---

  // 1. Save / Upload Lab Manual
  const handleSaveManual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newManual.labName || !newManual.manualUrl) return;
    const item: CollegeLabManual = {
      id: `man_${activeCollege.slug}_${Date.now()}`,
      collegeSlug: activeCollege.slug,
      labName: newManual.labName.trim(),
      labCode: newManual.labCode?.trim() || "AD8381",
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
    setUploadedManualFileName("");
    setNewManual({ labName: "", labCode: "", department: "AIDS & CSE", semester: "Semester III", manualUrl: "", observationUrl: "", description: "", uploadedBy: "Lab Incharge" });
  };

  const handleUpdateManual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingManual || !editingManual.labName || !editingManual.manualUrl) return;
    await saveCollegeLabManual(editingManual);
    setManuals(manuals.map((m) => (m.id === editingManual.id ? editingManual : m)));
    setActiveModal(null);
    setEditingManual(null);
  };

  const handleDeleteManual = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lab manual?")) return;
    await deleteCollegeLabManual(id, activeCollege.slug);
    setManuals(manuals.filter((m) => m.id !== id));
  };

  // 2. Save / Upload Lab Material
  const handleSaveMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaterial.title || !newMaterial.fileUrl) return;
    const item: CollegeMaterial = {
      id: `mat_${activeCollege.slug}_${Date.now()}`,
      collegeSlug: activeCollege.slug,
      title: newMaterial.title.trim(),
      description: newMaterial.description?.trim() || "",
      category: (newMaterial.category as any) || "Lecture Notes",
      department: newMaterial.department || "AIDS & CSE",
      semester: newMaterial.semester || "Semester III",
      fileUrl: newMaterial.fileUrl.trim(),
      fileType: (newMaterial.fileType as any) || "pdf",
      uploadedBy: newMaterial.uploadedBy || "Department Faculty",
      createdAt: new Date().toISOString()
    };
    await saveCollegeMaterial(item);
    setMaterials([item, ...materials]);
    setActiveModal(null);
    setUploadedMaterialFileName("");
    setNewMaterial({ title: "", description: "", category: "Lecture Notes", department: "AIDS & CSE", semester: "Semester III", fileUrl: "", fileType: "pdf", uploadedBy: "Department Faculty" });
  };

  const handleUpdateMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMaterial || !editingMaterial.title || !editingMaterial.fileUrl) return;
    await saveCollegeMaterial(editingMaterial);
    setMaterials(materials.map((m) => (m.id === editingMaterial.id ? editingMaterial : m)));
    setActiveModal(null);
    setEditingMaterial(null);
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this study material?")) return;
    await deleteCollegeMaterial(id, activeCollege.slug);
    setMaterials(materials.filter((m) => m.id !== id));
  };

  // 3. Save / Insert Virtual Lab
  const handleSaveCustomLab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomLab.title || !newCustomLab.labUrl) return;
    const item: CollegeCustomLab = {
      id: `lab_${activeCollege.slug}_${Date.now()}`,
      collegeSlug: activeCollege.slug,
      title: newCustomLab.title.trim(),
      domain: newCustomLab.domain?.trim() || "Core Computing",
      department: newCustomLab.department || "AIDS & CSE",
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
    setNewCustomLab({ title: "", domain: "Core Computing", department: "AIDS & CSE", labUrl: "/labs/data-structures", description: "", semester: "Semester III", difficulty: "Intermediate", uploadedBy: "Academic Head" });
  };

  const handleUpdateCustomLab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLab || !editingLab.title || !editingLab.labUrl) return;
    await saveCollegeCustomLab(editingLab);
    setCustomLabs(customLabs.map((l) => (l.id === editingLab.id ? editingLab : l)));
    setActiveModal(null);
    setEditingLab(null);
  };

  const handleDeleteCustomLab = async (id: string) => {
    if (!confirm("Are you sure you want to delete this virtual lab from the active college?")) return;
    await deleteCollegeCustomLab(id, activeCollege.slug);
    setCustomLabs(customLabs.filter((l) => l.id !== id));
  };

  // 4. Save / Insert Video
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

  const handleUpdateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo || !editingVideo.title || !editingVideo.youtubeUrl) return;
    await saveCollegeVideoTutorial(editingVideo);
    setVideos(videos.map((v) => (v.id === editingVideo.id ? editingVideo : v)));
    setActiveModal(null);
    setEditingVideo(null);
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video tutorial?")) return;
    await deleteCollegeVideoTutorial(id, activeCollege.slug);
    setVideos(videos.filter((v) => v.id !== id));
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
                Enter your administrative credentials to manage college laboratories, verified manuals, custom simulators, and student cohorts.
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
                  Customizing and uploading laboratory manuals, verified study materials, simulators, and video tutorials for accredited colleges.
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
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
            <Card className="border border-border/80 bg-card">
              <CardContent className="p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">Students</p>
                  <p className="text-xl font-black font-heading text-foreground mt-0.5">{students.length}</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Users className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/80 bg-card">
              <CardContent className="p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">Lab Manuals</p>
                  <p className="text-xl font-black font-heading text-foreground mt-0.5">{manuals.length}</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <BookOpen className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/80 bg-card">
              <CardContent className="p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">Lab Materials</p>
                  <p className="text-xl font-black font-heading text-foreground mt-0.5">{materials.length}</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <FileText className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/80 bg-card">
              <CardContent className="p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">Virtual Labs</p>
                  <p className="text-xl font-black font-heading text-foreground mt-0.5">{customLabs.length}</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <FlaskConical className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/80 bg-card">
              <CardContent className="p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">Video Tutorials</p>
                  <p className="text-xl font-black font-heading text-foreground mt-0.5">{videos.length}</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center">
                  <Video className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tenant Tabs: Students, Lab Manuals, Lab Materials, Virtual Labs, Video Tutorials */}
          <Tabs defaultValue="manuals" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-3">
              <TabsList className="bg-muted/60 p-1 rounded-xl flex-wrap h-auto">
                <TabsTrigger value="manuals" className="text-xs font-semibold gap-1.5 rounded-lg">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Lab Manuals ({manuals.length})</span>
                </TabsTrigger>
                <TabsTrigger value="materials" className="text-xs font-semibold gap-1.5 rounded-lg">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Lab Materials ({materials.length})</span>
                </TabsTrigger>
                <TabsTrigger value="labs" className="text-xs font-semibold gap-1.5 rounded-lg">
                  <FlaskConical className="h-3.5 w-3.5" />
                  <span>Virtual Labs ({customLabs.length})</span>
                </TabsTrigger>
                <TabsTrigger value="videos" className="text-xs font-semibold gap-1.5 rounded-lg">
                  <Video className="h-3.5 w-3.5" />
                  <span>Video Tutorials ({videos.length})</span>
                </TabsTrigger>
                <TabsTrigger value="students" className="text-xs font-semibold gap-1.5 rounded-lg">
                  <Users className="h-3.5 w-3.5" />
                  <span>Students ({students.length})</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* TAB 1: LAB MANUALS (UPLOAD, INSERT, UPDATE, DELETE) */}
            <TabsContent value="manuals" className="space-y-4 mt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Lab Manuals Customization for {activeCollege.shortName}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Upload official PDF manuals, observation sheets, edit subject codes, and manage curriculum links.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setUploadedManualFileName("");
                    setActiveModal("manual");
                  }}
                  className="h-9 bg-primary text-primary-foreground font-semibold text-xs gap-1.5 rounded-xl shadow-sm"
                >
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload / Add Lab Manual</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {manuals.map((man) => (
                  <Card key={man.id} className="border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between rounded-2xl">
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
                      <span className="text-[10px] text-muted-foreground font-medium">{man.department}</span>
                      <div className="flex items-center gap-1.5">
                        <Button size="sm" variant="outline" className="h-7 text-xs px-2.5 gap-1" asChild>
                          <a href={man.manualUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 text-primary" />
                            <span>View Link</span>
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingManual(man);
                            setActiveModal("edit-manual");
                          }}
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
                          title="Edit Lab Manual"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteManual(man.id)}
                          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                          title="Delete Lab Manual"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* TAB 2: LAB MATERIALS (UPLOAD, INSERT, UPDATE, DELETE) */}
            <TabsContent value="materials" className="space-y-4 mt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Lab Materials &amp; Study Notes Customization for {activeCollege.shortName}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Upload lecture PDFs, GeeksforGeeks/W3Schools references, 2-mark question banks, and lab observation sheets.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setUploadedMaterialFileName("");
                    setActiveModal("material");
                  }}
                  className="h-9 bg-primary text-primary-foreground font-semibold text-xs gap-1.5 rounded-xl shadow-sm"
                >
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload / Add Lab Material</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {materials.map((mat) => (
                  <Card key={mat.id} className="border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between rounded-2xl">
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
                      <span className="text-[10px] text-muted-foreground font-medium">{mat.department}</span>
                      <div className="flex items-center gap-1.5">
                        <Button size="sm" variant="outline" className="h-7 text-xs px-2.5 gap-1" asChild>
                          <a href={mat.fileUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 text-primary" />
                            <span>Open</span>
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingMaterial(mat);
                            setActiveModal("edit-material");
                          }}
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
                          title="Edit Material"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteMaterial(mat.id)}
                          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                          title="Delete Material"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* TAB 3: VIRTUAL LABS & SIMULATORS (INSERT, UPDATE, DELETE) */}
            <TabsContent value="labs" className="space-y-4 mt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Virtual Laboratories &amp; Simulators for {activeCollege.shortName}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Manage all core department labs, interactive visualizers, simulation testbeds, and custom experiments.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setActiveModal("lab")}
                  className="h-9 bg-primary text-primary-foreground font-semibold text-xs gap-1.5 rounded-xl shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Laboratory / Simulation</span>
                </Button>
              </div>

              {/* Labs Search & Dept Filter */}
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-muted/30 p-3 rounded-xl border border-border">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search labs by title, domain, or route..."
                    value={labSearchQuery}
                    onChange={(e) => setLabSearchQuery(e.target.value)}
                    className="pl-9 h-8 text-xs bg-background"
                  />
                </div>
                <select
                  value={labFilterDept}
                  onChange={(e) => setLabFilterDept(e.target.value)}
                  className="h-8 px-2.5 rounded-md border border-input bg-background text-xs font-medium text-foreground shrink-0 w-full sm:w-auto"
                >
                  <option value="all">All Disciplines / Depts</option>
                  <option value="AIDS">AIDS</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="First Year">First Years</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLabs.map((lab) => (
                  <Card key={lab.id} className="border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between rounded-2xl">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20">
                          {lab.domain}
                        </Badge>
                        <div className="flex items-center gap-1.5">
                          <Badge variant="outline" className="text-[10px] text-muted-foreground">
                            {lab.semester}
                          </Badge>
                          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            {lab.difficulty}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-sm font-bold text-foreground line-clamp-1 pt-1">
                        {lab.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                        {lab.description}
                      </CardDescription>
                      <div className="pt-1">
                        <span className="text-[10px] font-mono text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded">
                          {lab.labUrl}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex items-center justify-between border-t border-border/40 mt-2">
                      <span className="text-[10px] text-muted-foreground font-medium">{lab.department}</span>
                      <div className="flex items-center gap-1.5">
                        <Button size="sm" variant="outline" className="h-7 text-xs px-2.5 gap-1 text-primary hover:bg-primary/10" asChild>
                          <Link href={lab.labUrl} target="_blank">
                            <Play className="h-3 w-3" />
                            <span>Launch</span>
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingLab(lab);
                            setActiveModal("edit-lab");
                          }}
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
                          title="Edit Lab"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteCustomLab(lab.id)}
                          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                          title="Delete Lab"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* TAB 4: VIDEO TUTORIALS (INSERT, UPDATE, DELETE) */}
            <TabsContent value="videos" className="space-y-4 mt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Video Tutorials &amp; Walkthroughs Customization for {activeCollege.shortName}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Manage Tamil/English lab explanation videos, YouTube lecture links, and viva voce walkthroughs.
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
                  <Card key={vid.id} className="border border-border/80 bg-card flex flex-col justify-between rounded-2xl">
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
                      <span className="text-[10px] text-muted-foreground font-medium">{vid.department}</span>
                      <div className="flex items-center gap-1.5">
                        <Button size="sm" variant="outline" className="h-7 text-xs px-2.5 gap-1 text-red-600" asChild>
                          <a href={vid.youtubeUrl} target="_blank" rel="noopener noreferrer">
                            <Video className="h-3 w-3" />
                            <span>Watch</span>
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingVideo(vid);
                            setActiveModal("edit-video");
                          }}
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
                          title="Edit Video"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteVideo(vid.id)}
                          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                          title="Delete Video"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* TAB 5: STUDENTS ROSTER */}
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
                        <th className="p-3.5">Department &amp; Class</th>
                        <th className="p-3.5 text-center">Labs Completed</th>
                        <th className="p-3.5 text-center">Quiz Scores</th>
                        <th className="p-3.5 text-center">Last Active</th>
                        <th className="p-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-muted-foreground">
                            {isLoadingData ? "Loading student records..." : `No students registered under ${activeCollege.shortName} yet.`}
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((s) => (
                          <tr
                            key={s.uid}
                            onClick={() => {
                              setSelectedStudentForAnalytics(s);
                              setIsAnalyticsModalOpen(true);
                            }}
                            className="hover:bg-primary/5 cursor-pointer transition-colors group"
                            title={`Click to view detailed laboratory & DSA analytics for ${s.name}`}
                          >
                            <td className="p-3.5 font-bold text-foreground flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold group-hover:scale-105 transition-transform">
                                {s.name.charAt(0)}
                              </div>
                              <span className="group-hover:text-primary transition-colors">{s.name}</span>
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
                            <td className="p-3.5 text-right">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedStudentForAnalytics(s);
                                  setIsAnalyticsModalOpen(true);
                                }}
                                className="h-7 text-[11px] font-semibold gap-1 px-2.5 bg-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors border-border group-hover:border-primary shadow-2xs"
                              >
                                <Eye className="h-3 w-3" />
                                <span>View Progress</span>
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* --- CRUD MODALS --- */}

      {/* 1. Modal: Upload / Add Lab Manual */}
      <Dialog open={activeModal === "manual"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Upload &amp; Add Lab Manual for {activeCollege.shortName}</DialogTitle>
            <DialogDescription className="text-xs">Upload PDF file from local system or specify manual documentation URL.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveManual} className="space-y-3 text-xs">
            {/* File Upload Box */}
            <div className="p-3 border-2 border-dashed border-primary/30 rounded-xl bg-primary/5 text-center space-y-1.5">
              <Upload className="h-6 w-6 text-primary mx-auto" />
              <div className="text-xs font-semibold text-foreground">
                {uploadedManualFileName ? `Selected: ${uploadedManualFileName}` : "Upload Local PDF Manual"}
              </div>
              <p className="text-[11px] text-muted-foreground">Drag and drop or click to choose .pdf / .docx</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleManualFileUpload}
                className="text-xs file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer"
              />
            </div>

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
                  placeholder="e.g. AD8381"
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
              <Label className="text-xs">Manual PDF / Documentation Link</Label>
              <Input
                placeholder="https://www.geeksforgeeks.org/data-structures/ or file URL"
                value={newManual.manualUrl}
                onChange={(e) => setNewManual({ ...newManual, manualUrl: e.target.value })}
                required
                className="text-xs h-8 mt-1 font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Observation / Interactive Sheet URL (Optional)</Label>
              <Input
                placeholder="https://www.w3schools.com/dsa/"
                value={newManual.observationUrl || ""}
                onChange={(e) => setNewManual({ ...newManual, observationUrl: e.target.value })}
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
              Save &amp; Publish Lab Manual
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* 1b. Modal: Edit Lab Manual */}
      <Dialog open={activeModal === "edit-manual"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Edit Lab Manual</DialogTitle>
            <DialogDescription className="text-xs">Update laboratory manual title, subject code, or documentation URL.</DialogDescription>
          </DialogHeader>
          {editingManual && (
            <form onSubmit={handleUpdateManual} className="space-y-3 text-xs">
              <div>
                <Label className="text-xs">Laboratory Name</Label>
                <Input
                  value={editingManual.labName}
                  onChange={(e) => setEditingManual({ ...editingManual, labName: e.target.value })}
                  required
                  className="text-xs h-8 mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Lab Subject Code</Label>
                  <Input
                    value={editingManual.labCode}
                    onChange={(e) => setEditingManual({ ...editingManual, labCode: e.target.value })}
                    required
                    className="text-xs h-8 mt-1 font-mono"
                  />
                </div>
                <div>
                  <Label className="text-xs">Semester</Label>
                  <Input
                    value={editingManual.semester}
                    onChange={(e) => setEditingManual({ ...editingManual, semester: e.target.value })}
                    className="text-xs h-8 mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">Department</Label>
                <Input
                  value={editingManual.department}
                  onChange={(e) => setEditingManual({ ...editingManual, department: e.target.value })}
                  className="text-xs h-8 mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Manual URL / Live Link</Label>
                <Input
                  value={editingManual.manualUrl}
                  onChange={(e) => setEditingManual({ ...editingManual, manualUrl: e.target.value })}
                  required
                  className="text-xs h-8 mt-1 font-mono"
                />
              </div>
              <div>
                <Label className="text-xs">Observation Sheet URL (Optional)</Label>
                <Input
                  value={editingManual.observationUrl || ""}
                  onChange={(e) => setEditingManual({ ...editingManual, observationUrl: e.target.value })}
                  className="text-xs h-8 mt-1 font-mono"
                />
              </div>
              <div>
                <Label className="text-xs">Description</Label>
                <Input
                  value={editingManual.description}
                  onChange={(e) => setEditingManual({ ...editingManual, description: e.target.value })}
                  className="text-xs h-8 mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-white h-9 mt-2 text-xs font-bold">
                Update Lab Manual
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* 2. Modal: Upload / Add Lab Material */}
      <Dialog open={activeModal === "material"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Upload &amp; Add Lab Material for {activeCollege.shortName}</DialogTitle>
            <DialogDescription className="text-xs">Upload study notes, GFG/W3Schools reference guides, or question banks.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveMaterial} className="space-y-3 text-xs">
            {/* File Upload Box */}
            <div className="p-3 border-2 border-dashed border-emerald-500/30 rounded-xl bg-emerald-500/5 text-center space-y-1.5">
              <Upload className="h-6 w-6 text-emerald-600 mx-auto" />
              <div className="text-xs font-semibold text-foreground">
                {uploadedMaterialFileName ? `Selected: ${uploadedMaterialFileName}` : "Upload Local PDF Notes / Sheet"}
              </div>
              <p className="text-[11px] text-muted-foreground">Drag and drop or click to choose .pdf / .zip</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.zip"
                onChange={handleMaterialFileUpload}
                className="text-xs file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
              />
            </div>

            <div>
              <Label className="text-xs">Material Title</Label>
              <Input
                placeholder="e.g. Data Structures Complete Question Bank & Notes"
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
                  <option value="Reference Book">Reference Material</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">Semester</Label>
                <Input
                  placeholder="e.g. Semester III"
                  value={newMaterial.semester}
                  onChange={(e) => setNewMaterial({ ...newMaterial, semester: e.target.value })}
                  className="text-xs h-8 mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Department</Label>
              <Input
                placeholder="e.g. AIDS & CSE"
                value={newMaterial.department}
                onChange={(e) => setNewMaterial({ ...newMaterial, department: e.target.value })}
                className="text-xs h-8 mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Resource Link / File URL</Label>
              <Input
                placeholder="https://www.geeksforgeeks.org/... or local file URL"
                value={newMaterial.fileUrl}
                onChange={(e) => setNewMaterial({ ...newMaterial, fileUrl: e.target.value })}
                required
                className="text-xs h-8 mt-1 font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Input
                placeholder="Brief summary of the study material"
                value={newMaterial.description}
                onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                className="text-xs h-8 mt-1"
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-9 mt-2 text-xs font-bold">
              Save &amp; Publish Lab Material
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2b. Modal: Edit Lab Material */}
      <Dialog open={activeModal === "edit-material"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Edit Lab Material</DialogTitle>
            <DialogDescription className="text-xs">Update study material title, category, or resource URL.</DialogDescription>
          </DialogHeader>
          {editingMaterial && (
            <form onSubmit={handleUpdateMaterial} className="space-y-3 text-xs">
              <div>
                <Label className="text-xs">Title</Label>
                <Input
                  value={editingMaterial.title}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, title: e.target.value })}
                  required
                  className="text-xs h-8 mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Category</Label>
                  <select
                    value={editingMaterial.category}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, category: e.target.value as any })}
                    className="w-full h-8 px-2 rounded-md border border-input bg-background text-xs mt-1"
                  >
                    <option value="Lecture Notes">Lecture Notes</option>
                    <option value="Question Bank">Question Bank</option>
                    <option value="Lab Sheet">Lab Sheet</option>
                    <option value="Syllabus & Curriculum">Syllabus</option>
                    <option value="Reference Book">Reference Material</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Semester</Label>
                  <Input
                    value={editingMaterial.semester}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, semester: e.target.value })}
                    className="text-xs h-8 mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">Department</Label>
                <Input
                  value={editingMaterial.department}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, department: e.target.value })}
                  className="text-xs h-8 mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Resource Link / File URL</Label>
                <Input
                  value={editingMaterial.fileUrl}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, fileUrl: e.target.value })}
                  required
                  className="text-xs h-8 mt-1 font-mono"
                />
              </div>
              <div>
                <Label className="text-xs">Description</Label>
                <Input
                  value={editingMaterial.description}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, description: e.target.value })}
                  className="text-xs h-8 mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-9 mt-2 text-xs font-bold">
                Update Material
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* 3. Modal: Add Virtual Lab */}
      <Dialog open={activeModal === "lab"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Add Laboratory / Simulator for {activeCollege.shortName}</DialogTitle>
            <DialogDescription className="text-xs">Register an existing lab module, simulation route, or custom experiment.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveCustomLab} className="space-y-3 text-xs">
            <div>
              <Label className="text-xs">Laboratory / Experiment Title</Label>
              <Input
                placeholder="e.g. Data Structures & Algorithms Laboratory"
                value={newCustomLab.title}
                onChange={(e) => setNewCustomLab({ ...newCustomLab, title: e.target.value })}
                required
                className="text-xs h-8 mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Domain / Subject Category</Label>
                <Input
                  placeholder="e.g. Core Computing / AI"
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
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Department</Label>
                <Input
                  placeholder="e.g. AIDS & CSE"
                  value={newCustomLab.department}
                  onChange={(e) => setNewCustomLab({ ...newCustomLab, department: e.target.value })}
                  className="text-xs h-8 mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Semester</Label>
                <Input
                  placeholder="e.g. Semester III"
                  value={newCustomLab.semester}
                  onChange={(e) => setNewCustomLab({ ...newCustomLab, semester: e.target.value })}
                  className="text-xs h-8 mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Simulator Route / URL</Label>
              <Input
                placeholder="e.g. /labs/data-structures or /experiments/dsa"
                value={newCustomLab.labUrl}
                onChange={(e) => setNewCustomLab({ ...newCustomLab, labUrl: e.target.value })}
                required
                className="text-xs h-8 mt-1 font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Input
                placeholder="Instructions, algorithm goals, and simulation scope"
                value={newCustomLab.description}
                onChange={(e) => setNewCustomLab({ ...newCustomLab, description: e.target.value })}
                className="text-xs h-8 mt-1"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-white h-9 mt-2 text-xs font-bold">
              Save Laboratory Module
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* 3b. Modal: Edit Virtual Lab */}
      <Dialog open={activeModal === "edit-lab"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Edit Laboratory / Simulation</DialogTitle>
            <DialogDescription className="text-xs">Update laboratory title, domain, route, or difficulty.</DialogDescription>
          </DialogHeader>
          {editingLab && (
            <form onSubmit={handleUpdateCustomLab} className="space-y-3 text-xs">
              <div>
                <Label className="text-xs">Laboratory Title</Label>
                <Input
                  value={editingLab.title}
                  onChange={(e) => setEditingLab({ ...editingLab, title: e.target.value })}
                  required
                  className="text-xs h-8 mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Domain</Label>
                  <Input
                    value={editingLab.domain}
                    onChange={(e) => setEditingLab({ ...editingLab, domain: e.target.value })}
                    className="text-xs h-8 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Difficulty</Label>
                  <select
                    value={editingLab.difficulty}
                    onChange={(e) => setEditingLab({ ...editingLab, difficulty: e.target.value as any })}
                    className="w-full h-8 px-2 rounded-md border border-input bg-background text-xs mt-1"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Department</Label>
                  <Input
                    value={editingLab.department}
                    onChange={(e) => setEditingLab({ ...editingLab, department: e.target.value })}
                    className="text-xs h-8 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Semester</Label>
                  <Input
                    value={editingLab.semester}
                    onChange={(e) => setEditingLab({ ...editingLab, semester: e.target.value })}
                    className="text-xs h-8 mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">Simulator Route / URL</Label>
                <Input
                  value={editingLab.labUrl}
                  onChange={(e) => setEditingLab({ ...editingLab, labUrl: e.target.value })}
                  required
                  className="text-xs h-8 mt-1 font-mono"
                />
              </div>
              <div>
                <Label className="text-xs">Description</Label>
                <Input
                  value={editingLab.description}
                  onChange={(e) => setEditingLab({ ...editingLab, description: e.target.value })}
                  className="text-xs h-8 mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-white h-9 mt-2 text-xs font-bold">
                Update Laboratory Module
              </Button>
            </form>
          )}
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

      {/* 4b. Modal: Edit Video */}
      <Dialog open={activeModal === "edit-video"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Edit Video Tutorial</DialogTitle>
            <DialogDescription className="text-xs">Update video title, YouTube URL, or language settings.</DialogDescription>
          </DialogHeader>
          {editingVideo && (
            <form onSubmit={handleUpdateVideo} className="space-y-3 text-xs">
              <div>
                <Label className="text-xs">Video Title</Label>
                <Input
                  value={editingVideo.title}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  required
                  className="text-xs h-8 mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Language</Label>
                  <select
                    value={editingVideo.language}
                    onChange={(e) => setEditingVideo({ ...editingVideo, language: e.target.value as any })}
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
                    value={editingVideo.duration}
                    onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                    className="text-xs h-8 mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">YouTube URL</Label>
                <Input
                  value={editingVideo.youtubeUrl}
                  onChange={(e) => setEditingVideo({ ...editingVideo, youtubeUrl: e.target.value })}
                  required
                  className="text-xs h-8 mt-1 font-mono"
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-white h-9 mt-2 text-xs font-bold">
                Update Video Tutorial
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* 5. Modal: Student Analytics & Lab/DSA Progress Breakdown */}
      <StudentAnalyticsModal
        student={selectedStudentForAnalytics}
        open={isAnalyticsModalOpen}
        onOpenChange={setIsAnalyticsModalOpen}
      />

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
