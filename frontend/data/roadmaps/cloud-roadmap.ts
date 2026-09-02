import { DSACategory } from "../dsa-topic-data";

export const CLOUD_ROADMAP_CATEGORIES: DSACategory[] = [
  {
    id: "cloud-infrastructure-aws",
    name: "1. Cloud Infrastructure & AWS Core Services",
    shortDesc: "AWS EC2 virtual compute, VPC networks, and S3 scalable object storage.",
    iconName: "Cloud",
    topics: [
      {
        id: "aws-ec2-vpc-provisioning",
        slug: "aws-ec2-vpc-security-groups-provisioning",
        title: "1. AWS EC2 Compute, VPC & Security Groups",
        categoryId: "cloud-infrastructure-aws",
        categoryName: "1. Cloud Infrastructure & AWS Core Services",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        gfgSearchQuery: "AWS EC2 Instance Setup GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/aws-tutorial/",
        quickSummary: "Virtual compute instances on demand with elastic IPs, custom VPC subnets, and stateful security group firewalls.",
        keyPoints: [
          "EC2 Instances: Virtual servers providing resizable compute capacity.",
          "VPC (Virtual Private Cloud): Isolated virtual network spanning Public and Private subnets.",
          "Security Groups: Stateful virtual firewalls controlling inbound and outbound traffic."
        ],
        diagramTitle: "AWS Virtual Private Cloud (VPC) Topology",
        diagram: `Internet Gateway ──> Route Table ──> [ Public Subnet: Web Server (EC2) ]
                                                │ (Internal Routing)
                                                ▼
                                  [ Private Subnet: DB Server (RDS) ]`,
        complexities: [
          { operation: "Instance Provisioning", best: "O(1)", avg: "1-2 mins", worst: "5 mins", space: "O(Storage EBS)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Terraform HCL",
            code: `resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0" # Ubuntu 22.04 LTS
  instance_type = "t3.micro"
  key_name      = "vlab-keypair"

  vpc_security_group_ids = [aws_security_group.web_sg.id]

  tags = {
    Name        = "VLab-WebServer"
    Environment = "Production"
  }
}`
          }
        ],
        practiceProblems: [
          { title: "Design Load Balancer Router", difficulty: "Medium", url: "https://leetcode.com/problems/insert-delete-getrandom-o1/", platform: "LeetCode" }
        ]
      },
      {
        id: "aws-s3-storage-lifecycle",
        slug: "aws-s3-object-storage-lifecycle-management",
        title: "2. AWS S3 Storage & Lifecycle Policies",
        categoryId: "cloud-infrastructure-aws",
        categoryName: "1. Cloud Infrastructure & AWS Core Services",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        gfgSearchQuery: "AWS S3 Bucket Tutorial GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/aws-tutorial/",
        quickSummary: "Scalable 99.999999999% (11 9s) durable object storage with automated tiered archiving policies.",
        keyPoints: [
          "Storage Classes: S3 Standard, S3 Intelligent-Tiering, S3 Glacier Flexible, S3 Glacier Deep Archive.",
          "Lifecycle Rules: Automatically transition objects to Glacier after 30 days and delete after 365 days.",
          "Cross-Region Replication (CRR) and Bucket Versioning protection."
        ],
        diagramTitle: "S3 Object Lifecycle Transition Flowchart",
        diagram: `Upload Object ──> [ S3 Standard (0-30 Days) ] ──> [ S3 Glacier (30-90 Days) ] ──> [ Expire (365 Days) ]`,
        complexities: [
          { operation: "S3 Object Put", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(Unlimited)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (boto3)",
            code: `import boto3

s3 = boto3.client('s3')
s3.upload_file(
    Filename='dataset.csv',
    Bucket='vlab-cloud-bucket',
    Key='analytics/dataset.csv',
    ExtraArgs={'ContentType': 'text/csv'}
)
print("File successfully uploaded to AWS S3!")`
          }
        ],
        practiceProblems: [
          { title: "Design Compressed File Storage", difficulty: "Medium", url: "https://leetcode.com/problems/encode-and-decode-tinyurl/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    id: "containerization-kubernetes",
    name: "2. Docker Containers & Kubernetes Orchestration",
    shortDesc: "Containerizing microservices with Docker and managing multi-pod clusters with Kubernetes.",
    iconName: "Cloud",
    topics: [
      {
        id: "docker-containerization",
        slug: "docker-containerization-dockerfile-compose",
        title: "3. Docker Containerization & Multi-Container Compose",
        categoryId: "containerization-kubernetes",
        categoryName: "2. Docker Containers & Kubernetes Orchestration",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        gfgSearchQuery: "Docker Containerization GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/docker-tutorial/",
        quickSummary: "Packages code, dependencies, and environment into lightweight, portable, isolated containers.",
        keyPoints: [
          "Dockerfile: Declarative instructions for building layered container images.",
          "Docker Compose: Multi-container orchestration tool defining services, networks, and persistent volumes.",
          "Eliminates 'it works on my machine' environmental discrepancies."
        ],
        diagramTitle: "Docker Layered Architecture",
        diagram: `[ App Code ] ──> [ Dependencies / Node.js ] ──> [ Alpine Linux OS Base Layer ] ──> Docker Engine`,
        complexities: [
          { operation: "Container Startup", best: "O(1) (~500ms)", avg: "1s", worst: "5s", space: "O(Image Size)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Dockerfile",
            code: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`
          }
        ],
        practiceProblems: [
          { title: "Design Parking System (Stateful Allocation)", difficulty: "Easy", url: "https://leetcode.com/problems/design-parking-system/", platform: "LeetCode" }
        ]
      },
      {
        id: "kubernetes-cluster-pods",
        slug: "kubernetes-pods-deployments-services",
        title: "4. Kubernetes Pods, Deployments & Service Mesh",
        categoryId: "containerization-kubernetes",
        categoryName: "2. Docker Containers & Kubernetes Orchestration",
        difficulty: "Advanced",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Kubernetes Tutorial GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/kubernetes/",
        quickSummary: "Automated deployment, auto-scaling, self-healing, and load-balancing of containerized applications.",
        keyPoints: [
          "Pod: Smallest deployable compute unit in Kubernetes containing one or more containers.",
          "Deployment: Manages ReplicaSets to maintain desired state and perform zero-downtime rolling updates.",
          "Service: Stable IP and DNS load-balancer abstraction over dynamic pods."
        ],
        diagramTitle: "Kubernetes Cluster Pod Topology",
        diagram: `[ Kube Service (ClusterIP: 80) ] ──> Load Balance ──> [ Pod Replica 1 ]
                                               ──> [ Pod Replica 2 ]
                                               ──> [ Pod Replica 3 ]`,
        complexities: [
          { operation: "Pod Rolling Update", best: "Zero Downtime", avg: "O(Replicas)", worst: "Timeout", space: "O(Cluster RAM)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Kubernetes YAML",
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: virtual-lab-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: vlab-api
  template:
    metadata:
      labels:
        app: vlab-api
    spec:
      containers:
      - name: api
        image: vlab/api:v1.2
        ports:
        - containerPort: 8080`
          }
        ],
        practiceProblems: [
          { title: "Design Distributed Rate Limiter", difficulty: "Medium", url: "https://leetcode.com/problems/logger-rate-limiter/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    id: "serverless-cloud-iam",
    name: "3. Serverless Architecture & Cloud Security",
    shortDesc: "AWS Lambda event-driven execution, API Gateway, and IAM security policies.",
    iconName: "Cloud",
    topics: [
      {
        id: "aws-lambda-serverless",
        slug: "aws-lambda-serverless-api-gateway",
        title: "5. AWS Lambda Serverless Microservices & IAM",
        categoryId: "serverless-cloud-iam",
        categoryName: "3. Serverless Architecture & Cloud Security",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        gfgSearchQuery: "AWS Lambda Serverless Tutorial",
        gfgUrl: "https://www.geeksforgeeks.org/aws-tutorial/",
        quickSummary: "Run backend code without managing or provisioning servers; charges only for compute time consumed.",
        keyPoints: [
          "Event-Driven: Triggered by S3 uploads, DynamoDB streams, HTTP API Gateway requests, or CloudWatch timers.",
          "Auto-Scaling: Scales automatically from zero requests to thousands of concurrent executions.",
          "IAM Policies: Least privilege access control granting granular permissions to specific cloud resources."
        ],
        diagramTitle: "Serverless REST API Architecture",
        diagram: `Client HTTP Request ──> [ AWS API Gateway ] ──> [ AWS Lambda Function ] ──> [ DynamoDB / S3 ]`,
        complexities: [
          { operation: "Warm Invocation", best: "O(1) (<10ms)", avg: "50ms", worst: "Cold Start (~200ms)", space: "O(Configured RAM)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python AWS Lambda Handler",
            code: `import json

def lambda_handler(event, context):
    body = json.loads(event.get('body', '{}'))
    user_name = body.get('name', 'Student')

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'message': f"Welcome to Cloud Lab, {user_name}!",
            'status': 'SUCCESS'
        })
    }`
          }
        ],
        practiceProblems: [
          { title: "Design Hit Counter (High Throughput)", difficulty: "Medium", url: "https://leetcode.com/problems/design-hit-counter/", platform: "LeetCode" }
        ]
      }
    ]
  }
];
