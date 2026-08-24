"use client";

import React, { useState } from "react";
import { ML_PREREQUISITES_DATA, MLPrerequisiteTopic } from "@/data/experiments";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, CheckCircle2, Clock, BookOpen, Layers, Sparkles, ChevronRight } from "lucide-react";

export function MLPrerequisitesTrack() {
  const [selectedTopic, setSelectedTopic] = useState<MLPrerequisiteTopic>(ML_PREREQUISITES_DATA[0]);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  const toggleComplete = (id: string) => {
    setCompletedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const categories = ["NumPy", "Pandas", "Matplotlib"] as const;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-slate-900 border border-purple-500/20 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/30">
              Required Prerequisites
            </Badge>
            <span className="text-xs text-muted-foreground">• 12 NumPy Master Modules &amp; Data Pipeline</span>
          </div>
          <h2 className="text-2xl font-black text-foreground font-heading">
            Pre-Lab Video Series: NumPy &amp; Pandas for Machine Learning
          </h2>
          <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
            Before entering the Machine Learning &amp; Deep Learning laboratory experiments, master array vectorization, indexing, tensor broadcasting, and exploratory data analysis.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          <div className="text-right">
            <div className="text-xs font-mono font-bold text-foreground">
              {completedTopics.length} / {ML_PREREQUISITES_DATA.length} Completed
            </div>
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${(completedTopics.length / ML_PREREQUISITES_DATA.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column: Video Player + Playlist Accordion */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Video Player & Summary (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="border-border bg-card/90 overflow-hidden shadow-sm">
            <div className="aspect-video w-full bg-slate-950 relative">
              <iframe
                src={selectedTopic.videoUrl}
                title={selectedTopic.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs text-primary border-primary/30">
                  {selectedTopic.category} Track
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                  <Clock className="h-3.5 w-3.5" /> {selectedTopic.duration}
                </span>
              </div>
              <CardTitle className="text-lg font-bold text-foreground mt-2">
                {selectedTopic.title}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {selectedTopic.summary}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-3">
              <div className="p-3 bg-muted/40 rounded-xl border border-border/50">
                <span className="text-[10px] uppercase font-bold text-muted-foreground font-mono block mb-1.5">
                  Key Vectorized Functions Covered
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {selectedTopic.keyFunctions.map((fn) => (
                    <span key={fn} className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      {fn}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <Button
                  size="sm"
                  variant={completedTopics.includes(selectedTopic.id) ? "default" : "outline"}
                  onClick={() => toggleComplete(selectedTopic.id)}
                  className="text-xs gap-1.5"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{completedTopics.includes(selectedTopic.id) ? "Marked Complete" : "Mark as Watched"}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Video Playlist Selector (Right 5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-3 bg-muted/40 rounded-xl border border-border/60 flex items-center justify-between text-xs font-bold font-mono">
            <span>Prerequisite Modules Playlist</span>
            <span className="text-primary">{ML_PREREQUISITES_DATA.length} Lessons</span>
          </div>

          <div className="max-h-[540px] overflow-y-auto space-y-2 pr-1">
            {ML_PREREQUISITES_DATA.map((topic, idx) => {
              const isSelected = selectedTopic.id === topic.id;
              const isDone = completedTopics.includes(topic.id);

              return (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? "bg-primary/15 border-primary text-foreground ring-1 ring-primary/40 shadow-xs"
                      : "bg-card/70 border-border/70 hover:bg-muted/40 text-muted-foreground"
                  }`}
                >
                  <div className="mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <PlayCircle className={`h-4 w-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase text-muted-foreground">
                        Lesson {idx + 1} • {topic.category}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">{topic.duration}</span>
                    </div>
                    <div className="text-xs font-bold text-foreground line-clamp-1">
                      {topic.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
