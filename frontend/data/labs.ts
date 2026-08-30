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
  },
];
