"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Shuffle, Sparkles, FastForward } from "lucide-react";

interface SortingControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStepNext: () => void;
  onStepPrev: () => void;
  onReset: () => void;
  onRandomize: () => void;
  onCustomArray: (arr: number[]) => void;
  speedMs: number;
  onSpeedChange: (speed: number) => void;
  comparisons: number;
  swaps: number;
  currentStepIndex: number;
  totalSteps: number;
}

export function SortingControls({
  isPlaying,
  onPlay,
  onPause,
  onStepNext,
  onStepPrev,
  onReset,
  onRandomize,
  onCustomArray,
  speedMs,
  onSpeedChange,
  comparisons,
  swaps,
  currentStepIndex,
  totalSteps,
}: SortingControlsProps) {
  const [customInput, setCustomInput] = useState("");

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = customInput
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n > 0 && n <= 100);

    if (parsed.length >= 3 && parsed.length <= 12) {
      onCustomArray(parsed);
      setCustomInput("");
    } else {
      alert("Please enter between 3 and 12 numbers (values 1 to 100), separated by commas.");
    }
  };

  return (
    <Card className="shadow-sm border-secondary/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span>Animation & Step Controls</span>
          <span className="text-xs font-normal text-muted-foreground">
            Step {totalSteps > 0 ? currentStepIndex + 1 : 0} of {totalSteps}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Playback action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {isPlaying ? (
            <Button size="sm" variant="default" onClick={onPause} className="flex-1 min-w-[90px] gap-1.5 bg-amber-600 hover:bg-amber-700 text-white">
              <Pause className="h-4 w-4" /> Pause
            </Button>
          ) : (
            <Button size="sm" variant="default" onClick={onPlay} className="flex-1 min-w-[90px] gap-1.5 bg-primary hover:bg-primary/90">
              <Play className="h-4 w-4" /> Play
            </Button>
          )}

          <Button size="sm" variant="outline" onClick={onStepPrev} disabled={currentStepIndex === 0 || isPlaying} title="Step Back">
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button size="sm" variant="outline" onClick={onStepNext} disabled={currentStepIndex >= totalSteps - 1 || isPlaying} title="Step Next">
            <SkipForward className="h-4 w-4" />
          </Button>

          <Button size="sm" variant="outline" onClick={onReset} title="Reset">
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button size="sm" variant="secondary" onClick={onRandomize} title="Randomize Array">
            <Shuffle className="h-4 w-4" />
          </Button>
        </div>

        {/* Speed Selector */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1"><FastForward className="h-3.5 w-3.5" /> Speed</span>
            <span>{speedMs === 1200 ? "0.5x (Slow)" : speedMs === 600 ? "1.0x (Normal)" : "2.0x (Fast)"}</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <Button
              type="button"
              size="sm"
              variant={speedMs === 1200 ? "default" : "outline"}
              className="text-xs h-7"
              onClick={() => onSpeedChange(1200)}
            >
              0.5x
            </Button>
            <Button
              type="button"
              size="sm"
              variant={speedMs === 600 ? "default" : "outline"}
              className="text-xs h-7"
              onClick={() => onSpeedChange(600)}
            >
              1.0x
            </Button>
            <Button
              type="button"
              size="sm"
              variant={speedMs === 200 ? "default" : "outline"}
              className="text-xs h-7"
              onClick={() => onSpeedChange(200)}
            >
              2.0x
            </Button>
          </div>
        </div>

        {/* Metrics Counter */}
        <div className="grid grid-cols-2 gap-2 bg-muted/40 p-2.5 rounded-lg border border-border/50 text-center">
          <div>
            <div className="text-xs text-muted-foreground">Comparisons</div>
            <div className="text-lg font-bold font-mono text-primary">{comparisons}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Swaps / Shifts</div>
            <div className="text-lg font-bold font-mono text-amber-500">{swaps}</div>
          </div>
        </div>

        {/* Custom Array Input */}
        <form onSubmit={handleApplyCustom} className="space-y-2 pt-1 border-t border-border/50">
          <Label className="text-xs font-semibold">Custom Input Array</Label>
          <div className="flex gap-2">
            <Input
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g. 54, 23, 89, 12, 65"
              className="h-8 text-xs font-mono"
            />
            <Button type="submit" size="sm" variant="secondary" className="h-8 text-xs">
              Apply
            </Button>
          </div>
          <div className="flex gap-1.5 pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-[11px] h-6 px-2 text-muted-foreground"
              onClick={() => onCustomArray([10, 20, 30, 40, 50, 60, 70])}
            >
              Sorted
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-[11px] h-6 px-2 text-muted-foreground"
              onClick={() => onCustomArray([70, 60, 50, 40, 30, 20, 10])}
            >
              Reversed
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-[11px] h-6 px-2 text-muted-foreground"
              onClick={() => onCustomArray([15, 20, 25, 60, 35, 40, 50])}
            >
              Nearly Sorted
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
