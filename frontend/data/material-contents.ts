import { MaterialContent } from "./materials/types";
import { DSA_MATERIALS } from "./materials/dsa-materials";
import { DATA_SCIENCE_MATERIALS } from "./materials/data-science-materials";
import { NETWORKS_MATERIALS } from "./materials/networks-materials";
import { AI_ML_MATERIALS } from "./materials/ai-ml-materials";
import { OS_MATERIALS } from "./materials/os-materials";
import { JAVA_MATERIALS } from "./materials/java-materials";
import { DBMS_MATERIALS } from "./materials/dbms-materials";
import { PROGRAMMING_MATERIALS } from "./materials/programming-materials";
import { CLOUD_BIGDATA_MATERIALS } from "./materials/cloud-bigdata-materials";
import { getResourceId } from "./resources";

export type { MaterialContent };

export const MATERIAL_CONTENTS: Record<string, MaterialContent> = {
  ...DSA_MATERIALS,
  ...DATA_SCIENCE_MATERIALS,
  ...NETWORKS_MATERIALS,
  ...AI_ML_MATERIALS,
  ...OS_MATERIALS,
  ...JAVA_MATERIALS,
  ...DBMS_MATERIALS,
  ...PROGRAMMING_MATERIALS,
  ...CLOUD_BIGDATA_MATERIALS,
};

// Aliases for backwards compatibility with previous material IDs
MATERIAL_CONTENTS["os-handbook"] = MATERIAL_CONTENTS["os-scheduling-gfg"];
MATERIAL_CONTENTS["os-handbook-gfg"] = MATERIAL_CONTENTS["os-scheduling-gfg"];
MATERIAL_CONTENTS["ai-ml-guide"] = MATERIAL_CONTENTS["ml-neural-networks-gfg"];
MATERIAL_CONTENTS["ml-gfg-sklearn"] = MATERIAL_CONTENTS["ml-w3schools"];
MATERIAL_CONTENTS["ml-w3schools-numpy"] = MATERIAL_CONTENTS["data-science-numpy-gfg"];
MATERIAL_CONTENTS["ai-gfg-guide"] = MATERIAL_CONTENTS["ai-search-gfg"];
MATERIAL_CONTENTS["networks-guide"] = MATERIAL_CONTENTS["networks-architecture-gfg"];
MATERIAL_CONTENTS["networks-gfg-guide"] = MATERIAL_CONTENTS["networks-architecture-gfg"];
MATERIAL_CONTENTS["cloud-computing-guide"] = MATERIAL_CONTENTS["cloud-computing-gfg"];
MATERIAL_CONTENTS["cloud-gfg-guide"] = MATERIAL_CONTENTS["cloud-computing-gfg"];
MATERIAL_CONTENTS["java-oop-guide"] = MATERIAL_CONTENTS["java-oop-gfg"];
MATERIAL_CONTENTS["dsa-java-gfg"] = MATERIAL_CONTENTS["dsa-complete-guide"];
MATERIAL_CONTENTS["c-programming-gfg"] = MATERIAL_CONTENTS["c-programming-guide"];
MATERIAL_CONTENTS["bigdata-gfg-hadoop"] = MATERIAL_CONTENTS["big-data-hadoop-gfg"];
MATERIAL_CONTENTS["bigdata-w3schools-mongodb"] = MATERIAL_CONTENTS["big-data-mongodb-w3schools"];


/**
 * Helper to match any resource item to its corresponding rich in-app material
 */
