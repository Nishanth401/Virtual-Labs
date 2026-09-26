"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  BrainCircuit,
  Database,
  Network,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  ExternalLink,
  Award,
  BookOpen,
  Layers,
  Cpu,
  Bot,
  BarChart3,
  Cloud,
  Sparkles,
  Zap,
  GraduationCap
} from "lucide-react";

const VIRTUAL_LAB_STATEMENTS = [
  {
    badge: "Interactive Engineering Sandbox",
    line1: "Simulate faster.",
    line2: "Learn smarter.",
    line3: "Grow with interactive virtual labs.",
    desc: "We design, build, and simulate high-performance data structures in pure Java, machine learning models with NumPy/Pandas pipelines, relational SQL databases, and network protocols for ambitious engineers.",
    highlight: "Autonomous Curriculum Aligned"
  },
  {
    badge: "Deep Visual Understanding",
    line1: "Visualize code.",
    line2: "Master concepts.",
    line3: "Intuitive algorithmic thinking.",
    desc: "Inspect live memory frames, observe dynamic recursive call stacks step-by-step, trace pointer arithmetic, and verify time complexity across edge cases in real time.",
    highlight: "Placement & GATE Ready"
  },
  {
    badge: "Cloud, AI & Distributed Data",
    line1: "Deploy systems.",
    line2: "Analyze data.",
    line3: "From fundamentals to production.",
    desc: "Hands-on virtual computing labs covering AWS multi-account governance, distributed Hadoop HDFS MapReduce pipelines, BCNF relational normalization, and deep neural vision networks.",
    highlight: "V.S.B. Autonomous Syllabus"
  },
  {
    badge: "Zero Setup Required",
    line1: "Code anywhere.",
    line2: "Simulate anytime.",
    line3: "Empowering future engineers.",
    desc: "Comprehensive lab manuals, Bloom's Taxonomy mapped Course Outcomes (COs), numerical CO-PO correlation matrices, and automated interactive grading rubrics.",
    highlight: "Anna University R2021/R2023"
  }
];

const ROLLING_CARDS = [
  {
    title: "Data Structures Design Lab",
    tag: "DSDL • AD8301",
    desc: "Interactive sorting step visualizers, Java recursion call stack & LeetCode practice.",
    icon: Code2,
    color: "from-sky-500/10 to-blue-500/10 text-[#0284c7] border-sky-500/30",
    url: "/labs/data-structures",
  },
  {
    title: "Deep Learning Laboratory",
    tag: "DLL • AD8481",
    desc: "XOR DNN models, CNN digit/face recognition, RNN language models, LSTM & GANs.",
    icon: BrainCircuit,
    color: "from-indigo-500/10 to-sky-500/10 text-indigo-500 border-indigo-500/30",
    url: "/labs/ai-machine-learning",
  },
  {
    title: "Database Management Systems Lab",
    tag: "DBMSL • AD8303",
    desc: "SQL relational execution engine, BCNF normalization, B+ Tree indexing & ACID transactions.",
    icon: Database,
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-500 border-emerald-500/30",
    url: "/labs/dbms-lab",
  },
  {
    title: "Object Oriented Programming (Java)",
    tag: "OOPL • AD8302",
    desc: "Class encapsulation, inheritance hierarchies, matrix spiral/wave, custom exceptions & JDBC.",
    icon: Code2,
    color: "from-rose-500/10 to-red-500/10 text-rose-500 border-rose-500/30",
    url: "/labs/oops-java",
  },
  {
    title: "Programming in C Laboratory",
    tag: "CPL • GE3171",
    desc: "Formatted I/O, control structures, pointer dereferencing, dynamic memory & structures.",
    icon: Cpu,
    color: "from-cyan-500/10 to-sky-500/10 text-cyan-600 border-cyan-500/30",
    url: "/labs/c-programming",
  },
  {
    title: "Big Data Analytics Lab",
    tag: "BDAL • CS8711",
    desc: "Hadoop HDFS cluster replication, Distributed MapReduce, Apache Hive & HBase.",
    icon: BarChart3,
    color: "from-amber-500/10 to-orange-500/10 text-amber-600 border-amber-500/30",
    url: "/labs/big-data-analytics",
  },
  {
    title: "Cloud Service Management Lab",
    tag: "CSML • CS8811",
    desc: "AWS RBAC organization, web app TCO cost modeling, metric telemetry & workload migration.",
    icon: Cloud,
    color: "from-teal-500/10 to-cyan-500/10 text-teal-600 border-teal-500/30",
    url: "/labs/cloud-service-management",
  },
  {
    title: "DSA Visualization Studio",
    tag: "12 CORE MODULES",
    desc: "Complete top-to-bottom interactive DSA learning curriculum with live simulators.",
    icon: Layers,
    color: "from-sky-500/10 to-blue-500/10 text-[#0284c7] border-sky-500/30",
    url: "/dsa-visualization",
  },
];

