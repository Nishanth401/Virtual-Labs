// =======================================================================
// V.S.B. ENGINEERING COLLEGE, KARUR (An Autonomous Institution)
// DEPARTMENT OF ARTIFICIAL INTELLIGENCE AND DATA SCIENCE
// OFFICIAL LABORATORY MANUALS DATA (CURRICULUM, OBJECTIVES, OUTCOMES, CO-PO)
// =======================================================================

export interface CourseOutcome {
  code: string;
  statement: string;
  bloomsLevel?: string;
}

export interface CoPoMappingRow {
  coCode: string;
  po: (number | string)[]; // PO1 to PO12
  pso: (number | string)[]; // PSO1 to PSO3
}

export interface CoPoMappingData {
  headersPO: string[];
  headersPSO: string[];
  rows: CoPoMappingRow[];
  averageRow: {
    po: (number | string)[];
    pso: (number | string)[];
  };
}

export interface LabManualCurriculum {
  labId: string;
  courseCode: string;
  courseTitle: string;
  regulation: string;
  academicYear: string;
  department: string;
  institution: string;
  overview: string;
  courseObjectives: string[];
  courseOutcomes: CourseOutcome[];
  coPoMapping: CoPoMappingData;
  visionDepartment: string[];
  missionDepartment: string[];
  peos: { code: string; text: string }[];
  psos: { code: string; text: string }[];
}

