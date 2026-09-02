import { DATA_SCIENCE_EXPERIMENTS } from "./experiments-data/data-science-experiments";
import { NETWORKS_EXPERIMENTS } from "./experiments-data/networks-experiments";
import { ML_EXPERIMENTS } from "./experiments-data/ml-experiments";
import { OS_EXPERIMENTS } from "./experiments-data/os-experiments";
import { OOPS_JAVA_EXPERIMENTS } from "./experiments-data/oops-java-experiments";
import { DSA_EXPERIMENTS } from "./experiments-data/dsa-experiments";
import { DBMS_EXPERIMENTS } from "./experiments-data/dbms-experiments";
import { C_PROGRAMMING_EXPERIMENTS } from "./experiments-data/c-programming-experiments";
import { PYTHON_PROGRAMMING_EXPERIMENTS } from "./experiments-data/python-programming-experiments";
import { ADVANCED_LABS_EXPERIMENTS } from "./experiments-data/advanced-labs-experiments";

export interface ComplexityEntry {
  operation: string;
  best: string;
  avg: string;
  worst: string;
  space: string;
}

export interface LeetCodeProblem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  url: string;
  description: string;
  approach: string;
  javaSnippet: string;
}

export interface ExperimentSection {
  introduction: string;
  objective: string;
  videoUrl: string;
  videoTitle: string;
  videoChannel: string;
  prerequisites: string[];
  theory: {
    overview: string;
    keyConcepts: { title: string; desc: string }[];
    complexities: ComplexityEntry[];
    realWorldApplications: string[];
  };
  procedure: string[];
  sampleCode: {
    language: "java" | "python" | "sql" | "c" | "bash" | string;
    code: string;
  };
  recursionPreset?: {
    functionName: string;
    sampleCall: string;
    javaCode: string;
    description: string;
  };
  leetcodeProblems: LeetCodeProblem[];
  expectedOutput: string;
  targetAudience: {
    ug: string[];
    pg: string[];
  };
}

export interface Experiment {
  id: string;
  labId: string;
  title: string;
  slug: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category:
    | "Data Science"
    | "Computer Networks"
    | "Linear Structures"
    | "Sorting Algorithms"
    | "Trees & Graphs"
    | "Machine Learning"
    | "Databases"
    | "Operating Systems"
    | "Java OOP"
    | "Artificial Intelligence"
    | "Big Data Analytics"
    | "Cloud Computing"
    | string;
  estimatedMinutes: number;
  rating: number;
  ratingsCount: number;
  simulator: "stack" | "queue" | "linked-list" | "bubble-sort" | "selection-sort" | "insertion-sort" | "recursion" | "binary-tree" | "custom" | string;
  quizId: string;
  sections: ExperimentSection;
}

export interface MLPrerequisiteTopic {
  id: string;
  title: string;
  category: "NumPy" | "Pandas" | "Matplotlib" | "Math Foundations";
  duration: string;
  videoUrl: string;
  summary: string;
  keyFunctions: string[];
}

