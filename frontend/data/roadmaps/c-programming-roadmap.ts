import { DSACategory } from "../dsa-topic-data";

export const C_PROGRAMMING_ROADMAP_CATEGORIES: DSACategory[] = [
  // ==========================================
  // WEEK 1: INTRODUCTION TO C PROGRAMMING & BASICS
  // ==========================================
  {
    id: "nptel-week-1",
    name: "Week 1: Introduction to C Programming & Basics",
    shortDesc: "History, structure of C, compilation pipeline, variables, constants, data types, and formatted I/O.",
    iconName: "Code2",
    topics: [
      {
        id: "c-week-1-fundamentals",
        slug: "c-fundamentals-variables-formatted-io",
        title: "Week 1: Introduction to C Programming & Basics (Hello World, Calc, Temp, Area)",
        categoryId: "nptel-week-1",
        categoryName: "Week 1: Introduction to C Programming & Basics",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "C programming compilation pipeline data types printf scanf format specifiers",
        gfgUrl: "https://www.geeksforgeeks.org/c-data-types/",
        quickSummary: "Master C history, anatomy of a C program, GCC 4-stage compilation process (Preprocessor -> Compiler -> Assembler -> Linker), primitive data types, and formatted I/O.",
        keyPoints: [
          "Compilation Pipeline: Preprocessing (#include, #define) -> Compilation (.s assembly) -> Assembly (.o object code) -> Linking (executable binary).",
          "Primitive Data Types & Sizing: char (1 Byte, ASCII), int (4 Bytes, two's complement), float (4 Bytes, IEEE 754), double (8 Bytes).",
          "Formatted I/O: printf for stdout with format specifiers (%d, %f, %lf, %c), scanf for stdin with address-of operator (&).",
          "NPTEL Focus: Understand basic syntax, data type sizing limits, and solve 25 Week-1 MCQs.",
          "AI&DS Connection: Understanding low-level memory allocation; foundational for high-performance computing and C/C++ backend AI kernels (e.g. PyTorch ATen, TensorFlow XLA, CUDA)."
        ],
        diagramTitle: "GCC 4-Stage Compilation Process & Memory Layout",
        diagram: `  Source File (main.c) ──► [ Preprocessor (cpp) ] ──► Expanded Source (main.i)
                                   │
                                   ▼
                             [ Compiler (cc1) ] ──► Assembly Code (main.s)
                                   │
                                   ▼
                             [ Assembler (as) ] ──► Object File (main.o)
                                   │
  Libraries (libc.a)   ──►   [ Linker (ld) ]    ──► Executable Binary (a.out)`,
        complexities: [
          { operation: "Variable Read / Write", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Arithmetic Evaluation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Basic Programs Suite: Calc, Temp, Area)",
            code: `#include <stdio.h>
#define PI 3.14159265359

int main() {
    // 1. Hello World
    printf("=== NPTEL C Programming Week 1 ===\\n");
    printf("Hello, AI&DS Engineering World!\\n\\n");

    // 2. Simple Calculator
    double num1 = 45.0, num2 = 15.0;
    printf("[Calculator]\\n");
    printf("Sum: %.2lf | Diff: %.2lf | Prod: %.2lf | Div: %.2lf\\n\\n",
           num1 + num2, num1 - num2, num1 * num2, num1 / num2);

    // 3. Temperature Conversion (Celsius to Fahrenheit)
    double celsius = 37.0;
    double fahrenheit = (celsius * 9.0 / 5.0) + 32.0;
    printf("[Temperature Conversion]\\n");
    printf("%.1lf C = %.1lf F\\n\\n", celsius, fahrenheit);

    // 4. Area & Perimeter Calculation (Circle & Rectangle)
    double radius = 7.0;
    double length = 12.0, width = 6.0;
    printf("[Geometry Calculation]\\n");
    printf("Circle Area: %.2lf | Circumference: %.2lf\\n", PI * radius * radius, 2 * PI * radius);
    printf("Rectangle Area: %.2lf | Perimeter: %.2lf\\n", length * width, 2 * (length + width));

    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "C Basic Declarations and Expressions",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/c-basic-declarations-and-expressions-activities/",
            platform: "GeeksforGeeks",
            topicTag: "Week 1 Basics"
          },
          {
            title: "Temperature Conversion & Data Types Practice",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/c-program-for-celsius-to-fahrenheit-conversion/",
            platform: "GeeksforGeeks",
            topicTag: "Week 1 I/O"
          }
        ]
      }
    ]
  },

  // ==========================================
  // WEEK 2: OPERATORS, EXPRESSIONS & DECISION MAKING
  // ==========================================
  {
    id: "nptel-week-2",
    name: "Week 2: Operators, Expressions & Decision Making",
    shortDesc: "Arithmetic/relational/logical operators, operator precedence, if, if-else ladders, nested conditions, and switch.",
    iconName: "Target",
    topics: [
      {
        id: "c-week-2-operators-decision",
        slug: "control-flow-decision-making-switch-case",
        title: "Week 2: Operators, Expressions & Decision Making (Largest of 3, Grades, Menu, Bill)",
        categoryId: "nptel-week-2",
        categoryName: "Week 2: Operators, Expressions & Decision Making",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "C operators precedence if else ladder switch case electricity bill largest of three",
        gfgUrl: "https://www.geeksforgeeks.org/decision-making-c-c-else-nested-else/",
        quickSummary: "Master unary, arithmetic, relational, logical, bitwise, and assignment operator precedence, as well as single/multi-branch decision logic via if-else ladders and jump-table switch-case.",
        keyPoints: [
          "Operators Hierarchy: Postfix () [] -> Unary ++ -- ! ~ -> Multiplicative * / % -> Additive + - -> Relational < <= > >= -> Equality == != -> Logical && || -> Conditional ?: -> Assignment = +=.",
          "Decision Making: if-else evaluates boolean expressions sequentially; switch-case creates fast O(1) jump tables for integer/char selectors.",
          "Short-Circuit Evaluation: In (A && B), if A is false, B is never evaluated; in (A || B), if A is true, B is skipped.",
          "NPTEL Focus: Output prediction on operator precedence problems, pre/post increment trick questions, and 25 MCQ + 5 Programming Questions assessment.",
          "AI&DS Connection: Decision trees and threshold-based classification models rely directly on nested conditional logic."
        ],
        diagramTitle: "Decision Tree Flow for Student Grading & Electricity Billing",
        diagram: `  [ Input Units Consumed ]
             │
    ┌────────┴────────┐
    ▼ (units <= 100)  ▼ (units > 100)
 [ Free / ₹1.5/unit ] ┌────────┴────────┐
                      ▼ (units <= 300)  ▼ (units > 300)
                   [ ₹2.0/unit ]     [ ₹3.0/unit + Surcharge ]`,
        complexities: [
          { operation: "Branch Evaluation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Switch Jump Table", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Decision Making: Largest of 3, Grade & Electricity Bill)",
            code: `#include <stdio.h>

int main() {
    printf("=== NPTEL C Programming Week 2: Decision Making ===\\n\\n");

    // 1. Largest of Three Numbers
    int a = 45, b = 78, c = 32;
    int largest = (a >= b && a >= c) ? a : (b >= c ? b : c);
    printf("[1. Largest Number]: Between %d, %d, %d -> %d\\n\\n", a, b, c, largest);

    // 2. Student Grade Calculation (if-else ladder)
    float score = 88.5f;
    char grade;
    if (score >= 90.0) grade = 'O';
    else if (score >= 80.0) grade = 'A';
    else if (score >= 70.0) grade = 'B';
    else if (score >= 60.0) grade = 'C';
    else if (score >= 50.0) grade = 'D';
    else grade = 'F';
    printf("[2. Student Grade]: Marks: %.1f%% -> Grade: %c\\n\\n", score, grade);

    // 3. Electricity Bill Calculation
    int units = 250;
    double billAmount = 0.0;
    if (units <= 100) {
        billAmount = units * 1.50;
    } else if (units <= 200) {
        billAmount = (100 * 1.50) + (units - 100) * 2.00;
    } else {
        billAmount = (100 * 1.50) + (100 * 2.00) + (units - 200) * 3.00;
    }
    printf("[3. Electricity Bill]: Units: %d -> Total Bill: Rs. %.2lf\\n", units, billAmount);

    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Find the Largest of Three Numbers",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/c-program-to-find-the-largest-number-among-three-numbers/",
            platform: "GeeksforGeeks",
            topicTag: "Conditionals"
          },
          {
            title: "Program for Electricity Bill Calculation",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/program-to-calculate-electricity-bill/",
            platform: "GeeksforGeeks",
            topicTag: "Decisions"
          }
        ]
      }
    ]
  },

  // ==========================================
  // WEEK 3: LOOP CONSTRUCTS
  // ==========================================
  {
    id: "nptel-week-3",
    name: "Week 3: Loop Constructs & Iterative Algorithms",
    shortDesc: "for loop, while loop, do-while loop, nested loops, break/continue, patterns, and Student Mark Analysis.",
    iconName: "Layers",
    topics: [
      {
        id: "c-week-3-loops-patterns",
        slug: "iterative-loops-and-pattern-generation",
        title: "Week 3: Loop Constructs & Mini Task (Factorial, Prime, Fibonacci, Patterns, Mark Analysis)",
        categoryId: "nptel-week-3",
        categoryName: "Week 3: Loop Constructs & Iterative Algorithms",
        difficulty: "Beginner",
        estimatedTime: "30 mins",
        gfgSearchQuery: "C loops prime numbers fibonacci pyramid star patterns student mark analysis",
        gfgUrl: "https://www.geeksforgeeks.org/loops-in-c-and-cpp/",
        quickSummary: "Harness entry-controlled (for, while) and exit-controlled (do-while) loop constructs to compute factorials, test primes in O(sqrt(n)), generate Fibonacci sequences, print 2D star pyramids, and build the Student Mark Analysis Program.",
        keyPoints: [
          "Loop Types: for loop for counted iterations; while loop for condition-driven cycles; do-while executes loop body at least once.",
          "Loop Control: break terminates current enclosing loop immediately; continue skips remainder of current iteration.",
          "NPTEL Focus: Loop execution tracing, infinite loop identification, nested loop output prediction, and off-by-one boundary checking.",
          "Mini Task: Build the Student Mark Analysis Program computing class average, top score, lowest score, and pass/fail counts across dynamic student cohorts.",
          "AI&DS Connection: Gradient descent optimization, iterative epoch training loops, and data aggregation pipelines run on loop iterations."
        ],
        diagramTitle: "Nested Loop Star Pyramid Pattern Geometry",
        diagram: `  Row 1 (i=1):       *        (Spaces: 3, Stars: 1)
  Row 2 (i=2):      ***       (Spaces: 2, Stars: 3)
  Row 3 (i=3):     *****      (Spaces: 1, Stars: 5)
  Row 4 (i=4):    *******     (Spaces: 0, Stars: 7)`,
        complexities: [
          { operation: "Factorial Calculation", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Prime Check", best: "O(1)", avg: "O(sqrt(n))", worst: "O(sqrt(n))", space: "O(1)" },
          { operation: "Pattern Generation", best: "O(n^2)", avg: "O(n^2)", worst: "O(n^2)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Mini Task: Student Mark Analysis & Number Algorithms)",
            code: `#include <stdio.h>
#include <stdbool.h>

// Optimized Prime Checker in O(sqrt(n))
bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    printf("=== NPTEL Week 3: Loops & Mini Task ===\\n\\n");

    // 1. Prime Number & Factorial
    int num = 7;
    long long fact = 1;
    for (int i = 1; i <= num; i++) fact *= i;
    printf("[1. Factorial & Prime]: %d! = %lld | isPrime(%d) = %s\\n\\n",
           num, fact, num, isPrime(num) ? "YES" : "NO");

    // 2. Fibonacci Series (First 8 terms)
    printf("[2. Fibonacci Series]: ");
    int t1 = 0, t2 = 1;
    for (int i = 1; i <= 8; i++) {
        printf("%d ", t1);
        int nextTerm = t1 + t2;
        t1 = t2;
        t2 = nextTerm;
    }
    printf("\\n\\n");

    // 3. Mini Task: Student Mark Analysis Program
    int marks[] = {85, 92, 45, 78, 60, 32, 98, 88};
    int n = sizeof(marks) / sizeof(marks[0]);
    int sum = 0, max = marks[0], min = marks[0], passCount = 0;

    for (int i = 0; i < n; i++) {
        sum += marks[i];
        if (marks[i] > max) max = marks[i];
        if (marks[i] < min) min = marks[i];
        if (marks[i] >= 50) passCount++;
    }
    double average = (double)sum / n;

    printf("=== Mini Task: Student Mark Analysis Program ===\\n");
    printf("Students Evaluated: %d\\n", n);
    printf("Class Average:      %.2lf\\n", average);
    printf("Highest Mark:       %d\\n", max);
    printf("Lowest Mark:        %d\\n", min);
    printf("Pass Count (>=50):  %d / %d\\n", passCount, n);

    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Fibonacci Number (LeetCode #509)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/fibonacci-number/",
            platform: "LeetCode",
            topicTag: "Loops"
          },
          {
            title: "Check for Prime Number",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/c-program-to-check-whether-a-number-is-prime-or-not/",
            platform: "GeeksforGeeks",
            topicTag: "Loops"
          }
        ]
      }
    ]
  },

  // ==========================================
  // WEEK 4: FUNCTIONS AND RECURSION
  // ==========================================
  {
    id: "nptel-week-4",
    name: "Week 4: Functions and Recursion",
    shortDesc: "Function declaration, definition, parameters, return values, scopes (local/global/static), and recursion.",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "c-week-4-functions-recursion",
        slug: "functions-and-recursion-factorial-gcd",
        title: "Week 4: Functions and Recursion (Modular Calc, Factorial, Fibonacci, GCD)",
        categoryId: "nptel-week-4",
        categoryName: "Week 4: Functions and Recursion",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "C functions pass by value static variables recursion factorial GCD Euclidean",
        gfgUrl: "https://www.geeksforgeeks.org/recursion-in-c/",
        quickSummary: "Design modular functions, compare call-by-value vs scope lifetimes (auto, static, global), and implement recurrence relations for Euclidean GCD, Factorial, and Fibonacci.",
        keyPoints: [
          "Functions Architecture: Declaration (prototype) informs compiler; Definition provides implementation; Call transfers control to activation frame.",
          "Variable Scopes & Storage Classes: auto (stack-allocated local), static (persists across calls in data segment), global (file scope).",
          "Pass by Value: Caller copies argument values into function stack frame; modifications do not affect caller variables.",
          "Recursion: Base case stops self-invocation; recursive step moves toward base case; call stack unwinds in LIFO order.",
          "NPTEL Focus: Recursion stack frame tracing, base case omission (stack overflow), static variable state preservation, and 30 NPTEL MCQs.",
          "AI&DS Connection: Recursive divide-and-conquer algorithms (MergeSort, QuickSort, Decision Tree splitting) and backpropagation tree traversals."
        ],
        diagramTitle: "Euclidean GCD Recursive Call Stack Unwinding",
        diagram: `  gcd(48, 18) ──► gcd(18, 48 % 18 = 12) ──► gcd(12, 18 % 12 = 6) ──► gcd(6, 0) = 6!
  [Frame 1]       [Frame 2]                 [Frame 3]                 [Base Case Return]`,
        complexities: [
          { operation: "Euclidean GCD", best: "O(1)", avg: "O(log min(a,b))", worst: "O(log min(a,b))", space: "O(log n)" },
          { operation: "Factorial Recursion", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Functions & Recursive Algorithms)",
            code: `#include <stdio.h>

// Euclidean Greatest Common Divisor (Recursive)
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// Recursive Factorial
long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Recursive Fibonacci
int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Static Variable Demonstration
void counterTracker() {
    static int callCount = 0;
    callCount++;
    printf("Static Function Call Count: %d\\n", callCount);
}

int main() {
    printf("=== NPTEL Week 4: Functions & Recursion ===\\n\\n");

    int a = 48, b = 18;
    printf("[1. Euclidean GCD]: gcd(%d, %d) = %d\\n\\n", a, b, gcd(a, b));

    int n = 6;
    printf("[2. Factorial]: %d! = %lld\\n\\n", n, factorial(n));

    printf("[3. Fibonacci(7)]: %d\\n\\n", fibonacci(7));

    printf("[4. Scope & Static Variables]:\\n");
    counterTracker();
    counterTracker();
    counterTracker();

    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Find Greatest Common Divisor of Array",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/find-greatest-common-divisor-of-array/",
            platform: "LeetCode",
            topicTag: "Recursion"
          },
          {
            title: "Recursive Implementation of Factorial & GCD",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/c-program-for-factorial-of-a-number/",
            platform: "GeeksforGeeks",
            topicTag: "Functions"
          }
        ]
      }
    ]
  },

  // ==========================================
  // WEEK 5: ARRAYS AND POINTERS
  // ==========================================
  {
    id: "nptel-week-5",
    name: "Week 5: Arrays and Pointers",
    shortDesc: "1D/2D arrays, searching, sorting, pointer basics, pointer arithmetic, and *(a+i) relationship.",
    iconName: "Layers",
    topics: [
      {
        id: "c-week-5-arrays-pointers",
        slug: "1d-arrays-and-statistical-calculations",
        title: "Week 5: Arrays and Pointers (Searching, Sorting, Matrix Mult, *(a+i))",
        categoryId: "nptel-week-5",
        categoryName: "Week 5: Arrays and Pointers",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "C arrays pointers relationship pointer arithmetic matrix multiplication *(a+i)",
        gfgUrl: "https://www.geeksforgeeks.org/pointer-array-c-relationship/",
        quickSummary: "Master contiguous array buffering, pointer dereferencing (*), pointer arithmetic, *(a+i) address calculation, Linear/Binary Search, Bubble/Selection Sort, and Matrix Multiplication.",
        keyPoints: [
          "Contiguous Memory Stride: Address(arr[i]) = Base_Address + (i * sizeof(datatype)).",
          "The *(a+i) Equivalence: In C, arr[i] is syntactically equivalent to *(arr + i), *(i + arr), and i[arr].",
          "Pointer Arithmetic: Incrementing ptr by 1 advances memory by sizeof(*ptr) bytes.",
          "Matrix Multiplication: Condition cols_A == rows_B; requires triple nested loop running in O(r * c * k).",
          "NPTEL Focus: Address calculations, pointer increment/decrement precedence, `*(a+i)` dereferencing, and array decay to pointers.",
          "AI&DS Connection: Arrays and 2D matrices form the foundational representation for tensors, feature vectors, machine learning datasets, and image pixel matrices."
        ],
        diagramTitle: "Array Memory Stride & Pointer Dereferencing Mechanics",
        diagram: `Array:        a[0]        a[1]        a[2]        a[3]
Address:     0x2000      0x2004      0x2008      0x200C    (+4 bytes each for int)
Pointer:       *a       *(a + 1)    *(a + 2)    *(a + 3)`,
        complexities: [
          { operation: "Binary Search", best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" },
          { operation: "Bubble / Selection Sort", best: "O(n)", avg: "O(n^2)", worst: "O(n^2)", space: "O(1)" },
          { operation: "Matrix Multiplication", best: "O(r * c * k)", avg: "O(r * c * k)", worst: "O(r * c * k)", space: "O(r * k)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Arrays, Pointers, Sorting & Matrix Multiplication)",
            code: `#include <stdio.h>

// Bubble Sort using Pointer Arithmetic *(a+i)
void bubbleSort(int *arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (*(arr + j) > *(arr + j + 1)) {
                int temp = *(arr + j);
                *(arr + j) = *(arr + j + 1);
                *(arr + j + 1) = temp;
            }
        }
    }
}

int main() {
    printf("=== NPTEL Week 5: Arrays & Pointers ===\\n\\n");

    // 1. *(a+i) Pointer Arithmetic Demonstration
    int a[] = {10, 20, 30, 40, 50};
    int n = 5;
    printf("[1. Pointer-Array Equivalence *(a+i)]:\\n");
    for (int i = 0; i < n; i++) {
        printf("Index %d -> arr[%d]=%d | *(arr+%d)=%d | Address=%p\\n",
               i, i, a[i], i, *(a + i), (void*)(a + i));
    }
    printf("\\n");

    // 2. Sorting Array
    int data[] = {64, 25, 12, 22, 11};
    int dataSize = sizeof(data) / sizeof(data[0]);
    bubbleSort(data, dataSize);
    printf("[2. Sorted Array]: ");
    for (int i = 0; i < dataSize; i++) printf("%d ", *(data + i));
    printf("\\n\\n");

    // 3. Matrix Multiplication (2x2)
    int A[2][2] = {{1, 2}, {3, 4}};
    int B[2][2] = {{5, 6}, {7, 8}};
    int C[2][2] = {0};

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    printf("[3. 2D Matrix Multiplication (A x B)]:\\n");
    for (int i = 0; i < 2; i++) {
        printf("| %4d %4d |\\n", C[i][0], C[i][1]);
    }

    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Search in Rotated Sorted Array",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
            platform: "LeetCode",
            topicTag: "Arrays"
          },
          {
            title: "Pointers and Arrays Relationship in C",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/pointer-array-c-relationship/",
            platform: "GeeksforGeeks",
            topicTag: "Pointers"
          }
        ]
      }
    ]
  },

  // ==========================================
  // WEEK 6: DYNAMIC MEMORY & FILE HANDLING
  // ==========================================
  {
    id: "nptel-week-6",
    name: "Week 6: Dynamic Memory & File Handling",
    shortDesc: "malloc, calloc, realloc, free, memory leaks, and file operations (fopen, fclose, fprintf, fscanf).",
    iconName: "Database",
    topics: [
      {
        id: "c-week-6-dynamic-mem-files",
        slug: "pointers-and-dynamic-memory-allocation",
        title: "Week 6: Dynamic Memory & File Handling (malloc/free, File Mark Storage)",
        categoryId: "nptel-week-6",
        categoryName: "Week 6: Dynamic Memory & File Handling",
        difficulty: "Intermediate",
        estimatedTime: "35 mins",
        gfgSearchQuery: "C dynamic memory allocation malloc calloc realloc free file handling fopen fprintf fscanf",
        gfgUrl: "https://www.geeksforgeeks.org/dynamic-memory-allocation-in-c-using-malloc-calloc-free-and-realloc/",
        quickSummary: "Manage runtime heap memory allocation (malloc, calloc, realloc, free) to prevent memory leaks and dangling pointers, and persist structured datasets to disk using C file streams (fopen, fprintf, fscanf, fclose).",
        keyPoints: [
          "Heap Memory Functions: malloc(bytes) allocates uninitialized buffer; calloc(n, size) initializes memory to zero; realloc(ptr, new_size) resizes buffer; free(ptr) releases RAM to OS.",
          "Memory Leaks & Dangling Pointers: Failing to free allocated memory leaks RAM; accessing freed pointer causes undefined behavior (set ptr = NULL after free).",
          "File Stream Modes: \"w\" (write/overwrite), \"r\" (read), \"a\" (append), \"r+\" (read/write), \"wb\"/\"rb\" (binary mode).",
          "NPTEL Focus: Identifying memory leaks, file open error handling (checking fp == NULL), and pointer lifetime management.",
          "AI&DS Connection: Dynamic batch buffering for streaming dataset loading and disk-based file persistence for model weights and logs."
        ],
        diagramTitle: "Dynamic Heap Allocation Lifecycle & File Stream Architecture",
        diagram: `  [ malloc(n * sizeof(int)) ] ──► [ Heap Buffer in RAM ] ──► [ free(ptr); ptr=NULL ]
                                            │
                                            ▼
  [ FILE *fp = fopen("marks.txt", "w") ] ──► [ fprintf(fp, ...) ] ──► [ fclose(fp) ]`,
        complexities: [
          { operation: "malloc() / free()", best: "O(1)", avg: "O(1)", worst: "O(heap_search)", space: "O(allocated_bytes)" },
          { operation: "File Read / Write", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(4KB_buffer)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Dynamic Memory Allocation & File Storage)",
            code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    printf("=== NPTEL Week 6: Dynamic Memory & File Handling ===\\n\\n");

    // 1. Dynamic Array Allocation with malloc()
    int n = 4;
    int *scores = (int*) malloc(n * sizeof(int));
    if (scores == NULL) {
        printf("Heap allocation failed!\\n");
        return 1;
    }

    scores[0] = 95; scores[1] = 88; scores[2] = 76; scores[3] = 91;
    printf("[1. Heap Array Allocated]: ");
    for (int i = 0; i < n; i++) printf("%d ", scores[i]);
    printf("\\n\\n");

    // 2. File-Based Student Database Storage
    FILE *fp = fopen("nptel_student_marks.txt", "w");
    if (fp == NULL) {
        perror("File opening failed");
        free(scores);
        return 1;
    }

    fprintf(fp, "%d\\n", n);
    for (int i = 0; i < n; i++) {
        fprintf(fp, "Student_%d %d\\n", i + 1, scores[i]);
    }
    fclose(fp);
    printf("[2. File Written]: nptel_student_marks.txt created successfully.\\n\\n");

    // 3. Read back from File using fscanf()
    fp = fopen("nptel_student_marks.txt", "r");
    if (fp != NULL) {
        int count;
        fscanf(fp, "%d", &count);
        printf("[3. Reading Records from File]:\\n");
        for (int i = 0; i < count; i++) {
            char name[30];
            int mark;
            fscanf(fp, "%s %d", name, &mark);
            printf("Record #%d -> %-12s | Mark: %d\\n", i + 1, name, mark);
        }
        fclose(fp);
        remove("nptel_student_marks.txt"); // Clean up disk
    }

    // 4. Safe Deallocation
    free(scores);
    scores = NULL;
    printf("\\n[✓] Heap memory safely deallocated.\\n");

    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Dynamic Memory Allocation in C",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/dynamic-memory-allocation-in-c-using-malloc-calloc-free-and-realloc/",
            platform: "GeeksforGeeks",
            topicTag: "Dynamic Memory"
          },
          {
            title: "Basics of File Handling in C",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/basics-file-handling-c/",
            platform: "GeeksforGeeks",
            topicTag: "File I/O"
          }
        ]
      }
    ]
  },

  // ==========================================
  // WEEK 7: STRUCTURES AND LINKED LISTS
  // ==========================================
  {
    id: "nptel-week-7",
    name: "Week 7: Structures and Linked Lists",
    shortDesc: "Structure declaration, nested structures, structure pointers, linked list nodes, and insertion/deletion.",
    iconName: "ListTree",
    topics: [
      {
        id: "c-week-7-structs-linked-lists",
        slug: "structures-unions-and-typedef",
        title: "Week 7: Structures and Linked Lists (Student Record, Employee DB, Singly Linked List)",
        categoryId: "nptel-week-7",
        categoryName: "Week 7: Structures and Linked Lists",
        difficulty: "Intermediate",
        estimatedTime: "35 mins",
        gfgSearchQuery: "C structures nested structs singly linked list node creation insert delete",
        gfgUrl: "https://www.geeksforgeeks.org/structures-c/",
        quickSummary: "Construct heterogeneous composite data records with struct, access fields via pointer arrow operator (ptr->field), and implement dynamic Singly Linked Lists with node creation, head insertion, and deletion.",
        keyPoints: [
          "struct Architecture: Defines user composite types where each member has independent memory; sizeof(struct) accounts for word alignment padding.",
          "Structure Pointers: Arrow operator (ptr->name) is shorthand for (*ptr).name.",
          "Linked List Fundamentals: Self-referential structure containing data payload and pointer to next node: struct Node { int data; struct Node *next; }.",
          "Dynamic Node Allocation: Each node is allocated on the heap via malloc(sizeof(struct Node)).",
          "NPTEL Focus: Structure padding calculations, self-referential pointer dereferencing, and linked list insertion/deletion edge cases (empty list, head deletion).",
          "AI&DS Connection: Custom node representations are the core building block for AI search graph nodes, decision tree branches, and sparse matrix representations."
        ],
        diagramTitle: "Singly Linked List Dynamic Node Memory Structure",
        diagram: `  [ Head ] ──► [ Node 1: Val 10 | Next ] ──► [ Node 2: Val 20 | Next ] ──► [ NULL ]
  (0x1000)      (Allocated at 0x5000)          (Allocated at 0x7000)`,
        complexities: [
          { operation: "Head Insertion", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Traversal / Search", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Node Deletion", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Structures & Singly Linked List Implementation)",
            code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 1. Structure for Student Database
typedef struct {
    int rollNo;
    char name[40];
    float cgpa;
} Student;

// 2. Self-Referential Structure for Singly Linked List
typedef struct Node {
    int data;
    struct Node *next;
} Node;

// Insert at Head (O(1))
void insertHead(Node **head, int val) {
    Node *newNode = (Node*) malloc(sizeof(Node));
    newNode->data = val;
    newNode->next = *head;
    *head = newNode;
}

// Print Linked List
void printList(Node *head) {
    Node *curr = head;
    while (curr != NULL) {
        printf("[%d] -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");
}

int main() {
    printf("=== NPTEL Week 7: Structures & Linked Lists ===\\n\\n");

    // 1. Student Record Structure
    Student s1;
    s1.rollNo = 101;
    strcpy(s1.name, "Nishanth AI&DS");
    s1.cgpa = 9.45f;
    printf("[1. Student Record Structure]:\\n");
    printf("Roll No: %d | Name: %s | CGPA: %.2f\\n\\n", s1.rollNo, s1.name, s1.cgpa);

    // 2. Singly Linked List Implementation
    Node *head = NULL;
    insertHead(&head, 30);
    insertHead(&head, 20);
    insertHead(&head, 10);

    printf("[2. Singly Linked List Traversal]:\\n");
    printList(head);

    // Free Linked List Memory
    Node *curr = head;
    while (curr != NULL) {
        Node *temp = curr;
        curr = curr->next;
        free(temp);
    }
    printf("[✓] Linked list heap nodes safely freed.\\n");

    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Reverse Linked List (LeetCode #206)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/reverse-linked-list/",
            platform: "LeetCode",
            topicTag: "Linked Lists"
          },
          {
            title: "Structures and Linked List in C",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/linked-list-set-1-introduction/",
            platform: "GeeksforGeeks",
            topicTag: "Structures"
          }
        ]
      }
    ]
  },

  // ==========================================
  // WEEK 8: COMPLETE REVISION + NPTEL EXAM PREPARATION
  // ==========================================
  {
    id: "nptel-week-8",
    name: "Week 8: Complete Revision + NPTEL Exam Preparation",
    shortDesc: "Comprehensive review of all 7 weeks, 7-day study plan, and 100-question NPTEL mock exam preparation.",
    iconName: "Trophy",
    topics: [
      {
        id: "c-week-8-revision-exam",
        slug: "file-handling-and-preprocessor-directives",
        title: "Week 8: Complete Revision + NPTEL Exam Preparation (7-Day Plan & Mock Exam)",
        categoryId: "nptel-week-8",
        categoryName: "Week 8: Complete Revision + NPTEL Exam Preparation",
        difficulty: "Advanced",
        estimatedTime: "40 mins",
        gfgSearchQuery: "NPTEL C programming mock exam revision questions previous years",
        gfgUrl: "https://www.geeksforgeeks.org/c-programming-language/",
        quickSummary: "Consolidate all C core domains (variables, operators, conditions, loops, recursion, pointers, heap memory, structs, files, linked lists) with a targeted 7-day revision schedule and full NPTEL mock examination.",
        keyPoints: [
          "7-Day Practice Plan: Day 1–2 (Revise concepts), Day 3–4 (Solve previous NPTEL questions), Day 5 (Full mock test with 100 questions), Day 6 (Analyse mistakes), Day 7 (Final revision).",
          "Critical NPTEL Exam Focus Areas: Precedence tables, `*(a+i)` address indexing, pointer arithmetic, recursion stack tracing, dynamic memory leak diagnosis, and structure padding.",
          "Department Strategy: AI&DS C Programming Champions lead peer study circles and doubt-clearing sessions to achieve maximum NPTEL Elite/Gold certification rates."
        ],
        diagramTitle: "7-Day NPTEL Exam Preparation Strategy Schedule",
        diagram: `  [ Day 1-2: Core Concept Revision ] ──► [ Day 3-4: Previous Year NPTEL Papers ]
                                                              │
                                                              ▼
  [ Day 7: Final Rapid Review ] ◄── [ Day 6: Mistake Analysis ] ◄── [ Day 5: 100-Q Mock Test ]`,
        complexities: [
          { operation: "Full Diagnostic Scan", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Comprehensive Diagnostic Test Suite)",
            code: `#include <stdio.h>
#include <stdlib.h>

// Comprehensive Diagnostic Problem: Memory, Pointers, Struct & Calculation
typedef struct {
    int id;
    int scores[3];
} StudentData;

double calculateAverage(const int *arr, int size) {
    int total = 0;
    for (int i = 0; i < size; i++) {
        total += *(arr + i);
    }
    return (double)total / size;
}

int main() {
    printf("=== NPTEL Week 8: Final Exam Comprehensive Diagnostic ===\\n\\n");

    StudentData s = { .id = 201, .scores = {85, 90, 95} };
    double avg = calculateAverage(s.scores, 3);

    printf("Student ID: %d\\n", s.id);
    printf("Calculated Average: %.2f\\n", avg);
    printf("Exam Status: Ready for NPTEL C Programming Certification (100%% Prepared)\\n");

    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "NPTEL C Programming Previous Year Practice Quiz",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/c-programming-language/",
            platform: "GeeksforGeeks",
            topicTag: "Week 8 Revision"
          }
        ]
      }
    ]
  }
];