export function getMaterialForResource(resource: {
  title?: string;
  subject?: string;
  provider?: string;
  id?: string;
  materialId?: string;
}): MaterialContent {
  // 1. Direct ID match
  if (resource.id && MATERIAL_CONTENTS[resource.id]) {
    return MATERIAL_CONTENTS[resource.id];
  }

  // 2. Direct materialId match
  if (resource.materialId && MATERIAL_CONTENTS[resource.materialId]) {
    return MATERIAL_CONTENTS[resource.materialId];
  }

  // 3. Slug match
  const slug = getResourceId(resource);
  if (slug && MATERIAL_CONTENTS[slug]) {
    return MATERIAL_CONTENTS[slug];
  }

  // 4. Keyword fuzzy match
  const t = (resource.title || "").toLowerCase();
  const s = (resource.subject || "").toLowerCase();
  const p = (resource.provider || "").toLowerCase();

  // Data Science
  if (t.includes("numpy") || t.includes("vectorized")) return MATERIAL_CONTENTS["data-science-numpy-gfg"];
  if (t.includes("pandas") || t.includes("data frame")) return MATERIAL_CONTENTS["data-science-pandas-gfg"];
  if (t.includes("hypothesis") || t.includes("z-test") || t.includes("t-test") || t.includes("anova")) return MATERIAL_CONTENTS["data-science-stats-gfg"];
  if (t.includes("matplotlib") || s.includes("data science") || s.includes("analytics")) {
    return p.includes("w3schools") ? MATERIAL_CONTENTS["data-science-w3schools"] : MATERIAL_CONTENTS["data-science-numpy-gfg"];
  }

  // Computer Networks
  if (t.includes("socket") || t.includes("tcp") || t.includes("udp")) return MATERIAL_CONTENTS["networks-sockets-gfg"];
  if (t.includes("routing") || t.includes("dijkstra") || t.includes("distance vector")) return MATERIAL_CONTENTS["networks-routing-gfg"];
  if (t.includes("subnet") || (p.includes("w3schools") && (s.includes("network") || t.includes("network")))) return MATERIAL_CONTENTS["networks-w3schools"];
  if (s.includes("network") || t.includes("network") || t.includes("protocol") || t.includes("osi")) return MATERIAL_CONTENTS["networks-architecture-gfg"];

  // Machine Learning & AI
  if (t.includes("decision tree") || t.includes("id3") || t.includes("entropy")) return MATERIAL_CONTENTS["ml-decision-trees-gfg"];
  if (t.includes("candidate elimination") || t.includes("find-s") || t.includes("version space")) return MATERIAL_CONTENTS["ml-foundations-gfg"];
  if (t.includes("neural") || t.includes("backpropagation") || t.includes("perceptron") || t.includes("deep learning")) return MATERIAL_CONTENTS["ml-neural-networks-gfg"];
  if (t.includes("scikit") || (p.includes("w3schools") && (s.includes("machine learning") || t.includes("machine learning")))) return MATERIAL_CONTENTS["ml-w3schools"];
  if (t.includes("a*") || t.includes("8-puzzle") || t.includes("heuristic")) return MATERIAL_CONTENTS["ai-search-gfg"];
  if (t.includes("minimax") || t.includes("alpha-beta") || t.includes("game tree")) return MATERIAL_CONTENTS["ai-minimax-gfg"];
  if (s.includes("artificial intelligence") || t.includes("artificial intelligence") || t.includes("n-queens") || t.includes("csp")) {
    return p.includes("w3schools") ? MATERIAL_CONTENTS["ai-w3schools-python"] : MATERIAL_CONTENTS["ai-search-gfg"];
  }

  // Operating Systems
  if (t.includes("deadlock") || t.includes("banker") || t.includes("semaphore") || t.includes("synchronization")) return MATERIAL_CONTENTS["os-deadlocks-gfg"];
  if (t.includes("shell") || t.includes("linux") || t.includes("unix") || t.includes("posix") || p.includes("w3schools") && s.includes("operating system")) return MATERIAL_CONTENTS["os-linux-w3schools"];
  if (s.includes("operating system") || s.includes("os") || t.includes("scheduling") || t.includes("fcfs") || t.includes("round robin")) return MATERIAL_CONTENTS["os-scheduling-gfg"];

  // Java OOP
  if (t.includes("collection") || t.includes("arraylist") || t.includes("hashmap") || t.includes("hashset")) return MATERIAL_CONTENTS["java-collections-gfg"];
  if (p.includes("w3schools") && (s.includes("java") || t.includes("java"))) return MATERIAL_CONTENTS["java-oop-w3schools"];
  if (s.includes("java") || s.includes("oop") || t.includes("polymorphism") || t.includes("inheritance")) return MATERIAL_CONTENTS["java-oop-gfg"];

  // Data Structures
  if (t.includes("tree") || t.includes("avl") || t.includes("bst") || t.includes("rotation")) return MATERIAL_CONTENTS["dsa-trees-gfg"];
  if (p.includes("w3schools") && (s.includes("data structure") || t.includes("data structure"))) return MATERIAL_CONTENTS["dsa-java-w3schools"];
  if (s.includes("data structure") || s.includes("dsa") || t.includes("linked list") || t.includes("stack") || t.includes("queue")) return MATERIAL_CONTENTS["dsa-complete-guide"];

  // DBMS & SQL
  if (t.includes("normalization") || t.includes("bcnf") || t.includes("er model") || t.includes("acid")) return MATERIAL_CONTENTS["dbms-normalization-gfg"];
  if (t.includes("join") || (p.includes("w3schools") && (s.includes("dbms") || s.includes("database") || t.includes("sql")))) return MATERIAL_CONTENTS["dbms-w3schools-sql"];
  if (s.includes("dbms") || s.includes("database") || s.includes("sql") || t.includes("sql") || t.includes("query")) return MATERIAL_CONTENTS["dbms-sql-guide"];

  // C Programming
  if (t.includes("pointer") || t.includes("malloc") || t.includes("free") || t.includes("dynamic memory")) return MATERIAL_CONTENTS["c-pointers-gfg"];
  if (p.includes("w3schools") && (s.includes("c ") || s.includes("c programming") || t.includes("c "))) return MATERIAL_CONTENTS["c-programming-w3schools"];
  if (s.includes("c programming") || s.includes("c language") || t.includes("c programming")) return MATERIAL_CONTENTS["c-programming-guide"];

  // Python Programming
  if (t.includes("dunder") || t.includes("mro") || (t.includes("oop") && (s.includes("python") || t.includes("python")))) return MATERIAL_CONTENTS["python-oop-gfg"];
  if (p.includes("w3schools") && (s.includes("python") || t.includes("python"))) return MATERIAL_CONTENTS["python-w3schools"];
  if (s.includes("python") || t.includes("python")) return MATERIAL_CONTENTS["python-basics-gfg"];

  // Big Data Analytics
  if (t.includes("mongodb") || t.includes("nosql") || (p.includes("w3schools") && (s.includes("big data") || t.includes("big data")))) return MATERIAL_CONTENTS["big-data-mongodb-w3schools"];
  if (t.includes("spark") || t.includes("pyspark") || t.includes("rdd")) return MATERIAL_CONTENTS["big-data-spark-gfg"];
  if (s.includes("big data") || t.includes("hadoop") || t.includes("hdfs") || t.includes("mapreduce")) return MATERIAL_CONTENTS["big-data-hadoop-gfg"];

  // Cloud Service Management
  if (t.includes("docker") || t.includes("kubernetes") || t.includes("container") || t.includes("k8s")) return MATERIAL_CONTENTS["cloud-docker-gfg"];
  if (t.includes("lambda") || t.includes("s3") || (p.includes("w3schools") && (s.includes("cloud") || t.includes("cloud")))) return MATERIAL_CONTENTS["cloud-w3schools-aws"];
  if (s.includes("cloud") || t.includes("cloud") || t.includes("ec2") || t.includes("iaas") || t.includes("aws")) return MATERIAL_CONTENTS["cloud-computing-gfg"];

  // Default fallback
  return MATERIAL_CONTENTS["dsa-complete-guide"];
}
