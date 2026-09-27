/**
 * student-lab-progress.ts
 *
 * Authoritative laboratory curriculum and progress evaluation for AIDS cohorts.
 * Handles:
 * - Second Year (II AIDS): Currently studying Semester III -> Mandatory Semester III Labs
 * - Third Year (III AIDS): Currently studying Semester V -> Mandatory Semester V Labs
 * - Fourth Year (IV AIDS): Currently studying Semester VII -> Capstone Labs
 * - Online progress calculation, live status badges, and Gmail reminder links.
 */

import { StudentProfile } from "./supabase";

export interface LabRequirement {
  id: string;
  code: string;
  name: string;
  shortName: string;
  semester: string;
  year: string;
  cohort: string;
  url: string;
  aliasTokens: string[];
}

export const SEMESTER_LAB_REQUIREMENTS: Record<string, LabRequirement[]> = {
  // Second Year (II AIDS) - Currently studying Semester III
  "Semester III": [
    {
      id: "data-structures",
      code: "AD8301",
      name: "Data Structures Design Laboratory",
      shortName: "DSA Lab",
      semester: "Semester III",
      year: "II Year",
      cohort: "II AIDS",
      url: "/labs/data-structures",
      aliasTokens: [
        "data-structures",
        "dsa",
        "bubble-sort",
        "quick-sort",
        "merge-sort",
        "stack-operations",
        "queue-operations",
        "binary-search-tree",
        "avl-tree",
        "dijkstra",
        "bfs-dfs-graph",
        "singly-linked-list"
      ]
    },
    {
      id: "oops-java",
      code: "AD8302",
      name: "Object Oriented Programming (Java) Laboratory",
      shortName: "OOP Java Lab",
      semester: "Semester III",
      year: "II Year",
      cohort: "II AIDS",
      url: "/labs/oops-java",
      aliasTokens: [
        "oops-java",
        "java",
        "java-class-student",
        "java-banking-encapsulation",
        "java-payroll-inheritance",
        "java-shape-polymorphism",
        "java-custom-exception",
        "java-arraylist-collections"
      ]
    },
    {
      id: "dbms-lab",
      code: "AD8303",
      name: "Database Management Systems Laboratory",
      shortName: "DBMS Lab",
      semester: "Semester III",
      year: "II Year",
      cohort: "II AIDS",
      url: "/labs/dbms-lab",
      aliasTokens: [
        "dbms-lab",
        "dbms",
        "databases",
        "sql-ddl-dml-operations",
        "dbms-ddl-student",
        "dbms-dml-bank",
        "dbms-joins-queries",
        "dbms-views-index",
        "dbms-plsql-cursor",
        "dbms-stored-procedure",
        "dbms-triggers-audit"
      ]
    }
  ],

  // Third Year (III AIDS) - Currently studying Semester V
  "Semester V": [
    {
      id: "artificial-intelligence",
      code: "AI3401",
      name: "Artificial Intelligence Laboratory",
      shortName: "AI Lab",
      semester: "Semester V",
      year: "III Year",
      cohort: "III AIDS",
      url: "/labs/artificial-intelligence",
      aliasTokens: [
        "artificial-intelligence",
        "ai-machine-learning",
        "ai-dfs-bfs-search",
        "ai-astar-8puzzle",
        "astar-search-8puzzle",
        "ai-minimax-tictactoe",
        "minimax-alpha-beta-tictactoe",
        "ai-alphabeta-pruning",
        "ai-nqueens-backtracking"
      ]
    },
    {
      id: "big-data-analytics",
      code: "CS8711",
      name: "Big Data Analytics Laboratory",
      shortName: "Big Data Lab",
      semester: "Semester V",
      year: "III Year",
      cohort: "III AIDS",
      url: "/labs/big-data-analytics",
      aliasTokens: [
        "big-data-analytics",
        "bda-hdfs-commands",
        "hadoop-hdfs-cluster-management",
        "bda-mapreduce-wordcount",
        "bda-spark-dataframe",
        "bda-mongodb-crud"
      ]
    },
    {
      id: "cloud-service-management",
      code: "CS8811",
      name: "Cloud Service Management Laboratory",
      shortName: "Cloud DevOps Lab",
      semester: "Semester V",
      year: "III Year",
      cohort: "III AIDS",
      url: "/labs/cloud-service-management",
      aliasTokens: [
        "cloud-service-management",
        "cloud-computing",
        "cloud-aws-ec2-provisioning",
        "aws-ec2-vpc-infrastructure",
        "cloud-aws-s3-bucket",
        "cloud-docker-container",
        "cloud-aws-lambda-serverless"
      ]
    }
  ],

  // Fourth Year (IV AIDS) - Currently studying Semester VII
  "Semester VII": [
    {
      id: "deep-learning",
      code: "AI4711",
      name: "Deep Learning & Neural Architectures Laboratory",
      shortName: "Deep Learning Lab",
      semester: "Semester VII",
      year: "IV Year",
      cohort: "IV AIDS",
      url: "/labs/ai-machine-learning",
      aliasTokens: [
        "deep-learning",
        "ai-machine-learning",
        "machine-learning",
        "scikit-learn-linear-regression"
      ]
    },
    {
      id: "capstone-ai-project",
      code: "AI4712",
      name: "Industrial AI Model Deployment & Capstone",
      shortName: "Capstone Project",
      semester: "Semester VII",
      year: "IV Year",
      cohort: "IV AIDS",
      url: "/labs/cloud-service-management",
      aliasTokens: [
        "capstone-ai-project",
        "cloud-service-management",
        "cloud-kubernetes-deployment"
      ]
    }
  ]
};

