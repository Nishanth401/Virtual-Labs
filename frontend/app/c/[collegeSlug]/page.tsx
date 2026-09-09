"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { getCollegeBySlug, COLLEGES_REGISTRY, CollegeData } from "@/data/colleges";
import {
  getCollegeMaterials,
  getCollegeLabManuals,
  getCollegeCustomLabs,
  getCollegeVideoTutorials,
  getCollegeAnnouncements,
  CollegeMaterial,
  CollegeLabManual,
  CollegeCustomLab,
  CollegeVideoTutorial,
  CollegeAnnouncement
} from "@/lib/supabase-multitenant";
import { useAuth } from "@/context/auth-context";
import { saveStudentProfileToDb, verifyEmailAndRegNoUnique, StudentProfile } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  GraduationCap,
  Sparkles,
  BookOpen,
  FileText,
  Video,
  FlaskConical,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Download,
  Calendar,
  Layers,
  ShieldCheck,
  User,
  School,
  Lock,
  Compass,
  Play,
  Share2,
  ChevronRight
} from "lucide-react";

interface CollegePortalPageProps {
  params: Promise<{
    collegeSlug: string;
  }>;
}

export default function CollegePortalPage({ params }: CollegePortalPageProps) {
  const resolvedParams = use(params);
  const collegeSlug = resolvedParams.collegeSlug?.toLowerCase() || "vsb";
  const router = useRouter();

  const college: CollegeData = getCollegeBySlug(collegeSlug) || {
    id: `col_${collegeSlug}`,
    slug: collegeSlug,
    name: `${collegeSlug.toUpperCase()} Engineering College`,
    shortName: collegeSlug.toUpperCase(),
    code: "0000",
    tagline: "Autonomous Institution on V-Labs Multi-Campus Cloud",
    location: "Tamil Nadu, India",
    logo: "/icons/vsb-logo.png",
    bannerGradient: "from-slate-900 via-zinc-900 to-rose-950",
    accentColor: "#e11d48",
    accreditation: ["Autonomous", "NBA Ready", "AICTE Approved"],
    affiliations: "Affiliated to Anna University",
    departments: [
      { code: "AIDS", name: "Artificial Intelligence & Data Science", classes: ["AIDS - A", "AIDS - B"], years: ["I Year", "II Year", "III Year", "IV Year"] },
      { code: "CSE", name: "Computer Science & Engineering", classes: ["CSE - A", "CSE - B"], years: ["I Year", "II Year", "III Year", "IV Year"] }
    ],
    curriculumInfo: {
      regulation: "Autonomous Regulations 2023",
      semesterFocus: "Even & Odd Semester Virtual Laboratory Modules",
      autonomousLabFeatures: [
        "Curriculum-Mapped Interactive Simulations",
        "Continuous Internal Evaluation & Viva Voce",
        "Autonomous Practical Examination Readiness"
      ]
    },
    subscriptionPlan: "Enterprise Campus",
    status: "active"
  };

  const auth = useAuth();
  const { user, studentProfile, isProfileComplete, completeStudentProfile } = auth || {};

  // College-scoped data states
  const [materials, setMaterials] = useState<CollegeMaterial[]>([]);
  const [manuals, setManuals] = useState<CollegeLabManual[]>([]);
  const [customLabs, setCustomLabs] = useState<CollegeCustomLab[]>([]);
  const [videos, setVideos] = useState<CollegeVideoTutorial[]>([]);
  const [announcements, setAnnouncements] = useState<CollegeAnnouncement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Student Activation Form State
  const [studentName, setStudentName] = useState("");
  const [registerNo, setRegisterNo] = useState("");
  const [selectedDept, setSelectedDept] = useState(college.departments[0]?.name || "Artificial Intelligence & Data Science");
  const [selectedYear, setSelectedYear] = useState("III Year");
  const [selectedClass, setSelectedClass] = useState(college.departments[0]?.classes[0] || "Section A");
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState("");
  const [profileErrorMsg, setProfileErrorMsg] = useState("");

  // Load tenant-isolated data
  useEffect(() => {
    async function loadTenantData() {
      setIsLoading(true);
      try {
        const [mats, mans, labs, vids, anns] = await Promise.all([
          getCollegeMaterials(collegeSlug),
          getCollegeLabManuals(collegeSlug),
          getCollegeCustomLabs(collegeSlug),
          getCollegeVideoTutorials(collegeSlug),
          getCollegeAnnouncements(collegeSlug)
        ]);
        setMaterials(mats);
        setManuals(mans);
        setCustomLabs(labs);
        setVideos(vids);
        setAnnouncements(anns);
      } catch (err) {
        console.error("Error loading college tenant data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadTenantData();
  }, [collegeSlug]);

  // Pre-fill student info if already logged in for this college
  useEffect(() => {
    if (studentProfile) {
      if (studentProfile.name) setStudentName(studentProfile.name);
      if (studentProfile.registerNumber && !studentProfile.registerNumber.startsWith("STUDENT")) {
        setRegisterNo(studentProfile.registerNumber);
      }
      if (studentProfile.department) setSelectedDept(studentProfile.department);
      if (studentProfile.year) setSelectedYear(studentProfile.year);
      if (studentProfile.className) setSelectedClass(studentProfile.className);
    }
  }, [studentProfile]);

  const handleStudentActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileErrorMsg("");
    setProfileSuccessMsg("");

    if (!studentName.trim()) {
      setProfileErrorMsg("Please enter your full student name.");
      return;
    }
    if (!registerNo.trim()) {
      setProfileErrorMsg("Please enter your official College Register Number.");
      return;
    }

    const cleanName = studentName.trim();
    const cleanRegNo = registerNo.trim().toUpperCase();
    const currentUid = user?.uid || studentProfile?.uid || `stu_${collegeSlug}_${cleanRegNo}`;
    const email = user?.email || studentProfile?.email || `${cleanRegNo.toLowerCase()}@${collegeSlug}.edu`;

    setIsSubmittingProfile(true);
    try {
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
        collegeSlug: college.slug,
        collegeName: college.name,
        collegeCode: college.code,
        department: selectedDept,
        year: selectedYear,
        className: selectedClass,
        yearSemester: `${selectedYear} / ${selectedClass}`,
        profileCompleted: true,
        lastActive: new Date().toISOString()
      };

      await saveStudentProfileToDb(updated);

      if (typeof window !== "undefined") {
        localStorage.setItem(`vlab_student_${currentUid}`, JSON.stringify(updated));
        localStorage.setItem("vsb_student_profile_data", JSON.stringify(updated));
      }

      setProfileSuccessMsg(`Profile successfully activated for ${college.shortName}! Full laboratory access unlocked.`);
      
      // Auto-redirect to labs after brief delay
      setTimeout(() => {
        router.push("/labs");
      }, 1200);
    } catch (err: any) {
      setProfileErrorMsg(err?.message || "Failed to save profile. Please try again.");
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* College Branded Header Banner */}
      <section className={`relative text-white py-12 md:py-16 bg-gradient-to-r ${college.bannerGradient} border-b border-border/40 overflow-hidden shadow-2xl`}>
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl sm:text-2xl font-black text-white shadow-xl shrink-0">
                {college.shortName.slice(0, 3)}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-[10px] uppercase font-mono">
                    Official College Portal
                  </Badge>
                  <span className="text-xs text-white/80 font-mono">
                    College Code: <strong className="text-white">{college.code}</strong>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white font-heading">
                  {college.name}
                </h1>

                <p className="text-xs sm:text-sm text-white/85 max-w-2xl font-sans">
                  {college.tagline} • {college.location}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {college.accreditation.map((acc, i) => (
                    <span key={i} className="text-[10px] px-2.5 py-0.5 rounded-md bg-black/30 backdrop-blur-sm border border-white/15 text-white/90 font-medium">
                      {acc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions / Admin Link */}
            <div className="flex flex-wrap md:flex-col items-end gap-2.5 shrink-0">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs font-semibold rounded-xl gap-1.5 backdrop-blur-md"
                asChild
              >
                <Link href={`/admin?college=${college.slug}`}>
                  <Lock className="h-3.5 w-3.5" />
                  <span>College Admin Panel</span>
                </Link>
              </Button>

              <Button
                className="bg-white hover:bg-white/90 text-slate-900 text-xs font-bold rounded-xl gap-1.5 shadow-lg shadow-black/20"
                asChild
              >
                <Link href="/labs">
                  <FlaskConical className="h-3.5 w-3.5 text-primary" />
                  <span>Open Virtual Labs</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 py-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Top Row: Academic Integration Info + Student Activation Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: How Virtual Lab is Tailored for this College */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="border border-border/80 bg-card/70 backdrop-blur-md shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase font-mono">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>Curriculum & Lab Integration</span>
                  </div>
                  <CardTitle className="text-xl font-bold font-heading text-foreground">
                    Virtual Laboratories for {college.shortName} Studies
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Tailored for {college.curriculumInfo.regulation} and continuous evaluation standards.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 text-xs text-muted-foreground leading-relaxed">
                  <p>
                    Welcome to the official Virtual Laboratory environment for <strong>{college.name}</strong>. 
                    This portal provides interactive simulation engines for Computer Science, AI & Data Science, and allied branches. 
                    You can execute step-by-step algorithms, run real-world Machine Learning pipelines, debug C programs, and test SQL queries with zero local setup.
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Key Academic Features for Your Semester:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {college.curriculumInfo.autonomousLabFeatures.map((feat, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-muted/40 border border-border/60 flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-[11px] text-foreground font-medium">{feat}</span>
                        </div>
                      ))}
                      <div className="p-2.5 rounded-xl bg-muted/40 border border-border/60 flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-foreground font-medium">Viva Voce Self-Assessment & Quizzes</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-muted/40 border border-border/60 flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-foreground font-medium">Automated Observation Record Logging</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Announcements Bar */}
                  {announcements.length > 0 && (
                    <div className="mt-4 p-3.5 rounded-xl bg-primary/5 border border-primary/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-primary text-[11px] font-bold">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Department Notice: {announcements[0].title}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{announcements[0].content}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Core Lab Shortcuts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link href="/dsa-visualization" className="p-3.5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-md text-center space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 mx-auto flex items-center justify-center font-bold text-xs">
                    DSA
                  </div>
                  <div className="font-bold text-xs text-foreground">DSA Visualizer</div>
                  <div className="text-[10px] text-muted-foreground">Sorting & Trees</div>
                </Link>

                <Link href="/experiments/mldl" className="p-3.5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-md text-center space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 mx-auto flex items-center justify-center font-bold text-xs">
                    ML
                  </div>
                  <div className="font-bold text-xs text-foreground">ML & AI Track</div>
                  <div className="text-[10px] text-muted-foreground">Regression & CNN</div>
                </Link>

                <Link href="/experiments/dbms" className="p-3.5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-md text-center space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 mx-auto flex items-center justify-center font-bold text-xs">
                    SQL
                  </div>
                  <div className="font-bold text-xs text-foreground">DBMS Studio</div>
                  <div className="text-[10px] text-muted-foreground">Query Execution</div>
                </Link>

                <Link href="/experiments/c-programming" className="p-3.5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-md text-center space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center font-bold text-xs">
                    C
                  </div>
                  <div className="font-bold text-xs text-foreground">C Programming</div>
                  <div className="text-[10px] text-muted-foreground">Pointers & Memory</div>
                </Link>
              </div>
            </div>

            {/* Right: Student Details Activation Form */}
            <div className="lg:col-span-5">
              <Card className="border-2 border-primary/40 bg-card shadow-xl rounded-2xl overflow-hidden relative">
                <div className="h-2 w-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600" />
                
                <CardHeader className="p-5 pb-3">
                  <Badge variant="outline" className="w-fit text-[10px] font-mono uppercase bg-primary/10 text-primary border-primary/25">
                    Student Portal Activation
                  </Badge>
                  <CardTitle className="text-lg font-bold font-heading text-foreground">
                    Confirm Student Details
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Verify your identity under {college.shortName} to log simulation scores & progress.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-5 pt-2">
                  {profileSuccessMsg && (
                    <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-600 font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>{profileSuccessMsg}</span>
                    </div>
                  )}

                  {profileErrorMsg && (
                    <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/25 text-xs text-destructive font-medium flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{profileErrorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleStudentActivation} className="space-y-3.5">
                    {/* Student Name */}
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-primary" />
                        <span>Student Full Name</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder="e.g. Rohith E"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="text-xs h-9 bg-muted/30"
                        required
                      />
                    </div>

                    {/* Register Number */}
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold flex items-center gap-1.5">
                        <GraduationCap className="h-3.5 w-3.5 text-primary" />
                        <span>College Register Number ({college.code}...)</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder={`e.g. ${college.code || "9225"}24243133`}
                        value={registerNo}
                        onChange={(e) => setRegisterNo(e.target.value)}
                        className="text-xs h-9 bg-muted/30 font-mono"
                        required
                      />
                    </div>

                    {/* Department Dropdown */}
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold flex items-center gap-1.5">
                        <School className="h-3.5 w-3.5 text-primary" />
                        <span>Department</span>
                      </Label>
                      <select
                        value={selectedDept}
                        onChange={(e) => {
                          setSelectedDept(e.target.value);
                          const deptObj = college.departments.find((d) => d.name === e.target.value);
                          if (deptObj?.classes[0]) setSelectedClass(deptObj.classes[0]);
                        }}
                        className="w-full h-9 px-3 rounded-md border border-input bg-muted/30 text-xs text-foreground focus:ring-1 focus:ring-primary"
                      >
                        {college.departments.map((dept) => (
                          <option key={dept.code} value={dept.name}>
                            {dept.name} ({dept.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Year & Class Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Year of Study</Label>
                        <select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          className="w-full h-9 px-2 rounded-md border border-input bg-muted/30 text-xs text-foreground focus:ring-1 focus:ring-primary"
                        >
                          <option value="I Year">I Year</option>
                          <option value="II Year">II Year</option>
                          <option value="III Year">III Year</option>
                          <option value="IV Year">IV Year</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Class / Section</Label>
                        <select
                          value={selectedClass}
                          onChange={(e) => setSelectedClass(e.target.value)}
                          className="w-full h-9 px-2 rounded-md border border-input bg-muted/30 text-xs text-foreground focus:ring-1 focus:ring-primary"
                        >
                          {college.departments
                            .find((d) => d.name === selectedDept)
                            ?.classes.map((cls) => (
                              <option key={cls} value={cls}>
                                {cls}
                              </option>
                            )) || <option value="Section A">Section A</option>}
                        </select>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmittingProfile}
                      className="w-full h-10 mt-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-rose-600/20 text-xs gap-1.5"
                    >
                      <span>{isSubmittingProfile ? "Activating..." : "Save Details & Launch Virtual Lab"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* College Isolated Resources Tabs */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold font-heading text-foreground">
                  {college.shortName} Department Resource Repository
                </h3>
                <p className="text-xs text-muted-foreground">
                  Exclusive materials, lab manuals, custom simulations, and video tutorials managed for {college.name}.
                </p>
              </div>
            </div>

            <Tabs defaultValue="manuals" className="w-full">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full max-w-2xl bg-muted/60 p-1 rounded-xl">
                <TabsTrigger value="manuals" className="text-xs font-semibold gap-1.5 rounded-lg">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Lab Manuals ({manuals.length})</span>
                </TabsTrigger>
                <TabsTrigger value="materials" className="text-xs font-semibold gap-1.5 rounded-lg">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Study Notes ({materials.length})</span>
                </TabsTrigger>
                <TabsTrigger value="custom-labs" className="text-xs font-semibold gap-1.5 rounded-lg">
                  <FlaskConical className="h-3.5 w-3.5" />
                  <span>Custom Labs ({customLabs.length})</span>
                </TabsTrigger>
                <TabsTrigger value="videos" className="text-xs font-semibold gap-1.5 rounded-lg">
                  <Video className="h-3.5 w-3.5" />
                  <span>Video Guides ({videos.length})</span>
                </TabsTrigger>
              </TabsList>

              {/* 1. Lab Manuals Tab */}
              <TabsContent value="manuals" className="mt-6">
                {manuals.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-muted/20 border border-dashed border-border text-xs text-muted-foreground">
                    No lab manuals uploaded yet for {college.shortName}. Faculty can upload them in the Admin Panel.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {manuals.map((manual) => (
                      <Card key={manual.id} className="border border-border/80 bg-card hover:border-primary/50 transition-all hover:shadow-md">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-[10px] font-mono bg-primary/10 text-primary border-primary/20">
                              {manual.labCode}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground">{manual.semester}</span>
                          </div>
                          <CardTitle className="text-sm font-bold text-foreground line-clamp-1 pt-1">
                            {manual.labName}
                          </CardTitle>
                          <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                            {manual.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-2 flex items-center justify-between border-t border-border/40 mt-2">
                          <span className="text-[10px] text-muted-foreground">Dept: {manual.department}</span>
                          <div className="flex items-center gap-1.5">
                            <Button size="sm" variant="outline" className="h-7 text-xs px-2 gap-1 rounded-lg" asChild>
                              <a href={manual.manualUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="h-3 w-3" />
                                <span>Manual PDF</span>
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* 2. Study Materials Tab */}
              <TabsContent value="materials" className="mt-6">
                {materials.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-muted/20 border border-dashed border-border text-xs text-muted-foreground">
                    No materials uploaded yet for {college.shortName}.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {materials.map((mat) => (
                      <Card key={mat.id} className="border border-border/80 bg-card hover:border-primary/50 transition-all hover:shadow-md">
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
                          <Button size="sm" variant="outline" className="h-7 text-xs px-2.5 gap-1 rounded-lg" asChild>
                            <a href={mat.fileUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3" />
                              <span>Open Notes</span>
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* 3. Custom Labs Tab */}
              <TabsContent value="custom-labs" className="mt-6">
                {customLabs.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-muted/20 border border-dashed border-border text-xs text-muted-foreground">
                    No custom labs added for this college yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {customLabs.map((lab) => (
                      <Card key={lab.id} className="border border-border/80 bg-card hover:border-primary/50 transition-all hover:shadow-md">
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
                          <span className="text-[10px] text-muted-foreground">Dept: {lab.department}</span>
                          <Button size="sm" className="h-7 text-xs px-2.5 gap-1 rounded-lg bg-primary text-white" asChild>
                            <Link href={lab.labUrl}>
                              <Play className="h-3 w-3" />
                              <span>Launch</span>
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* 4. Video Tutorials Tab */}
              <TabsContent value="videos" className="mt-6">
                {videos.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-muted/20 border border-dashed border-border text-xs text-muted-foreground">
                    No video tutorials uploaded yet for this college.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((vid) => (
                      <Card key={vid.id} className="border border-border/80 bg-card hover:border-primary/50 transition-all hover:shadow-md">
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
                          <Button size="sm" variant="outline" className="h-7 text-xs px-2.5 gap-1 rounded-lg text-red-600" asChild>
                            <a href={vid.youtubeUrl} target="_blank" rel="noopener noreferrer">
                              <Video className="h-3 w-3" />
                              <span>Watch Video</span>
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
