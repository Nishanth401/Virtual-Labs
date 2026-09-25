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
  { name: "Resources", href: "/resources" },
  { name: "Admin Portal", href: "/admin" },
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
      {/* ========================================================================= */}
      {/* AUTHENTIC MoE GOVERNMENT VIRTUAL LABS NAVBAR (Screenshot 112326)         */}
      {/* Top white banner + Official dark navy navigation bar                       */}
      {/* ========================================================================= */}
      <header className="fixed top-0 inset-x-0 z-50 w-full border-b border-border/80 shadow-xs">
        {/* Top White Strip: Logo + Search & Contact */}
        <div className="w-full bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
            {/* Left: Official Virtual Lab Logo */}
            <Link href="/" className="flex items-center gap-2 group select-none py-1">
              <img
                src="/virtual-lab-logo.png"
                alt="Virtual Lab"
                className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            {/* Right: Search Bar & Contact Links */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 text-xs text-slate-600 dark:text-zinc-400 hover:border-[#0284c7] transition-all cursor-pointer rounded-none"
              >
                <Search className="h-3.5 w-3.5 text-slate-500" />
                <span className="text-[11px] font-sans">Search labs, topics...</span>
                <span className="text-[10px] font-mono px-1 py-0.2 bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-none ml-2">
                  Ctrl+K
                </span>
              </button>

              <div className="hidden lg:flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-zinc-400 border-l border-slate-300 dark:border-zinc-700 pl-3">
                <Link href="/" className="hover:text-[#0284c7] transition-colors">HOME</Link>
                <span>|</span>
                <Link href="/colleges" className="hover:text-[#0284c7] transition-colors">PARTNERS</Link>
                <span>|</span>
                <Link href="/resources" className="hover:text-[#0284c7] transition-colors">CONTACT</Link>
              </div>

              <ModeToggle />
            </div>
          </div>
        </div>

        {/* Bottom Dark Navy Navigation Bar matching Screenshot 112326 */}
        <div className="w-full bg-[#002b49] text-white">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
            <nav
              onMouseLeave={() => setHoveredHref(null)}
              className="hidden md:flex items-center justify-between h-10 select-none text-xs"
            >
              {/* Left Side: Government Portal Links */}
              <div className="flex items-center gap-1">
                {[
                  { name: "HOME", href: "/" },
                  { name: "ABOUT US", href: "/#about" },
                  { name: "OUTREACH PORTAL", href: "/#outreach" },
                  { name: "PARTICIPATING INSTITUTES", href: "/#institutes" },
                  { name: "NMEICT", href: "https://www.nmeict.ac.in", external: true },
                  { name: "CONTACT US", href: "/#contact" },
                ].map((item) => {
                  const isCurActive = pathname === item.href;
                  return item.external ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-slate-200 hover:text-white hover:bg-white/10 transition-colors uppercase font-medium tracking-wide"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-2.5 py-1 transition-colors uppercase tracking-wide font-medium ${
                        isCurActive
                          ? "text-white font-bold bg-[#ea580c]"
                          : "text-slate-200 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* Right Side: Virtual Lab Features & Student Profile */}
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
                      className={`px-2.5 py-1 transition-colors tracking-wide select-none ${
                        isHighlighted
                          ? "text-white font-bold bg-[#0284c7]"
                          : "text-slate-300 hover:text-white hover:bg-white/10 font-medium"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {/* Student Profile Badge */}
                {mounted && activeStudentName ? (
                  <div className="flex items-center gap-1.5 pl-2">
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-white/10 border border-white/20 text-xs font-bold text-white shadow-2xs whitespace-nowrap">
                      <div className="w-3.5 h-3.5 bg-[#0284c7] text-white flex items-center justify-center text-[9px] font-bold">
                        {activeStudentName[0]?.toUpperCase() || "S"}
                      </div>
                      <span className="font-semibold max-w-[80px] truncate text-[11px]">
                        {activeStudentName}
                      </span>
                    </div>

                    <Link
                      href="/dashboard"
                      className="hidden xl:flex items-center gap-1 px-2 py-0.5 text-xs font-bold bg-[#ea580c] hover:bg-[#c2410c] text-white transition-all whitespace-nowrap"
                    >
                      <span>Dashboard</span>
                    </Link>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-xs transition-all whitespace-nowrap ml-1"
                  >
                    <LogIn className="h-3 w-3" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </nav>

            {/* Mobile View */}
            <div className="md:hidden w-full h-10 flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-slate-200 uppercase">
                Department Virtual Labs
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="p-1 text-slate-200 hover:text-white"
                >
                  <Search className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1 text-slate-200 hover:text-white"
                >
                  {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-14 inset-x-0 z-50 p-4 border-b border-border bg-background/98 backdrop-blur-2xl shadow-xl space-y-1 rounded-none">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-none text-xs font-semibold text-foreground hover:bg-muted"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-none text-xs font-semibold text-foreground hover:bg-muted"
          >
            Student Dashboard
          </Link>
        </div>
      )}

      {/* Global Search Dialog Modal */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden bg-background border border-border shadow-2xl rounded-none">
          <DialogHeader className="p-4 pb-0">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-none bg-muted/50 border border-border/60">
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
                className="p-2.5 rounded-none hover:bg-muted/60 transition-colors cursor-pointer flex items-start justify-between gap-3 group"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground group-hover:text-rose-600 transition-colors">
                      {item.title}
                    </span>
                    <Badge variant="outline" className="text-[10px] font-sans font-medium">
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