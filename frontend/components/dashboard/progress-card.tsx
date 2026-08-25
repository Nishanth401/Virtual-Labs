"use client";

import { useAuth } from "@/context/auth-context";
import { StudentProgressState } from "@/lib/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle2, FileQuestion, Flame } from "lucide-react";
import { CertificateModal } from "@/components/dashboard/certificate-modal";

interface ProgressCardProps {
  progress: StudentProgressState;
  totalExperiments: number;
}

export function ProgressCard({ progress, totalExperiments = 6 }: ProgressCardProps) {
  const { user, studentProfile } = useAuth();

  // Dynamically resolve student name & roll number from the authenticated user
  const studentName =
    studentProfile?.name ||
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : progress.studentName);

  const studentRollNo =
    studentProfile?.registerNumber ||
    (user?.email ? user.email.split("@")[0].toUpperCase() : progress.studentRollNo);

  const department =
    studentProfile?.department ||
    progress.department ||
    "Department of Artificial Intelligence & Data Science";

  const completedCount = progress.completedExperiments.length;
  const percentage = Math.round((completedCount / totalExperiments) * 100);

  const attemptsArray = Object.values(progress.quizAttempts);
  const totalScoreAchieved = attemptsArray.reduce((acc, curr) => acc + curr.score, 0);
  const totalPossibleScore = attemptsArray.reduce((acc, curr) => acc + curr.totalQuestions, 0);
  const averagePercentage = totalPossibleScore > 0 ? Math.round((totalScoreAchieved / totalPossibleScore) * 100) : 0;

  return (
    <Card className="border-secondary/40 bg-card/60 backdrop-blur-xs shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                Department Learner Profile
              </Badge>
              <Badge variant="secondary" className="text-xs font-mono font-bold">
                {studentRollNo}
              </Badge>
            </div>
            <CardTitle className="text-xl font-bold font-heading text-foreground">
              {studentName}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">{department}</p>
          </div>

          <CertificateModal
            progress={progress}
            studentName={studentName}
            studentRollNo={studentRollNo}
            department={department}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span>Overall Curriculum Mastery</span>
            <span className="text-primary font-bold font-mono">{percentage}% ({completedCount}/{totalExperiments} Experiments)</span>
          </div>
          <div className="h-3 w-full bg-muted/60 rounded-full overflow-hidden p-0.5 border border-border/50">
            <div
              className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* 4 Key Stat Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3.5 rounded-xl bg-muted/30 border border-border/50 space-y-1">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto" />
            <div className="text-lg font-bold font-mono text-foreground">{completedCount}</div>
            <div className="text-[11px] text-muted-foreground">Completed Labs</div>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/30 border border-border/50 space-y-1">
            <FileQuestion className="h-5 w-5 text-primary mx-auto" />
            <div className="text-lg font-bold font-mono text-foreground">{attemptsArray.length}</div>
            <div className="text-[11px] text-muted-foreground">Quizzes Attempted</div>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/30 border border-border/50 space-y-1">
            <Flame className="h-5 w-5 text-amber-500 mx-auto" />
            <div className="text-lg font-bold font-mono text-foreground">{averagePercentage}%</div>
            <div className="text-[11px] text-muted-foreground">Quiz Accuracy Avg</div>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/30 border border-border/50 space-y-1">
            <Award className="h-5 w-5 text-amber-500 mx-auto" />
            <div className="text-lg font-bold font-mono text-foreground">
              {completedCount >= 3 ? "Unlocked" : "In Progress"}
            </div>
            <div className="text-[11px] text-muted-foreground">Certification Status</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
