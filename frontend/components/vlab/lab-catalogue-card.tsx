"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, BookOpen, GraduationCap, ArrowRight, ExternalLink } from "lucide-react";
import { Lab } from "@/data/labs";
import { Badge } from "@/components/ui/badge";

interface LabCatalogueCardProps {
  lab: Lab;
}

export function LabCatalogueCard({ lab }: LabCatalogueCardProps) {
  const [isBooksOpen, setIsBooksOpen] = useState(false);
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);

  const defaultBooks = lab.resources?.map((r) => `${r.title} (${r.type})`) || [
    "Mark Allen Weiss. Data Structures and Algorithm Analysis in Java, Pearson.",
    "Thomas H. Cormen et al. Introduction to Algorithms, MIT Press.",
    "Abraham Silberschatz et al. Operating System Concepts, Wiley.",
  ];

  const defaultSyllabus = [
    `AICTE Model Curriculum: ${lab.code || "AD8381"} - ${lab.name}`,
    `Anna University Regulation 2021/2026 Core Laboratory Course`,
    `Mapped Competency: Data Engineering, Simulation & Algorithmic Problem Solving`,
  ];

  return (
    <div className="w-full bg-card border border-border/80 rounded-none overflow-hidden shadow-2xs hover:border-primary/40 transition-all flex flex-col md:flex-row md:items-stretch justify-between">
      {/* Left Content Area */}
      <div className="p-4 sm:p-5 flex-1 space-y-3">
        <div className="space-y-1">
          <Link
            href={`/labs/${lab.id}`}
            className="text-base sm:text-lg font-bold text-[#0284c7] dark:text-[#38bdf8] hover:text-[#ea580c] hover:underline transition-colors block font-heading"
          >
            {lab.name}
            {lab.tags?.includes("New") && <span className="text-xs text-rose-500 font-mono ml-2 font-bold">(New)</span>}
          </Link>
          <p className="text-xs text-muted-foreground line-clamp-1">{lab.shortDesc}</p>
        </div>

        {/* Dropdown triggers matching reference Screenshot 112326 */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#ea580c] dark:text-[#f97316]">
          <button
            type="button"
            onClick={() => setIsBooksOpen((prev) => !prev)}
            className="inline-flex items-center gap-1 hover:underline cursor-pointer py-0.5 rounded-none"
          >
            <span>Reference Books</span>
            {isBooksOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => setIsSyllabusOpen((prev) => !prev)}
            className="inline-flex items-center gap-1 hover:underline cursor-pointer py-0.5 rounded-none"
          >
            <span>Syllabus Mapping</span>
            {isSyllabusOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Expanded Reference Books Drawer */}
        {isBooksOpen && (
          <div className="p-3 bg-muted/40 rounded-none border border-border text-xs space-y-1 text-foreground/90 animate-in fade-in-50 duration-200">
            <p className="font-bold text-foreground text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-primary" /> Recommended Textbooks:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1 text-muted-foreground">
              {defaultBooks.slice(0, 3).map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Expanded Syllabus Mapping Drawer */}
        {isSyllabusOpen && (
          <div className="p-3 bg-muted/40 rounded-none border border-border text-xs space-y-1 text-foreground/90 animate-in fade-in-50 duration-200">
            <p className="font-bold text-foreground text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5 text-primary" /> Curriculum Mapping:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1 text-muted-foreground">
              {defaultSyllabus.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Institute Badge Area matching Screenshot 112326 */}
      <div className="md:w-56 bg-neutral-600 dark:bg-neutral-800 text-white flex md:flex-col items-center justify-center p-4 text-center font-bold text-xs uppercase tracking-wider shrink-0 border-t md:border-t-0 md:border-l border-neutral-700 rounded-none">
        <Link
          href={`/labs/${lab.id}`}
          className="w-full h-full flex flex-col items-center justify-center gap-1 hover:text-amber-300 transition-colors"
        >
          <span>{lab.institute || "VSB ENGINEERING COLLEGE"}</span>
          <span className="text-[10px] text-neutral-300 normal-case font-normal hidden md:inline">
            Click to Enter Lab →
          </span>
        </Link>
      </div>
    </div>
  );
}
