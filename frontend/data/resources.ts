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
  // 1. DATA STRUCTURES & ALGORITHMS (JAVA)
  // ==========================================
  {
    id: 'dsa-complete-guide',
    subject: 'Data Structures & Algorithms',
    title: 'Data Structures & Algorithms Complete Academic Handbook (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/dsa-complete-guide',
    description: 'Comprehensive academic guide to linear and non-linear data structures: Arrays, Linked Lists, Stacks, Queues, Trees, and Graph traversals.',
    downloadCount: 1540,
    tags: ['DSA', 'Arrays', 'Linked List', 'Stacks', 'Queues', 'GeeksforGeeks']
  },
  {
    id: 'dsa-trees-gfg',
    subject: 'Data Structures & Algorithms',
    title: 'Self-Balancing Trees & Graph Traversal Master Guide (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/dsa-trees-gfg',
    description: 'Binary Search Trees (BST), AVL balance factor rotations, Graph BFS/DFS, and Dijkstra shortest path algorithm.',
    downloadCount: 1220,
    tags: ['Trees', 'AVL Tree', 'Graphs', 'BFS', 'DFS', 'GeeksforGeeks']
  },
  {
    id: 'dsa-java-w3schools',
    subject: 'Data Structures & Algorithms',
    title: 'Java Data Structures & Collections Framework Reference (W3Schools)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: '/resources/dsa-java-w3schools',
    description: 'In-depth reference for Java ArrayList, LinkedList, HashMap, HashSet, Iterators, and computational complexity.',
    downloadCount: 1480,
    tags: ['Java', 'Collections', 'ArrayList', 'HashMap', 'W3Schools']
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
  // 2. OPERATING SYSTEMS (C)
  // ==========================================
  {
    id: 'os-scheduling-gfg',
    subject: 'Operating Systems',
    title: 'CPU Scheduling Algorithms & Gantt Chart Simulation (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/os-scheduling-gfg',
    description: 'Preemptive vs Non-Preemptive scheduling, FCFS, Shortest Job First (SJF), Round Robin (RR), and priority scheduling.',
    downloadCount: 1380,
    tags: ['OS', 'Scheduling', 'FCFS', 'Round Robin', 'Gantt Chart', 'GeeksforGeeks']
  },
  {
    id: 'os-deadlocks-gfg',
    subject: 'Operating Systems',
    title: 'Process Synchronization, Semaphores & Banker\'s Algorithm (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/os-deadlocks-gfg',
    description: 'Mutex locks, counting semaphores, Producer-Consumer problem, Dining Philosophers, and Banker\'s safety state evaluation.',
    downloadCount: 1190,
    tags: ['OS', 'Semaphores', 'Deadlock', 'Bankers Algorithm', 'GeeksforGeeks']
  },
  {
    id: 'os-linux-w3schools',
    subject: 'Operating Systems',
    title: 'Linux Shell Scripting & POSIX System Calls Handbook (W3Schools)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: '/resources/os-linux-w3schools',
    description: 'Comprehensive guide for POSIX shell commands, system calls (fork, exec, wait), pipe IPC, and permissions.',
    downloadCount: 1160,
    tags: ['Linux', 'Shell', 'POSIX', 'Fork', 'W3Schools']
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
  // 3. DATABASE MANAGEMENT SYSTEMS (SQL)
  // ==========================================
  {
    id: 'dbms-sql-guide',
    subject: 'Database Management Systems',
    title: 'Relational Database Design, Complex Joins & PL/SQL Stored Procedures (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/dbms-sql-guide',
    description: 'Relational schema definitions, INNER/LEFT/RIGHT/FULL OUTER JOINs, grouping aggregations, and PL/SQL triggers.',
    downloadCount: 1650,
    tags: ['DBMS', 'SQL', 'Joins', 'PL/SQL', 'Triggers', 'GeeksforGeeks']
  },
  {
    id: 'dbms-normalization-gfg',
    subject: 'Database Management Systems',
    title: 'Database Normalization & Relational Integrity Guide (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/dbms-normalization-gfg',
    description: 'Functional dependencies, lossless join decomposition, 1NF, 2NF, 3NF, BCNF, and ACID transaction isolation levels.',
    downloadCount: 1340,
    tags: ['DBMS', 'Normalization', '1NF', 'BCNF', 'ACID', 'GeeksforGeeks']
  },
  {
    id: 'dbms-w3schools-sql',
    subject: 'Database Management Systems',
    title: 'SQL Syntax, DDL/DML Commands & Query Handbook (W3Schools)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: '/resources/dbms-w3schools-sql',
    description: 'Complete SQL syntax cheatsheet, table constraints, aggregation functions, views, and index creation.',
    downloadCount: 1780,
    tags: ['SQL', 'W3Schools', 'Constraints', 'Aggregations', 'Indexes']
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
  // 4. MACHINE LEARNING & AI
  // ==========================================
  {
    id: 'ml-foundations-gfg',
    subject: 'Machine Learning',
    title: 'Concept Learning & Candidate-Elimination Algorithm (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/ml-foundations-gfg',
    description: 'Find-S algorithm, version spaces, specific and general boundary sets, positive and negative training instances.',
    downloadCount: 1210,
    tags: ['Machine Learning', 'Candidate Elimination', 'Find-S', 'GeeksforGeeks']
  },
  {
    id: 'ml-decision-trees-gfg',
    subject: 'Machine Learning',
    title: 'Decision Tree Induction & ID3 Algorithm (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/ml-decision-trees-gfg',
    description: 'Shannon Entropy, Information Gain, iterative dichotomizer 3 (ID3), recursive tree splitting, and tree pruning.',
    downloadCount: 1390,
    tags: ['Machine Learning', 'Decision Trees', 'Entropy', 'Information Gain', 'GeeksforGeeks']
  },
  {
    id: 'ml-neural-networks-gfg',
    subject: 'Machine Learning',
    title: 'Artificial Neural Networks & Backpropagation (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/ml-neural-networks-gfg',
    description: 'Multi-layer perceptron (MLP), forward feed, gradient descent weight updates, sigmoid activation, and backpropagation.',
    downloadCount: 1470,
    tags: ['Neural Networks', 'Backpropagation', 'Perceptron', 'Deep Learning', 'GeeksforGeeks']
  },
  {
    id: 'ml-w3schools',
    subject: 'Machine Learning',
    title: 'Python Machine Learning & Scikit-Learn Guide (W3Schools)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: '/resources/ml-w3schools',
    description: 'Linear regression, polynomial regression, KNN classification, train-test splitting, and evaluation metrics in Python.',
    downloadCount: 1530,
    tags: ['Machine Learning', 'Scikit-Learn', 'Regression', 'KNN', 'W3Schools']
  },
  {
    id: 'ai-search-gfg',
    subject: 'Artificial Intelligence',
    title: 'Informed Search Strategies & Heuristic Evaluation (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/ai-search-gfg',
    description: 'Evaluation function f(n) = g(n) + h(n), admissible heuristics, 8-puzzle Manhattan solver, and Greedy Best-First Search.',
    downloadCount: 1140,
    tags: ['AI', 'A* Search', 'Heuristics', '8-Puzzle', 'GeeksforGeeks']
  },
  {
    id: 'ai-minimax-gfg',
    subject: 'Artificial Intelligence',
    title: 'Adversarial Game Search & Alpha-Beta Pruning (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/ai-minimax-gfg',
    description: 'Minimax decision rules, zero-sum game trees, branch pruning conditions (alpha >= beta), and Tic-Tac-Toe engine.',
    downloadCount: 1090,
    tags: ['AI', 'Minimax', 'Alpha-Beta Pruning', 'Game Theory', 'GeeksforGeeks']
  },
  {
    id: 'ai-w3schools-python',
    subject: 'Artificial Intelligence',
    title: 'Python for AI & Heuristic Solvers Handbook (W3Schools)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: '/resources/ai-w3schools-python',
    description: 'Priority queues, state-space representations, heuristic cost functions, and CSP backtracking algorithms in Python.',
    downloadCount: 1280,
    tags: ['AI', 'Python', 'Priority Queue', 'CSP', 'W3Schools']
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
  // 5. DATA SCIENCE & ANALYTICS
  // ==========================================
  {
    id: 'data-science-numpy-gfg',
    subject: 'Data Science & Analytics',
    title: 'NumPy Vectorized Computing & Multi-Dimensional Array Processing (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/data-science-numpy-gfg',
    description: 'Contiguous memory ndarray layout, vectorization vs loops, broadcasting rules, matrix math, and boolean masking.',
    downloadCount: 1410,
    tags: ['Data Science', 'NumPy', 'Vectorization', 'Broadcasting', 'GeeksforGeeks']
  },
  {
    id: 'data-science-pandas-gfg',
    subject: 'Data Science & Analytics',
    title: 'Pandas DataFrames, Data Cleaning & Feature Wrangling (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/data-science-pandas-gfg',
    description: 'DataFrame structures, missing value imputation (fillna, dropna), group-by split-apply-combine, and pivot tables.',
    downloadCount: 1520,
    tags: ['Data Science', 'Pandas', 'Data Cleaning', 'GroupBy', 'GeeksforGeeks']
  },
  {
    id: 'data-science-stats-gfg',
    subject: 'Data Science & Analytics',
    title: 'Applied Statistical Hypothesis Testing — Z-Test, T-Test & ANOVA (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/data-science-stats-gfg',
    description: 'Null and alternative hypotheses, p-value decision rule, two-sample Z/T-tests, F-distribution, and One-Way ANOVA.',
    downloadCount: 1290,
    tags: ['Data Science', 'Statistics', 'Hypothesis Testing', 'Z-Test', 'T-Test', 'ANOVA', 'GeeksforGeeks']
  },
  {
    id: 'data-science-w3schools',
    subject: 'Data Science & Analytics',
    title: 'Python for Data Science & Matplotlib Visualization Handbook (W3Schools)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: '/resources/data-science-w3schools',
    description: 'Hands-on tutorial for NumPy math functions, Pandas data exploration, and publication-ready Matplotlib graphs.',
    downloadCount: 1610,
    tags: ['Data Science', 'Matplotlib', 'Pandas', 'W3Schools']
  },

  // ==========================================
  // 6. BIG DATA ANALYTICS
  // ==========================================
  {
    id: 'big-data-hadoop-gfg',
    subject: 'Big Data Analytics',
    title: 'Hadoop Architecture, HDFS Distributed Storage & MapReduce Paradigm (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/big-data-hadoop-gfg',
    description: 'Characteristics of Big Data (5 V\'s), HDFS NameNode/DataNode architecture, block replication, and MapReduce WordCount.',
    downloadCount: 1120,
    tags: ['Big Data', 'Hadoop', 'HDFS', 'MapReduce', 'GeeksforGeeks']
  },
  {
    id: 'big-data-spark-gfg',
    subject: 'Big Data Analytics',
    title: 'Apache Spark & PySpark In-Memory Analytics & RDDs (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/big-data-spark-gfg',
    description: 'In-memory distributed computing, RDD transformations vs actions, Spark SQL DataFrames, and lazy evaluation engine.',
    downloadCount: 1260,
    tags: ['Big Data', 'Spark', 'PySpark', 'RDD', 'Spark SQL', 'GeeksforGeeks']
  },
  {
    id: 'big-data-mongodb-w3schools',
    subject: 'Big Data Analytics',
    title: 'NoSQL MongoDB Aggregation Pipeline & Document Store (W3Schools)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: '/resources/big-data-mongodb-w3schools',
    description: 'JSON document model, BSON data types, CRUD queries, multi-stage aggregation pipelines ($match, $group, $sort).',
    downloadCount: 1330,
    tags: ['MongoDB', 'NoSQL', 'Aggregation', 'JSON', 'W3Schools']
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
  // 7. CLOUD SERVICE MANAGEMENT & DEVOPS
  // ==========================================
  {
    id: 'cloud-computing-gfg',
    subject: 'Cloud Service Management',
    title: 'Cloud Computing Architectures, Service Models & Virtualization (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/cloud-computing-gfg',
    description: 'IaaS, PaaS, SaaS delivery models, public/private deployment models, hypervisors, and elastic cloud scalability.',
    downloadCount: 1180,
    tags: ['Cloud', 'IaaS', 'PaaS', 'SaaS', 'Virtualization', 'GeeksforGeeks']
  },
  {
    id: 'cloud-docker-gfg',
    subject: 'Cloud Service Management',
    title: 'Containerization with Docker & Container Orchestration (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/cloud-docker-gfg',
    description: 'Container virtualization vs VMs, Dockerfile syntax, layer caching, Docker Compose, and Kubernetes pod architectures.',
    downloadCount: 1420,
    tags: ['Docker', 'DevOps', 'Containers', 'Kubernetes', 'GeeksforGeeks']
  },
  {
    id: 'cloud-w3schools-aws',
    subject: 'Cloud Service Management',
    title: 'AWS Cloud Infrastructure & Serverless Microservices Guide (W3Schools)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: '/resources/cloud-w3schools-aws',
    description: 'AWS EC2 compute provisioning, S3 bucket storage policies, IAM roles, and event-driven AWS Lambda microservices.',
    downloadCount: 1390,
    tags: ['AWS', 'EC2', 'S3', 'Lambda', 'Serverless', 'W3Schools']
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
  // 8. COMPUTER NETWORKS
  // ==========================================
  {
    id: 'networks-architecture-gfg',
    subject: 'Computer Networks',
    title: 'OSI 7-Layer & TCP/IP Protocol Stack Reference (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/networks-architecture-gfg',
    description: 'Encapsulation and decapsulation, headers, CRC error detection, Sliding Window flow control, and IP subnetting.',
    downloadCount: 1240,
    tags: ['Networks', 'OSI Model', 'TCP/IP', 'CRC', 'GeeksforGeeks']
  },
  {
    id: 'networks-sockets-gfg',
    subject: 'Computer Networks',
    title: 'Network Socket Programming & Client-Server Architecture (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/networks-sockets-gfg',
    description: 'Berkeley sockets API, TCP 3-way handshake, reliable byte stream vs UDP datagram, and multi-client echo server in C.',
    downloadCount: 1310,
    tags: ['Networks', 'Sockets', 'TCP', 'UDP', 'Client-Server', 'GeeksforGeeks']
  },
  {
    id: 'networks-routing-gfg',
    subject: 'Computer Networks',
    title: 'Network Routing Algorithms — Dijkstra & Distance Vector (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/networks-routing-gfg',
    description: 'Link-state shortest path routing, Bellman-Ford distance vector updates, count-to-infinity problem, and routing tables.',
    downloadCount: 1170,
    tags: ['Networks', 'Routing', 'Dijkstra', 'Distance Vector', 'GeeksforGeeks']
  },
  {
    id: 'networks-w3schools',
    subject: 'Computer Networks',
    title: 'Computer Networking Basics & IP Subnetting Tutorial (W3Schools)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: '/resources/networks-w3schools',
    description: 'IPv4 vs IPv6 addressing, CIDR notation, subnet masks, DNS resolution, and HTTP/HTTPS protocol mechanics.',
    downloadCount: 1450,
    tags: ['Networks', 'Subnetting', 'IPv4', 'CIDR', 'DNS', 'W3Schools']
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
  // 9. C PROGRAMMING
  // ==========================================
  {
    id: 'c-programming-guide',
    subject: 'C Programming',
    title: 'C Programming Fundamentals & Structured Software Design (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/c-programming-guide',
    description: 'Compilation phases, data types, control flow, functions, call-by-value vs call-by-reference, and arrays.',
    downloadCount: 1680,
    tags: ['C Programming', 'Functions', 'Compilation', 'Arrays', 'GeeksforGeeks']
  },
  {
    id: 'c-pointers-gfg',
    subject: 'C Programming',
    title: 'Pointers, Dynamic Memory Allocation & Structs in C (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/c-pointers-gfg',
    description: 'Pointer arithmetic, dereferencing, heap memory (malloc, calloc, realloc, free), memory leaks, and linked structs.',
    downloadCount: 1590,
    tags: ['C Programming', 'Pointers', 'Dynamic Memory', 'Malloc', 'Structs', 'GeeksforGeeks']
  },
  {
    id: 'c-programming-w3schools',
    subject: 'C Programming',
    title: 'C Programming Syntax, Operators & File I/O Handbook (W3Schools)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: '/resources/c-programming-w3schools',
    description: 'Interactive syntax reference, operators, loops, string functions, file operations (fopen, fread, fwrite), and header files.',
    downloadCount: 1820,
    tags: ['C Programming', 'Syntax', 'File IO', 'Strings', 'W3Schools']
  },

  // ==========================================
  // 10. JAVA OBJECT-ORIENTED PROGRAMMING
  // ==========================================
  {
    id: 'java-oop-gfg',
    subject: 'Java OOP',
    title: 'Object-Oriented Programming Principles in Java (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/java-oop-gfg',
    description: 'The 4 pillars of OOP: Encapsulation, Inheritance (extends), Polymorphism (overloading/overriding), and Abstraction.',
    downloadCount: 1720,
    tags: ['Java', 'OOP', 'Inheritance', 'Polymorphism', 'Abstraction', 'GeeksforGeeks']
  },
  {
    id: 'java-collections-gfg',
    subject: 'Java OOP',
    title: 'Java Collections Framework & Generics Master Guide (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/java-collections-gfg',
    description: 'List, Set, Map hierarchies, ArrayList vs LinkedList, HashMap hashing collisions, TreeSet Red-Black trees, and Generics.',
    downloadCount: 1490,
    tags: ['Java', 'Collections', 'Generics', 'HashMap', 'ArrayList', 'GeeksforGeeks']
  },
  {
    id: 'java-oop-w3schools',
    subject: 'Java OOP',
    title: 'Java Classes, Interfaces & Exception Handling Tutorial (W3Schools)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: '/resources/java-oop-w3schools',
    description: 'Class syntax, constructors, access modifiers (public, private, protected), abstract classes vs interfaces, try-catch-finally.',
    downloadCount: 1640,
    tags: ['Java', 'Classes', 'Interfaces', 'Exceptions', 'W3Schools']
  },

  // ==========================================
  // 11. PYTHON PROGRAMMING
  // ==========================================
  {
    id: 'python-basics-gfg',
    subject: 'Python Programming',
    title: 'Python Language Fundamentals & Built-in Data Structures (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/python-basics-gfg',
    description: 'Dynamic typing, mutable vs immutable types, list comprehensions, dictionary hashing, tuple unpacking, and generators.',
    downloadCount: 1850,
    tags: ['Python', 'Basics', 'List Comprehensions', 'Dictionaries', 'GeeksforGeeks']
  },
  {
    id: 'python-oop-gfg',
    subject: 'Python Programming',
    title: 'Python Object-Oriented Programming & Magic Dunder Methods (GeeksforGeeks)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'GeeksforGeeks',
    format: 'Web Guide',
    fileUrl: '/resources/python-oop-gfg',
    description: 'Classes, __init__, self parameter, inheritance, Method Resolution Order (MRO), operator overloading, and decorators.',
    downloadCount: 1580,
    tags: ['Python', 'OOP', 'Dunder Methods', 'Decorators', 'MRO', 'GeeksforGeeks']
  },
  {
    id: 'python-w3schools',
    subject: 'Python Programming',
    title: 'Python Complete Syntax, Modules & Exception Handling Tutorial (W3Schools)',
    unit: 'All',
    type: 'Lab Material',
    provider: 'W3Schools',
    format: 'Interactive Tutorial',
    fileUrl: '/resources/python-w3schools',
    description: 'Clean Python syntax cheatsheet, built-in functions, lambda expressions, module imports, and file operations.',
    downloadCount: 1910,
    tags: ['Python', 'Syntax', 'Modules', 'Lambda', 'W3Schools']
  }
];
