"use client";

import { useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { RESOURCES_DATA, ResourceItem } from "@/data/resources";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Search, Download, FolderOpen, Video, Code, BookOpen, Layers } from "lucide-react";

export default function ResourcesPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const resourceTypes = [
    "all",
    "Notes",
    "Videos",
    "Papers",
    "Code",
    "PPTs",
    "Books",
    "Lab Manual",
    "Assignments",
  ];

  const filteredResources = RESOURCES_DATA.filter((res) => {
    const matchesType = selectedType === "all" || res.type === selectedType;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.format.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "Video":
        return <Video className="h-4 w-4 text-rose-500" />;
      case "Python":
        return <Code className="h-4 w-4 text-emerald-500" />;
      case "Book":
        return <BookOpen className="h-4 w-4 text-cyan-500" />;
      case "PPT":
        return <Layers className="h-4 w-4 text-amber-500" />;
      default:
        return <FileText className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header Banner */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
            <FolderOpen className="h-4 w-4" />
            <span>Official Academic Resource Repository</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-heading">
            Department <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Resource Vault</span>
          </h1>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Instant digital access to curated lecture notes, university exam question banks with answer keys, lab manuals, code notebooks, and textbook references.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-card/70 backdrop-blur-md border rounded-2xl p-4 sm:p-6 mb-8 space-y-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by subject, topic title, or file format (e.g., Deep Learning, SVM, Solved Question Paper)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {resourceTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="text-xs"
              >
                {type === "all" ? "All Formats" : type}
              </Button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((res, idx) => (
            <Card key={idx} className="flex flex-col h-full hover:shadow-md transition-all hover:border-primary/40">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-muted border">
                      {getFormatIcon(res.format)}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-primary">{res.subject}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {res.unit === "All" ? "Full Syllabus" : `Unit ${res.unit}`}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    {res.format}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-bold text-foreground font-heading mt-3 leading-snug line-clamp-2">
                  {res.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between pt-0 space-y-4">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/50">
                  <span className="flex items-center gap-1">
                    <Download className="h-3 w-3" /> {res.downloadCount || 100}+ downloads
                  </span>
                  <a href={res.fileUrl || "#"} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="default" className="text-xs h-7 gap-1 bg-primary hover:bg-primary/90 text-white">
                      <Download className="h-3 w-3" /> Download
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-16 bg-card border rounded-2xl p-8">
            <FolderOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-bold text-foreground font-heading">No resources match your search</h3>
            <p className="text-sm text-muted-foreground mt-1">Try clearing your filters or search keywords.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
