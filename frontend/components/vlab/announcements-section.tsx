"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BellRing, PlayCircle, ExternalLink, Sparkles, Calendar } from "lucide-react";
import Link from "next/link";

const ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "Expression of Interest (EoI) 2026 for Virtual Labs Nodal Center",
    date: "Aug 24, 2026",
    isNew: true,
    desc: "Department student registrations open for the annual Algorithmic Problem Solving & Simulation Hackathon.",
    link: "#"
  },
  {
    id: "ann-2",
    title: "New Data Structures Interactive Lab Modules Released",
    date: "Aug 18, 2026",
    isNew: true,
    desc: "Added interactive simulators for Circular Queues, AVL Tree balancing rotations, and Dijkstra shortest-path algorithms.",
    link: "/labs/data-structures"
  },
  {
    id: "ann-3",
    title: "Faculty Workshop on Simulation-Based Pedagogy",
    date: "Aug 10, 2026",
    isNew: false,
    desc: "Recording of the NMEICT ICT-initiative webinar on digital virtual laboratories available for student reference.",
    link: "#"
  }
];

export function AnnouncementsSection() {
  return (
    <section className="py-14 border-b border-border/40">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Column: Announcements list matching Screenshot 110041 */}
          <Card className="border-secondary/40 bg-card/60 backdrop-blur-xs flex flex-col justify-between shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <BellRing className="h-5 w-5 text-primary" />
                  <span>Announcements & Circulars</span>
                </CardTitle>
                <Badge variant="outline" className="text-xs text-primary border-primary/30">
                  Latest Updates
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3.5 divide-y divide-border/50">
                {ANNOUNCEMENTS.map((item) => (
                  <div key={item.id} className="pt-3.5 first:pt-0 space-y-1.5 group">
                    <div className="flex items-center gap-2">
                      {item.isNew && (
                        <span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-wider border border-rose-500/20">
                          NEW
                        </span>
                      )}
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {item.date}
                      </span>
                    </div>

                    <Link href={item.link} className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                      <span>{item.title}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border/40 text-xs text-muted-foreground">
                <span>* ICT initiatives under the Ministry of Education & National Mission on Education through ICT.</span>
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Introductory Video Embed matching Screenshot 110041 */}
          <Card className="border-secondary/40 bg-card/60 backdrop-blur-xs flex flex-col overflow-hidden shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-primary" />
                <span>Virtual Labs Walkthrough & Orientation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-slate-950 flex items-center justify-center group shadow-inner">
                {/* Responsive Embedded Video */}
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
                  title="Virtual Labs Demonstration Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/50 text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-semibold">How to use: </strong>
                Browse our department lab catalogue, select any experiment to study the theory & step-by-step procedures, and launch the interactive simulation sandbox.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
