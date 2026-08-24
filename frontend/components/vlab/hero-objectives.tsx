"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Sparkles, BookOpen, Compass, CheckCircle2, ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
};

export function HeroObjectives() {
  return (
    <section className="py-12 md:py-16 border-b border-border/40 relative overflow-hidden">
      {/* Background Subtle Animated Blobs */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-24 -right-24 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" 
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
      >
        {/* Main Banner Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold mb-4 shadow-xs">
            <FlaskConical className="h-3.5 w-3.5 text-yellow-400 animate-subtle-breath" />
            <span>Official Department Virtual Laboratory Platform</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground font-heading">
            Department of <span className="text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-xl border border-yellow-400/30 inline-block shadow-[0_0_15px_rgba(250,204,21,0.2)]">Artificial Intelligence & Data Science</span> Virtual Labs
          </motion.h1>
          
          <motion.p variants={itemVariants} className="mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
            An interactive, simulation-based digital laboratory curriculum aligned with the National Virtual Labs initiative. Practice data structure algorithms, run experiments, take assessments, and master core engineering concepts remotely.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2 font-semibold shadow-md group">
                <Link href="/labs" target="_blank" rel="noopener noreferrer">
                  Explore Virtual Labs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/visualizer" target="_blank" rel="noopener noreferrer">
                  <Sparkles className="h-4 w-4 text-primary" /> DSA Visualizers
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button asChild variant="secondary" size="lg" className="gap-2">
                <Link href="/dashboard" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="h-4 w-4" /> Student Portal
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* National Virtual Labs Inspired Tabs: OBJECTIVES & THE PHILOSOPHY */}
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto bg-card/60 backdrop-blur-md rounded-2xl border border-secondary/40 p-6 sm:p-8 shadow-sm">
          <Tabs defaultValue="objectives" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 max-w-md mx-auto">
              <TabsTrigger value="objectives" className="text-xs sm:text-sm font-bold uppercase tracking-wider transition-all">
                Objectives
              </TabsTrigger>
              <TabsTrigger value="philosophy" className="text-xs sm:text-sm font-bold uppercase tracking-wider transition-all">
                The Philosophy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="objectives" className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-xl font-bold text-foreground font-heading text-center mb-4">
                Core Objectives of the Virtual Laboratory
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <motion.div 
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-2 cursor-pointer shadow-xs hover:shadow-md hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>1. Remote Access</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    To provide 24/7 remote-access to simulation-based computing and data science laboratories for autonomous, self-paced student learning.
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-2 cursor-pointer shadow-xs hover:shadow-md hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>2. Inquiry Learning</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    To enthuse engineering students to conduct experiments by arousing curiosity through interactive step-by-step visualizers and algorithmic simulators.
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-2 cursor-pointer shadow-xs hover:shadow-md hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>3. Complete LMS Hub</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    To provide a full Learning Management System around Virtual Labs with procedures, code scripts, self-evaluation quizzes, and verified progress tracking.
                  </p>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="philosophy" className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-xl font-bold text-foreground font-heading text-center mb-4">
                The Educational Philosophy
              </h3>
              <p>
                Physical laboratory sessions are often constrained by fixed time slots, limited hardware setups, and lack of visual intuition for internal algorithmic states.
              </p>
              <p>
                Virtual Labs bridge this critical gap by transforming abstract computer science concepts—such as pointer manipulation, recursion call frames, array partitions, and memory allocation—into tangible visual experiments that students can interact with repeatedly at zero cost.
              </p>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </section>
  );
}
