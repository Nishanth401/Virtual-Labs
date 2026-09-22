"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResourceItem } from "@/data/resources";
import { Video, Clock, Globe, FlaskConical, ExternalLink, Play, Sparkles } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: ResourceItem | null;
}

export function VideoModal({ isOpen, onClose, resource }: VideoModalProps) {
  if (!resource) return null;

  // Convert youtube watch URL or playlist URL to embed format
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    if (url.includes("youtube.com/playlist?list=")) {
      const listId = url.split("list=")[1]?.split("&")[0];
      return `https://www.youtube-nocookie.com/embed/videoseries?list=${listId}&rel=0`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(resource.fileUrl);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 overflow-hidden !max-w-4xl !w-[95vw] bg-background/95 backdrop-blur-xl border-border rounded-3xl shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 pb-3 border-b border-border/80 bg-card/60 backdrop-blur-md flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-[11px] font-mono border-red-500/30 text-red-600 dark:text-red-400 bg-red-500/10">
              <Video className="h-3 w-3 mr-1" />
              Video Lecture
            </Badge>
            {resource.language && (
              <Badge variant="secondary" className="text-[11px] font-mono">
                Language: {resource.language}
              </Badge>
            )}
            {resource.duration && (
              <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {resource.duration}
              </span>
            )}
          </div>
          <DialogTitle className="text-lg sm:text-xl font-black text-foreground font-heading tracking-tight leading-snug">
            {resource.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground line-clamp-1">
            {resource.description}
          </DialogDescription>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black flex-1">
          <iframe
            src={embedUrl}
            title={resource.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Footer info & direct simulator launcher */}
        <div className="p-4 px-6 border-t border-border/80 bg-card/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Interactive simulation modules are available to practice this topic live.</span>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 text-xs font-bold rounded-xl" asChild>
              <Link href="/labs">
                <FlaskConical className="h-3.5 w-3.5 mr-1" />
                <span>Open Virtual Labs</span>
              </Link>
            </Button>
            <Button size="sm" variant="secondary" onClick={onClose} className="h-8 text-xs font-bold rounded-xl">
              Close Player
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
