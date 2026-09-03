"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  FlaskConical,
  Award,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  Code2,
  BrainCircuit,
  Database,
  Network,
  BookOpen,
  ArrowRight,
  MessageSquare,
  LogIn,
  User as UserIcon
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/global/mode-toggle";
import { useAuth } from "@/context/auth-context";
import { StudentAuthDialog } from "@/components/auth/student-auth-dialog";
import { useTheme } from "next-themes";

/**
 * Returns a clean display username from auth state.
 * Priority: studentProfile.name > user.displayName > "User"
 * Rejects anything that looks like an email address or raw email prefix.
 */
function getUsername(
  studentProfile: { name?: string; email?: string } | null,
  user: { displayName?: string | null; email?: string | null } | null
): string {
  const email = studentProfile?.email || user?.email || "";
  const emailPrefix = email.split("@")[0].toLowerCase();

  const isEmailLike = (val: string) => {
    if (!val) return true;
    const v = val.trim().toLowerCase();
    // Explicit email address
    if (v.includes("@")) return true;
    // Matches the raw email prefix exactly
    if (emailPrefix && v === emailPrefix) return true;
    // All lowercase + digits + no spaces (typical email prefix pattern)
    if (/^[a-z0-9._-]+$/.test(v) && v.length > 5 && !v.includes(" ")) return true;
    return false;
  };

  const candidates = [
    studentProfile?.name,
    user?.displayName,
  ];

  for (const c of candidates) {
    if (c && !isEmailLike(c)) return c.trim();
  }

  return "User";
}

