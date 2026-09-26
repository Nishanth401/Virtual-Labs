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
  embedUrl?: string;
  category?: string;
  description?: string;
}

export interface LabTamilVideo {
  url: string;
  title: string;
  description: string;
  duration?: string;
  channel?: string;
  timestamps?: VideoTimestamp[];
}

export interface LabEnglishVideo {
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
  englishVideo?: LabEnglishVideo;
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
  // ==========================================
  // 1. DATA SCIENCE & ANALYTICS
  // ==========================================
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
    experimentsCount: 11,
    rating: 4.96,
    ratingsCount: 360,
    iconName: "BarChart3",
    tags: ["NumPy", "Pandas", "Matplotlib", "Z-Test", "ANOVA", "Regression", "Time Series"],
    bannerGradient: "from-violet-700 via-indigo-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    englishVideo: {
      url: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
      title: "Data Science & Analytics Complete English Lecture Suite (12 Experiments)",
      description: "Complete English tutorial series aligned with the curriculum: NumPy multi-dimensional array vectorization, Pandas DataFrame wrangling, Matplotlib visualization, descriptive variability metrics, hypothesis testing (Z-test, T-test, ANOVA), linear/logistic predictive models, and time series decomposition.",
      duration: "12 Experiment Tutorials (Full Course)",
      channel: "Python Data Science Academy",
      timestamps: [
        { time: "Exp 1", seconds: 0, title: "Exp 1: Working with NumPy arrays", url: "https://www.youtube.com/watch?v=GB9ByLhsz8Y", embedUrl: "https://www.youtube-nocookie.com/embed/GB9ByLhsz8Y", category: "1. Python Data Foundations", description: "Array creation, vectorization, slicing, multi-dimensional array operations, and broadcasting rules." },
        { time: "Exp 2", seconds: 0, title: "Exp 2: Working with Pandas data frames", url: "https://www.youtube.com/watch?v=vmEHCJofslg", embedUrl: "https://www.youtube-nocookie.com/embed/vmEHCJofslg", category: "1. Python Data Foundations", description: "DataFrames, Series manipulation, missing value imputation, indexing with loc/iloc, and groupby aggregations." },
        { time: "Exp 3", seconds: 0, title: "Exp 3: Basic plots using Matplotlib", url: "https://www.youtube.com/watch?v=UO98lJQ3QGI", embedUrl: "https://www.youtube-nocookie.com/embed/UO98lJQ3QGI", category: "1. Python Data Foundations", description: "Line charts, bar plots, histograms, subplots, and publication-quality styling with Matplotlib." },
        { time: "Exp 4", seconds: 0, title: "Exp 4: Frequency distributions, Average and Variances", url: "https://www.youtube.com/watch?v=szKG3428HVg", embedUrl: "https://www.youtube-nocookie.com/embed/szKG3428HVg", category: "2. Descriptive & Inferential Statistics", description: "Descriptive statistics, mean, median, mode, variance, standard deviation, and frequency distribution tables." },
        { time: "Exp 5", seconds: 0, title: "Exp 5: Normal curves, Correlation and Scatter Plots", url: "https://www.youtube.com/watch?v=rzFX5NWojp0", embedUrl: "https://www.youtube-nocookie.com/embed/rzFX5NWojp0", category: "2. Descriptive & Inferential Statistics", description: "Gaussian normal distribution curve, standard normal distribution (Z-scores), Pearson correlation, and scatter plots." },
        { time: "Exp 6", seconds: 0, title: "Exp 6: Regression", url: "https://www.youtube.com/watch?v=7ArmBVF2dCs", embedUrl: "https://www.youtube-nocookie.com/embed/7ArmBVF2dCs", category: "2. Descriptive & Inferential Statistics", description: "Simple & multiple linear regression, Ordinary Least Squares (OLS), slope, intercept, and R-squared fit." },
        { time: "Exp 7", seconds: 0, title: "Exp 7: Z-test", url: "https://www.youtube.com/watch?v=5koKGx54r68", embedUrl: "https://www.youtube-nocookie.com/embed/5koKGx54r68", category: "2. Descriptive & Inferential Statistics", description: "One-sample and two-sample Z-tests, standard normal critical values, null hypothesis testing, and p-values." },
        { time: "Exp 8", seconds: 0, title: "Exp 8: T-test", url: "https://www.youtube.com/watch?v=pTmLQvMM-1M", embedUrl: "https://www.youtube-nocookie.com/embed/pTmLQvMM-1M", category: "2. Descriptive & Inferential Statistics", description: "Independent two-sample Student's t-test, paired t-test, degrees of freedom, and SciPy stats execution." },
        { time: "Exp 9", seconds: 0, title: "Exp 9: ANOVA", url: "https://www.youtube.com/watch?v=ITf4vHhyGpc", embedUrl: "https://www.youtube-nocookie.com/embed/ITf4vHhyGpc", category: "2. Descriptive & Inferential Statistics", description: "One-Way Analysis of Variance (ANOVA), between-group vs within-group variance, F-statistic, and hypothesis rejection." },
        { time: "Exp 10", seconds: 0, title: "Exp 10: Building and validating linear models", url: "https://www.youtube.com/watch?v=nk2CQITm_eo", embedUrl: "https://www.youtube-nocookie.com/embed/nk2CQITm_eo", category: "3. Predictive Modeling & Time Series", description: "Train/test dataset splitting, k-fold cross-validation, Mean Squared Error (MSE), RMSE, and residual diagnostic plots." },
        { time: "Exp 11", seconds: 0, title: "Exp 11: Building and validating logistic models", url: "https://www.youtube.com/watch?v=yIYKR4sgzI8", embedUrl: "https://www.youtube-nocookie.com/embed/yIYKR4sgzI8", category: "3. Predictive Modeling & Time Series", description: "Sigmoid logistic function, binary classification, log-odds, confusion matrix, precision, recall, and ROC-AUC curve." },
        { time: "Exp 12", seconds: 0, title: "Exp 12: Time series analysis", url: "https://www.youtube.com/watch?v=vV12dGe_Fho", embedUrl: "https://www.youtube-nocookie.com/embed/vV12dGe_Fho", category: "3. Predictive Modeling & Time Series", description: "Time series decomposition (Trend, Seasonality, Noise), Augmented Dickey-Fuller stationarity test, and ARIMA forecasting." }
      ]
    },
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

  // ==========================================
  // 2. COMPUTER NETWORKS
  // ==========================================
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
    englishVideo: {
      url: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      title: "Computer Networks Complete Laboratory Video Tutorials (10 Experiments)",
      description: "Hands-on packet sniffing (Wireshark, tcpdump), TCP/UDP socket programming, DNS resolution, ARP/RARP simulation, routing algorithms, and CRC error correction.",
      duration: "10 Experiment Tutorials (Full Course)",
      channel: "Computer Networks & Protocol Academy",
      timestamps: [
        { time: "Exp 1", seconds: 0, title: "Exp 1: Packet Sniffing with Wireshark & tcpdump", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8", embedUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8", category: "1. Network Sniffing & Analysis", description: "Capturing and dissecting raw Ethernet, IP, TCP, and UDP packet headers with Wireshark." },
        { time: "Exp 2", seconds: 0, title: "Exp 2: TCP Client-Server Socket Programming", url: "https://www.youtube.com/watch?v=LtX4Qt77S3E", embedUrl: "https://www.youtube-nocookie.com/embed/LtX4Qt77S3E", category: "2. Socket Programming", description: "Building two-way full-duplex TCP stream sockets with server listening and client connection." },
        { time: "Exp 3", seconds: 0, title: "Exp 3: UDP Socket Programming & DNS Resolution", url: "https://www.youtube.com/watch?v=4E1S2pC6B70", embedUrl: "https://www.youtube-nocookie.com/embed/4E1S2pC6B70", category: "2. Socket Programming", description: "DatagramPacket UDP communication and simulating DNS hostname-to-IP resolution." },
        { time: "Exp 4", seconds: 0, title: "Exp 4: Concurrent HTTP Web Server Simulation", url: "https://www.youtube.com/watch?v=F_rO2o6jD4U", embedUrl: "https://www.youtube-nocookie.com/embed/F_rO2o6jD4U", category: "2. Socket Programming", description: "Multi-threaded HTTP web server handling concurrent GET and POST client requests." },
        { time: "Exp 5", seconds: 0, title: "Exp 5: ARP & RARP Protocol Simulation", url: "https://www.youtube.com/watch?v=A2dY_V_qX9Q", embedUrl: "https://www.youtube-nocookie.com/embed/A2dY_V_qX9Q", category: "3. Data Link & Network Protocols", description: "Simulating Address Resolution Protocol table mapping and reverse IP translations." },
        { time: "Exp 6", seconds: 0, title: "Exp 6: CRC Error Detection & Hamming Code", url: "https://www.youtube.com/watch?v=A9g6rTMblz4", embedUrl: "https://www.youtube-nocookie.com/embed/A9g6rTMblz4", category: "3. Data Link & Network Protocols", description: "Cyclic Redundancy Check polynomial division and bit error correction simulations." },
        { time: "Exp 7", seconds: 0, title: "Exp 7: Sliding Window Protocol (Go-Back-N / Selective Repeat)", url: "https://www.youtube.com/watch?v=zY3S15iY-L0", embedUrl: "https://www.youtube-nocookie.com/embed/zY3S15iY-L0", category: "3. Data Link & Network Protocols", description: "Flow control sliding window with sequence acknowledgement, timeout retransmission, and buffering." },
        { time: "Exp 8", seconds: 0, title: "Exp 8: Distance Vector Routing (Bellman-Ford)", url: "https://www.youtube.com/watch?v=obX_4P60nYY", embedUrl: "https://www.youtube-nocookie.com/embed/obX_4P60nYY", category: "4. Routing & Switching", description: "Distributed routing table exchange and Bellman-Ford shortest distance vector convergence." },
        { time: "Exp 9", seconds: 0, title: "Exp 9: Link State Routing (Dijkstra Algorithm)", url: "https://www.youtube.com/watch?v=2Tz83r8e6X0", embedUrl: "https://www.youtube-nocookie.com/embed/2Tz83r8e6X0", category: "4. Routing & Switching", description: "Global topological link-state advertising and Dijkstra shortest path tree computation." },
        { time: "Exp 10", seconds: 0, title: "Exp 10: Subnetting & CIDR IP Calculation", url: "https://www.youtube.com/watch?v=s_Ntt6eTn94", embedUrl: "https://www.youtube-nocookie.com/embed/s_Ntt6eTn94", category: "4. Routing & Switching", description: "VLSM subnets, subnet mask bitmasks, network addresses, broadcast addresses, and usable host ranges." }
      ]
    },
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/yiIpBNBl4bc",
      title: "Computer Networks Full Course in Tamil",
      description: "Complete Tamil tutorial covering OSI layers, TCP/IP, IP addressing, routing algorithms, socket programming, and Wireshark analysis.",
      duration: "8h 30m (15 Chapters)",
      channel: "Tamil Networks Track",
      timestamps: [
        { time: "00:00", seconds: 0, title: "OSI 7-Layer Model & Architecture", url: "https://www.youtube.com/watch?v=yiIpBNBl4bc", category: "Network Models" },
        { time: "24:30", seconds: 1470, title: "Physical Layer & Transmission Media", url: "https://www.youtube.com/watch?v=yiIpBNBl4bc&t=1470s", category: "Network Models" },
        { time: "52:15", seconds: 3135, title: "Data Link Layer Framing & Bit Stuffing", url: "https://www.youtube.com/watch?v=yiIpBNBl4bc&t=3135s", category: "Data Link Layer" },
        { time: "1:22:40", seconds: 4960, title: "CRC Error Detection & Hamming Code", url: "https://www.youtube.com/watch?v=yiIpBNBl4bc&t=4960s", category: "Data Link Layer" },
        { time: "1:54:10", seconds: 6850, title: "Flow Control: Stop-and-Wait & Sliding Window", url: "https://www.youtube.com/watch?v=yiIpBNBl4bc&t=6850s", category: "Data Link Layer" },
        { time: "2:28:35", seconds: 8915, title: "IPv4 Addressing & Subnet Masks (CIDR)", url: "https://www.youtube.com/watch?v=yiIpBNBl4bc&t=8915s", category: "Network Layer" },
        { time: "3:04:20", seconds: 11060, title: "ARP & RARP Protocol Simulation", url: "https://www.youtube.com/watch?v=yiIpBNBl4bc&t=11060s", category: "Network Layer" },
        { time: "3:38:50", seconds: 13130, title: "Distance Vector Routing (Bellman-Ford)", url: "https://www.youtube.com/watch?v=yiIpBNBl4bc&t=13130s", category: "Routing Protocols" },
        { time: "4:12:15", seconds: 15135, title: "Link State Routing (Dijkstra Algorithm)", url: "https://www.youtube.com/watch?v=yiIpBNBl4bc&t=15135s", category: "Routing Protocols" },
        { time: "4:48:40", seconds: 17320, title: "Transport Layer: TCP vs UDP Protocols", url: "https://www.youtube.com/watch?v=yiIpBNBl4bc&t=17320s", category: "Transport Layer" },
        { time: "5:22:10", seconds: 19330, title: "TCP 3-Way Handshake & Flow Control", url: "https://www.youtube.com/watch?v=yiIpBNBl4bc&t=19330s", category: "Transport Layer" },
        { time: "5:56:30", seconds: 21390, title: "Socket Programming: TCP Client-Server", url: "https://www.youtube.com/watch?v=yiIpBNBl4bc&t=21390s", category: "Socket Programming" },
        { time: "6:28:15", seconds: 23295, title: "UDP Socket Programming & DNS Resolution", url: "https://www.youtube.com/watch?v=yiIpBNBl4bc&t=23295s", category: "Socket Programming" },
        { time: "7:02:40", seconds: 25360, title: "Application Protocols: HTTP, DNS & DHCP", url: "https://www.youtube.com/watch?v=yiIpBNBl4bc&t=25360s", category: "Application Layer" },
        { time: "7:36:00", seconds: 27360, title: "Packet Sniffing with Wireshark & tcpdump", url: "https://www.youtube.com/watch?v=yiIpBNBl4bc&t=27360s", category: "Network Analysis" }
      ]
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
        videoCount: "15 Chapters",
        description: "OSI 7 layers, IP subnets, routing algorithms, and socket communication in Tamil."
      }
    ],
    semester: "Semester 4",
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

  // ==========================================
  // 3. MACHINE LEARNING
  // ==========================================
  {
    id: "ai-machine-learning",
    code: "AD8481",
    name: "Deep Learning Laboratory",
    shortTitle: "DLL",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Master deep learning architectures: XOR DNN, CNN digit/face recognition, RNN language modeling, LSTM emotion analysis, Seq2Seq POS tagging, Encoder-Decoder translation, and GAN image augmentation.",
    description: "Welcome to the Deep Learning Virtual Laboratory at VSB Engineering College. Master modern neural architectures: Deep Neural Networks (DNN), Convolutional Neural Networks (CNN) for computer vision, Recurrent Neural Networks (RNN) and LSTM for NLP sequence modeling, Sequence-to-Sequence models, and Generative Adversarial Networks (GANs).",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Advanced",
    experimentsCount: 8,
    rating: 4.96,
    ratingsCount: 395,
    iconName: "BrainCircuit",
    tags: ["DNN XOR", "CNN Vision", "RNN & LSTM", "NLP Seq2Seq", "Translation", "GANs"],
    bannerGradient: "from-blue-700 via-indigo-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/GwIo3gDZCVQ",
    englishVideo: {
      url: "https://www.youtube-nocookie.com/embed/GwIo3gDZCVQ",
      title: "Machine Learning Complete Laboratory Video Tutorials (9 Experiments)",
      description: "Hands-on implementation of Candidate-Elimination, ID3 Decision Trees, Backpropagation ANN, Naïve Bayes text classifiers, Bayesian Networks, EM vs k-Means, k-NN, and LWR.",
      duration: "9 Experiment Tutorials (Full Course)",
      channel: "Machine Learning Academy",
      timestamps: [
        { time: "Exp 1", seconds: 0, title: "Exp 1: Find-S and Candidate-Elimination Algorithm", url: "https://www.youtube.com/watch?v=d_k8qF1M0kM", embedUrl: "https://www.youtube-nocookie.com/embed/d_k8qF1M0kM", category: "1. Concept & Decision Tree Learning", description: "Most specific and general hypothesis boundaries with version space pruning." },
        { time: "Exp 2", seconds: 0, title: "Exp 2: ID3 Decision Tree with Information Gain", url: "https://www.youtube.com/watch?v=coOTEc-0OGw", embedUrl: "https://www.youtube-nocookie.com/embed/coOTEc-0OGw", category: "1. Concept & Decision Tree Learning", description: "Shannon entropy calculation, Information Gain attribute splitting, and tree recursion." },
        { time: "Exp 3", seconds: 0, title: "Exp 3: Multilayer Perceptron & Backpropagation ANN", url: "https://www.youtube.com/watch?v=Ilg3gGewQ5U", embedUrl: "https://www.youtube-nocookie.com/embed/Ilg3gGewQ5U", category: "2. Neural Networks & Probabilistic Models", description: "Feedforward activations, sigmoid derivatives, and gradient descent weight backpropagation." },
        { time: "Exp 4", seconds: 0, title: "Exp 4: Naïve Bayes Text Classifier & Laplace Smoothing", url: "https://www.youtube.com/watch?v=O2L2Uv9pdDA", embedUrl: "https://www.youtube-nocookie.com/embed/O2L2Uv9pdDA", category: "2. Neural Networks & Probabilistic Models", description: "Prior and posterior probability estimation for text document classification." },
        { time: "Exp 5", seconds: 0, title: "Exp 5: Bayesian Belief Network for Medical Diagnosis", url: "https://www.youtube.com/watch?v=TuG8CHd_s0Y", embedUrl: "https://www.youtube-nocookie.com/embed/TuG8CHd_s0Y", category: "2. Neural Networks & Probabilistic Models", description: "Conditional probability tables (CPTs) and probabilistic graph inference." },
        { time: "Exp 6", seconds: 0, title: "Exp 6: EM Algorithm vs K-Means Clustering", url: "https://www.youtube.com/watch?v=iQoXFmbXRJA", embedUrl: "https://www.youtube-nocookie.com/embed/iQoXFmbXRJA", category: "3. Clustering & Instance-Based Learning", description: "Gaussian Mixture Models (GMM) expectation-maximization compared to hard K-means." },
        { time: "Exp 7", seconds: 0, title: "Exp 7: K-Nearest Neighbors (k-NN) Classification", url: "https://www.youtube.com/watch?v=HVXime0nQeI", embedUrl: "https://www.youtube-nocookie.com/embed/HVXime0nQeI", category: "3. Clustering & Instance-Based Learning", description: "Euclidean distance metrics, majority voting, and k-value decision boundary effects." },
        { time: "Exp 8", seconds: 0, title: "Exp 8: Locally Weighted Regression (LWR)", url: "https://www.youtube.com/watch?v=4B8b0n9r6x8", embedUrl: "https://www.youtube-nocookie.com/embed/4B8b0n9r6x8", category: "3. Clustering & Instance-Based Learning", description: "Non-parametric kernel weighting for non-linear localized regression fitting." },
        { time: "Exp 9", seconds: 0, title: "Exp 9: End-to-End Model Evaluation & ROC-AUC Curves", url: "https://www.youtube.com/watch?v=4jRBRDbJemM", embedUrl: "https://www.youtube-nocookie.com/embed/4jRBRDbJemM", category: "3. Clustering & Instance-Based Learning", description: "Confusion matrix metrics, precision, recall, F1-score, and ROC curve evaluation." }
      ]
    },
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/GwIo3gDZCVQ",
      title: "Machine Learning Masterclass in Tamil & Bilingual Track",
      description: "Complete machine learning series covering supervised learning, Candidate Elimination, ID3 Decision Trees, Backpropagation, Naïve Bayes, Bayesian Networks, EM vs K-Means, and k-NN.",
      duration: "8h 15m (16 Chapters)",
      channel: "Machine Learning Tamil",
      timestamps: [
        { time: "00:00", seconds: 0, title: "Introduction to Machine Learning Paradigms", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ", category: "ML Foundations" },
        { time: "12:45", seconds: 765, title: "Supervised vs Unsupervised vs Reinforcement Learning", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ&t=765s", category: "ML Foundations" },
        { time: "28:10", seconds: 1690, title: "Feature Engineering & Data Preprocessing", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ&t=1690s", category: "ML Foundations" },
        { time: "45:20", seconds: 2720, title: "Find-S Algorithm & Concept Space", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ&t=2720s", category: "Concept Learning" },
        { time: "1:08:15", seconds: 4095, title: "Candidate Elimination Algorithm & Version Spaces", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ&t=4095s", category: "Concept Learning" },
        { time: "1:35:40", seconds: 5740, title: "Decision Tree Representation & ID3 Algorithm", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ&t=5740s", category: "Decision Trees" },
        { time: "2:05:10", seconds: 7510, title: "Entropy, Information Gain & Overfitting Avoidance", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ&t=7510s", category: "Decision Trees" },
        { time: "2:38:25", seconds: 9505, title: "Multilayer Perceptrons & Forward Propagation", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ&t=9505s", category: "Neural Networks" },
        { time: "3:15:50", seconds: 11750, title: "Backpropagation Algorithm & Gradient Descent", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ&t=11750s", category: "Neural Networks" },
        { time: "3:52:10", seconds: 13930, title: "Naïve Bayes Classifier & Laplace Smoothing", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ&t=13930s", category: "Probabilistic Models" },
        { time: "4:25:35", seconds: 15935, title: "Bayesian Belief Networks & Disease Diagnosis", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ&t=15935s", category: "Probabilistic Models" },
        { time: "5:02:40", seconds: 18160, title: "Expectation Maximization (EM) vs K-Means", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ&t=18160s", category: "Clustering & Instance" },
        { time: "5:36:15", seconds: 20175, title: "K-Nearest Neighbors (k-NN) Classification", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ&t=20175s", category: "Clustering & Instance" },
        { time: "6:08:50", seconds: 22130, title: "Locally Weighted Regression (LWR)", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ&t=22130s", category: "Clustering & Instance" },
        { time: "6:42:20", seconds: 24140, title: "Model Evaluation: Cross-Validation & ROC Curves", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ&t=24140s", category: "Model Evaluation" },
        { time: "7:15:00", seconds: 26100, title: "End-to-End ML Pipeline & Model Deployment", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ&t=26100s", category: "Model Evaluation" }
      ]
    },
    playlists: [
      {
        title: "Machine Learning Complete Playlist (Tamil)",
        url: "https://www.youtube.com/playlist?list=PLorkqpg7qgkw8xqc-RmuCgfCWRWCRnN-u",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLorkqpg7qgkw8xqc-RmuCgfCWRWCRnN-u",
        language: "Tamil",
        channel: "Machine Learning Tamil",
        videoCount: "16 Chapters",
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

  // ==========================================
  // 4. OPERATING SYSTEMS
  // ==========================================
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
    englishVideo: {
      url: "https://www.youtube-nocookie.com/embed/bkSWJJZNgf8",
      title: "Operating Systems Complete Laboratory Video Tutorials (15 Experiments)",
      description: "Hands-on UNIX POSIX system calls, CPU scheduling policies (FCFS, SJF, Priority, Round Robin), IPC pipes/shared memory, semaphores, Banker's Algorithm, paging, and disk scheduling.",
      duration: "15 Experiment Tutorials (Full Course)",
      channel: "Operating Systems Academy",
      timestamps: [
        { time: "Exp 1", seconds: 0, title: "Exp 1: Linux Terminal & Shell Commands", url: "https://www.youtube.com/watch?v=2PgYwA_k4qY", embedUrl: "https://www.youtube-nocookie.com/embed/2PgYwA_k4qY", category: "1. System Calls & OS Basics", description: "Navigating directory hierarchies, file permissions, pipes, grep, and shell redirection." },
        { time: "Exp 2", seconds: 0, title: "Exp 2: POSIX Process Calls (fork, exec, wait, exit)", url: "https://www.youtube.com/watch?v=cex_Z8V3qY4", embedUrl: "https://www.youtube-nocookie.com/embed/cex_Z8V3qY4", category: "1. System Calls & OS Basics", description: "Process spawning, PID tracking, zombie and orphan process handling in C." },
        { time: "Exp 3", seconds: 0, title: "Exp 3: Inter-Process Communication using IPC Pipes", url: "https://www.youtube.com/watch?v=uHH7CabJ03Y", embedUrl: "https://www.youtube-nocookie.com/embed/uHH7CabJ03Y", category: "1. System Calls & OS Basics", description: "Unidirectional and bidirectional data streaming between parent and child processes." },
        { time: "Exp 4", seconds: 0, title: "Exp 4: Shared Memory IPC Simulation (shmget, shmat)", url: "https://www.youtube.com/watch?v=r_P3nF98N1M", embedUrl: "https://www.youtube-nocookie.com/embed/r_P3nF98N1M", category: "1. System Calls & OS Basics", description: "Fastest IPC mechanism using shared memory segments and memory detachment." },
        { time: "Exp 5", seconds: 0, title: "Exp 5: First-Come First-Served (FCFS) CPU Scheduling", url: "https://www.youtube.com/watch?v=MZvdVLbT-rM", embedUrl: "https://www.youtube-nocookie.com/embed/MZvdVLbT-rM", category: "2. CPU Scheduling", description: "Non-preemptive queue scheduling, Gantt charts, waiting and turnaround times." },
        { time: "Exp 6", seconds: 0, title: "Exp 6: Shortest Job First (SJF) Preemptive & Non-preemptive", url: "https://www.youtube.com/watch?v=VCIVXPoiLpU", embedUrl: "https://www.youtube-nocookie.com/embed/VCIVXPoiLpU", category: "2. CPU Scheduling", description: "Optimal average waiting time scheduling and Shortest Remaining Time First (SRTF)." },
        { time: "Exp 7", seconds: 0, title: "Exp 7: Round Robin (RR) Time-Slice Scheduling", url: "https://www.youtube.com/watch?v=TxjIlqW1wZc", embedUrl: "https://www.youtube-nocookie.com/embed/TxjIlqW1wZc", category: "2. CPU Scheduling", description: "Preemptive time quantum slicing, ready queue cycling, and context switching overhead." },
        { time: "Exp 8", seconds: 0, title: "Exp 8: Priority-Based CPU Scheduling", url: "https://www.youtube.com/watch?v=rs36x41P55I", embedUrl: "https://www.youtube-nocookie.com/embed/rs36x41P55I", category: "2. CPU Scheduling", description: "Static and dynamic priority scheduling, aging techniques, and starvation avoidance." },
        { time: "Exp 9", seconds: 0, title: "Exp 9: Producer-Consumer Problem using Semaphores", url: "https://www.youtube.com/watch?v=Qx_qV6g8HjM", embedUrl: "https://www.youtube-nocookie.com/embed/Qx_qV6g8HjM", category: "3. Synchronization & Deadlocks", description: "Bounded buffer coordination using mutex, empty, and full POSIX semaphores." },
        { time: "Exp 10", seconds: 0, title: "Exp 10: Dining Philosophers Synchronization Problem", url: "https://www.youtube.com/watch?v=FYUi-p75zrg", embedUrl: "https://www.youtube-nocookie.com/embed/FYUi-p75zrg", category: "3. Synchronization & Deadlocks", description: "Deadlock-free resource allocation and circular wait prevention." },
        { time: "Exp 11", seconds: 0, title: "Exp 11: Banker's Algorithm for Deadlock Avoidance", url: "https://www.youtube.com/watch?v=T0FXvTHcYi4", embedUrl: "https://www.youtube-nocookie.com/embed/T0FXvTHcYi4", category: "3. Synchronization & Deadlocks", description: "Allocation, Max, and Need matrices with safe sequence verification." },
        { time: "Exp 12", seconds: 0, title: "Exp 12: Memory Allocation (First Fit, Best Fit, Worst Fit)", url: "https://www.youtube.com/watch?v=q6gC_2Vd30k", embedUrl: "https://www.youtube-nocookie.com/embed/q6gC_2Vd30k", category: "4. Memory & Disk Management", description: "Variable partition placement algorithms and internal/external fragmentation analysis." },
        { time: "Exp 13", seconds: 0, title: "Exp 13: Page Replacement Algorithms (FIFO, LRU, Optimal)", url: "https://www.youtube.com/watch?v=dYIoWGoT440", embedUrl: "https://www.youtube-nocookie.com/embed/dYIoWGoT440", category: "4. Memory & Disk Management", description: "Virtual memory page faults, Belady's anomaly, and least recently used replacement." },
        { time: "Exp 14", seconds: 0, title: "Exp 14: Disk Scheduling (FCFS, SSTF, SCAN, C-SCAN)", url: "https://www.youtube.com/watch?v=4dxHX2Jm17o", embedUrl: "https://www.youtube-nocookie.com/embed/4dxHX2Jm17o", category: "4. Memory & Disk Management", description: "Total head movement calculation and elevator algorithm optimization." },
        { time: "Exp 15", seconds: 0, title: "Exp 15: File Allocation Strategies (Sequential, Indexed, Linked)", url: "https://www.youtube.com/watch?v=jUa72kM1X2w", embedUrl: "https://www.youtube-nocookie.com/embed/jUa72kM1X2w", category: "4. Memory & Disk Management", description: "Direct disk block addressing, index blocks, and linked block pointers." }
      ]
    },
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/bkSWJJZNgf8",
      title: "Operating Systems Full Course Tutorial in Tamil & English",
      description: "Comprehensive operating systems tutorial covering CPU scheduling, memory management, semaphore synchronization, deadlock handling, and page replacement policies.",
      duration: "8h 45m (16 Chapters)",
      channel: "Operating Systems Academy",
      timestamps: [
        { time: "00:00", seconds: 0, title: "Operating System Architecture & Kernel Concepts", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8", category: "OS Core" },
        { time: "20:15", seconds: 1215, title: "Linux Terminal & Shell Commands", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&t=1215s", category: "OS Core" },
        { time: "45:30", seconds: 2730, title: "POSIX System Calls (fork, exec, wait, exit)", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&t=2730s", category: "OS Core" },
        { time: "1:15:40", seconds: 4540, title: "Process Lifecycle & CPU Scheduling Metrics", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&t=4540s", category: "CPU Scheduling" },
        { time: "1:46:10", seconds: 6370, title: "FCFS and SJF Scheduling Algorithms", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&t=6370s", category: "CPU Scheduling" },
        { time: "2:18:25", seconds: 8305, title: "Round Robin & Priority Scheduling", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&t=8305s", category: "CPU Scheduling" },
        { time: "2:52:40", seconds: 10360, title: "Inter-Process Communication: Pipes & Shared Memory", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&t=10360s", category: "IPC & Sync" },
        { time: "3:26:15", seconds: 12375, title: "Critical Section Problem & Race Conditions", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&t=12375s", category: "IPC & Sync" },
        { time: "4:01:30", seconds: 14490, title: "Semaphores & Mutex Locks in POSIX", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&t=14490s", category: "IPC & Sync" },
        { time: "4:34:50", seconds: 16490, title: "Producer-Consumer & Readers-Writers", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&t=16490s", category: "IPC & Sync" },
        { time: "5:08:10", seconds: 18490, title: "Deadlock Detection & Prevention Principles", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&t=18490s", category: "Deadlocks" },
        { time: "5:42:35", seconds: 20555, title: "Banker's Algorithm Safety Vector Simulation", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&t=20555s", category: "Deadlocks" },
        { time: "6:18:20", seconds: 22700, title: "Memory Management, Paging & TLB Translation", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&t=22700s", category: "Memory Management" },
        { time: "6:52:45", seconds: 24765, title: "Page Replacement (FIFO, LRU, Optimal)", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&t=24765s", category: "Memory Management" },
        { time: "7:26:10", seconds: 26770, title: "Disk Head Scheduling (FCFS, SSTF, SCAN)", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&t=26770s", category: "Disk & Storage" },
        { time: "7:58:00", seconds: 28680, title: "File Systems Architecture & Inode Allocation", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&t=28680s", category: "Disk & Storage" }
      ]
    },
    playlists: [
      {
        title: "Operating Systems Complete Gate Smashers Playlist (English)",
        url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
        language: "English",
        channel: "Gate Smashers",
        videoCount: "16 Chapters",
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

  // ==========================================
  // 5. OBJECT ORIENTED PROGRAMMING (JAVA)
  // ==========================================
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
    experimentsCount: 17,
    rating: 4.97,
    ratingsCount: 450,
    iconName: "Code2",
    tags: ["Java OOP", "Inheritance", "Polymorphism", "Recursion", "Collections", "JDBC Streams"],
    bannerGradient: "from-rose-700 via-red-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
    englishVideo: {
      url: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      title: "Object Oriented Programming (Java) Complete Video Suite (15 Experiments)",
      description: "Hands-on Java class design: encapsulation, inheritance hierarchies, matrix wave traversals, custom exceptions, Java Collections, and JDBC persistence.",
      duration: "15 Experiment Tutorials (Full Course)",
      channel: "Java OOP Master Academy",
      timestamps: [
        { time: "Exp 1", seconds: 0, title: "Exp 1: Java Basic Syntax & 2D Matrix Traversals", url: "https://www.youtube.com/watch?v=eIrMbAQSU34", embedUrl: "https://www.youtube-nocookie.com/embed/eIrMbAQSU34", category: "1. Core OOP & Classes", description: "Primitive data types, 2D array row/column traversals, and matrix arithmetic." },
        { time: "Exp 2", seconds: 0, title: "Exp 2: Class, Object Creation & Instance Variables", url: "https://www.youtube.com/watch?v=0k_e_l8nNqk", embedUrl: "https://www.youtube-nocookie.com/embed/0k_e_l8nNqk", category: "1. Core OOP & Classes", description: "State and behavior encapsulation, new operator, and heap memory allocation." },
        { time: "Exp 3", seconds: 0, title: "Exp 3: Method & Constructor Overloading", url: "https://www.youtube.com/watch?v=B7bH_g9w1bI", embedUrl: "https://www.youtube-nocookie.com/embed/B7bH_g9w1bI", category: "1. Core OOP & Classes", description: "Compile-time polymorphism, default and parameterized constructors, and this reference." },
        { time: "Exp 4", seconds: 0, title: "Exp 4: Encapsulation & Access Modifiers (Banking Model)", url: "https://www.youtube.com/watch?v=0wQ7rC8U2oI", embedUrl: "https://www.youtube-nocookie.com/embed/0wQ7rC8U2oI", category: "1. Core OOP & Classes", description: "Private field protection, public getter/setter validation, and security." },
        { time: "Exp 5", seconds: 0, title: "Exp 5: Single, Multilevel & Hierarchical Inheritance", url: "https://www.youtube.com/watch?v=Zbnu2N39c6A", embedUrl: "https://www.youtube-nocookie.com/embed/Zbnu2N39c6A", category: "2. Inheritance & Polymorphism", description: "Code reuse, extends keyword, and super constructor invocation." },
        { time: "Exp 6", seconds: 0, title: "Exp 6: Method Overriding & Dynamic Method Dispatch", url: "https://www.youtube.com/watch?v=KzE_X3p9n8w", embedUrl: "https://www.youtube-nocookie.com/embed/KzE_X3p9n8w", category: "2. Inheritance & Polymorphism", description: "Runtime polymorphism, @Override annotation, and late binding resolution." },
        { time: "Exp 7", seconds: 0, title: "Exp 7: Abstract Classes & Interface Contracts", url: "https://www.youtube.com/watch?v=Goxz_q-f20U", embedUrl: "https://www.youtube-nocookie.com/embed/Goxz_q-f20U", category: "2. Inheritance & Polymorphism", description: "Abstract method declarations and multiple interface contract implementation." },
        { time: "Exp 8", seconds: 0, title: "Exp 8: User Packages & Access Control Protection", url: "https://www.youtube.com/watch?v=7Zf3p4q6-2A", embedUrl: "https://www.youtube-nocookie.com/embed/7Zf3p4q6-2A", category: "2. Inheritance & Polymorphism", description: "Package hierarchy, public/protected/default/private access scope." },
        { time: "Exp 9", seconds: 0, title: "Exp 9: Exception Handling: try, catch, finally", url: "https://www.youtube.com/watch?v=cewb4t1jJ3Y", embedUrl: "https://www.youtube-nocookie.com/embed/cewb4t1jJ3Y", category: "3. Exceptions & Concurrency", description: "Checked and unchecked exception handling, throw and throws clauses." },
        { time: "Exp 10", seconds: 0, title: "Exp 10: Custom User-Defined Exception Classes", url: "https://www.youtube.com/watch?v=7qA1b4q9_7w", embedUrl: "https://www.youtube-nocookie.com/embed/7qA1b4q9_7w", category: "3. Exceptions & Concurrency", description: "Extending Exception class for application-specific validation errors." },
        { time: "Exp 11", seconds: 0, title: "Exp 11: Multithreading with Thread Class & Runnable", url: "https://www.youtube.com/watch?v=r_MbozD32eo", embedUrl: "https://www.youtube-nocookie.com/embed/r_MbozD32eo", category: "3. Exceptions & Concurrency", description: "Concurrent execution lifecycles, start(), run(), and sleep() operations." },
        { time: "Exp 12", seconds: 0, title: "Exp 12: Thread Synchronization & Mutex Locking", url: "https://www.youtube.com/watch?v=RH7G-N2PAFM", embedUrl: "https://www.youtube-nocookie.com/embed/RH7G-N2PAFM", category: "3. Exceptions & Concurrency", description: "Synchronized methods, synchronized statements, and race condition prevention." },
        { time: "Exp 13", seconds: 0, title: "Exp 13: Java Collections: ArrayList, LinkedList, HashMap", url: "https://www.youtube.com/watch?v=rzA7UJ-hQn4", embedUrl: "https://www.youtube-nocookie.com/embed/rzA7UJ-hQn4", category: "4. Collections & Streams", description: "Dynamic collections, hashing key-value maps, and iterators." },
        { time: "Exp 14", seconds: 0, title: "Exp 14: Java File I/O Byte & Character Streams", url: "https://www.youtube.com/watch?v=ScUJx4aWRi0", embedUrl: "https://www.youtube-nocookie.com/embed/ScUJx4aWRi0", category: "4. Collections & Streams", description: "FileInputStream, FileOutputStream, BufferedReader, and serialization." },
        { time: "Exp 15", seconds: 0, title: "Exp 15: JDBC Database Connectivity & CRUD Operations", url: "https://www.youtube.com/watch?v=2i4t-SL7mtU", embedUrl: "https://www.youtube-nocookie.com/embed/2i4t-SL7mtU", category: "4. Collections & Streams", description: "DriverManager connection, PreparedStatement execution, and ResultSet iteration." }
      ]
    },
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/nqB3qAtDLKU",
      title: "Object Oriented Programming with Java in Tamil",
      description: "Complete Tamil tutorial covering classes, objects, inheritance, polymorphism, abstraction, exception handling, and Java collections.",
      duration: "9h 10m (16 Chapters)",
      channel: "Tamil Java Tutorial",
      timestamps: [
        { time: "00:00", seconds: 0, title: "Java Architecture & JVM Bytecode Execution", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU", category: "Java Basics" },
        { time: "21:15", seconds: 1275, title: "Primitive Types, Variables & Type Casting", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU&t=1275s", category: "Java Basics" },
        { time: "45:30", seconds: 2730, title: "Control Flow & 2D Array Matrix Traversals", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU&t=2730s", category: "Java Basics" },
        { time: "1:16:40", seconds: 4600, title: "Classes, Objects & Instance State", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU&t=4600s", category: "OOP Core" },
        { time: "1:48:20", seconds: 6500, title: "Constructors Overloading & 'this' Reference", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU&t=6500s", category: "OOP Core" },
        { time: "2:20:10", seconds: 8410, title: "Encapsulation, Access Modifiers & Getters/Setters", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU&t=8410s", category: "OOP Core" },
        { time: "2:54:30", seconds: 10470, title: "Inheritance Hierarchies & Code Reusability", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU&t=10470s", category: "Inheritance" },
        { time: "3:28:15", seconds: 12495, title: "Method Overriding & Runtime Polymorphism", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU&t=12495s", category: "Inheritance" },
        { time: "4:02:40", seconds: 14560, title: "Abstract Classes & Interface Contracts", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU&t=14560s", category: "Inheritance" },
        { time: "4:36:20", seconds: 16580, title: "Java Packages, Access Control & Imports", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU&t=16580s", category: "Packages & Errors" },
        { time: "5:10:45", seconds: 18645, title: "Exception Handling: try, catch, finally", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU&t=18645s", category: "Packages & Errors" },
        { time: "5:44:10", seconds: 20650, title: "Custom Exceptions & throw/throws Syntax", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU&t=20650s", category: "Packages & Errors" },
        { time: "6:18:30", seconds: 22710, title: "Multithreading: Thread Class vs Runnable", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU&t=22710s", category: "Concurrency" },
        { time: "6:52:15", seconds: 24735, title: "Thread Synchronization & Mutex Locking", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU&t=24735s", category: "Concurrency" },
        { time: "7:26:40", seconds: 26800, title: "Java Collections: ArrayList, LinkedList, HashMap", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU&t=26800s", category: "Collections" },
        { time: "8:02:00", seconds: 28920, title: "File I/O Byte Streams & Object Serialization", url: "https://www.youtube.com/watch?v=nqB3qAtDLKU&t=28920s", category: "Collections" }
      ]
    },
    playlists: [
      {
        title: "Java Master Series Playlist (English)",
        url: "https://www.youtube.com/playlist?list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5",
        language: "English",
        channel: "Telusko",
        videoCount: "16 Chapters",
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

  // ==========================================
  // 6. DATA STRUCTURES & ALGORITHMS
  // ==========================================
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
    englishVideo: {
      url: "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      title: "Data Structures & Algorithms Complete Video Suite (15 Experiments)",
      description: "Comprehensive DSA series: linked lists, stacks, queues, BSTs, AVL balancing, graphs, sorting, and hashing.",
      duration: "15 Experiment Tutorials (Full Course)",
      channel: "DSA Master Academy",
      timestamps: [
        { time: "Exp 1", seconds: 0, title: "Exp 1: Singly Linked List Implementation", url: "https://www.youtube.com/watch?v=nobkzUP_wHY", embedUrl: "https://www.youtube-nocookie.com/embed/nobkzUP_wHY", category: "1. Linked Lists & Linear Structures", description: "Node pointer linking, head/tail insertion, deletion, and traversal." },
        { time: "Exp 2", seconds: 0, title: "Exp 2: Doubly Linked List with Two-Way Pointers", url: "https://www.youtube.com/watch?v=JdQeNxWCguQ", embedUrl: "https://www.youtube-nocookie.com/embed/JdQeNxWCguQ", category: "1. Linked Lists & Linear Structures", description: "Forward and backward node traversal with prev/next pointers." },
        { time: "Exp 3", seconds: 0, title: "Exp 3: Circular Linked List Implementation", url: "https://www.youtube.com/watch?v=7ElpXW1O9tU", embedUrl: "https://www.youtube-nocookie.com/embed/7ElpXW1O9tU", category: "1. Linked Lists & Linear Structures", description: "Tail node pointing back to head for circular ring buffer operations." },
        { time: "Exp 4", seconds: 0, title: "Exp 4: Stack ADT using Arrays and Linked Nodes", url: "https://www.youtube.com/watch?v=I37gbkOflt4", embedUrl: "https://www.youtube-nocookie.com/embed/I37gbkOflt4", category: "1. Linked Lists & Linear Structures", description: "LIFO principles, push, pop, peek operations, and stack overflow handling." },
        { time: "Exp 5", seconds: 0, title: "Exp 5: Infix to Postfix Conversion & Evaluation", url: "https://www.youtube.com/watch?v=vq-nUFGo4nc", embedUrl: "https://www.youtube-nocookie.com/embed/vq-nUFGo4nc", category: "1. Linked Lists & Linear Structures", description: "Shunting-yard algorithm, operator precedence, and operand evaluation." },
        { time: "Exp 6", seconds: 0, title: "Exp 6: Queue & Circular Queue ADT", url: "https://www.youtube.com/watch?v=okr-XE8yTO8", embedUrl: "https://www.youtube-nocookie.com/embed/okr-XE8yTO8", category: "1. Linked Lists & Linear Structures", description: "FIFO principles, enqueue, dequeue, front/rear pointers, and modulo wrap-around." },
        { time: "Exp 7", seconds: 0, title: "Exp 7: Binary Search Tree (BST) Operations", url: "https://www.youtube.com/watch?v=cySVml6e_Fc", embedUrl: "https://www.youtube-nocookie.com/embed/cySVml6e_Fc", category: "2. Trees & Balanced Trees", description: "BST ordering property, recursive insertion, deletion with in-order successor." },
        { time: "Exp 8", seconds: 0, title: "Exp 8: Self-Balancing AVL Trees (LL, RR, LR, RL Rotations)", url: "https://www.youtube.com/watch?v=jDM6_TnYIqE", embedUrl: "https://www.youtube-nocookie.com/embed/jDM6_TnYIqE", category: "2. Trees & Balanced Trees", description: "Height balance factor calculation and single/double balancing rotations." },
        { time: "Exp 9", seconds: 0, title: "Exp 9: Binary Max/Min Heap & Priority Queue", url: "https://www.youtube.com/watch?v=HqPJF2L5h9U", embedUrl: "https://www.youtube-nocookie.com/embed/HqPJF2L5h9U", category: "2. Trees & Balanced Trees", description: "Complete binary tree representation, heapify up/down, and O(log n) extractions." },
        { time: "Exp 10", seconds: 0, title: "Exp 10: B-Tree & B+ Tree Indexing Concepts", url: "https://www.youtube.com/watch?v=aZjYr87r1b8", embedUrl: "https://www.youtube-nocookie.com/embed/aZjYr87r1b8", category: "2. Trees & Balanced Trees", description: "Multi-way search trees, disk-optimized block transfers, and node splitting." },
        { time: "Exp 11", seconds: 0, title: "Exp 11: Breadth-First Search (BFS) Graph Traversal", url: "https://www.youtube.com/watch?v=oDqjPvD60gg", embedUrl: "https://www.youtube-nocookie.com/embed/oDqjPvD60gg", category: "3. Graph Algorithms", description: "Queue-based level-order graph exploration and shortest hop paths." },
        { time: "Exp 12", seconds: 0, title: "Exp 12: Depth-First Search (DFS) Graph Traversal", url: "https://www.youtube.com/watch?v=7fujbpJ0LB4", embedUrl: "https://www.youtube-nocookie.com/embed/7fujbpJ0LB4", category: "3. Graph Algorithms", description: "Recursive call stack graph traversal, connected components, and cycle detection." },
        { time: "Exp 13", seconds: 0, title: "Exp 13: Dijkstra's Single-Source Shortest Path", url: "https://www.youtube.com/watch?v=bZkzH5x0I5U", embedUrl: "https://www.youtube-nocookie.com/embed/bZkzH5x0I5U", category: "3. Graph Algorithms", description: "Greedy edge relaxation with priority queue min-heap for shortest distance." },
        { time: "Exp 14", seconds: 0, title: "Exp 14: Prim's & Kruskal's Minimum Spanning Tree", url: "https://www.youtube.com/watch?v=4ZlRH0eK-qE", embedUrl: "https://www.youtube-nocookie.com/embed/4ZlRH0eK-qE", category: "3. Graph Algorithms", description: "Cut property and Disjoint Set Union (DSU) Kruskal algorithm for minimal edge weights." },
        { time: "Exp 15", seconds: 0, title: "Exp 15: Quick Sort, Merge Sort & Hash Tables", url: "https://www.youtube.com/watch?v=7h1s2SojIRw", embedUrl: "https://www.youtube-nocookie.com/embed/7h1s2SojIRw", category: "4. Sorting & Hashing", description: "Divide-and-conquer sorting algorithms and hash collision resolution using separate chaining." }
      ]
    },
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/YZVF4ehkn24",
      title: "Data Structures and Algorithms Complete Tutorial in Tamil",
      description: "Complete DSA lecture series in Tamil covering linear arrays, linked lists, stacks, queues, trees, graphs, and sorting algorithms.",
      duration: "9h 30m (18 Chapters)",
      channel: "Tamil Tech Tutorial",
      timestamps: [
        { time: "00:00", seconds: 0, title: "DSA Overview & Big-O Asymptotic Notations", url: "https://www.youtube.com/watch?v=YZVF4ehkn24", category: "Foundations" },
        { time: "18:30", seconds: 1110, title: "Static vs Dynamic Arrays & Memory Allocations", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=1110s", category: "Foundations" },
        { time: "42:15", seconds: 2535, title: "Singly Linked List: Insertion, Deletion & Traversal", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=2535s", category: "Linked Lists" },
        { time: "1:12:40", seconds: 4360, title: "Doubly & Circular Linked Lists Implementation", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=4360s", category: "Linked Lists" },
        { time: "1:45:20", seconds: 6320, title: "Stack ADT: Array & Linked Representations", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=6320s", category: "Linear ADTs" },
        { time: "2:10:50", seconds: 7850, title: "Infix to Postfix Conversion & Expression Evaluation", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=7850s", category: "Linear ADTs" },
        { time: "2:38:15", seconds: 9495, title: "Queue ADT, Circular Queue & Priority Queue", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=9495s", category: "Linear ADTs" },
        { time: "3:12:30", seconds: 11550, title: "Binary Tree Representation & Recursive Traversals", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=11550s", category: "Trees & BST" },
        { time: "3:48:45", seconds: 13725, title: "Binary Search Tree (BST) Operations & Searching", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=13725s", category: "Trees & BST" },
        { time: "4:22:10", seconds: 15730, title: "Self-Balancing AVL Trees (LL, RR, LR, RL Rotations)", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=15730s", category: "Balanced Trees" },
        { time: "4:58:30", seconds: 17910, title: "Binary Heap & Priority Queue Operations", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=17910s", category: "Balanced Trees" },
        { time: "5:35:00", seconds: 20100, title: "Graph Representations (Matrix & Adjacency List)", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=20100s", category: "Graph Algorithms" },
        { time: "6:05:40", seconds: 21940, title: "Breadth-First Search (BFS) & Depth-First Search (DFS)", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=21940s", category: "Graph Algorithms" },
        { time: "6:42:15", seconds: 24135, title: "Dijkstra's Single-Source Shortest Path", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=24135s", category: "Graph Algorithms" },
        { time: "7:18:50", seconds: 26330, title: "Minimum Spanning Trees (Prim's & Kruskal's)", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=26330s", category: "Graph Algorithms" },
        { time: "7:55:20", seconds: 28520, title: "Quick Sort, Merge Sort & Heap Sort", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=28520s", category: "Sorting & Hashing" },
        { time: "8:30:10", seconds: 30610, title: "Hash Tables, Collision Resolution & Chaining", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=30610s", category: "Sorting & Hashing" },
        { time: "9:02:40", seconds: 32560, title: "DSA Interview Problem Solving & Complexity Review", url: "https://www.youtube.com/watch?v=YZVF4ehkn24&t=32560s", category: "Summary" }
      ]
    },
    playlists: [
      {
        title: "Kunal Kushwaha Java DSA Complete Playlist (English)",
        url: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7mUtezP_URPSCWy",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PL9gnSGHSqcnr_DxHsP7mUtezP_URPSCWy",
        language: "English",
        channel: "Kunal Kushwaha",
        videoCount: "18 Chapters",
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

  // ==========================================
  // 7. DBMS (DATABASE MANAGEMENT SYSTEM)
  // ==========================================
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
    experimentsCount: 15,
    rating: 4.93,
    ratingsCount: 312,
    iconName: "Database",
    tags: ["SQL DDL/DML", "Joins & Subqueries", "Views & Indexes", "PL/SQL", "Procedures & Triggers", "ACID TCL"],
    bannerGradient: "from-emerald-700 via-teal-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
    englishVideo: {
      url: "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
      title: "DBMS & SQL Complete Laboratory Video Suite (10 Experiments)",
      description: "Master relational schema design, advanced SQL queries, joins, subqueries, PL/SQL cursors, stored procedures, triggers, and ACID transactions.",
      duration: "10 Experiment Tutorials (Full Course)",
      channel: "Database Management Academy",
      timestamps: [
        { time: "Exp 1", seconds: 0, title: "Exp 1: SQL DDL: CREATE, ALTER, DROP & Primary Keys", url: "https://www.youtube.com/watch?v=7S_tz1z_5bA", embedUrl: "https://www.youtube-nocookie.com/embed/7S_tz1z_5bA", category: "1. Relational DDL/DML & Queries", description: "Table definition, primary/foreign key constraints, and schema modifications." },
        { time: "Exp 2", seconds: 0, title: "Exp 2: SQL DML: INSERT, UPDATE, DELETE & Constraints", url: "https://www.youtube.com/watch?v=ztHopE5Wnpc", embedUrl: "https://www.youtube-nocookie.com/embed/ztHopE5Wnpc", category: "1. Relational DDL/DML & Queries", description: "Data manipulation, check constraints, default values, and cascade operations." },
        { time: "Exp 3", seconds: 0, title: "Exp 3: Complex SELECT Queries, GROUP BY & HAVING", url: "https://www.youtube.com/watch?v=0rnNghf_HdQ", embedUrl: "https://www.youtube-nocookie.com/embed/0rnNghf_HdQ", category: "1. Relational DDL/DML & Queries", description: "Aggregate functions (COUNT, SUM, AVG), grouping sets, and post-aggregation filtering." },
        { time: "Exp 4", seconds: 0, title: "Exp 4: SQL Joins: INNER, LEFT, RIGHT, FULL OUTER", url: "https://www.youtube.com/watch?v=9yeOJ0ZMUYw", embedUrl: "https://www.youtube-nocookie.com/embed/9yeOJ0ZMUYw", category: "1. Relational DDL/DML & Queries", description: "Multi-table relational joins, cross joins, and non-equi joins." },
        { time: "Exp 5", seconds: 0, title: "Exp 5: Nested Subqueries & Correlated Subqueries", url: "https://www.youtube.com/watch?v=d_k8qF1M0kM", embedUrl: "https://www.youtube-nocookie.com/embed/d_k8qF1M0kM", category: "1. Relational DDL/DML & Queries", description: "Subqueries in WHERE, FROM, SELECT clauses and row-by-row correlated evaluations." },
        { time: "Exp 6", seconds: 0, title: "Exp 6: Views, Materialized Views & B-Tree Indexes", url: "https://www.youtube.com/watch?v=coOTEc-0OGw", embedUrl: "https://www.youtube-nocookie.com/embed/coOTEc-0OGw", category: "2. Views, Indexes & Normalization", description: "Virtual views, security abstraction, and B-Tree index acceleration." },
        { time: "Exp 7", seconds: 0, title: "Exp 7: Relational Normalization (1NF to BCNF)", url: "https://www.youtube.com/watch?v=UrYLYV7WSHM", embedUrl: "https://www.youtube-nocookie.com/embed/UrYLYV7WSHM", category: "2. Views, Indexes & Normalization", description: "Functional dependencies, partial dependencies, transitive dependencies, and lossless decomposition." },
        { time: "Exp 8", seconds: 0, title: "Exp 8: PL/SQL Block Structures & Control Flow", url: "https://www.youtube.com/watch?v=2HVMb5gH4mY", embedUrl: "https://www.youtube-nocookie.com/embed/2HVMb5gH4mY", category: "3. PL/SQL & Transactions", description: "Anonymous blocks, declaration sections, conditional IF-THEN, and WHILE loops." },
        { time: "Exp 9", seconds: 0, title: "Exp 9: Explicit Cursors & Parameterized Stored Procedures", url: "https://www.youtube.com/watch?v=5Vj-FmOqUeM", embedUrl: "https://www.youtube-nocookie.com/embed/5Vj-FmOqUeM", category: "3. PL/SQL & Transactions", description: "Cursor OPEN, FETCH, CLOSE lifecycle and reusable stored procedures." },
        { time: "Exp 10", seconds: 0, title: "Exp 10: Database Triggers & ACID Transactions", url: "https://www.youtube.com/watch?v=8qA1b4q9_7w", embedUrl: "https://www.youtube-nocookie.com/embed/8qA1b4q9_7w", category: "3. PL/SQL & Transactions", description: "BEFORE/AFTER row-level triggers, COMMIT, ROLLBACK, and SAVEPOINT controls." }
      ]
    },
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/wsYx5qOP_bI",
      title: "Database Management Systems Full Course in Tamil",
      description: "Complete Tamil DBMS tutorial covering SQL DDL/DML, joins, subqueries, relational normal forms, and PL/SQL programming.",
      duration: "8h 15m (15 Chapters)",
      channel: "Tamil Tech Tutorial",
      timestamps: [
        { time: "00:00", seconds: 0, title: "DBMS Architecture & Relational Concepts", url: "https://www.youtube.com/watch?v=wsYx5qOP_bI", category: "Database Foundations" },
        { time: "22:15", seconds: 1335, title: "Entity-Relationship (ER) Modeling & Diagrams", url: "https://www.youtube.com/watch?v=wsYx5qOP_bI&t=1335s", category: "Database Foundations" },
        { time: "50:40", seconds: 3040, title: "SQL DDL: CREATE, ALTER, DROP & Primary Keys", url: "https://www.youtube.com/watch?v=wsYx5qOP_bI&t=3040s", category: "SQL & Integrity" },
        { time: "1:20:10", seconds: 4810, title: "SQL DML: INSERT, UPDATE, DELETE Constraints", url: "https://www.youtube.com/watch?v=wsYx5qOP_bI&t=4810s", category: "SQL & Integrity" },
        { time: "1:55:30", seconds: 6930, title: "Complex SELECT Queries, GROUP BY & HAVING", url: "https://www.youtube.com/watch?v=wsYx5qOP_bI&t=6930s", category: "Queries & Joins" },
        { time: "2:32:45", seconds: 9165, title: "SQL Joins (INNER, LEFT, RIGHT, FULL OUTER)", url: "https://www.youtube.com/watch?v=wsYx5qOP_bI&t=9165s", category: "Queries & Joins" },
        { time: "3:08:20", seconds: 11300, title: "Correlated Subqueries & Nested Queries", url: "https://www.youtube.com/watch?v=wsYx5qOP_bI&t=11300s", category: "Queries & Joins" },
        { time: "3:45:50", seconds: 13550, title: "Normalization (1NF, 2NF, 3NF & BCNF)", url: "https://www.youtube.com/watch?v=wsYx5qOP_bI&t=13550s", category: "Normalization" },
        { time: "4:18:15", seconds: 15495, title: "Views, Materialized Views & B-Tree Indexes", url: "https://www.youtube.com/watch?v=wsYx5qOP_bI&t=15495s", category: "Views & Indexes" },
        { time: "4:52:40", seconds: 17560, title: "PL/SQL Block Structure & Control Flow", url: "https://www.youtube.com/watch?v=wsYx5qOP_bI&t=17560s", category: "PL/SQL Programming" },
        { time: "5:28:10", seconds: 19690, title: "Explicit & Parameterized Cursors with Loops", url: "https://www.youtube.com/watch?v=wsYx5qOP_bI&t=19690s", category: "PL/SQL Programming" },
        { time: "6:02:35", seconds: 21755, title: "Stored Procedures, Functions & Packages", url: "https://www.youtube.com/watch?v=wsYx5qOP_bI&t=21755s", category: "Procedures & Triggers" },
        { time: "6:38:50", seconds: 23930, title: "Database Triggers (BEFORE, AFTER, INSTEAD OF)", url: "https://www.youtube.com/watch?v=wsYx5qOP_bI&t=23930s", category: "Procedures & Triggers" },
        { time: "7:12:15", seconds: 25935, title: "ACID Transactions (COMMIT, ROLLBACK, SAVEPOINT)", url: "https://www.youtube.com/watch?v=wsYx5qOP_bI&t=25935s", category: "Transactions" },
        { time: "7:45:00", seconds: 27900, title: "Concurrency Control & Lock-Based Protocols", url: "https://www.youtube.com/watch?v=wsYx5qOP_bI&t=27900s", category: "Transactions" }
      ]
    },
    playlists: [
      {
        title: "DBMS & SQL Complete Playlist (English)",
        url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8C9XdK_kVpOe_r007",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLxCzCOWd7aiFAN6I8C9XdK_kVpOe_r007",
        language: "English",
        channel: "Gate Smashers",
        videoCount: "15 Chapters",
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

  // ==========================================
  // 8. C PROGRAMMING (NPTEL 8-WEEK AI&DS TRACK)
  // ==========================================
  {
    id: "c-programming",
    code: "CS3151",
    name: "Programming in C Laboratory",
    shortTitle: "CPL",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Comprehensive C laboratory covering formatted I/O, control structures, nested loops, functions, arrays, string manipulations, pointer operations, dynamic memory, structures, and disk file I/O.",
    description: "The Programming in C Virtual Laboratory delivers an interactive GCC/Clang simulation environment covering foundational problem solving: distance calculation, roots of quadratic equations, electric bill calculation, Armstrong number detection, sine series expansion, pyramid patterns, 1D array operations, matrix operations, string manipulations without built-ins, call-by-reference swap, recursive factorial and towers of Hanoi, dynamic memory allocation, student mark sheets using structures, and file copying.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Beginner",
    experimentsCount: 15,
    rating: 4.98,
    ratingsCount: 360,
    iconName: "Code2",
    tags: ["C Programming", "GCC Compiler", "Pointers", "Dynamic Memory", "Structures", "Recursion", "File I/O"],
    bannerGradient: "from-cyan-700 via-blue-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
    englishVideo: {
      url: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      title: "NPTEL C Programming 8-Week Complete Lecture & Practical Series",
      description: "Comprehensive 8-Week NPTEL curriculum video suite covering C compilation pipeline, operators, loops, recursion, *(a+i) pointer mechanics, dynamic memory, structures, and examination practice.",
      duration: "8 Weekly Modules (Full Course)",
      channel: "NPTEL / C Programming Master Academy",
      timestamps: [
        { time: "Week 1", seconds: 0, title: "Week 1: Introduction, Variables, Data Types & Formatted I/O", url: "https://www.youtube.com/watch?v=KJgsSFOSQv0", embedUrl: "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0", category: "Week 1: Fundamentals", description: "C program structure, GCC compilation pipeline, printf/scanf, and basic calculations." },
        { time: "Week 2", seconds: 0, title: "Week 2: Operators, Precedence & Decision Making (if-else, switch)", url: "https://www.youtube.com/watch?v=5bV_Q2u_0eA", embedUrl: "https://www.youtube-nocookie.com/embed/5bV_Q2u_0eA", category: "Week 2: Operators & Logic", description: "Operator precedence, short-circuit evaluation, largest of three, and electricity bill calculation." },
        { time: "Week 3", seconds: 0, title: "Week 3: Loop Constructs & Student Mark Analysis Mini Task", url: "https://www.youtube.com/watch?v=3gV_0qM2u-A", embedUrl: "https://www.youtube-nocookie.com/embed/3gV_0qM2u-A", category: "Week 3: Loops & Patterns", description: "For, while, do-while loops, primes in O(sqrt(n)), Fibonacci, and Student Mark Analysis." },
        { time: "Week 4", seconds: 0, title: "Week 4: Functions, Parameter Scopes & Recursive Euclidean GCD", url: "https://www.youtube.com/watch?v=r_P3nF98N1M", embedUrl: "https://www.youtube-nocookie.com/embed/r_P3nF98N1M", category: "Week 4: Functions & Recursion", description: "Pass by value, static variables, activation records, and Euclidean GCD recursion." },
        { time: "Week 5", seconds: 0, title: "Week 5: Arrays, *(a+i) Pointer Arithmetic & Matrix Multiplication", url: "https://www.youtube.com/watch?v=2PgYwA_k4qY", embedUrl: "https://www.youtube-nocookie.com/embed/2PgYwA_k4qY", category: "Week 5: Arrays & Pointers", description: "Contiguous arrays, *(a+i) address dereferencing, searching, sorting, and 2D matrix multiplication." },
        { time: "Week 6", seconds: 0, title: "Week 6: Dynamic Memory Allocation (malloc/free) & Disk File I/O", url: "https://www.youtube.com/watch?v=VCIVXPoiLpU", embedUrl: "https://www.youtube-nocookie.com/embed/VCIVXPoiLpU", category: "Week 6: Memory & Files", description: "Heap allocation with malloc/calloc, memory leak prevention, fopen, fprintf, and fscanf." },
        { time: "Week 7", seconds: 0, title: "Week 7: Structures, Typedef & Singly Linked List Implementation", url: "https://www.youtube.com/watch?v=TxjIlqW1wZc", embedUrl: "https://www.youtube-nocookie.com/embed/TxjIlqW1wZc", category: "Week 7: Structs & Lists", description: "Heterogeneous struct records, structure pointers (->), and Singly Linked List node insertion/deletion." },
        { time: "Week 8", seconds: 0, title: "Week 8: Complete Revision & NPTEL Comprehensive Examination", url: "https://www.youtube.com/watch?v=MZvdVLbT-rM", embedUrl: "https://www.youtube-nocookie.com/embed/MZvdVLbT-rM", category: "Week 8: Exam Prep", description: "7-Day practice plan, high-yield diagnostic questions, mistake analysis, and NPTEL mock exam." }
      ]
    },
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/Zi_n_mE3pEM",
      title: "NPTEL C Programming Complete Tutorial in Tamil",
      description: "Complete C programming masterclass in Tamil aligned with NPTEL curriculum covering data types, control flow, functions, pointers, arrays, memory management, and file streams.",
      duration: "7h 45m (15 Chapters)",
      channel: "Tamil C Series",
      timestamps: [
        { time: "00:00", seconds: 0, title: "Week 1: Introduction to C & GCC Compilation Pipeline", url: "https://www.youtube.com/watch?v=Zi_n_mE3pEM", category: "Week 1 Basics" },
        { time: "16:30", seconds: 990, title: "Week 1: Data Types, Variables & Formatted printf/scanf", url: "https://www.youtube.com/watch?v=Zi_n_mE3pEM&t=990s", category: "Week 1 Basics" },
        { time: "38:45", seconds: 2325, title: "Week 2: Operators, Precedence & Expression Evaluation", url: "https://www.youtube.com/watch?v=Zi_n_mE3pEM&t=2325s", category: "Week 2 Operators" },
        { time: "1:05:20", seconds: 3920, title: "Week 2: Conditionals (if-else, Nested if, switch-case)", url: "https://www.youtube.com/watch?v=Zi_n_mE3pEM&t=3920s", category: "Week 2 Control" },
        { time: "1:34:10", seconds: 5650, title: "Week 3: Loops (for, while, do-while) & Pattern Printing", url: "https://www.youtube.com/watch?v=Zi_n_mE3pEM&t=5650s", category: "Week 3 Loops" },
        { time: "2:08:30", seconds: 7710, title: "Week 5: 1D Arrays: Searching, Insertion & Deletion", url: "https://www.youtube.com/watch?v=Zi_n_mE3pEM&t=7710s", category: "Week 5 Arrays" },
        { time: "2:38:15", seconds: 9495, title: "Week 5: 2D Arrays & Matrix Mathematics (Add, Multiply)", url: "https://www.youtube.com/watch?v=Zi_n_mE3pEM&t=9495s", category: "Week 5 Arrays" },
        { time: "3:42:20", seconds: 13340, title: "Week 4: Functions & Call by Value vs Reference", url: "https://www.youtube.com/watch?v=Zi_n_mE3pEM&t=13340s", category: "Week 4 Functions" },
        { time: "4:14:50", seconds: 15290, title: "Week 4: Recursion & Euclidean Greatest Common Divisor", url: "https://www.youtube.com/watch?v=Zi_n_mE3pEM&t=15290s", category: "Week 4 Recursion" },
        { time: "4:48:30", seconds: 17310, title: "Week 5: *(a+i) Pointer Arithmetic & Dereferencing", url: "https://www.youtube.com/watch?v=Zi_n_mE3pEM&t=17310s", category: "Week 5 Pointers" },
        { time: "5:24:15", seconds: 19455, title: "Week 6: Dynamic Memory Allocation (malloc, calloc, free)", url: "https://www.youtube.com/watch?v=Zi_n_mE3pEM&t=19455s", category: "Week 6 Memory" },
        { time: "6:01:40", seconds: 21700, title: "Week 7: Structures, Unions & Array of Structs", url: "https://www.youtube.com/watch?v=Zi_n_mE3pEM&t=21700s", category: "Week 7 Structs" },
        { time: "6:36:20", seconds: 23780, title: "Week 6: File Handling: fopen, fprintf, fscanf, fclose", url: "https://www.youtube.com/watch?v=Zi_n_mE3pEM&t=23780s", category: "Week 6 Files" },
        { time: "7:10:00", seconds: 25800, title: "Week 8: Comprehensive NPTEL Review & Best Practices", url: "https://www.youtube.com/watch?v=Zi_n_mE3pEM&t=25800s", category: "Week 8 Review" }
      ]
    },
    playlists: [
      {
        title: "NPTEL C Programming Complete Course (English)",
        url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR",
        language: "English",
        channel: "Neso Academy / NPTEL",
        videoCount: "8 Weekly Chapters",
        description: "Variables, operators, recursion, *(a+i) pointers, dynamic memory, structs, and file streams."
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
        title: "NPTEL Official Portal — Problem Solving through Programming in C",
        source: "Official Docs",
        url: "https://nptel.ac.in/courses/106104128",
        description: "Official SWAYAM / NPTEL course notes, lecture slides, video transcripts, and assignment archives.",
        category: "NPTEL Portal"
      },
      {
        title: "C Programming Tutorial & Reference Handbook",
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
      },
      {
        title: "W3Schools C Programming Interactive Editor",
        source: "W3Schools",
        url: "https://www.w3schools.com/c/index.php",
        description: "Hands-on browser-based C syntax practice and interactive exercise suite.",
        category: "Interactive Practice"
      }
    ]
  },

  // ==========================================
  // 9. PYTHON PROGRAMMING
  // ==========================================
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
    englishVideo: {
      url: "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
      title: "Python Programming Complete Laboratory Video Tutorials (10 Experiments)",
      description: "Interactive Python virtual laboratory: dynamic typing, string slicing, list comprehensions, OOP class hierarchies, exception handling, and file operations.",
      duration: "10 Experiment Tutorials (Full Course)",
      channel: "Python Programming Master Academy",
      timestamps: [
        { time: "Exp 1", seconds: 0, title: "Exp 1: Dynamic Typing & Primitive Input/Output", url: "https://www.youtube.com/watch?v=rfscVS0vtbw", embedUrl: "https://www.youtube-nocookie.com/embed/rfscVS0vtbw", category: "1. Python Foundations & Control Flow", description: "Python data types, f-string formatting, and type casting." },
        { time: "Exp 2", seconds: 0, title: "Exp 2: Conditionals & Loops with range()", url: "https://www.youtube.com/watch?v=6iF8Xb7Z3wQ", embedUrl: "https://www.youtube-nocookie.com/embed/6iF8Xb7Z3wQ", category: "1. Python Foundations & Control Flow", description: "If-elif-else statements, while/for loops, break, and continue." },
        { time: "Exp 3", seconds: 0, title: "Exp 3: String Operations, Slicing & Regex", url: "https://www.youtube.com/watch?v=k9TUPpGqYTo", embedUrl: "https://www.youtube-nocookie.com/embed/k9TUPpGqYTo", category: "1. Python Foundations & Control Flow", description: "Extended slice step notation, string methods, and regex pattern matching." },
        { time: "Exp 4", seconds: 0, title: "Exp 4: Functions, *args, **kwargs & Lambdas", url: "https://www.youtube.com/watch?v=9Os0o3wzS_I", embedUrl: "https://www.youtube-nocookie.com/embed/9Os0o3wzS_I", category: "2. Functions & Data Structures", description: "Positional/keyword argument unpacking, anonymous lambda functions, and map/filter." },
        { time: "Exp 5", seconds: 0, title: "Exp 5: Lists, Tuples, Sets & Dictionaries", url: "https://www.youtube.com/watch?v=W8KRzm-HUcc", embedUrl: "https://www.youtube-nocookie.com/embed/W8KRzm-HUcc", category: "2. Functions & Data Structures", description: "Mutable lists, immutable tuples, unique sets, and key-value hash dictionaries." },
        { time: "Exp 6", seconds: 0, title: "Exp 6: List, Set & Dictionary Comprehensions", url: "https://www.youtube.com/watch?v=3dt4xGhFzV0", embedUrl: "https://www.youtube-nocookie.com/embed/3dt4xGhFzV0", category: "2. Functions & Data Structures", description: "Concise Pythonic data transformations and conditional filtering in single-line syntax." },
        { time: "Exp 7", seconds: 0, title: "Exp 7: OOP Classes, Objects & __init__ Constructor", url: "https://www.youtube.com/watch?v=ZDa-Z5JzLYM", embedUrl: "https://www.youtube-nocookie.com/embed/ZDa-Z5JzLYM", category: "3. OOP, Exceptions & File I/O", description: "Class blueprints, instance attributes, self reference, and dunder methods." },
        { time: "Exp 8", seconds: 0, title: "Exp 8: Inheritance & Method Overriding", url: "https://www.youtube.com/watch?v=RSl87lqOXDE", embedUrl: "https://www.youtube-nocookie.com/embed/RSl87lqOXDE", category: "3. OOP, Exceptions & File I/O", description: "Subclassing, super() initialization, and runtime method dispatch." },
        { time: "Exp 9", seconds: 0, title: "Exp 9: Exception Handling: try, except, finally", url: "https://www.youtube.com/watch?v=NIWwJbo-9_8", embedUrl: "https://www.youtube-nocookie.com/embed/NIWwJbo-9_8", category: "3. OOP, Exceptions & File I/O", description: "Catching runtime exceptions, custom Exception classes, and cleanup blocks." },
        { time: "Exp 10", seconds: 0, title: "Exp 10: File Operations & Context Managers (with open)", url: "https://www.youtube.com/watch?v=Uh2ebFW8OYM", embedUrl: "https://www.youtube-nocookie.com/embed/Uh2ebFW8OYM", category: "3. OOP, Exceptions & File I/O", description: "Reading, writing files, CSV manipulation, and automatic resource cleanup." }
      ]
    },
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/KCdbwcjyHvA",
      title: "Python Programming Complete Tutorial in Tamil",
      description: "Full Python course in Tamil covering language basics, data structures, list comprehensions, OOP principles, exception handling, and file operations.",
      duration: "8h 20m (16 Chapters)",
      channel: "Tamil Python Track",
      timestamps: [
        { time: "00:00", seconds: 0, title: "Python Installation, IDE Setup & REPL", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA", category: "Language Basics" },
        { time: "18:40", seconds: 1120, title: "Dynamic Typing, Primitive Data Types & Variables", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA&t=1120s", category: "Language Basics" },
        { time: "42:15", seconds: 2535, title: "Operators, Expressions & Formatted Input/Output", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA&t=2535s", category: "Language Basics" },
        { time: "1:08:30", seconds: 4110, title: "Conditional Statements (if, elif, else)", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA&t=4110s", category: "Control Flow" },
        { time: "1:35:50", seconds: 5750, title: "Loops (while, for), range() & Flow Control", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA&t=5750s", category: "Control Flow" },
        { time: "2:06:20", seconds: 7580, title: "Functions, Default Arguments, *args & **kwargs", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA&t=7580s", category: "Functions & Lambdas" },
        { time: "2:35:45", seconds: 9345, title: "Lambda Functions, map(), filter() & reduce()", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA&t=9345s", category: "Functions & Lambdas" },
        { time: "3:08:10", seconds: 11290, title: "Strings Manipulation, Slicing & Regex", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA&t=11290s", category: "Data Structures" },
        { time: "3:42:30", seconds: 13350, title: "Lists & Tuples Operations and Methods", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA&t=13350s", category: "Data Structures" },
        { time: "4:15:40", seconds: 15340, title: "Sets & Dictionaries: Keys, Values & Hashing", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA&t=15340s", category: "Data Structures" },
        { time: "4:48:25", seconds: 17305, title: "List, Set & Dictionary Comprehensions", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA&t=17305s", category: "Data Structures" },
        { time: "5:22:15", seconds: 19335, title: "OOP Classes, Objects & __init__ Constructor", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA&t=19335s", category: "OOP Python" },
        { time: "5:58:40", seconds: 21520, title: "Inheritance, super() & Polymorphism", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA&t=21520s", category: "OOP Python" },
        { time: "6:32:10", seconds: 23530, title: "Exception Handling: try, except, finally", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA&t=23530s", category: "Error & File I/O" },
        { time: "7:05:35", seconds: 25535, title: "File Operations, CSV Parsing & Context Managers", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA&t=25535s", category: "Error & File I/O" },
        { time: "7:40:00", seconds: 27600, title: "Python Modules, Packages & Virtual Environments", url: "https://www.youtube.com/watch?v=KCdbwcjyHvA&t=27600s", category: "Error & File I/O" }
      ]
    },
    playlists: [
      {
        title: "Python Programming Complete Tutorial Series (English)",
        url: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU",
        language: "English",
        channel: "Corey Schafer",
        videoCount: "16 Chapters",
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

  // ==========================================
  // 10. ARTIFICIAL INTELLIGENCE
  // ==========================================
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
    englishVideo: {
      url: "https://www.youtube-nocookie.com/embed/5NgNicANyqM",
      title: "Artificial Intelligence Complete Video Suite (5 Experiments)",
      description: "Master classical heuristic search (A*, Best-First), adversarial Minimax with Alpha-Beta pruning, Constraint Satisfaction (N-Queens), and knowledge-based expert systems.",
      duration: "5 Experiment Tutorials (Full Course)",
      channel: "AI & Intelligent Agents Academy",
      timestamps: [
        { time: "Exp 1", seconds: 0, title: "Exp 1: Uninformed State-Space Search (BFS & DFS)", url: "https://www.youtube.com/watch?v=5NgNicANyqM", embedUrl: "https://www.youtube-nocookie.com/embed/5NgNicANyqM", category: "1. State Space Search", description: "Breadth-first and depth-first search on graph representations." },
        { time: "Exp 2", seconds: 0, title: "Exp 2: A* Search with Manhattan Heuristic (8-Puzzle)", url: "https://www.youtube.com/watch?v=PzEWHH2v3TE", embedUrl: "https://www.youtube-nocookie.com/embed/PzEWHH2v3TE", category: "1. State Space Search", description: "Heuristic evaluation f(n) = g(n) + h(n) on 8-puzzle sliding tiles." },
        { time: "Exp 3", seconds: 0, title: "Exp 3: Minimax Algorithm & Alpha-Beta Pruning", url: "https://www.youtube.com/watch?v=l-hh51ncgDI", embedUrl: "https://www.youtube-nocookie.com/embed/l-hh51ncgDI", category: "2. Adversarial Search", description: "Two-player zero-sum game trees and alpha-beta branch pruning optimization." },
        { time: "Exp 4", seconds: 0, title: "Exp 4: Backtracking CSP Solver for N-Queens", url: "https://www.youtube.com/watch?v=xFv_Hl4B83A", embedUrl: "https://www.youtube-nocookie.com/embed/xFv_Hl4B83A", category: "3. CSP & Inference", description: "Constraint satisfaction problem solving with recursive backtracking." },
        { time: "Exp 5", seconds: 0, title: "Exp 5: Propositional Logic & Expert System Inference", url: "https://www.youtube.com/watch?v=2ePf9rue1Ao", embedUrl: "https://www.youtube-nocookie.com/embed/2ePf9rue1Ao", category: "3. CSP & Inference", description: "Forward and backward chaining rule-based inference engines." }
      ]
    },
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/QGAuolgCTHE",
      title: "Artificial Intelligence Complete Course in Tamil",
      description: "Full AI course in Tamil covering state space search, A* heuristic algorithms, Minimax game theory, CSP solvers, and knowledge representation.",
      duration: "7h 30m (14 Chapters)",
      channel: "AI Tamil Course",
      timestamps: [
        { time: "00:00", seconds: 0, title: "Introduction to AI & Agent Architectures", url: "https://www.youtube.com/watch?v=QGAuolgCTHE", category: "AI Foundations" },
        { time: "22:30", seconds: 1350, title: "Problem Formulation & State Space Search", url: "https://www.youtube.com/watch?v=QGAuolgCTHE&t=1350s", category: "AI Foundations" },
        { time: "48:15", seconds: 2895, title: "Uninformed Search: BFS & DFS Implementations", url: "https://www.youtube.com/watch?v=QGAuolgCTHE&t=2895s", category: "Uninformed Search" },
        { time: "1:18:40", seconds: 4720, title: "Uniform Cost Search & Iterative Deepening", url: "https://www.youtube.com/watch?v=QGAuolgCTHE&t=4720s", category: "Uninformed Search" },
        { time: "1:52:10", seconds: 6730, title: "Heuristic Functions & Greedy Best-First Search", url: "https://www.youtube.com/watch?v=QGAuolgCTHE&t=6730s", category: "Informed Search" },
        { time: "2:26:35", seconds: 8795, title: "A* Search Algorithm on 8-Puzzle Problem", url: "https://www.youtube.com/watch?v=QGAuolgCTHE&t=8795s", category: "Informed Search" },
        { time: "3:04:20", seconds: 11060, title: "Game Trees & Minimax Algorithm", url: "https://www.youtube.com/watch?v=QGAuolgCTHE&t=11060s", category: "Adversarial Search" },
        { time: "3:38:45", seconds: 13125, title: "Alpha-Beta Pruning Optimization", url: "https://www.youtube.com/watch?v=QGAuolgCTHE&t=13125s", category: "Adversarial Search" },
        { time: "4:14:10", seconds: 15250, title: "Constraint Satisfaction Problems (CSP)", url: "https://www.youtube.com/watch?v=QGAuolgCTHE&t=15250s", category: "Constraint Satisfaction" },
        { time: "4:48:30", seconds: 17310, title: "Backtracking CSP Solver & N-Queens Puzzle", url: "https://www.youtube.com/watch?v=QGAuolgCTHE&t=17310s", category: "Constraint Satisfaction" },
        { time: "5:22:15", seconds: 19335, title: "Propositional Logic & Truth Tables", url: "https://www.youtube.com/watch?v=QGAuolgCTHE&t=19335s", category: "Knowledge & Inference" },
        { time: "5:56:40", seconds: 21400, title: "First-Order Predicate Logic & Unification", url: "https://www.youtube.com/watch?v=QGAuolgCTHE&t=21400s", category: "Knowledge & Inference" },
        { time: "6:30:20", seconds: 23420, title: "Forward & Backward Chaining Inference Engines", url: "https://www.youtube.com/watch?v=QGAuolgCTHE&t=23420s", category: "Knowledge & Inference" },
        { time: "7:04:00", seconds: 25440, title: "Expert Systems Architecture & Rule Solvers", url: "https://www.youtube.com/watch?v=QGAuolgCTHE&t=25440s", category: "Knowledge & Inference" }
      ]
    },
    playlists: [
      {
        title: "Artificial Intelligence Complete Course (Tamil)",
        url: "https://www.youtube.com/watch?v=QGAuolgCTHE",
        embedUrl: "https://www.youtube-nocookie.com/embed/QGAuolgCTHE",
        language: "Tamil",
        channel: "AI Tamil Course",
        videoCount: "14 Chapters",
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

  // ==========================================
  // 11. BIG DATA ANALYTICS
  // ==========================================
  {
    id: "big-data-analytics",
    code: "CS8711",
    name: "Big Data Analytics Lab",
    shortTitle: "BDAL",
    discipline: "Artificial Intelligence & Data Science",
    disciplineSlug: "aids",
    shortDesc: "Deploy distributed MapReduce paradigms, Hadoop HDFS file architectures, NoSQL database operations, K-Means clustering, and linear regression on big data.",
    description: "Hands-on Big Data computing laboratory focusing on Hadoop Distributed File System (HDFS) node replication, distributed MapReduce computing workflows, matrix multiplication, word count, unstructured data ingestion into NoSQL databases, distributed K-Means clustering, and distributed linear regression.",
    institute: "VSB Engineering College, Karur",
    department: "Department of Artificial Intelligence & Data Science",
    difficulty: "Advanced",
    experimentsCount: 7,
    rating: 4.91,
    ratingsCount: 275,
    iconName: "BarChart3",
    tags: ["Hadoop HDFS", "MapReduce", "Apache Spark", "PySpark", "NoSQL MongoDB"],
    bannerGradient: "from-amber-700 via-orange-950 to-slate-950",
    videoUrl: "https://www.youtube-nocookie.com/embed/1vbXmCrkT3Y",
    englishVideo: {
      url: "https://www.youtube-nocookie.com/embed/1vbXmCrkT3Y",
      title: "Big Data Analytics Complete Video Suite (5 Experiments)",
      description: "Deploy distributed MapReduce paradigms, Hadoop HDFS file architectures, PySpark DataFrame aggregations, and large-scale NoSQL analytics.",
      duration: "5 Experiment Tutorials (Full Course)",
      channel: "Big Data & Distributed Computing Academy",
      timestamps: [
        { time: "Exp 1", seconds: 0, title: "Exp 1: Hadoop Cluster Architecture & HDFS CLI", url: "https://www.youtube.com/watch?v=1vbXmCrkT3Y", embedUrl: "https://www.youtube-nocookie.com/embed/1vbXmCrkT3Y", category: "1. Hadoop & HDFS", description: "NameNode, DataNode architecture, replication factor, and HDFS shell commands." },
        { time: "Exp 2", seconds: 0, title: "Exp 2: Distributed WordCount MapReduce in Python", url: "https://www.youtube.com/watch?v=bcj7y-r4k9Y", embedUrl: "https://www.youtube-nocookie.com/embed/bcj7y-r4k9Y", category: "2. MapReduce Paradigms", description: "Mapper tokenization, shuffle-and-sort, and reducer summation." },
        { time: "Exp 3", seconds: 0, title: "Exp 3: Matrix Multiplication using MapReduce", url: "https://www.youtube.com/watch?v=P2d8f9L2y3Q", embedUrl: "https://www.youtube-nocookie.com/embed/P2d8f9L2y3Q", category: "2. MapReduce Paradigms", description: "Two-stage MapReduce distributed matrix vector multiplication." },
        { time: "Exp 4", seconds: 0, title: "Exp 4: PySpark DataFrame ETL & Spark SQL", url: "https://www.youtube.com/watch?v=_C8kWso4dU4", embedUrl: "https://www.youtube-nocookie.com/embed/_C8kWso4dU4", category: "3. Apache Spark & NoSQL", description: "In-memory RDD transformations, DataFrame operations, and SQL queries." },
        { time: "Exp 5", seconds: 0, title: "Exp 5: NoSQL MongoDB Aggregation Pipeline", url: "https://www.youtube.com/watch?v=ofme2o29ngU", embedUrl: "https://www.youtube-nocookie.com/embed/ofme2o29ngU", category: "3. Apache Spark & NoSQL", description: "JSON document clustering, match, group, and project pipelines." }
      ]
    },
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/1vbXmCrkT3Y",
      title: "Big Data Analytics & Apache Spark Masterclass in Tamil",
      description: "Complete Big Data course in Tamil covering Hadoop HDFS, MapReduce, Apache Spark, and NoSQL MongoDB.",
      duration: "7h 15m (13 Chapters)",
      channel: "Tamil Big Data Series",
      timestamps: [
        { time: "00:00", seconds: 0, title: "Introduction to Big Data & The 5 V's", url: "https://www.youtube.com/watch?v=1vbXmCrkT3Y", category: "Big Data Architecture" },
        { time: "24:15", seconds: 1455, title: "Hadoop Ecosystem & Cluster Architecture", url: "https://www.youtube.com/watch?v=1vbXmCrkT3Y&t=1455s", category: "Big Data Architecture" },
        { time: "54:30", seconds: 3270, title: "HDFS Architecture: NameNode & DataNode", url: "https://www.youtube.com/watch?v=1vbXmCrkT3Y&t=3270s", category: "HDFS Operations" },
        { time: "1:26:10", seconds: 5170, title: "HDFS CLI Commands & Block Replication", url: "https://www.youtube.com/watch?v=1vbXmCrkT3Y&t=5170s", category: "HDFS Operations" },
        { time: "2:02:40", seconds: 7360, title: "MapReduce Model: Map, Shuffle, Sort & Reduce", url: "https://www.youtube.com/watch?v=1vbXmCrkT3Y&t=7360s", category: "MapReduce Framework" },
        { time: "2:38:15", seconds: 9495, title: "Word Count MapReduce Program in Python", url: "https://www.youtube.com/watch?v=1vbXmCrkT3Y&t=9495s", category: "MapReduce Framework" },
        { time: "3:14:50", seconds: 11690, title: "Matrix Multiplication with MapReduce", url: "https://www.youtube.com/watch?v=1vbXmCrkT3Y&t=11690s", category: "MapReduce Framework" },
        { time: "3:52:20", seconds: 13940, title: "Apache Spark Architecture & RDD Concepts", url: "https://www.youtube.com/watch?v=1vbXmCrkT3Y&t=13940s", category: "Apache Spark" },
        { time: "4:28:40", seconds: 16120, title: "Spark DataFrames & In-Memory Transformations", url: "https://www.youtube.com/watch?v=1vbXmCrkT3Y&t=16120s", category: "Apache Spark" },
        { time: "5:04:15", seconds: 18255, title: "Interactive PySpark & Spark SQL Analytics", url: "https://www.youtube.com/watch?v=1vbXmCrkT3Y&t=18255s", category: "Apache Spark" },
        { time: "5:42:30", seconds: 20550, title: "Apache Hive Data Warehousing & HiveQL", url: "https://www.youtube.com/watch?v=1vbXmCrkT3Y&t=20550s", category: "Data Warehousing" },
        { time: "6:18:10", seconds: 22690, title: "NoSQL Paradigms & MongoDB Cluster Setup", url: "https://www.youtube.com/watch?v=1vbXmCrkT3Y&t=22690s", category: "NoSQL Analytics" },
        { time: "6:54:00", seconds: 24840, title: "MongoDB Aggregation Pipelines for Big Data", url: "https://www.youtube.com/watch?v=1vbXmCrkT3Y&t=24840s", category: "NoSQL Analytics" }
      ]
    },
    playlists: [
      {
        title: "Big Data Analytics Complete Playlist (Tamil)",
        url: "https://www.youtube.com/playlist?list=PLfNKAsmI385ICtRCRhiwxT9rCfYxOmUD8",
        embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLfNKAsmI385ICtRCRhiwxT9rCfYxOmUD8",
        language: "Tamil",
        channel: "Tamil Big Data Series",
        videoCount: "13 Chapters",
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
    semester: "Semester 5",
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

  // ==========================================
  // 12. CLOUD SERVICE MANAGEMENT
  // ==========================================
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
    englishVideo: {
      url: "https://www.youtube-nocookie.com/embed/2LaAJq1lB1Q",
      title: "Cloud Service Management & DevOps Video Suite (5 Experiments)",
      description: "Provision scalable AWS EC2/S3 cloud infrastructure, Docker containerization, AWS Lambda serverless microservices, and Kubernetes orchestration.",
      duration: "5 Experiment Tutorials (Full Course)",
      channel: "Cloud & DevOps Academy",
      timestamps: [
        { time: "Exp 1", seconds: 0, title: "Exp 1: Provisioning Virtual Compute on AWS EC2", url: "https://www.youtube.com/watch?v=2LaAJq1lB1Q", embedUrl: "https://www.youtube-nocookie.com/embed/2LaAJq1lB1Q", category: "1. Infrastructure as a Service", description: "Launching EC2 instances, SSH key pairs, and security groups." },
        { time: "Exp 2", seconds: 0, title: "Exp 2: Scalable Storage & Bucket Policies on AWS S3", url: "https://www.youtube.com/watch?v=e6w9LwTE7qE", embedUrl: "https://www.youtube-nocookie.com/embed/e6w9LwTE7qE", category: "1. Infrastructure as a Service", description: "Object buckets, CORS configuration, and IAM bucket security policies." },
        { time: "Exp 3", seconds: 0, title: "Exp 3: Docker Containerization & Dockerfile Creation", url: "https://www.youtube.com/watch?v=fqMOX6JJhGo", embedUrl: "https://www.youtube-nocookie.com/embed/fqMOX6JJhGo", category: "2. Containerization & DevOps", description: "Writing Dockerfiles, building lightweight images, and port publishing." },
        { time: "Exp 4", seconds: 0, title: "Exp 4: Multi-Container Orchestration with Docker Compose", url: "https://www.youtube.com/watch?v=HG6yIjZapSA", embedUrl: "https://www.youtube-nocookie.com/embed/HG6yIjZapSA", category: "2. Containerization & DevOps", description: "Defining web app, database, and cache services in docker-compose.yml." },
        { time: "Exp 5", seconds: 0, title: "Exp 5: Serverless Microservices with AWS Lambda & Kubernetes", url: "https://www.youtube.com/watch?v=71wuzx5W-QU", embedUrl: "https://www.youtube-nocookie.com/embed/71wuzx5W-QU", category: "3. Serverless & Kubernetes", description: "Event-driven serverless triggers and Kubernetes pod deployments." }
      ]
    },
    tamilVideo: {
      url: "https://www.youtube-nocookie.com/embed/8CnuGPfmOPs",
      title: "Cloud Computing & AWS Complete Tutorial in Tamil",
      description: "Comprehensive Tamil tutorial covering AWS cloud foundations, EC2 computing instances, S3 storage, Docker containerization, and cloud deployment.",
      duration: "7h 40m (14 Chapters)",
      channel: "AWS Tamil Tutorial",
      timestamps: [
        { time: "00:00", seconds: 0, title: "Cloud Computing Models (IaaS, PaaS, SaaS)", url: "https://www.youtube.com/watch?v=8CnuGPfmOPs", category: "Cloud Concepts" },
        { time: "20:45", seconds: 1245, title: "Cloud Virtualization & Elastic Scalability", url: "https://www.youtube.com/watch?v=8CnuGPfmOPs&t=1245s", category: "Cloud Concepts" },
        { time: "48:20", seconds: 2900, title: "AWS Global Infrastructure: Regions & AZs", url: "https://www.youtube.com/watch?v=8CnuGPfmOPs&t=2900s", category: "AWS Core" },
        { time: "1:22:15", seconds: 4935, title: "Provisioning Compute Instances with AWS EC2", url: "https://www.youtube.com/watch?v=8CnuGPfmOPs&t=4935s", category: "AWS Core" },
        { time: "1:56:40", seconds: 7000, title: "AWS S3 Object Storage & Bucket Policies", url: "https://www.youtube.com/watch?v=8CnuGPfmOPs&t=7000s", category: "AWS Core" },
        { time: "2:30:10", seconds: 9010, title: "Virtual Private Cloud (VPC) & Security Groups", url: "https://www.youtube.com/watch?v=8CnuGPfmOPs&t=9010s", category: "AWS Core" },
        { time: "3:04:35", seconds: 11075, title: "IAM Roles, User Permissions & Policies", url: "https://www.youtube.com/watch?v=8CnuGPfmOPs&t=11075s", category: "AWS Core" },
        { time: "3:40:20", seconds: 13220, title: "Docker Fundamentals & Container Architecture", url: "https://www.youtube.com/watch?v=8CnuGPfmOPs&t=13220s", category: "DevOps & Containers" },
        { time: "4:15:45", seconds: 15345, title: "Writing Dockerfiles & Building Images", url: "https://www.youtube.com/watch?v=8CnuGPfmOPs&t=15345s", category: "DevOps & Containers" },
        { time: "4:50:10", seconds: 17410, title: "Multi-Container Orchestration with Compose", url: "https://www.youtube.com/watch?v=8CnuGPfmOPs&t=17410s", category: "DevOps & Containers" },
        { time: "5:26:30", seconds: 19590, title: "Serverless Architecture with AWS Lambda", url: "https://www.youtube.com/watch?v=8CnuGPfmOPs&t=19590s", category: "Serverless & K8s" },
        { time: "6:02:15", seconds: 21735, title: "Kubernetes Architecture: Pods & Services", url: "https://www.youtube.com/watch?v=8CnuGPfmOPs&t=21735s", category: "Serverless & K8s" },
        { time: "6:38:40", seconds: 23920, title: "Deploying Scalable Microservices on K8s", url: "https://www.youtube.com/watch?v=8CnuGPfmOPs&t=23920s", category: "Serverless & K8s" },
        { time: "7:14:00", seconds: 26040, title: "CloudWatch Monitoring & CI/CD Pipelines", url: "https://www.youtube.com/watch?v=8CnuGPfmOPs&t=26040s", category: "Serverless & K8s" }
      ]
    },
    playlists: [
      {
        title: "Cloud Computing & AWS Complete Tutorial (Tamil)",
        url: "https://www.youtube.com/watch?v=8CnuGPfmOPs",
        embedUrl: "https://www.youtube-nocookie.com/embed/8CnuGPfmOPs",
        language: "Tamil",
        channel: "AWS Tamil",
        videoCount: "14 Chapters",
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
    semester: "Semester 5",
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
