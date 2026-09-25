"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { RESOURCES_DATA, ResourceItem, getResourceId, getYouTubeEmbedUrl } from "@/data/resources";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FileText,
  Search,
  BookOpen,
  GraduationCap,
  Video,
  FlaskConical,
  Play,
  Layers,
  ArrowRight,
  ExternalLink,
  Sparkles
} from "lucide-react";

export default function ResourcesPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [tenantResources, setTenantResources] = useState<ResourceItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<ResourceItem | null>(null);

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
              id: m.id || getResourceId({ subject: m.department, title: m.title }),
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
              id: m.id || getResourceId({ subject: m.department, title: m.labName }),
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
              id: v.id || getResourceId({ subject: v.topic, title: v.title }),
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
    { key: "Lab Material", label: "Lab Materials & Guides", icon: FileText },
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

  const getProviderBadge = (provider: string) => {
    switch (provider) {
      case "Academic Curriculum":
      case "Curriculum Handbook":
      case "Official Academic Guide":
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-500/10 text-[#0284c7] dark:text-[#38bdf8] border border-sky-500/30">
            Academic Curriculum
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
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-14">
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
            Direct in-app access to verified academic study materials, official institutional laboratory manuals, video masterclasses, and interactive virtual laboratories.
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
          {filteredResources.map((res, idx) => {
            const targetUrl =
              res.type === "Virtual Lab"
                ? res.fileUrl
                : `/resources/${getResourceId(res)}`;

            return (
              <Card
                key={idx}
                className="flex flex-col h-full border border-border bg-card/90 hover:border-primary/50 hover:shadow-md transition-all group rounded-2xl overflow-hidden"
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
                    <Link href={targetUrl} className="hover:underline">
                      {res.title}
                    </Link>
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

                  <div className="pt-2 border-t border-border/40 flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {res.downloadCount ? `${res.downloadCount}+ reads` : "In-App Guide"}
                    </span>

                    {res.type === "Virtual Lab" ? (
                      <Button size="sm" className="h-8 text-xs font-bold gap-1.5 rounded-xl bg-primary text-white hover:bg-primary/90" asChild>
                        <Link href={res.fileUrl}>
                          <Play className="h-3 w-3" />
                          <span>Launch Simulator</span>
                        </Link>
                      </Button>
                    ) : res.type === "Video Tutorial" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs font-bold gap-1.5 rounded-xl text-red-600 hover:bg-red-500/10 border-red-500/30 cursor-pointer"
                        onClick={() => setSelectedVideo(res)}
                      >
                        <Video className="h-3.5 w-3.5" />
                        <span>Watch in App</span>
                      </Button>
                    ) : res.type === "Lab Manual" ? (
                      <Button size="sm" variant="outline" className="h-8 text-xs font-bold gap-1.5 rounded-xl text-primary border-primary/30 hover:bg-primary/10" asChild>
                        <Link href={targetUrl}>
                          <BookOpen className="h-3.5 w-3.5" />
                          <span>View Manual</span>
                        </Link>
                      </Button>
                    ) : (
                      <Button size="sm" className="h-8 text-xs font-bold gap-1.5 rounded-xl bg-primary text-white hover:bg-primary/90" asChild>
                        <Link href={targetUrl}>
                          <BookOpen className="h-3.5 w-3.5" />
                          <span>Open Material</span>
                          <ArrowRight className="h-3 w-3 ml-0.5" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* In-App Video Tutorial Player Modal */}
        <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border border-border rounded-2xl shadow-2xl">
            {selectedVideo && (
              <div>
                {/* Header */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-red-500/10 via-background to-card border-b border-border flex items-start justify-between gap-4">
                  <div className="space-y-1 pr-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-[10px] font-mono border-red-500/30 text-red-600 bg-red-500/5">
                        {selectedVideo.language || "English"}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] font-mono">
                        {selectedVideo.subject}
                      </Badge>
                      {selectedVideo.duration && (
                        <span className="text-[11px] text-muted-foreground font-mono">
                          • {selectedVideo.duration}
                        </span>
                      )}
                    </div>
                    <DialogTitle className="text-base sm:text-lg font-bold text-foreground font-heading">
                      {selectedVideo.title}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground line-clamp-2">
                      {selectedVideo.description}
                    </DialogDescription>
                  </div>
                </div>

                {/* Video Player */}
                <div className="relative w-full aspect-video bg-black">
                  {selectedVideo.fileUrl && (
                    <iframe
                      src={getYouTubeEmbedUrl(selectedVideo.fileUrl)}
                      title={selectedVideo.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )}
                </div>

                {/* Actions Footer */}
                <div className="p-4 bg-muted/40 border-t border-border flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                    <span>Instructor: {selectedVideo.provider}</span>
                    <span>•</span>
                    <span>{selectedVideo.downloadCount ? `${selectedVideo.downloadCount}+ reads` : "In-App Guide"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 text-xs font-semibold gap-1.5 rounded-xl border-red-500/30 text-red-600 hover:bg-red-500/10" asChild>
                      <a href={selectedVideo.fileUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Open on YouTube</span>
                      </a>
                    </Button>

                    <Button size="sm" className="h-8 text-xs font-bold gap-1.5 rounded-xl bg-primary text-white hover:bg-primary/90" asChild>
                      <Link
                        href={`/resources/${getResourceId(selectedVideo)}`}
                        onClick={() => setSelectedVideo(null)}
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Full Lesson &amp; Notes</span>
                        <ArrowRight className="h-3 w-3 ml-0.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
}
