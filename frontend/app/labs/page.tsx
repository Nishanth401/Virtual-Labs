"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { LABS_DATA } from "@/data/labs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, FlaskConical, Star, ArrowRight, Layers, Code2, BrainCircuit, Database, Network, Cpu, Bot, BarChart3, Cloud, Server, Sparkles, Terminal } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  BrainCircuit,
  Database,
  Network,
  Cpu,
  Bot,
  BarChart3,
  Cloud,
  Server,
  Sparkles,
  Terminal,
};

export default function LabsCataloguePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLabs = useMemo(() => {
    return LABS_DATA.filter((lab) => {
      const matchesSearch =
        lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSearch;
    });
  }, [searchQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10 bg-muted/20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold font-mono">
              <FlaskConical className="h-3.5 w-3.5" />
              <span>Department Virtual Lab Catalogue</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-heading">
              Artificial Intelligence &amp; Data Science Virtual Labs
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Explore our 8 dedicated engineering laboratories: Data Structures (Java), Machine Learning (NumPy/Pandas), Database Systems (SQL), Computer Networks, Operating Systems (C/Linux), Artificial Intelligence (Python), Big Data Analytics (Hadoop/Spark), and Cloud Service Management (AWS/Docker/K8s).
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search labs by keyword (e.g. Java, Sorting, CPU, Semaphores, A* Search, Hadoop, PySpark, AWS, Docker)..."
                className="pl-10 h-11 text-xs sm:text-sm bg-card border-border shadow-xs"
              />
            </div>
          </div>

          {/* 4 Labs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto pt-2">
            {filteredLabs.map((lab) => {
              const Icon = ICON_MAP[lab.iconName] || Code2;

              return (
                <Card
                  key={lab.id}
                  className="border-border bg-card/80 backdrop-blur-xs flex flex-col justify-between hover:border-primary/50 transition-all hover:shadow-lg group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <Icon className="h-4 w-4" />
                        </div>
                        <Badge variant="outline" className="text-xs font-mono font-bold text-primary border-primary/30">
                          {lab.shortTitle} • {lab.code}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span>{lab.rating}</span>
                        <span className="text-[10px] text-muted-foreground font-normal">({lab.ratingsCount})</span>
                      </div>
                    </div>

                    <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                      {lab.name}
                    </CardTitle>
                    <div className="text-[11px] text-muted-foreground font-mono">
                      {lab.semester} • {lab.department}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                    <CardDescription className="text-xs leading-relaxed line-clamp-3">
                      {lab.shortDesc}
                    </CardDescription>

                    <div className="space-y-3 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {lab.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded bg-muted/60 text-[10px] text-muted-foreground border font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-foreground flex items-center gap-1.5">
                          <Layers className="h-3.5 w-3.5 text-primary" />
                          <span>{lab.experimentsCount} Experiments</span>
                        </span>

                        <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs gap-1.5 font-bold shadow-xs">
                          <Link href={`/labs/${lab.id}`} prefetch={true}>
                            <span>Enter Laboratory</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredLabs.length === 0 && (
            <div className="p-12 text-center bg-card rounded-2xl border border-dashed border-border max-w-md mx-auto space-y-3">
              <FlaskConical className="h-10 w-10 text-muted-foreground mx-auto" />
              <h3 className="font-bold text-base">No laboratories matched your search query</h3>
              <p className="text-xs text-muted-foreground">Try searching for Java, Sorting, Stack, or NumPy.</p>
              <Button size="sm" variant="outline" onClick={() => setSearchQuery("")}>
                Reset Filter
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