export function HeroObjectives() {
  const [statementIdx, setStatementIdx] = useState(0);

  // 8-Second Synchronized Slow-Motion Cycle matching the 8-second video
  useEffect(() => {
    const timer = setInterval(() => {
      setStatementIdx((prev) => (prev + 1) % VIRTUAL_LAB_STATEMENTS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentStatement = VIRTUAL_LAB_STATEMENTS[statementIdx];

  return (
    <section className="relative min-h-[82vh] flex flex-col justify-between pt-28 sm:pt-36 pb-14 px-4 sm:px-6 bg-gradient-to-b from-background via-background to-muted/20 border-b border-border/40 overflow-hidden">
      {/* Ambient Lighting & Glow Backdrop in Soft Virtual Labs Sky Blue */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-sky-500/15 via-blue-500/10 to-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* 2-BLOCK HERO CONTAINER (Block 1: Video | Block 2: Slow-Motion Animated Text) */}
      <div className="container max-w-[1400px] mx-auto relative z-10 pt-2 sm:pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ========================================================================= */}
          {/* 1st BLOCK (LEFT): LOGO ANIMATION VIDEO (8 SECONDS)                        */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 w-full flex justify-center order-2 lg:order-1">
            <div className="relative group w-full max-w-md lg:max-w-none">
              {/* Outer Atmospheric Glow */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#0284c7]/40 via-sky-500/30 to-indigo-500/40 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10 animate-pulse" />
              
              {/* Video Player Card */}
              <div className="relative rounded-2xl overflow-hidden bg-black/90 border-2 border-[#0284c7]/40 shadow-2xl shadow-sky-950/40">
                <video
                  src="/logo-animation.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto aspect-video sm:aspect-[4/3] lg:aspect-square object-cover"
                />

                {/* Glassmorphic Live Tag Overlay */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2 px-3 py-1 bg-black/70 backdrop-blur-md border border-white/15 rounded-full text-[11px] font-mono text-white/95 shadow-md">
                  <span className="h-2 w-2 rounded-full bg-[#0284c7] animate-ping" />
                  <span className="font-semibold">Virtual Labs Official (8s)</span>
                </div>

                {/* Bottom Glass Caption */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-[11px] text-white/80 font-mono">
                  <span className="truncate">VSB Engineering College</span>
                  <Badge variant="outline" className="text-[10px] border-white/20 bg-white/10 text-white rounded-none">
                    Autonomous
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2nd BLOCK (RIGHT): SLOW-MOTION ANIMATED VIRTUAL LAB SENTENCE              */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 w-full text-left space-y-5 order-1 lg:order-2 pl-0 lg:pl-4">
            
            {/* Slow-Motion Animated Sentence Block */}
            <AnimatePresence mode="wait">
              <motion.div
                key={statementIdx}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0284c7]/10 border border-[#0284c7]/30 text-[#0284c7] dark:text-[#38bdf8] text-xs font-mono font-bold shadow-2xs">
                  <Sparkles className="h-3.5 w-3.5 text-[#0284c7]" />
                  <span>{currentStatement.badge}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground font-normal">{currentStatement.highlight}</span>
                </div>

                {/* High-Impact Headline with Slow-Motion Aesthetic Typography */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12] sm:leading-[1.08] font-heading">
                  {currentStatement.line1}{" "}
                  <span className="font-serif-italic font-normal text-slate-600 dark:text-slate-400">
                    {currentStatement.line2}
                  </span>
                  <br />
                  <span className="text-[#0284c7] dark:text-[#38bdf8] font-black">
                    {currentStatement.line3}
                  </span>
                </h1>

                {/* Subtitle Sentence */}
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
                  {currentStatement.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* 8-Second Synchronized Slow-Motion Progress Bar */}
            <div className="space-y-1.5 py-1 max-w-xl">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5 text-[#0284c7] dark:text-[#38bdf8] font-bold">
                  <Zap className="h-3 w-3" />
                  <span>Slow-motion Synchronized Cycle ({statementIdx + 1}/4)</span>
                </span>
                <span>8.0s Interval</span>
              </div>
              <div className="w-full h-1 bg-border/60 rounded-full overflow-hidden">
                <motion.div
                  key={`progress-bar-${statementIdx}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8.0, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-[#0284c7] via-sky-400 to-[#ea580c]"
                />
              </div>
            </div>

            {/* Dual Capsule CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2 w-full">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-full px-7 py-5 sm:py-6 font-bold shadow-lg shadow-sky-600/20 hover:scale-105 transition-all text-xs sm:text-sm gap-2 cursor-pointer"
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
                className="w-full sm:w-auto rounded-full px-6 py-5 sm:py-6 text-xs sm:text-sm font-semibold border-border bg-card/80 hover:bg-muted hover:border-[#0284c7]/40 text-foreground transition-all gap-1.5 shadow-xs cursor-pointer"
              >
                <Link href="/dsa-visualization">
                  <span>DSA Visualization Platform</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            {/* Quick Access Lab Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono text-muted-foreground">
              <span className="font-semibold text-foreground mr-1">Direct Labs:</span>
              {[
                { name: "DBMS", href: "/labs/dbms-lab" },
                { name: "OOP (Java)", href: "/labs/oops-java" },
                { name: "DSA", href: "/labs/data-structures" },
                { name: "Big Data", href: "/labs/big-data-analytics" },
                { name: "Cloud CSM", href: "/labs/cloud-service-management" },
                { name: "Deep Learning", href: "/labs/ai-machine-learning" },
                { name: "C Programming", href: "/labs/c-programming" },
              ].map((labChip) => (
                <Link
                  key={labChip.name}
                  href={labChip.href}
                  className="px-2 py-0.5 rounded-none bg-muted/60 hover:bg-[#0284c7]/10 hover:text-[#0284c7] border border-border/80 transition-colors"
                >
                  {labChip.name}
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* CONTINUOUS ROLLING / MARQUEE ANIMATED TITLE CARDS SHOWCASE */}
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
                className="w-72 sm:w-80 p-5 rounded-2xl bg-card border border-border shadow-xs hover:border-[#0284c7] hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${card.color} border shadow-2xs group-hover:scale-110 transition-transform`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono font-bold">
                      {card.tag}
                    </Badge>
                  </div>

                  <h4 className="font-bold text-sm text-foreground group-hover:text-[#0284c7] transition-colors line-clamp-1">
                    {card.title}
                  </h4>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-[#0284c7] transition-colors">
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
