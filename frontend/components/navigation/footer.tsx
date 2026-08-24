"use client";

import Link from "next/link";
import { FlaskConical, Mail, Phone, MapPin, ExternalLink, GraduationCap, FolderOpen, Calendar, Users } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      {/* Top Banner */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Department Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-white text-base">
              <FlaskConical className="h-5 w-5 text-primary" />
              <span>Department Virtual Labs</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Department of Artificial Intelligence &amp; Data Science, VSB Engineering College, Karur. Developed in alignment with the National Virtual Labs initiative (Ministry of Education, NMEICT).
            </p>
          </div>

          {/* Col 2: Academic Portals */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Academic Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home Portal</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">Semester Curriculum (Sem 1-8)</Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">Department Resource Vault</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">Workshops &amp; Events</Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-white transition-colors">Faculty Directory</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Virtual Labs & Visualizers */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Virtual Labs &amp; Simulators
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/labs" className="hover:text-white transition-colors">All Virtual Labs</Link>
              </li>
              <li>
                <Link href="/labs/data-structures" className="hover:text-white transition-colors">Data Structures Lab</Link>
              </li>
              <li>
                <Link href="/visualizer" className="hover:text-white transition-colors">DSA Visualizer Studio</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">Student Portal &amp; Certificate</Link>
              </li>

            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Contact &amp; Support
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                <span>NH-67 Covai Road, Karur, Tamil Nadu 639111</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>04324 - 290141 / 290142</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>aids.virtuallab@vsb.ac.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Department of AI &amp; Data Science, VSB Engineering College. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary font-mono">AGPL 3.0 &amp; Creative Commons (CC BY-NC-SA 4.0)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
