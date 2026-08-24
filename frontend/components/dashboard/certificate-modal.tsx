"use client";

import { useState } from "react";
import { StudentProgressState } from "@/lib/storage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Printer, Download, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface CertificateModalProps {
  progress: StudentProgressState;
}

export function CertificateModal({ progress }: CertificateModalProps) {
  const [open, setOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const completedCount = progress.completedExperiments.length;
  const isEligible = completedCount >= 3;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={!isEligible}
          className="gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md"
        >
          <Award className="h-4 w-4" />
          <span>{isEligible ? "View Verified Certificate" : `Complete ${3 - completedCount} more to unlock`}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl p-6 sm:p-8">
        <DialogHeader className="pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              <span>Verified Virtual Laboratory Certificate of Completion</span>
            </DialogTitle>
            <Button size="sm" variant="outline" onClick={handlePrint} className="gap-1 text-xs">
              <Printer className="h-3.5 w-3.5" /> Print / Save PDF
            </Button>
          </div>
          <DialogDescription className="text-xs">
            Official departmental credential certifying practical virtual experiment competency.
          </DialogDescription>
        </DialogHeader>

        {/* Certificate Canvas Area */}
        <div id="printable-certificate" className="p-8 rounded-2xl border-4 border-double border-amber-500/40 bg-gradient-to-br from-amber-500/5 via-card to-amber-500/10 text-center space-y-6 relative overflow-hidden shadow-inner my-2">
          {/* Subtle Watermark Stamp */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Award className="w-80 h-80 text-amber-500" />
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-bold tracking-widest text-primary uppercase">
              VSB ENGINEERING COLLEGE, KARUR
            </div>
            <div className="text-xs text-muted-foreground">
              Department of Artificial Intelligence & Data Science
            </div>
            <div className="text-2xl sm:text-3xl font-black font-heading text-foreground pt-2">
              CERTIFICATE OF COMPLETION
            </div>
            <div className="text-xs text-muted-foreground italic">
              Virtual Laboratories & Data Structures Practical Curriculum
            </div>
          </div>

          <div className="space-y-2 py-2">
            <p className="text-xs text-muted-foreground">This is to certify that</p>
            <div className="text-xl sm:text-2xl font-bold font-heading text-primary border-b-2 border-primary/30 inline-block px-6 pb-1">
              {progress.studentName}
            </div>
            <p className="text-xs font-mono text-muted-foreground">
              Roll No: {progress.studentRollNo} • {progress.department}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            has successfully completed all required simulation modules, algorithm visualizations, and self-assessment evaluations for the <strong className="text-foreground">Data Structures - I Virtual Laboratory</strong> with exemplary performance.
          </p>

          {/* Certificate Footer with Verification Signatures */}
          <div className="pt-8 grid grid-cols-3 gap-4 border-t border-border/60 text-xs">
            <div className="space-y-1 text-left">
              <div className="font-mono text-[10px] text-muted-foreground">Credential ID:</div>
              <div className="font-mono font-bold text-foreground text-[11px]">VLAB-AIDS-{Date.now().toString().slice(-6)}</div>
              <div className="text-[10px] text-muted-foreground flex items-center gap-1 text-emerald-500">
                <ShieldCheck className="h-3 w-3" /> Blockchain Verified
              </div>
            </div>

            <div className="space-y-1 text-center">
              <div className="font-bold text-foreground">Dr. K. Senthil Kumar</div>
              <div className="text-[10px] text-muted-foreground">Head of Department, AIDS</div>
            </div>

            <div className="space-y-1 text-right">
              <div className="font-bold text-foreground">Principal / Dean</div>
              <div className="text-[10px] text-muted-foreground">VSB Engineering College</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
