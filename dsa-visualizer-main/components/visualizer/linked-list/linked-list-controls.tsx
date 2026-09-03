"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, ArrowRightLeft, Search, RefreshCw, Shuffle, Sparkles } from "lucide-react"

interface LinkedListControlsProps {
  onInsertFront: (value: number) => void
  onInsertBack: (value: number) => void
  onDeleteFront: () => void
  onDeleteBack: () => void
  onReverse: () => void
  onSearch: (value: number) => void
  onClear: () => void
  onSample: () => void
  isAnimating: boolean
  isEmpty: boolean
}

export function LinkedListControls({
  onInsertFront,
  onInsertBack,
  onDeleteFront,
  onDeleteBack,
  onReverse,
  onSearch,
  onClear,
  onSample,
  isAnimating,
  isEmpty,
}: LinkedListControlsProps) {
  const [value, setValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [insertAtFront, setInsertAtFront] = useState(false)

  const handleInsert = () => {
    const num = Number(value)
    if (!isNaN(num) && value.trim() !== "") {
      if (insertAtFront) {
        onInsertFront(num)
      } else {
        onInsertBack(num)
      }
      setValue("")
    }
  }

  const handleSearch = () => {
    const num = Number(searchValue)
    if (!isNaN(num) && searchValue.trim() !== "") {
      onSearch(num)
      setSearchValue("")
    }
  }

  const handleRandomInsert = () => {
    const rand = Math.floor(Math.random() * 90) + 10
    if (insertAtFront) {
      onInsertFront(rand)
    } else {
      onInsertBack(rand)
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-card/90 border-border/80 shadow-xs backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold tracking-tight">List Operations</CardTitle>
            <span className="text-[11px] font-mono text-muted-foreground uppercase">Interactive</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Insert Controls */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="insert-position" className="text-xs font-semibold text-muted-foreground">
                {insertAtFront ? "Insert Location: HEAD (Front)" : "Insert Location: TAIL (Back)"}
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground font-mono">Tail</span>
                <Switch
                  id="insert-position"
                  checked={insertAtFront}
                  onCheckedChange={setInsertAtFront}
                  disabled={isAnimating}
                />
                <span className="text-[11px] text-muted-foreground font-mono">Head</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value (e.g. 50)"
                onKeyDown={(e) => e.key === "Enter" && handleInsert()}
                disabled={isAnimating}
                className="flex-1 font-mono text-sm"
              />
              <Button 
                onClick={handleInsert}
                disabled={isAnimating || !value.trim()}
                className="gap-1.5 shadow-xs bg-[#1e88e5] hover:bg-[#1976d2] text-white"
              >
                <Plus className="h-4 w-4" />
                Insert
              </Button>
            </div>
          </div>

          {/* Search Controls */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground">Linear Search</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search value..."
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                disabled={isAnimating || isEmpty}
                className="flex-1 font-mono text-sm"
              />
              <Button 
                onClick={handleSearch}
                disabled={isAnimating || !searchValue.trim() || isEmpty}
                variant="secondary"
                className="gap-1.5"
              >
                <Search className="h-4 w-4" />
                Find
              </Button>
            </div>
          </div>

          {/* Delete Controls */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground">Delete Operations</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={onDeleteFront}
                disabled={isAnimating || isEmpty}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1 text-destructive" />
                Delete Head
              </Button>
              <Button 
                onClick={onDeleteBack}
                disabled={isAnimating || isEmpty}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1 text-destructive" />
                Delete Tail
              </Button>
            </div>
          </div>

          {/* Quick Actions & Reversal */}
          <div className="space-y-2 pt-1 border-t border-border/60">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={handleRandomInsert}
                disabled={isAnimating}
                variant="ghost"
                size="sm"
                className="text-xs"
              >
                <Shuffle className="h-3.5 w-3.5 mr-1 text-primary" />
                Random Node
              </Button>
              <Button 
                onClick={onReverse}
                disabled={isAnimating || isEmpty}
                variant="ghost"
                size="sm"
                className="text-xs"
              >
                <ArrowRightLeft className="h-3.5 w-3.5 mr-1 text-amber-500" />
                Reverse List
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={onSample}
                disabled={isAnimating}
                variant="outline"
                size="sm"
                className="text-xs border-primary/40 hover:bg-primary/5 text-primary"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Sample [10..40]
              </Button>
              <Button 
                onClick={onClear}
                disabled={isAnimating || isEmpty}
                variant="outline"
                size="sm"
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Clear All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}