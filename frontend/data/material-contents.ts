export interface MaterialContent {
  id: string;
  title: string;
  subject: string;
  provider: string;
  category: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  simulatorUrl?: string;
  simulatorName?: string;
  overview: string;
  learningObjectives: string[];
  keyConcepts: {
    title: string;
    description: string;
    points?: string[];
  }[];
  algorithmSteps?: {
    step: number;
    title: string;
    description: string;
  }[];
  codeSnippets: {
    java?: string;
    python?: string;
    cpp?: string;
    c?: string;
    sql?: string;
  };
  complexityAnalysis: {
    timeComplexity: string;
    spaceComplexity: string;
    bestCase?: string;
    averageCase?: string;
    worstCase?: string;
    notes?: string;
  };
  vivaQuestions: {
    question: string;
    answer: string;
    category?: string;
  }[];
  realWorldApplications: string[];
  practiceProblems: {
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    description: string;
  }[];
}

export const MATERIAL_CONTENTS: Record<string, MaterialContent> = {
  // ==========================================
  // DATA STRUCTURES (JAVA / C++ / PYTHON)
  // ==========================================
  "dsa-complete-guide": {
    id: "dsa-complete-guide",
    title: "Data Structures & Algorithms Complete Guide",
    subject: "Data Structures (Java)",
    provider: "Academic Curriculum",
    category: "Data Structures",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/data-structures",
    simulatorName: "DSA Simulator Suite",
    overview:
      "A comprehensive foundational study of linear and non-linear data structures. Covers contiguous and linked memory allocation, stack/queue operations, balanced trees, and graph representations with real-time complexity tradeoffs.",
    learningObjectives: [
      "Understand contiguous vs dynamic memory allocation models",
      "Implement Singly, Doubly, and Circular Linked Lists with edge cases",
      "Apply LIFO (Stack) and FIFO (Queue) models in real-world system design",
      "Master Binary Search Trees (BST) and Self-Balancing AVL Rotations",
      "Analyze asymptotic time and space complexities using Big-O notation"
    ],
    keyConcepts: [
      {
        title: "1. Linear vs Non-Linear Structures",
        description:
          "Linear structures arrange elements sequentially (Arrays, Linked Lists, Stacks, Queues), where each element has unique predecessor and successor. Non-linear structures (Trees, Graphs) represent hierarchical or networked relationships.",
        points: [
          "Arrays: O(1) random access via index calculation [Base_Addr + (index * size)], but fixed size and O(N) insertion/deletion.",
          "Linked Lists: Dynamic resizing and O(1) pointer-based insertion/deletion at known nodes, but O(N) sequential search and pointer overhead.",
          "Stacks (LIFO): Backtracking, function call stacks, syntax parsing, and expression evaluation.",
          "Queues (FIFO): Task scheduling, CPU/Printer spooling, and Breadth-First Search (BFS)."
        ]
      },
      {
        title: "2. Tree Structures & Self-Balancing Mechanisms",
        description:
          "A Binary Search Tree (BST) maintains the invariant: Left Subtree < Root < Right Subtree. In the worst case (skewed insertion), search degrades to O(N). AVL Trees enforce a Balance Factor: BF = Height(Left) - Height(Right) ∈ {-1, 0, 1}.",
        points: [
          "Left-Left (LL) Heavy: Fixed via single Right Rotation.",
          "Right-Right (RR) Heavy: Fixed via single Left Rotation.",
          "Left-Right (LR) Heavy: Fixed via Double Rotation (Left on left child, then Right on root).",
          "Right-Left (RL) Heavy: Fixed via Double Rotation (Right on right child, then Left on root)."
        ]
      },
      {
        title: "3. Graph Representations & Traversal",
        description:
          "Graphs G = (V, E) can be represented using Adjacency Matrix (O(V²) space, O(1) edge check) or Adjacency List (O(V + E) space, ideal for sparse graphs).",
        points: [
          "Breadth-First Search (BFS): Uses a Queue. Explores neighbors level by level. Computes shortest path in unweighted graphs.",
          "Depth-First Search (DFS): Uses a Stack / Recursion. Explores deeply along paths. Used for cycle detection, topological sorting, and connected components."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Singly Linked List Insertion (At Head)",
        description: "Allocate new node -> Set newNode.next = head -> Update head = newNode. Time: O(1)."
      },
      {
        step: 2,
        title: "Stack Evaluation of Postfix Expression",
        description: "Scan tokens left to right -> If operand, push to stack -> If operator, pop two operands, apply operator, push result -> Final value on stack is output."
      },
      {
        step: 3,
        title: "AVL Tree Rebalancing on Insertion",
        description: "Perform recursive BST insert -> Update node heights -> Compute balance factor -> If |BF| > 1, apply rotation (LL, RR, LR, RL) -> Return rebalanced root."
      }
    ],
    codeSnippets: {
      java: `// Singly Linked List & Stack Implementation in Java
public class DataStructuresDemo {
    // 1. Linked List Node
    static class Node {
        int data;
        Node next;
        Node(int d) { this.data = d; this.next = null; }
    }

    static class SinglyLinkedList {
        Node head;

        public void insertAtHead(int val) {
            Node newNode = new Node(val);
            newNode.next = head;
            head = newNode;
        }

        public void deleteValue(int val) {
            if (head == null) return;
            if (head.data == val) { head = head.next; return; }
            Node curr = head;
            while (curr.next != null && curr.next.data != val) {
                curr = curr.next;
            }
            if (curr.next != null) curr.next = curr.next.next;
        }
    }

    // 2. Array-backed Stack
    static class CustomStack {
        private int[] arr;
        private int top;
        private int capacity;

        public CustomStack(int size) {
            arr = new int[size];
            capacity = size;
            top = -1;
        }

        public void push(int x) {
            if (top == capacity - 1) throw new RuntimeException("Stack Overflow");
            arr[++top] = x;
        }

        public int pop() {
            if (top == -1) throw new RuntimeException("Stack Underflow");
            return arr[top--];
        }

        public int peek() {
            if (top == -1) throw new RuntimeException("Stack is Empty");
            return arr[top];
        }

        public boolean isEmpty() { return top == -1; }
    }
}`,
      python: `# Data Structures Implementation in Python 3
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def insert_at_head(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def traverse(self):
        elements = []
        curr = self.head
        while curr:
            elements.append(curr.data)
            curr = curr.next
        return elements

class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        raise IndexError("pop from empty stack")

    def peek(self):
        return self.items[-1] if not self.is_empty() else None

    def is_empty(self):
        return len(self.items) == 0`,
      cpp: `// DSA Implementation in C++ (C++17)
#include <iostream>
#include <vector>
#include <stdexcept>

template <typename T>
class Stack {
private:
    std::vector<T> container;
public:
    void push(const T& val) { container.push_back(val); }
    void pop() {
        if (container.empty()) throw std::underflow_error("Stack is empty");
        container.pop_back();
    }
    T top() const {
        if (container.empty()) throw std::underflow_error("Stack is empty");
        return container.back();
    }
    bool empty() const { return container.empty(); }
    size_t size() const { return container.size(); }
};`
    },
    complexityAnalysis: {
      timeComplexity: "Array Access: O(1) | SLL Search: O(N) | BST Search: O(log N) average, O(N) worst | AVL: O(log N) strict",
      spaceComplexity: "O(N) for linear storage and pointer overhead",
      bestCase: "O(1) for direct head/tail operations and array indexing",
      worstCase: "O(N) for linear scans and un-balanced tree traversals",
      notes: "AVL tree rotations maintain logarithmic height O(log N) guaranteed for all insertions, deletions, and lookups."
    },
    vivaQuestions: [
      {
        question: "What is the key difference between an Array and a Linked List in memory layout?",
        answer:
          "Arrays allocate contiguous memory blocks allowing constant time O(1) random access via arithmetic index offsets. Linked Lists allocate disjoint nodes on the heap connected by pointer references, allowing O(1) insertion/deletion without shifting elements, but requiring O(N) sequential access."
      },
      {
        question: "How does an AVL Tree guarantee O(log N) lookup time whereas a regular BST can degrade to O(N)?",
        answer:
          "An AVL tree enforces a balance factor condition for every node where |Height(Left) - Height(Right)| <= 1. If an insertion violates this invariant, tree rotations (LL, RR, LR, RL) rebalance the subtrees, ensuring total height never exceeds 1.44 log₂(N)."
      },
      {
        question: "What are the four primary applications of Stack data structures in computer science?",
        answer:
          "1. Function call stack execution and recursion management in compilers. 2. Expression parsing (Infix to Postfix/Prefix conversion) and parenthesis balancing. 3. Undo/Redo mechanisms in software editors. 4. Depth-First Search (DFS) graph exploration."
      },
      {
        question: "Explain the difference between Array and Circular Queue implementation for handling queue full conditions.",
        answer:
          "In a standard linear array queue, dequeuing elements causes empty space at the front that cannot be reused without shifting. A Circular Queue uses modulo arithmetic (rear = (rear + 1) % size) to wrap around to index 0, maximizing memory utilization without element shifting."
      }
    ],
    realWorldApplications: [
      "Operating System Virtual Memory Page Replacement Algorithms (LRU cache using Doubly Linked List + Hash Map)",
      "Compiler Syntax Parsing & Call-Stack Execution (Stack LIFO frames)",
      "Database B-Tree Indexing for fast disk block queries in PostgreSQL and MySQL",
      "Network Packet Routing and Shortest Path calculations using Dijkstra and Priority Queues"
    ],
    practiceProblems: [
      {
        title: "Reverse a Singly Linked List in O(N) time and O(1) auxiliary space",
        difficulty: "Easy",
        description: "Iteratively reverse node pointers using three tracking pointers (prev, curr, next)."
      },
      {
        title: "Implement Min-Stack with O(1) retrieve minimum element",
        difficulty: "Medium",
        description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time."
      },
      {
        title: "Validate Binary Search Tree (BST Invariant)",
        difficulty: "Medium",
        description: "Given the root of a binary tree, determine if it is a valid binary search tree using range bounds (-∞, +∞)."
      }
    ]
  },

  // ==========================================
  // OPERATING SYSTEMS (CPU SCHEDULING & SYNCHRONIZATION)
  // ==========================================
  "os-handbook": {
    id: "os-handbook",
    title: "Operating Systems Handbook — CPU Scheduling & Semaphores",
    subject: "Operating Systems",
    provider: "Academic Curriculum",
    category: "Operating Systems",
    readTime: "22 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/operating-systems",
    simulatorName: "OS Scheduling & Deadlock Studio",
    overview:
      "Core operating systems principles covering CPU scheduling algorithms (FCFS, SJF, Round Robin), process synchronization primitives (Mutex, Semaphores), Banker's Deadlock avoidance, and virtual memory paging.",
    learningObjectives: [
      "Calculate Waiting Time, Turnaround Time, and Response Time across scheduling algorithms",
      "Understand Race Conditions and solve Critical Section problems using Semaphores",
      "Implement Banker's Safety Algorithm to detect and prevent deadlocks",
      "Analyze Page Replacement policies (FIFO, LRU, Optimal) and page fault ratios"
    ],
    keyConcepts: [
      {
        title: "1. CPU Scheduling Metrics & Paradigms",
        description:
          "Process scheduling optimizes CPU utilization. Preemptive algorithms interrupt executing processes when higher priority arrives, while Non-Preemptive algorithms allow processes to run until burst completion or I/O block.",
        points: [
          "Turnaround Time (TAT) = Completion Time - Arrival Time",
          "Waiting Time (WT) = Turnaround Time - Burst Time",
          "FCFS (First Come First Serve): Simple, non-preemptive, suffers from Convoy Effect (short jobs stuck behind long jobs).",
          "SJF / SRTF (Shortest Remaining Time First): Minimizes average waiting time; requires burst prediction; can cause starvation.",
          "Round Robin (RR): Preemptive with fixed Time Quantum (q). Prevents starvation; optimal for time-sharing systems."
        ]
      },
      {
        title: "2. Process Synchronization & Semaphores",
        description:
          "When multiple processes access shared memory concurrently, race conditions occur. Dijkstra introduced Semaphores as integer synchronization primitives.",
        points: [
          "Counting Semaphore: Value initialized to N (number of available resources).",
          "Binary Semaphore (Mutex): Value is 0 or 1. Guarantees Mutual Exclusion.",
          "wait(S) / P(S): Decrements S. If S <= 0, process blocks.",
          "signal(S) / V(S): Increments S. Wakes up a waiting process."
        ]
      },
      {
        title: "3. Deadlocks & Banker's Algorithm",
        description:
          "Deadlock occurs when processes hold resources while waiting for others held by blocked processes. Four Coffman Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.",
        points: [
          "Need Matrix = Max Demand Matrix - Allocation Matrix",
          "Safety Algorithm checks if available resources satisfy Need[i] <= Available. If yes, process finishes and releases resources: Available += Allocation[i]."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Calculate Round Robin Timeline",
        description: "Maintain Ready Queue. Execute process for min(remaining_burst, time_quantum). If unfinished, re-enqueue to back of queue. Advance clock."
      },
      {
        step: 2,
        title: "Banker's Safety Check",
        description: "Initialize Work = Available, Finish = [False...]. Find process i where Finish[i]==False and Need[i] <= Work. Update Work += Allocation[i], Finish[i]=True. Repeat until all finish or deadlock detected."
      }
    ],
    codeSnippets: {
      c: `// CPU Scheduling (Round Robin) & Producer-Consumer in C
#include <stdio.h>
#include <stdbool.h>

// Banker's Algorithm Safety Check
#define P 5
#define R 3

bool checkSafety(int processes[], int avail[], int max[][R], int allot[][R]) {
    int need[P][R];
    for (int i = 0; i < P; i++)
        for (int j = 0; j < R; j++)
            need[i][j] = max[i][j] - allot[i][j];

    bool finish[P] = {0};
    int safeSeq[P];
    int work[R];
    for (int i = 0; i < R; i++) work[i] = avail[i];

    int count = 0;
    while (count < P) {
        bool found = false;
        for (int p = 0; p < P; p++) {
            if (!finish[p]) {
                int j;
                for (j = 0; j < R; j++)
                    if (need[p][j] > work[j]) break;

                if (j == R) {
                    for (int k = 0; k < R; k++) work[k] += allot[p][k];
                    safeSeq[count++] = p;
                    finish[p] = true;
                    found = true;
                }
            }
        }
        if (!found) return false; // System is in unsafe state!
    }
    return true; // System is in safe state
}`,
      python: `# Banker's Safety Algorithm in Python
def is_safe_state(processes, available, max_matrix, allocation):
    num_p = len(processes)
    num_r = len(available)
    need = [[max_matrix[i][j] - allocation[i][j] for j in range(num_r)] for i in range(num_p)]
    
    work = list(available)
    finish = [False] * num_p
    safe_sequence = []
    
    while len(safe_sequence) < num_p:
        allocated_in_this_pass = False
        for p in range(num_p):
            if not finish[p] and all(need[p][r] <= work[r] for r in range(num_r)):
                for r in range(num_r):
                    work[r] += allocation[p][r]
                finish[p] = True
                safe_sequence.append(p)
                allocated_in_this_pass = True
                break
        if not allocated_in_this_pass:
            return False, [] # Deadlock detected
    return True, safe_sequence`
    },
    complexityAnalysis: {
      timeComplexity: "Banker's Safety: O(P² * R) where P = processes, R = resources | FCFS/SJF: O(N log N)",
      spaceComplexity: "O(P * R) matrices for Max, Allocation, Need vectors",
      bestCase: "O(P * R) when processes resolve immediately in order",
      worstCase: "O(P² * R) for full scanning across process permutations",
      notes: "Selecting an optimal time quantum in Round Robin balances context switch overhead (low quantum) with interactive responsiveness (high quantum)."
    },
    vivaQuestions: [
      {
        question: "What is the Convoy Effect in FCFS CPU Scheduling, and how is it resolved?",
        answer:
          "The Convoy Effect occurs in FCFS when a CPU-bound process with a huge burst time holds the CPU, forcing numerous short I/O-bound processes to wait indefinitely, degrading overall throughput. It is resolved by preemptive scheduling such as Round Robin (RR) or Shortest Remaining Time First (SRTF)."
      },
      {
        question: "What are the four necessary Coffman conditions for a Deadlock to occur?",
        answer:
          "1. Mutual Exclusion (at least one non-shareable resource). 2. Hold and Wait (process holding resources while requesting more). 3. No Preemption (resources cannot be forcibly taken). 4. Circular Wait (a closed chain of processes each waiting for a resource held by the next)."
      },
      {
        question: "Explain the difference between a Binary Semaphore and a Mutex.",
        answer:
          "A Mutex is a locking mechanism with ownership: only the thread that acquired the lock can release it. A Binary Semaphore is a signaling mechanism without ownership: any thread can signal (V) and unlock a waiting thread."
      },
      {
        question: "What is Belady's Anomaly in Page Replacement?",
        answer:
          "Belady's Anomaly is a phenomenon in FIFO page replacement where increasing the number of page frames results in an increased number of page faults for certain reference strings."
      }
    ],
    realWorldApplications: [
      "Linux Completely Fair Scheduler (CFS) using Red-Black Trees for O(log N) task picking",
      "Database Transaction Lock Managers utilizing 2-Phase Locking to prevent lost updates",
      "Multi-core CPU Cache Coherency protocols (MESI/MOESI)",
      "High-concurrency web servers (Nginx/Node.js) worker process task distribution"
    ],
    practiceProblems: [
      {
        title: "Compute Average Waiting Time for Round Robin with q=4ms",
        difficulty: "Medium",
        description: "Given 4 processes with arrival times [0, 1, 2, 4] and bursts [5, 4, 2, 1], construct the Gantt chart."
      },
      {
        title: "Dining Philosophers Deadlock Solution using Resource Hierarchy",
        difficulty: "Hard",
        description: "Enforce strict asymmetric chopstick pickup order to eliminate the circular wait condition."
      }
    ]
  },

  // ==========================================
  // DATABASE MANAGEMENT SYSTEMS (SQL & NORMALIZATION)
  // ==========================================
  "dbms-sql-guide": {
    id: "dbms-sql-guide",
    title: "DBMS Complete Guide — SQL, ER Models, Normalization & ACID",
    subject: "Database Management Systems",
    provider: "Academic Curriculum",
    category: "Databases",
    readTime: "24 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/dbms-lab",
    simulatorName: "DBMS SQL Console & Query Studio",
    overview:
      "A complete guide to relational database architecture, relational algebra, advanced SQL queries (Joins, Aggregations, Window Functions), schema Normalization (1NF to BCNF), and ACID transaction management.",
    learningObjectives: [
      "Formulate complex SQL queries using INNER, LEFT, RIGHT, FULL OUTER, and SELF JOINs",
      "Apply Normalization techniques (1NF, 2NF, 3NF, BCNF) to eliminate anomalies",
      "Understand ACID properties (Atomicity, Consistency, Isolation, Durability) and Transaction Isolation levels",
      "Design Entity-Relationship (ER) schemas and map them to physical relational tables"
    ],
    keyConcepts: [
      {
        title: "1. SQL Relational Joins & Set Operations",
        description:
          "Relational joins combine columns from one or more tables based on common keys. Set operations (UNION, INTERSECT, EXCEPT) combine rows.",
        points: [
          "INNER JOIN: Returns rows when there is a match in both tables.",
          "LEFT (OUTER) JOIN: Returns all rows from the left table, and matched rows from right (NULL if no match).",
          "RIGHT (OUTER) JOIN: Returns all rows from right table, and matched rows from left.",
          "FULL OUTER JOIN: Returns all rows when there is a match in either table.",
          "CROSS JOIN: Cartesian product of both tables (N * M rows)."
        ]
      },
      {
        title: "2. Database Normalization (1NF to BCNF)",
        description:
          "Normalization structures relational tables to eliminate data redundancy, update anomalies, insertion anomalies, and deletion anomalies.",
        points: [
          "1NF (First Normal Form): All column values must be atomic (no multi-valued or composite attributes); unique primary key.",
          "2NF (Second Normal Form): Must be in 1NF + No Partial Dependency (every non-prime attribute must depend on the whole candidate key).",
          "3NF (Third Normal Form): Must be in 2NF + No Transitive Dependency (if X -> Y and Y -> Z, then X -> Z must be decoupled into separate tables).",
          "BCNF (Boyce-Codd Normal Form): Strict 3NF where for every functional dependency X -> Y, X must be a super key."
        ]
      },
      {
        title: "3. ACID Properties & Concurrency Control",
        description:
          "A transaction is a logical unit of database processing that must satisfy ACID criteria to ensure database integrity.",
        points: [
          "Atomicity: All-or-nothing execution (managed by Write-Ahead Logging & Rollback).",
          "Consistency: Preserves all integrity constraints across commits.",
          "Isolation: Concurrent transactions execute without mutual interference (Read Uncommitted, Read Committed, Repeatable Read, Serializable).",
          "Durability: Committed data is permanently saved on non-volatile disk even during system crash."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Decomposition into 3NF",
        description: "Find canonical cover of functional dependencies Fc -> For each FD X -> A in Fc, create relation R_i(X, A) -> If no relation contains a candidate key of R, create relation with candidate key -> Eliminate redundant subsets."
      },
      {
        step: 2,
        title: "Query Execution Plan Optimization",
        description: "SQL Parser generates abstract syntax tree -> Query Optimizer applies relational algebra equivalences (push selections down before joins) -> Evaluates B-Tree index scans vs sequential scans."
      }
    ],
    codeSnippets: {
      sql: `-- Relational Schema, Complex Joins, and Window Functions
CREATE TABLE Departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);

CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    dept_id INT REFERENCES Departments(dept_id),
    hire_date DATE NOT NULL
);

-- Advanced Query: Top 2 earners per department using Window Functions (DENSE_RANK)
WITH RankedEmployees AS (
    SELECT 
        e.emp_id,
        e.emp_name,
        e.salary,
        d.dept_name,
        DENSE_RANK() OVER(PARTITION BY e.dept_id ORDER BY e.salary DESC) AS salary_rank
    FROM Employees e
    INNER JOIN Departments d ON e.dept_id = d.dept_id
)
SELECT emp_id, emp_name, dept_name, salary
FROM RankedEmployees
WHERE salary_rank <= 2;

-- Transaction with ACID Commit / Rollback
BEGIN TRANSACTION;
    UPDATE Accounts SET balance = balance - 500.00 WHERE account_id = 101;
    UPDATE Accounts SET balance = balance + 500.00 WHERE account_id = 202;
    INSERT INTO AuditLogs (log_text, timestamp) VALUES ('Transferred $500 from 101 to 202', NOW());
COMMIT;`
    },
    complexityAnalysis: {
      timeComplexity: "B-Tree Index Lookup: O(log N) | Full Table Scan: O(N) | Hash Join: O(N + M) | Nested Loop Join: O(N * M)",
      spaceComplexity: "O(N) data pages + O(N) B-Tree index pages on disk",
      bestCase: "O(1) with unique Hash Index or Clustered Primary Key lookup",
      worstCase: "O(N * M) un-indexed Cartesian product joins",
      notes: "Clustered index physically sorts table rows on disk; secondary B-Tree indexes store row pointer IDs."
    },
    vivaQuestions: [
      {
        question: "What is the key difference between 3NF and BCNF?",
        answer:
          "In 3NF, for every functional dependency X -> A, either X is a super key OR A is a prime attribute (part of some candidate key). In BCNF, this relaxation is removed: for EVERY dependency X -> A, X MUST strictly be a super key. Thus, BCNF eliminates all dependencies where a prime attribute depends on a non-super key."
      },
      {
        question: "What are the four SQL Transaction Isolation levels and the read phenomena they prevent?",
        answer:
          "1. Read Uncommitted: Allows dirty reads, non-repeatable reads, phantom reads. 2. Read Committed: Prevents dirty reads. 3. Repeatable Read: Prevents dirty reads and non-repeatable reads. 4. Serializable: Strict isolation; prevents all anomalies including phantom reads using Range Locks / Snapshot Isolation."
      },
      {
        question: "Explain the difference between DELETE, TRUNCATE, and DROP commands in SQL.",
        answer:
          "DELETE is a DML command that removes specific rows matching a WHERE clause, logs each row deletion, and can be rolled back. TRUNCATE is a DDL command that deallocates all data pages in one operation, resets identity counters, and is much faster. DROP is a DDL command that deletes both table data and the table schema definition completely from the database catalog."
      }
    ],
    realWorldApplications: [
      "Banking Core Transaction Processing with ACID strict serializability",
      "E-Commerce Inventory & Order Tracking with Optimistic Concurrency Control",
      "Analytics Warehousing with B-Tree and Bitmap indexing for sub-second aggregations",
      "Multi-tenant SaaS database partitioning and horizontal sharding"
    ],
    practiceProblems: [
      {
        title: "Write a SQL Query to Find Employees Earning More than Their Manager",
        difficulty: "Easy",
        description: "Perform a SELF JOIN on the Employee table comparing employee salary with manager salary."
      },
      {
        title: "Decompose a Relation into BCNF",
        difficulty: "Hard",
        description: "Given R(A, B, C, D, E) with FDs {AB -> C, C -> D, D -> B}, verify BCNF compliance and decompose if violated."
      }
    ]
  },

  // ==========================================
  // ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
  // ==========================================
  "ai-ml-guide": {
    id: "ai-ml-guide",
    title: "Artificial Intelligence & Machine Learning Comprehensive Master Guide",
    subject: "Artificial Intelligence",
    provider: "Academic Curriculum",
    category: "AI & ML",
    readTime: "28 mins",
    difficulty: "Advanced",
    simulatorUrl: "/labs/ai-machine-learning",
    simulatorName: "AI & Machine Learning Studio",
    overview:
      "A complete guide spanning AI search algorithms (A*, Minimax with Alpha-Beta, Backtracking), Machine Learning paradigms (Supervised, Unsupervised), Decision Trees (ID3), Artificial Neural Networks (Backpropagation), and Vectorized Computing with NumPy & Scikit-Learn.",
    learningObjectives: [
      "Master heuristic search using A* f(n) = g(n) + h(n) with admissible and consistent heuristics",
      "Apply Minimax and Alpha-Beta pruning for zero-sum adversarial game trees",
      "Calculate Information Gain and Entropy for ID3 Decision Tree construction",
      "Derive gradient descent weight updates in Artificial Neural Network Backpropagation"
    ],
    keyConcepts: [
      {
        title: "1. A* Heuristic Search & Admissibility",
        description:
          "A* search evaluates nodes using evaluation function f(n) = g(n) + h(n), where g(n) is the exact cost from start to node n, and h(n) is the estimated cost from n to goal.",
        points: [
          "Admissibility: A heuristic h(n) is admissible if it NEVER overestimates the true cost to reach the goal: 0 <= h(n) <= h*(n).",
          "Consistency (Monotonicity): For every node n and successor n' generated by action a: h(n) <= c(n, a, n') + h(n').",
          "If h(n) is admissible, Tree-Search A* is guaranteed to return the optimal shortest path."
        ]
      },
      {
        title: "2. Minimax Algorithm & Alpha-Beta Pruning",
        description:
          "Used in two-player zero-sum games (Chess, Tic-Tac-Toe). Maximizer tries to maximize score; Minimizer tries to minimize it.",
        points: [
          "Alpha (α): The best (highest) value the Maximizer can guarantee so far (initialized to -∞).",
          "Beta (β): The best (lowest) value the Minimizer can guarantee so far (initialized to +∞).",
          "Pruning Condition: If α >= β at any node, prune the remaining subtrees since the opponent will never allow that path."
        ]
      },
      {
        title: "3. Machine Learning & Neural Network Backpropagation",
        description:
          "Supervised learning trains models on labeled datasets (X, y) by minimizing a loss function (e.g. Mean Squared Error or Binary Cross-Entropy) using Gradient Descent.",
        points: [
          "Decision Tree (ID3): Uses Shannon Entropy H(S) = -∑ p_i log₂(p_i) and Information Gain IG(S, A) = H(S) - ∑ (|S_v|/|S|) * H(S_v) to pick the best splitting attribute.",
          "ANN Backpropagation: Uses the Chain Rule of calculus to compute ∂Loss/∂W across all layers and updates weights: W_new = W_old - η * (∂Loss/∂W)."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "A* Search Execution",
        description: "Insert start node into Open List (Priority Queue by f) -> Pop lowest f node -> If goal, reconstruct path -> Else expand neighbors, calculate f(neighbor), insert/update Open List -> Move curr to Closed List."
      },
      {
        step: 2,
        title: "Backpropagation Weight Update",
        description: "Forward pass: compute activations a = σ(W * x + b) -> Calculate loss E -> Backward pass: compute output error δ = (y_pred - y_true) * σ'(z) -> Propagate error δ to hidden layers -> Update W -= learning_rate * (δ * a_prev^T)."
      }
    ],
    codeSnippets: {
      python: `# A* Search Algorithm & Scikit-Learn Pipeline in Python
import heapq
import numpy as np

# 1. A* Search on Grid
def a_star_search(grid, start, goal):
    rows, cols = len(grid), len(grid[0])
    open_heap = []
    # Heap stores tuple: (f_score, g_score, current_pos, path)
    heapq.heappush(open_heap, (0 + abs(start[0]-goal[0]) + abs(start[1]-goal[1]), 0, start, [start]))
    visited = set()

    while open_heap:
        f, g, curr, path = heapq.heappop(open_heap)
        if curr == goal:
            return path, g
        if curr in visited:
            continue
        visited.add(curr)

        r, c = curr
        for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 0:
                if (nr, nc) not in visited:
                    new_g = g + 1
                    h = abs(nr - goal[0]) + abs(nc - goal[1]) # Manhattan heuristic
                    heapq.heappush(open_heap, (new_g + h, new_g, (nr, nc), path + [(nr, nc)]))
    return None, float('inf')

# 2. Decision Tree Classifier with Scikit-Learn
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

X_train = np.array([[2.5, 1.5], [1.0, 0.5], [3.0, 3.5], [1.5, 2.0]])
y_train = np.array([1, 0, 1, 0])
clf = DecisionTreeClassifier(criterion='entropy', max_depth=3)
clf.fit(X_train, y_train)`
    },
    complexityAnalysis: {
      timeComplexity: "A* Search: O(b^d) where b = branching factor, d = solution depth | Minimax: O(b^m) reduced to O(b^(m/2)) with optimal Alpha-Beta pruning",
      spaceComplexity: "A* Search: O(b^d) stores all generated nodes in Open/Closed lists",
      bestCase: "O(d) for A* with a perfect heuristic h(n) = h*(n)",
      worstCase: "O(b^d) with uninformed or zero heuristic (degrades to Dijkstra)",
      notes: "Alpha-Beta pruning can double the search horizon in adversarial game engines without increasing computation time."
    },
    vivaQuestions: [
      {
        question: "What makes a heuristic admissible in A* search, and what happens if it is not?",
        answer:
          "A heuristic h(n) is admissible if it never overestimates the actual cost from node n to the goal (i.e. h(n) <= h*(n)). If a heuristic is not admissible (it overestimates), A* search is no longer guaranteed to find the optimal (lowest cost) path, and may return a suboptimal solution."
      },
      {
        question: "Explain the difference between Manhattan Distance and Euclidean Distance heuristics.",
        answer:
          "Manhattan Distance (|x1 - x2| + |y1 - y2|) is admissible for grid spaces where movement is restricted to 4 orthogonal directions (Up, Down, Left, Right). Euclidean Distance (√[(x1 - x2)² + (y1 - y2)²]) is admissible for continuous spaces or grids supporting 8-directional diagonal movement."
      },
      {
        question: "What is the vanishing gradient problem in deep neural networks, and how does ReLU solve it?",
        answer:
          "With Sigmoid or Tanh activation functions, the derivative values are strictly < 0.25. When backpropagating through many layers via the chain rule, multiplying these fractions causes gradients to exponentially diminish toward zero, stopping earlier layers from learning. The ReLU (Rectified Linear Unit) function f(x) = max(0, x) has a constant derivative of 1 for all positive inputs, preventing gradient vanishing."
      }
    ],
    realWorldApplications: [
      "GPS Navigation & Google Maps optimal route planning using Bidirectional A* Search",
      "Autonomous Robotics Pathfinding and Obstacle Avoidance",
      "AI Game Engines (Chess Stockfish, AlphaGo) using Minimax + Neural Network evaluation",
      "Automated Medical Diagnosis and Fraud Detection using Ensemble Decision Trees"
    ],
    practiceProblems: [
      {
        title: "Solve the 8-Puzzle Problem using A* Search",
        difficulty: "Medium",
        description: "Implement Manhattan distance sum of misplaced tiles heuristic to reach goal state."
      },
      {
        title: "Implement 2-Layer Neural Network from Scratch in NumPy",
        difficulty: "Hard",
        description: "Derive forward propagation and backpropagation equations for XOR binary classification."
      }
    ]
  },

  // ==========================================
  // COMPUTER NETWORKS (OSI, TCP/IP, SOCKETS)
  // ==========================================
  "networks-guide": {
    id: "networks-guide",
    title: "Computer Networks & Sockets Architecture Guide",
    subject: "Computer Networks",
    provider: "Academic Curriculum",
    category: "Networks",
    readTime: "20 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/computer-networks",
    simulatorName: "Networks Packet & Socket Studio",
    overview:
      "Deep dive into the 7-Layer OSI Reference Model, TCP/IP protocol suite, CRC error checking, Sliding Window protocols, Dijkstra shortest path routing, and BSD Socket Programming in C.",
    learningObjectives: [
      "Distinguish responsibilities across the 7 OSI layers and 5 TCP/IP layers",
      "Compute Cyclic Redundancy Check (CRC-32) bit sequences for reliable packet transmission",
      "Analyze TCP 3-Way Handshake (SYN, SYN-ACK, ACK) and 4-Way Connection Teardown",
      "Build client-server TCP/UDP sockets using POSIX C socket APIs"
    ],
    keyConcepts: [
      {
        title: "1. OSI 7-Layer vs TCP/IP Architecture",
        description:
          "The OSI model provides a conceptual framework for network communication, while TCP/IP is the practical architecture of the modern Internet.",
        points: [
          "Application Layer (Layer 7): HTTP/HTTPS, DNS, SMTP, FTP, SSH.",
          "Transport Layer (Layer 4): TCP (connection-oriented, reliable, flow/congestion control), UDP (connectionless, low latency, streaming).",
          "Network Layer (Layer 3): IP addressing (IPv4/IPv6), ICMP, Routing (OSPF, BGP, RIP).",
          "Data Link Layer (Layer 2): MAC addressing, framing, error detection (CRC), CSMA/CD."
        ]
      },
      {
        title: "2. TCP 3-Way Handshake & Reliable Transport",
        description:
          "TCP establishes reliable bidirectional streams through sequence numbers and acknowledgments.",
        points: [
          "Step 1: Client sends SYN (seq = x).",
          "Step 2: Server responds with SYN-ACK (seq = y, ack = x + 1).",
          "Step 3: Client replies with ACK (seq = x + 1, ack = y + 1). Connection ESTABLISHED.",
          "Congestion Control: Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery."
        ]
      },
      {
        title: "3. Routing Algorithms & Error Detection",
        description:
          "Routing algorithms calculate the shortest cost paths across network topologies.",
        points: [
          "Link State Routing (Dijkstra): Every router has global topology map and computes shortest paths in O(V²).",
          "Distance Vector Routing (Bellman-Ford): Routers exchange cost vectors with direct neighbors; prone to Count-to-Infinity problem.",
          "Cyclic Redundancy Check (CRC): Polynomial binary division using XOR operations to detect bit corruptions."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "CRC Error Check Generation",
        description: "Append (k-1) zeros to message polynomial -> Perform modulo-2 binary division by generator polynomial -> The remainder is the CRC checksum -> Transmit Message + CRC."
      },
      {
        step: 2,
        title: "TCP Socket Server Lifecycle",
        description: "socket() -> bind(IP, PORT) -> listen(BACKLOG) -> accept() [blocks for client] -> read()/write() -> close()."
      }
    ],
    codeSnippets: {
      c: `// TCP Echo Server in C (POSIX Sockets)
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8080
#define BUFFER_SIZE 1024

int main() {
    int server_fd, new_socket;
    struct sockaddr_in address;
    int addrlen = sizeof(address);
    char buffer[BUFFER_SIZE] = {0};

    // 1. Create socket
    server_fd = socket(AF_INET, SOCK_STREAM, 0);

    // 2. Bind to IP and Port
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);
    bind(server_fd, (struct sockaddr*)&address, sizeof(address));

    // 3. Listen for connections
    listen(server_fd, 3);
    printf("Server listening on port %d...\\n", PORT);

    // 4. Accept client connection
    new_socket = accept(server_fd, (struct sockaddr*)&address, (socklen_t*)&addrlen);
    read(new_socket, buffer, BUFFER_SIZE);
    printf("Client: %s\\n", buffer);

    char *response = "HTTP/1.1 200 OK\\r\\nContent-Type: text/plain\\r\\n\\r\\nHello from Virtual Lab Server!";
    send(new_socket, response, strlen(response), 0);
    close(new_socket);
    close(server_fd);
    return 0;
}`
    },
    complexityAnalysis: {
      timeComplexity: "Dijkstra Routing: O(V²) or O((V + E) log V) with Min-Heap | Bellman-Ford: O(V * E)",
      spaceComplexity: "O(V + E) for network topology graph",
      bestCase: "O(1) direct subnet delivery via ARP table cache lookup",
      worstCase: "O(V * E) with negative weight cycle checks in Bellman-Ford",
      notes: "Sliding window protocol efficiency = N / (1 + 2a) where a = Propagation Delay / Transmission Delay."
    },
    vivaQuestions: [
      {
        question: "What is the difference between Flow Control and Congestion Control in TCP?",
        answer:
          "Flow Control prevents a fast sender from overwhelming a slow RECEIVER (managed via the Receiver Window 'rwnd' advertised in TCP headers). Congestion Control prevents senders from overwhelming the intermediate NETWORK infrastructure and routers (managed via Congestion Window 'cwnd' using Slow Start and AIMD algorithms)."
      },
      {
        question: "Explain the purpose of the 4-Way Handshake in TCP connection teardown.",
        answer:
          "Because TCP connections are full-duplex (data can travel in both directions independently), each direction must be terminated individually: 1. Host A sends FIN. 2. Host B replies with ACK. 3. Host B finishes sending its pending data and sends its own FIN. 4. Host A replies with ACK and enters TIME_WAIT."
      }
    ],
    realWorldApplications: [
      "High-throughput Content Delivery Networks (CDNs) edge routing",
      "Real-time WebSocket multiplayer gaming and video conferencing (WebRTC)",
      "BGP Internet backbone peering between Autonomous Systems (AS)",
      "DNS Root server multi-cast resolution"
    ],
    practiceProblems: [
      {
        title: "Compute CRC Checksum for Data 1101001110 with Generator 1011",
        difficulty: "Easy",
        description: "Perform binary XOR polynomial division to extract the 3-bit frame check sequence."
      }
    ]
  },

  // ==========================================
  // CLOUD COMPUTING & DEVOPS
  // ==========================================
  "cloud-computing-guide": {
    id: "cloud-computing-guide",
    title: "Cloud Computing, AWS, Docker & Kubernetes Master Handbook",
    subject: "Cloud Service Management",
    provider: "Academic Curriculum",
    category: "Cloud & DevOps",
    readTime: "22 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/cloud-computing",
    simulatorName: "Cloud & Containerization Studio",
    overview:
      "Enterprise cloud computing fundamentals covering IaaS/PaaS/SaaS architectures, AWS infrastructure (EC2, S3, IAM, VPC), Docker containerization mechanics, and Kubernetes cluster orchestration.",
    learningObjectives: [
      "Compare IaaS, PaaS, and SaaS cloud deployment and responsibility models",
      "Architect secure AWS VPCs with public/private subnets and security groups",
      "Write multi-stage Dockerfiles for optimized production container images",
      "Deploy scalable microservices using Kubernetes Pods, Deployments, and Services"
    ],
    keyConcepts: [
      {
        title: "1. Cloud Service & Deployment Models",
        description:
          "Cloud computing delivers on-demand compute, storage, and networking with pay-as-you-go pricing.",
        points: [
          "IaaS (Infrastructure as a Service): Raw VMs, storage, networking (AWS EC2, Google Compute Engine). You manage OS and apps.",
          "PaaS (Platform as a Service): Managed application runtime and database (AWS Elastic Beanstalk, Heroku, Vercel).",
          "SaaS (Software as a Service): End-user software over the web (Google Workspace, Office 365, Salesforce).",
          "Shared Responsibility Model: Cloud provider secures 'OF the cloud' (hardware, data centers); customer secures 'IN the cloud' (data, IAM, OS patches)."
        ]
      },
      {
        title: "2. Docker Containerization vs Virtual Machines",
        description:
          "Virtual Machines virtualize the hardware layer using a Hypervisor (Type 1 or Type 2) with full guest OS. Docker containers virtualize the Operating System kernel using Linux namespaces and cgroups, making them lightweight and instant to start.",
        points: [
          "Dockerfile: Blueprint script containing instructions to build an immutable image.",
          "Image: Read-only layered package containing runtime, code, and system libraries.",
          "Container: A running instance of an image with a read-write top layer."
        ]
      },
      {
        title: "3. Kubernetes Architecture & Microservices",
        description:
          "Kubernetes (K8s) automates deployment, scaling, and management of containerized applications across node clusters.",
        points: [
          "Control Plane: API Server, etcd (distributed key-value store), Controller Manager, Scheduler.",
          "Worker Nodes: Kubelet, Kube-proxy, Container Runtime (containerd).",
          "Objects: Pod (smallest deployable unit), Deployment (declarative replica updates), Service (ClusterIP, NodePort, LoadBalancer)."
        ]
      }
    ],
    codeSnippets: {
      python: `# Multi-stage Dockerfile & Kubernetes Deployment Manifest
# --- Dockerfile ---
# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build

# FROM node:20-alpine AS runner
# WORKDIR /app
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# EXPOSE 3000
# CMD ["npm", "start"]

# --- Kubernetes deployment.yaml ---
# apiVersion: apps/v1
# kind: Deployment
# metadata:
#   name: vlab-frontend-deployment
# spec:
#   replicas: 3
#   selector:
#     matchLabels:
#       app: vlab-frontend
#   template:
#     metadata:
#       labels:
#         app: vlab-frontend
#     spec:
#       containers:
#       - name: vlab-app
#         image: virtual-labs-frontend:latest
#         ports:
#         - containerPort: 3000
#         resources:
#           limits:
#             cpu: "500m"
#             memory: "512Mi"`
    },
    complexityAnalysis: {
      timeComplexity: "Container startup: ~100ms vs VM boot: ~30-60s | Kubernetes auto-scaling (HPA): evaluates metrics every 15s",
      spaceComplexity: "Docker layered storage allows sharing base layers across images",
      bestCase: "Zero downtime blue-green / rolling deployments",
      worstCase: "Cascading pod restart loops (CrashLoopBackOff)",
      notes: "Stateless microservices scale horizontally with minimal latency compared to vertical stateful machines."
    },
    vivaQuestions: [
      {
        question: "What is the key difference between Docker and a Virtual Machine?",
        answer:
          "A Virtual Machine virtualizes the physical hardware using a Hypervisor and requires a complete guest operating system for each VM, incurring high memory and boot overhead. Docker shares the host OS kernel and isolates processes using Linux namespaces and control groups (cgroups), making containers lightweight, portable, and able to boot in milliseconds."
      },
      {
        question: "Explain the role of etcd in Kubernetes cluster control plane.",
        answer:
          "etcd is a strongly consistent, highly-available distributed key-value store that acts as the single source of truth for all cluster state, pod specifications, secrets, configurations, and node status in Kubernetes."
      }
    ],
    realWorldApplications: [
      "Auto-scaling high-traffic web applications with AWS ALB and ECS/EKS",
      "Serverless event-driven architecture using AWS Lambda and API Gateway",
      "Continuous Integration & Continuous Deployment (CI/CD) pipelines with GitHub Actions and Docker",
      "Multi-region disaster recovery and geo-distributed database replication"
    ],
    practiceProblems: [
      {
        title: "Write a Multi-Stage Dockerfile for a Next.js / Node.js application",
        difficulty: "Medium",
        description: "Separate build dependencies from production runtime to minimize final image size under 150MB."
      }
    ]
  },

  // ==========================================
  // C PROGRAMMING & MEMORY MANAGEMENT
  // ==========================================
  "c-programming-guide": {
    id: "c-programming-guide",
    title: "C Programming Master Guide — Pointers, Structs & Dynamic Memory",
    subject: "C Programming",
    provider: "Academic Curriculum",
    category: "Programming",
    readTime: "20 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/c-programming",
    simulatorName: "C Pointer & Memory Studio",
    overview:
      "A complete guide to C language fundamentals: pointers, pointer arithmetic, dynamic memory allocation (malloc, calloc, realloc, free), structs, unions, and file I/O operations.",
    learningObjectives: [
      "Master pointer variables, dereferencing (*), address-of (&), and double pointers (**)",
      "Allocate and deallocate dynamic heap memory safely without memory leaks",
      "Define structured data types using struct and typedef with memory padding considerations",
      "Perform low-level byte and file I/O operations using fopen, fread, and fwrite"
    ],
    keyConcepts: [
      {
        title: "1. Pointers & Memory Address Mechanics",
        description:
          "A pointer is a variable that stores the memory address of another variable.",
        points: [
          "int a = 10; int *p = &a; // *p dereferences to value 10, p is memory address (e.g. 0x7ffd).",
          "Pointer Arithmetic: (p + 1) increments the address by sizeof(DataType) bytes.",
          "Dangling Pointer: A pointer pointing to memory that has been freed.",
          "NULL Pointer: A pointer initialized to 0/NULL to prevent accidental memory corruption."
        ]
      },
      {
        title: "2. Dynamic Memory Management (Heap vs Stack)",
        description:
          "Stack memory is automatically managed for local function variables. Heap memory is manually allocated at runtime and must be explicitly released.",
        points: [
          "malloc(size): Allocates uninitialized memory of specified bytes.",
          "calloc(n, size): Allocates and zeroes out memory for n elements.",
          "realloc(ptr, new_size): Resizes previously allocated heap block.",
          "free(ptr): Releases heap memory back to the OS. Failure to call free causes Memory Leaks."
        ]
      }
    ],
    codeSnippets: {
      c: `// C Pointer & Dynamic Array Implementation
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id;
    char name[50];
    float marks;
} Student;

int main() {
    int n = 3;
    // Allocate dynamic array of students on heap
    Student *students = (Student*)malloc(n * sizeof(Student));
    if (students == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Initialize data
    for (int i = 0; i < n; i++) {
        students[i].id = i + 1;
        snprintf(students[i].name, 50, "Student_%d", i + 1);
        students[i].marks = 85.5f + (i * 4.0f);
    }

    // Display
    for (int i = 0; i < n; i++) {
        printf("ID: %d, Name: %s, Marks: %.2f\\n", 
               students[i].id, students[i].name, students[i].marks);
    }

    // Free memory to prevent leaks
    free(students);
    students = NULL; // Prevent dangling pointer
    return 0;
}`
    },
    complexityAnalysis: {
      timeComplexity: "malloc/free: O(1) average | Array indexing via pointer arithmetic *(arr + i): O(1)",
      spaceComplexity: "O(N * sizeof(DataType)) on the heap",
      bestCase: "O(1) direct memory access",
      worstCase: "Memory fragmentation if numerous small allocations are made without freeing",
      notes: "Always set pointers to NULL after calling free() to eliminate dangling pointer exploits."
    },
    vivaQuestions: [
      {
        question: "What is the difference between malloc() and calloc() in C?",
        answer:
          "malloc() takes one argument (total bytes) and allocates memory with garbage (uninitialized) values. calloc() takes two arguments (number of elements and size of each) and initializes all allocated bytes to zero."
      },
      {
        question: "What is a segmentation fault and what causes it in C programs?",
        answer:
          "A segmentation fault occurs when a program attempts to access a memory address that it is not permitted to access. Common causes include: dereferencing a NULL or dangling pointer, writing to read-only string literals, or array index out-of-bounds overflowing the allocated memory buffer."
      }
    ],
    realWorldApplications: [
      "Operating System Kernel Development (Linux Kernel is ~95% C)",
      "Embedded Systems & Microcontroller firmware (Arduino, ARM Cortex, Automotive ECUs)",
      "High-performance Game Engines and Graphics Device Drivers (OpenGL, Vulkan)",
      "Database storage engine internals (SQLite, PostgreSQL)"
    ],
    practiceProblems: [
      {
        title: "Implement Dynamic String Concatenation using realloc()",
        difficulty: "Easy",
        description: "Dynamically grow character buffer to append strings without buffer overflow."
      }
    ]
  },

  // ==========================================
  // JAVA OBJECT-ORIENTED PROGRAMMING
  // ==========================================
  "java-oop-guide": {
    id: "java-oop-guide",
    title: "Java Object-Oriented Programming (OOP) & Collections Reference",
    subject: "Java OOP",
    provider: "Academic Curriculum",
    category: "Programming",
    readTime: "24 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/oops-java",
    simulatorName: "Java OOP Sandbox",
    overview:
      "A complete guide to Object-Oriented Programming principles in Java: Encapsulation, Inheritance, Polymorphism, Abstraction, Interfaces, Exception Handling, and the Java Collections Framework (ArrayList, HashMap, LinkedList, HashSet).",
    learningObjectives: [
      "Implement the 4 pillars of OOP in clean, decoupled Java architecture",
      "Differentiate Abstract Classes vs Interfaces and leverage default/static interface methods",
      "Handle runtime exceptions gracefully using try-catch-finally and custom exception classes",
      "Select optimal Java Collections Framework classes based on Big-O access and insertion profiles"
    ],
    keyConcepts: [
      {
        title: "1. The Four Pillars of OOP",
        description:
          "Core paradigms governing modern object-oriented software engineering.",
        points: [
          "Encapsulation: Bundling data (private fields) and methods, exposed via public getters/setters.",
          "Inheritance: Reusing code across parent-child hierarchies using 'extends'.",
          "Polymorphism: Method Overloading (Compile-time / Static) vs Method Overriding (Runtime / Dynamic via virtual method table).",
          "Abstraction: Hiding implementation details and showing only functionality using Abstract Classes and Interfaces."
        ]
      },
      {
        title: "2. Java Collections Framework Hierarchy",
        description:
          "Unified architecture for storing and manipulating groups of objects.",
        points: [
          "List Interface (ArrayList, LinkedList, Vector): Ordered collection, allows duplicates.",
          "Set Interface (HashSet, TreeSet, LinkedHashSet): Unordered collection, no duplicates.",
          "Map Interface (HashMap, TreeMap, ConcurrentHashMap): Key-Value pairs with O(1) hash bucket lookup.",
          "Queue Interface (PriorityQueue, ArrayDeque): FIFO and priority-based ordering."
        ]
      }
    ],
    codeSnippets: {
      java: `// Java OOP & Collections Showcase
import java.util.*;

// Interface
interface Drawable {
    void draw();
    default void logCreation() { System.out.println("Shape created."); }
}

// Abstract Parent Class
abstract class Shape implements Drawable {
    protected String color;
    public Shape(String color) { this.color = color; }
    public abstract double calculateArea();
}

// Concrete Subclass
class Circle extends Shape {
    private double radius;
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double calculateArea() { return Math.PI * radius * radius; }

    @Override
    public void draw() {
        System.out.printf("Drawing %s Circle with radius %.2f (Area: %.2f)\\n", 
                          color, radius, calculateArea());
    }
}

public class JavaOOPDemo {
    public static void main(String[] args) {
        List<Shape> shapes = new ArrayList<>();
        shapes.add(new Circle("Red", 5.0));
        shapes.add(new Circle("Blue", 3.2));

        Map<String, Shape> shapeMap = new HashMap<>();
        shapeMap.put("PrimaryCircle", shapes.get(0));

        for (Shape s : shapes) {
            s.draw();
        }
    }
}`
    },
    complexityAnalysis: {
      timeComplexity: "ArrayList get(i): O(1) | ArrayList add(val): O(1) amortized | HashMap get/put: O(1) average, O(log N) treeified bucket worst",
      spaceComplexity: "O(N) for objects on the JVM Garbage Collected Heap",
      bestCase: "O(1) with well-distributed hash codes in HashMap",
      worstCase: "O(N) with pathological hash collisions before Java 8 Treeification",
      notes: "Java 8 converts HashMap buckets with >= 8 entries from LinkedList to Red-Black Tree (O(log N))."
    },
    vivaQuestions: [
      {
        question: "What is the difference between an Abstract Class and an Interface in Java?",
        answer:
          "An Abstract Class can maintain state (instance variables with state) and constructor methods, but a class can only extend one abstract class (single inheritance). An Interface defines a contract (all fields are public static final by default) and supports multiple inheritance of type. Since Java 8, interfaces can also provide default and static method implementations."
      },
      {
        question: "How does HashMap handle collisions internally in Java 8+?",
        answer:
          "HashMap uses separate chaining. When two keys hash to the same bucket index, they are stored in a Linked List. In Java 8+, once the bucket size exceeds TREEIFY_THRESHOLD (8 items) and total capacity >= 64, the linked list is converted into a Red-Black Self-Balancing Binary Search Tree, improving worst-case lookup from O(N) to O(log N)."
      }
    ],
    realWorldApplications: [
      "Enterprise Backend Microservices with Spring Boot and JPA/Hibernate",
      "Android Mobile Application Development with Android SDK and Kotlin/Java",
      "High-frequency financial trading systems utilizing off-heap Java memory",
      "Big Data Distributed Processing engines (Apache Spark, Kafka, Hadoop)"
    ],
    practiceProblems: [
      {
        title: "Design an LRU Cache using Java LinkedHashMap",
        difficulty: "Medium",
        description: "Override removeEldestEntry() to create a fixed-capacity Least Recently Used cache."
      }
    ]
  }
};

/**
 * Helper to match any resource item to its corresponding rich in-app material
 */
export function getMaterialForResource(resource: {
  title?: string;
  subject?: string;
  provider?: string;
  id?: string;
}): MaterialContent {
  const t = (resource.title || "").toLowerCase();
  const s = (resource.subject || "").toLowerCase();
  const p = (resource.provider || "").toLowerCase();

  if (t.includes("data structure") || s.includes("data structure") || s.includes("dsa") || t.includes("tree") || t.includes("array")) {
    return MATERIAL_CONTENTS["dsa-complete-guide"];
  }
  if (t.includes("operating system") || s.includes("operating system") || s.includes("os") || t.includes("scheduling") || t.includes("semaphore")) {
    return MATERIAL_CONTENTS["os-handbook"];
  }
  if (t.includes("dbms") || s.includes("dbms") || s.includes("database") || t.includes("sql") || t.includes("normalization")) {
    return MATERIAL_CONTENTS["dbms-sql-guide"];
  }
  if (t.includes("artificial intelligence") || t.includes("machine learning") || s.includes("machine learning") || s.includes("ai") || t.includes("scikit") || t.includes("neural")) {
    return MATERIAL_CONTENTS["ai-ml-guide"];
  }
  if (t.includes("network") || s.includes("network") || t.includes("socket") || t.includes("protocol") || t.includes("tcp")) {
    return MATERIAL_CONTENTS["networks-guide"];
  }
  if (t.includes("cloud") || s.includes("cloud") || t.includes("docker") || t.includes("kubernetes") || t.includes("aws")) {
    return MATERIAL_CONTENTS["cloud-computing-guide"];
  }
  if (t.includes("c programming") || s.includes("c programming") || t.includes("pointer") || s.includes("c language")) {
    return MATERIAL_CONTENTS["c-programming-guide"];
  }
  if (t.includes("java") || s.includes("java") || t.includes("oop") || t.includes("object oriented")) {
    return MATERIAL_CONTENTS["java-oop-guide"];
  }

  // Fallback default rich material (DSA)
  return MATERIAL_CONTENTS["dsa-complete-guide"];
}
