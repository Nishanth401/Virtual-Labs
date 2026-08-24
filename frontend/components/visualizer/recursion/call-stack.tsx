"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers } from "lucide-react";

export interface StackFrame {
  id: number;
  label: string;
  params?: Record<string, any>;
  isBaseCase?: boolean;
  returned?: boolean;
  returnValue?: any;
}

interface CallStackProps {
  stack: StackFrame[];
  currentNodeId?: number | null;
  executionPhase?: "calling" | "returning" | "idle";
}

export function CallStack({ stack, currentNodeId, executionPhase }: CallStackProps) {
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [stack]);

  return (
    <div className="flex h-full min-h-[300px] flex-col bg-card/80 backdrop-blur-md relative w-full overflow-hidden shadow-sm border border-border rounded-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2.5 px-4 font-bold text-sm tracking-wide flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4" />
          <span>JVM Call Stack (LIFO)</span>
        </div>
        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-mono">
          Depth: {stack.length}
        </span>
      </div>

      {/* Stack Frames (Bottom up, so top frame is displayed on top) */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col-reverse justify-start gap-2.5">
        <AnimatePresence mode="popLayout">
          {stack.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center gap-2 text-muted-foreground py-12"
            >
              <div className="h-10 w-10 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground">
                <Layers className="h-5 w-5 opacity-50" />
              </div>
              <p className="text-xs font-medium text-muted-foreground">Call Stack is Empty</p>
              <span className="text-[10px] text-muted-foreground/70">Click Run or Step Next to push activation frames</span>
            </motion.div>
          )}

          {stack.map((frame, index) => {
            const isTop = index === stack.length - 1;
            return (
              <motion.div
                key={frame.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                layout
                className={`w-full p-3 rounded-lg border font-mono text-xs shadow-xs transition-all ${
                  isTop
                    ? "bg-gradient-to-r from-blue-500/15 to-indigo-500/15 border-primary text-foreground font-semibold ring-1 ring-primary/40"
                    : "bg-muted/40 border-border/70 text-muted-foreground"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-primary uppercase font-bold tracking-wider">
                    Frame #{frame.id} {isTop && "(ACTIVE TOP)"}
                  </span>
                  {frame.returned && (
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.2 rounded font-bold">
                      Returned: {String(frame.returnValue)}
                    </span>
                  )}
                </div>
                <div className="text-sm font-bold text-foreground truncate">{frame.label}</div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <div ref={topRef} />
      </div>
    </div>
  );
}
