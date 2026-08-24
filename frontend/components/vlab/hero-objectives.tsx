"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Sparkles, BookOpen, Compass, CheckCircle2, ArrowRight } from "lucide-react";

export function HeroObjectives() {
  return (
    <section className="py-12 md:py-16 border-b border-border/40 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Banner Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <FlaskConical className="h-3.5 w-3.5" />
            <span>Official Department Virtual Laboratory Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground font-heading">
            Department of <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">AI & Data Science</span> Virtual Labs
          </h1>
          
          <p className="mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
            An interactive, simulation-based digital laboratory curriculum aligned with the National Virtual Labs initiative. Practice data structure algorithms, run experiments, take assessments, and master core engineering concepts remotely.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2 font-semibold shadow-md">
              <Link href="/labs">
                Explore Virtual Labs <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/visualizer">
                <Sparkles className="h-4 w-4 text-primary" /> DSA Visualizers
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="gap-2">
              <Link href="/dashboard">
                <BookOpen className="h-4 w-4" /> Student Portal
              </Link>
            </Button>
          </div>
        </div>

        {/* National Virtual Labs Inspired Tabs: OBJECTIVES & THE PHILOSOPHY */}
        <div className="max-w-4xl mx-auto bg-card/60 backdrop-blur-md rounded-2xl border border-secondary/40 p-6 sm:p-8 shadow-sm">
          <Tabs defaultValue="objectives" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 max-w-md mx-auto">
              <TabsTrigger value="objectives" className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                Objectives
              </TabsTrigger>
              <TabsTrigger value="philosophy" className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                The Philosophy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="objectives" className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-xl font-bold text-foreground font-heading text-center mb-4">
                Core Objectives of the Virtual Laboratory
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>1. Remote Access</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    To provide 24/7 remote-access to simulation-based computing and data science laboratories for autonomous, self-paced student learning.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>2. Inquiry Learning</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    To enthuse engineering students to conduct experiments by arousing curiosity through interactive step-by-step visualizers and algorithmic simulators.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>3. Complete LMS Hub</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    To provide a full Learning Management System around Virtual Labs with procedures, code scripts, self-evaluation quizzes, and verified progress tracking.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="philosophy" className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-xl font-bold text-foreground font-heading text-center mb-4">
                The Educational Philosophy
              </h3>
              <p>
                Physical laboratory sessions are often constrained by fixed time slots, limited hardware setups, and lack of visual intuition for internal algorithmic states.
              </p>
              <p>
                Virtual Labs bridge this critical gap by transforming abstract computer science concepts—such as pointer manipulation, recursion call frames, array partitions, and memory allocation—into tangible visual experiments that students can interact with repeatedly at zero cost.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
