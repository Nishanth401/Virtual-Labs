"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  BrainCircuit,
  Database,
  Network,
  ArrowRight,
  Sparkles,
  PlayCircle,
  CheckCircle2,
  ExternalLink,
  Award,
  BookOpen,
  Layers,
  Cpu,
  Bot,
  BarChart3,
  Cloud
} from "lucide-react";

const ROLLING_CARDS = [
  {
    title: "Data Structures Lab (Java)",
    tag: "DSL • AD8381",
    desc: "Interactive sorting step visualizers, Java recursion call stack & LeetCode practice.",
    icon: Code2,
    color: "from-blue-500/10 to-indigo-500/10 text-blue-500 border-blue-500/30",
    url: "/labs/data-structures",
  },
  {
    title: "Machine Learning & Deep Learning",
    tag: "MLDL • AD8481",
    desc: "12-module NumPy master series, Pandas pipelines & Gradient Descent models.",
    icon: BrainCircuit,
    color: "from-purple-500/10 to-pink-500/10 text-purple-500 border-purple-500/30",
    url: "/labs/ai-machine-learning",
  },
  {
    title: "Database Management Systems",
    tag: "DBMS • AD8382",
    desc: "SQL relational execution engine, B+ Tree indexing & ACID transaction verification.",
    icon: Database,
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-500 border-emerald-500/30",
    url: "/labs/dbms-lab",
  },
  {
    title: "Computer Networks & Protocols",
    tag: "CEN • AD8581",
    desc: "Sliding window ARQ simulators, Dijkstra shortest path routing & Java sockets.",
    icon: Network,
    color: "from-amber-500/10 to-orange-500/10 text-amber-500 border-amber-500/30",
    url: "/labs/computer-networks",
  },
  {
    title: "Operating Systems Lab",
    tag: "OSL • CS3461",
    desc: "CPU Scheduling Gantt charts, POSIX Semaphores & Banker's deadlock safety algorithm.",
    icon: Cpu,
    color: "from-cyan-500/10 to-sky-500/10 text-cyan-500 border-cyan-500/30",
    url: "/labs/operating-systems",
  },
  {
    title: "Artificial Intelligence Lab",
    tag: "AIL • AI3401",
    desc: "A* 8-Puzzle Manhattan search, Minimax Alpha-Beta pruning & N-Queens CSP solver.",
    icon: Bot,
    color: "from-violet-500/10 to-purple-500/10 text-violet-500 border-violet-500/30",
    url: "/labs/artificial-intelligence",
  },
  {
    title: "Big Data Analytics Lab",
    tag: "BDAL • CS8711",
    desc: "Hadoop HDFS cluster replication, Distributed MapReduce & PySpark DataFrames.",
    icon: BarChart3,
    color: "from-amber-500/10 to-orange-500/10 text-amber-500 border-amber-500/30",
    url: "/labs/big-data-analytics",
  },
  {
    title: "Cloud Service Management Lab",
    tag: "CSML • CS8811",
    desc: "AWS EC2/VPC provisioning, S3 bucket lifecycle, Docker Compose & Kubernetes mesh.",
    icon: Cloud,
    color: "from-teal-500/10 to-cyan-500/10 text-teal-500 border-teal-500/30",
    url: "/labs/cloud-service-management",
  },
  {
    title: "DSA Visualization Platform",
    tag: "12 CORE MODULES",
    desc: "Complete top-to-bottom interactive DSA learning curriculum with live simulators.",
    icon: Layers,
    color: "from-rose-500/10 to-red-500/10 text-rose-500 border-rose-500/30",
    url: "/dsa-visualization",
  },
  {
    title: "Verified Student Certificates",
    tag: "STUDENT PORTAL",
    desc: "Track completed laboratory experiments and generate verified certificates.",
    icon: Award,
    color: "from-yellow-500/10 to-amber-500/10 text-yellow-500 border-yellow-500/30",
    url: "/dashboard",
  },
];

export function HeroObjectives() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between pt-6 pb-16 px-4 sm:px-6 bg-gradient-to-b from-background via-background to-muted/30 border-b border-border/40 overflow-hidden">
      {/* Ambient Lighting & Glow Backdrop (Fastlane aesthetic - No dot particles) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#ff2a5f]/15 via-rose-500/10 to-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container max-w-5xl mx-auto text-center relative z-10 space-y-6 pt-4">
        {/* Sleek Announcement Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d0d10] text-white text-[11px] font-bold tracking-wider uppercase border border-white/10 shadow-lg shadow-black/20"
        >
          <span className="w-2 h-2 rounded-full bg-[#ff2a5f] animate-pulse" />
          <span>Department of Artificial Intelligence &amp; Data Science • VSB Engineering College</span>
        </motion.div>

        {/* High-Impact Headline with Editorial Italic Highlights */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08] font-heading max-w-4xl mx-auto"
        >
          Simulate faster. <span className="font-serif-italic font-normal text-slate-600 dark:text-slate-400">Learn smarter.</span><br />
          Grow with<br />
          <span className="bg-gradient-to-r from-[#ff2a5f] via-[#e11d48] to-[#dc2626] bg-clip-text text-transparent font-black">
            interactive virtual labs.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed"
        >
          We design, build, and simulate high-performance data structures in pure Java, machine learning models with NumPy/Pandas pipelines, relational SQL databases, and network protocols for ambitious engineers.
        </motion.p>

        {/* Dual Capsule CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#ff2a5f] to-[#dc2626] hover:from-[#e11d48] hover:to-[#b91c1c] text-white rounded-full px-8 py-6 font-bold shadow-xl shadow-rose-500/25 hover:scale-105 transition-all text-sm gap-2"
          >
            <Link href="/labs">
              <span>Let&apos;s explore &amp; simulate</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-7 py-6 text-sm font-semibold border-border bg-white/90 dark:bg-card/80 backdrop-blur-md hover:bg-muted transition-all gap-1.5 shadow-xs"
          >
            <Link href="/dsa-visualization">
              <span>DSA Visualization Platform</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* CONTINUOUS ROLLING / MARQUEE ANIMATED TITLE CARDS SHOWCASE (Replacing 5th Image) */}
      <div className="w-full mt-14 overflow-hidden relative select-none">
        {/* Subtle Fade Gradients on left and right */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused] py-2">
          {[...ROLLING_CARDS, ...ROLLING_CARDS].map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.url}
                className="w-72 sm:w-80 p-5 rounded-2xl bg-white/95 dark:bg-card/90 backdrop-blur-md border border-border/80 shadow-md hover:border-[#e11d48] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${card.color} border shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono font-bold">
                      {card.tag}
                    </Badge>
                  </div>

                  <h4 className="font-bold text-sm text-foreground group-hover:text-[#e11d48] transition-colors line-clamp-1">
                    {card.title}
                  </h4>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-foreground group-hover:text-[#e11d48] transition-colors">
                  <span>Enter Module</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