export const ML_PREREQUISITES_DATA: MLPrerequisiteTopic[] = [
  // 12 NumPy Master Modules
  {
    id: "numpy-1",
    title: "Module 1: Introduction to NumPy & ndarray Basics",
    category: "NumPy",
    duration: "14 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Understand why NumPy is 50x faster than Python lists due to contiguous C-memory buffers and homogeneous typing.",
    keyFunctions: ["np.array()", "arr.ndim", "arr.shape", "arr.dtype"],
  },
  {
    id: "numpy-2",
    title: "Module 2: Array Creation Routines & Constants",
    category: "NumPy",
    duration: "18 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Generate zeros, ones, identity matrices, linear ranges, and logarithmically spaced tensors.",
    keyFunctions: ["np.zeros()", "np.ones()", "np.eye()", "np.arange()", "np.linspace()"],
  },
  {
    id: "numpy-3",
    title: "Module 3: 1D & Multi-Dimensional Array Indexing",
    category: "NumPy",
    duration: "20 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Master row/column sub-matrix access, negative indexing, and dimensional slicing syntax.",
    keyFunctions: ["arr[i, j]", "arr[:, 0]", "arr[1:4, 2:5]"],
  },
  {
    id: "numpy-4",
    title: "Module 4: Array Slicing & Views vs Deep Copies",
    category: "NumPy",
    duration: "16 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Prevent unintended memory mutation by mastering NumPy views vs copy operations.",
    keyFunctions: ["arr.copy()", "arr.base", "arr.view()"],
  },
  {
    id: "numpy-5",
    title: "Module 5: Boolean Masking & Conditional Filtering",
    category: "NumPy",
    duration: "22 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Filter matrices with logical predicates, bitwise & / | conditions, and conditional assignment.",
    keyFunctions: ["arr[arr > 0]", "np.where()", "np.logical_and()"],
  },
  {
    id: "numpy-6",
    title: "Module 6: Broadcasting Rules & Multi-Dimensional Arithmetic",
    category: "NumPy",
    duration: "25 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "How NumPy stretches trailing dimensions of disparate shapes for vectorized operations without memory duplication.",
    keyFunctions: ["(M, 1) + (1, N)", "Broadcasting Rules", "np.newaxis"],
  },
  {
    id: "numpy-7",
    title: "Module 7: Universal Functions (ufuncs) & Vectorized Math",
    category: "NumPy",
    duration: "19 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Element-wise compiled C functions for trigonometric, logarithmic, and arithmetic transforms.",
    keyFunctions: ["np.sin()", "np.exp()", "np.log()", "np.sqrt()"],
  },
  {
    id: "numpy-8",
    title: "Module 8: Statistical Reductions & Aggregation Across Axes",
    category: "NumPy",
    duration: "20 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Compute means, medians, variances, and sums across axis=0 (columns) and axis=1 (rows).",
    keyFunctions: ["np.mean(axis=0)", "np.std()", "np.sum()", "np.argmax()"],
  },
  {
    id: "numpy-9",
    title: "Module 9: Linear Algebra & Matrix Multiplication (Dot Product)",
    category: "NumPy",
    duration: "24 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Perform matrix products, determinant evaluations, and solve linear systems Ax = b.",
    keyFunctions: ["np.dot(A, B)", "A @ B", "np.linalg.inv()", "np.linalg.det()"],
  },
  {
    id: "numpy-10",
    title: "Module 10: Array Stacking, Concatenation & Splitting",
    category: "NumPy",
    duration: "17 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Horizontally and vertically stack training features and split datasets into folds.",
    keyFunctions: ["np.vstack()", "np.hstack()", "np.concatenate()", "np.split()"],
  },
  {
    id: "numpy-11",
    title: "Module 11: Random Number Generation & Distributions for ML",
    category: "NumPy",
    duration: "21 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Initialize neural network weights with Gaussian normal distributions and seeded permutations.",
    keyFunctions: ["np.random.randn()", "np.random.seed(42)", "np.random.choice()"],
  },
  {
    id: "numpy-12",
    title: "Module 12: Fast I/O, Saving Arrays & Performance Profiling",
    category: "NumPy",
    duration: "15 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Save binary .npy / .npz tensors to disk and benchmark vectorization against standard Python loops.",
    keyFunctions: ["np.save()", "np.load()", "np.savez_compressed()"],
  },
  // Pandas Series
  {
    id: "pandas-1",
    title: "Pandas Master: Series, DataFrames & Reading CSV/JSON",
    category: "Pandas",
    duration: "30 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
    summary: "Structured data representations, index labels, column selection, and CSV data ingestion.",
    keyFunctions: ["pd.read_csv()", "df.head()", "df.info()", "df.describe()"],
  },
  {
    id: "pandas-2",
    title: "Pandas Master: Data Cleaning, Missing Values & GroupBy",
    category: "Pandas",
    duration: "35 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
    summary: "Handle NaNs with imputation, drop duplicates, encode categorical values, and execute GroupBy aggregations.",
    keyFunctions: ["df.dropna()", "df.fillna()", "df.groupby()", "pd.get_dummies()"],
  },
  // Matplotlib / Seaborn
  {
    id: "plot-1",
    title: "Matplotlib & Seaborn: Data Exploration & Heatmaps",
    category: "Matplotlib",
    duration: "28 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/UO98lJQ3QGI",
    summary: "Visualize distributions with histograms, scatter plots, feature correlations with heatmaps, and pair plots.",
    keyFunctions: ["plt.scatter()", "sns.heatmap()", "sns.pairplot()", "plt.show()"],
  },
];

export const EXPERIMENTS_DATA: Experiment[] = [
  ...DATA_SCIENCE_EXPERIMENTS,
  ...NETWORKS_EXPERIMENTS,
  ...ML_EXPERIMENTS,
  ...OS_EXPERIMENTS,
  ...OOPS_JAVA_EXPERIMENTS,
  ...DSA_EXPERIMENTS,
  ...DBMS_EXPERIMENTS,
  ...C_PROGRAMMING_EXPERIMENTS,
  ...PYTHON_PROGRAMMING_EXPERIMENTS,
  ...ADVANCED_LABS_EXPERIMENTS,
];
