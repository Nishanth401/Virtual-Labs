export interface ResourceItem {
  id?: string;
  subject: string;
  title: string;
  unit: number | 'All';
  type: 'Lab Material' | 'Lab Manual';
  provider: 'GeeksforGeeks' | 'W3Schools' | 'Official Docs' | 'Virtual Labs Manual';
  format: 'Web Guide' | 'Interactive Tutorial' | 'PDF Manual' | 'Documentation';
  fileUrl: string;
  description: string;
  downloadCount?: number;
  tags?: string[];
}

export const RESOURCES_DATA: ResourceItem[] = [
  // ==========================================
  // DATA STRUCTURES & ALGORITHMS (JAVA)
  // ==========================================
  {
    subject: 'Data Structures (Java)',
    title: 'GeeksforGeeks Data Structures Complete Tutorial & Algorithms Guide',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: 'https://www.geeksforgeeks.org/data-structures/',
    description: 'Comprehensive guide to linear and non-linear data structures: Arrays, Linked Lists, Stacks, Queues, Trees, and Graph traversals.',
    downloadCount: 940,
    tags: ['DSA', 'Arrays', 'Linked List', 'Trees', 'Graphs']
  },
  {
    subject: 'Data Structures (Java)',
    title: 'W3Schools Java Data Structures & Collections Framework Reference',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: 'https://www.w3schools.com/java/java_data_structures.asp',
    description: 'Hands-on interactive tutorial for Java ArrayList, LinkedList, HashMap, HashSet, and Iterator mechanisms.',
    downloadCount: 820,
    tags: ['Java', 'Collections', 'ArrayList', 'HashMap']
  },
  {
    subject: 'Data Structures Lab',
    title: 'Data Structures & Algorithms Virtual Laboratory Manual',
    unit: 'All',
    type: 'Lab Manual',
    provider: 'Virtual Labs Manual',
    format: 'PDF Manual',
    fileUrl: '#',
    description: 'Official department laboratory manual containing problem statements, Java code skeletons, test cases, and viva questions.',
    downloadCount: 1250,
    tags: ['Lab Manual', 'Java', 'Anna University Syllabus']
  },

  // ==========================================
  // OPERATING SYSTEMS (C)
  // ==========================================
  {
    subject: 'Operating Systems',
    title: 'GeeksforGeeks Operating Systems Handbook — CPU Scheduling & Semaphores',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: 'https://www.geeksforgeeks.org/operating-systems/',
    description: 'In-depth coverage of process synchronization, CPU scheduling algorithms (FCFS, SJF, Round Robin), Banker\'s deadlock avoidance, and memory paging.',
    downloadCount: 880,
    tags: ['OS', 'Scheduling', 'Semaphores', 'Deadlock', 'LRU']
  },
  {
    subject: 'Operating Systems',
    title: 'W3Schools Linux & UNIX Shell Scripting Interactive Handbook',
    unit: 1,
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: 'https://www.w3schools.com/linux/index.php',
    description: 'Interactive reference for POSIX shell commands, system calls, directory navigation, process management, and permissions.',
    downloadCount: 760,
    tags: ['Linux', 'Shell', 'POSIX', 'Commands']
  },
  {
    subject: 'Operating Systems Lab',
    title: 'Operating Systems Virtual Laboratory Manual & C Code Experiments',
    unit: 'All',
    type: 'Lab Manual',
    provider: 'Virtual Labs Manual',
    format: 'PDF Manual',
    fileUrl: '#',
    description: 'Complete lab guide covering fork(), pthread, semaphores, Banker\'s algorithm, and page replacement in C.',
    downloadCount: 980,
    tags: ['Lab Manual', 'OS', 'C Programming']
  },

  // ==========================================
  // DATABASE MANAGEMENT SYSTEMS (SQL)
  // ==========================================
  {
    subject: 'Database Management Systems',
    title: 'W3Schools SQL Complete Tutorial & Interactive Query Editor',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: 'https://www.w3schools.com/sql/default.asp',
    description: 'Master SQL DDL, DML, INNER/LEFT/RIGHT JOINs, GROUP BY aggregations, Nested Queries, and subqueries with live database exercises.',
    downloadCount: 1420,
    tags: ['SQL', 'DBMS', 'Joins', 'Queries', 'W3Schools']
  },
  {
    subject: 'Database Management Systems',
    title: 'GeeksforGeeks DBMS Complete Guide — ER Models & Normalization',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: 'https://www.geeksforgeeks.org/dbms/',
    description: 'Comprehensive tutorials on Entity-Relationship diagrams, 1NF to BCNF normalization, ACID transactions, indexing (B-Trees), and PL/SQL procedures.',
    downloadCount: 1100,
    tags: ['DBMS', 'ER Model', 'Normalization', 'PL/SQL', 'ACID']
  },
  {
    subject: 'Database Management Systems Lab',
    title: 'DBMS Laboratory Manual — SQL & PL/SQL Stored Procedures',
    unit: 'All',
    type: 'Lab Manual',
    provider: 'Virtual Labs Manual',
    format: 'PDF Manual',
    fileUrl: '#',
    description: 'Standard laboratory manual with database schema creation, integrity constraints, triggers, views, and complex join queries.',
    downloadCount: 1150,
    tags: ['Lab Manual', 'SQL', 'PostgreSQL', 'Oracle']
  },

  // ==========================================
  // ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
  // ==========================================
  {
    subject: 'Artificial Intelligence',
    title: 'GeeksforGeeks Artificial Intelligence: Search & State Space Guide',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: 'https://www.geeksforgeeks.org/artificial-intelligence-an-introduction/',
    description: 'Detailed analysis of A* Heuristic Search, 8-Puzzle, Minimax with Alpha-Beta Pruning, N-Queens CSP Backtracking, and Expert Systems.',
    downloadCount: 890,
    tags: ['AI', 'A* Search', 'Minimax', 'N-Queens', 'Backtracking']
  },
  {
    subject: 'Artificial Intelligence',
    title: 'W3Schools Python for AI & Machine Learning Tutorial',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: 'https://www.w3schools.com/ai/default.asp',
    description: 'Introduction to AI concepts, neural network foundations, regression models, classification trees, and Python AI implementation.',
    downloadCount: 970,
    tags: ['AI', 'Python', 'Machine Learning', 'W3Schools']
  },
  {
    subject: 'Machine Learning',
    title: 'W3Schools NumPy, Pandas & Data Science Tutorial',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: 'https://www.w3schools.com/python/numpy/default.asp',
    description: 'Complete hands-on guide for multi-dimensional ndarray operations, slicing, broadcasting, Pandas DataFrames, and Matplotlib data visualization.',
    downloadCount: 1350,
    tags: ['NumPy', 'Pandas', 'Data Science', 'Python']
  },
  {
    subject: 'Machine Learning',
    title: 'GeeksforGeeks Machine Learning with Scikit-Learn Handbook',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: 'https://www.geeksforgeeks.org/machine-learning/',
    description: 'Supervised and unsupervised ML algorithms: Linear/Logistic Regression, Decision Trees, Random Forests, SVM, K-Means Clustering, and PCA.',
    downloadCount: 1040,
    tags: ['ML', 'Scikit-Learn', 'Regression', 'Classification']
  },
  {
    subject: 'AI & Machine Learning Lab',
    title: 'AI & Machine Learning Laboratory Manual with Python Jupyter Notebooks',
    unit: 'All',
    type: 'Lab Manual',
    provider: 'Virtual Labs Manual',
    format: 'PDF Manual',
    fileUrl: '#',
    description: 'Department lab manual with experiment setups, model training workflows, hyperparameter tuning instructions, and evaluation metrics.',
    downloadCount: 1320,
    tags: ['Lab Manual', 'AI', 'ML', 'Python']
  },

  // ==========================================
  // BIG DATA ANALYTICS & NO-SQL
  // ==========================================
  {
    subject: 'Big Data Analytics',
    title: 'GeeksforGeeks Apache Hadoop, HDFS & MapReduce Master Guide',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: 'https://www.geeksforgeeks.org/big-data-tutorial/',
    description: 'Detailed study of distributed storage in HDFS, NameNode/DataNode architecture, MapReduce WordCount execution, Apache Hive, and PySpark.',
    downloadCount: 710,
    tags: ['Big Data', 'Hadoop', 'HDFS', 'MapReduce', 'Spark']
  },
  {
    subject: 'Big Data Analytics',
    title: 'W3Schools MongoDB NoSQL Database & Aggregation Tutorial',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: 'https://www.w3schools.com/mongodb/index.php',
    description: 'CRUD operations on JSON documents, BSON structure, $match, $group, $project aggregation pipelines, and indexing strategies.',
    downloadCount: 830,
    tags: ['MongoDB', 'NoSQL', 'Aggregation', 'W3Schools']
  },
  {
    subject: 'Big Data Analytics Lab',
    title: 'Big Data Analytics Virtual Laboratory Manual',
    unit: 'All',
    type: 'Lab Manual',
    provider: 'Virtual Labs Manual',
    format: 'PDF Manual',
    fileUrl: '#',
    description: 'Hadoop cluster setup guide, MapReduce job submissions, PySpark DataFrame analytics, and Hive data warehousing lab exercises.',
    downloadCount: 890,
    tags: ['Lab Manual', 'Hadoop', 'Spark', 'Hive']
  },

  // ==========================================
  // CLOUD SERVICE MANAGEMENT & DEVOPS
  // ==========================================
  {
    subject: 'Cloud Service Management',
    title: 'GeeksforGeeks Cloud Computing, AWS, Docker & Kubernetes Guide',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: 'https://www.geeksforgeeks.org/cloud-computing/',
    description: 'In-depth guide on IaaS/PaaS/SaaS architectures, AWS EC2, VPC security groups, S3 storage tiers, Docker containers, and Kubernetes orchestration.',
    downloadCount: 920,
    tags: ['Cloud', 'AWS', 'Docker', 'Kubernetes', 'DevOps']
  },
  {
    subject: 'Cloud Service Management',
    title: 'W3Schools AWS Cloud Services & Infrastructure Overview',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: 'https://www.w3schools.com/aws/index.php',
    description: 'Core concepts of AWS cloud infrastructure, serverless Lambda functions, IAM security roles, CloudWatch monitoring, and global availability zones.',
    downloadCount: 850,
    tags: ['AWS', 'Cloud', 'Serverless', 'W3Schools']
  },
  {
    subject: 'Cloud Service Management Lab',
    title: 'Cloud Computing & Containerization Laboratory Manual',
    unit: 'All',
    type: 'Lab Manual',
    provider: 'Virtual Labs Manual',
    format: 'PDF Manual',
    fileUrl: '#',
    description: 'Step-by-step instructions for AWS EC2 instance launch, S3 bucket policy setup, Dockerfile creation, docker-compose orchestration, and K8s Pods.',
    downloadCount: 960,
    tags: ['Lab Manual', 'AWS', 'Docker', 'Kubernetes']
  },

  // ==========================================
  // COMPUTER NETWORKS
  // ==========================================
  {
    subject: 'Computer Networks',
    title: 'GeeksforGeeks Computer Network Architecture & Protocols Guide',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: 'https://www.geeksforgeeks.org/computer-network-tutorials/',
    description: 'Comprehensive study of OSI & TCP/IP layers, CRC error detection, Sliding Window flow control, Dijkstra routing, and Socket programming.',
    downloadCount: 910,
    tags: ['Networks', 'TCP/IP', 'Routing', 'Dijkstra', 'Sockets']
  },
  {
    subject: 'Computer Networks Lab',
    title: 'Computer Networks Virtual Laboratory Manual & Socket Programs',
    unit: 'All',
    type: 'Lab Manual',
    provider: 'Virtual Labs Manual',
    format: 'PDF Manual',
    fileUrl: '#',
    description: 'C and Python network socket programming, Wireshark packet capture analysis, simulation of CSMA/CD, and routing table implementations.',
    downloadCount: 1010,
    tags: ['Lab Manual', 'Networks', 'Sockets', 'Wireshark']
  },

  // ==========================================
  // PROGRAMMING FOUNDATIONS (C, PYTHON & JAVA)
  // ==========================================
  {
    subject: 'C Programming',
    title: 'GeeksforGeeks C Programming Language Complete Tutorial',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: 'https://www.geeksforgeeks.org/c-programming-language/',
    description: 'Pointers, memory management (malloc, calloc, free), struct data types, bitwise operators, and recursion mechanics in C.',
    downloadCount: 1180,
    tags: ['C', 'Pointers', 'Memory', 'Structures']
  },
  {
    subject: 'C Programming',
    title: 'W3Schools C Programming Interactive Tutorial & Syntax Guide',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: 'https://www.w3schools.com/c/index.php',
    description: 'Beginner-friendly interactive lessons on C variables, loops, arrays, pointers, functions, and file handling.',
    downloadCount: 990,
    tags: ['C', 'Syntax', 'Basics', 'W3Schools']
  },
  {
    subject: 'Java OOP',
    title: 'W3Schools Java Object-Oriented Programming (OOP) Tutorial',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: 'https://www.w3schools.com/java/java_oop.asp',
    description: 'Classes, Objects, Inheritance, Polymorphism, Abstraction, Interfaces, Encapsulation, and Exception Handling in Java.',
    downloadCount: 1220,
    tags: ['Java', 'OOP', 'Inheritance', 'Polymorphism']
  },
  {
    subject: 'Python Programming',
    title: 'W3Schools Python Full Tutorial with Interactive Code Sandbox',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: 'https://www.w3schools.com/python/default.asp',
    description: 'Python syntax, Lists, Tuples, Dictionaries, Lambda functions, OOP, Modules, and File Handling with instant web execution.',
    downloadCount: 1480,
    tags: ['Python', 'Data Structures', 'Functions', 'W3Schools']
  }
];
