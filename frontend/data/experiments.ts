export interface ComplexityEntry {
  operation: string;
  best: string;
  avg: string;
  worst: string;
  space: string;
}

export interface ExperimentSection {
  introduction: string;
  objective: string;
  prerequisites: string[];
  theory: {
    overview: string;
    keyConcepts: { title: string; desc: string }[];
    complexities: ComplexityEntry[];
    realWorldApplications: string[];
  };
  procedure: string[];
  sampleCode: {
    language: string;
    code: string;
  };
  expectedOutput: string;
  targetAudience: {
    ug: string[];
    pg: string[];
  };
}

export interface Experiment {
  id: string;
  labId: string;
  title: string;
  slug: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: "Linear Structures" | "Sorting Algorithms" | "Trees & Graphs";
  estimatedMinutes: number;
  rating: number;
  ratingsCount: number;
  simulator: "stack" | "queue" | "linked-list" | "bubble-sort" | "selection-sort" | "insertion-sort";
  quizId: string;
  sections: ExperimentSection;
}

export const EXPERIMENTS_DATA: Experiment[] = [
  {
    id: "stack-operations",
    labId: "data-structures",
    title: "Stack Operations & Applications",
    slug: "stack-operations",
    difficulty: "Beginner",
    category: "Linear Structures",
    estimatedMinutes: 30,
    rating: 4.9,
    ratingsCount: 284,
    simulator: "stack",
    quizId: "stack-quiz",
    sections: {
      introduction: "A Stack is a fundamental linear data structure that follows the Last-In, First-Out (LIFO) order. The most recently added item is the first to be retrieved. This experiment demonstrates basic operations (Push, Pop, Peek), boundary conditions (Overflow, Underflow), and real-world execution environments.",
      objective: "To design, simulate, and analyze the behavior of an array/pointer-based Stack data structure, understanding the constant-time characteristics of push/pop operations and observing stack underflow and overflow conditions.",
      prerequisites: [
        "Basic understanding of 1D arrays and index pointers",
        "Understanding of dynamic memory and function call models",
        "Basic knowledge of C/C++/Java/Python syntax"
      ],
      theory: {
        overview: "In a Stack, all insertions and deletions are restricted to a single endpoint designated as the 'Top' of the stack. When an item is pushed, top increments; when popped, top decrements. Attempting to pop from top == -1 triggers Stack Underflow, whereas pushing beyond max capacity triggers Stack Overflow.",
        keyConcepts: [
          {
            title: "LIFO Property",
            desc: "Last element entered is the first element accessed. Analogous to a stack of cafeteria plates or undo/redo action buffers in text editors."
          },
          {
            title: "Top Pointer Index",
            desc: "Tracks the index of the highest item. Initialized to -1 when the stack is empty. Top == Capacity - 1 indicates a full stack."
          },
          {
            title: "Push Operation",
            desc: "Verifies whether top < capacity - 1, then increments top pointer and inserts data at arr[top]."
          },
          {
            title: "Pop Operation",
            desc: "Verifies top >= 0, returns value at arr[top], and decrements top pointer."
          }
        ],
        complexities: [
          { operation: "Push", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Pop", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Peek / Top", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Search", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Function call stack management and recursion frames in CPUs",
          "Balanced parentheses verification in compiler syntax parsers",
          "Infix to Postfix expression conversion and arithmetic calculation",
          "Browser back/forward page navigation history"
        ]
      },
      procedure: [
        "1. Observe the empty stack container on the right with Top pointer pointing to index -1.",
        "2. In the controls panel, type an integer value (e.g., 25) into the input box and click 'Push'.",
        "3. Watch the item animate into the container and see Top pointer increment to 0.",
        "4. Push multiple elements until the stack capacity (8 elements) is reached to observe the 'Stack is Full' status.",
        "5. Click 'Pop' to remove the topmost element, observing how the top pointer updates in O(1) time.",
        "6. Pop all elements until empty and attempt another Pop to trigger the 'Stack Underflow' warning.",
        "7. Click on the 'Self-Assessment (Quiz)' tab to test your theoretical understanding."
      ],
      sampleCode: {
        language: "cpp",
        code: `#include <iostream>
using namespace std;
#define MAX 8

class Stack {
    int top;
    int arr[MAX];

public:
    Stack() { top = -1; }

    bool push(int x) {
        if (top >= (MAX - 1)) {
            cout << "Stack Overflow!" << endl;
            return false;
        }
        arr[++top] = x;
        cout << x << " pushed into stack" << endl;
        return true;
    }

    int pop() {
        if (top < 0) {
            cout << "Stack Underflow!" << endl;
            return -1;
        }
        return arr[top--];
    }

    int peek() {
        if (top < 0) return -1;
        return arr[top];
    }

    bool isEmpty() { return (top < 0); }
};`
      },
      expectedOutput: `25 pushed into stack
42 pushed into stack
Top element: 42
Popped: 42
Current Top: 25`,
      targetAudience: {
        ug: [
          "1st & 2nd Year B.Tech / B.E in CSE, IT, AIDS, ECE",
          "B.Sc Computer Science & BCA Students"
        ],
        pg: [
          "M.Tech / MCA Data Structures refresher",
          "GATE CSE & Competitive Programming Aspirants"
        ]
      }
    }
  },
  {
    id: "queue-operations",
    labId: "data-structures",
    title: "Queue & Circular Queue Operations",
    slug: "queue-operations",
    difficulty: "Beginner",
    category: "Linear Structures",
    estimatedMinutes: 35,
    rating: 4.8,
    ratingsCount: 240,
    simulator: "queue",
    quizId: "queue-quiz",
    sections: {
      introduction: "A Queue is an ordered linear collection where elements are added at the rear end and removed from the front end, following the First-In, First-Out (FIFO) principle. This experiment demonstrates linear queue operations, front and rear pointer movements, and shows how a circular queue overcomes memory underutilization.",
      objective: "To simulate Enqueue and Dequeue operations on linear and circular queues, analyze front/rear pointer increments with modulo arithmetic, and understand buffer management.",
      prerequisites: [
        "Knowledge of array indexing and sequential memory access",
        "Understanding of modulo arithmetic (index % capacity)",
        "Basic algorithmic complexity principles"
      ],
      theory: {
        overview: "In a standard queue, Front tracks the first valid item and Rear tracks the last inserted item. In a linear array queue, repeated dequeues leave empty slots at the front that cannot be reused without shifting. A Circular Queue connects the last position back to the first using modular arithmetic (rear + 1) % capacity, achieving optimal memory reuse.",
        keyConcepts: [
          {
            title: "FIFO Discipline",
            desc: "First item inserted is the first item served. Comparable to a ticket counter queue or print job spooling."
          },
          {
            title: "Front and Rear Pointers",
            desc: "Front pointer denotes the index of the next element to dequeue. Rear denotes the last enqueued item."
          },
          {
            title: "Circular Wrapping",
            desc: "Modulo arithmetic (index + 1) % N allows seamless wraparound when index reaches the end of the array."
          },
          {
            title: "Boundary Checks",
            desc: "Queue is Empty when front == -1 or front > rear. Queue is Full when (rear + 1) % N == front."
          }
        ],
        complexities: [
          { operation: "Enqueue", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Dequeue", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Front / Peek", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Search", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Operating system CPU scheduling (Round-Robin, multi-level queues)",
          "Asynchronous data buffers (I/O streaming, network packet sockets)",
          "Printer document spooling pipelines",
          "Breadth-First Search (BFS) graph state frontier"
        ]
      },
      procedure: [
        "1. Launch the interactive Queue simulator workspace.",
        "2. Input an integer and click 'Enqueue' to add elements to the rear.",
        "3. Notice the Front pointer stationed at index 0 and the Rear pointer advancing with every insertion.",
        "4. Click 'Dequeue' to remove the element at Front and observe how Front advances.",
        "5. Try multiple Enqueue and Dequeue cycles to see how the circular queue pointers wrap around using modulo math.",
        "6. Review the operations log below the canvas to trace execution time.",
        "7. Complete the self-evaluation quiz."
      ],
      sampleCode: {
        language: "cpp",
        code: `#include <iostream>
using namespace std;
#define SIZE 5

class CircularQueue {
    int arr[SIZE];
    int front, rear;

public:
    CircularQueue() { front = -1; rear = -1; }

    bool isFull() {
        return ((rear + 1) % SIZE == front);
    }

    bool isEmpty() {
        return (front == -1);
    }

    void enqueue(int element) {
        if (isFull()) {
            cout << "Queue is Full!" << endl;
            return;
        }
        if (isEmpty()) front = 0;
        rear = (rear + 1) % SIZE;
        arr[rear] = element;
        cout << "Enqueued: " << element << endl;
    }

    int dequeue() {
        if (isEmpty()) {
            cout << "Queue is Empty!" << endl;
            return -1;
        }
        int val = arr[front];
        if (front == rear) {
            front = -1;
            rear = -1;
        } else {
            front = (front + 1) % SIZE;
        }
        return val;
    }
};`
      },
      expectedOutput: `Enqueued: 10
Enqueued: 20
Enqueued: 30
Dequeued: 10
Front index now at: 1, Rear index at: 2`,
      targetAudience: {
        ug: ["B.Tech / B.E (CSE, AIDS, IT, ECE) Sem 3"],
        pg: ["MCA, M.Tech Data Systems"]
      }
    }
  },
  {
    id: "singly-linked-list",
    labId: "data-structures",
    title: "Singly Linked List Operations",
    slug: "singly-linked-list",
    difficulty: "Beginner",
    category: "Linear Structures",
    estimatedMinutes: 40,
    rating: 4.9,
    ratingsCount: 310,
    simulator: "linked-list",
    quizId: "linked-list-quiz",
    sections: {
      introduction: "A Linked List is a linear data structure whose elements are not stored in contiguous memory locations. Instead, each node contains a data payload and a pointer linking to the subsequent node. This experiment visualizes dynamic node creation, insertion at head/tail/index, deletion, and sequential traversal.",
      objective: "To understand dynamic memory management, pointer manipulation, and the mechanics of inserting and deleting nodes in a Singly Linked List without requiring contiguous array reallocation.",
      prerequisites: [
        "Understanding of pointers / references and dynamic heap allocation",
        "Comparison of static arrays vs dynamic data chains",
        "Understanding memory addressing concepts"
      ],
      theory: {
        overview: "Unlike static arrays with fixed size and costly O(n) element shifting on insertion, linked lists allocate memory per node dynamically. Insertion at the Head executes in O(1) time simply by repointing pointers. However, accessing the k-th element requires sequential O(k) traversal from Head since random index arithmetic is unavailable.",
        keyConcepts: [
          {
            title: "Node Anatomy",
            desc: "A composite data structure containing a Data field and a Next pointer holding the memory reference of the following node."
          },
          {
            title: "Head & Tail Pointers",
            desc: "Head holds the reference to the first node. Tail refers to the final node whose Next pointer is NULL."
          },
          {
            title: "Insert at Head",
            desc: "Create newNode -> newNode.next = head -> head = newNode. Operates in O(1) constant time."
          },
          {
            title: "Delete Node",
            desc: "Locate predecessor node -> pred.next = targetNode.next -> deallocate targetNode."
          }
        ],
        complexities: [
          { operation: "Insert at Head", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Insert at Tail", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Insert at Position k", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Delete at Head", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Search Value", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Implementation of dynamic Stacks and Queues without size limits",
          "Polynomial arithmetic representations in computer algebra systems",
          "Music playlist Next / Previous song chaining",
          "Memory allocation free-lists in OS kernel heap managers"
        ]
      },
      procedure: [
        "1. Open the interactive Linked List visualizer workspace.",
        "2. Type a value (e.g., 15) and click 'Insert Head' to see a new node connected to Head in O(1) time.",
        "3. Add more nodes using 'Insert Tail' or 'Insert at Index'.",
        "4. Click 'Search' to watch the traversal pointer highlight nodes step-by-step from Head until the match is found.",
        "5. Use 'Delete' to remove a specific node and observe how the predecessor's next pointer rewires to skip the deleted node.",
        "6. Switch to the 'Self-Assessment (Quiz)' tab to verify your mastery."
      ],
      sampleCode: {
        language: "cpp",
        code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
public:
    Node* head;
    LinkedList() : head(nullptr) {}

    void insertAtHead(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }

    void insertAtTail(int val) {
        Node* newNode = new Node(val);
        if (!head) { head = newNode; return; }
        Node* temp = head;
        while (temp->next) temp = temp->next;
        temp->next = newNode;
    }

    void deleteValue(int val) {
        if (!head) return;
        if (head->data == val) {
            Node* toDelete = head;
            head = head->next;
            delete toDelete;
            return;
        }
        Node* temp = head;
        while (temp->next && temp->next->data != val) temp = temp->next;
        if (temp->next) {
            Node* toDelete = temp->next;
            temp->next = temp->next->next;
            delete toDelete;
        }
    }
};`
      },
      expectedOutput: `List: [10] -> [25] -> [40] -> NULL
Inserted 5 at Head
List: [5] -> [10] -> [25] -> [40] -> NULL
Deleted 25
List: [5] -> [10] -> [40] -> NULL`,
      targetAudience: {
        ug: ["B.Tech CSE, AIDS, IT 3rd Semester"],
        pg: ["MCA, M.Tech Computing Systems"]
      }
    }
  },
  {
    id: "bubble-sort",
    labId: "data-structures",
    title: "Bubble Sort Algorithm",
    slug: "bubble-sort",
    difficulty: "Beginner",
    category: "Sorting Algorithms",
    estimatedMinutes: 30,
    rating: 4.8,
    ratingsCount: 295,
    simulator: "bubble-sort",
    quizId: "bubble-sort-quiz",
    sections: {
      introduction: "Bubble Sort is an intuitive comparison-based sorting algorithm. It repeatedly steps through the input list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, effectively bubbling the largest unsorted value to its correct position in each pass.",
      objective: "To visualize the step-by-step element comparisons and adjacent swaps in Bubble Sort, understand the pass-by-pass bubbling mechanism, and examine the O(n) best-case optimization using a swapped flag.",
      prerequisites: [
        "Basic array indexing and loop nesting (nested for loops)",
        "Understanding of comparison operators and value swapping",
        "Familiarity with algorithm time complexity notations (Big-O)"
      ],
      theory: {
        overview: "In pass i (0 to n-2), the algorithm iterates from j = 0 to n - i - 2. If arr[j] > arr[j + 1], they are swapped. After pass i, the largest element in the unsorted portion is locked at position n - 1 - i. A boolean flag can detect if a pass completed with zero swaps, enabling early termination in O(n) time.",
        keyConcepts: [
          {
            title: "Adjacent Comparison",
            desc: "Only neighboring elements arr[j] and arr[j+1] are compared at each step, making the algorithm naturally stable."
          },
          {
            title: "Bubbling Effect",
            desc: "In each outer loop pass, the largest unsorted element moves to its final position at the right end of the array."
          },
          {
            title: "Pass Optimization",
            desc: "Tracking whether any swap occurred during a pass enables early termination in O(n) time for already-sorted arrays."
          },
          {
            title: "In-Place & Stable",
            desc: "Requires O(1) auxiliary space and maintains the relative order of identical elements."
          }
        ],
        complexities: [
          { operation: "Best Case (Sorted)", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Average Case", best: "O(n^2)", avg: "O(n^2)", worst: "O(n^2)", space: "O(1)" },
          { operation: "Worst Case (Reversed)", best: "O(n^2)", avg: "O(n^2)", worst: "O(n^2)", space: "O(1)" },
          { operation: "Auxiliary Memory", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Educational introduction to sorting mechanics and invariant proofs",
          "Detecting nearly sorted arrays with minimal inversion count",
          "Embedded systems with extreme memory constraints requiring zero extra memory overhead"
        ]
      },
      procedure: [
        "1. Open the Bubble Sort interactive workspace.",
        "2. Click 'Generate Random Array' or enter custom comma-separated numbers (e.g., 64, 34, 25, 12, 22, 11, 90).",
        "3. Click 'Play' to watch the animated comparison bars in real time, or click 'Step Next' to manually inspect each comparison and swap.",
        "4. Observe the color-coded state transitions: Blue (Active/Comparing), Orange (Swapping), Green (Sorted boundary).",
        "5. Adjust the speed slider (0.5x, 1x, 2x) to suit your learning pace.",
        "6. Check the comparison and swap counters to understand computational cost.",
        "7. Complete the self-evaluation quiz."
      ],
      sampleCode: {
        language: "cpp",
        code: `#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    bool swapped;
    
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        // If no two elements were swapped by inner loop, array is sorted
        if (!swapped) break;
    }
}`
      },
      expectedOutput: `Initial: [64, 34, 25, 12, 22, 11, 90]
Pass 1:  [34, 25, 12, 22, 11, 64, 90] (90 locked at end)
Pass 2:  [25, 12, 22, 11, 34, 64, 90] (64 locked)
...
Sorted:  [11, 12, 22, 25, 34, 64, 90]`,
      targetAudience: {
        ug: ["1st & 2nd Year Computer Science Engineering students"],
        pg: ["Foundation DSA learners"]
      }
    }
  },
  {
    id: "selection-sort",
    labId: "data-structures",
    title: "Selection Sort Algorithm",
    slug: "selection-sort",
    difficulty: "Beginner",
    category: "Sorting Algorithms",
    estimatedMinutes: 30,
    rating: 4.7,
    ratingsCount: 220,
    simulator: "selection-sort",
    quizId: "selection-sort-quiz",
    sections: {
      introduction: "Selection Sort is a simple comparison-based in-place sorting algorithm. It divides the input list into two parts: a sorted sublist at the left end and an unsorted sublist at the right. In each pass, it finds the smallest element in the unsorted sublist and exchanges it with the leftmost unsorted element.",
      objective: "To visualize the partition boundary between sorted and unsorted subarrays, observe how the minimum element is identified across unsorted elements, and verify that Selection Sort executes at most O(n) memory swaps.",
      prerequisites: [
        "Understanding of linear search for minimum element",
        "Array subarray partitioning principles",
        "Basic big-O notation"
      ],
      theory: {
        overview: "In pass i (from 0 to n - 2), Selection Sort initializes min_idx = i. It then scans all elements j from i + 1 to n - 1. If arr[j] < arr[min_idx], it updates min_idx = j. At the end of the pass, if min_idx != i, it swaps arr[i] with arr[min_idx]. This guarantees that the sorted subarray grows by one element per pass.",
        keyConcepts: [
          {
            title: "Subarray Partitioning",
            desc: "Array is conceptually divided into Sorted (indices 0 to i-1) and Unsorted (indices i to n-1)."
          },
          {
            title: "Minimum Index Tracking",
            desc: "Scans the unsorted partition to find the smallest value before performing a single swap."
          },
          {
            title: "Minimal Swap Advantage",
            desc: "Performs at most n - 1 swaps in total, making it ideal when memory writes (EEPROM / Flash) are expensive."
          },
          {
            title: "Always O(n^2) Comparisons",
            desc: "Always executes n(n-1)/2 comparisons regardless of whether the initial array is sorted or reversed."
          }
        ],
        complexities: [
          { operation: "Best Case", best: "O(n^2)", avg: "O(n^2)", worst: "O(n^2)", space: "O(1)" },
          { operation: "Average Case", best: "O(n^2)", avg: "O(n^2)", worst: "O(n^2)", space: "O(1)" },
          { operation: "Worst Case", best: "O(n^2)", avg: "O(n^2)", worst: "O(n^2)", space: "O(1)" },
          { operation: "Maximum Swaps", best: "0", avg: "O(n)", worst: "n - 1", space: "O(1)" }
        ],
        realWorldApplications: [
          "Flash memory / EEPROM embedded devices where write cycles degrade hardware lifespan",
          "Small datasets where code simplicity and zero recursion overhead are prioritized",
          "Checking if a collection is already sorted with bounded memory writes"
        ]
      },
      procedure: [
        "1. Open the Selection Sort interactive visualizer.",
        "2. Choose a predefined dataset or enter your own custom array.",
        "3. Click 'Step Next' to watch the scanning pointer search for the minimum element in the unsorted partition.",
        "4. Notice the purple marker highlighting the current minimum element found so far.",
        "5. Observe the single swap at the end of the pass placing the minimum element into the sorted partition.",
        "6. Complete the self-evaluation quiz."
      ],
      sampleCode: {
        language: "cpp",
        code: `#include <iostream>
#include <vector>
using namespace std;

void selectionSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        if (min_idx != i) {
            swap(arr[i], arr[min_idx]);
        }
    }
}`
      },
      expectedOutput: `Initial: [29, 10, 14, 37, 13]
Pass 1: min=10 -> Swap(29, 10) -> [10 | 29, 14, 37, 13]
Pass 2: min=13 -> Swap(29, 13) -> [10, 13 | 14, 37, 29]
Pass 3: min=14 -> No swap      -> [10, 13, 14 | 37, 29]
Pass 4: min=29 -> Swap(37, 29) -> [10, 13, 14, 29, 37]`,
      targetAudience: {
        ug: ["B.Tech / B.E Computer Science, Information Technology"],
        pg: ["Data Structures practical curriculum"]
      }
    }
  },
  {
    id: "insertion-sort",
    labId: "data-structures",
    title: "Insertion Sort Algorithm",
    slug: "insertion-sort",
    difficulty: "Beginner",
    category: "Sorting Algorithms",
    estimatedMinutes: 30,
    rating: 4.8,
    ratingsCount: 260,
    simulator: "insertion-sort",
    quizId: "insertion-sort-quiz",
    sections: {
      introduction: "Insertion Sort is an adaptive, in-place sorting algorithm that builds the final sorted array one item at a time. It is much like sorting playing cards in your hands: you take one card from the unsorted deck and insert it into its correct relative position among the already-sorted cards.",
      objective: "To simulate element extraction (key), backward shifting of greater elements, and insertion into the sorted partition, observing the adaptive O(n) performance on nearly sorted inputs.",
      prerequisites: [
        "Understanding of while loop backward iteration",
        "Array shifting mechanics",
        "Concept of stable in-place sorting"
      ],
      theory: {
        overview: "Starting at index i = 1, the element key = arr[i] is extracted. The algorithm shifts all elements in the sorted partition (indices 0 to i - 1) that are greater than key one position to the right. Once the proper insertion slot is found, key is placed at arr[j + 1].",
        keyConcepts: [
          {
            title: "Online / Incremental Algorithm",
            desc: "Can sort a list as it receives it piece by piece from a real-time data stream."
          },
          {
            title: "Adaptive Performance",
            desc: "Runs in O(n) linear time on already-sorted or nearly-sorted datasets because the inner shift loop terminates on the first comparison."
          },
          {
            title: "Key Extraction & Shifting",
            desc: "Temporarily lifts the key element, shifts larger elements rightward, and drops the key into the resulting empty slot."
          },
          {
            title: "High Cache Locality",
            desc: "Sequential memory access pattern makes it faster in practice than O(n log n) algorithms for small arrays (n < 30)."
          }
        ],
        complexities: [
          { operation: "Best Case (Already Sorted)", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Average Case", best: "O(n^2)", avg: "O(n^2)", worst: "O(n^2)", space: "O(1)" },
          { operation: "Worst Case (Reversed)", best: "O(n^2)", avg: "O(n^2)", worst: "O(n^2)", space: "O(1)" },
          { operation: "Auxiliary Space", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Base-case sorting sub-routine in production hybrid sorts like Timsort (Python/Java) and Introsort (C++ std::sort)",
          "Sorting real-time incoming data streams where new items arrive continuously",
          "Small arrays in computer graphics rendering buffers"
        ]
      },
      procedure: [
        "1. Launch the Insertion Sort interactive workspace.",
        "2. Choose an array dataset or click 'Nearly Sorted' to see adaptive sorting in action.",
        "3. Click 'Step Next' to watch the current key element extracted and highlighted.",
        "4. Observe how larger elements in the sorted partition shift rightward step-by-step.",
        "5. Watch the key drop cleanly into its correct sorted location.",
        "6. Complete the self-evaluation quiz."
      ],
      sampleCode: {
        language: "cpp",
        code: `#include <iostream>
#include <vector>
using namespace std;

void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        // Move elements of arr[0..i-1], that are greater than key,
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`
      },
      expectedOutput: `Initial: [12, 11, 13, 5, 6]
i=1, key=11: [11, 12, 13, 5, 6]
i=2, key=13: [11, 12, 13, 5, 6]
i=3, key=5:  [5, 11, 12, 13, 6]
i=4, key=6:  [5, 6, 11, 12, 13]
Sorted:      [5, 6, 11, 12, 13]`,
      targetAudience: {
        ug: ["B.Tech / B.E (CSE, AIDS, IT)"],
        pg: ["Core Algorithms students"]
      }
    }
  }
];
