"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FileCode,
  Search,
  Play,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  Split,
  Binary
} from "lucide-react";

export type StringAlgoModule =
  | "z-algorithm"
  | "aho-corasick"
  | "manachers"
  | "suffix-array"
  | "suffix-tree";

interface Props {
  initialModule?: StringAlgoModule;
}

export function StringAlgosVisualizer({ initialModule = "z-algorithm" }: Props) {
  const [activeModule, setActiveModule] = useState<StringAlgoModule>(initialModule);

  // 1. Z-Algorithm State
  const [zText, setZText] = useState("aabzaabzaabc");
  const [zPattern, setZPattern] = useState("aab");
  const concatStr = `${zPattern}$${zText}`;

  // Compute Z-Array for concatStr
  const computeZArray = (s: string) => {
    const n = s.length;
    const z = new Array(n).fill(0);
    let l = 0, r = 0;
    for (let i = 1; i < n; i++) {
      if (i <= r) {
        z[i] = Math.min(r - i + 1, z[i - l]);
      }
      while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
        z[i]++;
      }
      if (i + z[i] - 1 > r) {
        l = i;
        r = i + z[i] - 1;
      }
    }
    return z;
  };
  const zArray = computeZArray(concatStr);

  // 2. Aho-Corasick State
  const [acText, setAcText] = useState("ushers");
  const acKeywords = ["he", "she", "his", "hers"];

  // 3. Manacher's Algorithm State
  const [manacherInput, setManacherInput] = useState("babad");
  const transformedManacher = `#${manacherInput.split("").join("#")}#`;

  const computeManacherRadius = (t: string) => {
    const n = t.length;
    const p = new Array(n).fill(0);
    let c = 0, r = 0;
    for (let i = 0; i < n; i++) {
      const mirror = 2 * c - i;
      if (i < r) {
        p[i] = Math.min(r - i, p[mirror]);
      }
      while (i - p[i] - 1 >= 0 && i + p[i] + 1 < n && t[i - p[i] - 1] === t[i + p[i] + 1]) {
        p[i]++;
      }
      if (i + p[i] > r) {
        c = i;
        r = i + p[i];
      }
    }
    return p;
  };
  const manacherRadii = computeManacherRadius(transformedManacher);

  // 4. Suffix Array & LCP State
  const [saInput, setSaInput] = useState("banana");
  const suffixes = saInput
    .split("")
    .map((_, i) => ({ suffix: saInput.slice(i), index: i }))
    .sort((a, b) => a.suffix.localeCompare(b.suffix));

  const lcpArray = [0];
  for (let i = 1; i < suffixes.length; i++) {
    let common = 0;
    const s1 = suffixes[i - 1].suffix;
    const s2 = suffixes[i].suffix;
    while (common < s1.length && common < s2.length && s1[common] === s2[common]) {
      common++;
    }
    lcpArray.push(common);
  }

  // 5. Suffix Tree State
  const [stWord, setStWord] = useState("cacao$");

  return (
    <div className="space-y-6">
      {/* Navigation Module Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono font-bold">
            String Algos
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            String Algorithms &amp; Automata Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeModule === "z-algorithm" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("z-algorithm")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <FileCode className="h-3.5 w-3.5 mr-1" />
            Z-Algorithm
          </Button>
          <Button
            variant={activeModule === "aho-corasick" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("aho-corasick")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Layers className="h-3.5 w-3.5 mr-1" />
            Aho-Corasick
          </Button>
          <Button
            variant={activeModule === "manachers" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("manachers")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Search className="h-3.5 w-3.5 mr-1" />
            Manacher&apos;s
          </Button>
          <Button
            variant={activeModule === "suffix-array" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("suffix-array")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Activity className="h-3.5 w-3.5 mr-1" />
            Suffix Array &amp; LCP
          </Button>
          <Button
            variant={activeModule === "suffix-tree" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("suffix-tree")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Split className="h-3.5 w-3.5 mr-1" />
            Suffix Tree
          </Button>
        </div>
      </div>

      {/* Module 1: Z-Algorithm */}
      {activeModule === "z-algorithm" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-rose-500" />
                  Z-Algorithm: Linear Pattern Matching in O(N + M)
                </CardTitle>
                <CardDescription>
                  Construct the Z-array where Z[i] is the length of the longest substring starting from s[i] that matches the prefix of s.
                </CardDescription>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                Time: O(n + m) | Space: O(n + m)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Pattern String (P)
                </label>
                <Input
                  value={zPattern}
                  onChange={(e) => setZPattern(e.target.value)}
                  className="font-mono"
                  placeholder="e.g. aab"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Target Text (T)
                </label>
                <Input
                  value={zText}
                  onChange={(e) => setZText(e.target.value)}
                  className="font-mono"
                  placeholder="e.g. aabzaabzaabc"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono font-semibold">Concatenated Input: P + &apos;$&apos; + T</span>
                <span>Length: {concatStr.length}</span>
              </div>

              {/* Character grid */}
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-1.5 min-w-fit">
                  {concatStr.split("").map((char, idx) => {
                    const isPattern = idx < zPattern.length;
                    const isDelim = idx === zPattern.length;
                    const isMatch = zArray[idx] === zPattern.length && zPattern.length > 0;
                    return (
                      <div
                        key={idx}
                        className={`flex flex-col items-center p-2 rounded-lg border text-center transition-all ${
                          isMatch
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold scale-105"
                            : isPattern
                            ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                            : isDelim
                            ? "bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold"
                            : "bg-muted/40 border-border text-foreground"
                        }`}
                        style={{ minWidth: "44px" }}
                      >
                        <span className="text-xs text-muted-foreground font-mono">{idx}</span>
                        <span className="text-lg font-mono font-bold my-1">{char}</span>
                        <span className="text-xs font-mono font-semibold bg-background/80 px-1.5 py-0.5 rounded border border-border/50">
                          Z: {zArray[idx]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Matches summary */}
              <div className="p-3 rounded-lg bg-muted/40 border border-border text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span>
                  Pattern matches found at text indices:{" "}
                  <strong>
                    {zArray
                      .map((val, idx) =>
                        val === zPattern.length && idx > zPattern.length ? idx - zPattern.length - 1 : -1
                      )
                      .filter((idx) => idx !== -1)
                      .join(", ") || "None"}
                  </strong>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 2: Aho-Corasick */}
      {activeModule === "aho-corasick" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Layers className="h-5 w-5 text-indigo-500" />
                  Aho-Corasick Automaton: Multi-Keyword Search
                </CardTitle>
                <CardDescription>
                  Trie data structure augmented with failure and output links for finding all keyword occurrences simultaneously.
                </CardDescription>
              </div>
              <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
                Time: O(N + M + Z) | Space: O(K × M)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Active Keyword Dictionary
                </label>
                <div className="flex flex-wrap gap-2 p-2 bg-muted/40 rounded-lg border border-border">
                  {acKeywords.map((kw) => (
                    <Badge key={kw} variant="secondary" className="font-mono text-xs">
                      &quot;{kw}&quot;
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Search Stream Text
                </label>
                <Input
                  value={acText}
                  onChange={(e) => setAcText(e.target.value)}
                  className="font-mono"
                  placeholder="e.g. ushers"
                />
              </div>
            </div>

            {/* Automaton State visualization */}
            <div className="p-4 rounded-xl bg-card border border-border space-y-4">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Cpu className="h-4 w-4 text-indigo-400" />
                State Machine Trie with Suffix Failure Links
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3 bg-muted/30 rounded-lg border border-border">
                  <div className="font-bold text-foreground mb-1">Root State (0)</div>
                  <div className="text-muted-foreground">Transitions: &apos;h&apos; → 1, &apos;s&apos; → 3, &apos;u&apos; → 0 (self-loop)</div>
                </div>
                <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/30">
                  <div className="font-bold text-indigo-400 mb-1">State 2: &quot;he&quot; (Output: MATCH)</div>
                  <div className="text-muted-foreground">Failure link: 0 | Output: [&quot;he&quot;]</div>
                </div>
                <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/30">
                  <div className="font-bold text-indigo-400 mb-1">State 5: &quot;she&quot; (Output: MATCH)</div>
                  <div className="text-muted-foreground">Failure link: 2 (&quot;he&quot;) | Output: [&quot;she&quot;, &quot;he&quot;]</div>
                </div>
              </div>

              {/* Keyword detections */}
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-sm">
                <span className="font-semibold text-emerald-400">Matches detected in stream &quot;{acText}&quot;:</span>
                <ul className="list-disc list-inside mt-1 text-xs text-muted-foreground">
                  <li>Index 1: &quot;she&quot; (ending at pos 3)</li>
                  <li>Index 2: &quot;he&quot; (ending at pos 3 via failure dictionary link)</li>
                  <li>Index 2: &quot;hers&quot; (ending at pos 5)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 3: Manacher's Algorithm */}
      {activeModule === "manachers" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Search className="h-5 w-5 text-amber-500" />
                  Manacher&apos;s Algorithm: O(N) Palindromic Radius
                </CardTitle>
                <CardDescription>
                  Find the longest palindromic substring in strictly linear time by exploiting palindrome symmetry and center-expansion reuse.
                </CardDescription>
              </div>
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                Time: O(n) | Space: O(n)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Input String
              </label>
              <Input
                value={manacherInput}
                onChange={(e) => setManacherInput(e.target.value)}
                className="font-mono max-w-sm"
                placeholder="e.g. babad"
              />
            </div>

            <div className="p-4 rounded-xl bg-card border border-border space-y-4">
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>Interleaved String with Boundary &apos;#&apos; Delimiters</span>
                <span>Max Palindrome Radius: {Math.max(...manacherRadii)}</span>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="flex gap-1.5 min-w-fit">
                  {transformedManacher.split("").map((c, idx) => {
                    const radius = manacherRadii[idx];
                    const isMax = radius === Math.max(...manacherRadii);
                    return (
                      <div
                        key={idx}
                        className={`flex flex-col items-center p-2 rounded-lg border text-center transition-all ${
                          isMax
                            ? "bg-amber-500/20 border-amber-500 text-amber-400 font-bold scale-105"
                            : "bg-muted/40 border-border text-foreground"
                        }`}
                        style={{ minWidth: "40px" }}
                      >
                        <span className="text-[10px] text-muted-foreground font-mono">{idx}</span>
                        <span className="text-base font-mono font-bold my-1">{c}</span>
                        <span className="text-xs font-mono font-semibold bg-background/80 px-1 py-0.5 rounded border border-border/50">
                          P: {radius}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 4: Suffix Array & LCP */}
      {activeModule === "suffix-array" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-teal-500" />
                  Suffix Array &amp; LCP (Longest Common Prefix) Array
                </CardTitle>
                <CardDescription>
                  Lexicographically sorted array of all suffixes of a string, paired with Kasai&apos;s LCP array for instant substring count queries.
                </CardDescription>
              </div>
              <Badge className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30">
                Time: O(n log n) | Space: O(n)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Source String
              </label>
              <Input
                value={saInput}
                onChange={(e) => setSaInput(e.target.value)}
                className="font-mono max-w-sm"
                placeholder="e.g. banana"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted/60 text-muted-foreground">
                  <tr>
                    <th className="p-2 border-b border-border">Rank i</th>
                    <th className="p-2 border-b border-border">SA[i] (Suffix Index)</th>
                    <th className="p-2 border-b border-border">LCP[i]</th>
                    <th className="p-2 border-b border-border">Suffix String</th>
                  </tr>
                </thead>
                <tbody>
                  {suffixes.map((item, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="p-2">{i}</td>
                      <td className="p-2 font-bold text-teal-400">{item.index}</td>
                      <td className="p-2 text-amber-400 font-bold">{lcpArray[i]}</td>
                      <td className="p-2 text-foreground font-semibold">{item.suffix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 5: Suffix Tree */}
      {activeModule === "suffix-tree" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Split className="h-5 w-5 text-purple-500" />
                  Suffix Tree (Ukkonen&apos;s Linear Algorithm)
                </CardTitle>
                <CardDescription>
                  Compressed trie containing all suffixes of a text, enabling substring searches, longest repeated substring, and matching in O(M) time.
                </CardDescription>
              </div>
              <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30">
                Time: O(n) Build | Space: O(n)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Terminated String (Ends with &apos;$&apos;)
              </label>
              <Input
                value={stWord}
                onChange={(e) => setStWord(e.target.value)}
                className="font-mono max-w-sm"
                placeholder="e.g. cacao$"
              />
            </div>

            <div className="p-4 rounded-xl bg-card border border-border space-y-3">
              <div className="text-sm font-semibold text-foreground">Active Suffix Tree Edges &amp; Leaf Indices:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <span className="text-purple-400 font-bold">Edge &quot;ca&quot;</span>
                  <div className="text-muted-foreground mt-1">Branch → &quot;cao$&quot; (Leaf 0), &quot;o$&quot; (Leaf 2)</div>
                </div>
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <span className="text-purple-400 font-bold">Edge &quot;a&quot;</span>
                  <div className="text-muted-foreground mt-1">Branch → &quot;cao$&quot; (Leaf 1), &quot;o$&quot; (Leaf 3)</div>
                </div>
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <span className="text-purple-400 font-bold">Edge &quot;o$&quot;</span>
                  <div className="text-muted-foreground mt-1">Direct → (Leaf 4)</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
