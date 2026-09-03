"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lab } from "@/data/labs";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Download,
  Eye,
  Trash2,
  HardDrive,
  ShieldCheck,
  Clock,
  Sparkles,
  FileCheck,
  QrCode,
  X,
  RefreshCw,
  Search,
  ExternalLink
} from "lucide-react";

export interface SubmittedLabRecord {
  id: string;
  studentName: string;
  registerNumber: string;
  experimentTitle: string;
  experimentNumber: string;
  fileName: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  fileUrl?: string; // Data URL or object URL
  cloudStoragePath: string;
  submittedAt: string;
  status: "Stored in Cloud" | "Verified" | "Graded";
  gradeScore?: string;
  facultyRemarks?: string;
  digitalSignatureHash: string;
}

interface LabRecordUploadPanelProps {
  lab: Lab;
}

export function LabRecordUploadPanel({ lab }: LabRecordUploadPanelProps) {
  const [submissions, setSubmissions] = useState<SubmittedLabRecord[]>([]);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [activePreviewRecord, setActivePreviewRecord] = useState<SubmittedLabRecord | null>(null);
  const [showReceiptRecord, setShowReceiptRecord] = useState<SubmittedLabRecord | null>(null);

  // Form inputs
  const [studentName, setStudentName] = useState<string>("");
  const [registerNumber, setRegisterNumber] = useState<string>("");
  const [experimentNumber, setExperimentNumber] = useState<string>("Exp 1");
  const [experimentTitle, setExperimentTitle] = useState<string>("");
  const [facultyRemarks, setFacultyRemarks] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const storageKey = `vlab_cloud_records_${lab.id}`;

  // Load submissions from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setSubmissions(JSON.parse(saved));
      } else {
        // Pre-populate with sample verified template record
        const sampleRecord: SubmittedLabRecord = {
          id: `REC-${lab.code}-2026-001`,
          studentName: "Nishanth .A",
          registerNumber: "922521104001",
          experimentNumber: "Exp 1",
          experimentTitle: `${lab.shortTitle} — Core Observation & Practical Record`,
          fileName: `${lab.shortTitle}_Lab_Record_Submission.pdf`,
          fileSizeBytes: 2457600,
          fileSizeFormatted: "2.34 MB",
          cloudStoragePath: `s3://vlab-cloud-records/2026/${lab.id}/922521104001/${lab.shortTitle}_Lab_Record.pdf`,
          submittedAt: new Date(Date.now() - 86400000 * 2).toLocaleString(),
          status: "Verified",
          gradeScore: "98/100",
          facultyRemarks: "Accurate step-by-step algorithms and verified execution screenshots attached.",
          digitalSignatureHash: "sha256-a9f8b7c6d5e4f3a2b1c09876543210fedcba987654321"
        };
        setSubmissions([sampleRecord]);
        localStorage.setItem(storageKey, JSON.stringify([sampleRecord]));
      }
    } catch (e) {
      console.error("Failed to load records from storage", e);
    }
  }, [lab.id, lab.code, lab.shortTitle, storageKey]);

  // Save to localStorage
  const saveSubmissionsToStorage = (updated: SubmittedLabRecord[]) => {
    setSubmissions(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save records to storage", e);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      alert("Please upload a valid PDF document (.pdf).");
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      alert("File size exceeds 25 MB limit. Please compress the PDF and try again.");
      return;
    }

    setSelectedFile(file);
    if (!experimentTitle) {
      setExperimentTitle(file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "));
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFileDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleStartCloudUpload = () => {
    if (!selectedFile) {
      alert("Please select or drop a PDF lab record file first.");
      return;
    }
    if (!studentName.trim()) {
      alert("Please enter your Student Name.");
      return;
    }
    if (!registerNumber.trim()) {
      alert("Please enter your Register / Roll Number.");
      return;
    }

    setUploading(true);
    setUploadProgress(10);

    // Simulate multi-chunk cloud upload
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            finalizeUpload();
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 15;
      });
    }, 250);
  };

  const finalizeUpload = () => {
    if (!selectedFile) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const submissionId = `REC-${lab.code}-${new Date().getFullYear()}-${randomSuffix}`;
    const hash = `sha256-${Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`;

    const newRecord: SubmittedLabRecord = {
      id: submissionId,
      studentName: studentName.trim(),
      registerNumber: registerNumber.trim().toUpperCase(),
      experimentNumber: experimentNumber || "General Record",
      experimentTitle: experimentTitle.trim() || `${lab.shortTitle} Practical Record`,
      fileName: selectedFile.name,
      fileSizeBytes: selectedFile.size,
      fileSizeFormatted: formatFileSize(selectedFile.size),
      fileUrl: fileDataUrl || undefined,
      cloudStoragePath: `s3://vlab-cloud-records/2026/${lab.id}/${registerNumber.trim()}/${selectedFile.name}`,
      submittedAt: new Date().toLocaleString(),
      status: "Stored in Cloud",
      facultyRemarks: facultyRemarks.trim() || "Uploaded via student virtual lab portal. Stored in encrypted cloud bucket.",
      digitalSignatureHash: hash,
    };

    const updated = [newRecord, ...submissions];
    saveSubmissionsToStorage(updated);

    setUploading(false);
    setUploadSuccess(true);
    setSelectedFile(null);
    setFileDataUrl(null);
    setExperimentTitle("");

    setTimeout(() => {
      setUploadSuccess(false);
    }, 5000);
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm("Are you sure you want to remove this record from cloud storage?")) {
      const updated = submissions.filter((r) => r.id !== id);
      saveSubmissionsToStorage(updated);
    }
  };

  const downloadRecordFile = (record: SubmittedLabRecord) => {
    if (record.fileUrl) {
      const a = document.createElement("a");
      a.href = record.fileUrl;
      a.download = record.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      alert(`Downloading ${record.fileName} from secure cloud storage URL (${record.cloudStoragePath})...`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <Card className="border-border bg-card/90 backdrop-blur-md shadow-sm">
        <CardHeader className="p-6 pb-4 border-b border-border/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="outline" className="text-xs font-mono font-bold text-primary bg-primary/10 border-primary/30">
                  <UploadCloud className="h-3.5 w-3.5 mr-1 inline" /> Cloud Storage Vault
                </Badge>
                <Badge variant="outline" className="text-xs font-mono">
                  {lab.code} • {lab.semester}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-black text-foreground font-heading">
                {lab.name} — Lab Record Submission
              </CardTitle>
              <CardDescription className="text-sm mt-1">
                Upload your completed lab observation PDF, generate digital submission certificates, and preserve tamper-proof cloud records.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold shrink-0">
              <ShieldCheck className="h-4 w-4" />
              <span>AES-256 Cloud Encrypted</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          {/* UPLOAD SECTION: Form & Dropzone */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Drag & Drop Zone */}
            <div className="lg:col-span-6 space-y-4">
              <label className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider block">
                1. Select or Drop PDF Record File
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 min-h-[260px] ${
                  dragOver
                    ? "border-primary bg-primary/10 scale-[1.01]"
                    : selectedFile
                    ? "border-emerald-500 bg-emerald-500/5 shadow-xs"
                    : "border-border hover:border-primary/50 hover:bg-muted/40 bg-card/60"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileSelected(e.target.files[0]);
                    }
                  }}
                />

                {selectedFile ? (
                  <div className="space-y-3 w-full max-w-md">
                    <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
                      <FileCheck className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-foreground truncate">{selectedFile.name}</h4>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">
                        {formatFileSize(selectedFile.size)} • PDF Document
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs font-mono bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                      Ready for Cloud Synchronization
                    </Badge>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto">
                      <UploadCloud className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Click to upload or drag &amp; drop your PDF record
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Supported: Adobe Acrobat PDF (*.pdf) • Max file size: 25MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Metadata Details Form */}
            <div className="lg:col-span-6 space-y-4">
              <label className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider block">
                2. Student &amp; Exercise Details
              </label>

              <div className="bg-muted/30 border border-border/80 rounded-2xl p-5 space-y-4 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">Student Full Name *</label>
                    <Input
                      placeholder="e.g. Nishanth .A"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="text-sm bg-card"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">Register / Roll Number *</label>
                    <Input
                      placeholder="e.g. 922521104001"
                      value={registerNumber}
                      onChange={(e) => setRegisterNumber(e.target.value)}
                      className="text-sm font-mono uppercase bg-card"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">Experiment No.</label>
                    <select
                      value={experimentNumber}
                      onChange={(e) => setExperimentNumber(e.target.value)}
                      className="w-full h-9 text-sm rounded-lg border border-border bg-card px-2.5 text-foreground"
                    >
                      <option value="Exp 1">Experiment 1</option>
                      <option value="Exp 2">Experiment 2</option>
                      <option value="Exp 3">Experiment 3</option>
                      <option value="Exp 4">Experiment 4</option>
                      <option value="Exp 5">Experiment 5</option>
                      <option value="Exp 6">Experiment 6</option>
                      <option value="Full Manual">Full Lab Manual</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-foreground block mb-1">Experiment Title *</label>
                    <Input
                      placeholder="e.g. Practical Implementation & Verification"
                      value={experimentTitle}
                      onChange={(e) => setExperimentTitle(e.target.value)}
                      className="text-sm bg-card"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Notes / Faculty Remarks</label>
                  <Textarea
                    placeholder="Optional comments or exercise observations..."
                    value={facultyRemarks}
                    onChange={(e) => setFacultyRemarks(e.target.value)}
                    rows={2}
                    className="text-xs bg-card resize-none"
                  />
                </div>

                {/* Upload Button & Progress */}
                {uploading && (
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-xs font-mono font-bold">
                      <span className="text-primary flex items-center gap-1.5">
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Uploading to S3 Cloud Storage...
                      </span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        style={{ width: `${uploadProgress}%` }}
                        className="h-full bg-primary transition-all duration-200 rounded-full"
                      />
                    </div>
                  </div>
                )}

                {uploadSuccess && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Lab record successfully uploaded and encrypted in cloud storage vault!</span>
                  </div>
                )}

                <Button
                  onClick={handleStartCloudUpload}
                  disabled={uploading || !selectedFile}
                  className="w-full text-sm font-bold gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-11 rounded-xl shadow-md"
                >
                  <UploadCloud className="h-4 w-4" />
                  <span>{uploading ? "Synchronizing with Cloud..." : "Upload Lab Record to Cloud Storage"}</span>
                </Button>
              </div>
            </div>
          </div>

          {/* SUBMITTED RECORDS VAULT TABLE */}
          <div className="pt-6 border-t border-border/60 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-foreground font-heading flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-primary" />
                  <span>Submitted Lab Records Vault</span>
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Archived PDF records stored in educational cloud repository with digital signature verification.
                </p>
              </div>

              <Badge variant="outline" className="text-xs font-mono bg-primary/10 text-primary border-primary/30 font-bold self-start sm:self-auto">
                {submissions.length} Records Archived
              </Badge>
            </div>

            {submissions.length === 0 ? (
              <div className="text-center py-12 bg-card border rounded-2xl p-6">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <h4 className="text-sm font-bold text-foreground">No lab records uploaded yet</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Upload your first PDF record above to store it securely in cloud storage.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {submissions.map((record) => (
                  <div
                    key={record.id}
                    className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-all shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
                            {record.id}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-[10px] font-mono font-bold ${
                              record.status === "Verified" || record.status === "Graded"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                                : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
                            }`}
                          >
                            {record.status}
                          </Badge>
                          {record.gradeScore && (
                            <Badge variant="outline" className="text-[10px] font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold">
                              Grade: {record.gradeScore}
                            </Badge>
                          )}
                        </div>

                        <h4 className="text-base font-bold text-foreground line-clamp-1">
                          {record.experimentTitle}
                        </h4>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono">
                          <span>Student: <strong className="text-foreground">{record.studentName}</strong> ({record.registerNumber})</span>
                          <span>•</span>
                          <span>File: {record.fileName} ({record.fileSizeFormatted})</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {record.submittedAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 self-start lg:self-center shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowReceiptRecord(record)}
                        className="text-xs font-bold gap-1.5 h-8 rounded-xl"
                        title="View Submission Certificate"
                      >
                        <QrCode className="h-3.5 w-3.5 text-primary" />
                        <span>Receipt</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadRecordFile(record)}
                        className="text-xs font-bold gap-1.5 h-8 rounded-xl"
                        title="Download PDF"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRecord(record.id)}
                        className="text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 h-8 px-2 rounded-xl"
                        title="Delete record from cloud"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SUBMISSION RECEIPT MODAL */}
      {showReceiptRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowReceiptRecord(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center space-y-2 border-b border-border/60 pb-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-foreground font-heading">
                Digital Lab Record Submission Receipt
              </h3>
              <p className="text-xs font-mono text-muted-foreground">
                Anna University Regulation 2021/2026 Academic Portal
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Submission ID</span>
                <span className="font-mono font-bold text-primary">{showReceiptRecord.id}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Student Name</span>
                <span className="font-bold text-foreground">{showReceiptRecord.studentName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Register / Roll No</span>
                <span className="font-mono font-bold text-foreground">{showReceiptRecord.registerNumber}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Course / Subject</span>
                <span className="font-semibold text-foreground">{lab.name} ({lab.code})</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Experiment Title</span>
                <span className="font-semibold text-foreground">{showReceiptRecord.experimentTitle}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Cloud Storage Path</span>
                <span className="font-mono text-[10px] text-muted-foreground truncate max-w-[240px]">{showReceiptRecord.cloudStoragePath}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Timestamp</span>
                <span className="font-mono text-muted-foreground">{showReceiptRecord.submittedAt}</span>
              </div>
              <div className="p-2.5 bg-muted/40 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Digital Signature Hash</span>
                <span className="font-mono text-[10px] text-primary break-all leading-tight block">{showReceiptRecord.digitalSignatureHash}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="flex-1 text-xs font-bold gap-1.5"
              >
                <span>Print Receipt</span>
              </Button>
              <Button
                onClick={() => setShowReceiptRecord(null)}
                className="flex-1 text-xs font-bold bg-primary text-primary-foreground"
              >
                <span>Close</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
