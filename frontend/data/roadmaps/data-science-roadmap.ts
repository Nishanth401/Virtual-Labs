import { DSACategory } from "../dsa-topic-data";

export const DATA_SCIENCE_ROADMAP_CATEGORIES: DSACategory[] = [
  {
    id: "ds-foundations",
    name: "1. Python Data Foundations",
    shortDesc: "NumPy vectorization, Pandas DataFrames, and Matplotlib plotting.",
    iconName: "Code2",
    topics: [
      {
        id: "ds-numpy-arrays",
        slug: "working-with-numpy-arrays",
        title: "Exp 1: Working with NumPy arrays",
        categoryId: "ds-foundations",
        categoryName: "1. Python Data Foundations",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "Python NumPy arrays indexing broadcasting",
        gfgUrl: "https://www.geeksforgeeks.org/numpy-tutorial/",
        quickSummary: "NumPy arrays provide memory-efficient, contiguous C-buffers with vectorized mathematical operations.",
        keyPoints: [
          "Contiguous C-buffer storage eliminates Python pointer indirection.",
          "Broadcasting automatically aligns trailing matrix dimensions without copying data.",
          "Vectorized universal functions (ufuncs) achieve near C-speed execution."
        ],
        diagramTitle: "NumPy 2D Array Memory Buffer & Vectorized Operations",
        diagram: `┌───────────────────────────────────────────────┐
│              NumPy 2D ndarray Buffer          │
├───────────────┬───────────────┬───────────────┤
│ [0, 0] = 10   │ [0, 1] = 20   │ [0, 2] = 30   │  Row 0 (Stride: 24 bytes)
├───────────────┼───────────────┼───────────────┤
│ [1, 0] = 40   │ [1, 1] = 50   │ [1, 2] = 60   │  Row 1 (Stride: 24 bytes)
└───────────────┴───────────────┴───────────────┘
              ▲                 │
              │ Vector Addition │ arr * 2 + 5 (SIMD Parallel)
              ▼                 ▼
        [25, 45, 65, 85, 105, 125] (Instant Result)`,
        complexities: [
          { operation: "Array Element Indexing", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Vectorized Arithmetic (+, *, @)", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
          { operation: "Matrix Multiplication (X @ W)", best: "O(n^2.8)", avg: "O(n^3)", worst: "O(n^3)", space: "O(n*m)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (NumPy)",
            code: `import numpy as np

# 1. Array Creation & Attributes
arr = np.array([[10, 20, 30], [40, 50, 60]], dtype=np.float64)
print(f"Shape: {arr.shape}, Dtype: {arr.dtype}, Dimensions: {arr.ndim}")

# 2. Slicing & Striding
print("Sub-matrix (Row 0, Cols 1..2):", arr[0, 1:])

# 3. Broadcasting & Vectorized Math
scaled = (arr * 2.5) + 10.0
print("Vectorized result:\\n", scaled)

# 4. Matrix Multiplication
weights = np.array([[1.0], [2.0], [3.0]])
output = arr @ weights
print("Matrix Product (arr @ weights):\\n", output)`
          }
        ],
        practiceProblems: [
          {
            title: "Array Transformation & Matrix Vectorization",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/numpy-array-creation/",
            platform: "GeeksforGeeks",
            topicTag: "NumPy"
          }
        ]
      },
      {
        id: "ds-pandas-dfs",
        slug: "working-with-pandas-data-frames",
        title: "Exp 2: Working with Pandas data frames",
        categoryId: "ds-foundations",
        categoryName: "1. Python Data Foundations",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Pandas DataFrame manipulation indexing groupby",
        gfgUrl: "https://www.geeksforgeeks.org/pandas-tutorial/",
        quickSummary: "Pandas DataFrames provide tabular data structures with labeled axes, missing value handling, and grouping.",
        keyPoints: [
          "DataFrame aligns heterogeneous columns with row/column indexes.",
          ".loc provides label-based indexing while .iloc provides integer-position indexing.",
          "Groupby enables the Split-Apply-Combine statistical pipeline."
        ],
        diagramTitle: "Pandas Split-Apply-Combine Pipeline",
        diagram: `┌──────────────────────────────────────────────┐
│ Raw DataFrame (Student, Dept, Score, Lab)    │
└──────────────────────┬───────────────────────┘
                       │ groupby('Dept')
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
┌──────────────┐┌──────────────┐┌──────────────┐
│ AIDS Group   ││ CSE Group    ││ ECE Group    │
└──────┬───────┘└──────┬───────┘└──────┬───────┘
       │ mean()        │ mean()        │ mean()
       └───────────────┼───────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│ Aggregated Output (Dept -> Mean Score)       │
└──────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Column Access df['col']", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Row Filtering (Boolean Mask)", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
          { operation: "Groupby Aggregation", best: "O(n)", avg: "O(n log k)", worst: "O(n log n)", space: "O(k)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Pandas)",
            code: `import pandas as pd
import numpy as np

# 1. Create DataFrame
data = {
    "StudentID": [101, 102, 103, 104, 105],
    "Name": ["Alice", "Bob", "Charlie", "Diana", "Evan"],
    "Dept": ["AIDS", "AIDS", "CSE", "AIDS", "CSE"],
    "LabMarks": [94.5, 88.0, np.nan, 91.0, 78.5],
    "Attendance": [95, 88, 72, 98, 85]
}
df = pd.DataFrame(data)

# 2. Impute Missing Values
df["LabMarks"] = df["LabMarks"].fillna(df["LabMarks"].mean())

# 3. Filtering & Selection
high_scorers = df[df["LabMarks"] >= 90.0]
print("High Scorers:\\n", high_scorers[["Name", "LabMarks"]])

# 4. GroupBy Aggregation
summary = df.groupby("Dept").agg(
    AvgMarks=("LabMarks", "mean"),
    AvgAttendance=("Attendance", "mean"),
    TotalStudents=("StudentID", "count")
)
print("\\nDepartment Summary:\\n", summary)`
          }
        ],
        practiceProblems: [
          {
            title: "Pandas DataFrame Filtering & Aggregation",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/pandas-dataframe-group-by/",
            platform: "GeeksforGeeks",
            topicTag: "Pandas"
          }
        ]
      },
      {
        id: "ds-matplotlib-plots",
        slug: "basic-plots-using-matplotlib",
        title: "Exp 3: Basic plots using Matplotlib",
        categoryId: "ds-foundations",
        categoryName: "1. Python Data Foundations",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "Matplotlib plotting subplots line bar histogram",
        gfgUrl: "https://www.geeksforgeeks.org/matplotlib-tutorial/",
        quickSummary: "Matplotlib Pyplot enables custom 2D visualization: line plots, bar charts, scatter plots, and histograms.",
        keyPoints: [
          "Figure and Axes hierarchy provides granular control over subplots.",
          "Histograms visualize continuous probability distributions.",
          "Labels, legends, color maps, and gridlines make charts publication-ready."
        ],
        diagramTitle: "Matplotlib Canvas & Subplot Grid Architecture",
        diagram: `┌────────────────────────────────────────────────────────┐
│ Figure Canvas (figsize=(10, 6), dpi=150)               │
│                                                        │
│  ┌───────────────────────┐    ┌──────────────────────┐ │
│  │ Ax1: Line Trend       │    │ Ax2: Bar Distribution│ │
│  │  ▲ y=f(x)             │    │  ▲ [||| |  || ]      │ │
│  │  └─────────► Time     │    │  └─────────► Category│ │
│  └───────────────────────┘    └──────────────────────┘ │
│  ┌───────────────────────┐    ┌──────────────────────┐ │
│  │ Ax3: Scatter Plot     │    │ Ax4: Histogram       │ │
│  │  ▲  . : .  .          │    │  ▲    _/\_           │ │
│  │  └─────────► Feature  │    │  └─────────► Bins    │ │
│  └───────────────────────┘    └──────────────────────┘ │
└────────────────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Line Plot Generation", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
          { operation: "Histogram Binning", best: "O(n log k)", avg: "O(n)", worst: "O(n)", space: "O(k)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Matplotlib)",
            code: `import matplotlib.pyplot as plt
import numpy as np

# Generate Sample Distribution
np.random.seed(42)
epochs = np.arange(1, 21)
train_loss = 1.0 / (epochs ** 0.5) + np.random.normal(0, 0.02, 20)
val_loss = 1.1 / (epochs ** 0.45) + np.random.normal(0, 0.03, 20)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# 1. Line Plot: Training Curve
ax1.plot(epochs, train_loss, 'b-o', label='Train Loss', linewidth=2)
ax1.plot(epochs, val_loss, 'r--s', label='Validation Loss', linewidth=2)
ax1.set_title('Training vs Validation Loss Curve')
ax1.set_xlabel('Epochs')
ax1.set_ylabel('Cross-Entropy Loss')
ax1.legend()
ax1.grid(True, alpha=0.3)

# 2. Bar Chart: Lab Category Scores
categories = ['NumPy', 'Pandas', 'Stats', 'Regression', 'Series']
scores = [92, 88, 79, 95, 84]
ax2.bar(categories, scores, color=['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'])
ax2.set_title('Module Competency Breakdown')
ax2.set_ylabel('Average Score (%)')
ax2.set_ylim(0, 100)

plt.tight_layout()
plt.show()`
          }
        ],
        practiceProblems: [
          {
            title: "Data Visualization with Matplotlib & Seaborn",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/matplotlib-pyplot-plot-in-python/",
            platform: "GeeksforGeeks",
            topicTag: "Matplotlib"
          }
        ]
      }
    ]
  },
  {
    id: "ds-statistics",
    name: "2. Descriptive & Inferential Statistics",
    shortDesc: "Variability, normal distributions, correlation, and hypothesis testing.",
    iconName: "BarChart3",
    topics: [
      {
        id: "ds-frequency-variability",
        slug: "frequency-distributions-averages-variability",
        title: "Exp 4: Frequency distributions, Averages, Variability",
        categoryId: "ds-statistics",
        categoryName: "2. Descriptive & Inferential Statistics",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Frequency distributions variance standard deviation IQR Python",
        gfgUrl: "https://www.geeksforgeeks.org/measures-of-dispersion/",
        quickSummary: "Calculate measures of central tendency (Mean, Median, Mode) and dispersion (Variance, Std Dev, IQR).",
        keyPoints: [
          "Mean is sensitive to outliers; Median is robust against skewed distributions.",
          "Standard deviation quantifies the spread of data in original units.",
          "Interquartile Range (IQR = Q3 - Q1) detects statistical outliers."
        ],
        diagramTitle: "Boxplot & Five-Number Summary Distribution",
        diagram: `           Min      Q1 (25%)     Median (50%)     Q3 (75%)      Max       Outlier
            │          │             │              │            │           *
       ─────┼──────────┌─────────────┬──────────────┐────────────┼───────────
            │          │      IQR = Q3 - Q1         │            │
            │          └────────────────────────────┘            │
       ─────┴────────────────────────────────────────────────────┴───────────`,
        complexities: [
          { operation: "Mean & Variance", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Median & IQR (Sorting)", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Statistics)",
            code: `import numpy as np
import scipy.stats as stats

data = np.array([23, 29, 20, 32, 23, 21, 33, 25, 45, 24, 28, 26, 29, 30, 22])

# Central Tendency
mean_val = np.mean(data)
median_val = np.median(data)
mode_val = stats.mode(data, keepdims=True).mode[0]

# Dispersion & Variability
variance = np.var(data, ddof=1)
std_dev = np.std(data, ddof=1)
q75, q25 = np.percentile(data, [75, 25])
iqr = q75 - q25

print(f"Mean: {mean_val:.2f}, Median: {median_val}, Mode: {mode_val}")
print(f"Variance: {variance:.2f}, Std Dev: {std_dev:.2f}, IQR: {iqr:.2f}")

# Outlier Detection (1.5 * IQR Rule)
lower_bound = q25 - (1.5 * iqr)
upper_bound = q75 + (1.5 * iqr)
outliers = data[(data < lower_bound) | (data > upper_bound)]
print(f"Outliers detected: {outliers}")`
          }
        ],
        practiceProblems: [
          {
            title: "Descriptive Statistics & Outlier Filtering",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/mathematics-mean-variance-and-standard-deviation/",
            platform: "GeeksforGeeks",
            topicTag: "Statistics"
          }
        ]
      },
      {
        id: "ds-normal-correlation",
        slug: "normal-curves-correlation-scatter-plots",
        title: "Exp 5: Normal curves, Correlation and scatter plots, Correlation coefficient",
        categoryId: "ds-statistics",
        categoryName: "2. Descriptive & Inferential Statistics",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Normal distribution Pearson correlation coefficient scatter plot Python",
        gfgUrl: "https://www.geeksforgeeks.org/pearson-correlation-coefficient/",
        quickSummary: "Fit normal distribution curves and compute Pearson correlation coefficients r in [-1, 1].",
        keyPoints: [
          "Standard Normal Distribution has mean=0, std=1; 68-95-99.7 empirical rule applies.",
          "Pearson's r measures linear relationship strength and direction.",
          "Scatter plots identify collinearity and non-linear patterns."
        ],
        diagramTitle: "Normal Distribution & Pearson Correlation Spectrum",
        diagram: `       Normal Bell Curve (μ, σ)                  Correlation Spectrum (r)
                 ▲                                     -1.0        0.0        +1.0
               /   \\                                  ───────┴──────────┴──────────
              /  |  \\                                 Strong      No        Strong
             / 68% |  \\                               Negative   Linear    Positive
           /───┼───┼───\\
          μ-2σ μ   μ+σ μ+2σ`,
        complexities: [
          { operation: "PDF Calculation", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
          { operation: "Pearson Correlation r", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Correlation & Normality)",
            code: `import numpy as np
import scipy.stats as stats

# Generate correlated data
np.random.seed(42)
study_hours = np.array([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
exam_scores = 40 + (4.5 * study_hours) + np.random.normal(0, 3, len(study_hours))

# 1. Pearson Correlation Coefficient
r, p_value = stats.pearsonr(study_hours, exam_scores)
print(f"Pearson Correlation r: {r:.4f}, p-value: {p_value:.4e}")

# 2. Normality Check (Shapiro-Wilk Test)
stat, norm_p = stats.shapiro(exam_scores)
print(f"Shapiro-Wilk Test Stat: {stat:.4f}, p-value: {norm_p:.4f} (Normal if p > 0.05)")

# 3. Z-Score Standardization
z_scores = stats.zscore(exam_scores)
print("Standardized Z-Scores (first 5):", np.round(z_scores[:5], 2))`
          }
        ],
        practiceProblems: [
          {
            title: "Correlation Matrix & Scatter Analysis",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/how-to-calculate-covariance-and-correlation-in-python/",
            platform: "GeeksforGeeks",
            topicTag: "Correlation"
          }
        ]
      },
      {
        id: "ds-regression-analysis",
        slug: "regression-analysis",
        title: "Exp 6: Regression",
        categoryId: "ds-statistics",
        categoryName: "2. Descriptive & Inferential Statistics",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Linear regression least squares R2 score Python",
        gfgUrl: "https://www.geeksforgeeks.org/linear-regression-python-implementation/",
        quickSummary: "Fit Ordinary Least Squares (OLS) regression line y = mx + c and calculate R-squared score.",
        keyPoints: [
          "OLS minimizes Sum of Squared Residuals (SSR).",
          "Slope m = Cov(X, Y) / Var(X), Intercept c = Y_mean - m * X_mean.",
          "R^2 measures proportion of variance explained by the model."
        ],
        diagramTitle: "Ordinary Least Squares Residual Minimization",
        diagram: `   Score y ▲                  / y = mx + c (Fitted Line)
           │                 /
           │       (x3, y3) * ──┐ Residual e3 = (y3 - ŷ3)
           │               /    │
           │              * (x2, y2)
           │             /
           │    * (x1, y1)
           └────────────────────────► Study Hours x`,
        complexities: [
          { operation: "OLS Slope & Intercept", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Prediction & R2", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (OLS Regression)",
            code: `import numpy as np

# Sample Data
X = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], dtype=float)
y = np.array([2.2, 3.8, 6.5, 7.9, 10.1, 12.3, 14.2, 16.0, 18.1, 20.4], dtype=float)

# Compute OLS Parameters
x_mean, y_mean = np.mean(X), np.mean(y)
numerator = np.sum((X - x_mean) * (y - y_mean))
denominator = np.sum((X - x_mean) ** 2)
slope = numerator / denominator
intercept = y_mean - (slope * x_mean)

# Predictions & R2 Score
y_pred = (slope * X) + intercept
ss_res = np.sum((y - y_pred) ** 2)
ss_tot = np.sum((y - y_mean) ** 2)
r2 = 1.0 - (ss_res / ss_tot)

print(f"Regression Equation: y = {slope:.3f}x + {intercept:.3f}")
print(f"R-squared: {r2:.4f} ({r2*100:.2f}% variance explained)")`
          }
        ],
        practiceProblems: [
          {
            title: "Linear Regression Implementation",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/linear-regression-python-implementation/",
            platform: "GeeksforGeeks",
            topicTag: "Regression"
          }
        ]
      },
      {
        id: "ds-z-test",
        slug: "z-test-hypothesis",
        title: "Exp 7: Z-test",
        categoryId: "ds-statistics",
        categoryName: "2. Descriptive & Inferential Statistics",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Z-test hypothesis testing one sample two sample Python",
        gfgUrl: "https://www.geeksforgeeks.org/z-test/",
        quickSummary: "Perform one-sample and two-sample Z-tests for large sample sizes (n >= 30) with known variance.",
        keyPoints: [
          "Formula: Z = (x_bar - μ) / (σ / sqrt(n)).",
          "Null hypothesis H0 is rejected if |Z| > Z_critical (1.96 for α=0.05).",
          "p-value < α indicates statistical significance."
        ],
        diagramTitle: "Two-Tailed Z-Test Rejection Regions",
        diagram: `                   Standard Normal Curve (Z ~ N(0, 1))
                                   ▲
               α/2 = 0.025        / \\        α/2 = 0.025
               Rejection         /   \\       Rejection
               ◄──────┐         /     \\        ┌──────►
               ───────┴────────/───────\\───────┴───────
                    -1.96       0       +1.96
                         Acceptance Region (95%)`,
        complexities: [
          { operation: "Z-Statistic Computation", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Z-Test)",
            code: `import numpy as np
from statsmodels.stats.weightstats import ztest

# Sample: New teaching methodology test scores (n = 45)
np.random.seed(42)
scores = np.random.normal(loc=78.5, scale=8.2, size=45)
pop_mean = 72.0  # Historical baseline

# Perform One-Sample Two-Tailed Z-Test
z_stat, p_val = ztest(scores, value=pop_mean)

print(f"Sample Mean: {np.mean(scores):.2f}, Sample Size: {len(scores)}")
print(f"Z-Statistic: {z_stat:.4f}, p-value: {p_val:.4e}")

alpha = 0.05
if p_val < alpha:
    print("Conclusion: Reject H0 — Significant difference detected.")
else:
    print("Conclusion: Fail to reject H0 — Insufficient evidence.")`
          }
        ],
        practiceProblems: [
          {
            title: "Hypothesis Testing with Z-Test",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/z-test/",
            platform: "GeeksforGeeks",
            topicTag: "Z-Test"
          }
        ]
      },
      {
        id: "ds-t-test",
        slug: "t-test-hypothesis",
        title: "Exp 8: T-test",
        categoryId: "ds-statistics",
        categoryName: "2. Descriptive & Inferential Statistics",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Student T-test independent paired SciPy Python",
        gfgUrl: "https://www.geeksforgeeks.org/how-to-conduct-a-two-sample-t-test-in-python/",
        quickSummary: "Perform Independent and Paired Student's T-tests when population variance is unknown (n < 30).",
        keyPoints: [
          "Student's t-distribution has heavier tails parameterized by degrees of freedom df = n - 1.",
          "Paired t-test evaluates before-and-after treatments on the same subjects.",
          "Independent two-sample t-test compares two independent control/treatment groups."
        ],
        diagramTitle: "Paired vs Independent Two-Sample T-Test Setup",
        diagram: `   Independent Two-Sample T-Test:      Paired T-Test (Same Subject):
      Group A (Control) -> x̄1, s1         Subject i: Before Score -> x_i
      Group B (Test)    -> x̄2, s2         Subject i: After Score  -> y_i
      df = n1 + n2 - 2                    Difference d_i = y_i - x_i, df = n - 1`,
        complexities: [
          { operation: "Two-Sample T-Test", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (SciPy T-Test)",
            code: `import numpy as np
import scipy.stats as stats

# Independent Samples: Algorithm A vs Algorithm B execution times (ms)
alg_a = np.array([24.5, 23.8, 25.1, 24.9, 26.2, 23.4, 25.0, 24.8])
alg_b = np.array([21.2, 22.0, 20.8, 21.5, 22.4, 20.9, 21.8, 22.1])

# Two-Sample Independent T-Test
t_stat, p_val = stats.ttest_ind(alg_a, alg_b)
print(f"Independent T-Test: t = {t_stat:.4f}, p = {p_val:.4e}")

# Paired Samples: Student scores Before vs After Virtual Lab simulator
before = np.array([65, 70, 68, 72, 60, 75, 69, 71])
after = np.array([82, 85, 84, 89, 78, 91, 86, 88])

t_paired, p_paired = stats.ttest_rel(after, before)
print(f"Paired T-Test: t = {t_paired:.4f}, p = {p_paired:.4e}")`
          }
        ],
        practiceProblems: [
          {
            title: "Student T-Test Hypothesis Formulation",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/t-test/",
            platform: "GeeksforGeeks",
            topicTag: "T-Test"
          }
        ]
      },
      {
        id: "ds-anova-test",
        slug: "anova-analysis-of-variance",
        title: "Exp 9: ANOVA",
        categoryId: "ds-statistics",
        categoryName: "2. Descriptive & Inferential Statistics",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "One way ANOVA F-statistic scipy stats Python",
        gfgUrl: "https://www.geeksforgeeks.org/how-to-perform-a-one-way-anova-in-python/",
        quickSummary: "Compare means across 3+ groups simultaneously using One-Way ANOVA and the F-statistic.",
        keyPoints: [
          "F-statistic = Mean Square Between Groups (MSB) / Mean Square Within Groups (MSW).",
          "Controls Family-Wise Type I Error rate compared to running multiple pairwise t-tests.",
          "Post-hoc Tukey HSD test isolates which specific pairs differ significantly."
        ],
        diagramTitle: "ANOVA Partition of Total Sum of Squares (SST)",
        diagram: `┌────────────────────────────────────────────────────────┐
│ Total Sum of Squares (SST)                             │
├────────────────────────────┬───────────────────────────┤
│ Sum of Squares Between     │ Sum of Squares Within     │
│ Groups (SSB) [Treatment]   │ Groups (SSW) [Error/Noise]│
└─────────────┬──────────────┴─────────────┬─────────────┘
              ▼                            ▼
         MSB = SSB / (k - 1)          MSW = SSW / (N - k)
              └──────────────┬─────────────┘
                             ▼
                    F = MSB / MSW (Compare with F_critical)`,
        complexities: [
          { operation: "ANOVA F-Statistic", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(k)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (ANOVA)",
            code: `import numpy as np
import scipy.stats as stats

# Test 3 different caching algorithms latency (ms)
cache_lru = [12.4, 14.1, 13.2, 12.9, 13.8]
cache_lfu = [15.2, 16.0, 14.8, 15.7, 16.4]
cache_arc = [10.1, 11.3, 10.8, 10.5, 11.0]

# Perform One-Way ANOVA
f_stat, p_val = stats.f_oneway(cache_lru, cache_lfu, cache_arc)

print(f"One-Way ANOVA Results:")
print(f"F-Statistic: {f_stat:.4f}, p-value: {p_val:.4e}")

if p_val < 0.05:
    print("Conclusion: At least one cache algorithm exhibits statistically different latency.")`
          }
        ],
        practiceProblems: [
          {
            title: "One-Way ANOVA Testing in Python",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/how-to-perform-a-one-way-anova-in-python/",
            platform: "GeeksforGeeks",
            topicTag: "ANOVA"
          }
        ]
      }
    ]
  },
  {
    id: "ds-models",
    name: "3. Predictive Modeling & Time Series",
    shortDesc: "Linear models, logistic classification, and time series decomposition.",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "ds-linear-models",
        slug: "building-validating-linear-models",
        title: "Exp 10: Building and validating linear models",
        categoryId: "ds-models",
        categoryName: "3. Predictive Modeling & Time Series",
        difficulty: "Advanced",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Multiple linear regression train test split RMSE Scikit-learn",
        gfgUrl: "https://www.geeksforgeeks.org/multiple-linear-regression-with-scikit-learn/",
        quickSummary: "Train multiple linear regression models, perform train-test splits, and evaluate RMSE/MAE.",
        keyPoints: [
          "Multiple linear regression models y = w0 + w1*x1 + ... + wn*xn.",
          "Feature scaling (StandardScaler) accelerates gradient convergence.",
          "Metrics: Mean Squared Error (MSE), Root MSE (RMSE), Mean Absolute Error (MAE)."
        ],
        diagramTitle: "Train-Test Split & Validation Workflow",
        diagram: `┌──────────────────────────────────────────────┐
│ Full Dataset (1000 Samples, 8 Features)      │
└──────────────────────┬───────────────────────┘
                       │ train_test_split(test_size=0.2)
       ┌───────────────┴───────────────┐
       ▼ (80% Train)                   ▼ (20% Test)
┌──────────────┐                ┌──────────────┐
│ Training Set │──► Model.fit() │ Test Set X   │──► Model.predict()
└──────────────┘                └──────┬───────┘          │
                                       ▼ (ŷ_test)         ▼
                                ┌──────────────────────────────┐
                                │ Metric Eval: RMSE, MAE, R^2  │
                                └──────────────────────────────┘`,
        complexities: [
          { operation: "Model Fitting OLS (X^T X)^-1", best: "O(n d^2 + d^3)", avg: "O(n d^2)", worst: "O(n d^2)", space: "O(d^2)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Scikit-Learn Linear Model)",
            code: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import numpy as np

# Synthetic Dataset: House pricing factors
np.random.seed(42)
X = np.random.rand(200, 3) * 100  # Sqft, Bedrooms, Age
y = 50 + (1.5 * X[:, 0]) + (20.0 * X[:, 1]) - (2.5 * X[:, 2]) + np.random.normal(0, 10, 200)

# Train-Test Split (80/20)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model Training
model = LinearRegression()
model.fit(X_train, y_train)

# Validation
y_pred = model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Model Coefficients: {model.coef_}, Intercept: {model.intercept_:.2f}")
print(f"Validation RMSE: {rmse:.2f}, MAE: {mae:.2f}, R2 Score: {r2:.4f}")`
          }
        ],
        practiceProblems: [
          {
            title: "Multiple Linear Regression Pipeline",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/multiple-linear-regression-with-scikit-learn/",
            platform: "GeeksforGeeks",
            topicTag: "Linear Models"
          }
        ]
      },
      {
        id: "ds-logistic-models",
        slug: "building-validating-logistic-models",
        title: "Exp 11: Building and validating logistic models",
        categoryId: "ds-models",
        categoryName: "3. Predictive Modeling & Time Series",
        difficulty: "Advanced",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Logistic regression confusion matrix ROC AUC classification Python",
        gfgUrl: "https://www.geeksforgeeks.org/understanding-logistic-regression/",
        quickSummary: "Build binary logistic regression classifiers and evaluate Confusion Matrix, Precision, Recall, and ROC-AUC.",
        keyPoints: [
          "Sigmoid link function σ(z) = 1 / (1 + e^-z) maps logits to probabilities in [0, 1].",
          "Binary cross-entropy loss function is minimized via gradient descent.",
          "Evaluated with Precision, Recall, F1-Score, and ROC Area Under Curve."
        ],
        diagramTitle: "Sigmoid Activation & Confusion Matrix",
        diagram: `  Sigmoid Activation: σ(z) = 1 / (1 + e^-z)      Confusion Matrix:
            1.0 ▲           _--""""                       ┌───────────┬───────────┐
                │        _-"                              │ True Pos  │ False Pos │
            0.5 ┼──────/                                  ├───────────┼───────────┤
                │    _-"                                  │ False Neg │ True Neg  │
            0.0 ┴───┴──────┼──────► Logits z              └───────────┴───────────┘
                          z=0`,
        complexities: [
          { operation: "Logistic Gradient Descent", best: "O(epochs * n * d)", avg: "O(epochs * n * d)", worst: "O(epochs * n * d)", space: "O(d)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Logistic Regression)",
            code: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
from sklearn.preprocessing import StandardScaler
import numpy as np

# Generate Binary Classification Dataset (Admitted vs Rejected)
np.random.seed(42)
X = np.random.randn(300, 2) * 15 + 65  # GRE Score, GPA
y = (X[:, 0] * 0.08 + X[:, 1] * 0.15 - 14.5 > 0).astype(int)

# Split & Scale
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train Logistic Model
clf = LogisticRegression()
clf.fit(X_train_scaled, y_train)

# Predictions & Evaluation
y_pred = clf.predict(X_test_scaled)
y_prob = clf.predict_proba(X_test_scaled)[:, 1]

print("Confusion Matrix:\\n", confusion_matrix(y_test, y_pred))
print("\\nClassification Report:\\n", classification_report(y_test, y_pred))
print(f"ROC-AUC Score: {roc_auc_score(y_test, y_prob):.4f}")`
          }
        ],
        practiceProblems: [
          {
            title: "Logistic Regression Classification",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/understanding-logistic-regression/",
            platform: "GeeksforGeeks",
            topicTag: "Classification"
          }
        ]
      },
      {
        id: "ds-time-series",
        slug: "time-series-analysis",
        title: "Exp 12: Time series analysis",
        categoryId: "ds-models",
        categoryName: "3. Predictive Modeling & Time Series",
        difficulty: "Advanced",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Time series decomposition trend seasonality moving average ARIMA Python",
        gfgUrl: "https://www.geeksforgeeks.org/python-pandas-time-series/",
        quickSummary: "Decompose temporal data into Trend, Seasonality, and Residual components and compute Moving Averages.",
        keyPoints: [
          "Additive Decomposition: Y[t] = Trend[t] + Seasonal[t] + Residual[t].",
          "Stationarity verification using the Augmented Dickey-Fuller (ADF) test.",
          "Simple Moving Average (SMA) and Exponential Moving Average (EMA) smoothing."
        ],
        diagramTitle: "Time Series Additive Component Decomposition",
        diagram: `┌────────────────────────────────────────────────────────┐
│ Observed Signal Y[t] = Trend + Seasonal + Residual     │
├────────────────────────────────────────────────────────┤
│ Trend T[t]: Long-term upward / downward drift           │
│   ▲        /‾‾‾‾\\                                      │
│   └───────/──────\\─────────────────────────────────────│
│ Seasonal S[t]: Periodic fixed-interval cycles          │
│   ▲  _/\_/\_/\_/\_                                     │
│   └────────────────────────────────────────────────────│
│ Residual R[t]: Irregular stochastic noise              │
│   ▲  . : . . : .                                       │
│   └────────────────────────────────────────────────────│
└────────────────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Moving Average Window", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
          { operation: "ADF Stationarity Test", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Time Series)",
            code: `import pandas as pd
import numpy as np
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import adfuller

# 1. Create Synthetic Time Series (1 Year Daily)
dates = pd.date_range(start="2025-01-01", periods=365, freq="D")
trend = np.linspace(100, 250, 365)
seasonality = 20 * np.sin(2 * np.pi * np.arange(365) / 30)  # Monthly cycle
noise = np.random.normal(0, 5, 365)
ts_data = pd.Series(trend + seasonality + noise, index=dates)

# 2. Moving Average Smoothing
sma_7 = ts_data.rolling(window=7).mean()
sma_30 = ts_data.rolling(window=30).mean()

# 3. Additive Decomposition
result = seasonal_decompose(ts_data, model="additive", period=30)
print(f"Decomposed Components: Trend shape={result.trend.dropna().shape}, Seasonality shape={result.seasonal.shape}")

# 4. Augmented Dickey-Fuller Test
adf_stat, p_val, _, _, critical_vals, _ = adfuller(ts_data)
print(f"ADF Statistic: {adf_stat:.4f}, p-value: {p_val:.4f} (Stationary if p < 0.05)")`
          }
        ],
        practiceProblems: [
          {
            title: "Time Series Moving Averages & Trend Filtering",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/time-series-analysis-using-pandas-in-python/",
            platform: "GeeksforGeeks",
            topicTag: "Time Series"
          }
        ]
      }
    ]
  }
];
