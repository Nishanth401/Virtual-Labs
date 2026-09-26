import { DSACategory } from "./dsa-topic-data";
import { DATA_SCIENCE_ROADMAP_CATEGORIES } from "./roadmaps/data-science-roadmap";
import { NETWORKS_ROADMAP_CATEGORIES } from "./roadmaps/networks-roadmap";
import { ML_ROADMAP_CATEGORIES } from "./roadmaps/ml-lab-roadmap";
import { OS_ROADMAP_CATEGORIES } from "./roadmaps/os-lab-roadmap";
import { OOPS_JAVA_ROADMAP_CATEGORIES } from "./roadmaps/oops-java-roadmap";
import { DSA_LAB_ROADMAP_CATEGORIES } from "./roadmaps/dsa-lab-roadmap";
import { DBMS_LAB_ROADMAP_CATEGORIES } from "./roadmaps/dbms-lab-roadmap";
import { C_PROGRAMMING_ROADMAP_CATEGORIES } from "./roadmaps/c-programming-roadmap";
import { PYTHON_PROGRAMMING_ROADMAP_CATEGORIES } from "./roadmaps/python-programming-roadmap";
import { AI_LAB_ROADMAP_CATEGORIES } from "./roadmaps/ai-lab-roadmap";
import { BIGDATA_ROADMAP_CATEGORIES } from "./roadmaps/bigdata-roadmap";
import { CLOUD_ROADMAP_CATEGORIES } from "./roadmaps/cloud-roadmap";

export const LAB_ROADMAPS_DATA: Record<string, { title: string; badge: string; categories: DSACategory[] }> = {
  // ==========================================
  // 1. DATA SCIENCE AND ANALYTICS LABORATORY (12 EXPERIMENTS)
  // ==========================================
  "data-science-analytics": {
    title: "Data Science & Analytics Roadmap",
    badge: "12 Practical Experiments • NumPy / Pandas / Statistics / Time Series",
    categories: DATA_SCIENCE_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 2. COMPUTER NETWORKS LABORATORY (10 EXPERIMENTS)
  // ==========================================
  "computer-networks": {
    title: "Computer Networks Laboratory Roadmap",
    badge: "10 Core Experiments • tcpdump / Sockets / Routing / CRC",
    categories: NETWORKS_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 3. DEEP LEARNING LABORATORY (8 EXPERIMENTS)
  // ==========================================
  "ai-machine-learning": {
    title: "Deep Learning Laboratory Roadmap",
    badge: "8 Practical Experiments • XOR DNN / CNN Vision / RNN / LSTM / GANs",
    categories: ML_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 4. OPERATING SYSTEMS LABORATORY (15 EXPERIMENTS)
  // ==========================================
  "operating-systems": {
    title: "Operating Systems Laboratory Roadmap",
    badge: "15 Core Experiments • Scheduling / IPC / Banker's / Paging / Disk",
    categories: OS_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 5. OBJECT ORIENTED PROGRAMMING (15 EXPERIMENTS)
  // ==========================================
  "oops-java": {
    title: "Object Oriented Programming Laboratory Roadmap",
    badge: "15 Core Experiments • Classes / Encapsulation / Inheritance / Matrix / Collections / JDBC",
    categories: OOPS_JAVA_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 6. DATA STRUCTURES DESIGN LABORATORY (15 EXPERIMENTS)
  // ==========================================
  "data-structures": {
    title: "Data Structures Design Laboratory Roadmap",
    badge: "15 Core Experiments • Linked Lists / Stacks / Trees / Graphs / Sorting & Hashing",
    categories: DSA_LAB_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 7. DATABASE MANAGEMENT SYSTEMS (15 EXPERIMENTS)
  // ==========================================
  "dbms-lab": {
    title: "Database Management Systems Laboratory Roadmap",
    badge: "15 Core Experiments • ER Models / DDL & DML / Joins / Views & Indexes / PL/SQL / ACID",
    categories: DBMS_LAB_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 8. C PROGRAMMING LABORATORY (15 EXPERIMENTS)
  // ==========================================
  "c-programming": {
    title: "Programming in C Laboratory Roadmap",
    badge: "15 Practical Experiments • Procedural C / Pointers / Recursion / Memory / Structures / Files",
    categories: C_PROGRAMMING_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 9. PYTHON PROGRAMMING LABORATORY (10 EXPERIMENTS)
  // ==========================================
  "python-programming": {
    title: "Python Programming Laboratory Roadmap",
    badge: "10 Core Experiments • Slicing / Comprehensions / OOP / Exceptions / File I/O",
    categories: PYTHON_PROGRAMMING_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 10. ARTIFICIAL INTELLIGENCE LAB
  // ==========================================
  "artificial-intelligence": {
    title: "Artificial Intelligence Roadmap",
    badge: "Python / Search / Heuristics / Knowledge Systems",
    categories: AI_LAB_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 11. BIG DATA ANALYTICS LAB (7 EXPERIMENTS)
  // ==========================================
  "big-data-analytics": {
    title: "Big Data Analytics Laboratory Roadmap",
    badge: "7 Practical Experiments • Hadoop / HDFS / MapReduce / Hive / HBase / NoSQL",
    categories: BIGDATA_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 12. CLOUD SERVICE MANAGEMENT LAB (5 EXPERIMENTS)
  // ==========================================
  "cloud-service-management": {
    title: "Cloud Service Management Laboratory Roadmap",
    badge: "5 Practical Experiments • AWS Governance / TCO / Telemetry / Multi-Region / Migration",
    categories: CLOUD_ROADMAP_CATEGORIES,
  },
};
