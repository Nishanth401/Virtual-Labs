"use client"

import * as React from "react"
import { Binary, Home, Database, BrainCircuit, TreePine, List, SquareStack, SquareChevronLeft, Equal, MessageSquare, X, Hash, ArrowRightLeft, ArrowDownUp, Award, FlaskConical, TrendingUp, Calculator, Layers, Flag, Vote } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/navigation/nav-main"
import { NavProjects } from "@/components/navigation/nav-projects"

const navItems = [
  {
    title: "VLab Home",
    url: "/",
    icon: FlaskConical,
  },
  {
    title: "Lab Catalogue",
    url: "/labs",
    icon: Database,
  },
  {
    title: "DSA Roadmap Labs",
    url: "/labs/data-structures",
    icon: BrainCircuit,
  },
  {
    title: "AI & ML Labs",
    url: "/labs/ai-machine-learning",
    icon: Binary,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
]

const sortingAlgorithms = [
  {
    name: "Bubble Sort",
    url: "/visualizer/bubble-sort",
    icon: ArrowDownUp,
    description: "Adjacent comparison and swapping pass with early exit",
  },
  {
    name: "Selection Sort",
    url: "/visualizer/selection-sort",
    icon: ArrowDownUp,
    description: "Finds minimum element in unsorted partition",
  },
  {
    name: "Insertion Sort",
    url: "/visualizer/insertion-sort",
    icon: ArrowDownUp,
    description: "Online card sorting with linear performance on nearly sorted inputs",
  },
  {
    name: "Merge Sort",
    url: "/visualizer/merge-sort",
    icon: ArrowDownUp,
    description: "Divide-and-conquer O(n log n) stable sorting",
  },
  {
    name: "Cyclic Sort",
    url: "/visualizer/cyclic-sort",
    icon: ArrowDownUp,
    description: "In-place placement pattern for numbers 1..N",
  },
  {
    name: "Quick Sort",
    url: "/visualizer/quick-sort",
    icon: ArrowDownUp,
    description: "Pivot partitioning and recursive sub-array sorting",
  },
]

const algorithmicPatterns = [
  {
    name: "Two Pointers Algorithm",
    url: "/visualizer/two-pointers",
    icon: ArrowRightLeft,
    description: "Inward & synchronized pointer stepping across sorted arrays",
  },
  {
    name: "Sliding Window Algorithm",
    url: "/visualizer/sliding-window",
    icon: ArrowRightLeft,
    description: "Contiguous window overlay tracking sub-segment metrics",
  },
  {
    name: "Kadane's Algorithm",
    url: "/visualizer/kadanes-algorithm",
    icon: TrendingUp,
    description: "Maximum contiguous subarray sum tracking",
  },
  {
    name: "Prefix Sum",
    url: "/visualizer/prefix-sum",
    icon: Calculator,
    description: "Precomputed cumulative sum array and O(1) Range Sum Query",
  },
  {
    name: "Difference Array",
    url: "/visualizer/difference-array",
    icon: Layers,
    description: "Efficient O(1) range updates with prefix sum reconstruction",
  },
  {
    name: "Dutch National Flag",
    url: "/visualizer/dutch-national-flag",
    icon: Flag,
    description: "3-way partitioning of 0s, 1s, and 2s in O(N)",
  },
  {
    name: "Boyer-Moore Majority Vote",
    url: "/visualizer/boyer-moore",
    icon: Vote,
    description: "Identify majority elements (> N/2) in O(N) time & O(1) space",
  },
]

const dataStructures = [
  {
    name: "Stack",
    url: "/visualizer/stack",
    icon: SquareStack,
    description: "LIFO data structure with push and pop operations",
  },  
  {
    name: "Queue",
    url: "/visualizer/queue",
    icon: SquareChevronLeft,
    description: "FIFO data structure with enqueue and dequeue operations",
  },  
  {
    name: "Linked List",
    url: "/visualizer/linked-list",
    icon: List,
    description: "Linear data structure with elements linked using pointers",
  },
  {
    name: "Binary Search Tree",
    url: "/visualizer/binary-tree",
    icon: Binary,
    description: "Basic binary tree with BST properties",
  },
  {
    name: "AVL Tree",
    url: "/visualizer/avl-tree",
    icon: TreePine,
    description: "Self-balancing binary search tree",
  },
  {
    name: "Heap",
    url: "/visualizer/heap",
    icon: Database,
    description: "Binary heap implementation with max/min heap variants",
  },
]

const applications = [
  {
    name: "Message Queue",
    url: "/visualizer/queue-applications",
    icon: MessageSquare,
    description: "Asynchronous message processing system with producers and consumers",
  },
  {
    name: "Infix to Postfix Conversion",
    url: "/visualizer/stack-applications",
    icon: Equal,
    description: "Convert infix expressions to postfix notation using a stack",
  },
  {
    name: "Polynomial Multiplication",
    url: "/visualizer/polynomial",
    icon: X,
    description: "Multiply two polynomials using linked lists",
  },
  {
    name: "Huffman Coding",
    url: "/visualizer/huffman",
    icon: Hash,
    description: "Data compression technique using Huffman prefix trees",
  },
  {
    name: "Dijkstra's Algorithm",
    url: "/visualizer/dijkstra",
    icon: ArrowRightLeft,
    description: "Graph shortest path search algorithm",
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-6 py-4 border-b flex items-center gap-2">
          <FlaskConical className="h-6 w-6 text-primary" />
          <h1 className="text-sm font-bold font-heading">Department Virtual Labs</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        <NavProjects
          title="Sorting Visualizers"
          projects={sortingAlgorithms.map(s => ({
            name: s.name,
            url: s.url,
            icon: s.icon,
            description: s.description,
          }))}
        />
        <NavProjects
          title="Array Algorithm Visualizer"
          projects={algorithmicPatterns.map(a => ({
            name: a.name,
            url: a.url,
            icon: a.icon,
            description: a.description,
          }))}
        />
        <NavProjects
          title="Data Structures"
          projects={dataStructures.map(ds => ({
            name: ds.name,
            url: ds.url,
            icon: ds.icon,
            description: ds.description,
          }))}
        />
        <NavProjects
          title="Applications & Graphs"
          projects={applications.map(app => ({
            name: app.name,
            url: app.url,
            icon: app.icon,
            description: app.description,
          }))}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}