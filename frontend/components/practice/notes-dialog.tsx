"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, Check, BookOpen, Clock, Trash2 } from "lucide-react";
import { CodingProblem } from "@/data/coding-sheets";

interface NotesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  problem: CodingProblem | null;
  savedNote?: { note: string; timestamp: string };
  onSaveNote: (problemId: string, noteText: string) => void;
}

export function NotesDialog({
  isOpen,
  onClose,
  problem,
  savedNote,
  onSaveNote
}: NotesDialogProps) {
  const [noteText, setNoteText] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (savedNote) {
      setNoteText(savedNote.note);
    } else {
      setNoteText("");
    }
    setIsSaved(false);
  }, [savedNote, problem, isOpen]);

  if (!problem) return null;

  const handleSave = () => {
    onSaveNote(problem.id, noteText);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setNoteText("");
    onSaveNote(problem.id, "");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-card border-border/80 shadow-2xl rounded-2xl">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] font-mono uppercase bg-primary/10 text-primary border-primary/30">
              Personal Revision Notes
            </Badge>
            <Badge variant="secondary" className="text-[10px] font-mono">
              #{problem.problemNumber}
            </Badge>
            <Badge
              className={`text-[10px] font-bold ${
                problem.difficulty === "Easy"
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                  : problem.difficulty === "Medium"
                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                  : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
              }`}
            >
              {problem.difficulty}
            </Badge>
          </div>
          <DialogTitle className="text-xl font-bold font-heading text-foreground">
            {problem.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Save your intuitive approach, edge cases, Time Complexity O(N) notes, and key takeaways. Notes are synced to your account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>Your Revision Summary &amp; Optimal Strategy:</span>
              {savedNote?.timestamp && (
                <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last updated {new Date(savedNote.timestamp).toLocaleDateString()}
                </span>
              )}
            </label>
            <Textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Key idea: Use two-pointers from the end to avoid extra space. Watch out for negative numbers and zero division. Time: O(N), Space: O(1)..."
              rows={8}
              className="font-mono text-xs leading-relaxed bg-muted/30 border-border/80 focus-visible:ring-primary rounded-xl"
            />
          </div>

          {/* Quick tags reminder */}
          <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-[11px] space-y-1.5">
            <div className="text-muted-foreground font-semibold flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              <span>Target Companies:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {[...problem.productCompanies, ...problem.serviceCompanies].map((c, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-card border text-[10px] font-mono">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between items-center gap-2 pt-2 border-t border-border/60">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-xs text-muted-foreground hover:text-rose-500 gap-1"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </Button>

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onClose} className="text-xs">
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              className="bg-[#1e88e5] hover:bg-[#1976d2] text-white font-bold gap-1.5 text-xs shadow-md"
            >
              {isSaved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
              {isSaved ? "Saved!" : "Save Notes"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
