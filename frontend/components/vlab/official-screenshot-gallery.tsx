"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, ZoomIn, Eye, Sparkles, Image as ImageIcon } from "lucide-react";

export interface ScreenshotItem {
  id: string;
  title: string;
  category: "Overview" | "Theory" | "Procedure" | "Simulation" | "References";
  fileName: string;
  sourceUrl: string;
  caption: string;
}

export const AI_OFFICIAL_SCREENSHOTS: ScreenshotItem[] = [
  {
    id: "sc-intro",
    title: "1. Artificial Intelligence I - Introduction",
    category: "Overview",
    fileName: "Screenshot 2026-09-30 103811.png",
    sourceUrl: "https://ai1-iiith.vlabs.ac.in/Introduction.html",
    caption: "Official Introduction screen of Artificial Intelligence I Virtual Lab, IIIT Hyderabad, MoE Govt. of India."
  },
  {
    id: "sc-obj",
    title: "2. Lab Objectives",
    category: "Overview",
    fileName: "Screenshot 2026-09-30 103918.png",
    sourceUrl: "https://ai1-iiith.vlabs.ac.in/Objective.html",
    caption: "Official core objectives: Hands-on experience, interactive simulations, and university curriculum alignment."
  },
  {
    id: "sc-aim",
    title: "3. Policy Iteration - Experiment Aim",
    category: "Overview",
    fileName: "Screenshot 2026-09-30 103959.png",
    sourceUrl: "https://ai1-iiith.vlabs.ac.in/exp/policy-iteration/",
    caption: "Aim and objectives for the Policy Iteration Gridworld reinforcement learning experiment."
  },
  {
    id: "sc-theory-1",
    title: "4. Theory - Introduction to Policy Iteration",
    category: "Theory",
    fileName: "Screenshot 2026-09-30 104322.png",
    sourceUrl: "https://ai1-iiith.vlabs.ac.in/exp/policy-iteration/theory.html",
    caption: "Foundations of policy iteration, map and compass analogy in Gridworld environments."
  },
  {
    id: "sc-theory-2",
    title: "5. Theory - Markov Decision Processes (MDPs)",
    category: "Theory",
    fileName: "Screenshot 2026-09-30 104335.png",
    sourceUrl: "https://ai1-iiith.vlabs.ac.in/exp/policy-iteration/theory.html",
    caption: "States (S), Actions (A), Transition Probabilities P(s'|s,a), Reward Functions R(s,a,s'), and Discount Factor (γ)."
  },
  {
    id: "sc-theory-3",
    title: "6. Theory - Evaluation & Improvement Framework",
    category: "Theory",
    fileName: "Screenshot 2026-09-30 104351.png",
    sourceUrl: "https://ai1-iiith.vlabs.ac.in/exp/policy-iteration/theory.html",
    caption: "Interlocking stages of Policy Evaluation and Policy Improvement with mathematical definitions."
  },
  {
    id: "sc-theory-4",
    title: "7. Theory - Bellman Equations & Optimality",
    category: "Theory",
    fileName: "Screenshot 2026-09-30 104405.png",
    sourceUrl: "https://ai1-iiith.vlabs.ac.in/exp/policy-iteration/theory.html",
    caption: "Bellman update formulas V(s) = ∑ P(s'|s,π) [R + γV(s')] and greedy policy improvement."
  },
  {
    id: "sc-theory-5",
    title: "8. Theory - Significance & Conclusion",
    category: "Theory",
    fileName: "Screenshot 2026-09-30 104418.png",
    sourceUrl: "https://ai1-iiith.vlabs.ac.in/exp/policy-iteration/theory.html",
    caption: "Significance in RL decision making, maze navigation, and dynamic programming."
  },
  {
    id: "sc-theory-code",
    title: "9. Theory - Algorithm Pseudocode (Sutton & Barto)",
    category: "Theory",
    fileName: "Screenshot 2026-09-30 104435.png",
    sourceUrl: "https://ai1-iiith.vlabs.ac.in/exp/policy-iteration/theory.html",
    caption: "Official Sutton & Barto (2019) Policy Iteration algorithm specification."
  },
  {
    id: "sc-proc-1",
    title: "10. Procedure - Steps 1 to 4",
    category: "Procedure",
    fileName: "Screenshot 2026-09-30 104518.png",
    sourceUrl: "https://ai1-iiith.vlabs.ac.in/exp/policy-iteration/procedure.html",
    caption: "Modifying grid cells, adjusting settings, state value functions, and sub-iterations."
  },
  {
    id: "sc-proc-2",
    title: "11. Procedure - Steps 5 to 7",
    category: "Procedure",
    fileName: "Screenshot 2026-09-30 104537.png",
    sourceUrl: "https://ai1-iiith.vlabs.ac.in/exp/policy-iteration/procedure.html",
    caption: "Advancing iterations, observing learned policy arrows, and reaching optimal convergence."
  },
  {
    id: "sc-demo",
    title: "12. Simulation - Interactive Gridworld Demo",
    category: "Simulation",
    fileName: "Screenshot 2026-09-30 104625.png",
    sourceUrl: "https://ai1-iiith.vlabs.ac.in/exp/policy-iteration/simulation.html",
    caption: "Policy Representation (left), Calculation of State Values (center), and Observations Panel (right)."
  },
  {
    id: "sc-ref",
    title: "13. Experiment References",
    category: "References",
    fileName: "Screenshot 2026-09-30 104649.png",
    sourceUrl: "https://ai1-iiith.vlabs.ac.in/exp/policy-iteration/reference.html",
    caption: "Official textbooks: Russell & Norvig (2020) 4th Edition and Sutton & Barto (2018) 2nd Edition."
  }
];

