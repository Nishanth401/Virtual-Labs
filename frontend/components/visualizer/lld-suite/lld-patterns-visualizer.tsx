"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Boxes,
  Layers,
  Sparkles,
  Workflow,
  Share2,
  ShieldCheck,
  RotateCcw,
  Activity,
  Code2,
  FileCode
} from "lucide-react";

export type LLDModule =
  | "visitor-pattern"
  | "strategy-pattern"
  | "adapter-pattern"
  | "composite-pattern"
  | "chain-of-responsibility"
  | "decorator-pattern"
  | "proxy-pattern"
  | "template-method"
  | "iterator-pattern";

interface Props {
  initialModule?: LLDModule;
}

export function LLDPatternsVisualizer({ initialModule = "strategy-pattern" }: Props) {
  const [activeModule, setActiveModule] = useState<LLDModule>(initialModule);

  // Strategy Demo State
  const [activeStrategy, setActiveStrategy] = useState<"paypal" | "credit-card" | "crypto">("credit-card");

  // Chain of Responsibility Demo State
  const [activeLogRole, setActiveLogRole] = useState<"info" | "warning" | "error">("error");

  return (
    <div className="space-y-6">
      {/* Module Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono font-bold">
            OOP &amp; LLD
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Low-Level Design &amp; SOLID Design Patterns Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeModule === "strategy-pattern" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("strategy-pattern")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Boxes className="h-3.5 w-3.5 mr-1" />
            Strategy
          </Button>
          <Button
            variant={activeModule === "visitor-pattern" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("visitor-pattern")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Activity className="h-3.5 w-3.5 mr-1" />
            Visitor
          </Button>
          <Button
            variant={activeModule === "adapter-pattern" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("adapter-pattern")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Share2 className="h-3.5 w-3.5 mr-1" />
            Adapter
          </Button>
          <Button
            variant={activeModule === "composite-pattern" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("composite-pattern")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Layers className="h-3.5 w-3.5 mr-1" />
            Composite
          </Button>
          <Button
            variant={activeModule === "chain-of-responsibility" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("chain-of-responsibility")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Workflow className="h-3.5 w-3.5 mr-1" />
            Chain of Resp
          </Button>
          <Button
            variant={activeModule === "decorator-pattern" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("decorator-pattern")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Decorator
          </Button>
          <Button
            variant={activeModule === "proxy-pattern" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("proxy-pattern")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <ShieldCheck className="h-3.5 w-3.5 mr-1" />
            Proxy
          </Button>
          <Button
            variant={activeModule === "template-method" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("template-method")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <FileCode className="h-3.5 w-3.5 mr-1" />
            Template Method
          </Button>
          <Button
            variant={activeModule === "iterator-pattern" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("iterator-pattern")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Code2 className="h-3.5 w-3.5 mr-1" />
            Iterator
          </Button>
        </div>
      </div>

      {/* Module 1: Strategy Pattern */}
      {activeModule === "strategy-pattern" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Boxes className="h-5 w-5 text-indigo-500" />
                  Strategy Pattern: Runtime Algorithm Interchangeability
                </CardTitle>
                <CardDescription>
                  Define a family of algorithms, encapsulate each one, and make them interchangeable at runtime (Open/Closed Principle).
                </CardDescription>
              </div>
              <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
                SOLID: Open / Closed
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-3">
              <Button size="sm" variant={activeStrategy === "credit-card" ? "default" : "outline"} onClick={() => setActiveStrategy("credit-card")}>
                Credit Card Strategy
              </Button>
              <Button size="sm" variant={activeStrategy === "paypal" ? "default" : "outline"} onClick={() => setActiveStrategy("paypal")}>
                PayPal Strategy
              </Button>
              <Button size="sm" variant={activeStrategy === "crypto" ? "default" : "outline"} onClick={() => setActiveStrategy("crypto")}>
                Crypto (USDC) Strategy
              </Button>
            </div>

            <div className="p-4 bg-card rounded-xl border border-border space-y-3 font-mono text-xs">
              <div className="text-indigo-400 font-bold">Active PaymentContext Output:</div>
              <div className="p-3 bg-muted/40 rounded-lg border border-border">
                {activeStrategy === "credit-card" && "paymentStrategy.pay(amount) → Charging via Stripe Gateway with 2.9% fee."}
                {activeStrategy === "paypal" && "paymentStrategy.pay(amount) → Redirecting to PayPal OAuth sandbox checkout."}
                {activeStrategy === "crypto" && "paymentStrategy.pay(amount) → Broadcasting Ethereum ERC-20 smart contract transfer."}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 2: Visitor Pattern */}
      {activeModule === "visitor-pattern" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-rose-500" />
                  Visitor Pattern: Double Dispatch
                </CardTitle>
                <CardDescription>
                  Separate an algorithm from an object structure on which it operates, allowing new operations without modifying node classes.
                </CardDescription>
              </div>
              <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
                Single Responsibility
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-rose-400">Double Dispatch Mechanism:</div>
              <div>element.accept(visitor) ──→ visitor.visitConcreteElement(this)</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 3: Adapter Pattern */}
      {activeModule === "adapter-pattern" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-teal-500" />
                  Adapter Pattern: Wrapper Translation
                </CardTitle>
                <CardDescription>
                  Convert the interface of a class into another interface clients expect, enabling incompatible interfaces to collaborate.
                </CardDescription>
              </div>
              <Badge className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30">
                Liskov Substitution
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-teal-400">Target JSON Interface ⇄ Adaptee XML Legacy Service</div>
              <div>Adapter.request() converts outgoing JSON payload into XML format for legacy backend API.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 4: Composite Pattern */}
      {activeModule === "composite-pattern" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Layers className="h-5 w-5 text-amber-500" />
                  Composite Pattern: Tree Hierarchies
                </CardTitle>
                <CardDescription>
                  Compose objects into tree structures to represent part-whole hierarchies. Clients treat individual objects and compositions uniformly.
                </CardDescription>
              </div>
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                Single Responsibility
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-amber-400">File System Hierarchy (Directory vs File):</div>
              <div>Folder.getSize() recursively sums file.getSize() across all nested children uniformly.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 5: Chain of Responsibility */}
      {activeModule === "chain-of-responsibility" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-purple-500" />
                  Chain of Responsibility: Middleware Pipeline
                </CardTitle>
                <CardDescription>
                  Pass request along a chain of handlers. Upon receiving a request, each handler decides to process it or pass to next handler.
                </CardDescription>
              </div>
              <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30">
                Decoupled Handlers
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button size="sm" variant={activeLogRole === "info" ? "default" : "outline"} onClick={() => setActiveLogRole("info")}>
                Info Level
              </Button>
              <Button size="sm" variant={activeLogRole === "warning" ? "default" : "outline"} onClick={() => setActiveLogRole("warning")}>
                Warning Level
              </Button>
              <Button size="sm" variant={activeLogRole === "error" ? "default" : "outline"} onClick={() => setActiveLogRole("error")}>
                Fatal Error Level
              </Button>
            </div>

            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-1">
              <div className="font-bold text-purple-400">Pipeline Execution:</div>
              <div>1. ConsoleLogger: Handled</div>
              {activeLogRole !== "info" && <div>2. FileLogger: Handled warning/error</div>}
              {activeLogRole === "error" && <div className="text-rose-400 font-bold">3. PagerDutyAlertHandler: Paging on-call engineer!</div>}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 6: Decorator Pattern */}
      {activeModule === "decorator-pattern" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-pink-500" />
                  Decorator Pattern: Dynamic Wrapping
                </CardTitle>
                <CardDescription>
                  Attach additional responsibilities to an object dynamically without subclass explosion.
                </CardDescription>
              </div>
              <Badge className="bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30">
                Open / Closed
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-pink-400">Stream Wrapping Example:</div>
              <div>new CompressionDecorator(new EncryptionDecorator(new FileDataSource(&quot;data.txt&quot;)))</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 7: Proxy Pattern */}
      {activeModule === "proxy-pattern" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-cyan-500" />
                  Proxy Pattern: Access Control &amp; Lazy Loading
                </CardTitle>
                <CardDescription>
                  Provide a surrogate or placeholder for another object to control access to it (Virtual, Protection, or Remote Proxy).
                </CardDescription>
              </div>
              <Badge className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">
                Single Responsibility
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-cyan-400">Lazy Loading HighResImageProxy:</div>
              <div>Does not allocate 50MB RAM until render() is explicitly called by viewport.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 8: Template Method */}
      {activeModule === "template-method" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-yellow-500" />
                  Template Method Pattern
                </CardTitle>
                <CardDescription>
                  Define skeleton of algorithm in superclass, deferring exact implementation of steps to subclasses without altering structure.
                </CardDescription>
              </div>
              <Badge className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30">
                Liskov Substitution
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-yellow-400">DataMiner Invariant Pipeline:</div>
              <div>mine() → openFile() → parseData() [abstract] → analyzeData() → closeFile()</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 9: Iterator Pattern */}
      {activeModule === "iterator-pattern" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-emerald-500" />
                  Iterator Pattern: Collection Traversal
                </CardTitle>
                <CardDescription>
                  Access elements of an aggregate object sequentially without exposing its underlying representation.
                </CardDescription>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                Decoupled Traversal
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-emerald-400">Universal Interface:</div>
              <div>while (iterator.hasNext()) {`{`} Item x = iterator.next(); {`}`}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
