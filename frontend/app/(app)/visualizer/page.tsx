import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, Binary, TreePine, Box, List, ArrowLeftRight, Calculator, MessageSquare, Hash, ArrowRightLeft, ArrowDownUp, Sparkles, FlaskConical } from "lucide-react"
import Link from "next/link"

const sections = {
  sorting: [
    {
      name: "Bubble Sort",
      description: "Adjacent comparison and swapping pass. O(n) best-case with swapped flag optimization.",
      href: "/visualizer/bubble-sort",
      icon: ArrowDownUp,
      badge: "O(n²)"
    },
    {
      name: "Selection Sort",
      description: "Finds minimum element in unsorted partition. Executes minimal swaps (at most n-1).",
      href: "/visualizer/selection-sort",
      icon: ArrowDownUp,
      badge: "O(n²)"
    },
    {
      name: "Insertion Sort",
      description: "Online card sorting. Adaptive O(n) linear performance on nearly sorted inputs.",
      href: "/visualizer/insertion-sort",
      icon: ArrowDownUp,
      badge: "Adaptive"
    },
  ],
  dataStructures: [
    {
      name: "Stack",
      description: "LIFO data structure supporting push, pop, and peek with overflow & underflow checks.",
      href: "/visualizer/stack",
      icon: ArrowLeftRight,
      badge: "LIFO"
    },
    {
      name: "Queue",
      description: "FIFO data structure for managing sequential ordered streams and buffer queues.",
      href: "/visualizer/queue",
      icon: ArrowLeftRight,
      badge: "FIFO"
    },
    {
      name: "Linked List",
      description: "Dynamic data structures with nodes connected via references (SLL, DLL, CSLL, CDLL).",
      href: "/visualizer/linked-list",
      icon: List,
      badge: "Dynamic"
    },
    {
      name: "Binary Search Tree",
      description: "Binary tree maintaining sorted invariant with average O(log n) search and insertion.",
      href: "/visualizer/binary-tree",
      icon: Binary,
      badge: "O(log n)"
    },
    {
      name: "AVL Tree",
      description: "Self-balancing BST maintaining strict height balance via LL, RR, LR, RL rotations.",
      href: "/visualizer/avl-tree",
      icon: TreePine,
      badge: "Self-Balancing"
    },
    {
      name: "Heap",
      description: "Complete binary tree satisfying heap invariant. Min-heap and Max-heap visualizations.",
      href: "/visualizer/heap",
      icon: Box,
      badge: "Priority Queue"
    },
  ],
  applications: [
    {
      name: "Infix to Postfix",
      description: "Convert arithmetic expressions to postfix notation using an operator stack.",
      href: "/visualizer/stack-applications",
      icon: Calculator,
      badge: "Stack App"
    },
    {
      name: "Message Queue",
      description: "Simulate asynchronous message queues with producer and consumer threads.",
      href: "/visualizer/queue-applications",
      icon: MessageSquare,
      badge: "Queue App"
    },
    {
      name: "Polynomial Multiplication",
      description: "Represent and multiply algebraic polynomials using linked list node arithmetic.",
      href: "/visualizer/polynomial",
      icon: Calculator,
      badge: "Linked List App"
    },
    {
      name: "Huffman Coding",
      description: "Lossless variable-length prefix data compression using Huffman frequency trees.",
      href: "/visualizer/huffman",
      icon: Hash,
      badge: "Tree App"
    },
    {
      name: "Dijkstra's Algorithm",
      description: "Find single-source shortest paths on weighted non-negative graphs.",
      href: "/visualizer/dijkstra",
      icon: ArrowRightLeft,
      badge: "Graph Search"
    },
  ]
}

export default function VisualizerHubPage() {
  return (
    <div className="container py-6 max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
            <FlaskConical className="h-3.5 w-3.5 mr-1" /> Department Simulator Suite
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-heading text-foreground">
          DSA Visualization Studio
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-2 leading-relaxed">
          Interactive step-by-step simulators to visualize data structures and algorithms in real time. Examine pointer movements, comparison passes, tree balancing, and graph traversals.
        </p>
      </div>

      <div className="space-y-10">
        {/* Sorting Algorithms Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
              <ArrowDownUp className="h-5 w-5 text-primary" />
              <span>Sorting Algorithms</span>
            </h2>
            <Badge variant="secondary" className="text-xs">3 Simulators</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.sorting.map((algo) => {
              const Icon = algo.icon
              return (
                <Link key={algo.href} href={algo.href}>
                  <Card className="h-full border-secondary/40 bg-card/60 hover:bg-muted/50 hover:border-primary/50 transition-all hover:shadow-md group">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                        <Badge variant="outline" className="text-[10px] font-mono">
                          {algo.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-base font-bold mt-2 group-hover:text-primary transition-colors">
                        {algo.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs leading-relaxed">
                        {algo.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Data Structures Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
              <List className="h-5 w-5 text-primary" />
              <span>Core Data Structures</span>
            </h2>
            <Badge variant="secondary" className="text-xs">6 Simulators</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.dataStructures.map((ds) => {
              const Icon = ds.icon
              return (
                <Link key={ds.href} href={ds.href}>
                  <Card className="h-full border-secondary/40 bg-card/60 hover:bg-muted/50 hover:border-primary/50 transition-all hover:shadow-md group">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                        <Badge variant="outline" className="text-[10px] font-mono">
                          {ds.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-base font-bold mt-2 group-hover:text-primary transition-colors">
                        {ds.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs leading-relaxed">
                        {ds.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Applications Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>Algorithmic Applications & Graphs</span>
            </h2>
            <Badge variant="secondary" className="text-xs">5 Applications</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.applications.map((app) => {
              const Icon = app.icon
              return (
                <Link key={app.href} href={app.href}>
                  <Card className="h-full border-secondary/40 bg-card/60 hover:bg-muted/50 hover:border-primary/50 transition-all hover:shadow-md group">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                        <Badge variant="outline" className="text-[10px] font-mono">
                          {app.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-base font-bold mt-2 group-hover:text-primary transition-colors">
                        {app.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs leading-relaxed">
                        {app.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}