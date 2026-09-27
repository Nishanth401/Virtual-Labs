import { MaterialContent } from "./types";

export const CLOUD_BIGDATA_MATERIALS: Record<string, MaterialContent> = {
  "big-data-hadoop-gfg": {
    id: "big-data-hadoop-gfg",
    title: "Apache Hadoop, HDFS Architecture & MapReduce Paradigms",
    subject: "Big Data Analytics Lab",
    provider: "GeeksforGeeks Reference",
    category: "Big Data & Distributed Computing",
    readTime: "25 mins",
    difficulty: "Advanced",
    simulatorUrl: "/labs/big-data-analytics",
    simulatorName: "Big Data Computing Lab",
    overview:
      "Big Data describes massive volumes of structured, semi-structured, and unstructured data characterized by the 5 V's: Volume, Velocity, Variety, Veracity, and Value. This GeeksforGeeks reference explores the Apache Hadoop ecosystem, the Hadoop Distributed File System (HDFS) master-worker architecture (NameNode, DataNode), block replication, rack awareness, and the distributed MapReduce processing model.",
    learningObjectives: [
      "Understand the 5 V's of Big Data and why conventional relational databases fail at petabyte scale",
      "Analyze the HDFS architecture: NameNode metadata management, DataNode block storage, and Secondary NameNode checkpointing",
      "Formulate the distributed MapReduce computational paradigm: Map, Shuffle-and-Sort, and Reduce",
      "Implement a MapReduce WordCount algorithm in Python using Hadoop Streaming",
      "Configure HDFS command-line operations (dfs -put, -ls, -cat, -rm)"
    ],
    keyConcepts: [
      {
        title: "1. The HDFS Master-Worker Architecture",
        description:
          "HDFS is a distributed, fault-tolerant file system designed to run on commodity hardware.",
        points: [
          "Block Storage: Files are split into large blocks (default 128 MB) to minimize seek latency and metadata overhead.",
          "NameNode (Master): Keeps the entire file system directory tree and block mapping in RAM. Persists state via FsImage and EditLog.",
          "DataNodes (Workers): Store actual raw block data files and periodically send Heartbeats and BlockReports to the NameNode.",
          "Replication: Each block is replicated (default 3x) across different physical racks for fault tolerance (Rack Awareness)."
        ]
      },
      {
        title: "2. The MapReduce Distributed Computing Paradigm",
        description:
          "Moves computation to the data (data locality) rather than moving huge data over the network to computation nodes.",
        points: [
          "Mapper Phase: Reads input splits, processes records, and emits intermediate key-value pairs (K1, V1) -> list(K2, V2).",
          "Shuffle and Sort: Framework groups all intermediate values having the same key across worker nodes.",
          "Reducer Phase: Aggregates values for each key and writes final results to HDFS (K2, list(V2)) -> list(K3, V3)."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Map Tokenization",
        description: "Read input lines, split into words, and emit word -> 1 count pair for each token."
      },
      {
        step: 2,
        title: "Shuffle and Group",
        description: "Hadoop framework routes identical keys to the same reducer node across the cluster network."
      },
      {
        step: 3,
        title: "Reduce Aggregation",
        description: "Sum all incoming 1s for each unique key and emit final total to HDFS."
      }
    ],
    codeSnippets: {
      python: `# mapper.py (Hadoop Streaming Mapper)
import sys

for line in sys.stdin:
    line = line.strip()
    words = line.split()
    for word in words:
        # Output: key <tab> value
        print(f"{word.lower()}\\t1")

# reducer.py (Hadoop Streaming Reducer)
import sys

current_word = None
current_count = 0

for line in sys.stdin:
    word, count = line.strip().split('\\t')
    count = int(count)

    if current_word == word:
        current_count += count
    else:
        if current_word:
            print(f"{current_word}\\t{current_count}")
        current_word = word
        current_count = count

if current_word:
    print(f"{current_word}\\t{current_count}")`
    },
    complexityAnalysis: {
      timeComplexity: "O(N / M) map phase where M is number of mappers; O(K log K) distributed shuffle-sort",
      spaceComplexity: "O(Total_Data * Replication_Factor) distributed cluster disk storage",
      bestCase: "O(N / M) linear scaling across cluster nodes",
      worstCase: "O(K log K) when skewed keys create straggler reducers",
      notes: "Hadoop Streaming allows any executable or script (Python, Perl, C++) to be used as mappers and reducers."
    },
    vivaQuestions: [
      {
        question: "Why is the default block size in HDFS so large (128 MB) compared to an OS block size (4 KB)?",
        answer: "A large block size minimizes the cost of disk seeks (amortizing seek time against data transfer time) and significantly reduces the amount of metadata the NameNode must maintain in RAM (150 bytes per block)."
      },
      {
        question: "Does the Secondary NameNode act as a live backup if the primary NameNode crashes?",
        answer: "No. The Secondary NameNode does not handle active requests. Its sole job is to periodically merge the EditLog with the FsImage (checkpointing) to prevent the EditLog from growing uncontrollably. High Availability (HA) NameNodes using ZooKeeper and Quorum Journal Manager provide true active/standby failover."
      }
    ],
    realWorldApplications: [
      "Web search engine inverted index construction and PageRank computation",
      "Telecommunication call detail record (CDR) log aggregation and fraud detection",
      "Bioinformatics human genome sequence alignment and mutation clustering"
    ],
    practiceProblems: [
      {
        title: "MapReduce Matrix Multiplication",
        difficulty: "Hard",
        description: "Formulate a two-stage MapReduce algorithm in Python to compute the product of two large sparse matrices A and B."
      }
    ]
  },

  "big-data-mongodb-w3schools": {
    id: "big-data-mongodb-w3schools",
    title: "MongoDB NoSQL Database & Aggregation Pipeline Guide",
    subject: "Big Data Analytics Lab",
    provider: "W3Schools Reference",
    category: "NoSQL & Document Stores",
    readTime: "20 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/big-data-analytics",
    simulatorName: "Big Data Computing Lab",
    overview:
      "MongoDB is a leading document-oriented NoSQL database designed for high availability, horizontal scalability, and developer agility. Documents are stored in BSON (Binary JSON) format with flexible dynamic schemas. This W3Schools-curated laboratory guide details CRUD operations, indexing strategies, and multi-stage Aggregation Pipelines.",
    learningObjectives: [
      "Contrast relational tables/rows with MongoDB collections/documents",
      "Perform CRUD operations: insertOne, find, updateOne, and deleteMany",
      "Design multi-stage Aggregation Pipelines using $match, $group, $project, and $sort",
      "Create single-field, compound, and text indexes for rapid query execution",
      "Understand horizontal scaling via sharding and replica sets"
    ],
    keyConcepts: [
      {
        title: "1. BSON Document Model",
        description:
          "Data is stored as rich BSON documents supporting nested objects and embedded arrays without requiring complex SQL joins.",
        points: [
          "_id: Every document has an immutable unique 12-byte ObjectId primary key.",
          "Embedding vs Referencing: Embed data for 1:1 or 1:few relationships; use references ($lookup) for 1:many or many:many relationships."
        ]
      },
      {
        title: "2. The Aggregation Pipeline Framework",
        description:
          "Documents pass through a multi-stage pipeline where each stage transforms the data stream.",
        points: [
          "$match: Filters documents (similar to SQL WHERE).",
          "$group: Groups documents by specified key and computes aggregations (SQL GROUP BY).",
          "$project: Reshapes documents, renaming fields or computing new values (SQL SELECT).",
          "$sort / $limit: Orders and pages results."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Filter with $match",
        description: "Filter out irrelevant records early to reduce memory usage in subsequent stages."
      },
      {
        step: 2,
        title: "Group with $group",
        description: "Specify _id field for grouping and apply $sum, $avg, $min, or $push."
      },
      {
        step: 3,
        title: "Project & Sort",
        description: "Format output fields and sort in descending order."
      }
    ],
    codeSnippets: {
      python: `from pymongo import MongoClient

# Connect to MongoDB cluster
client = MongoClient('mongodb://localhost:27017/')
db = client['VirtualLabsDB']
collection = db['student_experiments']

# Multi-Stage Aggregation Pipeline
pipeline = [
    # Stage 1: Filter completed submissions
    {"$match": {"status": "COMPLETED"}},
    
    # Stage 2: Group by Lab and compute metrics
    {"$group": {
        "_id": "$lab_id",
        "total_submissions": {"$sum": 1},
        "avg_score": {"$avg": "$score"},
        "highest_score": {"$max": "$score"}
    }},
    
    # Stage 3: Sort by average score descending
    {"$sort": {"avg_score": -1}},
    
    # Stage 4: Reshape output
    {"$project": {
        "lab_code": "$_id",
        "total_submissions": 1,
        "average_score": {"$round": ["$avg_score", 2]},
        "_id": 0
    }}
]

results = list(collection.aggregate(pipeline))
print("Aggregation Results:", results)`
    },
    complexityAnalysis: {
      timeComplexity: "O(N) for unindexed collections; O(log N) using B-tree compound indexes",
      spaceComplexity: "100 MB RAM limit per aggregation stage (exceeding requires allowDiskUse: true)",
      bestCase: "O(log N) covered query",
      worstCase: "O(N) full collection scan",
      notes: "MongoDB uses WiredTiger storage engine with snappy document-level compression."
    },
    vivaQuestions: [
      {
        question: "What is BSON and why does MongoDB use it instead of plain JSON?",
        answer: "BSON is Binary JSON. It extends JSON by supporting additional data types (Date, binary data, ObjectId, int32, int64, float64) and stores length prefixes allowing fast traversal and skipping of subdocuments without parsing the entire string."
      },
      {
        question: "What is the difference between embedding and referencing in MongoDB schema design?",
        answer: "Embedding stores related data inside the same parent document (fast atomic read operations, no joins). Referencing stores related data in a separate collection with an _id link (best when data is large or referenced from multiple places, preventing document size exceeding 16 MB limit)."
      }
    ],
    realWorldApplications: [
      "Content management systems (CMS) with heterogeneous article schemas",
      "Mobile app user profile and session storage",
      "IoT time-series sensor telemetry data ingestion"
    ],
    practiceProblems: [
      {
        title: "E-Commerce Customer Order Aggregation",
        difficulty: "Medium",
        description: "Write an aggregation pipeline that finds total revenue generated per customer for orders placed in the year 2024."
      }
    ]
  },

  "big-data-spark-gfg": {
    id: "big-data-spark-gfg",
    title: "Apache Spark & PySpark In-Memory Analytics Guide",
    subject: "Big Data Analytics Lab",
    provider: "GeeksforGeeks Reference",
    category: "In-Memory Distributed Computing",
    readTime: "25 mins",
    difficulty: "Advanced",
    simulatorUrl: "/labs/big-data-analytics",
    simulatorName: "Big Data Computing Lab",
    overview:
      "Apache Spark is an open-source, distributed general-purpose computing system that executes up to 100 times faster than Apache Hadoop MapReduce for large-scale data processing by utilizing in-memory Resilient Distributed Datasets (RDDs) and an optimized Directed Acyclic Graph (DAG) query engine.",
    learningObjectives: [
      "Understand the limitations of Hadoop disk I/O and why Spark in-memory execution is 100x faster",
      "Analyze the fundamental properties of RDDs: Immutable, Partitioned, Fault-Tolerant, Evaluated Lazily",
      "Distinguish Transformations (map, filter) from Actions (count, collect, save)",
      "Build data processing pipelines using PySpark DataFrames and Spark SQL",
      "Explain the Catalyst Optimizer and Tungsten execution engine"
    ],
    keyConcepts: [
      {
        title: "1. Resilient Distributed Datasets (RDDs)",
        description:
          "The core abstraction representing an immutable collection of distributed records across a cluster.",
        points: [
          "Resilience (Fault Tolerance): Maintained through Lineage Graphs. If a partition is lost due to node failure, Spark recomputes only the lost partition from the lineage history.",
          "Lazy Evaluation: Transformations do not compute immediately; they build an execution plan executed only when an Action is triggered."
        ]
      },
      {
        title: "2. Transformations vs Actions",
        description:
          "Separation of query definition from actual distributed computation.",
        points: [
          "Narrow Transformations: Each input partition contributes to at most one output partition (e.g. map, filter) -> Zero network shuffle.",
          "Wide Transformations: Multiple child partitions depend on data from all parent partitions (e.g. groupByKey, reduceByKey, join) -> Requires network shuffle.",
          "Actions: Trigger the DAG Scheduler to execute computation (e.g. count(), collect(), first())."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Initialize SparkSession",
        description: "Create Spark entry point with configured master node and memory allocation."
      },
      {
        step: 2,
        title: "Apply Transformations",
        description: "Chain filter, select, withColumn, and groupBy transformations."
      },
      {
        step: 3,
        title: "Trigger Action",
        description: "Invoke show() or collect() to trigger catalyst optimization and distributed execution."
      }
    ],
    codeSnippets: {
      python: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col, avg, count

# 1. Initialize Spark Session
spark = SparkSession.builder \\
    .appName("VirtualLabsSparkDemo") \\
    .master("local[*]") \\
    .getOrCreate()

# 2. Create Sample DataFrame
data = [("AIDS", "Sem 4", 88.5), ("AIDS", "Sem 4", 91.0),
        ("CSE", "Sem 4", 82.0), ("CSE", "Sem 4", 85.5),
        ("ECE", "Sem 4", 79.0)]
columns = ["Department", "Semester", "Marks"]

df = spark.createDataFrame(data, columns)

# 3. DataFrame Transformation Pipeline & Action
summary_df = df.filter(col("Marks") >= 80.0) \\
    .groupBy("Department") \\
    .agg(
        avg("Marks").alias("Avg_Marks"),
        count("Department").alias("Student_Count")
    ) \\
    .orderBy(col("Avg_Marks").desc())

summary_df.show()`
    },
    complexityAnalysis: {
      timeComplexity: "O(N / P) where N is records and P is CPU executor partitions",
      spaceComplexity: "O(N) distributed JVM off-heap and heap memory buffer",
      bestCase: "O(N / P) for narrow transformations",
      worstCase: "O(N log N) during network shuffle joins",
      notes: "PySpark DataFrames run at the exact same C++ speed as Scala/Java thanks to Catalyst generating compiled bytecode."
    },
    vivaQuestions: [
      {
        question: "Why is Apache Spark faster than Hadoop MapReduce?",
        answer: "Hadoop writes all intermediate state to physical disk between Map and Reduce phases (incurring heavy disk I/O, serialization, and network cost). Spark retains intermediate data in-memory across iterations and uses an optimized Directed Acyclic Graph (DAG) engine to pipeline operations."
      },
      {
        question: "What is an RDD Lineage Graph?",
        answer: "A directed acyclic graph recording the sequence of transformations that produced an RDD from the original source. It provides fault tolerance: if a node fails, Spark uses the lineage to recompute only the lost data partitions."
      }
    ],
    realWorldApplications: [
      "Real-time fraud detection in payment processing (Spark Streaming)",
      "Recommendation engines on Netflix and Spotify (ALS Matrix Factorization)",
      "Large-scale genomics variant calling and disease correlation"
    ],
    practiceProblems: [
      {
        title: "PySpark Word Count",
        difficulty: "Easy",
        description: "Write a PySpark RDD script using flatMap(), map(), and reduceByKey() to perform word count on a text file."
      }
    ]
  },

  "cloud-computing-gfg": {
    id: "cloud-computing-gfg",
    title: "Cloud Computing Architecture, IaaS, PaaS, SaaS & AWS Core",
    subject: "Cloud Service Management Lab",
    provider: "GeeksforGeeks Reference",
    category: "Cloud Architecture & AWS",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/cloud-service-management",
    simulatorName: "Cloud & DevOps Lab",
    overview:
      "Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing. This GeeksforGeeks reference covers delivery models (IaaS, PaaS, SaaS), deployment architectures (Public, Private, Hybrid), AWS global infrastructure (Regions, Availability Zones, Edge Locations), and core virtual compute instances (Amazon EC2).",
    learningObjectives: [
      "Differentiate between IaaS, PaaS, and SaaS cloud service delivery models",
      "Analyze the AWS global infrastructure: Regions, Availability Zones (AZs), and Edge Locations",
      "Launch and configure Amazon EC2 virtual servers, AMI images, and security groups",
      "Configure VPC (Virtual Private Cloud) subnets, route tables, and Internet Gateways",
      "Understand the AWS Shared Responsibility Security Model"
    ],
    keyConcepts: [
      {
        title: "1. The Cloud Service Delivery Models",
        description:
          "Defines the division of management responsibility between the cloud provider and the customer.",
        points: [
          "IaaS (Infrastructure as a Service): Provider manages physical hardware and virtualization; customer manages OS, runtime, and applications (e.g. AWS EC2, GCP Compute Engine).",
          "PaaS (Platform as a Service): Provider manages hardware, OS, and runtime; customer only deploys code (e.g. AWS Elastic Beanstalk, Heroku).",
          "SaaS (Software as a Service): Complete cloud application managed entirely by vendor (e.g. Google Drive, Microsoft 365)."
        ]
      },
      {
        title: "2. AWS Global Infrastructure",
        description:
          "High-redundancy global cloud footprint ensuring fault tolerance and low latency.",
        points: [
          "Region: Physical geographical area containing two or more isolated Availability Zones.",
          "Availability Zone (AZ): One or more discrete data centers with redundant power, networking, and connectivity.",
          "Edge Location: Content Delivery Network (CloudFront) caching endpoints located in major metropolitan cities worldwide."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Select AMI & Instance Type",
        description: "Choose Amazon Machine Image (Ubuntu 22.04 LTS) and hardware specs (t3.micro for free tier)."
      },
      {
        step: 2,
        title: "Configure Security Group Rules",
        description: "Inbound firewall rules: Allow SSH (Port 22) from admin IP and HTTP (Port 80) from anywhere."
      },
      {
        step: 3,
        title: "Attach Key Pair & Launch",
        description: "Generate RSA key pair (.pem) for secure SSH authentication and launch instance."
      }
    ],
    codeSnippets: {
      python: `import boto3

# Initialize EC2 Client via AWS Boto3 SDK
ec2 = boto3.client('ec2', region_name='us-east-1')

# 1. Provision Virtual Server (t3.micro on Ubuntu)
def launch_virtual_server():
    instances = ec2.run_instances(
        ImageId='ami-0c7217cdde317cfec', # Ubuntu Server 22.04 LTS
        MinCount=1,
        MaxCount=1,
        InstanceType='t3.micro',
        KeyName='vlab-keypair',
        TagSpecifications=[{
            'ResourceType': 'instance',
            'Tags': [{'Key': 'Name', 'Value': 'VLab-WebServer-Prod'}]
        }]
    )
    instance_id = instances['Instances'][0]['InstanceId']
    print(f"Launched EC2 Instance ID: {instance_id}")

# launch_virtual_server()`
    },
    complexityAnalysis: {
      timeComplexity: "O(1) REST API call; ~30-60 seconds hardware virtualization provisioning time",
      spaceComplexity: "Elastic EBS block storage volumes dynamically expandable in GB/TB",
      bestCase: "O(1) API call",
      worstCase: "O(1) API call",
      notes: "AWS EC2 instances use the Nitro System hypervisor for near-bare-metal virtualization performance."
    },
    vivaQuestions: [
      {
        question: "Explain the AWS Shared Responsibility Model.",
        answer: "AWS is responsible for 'Security OF the Cloud' (physical data centers, hardware, hypervisors, and global network). The customer is responsible for 'Security IN the Cloud' (guest OS patching, customer data encryption, firewall security groups, and IAM user credentials)."
      },
      {
        question: "What is the difference between horizontal scaling and vertical scaling?",
        answer: "Vertical scaling (Scale Up) adds more CPU, RAM, or storage to an existing single server (has physical ceiling and downtime). Horizontal scaling (Scale Out) adds more server instances in parallel behind a load balancer (virtually unlimited elasticity)."
      }
    ],
    realWorldApplications: [
      "Netflix video streaming infrastructure running 100% on AWS EC2 microservices",
      "Disaster recovery and automated hot failover architectures across multiple Availability Zones",
      "Financial fintech banking backend APIs running in isolated VPC subnets"
    ],
    practiceProblems: [
      {
        title: "Boto3 Instance State Inspector",
        difficulty: "Easy",
        description: "Write a Python script using boto3.client('ec2') that lists all running EC2 instances, their Public IP addresses, and state."
      }
    ]
  },

  "cloud-docker-gfg": {
    id: "cloud-docker-gfg",
    title: "Docker Containerization, Dockerfile & Kubernetes Pods",
    subject: "Cloud Service Management Lab",
    provider: "GeeksforGeeks Reference",
    category: "Containerization & Kubernetes",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/cloud-service-management",
    simulatorName: "Cloud & DevOps Lab",
    overview:
      "Containerization is an operating-system-level virtualization method for deploying applications in isolated user spaces called containers. This GeeksforGeeks reference details Docker architecture, writing optimized multi-stage Dockerfiles, Docker Compose multi-service orchestration, and Kubernetes pod deployments.",
    learningObjectives: [
      "Compare Virtual Machines (Hypervisor overhead) with Docker Containers (Kernel namespaces)",
      "Write multi-stage Dockerfiles to minimize production image size and security attack surface",
      "Define multi-container architectures (Web, Database, Cache) using docker-compose.yml",
      "Understand Kubernetes architecture: Control Plane (etcd, scheduler) and Worker Nodes (kubelet)",
      "Deploy scalable Pods and Services using Kubernetes YAML manifests"
    ],
    keyConcepts: [
      {
        title: "1. Containers vs Virtual Machines",
        description:
          "Virtual Machines virtualize physical hardware; Containers virtualize the operating system kernel.",
        points: [
          "Virtual Machines: Each VM includes a full Guest OS (gigabytes in size), hypervisor (Type 1 or 2), slow boot times (minutes).",
          "Docker Containers: Share the host OS kernel using Linux namespaces (PID, NET, IPC) and cgroups (CPU, RAM limits). Sub-second startup and megabyte image footprints."
        ]
      },
      {
        title: "2. Kubernetes Core Primitives",
        description:
          "The industry standard container orchestration engine.",
        points: [
          "Pod: Smallest deployable computing unit in Kubernetes; encapsulates one or more co-located containers.",
          "Deployment: Declares desired replica state; automates rolling updates, rollbacks, and self-healing.",
          "Service: Stable networking abstraction (ClusterIP, NodePort, LoadBalancer) exposing pods to traffic."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Write Multi-Stage Dockerfile",
        description: "Compile code in builder stage; copy only production binaries into minimal alpine image."
      },
      {
        step: 2,
        title: "Build and Tag Image",
        description: "Execute docker build -t vlab-service:v1.0 ."
      },
      {
        step: 3,
        title: "Deploy to Kubernetes",
        description: "Apply deployment.yaml via kubectl apply -f deployment.yaml; monitor pod rollout."
      }
    ],
    codeSnippets: {
      bash: `# Production Multi-Stage Dockerfile (Node.js/Python)
# --- Stage 1: Build & Dependencies ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Stage 2: Minimal Production Runtime ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]`,
      c: `// Kubernetes Deployment Manifest (YAML Representation)
/*
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vlab-frontend-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: vlab-frontend
  template:
    metadata:
      labels:
        app: vlab-frontend
    spec:
      containers:
      - name: frontend
        image: vlab-registry/frontend:v1.0
        ports:
        - containerPort: 3000
        resources:
          limits:
            memory: "512Mi"
            cpu: "500m"
*/`
    },
    complexityAnalysis: {
      timeComplexity: "O(1) container instantiation (<500ms startup)",
      spaceComplexity: "Union File System (OverlayFS) layered caching: base layers shared across containers",
      bestCase: "O(1)",
      worstCase: "O(1)",
      notes: "Multi-stage Docker builds reduce container image footprints by up to 90% by stripping dev dependencies."
    },
    vivaQuestions: [
      {
        question: "Explain the difference between CMD and ENTRYPOINT in a Dockerfile.",
        answer: "ENTRYPOINT defines the immutable default command to be executed when the container starts. CMD provides default arguments to the ENTRYPOINT (or a standalone command) that can be easily overridden by passing arguments to 'docker run'."
      },
      {
        question: "What is a Pod in Kubernetes?",
        answer: "A Pod is the smallest deployable execution unit in Kubernetes. It encapsulates one or more containers that share the same network namespace (same IP address and port space) and storage volumes."
      }
    ],
    realWorldApplications: [
      "Microservice deployment pipelines with zero-downtime rolling updates",
      "Self-healing application scaling during traffic spikes (Horizontal Pod Autoscaler)",
      "Isolated reproducible continuous integration test runners (GitHub Actions runners)"
    ],
    practiceProblems: [
      {
        title: "Docker Compose Multi-Container Web App",
        difficulty: "Medium",
        description: "Write a docker-compose.yml file that links a Python Flask web application container with a Redis in-memory cache container."
      }
    ]
  },

  "cloud-w3schools-aws": {
    id: "cloud-w3schools-aws",
    title: "W3Schools Cloud Infrastructure & Scalable AWS Services",
    subject: "Cloud Service Management Lab",
    provider: "W3Schools Reference",
    category: "Cloud Services & Serverless",
    readTime: "20 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/cloud-service-management",
    simulatorName: "Cloud & DevOps Lab",
    overview:
      "A hands-on, practical W3Schools-curated laboratory guide to cloud infrastructure storage and serverless computing. Covers Amazon S3 (Simple Storage Service) bucket policies, AWS IAM (Identity and Access Management) security roles, and event-driven serverless functions with AWS Lambda.",
    learningObjectives: [
      "Understand object storage vs block storage and file storage",
      "Create and configure Amazon S3 buckets, CORS policies, and lifecycle rules",
      "Implement the Principle of Least Privilege using AWS IAM users, groups, and roles",
      "Deploy event-driven serverless microservices using AWS Lambda",
      "Monitor application performance and errors using Amazon CloudWatch logs"
    ],
    keyConcepts: [
      {
        title: "1. Amazon S3 Object Storage",
        description:
          "Stores flat files as objects identified by unique keys within buckets.",
        points: [
          "Durability: 99.999999999% (11 9's) durability through redundant storage across multiple facilities in an AWS Region.",
          "Storage Classes: S3 Standard (frequent access), S3 Intelligent-Tiering (auto cost optimization), S3 Glacier (archival)."
        ]
      },
      {
        title: "2. Serverless Computing with AWS Lambda",
        description:
          "Run code without provisioning or managing servers; scales automatically with zero idle cost.",
        points: [
          "Event-Driven: Invoked automatically by S3 file uploads, DynamoDB streams, or HTTP API Gateway requests.",
          "Cold Start: Initial execution latency when AWS spins up an execution container environment."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Upload to S3",
        description: "Send object to S3 bucket via PutObject API; S3 fires Event Notification."
      },
      {
        step: 2,
        title: "Trigger Lambda Execution",
        description: "AWS Lambda automatically invokes handler function with the S3 event payload."
      },
      {
        step: 3,
        title: "Process & Log",
        description: "Execute image resizing or data transformation; stream logs to Amazon CloudWatch."
      }
    ],
    codeSnippets: {
      python: `import json
import boto3

s3 = boto3.client('s3')

# Serverless AWS Lambda Handler Function
def lambda_handler(event, context):
    # Extract bucket and file key from S3 Event Trigger
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    print(f"Serverless Lambda triggered! Processing s3://{bucket}/{key}")
    
    # Fetch object metadata
    response = s3.head_object(Bucket=bucket, Key=key)
    file_size = response['ContentLength']
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'File processed successfully',
            'file_name': key,
            'size_bytes': file_size
        })
    }`
    },
    complexityAnalysis: {
      timeComplexity: "O(1) key-value S3 object lookup and millisecond serverless execution",
      spaceComplexity: "Virtually unlimited scalable S3 bucket storage capacity",
      bestCase: "O(1)",
      worstCase: "O(1)",
      notes: "AWS Lambda bills per millisecond of compute time consumed and memory allocated (128MB to 10GB)."
    },
    vivaQuestions: [
      {
        question: "What is an IAM Role and how does it differ from an IAM User in AWS?",
        answer: "An IAM User represents a permanent person or service with long-term credentials (password, access keys). An IAM Role is an identity with temporary security credentials that can be assumed by anyone who needs it (such as an EC2 instance or Lambda function accessing S3 without hardcoding secret keys)."
      },
      {
        question: "What is a 'Cold Start' in AWS Lambda?",
        answer: "A Cold Start occurs when a serverless function is invoked for the first time or after being idle. AWS must provision an execution container, download the code, and initialize the runtime before running the handler, causing an initial invocation delay (typically 100ms - 1s)."
      }
    ],
    realWorldApplications: [
      "Automated image thumbnail generation upon user photo upload",
      "Real-time fraud scoring API backend triggered by credit card swipe events",
      "Static website hosting on Amazon S3 distributed via CloudFront CDN"
    ],
    practiceProblems: [
      {
        title: "S3 Bucket File Uploader",
        difficulty: "Easy",
        description: "Write a Python script using boto3 that uploads a local file to an S3 bucket and generates a pre-signed URL valid for 60 minutes."
      }
    ]
  },
  "cloud-lab-manual": {
    id: "cloud-lab-manual",
    title: "Cloud Service Management & Virtualization Laboratory Manual",
    subject: "Cloud Service Management Lab",
    provider: "Department of Artificial Intelligence and Data Science",
    source: "VSB Engineering College Autonomous Curriculum (R2023 / R2021)",
    subtitle: "Hands-on Manual: AWS EC2, S3, Docker Containerization, Kubernetes Pod Orchestration & Nagios Infrastructure Monitoring",
    category: "Academic Laboratory Manual",
    readTime: "50 mins",
    difficulty: "Advanced",
    simulatorUrl: "/labs/cloud-service-management",
    simulatorName: "Cloud & Container Simulator",
    overview:
      "This official laboratory manual provides structured experiments for Cloud Service Management and DevOps. Designed in accordance with autonomous curriculum requirements, it covers virtual machine provisioning on AWS EC2, S3 bucket lifecycle management, multi-stage Docker containerization, microservice scaling via Kubernetes Deployments, and full-stack host monitoring with Nagios.",
    learningObjectives: [
      "Provision and configure Linux virtual instances on AWS EC2 using secure SSH keypairs and Security Group firewall rules",
      "Deploy scalable object storage pipelines with AWS S3, bucket policies, and cross-origin resource sharing (CORS)",
      "Build lightweight multi-container microservice images using optimized Dockerfiles and Docker Compose networks",
      "Orchestrate container workloads using Kubernetes YAML manifests with automated replica self-healing and load balancing",
      "Configure active server infrastructure monitoring, latency thresholds, and notification alerts via Nagios Core"
    ],
    tags: ["Cloud", "AWS", "Docker", "Kubernetes", "DevOps", "Nagios", "Lab Manual", "VSB Engineering College"],
    keyConcepts: [
      {
        title: "1. Cloud Compute & Storage Virtualization",
        description:
          "Compute virtualization abstracts hardware through hypervisors, while object storage provides horizontally scalable distributed storage.",
        points: [
          "AWS EC2: Elastic compute capacity with customizable vCPUs, EBS persistent block storage, and AMI templates.",
          "AWS S3: High-durability (99.999999999%) bucket storage with server-side encryption (SSE-S3/SSE-KMS) and lifecycle policies.",
          "Security Groups: Stateful packet inspection firewalls governing inbound and outbound CIDR block permissions."
        ]
      },
      {
        title: "2. Containerization vs Traditional Virtualization",
        description:
          "Containers package user-space application runtimes sharing the host Linux kernel, eliminating OS hypervisor overhead.",
        points: [
          "Dockerfile: Declarative instructions (FROM, WORKDIR, COPY, RUN, EXPOSE, CMD) creating read-only image layers.",
          "Docker Compose: Multi-container orchestration defining isolated bridge networks and persistent host volume mounts.",
          "Alpine Base Images: Reducing attack surface and deployment footprint from 1 GB+ down to < 50 MB."
        ]
      },
      {
        title: "3. Kubernetes Pod Orchestration & Service Discovery",
        description:
          "Automated cluster management handling deployment rollouts, horizontal replica scaling, and cluster-internal DNS routing.",
        points: [
          "Pods: Smallest deployable units containing one or more co-located containers sharing localhost networking and IPC.",
          "Deployments: Declares desired replica state with automated rolling updates and zero-downtime rollbacks.",
          "Services: Stable virtual IP abstractions (ClusterIP, NodePort, LoadBalancer) load-balancing traffic across ephemeral Pods."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Compute Instance Provisioning",
        description: "Generate RSA keypairs, define ingress firewall rules for ports 22, 80, and 443, and launch an Ubuntu LTS EC2 instance."
      },
      {
        step: 2,
        title: "Container Image Construction",
        description: "Author an optimized Dockerfile, execute 'docker build -t app:latest .', and verify container execution with mapped host ports."
      },
      {
        step: 3,
        title: "Kubernetes Cluster Deployment",
        description: "Author deployment.yaml with 3 Pod replicas, apply via 'kubectl apply -f', and expose via a NodePort Service."
      },
      {
        step: 4,
        title: "Monitoring Configuration",
        description: "Install Nagios NRPE client daemon on the target node, register host and service definitions, and test threshold alerts."
      }
    ],
    codeSnippets: {
      bash: `# 1. Multi-Stage Dockerfile
cat << 'EOF' > Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --only=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
EOF

# 2. Kubernetes Deployment & Service Manifest
cat << 'EOF' > k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cloud-service-api
  labels:
    app: cloud-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: cloud-api
  template:
    metadata:
      labels:
        app: cloud-api
    spec:
      containers:
      - name: cloud-api-container
        image: vlab/cloud-api:v1.0
        ports:
        - containerPort: 3000
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "200m"
            memory: "256Mi"
---
apiVersion: v1
kind: Service
metadata:
  name: cloud-api-service
spec:
  type: NodePort
  selector:
    app: cloud-api
  ports:
    - port: 80
      targetPort: 3000
      nodePort: 30080
EOF

# 3. Apply Kubernetes Deployment
kubectl apply -f k8s-deployment.yaml
kubectl get pods -l app=cloud-api`
    },
    complexityAnalysis: {
      timeComplexity: "O(1) container startup overhead (seconds) vs O(minutes) for full VM hypervisor boots",
      spaceComplexity: "Shared host kernel footprint with copy-on-write (CoW) overlayfs storage drivers",
      notes: "Kubernetes Horizontal Pod Autoscaler (HPA) dynamically adjusts replica counts based on target CPU/Memory metrics in O(1) scheduling complexity."
    },
    vivaQuestions: [
      {
        question: "What is the primary difference between a Container and a Virtual Machine?",
        answer: "A Virtual Machine virtualizes underlying hardware using a hypervisor and runs a full guest operating system. A Container virtualizes only the OS user space by sharing the host Linux kernel (via cgroups and namespaces), making it significantly lighter and faster.",
        category: "Containers"
      },
      {
        question: "Explain the role of Kubernetes ReplicaSets and Deployments.",
        answer: "A ReplicaSet maintains a stable set of identical replica Pods running at any given time. A Deployment is a higher-level controller that manages ReplicaSets to enable declarative rolling updates, pauses, and rollbacks without manual intervention.",
        category: "Kubernetes"
      },
      {
        question: "What is the significance of IAM (Identity and Access Management) in AWS?",
        answer: "IAM manages authentication and authorization across AWS resources using Users, Groups, Roles, and JSON permission policies following the principle of least privilege.",
        category: "AWS Cloud"
      }
    ],
    realWorldApplications: [
      "High-throughput microservices architecture powering streaming platforms like Netflix and Spotify",
      "Continuous Integration / Continuous Delivery (CI/CD) pipelines automating software releases via GitHub Actions and Docker",
      "Enterprise multi-region cloud disaster recovery and failover management on AWS"
    ],
    practiceProblems: [
      {
        title: "Docker Multi-Container WordPress Setup",
        difficulty: "Medium",
        description: "Write a docker-compose.yml file that sets up WordPress and a MySQL database on an isolated bridge network with persistent named volumes and environment credentials."
      },
      {
        title: "Kubernetes Zero-Downtime Rolling Update",
        difficulty: "Hard",
        description: "Configure a rolling update strategy in a Kubernetes deployment with maxSurge=1 and maxUnavailable=0, verify pod readiness probes, and simulate a zero-downtime image version update."
      }
    ]
  },
  "bigdata-lab-manual": {
    id: "bigdata-lab-manual",
    title: "Big Data Analytics Laboratory Manual",
    subject: "Big Data Analytics Lab",
    provider: "Department of Artificial Intelligence and Data Science",
    source: "VSB Engineering College Autonomous Curriculum (R2023 / R2021)",
    subtitle: "Hands-on Manual: Hadoop HDFS Architecture, MapReduce Processing, Apache Pig, Hive Data Warehousing & PySpark DataFrames",
    category: "Academic Laboratory Manual",
    readTime: "55 mins",
    difficulty: "Advanced",
    simulatorUrl: "/labs/big-data-analytics",
    simulatorName: "Hadoop & Spark Simulator",
    overview:
      "This official laboratory manual for Big Data Analytics guides students through distributed data ingestion, distributed storage, and large-scale parallel processing. The syllabus covers the Hadoop Distributed File System (HDFS), MapReduce programming in Java and Python, Apache Pig Latin data transformation, Apache Hive data warehousing (HQL), and in-memory analytics using Apache Spark (PySpark DataFrames).",
    learningObjectives: [
      "Master the Hadoop Distributed File System (HDFS) command line for distributed file storage, block replication, and cluster node inspection",
      "Develop custom MapReduce programs implementing Mapper and Reducer logic for aggregation and word frequency analysis",
      "Perform ETL workflows and schema transformations using Apache Pig Latin scripts (LOAD, FILTER, GROUP, FOREACH)",
      "Design distributed relational data warehouses in Apache Hive, creating managed/external tables and partitioned querying",
      "Execute high-speed distributed in-memory transformations and actions on PySpark RDDs and DataFrames"
    ],
    tags: ["Big Data", "Hadoop", "HDFS", "MapReduce", "Hive", "PySpark", "Lab Manual", "VSB Engineering College"],
    keyConcepts: [
      {
        title: "1. HDFS Architecture & Fault Tolerance",
        description:
          "HDFS employs a master-worker architecture designed to store multi-terabyte datasets across commodity hardware clusters.",
        points: [
          "NameNode: Master server managing the file system namespace, directory tree, and block location mapping in memory.",
          "DataNodes: Worker nodes storing physical 128 MB data blocks and reporting periodic block heartbeats back to NameNode.",
          "Replication Factor: Default replication of 3 ensures data resilience across different racks against disk/node crashes."
        ]
      },
      {
        title: "2. The MapReduce Distributed Computing Paradigm",
        description:
          "Processes data by dividing computations into independent map phases and aggregated reduce phases across the cluster.",
        points: [
          "Map Phase: Transforms raw input (k1, v1) pairs into intermediate key-value pairs (k2, v2).",
          "Shuffle & Sort: Distributes intermediate key-value pairs across the network such that all values for a given key arrive at the same Reducer.",
          "Reduce Phase: Aggregates values for each unique key to produce the final output (k2, v3) pairs."
        ]
      },
      {
        title: "3. Apache Spark In-Memory Computing",
        description:
          "Spark accelerates iterative batch and streaming analytics up to 100x faster than traditional MapReduce through memory caching.",
        points: [
          "Resilient Distributed Datasets (RDDs): Immutable, partitioned collections supporting lazy evaluation transformations.",
          "Catalyst Optimizer: Optimizes PySpark DataFrame execution plans into highly efficient low-level bytecode.",
          "Transformations vs Actions: Transformations (map, filter, groupBy) return new RDDs lazily; Actions (count, collect, saveAsTextFile) trigger cluster execution."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Hadoop Cluster & HDFS Ingestion",
        description: "Start NameNode and DataNode daemons using 'start-dfs.sh', create an HDFS target directory, and upload large dataset files using 'hdfs dfs -put'."
      },
      {
        step: 2,
        title: "MapReduce Job Execution",
        description: "Compile mapper and reducer code, submit the jar file to the YARN cluster manager via 'hadoop jar', and inspect part-r-00000 output files."
      },
      {
        step: 3,
        title: "Hive Data Warehouse Schema Definition",
        description: "Launch Beeline/Hive shell, create partitioned tables with delimited row formats, and run analytical queries translated into Tez/MapReduce jobs."
      },
      {
        step: 4,
        title: "PySpark In-Memory Transformation",
        description: "Initialize SparkSession, read CSV/Parquet into PySpark DataFrames, perform groupBy aggregations, and compute metrics in memory."
      }
    ],
    codeSnippets: {
      python: `# 1. PySpark Distributed Analytics Script
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, desc, count, avg

# Initialize distributed SparkSession
spark = SparkSession.builder \\
    .appName("BigDataAnalyticsLab") \\
    .config("spark.executor.memory", "2g") \\
    .getOrCreate()

# Load dataset from HDFS
df = spark.read.csv("hdfs://namenode:9000/data/web_traffic.csv", header=True, inferSchema=True)

# Data Exploration and Transformation
print("Schema definition:")
df.printSchema()

# Aggregation: Top IP addresses by page hits
ip_hits = df.groupBy("ip_address") \\
    .agg(count("url").alias("hit_count"), avg("response_time_ms").alias("avg_latency")) \\
    .filter(col("hit_count") > 100) \\
    .orderBy(desc("hit_count"))

ip_hits.show(10)

# Save result back to HDFS in Parquet format
ip_hits.write.mode("overwrite").parquet("hdfs://namenode:9000/output/ip_traffic_metrics")

spark.stop()`
    },
    complexityAnalysis: {
      timeComplexity: "MapReduce: O(N log N) dominated by network shuffle/sort; PySpark: O(N) in-memory execution",
      spaceComplexity: "HDFS: O(N * 3) for standard 3x block replication across cluster storage nodes",
      notes: "PySpark preserves intermediate DAG partitions in RAM, avoiding disk serialization bottlenecks between iterative algorithm steps."
    },
    vivaQuestions: [
      {
        question: "Explain the role of NameNode and Secondary NameNode in Hadoop.",
        answer: "The NameNode maintains the filesystem metadata (fsimage and edits log) in memory. The Secondary NameNode is NOT a hot standby; it periodically merges the edits log with the fsimage checkpoint to prevent the edits log from growing excessively large.",
        category: "HDFS"
      },
      {
        question: "What is the difference between Apache Pig and Apache Hive?",
        answer: "Apache Pig uses a procedural dataflow language called Pig Latin suited for ETL data pipelines. Apache Hive provides a declarative SQL-like dialect (HiveQL) suited for structured data warehousing and analytical reporting.",
        category: "Ecosystem"
      },
      {
        question: "Why is Apache Spark faster than Hadoop MapReduce?",
        answer: "Spark performs computations in memory (RAM) and pipelines transformations lazily into a directed acyclic graph (DAG), avoiding MapReduce's costly disk read/write cycles between intermediate pipeline phases.",
        category: "Spark"
      }
    ],
    realWorldApplications: [
      "Telecom call detail record (CDR) ingestion and fraud detection processing billions of events per day",
      "Recommendation engines and search indexing at large tech companies utilizing distributed PySpark clusters",
      "Financial market risk analysis and algorithmic high-frequency trading data lake warehousing"
    ],
    practiceProblems: [
      {
        title: "WordCount MapReduce in Python (Hadoop Streaming)",
        difficulty: "Medium",
        description: "Author a Python mapper and reducer script to execute a distributed WordCount over an 8 GB Gutenberg text archive using the Hadoop streaming utility."
      },
      {
        title: "PySpark Churn Feature Engineering Pipeline",
        difficulty: "Hard",
        description: "Build an end-to-end PySpark pipeline that imputes missing numerical fields, one-hot encodes categorical customer features, and vectorizes attributes using VectorAssembler for MLlib."
      }
    ]
  }
};
