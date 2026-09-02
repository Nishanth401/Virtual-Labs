export interface LabResourceLink {
  title: string;
  source: "GeeksforGeeks" | "W3Schools" | "Official Docs" | "TutorialsPoint";
  url: string;
  description: string;
  category: string;
}

export interface Lab {
  id: string;
  code: string;
  name: string;
  shortTitle: string;
  discipline: string;
  disciplineSlug: string;
  shortDesc: string;
  description: string;
  institute: string;
  department: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  experimentsCount: number;
  rating: number;
  ratingsCount: number;
  iconName: string;
  tags: string[];
  bannerGradient: string;
  videoUrl: string;
  semester: string;
  resources?: LabResourceLink[];
}

export interface Discipline {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  labsCount: number;
  color: string;
  accentColor: string;
}

export const DISCIPLINES_DATA: Discipline[] = [
  {
    id: "aids",
    name: "Artificial Intelligence & Data Science",
    shortName: "AI & DS",
    description: "Department core curriculum encompassing Algorithmics, Machine Intelligence, Neural Computing, Database Architectures, Operating Systems, Data Science, OOPS, Big Data, Cloud Infrastructure, and Network Protocols.",
    icon: "BrainCircuit",
    labsCount: 10,
    color: "from-blue-600/20 via-indigo-600/20 to-amber-500/20 text-blue-400",
    accentColor: "blue",
  },
];

