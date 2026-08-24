"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "One of the primary advantages associated with the utilization of Virtual Laboratory is the ability for students to engage in self-paced learning. This technology facilitates students in studying, preparing for, and conducting laboratory experiments at their own convenience.",
    author: "Dr. K. Senthil Kumar",
    designation: "Professor & Head, Department of AI & Data Science",
    institute: "VSB Engineering College"
  },
  {
    quote: "Virtual Labs are implemented to help students understand the theories and abstract concepts that cannot be fully appreciated through textbooks alone. The best progressive learning appears when virtual simulations precede physical laboratory coding sessions.",
    author: "Prof. M. Rajesh",
    designation: "Associate Professor, Department of CSE",
    institute: "VSB Engineering College"
  },
  {
    quote: "The interactive DSA step-by-step visualizers and instant quiz feedback enlightened my understanding of algorithmic pointer manipulation and recursion stack frames before writing complex code.",
    author: "R. Anish",
    designation: "B.Tech AIDS Final Year Student",
    institute: "VSB Engineering College"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-14 bg-muted/20 border-b border-border/40">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="outline" className="mb-2 text-xs uppercase tracking-wider bg-primary/5 text-primary border-primary/20">
            Endorsements & Insights
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">
            Academic Testimonials
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            What faculty members and students say about remote laboratory learning and simulation pedagogies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <Card key={idx} className="border-secondary/40 bg-card/60 backdrop-blur-xs flex flex-col justify-between p-6 shadow-sm">
              <CardContent className="p-0 space-y-4 flex-1 flex flex-col justify-between">
                <Quote className="h-6 w-6 text-primary/40 shrink-0" />
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic flex-1">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-border/50">
                  <div className="font-bold text-sm text-foreground">{t.author}</div>
                  <div className="text-[11px] text-primary font-medium">{t.designation}</div>
                  <div className="text-[10px] text-muted-foreground">{t.institute}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
