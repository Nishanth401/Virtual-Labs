"use client";

import React, { useState, useMemo } from "react";
import { LabTamilVideo, VideoTimestamp } from "@/data/labs";
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
  Sparkles,
  Layers,
  BookOpen
} from "lucide-react";

interface TamilVideoTimelineProps {
  tamilVideo: LabTamilVideo;
  activeTimestampIdx: number | null;
  onSelectTimestamp: (seconds: number, idx: number) => void;
  currentVideoTime: number;
  compact?: boolean;
}

export function TamilVideoTimeline({
  tamilVideo,
  activeTimestampIdx,
  onSelectTimestamp,
  currentVideoTime,
  compact = false
}: TamilVideoTimelineProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const timestamps = tamilVideo.timestamps || [];

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
    return timestamps.filter((item, idx) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.time.includes(searchQuery) ||
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
      onSelectTimestamp(timestamps[prevIdx].seconds, prevIdx);
    }
  };

  const handleNext = () => {
    if (activeTimestampIdx !== null && activeTimestampIdx < timestamps.length - 1) {
      const nextIdx = activeTimestampIdx + 1;
      onSelectTimestamp(timestamps[nextIdx].seconds, nextIdx);
    } else if (activeTimestampIdx === null && timestamps.length > 0) {
      onSelectTimestamp(timestamps[0].seconds, 0);
    }
  };

  if (!timestamps || timestamps.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5 backdrop-blur-xs">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-amber-500/15">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span>Interactive Course Chapters &amp; Timestamps</span>
              <Badge variant="outline" className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                {timestamps.length} Chapters
              </Badge>
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Click any chapter to jump directly to that module in the video player
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
            className="h-7 text-xs px-2 gap-1 border-amber-500/30 hover:bg-amber-500/10"
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
            className="h-7 text-xs px-2 gap-1 border-amber-500/30 hover:bg-amber-500/10"
            title="Next Chapter"
          >
            Next <ChevronRight className="h-3.5 w-3.5" />
          </Button>
          {currentVideoTime > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onSelectTimestamp(0, 0)}
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
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0 font-mono">
              Playing Chapter #{(activeTimestampIdx ?? 0) + 1}:
            </span>
            <span className="font-semibold text-foreground truncate">
              {activeTimestamp.title}
            </span>
            <Badge variant="outline" className="font-mono text-[10px] shrink-0 border-amber-500/30 bg-background/50">
              {activeTimestamp.time}
            </Badge>
          </div>

          <a
            href={activeTimestamp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>YouTube</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}

      {/* Search & Category Filter Bar */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters (e.g., Regression, Pandas, K-Means, Statistics)..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-background border border-border focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 outline-hidden transition-all text-foreground"
            />
          </div>

          {/* Quick Filter Counts */}
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

        {/* Category Pills (if available and not in compact mode) */}
        {!compact && categories.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
            <span className="text-[11px] font-mono text-muted-foreground shrink-0 flex items-center gap-1">
              <Layers className="h-3 w-3" /> Track:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-amber-600 text-white font-bold shadow-xs"
                      : "bg-background/80 hover:bg-background text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  {cat === "ALL" ? `All (${timestamps.length})` : cat}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Chapters Grid / List */}
      <div className={`grid gap-2 ${compact ? "grid-cols-1 max-h-72 overflow-y-auto pr-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-h-96 overflow-y-auto pr-1"}`}>
        {filteredTimestamps.map((item) => {
          const originalIdx = timestamps.findIndex((t) => t.seconds === item.seconds);
          const isSelected = activeTimestampIdx === originalIdx;

          return (
            <div
              key={`${item.time}-${item.title}`}
              onClick={() => onSelectTimestamp(item.seconds, originalIdx)}
              className={`group p-2.5 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between relative ${
                isSelected
                  ? "bg-amber-500/15 border-amber-500/60 shadow-xs ring-1 ring-amber-500/40"
                  : "bg-background/70 hover:bg-background border-border/80 hover:border-amber-500/40 hover:shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isSelected
                      ? "bg-amber-600 text-white"
                      : "bg-muted text-muted-foreground group-hover:bg-amber-500/10 group-hover:text-amber-600 dark:group-hover:text-amber-400"
                  }`}>
                    #{String(originalIdx + 1).padStart(2, "0")}
                  </span>
                  {item.category && (
                    <span className="text-[10px] text-muted-foreground truncate max-w-[130px]">
                      {item.category}
                    </span>
                  )}
                </div>

                <Badge
                  variant="outline"
                  className={`text-[10px] font-mono shrink-0 px-1.5 py-0 ${
                    isSelected
                      ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40 font-bold"
                      : "bg-muted/50 text-muted-foreground group-hover:border-amber-500/30"
                  }`}
                >
                  <Clock className="h-2.5 w-2.5 mr-1 inline" />
                  {item.time}
                </Badge>
              </div>

              <div className="flex items-start justify-between gap-2">
                <h5 className={`text-xs font-semibold leading-snug line-clamp-2 ${
                  isSelected ? "text-amber-700 dark:text-amber-300 font-bold" : "text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400"
                }`}>
                  {item.title}
                </h5>

                <div className="shrink-0 flex items-center gap-1 mt-0.5">
                  <PlayCircle className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                    isSelected ? "text-amber-600 dark:text-amber-400 fill-amber-500/20" : "text-muted-foreground group-hover:text-amber-500"
                  }`} />
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted-foreground hover:text-amber-600 p-0.5 rounded transition-colors"
                    title="Open on YouTube"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {filteredTimestamps.length === 0 && (
          <div className="col-span-full py-8 text-center text-muted-foreground space-y-1">
            <p className="text-xs font-medium">No chapters match &quot;{searchQuery}&quot;</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => { setSearchQuery(""); setSelectedCategory("ALL"); }}
              className="text-xs h-7 mt-1"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
