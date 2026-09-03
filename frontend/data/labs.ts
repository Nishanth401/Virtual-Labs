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

export interface LabPlaylist {
  title: string;
  url: string;
  embedUrl?: string;
  channel?: string;
  language: "Tamil" | "English" | "Bilingual";
  videoCount?: string;
  description?: string;
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
  videoParts?: LabVideoPart[];
  tamilVideo?: LabTamilVideo;
  playlists?: LabPlaylist[];
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
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/k6HOBjkUkE4",
      title: "Data Science & Analytics 18+ Hour Masterclass in Tamil (AI Coach John)",
      description: "Complete 18+ hour masterclass in Tamil covering Python foundations, Pandas deep dive, data cleaning & visualization, statistics & hypothesis testing, Linear & Logistic Regression, Streamlit deployment, and K-Means clustering.",
      duration: "18h 15m (21 Chapters)",
      channel: "AI Coach John",
      timestamps: [
        { time: "00:00", seconds: 0, title: "Introduction", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4", category: "Course Overview" },
        { time: "03:58", seconds: 238, title: "My Gift for You", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=238s", category: "Course Overview" },
        { time: "10:36", seconds: 636, title: "Agenda of the Course", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=636s", category: "Course Overview" },
        { time: "14:20", seconds: 860, title: "Who is AI Coach John?", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=860s", category: "Course Overview" },
        { time: "31:29", seconds: 1889, title: "Python Installation and Exploration", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=1889s", category: "Python Foundations" },
        { time: "46:58", seconds: 2818, title: "Python Basics + Data Types", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=2818s", category: "Python Foundations" },
        { time: "1:05:32", seconds: 3932, title: "For Loop & While Loop", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=3932s", category: "Python Foundations" },
        { time: "1:18:30", seconds: 4710, title: "Conditional Statements and Functions", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=4710s", category: "Python Foundations" },
        { time: "2:03:35", seconds: 7415, title: "Python Libraries – Complete Explanation in Tamil", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=7415s", category: "Python Foundations" },
        { time: "2:43:48", seconds: 9828, title: "Recap + Python Data Structures", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=9828s", category: "Python Foundations" },
        { time: "4:30:29", seconds: 16229, title: "Data Analyst Tool – Pandas Deep Dive", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=16229s", category: "Data Analysis" },
        { time: "6:35:48", seconds: 23748, title: "Data Cleaning Techniques", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=23748s", category: "Data Analysis" },
        { time: "8:12:22", seconds: 29542, title: "Data Visualization", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=29542s", category: "Data Analysis" },
        { time: "10:22:40", seconds: 37360, title: "Statistics", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=37360s", category: "Statistics & Math" },
        { time: "11:30:45", seconds: 41445, title: "Hypothesis and Statistical Testing", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=41445s", category: "Statistics & Math" },
        { time: "13:24:09", seconds: 48249, title: "Machine Learning Introduction", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=48249s", category: "Machine Learning Core" },
        { time: "13:59:36", seconds: 50376, title: "Linear Regression in Tamil", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=50376s", category: "Machine Learning Core" },
        { time: "15:34:20", seconds: 56060, title: "Logistic Regression", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=56060s", category: "Machine Learning Core" },
        { time: "16:02:06", seconds: 57726, title: "Streamlit Deployment", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=57726s", category: "Deployment" },
        { time: "17:16:45", seconds: 62205, title: "K-Means Clustering", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=62205s", category: "Unsupervised Learning" },
        { time: "18:11:51", seconds: 65511, title: "Conclusion (Final Words)", url: "https://www.youtube.com/watch?v=k6HOBjkUkE4&t=65511s", category: "Summary & Wrap Up" }
      ]
    },
    playlists: [
      {
        title: "Data Science & Analytics 18+ Hour Master Course (Tamil)",
        url: "https://www.youtube.com/watch?v=k6HOBjkUkE4",
        embedUrl: "https://www.youtube-nocookie.com/embed/k6HOBjkUkE4",
        language: "Tamil",
        channel: "AI Coach John",
        videoCount: "21 Chapters",
        description: "Python, Pandas, Data Cleaning, Visualization, Statistics, Regression, and Deployment."
      },
      {
        title: "Python Data Science, NumPy & Pandas Complete Tutorial (English)",
        url: "https://www.youtube.com/watch?v=QUT1VHiLmmI",
        embedUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
        language: "English",
        channel: "FreeCodeCamp",
        videoCount: "Full Course",
        description: "Comprehensive statistical computing with NumPy arrays, Pandas DataFrames, and Matplotlib."
      }
    ],
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
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/yiIpBNBl4bc",
      title: "Computer Networks Full Course in Tamil",
      description: "Complete Tamil tutorial covering OSI layers, TCP/IP, IP addressing, routing algorithms, socket programming, and Wireshark analysis.",
      duration: "Full Course"
    },
    playlists: [
      {
        title: "Computer Networks Complete Lectures Playlist (English)",
        url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx",
        language: "English",
        channel: "Neso Academy",
        videoCount: "Full Playlist Series",
        description: "OSI model, TCP/IP architecture, socket programming, flow control, and routing protocols."
      },
      {
        title: "Computer Networks Tutorial Course (Tamil)",
        url: "https://www.youtube.com/watch?v=yiIpBNBl4bc",
        embedUrl: "https://www.youtube-nocookie.com/embed/yiIpBNBl4bc",
        language: "Tamil",
        channel: "Tamil Networks Track",
        videoCount: "Full Course",
        description: "OSI 7 layers, IP subnets, routing algorithms, and socket communication in Tamil."
      }
    ],
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
    videoUrl: "https://www.youtube-nocookie.com/embed/GwIo3gDZCVQ",
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/videoseries?list=PLorkqpg7qgkw8xqc-RmuCgfCWRWCRnN-u",
      title: "Machine Learning & Deep Learning Full Playlist in Tamil",
      description: "Complete machine learning video series in Tamil covering supervised algorithms, decision trees, neural networks, Naïve Bayes, and unsupervised clustering.",
      duration: "Full Playlist Series",
      channel: "Machine Learning Tamil"
    },
    playlists: [
      {
        title: "Machine Learning Complete Playlist (Tamil)",
        url: "https://www.youtube.com/playlist?list=PLorkqpg7qgkw8xqc-RmuCgfCWRWCRnN-u",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLorkqpg7qgkw8xqc-RmuCgfCWRWCRnN-u",
        language: "Tamil",
        channel: "Machine Learning Tamil",
        videoCount: "Full Playlist",
        description: "Supervised and unsupervised learning, mathematical formulations, and Python implementations in Tamil."
      },
      {
        title: "Machine Learning Course for Beginners (English)",
        url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ",
        embedUrl: "https://www.youtube-nocookie.com/embed/GwIo3gDZCVQ",
        language: "English",
        channel: "FreeCodeCamp",
        videoCount: "Full Course",
        description: "Complete ML curriculum: linear regression, logistic regression, SVM, decision trees, and neural networks."
      }
    ],
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
    videoUrl: "https://www.youtube-nocookie.com/embed/bkSWJJZNgf8",
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/bkSWJJZNgf8",
      title: "Operating Systems Full Course Tutorial",
      description: "Comprehensive operating systems tutorial covering CPU scheduling, memory management, semaphore synchronization, deadlock handling, and page replacement policies.",
      duration: "Full Course"
    },
    playlists: [
      {
        title: "Operating Systems Complete Gate Smashers Playlist (English)",
        url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
        language: "English",
        channel: "Gate Smashers",
        videoCount: "Full Playlist Series",
        description: "Process scheduling, semaphores, Banker's deadlock algorithm, paging, and disk scheduling."
      },
      {
        title: "Operating Systems Full Course Tutorial",
        url: "https://www.youtube.com/watch?v=bkSWJJZNgf8",
        embedUrl: "https://www.youtube-nocookie.com/embed/bkSWJJZNgf8",
        language: "Bilingual",
        channel: "OS Tutorial",
        videoCount: "Full Course",
        description: "UNIX commands, process lifecycles, CPU scheduling, semaphores, and memory management."
      }
    ],
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
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/nqB3qAtDLKU",
      title: "Object Oriented Programming with Java in Tamil",
      description: "Complete Tamil tutorial covering classes, objects, inheritance, polymorphism, abstraction, exception handling, and Java collections.",
      duration: "Full Course"
    },
    playlists: [
      {
        title: "Java Master Series Playlist (English)",
        url: "https://www.youtube.com/playlist?list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5",
        language: "English",
        channel: "Telusko",
        videoCount: "Full Playlist Series",
        description: "Complete Java programming from core fundamentals to OOP, exception handling, and Collections."
      },
      {
        title: "Java OOP Complete Tutorial in Tamil",
        url: "https://www.youtube.com/watch?v=nqB3qAtDLKU",
        embedUrl: "https://www.youtube-nocookie.com/embed/nqB3qAtDLKU",
        language: "Tamil",
        channel: "Tamil Java Tutorial",
        videoCount: "Full Course",
        description: "Classes, objects, inheritance, polymorphism, abstraction, and interfaces in Tamil."
      }
    ],
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
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/YZVF4ehkn24",
      title: "Data Structures and Algorithms Complete Tutorial in Tamil",
      description: "Complete DSA lecture series in Tamil covering linear arrays, linked lists, stacks, queues, trees, graphs, and sorting algorithms.",
      duration: "Full Course"
    },
    playlists: [
      {
        title: "Kunal Kushwaha Java DSA Complete Playlist (English)",
        url: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7mUtezP_URPSCWy",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PL9gnSGHSqcnr_DxHsP7mUtezP_URPSCWy",
        language: "English",
        channel: "Kunal Kushwaha",
        videoCount: "60+ Lectures",
        description: "World-class Java DSA tutorial: recursion, trees, graphs, dynamic programming, and sorting."
      },
      {
        title: "Data Structures & Algorithms in Tamil",
        url: "https://www.youtube.com/watch?v=YZVF4ehkn24",
        embedUrl: "https://www.youtube-nocookie.com/embed/YZVF4ehkn24",
        language: "Tamil",
        channel: "Tamil Tech Tutorial",
        videoCount: "Full Course",
        description: "Comprehensive DSA course in Tamil explaining dynamic memory, linked lists, trees, and graphs."
      }
    ],
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
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/wsYx5qOP_bI",
      title: "Database Management Systems Full Course in Tamil",
      description: "Complete Tamil DBMS tutorial covering SQL DDL/DML, joins, subqueries, relational normal forms, and PL/SQL programming.",
      duration: "Full Course"
    },
    playlists: [
      {
        title: "DBMS & SQL Complete Playlist (English)",
        url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8C9XdK_kVpOe_r007",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLxCzCOWd7aiFAN6I8C9XdK_kVpOe_r007",
        language: "English",
        channel: "Gate Smashers",
        videoCount: "Full Playlist Series",
        description: "Relational algebra, normalization (1NF to BCNF), indexing, transactions, and concurrency."
      },
      {
        title: "DBMS & SQL Complete Course (Tamil)",
        url: "https://www.youtube.com/watch?v=wsYx5qOP_bI",
        embedUrl: "https://www.youtube-nocookie.com/embed/wsYx5qOP_bI",
        language: "Tamil",
        channel: "Tamil Tech Tutorial",
        videoCount: "Full Course",
        description: "Relational modeling, SQL queries, joins, and PL/SQL stored procedures in Tamil."
      }
    ],
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
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/Zi_n_mE3pEM",
      title: "C Programming Language Complete Tutorial in Tamil",
      description: "Complete C programming course in Tamil covering data types, control flow, functions, pointers, arrays, memory management, and file streams.",
      duration: "Full Course"
    },
    playlists: [
      {
        title: "C Programming Complete Playlist (English)",
        url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR",
        language: "English",
        channel: "Neso Academy",
        videoCount: "80+ Lectures",
        description: "Variables, pointers, dynamic memory management, arrays, structures, and file I/O."
      },
      {
        title: "C Programming Language Full Course (Tamil)",
        url: "https://www.youtube.com/watch?v=Zi_n_mE3pEM",
        embedUrl: "https://www.youtube-nocookie.com/embed/Zi_n_mE3pEM",
        language: "Tamil",
        channel: "Tamil C Series",
        videoCount: "Full Course",
        description: "Comprehensive C language fundamentals, pointers, malloc/free, and algorithms in Tamil."
      }
    ],
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
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/KCdbwcjyHvA",
      title: "Python Programming Complete Tutorial in Tamil",
      description: "Full Python course in Tamil covering language basics, data structures, list comprehensions, OOP principles, exception handling, and file operations.",
      duration: "Full Course"
    },
    playlists: [
      {
        title: "Python Programming Complete Tutorial Series (English)",
        url: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU",
        language: "English",
        channel: "Corey Schafer",
        videoCount: "Full Playlist Series",
        description: "Variables, functions, list comprehensions, OOP class design, and file context managers."
      },
      {
        title: "Python Programming Complete Course (Tamil)",
        url: "https://www.youtube.com/watch?v=KCdbwcjyHvA",
        embedUrl: "https://www.youtube-nocookie.com/embed/KCdbwcjyHvA",
        language: "Tamil",
        channel: "Tamil Python Track",
        videoCount: "Full Course",
        description: "Language syntax, data structures, list comprehensions, and OOP in Tamil."
      }
    ],
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
    videoUrl: "https://www.youtube-nocookie.com/embed/5NgNicANyqM",
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/QGAuolgCTHE",
      title: "Artificial Intelligence Complete Course in Tamil",
      description: "Full AI course in Tamil covering state space search, A* heuristic algorithms, Minimax game theory, CSP solvers, and knowledge representation.",
      duration: "Full Course"
    },
    playlists: [
      {
        title: "Artificial Intelligence Complete Course (Tamil)",
        url: "https://www.youtube.com/watch?v=QGAuolgCTHE",
        embedUrl: "https://www.youtube-nocookie.com/embed/QGAuolgCTHE",
        language: "Tamil",
        channel: "AI Tamil Course",
        videoCount: "Full Course",
        description: "State-space graph search, A* heuristics, Minimax algorithms, and CSP solvers in Tamil."
      },
      {
        title: "Artificial Intelligence Full Tutorial (English)",
        url: "https://www.youtube.com/watch?v=5NgNicANyqM",
        embedUrl: "https://www.youtube-nocookie.com/embed/5NgNicANyqM",
        language: "English",
        channel: "FreeCodeCamp",
        videoCount: "Full Course",
        description: "Search algorithms, heuristic optimization, game trees, and machine intelligence models."
      }
    ],
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
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/videoseries?list=PLfNKAsmI385ICtRCRhiwxT9rCfYxOmUD8",
      title: "Big Data Analytics Complete Tamil Course (Playlist)",
      description: "Complete Big Data course in Tamil covering Hadoop HDFS, MapReduce, Apache Spark, and NoSQL MongoDB.",
      duration: "Full Playlist Series",
      channel: "Tamil Big Data Series"
    },
    playlists: [
      {
        title: "Big Data Analytics Complete Playlist (Tamil)",
        url: "https://www.youtube.com/playlist?list=PLfNKAsmI385ICtRCRhiwxT9rCfYxOmUD8",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLfNKAsmI385ICtRCRhiwxT9rCfYxOmUD8",
        language: "Tamil",
        channel: "Tamil Big Data Series",
        videoCount: "Full Playlist",
        description: "Hadoop HDFS, MapReduce paradigms, PySpark DataFrames, and MongoDB analytics in Tamil."
      },
      {
        title: "Big Data Analytics & Hadoop Full Course (English)",
        url: "https://www.youtube.com/watch?v=1vbXmCrkT3Y",
        embedUrl: "https://www.youtube-nocookie.com/embed/1vbXmCrkT3Y",
        language: "English",
        channel: "Edureka",
        videoCount: "Full Course",
        description: "Distributed storage architecture, HDFS namenodes, MapReduce execution, and Apache Spark."
      }
    ],
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
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/8CnuGPfmOPs",
      title: "Cloud Computing & AWS Complete Tutorial in Tamil",
      description: "Comprehensive Tamil tutorial covering AWS cloud foundations, EC2 computing instances, S3 storage, Docker containerization, and cloud deployment.",
      duration: "Full Course",
      channel: "AWS Tamil Tutorial"
    },
    playlists: [
      {
        title: "Cloud Computing & AWS Complete Tutorial (Tamil)",
        url: "https://www.youtube.com/watch?v=8CnuGPfmOPs",
        embedUrl: "https://www.youtube-nocookie.com/embed/8CnuGPfmOPs",
        language: "Tamil",
        channel: "AWS Tamil",
        videoCount: "Full Tutorial",
        description: "AWS EC2, S3, IAM policies, and cloud infrastructure explained in Tamil."
      },
      {
        title: "AWS Certified Solutions Architect & Cloud Course (English)",
        url: "https://www.youtube.com/watch?v=2LaAJq1lB1Q",
        embedUrl: "https://www.youtube-nocookie.com/embed/2LaAJq1lB1Q",
        language: "English",
        channel: "FreeCodeCamp",
        videoCount: "Full Course",
        description: "Complete cloud computing curriculum, VPC networking, Lambda, and Docker."
      }
    ],
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
