import { MaterialContent } from "./types";

export const DATA_SCIENCE_MATERIALS: Record<string, MaterialContent> = {
  "data-science-numpy-gfg": {
    id: "data-science-numpy-gfg",
    title: "NumPy Tutorial — Vectorized Data Processing in Python",
    subject: "Data Science and Analytics Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "NumPy & Vectorization",
    readTime: "20 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/data-science-analytics",
    simulatorName: "Data Science Computing Suite",
    overview:
      "NumPy (Numerical Python) is the foundational open-source library for scientific computing in Python. It provides the high-performance N-dimensional array object (ndarray), contiguous memory storage in C-order or Fortran-order, vectorized arithmetic operations that bypass Python loop overhead via SIMD instructions, and broadcasting mechanisms for mismatched matrix shapes.",
    learningObjectives: [
      "Master NumPy ndarray creation via arange, linspace, zeros, and ones",
      "Understand multi-dimensional indexing, slicing views vs memory copies",
      "Apply matrix broadcasting rules across dimensions without copying data",
      "Perform high-performance linear algebra: dot products, matrix inverse, and eigenvalues",
      "Implement vectorized normalization, boolean masking, and statistical aggregations"
    ],
    keyConcepts: [
      {
        title: "1. The ndarray Architecture & Contiguous Memory",
        description:
          "Unlike standard Python lists that store pointers to boxed integer objects scattered across memory, a NumPy ndarray stores a contiguous block of homogeneous memory with a stride metadata vector.",
        points: [
          "Memory Layout: Stores data as raw bytes with itemsize and shape tuple.",
          "Strides: Step sizes in bytes to jump to the next element in each dimension.",
          "Slicing returns a view, not a copy: modifying a slice directly modifies the base array unless .copy() is explicitly called.",
          "Type Coercion: Homogeneous typing (float64, int32, etc.) enables CPU cache locality and SIMD parallelization."
        ]
      },
      {
        title: "2. The NumPy Broadcasting Rules",
        description:
          "Broadcasting enables arithmetic operations between arrays of different shapes without allocating redundant memory copies.",
        points: [
          "Rule 1: If arrays have different dimensions, prepend 1 to the shape of the smaller array.",
          "Rule 2: Two dimensions are compatible if they are equal, or if one of them is 1.",
          "Rule 3: If neither dimension is 1 and they do not match, a ValueError (shapes cannot be broadcast) is raised.",
          "Example: A (4, 3) matrix multiplied by a (3,) vector expands the vector along axis 0 into virtual shape (4, 3) with zero extra memory."
        ]
      },
      {
        title: "3. Universal Functions (ufuncs) & Vectorization",
        description:
          "Universal functions perform element-by-element operations on ndarrays written in compiled C code, executing up to 100x faster than native Python for-loops.",
        points: [
          "Unary ufuncs: np.sqrt(), np.exp(), np.log(), np.abs().",
          "Binary ufuncs: np.add(), np.maximum(), np.power().",
          "Aggregations: np.sum(axis=0) compresses rows, np.mean(axis=1) computes row averages."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Initialize Matrix & Inspect Metadata",
        description: "Create a 2D ndarray, verify dtype, shape, strides, and memory alignment."
      },
      {
        step: 2,
        title: "Apply Boolean Masking & Conditional Filtering",
        description: "Generate a boolean condition array (e.g. A > threshold) and filter elements in O(N)."
      },
      {
        step: 3,
        title: "Vectorized Z-Score Normalization",
        description: "Compute mean and standard deviation along axis=0; broadcast subtraction and division: Z = (X - mean) / std."
      }
    ],
    codeSnippets: {
      python: `import numpy as np

# 1. Create 2D Array and inspect memory layout
arr = np.array([[10, 20, 30], [40, 50, 60], [70, 80, 90]], dtype=np.float64)
print("Shape:", arr.shape, "Strides:", arr.strides)

# 2. Broadcasting: Subtract column means (axis=0)
col_means = np.mean(arr, axis=0) # shape (3,)
col_stds = np.std(arr, axis=0)   # shape (3,)

# Vectorized Z-Score Normalization
z_normalized = (arr - col_means) / col_stds
print("Z-Score Normalized Matrix:\\n", z_normalized)

# 3. Matrix Multiplication via @ operator
identity = np.eye(3)
product = arr @ identity
print("Matrix Multiplication Match:", np.allclose(arr, product))

# 4. Boolean Masking
outliers = arr[arr > 50]
print("Elements > 50:", outliers)`
    },
    complexityAnalysis: {
      timeComplexity: "O(1) for slicing/striding views; O(N) for elementwise arithmetic; O(N^2.8) for matrix multiplication",
      spaceComplexity: "O(N) contiguous homogeneous memory buffer with zero pointer overhead",
      bestCase: "O(1) when using views and stride manipulations",
      worstCase: "O(N) when forced to copy non-contiguous memory chunks",
      notes: "NumPy leverages BLAS / LAPACK libraries under the hood for hardware-accelerated linear algebra operations."
    },
    vivaQuestions: [
      {
        question: "Why is a NumPy ndarray significantly faster than a Python standard list?",
        answer: "A Python list is an array of pointers to heterogeneous heap objects (incurring cache misses and unboxing overhead), whereas ndarray stores contiguous homogeneous raw data in memory with direct C-level vectorization and SIMD instruction execution."
      },
      {
        question: "What is the difference between a copy and a view in NumPy?",
        answer: "A view shares the exact same underlying data buffer as the original array and only alters shape/strides metadata, meaning changes to the view reflect in the original. A copy allocates completely new memory."
      },
      {
        question: "State the three conditions required for NumPy broadcasting.",
        answer: "Working backwards from the trailing dimensions: either the dimensions are equal, or one of the dimensions is 1. If either condition fails, broadcasting is disallowed and raises a ValueError."
      }
    ],
    realWorldApplications: [
      "Image processing pixel tensors in OpenCV and Pillow (RGB 3D ndarrays)",
      "Weights and gradients representation in PyTorch and TensorFlow",
      "Signal processing and Fourier Transforms (FFT) in audio engineering",
      "Financial time series return calculations and risk variance matrices"
    ],
    practiceProblems: [
      {
        title: "Min-Max Feature Scaler",
        difficulty: "Easy",
        description: "Given a 2D array of student marks, write a vectorized function to normalize each column to the [0, 1] range using np.min and np.max."
      },
      {
        title: "Matrix Inversion & Linear System Solver",
        difficulty: "Medium",
        description: "Solve a system of 3 linear equations Ax = B using np.linalg.solve() and verify that A @ x equals B."
      }
    ]
  },

  "data-science-pandas-gfg": {
    id: "data-science-pandas-gfg",
    title: "Pandas DataFrame & Data Science Complete Handbook",
    subject: "Data Science and Analytics Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "Pandas & Data Wrangling",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/data-science-analytics",
    simulatorName: "Data Science Computing Suite",
    overview:
      "Pandas is the premier data manipulation and wrangling library for Python. It introduces two primary data structures: the 1D labeled Series and the 2D tabular DataFrame. Pandas provides robust tools for handling missing data, alignment by index, high-performance split-apply-combine (groupby) aggregations, and reshaping pipelines.",
    learningObjectives: [
      "Distinguish between label-based indexing (.loc) and integer position-based indexing (.iloc)",
      "Detect, impute, and drop missing values (NaN/None) using mean, median, and forward-fill strategies",
      "Execute complex Split-Apply-Combine transformations using .groupby() and .agg()",
      "Merge, join, and concatenate multiple tabular datasets based on relational keys",
      "Export and import structured datasets across CSV, Excel, Parquet, and SQL databases"
    ],
    keyConcepts: [
      {
        title: "1. Series vs DataFrame Architecture",
        description:
          "A Series is a one-dimensional labeled array capable of holding any data type. A DataFrame is a two-dimensional tabular data structure with labeled axes (rows and columns).",
        points: [
          "Explicit Index: Every row has an index label allowing alignment during arithmetic operations.",
          "Under the Hood: Pandas stores each column as a NumPy ndarray or specialized extension array.",
          "loc vs iloc: df.loc['a':'c', 'Col1'] matches explicit index labels; df.iloc[0:2, 0] matches zero-based integer offsets."
        ]
      },
      {
        title: "2. Missing Value Imputation Pipeline",
        description:
          "Real-world data is often incomplete. Pandas uses float NaN (Not a Number) to represent missing numerical data.",
        points: [
          "Detection: df.isna().sum() calculates null counts per column.",
          "Dropping: df.dropna(subset=['id'], how='any') removes corrupt rows.",
          "Imputation: df['age'].fillna(df['age'].median(), inplace=True) prevents distribution distortion caused by outliers."
        ]
      },
      {
        title: "3. Split-Apply-Combine (GroupBy)",
        description:
          "The core data analysis pattern involves splitting data into groups based on criteria, applying an aggregation or transformation, and combining results into a new summary table.",
        points: [
          "Aggregation: df.groupby('department')['salary'].agg(['mean', 'max', 'count']).",
          "Transformation: df.groupby('department')['salary'].transform(lambda x: x - x.mean()).",
          "Filtering: df.groupby('dept').filter(lambda x: len(x) > 10)."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Data Ingestion & Integrity Check",
        description: "Read CSV via pd.read_csv(), verify df.info(), df.describe(), and detect missing values."
      },
      {
        step: 2,
        title: "Data Cleaning & Type Casting",
        description: "Impute numerical columns with median, categorical columns with mode, and parse datetime strings."
      },
      {
        step: 3,
        title: "Feature Engineering & Aggregation",
        description: "Create derived columns, execute groupby aggregation, and sort results by primary metrics."
      }
    ],
    codeSnippets: {
      python: `import pandas as pd
import numpy as np

# 1. Create Sample Academic Dataset
data = {
    'StudentID': [101, 102, 103, 104, 105, 106],
    'Department': ['AIDS', 'AIDS', 'CSE', 'CSE', 'ECE', 'ECE'],
    'Semester': [4, 4, 4, 4, 4, 4],
    'Score': [88.5, np.nan, 92.0, 78.5, np.nan, 84.0],
    'Attendance': [95, 82, 89, 74, 91, 88]
}
df = pd.DataFrame(data)

# 2. Impute Missing Scores with Departmental Median
df['Score'] = df.groupby('Department')['Score'].transform(
    lambda x: x.fillna(x.median())
)

# 3. GroupBy Aggregation: Performance Summary
summary = df.groupby('Department').agg(
    Avg_Score=('Score', 'mean'),
    Max_Score=('Score', 'max'),
    Avg_Attendance=('Attendance', 'mean'),
    Student_Count=('StudentID', 'count')
).reset_index()

print("Cleaned Dataset:\\n", df)
print("\\nDepartmental Performance Summary:\\n", summary)`
    },
    complexityAnalysis: {
      timeComplexity: "O(N) for column selection and arithmetic; O(N log N) for hash-based groupby and sorting",
      spaceComplexity: "O(N * M) tabular memory with column block managers",
      bestCase: "O(N) for linear single-pass aggregations",
      worstCase: "O(N log N) when performing multi-key merges or sorting",
      notes: "For massive tables exceeding RAM, Pandas can read chunks via pd.read_csv(chunksize=100000)."
    },
    vivaQuestions: [
      {
        question: "Explain the difference between .loc and .iloc in Pandas.",
        answer: ".loc is strictly label-based (it references index labels and column names, and slice endpoints are inclusive), whereas .iloc is strictly integer position-based (zero-indexed offsets, with exclusive slice endpoints)."
      },
      {
        question: "Why should we impute missing numerical data with median instead of mean?",
        answer: "The mean is sensitive to extreme outliers, which can skew the imputed value. The median represents the 50th percentile and is robust against skewed distributions and extreme outliers."
      },
      {
        question: "What is the return type of a single column extraction from a DataFrame?",
        answer: "Extracting a single column with df['Column'] returns a Pandas Series object; extracting with double brackets df[['Column']] returns a 1-column DataFrame."
      }
    ],
    realWorldApplications: [
      "ETL data pipelines for enterprise data warehouses",
      "Customer churn analytics and transactional cohort analysis",
      "Financial portfolio balance sheet and risk reporting",
      "Clinical medical trial data cleaning and patient record consolidation"
    ],
    practiceProblems: [
      {
        title: "Pivot Table Sales Analysis",
        difficulty: "Medium",
        description: "Given a retail dataset, construct a pivot table displaying total sales indexed by Region and segmented by Product Category across Quarters."
      }
    ]
  },

  "data-science-stats-gfg": {
    id: "data-science-stats-gfg",
    title: "Hypothesis Testing in Python (Z-test, T-test, ANOVA)",
    subject: "Data Science and Analytics Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "Inferential Statistics",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/data-science-analytics",
    simulatorName: "Data Science Computing Suite",
    overview:
      "Hypothesis testing is the cornerstone of inferential statistics. It provides a formal framework to determine whether empirical observations in sample data reflect genuine population effects or mere random chance. This guide details the formulation of Null (H0) and Alternative (H1) hypotheses, significance levels (alpha), p-values, Z-tests, Student's t-tests, and One-Way ANOVA.",
    learningObjectives: [
      "Formulate Null (H0) and Alternative (H1) hypotheses for experimental trials",
      "Select the appropriate statistical test based on sample size (N) and population variance knowledge",
      "Execute One-Sample and Two-Sample Z-tests using statsmodels",
      "Execute Independent and Paired Student's T-tests using scipy.stats",
      "Perform One-Way Analysis of Variance (ANOVA) and interpret the F-statistic"
    ],
    keyConcepts: [
      {
        title: "1. The Hypothesis Testing Protocol & P-Values",
        description:
          "Statistical testing evaluates whether to reject the Null Hypothesis (H0: no effect) in favor of the Alternative Hypothesis (H1: true effect).",
        points: [
          "Significance Level (alpha): Typically 0.05 (5% probability of Type I error).",
          "P-Value: The probability of obtaining test results at least as extreme as the observed results, assuming H0 is true.",
          "Decision Rule: If p-value < alpha, Reject H0 (statistically significant); if p-value >= alpha, Fail to Reject H0."
        ]
      },
      {
        title: "2. Z-Test vs Student's T-Test Selection",
        description:
          "Choose between Z-test and T-test depending on whether population variance is known and the sample size N.",
        points: [
          "Z-Test: Used when population variance (sigma^2) is known and N >= 30. Follows standard Normal distribution N(0, 1).",
          "T-Test: Used when population variance is unknown and estimated via sample variance (s^2), especially when N < 30. Follows Student's t-distribution with (N - 1) degrees of freedom.",
          "Paired T-Test: Compares pre-treatment vs post-treatment measurements on the same subjects."
        ]
      },
      {
        title: "3. One-Way ANOVA (Analysis of Variance)",
        description:
          "ANOVA tests whether the means of three or more independent groups are statistically equal.",
        points: [
          "F-Statistic: Ratio of Between-Group Variance (MSB) to Within-Group Variance (MSW).",
          "F = MSB / MSW: High F indicates between-group differences outweigh random within-group noise.",
          "Assumption: Normal distributions, homogeneity of variance (Levene's test), and independent samples."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Formulate Hypotheses",
        description: "Define H0: mu1 = mu2 (no difference) and H1: mu1 != mu2 (two-tailed difference)."
      },
      {
        step: 2,
        title: "Compute Test Statistic & P-Value",
        description: "Calculate t-statistic using sample means, pooled standard deviation, and sample sizes."
      },
      {
        step: 3,
        title: "State Conclusion",
        description: "Compare p-value against alpha=0.05. Report confidence interval and statistical conclusion."
      }
    ],
    codeSnippets: {
      python: `import numpy as np
from scipy import stats

# 1. Independent Two-Sample T-Test
# Group A: Traditional Teaching (N=25)
# Group B: Virtual Labs Teaching (N=25)
np.random.seed(42)
group_traditional = np.random.normal(loc=72.0, scale=8.0, size=25)
group_vlab = np.random.normal(loc=81.5, scale=7.5, size=25)

t_stat, p_val_t = stats.ttest_ind(group_traditional, group_vlab)
print(f"T-Test: t-statistic = {t_stat:.4f}, p-value = {p_val_t:.4e}")
if p_val_t < 0.05:
    print("Conclusion: Reject H0! Virtual Labs significantly improved exam performance.")
else:
    print("Conclusion: Fail to reject H0.")

# 2. One-Way ANOVA (3 Teaching Methods)
method_A = [78, 82, 85, 79, 81]
method_B = [88, 91, 87, 89, 90]
method_C = [65, 70, 72, 68, 69]

f_stat, p_val_f = stats.f_oneway(method_A, method_B, method_C)
print(f"\\nOne-Way ANOVA: F-statistic = {f_stat:.4f}, p-value = {p_val_f:.4e}")
if p_val_f < 0.05:
    print("Conclusion: Significant difference exists between at least two methods.")`
    },
    complexityAnalysis: {
      timeComplexity: "O(N) for calculating sample means, sums of squares, and variances",
      spaceComplexity: "O(1) auxiliary space beyond the sample input vectors",
      bestCase: "O(N) single pass",
      worstCase: "O(N) single pass",
      notes: "SciPy uses compiled C/Fortran routines (Cephes library) for rapid statistical distribution integrals."
    },
    vivaQuestions: [
      {
        question: "What is a Type I error versus a Type II error?",
        answer: "A Type I error (false positive) occurs when you reject the true Null Hypothesis (probability alpha). A Type II error (false negative) occurs when you fail to reject a false Null Hypothesis (probability beta)."
      },
      {
        question: "Why can't we just run multiple two-sample t-tests instead of ANOVA for 4 groups?",
        answer: "Running multiple pairwise t-tests causes Family-Wise Error Rate inflation: for k=4 groups (6 tests), the overall chance of at least one false positive escalates to 1 - (1 - 0.05)^6 ≈ 26.5%. ANOVA controls this alpha error globally."
      },
      {
        question: "What does a p-value of 0.02 mean at alpha = 0.05?",
        answer: "It means there is only a 2% chance of observing these results if the Null Hypothesis were true. Since 0.02 < 0.05, we reject the Null Hypothesis and conclude the effect is statistically significant."
      }
    ],
    realWorldApplications: [
      "A/B testing of e-commerce landing page conversion rates",
      "Clinical pharmaceutical drug efficacy trials vs placebo",
      "Educational technology learning outcome validation across batches",
      "Manufacturing quality control defect tolerance verification"
    ],
    practiceProblems: [
      {
        title: "Paired T-Test on Weight Loss Intervention",
        difficulty: "Medium",
        description: "Given pre-diet and post-diet weights for 20 individuals, perform a paired t-test using stats.ttest_rel() and state whether the weight loss was statistically significant at 95% confidence."
      }
    ]
  },

  "data-science-w3schools": {
    id: "data-science-w3schools",
    title: "W3Schools Python Data Science & Matplotlib Guide",
    subject: "Data Science and Analytics Laboratory",
    provider: "W3Schools Reference",
    category: "Data Visualization & Plotting",
    readTime: "15 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/data-science-analytics",
    simulatorName: "Data Science Computing Suite",
    overview:
      "Matplotlib is Python's standard 2D plotting library. In this W3Schools-curated laboratory guide, students learn the object-oriented API (Figure and Axes), line graphs, scatter plots with regression trends, histograms for frequency distribution analysis, box plots for outlier detection, and multi-panel subplot dashboards.",
    learningObjectives: [
      "Understand the Figure vs Axes object-oriented plotting paradigm",
      "Construct line charts, bar plots, and scatter plots with custom markers and colors",
      "Plot histograms with frequency bins and normal distribution curve overlays",
      "Visualize interquartile ranges (IQR) and outliers using box plots",
      "Assemble publication-ready multi-panel subplot grids with labels and legends"
    ],
    keyConcepts: [
      {
        title: "1. The Object-Oriented Figure vs Axes Hierarchy",
        description:
          "Rather than using the state-machine plt.plot(), production data science uses fig, ax = plt.subplots().",
        points: [
          "Figure: The top-level canvas containing one or more plot panels.",
          "Axes: The actual plot area containing data, x/y ticks, labels, and title.",
          "Scalability: Allows easy manipulation of multi-panel dashboards without global state conflicts."
        ]
      },
      {
        title: "2. Common Statistical Plots",
        description:
          "Different analytical questions require distinct visual encodings.",
        points: [
          "Scatter Plot: Explores correlation and clusters between two continuous variables.",
          "Histogram: Visualizes probability density, skewness, and modality.",
          "Box Plot: Displays median, 25th percentile (Q1), 75th percentile (Q3), whiskers (1.5 * IQR), and outlier dots."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Initialize Canvas",
        description: "Create Figure and Axes with defined dimensions and DPI."
      },
      {
        step: 2,
        title: "Render Visual Encodings",
        description: "Plot data points, customize markers, line styles, and color palettes."
      },
      {
        step: 3,
        title: "Add Annotations & Legends",
        description: "Set axis titles, grids, legend positions, and export via fig.savefig()."
      }
    ],
    codeSnippets: {
      python: `import matplotlib.pyplot as plt
import numpy as np

# Generate Synthetic Experimental Data
np.random.seed(42)
study_hours = np.random.uniform(2, 12, 50)
exam_scores = 40 + 5.2 * study_hours + np.random.normal(0, 4, 50)

# Create 1x2 Subplot Dashboard
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Subplot 1: Scatter Plot with OLS Trendline
ax1.scatter(study_hours, exam_scores, color='#0284c7', alpha=0.8, edgecolors='black', label='Students')
m, c = np.polyfit(study_hours, exam_scores, 1)
ax1.plot(study_hours, m * study_hours + c, color='#dc2626', linewidth=2, label=f'Trend: y={m:.1f}x+{c:.1f}')
ax1.set_title('Study Hours vs Exam Score')
ax1.set_xlabel('Hours Studied')
ax1.set_ylabel('Exam Marks')
ax1.legend()
ax1.grid(True, linestyle='--', alpha=0.5)

# Subplot 2: Score Distribution Histogram
ax2.hist(exam_scores, bins=10, color='#059669', edgecolor='black', alpha=0.7)
ax2.axvline(np.mean(exam_scores), color='red', linestyle='dashed', linewidth=2, label=f'Mean: {np.mean(exam_scores):.1f}')
ax2.set_title('Score Distribution')
ax2.set_xlabel('Exam Marks')
ax2.set_ylabel('Frequency')
ax2.legend()
ax2.grid(True, linestyle='--', alpha=0.5)

plt.tight_layout()
plt.show()`
    },
    complexityAnalysis: {
      timeComplexity: "O(N) for rendering points and line primitives",
      spaceComplexity: "O(N) raster buffer in GPU/CPU display memory",
      bestCase: "O(N) single rendering pass",
      worstCase: "O(N) single rendering pass",
      notes: "Matplotlib supports vector graphics output (SVG, PDF) for lossless academic publication print quality."
    },
    vivaQuestions: [
      {
        question: "What is the difference between plt.subplot() and plt.subplots()?",
        answer: "plt.subplot() is a stateful convenience function that creates one subplot at a time, whereas plt.subplots() returns the overall Figure object and an array of Axes objects for clean object-oriented manipulation."
      },
      {
        question: "How does a box plot define an outlier?",
        answer: "An outlier is defined as any observation that falls below Q1 - 1.5 * IQR or above Q3 + 1.5 * IQR, where IQR (Interquartile Range) = Q3 - Q1."
      }
    ],
    realWorldApplications: [
      "Real-time monitoring dashboards for IoT sensor fleets",
      "Financial stock market candlestick and volume analysis",
      "Genomic sequencing heatmaps and phylogenetic trees"
    ],
    practiceProblems: [
      {
        title: "Multi-Series Bar Chart",
        difficulty: "Easy",
        description: "Plot grouped bar charts comparing Semester 3 vs Semester 4 pass percentages across 4 engineering departments."
      }
    ]
  }
};
