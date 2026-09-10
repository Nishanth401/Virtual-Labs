"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { COLLEGES_REGISTRY, CollegeData } from "@/data/colleges";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Layers,
  Lock,
  ExternalLink
} from "lucide-react";
import { BookDemoModal } from "@/components/landing-page/book-demo-modal";

export default function CollegeSelectionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const filteredColleges = COLLEGES_REGISTRY.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.includes(searchTerm) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6 bg-muted/15">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold font-mono">
              <Building2 className="h-3.5 w-3.5" />
              <span>Multi-Campus Institutional Portals</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-heading">
              Select Your College Portal
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Access your institution&apos;s custom-branded virtual laboratory portal with your private student credentials and autonomous syllabus.
            </p>
          </div>

          {/* Search & Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-4xl mx-auto">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search college by name, code (e.g. 7176), or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 bg-card border-border/80 text-xs sm:text-sm rounded-xl shadow-xs"
              />
            </div>

            <Button
              onClick={() => setDemoModalOpen(true)}
              className="w-full sm:w-auto h-11 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold gap-2 cursor-pointer shadow-md shadow-rose-600/20 shrink-0"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Book Demo for Your College</span>
            </Button>
          </div>

          {/* Institutional Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredColleges.map((college) => (
              <Card
                key={college.slug}
                className="border border-border/80 bg-card/80 backdrop-blur-xs rounded-2xl shadow-xs hover:border-rose-500/50 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* College Header Banner with Gradient */}
                  <div className={`p-5 bg-gradient-to-r ${college.bannerGradient} text-white space-y-2`}>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-white/15 text-white border-white/20 text-[10px] font-mono">
                        Code: {college.code}
                      </Badge>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-black/30 text-white">
                        {college.subscriptionPlan}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-white font-heading leading-tight group-hover:scale-[1.01] transition-transform">
                      {college.name}
                    </h3>
                    <p className="text-[11px] text-white/80 font-medium">
                      {college.location}
                    </p>
                  </div>

                  {/* Body Content */}
                  <CardContent className="p-5 space-y-4">
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {college.tagline}
                    </p>

                    {/* Accreditations */}
                    <div className="flex flex-wrap gap-1">
                      {college.accreditation.slice(0, 3).map((acc) => (
                        <span
                          key={acc}
                          className="px-2 py-0.5 rounded bg-muted text-[10px] font-mono text-muted-foreground border border-border/50"
                        >
                          {acc}
                        </span>
                      ))}
                    </div>

                    {/* Department count & regulation */}
                    <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground space-y-1">
                      <div className="flex items-center justify-between">
                        <span>Branches:</span>
                        <span className="font-semibold text-foreground">
                          {college.departments.length} Departments Configured
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Regulation:</span>
                        <span className="font-mono text-foreground">
                          {college.curriculumInfo.regulation.slice(0, 24)}...
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="h-9 text-xs rounded-lg"
                  >
                    <Link href={`/c/${college.slug}`}>
                      <span>Overview</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="sm"
                    className="h-9 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg gap-1.5 shadow-xs"
                  >
                    <Link href={`/${college.slug}/student-form`}>
                      <span>Enter Lab</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* No Results Fallback */}
          {filteredColleges.length === 0 && (
            <div className="text-center py-16 bg-card rounded-2xl border border-dashed border-border max-w-md mx-auto space-y-4">
              <Building2 className="h-10 w-10 text-muted-foreground mx-auto" />
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-foreground">No matching college found</h3>
                <p className="text-xs text-muted-foreground">
                  Your college may not be registered yet. Would you like to book a free demo?
                </p>
              </div>
              <Button
                onClick={() => setDemoModalOpen(true)}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Book Free Demo for Your College
              </Button>
            </div>
          )}

          {/* Bottom Onboarding CTA Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/20 via-background to-amber-950/20 border border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bold text-base text-foreground font-heading">
                Want a Virtual Lab Clone for Your Institution?
              </h3>
              <p className="text-xs text-muted-foreground">
                We provision your college&apos;s custom domain, student credentials, and autonomous syllabus in 24 hours.
              </p>
            </div>
            <Button
              onClick={() => setDemoModalOpen(true)}
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold h-10 px-6 rounded-xl shrink-0"
            >
              Book a Free Campus Demo
            </Button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Book Demo Modal */}
      <BookDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}
