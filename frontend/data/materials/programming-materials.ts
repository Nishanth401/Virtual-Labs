import { MaterialContent } from "./types";

export const PROGRAMMING_MATERIALS: Record<string, MaterialContent> = {
  "c-programming-guide": {
    id: "c-programming-guide",
    title: "C Programming Language Complete Academic Tutorial",
    subject: "C Programming Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "C Programming Foundations",
    readTime: "25 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/c-programming",
    simulatorName: "C Pointer & Memory Studio",
    overview:
      "C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion with a static type system. It provides low-level memory access and maps efficiently to typical machine instructions, making it the foundational systems language for operating system kernels and embedded firmware.",
    learningObjectives: [
      "Understand the C compilation pipeline: Preprocessor, Compiler, Assembler, Linker",
      "Master pointers, address-of (&) and dereference (*) operators, and pointer arithmetic",
      "Manage dynamic heap memory safely using malloc(), calloc(), realloc(), and free()",
      "Design structured data models using struct and union types",
      "Implement file handling using standard stream functions (fopen, fread, fwrite, fclose)"
    ],
    keyConcepts: [
      {
        title: "1. The Four Stages of C Compilation",
        description:
          "Transforming human-readable C source code into machine-executable binary.",
        points: [
          "Preprocessing (gcc -E): Expands #include headers, macro definitions (#define), and strips comments.",
          "Compilation (gcc -S): Translates preprocessed C into assembly language instructions.",
          "Assembly (gcc -c): Assembles assembly code into machine object code (.o / .obj).",
          "Linking (gcc): Resolves external library references (libc) and stitches object files into the final executable."
        ]
      },
      {
        title: "2. Pointers & Memory Architecture",
        description:
          "Pointers store the virtual memory address of another variable.",
        points: [
          "Pointer Arithmetic: Incrementing ptr++ advances the address by sizeof(data_type) bytes (e.g. +4 bytes for int on 32-bit).",
          "Pass-by-Reference: Passing pointers to functions allows direct modification of the caller's stack frame variables.",
          "Dangling Pointer: A pointer that still points to memory that has already been deallocated using free()."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Allocate Heap Memory",
        description: "Invoke ptr = (int*)malloc(n * sizeof(int)). Always check if ptr == NULL."
      },
      {
        step: 2,
        title: "Access & Manipulate",
        description: "Manipulate data via array syntax ptr[i] or pointer offset *(ptr + i)."
      },
      {
        step: 3,
        title: "Deallocate & Nullify",
        description: "Release memory via free(ptr); set ptr = NULL to prevent dangling pointer bugs."
      }
    ],
    codeSnippets: {
      c: `#include <stdio.h>
#include <stdlib.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Before Swap: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After Swap: x=%d, y=%d\\n", x, y);

    // Dynamic Memory Allocation
    int n = 5;
    int *arr = (int *)malloc(n * sizeof(int));
    if (arr == NULL) {
        fprintf(stderr, "Memory allocation failed!\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;

    printf("Dynamically allocated array: ");
    for (int i = 0; i < n; i++) printf("%d ", *(arr + i));
    printf("\\n");

    free(arr);
    arr = NULL; // Safe pointer neutralization
    return 0;
}`
    },
    complexityAnalysis: {
      timeComplexity: "O(1) pointer dereferencing and memory address offset arithmetic",
      spaceComplexity: "O(1) overhead beyond raw allocated bytes in heap / stack",
      bestCase: "O(1)",
      worstCase: "O(1)",
      notes: "Unlike garbage-collected languages, C gives full responsibility of memory management to the developer."
    },
    vivaQuestions: [
      {
        question: "What is the difference between malloc() and calloc() in C?",
        answer: "malloc(size) takes a single total size argument and allocates memory without clearing it (contains garbage values). calloc(n, size) takes two arguments (number of elements and size of each) and initializes all allocated bytes to zero."
      },
      {
        question: "What is a segmentation fault?",
        answer: "A segmentation fault (SIGSEGV) occurs when a program attempts to access a memory address that it does not have permission to access (e.g. dereferencing a NULL pointer, accessing memory beyond allocated bounds, or writing to read-only string literals)."
      }
    ],
    realWorldApplications: [
      "Linux, macOS, and Windows operating system kernel development",
      "Embedded microcontrollers (ARM, AVR, PIC) in automotive systems",
      "High-speed game graphics engines and device drivers"
    ],
    practiceProblems: [
      {
        title: "Dynamic String Reversal using Pointers",
        difficulty: "Easy",
        description: "Write a function void reverseString(char *str) that reverses a string in-place using two pointers (start and end) without using string library functions."
      }
    ]
  },

  "c-pointers-gfg": {
    id: "c-pointers-gfg",
    title: "C Pointers & Dynamic Memory Allocation (malloc, free)",
    subject: "C Programming Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "Pointers & Memory Allocation",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/c-programming",
    simulatorName: "C Pointer & Memory Studio",
    overview:
      "A deep dive into C pointer mechanics, memory layouts, and dynamic heap allocation. Covers multi-dimensional pointer arithmetic, double pointers (int **), array-pointer duality, dynamic 2D array allocation, and memory leak prevention using Valgrind inspection techniques.",
    learningObjectives: [
      "Master pointer-to-pointer (double pointer) dereferencing syntax",
      "Dynamically allocate and free 2D matrices on the heap",
      "Understand void* generic pointers and function pointers",
      "Detect and fix memory leaks and buffer overruns",
      "Analyze the difference between stack allocation and heap allocation"
    ],
    keyConcepts: [
      {
        title: "1. Dynamic 2D Array Memory Allocation",
        description:
          "Allocating non-contiguous rows versus contiguous 2D block buffers.",
        points: [
          "Pointer-to-Pointer Model: Allocate an array of row pointers int **matrix = malloc(rows * sizeof(int*)), then allocate each row matrix[i] = malloc(cols * sizeof(int)).",
          "Cleanup Requirement: Must free every row in a loop before freeing the top-level pointer array to avoid memory leaks."
        ]
      },
      {
        title: "2. Function Pointers in C",
        description:
          "Pointers storing the executable code address of a function, enabling callback architectures.",
        points: [
          "Syntax: int (*comparator)(const void *, const void *).",
          "Use Case: Used by qsort() in standard library for generic sorting."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Allocate Row Pointers",
        description: "Allocate array of pointers: int **mat = malloc(rows * sizeof(int*))."
      },
      {
        step: 2,
        title: "Allocate Columns per Row",
        description: "Loop i from 0 to rows-1: mat[i] = malloc(cols * sizeof(int))."
      },
      {
        step: 3,
        title: "Complete Deallocation",
        description: "Loop free(mat[i]); then free(mat); set mat = NULL."
      }
    ],
    codeSnippets: {
      c: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int rows = 3, cols = 4;
    // 1. Allocate Array of Row Pointers
    int **matrix = (int **)malloc(rows * sizeof(int *));
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int *)malloc(cols * sizeof(int));
    }

    // 2. Populate and Print
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = (i + 1) * 10 + j;
            printf("%d\\t", matrix[i][j]);
        }
        printf("\\n");
    }

    // 3. Deallocate Memory in Reverse Order
    for (int i = 0; i < rows; i++) {
        free(matrix[i]);
    }
    free(matrix);
    matrix = NULL;
    return 0;
}`
    },
    complexityAnalysis: {
      timeComplexity: "O(Rows * Cols) allocation and initialization; O(1) element access matrix[i][j]",
      spaceComplexity: "O(Rows * Cols * sizeof(int) + Rows * sizeof(int*)) total heap memory",
      bestCase: "O(1) access",
      worstCase: "O(Rows) deallocation overhead",
      notes: "Contiguous single-malloc allocation matrix = malloc(rows * cols * sizeof(int)) maximizes CPU L1 cache locality."
    },
    vivaQuestions: [
      {
        question: "What is a memory leak and how do you prevent it in C?",
        answer: "A memory leak occurs when memory allocated on the heap via malloc()/calloc() is no longer referenced by any pointer but has not been released back to the OS via free(). Over time, this exhausts RAM. Prevent it by ensuring every malloc() has a corresponding free()."
      },
      {
        question: "What is a void pointer in C?",
        answer: "A void pointer (void*) is a generic pointer that can point to an object of any data type without type casting. It cannot be directly dereferenced without first being explicitly cast to a concrete type."
      }
    ],
    realWorldApplications: [
      "Custom memory pool allocators in game engines",
      "Network packet buffer queues inside network interface card firmware"
    ],
    practiceProblems: [
      {
        title: "Dynamic Matrix Transpose",
        difficulty: "Medium",
        description: "Write a C function that takes a dynamically allocated M x N matrix and returns a new dynamically allocated N x M transpose matrix."
      }
    ]
  },

  "c-programming-w3schools": {
    id: "c-programming-w3schools",
    title: "W3Schools C Programming Syntax & Memory Models",
    subject: "C Programming Laboratory",
    provider: "W3Schools Reference",
    category: "C Syntax & Structures",
    readTime: "20 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/c-programming",
    simulatorName: "C Pointer & Memory Studio",
    overview:
      "A hands-on, practical W3Schools-curated laboratory guide to C programming syntax, arrays, strings, struct vs union types, and standard library I/O.",
    learningObjectives: [
      "Master standard C data types, format specifiers, and type conversions",
      "Manipulate null-terminated character array strings (strlen, strcpy, strcat)",
      "Design structured data models using struct and typedef",
      "Understand the difference between struct and union memory layouts",
      "Read and write files using fopen, fprintf, and fscanf"
    ],
    keyConcepts: [
      {
        title: "1. Struct vs Union Memory Layout",
        description:
          "Crucial distinction between independent member memory versus shared union memory.",
        points: [
          "struct: Each member has its own dedicated memory address. Total size = sum of member sizes + alignment padding.",
          "union: All members share the same starting memory address. Total size = size of the largest member. Writing to one member overwrites all others."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Declare Struct with Typedef",
        description: "Define struct template and create clean type alias."
      },
      {
        step: 2,
        title: "Access Members",
        description: "Use dot operator (.) for direct variables and arrow operator (->) for pointers."
      }
    ],
    codeSnippets: {
      c: `#include <stdio.h>

