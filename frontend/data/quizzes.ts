export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  experimentId: string;
  title: string;
  description: string;
  passingScore: number;
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}

export const QUIZZES_DATA: Record<string, Quiz> = {
  // ========================================================
  // 1. DATA STRUCTURES (JAVA) EXPERIMENTS & VISUALIZERS
  // ========================================================
  "stack-quiz": {
    id: "stack-quiz",
    experimentId: "stack-operations",
    title: "Stack Operations Self-Assessment",
    description: "Evaluate your understanding of Stack LIFO characteristics, push/pop/peek complexities, and boundary conditions.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "stq-1",
        question: "Which principle strictly governs the insertion and deletion order in a Stack?",
        options: ["First-In, First-Out (FIFO)", "Last-In, First-Out (LIFO)", "First-In, Random-Out (FIRO)", "Priority-Ordered Access"],
        correctIndex: 1,
        explanation: "A stack strictly operates on the LIFO (Last-In, First-Out) principle: the most recently pushed element is the first to be popped."
      },
      {
        id: "stq-2",
        question: "What is the time complexity of the Push, Pop, and Peek operations in an array-based stack?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        correctIndex: 2,
        explanation: "Push, Pop, and Peek only modify the 'top' pointer index, completing in O(1) constant time."
      },
      {
        id: "stq-3",
        question: "What condition occurs when a program attempts to remove an item from an empty stack?",
        options: ["Stack Overflow", "Stack Underflow", "Segmentation Fault", "Dangling Reference"],
        correctIndex: 1,
        explanation: "Stack Underflow occurs when Pop or Peek is invoked on a stack that contains no elements (top == -1)."
      },
      {
        id: "stq-4",
        question: "Which real-world computing mechanism is directly implemented using a system call stack?",
        options: ["Recursive function call execution", "Printer spooling queue", "Breadth-First Search (BFS)", "Round-robin CPU time slicing"],
        correctIndex: 0,
        explanation: "Nested and recursive function calls store activation records, local variables, and return addresses on the runtime call stack."
      },
      {
        id: "stq-5",
        question: "Which of the following problems is classic and solved efficiently in O(n) using a Stack?",
        options: ["Shortest path in weighted graph", "Valid Parentheses Matching", "Finding minimum spanning tree", "Sorting in O(n log n)"],
        correctIndex: 1,
        explanation: "Matching balanced brackets and parentheses ('(', '{', '[') is solved in linear O(n) time by pushing openers and popping on closers."
      }
    ]
  },

  "queue-quiz": {
    id: "queue-quiz",
    experimentId: "queue-operations",
    title: "Queue Operations Self-Assessment",
    description: "Test your mastery of FIFO queues, front/rear pointer mechanics, and circular queue boundary conditions.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "quq-1",
        question: "In a standard linear Queue, at which end are new elements inserted (enqueued)?",
        options: ["Front pointer", "Rear pointer", "Middle index", "Top pointer"],
        correctIndex: 1,
        explanation: "Elements enter at the Rear (tail) and exit from the Front (head) in a FIFO structure."
      },
      {
        id: "quq-2",
        question: "What major limitation of a linear array-based queue is resolved by a Circular Queue?",
        options: [
          "Eliminating O(1) dequeue time",
          "False overflow where vacant spaces created by dequeue cannot be reused",
          "Requiring dynamic pointer allocation",
          "Inability to store negative integers"
        ],
        correctIndex: 1,
        explanation: "In a linear queue, front moves forward, leaving unused front slots that cause false overflow; circular queues wrap pointers using modulo arithmetic."
      },
      {
        id: "quq-3",
        question: "In a circular queue of capacity N, how is the next rear position calculated upon enqueue?",
        options: ["rear = rear + 1", "rear = (rear + 1) % N", "rear = (rear - 1) % N", "rear = N - front"],
        correctIndex: 1,
        explanation: "Modulo wrapping rear = (rear + 1) % N brings the pointer back to index 0 when it reaches the array boundary."
      },
      {
        id: "quq-4",
        question: "Which fundamental graph traversal algorithm inherently uses a FIFO Queue?",
        options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Topological Sort via DFS", "Dijkstra with Array"],
        correctIndex: 1,
        explanation: "BFS explores all neighboring nodes at the current depth before moving deeper, relying on a FIFO queue."
      },
      {
        id: "quq-5",
        question: "What is the time complexity of the Dequeue operation in an optimized Circular Queue?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
        correctIndex: 2,
        explanation: "Updating the front pointer via front = (front + 1) % N executes in O(1) constant time."
      }
    ]
  },

  "linked-list-quiz": {
    id: "linked-list-quiz",
    experimentId: "singly-linked-list",
    title: "Singly Linked List Self-Assessment",
    description: "Evaluate your knowledge of dynamic memory nodes, pointer linkage, and traversal operations.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "llq-1",
        question: "What are the two primary fields that construct a Singly Linked List node?",
        options: ["Key and Priority", "Data value and Next node pointer reference", "Left child and Right child", "Index and Hash value"],
        correctIndex: 1,
        explanation: "A singly linked list node encapsulates the stored data payload and a pointer linking to the successive node."
      },
      {
        id: "llq-2",
        question: "What is the time complexity to insert a new node at the head (beginning) of a Singly Linked List?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correctIndex: 0,
        explanation: "Setting new_node.next = head and head = new_node is a constant-time O(1) operation."
      },
      {
        id: "llq-3",
        question: "Why can't Binary Search be executed in O(log n) time on a standard Singly Linked List?",
        options: [
          "Linked lists cannot store sorted values",
          "Linked lists do not support O(1) random direct indexing to middle nodes",
          "Linked lists consume excessive CPU cache lines",
          "Pointers cannot be compared"
        ],
        correctIndex: 1,
        explanation: "Binary search requires jumping to the midpoint in O(1). In a linked list, locating middle nodes requires sequential O(n) traversal."
      },
      {
        id: "llq-4",
        question: "What condition identifies the terminal (tail) node of a standard Singly Linked List?",
        options: ["node.next == head", "node.next == null", "node.data == 0", "node.next == node"],
        correctIndex: 1,
        explanation: "The tail node terminates the chain by holding null (or NULL) in its next pointer."
      },
      {
        id: "llq-5",
        question: "What algorithm is used to detect a cycle in a linked list in O(n) time and O(1) auxiliary space?",
        options: ["Floyd's Tortoise and Hare algorithm (Two Pointers)", "Dijkstra's shortest path", "Binary Search", "Kadane's algorithm"],
        correctIndex: 0,
        explanation: "Floyd's cycle detection uses a slow pointer (1 step) and fast pointer (2 steps); if a loop exists, they must meet."
      }
    ]
  },

  "bubble-sort-quiz": {
    id: "bubble-sort-quiz",
    experimentId: "bubble-sort",
    title: "Bubble Sort Algorithm Self-Assessment",
    description: "Test your understanding of adjacent swapping, pass counts, time complexities, and stability.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "bsq-1",
        question: "How does the Bubble Sort algorithm place elements into their sorted positions?",
        options: [
          "By finding the minimum element and placing it at the front",
          "By repeatedly comparing adjacent pairs and swapping them if out of order",
          "By dividing the array in half recursively",
          "By inserting elements into a binary search tree"
        ],
        correctIndex: 1,
        explanation: "In each pass, adjacent pairs are compared, bubbling the largest unsorted element to the end of the array."
      },
      {
        id: "bsq-2",
        question: "What is the best-case time complexity of an optimized Bubble Sort on an already-sorted array?",
        options: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"],
        correctIndex: 2,
        explanation: "With a boolean swapped flag, if no swaps occur during the first pass, the algorithm terminates early in O(n) time."
      },
      {
        id: "bsq-3",
        question: "Is standard Bubble Sort a stable sorting algorithm?",
        options: [
          "Yes, because equal elements are never swapped past each other",
          "No, because it makes non-adjacent leaps",
          "Stable only for descending datasets",
          "Stable only when using extra arrays"
        ],
        correctIndex: 0,
        explanation: "Bubble sort is stable because arr[j] > arr[j+1] does not trigger a swap when elements are equal, preserving original relative order."
      },
      {
        id: "bsq-4",
        question: "What is the worst-case number of comparisons in standard Bubble Sort for size n?",
        options: ["n", "n(n - 1) / 2", "n log n", "2^n"],
        correctIndex: 1,
        explanation: "The sum of comparisons across (n-1) passes is (n-1) + (n-2) + ... + 1 = n(n-1)/2, which is O(n^2)."
      },
      {
        id: "bsq-5",
        question: "What is the auxiliary memory (space complexity) required by Bubble Sort?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
        correctIndex: 2,
        explanation: "Bubble sort sorts in-place using only a single temporary swap variable, requiring O(1) space."
      }
    ]
  },

  "selection-sort-quiz": {
    id: "selection-sort-quiz",
    experimentId: "selection-sort",
    title: "Selection Sort Algorithm Self-Assessment",
    description: "Evaluate your knowledge of minimum element selection, swap counts, and invariant properties.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "ssq-1",
        question: "What is the core mechanism of the Selection Sort algorithm?",
        options: [
          "Finding the minimum element in the unsorted partition and swapping it with the first unsorted element",
          "Shifting elements backward like a hand of cards",
          "Partitioning elements around a pivot index",
          "Merging two sorted halves recursively"
        ],
        correctIndex: 0,
        explanation: "Selection sort scans the unsorted subarray to find the minimum value and swaps it to the front of that subarray."
      },
      {
        id: "ssq-2",
        question: "What is the maximum number of memory swaps performed by Selection Sort on an array of size n?",
        options: ["O(n^2)", "At most n - 1 swaps", "O(n log n)", "O(2^n)"],
        correctIndex: 1,
        explanation: "Selection sort performs at most one swap per outer pass, executing at most n - 1 swaps overall, ideal when write operations are costly."
      },
      {
        id: "ssq-3",
        question: "What is the best-case time complexity of standard Selection Sort?",
        options: ["O(n)", "O(n log n)", "O(n^2)", "O(1)"],
        correctIndex: 2,
        explanation: "Selection sort always scans the full remaining unsorted partition to find the minimum, requiring O(n^2) comparisons regardless of initial order."
      },
      {
        id: "ssq-4",
        question: "Is standard array-based Selection Sort generally stable?",
        options: [
          "Yes, unconditionally stable",
          "No, long-distance swaps can displace equal elements out of order",
          "Stable only for positive integers",
          "Stable only when array size is even"
        ],
        correctIndex: 1,
        explanation: "Long-distance swaps over intermediate identical elements make basic array-based Selection Sort unstable."
      },
      {
        id: "ssq-5",
        question: "What is the auxiliary space complexity of Selection Sort?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correctIndex: 0,
        explanation: "Selection Sort operates strictly in-place, requiring O(1) auxiliary memory."
      }
    ]
  },

  "insertion-sort-quiz": {
    id: "insertion-sort-quiz",
    experimentId: "insertion-sort",
    title: "Insertion Sort Algorithm Self-Assessment",
    description: "Test your understanding of online sorting, card-sorting analogy, and shift operations.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "isq-1",
        question: "Which common real-world task mirrors the mechanics of Insertion Sort?",
        options: [
          "Sorting playing cards in your hand one by one",
          "Finding the tallest person in a row",
          "Splitting coins into equal piles",
          "Binary search in a dictionary"
        ],
        correctIndex: 0,
        explanation: "Insertion sort mirrors arranging cards in hand: pick one card at a time and insert it into its sorted position among existing cards."
      },
      {
        id: "isq-2",
        question: "What is the best-case time complexity of Insertion Sort when the array is already sorted?",
        options: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"],
        correctIndex: 2,
        explanation: "For sorted data, inner loop comparison fails on the first check with no shifts, running in O(n) linear time."
      },
      {
        id: "isq-3",
        question: "What is the auxiliary space complexity of Insertion Sort?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
        correctIndex: 2,
        explanation: "Insertion sort sorts in-place using only a temporary key variable, requiring O(1) space."
      },
      {
        id: "isq-4",
        question: "Why is Insertion Sort widely used for small sub-arrays (e.g. n <= 16) in hybrid algorithms like Timsort?",
        options: [
          "Low overhead, simple loops, and high CPU cache locality",
          "Guaranteed O(n log n) worst-case time",
          "Zero memory comparisons",
          "Non-comparison based nature"
        ],
        correctIndex: 0,
        explanation: "Low constant factors and cache locality make Insertion Sort faster than Quick Sort or Merge Sort on small sub-arrays."
      },
      {
        id: "isq-5",
        question: "Is Insertion Sort an online algorithm (can it sort a stream as elements arrive)?",
        options: [
          "Yes, it can insert new incoming items into an already sorted list in O(n)",
          "No, it requires the entire dataset upfront",
          "Only if data is pre-hashed",
          "Only for string data types"
        ],
        correctIndex: 0,
        explanation: "Insertion Sort is online: it seamlessly integrates new elements into an already sorted list as they arrive in real-time."
      }
    ]
  },

  "binary-tree-quiz": {
    id: "binary-tree-quiz",
    experimentId: "binary-tree-traversal",
    title: "Binary Tree Traversals Self-Assessment",
    description: "Assess your mastery of Inorder, Preorder, Postorder, and Level-Order traversals.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "btq-1",
        question: "Which traversal of a Binary Search Tree (BST) visits nodes in strictly ascending sorted order?",
        options: ["Preorder (Root, Left, Right)", "Inorder (Left, Root, Right)", "Postorder (Left, Right, Root)", "Level-order (BFS)"],
        correctIndex: 1,
        explanation: "Inorder traversal (Left -> Root -> Right) on a valid BST outputs keys in strictly ascending sorted order."
      },
      {
        id: "btq-2",
        question: "What is the maximum number of nodes in a binary tree of depth (height) h (where root is height 1)?",
        options: ["2^h - 1", "2^(h-1)", "2h", "h^2"],
        correctIndex: 0,
        explanation: "A full binary tree of height h has 1 + 2 + 4 + ... + 2^(h-1) = 2^h - 1 total nodes."
      },
      {
        id: "btq-3",
        question: "Which traversal order is most suitable for evaluating arithmetic expressions represented as an expression tree?",
        options: ["Postorder Traversal", "Inorder Traversal", "Preorder Traversal", "Spiral Level Order"],
        correctIndex: 0,
        explanation: "Postorder traversal visits child operand nodes first and their parent operator last, matching Reverse Polish (Postfix) evaluation."
      },
      {
        id: "btq-4",
        question: "What is the time complexity to traverse all N nodes of a binary tree using recursive Inorder traversal?",
        options: ["O(log N)", "O(N)", "O(N log N)", "O(N^2)"],
        correctIndex: 1,
        explanation: "Every node is visited exactly once, yielding an O(N) linear time complexity."
      },
      {
        id: "btq-5",
        question: "What data structure is utilized to implement Breadth-First Level-Order traversal of a Binary Tree iteratively?",
        options: ["Stack", "Queue", "Priority Queue", "Disjoint Set Union"],
        correctIndex: 1,
        explanation: "A FIFO Queue enqueues child nodes level-by-level, processing current level nodes before moving to the next level."
      }
    ]
  },

  // ========================================================
  // 2. OPERATING SYSTEMS (C) EXPERIMENTS
  // ========================================================
  "cpu-scheduling-quiz": {
    id: "cpu-scheduling-quiz",
    experimentId: "cpu-scheduling-fcfs-sjf",
    title: "CPU Scheduling Algorithms Self-Assessment",
    description: "Evaluate your understanding of FCFS, SJF, Gantt charts, and turnaround/waiting time calculations.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "csq-1",
        question: "Which CPU scheduling algorithm is provably optimal for minimizing average waiting time?",
        options: ["First-Come First-Served (FCFS)", "Shortest Job First (SJF / SRTF)", "Priority Scheduling", "Round Robin"],
        correctIndex: 1,
        explanation: "SJF (Shortest Job First) is provably optimal because scheduling shorter CPU bursts earlier minimizes the cumulative waiting time for all processes."
      },
      {
        id: "csq-2",
        question: "What is the 'Convoy Effect' in operating systems?",
        options: [
          "CPU switching between threads too quickly",
          "Short processes waiting a prolonged time behind one long CPU-bound process in FCFS",
          "Deadlock occurring between circular processes",
          "Memory page thrashing"
        ],
        correctIndex: 1,
        explanation: "In FCFS, when a long CPU-heavy process runs first, all short I/O-bound processes are blocked waiting behind it, causing poor device utilization."
      },
      {
        id: "csq-3",
        question: "How is Turnaround Time (TAT) calculated for a process in CPU scheduling?",
        options: [
          "TAT = Completion Time - Arrival Time",
          "TAT = Waiting Time + Arrival Time",
          "TAT = Burst Time - Waiting Time",
          "TAT = Arrival Time - Burst Time"
        ],
        correctIndex: 0,
        explanation: "Turnaround time is the total duration elapsed between job submission (arrival) and its completion: TAT = Completion Time - Arrival Time."
      },
      {
        id: "csq-4",
        question: "How is Waiting Time (WT) derived from Turnaround Time (TAT) and Burst Time (BT)?",
        options: ["WT = TAT - BT", "WT = TAT + BT", "WT = BT - TAT", "WT = Completion Time / BT"],
        correctIndex: 0,
        explanation: "Waiting time is the total time spent waiting in the ready queue: WT = Turnaround Time - Burst Time."
      },
      {
        id: "csq-5",
        question: "What scheduling algorithm assigns a fixed time quantum per process to guarantee responsiveness in interactive systems?",
        options: ["Round Robin (RR)", "FCFS", "Non-preemptive Priority", "Longest Job First"],
        correctIndex: 0,
        explanation: "Round Robin allocates each process a slice of CPU time (time quantum) before context switching to the next ready process."
      }
    ]
  },

  "semaphores-quiz": {
    id: "semaphores-quiz",
    experimentId: "producer-consumer-semaphores",
    title: "Process Synchronization & Semaphores Quiz",
    description: "Test your knowledge of Producer-Consumer synchronization, counting semaphores, and race conditions.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "sem-1",
        question: "In the bounded-buffer Producer-Consumer problem, what is the initial value of the 'empty' counting semaphore?",
        options: ["0", "1", "Buffer Capacity N", "Infinity"],
        correctIndex: 2,
        explanation: "The 'empty' semaphore is initialized to buffer capacity N because initially all N buffer slots are free for production."
      },
      {
        id: "sem-2",
        question: "Which atomic system call decrements a semaphore value and blocks the calling thread if value <= 0?",
        options: ["sem_post() / signal()", "sem_wait() / wait()", "pthread_join()", "sem_init()"],
        correctIndex: 1,
        explanation: "sem_wait() (also known as P() or wait()) decrements the semaphore counter and suspends execution if the count is zero."
      },
      {
        id: "sem-3",
        question: "Why is a Mutex lock used alongside counting semaphores in bounded-buffer problems?",
        options: [
          "To avoid CPU cache invalidation",
          "To guarantee mutual exclusion when writing/reading shared buffer indices (in / out)",
          "To allow multiple consumers to write simultaneously",
          "To allocate heap memory dynamically"
        ],
        correctIndex: 1,
        explanation: "A binary mutex ensures only one thread updates shared index variables (in/out) and array memory at any single moment."
      },
      {
        id: "sem-4",
        question: "What initial value is assigned to the 'full' counting semaphore at startup in Producer-Consumer?",
        options: ["0", "N", "1", "-1"],
        correctIndex: 0,
        explanation: "'full' starts at 0 because zero filled items exist in the buffer when the system starts."
      },
      {
        id: "sem-5",
        question: "What critical section issue arises when two concurrent threads access shared data without synchronization?",
        options: ["Race Condition", "Paging Fault", "Belady's Anomaly", "Amdahl's Bottleneck"],
        correctIndex: 0,
        explanation: "A Race Condition occurs when multiple threads concurrently modify shared data, producing unpredictable results dependent on execution timing."
      }
    ]
  },

  "bankers-quiz": {
    id: "bankers-quiz",
    experimentId: "bankers-deadlock-algorithm",
    title: "Banker's Deadlock Avoidance Self-Assessment",
    description: "Assess your understanding of safe states, resource matrices, and deadlock avoidance.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "bnk-1",
        question: "How is the Need matrix computed in Banker's Deadlock Avoidance Algorithm?",
        options: [
          "Need[i][j] = Allocation[i][j] - Max[i][j]",
          "Need[i][j] = Max[i][j] - Allocation[i][j]",
          "Need[i][j] = Available[j] - Allocation[i][j]",
          "Need[i][j] = Max[i][j] + Available[j]"
        ],
        correctIndex: 1,
        explanation: "Need represents the remaining resource units process i may request: Need = Max - Allocation."
      },
      {
        id: "bnk-2",
        question: "If a system is in an Unsafe State, does that guarantee that a Deadlock has already occurred?",
        options: [
          "Yes, unsafe state is synonymous with deadlock",
          "No, an unsafe state only means deadlock is possible if processes request maximum resources",
          "Yes, all running processes are terminated",
          "No, it means memory is full"
        ],
        correctIndex: 1,
        explanation: "An unsafe state is not necessarily deadlocked; it simply means the OS cannot guarantee avoiding deadlock if all processes claim their maximum declared needs."
      },
      {
        id: "bnk-3",
        question: "What are the four Coffman conditions necessary for a Deadlock to occur?",
        options: [
          "Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait",
          "Paging, Segmentation, Caching, Context Switching",
          "FCFS, SJF, Round Robin, Priority",
          "Thread, Process, Task, Fiber"
        ],
        correctIndex: 0,
        explanation: "All four conditions (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait) must hold simultaneously for a deadlock to exist."
      },
      {
        id: "bnk-4",
        question: "In Banker's Algorithm, what happens when a process request is found to lead to a Safe State?",
        options: [
          "The resources are safely allocated immediately",
          "The process is aborted",
          "The OS enters kernel panic",
          "The CPU is reset"
        ],
        correctIndex: 0,
        explanation: "If pretending to allocate resources keeps the system in a safe state with a valid execution sequence, the OS grants the request."
      },
      {
        id: "bnk-5",
        question: "What is the time complexity of the Safety Algorithm in Banker's Algorithm with n processes and m resource types?",
        options: ["O(m * n^2)", "O(n + m)", "O(log n)", "O(2^n)"],
        correctIndex: 0,
        explanation: "Checking whether each of the n processes can finish across m resource types takes O(m * n^2) in worst-case."
      }
    ]
  },

  "page-replacement-quiz": {
    id: "page-replacement-quiz",
    experimentId: "page-replacement-lru-fifo",
    title: "Page Replacement Algorithms Self-Assessment",
    description: "Evaluate your understanding of virtual memory demand paging, LRU, and Belady's anomaly.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "prq-1",
        question: "Which page replacement algorithm exhibits Belady's Anomaly (allocating more frames can increase page faults)?",
        options: ["Least Recently Used (LRU)", "Optimal Page Replacement (OPT)", "First-In First-Out (FIFO)", "Least Frequently Used (LFU)"],
        correctIndex: 2,
        explanation: "FIFO is prone to Belady's Anomaly because it is not a stack algorithm, unlike LRU and Optimal."
      },
      {
        id: "prq-2",
        question: "What optimal data structure combination achieves O(1) page access and O(1) page eviction in LRU Cache?",
        options: [
          "Doubly Linked List + Hash Map",
          "Binary Search Tree + Array",
          "Single Linear Array",
          "Circular Queue without hashes"
        ],
        correctIndex: 0,
        explanation: "A Hash Map provides O(1) key lookups, while a Doubly Linked List enables O(1) node detachment and relocation to the head."
      },
      {
        id: "prq-3",
        question: "What is a Page Fault in virtual memory systems?",
        options: [
          "A hardware corruption in RAM modules",
          "An interrupt raised when a program accesses a page not currently mapped in physical RAM",
          "A compilation syntax error",
          "Exceeding maximum disk sector space"
        ],
        correctIndex: 1,
        explanation: "A page fault occurs when the CPU references a valid virtual address whose page table entry is marked not present in RAM, triggering OS disk fetch."
      },
      {
        id: "prq-4",
        question: "What theoretical page replacement algorithm yields the minimum possible page faults?",
        options: ["Optimal Page Replacement (OPT / Belady's Min)", "LRU", "FIFO", "Second Chance Clock"],
        correctIndex: 0,
        explanation: "Optimal replacement evicts the page that will not be used for the longest period in the future (used as theoretical benchmark)."
      },
      {
        id: "prq-5",
        question: "What term describes the system degradation where excessive page swapping consumes most CPU time?",
        options: ["Thrashing", "Deadlock", "Starvation", "Paging Leak"],
        correctIndex: 0,
        explanation: "Thrashing occurs when total working set sizes exceed physical RAM, causing continuous disk I/O and near-zero CPU throughput."
      }
    ]
  },

  // ========================================================
  // 3. ARTIFICIAL INTELLIGENCE EXPERIMENTS
  // ========================================================
  "astar-search-quiz": {
    id: "astar-search-quiz",
    experimentId: "astar-search-8puzzle",
    title: "A* Heuristic Search Self-Assessment",
    description: "Test your mastery of A* search evaluation functions, admissible heuristics, and Manhattan distance.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "asq-1",
        question: "What does an 'Admissible Heuristic' mean in A* search?",
        options: [
          "h(n) must be strictly greater than the true remaining path cost",
          "h(n) must never overestimate the true cost to reach the goal",
          "h(n) must equal 0 for every node",
          "h(n) must be calculated using Euclidean metric only"
        ],
        correctIndex: 1,
        explanation: "An admissible heuristic never overestimates the actual cost to reach the goal state, guaranteeing that A* finds the optimal shortest path."
      },
      {
        id: "asq-2",
        question: "What is the evaluation function formula f(n) in A* search?",
        options: ["f(n) = g(n) * h(n)", "f(n) = g(n) + h(n)", "f(n) = max(g(n), h(n))", "f(n) = g(n) - h(n)"],
        correctIndex: 1,
        explanation: "f(n) = g(n) + h(n), where g(n) is exact cost from start to node n, and h(n) is estimated heuristic cost from n to goal."
      },
      {
        id: "asq-3",
        question: "In the 8-Puzzle problem, what is Manhattan Distance heuristic?",
        options: [
          "Sum of vertical and horizontal grid displacements of tiles from their target positions",
          "Count of misplaced tiles only",
          "Euclidean straight-line hypotenuse",
          "Number of blank moves"
        ],
        correctIndex: 0,
        explanation: "Manhattan distance calculates |x1 - x2| + |y1 - y2| for every tile, forming an admissible and consistent heuristic for grid movements."
      },
      {
        id: "asq-4",
        question: "What happens if h(n) = 0 for all nodes in A* Search?",
        options: [
          "A* degrades to Dijkstra's Uniform Cost Search (UCS)",
          "A* degrades to Depth-First Search (DFS)",
          "A* cannot terminate",
          "A* runs in O(1) time"
        ],
        correctIndex: 0,
        explanation: "When h(n) = 0, f(n) = g(n), making A* prioritize purely accumulated past cost, which is identical to Uniform Cost Search."
      },
      {
        id: "asq-5",
        question: "What data structure is used to maintain the OPEN list in A* search to retrieve the minimum f(n) node in O(log n)?",
        options: ["Min-Heap / Priority Queue", "Stack", "FIFO Queue", "Unordered Array"],
        correctIndex: 0,
        explanation: "A Min-Heap priority queue allows extracting the lowest f(n) state in O(log n) time."
      }
    ]
  },

  "minimax-quiz": {
    id: "minimax-quiz",
    experimentId: "minimax-alpha-beta-tictactoe",
    title: "Minimax & Alpha-Beta Pruning Self-Assessment",
    description: "Assess your knowledge of adversarial search trees, utility values, and branch pruning cutoffs.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "mmq-1",
        question: "Under what exact mathematical condition does Alpha-Beta pruning discard remaining child subtrees?",
        options: ["beta <= alpha", "alpha > 100", "alpha == 0", "beta > alpha"],
        correctIndex: 0,
        explanation: "When beta <= alpha, the opposing minimizer or maximizer has already established a superior alternative elsewhere, so exploring further cannot alter the root decision."
      },
      {
        id: "mmq-2",
        question: "What does the 'alpha' parameter represent in Alpha-Beta pruning?",
        options: [
          "The best (highest) value that the MAX player can guarantee so far along the path",
          "The lowest value that MIN can guarantee",
          "The depth of the search tree",
          "The branch factor"
        ],
        correctIndex: 0,
        explanation: "Alpha represents the maximum score that the maximizing player is guaranteed to achieve so far."
      },
      {
        id: "mmq-3",
        question: "What is the best-case time complexity of Alpha-Beta pruning with optimal move ordering (branching factor b, depth d)?",
        options: ["O(b^(d/2))", "O(b^d)", "O(d * log b)", "O(1)"],
        correctIndex: 0,
        explanation: "With perfect move ordering, alpha-beta cuts the effective branching factor to sqrt(b), reducing runtime to O(b^(d/2))."
      },
      {
        id: "mmq-4",
        question: "In Tic-Tac-Toe, what utility value is traditionally returned when MAX (X) wins the board state?",
        options: ["+1 (or +10)", "-1 (or -10)", "0", "Infinity"],
        correctIndex: 0,
        explanation: "Winning terminal states for MAX are assigned positive utility (+1, +10), while MIN wins are negative (-1, -10), and draws are 0."
      },
      {
        id: "mmq-5",
        question: "Does Alpha-Beta pruning alter the final move chosen compared to pure exhaustive Minimax?",
        options: [
          "No, Alpha-Beta returns the exact same optimal move as Minimax without evaluating irrelevant subtrees",
          "Yes, it chooses a faster approximate move",
          "Yes, it only works for symmetric games",
          "No, but it increases memory usage by O(b^d)"
        ],
        correctIndex: 0,
        explanation: "Alpha-Beta is an exact optimization: it prunes branches that mathematically cannot impact the final decision, guaranteeing identical results."
      }
    ]
  },

  // ========================================================
  // 4. DATABASE MANAGEMENT SYSTEMS EXPERIMENTS
  // ========================================================
  "sql-ddl-dml-quiz": {
    id: "sql-ddl-dml-quiz",
    experimentId: "sql-ddl-dml-operations",
    title: "SQL DDL & DML Operations Self-Assessment",
    description: "Evaluate your understanding of schema creation, data manipulation, constraints, and transactions.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "sql-1",
        question: "Which of the following SQL commands is classified as Data Definition Language (DDL)?",
        options: ["CREATE TABLE", "INSERT INTO", "UPDATE", "DELETE FROM"],
        correctIndex: 0,
        explanation: "DDL commands define and modify database schema structures (CREATE, ALTER, DROP, TRUNCATE)."
      },
      {
        id: "sql-2",
        question: "What is the fundamental difference between DROP TABLE and TRUNCATE TABLE?",
        options: [
          "DROP removes data and table schema structure; TRUNCATE removes all rows while preserving table structure",
          "TRUNCATE deletes the database entirely",
          "DROP cannot be used on tables with primary keys",
          "TRUNCATE is a DML command that logs every row deletion"
        ],
        correctIndex: 0,
        explanation: "TRUNCATE empties all rows quickly by deallocating data pages while preserving table schema; DROP destroys both table data and schema."
      },
      {
        id: "sql-3",
        question: "Which SQL constraint enforces entity integrity by guaranteeing that a column has unique, non-null values?",
        options: ["PRIMARY KEY", "FOREIGN KEY", "DEFAULT", "CHECK"],
        correctIndex: 0,
        explanation: "A PRIMARY KEY constraint uniquely identifies each record and strictly forbids NULL values."
      },
      {
        id: "sql-4",
        question: "Which clause is used to filter groups of records created by the GROUP BY clause?",
        options: ["HAVING", "WHERE", "ORDER BY", "DISTINCT"],
        correctIndex: 0,
        explanation: "WHERE filters individual rows before grouping, whereas HAVING filters aggregated groups after GROUP BY."
      },
      {
        id: "sql-5",
        question: "What type of JOIN returns all records from the left table and matching records from the right table, filling nulls for mismatches?",
        options: ["LEFT OUTER JOIN", "INNER JOIN", "CROSS JOIN", "NATURAL JOIN"],
        correctIndex: 0,
        explanation: "A LEFT OUTER JOIN preserves all rows from the left table regardless of whether a matching key exists in the right table."
      }
    ]
  },

  // ========================================================
  // 5. MACHINE LEARNING EXPERIMENTS
  // ========================================================
  "ml-regression-quiz": {
    id: "ml-regression-quiz",
    experimentId: "scikit-learn-linear-regression",
    title: "Linear Regression & Scikit-Learn Self-Assessment",
    description: "Assess your knowledge of Ordinary Least Squares, cost functions, gradient descent, and R-squared metrics.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "reg-1",
        question: "What objective loss function does Ordinary Least Squares (OLS) Linear Regression minimize?",
        options: [
          "Mean Squared Error (Sum of squared residual differences between actual and predicted values)",
          "Cross-Entropy Loss",
          "Hinge Loss",
          "Gini Impurity"
        ],
        correctIndex: 0,
        explanation: "Linear Regression minimizes the Mean Squared Error (MSE), measuring the average squared vertical distance between points and regression line."
      },
      {
        id: "reg-2",
        question: "What does an R-squared (Coefficient of Determination) value of 0.85 indicate?",
        options: [
          "85% of the variance in the target variable is explained by the independent feature variables",
          "The model has an 85% classification accuracy",
          "The learning rate is 0.85",
          "85% of the dataset was used for training"
        ],
        correctIndex: 0,
        explanation: "R² quantifies the proportion of total variance in the dependent variable explained by the regression model (1.0 = perfect fit)."
      },
      {
        id: "reg-3",
        question: "What regularization penalty is added to the cost function in Ridge Regression (L2 regularization)?",
        options: [
          "Sum of squared weights (lambda * sum(w_i^2))",
          "Sum of absolute weights (lambda * sum(|w_i|))",
          "Number of non-zero parameters",
          "Entropy of predictions"
        ],
        correctIndex: 0,
        explanation: "Ridge (L2) penalizes large coefficients by adding the sum of squared weights, preventing overfitting and multicollinearity."
      },
      {
        id: "reg-4",
        question: "Why must feature scaling (e.g. StandardScaler) be performed before Gradient Descent optimization?",
        options: [
          "To ensure features with large numerical magnitudes do not dominate gradient updates and create elongated contours",
          "Because Scikit-Learn cannot run without scaling",
          "To eliminate categorical features",
          "To convert non-linear relationships into linear ones"
        ],
        correctIndex: 0,
        explanation: "Feature scaling creates spherical loss surfaces, allowing Gradient Descent to converge much faster toward the global minimum."
      },
      {
        id: "reg-5",
        question: "Which Scikit-Learn method trains a model on training feature matrices X_train and target vector y_train?",
        options: ["model.fit(X_train, y_train)", "model.predict(X_train)", "model.score(y_train)", "model.transform()"],
        correctIndex: 0,
        explanation: "The .fit() method calculates parameter weights (slope and intercept) by optimizing the loss function over training data."
      }
    ]
  },

  // ========================================================
  // 6. BIG DATA ANALYTICS EXPERIMENTS
  // ========================================================
  "hdfs-quiz": {
    id: "hdfs-quiz",
    experimentId: "hadoop-hdfs-cluster-management",
    title: "Hadoop HDFS Distributed Architecture Quiz",
    description: "Evaluate your knowledge of HDFS block allocation, NameNode metadata, and rack awareness.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "hdq-1",
        question: "What is the standard default block size in modern Apache Hadoop HDFS clusters?",
        options: ["4 KB", "64 KB", "128 MB", "10 GB"],
        correctIndex: 2,
        explanation: "HDFS uses large default block sizes (128 MB or 256 MB) to minimize NameNode RAM metadata footprint and maximize sequential disk streaming."
      },
      {
        id: "hdq-2",
        question: "What is the primary role of the NameNode in an HDFS cluster?",
        options: [
          "Managing the file system namespace, directory hierarchy, and block location mappings in RAM",
          "Storing the raw binary file chunks on local disk",
          "Executing SQL transformations",
          "Managing network firewalls"
        ],
        correctIndex: 0,
        explanation: "The NameNode acts as master coordinator, retaining directory metadata and mapping block IDs to DataNode IP addresses in RAM."
      },
      {
        id: "hdq-3",
        question: "What is the default block replication factor in Apache Hadoop HDFS for fault tolerance?",
        options: ["1", "3", "5", "10"],
        correctIndex: 1,
        explanation: "HDFS replicates each block 3 times across different DataNodes and racks by default to withstand hardware failure."
      },
      {
        id: "hdq-4",
        question: "How do DataNodes inform the active NameNode that they are alive and functioning properly?",
        options: [
          "By sending periodic Heartbeat signals (every 3 seconds by default)",
          "By uploading full copies of their disks daily",
          "Via manual administrator commands",
          "Through MapReduce job logs"
        ],
        correctIndex: 0,
        explanation: "DataNodes send periodic heartbeats and block reports; if no heartbeat arrives for 10 minutes, the NameNode initiates block re-replication."
      },
      {
        id: "hdq-5",
        question: "What file system image and edit log are merged by the Secondary NameNode?",
        options: ["fsimage and edits log", "hdfs.log and yarn.xml", "core-site.xml and mapred.xml", "hive.db and metastore"],
        correctIndex: 0,
        explanation: "The Secondary NameNode performs periodic checkpoints by merging the fsimage snapshot with the transaction edits log to prevent edit log bloat."
      }
    ]
  },

  // ========================================================
  // 7. CLOUD SERVICE MANAGEMENT EXPERIMENTS
  // ========================================================
  "aws-ec2-quiz": {
    id: "aws-ec2-quiz",
    experimentId: "aws-ec2-vpc-infrastructure",
    title: "AWS EC2 & VPC Infrastructure Self-Assessment",
    description: "Assess your knowledge of virtual compute instances, security groups, and VPC networking.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "ecq-1",
        question: "What is the key characteristic of AWS EC2 Security Groups regarding network traffic rules?",
        options: [
          "They are stateful (inbound allowed traffic automatically permits return outbound response traffic)",
          "They are stateless (outbound return rules must be explicitly configured)",
          "They can only block IP addresses, not allow them",
          "They operate at the subnet level rather than instance level"
        ],
        correctIndex: 0,
        explanation: "Security Groups are stateful virtual firewalls: allowing an inbound port (e.g. 443) automatically permits return outbound response traffic."
      },
      {
        id: "ecq-2",
        question: "Which AWS VPC component allows instances in a private subnet to access the internet while preventing inbound internet connections?",
        options: ["NAT Gateway", "Internet Gateway (IGW)", "Virtual Private Gateway (VGW)", "Direct Connect"],
        correctIndex: 0,
        explanation: "A NAT (Network Address Translation) Gateway enables instances in private subnets to initiate outbound traffic (e.g. software updates) while blocking external inbound connections."
      },
      {
        id: "ecq-3",
        question: "What is the primary difference between AWS Network Access Control Lists (NACLs) and Security Groups?",
        options: [
          "NACLs are stateless and operate at the subnet boundary; Security Groups are stateful and operate at instance ENI level",
          "NACLs can only inspect HTTP traffic",
          "Security Groups are applied to VPC route tables",
          "NACLs cannot have deny rules"
        ],
        correctIndex: 0,
        explanation: "NACLs provide stateless subnet-level packet filtering with numbered allow/deny rules; Security Groups provide stateful instance-level allow rules."
      },
      {
        id: "ecq-4",
        question: "Which EC2 pricing model provides up to 90% discount by utilizing unused AWS spare compute capacity with interruption notice?",
        options: ["Spot Instances", "On-Demand Instances", "Reserved Instances", "Dedicated Hosts"],
        correctIndex: 0,
        explanation: "Spot instances offer steep discounts on surplus EC2 capacity, suitable for fault-tolerant and stateless batch workloads."
      },
      {
        id: "ecq-5",
        question: "What is an Elastic IP address in AWS EC2?",
        options: [
          "A static, public IPv4 address designed for dynamic cloud remapping to any instance in your account",
          "A private IPv6 address assigned automatically",
          "A domain name managed by Route 53",
          "A virtual MAC address"
        ],
        correctIndex: 0,
        explanation: "An Elastic IP is a fixed public IPv4 address that can be rapidly re-associated to another instance during failovers."
      }
    ]
  },

  // ========================================================
  // 8. COMPUTER NETWORKS EXPERIMENTS
  // ========================================================
  "crc-quiz": {
    id: "crc-quiz",
    experimentId: "crc-error-detection",
    title: "CRC Error Detection & Framing Quiz",
    description: "Evaluate your knowledge of polynomial division, checksums, and parity checking.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "crc-1",
        question: "In Cyclic Redundancy Check (CRC), what mathematical operation is performed on the data bits using generator polynomial?",
        options: ["Modulo-2 Binary Division (XOR operations)", "Standard Base-10 Division", "Logical Bitwise AND", "Fast Fourier Transform"],
        correctIndex: 0,
        explanation: "CRC uses Modulo-2 binary polynomial division where subtraction is replaced with XOR operations without carries or borrows."
      },
      {
        id: "crc-2",
        question: "If the generator polynomial in CRC has degree 'k' (length k+1 bits), how many zero bits are appended to data before division?",
        options: ["k zero bits", "k + 1 zero bits", "k - 1 zero bits", "2k zero bits"],
        correctIndex: 0,
        explanation: "Exactly k zeros (equal to generator polynomial degree) are appended to dividend bits to make space for remainder CRC checksum."
      },
      {
        id: "crc-3",
        question: "What condition at the receiver indicates that received frame bits are free of transmission errors?",
        options: [
          "The remainder after modulo-2 division by generator polynomial is all zeros",
          "The quotient is an even integer",
          "The remainder equals the generator polynomial",
          "The checksum equals 1"
        ],
        correctIndex: 0,
        explanation: "If no bits are corrupted in transit, dividing the transmitted codeword (data + CRC) by generator polynomial yields remainder 0."
      },
      {
        id: "crc-4",
        question: "At which OSI Reference Model layer does CRC frame error detection typically operate?",
        options: ["Data Link Layer (Layer 2)", "Network Layer (Layer 3)", "Transport Layer (Layer 4)", "Application Layer (Layer 7)"],
        correctIndex: 0,
        explanation: "CRC is implemented in hardware at Data Link Layer inside the Frame Check Sequence (FCS) trailer of Ethernet frames."
      },
      {
        id: "crc-5",
        question: "What is a prominent capability of CRC compared to simple 1D parity checks?",
        options: [
          "High reliability detecting burst errors of length up to polynomial degree k",
          "Automatic encryption of frame content",
          "Compressing payload size by 50%",
          "Guaranteeing zero latency"
        ],
        correctIndex: 0,
        explanation: "CRC guarantees detection of all single-bit errors, double-bit errors, odd counts of errors, and burst errors of length <= k."
      }
    ]
  },

  // ========================================================
  // 9. DSA VISUALIZER TOPIC QUIZZES (CORE SUITE)
  // ========================================================
  "dsa-binary-search-quiz": {
    id: "dsa-binary-search-quiz",
    experimentId: "binary-search",
    title: "Binary Search Visualizer Self-Assessment",
    description: "Master divide-and-conquer searching, midpoint overflow formulas, and search space boundary conditions.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "bs-1",
        question: "What mandatory prerequisite must be satisfied before Binary Search can be applied to an array?",
        options: ["The array elements must be sorted in monotonic order", "The array size must be a power of two", "All numbers must be positive", "The array must be dynamically allocated"],
        correctIndex: 0,
        explanation: "Binary Search relies on sorted order to eliminate half of the remaining search space in each comparison."
      },
      {
        id: "bs-2",
        question: "Which midpoint calculation safely prevents 32-bit integer arithmetic overflow when low and high are large?",
        options: ["mid = low + (high - low) / 2", "mid = (low + high) / 2", "mid = (low + high) >> 2", "mid = high - low / 2"],
        correctIndex: 0,
        explanation: "low + (high - low) / 2 computes the exact same index as (low + high) / 2 without risking integer overflow when low + high exceeds 2^31 - 1."
      },
      {
        id: "bs-3",
        question: "What is the worst-case time complexity of Binary Search on an array of size n?",
        options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
        correctIndex: 0,
        explanation: "Because the search interval is halved at every iteration, the maximum number of steps is ceil(log2(n)) = O(log n)."
      },
      {
        id: "bs-4",
        question: "What value does Binary Search return when target element is not present in the array?",
        options: ["-1 (or insertion index)", "0", "Array length", "Throws fatal exception"],
        correctIndex: 0,
        explanation: "Standard binary search returns -1 (or insertion index / lower bound) to indicate unsuccessful search."
      },
      {
        id: "bs-5",
        question: "What is the space complexity of iterative Binary Search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
        correctIndex: 0,
        explanation: "Iterative binary search uses only pointers (low, high, mid) requiring O(1) auxiliary memory."
      }
    ]
  },

  "dsa-dijkstra-quiz": {
    id: "dsa-dijkstra-quiz",
    experimentId: "dijkstra",
    title: "Dijkstra's Shortest Path Algorithm Quiz",
    description: "Evaluate your understanding of single-source shortest path, greedy edge relaxation, and negative weight limitations.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "djk-1",
        question: "What fundamental assumption does Dijkstra's Algorithm make regarding edge weights?",
        options: ["All edge weights must be non-negative (>= 0)", "The graph must be a Directed Acyclic Graph (DAG)", "Edges must have unit weights", "The graph must be bipartite"],
        correctIndex: 0,
        explanation: "Dijkstra greedily marks nodes as finalized; negative edge weights invalidate this greedy assumption (requiring Bellman-Ford)."
      },
      {
        id: "djk-2",
        question: "What mathematical inequality defines the Edge Relaxation step for edge (u, v) with weight w?",
        options: [
          "if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; }",
          "if (dist[u] * w < dist[v]) { dist[v] = dist[u] * w; }",
          "if (dist[v] + w < dist[u]) { dist[u] = dist[v] + w; }",
          "dist[v] = min(dist[u], w)"
        ],
        correctIndex: 0,
        explanation: "Relaxation checks if reaching vertex v through intermediate vertex u yields a shorter path than current known dist[v]."
      },
      {
        id: "djk-3",
        question: "What is the time complexity of Dijkstra's Algorithm using a Min-Heap (Priority Queue) with V vertices and E edges?",
        options: ["O((V + E) log V)", "O(V^2)", "O(E * V)", "O(V log E)"],
        correctIndex: 0,
        explanation: "With an adjacency list and binary min-heap, inserting and decreasing vertex keys yields O((V + E) log V)."
      },
      {
        id: "djk-4",
        question: "Which algorithm should be selected instead of Dijkstra when a graph contains negative edge weights?",
        options: ["Bellman-Ford Algorithm", "Kruskal's Algorithm", "Breadth-First Search (BFS)", "Prim's Algorithm"],
        correctIndex: 0,
        explanation: "Bellman-Ford relaxes all edges V-1 times and successfully handles negative weights while detecting negative weight cycles."
      },
      {
        id: "djk-5",
        question: "In what real-world domain is Dijkstra's Algorithm widely deployed?",
        options: ["OSPF Network Routing Protocol & GPS Mapping", "Video Compression", "Cryptographic Hashing", "CPU Register Allocation"],
        correctIndex: 0,
        explanation: "OSPF (Open Shortest Path First) routing and GPS pathfinding calculate lowest-latency network routes using Dijkstra."
      }
    ]
  },

  "dsa-avl-tree-quiz": {
    id: "dsa-avl-tree-quiz",
    experimentId: "avl-tree",
    title: "AVL Self-Balancing Tree Self-Assessment",
    description: "Assess your knowledge of Balance Factors, LL/RR/LR/RL tree rotations, and logarithmic search guarantees.",
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "avl-1",
        question: "What is the permitted Balance Factor (BF = height(Left) - height(Right)) for every node in a valid AVL Tree?",
        options: ["-1, 0, or +1", "-2 to +2", "Strictly 0", "Any positive integer"],
        correctIndex: 0,
        explanation: "An AVL Tree strictly requires that for every node, the difference in height between its left and right subtrees is in {-1, 0, +1}."
      },
      {
        id: "avl-2",
        question: "Which rotation is performed when an insertion occurs in the Left subtree of the Right child (RL imbalance)?",
        options: ["Right Rotation followed by Left Rotation (RL Rotation)", "Single Left Rotation (RR)", "Single Right Rotation (LL)", "Left Rotation followed by Right Rotation (LR)"],
        correctIndex: 0,
        explanation: "An RL imbalance requires a Right rotation on the right child followed by a Left rotation on the unbalanced parent node."
      },
      {
        id: "avl-3",
        question: "What is the strictly guaranteed worst-case time complexity for Search, Insertion, and Deletion in an AVL tree with N nodes?",
        options: ["O(log N)", "O(N)", "O(1)", "O(N log N)"],
        correctIndex: 0,
        explanation: "Because the tree height is strictly maintained at h <= 1.44 * log2(N), all primary tree operations run in O(log N) worst-case."
      },
      {
        id: "avl-4",
        question: "What is the maximum number of tree rotations needed to restore balance after a single node Insertion?",
        options: ["At most 2 rotations (one single or one double rotation)", "O(log N) rotations", "N rotations", "Zero rotations"],
        correctIndex: 0,
        explanation: "A single rotation (LL/RR) or double rotation (LR/RL) at the lowest unbalanced ancestor completely restores the AVL property."
      },
      {
        id: "avl-5",
        question: "How does an AVL Tree compare with a Red-Black Tree in terms of search performance?",
        options: [
          "AVL Trees are more rigidly balanced, providing faster lookups/searches at the cost of slightly more rotation work during insertions/deletions",
          "Red-Black trees have lower height",
          "AVL trees do not support binary search",
          "They have identical height bounds"
        ],
        correctIndex: 0,
        explanation: "AVL trees have a stricter balance factor bound, resulting in smaller tree height and faster lookup queries."
      }
    ]
  }
};

