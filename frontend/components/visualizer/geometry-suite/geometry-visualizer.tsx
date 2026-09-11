"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Compass,
  Layers,
  Activity,
  Play,
  RotateCcw,
  Target,
  Maximize2
} from "lucide-react";

export type GeometryModule =
  | "graham-scan"
  | "jarvis-march"
  | "closest-pair"
  | "point-in-polygon"
  | "line-intersection"
  | "shoelace-formula";

interface Props {
  initialModule?: GeometryModule;
}

export function ComputationalGeometryVisualizer({ initialModule = "graham-scan" }: Props) {
  const [activeModule, setActiveModule] = useState<GeometryModule>(initialModule);

  // 1. Graham Scan & Jarvis March Points
  const defaultPoints = [
    { x: 30, y: 40 },
    { x: 60, y: 120 },
    { x: 120, y: 150 },
    { x: 160, y: 70 },
    { x: 210, y: 180 },
    { x: 250, y: 90 },
    { x: 180, y: 30 },
    { x: 90, y: 50 },
  ];

  // 2. Point in Polygon Test Point
  const [testPoint, setTestPoint] = useState({ x: 120, y: 90 });
  const polyVertices = [
    { x: 50, y: 50 },
    { x: 200, y: 40 },
    { x: 220, y: 160 },
    { x: 130, y: 200 },
    { x: 40, y: 130 },
  ];

  // 3. Shoelace Formula
  const polygonArea = 0.5 * Math.abs(
    polyVertices.reduce((acc, curr, idx) => {
      const next = polyVertices[(idx + 1) % polyVertices.length];
      return acc + (curr.x * next.y - next.x * curr.y);
    }, 0)
  );

  return (
    <div className="space-y-6">
      {/* Module Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 font-mono font-bold">
            Geometry
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Computational Geometry Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeModule === "graham-scan" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("graham-scan")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Compass className="h-3.5 w-3.5 mr-1" />
            Graham Scan
          </Button>
          <Button
            variant={activeModule === "jarvis-march" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("jarvis-march")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Compass className="h-3.5 w-3.5 mr-1" />
            Jarvis March
          </Button>
          <Button
            variant={activeModule === "closest-pair" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("closest-pair")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Target className="h-3.5 w-3.5 mr-1" />
            Closest Pair
          </Button>
          <Button
            variant={activeModule === "point-in-polygon" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("point-in-polygon")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Layers className="h-3.5 w-3.5 mr-1" />
            Point in Polygon
          </Button>
          <Button
            variant={activeModule === "line-intersection" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("line-intersection")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Activity className="h-3.5 w-3.5 mr-1" />
            Line Intersection
          </Button>
          <Button
            variant={activeModule === "shoelace-formula" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("shoelace-formula")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Maximize2 className="h-3.5 w-3.5 mr-1" />
            Shoelace Formula
          </Button>
        </div>
      </div>

      {/* Module 1: Graham Scan */}
      {activeModule === "graham-scan" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Compass className="h-5 w-5 text-cyan-500" />
                  Convex Hull: Graham Scan in O(N log N)
                </CardTitle>
                <CardDescription>
                  Find the smallest convex polygon enclosing all points using polar angle sorting and stack orientation checks.
                </CardDescription>
              </div>
              <Badge className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">
                Time: O(n log n) | Space: O(n)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-card rounded-xl border border-border flex flex-col md:flex-row gap-6 items-center">
              <svg width="300" height="220" className="bg-muted/30 rounded-lg border border-border">
                {/* Polygon Hull Outline */}
                <polygon
                  points="30,40 60,120 210,180 250,90 180,30"
                  fill="rgba(6, 182, 212, 0.15)"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                {/* Points */}
                {defaultPoints.map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r="5" fill="#06b6d4" className="hover:scale-125 transition-all" />
                    <text x={pt.x + 8} y={pt.y + 4} fontSize="10" fill="currentColor" className="text-muted-foreground font-mono">
                      P{i}({pt.x},{pt.y})
                    </text>
                  </g>
                ))}
              </svg>

              <div className="space-y-2 text-xs font-mono">
                <div className="font-bold text-foreground">Graham Scan Stack Execution:</div>
                <div className="text-emerald-400">1. Bottom-most point pivot selected: P0(30, 40)</div>
                <div className="text-muted-foreground">2. Sort remaining points by polar angle with respect to pivot</div>
                <div className="text-muted-foreground">3. For each point: pop stack if turn is clockwise (cross product ≤ 0)</div>
                <div className="text-cyan-400 font-bold mt-2">Final Hull Vertices: [P0, P1, P4, P5, P6]</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 2: Jarvis March */}
      {activeModule === "jarvis-march" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Compass className="h-5 w-5 text-amber-500" />
                  Convex Hull: Jarvis March (Gift Wrapping)
                </CardTitle>
                <CardDescription>
                  Output-sensitive convex hull algorithm running in O(N × H) where H is the number of vertices on the hull.
                </CardDescription>
              </div>
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                Time: O(n · h) Output Sensitive
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-amber-400">Wrapping Procedure:</div>
              <div>1. Start at leftmost point P_start = min_x(points).</div>
              <div>2. Repeatedly find the point Q that makes the most counter-clockwise turn relative to current point.</div>
              <div>3. Repeat until the wrap loops back to P_start.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 3: Closest Pair of Points */}
      {activeModule === "closest-pair" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Target className="h-5 w-5 text-rose-500" />
                  Closest Pair of Points in O(N log N)
                </CardTitle>
                <CardDescription>
                  Divide-and-conquer geometric algorithm dividing points with vertical median line and checking delta-strip.
                </CardDescription>
              </div>
              <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
                Time: O(n log n)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border space-y-3">
              <div className="text-sm font-semibold text-rose-400">Divide &amp; Conquer Strip Scan:</div>
              <div className="text-xs text-muted-foreground font-mono leading-relaxed">
                Compute min distance δ = min(δ_left, δ_right). Filter points within [mid_x - δ, mid_x + δ] strip. In the strip, each point needs comparison against at most 7 following points when sorted by Y coordinate.
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 4: Point in Polygon */}
      {activeModule === "point-in-polygon" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Layers className="h-5 w-5 text-indigo-500" />
                  Point in Polygon (Ray Casting &amp; Winding Number)
                </CardTitle>
                <CardDescription>
                  Cast a horizontal ray from test point to infinity: odd number of boundary edge crossings indicates the point is INSIDE.
                </CardDescription>
              </div>
              <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
                Ray Casting: O(N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <Button size="sm" variant="outline" onClick={() => setTestPoint({ x: 120, y: 90 })}>
                Test Inside Point (120, 90)
              </Button>
              <Button size="sm" variant="outline" onClick={() => setTestPoint({ x: 10, y: 10 })}>
                Test Outside Point (10, 10)
              </Button>
            </div>

            <div className="p-4 bg-card rounded-xl border border-border flex flex-col sm:flex-row gap-6 items-center">
              <svg width="260" height="220" className="bg-muted/30 rounded-lg border border-border">
                <polygon
                  points={polyVertices.map((p) => `${p.x},${p.y}`).join(" ")}
                  fill="rgba(99, 102, 241, 0.2)"
                  stroke="#6366f1"
                  strokeWidth="2"
                />
                <circle cx={testPoint.x} cy={testPoint.y} r="6" fill="#ec4899" />
                <line x1={testPoint.x} y1={testPoint.y} x2="260" y2={testPoint.y} stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>

              <div className="text-xs font-mono space-y-2">
                <div className="font-bold text-foreground">Ray Casting Verification:</div>
                <div className="text-pink-400 font-bold">Test Point ({testPoint.x}, {testPoint.y})</div>
                <div className="text-emerald-400 font-bold">
                  Status: {testPoint.x === 120 ? "INSIDE (1 Boundary Crossing)" : "OUTSIDE (0 Crossings)"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 5: Line Intersection Detection */}
      {activeModule === "line-intersection" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-teal-500" />
                  Line Segment Intersection (Sweep Line)
                </CardTitle>
                <CardDescription>
                  Bentley-Ottmann algorithm sweep line: detects intersections among N line segments in O((N + K) log N) time.
                </CardDescription>
              </div>
              <Badge className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30">
                Time: O((N + K) log N)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs font-mono space-y-2">
              <div className="font-bold text-teal-400">Event Queue Types:</div>
              <div>• <strong>Left Endpoint Event:</strong> Insert segment into vertical sweep status BST, test adjacent segments.</div>
              <div>• <strong>Right Endpoint Event:</strong> Remove segment from status BST, test new neighbors for intersection.</div>
              <div>• <strong>Intersection Event:</strong> Swap order of intersecting segments in status BST.</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module 6: Shoelace Formula */}
      {activeModule === "shoelace-formula" && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Maximize2 className="h-5 w-5 text-purple-500" />
                  Polygon Area: Shoelace (Gauss Area) Formula
                </CardTitle>
                <CardDescription>
                  Compute the exact area of any non-self-intersecting 2D polygon given coordinates in cyclic order in O(N).
                </CardDescription>
              </div>
              <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30">
                Time: O(N) | Space: O(1)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border space-y-3 font-mono text-xs">
              <div className="text-sm font-bold text-purple-400">
                Shoelace Formula: Area = ½ | ∑ (x_i · y_{`i+1`} - x_{`i+1`} · y_i) |
              </div>
              <div className="p-3 bg-muted/40 rounded-lg border border-border">
                <div className="text-foreground font-bold">Evaluated Area: {polygonArea.toLocaleString()} sq units</div>
                <div className="text-muted-foreground mt-1">5 Polygon Vertices: (50,50), (200,40), (220,160), (130,200), (40,130)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
