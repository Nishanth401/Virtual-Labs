"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import {
  UserNote,
  getUserNotes,
  addUserNote,
  deleteUserNote
} from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  StickyNote,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  Loader2,
  BookOpenCheck
} from "lucide-react";

export function UserNotesSection() {
  const { user } = useAuth();
  const uid = user?.uid || "guest_student";

  const [notes, setNotes] = useState<UserNote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal State
  const [newNoteOpen, setNewNoteOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadNotes() {
      setLoading(true);
      try {
        const list = await getUserNotes(uid);
        if (mounted) setNotes(list);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadNotes();
    return () => { mounted = false; };
  }, [uid]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;
    setSubmitting(true);
    try {
      const created = await addUserNote(uid, noteTitle.trim(), noteContent.trim());
      setNotes((prev) => [created, ...prev]);
      setNoteTitle("");
      setNoteContent("");
      setNewNoteOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    await deleteUserNote(uid, id);
  };

  return (
    <Card className="rounded-2xl border border-secondary/40 bg-card/70 backdrop-blur-md shadow-xs overflow-hidden">
      <CardHeader className="p-5 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
              Personal Study Log
            </Badge>
          </div>
          <CardTitle className="text-lg font-bold font-heading text-foreground mt-1 flex items-center gap-2">
            <StickyNote className="h-5 w-5 text-amber-500" />
            <span>My Lab &amp; Viva Notes</span>
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Save algorithm cheat sheets, key complexity derivations, and viva exam preparations.
          </CardDescription>
        </div>

        <Button
          size="sm"
          onClick={() => setNewNoteOpen(true)}
          className="text-xs font-bold gap-1.5 h-8 bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Note</span>
        </Button>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
            <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
            <p className="text-xs text-muted-foreground font-mono">Loading notes from Firestore...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="py-10 border border-dashed border-border/80 rounded-xl text-center space-y-2 bg-muted/20">
            <BookOpenCheck className="h-8 w-8 text-muted-foreground/60 mx-auto" />
            <p className="text-xs font-semibold text-foreground">No study notes yet</p>
            <p className="text-[11px] text-muted-foreground max-w-xs mx-auto">
              Click &ldquo;New Note&rdquo; to save important viva questions or code tips.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-4 rounded-xl border border-border/70 bg-card hover:border-amber-500/50 transition-all shadow-xs flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-foreground font-heading group-hover:text-amber-500 transition-colors">
                      {note.title}
                    </h4>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 rounded-md opacity-70 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  {note.content && (
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {note.content}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono pt-2 border-t border-border/40">
                  <Calendar className="h-3 w-3 text-muted-foreground/70" />
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* In-App Modal: New Note */}
      <Dialog open={newNoteOpen} onOpenChange={setNewNoteOpen}>
        <DialogContent className="max-w-md p-5 bg-card/95 backdrop-blur-xl border border-border rounded-2xl">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-base font-bold font-heading text-foreground">
              Create Study Note
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Record important algorithms, logic notes, or viva prep tips.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateNote} className="space-y-3 pt-2">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Note Title</Label>
              <Input
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="e.g. Bubble Sort vs Insertion Sort Comparisons"
                className="text-xs"
                required
                autoFocus
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Content / Key Takeaways</Label>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={4}
                placeholder="Write your study observations or viva prep notes..."
                className="w-full rounded-md border border-input bg-background p-2.5 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none font-sans"
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setNewNoteOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={submitting || !noteTitle.trim()}
                className="text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
              >
                {submitting ? "Saving..." : "Save Note"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
