export interface DSATopicComplexity {
  operation: string;
  best: string;
  avg: string;
  worst: string;
  space: string;
}

export interface DSATopicPractice {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  url: string;
  platform: "LeetCode" | "GeeksforGeeks";
  topicTag?: string;
}

export interface CodeSnippet {
  language: "java" | "cpp" | "python";
  label: string;
  code: string;
}

export interface DSATopic {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  categoryName: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  visualizerType?: "stack" | "queue" | "linked-list" | "bubble-sort" | "selection-sort" | "insertion-sort" | "recursion" | "binary-tree" | "avl-tree" | "heap" | "dijkstra";
  gfgSearchQuery: string;
  gfgUrl: string;
  quickSummary: string; // concise 1-2 lines theory
  keyPoints: string[]; // 3 short bullet points max
  diagramTitle?: string; // e.g. "Pipeline Architecture Flowchart"
  diagram?: string; // Visual Flowchart / Diagram string
  complexities: DSATopicComplexity[];
  codeSnippets: CodeSnippet[];
  practiceProblems: DSATopicPractice[];
}

export interface DSACategory {
  id: string;
  name: string;
  shortDesc: string;
  iconName: string;
  topics: DSATopic[];
}

export const DSA_CATEGORIES_DATA: DSACategory[] = [
  {
    id: "basics-analysis",
    name: "1. Complexity & Foundations",
    shortDesc: "Big-O notation, time-space analysis, and basic memory layouts.",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "intro-dsa",
        slug: "introduction-to-dsa",
        title: "DSA Foundations & Complexity",
        categoryId: "basics-analysis",
        categoryName: "1. Complexity & Foundations",
        difficulty: "Beginner",
        estimatedTime: "10 mins",
        gfgSearchQuery: "Data Structures Algorithms Introduction",
        gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Data%20Structures%20Algorithms",
        quickSummary: "Data structures organize memory; algorithms process data step-by-step in O(n) or O(1) time.",
        keyPoints: [
          "Linear (Array, Linked List, Stack) vs Non-Linear (Tree, Graph).",
          "Static memory (Array) vs Dynamic heap RAM (Linked List).",
          "Time-Space Trade-off: Extra memory reduces execution cycles."
        ],
        diagramTitle: "Memory Layout & Classification Flowchart",
        diagram: `┌─────────────────────────────────────────────────────────────┐
│                    DATA STRUCTURES                          │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
     ┌─────────┴─────────┐          ┌─────────┴─────────┐
     │  Linear (Sequential)│          │Non-Linear (Nodes) │
     └────┬──────────┬───┘          └────┬──────────┬───┘
          │          │                   │          │
       [Array]  [Linked List]         [Tree]     [Graph]`,
        complexities: [
          { operation: "Array Access", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(n)" },
          { operation: "Binary Search", best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public class DSABasics {
    public static double getAverage(int[] arr) {
        int sum = 0;
        for (int val : arr) sum += val;
        return (double) sum / arr.length;
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Two Sum", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum/", platform: "LeetCode" },
          { title: "Contains Duplicate", difficulty: "Easy", url: "https://leetcode.com/problems/contains-duplicate/", platform: "LeetCode" }
        ]
      },
      {
        id: "asymptotic-analysis",
        slug: "asymptotic-analysis-big-o",
        title: "Big-O Notation & Asymptotic Bounds",
        categoryId: "basics-analysis",
        categoryName: "1. Complexity & Foundations",
        difficulty: "Beginner",
        estimatedTime: "10 mins",
        gfgSearchQuery: "Asymptotic Analysis Big O Notation",
        gfgUrl: "https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/",
        quickSummary: "Big-O measures how runtime grows relative to input size N as N approaches infinity.",
        keyPoints: [
          "Big-O (O): Worst-case upper bound.",
          "Big-Omega (Ω): Best-case lower bound.",
          "Big-Theta (Θ): Tight bound (worst case == best case)."
        ],
        complexities: [
          { operation: "Constant O(1)", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Logarithmic O(log n)", best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public class BigOExamples {
    public static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Binary Search", difficulty: "Easy", url: "https://leetcode.com/problems/binary-search/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    id: "arrays-strings",
    name: "2. Arrays & Strings",
    shortDesc: "Contiguous arrays, prefix sums, sliding window, and two pointers.",
    iconName: "Code2",
    topics: [
      {
        id: "array-operations",
        slug: "array-data-structure",
        title: "Arrays: Two-Pointers & Prefix Sum",
        categoryId: "arrays-strings",
        categoryName: "2. Arrays & Strings",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        gfgSearchQuery: "Array Data Structure GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/array-data-structure/",
        quickSummary: "Contiguous memory collection offering fast O(1) index access but O(n) insertions.",
        keyPoints: [
          "Contiguous Memory: Base + Index * Size calculation gives instant O(1) read.",
          "Two-Pointer Technique: Move pointers inwards/outwards to solve pair sum in O(n).",
          "Prefix Sum Array: Pre-computes running sums for fast O(1) range query sums [L..R]."
        ],
        complexities: [
          { operation: "Read by Index", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public class ArrayPatterns {
    public static void reverse(int[] arr) {
        int l = 0, r = arr.length - 1;
        while (l < r) {
            int tmp = arr[l]; arr[l] = arr[r]; arr[r] = tmp;
            l++; r--;
        }
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Two Sum II", difficulty: "Medium", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    id: "linked-lists",
    name: "3. Linked Lists",
    shortDesc: "Pointer-linked nodes, Singly, Doubly, and Circular Linked Lists.",
    iconName: "Layers",
    topics: [
      {
        id: "singly-linked-list",
        slug: "singly-linked-list",
        title: "Singly & Doubly Linked Lists",
        categoryId: "linked-lists",
        categoryName: "3. Linked Lists",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        visualizerType: "linked-list",
        gfgSearchQuery: "Linked List Data Structure GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Linked%20List",
        quickSummary: "Dynamic heap nodes connected sequentially via pointer memory addresses.",
        keyPoints: [
          "O(1) Head Insert/Delete without array element shifting.",
          "Floyd's Fast & Slow pointer cycle detection.",
          "In-place Reversal using prev, curr, and next pointers."
        ],
        diagramTitle: "Singly Linked List Memory Pointer Diagram",
        diagram: `┌───────────┐    ┌───────────┐    ┌───────────┐
│ HEAD: 100 │ ──>│ Data: 10  │ ──>│ Data: 20  │ ──> NULL
└───────────┘    │ Next: 200 │    │ Next: NULL│
                 └───────────┘    └───────────┘
                 Addr: 100        Addr: 200`,
        complexities: [
          { operation: "Insert Head", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public class LinkedListOps {
    static class Node { int val; Node next; Node(int v) { val = v; } }
    public static Node reverse(Node head) {
        Node prev = null, curr = head, next = null;
        while (curr != null) {
            next = curr.next; curr.next = prev; prev = curr; curr = next;
        }
        return prev;
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Reverse Linked List", difficulty: "Easy", url: "https://leetcode.com/problems/reverse-linked-list/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    id: "stacks-queues",
    name: "4. Stacks & Queues",
    shortDesc: "LIFO Stacks and FIFO Queues.",
    iconName: "Layers",
    topics: [
      {
        id: "stack-adt",
        slug: "stack-data-structure",
        title: "Stack (LIFO) & Monotonic Stack",
        categoryId: "stacks-queues",
        categoryName: "4. Stacks & Queues",
        difficulty: "Beginner",
        estimatedTime: "12 mins",
        visualizerType: "stack",
        gfgSearchQuery: "Stack Data Structure GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/stack-data-structure/",
        quickSummary: "Last-In, First-Out (LIFO) structure; insertions & deletions occur strictly at the top.",
        keyPoints: [
          "O(1) Push and Pop operations at the Top pointer index.",
          "Used in syntax parsing (balanced parenthesis) and JVM call stack.",
          "Monotonic Stack pattern: Find Next Greater Element in O(n)."
        ],
        complexities: [
          { operation: "Push / Pop", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `import java.util.Stack;
public class StackOps {
    public static boolean isValid(String s) {
        Stack<Character> st = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') st.push(')');
            else if (st.isEmpty() || st.pop() != c) return false;
        }
        return st.isEmpty();
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Valid Parentheses", difficulty: "Easy", url: "https://leetcode.com/problems/valid-parentheses/", platform: "LeetCode" }
        ]
      }
    ]
  }
];
