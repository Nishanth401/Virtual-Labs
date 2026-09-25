export interface ResourceItem {
  id?: string;
  subject: string;
  title: string;
  unit: number | 'All';
  type: 'Lab Material' | 'Lab Manual' | 'Video Tutorial' | 'Virtual Lab';
  provider: 'Academic Curriculum' | 'Official Docs' | 'Virtual Labs Manual' | 'YouTube Video' | 'Simulation Studio' | string;
  format: 'Web Guide' | 'Interactive Tutorial' | 'PDF Manual' | 'Documentation' | 'Video Guide' | 'Interactive Simulator';
  fileUrl: string;
  description: string;
  downloadCount?: number;
  tags?: string[];
  duration?: string;
  language?: string;
  difficulty?: string;
}

export function getResourceId(res: { id?: string; subject?: string; title?: string }): string {
  if (res.id) return res.id;
  return `${res.subject || "material"}-${res.title || "guide"}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getYouTubeEmbedUrl(url: string): string {
  if (!url) return "";
  try {
    if (url.includes("list=")) {
      const listMatch = url.match(/[?&]list=([^&#]+)/);
      if (listMatch && listMatch[1]) {
        return `https://www.youtube.com/embed/videoseries?list=${listMatch[1]}&rel=0`;
      }
    }
    if (url.includes("watch?v=")) {
      const vMatch = url.match(/[?&]v=([^&#]+)/);
      if (vMatch && vMatch[1]) {
        return `https://www.youtube.com/embed/${vMatch[1]}?rel=0`;
      }
    }
    if (url.includes("youtu.be/")) {
      const idMatch = url.match(/youtu\.be\/([^?&#]+)/);
      if (idMatch && idMatch[1]) {
        return `https://www.youtube.com/embed/${idMatch[1]}?rel=0`;
      }
    }
    if (url.includes("youtube.com/embed/")) {
      return url;
    }
  } catch (e) {
    console.error("Error parsing YouTube URL:", e);
  }
  return url;
}

export const RESOURCES_DATA: ResourceItem[] = [
  // ==========================================
  // VIDEO TUTORIALS & WALKTHROUGHS
  // ==========================================
  {
    id: 'video-dsa-tamil-masterclass',
    subject: 'Data Structures & Algorithms',
    title: 'Data Structures & Algorithms Complete Masterclass in Tamil',
    unit: 'All',
    type: 'Video Tutorial',
    provider: 'YouTube Video',
    format: 'Video Guide',
    fileUrl: 'https://www.youtube.com/watch?v=YZVF4ehkn24',
    description: 'Comprehensive DSA video lecture series explaining linear memory, linked lists, stacks, queues, trees, graphs, and sorting in Tamil.',
    downloadCount: 3100,
    duration: 'Full Course',
    language: 'Tamil',
    tags: ['DSA', 'Tamil Tutorial', 'Sorting', 'Trees', 'Graphs']
  },
  {
    id: 'video-datascience-tamil-masterclass',
    subject: 'Data Science & Analytics',
    title: 'Data Science & Analytics 18+ Hour Masterclass in Tamil (AI Coach John)',
    unit: 'All',
    type: 'Video Tutorial',
    provider: 'YouTube Video',
    format: 'Video Guide',
    fileUrl: 'https://www.youtube.com/watch?v=k6HOBjkUkE4',
    description: 'Complete 18+ hour masterclass in Tamil covering Python foundations, Pandas deep dive, statistics & hypothesis testing, regression models, and Streamlit.',
    downloadCount: 4200,
    duration: '18h 15m',
    language: 'Tamil',
    tags: ['Data Science', 'Pandas', 'Z-Test', 'Regression', 'Tamil']
  },
  {
    id: 'video-ml-tamil-series',
    subject: 'Machine Learning',
    title: 'Machine Learning & Deep Learning Full Video Series in Tamil',
    unit: 'All',
    type: 'Video Tutorial',
    provider: 'YouTube Video',
    format: 'Video Guide',
    fileUrl: 'https://www.youtube.com/playlist?list=PLorkqpg7qgkw8xqc-RmuCgfCWRWCRnN-u',
    description: 'Supervised and unsupervised learning, mathematical formulations, Candidate-Elimination, ID3 Trees, and Backpropagation in Tamil.',
    downloadCount: 2850,
    duration: 'Full Playlist',
    language: 'Tamil',
    tags: ['Machine Learning', 'Neural Networks', 'Decision Trees', 'Tamil']
  },
  {
    id: 'video-dbms-sql-tamil',
    subject: 'Database Management Systems',
    title: 'DBMS & SQL Complete Step-by-Step Course in Tamil',
    unit: 'All',
    type: 'Video Tutorial',
    provider: 'YouTube Video',
    format: 'Video Guide',
    fileUrl: 'https://www.youtube.com/watch?v=wsYx5qOP_bI',
    description: 'Relational modeling, SQL DDL/DML, complex joins, views, triggers, and PL/SQL stored procedures explained in Tamil.',
    downloadCount: 2900,
    duration: 'Full Course',
    language: 'Tamil',
    tags: ['DBMS', 'SQL', 'PL/SQL', 'Joins', 'Tamil']
  },
  {
    id: 'video-os-gatesmashers',
    subject: 'Operating Systems',
    title: 'Operating Systems Complete Gate Smashers Playlist (English)',
    unit: 'All',
    type: 'Video Tutorial',
    provider: 'YouTube Video',
    format: 'Video Guide',
    fileUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p',
    description: 'CPU scheduling algorithms (FCFS/SJF/RR), Semaphores, Banker\'s deadlock avoidance, paging, and disk scheduling.',
    downloadCount: 5100,
    duration: 'Full Series',
    language: 'English',
    tags: ['OS', 'Scheduling', 'Deadlocks', 'Semaphores']
  },
  {
    id: 'video-java-oop-tamil',
    subject: 'Java OOP',
    title: 'Object Oriented Programming with Java Full Course in Tamil',
    unit: 'All',
    type: 'Video Tutorial',
    provider: 'YouTube Video',
    format: 'Video Guide',
    fileUrl: 'https://www.youtube.com/watch?v=nqB3qAtDLKU',
    description: 'Classes, Objects, Inheritance, Polymorphism, Abstraction, Exception Handling, and Java Collections in Tamil.',
    downloadCount: 3400,
    duration: 'Full Course',
    language: 'Tamil',
    tags: ['Java', 'OOP', 'Collections', 'Tamil']
  },
  {
    id: 'video-c-programming-tamil',
    subject: 'C Programming',
    title: 'C Programming Language Complete Course in Tamil',
    unit: 'All',
    type: 'Video Tutorial',
    provider: 'YouTube Video',
    format: 'Video Guide',
    fileUrl: 'https://www.youtube.com/watch?v=Zi_n_mE3pEM',
    description: 'C pointers, malloc/free dynamic memory allocation, structs, recursion, and file I/O operations in Tamil.',
    downloadCount: 3200,
    duration: 'Full Course',
    language: 'Tamil',
    tags: ['C Programming', 'Pointers', 'Memory', 'Tamil']
  },
  {
    id: 'video-networks-tamil',
    subject: 'Computer Networks',
    title: 'Computer Networks Full Course in Tamil',
    unit: 'All',
    type: 'Video Tutorial',
    provider: 'YouTube Video',
    format: 'Video Guide',
    fileUrl: 'https://www.youtube.com/watch?v=yiIpBNBl4bc',
    description: 'OSI 7 layers, TCP/IP architecture, socket programming, routing algorithms, and Wireshark packet capture.',
    downloadCount: 2600,
    duration: 'Full Course',
    language: 'Tamil',
    tags: ['Networks', 'TCP/IP', 'Routing', 'Tamil']
  },

  // ==========================================
  // VIRTUAL LABS & SIMULATORS (DIRECT LAUNCH)
  // ==========================================
  {
    id: 'sim-dsa-suite',
    subject: 'Data Structures & Algorithms',
    title: 'Interactive DSA Simulator & Visualizer Suite',
    unit: 'All',
    type: 'Virtual Lab',
    provider: 'Simulation Studio',
    format: 'Interactive Simulator',
    fileUrl: '/labs/data-structures',
    description: 'Interactive real-time execution engine for Singly/Doubly Linked Lists, Stacks, Queues, BSTs, AVL Rotations, and Sorting.',
    downloadCount: 4800,
    difficulty: 'Intermediate',
    tags: ['DSA Simulator', 'Visualizer', 'Trees', 'Sorting']
  },
  {
    id: 'sim-dbms-sql',
    subject: 'Database Management Systems',
    title: 'DBMS Live SQL Console & Query Simulation Studio',
    unit: 'All',
    type: 'Virtual Lab',
    provider: 'Simulation Studio',
    format: 'Interactive Simulator',
    fileUrl: '/labs/dbms-lab',
    description: 'Browser-based SQL engine with live table relations, join visualizers, PL/SQL cursors, and ACID transaction tests.',
    downloadCount: 4100,
    difficulty: 'Intermediate',
    tags: ['SQL Studio', 'DBMS Lab', 'Query Engine']
  },
  {
    id: 'sim-ai-ml',
    subject: 'Machine Learning',
    title: 'Machine Learning & Neural Network Interactive Simulator',
    unit: 'All',
    type: 'Virtual Lab',
    provider: 'Simulation Studio',
    format: 'Interactive Simulator',
    fileUrl: '/labs/ai-machine-learning',
    description: 'Live interactive models for Candidate-Elimination, ID3 Decision Trees, Backpropagation ANN, and Naïve Bayes classifiers.',
    downloadCount: 3950,
    difficulty: 'Advanced',
    tags: ['ML Lab', 'Neural Nets', 'Decision Trees']
  },
  {
    id: 'sim-os-scheduling',
    subject: 'Operating Systems',
    title: 'Operating Systems CPU Scheduling & Deadlock Simulator',
    unit: 'All',
    type: 'Virtual Lab',
    provider: 'Simulation Studio',
    format: 'Interactive Simulator',
    fileUrl: '/labs/operating-systems',
    description: 'Gantt chart CPU scheduling (FCFS, SJF, RR), Semaphore race condition debugger, and Banker\'s safety vector generator.',
    downloadCount: 3800,
    difficulty: 'Intermediate',
    tags: ['OS Simulator', 'Scheduling', 'Bankers Algorithm']
  },
  {
    id: 'sim-data-science',
    subject: 'Data Science & Analytics',
    title: 'Data Science NumPy & Pandas Vectorized Computing Lab',
    unit: 'All',
    type: 'Virtual Lab',
    provider: 'Simulation Studio',
    format: 'Interactive Simulator',
    fileUrl: '/labs/data-science-analytics',
    description: 'Statistical hypothesis testing suite (Z-test, T-test, ANOVA), Pandas DataFrame pipeline, and regression analysis.',
    downloadCount: 3600,
    difficulty: 'Intermediate',
    tags: ['Data Science', 'Statistics', 'Z-Test', 'NumPy']
  },
  {
    id: 'sim-java-oop',
    subject: 'Java OOP',
    title: 'Java Object-Oriented Programming Interactive Sandbox',
    unit: 'All',
    type: 'Virtual Lab',
    provider: 'Simulation Studio',
    format: 'Interactive Simulator',
    fileUrl: '/labs/oops-java',
    description: 'Class hierarchy visualizer, inheritance models, exception handling sandbox, and Collections Framework testbed.',
    downloadCount: 4200,
    difficulty: 'Intermediate',
    tags: ['Java Lab', 'OOP Sandbox', 'Collections']
  },
  {
    id: 'sim-c-pointers',
    subject: 'C Programming',
    title: 'C Pointer & Memory Layout Visualizer Studio',
    unit: 'All',
    type: 'Virtual Lab',
    provider: 'Simulation Studio',
    format: 'Interactive Simulator',
    fileUrl: '/labs/c-programming',
    description: 'Stack frame inspector, heap allocation (malloc/free) tracker, and pointer dereference visualizer.',
    downloadCount: 3750,
    difficulty: 'Beginner',
    tags: ['C Visualizer', 'Pointers', 'Memory Allocation']
  },
  {
    id: 'sim-networks-sockets',
    subject: 'Computer Networks',
    title: 'Computer Networks Packet Sniffer & Socket Lab',
    unit: 'All',
    type: 'Virtual Lab',
    provider: 'Simulation Studio',
    format: 'Interactive Simulator',
    fileUrl: '/labs/computer-networks',
    description: 'Packet dissection, TCP/UDP client-server simulator, ARP/RARP translation, and Dijkstra shortest path routing.',
    downloadCount: 3300,
    difficulty: 'Intermediate',
    tags: ['Networks Lab', 'Sockets', 'Routing']
  },
  {
    id: 'sim-ai-search',
    subject: 'Artificial Intelligence',
    title: 'AI Heuristic Search & Minimax Game Tree Studio',
    unit: 'All',
    type: 'Virtual Lab',
    provider: 'Simulation Studio',
    format: 'Interactive Simulator',
    fileUrl: '/labs/artificial-intelligence',
    description: 'A* Search on 8-puzzle with Manhattan distance, Minimax with Alpha-Beta pruning, and N-Queens backtracking solver.',
    downloadCount: 3100,
    difficulty: 'Advanced',
    tags: ['AI Studio', 'A* Search', 'Minimax', 'CSP']
  },
  {
    id: 'sim-dsa-visualizer-engine',
    subject: 'DSA Visualizer',
    title: 'Step-by-Step Interactive DSA Visualizer Engine',
    unit: 'All',
    type: 'Virtual Lab',
    provider: 'Simulation Studio',
    format: 'Interactive Simulator',
    fileUrl: '/dsa-visualization',
    description: 'Animated step-by-step visualizer for Bubble/Quick/Merge Sort, Stack/Queue operations, and BST traversals.',
    downloadCount: 5200,
    difficulty: 'Beginner',
    tags: ['DSA Visualizer', 'Animations', 'Sorting']
  },

  // ==========================================
  // DATA STRUCTURES & ALGORITHMS (JAVA)
  // ==========================================
  {
    id: 'dsa-java-gfg',
    subject: 'Data Structures (Java)',
    title: 'Data Structures & Algorithms Complete Academic Handbook',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Web Guide',
    fileUrl: '',
    description: 'Comprehensive academic guide to linear and non-linear data structures: Arrays, Linked Lists, Stacks, Queues, Trees, and Graph traversals.',
    downloadCount: 940,
    tags: ['DSA', 'Arrays', 'Linked List', 'Trees', 'Graphs']
  },
  {
    id: 'dsa-java-w3schools',
    subject: 'Data Structures (Java)',
    title: 'Java Data Structures & Collections Framework Reference',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Interactive Tutorial',
    fileUrl: '',
    description: 'In-depth reference for Java ArrayList, LinkedList, HashMap, HashSet, and Iterator mechanisms.',
    downloadCount: 820,
    tags: ['Java', 'Collections', 'ArrayList', 'HashMap']
  },
  {
    id: 'dsa-lab-manual',
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
    id: 'os-handbook-gfg',
    subject: 'Operating Systems',
    title: 'Operating Systems Comprehensive Guide — CPU Scheduling & Semaphores',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Web Guide',
    fileUrl: '',
    description: 'In-depth coverage of process synchronization, CPU scheduling algorithms (FCFS, SJF, Round Robin), Banker\'s deadlock avoidance, and memory paging.',
    downloadCount: 880,
    tags: ['OS', 'Scheduling', 'Semaphores', 'Deadlock', 'LRU']
  },
  {
    id: 'os-linux-w3schools',
    subject: 'Operating Systems',
    title: 'Linux & UNIX Shell Scripting Academic Handbook',
    unit: 1,
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Interactive Tutorial',
    fileUrl: '',
    description: 'Comprehensive guide for POSIX shell commands, system calls, directory navigation, process management, and permissions.',
    downloadCount: 760,
    tags: ['Linux', 'Shell', 'POSIX', 'Commands']
  },
  {
    id: 'os-lab-manual',
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
    id: 'dbms-w3schools-sql',
    subject: 'Database Management Systems',
    title: 'SQL Complete Curriculum & Relational Query Handbook',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Interactive Tutorial',
    fileUrl: '',
    description: 'Master SQL DDL, DML, INNER/LEFT/RIGHT JOINs, GROUP BY aggregations, Nested Queries, and subqueries.',
    downloadCount: 1420,
    tags: ['SQL', 'DBMS', 'Joins', 'Queries']
  },
  {
    id: 'dbms-gfg-guide',
    subject: 'Database Management Systems',
    title: 'DBMS Comprehensive Guide — ER Models & Normalization',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Web Guide',
    fileUrl: '',
    description: 'Comprehensive tutorials on Entity-Relationship diagrams, 1NF to BCNF normalization, ACID transactions, indexing (B-Trees), and PL/SQL procedures.',
    downloadCount: 1100,
    tags: ['DBMS', 'ER Model', 'Normalization', 'PL/SQL', 'ACID']
  },
  {
    id: 'dbms-lab-manual',
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
    id: 'ai-gfg-guide',
    subject: 'Artificial Intelligence',
    title: 'Artificial Intelligence: Heuristic Search & State Space Guide',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Web Guide',
    fileUrl: '',
    description: 'Detailed analysis of A* Heuristic Search, 8-Puzzle, Minimax with Alpha-Beta Pruning, N-Queens CSP Backtracking, and Expert Systems.',
    downloadCount: 890,
    tags: ['AI', 'A* Search', 'Minimax', 'N-Queens', 'Backtracking']
  },
  {
    id: 'ai-w3schools-python',
    subject: 'Artificial Intelligence',
    title: 'Python for AI & Machine Learning Core Curriculum',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Interactive Tutorial',
    fileUrl: '',
    description: 'Introduction to AI concepts, neural network foundations, regression models, classification trees, and Python AI implementation.',
    downloadCount: 970,
    tags: ['AI', 'Python', 'Machine Learning']
  },
  {
    id: 'ml-w3schools-numpy',
    subject: 'Machine Learning',
    title: 'NumPy, Pandas & Data Science Computational Handbook',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Interactive Tutorial',
    fileUrl: '',
    description: 'Complete hands-on guide for multi-dimensional ndarray operations, slicing, broadcasting, Pandas DataFrames, and Matplotlib data visualization.',
    downloadCount: 1350,
    tags: ['NumPy', 'Pandas', 'Data Science', 'Python']
  },
  {
    id: 'ml-gfg-sklearn',
    subject: 'Machine Learning',
    title: 'Machine Learning & Statistical Modeling Handbook',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Web Guide',
    fileUrl: '',
    description: 'Supervised and unsupervised ML algorithms: Linear/Logistic Regression, Decision Trees, Random Forests, SVM, K-Means Clustering, and PCA.',
    downloadCount: 1040,
    tags: ['ML', 'Scikit-Learn', 'Regression', 'Classification']
  },
  {
    id: 'ml-lab-manual',
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
    id: 'bigdata-gfg-hadoop',
    subject: 'Big Data Analytics',
    title: 'Apache Hadoop, HDFS & Distributed MapReduce Master Guide',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Web Guide',
    fileUrl: '',
    description: 'Detailed study of distributed storage in HDFS, NameNode/DataNode architecture, MapReduce WordCount execution, Apache Hive, and PySpark.',
    downloadCount: 710,
    tags: ['Big Data', 'Hadoop', 'HDFS', 'MapReduce', 'Spark']
  },
  {
    id: 'bigdata-w3schools-mongodb',
    subject: 'Big Data Analytics',
    title: 'MongoDB NoSQL Database & Aggregation Pipeline Guide',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Interactive Tutorial',
    fileUrl: '',
    description: 'CRUD operations on JSON documents, BSON structure, $match, $group, $project aggregation pipelines, and indexing strategies.',
    downloadCount: 830,
    tags: ['MongoDB', 'NoSQL', 'Aggregation']
  },
  {
    id: 'bigdata-lab-manual',
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
    id: 'cloud-gfg-guide',
    subject: 'Cloud Service Management',
    title: 'Cloud Computing, Docker & Kubernetes Engineering Guide',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Web Guide',
    fileUrl: '',
    description: 'In-depth guide on IaaS/PaaS/SaaS architectures, AWS EC2, VPC security groups, S3 storage tiers, Docker containers, and Kubernetes orchestration.',
    downloadCount: 920,
    tags: ['Cloud', 'AWS', 'Docker', 'Kubernetes', 'DevOps']
  },
  {
    id: 'cloud-w3schools-aws',
    subject: 'Cloud Service Management',
    title: 'Cloud Architecture & Scalable Infrastructure Overview',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Interactive Tutorial',
    fileUrl: '',
    description: 'Core concepts of cloud infrastructure, serverless Lambda functions, IAM security roles, CloudWatch monitoring, and global availability zones.',
    downloadCount: 850,
    tags: ['AWS', 'Cloud', 'Serverless']
  },
  {
    id: 'cloud-lab-manual',
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
    id: 'networks-gfg-guide',
    subject: 'Computer Networks',
    title: 'Computer Network Architecture & Protocols Engineering Guide',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Web Guide',
    fileUrl: '',
    description: 'Comprehensive study of OSI & TCP/IP layers, CRC error detection, Sliding Window flow control, Dijkstra routing, and Socket programming.',
    downloadCount: 910,
    tags: ['Networks', 'TCP/IP', 'Routing', 'Dijkstra', 'Sockets']
  },
  {
    id: 'networks-lab-manual',
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
    id: 'c-programming-gfg',
    subject: 'C Programming',
    title: 'C Programming Language Complete Academic Tutorial',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Web Guide',
    fileUrl: '',
    description: 'Pointers, memory management (malloc, calloc, free), struct data types, bitwise operators, and recursion mechanics in C.',
    downloadCount: 1180,
    tags: ['C', 'Pointers', 'Memory', 'Structures']
  },
  {
    id: 'c-programming-w3schools',
    subject: 'C Programming',
    title: 'C Programming Memory Models & Syntax Handbook',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Interactive Tutorial',
    fileUrl: '',
    description: 'Beginner-friendly lessons on C variables, loops, arrays, pointers, functions, and file handling.',
    downloadCount: 990,
    tags: ['C', 'Syntax', 'Basics']
  },
  {
    id: 'java-oop-w3schools',
    subject: 'Java OOP',
    title: 'Java Object-Oriented Programming (OOP) Master Guide',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Interactive Tutorial',
    fileUrl: '',
    description: 'Classes, Objects, Inheritance, Polymorphism, Abstraction, Interfaces, Encapsulation, and Exception Handling in Java.',
    downloadCount: 1220,
    tags: ['Java', 'OOP', 'Inheritance', 'Polymorphism']
  },
  {
    id: 'python-w3schools',
    subject: 'Python Programming',
    title: 'Python Programming Comprehensive Core Curriculum',
    unit: 'All',
    type: 'Lab Material',
    provider: 'Academic Curriculum',
    format: 'Interactive Tutorial',
    fileUrl: '',
    description: 'Python syntax, Lists, Tuples, Dictionaries, Lambda functions, OOP, Modules, and File Handling.',
    downloadCount: 1480,
    tags: ['Python', 'Data Structures', 'Functions']
  }
];
