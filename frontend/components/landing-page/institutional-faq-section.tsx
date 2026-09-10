"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export function InstitutionalFaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Can our college upload our own faculty's video lectures and observation sheets?",
      a: "Yes! While the platform comes pre-seeded with comprehensive bilingual (Tamil & English) video masterclasses, your department administrators can upload your faculty's YouTube lectures, lab observation PDFs, and model question banks via the Admin Portal."
    },
    {
      q: "How does student authentication work for our college?",
      a: "We provide your college administrator with a dedicated student credential pool (institutional email and secure password). When students log in, they complete a 1-time 5-field academic verification (Register Number, Academic Year, Department, and Section) which maps them directly to their personal lab dashboard."
    },
    {
      q: "Is our student data, progress, and quiz history private from other institutions?",
      a: "100% Yes. The platform enforces strict tenant-level isolation via Supabase PostgreSQL and Spring Security. Your students' quiz scores, code submissions, and attendance logs are partitioned by your unique institutional tenant key. No other college or external user can view or query your records."
    },
    {
      q: "Can we get our own custom college subdomain?",
      a: "Yes. In our Enterprise Campus and University plans, your college receives a dedicated subdomain such as psg.vlab.cloud, or we can map your institution's custom domain (e.g. vlab.yourcollege.ac.in) with your emblem and colors."
    },
    {
      q: "How quickly can our institution's virtual lab clone go live?",
      a: "Following a demo booking and requirement confirmation, your dedicated college clone is provisioned and deployed within 24 hours with pre-configured laboratory syllabi."
    },
    {
      q: "How does this platform help with NAAC and NBA accreditation inspections?",
      a: "The platform generates digital evidence logs for NAAC Criterion 1 & 2 and NBA Criteria 2, 4 & 5. Continuous Internal Evaluation (CIE) data, student attempt timestamps, quiz score distributions, and observation completions can be exported to Excel with a single click for peer review committees."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-background border-b border-border/60 relative">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="text-xs uppercase font-mono px-3 py-1 bg-rose-500/10 text-rose-500 border-rose-500/25">
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground tracking-tight">
            Common Inquiries from Engineering College Leadership
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Everything Deans, Principals, and HODs need to know about provisioning their institution&apos;s virtual lab clone.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xs overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-muted/30 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-foreground font-heading flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 text-rose-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 mt-1 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
