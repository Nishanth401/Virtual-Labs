import { Experiment } from "../experiments";

export const BDA_EXPERIMENTS: Experiment[] = [
  {
    "id": "bda-exp-1",
    "labId": "big-data-analytics",
    "title": "Exp 1: Downloading and Installing Hadoop: Understanding Different",
    "slug": "bda-exp-1-downloading-and-installing-hadoop-understanding-different",
    "difficulty": "Beginner",
    "category": "Big Data Analytics",
    "estimatedMinutes": 35,
    "rating": 4.92,
    "ratingsCount": 146,
    "simulator": "custom",
    "quizId": "quiz-bda-1",
    "sections": {
      "introduction": "Downloading and installing Hadoop, Understand different Hadoop modes, Startup\rscripts, and Configuration files.",
      "objective": "Downloading and installing Hadoop, Understand different Hadoop modes, Startup\rscripts, and Configuration files.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      "videoTitle": "Big Data Analytics: Downloading and Installing Hadoop: Understanding Different",
      "videoChannel": "Big Data Engineering & Apache Hadoop",
      "prerequisites": [
        "Linux Commands",
        "Java Basics",
        "Distributed Systems"
      ],
      "theory": {
        "overview": "This experiment investigates Downloading and Installing Hadoop: Understanding Different as outlined in the V.S.B. Engineering College Big Data Analytics syllabus. Students learn distributed file system mechanics, MapReduce parallel execution paradigms, and NoSQL big data ingestion pipelines.",
        "keyConcepts": [
          {
            "title": "Distributed File Systems (HDFS)",
            "desc": "Replicated block storage across multi-node commodity servers."
          },
          {
            "title": "MapReduce Computation",
            "desc": "Parallel map and reduce transformations over partitioned data splits."
          },
          {
            "title": "Data Warehouse Abstraction",
            "desc": "Executing analytical queries on Petabyte-scale data lakes."
          }
        ],
        "complexities": [
          {
            "operation": "Parallel Map Phase",
            "best": "O(n/p)",
            "avg": "O(n/p)",
            "worst": "O(n/p)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Global search engine web crawling and indexing pipelines",
          "Financial fraud transaction monitoring over streaming big data",
          "Telecom user telemetry and petabyte log aggregation"
        ]
      },
      "procedure": [
        "1. Start the Hadoop / HDFS distributed cluster daemons.",
        "2. Verify NameNode and DataNode connectivity via jps.",
        "3. Formulate the MapReduce job or shell management commands.",
        "4. Run execution across partitioned input datasets.",
        "5. Inspect distributed output directories and verify performance metrics."
      ],
      "sampleCode": {
        "language": "bash",
        "code": "# Hadoop Installation and Mode Verification\nexport JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64\nexport HADOOP_HOME=/opt/hadoop\n\n# Start HDFS and YARN daemons\nstart-dfs.sh\nstart-yarn.sh\njps"
      },
      "expectedOutput": "Distributed task completed successfully.\nCluster job finished with 0 errors.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd/4th Year"
        ],
        "pg": [
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "bda-exp-2",
    "labId": "big-data-analytics",
    "title": "Exp 2: Hadoop Implementation of file management tasks, such as Adding",
    "slug": "bda-exp-2-hadoop-implementation-of-file-management-tasks-such-as-adding",
    "difficulty": "Beginner",
    "category": "Big Data Analytics",
    "estimatedMinutes": 35,
    "rating": 4.92,
    "ratingsCount": 152,
    "simulator": "custom",
    "quizId": "quiz-bda-2",
    "sections": {
      "introduction": "To implement the following file management tasks in Hadoop:\r Gain hands-on experience with file management tasks in Hadoop using the Hadoop\rDistributed File System (HDFS)\r Learn how to add files and directories, retrieve files, and delete files in HDFS.\rBackground Information:\rHadoop is a powerful framework for the distributed processing of large datasets. The Hadoop\rDistributed File System (HDFS) is a key component of Hadoop that provides reliable and scalable\rstorage for big data. Understanding file management in HDFS is crucial for effective data\rprocessing and analysis in Hadoop.",
      "objective": "To implement the following file management tasks in Hadoop:\r Gain hands-on experience with file management tasks in Hadoop using the Hadoop\rDistributed File System (HDFS)\r Learn how to add files and directories, retrieve files, and delete files in HDFS.\rBackground Information:\rHadoop is a powerful framework for the distributed processing of large datasets. The Hadoop\rDistributed File System (HDFS) is a key component of Hadoop that provides reliable and scalable\rstorage for big data. Understanding file management in HDFS is crucial for effective data\rprocessing and analysis in Hadoop.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      "videoTitle": "Big Data Analytics: Hadoop Implementation of file management tasks, such as Adding",
      "videoChannel": "Big Data Engineering & Apache Hadoop",
      "prerequisites": [
        "Linux Commands",
        "Java Basics",
        "Distributed Systems"
      ],
      "theory": {
        "overview": "This experiment investigates Hadoop Implementation of file management tasks, such as Adding as outlined in the V.S.B. Engineering College Big Data Analytics syllabus. Students learn distributed file system mechanics, MapReduce parallel execution paradigms, and NoSQL big data ingestion pipelines.",
        "keyConcepts": [
          {
            "title": "Distributed File Systems (HDFS)",
            "desc": "Replicated block storage across multi-node commodity servers."
          },
          {
            "title": "MapReduce Computation",
            "desc": "Parallel map and reduce transformations over partitioned data splits."
          },
          {
            "title": "Data Warehouse Abstraction",
            "desc": "Executing analytical queries on Petabyte-scale data lakes."
          }
        ],
        "complexities": [
          {
            "operation": "Parallel Map Phase",
            "best": "O(n/p)",
            "avg": "O(n/p)",
            "worst": "O(n/p)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Global search engine web crawling and indexing pipelines",
          "Financial fraud transaction monitoring over streaming big data",
          "Telecom user telemetry and petabyte log aggregation"
        ]
      },
      "procedure": [
        "1. Start the Hadoop / HDFS distributed cluster daemons.",
        "2. Verify NameNode and DataNode connectivity via jps.",
        "3. Formulate the MapReduce job or shell management commands.",
        "4. Run execution across partitioned input datasets.",
        "5. Inspect distributed output directories and verify performance metrics."
      ],
      "sampleCode": {
        "language": "bash",
        "code": "# HDFS File Management Shell Tasks\nhdfs dfs -mkdir -p /user/hadoop/data\nhdfs dfs -put sample.txt /user/hadoop/data/\nhdfs dfs -ls /user/hadoop/data/\nhdfs dfs -cat /user/hadoop/data/sample.txt\nhdfs dfs -rm -r /user/hadoop/data/sample.txt"
      },
      "expectedOutput": "Distributed task completed successfully.\nCluster job finished with 0 errors.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd/4th Year"
        ],
        "pg": [
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "bda-exp-3",
    "labId": "big-data-analytics",
    "title": "Exp 3: Implement of Matrix Multiplication with Hadoop MapReduce",
    "slug": "bda-exp-3-implement-of-matrix-multiplication-with-hadoop-mapreduce",
    "difficulty": "Beginner",
    "category": "Big Data Analytics",
    "estimatedMinutes": 35,
    "rating": 4.92,
    "ratingsCount": 158,
    "simulator": "custom",
    "quizId": "quiz-bda-3",
    "sections": {
      "introduction": "Implement matrix multiplication using Hadoop MapReduce to understand the distributed\rprocessing capabilities of Hadoop.",
      "objective": "Implement matrix multiplication using Hadoop MapReduce to understand the distributed\rprocessing capabilities of Hadoop.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      "videoTitle": "Big Data Analytics: Implement of Matrix Multiplication with Hadoop MapReduce",
      "videoChannel": "Big Data Engineering & Apache Hadoop",
      "prerequisites": [
        "Linux Commands",
        "Java Basics",
        "Distributed Systems"
      ],
      "theory": {
        "overview": "This experiment investigates Implement of Matrix Multiplication with Hadoop MapReduce as outlined in the V.S.B. Engineering College Big Data Analytics syllabus. Students learn distributed file system mechanics, MapReduce parallel execution paradigms, and NoSQL big data ingestion pipelines.",
        "keyConcepts": [
          {
            "title": "Distributed File Systems (HDFS)",
            "desc": "Replicated block storage across multi-node commodity servers."
          },
          {
            "title": "MapReduce Computation",
            "desc": "Parallel map and reduce transformations over partitioned data splits."
          },
          {
            "title": "Data Warehouse Abstraction",
            "desc": "Executing analytical queries on Petabyte-scale data lakes."
          }
        ],
        "complexities": [
          {
            "operation": "Parallel Map Phase",
            "best": "O(n/p)",
            "avg": "O(n/p)",
            "worst": "O(n/p)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Global search engine web crawling and indexing pipelines",
          "Financial fraud transaction monitoring over streaming big data",
          "Telecom user telemetry and petabyte log aggregation"
        ]
      },
      "procedure": [
        "1. Start the Hadoop / HDFS distributed cluster daemons.",
        "2. Verify NameNode and DataNode connectivity via jps.",
        "3. Formulate the MapReduce job or shell management commands.",
        "4. Run execution across partitioned input datasets.",
        "5. Inspect distributed output directories and verify performance metrics."
      ],
      "sampleCode": {
        "language": "bash",
        "code": "// MapReduce Matrix Multiplication Driver\nimport org.apache.hadoop.conf.Configuration;\nimport org.apache.hadoop.fs.Path;\nimport org.apache.hadoop.io.*;\nimport org.apache.hadoop.mapreduce.*;\n\npublic class MatrixMultiply {\n    // Mapper and Reducer implementation for matrix block dot products\n}"
      },
      "expectedOutput": "Distributed task completed successfully.\nCluster job finished with 0 errors.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd/4th Year"
        ],
        "pg": [
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "bda-exp-4",
    "labId": "big-data-analytics",
    "title": "Exp 4: Run a basic Word Count MapReduce program to understand",
    "slug": "bda-exp-4-run-a-basic-word-count-mapreduce-program-to-understand",
    "difficulty": "Intermediate",
    "category": "Big Data Analytics",
    "estimatedMinutes": 35,
    "rating": 4.92,
    "ratingsCount": 164,
    "simulator": "custom",
    "quizId": "quiz-bda-4",
    "sections": {
      "introduction": "Implement Big Data distributed tasks for Run a basic Word Count MapReduce program to understand.",
      "objective": "Implement Big Data distributed tasks for Run a basic Word Count MapReduce program to understand.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      "videoTitle": "Big Data Analytics: Run a basic Word Count MapReduce program to understand",
      "videoChannel": "Big Data Engineering & Apache Hadoop",
      "prerequisites": [
        "Linux Commands",
        "Java Basics",
        "Distributed Systems"
      ],
      "theory": {
        "overview": "This experiment investigates Run a basic Word Count MapReduce program to understand as outlined in the V.S.B. Engineering College Big Data Analytics syllabus. Students learn distributed file system mechanics, MapReduce parallel execution paradigms, and NoSQL big data ingestion pipelines.",
        "keyConcepts": [
          {
            "title": "Distributed File Systems (HDFS)",
            "desc": "Replicated block storage across multi-node commodity servers."
          },
          {
            "title": "MapReduce Computation",
            "desc": "Parallel map and reduce transformations over partitioned data splits."
          },
          {
            "title": "Data Warehouse Abstraction",
            "desc": "Executing analytical queries on Petabyte-scale data lakes."
          }
        ],
        "complexities": [
          {
            "operation": "Parallel Map Phase",
            "best": "O(n/p)",
            "avg": "O(n/p)",
            "worst": "O(n/p)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Global search engine web crawling and indexing pipelines",
          "Financial fraud transaction monitoring over streaming big data",
          "Telecom user telemetry and petabyte log aggregation"
        ]
      },
      "procedure": [
        "1. Start the Hadoop / HDFS distributed cluster daemons.",
        "2. Verify NameNode and DataNode connectivity via jps.",
        "3. Formulate the MapReduce job or shell management commands.",
        "4. Run execution across partitioned input datasets.",
        "5. Inspect distributed output directories and verify performance metrics."
      ],
      "sampleCode": {
        "language": "bash",
        "code": "// Hadoop WordCount MapReduce\nimport org.apache.hadoop.io.*;\nimport org.apache.hadoop.mapreduce.*;\nimport java.io.IOException;\n\npublic class WordCount {\n    public static class TokenizerMapper extends Mapper<Object, Text, Text, IntWritable>{\n        private final static IntWritable one = new IntWritable(1);\n        private Text word = new Text();\n        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {\n            for (String token : value.toString().split(\"\\\\s+\")) {\n                word.set(token);\n                context.write(word, one);\n            }\n        }\n    }\n}"
      },
      "expectedOutput": "Distributed task completed successfully.\nCluster job finished with 0 errors.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd/4th Year"
        ],
        "pg": [
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "bda-exp-5",
    "labId": "big-data-analytics",
    "title": "Exp 5: Installation of Hive along with practice examples",
    "slug": "bda-exp-5-installation-of-hive-along-with-practice-examples",
    "difficulty": "Intermediate",
    "category": "Big Data Analytics",
    "estimatedMinutes": 35,
    "rating": 4.92,
    "ratingsCount": 170,
    "simulator": "custom",
    "quizId": "quiz-bda-5",
    "sections": {
      "introduction": "To Install Apache Hive on a Hadoop cluster or standalone setup, document the process\rWith screenshots and configurations, and perform practical examples show casing HiveQL queries\rfor data management and analysis.\rSteps for hive installation\r• Download and Unzip Hive\r• Edit the. Bash rc file\r• Edit hive-config.sh file\r• Create Hive directories in HDFS\r• Initiate Derby database\r• Configure hive-site.xml file",
      "objective": "To Install Apache Hive on a Hadoop cluster or standalone setup, document the process\rWith screenshots and configurations, and perform practical examples show casing HiveQL queries\rfor data management and analysis.\rSteps for hive installation\r• Download and Unzip Hive\r• Edit the. Bash rc file\r• Edit hive-config.sh file\r• Create Hive directories in HDFS\r• Initiate Derby database\r• Configure hive-site.xml file",
      "videoUrl": "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      "videoTitle": "Big Data Analytics: Installation of Hive along with practice examples",
      "videoChannel": "Big Data Engineering & Apache Hadoop",
      "prerequisites": [
        "Linux Commands",
        "Java Basics",
        "Distributed Systems"
      ],
      "theory": {
        "overview": "This experiment investigates Installation of Hive along with practice examples as outlined in the V.S.B. Engineering College Big Data Analytics syllabus. Students learn distributed file system mechanics, MapReduce parallel execution paradigms, and NoSQL big data ingestion pipelines.",
        "keyConcepts": [
          {
            "title": "Distributed File Systems (HDFS)",
            "desc": "Replicated block storage across multi-node commodity servers."
          },
          {
            "title": "MapReduce Computation",
            "desc": "Parallel map and reduce transformations over partitioned data splits."
          },
          {
            "title": "Data Warehouse Abstraction",
            "desc": "Executing analytical queries on Petabyte-scale data lakes."
          }
        ],
        "complexities": [
          {
            "operation": "Parallel Map Phase",
            "best": "O(n/p)",
            "avg": "O(n/p)",
            "worst": "O(n/p)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Global search engine web crawling and indexing pipelines",
          "Financial fraud transaction monitoring over streaming big data",
          "Telecom user telemetry and petabyte log aggregation"
        ]
      },
      "procedure": [
        "1. Start the Hadoop / HDFS distributed cluster daemons.",
        "2. Verify NameNode and DataNode connectivity via jps.",
        "3. Formulate the MapReduce job or shell management commands.",
        "4. Run execution across partitioned input datasets.",
        "5. Inspect distributed output directories and verify performance metrics."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Apache Hive Data Analysis & HiveQL\nCREATE DATABASE IF NOT EXISTS retail_bda;\nUSE retail_bda;\n\nCREATE TABLE IF NOT EXISTS customer_logs (\n    user_id INT,\n    action STRING,\n    timestamp BIGINT\n) ROW FORMAT DELIMITED FIELDS TERMINATED BY ',';\n\nSELECT action, COUNT(*) as frequency FROM customer_logs GROUP BY action;"
      },
      "expectedOutput": "Distributed task completed successfully.\nCluster job finished with 0 errors.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd/4th Year"
        ],
        "pg": [
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "bda-exp-6",
    "labId": "big-data-analytics",
    "title": "Exp 6: Installation of HBase, Installing thrift along with Practice",
    "slug": "bda-exp-6-installation-of-hbase-installing-thrift-along-with-practice",
    "difficulty": "Advanced",
    "category": "Big Data Analytics",
    "estimatedMinutes": 35,
    "rating": 4.92,
    "ratingsCount": 176,
    "simulator": "custom",
    "quizId": "quiz-bda-6",
    "sections": {
      "introduction": "To Install HBase on Ubuntu18.04 HBase in a Standalone Mod",
      "objective": "To Install HBase on Ubuntu18.04 HBase in a Standalone Mod",
      "videoUrl": "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      "videoTitle": "Big Data Analytics: Installation of HBase, Installing thrift along with Practice",
      "videoChannel": "Big Data Engineering & Apache Hadoop",
      "prerequisites": [
        "Linux Commands",
        "Java Basics",
        "Distributed Systems"
      ],
      "theory": {
        "overview": "This experiment investigates Installation of HBase, Installing thrift along with Practice as outlined in the V.S.B. Engineering College Big Data Analytics syllabus. Students learn distributed file system mechanics, MapReduce parallel execution paradigms, and NoSQL big data ingestion pipelines.",
        "keyConcepts": [
          {
            "title": "Distributed File Systems (HDFS)",
            "desc": "Replicated block storage across multi-node commodity servers."
          },
          {
            "title": "MapReduce Computation",
            "desc": "Parallel map and reduce transformations over partitioned data splits."
          },
          {
            "title": "Data Warehouse Abstraction",
            "desc": "Executing analytical queries on Petabyte-scale data lakes."
          }
        ],
        "complexities": [
          {
            "operation": "Parallel Map Phase",
            "best": "O(n/p)",
            "avg": "O(n/p)",
            "worst": "O(n/p)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Global search engine web crawling and indexing pipelines",
          "Financial fraud transaction monitoring over streaming big data",
          "Telecom user telemetry and petabyte log aggregation"
        ]
      },
      "procedure": [
        "1. Start the Hadoop / HDFS distributed cluster daemons.",
        "2. Verify NameNode and DataNode connectivity via jps.",
        "3. Formulate the MapReduce job or shell management commands.",
        "4. Run execution across partitioned input datasets.",
        "5. Inspect distributed output directories and verify performance metrics."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "# HBase Shell and Thrift Connection\nhbase shell\ncreate 'student_records', 'personal', 'academic'\nput 'student_records', 'row1', 'personal:name', 'Rohith'\nput 'student_records', 'row1', 'academic:cgpa', '9.2'\nscan 'student_records'"
      },
      "expectedOutput": "Distributed task completed successfully.\nCluster job finished with 0 errors.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd/4th Year"
        ],
        "pg": [
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "bda-exp-7",
    "labId": "big-data-analytics",
    "title": "Exp 7: Practice importing and exporting data from various databases.",
    "slug": "bda-exp-7-practice-importing-and-exporting-data-from-various-databases",
    "difficulty": "Advanced",
    "category": "Big Data Analytics",
    "estimatedMinutes": 35,
    "rating": 4.92,
    "ratingsCount": 182,
    "simulator": "custom",
    "quizId": "quiz-bda-7",
    "sections": {
      "introduction": "To import or export, the order of columns in MySQL and Hive",
      "objective": "To import or export, the order of columns in MySQL and Hive",
      "videoUrl": "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      "videoTitle": "Big Data Analytics: Practice importing and exporting data from various databases.",
      "videoChannel": "Big Data Engineering & Apache Hadoop",
      "prerequisites": [
        "Linux Commands",
        "Java Basics",
        "Distributed Systems"
      ],
      "theory": {
        "overview": "This experiment investigates Practice importing and exporting data from various databases. as outlined in the V.S.B. Engineering College Big Data Analytics syllabus. Students learn distributed file system mechanics, MapReduce parallel execution paradigms, and NoSQL big data ingestion pipelines.",
        "keyConcepts": [
          {
            "title": "Distributed File Systems (HDFS)",
            "desc": "Replicated block storage across multi-node commodity servers."
          },
          {
            "title": "MapReduce Computation",
            "desc": "Parallel map and reduce transformations over partitioned data splits."
          },
          {
            "title": "Data Warehouse Abstraction",
            "desc": "Executing analytical queries on Petabyte-scale data lakes."
          }
        ],
        "complexities": [
          {
            "operation": "Parallel Map Phase",
            "best": "O(n/p)",
            "avg": "O(n/p)",
            "worst": "O(n/p)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Global search engine web crawling and indexing pipelines",
          "Financial fraud transaction monitoring over streaming big data",
          "Telecom user telemetry and petabyte log aggregation"
        ]
      },
      "procedure": [
        "1. Start the Hadoop / HDFS distributed cluster daemons.",
        "2. Verify NameNode and DataNode connectivity via jps.",
        "3. Formulate the MapReduce job or shell management commands.",
        "4. Run execution across partitioned input datasets.",
        "5. Inspect distributed output directories and verify performance metrics."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "# Database Ingestion between MySQL and Hive/HDFS\nsqoop import \\\n  --connect jdbc:mysql://localhost:3306/college \\\n  --username root --password password \\\n  --table student_master \\\n  --target-dir /user/hive/warehouse/student_master"
      },
      "expectedOutput": "Distributed task completed successfully.\nCluster job finished with 0 errors.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd/4th Year"
        ],
        "pg": [
          "M.Tech Data Science"
        ]
      }
    }
  }
];
