"use client";

import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { FACULTY_DATA, FacultyMember } from "@/data/faculty";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mail, MapPin, Award, BookOpen } from "lucide-react";

export default function FacultyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header Banner */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
            <Users className="h-4 w-4" />
            <span>Academic Leadership &amp; Research Faculty</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-heading">
            Department <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Faculty Profiles</span>
          </h1>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Meet our experienced professors, doctorate researchers, and industry mentors leading artificial intelligence, machine learning, and computer science education.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACULTY_DATA.map((fac) => (
            <Card key={fac.id} className="flex flex-col h-full hover:shadow-md transition-all hover:border-primary/40">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl p-3 bg-primary/10 border border-primary/20 rounded-2xl shrink-0">
                    {fac.avatar}
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-foreground font-heading">
                      {fac.name}
                    </CardTitle>
                    <div className="text-xs font-semibold text-primary mt-0.5">{fac.designation}</div>
                    <div className="text-[11px] text-muted-foreground">{fac.qualification}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between pt-0 space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                      Research Specializations
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {fac.specialization.map((spec, sIdx) => (
                        <Badge key={sIdx} variant="secondary" className="text-[10px]">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Award className="h-3.5 w-3.5 text-primary" />
                      <span>{fac.experienceYears}+ Years Academic Experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span>{fac.cabin}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                      <a href={`mailto:${fac.email}`} className="text-primary hover:underline">
                        {fac.email}
                      </a>
                    </div>
                  </div>
                </div>

                <Button size="sm" variant="outline" className="w-full text-xs font-semibold gap-1.5 mt-2">
                  <Mail className="h-3.5 w-3.5" /> Contact Faculty
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
