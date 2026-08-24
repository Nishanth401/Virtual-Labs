export interface Lab {
  id: string;
  name: string;
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
}

export interface Discipline {
  id: string;
  name: string;
  description: string;
  icon: string;
  labsCount: number;
  color: string;
}

export const DISCIPLINES_DATA: Discipline[] = [
  {
    id: "cse",
    name: "Computer Science & Engineering",
    description: "Core algorithms, operating systems, compiler design, and software engineering simulations.",
    icon: "Code2",
    labsCount: 8,
    color: "from-blue-500/20 to-cyan-500/20 text-blue-500",
  },
  {
    id: "aids",
    name: "Artificial Intelligence & Data Science",
    description: "Machine learning models, neural networks, predictive analytics, and big data computing.",
    icon: "BrainCircuit",
    labsCount: 6,
    color: "from-purple-500/20 to-indigo-500/20 text-purple-500",
  },
  {
    id: "ece",
    name: "Electronics & Communication",
    description: "Digital signal processing, VLSI design, communication systems, and embedded hardware.",
    icon: "Radio",
    labsCount: 5,
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-500",
  },
  {
    id: "cloud",
    name: "Cloud & Distributed Computing",
    description: "Virtualization, distributed storage, load balancing, and container orchestration.",
    icon: "Cloud",
    labsCount: 4,
    color: "from-sky-500/20 to-blue-500/20 text-sky-500",
  },
  {
    id: "cyber",
    name: "Cyber Security & Networks",
    description: "Network protocols, cryptography algorithms, packet tracing, and vulnerability assessments.",
    icon: "ShieldCheck",
    labsCount: 4,
    color: "from-amber-500/20 to-orange-500/20 text-amber-500",
  },
  {
    id: "dbms",
    name: "Database Systems & Analytics",
    description: "Relational query optimization, normalization, indexing, and NoSQL architecture.",
    icon: "Database",
    labsCount: 5,
    color: "from-rose-500/20 to-pink-500/20 text-rose-500",
  },
];

export const LABS_DATA: Lab[] = [
  {
    id: "data-structures",
    name: "Data Structures - I Lab",
    discipline: "Computer Science & Engineering",
    disciplineSlug: "cse",
    shortDesc: "Master foundational linear and non-linear data structures with interactive step-by-step visualizations and runtime cost analysis.",
    description: "Welcome to the Data Structures Lab. Data Structures is a core subject in computer science curricula. This virtual lab allows students to interactively explore and visualize the mechanics of Stacks, Queues, Linked Lists, Sorting Algorithms, Trees, and Graph traversals, bridging theoretical knowledge with practical code execution.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Beginner",
    experimentsCount: 6,
    rating: 4.8,
    ratingsCount: 342,
    iconName: "Network",
    tags: ["Stacks", "Queues", "Linked Lists", "Sorting", "Algorithms"],
    bannerGradient: "from-blue-600 to-indigo-700",
  },
  {
    id: "ai-machine-learning",
    name: "Artificial Intelligence & ML Lab",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Implement supervised and unsupervised learning algorithms, decision trees, KNN, and regression models.",
    description: "Explore fundamental AI algorithms including heuristic search, regression, classification, clustering, and decision tree induction with interactive parameter tuning.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Intermediate",
    experimentsCount: 5,
    rating: 4.7,
    ratingsCount: 215,
    iconName: "Brain",
    tags: ["Regression", "Classification", "KNN", "Decision Trees"],
    bannerGradient: "from-purple-600 to-pink-700",
  },
  {
    id: "deep-learning",
    name: "Deep Learning & Neural Networks Lab",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Construct multi-layer perceptrons, train convolutional neural nets, and visualize gradient descent backpropagation.",
    description: "Interactive simulations for artificial neural networks, activation gates (ReLU, Sigmoid, Softmax), forward propagation, and backpropagation loss optimization.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Advanced",
    experimentsCount: 4,
    rating: 4.9,
    ratingsCount: 180,
    iconName: "Cpu",
    tags: ["ANN", "Backpropagation", "CNN", "Optimization"],
    bannerGradient: "from-violet-600 to-purple-800",
  },
  {
    id: "dbms-lab",
    name: "Database Management Systems Lab",
    discipline: "Database Systems & Analytics",
    disciplineSlug: "dbms",
    shortDesc: "Practice SQL query planning, B+ Tree indexing, relational normalization, and ACID transaction isolation.",
    description: "Interactive query execution engine and schema visualizer for mastering SQL queries, foreign key constraints, indexing structures, and transaction concurrency.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Computer Science & Engineering",
    difficulty: "Intermediate",
    experimentsCount: 5,
    rating: 4.6,
    ratingsCount: 198,
    iconName: "Database",
    tags: ["SQL", "Normalization", "B+ Trees", "Transactions"],
    bannerGradient: "from-rose-600 to-orange-700",
  },
  {
    id: "cloud-computing",
    name: "Cloud Architecture & Virtualization Lab",
    discipline: "Cloud & Distributed Computing",
    disciplineSlug: "cloud",
    shortDesc: "Simulate virtual machine provisioning, elastic load balancing, S3 bucket storage, and fault tolerance.",
    description: "Design and stress-test distributed cloud architectures with virtual compute nodes, load balancers, and distributed cache clusters.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Information Technology",
    difficulty: "Advanced",
    experimentsCount: 4,
    rating: 4.8,
    ratingsCount: 145,
    iconName: "CloudLightning",
    tags: ["AWS", "Load Balancing", "Virtualization", "S3 Storage"],
    bannerGradient: "from-sky-600 to-blue-800",
  },
  {
    id: "computer-networks",
    name: "Computer Networks & Protocols Lab",
    discipline: "Cyber Security & Networks",
    disciplineSlug: "cyber",
    shortDesc: "Simulate sliding window protocols, routing algorithms (Dijkstra, Bellman-Ford), and TCP/IP handshakes.",
    description: "Visual simulation of packet transmission, stop-and-wait ARQ, Go-Back-N, selective repeat protocols, and shortest-path routing topologies.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Electronics & Communication",
    difficulty: "Intermediate",
    experimentsCount: 4,
    rating: 4.7,
    ratingsCount: 160,
    iconName: "Share2",
    tags: ["TCP/IP", "Routing", "Dijkstra", "ARQ Protocols"],
    bannerGradient: "from-emerald-600 to-teal-800",
  },
];