typedef struct {
    int id;
    char name[50];
    float marks;
} Student;

union Packet {
    int rawValue;
    char bytes[4];
};

int main() {
    Student s = {101, "Ada", 94.5};
    Student *ptr = &s;

    printf("Student: ID=%d, Name=%s, Marks=%.1f\\n", ptr->id, ptr->name, ptr->marks);

    union Packet p;
    p.rawValue = 0x12345678;
    printf("Union size: %lu bytes, Lowest Byte: 0x%X\\n", sizeof(union Packet), p.bytes[0]);
    return 0;
}`
    },
    complexityAnalysis: {
      timeComplexity: "O(1) struct/union field offset calculation at compile time",
      spaceComplexity: "O(sizeof(struct)) with compiler padding alignment",
      bestCase: "O(1)",
      worstCase: "O(1)",
      notes: "Use __attribute__((packed)) in GCC to eliminate struct padding when serializing data over network sockets."
    },
    vivaQuestions: [
      {
        question: "When should you use a union instead of a struct in C?",
        answer: "A union is used when a data structure only holds one value out of several possible types at any given moment (e.g. protocol variant packets, hardware registers, or memory-constrained embedded systems)."
      }
    ],
    realWorldApplications: [
      "Hardware microcontroller control registers (bitfields and unions)",
      "File metadata headers (BMP, WAV, MP3 header structs)"
    ],
    practiceProblems: [
      {
        title: "Student Record File Store",
        difficulty: "Easy",
        description: "Write a program that writes an array of 3 Student structs to a binary file using fwrite() and reads them back using fread()."
      }
    ]
  },

  "python-basics-gfg": {
    id: "python-basics-gfg",
    title: "Python Core Programming, Data Types & Control Structures",
    subject: "Python Programming Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "Python Foundations",
    readTime: "25 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/python-programming",
    simulatorName: "Python Execution Lab",
    overview:
      "Python is a high-level, general-purpose interpreted programming language with dynamic semantics. This GeeksforGeeks reference covers core data types, mutable vs immutable models, list comprehensions, generator functions (yield), lambda functions, and parameter packing (*args, **kwargs).",
    learningObjectives: [
      "Understand dynamic typing, bytecode compilation, and the Python Virtual Machine (PVM)",
      "Distinguish mutable (Lists, Dicts, Sets) from immutable (Ints, Strings, Tuples) types",
      "Write concise, idiomatic Python using List, Dictionary, and Set comprehensions",
      "Implement memory-efficient streaming generators using the yield keyword",
      "Master flexible function argument unpacking via *args and **kwargs"
    ],
    keyConcepts: [
      {
        title: "1. Mutable vs Immutable Objects",
        description:
          "Everything in Python is an object with an ID, type, and value.",
        points: [
          "Immutable: Integers, Floats, Strings, Tuples, Frozensets. Any modification creates a new object in memory with a different id().",
          "Mutable: Lists, Dictionaries, Sets. Modified in-place without altering the underlying object's memory address id()."
        ]
      },
      {
        title: "2. Generators vs Comprehensions",
        description:
          "Comprehensions construct entire collections in RAM immediately; Generators produce elements on-demand.",
        points: [
          "Comprehension: [x**2 for x in range(1000000)] uses megabytes of RAM.",
          "Generator: (x**2 for x in range(1000000)) returns a generator object with O(1) memory footprint using lazy evaluation."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Define Generator",
        description: "Write generator function yielding prime numbers sequentially using yield."
      },
      {
        step: 2,
        title: "Consume Stream",
        description: "Iterate stream via next() or for-loop with O(1) memory overhead."
      }
    ],
    codeSnippets: {
      python: `# 1. List and Dict Comprehensions
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squares = [x**2 for x in numbers if x % 2 == 0]
square_map = {x: x**2 for x in numbers if x % 2 == 0}
print("Even Squares:", even_squares)
print("Square Map:", square_map)

