"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { getCollegeBySlug, COLLEGES_REGISTRY } from "@/data/colleges";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface StudentFormProps {
  params: Promise<{
    collegeSlug: string;
  }>;
}

export default function StudentFormPage({ params }: StudentFormProps) {
  const resolvedParams = use(params);
  const collegeSlug = resolvedParams.collegeSlug?.toLowerCase() || "vsb";
  const router = useRouter();

  const college = getCollegeBySlug(collegeSlug) || COLLEGES_REGISTRY[0];

  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [year, setYear] = useState("1st Year");
  const [department, setDepartment] = useState("");
  const [className, setClassName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !regNo.trim() || !department.trim() || !className.trim()) {
      setErrorMsg("Please fill in all 5 required fields.");
      return;
    }

    const studentRecord = {
      name: name.trim(),
      regNo: regNo.trim().toUpperCase(),
      registerNumber: regNo.trim().toUpperCase(),
      year,
      department: department.trim(),
      className: className.trim(),
      yearSemester: `${year} / ${className.trim()}`,
      collegeId: college.id,
      collegeName: college.name,
      collegeSlug: college.slug,
      profileCompleted: true,
      email: `${regNo.trim().toLowerCase()}@college.edu`,
      completedExperiments: ["bubble-sort", "stack-operations"],
      completedProblems: [],
      starredProblems: [],
      problemNotes: {},
      quizScores: {},
      feedbacks: {},
      createdAt: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("vlab_active_student", JSON.stringify(studentRecord));
      localStorage.setItem(`vlab_student_${college.slug}`, JSON.stringify(studentRecord));
      localStorage.setItem("vsb_student_profile_data", JSON.stringify(studentRecord));
      window.dispatchEvent(new Event("storage"));
    }

    // Redirect directly to the Virtual Labs Workspace
    router.push("/labs");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground font-heading">
              Student Information
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              {college.name} (Code: {college.code})
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field 1: Name */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Name</Label>
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 text-xs bg-background"
                required
              />
            </div>

            {/* Field 2: Registration Number */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Registration Number</Label>
              <Input
                type="text"
                placeholder="Roll No / Student ID"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                className="h-10 text-xs bg-background font-mono"
                required
              />
            </div>

            {/* Field 3: Year Dropdown */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Year</Label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            {/* Field 4: Department */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Department</Label>
              <Input
                type="text"
                placeholder="Department / Branch name"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="h-10 text-xs bg-background"
                required
              />
            </div>

            {/* Field 5: Class */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Class</Label>
              <Input
                type="text"
                placeholder="Class / Section (e.g. Section A)"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="h-10 text-xs bg-background"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-10 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg mt-2"
            >
              Access Virtual Lab
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
