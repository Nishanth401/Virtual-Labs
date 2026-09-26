"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, Bug, MessageSquareHeart, Home, Users, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LabHeaderBannerProps {
  discipline?: string;
  labName?: string;
  experimentTitle?: string;
  labId?: string;
}

export function LabHeaderBanner({
  discipline = "Artificial Intelligence & Data Science",
  labName,
  experimentTitle,
  labId,
}: LabHeaderBannerProps) {
  const [rating, setRating] = useState<number>(4);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isBugModalOpen, setIsBugModalOpen] = useState(false);
  const [rateSuccess, setRateSuccess] = useState(false);
  const [bugSuccess, setBugSuccess] = useState(false);

  // Form states
  const [feedbackText, setFeedbackText] = useState("");
  const [bugReport, setBugReport] = useState({ title: "", description: "", email: "" });

  const handleRateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRateSuccess(true);
    setTimeout(() => {
      setRateSuccess(false);
      setIsRateModalOpen(false);
      setFeedbackText("");
    }, 1200);
  };

  const handleBugSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBugSuccess(true);
    setTimeout(() => {
      setBugSuccess(false);
      setIsBugModalOpen(false);
      setBugReport({ title: "", description: "", email: "" });
    }, 1200);
  };

  return (
    <div className="w-full bg-background border-b border-border/60 font-sans">
      {/* Official Top Bar matching Screenshots 112447, 112538 */}
      <div className="w-full bg-white dark:bg-card border-b border-border/40">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          {/* Left Brand: Hamburger + MoE Virtual Labs Logo */}
          <div className="flex items-center gap-3">
            <Link
              href="/labs"
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              title="Toggle Navigation"
            >
              <span className="text-xl font-bold leading-none">☰</span>
            </Link>

            <Link href="/" className="flex items-center gap-2.5 group select-none">
              <img
                src="/virtual-lab-icon.png"
                alt="Virtual Lab"
                className="w-8 h-8 object-contain rounded-md transition-transform group-hover:scale-105"
              />
              <span className="text-base font-black tracking-tight leading-tight text-[#0284c7] dark:text-[#38bdf8] font-heading">
                Virtual Lab
              </span>
            </Link>
          </div>

          {/* Right Tools: Star Rating, Rate Me, Report a Bug, Top Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Interactive Star Rating matching Screenshots 112447 & 112538 */}
            <div className="flex items-center gap-0.5" title="Rate this lab / experiment">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setRating(star);
                    setIsRateModalOpen(true);
                  }}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="text-amber-400 hover:scale-110 transition-transform p-0.5 cursor-pointer"
                >
                  <Star
                    className={`h-4 w-4 ${
                      (hoverRating !== null ? star <= hoverRating : star <= rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-amber-400/30"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Action Buttons: Rate Me & Report a Bug (Screenshot 112538) */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => setIsRateModalOpen(true)}
                className="h-8 px-3.5 rounded-full text-xs font-semibold bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-xs"
              >
                Rate Me
              </Button>

              <Button
                size="sm"
                onClick={() => setIsBugModalOpen(true)}
                className="h-8 px-3.5 rounded-full text-xs font-semibold bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-xs"
              >
                Report a Bug
              </Button>
            </div>

            {/* Top nav links (Screenshot 112447: HOME, PARTNERS, CONTACT) */}
            <div className="hidden lg:flex items-center gap-4 pl-3 border-l border-border text-xs font-bold text-[#0284c7] dark:text-[#38bdf8]">
              <Link href="/" className="hover:underline transition-colors uppercase">
                HOME
              </Link>
              <Link href="/colleges" className="hover:underline transition-colors uppercase">
                PARTNERS
              </Link>
              <Link href="/faculty" className="hover:underline transition-colors uppercase">
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Bright Orange Horizontal Line matching Screenshots 112447, 112538 */}
      <div className="h-1 bg-[#ea580c] w-full" />

      {/* Breadcrumb Hierarchy matching Screenshot 112447 & 112538 */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center gap-2 text-sm sm:text-base font-medium text-[#0284c7] dark:text-[#38bdf8]">
        <Link href="/labs" className="hover:underline">
          {discipline}
        </Link>

        {labName && (
          <>
            <span className="text-muted-foreground font-semibold px-0.5">&gt;</span>
            {labId ? (
              <Link href={`/labs/${labId}`} className="hover:underline">
                {labName}
              </Link>
            ) : (
              <span>{labName}</span>
            )}
          </>
        )}

        {experimentTitle && (
          <>
            <span className="text-muted-foreground font-semibold px-0.5">&gt;</span>
            <span className="hover:underline text-[#0284c7] dark:text-[#38bdf8]">
              Experiments
            </span>
          </>
        )}
      </div>

      {/* Rate Me Modal */}
      <Dialog open={isRateModalOpen} onOpenChange={setIsRateModalOpen}>
        <DialogContent className="max-w-md rounded-none p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-heading">Rate This Laboratory Experience</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Your feedback helps national academic institutes improve interactive simulations.
            </DialogDescription>
          </DialogHeader>

          {rateSuccess ? (
            <div className="py-6 text-center space-y-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-10 w-10 mx-auto animate-bounce" />
              <p className="font-bold text-sm">Thank you for rating Virtual Labs!</p>
            </div>
          ) : (
            <form onSubmit={handleRateSubmit} className="space-y-4 pt-2">
              <div className="flex justify-center gap-1.5 py-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`h-7 w-7 ${
                        s <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Your Review & Suggestions</Label>
                <Textarea
                  placeholder="What did you learn? How can we make the simulation smoother?"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="text-xs min-h-[90px] rounded-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" className="rounded-none" onClick={() => setIsRateModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-none">
                  Submit Rating
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Report a Bug Modal */}
      <Dialog open={isBugModalOpen} onOpenChange={setIsBugModalOpen}>
        <DialogContent className="max-w-md rounded-none p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-heading">Report a Simulation or Content Issue</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Help our development team fix issues in this experiment.
            </DialogDescription>
          </DialogHeader>

          {bugSuccess ? (
            <div className="py-6 text-center space-y-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-10 w-10 mx-auto animate-bounce" />
              <p className="font-bold text-sm">Issue logged! Our developer team has been notified.</p>
            </div>
          ) : (
            <form onSubmit={handleBugSubmit} className="space-y-3.5 pt-2">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Issue Title</Label>
                <Input
                  placeholder="e.g., Step visualizer stall or broken diagram"
                  value={bugReport.title}
                  onChange={(e) => setBugReport({ ...bugReport, title: e.target.value })}
                  required
                  className="text-xs h-9 rounded-none"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">Your Student / Academic Email</Label>
                <Input
                  type="email"
                  placeholder="student@college.edu"
                  value={bugReport.email}
                  onChange={(e) => setBugReport({ ...bugReport, email: e.target.value })}
                  required
                  className="text-xs h-9 rounded-none"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">Detailed Description</Label>
                <Textarea
                  placeholder="Describe the steps to reproduce the issue..."
                  value={bugReport.description}
                  onChange={(e) => setBugReport({ ...bugReport, description: e.target.value })}
                  required
                  className="text-xs min-h-[90px] rounded-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" className="rounded-none" onClick={() => setIsBugModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#0369a1] hover:bg-[#075985] text-white rounded-none">
                  Send Bug Report
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
