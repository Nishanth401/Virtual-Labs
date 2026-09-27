"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "One of the primary advantages associated with the utilization of Virtual Laboratory is the ability for students to engage in self-paced learning. This technology facilitates students in studying, preparing for, and conducting laboratory experiments at their own convenience.",
    author: "Dr. K. Manivannan",
    designation: "Professor & Head, Department of Artificial Intelligence & Data Science",
    institute: "VSB Engineering College"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 bg-muted/20 border-b border-border/40">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <Badge variant="outline" className="px-3 py-1 text-xs uppercase tracking-wider bg-sky-500/10 text-[#0284c7] dark:text-[#38bdf8] border-[#0284c7]/30 font-semibold">
            Endorsements &amp; Insights
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
            Academic Testimonials
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            What faculty members and students say about remote laboratory learning and simulation pedagogies.
          </p>
        </div>

        {/* Large Prominent Testimonial Panel */}
        <div className="max-w-4xl lg:max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, idx) => (
            <Card
              key={idx}
              className="border-2 border-border/80 bg-card/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-2xl p-8 sm:p-12 md:p-14 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
            >
              {/* Subtle Ambient Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

              <CardContent className="p-0 space-y-6 sm:space-y-8 flex-1 flex flex-col justify-between relative z-10">
                <Quote className="h-10 w-10 sm:h-12 sm:w-12 text-[#0284c7] dark:text-[#38bdf8] shrink-0" />
                <p className="text-lg sm:text-xl md:text-2xl text-foreground font-medium leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-6 sm:pt-8 border-t border-border/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="font-extrabold text-lg sm:text-xl text-foreground font-heading">{t.author}</div>
                    <div className="text-sm sm:text-base text-[#0284c7] dark:text-[#38bdf8] font-semibold mt-0.5">{t.designation}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">{t.institute}</div>
                  </div>
                  <Badge variant="outline" className="self-start sm:self-center px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-semibold">
                    Verified Faculty Endorsement
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
