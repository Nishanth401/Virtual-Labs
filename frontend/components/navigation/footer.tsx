"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, ExternalLink, Code2, BrainCircuit, Database, Network, Sparkles, Award, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070709] text-slate-300 relative overflow-hidden border-t border-slate-800/80">
      {/* ============================================================== */}
      {/* MAIN FOOTER DIRECTORY & NAVIGATION LINKS                       */}
      {/* ============================================================== */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
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
