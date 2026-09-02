import { DSACategory } from "../dsa-topic-data";

export const BIGDATA_ROADMAP_CATEGORIES: DSACategory[] = [
  {
    id: "hdfs-architecture",
    name: "1. Hadoop Architecture & HDFS",
    shortDesc: "Hadoop NameNode/DataNode architecture, block replication, and HDFS shell commands.",
    iconName: "BarChart3",
    topics: [
      {
        id: "hdfs-file-operations",
        slug: "hadoop-hdfs-architecture-file-operations",
        title: "1. HDFS Block Distribution & Shell Commands",
        categoryId: "hdfs-architecture",
        categoryName: "1. Hadoop Architecture & HDFS",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        gfgSearchQuery: "Hadoop HDFS Architecture GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/hadoop-tutorial/",
        quickSummary: "HDFS stores massive datasets across distributed commodity hardware with fault-tolerant block replication.",
        keyPoints: [
          "NameNode: Master metadata server storing directory trees and block mappings in memory.",
          "DataNode: Worker slave nodes storing raw file block chunks (default 128MB).",
          "Replication Factor: Default 3x rack-aware replication ensures high availability."
        ],
        diagramTitle: "HDFS Master-Slave Rack Architecture",
        diagram: `                    [ Master: NameNode ]
                    (Metadata & Block Map)
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
      [ Rack 1: DataNode A ]            [ Rack 2: DataNode C ]
      [ Rack 1: DataNode B ]            [ Rack 2: DataNode D ]`,
        complexities: [
          { operation: "Block Streaming", best: "O(1)", avg: "O(Block Size)", worst: "O(Block Size)", space: "O(Metadata)" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Bash HDFS CLI",
            code: `# HDFS File Management Commands
hdfs dfs -mkdir -p /user/virtual_lab/data
hdfs dfs -put local_sales.csv /user/virtual_lab/data/
hdfs dfs -ls /user/virtual_lab/data/
hdfs dfs -cat /user/virtual_lab/data/local_sales.csv | head -n 10
hdfs dfs -setrep -w 3 /user/virtual_lab/data/local_sales.csv`
          }
        ],
        practiceProblems: [
          { title: "Design Distributed File System", difficulty: "Medium", url: "https://leetcode.com/problems/design-file-system/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    id: "mapreduce-computing",
    name: "2. MapReduce Distributed Framework",
    shortDesc: "Map, Shuffle, and Reduce distributed operations for large-scale data processing.",
    iconName: "BarChart3",
    topics: [
      {
        id: "mapreduce-wordcount",
        slug: "mapreduce-word-count-matrix-multiplication",
        title: "2. MapReduce Distributed Word Count & Matrix Math",
        categoryId: "mapreduce-computing",
        categoryName: "2. MapReduce Distributed Framework",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        gfgSearchQuery: "MapReduce Word Count Program GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/mapreduce-tutorial/",
        quickSummary: "Splits computation into a parallel Map step, intermediate key-value Shuffle/Sort, and aggregate Reduce step.",
        keyPoints: [
          "Mapper: Emits intermediate Key-Value pairs: (word, 1).",
          "Shuffle & Sort: Groups all values with matching keys across cluster partitions.",
          "Reducer: Aggregates list of counts per word: (word, sum([1, 1, 1])).",
          "Fault tolerant: Failed tasks restart automatically on alternate worker nodes."
        ],
        diagramTitle: "MapReduce Data Pipeline Flowchart",
        diagram: `Input Data ──> [ Split ] ──> [ Map (w, 1) ] ──> [ Shuffle & Sort ] ──> [ Reduce (w, total) ] ──> Final Output`,
        complexities: [
          { operation: "MapReduce Job", best: "O(N/K)", avg: "O(N/K + log K)", worst: "O(N)", space: "O(N)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python Streaming MapReduce",
            code: `# mapper.py
import sys
for line in sys.stdin:
    for word in line.strip().split():
        print(f"{word}\\t1")

# reducer.py
import sys
from collections import defaultdict
counts = defaultdict(int)
for line in sys.stdin:
    word, count = line.strip().split('\\t')
    counts[word] += int(count)
for word, count in counts.items():
    print(f"{word}\\t{count}")`
          }
        ],
        practiceProblems: [
          { title: "Top K Frequent Words", difficulty: "Medium", url: "https://leetcode.com/problems/top-k-frequent-words/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    id: "spark-pyspark",
    name: "3. Apache Spark & NoSQL Analytics",
    shortDesc: "In-memory RDD transformations, PySpark DataFrames, and MongoDB Aggregations.",
    iconName: "BarChart3",
    topics: [
      {
        id: "pyspark-dataframe-analytics",
        slug: "pyspark-rdd-dataframe-analytics",
        title: "3. Apache Spark RDDs & PySpark DataFrames",
        categoryId: "spark-pyspark",
        categoryName: "3. Apache Spark & NoSQL Analytics",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        gfgSearchQuery: "PySpark DataFrame Tutorial GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/pyspark-tutorial/",
        quickSummary: "Apache Spark provides 100x faster in-memory distributed compute via Resilient Distributed Datasets (RDDs).",
        keyPoints: [
          "RDD (Resilient Distributed Dataset): Immutable, lazily evaluated, partition-aware collections.",
          "Transformations (Lazy): map(), filter(), flatMap(), groupByKey() construct a Directed Acyclic Graph (DAG).",
          "Actions (Eager Execution): count(), collect(), saveAsTextFile() trigger physical execution pipelines."
        ],
        diagramTitle: "Spark DAG Execution Pipeline",
        diagram: `Raw CSV ──> RDD Transformation (filter) ──> DAG Plan ──> Action (count) ──> In-Memory Compute`,
        complexities: [
          { operation: "Spark In-Memory Scan", best: "O(1)", avg: "O(N/Cores)", worst: "O(N)", space: "O(RAM Cache)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "PySpark",
            code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col, avg, count

spark = SparkSession.builder.appName("BigDataAnalytics").getOrCreate()
df = spark.read.csv("hdfs:///data/ecommerce_sales.csv", header=True, inferSchema=True)

metrics_df = df.groupBy("category") \\
               .agg(count("order_id").alias("total_orders"), avg("price").alias("avg_price")) \\
               .filter(col("total_orders") > 1000) \\
               .orderBy(col("avg_price").desc())

metrics_df.show(5)`
          }
        ],
        practiceProblems: [
          { title: "Aggregate Large Data Streams", difficulty: "Medium", url: "https://leetcode.com/problems/first-unique-number/", platform: "LeetCode" }
        ]
      },
      {
        id: "mongodb-nosql-analytics",
        slug: "mongodb-nosql-aggregation-pipelines",
        title: "4. NoSQL Big Data & MongoDB Aggregation Pipeline",
        categoryId: "spark-pyspark",
        categoryName: "3. Apache Spark & NoSQL Analytics",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        gfgSearchQuery: "MongoDB Aggregation Pipeline GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/mongodb-aggregation-framework/",
        quickSummary: "Document-oriented NoSQL storage with multi-stage aggregation pipelines ($match, $group, $project).",
        keyPoints: [
          "Flexible BSON JSON schema allows semi-structured data ingestion at terabyte scale.",
          "Sharding: Distributes collection documents across multiple replica sets.",
          "Aggregation Pipeline: Multi-stage transformations ($match -> $group -> $sort -> $limit)."
        ],
        diagramTitle: "MongoDB Aggregation Pipeline Stages",
        diagram: `Collection ──> [$match: active:true] ──> [$group: _id:"$region", total:{$sum:"$revenue"}] ──> [$sort: -1]`,
        complexities: [
          { operation: "Pipeline Execution", best: "O(log N)", avg: "O(N)", worst: "O(N)", space: "O(Result Size)" }
        ],
        codeSnippets: [
          {
            language: "javascript",
            label: "MongoDB Query",
            code: `db.transactions.aggregate([
  { $match: { status: "COMPLETED", amount: { $gte: 100 } } },
  { $group: {
      _id: "$category",
      totalRevenue: { $sum: "$amount" },
      avgTransaction: { $avg: "$amount" },
      count: { $sum: 1 }
  }},
  { $sort: { totalRevenue: -1 } },
  { $limit: 5 }
]);`
          }
        ],
        practiceProblems: [
          { title: "Design In-Memory Database", difficulty: "Medium", url: "https://leetcode.com/problems/design-an-in-memory-file-system/", platform: "LeetCode" }
        ]
      }
    ]
  }
];