export function OfficialScreenshotGallery() {
  const [selectedScreenshot, setSelectedScreenshot] = useState<ScreenshotItem | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const filtered = AI_OFFICIAL_SCREENSHOTS.filter(
    (item) => categoryFilter === "ALL" || item.category === categoryFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-[#0284c7]" />
            <span>Official Government Source Reference Screenshots (13 Files)</span>
          </h3>
          <p className="text-xs text-muted-foreground">
            Authentic screenshots captured from Virtual Labs MoE (IIIT Hyderabad — ai1-iiith.vlabs.ac.in)
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          {["ALL", "Overview", "Theory", "Procedure", "Simulation", "References"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-none border transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? "bg-[#0284c7] text-white border-[#0284c7]"
                  : "bg-background text-foreground/80 border-border hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Screenshots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedScreenshot(item)}
            className="group border border-border/70 hover:border-[#0284c7] bg-card overflow-hidden rounded-none shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col"
          >
            <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
              <img
                src={`/artificial-intelligence-labs/${encodeURIComponent(item.fileName)}`}
                alt={item.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                <ZoomIn className="h-5 w-5" />
                <span>View High-Res</span>
              </div>
              <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white backdrop-blur-xs">
                {item.category}
              </span>
            </div>

            <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-foreground group-hover:text-[#0284c7] transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[10px] text-muted-foreground border-t border-border/40">
                <span className="font-mono truncate max-w-[180px]">{item.fileName}</span>
                <span className="text-[#0284c7] font-semibold flex items-center gap-0.5">
                  Inspect <Eye className="h-3 w-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal for Full Image Inspection */}
      <Dialog open={!!selectedScreenshot} onOpenChange={() => setSelectedScreenshot(null)}>
        <DialogContent className="max-w-5xl w-full p-4 sm:p-6 bg-card border-border rounded-none max-h-[90vh] overflow-y-auto">
          {selectedScreenshot && (
            <div className="space-y-4">
              <DialogHeader className="border-b border-border/60 pb-3">
                <div className="flex items-center justify-between gap-4">
                  <DialogTitle className="text-base sm:text-lg font-bold text-[#0284c7]">
                    {selectedScreenshot.title}
                  </DialogTitle>
                  <a
                    href={selectedScreenshot.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-muted-foreground hover:text-[#0284c7] flex items-center gap-1 shrink-0"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <DialogDescription className="text-xs text-muted-foreground">
                  {selectedScreenshot.caption}
                </DialogDescription>
              </DialogHeader>

              <div className="relative w-full border border-border bg-slate-950 overflow-hidden flex items-center justify-center">
                <img
                  src={`/artificial-intelligence-labs/${encodeURIComponent(selectedScreenshot.fileName)}`}
                  alt={selectedScreenshot.title}
                  className="w-full h-auto object-contain max-h-[65vh]"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <span className="font-mono">File: {selectedScreenshot.fileName}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedScreenshot(null)}
                  className="rounded-none h-8 text-xs"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