export interface StudentProgressEvaluation {
  studentYear: string;
  semester: string;
  cohort: string;
  totalRequired: number;
  completedCount: number;
  percentage: number;
  isFullyCompleted: boolean;
  finishedLabs: LabRequirement[];
  pendingLabs: LabRequirement[];
  completedExperimentIds: string[];
}

/**
 * Determine a student's active semester and required labs based on profile
 */
export function getStudentSemesterKey(student: Partial<StudentProfile>): string {
  const semStr = (student.yearSemester || "").toLowerCase();
  const classStr = (student.className || student.cohort || "").toLowerCase();
  const yearStr = (student.year || "").toLowerCase();

  // 1. Fourth Year (Semester VII)
  if (
    semStr.includes("semester vii") ||
    semStr.includes("sem 7") ||
    semStr.includes("year iv") ||
    classStr.includes("iv aids") ||
    yearStr.includes("iv")
  ) {
    return "Semester VII";
  }

  // 2. Third Year (Semester V)
  if (
    semStr.includes("semester v") ||
    semStr.includes("sem 5") ||
    semStr.includes("year iii") ||
    classStr.includes("iii aids") ||
    yearStr.includes("iii year") ||
    yearStr.includes("3rd year") ||
    yearStr.includes("third year")
  ) {
    return "Semester V";
  }

  // 3. Second Year (Semester III)
  if (
    semStr.includes("semester iii") ||
    semStr.includes("sem 3") ||
    semStr.includes("year ii") ||
    classStr.includes("ii aids") ||
    yearStr.includes("ii year") ||
    yearStr.includes("2nd year") ||
    yearStr.includes("second year")
  ) {
    return "Semester III";
  }

  // Default fallback for second year (Semester III)
  return "Semester III";
}

/**
 * Check if a required lab is completed by checking the student's completed_experiments array
 */
export function isLabCompleted(lab: LabRequirement, completedExperiments: string[] = []): boolean {
  if (!completedExperiments || completedExperiments.length === 0) return false;

  const expTokens = completedExperiments.map((e) => e.toLowerCase().trim());

  // Direct match on lab id
  if (expTokens.includes(lab.id.toLowerCase())) return true;

  // Direct match on lab code
  if (expTokens.includes(lab.code.toLowerCase())) return true;

  // Check alias tokens
  return lab.aliasTokens.some((token) => {
    const cleanToken = token.toLowerCase();
    return expTokens.some((exp) => exp === cleanToken || exp.includes(cleanToken));
  });
}

/**
 * Evaluate complete progress for a student
 */
