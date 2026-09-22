"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourceItem } from "@/data/resources";
import { BookOpen, FlaskConical, CheckCircle2, Copy, Check, Printer, FileText, ChevronRight } from "lucide-react";

interface LabManualDialogProps {
  isOpen: boolean;
  onClose: () => void;
  resource: ResourceItem | null;
}

export function LabManualDialog({ isOpen, onClose, resource }: LabManualDialogProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeExp, setActiveExp] = useState(0);

  if (!resource) return null;

  // Sample experiments template for laboratory manual
  const experiments = [
    {
      id: 1,
      title: "Experiment 1: Implementation of Linear Data Structures (Stack & Queue)",
      aim: "To implement Stack (LIFO) and Queue (FIFO) operations using array and linked list representation.",
      apparatus: "GCC Compiler / OpenJDK 17 / VS Code IDE",
      algorithm: [
        "1. Define maximum capacity and initialize pointer top = -1 / front = rear = -1.",
        "2. For Push / Enqueue: Check overflow condition before incrementing pointer.",
        "3. For Pop / Dequeue: Check underflow condition before retrieving element and decrementing pointer.",
        "4. Display elements sequentially."
      ],
      sampleOutput: "Pushed: 10, 20, 30 | Popped: 30 | Queue Front: 10 | Status: SUCCESS",
      viva: "What happens when a stack overflow occurs in an embedded systems runtime?"
    },
    {
      id: 2,
      title: "Experiment 2: Binary Search Tree Insertion and Traversals",
      aim: "To construct a Binary Search Tree (BST) and perform In-order, Pre-order, and Post-order traversals.",
      apparatus: "Java Development Kit / C++17 Compiler",
      algorithm: [
        "1. Create Node structure with left pointer, right pointer, and key data.",
        "2. For insertion: Compare key with root. If key < root.val, recurse left; else recurse right.",
        "3. In-Order traversal: Left -> Root -> Right yields elements in sorted ascending order."
      ],
      sampleOutput: "In-Order Traversal: 10, 20, 30, 40, 50 (Sorted Sequence)",
      viva: "Why does In-Order traversal of a BST always produce ascending sorted order?"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 overflow-hidden !max-w-4xl !w-[95vw] !h-[88vh] bg-background/95 backdrop-blur-xl border-border rounded-3xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-border/80 bg-card/60 backdrop-blur-md flex flex-col gap-2 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-[11px] font-mono border-primary/30 text-primary bg-primary/5">
              <BookOpen className="h-3 w-3 mr-1" />
              Official Lab Manual
            </Badge>
            <Badge variant="secondary" className="text-[11px] font-mono">
              Anna University / Autonomous Syllabus
            </Badge>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-black text-foreground font-heading tracking-tight">
            {resource.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {resource.description}
          </DialogDescription>
        </div>

        {/* Body Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h4 className="text-sm font-bold text-primary">Department Academic Laboratory Guidelines</h4>
              <p className="text-xs text-muted-foreground">Follow standard observation format and record testcase logs.</p>
            </div>
            <Button size="sm" className="h-7 text-xs font-bold rounded-xl bg-primary text-white" asChild>
              <Link href="/labs">
                <FlaskConical className="h-3 w-3 mr-1" />
                <span>Launch Interactive Lab</span>
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-foreground font-heading">Syllabus Experiments</h3>
            {experiments.map((exp, idx) => (
              <Card key={exp.id} className="border border-border bg-card">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                    <span className="h-6 w-6 rounded-lg bg-primary/10 text-primary font-mono text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{exp.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-1 space-y-3 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-muted-foreground block text-[11px] uppercase tracking-wider">Aim:</span>
                    <p className="text-foreground/90 font-medium">{exp.aim}</p>
                  </div>

                  <div>
                    <span className="font-bold text-muted-foreground block text-[11px] uppercase tracking-wider">Algorithm:</span>
                    <div className="bg-muted/40 rounded-xl p-3 border border-border/60 space-y-1 font-mono text-xs">
                      {exp.algorithm.map((step, sIdx) => (
                        <div key={sIdx} className="text-foreground/90">{step}</div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                    <div className="p-2.5 bg-background rounded-lg border border-border">
                      <span className="text-[10px] text-muted-foreground block">Sample Output:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{exp.sampleOutput}</span>
                    </div>
                    <div className="p-2.5 bg-background rounded-lg border border-border">
                      <span className="text-[10px] text-muted-foreground block">Viva Question:</span>
                      <span className="text-foreground/90">{exp.viva}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-border/80 bg-card/60 flex items-center justify-between shrink-0">
          <Button size="sm" variant="outline" onClick={() => window.print()} className="h-8 text-xs font-bold rounded-xl gap-1.5">
            <Printer className="h-3.5 w-3.5" />
            <span>Print Manual</span>
          </Button>
          <Button size="sm" variant="secondary" onClick={onClose} className="h-8 text-xs font-bold rounded-xl">
            Close Manual
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
