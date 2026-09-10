"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  FileSpreadsheet,
  CheckCircle2,
  TrendingUp,
  GraduationCap,
  ShieldCheck,
  BarChart3,
  Clock
} from "lucide-react";

export function AccreditationAndRoi() {
  const criteria = [
    {
      body: "NAAC",
      code: "Criterion 1 & 2",
      title: "Curricular Aspects & Teaching-Learning",
      desc: "Demonstrates ICT-enabled innovative pedagogy, simulation experiments, self-paced student learning, and continuous evaluation records."
    },
    {
      body: "NBA",
      code: "Criteria 2, 4 & 5",
      title: "Program Curriculum & Student Performance",
      desc: "Direct Course Outcome (CO) and Program Outcome (PO) mapping with quantitative student quiz attainment and lab assessment records."
    },
    {
      body: "CIE Automation",
      code: "Continuous Internal Evaluation",
      title: "Zero-Effort Faculty Grading",
      desc: "Automated simulation checkmarks, rubric scoring, and viva voce quiz tracking eliminate manual register entries and faculty fatigue."
    },
    {
      body: "Audit Ready",
      code: "1-Click Inspection Export",
      title: "NAAC/NBA Committee Reports",
      desc: "Export section-wise attendance, experiment completion rates, and timestamped quiz scores directly to standard Excel/CSV formats."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-background border-b border-border/60 relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="text-xs uppercase font-mono px-3 py-1 bg-amber-500/10 text-amber-500 border-amber-500/25">
            Accreditation &amp; Academic ROI
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground tracking-tight">
            Built for NAAC 'A++' &amp; NBA Tier-I Accreditation Audits
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Eliminate frantic audit preparations. Every simulation pass, quiz attempt, and observation upload is logged with verifiable digital telemetry.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {criteria.map((c) => (
            <Card
              key={c.code}
              className="border border-border/80 bg-card/70 backdrop-blur-xs rounded-2xl shadow-xs hover:border-amber-500/40 hover:shadow-lg transition-all p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    {c.body}
                  </Badge>
                  <span className="text-[11px] font-mono text-muted-foreground">{c.code}</span>
                </div>

                <h3 className="font-bold text-sm sm:text-base font-heading text-foreground leading-snug">
                  {c.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-border/50 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Inspection Verified</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
