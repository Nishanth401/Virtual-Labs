import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Search, Code2, Info, CheckCircle2, SkipForward, SkipBack } from "lucide-react";

export function StringSuiteVisualizer({ defaultMode = "trie" }: { defaultMode?: "kmp" | "trie" } = {}) {
  const [mode, setMode] = useState<"kmp" | "trie">(defaultMode);

  // --- TRIE STATE ---
  const [trieSearchPrefix, setTrieSearchPrefix] = useState<string>("ca");
  const [trieMatches, setTrieMatches] = useState<string[]>(["cat", "car", "can"]);
  const [trieMessage, setTrieMessage] = useState<string>("Trie Prefix Tree: words 'cat', 'car', 'can' share path 'c' ──> 'a'. Instant O(L) prefix autocomplete.");
  const [isPlayingTrieDemo, setIsPlayingTrieDemo] = useState<boolean>(false);

  // --- KMP STATE ---
  const pattern = "ABABAC";
  const lps = [0, 0, 1, 2, 3, 0];
  const kmpText = "ABABDABABACD";
  const [kmpIndex, setKmpIndex] = useState<number>(0);
  const [kmpPatternIdx, setKmpPatternIdx] = useState<number>(0);
  const [isPlayingKmp, setIsPlayingKmp] = useState<boolean>(false);
  const [kmpMessage, setKmpMessage] = useState<string>("KMP avoids text pointer backtrack by pre-computing the Longest Prefix Suffix (LPS) table.");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTrieFilter = (prefix: string) => {
    setTrieSearchPrefix(prefix);
    const trieWords = ["cat", "car", "can", "dog", "dot"];
    const results = trieWords.filter((w) => w.startsWith(prefix.toLowerCase()));
    setTrieMatches(results);
    setTrieMessage(`Autocomplete query '${prefix}': Found ${results.length} word(s) [${results.join(", ")}].`);
  };

  const playTrieDemo = () => {
    if (isPlayingTrieDemo) return;
    setIsPlayingTrieDemo(true);
    const queries = ["c", "ca", "cat", "car", "d", "do", "dog"];
    queries.forEach((q, idx) => {
      setTimeout(() => {
        handleTrieFilter(q);
        if (idx === queries.length - 1) {
          setIsPlayingTrieDemo(false);
        }
      }, (idx + 1) * 700);
    });
  };

  // KMP Step Simulation
  const handleKmpStep = () => {
    if (kmpIndex >= kmpText.length) {
      setKmpMessage("KMP search scan completed through end of string!");
      setIsPlayingKmp(false);
      return;
    }

    if (kmpText[kmpIndex] === pattern[kmpPatternIdx]) {
      const nextPatIdx = kmpPatternIdx + 1;
      const nextTxtIdx = kmpIndex + 1;
      if (nextPatIdx === pattern.length) {
        setKmpMessage(`PATTERN MATCH FOUND! Full match '${pattern}' at index ${nextTxtIdx - pattern.length}.`);
        setKmpIndex(nextTxtIdx);
        setKmpPatternIdx(lps[nextPatIdx - 1]);
      } else {
        setKmpMessage(`Char matched: Text[${kmpIndex}]='${kmpText[kmpIndex]}' == Pattern[${kmpPatternIdx}]='${pattern[kmpPatternIdx]}'. Advancing pointers.`);
        setKmpIndex(nextTxtIdx);
        setKmpPatternIdx(nextPatIdx);
      }
    } else {
      if (kmpPatternIdx !== 0) {
        const fallback = lps[kmpPatternIdx - 1];
        setKmpMessage(`Mismatch at Text[${kmpIndex}] ('${kmpText[kmpIndex]}') != Pattern[${kmpPatternIdx}] ('${pattern[kmpPatternIdx]}'). Falling back pattern pointer from ${kmpPatternIdx} to LPS=${fallback} without rewinding text.`);
        setKmpPatternIdx(fallback);
      } else {
        setKmpMessage(`Mismatch at Pattern[0]. Advancing text index ${kmpIndex} -> ${kmpIndex + 1}.`);
        setKmpIndex(kmpIndex + 1);
      }
    }
  };

  useEffect(() => {
    if (isPlayingKmp) {
      timerRef.current = setTimeout(() => {
        if (kmpIndex < kmpText.length) {
          handleKmpStep();
        } else {
          setIsPlayingKmp(false);
        }
      }, 900);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlayingKmp, kmpIndex, kmpPatternIdx]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 font-mono">
            Phase 2: Core Data Structures
          </Badge>
          <span className="text-sm font-bold text-foreground">String Algorithms &amp; Trie Autocomplete</span>
        </div>

        <div className="flex items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={mode === "trie" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("trie")}
            className="h-7 text-xs font-semibold"
          >
            Trie (Prefix Tree Autocomplete)
          </Button>
          <Button
            variant={mode === "kmp" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("kmp")}
            className="h-7 text-xs font-semibold"
          >
            KMP (LPS Table Matching)
          </Button>
        </div>
      </div>

      {/* VIEW 1: TRIE PREFIX TREE */}
      {mode === "trie" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={playTrieDemo}
                disabled={isPlayingTrieDemo}
                className="h-8 text-xs font-bold gap-1.5 bg-primary text-primary-foreground shadow-xs"
              >
                <Play className="h-3.5 w-3.5" />
                <span>{isPlayingTrieDemo ? "Querying..." : "Play Autocomplete Demo"}</span>
              </Button>
              <span className="text-xs font-mono text-muted-foreground ml-2">Prefix:</span>
              <Input
                type="text"
                placeholder="Prefix (e.g. ca)..."
                value={trieSearchPrefix}
                onChange={(e) => handleTrieFilter(e.target.value)}
                className="w-28 h-8 text-xs font-mono"
              />
            </div>
            <div className="text-xs font-mono text-muted-foreground">
              Suggestions: <strong className="text-emerald-500">{trieMatches.join(", ") || "No matches"}</strong>
            </div>
          </div>

          <Card className="border-border bg-card/80 p-6 flex flex-col items-center">
            {/* SVG Trie Diagram */}
            <svg className="w-full max-w-lg h-60 overflow-visible">
              {/* Root */}
              <circle cx="250" cy="30" r="16" className="fill-card stroke-primary stroke-2" />
              <text x="250" y="34" textAnchor="middle" className="text-[10px] font-mono font-bold fill-foreground">ROOT</text>

              {/* Edge Root -> c and Root -> d */}
              <line x1="250" y1="46" x2="160" y2="90" stroke="currentColor" strokeWidth="2" className="text-border" />
              <line x1="250" y1="46" x2="340" y2="90" stroke="currentColor" strokeWidth="2" className="text-border" />

              {/* Node 'c' and 'd' */}
              <circle cx="160" cy="90" r="14" className="fill-primary/20 stroke-primary stroke-2" />
              <text x="160" y="94" textAnchor="middle" className="text-xs font-mono font-bold fill-primary">'c'</text>

              <circle cx="340" cy="90" r="14" className="fill-muted stroke-border stroke-2" />
              <text x="340" y="94" textAnchor="middle" className="text-xs font-mono font-bold fill-foreground">'d'</text>

              {/* Edge c -> a */}
              <line x1="160" y1="104" x2="160" y2="150" stroke="currentColor" strokeWidth="2" className="text-border" />
              <circle cx="160" cy="150" r="14" className="fill-primary/20 stroke-primary stroke-2" />
              <text x="160" y="154" textAnchor="middle" className="text-xs font-mono font-bold fill-primary">'a'</text>

              {/* Branches from 'a': 't', 'r', 'n' */}
              <line x1="160" y1="164" x2="90" y2="210" stroke="currentColor" strokeWidth="2" className="text-border" />
              <line x1="160" y1="164" x2="160" y2="210" stroke="currentColor" strokeWidth="2" className="text-border" />
              <line x1="160" y1="164" x2="230" y2="210" stroke="currentColor" strokeWidth="2" className="text-border" />

              {/* Leaf Nodes */}
              <circle cx="90" cy="210" r="14" className="fill-emerald-500/20 stroke-emerald-500 stroke-2" />
              <text x="90" y="214" textAnchor="middle" className="text-xs font-mono font-bold fill-emerald-400">'t' ✓</text>

              <circle cx="160" cy="210" r="14" className="fill-emerald-500/20 stroke-emerald-500 stroke-2" />
              <text x="160" y="214" textAnchor="middle" className="text-xs font-mono font-bold fill-emerald-400">'r' ✓</text>

              <circle cx="230" cy="210" r="14" className="fill-emerald-500/20 stroke-emerald-500 stroke-2" />
              <text x="230" y="214" textAnchor="middle" className="text-xs font-mono font-bold fill-emerald-400">'n' ✓</text>
            </svg>

            <div className="w-full max-w-lg mt-4 p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>{trieMessage}</span>
            </div>
          </Card>
        </div>
      )}

      {/* VIEW 2: KMP PATTERN MATCHING */}
      {mode === "kmp" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => setIsPlayingKmp(!isPlayingKmp)}
                className="h-8 text-xs font-bold gap-1.5 bg-primary text-primary-foreground shadow-xs"
              >
                {isPlayingKmp ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                <span>{isPlayingKmp ? "Pause" : "Play KMP Matching"}</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleKmpStep}
                disabled={isPlayingKmp || kmpIndex >= kmpText.length}
                className="h-8 text-xs gap-1"
              >
                <SkipForward className="h-3.5 w-3.5" /> Step
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => { setIsPlayingKmp(false); setKmpIndex(0); setKmpPatternIdx(0); setKmpMessage("Reset KMP text scanning."); }}
                className="h-8 text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="text-xs font-mono text-muted-foreground">
              Text: <strong>{kmpText}</strong>
            </div>
          </div>

          <Card className="border-border bg-card/80 p-6 space-y-4">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block text-center">
              Precomputed LPS (Longest Prefix Suffix) Array
            </span>

            {/* Pattern vs LPS Strip */}
            <div className="flex items-center justify-center gap-2 py-2 overflow-x-auto">
              {pattern.split("").map((ch, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-1">
                  <div className={`h-12 w-14 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${
                    idx === kmpPatternIdx ? "border-amber-500 bg-amber-500/20 text-amber-500 scale-105" : "border-primary bg-primary/10 text-primary"
                  }`}>
                    {ch}
                  </div>
                  <div className="h-8 w-14 rounded-lg border border-border bg-card flex items-center justify-center font-mono text-xs font-bold text-emerald-400">
                    LPS: {lps[idx]}
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">[{idx}]</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2 text-foreground">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>{kmpMessage}</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
