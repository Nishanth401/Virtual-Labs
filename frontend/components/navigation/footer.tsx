"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FlaskConical,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Building2,
  Lock,
  Globe2,
  Award
} from "lucide-react";
import { BookDemoModal } from "@/components/landing-page/book-demo-modal";

export function Footer() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#070709] text-slate-300 relative overflow-hidden border-t border-slate-800/80">
        {/* Background Ambient Accents */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-14 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Left: Enterprise Platform Overview (Cols 1-5) */}
            <div className="md:col-span-5 space-y-4">
              <Link href="/" className="flex items-center gap-2.5 w-fit group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <FlaskConical className="h-4 w-4" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-black text-xl font-heading tracking-tight text-white">
                    Virtual Labs
                  </span>
                  <span className="text-[10px] font-mono text-rose-400 uppercase font-bold tracking-wider">
                    Enterprise Cloud
                  </span>
                </div>
              </Link>
              
              <p className="text-slate-400 text-xs sm:text-sm font-light max-w-md leading-relaxed">
                The accredited multi-tenant virtual laboratory management system for engineering colleges and universities. Provision custom branded clones with isolated student databases in 24 hours.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Book Free Campus Demo</span>
                </button>

                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-semibold transition-all"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Admin Portal</span>
                </Link>
              </div>
            </div>

            {/* Right: Directory Links (Cols 6-12) */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
              
              {/* Column 1: PLATFORM */}
              <div className="space-y-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                  INSTITUTIONAL
                </span>
                <ul className="space-y-2.5">
                  <li>
                    <button
                      onClick={() => setDemoModalOpen(true)}
                      className="text-rose-400 hover:text-rose-300 transition-colors font-medium cursor-pointer text-left"
                    >
                      Book Free Demo
                    </button>
                  </li>
                  <li>
                    <Link href="/#college-clones" className="text-slate-400 hover:text-white transition-colors">
                      College Clones
                    </Link>
                  </li>
                  <li>
                    <Link href="/labs" className="text-slate-400 hover:text-white transition-colors">
                      12 Virtual Labs
                    </Link>
                  </li>
                  <li>
                    <Link href="/dsa-visualization" className="text-slate-400 hover:text-white transition-colors">
                      DSA Simulator
                    </Link>
                  </li>
                  <li>
                    <Link href="/#pricing" className="text-slate-400 hover:text-white transition-colors">
                      SaaS Licensing
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources" className="text-slate-400 hover:text-white transition-colors">
                      Academic Resources
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: 12 LABS */}
              <div className="space-y-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                  LABORATORIES
                </span>
                <ul className="space-y-2.5">
                  <li>
                    <Link href="/labs/data-structures" className="text-slate-400 hover:text-white transition-colors">
                      Data Structures (Java)
                    </Link>
                  </li>
                  <li>
                    <Link href="/labs/ai-machine-learning" className="text-slate-400 hover:text-white transition-colors">
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
                    <Link href="/labs/dbms-lab" className="text-slate-400 hover:text-white transition-colors">
                      DBMS Laboratory
                    </Link>
                  </li>
                  <li>
                    <Link href="/labs/computer-networks" className="text-slate-400 hover:text-white transition-colors">
                      Computer Networks
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: ENTERPRISE CONTACT */}
              <div className="space-y-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                  ENTERPRISE SUPPORT
                </span>
                <ul className="space-y-2.5 text-slate-400">
                  <li className="flex items-start gap-2">
                    <Building2 className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>Multi-Campus Virtual Lab Cloud Network</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                    <span>demo@virtuallabs.cloud</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Private Tenant Isolation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span>NAAC &amp; NBA Compliant</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-10 mt-10 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
            <p>
              &copy; {new Date().getFullYear()} Virtual Laboratories Enterprise Cloud. All rights reserved.
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
                All 12 Laboratories
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Embedded Demo Modal */}
      <BookDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </>
  );
}
