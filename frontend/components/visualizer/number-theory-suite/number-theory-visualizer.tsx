"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calculator,
  Hash,
  Sparkles,
  Zap,
  KeyRound,
  Grid,
  Divide,
  Cpu,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export type NumberTheoryModule =
  | "gcd-lcm"
  | "extended-gcd"
  | "modular-arithmetic"
  | "fast-exponentiation"
  | "modular-inverse"
  | "sieve"
  | "prime-factorization"
  | "totient";

interface Props {
  initialModule?: NumberTheoryModule;
}

export function NumberTheoryVisualizer({ initialModule = "gcd-lcm" }: Props) {
  const [activeModule, setActiveModule] = useState<NumberTheoryModule>(initialModule);

  // 1. GCD / LCM
  const [gcdA, setGcdA] = useState(48);
  const [gcdB, setGcdB] = useState(18);

  const getGcdSteps = (a: number, b: number) => {
    const steps: { a: number; b: number; q: number; r: number }[] = [];
    let x = Math.abs(a);
    let y = Math.abs(b);
    if (y === 0) return { gcd: x, steps };
    while (y !== 0) {
      const q = Math.floor(x / y);
      const r = x % y;
      steps.push({ a: x, b: y, q, r });
      x = y;
      y = r;
    }
    return { gcd: x, steps, lcm: (a * b) / x };
  };
  const gcdResult = getGcdSteps(gcdA, gcdB);

  // 2. Extended GCD (ax + by = gcd(a,b))
  const [extA, setExtA] = useState(30);
  const [extB, setExtB] = useState(20);

  const extendedGcd = (a: number, b: number): { gcd: number; x: number; y: number } => {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    const res = extendedGcd(b, a % b);
    return {
      gcd: res.gcd,
      x: res.y,
      y: res.x - Math.floor(a / b) * res.y
    };
  };
  const extResult = extendedGcd(extA, extB);

  // 3. Modular Arithmetic
  const [modX, setModX] = useState(14);
  const [modY, setModY] = useState(9);
  const [modM, setModM] = useState(7);

  // 4. Fast Exponentiation
  const [baseVal, setBaseVal] = useState(3);
  const [expVal, setExpVal] = useState(13);
  const [modExp, setModExp] = useState(1000);

  const getBinaryExpSteps = (base: number, exp: number, mod: number) => {
    const steps: { bit: number; power: number; currentExp: number; currentAns: number }[] = [];
    let b = base % mod;
    let e = exp;
    let ans = 1;
    while (e > 0) {
      const bit = e & 1;
      if (bit === 1) {
        ans = (ans * b) % mod;
      }
      steps.push({ bit, power: b, currentExp: e, currentAns: ans });
      b = (b * b) % mod;
      e = Math.floor(e / 2);
    }
    return { ans, steps };
  };
  const binExpResult = getBinaryExpSteps(baseVal, expVal, modExp);

  // 5. Modular Inverse (Fermat & ExtGCD)
  const [invA, setInvA] = useState(3);
  const [invM, setInvM] = useState(11);

  // 6. Sieve of Eratosthenes
  const [sieveN, setSieveN] = useState(50);
  const computeSieve = (n: number) => {
    const limit = Math.min(n, 120);
    const isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    for (let p = 2; p * p <= limit; p++) {
      if (isPrime[p]) {
        for (let i = p * p; i <= limit; i += p) {
          isPrime[i] = false;
        }
      }
    }
    return isPrime;
  };
  const primesGrid = computeSieve(sieveN);

  // 7. Prime Factorization
  const [factorN, setFactorN] = useState(360);
  const getPrimeFactors = (num: number) => {
    let n = Math.abs(num);
    const factors: { prime: number; power: number }[] = [];
    for (let d = 2; d * d <= n; d++) {
      if (n % d === 0) {
        let count = 0;
        while (n % d === 0) {
          count++;
          n = Math.floor(n / d);
        }
        factors.push({ prime: d, power: count });
      }
    }
    if (n > 1) {
      factors.push({ prime: n, power: 1 });
    }
    return factors;
  };
  const primeFactors = getPrimeFactors(factorN);

  // 8. Euler's Totient φ(n)
  const [totientN, setTotientN] = useState(36);
  const computeTotient = (num: number) => {
    let n = num;
    let result = n;
    for (let p = 2; p * p <= n; p++) {
      if (n % p === 0) {
        while (n % p === 0) n = Math.floor(n / p);
        result -= Math.floor(result / p);
      }
    }
    if (n > 1) result -= Math.floor(result / n);
    return result;
  };
  const totientVal = computeTotient(totientN);

  return (
    <div className="space-y-6">
      {/* Module Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono font-bold">
            Number Theory
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Number Theory &amp; Discrete Math Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeModule === "gcd-lcm" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("gcd-lcm")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Divide className="h-3.5 w-3.5 mr-1" />
            GCD &amp; LCM
          </Button>
          <Button
            variant={activeModule === "extended-gcd" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("extended-gcd")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Calculator className="h-3.5 w-3.5 mr-1" />
            Extended GCD
          </Button>
          <Button
            variant={activeModule === "modular-arithmetic" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("modular-arithmetic")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Hash className="h-3.5 w-3.5 mr-1" />
            Modular Math
          </Button>
          <Button
            variant={activeModule === "fast-exponentiation" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("fast-exponentiation")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Zap className="h-3.5 w-3.5 mr-1" />
            Fast Exp
          </Button>
          <Button
            variant={activeModule === "modular-inverse" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("modular-inverse")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <KeyRound className="h-3.5 w-3.5 mr-1" />
            Modular Inverse
          </Button>
          <Button
            variant={activeModule === "sieve" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("sieve")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Grid className="h-3.5 w-3.5 mr-1" />
            Sieve
          </Button>
          <Button
            variant={activeModule === "prime-factorization" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("prime-factorization")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Factorization
          </Button>
          <Button
            variant={activeModule === "totient" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("totient")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Cpu className="h-3.5 w-3.5 mr-1" />
            Euler&apos;s Totient φ
          </Button>
        </div>
      </div>

      {/* Module 1: GCD & LCM */}
      {activeModule === "gcd-lcm" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Divide className="h-5 w-5 text-amber-500" />
                  Euclidean Algorithm for GCD &amp; LCM
                </CardTitle>
                <CardDescription>
                  Compute the Greatest Common Divisor in O(log min(a,b)) via successive remainder division steps.
                </CardDescription>
              </div>
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                Time: O(log min(a,b)) | Space: O(1)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">A</label>
                <Input type="number" value={gcdA} onChange={(e) => setGcdA(Number(e.target.value) || 1)} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">B</label>
                <Input type="number" value={gcdB} onChange={(e) => setGcdB(Number(e.target.value) || 1)} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-emerald-400">GCD({gcdA}, {gcdB}) = {gcdResult.gcd}</span>
                <span className="font-semibold text-blue-400">LCM({gcdA}, {gcdB}) = {gcdResult.lcm}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono border border-border rounded-lg">
                  <thead className="bg-muted/60 text-muted-foreground">
                    <tr>
                      <th className="p-2 text-left">Step</th>
                      <th className="p-2 text-left">Equation (a = b·q + r)</th>
                      <th className="p-2 text-left">Quotient (q)</th>
                      <th className="p-2 text-left">Remainder (r)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gcdResult.steps.map((s, idx) => (
                      <tr key={idx} className="border-b border-border/50">
                        <td className="p-2 font-bold">{idx + 1}</td>
                        <td className="p-2 font-mono text-amber-400">{s.a} = {s.b} × {s.q} + {s.r}</td>
                        <td className="p-2">{s.q}</td>
                        <td className="p-2 font-bold text-emerald-400">{s.r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 2: Extended GCD */}
      {activeModule === "extended-gcd" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-500" />
                  Extended Euclidean Algorithm (Bézout&apos;s Identity)
                </CardTitle>
                <CardDescription>
                  Find integer coefficients x, y such that a·x + b·y = gcd(a,b).
                </CardDescription>
              </div>
              <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
                Bézout: a·x + b·y = gcd
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">A</label>
                <Input type="number" value={extA} onChange={(e) => setExtA(Number(e.target.value) || 1)} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">B</label>
                <Input type="number" value={extB} onChange={(e) => setExtB(Number(e.target.value) || 1)} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border space-y-3">
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm font-mono">
                <div><strong>GCD:</strong> {extResult.gcd}</div>
                <div className="mt-1">
                  <strong>Bézout Formula:</strong> {extA} × ({extResult.x}) + {extB} × ({extResult.y}) = {extResult.gcd}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Verification: {extA * extResult.x} + {extB * extResult.y} = {extA * extResult.x + extB * extResult.y}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 3: Modular Arithmetic */}
      {activeModule === "modular-arithmetic" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Hash className="h-5 w-5 text-purple-500" />
                  Modular Arithmetic Congruences
                </CardTitle>
                <CardDescription>
                  Explore (A + B) mod M, (A - B) mod M, and (A × B) mod M with zero overflow wraps.
                </CardDescription>
              </div>
              <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30">
                Modulo Ring Z/mZ
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">A</label>
                <Input type="number" value={modX} onChange={(e) => setModX(Number(e.target.value) || 0)} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">B</label>
                <Input type="number" value={modY} onChange={(e) => setModY(Number(e.target.value) || 0)} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">M (Modulus)</label>
                <Input type="number" value={modM} onChange={(e) => setModM(Math.max(2, Number(e.target.value) || 2))} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-muted/40 rounded-lg border border-border">
                <div className="text-xs text-muted-foreground">Addition</div>
                <div className="text-base font-mono font-bold text-foreground mt-1">
                  ({modX} + {modY}) mod {modM} = {((modX % modM) + (modY % modM)) % modM}
                </div>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg border border-border">
                <div className="text-xs text-muted-foreground">Subtraction</div>
                <div className="text-base font-mono font-bold text-foreground mt-1">
                  ({modX} - {modY}) mod {modM} = {((((modX - modY) % modM) + modM) % modM)}
                </div>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg border border-border">
                <div className="text-xs text-muted-foreground">Multiplication</div>
                <div className="text-base font-mono font-bold text-foreground mt-1">
                  ({modX} × {modY}) mod {modM} = {((modX % modM) * (modY % modM)) % modM}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 4: Fast Exponentiation */}
      {activeModule === "fast-exponentiation" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Binary Exponentiation in O(log N)
                </CardTitle>
                <CardDescription>
                  Compute (Base^Exp) mod M by inspecting bits of exponent and repeated squaring.
                </CardDescription>
              </div>
              <Badge className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30">
                Time: O(log N) | Space: O(1)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Base</label>
                <Input type="number" value={baseVal} onChange={(e) => setBaseVal(Number(e.target.value) || 1)} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Exp (Power)</label>
                <Input type="number" value={expVal} onChange={(e) => setExpVal(Number(e.target.value) || 0)} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Mod M</label>
                <Input type="number" value={modExp} onChange={(e) => setModExp(Number(e.target.value) || 1)} />
              </div>
            </div>

            <div className="p-4 bg-card rounded-xl border border-border space-y-3">
              <div className="text-sm font-bold text-emerald-400">
                Result: ({baseVal}^{expVal}) mod {modExp} = {binExpResult.ans}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono border border-border rounded-lg">
                  <thead className="bg-muted/60 text-muted-foreground">
                    <tr>
                      <th className="p-2 text-left">Current Exp (e)</th>
                      <th className="p-2 text-left">Bit (e &amp; 1)</th>
                      <th className="p-2 text-left">Power Term</th>
                      <th className="p-2 text-left">Running Ans mod M</th>
                    </tr>
                  </thead>
                  <tbody>
                    {binExpResult.steps.map((st, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="p-2 font-bold">{st.currentExp} ({st.currentExp.toString(2)}₂)</td>
                        <td className="p-2 text-amber-400 font-bold">{st.bit}</td>
                        <td className="p-2">{st.power}</td>
                        <td className="p-2 font-bold text-emerald-400">{st.currentAns}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 5: Modular Multiplicative Inverse */}
      {activeModule === "modular-inverse" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-rose-500" />
                  Modular Multiplicative Inverse (Fermat &amp; ExtGCD)
                </CardTitle>
                <CardDescription>
                  Find A⁻¹ mod M such that (A × A⁻¹) ≡ 1 (mod M). If M is prime, Fermat&apos;s Little Theorem gives A^(M-2) mod M.
                </CardDescription>
              </div>
              <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
                A × A⁻¹ ≡ 1 (mod M)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">A</label>
                <Input type="number" value={invA} onChange={(e) => setInvA(Number(e.target.value) || 1)} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">M (Prime Modulus)</label>
                <Input type="number" value={invM} onChange={(e) => setInvM(Number(e.target.value) || 2)} />
              </div>
            </div>

            <div className="p-4 bg-card rounded-xl border border-border space-y-3">
              {extendedGcd(invA, invM).gcd === 1 ? (
                <div className="space-y-2 text-sm">
                  <div className="text-emerald-400 font-bold font-mono">
                    Inverse A⁻¹ mod {invM} = {((extendedGcd(invA, invM).x % invM) + invM) % invM}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Verification: ({invA} × {((extendedGcd(invA, invM).x % invM) + invM) % invM}) mod {invM} = {(invA * (((extendedGcd(invA, invM).x % invM) + invM) % invM)) % invM}
                  </div>
                </div>
              ) : (
                <div className="text-rose-400 text-sm font-semibold">
                  No modular inverse exists because gcd({invA}, {invM}) ≠ 1 (not coprime).
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 6: Sieve of Eratosthenes */}
      {activeModule === "sieve" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Grid className="h-5 w-5 text-emerald-500" />
                  Sieve of Eratosthenes Prime Generation
                </CardTitle>
                <CardDescription>
                  Generate all prime numbers up to N in O(N log log N) by iteratively crossing out multiples of primes.
                </CardDescription>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                Time: O(n log log n)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Upper Bound N (≤ 120)</label>
              <Input
                type="number"
                value={sieveN}
                onChange={(e) => setSieveN(Math.min(120, Number(e.target.value) || 2))}
                className="max-w-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 p-4 rounded-xl bg-card border border-border">
              {primesGrid.slice(2).map((isPrime, idx) => {
                const num = idx + 2;
                return (
                  <div
                    key={num}
                    className={`flex items-center justify-center p-2 rounded text-xs font-mono font-bold transition-all ${
                      isPrime
                        ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400 shadow-sm"
                        : "bg-muted/30 border border-border/40 text-muted-foreground line-through opacity-40"
                    }`}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 7: Prime Factorization */}
      {activeModule === "prime-factorization" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-cyan-500" />
                  Prime Factorization &amp; Divisor Tree
                </CardTitle>
                <CardDescription>
                  Decompose integer N into product of prime powers: N = p₁^a₁ × p₂^a₂ × ... × p_k^a_k in O(√N).
                </CardDescription>
              </div>
              <Badge className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">
                Time: O(√n)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Integer N</label>
              <Input
                type="number"
                value={factorN}
                onChange={(e) => setFactorN(Math.max(2, Number(e.target.value) || 2))}
                className="max-w-xs font-mono"
              />
            </div>

            <div className="p-4 bg-card rounded-xl border border-border space-y-3">
              <div className="text-sm font-semibold text-foreground">
                Prime Power Decomposition:
              </div>
              <div className="text-lg font-mono font-bold text-cyan-400">
                {factorN} = {primeFactors.map((f) => `${f.prime}${f.power > 1 ? `^${f.power}` : ""}`).join(" × ") || "1"}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                {primeFactors.map((f) => (
                  <div key={f.prime} className="p-3 bg-muted/40 rounded-lg border border-border text-center">
                    <span className="text-xs text-muted-foreground">Prime Factor</span>
                    <div className="text-base font-bold text-foreground font-mono">{f.prime}</div>
                    <span className="text-xs text-cyan-400 font-semibold">Exponent: {f.power}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 8: Euler's Totient */}
      {activeModule === "totient" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-indigo-500" />
                  Euler&apos;s Totient Function φ(n)
                </CardTitle>
                <CardDescription>
                  Counts the number of positive integers up to N that are relatively prime (coprime) to N: φ(n) = n · ∏ (1 - 1/p).
                </CardDescription>
              </div>
              <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
                φ(n) = n · ∏(1 - 1/p)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">N (Coprime Target)</label>
              <Input
                type="number"
                value={totientN}
                onChange={(e) => setTotientN(Math.max(1, Number(e.target.value) || 1))}
                className="max-w-xs font-mono"
              />
            </div>

            <div className="p-4 bg-card rounded-xl border border-border space-y-3">
              <div className="text-sm font-bold text-indigo-400 font-mono">
                φ({totientN}) = {totientVal} coprimes in [1, {totientN}]
              </div>
              <div className="text-xs text-muted-foreground">
                Crucial for RSA Cryptography public/private key pair generation: e · d ≡ 1 (mod φ(N)).
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