# 2. Generator Function (Lazy Evaluation)
def fibonacci_generator(limit):
    a, b = 0, 1
    count = 0
    while count < limit:
        yield a
        a, b = b, a + b
        count += 1

print("First 8 Fibs:", list(fibonacci_generator(8)))

# 3. Parameter Unpacking (*args, **kwargs)
def print_system_info(*args, **kwargs):
    print("Positional Args:", args)
    print("Keyword Args:", kwargs)

print_system_info("Server-1", "Active", ip="192.168.1.5", load=0.45)`
    },
    complexityAnalysis: {
      timeComplexity: "O(1) dictionary and set lookup/insertion; O(N) list operations",
      spaceComplexity: "Generator: O(1) space; List comprehension: O(N) memory allocation",
      bestCase: "O(1)",
      worstCase: "O(N)",
      notes: "CPython uses reference counting combined with a generational cycle detector for automatic garbage collection."
    },
    vivaQuestions: [
      {
        question: "What is the difference between a shallow copy and a deep copy in Python?",
        answer: "A shallow copy (copy.copy) creates a new container object but inserts references into it to the original child objects. A deep copy (copy.deepcopy) recursively copies the container AND all nested objects within it, creating completely independent memory structures."
      },
      {
        question: "How do *args and **kwargs work in Python functions?",
        answer: "*args collects excess positional arguments into an immutable Tuple. **kwargs collects excess keyword arguments into a mutable Dictionary."
      }
    ],
    realWorldApplications: [
      "Backend web development with Django and FastAPI",
      "Automation scripts for cloud server provisioning and log parsing",
      "Data extraction pipelines with BeautifulSoup and Scrapy"
    ],
    practiceProblems: [
      {
        title: "Custom Sieve of Eratosthenes Generator",
        difficulty: "Medium",
        description: "Implement an infinite prime generator in Python using the yield keyword and test fetching the first 50 primes."
      }
    ]
  },

  "python-oop-gfg": {
    id: "python-oop-gfg",
    title: "Python OOP, Classes, Inheritance & Dunder Methods",
    subject: "Python Programming Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "Object-Oriented Python",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/python-programming",
    simulatorName: "Python Execution Lab",
    overview:
      "A comprehensive guide to object-oriented programming in Python. Covers class blueprints, the __init__ constructor, self reference, inheritance, Method Resolution Order (MRO) via C3 Linearization, dunder (magic) methods, property decorators, and context managers (__enter__ and __exit__).",
    learningObjectives: [
      "Define classes and instantiate objects with instance and class attributes",
      "Understand the difference between @staticmethod, @classmethod, and instance methods",
      "Trace Method Resolution Order (MRO) in multiple inheritance architectures",
      "Implement operator overloading using dunder methods (__str__, __repr__, __add__, __len__)",
      "Create custom context managers using the with statement and __enter__/__exit__"
    ],
    keyConcepts: [
      {
        title: "1. Method Resolution Order (MRO) & C3 Linearization",
        description:
          "How Python unambiguously resolves method calls in multiple inheritance.",
        points: [
          "Resolution Order: Python searches classes from left to right in the class definition tuple.",
          "C3 Linearization: Guarantees monotonicity and local precedence order.",
          "Inspection: ClassName.__mro__ reveals the exact dispatch sequence ending in object."
        ]
      },
      {
        title: "2. Dunder (Magic) Methods & Operator Overloading",
        description:
          "Special double-underscore methods allowing custom classes to hook into Python syntax.",
        points: [
          "__init__: Initializer called after object creation.",
          "__str__: User-friendly string representation for print().",
          "__repr__: Unambiguous developer representation.",
          "__add__: Overloads the + operator for custom types."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Define Class Blueprint",
        description: "Declare class with __init__ constructor and typed properties."
      },
      {
        step: 2,
        title: "Overload Dunder Methods",
        description: "Implement __str__, __add__, and __enter__/__exit__ for context manager lifecycle."
      }
    ],
    codeSnippets: {
      python: `class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # Operator Overloading for +
    def __add__(self, other):
        return Vector2D(self.x + other.x, self.y + other.y)

    def __str__(self):
        return f"Vector2D({self.x}, {self.y})"

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

