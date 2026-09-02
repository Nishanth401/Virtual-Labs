export interface ReferenceBook {
  id: string;
  title: string;
  author: string;
  publisher: string;
  edition: string;
  isbn?: string;
  coverColor: string;
}

export interface UniversitySyllabus {
  university: string;
  courseCode: string;
  courseTitle: string;
  semester: string;
  regulations: string;
  units: {
    unit: string;
    title: string;
    topics: string[];
  }[];
}

export const REFERENCE_BOOKS_DATA: ReferenceBook[] = [
  {
    id: "clrs",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    publisher: "MIT Press / PHI Learning",
    edition: "4th Edition (2022)",
    isbn: "978-0262046305",
    coverColor: "from-blue-600 to-indigo-800"
  },
  {
    id: "silberschatz-dbms",
    title: "Database System Concepts",
    author: "Abraham Silberschatz, Henry F. Korth, S. Sudarshan",
    publisher: "McGraw-Hill Education",
    edition: "7th Edition (2020)",
    isbn: "978-0078022159",
    coverColor: "from-emerald-600 to-teal-800"
  },
  {
    id: "silberschatz-os",
    title: "Operating System Concepts",
    author: "Abraham Silberschatz, Peter B. Galvin, Greg Gagne",
    publisher: "John Wiley & Sons",
    edition: "10th Edition (2021)",
    isbn: "978-1119800361",
    coverColor: "from-cyan-600 to-blue-800"
  },
  {
    id: "kurose-networks",
    title: "Computer Networking: A Top-Down Approach",
    author: "James F. Kurose, Keith W. Ross",
    publisher: "Pearson Education",
    edition: "8th Edition (2021)",
    isbn: "978-0136681557",
    coverColor: "from-indigo-600 to-blue-800"
  },
  {
    id: "mitchell-ml",
    title: "Machine Learning",
    author: "Tom M. Mitchell",
    publisher: "McGraw-Hill Education",
    edition: "1st Edition",
    isbn: "978-0070428072",
    coverColor: "from-violet-600 to-purple-800"
  },
  {
    id: "mckinney-python",
    title: "Python for Data Analysis: Data Wrangling with Pandas, NumPy, and Jupyter",
    author: "Wes McKinney",
    publisher: "O'Reilly Media",
    edition: "3rd Edition (2022)",
    isbn: "978-1098104030",
    coverColor: "from-amber-600 to-orange-800"
  },
  {
    id: "schildt-java",
    title: "Java: The Complete Reference",
    author: "Herbert Schildt",
    publisher: "Oracle Press / McGraw-Hill",
    edition: "12th Edition (2021)",
    isbn: "978-1260440232",
    coverColor: "from-rose-600 to-red-800"
  },
  {
    id: "kernighan-c",
    title: "The C Programming Language (ANSI C)",
    author: "Brian W. Kernighan, Dennis M. Ritchie",
    publisher: "Prentice Hall / Pearson",
    edition: "2nd Edition",
    isbn: "978-0131103627",
    coverColor: "from-cyan-600 to-blue-800"
  },
  {
    id: "lutz-python",
    title: "Learning Python: Powerful Object-Oriented Programming",
    author: "Mark Lutz",
    publisher: "O'Reilly Media",
    edition: "5th Edition",
    isbn: "978-1449355739",
    coverColor: "from-emerald-600 to-teal-800"
  },
  {
    id: "russell-norvig",
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell, Peter Norvig",
    publisher: "Pearson Education",
    edition: "4th Global Edition",
    isbn: "978-0134610993",
    coverColor: "from-purple-600 to-violet-800"
  }
];

