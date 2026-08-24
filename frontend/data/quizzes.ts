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
        options: [
          "Because it has lower constant factors and high cache locality on small arrays (e.g., n < 32)",
          "Because it runs in O(log n) time",
          "Because it is non-recursive only",
          "Because it does not require CPU registers"
        ],
        correctIndex: 0,
        explanation: "Due to low overhead and excellent CPU cache locality, Insertion Sort outperforms Quick Sort and Merge Sort on small sub-arrays."
      }
    ]
  }
};
