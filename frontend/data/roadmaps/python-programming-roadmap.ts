import { DSACategory } from "../dsa-topic-data";

export const PYTHON_PROGRAMMING_ROADMAP_CATEGORIES: DSACategory[] = [
  {
    id: "python-core-fundamentals",
    name: "1. Core Syntax, Control Flow & Functions",
    shortDesc: "Data types, Control loops, Functions, Lambdas, and String Slicing.",
    iconName: "Code2",
    topics: [
      {
        id: "py-exp-1-basics",
        slug: "python-basics-data-types-operators",
        title: "Exp 1: Python Basics, Dynamic Typing & Operators",
        categoryId: "python-core-fundamentals",
        categoryName: "1. Core Syntax, Control Flow & Functions",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "Python data types operators dynamic typing f-strings",
        gfgUrl: "https://www.geeksforgeeks.org/python-data-types/",
        quickSummary: "Explore Python dynamic typing, numeric objects (int, float, complex), boolean logic, arithmetic/bitwise operators, and formatted f-strings.",
        keyPoints: [
          "Dynamic Typing: Variables reference heap objects without explicit type declarations.",
          "Integer precision: Python 3 integers have arbitrary precision (no 32/64-bit overflow).",
          "Formatted f-strings: f\"{var:.2f}\" evaluates expressions inline at runtime."
        ],
        diagramTitle: "Python Object Reference Model in Memory",
        diagram: `Variable Identifiers (Stack/Scope):         Heap Objects (RAM):
  [ x ] ──────────────────────────────────────────► [ Int Object: 42 ] (type: int, ref_count: 1)
  [ pi ] ─────────────────────────────────────────► [ Float Object: 3.14159 ]`,
        complexities: [
          { operation: "Variable Binding", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Basics & F-Strings)",
            code: `# Dynamic Variable Assignments
student_name = "Kavya"
marks = [95, 88, 92]
average = sum(marks) / len(marks)
is_distinction = average >= 90.0

print(f"Student: {student_name}")
print(f"Average: {average:.2f}% | Distinction: {is_distinction}")
print(f"Data types -> name: {type(student_name).__name__}, avg: {type(average).__name__}")`
          }
        ],
        practiceProblems: [
          {
            title: "Python Data Types & Input Operations",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/python-programming-language/",
            platform: "GeeksforGeeks",
            topicTag: "Python Basics"
          }
        ]
      },
      {
        id: "py-exp-2-control-loops",
        slug: "control-structures-and-loops-armstrong-prime",
        title: "Exp 2: Control Structures & Loops (if-elif-else, for, while)",
        categoryId: "python-core-fundamentals",
        categoryName: "1. Core Syntax, Control Flow & Functions",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Python if elif else for while loop range armstrong prime",
        gfgUrl: "https://www.geeksforgeeks.org/loops-in-python/",
        quickSummary: "Implement conditionals (if-elif-else), range-based for loops, while loops with break/continue, Armstrong number validation, and prime number generators.",
        keyPoints: [
          "Armstrong Number: Sum of each digit raised to power of total digit count equals the original number (e.g. 153 = 1^3 + 5^3 + 3^3).",
          "for-else loop construct: The else block executes only if loop terminates normally without encountering break.",
          "range(start, stop, step) generator generates numbers on-demand in O(1) memory."
        ],
        diagramTitle: "Armstrong Number Digit Sum Decomposition",
        diagram: `  Number: 153  ──► Digits: [1, 5, 3] (Count = 3)
  Calculation:  1^3 (1) + 5^3 (125) + 3^3 (27) = 153 [✓ Armstrong Match!]`,
        complexities: [
          { operation: "Armstrong Check", best: "O(digits)", avg: "O(log10 n)", worst: "O(log10 n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Armstrong & Prime Generators)",
            code: `def is_armstrong(num):
    digits = [int(d) for d in str(num)]
    power = len(digits)
    return sum(d ** power for d in digits) == num

def get_primes(n):
    primes = []
    for num in range(2, n + 1):
        if all(num % i != 0 for i in range(2, int(num**0.5) + 1)):
            primes.append(num)
    return primes

print(f"153 is Armstrong? {is_armstrong(153)}")
print(f"Prime numbers up to 30: {get_primes(30)}")`
          }
        ],
        practiceProblems: [
          {
            title: "Check if a Number is Armstrong Number",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/program-for-armstrong-numbers/",
            platform: "GeeksforGeeks",
            topicTag: "Control Flow"
          }
        ]
      },
      {
        id: "py-exp-3-functions-lambda",
        slug: "functions-lambda-expressions-and-recursion",
        title: "Exp 3: Functions, Lambda Expressions & Recursion (*args, **kwargs)",
        categoryId: "python-core-fundamentals",
        categoryName: "1. Core Syntax, Control Flow & Functions",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Python functions args kwargs lambda map filter recursion",
        gfgUrl: "https://www.geeksforgeeks.org/python-functions/",
        quickSummary: "Design modular functions with default arguments, variable positional *args and keyword **kwargs, anonymous lambda expressions, and recursive algorithms.",
        keyPoints: [
          "*args packs positional arguments into a tuple; **kwargs packs keyword arguments into a dictionary.",
          "lambda parameters: expression creates lightweight anonymous inline functions.",
          "Recursion base condition prevents maximum recursion depth (sys.getrecursionlimit()) exceptions."
        ],
        diagramTitle: "*args and **kwargs Parameter Packing",
        diagram: `  func(1, 2, name="Alice", gpa=3.9)
    ├── 1, 2                ──► *args   = (1, 2) [Tuple]
    └── name="Alice", gpa=3.9 ──► **kwargs = {"name": "Alice", "gpa": 3.9} [Dict]`,
        complexities: [
          { operation: "Lambda Execution", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Recursive Fibonacci", best: "O(n)", avg: "O(2^n) / O(n memo)", worst: "O(2^n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Functions & Lambdas)",
            code: `# 1. *args and **kwargs Flexible Logger
def build_profile(user_id, *skills, **metadata):
    return {
        "id": user_id,
        "skills": list(skills),
        "details": metadata
    }

# 2. Lambdas with map and filter
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens_squared = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, numbers)))

print("User Profile:", build_profile(101, "Python", "NumPy", "SQL", role="Analyst", dept="AIDS"))
print("Evens Squared:", evens_squared)`
          }
        ],
        practiceProblems: [
          {
            title: "Fibonacci Number (LeetCode #509)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/fibonacci-number/",
            platform: "LeetCode",
            topicTag: "Functions"
          }
        ]
      },
      {
        id: "py-exp-4-strings-slicing",
        slug: "strings-and-slicing-operations",
        title: "Exp 4: Strings & Slicing Operations (Palindromes, Anagrams, Formatting)",
        categoryId: "python-core-fundamentals",
        categoryName: "1. Core Syntax, Control Flow & Functions",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Python string slicing methods split join replace anagrams",
        gfgUrl: "https://www.geeksforgeeks.org/python-strings/",
        quickSummary: "Manipulate immutable Unicode strings using extended step slicing [::-1], built-in string methods (split, join, strip, replace), and anagram frequency counters.",
        keyPoints: [
          "Extended Slicing: s[start:stop:step]; s[::-1] creates a reversed string copy in O(n) time.",
          "String Immutability: String modifications generate new objects in memory.",
          "Collections.Counter creates instantaneous character frequency histograms."
        ],
        diagramTitle: "Python Extended Step String Slicing",
        diagram: `  String:  "P  Y  T  H  O  N"
  Index:    0  1  2  3  4  5
  Negative:-6 -5 -4 -3 -2 -1
  s[1:5:2] ──► "Y" + "H" = "YH" | s[::-1] ──► "NOHTYP" (Reversal)`,
        complexities: [
          { operation: "String Slicing [::step]", best: "O(k)", avg: "O(k)", worst: "O(k)", space: "O(k)" },
          { operation: "Anagram Counter Check", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(distinct_chars)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (String Operations)",
            code: `from collections import Counter

def is_anagram(s1, s2):
    return Counter(s1.replace(" ", "").lower()) == Counter(s2.replace(" ", "").lower())

text = "  Virtual Labs Python Programming  "
clean_text = text.strip()
words = clean_text.split()
kebab_case = "-".join(words).lower()

print(f"Cleaned Text: '{clean_text}'")
print(f"Reversed: '{clean_text[::-1]}'")
print(f"Kebab Case: {kebab_case}")
print(f"Is 'listen' & 'silent' Anagram? {is_anagram('listen', 'silent')}")`
          }
        ],
        practiceProblems: [
          {
            title: "Valid Anagram (LeetCode #242)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/valid-anagram/",
            platform: "LeetCode",
            topicTag: "Strings"
          }
        ]
      }
    ]
  },
  {
    id: "python-data-structures",
    name: "2. Built-in Collections & Comprehensions",
    shortDesc: "Lists, Tuples, Sets, Dictionaries, and Comprehensions.",
    iconName: "Layers",
    topics: [
      {
        id: "py-exp-5-lists-comprehensions",
        slug: "lists-and-list-comprehensions",
        title: "Exp 5: Lists & List Comprehensions (Nested Matrices, Slicing)",
        categoryId: "python-data-structures",
        categoryName: "2. Built-in Collections & Comprehensions",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Python lists list comprehension matrix transpose 2D lists",
        gfgUrl: "https://www.geeksforgeeks.org/python-list/",
        quickSummary: "Manage mutable dynamic lists, master slicing and list methods (append, pop, sort), and write concise declarative list comprehensions.",
        keyPoints: [
          "Dynamic Array: Over-allocates contiguous memory for amortized O(1) appends.",
          "List Comprehension: [expr for item in iterable if condition] replaces multi-line loops with high performance C-speed loops.",
          "Matrix Transpose Comprehension: [[row[i] for row in matrix] for i in range(cols)]."
        ],
        diagramTitle: "List Comprehension Filtering & Mapping Pipeline",
        diagram: `  [ 1, 2, 3, 4, 5, 6 ] ──Filter (x % 2 == 0)──► [ 2, 4, 6 ] ──Map (x**2)──► [ 4, 16, 36 ]`,
        complexities: [
          { operation: "List Append / Pop End", best: "O(1)", avg: "O(1)", worst: "O(n resize)", space: "O(1)" },
          { operation: "List Comprehension", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n output)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (List Comprehensions)",
            code: `# 1. 2D Matrix Transposition with List Comprehension
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
transpose = [[row[i] for row in matrix] for i in range(len(matrix[0]))]

# 2. Filter & Transform
scores = [45, 88, 92, 67, 34, 99, 78]
passed_curved = [min(100, s + 5) for s in scores if s >= 50]

print("Original Matrix:", matrix)
print("Transposed Matrix:", transpose)
print("Curved Passing Scores:", passed_curved)`
          }
        ],
        practiceProblems: [
          {
            title: "Transpose Matrix (LeetCode #867)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/transpose-matrix/",
            platform: "LeetCode",
            topicTag: "Lists"
          }
        ]
      },
      {
        id: "py-exp-6-tuples-sets",
        slug: "tuples-and-sets-mathematical-operations",
        title: "Exp 6: Tuples & Sets (Immutability, Set Theory Operations)",
        categoryId: "python-data-structures",
        categoryName: "2. Built-in Collections & Comprehensions",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Python tuples immutability sets union intersection difference",
        gfgUrl: "https://www.geeksforgeeks.org/python-sets/",
        quickSummary: "Compare immutable hashable Tuples with unordered distinct Sets, executing mathematical set theory operations (union |, intersection &, difference -).",
        keyPoints: [
          "Tuples: Immutable sequences, usable as dictionary keys or set elements.",
          "Sets: Implemented as hash tables with O(1) average lookup and uniqueness enforcement.",
          "Set Operators: A | B (Union), A & B (Intersection), A - B (Difference), A ^ B (Symmetric Difference)."
        ],
        diagramTitle: "Set Theory Operations Venn Visualizer",
        diagram: `     Union (A | B)              Intersection (A & B)           Difference (A - B)
    ┌─────┬─────┐                ┌─────┬─────┐                ┌─────┬─────┐
    │  A  │ A∩B │  B             │  A  │*A∩B*│  B             │ *A* │ A∩B │  B
    └─────┴─────┘                └─────┴─────┘                └─────┴─────┘`,
        complexities: [
          { operation: "Set Member Lookup (x in s)", best: "O(1)", avg: "O(1)", worst: "O(n)", space: "O(1)" },
          { operation: "Set Union / Intersection", best: "O(len(A))", avg: "O(len(A) + len(B))", worst: "O(n*m)", space: "O(n + m)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Tuples & Sets)",
            code: `# 1. Tuple Packing and Multiple Unpacking
point_3d = (10, 20, 30)
x, y, z = point_3d

# 2. Set Theory Operations
lab_ai_students = {"Alice", "Bob", "Charlie", "Diana"}
lab_ds_students = {"Charlie", "Diana", "Evan", "Frank"}

common_students = lab_ai_students & lab_ds_students      # Intersection
all_students = lab_ai_students | lab_ds_students         # Union
ai_only_students = lab_ai_students - lab_ds_students     # Difference

print(f"Point 3D Coordinates: x={x}, y={y}, z={z}")
print(f"Common in Both Labs: {common_students}")
print(f"Total Unique Students: {all_students}")
print(f"AI Lab Only: {ai_only_students}")`
          }
        ],
        practiceProblems: [
          {
            title: "Intersection of Two Arrays (LeetCode #349)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/intersection-of-two-arrays/",
            platform: "LeetCode",
            topicTag: "Sets"
          }
        ]
      },
      {
        id: "py-exp-7-dictionaries",
        slug: "dictionaries-and-dictionary-comprehensions",
        title: "Exp 7: Dictionaries & Dict Comprehensions (Word Counting, Sorting)",
        categoryId: "python-data-structures",
        categoryName: "2. Built-in Collections & Comprehensions",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Python dictionary comprehension word frequency sort dictionary by value",
        gfgUrl: "https://www.geeksforgeeks.org/python-dictionary/",
        quickSummary: "Map key-value associations via hash tables, compute word frequency distributions, and write dictionary comprehensions.",
        keyPoints: [
          "Python 3.7+ dictionaries maintain insertion order using compact hash table layout.",
          "Safe access: d.get(key, default) avoids throwing KeyError.",
          "Dict Comprehension: {k: v for k, v in iterable} for inversions and transformations."
        ],
        diagramTitle: "Hash Map Key-Value Bucket Association",
        diagram: `  Key: "AD8482" ──Hash Function──► Bucket [3] ──► Entry: {"code": "AD8482", "name": "Data Science Lab"}`,
        complexities: [
          { operation: "Dictionary get / put", best: "O(1)", avg: "O(1)", worst: "O(n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Dictionaries)",
            code: `# 1. Word Frequency Counter
sentence = "apple banana apple orange banana apple grapes"
word_counts = {}
for word in sentence.split():
    word_counts[word] = word_counts.get(word, 0) + 1

# 2. Dict Comprehension: Filter words with count >= 2
frequent_words = {k: v for k, v in word_counts.items() if v >= 2}

# 3. Sort by Frequency (Descending)
sorted_by_freq = dict(sorted(word_counts.items(), key=lambda item: item[1], reverse=True))

print("Word Frequencies:", word_counts)
print("Frequent Words (>=2):", frequent_words)
print("Sorted by Frequency:", sorted_by_freq)`
          }
        ],
        practiceProblems: [
          {
            title: "Top K Frequent Elements (LeetCode #347)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/top-k-frequent-elements/",
            platform: "LeetCode",
            topicTag: "Dictionaries"
          }
        ]
      }
    ]
  },
  {
    id: "python-oop-files-modules",
    name: "3. OOP, Exception Handling & File I/O",
    shortDesc: "Classes, Inheritance, Exceptions, and File Streams.",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "py-exp-8-oop",
        slug: "object-oriented-programming-in-python",
        title: "Exp 8: Object Oriented Programming (Classes, Inheritance, Dunder Methods)",
        categoryId: "python-oop-files-modules",
        categoryName: "3. OOP, Exception Handling & File I/O",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Python OOP classes inheritance super dunder methods operator overloading",
        gfgUrl: "https://www.geeksforgeeks.org/python-oops-concepts/",
        quickSummary: "Implement object-oriented design: class definitions, __init__ constructors, single/multiple inheritance, super(), and dunder methods (__str__, __add__).",
        keyPoints: [
          "Constructor __init__(self, ...) initializes object instance state.",
          "Inheritance class Child(Parent): invokes parent constructor via super().__init__().",
          "Dunder (Double Underscore) methods like __str__ customize string representation."
        ],
        diagramTitle: "Python OOP Class Hierarchy & Dynamic Method Resolution (MRO)",
        diagram: `┌──────────────────────────────────────────────┐
│ Base Class: BankAccount                      │
├──────────────────────────────────────────────┤
│ acc_no, holder_name, balance                 │
│ deposit(), withdraw()                        │
└──────────────────────┬───────────────────────┘
                       │ inherits
                       ▼
┌──────────────────────────────────────────────┐
│ Derived Class: SavingsAccount                │
├──────────────────────────────────────────────┤
│ interest_rate, add_interest()                │
└──────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Method Resolution (MRO)", best: "O(1)", avg: "O(1)", worst: "O(depth)", space: "O(instance_dict)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (OOP Classes)",
            code: `class BankAccount:
    def __init__(self, acc_no, holder, balance=0.0):
        self.acc_no = acc_no
        self.holder = holder
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            return True
        return False

    def __str__(self):
        return f"BankAccount[{self.acc_no}] {self.holder}: \${self.balance:.2f}"

class SavingsAccount(BankAccount):
    def __init__(self, acc_no, holder, balance=0.0, interest_rate=0.05):
        super().__init__(acc_no, holder, balance)
        self.interest_rate = interest_rate

    def apply_interest(self):
        self.balance += self.balance * self.interest_rate

acc = SavingsAccount("VSB-901", "Alice", 1000.0, 0.06)
acc.deposit(500.0)
acc.apply_interest()
print(acc)`
          }
        ],
        practiceProblems: [
          {
            title: "Design a Stack with Increment Operation",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/design-a-stack-with-increment-operation/",
            platform: "LeetCode",
            topicTag: "OOP"
          }
        ]
      },
      {
        id: "py-exp-9-exceptions",
        slug: "exception-handling-and-custom-exceptions",
        title: "Exp 9: Exception Handling & Custom Exceptions (try-except-finally)",
        categoryId: "python-oop-files-modules",
        categoryName: "3. OOP, Exception Handling & File I/O",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Python exception handling try except else finally custom exceptions",
        gfgUrl: "https://www.geeksforgeeks.org/python-exception-handling/",
        quickSummary: "Trap runtime errors gracefully using try, except, else, finally blocks and define custom domain Exception subclasses.",
        keyPoints: [
          "try-except traps specific errors (ValueError, ZeroDivisionError) without crashing the runtime.",
          "else block executes only if no exception occurred in the try block.",
          "finally block always executes for guaranteed resource cleanup."
        ],
        diagramTitle: "Python Exception Handling Flowchart",
        diagram: `  [ try block ] ──► (Error Occurred?)
                         ├─ YES ──► [ matching except block ] ──► [ finally block ]
                         └─ NO  ──► [ else block ]            ──► [ finally block ]`,
        complexities: [
          { operation: "Exception Trap", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Custom Exceptions)",
            code: `class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        super().__init__(f"Attempted to withdraw \${amount}, but balance is only \${balance}!")

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(balance, amount)
    return balance - amount

try:
    current_bal = 200.0
    print("Initiating withdrawal...")
    current_bal = withdraw(current_bal, 350.0)
except InsufficientFundsError as e:
    print(f"[CAUGHT CUSTOM EXCEPTION]: {e}")
finally:
    print("Session cleanup finalized.")`
          }
        ],
        practiceProblems: [
          {
            title: "Exception Handling in Python",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/python-exception-handling/",
            platform: "GeeksforGeeks",
            topicTag: "Exceptions"
          }
        ]
      },
      {
        id: "py-exp-10-files-modules",
        slug: "file-io-and-python-modules",
        title: "Exp 10: File I/O & Modules (Text, CSV, Context Managers)",
        categoryId: "python-oop-files-modules",
        categoryName: "3. OOP, Exception Handling & File I/O",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Python file handling with open csv reader writer json modules",
        gfgUrl: "https://www.geeksforgeeks.org/reading-writing-files-python/",
        quickSummary: "Persist data via Context Managers (with open(...) as f), parse structured CSV records using the csv module, and utilize math, os, and random utilities.",
        keyPoints: [
          "with open(...) automatically manages __enter__ and __exit__ for leak-free file descriptor closure.",
          "csv.DictReader parses rows directly into dictionary records matching header keys.",
          "Modular architecture: Organizing reusable logic into separate .py module files."
        ],
        diagramTitle: "Context Manager File I/O Lifecycle",
        diagram: `  [ with open('data.csv', 'w') as f ] ──► (Writes Data Stream) ──► Block Exit ──► [ Auto f.close() ]`,
        complexities: [
          { operation: "File Stream Read / Write", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(buffer_size)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (CSV File Handling)",
            code: `import csv
import os

filename = "students_temp.csv"

# 1. Write CSV File
data = [
    ["ID", "Name", "GPA"],
    [101, "Alice", 3.92],
    [102, "Bob", 3.45],
    [103, "Charlie", 3.88]
]

with open(filename, mode="w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(data)
print("[✓] CSV file written successfully.")

# 2. Read with DictReader
print("=== Reading Structured CSV Records ===")
with open(filename, mode="r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"Student #{row['ID']} - {row['Name']:<10} GPA: {row['GPA']}")

os.remove(filename) # Clean up scratch file`
          }
        ],
        practiceProblems: [
          {
            title: "File Handling in Python",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/reading-writing-files-python/",
            platform: "GeeksforGeeks",
            topicTag: "File I/O"
          }
        ]
      }
    ]
  }
];
