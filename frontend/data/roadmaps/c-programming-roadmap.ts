import { DSACategory } from "../dsa-topic-data";

export const C_PROGRAMMING_ROADMAP_CATEGORIES: DSACategory[] = [
  {
    id: "c-core-fundamentals",
    name: "1. Core Syntax, Conditionals & Loops",
    shortDesc: "Formatted I/O, Data Types, Control Structures, and Pattern Printing Loops.",
    iconName: "Code2",
    topics: [
      {
        id: "c-exp-1-io-types",
        slug: "c-fundamentals-variables-formatted-io",
        title: "Exp 1: Fundamentals, Variables, Data Types & Formatted I/O",
        categoryId: "c-core-fundamentals",
        categoryName: "1. Core Syntax, Conditionals & Loops",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "C programming data types printf scanf format specifiers",
        gfgUrl: "https://www.geeksforgeeks.org/c-data-types/",
        quickSummary: "Master C syntax, variable declarations, primitive data types (int, float, char, double), and format specifiers (%d, %f, %c, %lf).",
        keyPoints: [
          "Format Specifiers: %d for signed integers, %f for single-precision floats, %lf for doubles, %c for characters.",
          "Memory sizing: sizeof(int)=4 bytes, sizeof(char)=1 byte on standard 64-bit architectures.",
          "Type conversions: Implicit type promotion vs explicit type casting (e.g. (double) total / n)."
        ],
        diagramTitle: "C Memory Representation of Primitive Types",
        diagram: `┌───────────────────┬───────────────────┬───────────────────┐
│ int (4 Bytes)     │ float (4 Bytes)   │ char (1 Byte)     │
├───────────────────┼───────────────────┼───────────────────┤
│ [0x00][0x00][0x00]│ [IEEE 754 float]  │ [ASCII 'A' = 65]  │
└───────────────────┴───────────────────┴───────────────────┘`,
        complexities: [
          { operation: "Variable Access", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Formatted I/O)",
            code: `#include <stdio.h>

int main() {
    int age = 20;
    float cgpa = 8.85f;
    char grade = 'A';
    double fee = 85000.50;

    printf("=== Student Registration Profile ===\\n");
    printf("Age:   %d years\\n", age);
    printf("CGPA:  %.2f\\n", cgpa);
    printf("Grade: %c\\n", grade);
    printf("Fee:   $%.2lf\\n", fee);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "C Data Types & Basic I/O",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/c-basic-declarations-and-expressions-activities/",
            platform: "GeeksforGeeks",
            topicTag: "C Basics"
          }
        ]
      },
      {
        id: "c-exp-2-control-flow",
        slug: "control-flow-decision-making-switch-case",
        title: "Exp 2: Control Flow & Decision Making (if-else, switch-case)",
        categoryId: "c-core-fundamentals",
        categoryName: "1. Core Syntax, Conditionals & Loops",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "C if else ladder switch case quadratic equations leap year",
        gfgUrl: "https://www.geeksforgeeks.org/decision-making-c-c-else-nested-else/",
        quickSummary: "Evaluate decision trees using if-else ladders and switch-case statements to calculate quadratic roots and evaluate leap years.",
        keyPoints: [
          "Quadratic discriminant D = b^2 - 4ac: Real & Distinct (D > 0), Real & Equal (D == 0), Imaginary (D < 0).",
          "Leap Year Rule: (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0).",
          "switch-case with break prevents fallthrough bugs."
        ],
        diagramTitle: "Quadratic Equation Decision Tree",
        diagram: `           [ Calculate D = b^2 - 4ac ]
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
      (D > 0)       (D == 0)      (D < 0)
   Real & Distinct  Real & Equal  Complex Conjugate`,
        complexities: [
          { operation: "Branch Evaluation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Quadratic Roots)",
            code: `#include <stdio.h>
#include <math.h>

int main() {
    double a = 1, b = -5, c = 6;
    double d = b * b - 4 * a * c;

    if (d > 0) {
        double r1 = (-b + sqrt(d)) / (2 * a);
        double r2 = (-b - sqrt(d)) / (2 * a);
        printf("Roots are Real and Distinct: %.2lf, %.2lf\\n", r1, r2);
    } else if (d == 0) {
        double r = -b / (2 * a);
        printf("Roots are Real and Equal: %.2lf\\n", r);
    } else {
        printf("Roots are Complex & Imaginary.\\n");
    }
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Check Leap Year",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/c-program-check-given-year-leap-year/",
            platform: "GeeksforGeeks",
            topicTag: "Control Flow"
          }
        ]
      },
      {
        id: "c-exp-3-loops-patterns",
        slug: "iterative-loops-and-pattern-generation",
        title: "Exp 3: Iterative Loops & Patterns (for, while, do-while)",
        categoryId: "c-core-fundamentals",
        categoryName: "1. Core Syntax, Conditionals & Loops",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "C programs loops prime numbers fibonacci pyramid star patterns",
        gfgUrl: "https://www.geeksforgeeks.org/loops-in-c-and-cpp/",
        quickSummary: "Execute iterative loops for prime number checking in O(sqrt(n)), Fibonacci series generation, and nested pyramid pattern printing.",
        keyPoints: [
          "for loops for bounded counts; while loops for indefinite conditions; do-while executes at least once.",
          "Prime check optimization: Check factors only up to sqrt(n).",
          "Nested loop pattern coordinates (outer loop = rows, inner loop = columns)."
        ],
        diagramTitle: "Nested Loop Star Pyramid Pattern Geometry",
        diagram: `  Row 1 (i=1):     *       (Spaces: 3, Stars: 1)
  Row 2 (i=2):    ***      (Spaces: 2, Stars: 3)
  Row 3 (i=3):   *****     (Spaces: 1, Stars: 5)
  Row 4 (i=4):  *******    (Spaces: 0, Stars: 7)`,
        complexities: [
          { operation: "Prime Check", best: "O(1)", avg: "O(sqrt(n))", worst: "O(sqrt(n))", space: "O(1)" },
          { operation: "Pattern Generation", best: "O(n^2)", avg: "O(n^2)", worst: "O(n^2)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Prime Number & Pyramid Pattern)",
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
    int num = 29;
    printf("%d is Prime? %s\\n", num, isPrime(num) ? "YES" : "NO");

    int rows = 4;
    for (int i = 1; i <= rows; i++) {
        for (int s = 1; s <= rows - i; s++) printf(" ");
        for (int k = 1; k <= 2 * i - 1; k++) printf("*");
        printf("\\n");
    }
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
          }
        ]
      }
    ]
  },
  {
    id: "c-arrays-strings",
    name: "2. Arrays, Strings & Matrix Mathematics",
    shortDesc: "1D/2D Arrays, Matrix Algebra, String Manipulations and Custom Reversals.",
    iconName: "Layers",
    topics: [
      {
        id: "c-exp-4-1d-arrays",
        slug: "1d-arrays-and-statistical-calculations",
        title: "Exp 4: 1D Arrays & Statistical Calculations (Min, Max, Frequency)",
        categoryId: "c-arrays-strings",
        categoryName: "2. Arrays, Strings & Matrix Mathematics",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "C program 1D array find min max average frequency of elements",
        gfgUrl: "https://www.geeksforgeeks.org/c-arrays/",
        quickSummary: "Store homogeneous collections in contiguous C array buffers, finding minimum, maximum, mean average, and element frequency distributions.",
        keyPoints: [
          "Arrays store elements in contiguous memory: Address(arr[i]) = Base_Address + (i * sizeof(type)).",
          "Zero-based indexing [0..n-1]; boundary violations result in undefined behavior.",
          "Single-pass scanning computes min, max, and sum in O(n) time."
        ],
        diagramTitle: "1D Array Contiguous Memory Stride",
        diagram: `Index:       [0]       [1]       [2]       [3]       [4]
Value:     [ 15 ]    [ 42 ]    [ 08 ]    [ 99 ]    [ 23 ]
Address:   0x1000    0x1004    0x1008    0x100C    0x1010  (+4 bytes each)`,
        complexities: [
          { operation: "Min / Max / Sum Scan", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (1D Array Statistics)",
            code: `#include <stdio.h>

int main() {
    int arr[] = {15, 42, 8, 99, 23, 67, 8};
    int n = sizeof(arr) / sizeof(arr[0]);

    int min = arr[0], max = arr[0], sum = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
        sum += arr[i];
    }
    double avg = (double)sum / n;
    printf("Array Size: %d\\n", n);
    printf("Minimum: %d | Maximum: %d\\n", min, max);
    printf("Average: %.2lf\\n", avg);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Find Minimum and Maximum in Array",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/",
            platform: "GeeksforGeeks",
            topicTag: "1D Arrays"
          }
        ]
      },
      {
        id: "c-exp-5-2d-matrices",
        slug: "2d-arrays-and-matrix-mathematics",
        title: "Exp 5: 2D Arrays & Matrix Mathematics (Add, Multiply, Transpose)",
        categoryId: "c-arrays-strings",
        categoryName: "2. Arrays, Strings & Matrix Mathematics",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "C program matrix addition multiplication transpose 2D arrays",
        gfgUrl: "https://www.geeksforgeeks.org/c-matrix-multiplication/",
        quickSummary: "Perform matrix algebra on row-major 2D C arrays: element-wise addition, triple-loop matrix dot product multiplication, and in-place transposition.",
        keyPoints: [
          "Row-Major Order: Element at (i, j) stored at base + (i * cols + j) * sizeof(type).",
          "Matrix multiplication condition: cols_A == rows_B.",
          "Transpose reflects elements across main diagonal: T[j][i] = M[i][j]."
        ],
        diagramTitle: "Matrix Dot Product Multiplication Pipeline",
        diagram: `  Matrix A (2x3)          Matrix B (3x2)          Result C (2x2)
  ┌───┬───┬───┐           ┌───┬───┐               ┌───────┬───────┐
  │ 1 │ 2 │ 3 │     x     │ 7 │ 8 │       =       │  58   │  64   │
  ├───┼───┼───┤           ├───┼───┤               ├───────┼───────┤
  │ 4 │ 5 │ 6 │           │ 9 │ 1 │               │ 139   │ 154   │
  └───┴───┴───┘           ├───┼───┤               └───────┴───────┘
                          │ 2 │ 3 │
                          └───┴───┘`,
        complexities: [
          { operation: "Matrix Addition", best: "O(r * c)", avg: "O(r * c)", worst: "O(r * c)", space: "O(r * c)" },
          { operation: "Matrix Multiplication", best: "O(r * c * k)", avg: "O(r * c * k)", worst: "O(r * c * k)", space: "O(r * k)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Matrix Operations)",
            code: `#include <stdio.h>

int main() {
    int A[2][2] = {{1, 2}, {3, 4}};
    int B[2][2] = {{5, 6}, {7, 8}};
    int C[2][2] = {0};

    // Matrix Multiplication
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    printf("Result Matrix C (2x2):\\n");
    for (int i = 0; i < 2; i++) {
        printf("%4d %4d\\n", C[i][0], C[i][1]);
    }
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Matrix Multiplication in C",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/c-program-to-multiply-two-matrices/",
            platform: "GeeksforGeeks",
            topicTag: "2D Arrays"
          }
        ]
      },
      {
        id: "c-exp-6-strings",
        slug: "string-manipulation-and-library-functions",
        title: "Exp 6: String Manipulation & Library Functions (Palindromes, Reverse)",
        categoryId: "c-arrays-strings",
        categoryName: "2. Arrays, Strings & Matrix Mathematics",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "C string library strlen strcpy strcat strcmp palindrome without library",
        gfgUrl: "https://www.geeksforgeeks.org/strings-in-c/",
        quickSummary: "Inspect null-terminated character strings ('\\0'), implement custom string length, copy, concatenate, reverse, and palindrome checkers.",
        keyPoints: [
          "C strings are null-terminated character arrays: char str[] = \"Hello\" occupies 6 bytes in memory.",
          "Standard string.h routines: strlen(), strcpy(), strcat(), strcmp().",
          "Two-pointer palindrome verification comparing left and right indices."
        ],
        diagramTitle: "Null-Terminated Character Array Layout",
        diagram: `  [ 'H' ] [ 'e' ] [ 'l' ] [ 'l' ] [ 'o' ] [ '\\0' (Null Terminator) ]
     0       1       2       3       4       5`,
        complexities: [
          { operation: "strlen() / strcpy()", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Palindrome Check", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (String Functions without string.h)",
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
    char word[] = "radar";
    printf("Word: '%s' (Length: %d)\\n", word, my_strlen(word));
    printf("Is Palindrome? %s\\n", isPalindrome(word) ? "YES" : "NO");
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Valid Palindrome (LeetCode #125)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/valid-palindrome/",
            platform: "LeetCode",
            topicTag: "Strings"
          }
        ]
      }
    ]
  },
  {
    id: "c-functions-pointers-files",
    name: "3. Functions, Pointers, Structs & File I/O",
    shortDesc: "Recursion, Pointer Arithmetic, Dynamic Memory (malloc/free), Structures, and Files.",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "c-exp-7-functions-recursion",
        slug: "functions-and-recursion-factorial-gcd",
        title: "Exp 7: Functions & Recursion (Factorial, GCD, Tower of Hanoi)",
        categoryId: "c-functions-pointers-files",
        categoryName: "3. Functions, Pointers, Structs & File I/O",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "C functions pass by value reference recursion GCD Euclidean Tower of Hanoi",
        gfgUrl: "https://www.geeksforgeeks.org/recursion-in-c/",
        quickSummary: "Design modular functions, compare pass-by-value vs pass-by-reference pointers, and implement recursive Euclidean GCD and Tower of Hanoi.",
        keyPoints: [
          "Pass-by-value passes copies of variables; pass-by-reference passes memory addresses (&var).",
          "Euclidean Algorithm: gcd(a, b) = gcd(b, a % b); runs in O(log(min(a, b))).",
          "Tower of Hanoi moves n disks across 3 pegs using 2^n - 1 recursive moves."
        ],
        diagramTitle: "Euclidean GCD Algorithm Remainder Chain",
        diagram: `  gcd(48, 18) ──► gcd(18, 48 % 18 = 12) ──► gcd(12, 18 % 12 = 6) ──► gcd(6, 0) = 6!`,
        complexities: [
          { operation: "Euclidean GCD", best: "O(1)", avg: "O(log min(a,b))", worst: "O(log min(a,b))", space: "O(log n)" },
          { operation: "Tower of Hanoi (n disks)", best: "O(2^n)", avg: "O(2^n)", worst: "O(2^n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Recursion & Pointers Swap)",
            code: `#include <stdio.h>

void swap(int *x, int *y) {
    int temp = *x; *x = *y; *y = temp;
}

int gcd(int a, int b) {
    return (b == 0) ? a : gcd(b, a % b);
}

void towerOfHanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c\\n", from, to);
        return;
    }
    towerOfHanoi(n - 1, from, aux, to);
    printf("Move disk %d from %c to %c\\n", n, from, to);
    towerOfHanoi(n - 1, aux, to, from);
}

int main() {
    int a = 48, b = 18;
    printf("GCD of %d and %d: %d\\n", a, b, gcd(a, b));
    printf("--- Tower of Hanoi (3 Disks) ---\\n");
    towerOfHanoi(3, 'A', 'C', 'B');
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
          }
        ]
      },
      {
        id: "c-exp-8-pointers-dynamic-mem",
        slug: "pointers-and-dynamic-memory-allocation",
        title: "Exp 8: Pointers & Dynamic Memory Allocation (malloc, calloc, realloc, free)",
        categoryId: "c-functions-pointers-files",
        categoryName: "3. Functions, Pointers, Structs & File I/O",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "C pointers dynamic memory allocation malloc calloc realloc free memory leaks",
        gfgUrl: "https://www.geeksforgeeks.org/dynamic-memory-allocation-in-c-using-malloc-calloc-free-and-realloc/",
        quickSummary: "Manipulate memory addresses via pointer dereferencing (*) and manage dynamic heap memory allocation using malloc, calloc, and free.",
        keyPoints: [
          "Pointer variable stores memory address of another variable: int *ptr = &val; *ptr modifies val.",
          "malloc(size) allocates uninitialized bytes; calloc(n, size) initializes memory to zero.",
          "free(ptr) releases heap allocation back to OS; avoids memory leaks and dangling pointers."
        ],
        diagramTitle: "Heap Memory Dynamic Allocation Lifecycle",
        diagram: `  [ malloc(n * sizeof(int)) ] ──► [ Heap Buffer: [?][?][?] ] ──► (Process data)
                                                                      │
  [ free(ptr); ptr = NULL;  ] ◄── Release RAM to OS ◄────────────────┘`,
        complexities: [
          { operation: "malloc() / free()", best: "O(1)", avg: "O(1)", worst: "O(heap_search)", space: "O(allocated_bytes)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Dynamic Array Allocation)",
            code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int*) malloc(n * sizeof(int));
    if (arr == NULL) { printf("Memory allocation failed!\\n"); return 1; }

    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;

    printf("Dynamically Allocated Heap Array: ");
    for (int i = 0; i < n; i++) printf("%d ", *(arr + i));
    printf("\\n");

    free(arr);
    arr = NULL;
    printf("[✓] Memory safely deallocated.\\n");
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
            topicTag: "Pointers"
          }
        ]
      },
      {
        id: "c-exp-9-structs-unions",
        slug: "structures-unions-and-typedef",
        title: "Exp 9: Structures, Unions & Typedef (Student Records Database)",
        categoryId: "c-functions-pointers-files",
        categoryName: "3. Functions, Pointers, Structs & File I/O",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "C structures unions typedef array of structures memory difference",
        gfgUrl: "https://www.geeksforgeeks.org/structures-c/",
        quickSummary: "Construct user-defined composite data types using struct to represent heterogeneous entity records, comparing memory footprints against union.",
        keyPoints: [
          "struct allocates separate memory for all member fields (sum of member sizes + padding).",
          "union shares single memory location among all members (size = max member size).",
          "Arrow operator (ptr->member) dereferences member from structure pointer."
        ],
        diagramTitle: "Memory Layout: Struct (Additive) vs Union (Shared)",
        diagram: `  struct Data { int i; char c; double d; };  -> Size = 4 + 1 + 3(pad) + 8 = 16 Bytes
  ┌──────────┬────┬──────────┬────────────────────────┐
  │  int i   │ c  │ (padding)│        double d        │
  └──────────┴────┴──────────┴────────────────────────┘

  union Data { int i; char c; double d; };   -> Size = 8 Bytes (Overlapped)
  ┌───────────────────────────────────────────────────┐
  │ [ char c / int i / double d shared storage ]      │
  └───────────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Struct Member Access", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(sizeof(struct))" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Structure Student Database)",
            code: `#include <stdio.h>

typedef struct {
    int id;
    char name[30];
    float gpa;
} Student;

int main() {
    Student classList[] = {
        {101, "Alice Johnson", 3.92f},
        {102, "Bob Smith", 3.45f},
        {103, "Charlie Brown", 3.88f}
    };
    int n = 3;

    printf("=== Student Records (Array of Structs) ===\\n");
    for (int i = 0; i < n; i++) {
        printf("#%d | %-16s | GPA: %.2f\\n", classList[i].id, classList[i].name, classList[i].gpa);
    }
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Structure and Union in C",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/structures-c/",
            platform: "GeeksforGeeks",
            topicTag: "Structures"
          }
        ]
      },
      {
        id: "c-exp-10-file-io",
        slug: "file-handling-and-preprocessor-directives",
        title: "Exp 10: File Handling & Preprocessor Directives (fopen, fprintf, fscanf)",
        categoryId: "c-functions-pointers-files",
        categoryName: "3. Functions, Pointers, Structs & File I/O",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "C file handling fopen fprintf fscanf fclose preprocessor macros",
        gfgUrl: "https://www.geeksforgeeks.org/basics-file-handling-c/",
        quickSummary: "Perform disk persistence via C file streams (fopen, fprintf, fscanf, fseek, fclose) and configure preprocessor macros (#define, #ifdef).",
        keyPoints: [
          "File Modes: \"w\" (write/create), \"r\" (read), \"a\" (append), \"rb\"/\"wb\" (binary streams).",
          "File pointer FILE *fp tracks stream buffer position in OS file table.",
          "Macros (#define SQUARE(x) ((x)*(x))) perform compile-time textual substitutions."
        ],
        diagramTitle: "C File Stream Buffer Architecture",
        diagram: `  C Program  ──► [ File Buffer Stream: FILE *fp ] ──► [ Disk File on OS Storage ]
                   (fprintf / fscanf / fputs)             (fopen("data.txt", "w"))`,
        complexities: [
          { operation: "File Read / Write", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(file_buffer_4KB)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (File Handling)",
            code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_RECORDS 2

int main() {
    FILE *fp = fopen("vlab_c_demo.txt", "w");
    if (fp == NULL) { perror("File opening failed"); return 1; }

    fprintf(fp, "101 Alice 3.92\\n");
    fprintf(fp, "102 Bob 3.45\\n");
    fclose(fp);
    printf("[✓] Records written to file.\\n");

    fp = fopen("vlab_c_demo.txt", "r");
    int id; char name[20]; float gpa;
    printf("=== Reading from File ===\\n");
    while (fscanf(fp, "%d %s %f", &id, name, &gpa) == 3) {
        printf("Read: ID=%d, Name=%s, GPA=%.2f\\n", id, name, gpa);
    }
    fclose(fp);
    remove("vlab_c_demo.txt"); // Clean up
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "File Handling in C",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/basics-file-handling-c/",
            platform: "GeeksforGeeks",
            topicTag: "File I/O"
          }
        ]
      }
    ]
  }
];
