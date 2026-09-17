"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Play } from "lucide-react"

interface BinaryTreeControlsProps {
  onInsert: (value: number) => void
  onClear: () => void
  onTraversal: (type: "inorder" | "preorder" | "postorder") => void
  traversalHistory: number[]
  isAnimating: boolean
}

export function BinaryTreeControls({
  onInsert,
  onClear,
  onTraversal,
  traversalHistory,
  isAnimating
}: BinaryTreeControlsProps) {
  const [value, setValue] = useState("")
  const [isPlayingDemo, setIsPlayingDemo] = useState(false)

  const handlePlayDemo = () => {
    if (isAnimating || isPlayingDemo) return;
    setIsPlayingDemo(true);
    onClear();

    const sampleNodes = [50, 25, 75, 15, 35, 65, 85];
    sampleNodes.forEach((num, idx) => {
      setTimeout(() => {
        onInsert(num);
        if (idx === sampleNodes.length - 1) {
          setTimeout(() => {
            onTraversal("inorder");
            setIsPlayingDemo(false);
          }, 800);
        }
      }, (idx + 1) * 350);
    });
  };

  const handleInsert = () => {
    const num = Number(value)
    if (!isNaN(num) && value.trim() !== "") {
      onInsert(num)
      setValue("")
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-card/50 backdrop-blur-sm border-border/80">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold">Tree Operations</CardTitle>
            <Button
              size="sm"
              onClick={handlePlayDemo}
              disabled={isAnimating || isPlayingDemo}
              className="h-7 text-xs font-bold gap-1.5 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
            >
              <Play className="h-3.5 w-3.5" />
              <span>{isPlayingDemo ? "Building..." : "Play Demo (BST)"}</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter node value"
              onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
              disabled={isAnimating || isPlayingDemo}
              className="flex-1"
            />
            <Button onClick={handleInsert} disabled={isAnimating || isPlayingDemo || !value.trim()}>
              Insert
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Traversal Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Button 
              onClick={() => onTraversal("inorder")} 
              disabled={isAnimating}
              variant="secondary"
              className="w-full"
            >
              In-Order
            </Button>
            <Button 
              onClick={() => onTraversal("preorder")} 
              disabled={isAnimating}
              variant="secondary"
              className="w-full"
            >
              Pre-Order
            </Button>
            <Button 
              onClick={() => onTraversal("postorder")} 
              disabled={isAnimating}
              variant="secondary"
              className="w-full"
            >
              Post-Order
            </Button>
            <Button 
              variant="destructive" 
              onClick={onClear}
              className="w-full"
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {traversalHistory.length > 0 && (
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Traversal History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {traversalHistory.map((value, index) => (
                <div 
                  key={index}
                  className="bg-primary/10 text-primary px-3 py-1.5 rounded-md text-sm font-medium
                            border border-primary/20 shadow-sm"
                >
                  {value}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}