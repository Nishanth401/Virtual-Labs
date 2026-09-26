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

export interface MarksRubric {
  performance: number; // 50 Marks
  viva: number;        // 10 Marks
  record: number;      // 15 Marks
  total: number;       // 75 Marks
  breakdown: {
    component: string;
    marks: number;
    description: string;
  }[];
}

export interface SystemRequirements {
  hardware: string[];
  software: string[];
}

export interface IndustrialCaseStudy {
  title: string;
  domain: string;
  scenario: string;
  architectureHighlights: string[];
  codeSnippet?: string;
  outputSnippet?: string;
  analysisConclusion?: string;
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
  marksRubric: MarksRubric;
  systemRequirements: SystemRequirements;
  guidelines: string[];
  caseStudy: IndustrialCaseStudy;
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
    marksRubric: {
    "performance": 50,
    "viva": 10,
    "record": 15,
    "total": 75,
    "breakdown": [
        {
            "component": "Practical Cloud Infrastructure Deployment",
            "marks": 30,
            "description": "AWS Organization, IAM Role hierarchy, EC2/RDS multi-tier setup and CLI automation"
        },
        {
            "component": "Cost-Benefit & Telemetry Analysis",
            "marks": 20,
            "description": "TCO calculator modeling, CloudWatch alarms and multi-cloud budget thresholds"
        },
        {
            "component": "Viva-Voce Examination",
            "marks": 10,
            "description": "Cloud economics, CapEx vs OpEx, SLA guarantees and security compliance"
        },
        {
            "component": "Continuous Assessment Record",
            "marks": 15,
            "description": "AWS architecture topology diagrams, pricing calculator spreadsheets & test results"
        }
    ]
},
    systemRequirements: {
    "hardware": [
        "Workstation with Intel Core i5/i7 Processor (Quad-Core 3.0 GHz+)",
        "8 GB DDR4 RAM (16 GB Recommended for Dockerized local sandboxes)",
        "256 GB SSD Storage",
        "High-Speed Dedicated Broadband Internet (100 Mbps+) with AWS Console Access"
    ],
    "software": [
        "AWS Academy / Free Tier Educational Cloud Organization",
        "AWS Command Line Interface (AWS CLI v2) & AWS SDK for Python (Boto3)",
        "OpenStack / Eucalyptus / OpenNebula local private cloud emulation",
        "Python 3.10+ Runtime Environment & VS Code Cloud Development Extension Pack",
        "Modern HTML5 Web Browser (Google Chrome / Firefox) with HTTPS Support"
    ]
},
    guidelines: [
    "Strictly configure Role-Based Access Control (RBAC) with Least Privilege principle in AWS IAM.",
    "Never commit AWS Access Keys (AKIA...) or Secret Keys to public GitHub repositories.",
    "Configure active CloudWatch Billing Alarms at $10.00 and $25.00 thresholds before launching instances.",
    "Always stop or terminate compute (EC2) and database (RDS) instances at the conclusion of each lab session.",
    "Submit verified AWS Cost Calculator export spreadsheets with student roll number identification."
],
    caseStudy: {
    "title": "AWS Cloud Cost Model for Enterprise Web Application",
    "domain": "Cloud Architecture & Financial Operations (FinOps)",
    "scenario": "Design an enterprise cloud hosting infrastructure model on AWS for a highly available web application. Estimate compute, database, content delivery, and network transfer costs using the AWS Pricing Calculator. Calculate the total monthly infrastructure expenditure ($222/month) and evaluate cost-benefit tradeoffs against on-premise datacenter capital expenses.",
    "architectureHighlights": [
        "Compute: 2x Amazon EC2 t3.medium instances behind Elastic Load Balancer (ALB) across Multi-AZ",
        "Database: Amazon RDS MySQL with automated multi-AZ failover and daily point-in-time snapshots",
        "Edge & Storage: Amazon CloudFront Global CDN connected to 100GB Amazon S3 Standard bucket",
        "Telemetry & Governance: Amazon CloudWatch metric telemetry with Route 53 DNS latency routing",
        "Total Monthly Run-rate: $222.00 / month ($2,664.00 / year)"
    ],
    "codeSnippet": "# AWS Cloud Cost Model for Web Application (from CSM Lab Manual)\nservices = {\n    \"Amazon EC2 (2 t3.medium Instances)\": 60,\n    \"Elastic Load Balancer (ALB)\": 20,\n    \"Amazon RDS (Multi-AZ MySQL)\": 55,\n    \"Amazon S3 Storage (Standard 100GB)\": 3,\n    \"Amazon CloudFront (Global CDN)\": 18,\n    \"Amazon Route 53 (DNS Routing)\": 1,\n    \"Amazon CloudWatch (Telemetry & Alarms)\": 10,\n    \"Data Transfer (Egress Bandwidth)\": 45,\n    \"Automated Snapshot Backup Storage\": 10\n}\n\ntotal = sum(services.values())\nprint(\"==============================================\")\nprint(\" AWS CLOUD WEB APPLICATION COST MODEL\")\nprint(\"==============================================\")\nfor service, cost in services.items():\n    print(f\"{service:<38} : ${cost}\")\nprint(\"----------------------------------------------\")\nprint(f\"Total Monthly Cost    : ${total}\")\nprint(f\"Estimated Annual Cost : ${total * 12}\")\nprint(\"----------------------------------------------\")",
    "outputSnippet": "==============================================\n AWS CLOUD WEB APPLICATION COST MODEL\n==============================================\nAmazon EC2 (2 t3.medium Instances)     : $60\nElastic Load Balancer (ALB)            : $20\nAmazon RDS (Multi-AZ MySQL)            : $55\nAmazon S3 Storage (Standard 100GB)     : $3\nAmazon CloudFront (Global CDN)         : $18\nAmazon Route 53 (DNS Routing)          : $1\nAmazon CloudWatch (Telemetry & Alarms) : $10\nData Transfer (Egress Bandwidth)       : $45\nAutomated Snapshot Backup Storage      : $10\n----------------------------------------------\nTotal Monthly Cost    : $222\nEstimated Annual Cost : $2664\n----------------------------------------------\nCost-Benefit Analysis: Cloud deployment is highly cost-effective (< $300 threshold).\nBenefits: Zero upfront CapEx, Auto-scaling elasticity, 99.99% SLA, Managed disaster recovery.",
    "analysisConclusion": "Cloud deployment yields a 68% total cost reduction compared to on-premise hardware provisioning, providing instant high availability, automated backup redundancy, and horizontal elasticity."
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
    marksRubric: {
    "performance": 50,
    "viva": 10,
    "record": 15,
    "total": 75,
    "breakdown": [
        {
            "component": "Network Architecture & Implementation",
            "marks": 25,
            "description": "Correct neural layer definition, activation selection, and tensor dimension alignment"
        },
        {
            "component": "Model Training & Convergence",
            "marks": 15,
            "description": "Backpropagation loss minimization, validation accuracy, and hyperparameter tuning"
        },
        {
            "component": "Inference & Metrics Evaluation",
            "marks": 10,
            "description": "Confusion matrix, F1-score, precision/recall, and test set generalization"
        },
        {
            "component": "Viva-Voce Examination",
            "marks": 10,
            "description": "Gradient descent mechanics, vanishing gradient mitigation, CNN kernels, and LSTM gates"
        },
        {
            "component": "Continuous Assessment Record",
            "marks": 15,
            "description": "Documented architecture diagrams, epoch loss curves, and verified output logs"
        }
    ]
},
    systemRequirements: {
    "hardware": [
        "Workstation with Intel Core i7 / AMD Ryzen 7 Processor (8 Cores+)",
        "16 GB / 32 GB DDR4/DDR5 RAM",
        "Dedicated NVIDIA GPU with CUDA Support (RTX 3060/4060 6GB+ VRAM or Google Colab Pro)",
        "512 GB NVMe SSD for fast tensor dataset batch caching"
    ],
    "software": [
        "Ubuntu 22.04 LTS or 64-bit Windows 11 with WSL2",
        "Python 3.10+ Runtime Environment",
        "TensorFlow 2.14+, PyTorch 2.1+, Keras 3.0",
        "NumPy, Pandas, Scikit-learn, OpenCV (cv2), Matplotlib, Seaborn",
        "CUDA Toolkit 12.x and cuDNN library installed for GPU acceleration",
        "JupyterLab / Google Colab / VS Code with Python Data Science Extensions"
    ]
},
    guidelines: [
    "Always normalize input tensor data (e.g. image pixels scaled to [0, 1]) prior to neural feeding.",
    "Incorporate regularization mechanisms (Dropout, Batch Normalization, EarlyStopping) to avoid overfitting.",
    "Monitor GPU memory utilization with nvidia-smi to ensure optimal batch sizes without OOM errors.",
    "Save trained model checkpoints (.h5 or .keras format) for reproducibility.",
    "Maintain code cleanliness with structured functions for data loading, training, and evaluation."
],
    caseStudy: {
    "title": "Deep Convolutional Vision Classifier & Bi-LSTM Text Sentiment Pipeline",
    "domain": "Computer Vision & Natural Language Processing",
    "scenario": "Construct an end-to-end deep learning pipeline solving non-linear classification via deep multilayer perceptrons, handwritten digit recognition via CNNs with max-pooling, and contextual sentiment classification of user reviews using Long Short-Term Memory (LSTM) recurrent networks with embedding layers.",
    "architectureHighlights": [
        "Input Layer: 28x28 grayscale image tensor normalized to [0, 1]",
        "Feature Extractor: Conv2D(32, (3,3), ReLU) + MaxPooling2D((2,2)) + Conv2D(64, (3,3), ReLU) + MaxPooling2D",
        "Classification Head: Flatten() -> Dense(128, ReLU) -> Dropout(0.3) -> Dense(10, Softmax)",
        "Optimizer & Loss: Adam optimizer with Sparse Categorical Cross-Entropy loss",
        "Convergence: Achieves 98.7% test accuracy within 10 training epochs"
    ],
    "codeSnippet": "import tensorflow as tf\nfrom tensorflow.keras.models import Sequential\nfrom tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout\n\n# Deep CNN Architecture for Digit Recognition (from DL Manual)\nmodel = Sequential([\n    Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)),\n    MaxPooling2D(pool_size=(2, 2)),\n    Conv2D(64, kernel_size=(3, 3), activation='relu'),\n    MaxPooling2D(pool_size=(2, 2)),\n    Flatten(),\n    Dense(128, activation='relu'),\n    Dropout(0.3),\n    Dense(10, activation='softmax')\n])\n\nmodel.compile(optimizer='adam',\n              loss='sparse_categorical_crossentropy',\n              metrics=['accuracy'])\nmodel.summary()",
    "outputSnippet": "Model: \"sequential_1\"\n_________________________________________________________________\n Layer (type)                Output Shape              Param #   \n=================================================================\n conv2d (Conv2D)             (None, 26, 26, 32)        320       \n max_pooling2d (MaxPooling2D (None, 13, 13, 32)        0         \n conv2d_1 (Conv2D)           (None, 11, 11, 64)        18496     \n max_pooling2d_1 (MaxPooling (None, 5, 5, 64)          0         \n flatten (Flatten)           (None, 1600)              0         \n dense (Dense)               (None, 128)               204928    \n dropout (Dropout)           (None, 128)               0         \n dense_1 (Dense)             (None, 10)                1290      \n=================================================================\nTotal params: 225,034 (879.04 KB)\nTest accuracy: 98.74% | Test loss: 0.0412",
    "analysisConclusion": "Convolutional spatial feature extraction combined with dropout regularization prevents overfitting and drastically reduces parameter counts compared to fully connected feedforward networks."
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
    marksRubric: {
    "performance": 50,
    "viva": 10,
    "record": 15,
    "total": 75,
    "breakdown": [
        {
            "component": "Cluster Setup & HDFS Operations",
            "marks": 20,
            "description": "NameNode/DataNode daemon startup, HDFS CLI operations and replication configuration"
        },
        {
            "component": "MapReduce Algorithm Logic & Execution",
            "marks": 20,
            "description": "Mapper tokenization, Combiner logic, Reducer aggregation, and output verification"
        },
        {
            "component": "Hive & HBase Data Warehousing",
            "marks": 10,
            "description": "HiveQL query schemas, partitioning, and HBase column family CRUD operations"
        },
        {
            "component": "Viva-Voce Examination",
            "marks": 10,
            "description": "Hadoop architecture, YARN resource manager, block splitting, and fault tolerance"
        },
        {
            "component": "Continuous Assessment Record",
            "marks": 15,
            "description": "Verified terminal execution logs, job tracker metrics, and query output tables"
        }
    ]
},
    systemRequirements: {
    "hardware": [
        "Workstation with Intel Core i7 / Xeon Processor (6+ Cores)",
        "16 GB DDR4 RAM (Required for multi-daemon Hadoop JVM allocation)",
        "1 TB SATA HDD / 512 GB SSD with minimum 100 GB dedicated Linux partition",
        "Gigabit Ethernet (1 Gbps) LAN for distributed node communication"
    ],
    "software": [
        "Ubuntu 20.04 LTS / Ubuntu 22.04 LTS (64-bit Linux)",
        "Java SE Development Kit (OpenJDK 8 or OpenJDK 11)",
        "Apache Hadoop 3.3.6 (HDFS, MapReduce, YARN)",
        "Apache Hive 3.1.3 & Apache HBase 2.4.x",
        "OpenSSH Server & Client with passwordless SSH key authentication",
        "Terminal multiplexer (tmux / screen) and bash shell scripting tools"
    ]
},
    guidelines: [
    "Always verify running Hadoop daemons using 'jps' before dispatching MapReduce jobs.",
    "Format the HDFS NameNode only on initial deployment ('hdfs namenode -format') to avoid losing namespace metadata.",
    "Configure HDFS replication factor according to cluster topology (default: 3 in distributed mode).",
    "Gracefully shut down all Hadoop daemons using 'stop-all.sh' before terminal exit.",
    "Monitor cluster health via the web consoles: NameNode at :9870 and YARN ResourceManager at :8088."
],
    caseStudy: {
    "title": "Distributed HDFS Multi-Node WordCount & Matrix Multiplication Architecture",
    "domain": "Distributed Data Warehousing & Cloud Analytics",
    "scenario": "Configuring a multi-node Hadoop HDFS cluster with replication factor 3. Developing custom MapReduce jobs in Java that ingest millions of web server access records, split text tokens across mapper nodes, sort key-value pairs in the shuffle phase, and aggregate frequency counts in parallel reducers.",
    "architectureHighlights": [
        "HDFS Storage: 128 MB block allocation distributed across DataNodes with 3x fault-tolerant replication",
        "Map Phase: TokenizerMapper splits input record streams and emits (word, 1) intermediate key-value pairs",
        "Shuffle & Sort: YARN runtime groups identical word keys across partition boundaries",
        "Reduce Phase: IntSumReducer aggregates intermediate frequencies and writes final counts to /output/part-r-00000",
        "Hive Integration: Create external tables over HDFS directories for high-level SQL querying"
    ],
    "codeSnippet": "public static class TokenizerMapper extends Mapper<Object, Text, Text, IntWritable> {\n    private final static IntWritable one = new IntWritable(1);\n    private Text word = new Text();\n\n    public void map(Object key, Text value, Context context)\n            throws IOException, InterruptedException {\n        StringTokenizer itr = new StringTokenizer(value.toString());\n        while (itr.hasMoreTokens()) {\n            word.set(itr.nextToken().toLowerCase().replaceAll(\"[^a-zA-Z]\", \"\"));\n            if (word.getLength() > 0) {\n                context.write(word, one);\n            }\n        }\n    }\n}",
    "outputSnippet": "19/09/26 14:15:22 INFO mapreduce.Job: Job job_1727339722001_0001 completed successfully\n19/09/26 14:15:22 INFO mapreduce.Job: Counters: 54\n    File System Counters\n        FILE: Number of bytes read=48210\n        HDFS: Number of bytes read=145920\n        HDFS: Number of bytes written=24180\n    Map-Reduce Framework\n        Map input records=5000\n        Map output records=38420\n        Reduce input groups=4120\n        Reduce output records=4120\nOutput written to: /user/hadoop/output/wordcount/part-r-00000",
    "analysisConclusion": "Distributed MapReduce architecture scales linearly with data volume, executing parallel processing across clusters with automated hardware fault tolerance and zero data loss."
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
    marksRubric: {
    "performance": 50,
    "viva": 10,
    "record": 15,
    "total": 75,
    "breakdown": [
        {
            "component": "Relational Schema Design & DDL",
            "marks": 20,
            "description": "Normalized table creation, primary/foreign key definitions, CHECK constraints, and indexes"
        },
        {
            "component": "Complex SQL & Transaction Control",
            "marks": 20,
            "description": "Multi-table Joins, Subqueries, Views, ACID transaction commits, and rollback savepoints"
        },
        {
            "component": "Stored Procedures, Triggers & PL/SQL",
            "marks": 10,
            "description": "Automated business logic triggers, exception handling, and parameterized stored procedures"
        },
        {
            "component": "Viva-Voce Examination",
            "marks": 10,
            "description": "ACID properties, normal forms (1NF to BCNF), B+ tree indexing, and relational algebra"
        },
        {
            "component": "Continuous Assessment Record",
            "marks": 15,
            "description": "Comprehensive ER diagrams, schema dependency proofs, and verified SQL execution logs"
        }
    ]
},
    systemRequirements: {
    "hardware": [
        "Workstation with Intel Core i5/i7 Processor (3.0 GHz+)",
        "8 GB DDR4 RAM (16 GB for large enterprise databases)",
        "256 GB SSD Storage (Fast random I/O for database indexing)",
        "Network connection for client-server database instances"
    ],
    "software": [
        "MySQL Server 8.0 Community Edition / PostgreSQL 15+",
        "MySQL Workbench 8.0 / DBeaver Universal Database Tool",
        "Ubuntu Linux 22.04 LTS or Windows 11 Enterprise",
        "Command-line MySQL client (mysql-cli)",
        "Text Editor / IDE (VS Code / Sublime Text) for authoring SQL scripts"
    ]
},
    guidelines: [
    "Always design conceptual ER diagrams and functional dependency sets prior to writing SQL DDL commands.",
    "Enforce entity and referential integrity constraints (PRIMARY KEY, FOREIGN KEY, NOT NULL, CHECK, UNIQUE).",
    "Test all transaction code with explicit START TRANSACTION, COMMIT, and ROLLBACK TO SAVEPOINT statements.",
    "Use EXPLAIN query plans to verify that B-Tree index structures are actively utilized by the query optimizer.",
    "Export complete database schemas and sample data dumps using 'mysqldump' for continuous record verification."
],
    caseStudy: {
    "title": "ShopEasy Multi-Vendor E-Commerce Relational Engine",
    "domain": "E-Commerce & Retail Marketplace Data Modeling",
    "scenario": "ShopEasy is an online marketplace where customers browse products supplied by verified vendors, place multi-item orders, and pay via digital wallet or UPI. The relational database schema must guarantee strict ACID transactions, enforce non-negative wallet balances (CHECK wallet_balance >= 0), track real-time stock quantities, and maintain relational foreign key integrity across Customer, Supplier, Product, Orders, Order_Item, and Payment tables.",
    "architectureHighlights": [
        "Customer Entity: Enforces unique email credentials and non-negative wallet constraints",
        "Supplier & Product: Multi-vendor catalog with stock tracking and supplier rating validation (0-5)",
        "Orders & Order_Item: Normalized line-item orders with composite keys preventing duplicate line items",
        "Payment Transactions: Transactional ledger tracking status (Success, Pending, Refunded) with ACID safety",
        "3NF / BCNF Normalized: Eliminates insertion, deletion, and update anomalies across all entities"
    ],
    "codeSnippet": "CREATE DATABASE ShopEasyDB;\nUSE ShopEasyDB;\n\nCREATE TABLE Customer (\n    customer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL,\n    email VARCHAR(100) NOT NULL UNIQUE,\n    phone VARCHAR(15),\n    wallet_balance DECIMAL(10,2) NOT NULL DEFAULT 0.00,\n    CONSTRAINT chk_wallet CHECK (wallet_balance >= 0)\n);\n\nCREATE TABLE Supplier (\n    supplier_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\n    supplier_name VARCHAR(150) NOT NULL,\n    contact_email VARCHAR(100),\n    rating DECIMAL(3,2) DEFAULT 0.00 CHECK (rating BETWEEN 0 AND 5)\n);\n\nCREATE TABLE Product (\n    product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\n    supplier_id INT NOT NULL,\n    product_name VARCHAR(200) NOT NULL,\n    price DECIMAL(10,2) NOT NULL CHECK (price > 0),\n    stock_qty INT NOT NULL DEFAULT 0 CHECK (stock_qty >= 0),\n    FOREIGN KEY (supplier_id) REFERENCES Supplier(supplier_id)\n);",
    "outputSnippet": "Query OK, 1 row affected (0.02 sec)\nDatabase changed\nQuery OK, 0 rows affected (0.04 sec) - Table 'Customer' created\nQuery OK, 0 rows affected (0.03 sec) - Table 'Supplier' created\nQuery OK, 0 rows affected (0.05 sec) - Table 'Product' created with FK constraint fk_prod_sup\nAll constraints (chk_wallet, chk_price, chk_stock) verified in information_schema.table_constraints",
    "analysisConclusion": "Relational database normalization through BCNF ensures zero redundant data storage while declarative integrity constraints eliminate orphaned records and financial overdraft anomalies."
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
    marksRubric: {
    "performance": 50,
    "viva": 10,
    "record": 15,
    "total": 75,
    "breakdown": [
        {
            "component": "Object Modeling & Class Design",
            "marks": 20,
            "description": "Class encapsulation, constructors, inheritance hierarchies, and access specifiers"
        },
        {
            "component": "Polymorphism, Interfaces & Exceptions",
            "marks": 20,
            "description": "Dynamic method dispatch, interface implementations, and custom exception handling"
        },
        {
            "component": "Collections, File I/O & JDBC",
            "marks": 10,
            "description": "Generics, ArrayList/HashMap operations, stream processing, and database persistence"
        },
        {
            "component": "Viva-Voce Examination",
            "marks": 10,
            "description": "JVM architecture, Garbage Collection, abstract classes vs interfaces, and method overriding"
        },
        {
            "component": "Continuous Assessment Record",
            "marks": 15,
            "description": "UML class diagrams, verified compiler test cases, and formatted output documentation"
        }
    ]
},
    systemRequirements: {
    "hardware": [
        "Workstation with Intel Core i5 / AMD Ryzen 5 Processor",
        "8 GB DDR4 RAM",
        "256 GB SSD Storage",
        "Standard high-resolution display with full keyboard support"
    ],
    "software": [
        "Java SE Development Kit (Oracle JDK 17 LTS / OpenJDK 17)",
        "Integrated Development Environment (Eclipse IDE for Java / IntelliJ IDEA / VS Code)",
        "MySQL Connector/J JDBC Driver (for database persistence experiments)",
        "Git Version Control Client",
        "Operating System: Windows 10/11 (64-bit) or Ubuntu Linux 22.04 LTS"
    ]
},
    guidelines: [
    "Adhere strictly to standard Java CamelCase naming conventions for classes, interfaces, and methods.",
    "Enforce data encapsulation by keeping instance variables private with public getters and setters.",
    "Implement robust exception handling using specific try-catch-finally blocks rather than generic Exception catching.",
    "Verify code compilation from both the terminal ('javac Program.java') and within the chosen IDE.",
    "Document UML class diagrams showing inheritance, realization, and association relationships in the lab record."
],
    caseStudy: {
    "title": "Automated Banking Transaction & Academic Evaluation Engine",
    "domain": "Financial Services & Educational Management",
    "scenario": "Design an enterprise Java system modeling bank accounts with distinct Savings and Current account subtypes. Implement custom InsufficientFundsException when withdrawal exceeds the minimum threshold. Integrate multi-tiered polymorphism with interface TransactionLogger to record debit/credit audit trails and calculate monthly compound interest.",
    "architectureHighlights": [
        "Encapsulation: Private financial balances protected behind audited getter and setter boundaries",
        "Inheritance: Abstract base class Account extended by SavingsAccount and CurrentAccount",
        "Custom Exception: InsufficientFundsException carries diagnostic shortfall metadata",
        "Interface Polymorphism: Auditable and InterestCalculable interfaces guarantee modular compliance",
        "Collections & Streams: Filter high-value transactions and sort account holders by ledger balance"
    ],
    "codeSnippet": "public class InsufficientFundsException extends Exception {\n    private double shortfall;\n    public InsufficientFundsException(double shortfall) {\n        super(\"Transaction Rejected: Account balance is deficient by \" + shortfall);\n        this.shortfall = shortfall;\n    }\n    public double getShortfall() { return shortfall; }\n}\n\npublic interface AccountOperations {\n    void deposit(double amount);\n    void withdraw(double amount) throws InsufficientFundsException;\n    double getBalance();\n}\n\npublic class SavingsAccount implements AccountOperations {\n    private String accountNumber;\n    private double balance;\n    private static final double MIN_BALANCE = 500.0;\n\n    public SavingsAccount(String accNo, double initialBalance) {\n        this.accountNumber = accNo;\n        this.balance = initialBalance;\n    }\n\n    public synchronized void withdraw(double amount) throws InsufficientFundsException {\n        if (balance - amount < MIN_BALANCE) {\n            throw new InsufficientFundsException(amount - (balance - MIN_BALANCE));\n        }\n        balance -= amount;\n        System.out.printf(\"Withdrew %.2f. New Balance: %.2f%n\", amount, balance);\n    }\n\n    public synchronized void deposit(double amount) {\n        balance += amount;\n    }\n\n    public double getBalance() { return balance; }\n}",
    "outputSnippet": "Account created: SA-9042 with balance 1200.00\nDeposit: 300.00 -> New Balance: 1500.00\nWithdrew 600.00. New Balance: 900.00\nAttempting withdrawal of 500.00...\nEXCEPTION CAUGHT: Transaction Rejected: Account balance is deficient by 100.0\nCurrent Balance safely preserved: 900.00 (Minimum 500.00 threshold respected)",
    "analysisConclusion": "Object-oriented polymorphism and checked exceptions enforce strict domain invariants at compile time, eliminating invalid state transitions in enterprise financial software."
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
    marksRubric: {
    "performance": 50,
    "viva": 10,
    "record": 15,
    "total": 75,
    "breakdown": [
        {
            "component": "Data Structure Architecture & Implementation",
            "marks": 25,
            "description": "Pointer node allocations, dynamic linking, stack/queue operations, and tree rotations"
        },
        {
            "component": "Algorithmic Efficiency & Edge Case Handling",
            "marks": 15,
            "description": "Big-O runtime optimization, empty/single-node boundaries, and recursion stack management"
        },
        {
            "component": "Search, Sort & Hash Execution",
            "marks": 10,
            "description": "Binary search correctness, Quick/Merge sort partitioning, and hash collision resolution"
        },
        {
            "component": "Viva-Voce Examination",
            "marks": 10,
            "description": "Time and space complexity theorems, AVL balance factors, and graph traversal mechanics"
        },
        {
            "component": "Continuous Assessment Record",
            "marks": 15,
            "description": "Dry-run memory trace diagrams, recursive call stacks, and verified execution benchmarks"
        }
    ]
},
    systemRequirements: {
    "hardware": [
        "Workstation with Intel Core i5 / AMD Ryzen 5 Processor",
        "8 GB DDR4 RAM",
        "256 GB SSD Storage",
        "Standard high-resolution monitor for visual algorithmic debugging"
    ],
    "software": [
        "Java SE Development Kit (JDK 17 LTS)",
        "GCC / G++ Compiler Suite (Version 11+)",
        "Visual Studio Code with Java Extension Pack & C/C++ Extension",
        "GDB / LLDB / Visual Studio Code interactive debugger for memory inspection",
        "Operating System: Linux (Ubuntu 22.04 LTS) or Windows 10/11"
    ]
},
    guidelines: [
    "Always design dry-run pointer diagrams on paper before translating pointer mutations into code.",
    "Check for boundary conditions: empty structures, single-node elements, and duplicate values.",
    "Ensure proper dynamic memory allocation and deallocation to eliminate memory leaks and dangling pointers.",
    "State both worst-case and average-case Big-O complexities for every implemented algorithmic routine.",
    "Record complete step-by-step test execution traces in the practical lab record."
],
    caseStudy: {
    "title": "Real-Time Expression Evaluator & Multi-Level Priority Task Queue",
    "domain": "Operating Systems & Compiler Runtime Modeling",
    "scenario": "Implementation of an infix-to-postfix mathematical expression parsing engine utilizing an internal stack, combined with a Max-Heap Priority Queue for dynamic process CPU time slice allocation. Supports operator precedence ^, *, /, +, - and nested parentheses with O(N) linear time complexity.",
    "architectureHighlights": [
        "Stack ADT: Array/Linked List based LIFO storage for operator precedence resolution",
        "Infix to Postfix: Linear scanning with Shunting-Yard algorithmic conversion",
        "Evaluation Engine: Postfix token evaluation with zero backtracking in O(N) time",
        "Priority Queue: Binary Max-Heap maintaining CPU process priority scheduling in O(log N) insert/extract",
        "Exception Resilience: Validates balanced parentheses and catches division-by-zero errors"
    ],
    "codeSnippet": "public static int evaluatePostfix(String exp) {\n    Stack<Integer> stack = new Stack<>();\n    for (char ch : exp.toCharArray()) {\n        if (Character.isDigit(ch)) {\n            stack.push(ch - '0');\n        } else {\n            int val2 = stack.pop();\n            int val1 = stack.pop();\n            switch (ch) {\n                case '+': stack.push(val1 + val2); break;\n                case '-': stack.push(val1 - val2); break;\n                case '*': stack.push(val1 * val2); break;\n                case '/': stack.push(val1 / val2); break;\n            }\n        }\n    }\n    return stack.pop();\n}",
    "outputSnippet": "Infix Expression:    ((2 + 3) * 4) - (8 / 2)\nPostfix Conversion:  2 3 + 4 * 8 2 / -\nEvaluation Steps:\n  Push: 2, 3\n  Op '+': Pop 3, 2 -> Push 5\n  Push: 4\n  Op '*': Pop 4, 5 -> Push 20\n  Push: 8, 2\n  Op '/': Pop 2, 8 -> Push 4\n  Op '-': Pop 4, 20 -> Push 16\nFinal Computed Result: 16 (Computed in 18 CPU cycles)",
    "analysisConclusion": "Stack-based expression compilation eliminates parsing ambiguities, ensuring deterministic evaluation with optimal O(N) time and O(N) auxiliary space."
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
    marksRubric: {
    "performance": 50,
    "viva": 10,
    "record": 15,
    "total": 75,
    "breakdown": [
        {
            "component": "Syntax, Control Flow & Modular Functions",
            "marks": 20,
            "description": "Correct formatted I/O, looping constructs, recursion, and modular function design"
        },
        {
            "component": "Pointers & Dynamic Memory Management",
            "marks": 20,
            "description": "Pointer dereferencing, call-by-reference swapping, malloc/calloc/realloc and free"
        },
        {
            "component": "Structures & File Stream Persistence",
            "marks": 10,
            "description": "Heterogeneous structure definitions and sequential/binary file I/O operations"
        },
        {
            "component": "Viva-Voce Examination",
            "marks": 10,
            "description": "Stack vs Heap, pointer arithmetic, memory fragmentation, and compilation phases"
        },
        {
            "component": "Continuous Assessment Record",
            "marks": 15,
            "description": "Structured flowcharts, documented source algorithms, and verified execution logs"
        }
    ]
},
    systemRequirements: {
    "hardware": [
        "Standard PC Workstation with Intel Core i3 / i5 Processor",
        "4 GB / 8 GB DDR3/DDR4 RAM",
        "250 GB Storage HDD/SSD",
        "Standard keyboard and mouse setup"
    ],
    "software": [
        "GNU Compiler Collection (GCC 11+) / Clang C Compiler",
        "Code::Blocks IDE / Dev-C++ / Visual Studio Code with C/C++ Extensions",
        "GDB (GNU Debugger) for step-through pointer analysis and stack inspection",
        "Operating System: 64-bit Ubuntu Linux or Windows 10/11",
        "Terminal Emulator: GNOME Terminal / Windows PowerShell"
    ]
},
    guidelines: [
    "Always check return values of 'malloc()' and 'fopen()' to ensure valid memory/file pointer allocations.",
    "Explicitly deallocate dynamically reserved heap memory using 'free()' to prevent persistent memory leaks.",
    "Close every opened file handle using 'fclose()' to guarantee stream buffer flushing to physical disk.",
    "Initialize all variables and pointer references prior to use to avoid undefined behavior.",
    "Maintain neat algorithmic flowcharts and formatted test cases in the official practical record."
],
    caseStudy: {
    "title": "Mini Inventory & Employee Payroll File Management System",
    "domain": "Systems Software & Enterprise File Systems",
    "scenario": "Develop a persistent data management system in C using nested structures and binary disk file streams (fopen, fprintf, fscanf, fgets, fwrite, fread). The application performs student record storage, calculates dynamic percentages, searches by roll number, and allows record appending without file corruption.",
    "architectureHighlights": [
        "Data Model: Heterogeneous 'struct Student' storing Roll No, Name, Dept, and Marks",
        "File Operations: Supports 'w' (create/write), 'r' (read stream), and 'a' (append mode)",
        "Dynamic Allocation: Flexible array allocation for n records using calloc() and pointer arithmetic",
        "Integrity Checks: Handles file pointer NULL verification and graceful error termination",
        "Formatted Reporting: Clean tabular stdout report generation with aligned string format specifiers"
    ],
    "codeSnippet": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Student {\n    int rollNo;\n    char name[50];\n    char department[30];\n    float marks;\n};\n\nvoid appendStudent(const char *filename, struct Student s) {\n    FILE *fp = fopen(filename, \"a\");\n    if (fp == NULL) {\n        printf(\"Error: Could not open file for appending.\\n\");\n        return;\n    }\n    fprintf(fp, \"%-10d %-20s %-15s %-8.2f\\n\", s.rollNo, s.name, s.department, s.marks);\n    fclose(fp);\n    printf(\"Record for %s appended successfully.\\n\", s.name);\n}",
    "outputSnippet": "Enter number of students: 2\n\nEnter details of student 1:\nRoll Number: 101 | Name: Arun | Department: AI&DS | Marks: 88.50\nEnter details of student 2:\nRoll Number: 102 | Name: Divya | Department: AI&DS | Marks: 92.00\n\n--- File Content (student.txt) ---\nRoll No    Name                 Department      Marks   \n-------------------------------------------------------\n101        Arun                 AI&DS           88.50   \n102        Divya                AI&DS           92.00   \nRecord for Divya appended successfully to persistent disk.",
    "analysisConclusion": "Structured file streams in C provide reliable data persistence without external dependencies, laying the foundation for low-level systems programming and database engine design."
},
    visionDepartment: INSTITUTION_VISION_MISSION.departmentVision,
    missionDepartment: INSTITUTION_VISION_MISSION.departmentMission,
    peos: INSTITUTION_VISION_MISSION.peos,
    psos: INSTITUTION_VISION_MISSION.psos
  }
};
