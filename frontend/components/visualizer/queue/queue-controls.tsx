"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

import { Play } from "lucide-react"

interface QueueControlsProps {
  onEnqueue: (value: number) => void
  onDequeue: () => void
  onClear: () => void
  isAnimating: boolean
  isFull: boolean
  isEmpty: boolean
}

export function QueueControls({
  onEnqueue,
  onDequeue,
  onClear,
  isAnimating,
  isFull,
  isEmpty,
}: QueueControlsProps) {
  const [value, setValue] = useState("")
  const [isPlayingDemo, setIsPlayingDemo] = useState(false)

  const handlePlayDemo = () => {
    if (isAnimating || isPlayingDemo) return;
    setIsPlayingDemo(true);
    onClear();

    const sequence = [
      () => onEnqueue(10),
      () => onEnqueue(25),
      () => onEnqueue(40),
      () => onDequeue(),
      () => onEnqueue(55),
    ];

    sequence.forEach((action, idx) => {
      setTimeout(() => {
        action();
        if (idx === sequence.length - 1) {
          setIsPlayingDemo(false);
        }
      }, (idx + 1) * 750);
    });
  };

  const handleEnqueue = () => {
    const num = Number(value)
    if (!isNaN(num) && value.trim() !== "") {
      onEnqueue(num)
      setValue("")
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold">Queue Controls</CardTitle>
          <Button
            size="sm"
            onClick={handlePlayDemo}
            disabled={isAnimating || isPlayingDemo}
            className="h-7 text-xs font-bold gap-1.5 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
          >
            <Play className="h-3.5 w-3.5" />
            <span>{isPlayingDemo ? "Playing..." : "Play Demo"}</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            onKeyDown={(e) => e.key === 'Enter' && !isFull && handleEnqueue()}
            disabled={isAnimating || isFull}
            className="flex-1"
          />
          <Button 
            onClick={handleEnqueue}
            disabled={isAnimating || isFull || !value.trim()}
          >
            Enqueue
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={onDequeue}
            disabled={isAnimating || isEmpty}
            variant="secondary"
          >
            Dequeue (FIFO)
          </Button>
          <Button 
            onClick={onClear}
            disabled={isAnimating || isEmpty}
            variant="destructive"
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 