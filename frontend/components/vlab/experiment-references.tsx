"use client";

import React from "react";
import { BookOpen, Video, ExternalLink } from "lucide-react";

export interface ReferenceItem {
  textBooks?: string[];
  videoLectures?: { title: string; url: string; presenter?: string }[];
}

interface ExperimentReferencesProps {
  references?: ReferenceItem;
  defaultTopic?: string;
  defaultVideoUrl?: string;
}

export function ExperimentReferences({
  references,
  defaultTopic = "Computer Science and Data Structures",
  defaultVideoUrl,
}: ExperimentReferencesProps) {
  const defaultTextBooks = references?.textBooks || [
    "Mark Allen Weiss. Data Structures and Algorithm Analysis in Java, 3rd Edition. Pearson, 2012.",
    "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein. Introduction to Algorithms, 3rd/4th Edition. MIT Press.",
    "John L. Hennessy and David A. Patterson. Computer Architecture: A Quantitative Approach, 6th Edition. Morgan Kaufmann.",
    "Abraham Silberschatz, Peter B. Galvin, and Greg Gagne. Operating System Concepts, 10th Edition. Wiley.",
  ];

  const defaultVideos = references?.videoLectures || [
    {
      presenter: "Prof. Naveen Garg",
      title: "Lecture: Data Structures, Algorithms & Computational Complexity",
      url: defaultVideoUrl || "https://nptel.ac.in/courses/106102064",
    },
    {
      presenter: "NPTEL / Virtual Labs MoE",
      title: "Interactive Experiment Simulation & Code Step Walkthrough",
      url: defaultVideoUrl || "https://www.youtube.com/results?search_query=virtual+labs+computer+science",
    },
    {
      presenter: "Prof. John Jose",
      title: "Pipeline Hazards and Dynamic Scheduling in Modern Architecture",
      url: "https://nptel.ac.in/courses/106103206",
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl text-sm leading-relaxed">
      {/* Text Books Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-foreground underline decoration-primary/40 underline-offset-4 flex items-center gap-2 font-heading">
          <BookOpen className="h-4 w-4 text-primary" />
          Text Books
        </h3>

        <ol className="list-decimal list-outside pl-5 space-y-2.5 text-foreground/90 font-sans">
          {defaultTextBooks.map((book, idx) => (
            <li key={idx} className="pl-1 leading-relaxed">
              {book}
            </li>
          ))}
        </ol>
      </div>

      {/* Video Lectures Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-foreground underline decoration-primary/40 underline-offset-4 flex items-center gap-2 font-heading">
          <Video className="h-4 w-4 text-primary" />
          Video Lectures
        </h3>

        <ol className="list-decimal list-outside pl-5 space-y-3 text-foreground/90 font-sans" start={defaultTextBooks.length + 1}>
          {defaultVideos.map((vid, idx) => (
            <li key={idx} className="pl-1 leading-relaxed">
              <span className="font-semibold text-foreground">{vid.presenter}: </span>
              <span>&ldquo;{vid.title}&rdquo;. </span>
              <a
                href={vid.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0284c7] hover:underline font-mono text-xs inline-flex items-center gap-1 ml-1"
              >
                <span>{vid.url}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
