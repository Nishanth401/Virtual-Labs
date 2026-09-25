"use client";

import React from "react";
import { Mail, Building2, UserCheck, Code } from "lucide-react";

export interface ContributorEntry {
  sNo: number;
  name: string;
  email: string;
  institute: string;
}

interface ExperimentContributorsProps {
  smeList?: ContributorEntry[];
  devList?: ContributorEntry[];
  labInstitute?: string;
}

export function ExperimentContributors({
  smeList,
  devList,
  labInstitute = "Virtual Labs Consortium",
}: ExperimentContributorsProps) {
  const defaultSMEs: ContributorEntry[] = smeList || [
    {
      sNo: 1,
      name: "Dr. Suresh Purini / Academic Lead",
      email: "suresh.purini@iiit.ac.in",
      institute: labInstitute || "IIIT Hyderabad",
    },
    {
      sNo: 2,
      name: "Department Faculty Coordinator",
      email: "faculty.coordinator@nodal.vlabs.ac.in",
      institute: "National Virtual Labs Network",
    },
  ];

  const defaultDevs: ContributorEntry[] = devList || [
    {
      sNo: 1,
      name: "Pramod Budramane & Team",
      email: "pramod.b@research.iiit.ac.in",
      institute: labInstitute || "IIIT Hyderabad",
    },
    {
      sNo: 2,
      name: "V-Lab Interactive Studio Engineering",
      email: "devs@virtuallabs.studio",
      institute: "Virtual Labs Open Source Project",
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Subject Matter Experts Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-foreground underline decoration-primary/40 underline-offset-4 flex items-center gap-2 font-heading">
          <UserCheck className="h-4 w-4 text-primary" />
          Subject Matter Experts
        </h3>

        <div className="overflow-x-auto rounded-none border border-border shadow-2xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/60 border-b border-border text-foreground font-bold">
                <th className="py-2.5 px-4 w-16">SNo.</th>
                <th className="py-2.5 px-4">Name</th>
                <th className="py-2.5 px-4">Email</th>
                <th className="py-2.5 px-4">Institute</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-card">
              {defaultSMEs.map((sme) => (
                <tr key={sme.sNo} className="hover:bg-muted/30 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-medium">{sme.sNo}</td>
                  <td className="py-2.5 px-4 font-semibold text-foreground">{sme.name}</td>
                  <td className="py-2.5 px-4 font-mono text-[#0284c7] hover:underline">
                    <a href={`mailto:${sme.email}`}>{sme.email}</a>
                  </td>
                  <td className="py-2.5 px-4 text-muted-foreground">{sme.institute}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Developers Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-foreground underline decoration-primary/40 underline-offset-4 flex items-center gap-2 font-heading">
          <Code className="h-4 w-4 text-primary" />
          Developers
        </h3>

        <div className="overflow-x-auto rounded-none border border-border shadow-2xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/60 border-b border-border text-foreground font-bold">
                <th className="py-2.5 px-4 w-16">SNo.</th>
                <th className="py-2.5 px-4">Name</th>
                <th className="py-2.5 px-4">Email</th>
                <th className="py-2.5 px-4">Institute</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-card">
              {defaultDevs.map((dev) => (
                <tr key={dev.sNo} className="hover:bg-muted/30 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-medium">{dev.sNo}</td>
                  <td className="py-2.5 px-4 font-semibold text-foreground">{dev.name}</td>
                  <td className="py-2.5 px-4 font-mono text-[#0284c7] hover:underline">
                    <a href={`mailto:${dev.email}`}>{dev.email}</a>
                  </td>
                  <td className="py-2.5 px-4 text-muted-foreground">{dev.institute}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
