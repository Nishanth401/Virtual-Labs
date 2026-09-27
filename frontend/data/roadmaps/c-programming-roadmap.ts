import { DSACategory } from "../dsa-topic-data";

export const C_PROGRAMMING_ROADMAP_CATEGORIES: DSACategory[] = [
  // ========================================================
  // MODULE 1: BASICS & CONTROL FLOW (0/4)
  // ========================================================
  {
    id: "c-basics-control-flow",
    name: "1. Basics & Control Flow",
    shortDesc: "Euclidean distance, temperature conversion, binary digit scans, and Armstrong checks.",
    iconName: "Code2",
    topics: [
      {
        id: "c-distance-two-points",
        slug: "distance-between-two-points",
        title: "Exp 1: Distance Between Two Points",
        categoryId: "c-basics-control-flow",
        categoryName: "1. Basics & Control Flow",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "C program to find distance between two points sqrt pow",
        gfgUrl: "https://www.geeksforgeeks.org/program-calculate-distance-two-points/",
        quickSummary: "Read two coordinate pairs and compute the Euclidean distance between them using the distance formula.",
        keyPoints: [
          "Distance formula: The distance formula √((x2−x1)² + (y2−y1)²) is implemented using the math library's pow and sqrt.",
          "Formatted input: User input is read via scanf into float variables.",
          "Formatted output: Formatted output (printf with precision specifiers) presents the computed result."
        ],
        diagramTitle: "2D Cartesian Coordinate Euclidean Distance",
        diagram: `  (y)
   │               (x2, y2)
   │                 ▲
   │        d = √Δx²+Δy²
   │                 │
   │    (x1, y1) ────┘ (Δx = x2-x1, Δy = y2-y1)
  ─┴────────────────────────► (x)`,
        complexities: [
          { operation: "Distance computation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Euclidean Distance)",
            code: `#include <stdio.h>
#include <math.h>

int main() {
    float x1 = 3.0, y1 = 4.0;
    float x2 = 7.0, y2 = 1.0;
    
    float distance = sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
    
    printf("Point 1: (%.2f, %.2f)\\n", x1, y1);
    printf("Point 2: (%.2f, %.2f)\\n", x2, y2);
    printf("Euclidean Distance: %.4f\\n", distance);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Distance Between Two Points in C",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/program-calculate-distance-two-points/",
            platform: "GeeksforGeeks",
            topicTag: "Math"
          }
        ]
      },
      {
        id: "c-temperature-conversion",
        slug: "temperature-conversion-fahrenheit-celsius",
        title: "Exp 2: Temperature Conversion (Fahrenheit to Celsius and Vice Versa)",
        categoryId: "c-basics-control-flow",
        categoryName: "1. Basics & Control Flow",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "C program temperature conversion Fahrenheit to Celsius menu driven",
        gfgUrl: "https://www.geeksforgeeks.org/c-program-for-celsius-to-fahrenheit-conversion/",
        quickSummary: "Build a menu-driven program converting temperature between Fahrenheit and Celsius scales.",
        keyPoints: [
          "Menu driven flow: A menu-driven structure lets the user choose the conversion direction.",
          "Conversion formulas: The formulas C = (F−32)×5/9 and F = (C×9/5)+32 implement the two conversions.",
          "Branching selection: Conditional branching selects which formula to apply based on user choice."
        ],
        diagramTitle: "Temperature Conversion Scales",
        diagram: `  [ User Choice ]
        ├── Choice 1: F to C ──► C = (F - 32) * (5.0 / 9.0)
        └── Choice 2: C to F ──► F = (C * (9.0 / 5.0)) + 32`,
        complexities: [
          { operation: "Conversion", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Temperature Conversion)",
            code: `#include <stdio.h>

int main() {
    int choice = 1;
    float temp = 98.6, result;

    printf("=== Temperature Converter ===\\n");
    if (choice == 1) {
        // Fahrenheit to Celsius
        result = (temp - 32.0) * (5.0 / 9.0);
        printf("%.2f Fahrenheit = %.2f Celsius\\n", temp, result);
    } else {
        // Celsius to Fahrenheit
        result = (temp * (9.0 / 5.0)) + 32.0;
        printf("%.2f Celsius = %.2f Fahrenheit\\n", temp, result);
    }
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Celsius to Fahrenheit Conversion in C",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/c-program-for-celsius-to-fahrenheit-conversion/",
            platform: "GeeksforGeeks",
            topicTag: "Conditionals"
          }
        ]
      },
      {
        id: "c-count-zeros-ones-binary",
        slug: "count-zeros-and-ones-in-binary-number",
        title: "Exp 3: Count Zeros and Ones in a Binary Number",
        categoryId: "c-basics-control-flow",
        categoryName: "1. Basics & Control Flow",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "Count number of zeros and ones in a binary number C program",
        gfgUrl: "https://www.geeksforgeeks.org/count-set-bits-in-an-integer/",
        quickSummary: "Read a binary number (as digits) and count how many 0s and 1s it contains.",
        keyPoints: [
          "Digit-by-digit extraction: The number is processed digit-by-digit, typically via modulus (%) and division (/) by 10.",
          "Dual tally counters: Two counters accumulate the tally of zero-digits and one-digits.",
          "Termination condition: The loop terminates once all digits have been consumed (num == 0)."
        ],
        diagramTitle: "Binary Digit Extraction Loop",
        diagram: `  Number: 110101
  Step 1: 110101 % 10 = 1 (Count1++) ──► num = 11010
  Step 2: 11010 % 10  = 0 (Count0++) ──► num = 1101
  ... Repeat until num == 0. Final: Ones = 4, Zeros = 2`,
        complexities: [
          { operation: "Digit scan", best: "O(d)", avg: "O(d)", worst: "O(d) (d=number of digits)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Binary Digit Counter)",
            code: `#include <stdio.h>

int main() {
    long long binaryNum = 11010110;
    long long temp = binaryNum;
    int zeros = 0, ones = 0;

    while (temp > 0) {
        int rem = temp % 10;
        if (rem == 0) zeros++;
        else if (rem == 1) ones++;
        temp /= 10;
    }

    printf("Binary Number: %lld\\n", binaryNum);
    printf("Total 1s: %d | Total 0s: %d\\n", ones, zeros);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Count Set Bits in an Integer",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/count-set-bits-in-an-integer/",
            platform: "GeeksforGeeks",
            topicTag: "Bit Manipulation"
          }
        ]
      },
      {
        id: "c-armstrong-number",
        slug: "armstrong-number-check",
        title: "Exp 4: Armstrong Number Check",
        categoryId: "c-basics-control-flow",
        categoryName: "1. Basics & Control Flow",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Armstrong number check in C program while loop pow",
        gfgUrl: "https://www.geeksforgeeks.org/c-program-to-check-armstrong-number/",
        quickSummary: "Determine whether a given number equals the sum of its own digits each raised to the power of the digit count.",
        keyPoints: [
          "Digit isolation: Digit extraction uses modulus/division in a loop to isolate each individual digit.",
          "Digit count power sum: Each digit is raised to the power of the total digit count and summed.",
          "Equality check: The computed sum is compared to the original number to decide Armstrong status."
        ],
        diagramTitle: "Armstrong Number Verification: 153",
        diagram: `  Number = 153 (Digits d = 3)
  1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153 == 153 (ARMSTRONG NUMBER!)`,
        complexities: [
          { operation: "Digit extraction & power sum", best: "O(d)", avg: "O(d)", worst: "O(d)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Armstrong Number)",
            code: `#include <stdio.h>
#include <math.h>

int main() {
    int num = 153, original = num, temp = num;
    int digits = 0, sum = 0;

    while (temp != 0) { digits++; temp /= 10; }
    temp = original;

    while (temp != 0) {
        int rem = temp % 10;
        sum += (int)pow(rem, digits);
        temp /= 10;
    }

    if (sum == original)
        printf("%d is an Armstrong number!\\n", original);
    else
        printf("%d is NOT an Armstrong number.\\n", original);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Program to Check Armstrong Number",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/c-program-to-check-armstrong-number/",
            platform: "GeeksforGeeks",
            topicTag: "Looping"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 2: FUNCTIONS & RECURSION (0/2)
  // ========================================================
  {
    id: "c-functions-recursion",
    name: "2. Functions & Recursion",
    shortDesc: "Call by value vs reference, pointer swapping, recursive Fibonacci, and Euclidean GCD.",
    iconName: "Terminal",
    topics: [
      {
        id: "c-swap-value-reference",
        slug: "swapping-two-numbers-call-by-value-reference",
        title: "Exp 5: Swapping of Two Numbers Using Call by Value and Call by Reference",
        categoryId: "c-functions-recursion",
        categoryName: "2. Functions & Recursion",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Call by value and call by reference in C swapping pointers",
        gfgUrl: "https://www.geeksforgeeks.org/pass-by-value-and-pass-by-reference-in-c/",
        quickSummary: "Implement two swap functions to contrast pass-by-value (no effect on caller) with pass-by-reference (via pointers, effective swap).",
        keyPoints: [
          "Call by value: Call by value copies argument values into local stack parameters, so mutations do not persist outside.",
          "Call by reference: Call by reference passes memory address pointers (&a, &b), letting the function mutate actual caller variables (*a, *b).",
          "Pointer necessity: Comparing both demonstrates why pointers are required when functions must alter caller state."
        ],
        diagramTitle: "Call by Value vs Call by Reference Memory Stack",
        diagram: `  [ Call by Value ]     Main: a=10, b=20 ──► Swap Copies (Swapped locally, Main unaffected!)
  [ Call by Reference ] Main: a=10, b=20 ──► Swap(&a, &b) dereferences addresses directly!`,
        complexities: [
          { operation: "Swap operation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Swap Value vs Reference)",
            code: `#include <stdio.h>

void swapByValue(int a, int b) {
    int temp = a; a = b; b = temp;
}

void swapByReference(int *a, int *b) {
    int temp = *a; *a = *b; *b = temp;
}

int main() {
    int x = 10, y = 20;
    
    printf("Original: x = %d, y = %d\\n", x, y);
    swapByValue(x, y);
    printf("After swapByValue: x = %d, y = %d (Unchanged!)\\n", x, y);
    
    swapByReference(&x, &y);
    printf("After swapByReference: x = %d, y = %d (Swapped!)\\n", x, y);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Pass by Value and Pass by Reference in C",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/pass-by-value-and-pass-by-reference-in-c/",
            platform: "GeeksforGeeks",
            topicTag: "Pointers"
          }
        ]
      },
      {
        id: "c-recursion-fibonacci-gcd",
        slug: "recursive-programs-fibonacci-gcd",
        title: "Exp 6: Recursive Programs — Fibonacci Series and GCD of Two Numbers",
        categoryId: "c-functions-recursion",
        categoryName: "2. Functions & Recursion",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Recursive Fibonacci and GCD in C Euclidean algorithm",
        gfgUrl: "https://www.geeksforgeeks.org/recursion/",
        quickSummary: "Implement Fibonacci sequence generation and GCD computation using recursive function calls.",
        keyPoints: [
          "Fibonacci recurrence: Fibonacci recursion expresses F(n) = F(n−1) + F(n−2) with base cases F(0)=0, F(1)=1.",
          "Euclidean GCD: The Euclidean algorithm for GCD recursively reduces GCD(a,b) to GCD(b, a mod b) until b=0.",
          "Stack frame cost: Each recursive call adds a stack frame, illustrating recursion's memory cost versus iteration."
        ],
        diagramTitle: "Euclidean GCD Recursive Call Stack",
        diagram: `  gcd(48, 18) ──► gcd(18, 48 % 18 = 12) ──► gcd(12, 18 % 12 = 6) ──► gcd(6, 12 % 6 = 0) ──► Returns 6!`,
        complexities: [
          { operation: "Fibonacci(n) / GCD(a,b)", best: "O(2^n) / O(log(min(a,b)))", avg: "same", worst: "O(2^n) / O(log(min(a,b)))", space: "O(n) / O(log(min(a,b))) (call stack)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Recursive Fibonacci & GCD)",
            code: `#include <stdio.h>

int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int main() {
    printf("Fibonacci(8): %d\\n", fibonacci(8));
    printf("GCD(48, 18): %d\\n", gcd(48, 18));
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Euclidean Algorithm for GCD",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/euclidean-algorithms-basic-and-extended/",
            platform: "GeeksforGeeks",
            topicTag: "Recursion"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 3: ARRAYS & MATRICES (0/2)
  // ========================================================
  {
    id: "c-arrays-matrices",
    name: "3. Arrays & Matrices",
    shortDesc: "2D matrix multiplication, transpose, linear extremes search, and duplicate counting.",
    iconName: "Layers",
    topics: [
      {
        id: "c-matrix-operations-2d",
        slug: "matrix-addition-multiplication-transpose-2d-arrays",
        title: "Exp 7: Matrix Addition, Multiplication, and Transpose Using 2D Arrays",
        categoryId: "c-arrays-matrices",
        categoryName: "3. Arrays & Matrices",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Matrix multiplication addition transpose 2D arrays C program",
        gfgUrl: "https://www.geeksforgeeks.org/c-program-multiply-two-matrices/",
        quickSummary: "Implement the three fundamental matrix operations using nested loops over 2D arrays.",
        keyPoints: [
          "Element-wise addition: Addition operates element-wise on matrices of identical dimensions.",
          "Row-column dot products: Multiplication accumulates row-column dot products, requiring compatible dimensions (m×k with k×n).",
          "Transposition swap: Transpose swaps each element's row and column index (matrix[i][j] into trans[j][i])."
        ],
        diagramTitle: "2D Matrix Multiplication Dot Product Accumulation",
        diagram: `  Row i [ A0, A1 ] • Col j [ B0 / B1 ] ──► C[i][j] = A0*B0 + A1*B1`,
        complexities: [
          { operation: "Matrix multiply n×n", best: "O(n³)", avg: "O(n³)", worst: "O(n³)", space: "O(n²)" }
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

    printf("Product Matrix C (2x2):\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) printf("%4d", C[i][j]);
        printf("\\n");
    }
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Matrix Multiplication in C",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/c-program-multiply-two-matrices/",
            platform: "GeeksforGeeks",
            topicTag: "2D Arrays"
          }
        ]
      },
      {
        id: "c-array-extremes-duplicates",
        slug: "largest-smallest-interchange-duplicate-count",
        title: "Exp 8: Largest, Smallest, Interchange, and Duplicate Count in an Array",
        categoryId: "c-arrays-matrices",
        categoryName: "3. Arrays & Matrices",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Find largest smallest interchange duplicate count in array C",
        gfgUrl: "https://www.geeksforgeeks.org/c-program-find-largest-element-array/",
        quickSummary: "Scan an array to find its maximum/minimum values, swap them, and count duplicate elements.",
        keyPoints: [
          "Single-pass scanning: A single linear scan tracks the running max and min as it proceeds.",
          "Extreme interchange: Interchanging the located max and min positions requires a temporary variable swap.",
          "Duplicate tally: Duplicate counting compares each element against all others (or uses a frequency structure) to tally repeats."
        ],
        diagramTitle: "Array Extreme Scanning & Position Swap",
        diagram: `  Array: [ 45, 12 (Min), 89 (Max), 33, 12 (Duplicate) ]
  Swap Min & Max ──► [ 45, 89, 12, 33, 12 ] | Duplicate Count (12) = 2`,
        complexities: [
          { operation: "Max/Min scan / Duplicate count", best: "O(n) / O(n²) naive", avg: "O(n) / O(n²)", worst: "O(n) / O(n²)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Extremes & Duplicates)",
            code: `#include <stdio.h>

int main() {
    int arr[] = {45, 12, 89, 33, 12, 89, 12};
    int n = sizeof(arr) / sizeof(arr[0]);
    int maxIdx = 0, minIdx = 0;

    for (int i = 1; i < n; i++) {
        if (arr[i] > arr[maxIdx]) maxIdx = i;
        if (arr[i] < arr[minIdx]) minIdx = i;
    }

    printf("Smallest: %d (at %d) | Largest: %d (at %d)\\n", arr[minIdx], minIdx, arr[maxIdx], maxIdx);

    // Swap Extremes
    int temp = arr[minIdx];
    arr[minIdx] = arr[maxIdx];
    arr[maxIdx] = temp;
    printf("Extremes successfully interchanged.\\n");
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Find Largest Element in an Array",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/c-program-find-largest-element-array/",
            platform: "GeeksforGeeks",
            topicTag: "Arrays"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 4: STRINGS & DYNAMIC MEMORY (0/2)
  // ========================================================
  {
    id: "c-strings-dynamic-memory",
    name: "4. Strings & Dynamic Memory",
    shortDesc: "Palindrome checks, string reversal, substring extraction, and malloc/calloc/realloc/free.",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "c-string-palindrome-reverse-substring",
        slug: "string-palindrome-reverse-extract-last-n",
        title: "Exp 9: String Operations — Palindrome Checking, Reverse a String, Extract Last N Characters",
        categoryId: "c-strings-dynamic-memory",
        categoryName: "4. Strings & Dynamic Memory",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "C string operations palindrome reverse substring last n characters",
        gfgUrl: "https://www.geeksforgeeks.org/c-program-to-check-whether-a-string-is-a-palindrome/",
        quickSummary: "Implement three common string manipulation routines using character array indexing.",
        keyPoints: [
          "Two-pointer palindrome check: Palindrome checking compares characters from both ends moving inward until they meet.",
          "Midpoint symmetric swap: Reversing a string swaps characters symmetrically about its midpoint in-place.",
          "Pointer offset slicing: Extracting the last N characters uses pointer/index arithmetic from length − N to the end of the string."
        ],
        diagramTitle: "In-Place String Reversal & Palindrome Scanning",
        diagram: `  "radar":  r <==> r (Match) -> a <==> a (Match) -> d (Center) -> PALINDROME!
  "hello":  Swap(h, o) -> Swap(e, l) -> "olleh"`,
        complexities: [
          { operation: "Palindrome/Reverse/Substring", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1) (in-place) / O(n) (copy)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (String Operations)",
            code: `#include <stdio.h>
#include <string.h>

int isPalindrome(char str[]) {
    int l = 0, r = strlen(str) - 1;
    while (l < r) {
        if (str[l++] != str[r--]) return 0;
    }
    return 1;
}

void reverse(char str[]) {
    int l = 0, r = strlen(str) - 1;
    while (l < r) {
        char t = str[l]; str[l++] = str[r]; str[r--] = t;
    }
}

int main() {
    char word[50] = "madam";
    printf("Is '%s' Palindrome: %s\\n", word, isPalindrome(word) ? "YES" : "NO");
    
    char name[50] = "VirtualLabs";
    int n = 4, len = strlen(name);
    printf("Last %d chars: %s\\n", n, &name[len - n]);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Check if a String is Palindrome",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/c-program-to-check-whether-a-string-is-a-palindrome/",
            platform: "GeeksforGeeks",
            topicTag: "Strings"
          }
        ]
      },
      {
        id: "c-dynamic-memory-allocation",
        slug: "dynamic-array-creation-malloc-calloc-realloc-free",
        title: "Exp 10: Dynamic Array Creation and Manipulation Using malloc(), calloc(), realloc(), and free()",
        categoryId: "c-strings-dynamic-memory",
        categoryName: "4. Strings & Dynamic Memory",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Dynamic memory allocation malloc calloc realloc free C pointers",
        gfgUrl: "https://www.geeksforgeeks.org/dynamic-memory-allocation-in-c-using-malloc-calloc-free-and-realloc/",
        quickSummary: "Allocate, resize, and free arrays at runtime using the four core dynamic memory management functions.",
        keyPoints: [
          "Heap allocation: malloc allocates uninitialized heap memory; calloc allocates and zero-initializes contiguous element blocks.",
          "Dynamic resizing: realloc resizes a previously allocated block, potentially relocating it while preserving existing content.",
          "Deallocation safety: free releases allocated memory back to the operating system, and must be called to avoid memory leaks."
        ],
        diagramTitle: "Heap Memory Management Lifecycle (malloc -> realloc -> free)",
        diagram: `  [ malloc(5*sizeof(int)) ] ──► Heap Buffer: [ ? | ? | ? | ? | ? ]
                                         │
                                         ▼ [ realloc(ptr, 8*sizeof(int)) ]
                              [ 1 | 2 | 3 | 4 | 5 | ? | ? | ? ]
                                         │
                                         ▼ [ free(ptr) ] ──► Memory Returned`,
        complexities: [
          { operation: "Allocation/Resize", best: "O(1) amortized", avg: "O(1) amortized", worst: "O(n) (realloc copy)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Dynamic Memory Allocation)",
            code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 3;
    int *arr = (int*)malloc(n * sizeof(int));
    if (!arr) return 1;

    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;

    // Resize array to 5 elements using realloc
    n = 5;
    arr = (int*)realloc(arr, n * sizeof(int));
    arr[3] = 40; arr[4] = 50;

    printf("Dynamic Array Content: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    free(arr); // Prevent memory leak
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
            topicTag: "Memory Management"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 5: STRUCTURES & FILE HANDLING (0/5)
  // ========================================================
  {
    id: "c-structures-files",
    name: "5. Structures & File Handling",
    shortDesc: "struct definitions, age calculations, fopen/fprintf streams, and persistent inventory management.",
    iconName: "Sparkles",
    topics: [
      {
        id: "c-structures-student-info",
        slug: "structures-store-display-student-information",
        title: "Exp 11: Structures to Store and Display Student Information",
        categoryId: "c-structures-files",
        categoryName: "5. Structures & File Handling",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "C structures struct student information array of structures",
        gfgUrl: "https://www.geeksforgeeks.org/structures-c/",
        quickSummary: "Define a struct Student grouping related fields (name, roll number, marks) and manage an array of such structures.",
        keyPoints: [
          "Heterogeneous grouping: A struct groups heterogeneous related fields (strings, ints, floats) under one user-defined type.",
          "Array of structs: Arrays of structures allow managing multiple student records uniformly.",
          "Member access: Dot notation (.) accesses and updates individual structure member fields."
        ],
        diagramTitle: "Struct Memory Alignment Layout",
        diagram: `  struct Student { int roll; char name[20]; float marks; }
  Memory: [ 4 Bytes: roll ] [ 20 Bytes: name ] [ 4 Bytes: marks ]`,
        complexities: [
          { operation: "Structure array traversal", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Student Structure)",
            code: `#include <stdio.h>

struct Student {
    int rollNo;
    char name[50];
    float marks;
};

int main() {
    struct Student s[2] = {
        {101, "Alice", 92.5},
        {102, "Bob", 88.0}
    };

    printf("=== Student Details ===\\n");
    for (int i = 0; i < 2; i++) {
        printf("Roll: %d | Name: %-10s | Marks: %.2f\\n",
               s[i].rollNo, s[i].name, s[i].marks);
    }
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Structures in C",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/structures-c/",
            platform: "GeeksforGeeks",
            topicTag: "Structures"
          }
        ]
      },
      {
        id: "c-structure-age-calculation",
        slug: "compute-age-using-structures-functions",
        title: "Exp 12: Compute a Person's Age Using Structures and User-Defined Functions",
        categoryId: "c-structures-files",
        categoryName: "5. Structures & File Handling",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Compute age using structures in C date difference borrow",
        gfgUrl: "https://www.geeksforgeeks.org/program-calculate-age/",
        quickSummary: "Store a birth date in a structure and compute the current age via a user-defined function.",
        keyPoints: [
          "Date struct representation: A struct holds day/month/year fields for the birth date and current date.",
          "Encapsulated computation: A user-defined function encapsulates the age-calculation logic, taking structures as parameters.",
          "Borrowing arithmetic: Date-difference logic must correctly handle month and day borrow cases when subtracting dates."
        ],
        diagramTitle: "Date Difference Borrowing Logic",
        diagram: `  Current: 27 / 09 / 2026
  Birth:   15 / 11 / 2004
  Borrow 1 Year (12 Months) -> 2025, Month becomes 21
  Result: 21 Years, 10 Months, 12 Days`,
        complexities: [
          { operation: "Age computation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Age Calculator)",
            code: `#include <stdio.h>

struct Date { int day, month, year; };

void calculateAge(struct Date birth, struct Date current) {
    int d = current.day - birth.day;
    int m = current.month - birth.month;
    int y = current.year - birth.year;

    if (d < 0) { d += 30; m--; }
    if (m < 0) { m += 12; y--; }

    printf("Calculated Age: %d Years, %d Months, %d Days\\n", y, m, d);
}

int main() {
    struct Date birth = {15, 11, 2004};
    struct Date current = {27, 9, 2026};
    calculateAge(birth, current);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Calculate Age Program in C",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/program-calculate-age/",
            platform: "GeeksforGeeks",
            topicTag: "Structures"
          }
        ]
      },
      {
        id: "c-file-handling-crud",
        slug: "file-handling-create-write-read-append",
        title: "Exp 13: File Handling — Create, Write, Read, and Append Data to a File",
        categoryId: "c-structures-files",
        categoryName: "5. Structures & File Handling",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "C file handling fopen fprintf fscanf append mode",
        gfgUrl: "https://www.geeksforgeeks.org/basics-file-handling-c/",
        quickSummary: "Practice the core file I/O operations in C using fopen, fprintf/fscanf, and different file modes.",
        keyPoints: [
          "File access modes: fopen with mode 'w', 'r', or 'a' controls whether a file is created/overwritten, read, or appended to.",
          "Formatted stream I/O: fprintf/fscanf (or fputs/fgets) write and read formatted data to/from the file stream.",
          "Buffer flushing & release: fclose must be called to flush buffers and release operating system file descriptors."
        ],
        diagramTitle: "C File I/O Stream Lifecycle",
        diagram: `  [ File on Disk ] ◄── fopen("log.txt", "a") ──► [ Buffer Stream (FILE*) ]
                                                         │
  fprintf(fp, ...) ──► [ Write Buffer ] ──► fclose(fp) [ Flushes to Disk ]`,
        complexities: [
          { operation: "File read/write", best: "O(1)", avg: "O(size)", worst: "O(size)", space: "O(1) buffered" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (File Handling)",
            code: `#include <stdio.h>

int main() {
    FILE *fp = fopen("vlab_notes.txt", "w");
    if (!fp) return 1;

    fprintf(fp, "Antigravity Virtual Labs - C Programming\\n");
    fclose(fp);

    // Append mode
    fp = fopen("vlab_notes.txt", "a");
    fprintf(fp, "Experiment 13: File I/O Completed Successfully.\\n");
    fclose(fp);

    printf("File written and appended successfully.\\n");
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Basics of File Handling in C",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/basics-file-handling-c/",
            platform: "GeeksforGeeks",
            topicTag: "File I/O"
          }
        ]
      },
      {
        id: "c-file-employee-evaluation",
        slug: "file-based-employee-details-performance",
        title: "Exp 14: File-Based Application to Store Employee Details and Evaluate Performance",
        categoryId: "c-structures-files",
        categoryName: "5. Structures & File Handling",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "C file handling store structure employee evaluate performance",
        gfgUrl: "https://www.geeksforgeeks.org/read-write-structure-to-a-file-in-c/",
        quickSummary: "Extend file handling into a small application that persists employee records to a file and computes a performance evaluation from stored data.",
        keyPoints: [
          "Persistent records: Structures combined with file I/O allow persisting structured records beyond a single program run.",
          "Stream parsing: Records are read back from the file and processed (e.g. average performance score) using the same struct layout.",
          "Threshold evaluation: Evaluation logic applies business rules (e.g. rating thresholds) to the read-back data to classify performance."
        ],
        diagramTitle: "File-Based Employee Performance Pipeline",
        diagram: `  [ App Entry ] ──► Write struct to "employees.dat"
                            │
                            ▼ Read Stream (fscanf / fread)
  [ Compute Rating >= 85 ] ──► "EXEMPLARY PERFORMER" Evaluated!`,
        complexities: [
          { operation: "Record read + evaluation", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n) (or O(1) if streamed)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Employee File Evaluation)",
            code: `#include <stdio.h>

struct Employee {
    int id;
    char name[50];
    float score;
};

int main() {
    FILE *fp = fopen("emp_eval.txt", "w");
    fprintf(fp, "101 Aiden 88.5\\n");
    fprintf(fp, "102 Clara 94.0\\n");
    fclose(fp);

    // Read back and evaluate
    fp = fopen("emp_eval.txt", "r");
    struct Employee e;
    printf("=== Performance Evaluation ===\\n");
    while (fscanf(fp, "%d %s %f", &e.id, e.name, &e.score) != EOF) {
        printf("Emp: %-8s | Score: %5.1f | Rating: %s\\n",
               e.name, e.score, e.score >= 90 ? "OUTSTANDING" : "SATISFACTORY");
    }
    fclose(fp);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Read and Write Structure to a File in C",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/read-write-structure-to-a-file-in-c/",
            platform: "GeeksforGeeks",
            topicTag: "File I/O"
          }
        ]
      },
      {
        id: "c-inventory-management-app",
        slug: "mini-inventory-management-application-file-handling",
        title: "Exp 15: Mini Inventory Management Application Using File Handling",
        categoryId: "c-structures-files",
        categoryName: "5. Structures & File Handling",
        difficulty: "Advanced",
        estimatedTime: "35 mins",
        gfgSearchQuery: "Mini inventory management system project in C file handling",
        gfgUrl: "https://www.geeksforgeeks.org/inventory-management-system-using-c/",
        quickSummary: "Build a small menu-driven inventory system that adds, updates, displays, and persists item records to a file.",
        keyPoints: [
          "Menu-driven dispatch: A menu-driven loop dispatches to add, update, delete, and display operations on inventory records.",
          "File persistence: File handling persists the inventory across program runs, avoiding data loss on exit.",
          "Record rewrite updates: Update/delete operations read all records, modify the target item, and rewrite the persistent file."
        ],
        diagramTitle: "Mini Inventory Management Architecture",
        diagram: `  [ Interactive Console Menu ]
        ├── 1. Add Item     ──► Append to "inventory.txt"
        ├── 2. View Stock   ──► Stream read & tabular display
        └── 3. Update Item ──► Read all, mutate target, rewrite file`,
        complexities: [
          { operation: "Add/Update/Display via file", best: "O(1) append", avg: "O(n) update/delete", worst: "O(n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Mini Inventory Application)",
            code: `#include <stdio.h>
#include <string.h>

struct Item {
    int id;
    char name[50];
    int qty;
    float price;
};

void addItem(int id, const char *name, int qty, float price) {
    FILE *fp = fopen("inventory.txt", "a");
    if (fp) {
        fprintf(fp, "%d %s %d %.2f\\n", id, name, qty, price);
        fclose(fp);
        printf("[✓] Item %s added to persistent storage.\\n", name);
    }
}

void displayInventory() {
    FILE *fp = fopen("inventory.txt", "r");
    if (!fp) { printf("No inventory file found.\\n"); return; }
    struct Item item;
    printf("\\n--- Warehouse Inventory List ---\\n");
    while (fscanf(fp, "%d %s %d %f", &item.id, item.name, &item.qty, &item.price) != EOF) {
        printf("ID: %3d | Item: %-12s | Qty: %3d | Price: $%.2f\\n",
               item.id, item.name, item.qty, item.price);
    }
    fclose(fp);
}

int main() {
    addItem(1, "RAM_16GB", 40, 65.00);
    addItem(2, "SSD_1TB", 25, 89.50);
    displayInventory();
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Inventory Management System using C",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/inventory-management-system-using-c/",
            platform: "GeeksforGeeks",
            topicTag: "Capstone Project"
          }
        ]
      }
    ]
  }
];
