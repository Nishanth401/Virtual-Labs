"use client";

import { useState } from "react";
import { REFERENCE_BOOKS_DATA, SYLLABUS_MAPPINGS_DATA } from "@/data/syllabus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, ChevronDown, ChevronUp, CheckCircle, Bookmark } from "lucide-react";

export function CourseAlignmentCard() {
  const [openSection, setOpenSection] = useState<"both" | "books" | "syllabus">("both");
  const [expandedUnivIndex, setExpandedUnivIndex] = useState<number>(0);

  return (
    <div className="space-y-8">
      {/* Reference Books Section matching Screenshot 111240 */}
      <Card className="border-secondary/40 bg-card/60 backdrop-blur-xs shadow-sm">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-primary font-heading">
              <BookOpen className="h-5 w-5" />
              <span>Reference Textbooks & Recommended Literature</span>
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {REFERENCE_BOOKS_DATA.length} Prescribed Books
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REFERENCE_BOOKS_DATA.map((book, idx) => (
              <div
                key={book.id}
                className="p-4 rounded-xl border border-border/60 bg-muted/30 hover:border-primary/40 transition-all space-y-2"
              >
                <div className="flex items-start gap-2.5">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-1 flex-1">
                    <h4 className="font-bold text-sm text-foreground leading-snug">
                      {book.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground/80">Author:</strong> {book.author}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-muted-foreground">
                      <span className="px-2 py-0.5 rounded bg-muted border font-medium">
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

      {/* University Syllabus Mapping Section matching Screenshot 110440 */}
      <Card className="border-secondary/40 bg-card/60 backdrop-blur-xs shadow-sm">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-primary font-heading">
              <GraduationCap className="h-5 w-5" />
              <span>University Syllabus Alignment</span>
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              Curriculum Standard
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            The experiments and learning objectives in this Virtual Lab are strictly mapped to the following academic regulations and university curricula:
          </p>

          <div className="space-y-4">
            {SYLLABUS_MAPPINGS_DATA.map((univ, uIdx) => {
              const isExpanded = expandedUnivIndex === uIdx;

              return (
                <div
                  key={uIdx}
                  className="rounded-xl border border-border/60 bg-muted/20 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedUnivIndex(isExpanded ? -1 : uIdx)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/40 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-sm text-foreground flex items-center gap-2">
                        <span>{univ.university}</span>
                        <Badge variant="outline" className="text-[10px] font-mono">
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
                    <div className="p-4 pt-0 border-t border-border/40 space-y-3 mt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        {univ.units.map((unit, unitIdx) => (
                          <div
                            key={unitIdx}
                            className="p-3 rounded-lg bg-card border border-border/50 text-xs space-y-1.5"
                          >
                            <div className="font-bold text-primary text-[11px] uppercase tracking-wider">
                              {unit.unit}: {unit.title}
                            </div>
                            <ul className="space-y-1 text-muted-foreground text-[11px]">
                              {unit.topics.map((t, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-1.5">
                                  <span className="text-primary mt-0.5">•</span>
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
