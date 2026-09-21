import { Experiment } from "../experiments";

export const C_PROGRAMMING_EXPERIMENTS: Experiment[] = [
  // =========================================================================
  // WEEK 1: INTRODUCTION TO C PROGRAMMING & BASICS
  // =========================================================================
  {
    id: "c-exp-1",
    labId: "c-programming",
    title: "Week 1: Introduction to C Programming & Basics",
    slug: "c-fundamentals-variables-formatted-io",
    difficulty: "Beginner",
    category: "C Programming" as any,
    estimatedMinutes: 20,
    rating: 4.95,
    ratingsCount: 220,
    simulator: "custom",
    quizId: "quiz-c-1",
    sections: {
      introduction: "Week 1 focuses on C programming origins, the 4-stage GCC compilation pipeline (Preprocessor, Compiler, Assembler, Linker), variables, constants, primitive data types (char, int, float, double), and formatted console I/O using printf and scanf.",
      objective: "Learn the core structure of a C program and write foundational engineering programs: Hello World, Simple Calculator, Temperature Conversion (Celsius to Fahrenheit), and Area/Perimeter calculation.",
      videoUrl: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      videoTitle: "NPTEL C Programming Week 1: Introduction, Compilation & Basics",
      videoChannel: "NPTEL / FreeCodeCamp",
      prerequisites: ["Computer Fundamentals", "Basic Logic"],
      theory: {
        overview: "Execution begins at main(). Variables occupy contiguous stack memory based on their type: char (1B), int (4B), float (4B), double (8B). printf and scanf translate binary memory values to formatted human-readable text via format specifiers (%d, %f, %lf, %c).",
        keyConcepts: [
          { title: "Weekly Workflow", desc: "Mon–Wed: Concept learning + NPTEL video | Thu: Program practice | Fri: MCQ/MSQ practice | Sat: Coding assignment + peer discussion | Sun: Revision + mock test." },
          { title: "GCC 4-Stage Compilation", desc: "Preprocessor (#include) -> Compiler (assembly) -> Assembler (machine object) -> Linker (executable binary)." },
          { title: "Data Types & Format Specifiers", desc: "%d (integer), %f (float), %lf (double), %c (character), %s (string)." },
          { title: "AI&DS Engineering Connection", desc: "C provides deep insight into memory layout; foundation for high-performance tensor computing and AI backend libraries (PyTorch ATen, CUDA)." }
        ],
        complexities: [
          { operation: "Variable Read / Write", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Operating system kernel programming (Linux, Windows)",
          "High-performance tensor computing backends for AI/ML libraries",
          "Embedded microcontroller firmware and real-time hardware interfaces"
        ]
      },
      procedure: [
        "1. Write #include <stdio.h> preprocessor directive.",
        "2. Define the main() entry function.",
        "3. Declare int, float, char, and double variables for calculation.",
        "4. Perform arithmetic calculations for calculator, temperature conversion, and circle/rectangle geometry.",
        "5. Print formatted output values using printf specifiers.",
        "6. Compile with gcc main.c -o main and execute."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>
#define PI 3.14159265359

int main() {
    printf("=== NPTEL C Programming Week 1: Basic Programs ===\\n\\n");

    // 1. Hello World
    printf("[1. Hello World]: Hello, AI&DS Engineering World!\\n\\n");

    // 2. Simple Calculator
    double n1 = 50.0, n2 = 10.0;
    printf("[2. Simple Calculator]:\\n");
    printf("Sum: %.2lf | Diff: %.2lf | Prod: %.2lf | Div: %.2lf\\n\\n",
           n1 + n2, n1 - n2, n1 * n2, n1 / n2);

    // 3. Temperature Conversion (Celsius to Fahrenheit)
    double celsius = 37.0;
    double fahrenheit = (celsius * 9.0 / 5.0) + 32.0;
    printf("[3. Temperature Conversion]:\\n");
    printf("%.1lf C = %.1lf F\\n\\n", celsius, fahrenheit);

    // 4. Area & Perimeter Calculation
    double radius = 7.0;
    double length = 10.0, width = 5.0;
    printf("[4. Geometry Calculation]:\\n");
    printf("Circle Area: %.2lf | Circumference: %.2lf\\n", PI * radius * radius, 2 * PI * radius);
    printf("Rectangle Area: %.2lf | Perimeter: %.2lf\\n", length * width, 2 * (length + width));

    return 0;
}`
      },
      expectedOutput: `=== NPTEL C Programming Week 1: Basic Programs ===

[1. Hello World]: Hello, AI&DS Engineering World!

[2. Simple Calculator]:
Sum: 60.00 | Diff: 40.00 | Prod: 500.00 | Div: 5.00

[3. Temperature Conversion]:
37.0 C = 98.6 F

[4. Geometry Calculation]:
Circle Area: 153.94 | Circumference: 43.98
Rectangle Area: 50.00 | Perimeter: 30.00`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech AI&DS Engineering", "CSE", "IT"],
        pg: ["MCA", "M.Tech AI"]
      }
    }
  },

  // =========================================================================
  // WEEK 2: OPERATORS, EXPRESSIONS & DECISION MAKING
  // =========================================================================
  {
    id: "c-exp-2",
    labId: "c-programming",
    title: "Week 2: Operators, Expressions & Decision Making",
    slug: "control-flow-decision-making-switch-case",
    difficulty: "Beginner",
    category: "C Programming" as any,
    estimatedMinutes: 25,
    rating: 4.96,
    ratingsCount: 235,
    simulator: "custom",
    quizId: "quiz-c-2",
    sections: {
      introduction: "Week 2 covers arithmetic, relational, logical, bitwise, and assignment operators, operator precedence, if-else conditional ladders, nested conditions, and jump-table switch-case statements.",
      objective: "Implement conditional branching algorithms: finding largest of three numbers, student grade calculation, menu-driven calculation, and tiered electricity bill calculation.",
      videoUrl: "https://www.youtube-nocookie.com/embed/5bV_Q2u_0eA",
      videoTitle: "NPTEL C Programming Week 2: Operators & Decision Making",
      videoChannel: "NPTEL / Neso Academy",
      prerequisites: ["C Fundamentals", "Relational Operators"],
      theory: {
        overview: "Relational operators (==, !=, <, <=, >, >=) produce 1 (true) or 0 (false). Logical operators (&&, ||, !) allow multi-condition evaluation with short-circuit optimization. switch-case statements generate constant O(1) jump tables for integer/char selectors.",
        keyConcepts: [
          { title: "Weekly Workflow", desc: "Mon–Wed: Concept learning + NPTEL video | Thu: Program practice | Fri: MCQ/MSQ practice | Sat: Coding assignment + peer discussion | Sun: Revision + mock test." },
          { title: "Operator Precedence", desc: "Unary (++ --) > Multiplicative (* / %) > Additive (+ -) > Relational > Logical (&& ||) > Ternary (?:) > Assignment." },
          { title: "Short-Circuit Logic", desc: "In (A && B), B is skipped if A is false; in (A || B), B is skipped if A is true." },
          { title: "Assessment Target", desc: "25 MCQ + 5 Programming Questions for Week-2 evaluation." }
        ],
        complexities: [
          { operation: "Branch Evaluation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Tiered billing engines for utility and cloud resource charging",
          "Automated grading and performance classification systems",
          "State machine decision logic and rule-based AI reasoning"
        ]
      },
      procedure: [
        "1. Write program logic to compare 3 variables using nested ternary/if-else.",
        "2. Implement student grading ladder (>=90: O, >=80: A, >=70: B, >=60: C, >=50: D, else F).",
        "3. Build tiered electricity billing algorithm (0-100: Rs.1.5, 101-200: Rs.2.0, >200: Rs.3.0).",
        "4. Validate edge cases (exact tier boundaries and negative inputs).",
        "5. Execute and verify program output."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

int main() {
    printf("=== NPTEL Week 2: Operators & Decision Making ===\\n\\n");

    // 1. Largest of Three Numbers
    int a = 45, b = 78, c = 32;
    int largest = (a >= b && a >= c) ? a : (b >= c ? b : c);
    printf("[1. Largest of Three]: Between %d, %d, %d -> %d\\n\\n", a, b, c, largest);

    // 2. Student Grade Calculation
    float marks = 86.5f;
    char grade;
    if (marks >= 90.0) grade = 'O';
    else if (marks >= 80.0) grade = 'A';
    else if (marks >= 70.0) grade = 'B';
    else if (marks >= 60.0) grade = 'C';
    else if (marks >= 50.0) grade = 'D';
    else grade = 'F';
    printf("[2. Student Grade]: Marks: %.1f%% -> Grade: %c\\n\\n", marks, grade);

    // 3. Electricity Bill Calculation
    int units = 250;
    double bill = 0.0;
    if (units <= 100) {
        bill = units * 1.50;
    } else if (units <= 200) {
        bill = (100 * 1.50) + (units - 100) * 2.00;
    } else {
        bill = (100 * 1.50) + (100 * 2.00) + (units - 200) * 3.00;
    }
    printf("[3. Electricity Bill]: Units: %d -> Total Bill: Rs. %.2lf\\n", units, bill);

    return 0;
}`
      },
      expectedOutput: `=== NPTEL Week 2: Operators & Decision Making ===

[1. Largest of Three]: Between 45, 78, 32 -> 78

[2. Student Grade]: Marks: 86.5% -> Grade: A

[3. Electricity Bill]: Units: 250 -> Total Bill: Rs. 500.00`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },

  // =========================================================================
  // WEEK 3: LOOP CONSTRUCTS
  // =========================================================================
  {
    id: "c-exp-3",
    labId: "c-programming",
    title: "Week 3: Loop Constructs & Mini Task",
    slug: "iterative-loops-and-pattern-generation",
    difficulty: "Beginner",
    category: "C Programming" as any,
    estimatedMinutes: 30,
    rating: 4.97,
    ratingsCount: 260,
    simulator: "custom",
    quizId: "quiz-c-3",
    sections: {
      introduction: "Week 3 focuses on iterative control: for loop, while loop, do-while loop, nested loops, break, and continue statements. It includes essential numerical algorithms and the Week 3 Mini Task: Student Mark Analysis Program.",
      objective: "Implement iterative algorithms: Factorial calculation, Prime number checking in O(sqrt(n)), Fibonacci series generation, Number reversing, Pyramid pattern printing, and the Student Mark Analysis Program.",
      videoUrl: "https://www.youtube-nocookie.com/embed/3gV_0qM2u-A",
      videoTitle: "NPTEL C Programming Week 3: Loops & Mini Task",
      videoChannel: "NPTEL / FreeCodeCamp",
      prerequisites: ["Conditionals", "Arithmetic Operators"],
      theory: {
        overview: "for loops manage loop initialization, condition testing, and iteration stepping in a single compact header. while loops evaluate before entry; do-while guarantees at least one execution. Loop tracing and boundary inspection prevent infinite loops.",
        keyConcepts: [
          { title: "Weekly Workflow", desc: "Mon–Wed: Concept learning + NPTEL video | Thu: Program practice | Fri: MCQ/MSQ practice | Sat: Coding assignment + peer discussion | Sun: Revision + mock test." },
          { title: "NPTEL Focus Areas", desc: "Loop execution tracing, infinite loop identification, and nested loop output analysis." },
          { title: "Prime Optimization", desc: "Check factors only up to sqrt(n) reducing complexity from O(n) to O(sqrt(n))." },
          { title: "Week 3 Mini Task", desc: "Create the Student Mark Analysis Program calculating class average, highest/lowest scores, and pass counts." }
        ],
        complexities: [
          { operation: "Prime Check", best: "O(1)", avg: "O(sqrt(n))", worst: "O(sqrt(n))", space: "O(1)" },
          { operation: "Pattern Printing", best: "O(n^2)", avg: "O(n^2)", worst: "O(n^2)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Epoch training iterations in gradient descent and machine learning",
          "Data aggregation pipelines for business analytics dashboards",
          "Numerical simulation algorithms in scientific computing"
        ]
      },
      procedure: [
        "1. Write iterative factorial calculation using long long accumulator.",
        "2. Implement prime checking with condition i * i <= n.",
        "3. Generate Fibonacci series with iterative two-variable swapping.",
        "4. Reverse an integer using modulo % 10 and division / 10.",
        "5. Complete the Mini Task: Loop through student marks array to compute average, min, max, and pass count."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>
#include <stdbool.h>

bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int reverseNumber(int n) {
    int rev = 0;
    while (n > 0) {
        rev = rev * 10 + (n % 10);
        n /= 10;
    }
    return rev;
}

int main() {
    printf("=== NPTEL Week 3: Loops & Mini Task ===\\n\\n");

    // 1. Factorial & Prime
    int n = 6;
    long long fact = 1;
    for (int i = 1; i <= n; i++) fact *= i;
    printf("[1. Numerical]: %d! = %lld | isPrime(29) = %s | Reverse(1234) = %d\\n\\n",
           n, fact, isPrime(29) ? "YES" : "NO", reverseNumber(1234));

    // 2. Fibonacci Series (8 terms)
    printf("[2. Fibonacci Series]: ");
    int t1 = 0, t2 = 1;
    for (int i = 1; i <= 8; i++) {
        printf("%d ", t1);
        int next = t1 + t2;
        t1 = t2;
        t2 = next;
    }
    printf("\\n\\n");

    // 3. Mini Task: Student Mark Analysis Program
    int marks[] = {85, 92, 45, 78, 60, 32, 98, 88};
    int totalStudents = sizeof(marks) / sizeof(marks[0]);
    int sum = 0, max = marks[0], min = marks[0], passCount = 0;

    for (int i = 0; i < totalStudents; i++) {
        sum += marks[i];
        if (marks[i] > max) max = marks[i];
        if (marks[i] < min) min = marks[i];
        if (marks[i] >= 50) passCount++;
    }

    printf("=== Mini Task: Student Mark Analysis Program ===\\n");
    printf("Total Students: %d\\n", totalStudents);
    printf("Class Average:  %.2lf\\n", (double)sum / totalStudents);
    printf("Highest Mark:   %d\\n", max);
    printf("Lowest Mark:    %d\\n", min);
    printf("Passed (>=50):  %d / %d\\n", passCount, totalStudents);

    return 0;
}`
      },
      expectedOutput: `=== NPTEL Week 3: Loops & Mini Task ===

[1. Numerical]: 6! = 720 | isPrime(29) = YES | Reverse(1234) = 4321

[2. Fibonacci Series]: 0 1 1 2 3 5 8 13 

=== Mini Task: Student Mark Analysis Program ===
Total Students: 8
Class Average:  72.25
Highest Mark:   98
Lowest Mark:    32
Passed (>=50):  6 / 8`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },

  // =========================================================================
  // WEEK 4: FUNCTIONS AND RECURSION
  // =========================================================================
  {
    id: "c-exp-4",
    labId: "c-programming",
    title: "Week 4: Functions and Recursion",
    slug: "functions-and-recursion-factorial-gcd",
    difficulty: "Intermediate",
    category: "C Programming" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 240,
    simulator: "custom",
    quizId: "quiz-c-4",
    sections: {
      introduction: "Week 4 covers modular programming via function declarations, definitions, parameter passing (pass by value), local vs global vs static variable scopes, and recursive function mechanics.",
      objective: "Build modular calculator functions and recursive algorithms: Factorial using recursion, Fibonacci using recursion, and Euclidean Greatest Common Divisor (GCD).",
      videoUrl: "https://www.youtube-nocookie.com/embed/r_P3nF98N1M",
      videoTitle: "NPTEL C Programming Week 4: Functions & Recursion",
      videoChannel: "NPTEL / Neso Academy",
      prerequisites: ["C Fundamentals", "Loop Constructs"],
      theory: {
        overview: "Functions modularize code into reusable units with distinct activation stack frames. Pass-by-value copies variable values. static variables retain value across multiple function calls in the data segment. Recursion solves self-similar subproblems with base and recursive cases.",
        keyConcepts: [
          { title: "Weekly Workflow", desc: "Mon–Wed: Concept learning + NPTEL video | Thu: Program practice | Fri: MCQ/MSQ practice | Sat: Coding assignment + peer discussion | Sun: Revision + mock test." },
          { title: "Pass by Value", desc: "Parameters are local copies; mutating formal arguments inside a function does not alter caller variables." },
          { title: "Euclidean GCD", desc: "gcd(a, b) = gcd(b, a % b) with base case gcd(a, 0) = a running in O(log min(a,b))." },
          { title: "Assessment", desc: "30 NPTEL MCQs + Recursion tracing practice." }
        ],
        complexities: [
          { operation: "Euclidean GCD", best: "O(1)", avg: "O(log min(a,b))", worst: "O(log min(a,b))", space: "O(log n)" },
          { operation: "Recursive Factorial", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
        ],
        realWorldApplications: [
          "Divide-and-conquer algorithms (MergeSort, Fast Fourier Transform)",
          "Recursive tree parsing in NLP and AST compilers",
          "Cryptographic greatest common divisor calculations (RSA algorithm)"
        ]
      },
      procedure: [
        "1. Write modular function prototypes for arithmetic operations.",
        "2. Implement recursive Euclidean GCD: return (b == 0) ? a : gcd(b, a % b).",
        "3. Implement recursive Factorial with base condition n <= 1.",
        "4. Implement static variable counter tracking invocation counts.",
        "5. Compile, run, and verify call stack outputs."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

void callCounter() {
    static int count = 0;
    count++;
    printf("Static Function Invocation Count: %d\\n", count);
}

int main() {
    printf("=== NPTEL Week 4: Functions & Recursion ===\\n\\n");

    int a = 48, b = 18;
    printf("[1. Euclidean GCD]: gcd(%d, %d) = %d\\n\\n", a, b, gcd(a, b));

    int n = 5;
    printf("[2. Recursive Factorial]: %d! = %lld\\n\\n", n, factorial(n));

    printf("[3. Recursive Fibonacci(6)]: %d\\n\\n", fibonacci(6));

    printf("[4. Static Scope Demonstration]:\\n");
    callCounter();
    callCounter();
    callCounter();

    return 0;
}`
      },
      expectedOutput: `=== NPTEL Week 4: Functions & Recursion ===

[1. Euclidean GCD]: gcd(48, 18) = 6

[2. Recursive Factorial]: 5! = 120

[3. Recursive Fibonacci(6)]: 8

[4. Static Scope Demonstration]:
Static Function Invocation Count: 1
Static Function Invocation Count: 2
Static Function Invocation Count: 3`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },

  // =========================================================================
  // WEEK 5: ARRAYS AND POINTERS
  // =========================================================================
  {
    id: "c-exp-5",
    labId: "c-programming",
    title: "Week 5: Arrays and Pointers",
    slug: "1d-arrays-and-statistical-calculations",
    difficulty: "Intermediate",
    category: "C Programming" as any,
    estimatedMinutes: 35,
    rating: 4.98,
    ratingsCount: 290,
    simulator: "custom",
    quizId: "quiz-c-5",
    sections: {
      introduction: "Week 5 explores 1D and 2D arrays, array searching and sorting, pointer basics, pointer arithmetic, and the core relationship between arrays and pointers in C (*(a+i)).",
      objective: "Master array operations, pointer dereferencing, searching/sorting algorithms, and 2D matrix multiplication with direct application to AI&DS datasets.",
      videoUrl: "https://www.youtube-nocookie.com/embed/2PgYwA_k4qY",
      videoTitle: "NPTEL C Programming Week 5: Arrays, Pointers & *(a+i)",
      videoChannel: "NPTEL / Neso Academy",
      prerequisites: ["Functions", "Loops"],
      theory: {
        overview: "An array name acts as a constant pointer to its first element. The expression arr[i] translates directly to *(arr + i). Pointers store memory addresses and enable pointer arithmetic (ptr + 1 advances by sizeof(*ptr) bytes).",
        keyConcepts: [
          { title: "Weekly Workflow", desc: "Mon–Wed: Concept learning + NPTEL video | Thu: Program practice | Fri: MCQ/MSQ practice | Sat: Coding assignment + peer discussion | Sun: Revision + mock test." },
          { title: "NPTEL Key Concept: *(a+i)", desc: "arr[i] is syntactically equivalent to *(arr + i), *(i + arr), and i[arr]." },
          { title: "Address Calculation", desc: "Address(arr[i]) = Base_Address + (i * sizeof(type))." },
          { title: "AI&DS Engineering Connection", desc: "Arrays are the fundamental representation for multi-dimensional tensors, feature vectors, and machine learning numerical datasets." }
        ],
        complexities: [
          { operation: "Linear Search", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Bubble Sort", best: "O(n)", avg: "O(n^2)", worst: "O(n^2)", space: "O(1)" },
          { operation: "Matrix Multiplication", best: "O(r * c * k)", avg: "O(r * c * k)", worst: "O(r * c * k)", space: "O(r * k)" }
        ],
        realWorldApplications: [
          "Tensor and matrix multiplication kernels in PyTorch / NumPy",
          "Feature dataset representations in machine learning pipelines",
          "Image pixel buffer processing in computer vision"
        ]
      },
      procedure: [
        "1. Declare 1D array and demonstrate pointer address equivalence *(arr + i).",
        "2. Implement Bubble Sort using pointer arithmetic.",
        "3. Implement 2D matrix multiplication using nested loops.",
        "4. Print sorted array and resulting matrix product.",
        "5. Verify pointer increment steps across memory boundaries."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

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

    // 1. Pointer-Array Equivalence: *(a+i)
    int arr[] = {10, 25, 30, 45, 50};
    int n = 5;
    printf("[1. *(a+i) Concept]:\\n");
    for (int i = 0; i < n; i++) {
        printf("arr[%d] = %d | *(arr + %d) = %d | Address: %p\\n",
               i, arr[i], i, *(arr + i), (void*)(arr + i));
    }
    printf("\\n");

    // 2. Sorting Array with Pointers
    int data[] = {64, 34, 25, 12, 22, 11, 90};
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

    printf("[3. 2D Matrix Multiplication]:\\n");
    for (int i = 0; i < 2; i++) {
        printf("| %4d %4d |\\n", C[i][0], C[i][1]);
    }

    return 0;
}`
      },
      expectedOutput: `=== NPTEL Week 5: Arrays & Pointers ===

[1. *(a+i) Concept]:
arr[0] = 10 | *(arr + 0) = 10 | Address: 0x...
arr[1] = 25 | *(arr + 1) = 25 | Address: 0x...
arr[2] = 30 | *(arr + 2) = 30 | Address: 0x...
arr[3] = 45 | *(arr + 3) = 45 | Address: 0x...
arr[4] = 50 | *(arr + 4) = 50 | Address: 0x...

[2. Sorted Array]: 11 12 22 25 34 64 90 

[3. 2D Matrix Multiplication]:
|   19   22 |
|   43   50 |`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech AI&DS Engineering", "CSE"],
        pg: ["MCA"]
      }
    }
  },

  // =========================================================================
  // WEEK 6: DYNAMIC MEMORY & FILE HANDLING
  // =========================================================================
  {
    id: "c-exp-6",
    labId: "c-programming",
    title: "Week 6: Dynamic Memory & File Handling",
    slug: "pointers-and-dynamic-memory-allocation",
    difficulty: "Intermediate",
    category: "C Programming" as any,
    estimatedMinutes: 35,
    rating: 4.96,
    ratingsCount: 250,
    simulator: "custom",
    quizId: "quiz-c-6",
    sections: {
      introduction: "Week 6 covers dynamic memory allocation on the heap (malloc, calloc, realloc, free), prevention of memory leaks, and disk file stream I/O operations (fopen, fclose, fprintf, fscanf).",
      objective: "Implement dynamic heap array creation, file-based student mark persistence, and robust error/leak handling.",
      videoUrl: "https://www.youtube-nocookie.com/embed/VCIVXPoiLpU",
      videoTitle: "NPTEL C Programming Week 6: Dynamic Memory & File Handling",
      videoChannel: "NPTEL / FreeCodeCamp",
      prerequisites: ["Pointers", "Arrays"],
      theory: {
        overview: "malloc(size) allocates uninitialized heap memory; calloc(n, size) initializes memory to zero; realloc resizes buffers; free(ptr) deallocates memory back to the OS. File handling utilizes FILE* pointers with modes \"w\", \"r\", and \"a\" for permanent disk storage.",
        keyConcepts: [
          { title: "Weekly Workflow", desc: "Mon–Wed: Concept learning + NPTEL video | Thu: Program practice | Fri: MCQ/MSQ practice | Sat: Coding assignment + peer discussion | Sun: Revision + mock test." },
          { title: "NPTEL Focus Areas", desc: "Memory leaks, dangling pointers, file access modes, and safe free() practices." },
          { title: "File Operations", desc: "fopen() opens stream; fprintf() writes formatted text; fscanf() reads formatted text; fclose() flushes and closes stream buffer." },
          { title: "AI&DS Connection", desc: "Batch data streaming from disk, model parameter checkpointing, and dynamic feature buffer allocation." }
        ],
        complexities: [
          { operation: "malloc() / free()", best: "O(1)", avg: "O(1)", worst: "O(heap_scan)", space: "O(allocated_bytes)" },
          { operation: "File Stream Read / Write", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(4KB_buffer)" }
        ],
        realWorldApplications: [
          "Streaming large AI datasets too big to fit in RAM",
          "Logging training telemetry and saving model checkpoint files",
          "Database record file indexing systems"
        ]
      },
      procedure: [
        "1. Allocate dynamic integer array using malloc(n * sizeof(int)).",
        "2. Check for allocation failure (ptr == NULL).",
        "3. Open file in write mode (\"w\") using fopen() and write student records via fprintf().",
        "4. Close file with fclose(), reopen in read mode (\"r\"), and read back via fscanf().",
        "5. Free heap memory with free(ptr) and set ptr = NULL to prevent dangling pointers."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    printf("=== NPTEL Week 6: Dynamic Memory & File Handling ===\\n\\n");

    // 1. Dynamic Array Allocation
    int n = 4;
    int *marks = (int*) malloc(n * sizeof(int));
    if (marks == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    marks[0] = 95; marks[1] = 88; marks[2] = 76; marks[3] = 92;
    printf("[1. Dynamic Heap Array Allocated]: ");
    for (int i = 0; i < n; i++) printf("%d ", marks[i]);
    printf("\\n\\n");

    // 2. File Handling: Writing Student Database
    FILE *fp = fopen("student_database.txt", "w");
    if (fp == NULL) {
        perror("File creation failed");
        free(marks);
        return 1;
    }

    fprintf(fp, "%d\\n", n);
    for (int i = 0; i < n; i++) {
        fprintf(fp, "Student_%d %d\\n", i + 1, marks[i]);
    }
    fclose(fp);
    printf("[2. File Storage]: student_database.txt written successfully.\\n\\n");

    // 3. File Handling: Reading from Disk
    fp = fopen("student_database.txt", "r");
    if (fp != NULL) {
        int count;
        fscanf(fp, "%d", &count);
        printf("[3. Reading Records from File]:\\n");
        for (int i = 0; i < count; i++) {
            char name[30];
            int score;
            fscanf(fp, "%s %d", name, &score);
            printf("Record #%d -> %-12s | Mark: %d\\n", i + 1, name, score);
        }
        fclose(fp);
        remove("student_database.txt"); // Clean up disk
    }

    // 4. Safe Memory Cleanup
    free(marks);
    marks = NULL;
    printf("\\n[✓] Dynamic memory freed; zero leaks.\\n");

    return 0;
}`
      },
      expectedOutput: `=== NPTEL Week 6: Dynamic Memory & File Handling ===

[1. Dynamic Heap Array Allocated]: 95 88 76 92 

[2. File Storage]: student_database.txt written successfully.

[3. Reading Records from File]:
Record #1 -> Student_1    | Mark: 95
Record #2 -> Student_2    | Mark: 88
Record #3 -> Student_3    | Mark: 76
Record #4 -> Student_4    | Mark: 92

[✓] Dynamic memory freed; zero leaks.`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },

  // =========================================================================
  // WEEK 7: STRUCTURES AND LINKED LISTS
  // =========================================================================
  {
    id: "c-exp-7",
    labId: "c-programming",
    title: "Week 7: Structures and Linked Lists",
    slug: "structures-unions-and-typedef",
    difficulty: "Intermediate",
    category: "C Programming" as any,
    estimatedMinutes: 35,
    rating: 4.97,
    ratingsCount: 270,
    simulator: "custom",
    quizId: "quiz-c-7",
    sections: {
      introduction: "Week 7 explores heterogeneous data encapsulation via struct declarations, nested structures, structure pointers (->), and dynamic self-referential structures (Singly Linked List node creation, insertion, and deletion).",
      objective: "Build student records and employee databases using structures, and implement a dynamic Singly Linked List with head insertion, traversal, and memory cleanup.",
      videoUrl: "https://www.youtube-nocookie.com/embed/TxjIlqW1wZc",
      videoTitle: "NPTEL C Programming Week 7: Structures & Linked Lists",
      videoChannel: "NPTEL / Neso Academy",
      prerequisites: ["Pointers", "Dynamic Memory"],
      theory: {
        overview: "struct bundles multiple heterogeneous variables into a single composite type. A Singly Linked List is a linear dynamic data structure composed of heap-allocated nodes containing a data payload and a pointer to the next node.",
        keyConcepts: [
          { title: "Weekly Workflow", desc: "Mon–Wed: Concept learning + NPTEL video | Thu: Program practice | Fri: MCQ/MSQ practice | Sat: Coding assignment + peer discussion | Sun: Revision + mock test." },
          { title: "Structure Pointers", desc: "ptr->member is syntactic shorthand for (*ptr).member." },
          { title: "Linked List Mechanics", desc: "O(1) head insertion without memory reallocation or shifting." },
          { title: "AI&DS Engineering Connection", desc: "Custom node representations are mandatory for AI search graphs (A*, Dijkstra), decision trees, and sparse graph processing." }
        ],
        complexities: [
          { operation: "Head Insertion", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Traversal / Search", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Graph adjacency list representations in social networks and AI pathfinding",
          "Dynamic task schedulers and memory allocation free-lists",
          "Symbol tables in compilers and interpreters"
        ]
      },
      procedure: [
        "1. Define struct Student containing id, name, and cgpa.",
        "2. Define self-referential struct Node with int data and struct Node* next.",
        "3. Implement insertHead() function allocating node via malloc().",
        "4. Traverse and print linked list elements.",
        "5. Free all linked list heap nodes in a loop."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 1. Structure for Student Record
typedef struct {
    int rollNo;
    char name[40];
    float cgpa;
} Student;

// 2. Singly Linked List Node
typedef struct Node {
    int data;
    struct Node *next;
} Node;

void insertHead(Node **head, int val) {
    Node *newNode = (Node*) malloc(sizeof(Node));
    newNode->data = val;
    newNode->next = *head;
    *head = newNode;
}

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
    Student s1 = { .rollNo = 101, .cgpa = 9.45f };
    strcpy(s1.name, "Anish (AI&DS)");
    printf("[1. Student Record Structure]:\\n");
    printf("Roll No: %d | Name: %s | CGPA: %.2f\\n\\n", s1.rollNo, s1.name, s1.cgpa);

    // 2. Singly Linked List Implementation
    Node *head = NULL;
    insertHead(&head, 30);
    insertHead(&head, 20);
    insertHead(&head, 10);

    printf("[2. Singly Linked List Traversal]:\\n");
    printList(head);

    // 3. Memory Cleanup
    Node *curr = head;
    while (curr != NULL) {
        Node *temp = curr;
        curr = curr->next;
        free(temp);
    }
    printf("[✓] Linked list nodes freed successfully.\\n");

    return 0;
}`
      },
      expectedOutput: `=== NPTEL Week 7: Structures & Linked Lists ===

[1. Student Record Structure]:
Roll No: 101 | Name: Anish (AI&DS) | CGPA: 9.45

[2. Singly Linked List Traversal]:
[10] -> [20] -> [30] -> NULL
[✓] Linked list nodes freed successfully.`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },

  // =========================================================================
  // WEEK 8: COMPLETE REVISION + NPTEL EXAM PREPARATION
  // =========================================================================
  {
    id: "c-exp-8",
    labId: "c-programming",
    title: "Week 8: Complete Revision + NPTEL Exam Preparation",
    slug: "file-handling-and-preprocessor-directives",
    difficulty: "Advanced",
    category: "C Programming" as any,
    estimatedMinutes: 40,
    rating: 4.99,
    ratingsCount: 310,
    simulator: "custom",
    quizId: "quiz-c-8",
    sections: {
      introduction: "Week 8 delivers comprehensive revision across all 7 weeks of C programming and full preparation for the NPTEL Certification Exam: variables, operators, conditions, loops, recursion, arrays, pointers, dynamic memory, structs, files, and linked lists.",
      objective: "Execute the 7-Day NPTEL Practice Plan, solve comprehensive diagnostic multi-topic problems, and complete the full NPTEL Mock Examination.",
      videoUrl: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      videoTitle: "NPTEL C Programming Week 8: Complete Revision & Mock Exam",
      videoChannel: "NPTEL Master Academy",
      prerequisites: ["Weeks 1 to 7 Full Curriculum"],
      theory: {
        overview: "NPTEL certification exams test syntax mastery, operator precedence edge cases, pointer arithmetic, recursion stack tracing, dynamic memory leak diagnosis, and structure padding. This week executes a structured 7-day revision schedule to ensure Elite / Gold medal certification.",
        keyConcepts: [
          { title: "7-Day Practice Plan", desc: "Day 1–2: Revise concepts | Day 3–4: Solve previous NPTEL questions | Day 5: Full mock test (100 questions) | Day 6: Analyse mistakes | Day 7: Final revision." },
          { title: "Core Focus Areas", desc: "Precedence tables, *(a+i) dereferencing, recursion base cases, malloc/free leaks, and file mode error handling." },
          { title: "Faculty Champions Initiative", desc: "20–30 peer student champions lead doubt-clearing sessions and weekly practice circles." }
        ],
        complexities: [
          { operation: "Diagnostic Scan", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "NPTEL Certification Examination readiness with Elite / Gold grade",
          "Technical interview and competitive programming foundation",
          "Engineering competency for high-performance AI system development"
        ]
      },
      procedure: [
        "1. Execute Day 1–2 rapid conceptual review across all topics.",
        "2. Solve previous year NPTEL assignment problems.",
        "3. Run comprehensive diagnostic program integrating structs, pointers, arrays, and functions.",
        "4. Take the full Week 8 NPTEL Mock Examination.",
        "5. Review test metrics and clarify doubts with C Programming Champions."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id;
    char name[30];
    int scores[3];
} Candidate;

double computeAverage(const int *scores, int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += *(scores + i);
    }
    return (double)sum / n;
}

int main() {
    printf("=== NPTEL Week 8: Complete Revision Diagnostic ===\\n\\n");

    Candidate c1 = {
        .id = 2026,
        .name = "AI&DS Champion",
        .scores = {92, 88, 96}
    };

    double avg = computeAverage(c1.scores, 3);

    printf("Candidate ID:   %d\\n", c1.id);
    printf("Candidate Name: %s\\n", c1.name);
    printf("Exam Scores:    %d, %d, %d\\n", c1.scores[0], c1.scores[1], c1.scores[2]);
    printf("Average Score:  %.2lf\\n\\n", avg);
    printf("[✓] 100%% Prepared for NPTEL C Programming Certification Examination!\\n");

    return 0;
}`
      },
      expectedOutput: `=== NPTEL Week 8: Complete Revision Diagnostic ===

Candidate ID:   2026
Candidate Name: AI&DS Champion
Exam Scores:    92, 88, 96
Average Score:  92.00

[✓] 100% Prepared for NPTEL C Programming Certification Examination!`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  }
];
