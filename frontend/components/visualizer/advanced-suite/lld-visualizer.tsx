"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Server, Play, RotateCcw, ChevronRight, ChevronLeft, Info, CheckCircle2, Box } from "lucide-react";

export function LLDVisualizer() {
  const [activePattern, setActivePattern] = useState<"solid" | "observer" | "factory">("solid");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">
            Phase 6: Applied Systems &amp; LLD
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            SOLID Principles &amp; Gang of Four (GoF) Patterns
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">
          Low-Level Design (LLD) &amp; OOP Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Interactive architecture and machine-coding visualizer. Master SOLID design principles, UML class diagrams, and design patterns frequently tested in FAANG LLD interviews.
        </p>
      </div>

      {/* Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-2">
          <Button
            variant={activePattern === "solid" ? "default" : "outline"}
            size="sm"
            onClick={() => setActivePattern("solid")}
            className="h-8 text-xs font-bold rounded-xl"
          >
            SOLID Principles
          </Button>
          <Button
            variant={activePattern === "observer" ? "default" : "outline"}
            size="sm"
            onClick={() => setActivePattern("observer")}
            className="h-8 text-xs font-bold rounded-xl"
          >
            Observer Pattern (Pub/Sub)
          </Button>
          <Button
            variant={activePattern === "factory" ? "default" : "outline"}
            size="sm"
            onClick={() => setActivePattern("factory")}
            className="h-8 text-xs font-bold rounded-xl"
          >
            Factory Pattern
          </Button>
        </div>

        <Badge variant="outline" className="text-[10px] font-mono bg-primary/10 text-primary border-primary/20">
          Clean Architecture &amp; UML
        </Badge>
      </div>

      {/* Main Canvas */}
      <Card className="p-6 bg-card border-border/80 rounded-2xl space-y-6">
        {activePattern === "solid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { letter: "S", name: "Single Responsibility", desc: "A class should have one, and only one, reason to change." },
              { letter: "O", name: "Open/Closed", desc: "Software entities should be open for extension, but closed for modification." },
              { letter: "L", name: "Liskov Substitution", desc: "Subtypes must be substitutable for their base types without altering correctness." },
              { letter: "I", name: "Interface Segregation", desc: "Clients should not be forced to depend on methods they do not use." },
              { letter: "D", name: "Dependency Inversion", desc: "Depend on abstractions, not concretions. High & low level modules decoupled." }
            ].map((s) => (
              <div key={s.letter} className="p-4 rounded-2xl bg-muted/20 border border-border flex flex-col items-center text-center shadow-xs">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground font-mono font-bold text-xl flex items-center justify-center shadow-md mb-2">
                  {s.letter}
                </div>
                <span className="text-xs font-bold text-foreground font-heading">{s.name}</span>
                <span className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">{s.desc}</span>
              </div>
            ))}
          </div>
        ) : activePattern === "observer" ? (
          <div className="space-y-4 max-w-lg mx-auto text-center py-4">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-bold">
              Subject (Publisher) ───notify()───> Observers (Subscribers)
            </span>
            <div className="p-6 rounded-2xl bg-muted/30 border border-border space-y-4">
              <div className="p-3 bg-primary/20 border border-primary/40 rounded-xl text-primary font-mono text-xs font-bold">
                Subject (StockMarketTicker)
              </div>
              <div className="text-muted-foreground font-mono text-xs">▼ emits priceUpdate(price)</div>
              <div className="grid grid-cols-3 gap-2">
                {["MobileAppObserver", "EmailAlertObserver", "AnalyticsLogger"].map(obs => (
                  <div key={obs} className="p-2.5 rounded-xl bg-card border border-border text-[11px] font-mono font-bold text-foreground">
                    {obs}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-lg mx-auto text-center py-4">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-bold">
              Factory Method Pattern: Decoupled Object Creation
            </span>
            <div className="p-6 rounded-2xl bg-muted/30 border border-border space-y-4">
              <div className="p-3 bg-indigo-500/20 border border-indigo-500/40 rounded-xl text-indigo-400 font-mono text-xs font-bold">
                VehicleFactory.createVehicle("sedan")
              </div>
              <div className="text-muted-foreground font-mono text-xs">▼ instantiates</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-card border border-border font-mono text-xs font-bold text-emerald-400">
                  Sedan : Vehicle
                </div>
                <div className="p-3 rounded-xl bg-card border border-border font-mono text-xs font-bold text-blue-400">
                  SUV : Vehicle
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Strip */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs font-mono flex items-center gap-2.5 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>
            {activePattern === "solid"
              ? "SOLID design principles ensure low coupling and high cohesion across enterprise codebases."
              : activePattern === "observer"
              ? "Observer Pattern decouples state changes in publishers from downstream consumers."
              : "Factory pattern allows instantiating subclasses without exposing creation logic to callers."}
          </span>
        </div>
      </Card>
    </div>
  );
}
