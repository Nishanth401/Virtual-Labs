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
    id: "silberschatz-os",
    title: "Operating System Concepts",
    author: "Abraham Silberschatz, Peter B. Galvin, Greg Gagne",
    publisher: "John Wiley & Sons",
    edition: "10th Edition (2021)",
    isbn: "978-1119800361",
    coverColor: "from-cyan-600 to-blue-800"
  },
  {
    id: "russell-norvig",
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell, Peter Norvig",
    publisher: "Pearson Education",
    edition: "4th Global Edition",
    isbn: "978-0134610993",
    coverColor: "from-purple-600 to-violet-800"
  },
  {
    id: "white-hadoop",
    title: "Hadoop: The Definitive Guide",
    author: "Tom White",
    publisher: "O'Reilly Media",
    edition: "4th Edition",
    isbn: "978-1491901632",
    coverColor: "from-amber-600 to-orange-800"
  },
  {
    id: "buyya-cloud",
    title: "Mastering Cloud Computing: Foundations and Applications",
    author: "Rajkumar Buyya, Christian Vecchiola, S. Thamarai Selvi",
    publisher: "Morgan Kaufmann / Elsevier",
    edition: "1st Edition",
    isbn: "978-0124114548",
    coverColor: "from-teal-600 to-cyan-800"
  },
  {
    id: "goodrich",
    title: "Data Structures and Algorithms in Java / C++",
    author: "Michael T. Goodrich, Roberto Tamassia, Michael H. Goldwasser",
    publisher: "John Wiley & Sons",
    edition: "6th Edition",
    isbn: "978-1118771334",
    coverColor: "from-purple-600 to-violet-800"
  }
];

export const SYLLABUS_MAPPINGS_DATA: UniversitySyllabus[] = [
  {
    university: "Anna University (Regulation 2021)",
    courseCode: "CS3301",
    courseTitle: "Data Structures & Algorithms Laboratory",
    semester: "Semester 3 (B.E / B.Tech CSE & AIDS)",
    regulations: "R2021",
    units: [
      {
        unit: "Unit I",
        title: "Linear Data Structures - List, Stack, Queue",
        topics: [
          "Array and Linked implementations of List ADT",
          "Stack ADT: Push, Pop, Infix to Postfix conversion",
          "Queue ADT: Linear Queue, Circular Queue implementation",
          "Applications of Stack and Queue in recursion and scheduling"
        ]
      },
      {
        unit: "Unit II",
        title: "Non-Linear Data Structures - Trees",
        topics: [
          "Tree ADT, Binary Tree, Binary Search Tree (BST) operations",
          "Tree Traversals: Inorder, Preorder, Postorder",
          "AVL Trees, Balance factors, Rotations (LL, RR, LR, RL)",
          "Binary Heaps, Priority Queue operations"
        ]
      },
      {
        unit: "Unit III",
        title: "Sorting and Searching Algorithms",
        topics: [
          "Bubble Sort, Selection Sort, Insertion Sort",
          "Merge Sort, Quick Sort divide-and-conquer",
          "Linear and Binary Search complexity analysis"
        ]
      }
    ]
  },
  {
    university: "Anna University (Regulation 2021)",
    courseCode: "CS3461",
    courseTitle: "Operating Systems Laboratory",
    semester: "Semester 4 (B.E / B.Tech CSE & AIDS)",
    regulations: "R2021",
    units: [
      {
        unit: "Unit I",
        title: "Process Scheduling & Inter-Process Communication",
        topics: [
          "CPU Scheduling: FCFS, SJF, Priority, and Round Robin",
          "POSIX IPC: Shared Memory and Message Queues",
          "Process Synchronization using Mutex and Semaphores"
        ]
      },
      {
        unit: "Unit II",
        title: "Deadlocks & Memory Virtualization",
        topics: [
          "Banker's Algorithm for Deadlock Avoidance and Safety Check",
          "Page Replacement: FIFO, LRU, and Optimal Replacement",
          "Memory Allocation: First-Fit, Best-Fit, Worst-Fit strategies"
        ]
      }
    ]
  },
  {
    university: "Anna University (Regulation 2021)",
    courseCode: "AI3401",
    courseTitle: "Artificial Intelligence Laboratory",
    semester: "Semester 5 (B.Tech AI & DS)",
    regulations: "R2021",
    units: [
      {
        unit: "Unit I",
        title: "Heuristic Search & Problem Solving",
        topics: [
          "State-space graph traversal and 8-Puzzle problem",
          "A* Algorithm with Manhattan and Euclidean heuristics",
          "Adversarial Minimax Search and Alpha-Beta Pruning"
        ]
      },
      {
        unit: "Unit II",
        title: "Constraint Satisfaction & Knowledge Systems",
        topics: [
          "N-Queens Constraint Satisfaction Problem Backtracking",
          "Propositional Logic and Forward/Backward Chaining Inference",
          "Rule-Based Expert System design in Python"
        ]
      }
    ]
  },
  {
    university: "Anna University (Regulation 2021)",
    courseCode: "CS8711",
    courseTitle: "Big Data Analytics Laboratory",
    semester: "Semester 7 (B.Tech AI & DS)",
    regulations: "R2021",
    units: [
      {
        unit: "Unit I",
        title: "Hadoop HDFS & Distributed MapReduce",
        topics: [
          "HDFS cluster installation, file replication, and shell administration",
          "MapReduce distributed word count, matrix math, and inverted indexing"
        ]
      },
      {
        unit: "Unit II",
        title: "PySpark DataFrames & NoSQL Analytics",
        topics: [
          "Apache Spark RDD transformations and actions",
          "PySpark SQL DataFrames e-commerce group aggregations",
          "MongoDB multi-stage aggregation pipelines and sharding"
        ]
      }
    ]
  },
  {
    university: "Anna University (Regulation 2021)",
    courseCode: "CS8811",
    courseTitle: "Cloud Service Management Laboratory",
    semester: "Semester 8 (B.Tech AI & DS)",
    regulations: "R2021",
    units: [
      {
        unit: "Unit I",
        title: "Cloud Infrastructure & Containerization",
        topics: [
          "AWS EC2 instance provisioning, VPC subnets, and Security Groups",
          "AWS S3 scalable object storage and automated Lifecycle policies",
          "Docker containerization and multi-tier Docker Compose applications"
        ]
      },
      {
        unit: "Unit II",
        title: "Serverless Microservices & Kubernetes Orchestration",
        topics: [
          "AWS Lambda event-driven functions and API Gateway integration",
          "Kubernetes Pod deployment, ReplicaSets, and Service LoadBalancers"
        ]
      }
    ]
  }
];
