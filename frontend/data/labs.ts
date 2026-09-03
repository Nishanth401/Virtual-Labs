export interface LabResourceLink {
  title: string;
  source: "GeeksforGeeks" | "W3Schools" | "Official Docs" | "TutorialsPoint";
  url: string;
  description: string;
  category: string;
}

export interface LabVideoPart {
  id: string;
  partNumber: number;
  title: string;
  duration?: string;
  url: string;
  description: string;
}

export interface VideoTimestamp {
  time: string;
  seconds: number;
  title: string;
  url: string;
  category?: string;
}

export interface LabTamilVideo {
  url: string;
  title: string;
  description: string;
  duration?: string;
  channel?: string;
  timestamps?: VideoTimestamp[];
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
  videoParts: LabVideoPart[];
  tamilVideo?: LabTamilVideo;
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
    description: "Department core curriculum encompassing C Programming, Python Programming, Algorithmics, Machine Intelligence, Neural Computing, Database Architectures, Operating Systems, Data Science, OOPS, Big Data, Cloud Infrastructure, and Network Protocols.",
    icon: "BrainCircuit",
    labsCount: 12,
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
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    videoParts: [
      {
        id: "ds-part-1",
        partNumber: 1,
        title: "Part 1: NumPy & Multi-Dimensional Array Processing",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
        description: "Array indexing, multi-dimensional slicing, matrix multiplication, and vectorized ufuncs."
      },
      {
        id: "ds-part-2",
        partNumber: 2,
        title: "Part 2: Pandas DataFrames & Data Cleaning",
        duration: "50 mins",
        url: "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
        description: "Series, DataFrame manipulation, handling missing values with imputation, and GroupBy aggregations."
      },
      {
        id: "ds-part-3",
        partNumber: 3,
        title: "Part 3: Matplotlib & Seaborn Data Visualization",
        duration: "40 mins",
        url: "https://www.youtube-nocookie.com/embed/UO98lJQ3QGI",
        description: "Histograms, scatter plots, normal distribution curves, feature correlation heatmaps, and pair plots."
      },
      {
        id: "ds-part-4",
        partNumber: 4,
        title: "Part 4: Hypothesis Testing & Predictive Models",
        duration: "55 mins",
        url: "https://www.youtube-nocookie.com/embed/LHBE6Q9XlzI",
        description: "Formulation of Z-test, Student's T-test, One-way ANOVA, OLS Regression, and Time Series decomposition."
      }
    ],
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/fW4B07y04V4",
      title: "Data Science & Python Full Course in Tamil",
      description: "Comprehensive Tamil tutorial covering Python for data science, NumPy, Pandas, visualization, and statistical modeling.",
      duration: "Full Course"
    },
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
    videoParts: [
      {
        id: "cn-part-1",
        partNumber: 1,
        title: "Part 1: Network Fundamentals & OSI Architecture",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
        description: "OSI 7-layer model, TCP/IP stack architecture, packet headers, and encapsulation."
      },
      {
        id: "cn-part-2",
        partNumber: 2,
        title: "Part 2: Network Diagnostics & Wireshark Packet Analysis",
        duration: "40 mins",
        url: "https://www.youtube-nocookie.com/embed/lb1Dw0elw0Q",
        description: "tcpdump, netstat, traceroute, and packet capture dissection in Wireshark."
      },
      {
        id: "cn-part-3",
        partNumber: 3,
        title: "Part 3: TCP & UDP Socket Programming",
        duration: "50 mins",
        url: "https://www.youtube-nocookie.com/embed/3QhU9jd03a0",
        description: "Client-server TCP streams, HTTP web clients, multi-client chat, and UDP DNS simulation."
      },
      {
        id: "cn-part-4",
        partNumber: 4,
        title: "Part 4: Routing Protocols & CRC Error Detection",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/WlhT7Qsm4k8",
        description: "Distance Vector Routing, Link State Dijkstra, and Cyclic Redundancy Check (CRC)."
      }
    ],
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/yiIpBNBl4bc",
      title: "Computer Networks Full Course in Tamil",
      description: "Complete Tamil tutorial covering OSI layers, TCP/IP, IP addressing, routing algorithms, socket programming, and Wireshark analysis.",
      duration: "Full Course"
    },
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
        title: "W3Schools Networking & Protocols Reference",
        source: "W3Schools",
        url: "https://www.w3schools.com/cybersecurity/cybersecurity_network_basics.php",
        description: "IP addressing, subnets, ports, Wireshark packet anatomy, and HTTP/HTTPS handshakes.",
        category: "Network Fundamentals"
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
    description: "Welcome to the Machine Learning Virtual Laboratory. Master statistical learning paradigms through hands-on implementation: Candidate-Elimination version spaces, ID3 entropy trees, multilayer Backpropagation neural networks, Gaussian/Multinomial Naïve Bayes, Bayesian disease diagnosis networks, EM vs k-Means clustering, k-NN distance classifiers, and Locally Weighted Regression.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Advanced",
    experimentsCount: 9,
    rating: 4.94,
    ratingsCount: 395,
    iconName: "BrainCircuit",
    tags: ["Candidate-Elimination", "ID3 Trees", "Backpropagation", "Naïve Bayes", "EM vs k-Means", "k-NN", "LWR"],
    bannerGradient: "from-blue-700 via-indigo-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/coOTEc-0OGw",
    videoParts: [
      {
        id: "ml-part-1",
        partNumber: 1,
        title: "Part 1: Concept Learning & ID3 Decision Trees",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/coOTEc-0OGw",
        description: "Candidate-Elimination version space boundary updates and ID3 entropy calculation."
      },
      {
        id: "ml-part-2",
        partNumber: 2,
        title: "Part 2: Artificial Neural Networks & Backpropagation",
        duration: "55 mins",
        url: "https://www.youtube-nocookie.com/embed/aircAruvnKk",
        description: "Forward feed activation, loss gradient derivation, and backpropagation weight adjustments."
      },
      {
        id: "ml-part-3",
        partNumber: 3,
        title: "Part 3: Naïve Bayes Classifiers & Bayesian Networks",
        duration: "40 mins",
        url: "https://www.youtube-nocookie.com/embed/O2L2Uv9pdDA",
        description: "Gaussian Naïve Bayes on CSV data, text classification with NLP, and Bayesian networks."
      },
      {
        id: "ml-part-4",
        partNumber: 4,
        title: "Part 4: Clustering & Instance-Based Learning (k-NN / EM)",
        duration: "50 mins",
        url: "https://www.youtube-nocookie.com/embed/i_LwzRVP7bg",
        description: "Expectation-Maximization Gaussian Mixtures vs k-Means, k-NN on Iris, and Locally Weighted Regression."
      }
    ],
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/7eh4d6sabA0",
      title: "Machine Learning Full Course Tutorial (Python, Scikit-Learn, Decision Trees)",
      description: "Comprehensive tutorial covering machine learning fundamentals, data preprocessing, feature engineering, model training, train/test splitting, and decision tree visualization.",
      duration: "1 hour Full Course",
      channel: "Programming with Mosh",
      timestamps: [
        { time: "00:00", seconds: 0, title: "Introduction & What is Machine Learning?", url: "https://www.youtube.com/watch?v=7eh4d6sabA0", category: "Core Concepts" },
        { time: "03:06", seconds: 186, title: "Machine Learning in Action", url: "https://www.youtube.com/watch?v=7eh4d6sabA0&t=186s", category: "Core Concepts" },
        { time: "05:01", seconds: 301, title: "Libraries & Tools (NumPy, Pandas, Scikit-Learn)", url: "https://www.youtube.com/watch?v=7eh4d6sabA0&t=301s", category: "Environment" },
        { time: "08:44", seconds: 524, title: "Importing a Data Set with Pandas", url: "https://www.youtube.com/watch?v=7eh4d6sabA0&t=524s", category: "Data Preparation" },
        { time: "12:56", seconds: 776, title: "Preparing Features (X) & Target Labels (y)", url: "https://www.youtube.com/watch?v=7eh4d6sabA0&t=776s", category: "Data Preparation" },
        { time: "17:15", seconds: 1035, title: "Learning & Predicting with DecisionTreeClassifier", url: "https://www.youtube.com/watch?v=7eh4d6sabA0&t=1035s", category: "Model Training" },
        { time: "22:20", seconds: 1340, title: "Calculating Accuracy Score with train_test_split", url: "https://www.youtube.com/watch?v=7eh4d6sabA0&t=1340s", category: "Model Evaluation" },
        { time: "28:18", seconds: 1698, title: "Model Persistence (Joblib Dump & Load)", url: "https://www.youtube.com/watch?v=7eh4d6sabA0&t=1698s", category: "Deployment" },
        { time: "33:45", seconds: 2025, title: "Visualizing a Decision Tree Graph (DOT File)", url: "https://www.youtube.com/watch?v=7eh4d6sabA0&t=2025s", category: "Visualization" }
      ]
    },
    semester: "Semester 4",
    resources: [
      {
        title: "GeeksforGeeks Machine Learning Tutorial & Algorithms Guide",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/machine-learning/",
        description: "Supervised and unsupervised learning, mathematical formulations, and Python implementations.",
        category: "Machine Learning"
      },
      {
        title: "Decision Tree & ID3 Algorithm Implementation with Entropy",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/decision-tree-introduction-example/",
        description: "Shannon entropy, Information Gain, and decision boundary visualization.",
        category: "Decision Trees"
      },
      {
        title: "Backpropagation in Neural Networks Explained with Math",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/backpropagation-in-neural-network/",
        description: "Chain rule gradient derivations, forward pass activations, and weight updates.",
        category: "Neural Networks"
      },
      {
        title: "W3Schools Machine Learning & Python SciKit-Learn Suite",
        source: "W3Schools",
        url: "https://www.w3schools.com/python/python_ml_getting_started.asp",
        description: "Train/test split, confusion matrix, AUC-ROC evaluation, and k-Means clustering.",
        category: "Interactive ML"
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
    shortDesc: "Simulate UNIX commands, fork/exec/exit process calls, CPU scheduling (FCFS/SJF/RR), semaphores, Banker's deadlock avoidance, paging, and disk scheduling.",
    description: "Interactive virtual laboratory simulating UNIX POSIX system calls, CPU scheduling policies (FCFS, SJF, Priority, Round Robin), Inter-Process Communication with pipes/shared memory, synchronization semaphores, Banker's Algorithm safety vectors, page replacement algorithms, and disk head scheduling.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Intermediate",
    experimentsCount: 15,
    rating: 4.93,
    ratingsCount: 362,
    iconName: "Cpu",
    tags: ["CPU Scheduling", "System Calls", "Semaphores", "Banker's Algorithm", "Paging", "Disk Scheduling"],
    bannerGradient: "from-cyan-700 via-blue-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/26QPDBe-NB8",
    videoParts: [
      {
        id: "os-part-1",
        partNumber: 1,
        title: "Part 1: Process System Calls & Shell Scripting",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/26QPDBe-NB8",
        description: "UNIX commands, shell scripts, fork(), exec(), getpid(), wait(), and exit() system calls."
      },
      {
        id: "os-part-2",
        partNumber: 2,
        title: "Part 2: CPU Scheduling & Gantt Charts",
        duration: "50 mins",
        url: "https://www.youtube-nocookie.com/embed/ewp_mR0_vS8",
        description: "FCFS, SJF, Priority, and Round Robin scheduling algorithms with waiting time metrics."
      },
      {
        id: "os-part-3",
        partNumber: 3,
        title: "Part 3: Inter-Process Communication & Synchronization",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/ukM_zzrIeXs",
        description: "Pipes, shared memory, message queues, and semaphore synchronization (Producer-Consumer)."
      },
      {
        id: "os-part-4",
        partNumber: 4,
        title: "Part 4: Deadlocks, Memory Paging & Disk Scheduling",
        duration: "55 mins",
        url: "https://www.youtube-nocookie.com/embed/6i3NGkWxYlg",
        description: "Banker's deadlock avoidance, FIFO/LRU/Optimal page replacement, and FCFS/SSTF/SCAN disk scheduling."
      }
    ],
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/bkSWJJZNgf8",
      title: "Operating Systems Full Course in Tamil",
      description: "Complete Tamil tutorial covering process lifecycles, CPU scheduling, semaphores, deadlocks, and virtual memory paging.",
      duration: "Full Course"
    },
    semester: "Semester 4",
    resources: [
      {
        title: "GeeksforGeeks Operating Systems Tutorial & Memory Virtualization",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/operating-systems/",
        description: "Process lifecycle, scheduling metrics, paging, virtual memory, and file systems.",
        category: "Operating Systems"
      },
      {
        title: "CPU Scheduling Algorithms: FCFS, SJF, Priority & Round Robin",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/",
        description: "Gantt charts, waiting times, turnaround times, and starvation prevention.",
        category: "CPU Scheduling"
      },
      {
        title: "Banker's Algorithm for Deadlock Avoidance in C",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/",
        description: "Allocation, Max, and Need matrices with safe sequence verification.",
        category: "Deadlocks"
      },
      {
        title: "W3Schools Linux & Shell Scripting Guide",
        source: "W3Schools",
        url: "https://www.w3schools.com/bash/",
        description: "Shell variables, bash loops, POSIX commands, and file permissions.",
        category: "Shell Scripting"
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
    description: "Hands-on Object-Oriented Programming virtual laboratory focusing on robust Java class design: Student grade calculators, banking encapsulation, inheritance hierarchies, matrix spiral/wave traversals, Kadane's algorithm, custom exceptions, Java Collections, and JDBC database persistence.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Intermediate",
    experimentsCount: 15,
    rating: 4.97,
    ratingsCount: 450,
    iconName: "Code2",
    tags: ["Java OOP", "Inheritance", "Polymorphism", "Recursion", "Collections", "JDBC Streams"],
    bannerGradient: "from-rose-700 via-red-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
    videoParts: [
      {
        id: "java-part-1",
        partNumber: 1,
        title: "Part 1: Java OOP Foundations & Encapsulation",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
        description: "Class creation, instance variables, methods, constructors, and encapsulation principles."
      },
      {
        id: "java-part-2",
        partNumber: 2,
        title: "Part 2: Inheritance & Polymorphic Design",
        duration: "50 mins",
        url: "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
        description: "Single, multilevel, hierarchical inheritance, method overriding, and dynamic method dispatch."
      },
      {
        id: "java-part-3",
        partNumber: 3,
        title: "Part 3: Exception Handling & File I/O Streams",
        duration: "40 mins",
        url: "https://www.youtube-nocookie.com/embed/1W_kHlA6IUk",
        description: "try-catch-finally, custom business exceptions, FileReader, and BufferedReader I/O."
      },
      {
        id: "java-part-4",
        partNumber: 4,
        title: "Part 4: Collections Framework & JDBC Connectivity",
        duration: "55 mins",
        url: "https://www.youtube-nocookie.com/embed/vggeAELp_Yk",
        description: "ArrayList, HashMap, Stream API filters, and JDBC PreparedStatement database CRUD."
      }
    ],
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/nqB3qAtDLKU",
      title: "Object Oriented Programming with Java in Tamil",
      description: "Complete Tamil tutorial covering classes, objects, inheritance, polymorphism, abstraction, exception handling, and Java collections.",
      duration: "Full Course"
    },
    semester: "Semester 3",
    resources: [
      {
        title: "GeeksforGeeks Java Programming Language & OOP Concepts",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/java/",
        description: "Classes, Encapsulation, Inheritance, Interfaces, Abstract Classes, and JVM internals.",
        category: "Java OOP"
      },
      {
        title: "Java Collections Framework (ArrayList, HashMap, LinkedList)",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/collections-in-java-2/",
        description: "Collection interfaces, iterators, comparator sorting, and Stream API.",
        category: "Java Collections"
      },
      {
        title: "W3Schools Java Tutorial & Interactive Code Sandbox",
        source: "W3Schools",
        url: "https://www.w3schools.com/java/",
        description: "Syntax, methods, constructors, polymorphism, packages, and file handling.",
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
    description: "The core foundational Data Structures & Algorithms virtual laboratory: dynamic linked allocations, stack/queue ADTs, binary search trees, self-balancing AVL trees, Trie prefix trees, B/B+ trees, Dijkstra shortest paths, Minimum Spanning Trees (Prim's & Kruskal's), and hash tables with separate chaining.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Intermediate",
    experimentsCount: 15,
    rating: 4.95,
    ratingsCount: 420,
    iconName: "Layers",
    tags: ["Linked Lists", "Stacks & Queues", "BST & AVL Tree", "B-Trees", "Graphs", "Sorting & Hashing"],
    bannerGradient: "from-purple-700 via-indigo-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    videoParts: [
      {
        id: "dsa-part-1",
        partNumber: 1,
        title: "Part 1: Linear Structures (Linked Lists & Stacks)",
        duration: "50 mins",
        url: "https://www.youtube-nocookie.com/embed/8hly31xKli0",
        description: "Singly, Doubly, Circular Linked Lists, Infix-to-Postfix, and Stack Parentheses validation."
      },
      {
        id: "dsa-part-2",
        partNumber: 2,
        title: "Part 2: Queues, Circular Buffers & Monotonic Deques",
        duration: "40 mins",
        url: "https://www.youtube-nocookie.com/embed/okr-XE8yTO8",
        description: "Circular Queue implementation, Priority Queues, and Sliding Window Maximum with Deques."
      },
      {
        id: "dsa-part-3",
        partNumber: 3,
        title: "Part 3: Search Trees & Balanced Structures (BST/AVL)",
        duration: "55 mins",
        url: "https://www.youtube-nocookie.com/embed/q4LwtVojPO0",
        description: "Binary Search Tree insertion/deletion, AVL Tree balancing rotations, and Trie prefix trees."
      },
      {
        id: "dsa-part-4",
        partNumber: 4,
        title: "Part 4: Graphs, Shortest Path & Sorting",
        duration: "50 mins",
        url: "https://www.youtube-nocookie.com/embed/09_LlHjoEiY",
        description: "BFS/DFS traversals, Dijkstra shortest path, Minimum Spanning Trees, Quick/Merge Sort, and Hashing."
      }
    ],
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/YZVF4ehkn24",
      title: "Data Structures and Algorithms Complete Tutorial in Tamil",
      description: "Complete DSA lecture series in Tamil covering linear arrays, linked lists, stacks, queues, trees, graphs, and sorting algorithms.",
      duration: "Full Course"
    },
    semester: "Semester 3",
    resources: [
      {
        title: "GeeksforGeeks Data Structures & Algorithms Complete Guide",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/data-structures/",
        description: "Linear and hierarchical data structures, Big-O asymptotic notations, and LeetCode problems.",
        category: "DSA Fundamentals"
      },
      {
        title: "Tree Data Structures: BST, AVL Tree Rotations & B-Trees",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/",
        description: "Insertion, deletion, tree balancing rotations, and disk-oriented multi-way indexing.",
        category: "Trees & Graphs"
      },
      {
        title: "W3Schools Data Structures & Algorithms Handbook",
        source: "W3Schools",
        url: "https://www.w3schools.com/dsa/",
        description: "Interactive visual diagrams, step-by-step algorithms, and animated simulations.",
        category: "Interactive DSA"
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
    description: "Welcome to the Database Management System Virtual Laboratory. Master relational schema design with integrity constraints, advanced SQL query optimizations (Joins, Correlated Subqueries, B-Tree Indexes), PL/SQL programming with explicit cursors, parameterized stored procedures, automated database triggers, and ACID transaction control.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Intermediate",
    experimentsCount: 10,
    rating: 4.93,
    ratingsCount: 312,
    iconName: "Database",
    tags: ["SQL DDL/DML", "Joins & Subqueries", "Views & Indexes", "PL/SQL", "Procedures & Triggers", "ACID TCL"],
    bannerGradient: "from-emerald-700 via-teal-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
    videoParts: [
      {
        id: "dbms-part-1",
        partNumber: 1,
        title: "Part 1: Relational Modeling, DDL & Integrity Constraints",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
        description: "CREATE TABLE schemas, primary keys, foreign key cascading, and domain validation."
      },
      {
        id: "dbms-part-2",
        partNumber: 2,
        title: "Part 2: SQL DML Queries, Aggregates & Group By",
        duration: "50 mins",
        url: "https://www.youtube-nocookie.com/embed/7S_tz1z_5bA",
        description: "SELECT queries with WHERE filtering, GROUP BY aggregations, HAVING, and ORDER BY."
      },
      {
        id: "dbms-part-3",
        partNumber: 3,
        title: "Part 3: Complex Multi-Table Joins & B-Tree Indexes",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/9yeOJ0ZMUYw",
        description: "Inner, Left, Outer Joins, Correlated Subqueries, Views, and B-Tree EXPLAIN plans."
      },
      {
        id: "dbms-part-4",
        partNumber: 4,
        title: "Part 4: PL/SQL Cursors, Procedures, Triggers & ACID",
        duration: "55 mins",
        url: "https://www.youtube-nocookie.com/embed/4yK_9s4O60A",
        description: "PL/SQL Blocks, Explicit Cursors, Stored Procedures/Functions, Triggers, and TCL ACID transactions."
      }
    ],
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/wsYx5qOP_bI",
      title: "Database Management Systems Full Course in Tamil",
      description: "Complete Tamil DBMS tutorial covering SQL DDL/DML, joins, subqueries, relational normal forms, and PL/SQL programming.",
      duration: "Full Course"
    },
    semester: "Semester 3",
    resources: [
      {
        title: "GeeksforGeeks DBMS Complete Course & SQL Queries",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/dbms/",
        description: "Relational algebra, ER diagrams, normalization (1NF to BCNF), and concurrency control.",
        category: "Database Systems"
      },
      {
        title: "PL/SQL Programming: Cursors, Procedures & Triggers",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/pl-sql-introduction/",
        description: "Control structures, explicit cursor loops, stored functions, and row-level triggers.",
        category: "PL/SQL"
      },
      {
        title: "W3Schools SQL Tutorial & Interactive Database Editor",
        source: "W3Schools",
        url: "https://www.w3schools.com/sql/",
        description: "SELECT queries, JOINs, GROUP BY aggregations, and constraint syntax.",
        category: "Interactive SQL"
      }
    ]
  },
  {
    id: "c-programming",
    code: "CS3151",
    name: "C Programming Laboratory",
    shortTitle: "CPL",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Master C procedural foundations: formatted I/O, control flow, loops, 1D/2D arrays, pointers, memory allocation (malloc/free), structs, and file streams.",
    description: "Hands-on C Programming Virtual Laboratory providing an interactive workspace covering primitive data types, formatted I/O, conditionals, loops and pattern generation, 1D/2D array matrix mathematics, string manipulation, recursion and Euclidean GCD, pointer dereferencing, dynamic memory management (malloc, calloc, realloc, free), heterogeneous structures, and disk file I/O operations.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Beginner",
    experimentsCount: 10,
    rating: 4.94,
    ratingsCount: 310,
    iconName: "Code2",
    tags: ["C Programming", "Pointers", "malloc/free", "Structures", "File I/O", "Recursion", "Matrices"],
    bannerGradient: "from-cyan-700 via-blue-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
    videoParts: [
      {
        id: "c-part-1",
        partNumber: 1,
        title: "Part 1: C Syntax, Formatted I/O & Control Flow",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
        description: "printf, scanf, format specifiers, primitive types, if-else ladders, and switch-case branching."
      },
      {
        id: "c-part-2",
        partNumber: 2,
        title: "Part 2: Loops, Prime Checking & Pattern Generation",
        duration: "40 mins",
        url: "https://www.youtube-nocookie.com/embed/irqbmMNs2Bo",
        description: "for, while, do-while loops, prime number checking in O(sqrt(n)), and nested star pyramids."
      },
      {
        id: "c-part-3",
        partNumber: 3,
        title: "Part 3: Arrays, Matrix Mathematics & Strings",
        duration: "50 mins",
        url: "https://www.youtube-nocookie.com/embed/vLnPwxZdW4Y",
        description: "1D array statistics, 2D matrix multiplication, and null-terminated string functions."
      },
      {
        id: "c-part-4",
        partNumber: 4,
        title: "Part 4: Pointers, Dynamic Memory & File Handling",
        duration: "55 mins",
        url: "https://www.youtube-nocookie.com/embed/zuegQmMdy8M",
        description: "Pointer arithmetic, malloc/free heap management, typedef structures, and fopen/fprintf file I/O."
      }
    ],
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/Zi_n_mE3pEM",
      title: "C Programming Language Complete Tutorial in Tamil",
      description: "Complete C programming course in Tamil covering data types, control flow, functions, pointers, arrays, memory management, and file streams.",
      duration: "Full Course"
    },
    semester: "Semester 1",
    resources: [
      {
        title: "C Programming Tutorial — Complete Handbook",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c-programming-language/",
        description: "Comprehensive guide covering C fundamentals, pointers, dynamic memory, structures, and file streams.",
        category: "C Basics"
      },
      {
        title: "Dynamic Memory Allocation in C (malloc, calloc, free)",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/dynamic-memory-allocation-in-c-using-malloc-calloc-free-and-realloc/",
        description: "Heap allocation, pointer arithmetic, and memory leak prevention.",
        category: "Memory Management"
      }
    ]
  },
  {
    id: "python-programming",
    code: "GE3171",
    name: "Python Programming Laboratory",
    shortTitle: "PPL",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Explore dynamic typing, loops, lambdas, extended string slicing, lists/tuples/dicts, OOP classes, custom exceptions, and file handling.",
    description: "Interactive Python Programming Virtual Laboratory exploring dynamic type models, conditionals and loops, function parameter packing (*args, **kwargs) and lambdas, string slicing and regex, built-in collections (Lists, Tuples, Sets, Dictionaries), list/dict comprehensions, object-oriented class hierarchies and dunder methods, custom exception handlers, and CSV/file context managers.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Beginner",
    experimentsCount: 10,
    rating: 4.96,
    ratingsCount: 380,
    iconName: "Code2",
    tags: ["Python", "OOP", "List Comprehensions", "Lambdas", "File I/O", "Exceptions", "Dictionaries"],
    bannerGradient: "from-emerald-700 via-teal-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
    videoParts: [
      {
        id: "py-part-1",
        partNumber: 1,
        title: "Part 1: Python Basics, Dynamic Typing & Operators",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
        description: "Dynamic variable binding, arbitrary precision integers, boolean logic, and formatted f-strings."
      },
      {
        id: "py-part-2",
        partNumber: 2,
        title: "Part 2: Control Structures, Functions & Lambdas",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/8DvywoWv6fI",
        description: "if-elif-else, range-based for loops, while, *args/**kwargs packing, and lambda expressions."
      },
      {
        id: "py-part-3",
        partNumber: 3,
        title: "Part 3: Lists, Comprehensions, Tuples & Dictionaries",
        duration: "50 mins",
        url: "https://www.youtube-nocookie.com/embed/daefaLgNkw0",
        description: "2D matrix transposition, list/dict comprehensions, set algebra, and word frequency histograms."
      },
      {
        id: "py-part-4",
        partNumber: 4,
        title: "Part 4: Object Oriented Programming & File Handling",
        duration: "50 mins",
        url: "https://www.youtube-nocookie.com/embed/JeznW_7DlB0",
        description: "Classes, super() inheritance, custom exceptions, and with open() CSV context managers."
      }
    ],
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/KCdbwcjyHvA",
      title: "Python Programming Complete Tutorial in Tamil",
      description: "Full Python course in Tamil covering language basics, data structures, list comprehensions, OOP principles, exception handling, and file operations.",
      duration: "Full Course"
    },
    semester: "Semester 1",
    resources: [
      {
        title: "Python Programming Tutorial & Reference Manual",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/python-programming-language/",
        description: "Core syntax, data structures, list comprehensions, OOP, and exception handling.",
        category: "Python Basics"
      },
      {
        title: "Python Official Documentation & Standard Library",
        source: "Official Docs",
        url: "https://docs.python.org/3/",
        description: "Comprehensive standard library documentation, built-in functions, and file I/O utilities.",
        category: "Documentation"
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
    description: "The Artificial Intelligence Virtual Laboratory explores automated problem solving, informed search strategies (A* search with Manhattan heuristic on 8-puzzle), game tree evaluation with Minimax & Alpha-Beta pruning, Backtracking CSP solvers (N-Queens), and logical reasoning inference engines.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Advanced",
    experimentsCount: 5,
    rating: 4.95,
    ratingsCount: 410,
    iconName: "Bot",
    tags: ["A* Search", "Minimax", "Alpha-Beta Pruning", "N-Queens", "Expert Systems"],
    bannerGradient: "from-purple-700 via-indigo-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/Jc7vlAzOigA",
    videoParts: [
      {
        id: "ai-part-1",
        partNumber: 1,
        title: "Part 1: Problem Formulation & State-Space Search",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/Jc7vlAzOigA",
        description: "State-space graph traversal, puzzle formulation, and uninformed search strategies."
      },
      {
        id: "ai-part-2",
        partNumber: 2,
        title: "Part 2: Informed A* Search & Manhattan Heuristics",
        duration: "40 mins",
        url: "https://www.youtube-nocookie.com/embed/d3b0_5P2v80",
        description: "Evaluation function f(n) = g(n) + h(n), priority queues, and 8-puzzle optimal solvers."
      },
      {
        id: "ai-part-3",
        partNumber: 3,
        title: "Part 3: Adversarial Minimax & Alpha-Beta Pruning",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/l-hh51ncgDI",
        description: "Game tree evaluation, zero-sum utilities, and alpha-beta branch pruning optimization."
      },
      {
        id: "ai-part-4",
        partNumber: 4,
        title: "Part 4: Constraint Satisfaction & Knowledge Systems",
        duration: "50 mins",
        url: "https://www.youtube-nocookie.com/embed/V4vY3g2_f4w",
        description: "N-Queens backtracking CSP solvers, forward/backward chaining inference engines."
      }
    ],
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/k2gYQ9c9Yl4",
      title: "Artificial Intelligence & Search Algorithms in Tamil",
      description: "Complete Tamil guide covering state space search, A* heuristic algorithms, Minimax, and knowledge representation.",
      duration: "Full Course"
    },
    semester: "Semester 5",
    resources: [
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
    videoParts: [
      {
        id: "bd-part-1",
        partNumber: 1,
        title: "Part 1: Hadoop HDFS & Distributed Node Architecture",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/1vbXmCrkT3Y",
        description: "NameNode metadata, DataNodes, 128MB block chunks, and 3x fault-tolerant replication."
      },
      {
        id: "bd-part-2",
        partNumber: 2,
        title: "Part 2: Distributed MapReduce Parallel Processing",
        duration: "50 mins",
        url: "https://www.youtube-nocookie.com/embed/bAymDD_c9_s",
        description: "Map phase key-value emission, shuffle/sort partitioner, and Reducer aggregation."
      },
      {
        id: "bd-part-3",
        partNumber: 3,
        title: "Part 3: Apache Spark RDDs & PySpark DataFrames",
        duration: "50 mins",
        url: "https://www.youtube-nocookie.com/embed/_C8kWso4ne4",
        description: "In-memory distributed computing, DAG execution plans, and PySpark SQL aggregations."
      },
      {
        id: "bd-part-4",
        partNumber: 4,
        title: "Part 4: NoSQL Databases & MongoDB Aggregations",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/ofme2o29ngU",
        description: "BSON document schemas, multi-stage aggregation pipelines, and sharding."
      }
    ],
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/rR9aGkZ-RZs",
      title: "Big Data Analytics & Hadoop Course in Tamil",
      description: "Comprehensive Tamil tutorial covering HDFS, MapReduce paradigms, Apache Spark, and MongoDB.",
      duration: "Full Course"
    },
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
    videoParts: [
      {
        id: "cloud-part-1",
        partNumber: 1,
        title: "Part 1: Cloud Foundations, AWS EC2 & Virtual Private Clouds",
        duration: "45 mins",
        url: "https://www.youtube-nocookie.com/embed/2LaAJq1lB1Q",
        description: "Elastic Compute Cloud (EC2) virtual machines, VPC subnets, and Security Groups."
      },
      {
        id: "cloud-part-2",
        partNumber: 2,
        title: "Part 2: AWS S3 Scalable Storage & Lifecycle Policies",
        duration: "40 mins",
        url: "https://www.youtube-nocookie.com/embed/e6w9UP449Sg",
        description: "Object storage buckets, IAM access control, and automated lifecycle archive transitions."
      },
      {
        id: "cloud-part-3",
        partNumber: 3,
        title: "Part 3: Docker Containerization & Multi-Tier Compose",
        duration: "50 mins",
        url: "https://www.youtube-nocookie.com/embed/fqMOX6JJhGo",
        description: "Building lightweight Docker images, multi-container Docker Compose networks, and port mapping."
      },
      {
        id: "cloud-part-4",
        partNumber: 4,
        title: "Part 4: Serverless AWS Lambda & Kubernetes Orchestration",
        duration: "55 mins",
        url: "https://www.youtube-nocookie.com/embed/X48VuDVv0do",
        description: "Event-driven serverless computing with Lambda, API Gateway, and Kubernetes Pod deployments."
      }
    ],
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/aYhE1sC6mGg",
      title: "Cloud Computing & AWS Masterclass in Tamil",
      description: "Complete Tamil guide covering AWS cloud infrastructure, EC2 instances, S3 storage, Docker containerization, and Kubernetes.",
      duration: "Full Course"
    },
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
