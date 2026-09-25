"use client";

import { useState } from "react";
import { REFERENCE_BOOKS_DATA, SYLLABUS_MAPPINGS_DATA } from "@/data/syllabus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, ChevronDown, ChevronUp } from "lucide-react";

export function CourseAlignmentCard() {
  const [openSection, setOpenSection] = useState<"both" | "books" | "syllabus">("both");
  const [expandedUnivIndex, setExpandedUnivIndex] = useState<number>(0);

  return (
    <div className="space-y-6 font-sans">
      {/* Reference Books Section matching Virtual Labs Reference */}
      <Card className="border border-border/80 bg-card rounded-none shadow-xs">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-[#0284c7] dark:text-[#38bdf8] font-heading">
              <BookOpen className="h-4.5 w-4.5" />
              <span>Reference Textbooks &amp; Literature</span>
            </CardTitle>
            <Badge variant="outline" className="text-xs font-mono rounded-none">
              {REFERENCE_BOOKS_DATA.length} Prescribed Books
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {REFERENCE_BOOKS_DATA.map((book, idx) => (
              <div
                key={book.id}
                className="p-4 rounded-none border border-border/70 bg-muted/20 hover:border-[#0284c7]/40 transition-all space-y-2"
              >
                <div className="flex items-start gap-2.5">
                  <span className="flex items-center justify-center h-5.5 w-5.5 rounded-none bg-sky-500/10 text-[#0284c7] font-bold text-xs shrink-0 mt-0.5 font-mono">
                    {idx + 1}
                  </span>
                  <div className="space-y-1 flex-1">
                    <h4 className="font-semibold text-sm text-foreground leading-snug">
                      {book.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground/80">Author:</strong> {book.author}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-muted-foreground">
                      <span className="px-2 py-0.5 rounded-none bg-muted border border-border font-medium">
                        {book.publisher}
                      </span>
                      <span>• {book.edition}</span>
                      {book.isbn && <span>• ISBN: {book.isbn}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* University Syllabus Mapping Section */}
      <Card className="border border-border/80 bg-card rounded-none shadow-xs">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-[#0284c7] dark:text-[#38bdf8] font-heading">
              <GraduationCap className="h-4.5 w-4.5" />
              <span>University Syllabus Alignment</span>
            </CardTitle>
            <Badge variant="outline" className="text-xs text-[#0284c7] bg-sky-500/10 border-sky-500/20 rounded-none">
              Curriculum Standard
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-5 sm:p-6 space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            The experiments and learning objectives in this Virtual Lab are strictly mapped to the following academic regulations and university curricula:
          </p>

          <div className="space-y-3">
            {SYLLABUS_MAPPINGS_DATA.map((univ, uIdx) => {
              const isExpanded = expandedUnivIndex === uIdx;

              return (
                <div
                  key={uIdx}
                  className="rounded-none border border-border/70 bg-muted/15 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedUnivIndex(isExpanded ? -1 : uIdx)}
                    className="w-full p-3.5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold text-sm text-foreground flex items-center gap-2">
                        <span>{univ.university}</span>
                        <Badge variant="outline" className="text-[10px] font-mono rounded-none">
                          {univ.courseCode}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {univ.courseTitle} — {univ.semester}
                      </div>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-4 pt-0 border-t border-border/50 space-y-3 mt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        {univ.units.map((unit, unitIdx) => (
                          <div
                            key={unitIdx}
                            className="p-3 rounded-none bg-card border border-border/60 text-xs space-y-1.5"
                          >
                            <div className="font-bold text-[#0284c7] dark:text-[#38bdf8] text-[11px] uppercase tracking-wider">
                              {unit.unit}: {unit.title}
                            </div>
                            <ul className="space-y-1 text-muted-foreground text-[11px]">
                              {unit.topics.map((t, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-1.5">
                                  <span className="text-[#0284c7] mt-0.5">•</span>
                                  <span>{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
