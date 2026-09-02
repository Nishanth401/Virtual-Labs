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
  MessageSquare
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
  { name: "Home", href: "/" },
  { name: "Labs", href: "/labs" },
  { name: "DG Visualization", href: "/dg-visualization" },
  { name: "DSA Sheets", href: "/practice" },
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
  { title: "DG Visualization Platform", category: "Simulators", url: "/dg-visualization", desc: "12 Core Modules Interactive Learning & Visualizer" },
  { title: "Student Progress & Certificate", category: "Dashboard", url: "/dashboard", desc: "Track completed labs and download verified certificate" },
  { title: "Student Login & Registration", category: "Auth", url: "/auth/login", desc: "Sign in with Email or Continue with Google" },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, studentProfile } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <header className="sticky top-3 z-50 w-full px-4 sm:px-6 pointer-events-none">
        <div className="container max-w-7xl mx-auto flex items-center justify-between gap-3 pointer-events-auto relative">
          <div />

          {/* Center Floating Dark Capsule Navbar - Mathematically & Visually Centered */}
          <nav
            onMouseLeave={() => setHoveredHref(null)}
            className="hidden md:flex items-center gap-1 bg-[#121214] text-white rounded-full p-1.5 shadow-2xl border border-white/10 backdrop-blur-md absolute left-1/2 -translate-x-1/2 z-20"
          >
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item.href);
              const isHovered = hoveredHref === item.href;
              const isHighlighted = hoveredHref ? isHovered : active;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredHref(item.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 z-10 select-none ${
                    isHighlighted
                      ? "text-white font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {isHighlighted && (
                    <motion.div
                      layoutId="navbar-hover-indicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#e11d48] to-[#dc2626] shadow-md shadow-red-500/40 -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 35,
                      }}
                    />
                  )}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Circular Search Button & Mode Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Circular Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-full bg-[#121214] text-white flex items-center justify-center border border-white/10 hover:border-red-500/50 hover:scale-105 transition-all shadow-md cursor-pointer"
              title="Search labs & algorithms (Ctrl+K)"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Student Auth Avatar / Trigger Button */}
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="hidden sm:flex items-center px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-card/90 backdrop-blur-md border border-slate-200 dark:border-border shadow-xs text-xs font-medium text-slate-800 dark:text-slate-200 hover:border-primary transition-colors cursor-pointer"
              suppressHydrationWarning
            >
              {mounted && (studentProfile || user) ? (
                <span className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white max-w-[140px] truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0 inline-block" />
                  {getUsername(studentProfile, user)}
                </span>
              ) : (
                <span>Sign In</span>
              )}
            </button>

            <ModeToggle />

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-foreground"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-3 bg-[#121214] text-white rounded-2xl border border-white/10 shadow-2xl space-y-1.5 pointer-events-auto backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-gradient-to-r from-[#e11d48] to-[#dc2626] text-white shadow-md shadow-red-500/30 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthOpen(true);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#e11d48] to-[#dc2626] text-white text-center cursor-pointer shadow-md shadow-red-500/30 flex items-center justify-center gap-1.5"
                suppressHydrationWarning
              >
                <span>{mounted && (studentProfile || user) ? `Student: ${getUsername(studentProfile, user)}` : "Student Login & Register"}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </header>

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