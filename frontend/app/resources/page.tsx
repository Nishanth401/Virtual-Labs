"use client";

import { useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { RESOURCES_DATA, ResourceItem } from "@/data/resources";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Search, Download, FolderOpen, ExternalLink, BookOpen, GraduationCap, CheckCircle2 } from "lucide-react";

export default function ResourcesPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const resourceTypes = [
    { key: "all", label: "All Resources" },
    { key: "Lab Material", label: "Lab Material (GFG / W3Schools)" },
    { key: "Lab Manual", label: "Lab Manual" },
  ];

  const filteredResources = RESOURCES_DATA.filter((res) => {
    const matchesType = selectedType === "all" || res.type === selectedType;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.tags && res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesType && matchesSearch;
  });

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
            <span>Curated Academic Repository</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-heading">
            Department <span className="bg-gradient-to-r from-primary via-rose-500 to-indigo-500 bg-clip-text text-transparent">Resource Vault</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Direct access to verified laboratory study materials from <strong>GeeksforGeeks</strong>, <strong>W3Schools</strong>, official documentation, and downloadable virtual lab manuals.
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
            {resourceTypes.map((type) => (
              <Button
                key={type.key}
                variant={selectedType === type.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.key)}
                className={`text-xs font-bold transition-all ${
                  selectedType === type.key
                    ? "bg-primary text-white shadow-xs"
                    : "hover:bg-muted"
                }`}
              >
                {type.label}
              </Button>
            ))}
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
              className="flex flex-col h-full border border-border bg-card/90 hover:border-primary/50 hover:shadow-md transition-all group"
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

                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/60">
                  <span className="flex items-center gap-1 font-mono">
                    <BookOpen className="h-3.5 w-3.5 text-primary" /> {res.downloadCount || 100}+ views
                  </span>

                  {res.type === "Lab Manual" ? (
                    <a href={res.fileUrl || "#"} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="default" className="text-xs h-8 gap-1.5 bg-primary hover:bg-primary/90 text-white font-bold">
                        <Download className="h-3.5 w-3.5" /> Lab Manual (PDF)
                      </Button>
                    </a>
                  ) : (
                    <a href={res.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="default" className="text-xs h-8 gap-1.5 bg-primary hover:bg-primary/90 text-white font-bold shadow-xs">
                        <span>Open Material</span>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-16 bg-card border rounded-2xl p-8 space-y-3">
            <FolderOpen className="h-10 w-10 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-bold text-foreground font-heading">No matching resources found</h3>
            <p className="text-xs text-muted-foreground">Try clearing your search query or selecting &apos;All Resources&apos;.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
