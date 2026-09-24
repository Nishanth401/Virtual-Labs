"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  MaterialContent,
  getMaterialForResource,
} from "@/data/material-contents";
import { ResourceItem } from "@/data/resources";
import {
  BookOpen,
  Code2,
  HelpCircle,
  FlaskConical,
  Edit3,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  ExternalLink,
  Sparkles,
  GraduationCap,
  Clock,
  Layers,
  ChevronRight,
  Printer,
  Globe,
  Share2,
  Lightbulb,
  CheckCircle2,
  Play
} from "lucide-react";

interface MaterialReaderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  resource: ResourceItem | null;
}

export function MaterialReaderDialog({
  isOpen,
  onClose,
  resource,
}: MaterialReaderDialogProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("guide");
  const [activeCodeLang, setActiveCodeLang] = useState<string>("java");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [studentNotes, setStudentNotes] = useState<string>("");
  const [savedNoteMsg, setSavedNoteMsg] = useState(false);
  const [expandedVivaIdx, setExpandedVivaIdx] = useState<number | null>(0);

  // Retrieve matching structured study material
  const material: MaterialContent = resource
    ? getMaterialForResource(resource)
    : getMaterialForResource({ title: "Data Structures" });

  // Load / Save student notes in localStorage
  useEffect(() => {
    if (resource?.id || material.id) {
      const key = `vlab_study_note_${resource?.id || material.id}`;
      const saved = localStorage.getItem(key);
      if (saved) setStudentNotes(saved);
      else setStudentNotes("");
    }
  }, [resource, material.id]);

  const handleSaveNotes = () => {
    const key = `vlab_study_note_${resource?.id || material.id}`;
    localStorage.setItem(key, studentNotes);
    setSavedNoteMsg(true);
    setTimeout(() => setSavedNoteMsg(false), 2000);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCompleteGuide = () => {
    const text = `# ${material.title}\n\nSubject: ${material.subject}\nCategory: ${material.category}\n\n## Overview\n${material.overview}\n\n## Key Concepts\n${material.keyConcepts.map(k => `### ${k.title}\n${k.description}\n${k.points?.join('\n') || ''}`).join('\n\n')}\n\n## Complexity\n${material.complexityAnalysis.timeComplexity}\n${material.complexityAnalysis.spaceComplexity}`;
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!resource) return null;

  // Determine available code languages for this material
  const codeLanguages = Object.keys(material.codeSnippets) as (keyof typeof material.codeSnippets)[];
  const currentLang = codeLanguages.includes(activeCodeLang as any)
    ? (activeCodeLang as keyof typeof material.codeSnippets)
    : codeLanguages[0] || "java";

  const fontSizeClass =
    fontSize === "sm" ? "text-xs sm:text-sm" : fontSize === "lg" ? "text-base sm:text-lg" : "text-sm sm:text-base";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`p-0 overflow-hidden flex flex-col bg-background/95 backdrop-blur-xl border-border shadow-2xl transition-all duration-200 ${
          isFullscreen
            ? "!fixed !inset-2 !max-w-none !w-[calc(100vw-1rem)] !h-[calc(100vh-1rem)] rounded-2xl"
            : "!max-w-5xl !w-[95vw] !h-[90vh] rounded-3xl"
        }`}
      >
        {/* Top Header Bar */}
        <div className="p-5 sm:p-6 pb-4 border-b border-border/80 bg-card/60 backdrop-blur-md flex flex-col gap-3 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-[11px] font-mono border-primary/30 text-primary bg-primary/5">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  {resource.subject}
                </Badge>
                <Badge variant="secondary" className="text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {resource.provider} Curriculum
                </Badge>
                <span className="inline-flex items-center text-[11px] text-muted-foreground font-mono gap-1">
                  <Clock className="h-3 w-3" />
                  {material.readTime}
                </span>
              </div>
              <DialogTitle className="text-xl sm:text-2xl font-black text-foreground font-heading tracking-tight truncate">
                {resource.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground line-clamp-1">
                {resource.description}
              </DialogDescription>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5 shrink-0 pt-1">
              {/* Font Sizer */}
              <div className="hidden sm:flex items-center border border-border rounded-xl p-0.5 bg-muted/40">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setFontSize("sm")}
                  className={`h-6 px-2 text-xs font-bold rounded-lg ${fontSize === "sm" ? "bg-background text-primary shadow-xs" : "text-muted-foreground"}`}
                >
                  A-
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setFontSize("base")}
                  className={`h-6 px-2 text-xs font-bold rounded-lg ${fontSize === "base" ? "bg-background text-primary shadow-xs" : "text-muted-foreground"}`}
                >
                  A
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setFontSize("lg")}
                  className={`h-6 px-2 text-xs font-bold rounded-lg ${fontSize === "lg" ? "bg-background text-primary shadow-xs" : "text-muted-foreground"}`}
                >
                  A+
                </Button>
              </div>

              {/* Fullscreen Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="h-8 w-8 p-0 rounded-xl"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 w-full h-9 bg-muted/50 p-1 rounded-xl">
              <TabsTrigger value="guide" className="text-xs font-bold gap-1.5 data-[state=active]:bg-card">
                <BookOpen className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Study Guide</span>
                <span className="sm:hidden">Notes</span>
              </TabsTrigger>
              <TabsTrigger value="code" className="text-xs font-bold gap-1.5 data-[state=active]:bg-card">
                <Code2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Code Lab</span>
                <span className="sm:hidden">Code</span>
              </TabsTrigger>
              <TabsTrigger value="viva" className="text-xs font-bold gap-1.5 data-[state=active]:bg-card">
                <HelpCircle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Viva Q&A</span>
                <span className="sm:hidden">Viva</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="text-xs font-bold gap-1.5 data-[state=active]:bg-card">
                <Edit3 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">My Notes</span>
                <span className="sm:hidden">Notes</span>
              </TabsTrigger>
              <TabsTrigger value="web" className="text-xs font-bold gap-1.5 data-[state=active]:bg-card">
                <Globe className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Web Mirror</span>
                <span className="sm:hidden">Web</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Tab Contents (Scrollable Area) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* TAB 1: STUDY GUIDE */}
          {activeTab === "guide" && (
            <div className={`space-y-6 ${fontSizeClass} max-w-4xl mx-auto leading-relaxed`}>
              {/* Overview Callout */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-primary/20 space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Topic Overview & Syllabus Alignment</span>
                </div>
                <p className="text-foreground/90 font-medium">{material.overview}</p>

                {material.simulatorUrl && (
                  <div className="pt-2 flex items-center justify-between flex-wrap gap-2 border-t border-border/60">
                    <span className="text-xs text-muted-foreground font-mono">
                      Interactive Simulation Available for this Topic
                    </span>
                    <Button
                      size="sm"
                      className="h-7 text-xs font-bold rounded-xl bg-primary text-white gap-1.5"
                      asChild
                    >
                      <Link href={material.simulatorUrl}>
                        <Play className="h-3 w-3" />
                        <span>Launch {material.simulatorName || "Virtual Lab"}</span>
                      </Link>
                    </Button>
                  </div>
                )}
              </div>

              {/* Learning Objectives */}
              <Card className="border border-border/80 bg-card/80">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Key Learning Outcomes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground">
                    {material.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-foreground/90">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Detailed Key Concepts */}
              <div className="space-y-5">
                <h3 className="text-lg font-black text-foreground font-heading tracking-tight">
                  Theoretical Foundations & Architectural Mechanics
                </h3>
                {material.keyConcepts.map((concept, idx) => (
                  <Card key={idx} className="border border-border bg-card/90 shadow-2xs">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-bold text-foreground">
                        {concept.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground leading-relaxed">{concept.description}</p>
                      {concept.points && concept.points.length > 0 && (
                        <div className="bg-muted/40 rounded-xl p-3.5 border border-border/60 space-y-1.5">
                          {concept.points.map((pt, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90">
                              <span className="text-primary font-bold font-mono shrink-0">•</span>
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Algorithm Step-by-Step */}
              {material.algorithmSteps && material.algorithmSteps.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-foreground font-heading tracking-tight">
                    Step-by-Step Algorithm Execution
                  </h3>
                  <div className="space-y-3">
                    {material.algorithmSteps.map((alg) => (
                      <div
                        key={alg.step}
                        className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border shadow-2xs"
                      >
                        <div className="h-7 w-7 rounded-xl bg-primary/10 text-primary font-bold font-mono text-xs flex items-center justify-center shrink-0 border border-primary/20">
                          {alg.step}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-foreground">{alg.title}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">{alg.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Complexity Analysis Box */}
              <div className="p-5 rounded-2xl bg-muted/40 border border-border space-y-3">
                <h4 className="text-sm font-bold text-foreground font-mono flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span>Asymptotic Complexity Profile (Big-O)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-mono">
                  <div className="p-3 bg-background rounded-xl border border-border">
                    <span className="text-muted-foreground block text-[11px]">Time Complexity:</span>
                    <span className="font-bold text-primary">{material.complexityAnalysis.timeComplexity}</span>
                  </div>
                  <div className="p-3 bg-background rounded-xl border border-border">
                    <span className="text-muted-foreground block text-[11px]">Space Complexity:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {material.complexityAnalysis.spaceComplexity}
                    </span>
                  </div>
                </div>
                {material.complexityAnalysis.notes && (
                  <p className="text-xs text-muted-foreground italic">{material.complexityAnalysis.notes}</p>
                )}
              </div>

              {/* Real World Applications */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span>Real-World Engineering & Industry Use Cases</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {material.realWorldApplications.map((app, aIdx) => (
                    <div
                      key={aIdx}
                      className="p-3 rounded-xl bg-card border border-border/80 text-xs sm:text-sm text-foreground/90 flex items-start gap-2"
                    >
                      <span className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CODE LAB */}
          {activeTab === "code" && (
            <div className="space-y-5 max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-card border border-border rounded-2xl">
                <div className="flex items-center gap-1.5">
                  {codeLanguages.map((lang) => (
                    <Button
                      key={lang}
                      size="sm"
                      variant={currentLang === lang ? "default" : "outline"}
                      onClick={() => setActiveCodeLang(lang)}
                      className={`text-xs font-bold rounded-xl h-7.5 px-3 uppercase ${
                        currentLang === lang ? "bg-primary text-white" : ""
                      }`}
                    >
                      {lang}
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyCode(material.codeSnippets[currentLang] || "")}
                    className="h-7.5 text-xs font-bold gap-1.5 rounded-xl"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Code Display Window */}
              <div className="relative rounded-2xl overflow-hidden border border-border bg-[#0d1117] text-[#e6edf3] font-mono text-xs sm:text-sm shadow-xl">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-[#30363d] text-xs text-[#8b949e]">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 font-bold uppercase">{currentLang} Implementation</span>
                  </div>
                  <span>UTF-8 • Formatted</span>
                </div>

                <pre className="p-5 overflow-x-auto leading-relaxed max-h-[550px] font-mono">
                  <code>{material.codeSnippets[currentLang] || "// Code snippet not available for this language."}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: VIVA VOCE & INTERVIEW Q&A */}
          {activeTab === "viva" && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs sm:text-sm space-y-1">
                <h4 className="font-bold flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span>University Examination & Technical Viva Bank</span>
                </h4>
                <p>Curated questions frequently asked in lab viva voce exams and technical interview rounds.</p>
              </div>

              <div className="space-y-3">
                {material.vivaQuestions.map((viva, qIdx) => {
                  const isExpanded = expandedVivaIdx === qIdx;
                  return (
                    <Card
                      key={qIdx}
                      className="border border-border bg-card transition-all cursor-pointer hover:border-primary/50"
                      onClick={() => setExpandedVivaIdx(isExpanded ? null : qIdx)}
                    >
                      <CardHeader className="p-4 pb-3 flex flex-row items-start justify-between gap-3">
                        <div className="space-y-1 flex-1">
                          <span className="text-[11px] font-mono text-primary font-bold">Question {qIdx + 1}</span>
                          <CardTitle className="text-sm font-bold text-foreground leading-snug">
                            {viva.question}
                          </CardTitle>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full shrink-0">
                          <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </Button>
                      </CardHeader>
                      {isExpanded && (
                        <CardContent className="p-4 pt-0 border-t border-border/60 bg-muted/20">
                          <div className="pt-3 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
                            <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                              Verified Academic Answer:
                            </span>
                            {viva.answer}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: STUDENT SCRATCHPAD */}
          {activeTab === "notes" && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 space-y-1">
                <h4 className="font-bold text-sm text-primary flex items-center gap-1.5">
                  <Edit3 className="h-4 w-4" />
                  <span>Personal Study Scratchpad</span>
                </h4>
                <p className="text-xs text-muted-foreground">
                  Your notes are saved locally in your browser so you can revise them whenever you return to this material.
                </p>
              </div>

              <Textarea
                rows={14}
                value={studentNotes}
                onChange={(e) => setStudentNotes(e.target.value)}
                placeholder="Write your personal notes, summaries, formulas, or key reminders for this topic..."
                className="w-full text-sm font-sans p-4 rounded-2xl bg-card border-border focus:ring-primary leading-relaxed"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-mono">
                  {studentNotes.length} characters
                </span>
                <div className="flex items-center gap-2">
                  {savedNoteMsg && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Saved!
                    </span>
                  )}
                  <Button
                    size="sm"
                    onClick={handleSaveNotes}
                    className="h-8 text-xs font-bold rounded-xl bg-primary text-white"
                  >
                    Save Notes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: WEB REFERENCE */}
          {activeTab === "web" && (
            <div className="space-y-4 max-w-4xl mx-auto py-6">
              <Card className="border border-border bg-card rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <Badge variant="outline" className="text-xs font-mono border-primary/30 text-primary">
                        Official Academic Reference
                      </Badge>
                      <Badge variant="secondary" className="text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {resource.provider}
                      </Badge>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground font-heading">
                      {resource.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      All essential core concepts, code implementations, Big-O complexities, and viva questions from this curriculum have been verified and embedded directly inside the <strong>Study Guide</strong> and <strong>Code Lab</strong> tabs.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-0.5 text-xs text-center sm:text-left truncate max-w-md">
                    <span className="text-muted-foreground block font-mono">External Web Reference:</span>
                    <span className="text-foreground font-medium truncate block">{resource.fileUrl}</span>
                  </div>

                  <Button
                    size="sm"
                    className="h-9 px-4 text-xs font-bold gap-1.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white shrink-0 shadow-xs"
                    asChild
                  >
                    <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                      <span>Open {resource.provider} in New Tab</span>
                      <ExternalLink className="h-3.5 w-3.5 ml-0.5" />
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Bottom Footer Toolbar */}
        <div className="p-4 px-6 border-t border-border/80 bg-card/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyCompleteGuide}
              className="h-8 text-xs font-bold rounded-xl gap-1.5"
            >
              {copiedAll ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedAll ? "Guide Copied" : "Copy Full Notes"}</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handlePrint}
              className="h-8 text-xs font-bold rounded-xl gap-1.5 hidden sm:flex"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Guide</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {material.simulatorUrl && (
              <Button size="sm" className="h-8 text-xs font-bold rounded-xl bg-primary text-white gap-1.5" asChild>
                <Link href={material.simulatorUrl}>
                  <FlaskConical className="h-3.5 w-3.5" />
                  <span>Launch Simulator</span>
                </Link>
              </Button>
            )}
            <Button size="sm" variant="secondary" onClick={onClose} className="h-8 text-xs font-bold rounded-xl">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
