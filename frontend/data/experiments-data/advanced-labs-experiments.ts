import { Experiment } from "../experiments";

export const ADVANCED_LABS_EXPERIMENTS: Experiment[] = [
  // Artificial Intelligence
  {
    id: "ai-exp-1",
    labId: "artificial-intelligence",
    title: "Exp 1: A* Search Algorithm & Manhattan Heuristic",
    slug: "astar-heuristic-search-algorithm",
    difficulty: "Intermediate",
    category: "Artificial Intelligence" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 140,
    simulator: "custom",
    quizId: "quiz-ai-1",
    sections: {
      introduction: "A* Search is an informed graph search evaluating f(n) = g(n) + h(n) to find shortest path routes efficiently.",
      objective: "Implement A* with PriorityQueue and admissible Manhattan distance heuristics.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "A* Heuristic Search",
      videoChannel: "Computerphile",
      prerequisites: ["Graph Search", "Heuristics"],
      theory: {
        overview: "A* combines actual cost g(n) from start with estimated cost h(n) to goal. Admissible heuristic guarantees optimality.",
        keyConcepts: [
          { title: "f(n) = g(n) + h(n)", desc: "Evaluation function balancing traveled path and remaining distance." },
          { title: "Admissibility", desc: "Never overestimates actual cost to goal." }
        ],
        complexities: [
          { operation: "A* Search", best: "O(d)", avg: "O(b^d)", worst: "O(b^d)", space: "O(b^d)" }
        ],
        realWorldApplications: ["Video game NPC pathfinding", "Robotic motion planning", "GPS map routing"]
      },
      procedure: ["1. Initialize open priority queue.", "2. Extract node with lowest f(n).", "3. Expand neighbors.", "4. Reconstruct path."],
      sampleCode: {
        language: "python",
        code: `import heapq\ndef a_star(graph, h, start, goal):\n    pq = [(h[start], 0, start, [start])]\n    visited = set()\n    while pq:\n        f, g, u, path = heapq.heappop(pq)\n        if u == goal: return path\n        if u in visited: continue\n        visited.add(u)\n        for v, cost in graph.get(u, []):\n            if v not in visited:\n                heapq.heappush(pq, (g + cost + h.get(v, 0), g + cost, v, path + [v]))\n    return None`
      },
      expectedOutput: `Path Found: ['A', 'C', 'G']`,
      leetcodeProblems: [],
      targetAudience: { ug: ["B.Tech AIDS"], pg: ["M.Tech AI"] }
    }
  },
  // Big Data Analytics
  {
    id: "bd-exp-1",
    labId: "big-data-analytics",
    title: "Exp 1: HDFS Block Distribution & Shell Commands",
    slug: "hadoop-hdfs-architecture-file-operations",
    difficulty: "Beginner",
    category: "Big Data Analytics" as any,
    estimatedMinutes: 25,
    rating: 4.90,
    ratingsCount: 115,
    simulator: "custom",
    quizId: "quiz-bd-1",
    sections: {
      introduction: "Hadoop Distributed File System (HDFS) stores massive files across distributed commodity server nodes with fault-tolerant replication.",
      objective: "Execute HDFS shell commands to create distributed directories, upload data, and configure 3x replication.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Hadoop HDFS Architecture",
      videoChannel: "Edureka",
      prerequisites: ["Linux CLI", "Distributed Systems"],
      theory: {
        overview: "NameNode manages directory metadata in memory; DataNodes store 128MB block chunks with 3x rack-aware replication.",
        keyConcepts: [
          { title: "NameNode", desc: "Master metadata coordinator." },
          { title: "DataNodes", desc: "Worker block storage servers." }
        ],
        complexities: [{ operation: "Block Stream", best: "O(1)", avg: "O(block_size)", worst: "O(block_size)", space: "O(metadata)" }],
        realWorldApplications: ["Petabyte data lakes", "ETL staging warehouses"]
      },
      procedure: ["1. Start HDFS daemons.", "2. Create HDFS directories.", "3. Upload dataset.", "4. Inspect replication."],
      sampleCode: {
        language: "bash",
        code: `hdfs dfs -mkdir -p /user/vlab/data\nhdfs dfs -put sales.csv /user/vlab/data/\nhdfs dfs -ls /user/vlab/data/`
      },
      expectedOutput: `Found 1 items\n-rw-r--r--   3 student supergroup   1048576 2026-09-02 21:10 /user/vlab/data/sales.csv`,
      leetcodeProblems: [],
      targetAudience: { ug: ["B.Tech AIDS"], pg: ["M.Tech Data Science"] }
    }
  },
  // Cloud Service Management
  {
    id: "cloud-exp-1",
    labId: "cloud-service-management",
    title: "Exp 1: AWS EC2 Compute, VPC & Security Groups",
    slug: "aws-ec2-vpc-security-groups-provisioning",
    difficulty: "Beginner",
    category: "Cloud Computing" as any,
    estimatedMinutes: 25,
    rating: 4.92,
    ratingsCount: 120,
    simulator: "custom",
    quizId: "quiz-cloud-1",
    sections: {
      introduction: "Cloud compute provisioning allows spinning up resizable virtual machines within isolated Virtual Private Clouds (VPC).",
      objective: "Provision EC2 instances using Terraform Infrastructure as Code with custom security group firewall ingress rules.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "AWS EC2 & VPC Tutorial",
      videoChannel: "freeCodeCamp",
      prerequisites: ["Cloud Fundamentals", "Networking"],
      theory: {
        overview: "VPC provides isolated private subnets. Security Groups enforce stateful firewall rules restricting port 80/443 traffic.",
        keyConcepts: [
          { title: "EC2 Virtual Servers", desc: "Resizable on-demand compute capacity." },
          { title: "Security Groups", desc: "Virtual firewall controlling ingress/egress." }
        ],
        complexities: [{ operation: "Provisioning", best: "O(1)", avg: "1-2 mins", worst: "5 mins", space: "O(EBS)" }],
        realWorldApplications: ["Scalable web hosting", "Microservice container clusters"]
      },
      procedure: ["1. Define Terraform HCL.", "2. Apply configuration.", "3. Verify running EC2 instance."],
      sampleCode: {
        language: "java",
        code: `resource "aws_instance" "web" {\n  ami           = "ami-0c55b159cbfafe1f0"\n  instance_type = "t3.micro"\n}`
      },
      expectedOutput: `Apply complete! Resources: 1 added, 0 changed, 0 destroyed.`,
      leetcodeProblems: [],
      targetAudience: { ug: ["B.Tech AIDS"], pg: ["M.Tech Cloud"] }
    }
  }
];
