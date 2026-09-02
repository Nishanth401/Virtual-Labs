import { Experiment } from "../experiments";

export const DSA_EXPERIMENTS: Experiment[] = [
  {
    id: "dsa-exp-1",
    labId: "data-structures",
    title: "Exp 1: Singly Linked List: Insertion, deletion, searching, and traversal operations.",
    slug: "singly-linked-list-operations",
    difficulty: "Beginner",
    category: "Linear Structures" as any,
    estimatedMinutes: 25,
    rating: 4.95,
    ratingsCount: 160,
    simulator: "linked-list",
    quizId: "quiz-dsa-1",
    sections: {
      introduction: "A Singly Linked List is a fundamental dynamic data structure consisting of sequentially connected nodes where each node stores a data value and a pointer reference to the next node.",
      objective: "Implement dynamic node allocations with head/tail insertion, target deletion, key search, and forward traversal.",
      videoUrl: "https://www.youtube-nocookie.com/embed/F8AbOfQwl1c",
      videoTitle: "Singly Linked List in Java",
      videoChannel: "Abdul Bari",
      prerequisites: ["Pointers / Object References", "Dynamic Memory Allocation"],
      theory: {
        overview: "Unlike static arrays with contiguous memory requirements, linked lists allocate memory dynamically per node on the heap. Inserting at head is O(1); search and deletion require O(n) traversal.",
        keyConcepts: [
          { title: "Dynamic Memory Heap Allocation", desc: "No fixed size limits or expensive array resizing required." },
          { title: "O(1) Head Insertion", desc: "newNode.next = head; head = newNode executes in constant time." },
          { title: "Traversal & Search", desc: "Linear pointer advancement (curr = curr.next) until matching key or null." }
        ],
        complexities: [
          { operation: "Insert at Head", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Search / Traverse", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Delete by Value", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Undo history stacks in text editors",
          "Memory allocation free-list management in operating systems",
          "Blockchain ledger block linkage structures"
        ]
      },
      procedure: [
        "1. Define ListNode class with int val and ListNode next.",
        "2. Implement insertHead(val) and insertTail(val).",
        "3. Implement deleteValue(key) updating predecessor next pointer.",
        "4. Implement display() printing node sequence.",
        "5. Test all operations."
      ],
      sampleCode: {
        language: "java",
        code: `class ListNode {
    int val;
    ListNode next;
    ListNode(int v) { this.val = v; }
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
        while (curr.next != null && curr.next.val != key) curr = curr.next;
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

    public static void main(String[] args) {
        SinglyLinkedList list = new SinglyLinkedList();
        list.insertHead(30);
        list.insertHead(20);
        list.insertHead(10);
        list.display();
        list.deleteValue(20);
        list.display();
    }
}`
      },
      expectedOutput: `10 -> 20 -> 30 -> null
10 -> 30 -> null`,
      leetcodeProblems: [
        {
          id: 9,
          title: "Design Linked List",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/design-linked-list/",
          description: "Design your implementation of the linked list.",
          approach: "Implement Singly Linked List with head, tail, and size pointers.",
          javaSnippet: `// Solution`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dsa-exp-2",
    labId: "data-structures",
    title: "Exp 2: Doubly and Circular Linked Lists: Multi-point insertion and deletion routines.",
    slug: "doubly-and-circular-linked-lists",
    difficulty: "Beginner",
    category: "Linear Structures" as any,
    estimatedMinutes: 25,
    rating: 4.93,
    ratingsCount: 135,
    simulator: "linked-list",
    quizId: "quiz-dsa-2",
    sections: {
      introduction: "Doubly Linked Lists support bidirectional traversal via prev and next pointers, while Circular Linked Lists connect tail back to head for continuous looping buffers.",
      objective: "Implement Doubly Linked List with O(1) node deletion and Circular Linked List traversal.",
      videoUrl: "https://www.youtube-nocookie.com/embed/F8AbOfQwl1c",
      videoTitle: "Doubly & Circular Linked Lists",
      videoChannel: "Abdul Bari",
      prerequisites: ["Singly Linked List", "Pointers"],
      theory: {
        overview: "Doubly linked lists allow O(1) node deletion given node reference without traversing to find the predecessor. Circular lists maintain a continuous loop.",
        keyConcepts: [
          { title: "Bidirectional Pointers", desc: "Node stores prev and next references." },
          { title: "Circular Wrap", desc: "tail.next = head allows indefinite cyclic traversals." }
        ],
        complexities: [
          { operation: "Doubly LL Node Deletion", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Web browser Back and Forward history buttons",
          "Music playlist continuous loop playback buffers",
          "Operating system Round Robin CPU task queues"
        ]
      },
      procedure: [
        "1. Define DNode class with prev and next pointers.",
        "2. Implement insertEnd() and removeNode(DNode node).",
        "3. Output forward and reverse traversals."
      ],
      sampleCode: {
        language: "java",
        code: `class DNode {
    int val;
    DNode prev, next;
    DNode(int v) { this.val = v; }
}

public class DoublyLinkedListDemo {
    public static void main(String[] args) {
        DNode n1 = new DNode(10), n2 = new DNode(20), n3 = new DNode(30);
        n1.next = n2; n2.prev = n1;
        n2.next = n3; n3.prev = n2;
        System.out.println("Doubly Linked List initialized: [10] <-> [20] <-> [30]");
    }
}`
      },
      expectedOutput: `Doubly Linked List initialized: [10] <-> [20] <-> [30]`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dsa-exp-3",
    labId: "data-structures",
    title: "Exp 3: Linked List Applications: Reversing a linked list, cycle detection using Floyd’s Cycle-Finding Algorithm (Fast and Slow Pointer), and merging two sorted lists.",
    slug: "linked-list-applications-reverse-cycle-merge",
    difficulty: "Intermediate",
    category: "Linear Structures" as any,
    estimatedMinutes: 30,
    rating: 4.96,
    ratingsCount: 155,
    simulator: "linked-list",
    quizId: "quiz-dsa-3",
    sections: {
      introduction: "Essential linked list interview algorithms: In-Place Pointer Reversal, Floyd's Tortoise and Hare Cycle Detection, and Two-Pointer Sorted Merge.",
      objective: "Implement in-place reversal in O(n) time and O(1) space, detect cyclic loops via fast/slow pointers, and merge two sorted lists.",
      videoUrl: "https://www.youtube-nocookie.com/embed/F8AbOfQwl1c",
      videoTitle: "Floyd's Cycle Finding Algorithm",
      videoChannel: "NeetCode",
      prerequisites: ["Singly Linked List", "Two-Pointer Technique"],
      theory: {
        overview: "Floyd's algorithm moves slow by 1 step and fast by 2 steps. If a cycle exists, fast will catch slow in O(n) time and O(1) space. In-place reversal updates: nextTemp = curr.next; curr.next = prev; prev = curr; curr = nextTemp.",
        keyConcepts: [
          { title: "Floyd's Tortoise & Hare", desc: "Fast pointer closes distance gap by 1 node per iteration within the loop." },
          { title: "In-Place Pointer Reversal", desc: "Reverses list direction without allocating any new nodes." },
          { title: "Two-Pointer Sorted Merge", desc: "Merges two sorted lists in O(n + m) time." }
        ],
        complexities: [
          { operation: "Floyd's Cycle Detection", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "In-Place List Reversal", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Memory leak circular reference detection in garbage collectors",
          "Network packet routing loop detection",
          "Merge Sort on linked list data structures"
        ]
      },
      procedure: [
        "1. Create singly linked list with cycle.",
        "2. Execute hasCycle(head) using slow and fast pointers.",
        "3. Execute reverseList(head) on linear list.",
        "4. Output cycle boolean status and reversed list."
      ],
      sampleCode: {
        language: "java",
        code: `public class LinkedListApps {
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

    public static ListNode reverse(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }

    public static void main(String[] args) {
        ListNode n1 = new ListNode(1), n2 = new ListNode(2), n3 = new ListNode(3);
        n1.next = n2; n2.next = n3; n3.next = n2; // Creates cycle at Node 2
        System.out.println("Cycle Detected (Floyd's): " + hasCycle(n1));
    }
}`
      },
      expectedOutput: `Cycle Detected (Floyd's): true`,
      leetcodeProblems: [
        {
          id: 10,
          title: "Linked List Cycle (LeetCode #141)",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/linked-list-cycle/",
          description: "Determine if the linked list has a cycle in it.",
          approach: "Fast & slow pointer Floyd algorithm.",
          javaSnippet: `// Floyd Cycle`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dsa-exp-4",
    labId: "data-structures",
    title: "Exp 4: Stack Implementation: Array-based and linked list-based implementations supporting Push, Pop, Peek, and Display.",
    slug: "stack-implementation-array-linked-list",
    difficulty: "Beginner",
    category: "Linear Structures" as any,
    estimatedMinutes: 25,
    rating: 4.93,
    ratingsCount: 140,
    simulator: "stack",
    quizId: "quiz-dsa-4",
    sections: {
      introduction: "Stack is a Last-In First-Out (LIFO) linear data structure supporting O(1) Push (insertion at top), Pop (removal from top), and Peek (inspection) operations.",
      objective: "Implement Array-based Stack with overflow/underflow exception handling and Linked List-based Stack.",
      videoUrl: "https://www.youtube-nocookie.com/embed/F8AbOfQwl1c",
      videoTitle: "Stack Data Structure Explained",
      videoChannel: "Abdul Bari",
      prerequisites: ["Arrays", "Linked Lists"],
      theory: {
        overview: "Array stack maintains top index pointer (-1 when empty). Pushing increments top and writes to array. Linked List stack pushes and pops at the head node in O(1) time without capacity constraints.",
        keyConcepts: [
          { title: "LIFO Principle", desc: "Last element pushed is the first element popped." },
          { title: "Stack Overflow & Underflow", desc: "Overflow occurs when pushing to full array; Underflow when popping empty stack." }
        ],
        complexities: [
          { operation: "Push / Pop / Peek", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "JVM method call execution stack and recursion activation frames",
          "Web browser forward/back navigation stacks",
          "Text editor Undo/Redo operation buffers"
        ]
      },
      procedure: [
        "1. Define ArrayStack with int[] stack, top = -1, capacity.",
        "2. Implement push(val), pop(), peek(), isEmpty().",
        "3. Test push and pop operations and verify LIFO order."
      ],
      sampleCode: {
        language: "java",
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
        if (top == capacity - 1) throw new RuntimeException("Stack Overflow!");
        arr[++top] = val;
    }

    public int pop() {
        if (top == -1) throw new RuntimeException("Stack Underflow!");
        return arr[top--];
    }

    public int peek() { return arr[top]; }

    public static void main(String[] args) {
        ArrayStack stack = new ArrayStack(5);
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println("Top element (Peek): " + stack.peek());
        System.out.println("Popped element: " + stack.pop());
    }
}`
      },
      expectedOutput: `Top element (Peek): 30
Popped element: 30`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dsa-exp-5",
    labId: "data-structures",
    title: "Exp 5: Stack Applications: Infix to Postfix conversion, Postfix expression evaluation, and parentheses balance validation.",
    slug: "stack-applications-infix-postfix-parentheses",
    difficulty: "Intermediate",
    category: "Linear Structures" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 150,
    simulator: "stack",
    quizId: "quiz-dsa-5",
    sections: {
      introduction: "Stacks parse nested structures, evaluate arithmetic operator precedence, and convert human infix expressions (A + B * C) into machine-evaluable Reverse Polish Notation (A B C * +).",
      objective: "Implement Dijkstra's Shunting-Yard Infix to Postfix conversion, Postfix evaluation, and Valid Parentheses matching in O(n) time.",
      videoUrl: "https://www.youtube-nocookie.com/embed/F8AbOfQwl1c",
      videoTitle: "Infix to Postfix & Parentheses Matching",
      videoChannel: "Abdul Bari",
      prerequisites: ["Stack Implementation", "Operator Precedence"],
      theory: {
        overview: "Shunting-Yard pushes operators to a stack and pops higher/equal precedence operators to output upon encountering lower precedence operators. Postfix evaluation pops two operands per operator and pushes results.",
        keyConcepts: [
          { title: "Operator Precedence", desc: "^ (3) > *, / (2) > +, - (1)." },
          { title: "Postfix Expression Evaluation", desc: "Evaluates left-to-right without ambiguity or parentheses overhead." },
          { title: "Bracket Balance Matching", desc: "Matches closing brackets with corresponding opening bracket popped from stack." }
        ],
        complexities: [
          { operation: "Infix to Postfix", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
          { operation: "Valid Parentheses Check", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
        ],
        realWorldApplications: [
          "Compiler arithmetic expression parsers and bytecode generators",
          "Scientific calculator evaluation engines (HP RPN calculators)",
          "IDE syntax validator matching bracket pairs (XML/HTML tag parsers)"
        ]
      },
      procedure: [
        "1. Implement isValidParentheses(String s) using Character stack.",
        "2. Implement infixToPostfix(String exp) using operator precedence stack.",
        "3. Test with sample mathematical expressions."
      ],
      sampleCode: {
        language: "java",
        code: `import java.util.Stack;

public class StackApplications {
    public static boolean isValidParentheses(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println("Is '{[()]}' valid? " + isValidParentheses("{[()]}"));
        System.out.println("Is '{[(])}' valid? " + isValidParentheses("{[(])}"));
    }
}`
      },
      expectedOutput: `Is '{[()]}' valid? true
Is '{[(])}' valid? false`,
      leetcodeProblems: [
        {
          id: 11,
          title: "Valid Parentheses (LeetCode #20)",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/valid-parentheses/",
          description: "Given a string s containing just characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
          approach: "Push matching closing brackets and pop on match.",
          javaSnippet: `// Solution`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dsa-exp-6",
    labId: "data-structures",
    title: "Exp 6: Queue Implementations: Circular Queue, Priority Queue, and Sliding Window Maximum using Double-ended Queues.",
    slug: "queue-implementations-circular-priority-deque",
    difficulty: "Intermediate",
    category: "Linear Structures" as any,
    estimatedMinutes: 30,
    rating: 4.94,
    ratingsCount: 140,
    simulator: "queue",
    quizId: "quiz-dsa-6",
    sections: {
      introduction: "Queue is a First-In First-Out (FIFO) linear data structure, extended by Circular Queues (modulo buffer wrap), Priority Queues (Binary Heaps), and Deques (Double-Ended Queues).",
      objective: "Implement Circular Queue using modulo array indices and monotonic Deque for Sliding Window Maximum in O(n) time.",
      videoUrl: "https://www.youtube-nocookie.com/embed/F8AbOfQwl1c",
      videoTitle: "Circular Queue & Priority Queue",
      videoChannel: "Abdul Bari",
      prerequisites: ["Arrays", "Modulo Arithmetic"],
      theory: {
        overview: "Circular Queue wraps indices via rear = (rear + 1) % capacity. Priority Queue maintains binary heap invariant. Monotonic Deque maintains decreasing elements for O(1) sliding window maximum queries.",
        keyConcepts: [
          { title: "Circular Modulo Wrap", desc: "Eliminates false overflow and array shifting overhead." },
          { title: "Binary Min/Max Heap", desc: "Parent <= children guarantees O(log n) insert and O(1) peek." },
          { title: "Monotonic Deque", desc: "Maintains decreasing element order across a sliding window in O(n) total time." }
        ],
        complexities: [
          { operation: "Circular Enqueue / Dequeue", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Sliding Window Max (Deque)", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(k)" }
        ],
        realWorldApplications: [
          "Operating system printer spoolers and network packet ring buffers",
          "Dijkstra's shortest path priority queues",
          "Real-time streaming stock ticker moving window analytics"
        ]
      },
      procedure: [
        "1. Implement CircularQueue with front, rear, size, and capacity.",
        "2. Implement enQueue(val) and deQueue().",
        "3. Implement slidingWindowMax(int[] nums, int k) using ArrayDeque.",
        "4. Test and output results."
      ],
      sampleCode: {
        language: "java",
        code: `import java.util.*;

public class QueueApplications {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || k <= 0) return new int[0];
        int n = nums.length;
        int[] result = new int[n - k + 1];
        Deque<Integer> dq = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // Remove out-of-window elements
            if (!dq.isEmpty() && dq.peekFirst() < i - k + 1) dq.pollFirst();
            // Remove smaller elements from back
            while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i]) dq.pollLast();
            dq.offerLast(i);
            if (i >= k - 1) result[i - k + 1] = nums[dq.peekFirst()];
        }
        return result;
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, -1, -3, 5, 3, 6, 7};
        int[] maxs = maxSlidingWindow(arr, 3);
        System.out.println("Sliding Window Maximum (k=3): " + Arrays.toString(maxs));
    }
}`
      },
      expectedOutput: `Sliding Window Maximum (k=3): [3, 3, 5, 5, 6, 7]`,
      leetcodeProblems: [
        {
          id: 12,
          title: "Sliding Window Maximum (LeetCode #239)",
          difficulty: "Hard",
          url: "https://leetcode.com/problems/sliding-window-maximum/",
          description: "Find the maximum for each window of size k moving from left to right.",
          approach: "Monotonic Deque storing indices in decreasing value order.",
          javaSnippet: `// Monotonic Deque Solution`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dsa-exp-7",
    labId: "data-structures",
    title: "Exp 7: Binary Search Tree (BST): Insertion, deletion, key lookup, and Inorder/Preorder/Postorder traversals.",
    slug: "binary-search-tree-bst-operations",
    difficulty: "Intermediate",
    category: "Trees & Graphs" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 155,
    simulator: "binary-tree",
    quizId: "quiz-dsa-7",
    sections: {
      introduction: "A Binary Search Tree (BST) is a hierarchical node structure maintaining the invariant: Left Subtree Keys < Root Key < Right Subtree Keys.",
      objective: "Implement BST Insertion, Deletion (0, 1, and 2 children cases using Inorder Successor), Key Lookup, and Inorder traversal.",
      videoUrl: "https://www.youtube-nocookie.com/embed/F8AbOfQwl1c",
      videoTitle: "Binary Search Tree Operations",
      videoChannel: "Abdul Bari",
      prerequisites: ["Recursion", "Binary Trees"],
      theory: {
        overview: "Inorder traversal (Left -> Root -> Right) of a BST produces elements in strictly ascending sorted order in O(n) time. Deletion of a node with two children replaces its value with its Inorder Successor (minimum node in right subtree).",
        keyConcepts: [
          { title: "BST Invariant", desc: "Left < Root < Right enables logarithmic search partitioning." },
          { title: "Inorder Successor Deletion", desc: "Replaces target with smallest key in right subtree to preserve BST property." },
          { title: "Degenerate Skewed BST", desc: "Degrades to O(n) linked list when inserting pre-sorted inputs." }
        ],
        complexities: [
          { operation: "BST Search / Insert", best: "O(1)", avg: "O(log n)", worst: "O(n) Skewed", space: "O(height)" },
          { operation: "BST Deletion", best: "O(1)", avg: "O(log n)", worst: "O(n)", space: "O(height)" }
        ],
        realWorldApplications: [
          "In-memory symbol tables and compiler identifier scopes",
          "Sorted key range query engines (e.g. TreeMap / TreeSet in Java)",
          "Hierarchical file system directory indexes"
        ]
      },
      procedure: [
        "1. Define TreeNode class with val, left, right.",
        "2. Implement recursive insert(root, val).",
        "3. Implement recursive deleteNode(root, key) with 3 cases.",
        "4. Implement inorder(root) traversal.",
        "5. Test BST construction and print sorted keys."
      ],
      sampleCode: {
        language: "java",
        code: `class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int v) { this.val = v; }
}

public class BinarySearchTreeDemo {
    public static TreeNode insert(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        if (val < root.val) root.left = insert(root.left, val);
        else if (val > root.val) root.right = insert(root.right, val);
        return root;
    }

    public static void inorder(TreeNode root) {
        if (root != null) {
            inorder(root.left);
            System.out.print(root.val + " ");
            inorder(root.right);
        }
    }

    public static void main(String[] args) {
        TreeNode root = null;
        int[] keys = {50, 30, 70, 20, 40, 60, 80};
        for (int k : keys) root = insert(root, k);
        System.out.print("BST Inorder Traversal (Sorted): ");
        inorder(root);
        System.out.println();
    }
}`
      },
      expectedOutput: `BST Inorder Traversal (Sorted): 20 30 40 50 60 70 80`,
      leetcodeProblems: [
        {
          id: 13,
          title: "Delete Node in a BST (LeetCode #450)",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/delete-node-in-a-bst/",
          description: "Given a root node reference of a BST and a key, delete the node with the given key in the BST.",
          approach: "Find node and replace with inorder successor if 2 children.",
          javaSnippet: `// Solution`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dsa-exp-8",
    labId: "data-structures",
    title: "Exp 8: AVL Tree: Height balancing through single and double rotations during insertion phases.",
    slug: "avl-tree-height-balancing-rotations",
    difficulty: "Advanced",
    category: "Trees & Graphs" as any,
    estimatedMinutes: 35,
    rating: 4.96,
    ratingsCount: 150,
    simulator: "binary-tree",
    quizId: "quiz-dsa-8",
    sections: {
      introduction: "AVL Trees (Adelson-Velsky and Landis) are self-balancing Binary Search Trees that maintain strictly logarithmic search time O(log n) by enforcing Balance Factor |BF| <= 1.",
      objective: "Calculate Balance Factor (Height(Left) - Height(Right)) and execute Left (LL), Right (RR), Left-Right (LR), and Right-Left (RL) rotations.",
      videoUrl: "https://www.youtube-nocookie.com/embed/F8AbOfQwl1c",
      videoTitle: "AVL Tree Rotations Explained",
      videoChannel: "Abdul Bari",
      prerequisites: ["BST Implementation", "Tree Rotations"],
      theory: {
        overview: "After every insertion, balance factor BF = height(left) - height(right) is re-evaluated. If BF > 1 (Left Heavy) and key < left.key, perform Right Rotation (LL). If BF > 1 and key > left.key, perform Left-Right Rotation (LR).",
        keyConcepts: [
          { title: "Balance Factor Invariant", desc: "BF must belong to {-1, 0, +1} across all nodes." },
          { title: "Single Rotations (LL / RR)", desc: "Restores balance in a single 3-pointer swing." },
          { title: "Double Rotations (LR / RL)", desc: "Rotates child node first before rotating root node." }
        ],
        complexities: [
          { operation: "AVL Search / Insert / Delete", best: "O(1)", avg: "O(log n)", worst: "O(log n) Strictly", space: "O(log n)" },
          { operation: "Single / Double Rotation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Lookup-intensive in-memory database index trees",
          "Operating system virtual memory interval trees",
          "High-frequency algorithmic trading order book depth trees"
        ]
      },
      procedure: [
        "1. Define AVLNode with key, height, left, right.",
        "2. Implement getBalance(node) and height(node).",
        "3. Implement rightRotate(y) and leftRotate(x).",
        "4. Implement insert(node, key) with recursive re-balancing.",
        "5. Insert sorted elements and verify balanced tree height."
      ],
      sampleCode: {
        language: "java",
        code: `class AVLNode {
    int key, height;
    AVLNode left, right;
    AVLNode(int d) { key = d; height = 1; }
}

public class AVLTreeDemo {
    static int height(AVLNode N) { return N == null ? 0 : N.height; }
    static int getBalance(AVLNode N) { return N == null ? 0 : height(N.left) - height(N.right); }

    static AVLNode rightRotate(AVLNode y) {
        AVLNode x = y.left; AVLNode T2 = x.right;
        x.right = y; y.left = T2;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        return x;
    }

    static AVLNode leftRotate(AVLNode x) {
        AVLNode y = x.right; AVLNode T2 = y.left;
        y.left = x; x.right = T2;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        return y;
    }

    public static AVLNode insert(AVLNode node, int key) {
        if (node == null) return new AVLNode(key);
        if (key < node.key) node.left = insert(node.left, key);
        else if (key > node.key) node.right = insert(node.right, key);
        else return node;

        node.height = 1 + Math.max(height(node.left), height(node.right));
        int balance = getBalance(node);

        if (balance > 1 && key < node.left.key) return rightRotate(node);
        if (balance < -1 && key > node.right.key) return leftRotate(node);
        if (balance > 1 && key > node.left.key) { node.left = leftRotate(node.left); return rightRotate(node); }
        if (balance < -1 && key < node.right.key) { node.right = rightRotate(node.right); return leftRotate(node); }
        return node;
    }

    public static void main(String[] args) {
        AVLNode root = null;
        for (int k : new int[]{10, 20, 30, 40, 50, 25}) root = insert(root, k);
        System.out.println("AVL Root after balanced rotations: " + root.key + " (Height: " + root.height + ")");
    }
}`
      },
      expectedOutput: `AVL Root after balanced rotations: 30 (Height: 3)`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dsa-exp-9",
    labId: "data-structures",
    title: "Exp 9: Advanced Trees & Encoding: Lowest Common Ancestor (LCA) in binary trees, Huffman Coding Tree construction, and Prefix Trees (Trie) for dictionary queries.",
    slug: "advanced-trees-lca-huffman-trie",
    difficulty: "Advanced",
    category: "Trees & Graphs" as any,
    estimatedMinutes: 35,
    rating: 4.96,
    ratingsCount: 155,
    simulator: "binary-tree",
    quizId: "quiz-dsa-9",
    sections: {
      introduction: "Advanced tree structures model optimal data compression (Huffman prefix codes), string dictionary prefix matching (Trie), and genealogical hierarchy queries (Lowest Common Ancestor).",
      objective: "Build Trie with insert/search/startsWith in O(L) time, implement LCA in binary tree, and construct Huffman Coding trees using PriorityQueue.",
      videoUrl: "https://www.youtube-nocookie.com/embed/F8AbOfQwl1c",
      videoTitle: "Trie & Huffman Coding Tree",
      videoChannel: "NeetCode",
      prerequisites: ["Trees", "Priority Queues"],
      theory: {
        overview: "Trie (Prefix Tree) stores strings with 26-way child pointers where common prefixes share parent path nodes. LCA in a binary tree finds the deepest node that is an ancestor of both nodes p and q.",
        keyConcepts: [
          { title: "Trie Prefix Compression", desc: "Lookup latency depends strictly on word length L, independent of dictionary size N." },
          { title: "Huffman Greedy Prefix Codes", desc: "Frequent characters assigned short bit codes; rare characters assigned long bit codes." },
          { title: "Lowest Common Ancestor (LCA)", desc: "Splitting point where p and q reside in opposing left/right subtrees." }
        ],
        complexities: [
          { operation: "Trie Insert / Search Word", best: "O(L)", avg: "O(L)", worst: "O(L)", space: "O(26 * L * N)" },
          { operation: "LCA Query", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(height)" }
        ],
        realWorldApplications: [
          "Search engine autocomplete keyword suggestions (Google, Amazon)",
          "ZIP, GZIP, and JPEG Huffman lossless compression codecs",
          "IP router Longest Prefix Match (LPM) forwarding tables"
        ]
      },
      procedure: [
        "1. Implement TrieNode with TrieNode[26] children and boolean isEndOfWord.",
        "2. Implement insert(word), search(word), startsWith(prefix).",
        "3. Test dictionary insertions and prefix queries."
      ],
      sampleCode: {
        language: "java",
        code: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd;
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
        curr.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return false;
            curr = curr.children[idx];
        }
        return curr.isEnd;
    }

    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert("apple");
        System.out.println("Search 'apple': " + trie.search("apple"));
        System.out.println("Search 'app': " + trie.search("app"));
    }
}`
      },
      expectedOutput: `Search 'apple': true
Search 'app': false`,
      leetcodeProblems: [
        {
          id: 14,
          title: "Implement Trie (Prefix Tree) (LeetCode #208)",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
          description: "Implement a trie with insert, search, and startsWith methods.",
          approach: "Array of 26 TrieNodes per character level.",
          javaSnippet: `// Trie Solution`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dsa-exp-10",
    labId: "data-structures",
    title: "Exp 10: Multi-way Search Trees: Insertion and search mechanisms in B-Trees and B+ Trees.",
    slug: "multi-way-search-trees-b-and-bplus-trees",
    difficulty: "Advanced",
    category: "Trees & Graphs" as any,
    estimatedMinutes: 30,
    rating: 4.93,
    ratingsCount: 135,
    simulator: "binary-tree",
    quizId: "quiz-dsa-10",
    sections: {
      introduction: "B-Trees and B+ Trees are self-balancing multi-way search trees optimized for high fan-out block storage on disks and relational database indices.",
      objective: "Understand multi-key B-Tree node splitting, order M branching factors, and sequential linked leaf range queries in B+ Trees.",
      videoUrl: "https://www.youtube-nocookie.com/embed/F8AbOfQwl1c",
      videoTitle: "B-Trees and B+ Trees Explained",
      videoChannel: "Abdul Bari",
      prerequisites: ["BST & AVL Trees", "Disk Block Addressing"],
      theory: {
        overview: "A B-Tree of order M allows each internal node to hold up to M - 1 keys and M child pointers, keeping tree height extremely small (e.g. height 3 for 100 million records). In B+ Trees, all data records reside exclusively in doubly-linked leaf nodes, enabling fast sequential range scans.",
        keyConcepts: [
          { title: "High Fan-Out Factor", desc: "Reduces disk I/O seek operations from O(log_2 n) to O(log_M n)." },
          { title: "B+ Tree Linked Leaf Level", desc: "Leaf nodes form a doubly-linked list for O(k) sequential range traversals." },
          { title: "Median Node Split", desc: "When node overflows capacity, median key is pushed up to parent node." }
        ],
        complexities: [
          { operation: "B-Tree Search / Insert", best: "O(1)", avg: "O(log_M n)", worst: "O(log_M n)", space: "O(n)" },
          { operation: "B+ Tree Range Scan", best: "O(log_M n + k)", avg: "O(log_M n + k)", worst: "O(log_M n + k)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Relational database indices (MySQL InnoDB, PostgreSQL B-Tree)",
          "Operating system filesystems (NTFS, ext4 extent trees, Apple APFS)",
          "Distributed storage metadata indexing (MongoDB WiredTiger)"
        ]
      },
      procedure: [
        "1. Define BTreeNode with keys[], child pointers C[], and degree t.",
        "2. Implement node search binary search.",
        "3. Output B-Tree multi-key inspection."
      ],
      sampleCode: {
        language: "java",
        code: `public class BTreeConceptDemo {
    public static void main(String[] args) {
        System.out.println("=== B+ Tree Index Topology (Order M=4) ===");
        System.out.println("Root Router Node: [ 50 | 100 ]");
        System.out.println("  ├─ Child 0 [Keys < 50]:       Leaf [10, 20, 35]");
        System.out.println("  ├─ Child 1 [50 <= Keys < 100]: Leaf [50, 65, 80]");
        System.out.println("  └─ Child 2 [Keys >= 100]:     Leaf [100, 120, 150]");
        System.out.println("[✓] All leaves linked for sequential range scans: [10..35] <-> [50..80] <-> [100..150]");
    }
}`
      },
      expectedOutput: `=== B+ Tree Index Topology (Order M=4) ===
Root Router Node: [ 50 | 100 ]
  ├─ Child 0 [Keys < 50]:       Leaf [10, 20, 35]
  ├─ Child 1 [50 <= Keys < 100]: Leaf [50, 65, 80]
  └─ Child 2 [Keys >= 100]:     Leaf [100, 120, 150]
[✓] All leaves linked for sequential range scans: [10..35] <-> [50..80] <-> [100..150]`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dsa-exp-11",
    labId: "data-structures",
    title: "Exp 11: Graph Representations & Traversals: Adjacency matrix and adjacency list structures paired with Breadth-First Search (BFS) and Depth-First Search (DFS).",
    slug: "graph-representations-and-traversals-bfs-dfs",
    difficulty: "Intermediate",
    category: "Trees & Graphs" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 150,
    simulator: "custom",
    quizId: "quiz-dsa-11",
    sections: {
      introduction: "Graphs model pairwise relationships between vertices (V) and edges (E) using Adjacency Lists and Matrices, traversed via Breadth-First Search (Queue) and Depth-First Search (Recursion).",
      objective: "Build Adjacency List graph representation and implement BFS level-order traversal and DFS recursive path traversal in O(V + E) time.",
      videoUrl: "https://www.youtube-nocookie.com/embed/F8AbOfQwl1c",
      videoTitle: "Graph Traversals: BFS and DFS",
      videoChannel: "Abdul Bari",
      prerequisites: ["Queues", "Recursion"],
      theory: {
        overview: "BFS explores neighbor vertices layer-by-layer using a FIFO Queue, finding the shortest unweighted path between source and targets. DFS explores along depth branches using recursion/stack.",
        keyConcepts: [
          { title: "Adjacency List", desc: "Stores graph in O(V + E) memory space compared to O(V^2) for matrix." },
          { title: "BFS (Queue FIFO)", desc: "Discovers shortest paths in unweighted graphs." },
          { title: "DFS (Call Stack / Recursion)", desc: "Solves topological sorting, connected components, and cycle detection." }
        ],
        complexities: [
          { operation: "BFS / DFS Traversal", best: "O(V + E)", avg: "O(V + E)", worst: "O(V + E)", space: "O(V) Visited Set" }
        ],
        realWorldApplications: [
          "Social network friendship connection degrees (LinkedIn 1st/2nd/3rd degree)",
          "Web crawling and search engine index spidering (Googlebot)",
          "GPS road navigation connected route discovery"
        ]
      },
      procedure: [
        "1. Create Graph class with Map<Integer, List<Integer>> adj.",
        "2. Implement addEdge(u, v).",
        "3. Implement bfs(start) using Queue<Integer> and Set<Integer> visited.",
        "4. Implement dfs(start) using recursive helper.",
        "5. Output traversal orders."
      ],
      sampleCode: {
        language: "java",
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
        q.add(start); visited.add(start);
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

    public static void main(String[] args) {
        GraphTraversals g = new GraphTraversals();
        g.addEdge(0, 1); g.addEdge(0, 2); g.addEdge(1, 3); g.addEdge(2, 4);
        g.bfs(0);
    }
}`
      },
      expectedOutput: `BFS Traversal: 0 1 2 3 4 `,
      leetcodeProblems: [
        {
          id: 15,
          title: "Number of Islands (LeetCode #200)",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/number-of-islands/",
          description: "Count the number of islands in a 2D grid using BFS/DFS.",
          approach: "Traverse grid and trigger DFS on discovering '1' to sink visited island cells.",
          javaSnippet: `// Solution`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dsa-exp-12",
    labId: "data-structures",
    title: "Exp 12: Shortest Path & MST: Dijkstra’s Shortest Path Algorithm, Prim’s Minimum Spanning Tree Algorithm, and Kruskal’s Minimum Spanning Tree Algorithm.",
    slug: "shortest-path-and-mst-dijkstra-prim-kruskal",
    difficulty: "Advanced",
    category: "Trees & Graphs" as any,
    estimatedMinutes: 35,
    rating: 4.97,
    ratingsCount: 160,
    simulator: "custom",
    quizId: "quiz-dsa-12",
    sections: {
      introduction: "Weighted graph optimization algorithms find Single-Source Shortest Paths (Dijkstra) and connect all vertices with minimum total edge weight without cycles (Minimum Spanning Tree via Kruskal & Prim).",
      objective: "Implement Dijkstra's algorithm using PriorityQueue and Kruskal's MST algorithm using Disjoint Set Union (DSU).",
      videoUrl: "https://www.youtube-nocookie.com/embed/F8AbOfQwl1c",
      videoTitle: "Dijkstra & Kruskal MST Algorithms",
      videoChannel: "Abdul Bari",
      prerequisites: ["Graph Representations", "Disjoint Set Union (DSU)"],
      theory: {
        overview: "Dijkstra extracts minimum tentative distance vertex using min-heap. Kruskal sorts all edges by weight in ascending order and greedily adds edges if they connect distinct disjoint sets (Union-Find).",
        keyConcepts: [
          { title: "Dijkstra Greedy Relaxation", desc: "if (dist[u] + w < dist[v]) dist[v] = dist[u] + w." },
          { title: "Disjoint Set Union (DSU)", desc: "Path compression and union by rank provide near O(1) cycle detection." },
          { title: "Minimum Spanning Tree (MST)", desc: "Spans all V vertices using exactly V - 1 edges with minimum total cost." }
        ],
        complexities: [
          { operation: "Dijkstra with Min-Heap", best: "O(E log V)", avg: "O(E log V)", worst: "O(E log V)", space: "O(V + E)" },
          { operation: "Kruskal's MST (DSU)", best: "O(E log E)", avg: "O(E log E)", worst: "O(E log E)", space: "O(V)" }
        ],
        realWorldApplications: [
          "Google Maps GPS turn-by-turn routing navigation",
          "Telecommunication optical fiber cabling infrastructure layout",
          "Electrical power grid transmission line design"
        ]
      },
      procedure: [
        "1. Define Edge class with to, weight.",
        "2. Implement Dijkstra shortest path using PriorityQueue<int[]>",
        "3. Return shortest distance array from source.",
        "4. Print shortest paths to all destination nodes."
      ],
      sampleCode: {
        language: "java",
        code: `import java.util.*;

class Edge { int to, weight; Edge(int t, int w) { to = t; weight = w; } }

public class DijkstraDemo {
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

    public static void main(String[] args) {
        int n = 4;
        List<List<Edge>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        adj.get(0).add(new Edge(1, 2));
        adj.get(0).add(new Edge(2, 4));
        adj.get(1).add(new Edge(2, 1));
        adj.get(1).add(new Edge(3, 7));
        adj.get(2).add(new Edge(3, 3));

        int[] dist = dijkstra(n, adj, 0);
        System.out.println("Shortest distances from Node 0: " + Arrays.toString(dist));
    }
}`
      },
      expectedOutput: `Shortest distances from Node 0: [0, 2, 3, 6]`,
      leetcodeProblems: [
        {
          id: 16,
          title: "Network Delay Time (LeetCode #743)",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/network-delay-time/",
          description: "Calculate how long it will take for all n nodes to receive the signal using Dijkstra.",
          approach: "PriorityQueue Dijkstra finding maximum shortest path.",
          javaSnippet: `// Solution`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dsa-exp-13",
    labId: "data-structures",
    title: "Exp 13: Searching Algorithms: Comparative implementation of Linear Search and Binary Search.",
    slug: "searching-algorithms-linear-and-binary",
    difficulty: "Beginner",
    category: "Linear Structures" as any,
    estimatedMinutes: 20,
    rating: 4.90,
    ratingsCount: 110,
    simulator: "custom",
    quizId: "quiz-dsa-13",
    sections: {
      introduction: "Searching algorithms locate target records within collections. Linear Search checks elements sequentially, while Binary Search divides sorted intervals logarithmically.",
      objective: "Compare Linear Search (O(n)) on unsorted arrays with Binary Search (O(log n)) on sorted arrays.",
      videoUrl: "https://www.youtube-nocookie.com/embed/F8AbOfQwl1c",
      videoTitle: "Binary Search vs Linear Search",
      videoChannel: "Abdul Bari",
      prerequisites: ["Arrays", "Divide and Conquer"],
      theory: {
        overview: "Binary search compares target against mid = low + (high - low)/2. If target == arr[mid], returns index. If target < arr[mid], search left half [low..mid-1]; else search right half [mid+1..high].",
        keyConcepts: [
          { title: "Linear Scan (O(n))", desc: "Works on arbitrary unsorted data structures." },
          { title: "Binary Search (O(log n))", desc: "Requires pre-sorted array; halves remaining candidate elements per step." },
          { title: "Overflow Safe Midpoint", desc: "low + (high - low)/2 prevents integer 32-bit overflow." }
        ],
        complexities: [
          { operation: "Linear Search", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Binary Search", best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Database index B-Tree leaf binary search lookups",
          "Software package version bisect bug hunting (git bisect)",
          "Standard library binarySearch routines (Arrays.binarySearch in Java)"
        ]
      },
      procedure: [
        "1. Implement binarySearch(arr, target) using low and high pointers.",
        "2. Test on sorted array.",
        "3. Output found index."
      ],
      sampleCode: {
        language: "java",
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

    public static void main(String[] args) {
        int[] sorted = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        int target = 23;
        int idx = binarySearch(sorted, target);
        System.out.println("Binary Search: Found target " + target + " at index: " + idx);
    }
}`
      },
      expectedOutput: `Binary Search: Found target 23 at index: 5`,
      leetcodeProblems: [
        {
          id: 17,
          title: "Binary Search (LeetCode #704)",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/binary-search/",
          description: "Given an array of integers nums sorted in ascending order, search target.",
          approach: "Iterative two-pointer interval bisection.",
          javaSnippet: `// Solution`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dsa-exp-14",
    labId: "data-structures",
    title: "Exp 14: Sorting Algorithms: Comparative execution and algorithmic analysis of Bubble Sort, Merge Sort, and Quick Sort.",
    slug: "sorting-algorithms-bubble-merge-quick",
    difficulty: "Intermediate",
    category: "Sorting Algorithms" as any,
    estimatedMinutes: 30,
    rating: 4.96,
    ratingsCount: 155,
    simulator: "bubble-sort",
    quizId: "quiz-dsa-14",
    sections: {
      introduction: "Sorting arranges elements in ascending or descending sequence. Compare quadratic sorting (Bubble Sort O(n^2)) with optimal divide-and-conquer sorting (Merge Sort O(n log n) and Quick Sort).",
      objective: "Implement Bubble Sort with early termination, divide-and-conquer Merge Sort, and in-place partition Quick Sort.",
      videoUrl: "https://www.youtube-nocookie.com/embed/F8AbOfQwl1c",
      videoTitle: "Sorting Algorithms: Merge Sort & Quick Sort",
      videoChannel: "Abdul Bari",
      prerequisites: ["Arrays", "Recursion"],
      theory: {
        overview: "Merge Sort recursively halves array and merges sorted sub-arrays in guaranteed O(n log n) time and O(n) space. Quick Sort partitions elements around a pivot in-place in O(n log n) average time and O(log n) stack space.",
        keyConcepts: [
          { title: "Bubble Sort", desc: "Swaps adjacent inverted elements; O(n) best case with swapped flag." },
          { title: "Merge Sort (Stable)", desc: "Guaranteed O(n log n) regardless of initial array ordering." },
          { title: "Quick Sort (In-Place)", desc: "Lomuto/Hoare partitioning around pivot element." }
        ],
        complexities: [
          { operation: "Bubble Sort", best: "O(n)", avg: "O(n^2)", worst: "O(n^2)", space: "O(1)" },
          { operation: "Merge Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
          { operation: "Quick Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n^2) Bad Pivot", space: "O(log n)" }
        ],
        realWorldApplications: [
          "Java Arrays.sort() Dual-Pivot Quicksort for primitives and Timsort for objects",
          "Database external merge sort on multi-gigabyte disk files",
          "Graphics pipeline depth z-buffering polygon sorting"
        ]
      },
      procedure: [
        "1. Implement quickSort(arr, low, high) and partition(arr, low, high).",
        "2. Implement mergeSort(arr, l, r) and merge(arr, l, m, r).",
        "3. Sort array and verify ascending sorted order."
      ],
      sampleCode: {
        language: "java",
        code: `import java.util.Arrays;

public class SortingAlgorithms {
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

    public static void main(String[] args) {
        int[] data = {38, 27, 43, 3, 9, 82, 10};
        quickSort(data, 0, data.length - 1);
        System.out.println("Quick Sorted Array: " + Arrays.toString(data));
    }
}`
      },
      expectedOutput: `Quick Sorted Array: [3, 9, 10, 27, 38, 43, 82]`,
      leetcodeProblems: [
        {
          id: 18,
          title: "Sort an Array (LeetCode #912)",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/sort-an-array/",
          description: "Given an array of integers nums, sort the array in ascending order.",
          approach: "Merge Sort or Randomized Quick Sort.",
          javaSnippet: `// Solution`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dsa-exp-15",
    labId: "data-structures",
    title: "Exp 15: Hashing: Separate Chaining, Open Addressing (Linear Probing, Quadratic Probing), and dynamic Rehashing techniques.",
    slug: "hashing-collision-resolution-separate-chaining-open-addressing",
    difficulty: "Intermediate",
    category: "Linear Structures" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 150,
    simulator: "custom",
    quizId: "quiz-dsa-15",
    sections: {
      introduction: "Hashing maps arbitrary keys to fixed table indices using hash functions h(k), resolving collisions via Separate Chaining (linked buckets) or Open Addressing (probing).",
      objective: "Build a generic HashTable<K, V> supporting put, get, and dynamic Rehashing when Load Factor alpha exceeds 0.75.",
      videoUrl: "https://www.youtube-nocookie.com/embed/F8AbOfQwl1c",
      videoTitle: "Hashing & Collision Resolution",
      videoChannel: "Abdul Bari",
      prerequisites: ["Arrays", "Linked Lists"],
      theory: {
        overview: "Hash table maps key k to index = hash(k) % capacity. When multiple keys hash to identical indices (collision), Separate Chaining stores colliding nodes in a linked list. When load factor n / capacity >= 0.75, table capacity doubles and all elements are rehashed.",
        keyConcepts: [
          { title: "Hash Function", desc: "Evenly distributes keys across bucket array." },
          { title: "Separate Chaining", desc: "Bucket array of linked lists; O(1) average lookup." },
          { title: "Dynamic Rehashing", desc: "Doubles table size and recalculates indices to keep load factor low." }
        ],
        complexities: [
          { operation: "Hash Put / Get (Average)", best: "O(1)", avg: "O(1)", worst: "O(n)", space: "O(n)" }
        ],
        realWorldApplications: [
          "Java HashMap / HashSet and Python dict core implementations",
          "Database in-memory hash join algorithms",
          "Distributed distributed hash tables (DHT) in peer-to-peer networks"
        ]
      },
      procedure: [
        "1. Define HashNode<K, V> class with key, value, next.",
        "2. Implement HashTable with HashNode<K, V>[] buckets.",
        "3. Implement put(k, v) and get(k).",
        "4. Test key insertions, updates, and lookups."
      ],
      sampleCode: {
        language: "java",
        code: `class HashNode<K, V> {
    K key; V val;
    HashNode<K, V> next;
    HashNode(K k, V v) { key = k; val = v; }
}

public class SimpleHashMap<K, V> {
    private HashNode<K, V>[] buckets;
    private int capacity = 10;

    @SuppressWarnings("unchecked")
    public SimpleHashMap() { buckets = new HashNode[capacity]; }

    public void put(K key, V val) {
        int idx = Math.abs(key.hashCode()) % capacity;
        HashNode<K, V> head = buckets[idx];
        while (head != null) {
            if (head.key.equals(key)) { head.val = val; return; }
            head = head.next;
        }
        HashNode<K, V> newNode = new HashNode<>(key, val);
        newNode.next = buckets[idx];
        buckets[idx] = newNode;
    }

    public V get(K key) {
        int idx = Math.abs(key.hashCode()) % capacity;
        HashNode<K, V> head = buckets[idx];
        while (head != null) {
            if (head.key.equals(key)) return head.val;
            head = head.next;
        }
        return null;
    }

    public static void main(String[] args) {
        SimpleHashMap<String, Integer> map = new SimpleHashMap<>();
        map.put("Alice", 95);
        map.put("Bob", 88);
        System.out.println("Lookup 'Alice': " + map.get("Alice"));
    }
}`
      },
      expectedOutput: `Lookup 'Alice': 95`,
      leetcodeProblems: [
        {
          id: 19,
          title: "Design HashMap (LeetCode #706)",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/design-hashmap/",
          description: "Design a HashMap without using any built-in hash table libraries.",
          approach: "Array of bucket linked lists with modulo hash index.",
          javaSnippet: `// Solution`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  }
];
