"use client";

import { useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { EVENTS_DATA, DepartmentEvent } from "@/data/events";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Trophy, ArrowRight } from "lucide-react";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "past">("all");

  const filteredEvents = EVENTS_DATA.filter((e) => {
    if (activeTab === "all") return true;
    return e.status === activeTab;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header Banner */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
            <Trophy className="h-4 w-4" />
            <span>Workshops, Seminars, Hackathons &amp; Symposiums</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-heading">
            Department <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Events &amp; Bootcamps</span>
          </h1>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Stay updated on upcoming technical workshops, industry expert guest lectures, coding challenges, research paper seminars, and annual symposiums.
          </p>

          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant={activeTab === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("all")}
            >
              All Events ({EVENTS_DATA.length})
            </Button>
            <Button
              variant={activeTab === "upcoming" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Events ({EVENTS_DATA.filter((e) => e.status === "upcoming").length})
            </Button>
            <Button
              variant={activeTab === "past" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("past")}
            >
              Past Archives ({EVENTS_DATA.filter((e) => e.status === "past").length})
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="flex flex-col h-full hover:shadow-md transition-all hover:border-primary/40">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={event.type === "Competition" ? "destructive" : "secondary"} className="text-xs">
                    {event.type}
                  </Badge>
                  <Badge variant={event.status === "upcoming" ? "default" : "outline"} className="text-[10px]">
                    {event.status === "upcoming" ? "Upcoming" : "Completed"}
                  </Badge>
                </div>
                <CardTitle className="text-base font-bold text-foreground font-heading mt-2 leading-snug">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between pt-0 space-y-4">
                <CardDescription className="text-xs leading-relaxed">
                  {event.desc}
                </CardDescription>

                <div className="space-y-2 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {event.status === "upcoming" && (
                  <Button size="sm" className="w-full text-xs font-semibold gap-1.5 bg-primary text-white hover:bg-primary/90 mt-2">
                    Register Free <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
