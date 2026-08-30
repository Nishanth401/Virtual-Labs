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
    description: "Department core curriculum encompassing Algorithmics, Machine Intelligence, Neural Computing, Database Architectures, Operating Systems, Big Data, Cloud Infrastructure, and Network Protocols.",
    icon: "BrainCircuit",
    labsCount: 8,
    color: "from-blue-600/20 via-indigo-600/20 to-amber-500/20 text-blue-400",
    accentColor: "blue",
  },
];

export const LABS_DATA: Lab[] = [
  {
    id: "data-structures",
    code: "AD8381",
    name: "Data Structures & Algorithms Lab",
    shortTitle: "DSL",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Master fundamental linear and non-linear data structures, recursive call traces, and asymptotic algorithm performance in pure Java.",
    description: "Welcome to the Data Structures & Algorithms Lab. This laboratory provides hands-on visual simulations for Arrays, Stacks, Queues, Singly Linked Lists, Sorting Algorithms (Bubble, Selection, Insertion), Trees, Recursion Call Stack inspection, and LeetCode problem solving in Java.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Beginner",
    experimentsCount: 6,
    rating: 4.95,
    ratingsCount: 428,
    iconName: "Code2",
    tags: ["Java", "Recursion", "Stacks & Queues", "Sorting", "LeetCode"],
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
        title: "Java Data Structures Handbook & Collections Framework",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/java-data-structures/",
        description: "Deep dive into ArrayList, LinkedList, Stack, Queue, and HashMap class implementations in Java.",
        category: "Java Programming"
      },
      {
        title: "Sorting Algorithms Comprehensive Guide & Complexity Analysis",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/sorting-algorithms/",
        description: "Comparative visual walkthrough of Bubble Sort, Insertion Sort, Selection Sort, Quick Sort, and Merge Sort.",
        category: "Algorithms"
      },
      {
        title: "W3Schools Data Structures & Algorithms (DSA) Tutorial",
        source: "W3Schools",
        url: "https://www.w3schools.com/dsa/index.php",
        description: "Interactive visual DSA tutorials with step-by-step illustrations and online practice sandboxes.",
        category: "Interactive Tutorial"
      },
      {
        title: "W3Schools Java Data Structures & Collections Guide",
        source: "W3Schools",
        url: "https://www.w3schools.com/java/java_data_structures.asp",
        description: "Beginner-friendly interactive lessons covering Java arrays, linked lists, queues, and sets.",
        category: "Java Reference"
      },
      {
        title: "W3Schools Java Recursion & Call Stack Execution",
        source: "W3Schools",
        url: "https://www.w3schools.com/java/java_recursion.asp",
        description: "Interactive tutorial on base cases, recursive breakdowns, and memory call stack lifecycles.",
        category: "Recursion"
      }
    ]
  },
  {
    id: "ai-machine-learning",
    code: "AD8481",
    name: "Machine Learning & Deep Learning Lab",
    shortTitle: "MLDL",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Implement supervised/unsupervised machine learning models, neural networks, loss minimization, and prerequisite NumPy/Pandas pipelines.",
    description: "Explore the end-to-end Machine Learning pipeline starting with prerequisite NumPy/Pandas modules, followed by Linear Regression, Logistic Regression, KNN Classifier, Decision Trees, K-Means Clustering, and Multi-Layer Perceptron Backpropagation.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Intermediate",
    experimentsCount: 6,
    rating: 4.92,
    ratingsCount: 384,
    iconName: "BrainCircuit",
    tags: ["NumPy", "Pandas", "Scikit-Learn", "Neural Networks", "Gradient Descent"],
    bannerGradient: "from-purple-700 via-indigo-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/aircAruvnKk",
    semester: "Semester 4 & 5",
    resources: [
      {
        title: "GeeksforGeeks Machine Learning Tutorial & Algorithms",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/machine-learning/",
        description: "End-to-end ML roadmap covering Supervised, Unsupervised, Ensemble, and Deep Learning models.",
        category: "Machine Learning"
      },
      {
        title: "NumPy Tutorial with 100+ Python Exercises & Code Traces",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/numpy-tutorial/",
        description: "Multi-dimensional array slicing, matrix vectorization, broadcasting rules, and linear algebra.",
        category: "NumPy"
      },
      {
        title: "Pandas Data Wrangling & Feature Engineering Handbook",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/pandas-tutorial/",
        description: "DataFrames, Series manipulation, missing value imputation, grouping, and aggregations.",
        category: "Pandas"
      },
      {
        title: "W3Schools Python Machine Learning Tutorial & Interactive Sandbox",
        source: "W3Schools",
        url: "https://www.w3schools.com/python/python_ml_getting_started.asp",
        description: "Hands-on tutorials for Mean/Median/Mode, Standard Deviation, Linear/Polynomial Regression, and KNN.",
        category: "Machine Learning"
      },
      {
        title: "W3Schools Python NumPy Tutorial",
        source: "W3Schools",
        url: "https://www.w3schools.com/python/numpy/default.asp",
        description: "Interactive array creations, indexing, slicing, reshaping, joining, and array searching in Python.",
        category: "NumPy"
      },
      {
        title: "W3Schools Python Pandas DataFrame Tutorial",
        source: "W3Schools",
        url: "https://www.w3schools.com/python/pandas/default.asp",
        description: "Practical interactive guides for CSV ingestion, DataFrame cleaning, plotting, and correlations.",
        category: "Pandas"
      }
    ]
  },
  {
    id: "dbms-lab",
    code: "AD8382",
    name: "Database Management Systems Lab",
    shortTitle: "DBMS",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Practice relational database design, complex SQL queries, B+ Tree indexing, relational normalization, and ACID transaction concurrency.",
    description: "Interactive laboratory environment for mastering SQL DDL/DML, nested subqueries, views, indexing structures, schema normalization (1NF to BCNF), and transaction isolation levels.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Intermediate",
    experimentsCount: 5,
    rating: 4.88,
    ratingsCount: 312,
    iconName: "Database",
    tags: ["SQL", "Normalization", "B+ Trees", "Transactions", "Query Optimization"],
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
        title: "Database Normalization Tutorial (1NF, 2NF, 3NF, BCNF)",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/database-normalization-introduction/",
        description: "Functional dependencies, lossless decomposition, and candidate key determination.",
        category: "Normalization"
      },
      {
        title: "W3Schools SQL Tutorial & Live SQL Try-It Editor",
        source: "W3Schools",
        url: "https://www.w3schools.com/sql/default.asp",
        description: "Interactive SQL queries with live database sandbox for SELECT, INSERT, UPDATE, DELETE, and JOINs.",
        category: "Interactive SQL"
      },
      {
        title: "W3Schools MySQL Database Reference & Tutorial",
        source: "W3Schools",
        url: "https://www.w3schools.com/mysql/default.asp",
        description: "Structured guide to MySQL table constraints, foreign keys, views, and aggregate functions.",
        category: "MySQL"
      },
      {
        title: "W3Schools SQL Joins & Subqueries Interactive Guide",
        source: "W3Schools",
        url: "https://www.w3schools.com/sql/sql_join.asp",
        description: "Visual diagrams and examples for Inner Join, Left Join, Right Join, and Full Outer Join.",
        category: "SQL Joins"
      }
    ]
  },
  {
    id: "computer-networks",
    code: "AD8581",
    name: "Computer Networks & Protocols Lab",
    shortTitle: "CEN",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Simulate sliding window protocols, packet routing algorithms (Dijkstra/Bellman-Ford), socket programming, and TCP/IP handshake states.",
    description: "Hands-on virtual simulation of data link layer framing, Stop-and-Wait ARQ, Go-Back-N, Selective Repeat, Shortest Path routing topologies, and Java network socket implementations.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Intermediate",
    experimentsCount: 5,
    rating: 4.91,
    ratingsCount: 290,
    iconName: "Network",
    tags: ["TCP/IP", "Dijkstra Routing", "ARQ Protocols", "Sockets", "Wireshark"],
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
        title: "OSI 7-Layer Model Architecture & Packet Encapsulation",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/layers-of-osi-model/",
        description: "Functions, header structures, and protocol mappings for all seven layers of the OSI model.",
        category: "OSI Model"
      },
      {
        title: "Sliding Window Protocols (Stop & Wait, Go-Back-N, Selective Repeat)",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/sliding-window-protocol-set-1/",
        description: "Mathematical throughput efficiency, window size limits, and sequence number formulas.",
        category: "ARQ Protocols"
      },
      {
        title: "W3Schools Cyber Security & Networking Basics Tutorial",
        source: "W3Schools",
        url: "https://www.w3schools.com/cybersecurity/index.php",
        description: "Beginner-friendly overview of network topologies, IP addressing, DNS, and network defenses.",
        category: "Network Security"
      },
      {
        title: "W3Schools Network Protocols & TCP/IP Architecture",
        source: "W3Schools",
        url: "https://www.w3schools.com/cybersecurity/cybersecurity_network_basics.php",
        description: "Tutorial on packet routing, MAC vs IP addressing, port numbers, and socket communication.",
        category: "TCP/IP"
      },
      {
        title: "Socket Programming in Java & C Tutorial",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/socket-programming-in-java/",
        description: "Client-server TCP/UDP communication using ServerSocket and DatagramPacket in Java.",
        category: "Socket Programming"
      }
    ]
  },
  {
    id: "operating-systems",
    code: "CS3461",
    name: "Operating Systems Lab",
    shortTitle: "OSL",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Simulate CPU scheduling algorithms (FCFS, SJF, Round Robin), semaphores, Banker's deadlock avoidance, and page replacement policies.",
    description: "The Operating Systems Virtual Laboratory offers interactive visual simulations and hands-on algorithm implementations for CPU Scheduling, Process Synchronization, Mutex/Semaphores, Banker's Deadlock Avoidance, Page Replacement (FIFO, LRU, Optimal), and Disk Scheduling in C and Linux environments.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Intermediate",
    experimentsCount: 5,
    rating: 4.93,
    ratingsCount: 342,
    iconName: "Cpu",
    tags: ["CPU Scheduling", "Semaphores", "Banker's Algorithm", "Page Replacement", "Linux"],
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
      },
      {
        title: "W3Schools C Programming Tutorial & Memory Pointers",
        source: "W3Schools",
        url: "https://www.w3schools.com/c/index.php",
        description: "Interactive tutorial covering C pointers, structures, dynamic memory malloc/free, and system calls.",
        category: "C Programming"
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
      },
      {
        title: "Minimax Algorithm & Alpha-Beta Pruning in Game Theory",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-4-alpha-beta-pruning/",
        description: "Adversarial game search tree optimization for Tic-Tac-Toe and Chess.",
        category: "Game Playing"
      },
      {
        title: "N-Queen Problem using Backtracking & CSP",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/",
        description: "Constraint satisfaction problem solving, diagonal threat hashing, and solution state trees.",
        category: "Constraint Satisfaction"
      },
      {
        title: "W3Schools Artificial Intelligence (AI) Overview & Tutorial",
        source: "W3Schools",
        url: "https://www.w3schools.com/ai/default.asp",
        description: "Interactive visual introduction to AI systems, neural networks, machine reasoning, and agents.",
        category: "Interactive AI"
      },
      {
        title: "W3Schools Python Tutorial for AI Developers",
        source: "W3Schools",
        url: "https://www.w3schools.com/python/default.asp",
        description: "Essential Python programming: OOP classes, heapq, collections, deque, and recursion.",
        category: "Python for AI"
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
      },
      {
        title: "Hadoop Tutorial — HDFS Architecture & Cluster Setup",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/hadoop-tutorial/",
        description: "NameNode, DataNode, Block replication factor, and HDFS shell command administration.",
        category: "Hadoop HDFS"
      },
      {
        title: "MapReduce Framework Tutorial with Java & Python WordCount",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/mapreduce-tutorial/",
        description: "Mapper, Shuffle & Sort, and Reducer stages with distributed computation code traces.",
        category: "MapReduce"
      },
      {
        title: "PySpark Tutorial — Spark RDDs & DataFrames in Python",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/pyspark-tutorial/",
        description: "In-memory distributed computing, lazy evaluation, and Spark SQL transformations.",
        category: "PySpark"
      },
      {
        title: "W3Schools MongoDB NoSQL Database Tutorial & Aggregation Guide",
        source: "W3Schools",
        url: "https://www.w3schools.com/mongodb/index.php",
        description: "Document collections, BSON queries, CRUD operations, and multi-stage aggregation pipelines.",
        category: "MongoDB NoSQL"
      },
      {
        title: "W3Schools Data Science & Analytics Tutorial",
        source: "W3Schools",
        url: "https://www.w3schools.com/datascience/default.asp",
        description: "Applied statistical aggregations, data frame filtering, and large-scale dataset plotting.",
        category: "Data Science"
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
      },
      {
        title: "AWS Tutorial — Amazon Web Services Complete Handbook",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/aws-tutorial/",
        description: "EC2 compute instances, Custom VPCs, Security Groups, S3 Buckets, and IAM permission policies.",
        category: "Amazon Web Services"
      },
      {
        title: "Docker Tutorial — Containerization from Scratch",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/docker-tutorial/",
        description: "Dockerfiles, Images, Multi-container Docker Compose, and bridge network configurations.",
        category: "Docker"
      },
      {
        title: "Kubernetes Tutorial — Pods, Deployments & Services Orchestration",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/kubernetes/",
        description: "Container orchestration, ReplicaSets, Service LoadBalancers, and Helm chart management.",
        category: "Kubernetes"
      },
      {
        title: "W3Schools AWS Cloud Services Tutorial",
        source: "W3Schools",
        url: "https://www.w3schools.com/aws/index.php",
        description: "Hands-on beginner guide to AWS Cloud infrastructure, compute, and serverless hosting.",
        category: "AWS Interactive"
      },
      {
        title: "W3Schools Cloud Security & Virtualization Concepts",
        source: "W3Schools",
        url: "https://www.w3schools.com/cybersecurity/cybersecurity_cloud_security.php",
        description: "Cloud identity management, zero trust networks, firewalls, and data encryption at rest.",
        category: "Cloud Security"
      }
    ]
  },
];
