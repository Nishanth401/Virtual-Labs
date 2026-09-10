"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { COLLEGES_REGISTRY } from "@/data/colleges";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function CollegeSelectionPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredColleges = COLLEGES_REGISTRY.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.includes(searchTerm) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-heading">
              Select Your College
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Choose your institution to access your customized virtual laboratory portal.
            </p>
          </div>

          {/* Simple Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search college by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 bg-background text-sm rounded-xl"
            />
          </div>

          {/* Simple College Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {filteredColleges.map((college) => (
              <div
                key={college.slug}
                className="p-5 rounded-xl border border-border bg-card shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-foreground leading-tight">
                    {college.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    Code: {college.code} | {college.location}
                  </p>
                </div>

                <div>
                  <Button
                    asChild
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold h-9 rounded-lg"
                  >
                    <Link href={`/${college.slug}/student-form`}>
                      Enter Lab
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredColleges.length === 0 && (
            <div className="text-center py-10 text-xs text-muted-foreground">
              No colleges found matching &ldquo;{searchTerm}&rdquo;.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
