import { MaterialContent } from "./types";

export const DSA_MATERIALS: Record<string, MaterialContent> = {
  "dsa-complete-guide": {
    id: "dsa-complete-guide",
    title: "Data Structures & Algorithms Complete Academic Handbook",
    subject: "Data Structures (Java)",
    provider: "GeeksforGeeks Reference",
    category: "Data Structures & Algorithms",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/data-structures",
    simulatorName: "DSA Simulator Suite",
    overview:
      "A comprehensive foundational study of linear and non-linear data structures. Covers contiguous and linked memory allocation, stack/queue operations, balanced trees, and graph representations with real-time complexity tradeoffs referenced from GeeksforGeeks and standard academic curricula.",
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

        public boolean isEmpty() { return top == -1; }
    }
}`,
      python: `class Node:
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
        return elements`
    },
    complexityAnalysis: {
      timeComplexity: "Array Access: O(1); Linked List Insert: O(1); BST Search: O(log N) avg, O(N) worst; AVL Search: O(log N) guaranteed",
      spaceComplexity: "Array: O(N) contiguous; Linked List: O(N) with pointer overhead; Trees: O(N)",
      bestCase: "O(1) for direct index access or stack push/pop",
      worstCase: "O(N) for linear traversal or unbalance tree",
      notes: "Contiguous arrays optimize CPU cache line prefetching; linked nodes cause cache misses due to pointer chasing."
    },
    vivaQuestions: [
      {
        question: "Why does an AVL tree search guarantee O(log N) whereas a BST can degrade to O(N)?",
        answer: "A standard BST can become completely skewed (degenerate into a linked list) if inserted in sorted order, resulting in O(N) search depth. An AVL tree enforces a strict balance factor difference of at most 1 at every node via rotations, guaranteeing height h <= 1.44 * log2(N)."
      },
      {
        question: "Explain the difference between a Queue and a Priority Queue.",
        answer: "A standard Queue follows strict First-In First-Out (FIFO) ordering. A Priority Queue serves elements based on highest priority (often implemented using a binary Min/Max-Heap with O(log N) insert and extract)."
      }
    ],
    realWorldApplications: [
      "Operating system memory allocators (free-lists using doubly linked lists)",
      "Browser history back/forward navigation using two stacks",
      "Network routing shortest path calculations using Min-Heaps"
    ],
    practiceProblems: [
      {
        title: "Reverse a Linked List",
        difficulty: "Easy",
        description: "Given the head of a singly linked list, reverse the list iteratively in O(N) time and O(1) space."
      }
    ]
  },

  "dsa-trees-gfg": {
    id: "dsa-trees-gfg",
    title: "Binary Search Trees & Self-Balancing AVL Trees",
    subject: "Data Structures (Java)",
    provider: "GeeksforGeeks Reference",
    category: "Tree Data Structures",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/data-structures",
    simulatorName: "DSA Simulator Suite",
    overview:
      "A tree is a non-linear hierarchical data structure consisting of nodes connected by edges. This GeeksforGeeks guide details Binary Search Trees (BST), tree traversals (Inorder, Preorder, Postorder, Level Order), and self-balancing mechanisms in AVL trees (Left-Left, Right-Right, Left-Right, Right-Left rotations).",
    learningObjectives: [
      "Verify the BST property: Left Subtree < Root < Right Subtree for all nodes",
      "Execute recursive tree traversals and prove Inorder traversal yields sorted sequence",
      "Compute node heights and the AVL Balance Factor: BF = Height(Left) - Height(Right)",
      "Perform single rotations (LL, RR) and double rotations (LR, RL) to rebalance AVL trees",
      "Analyze the worst-case O(log N) search guarantee in self-balancing trees"
    ],
    keyConcepts: [
      {
        title: "1. The BST Search Invariant",
        description:
          "At every node, values in the left subtree are strictly smaller, and values in the right subtree are strictly greater.",
        points: [
          "Search Algorithm: If key < root.val, recurse left; if key > root.val, recurse right; else return root.",
          "Degenerate BST: Inserting [1, 2, 3, 4, 5] creates a right-skewed stick of height N, degrading search to O(N)."
        ]
      },
      {
        title: "2. The Four AVL Rotations",
        description:
          "Rotations restructure subtrees in O(1) without violating the in-order sorted BST property.",
        points: [
          "LL Case: Left-heavy with insertion in left child's left subtree -> Single Right Rotation on root.",
          "RR Case: Right-heavy with insertion in right child's right subtree -> Single Left Rotation on root.",
          "LR Case: Left child's right subtree -> Left Rotation on left child, then Right Rotation on root.",
          "RL Case: Right child's left subtree -> Right Rotation on right child, then Left Rotation on root."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Standard BST Insertion",
        description: "Recursively insert new key as a leaf in the appropriate subtree."
      },
      {
        step: 2,
        title: "Update Heights & Compute BF",
        description: "node.height = 1 + max(height(left), height(right)); BF = height(left) - height(right)."
      },
      {
        step: 3,
        title: "Rebalance if |BF| > 1",
        description: "Detect imbalance category (LL, RR, LR, RL) and execute rotations to restore BF in {-1, 0, 1}."
      }
    ],
    codeSnippets: {
      java: `class AVLNode {
    int key, height;
    AVLNode left, right;

    AVLNode(int d) {
        key = d;
        height = 1;
    }
}

