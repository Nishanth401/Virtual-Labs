"use client";

import { useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { COURSES_DATA, CourseItem } from "@/data/courses";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search, FlaskConical, GraduationCap, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  const [selectedSem, setSelectedSem] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesSem = selectedSem === "all" || course.sem.toString() === selectedSem;
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSem && matchesSearch;
  });

  const totalCredits = COURSES_DATA.reduce((acc, curr) => acc + curr.credits, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header Banner */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
            <GraduationCap className="h-4 w-4" />
            <span>Anna University Approved Regulation 2021/2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-heading">
            Curriculum & <span className="bg-gradient-to-r from-[#e11d48] to-[#dc2626] bg-clip-text text-transparent">Semester Courses</span>
          </h1>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Explore all 8 semesters of foundational, core, and advanced Artificial Intelligence and Data Science courses. Review credits, laboratory sessions, and integrated digital learning resources.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="p-3 bg-card border rounded-xl shadow-xs">
              <div className="text-2xl font-bold text-foreground font-heading">{COURSES_DATA.length}</div>
              <div className="text-xs text-muted-foreground">Total Subjects</div>
            </div>
            <div className="p-3 bg-card border rounded-xl shadow-xs">
              <div className="text-2xl font-bold text-primary font-heading">{totalCredits}</div>
              <div className="text-xs text-muted-foreground">Degree Credits</div>
            </div>
            <div className="p-3 bg-card border rounded-xl shadow-xs">
              <div className="text-2xl font-bold text-emerald-600 font-heading">
                {COURSES_DATA.filter(c => c.isLab).length}
              </div>
              <div className="text-xs text-muted-foreground">Practical Labs</div>
            </div>
            <div className="p-3 bg-card border rounded-xl shadow-xs">
              <div className="text-2xl font-bold text-cyan-600 font-heading">8</div>
              <div className="text-xs text-muted-foreground">Semesters</div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-card/70 backdrop-blur-md border rounded-2xl p-4 sm:p-6 mb-8 space-y-4 shadow-sm">
          {/* Semester Pills */}
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">
              Filter by Semester
            </label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedSem === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSem("all")}
                className="text-xs"
              >
                All Semesters
              </Button>
              {semesters.map((sem) => (
                <Button
                  key={sem}
                  variant={selectedSem === sem.toString() ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSem(sem.toString())}
                  className="text-xs"
                >
                  Sem {sem}
                </Button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by course code, name, or keywords (e.g., CS301, Machine Learning)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <Card key={course.code} className="flex flex-col h-full hover:shadow-md transition-all hover:border-primary/40 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl p-2 rounded-lg bg-primary/10 border border-primary/20">
                      {course.icon}
                    </span>
                    <div>
                      <div className="text-xs font-mono font-bold text-primary">{course.code}</div>
                      <Badge variant="outline" className="text-[10px] mt-0.5">
                        Sem {course.sem} • {course.credits} Credits
                      </Badge>
                    </div>
                  </div>
                  <Badge
                    variant={
                      course.type === "Foundation"
                        ? "secondary"
                        : course.type === "Core"
                        ? "default"
                        : course.type === "Advanced"
                        ? "destructive"
                        : "outline"
                    }
                    className="text-[10px]"
                  >
                    {course.type}
                  </Badge>
                </div>
                <CardTitle className="text-base font-bold text-foreground font-heading mt-2 group-hover:text-primary transition-colors">
                  {course.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between pt-0 space-y-4">
                <CardDescription className="text-xs leading-relaxed line-clamp-3">
                  {course.desc}
                </CardDescription>

                <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-primary" />
                    <span>{course.resources} Study Materials</span>
                  </div>

                  {course.isLab ? (
                    <Button asChild size="sm" variant="default" className="text-xs h-7 gap-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Link href="/labs">
                        <FlaskConical className="h-3.5 w-3.5" /> Virtual Lab
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild size="sm" variant="outline" className="text-xs h-7 gap-1">
                      <Link href="/resources">
                        View Vault <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-card border rounded-2xl p-8">
            <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-bold text-foreground font-heading">No matching courses found</h3>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your semester filter or search keywords.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedSem("all");
                setSearchQuery("");
              }}
              className="mt-4"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
