"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, FlaskConical, Award, Code2, Sparkles, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

export function ScrollSideController() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(Math.max(progress, 0), 100));
        setIsVisible(window.scrollY > 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG Circle calculations for progress ring
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-3 sm:bottom-5 inset-x-3 sm:inset-x-8 z-50 flex items-center justify-between pointer-events-none select-none"
          aria-label="Floating page navigation and scroll controller"
        >
          {/* Left Floating Island: Scroll Percentage & Scroll-To-Top Button (Picture 2 Left) */}
          <div className="bg-slate-900/95 dark:bg-slate-950/95 text-slate-100 backdrop-blur-xl border border-slate-800 rounded-full p-1.5 sm:p-2 shadow-2xl flex items-center gap-1.5 sm:gap-2 ring-1 ring-white/10 pointer-events-auto">
            {/* Scroll Percentage Badge */}
            <div className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-[9px] sm:text-[10px] font-bold border border-rose-500/30">
              {Math.round(scrollProgress)}%
            </div>

            {/* Circular SVG Scroll-To-Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-rose-600 hover:bg-rose-500 text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-rose-600/30 cursor-pointer group"
              title="Scroll to top"
            >
              {/* Progress Ring Overlay */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  className="stroke-white/20"
                  strokeWidth="3"
                  fill="transparent"
                />
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  className="stroke-white transition-all duration-150"
                  strokeWidth="3"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Right Floating Island: Quick Links (Picture 2 Right) */}
          <div className="bg-slate-900/95 dark:bg-slate-950/95 text-slate-100 backdrop-blur-xl border border-slate-800 rounded-full p-1.5 sm:p-2 shadow-2xl flex items-center gap-1 sm:gap-2 ring-1 ring-white/10 pointer-events-auto">
            {/* Quick Link: Virtual Labs */}
            <button
              type="button"
              onClick={() => router.push("/labs")}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer group"
              title="Virtual Labs"
            >
              <FlaskConical className="h-3.5 w-3.5 text-rose-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="hidden sm:inline">Labs</span>
            </button>

            <div className="w-[1px] h-3.5 bg-white/15" />

            {/* Quick Link: Visualizer */}
            <button
              type="button"
              onClick={() => router.push("/visualizer")}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer group"
              title="Visualizer Studio"
            >
              <Code2 className="h-3.5 w-3.5 text-sky-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="hidden sm:inline">Visualizer</span>
            </button>

            <div className="w-[1px] h-3.5 bg-white/15" />

            {/* Quick Link: Dashboard */}
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer group"
              title="Dashboard"
            >
              <Award className="h-3.5 w-3.5 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}


