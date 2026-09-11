"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Building, Award, Shield, ArrowRight, PhoneCall, CheckCircle2 } from "lucide-react";

export function SaasPricingSection() {
  return (
    <section className="py-20 bg-muted/20 border-b border-border/60 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="text-xs uppercase font-mono px-3 py-1 bg-primary/10 text-primary border-primary/25">
            Institutional Licensing & Monetization
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground tracking-tight">
            Transparent Pricing for Engineering Institutions
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Equip your campus with state-of-the-art virtual lab infrastructure. 
            All plans include continuous NAAC / NBA audit reports, custom lab manual hosting, and continuous evaluation engines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan 1: Department Pro */}
          <Card className="border border-border/80 bg-card/80 backdrop-blur-xl relative flex flex-col rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="p-6 pb-4">
              <Badge variant="secondary" className="w-fit mb-2 text-[10px] font-mono uppercase">
                Single Department
              </Badge>
              <CardTitle className="text-xl font-bold font-heading text-foreground">
                Department Starter
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Ideal for individual departments (e.g. AI&DS or CSE) launching virtual labs.
              </CardDescription>
              <div className="pt-4 flex items-baseline gap-1">
                <span className="text-3xl font-black font-heading text-foreground">₹24,999</span>
                <span className="text-xs text-muted-foreground">/ year / department</span>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-2 flex-1 flex flex-col justify-between space-y-6">
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2 text-foreground font-medium">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Up to 500 Student Accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Dedicated College URL (e.g. <code>/c/your-college</code>)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Custom Lab Manual & Observation Uploads</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Data Structures & ML Lab Tracks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Department Admin Access Control</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full rounded-xl text-xs font-semibold" asChild>
                <Link href="/c/demo">
                  <span>Explore Sandbox Demo</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Plan 2: Campus-Wide Pro (Recommended) */}
          <Card className="border-2 border-primary bg-card relative flex flex-col rounded-2xl shadow-xl shadow-primary/10 hover:shadow-2xl transition-all duration-300 -translate-y-1">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-red-600 text-white text-[11px] font-bold shadow-md uppercase tracking-wider">
              Most Popular • Campus Choice
            </div>

            <CardHeader className="p-6 pb-4 pt-8">
              <Badge className="w-fit mb-2 text-[10px] font-mono uppercase bg-primary/15 text-primary border-primary/20">
                All Departments Included
              </Badge>
              <CardTitle className="text-2xl font-bold font-heading text-foreground">
                Autonomous Campus Pro
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Full-scale institutional licensing for autonomous colleges with unlimited students.
              </CardDescription>
              <div className="pt-4 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black font-heading text-foreground">₹79,999</span>
                <span className="text-xs text-muted-foreground">/ year / whole campus</span>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-2 flex-1 flex flex-col justify-between space-y-6">
              <ul className="space-y-2.5 text-xs text-foreground/90">
                <li className="flex items-center gap-2 font-semibold text-primary">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Unlimited Student & Faculty Accounts</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Complete Multi-Tenant Data Isolation</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Full Admin CRUD: Materials, Manuals & Videos</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Continuous Internal Assessment (CIE) Excel Export</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>NBA / NAAC Criterion 2 & 4 Compliance Reports</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Priority 24/7 Dedicated Server Support</span>
                </li>
              </ul>

              <Button className="w-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-rose-600/20" asChild>
                <Link href="/admin">
                  <span>Contact for Campus Onboarding</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Plan 3: University Enterprise */}
          <Card className="border border-border/80 bg-card/80 backdrop-blur-xl relative flex flex-col rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="p-6 pb-4">
              <Badge variant="secondary" className="w-fit mb-2 text-[10px] font-mono uppercase">
                Multi-Campus / Group
              </Badge>
              <CardTitle className="text-xl font-bold font-heading text-foreground">
                University Enterprise
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Custom institutional federation, white-label domain mapping, and LMS integration.
              </CardDescription>
              <div className="pt-4 flex items-baseline gap-1">
                <span className="text-3xl font-black font-heading text-foreground">Custom</span>
                <span className="text-xs text-muted-foreground">/ institution group</span>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-2 flex-1 flex flex-col justify-between space-y-6">
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2 text-foreground font-medium">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Custom Subdomains (e.g. <code>vlab.vsb.ac.in</code>)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Campus ERP & SSO (Google / Microsoft 365)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Custom Simulator Engine Development</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Dedicated On-Premises or Private Cloud Hosting</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>SLA Guarantee & Dedicated Account Manager</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full rounded-xl text-xs font-semibold" asChild>
                <Link href="/admin">
                  <PhoneCall className="h-3.5 w-3.5 mr-1.5" />
                  <span>Schedule Executive Demo</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
