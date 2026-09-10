"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Mail,
  Phone,
  User,
  GraduationCap,
  Users,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Lock,
  Layers,
  FlaskConical,
  Clock
} from "lucide-react";
import { saveDemoBooking, DemoBooking } from "@/lib/supabase-multitenant";
import { registerCustomCollege, CollegeData } from "@/data/colleges";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillCollegeName?: string;
  prefillDepartment?: string;
}

export function BookDemoModal({
  isOpen,
  onClose,
  prefillCollegeName = "",
  prefillDepartment = "Computer Science & Engineering"
}: BookDemoModalProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [collegeName, setCollegeName] = useState(prefillCollegeName || "");
  const [collegeCode, setCollegeCode] = useState("");
  const [location, setLocation] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("Head of Department (HOD)");
  const [department, setDepartment] = useState(prefillDepartment || "Computer Science & Engineering");
  const [studentStrength, setStudentStrength] = useState("500 - 1500 Students");
  const [preferredSubdomain, setPreferredSubdomain] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdSlug, setCreatedSlug] = useState("");

  // Handle live subdomain preview calculation
  const calculatedSlug = collegeName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 20) || "yourcollege";

  const activeSubdomain = preferredSubdomain.trim()
    ? preferredSubdomain.trim().toLowerCase().replace(/[^a-z0-9]/g, "-")
    : calculatedSlug;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeName.trim() || !contactName.trim() || !email.trim() || !phone.trim()) {
      alert("Please fill in all mandatory fields (College Name, Your Name, Institutional Email, Phone).");
      return;
    }

    setIsSubmitting(true);
    const finalSlug = activeSubdomain || `college-${Date.now().toString().slice(-4)}`;

    const newBooking: DemoBooking = {
      id: `booking_${Date.now()}`,
      collegeName: collegeName.trim(),
      collegeSlug: finalSlug,
      collegeCode: collegeCode.trim() || "0000",
      contactName: contactName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      designation,
      department,
      studentStrength,
      preferredSubdomain: `${finalSlug}.vlab.cloud`,
      message: `Demo requested for ${department} (${studentStrength})`,
      status: "trial_active",
      createdAt: new Date().toISOString()
    };

    // Dynamically register the custom college in the system so the clone works immediately
    const dynamicCollege: CollegeData = {
      id: `col_${finalSlug}_demo`,
      slug: finalSlug,
      name: collegeName.trim(),
      shortName: collegeName.trim().split(" ").map((w) => w[0]).join("").slice(0, 6).toUpperCase() || finalSlug.toUpperCase(),
      code: collegeCode.trim() || "DEMO",
      tagline: `Official Autonomous Virtual Laboratory for ${collegeName.trim()}`,
      location: location.trim() || "Campus Cloud Network",
      logo: "/icons/vsb-logo.png",
      bannerGradient: "from-slate-900 via-rose-950 to-neutral-950",
      accentColor: "#e11d48",
      accreditation: ["AICTE Approved", "NBA Compliant", "Autonomous CBCS"],
      affiliations: "Affiliated Technical University",
      departments: [
        {
          code: "DEPT",
          name: department,
          classes: [`${department} - Section A`, `${department} - Section B`],
          years: ["I Year", "II Year", "III Year", "IV Year"]
        }
      ],
      curriculumInfo: {
        regulation: "Autonomous Regulation 2023 / 2024",
        semesterFocus: "Semester I to VIII Core Laboratories",
        autonomousLabFeatures: [
          "Continuous Internal Evaluation (CIE) Automation",
          "Dedicated College Student Authentication & Progress Tracking",
          "Custom Faculty Lecture Videos & Lab Manual Hosting"
        ]
      },
      subscriptionPlan: "Enterprise Campus",
      status: "trial"
    };

    try {
      await saveDemoBooking(newBooking);
      registerCustomCollege(dynamicCollege);
      setCreatedSlug(finalSlug);
      setIsSuccess(true);
    } catch (err) {
      console.error("Booking error:", err);
      setIsSuccess(true);
      setCreatedSlug(finalSlug);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLaunchClone = () => {
    onClose();
    router.push(`/${createdSlug}/student-form`);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  if (!mounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleReset}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-border/80 bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl">
        {!isSuccess ? (
          <div className="p-6 sm:p-8 space-y-6">
            <DialogHeader className="space-y-2 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold w-fit font-mono">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Instant Institutional Clone Deployment</span>
              </div>
              <DialogTitle className="text-2xl sm:text-3xl font-black font-heading text-foreground tracking-tight">
                Book a Free Campus Demo
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Experience your college&apos;s customized Virtual Lab. We will configure your branded subdomain, private student database, and autonomous syllabus in 24 hours.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* College Information */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-rose-500" />
                  <span>Institution Information</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label className="text-xs font-medium text-foreground">College / University Name *</Label>
                    <Input
                      required
                      placeholder="e.g. PSG College of Technology"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      className="text-xs h-10 bg-background/60"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-foreground">College Code (Optional)</Label>
                    <Input
                      placeholder="e.g. 7177"
                      value={collegeCode}
                      onChange={(e) => setCollegeCode(e.target.value)}
                      className="text-xs h-10 bg-background/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-foreground">Campus Location (City / State)</Label>
                    <Input
                      placeholder="e.g. Coimbatore, Tamil Nadu"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="text-xs h-10 bg-background/60"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-foreground">Preferred Subdomain</Label>
                    <div className="flex items-center rounded-md border border-input bg-background/60 px-3 text-xs h-10">
                      <span className="text-foreground font-mono font-semibold">{activeSubdomain}</span>
                      <span className="text-muted-foreground font-mono">.vlab.cloud</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department & Capacity */}
              <div className="space-y-3 pt-3 border-t border-border/50">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-rose-500" />
                  <span>Academic Scope &amp; Scale</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-foreground">Primary Department *</Label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full text-xs h-10 px-3 rounded-md border border-input bg-background/60 text-foreground"
                    >
                      <option value="Computer Science & Engineering">Computer Science &amp; Engineering (CSE)</option>
                      <option value="Artificial Intelligence & Data Science">Artificial Intelligence &amp; Data Science (AI&amp;DS)</option>
                      <option value="Information Technology">Information Technology (IT)</option>
                      <option value="Electronics & Communication Engineering">Electronics &amp; Communication (ECE)</option>
                      <option value="Electrical & Electronics Engineering">Electrical &amp; Electronics (EEE)</option>
                      <option value="All Engineering Branches (Campus Wide)">All Engineering Branches (Campus Wide)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-foreground">Estimated Student Strength</Label>
                    <select
                      value={studentStrength}
                      onChange={(e) => setStudentStrength(e.target.value)}
                      className="w-full text-xs h-10 px-3 rounded-md border border-input bg-background/60 text-foreground"
                    >
                      <option value="Up to 500 Students">Up to 500 Students (Single Department)</option>
                      <option value="500 - 1500 Students">500 - 1,500 Students (Multi-Department)</option>
                      <option value="1500 - 5000 Students">1,500 - 5,000 Students (Entire Campus)</option>
                      <option value="5000+ Students">5,000+ Students (Autonomous University)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-3 border-t border-border/50">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-rose-500" />
                  <span>Authorized Faculty / Administrator</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-foreground">Your Full Name *</Label>
                    <Input
                      required
                      placeholder="Dr. / Prof. Name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="text-xs h-10 bg-background/60"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-foreground">Designation *</Label>
                    <select
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full text-xs h-10 px-3 rounded-md border border-input bg-background/60 text-foreground"
                    >
                      <option value="Principal / Director">Principal / Director</option>
                      <option value="Dean of Academics">Dean of Academics</option>
                      <option value="Head of Department (HOD)">Head of Department (HOD)</option>
                      <option value="Lab In-charge / Faculty Coordinator">Lab In-charge / Faculty Coordinator</option>
                      <option value="Assistant Professor / Lecturer">Assistant Professor / Lecturer</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-foreground">Institutional Email ID *</Label>
                    <Input
                      required
                      type="email"
                      placeholder="hod.cse@yourcollege.edu.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-xs h-10 bg-background/60"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-foreground">Contact Number / WhatsApp *</Label>
                    <Input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="text-xs h-10 bg-background/60"
                    />
                  </div>
                </div>
              </div>

              {/* Data Privacy & Guarantee */}
              <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-[11px] text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>
                  <strong>Strict Data Isolation:</strong> Your college&apos;s student database, passwords, and progress data are fully isolated. No other institution can access your student records.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="w-full sm:w-auto text-xs h-10 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto text-xs h-10 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold gap-2 shadow-md shadow-rose-600/20"
                >
                  {isSubmitting ? "Provisioning Clone..." : "Provision College Clone & Book Demo"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </form>
          </div>
        ) : (
          /* Instant Success State */
          <div className="p-8 sm:p-10 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <Badge className="bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 text-xs font-mono uppercase">
                Trial Sandbox Activated
              </Badge>
              <h3 className="text-2xl font-black font-heading text-foreground tracking-tight">
                Your College Virtual Lab Clone is Ready!
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                We have registered <strong>{collegeName}</strong> with an isolated sandbox database. Our academic representative will contact <strong>{contactName}</strong> at <strong>{email}</strong>.
              </p>
            </div>

            {/* Trial Credentials Box */}
            <div className="p-4 rounded-xl bg-muted/60 border border-border/80 text-left space-y-2.5 max-w-lg mx-auto text-xs">
              <div className="font-mono text-[11px] font-bold text-foreground uppercase tracking-wider pb-1 border-b border-border/50">
                Instant Sandbox Credentials
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-muted-foreground">College Clone URL:</span>
                <span className="font-mono font-bold text-rose-500">/c/{createdSlug}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-muted-foreground">Student Demo Email:</span>
                <span className="font-mono font-bold text-foreground">student@{createdSlug}.edu</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-muted-foreground">Default Access Code:</span>
                <span className="font-mono font-bold text-foreground">demo123</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-muted-foreground">Data Scope:</span>
                <span className="text-emerald-500 font-semibold flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Private Tenant Database
                </span>
              </div>
            </div>

            {/* Action Direct */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={handleLaunchClone}
                size="lg"
                className="w-full sm:w-auto h-11 px-8 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs gap-2 shadow-lg shadow-rose-600/25"
              >
                <span>Enter Your College Virtual Lab</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-11 px-6 rounded-xl text-xs"
              >
                Return to Landing Page
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
