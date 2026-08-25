"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import {
  UserTeamMember,
  getUserTeamMembers,
  addUserTeamMember,
  deleteUserTeamMember
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
  Users,
  UserPlus,
  Trash2,
  GraduationCap,
  ShieldCheck,
  Loader2,
  UserCheck
} from "lucide-react";

export function UserTeamSection() {
  const { user } = useAuth();
  const uid = user?.uid || "guest_student";

  const [members, setMembers] = useState<UserTeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal State
  const [newMemberOpen, setNewMemberOpen] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("Lab Partner (Batch A)");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadMembers() {
      setLoading(true);
      try {
        const list = await getUserTeamMembers(uid);
        if (mounted) setMembers(list);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadMembers();
    return () => { mounted = false; };
  }, [uid]);

  const handleCreateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) return;
    setSubmitting(true);
    try {
      const created = await addUserTeamMember(uid, memberName.trim(), memberRole.trim());
      setMembers((prev) => [...prev, created]);
      setMemberName("");
      setNewMemberOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    await deleteUserTeamMember(uid, id);
  };

  return (
    <Card className="rounded-2xl border border-secondary/40 bg-card/70 backdrop-blur-md shadow-xs overflow-hidden">
      <CardHeader className="p-5 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
              Collaboration &amp; Batch
            </Badge>
          </div>
          <CardTitle className="text-lg font-bold font-heading text-foreground mt-1 flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-500" />
            <span>Lab Partners &amp; Team Members</span>
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Collaborate on algorithm implementations, peer reviews, and faculty mentor assignments.
          </CardDescription>
        </div>

        <Button
          size="sm"
          onClick={() => setNewMemberOpen(true)}
          className="text-xs font-bold gap-1.5 h-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
        >
          <UserPlus className="h-3.5 w-3.5" />
          <span>Add Member</span>
        </Button>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
            <p className="text-xs text-muted-foreground font-mono">Syncing team members with Firestore...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="py-10 border border-dashed border-border/80 rounded-xl text-center space-y-2 bg-muted/20">
            <UserCheck className="h-8 w-8 text-muted-foreground/60 mx-auto" />
            <p className="text-xs font-semibold text-foreground">No team members added yet</p>
            <p className="text-[11px] text-muted-foreground max-w-xs mx-auto">
              Click &ldquo;Add Member&rdquo; to add your lab partners, project teammates, or faculty guides.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="p-3.5 rounded-xl border border-border/70 bg-card hover:border-emerald-500/50 transition-all shadow-xs flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 font-bold text-xs font-mono shrink-0">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <h4 className="text-xs font-bold text-foreground truncate font-sans group-hover:text-emerald-500 transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-[11px] text-muted-foreground truncate font-mono">
                      {member.role || "Lab Partner"}
                    </p>
                  </div>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 rounded-lg opacity-70 group-hover:opacity-100 transition-opacity shrink-0"
                  onClick={() => handleDeleteMember(member.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* In-App Modal: Add Member */}
      <Dialog open={newMemberOpen} onOpenChange={setNewMemberOpen}>
        <DialogContent className="max-w-md p-5 bg-card/95 backdrop-blur-xl border border-border rounded-2xl">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-base font-bold font-heading text-foreground">
              Add Lab Partner or Team Member
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Assign students or mentors to your collaborative lab assignments.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateMember} className="space-y-3 pt-2">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Student / Mentor Name</Label>
              <Input
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="e.g. Praveen S"
                className="text-xs"
                required
                autoFocus
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Role / Assignment</Label>
              <select
                value={memberRole}
                onChange={(e) => setMemberRole(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="Lab Partner (Batch A)">Lab Partner (Batch A)</option>
                <option value="Lab Partner (Batch B)">Lab Partner (Batch B)</option>
                <option value="Project Lead">Project Lead</option>
                <option value="Faculty Mentor / Guide">Faculty Mentor / Guide</option>
                <option value="Peer Reviewer">Peer Reviewer</option>
              </select>
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setNewMemberOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={submitting || !memberName.trim()}
                className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                {submitting ? "Adding..." : "Add Member"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
