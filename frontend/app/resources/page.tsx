"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { RESOURCES_DATA, ResourceItem } from "@/data/resources";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MaterialReaderDialog } from "@/components/resources/material-reader-dialog";
import { VideoModal } from "@/components/resources/video-modal";
import { LabManualDialog } from "@/components/resources/lab-manual-dialog";
import {
  FileText,
  Search,
  Download,
  FolderOpen,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  Video,
  FlaskConical,
  Play,
  Layers,
  Sparkles,
  Eye
} from "lucide-react";

export default function ResourcesPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [tenantResources, setTenantResources] = useState<ResourceItem[]>([]);

  // Modals state for in-app viewing
  const [selectedMaterial, setSelectedMaterial] = useState<ResourceItem | null>(null);
  const [isMaterialReaderOpen, setIsMaterialReaderOpen] = useState(false);

  const [selectedVideo, setSelectedVideo] = useState<ResourceItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const [selectedManual, setSelectedManual] = useState<ResourceItem | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  // Load any dynamically uploaded/added resources from Admin Panel
  useEffect(() => {
    try {
      const dynamicItems: ResourceItem[] = [];
      const collegeSlug = "vsb";

      // 1. Dynamic Materials
      const rawMats = localStorage.getItem(`vlab_tenant_${collegeSlug}_materials`);
      if (rawMats) {
        const mats = JSON.parse(rawMats);
        mats.forEach((m: any) => {
          if (!RESOURCES_DATA.some((r) => r.title === m.title || r.fileUrl === m.fileUrl)) {
            dynamicItems.push({
              id: m.id,
              subject: m.department || "Academic Material",
              title: m.title,
              unit: "All",
              type: "Lab Material",
              provider: "Official Docs",
              format: m.fileType === "pdf" ? "PDF Manual" : "Web Guide",
              fileUrl: m.fileUrl,
              description: m.description || "Faculty uploaded reference material.",
              tags: [m.category || "Study Material", m.semester || "Semester"],
            });
          }
        });
      }

      // 2. Dynamic Manuals
      const rawMans = localStorage.getItem(`vlab_tenant_${collegeSlug}_manuals`);
      if (rawMans) {
        const mans = JSON.parse(rawMans);
        mans.forEach((m: any) => {
          if (!RESOURCES_DATA.some((r) => r.title === m.labName || r.fileUrl === m.manualUrl)) {
            dynamicItems.push({
              id: m.id,
              subject: `${m.labCode || "LAB"} — ${m.department || "Department"}`,
              title: m.labName,
              unit: "All",
              type: "Lab Manual",
              provider: "Virtual Labs Manual",
              format: "PDF Manual",
              fileUrl: m.manualUrl,
              description: m.description || "Official institutional laboratory manual.",
              tags: [m.labCode || "Manual", m.semester || "Semester"],
            });
          }
        });
      }

      // 3. Dynamic Custom Labs
      const rawLabs = localStorage.getItem(`vlab_tenant_${collegeSlug}_custom_labs`);
      if (rawLabs) {
        const labs = JSON.parse(rawLabs);
        labs.forEach((l: any) => {
          if (!RESOURCES_DATA.some((r) => r.title === l.title || r.fileUrl === l.labUrl)) {
            dynamicItems.push({
              id: l.id,
              subject: l.domain || "Virtual Simulation",
              title: l.title,
              unit: "All",
              type: "Virtual Lab",
              provider: "Simulation Studio",
              format: "Interactive Simulator",
              fileUrl: l.labUrl,
              description: l.description || "Interactive browser simulation module.",
              difficulty: l.difficulty || "Intermediate",
              tags: [l.domain || "Simulation", l.department || "Dept"],
            });
          }
        });
      }

      // 4. Dynamic Videos
      const rawVids = localStorage.getItem(`vlab_tenant_${collegeSlug}_videos`);
      if (rawVids) {
        const vids = JSON.parse(rawVids);
        vids.forEach((v: any) => {
          if (!RESOURCES_DATA.some((r) => r.title === v.title || r.fileUrl === v.youtubeUrl)) {
            dynamicItems.push({
              id: v.id,
              subject: v.topic || "Video Tutorial",
              title: v.title,
              unit: "All",
              type: "Video Tutorial",
              provider: "YouTube Video",
              format: "Video Guide",
              fileUrl: v.youtubeUrl,
              description: `${v.department} • Walkthrough simulation tutorial.`,
              duration: v.duration || "15 mins",
              language: v.language || "Tamil",
              tags: [v.language || "Tamil", v.topic || "Tutorial"],
            });
          }
        });
      }

      setTenantResources(dynamicItems);
    } catch {}
  }, []);

  const allCombinedResources = useMemo(() => {
    return [...RESOURCES_DATA, ...tenantResources];
  }, [tenantResources]);

  const resourceTypes = [
    { key: "all", label: "All Resources", icon: Layers },
    { key: "Lab Material", label: "Lab Material (In-App Guides)", icon: FileText },
    { key: "Lab Manual", label: "Lab Manuals", icon: BookOpen },
    { key: "Video Tutorial", label: "Video Tutorials", icon: Video },
    { key: "Virtual Lab", label: "Virtual Labs", icon: FlaskConical },
  ];

  const filteredResources = allCombinedResources.filter((res) => {
    const matchesType = selectedType === "all" || res.type === selectedType;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.tags && res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesType && matchesSearch;
  });

  const handleOpenResource = (res: ResourceItem) => {
    if (res.type === "Virtual Lab") {
      // In-house simulator route
      return;
    }
    if (res.type === "Video Tutorial") {
      setSelectedVideo(res);
      setIsVideoModalOpen(true);
      return;
    }
    if (res.type === "Lab Manual") {
      setSelectedManual(res);
      setIsManualModalOpen(true);
      return;
    }
    // Default: In-App Material Reader
    setSelectedMaterial(res);
    setIsMaterialReaderOpen(true);
  };

  const getProviderBadge = (provider: string) => {
    switch (provider) {
      case "GeeksforGeeks":
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            GeeksforGeeks
          </span>
        );
      case "W3Schools":
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30">
            W3Schools
          </span>
        );
      case "Virtual Labs Manual":
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary/10 text-primary border border-primary/30">
            Virtual Labs Manual
          </span>
        );
      case "YouTube Video":
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 flex items-center gap-1">
            <Video className="h-3 w-3" />
            <span>Video Guide</span>
          </span>
        );
      case "Simulation Studio":
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 flex items-center gap-1">
            <FlaskConical className="h-3 w-3" />
            <span>Interactive Simulator</span>
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-muted text-muted-foreground border">
            {provider}
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header Banner */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <GraduationCap className="h-4 w-4" />
            <span>Curated In-App Academic Vault</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-heading">
            Department <span className="bg-gradient-to-r from-primary via-rose-500 to-indigo-500 bg-clip-text text-transparent">Resource Vault</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Direct in-app access to verified academic study materials from <strong>GeeksforGeeks</strong>, <strong>W3Schools</strong>, official documentation, video masterclasses, and interactive virtual laboratories without external redirects.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-5 mb-8 space-y-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by subject, topic (e.g. Stack, Semaphores, SQL Joins, A* Search, AWS, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground shadow-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {resourceTypes.map((type) => {
              const IconComp = type.icon;
              const isActive = selectedType === type.key;
              return (
                <Button
                  key={type.key}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type.key)}
                  className={`text-xs font-bold transition-all gap-1.5 rounded-xl ${
                    isActive
                      ? "bg-primary text-white shadow-xs"
                      : "hover:bg-muted"
                  }`}
                >
                  <IconComp className="h-3.5 w-3.5" />
                  <span>{type.label}</span>
                </Button>
              );
            })}
            <span className="ml-auto text-xs text-muted-foreground font-mono">
              Showing {filteredResources.length} items
            </span>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((res, idx) => (
            <Card
              key={idx}
              className="flex flex-col h-full border border-border bg-card/90 hover:border-primary/50 hover:shadow-md transition-all group rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => handleOpenResource(res)}
            >
              <CardHeader className="p-5 pb-3 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-primary tracking-wide uppercase font-mono">
                      {res.subject}
                    </span>
                    <div className="flex items-center gap-2 pt-0.5">
                      {getProviderBadge(res.provider)}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono shrink-0">
                    {res.type}
                  </Badge>
                </div>

                <CardTitle className="text-sm font-bold text-foreground font-heading leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {res.title}
                </CardTitle>

                <CardDescription className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {res.description}
                </CardDescription>

                {(res.duration || res.language || res.difficulty) && (
                  <div className="flex items-center gap-2 pt-1 text-[11px] font-semibold text-muted-foreground">
                    {res.language && (
                      <span className="bg-red-500/10 text-red-600 px-2 py-0.5 rounded-md text-[10px] font-mono">
                        {res.language}
                      </span>
                    )}
                    {res.duration && (
                      <span className="bg-muted px-2 py-0.5 rounded-md text-[10px] font-mono">
                        {res.duration}
                      </span>
                    )}
                    {res.difficulty && (
                      <span className="bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-md text-[10px] font-mono">
                        {res.difficulty}
                      </span>
                    )}
                  </div>
                )}
              </CardHeader>

              <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-end space-y-4">
                {res.tags && res.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {res.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-2 border-t border-border/40 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {res.downloadCount ? `${res.downloadCount}+ reads` : "In-App Guide"}
                  </span>

                  {res.type === "Virtual Lab" ? (
                    <Button size="sm" className="h-8 text-xs font-bold gap-1.5 rounded-xl bg-primary text-white" asChild>
                      <Link href={res.fileUrl}>
                        <Play className="h-3 w-3" />
                        <span>Launch Simulator</span>
                      </Link>
                    </Button>
                  ) : res.type === "Video Tutorial" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs font-bold gap-1.5 rounded-xl text-red-600 hover:bg-red-500/10 border-red-500/30"
                      onClick={() => {
                        setSelectedVideo(res);
                        setIsVideoModalOpen(true);
                      }}
                    >
                      <Video className="h-3.5 w-3.5" />
                      <span>Watch in App</span>
                    </Button>
                  ) : res.type === "Lab Manual" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs font-bold gap-1.5 rounded-xl text-primary border-primary/30 hover:bg-primary/10"
                      onClick={() => {
                        setSelectedManual(res);
                        setIsManualModalOpen(true);
                      }}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>View Manual</span>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="h-8 text-xs font-bold gap-1.5 rounded-xl bg-primary text-white hover:bg-primary/90"
                      onClick={() => {
                        setSelectedMaterial(res);
                        setIsMaterialReaderOpen(true);
                      }}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Open Material</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* In-App Interactive Readers & Modals */}
      <MaterialReaderDialog
        isOpen={isMaterialReaderOpen}
        onClose={() => setIsMaterialReaderOpen(false)}
        resource={selectedMaterial}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        resource={selectedVideo}
      />

      <LabManualDialog
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        resource={selectedManual}
      />

      <Footer />
    </div>
  );
}
