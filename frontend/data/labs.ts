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
    description: "Department core curriculum encompassing Algorithmics, Machine Intelligence, Neural Computing, Database Architectures, and Network Protocols.",
    icon: "BrainCircuit",
    labsCount: 4,
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
];
