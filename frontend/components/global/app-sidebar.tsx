"use client"

import * as React from "react"
import { Binary, Home, Database, BrainCircuit, TreePine, List, SquareStack, SquareChevronLeft, Equal, MessageSquare, X, Hash, ArrowRightLeft, ArrowDownUp, Award, FlaskConical } from "lucide-react"
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
    title: "Data Structures Lab",
    url: "/labs/data-structures",
    icon: List,
  },
  {
    title: "Student Portal",
    url: "/dashboard",
    icon: Award,
  },
]

const sortingAlgorithms = [
  {
    name: "Bubble Sort",
    url: "/visualizer/bubble-sort",
    icon: ArrowDownUp,
    description: "Adjacent element comparison and bubbling pass",
  },
  {
    name: "Selection Sort",
    url: "/visualizer/selection-sort",
    icon: ArrowDownUp,
    description: "Minimum index scanning and in-place swapping",
  },
  {
    name: "Insertion Sort",
    url: "/visualizer/insertion-sort",
    icon: ArrowDownUp,
    description: "Key element extraction and backward shifting",
  },
  {
    name: "Merge Sort",
    url: "/visualizer/merge-sort",
    icon: ArrowDownUp,
    description: "Divide and conquer recursive subarray merging",
  },
  {
    name: "Cyclic Sort",
    url: "/visualizer/cyclic-sort",
    icon: ArrowDownUp,
    description: "In-place cycle placement pattern for 1 to N values",
  },
  {
    name: "Quick Sort",
    url: "/visualizer/quick-sort",
    icon: ArrowDownUp,
    description: "Partitioning around pivot with recursive sorting",
  },
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