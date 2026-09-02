import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BrainCircuit,
  Binary,
  TreePine,
  Box,
  List,
  ArrowLeftRight,
  Calculator,
  MessageSquare,
  Hash,
  ArrowRightLeft,
  ArrowDownUp,
  Search,
  TrendingUp,
  Layers,
  Flag,
  Vote,
  Code2,
  GitBranch,
  Cpu,
  Zap,
  Crown,
  BarChart3,
  Network
} from "lucide-react";
import Link from "next/link";

interface TopicItem {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

interface SectionDefinition {
  title: string;
  items: TopicItem[];
}

const sections: Record<string, SectionDefinition> = {
  dataStructures: {
    title: "Core Data Structures (FAANG Phase 2)",
    items: [
      {
        name: "Linked List",
        description: "Dynamic data structure with nodes connected through references. Singly, doubly, and circular linked lists with pointer operations.",
        href: "/visualizer/linked-list",
        icon: List,
      },
      {
        name: "Stack",
        description: "LIFO data structure supporting push and pop operations. Visualize stack memory, monotonic stacks, and state transitions.",
        href: "/visualizer/stack",
        icon: ArrowLeftRight,
      },
      {
        name: "Queue",
        description: "FIFO data structure for managing ordered elements. Visualize enqueue, dequeue, circular queues, and deque operations.",
        href: "/visualizer/queue",
        icon: ArrowLeftRight,
      },
      {
        name: "Binary Search Tree",
        description: "Binary tree that maintains sorted data with O(log n) search, insert, and Inorder/Preorder/Postorder traversals.",
        href: "/visualizer/binary-tree",
        icon: Binary,
      },
      {
        name: "AVL Tree",
        description: "Self-balancing BST that maintains height balance factor via LL, RR, LR, and RL rotation passes in real-time.",
        href: "/visualizer/avl-tree",
        icon: TreePine,
      },
      {
        name: "Heap / Priority Queue",
        description: "Complete binary tree with heap property. Switch interactively between min-heap and max-heap array representations.",
        href: "/visualizer/heap",
        icon: Box,
      },
      {
        name: "Hash Table & Collisions",
        description: "Hash map internal mechanics showcasing Chaining (linked lists) and Open Addressing (linear probing) collision handling.",
        href: "/visualizer/hashing",
        icon: Hash,
      },
      {
        name: "Trie (Prefix Tree)",
        description: "Prefix tree for dictionary retrieval and search autocomplete. Visualize node branching and prefix matching.",
        href: "/visualizer/trie",
        icon: Code2,
      },
    ],
  },

  sortingAlgorithms: {
    title: "Sorting Algorithms (FAANG Phase 3)",
    items: [
      {
        name: "Bubble Sort",
        description: "Adjacent comparison and in-place swapping passes with animated vertical bars, sound synthesis, and live execution metrics.",
        href: "/visualizer/bubble-sort",
        icon: ArrowDownUp,
      },
      {
        name: "Selection Sort",
        description: "Scans unsorted partition to find minimum element and swaps it to beginning with minimal total memory writes.",
        href: "/visualizer/selection-sort",
        icon: ArrowDownUp,
      },
      {
        name: "Insertion Sort",
        description: "Adaptive online card-sorting algorithm that builds sorted output one item at a time via backward shifting.",
        href: "/visualizer/insertion-sort",
        icon: ArrowDownUp,
      },
      {
        name: "Merge Sort",
        description: "Divide-and-conquer O(n log n) stable sorting splitting arrays into halves and recursively merging ordered sub-arrays.",
        href: "/visualizer/merge-sort",
        icon: ArrowDownUp,
      },
      {
        name: "Quick Sort",
        description: "Lomuto pivot partitioning and recursive sub-array sorting. Highly cache-efficient industry standard algorithm.",
        href: "/visualizer/quick-sort",
        icon: ArrowDownUp,
      },
      {
        name: "Heap Sort",
        description: "Constructs max-heap from input and repeatedly extracts root to achieve in-place O(n log n) sorting.",
        href: "/visualizer/heap-sort",
        icon: ArrowDownUp,
      },
      {
        name: "Counting Sort",
        description: "Non-comparison linear integer sorting using frequency tallying arrays and cumulative prefix sums.",
        href: "/visualizer/counting-sort",
        icon: ArrowDownUp,
      },
      {
        name: "Cyclic Sort",
        description: "In-place number placement pattern for array containing numbers 1 to N in O(n) time and O(1) space.",
        href: "/visualizer/cyclic-sort",
        icon: ArrowDownUp,
      },
    ],
  },

  searchingAlgorithms: {
    title: "Searching Algorithms (FAANG Phase 3)",
    items: [
      {
        name: "Binary Search",
        description: "Logarithmic divide-and-conquer search halving search partition at each step using Low, Mid, and High pointers.",
        href: "/visualizer/binary-search",
        icon: Search,
      },
      {
        name: "Linear Search",
        description: "Sequential search checking elements one by one across unsorted memory arrays from start to finish.",
        href: "/visualizer/linear-search",
        icon: Search,
      },
    ],
  },

  algorithmicPatterns: {
    title: "Algorithmic Patterns (FAANG Phase 3)",
    items: [
      {
        name: "Two Pointers",
        description: "Inward & synchronized pointer stepping across sorted arrays. Solve Two Sum II and Container With Most Water in O(n).",
        href: "/visualizer/two-pointers",
        icon: ArrowRightLeft,
      },
      {
        name: "Sliding Window",
        description: "Contiguous window overlay tracking running metrics across subarrays. Master fixed-size and dynamic-expansion windows.",
        href: "/visualizer/sliding-window",
        icon: ArrowRightLeft,
      },
      {
        name: "Kadane's Algorithm",
        description: "Maximum contiguous subarray sum tracking with dynamic resets. Solve the classic LeetCode 53 problem interactively.",
        href: "/visualizer/kadanes-algorithm",
        icon: TrendingUp,
      },
      {
        name: "Prefix Sum",
        description: "Precomputed cumulative sum array enabling instant O(1) Range Sum Queries across any interval [L, R].",
        href: "/visualizer/prefix-sum",
        icon: Calculator,
      },
      {
        name: "Difference Array",
        description: "Efficient O(1) interval range updates with prefix sum reconstruction for multiple concurrent updates.",
        href: "/visualizer/difference-array",
        icon: Layers,
      },
      {
        name: "Dutch National Flag",
        description: "3-way partitioning of 0s, 1s, and 2s in a single pass using Low, Mid, High pointers (LeetCode 75 Sort Colors).",
        href: "/visualizer/dutch-national-flag",
        icon: Flag,
      },
      {
        name: "Boyer-Moore Majority Vote",
        description: "Identify majority elements (> N/2) in linear time and O(1) space with candidate cancellation passes.",
        href: "/visualizer/boyer-moore",
        icon: Vote,
      },
    ],
  },

  recursionAndBacktracking: {
    title: "Recursion & Backtracking Studio (FAANG Phase 3)",
    items: [
      {
        name: "Custom Recursion Studio",
        description: "Live Call Stack and Recursion Tree Visualizer with step-by-step frame unwinding, Factorial, Fibonacci, and custom Java code.",
        href: "/visualizer/custom-recursion",
        icon: BrainCircuit,
      },
      {
        name: "N-Queens Backtracking",
        description: "Constraint satisfaction backtracking tree placing N non-attacking queens on an N×N chessboard with row/col pruning.",
        href: "/visualizer/n-queens",
        icon: Crown,
      },
    ],
  },

  graphsAndNetworks: {
    title: "Graph Algorithms & Shortest Path (FAANG Phase 4)",
    items: [
      {
        name: "Dijkstra's Algorithm",
        description: "Greedy single-source shortest path algorithm on weighted graphs with priority queue distance relaxation.",
        href: "/visualizer/dijkstra",
        icon: ArrowRightLeft,
      },
      {
        name: "Graph Traversals (BFS & DFS)",
        description: "Breadth-First Search (queue level-order) and Depth-First Search (stack/recursion) connected component exploration.",
        href: "/visualizer/graph-traversal",
        icon: GitBranch,
      },
    ],
  },

  dynamicProgrammingAndGreedy: {
    title: "Dynamic Programming & Greedy (FAANG Phase 3)",
    items: [
      {
        name: "0/1 Knapsack Problem",
        description: "2D dynamic programming grid solving capacity vs. value maximization with optimal substructure.",
        href: "/visualizer/knapsack",
        icon: Cpu,
      },
      {
        name: "Activity Selection (Greedy)",
        description: "Interval scheduling maximizing non-overlapping activities using the greedy choice property.",
        href: "/visualizer/greedy-activity",
        icon: Zap,
      },
    ],
  },

  applications: {
    title: "Applied Systems & Engineering Applications (FAANG Phase 6)",
    items: [
      {
        name: "Infix to Postfix",
        description: "Convert infix expressions to postfix notation using stacks. Step through operator precedence and parentheses.",
        href: "/visualizer/stack-applications",
        icon: Calculator,
      },
      {
        name: "Message Queue",
        description: "Simulate message queuing systems with producers and consumers. Visualize bounded queue capacity and message flow.",
        href: "/visualizer/queue-applications",
        icon: MessageSquare,
      },
      {
        name: "Polynomial Multiplication",
        description: "Multiply two polynomials using linked lists. Step through term-by-term multiplication and coefficient combining.",
        href: "/visualizer/polynomial",
        icon: Calculator,
      },
      {
        name: "Huffman Coding",
        description: "Lossless data compression technique creating variable-length prefix codes based on character frequency trees.",
        href: "/visualizer/huffman",
        icon: Hash,
      },
    ],
  },

  complexityAnalysis: {
    title: "Complexity & Interview Preparation (FAANG Phase 1)",
    items: [
      {
        name: "Complexity & DS Matrix",
        description: "Comprehensive Time & Space complexity comparison matrix (Big-O, Big-Omega, Big-Theta) for all data structures & algorithms.",
        href: "/visualizer/complexity-matrix",
        icon: BarChart3,
      },
    ],
  },
};

export default function DSAVisualizationPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      {/* Header Section matching dsa-visualizer-main */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-3 mb-4">
          <BrainCircuit className="h-10 w-10 text-foreground" />
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Data Structure Visualizer</h1>
        </div>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
          Interactive visualizations to help you understand data structures and algorithms.
          Explore, learn, and see how they work in real-time.
        </p>
      </div>

      {/* Exhaustive FAANG Syllabus Sections Grid */}
      <div className="space-y-12">
        {Object.entries(sections).map(([key, section]) => (
          <section key={key} className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <Card className="h-full hover:bg-muted/50 transition-colors border shadow-xs">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Icon className="h-6 w-6 text-foreground shrink-0" />
                          <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
