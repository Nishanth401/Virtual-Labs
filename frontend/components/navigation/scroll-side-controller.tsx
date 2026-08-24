"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, FlaskConical, Award, Code2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export function ScrollSideController() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(Math.max(progress, 0), 100));
        setIsVisible(window.scrollY > 80);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <aside
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 pointer-events-auto select-none"
      aria-label="Page navigation and scroll progress"
    >
      <div className="bg-card/90 backdrop-blur-md border border-border/80 rounded-full p-1.5 shadow-2xl flex flex-col items-center gap-2">
        {/* Scroll To Top Button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="w-8 h-8 rounded-full bg-muted/60 hover:bg-[#e11d48] hover:text-white transition-all flex items-center justify-center text-muted-foreground group shadow-xs cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        {/* Vertical Animated Progress Bar */}
        <div className="w-1.5 h-24 bg-muted/70 rounded-full relative overflow-hidden my-1">
          <motion.div
            className="w-full bg-gradient-to-b from-[#e11d48] to-[#dc2626] rounded-full absolute top-0 left-0"
            style={{ height: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Scroll Percentage Bubble */}
        <div className="text-[9px] font-mono font-bold text-foreground bg-muted/80 px-1.5 py-0.5 rounded-full shadow-xs">
          {Math.round(scrollProgress)}%
        </div>

        {/* Quick Jump: Labs */}
        <button
          type="button"
          onClick={() => router.push("/labs")}
          className="w-8 h-8 rounded-full hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-center text-muted-foreground shadow-xs cursor-pointer"
          title="Explore Virtual Labs"
        >
          <FlaskConical className="h-4 w-4" />
        </button>

        {/* Quick Jump: Visualizer */}
        <button
          type="button"
          onClick={() => router.push("/visualizer")}
          className="w-8 h-8 rounded-full hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-center text-muted-foreground shadow-xs cursor-pointer"
          title="DSA Visualizer Studio"
        >
          <Code2 className="h-4 w-4" />
        </button>

        {/* Quick Jump: Student Portal */}
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="w-8 h-8 rounded-full hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-center text-muted-foreground shadow-xs cursor-pointer"
          title="Student Dashboard & Certificates"
        >
          <Award className="h-4 w-4" />
        </button>

        {/* Scroll To Bottom Button */}
        <button
          type="button"
          onClick={scrollToBottom}
          className="w-8 h-8 rounded-full bg-muted/60 hover:bg-[#e11d48] hover:text-white transition-all flex items-center justify-center text-muted-foreground group shadow-xs cursor-pointer"
          title="Scroll to Bottom"
        >
          <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </aside>
  );
}