const NAV_ITEMS = [
  { name: "Labs", href: "/labs" },
  { name: "DSA Visualization", href: "/dsa-visualization" },
  { name: "ML Track", href: "/labs/ai-machine-learning" },
  { name: "Curriculum", href: "/courses" },
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
  { title: "C Programming Lab", category: "Virtual Labs", url: "/labs/c-programming", desc: "Formatted I/O, Pointers, Memory Allocation (malloc/free) & Structures" },
  { title: "Python Programming Lab", category: "Virtual Labs", url: "/labs/python-programming", desc: "Dynamic typing, Loops, List Comprehensions, OOP & Exception Handling" },
  { title: "Operating Systems Lab", category: "Virtual Labs", url: "/labs/operating-systems", desc: "CPU Scheduling (FCFS/SJF), POSIX Semaphores & Banker's Algorithm" },
  { title: "Artificial Intelligence Lab", category: "Virtual Labs", url: "/labs/artificial-intelligence", desc: "A* 8-Puzzle Search, Minimax Alpha-Beta Pruning & N-Queens" },
  { title: "Big Data Analytics Lab", category: "Virtual Labs", url: "/labs/big-data-analytics", desc: "Hadoop HDFS cluster, Distributed MapReduce & PySpark DataFrames" },
  { title: "Cloud Service Management Lab", category: "Virtual Labs", url: "/labs/cloud-service-management", desc: "AWS EC2/S3, Docker Compose, AWS Lambda & Kubernetes" },
  { title: "CPU Scheduling (FCFS & SJF)", category: "Operating Systems", url: "/experiments/cpu-scheduling-fcfs-sjf", desc: "Gantt charts, Waiting & Turnaround times in C" },
  { title: "Producer-Consumer Semaphores", category: "Operating Systems", url: "/experiments/producer-consumer-semaphores", desc: "POSIX mutex locks and counting semaphores" },
  { title: "A* Search & 8-Puzzle Solver", category: "Artificial Intelligence", url: "/experiments/astar-search-8puzzle", desc: "Manhattan distance heuristic state-space search" },
  { title: "Hadoop HDFS & Block Management", category: "Big Data", url: "/experiments/hadoop-hdfs-cluster-management", desc: "Distributed block replication and shell commands" },
  { title: "AWS EC2 & Custom VPC", category: "Cloud Computing", url: "/experiments/aws-ec2-vpc-infrastructure", desc: "Virtual compute provisioning and security firewalls" },
  { title: "12-Module NumPy Master Track", category: "ML Prerequisites", url: "/labs/ai-machine-learning", desc: "Array creation, slicing, broadcasting & linear algebra" },
  { title: "Master Coding Practice Sheets", category: "Practice", url: "/dsa-visualization?tab=sheets", desc: "LeetCode 150, LeetCode 75, SQL 50 with company tags & notes" },
  { title: "DSA Visualization Platform", category: "Simulators", url: "/dsa-visualization", desc: "12 Core Modules Interactive Learning & Visualizer" },
  { title: "DSA Visualizer Studio", category: "Simulators", url: "/visualizer", desc: "Interactive sandbox for 11+ algorithms and trees" },
  { title: "Student Progress & Certificate", category: "Dashboard", url: "/dashboard", desc: "Track completed labs and download verified certificate" },
  { title: "Student Login & Registration", category: "Auth", url: "/auth/login", desc: "Sign in with Email or Continue with Google" },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, studentProfile } = useAuth();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const lastScrollYRef = React.useRef(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 15);

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 40) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollYRef.current) {
        setScrollDirection("up");
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : false;

  const isItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/labs/ai-machine-learning") {
      return pathname === "/labs/ai-machine-learning" || pathname.startsWith("/labs/ai-machine-learning");
    }
    if (href === "/labs") {
      return (
        (pathname === "/labs" || (pathname.startsWith("/labs") && !pathname.startsWith("/labs/ai-machine-learning"))) ||
        pathname.startsWith("/experiments")
      );
    }
    return pathname === href || pathname.startsWith(href);
  };

  // Keyboard shortcut Ctrl+K to open search
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

  const filteredSearch = SEARCH_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <motion.header
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="fixed top-3.5 inset-x-0 z-50 flex justify-center w-full px-3 sm:px-6 pointer-events-none"
      >
        <div className="w-full flex items-center justify-center pointer-events-auto">
          {/* ========================================================================= */}
          {/* FASTLANE MORPHING FLOATING CAPSULE                                        */}
          {/* Top: Full width with Left & Right sides spread out                       */}
          {/* Scroll: Left & Right titles glide together into centered frosted pill    */}
          {/* ========================================================================= */}
          <motion.nav
            layout
            onMouseLeave={() => setHoveredHref(null)}
            transition={{
              layout: {
                type: "spring",
                stiffness: 240,
                damping: 26,
                mass: 0.75,
              },
            }}
            className={`hidden md:flex items-center transition-all duration-500 ease-out select-none border ${
              isScrolled
                ? "w-fit max-w-[820px] px-3 py-1.5 rounded-full border-border/80 dark:border-neutral-800/80 bg-background/85 dark:bg-neutral-950/85 backdrop-blur-2xl shadow-[0_16px_45px_rgba(0,0,0,0.2)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.6)] ring-1 ring-border/20 justify-center gap-3"
                : "w-full max-w-6xl px-6 py-2.5 rounded-full border-border/40 dark:border-neutral-800/60 bg-background/45 dark:bg-neutral-950/45 backdrop-blur-xl shadow-sm justify-between"
            }`}
            style={{
              backdropFilter: isScrolled ? "blur(24px) saturate(190%)" : "blur(12px) saturate(150%)",
              WebkitBackdropFilter: isScrolled ? "blur(24px) saturate(190%)" : "blur(12px) saturate(150%)",
            }}
          >
            {/* Left Side: Virtual Lab Title & Logo */}
            <motion.div layout transition={{ type: "spring", stiffness: 240, damping: 26 }} className="flex items-center shrink-0">
              <Link
                href="/"
                onMouseEnter={() => setHoveredHref("/")}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 z-10 select-none tracking-wide ${
                  isItemActive("/") || hoveredHref === "/"
                    ? "text-white font-bold"
                    : isScrolled
                    ? "text-muted-foreground hover:text-foreground font-semibold"
                    : "text-foreground hover:text-foreground font-bold"
                }`}
              >
                {(isItemActive("/") || hoveredHref === "/") && (
                  <motion.div
                    layoutId="fastlane-navbar-active-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff2a5f] via-[#e11d48] to-[#dc2626] shadow-[0_2px_14px_rgba(225,29,72,0.45)] -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 30,
                    }}
                  />
                )}
                <span>Virtual Lab</span>
              </Link>
            </motion.div>

            {/* Right Side: Navigation Links + Action Buttons */}
            <motion.div layout transition={{ type: "spring", stiffness: 240, damping: 26 }} className="flex items-center gap-1.5 shrink-0">
              {/* Navigation Links */}
              <div className="flex items-center gap-1">
                {NAV_ITEMS.map((item) => {
                  const active = isItemActive(item.href);
                  const isHovered = hoveredHref === item.href;
                  const isHighlighted = hoveredHref ? isHovered : active;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onMouseEnter={() => setHoveredHref(item.href)}
                      className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 z-10 select-none tracking-wide ${
                        isHighlighted
                          ? "text-white font-bold"
                          : "text-muted-foreground hover:text-foreground font-medium"
                      }`}
                    >
                      {isHighlighted && (
                        <motion.div
                          layoutId="fastlane-navbar-active-pill"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff2a5f] via-[#e11d48] to-[#dc2626] shadow-[0_2px_14px_rgba(225,29,72,0.45)] -z-10"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 30,
                          }}
                        />
                      )}
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Subtle Divider */}
              <div className="h-4 w-[1px] bg-border/60 mx-1" />

              {/* Integrated Action Buttons: Search + Student Auth + Theme Toggle */}
              <div className="flex items-center gap-1.5 pl-0.5 pr-1">
                {/* Search Button */}
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer"
                  title="Search labs & algorithms (Ctrl+K)"
                >
                  <Search className="h-3.5 w-3.5" />
                </button>

                {/* Student Auth / Profile Badge */}
                {mounted && (studentProfile || user) ? (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setAuthOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/70 hover:border-primary bg-muted/40 hover:bg-muted text-xs font-semibold text-foreground transition-all cursor-pointer shadow-xs"
                      title="Click to view account profile or sign out"
                      suppressHydrationWarning
                    >
                      <div className="w-4 h-4 rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center text-[9px] shrink-0">
                        {(getUsername(studentProfile, user) || "U")[0].toUpperCase()}
                      </div>
                      <span className="font-bold max-w-[95px] truncate text-xs">
                        {getUsername(studentProfile, user)}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    </button>

                    <Link
                      href="/dashboard"
                      className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 transition-all cursor-pointer"
                      title="Go to Student Dashboard"
                    >
                      <span>Dashboard</span>
                      <ArrowRight className="h-2.5 w-2.5" />
                    </Link>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#e11d48] to-[#dc2626] hover:from-[#f43f5e] hover:to-[#e11d48] text-white shadow-xs shadow-red-500/25 transition-all cursor-pointer hover:scale-105"
                    title="Sign in with Google"
                    suppressHydrationWarning
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    <span>Sign In</span>
                  </Link>
                )}

                {/* Theme Toggle */}
                <ModeToggle />
              </div>
            </motion.div>
          </motion.nav>

          {/* ======================================================== */}
          {/* MOBILE FLOATING CAPSULE                                  */}
          {/* ======================================================== */}
          <div className="md:hidden flex items-center justify-between w-full max-w-md px-3.5 py-2 rounded-full border border-border/80 bg-background/95 dark:bg-neutral-950/95 backdrop-blur-2xl shadow-lg ring-1 ring-border/20">
            <Link href="/" className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#ff2a5f] to-[#dc2626] flex items-center justify-center text-white shrink-0">
                <FlaskConical className="h-3 w-3" />
              </div>
              <span className="font-extrabold text-xs tracking-tight font-heading text-foreground">
                Virtual<span className="text-primary font-black">Labs</span>
              </span>
            </Link>

            <div className="flex items-center gap-1.5">
              {/* Mobile Student Auth */}
              {mounted && (studentProfile || user) ? (
                <button
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-border/70 bg-muted/40 text-xs font-semibold text-foreground shadow-xs"
                  suppressHydrationWarning
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="font-bold max-w-[75px] truncate text-[11px]">
                    {getUsername(studentProfile, user)}
                  </span>
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#e11d48] to-[#dc2626] text-white shadow-xs"
                  suppressHydrationWarning
                >
                  <LogIn className="h-3 w-3" />
                  <span>Sign In</span>
                </Link>
              )}

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                title="Search (Ctrl+K)"
              >
                <Search className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Smooth Spring */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="md:hidden absolute top-16 inset-x-4 max-w-md mx-auto p-3 rounded-2xl shadow-2xl space-y-1.5 pointer-events-auto border border-border/80 bg-background/95 dark:bg-neutral-950/95 backdrop-blur-2xl ring-1 ring-border/20"
          >
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-gradient-to-r from-[#ff2a5f] via-[#e11d48] to-[#dc2626] text-white shadow-md shadow-red-500/25 font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-border/50 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthOpen(true);
                }}
                className="flex-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-primary/10 text-primary border border-primary/20 text-center cursor-pointer flex items-center justify-center gap-1.5"
                suppressHydrationWarning
              >
                <UserIcon className="h-3.5 w-3.5" />
                <span>{mounted && (studentProfile || user) ? getUsername(studentProfile, user) : "Student Account"}</span>
              </button>

              <ModeToggle />
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Student Auth Dialog Modal */}
      <StudentAuthDialog open={authOpen} onOpenChange={setAuthOpen} />

      {/* Global Interactive Search Modal Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden bg-white dark:bg-card/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl">
          <DialogHeader className="p-4 pb-0">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-muted/50 border border-border/60">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type an algorithm, data structure, or lab keyword (e.g. Bubble, Stack, NumPy, LeetCode)..."
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
                    <span className="text-xs font-bold text-foreground group-hover:text-[#e11d48] transition-colors">
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
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-[#e11d48] group-hover:translate-x-1 transition-all mt-1 shrink-0" />
              </div>
            ))}

            {filteredSearch.length === 0 && (
              <div className="p-6 text-center text-xs text-muted-foreground">
                No matching experiments or modules found for &ldquo;{searchQuery}&rdquo;.
              </div>
            )}
          </div>

          <div className="p-3 bg-muted/40 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
            <span>Press ESC or click outside to close</span>
            <span>Shortcut: Ctrl + K</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}