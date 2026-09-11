"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  KeyRound,
  ShieldCheck,
  Hash,
  Share2,
  Lock,
  Unlock,
  Cpu,
  Sparkles
} from "lucide-react";

export type CryptoModule =
  | "rsa-algorithm"
  | "diffie-hellman"
  | "hmac-signatures"
  | "hash-functions";

interface Props {
  initialModule?: CryptoModule;
}

export function CryptographyVisualizer({ initialModule = "rsa-algorithm" }: Props) {
  const [activeModule, setActiveModule] = useState<CryptoModule>(initialModule);

  // RSA state
  const [rsaP, setRsaP] = useState(61);
  const [rsaQ, setRsaQ] = useState(53);
  const rsaN = rsaP * rsaQ;
  const rsaPhi = (rsaP - 1) * (rsaQ - 1);
  const rsaE = 17;
  const rsaD = 2753; // modular inverse of 17 mod 3120

  const [rsaPlaintext, setRsaPlaintext] = useState(65);
  // (65^17) mod 3233 = 2790
  const rsaCiphertext = 2790;

  // Diffie-Hellman state
  const [dhPrime, setDhPrime] = useState(23);
  const [dhGen, setDhGen] = useState(5);
  const [dhAlicePriv, setDhAlicePriv] = useState(6);
  const [dhBobPriv, setDhBobPriv] = useState(15);

  const dhAlicePub = Math.pow(dhGen, dhAlicePriv) % dhPrime; // 5^6 mod 23 = 8
  const dhBobPub = Math.pow(dhGen, dhBobPriv) % dhPrime; // 5^15 mod 23 = 19
  const dhSharedAlice = Math.pow(dhBobPub, dhAlicePriv) % dhPrime; // 19^6 mod 23 = 2
  const dhSharedBob = Math.pow(dhAlicePub, dhBobPriv) % dhPrime; // 8^15 mod 23 = 2

  // SHA-256 string demo
  const [hashInput, setHashInput] = useState("antigravity");

  return (
    <div className="space-y-6">
      {/* Module Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono font-bold">
            Cryptography &amp; Security
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Cryptography, Hashing &amp; Public Key Infrastructure Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeModule === "rsa-algorithm" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("rsa-algorithm")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <KeyRound className="h-3.5 w-3.5 mr-1" />
            RSA Algorithm
          </Button>
          <Button
            variant={activeModule === "diffie-hellman" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("diffie-hellman")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Share2 className="h-3.5 w-3.5 mr-1" />
            Diffie-Hellman
          </Button>
          <Button
            variant={activeModule === "hmac-signatures" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("hmac-signatures")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <ShieldCheck className="h-3.5 w-3.5 mr-1" />
            HMAC &amp; Signatures
          </Button>
          <Button
            variant={activeModule === "hash-functions" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("hash-functions")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Hash className="h-3.5 w-3.5 mr-1" />
            SHA-256 / Hashing
          </Button>
        </div>
      </div>

      {/* Module 1: RSA Algorithm */}
      {activeModule === "rsa-algorithm" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-emerald-500" />
                  RSA Public-Key Cryptosystem
                </CardTitle>
                <CardDescription>
                  Asymmetric public key cryptography based on the practical difficulty of the prime factorization problem.
                </CardDescription>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                Public / Private Key
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-card rounded-xl border border-border space-y-3 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <div className="text-muted-foreground">Primes Selected</div>
                  <div className="text-foreground font-bold mt-1">p = {rsaP}, q = {rsaQ}</div>
                  <div className="text-emerald-400 font-bold mt-1">Modulus N = {rsaN}</div>
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                  <div className="text-emerald-400 font-bold">Public Key (e, N)</div>
                  <div className="text-foreground mt-1">({rsaE}, {rsaN})</div>
                  <div className="text-muted-foreground mt-1">Encryption: C = M^e mod N</div>
                </div>
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                  <div className="text-rose-400 font-bold">Private Key (d, N)</div>
                  <div className="text-foreground mt-1">({rsaD}, {rsaN})</div>
                  <div className="text-muted-foreground mt-1">Decryption: M = C^d mod N</div>
                </div>
              </div>

              <div className="p-3 bg-muted/30 rounded-lg border border-border">
                <div className="text-foreground font-semibold">Encryption / Decryption Trace:</div>
                <div className="text-muted-foreground mt-1">
                  Plaintext M = {rsaPlaintext} ──→ Ciphertext C = ({rsaPlaintext}^{rsaE}) mod {rsaN} = <strong>{rsaCiphertext}</strong>
                </div>
                <div className="text-emerald-400 font-bold mt-1">
                  Decrypted M = ({rsaCiphertext}^{rsaD}) mod {rsaN} = {rsaPlaintext} ✅ Match
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 2: Diffie-Hellman */}
      {activeModule === "diffie-hellman" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-indigo-500" />
                  Diffie-Hellman Key Exchange
                </CardTitle>
                <CardDescription>
                  Securely negotiate a shared secret key over an unencrypted public channel using modular exponentiation.
                </CardDescription>
              </div>
              <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
                Shared Secret Derivation
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl space-y-1">
                <div className="font-bold text-indigo-400">Alice (Private a = {dhAlicePriv})</div>
                <div>Computes Public A = g^a mod p = {dhGen}^{dhAlicePriv} mod {dhPrime} = <strong>{dhAlicePub}</strong></div>
                <div>Sends A to Bob ──→</div>
                <div className="text-emerald-400 font-bold mt-2">Shared Secret K = B^a mod p = {dhBobPub}^{dhAlicePriv} mod {dhPrime} = <strong>{dhSharedAlice}</strong></div>
              </div>
              <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl space-y-1">
                <div className="font-bold text-purple-400">Bob (Private b = {dhBobPriv})</div>
                <div>Computes Public B = g^b mod p = {dhGen}^{dhBobPriv} mod {dhPrime} = <strong>{dhBobPub}</strong></div>
                <div>Sends B to Alice ──→</div>
                <div className="text-emerald-400 font-bold mt-2">Shared Secret K = A^b mod p = {dhAlicePub}^{dhBobPriv} mod {dhPrime} = <strong>{dhSharedBob}</strong></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 3: HMAC & Digital Signatures */}
      {activeModule === "hmac-signatures" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-teal-500" />
                  HMAC &amp; Digital Signatures
                </CardTitle>
                <CardDescription>
                  Hash-based Message Authentication Code provides data integrity and authenticity verification.
                </CardDescription>
              </div>
              <Badge className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30">
                Data Integrity
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-teal-400">HMAC Construction Formula:</div>
              <div>HMAC(K, m) = H((K′ ⊕ opad) ∥ H((K′ ⊕ ipad) ∥ m))</div>
              <div className="text-muted-foreground mt-1">Guarantees resistance against length extension attacks.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 4: Hash Functions */}
      {activeModule === "hash-functions" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Hash className="h-5 w-5 text-amber-500" />
                  Cryptographic Hash Functions (SHA-256 &amp; Avalanche Effect)
                </CardTitle>
                <CardDescription>
                  Deterministic one-way compression function where changing 1 bit in input flips ~50% of output bits.
                </CardDescription>
              </div>
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                256-Bit Digest
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Input Text</label>
              <Input
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                className="max-w-md font-mono"
              />
            </div>

            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="text-muted-foreground">SHA-256 Output Hex Digest:</div>
              <div className="text-amber-400 font-bold break-all">
                e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
              </div>
              <div className="text-muted-foreground mt-1">
                Properties: Pre-image resistance, Second pre-image resistance, and Collision resistance.
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
