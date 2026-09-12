/**
 * supabase-multitenant.ts
 *
 * Multi-tenant Data Access Layer for Virtual Labs Enterprise SaaS.
 * Isolates data per college (VSB, CIT, PSG, etc.) with strict tenant scoping.
 */

import { supabase, StudentProfile } from "./supabase";

export interface CollegeMaterial {
  id: string;
  collegeSlug: string;
  title: string;
  description: string;
  category: "Lecture Notes" | "Question Bank" | "Lab Sheet" | "Syllabus & Curriculum" | "Reference Book";
  department: string;
  semester: string;
  fileUrl: string;
  fileType: "pdf" | "doc" | "link" | "zip";
  uploadedBy: string;
  createdAt: string;
}

export interface CollegeLabManual {
  id: string;
  collegeSlug: string;
  labName: string;
  labCode: string;
  department: string;
  semester: string;
  manualUrl: string;
  observationUrl?: string;
  description: string;
  uploadedBy: string;
  createdAt: string;
}

export interface CollegeCustomLab {
  id: string;
  collegeSlug: string;
  title: string;
  domain: string;
  department: string;
  labUrl: string;
  description: string;
  semester: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  uploadedBy: string;
  createdAt: string;
}

export interface CollegeVideoTutorial {
  id: string;
  collegeSlug: string;
  title: string;
  topic: string;
  department: string;
  youtubeUrl: string;
  language: "Tamil" | "English" | "Bilingual";
  duration: string;
  uploadedBy: string;
  createdAt: string;
}

export interface CollegeAnnouncement {
  id: string;
  collegeSlug: string;
  title: string;
  content: string;
  priority: "high" | "normal" | "urgent";
  date: string;
  category: "Lab Schedule" | "Model Exam" | "Assignment" | "General";
  createdAt: string;
}

// =========================================================================
// INITIAL SEED DATA PER TENANT (COLLEGE)
// =========================================================================