export const LABS_DATA: Lab[] = [
  {
    id: "data-science-analytics",
    code: "AD8482",
    name: "Data Science and Analytics Laboratory",
    shortTitle: "DSAL",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Master statistical hypothesis testing (Z-test, T-test, ANOVA), NumPy/Pandas pipelines, regression, logistic models, and time series forecasting.",
    description: "The Data Science & Analytics Virtual Laboratory provides an interactive Python statistical computing suite: NumPy multi-dimensional array vectorization, Pandas DataFrame wrangling, Matplotlib visualization, descriptive variability metrics, hypothesis testing (Z-test, T-test, ANOVA), linear/logistic predictive models, and time series decomposition.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Intermediate",
    experimentsCount: 12,
    rating: 4.96,
    ratingsCount: 360,
    iconName: "BarChart3",
    tags: ["NumPy", "Pandas", "Matplotlib", "Z-Test", "ANOVA", "Regression", "Time Series"],
    bannerGradient: "from-violet-700 via-indigo-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/LHBE6Q9XlzI",
    semester: "Semester 4",
    resources: [
      {
        title: "NumPy Tutorial — Vectorized Data Processing in Python",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/numpy-tutorial/",
        description: "Multi-dimensional array slicing, matrix vectorization, broadcasting rules, and linear algebra.",
        category: "NumPy"
      },
      {
        title: "Pandas DataFrame & Data Science Complete Handbook",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/pandas-tutorial/",
        description: "DataFrames, Series manipulation, missing value imputation, grouping, and aggregations.",
        category: "Pandas"
      },
      {
        title: "Hypothesis Testing in Python (Z-test, T-test, ANOVA)",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/hypothesis-testing-in-python/",
        description: "Formulation of null/alternate hypotheses, p-value calculations, and significance testing using SciPy.",
        category: "Statistics"
      },
      {
        title: "W3Schools Python Data Science & Matplotlib Guide",
        source: "W3Schools",
        url: "https://www.w3schools.com/datascience/default.asp",
        description: "Interactive data visualization, scatter plots, normal distribution curves, and linear models.",
        category: "Interactive Data Science"
      }
    ]
  },
  {
    id: "computer-networks",
    code: "AD8581",
    name: "Computer Networks Laboratory",
    shortTitle: "CNL",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Hands-on packet sniffing (Wireshark, tcpdump), TCP/UDP socket programming, DNS resolution, ARP/RARP simulation, routing algorithms, and CRC error correction.",
    description: "Welcome to the Computer Networks Virtual Laboratory. Explore network protocol analysis using tcpdump/Wireshark, build TCP web clients and chat servers, simulate UDP DNS resolution, study ARP/RARP translation, simulate Distance Vector/Link State routing, and verify CRC error detection.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Intermediate",
    experimentsCount: 10,
    rating: 4.91,
    ratingsCount: 290,
    iconName: "Network",
    tags: ["tcpdump", "Wireshark", "TCP Sockets", "UDP DNS", "ARP/RARP", "Routing", "CRC"],
    bannerGradient: "from-amber-600 via-orange-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
    semester: "Semester 5",
    resources: [
      {
        title: "GeeksforGeeks Computer Networks Tutorial & Protocol Architecture",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/computer-network-tutorials/",
        description: "Detailed coverage of Physical, Data Link, Network, Transport, and Application layers.",
        category: "Computer Networks"
      },
      {
        title: "Socket Programming in Java & Python (TCP/UDP)",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/socket-programming-in-java/",
        description: "Client-server TCP/UDP communication using ServerSocket and DatagramPacket.",
        category: "Socket Programming"
      },
      {
        title: "Routing Algorithms: Distance Vector & Link State (Dijkstra)",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/routing-v-s-routed-protocols-in-computer-network/",
        description: "Bellman-Ford and Dijkstra shortest path routing algorithm implementation in C/Python.",
        category: "Routing"
      },
      {
        title: "W3Schools Network Protocols & TCP/IP Architecture",
        source: "W3Schools",
        url: "https://www.w3schools.com/cybersecurity/cybersecurity_network_basics.php",
        description: "Tutorial on packet routing, MAC vs IP addressing, port numbers, and socket communication.",
        category: "TCP/IP"
      }
    ]
  },
  {
    id: "ai-machine-learning",
    code: "AD8481",
    name: "Machine Learning Laboratory",
    shortTitle: "MLL",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Implement Candidate-Elimination, ID3 Decision Trees, Backpropagation ANN, Naïve Bayes text classifiers, Bayesian Networks, EM vs k-Means, k-NN, and LWR.",
    description: "The Machine Learning Virtual Laboratory provides comprehensive algorithm implementations in Python: Version space search with Candidate-Elimination, ID3 Entropy information gain decision trees, Multilayer Perceptron Backpropagation, Gaussian/Multinomial Naïve Bayes, Bayesian Network disease diagnosis, EM clustering vs k-Means, k-NN classification on Iris, and non-parametric Locally Weighted Regression.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Intermediate",
    experimentsCount: 9,
    rating: 4.94,
    ratingsCount: 395,
    iconName: "BrainCircuit",
    tags: ["Candidate-Elimination", "ID3 Trees", "Backpropagation", "Naïve Bayes", "EM vs k-Means", "k-NN", "LWR"],
    bannerGradient: "from-purple-700 via-indigo-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/aircAruvnKk",
    semester: "Semester 5",
    resources: [
      {
        title: "GeeksforGeeks Machine Learning Tutorial & Algorithms",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/machine-learning/",
        description: "End-to-end ML roadmap covering Supervised, Unsupervised, Ensemble, and Deep Learning models.",
        category: "Machine Learning"
      },
      {
        title: "Decision Tree ID3 Algorithm & Information Gain",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/decision-tree-introduction-example/",
        description: "Entropy and Information Gain calculation for categorical and continuous dataset splits.",
        category: "Decision Trees"
      },
      {
        title: "Backpropagation in Neural Networks Step-by-Step",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/backpropagation-in-neural-network/",
        description: "Gradient computation, chain rule derivation, weight update formulas in multi-layer perceptrons.",
        category: "Neural Networks"
      },
      {
        title: "W3Schools Python Machine Learning Interactive Sandbox",
        source: "W3Schools",
        url: "https://www.w3schools.com/python/python_ml_getting_started.asp",
        description: "Hands-on tutorials for Mean/Median/Mode, Standard Deviation, Linear/Polynomial Regression, and KNN.",
        category: "Machine Learning"
      }
    ]
  },
  {
    id: "operating-systems",
    code: "CS3461",
    name: "Operating Systems Laboratory",
    shortTitle: "OSL",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Simulate UNIX commands, fork()/exec() process calls, CPU scheduling (FCFS/SJF/RR), semaphores, Banker's deadlock avoidance, paging, and disk scheduling.",
    description: "The Operating Systems Virtual Laboratory offers interactive visual simulations and hands-on C/Linux implementations for OS Installation, Shell Scripting, Process Management (fork, exec, wait), CPU Scheduling (FCFS, SJF, Priority, Round Robin), IPC (Pipes, Shared Memory, Message Queues), Semaphores, Banker's Deadlock Avoidance, Deadlock Detection, POSIX Multi-threading, Paging, Dynamic Memory Allocation (First/Worst/Best Fit), Page Replacement (FIFO, LRU, Optimal), File Organization & Allocation, and Disk Scheduling (FCFS, SSTF, SCAN, C-SCAN, LOOK).",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Intermediate",
    experimentsCount: 15,
    rating: 4.93,
    ratingsCount: 342,
    iconName: "Cpu",
    tags: ["CPU Scheduling", "System Calls", "Semaphores", "Banker's Algorithm", "Paging", "Disk Scheduling"],
    bannerGradient: "from-cyan-700 via-sky-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/26QPDBe-NB8",
    semester: "Semester 4",
    resources: [
      {
        title: "GeeksforGeeks Operating Systems Tutorial — Full Course",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/operating-systems/",
        description: "Process management, threads, memory paging, deadlocks, and virtual file systems in OS.",
        category: "Operating Systems"
      },
      {
        title: "CPU Scheduling Algorithms in Operating Systems (FCFS, SJF, RR, Priority)",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/",
        description: "Gantt charts, turnaround time, waiting time, and preemptive scheduling code examples.",
        category: "CPU Scheduling"
      },
      {
        title: "Process Synchronization & Semaphores in C",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/semaphores-in-process-synchronization/",
        description: "Counting semaphores, mutex locks, and Producer-Consumer bounded buffer problem.",
        category: "Synchronization"
      },
      {
        title: "Banker's Algorithm for Deadlock Avoidance with Code Implementation",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/",
        description: "Safe state evaluation, resource allocation matrix, and request resource algorithms in C.",
        category: "Deadlocks"
      },
      {
        title: "W3Schools Linux Tutorial & Shell Command Line Guide",
        source: "W3Schools",
        url: "https://www.w3schools.com/linux/index.php",
        description: "Hands-on reference for bash commands, file system permissions, and process management.",
        category: "Linux / Shell"
      }
    ]
  },
  {
    id: "oops-java",
    code: "CS3351",
    name: "Object Oriented Programming System (Java)",
    shortTitle: "OOPS",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Master OOP principles: Classes & Objects, Encapsulation, Inheritance hierarchies, Polymorphism, Matrix traversals, Exception Handling, Collections & JDBC.",
    description: "The OOPS Java Virtual Laboratory provides hands-on mastery over core Object-Oriented paradigms: Student Grade Calculators, Banking transactions, Product Catalogs, Multi-tier Payroll calculations, OTP Authentication engines, Academic inheritance hierarchies, Recursive algorithms, Matrix & Spiral traversals, Kadane's maximum subarray sum, Custom Exception handling, Collections Framework (Streams, Lambdas), and JDBC database persistence.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Beginner",
    experimentsCount: 15,
    rating: 4.97,
    ratingsCount: 450,
    iconName: "Code2",
    tags: ["Java OOP", "Inheritance", "Polymorphism", "Recursion", "Collections", "JDBC", "Streams"],
    bannerGradient: "from-blue-700 via-indigo-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    semester: "Semester 3",
    resources: [
      {
        title: "Java OOPs Concepts Tutorial & Code Examples",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/",
        description: "Encapsulation, Inheritance, Polymorphism, Abstraction with working class diagrams in Java.",
        category: "Java OOP"
      },
      {
        title: "Java Collections Framework & Stream API Guide",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/collections-in-java-2/",
        description: "ArrayList, HashSet, HashMap, Lambda Expressions, and functional stream pipelines in Java.",
        category: "Collections"
      },
      {
        title: "Java JDBC Tutorial — Connect Java to Relational Databases",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/introduction-to-jdbc/",
        description: "DriverManager, Connection, Statement, PreparedStatement, and ResultSet execution.",
        category: "JDBC"
      },
      {
        title: "W3Schools Java Tutorial & Interactive Code Sandbox",
        source: "W3Schools",
        url: "https://www.w3schools.com/java/default.asp",
        description: "Interactive classes, methods, constructors, access modifiers, and file handling in Java.",
        category: "Interactive Java"
      }
    ]
  },
  {
    id: "data-structures",
    code: "AD8381",
    name: "Data Structures and Algorithms Laboratory",
    shortTitle: "DSAL",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Explore Singly/Doubly Linked Lists, Stacks, Queues, BSTs, AVL balancing, Tries, B-Trees, Graph traversals (BFS/DFS), Shortest Path & MST, Sorting and Hashing.",
    description: "Welcome to the Data Structures and Algorithms Laboratory. Implement 15 foundational and advanced data structures and algorithms in Java and C++: Singly/Doubly/Circular Linked Lists, Floyd's Cycle Detection, Stack Applications (Infix to Postfix), Circular & Priority Queues, BST Operations, AVL Balancing Rotations, Huffman Coding Trees, Trie, B/B+ Trees, Graph BFS/DFS, Dijkstra & Prim/Kruskal MST, Searching, Sorting (Merge/Quick Sort), and Hashing with Open Addressing & Rehashing.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Beginner",
    experimentsCount: 15,
    rating: 4.95,
    ratingsCount: 428,
    iconName: "Code2",
    tags: ["Linked Lists", "Stacks & Queues", "BST & AVL", "Trie & B-Trees", "Graphs", "Sorting & Hashing"],
    bannerGradient: "from-blue-700 via-indigo-900 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/zWg7U0OEAoE",
    semester: "Semester 3",
    resources: [
      {
        title: "DSA Tutorial — Complete Guide to Data Structures & Algorithms",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/data-structures/",
        description: "Comprehensive step-by-step documentation for linear, tree, and graph structures with Java code traces.",
        category: "Data Structures"
      },
      {
        title: "Binary Trees, BST, and AVL Self-Balancing Trees",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/",
        description: "Tree traversals, height balancing rotations (LL, RR, LR, RL), and AVL balance factor calculations.",
        category: "Trees"
      },
      {
        title: "Graph Algorithms: BFS, DFS, Dijkstra, Prim's and Kruskal's MST",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
        description: "Adjacency matrix/list structures, greedy shortest path, and minimum spanning tree routines.",
        category: "Graphs"
      },
      {
        title: "W3Schools Data Structures & Algorithms (DSA) Tutorial",
        source: "W3Schools",
        url: "https://www.w3schools.com/dsa/index.php",
        description: "Interactive visual DSA tutorials with step-by-step illustrations and online practice sandboxes.",
        category: "Interactive Tutorial"
      }
    ]
  },
  {
    id: "dbms-lab",
    code: "AD8382",
    name: "Database Management System",
    shortTitle: "DBMS",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Master DDL/DML, Set Operations, Complex Joins, Views & B-Tree indexing, PL/SQL control structures, Stored Procedures, Triggers, Exceptions, and TCL ACID transactions.",
    description: "Interactive laboratory environment for mastering relational SQL and PL/SQL: DDL schema definitions with integrity constraints, DML data manipulation and filtering, Set operations & aggregate functions, Inner/Outer Joins & correlated subqueries, Views and B-Tree indexing, PL/SQL control blocks and cursors, Parameterized stored procedures and functions, Audit logging database triggers, Custom exception handlers, and TCL transaction management (COMMIT, ROLLBACK, SAVEPOINT).",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Intermediate",
    experimentsCount: 10,
    rating: 4.88,
    ratingsCount: 312,
    iconName: "Database",
    tags: ["SQL DDL/DML", "Joins & Subqueries", "Views & Indexes", "PL/SQL", "Procedures & Triggers", "ACID TCL"],
    bannerGradient: "from-emerald-700 via-teal-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/HXV3zeRR3h4",
    semester: "Semester 3",
    resources: [
      {
        title: "GeeksforGeeks DBMS Tutorial — Complete Reference",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/dbms/",
        description: "ER Modeling, Relational Algebra, B/B+ Trees, Query Optimization, and Concurrency Control.",
        category: "DBMS Theory"
      },
      {
        title: "SQL Tutorial — From Beginner to Advanced Queries",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/sql-tutorial/",
        description: "Complete guide to DDL, DML, DCL, Window Functions, Stored Procedures, and Indexes in SQL.",
        category: "SQL"
      },
      {
        title: "PL/SQL Tutorial — Blocks, Cursors, Triggers & Procedures",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/pl-sql-introduction/",
        description: "Procedural SQL programming, explicit/implicit cursors, before/after triggers, and ACID transactions.",
        category: "PL/SQL"
      },
      {
        title: "W3Schools SQL Tutorial & Live SQL Try-It Editor",
        source: "W3Schools",
        url: "https://www.w3schools.com/sql/default.asp",
        description: "Interactive SQL queries with live database sandbox for SELECT, INSERT, UPDATE, DELETE, and JOINs.",
        category: "Interactive SQL"
      }
    ]
  },
  {
    id: "artificial-intelligence",
    code: "AI3401",
    name: "Artificial Intelligence Lab",
    shortTitle: "AIL",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Master classical heuristic search (A*, Best-First), adversarial Minimax with Alpha-Beta pruning, Constraint Satisfaction (N-Queens), and knowledge-based expert systems in Python.",
    description: "Explore core Artificial Intelligence paradigms through interactive visual search spaces: state-space graph exploration, 8-Puzzle solving with A*, game tree evaluation with Minimax & Alpha-Beta Pruning, N-Queens backtracking, and rule-based propositional logic expert reasoning.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Intermediate",
    experimentsCount: 5,
    rating: 4.96,
    ratingsCount: 410,
    iconName: "Bot",
    tags: ["A* Search", "Minimax", "Alpha-Beta Pruning", "N-Queens", "Expert Systems"],
    bannerGradient: "from-violet-700 via-purple-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/Jc7vlAzOigA",
    semester: "Semester 5",
    resources: [
      {
        title: "GeeksforGeeks Artificial Intelligence Complete Tutorial",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/artificial-intelligence-an-introduction/",
        description: "Intelligent agents, uninformed/informed search, knowledge representation, and reasoning.",
        category: "Artificial Intelligence"
      },
      {
        title: "A* Search Algorithm with Heuristic Cost Functions in Python",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/a-search-algorithm/",
        description: "Evaluation function f(n) = g(n) + h(n), Manhattan distance heuristic, and 8-puzzle solver.",
        category: "Heuristic Search"
      }
    ]
  },
  {
    id: "big-data-analytics",
    code: "CS8711",
    name: "Big Data Analytics Lab",
    shortTitle: "BDAL",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Deploy distributed MapReduce paradigms, Hadoop HDFS file architectures, PySpark DataFrame aggregations, and large-scale NoSQL analytics.",
    description: "Hands-on Big Data computing laboratory focusing on Hadoop Distributed File System (HDFS) node replication, distributed MapReduce computing workflows, Apache Spark in-memory RDD/DataFrame analytics with PySpark, Hive SQL data warehousing, and MongoDB distributed NoSQL aggregation pipelines.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Advanced",
    experimentsCount: 5,
    rating: 4.91,
    ratingsCount: 275,
    iconName: "BarChart3",
    tags: ["Hadoop HDFS", "MapReduce", "Apache Spark", "PySpark", "NoSQL MongoDB"],
    bannerGradient: "from-amber-700 via-orange-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/1vbXmCrkT3Y",
    semester: "Semester 7",
    resources: [
      {
        title: "GeeksforGeeks Big Data Tutorial — Full Architecture Guide",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/big-data-tutorial/",
        description: "Characteristics of Big Data (5 V's), distributed storage, and parallel batch processing.",
        category: "Big Data"
      }
    ]
  },
  {
    id: "cloud-service-management",
    code: "CS8811",
    name: "Cloud Service Management Lab",
    shortTitle: "CSML",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Provision scalable AWS EC2/S3 cloud infrastructure, Docker containerization, AWS Lambda serverless microservices, and Kubernetes orchestration.",
    description: "Explore modern Cloud Service Management and DevOps orchestration: automated virtual machine provisioning (AWS EC2), scalable object storage (AWS S3), containerization with Docker, event-driven serverless computing with AWS Lambda, and multi-service deployment using Kubernetes & IAM security policies.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Advanced",
    experimentsCount: 5,
    rating: 4.89,
    ratingsCount: 260,
    iconName: "Cloud",
    tags: ["AWS EC2", "AWS S3", "Docker", "AWS Lambda", "Kubernetes"],
    bannerGradient: "from-teal-700 via-cyan-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/2LaAJq1lB1Q",
    semester: "Semester 8",
    resources: [
      {
        title: "GeeksforGeeks Cloud Computing Tutorial & Architecture",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/cloud-computing/",
        description: "IaaS, PaaS, SaaS delivery models, public/private deployment models, and cloud virtualization.",
        category: "Cloud Computing"
      }
    ]
  }
];