public class AVLTree {
    AVLNode root;

    int height(AVLNode N) {
        return N == null ? 0 : N.height;
    }

    int getBalance(AVLNode N) {
        return N == null ? 0 : height(N.left) - height(N.right);
    }

    AVLNode rightRotate(AVLNode y) {
        AVLNode x = y.left;
        AVLNode T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        return x;
    }

    AVLNode leftRotate(AVLNode x) {
        AVLNode y = x.right;
        AVLNode T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        return y;
    }

    AVLNode insert(AVLNode node, int key) {
        if (node == null) return new AVLNode(key);
        if (key < node.key) node.left = insert(node.left, key);
        else if (key > node.key) node.right = insert(node.right, key);
        else return node;

        node.height = 1 + Math.max(height(node.left), height(node.right));
        int balance = getBalance(node);

        // LL Case
        if (balance > 1 && key < node.left.key) return rightRotate(node);
        // RR Case
        if (balance < -1 && key > node.right.key) return leftRotate(node);
        // LR Case
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        // RL Case
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        return node;
    }
}`
    },
    complexityAnalysis: {
      timeComplexity: "Search: O(log N); Insert: O(log N); Delete: O(log N); Rotations: O(1)",
      spaceComplexity: "O(N) for tree nodes + O(log N) recursion stack",
      bestCase: "O(1) search at root",
      worstCase: "O(log N) guaranteed bound in AVL tree",
      notes: "Red-Black Trees allow slightly more imbalance than AVL trees, requiring fewer rotations on insert/delete (preferred in Linux kernel and Java TreeMap)."
    },
    vivaQuestions: [
      {
        question: "Why does an Inorder traversal of a Binary Search Tree always produce sorted output?",
        answer: "Inorder visits: Left Subtree, then Root, then Right Subtree. Since the BST property mandates all nodes in Left < Root < all nodes in Right, processing recursively in this order guarantees elements are visited in strictly ascending numerical order."
      },
      {
        question: "What is the maximum allowed height difference in an AVL Tree?",
        answer: "The balance factor (Height of left subtree - Height of right subtree) must be in {-1, 0, 1}. A difference of 2 or -2 triggers an immediate rotation rebalance."
      }
    ],
    realWorldApplications: [
      "Database B-Tree and B+ Tree indexing for disk block storage",
      "Symbol tables in programming language compilers",
      "Network routing longest prefix match IP lookup tables"
    ],
    practiceProblems: [
      {
        title: "Lowest Common Ancestor (LCA) in BST",
        difficulty: "Medium",
        description: "Given a Binary Search Tree and two nodes p and q, find their Lowest Common Ancestor in O(h) time without extra memory."
      }
    ]
  },

  "dsa-java-w3schools": {
    id: "dsa-java-w3schools",
    title: "Java Data Structures & Collections Framework Reference",
    subject: "Data Structures (Java)",
    provider: "W3Schools Reference",
    category: "Java Collections & Structures",
    readTime: "20 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/data-structures",
    simulatorName: "DSA Simulator Suite",
    overview:
      "A hands-on, practical W3Schools-curated laboratory guide to implementing standard data structures in Java. Covers ArrayList, LinkedList, Stack class, Queue interface with LinkedList, PriorityQueue (Min-Heap), and Iterator mechanisms.",
    learningObjectives: [
      "Master the Java Collections Framework (JCF) List, Set, and Queue interfaces",
      "Instantiate and manipulate dynamic ArrayLists and LinkedLists",
      "Implement Stack operations (push, pop, peek) and Queue operations (offer, poll, peek)",
      "Construct Min-Heaps and Max-Heaps using java.util.PriorityQueue",
      "Traverse collections safely using Iterators"
    ],
    keyConcepts: [
      {
        title: "1. The Queue & Deque Interface Hierarchy",
        description:
          "Java provides standard FIFO and double-ended queue implementations.",
        points: [
          "Queue: add() / offer() at tail; remove() / poll() from head.",
          "ArrayDeque: Resizable array-backed deque, faster than Stack and LinkedList when used as a stack or queue due to continuous cache locality.",
          "PriorityQueue: Implemented as a binary heap with natural ordering (or custom Comparator)."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Choose Collection Type",
        description: "Select ArrayList for fast random index access, LinkedList for frequent insertions, PriorityQueue for top-k elements."
      },
      {
        step: 2,
        title: "Populate & Manipulate",
        description: "Add elements, test edge cases (empty collection underflow), and sort."
      }
    ],
    codeSnippets: {
      java: `import java.util.*;

