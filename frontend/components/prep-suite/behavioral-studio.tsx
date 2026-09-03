"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Plus,
  Trash2,
  Award,
  Building,
  Target,
  Compass,
  Zap,
  HelpCircle,
  Info
} from "lucide-react";

interface StarStory {
  id: string;
  title: string;
  companyTag: string;
  principle: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

const AMAZON_LPS = [
  { name: "Customer Obsession", prompt: "Tell me about a time when you had to make a tough trade-off between speed and customer delight." },
  { name: "Ownership", prompt: "Describe a situation where you took on a problem outside your designated team area because it was the right thing to do." },
  { name: "Invent & Simplify", prompt: "Tell me about a complex process you streamlined or an innovative technical workaround you pioneered." },
  { name: "Are Right, A Lot", prompt: "Tell me about a time you relied on data and intuition to make a crucial decision with incomplete information." },
  { name: "Bias for Action", prompt: "Give an example of when you had to make an urgent decision with only 70% of the desired information." },
  { name: "Dive Deep", prompt: "Describe the most complex root cause analysis (RCA) or obscure bug you had to track down across microservices." },
  { name: "Have Backbone; Disagree & Commit", prompt: "Tell me about a time you strongly disagreed with a senior engineer or product manager's direction." },
  { name: "Deliver Results", prompt: "Tell me about a critical production deadline that was falling behind schedule and how you brought it to the finish line." },
  { name: "Earn Trust", prompt: "Tell me about a time you made a significant mistake in production. How did you handle communication and remediation?" },
  { name: "Think Big", prompt: "Describe a project where your initial proposal scaled from supporting 1,000 users to over 100,000+ users." },
];

const GOOGLE_VALUES = [
  { name: "Navigating Ambiguity", prompt: "How do you break down an underspecified problem when there is no clear documentation or precedent?" },
  { name: "Intellectual Humility", prompt: "Tell me about a time you realized your technical design was flawed after receiving peer code review feedback." },
  { name: "Valuing Collaboration & Consensus", prompt: "Describe how you built consensus across cross-functional engineering and design stakeholders." },
  { name: "Doing the Right Thing", prompt: "Tell me about a time you advocated for code quality, security, or accessibility over shipping early." }
];

const META_VALUES = [
  { name: "Move Fast", prompt: "How do you maintain high velocity and shipping frequency while keeping regression rates low?" },
  { name: "Focus on Long-Term Impact", prompt: "Describe a technical refactor that slowed short-term features down but unlocked massive long-term scale." },
  { name: "Be Direct & Respectful", prompt: "Tell me about a difficult code review or architectural disagreement where you gave candid constructive feedback." },
  { name: "Live in the Future", prompt: "Tell me about a technology or architecture you adopted before it became an industry standard." }
];

export function BehavioralStudio() {
  const [activeTab, setActiveTab] = useState<"star-builder" | "principles-matrix" | "evaluator">("star-builder");
  const [selectedCompany, setSelectedCompany] = useState<"Amazon" | "Google" | "Meta">("Amazon");

  // STAR Form State
  const [storyTitle, setStoryTitle] = useState<string>("Scaling Auth Service Latency from 850ms to 45ms");
  const [storyTag, setStoryTag] = useState<string>("Customer Obsession");
  const [situation, setSituation] = useState<string>("During Black Friday traffic spikes, our identity authentication service experienced p99 latency spikes exceeding 850ms, causing 4.2% of checkout attempts to timeout.");
  const [task, setTask] = useState<string>("I was tasked as the lead backend engineer to optimize token validation and database lookups to bring p99 latency under 100ms within a 2-week turnaround.");
  const [action, setAction] = useState<string>("I profiled database query execution plans, identified full table scans on session lookups, implemented a distributed Redis Cache-Aside layer with TTL jitter to prevent cache stampedes, and optimized JWT asymmetric key verification using local in-memory public key caching.");
  const [result, setResult] = useState<string>("p99 authentication latency plummeted by 94% from 850ms to 42ms. Zero checkout timeouts occurred during peak 50,000 QPS load, saving an estimated $320,000 in abandoned cart revenue.");

  const [savedStories, setSavedStories] = useState<StarStory[]>([
    {
      id: "1",
      title: "Scaling Auth Service Latency from 850ms to 45ms",
      companyTag: "Amazon",
      principle: "Customer Obsession",
      situation: "During Black Friday traffic spikes, auth service spiked to 850ms causing checkout dropoffs.",
      task: "Tasked as lead to drop p99 latency below 100ms in 2 weeks.",
      action: "Profiled queries, added Redis Cache-Aside with jitter, optimized JWT verification.",
      result: "p99 dropped by 94% to 42ms. Handled 50,000 QPS with zero timeouts, saving $320k."
    }
  ]);

  const [copied, setCopied] = useState<boolean>(false);

  const handleSaveStory = () => {
    const newStory: StarStory = {
      id: Date.now().toString(),
      title: storyTitle || "Untitled Story",
      companyTag: selectedCompany,
      principle: storyTag,
      situation,
      task,
      action,
      result
    };
    setSavedStories([newStory, ...savedStories]);
  };

  const getFullStoryText = () => {
    return `### ${storyTitle}\n**Company/Principle**: ${selectedCompany} - ${storyTag}\n\n**Situation**:\n${situation}\n\n**Task**:\n${task}\n\n**Action**:\n${action}\n\n**Result**:\n${result}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullStoryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono font-bold">
            Behavioral Suite
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Behavioral &amp; Leadership Principles Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeTab === "star-builder" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("star-builder")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Interactive STAR Builder
          </Button>
          <Button
            variant={activeTab === "principles-matrix" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("principles-matrix")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Building className="h-3.5 w-3.5 mr-1" />
            Company Values Matrix
          </Button>
          <Button
            variant={activeTab === "evaluator" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("evaluator")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Award className="h-3.5 w-3.5 mr-1" />
            Response Evaluation Rubric
          </Button>
        </div>
      </div>

      {/* ========================================== */}
      {/* TAB 1: INTERACTIVE STAR BUILDER            */}
      {/* ========================================== */}
      {activeTab === "star-builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Story Title</span>
                  <input
                    type="text"
                    value={storyTitle}
                    onChange={(e) => setStoryTitle(e.target.value)}
                    placeholder="e.g. Scaling Auth Service Latency from 850ms to 45ms"
                    className="w-full mt-1 px-3 py-1.5 rounded-xl border border-border bg-background text-sm font-bold font-heading text-foreground"
                  />
                </div>

                <div className="flex items-center gap-2">
                  {(["Amazon", "Google", "Meta"] as const).map((comp) => (
                    <Button
                      key={comp}
                      size="sm"
                      variant={selectedCompany === comp ? "default" : "outline"}
                      onClick={() => setSelectedCompany(comp)}
                      className="h-8 text-xs font-semibold"
                    >
                      {comp}
                    </Button>
                  ))}
                </div>
              </div>

              {/* STAR 4 Sections */}
              <div className="space-y-4 pt-2">
                {/* Situation */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground font-mono flex items-center gap-1.5">
                      <span className="h-5 w-5 rounded-md bg-blue-500/20 text-blue-500 font-bold flex items-center justify-center text-[10px]">S</span>
                      Situation (15% of time): Context, scale, and stakes
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">{situation.length} chars</span>
                  </div>
                  <textarea
                    rows={2}
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-muted/20 text-xs leading-relaxed text-foreground resize-none"
                  />
                </div>

                {/* Task */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground font-mono flex items-center gap-1.5">
                      <span className="h-5 w-5 rounded-md bg-amber-500/20 text-amber-500 font-bold flex items-center justify-center text-[10px]">T</span>
                      Task (10% of time): Your specific ownership &amp; goal
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">{task.length} chars</span>
                  </div>
                  <textarea
                    rows={2}
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-muted/20 text-xs leading-relaxed text-foreground resize-none"
                  />
                </div>

                {/* Action */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-primary font-mono flex items-center gap-1.5">
                      <span className="h-5 w-5 rounded-md bg-primary/20 text-primary font-bold flex items-center justify-center text-[10px]">A</span>
                      Action (60% of time): Technical decisions, "I" statements, deep-dive
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">{action.length} chars</span>
                  </div>
                  <textarea
                    rows={3}
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    className="w-full p-3 rounded-xl border border-primary/40 bg-muted/20 text-xs leading-relaxed text-foreground resize-none shadow-xs"
                  />
                </div>

                {/* Result */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-500 font-mono flex items-center gap-1.5">
                      <span className="h-5 w-5 rounded-md bg-emerald-500/20 text-emerald-500 font-bold flex items-center justify-center text-[10px]">R</span>
                      Result (15% of time): Quantifiable metrics, latency, revenue, lessons
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">{result.length} chars</span>
                  </div>
                  <textarea
                    rows={2}
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-muted/20 text-xs leading-relaxed text-foreground resize-none"
                  />
                </div>
              </div>

              {/* Actions Button */}
              <div className="flex items-center justify-between pt-2">
                <Button size="sm" onClick={handleSaveStory} className="gap-1.5 font-bold text-xs h-9">
                  <Plus className="h-4 w-4" />
                  Save to Story Bank
                </Button>

                <Button size="sm" variant="outline" onClick={handleCopy} className="gap-1.5 text-xs h-9">
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied" : "Copy Formatted Story"}</span>
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Col: Story Bank & Golden Rules */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-sm font-bold font-heading text-foreground">
                  Saved Story Bank ({savedStories.length})
                </span>
                <Badge variant="outline" className="text-[10px] font-mono">STAR Library</Badge>
              </div>

              <div className="space-y-3 max-h-[360px] overflow-y-auto">
                {savedStories.map((s) => (
                  <div key={s.id} className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground truncate max-w-[180px]">{s.title}</span>
                      <Badge variant="secondary" className="text-[9px] font-mono">{s.companyTag}</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                      {s.result}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* STAR Golden Rules */}
            <Card className="p-5 bg-card border-border/80 rounded-2xl shadow-xs space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-primary block">
                The 3 Golden Rules of STAR
              </span>
              <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Say "I", not "We":</strong> Interviewers are hiring you, not your former team. Highlight your individual decisions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Quantify the Result:</strong> Always include real numbers (%, latency, QPS, dollar revenue, team hours saved).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>60% on Action:</strong> Spend the majority of your answer on the technical and leadership steps you personally took.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 2: COMPANY VALUES MATRIX               */}
      {/* ========================================== */}
      {activeTab === "principles-matrix" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Leadership Principles &amp; Behavioral Questions Matrix
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Click any principle to view exact interview questions asked in screening and loop rounds.
                </p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border text-xs">
                {(["Amazon", "Google", "Meta"] as const).map((comp) => (
                  <Button
                    key={comp}
                    size="sm"
                    variant={selectedCompany === comp ? "default" : "ghost"}
                    onClick={() => setSelectedCompany(comp)}
                    className="h-7 text-xs font-semibold rounded-lg"
                  >
                    {comp}
                  </Button>
                ))}
              </div>
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(selectedCompany === "Amazon" ? AMAZON_LPS : selectedCompany === "Google" ? GOOGLE_VALUES : META_VALUES).map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border bg-muted/20 space-y-2 hover:border-primary/50 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-primary">{item.name}</span>
                    <Badge variant="outline" className="text-[10px] font-mono">Loop Round</Badge>
                  </div>
                  <p className="text-xs text-foreground font-medium leading-relaxed">
                    "{item.prompt}"
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 3: RESPONSE EVALUATION RUBRIC          */}
      {/* ========================================== */}
      {activeTab === "evaluator" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-bold font-heading text-foreground">
                Behavioral Response 5-Point Evaluation Rubric
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                How hiring committees and bar raisers calibrate your behavioral responses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { title: "1. Ownership (I vs We)", desc: "Did the candidate explain their personal contribution or hide behind team actions?" },
                { title: "2. Technical Depth", desc: "Did they dive deep into the specific algorithms, architectures, or protocols involved?" },
                { title: "3. Measurable Impact", desc: "Are there concrete numbers (percentages, latency ms, QPS, dollars saved)?" },
                { title: "4. Ambiguity Resolution", desc: "Did they show initiative in the face of incomplete requirements or road blocks?" },
                { title: "5. Introspection & Learning", desc: "If asked about a mistake, did they own it, remediate it, and prevent recurrence?" }
              ].map((crit, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col justify-between space-y-2">
                  <span className="text-xs font-mono font-bold text-foreground">{crit.title}</span>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{crit.desc}</p>
                  <Badge variant="secondary" className="text-[10px] font-mono self-start mt-2">
                    Weight: 20%
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
