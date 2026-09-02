import { Experiment } from "../experiments";

export const C_PROGRAMMING_EXPERIMENTS: Experiment[] = [
  {
    id: "c-exp-1",
    labId: "c-programming",
    title: "Exp 1: Fundamentals, Variables, Data Types & Formatted I/O",
    slug: "c-fundamentals-variables-formatted-io",
    difficulty: "Beginner",
    category: "C Programming" as any,
    estimatedMinutes: 20,
    rating: 4.90,
    ratingsCount: 120,
    simulator: "custom",
    quizId: "quiz-c-1",
    sections: {
      introduction: "C is a statically typed procedural language where variables must be declared with explicit data types (int, float, char, double) and formatted using standard I/O streams.",
      objective: "Understand C syntax, data types, format specifiers (%d, %f, %c, %lf), and formatted console I/O using printf and scanf.",
      videoUrl: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      videoTitle: "C Programming Full Course",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Computer Fundamentals", "Basic Logic"],
      theory: {
        overview: "C program execution begins at the main() function. Variables allocate fixed memory on the stack based on type: char (1B), int (4B), float (4B), double (8B). printf and scanf translate binary values to human-readable strings using format specifiers.",
        keyConcepts: [
          { title: "Primitive Types & Sizing", desc: "sizeof operator calculates byte capacity allocated by the compiler." },
          { title: "Format Specifiers", desc: "%d (integer), %f (float), %lf (double), %c (character), %s (string)." },
          { title: "Type Conversions", desc: "Explicit casting (float)a / b forces floating-point division." }
        ],
        complexities: [
          { operation: "Variable Read / Write", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Operating system kernel programming (Linux, Windows)",
          "Embedded microcontroller firmware development",
          "Device drivers and real-time hardware interfaces"
        ]
      },
      procedure: [
        "1. Write #include <stdio.h> preprocessor directive.",
        "2. Declare integer, float, char, and double variables.",
        "3. Read user inputs using scanf with address-of operator &.",
        "4. Print formatted outputs using printf.",
        "5. Compile and run with gcc main.c -o main."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

int main() {
    int roll_no = 101;
    char grade = 'A';
    float marks = 94.50f;
    double cgpa = 9.45;

    printf("=== Student Academic Profile ===\\n");
    printf("Roll Number: %d\\n", roll_no);
    printf("Grade:       %c\\n", grade);
    printf("Marks:       %.2f%%\\n", marks);
    printf("CGPA:        %.2lf\\n", cgpa);
    return 0;
}`
      },
      expectedOutput: `=== Student Academic Profile ===
Roll Number: 101
Grade:       A
Marks:       94.50%
CGPA:        9.45`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "c-exp-2",
    labId: "c-programming",
    title: "Exp 2: Control Flow & Decision Making: if-else ladder, switch-case, leap year and quadratic roots",
    slug: "control-flow-decision-making-switch-case",
    difficulty: "Beginner",
    category: "C Programming" as any,
    estimatedMinutes: 25,
    rating: 4.92,
    ratingsCount: 125,
    simulator: "custom",
    quizId: "quiz-c-2",
    sections: {
      introduction: "Decision making statements alter linear program flow using relational comparison expressions and branching.",
      objective: "Evaluate conditional branches using if-else ladders and switch-case to find quadratic equation roots and evaluate leap years.",
      videoUrl: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      videoTitle: "C Decision Making Statements",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["C Fundamentals", "Relational Operators"],
      theory: {
        overview: "Quadratic discriminant D = b^2 - 4ac determines root nature: Real & Distinct (D > 0), Real & Equal (D == 0), Complex (D < 0). Leap year evaluation verifies (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0).",
        keyConcepts: [
          { title: "if-else Ladder", desc: "Evaluates multi-condition decision trees sequentially." },
          { title: "switch-case Statement", desc: "Constant integer/character jump table branching with break." },
          { title: "Ternary Operator", desc: "(condition) ? value_if_true : value_if_false." }
        ],
        complexities: [
          { operation: "Branch Evaluation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Game engine state machines and user action handling",
          "Automated financial credit score bracket classification",
          "Sensor threshold safety cutoff controllers"
        ]
      },
      procedure: [
        "1. Input quadratic coefficients a, b, c.",
        "2. Compute discriminant d = b*b - 4*a*c.",
        "3. Branch on d > 0, d == 0, d < 0.",
        "4. Calculate roots using sqrt() from <math.h>.",
        "5. Output roots."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>
#include <math.h>

int main() {
    double a = 1, b = -7, c = 12;
    double d = b * b - 4 * a * c;

    if (d > 0) {
        double r1 = (-b + sqrt(d)) / (2 * a);
        double r2 = (-b - sqrt(d)) / (2 * a);
        printf("Real and Distinct Roots: x1 = %.2lf, x2 = %.2lf\\n", r1, r2);
    } else if (d == 0) {
        double r = -b / (2 * a);
        printf("Real and Equal Root: x = %.2lf\\n", r);
    } else {
        printf("Complex Conjugate Roots.\\n");
    }
    return 0;
}`
      },
      expectedOutput: `Real and Distinct Roots: x1 = 4.00, x2 = 3.00`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "c-exp-3",
    labId: "c-programming",
    title: "Exp 3: Iterative Loops & Patterns: for, while, do-while loops, Prime numbers, Fibonacci, Patterns",
    slug: "iterative-loops-and-pattern-generation",
    difficulty: "Beginner",
    category: "C Programming" as any,
    estimatedMinutes: 25,
    rating: 4.93,
    ratingsCount: 130,
    simulator: "custom",
    quizId: "quiz-c-3",
    sections: {
      introduction: "Iterative loops automate repetitive computations and generate nested geometric patterns.",
      objective: "Implement prime number testing in O(sqrt(n)), Fibonacci sequence generation, and nested star pyramid patterns.",
      videoUrl: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      videoTitle: "C Loops and Pattern Printing",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Control Flow", "Arithmetic Operators"],
      theory: {
        overview: "for loops handle counted iterations; while loops handle indefinite conditions; do-while executes loop body at least once. Prime test checks divisors up to sqrt(n).",
        keyConcepts: [
          { title: "O(sqrt(n)) Prime Check", desc: "If n has factor > sqrt(n), it must also have matching factor < sqrt(n)." },
          { title: "Nested Loops", desc: "Outer loop drives rows; inner loops drive spaces and character columns." }
        ],
        complexities: [
          { operation: "Prime Check", best: "O(1)", avg: "O(sqrt(n))", worst: "O(sqrt(n))", space: "O(1)" },
          { operation: "Pyramid Pattern", best: "O(n^2)", avg: "O(n^2)", worst: "O(n^2)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Cryptography prime factor generation (RSA encryption)",
          "Digital signal processing sample windowing loops",
          "Terminal GUI rendering and console game graphics"
        ]
      },
      procedure: [
        "1. Write prime check function iterating i from 2 up to i*i <= n.",
        "2. Generate Fibonacci terms using iterative addition.",
        "3. Construct nested for loops for star pyramid printing.",
        "4. Print outputs."
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

int main() {
    printf("Is 37 prime? %s\\n", isPrime(37) ? "YES" : "NO");
    
    printf("First 7 Fibonacci numbers: ");
    int a = 0, b = 1;
    for (int i = 0; i < 7; i++) {
        printf("%d ", a);
        int next = a + b;
        a = b; b = next;
    }
    printf("\\n");
    return 0;
}`
      },
      expectedOutput: `Is 37 prime? YES
First 7 Fibonacci numbers: 0 1 1 2 3 5 8 `,
      leetcodeProblems: [
        {
          id: 30,
          title: "Fibonacci Number (LeetCode #509)",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/fibonacci-number/",
          description: "Calculate F(n) where F(n) = F(n-1) + F(n-2).",
          approach: "Iterative dynamic programming loop in O(n) time.",
          javaSnippet: `// Solution`
        }
      ],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "c-exp-4",
    labId: "c-programming",
    title: "Exp 4: 1D Arrays & Statistical Calculations: Min, Max, Average, Linear Search, Frequency",
    slug: "1d-arrays-and-statistical-calculations",
    difficulty: "Beginner",
    category: "C Programming" as any,
    estimatedMinutes: 25,
    rating: 4.90,
    ratingsCount: 115,
    simulator: "custom",
    quizId: "quiz-c-4",
    sections: {
      introduction: "1D arrays store homogeneous elements in contiguous heap/stack memory addressed via zero-based indices.",
      objective: "Traverse single-dimensional arrays, find minimum/maximum values, calculate average, and perform Linear Search in O(n) time.",
      videoUrl: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      videoTitle: "Arrays in C",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["C Fundamentals", "Loops"],
      theory: {
        overview: "Array elements reside contiguously in memory. Memory address of element i = base_address + i * sizeof(type). Array names decay into pointers to their first elements.",
        keyConcepts: [
          { title: "Contiguous Memory Buffer", desc: "Enables O(1) random index access." },
          { title: "Linear Search", desc: "Scans array sequentially from index 0 to n-1 to find target key." },
          { title: "Single-Pass Statistics", desc: "Computes min, max, sum in one O(n) traversal pass." }
        ],
        complexities: [
          { operation: "Index Access", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Linear Search / Min-Max", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Audio signal pulse code modulation (PCM) sample buffers",
          "Sensor telemetry continuous time-series logging",
          "Lookup tables in embedded DSP microcontrollers"
        ]
      },
      procedure: [
        "1. Declare integer array with elements.",
        "2. Compute number of elements n = sizeof(arr)/sizeof(arr[0]).",
        "3. Traverse array updating min, max, and total sum.",
        "4. Implement Linear Search function.",
        "5. Output statistics and search results."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

int main() {
    int scores[] = {85, 92, 78, 96, 64, 88};
    int n = sizeof(scores) / sizeof(scores[0]);

    int min = scores[0], max = scores[0], sum = 0;
    for (int i = 0; i < n; i++) {
        if (scores[i] < min) min = scores[i];
        if (scores[i] > max) max = scores[i];
        sum += scores[i];
    }

    printf("Min: %d | Max: %d | Avg: %.2f\\n", min, max, (float)sum / n);
    int target = 96;
    int idx = linearSearch(scores, n, target);
    printf("Found %d at index: %d\\n", target, idx);
    return 0;
}`
      },
      expectedOutput: `Min: 64 | Max: 96 | Avg: 83.83
Found 96 at index: 3`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "c-exp-5",
    labId: "c-programming",
    title: "Exp 5: 2D Arrays & Matrix Mathematics: Addition, Multiplication, Transpose, Diagonal Sum",
    slug: "2d-arrays-and-matrix-mathematics",
    difficulty: "Intermediate",
    category: "C Programming" as any,
    estimatedMinutes: 30,
    rating: 4.93,
    ratingsCount: 125,
    simulator: "custom",
    quizId: "quiz-c-5",
    sections: {
      introduction: "2D Arrays in C are stored in Row-Major order in contiguous memory, supporting linear algebra matrix operations.",
      objective: "Implement matrix addition, matrix multiplication using triple nested loops, and diagonal sum computation.",
      videoUrl: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      videoTitle: "2D Arrays & Matrices in C",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["1D Arrays", "Nested Loops"],
      theory: {
        overview: "Row-Major layout stores consecutive rows in contiguous memory addresses. Element (i, j) = base + (i * cols + j) * sizeof(type). Matrix multiplication C[i][j] = sum_k(A[i][k] * B[k][j]) requires cols_A == rows_B.",
        keyConcepts: [
          { title: "Row-Major Memory Order", desc: "Linearized 2D matrix layout in physical RAM." },
          { title: "Matrix Dot Product", desc: "O(r * c * k) matrix multiplication triple loop." },
          { title: "Principal Diagonal", desc: "Elements where row index == col index (i == j)." }
        ],
        complexities: [
          { operation: "Matrix Addition", best: "O(r * c)", avg: "O(r * c)", worst: "O(r * c)", space: "O(r * c)" },
          { operation: "Matrix Multiplication", best: "O(r * c * k)", avg: "O(r * c * k)", worst: "O(r * c * k)", space: "O(r * k)" }
        ],
        realWorldApplications: [
          "2D image pixel convolution filter operations",
          "Computer graphics affine transformations",
          "Physics finite difference numerical modeling"
        ]
      },
      procedure: [
        "1. Declare 2D matrices A[2][2], B[2][2], C[2][2].",
        "2. Execute matrix multiplication algorithm.",
        "3. Compute main diagonal sum.",
        "4. Print resulting matrices."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

int main() {
    int A[2][2] = {{1, 2}, {3, 4}};
    int B[2][2] = {{5, 6}, {7, 8}};
    int C[2][2] = {0};

    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 2; k++)
                C[i][j] += A[i][k] * B[k][j];

    int diag_sum = 0;
    for (int i = 0; i < 2; i++) diag_sum += C[i][i];

    printf("Product Matrix C (2x2):\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) printf("%4d", C[i][j]);
        printf("\\n");
    }
    printf("Principal Diagonal Sum: %d\\n", diag_sum);
    return 0;
}`
      },
      expectedOutput: `Product Matrix C (2x2):
  19  22
  43  50
Principal Diagonal Sum: 69`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "c-exp-6",
    labId: "c-programming",
    title: "Exp 6: String Manipulation & Library Functions: Custom strlen, strcpy, strcat, strcmp, and Palindrome testing",
    slug: "string-manipulation-and-library-functions",
    difficulty: "Beginner",
    category: "C Programming" as any,
    estimatedMinutes: 25,
    rating: 4.92,
    ratingsCount: 120,
    simulator: "custom",
    quizId: "quiz-c-6",
    sections: {
      introduction: "C strings are null-terminated character arrays ('\\0') manipulated via pointer arithmetic or string.h library routines.",
      objective: "Implement string length, copy, concatenate, reverse, and palindrome checkers from scratch without using string.h.",
      videoUrl: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      videoTitle: "Strings in C Programming",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Arrays", "Character Encoding ASCII"],
      theory: {
        overview: "A C string is terminated by the special ASCII character '\\0' (NUL byte, value 0). Iterating through characters until encountering '\\0' allows computing length in O(n) time.",
        keyConcepts: [
          { title: "Null Terminator '\\0'", desc: "Designates the boundary end of the string in memory." },
          { title: "Two-Pointer Palindrome", desc: "Compares characters at start and end pointers moving inwards." }
        ],
        complexities: [
          { operation: "Custom strlen", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Palindrome Check", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Command line CLI argument string parsing",
          "Low-level network packet header string serialization",
          "Embedded firmware text console logging"
        ]
      },
      procedure: [
        "1. Write custom my_strlen(const char *s).",
        "2. Write two-pointer isPalindrome(const char *s).",
        "3. Test with sample strings and print results."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>
#include <stdbool.h>

int my_strlen(const char *s) {
    int len = 0;
    while (s[len] != '\\0') len++;
    return len;
}

bool isPalindrome(const char *s) {
    int l = 0, r = my_strlen(s) - 1;
    while (l < r) {
        if (s[l] != s[r]) return false;
        l++; r--;
    }
    return true;
}

int main() {
    char word[] = "level";
    printf("String: '%s' | Length: %d\\n", word, my_strlen(word));
    printf("Is Palindrome? %s\\n", isPalindrome(word) ? "YES" : "NO");
    return 0;
}`
      },
      expectedOutput: `String: 'level' | Length: 5
Is Palindrome? YES`,
      leetcodeProblems: [
        {
          id: 31,
          title: "Valid Palindrome (LeetCode #125)",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/valid-palindrome/",
          description: "Verify if a string is a palindrome ignoring non-alphanumeric characters.",
          approach: "Two-pointer verification comparing start and end.",
          javaSnippet: `// Solution`
        }
      ],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "c-exp-7",
    labId: "c-programming",
    title: "Exp 7: Functions & Recursion: Pass-by-value vs reference, Factorial, Euclidean GCD, Tower of Hanoi",
    slug: "functions-and-recursion-factorial-gcd",
    difficulty: "Intermediate",
    category: "C Programming" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 135,
    simulator: "custom",
    quizId: "quiz-c-7",
    sections: {
      introduction: "Functions decompose programs into reusable modular procedures, while Recursion executes self-referential call stack activations.",
      objective: "Demonstrate pass-by-reference pointer swapping, recursive factorial, Euclidean GCD, and Tower of Hanoi disk movements.",
      videoUrl: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      videoTitle: "Functions and Recursion in C",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Functions", "Call Stack"],
      theory: {
        overview: "C passes parameters by value by default. Passing memory addresses (&var) enables pass-by-reference modifications. Recursive functions push activation frames to the stack until hitting base cases.",
        keyConcepts: [
          { title: "Pass-by-Reference", desc: "Pointers allow called functions to modify caller stack variables." },
          { title: "Euclidean GCD", desc: "gcd(a, b) = gcd(b, a % b); runs logarithmically." },
          { title: "Tower of Hanoi", desc: "Classic recursive problem solving 2^n - 1 minimum moves." }
        ],
        complexities: [
          { operation: "Euclidean GCD", best: "O(1)", avg: "O(log min(a, b))", worst: "O(log min(a, b))", space: "O(log n)" },
          { operation: "Tower of Hanoi", best: "O(2^n)", avg: "O(2^n)", worst: "O(2^n)", space: "O(n)" }
        ],
        realWorldApplications: [
          "Modular library API construction",
          "Recursive AST parsing in compilers",
          "Mathematical cryptography GCD modular inverses"
        ]
      },
      procedure: [
        "1. Write swap(int *a, int *b) pass-by-reference function.",
        "2. Write recursive gcd(a, b) function.",
        "3. Write recursive towerOfHanoi(n, from, to, aux).",
        "4. Print results."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

int gcd(int a, int b) {
    return (b == 0) ? a : gcd(b, a % b);
}

int main() {
    int x = 10, y = 20;
    swap(&x, &y);
    printf("Swapped x and y: x=%d, y=%d\\n", x, y);
    printf("GCD of 54 and 24: %d\\n", gcd(54, 24));
    return 0;
}`
      },
      expectedOutput: `Swapped x and y: x=20, y=10
GCD of 54 and 24: 6`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "c-exp-8",
    labId: "c-programming",
    title: "Exp 8: Pointers & Dynamic Memory Allocation: Pointer arithmetic, malloc, calloc, realloc, free",
    slug: "pointers-and-dynamic-memory-allocation",
    difficulty: "Intermediate",
    category: "C Programming" as any,
    estimatedMinutes: 30,
    rating: 4.96,
    ratingsCount: 140,
    simulator: "custom",
    quizId: "quiz-c-8",
    sections: {
      introduction: "Pointers directly manipulate memory addresses. Dynamic memory management allocates heap buffers at runtime using malloc and free.",
      objective: "Perform pointer dereferencing, pointer arithmetic (*(ptr + i)), dynamic array allocation via malloc, and prevent memory leaks via free().",
      videoUrl: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      videoTitle: "C Pointers & Memory Management",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Pointers", "Stack vs Heap"],
      theory: {
        overview: "A pointer holds the virtual memory address of another variable. malloc(size) allocates uninitialized bytes on the heap. free(ptr) releases heap blocks back to the OS memory allocator.",
        keyConcepts: [
          { title: "Pointer Arithmetic", desc: "ptr + 1 advances the address by 1 * sizeof(pointed_type) bytes." },
          { title: "malloc vs calloc", desc: "malloc leaves memory uninitialized; calloc clears bytes to zero." },
          { title: "Dangling Pointers & Leaks", desc: "Setting ptr = NULL after free() prevents accessing freed memory." }
        ],
        complexities: [
          { operation: "Heap Allocation / Free", best: "O(1)", avg: "O(1)", worst: "O(heap_search)", space: "O(allocated_bytes)" }
        ],
        realWorldApplications: [
          "Dynamic resizing vectors and linked data structures",
          "Custom memory arena and pool allocators in game engines",
          "High-performance memory buffers in OS kernels"
        ]
      },
      procedure: [
        "1. Allocate dynamic integer array of size n using malloc.",
        "2. Check if pointer is NULL.",
        "3. Write and read array elements using pointer arithmetic.",
        "4. Release heap memory with free() and set pointer to NULL."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 4;
    int *arr = (int*) malloc(n * sizeof(int));
    if (arr == NULL) { printf("Heap Allocation Failed!\\n"); return 1; }

    for (int i = 0; i < n; i++) *(arr + i) = (i + 1) * 25;

    printf("Dynamic Heap Array: ");
    for (int i = 0; i < n; i++) printf("%d ", *(arr + i));
    printf("\\n");

    free(arr);
    arr = NULL;
    printf("[✓] Memory deallocated successfully.\\n");
    return 0;
}`
      },
      expectedOutput: `Dynamic Heap Array: 25 50 75 100 
[✓] Memory deallocated successfully.`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "c-exp-9",
    labId: "c-programming",
    title: "Exp 9: Structures, Unions & Typedef: Composite records, array of structures, and memory size comparison",
    slug: "structures-unions-and-typedef",
    difficulty: "Intermediate",
    category: "C Programming" as any,
    estimatedMinutes: 25,
    rating: 4.91,
    ratingsCount: 120,
    simulator: "custom",
    quizId: "quiz-c-9",
    sections: {
      introduction: "Structures (struct) bundle heterogeneous data fields into composite records, while Unions overlay fields in shared memory.",
      objective: "Define struct Student with ID, name, GPA, construct an array of structures, and compare memory sizes with union.",
      videoUrl: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      videoTitle: "Structures and Unions in C",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Data Types", "Arrays"],
      theory: {
        overview: "Structures allocate memory for all member variables plus compiler alignment padding. Unions share a single memory address among all members, allocating only enough bytes for the largest member.",
        keyConcepts: [
          { title: "struct vs union", desc: "struct is additive memory; union is shared overlapped memory." },
          { title: "typedef Alias", desc: "Creates shorthand type name for clean struct declarations." },
          { title: "Structure Padding", desc: "Compiler aligns fields to word boundaries for efficient CPU bus memory transfers." }
        ],
        complexities: [
          { operation: "Member Access", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(sizeof(struct))" }
        ],
        realWorldApplications: [
          "Network packet frame protocol headers (TCP/IP C structs)",
          "Operating system process control blocks (PCB structures)",
          "Embedded hardware register map bit-field definitions"
        ]
      },
      procedure: [
        "1. Define typedef struct Student.",
        "2. Define union SampleData.",
        "3. Instantiate array of structures and print student records.",
        "4. Output sizeof(struct) vs sizeof(union)."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

typedef struct {
    int id;
    char name[20];
    float gpa;
} Student;

union Data {
    int i;
    float f;
    char str[20];
};

int main() {
    Student s1 = {101, "Alice", 3.92f};
    printf("Student: #%d %s (GPA: %.2f)\\n", s1.id, s1.name, s1.gpa);
    printf("Size of Struct Student: %zu bytes\\n", sizeof(Student));
    printf("Size of Union Data:     %zu bytes\\n", sizeof(union Data));
    return 0;
}`
      },
      expectedOutput: `Student: #101 Alice (GPA: 3.92)
Size of Struct Student: 28 bytes
Size of Union Data:     20 bytes`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "c-exp-10",
    labId: "c-programming",
    title: "Exp 10: File Handling & Preprocessor Directives: fopen, fprintf, fscanf, fclose, macros, command-line arguments",
    slug: "file-handling-and-preprocessor-directives",
    difficulty: "Intermediate",
    category: "C Programming" as any,
    estimatedMinutes: 30,
    rating: 4.93,
    ratingsCount: 130,
    simulator: "custom",
    quizId: "quiz-c-10",
    sections: {
      introduction: "File I/O persists application state to disk storage via file pointers (FILE *), complemented by preprocessor macros.",
      objective: "Write and read formatted text records using fopen, fprintf, fscanf, fclose, and define preprocessor macros with #define.",
      videoUrl: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      videoTitle: "File Handling in C",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["C Fundamentals", "Pointers"],
      theory: {
        overview: "Files are handled via streams through FILE pointers. fopen() opens a file stream in specified mode (\"w\", \"r\", \"a\"). fprintf() and fscanf() write/read formatted data. fclose() flushes buffers and closes file descriptors.",
        keyConcepts: [
          { title: "FILE Pointer", desc: "Structure holding OS file descriptor and I/O buffer state." },
          { title: "Stream Modes", desc: "\"w\" (create/overwrite), \"r\" (read), \"a\" (append to end)." },
          { title: "Preprocessor Macros", desc: "#define SQUARE(x) ((x)*(x)) executes compile-time textual expansion." }
        ],
        complexities: [
          { operation: "File Read / Write", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(file_buffer_4KB)" }
        ],
        realWorldApplications: [
          "Configuration file loading (.ini, .conf)",
          "Application diagnostic error crash logging",
          "Exporting simulation results to CSV/text files"
        ]
      },
      procedure: [
        "1. Open file \"vlab_c_out.txt\" in write mode (\"w\").",
        "2. Write formatted records using fprintf.",
        "3. Close file with fclose.",
        "4. Reopen in read mode (\"r\") and read with fscanf.",
        "5. Print file contents and clean up."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>
#include <stdlib.h>

#define PI 3.14159

int main() {
    FILE *fp = fopen("vlab_c_out.txt", "w");
    if (fp == NULL) { perror("File opening failed"); return 1; }

    fprintf(fp, "%d %.2f\\n", 101, 94.5);
    fprintf(fp, "%d %.2f\\n", 102, 88.0);
    fclose(fp);

    fp = fopen("vlab_c_out.txt", "r");
    int id; float marks;
    printf("=== Reading Records from Disk File ===\\n");
    while (fscanf(fp, "%d %f", &id, &marks) == 2) {
        printf("Record: ID=%d, Marks=%.2f\\n", id, marks);
    }
    fclose(fp);
    remove("vlab_c_out.txt");
    return 0;
}`
      },
      expectedOutput: `=== Reading Records from Disk File ===
Record: ID=101, Marks=94.50
Record: ID=102, Marks=88.00`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  }
];
