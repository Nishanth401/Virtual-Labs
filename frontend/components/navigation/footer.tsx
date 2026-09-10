"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code2,
  BrainCircuit,
  Database,
  Network,
  Sparkles,
  Award,
  ShieldCheck,
  Github,
  Linkedin
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070709] text-slate-300 relative overflow-hidden border-t border-slate-800/80">
      {/* Background Accent Gradients */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Directory */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Left: Creator Profile (Cols 1-5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-1.5 font-black text-2xl text-white font-heading tracking-tight">
              <span>ROHITH E</span>
              <span className="text-rose-500 text-3xl leading-none">.</span>
            </div>
            
            <p className="text-slate-400 text-xs sm:text-sm font-light max-w-md leading-relaxed">
              I&apos;m Rohith — a full-stack engineer, product builder &amp; problem solver. Welcome to the official Virtual Laboratory Platform.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600/15 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 text-xs font-bold transition-all shadow-xs"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Admin Portal</span>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-semibold transition-all"
              >
                <Award className="h-3.5 w-3.5 text-amber-400" />
                <span>Student Dashboard</span>
              </Link>
            </div>
          </div>

          {/* Columns 2-4: Links Categories (Cols 6-12) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            
            {/* Column: PLATFORM */}
            <div className="space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                PLATFORM
              </span>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/labs" className="text-slate-400 hover:text-white transition-colors">
                    Virtual Labs
                  </Link>
                </li>
                <li>
                  <Link href="/dsa-visualization" className="text-slate-400 hover:text-white transition-colors">
                    DSA Visualizer
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="text-slate-400 hover:text-white transition-colors">
                    Curriculum &amp; Syllabus
                  </Link>
                </li>
                <li>
                  <Link href="/labs/ai-machine-learning" className="text-slate-400 hover:text-white transition-colors">
                    AI &amp; ML Track
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-slate-400 hover:text-white transition-colors">
                    Resource Vault
                  </Link>
                </li>
                <li>
                  <Link href="/colleges" className="text-slate-400 hover:text-white transition-colors">
                    College Portals
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column: LABS */}
            <div className="space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                LABORATORIES
              </span>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/experiments/bubble-sort" className="text-slate-400 hover:text-white transition-colors">
                    Data Structures (Java)
                  </Link>
                </li>
                <li>
                  <Link href="/experiments/linear-regression" className="text-slate-400 hover:text-white transition-colors">
                    Machine Learning Lab
                  </Link>
                </li>
                <li>
                  <Link href="/labs/operating-systems" className="text-slate-400 hover:text-white transition-colors">
                    Operating Systems Lab
                  </Link>
                </li>
                <li>
                  <Link href="/labs/c-programming" className="text-slate-400 hover:text-white transition-colors">
                    C Programming Lab
                  </Link>
                </li>
                <li>
                  <Link href="/labs/artificial-intelligence" className="text-slate-400 hover:text-white transition-colors">
                    Artificial Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="/labs/cloud-service-management" className="text-slate-400 hover:text-white transition-colors">
                    Cloud Services (AWS)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column: INSTITUTION */}
            <div className="space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                INSTITUTION
              </span>
              <ul className="space-y-2.5 text-slate-400">
                <li className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>V.S.B. Engineering College, NH-67, Karur - 639 111, TN.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                  <span>aids@vsb.ac.in</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-10 mt-10 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <p>
            &copy; {new Date().getFullYear()} Virtual Laboratories Platform. Designed &amp; Developed with ❤️ for V.S.B. Engineering College.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-slate-300 transition-colors">
              Admin Portal
            </Link>
            <span>•</span>
            <Link href="/dashboard" className="hover:text-slate-300 transition-colors">
              Student Dashboard
            </Link>
            <span>•</span>
            <Link href="/labs" className="hover:text-slate-300 transition-colors">
              All Laboratories
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