export function evaluateStudentProgress(student: Partial<StudentProfile>): StudentProgressEvaluation {
  const semesterKey = getStudentSemesterKey(student);
  const requiredLabs = SEMESTER_LAB_REQUIREMENTS[semesterKey] || SEMESTER_LAB_REQUIREMENTS["Semester III"];
  const completedExperiments = Array.isArray(student.completedExperiments) ? student.completedExperiments : [];

  const finishedLabs: LabRequirement[] = [];
  const pendingLabs: LabRequirement[] = [];

  for (const lab of requiredLabs) {
    if (isLabCompleted(lab, completedExperiments)) {
      finishedLabs.push(lab);
    } else {
      pendingLabs.push(lab);
    }
  }

  const totalRequired = requiredLabs.length;
  const completedCount = finishedLabs.length;
  const percentage = totalRequired > 0 ? Math.round((completedCount / totalRequired) * 100) : 0;
  const isFullyCompleted = completedCount >= totalRequired && totalRequired > 0;

  const yearLabel =
    semesterKey === "Semester III" ? "II Year" : semesterKey === "Semester V" ? "III Year" : "IV Year";
  const cohortLabel =
    semesterKey === "Semester III" ? "II AIDS" : semesterKey === "Semester V" ? "III AIDS" : "IV AIDS";

  return {
    studentYear: yearLabel,
    semester: semesterKey,
    cohort: cohortLabel,
    totalRequired,
    completedCount,
    percentage,
    isFullyCompleted,
    finishedLabs,
    pendingLabs,
    completedExperimentIds: completedExperiments
  };
}

/**
 * Generate official Gmail compose URL for laboratory reminders
 */
export function generateGmailReminderUrl(student: StudentProfile): string {
  const evalData = evaluateStudentProgress(student);
  const recipient = student.email || `${student.registerNumber}@vsb.ac.in`;
  const subject = `[URGENT] Virtual Labs ${evalData.semester} Practical Lab Completion Notice - ${student.name} (${student.registerNumber})`;

  const pendingList =
    evalData.pendingLabs.length > 0
      ? evalData.pendingLabs.map((l) => `  * [PENDING] ${l.code}: ${l.name} (${l.shortName})`).join("\n")
      : "  * All mandatory practical laboratories have been recorded as completed.";

  const finishedList =
    evalData.finishedLabs.length > 0
      ? evalData.finishedLabs.map((l) => `  * [FINISHED] ${l.code}: ${l.name}`).join("\n")
      : "  * No semester laboratories completed yet (0% progress)";

  const bodyText = `Dear ${student.name},

Student Register Number: ${student.registerNumber}
Academic Year & Cohort: ${evalData.studentYear} (${evalData.cohort})
Current Study Semester: ${evalData.semester}
Department: Department of Artificial Intelligence and Data Science
Institution: V.S.B. Engineering College (Autonomous), Karur

OFFICIAL CONTINUOUS INTERNAL ASSESSMENT (CIE) REMINDER:

According to department records, you are currently enrolled in ${evalData.semester} laboratories. Completion of practical simulations, algorithm execution traces, and self-assessment viva evaluations on the Virtual Labs platform is mandatory for continuous assessment marks.

CURRENT LABORATORY PROGRESS:
- Status: ${evalData.completedCount} of ${evalData.totalRequired} Labs Completed (${evalData.percentage}%)

FINISHED LABORATORIES:
${finishedList}

PENDING MANDATORY ${evalData.semester.toUpperCase()} LABORATORIES:
${pendingList}

ACTION REQUIRED:
1. Log in immediately to the official VSB Virtual Labs Portal:
   URL: http://localhost:3010/auth/login
2. Sign in with your institutional credentials:
   - Register Number: ${student.registerNumber}
   - Password: ${student.name} (in CAPS lock)
3. Navigate to "Laboratories", select ${evalData.semester}, and execute all pending practical experiments and test evaluations before the deadline.

For any queries regarding lab observations, contact your Lab Incharge or Faculty Advisor: ${student.advisor || "Dr. D. Anandhan / Dr. S. Meenakshi"}.

Warm regards,
Laboratory Academic Cell
Department of Artificial Intelligence and Data Science
V.S.B. Engineering College, NH-67, Karur - 639 111, Tamil Nadu.
`;

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
}

/**
 * Generate formatted text for clipboard copying
 */
export function generateReminderClipboardText(student: StudentProfile): string {
  const evalData = evaluateStudentProgress(student);
  const pendingNames = evalData.pendingLabs.map((l) => `${l.code} ${l.shortName}`).join(", ") || "None";
  return `VSB V-LAB REMINDER: Dear ${student.name} (${student.registerNumber}), you have ${evalData.pendingLabs.length} pending labs for ${evalData.semester}: [${pendingNames}]. Current progress: ${evalData.percentage}%. Please log in at http://localhost:3010/auth/login and complete your labs immediately.`;
}
