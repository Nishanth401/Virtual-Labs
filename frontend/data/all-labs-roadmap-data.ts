import { DSACategory } from "./dsa-topic-data";
import { DATA_SCIENCE_ROADMAP_CATEGORIES } from "./roadmaps/data-science-roadmap";
import { NETWORKS_ROADMAP_CATEGORIES } from "./roadmaps/networks-roadmap";
import { ML_ROADMAP_CATEGORIES } from "./roadmaps/ml-lab-roadmap";
import { OS_ROADMAP_CATEGORIES } from "./roadmaps/os-lab-roadmap";
import { OOPS_JAVA_ROADMAP_CATEGORIES } from "./roadmaps/oops-java-roadmap";
import { DSA_LAB_ROADMAP_CATEGORIES } from "./roadmaps/dsa-lab-roadmap";
import { DBMS_LAB_ROADMAP_CATEGORIES } from "./roadmaps/dbms-lab-roadmap";
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
  // 3. MACHINE LEARNING LABORATORY (9 EXPERIMENTS)
  // ==========================================
  "ai-machine-learning": {
    title: "Machine Learning Laboratory Roadmap",
    badge: "9 Core Experiments • ID3 / ANN / Bayes / EM vs k-Means / LWR",
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
  // 5. OBJECT ORIENTED PROGRAMMING SYSTEM (JAVA) (15 EXPERIMENTS)
  // ==========================================
  "oops-java": {
    title: "OOPS Java Laboratory Roadmap",
    badge: "15 Core Experiments • Classes / Inheritance / Matrix / Collections / JDBC",
    categories: OOPS_JAVA_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 6. DATA STRUCTURES AND ALGORITHMS LABORATORY (15 EXPERIMENTS)
  // ==========================================
  "data-structures": {
    title: "DSA Laboratory Complete Curriculum",
    badge: "15 Core Experiments • Linked Lists / Stacks / Trees / Graphs / Sorting",
    categories: DSA_LAB_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 7. DATABASE MANAGEMENT SYSTEM (10 EXPERIMENTS)
  // ==========================================
  "dbms-lab": {
    title: "Database Management System Roadmap",
    badge: "10 Core Experiments • DDL/DML / Joins / PL/SQL / Triggers / ACID TCL",
    categories: DBMS_LAB_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 8. ARTIFICIAL INTELLIGENCE LAB
  // ==========================================
  "artificial-intelligence": {
    title: "Artificial Intelligence Roadmap",
    badge: "Python / Search / Heuristics / Knowledge Systems",
    categories: AI_LAB_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 9. BIG DATA ANALYTICS LAB
  // ==========================================
  "big-data-analytics": {
    title: "Big Data Analytics Roadmap",
    badge: "Hadoop / HDFS / PySpark / NoSQL / MapReduce",
    categories: BIGDATA_ROADMAP_CATEGORIES,
  },

  // ==========================================
  // 10. CLOUD SERVICE MANAGEMENT LAB
  // ==========================================
  "cloud-service-management": {
    title: "Cloud Service Management Roadmap",
    badge: "AWS / Docker / Kubernetes / Serverless / Terraform",
    categories: CLOUD_ROADMAP_CATEGORIES,
  },
};