# Context Manager Implementation
class ManagedFile:
    def __init__(self, filename):
        self.filename = filename

    def __enter__(self):
        self.file = open(self.filename, 'w')
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()

# Test OOP Implementations
v1 = Vector2D(3, 4)
v2 = Vector2D(1, 2)
v3 = v1 + v2
print("Vector Addition Result:", v3)`
    },
    complexityAnalysis: {
      timeComplexity: "O(1) method resolution and dunder method invocation",
      spaceComplexity: "O(1) per object instance attributes in __dict__ (or __slots__ for optimization)",
      bestCase: "O(1)",
      worstCase: "O(1)",
      notes: "Using __slots__ in Python classes bypasses the default __dict__ overhead, reducing memory by up to 60%."
    },
    vivaQuestions: [
      {
        question: "What is the difference between @classmethod and @staticmethod in Python?",
        answer: "@classmethod receives the class object (cls) as its first implicit argument and can access/modify class state. @staticmethod receives neither self nor cls; it acts like a plain function that belongs to the class's namespace for organizational purposes."
      },
      {
        question: "How do context managers (__enter__ and __exit__) prevent resource leaks?",
        answer: "__enter__ sets up the resource (opens file or lock) and returns it. __exit__ is guaranteed to run even if an unhandled exception occurs inside the 'with' block, ensuring the file is closed or lock released safely."
      }
    ],
    realWorldApplications: [
      "SQLAlchemy ORM database model class declarations",
      "PyTorch custom neural network modules inheriting from nn.Module"
    ],
    practiceProblems: [
      {
        title: "Complex Number Operator Overloading",
        difficulty: "Easy",
        description: "Create a ComplexNumber class that overloads __add__, __sub__, and __mul__ operators."
      }
    ]
  },

  "python-w3schools": {
    id: "python-w3schools",
    title: "Python Programming Comprehensive Core Curriculum",
    subject: "Python Programming Laboratory",
    provider: "W3Schools Reference",
    category: "Python Foundations & Collections",
    readTime: "20 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/python-programming",
    simulatorName: "Python Execution Lab",
    overview:
      "A hands-on, practical W3Schools-curated laboratory guide to Python collections, strings, file handling, and exception management. Master Lists, Tuples, Sets, and Dictionaries with built-in methods.",
    learningObjectives: [
      "Compare the characteristics of List, Tuple, Set, and Dictionary",
      "Apply slicing notation [start:stop:step] on strings and lists",
      "Handle runtime errors with try, except, else, and finally blocks",
      "Read, write, and parse structured CSV files with the csv module",
      "Import standard library modules (math, random, datetime, json)"
    ],
    keyConcepts: [
      {
        title: "1. The Four Built-in Collections Comparison",
        description:
          "Choosing the right collection based on ordering, mutability, and duplication needs.",
        points: [
          "List: Ordered, mutable, allows duplicate members. Written with square brackets [].",
          "Tuple: Ordered, immutable, allows duplicate members. Written with parentheses ().",
          "Set: Unordered, unindexed, unique members (no duplicates). Written with curly braces {}.",
          "Dictionary: Ordered (Python 3.7+), mutable, key-value mappings. No duplicate keys."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Read File Safely",
        description: "Use with open('data.txt') to auto-close file descriptors."
      },
      {
        step: 2,
        title: "Handle Exceptions",
        description: "Wrap file parsing in try-except block to catch FileNotFoundError and ValueError."
      }
    ],
    codeSnippets: {
      python: `import json

