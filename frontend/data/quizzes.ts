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
  "stack-quiz": {
    id: "stack-quiz",
    experimentId: "stack-operations",
    title: "Stack Operations Self-Assessment",
    description: "Evaluate your understanding of Stack LIFO characteristics, push/pop/peek complexities, and boundary conditions.",
    passingScore: 3,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "stq-1",
        question: "Which of the following principles governs the operation of a Stack data structure?",
        options: ["First-In, First-Out (FIFO)", "Last-In, First-Out (LIFO)", "First-In, Random-Out (FIRO)", "Priority-Based Order (PBO)"],
        correctIndex: 1,
        explanation: "A stack strictly follows the LIFO (Last-In, First-Out) principle, where the element added most recently is the first one removed."
      },
      {
        id: "stq-2",
        question: "What is the time complexity of the Push and Pop operations in an array-based stack (assuming no dynamic resizing)?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        correctIndex: 2,
        explanation: "Push and Pop modify only the top index pointer of the stack, which executes in constant time O(1)."
      },
      {
        id: "stq-3",
        question: "What condition occurs when a program attempts to pop an element from an empty stack?",
        options: ["Stack Overflow", "Stack Underflow", "Memory Segmentation Fault", "Dangling Pointer Exception"],
        correctIndex: 1,
        explanation: "Stack Underflow occurs when an access or removal (pop/peek) is requested on a stack containing zero elements."
      },
      {
        id: "stq-4",
        question: "Which real-world computing mechanism relies directly on a stack data structure?",
        options: ["Function Call Call-Stack & Recursion tracking", "Printer document spooling", "Breadth-First Search (BFS)", "Round-Robin CPU scheduling"],
        correctIndex: 0,
        explanation: "Call stacks maintain active subroutines, local variables, and return addresses during nested and recursive function calls."
      }
    ]
  },
  "queue-quiz": {
    id: "queue-quiz",
    experimentId: "queue-operations",
    title: "Queue Operations Self-Assessment",
    description: "Test your mastery of FIFO queues, front/rear pointer mechanics, and circular queue boundary conditions.",
    passingScore: 3,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "quq-1",
        question: "In a standard linear Queue, at which end are elements inserted (enqueued)?",
        options: ["Front pointer", "Rear pointer", "Middle index", "Top pointer"],
        correctIndex: 1,
        explanation: "New elements are always added to the Rear end, while removals happen from the Front end in a FIFO queue."
      },
      {
        id: "quq-2",
        question: "What major limitation of a linear array-based queue is solved by a Circular Queue?",
        options: [
          "Eliminating the O(1) dequeue time",
          "False overflow where vacant spaces at the front cannot be reused",
          "Requiring dynamic pointer allocation",
          "Inability to hold integer data types"
        ],
        correctIndex: 1,
        explanation: "In linear queues, dequeueing shifts the front forward, leaving empty spaces that cannot be reused without wrapping around via modulo arithmetic."
      },
      {
        id: "quq-3",
        question: "In a circular queue of capacity N, how is the next rear position calculated upon enqueue?",
        options: ["rear = rear + 1", "rear = (rear + 1) % N", "rear = (rear - 1) % N", "rear = N - front"],
        correctIndex: 1,
        explanation: "The modulo operator wraps the pointer back to index 0 once it reaches the end of the array: (rear + 1) % N."
      },
      {
        id: "quq-4",
        question: "Which algorithm natively utilizes a Queue for level-by-level traversal?",
        options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Quick Sort", "Binary Search"],
        correctIndex: 1,
        explanation: "BFS explores all neighboring nodes at the current depth before moving to nodes at the next depth level using a FIFO Queue."
      }
    ]
  },
  "linked-list-quiz": {
    id: "linked-list-quiz",
    experimentId: "singly-linked-list",
    title: "Singly Linked List Self-Assessment",
    description: "Evaluate your knowledge of dynamic memory nodes, pointer linkage, and traversal operations.",
    passingScore: 3,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "llq-1",
        question: "What are the two primary components that make up a Singly Linked List node?",
        options: [
          "Key and Priority",
          "Data field and Next Pointer reference",
          "Left child and Right child",
          "Index and Hash value"
        ],
        correctIndex: 1,
        explanation: "A singly linked list node contains the payload value (data) and a reference pointer pointing to the next node in the sequence."
      },
      {
        id: "llq-2",
        question: "What is the time complexity to insert a new node at the head (beginning) of a Singly Linked List?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correctIndex: 0,
        explanation: "Inserting at the head simply requires setting new_node.next = head and updating head = new_node, which is an O(1) constant-time operation."
      },
      {
        id: "llq-3",
        question: "Why cannot Binary Search be efficiently applied to a standard Singly Linked List in O(log n) time?",
        options: [
          "Linked lists cannot store sorted data",
          "Linked list nodes do not support O(1) random direct indexing",
          "Linked lists use too much cache space",
          "Linked lists cannot contain duplicate values"
        ],
        correctIndex: 1,
        explanation: "Binary search requires accessing the middle element in O(1). In a linked list, finding the middle requires traversing O(n/2) nodes sequentially."
      },
      {
        id: "llq-4",
        question: "What indicates the end of a standard Singly Linked List?",
        options: ["A node pointing back to head", "A node whose next pointer is NULL / None", "A node containing data value 0", "A detached pointer"],
        correctIndex: 1,
        explanation: "The tail node of a linear singly linked list has its next pointer pointing to NULL (or None in Python/null in JS)."
      }
    ]
  },
  "bubble-sort-quiz": {
    id: "bubble-sort-quiz",
    experimentId: "bubble-sort",
    title: "Bubble Sort Algorithm Self-Assessment",
    description: "Test your understanding of adjacent swapping, pass counts, time complexities, and stability.",
    passingScore: 3,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "bsq-1",
        question: "How does the Bubble Sort algorithm position elements in each pass?",
        options: [
          "By finding the minimum element and placing it at the front",
          "By comparing adjacent pairs and bubbling the largest unsorted element to the end",
          "By dividing the array into two halves recursively",
          "By inserting elements into a binary heap"
        ],
        correctIndex: 1,
        explanation: "In every pass, Bubble Sort compares adjacent pairs and swaps them if out of order, effectively bubbling the maximum unsorted element to its correct sorted position."
      },
      {
        id: "bsq-2",
        question: "What is the best-case time complexity of an optimized Bubble Sort algorithm on an already-sorted array?",
        options: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"],
        correctIndex: 2,
        explanation: "With a boolean swapped flag, if no swaps occur during the first pass, the algorithm terminates early in O(n) linear time."
      },
      {
        id: "bsq-3",
        question: "Is standard Bubble Sort a stable sorting algorithm?",
        options: [
          "Yes, because equal elements are never swapped past each other",
          "No, because it swaps non-adjacent elements",
          "Only when sorting integers",
          "Only when using extra memory space"
        ],
        correctIndex: 0,
        explanation: "Bubble Sort is stable because adjacent elements with equal keys do not satisfy the strictly greater condition (arr[j] > arr[j+1]), preserving their relative order."
      },
      {
        id: "bsq-4",
        question: "What is the total number of comparisons made by standard Bubble Sort on an array of size n in worst case?",
        options: ["n", "n(n - 1) / 2", "n log n", "2^n"],
        correctIndex: 1,
        explanation: "The sum of comparisons across (n-1) passes is (n-1) + (n-2) + ... + 1 = n(n-1)/2, which is O(n^2)."
      }
    ]
  },
  "selection-sort-quiz": {
    id: "selection-sort-quiz",
    experimentId: "selection-sort",
    title: "Selection Sort Algorithm Self-Assessment",
    description: "Evaluate your knowledge of minimum element selection, swap counts, and invariant properties.",
    passingScore: 3,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "ssq-1",
        question: "What is the core strategy of the Selection Sort algorithm?",
        options: [
          "Repeatedly find the minimum element in the unsorted subarray and swap it with the first unsorted element",
          "Insert each element into its correct sorted position by shifting larger elements",
          "Partition the array around a chosen pivot",
          "Merge two sorted halves iteratively"
        ],
        correctIndex: 0,
        explanation: "Selection Sort maintains sorted and unsorted partitions, repeatedly selecting the smallest element from the unsorted portion and placing it at the beginning."
      },
      {
        id: "ssq-2",
        question: "What is the maximum number of memory swaps executed by Selection Sort on an array of size n?",
        options: ["O(n^2)", "At most n - 1 swaps", "O(n log n)", "O(2^n)"],
        correctIndex: 1,
        explanation: "Selection Sort performs exactly one swap per outer loop pass, resulting in at most n - 1 swaps, making it advantageous when memory write operations are expensive."
      },
      {
        id: "ssq-3",
        question: "What is the time complexity of Selection Sort in the best case (when the array is already sorted)?",
        options: ["O(n)", "O(n log n)", "O(n^2)", "O(1)"],
        correctIndex: 2,
        explanation: "Even if the array is sorted, Selection Sort must still scan the remaining unsorted subarray to confirm the minimum, always requiring O(n^2) comparisons."
      },
      {
        id: "ssq-4",
        question: "Is standard array-based Selection Sort stable?",
        options: [
          "Yes, always stable",
          "No, long-distance swaps can reorder identical elements",
          "Stable only for descending order",
          "Stable only if array size is even"
        ],
        correctIndex: 1,
        explanation: "Selection sort is generally unstable because swapping the minimum element with the first unsorted element can move an identical key past another duplicate."
      }
    ]
  },
  "insertion-sort-quiz": {
    id: "insertion-sort-quiz",
    experimentId: "insertion-sort",
    title: "Insertion Sort Algorithm Self-Assessment",
    description: "Test your understanding of online sorting, card-sorting analogy, and shift operations.",
    passingScore: 3,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "isq-1",
        question: "Which real-life analogy best describes how Insertion Sort works?",
        options: [
          "Sorting playing cards in your hand one by one",
          "Finding the smallest fruit in a basket repeatedly",
          "Splitting a deck of cards into two equal piles",
          "Placing books on a shelf by their first letter"
        ],
        correctIndex: 0,
        explanation: "Insertion Sort mirrors sorting a hand of playing cards: you take one card at a time and insert it into its correct position among the already-sorted cards."
      },
      {
        id: "isq-2",
        question: "What makes Insertion Sort particularly efficient for nearly sorted datasets?",
        options: [
          "It uses O(log n) extra memory",
          "Inner loop shifts terminate immediately when an element is in correct place, achieving O(n) time",
          "It divides the array into 4 parallel threads",
          "It converts the array into a Red-Black tree"
        ],
        correctIndex: 1,
        explanation: "For nearly sorted data, very few or zero shifts are needed per element, allowing Insertion Sort to run in adaptive O(n) linear time."
      },
      {
        id: "isq-3",
        question: "What is the auxiliary space complexity of Insertion Sort?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
        correctIndex: 2,
        explanation: "Insertion Sort sorts in-place using only a single temporary key variable, requiring O(1) auxiliary memory."
      },
      {
        id: "isq-4",
        question: "Why is Insertion Sort often used as the base-case sorting routine inside hybrid algorithms like Timsort or IntroSort?",
        correctIndex: 0,
        explanation: "Due to low overhead and excellent CPU cache locality, Insertion Sort outperforms Quick Sort and Merge Sort on small sub-arrays."
      }
    ]
  },

  // ==========================================
  // OPERATING SYSTEMS QUIZZES
  // ==========================================
  "cpu-scheduling-quiz": {
    id: "cpu-scheduling-quiz",
    experimentId: "cpu-scheduling-fcfs-sjf",
    title: "CPU Scheduling Self-Assessment",
    description: "Evaluate your understanding of FCFS, SJF, Gantt charts, and turnaround/waiting time calculations.",
    passingScore: 3,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "csq-1",
        question: "Which CPU scheduling algorithm is provably optimal for minimizing average waiting time?",
        options: ["First-Come First-Served (FCFS)", "Shortest Job First (SJF)", "Priority Scheduling", "Round Robin"],
        correctIndex: 1,
        explanation: "SJF (Shortest Job First) is provably optimal because scheduling the shortest CPU burst first results in the minimum average waiting time for a given set of processes."
      },
      {
        id: "csq-2",
        question: "What is the Convoy Effect in operating systems?",
        options: [
          "CPU switching between threads too quickly",
          "Short processes waiting for a prolonged time behind one long CPU-bound process in FCFS",
          "Deadlock occurring between multiple processes",
          "Memory page swapping degradation"
        ],
        correctIndex: 1,
        explanation: "In FCFS, when a long CPU-intensive process executes first, all subsequent short I/O or CPU jobs must wait, leading to severe resource underutilization known as the Convoy Effect."
      },
      {
        id: "csq-3",
        question: "How is Turnaround Time (TAT) calculated for a process?",
        options: [
          "TAT = Completion Time - Arrival Time",
          "TAT = Waiting Time + Arrival Time",
          "TAT = Burst Time - Waiting Time",
          "TAT = Arrival Time - Burst Time"
        ],
        correctIndex: 0,
        explanation: "Turnaround time measures total time spent from arrival to termination: TAT = Completion Time - Arrival Time."
      }
    ]
  },
  "semaphores-quiz": {
    id: "semaphores-quiz",
    experimentId: "producer-consumer-semaphores",
    title: "Process Synchronization & Semaphores Quiz",
    description: "Test your knowledge of Producer-Consumer synchronization, counting semaphores, and race conditions.",
    passingScore: 3,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "sem-1",
        question: "In the bounded-buffer Producer-Consumer problem, what is the initial value of the 'empty' counting semaphore?",
        options: ["0", "1", "Buffer Capacity N", "Infinity"],
        correctIndex: 2,
        explanation: "The 'empty' semaphore is initialized to the capacity of the buffer (N) because initially all N slots are available for writing."
      },
      {
        id: "sem-2",
        question: "Which atomic operation decrements the value of a semaphore and blocks if the value is <= 0?",
        options: ["sem_post() / signal()", "sem_wait() / wait()", "pthread_join()", "sem_init()"],
        correctIndex: 1,
        explanation: "sem_wait() (or P() / wait()) decrements the semaphore counter and suspends the calling thread if no slots are available."
      },
      {
        id: "sem-3",
        question: "Why is a Mutex lock used alongside counting semaphores in Producer-Consumer?",
        options: [
          "To prevent CPU cache misses",
          "To guarantee mutual exclusion when modifying shared buffer indices (in / out)",
          "To allow multiple consumers to write simultaneously",
          "To eliminate the need for memory allocation"
        ],
        correctIndex: 1,
        explanation: "The mutex ensures only one thread updates shared pointers (in and out) and writes to the memory buffer at any given millisecond."
      }
    ]
  },
  "bankers-quiz": {
    id: "bankers-quiz",
    experimentId: "bankers-deadlock-algorithm",
    title: "Banker's Deadlock Avoidance Quiz",
    description: "Assess your understanding of safe states, resource matrices, and deadlock avoidance.",
    passingScore: 3,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "bnk-1",
        question: "How is the Need matrix computed in Banker's Algorithm?",
        options: [
          "Need[i][j] = Allocation[i][j] - Max[i][j]",
          "Need[i][j] = Max[i][j] - Allocation[i][j]",
          "Need[i][j] = Available[j] - Allocation[i][j]",
          "Need[i][j] = Max[i][j] + Available[j]"
        ],
        correctIndex: 1,
        explanation: "Need represents the remaining resource units that process i may request: Need = Max - Allocation."
      },
      {
        id: "bnk-2",
        question: "If a system is in an Unsafe State, does that guarantee that a Deadlock has already occurred?",
        options: [
          "Yes, unsafe state is synonymous with deadlock",
          "No, an unsafe state only means that deadlock is possible depending on future process requests",
          "Yes, all running processes are frozen",
          "No, it means memory is full"
        ],
        correctIndex: 1,
        explanation: "An unsafe state is not necessarily a deadlock; it simply means the operating system cannot guarantee avoidance of a deadlock if all processes request their maximum resources."
      }
    ]
  },
  "page-replacement-quiz": {
    id: "page-replacement-quiz",
    experimentId: "page-replacement-lru-fifo",
    title: "Page Replacement Algorithms Quiz",
    description: "Evaluate your understanding of virtual memory demand paging, LRU, and Belady's anomaly.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "prq-1",
        question: "Which page replacement algorithm suffers from Belady's Anomaly (increasing frames can increase page faults)?",
        options: ["Least Recently Used (LRU)", "Optimal Page Replacement (OPT)", "First-In First-Out (FIFO)", "Least Frequently Used (LFU)"],
        correctIndex: 2,
        explanation: "FIFO is susceptible to Belady's Anomaly because it is not a stack algorithm, unlike LRU and Optimal."
      },
      {
        id: "prq-2",
        question: "What hardware support or software structure is commonly used to implement pure O(1) LRU eviction?",
        options: [
          "Doubly Linked List combined with a Hash Map",
          "Binary Search Tree",
          "Single Array scanning from left to right",
          "FIFO Circular Ring without timestamps"
        ],
        correctIndex: 0,
        explanation: "A Doubly Linked List enables O(1) node relocation and removal while a Hash Map allows O(1) key lookups."
      }
    ]
  },
  "file-allocation-quiz": {
    id: "file-allocation-quiz",
    experimentId: "file-allocation-table",
    title: "File Allocation Methods Quiz",
    description: "Check your knowledge of contiguous, linked, and indexed disk file allocation.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "faq-1",
        question: "What is the primary advantage of Indexed File Allocation over Linked Allocation?",
        options: [
          "Direct random access without traversing preceding block pointers",
          "Zero index block memory overhead",
          "Guaranteed contiguous physical sectors",
          "Faster sequential tape reading"
        ],
        correctIndex: 0,
        explanation: "Indexed allocation brings all block pointers into an Index Block (Inode), enabling O(1) direct seeking to any offset of the file."
      }
    ]
  },

  // ==========================================
  // ARTIFICIAL INTELLIGENCE QUIZZES
  // ==========================================
  "astar-search-quiz": {
    id: "astar-search-quiz",
    experimentId: "astar-search-8puzzle",
    title: "A* Heuristic Search Self-Assessment",
    description: "Test your mastery of A* search evaluation functions, admissible heuristics, and Manhattan distance.",
    passingScore: 3,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "asq-1",
        question: "What does an 'Admissible Heuristic' mean in A* search?",
        options: [
          "h(n) must be strictly greater than the true remaining path cost",
          "h(n) must never overestimate the true cost to reach the goal",
          "h(n) must equal 0 for all nodes",
          "h(n) must be calculated using Euclidean geometry only"
        ],
        correctIndex: 1,
        explanation: "An admissible heuristic never overestimates the actual cost to reach the goal state, which guarantees that A* will find an optimal shortest path."
      },
      {
        id: "asq-2",
        question: "What is the formula for the evaluation function f(n) in A* search?",
        options: ["f(n) = g(n) * h(n)", "f(n) = g(n) + h(n)", "f(n) = max(g(n), h(n))", "f(n) = g(n) - h(n)"],
        correctIndex: 1,
        explanation: "f(n) = g(n) + h(n), where g(n) is the exact cost from start to node n, and h(n) is the heuristic estimate from n to the goal."
      }
    ]
  },
  "minimax-quiz": {
    id: "minimax-quiz",
    experimentId: "minimax-alpha-beta-tictactoe",
    title: "Minimax & Alpha-Beta Pruning Quiz",
    description: "Assess your knowledge of adversarial search trees and branch pruning cutoffs.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "mmq-1",
        question: "Under what condition does Alpha-Beta pruning discard (prune) remaining subtrees?",
        options: ["alpha > 100", "beta <= alpha", "alpha == 0", "beta > alpha"],
        correctIndex: 1,
        explanation: "When beta <= alpha, the opponent already has a better or equal alternative elsewhere in the tree, so continuing exploration cannot influence the root decision."
      }
    ]
  },
  "nqueens-quiz": {
    id: "nqueens-quiz",
    experimentId: "nqueens-backtracking-csp",
    title: "N-Queens CSP Quiz",
    description: "Evaluate your understanding of constraint satisfaction, backtracking, and diagonal collision tests.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "nqq-1",
        question: "For a queen at row r and column c, which formula identifies its positive diagonal index?",
        options: ["r * c", "r + c", "r - c", "|r - c|"],
        correctIndex: 1,
        explanation: "All cells on the same positive diagonal (bottom-left to top-right) have an invariant sum: r + c = constant."
      }
    ]
  },
  "expert-systems-quiz": {
    id: "expert-systems-quiz",
    experimentId: "expert-system-forward-chaining",
    title: "Expert Systems & Inference Quiz",
    description: "Test your understanding of rule-based systems, forward chaining, and knowledge bases.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "esq-1",
        question: "Forward Chaining in rule-based expert systems is also known as:",
        options: ["Goal-driven reasoning", "Data-driven reasoning", "Exhaustive depth-first search", "Randomized inference"],
        correctIndex: 1,
        explanation: "Forward Chaining starts with known data/facts and moves forward through rules to reach conclusions, making it data-driven."
      }
    ]
  },
  "water-jug-quiz": {
    id: "water-jug-quiz",
    experimentId: "water-jug-problem-ai",
    title: "Water Jug State Space Quiz",
    description: "Check your knowledge of state space representation and solvable preconditions.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "wjq-1",
        question: "A Water Jug problem with capacities X and Y can measure target Z if and only if:",
        options: ["Z <= max(X, Y) and Z is a multiple of gcd(X, Y)", "Z == X + Y", "Z is an odd number", "X and Y are both prime numbers"],
        correctIndex: 0,
        explanation: "According to Bezout's identity, integer combinations of X and Y can produce any multiple of gcd(X, Y) up to X + Y."
      }
    ]
  },

  // ==========================================
  // BIG DATA ANALYTICS QUIZZES
  // ==========================================
  "hdfs-quiz": {
    id: "hdfs-quiz",
    experimentId: "hadoop-hdfs-cluster-management",
    title: "Hadoop HDFS Architecture Quiz",
    description: "Evaluate your knowledge of HDFS block allocation, NameNode metadata, and rack awareness.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "hdq-1",
        question: "What is the default block size in modern Apache Hadoop HDFS?",
        options: ["4 KB", "64 KB", "128 MB", "10 GB"],
        correctIndex: 2,
        explanation: "HDFS uses a large default block size (128 MB or 256 MB) to minimize NameNode metadata overhead and enable high sequential streaming read throughput."
      },
      {
        id: "hdq-2",
        question: "What is the primary role of the NameNode in HDFS?",
        options: [
          "Storing raw physical file bytes on disk",
          "Maintaining file system namespace, directory hierarchy, and block location mappings in RAM",
          "Executing SQL queries directly",
          "Encrypting network packets between clients"
        ],
        correctIndex: 1,
        explanation: "The NameNode acts as the master metadata coordinator, keeping directory structures and block distribution maps in active RAM."
      }
    ]
  },
  "mapreduce-quiz": {
    id: "mapreduce-quiz",
    experimentId: "mapreduce-wordcount-processing",
    title: "MapReduce Framework Quiz",
    description: "Assess your understanding of Map, Shuffle, Sort, and Reduce distributed processing.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "mrq-1",
        question: "Which phase of MapReduce automatically groups all values with the same key across worker nodes?",
        options: ["Map Phase", "Shuffle and Sort Phase", "Reduce Phase", "Input Splitter Phase"],
        correctIndex: 1,
        explanation: "The Shuffle and Sort phase transfers intermediate key-value pairs from Mappers to Reducers, grouping values by key."
      }
    ]
  },
  "pyspark-quiz": {
    id: "pyspark-quiz",
    experimentId: "pyspark-dataframe-ecommerce",
    title: "PySpark & In-Memory Analytics Quiz",
    description: "Check your knowledge of Spark RDDs, DataFrames, lazy evaluation, and DAG optimization.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "psq-1",
        question: "In Apache Spark, what triggers the actual physical execution of a series of transformations?",
        options: ["Calling a Transformation (e.g. filter, select)", "Calling an Action (e.g. show, count, collect)", "Importing PySpark libraries", "Creating a SparkSession"],
        correctIndex: 1,
        explanation: "Spark uses Lazy Evaluation; transformations build an execution DAG graph, but computation runs only when an Action is invoked."
      }
    ]
  },
  "hive-quiz": {
    id: "hive-quiz",
    experimentId: "hive-data-warehousing-queries",
    title: "Apache Hive Data Warehousing Quiz",
    description: "Test your understanding of HiveQL, partitioned tables, and partition pruning.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "hvq-1",
        question: "Why is Table Partitioning used in Apache Hive?",
        options: [
          "To convert SQL into C code",
          "To enable Partition Pruning so queries read only relevant sub-directories instead of full table scans",
          "To eliminate the need for HDFS storage",
          "To restrict user access permissions"
        ],
        correctIndex: 1,
        explanation: "Partitioning stores data in distinct directory paths, allowing Hive queries with WHERE filters to scan only matching folders."
      }
    ]
  },
  "mongodb-quiz": {
    id: "mongodb-quiz",
    experimentId: "mongodb-bigdata-aggregations",
    title: "MongoDB NoSQL Aggregations Quiz",
    description: "Evaluate your knowledge of document pipelines, sharding, and BSON indexing.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "mgq-1",
        question: "Which aggregation stage in MongoDB filters documents equivalent to the SQL WHERE clause?",
        options: ["$group", "$match", "$project", "$unwind"],
        correctIndex: 1,
        explanation: "$match filters documents so that only those meeting specified query criteria pass to subsequent pipeline stages."
      }
    ]
  },

  // ==========================================
  // CLOUD SERVICE MANAGEMENT QUIZZES
  // ==========================================
  "aws-ec2-quiz": {
    id: "aws-ec2-quiz",
    experimentId: "aws-ec2-vpc-infrastructure",
    title: "AWS EC2 & VPC Infrastructure Quiz",
    description: "Assess your knowledge of virtual compute instances, security groups, and VPC networking.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "ecq-1",
        question: "What is the key characteristic of AWS Security Groups regarding traffic rules?",
        options: [
          "They are stateless (return traffic must be explicitly allowed)",
          "They are stateful (inbound traffic automatically allows return outbound traffic)",
          "They operate at the subnet level only",
          "They cannot block IP addresses"
        ],
        correctIndex: 1,
        explanation: "Security Groups are stateful: if an inbound request is permitted, response traffic is automatically allowed regardless of outbound rules."
      }
    ]
  },
  "aws-s3-quiz": {
    id: "aws-s3-quiz",
    experimentId: "aws-s3-lifecycle-management",
    title: "AWS S3 Cloud Storage Quiz",
    description: "Test your understanding of object storage tiers, bucket versioning, and lifecycle policies.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "s3q-1",
        question: "Which AWS S3 storage class is best suited for long-term compliance data archived for years with rare retrieval?",
        options: ["S3 Standard", "S3 Intelligent-Tiering", "S3 Glacier Deep Archive", "S3 Express One Zone"],
        correctIndex: 2,
        explanation: "S3 Glacier Deep Archive offers the lowest cost object storage tier in AWS designed for cold archives."
      }
    ]
  },
  "docker-quiz": {
    id: "docker-quiz",
    experimentId: "docker-multi-container-compose",
    title: "Docker Containerization Quiz",
    description: "Check your knowledge of container images, multi-container compose, and bridge networks.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "dkq-1",
        question: "What is the primary difference between a Docker Container and a Virtual Machine (VM)?",
        options: [
          "Containers include a full Guest Operating System kernel, while VMs share the host kernel",
          "Containers share the host OS kernel and run as isolated processes, making them significantly lighter and faster than VMs",
          "Containers can only run on Linux, while VMs run on any OS",
          "Containers require dedicated physical hardware"
        ],
        correctIndex: 1,
        explanation: "Containers share the underlying host OS kernel while virtualizing user-space libraries, resulting in sub-second startup times and low RAM overhead."
      }
    ]
  },
  "serverless-quiz": {
    id: "serverless-quiz",
    experimentId: "aws-lambda-serverless-api",
    title: "Serverless Architecture & AWS Lambda Quiz",
    description: "Evaluate your understanding of event-driven execution, cold starts, and API Gateway integration.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "svq-1",
        question: "What causes a 'Cold Start' in serverless computing (AWS Lambda)?",
        options: [
          "Running Lambda in sub-zero temperature datacenters",
          "Initializing a new execution environment container and runtime before executing the handler code",
          "Database connection timeouts",
          "Exceeding maximum memory limits"
        ],
        correctIndex: 1,
        explanation: "When a function hasn't been called recently or requires scaling up, the cloud provider provisions and downloads container layers, creating an initial latency spike known as a cold start."
      }
    ]
  },
  "kubernetes-quiz": {
    id: "kubernetes-quiz",
    experimentId: "kubernetes-pod-cluster-deployment",
    title: "Kubernetes Cluster Orchestration Quiz",
    description: "Test your mastery of Pods, Deployments, ReplicaSets, and Service load-balancing.",
    passingScore: 2,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "kbq-1",
        question: "What is the smallest deployable computing unit in a Kubernetes cluster?",
        options: ["Node", "Pod", "ClusterIP", "Namespace"],
        correctIndex: 1,
        explanation: "A Pod represents a single instance of a running process in Kubernetes and can contain one or more tightly coupled containers."
      }
    ]
  }
};
