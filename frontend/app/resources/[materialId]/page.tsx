"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { RESOURCES_DATA, ResourceItem, getResourceId } from "@/data/resources";
import {
  MaterialContent,
  getMaterialForResource,
  MATERIAL_CONTENTS,
} from "@/data/material-contents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Copy,
  Check,
  ExternalLink,
  GraduationCap,
  Clock,
  ChevronRight,
  ArrowLeft,
  Printer,
  Play
} from "lucide-react";

interface MaterialPageProps {
  params: Promise<{ materialId: string }>;
}

export default function MaterialDetailPage({ params }: MaterialPageProps) {
  const { materialId } = use(params);

  // 1. Locate initial resource synchronously for instant SSR render
  const initialResource =
    RESOURCES_DATA.find(
      (r) => getResourceId(r) === materialId || r.id === materialId
    ) ||
    RESOURCES_DATA.find((r) => r.type === "Lab Material") ||
    RESOURCES_DATA[0];

  const [resource, setResource] = useState<ResourceItem | null>(initialResource);
  const [viewMode, setViewMode] = useState<"handbook" | "live-portal">("handbook");
  const [activeCodeLang, setActiveCodeLang] = useState<string>("java");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [studentNotes, setStudentNotes] = useState<string>("");
  const [savedNoteMsg, setSavedNoteMsg] = useState(false);
  const [expandedVivaIdx, setExpandedVivaIdx] = useState<number | null>(0);

  useEffect(() => {
    // Check static resources or localStorage for dynamic tenant uploads
    let found = RESOURCES_DATA.find(
      (r) => getResourceId(r) === materialId || r.id === materialId
    );

    if (!found) {
      try {
        const rawMats = localStorage.getItem("vlab_tenant_vsb_materials");
        if (rawMats) {
          const mats = JSON.parse(rawMats);
          const dyn = mats.find((m: any) => m.id === materialId || getResourceId(m) === materialId);
          if (dyn) {
            found = {
              id: dyn.id,
              subject: dyn.department || "Academic Material",
              title: dyn.title,
              unit: "All",
              type: "Lab Material",
              provider: "Official Docs",
              format: "Web Guide",
              fileUrl: dyn.fileUrl,
              description: dyn.description || "Faculty uploaded reference material.",
              tags: [dyn.category || "Study Material"],
            };
          }
        }
      } catch {}
    }

    if (found) {
      setResource(found);
    }
  }, [materialId]);

  // Load study material content
  const material: MaterialContent = resource
    ? getMaterialForResource(resource)
    : MATERIAL_CONTENTS["dsa-complete-guide"];

  // Local storage notes
  useEffect(() => {
    if (materialId) {
      const savedNotes = localStorage.getItem(`vlab_page_notes_${materialId}`);
      if (savedNotes) setStudentNotes(savedNotes);
    }
  }, [materialId]);

  const handleSaveNotes = () => {
    localStorage.setItem(`vlab_page_notes_${materialId}`, studentNotes);
    setSavedNoteMsg(true);
    setTimeout(() => setSavedNoteMsg(false), 2000);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCompleteGuide = () => {
    const text = `# ${material.title}\n\nSubject: ${material.subject}\n\n## Overview\n${material.overview}\n\n## Learning Objectives\n${material.learningObjectives.join("\n")}\n\n## Key Concepts\n${material.keyConcepts.map((k) => `### ${k.title}\n${k.description}\n${k.points?.join("\n") || ""}`).join("\n\n")}`;
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  if (!resource) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="text-center space-y-3">
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
            <p className="text-muted-foreground text-sm font-medium">Loading academic material...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Available code languages for this material
  const codeLanguages = Object.keys(material.codeSnippets) as (keyof typeof material.codeSnippets)[];
  const currentLang = codeLanguages.includes(activeCodeLang as any)
    ? (activeCodeLang as keyof typeof material.codeSnippets)
    : codeLanguages[0] || "java";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      {/* Top Breadcrumbs & Mode Switcher Bar */}
      <div className="border-b border-border/80 bg-card/50 backdrop-blur-md pt-20 sm:pt-24 pb-3">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground truncate">
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs font-bold gap-1 rounded-xl" asChild>
              <Link href="/resources">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Resource Vault</span>
              </Link>
            </Button>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
            <span className="text-[#0284c7] font-semibold truncate hidden sm:inline">{resource.subject}</span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50 hidden sm:inline" />
            <span className="text-foreground font-semibold truncate max-w-xs">{resource.title}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* View Mode Toggle (In-App Handbook vs Live In-App Web Portal) */}
            <div className="flex items-center p-0.5 bg-muted/60 rounded-xl border border-border">
              <button
                type="button"
                onClick={() => setViewMode("handbook")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  viewMode === "handbook"
                    ? "bg-[#0284c7] text-white shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                In-App Handbook
              </button>
              {resource.fileUrl && resource.fileUrl.startsWith("http") && (
                <button
                  type="button"
                  onClick={() => setViewMode("live-portal")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    viewMode === "live-portal"
                      ? "bg-[#0284c7] text-white shadow-xs font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Live {resource.provider} Webpage
                </button>
              )}
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => window.print()}
              className="h-7.5 text-xs font-semibold gap-1.5 rounded-xl hidden md:flex"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero Title Section */}
        <div className="mb-8 space-y-4 pb-6 border-b border-border/80">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs font-mono border-primary/30 text-primary bg-primary/5 px-3 py-1">
              <GraduationCap className="h-3.5 w-3.5 mr-1.5" />
              {resource.subject}
            </Badge>
            <Badge variant="secondary" className="text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3 py-1">
              {resource.provider} Curriculum
            </Badge>
            <span className="inline-flex items-center text-xs text-muted-foreground font-mono gap-1 ml-1">
              <Clock className="h-3.5 w-3.5" />
              {material.readTime}
            </span>
            <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-mono">
              {material.difficulty}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-foreground font-heading tracking-tight leading-tight">
            {resource.title}
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-4xl">
            {resource.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              {material.simulatorUrl && (
                <Button size="sm" className="h-9 text-xs sm:text-sm font-bold rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white gap-2 shadow-xs" asChild>
                  <Link href={material.simulatorUrl}>
                    <Play className="h-4 w-4" />
                    <span>Launch {material.simulatorName || "Virtual Lab Simulator"}</span>
                  </Link>
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={handleCopyCompleteGuide} className="h-9 text-xs sm:text-sm font-bold rounded-xl gap-2">
                {copiedAll ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                <span>{copiedAll ? "Study Notes Copied!" : "Copy Full Study Guide"}</span>
              </Button>
            </div>

            {/* In-App Live Webpage Redirection Trigger */}
            {resource.fileUrl && resource.fileUrl.startsWith("http") && (
              <button
                type="button"
                onClick={() => setViewMode("live-portal")}
                className="inline-flex items-center gap-1.5 text-xs text-[#0284c7] hover:underline font-mono cursor-pointer"
              >
                <span>Curriculum Reference: {resource.provider} (Open Inside Virtual Lab)</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* CONDITION 1: IN-APP LIVE EMBEDDED GEEKSFORGEEKS / CURRICULUM PORTAL */}
        {viewMode === "live-portal" && resource.fileUrl && (
          <div className="space-y-6">
            <div className="p-4 bg-sky-500/5 rounded-2xl border border-[#0284c7]/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#0284c7] font-mono block">
                  In-App Live Curriculum Reader — {resource.provider}
                </span>
                <p className="text-xs text-muted-foreground">
                  Browsing official documentation directly inside the Virtual Labs platform.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setViewMode("handbook")}
                  className="text-xs font-semibold gap-1.5 rounded-xl border-[#0284c7]/30 text-[#0284c7] hover:bg-sky-500/10"
                >
                  <span>Switch to Structured Handbook</span>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold gap-1 rounded-xl shadow-xs"
                >
                  <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                    <span>New Tab</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Embedded Live Iframe View */}
            <div className="w-full h-[850px] rounded-3xl overflow-hidden border border-border shadow-lg bg-card relative">
              <iframe
                src={resource.fileUrl}
                title={`${resource.title} — ${resource.provider} Live Portal`}
                className="w-full h-full border-0 rounded-3xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </div>
        )}

        {/* CONDITION 2: STRUCTURED HANDBOOK VIEW */}
        {viewMode === "handbook" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT SIDEBAR: Table of Contents & Navigation (NO EMOJIS / NO ICONS) */}
            <aside className="lg:col-span-3 space-y-5 lg:sticky lg:top-32 hidden lg:block">
              <Card className="border border-border bg-card rounded-2xl p-4 shadow-xs">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono mb-3">
                  Contents &amp; Navigation
                </CardTitle>
                <nav className="space-y-1 text-xs font-medium">
                  <a
                    href="#overview"
                    className="flex items-center p-2 rounded-xl text-foreground hover:text-[#ea580c] hover:bg-orange-500/10 transition-all font-semibold"
                  >
                    <span>1. Overview &amp; Alignment</span>
                  </a>
                  <a
                    href="#outcomes"
                    className="flex items-center p-2 rounded-xl text-foreground hover:text-[#ea580c] hover:bg-orange-500/10 transition-all font-semibold"
                  >
                    <span>2. Learning Outcomes</span>
                  </a>
                  <a
                    href="#theory"
                    className="flex items-center p-2 rounded-xl text-foreground hover:text-[#ea580c] hover:bg-orange-500/10 transition-all font-semibold"
                  >
                    <span>3. Theory &amp; Concepts</span>
                  </a>
                  {material.algorithmSteps && material.algorithmSteps.length > 0 && (
                    <a
                      href="#algorithm"
                      className="flex items-center p-2 rounded-xl text-foreground hover:text-[#ea580c] hover:bg-orange-500/10 transition-all font-semibold"
                    >
                      <span>4. Step-by-Step Algorithm</span>
                    </a>
                  )}
                  <a
                    href="#complexity"
                    className="flex items-center p-2 rounded-xl text-foreground hover:text-[#ea580c] hover:bg-orange-500/10 transition-all font-semibold"
                  >
                    <span>5. Big-O Complexity</span>
                  </a>
                  <a
                    href="#code-lab"
                    className="flex items-center p-2 rounded-xl text-foreground hover:text-[#ea580c] hover:bg-orange-500/10 transition-all font-semibold"
                  >
                    <span>6. Multi-Language Code</span>
                  </a>
                  <a
                    href="#viva-bank"
                    className="flex items-center p-2 rounded-xl text-foreground hover:text-[#ea580c] hover:bg-orange-500/10 transition-all font-semibold"
                  >
                    <span>7. Viva Voce Q&amp;A Bank</span>
                  </a>
                  <a
                    href="#applications"
                    className="flex items-center p-2 rounded-xl text-foreground hover:text-[#ea580c] hover:bg-orange-500/10 transition-all font-semibold"
                  >
                    <span>8. Industry Applications</span>
                  </a>
                  <a
                    href="#scratchpad"
                    className="flex items-center p-2 rounded-xl text-foreground hover:text-[#ea580c] hover:bg-orange-500/10 transition-all font-semibold"
                  >
                    <span>9. My Study Scratchpad</span>
                  </a>
                </nav>
              </Card>

              {/* Quick Virtual Lab Launcher */}
              {material.simulatorUrl && (
                <Card className="border border-[#0284c7]/30 bg-card rounded-2xl p-4 space-y-3 shadow-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#0284c7] tracking-wider">
                      Interactive Lab Studio
                    </span>
                    <h4 className="text-sm font-bold text-foreground">
                      Practice in Virtual Sandbox
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Simulate real-time node operations, step through pointers, and run testcases.
                    </p>
                  </div>
                  <Button size="sm" className="w-full h-8 text-xs font-bold rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white gap-1.5 shadow-xs" asChild>
                    <Link href={material.simulatorUrl}>
                      <Play className="h-3.5 w-3.5" />
                      <span>Open Live Simulator</span>
                    </Link>
                  </Button>
                </Card>
              )}
            </aside>

            {/* MAIN READING COLUMN (CLEAN HEADINGS - NO EMOJIS) */}
            <div className="lg:col-span-9 space-y-10 text-sm sm:text-base leading-relaxed">
              {/* 1. OVERVIEW & SYLLABUS */}
              <section id="overview" className="space-y-4">
                <div className="p-6 rounded-2xl bg-card border border-border space-y-3 shadow-xs">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground underline decoration-[#0284c7]/40 underline-offset-4 font-heading">
                    1. Topic Overview &amp; Curriculum Scope
                  </h3>
                  <p className="text-foreground font-normal text-sm sm:text-base leading-relaxed">
                    {material.overview}
                  </p>
                </div>
              </section>

              {/* 2. LEARNING OUTCOMES */}
              <section id="outcomes" className="space-y-4">
                <Card className="border border-border bg-card rounded-2xl overflow-hidden shadow-xs">
                  <CardHeader className="p-6 pb-3">
                    <CardTitle className="text-lg sm:text-xl font-bold text-foreground underline decoration-[#0284c7]/40 underline-offset-4 font-heading">
                      2. Core Learning Outcomes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {material.learningObjectives.map((obj, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/30 border border-border"
                        >
                          <span className="h-2 w-2 rounded-full bg-[#0284c7] mt-2 shrink-0" />
                          <span className="text-foreground font-medium text-xs sm:text-sm">{obj}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 3. DETAILED THEORY & CONCEPTS */}
              <section id="theory" className="space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-foreground underline decoration-[#0284c7]/40 underline-offset-4 font-heading">
                  3. Theoretical Foundations &amp; Conceptual Mechanics
                </h2>

                <div className="space-y-5">
                  {material.keyConcepts.map((concept, idx) => (
                    <Card key={idx} className="border border-border bg-card rounded-2xl p-6 shadow-xs space-y-4">
                      <CardTitle className="text-base sm:text-lg font-bold text-foreground font-heading">
                        {concept.title}
                      </CardTitle>
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                        {concept.description}
                      </p>
                      {concept.points && concept.points.length > 0 && (
                        <div className="bg-muted/40 rounded-xl p-4 border border-border space-y-2">
                          {concept.points.map((pt, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                              <span className="text-[#0284c7] font-bold font-mono shrink-0">•</span>
                              <span className="leading-relaxed">{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </section>

              {/* 4. ALGORITHM STEP-BY-STEP */}
              {material.algorithmSteps && material.algorithmSteps.length > 0 && (
                <section id="algorithm" className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground underline decoration-[#0284c7]/40 underline-offset-4 font-heading">
                    4. Step-by-Step Algorithm Execution
                  </h2>

                  <div className="space-y-3">
                    {material.algorithmSteps.map((alg) => (
                      <div
                        key={alg.step}
                        className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border shadow-xs"
                      >
                        <div className="h-8 w-8 rounded-xl bg-sky-500/10 text-[#0284c7] font-bold font-mono text-sm flex items-center justify-center shrink-0 border border-[#0284c7]/20">
                          0{alg.step}
                        </div>
                        <div className="space-y-1 flex-1">
                          <h4 className="text-sm sm:text-base font-bold text-foreground font-heading">
                            {alg.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {alg.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 5. COMPLEXITY PROFILE */}
              <section id="complexity" className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-foreground underline decoration-[#0284c7]/40 underline-offset-4 font-heading">
                  5. Asymptotic Complexity Profile (Big-O)
                </h2>

                <div className="p-6 rounded-2xl bg-card border border-border space-y-4 shadow-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-mono">
                    <div className="p-4 bg-muted/30 rounded-xl border border-border space-y-1 shadow-2xs">
                      <span className="text-muted-foreground block text-xs font-sans">Time Complexity Profile:</span>
                      <span className="font-bold text-[#0284c7] text-sm sm:text-base">{material.complexityAnalysis.timeComplexity}</span>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl border border-border space-y-1 shadow-2xs">
                      <span className="text-muted-foreground block text-xs font-sans">Space Complexity Profile:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm sm:text-base">
                        {material.complexityAnalysis.spaceComplexity}
                      </span>
                    </div>
                  </div>
                  {material.complexityAnalysis.notes && (
                    <p className="text-xs text-muted-foreground italic px-1">{material.complexityAnalysis.notes}</p>
                  )}
                </div>
              </section>

              {/* 6. MULTI-LANGUAGE CODE LAB */}
              <section id="code-lab" className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground underline decoration-[#0284c7]/40 underline-offset-4 font-heading">
                    6. Multi-Language Source Code Lab
                  </h2>

                  {/* Language Switcher */}
                  <div className="flex items-center gap-1.5 p-1 bg-muted/60 border border-border rounded-xl">
                    {codeLanguages.map((lang) => (
                      <Button
                        key={lang}
                        size="sm"
                        variant={currentLang === lang ? "default" : "ghost"}
                        onClick={() => setActiveCodeLang(lang)}
                        className={`text-xs font-bold rounded-lg h-7 px-3 uppercase ${
                          currentLang === lang ? "bg-[#0284c7] text-white shadow-xs" : "text-muted-foreground"
                        }`}
                      >
                        {lang}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Code Editor Box */}
                <div className="relative rounded-2xl overflow-hidden border border-border bg-[#0d1117] text-[#e6edf3] font-mono text-xs sm:text-sm shadow-sm">
                  <div className="flex items-center justify-between px-5 py-3 bg-[#161b22] border-b border-[#30363d] text-xs text-[#8b949e]">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
                      <span className="font-bold uppercase text-white font-mono">{currentLang} Standard Implementation</span>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyCode(material.codeSnippets[currentLang] || "")}
                      className="h-7 text-xs font-bold gap-1.5 rounded-xl border-[#30363d] bg-[#21262d] text-white hover:bg-[#30363d]"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </Button>
                  </div>

                  <pre className="p-6 overflow-x-auto leading-relaxed max-h-[600px] font-mono">
                    <code>{material.codeSnippets[currentLang] || "// Code snippet not available for this language."}</code>
                  </pre>
                </div>
              </section>

              {/* 7. VIVA VOCE & INTERVIEW Q&A */}
              <section id="viva-bank" className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-foreground underline decoration-[#0284c7]/40 underline-offset-4 font-heading">
                  7. University Examination &amp; Technical Viva Bank
                </h2>

                <div className="space-y-3">
                  {material.vivaQuestions.map((viva, qIdx) => {
                    const isExpanded = expandedVivaIdx === qIdx;
                    return (
                      <Card
                        key={qIdx}
                        className="border border-border bg-card rounded-xl transition-all cursor-pointer hover:border-[#0284c7]/50 overflow-hidden shadow-xs"
                        onClick={() => setExpandedVivaIdx(isExpanded ? null : qIdx)}
                      >
                        <CardHeader className="p-5 flex flex-row items-start justify-between gap-4">
                          <div className="space-y-1 flex-1">
                            <span className="text-xs font-mono text-[#0284c7] font-bold">Question 0{qIdx + 1}</span>
                            <CardTitle className="text-sm sm:text-base font-bold text-foreground font-heading leading-snug">
                              {viva.question}
                            </CardTitle>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full shrink-0">
                            <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-90 text-[#0284c7]" : ""}`} />
                          </Button>
                        </CardHeader>
                        {isExpanded && (
                          <CardContent className="p-5 pt-0 border-t border-border/60 bg-muted/20">
                            <div className="pt-3 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans space-y-1">
                              <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-xs font-mono uppercase tracking-wider">
                                Verified Academic Answer:
                              </span>
                              <p className="leading-relaxed">{viva.answer}</p>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </section>

              {/* 8. REAL-WORLD APPLICATIONS */}
              <section id="applications" className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-foreground underline decoration-[#0284c7]/40 underline-offset-4 font-heading">
                  8. Real-World Engineering Applications
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {material.realWorldApplications.map((app, aIdx) => (
                    <div
                      key={aIdx}
                      className="p-4 rounded-xl bg-card border border-border text-xs sm:text-sm text-foreground font-medium flex items-start gap-3 shadow-2xs"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#0284c7] mt-1.5 shrink-0" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 9. STUDENT STUDY SCRATCHPAD */}
              <section id="scratchpad" className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-foreground underline decoration-[#0284c7]/40 underline-offset-4 font-heading">
                  9. My Personal Study Scratchpad
                </h2>

                <Card className="border border-border bg-card rounded-2xl p-6 space-y-4 shadow-xs">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-foreground">
                      Persistent Revision Notes
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Any notes, formulas, or reminders you write here are automatically saved to your browser session.
                    </p>
                  </div>

                  <Textarea
                    rows={8}
                    value={studentNotes}
                    onChange={(e) => setStudentNotes(e.target.value)}
                    placeholder="Write your personal study summary, notes, or examination pointers here..."
                    className="w-full text-sm font-sans p-4 rounded-xl bg-background border-border focus:ring-primary leading-relaxed"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">
                      {studentNotes.length} characters
                    </span>
                    <div className="flex items-center gap-2">
                      {savedNoteMsg && (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> Notes Saved!
                        </span>
                      )}
                      <Button
                        size="sm"
                        onClick={handleSaveNotes}
                        className="h-8 text-xs font-bold rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white"
                      >
                        Save Notes
                      </Button>
                    </div>
                  </div>
                </Card>
              </section>

              {/* BOTTOM CALLOUT: SIMULATOR & RELATED */}
              <div className="p-6 sm:p-8 rounded-2xl bg-card border border-[#0284c7]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-xs font-mono uppercase font-bold text-[#0284c7] tracking-wider">
                    Hands-On Interactive Practice
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground font-heading">
                    Ready to test your practical understanding?
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                    Jump directly into our visualizer engine to step through algorithms with animated memory pointers and live execution testcases.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {material.simulatorUrl && (
                    <Button size="lg" className="h-10 px-5 font-bold rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white gap-2 shadow-xs" asChild>
                      <Link href={material.simulatorUrl}>
                        <Play className="h-4 w-4" />
                        <span>Open Virtual Lab</span>
                      </Link>
                    </Button>
                  )}
                  <Button size="lg" variant="outline" className="h-10 px-5 font-bold rounded-xl" asChild>
                    <Link href="/resources">
                      <span>Back to Vault</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
