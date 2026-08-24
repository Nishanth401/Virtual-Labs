"use client";

import { useState } from "react";
import { useStudentProgress } from "@/hooks/use-student-progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Shield, GraduationCap, AlertCircle, Check } from "lucide-react";

export function RoleSwitcherDialog() {
  const { progress, updateRole } = useStudentProgress();
  const [open, setOpen] = useState(false);

  const roles = [
    {
      id: "STUDENT" as const,
      title: "Student View",
      desc: "Access experiment instructional content, interactive simulations, self-evaluation quizzes, and earn certificates.",
      icon: GraduationCap,
      badge: "Active Learner",
    },
    {
      id: "FACULTY" as const,
      title: "Faculty View (Simulation)",
      desc: "Simulate instructor features: experiment authoring, quiz review, syllabus mapping, and performance analytics.",
      icon: UserCheck,
      badge: "Instructor Mode",
    },
    {
      id: "ADMIN" as const,
      title: "Department Admin (Simulation)",
      desc: "Simulate administrator controls: lab catalogue management, audit logging, and institutional branding.",
      icon: Shield,
      badge: "Lab Administrator",
    },
  ];

  const handleSelectRole = (role: "STUDENT" | "FACULTY" | "ADMIN") => {
    updateRole(role);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
          <GraduationCap className="h-3.5 w-3.5 text-primary" />
          <span>Role: <strong className="text-primary font-bold">{progress.role}</strong></span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            <span>Switch Demonstration Role</span>
          </DialogTitle>
          <DialogDescription className="text-xs">
            Toggle between student, instructor, and administrative personas for review and evaluation.
          </DialogDescription>
        </DialogHeader>

        {/* Academic Disclaimer Alert */}
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs flex items-start gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Demonstration Prototype Note:</strong> This prototype uses client-side mock role switching for workflow presentation. Production deployment will replace this with Spring Security, JWT tokens, and institutional SSO.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {roles.map((r) => {
            const Icon = r.icon;
            const isCurrent = progress.role === r.id;

            return (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSelectRole(r.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                  isCurrent
                    ? "border-primary bg-primary/10 ring-1 ring-primary"
                    : "border-border/60 hover:bg-muted/40"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${isCurrent ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-foreground">{r.title}</span>
                      <Badge variant="outline" className="text-[10px]">
                        {r.badge}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                </div>

                {isCurrent && (
                  <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
