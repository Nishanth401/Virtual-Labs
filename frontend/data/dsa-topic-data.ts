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
  language: "java" | "cpp" | "python" | "javascript" | "sql" | "c" | "bash" | string;
  label: string;
  code: string;
}

export interface StudentModeExplanation {
  what: string;
  why: string;
  next: string;
}

export interface DSATopic {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  categoryName: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  visualizerType?: string;
  gfgSearchQuery: string;
  gfgUrl: string;
  quickSummary: string;
  summary?: string;
  keyPoints: string[];
  diagramTitle?: string;
  diagram?: string;
  complexities: DSATopicComplexity[];
  codeSnippets: CodeSnippet[];
  practiceProblems: DSATopicPractice[];
  studentMode?: StudentModeExplanation;
  realWorld?: string;
}

export interface DSACategory {
  id: string;
  name: string;
  shortDesc: string;
  iconName: string;
  topics: DSATopic[];
}

export const DSA_CATEGORIES_DATA: DSACategory[] = [
  // 1. BASIC DATA STRUCTURES
  {
    id: "basic-data-structures",
    name: "1. Basic Data Structures",
    shortDesc: "Arrays, dynamic arrays, linked lists, stacks, queues, and hash tables.",
    iconName: "Layers",
    topics: [
      {
        id: "array-ds",
        slug: "array-data-structure",
        title: "Array & Dynamic Array",
        categoryId: "basic-data-structures",
        categoryName: "1. Basic Data Structures",
        difficulty: "Beginner",
        estimatedTime: "12 mins",
        visualizerType: "array",
        gfgSearchQuery: "Array Data Structure GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/array-data-structure/",
        quickSummary: "Contiguous memory sequence allowing instant O(1) index access with dynamic doubling resizing.",
        keyPoints: [
          "Contiguous Memory: Address = Base + Index * ElementSize gives O(1) access.",
          "Dynamic Resizing: Capacity doubles (x2) when full; amortized O(1) append.",
          "Insert / Delete: Requires shifting remaining elements in O(n) worst-case."
        ],
        diagramTitle: "Dynamic Array Resizing (Capacity Doubling)",
        diagram: `Cap: 2 [ 10 | 20 ] (Full!)
  ↓ Allocate new memory buffer (Cap: 4) & copy elements
Cap: 4 [ 10 | 20 | 30 | __ ]`,
        complexities: [
          { operation: "Access [i]", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(n)" },
          { operation: "Append", best: "O(1)", avg: "O(1)*", worst: "O(n)", space: "O(1)" },
          { operation: "Insert/Delete", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public class DynamicArray {
    private int[] data = new int[2];
    private int size = 0;
    public void add(int val) {
        if (size == data.length) {
            int[] next = new int[data.length * 2];
            System.arraycopy(data, 0, next, 0, size);
            data = next;
        }
        data[size++] = val;
    }
}`
          },
          {
            language: "python",
            label: "Python",
            code: `class DynamicArray:
    def __init__(self):
        self.data = [0] * 2
        self.size = 0
    def append(self, val):
        if self.size == len(self.data):
            self.data += [0] * len(self.data)
        self.data[self.size] = val
        self.size += 1`
          }
        ],
        practiceProblems: [
          { title: "Two Sum", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum/", platform: "LeetCode" },
          { title: "Best Time to Buy and Sell Stock", difficulty: "Easy", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Accessing or modifying contiguous elements by computed memory offset.",
          why: "Arrays guarantee CPU cache locality for lightning-fast sequential iteration.",
          next: "Observe capacity expansion when elements exceed buffer limit."
        },
        realWorld: "Buffer allocation in operating systems, image pixel storage, and CPU cache line reads."
      },
      {
        id: "matrix-ds",
        slug: "2d-array-matrix",
        title: "2D Array & Matrix",
        categoryId: "basic-data-structures",
        categoryName: "1. Basic Data Structures",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        visualizerType: "matrix",
        gfgSearchQuery: "Matrix Data Structure GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/matrix/",
        quickSummary: "Grid data structure stored in row-major or column-major contiguous blocks.",
        keyPoints: [
          "Row-major layout: Index = row * cols + col.",
          "Used extensively in Dynamic Programming tables and computer graphics.",
          "Common traversals: Row-wise, Column-wise, Diagonal, and Spiral."
        ],
        diagramTitle: "2D Matrix Grid Mapping",
        diagram: `Row 0: [ (0,0) | (0,1) | (0,2) ]
Row 1: [ (1,0) | (1,1) | (1,2) ]
Row 2: [ (2,0) | (2,1) | (2,2) ]`,
        complexities: [
          { operation: "Access [r][c]", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(r*c)" },
          { operation: "Traversal", best: "O(r*c)", avg: "O(r*c)", worst: "O(r*c)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public class MatrixTraversal {
    public static void printSpiral(int[][] matrix) {
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;
        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++) System.out.print(matrix[top][j] + " ");
            top++;
        }
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Spiral Matrix", difficulty: "Medium", url: "https://leetcode.com/problems/spiral-matrix/", platform: "LeetCode" },
          { title: "Rotate Image", difficulty: "Medium", url: "https://leetcode.com/problems/rotate-image/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Traversing grid rows and columns using nested index coordinates.",
          why: "Coordinates map spatial positions directly to contiguous memory offsets.",
          next: "Spiral clockwise traversal wrapping from outer boundaries inwards."
        },
        realWorld: "Digital image convolutions, game map grids, spreadsheet cells, and DP memoization tables."
      },
      {
        id: "linked-list-all",
        slug: "linked-list-variations",
        title: "Linked Lists (Singly, Doubly, Circular)",
        categoryId: "basic-data-structures",
        categoryName: "1. Basic Data Structures",
        difficulty: "Beginner",
        estimatedTime: "18 mins",
        visualizerType: "linked-list",
        gfgSearchQuery: "Linked List Data Structure GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/data-structures/linked-list/",
        quickSummary: "Dispersed heap memory nodes interconnected by forward (next) and backward (prev) pointers.",
        keyPoints: [
          "Singly Linked List: Head -> Node1 -> Node2 -> NULL.",
          "Doubly Linked List: Prev <- Node <-> Node -> Next (bidirectional navigation).",
          "Circular Linked List: Tail.next connects directly back to Head."
        ],
        diagramTitle: "Doubly Linked List Pointer Architecture",
        diagram: `HEAD <-> [Prev| 10 |Next] <===> [Prev| 20 |Next] <===> [Prev| 30 |Next] -> NULL`,
        complexities: [
          { operation: "Insert at Head", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Search by Value", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Delete Known Node", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `class ListNode {
    int val;
    ListNode next, prev;
    ListNode(int x) { val = x; }
}`
          }
        ],
        practiceProblems: [
          { title: "Reverse Linked List", difficulty: "Easy", url: "https://leetcode.com/problems/reverse-linked-list/", platform: "LeetCode" },
          { title: "Linked List Cycle", difficulty: "Easy", url: "https://leetcode.com/problems/linked-list-cycle/", platform: "LeetCode" },
          { title: "LRU Cache", difficulty: "Medium", url: "https://leetcode.com/problems/lru-cache/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Updating reference pointers to rewire nodes in dynamic heap RAM.",
          why: "Avoids costly contiguous array shifting during insertions and deletions.",
          next: "Observe pointer updates reconnecting previous and successor nodes."
        },
        realWorld: "Browser forward/back history (Doubly), round-robin OS scheduling (Circular), and LRU cache."
      },
      {
        id: "stack-queue-all",
        slug: "stack-and-queue-variations",
        title: "Stack, Queue & Deque",
        categoryId: "basic-data-structures",
        categoryName: "1. Basic Data Structures",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        visualizerType: "stack-queue",
        gfgSearchQuery: "Stack Queue Data Structure GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/stack-data-structure/",
        quickSummary: "LIFO (Stack), FIFO (Queue), and double-ended (Deque) linear access controllers.",
        keyPoints: [
          "Stack (LIFO): Push & Pop at TOP index (used in call stack & undo).",
          "Queue (FIFO): Enqueue at REAR, Dequeue at FRONT.",
          "Circular Queue: Modulo index wrapping ((rear + 1) % size) prevents memory drift."
        ],
        diagramTitle: "Stack (LIFO) vs Queue (FIFO)",
        diagram: `STACK: Push 30 ──> [ 30 ] ← TOP     QUEUE: Enqueue ──> [ 10 | 20 | 30 ] ──> Dequeue 10
                   [ 20 ]                          FRONT           REAR
                   [ 10 ]`,
        complexities: [
          { operation: "Push / Enqueue", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Pop / Dequeue", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Peek", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `import java.util.ArrayDeque;
import java.util.Deque;
public class DequeExample {
    public static void main(String[] args) {
        Deque<Integer> dq = new ArrayDeque<>();
        dq.addFirst(10);
        dq.addLast(20);
        int front = dq.removeFirst();
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Valid Parentheses", difficulty: "Easy", url: "https://leetcode.com/problems/valid-parentheses/", platform: "LeetCode" },
          { title: "Implement Queue using Stacks", difficulty: "Easy", url: "https://leetcode.com/problems/implement-queue-using-stacks/", platform: "LeetCode" },
          { title: "Sliding Window Maximum", difficulty: "Hard", url: "https://leetcode.com/problems/sliding-window-maximum/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Restricting data ingress and egress to enforce LIFO or FIFO order.",
          why: "Prevents race conditions and preserves strict chronological or reverse execution order.",
          next: "Observe top pointer advancing and retreating with each operation."
        },
        realWorld: "Function recursion call stacks, printer print queues, undo/redo buffers, and web scrapers."
      }
    ]
  },

  // 2. SEARCHING ALGORITHMS
  {
    id: "searching-algorithms",
    name: "2. Searching Algorithms",
    shortDesc: "Linear, binary, jump, interpolation, and exponential search.",
    iconName: "Search",
    topics: [
      {
        id: "linear-binary-search",
        slug: "linear-and-binary-search",
        title: "Linear & Binary Search",
        categoryId: "searching-algorithms",
        categoryName: "2. Searching Algorithms",
        difficulty: "Beginner",
        estimatedTime: "12 mins",
        visualizerType: "searching",
        gfgSearchQuery: "Binary Search Algorithm GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/binary-search/",
        quickSummary: "Compare sequential O(n) checking against logarithmic O(log n) divide-and-conquer.",
        keyPoints: [
          "Linear Search: Unsorted data, checks one by one from left to right in O(n).",
          "Binary Search: Requires sorted array; compares midpoint (L + (R-L)/2).",
          "Search Space Halving: Cuts remaining candidates in half at every step."
        ],
        diagramTitle: "Binary Search Space Halving",
        diagram: `[ 10 | 20 | 30 | 40 | 50 | 60 | 70 ]  Target = 60
   L              M              R      40 < 60 ──> Search Right [ 50 .. 70 ]`,
        complexities: [
          { operation: "Binary Search", best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" },
          { operation: "Linear Search", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public int binarySearch(int[] arr, int target) {
    int l = 0, r = arr.length - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == target) return m;
        if (arr[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`
          }
        ],
        practiceProblems: [
          { title: "Binary Search", difficulty: "Easy", url: "https://leetcode.com/problems/binary-search/", platform: "LeetCode" },
          { title: "Search in Rotated Sorted Array", difficulty: "Medium", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Evaluating midpoint value against target to eliminate half the candidates.",
          why: "Sorting provides a monotonic invariant, guaranteeing target is in one half.",
          next: "Discard left half and reposition L pointer to mid + 1."
        },
        realWorld: "Database index lookups, git bisect commit debugging, and dictionary word search."
      },
      {
        id: "advanced-searching",
        slug: "jump-interpolation-exponential-search",
        title: "Jump, Interpolation & Exponential Search",
        categoryId: "searching-algorithms",
        categoryName: "2. Searching Algorithms",
        difficulty: "Intermediate",
        estimatedTime: "15 mins",
        visualizerType: "advanced-searching",
        gfgSearchQuery: "Interpolation Search GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/interpolation-search/",
        quickSummary: "Jump blocks of √n, interpolate linearly spaced keys in O(log log n), or double bounds.",
        keyPoints: [
          "Jump Search: Steps by √n blocks, then performs linear search within block (O(√n)).",
          "Interpolation Search: Probes pos = low + [(target - arr[low]) * (high - low)] / (arr[high] - arr[low]).",
          "Exponential Search: Doubles search bound (1, 2, 4, 8..) until bound > target, then binary searches."
        ],
        diagramTitle: "Interpolation Search Probe Formula",
        diagram: `pos = low + ( (target - arr[low]) * (high - low) ) / (arr[high] - arr[low])
Directly jumps to likely index if data is uniformly distributed!`,
        complexities: [
          { operation: "Interpolation", best: "O(1)", avg: "O(log log n)", worst: "O(n)", space: "O(1)" },
          { operation: "Jump Search", best: "O(1)", avg: "O(√n)", worst: "O(√n)", space: "O(1)" },
          { operation: "Exponential", best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public int jumpSearch(int[] arr, int target) {
    int n = arr.length, step = (int) Math.floor(Math.sqrt(n)), prev = 0;
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step; step += (int) Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
    for (int i = prev; i < Math.min(step, n); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`
          }
        ],
        practiceProblems: [
          { title: "Find Peak Element", difficulty: "Medium", url: "https://leetcode.com/problems/find-peak-element/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Jumping across index blocks to locate bounding interval faster than single-stepping.",
          why: "Minimizes backwards seeks when traversing storage where jumping has low overhead.",
          next: "Switch to local linear scan within the verified bounding window."
        },
        realWorld: "Searching in unbounded streams, memory page lookups, and telephone directory lookups."
      }
    ]
  },

  // 3. SORTING ALGORITHMS
  {
    id: "sorting-algorithms",
    name: "3. Sorting Algorithms",
    shortDesc: "Comparison sorts (Bubble, Selection, Insertion, Merge, Quick, Heap) & non-comparison sorts.",
    iconName: "ArrowDownUp",
    topics: [
      {
        id: "comparison-sorts",
        slug: "comparison-sorting-suite",
        title: "Comparison Sorts (Bubble, Selection, Insertion)",
        categoryId: "sorting-algorithms",
        categoryName: "3. Sorting Algorithms",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        visualizerType: "sorting",
        gfgSearchQuery: "Sorting Algorithms GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/sorting-algorithms/",
        quickSummary: "Fundamental quadratic sorting algorithms comparing adjacent or minimum keys.",
        keyPoints: [
          "Bubble Sort: Swaps adjacent inversions; largest value bubbles to end each pass.",
          "Selection Sort: Scans unsorted slice for minimum; executes at most (n-1) swaps.",
          "Insertion Sort: Inserts current key into sorted prefix; adaptive O(n) on nearly sorted arrays."
        ],
        diagramTitle: "Bubble Sort Adjacent Comparison Pass",
        diagram: `[ 5 | 3 | 8 | 1 | 2 ] ──> 5 > 3? SWAP ──> [ 3 | 5 | 8 | 1 | 2 ]`,
        complexities: [
          { operation: "Bubble Sort", best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
          { operation: "Selection Sort", best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
          { operation: "Insertion Sort", best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Sort Colors", difficulty: "Medium", url: "https://leetcode.com/problems/sort-colors/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Comparing adjacent elements and swapping them if out of sorted order.",
          why: "Repeated pairwise swaps naturally bubble the maximum item to the terminal index.",
          next: "Advance inner pointer to the next adjacent pair."
        },
        realWorld: "Educational baseline, adaptive sorting of nearly-sorted telemetry streams, card sorting."
      },
      {
        id: "efficient-sorts",
        slug: "divide-conquer-efficient-sorts",
        title: "Fast Sorts (Merge, Quick & Heap Sort)",
        categoryId: "sorting-algorithms",
        categoryName: "3. Sorting Algorithms",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        visualizerType: "fast-sorting",
        gfgSearchQuery: "QuickSort Algorithm GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/quick-sort-algorithm/",
        quickSummary: "O(n log n) divide-and-conquer and heap-based partitioning algorithms.",
        keyPoints: [
          "Merge Sort: Recursively divides array in half, then merges two sorted halves in O(n).",
          "Quick Sort: Partitions around a pivot using Lomuto or Hoare scheme; in-place average O(n log n).",
          "Heap Sort: Builds max heap and repeatedly extracts root max element to end of array."
        ],
        diagramTitle: "QuickSort Pivot Partitioning",
        diagram: `Pivot = 4:  [ 2 | 1 | 3 ]  < [ 4 ] <  [ 7 | 8 | 5 ]
            (Left sub-array)   Pivot   (Right sub-array)`,
        complexities: [
          { operation: "Merge Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
          { operation: "Quick Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)", space: "O(log n)" },
          { operation: "Heap Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Sort an Array", difficulty: "Medium", url: "https://leetcode.com/problems/sort-an-array/", platform: "LeetCode" },
          { title: "Kth Largest Element in an Array", difficulty: "Medium", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Partitioning the list around a selected pivot element.",
          why: "Guarantees the pivot is in its absolute finalized sorted position.",
          next: "Recursively apply quick sort on left and right partitioned halves."
        },
        realWorld: "Java's Arrays.sort() (Dual-Pivot Quicksort / TimSort), Linux C qsort, external database sort."
      },
      {
        id: "linear-sorts",
        slug: "non-comparison-linear-sorts",
        title: "Non-Comparison Sorts (Counting, Radix & Bucket)",
        categoryId: "sorting-algorithms",
        categoryName: "3. Sorting Algorithms",
        difficulty: "Intermediate",
        estimatedTime: "15 mins",
        visualizerType: "non-comparison-sorts",
        gfgSearchQuery: "Counting Sort GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/counting-sort/",
        quickSummary: "Linear O(n + k) sorting without key comparisons using frequency tables and digit buckets.",
        keyPoints: [
          "Counting Sort: Counts frequency of each key and computes cumulative prefix sums.",
          "Radix Sort: Sorts integers digit by digit from least significant digit (LSD) to MSD.",
          "Bucket Sort: Distributes items across uniform intervals, sorts each bucket, and concatenates."
        ],
        diagramTitle: "Counting Sort Frequency Array",
        diagram: `Input:   [ 1, 4, 1, 2, 7, 5, 2 ]
Count[]: Index: 0 1 2 3 4 5 6 7
         Freq:  0 2 2 0 1 1 0 1`,
        complexities: [
          { operation: "Counting Sort", best: "O(n+k)", avg: "O(n+k)", worst: "O(n+k)", space: "O(k)" },
          { operation: "Radix Sort", best: "O(d*(n+k))", avg: "O(d*(n+k))", worst: "O(d*(n+k))", space: "O(n+k)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public void countingSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    int[] count = new int[max + 1];
    for (int x : arr) count[x]++;
    int idx = 0;
    for (int i = 0; i <= max; i++) {
        while (count[i]-- > 0) arr[idx++] = i;
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Sort Colors", difficulty: "Medium", url: "https://leetcode.com/problems/sort-colors/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Tallying frequency occurrences of values in a secondary count array.",
          why: "Bypasses the Ω(n log n) comparison lower bound when key range k is small.",
          next: "Reconstruct output array in linear time using cumulative frequencies."
        },
        realWorld: "Sorting ages, test scores, postal codes, and suffix array construction."
      }
    ]
  },

  // 4. RECURSION & BACKTRACKING
  {
    id: "recursion-backtracking",
    name: "4. Recursion & Backtracking",
    shortDesc: "Call stack recursion, recursion trees, Tower of Hanoi, N-Queens, and maze solving.",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "recursion-callstack",
        slug: "recursion-fundamentals",
        title: "Recursion & Call Stack (Factorial & Hanoi)",
        categoryId: "recursion-backtracking",
        categoryName: "4. Recursion & Backtracking",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        visualizerType: "recursion",
        gfgSearchQuery: "Recursion GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/recursion/",
        quickSummary: "Functions calling themselves with smaller inputs until reaching a terminal base case.",
        keyPoints: [
          "Stack Frames: Each call pushes parameters and local variables onto the call stack.",
          "Base Case: Prevents infinite recursion and StackOverflowError.",
          "Unwinding: As base case returns, values multiply/sum during the return journey."
        ],
        diagramTitle: "Factorial(4) Call Stack Push & Pop",
        diagram: `PUSH: fact(4) ──> fact(3) ──> fact(2) ──> fact(1) [Base: 1]
POP & UNWIND: 1 * 2 = 2 ──> 2 * 3 = 6 ──> 6 * 4 = 24`,
        complexities: [
          { operation: "Factorial", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
          { operation: "Tower of Hanoi", best: "O(2ⁿ)", avg: "O(2ⁿ)", worst: "O(2ⁿ)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public int factorial(int n) {
    if (n <= 1) return 1; // Base case
    return n * factorial(n - 1); // Recursive step
}`
          }
        ],
        practiceProblems: [
          { title: "Pow(x, n)", difficulty: "Medium", url: "https://leetcode.com/problems/powx-n/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Pushing a new stack frame for sub-problem parameter n - 1.",
          why: "Recursion decomposes problem into identical smaller sub-instances.",
          next: "Evaluate base case check or recurse deeper into child frame."
        },
        realWorld: "Compiler syntax tree parsing, directory tree traversal, JSON serialization, and DOM walking."
      },
      {
        id: "backtracking-nqueens",
        slug: "backtracking-n-queens-maze",
        title: "Backtracking (N-Queens & Rat in Maze)",
        categoryId: "recursion-backtracking",
        categoryName: "4. Recursion & Backtracking",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        visualizerType: "backtracking",
        gfgSearchQuery: "N-Queen Problem GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/",
        quickSummary: "Systematic trial-and-error path traversal that abandons invalid branches as soon as detected.",
        keyPoints: [
          "State-Space Tree: Explore all potential configurations branch by branch.",
          "Constraint Checking: If a queen conflicts on row, column, or diagonal, stop immediately.",
          "Backtrack Step: Remove current placement and try the next available column/direction."
        ],
        diagramTitle: "N-Queens Backtracking Decision Cycle",
        diagram: `TRY placement at (row, col)
  ↓
VALID?
 ├── YES ──> Advance to next row (row + 1)
 └── NO  ──> BACKTRACK: Undo choice & try col + 1`,
        complexities: [
          { operation: "N-Queens", best: "O(n!)", avg: "O(n!)", worst: "O(n!)", space: "O(n)" },
          { operation: "Rat in a Maze", best: "O(2^(n²))", avg: "O(2^(n²))", worst: "O(2^(n²))", space: "O(n²)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public boolean solveNQueens(int[][] board, int col) {
    if (col >= board.length) return true;
    for (int i = 0; i < board.length; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 1;
            if (solveNQueens(board, col + 1)) return true;
            board[i][col] = 0; // BACKTRACK
        }
    }
    return false;
}`
          }
        ],
        practiceProblems: [
          { title: "N-Queens", difficulty: "Hard", url: "https://leetcode.com/problems/n-queens/", platform: "LeetCode" },
          { title: "Sudoku Solver", difficulty: "Hard", url: "https://leetcode.com/problems/sudoku-solver/", platform: "LeetCode" },
          { title: "Word Search", difficulty: "Medium", url: "https://leetcode.com/problems/word-search/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Validating whether placing a queen at current cell conflicts with existing queens.",
          why: "Backtracking prunes entire dead-end subtrees before wasting exponential operations.",
          next: "If invalid, undo move (reset to 0) and backtrack to parent state."
        },
        realWorld: "Constraint satisfaction solvers, automated circuit routing, Sudoku engines, and chess AIs."
      }
    ]
  },

  // 5. TREES & BALANCED TREES
  {
    id: "trees-balanced",
    name: "5. Trees & Balanced Trees",
    shortDesc: "Binary trees, BST, AVL tree rotations, and min/max binary heaps.",
    iconName: "TreePine",
    topics: [
      {
        id: "bst-traversals",
        slug: "binary-search-tree-traversals",
        title: "Binary Tree Traversals & BST",
        categoryId: "trees-balanced",
        categoryName: "5. Trees & Balanced Trees",
        difficulty: "Intermediate",
        estimatedTime: "18 mins",
        visualizerType: "binary-tree",
        gfgSearchQuery: "Binary Search Tree GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/",
        quickSummary: "Hierarchical node structure maintaining BST invariant: left < node < right.",
        keyPoints: [
          "Preorder (Root, Left, Right): Useful for tree cloning and serialization.",
          "Inorder (Left, Root, Right): Yields strictly sorted ascending order on BSTs.",
          "Postorder (Left, Right, Root): Useful for bottom-up deletions and space reclamation.",
          "Level Order (BFS): Visits nodes level-by-level using a queue."
        ],
        diagramTitle: "BST In-Order Traversal Flow",
        diagram: `        10
       /  \\
      5    20   ──> Inorder: 2 -> 5 -> 7 -> 10 -> 15 -> 20 -> 30
     / \\   / \\
    2   7 15 30`,
        complexities: [
          { operation: "BST Search", best: "O(1)", avg: "O(log n)", worst: "O(n)", space: "O(h)" },
          { operation: "BST Insert", best: "O(1)", avg: "O(log n)", worst: "O(n)", space: "O(h)" },
          { operation: "BST Traversal", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(h)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int v) { val = v; }
}
public TreeNode insert(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    if (val < root.val) root.left = insert(root.left, val);
    else root.right = insert(root.right, val);
    return root;
}`
          }
        ],
        practiceProblems: [
          { title: "Validate Binary Search Tree", difficulty: "Medium", url: "https://leetcode.com/problems/validate-binary-search-tree/", platform: "LeetCode" },
          { title: "Binary Tree Level Order Traversal", difficulty: "Medium", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Comparing search key against current node to navigate left or right subtree.",
          why: "Left child < Parent < Right child invariant eliminates half the tree at each level.",
          next: "Recursively descend into the chosen branch or insert new leaf."
        },
        realWorld: "SQL database B-Tree index roots, filesystem hierarchical folder structures, and HTML DOM trees."
      },
      {
        id: "avl-rotations",
        slug: "avl-tree-rotations",
        title: "AVL Self-Balancing Tree",
        categoryId: "trees-balanced",
        categoryName: "5. Trees & Balanced Trees",
        difficulty: "Advanced",
        estimatedTime: "20 mins",
        visualizerType: "avl-tree",
        gfgSearchQuery: "AVL Tree GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/avl-tree-set-1-insertion/",
        quickSummary: "Self-balancing BST maintaining balance factor |height(L) - height(R)| <= 1 via 4 rotations.",
        keyPoints: [
          "Balance Factor (BF) = Height(Left) - Height(Right). Must be -1, 0, or +1.",
          "LL Rotation: Single right rotation fixes heavy left-left unbalance.",
          "RR Rotation: Single left rotation fixes heavy right-right unbalance.",
          "LR & RL Rotations: Double rotations balancing zigzag insertions."
        ],
        diagramTitle: "AVL Right Rotation (LL Imbalance)",
        diagram: `        30 (BF: +2)                   20 (BF: 0)
       /                             /  \\
      20 (BF: +1)   ── Right Rot ──>10   30
     /
    10 (BF: 0)`,
        complexities: [
          { operation: "AVL Search", best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" },
          { operation: "AVL Insert", best: "O(log n)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" },
          { operation: "Rotation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `private Node rightRotate(Node y) {
    Node x = y.left;
    Node T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(height(y.left), height(y.right)) + 1;
    x.height = Math.max(height(x.left), height(x.right)) + 1;
    return x;
}`
          }
        ],
        practiceProblems: [
          { title: "Balance a Binary Search Tree", difficulty: "Medium", url: "https://leetcode.com/problems/balance-a-binary-search-tree/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Detecting unbalance factor |BF| > 1 after insertion/deletion.",
          why: "Unbalanced BSTs degrade to O(n) linked lists; rotations guarantee strictly O(log n) height.",
          next: "Pivot nodes around the unbalanced center to restore equilibrium."
        },
        realWorld: "In-memory database indexes where search operations vastly outnumber write operations."
      },
      {
        id: "binary-heap-pq",
        slug: "binary-heap-priority-queue",
        title: "Binary Heap & Priority Queue",
        categoryId: "trees-balanced",
        categoryName: "5. Trees & Balanced Trees",
        difficulty: "Intermediate",
        estimatedTime: "15 mins",
        visualizerType: "heap",
        gfgSearchQuery: "Binary Heap GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/binary-heap/",
        quickSummary: "Complete binary tree satisfying heap invariant, stored compactly as a 1D array.",
        keyPoints: [
          "Array Mapping: Parent at i, Left child at 2i + 1, Right child at 2i + 2.",
          "Heapify Up: Restores invariant upon insertion by swapping with smaller/larger parent.",
          "Heapify Down: Restores invariant upon root deletion by bubbling replacement node down."
        ],
        diagramTitle: "Heap Tree vs Array Representation",
        diagram: `Tree:       10 (Root)              Array: Index: 0  1  2  3  4
           /  \\                            Value: 10 20 30 40 50
          20   30
         /  \\
        40  50`,
        complexities: [
          { operation: "Get Min/Max", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(n)" },
          { operation: "Insert", best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" },
          { operation: "Extract Min/Max", best: "O(log n)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `import java.util.PriorityQueue;
public class PQExample {
    public static void main(String[] args) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.add(30); minHeap.add(10); minHeap.add(20);
        int top = minHeap.poll(); // Returns 10
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Kth Largest Element in an Array", difficulty: "Medium", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", platform: "LeetCode" },
          { title: "Top K Frequent Elements", difficulty: "Medium", url: "https://leetcode.com/problems/top-k-frequent-elements/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Comparing child node against parent to verify heap order property.",
          why: "Ensures the extreme (minimum or maximum) key is always immediately accessible at root index 0.",
          next: "Swap element with parent or child to complete heapify step."
        },
        realWorld: "Dijkstra's shortest path, Prim's MST, OS process priority scheduling, Huffman coding."
      }
    ]
  },

  // 6. GRAPHS & NETWORKS
  {
    id: "graphs-networks",
    name: "6. Graphs & Networks",
    shortDesc: "BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Prim, Kruskal, and Union-Find.",
    iconName: "Network",
    topics: [
      {
        id: "bfs-dfs-traversal",
        slug: "graph-traversal-bfs-dfs",
        title: "Graph Traversals (BFS & DFS)",
        categoryId: "graphs-networks",
        categoryName: "6. Graphs & Networks",
        difficulty: "Intermediate",
        estimatedTime: "18 mins",
        visualizerType: "graph-traversal",
        gfgSearchQuery: "Breadth First Search GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/",
        quickSummary: "Explore graph networks level-by-level with a FIFO Queue (BFS) or depth-first with a LIFO Stack (DFS).",
        keyPoints: [
          "BFS (Queue): Discovers shortest path in unweighted graphs level by level.",
          "DFS (Stack / Recursion): Explores paths as deep as possible before backtracking.",
          "Visited Set: Mandatory to prevent infinite loops in cyclic graphs."
        ],
        diagramTitle: "BFS Wavefront Expansion",
        diagram: `Queue: [ A ] ──> Visit A, Enqueue Neighbors [ B, C, D ]
Queue: [ B, C, D ] ──> Visit B... expands like concentric ripples`,
        complexities: [
          { operation: "BFS Traversal", best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)", space: "O(V)" },
          { operation: "DFS Traversal", best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)", space: "O(V)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public void bfs(int start, List<List<Integer>> adj, int V) {
    boolean[] visited = new boolean[V];
    Queue<Integer> q = new LinkedList<>();
    visited[start] = true; q.add(start);
    while (!q.isEmpty()) {
        int u = q.poll();
        for (int v : adj.get(u)) {
            if (!visited[v]) { visited[v] = true; q.add(v); }
        }
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Number of Islands", difficulty: "Medium", url: "https://leetcode.com/problems/number-of-islands/", platform: "LeetCode" },
          { title: "Clone Graph", difficulty: "Medium", url: "https://leetcode.com/problems/clone-graph/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "De-queuing current node and scanning all unvisited neighbor edges.",
          why: "BFS explores all vertices at distance k before moving to distance k+1.",
          next: "Mark neighbors as visited and enqueue them into the frontier queue."
        },
        realWorld: "Social network friend recommendations (degrees of separation), web crawlers, GPS routing."
      },
      {
        id: "dijkstra-shortest-path",
        slug: "dijkstra-shortest-path-algorithm",
        title: "Shortest Path (Dijkstra, Bellman-Ford)",
        categoryId: "graphs-networks",
        categoryName: "6. Graphs & Networks",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        visualizerType: "dijkstra",
        gfgSearchQuery: "Dijkstra's Algorithm GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/",
        quickSummary: "Greedy relaxation finding single-source shortest paths on non-negative weighted graphs.",
        keyPoints: [
          "Distance Table: Initialized to Infinity except Start Node (dist = 0).",
          "Greedy Node Selection: Extract vertex with minimum tentative distance from Priority Queue.",
          "Edge Relaxation: If dist[u] + weight(u,v) < dist[v], update dist[v]."
        ],
        diagramTitle: "Edge Relaxation Step",
        diagram: `dist[u] = 4, Edge (u -> v, wt: 3)
If 4 + 3 = 7 < dist[v] (∞) ──> RELAX: Update dist[v] = 7`,
        complexities: [
          { operation: "Dijkstra (Heap)", best: "O((V+E) log V)", avg: "O((V+E) log V)", worst: "O((V+E) log V)", space: "O(V)" },
          { operation: "Bellman-Ford", best: "O(V*E)", avg: "O(V*E)", worst: "O(V*E)", space: "O(V)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public int[] dijkstra(int V, List<List<int[]>> adj, int src) {
    int[] dist = new int[V];
    Arrays.fill(dist, Integer.MAX_VALUE);
    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
    dist[src] = 0; pq.add(new int[]{src, 0});
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int u = curr[0], d = curr[1];
        if (d > dist[u]) continue;
        for (int[] edge : adj.get(u)) {
            int v = edge[0], weight = edge[1];
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.add(new int[]{v, dist[v]});
            }
        }
    }
    return dist;
}`
          }
        ],
        practiceProblems: [
          { title: "Network Delay Time", difficulty: "Medium", url: "https://leetcode.com/problems/network-delay-time/", platform: "LeetCode" },
          { title: "Cheapest Flights Within K Stops", difficulty: "Medium", url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Extracting lowest-cost unvisited vertex and relaxing outgoing edges.",
          why: "Non-negative edge weights ensure once a node is settled, its shortest path is permanently optimal.",
          next: "Update tentative distances for adjacent neighbors in the distance table."
        },
        realWorld: "Google Maps driving route calculation, internet packet routing protocols (OSPF, IS-IS)."
      },
      {
        id: "mst-union-find",
        slug: "mst-kruskal-prim-union-find",
        title: "Minimum Spanning Tree & Union-Find",
        categoryId: "graphs-networks",
        categoryName: "6. Graphs & Networks",
        difficulty: "Advanced",
        estimatedTime: "22 mins",
        visualizerType: "mst",
        gfgSearchQuery: "Kruskal's Minimum Spanning Tree Algorithm GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/",
        quickSummary: "Connect all graph nodes with minimum total edge weight without forming cycles.",
        keyPoints: [
          "Kruskal's Algorithm: Sorts edges by weight; adds edges that do not create cycles using Union-Find.",
          "Prim's Algorithm: Grows single tree outwards by greedily picking cheapest boundary edge.",
          "Disjoint Set / Union-Find: Path compression + Union by rank executes operations in near O(1) α(n)."
        ],
        diagramTitle: "Kruskal's Edge Acceptance vs Cycle Rejection",
        diagram: `Edge (A, B) wt: 2 ──> Find(A) != Find(B) ──> ACCEPT (Union)
Edge (B, C) wt: 4 ──> Find(B) == Find(C) ──> REJECT (Creates Cycle!)`,
        complexities: [
          { operation: "Kruskal's (MST)", best: "O(E log E)", avg: "O(E log E)", worst: "O(E log E)", space: "O(V)" },
          { operation: "Union-Find (Find/Union)", best: "O(α(n))", avg: "O(α(n))", worst: "O(α(n))", space: "O(V)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `class UnionFind {
    int[] parent, rank;
    UnionFind(int n) {
        parent = new int[n]; rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }
    boolean union(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI == rootJ) return false;
        if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
        else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
        else { parent[rootJ] = rootI; rank[rootI]++; }
        return true;
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Min Cost to Connect All Points", difficulty: "Medium", url: "https://leetcode.com/problems/min-cost-to-connect-All-points/", platform: "LeetCode" },
          { title: "Number of Connected Components in an Undirected Graph", difficulty: "Medium", url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Checking if endpoints of cheapest edge belong to disjoint component sets.",
          why: "Selecting edges with disparate roots guarantees no cycle is introduced.",
          next: "Union component sets together and tally edge weight into cumulative MST total."
        },
        realWorld: "Designing electrical power grids, telecommunication fiber optic cables, and cluster analysis."
      }
    ]
  },

  // 7. GREEDY ALGORITHMS
  {
    id: "greedy-algorithms",
    name: "7. Greedy Algorithms",
    shortDesc: "Activity selection, fractional knapsack, job sequencing, and Huffman compression.",
    iconName: "Zap",
    topics: [
      {
        id: "activity-selection-knapsack",
        slug: "greedy-activity-selection-knapsack",
        title: "Activity Selection & Fractional Knapsack",
        categoryId: "greedy-algorithms",
        categoryName: "7. Greedy Algorithms",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        visualizerType: "greedy",
        gfgSearchQuery: "Activity Selection Problem GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/",
        quickSummary: "Make the locally optimal choice at each step to arrive at a global optimum.",
        keyPoints: [
          "Activity Selection: Sort by earliest finish time; pick first non-overlapping activity.",
          "Fractional Knapsack: Sort items by value/weight ratio; take as much as possible of highest ratio.",
          "Greedy Choice Property: A globally optimal solution can be reached through local optimal choices."
        ],
        diagramTitle: "Activity Selection Timeline Compatibility",
        diagram: `Act A: [ 1 ────── 3 ] (Selected ✓)
Act B:   [ 2 ──────── 5 ] (Conflicts ✗)
Act C:           [ 4 ── 6 ] (Selected ✓)`,
        complexities: [
          { operation: "Activity Selection", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(1)" },
          { operation: "Fractional Knapsack", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public int maxActivities(int[] start, int[] end) {
    int n = start.length;
    int[][] acts = new int[n][2];
    for (int i = 0; i < n; i++) acts[i] = new int[]{start[i], end[i]};
    Arrays.sort(acts, Comparator.comparingInt(a -> a[1]));
    int count = 1, lastEnd = acts[0][1];
    for (int i = 1; i < n; i++) {
        if (acts[i][0] >= lastEnd) { count++; lastEnd = acts[i][1]; }
    }
    return count;
}`
          }
        ],
        practiceProblems: [
          { title: "Non-overlapping Intervals", difficulty: "Medium", url: "https://leetcode.com/problems/non-overlapping-intervals/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Selecting candidate with the most advantageous metric (earliest finish or max ratio).",
          why: "Finishing earlier maximizes remaining available timeline for subsequent activities.",
          next: "Filter out all subsequent intervals that conflict with the newly scheduled task."
        },
        realWorld: "Conference room scheduling, CPU job dispatching, resource cargo loading."
      },
      {
        id: "huffman-coding",
        slug: "huffman-coding-compression",
        title: "Huffman Coding & Tree Compression",
        categoryId: "greedy-algorithms",
        categoryName: "7. Greedy Algorithms",
        difficulty: "Intermediate",
        estimatedTime: "18 mins",
        visualizerType: "huffman",
        gfgSearchQuery: "Huffman Coding GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/",
        quickSummary: "Lossless prefix data compression assigning shorter binary codes to more frequent characters.",
        keyPoints: [
          "Character Frequency: Build min-heap of character frequencies.",
          "Combine Lowest Two: Extract 2 lowest frequencies, create parent node with sum, push back.",
          "Prefix Property: No character code is a prefix of another code (unambiguous decoding)."
        ],
        diagramTitle: "Huffman Prefix Code Tree",
        diagram: `         (Root: 100)
         /         \\
       0/           \\1
     [ 'A': 60 ]    (40)
                    /   \\
                  0/     \\1
               ['B':25]  ['C':15]  ──> 'A' = 0, 'B' = 10, 'C' = 11`,
        complexities: [
          { operation: "Build Huffman Tree", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
          { operation: "Encode / Decode", best: "O(k)", avg: "O(k)", worst: "O(k)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `class HuffmanNode implements Comparable<HuffmanNode> {
    int freq; char ch; HuffmanNode left, right;
    public int compareTo(HuffmanNode o) { return this.freq - o.freq; }
}`
          }
        ],
        practiceProblems: [
          { title: "Encode and Decode TinyURL", difficulty: "Medium", url: "https://leetcode.com/problems/encode-and-decode-tinyurl/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Merging the two lowest-frequency trees from the priority queue.",
          why: "Less frequent characters end up deeper in the tree, naturally receiving longer bit sequences.",
          next: "Re-insert newly merged node into the min-priority queue until single root remains."
        },
        realWorld: "ZIP file compression, JPEG image Huffman stages, MP3 audio encoding, GZIP."
      }
    ]
  },

  // 8. DYNAMIC PROGRAMMING
  {
    id: "dynamic-programming",
    name: "8. Dynamic Programming",
    shortDesc: "Overlapping subproblems, memoization, tabulation, Knapsack, LCS, and Edit Distance.",
    iconName: "Calculator",
    topics: [
      {
        id: "dp-1d-basics",
        slug: "dp-fundamentals-fibonacci-climbing-stairs",
        title: "1D DP (Fibonacci, Climbing Stairs & Robber)",
        categoryId: "dynamic-programming",
        categoryName: "8. Dynamic Programming",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        visualizerType: "dp-1d",
        gfgSearchQuery: "Dynamic Programming GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/dynamic-programming/",
        quickSummary: "Transform exponential O(2ⁿ) tree recursion into linear O(n) using state memoization.",
        keyPoints: [
          "Overlapping Subproblems: Same sub-computations recur repeatedly.",
          "Memoization (Top-Down): Cache calculated returns in an array or hash map.",
          "Tabulation (Bottom-Up): Solve base cases first and iteratively fill up the DP table."
        ],
        diagramTitle: "Fibonacci 1D DP Tabulation Table",
        diagram: `Index:  0   1   2   3   4   5
Value: [0 | 1 | 1 | 2 | 3 | 5]  ──> dp[i] = dp[i-1] + dp[i-2]`,
        complexities: [
          { operation: "DP Tabulation", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n) or O(1)" },
          { operation: "Naive Recursion", best: "O(2ⁿ)", avg: "O(2ⁿ)", worst: "O(2ⁿ)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1; prev1 = curr;
    }
    return prev1;
}`
          }
        ],
        practiceProblems: [
          { title: "Climbing Stairs", difficulty: "Easy", url: "https://leetcode.com/problems/climbing-stairs/", platform: "LeetCode" },
          { title: "House Robber", difficulty: "Medium", url: "https://leetcode.com/problems/house-robber/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Querying previously memoized entry rather than re-computing recursive branches.",
          why: "Eliminates duplicate redundant work, converting O(2ⁿ) execution into linear O(n).",
          next: "Fill the subsequent cell by summing previous state values."
        },
        realWorld: "Financial modeling, shortest-hop network routing, sequence alignment in bioinformatics."
      },
      {
        id: "dp-2d-knapsack-lcs",
        slug: "dp-2d-knapsack-lcs-edit-distance",
        title: "2D DP (0/1 Knapsack, LCS & Edit Distance)",
        categoryId: "dynamic-programming",
        categoryName: "8. Dynamic Programming",
        difficulty: "Advanced",
        estimatedTime: "22 mins",
        visualizerType: "dp-2d",
        gfgSearchQuery: "0-1 Knapsack Problem GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/",
        quickSummary: "2D capacity grid transitions: decide whether to include or exclude each item.",
        keyPoints: [
          "State Transition: dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]]).",
          "Longest Common Subsequence (LCS): Match characters diagonal + 1; otherwise max(left, top).",
          "Edit Distance: Minimum insertions, deletions, and substitutions to transform word1 into word2."
        ],
        diagramTitle: "0/1 Knapsack 2D DP Grid Transition",
        diagram: `          Capacity: 0  1  2  3  4  5
Item 1 (wt:2, val:3): [0, 0, 3, 3, 3, 3]
Item 2 (wt:3, val:4): [0, 0, 3, 4, 4, 7] ──> Take Item 2: val 4 + dp[prev][5-3] = 4 + 3 = 7`,
        complexities: [
          { operation: "0/1 Knapsack", best: "O(n*W)", avg: "O(n*W)", worst: "O(n*W)", space: "O(n*W)" },
          { operation: "LCS / Edit Dist", best: "O(m*n)", avg: "O(m*n)", worst: "O(m*n)", space: "O(m*n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public int knapsack(int W, int[] wt, int[] val, int n) {
    int[][] dp = new int[n + 1][W + 1];
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i - 1] <= w) {
                dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}`
          }
        ],
        practiceProblems: [
          { title: "Coin Change", difficulty: "Medium", url: "https://leetcode.com/problems/coin-change/", platform: "LeetCode" },
          { title: "Longest Common Subsequence", difficulty: "Medium", url: "https://leetcode.com/problems/longest-common-subsequence/", platform: "LeetCode" },
          { title: "Edit Distance", difficulty: "Hard", url: "https://leetcode.com/problems/edit-distance/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Evaluating max between excluding current item (cell above) vs including it (value + remaining capacity cell).",
          why: "Guarantees optimal solution by checking both decisions at every capacity limit.",
          next: "Advance column pointer to evaluate next capacity threshold."
        },
        realWorld: "Git diff text comparison (LCS), spellcheck auto-correct (Edit Distance), financial portfolio budgeting."
      }
    ]
  },

  // 9. HASHING & COLLISION RESOLUTION
  {
    id: "hashing-collisions",
    name: "9. Hashing & Collision Handling",
    shortDesc: "Hash functions, Separate Chaining, Linear Probing, Quadratic Probing, and Double Hashing.",
    iconName: "Hash",
    topics: [
      {
        id: "hash-table-collisions",
        slug: "hash-table-collision-techniques",
        title: "Hash Tables & Collision Resolution",
        categoryId: "hashing-collisions",
        categoryName: "9. Hashing & Collision Handling",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        visualizerType: "hashing",
        gfgSearchQuery: "Hashing Data Structure GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/hashing-data-structure/",
        quickSummary: "Direct key-to-index mapping via hash functions with open addressing and chaining collision techniques.",
        keyPoints: [
          "Hash Function: Maps infinite key universe to finite bucket index: hash(k) = k % tableSize.",
          "Separate Chaining: Each bucket holds a linked list of collided keys.",
          "Linear Probing: Collisions step forward (hash + 1) % size until an empty slot is found.",
          "Quadratic Probing & Double Hashing: Reduce primary clustering."
        ],
        diagramTitle: "Separate Chaining vs Linear Probing",
        diagram: `Chaining: Bucket 5 ──> [ 25 ] ──> [ 35 ] ──> [ 85 ] -> NULL
Linear Probing: Index 5: [ 25 ]  Collision on 35? Probe Index 6: [ 35 ]`,
        complexities: [
          { operation: "Hash Search/Insert", best: "O(1)", avg: "O(1)", worst: "O(n)", space: "O(n)" },
          { operation: "Delete", best: "O(1)", avg: "O(1)", worst: "O(n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `import java.util.HashMap;
public class HashExample {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("Alice", 95);
        map.put("Bob", 88);
        int score = map.getOrDefault("Alice", 0);
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Two Sum", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum/", platform: "LeetCode" },
          { title: "Group Anagrams", difficulty: "Medium", url: "https://leetcode.com/problems/group-anagrams/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Applying modulo hash function to compute target bucket index.",
          why: "Converts arbitrary search keys into instant O(1) direct array offsets.",
          next: "If bucket is occupied, execute chosen collision policy (chaining or probing)."
        },
        realWorld: "Database primary key index indexing, compiler symbol tables, caching systems (Redis, Memcached)."
      }
    ]
  },

  // 10. STRING ALGORITHMS
  {
    id: "string-algorithms-suite",
    name: "10. String Algorithms",
    shortDesc: "Pattern matching (KMP, Rabin-Karp, Z-Algorithm) and Trie prefix trees.",
    iconName: "Code2",
    topics: [
      {
        id: "pattern-matching-kmp",
        slug: "string-pattern-matching-kmp-rabin-karp",
        title: "Pattern Matching (Naive, KMP & Rabin-Karp)",
        categoryId: "string-algorithms-suite",
        categoryName: "10. String Algorithms",
        difficulty: "Intermediate",
        estimatedTime: "18 mins",
        visualizerType: "pattern-matching",
        gfgSearchQuery: "KMP Algorithm for Pattern Searching GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/",
        quickSummary: "Locate pattern occurrences in text without backtracking text pointer using prefix functions.",
        keyPoints: [
          "Naive Search: Compares character-by-character; worst-case O(m * (n - m + 1)).",
          "KMP Algorithm: Pre-computes Longest Prefix which is also Suffix (LPS) array; guarantees O(n + m).",
          "Rabin-Karp: Uses rolling hash to verify string fingerprint before character comparison."
        ],
        diagramTitle: "KMP LPS Array Jump",
        diagram: `Pattern: "A B A B C"
LPS[]:   [ 0, 0, 1, 2, 0 ]
Mismatch at index 4 ('C') ──> Jump pattern pointer to LPS[3] = 2 without rewinding text!`,
        complexities: [
          { operation: "KMP Search", best: "O(n)", avg: "O(n+m)", worst: "O(n+m)", space: "O(m)" },
          { operation: "Rabin-Karp", best: "O(n+m)", avg: "O(n+m)", worst: "O(n*m)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public void computeLPS(String pat, int M, int[] lps) {
    int len = 0, i = 1;
    lps[0] = 0;
    while (i < M) {
        if (pat.charAt(i) == pat.charAt(len)) { lps[i++] = ++len; }
        else if (len != 0) { len = lps[len - 1]; }
        else { lps[i++] = 0; }
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Find the Index of the First Occurrence in a String", difficulty: "Easy", url: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", platform: "LeetCode" },
          { title: "Repeated Substring Pattern", difficulty: "Easy", url: "https://leetcode.com/problems/repeated-substring-pattern/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Advancing pattern comparison index while monitoring character matches.",
          why: "LPS table records sub-pattern symmetries, preventing redundant character comparisons.",
          next: "On mismatch, shift pattern index back to length of longest matching prefix."
        },
        realWorld: "DNA genome sequence matching, text editor search (Ctrl+F), intrusion detection signatures."
      },
      {
        id: "trie-prefix-tree",
        slug: "trie-prefix-tree-autocomplete",
        title: "Trie (Prefix Tree & Autocomplete)",
        categoryId: "string-algorithms-suite",
        categoryName: "10. String Algorithms",
        difficulty: "Intermediate",
        estimatedTime: "18 mins",
        visualizerType: "trie",
        gfgSearchQuery: "Trie Data Structure GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/trie-insert-and-search/",
        quickSummary: "Tree data structure where each node represents a character, enabling O(L) prefix lookups.",
        keyPoints: [
          "Shared Prefixes: Words like 'cat', 'car', and 'can' share the root path 'c' -> 'a'.",
          "Word End Flag: Boolean flag marks valid terminal words.",
          "Fast Prefix Autocomplete: Instant O(L) prefix validation independent of dictionary size."
        ],
        diagramTitle: "Trie Prefix Tree Sharing Characters",
        diagram: `       (Root)
         |
        'c'
         |
        'a'
       / | \\
     't''r''n'
     (✓) (✓)(✓) ──> Represents words: cat, car, can`,
        complexities: [
          { operation: "Trie Insert", best: "O(L)", avg: "O(L)", worst: "O(L)", space: "O(L * AlphabetSize)" },
          { operation: "Trie Search", best: "O(L)", avg: "O(L)", worst: "O(L)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEndOfWord = false;
}
public class Trie {
    private TrieNode root = new TrieNode();
    public void insert(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) curr.children[idx] = new TrieNode();
            curr = curr.children[idx];
        }
        curr.isEndOfWord = true;
    }
}`
          }
        ],
        practiceProblems: [
          { title: "Implement Trie (Prefix Tree)", difficulty: "Medium", url: "https://leetcode.com/problems/implement-trie-prefix-tree/", platform: "LeetCode" },
          { title: "Design Add and Search Words Data Structure", difficulty: "Medium", url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Navigating child branch corresponding to current character index c - 'a'.",
          why: "Branch sharing guarantees search time depends only on word length L, not dataset size N.",
          next: "Check terminal flag or traverse remaining characters to provide autocomplete suggestions."
        },
        realWorld: "Search engine autocomplete queries, smartphone predictive text keyboards, IP routing lookups."
      }
    ]
  },

  // 11. DIVIDE AND CONQUER
  {
    id: "divide-and-conquer",
    name: "11. Divide and Conquer",
    shortDesc: "Divide, Solve, and Combine lifecycle (Merge Sort, Quick Sort, Max Subarray).",
    iconName: "GitBranch",
    topics: [
      {
        id: "dnc-lifecycle",
        slug: "divide-conquer-max-subarray",
        title: "Divide & Conquer (Divide, Solve, Combine)",
        categoryId: "divide-and-conquer",
        categoryName: "11. Divide and Conquer",
        difficulty: "Intermediate",
        estimatedTime: "15 mins",
        visualizerType: "divide-conquer",
        gfgSearchQuery: "Divide and Conquer Algorithm GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/divide-and-conquer-algorithm-introduction/",
        quickSummary: "Split problem into independent sub-problems, solve recursively, and combine solutions.",
        keyPoints: [
          "1. Divide: Break original problem into smaller independent sub-problems.",
          "2. Conquer: Recursively solve each sub-problem; if small enough, solve directly.",
          "3. Combine: Merge sub-solutions into the final overarching solution."
        ],
        diagramTitle: "Divide and Conquer Flowchart",
        diagram: `              [ Problem of Size N ]
                  ↙            ↘
       [ Subproblem N/2 ]   [ Subproblem N/2 ]
              ↓                     ↓
         Solve(A)               Solve(B)
              ↘                     ↙
            [ Combine into Final Solution ]`,
        complexities: [
          { operation: "Merge Sort D&C", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
          { operation: "Max Subarray D&C", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(log n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `public int maxSubArrayHelper(int[] nums, int l, int r) {
    if (l == r) return nums[l];
    int m = l + (r - l) / 2;
    int leftMax = maxSubArrayHelper(nums, l, m);
    int rightMax = maxSubArrayHelper(nums, m + 1, r);
    int crossMax = maxCrossingSum(nums, l, m, r);
    return Math.max(Math.max(leftMax, rightMax), crossMax);
}`
          }
        ],
        practiceProblems: [
          { title: "Maximum Subarray", difficulty: "Medium", url: "https://leetcode.com/problems/maximum-subarray/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Partitioning input domain into left and right sub-domains.",
          why: "Independent sub-problems can be solved concurrently with minimal overhead.",
          next: "Combine partial results across the partition boundary."
        },
        realWorld: "Distributed MapReduce systems, fast Fourier transform (FFT), Strassen's matrix multiplication."
      }
    ]
  },

  // 12. COMPLEXITY ANALYSIS & DS COMPARISON
  {
    id: "complexity-analysis",
    name: "12. Complexity & DS Comparison",
    shortDesc: "Big-O, Big-Ω, Big-Θ asymptotic bounds and interactive operations comparison matrix.",
    iconName: "TrendingUp",
    topics: [
      {
        id: "asymptotic-comparator",
        slug: "big-o-growth-comparison-matrix",
        title: "Big-O Analysis & DS Operations Matrix",
        categoryId: "complexity-analysis",
        categoryName: "12. Complexity & DS Comparison",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        visualizerType: "complexity",
        gfgSearchQuery: "Analysis of Algorithms GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/",
        quickSummary: "Mathematical growth curves comparing Array, Linked List, Stack, Queue, BST, AVL, and Hash Table.",
        keyPoints: [
          "Big-O (O): Worst-case upper bound.",
          "Big-Omega (Ω): Best-case lower bound.",
          "Big-Theta (Θ): Tight bound (best case asymptotically equals worst case).",
          "Comparison Matrix: Direct lookup of Access, Search, Insert, and Delete complexities."
        ],
        diagramTitle: "Asymptotic Growth Order",
        diagram: `O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)
Constant  Logarithmic  Linear   Superlinear  Quadratic  Exponential  Factorial`,
        complexities: [
          { operation: "Hash Table Access", best: "O(1)", avg: "O(1)", worst: "O(n)", space: "O(n)" },
          { operation: "BST Search", best: "O(1)", avg: "O(log n)", worst: "O(n)", space: "O(h)" },
          { operation: "Array Access", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(n)" },
          { operation: "Linked List Insert", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java",
            code: `// Time Complexity Comparison Summary
// Array:      Access O(1), Search O(n), Insert O(n), Delete O(n)
// LinkedList: Access O(n), Search O(n), Insert O(1)*, Delete O(1)*
// Hash Table: Access O(1)*, Search O(1)*, Insert O(1)*, Delete O(1)*
// BST:        Access O(log n)*, Search O(log n)*, Insert O(log n)*, Delete O(log n)*`
          }
        ],
        practiceProblems: [
          { title: "Design HashMap", difficulty: "Easy", url: "https://leetcode.com/problems/design-hashmap/", platform: "LeetCode" }
        ],
        studentMode: {
          what: "Plotting operation count growth curves against increasing input size N.",
          why: "Determines scalability before deploying algorithms on large-scale production data.",
          next: "Compare memory footprints and asymptotic trade-offs between linear and tree structures."
        },
        realWorld: "System capacity planning, database query plan optimization, high-frequency trading latency tuning."
      }
    ]
  }
];
