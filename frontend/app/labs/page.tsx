"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { LABS_DATA, DISCIPLINES_DATA } from "@/data/labs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, FlaskConical, Star, ArrowRight, Network, Layers, Filter } from "lucide-react";

export default function LabsCataloguePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("all");

  const filteredLabs = useMemo(() => {
    return LABS_DATA.filter((lab) => {
      const matchesSearch =
        lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDiscipline =
        selectedDiscipline === "all" || lab.disciplineSlug === selectedDiscipline;

      return matchesSearch && matchesDiscipline;
    });
  }, [searchQuery, selectedDiscipline]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10 bg-muted/20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <FlaskConical className="h-3.5 w-3.5" />
              <span>Department Virtual Lab Catalogue</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-heading">
              Browse Virtual Laboratories
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Select an engineering laboratory to view instructional manuals, step-by-step procedures, interactive simulators, and self-evaluation tests.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search labs by name, topic, or keyword (e.g., Stacks, AI, Networks)..."
                className="pl-10 h-11 text-xs sm:text-sm bg-card border-secondary/40 shadow-xs"
              />
            </div>

            {/* Discipline Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 justify-center">
              <Button
                type="button"
                variant={selectedDiscipline === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDiscipline("all")}
                className="text-xs h-8"
              >
                All Disciplines ({LABS_DATA.length})
              </Button>
              {DISCIPLINES_DATA.map((disc) => (
                <Button
                  key={disc.id}
                  type="button"
                  variant={selectedDiscipline === disc.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDiscipline(disc.id)}
                  className="text-xs h-8"
                >
                  {disc.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Labs Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredLabs.map((lab) => (
              <Card
                key={lab.id}
                className="border-secondary/40 bg-card/70 backdrop-blur-xs flex flex-col justify-between hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20">
                      {lab.discipline}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {lab.difficulty}
                    </Badge>
                  </div>

                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                    {lab.name}
                  </CardTitle>
                  <div className="text-[11px] text-muted-foreground font-medium">
                    {lab.department}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                  <CardDescription className="text-xs leading-relaxed line-clamp-3">
                    {lab.shortDesc}
                  </CardDescription>

                  <div className="space-y-3 pt-2">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {lab.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-muted/60 text-[10px] text-muted-foreground border">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats & CTA Button */}
                    <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-foreground">
                          {lab.experimentsCount} Experiments
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
                          <Star className="h-3 w-3 fill-current" /> {lab.rating} ({lab.ratingsCount})
                        </div>
                      </div>

                      <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs gap-1.5 font-bold shadow-xs">
                        <Link href={`/labs/${lab.id}`} target="_blank" rel="noopener noreferrer">
                          <span>Enter Lab</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredLabs.length === 0 && (
            <div className="p-12 text-center bg-card rounded-2xl border border-dashed border-border/60 max-w-md mx-auto space-y-3">
              <FlaskConical className="h-10 w-10 text-muted-foreground mx-auto" />
              <h3 className="font-bold text-base">No laboratories matched your query</h3>
              <p className="text-xs text-muted-foreground">Try clearing your filters or searching for another keyword.</p>
              <Button size="sm" variant="outline" onClick={() => { setSearchQuery(""); setSelectedDiscipline("all"); }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
