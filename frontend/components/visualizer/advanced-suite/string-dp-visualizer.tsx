"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2, Play, RotateCcw, ChevronRight, ChevronLeft, Info, CheckCircle2 } from "lucide-react";

export function StringDPVisualizer() {
  const [algo, setAlgo] = useState<"lcs" | "edit">("lcs");
  const [stepIdx, setStepIdx] = useState<number>(0);

  // String 1 = "ABCDE", String 2 = "ACE"
  const s1 = "ABCDE";
  const s2 = "ACE";

  // LCS 2D DP matrix steps
  const lcsSteps = [
    { r: 0, c: 0, val: 0, desc: "Initialize (M+1)×(N+1) DP table with zeros for empty string prefixes." },
    { r: 1, c: 1, val: 1, desc: "Match 'A' == 'A'! dp[1][1] = 1 + dp[0][0] = 1." },
    { r: 2, c: 1, val: 1, desc: "Mismatch 'B' ≠ 'A': dp[2][1] = max(dp[1][1], dp[2][0]) = 1." },
    { r: 3, c: 2, val: 2, desc: "Match 'C' == 'C'! dp[3][2] = 1 + dp[2][1] = 2." },
    { r: 4, c: 2, val: 2, desc: "Mismatch 'D' ≠ 'C': dp[4][2] = max(dp[3][2], dp[4][1]) = 2." },
    { r: 5, c: 3, val: 3, desc: "🎉 Match 'E' == 'E'! dp[5][3] = 1 + dp[4][2] = 3. Longest Common Subsequence length = 3 ('ACE')!" }
  ];

  // Levenshtein Edit Distance steps: "HORSE" to "ROS"
  const editSteps = [
    { desc: "Transform 'HORSE' into 'ROS'. Initialize base insertion/deletion cost margins." },
    { desc: "Match 'R' with 'R': Cost = 0 (carry diagonal cost)." },
    { desc: "Replace 'H' with 'R': Cost = 1." },
    { desc: "Delete 'O' & 'S': Additional edits accumulated." },
    { desc: "🎉 Final Edit Distance dp[5][3] = 3 operations: (1) Replace 'H' with 'R', (2) Delete 'R', (3) Delete 'E'!" }
  ];

  const curL = lcsSteps[Math.min(stepIdx, lcsSteps.length - 1)];
  const curE = editSteps[Math.min(stepIdx, editSteps.length - 1)];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
            Phase 4: Dynamic Programming
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            2D Tabulation Grid (LCS &amp; Levenshtein Distance)
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          String DP Visualizer (LCS &amp; Edit Distance)
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Master 2D dynamic programming tables. Step through Longest Common Subsequence (LCS) and Levenshtein Edit Distance calculation in $O(M \times N)$ time.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60">
            <Button
              variant={algo === "lcs" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setAlgo("lcs"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              LCS ("ABCDE", "ACE")
            </Button>
            <Button
              variant={algo === "edit" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setAlgo("edit"); setStepIdx(0); }}
              className="h-7 text-xs font-bold rounded-lg"
            >
              Edit Distance ("HORSE" ──> "ROS")
            </Button>
          </div>

          <Button
            size="sm"
            onClick={() => setStepIdx(p => p + 1)}
            disabled={stepIdx >= (algo === "lcs" ? lcsSteps.length - 1 : editSteps.length - 1)}
            className="h-8 text-xs font-bold gap-1 rounded-xl bg-primary text-primary-foreground"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Step Cell</span>
          </Button>

          <Button size="sm" variant="outline" onClick={() => setStepIdx(0)} className="h-8 w-8 p-0 rounded-xl" title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            O(M × N) Time &amp; Space Complexity
          </Badge>
        </div>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        <div className="flex flex-col items-center justify-center py-4">
          {algo === "lcs" ? (
            <div className="space-y-4 w-full max-w-md">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center">
                LCS Dynamic Programming 2D Table
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono text-center border-collapse">
                  <thead>
                    <tr className="bg-muted/40 text-muted-foreground">
                      <th className="p-2 border border-border">S1 \ S2</th>
                      <th className="p-2 border border-border">""</th>
                      <th className="p-2 border border-border">A</th>
                      <th className="p-2 border border-border">C</th>
                      <th className="p-2 border border-border">E</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["", "A", "B", "C", "D", "E"].map((ch1, r) => (
                      <tr key={r}>
                        <td className="p-2 font-bold border border-border bg-muted/20">{ch1 === "" ? '""' : ch1}</td>
                        {["", "A", "C", "E"].map((ch2, c) => {
                          const isCurrent = curL.r === r && curL.c === c;
                          const cellVal = r === 0 || c === 0 ? 0 : r === 1 && c === 1 ? 1 : r >= 3 && c >= 2 ? 2 : r === 5 && c === 3 ? 3 : 1;
                          return (
                            <td
                              key={c}
                              className={`p-2 border border-border font-bold transition-all ${
                                isCurrent
                                  ? "bg-emerald-500/30 text-emerald-400 ring-2 ring-emerald-500 scale-105"
                                  : "text-foreground"
                              }`}
                            >
                              {r <= curL.r && c <= curL.c ? cellVal : "-"}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-4 w-full max-w-md text-center py-4">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
                Minimum Edit Operations
              </span>
              <div className="p-6 rounded-2xl bg-muted/20 border border-border flex flex-col items-center justify-center gap-2">
                <span className="text-xs font-mono text-muted-foreground uppercase font-bold">Levenshtein Edit Distance</span>
                <span className="text-4xl font-black font-mono text-emerald-400">3 Edits</span>
                <span className="text-xs font-mono text-muted-foreground mt-2">
                  Replace 'H' with 'R' ──> Delete 'R' ──> Delete 'E'
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>{algo === "lcs" ? curL.desc : curE.desc}</span>
        </div>
      </Card>
    </div>
  );
}
