"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, ExternalLink, Code2, BrainCircuit, Database, Network, Sparkles, Award, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070709] text-slate-300 relative overflow-hidden border-t border-slate-800/80">
      {/* ============================================================== */}
      {/* 1. MEDIUM-HEIGHT BOTTOM BANNER WITH AMBIENT ANIMATIONS         */}
      {/* ============================================================== */}
      <div className="pt-8 pb-4 sm:pt-10 sm:pb-5 relative overflow-hidden border-b border-slate-900 bg-gradient-to-b from-[#090a0f] via-[#070709] to-[#040405] group">
        {/* Subtle LED Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Ambient Backlight Glow Aurora */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-4xl h-32 bg-gradient-to-r from-blue-600/10 via-rose-600/15 to-indigo-600/10 rounded-full blur-[80px] pointer-events-none animate-pulse-glow" />

        <div className="container max-w-7xl mx-auto px-4 text-center relative z-10 space-y-3">
          {/* Sub-headline between animated horizontal hairline lines */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-mono tracking-[0.22em] uppercase text-slate-400 font-semibold">
            <div className="h-[1px] w-8 sm:w-24 bg-gradient-to-r from-transparent via-rose-500/50 to-slate-700 animate-pulse" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping inline-block" />
              <span className="bg-gradient-to-r from-slate-300 via-white to-slate-300 bg-clip-text text-transparent">
                ENGINEERED FOR SCALE &amp; HIGH-CONVERTING DIGITAL EXPERIENCES
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping inline-block" />
            </div>
            <div className="h-[1px] w-8 sm:w-24 bg-gradient-to-l from-transparent via-rose-500/50 to-slate-700 animate-pulse" />
          </div>

          {/* Masked Gradient Typography: ROHITH DIGITAL X (Medium Scale) */}
          <div className="w-full select-none text-center overflow-hidden pt-1 pb-0 flex justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative inline-block w-full"
            >
              <h2 className="text-[5.5vw] sm:text-[6vw] md:text-[6.2vw] font-black uppercase tracking-[-0.03em] leading-[0.9] bottom-brand-mask whitespace-nowrap drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-[1.012] cursor-default">
                ROHITH DIGITAL <span className="text-transparent bg-clip-text bg-gradient-to-br from-rose-400 via-rose-500 to-amber-400 animate-pulse">X</span>
              </h2>
            </motion.div>
          </div>
        </div>
      </div>


      {/* ============================================================== */}
      {/* 3. MAIN FOOTER DIRECTORY & NAVIGATION LINKS                    */}
      {/* ============================================================== */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 pb-12 pt-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-slate-800/60 pt-10">
          {/* Left Brand Profile (Cols 1-5) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-1.5 font-black text-2xl text-white font-heading tracking-tight">
              <span>ROHITH E</span>
              <span className="text-[#e11d48] text-3xl leading-none">.</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm font-light max-w-sm leading-relaxed">
              I&apos;m Rohith — a full-stack engineer, product builder &amp; problem solver. Welcome to the official Department of Artificial Intelligence &amp; Data Science Virtual Laboratory Platform at V.S.B. Engineering College.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>VSB Autonomous Institution • NAAC Accredited</span>
            </div>
          </div>

          {/* Columns 2-4: Links Categories (Cols 6-12) */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6 text-xs">
            {/* Column: GENERAL */}
            <div className="space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                GENERAL
              </span>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors shadow-sm"
                  >
                    <span>Home</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link href="/labs" className="text-slate-400 hover:text-white transition-colors block py-1">
                    Virtual Labs
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="text-slate-400 hover:text-white transition-colors block py-1">
                    Curriculum
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-slate-400 hover:text-white transition-colors block py-1">
                    Resource Vault
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column: SPECIFICS */}
            <div className="space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                SPECIFICS
              </span>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/labs/data-structures" className="hover:text-white transition-colors block py-1">
                    DSA Lab (Java)
                  </Link>
                </li>
                <li>
                  <Link href="/labs/ai-machine-learning" className="hover:text-white transition-colors block py-1">
                    ML &amp; NumPy Track
                  </Link>
                </li>
                <li>
                  <Link href="/labs/dbms-lab" className="hover:text-white transition-colors block py-1">
                    DBMS (SQL)
                  </Link>
                </li>
                <li>
                  <Link href="/labs/computer-networks" className="hover:text-white transition-colors block py-1">
                    CEN (Protocols)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column: MORE */}
            <div className="space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                MORE
              </span>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors block py-1">
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link href="/visualizer" className="hover:text-white transition-colors block py-1">
                    Visualizer Studio
                  </Link>
                </li>
                <li>
                  <Link href="/faculty" className="hover:text-white transition-colors block py-1">
                    Faculty Profiles
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-white transition-colors block py-1">
                    Department Events
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Bottom Line matching clean layout without contact widget */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="font-mono text-[11px]">
            © 2026 Rohith E • Dept. of AI &amp; DS, VSB Engineering College. All rights reserved.
          </div>
          <div className="text-[11px] font-mono text-slate-600">
            Powered by Next.js &amp; Firebase
          </div>
        </div>
      </div>
    </footer>
  );
}
