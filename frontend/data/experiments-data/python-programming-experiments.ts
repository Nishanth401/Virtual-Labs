import { Experiment } from "../experiments";

export const PYTHON_PROGRAMMING_EXPERIMENTS: Experiment[] = [
  {
    id: "py-exp-1",
    labId: "python-programming",
    title: "Exp 1: Python Basics, Dynamic Typing & Operators: Numeric types, Boolean logic, formatted f-strings",
    slug: "python-basics-data-types-operators",
    difficulty: "Beginner",
    category: "Python Programming" as any,
    estimatedMinutes: 20,
    rating: 4.92,
    ratingsCount: 135,
    simulator: "custom",
    quizId: "quiz-py-1",
    sections: {
      introduction: "Python is a high-level dynamically typed language with clean syntax, arbitrary precision integers, and rich string interpolation.",
      objective: "Explore Python variables, dynamic typing, numeric objects, arithmetic/bitwise operators, and formatted f-strings.",
      videoUrl: "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
      videoTitle: "Python Programming Full Course",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Basic Logic", "Computer Basics"],
      theory: {
        overview: "Python variables reference objects allocated on the heap. Dynamic typing binds types at runtime. Formatted f-strings (f\"{var:.2f}\") provide fast and readable string interpolation.",
        keyConcepts: [
          { title: "Dynamic Typing", desc: "Variables hold references to heap objects without type declarations." },
          { title: "Arbitrary Precision Ints", desc: "Python 3 seamlessly handles very large integers without overflow." },
          { title: "f-Strings", desc: "Evaluates embedded Python expressions at runtime inside string literals." }
        ],
        complexities: [
          { operation: "Variable Binding", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Data science scripting and automation pipelines",
          "Web application backend engineering (Django, FastAPI)",
          "Artificial Intelligence and Machine Learning prototyping"
        ]
      },
      procedure: [
        "1. Open Python interactive environment or .py script.",
        "2. Declare string, integer, float, and boolean variables.",
        "3. Perform arithmetic and logical operations.",
        "4. Print formatted output using f-strings."
      ],
      sampleCode: {
        language: "python",
        code: `# Dynamic Variable Assignment
student_name = "Kavya"
marks = [95, 88, 92]
average = sum(marks) / len(marks)
is_distinction = average >= 90.0

print(f"Student: {student_name}")
print(f"Average: {average:.2f}% | Distinction: {is_distinction}")
print(f"Data types -> name: {type(student_name).__name__}, avg: {type(average).__name__}")`
      },
      expectedOutput: `Student: Kavya
Average: 91.67% | Distinction: True
Data types -> name: str, avg: float`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "py-exp-2",
    labId: "python-programming",
    title: "Exp 2: Control Structures & Loops: if-elif-else, for, while, Armstrong numbers, and Prime generation",
    slug: "control-structures-and-loops-armstrong-prime",
    difficulty: "Beginner",
    category: "Python Programming" as any,
    estimatedMinutes: 25,
    rating: 4.93,
    ratingsCount: 140,
    simulator: "custom",
    quizId: "quiz-py-2",
    sections: {
      introduction: "Python control structures utilize clean indentation blocks for conditionals (if-elif-else) and iteration (for, while).",
      objective: "Implement Armstrong number verification, prime number generators, and loop control statements (break, continue).",
      videoUrl: "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
      videoTitle: "Python Loops and Conditionals",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Python Basics", "Operators"],
      theory: {
        overview: "An Armstrong number equals the sum of its own digits each raised to the power of the number of digits. for-else blocks execute when a loop finishes without hitting a break.",
        keyConcepts: [
          { title: "Indentation Scoping", desc: "Python replaces curly braces with 4-space indentation for code blocks." },
          { title: "Armstrong Validation", desc: "sum(int(d)**len(s) for d in str(n)) == n." },
          { title: "range() Generator", desc: "Generates integer arithmetic progressions on demand." }
        ],
        complexities: [
          { operation: "Armstrong Check", best: "O(digits)", avg: "O(log10 n)", worst: "O(log10 n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Data validation and business rule filtering",
          "Automated retry loops in API network clients",
          "Number-theoretic algorithm simulations"
        ]
      },
      procedure: [
        "1. Write is_armstrong(num) function using string conversion and list sum.",
        "2. Write get_primes(n) using range and all() condition.",
        "3. Test functions and print outputs."
      ],
      sampleCode: {
        language: "python",
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
print(f"370 is Armstrong? {is_armstrong(370)}")
print(f"Prime numbers up to 25: {get_primes(25)}")`
      },
      expectedOutput: `153 is Armstrong? True
370 is Armstrong? True
Prime numbers up to 25: [2, 3, 5, 7, 11, 13, 17, 19, 23]`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "py-exp-3",
    labId: "python-programming",
    title: "Exp 3: Functions, Lambda Expressions & Recursion: *args, **kwargs, map, filter, recursive Fibonacci",
    slug: "functions-lambda-expressions-and-recursion",
    difficulty: "Intermediate",
    category: "Python Programming" as any,
    estimatedMinutes: 25,
    rating: 4.95,
    ratingsCount: 145,
    simulator: "custom",
    quizId: "quiz-py-3",
    sections: {
      introduction: "Python functions are first-class objects supporting variable argument packing (*args, **kwargs) and anonymous inline lambda expressions.",
      objective: "Write reusable functions with *args/**kwargs, map/filter lambda pipelines, and recursive Fibonacci algorithms.",
      videoUrl: "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
      videoTitle: "Python Functions and Lambdas",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Control Flow", "Data Types"],
      theory: {
        overview: "*args gathers extra positional arguments into a tuple; **kwargs collects extra keyword parameters into a dictionary. lambda parameters: expr creates anonymous one-line callable functions.",
        keyConcepts: [
          { title: "*args and **kwargs", desc: "Flexible function parameter packing and forwarding." },
          { title: "Anonymous Lambdas", desc: "Inline callable functions used with map, filter, and sorted." },
          { title: "First-Class Functions", desc: "Functions can be passed as arguments and returned from other functions." }
        ],
        complexities: [
          { operation: "Lambda Call", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Middleware decorators and request handlers in web frameworks",
          "Functional data transformations in ETL pipelines",
          "Event callback architectures in GUI applications"
        ]
      },
      procedure: [
        "1. Define flexible function accepting user_id, *skills, **metadata.",
        "2. Apply filter() and map() with lambda on integer lists.",
        "3. Print results."
      ],
      sampleCode: {
        language: "python",
        code: `def build_profile(user_id, *skills, **metadata):
    return {
        "id": user_id,
        "skills": list(skills),
        "details": metadata
    }

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens_squared = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, numbers)))

print("Profile:", build_profile(101, "Python", "NumPy", "SQL", role="Analyst", dept="AIDS"))
print("Evens Squared:", evens_squared)`
      },
      expectedOutput: `Profile: {'id': 101, 'skills': ['Python', 'NumPy', 'SQL'], 'details': {'role': 'Analyst', 'dept': 'AIDS'}}
Evens Squared: [4, 16, 36, 64, 100]`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "py-exp-4",
    labId: "python-programming",
    title: "Exp 4: Strings & Slicing Operations: Extended slicing [::-1], string methods, and Anagram verification",
    slug: "strings-and-slicing-operations",
    difficulty: "Beginner",
    category: "Python Programming" as any,
    estimatedMinutes: 25,
    rating: 4.90,
    ratingsCount: 125,
    simulator: "custom",
    quizId: "quiz-py-4",
    sections: {
      introduction: "Python strings are immutable sequences of Unicode characters supporting powerful slicing syntax and built-in text processing methods.",
      objective: "Master step slicing [start:stop:step], text cleanup with strip/split/join, and anagram frequency checking.",
      videoUrl: "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
      videoTitle: "Strings in Python",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Python Basics", "Sequences"],
      theory: {
        overview: "Strings cannot be modified in-place; all transformation methods return new string objects. Extended slicing s[start:stop:step] extracts sub-sequences; s[::-1] generates a reversed string in O(n) time.",
        keyConcepts: [
          { title: "Extended Step Slicing", desc: "s[::2] extracts every 2nd character; s[::-1] reverses." },
          { title: "Immutable Sequences", desc: "Thread-safe and hashable as dictionary keys." },
          { title: "Anagram Frequency", desc: "Two strings with identical character counts are valid anagrams." }
        ],
        complexities: [
          { operation: "String Slicing [::step]", best: "O(k)", avg: "O(k)", worst: "O(k)", space: "O(k)" },
          { operation: "Anagram Verification", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(distinct_chars)" }
        ],
        realWorldApplications: [
          "Natural language text preprocessing and tokenization",
          "URL slugification and string sanitization",
          "Bioinformatics DNA sequence pattern analysis"
        ]
      },
      procedure: [
        "1. Write is_anagram(s1, s2) comparing character frequency collections.",
        "2. Clean whitespace using strip().",
        "3. Create kebab-case slug using split() and join().",
        "4. Print outputs."
      ],
      sampleCode: {
        language: "python",
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
      },
      expectedOutput: `Cleaned Text: 'Virtual Labs Python Programming'
Reversed: 'gnimmargorP nohtyP sbaL lautriV'
Kebab Case: virtual-labs-python-programming
Is 'listen' & 'silent' Anagram? True`,
      leetcodeProblems: [
        {
          id: 32,
          title: "Valid Anagram (LeetCode #242)",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/valid-anagram/",
          description: "Determine if two strings are anagrams of each other.",
          approach: "Character frequency counting with hash map or Counter.",
          javaSnippet: `# Python Solution`
        }
      ],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "py-exp-5",
    labId: "python-programming",
    title: "Exp 5: Lists & List Comprehensions: 2D Matrix Transposition, Filtering, and Sorting",
    slug: "lists-and-list-comprehensions",
    difficulty: "Beginner",
    category: "Python Programming" as any,
    estimatedMinutes: 25,
    rating: 4.94,
    ratingsCount: 140,
    simulator: "custom",
    quizId: "quiz-py-5",
    sections: {
      introduction: "Python lists are mutable dynamic arrays supporting heterogenous elements, slicing, and declarative list comprehensions.",
      objective: "Construct 2D matrix representations, perform in-place transposition with list comprehensions, and execute conditional filtering.",
      videoUrl: "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
      videoTitle: "Python Lists and Comprehensions",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Python Basics", "Loops"],
      theory: {
        overview: "Python lists over-allocate memory buffers to achieve amortized O(1) appends. List comprehensions provide clean syntax executed at C-level loop speeds.",
        keyConcepts: [
          { title: "Dynamic Array Growth", desc: "Amortized O(1) append; O(n) insert/delete at arbitrary positions." },
          { title: "List Comprehension", desc: "[expr for item in iterable if condition]." },
          { title: "Matrix Transpose", desc: "[[row[i] for row in matrix] for i in range(cols)]." }
        ],
        complexities: [
          { operation: "Append / Pop End", best: "O(1)", avg: "O(1)", worst: "O(n resize)", space: "O(1)" },
          { operation: "List Comprehension", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n output)" }
        ],
        realWorldApplications: [
          "Data science feature vector transformations",
          "Image pixel grid matrix manipulations",
          "Dynamic item filtering in web storefronts"
        ]
      },
      procedure: [
        "1. Declare 3x3 2D matrix list.",
        "2. Write nested list comprehension to transpose matrix.",
        "3. Filter and curve student exam scores.",
        "4. Print outputs."
      ],
      sampleCode: {
        language: "python",
        code: `matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
transpose = [[row[i] for row in matrix] for i in range(len(matrix[0]))]

scores = [45, 88, 92, 67, 34, 99, 78]
passed_curved = [min(100, s + 5) for s in scores if s >= 50]

print("Original Matrix:", matrix)
print("Transposed Matrix:", transpose)
print("Curved Passing Scores:", passed_curved)`
      },
      expectedOutput: `Original Matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Transposed Matrix: [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
Curved Passing Scores: [93, 97, 72, 100, 83]`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "py-exp-6",
    labId: "python-programming",
    title: "Exp 6: Tuples & Sets: Immutability, Set Theory Operations (Union, Intersection, Difference)",
    slug: "tuples-and-sets-mathematical-operations",
    difficulty: "Beginner",
    category: "Python Programming" as any,
    estimatedMinutes: 25,
    rating: 4.91,
    ratingsCount: 130,
    simulator: "custom",
    quizId: "quiz-py-6",
    sections: {
      introduction: "Tuples provide immutable fixed sequences, while Sets provide unique unordered elements with O(1) hash lookups and set algebra.",
      objective: "Master tuple packing/unpacking and execute mathematical set operations (union, intersection, difference).",
      videoUrl: "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
      videoTitle: "Tuples and Sets in Python",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Data Types", "Lists"],
      theory: {
        overview: "Tuples cannot be altered after creation, making them safe dictionary keys. Sets are implemented via hash tables, eliminating duplicates and enabling fast O(1) membership checks.",
        keyConcepts: [
          { title: "Tuple Immutability", desc: "Guarantees integrity of constant records across functions." },
          { title: "Set Operators", desc: "| (Union), & (Intersection), - (Difference), ^ (Symmetric Difference)." },
          { title: "O(1) Hash Membership", desc: "x in set checks key hash in average constant time." }
        ],
        complexities: [
          { operation: "Set Membership (x in s)", best: "O(1)", avg: "O(1)", worst: "O(n)", space: "O(1)" },
          { operation: "Set Union / Intersection", best: "O(len(A))", avg: "O(len(A) + len(B))", worst: "O(n*m)", space: "O(n + m)" }
        ],
        realWorldApplications: [
          "Deduplicating large customer email lists",
          "Permission role authorization checking",
          "Geo-spatial coordinate pairs as immutable tuple keys"
        ]
      },
      procedure: [
        "1. Unpack 3D coordinate tuple.",
        "2. Create two sets of students enrolled in different labs.",
        "3. Execute intersection, union, and difference operators.",
        "4. Print outputs."
      ],
      sampleCode: {
        language: "python",
        code: `point_3d = (10, 20, 30)
x, y, z = point_3d

lab_ai_students = {"Alice", "Bob", "Charlie", "Diana"}
lab_ds_students = {"Charlie", "Diana", "Evan", "Frank"}

common_students = lab_ai_students & lab_ds_students
all_students = lab_ai_students | lab_ds_students
ai_only_students = lab_ai_students - lab_ds_students

print(f"Point 3D Coordinates: x={x}, y={y}, z={z}")
print(f"Common in Both Labs: {common_students}")
print(f"Total Unique Students: {all_students}")
print(f"AI Lab Only: {ai_only_students}")`
      },
      expectedOutput: `Point 3D Coordinates: x=10, y=20, z=30
Common in Both Labs: {'Charlie', 'Diana'}
Total Unique Students: {'Diana', 'Alice', 'Evan', 'Bob', 'Frank', 'Charlie'}
AI Lab Only: {'Alice', 'Bob'}`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "py-exp-7",
    labId: "python-programming",
    title: "Exp 7: Dictionaries & Dict Comprehensions: Word counting, nested mappings, and sorting by value",
    slug: "dictionaries-and-dictionary-comprehensions",
    difficulty: "Intermediate",
    category: "Python Programming" as any,
    estimatedMinutes: 25,
    rating: 4.93,
    ratingsCount: 135,
    simulator: "custom",
    quizId: "quiz-py-7",
    sections: {
      introduction: "Python dictionaries store key-value associations backed by hash tables with average O(1) lookups and insertion order preservation.",
      objective: "Build a word frequency counter, filter entries using dictionary comprehensions, and sort dictionaries by value.",
      videoUrl: "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
      videoTitle: "Dictionaries in Python",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Data Types", "Loops"],
      theory: {
        overview: "Dictionaries hash keys to slot buckets in memory. d.get(k, default) handles missing keys safely. Dictionary comprehensions construct filtered or inverted mappings concisely.",
        keyConcepts: [
          { title: "Hash Table Backend", desc: "Provides average O(1) search, insert, and delete operations." },
          { title: "Dict Comprehension", desc: "{k: v for k, v in d.items() if condition}." },
          { title: "Sorting by Value", desc: "sorted(d.items(), key=lambda x: x[1], reverse=True)." }
        ],
        complexities: [
          { operation: "Dictionary get / put", best: "O(1)", avg: "O(1)", worst: "O(n)", space: "O(n)" }
        ],
        realWorldApplications: [
          "JSON payload serialization in REST APIs",
          "In-memory caching and memoization tables",
          "Word frequency histograms in NLP search engines"
        ]
      },
      procedure: [
        "1. Split sentence into words and count frequencies using a dictionary.",
        "2. Filter words with frequency >= 2 using dict comprehension.",
        "3. Sort dictionary descending by value.",
        "4. Print outputs."
      ],
      sampleCode: {
        language: "python",
        code: `sentence = "apple banana apple orange banana apple grapes"
word_counts = {}
for word in sentence.split():
    word_counts[word] = word_counts.get(word, 0) + 1

frequent_words = {k: v for k, v in word_counts.items() if v >= 2}
sorted_by_freq = dict(sorted(word_counts.items(), key=lambda item: item[1], reverse=True))

print("Word Frequencies:", word_counts)
print("Frequent Words (>=2):", frequent_words)
print("Sorted by Frequency:", sorted_by_freq)`
      },
      expectedOutput: `Word Frequencies: {'apple': 3, 'banana': 2, 'orange': 1, 'grapes': 1}
Frequent Words (>=2): {'apple': 3, 'banana': 2}
Sorted by Frequency: {'apple': 3, 'banana': 2, 'orange': 1, 'grapes': 1}`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "py-exp-8",
    labId: "python-programming",
    title: "Exp 8: Object Oriented Programming (OOP) in Python: Classes, Inheritance, super(), and Dunder methods",
    slug: "object-oriented-programming-in-python",
    difficulty: "Intermediate",
    category: "Python Programming" as any,
    estimatedMinutes: 30,
    rating: 4.96,
    ratingsCount: 150,
    simulator: "custom",
    quizId: "quiz-py-8",
    sections: {
      introduction: "Python OOP combines encapsulation, inheritance, polymorphism, and magic dunder methods (__init__, __str__).",
      objective: "Build BankAccount and SavingsAccount class hierarchies with constructor chaining via super() and custom string representations.",
      videoUrl: "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
      videoTitle: "Object Oriented Programming in Python",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Functions", "OOP Concepts"],
      theory: {
        overview: "Class defines the entity blueprint; __init__(self, ...) initializes object instance variables. super() invokes base class methods. Dunder __str__ customizes human-readable print output.",
        keyConcepts: [
          { title: "__init__ Constructor", desc: "Initializes instance state on heap object creation." },
          { title: "Inheritance & super()", desc: "Extends parent class functionality without code duplication." },
          { title: "Dunder Methods", desc: "Special double-underscore methods that integrate with Python built-ins." }
        ],
        complexities: [
          { operation: "Method Resolution (MRO)", best: "O(1)", avg: "O(1)", worst: "O(depth)", space: "O(instance_dict)" }
        ],
        realWorldApplications: [
          "Enterprise backend domain models and ORM entities (SQLAlchemy)",
          "Game character and physics object state hierarchies",
          "Machine learning custom PyTorch / Scikit-Learn estimator classes"
        ]
      },
      procedure: [
        "1. Define BankAccount base class with deposit() and __str__().",
        "2. Define SavingsAccount inheriting from BankAccount.",
        "3. Invoke super().__init__() and add apply_interest() method.",
        "4. Instantiate object and test methods."
      ],
      sampleCode: {
        language: "python",
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
      },
      expectedOutput: `BankAccount[VSB-901] Alice: $1590.00`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "py-exp-9",
    labId: "python-programming",
    title: "Exp 9: Exception Handling & Custom Exceptions: try, except, else, finally blocks and custom error types",
    slug: "exception-handling-and-custom-exceptions",
    difficulty: "Intermediate",
    category: "Python Programming" as any,
    estimatedMinutes: 25,
    rating: 4.92,
    ratingsCount: 125,
    simulator: "custom",
    quizId: "quiz-py-9",
    sections: {
      introduction: "Python structured exception handling prevents catastrophic application crashes by gracefully catching runtime errors.",
      objective: "Implement try-except-else-finally blocks, catch built-in errors, and raise custom user-defined domain exceptions.",
      videoUrl: "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
      videoTitle: "Exception Handling in Python",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Python Basics", "Functions"],
      theory: {
        overview: "When an exception occurs, Python unwinds the call stack searching for matching except handlers. else executes only if no exception occurred; finally guarantees execution for resource cleanup.",
        keyConcepts: [
          { title: "try-except Block", desc: "Catches and handles expected or unexpected runtime faults." },
          { title: "Custom Exception Class", desc: "Subclasses Exception to provide domain-specific error messaging." },
          { title: "Guaranteed finally Cleanup", desc: "Executes regardless of whether exceptions were raised or caught." }
        ],
        complexities: [
          { operation: "Exception Handling", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Robust network API error response generation",
          "Database connection recovery and transaction rollback",
          "File stream resource leak prevention"
        ]
      },
      procedure: [
        "1. Define class InsufficientFundsError(Exception).",
        "2. Write withdraw function that raises InsufficientFundsError.",
        "3. Wrap call in try-except-finally block.",
        "4. Print outputs."
      ],
      sampleCode: {
        language: "python",
        code: `class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        super().__init__(f"Attempted to withdraw \${amount}, but balance is only \${balance}!")

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(balance, amount)
    return balance - amount

try:
    current_bal = 200.0
    print("Initiating withdrawal of $350...")
    current_bal = withdraw(current_bal, 350.0)
except InsufficientFundsError as e:
    print(f"[CAUGHT CUSTOM EXCEPTION]: {e}")
finally:
    print("Session cleanup finalized.")`
      },
      expectedOutput: `Initiating withdrawal of $350...
[CAUGHT CUSTOM EXCEPTION]: Attempted to withdraw $350.0, but balance is only $200.0!
Session cleanup finalized.`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "py-exp-10",
    labId: "python-programming",
    title: "Exp 10: File I/O & Modules: Text/CSV files, Context Managers (with open), and Standard Library utilities",
    slug: "file-io-and-python-modules",
    difficulty: "Intermediate",
    category: "Python Programming" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 145,
    simulator: "custom",
    quizId: "quiz-py-10",
    sections: {
      introduction: "Python File I/O utilizes Context Managers for leak-free file streaming, integrated with standard library CSV and JSON parsers.",
      objective: "Write and read structured CSV records using with open(...) and csv.DictReader.",
      videoUrl: "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
      videoTitle: "File Handling in Python",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Python Basics", "Exception Handling"],
      theory: {
        overview: "The with open(...) statement employs Python's Context Manager protocol (__enter__ and __exit__), automatically closing file descriptors even if exceptions occur.",
        keyConcepts: [
          { title: "Context Manager with", desc: "Guarantees deterministic resource cleanup on block exit." },
          { title: "csv.DictReader", desc: "Maps CSV row records directly to column-keyed dictionaries." },
          { title: "Modular Code Organization", desc: "Importing helper modules across project files." }
        ],
        complexities: [
          { operation: "File Read / Write Stream", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(buffer_size)" }
        ],
        realWorldApplications: [
          "Data ingestion in analytics and machine learning pipelines",
          "Automated CSV / Excel business report generation",
          "Configuration file loading and parsing"
        ]
      },
      procedure: [
        "1. Write student records to CSV file using csv.writer.",
        "2. Read structured rows using csv.DictReader.",
        "3. Print records and clean up file."
      ],
      sampleCode: {
        language: "python",
        code: `import csv
import os

filename = "students_temp.csv"

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

print("=== Reading Structured CSV Records ===")
with open(filename, mode="r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"Student #{row['ID']} - {row['Name']:<10} GPA: {row['GPA']}")

os.remove(filename)`
      },
      expectedOutput: `[✓] CSV file written successfully.
=== Reading Structured CSV Records ===
Student #101 - Alice      GPA: 3.92
Student #102 - Bob        GPA: 3.45
Student #103 - Charlie    GPA: 3.88`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.E / B.Tech First Year Engineering"],
        pg: ["MCA"]
      }
    }
  }
];
