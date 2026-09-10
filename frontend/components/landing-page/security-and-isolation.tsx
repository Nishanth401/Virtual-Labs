"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldCheck,
  Lock,
  Database,
  Globe2,
  Users,
  Server,
  FileKey2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export function SecurityAndIsolation() {
  const securityFeatures = [
    {
      icon: Database,
      title: "Isolated Database Tenancy",
      desc: "Every college operates under strict tenant-level separation. Tables for student profiles, completed experiments, quiz attempts, and observation files are scoped by institutional identifiers so no college can query another's data."
    },
    {
      icon: Globe2,
      title: "Subdomain & URL Sandboxing",
      desc: "Colleges can link their own custom subdomains (e.g., psg.vlab.cloud or lab.cit.edu.in) or use dedicated paths (/c/yourcollege) with customized institutional branding."
    },
    {
      icon: FileKey2,
      title: "Encrypted Credential Generation",
      desc: "Student accounts are generated with secure hashed passwords and institutional email validation. Colleges retain 100% ownership over their student rosters."
    },
    {
      icon: Users,
      title: "Granular Role-Based Access (RBAC)",
      desc: "Distinct operational levels for Students (simulations & assessments), Faculty Mentors (viva review & score monitoring), Department HODs (lab analytics), and Super Admins."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-muted/20 border-b border-border/60 relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <Badge variant="outline" className="text-xs uppercase font-mono px-3 py-1 bg-emerald-500/10 text-emerald-500 border-emerald-500/25">
              Enterprise Grade Security
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground tracking-tight leading-tight">
              Strict Multi-Tenant Isolation. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                Zero Cross-College Exposure.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              When an institution books a virtual lab clone, their data is completely segregated. A student or faculty member from PSG Tech can never view, query, or interfere with student records from CIT or VSB.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-foreground font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Supabase PostgreSQL Row-Level Security (RLS) policies</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-foreground font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Spring Security JWT dual-layer bearer verification</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-foreground font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>ISO 27001 &amp; AICTE Data Security Compliant Infrastructure</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Security Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {securityFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <Card
                  key={feat.title}
                  className="border border-border/80 bg-card/70 backdrop-blur-xs rounded-2xl shadow-xs hover:border-emerald-500/40 transition-all p-5 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground font-heading">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feat.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