public class W3SchoolsDSADemo {
    public static void main(String[] args) {
        // 1. Queue via LinkedList
        Queue<String> printerQueue = new LinkedList<>();
        printerQueue.offer("Lab_Report.pdf");
        printerQueue.offer("Thesis_Final.docx");
        System.out.println("Processing: " + printerQueue.poll());

        // 2. Min-Heap via PriorityQueue
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.addAll(Arrays.asList(40, 10, 30, 20));
        System.out.println("Min Element: " + minHeap.peek()); // 10

        // 3. Max-Heap via Collections.reverseOrder()
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        maxHeap.addAll(Arrays.asList(40, 10, 30, 20));
        System.out.println("Max Element: " + maxHeap.peek()); // 40
    }
}`
    },
    complexityAnalysis: {
      timeComplexity: "ArrayList get: O(1); Queue offer/poll: O(1); PriorityQueue insert/extract: O(log N)",
      spaceComplexity: "O(N) heap memory",
      bestCase: "O(1)",
      worstCase: "O(log N)",
      notes: "ArrayDeque should be preferred over legacy java.util.Stack as Stack extends Vector and suffers synchronized lock overhead."
    },
    vivaQuestions: [
      {
        question: "Why is ArrayDeque preferred over Stack in modern Java?",
        answer: "java.util.Stack is a legacy class extending Vector, making all its methods synchronized (incurring thread locking overhead even in single-threaded environments). ArrayDeque is non-synchronized, faster, and backed by a circular dynamic array."
      }
    ],
    realWorldApplications: [
      "Operating system printer spooling queues",
      "Dijkstra Shortest Path priority queues in navigation GPS"
    ],
    practiceProblems: [
      {
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        description: "Given an integer array and an integer k, return the k most frequent elements using a HashMap and a PriorityQueue Min-Heap."
      }
    ]
  },
  "dsa-lab-manual": {
    id: "dsa-lab-manual",
    title: "Data Structures & Algorithms Laboratory Manual",
    subject: "Data Structures Lab",
    provider: "Department of Artificial Intelligence and Data Science",
    source: "VSB Engineering College Autonomous Curriculum (R2023 / R2021)",
    subtitle: "Complete Manual: Singly/Doubly Linked Lists, Stacks, Circular Queues, Binary Search Trees, BFS/DFS & Dijkstra's Algorithm",
    category: "Academic Laboratory Manual",
    readTime: "60 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/data-structures",
    simulatorName: "DSA Algorithm Visualizer",
    overview:
      "This official laboratory manual for Data Structures and Algorithms provides complete practical specifications conforming to the Anna University and Autonomous curriculum. Students implement foundational linear abstract data types (Singly Linked Lists, Doubly Linked Lists, Stacks, Circular Queues) and non-linear data structures (Binary Search Trees, Expression Trees, Graph BFS/DFS, and Dijkstra Shortest Path).",
    learningObjectives: [
      "Implement dynamic linear data structures using self-referential pointer nodes in C/C++/Java",
      "Apply Stack ADT for arithmetic expression parsing, Infix to Postfix conversion, and operand stack evaluation",
      "Construct circular array and linked queue buffers handling boundary overflow and underflow conditions",
      "Develop Binary Search Trees (BST) supporting recursive insertion, deletion, and tree traversals",
      "Implement graph pathfinding algorithms including Breadth-First Search, Depth-First Search, and Dijkstra shortest paths"
    ],
    tags: ["Data Structures", "Linked List", "Stack", "Queue", "BST", "Graph", "Lab Manual", "VSB Engineering College"],
    keyConcepts: [
      {
        title: "1. Linear vs Dynamic Linked Allocations",
        description:
          "Array-based structures require contiguous memory blocks, whereas Linked Lists allocate discrete heap nodes connected by pointers.",
        points: [
          "Singly Linked List: Forward-only traversal; insertion/deletion at head takes O(1) time.",
          "Doubly Linked List: Bidirectional traversal via 'next' and 'prev' pointers, enabling O(1) arbitrary node deletion when node reference is known.",
          "Circular Queue: Reuses array memory via modulo arithmetic (rear = (rear + 1) % capacity) to prevent false overflow."
        ]
      },
      {
        title: "2. The Stack ADT & Expression Evaluation",
        description:
          "Last-In First-Out (LIFO) structure essential for procedure call stacks, undo mechanisms, and parsing.",
        points: [
          "Infix to Postfix: Operators pushed to stack based on operator precedence; parentheses force sub-expression evaluation.",
          "Postfix Evaluation: Operands pushed to stack; operators pop top two operands, evaluate result, and push result back."
        ]
      },
      {
        title: "3. Non-Linear Hierarchies & Graph Algorithms",
        description:
          "Trees and graphs represent hierarchical dependencies and networked relationships.",
        points: [
          "Binary Search Tree Property: For every node X, all left subtree values are < X.val and all right subtree values are > X.val.",
          "Inorder Traversal: Traverses Left-Root-Right, yielding values in sorted ascending order in O(N) time.",
          "Dijkstra's Algorithm: Greedy algorithm finding single-source shortest paths on non-negative weighted graphs using a priority queue in O((V + E) log V)."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Node Memory Specification",
        description: "Define structure/class containing data fields and self-referential reference pointers."
      },
      {
        step: 2,
        title: "Pointer Manipulation & Invariants",
        description: "Perform pointer rewiring while maintaining null-terminations, head/tail pointers, and size counters."
      },
      {
        step: 3,
        title: "Boundary Condition Verification",
        description: "Explicitly handle edge cases: empty structure (underflow), single element lists, head deletion, and tail insertion."
      },
      {
        step: 4,
        title: "Traversal & Verification",
        description: "Iterate or recursively visit nodes to verify structural integrity and print formatted output."
      }
    ],
    codeSnippets: {
      java: `// 1. Singly Linked List Implementation
