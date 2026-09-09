"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FlaskConical,
  LogIn,
  User as UserIcon,
  Search,
  Award,
  ShieldCheck,
  X,
  ArrowRight,
  Menu
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { ModeToggle } from "@/components/global/mode-toggle";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const NAV_ITEMS = [
  { name: "Labs", href: "/labs" },
  { name: "DSA Visualizer", href: "/dsa-visualization" },
  { name: "Curriculum", href: "/courses" },
  { name: "ML Track", href: "/labs/ai-machine-learning" },
  { name: "Admin Portal", href: "/admin" },
  { name: "Resources", href: "/resources" },
];

const SEARCH_ITEMS = [
  { title: "Bubble Sort Algorithm", category: "Data Structures", url: "/experiments/bubble-sort", desc: "Adjacent comparisons and bubbling passes in Java" },
  { title: "Selection Sort Algorithm", category: "Data Structures", url: "/experiments/selection-sort", desc: "Minimum index scanning and in-place swapping" },
  { title: "Insertion Sort Algorithm", category: "Data Structures", url: "/experiments/insertion-sort", desc: "Key extraction and adaptive backward shifting" },
  { title: "Stack Operations & LIFO", category: "Data Structures", url: "/experiments/stack-operations", desc: "Push, pop, peek, overflow & underflow in Java" },
  { title: "Queue & Circular Queue", category: "Data Structures", url: "/experiments/queue-operations", desc: "FIFO operations, modulo wrap & buffer management" },
  { title: "Singly Linked List", category: "Data Structures", url: "/experiments/singly-linked-list", desc: "Dynamic node allocations, head/tail insert & reversal" },
  { title: "Linear Regression & Gradient Descent", category: "Machine Learning", url: "/experiments/linear-regression", desc: "Vectorized MSE loss minimization with NumPy" },
  { title: "K-Nearest Neighbors (KNN)", category: "Machine Learning", url: "/experiments/knn-classification", desc: "Euclidean distance classification & decision boundary" },
  { title: "C Programming Lab", category: "Virtual Labs", url: "/labs/c-programming", desc: "Formatted I/O, Pointers, Memory Allocation & Structures" },
  { title: "Python Programming Lab", category: "Virtual Labs", url: "/labs/python-programming", desc: "Dynamic typing, Loops, List Comprehensions, OOP & Exceptions" },
  { title: "Operating Systems Lab", category: "Virtual Labs", url: "/labs/operating-systems", desc: "CPU Scheduling (FCFS/SJF), Semaphores & Banker's Algorithm" },
  { title: "Artificial Intelligence Lab", category: "Virtual Labs", url: "/labs/artificial-intelligence", desc: "A* Search, Minimax Alpha-Beta Pruning & N-Queens" },
  { title: "Big Data Analytics Lab", category: "Virtual Labs", url: "/labs/big-data-analytics", desc: "Hadoop HDFS cluster, Distributed MapReduce & PySpark" },
  { title: "Cloud Service Management Lab", category: "Virtual Labs", url: "/labs/cloud-service-management", desc: "AWS EC2/S3, Docker Compose & Kubernetes" },
  { title: "DSA Visualization Studio", category: "Simulators", url: "/visualizer", desc: "Interactive sandbox for 11+ algorithms and trees" },
  { title: "Admin Portal", category: "Admin", url: "/admin", desc: "College Tenant Administration & Student Management" },
  { title: "Student Progress & Certificate", category: "Dashboard", url: "/dashboard", desc: "Track completed labs and view achievements" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, studentProfile } = useAuth() || {};

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeStudentName, setActiveStudentName] = useState<string | null>(null);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    const syncStudent = () => {
      if (studentProfile?.name) {
        setActiveStudentName(studentProfile.name);
      } else if (user?.displayName) {
        setActiveStudentName(user.displayName);
      } else if (typeof window !== "undefined") {
        const active = localStorage.getItem("vlab_active_student") || localStorage.getItem("vsb_student_profile_data");
        if (active) {
          try {
            const act = JSON.parse(active);
            if (act.name) setActiveStudentName(act.name);
          } catch {}
        }
      }
    };
    syncStudent();

    window.addEventListener("storage", syncStudent);

    // Scroll listener for morphing floating capsule
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        const scrolled = window.scrollY > 20;
        if (scrolled !== isScrolledRef.current) {
          isScrolledRef.current = scrolled;
          setIsScrolled(scrolled);
        }
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("storage", syncStudent);
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [studentProfile, user]);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isItemActive = (href: string) => {
    if (href === "/labs") {
      return pathname === "/labs" || (pathname.startsWith("/labs") && !pathname.startsWith("/labs/ai-machine-learning")) || pathname.startsWith("/experiments");
    }
    return pathname === href || pathname.startsWith(href);
  };

  const filteredSearch = SEARCH_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* ========================================================================= */}
      {/* FASTLANE MORPHING FLOATING CAPSULE (HARDWARE ACCELERATED)                 */}
      {/* Top: Full width with Left & Right sides spread out                       */}
      {/* Scrolled: Left & Right glide together into centered frosted capsule      */}
      {/* ========================================================================= */}
      <motion.header
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed top-3 inset-x-0 z-50 flex justify-center w-full px-2 sm:px-6 pointer-events-none transform-gpu"
      >
        <div className="w-full flex items-center justify-center pointer-events-auto">
          <motion.nav
            layout
            onMouseLeave={() => setHoveredHref(null)}
            transition={{
              layout: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            className={`hidden md:flex items-center select-none border transform-gpu will-change-transform ${
              isScrolled
                ? "w-fit max-w-[96vw] px-3.5 py-1.5 rounded-full border-border/80 dark:border-neutral-800/80 bg-background/95 dark:bg-neutral-950/95 backdrop-blur-2xl shadow-[0_16px_45px_rgba(0,0,0,0.18)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.6)] ring-1 ring-border/20 justify-center gap-2 lg:gap-3"
                : "w-full max-w-7xl px-5 py-2.5 rounded-full border-border/50 dark:border-neutral-800/60 bg-background/80 dark:bg-neutral-950/80 backdrop-blur-xl shadow-md justify-between"
            }`}
          >
            {/* Left Side: Brand Logo & Title */}
            <motion.div
              layout
              transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              className="flex items-center shrink-0"
            >
              <Link
                href="/labs"
                className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full text-foreground hover:text-rose-600 transition-colors group select-none hover:bg-muted/40"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
                  <FlaskConical className="h-3.5 w-3.5" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-black text-xs sm:text-sm tracking-tight font-heading text-foreground whitespace-nowrap">
                    Virtual Lab
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold tracking-wider hidden sm:inline">
                    Studio
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Right Side: Nav Links + Glowing Pill Hover Animation + Actions */}
            <motion.div
              layout
              transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              className="flex items-center gap-1 sm:gap-1.5 shrink-0"
            >
              {/* Navigation Links with animated glowing red hover pill */}
              <div className="flex items-center gap-0.5 sm:gap-1">
                {NAV_ITEMS.map((item) => {
                  const active = isItemActive(item.href);
                  const isHovered = hoveredHref === item.href;
                  const isHighlighted = hoveredHref ? isHovered : active;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onMouseEnter={() => setHoveredHref(item.href)}
                      className={`relative px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 z-10 select-none tracking-wide whitespace-nowrap ${
                        isHighlighted
                          ? "text-white font-bold"
                          : "text-muted-foreground hover:text-foreground font-medium"
                      }`}
                    >
                      {isHighlighted && (
                        <motion.div
                          layoutId="fastlane-navbar-active-pill"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff2a5f] via-[#e11d48] to-[#dc2626] shadow-[0_2px_16px_rgba(225,29,72,0.55)] -z-10"
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 32,
                          }}
                        />
                      )}
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="h-4 w-[1px] bg-border/60 mx-0.5 sm:mx-1" />

              {/* Actions: Search + Student Profile Badge + Dashboard + Theme */}
              <div className="flex items-center gap-1 sm:gap-1.5 pl-0.5">
                {/* Search Button */}
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer shrink-0"
                  title="Search labs & algorithms (Ctrl+K)"
                >
                  <Search className="h-3.5 w-3.5" />
                </button>

                {/* Student Profile Badge */}
                {mounted && activeStudentName ? (
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full border border-border/80 bg-muted/40 hover:bg-muted text-xs font-bold text-foreground transition-all cursor-pointer shadow-xs whitespace-nowrap">
                      <div className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                        {activeStudentName[0]?.toUpperCase() || "S"}
                      </div>
                      <span className="font-bold max-w-[80px] sm:max-w-[95px] truncate text-xs capitalize">
                        {activeStudentName}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    </div>

                    <Link
                      href="/dashboard"
                      className="hidden xl:flex items-center gap-1 px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-bold bg-rose-600/10 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-600/25 transition-all cursor-pointer whitespace-nowrap"
                      title="Go to Student Dashboard"
                    >
                      <span>Dashboard</span>
                      <ArrowRight className="h-2.5 w-2.5" />
                    </Link>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#e11d48] to-[#dc2626] hover:from-[#f43f5e] hover:to-[#e11d48] text-white shadow-xs shadow-red-500/25 transition-all cursor-pointer hover:scale-105 whitespace-nowrap"
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    <span>Sign In</span>
                  </Link>
                )}

                <ModeToggle />
              </div>
            </motion.div>
          </motion.nav>

          {/* Mobile Header View */}
          <div className="md:hidden w-full px-4 py-2 rounded-2xl border border-border/70 bg-background/90 backdrop-blur-xl shadow-md flex items-center justify-between">
            <Link href="/labs" className="flex items-center gap-2 text-foreground">
              <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white">
                <FlaskConical className="h-3.5 w-3.5" />
              </div>
              <span className="font-black text-xs font-heading">Virtual Lab</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-1.5 rounded-full text-muted-foreground"
              >
                <Search className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-full text-muted-foreground"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 inset-x-4 z-50 p-3 rounded-2xl border border-border/80 bg-background/95 backdrop-blur-2xl shadow-2xl space-y-1.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2 rounded-xl text-xs font-semibold text-foreground hover:bg-muted"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2 rounded-xl text-xs font-semibold text-foreground hover:bg-muted"
          >
            Student Dashboard
          </Link>
        </div>
      )}

      {/* Global Search Dialog Modal */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden bg-background border border-border shadow-2xl rounded-2xl">
          <DialogHeader className="p-4 pb-0">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-muted/50 border border-border/60">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type an algorithm, data structure, or lab keyword (e.g. Bubble, Stack, NumPy, SQL, CPU)..."
                className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none font-sans"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </DialogHeader>

          <div className="max-h-80 overflow-y-auto p-4 space-y-1.5 divide-y divide-border/30">
            {filteredSearch.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSearchOpen(false);
                  router.push(item.url);
                }}
                className="p-2.5 rounded-xl hover:bg-muted/60 transition-colors cursor-pointer flex items-start justify-between gap-3 group"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground group-hover:text-rose-600 transition-colors">
                      {item.title}
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">
                    {item.desc}
                  </p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-rose-600 group-hover:translate-x-1 transition-all mt-1 shrink-0" />
              </div>
            ))}

            {filteredSearch.length === 0 && (
              <div className="p-6 text-center text-xs text-muted-foreground">
                No matching experiments or modules found for &ldquo;{searchQuery}&rdquo;.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}