# Dictionary & JSON Processing
student_record = {
    "name": "Alan Turing",
    "course": "B.Tech AI & DS",
    "subjects": ["Python", "DSA", "DBMS"],
    "gpa": 9.85
}

# Serialize to JSON String
json_data = json.dumps(student_record, indent=4)
print("Serialized JSON:\\n", json_data)

# Deserialize back to Python Dict
parsed_record = json.loads(json_data)
print("Parsed GPA:", parsed_record["gpa"])`
    },
    complexityAnalysis: {
      timeComplexity: "O(1) Dict/Set membership check via hashing; O(N) List search",
      spaceComplexity: "O(N) memory",
      bestCase: "O(1)",
      worstCase: "O(N)",
      notes: "Sets implement high-speed union (|), intersection (&), and difference (-) using C-level bitmask hash tables."
    },
    vivaQuestions: [
      {
        question: "When should you use a Tuple instead of a List in Python?",
        answer: "Use a Tuple when data should be write-protected (immutable, e.g. geographical coordinates), when using the collection as a dictionary key (lists cannot be hashed), or to benefit from slight memory and performance advantages."
      }
    ],
    realWorldApplications: [
      "REST API JSON request and response serialization",
      "Configuration management parsing (YAML, JSON, INI files)"
    ],
    practiceProblems: [
      {
        title: "Word Frequency Counter",
        difficulty: "Easy",
        description: "Read a paragraph of text, strip punctuation, and use a dictionary to count and print the occurrences of each word."
      }
    ]
  }
};
