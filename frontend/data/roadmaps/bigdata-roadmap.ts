import { DSACategory } from "../dsa-topic-data";

export const BIGDATA_ROADMAP_CATEGORIES: DSACategory[] = [
  // ========================================================
  // MODULE 1: HADOOP SETUP & HDFS (0/2)
  // ========================================================
  {
    id: "bda-hadoop-hdfs",
    name: "1. Hadoop Setup & HDFS",
    shortDesc: "Hadoop cluster modes, XML configuration files, daemons, and HDFS shell file operations.",
    iconName: "Database",
    topics: [
      {
        id: "bda-hadoop-installation-modes",
        slug: "downloading-installing-hadoop-modes-configs",
        title: "Exp 1: Downloading and Installing Hadoop — Understanding Different Hadoop Modes, Startup Scripts, and Configuration Files",
        categoryId: "bda-hadoop-hdfs",
        categoryName: "1. Hadoop Setup & HDFS",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Hadoop installation standalone pseudo distributed fully distributed mode XML configs",
        gfgUrl: "https://www.geeksforgeeks.org/how-to-install-and-set-up-hadoop-on-ubuntu/",
        quickSummary: "Install Hadoop locally and configure it to run in standalone, pseudo-distributed, or fully distributed mode, understanding the key config files and startup scripts.",
        keyPoints: [
          "Cluster deployment modes: Hadoop can run in Standalone (local Java process), Pseudo-Distributed (single-node daemon simulation), or Fully Distributed mode across physical clusters.",
          "Core XML configuration: Core config files (core-site.xml, hdfs-site.xml, mapred-site.xml, yarn-site.xml) define filesystem URIs, block replication factors, and YARN resource managers.",
          "Daemon lifecycle scripts: Startup scripts (start-dfs.sh, start-yarn.sh) bring up NameNode, DataNode, ResourceManager, and NodeManager daemons."
        ],
        diagramTitle: "Hadoop Cluster Modes & Daemon Topology",
        diagram: `  [ Standalone Mode ]  ──► Single JVM (No Daemons, Local FS)
  [ Pseudo Mode ]      ──► 1 Physical Node (Separate NameNode, DataNode, YARN JVMs)
  [ Distributed Mode ] ──► Master Node (NameNode) ──► Worker Nodes (DataNodes)`,
        complexities: [],
        tools: [
          { tool: "Hadoop", purpose: "Distributed storage & processing framework", notes: "Java required (JDK 8 or 11)" },
          { tool: "SSH", purpose: "Inter-node cluster daemon communication", notes: "Passwordless key-based setup" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Bash (Hadoop Setup)",
            code: `# 1. Format HDFS NameNode
hdfs namenode -format

# 2. Launch HDFS Storage Daemons
start-dfs.sh

# 3. Launch YARN Resource Management Daemons
start-yarn.sh

# 4. Verify Active Daemons
jps
# Expected Output: NameNode, DataNode, SecondaryNameNode, ResourceManager, NodeManager`
          }
        ],
        practiceProblems: [
          {
            title: "Hadoop Installation & Verification Guide",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/how-to-install-and-set-up-hadoop-on-ubuntu/",
            platform: "GeeksforGeeks",
            topicTag: "Hadoop"
          }
        ]
      },
      {
        id: "bda-hdfs-file-management",
        slug: "hadoop-file-management-tasks-hdfs",
        title: "Exp 2: Hadoop Implementation of File Management Tasks — Adding Files and Directories, Retrieving Files, and Deleting Files",
        categoryId: "bda-hadoop-hdfs",
        categoryName: "1. Hadoop Setup & HDFS",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "HDFS shell commands hdfs dfs put get ls rm mkdir",
        gfgUrl: "https://www.geeksforgeeks.org/hdfs-commands/",
        quickSummary: "Practice HDFS shell commands to manage files/directories within the distributed file system.",
        keyPoints: [
          "Hierarchical distributed namespace: HDFS provides a hierarchical namespace similar to a local filesystem but distributed across DataNodes.",
          "HDFS shell commands: hdfs dfs commands (-put, -get, -ls, -rm, -mkdir) manage file ingress, retrieval, and directory deletion.",
          "Block replication: Files are internally split into 128MB blocks and replicated across cluster nodes for fault tolerance."
        ],
        diagramTitle: "HDFS File Block Splitting & Replication",
        diagram: `  sales_large.csv (300 MB)
            │
            ├── Block 1 (128 MB) ──► Replicated to [DataNode 1, DataNode 2, DataNode 3]
            ├── Block 2 (128 MB) ──► Replicated to [DataNode 2, DataNode 3, DataNode 4]
            └── Block 3 (44 MB)  ──► Replicated to [DataNode 1, DataNode 4, DataNode 5]`,
        complexities: [],
        tools: [
          { tool: "HDFS CLI", purpose: "Distributed file management and cluster ingress/egress", notes: "hdfs dfs utility" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Bash (HDFS CLI Commands)",
            code: `# 1. Create a distributed directory in HDFS
hdfs dfs -mkdir -p /user/aids/datasets

# 2. Upload local file into HDFS distributed storage (-put)
hdfs dfs -put local_sales.csv /user/aids/datasets/

# 3. List directory contents
hdfs dfs -ls /user/aids/datasets/

# 4. Preview top 10 lines of file stored in HDFS
hdfs dfs -cat /user/aids/datasets/local_sales.csv | head -n 10

# 5. Retrieve file from HDFS back to local machine (-get)
hdfs dfs -get /user/aids/datasets/local_sales.csv ./downloaded_sales.csv

# 6. Remove file from HDFS
hdfs dfs -rm /user/aids/datasets/local_sales.csv`
          }
        ],
        practiceProblems: [
          {
            title: "HDFS Commands & File Management",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/hdfs-commands/",
            platform: "GeeksforGeeks",
            topicTag: "HDFS"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 2: MAPREDUCE PROGRAMMING (0/2)
  // ========================================================
  {
    id: "bda-mapreduce-programming",
    name: "2. MapReduce Programming",
    shortDesc: "Distributed matrix multiplication and the canonical Word Count Map-Shuffle-Reduce paradigm.",
    iconName: "Layers",
    topics: [
      {
        id: "bda-mapreduce-matrix-multiplication",
        slug: "matrix-multiplication-hadoop-mapreduce",
        title: "Exp 3: Implementation of Matrix Multiplication with Hadoop MapReduce",
        categoryId: "bda-mapreduce-programming",
        categoryName: "2. MapReduce Programming",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Matrix multiplication using Hadoop MapReduce Java",
        gfgUrl: "https://www.geeksforgeeks.org/matrix-multiplication-using-mapreduce-in-hadoop/",
        quickSummary: "Express matrix multiplication as a MapReduce job, distributing the computation of output elements across mappers and reducers.",
        keyPoints: [
          "Mapper projection: The Map phase emits partial products keyed by output matrix position (i, k).",
          "Distributed shuffle: The Shuffle/Sort phase groups partial products by output coordinate key across the cluster.",
          "Reducer summation: The Reduce phase sums grouped partial products to compute each final matrix element C[i][k] = Σ A[i][j] * B[j][k]."
        ],
        diagramTitle: "MapReduce Matrix Multiplication Dataflow",
        diagram: `  Matrix A(i,j) & B(j,k) ──► [ Mapper ] ──► Emits Key: (i,k), Value: (A, j, Val) or (B, j, Val)
                                      │
                                      ▼ [ Shuffle & Sort ]
                          Groups by Key (i, k)
                                      │
                                      ▼ [ Reducer ]
                          Calculates C[i][k] = Σ (A * B)`,
        complexities: [],
        tools: [
          { tool: "Hadoop MapReduce", purpose: "Distributed matrix computation", notes: "Java MapReduce jar job" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (MapReduce Matrix Multiplication)",
            code: `import java.io.IOException;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;

public class MatrixMultiply {
    public static class MatrixMapper extends Mapper<LongWritable, Text, Text, Text> {
        public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
            String[] tokens = value.toString().split(",");
            String matrix = tokens[0];
            int i = Integer.parseInt(tokens[1]);
            int j = Integer.parseInt(tokens[2]);
            double val = Double.parseDouble(tokens[3]);

            if (matrix.equals("A")) {
                // Emit for all columns k of B
                for (int k = 0; k < 2; k++) {
                    context.write(new Text(i + "," + k), new Text("A," + j + "," + val));
                }
            } else {
                // Emit for all rows i of A
                for (int i_idx = 0; i_idx < 2; i_idx++) {
                    context.write(new Text(i_idx + "," + j), new Text("B," + i + "," + val));
                }
            }
        }
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Matrix Multiplication using MapReduce in Hadoop",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/matrix-multiplication-using-mapreduce-in-hadoop/",
            platform: "GeeksforGeeks",
            topicTag: "MapReduce"
          }
        ]
      },
      {
        id: "bda-mapreduce-word-count",
        slug: "word-count-mapreduce-paradigm",
        title: "Exp 4: Run a Basic Word Count MapReduce Program to Understand the MapReduce Paradigm",
        categoryId: "bda-mapreduce-programming",
        categoryName: "2. MapReduce Programming",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Hadoop MapReduce WordCount example Java tutorial",
        gfgUrl: "https://www.geeksforgeeks.org/hadoop-word-count-example/",
        quickSummary: "Implement the canonical Word Count job to learn the Map-Shuffle-Reduce execution model end-to-end.",
        keyPoints: [
          "Mapper tokenization: The Mapper tokenizes each input line and emits (word, 1) key-value pairs.",
          "Shuffle & sort aggregation: The framework shuffles and groups all counts by identical key (word) across worker nodes.",
          "Reducer tally: The Reducer sums the counts per word to produce final frequency output."
        ],
        diagramTitle: "Canonical Word Count Execution Flow",
        diagram: `  "Hello Big Data Hello" ──► [ Mapper ] ──► (Hello, 1), (Big, 1), (Data, 1), (Hello, 1)
                                    │
                                    ▼ [ Shuffle / Group ]
                           "Hello" ──► [1, 1] | "Big" ──► [1] | "Data" ──► [1]
                                    │
                                    ▼ [ Reducer ]
                           (Hello: 2), (Big: 1), (Data: 1)`,
        complexities: [],
        tools: [
          { tool: "Hadoop MapReduce", purpose: "Canonical Map-Shuffle-Reduce example", notes: "Java MapReduce jar execution" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (WordCount MapReduce)",
            code: `import java.io.IOException;
import java.util.StringTokenizer;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;

public class WordCount {
    public static class TokenizerMapper extends Mapper<Object, Text, Text, IntWritable> {
        private final static IntWritable one = new IntWritable(1);
        private Text word = new Text();

        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
            StringTokenizer itr = new StringTokenizer(value.toString());
            while (itr.hasMoreTokens()) {
                word.set(itr.nextToken().toLowerCase().replaceAll("[^a-zA-Z]", ""));
                if (word.getLength() > 0) {
                    context.write(word, one);
                }
            }
        }
    }

    public static class IntSumReducer extends Reducer<Text, IntWritable, Text, IntWritable> {
        private IntWritable result = new IntWritable();

        public void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
            int sum = 0;
            for (IntWritable val : values) sum += val.get();
            result.set(sum);
            context.write(key, result);
        }
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Hadoop Word Count Example",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/hadoop-word-count-example/",
            platform: "GeeksforGeeks",
            topicTag: "MapReduce"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 3: HADOOP ECOSYSTEM TOOLS (0/3)
  // ========================================================
  {
    id: "bda-ecosystem-tools",
    name: "3. Hadoop Ecosystem Tools",
    shortDesc: "Apache Hive SQL querying, HBase NoSQL wide-column store with Thrift, and database ETL import/export.",
    iconName: "Network",
    topics: [
      {
        id: "bda-hive-installation-queries",
        slug: "installation-hive-practice-examples",
        title: "Exp 5: Installation of Hive Along with Practice Examples",
        categoryId: "bda-ecosystem-tools",
        categoryName: "3. Hadoop Ecosystem Tools",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Apache Hive installation HiveQL HDFS queries external tables",
        gfgUrl: "https://www.geeksforgeeks.org/introduction-to-apache-hive/",
        quickSummary: "Install Apache Hive on top of Hadoop and run SQL-like queries (HiveQL) against data stored in HDFS.",
        keyPoints: [
          "SQL-like abstraction: Hive provides a SQL-like abstraction (HiveQL) over structured data stored in HDFS.",
          "Query translation engine: Hive queries are compiled into MapReduce or Tez execution jobs under the hood.",
          "Managed vs External tables: Tables can be internal (managed) or external, affecting whether dropping a table removes the underlying HDFS data."
        ],
        diagramTitle: "Apache Hive Architecture & Metastore",
        diagram: `  [ User HiveQL: SELECT * FROM sales ]
                    │
                    ▼ [ Hive Metastore (MySQL/Derby) ] ──► Table Schema Mapping
                    │
                    ▼ [ Query Compiler & Planner ]
                    │
                    ▼ [ MapReduce / Tez Job Execution ] ──► Scans HDFS Data Files`,
        complexities: [],
        tools: [
          { tool: "Apache Hive", purpose: "SQL-on-Hadoop distributed querying", notes: "Requires Hadoop cluster active" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "HiveQL (Hive DDL & Queries)",
            code: `-- 1. Create External Table on HDFS dataset
CREATE EXTERNAL TABLE IF NOT EXISTS CustomerTransactions (
    txn_id INT,
    customer_id INT,
    amount DOUBLE,
    city STRING
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
STORED AS TEXTFILE
LOCATION '/user/aids/datasets/transactions/';

-- 2. Run Aggregation Query (Compiled to MapReduce)
SELECT city, COUNT(*) AS txn_count, SUM(amount) AS total_revenue
FROM CustomerTransactions
GROUP BY city
HAVING total_revenue > 10000;`
          }
        ],
        practiceProblems: [
          {
            title: "Introduction to Apache Hive",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/introduction-to-apache-hive/",
            platform: "GeeksforGeeks",
            topicTag: "Hive"
          }
        ]
      },
      {
        id: "bda-hbase-thrift-crud",
        slug: "installation-hbase-thrift-practice-examples",
        title: "Exp 6: Installation of HBase, Installing Thrift Along with Practice Examples",
        categoryId: "bda-ecosystem-tools",
        categoryName: "3. Hadoop Ecosystem Tools",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Apache HBase installation Thrift client CRUD column family",
        gfgUrl: "https://www.geeksforgeeks.org/introduction-to-apache-hbase/",
        quickSummary: "Install HBase (a NoSQL column-family store on HDFS) and Thrift for cross-language access, then practice basic CRUD operations.",
        keyPoints: [
          "Column-family NoSQL schema: HBase stores data in column families within regions, suited for sparse, wide-table, real-time read/write workloads.",
          "Cluster coordination: Relies on HDFS for underlying distributed storage and ZooKeeper for distributed master election and region coordination.",
          "Thrift cross-language RPC: Thrift provides a cross-language RPC interface for external Python, C++, and Java clients to perform CRUD operations."
        ],
        diagramTitle: "HBase Architecture with ZooKeeper & Thrift Gateway",
        diagram: `  [ Python Client ] ──► [ Thrift Server (RPC) ]
                                    │
                                    ▼
       [ ZooKeeper (Leader) ] ◄──► [ HMaster ]
                                    │
                                    ▼
            [ HRegionServer ] ──► [ HDFS Storage (HFiles) ]`,
        complexities: [],
        tools: [
          { tool: "HBase", purpose: "NoSQL distributed wide-column store", notes: "Real-time random read/write" },
          { tool: "Thrift", purpose: "Cross-language RPC client access", notes: "Multi-language bindings" },
          { tool: "ZooKeeper", purpose: "Distributed coordination & master election", notes: "Required for quorum" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "HBase Shell (CRUD Operations)",
            code: `# 1. Start HBase Daemons
start-hbase.sh

# 2. Launch HBase Shell
hbase shell

# 3. Create Table with Column Families
create 'students', 'personal_data', 'academic_data'

# 4. Insert (Put) Record into Column Family
put 'students', '922521101', 'personal_data:name', 'Rohith E'
put 'students', '922521101', 'academic_data:dept', 'AIDS'
put 'students', '922521101', 'academic_data:cgpa', '9.4'

# 5. Get Record by RowKey
get 'students', '922521101'

# 6. Scan Table
scan 'students'`
          }
        ],
        practiceProblems: [
          {
            title: "Introduction to Apache HBase",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/introduction-to-apache-hbase/",
            platform: "GeeksforGeeks",
            topicTag: "HBase"
          }
        ]
      },
      {
        id: "bda-database-import-export",
        slug: "importing-exporting-data-databases-hadoop",
        title: "Exp 7: Practice Importing and Exporting Data from Various Databases",
        categoryId: "bda-ecosystem-tools",
        categoryName: "3. Hadoop Ecosystem Tools",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Apache Sqoop import export MySQL HDFS Hive JDBC ETL",
        gfgUrl: "https://www.geeksforgeeks.org/apache-sqoop-introduction/",
        quickSummary: "Move data between relational databases and the Hadoop ecosystem (HDFS/Hive) using an ETL/import-export tool.",
        keyPoints: [
          "Relational-to-Hadoop ingress: Import operations pull relational table data into HDFS/Hive partitions for large-scale parallel processing.",
          "Hadoop-to-RDBMS export: Export operations push processed HDFS/Hive summary results back into relational databases for operational reporting.",
          "Connection & schema mapping: Connection parameters (JDBC URL, credentials) and mapping between source and target schemas must be configured correctly."
        ],
        diagramTitle: "Bi-Directional ETL Transfer Pipeline (RDBMS <-> Hadoop)",
        diagram: `  [ MySQL / PostgreSQL (OLTP) ] 
                 │
                 ├── Import Job ──► [ HDFS / Apache Hive (Big Data Analytics) ]
                 │
                 └── Export Job ◄── [ Processed Analytics Results ]`,
        complexities: [],
        tools: [
          { tool: "Sqoop (or equivalent ETL tool)", purpose: "RDBMS <-> Hadoop bulk data transfer", notes: "JDBC driver required" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Bash (Sqoop Import & Export)",
            code: `# 1. Import Entire Relational Table into HDFS
sqoop import \\
    --connect jdbc:mysql://localhost:3306/college_db \\
    --username root \\
    --password secret \\
    --table students \\
    --target-dir /user/aids/students_imported \\
    --m 1

# 2. Import Directly into an Apache Hive Table
sqoop import \\
    --connect jdbc:mysql://localhost:3306/college_db \\
    --username root \\
    --password secret \\
    --table courses \\
    --hive-import \\
    --create-hive-table \\
    --hive-table default.courses_hive

# 3. Export Processed Analytics Back to MySQL
sqoop export \\
    --connect jdbc:mysql://localhost:3306/college_db \\
    --username root \\
    --password secret \\
    --table student_summary_report \\
    --export-dir /user/aids/output_summary/`
          }
        ],
        practiceProblems: [
          {
            title: "Apache Sqoop Introduction & Architecture",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/apache-sqoop-introduction/",
            platform: "GeeksforGeeks",
            topicTag: "Sqoop"
          }
        ]
      }
    ]
  }
];