class Node {
    int data;
    Node next;
    Node(int data) { this.data = data; this.next = null; }
}

public class SinglyLinkedList {
    private Node head;

    public void insertAtEnd(int val) {
        Node newNode = new Node(val);
        if (head == null) {
            head = newNode;
            return;
        }
        Node temp = head;
        while (temp.next != null) {
            temp = temp.next;
        }
        temp.next = newNode;
    }

    public void deleteValue(int val) {
        if (head == null) return;
        if (head.data == val) {
            head = head.next;
            return;
        }
        Node curr = head;
        while (curr.next != null && curr.next.data != val) {
            curr = curr.next;
        }
        if (curr.next != null) {
            curr.next = curr.next.next;
        }
    }

    public void display() {
        Node curr = head;
        while (curr != null) {
            System.out.print(curr.data + " -> ");
            curr = curr.next;
        }
        System.out.println("NULL");
    }
}`
    },
    complexityAnalysis: {
      timeComplexity: "SLL/DLL Head Operations: O(1); Search: O(N); BST Search/Insert: O(log N) average, O(N) worst case",
      spaceComplexity: "O(N) memory overhead for storing node reference pointers alongside data elements",
      notes: "Balanced BSTs (AVL, Red-Black) maintain strict O(log N) worst-case height guarantees through tree rotations."
    },
    vivaQuestions: [
      {
        question: "What is an Abstract Data Type (ADT)?",
        answer: "An ADT is a mathematical model for data types where the data type is defined by its behavior (operations and semantics) from the point of view of a user, independent of its concrete implementation.",
        category: "Foundations"
      },
      {
        question: "Why does a Circular Queue solve the false overflow problem of a Linear Queue?",
        answer: "In a standard linear queue, once the rear pointer hits the array boundary, no more elements can be enqueued even if elements have been dequeued from the front. A circular queue wraps the rear pointer back to index 0 using modulo arithmetic.",
        category: "Queue"
      },
      {
        question: "What is the time complexity of searching an element in a Binary Search Tree?",
        answer: "Average case is O(log N) for balanced trees. Worst case is O(N) if the tree degrades into a skewed linked list due to sorted input insertion.",
        category: "Trees"
      }
    ],
    realWorldApplications: [
      "Operating system memory allocation free-lists implemented using Doubly Linked Lists",
      "Web browser backwards and forwards history navigation utilizing paired Stack ADTs",
      "Network router packet switching queues and OS scheduler runqueues implemented as Circular Queues"
    ],
    practiceProblems: [
      {
        title: "Reverse a Linked List in Groups of K",
        difficulty: "Hard",
        description: "Given a singly linked list, reverse the nodes of the list k at a time and return its modified list preserving pointer integrity."
      },
      {
        title: "Evaluate Reverse Polish Notation",
        difficulty: "Medium",
        description: "Evaluate the value of an arithmetic expression in Reverse Polish Notation (Postfix) containing +, -, *, and / using a Stack."
      }
    ]
  }
};
