"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { HeapType } from "./types"
import { Play } from "lucide-react"

interface HeapControlsProps {
  onInsert: (value: number) => void
  onInsertMany: (values: string) => void
  onClear: () => void
  onToggleType: () => void
  heapType: HeapType
}

export function HeapControls({
  onInsert,
  onInsertMany,
  onClear,
  onToggleType,
  heapType,
}: HeapControlsProps) {
  const [value, setValue] = useState("")
  const [bulkInput, setBulkInput] = useState("")
  const [isPlayingDemo, setIsPlayingDemo] = useState(false)

  const handlePlayDemo = () => {
    if (isPlayingDemo) return;
    setIsPlayingDemo(true);
    onClear();

    const sample = [45, 20, 80, 15, 60, 95, 30];
    sample.forEach((num, idx) => {
      setTimeout(() => {
        onInsert(num);
        if (idx === sample.length - 1) {
          setIsPlayingDemo(false);
        }
      }, (idx + 1) * 450);
    });
  };

  const handleInsert = () => {
    const num = Number(value)
    if (!isNaN(num) && value.trim() !== "") {
      onInsert(num)
      setValue("")
    }
  }

  const handleBulkInsert = () => {
    if (bulkInput.trim()) {
      onInsertMany(bulkInput)
      setBulkInput("")
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-card/50 backdrop-blur-sm border-border/80">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold">Heap Controls</CardTitle>
            <Button
              size="sm"
              onClick={handlePlayDemo}
              disabled={isPlayingDemo}
              className="h-7 text-xs font-bold gap-1.5 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
            >
              <Play className="h-3.5 w-3.5" />
              <span>{isPlayingDemo ? "Heapifying..." : "Play Demo"}</span>
            </Button>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border/40">
            <span className="text-xs text-muted-foreground font-mono">Heap Property Mode:</span>
            <div className="flex items-center space-x-2">
              <Switch
                id="heap-type"
                checked={heapType === 'max'}
                onCheckedChange={onToggleType}
              />
              <Label htmlFor="heap-type" className="text-xs font-bold font-mono">
                {heapType === 'max' ? "Max Heap (Root is Max)" : "Min Heap (Root is Min)"}
              </Label>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Single Insert</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
                onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
                className="flex-1"
              />
              <Button onClick={handleInsert}>Insert</Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bulk Insert (comma-separated)</Label>
            <div className="flex gap-2">
              <Input
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                placeholder="e.g., 1, 2, 3, 4"
                onKeyDown={(e) => e.key === 'Enter' && handleBulkInsert()}
                className="flex-1"
              />
              <Button onClick={handleBulkInsert}>Insert All</Button>
            </div>
          </div>

          <Button 
            variant="destructive" 
            onClick={onClear}
            className="w-full"
          >
            Clear Heap
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 