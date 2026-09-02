# 🎯 DG & DSA Visualization Platform — Complete Topic Architecture

This directory houses the comprehensive **DG / DSA Interactive Learning and Visualization System** designed for college students and faculty.

## 📦 Complete Topic Structure (All 12 Modules)

1. **Basic Data Structures (`basic-ds-visualizer.tsx`)**:
   - **Array**: Direct indexing, O(1) read offset, O(n) element shifting.
   - **Dynamic Array**: Capacity resizing (x2 doubling) with amortized O(1) append.
   - **2D Array / Matrix**: Row-major contiguous RAM layout and spiral traversal.
   - **Linked Lists**: Singly, Doubly (bidirectional next/prev), and Circular (tail-to-head loop).
   - **Stack**: LIFO (Last In, First Out) with TOP pointer tracking.
   - **Queue**: FIFO (First In, First Out) with FRONT/REAR tracking and circular buffer modulo indexing.

2. **Searching Algorithms (`searching-suite-visualizer.tsx`)**:
   - **Linear Search**: Sequential element scanning.
   - **Binary Search**: Logarithmic O(log n) space halving with Left, Mid, Right pointers.
   - **Jump Search**: Stepping in √n intervals + local verification scan.
   - **Interpolation Search**: Uniformly distributed position probing formula.
   - **Exponential Search**: Doubling search bounds (1, 2, 4, 8...) then binary searching interval.

3. **Sorting Algorithms (`sorting-suite-visualizer.tsx`)**:
   - **Beginner**: Bubble Sort, Selection Sort, Insertion Sort.
   - **Intermediate**: Merge Sort, Quick Sort, Heap Sort, Shell Sort.
   - **Non-Comparison**: Counting Sort, Radix Sort, Bucket Sort.
   - **Live Metrics**: Comparisons count, Swaps count, Passes count, Playback controls, Speed slider.

4. **Recursion & Backtracking (`recursion-backtracking-visualizer.tsx`)**:
   - **Factorial**: JVM Call Stack frame push/pop and unwinding product propagation.
   - **N-Queens**: NxN chessboard exploration with constraint pruning and backtrack trigger.
   - **Tower of Hanoi**: Step-by-step disk transfers between pegs A, B, and C in 2ⁿ - 1 moves.
   - **Fibonacci**: Recursion tree visualization with overlapping subproblems.

5. **Trees & Balanced Trees (`tree-suite-visualizer.tsx`)**:
   - **Binary Tree Traversals**: Preorder, Inorder, Postorder, and Level Order (BFS).
   - **Binary Search Tree (BST)**: Insert, Search, and Delete with left < node < right invariant.
   - **AVL Tree**: Rotations (LL, RR, LR, RL) with balance factor tracking (|BF| ≤ 1).
   - **Binary Heap**: Min/Max Heap with simultaneous Tree View and 1D Array index mapping.

6. **Graphs & Networks (`graph-suite-visualizer.tsx`)**:
   - **Traversals**: BFS (queue-based wavefront) and DFS (stack-based recursive exploration).
   - **Shortest Path**: Dijkstra's algorithm with live distance table tracking (A=0, others=∞).
   - **Disjoint Set / Union-Find**: MakeSet, Find with path compression, and Union by rank.

7. **Greedy Algorithms (`greedy-dp-visualizer.tsx`)**:
   - **Activity Selection**: Earliest finish time interval scheduling.
   - **Fractional Knapsack**: Greedy sorting by value-to-weight ratio.
   - **Huffman Coding**: Lossless prefix compression with frequency min-heap tree.

8. **Dynamic Programming (`greedy-dp-visualizer.tsx`)**:
   - **1D DP**: Fibonacci tabulation and Climbing Stairs (O(n) time).
   - **2D DP**: 0/1 Knapsack animated capacity table `dp[item][capacity]` cell computation.

9. **Hashing & Collision Handling (`hashing-suite-visualizer.tsx`)**:
   - **Hash Function**: `hash(k) = k % 10`.
   - **Separate Chaining**: Linked lists per bucket.
   - **Open Addressing**: Linear probing `(hash + 1) % size`.

10. **String Algorithms (`string-suite-visualizer.tsx`)**:
    - **Trie (Prefix Tree)**: Word autocomplete with shared prefix nodes ('cat', 'car', 'can').
    - **KMP Pattern Matching**: Longest Prefix Suffix (LPS) table jump mechanism.

11. **Divide and Conquer**:
    - Lifecycle: Divide ──> Solve ──> Combine.

12. **Complexity Analysis & DS Comparison (`complexity-comparator.tsx`)**:
    - **Big-O Growth Curves**: O(1), O(log n), O(n), O(n log n), O(n²).
    - **Operations Matrix**: Interactive comparison of Access, Search, Insert, Delete across all data structures.

---

## 👨‍🎓 Standard Information & Student Mode Architecture
Every visualizer incorporates:
- **What is happening?**: Plain-English explanation of current state.
- **Why did this happen?**: Underlying algorithm logic and invariant decisions.
- **What will happen next?**: Predictive preview of subsequent step.
- **Complexity Matrix**: Best, Average, Worst, and Space asymptotic bounds.
- **Code Mode**: Implementations in Java, Python, C++, and JavaScript.