export function getQuizForExperiment(expId: string, customTitle?: string): Quiz {
  if (QUIZZES_DATA[expId]) return QUIZZES_DATA[expId];
  if (QUIZZES_DATA[`${expId}-quiz`]) return QUIZZES_DATA[`${expId}-quiz`];
  
  const found = Object.values(QUIZZES_DATA).find(
    (q) => q.experimentId === expId || q.id === expId || expId.includes(q.experimentId) || (q.experimentId && q.experimentId.includes(expId))
  );
  if (found) return found;

  const displayTitle = customTitle || expId.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    id: `${expId}-quiz`,
    experimentId: expId,
    title: `${displayTitle} Evaluation Assessment`,
    description: `Evaluate your core conceptual understanding, time/space complexity analysis, and implementation best practices for ${displayTitle}.`,
    passingScore: 4,
    timeLimitMinutes: 5,
    questions: [
      {
        id: `${expId}-q1`,
        question: `What is the primary algorithmic objective and core mechanism underlying ${displayTitle}?`,
        options: [
          "Optimizing asymptotic time and space resource utilization",
          "Executing arbitrary recursive calls without base cases",
          "Bypassing runtime bounds verification",
          "Forcing linear worst-case overhead"
        ],
        correctIndex: 0,
        explanation: `${displayTitle} is designed to solve computational tasks with optimal asymptotic runtime and predictable memory consumption.`
      },
      {
        id: `${expId}-q2`,
        question: `Which data representation or runtime condition is critical for the correct execution of ${displayTitle}?`,
        options: [
          "Preserving structural invariants and boundary termination criteria",
          "Allowing unrestricted memory leaks",
          "Unbounded thread contention",
          "Ignoring array index bounds"
        ],
        correctIndex: 0,
        explanation: "Correctness requires adhering to strict boundary checks, loop invariants, and valid pointer references."
      },
      {
        id: `${expId}-q3`,
        question: `What is the typical space complexity profile required for standard iterative implementations of ${displayTitle}?`,
        options: [
          "O(1) auxiliary space or O(N) when allocating dynamic structures",
          "O(N!) factorial memory growth",
          "O(2^N) exponential auxiliary stack",
          "Unlimited dynamically expanding cache"
        ],
        correctIndex: 0,
        explanation: "In-place or iterative algorithms typically maintain O(1) auxiliary variables, or O(N) when explicit buffers are allocated."
      },
      {
        id: `${expId}-q4`,
        question: `How are edge cases (such as empty inputs, null pointers, or single-element datasets) handled in ${displayTitle}?`,
        options: [
          "Explicit guard clauses and conditional base-case validation",
          "Silent process termination",
          "Raising unhandled runtime exceptions",
          "Bypassing edge condition handling"
        ],
        correctIndex: 0,
        explanation: "Robust implementations include front-loaded validation for null values, empty collections, and zero or single-item bounds."
      },
      {
        id: `${expId}-q5`,
        question: `In modern software engineering, why is ${displayTitle} widely applied in real-world systems?`,
        options: [
          "It provides predictable performance guarantees and clean modular design",
          "It is incompatible with standard hardware architectures",
          "It prevents deterministic testing",
          "It increases codebase fragility"
        ],
        correctIndex: 0,
        explanation: "Mastering fundamental algorithmic primitives enables software engineers to build scalable, high-throughput systems."
      }
    ]
  };
}

