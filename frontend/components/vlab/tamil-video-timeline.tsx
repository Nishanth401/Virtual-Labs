"use client";

import React, { useState, useMemo } from "react";
import { LabTamilVideo, LabEnglishVideo, VideoTimestamp } from "@/data/labs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PlayCircle,
  Clock,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Layers,
  Sparkles,
  BookOpen
} from "lucide-react";

export interface VideoTimelineProps {
  video?: LabTamilVideo | LabEnglishVideo;
  tamilVideo?: LabTamilVideo;
  activeTimestampIdx: number | null;
  onSelectTimestamp: (seconds: number, idx: number, item?: VideoTimestamp) => void;
  currentVideoTime: number;
  compact?: boolean;
  accentColor?: "amber" | "blue" | "emerald" | "violet";
}

export function VideoTimeline({
  video,
  tamilVideo,
  activeTimestampIdx,
  onSelectTimestamp,
  currentVideoTime,
  compact = false,
  accentColor = "amber"
}: VideoTimelineProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const sourceVideo = video || tamilVideo;
  const timestamps = sourceVideo?.timestamps || [];

  const isBlue = accentColor === "blue";

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    timestamps.forEach((t) => {
      if (t.category) cats.add(t.category);
    });
    return ["ALL", ...Array.from(cats)];
  }, [timestamps]);

  // Filter timestamps based on search query and category
  const filteredTimestamps = useMemo(() => {
    return timestamps.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.time.includes(searchQuery) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === "ALL" || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [timestamps, searchQuery, selectedCategory]);

  const activeTimestamp = activeTimestampIdx !== null ? timestamps[activeTimestampIdx] : null;

  const handlePrev = () => {
    if (activeTimestampIdx !== null && activeTimestampIdx > 0) {
      const prevIdx = activeTimestampIdx - 1;
      onSelectTimestamp(timestamps[prevIdx].seconds, prevIdx, timestamps[prevIdx]);
    }
  };

  const handleNext = () => {
    if (activeTimestampIdx !== null && activeTimestampIdx < timestamps.length - 1) {
      const nextIdx = activeTimestampIdx + 1;
      onSelectTimestamp(timestamps[nextIdx].seconds, nextIdx, timestamps[nextIdx]);
    } else if (activeTimestampIdx === null && timestamps.length > 0) {
      onSelectTimestamp(timestamps[0].seconds, 0, timestamps[0]);
    }
  };

  if (!timestamps || timestamps.length === 0) {
    return null;
  }

  const containerStyles = isBlue
    ? "border-primary/20 bg-primary/5"
    : "border-amber-500/20 bg-amber-500/5";

  const headerBorder = isBlue
    ? "border-primary/15"
    : "border-amber-500/15";

  const iconBoxStyles = isBlue
    ? "bg-primary/20 border-primary/30 text-primary"
    : "bg-amber-500/20 border-amber-500/30 text-amber-600 dark:text-amber-400";

  const badgeStyles = isBlue
    ? "bg-primary/10 text-primary border-primary/30"
    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";

  const buttonNavStyles = isBlue
    ? "border-primary/30 hover:bg-primary/10"
    : "border-amber-500/30 hover:bg-amber-500/10";

  const activeBannerStyles = isBlue
    ? "bg-primary/10 border-primary/30 text-primary"
    : "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400";

  const activePulseStyles = isBlue
    ? "bg-primary"
    : "bg-amber-500";

  const inputFocusStyles = isBlue
    ? "focus:border-primary/60 focus:ring-primary/20"
    : "focus:border-amber-500/60 focus:ring-amber-500/20";

  const categoryPillSelected = isBlue
    ? "bg-primary text-primary-foreground font-bold shadow-xs scale-105"
    : "bg-amber-600 text-white font-bold shadow-xs scale-105";

  const categoryPillUnselected = isBlue
    ? "bg-background/90 hover:bg-background text-muted-foreground hover:text-foreground border border-border hover:border-primary/40"
    : "bg-background/90 hover:bg-background text-muted-foreground hover:text-foreground border border-border hover:border-amber-500/40";

  return (
    <div className={`space-y-4 rounded-2xl border ${containerStyles} p-4 sm:p-5 backdrop-blur-xs`}>
      {/* Header & Controls */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b ${headerBorder}`}>
        <div className="flex items-center gap-2.5">
          <div className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 ${iconBoxStyles}`}>
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span>Interactive Course Chapters &amp; Timestamps</span>
              <Badge variant="outline" className={`text-[10px] font-mono font-bold ${badgeStyles}`}>
                {timestamps.length} Chapters
              </Badge>
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Click any chapter below to jump directly to that video module
            </p>
          </div>
        </div>

        {/* Quick Prev / Next Navigation Controls */}
        <div className="flex items-center gap-1.5 self-start sm:self-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={activeTimestampIdx === null || activeTimestampIdx === 0}
            className={`h-7 text-xs px-2.5 gap-1 ${buttonNavStyles}`}
            title="Previous Chapter"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Prev
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={activeTimestampIdx !== null && activeTimestampIdx >= timestamps.length - 1}
            className={`h-7 text-xs px-2.5 gap-1 ${buttonNavStyles}`}
            title="Next Chapter"
          >
            Next <ChevronRight className="h-3.5 w-3.5" />
          </Button>
          {currentVideoTime > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onSelectTimestamp(0, 0, timestamps[0])}
              className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground"
              title="Reset to 00:00"
            >
              <RotateCcw className="h-3 w-3" /> Start
            </Button>
          )}
        </div>
      </div>

      {/* Active Chapter Highlight Banner */}
      {activeTimestamp && (
        <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${activeBannerStyles}`}>
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activePulseStyles}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${activePulseStyles}`}></span>
            </span>
            <span className="font-bold shrink-0 font-mono">
              Playing #{String((activeTimestampIdx ?? 0) + 1).padStart(2, "0")}:
            </span>
            <span className="font-semibold text-foreground truncate">
              {activeTimestamp.title}
            </span>
            {activeTimestamp.category && (
              <Badge variant="outline" className={`hidden sm:inline-flex text-[9px] font-mono px-1.5 py-0 ${badgeStyles}`}>
                {activeTimestamp.category}
              </Badge>
            )}
            <Badge variant="outline" className={`font-mono text-[10px] shrink-0 bg-background/50 ${isBlue ? "border-primary/30" : "border-amber-500/30"}`}>
              {activeTimestamp.time}
            </Badge>
          </div>

          <a
            href={activeTimestamp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[11px] font-semibold hover:underline flex items-center gap-1"
          >
            <span>YouTube</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}

      {/* Search & Category Filter Bar */}
      <div className="space-y-2.5">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic or algorithm..."
              className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 outline-hidden transition-all text-foreground placeholder:text-muted-foreground/70 ${inputFocusStyles}`}
            />
          </div>

          {/* Quick Filter Reset */}
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="h-8 text-xs text-muted-foreground self-start"
            >
              Clear Search
            </Button>
          )}
        </div>

        {/* Category Pills (matching screenshot with Track: label and pills) */}
        {!compact && categories.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
            <span className="text-[11px] font-mono font-bold text-muted-foreground shrink-0 flex items-center gap-1.5 pr-1">
              <Layers className={`h-3.5 w-3.5 ${isBlue ? "text-primary" : "text-amber-500"}`} /> Track:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-150 ${
                    isSelected ? categoryPillSelected : categoryPillUnselected
                  }`}
                >
                  {cat === "ALL" ? `All (${timestamps.length})` : cat}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Chapters Grid / List (3 Columns as in reference image) */}
      <div className={`grid gap-2.5 ${compact ? "grid-cols-1 max-h-72 overflow-y-auto pr-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-h-[480px] overflow-y-auto pr-1"}`}>
        {filteredTimestamps.map((item) => {
          const originalIdx = timestamps.findIndex((t) => t.title === item.title && t.time === item.time);
          const isSelected = activeTimestampIdx === originalIdx;

          const cardSelectedStyles = isBlue
            ? "bg-primary/15 border-primary/70 ring-1 ring-primary/40 text-primary"
            : "bg-amber-500/15 border-amber-500/70 ring-1 ring-amber-500/40 text-amber-700 dark:text-amber-300";

          const cardHoverBorder = isBlue
            ? "hover:border-primary/50"
            : "hover:border-amber-500/50";

          const numBadgeSelected = isBlue
            ? "bg-primary text-primary-foreground"
            : "bg-amber-600 text-white";

          const numBadgeUnselected = isBlue
            ? "bg-muted text-foreground/80 group-hover:bg-primary/15 group-hover:text-primary"
            : "bg-muted text-foreground/80 group-hover:bg-amber-500/15 group-hover:text-amber-600 dark:group-hover:text-amber-400";

          const timeBadgeSelected = isBlue
            ? "bg-primary/20 text-primary border-primary/40 font-bold"
            : "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40 font-bold";

          const titleSelected = isBlue
            ? "text-primary font-bold"
            : "text-amber-700 dark:text-amber-300 font-bold";

          const titleHover = isBlue
            ? "group-hover:text-primary"
            : "group-hover:text-amber-600 dark:group-hover:text-amber-400";

          const playSelected = isBlue
            ? "text-primary fill-primary/20"
            : "text-amber-600 dark:text-amber-400 fill-amber-500/20";

          const playHover = isBlue
            ? "group-hover:text-primary"
            : "group-hover:text-amber-500";

          const linkHover = isBlue
            ? "hover:text-primary"
            : "hover:text-amber-600";

          return (
            <div
              key={`${item.time}-${item.title}`}
              onClick={() => onSelectTimestamp(item.seconds, originalIdx, item)}
              className={`group p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between relative shadow-2xs hover:shadow-xs ${
                isSelected
                  ? cardSelectedStyles
                  : `bg-card/90 hover:bg-card border-border/80 ${cardHoverBorder}`
              }`}
            >
              {/* Card Top Row: #01 Track Name (left) | Clock Time (right) */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                    isSelected ? numBadgeSelected : numBadgeUnselected
                  }`}>
                    #{String(originalIdx + 1).padStart(2, "0")}
                  </span>
                  {item.category && (
                    <span className="text-[11px] font-medium text-muted-foreground truncate">
                      {item.category}
                    </span>
                  )}
                </div>

                <Badge
                  variant="outline"
                  className={`text-[10px] font-mono shrink-0 px-2 py-0.5 ${
                    isSelected
                      ? timeBadgeSelected
                      : `bg-background/80 text-muted-foreground ${isBlue ? "group-hover:border-primary/30" : "group-hover:border-amber-500/30"}`
                  }`}
                >
                  <Clock className={`h-2.5 w-2.5 mr-1 inline ${isBlue ? "text-primary" : "text-amber-500"}`} />
                  {item.time}
                </Badge>
              </div>

              {/* Card Middle Row: Title & Description */}
              <div className="space-y-1 mb-2">
                <h5 className={`text-xs font-bold leading-snug line-clamp-2 ${
                  isSelected ? titleSelected : `text-foreground ${titleHover} transition-colors`
                }`}>
                  {item.title}
                </h5>
                {item.description && (
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Card Bottom Row: Action Icons */}
              <div className="pt-2 border-t border-border/40 flex items-center justify-between">
                <span className={`text-[10px] font-semibold flex items-center gap-1 ${isSelected ? "text-primary font-bold" : "text-muted-foreground group-hover:text-foreground"}`}>
                  <PlayCircle className={`h-3.5 w-3.5 ${isSelected ? playSelected : playHover}`} />
                  <span>{isSelected ? "Now Playing" : "Play Tutorial"}</span>
                </span>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`text-[10px] text-muted-foreground ${linkHover} flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-muted/50 transition-colors`}
                  title="Open tutorial on YouTube"
                >
                  <span>YouTube</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          );
        })}

        {filteredTimestamps.length === 0 && (
          <div className="col-span-full py-8 text-center text-muted-foreground space-y-2">
            <p className="text-xs font-medium">No chapters match &quot;{searchQuery}&quot;</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => { setSearchQuery(""); setSelectedCategory("ALL"); }}
              className={`text-xs h-7 mt-1 ${isBlue ? "border-primary/30 hover:bg-primary/10" : "border-amber-500/30 hover:bg-amber-500/10"}`}
            >
              Reset Search &amp; Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export const TamilVideoTimeline = VideoTimeline;