export const SYLLABUS_MAPPINGS_DATA: UniversitySyllabus[] = [
  // 1. DATA SCIENCE AND ANALYTICS LABORATORY
  {
    university: "Anna University (Regulation 2021)",
    courseCode: "AD8482",
    courseTitle: "Data Science and Analytics Laboratory",
    semester: "Semester 4 (B.Tech AI & DS)",
    regulations: "R2021",
    units: [
      {
        unit: "Unit I",
        title: "Scientific Computing & Exploratory Data Analysis",
        topics: [
          "NumPy ndarray multi-dimensional arrays, vectorization, and linear algebra",
          "Pandas DataFrames, missing value imputation, indexing, and groupby",
          "Matplotlib visualization plots: line charts, histograms, and subplots"
        ]
      },
      {
        unit: "Unit II",
        title: "Statistical Distributions & Hypothesis Testing",
        topics: [
          "Descriptive statistics: Mean, Median, Mode, Variance, IQR, and Outliers",
          "Normal curve, Pearson correlation coefficient, and scatter plots",
          "Z-test, Student's T-test (Independent & Paired), and One-Way ANOVA"
        ]
      },
      {
        unit: "Unit III",
        title: "Predictive Modeling & Time Series Analytics",
        topics: [
          "Ordinary Least Squares Simple and Multiple Linear Regression models",
          "Binary Logistic Regression classification and ROC-AUC validation",
          "Time series additive decomposition and Augmented Dickey-Fuller stationarity"
        ]
      }
    ]
  },

  // 2. COMPUTER NETWORKS LABORATORY
  {
    university: "Anna University (Regulation 2021)",
    courseCode: "AD8581",
    courseTitle: "Computer Networks Laboratory",
    semester: "Semester 5 (B.Tech AI & DS / CSE)",
    regulations: "R2021",
    units: [
      {
        unit: "Unit I",
        title: "Network Utilities & Socket Programming",
        topics: [
          "Network CLI diagnostics: tcpdump, netstat, ifconfig, nslookup, traceroute",
          "HTTP Web client implementation over TCP streams",
          "TCP Concurrent Echo Server and Multi-Client Chat Broadcast",
          "UDP Domain Name System (DNS) simulation"
        ]
      },
      {
        unit: "Unit II",
        title: "Protocol Analysis & Network Simulation",
        topics: [
          "Wireshark packet capture and OSI layer protocol dissection",
          "ARP / RARP broadcast resolution and cache management simulation",
          "TCP Congestion Control (Slow Start, AIMD, Fast Retransmit)",
          "TCP vs UDP throughput, latency, and packet loss benchmarking"
        ]
      },
      {
        unit: "Unit III",
        title: "Routing & Error Control",
        topics: [
          "Distance Vector Routing (Bellman-Ford) and Link State Routing (Dijkstra)",
          "Cyclic Redundancy Check (CRC) modulo-2 polynomial error detection"
        ]
      }
    ]
  },

  // 3. MACHINE LEARNING LABORATORY
  {
    university: "Anna University (Regulation 2021)",
    courseCode: "AD8481",
    courseTitle: "Machine Learning Laboratory",
    semester: "Semester 4 (B.Tech AI & DS)",
    regulations: "R2021",
    units: [
      {
        unit: "Unit I",
        title: "Concept Learning & Decision Trees",
        topics: [
          "Candidate-Elimination algorithm Version Space computation",
          "ID3 Decision Tree with Shannon Entropy and Information Gain"
        ]
      },
      {
        unit: "Unit II",
        title: "Neural Networks & Probabilistic Classifiers",
        topics: [
          "Artificial Neural Network (ANN) Backpropagation gradient descent",
          "Gaussian Naïve Bayes classifier on continuous CSV attributes",
          "Multinomial Naïve Bayes document text classification and NLP metrics",
          "Bayesian Network disease diagnosis using WHO datasets"
        ]
      },
      {
        unit: "Unit III",
        title: "Clustering & Instance-Based Learning",
        topics: [
          "Expectation-Maximization (GMM) soft clustering vs hard k-Means",
          "k-Nearest Neighbors (k-NN) classification on Fisher Iris dataset",
          "Locally Weighted Regression (LWR) non-parametric curve fitting"
        ]
      }
    ]
  },

  // 4. OPERATING SYSTEMS LABORATORY
  {
    university: "Anna University (Regulation 2021)",
    courseCode: "CS3461",
    courseTitle: "Operating Systems Laboratory",
    semester: "Semester 4 (B.E / B.Tech CSE & AIDS)",
    regulations: "R2021",
    units: [
      {
        unit: "Unit I",
        title: "System Calls, Process Control & Scheduling",
        topics: [
          "UNIX Commands and Shell Programming scripts",
          "Process System Calls: fork, exec, getpid, exit, wait, close",
          "CPU Scheduling: FCFS, SJF, Priority, and Round Robin"
        ]
      },
      {
        unit: "Unit II",
        title: "Concurrency, Deadlocks & Memory Management",
        topics: [
          "Inter-Process Communication (Pipes, Shared Memory, Message Queues)",
          "Producer-Consumer problem synchronization using Semaphores and Mutex",
          "Banker's Algorithm for Deadlock Avoidance and Deadlock Detection",
          "Paging address translation and Dynamic Allocation (First/Best/Worst Fit)",
          "Page Replacement: FIFO, LRU, and Optimal algorithms"
        ]
      },
      {
        unit: "Unit III",
        title: "File Systems & Disk Scheduling",
        topics: [
          "File Organization: Single-Level, Two-Level, and Hierarchical Directory",
          "File Allocation: Sequential, Indexed, and Linked structures",
          "Disk Scheduling: FCFS, SSTF, SCAN, C-SCAN, and LOOK"
        ]
      }
    ]
  },

  // 5. OBJECT ORIENTED PROGRAMMING SYSTEM (JAVA)
  {
    university: "Anna University (Regulation 2021)",
    courseCode: "CS3351",
    courseTitle: "Object Oriented Programming System (Java)",
    semester: "Semester 3 (B.E / B.Tech CSE & AIDS)",
    regulations: "R2021",
    units: [
      {
        unit: "Unit I",
        title: "Java Fundamentals & Class Design",
        topics: [
          "Student Grade Calculator and conditional control structures",
          "Banking Application encapsulation and data hiding",
          "Product Catalog and Employee Payroll calculations",
          "Account Validation and OTP Authentication engine"
        ]
      },
      {
        unit: "Unit II",
        title: "Inheritance, Polymorphism & 2D Arrays",
        topics: [
          "Single, Multilevel, and Hierarchical inheritance (Employee/Manager/Dev)",
          "Academic Person, Student, and Teacher class hierarchies",
          "Recursive algorithms and Method Overloading compile-time polymorphism",
          "2D Matrix Manipulation (Addition, Multiplication, Transpose)",
          "2D Matrix Spiral and Boundary Traversals"
        ]
      },
      {
        unit: "Unit III",
        title: "Algorithms, Collections & Database Persistence",
        topics: [
          "String Anagram checking and Kadane's Maximum Subarray Sum",
          "Exception Handling (custom exceptions) and File I/O Streams",
          "Java Collections Framework (ArrayList, HashMap, Set) and Stream API",
          "Java Database Connectivity (JDBC) PreparedStatement CRUD"
        ]
      }
    ]
  },

  // 6. DATA STRUCTURES AND ALGORITHMS LABORATORY
  {
    university: "Anna University (Regulation 2021)",
    courseCode: "AD8381",
    courseTitle: "Data Structures and Algorithms Laboratory",
    semester: "Semester 3 (B.E / B.Tech CSE & AIDS)",
    regulations: "R2021",
    units: [
      {
        unit: "Unit I",
        title: "Linear Data Structures & Applications",
        topics: [
          "Singly, Doubly, and Circular Linked Lists operations",
          "Linked List Applications: Reversal, Floyd's Cycle Detection, and Merge",
          "Stack ADT: Array/Linked implementations, Infix to Postfix, Valid Parentheses",
          "Queue ADT: Circular Queue, Priority Queue, and Monotonic Deque"
        ]
      },
      {
        unit: "Unit II",
        title: "Hierarchical Search Trees & Graphs",
        topics: [
          "Binary Search Tree (BST) insertion, deletion, and inorder traversal",
          "AVL Tree self-balancing single and double rotations",
          "Advanced Trees: Lowest Common Ancestor (LCA), Huffman Coding, Trie Prefix Tree",
          "Multi-way B-Trees and B+ Trees for disk block indexing",
          "Graph representations (Adjacency List) and Traversals (BFS & DFS)",
          "Shortest Path (Dijkstra) and Minimum Spanning Trees (Prim's & Kruskal's)"
        ]
      },
      {
        unit: "Unit III",
        title: "Searching, Sorting & Hashing",
        topics: [
          "Linear Search vs Binary Search interval bisection",
          "Bubble Sort, Merge Sort, and Quick Sort comparative analysis",
          "Hash Tables: Separate Chaining, Open Addressing, and Dynamic Rehashing"
        ]
      }
    ]
  },

  // 7. DATABASE MANAGEMENT SYSTEM
  {
    university: "Anna University (Regulation 2021)",
    courseCode: "AD8382",
    courseTitle: "Database Management System Laboratory",
    semester: "Semester 3 (B.E / B.Tech CSE & AIDS)",
    regulations: "R2021",
    units: [
      {
        unit: "Unit I",
        title: "Relational Schemas, DDL & DML",
        topics: [
          "DDL Schema Management: CREATE, ALTER, DROP, and Constraints",
          "DML Queries: INSERT, UPDATE, DELETE, and SELECT filtering with GROUP BY",
          "Set Operations (UNION, INTERSECT, MINUS) and Aggregate Functions"
        ]
      },
      {
        unit: "Unit II",
        title: "Joins, Views & Index Optimization",
        topics: [
          "Complex Multi-Table Joins (Inner, Left, Right) and Correlated Subqueries",
          "Database Views for security abstraction and B-Tree Index optimization plans"
        ]
      },
      {
        unit: "Unit III",
        title: "PL/SQL Programming, Triggers & ACID Transactions",
        topics: [
          "PL/SQL Fundamentals: Loops, Control Structures, and Explicit Cursors",
          "Stored Procedures and Functions with IN/OUT parameter modes",
          "Database Triggers for automated row-level audit logging",
          "Predefined and User-Defined Exception Handling in PL/SQL",
          "Transaction Control Language (TCL): COMMIT, ROLLBACK, and SAVEPOINT ACID"
        ]
      }
    ]
  },

  // 8. C PROGRAMMING LABORATORY
  {
    university: "Anna University (Regulation 2021)",
    courseCode: "CS3151",
    courseTitle: "C Programming Laboratory",
    semester: "Semester 1 (B.E / B.Tech All Branches)",
    regulations: "R2021",
    units: [
      {
        unit: "Unit I",
        title: "I/O, Operators & Control Flow",
        topics: [
          "Data types, format specifiers (%d, %f, %c, %lf), and formatted console I/O",
          "Decision Making: if-else ladders, switch-case, leap year and quadratic roots",
          "Iterative Loops: for, while, do-while, prime checking, and nested star pyramids"
        ]
      },
      {
        unit: "Unit II",
        title: "Arrays, Strings & Modular Functions",
        topics: [
          "1D Arrays: min, max, average statistics, and Linear Search",
          "2D Arrays: matrix addition, multiplication, and diagonal sum",
          "Strings: null-terminated character buffers, custom strlen/strcpy, and palindromes",
          "Functions: pass-by-value vs pass-by-reference pointers, factorial, and Euclidean GCD"
        ]
      },
      {
        unit: "Unit III",
        title: "Pointers, Structures & File Streams",
        topics: [
          "Pointers: pointer arithmetic, malloc, calloc, realloc, and free memory management",
          "Structures & Unions: typedef student databases and memory footprint analysis",
          "File Handling: fopen, fprintf, fscanf, fclose, and preprocessor macros"
        ]
      }
    ]
  },

  // 9. PYTHON PROGRAMMING LABORATORY
  {
    university: "Anna University (Regulation 2021)",
    courseCode: "GE3171",
    courseTitle: "Problem Solving and Python Programming Laboratory",
    semester: "Semester 1 (B.E / B.Tech All Branches)",
    regulations: "R2021",
    units: [
      {
        unit: "Unit I",
        title: "Python Foundations, Conditionals & Functions",
        topics: [
          "Dynamic typing, numeric objects, boolean logic, and formatted f-strings",
          "Control flow: if-elif-else, range-based for loops, while, and Armstrong numbers",
          "Functions: *args, **kwargs, lambda expressions, and recursive Fibonacci"
        ]
      },
      {
        unit: "Unit II",
        title: "Strings, Collections & Comprehensions",
        topics: [
          "Strings: extended step slicing [::-1], strip/split/join, and anagram checks",
          "Lists: dynamic arrays, 2D matrix transposition, and list comprehensions",
          "Tuples & Sets: immutability, union, intersection, and set difference",
          "Dictionaries: hash map key-value pairs, word frequency counts, and sorting"
        ]
      },
      {
        unit: "Unit III",
        title: "OOP, Exceptions & File I/O",
        topics: [
          "Object-Oriented Programming: classes, __init__, inheritance, super(), and dunder methods",
          "Exception Handling: try-except-else-finally blocks and custom exception classes",
          "File I/O & Modules: with open context managers, CSV parsing with DictReader"
        ]
      }
    ]
  }
];
