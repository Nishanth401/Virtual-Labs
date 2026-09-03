"use client"

import { Card } from "@/components/ui/card"
import { LinkedList } from "./types"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Layers, CornerDownLeft, Sparkles, Activity, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface LinkedListDisplayProps {
  list: LinkedList
  highlightedNodes: string[]
  message: string
  onSample?: () => void
  format?: (value: string) => React.ReactNode
}

function getNodeAddress(id: string): string {
  // Generate a realistic hexadecimal simulated memory address from the node ID
  const num = parseInt(id.replace(/\D/g, "") || "1", 10)
  const hex = (0x1000 + num * 0x18).toString(16).toUpperCase()
  return `0x${hex}`
}

export function LinkedListDisplay({ 
  list, 
  highlightedNodes, 
  message,
  onSample,
  format,
}: LinkedListDisplayProps) {

  const getNodeChain = () => {
    const chain: string[] = []
    let current = list.head
    const visited = new Set<string>()

    while (current) {
      const node = list.nodes.get(current)
      if (!node) break
      
      chain.push(current)
      visited.add(current)
      
      if (node.next && visited.has(node.next)) {
        break
      }
      
      current = node.next
    }

    return chain
  }

  const nodeChain = getNodeChain()
  const isCircular = list.type === 'CSLL' || list.type === 'CDLL'
  const isDoubly = list.type === 'DLL' || list.type === 'CDLL'

  const headNode = list.head ? list.nodes.get(list.head) : null
  const tailNode = list.tail ? list.nodes.get(list.tail) : null

  return (
    <div className="space-y-5">
      {/* Top Metric Cards matching image.png */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Metric 1: Size */}
          <div className="px-4 py-2 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">
                Node Count
              </span>
              <span className="text-base font-black text-foreground font-mono">
                {nodeChain.length} {nodeChain.length === 1 ? "Node" : "Nodes"}
              </span>
            </div>
            <div className="h-6 w-[1px] bg-border/60" />
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">
                HEAD Pointer
              </span>
              <span className="text-base font-black text-[#1e88e5] font-mono">
                {headNode ? `${headNode.value} (${getNodeAddress(headNode.id)})` : "NULL"}
              </span>
            </div>
            <div className="h-6 w-[1px] bg-border/60" />
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block font-mono">
                TAIL Pointer
              </span>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {tailNode ? `${tailNode.value} (${getNodeAddress(tailNode.id)})` : "NULL"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono bg-muted/50 border-border/80">
            {list.type === 'SLL' && 'Singly Linked List (Next Only)'}
            {list.type === 'DLL' && 'Doubly Linked List (Next & Prev)'}
            {list.type === 'CSLL' && 'Circular Singly Linked List'}
            {list.type === 'CDLL' && 'Circular Doubly Linked List'}
          </Badge>
        </div>
      </div>

      {/* Main Canvas Card */}
      <Card className="p-6 relative bg-card border border-border/80 shadow-sm min-h-[380px] flex flex-col justify-between overflow-x-auto">
        {/* Visual background dashed line guide */}
        <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 border-b border-dashed border-border/40 pointer-events-none" />

        {/* Empty State vs Active Chain */}
        {nodeChain.length === 0 ? (
          <div className="my-auto flex flex-col items-center justify-center text-center p-8 z-10 space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-dashed border-border">
              <span className="px-2.5 py-1 rounded bg-[#1e88e5]/10 text-[#1e88e5] font-mono text-xs font-bold">
                HEAD
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="px-4 py-2 rounded-lg bg-muted text-muted-foreground font-mono text-sm font-semibold border border-border">
                NULL (∅)
              </div>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Linked List is Currently Empty</h3>
              <p className="text-xs text-muted-foreground max-w-sm mt-1">
                Insert a node using the left control panel, or load sample nodes to explore memory pointers.
              </p>
            </div>
            {onSample && (
              <Button onClick={onSample} size="sm" className="gap-2 bg-[#1e88e5] hover:bg-[#1976d2] text-white">
                <Sparkles className="h-3.5 w-3.5" />
                Load Sample List [10 → 20 → 30 → 40]
              </Button>
            )}
          </div>
        ) : (
          <div className="my-auto py-12 px-4 flex items-center justify-start min-w-max z-10">
            {/* HEAD Pointer Tag */}
            <div className="flex flex-col items-center mr-3 self-center">
              <span className="px-2 py-0.5 rounded-full bg-[#1e88e5] text-white font-mono text-[10px] font-extrabold tracking-wider uppercase shadow-xs">
                HEAD
              </span>
              <div className="h-4 w-[2px] bg-[#1e88e5] my-0.5" />
              <ArrowRight className="h-4 w-4 text-[#1e88e5] rotate-90" />
            </div>

            {/* List Nodes Chain */}
            <div className="flex items-center gap-0">
              <AnimatePresence mode="popLayout">
                {nodeChain.map((nodeId, index) => {
                  const node = list.nodes.get(nodeId)!
                  const isHighlighted = highlightedNodes.includes(nodeId)
                  const isHead = index === 0
                  const isTail = index === nodeChain.length - 1
                  const addr = getNodeAddress(nodeId)

                  return (
                    <div key={nodeId} className="flex items-center">
                      {/* Single Node Card */}
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.8, y: 15 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1, 
                          y: 0,
                          borderColor: isHighlighted ? '#1e88e5' : 'hsl(var(--border))',
                          boxShadow: isHighlighted 
                            ? '0 0 0 3px rgba(30, 136, 229, 0.25), 0 8px 16px -4px rgba(0, 0, 0, 0.1)' 
                            : '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
                        }}
                        exit={{ opacity: 0, scale: 0.8, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className={`relative rounded-xl border bg-card flex flex-col items-stretch overflow-hidden select-none transition-colors ${
                          isHighlighted ? 'bg-[#1e88e5]/5 border-[#1e88e5]' : 'border-border/90'
                        }`}
                      >
                        {/* Node Top Header: Index + Address */}
                        <div className="px-3 py-1 bg-muted/50 border-b border-border/70 flex items-center justify-between text-[10px] font-mono text-muted-foreground gap-3">
                          <span className="font-semibold text-foreground/80">[{index}]</span>
                          <span>{addr}</span>
                        </div>

                        {/* Node Body: Prev Pointer (DLL) + Data Value + Next Pointer */}
                        <div className="flex items-center p-2.5 gap-2">
                          {isDoubly && (
                            <div className="px-1.5 py-1 rounded bg-muted/60 text-[9px] font-mono text-muted-foreground border border-border/50">
                              prev: {node.prev ? `[•]` : `null`}
                            </div>
                          )}

                          <div className={`px-4 py-2 min-w-[56px] text-center rounded-lg font-mono text-lg font-black tracking-tight ${
                            isHighlighted 
                              ? 'bg-[#1e88e5] text-white shadow-xs' 
                              : 'bg-muted/80 text-foreground'
                          }`}>
                            {format ? format(node.value) : node.value}
                          </div>

                          <div className="px-1.5 py-1 rounded bg-muted/60 text-[9px] font-mono text-muted-foreground border border-border/50">
                            next: [•]
                          </div>
                        </div>

                        {/* Floating Pointer Badges */}
                        {isTail && !isHead && (
                          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-mono text-[9px] font-extrabold uppercase shadow-xs">
                              TAIL
                            </span>
                          </div>
                        )}
                        {isHead && isTail && (
                          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                            <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-mono text-[9px] font-extrabold uppercase shadow-xs">
                              HEAD & TAIL
                            </span>
                          </div>
                        )}
                      </motion.div>

                      {/* Connectors Between Nodes */}
                      {index < nodeChain.length - 1 && (
                        <div className="px-2 flex flex-col items-center justify-center">
                          {/* Forward Arrow */}
                          <div className="flex items-center">
                            <div className={`h-[2px] w-6 transition-colors ${
                              isHighlighted && highlightedNodes.includes(nodeChain[index + 1])
                                ? 'bg-[#1e88e5]'
                                : 'bg-muted-foreground/60'
                            }`} />
                            <ArrowRight className={`h-4 w-4 -ml-1 transition-colors ${
                              isHighlighted && highlightedNodes.includes(nodeChain[index + 1])
                                ? 'text-[#1e88e5]'
                                : 'text-muted-foreground/60'
                            }`} />
                          </div>

                          {/* Backward Arrow for DLL */}
                          {isDoubly && (
                            <div className="flex items-center -mt-0.5">
                              <ArrowLeft className="h-4 w-4 -mr-1 text-muted-foreground/60" />
                              <div className="h-[2px] w-6 bg-muted-foreground/60" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </AnimatePresence>

              {/* End of List Terminator */}
              {!isCircular ? (
                <div className="flex items-center ml-2">
                  <div className="h-[2px] w-5 bg-muted-foreground/60" />
                  <ArrowRight className="h-4 w-4 -ml-1 text-muted-foreground/60" />
                  <div className="ml-1.5 px-3 py-1.5 rounded-lg border border-dashed border-border bg-muted/40 font-mono text-xs font-bold text-muted-foreground">
                    NULL (∅)
                  </div>
                </div>
              ) : (
                <div className="flex items-center ml-2">
                  <div className="h-[2px] w-4 bg-[#1e88e5]/60" />
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1e88e5]/10 border border-[#1e88e5]/30 text-[#1e88e5] font-mono text-[10px] font-bold">
                    <CornerDownLeft className="h-3 w-3" />
                    loops to HEAD
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Circular Return Wire Guide at bottom */}
        {isCircular && nodeChain.length > 1 && (
          <div className="mt-4 pt-3 border-t border-dashed border-[#1e88e5]/30 flex items-center justify-between text-xs font-mono text-[#1e88e5]">
            <div className="flex items-center gap-2">
              <CornerDownLeft className="h-4 w-4" />
              <span>Circular Loop: Tail Node ([{nodeChain.length - 1}]) ──next──&gt; Head Node ([0])</span>
            </div>
            <span className="text-[11px] text-muted-foreground">O(1) Head Access from Tail</span>
          </div>
        )}
      </Card>

      {/* Bottom Status & Complexity Banner matching image.png */}
      <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#1e88e5]/10 flex items-center justify-center text-[#1e88e5]">
            {highlightedNodes.length > 0 ? (
              <Activity className="h-5 w-5 animate-pulse" />
            ) : (
              <CheckCircle2 className="h-5 w-5" />
            )}
          </div>
          <div>
            <span className="text-xs font-bold text-foreground block">
              {message || "Status: Ready for list operations"}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isDoubly 
                ? "Doubly Linked List allows bidirectional traversal in O(1) step per link."
                : "Singly Linked List allows unidirectional forward traversal."}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Insert Front:</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
              O(1)
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Insert Back:</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-[#1e88e5] font-bold">
              O(1)
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Search:</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
              O(N)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}