const INITIAL_MATERIALS_SEED: CollegeMaterial[] = [
  // VSB
  {
    id: "mat_vsb_01",
    collegeSlug: "vsb",
    title: "CS3351 Data Structures Lab Observation & Question Bank",
    description: "Complete 2-Marks, 16-Marks, and Model Viva Voce Questions for Department of AI&DS and CSE.",
    category: "Question Bank",
    department: "AIDS",
    semester: "Semester III",
    fileUrl: "https://www.geeksforgeeks.org/data-structures/",
    fileType: "pdf",
    uploadedBy: "Prof. Murugan (HOD AIDS)",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "mat_vsb_02",
    collegeSlug: "vsb",
    title: "AD3491 MLDL Laboratory Record Template & Datasets",
    description: "Standardized Jupyter Notebook templates and CSV datasets for Machine Learning simulations.",
    category: "Lab Sheet",
    department: "AIDS",
    semester: "Semester IV",
    fileUrl: "https://www.geeksforgeeks.org/machine-learning/",
    fileType: "zip",
    uploadedBy: "Dr. K. Senthil",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  // CIT
  {
    id: "mat_cit_01",
    collegeSlug: "cit",
    title: "20CS32 Design & Analysis of Algorithms Handout",
    description: "Asymptotic complexity analysis, divide and conquer, dynamic programming notes.",
    category: "Lecture Notes",
    department: "CSE",
    semester: "Semester III",
    fileUrl: "https://cit.edu.in/downloads/daa-handout.pdf",
    fileType: "pdf",
    uploadedBy: "CIT Lab Incharge",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
  },
  // PSG
  {
    id: "mat_psg_01",
    collegeSlug: "psg",
    title: "PSG Tech 21IT05 Database System Performance Notes",
    description: "B+ Tree Indexing and query execution plans for autonomous laboratory batch.",
    category: "Lecture Notes",
    department: "IT",
    semester: "Semester IV",
    fileUrl: "https://psgtech.edu/notes/dbms-perf.pdf",
    fileType: "pdf",
    uploadedBy: "PSG IT Faculty",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

const INITIAL_MANUALS_SEED: CollegeLabManual[] = [
  // VSB
  {
    id: "man_vsb_01",
    collegeSlug: "vsb",
    labName: "Data Structures & Algorithms Laboratory",
    labCode: "AD8381",
    department: "AIDS & CSE",
    semester: "Semester III",
    manualUrl: "https://www.geeksforgeeks.org/data-structures/",
    observationUrl: "https://www.w3schools.com/dsa/",
    description: "Official VSB Autonomous Lab Manual covering Stack, Queue, Trees, Graphs, Sorting & Hashing.",
    uploadedBy: "Department Lab Coordinator",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
  },
  {
    id: "man_vsb_02",
    collegeSlug: "vsb",
    labName: "Machine Learning & Deep Learning Laboratory",
    labCode: "AD8481",
    department: "AIDS",
    semester: "Semester IV",
    manualUrl: "https://www.geeksforgeeks.org/machine-learning/",
    observationUrl: "https://www.w3schools.com/python/python_ml_getting_started.asp",
    description: "Python scikit-learn & PyTorch simulation manual with step-by-step algorithms.",
    uploadedBy: "AIDS Lab Coordinator",
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString()
  },
  {
    id: "man_vsb_03",
    collegeSlug: "vsb",
    labName: "Database Management Systems Laboratory",
    labCode: "AD8382",
    department: "AIDS & CSE",
    semester: "Semester III",
    manualUrl: "https://www.geeksforgeeks.org/dbms/",
    observationUrl: "https://www.w3schools.com/sql/",
    description: "Relational Schemas, Complex SQL Queries, Joins, Views, Indexes, PL/SQL Procedures & Triggers.",
    uploadedBy: "DBMS Lab Incharge",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "man_vsb_04",
    collegeSlug: "vsb",
    labName: "Operating Systems Laboratory",
    labCode: "CS3461",
    department: "AIDS & CSE",
    semester: "Semester IV",
    manualUrl: "https://www.geeksforgeeks.org/operating-systems/",
    observationUrl: "https://www.w3schools.com/linux/index.php",
    description: "POSIX System Calls, CPU Scheduling (FCFS/SJF/RR), Semaphores, and Banker's Deadlock Algorithm.",
    uploadedBy: "OS Lab Coordinator",
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: "man_vsb_05",
    collegeSlug: "vsb",
    labName: "Object Oriented Programming System (Java)",
    labCode: "CS3351",
    department: "AIDS & CSE",
    semester: "Semester III",
    manualUrl: "https://www.geeksforgeeks.org/java/",
    observationUrl: "https://www.w3schools.com/java/",
    description: "Java OOP, Classes, Inheritance hierarchies, Polymorphism, Exceptions, Collections Framework.",
    uploadedBy: "OOPs Coordinator",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  // CIT
  {
    id: "man_cit_01",
    collegeSlug: "cit",
    labName: "Advanced Operating Systems & Kernel Laboratory",
    labCode: "20CS41",
    department: "CSE",
    semester: "Semester IV",
    manualUrl: "https://www.geeksforgeeks.org/operating-systems/",
    description: "POSIX Threads, CPU Scheduling, IPC and memory simulation manual.",
    uploadedBy: "CIT Lab Administrator",
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString()
  },
  {
    id: "man_cit_02",
    collegeSlug: "cit",
    labName: "Data Structures & Algorithms Laboratory",
    labCode: "20CS31",
    department: "CSE",
    semester: "Semester III",
    manualUrl: "https://www.geeksforgeeks.org/data-structures/",
    description: "Linear allocations, tree traversals, shortest path algorithms, and sorting.",
    uploadedBy: "CIT DAA Incharge",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
  }
];

const INITIAL_CUSTOM_LABS_SEED: CollegeCustomLab[] = [
  // VSB
  {
    id: "lab_vsb_01",
    collegeSlug: "vsb",
    title: "Data Structures & Algorithms Laboratory",
    domain: "Core Computing",
    department: "AIDS & CSE",
    labUrl: "/labs/data-structures",
    description: "Interactive visual simulation of Stacks, Queues, BSTs, AVL balancing, Graph traversals, and Sorting algorithms.",
    semester: "Semester III",
    difficulty: "Intermediate",
    uploadedBy: "Academic Committee",
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString()
  },
  {
    id: "lab_vsb_02",
    collegeSlug: "vsb",
    title: "Database Management System (DBMS) Studio",
    domain: "Databases & Storage",
    department: "AIDS & CSE",
    labUrl: "/labs/dbms-lab",
    description: "Live SQL query console, schema builder, ER diagrams, PL/SQL procedures, and ACID transaction simulator.",
    semester: "Semester III",
    difficulty: "Intermediate",
    uploadedBy: "DBMS Faculty",
    createdAt: new Date(Date.now() - 86400000 * 11).toISOString()
  },
  {
    id: "lab_vsb_03",
    collegeSlug: "vsb",
    title: "Machine Learning & Deep Learning Laboratory",
    domain: "Artificial Intelligence",
    department: "AIDS",
    labUrl: "/labs/ai-machine-learning",
    description: "Candidate-Elimination, ID3 Decision Trees, Backpropagation ANN, Naïve Bayes, and EM vs k-Means clustering.",
    semester: "Semester IV",
    difficulty: "Advanced",
    uploadedBy: "AI Faculty Incharge",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
  },
  {
    id: "lab_vsb_04",
    collegeSlug: "vsb",
    title: "Operating Systems Laboratory",
    domain: "Systems & Architecture",
    department: "AIDS & CSE",
    labUrl: "/labs/operating-systems",
    description: "CPU Scheduling policies (FCFS/SJF/RR), Semaphore synchronization, Banker's deadlock safety, and Page replacement.",
    semester: "Semester IV",
    difficulty: "Intermediate",
    uploadedBy: "OS Department Incharge",
    createdAt: new Date(Date.now() - 86400000 * 9).toISOString()
  },
  {
    id: "lab_vsb_05",
    collegeSlug: "vsb",
    title: "Object Oriented Programming (Java) Laboratory",
    domain: "Software Engineering",
    department: "AIDS & CSE",
    labUrl: "/labs/oops-java",
    description: "Encapsulation, inheritance hierarchies, polymorphism, custom exceptions, Collections, and JDBC simulation.",
    semester: "Semester III",
    difficulty: "Intermediate",
    uploadedBy: "Java Faculty",
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString()
  },
  {
    id: "lab_vsb_06",
    collegeSlug: "vsb",
    title: "Data Science & Analytics Laboratory",
    domain: "Analytics & Statistics",
    department: "AIDS",
    labUrl: "/labs/data-science-analytics",
    description: "Statistical hypothesis testing (Z-test, T-test, ANOVA), NumPy/Pandas pipelines, and regression models.",
    semester: "Semester IV",
    difficulty: "Intermediate",
    uploadedBy: "Analytics Faculty",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
  },
  {
    id: "lab_vsb_07",
    collegeSlug: "vsb",
    title: "Computer Networks Laboratory",
    domain: "Networks & Security",
    department: "AIDS & CSE",
    labUrl: "/labs/computer-networks",
    description: "Packet sniffing, TCP/UDP sockets, DNS resolution, ARP/RARP translation, and routing algorithms.",
    semester: "Semester IV",
    difficulty: "Intermediate",
    uploadedBy: "Networks Incharge",
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString()
  },
  {
    id: "lab_vsb_08",
    collegeSlug: "vsb",
    title: "C Programming & Pointer Memory Visualizer",
    domain: "Foundational Programming",
    department: "All First Years",
    labUrl: "/labs/c-programming",
    description: "Interactive visualizer for stack frames, heap allocation (malloc/free), and pointer arithmetic.",
    semester: "Semester I / II",
    difficulty: "Beginner",
    uploadedBy: "First Year Cell",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "lab_vsb_09",
    collegeSlug: "vsb",
    title: "Python Programming Laboratory",
    domain: "Foundational Programming",
    department: "All First Years",
    labUrl: "/labs/python-programming",
    description: "Dynamic typing, list/dict comprehensions, lambdas, OOP class models, and exception handling.",
    semester: "Semester I",
    difficulty: "Beginner",
    uploadedBy: "Python Incharge",
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: "lab_vsb_10",
    collegeSlug: "vsb",
    title: "Artificial Intelligence Heuristic Search Lab",
    domain: "Artificial Intelligence",
    department: "AIDS",
    labUrl: "/labs/artificial-intelligence",
    description: "A* Search, Minimax adversarial game trees with Alpha-Beta pruning, and N-Queens CSP solvers.",
    semester: "Semester V",
    difficulty: "Advanced",
    uploadedBy: "AI Research Cell",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: "lab_vsb_11",
    collegeSlug: "vsb",
    title: "Big Data Analytics & MapReduce Lab",
    domain: "Distributed Computing",
    department: "AIDS",
    labUrl: "/labs/big-data-analytics",
    description: "Hadoop HDFS cluster replication, MapReduce batch pipelines, PySpark DataFrames, and MongoDB NoSQL.",
    semester: "Semester V",
    difficulty: "Advanced",
    uploadedBy: "Big Data Incharge",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "lab_vsb_12",
    collegeSlug: "vsb",
    title: "Cloud Service Management & DevOps Lab",
    domain: "Cloud Infrastructure",
    department: "AIDS & CSE",
    labUrl: "/labs/cloud-service-management",
    description: "AWS EC2/S3 cloud provisioning, Docker containerization, AWS Lambda serverless microservices, and Kubernetes.",
    semester: "Semester V",
    difficulty: "Advanced",
    uploadedBy: "Cloud Incharge",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: "lab_vsb_13",
    collegeSlug: "vsb",
    title: "Interactive DSA Visualizer Engine",
    domain: "Algorithms & Simulation",
    department: "AIDS & CSE",
    labUrl: "/dsa-visualization",
    description: "Step-by-step visual execution of sorting algorithms, BST operations, and stack/queue data structures.",
    semester: "Semester III",
    difficulty: "Beginner",
    uploadedBy: "V-Lab Studio",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  // CIT
  {
    id: "lab_cit_01",
    collegeSlug: "cit",
    title: "CIT Cloud Distributed Systems Simulation Lab",
    domain: "Distributed Computing",
    department: "CSE & IT",
    labUrl: "/labs/cloud-service-management",
    description: "Raft Consensus and network socket simulation engine for CIT Autonomous track.",
    semester: "Semester VI",
    difficulty: "Advanced",
    uploadedBy: "CIT Cloud Lab Head",
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: "lab_cit_02",
    collegeSlug: "cit",
    title: "CIT Data Structures & Visualizer Lab",
    domain: "Core Computing",
    department: "CSE",
    labUrl: "/labs/data-structures",
    description: "Interactive visual simulation for Trees, Graphs, Sorting and Dynamic Memory.",
    semester: "Semester III",
    difficulty: "Intermediate",
    uploadedBy: "CIT Lab Administrator",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  }
];

const INITIAL_VIDEOS_SEED: CollegeVideoTutorial[] = [
  // VSB
  {
    id: "vid_vsb_01",
    collegeSlug: "vsb",
    title: "Bubble Sort & Quick Sort Step-by-Step Simulation in Tamil",
    topic: "Sorting Algorithms",
    department: "AIDS / CSE",
    youtubeUrl: "https://www.youtube.com/watch?v=kPRA0W1kECg",
    language: "Tamil",
    duration: "18:45 mins",
    uploadedBy: "VSB V-Lab Studio",
    createdAt: new Date(Date.now() - 86400000 * 9).toISOString()
  },
  {
    id: "vid_vsb_02",
    collegeSlug: "vsb",
    title: "Dijkstra's Shortest Path & Prim's Algorithm Practical Walkthrough",
    topic: "Graph Algorithms",
    department: "AIDS / CSE",
    youtubeUrl: "https://www.youtube.com/watch?v=EFg3u_E6eHU",
    language: "Tamil",
    duration: "24:10 mins",
    uploadedBy: "VSB V-Lab Studio",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  // CIT
  {
    id: "vid_cit_01",
    collegeSlug: "cit",
    title: "CIT Lab Orientation: Virtual Laboratory Workflow & Submission",
    topic: "Portal Orientation",
    department: "All Departments",
    youtubeUrl: "https://www.youtube.com/watch?v=sample-cit",
    language: "English",
    duration: "12:30 mins",
    uploadedBy: "CIT E-Learning Cell",
    createdAt: new Date(Date.now() - 86400000 * 11).toISOString()
  }
];

const INITIAL_ANNOUNCEMENTS_SEED: CollegeAnnouncement[] = [
  // VSB
  {
    id: "ann_vsb_01",
    collegeSlug: "vsb",
    title: "Mid-Term Model Practical Lab Examination Schedule Announced",
    content: "All III Year AIDS-A, AIDS-B, and AIDS-C students must complete all 8 DSA experiments and Viva Voce on this portal before Friday.",
    priority: "urgent",
    date: "Sep 15, 2026",
    category: "Model Exam",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: "ann_vsb_02",
    collegeSlug: "vsb",
    title: "Continuous Assessment Test-2 (CAT-2) Coding Submissions Open",
    content: "The online compiler and LeetCode problem trackers for trees & graphs are now active for continuous assessment points.",
    priority: "normal",
    date: "Sep 20, 2026",
    category: "Lab Schedule",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  // CIT
  {
    id: "ann_cit_01",
    collegeSlug: "cit",
    title: "CIT Autonomous End-Semester Practical Timetable Released",
    content: "Autonomous practical exams will commence from next month. Complete all virtual lab simulations.",
    priority: "high",
    date: "Sep 28, 2026",
    category: "Lab Schedule",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

// Helper to access LocalStorage partition safely
function getLocalKey(collegeSlug: string, dataType: string): string {
  return `vlab_tenant_${collegeSlug.toLowerCase()}_${dataType}`;
}

// =========================================================================
// TENANT DATA ACCESS METHODS (ISOLATED PER COLLEGE)
// =========================================================================

// --- 1. Materials ---
export async function getCollegeMaterials(collegeSlug: string): Promise<CollegeMaterial[]> {
  const cleanSlug = collegeSlug.trim().toLowerCase();
  try {
    const { data, error } = await supabase
      .from("college_materials")
      .select("*")
      .eq("college_slug", cleanSlug)
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((d) => ({
        id: d.id,
        collegeSlug: d.college_slug,
        title: d.title,
        description: d.description,
        category: d.category,
        department: d.department,
        semester: d.semester,
        fileUrl: d.file_url,
        fileType: d.file_type,
        uploadedBy: d.uploaded_by,
        createdAt: d.created_at
      }));
    }
  } catch (e) {
    // Database table fallback
  }

  // LocalStorage / Seed fallback
  if (typeof window !== "undefined") {
    const local = localStorage.getItem(getLocalKey(cleanSlug, "materials"));
    if (local) {
      try { return JSON.parse(local); } catch {}
    }
  }
  return INITIAL_MATERIALS_SEED.filter((m) => m.collegeSlug === cleanSlug);
}

export async function saveCollegeMaterial(material: CollegeMaterial): Promise<void> {
  const cleanSlug = material.collegeSlug.trim().toLowerCase();
  try {
    await supabase.from("college_materials").upsert({
      id: material.id,
      college_slug: cleanSlug,
      title: material.title,
      description: material.description,
      category: material.category,
      department: material.department,
      semester: material.semester,
      file_url: material.fileUrl,
      file_type: material.fileType,
      uploaded_by: material.uploadedBy,
      created_at: material.createdAt
    });
  } catch {}

  // Update local partition
  if (typeof window !== "undefined") {
    const current = await getCollegeMaterials(cleanSlug);
    const index = current.findIndex((m) => m.id === material.id);
    const updated = index >= 0
      ? current.map((m) => (m.id === material.id ? material : m))
      : [material, ...current];
    localStorage.setItem(getLocalKey(cleanSlug, "materials"), JSON.stringify(updated));
  }
}

export async function deleteCollegeMaterial(id: string, collegeSlug: string): Promise<void> {
  const cleanSlug = collegeSlug.trim().toLowerCase();
  try {
    await supabase.from("college_materials").delete().eq("id", id).eq("college_slug", cleanSlug);
  } catch {}

  if (typeof window !== "undefined") {
    const current = await getCollegeMaterials(cleanSlug);
    const filtered = current.filter((m) => m.id !== id);
    localStorage.setItem(getLocalKey(cleanSlug, "materials"), JSON.stringify(filtered));
  }
}

// --- 2. Lab Manuals ---
export async function getCollegeLabManuals(collegeSlug: string): Promise<CollegeLabManual[]> {
  const cleanSlug = collegeSlug.trim().toLowerCase();
  try {
    const { data, error } = await supabase
      .from("college_lab_manuals")
      .select("*")
      .eq("college_slug", cleanSlug)
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((d) => ({
        id: d.id,
        collegeSlug: d.college_slug,
        labName: d.lab_name,
        labCode: d.lab_code,
        department: d.department,
        semester: d.semester,
        manualUrl: d.manual_url,
        observationUrl: d.observation_url,
        description: d.description,
        uploadedBy: d.uploaded_by,
        createdAt: d.created_at
      }));
    }
  } catch {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(getLocalKey(cleanSlug, "manuals"));
    if (local) {
      try {
        const parsed: CollegeLabManual[] = JSON.parse(local);
        // If parsed contains broken placeholder drive links, sanitize them
        const hasBrokenLinks = parsed.some((m) => m.manualUrl && m.manualUrl.includes("drive.google.com/file/d/vsb-"));
        if (hasBrokenLinks || parsed.length < 3) {
          const defaultSeed = INITIAL_MANUALS_SEED.filter((m) => m.collegeSlug === cleanSlug);
          // Merge user-created ones that don't have broken URLs with the rich seed
          const cleanUserItems = parsed.filter((m) => !m.manualUrl?.includes("drive.google.com/file/d/vsb-") && !defaultSeed.some((s) => s.id === m.id));
          const merged = [...defaultSeed, ...cleanUserItems];
          localStorage.setItem(getLocalKey(cleanSlug, "manuals"), JSON.stringify(merged));
          return merged;
        }
        return parsed;
      } catch {}
    }
  }
  return INITIAL_MANUALS_SEED.filter((m) => m.collegeSlug === cleanSlug);
}

export async function saveCollegeLabManual(manual: CollegeLabManual): Promise<void> {
  const cleanSlug = manual.collegeSlug.trim().toLowerCase();
  try {
    await supabase.from("college_lab_manuals").upsert({
      id: manual.id,
      college_slug: cleanSlug,
      lab_name: manual.labName,
      lab_code: manual.labCode,
      department: manual.department,
      semester: manual.semester,
      manual_url: manual.manualUrl,
      observation_url: manual.observationUrl,
      description: manual.description,
      uploaded_by: manual.uploadedBy,
      created_at: manual.createdAt
    });
  } catch {}

  if (typeof window !== "undefined") {
    const current = await getCollegeLabManuals(cleanSlug);
    const index = current.findIndex((m) => m.id === manual.id);
    const updated = index >= 0
      ? current.map((m) => (m.id === manual.id ? manual : m))
      : [manual, ...current];
    localStorage.setItem(getLocalKey(cleanSlug, "manuals"), JSON.stringify(updated));
  }
}

export async function deleteCollegeLabManual(id: string, collegeSlug: string): Promise<void> {
  const cleanSlug = collegeSlug.trim().toLowerCase();
  try {
    await supabase.from("college_lab_manuals").delete().eq("id", id).eq("college_slug", cleanSlug);
  } catch {}

  if (typeof window !== "undefined") {
    const current = await getCollegeLabManuals(cleanSlug);
    const filtered = current.filter((m) => m.id !== id);
    localStorage.setItem(getLocalKey(cleanSlug, "manuals"), JSON.stringify(filtered));
  }
}

// --- 3. Custom Labs ---
export async function getCollegeCustomLabs(collegeSlug: string): Promise<CollegeCustomLab[]> {
  const cleanSlug = collegeSlug.trim().toLowerCase();
  try {
    const { data, error } = await supabase
      .from("college_custom_labs")
      .select("*")
      .eq("college_slug", cleanSlug)
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((d) => ({
        id: d.id,
        collegeSlug: d.college_slug,
        title: d.title,
        domain: d.domain,
        department: d.department,
        labUrl: d.lab_url,
        description: d.description,
        semester: d.semester,
        difficulty: d.difficulty,
        uploadedBy: d.uploaded_by,
        createdAt: d.created_at
      }));
    }
  } catch {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(getLocalKey(cleanSlug, "custom_labs"));
    if (local) {
      try {
        const parsed: CollegeCustomLab[] = JSON.parse(local);
        const defaultSeed = INITIAL_CUSTOM_LABS_SEED.filter((m) => m.collegeSlug === cleanSlug);
        if (parsed.length < defaultSeed.length) {
          const userAdded = parsed.filter((p) => !defaultSeed.some((s) => s.id === p.id));
          const merged = [...defaultSeed, ...userAdded];
          localStorage.setItem(getLocalKey(cleanSlug, "custom_labs"), JSON.stringify(merged));
          return merged;
        }
        return parsed;
      } catch {}
    }
  }
  return INITIAL_CUSTOM_LABS_SEED.filter((m) => m.collegeSlug === cleanSlug);
}

export async function saveCollegeCustomLab(lab: CollegeCustomLab): Promise<void> {
  const cleanSlug = lab.collegeSlug.trim().toLowerCase();
  try {
    await supabase.from("college_custom_labs").upsert({
      id: lab.id,
      college_slug: cleanSlug,
      title: lab.title,
      domain: lab.domain,
      department: lab.department,
      lab_url: lab.labUrl,
      description: lab.description,
      semester: lab.semester,
      difficulty: lab.difficulty,
      uploaded_by: lab.uploadedBy,
      created_at: lab.createdAt
    });
  } catch {}

  if (typeof window !== "undefined") {
    const current = await getCollegeCustomLabs(cleanSlug);
    const index = current.findIndex((m) => m.id === lab.id);
    const updated = index >= 0
      ? current.map((m) => (m.id === lab.id ? lab : m))
      : [lab, ...current];
    localStorage.setItem(getLocalKey(cleanSlug, "custom_labs"), JSON.stringify(updated));
  }
}

export async function deleteCollegeCustomLab(id: string, collegeSlug: string): Promise<void> {
  const cleanSlug = collegeSlug.trim().toLowerCase();
  try {
    await supabase.from("college_custom_labs").delete().eq("id", id).eq("college_slug", cleanSlug);
  } catch {}

  if (typeof window !== "undefined") {
    const current = await getCollegeCustomLabs(cleanSlug);
    const filtered = current.filter((m) => m.id !== id);
    localStorage.setItem(getLocalKey(cleanSlug, "custom_labs"), JSON.stringify(filtered));
  }
}

// --- 4. Video Tutorials ---
export async function getCollegeVideoTutorials(collegeSlug: string): Promise<CollegeVideoTutorial[]> {
  const cleanSlug = collegeSlug.trim().toLowerCase();
  try {
    const { data, error } = await supabase
      .from("college_video_tutorials")
      .select("*")
      .eq("college_slug", cleanSlug)
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((d) => ({
        id: d.id,
        collegeSlug: d.college_slug,
        title: d.title,
        topic: d.topic,
        department: d.department,
        youtubeUrl: d.youtube_url,
        language: d.language,
        duration: d.duration,
        uploadedBy: d.uploaded_by,
        createdAt: d.created_at
      }));
    }
  } catch {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(getLocalKey(cleanSlug, "videos"));
    if (local) {
      try { return JSON.parse(local); } catch {}
    }
  }
  return INITIAL_VIDEOS_SEED.filter((m) => m.collegeSlug === cleanSlug);
}

export async function saveCollegeVideoTutorial(vid: CollegeVideoTutorial): Promise<void> {
  const cleanSlug = vid.collegeSlug.trim().toLowerCase();
  try {
    await supabase.from("college_video_tutorials").upsert({
      id: vid.id,
      college_slug: cleanSlug,
      title: vid.title,
      topic: vid.topic,
      department: vid.department,
      youtube_url: vid.youtubeUrl,
      language: vid.language,
      duration: vid.duration,
      uploaded_by: vid.uploadedBy,
      created_at: vid.createdAt
    });
  } catch {}

  if (typeof window !== "undefined") {
    const current = await getCollegeVideoTutorials(cleanSlug);
    const index = current.findIndex((m) => m.id === vid.id);
    const updated = index >= 0
      ? current.map((m) => (m.id === vid.id ? vid : m))
      : [vid, ...current];
    localStorage.setItem(getLocalKey(cleanSlug, "videos"), JSON.stringify(updated));
  }
}

export async function deleteCollegeVideoTutorial(id: string, collegeSlug: string): Promise<void> {
  const cleanSlug = collegeSlug.trim().toLowerCase();
  try {
    await supabase.from("college_video_tutorials").delete().eq("id", id).eq("college_slug", cleanSlug);
  } catch {}

  if (typeof window !== "undefined") {
    const current = await getCollegeVideoTutorials(cleanSlug);
    const filtered = current.filter((m) => m.id !== id);
    localStorage.setItem(getLocalKey(cleanSlug, "videos"), JSON.stringify(filtered));
  }
}

// --- 5. Announcements ---
export async function getCollegeAnnouncements(collegeSlug: string): Promise<CollegeAnnouncement[]> {
  const cleanSlug = collegeSlug.trim().toLowerCase();
  try {
    const { data, error } = await supabase
      .from("college_announcements")
      .select("*")
      .eq("college_slug", cleanSlug)
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((d) => ({
        id: d.id,
        collegeSlug: d.college_slug,
        title: d.title,
        content: d.content,
        priority: d.priority,
        date: d.date,
        category: d.category,
        createdAt: d.created_at
      }));
    }
  } catch {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(getLocalKey(cleanSlug, "announcements"));
    if (local) {
      try { return JSON.parse(local); } catch {}
    }
  }
  return INITIAL_ANNOUNCEMENTS_SEED.filter((m) => m.collegeSlug === cleanSlug);
}

export async function saveCollegeAnnouncement(ann: CollegeAnnouncement): Promise<void> {
  const cleanSlug = ann.collegeSlug.trim().toLowerCase();
  try {
    await supabase.from("college_announcements").upsert({
      id: ann.id,
      college_slug: cleanSlug,
      title: ann.title,
      content: ann.content,
      priority: ann.priority,
      date: ann.date,
      category: ann.category,
      created_at: ann.createdAt
    });
  } catch {}

  if (typeof window !== "undefined") {
    const current = await getCollegeAnnouncements(cleanSlug);
    const index = current.findIndex((m) => m.id === ann.id);
    const updated = index >= 0
      ? current.map((m) => (m.id === ann.id ? ann : m))
      : [ann, ...current];
    localStorage.setItem(getLocalKey(cleanSlug, "announcements"), JSON.stringify(updated));
  }
}

export async function deleteCollegeAnnouncement(id: string, collegeSlug: string): Promise<void> {
  const cleanSlug = collegeSlug.trim().toLowerCase();
  try {
    await supabase.from("college_announcements").delete().eq("id", id).eq("college_slug", cleanSlug);
  } catch {}

  if (typeof window !== "undefined") {
    const current = await getCollegeAnnouncements(cleanSlug);
    const filtered = current.filter((m) => m.id !== id);
    localStorage.setItem(getLocalKey(cleanSlug, "announcements"), JSON.stringify(filtered));
  }
}

// --- 6. Tenant-Scoped Student Profiles ---
export async function getStudentsByCollege(collegeSlug: string): Promise<StudentProfile[]> {
  const cleanSlug = collegeSlug.trim().toLowerCase();
  try {
    // Attempt filtered DB query
    let query = supabase.from("profiles").select("*");
    
    // If querying specific college, filter by college_slug or fallback to default vsb
    if (cleanSlug !== "all") {
      query = query.or(`college_slug.eq.${cleanSlug},and(college_slug.is.null,register_number.ilike.9225%)`);
    }

    const { data, error } = await query.order("last_active", { ascending: false });
    if (!error && data && data.length > 0) {
      return data.map((d) => ({
        uid: d.id,
        name: d.name,
        registerNumber: d.register_number,
        email: d.email,
        collegeSlug: d.college_slug || "vsb",
        collegeName: d.college_name || "VSB Engineering College",
        department: d.department || "Artificial Intelligence & Data Science",
        yearSemester: d.year_semester || "Year III / Semester VI",
        year: d.year || undefined,
        className: d.class_name || undefined,
        profileCompleted: d.profile_completed || Boolean(d.register_number && !d.register_number.startsWith("STUDENT")),
        completedExperiments: d.completed_experiments || [],
        completedProblems: d.completed_problems || [],
        starredProblems: d.starred_problems || [],
        problemNotes: d.problem_notes || {},
        quizScores: d.quiz_scores || {},
        feedbacks: d.feedbacks || {},
        createdAt: d.created_at || new Date().toISOString(),
        lastActive: d.last_active || new Date().toISOString()
      }));
    }
  } catch {}

  // LocalStorage scan fallback for demo / sandbox
  if (typeof window !== "undefined") {
    const results: StudentProfile[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("vlab_student_")) {
        try {
          const item = JSON.parse(localStorage.getItem(key) || "{}");
          if (item?.uid) {
            const itemCollege = (item.collegeSlug || "vsb").toLowerCase();
            if (cleanSlug === "all" || itemCollege === cleanSlug) {
              results.push(item);
            }
          }
        } catch {}
      }
    }
    if (results.length > 0) return results;
  }

  return [];
}

// =========================================================================
// 7. INSTITUTIONAL FREE DEMO BOOKINGS & ON-DEMAND COLLEGE CLONES
// =========================================================================

export interface DemoBooking {
  id: string;
  collegeName: string;
  collegeSlug: string;
  collegeCode?: string;
  contactName: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  studentStrength: string;
  preferredSubdomain?: string;
  message?: string;
  status: "pending" | "trial_active" | "confirmed";
  createdAt: string;
}

export async function saveDemoBooking(booking: DemoBooking): Promise<void> {
  // 1. Attempt to save to Supabase
  try {
    await supabase.from("college_demo_bookings").insert({
      id: booking.id,
      college_name: booking.collegeName,
      college_slug: booking.collegeSlug,
      college_code: booking.collegeCode,
      contact_name: booking.contactName,
      email: booking.email,
      phone: booking.phone,
      designation: booking.designation,
      department: booking.department,
      student_strength: booking.studentStrength,
      preferred_subdomain: booking.preferredSubdomain,
      message: booking.message,
      status: booking.status,
      created_at: booking.createdAt,
    });
  } catch {}

  // 2. Always persist locally for seamless demo/sandbox testing
  if (typeof window !== "undefined") {
    const existingKey = "vlab_all_demo_bookings";
    let bookings: DemoBooking[] = [];
    try {
      const raw = localStorage.getItem(existingKey);
      if (raw) bookings = JSON.parse(raw);
    } catch {}
    bookings = [booking, ...bookings.filter((b) => b.id !== booking.id)];
    localStorage.setItem(existingKey, JSON.stringify(bookings));
    localStorage.setItem(`vlab_latest_demo_booking`, JSON.stringify(booking));
  }
}

export function getLocalDemoBookings(): DemoBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("vlab_all_demo_bookings");
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

