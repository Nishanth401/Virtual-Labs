export interface CourseItem {
  code: string;
  name: string;
  sem: number;
  credits: number;
  type: 'Foundation' | 'Core' | 'Advanced' | 'Elective';
  desc: string;
  resources: number;
  icon: string;
  isLab?: boolean;
  labUrl?: string;
}

export const COURSES_DATA: CourseItem[] = [
  // ==========================================
  // SEMESTER 1: C PROGRAMMING & FOUNDATIONS
  // ==========================================
  {
    code: 'CS101',
    name: 'Programming in C',
    sem: 1,
    credits: 3,
    type: 'Foundation',
    desc: 'Master C procedural foundations: formatted I/O, control structures, loops, 1D/2D arrays, pointers, dynamic memory (malloc/free), structs, and file streams.',
    resources: 38,
    icon: '💻',
    isLab: false,
  },
  {
    code: 'CS101L',
    name: 'C Programming Laboratory',
    sem: 1,
    credits: 1.5,
    type: 'Foundation',
    desc: 'Hands-on C laboratory covering control flow, nested loops, matrix operations, pointer arithmetic, structures, and file I/O operations.',
    resources: 26,
    icon: '💻',
    isLab: true,
    labUrl: '/labs/c-programming',
  },

  // ==========================================
  // SEMESTER 2: PYTHON PROGRAMMING & MATH
  // ==========================================
  {
    code: 'CS201',
    name: 'Problem Solving and Python Programming',
    sem: 2,
    credits: 3,
    type: 'Foundation',
    desc: 'Introduction to computational problem solving, dynamic typing, algorithmic thinking, built-in collections, lambdas, comprehensions, OOP principles, and Python fundamentals.',
    resources: 38,
    icon: '🐍',
    isLab: false,
  },
  {
    code: 'CS201L',
    name: 'Python Programming Laboratory',
    sem: 2,
    credits: 1.5,
    type: 'Foundation',
    desc: 'Hands-on Python laboratory exploring dynamic typing, lists/dicts, comprehensions, regex, object-oriented class hierarchies, exception handling, and file parsing.',
    resources: 28,
    icon: '🐍',
    isLab: true,
    labUrl: '/labs/python-programming',
  },

  // ==========================================
  // SEMESTER 3: DATA STRUCTURES & ANALYTICS
  // ==========================================
  {
    code: 'CS301',
    name: 'Data Structures',
    sem: 3,
    credits: 4,
    type: 'Core',
    desc: 'Master fundamental data structures and algorithms including linked lists, stacks, queues, trees, graphs, sorting, and dynamic programming.',
    resources: 46,
    icon: '🧮',
    isLab: false,
  },
  {
    code: 'CS301L',
    name: 'Data Structures and Algorithms Laboratory',
    sem: 3,
    credits: 1.5,
    type: 'Core',
    desc: 'Implementation of linear and non-linear data structures, tree traversals, shortest path algorithms, and algorithm complexity benchmarking in Java.',
    resources: 30,
    icon: '🧮',
    isLab: true,
    labUrl: '/labs/data-structures',
  },
  {
    code: 'CS302L',
    name: 'Fundamentals of Data Science and Analytics Lab',
    sem: 3,
    credits: 1.5,
    type: 'Foundation',
    desc: 'Practical exposure to data wrangling, cleaning, statistical analysis, and visual summaries using Python, NumPy, and Pandas.',
    resources: 18,
    icon: '📊',
    isLab: true,
  },

  // ==========================================
  // SEMESTER 4: DBMS & ALGORITHM DESIGN
  // ==========================================
  {
    code: 'CS401',
    name: 'Database Management Systems',
    sem: 4,
    credits: 3,
    type: 'Core',
    desc: 'Master relational database systems, SQL, normalization (1NF to BCNF), transaction concurrency control (ACID), indexing, and NoSQL concepts.',
    resources: 38,
    icon: '🗄️',
    isLab: false,
  },
  {
    code: 'CS401L',
    name: 'Database Management Systems Laboratory',
    sem: 4,
    credits: 1.5,
    type: 'Core',
    desc: 'Practical database design, normalization, complex SQL querying, PL/SQL triggers, views, and database schema implementation.',
    resources: 25,
    icon: '🗄️',
    isLab: true,
    labUrl: '/labs/dbms',
  },
  {
    code: 'CS402',
    name: 'Design and Analysis of Algorithms',
    sem: 4,
    credits: 3,
    type: 'Core',
    desc: 'Divide-and-conquer, greedy algorithms, dynamic programming, backtracking, branch-and-bound, and NP-completeness analysis.',
    resources: 34,
    icon: '⚡',
    isLab: false,
  },
  {
    code: 'CS402L',
    name: 'Design and Analysis of Algorithms Lab',
    sem: 4,
    credits: 1.5,
    type: 'Core',
    desc: 'Lab sessions for writing and analyzing time complexities of sorting, searching, graph traversals, and optimization algorithms.',
    resources: 26,
    icon: '⚡',
    isLab: true,
  },

  // ==========================================
  // SEMESTER 5: NETWORKS & OPERATING SYSTEMS
  // ==========================================
  {
    code: 'CS501',
    name: 'Computer Networks',
    sem: 5,
    credits: 3,
    type: 'Core',
    desc: 'Understand OSI layers, routing algorithms, TCP/IP socket programming, network security, and modern cloud networking protocols.',
    resources: 34,
    icon: '🌐',
    isLab: false,
  },
  {
    code: 'CS501L',
    name: 'Computer Networks Laboratory',
    sem: 5,
    credits: 1.5,
    type: 'Core',
    desc: 'Practical networking laboratory for socket programming, packet sniffing with Wireshark, routing simulation, and switching topologies.',
    resources: 20,
    icon: '🌐',
    isLab: true,
    labUrl: '/labs/networks',
  },
  {
    code: 'CS502',
    name: 'Operating Systems',
    sem: 5,
    credits: 3,
    type: 'Core',
    desc: 'Process management, CPU scheduling, inter-process communication, deadlock avoidance, memory paging, and virtual file systems.',
    resources: 35,
    icon: '🖥️',
    isLab: false,
  },
  {
    code: 'CS502L',
    name: 'Operating Systems Laboratory',
    sem: 5,
    credits: 1.5,
    type: 'Core',
    desc: 'Hands-on simulation of CPU scheduling (FCFS, SJF, RR), POSIX semaphores for producer-consumer, memory allocation, and paging.',
    resources: 22,
    icon: '🖥️',
    isLab: true,
    labUrl: '/labs/operating-systems',
  },

  // ==========================================
  // SEMESTER 6: MACHINE LEARNING & AI
  // ==========================================
  {
    code: 'CS601',
    name: 'Machine Learning',
    sem: 6,
    credits: 4,
    type: 'Advanced',
    desc: 'Learn supervised regression/classification, unsupervised clustering, dimensionality reduction, and reinforcement learning with real-world applications.',
    resources: 42,
    icon: '🧠',
    isLab: false,
  },
  {
    code: 'CS601L',
    name: 'Machine Learning Laboratory',
    sem: 6,
    credits: 1.5,
    type: 'Advanced',
    desc: 'Practical lab for implementing supervised and unsupervised machine learning models in Python using Scikit-Learn and NumPy.',
    resources: 28,
    icon: '🧠',
    isLab: true,
    labUrl: '/labs/machine-learning',
  },
  {
    code: 'CS602',
    name: 'Artificial Intelligence Principles',
    sem: 6,
    credits: 3,
    type: 'Advanced',
    desc: 'Informed state-space search (A*), Minimax with Alpha-Beta pruning, constraint satisfaction problems, and knowledge representation.',
    resources: 32,
    icon: '🤖',
    isLab: false,
  },
  {
    code: 'CS602L',
    name: 'Artificial Intelligence Laboratory',
    sem: 6,
    credits: 1.5,
    type: 'Advanced',
    desc: 'Interactive lab implementing search algorithms, game-playing agents, and constraint satisfaction solvers in Python.',
    resources: 20,
    icon: '🤖',
    isLab: true,
    labUrl: '/labs/artificial-intelligence',
  },

  // ==========================================
  // SEMESTER 7: DEEP LEARNING & BIG DATA
  // ==========================================
  {
    code: 'CS701',
    name: 'Deep Learning & Neural Networks',
    sem: 7,
    credits: 4,
    type: 'Advanced',
    desc: 'Explore deep neural networks, CNNs for computer vision, RNNs/LSTMs for sequence data, transformers, and large language models.',
    resources: 50,
    icon: '🔮',
    isLab: false,
  },
  {
    code: 'CS701L',
    name: 'Deep Learning Laboratory',
    sem: 7,
    credits: 1.5,
    type: 'Advanced',
    desc: 'Practical lab for implementing deep neural networks, CNN image classifiers, and transformer models in PyTorch and TensorFlow.',
    resources: 24,
    icon: '🔮',
    isLab: true,
  },
  {
    code: 'CS702',
    name: 'Big Data Analytics',
    sem: 7,
    credits: 3,
    type: 'Advanced',
    desc: 'Distributed computing architectures, Hadoop HDFS, MapReduce paradigms, Apache Spark streaming, and scalable NoSQL engines.',
    resources: 36,
    icon: '🐘',
    isLab: false,
  },
  {
    code: 'CS703L',
    name: 'Big Data Analytics Laboratory',
    sem: 7,
    credits: 1.5,
    type: 'Advanced',
    desc: 'Distributed computing lab implementing MapReduce jobs, HDFS commands, PySpark DataFrame manipulations, and streaming analytics.',
    resources: 22,
    icon: '🐘',
    isLab: true,
    labUrl: '/labs/big-data-analytics',
  },

  // ==========================================
  // SEMESTER 8: NLP & CLOUD COMPUTING
  // ==========================================
  {
    code: 'CS801',
    name: 'Natural Language Processing',
    sem: 8,
    credits: 4,
    type: 'Elective',
    desc: 'Text modeling, sentiment analysis, word embeddings, sequence-to-sequence transformers, and modern generative prompt engineering.',
    resources: 48,
    icon: '💬',
    isLab: false,
  },
  {
    code: 'CS802',
    name: 'Cloud Computing and DevOps',
    sem: 8,
    credits: 3,
    type: 'Elective',
    desc: 'Cloud architecture patterns, virtualization, containerization with Docker, Kubernetes orchestration, CI/CD pipelines, and AWS cloud management.',
    resources: 35,
    icon: '☁️',
    isLab: false,
  },
  {
    code: 'CS802L',
    name: 'Cloud Service Management Laboratory',
    sem: 8,
    credits: 1.5,
    type: 'Elective',
    desc: 'Configuring cloud compute instances, serverless functions, VPCs, network routing, Docker Compose clusters, and S3 bucket pipelines.',
    resources: 20,
    icon: '☁️',
    isLab: true,
    labUrl: '/labs/cloud-service-management',
  },
];
