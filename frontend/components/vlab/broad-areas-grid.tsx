"use client";

import React from "react";
import Link from "next/link";
import { LABS_DATA } from "@/data/labs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, BrainCircuit, Database, Network, ArrowRight, Star, Sparkles, BookOpen, Layers } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  BrainCircuit,
  Database,
  Network,
};

export function BroadAreasGrid() {
  return (
    <section className="py-14 bg-muted/20 border-b border-border/40">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="outline" className="mb-2 text-xs uppercase tracking-wider bg-primary/10 text-primary border-primary/20 font-mono">
            Curriculum Core Domains
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-heading">
            Department Laboratories Catalogue
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Explore our 4 core engineering virtual laboratories with simulation sandboxes, Java/Python code traces, and LeetCode assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {LABS_DATA.map((lab) => {
            const Icon = ICON_MAP[lab.iconName] || Code2;

            return (
              <div
                key={lab.id}
                className="transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]"
              >
                <Card className="h-full border-border bg-card/80 backdrop-blur-xs hover:border-primary/50 transition-all duration-200 shadow-xs hover:shadow-lg flex flex-col justify-between group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <Icon className="h-5 w-5" />
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

                    <CardTitle className="text-lg font-bold mt-3 group-hover:text-primary transition-colors">
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
