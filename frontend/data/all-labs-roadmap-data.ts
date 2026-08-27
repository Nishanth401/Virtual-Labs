import { DSACategory } from "./dsa-topic-data";

export const LAB_ROADMAPS_DATA: Record<string, { title: string; badge: string; categories: DSACategory[] }> = {
  // ==========================================
  // 1. DATA STRUCTURES & ALGORITHMS LAB (12 JAVA TOPICS)
  // ==========================================
  "data-structures": {
    title: "DSA Learning Roadmap",
    badge: "100% Pure Java",
    categories: [
      {
        id: "basics-analysis",
        name: "1. Foundations & Asymptotic Analysis",
        shortDesc: "Big-O notation, memory layouts, and asymptotic growth bounds.",
        iconName: "BrainCircuit",
        topics: [
          {
            id: "intro-dsa",
            slug: "introduction-to-dsa",
            title: "1. DSA Foundations & Classification",
            categoryId: "basics-analysis",
            categoryName: "1. Foundations & Asymptotic Analysis",
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
            diagramTitle: "Data Structures Memory Classification",
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
              { operation: "Array Read", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(n)" }
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
              { title: "Two Sum", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum/", platform: "LeetCode" }
            ]
          },
          {
            id: "asymptotic-analysis",
            slug: "asymptotic-analysis-big-o",
            title: "2. Big-O Notation & Asymptotic Bounds",
            categoryId: "basics-analysis",
            categoryName: "1. Foundations & Asymptotic Analysis",
            difficulty: "Beginner",
            estimatedTime: "10 mins",
            gfgSearchQuery: "Asymptotic Analysis Big O Notation",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Data%20Structures%20Algorithms",
            quickSummary: "Big-O measures how runtime grows relative to input size N as N approaches infinity.",
            keyPoints: [
              "Big-O (O): Worst-case upper bound.",
              "Big-Omega (Ω): Best-case lower bound.",
              "Big-Theta (Θ): Tight bound (worst case == best case)."
            ],
            diagramTitle: "Asymptotic Growth Curve Hierarchy",
            diagram: `O(1) Constant  <  O(log N) Logarithmic  <  O(N) Linear  <  O(N log N)  <  O(N²) Quadratic`,
            complexities: [
              { operation: "Constant O(1)", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
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
        name: "2. Arrays & String Manipulation",
        shortDesc: "Contiguous arrays, prefix sums, sliding window, and two-pointer techniques.",
        iconName: "Code2",
        topics: [
          {
            id: "array-operations",
            slug: "array-data-structure",
            title: "3. Arrays: Two Pointers & Prefix Sum",
            categoryId: "arrays-strings",
            categoryName: "2. Arrays & String Manipulation",
            difficulty: "Beginner",
            estimatedTime: "15 mins",
            gfgSearchQuery: "Array Data Structure GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Data%20Structures%20Algorithms",
            quickSummary: "Contiguous memory collection offering fast O(1) index access but O(n) element shifting.",
            keyPoints: [
              "Contiguous Memory: Base + Index * Size gives instant O(1) read.",
              "Two-Pointer Technique: Move pointers inwards/outwards to solve pair sum in O(n).",
              "Prefix Sum Array: Pre-computes running sums for fast O(1) range query sums [L..R]."
            ],
            diagramTitle: "Two-Pointer In-Place Reversal",
            diagram: `Index:  0    1    2    3    4
Array: [10,  20,  30,  40,  50]
        ▲                   ▲
       LEFT               RIGHT  ──> Swap arr[LEFT] and arr[RIGHT]`,
            complexities: [
              { operation: "Read Index", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
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
          },
          {
            id: "string-algorithms",
            slug: "string-pattern-matching",
            title: "4. Strings & Pattern Matching",
            categoryId: "arrays-strings",
            categoryName: "2. Arrays & String Manipulation",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "String Algorithms GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Data%20Structures%20Algorithms",
            quickSummary: "Strings are character arrays; pattern searching checks substring occurrences.",
            keyPoints: [
              "Immutable Strings in Java require StringBuilder for O(1) concatenation.",
              "Palindromes: Two pointers check if string reads same forward & backward.",
              "Sliding Window: Tracks substring frequencies in linear O(n) time."
            ],
            diagramTitle: "Sliding Window Substring Traversal",
            diagram: `String: "a b c a b c b b"
Window: [a b c] ──> Window Slide ──> [b c a]`,
            complexities: [
              { operation: "Sliding Window", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "Java",
                code: `public class StringPatterns {
    public static boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) return false;
        }
        return true;
    }
}`
              }
            ],
            practiceProblems: [
              { title: "Valid Palindrome", difficulty: "Easy", url: "https://leetcode.com/problems/valid-palindrome/", platform: "LeetCode" }
            ]
          },
          {
            id: "two-pointers-algorithm",
            slug: "two-pointers-algorithm-pattern",
            title: "5. Two Pointers Algorithm",
            categoryId: "arrays-strings",
            categoryName: "2. Arrays & String Manipulation",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            visualizerType: "two-pointers",
            gfgSearchQuery: "Two Pointers Technique GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/two-pointers-technique/",
            quickSummary: "Optimizes nested O(N²) loops into linear O(N) by moving left and right pointers inwards or in sync.",
            keyPoints: [
              "Opposite Directions (Left & Right): Used for target sums in sorted arrays, reversing, and container water capacity.",
              "Same Direction (Slow & Fast): Used for linked list cycle detection (Floyd's) and removing duplicates in-place.",
              "Optimal O(N) Time: Reduces search space per iteration without extra memory allocations."
            ],
            diagramTitle: "Two Pointers Target Sum Traversal",
            diagram: `Array: [2,  7,  11, 15, 18, 22]  Target: 26
        ▲                   ▲
       LEFT               RIGHT
Sum = 2 + 22 = 24 < 26 ──> move LEFT pointer right (LEFT++)`,
            complexities: [
              { operation: "Two Pointers Traversal", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "Java",
                code: `public class TwoPointers {
    public static int[] twoSum(int[] arr, int target) {
        int l = 0, r = arr.length - 1;
        while (l < r) {
            int sum = arr[l] + arr[r];
            if (sum == target) return new int[]{l + 1, r + 1};
            if (sum < target) l++;
            else r--;
        }
        return new int[]{-1, -1};
    }
}`
              }
            ],
            practiceProblems: [
              { title: "Two Sum II", difficulty: "Medium", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", platform: "LeetCode" },
              { title: "Container With Most Water", difficulty: "Medium", url: "https://leetcode.com/problems/container-with-most-water/", platform: "LeetCode" },
              { title: "3Sum", difficulty: "Medium", url: "https://leetcode.com/problems/3sum/", platform: "LeetCode" }
            ]
          },
          {
            id: "sliding-window-algorithm",
            slug: "sliding-window-algorithm-pattern",
            title: "6. Sliding Window Algorithm",
            categoryId: "arrays-strings",
            categoryName: "2. Arrays & String Manipulation",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            visualizerType: "sliding-window",
            gfgSearchQuery: "Sliding Window Technique GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/window-sliding-technique/",
            quickSummary: "Maintains a contiguous subarray box [windowStart ... windowEnd] that slides across the array in O(N) linear time.",
            keyPoints: [
              "Fixed Window Size (K): Add incoming element arr[right], subtract outgoing element arr[left] in O(1) time.",
              "Variable Window Size: Expand windowEnd to meet constraints, then shrink windowStart to optimize length.",
              "Replaces O(N*K) sub-array re-computations with O(N) running totals."
            ],
            diagramTitle: "Sliding Window Subarray Overlay",
            diagram: `Array: [2, 1, 5, 1, 3, 2]  Window K = 3
Window 1: [2, 1, 5] -> Sum = 8
Window 2:    [1, 5, 1] -> Sum = 7 (subtract 2, add 1)`,
            complexities: [
              { operation: "Sliding Window Scan", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "Java",
                code: `public class SlidingWindow {
    public static int maxSum(int[] arr, int k) {
        int wSum = 0;
        for (int i = 0; i < k; i++) wSum += arr[i];
        int maxS = wSum;
        for (int i = k; i < arr.length; i++) {
            wSum += arr[i] - arr[i - k];
            maxS = Math.max(maxS, wSum);
        }
        return maxS;
    }
}`
              }
            ],
            practiceProblems: [
              { title: "Maximum Sum Subarray of Size K", difficulty: "Easy", url: "https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/", platform: "LeetCode" },
              { title: "Minimum Size Subarray Sum", difficulty: "Medium", url: "https://leetcode.com/problems/minimum-size-subarray-sum/", platform: "LeetCode" },
              { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", platform: "LeetCode" }
            ]
          }
        ]
      },
      {
        id: "linked-lists",
        name: "3. Linked Lists",
        shortDesc: "Dynamic pointer-linked memory nodes: Singly and Doubly Linked Lists.",
        iconName: "Layers",
        topics: [
          {
            id: "singly-linked-list",
            slug: "singly-linked-list",
            title: "5. Singly & Doubly Linked Lists",
            categoryId: "linked-lists",
            categoryName: "3. Linked Lists",
            difficulty: "Beginner",
            estimatedTime: "15 mins",
            visualizerType: "linked-list",
            gfgSearchQuery: "Linked List Data Structure GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Linked%20List",
            quickSummary: "Dynamic heap nodes connected sequentially via pointer memory references.",
            keyPoints: [
              "O(1) Head Insert/Delete without array element shifting.",
              "Floyd's Fast & Slow pointer cycle detection.",
              "In-place Reversal using prev, curr, and next pointers."
            ],
            diagramTitle: "Singly Linked List Node Memory Diagram",
            diagram: `┌───────────┐    ┌───────────┐    ┌───────────┐
│ HEAD: 100 │ ──>│ Data: 10  │ ──>│ Data: 20  │ ──> NULL
└───────────┘    │ Next: 200 │    │ Next: NULL│
                 └───────────┘    └───────────┘`,
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
            title: "6. Stack (LIFO) & Monotonic Stack",
            categoryId: "stacks-queues",
            categoryName: "4. Stacks & Queues",
            difficulty: "Beginner",
            estimatedTime: "12 mins",
            visualizerType: "stack",
            gfgSearchQuery: "Stack Data Structure GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Stack",
            quickSummary: "Last-In, First-Out (LIFO) structure; insertions & deletions occur strictly at the top.",
            keyPoints: [
              "O(1) Push and Pop operations at the Top pointer index.",
              "Used in syntax parsing (balanced parenthesis) and JVM call stack.",
              "Monotonic Stack pattern: Find Next Greater Element in O(n)."
            ],
            diagramTitle: "LIFO Stack Operations Diagram",
            diagram: `PUSH 30 ──> ┌───────┐
            │   30  │ <── TOP
            ├───────┤
POP     <── │   20  │
            ├───────┤
            │   10  │
            └───────┘`,
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
          },
          {
            id: "queue-adt",
            slug: "queue-data-structure",
            title: "7. Queue (FIFO) & Circular Queue",
            categoryId: "stacks-queues",
            categoryName: "4. Stacks & Queues",
            difficulty: "Beginner",
            estimatedTime: "12 mins",
            visualizerType: "queue",
            gfgSearchQuery: "Queue Data Structure GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Queue",
            quickSummary: "First-In, First-Out (FIFO) structure; enqueue at Rear, dequeue from Front.",
            keyPoints: [
              "O(1) Enqueue and Dequeue at endpoints.",
              "Circular Queue wraps indices using modulo math (rear + 1) % cap.",
              "Core data structure for BFS graph traversals."
            ],
            diagramTitle: "FIFO Queue Front and Rear Diagram",
            diagram: `DEQUEUE <── [ FRONT: 10 ] <── [ 20 ] <── [ REAR: 30 ] <── ENQUEUE`,
            complexities: [
              { operation: "Enqueue / Dequeue", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "Java",
                code: `public class CircularQueue {
    private int[] arr; private int front = 0, rear = -1, size = 0, cap;
    public CircularQueue(int cap) { this.cap = cap; this.arr = new int[cap]; }
}`
              }
            ],
            practiceProblems: [
              { title: "Implement Queue using Stacks", difficulty: "Easy", url: "https://leetcode.com/problems/implement-queue-using-stacks/", platform: "LeetCode" }
            ]
          }
        ]
      },
      {
        id: "recursion-sorting",
        name: "5. Recursion & Sorting Algorithms",
        shortDesc: "Recursion frames and Bubble, Selection & Insertion sort.",
        iconName: "Code2",
        topics: [
          {
            id: "recursion-callstack",
            slug: "recursion-and-backtracking",
            title: "8. Recursion & Call Stack Frames",
            categoryId: "recursion-sorting",
            categoryName: "5. Recursion & Sorting Algorithms",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            visualizerType: "recursion",
            gfgSearchQuery: "Recursion GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Recursion",
            quickSummary: "Function invoking itself until hitting a mandatory Base Case.",
            keyPoints: [
              "Base Case prevents infinite stack growth and StackOverflowError.",
              "Call Stack Frame pushes parameters, return addresses, and local variables.",
              "Backtracking: Explores choices recursively and undoes decisions upon failure."
            ],
            diagramTitle: "Recursive Call Stack Unwinding Diagram",
            diagram: `fact(3) ──> 3 * fact(2)
              │
              └──> 2 * fact(1) ──> Base Case: 1`,
            complexities: [
              { operation: "Factorial N!", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "Java",
                code: `public class Recursion {
    public static int fact(int n) {
        if (n <= 1) return 1;
        return n * fact(n - 1);
    }
}`
              }
            ],
            practiceProblems: [
              { title: "Subsets", difficulty: "Medium", url: "https://leetcode.com/problems/subsets/", platform: "LeetCode" }
            ]
          },
          {
            id: "sorting-suite",
            slug: "sorting-algorithms",
            title: "9. Bubble, Selection & Insertion Sort",
            categoryId: "recursion-sorting",
            categoryName: "5. Recursion & Sorting Algorithms",
            difficulty: "Beginner",
            estimatedTime: "15 mins",
            visualizerType: "bubble-sort",
            gfgSearchQuery: "Sorting Algorithms GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Sorting",
            quickSummary: "In-place comparison sorting algorithms: Bubble, Selection, and Insertion.",
            keyPoints: [
              "Bubble Sort: Swaps adjacent elements; max bubbles right.",
              "Selection Sort: Scans unsorted region for minimum element; at most N-1 swaps.",
              "Insertion Sort: Shifts elements right; adaptive linear O(n) time on nearly-sorted data."
            ],
            diagramTitle: "Bubble Sort Adjacent Swap Diagram",
            diagram: `Pass 1: [34, 12, 25] ──> Swap 34&12 ──> [12, 34, 25] ──> Swap 34&25 ──> [12, 25, | 34]`,
            complexities: [
              { operation: "Bubble Sort", best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "Java",
                code: `public class Sorts {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp; swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
}`
              }
            ],
            practiceProblems: [
              { title: "Sort an Array", difficulty: "Medium", url: "https://leetcode.com/problems/sort-an-array/", platform: "LeetCode" }
            ]
          }
        ]
      },
      {
        id: "trees-heaps",
        name: "6. Trees, AVL & Heaps",
        shortDesc: "Binary Search Trees, AVL self-balancing, and Priority Heaps.",
        iconName: "BrainCircuit",
        topics: [
          {
            id: "binary-tree-bst",
            slug: "binary-tree-data-structure",
            title: "10. Binary Tree & Binary Search Tree",
            categoryId: "trees-heaps",
            categoryName: "6. Trees, AVL & Heaps",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            visualizerType: "binary-tree",
            gfgSearchQuery: "Binary Tree Data Structure GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Binary%20Tree",
            quickSummary: "Hierarchical tree nodes; BST maintains Left < Node < Right ordering.",
            keyPoints: [
              "Inorder Traversal (Left, Node, Right) on BST yields sorted order.",
              "O(log n) Search & Insert in balanced states; height h = log₂(n).",
              "Level-Order Traversal uses a Queue (BFS)."
            ],
            diagramTitle: "Binary Search Tree Ordering Diagram",
            diagram: `       [ 50 ]
      /      \\
   [ 30 ]   [ 70 ]
   /    \\
[ 20 ]  [ 40 ]`,
            complexities: [
              { operation: "BST Search", best: "O(1)", avg: "O(log n)", worst: "O(n)", space: "O(h)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "Java",
                code: `public class BST {
    static class TreeNode { int val; TreeNode left, right; TreeNode(int v) { val = v; } }
}`
              }
            ],
            practiceProblems: [
              { title: "Validate Binary Search Tree", difficulty: "Medium", url: "https://leetcode.com/problems/validate-binary-search-tree/", platform: "LeetCode" }
            ]
          },
          {
            id: "avl-trees",
            slug: "avl-tree-data-structure",
            title: "11. AVL Tree Self-Balancing Rotations",
            categoryId: "trees-heaps",
            categoryName: "6. Trees, AVL & Heaps",
            difficulty: "Advanced",
            estimatedTime: "15 mins",
            visualizerType: "avl-tree",
            gfgSearchQuery: "AVL Tree GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=AVL%20Tree",
            quickSummary: "Self-balancing BST keeping Balance Factor height difference <= 1.",
            keyPoints: [
              "Balance Factor (BF) = Height(Left) - Height(Right). Valid BF: {-1, 0, 1}.",
              "Single Rotations (LL, RR) & Double Rotations (LR, RL) rebalance in O(1).",
              "Guarantees strict worst-case O(log n) search, insertion, and deletion."
            ],
            diagramTitle: "AVL Right Rotation Diagram",
            diagram: `    [ 30 ]                 [ 20 ]
    /                     /      \\
 [ 20 ]   ── Right ──>  [ 10 ]  [ 30 ]
 /         Rotate
[ 10 ]`,
            complexities: [
              { operation: "Search / Insert", best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(log n)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "Java",
                code: `public class AVL {
    class Node { int key, height = 1; Node left, right; Node(int k) { key = k; } }
}`
              }
            ],
            practiceProblems: [
              { title: "Balance a Binary Search Tree", difficulty: "Medium", url: "https://leetcode.com/problems/balance-a-binary-search-tree/", platform: "LeetCode" }
            ]
          },
          {
            id: "heap-priority-queue",
            slug: "heap-data-structure",
            title: "12. Min/Max Heap & Priority Queue",
            categoryId: "trees-heaps",
            categoryName: "6. Trees, AVL & Heaps",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            visualizerType: "heap",
            gfgSearchQuery: "Heap Data Structure GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Heap",
            quickSummary: "Complete binary tree stored compactly in an array for fast min/max access.",
            keyPoints: [
              "Array indexing: Left = 2i+1, Right = 2i+2, Parent = (i-1)/2.",
              "O(1) peek at Root (Min or Max value).",
              "O(log n) Insert and Extract-Min/Max via Heapify."
            ],
            diagramTitle: "Min-Heap Array Representation",
            diagram: `Tree:    [ 10 ]          Array Index: 0   1   2
                /      \\          Array Val:  [10, 20, 30]
             [ 20 ]   [ 30 ]`,
            complexities: [
              { operation: "Find Min / Max", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "Java",
                code: `import java.util.PriorityQueue;
public class HeapDemo {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.offer(30); pq.offer(10); pq.offer(20);
        System.out.println(pq.poll()); // 10
    }
}`
              }
            ],
            practiceProblems: [
              { title: "Kth Largest Element in an Array", difficulty: "Medium", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", platform: "LeetCode" }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // 2. MACHINE LEARNING & DEEP LEARNING LAB (10 PYTHON TOPICS)
  // ==========================================
  "ai-machine-learning": {
    title: "ML & Deep Learning Roadmap",
    badge: "Python / NumPy / PyTorch / Scikit-Learn",
    categories: [
      {
        id: "numpy-pandas-ds",
        name: "1. Python Data Science Pipelines",
        shortDesc: "NumPy vectorization, Pandas DataFrames, and Seaborn visualizations.",
        iconName: "Code2",
        topics: [
          {
            id: "numpy-mastery",
            slug: "numpy-vectorization-tensors",
            title: "1. NumPy Vectorization & Ndarrays",
            categoryId: "numpy-pandas-ds",
            categoryName: "1. Python Data Science Pipelines",
            difficulty: "Beginner",
            estimatedTime: "15 mins",
            gfgSearchQuery: "Machine learning and deep learning NumPy",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "NumPy provides 50x faster vectorized C-memory operations for high-dimensional matrix math.",
            keyPoints: [
              "Vectorized C buffers avoid slow Python loop execution.",
              "Broadcasting automatically aligns trailing matrix dimensions.",
              "Boolean masking filters sub-matrices without loops."
            ],
            diagramTitle: "NumPy Vectorization Matrix Flowchart",
            diagram: `┌───────────────────────┐       ┌───────────────────────┐
│ Matrix X (1000 x 10) │   @   │ Weights W (10 x 1)    │
└───────────┬───────────┘       └───────────┬───────────┘
            │                               │
            └───────────────┬───────────────┘
                            ▼
             ┌──────────────────────────────┐
             │ Linear Output Y = X@W + b    │ (1000 x 1)
             └──────────────────────────────┘`,
            complexities: [
              { operation: "Vector Addition", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python (NumPy)",
                code: `import numpy as np
X = np.random.randn(1000, 10)
W = np.random.randn(10, 1)
Y = np.dot(X, W) + 0.5
print("Output Tensor Shape:", Y.shape)`
              }
            ],
            practiceProblems: [
              { title: "Reshape Matrix", difficulty: "Easy", url: "https://leetcode.com/problems/reshape-the-matrix/", platform: "LeetCode" }
            ]
          },
          {
            id: "pandas-cleaning",
            slug: "pandas-dataframe-cleaning",
            title: "2. Pandas DataFrames & Data Cleaning",
            categoryId: "numpy-pandas-ds",
            categoryName: "1. Python Data Science Pipelines",
            difficulty: "Beginner",
            estimatedTime: "15 mins",
            gfgSearchQuery: "Pandas Data Preprocessing GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Pandas cleans tabular data, imputes missing NaNs, and scales numeric feature columns.",
            keyPoints: [
              "Impute NaNs via mean/median df.fillna().",
              "One-hot encode categories via pd.get_dummies().",
              "Z-score standardization: Z = (X - μ) / σ."
            ],
            diagramTitle: "Data Preprocessing Pipeline Flowchart",
            diagram: `┌────────────┐   ┌────────────┐   ┌─────────────┐   ┌─────────────┐
│ Raw CSV    │──>│ Impute NaNs│──>│ Categorical │──>│ Standardize │
│ Ingestion  │   │  (df.mean) │   │ One-Hot Enc │   │ Z-score Scal│
└────────────┘   └────────────┘   └─────────────┘   └─────────────┘`,
            complexities: [
              { operation: "CSV Data Ingest", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python (Pandas)",
                code: `import pandas as pd
from sklearn.preprocessing import StandardScaler
df = pd.DataFrame({'age': [25, None, 45], 'income': [50000, 64000, None]})
df.fillna(df.mean(), inplace=True)
scaled_X = StandardScaler().fit_transform(df)
print("Cleaned Scaled Data:\\n", scaled_X)`
              }
            ],
            practiceProblems: [
              { title: "Fill Missing Data", difficulty: "Easy", url: "https://leetcode.com/problems/fill-missing-data/", platform: "LeetCode" }
            ]
          }
        ]
      },
      {
        id: "supervised-ml",
        name: "2. Supervised Learning Models",
        shortDesc: "Linear Regression, Logistic Regression, Decision Trees, KNN, and SVM.",
        iconName: "BrainCircuit",
        topics: [
          {
            id: "linear-regression",
            slug: "linear-regression-gradient-descent",
            title: "3. Linear Regression & Gradient Descent",
            categoryId: "supervised-ml",
            categoryName: "2. Supervised Learning Models",
            difficulty: "Intermediate",
            estimatedTime: "20 mins",
            gfgSearchQuery: "Linear Regression GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Linear regression predicts continuous targets y = W^T X + b by minimizing Mean Squared Error.",
            keyPoints: [
              "MSE Loss: L = (1/2N) ∑ (y_pred - y_true)².",
              "Gradient Update: W = W - α * (∂L/∂W).",
              "α = learning rate controlling step size."
            ],
            diagramTitle: "Gradient Descent Optimization Flowchart",
            diagram: `┌──────────────────────┐
│ Initial Weights W, b │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐    Calculates ∂L/∂W
│ Compute MSE Loss L   │ ───>  Update Rule:
└──────────┬───────────┘       W = W - α*(∂L/∂W)
           │                        │
           └────── Iterates ───────┘`,
            complexities: [
              { operation: "Gradient Step", best: "O(N*d)", avg: "O(N*d)", worst: "O(N*d)", space: "O(d)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python (Scikit-Learn)",
                code: `from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2.1, 3.9, 6.1, 8.0, 10.2])
model = LinearRegression().fit(X, y)
print(f"Slope: {model.coef_[0]:.2f}, Intercept: {model.intercept_:.2f}")`
              }
            ],
            practiceProblems: [
              { title: "Best Time to Buy Stock", difficulty: "Easy", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", platform: "LeetCode" }
            ]
          },
          {
            id: "logistic-regression",
            slug: "logistic-regression-classification",
            title: "4. Logistic Regression & Sigmoid Function",
            categoryId: "supervised-ml",
            categoryName: "2. Supervised Learning Models",
            difficulty: "Intermediate",
            estimatedTime: "20 mins",
            gfgSearchQuery: "Logistic Regression GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Logistic regression maps linear combinations to probabilities using the Sigmoid curve σ(z) = 1/(1+e⁻ᶻ).",
            keyPoints: [
              "Sigmoid squashes outputs into range (0, 1).",
              "Binary Cross-Entropy Loss evaluates prediction error.",
              "Classifies as 1 if probability p >= 0.5."
            ],
            diagramTitle: "Logistic Sigmoid Classification Pipeline",
            diagram: `┌────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Input X    │───>│ z = W^T X + b   │───>│ σ(z)=1/(1+e⁻ᶻ)  │───> Class 1 (p >= 0.5)
└────────────┘    └─────────────────┘    └────────┬────────┘
                                                  │
                                                  └───> Class 0 (p < 0.5)`,
            complexities: [
              { operation: "Sigmoid Activation", best: "O(d)", avg: "O(d)", worst: "O(d)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `from sklearn.linear_model import LogisticRegression
clf = LogisticRegression().fit([[0.5], [1.5], [2.5], [3.5]], [0, 0, 1, 1])
print("Probability for x=3.0:", clf.predict_proba([[3.0]])[0][1])`
              }
            ],
            practiceProblems: [
              { title: "Predict Classification", difficulty: "Medium", url: "https://leetcode.com/problems/predict-the-winner/", platform: "LeetCode" }
            ]
          },
          {
            id: "decision-trees",
            slug: "decision-trees-random-forest",
            title: "5. Decision Trees & Random Forests",
            categoryId: "supervised-ml",
            categoryName: "2. Supervised Learning Models",
            difficulty: "Intermediate",
            estimatedTime: "20 mins",
            gfgSearchQuery: "Decision Tree GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Tree-based recursive splitting using Gini Impurity and Entropy Information Gain.",
            keyPoints: [
              "Gini Impurity: G = 1 - ∑ pᵢ² (0 for pure nodes).",
              "Information Gain IG = H(parent) - ∑ (N_child / N) * H(child).",
              "Random Forests combine multiple decision trees via Bagging."
            ],
            diagramTitle: "Decision Tree Binary Split Flowchart",
            diagram: `       [ Feature X1 <= 2.5? ]
           /           \\
    [ Yes: Class 0 ]   [ No: Feature X2 <= 5.0? ]
                           /               \\
                    [ Class 1 ]         [ Class 0 ]`,
            complexities: [
              { operation: "Tree Construction", best: "O(d*N log N)", avg: "O(d*N log N)", worst: "O(d*N²)", space: "O(Depth)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python (Scikit-Learn)",
                code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=200, n_features=5, random_state=42)
rf = RandomForestClassifier(n_estimators=50).fit(X, y)
print("Top Feature Importances:", rf.feature_importances_)`
              }
            ],
            practiceProblems: [
              { title: "Construct Binary Tree", difficulty: "Medium", url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", platform: "LeetCode" }
            ]
          },
          {
            id: "knn-classifier",
            slug: "k-nearest-neighbors-knn",
            title: "6. K-Nearest Neighbors (KNN)",
            categoryId: "supervised-ml",
            categoryName: "2. Supervised Learning Models",
            difficulty: "Beginner",
            estimatedTime: "15 mins",
            gfgSearchQuery: "K Nearest Neighbors GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Instance-based classifier assigning majority label among K nearest Euclidean neighbors.",
            keyPoints: [
              "Euclidean Distance d(p,q) = √[ ∑ (pᵢ - qᵢ)² ].",
              "Lazy Learning: No training phase; query computes distances to all data points.",
              "KD-Trees optimize neighbor search to O(log N)."
            ],
            diagramTitle: "KNN Majority Voting Diagram",
            diagram: `Query Point (?)  ──> Calculate Distance to N points
                   ──> Pick Top K=3 Nearest Nodes
                   ──> Majority Vote ──> Assigned Class A`,
            complexities: [
              { operation: "Query Distance", best: "O(N*d)", avg: "O(N*d)", worst: "O(N*d)", space: "O(N*d)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python (Scikit-Learn)",
                code: `from sklearn.neighbors import KNeighborsClassifier
knn = KNeighborsClassifier(n_neighbors=3).fit([[1, 2], [2, 3], [5, 6]], [0, 0, 1])
print("Predicted Class:", knn.predict([[1.5, 2.5]]))`
              }
            ],
            practiceProblems: [
              { title: "K Closest Points to Origin", difficulty: "Medium", url: "https://leetcode.com/problems/k-closest-points-to-origin/", platform: "LeetCode" }
            ]
          }
        ]
      },
      {
        id: "unsupervised-deep-ml",
        name: "3. Unsupervised Learning & Deep Learning",
        shortDesc: "K-Means, PCA, PyTorch Multi-Layer Perceptrons, and CNNs.",
        iconName: "BrainCircuit",
        topics: [
          {
            id: "kmeans-clustering",
            slug: "k-means-clustering-elbow",
            title: "7. K-Means Clustering & Elbow Method",
            categoryId: "unsupervised-deep-ml",
            categoryName: "3. Unsupervised Learning & Deep Learning",
            difficulty: "Intermediate",
            estimatedTime: "20 mins",
            gfgSearchQuery: "K Means Clustering GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Partition dataset into K clusters minimizing Within-Cluster Sum of Squares (WCSS).",
            keyPoints: [
              "Assign points to nearest centroid using Euclidean distance.",
              "Recompute centroid as mean vector of cluster members.",
              "Elbow Method plots WCSS vs K to pick optimal cluster count."
            ],
            diagramTitle: "K-Means Centroid Iteration Flowchart",
            diagram: `┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
│ Initialize K Centroids│──>│ Assign Points to     │──>│ Recompute Centroids  │
└──────────────────────┘   │ Nearest Centroid     │   │ as Mean Vector       │
                           └──────────┬───────────┘   └──────────┬───────────┘
                                      │                          │
                                      └────── Iterates ──────────┘`,
            complexities: [
              { operation: "K-Means Step", best: "O(K*N*d)", avg: "O(K*N*d)", worst: "O(K*N*d)", space: "O(N+K)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python (Scikit-Learn)",
                code: `from sklearn.cluster import KMeans
import numpy as np

kmeans = KMeans(n_clusters=3, random_state=42).fit(np.random.randn(200, 2))
print("Centroid Coordinates:\\n", kmeans.cluster_centers_)`
              }
            ],
            practiceProblems: [
              { title: "Partition Array Three Parts", difficulty: "Easy", url: "https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum/", platform: "LeetCode" }
            ]
          },
          {
            id: "pca-reduction",
            slug: "principal-component-analysis-pca",
            title: "8. Principal Component Analysis (PCA)",
            categoryId: "unsupervised-deep-ml",
            categoryName: "3. Unsupervised Learning & Deep Learning",
            difficulty: "Advanced",
            estimatedTime: "20 mins",
            gfgSearchQuery: "Principal Component Analysis GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Linear dimensionality reduction projecting data onto orthogonal maximum-variance axes.",
            keyPoints: [
              "Covariance Matrix C = (1/N) X^T X captures feature variance.",
              "Eigenvalue Decomposition C * v = λ * v yields principal directions.",
              "Reduces high-dimensional noise while preserving variance."
            ],
            diagramTitle: "PCA Projection Diagram",
            diagram: `High Dim Data (20 Features) ──> Covariance Matrix C ──> Top K Eigenvectors ──> 2D Projection`,
            complexities: [
              { operation: "SVD / Eigendecomposition", best: "O(d³)", avg: "O(d³)", worst: "O(d³)", space: "O(d²)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python (Scikit-Learn)",
                code: `from sklearn.decomposition import PCA
import numpy as np
pca = PCA(n_components=2).fit(np.random.randn(100, 20))
print("Explained Variance Ratios:", pca.explained_variance_ratio_)`
              }
            ],
            practiceProblems: [
              { title: "Matrix Reduction", difficulty: "Medium", url: "https://leetcode.com/problems/rotate-image/", platform: "LeetCode" }
            ]
          },
          {
            id: "mlp-backprop",
            slug: "multi-layer-perceptron-backprop",
            title: "9. PyTorch Multi-Layer Perceptron (MLP)",
            categoryId: "unsupervised-deep-ml",
            categoryName: "3. Unsupervised Learning & Deep Learning",
            difficulty: "Advanced",
            estimatedTime: "25 mins",
            gfgSearchQuery: "PyTorch MLP Deep Learning",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Multi-Layer Perceptrons stack linear layers with non-linear activations, updating weights via Backprop Chain Rule.",
            keyPoints: [
              "Forward Pass: Computes z = Wx + b and h = ReLU(z).",
              "Backprop: Chain Rule calculates ∂Loss/∂Weights.",
              "PyTorch autograd handles automatic differentiation."
            ],
            diagramTitle: "Neural Network Architecture Diagram",
            diagram: `┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│ Input Layer │  ──>  │ Hidden Layer │  ──>  │ Output      │
│ (X1, X2)    │ (W1)  │ (ReLU)       │ (W2)  │ (Classes)   │
└─────────────┘       └──────────────┘       └─────────────┘`,
            complexities: [
              { operation: "Forward / Backprop", best: "O(L * d)", avg: "O(L * d)", worst: "O(L * d)", space: "O(Weights)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "PyTorch MLP",
                code: `import torch
import torch.nn as nn

class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(nn.Linear(10, 64), nn.ReLU(), nn.Linear(64, 2))
    def forward(self, x): return self.net(x)

model = MLP()
print("PyTorch Tensor Output Shape:", model(torch.randn(32, 10)).shape)`
              }
            ],
            practiceProblems: [
              { title: "Evaluate Expression / Chain", difficulty: "Medium", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", platform: "LeetCode" }
            ]
          },
          {
            id: "cnn-foundations",
            slug: "convolutional-neural-networks-cnn",
            title: "10. Convolutional Neural Networks (CNN)",
            categoryId: "unsupervised-deep-ml",
            categoryName: "3. Unsupervised Learning & Deep Learning",
            difficulty: "Advanced",
            estimatedTime: "25 mins",
            gfgSearchQuery: "CNN Architecture GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Spatial feature extraction using 2D kernels, stride, padding, and max pooling.",
            keyPoints: [
              "Kernel Convolution: Slides weight filters across image channels.",
              "Max Pooling: Downsamples spatial dimensions preserving key features.",
              "Translation Invariance: Detects features regardless of location."
            ],
            diagramTitle: "CNN Convolution & Pooling Flowchart",
            diagram: `Input Image (28x28) ──> Conv2d (3x3 Kernel) ──> ReLU ──> MaxPool2d (2x2) ──> Feature Map (14x14)`,
            complexities: [
              { operation: "2D Convolution", best: "O(K² * H * W)", avg: "O(K² * H * W)", worst: "O(K² * H * W)", space: "O(Channels)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "PyTorch CNN",
                code: `import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Conv2d(3, 16, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.relu = nn.ReLU()
    def forward(self, x):
        return self.pool(self.relu(self.conv(x)))`
              }
            ],
            practiceProblems: [
              { title: "Flood Fill / Grid Convolution", difficulty: "Easy", url: "https://leetcode.com/problems/flood-fill/", platform: "LeetCode" }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // 3. DATABASE MANAGEMENT SYSTEMS LAB (10 SQL TOPICS)
  // ==========================================
  "dbms-lab": {
    title: "DBMS Learning Roadmap",
    badge: "SQL / Normalization / B+ Trees / ACID",
    categories: [
      {
        id: "sql-queries",
        name: "1. SQL & Relational Queries",
        shortDesc: "DDL, DML, Aggregations, Joins, Subqueries, and CTE Window Functions.",
        iconName: "Layers",
        topics: [
          {
            id: "sql-ddl-dml",
            slug: "sql-ddl-dml-fundamentals",
            title: "1. SQL DDL, DML & Aggregations",
            categoryId: "sql-queries",
            categoryName: "1. SQL & Relational Queries",
            difficulty: "Beginner",
            estimatedTime: "15 mins",
            gfgSearchQuery: "SQL Tutorial GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "SQL DDL defines relational table schemas, while DML inserts, updates, and aggregates records.",
            keyPoints: [
              "DDL: CREATE TABLE, ALTER TABLE, DROP TABLE.",
              "DML: INSERT, UPDATE, DELETE, SELECT.",
              "Aggregation: GROUP BY column HAVING condition COUNT(*)."
            ],
            diagramTitle: "Relational Query Execution Flowchart",
            diagram: `┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐
│ FROM Table │──>│ WHERE Filter│──>│ GROUP BY   │──>│ HAVING     │──> SELECT
└────────────┘   └────────────┘   └────────────┘   └────────────┘`,
            complexities: [
              { operation: "Index Lookup", best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL",
                code: `CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dept VARCHAR(50),
    gpa DECIMAL(3,2)
);

SELECT dept, AVG(gpa) AS avg_gpa FROM Students GROUP BY dept HAVING AVG(gpa) > 3.50;`
              }
            ],
            practiceProblems: [
              { title: "Combine Two Tables", difficulty: "Easy", url: "https://leetcode.com/problems/combine-two-tables/", platform: "LeetCode" }
            ]
          },
          {
            id: "sql-joins",
            slug: "sql-joins-subqueries",
            title: "2. SQL Relational Joins",
            categoryId: "sql-queries",
            categoryName: "1. SQL & Relational Queries",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "SQL Joins GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "Joins combine matching rows across foreign-key related tables (INNER, LEFT, RIGHT, FULL).",
            keyPoints: [
              "INNER JOIN: Retains only matching key rows.",
              "LEFT JOIN: Retains all left table rows, padding NULLs.",
              "Hash Join scans left table into RAM hash table."
            ],
            diagramTitle: "Relational Join Venn Diagram",
            diagram: `  Table A (Left)               Table B (Right)
┌────────────────┐           ┌────────────────┐
│   [ A ONLY ]   │ ┌───────┐ │   [ B ONLY ]   │
│                │ │ MATCH │ │                │
└────────────────┘ └───────┘ └────────────────┘
      ▲                ▲
      │                │
      └── LEFT JOIN ───┴── INNER JOIN`,
            complexities: [
              { operation: "Hash Join", best: "O(M + N)", avg: "O(M + N)", worst: "O(M + N)", space: "O(M)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL",
                code: `SELECT e.name, d.dept_name
FROM Employees e
LEFT JOIN Departments d ON e.dept_id = d.dept_id;`
              }
            ],
            practiceProblems: [
              { title: "Department Highest Salary", difficulty: "Medium", url: "https://leetcode.com/problems/department-highest-salary/", platform: "LeetCode" }
            ]
          },
          {
            id: "sql-subqueries",
            slug: "sql-subqueries-nested",
            title: "3. SQL Subqueries & Correlated Queries",
            categoryId: "sql-queries",
            categoryName: "1. SQL & Relational Queries",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "SQL Subqueries GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "Nested queries inside WHERE or FROM clauses evaluated per row.",
            keyPoints: [
              "Scalar Subquery: Returns a single value.",
              "Correlated Subquery: Nested query references outer query columns.",
              "EXISTS operator checks for non-empty subquery result sets."
            ],
            diagramTitle: "Correlated Subquery Row-by-Row Execution",
            diagram: `Outer Loop (Row e in Employees) ──> Execute Subquery for e.dept_id ──> Filter Row`,
            complexities: [
              { operation: "Correlated Scan", best: "O(N)", avg: "O(N*M)", worst: "O(N*M)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL",
                code: `SELECT name, salary FROM Employees e
WHERE salary > (SELECT AVG(salary) FROM Employees WHERE dept_id = e.dept_id);`
              }
            ],
            practiceProblems: [
              { title: "Employees Earning More", difficulty: "Easy", url: "https://leetcode.com/problems/employees-earning-more-than-their-managers/", platform: "LeetCode" }
            ]
          },
          {
            id: "sql-window-functions",
            slug: "sql-window-functions-cte",
            title: "4. SQL Window Functions & CTEs",
            categoryId: "sql-queries",
            categoryName: "1. SQL & Relational Queries",
            difficulty: "Advanced",
            estimatedTime: "20 mins",
            gfgSearchQuery: "SQL Window Functions GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "ROW_NUMBER(), RANK(), DENSE_RANK(), and WITH CTE query modularization.",
            keyPoints: [
              "OVER (PARTITION BY col ORDER BY val): Ranks rows per partition.",
              "DENSE_RANK() does not skip ranking numbers after ties.",
              "CTEs: Temporary named result sets defined via WITH cte_name AS (...)."
            ],
            diagramTitle: "Window Function Partition Ranking",
            diagram: `Partition: Dept 10  ──> Sort Salary DESC ──> Assign ROW_NUMBER() [1, 2, 3]
Partition: Dept 20  ──> Sort Salary DESC ──> Assign ROW_NUMBER() [1, 2]`,
            complexities: [
              { operation: "Window Partition Sort", best: "O(N log N)", avg: "O(N log N)", worst: "O(N log N)", space: "O(N)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL",
                code: `WITH RankedSalaries AS (
    SELECT name, dept_id, salary,
           DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as rank_num
    FROM Employees
)
SELECT name, dept_id, salary FROM RankedSalaries WHERE rank_num <= 3;`
              }
            ],
            practiceProblems: [
              { title: "Department Top 3 Salaries", difficulty: "Hard", url: "https://leetcode.com/problems/department-top-three-salaries/", platform: "LeetCode" }
            ]
          }
        ]
      },
      {
        id: "normalization-indexes",
        name: "2. Schema Normalization & Indexing",
        shortDesc: "1NF to BCNF decomposition and B+ Tree index structures.",
        iconName: "Database",
        topics: [
          {
            id: "database-1nf-2nf",
            slug: "database-normalization-1nf-2nf",
            title: "5. 1NF & 2NF Normalization",
            categoryId: "normalization-indexes",
            categoryName: "2. Schema Normalization & Indexing",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "1NF 2NF Normalization GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "1NF enforces atomic attributes; 2NF eliminates partial functional dependencies.",
            keyPoints: [
              "1NF: Atomic values; no multi-valued attributes or repeating groups.",
              "2NF: In 1NF + no non-key attribute depends on part of a composite primary key.",
              "Decomposes tables by splitting partial dependencies into new tables."
            ],
            diagramTitle: "2NF Partial Dependency Removal",
            diagram: `[ Order_ID, Item_ID ] ──> Quantity  (Full Primary Key Dependency)
[ Item_ID ] ────────────> Item_Price (Partial Dependency ──> Split to Items Table)`,
            complexities: [
              { operation: "Schema Validation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL Schema",
                code: `CREATE TABLE OrderItems (order_id INT, item_id INT, qty INT, PRIMARY KEY(order_id, item_id));
CREATE TABLE Items (item_id INT PRIMARY KEY, item_price DECIMAL(10,2));`
              }
            ],
            practiceProblems: [
              { title: "Design Twitter", difficulty: "Medium", url: "https://leetcode.com/problems/design-twitter/", platform: "LeetCode" }
            ]
          },
          {
            id: "database-3nf-bcnf",
            slug: "database-normalization-3nf-bcnf",
            title: "6. 3NF & Boyce-Codd Normal Form (BCNF)",
            categoryId: "normalization-indexes",
            categoryName: "2. Schema Normalization & Indexing",
            difficulty: "Intermediate",
            estimatedTime: "20 mins",
            gfgSearchQuery: "3NF BCNF Normalization GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "3NF eliminates transitive dependencies (A -> B -> C); BCNF requires X to be a Super Key for all X -> Y.",
            keyPoints: [
              "3NF: No non-key attribute depends transitively on primary key.",
              "BCNF: Stricter version of 3NF eliminating all candidate key anomalies.",
              "Lossless Join & Dependency Preservation guarantees."
            ],
            diagramTitle: "3NF Transitive Dependency Decomposition",
            diagram: `Emp_ID ──> Zip_Code ──> City_Name  (Transitive Dependency!)
  ▼
Table 1: [ Emp_ID, Zip_Code ]
Table 2: [ Zip_Code, City_Name ] (Decomposed into 3NF)`,
            complexities: [
              { operation: "Schema Decomposition", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL Schema",
                code: `CREATE TABLE EmployeeZip (emp_id INT PRIMARY KEY, zip VARCHAR(10));
CREATE TABLE ZipCities (zip VARCHAR(10) PRIMARY KEY, city VARCHAR(50));`
              }
            ],
            practiceProblems: [
              { title: "Design Food Rating System", difficulty: "Medium", url: "https://leetcode.com/problems/design-a-food-rating-system/", platform: "LeetCode" }
            ]
          },
          {
            id: "bplus-tree-indexing",
            slug: "b-plus-tree-indexing-dbms",
            title: "7. B+ Tree Indexing & Range Queries",
            categoryId: "normalization-indexes",
            categoryName: "2. Schema Normalization & Indexing",
            difficulty: "Advanced",
            estimatedTime: "20 mins",
            gfgSearchQuery: "B+ Tree Indexing DBMS GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "Balanced N-ary tree storing data pointers exclusively in linked leaf nodes.",
            keyPoints: [
              "Leaf nodes linked via pointers for ultra-fast range queries L <= key <= R.",
              "Clustered Index: Physical data rows ordered by primary key.",
              "Non-Clustered Index: Secondary index pointing to primary key locators."
            ],
            diagramTitle: "B+ Tree Leaf Node Linkage Diagram",
            diagram: `       [ Root: 50 ]
      /            \\
  [ 20 | 30 ]     [ 60 | 80 ]
      │               │
  ( Leaf 1 ) ──Next─> ( Leaf 2 ) ──Next─> ( Leaf 3 )`,
            complexities: [
              { operation: "B+ Tree Search", best: "O(log_b N)", avg: "O(log_b N)", worst: "O(log_b N)", space: "O(N)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL Index",
                code: `CREATE INDEX idx_student_dept ON Students(dept);
CREATE UNIQUE INDEX idx_customer_email ON Customers(email);`
              }
            ],
            practiceProblems: [
              { title: "Find First and Last Position", difficulty: "Medium", url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", platform: "LeetCode" }
            ]
          },
          {
            id: "hash-indexing",
            slug: "hash-indexing-dbms",
            title: "8. Hash Indexing & Query Optimization",
            categoryId: "normalization-indexes",
            categoryName: "2. Schema Normalization & Indexing",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "Hash Indexing DBMS GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "Hash indexes map key values to bucket pointers using a hash function h(K) for O(1) equality lookups.",
            keyPoints: [
              "O(1) instant equality lookup WHERE key = value.",
              "Does NOT support range queries WHERE val BETWEEN A AND B.",
              "Extendible Hashing handles dynamic directory expansion."
            ],
            diagramTitle: "Hash Index Bucket Mapping",
            diagram: `Key: "Alice" ──> Hash Function h("Alice") = 3 ──> Bucket 3 [ Pointer to Row ]`,
            complexities: [
              { operation: "Equality Lookup", best: "O(1)", avg: "O(1)", worst: "O(N)", space: "O(N)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL Index",
                code: `CREATE INDEX idx_user_hash ON Users USING HASH (username);`
              }
            ],
            practiceProblems: [
              { title: "Design HashMap", difficulty: "Easy", url: "https://leetcode.com/problems/design-hashmap/", platform: "LeetCode" }
            ]
          }
        ]
      },
      {
        id: "transactions-concurrency",
        name: "3. Transactions & Concurrency Control",
        shortDesc: "ACID properties, 2PL locking, and isolation levels.",
        iconName: "BrainCircuit",
        topics: [
          {
            id: "acid-transactions",
            slug: "acid-properties-concurrency-control",
            title: "9. ACID Properties & Transaction States",
            categoryId: "transactions-concurrency",
            categoryName: "3. Transactions & Concurrency Control",
            difficulty: "Advanced",
            estimatedTime: "20 mins",
            gfgSearchQuery: "ACID Properties DBMS GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "Atomicity, Consistency, Isolation, and Durability guarantees for database modifications.",
            keyPoints: [
              "Atomicity: All-or-nothing execution via Commit or Rollback.",
              "Consistency: Database transitions from one valid state to another.",
              "Durability: Committed data survives system crashes via Write-Ahead Logging (WAL)."
            ],
            diagramTitle: "Transaction State Transition Diagram",
            diagram: `[ Active ] ──> [ Partially Committed ] ──> [ Committed ] (SUCCESS)
    │
    └───> [ Failed ] ──> [ Aborted ] (ROLLBACK)`,
            complexities: [
              { operation: "Commit / Rollback", best: "O(1)", avg: "O(1)", worst: "O(Log)", space: "O(WAL Log)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL Transaction",
                code: `BEGIN TRANSACTION;
UPDATE Accounts SET balance = balance - 500 WHERE acc_id = 101;
UPDATE Accounts SET balance = balance + 500 WHERE acc_id = 202;
COMMIT;`
              }
            ],
            practiceProblems: [
              { title: "Design Bank System", difficulty: "Medium", url: "https://leetcode.com/problems/simple-bank-system/", platform: "LeetCode" }
            ]
          },
          {
            id: "concurrency-2pl",
            slug: "two-phase-locking-2pl-deadlocks",
            title: "10. Two-Phase Locking (2PL) & Deadlocks",
            categoryId: "transactions-concurrency",
            categoryName: "3. Transactions & Concurrency Control",
            difficulty: "Advanced",
            estimatedTime: "25 mins",
            gfgSearchQuery: "Two Phase Locking GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "Strict 2PL prevents dirty reads by requiring lock acquisition phase before any lock release phase.",
            keyPoints: [
              "Shared Lock (S): Read-only access; multiple transactions can hold S-locks.",
              "Exclusive Lock (X): Read-write access; only 1 transaction can hold X-lock.",
              "Deadlock Detection: Wait-For Graph cycles trigger transaction abortion."
            ],
            diagramTitle: "2PL Growing & Shrinking Phase",
            diagram: `Growing Phase (Acquires S & X Locks) ──> LOCK POINT ──> Shrinking Phase (Releases Locks)`,
            complexities: [
              { operation: "Lock Acquisition", best: "O(1)", avg: "O(1)", worst: "Deadlock O(V+E)", space: "O(Locks)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL Locking",
                code: `SELECT * FROM Accounts WHERE acc_id = 101 FOR UPDATE; -- Exclusive X Lock`
              }
            ],
            practiceProblems: [
              { title: "Design Lock Manager", difficulty: "Hard", url: "https://leetcode.com/problems/design-bounded-blocking-queue/", platform: "LeetCode" }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // 4. COMPUTER NETWORKS & PROTOCOLS LAB (10 NETWORK TOPICS)
  // ==========================================
  "computer-networks": {
    title: "Computer Networks Roadmap",
    badge: "TCP/IP / ARQ Protocols / Dijkstra / Sockets",
    categories: [
      {
        id: "network-architecture",
        name: "1. Network Architecture & IP Subnetting",
        shortDesc: "OSI 7-Layer model, IPv4/IPv6 CIDR subnetting, and ARP.",
        iconName: "Network",
        topics: [
          {
            id: "osi-tcpip-model",
            slug: "osi-tcpip-architecture-layers",
            title: "1. OSI 7-Layer Architecture & TCP/IP Suite",
            categoryId: "network-architecture",
            categoryName: "1. Network Architecture & IP Subnetting",
            difficulty: "Beginner",
            estimatedTime: "15 mins",
            gfgSearchQuery: "OSI Model Computer Networks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "OSI 7-Layer model standardizes network communication from Physical bits up to Application data.",
            keyPoints: [
              "Encapsulation: Data -> Segment (L4) -> Packet (L3) -> Frame (L2) -> Bits (L1).",
              "L2 Data Link: MAC addresses & CRC error checking.",
              "L3 Network: IP routing across routers."
            ],
            diagramTitle: "OSI Layer Encapsulation Flowchart",
            diagram: `[ Application Data ] ──> [ L4 Header + Data ] (Segment)
                     ──> [ L3 Header + Segment ] (Packet)
                     ──> [ L2 Header + Packet + Trailer ] (Frame)
                     ──> [ 010110101 Bits ] (Physical)`,
            complexities: [
              { operation: "Header Encapsulation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(Header)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `import socket
print("Host IP:", socket.gethostbyname(socket.gethostname()))`
              }
            ],
            practiceProblems: [
              { title: "IP Address Validation", difficulty: "Medium", url: "https://leetcode.com/problems/validate-ip-address/", platform: "LeetCode" }
            ]
          },
          {
            id: "ipv4-subnetting",
            slug: "ipv4-addressing-cidr-subnetting",
            title: "2. IPv4 Subnetting & CIDR Calculations",
            categoryId: "network-architecture",
            categoryName: "1. Network Architecture & IP Subnetting",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "IP Subnetting CIDR",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "CIDR subnet masks (/24) divide 32-bit IPv4 addresses into Network ID and Host ID bits.",
            keyPoints: [
              "Subnet Mask /24 = 255.255.255.0 (24 Network bits, 8 Host bits).",
              "Usable Hosts = 2^(32 - CIDR) - 2.",
              "Private IP Ranges: 10.0.0.0/8, 192.168.0.0/16."
            ],
            diagramTitle: "IPv4 Subnet Bit Split Diagram",
            diagram: `┌───────────────────────────────┬───────────────┐
│ 24 Network Bits (192.168.1.x) │ 8 Host Bits   │
└───────────────────────────────┴───────────────┘
  <───── Subnet Mask /24 ────────>  254 Hosts`,
            complexities: [
              { operation: "Subnet Bitwise AND", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `import ipaddress
net = ipaddress.ip_network('192.168.1.0/24')
print("Total Usable Hosts:", net.num_addresses - 2)`
              }
            ],
            practiceProblems: [
              { title: "Defanging an IP Address", difficulty: "Easy", url: "https://leetcode.com/problems/defanging-an-ip-address/", platform: "LeetCode" }
            ]
          },
          {
            id: "arp-protocol",
            slug: "arp-mac-address-resolution",
            title: "3. MAC Addressing & ARP Protocol",
            categoryId: "network-architecture",
            categoryName: "1. Network Architecture & IP Subnetting",
            difficulty: "Beginner",
            estimatedTime: "12 mins",
            gfgSearchQuery: "ARP Protocol GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Address Resolution Protocol (ARP) translates 32-bit IP addresses to 48-bit MAC hardware addresses.",
            keyPoints: [
              "ARP Request is Broadcast (FF:FF:FF:FF:FF:FF) across LAN.",
              "ARP Reply is Unicast back from target node.",
              "ARP Cache stores IP-to-MAC mappings in local RAM."
            ],
            diagramTitle: "ARP Broadcast & Unicast Flowchart",
            diagram: `Sender (IP A) ── Broadcast ARP Request "Who has IP B?" ──> LAN Switch ──> All Hosts
Host B ── Unicast ARP Reply "IP B is at MAC B" ──> Sender`,
            complexities: [
              { operation: "Cache Lookup", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `import uuid
mac = ':'.join(['{:02x}'.format((uuid.getnode() >> ele) & 0xff) for ele in range(0,8*6,8)][::-1])
print("Hardware MAC Address:", mac)`
              }
            ],
            practiceProblems: [
              { title: "Validate MAC Address", difficulty: "Easy", url: "https://leetcode.com/problems/valid-ip-address/", platform: "LeetCode" }
            ]
          }
        ]
      },
      {
        id: "data-link-layer",
        name: "2. Data Link Protocols & ARQ",
        shortDesc: "CRC error detection, Stop-and-Wait, Go-Back-N, and Selective Repeat ARQ.",
        iconName: "Code2",
        topics: [
          {
            id: "crc-error-detection",
            slug: "crc-error-detection-polynomial",
            title: "4. CRC Polynomial Error Detection",
            categoryId: "data-link-layer",
            categoryName: "2. Data Link Protocols & ARQ",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "CRC Error Detection GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Cyclic Redundancy Check uses binary XOR modulo-2 division to detect bit flip errors.",
            keyPoints: [
              "Generator Polynomial G(x) appends r zero bits to message M(x).",
              "Modulo-2 XOR division computes r-bit CRC checksum remainder.",
              "Receiver validates frame if remainder is zero."
            ],
            diagramTitle: "CRC Modulo-2 XOR Division Diagram",
            diagram: `Message M(x) + r Zeros ──> Modulo-2 XOR Div by G(x) ──> Remainder R(x) (CRC Checksum)`,
            complexities: [
              { operation: "Modulo-2 Division", best: "O(N * r)", avg: "O(N * r)", worst: "O(N * r)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `def xor(a, b):
    return ''.join(['0' if a[i] == b[i] else '1' for i in range(1, len(b))])`
              }
            ],
            practiceProblems: [
              { title: "Single Number XOR", difficulty: "Easy", url: "https://leetcode.com/problems/single-number/", platform: "LeetCode" }
            ]
          },
          {
            id: "stop-wait-arq",
            slug: "stop-and-wait-arq-protocol",
            title: "5. Stop-and-Wait ARQ Protocol",
            categoryId: "data-link-layer",
            categoryName: "2. Data Link Protocols & ARQ",
            difficulty: "Beginner",
            estimatedTime: "12 mins",
            gfgSearchQuery: "Stop and Wait ARQ GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Sender transmits 1 frame at a time, halting until receiving receiver ACK.",
            keyPoints: [
              "Sender holds frame in buffer until ACK arrives.",
              "Timer retransmits frame if ACK is lost.",
              "Sequence numbers (0 and 1) prevent duplicate frames."
            ],
            diagramTitle: "Stop-and-Wait Timeline Diagram",
            diagram: `Sender               Receiver
  │  Frame (Seq=0)     │
  │───────────────────>│  ACK 1
  │<───────────────────│`,
            complexities: [
              { operation: "Efficiency", best: "1 / (1 + 2a)", avg: "1 / (1 + 2a)", worst: "0", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "Java",
                code: `import java.net.*;
public class StopWaitSender {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket();
        byte[] buf = "Frame 0".getBytes();
        socket.send(new DatagramPacket(buf, buf.length, InetAddress.getByName("localhost"), 9876));
    }
}`
              }
            ],
            practiceProblems: [
              { title: "Design Push Pop Protocol", difficulty: "Easy", url: "https://leetcode.com/problems/backspace-string-compare/", platform: "LeetCode" }
            ]
          },
          {
            id: "sliding-window-arq",
            slug: "sliding-window-arq-protocols",
            title: "6. Go-Back-N & Selective Repeat ARQ",
            categoryId: "data-link-layer",
            categoryName: "2. Data Link Protocols & ARQ",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "Sliding Window Protocol GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Sliding Window ARQ delivers error-free sequential packet frames using sequence numbers and ACKs.",
            keyPoints: [
              "Go-Back-N ARQ: Transmits window size N; drops out-of-order frames.",
              "Selective Repeat ARQ: Buffers out-of-order frames; retransmits missing frame.",
              "Optimizes link utilization on high latency channels."
            ],
            diagramTitle: "ARQ Window Transmission Diagram",
            diagram: `Sender Window [ 1, 2, 3, 4 ] ──> Transmit Frames 1..4
  Frame 2 Lost! ──> Selective Repeat Retransmits Frame 2 Only`,
            complexities: [
              { operation: "Efficiency", best: "O(1)", avg: "N / (1 + 2a)", worst: "1 / (1 + 2a)", space: "O(N)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "Java",
                code: `import java.net.*;
public class ARQSender {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket();
        byte[] buf = "Packet Seq=1".getBytes();
        socket.send(new DatagramPacket(buf, buf.length, InetAddress.getByName("localhost"), 9876));
    }
}`
              }
            ],
            practiceProblems: [
              { title: "Encode and Decode Strings", difficulty: "Medium", url: "https://leetcode.com/problems/encode-and-decode-strings/", platform: "LeetCode" }
            ]
          }
        ]
      },
      {
        id: "routing-transport",
        name: "3. Routing & Transport Protocols",
        shortDesc: "Dijkstra, Bellman-Ford, TCP 3-way handshake, and Socket programming.",
        iconName: "Network",
        topics: [
          {
            id: "dijkstra-routing",
            slug: "dijkstra-link-state-routing",
            title: "7. Dijkstra Link-State Routing",
            categoryId: "routing-transport",
            categoryName: "3. Routing & Transport Protocols",
            difficulty: "Advanced",
            estimatedTime: "20 mins",
            gfgSearchQuery: "Dijkstra Routing GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Link-State routing algorithm calculating global shortest path trees across routers.",
            keyPoints: [
              "Every router floods Link-State Advertisements (LSA) to build full topology graph.",
              "Min-Heap Priority Queue optimizes runtime to O((V + E) log V).",
              "Used in Open Shortest Path First (OSPF) IP routing."
            ],
            diagramTitle: "Link-State Graph Traversal Diagram",
            diagram: `Router A ──(1)──> Router B ──(2)──> Router C
   │                                   ▲
   └───────────────(5)─────────────────┘`,
            complexities: [
              { operation: "Dijkstra Priority Queue", best: "O(E log V)", avg: "O(E log V)", worst: "O(E log V)", space: "O(V+E)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `import heapq

def dijkstra(graph, src, V):
    dist = [float('inf')] * V; dist[src] = 0
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w; heapq.heappush(pq, (dist[v], v))
    return dist`
              }
            ],
            practiceProblems: [
              { title: "Network Delay Time", difficulty: "Medium", url: "https://leetcode.com/problems/network-delay-time/", platform: "LeetCode" }
            ]
          },
          {
            id: "bellman-ford-routing",
            slug: "distance-vector-bellman-ford",
            title: "8. Distance-Vector & Bellman-Ford Routing",
            categoryId: "routing-transport",
            categoryName: "3. Routing & Transport Protocols",
            difficulty: "Advanced",
            estimatedTime: "20 mins",
            gfgSearchQuery: "Bellman Ford GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Distance-vector algorithm relaxing edges V-1 times; detects negative weight cycles.",
            keyPoints: [
              "Routers exchange routing tables with immediate neighbors.",
              "Relaxes all E edges V-1 times.",
              "Used in Routing Information Protocol (RIP)."
            ],
            diagramTitle: "Distance Vector Table Exchange Flowchart",
            diagram: `Router A Table ── Exchanged ──> Router B ── Updates Row if (dist_A + cost < dist_B)`,
            complexities: [
              { operation: "Bellman-Ford", best: "O(E)", avg: "O(V*E)", worst: "O(V*E)", space: "O(V)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `def bellman_ford(edges, V, src):
    dist = [float('inf')] * V; dist[src] = 0
    for _ in range(V - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]: dist[v] = dist[u] + w
    return dist`
              }
            ],
            practiceProblems: [
              { title: "Cheapest Flights Within K Stops", difficulty: "Medium", url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", platform: "LeetCode" }
            ]
          },
          {
            id: "tcp-handshake",
            slug: "tcp-three-way-handshake",
            title: "9. TCP 3-Way Handshake & Connection States",
            categoryId: "routing-transport",
            categoryName: "3. Routing & Transport Protocols",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "TCP 3 Way Handshake GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Establishes reliable connection via SYN, SYN-ACK, ACK packet exchange.",
            keyPoints: [
              "Step 1: Client sends SYN (Seq = x).",
              "Step 2: Server replies SYN-ACK (Seq = y, ACK = x+1).",
              "Step 3: Client sends ACK (ACK = y+1)."
            ],
            diagramTitle: "TCP 3-Way Handshake Sequence Diagram",
            diagram: `Client                               Server
  │           SYN (Seq=100)            │
  │───────────────────────────────────>│
  │       SYN-ACK (Seq=300, ACK=101)   │
  │<───────────────────────────────────│
  │           ACK (ACK=301)            │
  │───────────────────────────────────>│ (ESTABLISHED)`,
            complexities: [
              { operation: "Connection Setup", best: "1 RTT", avg: "1 RTT", worst: "Timeout", space: "O(Buffer)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('google.com', 80)) # Triggers TCP 3-Way Handshake
print("TCP Connection Established!")`
              }
            ],
            practiceProblems: [
              { title: "Design Underground System", difficulty: "Medium", url: "https://leetcode.com/problems/design-underground-system/", platform: "LeetCode" }
            ]
          },
          {
            id: "socket-programming",
            slug: "socket-programming-tcp-udp",
            title: "10. TCP & UDP Socket Programming",
            categoryId: "routing-transport",
            categoryName: "3. Routing & Transport Protocols",
            difficulty: "Intermediate",
            estimatedTime: "20 mins",
            gfgSearchQuery: "Socket Programming GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Client-Server socket API communication over TCP streams or UDP datagrams.",
            keyPoints: [
              "Server API: socket(), bind(), listen(), accept(), recv(), send().",
              "Client API: socket(), connect(), send(), recv(), close().",
              "UDP DatagramSockets transmit lightweight un-acknowledged packets."
            ],
            diagramTitle: "Socket Client-Server Lifecycle Flowchart",
            diagram: `Server: socket() ──> bind() ──> listen() ──> accept() ──> recv() ──> send()
Client: socket() ───────────────────────────> connect() ──> send() ──> recv()`,
            complexities: [
              { operation: "Socket Transfer", best: "O(N)", avg: "O(N)", worst: "O(N)", space: "O(Buffer)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python TCP Server",
                code: `import socket
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('localhost', 8080))
server.listen(1)
conn, addr = server.accept()
conn.sendall(b"Hello Network!")
conn.close()`
              }
            ],
            practiceProblems: [
              { title: "Design Bounded Blocking Queue", difficulty: "Hard", url: "https://leetcode.com/problems/design-bounded-blocking-queue/", platform: "LeetCode" }
            ]
          }
        ]
      }
    ]
  }
};
