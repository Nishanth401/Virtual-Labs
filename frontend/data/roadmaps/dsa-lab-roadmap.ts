import { DSACategory } from "../dsa-topic-data";

export const DSA_LAB_ROADMAP_CATEGORIES: DSACategory[] = [
  {
    id: "dsa-linked-lists",
    name: "1. Linked Lists & Applications",
    shortDesc: "Singly, Doubly, Circular Linked Lists, Reversal, Floyd's Cycle Detection, and Merging.",
    iconName: "Code2",
    topics: [
      {
        id: "dsa-singly-linked-list",
        slug: "singly-linked-list-operations",
        title: "Exp 1: Singly Linked List (Insert, Delete, Search & Traversal)",
        categoryId: "dsa-linked-lists",
        categoryName: "1. Linked Lists & Applications",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        visualizerType: "linked-list",
        gfgSearchQuery: "Singly Linked list insertion deletion search Java",
        gfgUrl: "https://www.geeksforgeeks.org/data-structures/linked-list/singly-linked-list/",
        quickSummary: "Implement dynamic node allocations with head/tail insertion, target deletion, key search, and forward traversal.",
        keyPoints: [
          "Dynamic heap memory allocation per node: data and next pointer.",
          "O(1) insertion at head; O(n) traversal for searching and tail insertions.",
          "Edge case handling: empty list, single node, and deleting head/tail."
        ],
        diagramTitle: "Singly Linked List Dynamic Node Pointers",
        diagram: `  Head ──► [ Data: 10 | Next ] ──► [ Data: 20 | Next ] ──► [ Data: 30 | Next: NULL ]`,
        complexities: [
          { operation: "Insert at Head", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Search / Traverse", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Delete by Value", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Singly Linked List)",
            code: `class ListNode {
    int val;
    ListNode next;
    ListNode(int v) { this.val = v; this.next = null; }
}

public class SinglyLinkedList {
    private ListNode head;

    public void insertHead(int val) {
        ListNode newNode = new ListNode(val);
        newNode.next = head;
        head = newNode;
    }

    public void deleteValue(int key) {
        if (head == null) return;
        if (head.val == key) { head = head.next; return; }
        ListNode curr = head;
        while (curr.next != null && curr.next.val != key) {
            curr = curr.next;
        }
        if (curr.next != null) curr.next = curr.next.next;
    }

    public void display() {
        ListNode curr = head;
        while (curr != null) {
            System.out.print(curr.val + " -> ");
            curr = curr.next;
        }
        System.out.println("null");
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Design Linked List",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/design-linked-list/",
            platform: "LeetCode",
            topicTag: "Linked List"
          }
        ]
      },
      {
        id: "dsa-doubly-circular-ll",
        slug: "doubly-circular-linked-lists",
        title: "Exp 2: Doubly and Circular Linked Lists",
        categoryId: "dsa-linked-lists",
        categoryName: "1. Linked Lists & Applications",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Doubly linked list circular linked list Java implementation",
        gfgUrl: "https://www.geeksforgeeks.org/doubly-linked-list/",
        quickSummary: "Implement bidirectional traversal (Doubly Linked List) and continuous looping buffer structures (Circular Linked List).",
        keyPoints: [
          "Doubly Linked List maintains prev and next pointers enabling O(1) node deletion given a pointer.",
          "Circular Linked List links the tail node back to head node.",
          "Ideal for round-robin CPU scheduling and playlist buffers."
        ],
        diagramTitle: "Doubly Linked List & Circular Linked List Topologies",
        diagram: `  Doubly Linked List:
  NULL ◄── [ Prev | 10 | Next ] ◄──► [ Prev | 20 | Next ] ──► NULL

  Circular Linked List:
  ┌──► [ 10 | Next ] ──► [ 20 | Next ] ──► [ 30 | Next ] ──┐
  └────────────────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Doubly LL Node Delete", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Circular LL Traversal", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Doubly Linked List)",
            code: `class DNode {
    int val;
    DNode prev, next;
    DNode(int v) { this.val = v; }
}

public class DoublyLinkedList {
    private DNode head;

    public void insertAtEnd(int val) {
        DNode newNode = new DNode(val);
        if (head == null) { head = newNode; return; }
        DNode curr = head;
        while (curr.next != null) curr = curr.next;
        curr.next = newNode;
        newNode.prev = curr;
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Insert into a Sorted Circular Linked List",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list/",
            platform: "LeetCode",
            topicTag: "Circular LL"
          }
        ]
      },
      {
        id: "dsa-ll-applications",
        slug: "linked-list-applications-reversal-cycle-merge",
        title: "Exp 3: Linked List Applications (Reversal, Floyd's Cycle Detection & Merge)",
        categoryId: "dsa-linked-lists",
        categoryName: "1. Linked Lists & Applications",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Reverse linked list Floyd cycle detection merge two sorted lists Java",
        gfgUrl: "https://www.geeksforgeeks.org/reverse-a-linked-list/",
        quickSummary: "Master in-place pointer reversal, Floyd's Fast & Slow pointer cycle detection, and merging two sorted lists.",
        keyPoints: [
          "In-place Reversal iteratively updates: nextNode = curr.next; curr.next = prev; prev = curr; curr = nextNode.",
          "Floyd's Tortoise and Hare moves slow by 1 and fast by 2; meeting point confirms cycle.",
          "Merge two sorted lists maintains two pointer heads without creating extra node allocations."
        ],
        diagramTitle: "Floyd's Tortoise & Hare Fast/Slow Cycle Detection",
        diagram: `  [ 1 ] ──► [ 2 ] ──► [ 3 ] ──► [ 4 ]
                        ▲                 │
                        │     Loop        │
                        └──────── [ 5 ] ◄─┘
            Slow (1 step)  ──► Fast (2 steps)
            Meeting at Node 4 or 5 proves cycle in O(n) time & O(1) space!`,
        complexities: [
          { operation: "List Reversal", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Floyd's Cycle Detection", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Merge Two Sorted Lists", best: "O(n + m)", avg: "O(n + m)", worst: "O(n + m)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Cycle Detection & Reversal)",
            code: `public class LinkedListApplications {
    // 1. In-Place Reversal
    public static ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }

    // 2. Floyd's Cycle Detection (Tortoise and Hare)
    public static boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) return false;
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Linked List Cycle (LeetCode #141)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/linked-list-cycle/",
            platform: "LeetCode",
            topicTag: "Floyd Cycle"
          },
          {
            title: "Reverse Linked List (LeetCode #206)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/reverse-linked-list/",
            platform: "LeetCode",
            topicTag: "Reversal"
          }
        ]
      }
    ]
  },
  {
    id: "dsa-stacks-queues",
    name: "2. Stacks, Queues & Applications",
    shortDesc: "Array/Linked Stack, Infix-to-Postfix, Circular Queue, Priority Queue, and Deque.",
    iconName: "Layers",
    topics: [
      {
        id: "dsa-stack-implementation",
        slug: "stack-implementation-array-linkedlist",
        title: "Exp 4: Stack Implementation (Array-Based & Linked List-Based)",
        categoryId: "dsa-stacks-queues",
        categoryName: "2. Stacks, Queues & Applications",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        visualizerType: "stack",
        gfgSearchQuery: "Stack implementation array linked list Push Pop Peek Java",
        gfgUrl: "https://www.geeksforgeeks.org/stack-data-structure/",
        quickSummary: "Implement Last-In First-Out (LIFO) stack supporting Push, Pop, Peek, and Overflow/Underflow protection.",
        keyPoints: [
          "Array-based stack maintains top index pointer; checks top == capacity - 1 for overflow.",
          "Linked List stack pushes/pops at the head in O(1) time without capacity constraints.",
          "Peek returns element at top without modifying stack state."
        ],
        diagramTitle: "Stack LIFO Memory Architecture",
        diagram: `          Push(30) ──► ┌──────────┐ ◄── Pop()
                       │  30 (Top)│
                       ├──────────┤
                       │    20    │
                       ├──────────┤
                       │    10    │
                       └──────────┘ (Base)`,
        complexities: [
          { operation: "Push", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Pop", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Peek", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Array Stack)",
            code: `public class ArrayStack {
    private int[] stack;
    private int top;
    private int capacity;

    public ArrayStack(int cap) {
        this.capacity = cap;
        this.stack = new int[cap];
        this.top = -1;
    }

    public void push(int val) {
        if (top == capacity - 1) throw new RuntimeException("Stack Overflow!");
        stack[++top] = val;
    }

    public int pop() {
        if (top == -1) throw new RuntimeException("Stack Underflow!");
        return stack[top--];
    }

    public int peek() { return stack[top]; }
    public boolean isEmpty() { return top == -1; }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Implement Stack using Queues",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/implement-stack-using-queues/",
            platform: "LeetCode",
            topicTag: "Stack"
          }
        ]
      },
      {
        id: "dsa-stack-applications",
        slug: "stack-applications-infix-postfix-parentheses",
        title: "Exp 5: Stack Applications (Infix to Postfix, Evaluation & Parentheses Validation)",
        categoryId: "dsa-stacks-queues",
        categoryName: "2. Stacks, Queues & Applications",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Infix to Postfix conversion stack postfix evaluation valid parentheses Java",
        gfgUrl: "https://www.geeksforgeeks.org/stack-data-structure-evaluation-of-postfix-expression/",
        quickSummary: "Convert mathematical infix expressions to postfix via operator precedence stacks and validate bracket balances.",
        keyPoints: [
          "Shunting-Yard Algorithm compares operator precedence (*, / > +, -).",
          "Postfix Evaluation pops two operands per operator and pushes intermediate results.",
          "Parentheses matching checks matching pairs: '(', '{', '[' vs ')', '}', ']'."
        ],
        diagramTitle: "Shunting-Yard Operator Precedence Stack Flow",
        diagram: `  Input: A + B * C
  Tokens: A -> Output: "A"
          + -> Stack: [+]
          B -> Output: "A B"
          * -> Stack: [+, *] (* has higher precedence than +)
          C -> Output: "A B C"
  Pop all -> Output: "A B C * +"`,
        complexities: [
          { operation: "Infix to Postfix Conversion", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
          { operation: "Valid Parentheses Check", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Infix to Postfix & Evaluation)",
            code: `import java.util.Stack;

public class StackApplications {
    public static int precedence(char ch) {
        if (ch == '+' || ch == '-') return 1;
        if (ch == '*' || ch == '/') return 2;
        return -1;
    }

    public static String infixToPostfix(String exp) {
        StringBuilder result = new StringBuilder();
        Stack<Character> stack = new Stack<>();
        for (char c : exp.toCharArray()) {
            if (Character.isLetterOrDigit(c)) result.append(c);
            else if (c == '(') stack.push(c);
            else if (c == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') result.append(stack.pop());
                stack.pop();
            } else {
                while (!stack.isEmpty() && precedence(c) <= precedence(stack.peek())) {
                    result.append(stack.pop());
                }
                stack.push(c);
            }
        }
        while (!stack.isEmpty()) result.append(stack.pop());
        return result.toString();
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Valid Parentheses (LeetCode #20)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/valid-parentheses/",
            platform: "LeetCode",
            topicTag: "Stack App"
          },
          {
            title: "Evaluate Reverse Polish Notation (LeetCode #150)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
            platform: "LeetCode",
            topicTag: "Postfix Eval"
          }
        ]
      },
      {
        id: "dsa-queue-implementations",
        slug: "queue-implementations-circular-priority-deque",
        title: "Exp 6: Queue Implementations (Circular Queue, Priority Queue & Deque)",
        categoryId: "dsa-stacks-queues",
        categoryName: "2. Stacks, Queues & Applications",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        visualizerType: "queue",
        gfgSearchQuery: "Circular queue priority queue min max heap deque sliding window Java",
        gfgUrl: "https://www.geeksforgeeks.org/queue-data-structure/",
        quickSummary: "Implement Circular Queue with modulo wrap, Priority Queue with binary min-heaps, and Sliding Window Maximum with Deques.",
        keyPoints: [
          "Circular Queue indices: rear = (rear + 1) % capacity, front = (front + 1) % capacity.",
          "Priority Queue maintains binary heap invariant: parent <= children (Min-Heap).",
          "Double-ended Queue (Deque) supports monotonic sliding window maximum queries in O(n) time."
        ],
        diagramTitle: "Circular Queue Modulo Array Wrap Buffer",
        diagram: `               [ 0 ] ──► [ 1 ] ──► [ 2 ]
                 ▲                   │
                 │   Modulo Wrap     │
               [ 5 ] ◄── [ 4 ] ◄── [ 3 ]
               front = (front + 1) % cap | rear = (rear + 1) % cap`,
        complexities: [
          { operation: "Circular Enqueue / Dequeue", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Priority Queue Insert / Extract", best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Circular Queue)",
            code: `public class CircularQueue {
    private int[] arr;
    private int front, rear, size, capacity;

    public CircularQueue(int k) {
        this.capacity = k;
        this.arr = new int[k];
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }

    public boolean enQueue(int value) {
        if (size == capacity) return false;
        rear = (rear + 1) % capacity;
        arr[rear] = value;
        size++;
        return true;
    }

    public boolean deQueue() {
        if (size == 0) return false;
        front = (front + 1) % capacity;
        size--;
        return true;
    }

    public int Front() { return size == 0 ? -1 : arr[front]; }
    public int Rear() { return size == 0 ? -1 : arr[rear]; }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Design Circular Queue (LeetCode #622)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/design-circular-queue/",
            platform: "LeetCode",
            topicTag: "Circular Queue"
          },
          {
            title: "Sliding Window Maximum (LeetCode #239)",
            difficulty: "Hard",
            url: "https://leetcode.com/problems/sliding-window-maximum/",
            platform: "LeetCode",
            topicTag: "Deque"
          }
        ]
      }
    ]
  },
  {
    id: "dsa-trees-graphs",
    name: "3. Trees, Multi-way Trees, Graphs & Algorithms",
    shortDesc: "BST, AVL Balancing, Huffman/Trie, B-Trees, Graph BFS/DFS, Dijkstra/MST, Searching, Sorting, and Hashing.",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "dsa-bst-operations",
        slug: "binary-search-tree-bst",
        title: "Exp 7: Binary Search Tree (Insert, Delete, Search & Traversals)",
        categoryId: "dsa-trees-graphs",
        categoryName: "3. Trees, Multi-way Trees, Graphs & Algorithms",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        visualizerType: "binary-tree",
        gfgSearchQuery: "Binary Search Tree BST insertion deletion traversal Inorder Java",
        gfgUrl: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/",
        quickSummary: "Build BST maintaining left < root < right invariant with Inorder, Preorder, and Postorder traversals.",
        keyPoints: [
          "Inorder Traversal (Left -> Root -> Right) of a BST outputs keys in strictly ascending sorted order.",
          "Node deletion handles 3 cases: 0 children (leaf), 1 child, and 2 children (replace with Inorder Successor).",
          "Average search time O(log n); worst case O(n) for degenerate skewed trees."
        ],
        diagramTitle: "Binary Search Tree & Inorder Successor Deletion",
        diagram: `                    [ 50 ]
                  ┌───┴───┐
                [ 30 ]  [ 70 ]
               ┌──┴──┐  ┌──┴──┐
             [ 20 ] [40][ 60 ][ 80 ]
        Delete(50): Replace with Inorder Successor (60, smallest in right subtree)`,
        complexities: [
          { operation: "BST Search / Insert", best: "O(1)", avg: "O(log n)", worst: "O(n) Skewed", space: "O(height)" },
          { operation: "BST Deletion", best: "O(1)", avg: "O(log n)", worst: "O(n)", space: "O(height)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (BST Operations)",
            code: `class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int v) { this.val = v; }
}

public class BinarySearchTree {
    public TreeNode insert(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        if (val < root.val) root.left = insert(root.left, val);
        else if (val > root.val) root.right = insert(root.right, val);
        return root;
    }

    public void inorder(TreeNode root) {
        if (root != null) {
            inorder(root.left);
            System.out.print(root.val + " ");
            inorder(root.right);
        }
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Delete Node in a BST (LeetCode #450)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/delete-node-in-a-bst/",
            platform: "LeetCode",
            topicTag: "BST"
          }
        ]
      },
      {
        id: "dsa-avl-tree",
        slug: "avl-tree-rotations",
        title: "Exp 8: AVL Tree (Self-Balancing Rotations)",
        categoryId: "dsa-trees-graphs",
        categoryName: "3. Trees, Multi-way Trees, Graphs & Algorithms",
        difficulty: "Advanced",
        estimatedTime: "35 mins",
        gfgSearchQuery: "AVL tree rotations LL RR LR RL balance factor insertion Java",
        gfgUrl: "https://www.geeksforgeeks.org/avl-tree-set-1-insertion/",
        quickSummary: "Maintain strictly balanced height invariant (|Balance Factor| <= 1) via LL, RR, LR, and RL rotations.",
        keyPoints: [
          "Balance Factor = Height(Left Subtree) - Height(Right Subtree) ∈ {-1, 0, +1}.",
          "Left-Left (LL) imbalance fixed via Right Rotation.",
          "Left-Right (LR) imbalance fixed via Left Rotation on left child followed by Right Rotation on root."
        ],
        diagramTitle: "AVL Left-Right (LR) Double Rotation",
        diagram: `     Node A (BF = +2)                   Node A (BF = +2)               Node C (Balanced)
        /                                  /                              /   \\
      Node B (BF = -1)  ──Left Rotate B─► Node C (BF = +1) ──Right Rotate A─► Node B  Node A
        \\                                 /
        Node C                          Node B`,
        complexities: [
          { operation: "AVL Search / Insert / Delete", best: "O(1)", avg: "O(log n)", worst: "O(log n) Strictly", space: "O(log n)" },
          { operation: "Single / Double Rotation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (AVL Rotations)",
            code: `class AVLNode {
    int key, height;
    AVLNode left, right;
    AVLNode(int d) { key = d; height = 1; }
}

public class AVLTree {
    int height(AVLNode N) { return N == null ? 0 : N.height; }
    int getBalance(AVLNode N) { return N == null ? 0 : height(N.left) - height(N.right); }

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
}`
          }
        ],
        practiceProblems: [
          {
            title: "Balance a Binary Search Tree",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/balance-a-binary-search-tree/",
            platform: "LeetCode",
            topicTag: "AVL Tree"
          }
        ]
      },
      {
        id: "dsa-advanced-trees-trie",
        slug: "advanced-trees-lca-huffman-trie",
        title: "Exp 9: Advanced Trees & Encoding (LCA, Huffman Coding & Trie Prefix Tree)",
        categoryId: "dsa-trees-graphs",
        categoryName: "3. Trees, Multi-way Trees, Graphs & Algorithms",
        difficulty: "Advanced",
        estimatedTime: "35 mins",
        gfgSearchQuery: "Lowest Common Ancestor Huffman coding tree Trie prefix tree Java",
        gfgUrl: "https://www.geeksforgeeks.org/trie-insert-and-search/",
        quickSummary: "Find Lowest Common Ancestor (LCA), construct lossless Huffman coding trees, and implement Trie prefix dictionary lookup.",
        keyPoints: [
          "LCA in binary tree recursively searches left and right subtrees for matching node references.",
          "Huffman coding builds optimal prefix codes by merging lowest-frequency min-heap tree nodes.",
          "Trie (Prefix Tree) provides O(L) prefix search and autocomplete where L is word length."
        ],
        diagramTitle: "Trie Prefix Tree Dictionary Architecture",
        diagram: `                        Root
                      ┌──┴──┐
                     (a)   (c)
                      │     │
                     (p)   (a)
                      │     │
                     (p)   (t)* -> "cat"
                      │
                     (l)
                      │
                     (e)* -> "apple"`,
        complexities: [
          { operation: "Trie Insert / Search Word", best: "O(L)", avg: "O(L)", worst: "O(L)", space: "O(26 * L * N)" },
          { operation: "LCA Query", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(height)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Trie Prefix Tree)",
            code: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEndOfWord;
}

public class Trie {
    private final TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) curr.children[idx] = new TrieNode();
            curr = curr.children[idx];
        }
        curr.isEndOfWord = true;
    }

    public boolean search(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return false;
            curr = curr.children[idx];
        }
        return curr.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        TrieNode curr = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return false;
            curr = curr.children[idx];
        }
        return true;
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Implement Trie (Prefix Tree) (LeetCode #208)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
            platform: "LeetCode",
            topicTag: "Trie"
          },
          {
            title: "Lowest Common Ancestor of a Binary Tree (LeetCode #236)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
            platform: "LeetCode",
            topicTag: "LCA"
          }
        ]
      },
      {
        id: "dsa-multiway-btrees",
        slug: "multi-way-search-trees-b-and-bplus-trees",
        title: "Exp 10: Multi-way Search Trees (B-Trees and B+ Trees)",
        categoryId: "dsa-trees-graphs",
        categoryName: "3. Trees, Multi-way Trees, Graphs & Algorithms",
        difficulty: "Advanced",
        estimatedTime: "30 mins",
        gfgSearchQuery: "B-Tree B+ Tree insertion search disk block indexing Java",
        gfgUrl: "https://www.geeksforgeeks.org/introduction-of-b-tree-2/",
        quickSummary: "Model multi-way balanced search trees optimized for disk block storage with high branching fan-out factors.",
        keyPoints: [
          "B-Tree nodes hold multiple keys (up to M - 1) and M child pointers.",
          "B+ Tree stores all data records exclusively in doubly-linked leaf nodes, enabling fast range scans.",
          "Splits internal nodes at median key when capacity overflows."
        ],
        diagramTitle: "B+ Tree Index Internal Nodes vs Linked Leaf Sequence",
        diagram: `                   [ 50 | 100 ]  (Internal Router Node)
                ┌─────────┼─────────┐
                ▼         ▼         ▼
             [ 20 ]    [ 70 ]    [ 120 ]
             ┌──┴──┐   ┌──┴──┐   ┌──┴──┐
             ▼     ▼   ▼     ▼   ▼     ▼
    Leaves: [10,20]◄-►[50,70]◄-►[100,120] (Linked Leaf Level for Sequential Range Queries)`,
        complexities: [
          { operation: "B-Tree Search / Insert", best: "O(1)", avg: "O(log_M n)", worst: "O(log_M n)", space: "O(n)" },
          { operation: "B+ Tree Range Scan", best: "O(log_M n + k)", avg: "O(log_M n + k)", worst: "O(log_M n + k)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (B-Tree Node Structure)",
            code: `class BTreeNode {
    int[] keys;
    int t; // Minimum degree
    BTreeNode[] C; // Child pointers
    int n; // Current number of keys
    boolean leaf;

    public BTreeNode(int t, boolean leaf) {
        this.t = t;
        this.leaf = leaf;
        this.keys = new int[2 * t - 1];
        this.C = new BTreeNode[2 * t];
        this.n = 0;
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "B-Tree Insertion & Search Fundamentals",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/b-tree-set-1-insert-2/",
            platform: "GeeksforGeeks",
            topicTag: "B-Tree"
          }
        ]
      },
      {
        id: "dsa-graphs-bfs-dfs",
        slug: "graph-representations-and-traversals-bfs-dfs",
        title: "Exp 11: Graph Representations & Traversals (BFS & DFS)",
        categoryId: "dsa-trees-graphs",
        categoryName: "3. Trees, Multi-way Trees, Graphs & Algorithms",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Graph BFS DFS adjacency list matrix Java traversal",
        gfgUrl: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
        quickSummary: "Represent graphs via Adjacency Lists and execute Breadth-First Search (Queue) and Depth-First Search (Recursion).",
        keyPoints: [
          "Adjacency List stores neighbors in O(V + E) memory space compared to O(V^2) matrix.",
          "BFS discovers shortest unweighted paths level-by-level using a FIFO Queue.",
          "DFS traverses deep branch paths using LIFO Call Stack / recursion."
        ],
        diagramTitle: "Graph Traversal: BFS (Level-Order) vs DFS (Depth)",
        diagram: `       (0)
      ┌─┴─┐
     (1) (2)
      │   │
     (3) (4)
     BFS from 0: 0 -> 1 -> 2 -> 3 -> 4 (Queue FIFO)
     DFS from 0: 0 -> 1 -> 3 -> 2 -> 4 (Recursion / Stack)`,
        complexities: [
          { operation: "BFS / DFS Traversal", best: "O(V + E)", avg: "O(V + E)", worst: "O(V + E)", space: "O(V) Visited Set" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (BFS and DFS)",
            code: `import java.util.*;

public class GraphTraversals {
    private Map<Integer, List<Integer>> adj = new HashMap<>();

    public void addEdge(int u, int v) {
        adj.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
        adj.computeIfAbsent(v, k -> new ArrayList<>()).add(u);
    }

    public void bfs(int start) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> q = new LinkedList<>();
        q.add(start);
        visited.add(start);
        System.out.print("BFS Traversal: ");
        while (!q.isEmpty()) {
            int node = q.poll();
            System.out.print(node + " ");
            for (int neighbor : adj.getOrDefault(node, Collections.emptyList())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    q.add(neighbor);
                }
            }
        }
        System.out.println();
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Number of Islands (LeetCode #200)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/number-of-islands/",
            platform: "LeetCode",
            topicTag: "BFS/DFS"
          }
        ]
      },
      {
        id: "dsa-shortest-path-mst",
        slug: "shortest-path-and-mst-dijkstra-prim-kruskal",
        title: "Exp 12: Shortest Path & MST (Dijkstra, Prim's & Kruskal's)",
        categoryId: "dsa-trees-graphs",
        categoryName: "3. Trees, Multi-way Trees, Graphs & Algorithms",
        difficulty: "Advanced",
        estimatedTime: "35 mins",
        gfgSearchQuery: "Dijkstras shortest path algorithm Prims Kruskals MST Java priority queue",
        gfgUrl: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/",
        quickSummary: "Compute single-source shortest paths (Dijkstra) and Minimum Spanning Trees (Prim's & Kruskal's with Disjoint Set Union).",
        keyPoints: [
          "Dijkstra's Algorithm greedily extracts minimum tentative distance vertex via PriorityQueue.",
          "Kruskal's Algorithm sorts all edges by weight and uses Union-Find (DSU) to avoid cycles.",
          "Prim's Algorithm grows a single connected MST tree by adding minimum cut edges."
        ],
        diagramTitle: "Kruskal's Disjoint Set Union (DSU) MST Construction",
        diagram: `  Edges sorted by weight: (B-D: 1), (A-B: 2), (C-D: 3), (A-C: 7)
  1. Add (B-D: 1) -> Sets: {A}, {B, D}, {C}
  2. Add (A-B: 2) -> Sets: {A, B, D}, {C}
  3. Add (C-D: 3) -> Sets: {A, B, C, D} (All V connected, Weight = 6, MST Complete!)`,
        complexities: [
          { operation: "Dijkstra with Min-Heap", best: "O(E log V)", avg: "O(E log V)", worst: "O(E log V)", space: "O(V + E)" },
          { operation: "Kruskal's Algorithm (DSU)", best: "O(E log E)", avg: "O(E log E)", worst: "O(E log E)", space: "O(V)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Dijkstra's Shortest Path)",
            code: `import java.util.*;

class Edge { int to, weight; Edge(int t, int w) { to = t; weight = w; } }

public class DijkstraShortestPath {
    public static int[] dijkstra(int n, List<List<Edge>> adj, int src) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
        pq.offer(new int[]{src, 0});

        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int u = top[0], d = top[1];
            if (d > dist[u]) continue;
            for (Edge e : adj.get(u)) {
                if (dist[u] + e.weight < dist[e.to]) {
                    dist[e.to] = dist[u] + e.weight;
                    pq.offer(new int[]{e.to, dist[e.to]});
                }
            }
        }
        return dist;
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Network Delay Time (LeetCode #743)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/network-delay-time/",
            platform: "LeetCode",
            topicTag: "Dijkstra"
          },
          {
            title: "Min Cost to Connect All Points (LeetCode #1584)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/min-cost-to-connect-all-points/",
            platform: "LeetCode",
            topicTag: "MST Prim/Kruskal"
          }
        ]
      },
      {
        id: "dsa-searching-algorithms",
        slug: "searching-algorithms-linear-binary",
        title: "Exp 13: Searching Algorithms (Linear Search & Binary Search)",
        categoryId: "dsa-trees-graphs",
        categoryName: "3. Trees, Multi-way Trees, Graphs & Algorithms",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "Linear search vs Binary search Java complexity comparison",
        gfgUrl: "https://www.geeksforgeeks.org/binary-search/",
        quickSummary: "Compare sequential array scanning (Linear Search, O(n)) with divide-and-conquer logarithmic reduction (Binary Search, O(log n)).",
        keyPoints: [
          "Linear Search works on unsorted collections by checking elements sequentially.",
          "Binary Search requires a pre-sorted array; halves search interval every comparison.",
          "Prevents integer overflow by computing mid = low + (high - low) / 2."
        ],
        diagramTitle: "Binary Search Interval Bisection",
        diagram: `  Array: [ 2, 5, 8, 12, 16, 23, 38, 56, 72, 91 ] Target = 23
  Step 1: low=0, high=9 -> mid=4 (Val=16 < 23) -> Search Right [5..9]
  Step 2: low=5, high=9 -> mid=7 (Val=56 > 23) -> Search Left  [5..6]
  Step 3: low=5, high=6 -> mid=5 (Val=23 == 23) -> MATCH FOUND in 3 steps!`,
        complexities: [
          { operation: "Linear Search", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Binary Search", best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Binary Search)",
            code: `public class SearchAlgorithms {
    public static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Binary Search (LeetCode #704)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/binary-search/",
            platform: "LeetCode",
            topicTag: "Binary Search"
          }
        ]
      },
      {
        id: "dsa-sorting-algorithms",
        slug: "sorting-algorithms-bubble-merge-quick",
        title: "Exp 14: Sorting Algorithms (Bubble Sort, Merge Sort & Quick Sort)",
        categoryId: "dsa-trees-graphs",
        categoryName: "3. Trees, Multi-way Trees, Graphs & Algorithms",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        visualizerType: "bubble-sort",
        gfgSearchQuery: "Bubble sort Merge sort Quick sort comparative analysis Java",
        gfgUrl: "https://www.geeksforgeeks.org/sorting-algorithms/",
        quickSummary: "Compare quadratic in-place sorting (Bubble Sort) with divide-and-conquer O(n log n) algorithms (Merge Sort & Quick Sort).",
        keyPoints: [
          "Bubble Sort swaps adjacent inverted pairs; achieves O(n) with swapped early exit flag.",
          "Merge Sort recursively splits into halves and merges sorted sub-arrays in guaranteed O(n log n).",
          "Quick Sort partitions around a pivot in-place; average O(n log n)."
        ],
        diagramTitle: "Merge Sort Divide-and-Conquer Tree",
        diagram: `                    [ 38, 27, 43, 3, 9, 82, 10 ]
                      ┌──────────┴──────────┐
               [ 38, 27, 43, 3 ]      [ 9, 82, 10 ]
                 ┌─────┴─────┐          ┌─────┴─────┐
              [38, 27]    [43, 3]     [9, 82]     [10]
                 ▼           ▼          ▼          ▼
              [27, 38]    [3, 43]     [9, 82]     [10]
                 └─────┬─────┘          └─────┬─────┘
               [ 3, 27, 38, 43 ]      [ 9, 10, 82 ]
                      └──────────┬──────────┘
                    [ 3, 9, 10, 27, 38, 43, 82 ] (Sorted)`,
        complexities: [
          { operation: "Bubble Sort", best: "O(n)", avg: "O(n^2)", worst: "O(n^2)", space: "O(1)" },
          { operation: "Merge Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
          { operation: "Quick Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n^2) Skewed Pivot", space: "O(log n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Quick Sort)",
            code: `public class SortingAlgorithms {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high], i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
            }
        }
        int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
        return i + 1;
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Sort an Array (LeetCode #912)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/sort-an-array/",
            platform: "LeetCode",
            topicTag: "Sorting"
          }
        ]
      },
      {
        id: "dsa-hashing-techniques",
        slug: "hashing-separate-chaining-open-addressing",
        title: "Exp 15: Hashing (Separate Chaining, Open Addressing & Dynamic Rehashing)",
        categoryId: "dsa-trees-graphs",
        categoryName: "3. Trees, Multi-way Trees, Graphs & Algorithms",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Hashing collision resolution separate chaining linear probing quadratic rehashing Java",
        gfgUrl: "https://www.geeksforgeeks.org/hashing-data-structure/",
        quickSummary: "Resolve hash collisions using Separate Chaining (Linked Lists) and Open Addressing (Linear/Quadratic Probing) with dynamic rehashing at load factor alpha >= 0.75.",
        keyPoints: [
          "Hash function maps keys to bucket indices: h(k) = k % capacity.",
          "Separate Chaining resolves collisions by appending colliding items to bucket linked lists.",
          "Open Addressing searches subsequent open slots: h(k, i) = (h(k) + i) % capacity (Linear) or (h(k) + i^2) % capacity (Quadratic).",
          "Dynamic Rehashing doubles table capacity when load factor exceeds threshold."
        ],
        diagramTitle: "Separate Chaining vs Linear Probing Hash Collisions",
        diagram: `  Separate Chaining:
  Bucket [0] ──► NULL
  Bucket [1] ──► [ Key: 15 | Next ] ──► [ Key: 29 | Next: NULL ] (Collisions chained)
  Bucket [2] ──► [ Key: 8  | Next: NULL ]

  Linear Probing (Open Addressing):
  Index [0]  [1: Key 15]  [2: Key 29 (Probed)]  [3: Key 8]`,
        complexities: [
          { operation: "Separate Chaining Search", best: "O(1)", avg: "O(1 + alpha)", worst: "O(n)", space: "O(n)" },
          { operation: "Linear Probing Insert", best: "O(1)", avg: "O(1 / (1 - alpha))", worst: "O(n)", space: "O(capacity)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Separate Chaining Hash Table)",
            code: `class HashNode<K, V> {
    K key; V value;
    HashNode<K, V> next;
    public HashNode(K k, V v) { this.key = k; this.value = v; }
}

public class HashTable<K, V> {
    private HashNode<K, V>[] buckets;
    private int capacity, size;

    @SuppressWarnings("unchecked")
    public HashTable(int cap) {
        this.capacity = cap;
        this.buckets = new HashNode[cap];
        this.size = 0;
    }

    private int getBucketIndex(K key) {
        return Math.abs(key.hashCode()) % capacity;
    }

    public void put(K key, V value) {
        int idx = getBucketIndex(key);
        HashNode<K, V> head = buckets[idx];
        while (head != null) {
            if (head.key.equals(key)) { head.value = value; return; }
            head = head.next;
        }
        size++;
        HashNode<K, V> newNode = new HashNode<>(key, value);
        newNode.next = buckets[idx];
        buckets[idx] = newNode;
    }

    public V get(K key) {
        int idx = getBucketIndex(key);
        HashNode<K, V> head = buckets[idx];
        while (head != null) {
            if (head.key.equals(key)) return head.value;
            head = head.next;
        }
        return null;
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Design HashMap (LeetCode #706)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/design-hashmap/",
            platform: "LeetCode",
            topicTag: "Hashing"
          }
        ]
      }
    ]
  }
];