export const INSTITUTION_VISION_MISSION = {
  institution: "V.S.B. ENGINEERING COLLEGE, KARUR (An Autonomous Institution)",
  vision: "We endeavour to impart futuristic technical education of the highest quality to the student community and to inculcate discipline in them to face the world with self-confidence and thus we prepare them for life as responsible citizens to uphold human values and to be of service at large. We strive to bring the Institution as an Institution of academic excellence of International standard.",
  mission: "We transform persons into personalities by the state-of-the-art infrastructure, time consciousness, quick response and the best academic practices through assessment and advice.",
  departmentVision: [
    "To attain exceptional standards of quality education, the approach involves leveraging cutting-edge tools, fostering a culture of collaboration, and disseminating innovations tailored to the needs of students and industry.",
    "This initiative is designed to contribute significantly to societal advancement by aligning educational practices with the evolving landscape of academia and industry."
  ],
  departmentMission: [
    "The goal is to cultivate adept professionals specializing in the fields of Artificial Intelligence and Data Science.",
    "The objective is to provide education of high quality with a focus on values, contributing to the advancement of computing, expert systems, and Data Science.",
    "The aim is to elevate satisfaction levels among all stakeholders through innovation in these domains.",
    "Our commitment is directed towards applying the latest advancements in both high-performance computing hardware and software.",
    "Our focus is on the development of software tailored for peripheral computing devices, including printers, modems, and scanners."
  ],
  peos: [
    {
      code: "PEO 1",
      text: "Utilize expertise in the domains of Health Care, Education, Agriculture, Intelligent Transport, Environment, and Smart Systems, as well as in the interdisciplinary realms of Artificial Intelligence and Data Science."
    },
    {
      code: "PEO 2",
      text: "Apply acquired engineering skills from industry internships to address real-world challenges across diverse domains, employing software applications for effective problem-solving."
    },
    {
      code: "PEO 3",
      text: "Cultivate essential skills to embark on entrepreneurial journeys, pursue roles as data scientists, and establish businesses within the realms of artificial intelligence and data science."
    }
  ],
  psos: [
    {
      code: "PSO 1",
      text: "Evolve AI based efficient domain specific processes for effective decision making in several domains such as business and governance domains."
    },
    {
      code: "PSO 2",
      text: "Arrive at actionable Foresight, Insight, hindsight from data for solving business and engineering problems create, select and apply the theoretical knowledge of AI and Data Analytics along with practical industrial tools and techniques to manage and solve wicked societal problems."
    },
    {
      code: "PSO 3",
      text: "Develop data analytics and data visualization skills, skills pertaining to knowledge acquisition, knowledge representation and knowledge engineering, and hence be capable of coordinating complex projects."
    }
  ],
  pos: [
    { code: "PO1", title: "Engineering Knowledge", text: "Apply knowledge of mathematics, science, engineering fundamentals, and specialization to solve complex engineering problems." },
    { code: "PO2", title: "Problem Analysis", text: "Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions." },
    { code: "PO3", title: "Design/Development of Solutions", text: "Design solutions for complex engineering problems and system components meeting specified needs with public health, safety, and environmental considerations." },
    { code: "PO4", title: "Conduct Investigations", text: "Use research-based knowledge and methods including design of experiments, data analysis, and synthesis to provide valid conclusions." },
    { code: "PO5", title: "Modern Tool Usage", text: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools with an understanding of limitations." },
    { code: "PO6", title: "The Engineer and Society", text: "Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal, and cultural responsibilities." },
    { code: "PO7", title: "Environment and Sustainability", text: "Understand the impact of engineering solutions in societal and environmental contexts, demonstrating the need for sustainable development." },
    { code: "PO8", title: "Ethics", text: "Apply ethical principles and commit to professional ethics and responsibilities of engineering practice." },
    { code: "PO9", title: "Individual and Team Work", text: "Function effectively as an individual, and as a member or leader in diverse teams in multidisciplinary settings." },
    { code: "PO10", title: "Communication", text: "Communicate effectively on complex engineering activities with the engineering community and society at large." },
    { code: "PO11", title: "Project Management and Finance", text: "Demonstrate knowledge and understanding of engineering and management principles and apply these to manage projects." },
    { code: "PO12", title: "Life-long Learning", text: "Recognize the need for, and have preparation and ability to engage in independent and life-long learning." }
  ]
};

export const LAB_MANUALS_DATA: Record<string, LabManualCurriculum> = {
  // ==========================================
  // 1. CLOUD SERVICE MANAGEMENT (CSM)
  // ==========================================
  "cloud-service-management": {
    labId: "cloud-service-management",
    courseCode: "CS8811",
    courseTitle: "Cloud Service Management Laboratory",
    regulation: "R2023 / R2021",
    academicYear: "2026-2027 (ODD Semester)",
    department: "Department of Artificial Intelligence and Data Science",
    institution: "V.S.B. Engineering College, Karur (An Autonomous Institution)",
    overview: "The Cloud Service Management Laboratory provides hands-on engineering skills in designing, deploying, governing, and optimizing cloud-native enterprise services across AWS, Azure, Google Cloud, and private clouds. Students master multi-account cloud organizational architectures with Role-Based Access Control (RBAC), build quantitative web application cost-models with TCO/cost-benefit analysis, configure proactive resource alerts, establish financial billing budgets, and conduct multi-cloud cross-provider pricing trade-off comparisons.",
    courseObjectives: [
      "Introduce Cloud Service Management terminology, definition & concepts.",
      "Compare and contrast cloud service management with traditional IT service management.",
      "Identify strategies to reduce risk and eliminate issues associated with adoption of cloud services.",
      "Select appropriate structures for designing, deploying and running cloud-based services in a business environment.",
      "Illustrate the benefits and drive the adoption of cloud-based services to solve real world problems."
    ],
    courseOutcomes: [
      {
        code: "CO1",
        statement: "Exhibit cloud-design skills to build and automate business solutions using cloud technologies.",
        bloomsLevel: "Apply / Create"
      },
      {
        code: "CO2",
        statement: "Possess strong theoretical foundation leading to excellence and excitement towards adoption of cloud-based services.",
        bloomsLevel: "Understand / Analyze"
      },
      {
        code: "CO3",
        statement: "Solve the real world problems using Cloud services and technologies.",
        bloomsLevel: "Apply / Evaluate"
      }
    ],
    coPoMapping: {
      headersPO: ["PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO7", "PO8", "PO9", "PO10", "PO11", "PO12"],
      headersPSO: ["PSO1", "PSO2", "PSO3"],
      rows: [
        { coCode: "CO1", po: [3, 3, 1, 1, 1, "-", "-", "-", 2, 1, 3, 2], pso: [2, 1, 3] },
        { coCode: "CO2", po: [3, 1, 2, 3, 2, "-", "-", "-", 1, 2, 3, 1], pso: [2, 2, 2] },
        { coCode: "CO3", po: [1, 1, 3, 1, 3, "-", "-", "-", 3, 3, 1, 1], pso: [3, 2, 1] },
        { coCode: "CO4", po: [1, 1, 1, 2, 3, "-", "-", "-", 2, 3, 3, 1], pso: [1, 1, 1] },
        { coCode: "CO5", po: [1, 3, 3, 2, 2, "-", "-", "-", 1, 3, 1, 2], pso: [1, 3, 2] }
      ],
      averageRow: {
        po: [1.8, 1.8, 2.0, 1.8, 2.2, "-", "-", "-", 1.8, 2.4, 2.2, 1.4],
        pso: [1.8, 1.8, 1.8]
      }
    },
    visionDepartment: INSTITUTION_VISION_MISSION.departmentVision,
    missionDepartment: INSTITUTION_VISION_MISSION.departmentMission,
    peos: INSTITUTION_VISION_MISSION.peos,
    psos: INSTITUTION_VISION_MISSION.psos
  },

  // ==========================================
  // 2. DEEP LEARNING (DL)
  // ==========================================
  "ai-machine-learning": {
    labId: "ai-machine-learning",
    courseCode: "AD8481",
    courseTitle: "Deep Learning Laboratory",
    regulation: "R2023 / R2021",
    academicYear: "2026-2027 (ODD Semester)",
    department: "Department of Artificial Intelligence and Data Science",
    institution: "V.S.B. Engineering College, Karur (An Autonomous Institution)",
    overview: "The Deep Learning Laboratory empowers students to design, train, evaluate, and optimize modern deep neural network architectures using Python, TensorFlow, and PyTorch. The curriculum progresses from multi-layer perceptrons solving non-linear decision boundaries (XOR problem), to Convolutional Neural Networks (CNN) for character and facial feature recognition, Recurrent Neural Networks (RNN) and Long Short-Term Memory (LSTM) for natural language sequence modeling and sentiment analysis, Sequence-to-Sequence (Seq2Seq) and Encoder-Decoder architectures for POS tagging and machine translation, through to Generative Adversarial Networks (GANs) for high-fidelity data augmentation.",
    courseObjectives: [
      "To understand the tools and techniques to implement deep neural networks.",
      "To apply different deep learning architectures for solving problems.",
      "To implement generative models for suitable applications.",
      "To learn to build and validate different models."
    ],
    courseOutcomes: [
      {
        code: "C503.1",
        statement: "Apply deep neural network for simple problems.",
        bloomsLevel: "Apply (K3)"
      },
      {
        code: "C503.2",
        statement: "Apply Convolution Neural Network for image processing.",
        bloomsLevel: "Apply (K3)"
      },
      {
        code: "C503.3",
        statement: "Apply Recurrent Neural Network and its variants for text analysis.",
        bloomsLevel: "Apply (K3)"
      },
      {
        code: "C503.4",
        statement: "Apply generative models for data augmentation.",
        bloomsLevel: "Apply / Create (K3/K4)"
      },
      {
        code: "C503.5",
        statement: "Develop real-world solutions using suitable deep neural networks.",
        bloomsLevel: "Create / Synthesize (K6)"
      }
    ],
    coPoMapping: {
      headersPO: ["PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO7", "PO8", "PO9", "PO10", "PO11", "PO12"],
      headersPSO: ["PSO1", "PSO2", "PSO3"],
      rows: [
        { coCode: "C503.1", po: [3, 2, 1, 1, 1, "-", "-", "-", 3, 2, 3, 2], pso: [3, 3, 2] },
        { coCode: "C503.2", po: [1, 3, 2, 2, 2, "-", "-", "-", 3, 2, 2, 2], pso: [1, 3, 1] },
        { coCode: "C503.3", po: [3, 2, 1, 2, 1, "-", "-", "-", 2, 3, 1, 1], pso: [2, 3, 3] },
        { coCode: "C503.4", po: [3, 3, 1, 2, 1, "-", "-", "-", 1, 3, 2, 2], pso: [3, 2, 2] },
        { coCode: "C503.5", po: [3, 3, 3, 3, 2, "-", "-", "-", 1, 2, 3, 1], pso: [3, 3, 2] }
      ],
      averageRow: {
        po: [2.6, 2.6, 1.6, 2.0, 1.4, "-", "-", "-", 2.0, 2.4, 2.2, 1.6],
        pso: [2.4, 2.8, 2.0]
      }
    },
    visionDepartment: INSTITUTION_VISION_MISSION.departmentVision,
    missionDepartment: INSTITUTION_VISION_MISSION.departmentMission,
    peos: INSTITUTION_VISION_MISSION.peos,
    psos: INSTITUTION_VISION_MISSION.psos
  },

  // ==========================================
  // 3. BIG DATA ANALYTICS (BDA)
  // ==========================================
  "big-data-analytics": {
    labId: "big-data-analytics",
    courseCode: "CS8711",
    courseTitle: "Big Data Analytics Laboratory",
    regulation: "R2023 / R2021",
    academicYear: "2026-2027 (ODD Semester)",
    department: "Department of Artificial Intelligence and Data Science",
    institution: "V.S.B. Engineering College, Karur (An Autonomous Institution)",
    overview: "The Big Data Analytics Laboratory delivers comprehensive practical training in distributed storage architectures, large-scale data lake management, and parallel MapReduce analytics. Students install and configure Apache Hadoop in Standalone, Pseudo-Distributed, and Fully Distributed cluster modes, execute distributed file operations via HDFS CLI, develop two-stage MapReduce algorithms in Java/Python for word counting and distributed matrix multiplication, deploy Apache Hive data warehousing pipelines, configure Apache HBase NoSQL column-family storage with Thrift protocols, and automate data import/export ETL across relational and NoSQL databases.",
    courseObjectives: [
      "To understand the Basics of Big Data.",
      "To learn and use NoSQL Big Data Management.",
      "To learn MapReduce Analytics using Hadoop and related tools.",
      "To work with MapReduce Applications.",
      "To understand the usage of Hadoop-related tools for Big Data Analytics."
    ],
    courseOutcomes: [
      {
        code: "C305.1",
        statement: "Describe the Basics of Big Data and configure distributed Hadoop file storage.",
        bloomsLevel: "Understand / Apply"
      },
      {
        code: "C305.2",
        statement: "Explain NoSQL Big Data Management and execute distributed document transformations.",
        bloomsLevel: "Understand / Apply"
      },
      {
        code: "C305.3",
        statement: "Install and Configure Hadoop and HDFS clusters across varied modes.",
        bloomsLevel: "Apply / Analyze"
      },
      {
        code: "C305.4",
        statement: "Perform Map-Reduce analytics using Hadoop on large-scale datasets.",
        bloomsLevel: "Apply / Evaluate"
      },
      {
        code: "C305.5",
        statement: "Use Hadoop-related tools such as HBase, Cassandra, Pig, and Hive for Big Data Analytics.",
        bloomsLevel: "Apply / Create"
      }
    ],
    coPoMapping: {
      headersPO: ["PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO7", "PO8", "PO9", "PO10", "PO11", "PO12"],
      headersPSO: ["PSO1", "PSO2", "PSO3"],
      rows: [
        { coCode: "C305.1", po: [3, 3, 3, 3, 3, "-", "-", "-", 2, 2, 3, 1], pso: [1, 3, 1] },
        { coCode: "C305.2", po: [3, 3, 2, 3, 3, "-", "-", "-", 2, 2, 3, 3], pso: [2, 3, 1] },
        { coCode: "C305.3", po: [3, 3, 3, 2, 3, "-", "-", "-", 2, 2, 1, 2], pso: [2, 3, 1] },
        { coCode: "C305.4", po: [2, 3, 3, 3, 3, "-", "-", "-", 2, 2, 3, 2], pso: [3, 3, 1] },
        { coCode: "C305.5", po: [3, 3, 3, 3, 3, "-", "-", "-", 3, 1, 3, 2], pso: [3, 3, 1] }
      ],
      averageRow: {
        po: [2.8, 3.0, 2.8, 2.8, 3.0, "-", "-", "-", 2.2, 1.8, 2.6, 2.0],
        pso: [2.2, 3.0, 1.0]
      }
    },
    visionDepartment: INSTITUTION_VISION_MISSION.departmentVision,
    missionDepartment: INSTITUTION_VISION_MISSION.departmentMission,
    peos: INSTITUTION_VISION_MISSION.peos,
    psos: INSTITUTION_VISION_MISSION.psos
  },

  // ==========================================
  // 4. DATABASE MANAGEMENT SYSTEMS (DBMS)
  // ==========================================
  "dbms-lab": {
    labId: "dbms-lab",
    courseCode: "AD8301",
    courseTitle: "Database Management Systems Laboratory",
    regulation: "R2023 / R2021",
    academicYear: "2026-2027 (ODD/EVEN Semester)",
    department: "Department of Artificial Intelligence and Data Science",
    institution: "V.S.B. Engineering College, Karur (An Autonomous Institution)",
    overview: "The Database Management Systems Laboratory provides intensive, practical mastery over relational schema modeling, SQL query authoring, normalization theory, transaction concurrency, and PL/SQL programmatic database logic in MySQL. Covering 15 real-world scenarios from e-commerce to hospital appointment systems and core banking, students design ER diagrams, normalize schemas from UNF through BCNF, enforce entity and referential integrity constraints, test ACID guarantees and the CAP theorem, optimize query execution using B-Tree and Hash indexes, and implement production-grade database systems with stored procedures, cursors, triggers, and audit trails.",
    courseObjectives: [
      "To understand and design conceptual Entity-Relationship (ER) models and convert them to normalized relational schemas.",
      "To master DDL, DML, and DCL commands for table creation, schema modification, and data manipulation in MySQL.",
      "To apply ACID properties, transaction control (COMMIT, ROLLBACK, SAVEPOINT), and analyze CAP theorem guarantees in multi-user database systems.",
      "To formulate complex analytical queries using Joins, Subqueries, Aggregations, Window Ranking Functions, and Views.",
      "To implement enterprise database programmability using Stored Procedures, Functions, Cursors, Triggers, and Exception Handlers."
    ],
    courseOutcomes: [
      {
        code: "C207.1",
        statement: "Design conceptual ER diagrams and systematically convert them into normalized relational schemas up to BCNF.",
        bloomsLevel: "Apply / Create (K3/K6)"
      },
      {
        code: "C207.2",
        statement: "Implement DDL, DML, and integrity constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, DEFAULT) ensuring data integrity.",
        bloomsLevel: "Apply (K3)"
      },
      {
        code: "C207.3",
        statement: "Execute transactions enforcing ACID properties, transaction isolation levels, and savepoint rollbacks.",
        bloomsLevel: "Apply / Analyze (K3/K4)"
      },
      {
        code: "C207.4",
        statement: "Formulate advanced analytical SQL queries using multi-table Joins, Subqueries, Analytic Window Functions, and Views.",
        bloomsLevel: "Analyze / Evaluate (K4/K5)"
      },
      {
        code: "C207.5",
        statement: "Develop robust database applications incorporating Stored Procedures, User-Defined Functions, Cursors, and Triggers.",
        bloomsLevel: "Create (K6)"
      }
    ],
    coPoMapping: {
      headersPO: ["PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO7", "PO8", "PO9", "PO10", "PO11", "PO12"],
      headersPSO: ["PSO1", "PSO2", "PSO3"],
      rows: [
        { coCode: "C207.1", po: [1, 3, 3, 3, 1, "-", "-", "-", 1, "-", "-", 2], pso: [1, 3, 1] },
        { coCode: "C207.2", po: [1, 3, 3, 3, 1, "-", "-", "-", 1, "-", "-", 2], pso: [1, 3, 1] },
        { coCode: "C207.3", po: [1, 3, 3, 3, 1, "-", "-", "-", 1, "-", "-", 2], pso: [1, 3, 1] },
        { coCode: "C207.4", po: [1, 3, 3, 3, 1, "-", "-", "-", 1, "-", "-", 2], pso: [1, 3, 1] },
        { coCode: "C207.5", po: [1, 3, 3, 3, 1, "-", "-", "-", 1, "-", "-", 2], pso: [1, 3, 1] }
      ],
      averageRow: {
        po: [1.0, 3.0, 3.0, 3.0, 1.0, "-", "-", "-", 1.0, "-", "-", 2.0],
        pso: [2.0, 2.0, 2.0]
      }
    },
    visionDepartment: INSTITUTION_VISION_MISSION.departmentVision,
    missionDepartment: INSTITUTION_VISION_MISSION.departmentMission,
    peos: INSTITUTION_VISION_MISSION.peos,
    psos: INSTITUTION_VISION_MISSION.psos
  },

  // ==========================================
  // 5. OBJECT ORIENTED PROGRAMMING (OOP JAVA)
  // ==========================================
  "oops-java": {
    labId: "oops-java",
    courseCode: "AD8302",
    courseTitle: "Object Oriented Programming Laboratory (Java)",
    regulation: "R2023 / R2021",
    academicYear: "2026-2027 (ODD Semester)",
    department: "Department of Artificial Intelligence and Data Science",
    institution: "V.S.B. Engineering College, Karur (An Autonomous Institution)",
    overview: "The Object Oriented Programming (Java) Laboratory cultivates robust software development skills for real-world enterprise applications. Covering 15 core experiments, students apply object-oriented design principles including classes, encapsulation, constructors, method overloading/overriding, single and hierarchical inheritance, abstract classes, interfaces, dynamic method dispatch, custom exception hierarchies, multidimensional matrix algorithms, string algorithms (Anagrams, Pattern Matching, Kadane's algorithm), Java Collections (ArrayList, HashSet, HashMap), Stream API & Lambdas, and end-to-end JDBC database connectivity.",
    courseObjectives: [
      "To build software development skills using java programming for real-world applications.",
      "To understand and apply the concepts of classes, packages, interfaces, inheritance, exception handling and file processing.",
      "To develop applications using generic programming and event handling."
    ],
    courseOutcomes: [
      {
        code: "C208.1",
        statement: "Understand and apply Java fundamentals, classes, objects, and console input/output operations.",
        bloomsLevel: "Understand / Apply (K2/K3)"
      },
      {
        code: "C208.2",
        statement: "Analyze business requirements and implement conditional statements, loops, and decision-making workflows.",
        bloomsLevel: "Apply / Analyze (K3/K4)"
      },
      {
        code: "C208.3",
        statement: "Apply object-oriented inheritance hierarchies, method overriding, constructors, and recursive algorithms.",
        bloomsLevel: "Apply (K3)"
      },
      {
        code: "C208.4",
        statement: "Analyze and implement 2D matrix transformations, string pattern algorithms, and subarray optimizations.",
        bloomsLevel: "Analyze (K4)"
      },
      {
        code: "C208.5",
        statement: "Design robust Java applications utilizing custom exceptions, file I/O streams, Java Collections, and JDBC connectivity.",
        bloomsLevel: "Create (K6)"
      }
    ],
    coPoMapping: {
      headersPO: ["PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO7", "PO8", "PO9", "PO10", "PO11", "PO12"],
      headersPSO: ["PSO1", "PSO2", "PSO3"],
      rows: [
        { coCode: "C208.1", po: [1, 1, 3, 1, 3, "-", "-", "-", 3, 2, 2, 2], pso: [1, 1, "-"] },
        { coCode: "C208.2", po: [2, 1, 3, 2, 1, "-", "-", "-", 2, 1, 1, 3], pso: [2, 2, "-"] },
        { coCode: "C208.3", po: [3, 3, 1, 2, 2, "-", "-", "-", 3, 2, 1, 2], pso: [1, 1, "-"] },
        { coCode: "C208.4", po: [3, 1, 2, 2, 2, "-", "-", "-", 1, 2, 1, 3], pso: [2, 1, "-"] },
        { coCode: "C208.5", po: [1, 1, 2, 2, 2, "-", "-", "-", 3, 2, 1, 2], pso: [1, 1, "-"] }
      ],
      averageRow: {
        po: [2.0, 1.0, 2.0, 2.0, 2.0, "-", "-", "-", 2.0, 2.0, 1.0, 2.0],
        pso: [1.0, 1.0, "-"]
      }
    },
    visionDepartment: INSTITUTION_VISION_MISSION.departmentVision,
    missionDepartment: INSTITUTION_VISION_MISSION.departmentMission,
    peos: INSTITUTION_VISION_MISSION.peos,
    psos: INSTITUTION_VISION_MISSION.psos
  },

  // ==========================================
  // 6. DATA STRUCTURES AND ALGORITHMS (DSA)
  // ==========================================
  "data-structures": {
    labId: "data-structures",
    courseCode: "AD8303",
    courseTitle: "Data Structures and Algorithms Laboratory",
    regulation: "R2023 / R2021",
    academicYear: "2026-2027 (ODD/EVEN Semester)",
    department: "Department of Artificial Intelligence and Data Science",
    institution: "V.S.B. Engineering College, Karur (An Autonomous Institution)",
    overview: "The Data Structures and Algorithms Laboratory trains students to design, implement, and benchmark foundational linear and non-linear data structures in Java. Spanning 15 comprehensive experiments, the course covers Singly, Doubly, and Circular Linked Lists; pointer techniques (cycle detection, list reversal, merging); Stacks and expression processing (Infix to Postfix, evaluation, balanced parentheses); Circular and Priority Queues; Binary Search Trees and self-balancing AVL Trees; LCA, Huffman coding trees, and Prefix Tries; B-Trees and B+ Trees; Graph representations, BFS, DFS, Dijkstra's algorithm, Prim's and Kruskal's MST; Linear/Binary Searching; Bubble, Merge, and Quick Sort; and Hash Tables with Separate Chaining, Open Addressing, and Rehashing.",
    courseObjectives: [
      "To understand and implement list-based data structures, including linked lists and their applications, for efficient data organization and manipulation.",
      "To implement stack and queue data structures and their applications to solve computational and scheduling problems.",
      "To apply tree-based data structures and algorithms for efficient hierarchical data storage, retrieval, and processing.",
      "To apply multiway search trees and graph algorithms to model, analyze, and solve network and path-related problems.",
      "To evaluate and implement searching, sorting, and hashing techniques for efficient data organization and retrieval."
    ],
    courseOutcomes: [
      {
        code: "C207.1",
        statement: "Implement list-based data structures and apply their operations to solve data organization and manipulation problems.",
        bloomsLevel: "Apply (K3)"
      },
      {
        code: "C207.2",
        statement: "Develop solutions using stacks, queues, and their variants for expression processing, scheduling, and related applications.",
        bloomsLevel: "Apply / Analyze (K3/K4)"
      },
      {
        code: "C207.3",
        statement: "Construct and apply tree-based data structures to perform efficient storage, retrieval, and processing of hierarchical data.",
        bloomsLevel: "Apply / Analyze (K3/K4)"
      },
      {
        code: "C207.4",
        statement: "Analyze and implement multiway search tree and graph algorithms to solve traversal, connectivity, shortest-path, and optimization problems.",
        bloomsLevel: "Analyze / Evaluate (K4/K5)"
      },
      {
        code: "C207.5",
        statement: "Compare and apply searching, sorting, and hashing techniques to design efficient data processing solutions.",
        bloomsLevel: "Apply / Evaluate (K3/K5)"
      }
    ],
    coPoMapping: {
      headersPO: ["PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO7", "PO8", "PO9", "PO10", "PO11", "PO12"],
      headersPSO: ["PSO1", "PSO2", "PSO3"],
      rows: [
        { coCode: "C207.1", po: [1, 3, 3, 3, 1, "-", "-", "-", 1, "-", "-", 2], pso: [1, 3, 1] },
        { coCode: "C207.2", po: [1, 3, 3, 3, 1, "-", "-", "-", 1, "-", "-", 2], pso: [1, 3, 1] },
        { coCode: "C207.3", po: [1, 3, 3, 3, 1, "-", "-", "-", 1, "-", "-", 2], pso: [1, 3, 1] },
        { coCode: "C207.4", po: [1, 3, 3, 3, 1, "-", "-", "-", 1, "-", "-", 2], pso: [1, 3, 1] },
        { coCode: "C207.5", po: [1, 3, 3, 3, 1, "-", "-", "-", 1, "-", "-", 2], pso: [1, 3, 1] }
      ],
      averageRow: {
        po: [1.0, 3.0, 3.0, 3.0, 1.0, "-", "-", "-", 1.0, "-", "-", 2.0],
        pso: [2.0, 2.0, 2.0]
      }
    },
    visionDepartment: INSTITUTION_VISION_MISSION.departmentVision,
    missionDepartment: INSTITUTION_VISION_MISSION.departmentMission,
    peos: INSTITUTION_VISION_MISSION.peos,
    psos: INSTITUTION_VISION_MISSION.psos
  },

  // ==========================================
  // 7. C PROGRAMMING LABORATORY
  // ==========================================
  "c-programming": {
    labId: "c-programming",
    courseCode: "GE3171",
    courseTitle: "C Programming Laboratory",
    regulation: "R2023 / R2021",
    academicYear: "2026-2027 (ODD Semester)",
    department: "Department of Artificial Intelligence and Data Science",
    institution: "V.S.B. Engineering College, Karur (An Autonomous Institution)",
    overview: "The C Programming Laboratory establishes the foundational procedural programming and systems computing competencies essential for engineers and AI/DS practitioners. Encompassing 15 laboratory experiments, students master basic data types, formatted I/O, mathematical formulas, conditional branching, iteration and bitwise manipulation (binary digit counting, Armstrong checks), call-by-value and call-by-reference pointer mechanisms, recursive algorithms (Fibonacci, Euclidean GCD), 2D matrix mathematics, string parsing, dynamic memory allocation (malloc, calloc, realloc, free), heterogeneous structures, and sequential/binary file processing for employee and inventory database records.",
    courseObjectives: [
      "To understand the syntax, structure, compilation process, and execution environment of the C language.",
      "To develop proficiency in writing structured algorithms using decision making, branching, and iterative constructs.",
      "To apply modular programming concepts using functions, recursion, and parameter passing techniques (value and reference).",
      "To master pointer arithmetic, dynamic memory management (malloc, calloc, realloc, free), and aggregate types (arrays, strings, structures).",
      "To implement persistent data storage and retrieval systems utilizing C standard file handling streams."
    ],
    courseOutcomes: [
      {
        code: "CO1",
        statement: "Formulate fundamental procedural algorithms using C variables, data types, operators, and formatted I/O functions.",
        bloomsLevel: "Apply (K3)"
      },
      {
        code: "CO2",
        statement: "Implement decision-making control statements and iterative loop constructs to solve arithmetic and number theory problems.",
        bloomsLevel: "Apply / Analyze (K3/K4)"
      },
      {
        code: "CO3",
        statement: "Develop modular C applications using user-defined functions, recursive algorithms, and pointer-based parameter passing.",
        bloomsLevel: "Apply / Create (K3/K6)"
      },
      {
        code: "CO4",
        statement: "Manipulate 1D and 2D arrays, matrix transformations, string buffers, and dynamically allocated heap memory structures.",
        bloomsLevel: "Apply / Analyze (K3/K4)"
      },
      {
        code: "CO5",
        statement: "Design persistent information management systems using user-defined structures and file handling operations.",
        bloomsLevel: "Create (K6)"
      }
    ],
    coPoMapping: {
      headersPO: ["PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO7", "PO8", "PO9", "PO10", "PO11", "PO12"],
      headersPSO: ["PSO1", "PSO2", "PSO3"],
      rows: [
        { coCode: "CO1", po: [3, 2, 2, 1, 2, "-", "-", "-", 2, 1, 1, 3], pso: [2, 2, 1] },
        { coCode: "CO2", po: [3, 3, 2, 2, 2, "-", "-", "-", 2, 1, 1, 3], pso: [2, 2, 1] },
        { coCode: "CO3", po: [3, 3, 3, 2, 2, "-", "-", "-", 2, 1, 2, 3], pso: [2, 2, 1] },
        { coCode: "CO4", po: [3, 3, 3, 2, 2, "-", "-", "-", 2, 1, 2, 3], pso: [2, 3, 2] },
        { coCode: "CO5", po: [3, 3, 3, 3, 3, "-", "-", "-", 3, 2, 3, 3], pso: [3, 3, 2] }
      ],
      averageRow: {
        po: [3.0, 2.8, 2.6, 2.0, 2.2, "-", "-", "-", 2.2, 1.2, 1.8, 3.0],
        pso: [2.2, 2.4, 1.4]
      }
    },
    visionDepartment: INSTITUTION_VISION_MISSION.departmentVision,
    missionDepartment: INSTITUTION_VISION_MISSION.departmentMission,
    peos: INSTITUTION_VISION_MISSION.peos,
    psos: INSTITUTION_VISION_MISSION.psos
  }
};
