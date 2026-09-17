"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

import { Play } from "lucide-react"

interface StackControlsProps {
  onPush: (value: number) => void
  onPop: () => void
  onClear: () => void
  isAnimating: boolean
  isFull: boolean
  isEmpty: boolean
}

export function StackControls({
  onPush,
  onPop,
  onClear,
  isAnimating,
  isFull,
  isEmpty,
}: StackControlsProps) {
  const [value, setValue] = useState("")
  const [isPlayingDemo, setIsPlayingDemo] = useState(false)

  const handlePlayDemo = () => {
    if (isAnimating || isPlayingDemo) return;
    setIsPlayingDemo(true);
    onClear();

    const sequence = [
      () => onPush(15),
      () => onPush(30),
      () => onPush(45),
      () => onPop(),
      () => onPush(60),
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

  const handlePush = () => {
    const num = Number(value)
    if (!isNaN(num) && value.trim() !== "") {
      onPush(num)
      setValue("")
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold">Stack Controls</CardTitle>
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
            onKeyDown={(e) => e.key === 'Enter' && !isFull && handlePush()}
            disabled={isAnimating || isFull}
            className="flex-1"
          />
          <Button 
            onClick={handlePush}
            disabled={isAnimating || isFull || !value.trim()}
          >
            Push
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={onPop}
            disabled={isAnimating || isEmpty}
            variant="secondary"
          >
            Pop (LIFO)
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