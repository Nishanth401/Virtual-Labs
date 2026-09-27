import { DSACategory } from "../dsa-topic-data";

export const DSA_LAB_ROADMAP_CATEGORIES: DSACategory[] = [
  // ========================================================
  // MODULE 1: LINKED LISTS (0/3)
  // ========================================================
  {
    id: "dsa-linked-lists",
    name: "1. Linked Lists",
    shortDesc: "Singly, Doubly, and Circular Linked Lists, Cycle Detection, and Merging.",
    iconName: "Code2",
    topics: [
      {
        id: "dsa-singly-linked-list",
        slug: "implement-singly-linked-list",
        title: "Exp 1: Implement a Singly Linked List and Perform Insertion, Deletion, Searching, and Traversal Operations",
        categoryId: "dsa-linked-lists",
        categoryName: "1. Linked Lists",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        visualizerType: "linked-list",
        gfgSearchQuery: "Singly linked list insertion deletion search traversal Java",
        gfgUrl: "https://www.geeksforgeeks.org/data-structures/linked-list/singly-linked-list/",
        quickSummary: "Build a singly linked list from scratch with node-based insertion, deletion, search, and traversal.",
        keyPoints: [
          "Node pointer structure: Each node stores data and a pointer/reference to the next node.",
          "Pointer re-linking: Insertion/deletion at head, tail, or a given position requires pointer re-linking.",
          "Traversal termination: Traversal walks the list from head until a null reference is reached."
        ],
        diagramTitle: "Singly Linked List Node References",
        diagram: `  Head ──► [ Data: 10 | Next ] ──► [ Data: 20 | Next ] ──► [ Data: 30 | Next: NULL ]`,
        complexities: [
          { operation: "Insert at head / Search", best: "O(1) / O(1)", avg: "O(1) / O(n)", worst: "O(1) / O(n)", space: "O(n)" }
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

    public boolean search(int key) {
        ListNode curr = head;
        while (curr != null) {
            if (curr.val == key) return true;
            curr = curr.next;
        }
        return false;
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
            title: "Design Linked List (LeetCode #707)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/design-linked-list/",
            platform: "LeetCode",
            topicTag: "Linked List"
          }
        ]
      },
      {
        id: "dsa-doubly-circular-ll",
        slug: "implement-doubly-and-circular-linked-list",
        title: "Exp 2: Implement Doubly Linked List and Circular Linked List with Insertion and Deletion at Different Positions",
        categoryId: "dsa-linked-lists",
        categoryName: "1. Linked Lists",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Doubly linked list circular linked list Java insertion deletion",
        gfgUrl: "https://www.geeksforgeeks.org/doubly-linked-list/",
        quickSummary: "Extend the linked list to support backward traversal (doubly) and a circular structure with wrap-around links.",
        keyPoints: [
          "Bidirectional navigation: Doubly linked nodes maintain both next and prev pointers, enabling bidirectional traversal.",
          "Circular boundary link: Circular lists link the tail back to the head, removing the null-terminated end.",
          "Pointer preservation: Insertion/deletion must correctly update all affected neighboring pointers to preserve list integrity."
        ],
        diagramTitle: "Doubly & Circular Linked List Architectures",
        diagram: `  Doubly:   NULL ◄── [ Prev | 10 | Next ] ◄──► [ Prev | 20 | Next ] ──► NULL
  Circular: Head ──► [ 10 | Next ] ──► [ 20 | Next ] ──┐
             ▲                                         │
             └─────────────────────────────────────────┘`,
        complexities: [
          { operation: "Insert/Delete at position", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Doubly Linked List)",
            code: `class DLLNode {
    int val;
    DLLNode prev, next;
    DLLNode(int v) { this.val = v; }
}

public class DoublyLinkedList {
    private DLLNode head, tail;

    public void insertEnd(int val) {
        DLLNode newNode = new DLLNode(val);
        if (head == null) {
            head = tail = newNode;
        } else {
            tail.next = newNode;
            newNode.prev = tail;
            tail = newNode;
        }
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Doubly Linked List Tutorial",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/doubly-linked-list/",
            platform: "GeeksforGeeks",
            topicTag: "Doubly Linked List"
          }
        ]
      },
      {
        id: "dsa-ll-applications",
        slug: "linked-list-applications-reverse-cycle-merge",
        title: "Exp 3: Linked List Applications — Reverse a Singly Linked List, Detect a Cycle Using Fast and Slow Pointer Technique, Merge Two Sorted Linked Lists",
        categoryId: "dsa-linked-lists",
        categoryName: "1. Linked Lists",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Reverse linked list Floyd cycle detection merge two sorted lists Java",
        gfgUrl: "https://www.geeksforgeeks.org/reverse-a-linked-list/",
        quickSummary: "Solve three classic linked-list problems building on the base structure.",
        keyPoints: [
          "Iterative reversal: Reversing a list iteratively re-points each node's next to its predecessor.",
          "Floyd's cycle detection: The Fast/Slow (Floyd's) pointer technique detects a cycle when the two pointers meet.",
          "Sorted interleaving: Merging two sorted lists interleaves nodes by comparing values, producing one sorted list without extra arrays."
        ],
        diagramTitle: "Floyd's Fast & Slow Pointer Cycle Detection",
        diagram: `  [ 1 ] ──► [ 2 ] ──► [ 3 (Slow) ] ──► [ 4 ]
                         ▲                     │
                         └── [ 6 (Fast) ] ◄── [ 5 ]`,
        complexities: [
          { operation: "Reverse / Cycle detect / Merge", best: "O(n) each", avg: "O(n)", worst: "O(n)", space: "O(1) (reverse/cycle) / O(1) (merge, in-place)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Reverse & Floyd's Cycle)",
            code: `public class LinkedListApplications {
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

    public static boolean hasCycle(ListNode head) {
        if (head == null) return false;
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
            title: "Reverse Linked List (LeetCode #206)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/reverse-linked-list/",
            platform: "LeetCode",
            topicTag: "Reversal"
          },
          {
            title: "Linked List Cycle (LeetCode #141)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/linked-list-cycle/",
            platform: "LeetCode",
            topicTag: "Cycle Detection"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 2: STACKS & QUEUES (0/3)
  // ========================================================
  {
    id: "dsa-stacks-queues",
    name: "2. Stacks & Queues",
    shortDesc: "LIFO/FIFO ADTs, expression conversion, balancing, and sliding window maximum.",
    iconName: "Layers",
    topics: [
      {
        id: "dsa-stack-implementation",
        slug: "implement-stack-arrays-linked-lists",
        title: "Exp 4: Implement Stack Using Arrays and Linked Lists — Push, Pop, Peek, Display",
        categoryId: "dsa-stacks-queues",
        categoryName: "2. Stacks & Queues",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        visualizerType: "stack",
        gfgSearchQuery: "Stack implementation array linked list Push Pop Peek Java",
        gfgUrl: "https://www.geeksforgeeks.org/stack-data-structure/",
        quickSummary: "Implement the stack ADT using both an array-backed and a linked-list-backed representation.",
        keyPoints: [
          "LIFO discipline: A stack follows Last-In-First-Out (LIFO) ordering.",
          "Dual representation: Array-based stacks need a top index and fixed/resizable capacity; linked-list stacks push/pop at the head node.",
          "Constant-time ops: Push/Pop/Peek are all designed to run in constant O(1) time."
        ],
        diagramTitle: "Stack LIFO Memory Architecture",
        diagram: `          Push(30) ──► ┌──────────┐ ◄── Pop()
                       │  30 (Top)│
                       ├──────────┤
                       │    20    │
                       ├──────────┤
                       │    10    │
                       └──────────┘`,
        complexities: [
          { operation: "Push/Pop/Peek", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Array-Based Stack)",
            code: `public class ArrayStack {
    private int[] arr;
    private int top;
    private int capacity;

    public ArrayStack(int cap) {
        this.capacity = cap;
        this.arr = new int[cap];
        this.top = -1;
    }

    public void push(int val) {
        if (top == capacity - 1) throw new StackOverflowError();
        arr[++top] = val;
    }

    public int pop() {
        if (top == -1) throw new RuntimeException("Stack Underflow");
        return arr[top--];
    }

    public int peek() {
        if (top == -1) throw new RuntimeException("Stack Empty");
        return arr[top];
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Implement Stack using Queues (LeetCode #225)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/implement-stack-using-queues/",
            platform: "LeetCode",
            topicTag: "Stack"
          }
        ]
      },
      {
        id: "dsa-infix-postfix-parens",
        slug: "infix-to-postfix-evaluation-parentheses-balancing",
        title: "Exp 5: Infix to Postfix Conversion, Postfix Expression Evaluation, Parentheses Balancing",
        categoryId: "dsa-stacks-queues",
        categoryName: "2. Stacks & Queues",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Infix to postfix conversion evaluation parentheses balancing Java stack",
        gfgUrl: "https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/",
        quickSummary: "Use a stack to convert infix expressions to postfix, evaluate postfix expressions, and check balanced parentheses.",
        keyPoints: [
          "Precedence popping: Operator precedence and a stack determine when to pop operators during infix-to-postfix conversion.",
          "Postfix evaluation: Postfix evaluation pushes operands and applies operators to the top two stack values as they're encountered.",
          "Bracket pairing: Parentheses balancing pushes opening brackets and matches/pops them against closing brackets."
        ],
        diagramTitle: "Infix to Postfix & Evaluation",
        diagram: `  Infix: (A + B) * C  ──► Postfix: A B + C *
  Evaluation (2 3 + 4 *): Push(2), Push(3), '+' -> Pop 3,2 -> Push(5), Push(4), '*' -> Result: 20`,
        complexities: [
          { operation: "Conversion/Evaluation/Balance check", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Valid Parentheses)",
            code: `import java.util.Stack;

public class ExpressionStack {
    public static boolean isValidParentheses(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') stack.push(c);
            else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }
        return stack.isEmpty();
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
            topicTag: "Stack"
          }
        ]
      },
      {
        id: "dsa-circular-priority-queue",
        slug: "circular-queue-priority-queue-sliding-window",
        title: "Exp 6: Circular Queue, Priority Queue, Sliding Window Maximum Using Queue",
        categoryId: "dsa-stacks-queues",
        categoryName: "2. Stacks & Queues",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Circular queue priority queue sliding window maximum deque Java",
        gfgUrl: "https://www.geeksforgeeks.org/circular-queue-set-1-introduction-array-implementation/",
        quickSummary: "Implement a circular queue to reuse freed slots, a priority queue where elements are served by priority, and a deque-based sliding window maximum algorithm.",
        keyPoints: [
          "Modulo index wrap: A circular queue wraps front/rear indices modulo capacity to reuse array space.",
          "Priority dispatch: A priority queue (often heap-backed) dequeues the highest/lowest-priority element first rather than FIFO.",
          "Monotonic deque: The sliding window maximum uses a deque that discards indices outside the window or with smaller values, keeping the max accessible at the front."
        ],
        diagramTitle: "Circular Queue Index Wrapping",
        diagram: `  Capacity = 5:  [ 0 | 1 | 2 | 3 | 4 ]
                 rear = (rear + 1) % 5
                 front = (front + 1) % 5`,
        complexities: [
          { operation: "Enqueue/Dequeue / Sliding window scan", best: "O(1) / O(n) total", avg: "O(1) / O(n)", worst: "O(1) or O(log n) heap / O(n)", space: "O(n)" }
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
}`
          }
        ],
        practiceProblems: [
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

  // ========================================================
  // MODULE 3: TREES (0/4)
  // ========================================================
  {
    id: "dsa-trees",
    name: "3. Trees",
    shortDesc: "Binary search trees, AVL balancing rotations, Huffman/Tries, and B/B+ trees.",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "dsa-bst-operations",
        slug: "implement-binary-search-tree",
        title: "Exp 7: Implement Binary Search Tree (BST) with Insertion, Deletion, Searching, and Traversal Operations",
        categoryId: "dsa-trees",
        categoryName: "3. Trees",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        visualizerType: "binary-tree",
        gfgSearchQuery: "Binary Search Tree BST insertion deletion traversal Inorder Java",
        gfgUrl: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/",
        quickSummary: "Build a BST maintaining the left-smaller/right-larger ordering property, with standard operations and in/pre/post-order traversals.",
        keyPoints: [
          "Recursive BST search: BST insertion/search recursively compares the target value to decide left or right subtree traversal.",
          "Three-case deletion: Deletion handles three cases: leaf node, one child, and two children (successor replacement).",
          "In-order sortedness: In-order traversal of a BST yields values in sorted order."
        ],
        diagramTitle: "Binary Search Tree & Inorder Successor Deletion",
        diagram: `                    [ 50 ]
                  ┌───┴───┐
                [ 30 ]  [ 70 ]
               ┌──┴──┐  ┌──┴──┐
             [ 20 ] [40][ 60 ][ 80 ]
         Delete(50): Replace with Inorder Successor (60)`,
        complexities: [
          { operation: "Insert/Search/Delete", best: "O(log n)", avg: "O(log n)", worst: "O(n) (skewed tree)", space: "O(n)" }
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
        slug: "implement-avl-tree-rotations",
        title: "Exp 8: Implement AVL Tree and Perform Balancing Through Rotations During Insertion",
        categoryId: "dsa-trees",
        categoryName: "3. Trees",
        difficulty: "Advanced",
        estimatedTime: "35 mins",
        gfgSearchQuery: "AVL tree rotations LL RR LR RL balance factor insertion Java",
        gfgUrl: "https://www.geeksforgeeks.org/avl-tree-set-1-insertion/",
        quickSummary: "Extend the BST with self-balancing logic, using rotation operations to keep the tree height balanced after insertion.",
        keyPoints: [
          "Balance factor tracking: A balance factor (height difference of left/right subtrees) is tracked at every node.",
          "Four rotation types: Left, Right, Left-Right, and Right-Left rotations restore balance when the factor exceeds ±1.",
          "Guaranteed height: Maintaining balance guarantees O(log n) height regardless of insertion order."
        ],
        diagramTitle: "AVL Left-Right (LR) Double Rotation",
        diagram: `     Node A (BF = +2)                   Node A (BF = +2)               Node C (Balanced)
        /                                  /                              /   \\
      Node B (BF = -1)  ──Left Rotate B─► Node C (BF = +1) ──Right Rotate A─► Node B  Node A
        \\                                 /
        Node C                          Node B`,
        complexities: [
          { operation: "Insert with rebalancing", best: "O(log n)", avg: "O(log n)", worst: "O(log n)", space: "O(n)" }
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
}`
          }
        ],
        practiceProblems: [
          {
            title: "Balance a Binary Search Tree (LeetCode #1382)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/balance-a-binary-search-tree/",
            platform: "LeetCode",
            topicTag: "AVL Tree"
          }
        ]
      },
      {
        id: "dsa-lca-huffman-trie",
        slug: "lca-huffman-coding-tree-trie",
        title: "Exp 9: Lowest Common Ancestor (LCA) in a Binary Tree, Huffman Coding Tree Construction, Trie (Prefix Tree) for Dictionary Applications",
        categoryId: "dsa-trees",
        categoryName: "3. Trees",
        difficulty: "Advanced",
        estimatedTime: "35 mins",
        gfgSearchQuery: "Lowest Common Ancestor Huffman coding tree Trie prefix tree Java",
        gfgUrl: "https://www.geeksforgeeks.org/trie-insert-and-search/",
        quickSummary: "Solve three distinct tree problems — finding the LCA of two nodes, building a Huffman tree for compression, and building a Trie for prefix-based word lookup.",
        keyPoints: [
          "Recursive split point: LCA is found by recursively searching both subtrees and identifying the split point where paths diverge.",
          "Min-heap merging: Huffman coding repeatedly merges the two lowest-frequency nodes using a min-heap to build an optimal prefix-code tree.",
          "Prefix paths: A Trie stores strings character-by-character along tree paths, enabling fast prefix search and autocomplete."
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
          { operation: "LCA / Huffman build / Trie insert-search", best: "O(log n)/O(n log n)/O(L)", avg: "same", worst: "O(n)/O(n log n)/O(L) (L=word length)", space: "O(n)" }
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
          }
        ]
      },
      {
        id: "dsa-b-tree-b-plus-tree",
        slug: "insertion-searching-b-tree-b-plus-tree",
        title: "Exp 10: Implement Insertion and Searching Operations in B-Tree and B+ Tree",
        categoryId: "dsa-trees",
        categoryName: "3. Trees",
        difficulty: "Advanced",
        estimatedTime: "30 mins",
        gfgSearchQuery: "B-Tree B+ Tree insertion search disk block indexing Java",
        gfgUrl: "https://www.geeksforgeeks.org/introduction-of-b-tree-2/",
        quickSummary: "Implement multi-way search trees (B-Tree and B+ Tree) commonly used in database/file-system indexing.",
        keyPoints: [
          "Multi-key nodes: Each B-Tree/B+ Tree node holds multiple keys and children, keeping the tree shallow for large datasets.",
          "Node splitting invariant: Node splitting during insertion maintains the minimum/maximum key-count invariant per node.",
          "Sequential leaf links: B+ Trees additionally link all leaf nodes sequentially, optimizing range queries."
        ],
        diagramTitle: "B+ Tree Index Internal Router vs Linked Leaves",
        diagram: `                   [ 50 | 100 ]  (Internal Router)
                ┌─────────┼─────────┐
                ▼         ▼         ▼
             [ 20 ]    [ 70 ]    [ 120 ]
             ┌──┴──┐   ┌──┴──┐   ┌──┴──┐
    Leaves: [10,20]◄-►[50,70]◄-►[100,120] (Linked Leaf Level)`,
        complexities: [
          { operation: "Insert/Search", best: "O(log n)", avg: "O(log n)", worst: "O(log n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (B-Tree Node Definition)",
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
            url: "https://www.geeksforgeeks.org/introduction-of-b-tree-2/",
            platform: "GeeksforGeeks",
            topicTag: "B-Tree"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 4: GRAPHS (0/2)
  // ========================================================
  {
    id: "dsa-graphs",
    name: "4. Graphs",
    shortDesc: "Adjacency matrix/lists, BFS/DFS, Dijkstra shortest paths, and Prim/Kruskal MST.",
    iconName: "Network",
    topics: [
      {
        id: "dsa-graph-traversals-bfs-dfs",
        slug: "graph-adjacency-matrix-list-bfs-dfs",
        title: "Exp 11: Represent Graphs Using Adjacency Matrix and Adjacency List; Perform BFS and DFS",
        categoryId: "dsa-graphs",
        categoryName: "4. Graphs",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Graph BFS DFS adjacency list matrix Java traversal",
        gfgUrl: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
        quickSummary: "Represent a graph two ways and implement Breadth-First and Depth-First traversal on it.",
        keyPoints: [
          "Dual representation: An adjacency matrix stores edges in an n×n grid (fast lookup, more space); an adjacency list stores per-vertex neighbor lists (space-efficient for sparse graphs).",
          "Queue-based BFS: BFS explores neighbors level-by-level using a queue.",
          "Recursive DFS: DFS explores as deep as possible along each branch using recursion or an explicit stack."
        ],
        diagramTitle: "Graph Traversals: BFS Level-Order vs DFS Depth-First",
        diagram: `       (0)
      ┌─┴─┐
     (1) (2)
      │   │
     (3) (4)
     BFS from 0: 0 -> 1 -> 2 -> 3 -> 4 (Queue FIFO)
     DFS from 0: 0 -> 1 -> 3 -> 2 -> 4 (Recursion / Stack)`,
        complexities: [
          { operation: "BFS/DFS", best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)", space: "O(V) (matrix: O(V²))" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Graph BFS & DFS)",
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
            title: "Clone Graph (LeetCode #133)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/clone-graph/",
            platform: "LeetCode",
            topicTag: "Graph"
          }
        ]
      },
      {
        id: "dsa-dijkstra-prim-kruskal",
        slug: "dijkstra-prim-kruskal-algorithms",
        title: "Exp 12: Dijkstra's Shortest Path Algorithm, Prim's Minimum Spanning Tree Algorithm, Kruskal's Minimum Spanning Tree Algorithm",
        categoryId: "dsa-graphs",
        categoryName: "4. Graphs",
        difficulty: "Advanced",
        estimatedTime: "35 mins",
        gfgSearchQuery: "Dijkstras shortest path algorithm Prims Kruskals MST Java priority queue",
        gfgUrl: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/",
        quickSummary: "Implement three classic greedy graph algorithms for shortest paths and minimum spanning trees.",
        keyPoints: [
          "Greedy shortest paths: Dijkstra's Algorithm greedily expands the nearest unvisited vertex using a priority queue to find shortest paths from a source.",
          "Cut property: Prim's Algorithm grows a minimum spanning tree one edge at a time by always adding the cheapest edge connecting a new vertex.",
          "Cycle-avoidance with DSU: Kruskal's Algorithm sorts all edges by weight and adds them greedily while avoiding cycles, using a Union-Find structure."
        ],
        diagramTitle: "Kruskal's Disjoint Set Union (DSU) MST Construction",
        diagram: `  Edges sorted by weight: (B-D: 1), (A-B: 2), (C-D: 3), (A-C: 7)
  1. Add (B-D: 1) -> Sets: {A}, {B, D}, {C}
  2. Add (A-B: 2) -> Sets: {A, B, D}, {C}
  3. Add (C-D: 3) -> Sets: {A, B, C, D} (All V connected, Weight = 6)`,
        complexities: [
          { operation: "Dijkstra/Prim/Kruskal", best: "O((V+E) log V)", avg: "same", worst: "O((V+E) log V) / O(E log E) (Kruskal)", space: "O(V+E)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Dijkstra)",
            code: `import java.util.*;

class Edge { int to, weight; Edge(int t, int w) { to = t; weight = w; } }

public class DijkstraAlgorithm {
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
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 5: SEARCHING, SORTING & HASHING (0/3)
  // ========================================================
  {
    id: "dsa-searching-sorting-hashing",
    name: "5. Searching, Sorting & Hashing",
    shortDesc: "Linear/Binary search, Bubble/Merge/Quick sorting, and hash collision resolution.",
    iconName: "Sparkles",
    topics: [
      {
        id: "dsa-linear-binary-search",
        slug: "compare-linear-and-binary-search",
        title: "Exp 13: Implement and Compare Linear Search and Binary Search",
        categoryId: "dsa-searching-sorting-hashing",
        categoryName: "5. Searching, Sorting & Hashing",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "Linear search vs Binary search Java complexity comparison",
        gfgUrl: "https://www.geeksforgeeks.org/binary-search/",
        quickSummary: "Implement both search strategies and compare their efficiency on sorted vs. unsorted data.",
        keyPoints: [
          "Sequential scan: Linear search checks each element sequentially, working on unsorted data.",
          "Interval bisection: Binary search repeatedly halves the search range on sorted data by comparing against the midpoint.",
          "Sorted precondition: The precondition (sortedness) is what enables binary search's logarithmic advantage."
        ],
        diagramTitle: "Binary Search Interval Bisection",
        diagram: `  Array: [ 2, 5, 8, 12, 16, 23, 38, 56, 72, 91 ] Target = 23
  Step 1: low=0, high=9 -> mid=4 (Val=16 < 23) -> Search Right [5..9]
  Step 2: low=5, high=9 -> mid=7 (Val=56 > 23) -> Search Left  [5..6]
  Step 3: low=5, high=6 -> mid=5 (Val=23 == 23) -> MATCH FOUND in 3 steps!`,
        complexities: [
          { operation: "Linear/Binary search", best: "O(1)", avg: "O(n)/O(log n)", worst: "O(n)/O(log n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Binary Search)",
            code: `public class SearchComparison {
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
        id: "dsa-bubble-merge-quick-sort",
        slug: "analyze-bubble-merge-quick-sort",
        title: "Exp 14: Implement and Analyze Bubble Sort, Merge Sort, Quick Sort",
        categoryId: "dsa-searching-sorting-hashing",
        categoryName: "5. Searching, Sorting & Hashing",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        visualizerType: "bubble-sort",
        gfgSearchQuery: "Bubble sort Merge sort Quick sort comparative analysis Java",
        gfgUrl: "https://www.geeksforgeeks.org/sorting-algorithms/",
        quickSummary: "Implement three sorting algorithms with contrasting strategies and compare their time complexity behavior.",
        keyPoints: [
          "Adjacent swaps: Bubble Sort repeatedly swaps adjacent out-of-order elements until the array is sorted.",
          "Stable divide-and-conquer: Merge Sort recursively divides the array, sorts halves, and merges them — a stable divide-and-conquer approach.",
          "Pivot partitioning: Quick Sort partitions around a pivot and recursively sorts each side, with performance highly dependent on pivot choice."
        ],
        diagramTitle: "Merge Sort Divide-and-Conquer Hierarchy",
        diagram: `                    [ 38, 27, 43, 3, 9, 82, 10 ]
                      ┌──────────┴──────────┐
               [ 38, 27, 43, 3 ]      [ 9, 82, 10 ]
                  ▼           ▼          ▼          ▼
               [ 3, 27, 38, 43 ]      [ 9, 10, 82 ]
                      └──────────┬──────────┘
                    [ 3, 9, 10, 27, 38, 43, 82 ] (Sorted)`,
        complexities: [
          { operation: "Bubble/Merge/Quick", best: "O(n)/O(n log n)/O(n log n)", avg: "O(n²)/O(n log n)/O(n log n)", worst: "O(n²)/O(n log n)/O(n²)", space: "O(1)/O(n)/O(log n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Quick Sort)",
            code: `public class QuickSortAlgorithm {
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
        id: "dsa-hash-tables-collision",
        slug: "hash-tables-chaining-addressing-rehashing",
        title: "Exp 15: Implement Hash Tables Using Separate Chaining, Open Addressing, and Rehashing Technique",
        categoryId: "dsa-searching-sorting-hashing",
        categoryName: "5. Searching, Sorting & Hashing",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Hashing collision resolution separate chaining linear probing quadratic rehashing Java",
        gfgUrl: "https://www.geeksforgeeks.org/hashing-data-structure/",
        quickSummary: "Build a hash table and implement three collision-resolution strategies plus dynamic rehashing when load factor grows too high.",
        keyPoints: [
          "Bucket chaining: Separate chaining stores colliding entries in a linked list/bucket per hash slot.",
          "Open probing: Open addressing probes for the next free slot (linear/quadratic/double hashing) within the same array.",
          "Dynamic resizing: Rehashing resizes the table and reinserts all entries once the load factor exceeds a threshold, restoring near-constant-time operations."
        ],
        diagramTitle: "Separate Chaining vs Open Addressing Probing",
        diagram: `  Separate Chaining:
  Bucket [1] ──► [ Key: 15 | Next ] ──► [ Key: 29 | Next: NULL ]
  Open Addressing (Linear Probing):
  Index [0]  [1: Key 15]  [2: Key 29 (Probed)]  [3: Free]`,
        complexities: [
          { operation: "Insert/Search/Delete", best: "O(1)", avg: "O(1)", worst: "O(n) (heavy collisions)", space: "O(n)" }
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
