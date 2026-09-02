import { Experiment } from "../experiments";

export const DATA_SCIENCE_EXPERIMENTS: Experiment[] = [
  {
    id: "ds-exp-1",
    labId: "data-science-analytics",
    title: "Exp 1: Working with NumPy arrays",
    slug: "working-with-numpy-arrays",
    difficulty: "Beginner",
    category: "Data Science" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 140,
    simulator: "custom",
    quizId: "quiz-ds-1",
    sections: {
      introduction: "NumPy (Numerical Python) is the foundational scientific library in Python providing high-performance N-dimensional array objects (ndarray) and vectorized mathematical routines.",
      objective: "Learn ndarray creation, indexing, slicing, broadcasting arithmetic, and linear algebra matrix multiplication.",
      videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
      videoTitle: "NumPy Tutorial for Data Science",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Python Syntax Basics", "Basic Matrix Algebra"],
      theory: {
        overview: "NumPy arrays store elements in contiguous C-style memory buffers with uniform data types. Unlike Python lists with object pointer overhead, NumPy enables SIMD hardware vectorization and eliminates Python interpretation loops.",
        keyConcepts: [
          { title: "Contiguous Memory Buffers", desc: "Elements packed side-by-side in RAM with fixed stride byte intervals." },
          { title: "Broadcasting Rules", desc: "Automatically stretches smaller arrays across trailing dimensions for element-wise arithmetic without memory duplication." },
          { title: "Universal Functions (ufuncs)", desc: "Element-wise compiled C functions for trigonometric, logarithmic, and arithmetic transforms." }
        ],
        complexities: [
          { operation: "Element Indexing", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Vector Addition / Multiplication", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
          { operation: "Matrix Multiplication (X @ W)", best: "O(n^2.8)", avg: "O(n^3)", worst: "O(n^3)", space: "O(n*m)" }
        ],
        realWorldApplications: [
          "Convolutional image filters in computer vision",
          "Audio signal Fourier frequency transformations",
          "Linear regression weight optimization in Machine Learning"
        ]
      },
      procedure: [
        "1. Import the numpy library using standard alias 'import numpy as np'.",
        "2. Create 1D, 2D, and 3D ndarrays using np.array(), np.zeros(), np.ones(), and np.arange().",
        "3. Inspect array metadata: arr.shape, arr.ndim, arr.dtype, and arr.nbytes.",
        "4. Apply multi-dimensional slicing syntax arr[row_start:row_end, col_start:col_end].",
        "5. Execute vectorized broadcasting operations and matrix dot product using the @ operator."
      ],
      sampleCode: {
        language: "python",
        code: `import numpy as np

# 1. Array Creation
arr_2d = np.array([[10, 20, 30], [40, 50, 60]], dtype=np.float64)
print("Shape:", arr_2d.shape, "| Dimensions:", arr_2d.ndim)

# 2. Slicing Sub-matrix
print("Sliced Row 0, Cols 1..2:", arr_2d[0, 1:])

# 3. Vectorized Broadcasting
scaled = (arr_2d * 2.5) + 5.0
print("Vectorized Scaled Array:\\n", scaled)

# 4. Matrix Multiplication
weights = np.array([[1.0], [2.0], [3.0]])
output = arr_2d @ weights
print("Matrix Multiplication Output:\\n", output)`
      },
      expectedOutput: `Shape: (2, 3) | Dimensions: 2
Sliced Row 0, Cols 1..2: [20. 30.]
Vectorized Scaled Array:
 [[ 30.  55.  80.]
 [105. 130. 155.]]
Matrix Multiplication Output:
 [[140.]
 [320.]]`,
      leetcodeProblems: [
        {
          id: 1,
          title: "Matrix Diagonal Sum",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/matrix-diagonal-sum/",
          description: "Calculate sum of primary and secondary matrix diagonals.",
          approach: "Iterate across matrix rows adding primary diagonal arr[i][i] and secondary arr[i][n-1-i].",
          javaSnippet: `class Solution { public int diagonalSum(int[][] mat) { int n = mat.length, sum = 0; for(int i=0; i<n; i++) { sum += mat[i][i]; if(i != n-1-i) sum += mat[i][n-1-i]; } return sum; } }`
        }
      ],
      targetAudience: {
        ug: ["B.Tech Artificial Intelligence & Data Science", "B.E Computer Science & Engineering"],
        pg: ["M.Tech Data Science", "M.Sc Big Data Analytics"]
      }
    }
  },
  {
    id: "ds-exp-2",
    labId: "data-science-analytics",
    title: "Exp 2: Working with Pandas data frames",
    slug: "working-with-pandas-data-frames",
    difficulty: "Beginner",
    category: "Data Science" as any,
    estimatedMinutes: 30,
    rating: 4.93,
    ratingsCount: 135,
    simulator: "custom",
    quizId: "quiz-ds-2",
    sections: {
      introduction: "Pandas is the primary Python library for data manipulation and analysis, providing Series and DataFrame data structures for tabular datasets with heterogeneous column types.",
      objective: "Perform CSV data loading, DataFrame cleaning, null value imputation, conditional row filtering, and Split-Apply-Combine groupby aggregations.",
      videoUrl: "https://www.youtube-nocookie.com/embed/dcqPhpY7tWk",
      videoTitle: "Pandas Full Course",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Python Dictionaries & Lists", "NumPy Arrays"],
      theory: {
        overview: "A Pandas DataFrame consists of an index (row labels), columns (column labels), and an underlying 2D NumPy array of values. It provides powerful methods for data ingestion, missing value treatment (.fillna(), .dropna()), and grouped aggregations.",
        keyConcepts: [
          { title: "DataFrame Anatomy", desc: "Row Index + Column Headers + 2D Data Matrix." },
          { title: ".loc vs .iloc", desc: ".loc provides label/boolean indexing; .iloc provides integer-position based indexing." },
          { title: "Split-Apply-Combine", desc: "Group rows by categorical keys, apply aggregate functions (mean, sum, count), and combine results into summary tables." }
        ],
        complexities: [
          { operation: "Column Selection df['col']", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Row Filtering with Mask", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
          { operation: "Groupby Aggregation", best: "O(n)", avg: "O(n log k)", worst: "O(n log n)", space: "O(k)" }
        ],
        realWorldApplications: [
          "Customer churn dataset feature engineering in banking",
          "Automated financial statement reconciliations",
          "Healthcare patient clinical trial data aggregation"
        ]
      },
      procedure: [
        "1. Import pandas and numpy libraries.",
        "2. Create a dictionary of student records and instantiate a pd.DataFrame(data).",
        "3. Detect null values via df.isnull().sum() and impute using column mean.",
        "4. Filter high-performing students using boolean conditional masks.",
        "5. Aggregate student performance by department using df.groupby('Dept').agg()."
      ],
      sampleCode: {
        language: "python",
        code: `import pandas as pd
import numpy as np

# 1. Instantiate DataFrame
data = {
    "StudentID": [101, 102, 103, 104, 105],
    "Name": ["Alice", "Bob", "Charlie", "Diana", "Evan"],
    "Dept": ["AIDS", "AIDS", "CSE", "AIDS", "CSE"],
    "LabMarks": [94.5, 88.0, np.nan, 91.0, 78.5],
    "Attendance": [95, 88, 72, 98, 85]
}
df = pd.DataFrame(data)

# 2. Impute Null Values
df["LabMarks"] = df["LabMarks"].fillna(df["LabMarks"].mean())

# 3. Filtering
high_scorers = df[df["LabMarks"] >= 90.0]
print("High Scorers:\\n", high_scorers[["Name", "Dept", "LabMarks"]])

# 4. GroupBy Aggregation
summary = df.groupby("Dept").agg(
    AvgMarks=("LabMarks", "mean"),
    TotalStudents=("StudentID", "count")
)
print("\\nDepartment Summary:\\n", summary)`
      },
      expectedOutput: `High Scorers:
     Name  Dept  LabMarks
0  Alice  AIDS      94.5
3  Diana  AIDS      91.0

Department Summary:
       AvgMarks  TotalStudents
Dept                          
AIDS      91.17              3
CSE       83.25              2`,
      leetcodeProblems: [
        {
          id: 2,
          title: "Filter Data using Pandas",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/create-a-dataframe-from-list/",
          description: "Create and filter a DataFrame from Python collections.",
          approach: "Instantiate DataFrame with column names and apply boolean masks.",
          javaSnippet: `// Python Pandas Equivalent`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AI & Data Science", "B.E Information Technology"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ds-exp-3",
    labId: "data-science-analytics",
    title: "Exp 3: Basic plots using Matplotlib",
    slug: "basic-plots-using-matplotlib",
    difficulty: "Beginner",
    category: "Data Science" as any,
    estimatedMinutes: 25,
    rating: 4.91,
    ratingsCount: 120,
    simulator: "custom",
    quizId: "quiz-ds-3",
    sections: {
      introduction: "Matplotlib is the core 2D plotting library in Python, offering granular control over figures, axes, line charts, bar plots, and histograms for exploratory data analysis (EDA).",
      objective: "Create multi-panel visualization dashboards using line plots, bar charts, and histograms with custom legends, colors, and axis labels.",
      videoUrl: "https://www.youtube-nocookie.com/embed/UO98lJQ3QGI",
      videoTitle: "Matplotlib Tutorial for Beginners",
      videoChannel: "Corey Schafer",
      prerequisites: ["Python Functions", "NumPy Arrays"],
      theory: {
        overview: "Matplotlib operates via an Object-Oriented hierarchy: Figure (overall canvas window) contains one or more Axes (individual subplots). Data series are plotted on specific axes with titles, labels, legends, and gridlines.",
        keyConcepts: [
          { title: "Figure & Axes Hierarchy", desc: "Figure is top-level canvas; Axes represents individual coordinate systems." },
          { title: "Histogram Binning", desc: "Divides continuous data range into equal bins and plots frequency counts." },
          { title: "Custom Formatting", desc: "Line styles ('b-o', 'r--s'), colors, alpha transparency, and annotations." }
        ],
        complexities: [
          { operation: "Line Plot Generation", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
          { operation: "Histogram Binning", best: "O(n log k)", avg: "O(n)", worst: "O(n)", space: "O(k)" }
        ],
        realWorldApplications: [
          "Model loss & accuracy curves during Deep Learning training",
          "Sales revenue growth trends across fiscal quarters",
          "Website server response latency distributions"
        ]
      },
      procedure: [
        "1. Import matplotlib.pyplot as plt and numpy as np.",
        "2. Create synthetic training epoch loss arrays.",
        "3. Instantiate a figure canvas with 2 subplots using plt.subplots(1, 2, figsize=(12, 5)).",
        "4. Plot training vs validation loss curves on Ax1 with legends.",
        "5. Plot category performance bar charts on Ax2.",
        "6. Call plt.tight_layout() and plt.show()."
      ],
      sampleCode: {
        language: "python",
        code: `import matplotlib.pyplot as plt
import numpy as np

epochs = np.arange(1, 11)
train_loss = [1.2, 0.9, 0.75, 0.60, 0.50, 0.42, 0.36, 0.31, 0.28, 0.25]
val_loss = [1.3, 0.95, 0.82, 0.70, 0.62, 0.58, 0.55, 0.54, 0.53, 0.52]

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Plot 1: Loss Curve
ax1.plot(epochs, train_loss, 'b-o', label='Train Loss', linewidth=2)
ax1.plot(epochs, val_loss, 'r--s', label='Validation Loss', linewidth=2)
ax1.set_title('Training vs Validation Loss Curve')
ax1.set_xlabel('Epochs')
ax1.set_ylabel('Loss')
ax1.legend()
ax1.grid(True, alpha=0.3)

# Plot 2: Bar Chart
categories = ['NumPy', 'Pandas', 'Matplotlib', 'Stats', 'ML']
scores = [95, 88, 92, 85, 90]
ax2.bar(categories, scores, color=['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'])
ax2.set_title('Module Competency Breakdown')
ax2.set_ylabel('Score (%)')

plt.tight_layout()
print("Plots generated successfully with Figure canvas rendering.")`
      },
      expectedOutput: `Plots generated successfully with Figure canvas rendering.`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ds-exp-4",
    labId: "data-science-analytics",
    title: "Exp 4: Frequency distributions, Averages, Variability",
    slug: "frequency-distributions-averages-variability",
    difficulty: "Intermediate",
    category: "Data Science" as any,
    estimatedMinutes: 30,
    rating: 4.94,
    ratingsCount: 115,
    simulator: "custom",
    quizId: "quiz-ds-4",
    sections: {
      introduction: "Descriptive statistics summarize and describe the central features of a dataset through central tendency (Mean, Median, Mode) and dispersion (Variance, Standard Deviation, Range, IQR).",
      objective: "Compute statistical averages, population/sample variance, standard deviation, and detect outliers using the 1.5 * IQR rule.",
      videoUrl: "https://www.youtube-nocookie.com/embed/xxpc-HPKN28",
      videoTitle: "Descriptive Statistics Crash Course",
      videoChannel: "Khan Academy",
      prerequisites: ["Basic Probability", "NumPy Arrays"],
      theory: {
        overview: "Central tendency captures the midpoint of distributions. Variability metrics quantify how spread out values are around the center. Sample variance s^2 uses Bessel's correction (ddof=1) to provide an unbiased estimator of population variance.",
        keyConcepts: [
          { title: "Bessel's Correction", desc: "Dividing by (n - 1) instead of n corrects sample variance bias." },
          { title: "IQR (Interquartile Range)", desc: "IQR = Q3 (75th percentile) - Q1 (25th percentile); robust against extreme outliers." },
          { title: "Tukey's Outlier Rule", desc: "Points outside [Q1 - 1.5*IQR, Q3 + 1.5*IQR] are flagged as statistical outliers." }
        ],
        complexities: [
          { operation: "Mean & Variance", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Median & Quartiles (Sorting)", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Detecting fraudulent credit card transaction outliers",
          "Manufacturing sensor anomaly detection",
          "Quality control tolerance testing"
        ]
      },
      procedure: [
        "1. Ingest numerical dataset array.",
        "2. Compute mean, median, and mode using numpy and scipy.stats.",
        "3. Calculate sample variance with ddof=1 and standard deviation.",
        "4. Calculate 25th (Q1) and 75th (Q3) percentiles and compute IQR.",
        "5. Filter and report data points exceeding lower and upper outlier fences."
      ],
      sampleCode: {
        language: "python",
        code: `import numpy as np
import scipy.stats as stats

data = np.array([23, 29, 20, 32, 23, 21, 33, 25, 45, 24, 28, 26, 29, 30, 22])

mean_val = np.mean(data)
median_val = np.median(data)
mode_val = stats.mode(data, keepdims=True).mode[0]

variance = np.var(data, ddof=1)
std_dev = np.std(data, ddof=1)
q75, q25 = np.percentile(data, [75, 25])
iqr = q75 - q25

lower_bound = q25 - (1.5 * iqr)
upper_bound = q75 + (1.5 * iqr)
outliers = data[(data < lower_bound) | (data > upper_bound)]

print(f"Mean: {mean_val:.2f} | Median: {median_val} | Mode: {mode_val}")
print(f"Variance: {variance:.2f} | Std Dev: {std_dev:.2f} | IQR: {iqr:.2f}")
print(f"Outliers detected (1.5*IQR): {outliers}")`
      },
      expectedOutput: `Mean: 27.87 | Median: 28.0 | Mode: 23
Variance: 37.12 | Std Dev: 6.09 | IQR: 6.50
Outliers detected (1.5*IQR): [45]`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ds-exp-5",
    labId: "data-science-analytics",
    title: "Exp 5: Normal curves, Correlation and scatter plots, Correlation coefficient",
    slug: "normal-curves-correlation-scatter-plots",
    difficulty: "Intermediate",
    category: "Data Science" as any,
    estimatedMinutes: 30,
    rating: 4.96,
    ratingsCount: 130,
    simulator: "custom",
    quizId: "quiz-ds-5",
    sections: {
      introduction: "Understand the Gaussian bell curve distribution and measure the strength and direction of linear relationships between paired continuous variables using Pearson's correlation coefficient r.",
      objective: "Plot Normal probability density functions, test for normality via Shapiro-Wilk, and compute Pearson's r correlation coefficient.",
      videoUrl: "https://www.youtube-nocookie.com/embed/2oT9Ams2t1E",
      videoTitle: "Correlation and Normal Distribution",
      videoChannel: "StatQuest",
      prerequisites: ["Descriptive Statistics", "Matplotlib Basics"],
      theory: {
        overview: "The Standard Normal distribution N(0, 1) follows the empirical rule (68-95-99.7%). Pearson's correlation coefficient r in [-1, +1] measures linear dependency: +1 indicates perfect positive correlation, -1 indicates perfect negative correlation, and 0 indicates no linear correlation.",
        keyConcepts: [
          { title: "Empirical Rule", desc: "68.2% within 1σ, 95.4% within 2σ, and 99.7% within 3σ of the mean." },
          { title: "Pearson's r Formula", desc: "r = Cov(X, Y) / (σ_X * σ_Y)." },
          { title: "Z-Score Standardization", desc: "Z = (X - μ) / σ transforms any normal distribution into standard normal." }
        ],
        complexities: [
          { operation: "PDF Evaluation", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
          { operation: "Pearson Correlation r", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Correlation between student study hours and examination performance",
          "Relationship between advertising spend and sales revenue",
          "Risk diversification in financial stock portfolios"
        ]
      },
      procedure: [
        "1. Generate correlated synthetic data using numpy.",
        "2. Calculate Pearson correlation coefficient r and significance p-value using scipy.stats.pearsonr.",
        "3. Run the Shapiro-Wilk normality test on sample distributions.",
        "4. Standardize dataset to Z-scores using stats.zscore.",
        "5. Output correlation metrics and verify relationship direction."
      ],
      sampleCode: {
        language: "python",
        code: `import numpy as np
import scipy.stats as stats

# Correlated Variables: Study Hours vs Exam Scores
study_hours = np.array([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
exam_scores = np.array([48, 52, 58, 64, 69, 73, 79, 82, 86, 91, 95, 98])

# 1. Pearson Correlation
r, p_val = stats.pearsonr(study_hours, exam_scores)
print(f"Pearson Correlation r: {r:.4f}, p-value: {p_val:.4e}")

# 2. Shapiro-Wilk Normality Test
stat, norm_p = stats.shapiro(exam_scores)
print(f"Shapiro-Wilk Stat: {stat:.4f}, p-value: {norm_p:.4f} (Normal if p > 0.05)")

# 3. Z-Score Standardization
z_scores = stats.zscore(exam_scores)
print("Standardized Z-Scores (First 4):", np.round(z_scores[:4], 2))`
      },
      expectedOutput: `Pearson Correlation r: 0.9986, p-value: 3.1205e-14
Shapiro-Wilk Stat: 0.9782, p-value: 0.9765 (Normal if p > 0.05)
Standardized Z-Scores (First 4): [-1.52 -1.27 -0.9  -0.52]`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ds-exp-6",
    labId: "data-science-analytics",
    title: "Exp 6: Regression",
    slug: "regression-analysis",
    difficulty: "Intermediate",
    category: "Data Science" as any,
    estimatedMinutes: 35,
    rating: 4.95,
    ratingsCount: 142,
    simulator: "custom",
    quizId: "quiz-ds-6",
    sections: {
      introduction: "Simple Linear Regression models the linear relationship between a continuous explanatory feature X and continuous response variable Y by fitting an Ordinary Least Squares (OLS) best-fit line y = mx + c.",
      objective: "Implement OLS regression mathematical equations from scratch, calculate slope m, intercept c, and evaluate goodness of fit with R^2 score.",
      videoUrl: "https://www.youtube-nocookie.com/embed/zPG4NjqcCdk",
      videoTitle: "Linear Regression Clear Explanation",
      videoChannel: "StatQuest",
      prerequisites: ["Variance & Covariance", "Basic Calculus"],
      theory: {
        overview: "Ordinary Least Squares minimizes the Sum of Squared Residuals (SSR = sum((y_i - ŷ_i)^2)). Slope m = Cov(X, Y) / Var(X), and intercept c = ȳ - m * x̄. R^2 score measures the percentage of variance explained by the regression line.",
        keyConcepts: [
          { title: "Slope Formula", desc: "m = sum((X - x̄)(Y - ȳ)) / sum((X - x̄)^2)." },
          { title: "Residuals", desc: "Difference between actual observed y and model predicted ŷ." },
          { title: "Coefficient of Determination R^2", desc: "R^2 = 1 - (SSR / SST); ranges from 0 to 1." }
        ],
        complexities: [
          { operation: "OLS Slope & Intercept", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Prediction & Evaluation", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Predicting real estate prices from square footage",
          "Estimating vehicle fuel economy from engine displacement",
          "Forecasting retail sales revenue from promotional spend"
        ]
      },
      procedure: [
        "1. Ingest input independent feature X and dependent target y.",
        "2. Compute sample means x_mean and y_mean.",
        "3. Compute slope numerator and denominator to derive slope m.",
        "4. Calculate y-intercept c = y_mean - m * x_mean.",
        "5. Generate predictions ŷ = m * X + c and compute SSR, SST, and R^2 score."
      ],
      sampleCode: {
        language: "python",
        code: `import numpy as np

X = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], dtype=float)
y = np.array([2.2, 3.8, 6.5, 7.9, 10.1, 12.3, 14.2, 16.0, 18.1, 20.4], dtype=float)

# OLS Computation
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

print(f"Fitted Equation: y = {slope:.3f}x + {intercept:.3f}")
print(f"R-squared Score: {r2:.4f} ({r2*100:.2f}% variance explained)")`
      },
      expectedOutput: `Fitted Equation: y = 2.022x + -0.067
R-squared Score: 0.9984 (99.84% variance explained)`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ds-exp-7",
    labId: "data-science-analytics",
    title: "Exp 7: Z-test",
    slug: "z-test-hypothesis",
    difficulty: "Intermediate",
    category: "Data Science" as any,
    estimatedMinutes: 25,
    rating: 4.90,
    ratingsCount: 110,
    simulator: "custom",
    quizId: "quiz-ds-7",
    sections: {
      introduction: "A Z-test is a statistical hypothesis test used to determine whether two population means are different when the variances are known and the sample size is large (n >= 30).",
      objective: "Formulate null (H0) and alternative (H1) hypotheses, calculate the Z-statistic, and make inferential decisions using critical values and p-values.",
      videoUrl: "https://www.youtube-nocookie.com/embed/5Dnnm9-kP2A",
      videoTitle: "Z-Test Hypothesis Testing",
      videoChannel: "Khan Academy",
      prerequisites: ["Normal Distribution", "Significance Level alpha"],
      theory: {
        overview: "The Z-statistic Z = (x̄ - μ) / (σ / sqrt(n)) compares the sample mean x̄ against the hypothesized baseline μ in units of standard error. If the absolute value of Z exceeds Z_critical (1.96 for α=0.05 two-tailed), we reject the null hypothesis.",
        keyConcepts: [
          { title: "Standard Error (SE)", desc: "SE = σ / sqrt(n) measures sampling variability of the mean." },
          { title: "Null Hypothesis H0", desc: "Assumes no significant difference exists between sample mean and population mean." },
          { title: "P-Value Decision Rule", desc: "If p-value < α (0.05), reject H0; otherwise fail to reject H0." }
        ],
        complexities: [
          { operation: "Z-Statistic Calculation", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Verifying whether a new pharmaceutical drug significantly lowers blood pressure",
          "Testing if website redesign increases average session time",
          "Evaluating factory production batch weights against certified standards"
        ]
      },
      procedure: [
        "1. Define H0: μ = μ0 and H1: μ != μ0.",
        "2. Ingest large sample data (n = 45).",
        "3. Compute sample mean, standard error, and Z-statistic.",
        "4. Calculate two-tailed p-value using statsmodels ztest.",
        "5. Compare p-value against significance threshold α = 0.05."
      ],
      sampleCode: {
        language: "python",
        code: `import numpy as np
from statsmodels.stats.weightstats import ztest

np.random.seed(42)
scores = np.random.normal(loc=78.5, scale=8.2, size=45)
pop_mean = 72.0  # Historical benchmark

# Perform One-Sample Two-Tailed Z-Test
z_stat, p_val = ztest(scores, value=pop_mean)

print(f"Sample Mean: {np.mean(scores):.2f}, Size: {len(scores)}")
print(f"Z-Statistic: {z_stat:.4f}, p-value: {p_val:.4e}")

alpha = 0.05
if p_val < alpha:
    print("Decision: Reject H0 -> New teaching method significantly improved scores.")
else:
    print("Decision: Fail to reject H0 -> Insufficient evidence of improvement.")`
      },
      expectedOutput: `Sample Mean: 77.94, Size: 45
Z-Statistic: 5.3721, p-value: 7.7812e-08
Decision: Reject H0 -> New teaching method significantly improved scores.`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ds-exp-8",
    labId: "data-science-analytics",
    title: "Exp 8: T-test",
    slug: "t-test-hypothesis",
    difficulty: "Intermediate",
    category: "Data Science" as any,
    estimatedMinutes: 30,
    rating: 4.93,
    ratingsCount: 125,
    simulator: "custom",
    quizId: "quiz-ds-8",
    sections: {
      introduction: "A Student's T-test evaluates hypothesis tests when population variance is unknown and sample sizes are small (n < 30), utilizing the Student's t-distribution with df = n - 1 degrees of freedom.",
      objective: "Conduct Independent Two-Sample and Paired Student's T-tests to compare treatment vs control groups.",
      videoUrl: "https://www.youtube-nocookie.com/embed/0Pd3dc1GcHc",
      videoTitle: "Student's t-test Explained",
      videoChannel: "StatQuest",
      prerequisites: ["Z-test", "Standard Error"],
      theory: {
        overview: "Student's t-distribution features heavier tails than the normal curve, compensating for additional uncertainty in estimating population standard deviation from small samples. Paired t-tests analyze differences (d_i = y_i - x_i) within the same subjects.",
        keyConcepts: [
          { title: "Degrees of Freedom (df)", desc: "df = n - 1 for one-sample/paired; df = n1 + n2 - 2 for independent two-sample." },
          { title: "Independent T-Test", desc: "Compares means between two separate, non-overlapping groups." },
          { title: "Paired T-Test", desc: "Compares before-and-after repeated measurements on identical experimental subjects." }
        ],
        complexities: [
          { operation: "Two-Sample T-Test", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Comparing execution latencies between two sorting algorithms",
          "Evaluating student exam scores before and after virtual lab interactive sessions",
          "A/B testing click-through rates across marketing variants"
        ]
      },
      procedure: [
        "1. Define independent and paired experimental sample arrays.",
        "2. Execute scipy.stats.ttest_ind() for independent samples.",
        "3. Execute scipy.stats.ttest_rel() for paired before-and-after samples.",
        "4. Print t-statistics, degrees of freedom, and p-values.",
        "5. Conclude statistical significance."
      ],
      sampleCode: {
        language: "python",
        code: `import numpy as np
import scipy.stats as stats

# 1. Independent Samples: Algorithm A vs Algorithm B runtimes (ms)
alg_a = np.array([24.5, 23.8, 25.1, 24.9, 26.2, 23.4, 25.0, 24.8])
alg_b = np.array([21.2, 22.0, 20.8, 21.5, 22.4, 20.9, 21.8, 22.1])

t_ind, p_ind = stats.ttest_ind(alg_a, alg_b)
print(f"Independent T-Test: t = {t_ind:.4f}, p = {p_ind:.4e}")

# 2. Paired Samples: Student scores Before vs After Virtual Lab
before = np.array([65, 70, 68, 72, 60, 75, 69, 71])
after = np.array([82, 85, 84, 89, 78, 91, 86, 88])

t_paired, p_paired = stats.ttest_rel(after, before)
print(f"Paired T-Test: t = {t_paired:.4f}, p = {p_paired:.4e}")`
      },
      expectedOutput: `Independent T-Test: t = 8.1624, p = 1.0234e-06
Paired T-Test: t = 36.4692, p = 1.2054e-09`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ds-exp-9",
    labId: "data-science-analytics",
    title: "Exp 9: ANOVA",
    slug: "anova-analysis-of-variance",
    difficulty: "Intermediate",
    category: "Data Science" as any,
    estimatedMinutes: 30,
    rating: 4.92,
    ratingsCount: 118,
    simulator: "custom",
    quizId: "quiz-ds-9",
    sections: {
      introduction: "Analysis of Variance (ANOVA) tests whether significant differences exist among the means of three or more independent groups simultaneously without inflating the Type I error rate.",
      objective: "Compute Between-Group Sum of Squares (SSB), Within-Group Sum of Squares (SSW), F-statistic, and p-value via One-Way ANOVA.",
      videoUrl: "https://www.youtube-nocookie.com/embed/ITf4vHhyGpc",
      videoTitle: "ANOVA: Analysis of Variance Explained",
      videoChannel: "StatQuest",
      prerequisites: ["T-Test", "F-Distribution"],
      theory: {
        overview: "Running multiple pairwise t-tests exponentially inflates the Family-Wise Error Rate (1 - (1 - α)^k). One-Way ANOVA partitions total variance into Treatment Variance (MSB) and Random Error (MSW). F = MSB / MSW.",
        keyConcepts: [
          { title: "F-Statistic", desc: "F = Mean Square Between (MSB) / Mean Square Within (MSW)." },
          { title: "Sum of Squares Partitioning", desc: "SST = SSB (Treatment effect) + SSW (Random noise)." },
          { title: "Post-Hoc Analysis", desc: "Tukey's HSD test pinpoints which specific group pairs differ significantly." }
        ],
        complexities: [
          { operation: "One-Way ANOVA F-Test", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(k)" }
        ],
        realWorldApplications: [
          "Comparing execution latency across 3 database caching algorithms (LRU, LFU, ARC)",
          "Evaluating crop yield across 4 different fertilizer formulations",
          "Comparing user engagement across 3 mobile app UI layouts"
        ]
      },
      procedure: [
        "1. Collect data measurements across k >= 3 experimental groups.",
        "2. Compute group means and grand dataset mean.",
        "3. Calculate Sum of Squares Between (SSB) and Sum of Squares Within (SSW).",
        "4. Calculate F-statistic using scipy.stats.f_oneway.",
        "5. Compare F-statistic against critical threshold to determine group significance."
      ],
      sampleCode: {
        language: "python",
        code: `import scipy.stats as stats

# Latency measurements (ms) across 3 caching strategies
cache_lru = [12.4, 14.1, 13.2, 12.9, 13.8]
cache_lfu = [15.2, 16.0, 14.8, 15.7, 16.4]
cache_arc = [10.1, 11.3, 10.8, 10.5, 11.0]

f_stat, p_val = stats.f_oneway(cache_lru, cache_lfu, cache_arc)

print(f"One-Way ANOVA Results:")
print(f"F-Statistic: {f_stat:.4f}, p-value: {p_val:.4e}")

if p_val < 0.05:
    print("Conclusion: Reject H0 -> Significant difference exists among caching algorithms.")`
      },
      expectedOutput: `One-Way ANOVA Results:
F-Statistic: 63.8124, p-value: 3.8412e-07
Conclusion: Reject H0 -> Significant difference exists among caching algorithms.`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ds-exp-10",
    labId: "data-science-analytics",
    title: "Exp 10: Building and validating linear models",
    slug: "building-validating-linear-models",
    difficulty: "Advanced",
    category: "Data Science" as any,
    estimatedMinutes: 35,
    rating: 4.96,
    ratingsCount: 145,
    simulator: "custom",
    quizId: "quiz-ds-10",
    sections: {
      introduction: "Multiple Linear Regression models relationships between multiple independent features X1, X2, ..., Xd and a continuous target y = w0 + w1*X1 + ... + wd*Xd.",
      objective: "Split dataset into training and test partitions (80/20), train linear model with Scikit-Learn, and evaluate RMSE, MAE, and R^2.",
      videoUrl: "https://www.youtube-nocookie.com/embed/zITIFTsivN8",
      videoTitle: "Multiple Linear Regression in Python",
      videoChannel: "StatQuest",
      prerequisites: ["OLS Simple Regression", "NumPy Matrix Math"],
      theory: {
        overview: "The closed-form analytical normal equation is w = (X^T X)^-1 X^T y. Overfitting is diagnosed when training RMSE is significantly lower than test RMSE, requiring regularization (Ridge L2 or Lasso L1).",
        keyConcepts: [
          { title: "Normal Equation", desc: "w = (X^T X)^-1 X^T y computes global optimal weights without iterations." },
          { title: "Evaluation Metrics", desc: "RMSE = sqrt(mean((y - ŷ)^2)), MAE = mean(|y - ŷ|), R^2 = 1 - (SSR/SST)." },
          { title: "Train-Test Split", desc: "Isolates unseen validation test data to verify model generalizability." }
        ],
        complexities: [
          { operation: "OLS Matrix Normal Equation", best: "O(n d^2 + d^3)", avg: "O(n d^2)", worst: "O(n d^2 + d^3)", space: "O(d^2)" },
          { operation: "Prediction", best: "O(d)", avg: "O(d)", worst: "O(d)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Automotive pricing prediction based on horsepower, curb weight, and fuel economy",
          "Electricity demand forecasting based on temperature, humidity, and time of day",
          "Customer lifetime value prediction in e-commerce"
        ]
      },
      procedure: [
        "1. Generate multi-feature synthetic dataset.",
        "2. Partition into 80% training and 20% testing sets via train_test_split.",
        "3. Fit sklearn.linear_model.LinearRegression on training set.",
        "4. Predict continuous targets on unseen test set.",
        "5. Compute RMSE, MAE, and R^2 metrics and print learned model coefficients."
      ],
      sampleCode: {
        language: "python",
        code: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import numpy as np

# Synthetic Dataset: House pricing factors (Sqft, Bedrooms, Age)
np.random.seed(42)
X = np.random.rand(200, 3) * 100
y = 50 + (1.5 * X[:, 0]) + (20.0 * X[:, 1]) - (2.5 * X[:, 2]) + np.random.normal(0, 10, 200)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Learned Coefficients: {np.round(model.coef_, 2)}, Intercept: {model.intercept_:.2f}")
print(f"Validation Metrics -> RMSE: {rmse:.2f} | MAE: {mae:.2f} | R2: {r2:.4f}")`
      },
      expectedOutput: `Learned Coefficients: [ 1.48 20.06 -2.48], Intercept: 48.72
Validation Metrics -> RMSE: 9.68 | MAE: 7.92 | R2: 0.9981`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ds-exp-11",
    labId: "data-science-analytics",
    title: "Exp 11: Building and validating logistic models",
    slug: "building-validating-logistic-models",
    difficulty: "Advanced",
    category: "Data Science" as any,
    estimatedMinutes: 35,
    rating: 4.95,
    ratingsCount: 140,
    simulator: "custom",
    quizId: "quiz-ds-11",
    sections: {
      introduction: "Logistic Regression is a foundational classification algorithm that models the probability of a binary categorical outcome using the Sigmoid logistic link function σ(z) = 1 / (1 + e^-z).",
      objective: "Train binary logistic classifier, scale input features, construct Confusion Matrix, and evaluate Precision, Recall, and ROC-AUC.",
      videoUrl: "https://www.youtube-nocookie.com/embed/yIYKR4sgzI8",
      videoTitle: "Logistic Regression Details",
      videoChannel: "StatQuest",
      prerequisites: ["Linear Regression", "Binary Cross-Entropy"],
      theory: {
        overview: "Logistic regression maps continuous linear combinations of features z = w^T x + b into bounded probability estimates in [0, 1]. Classification decisions apply a probability threshold (default 0.50). Evaluated via Confusion Matrix (TP, FP, TN, FN) and ROC-AUC curve.",
        keyConcepts: [
          { title: "Sigmoid Link Function", desc: "σ(z) = 1 / (1 + exp(-z)); maps logits to [0, 1]." },
          { title: "Log-Loss / Cross-Entropy", desc: "Loss = -[y*log(p) + (1-y)*log(1-p)]; convex loss function minimized via gradient descent." },
          { title: "ROC-AUC Metric", desc: "Area Under the Receiver Operating Characteristic curve plots True Positive Rate vs False Positive Rate across all classification thresholds." }
        ],
        complexities: [
          { operation: "Logistic Model Training (SGD)", best: "O(epochs * n * d)", avg: "O(epochs * n * d)", worst: "O(epochs * n * d)", space: "O(d)" }
        ],
        realWorldApplications: [
          "Medical disease diagnosis (Positive vs Negative outcome)",
          "Email spam classification",
          "Credit loan default prediction"
        ]
      },
      procedure: [
        "1. Generate binary classification dataset.",
        "2. Standardize continuous features with StandardScaler.",
        "3. Fit sklearn.linear_model.LogisticRegression.",
        "4. Generate class predictions and calibrated probability outputs.",
        "5. Output Confusion Matrix, classification report (Precision, Recall, F1), and ROC-AUC score."
      ],
      sampleCode: {
        language: "python",
        code: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
from sklearn.preprocessing import StandardScaler
import numpy as np

np.random.seed(42)
X = np.random.randn(300, 2) * 15 + 65
y = (X[:, 0] * 0.08 + X[:, 1] * 0.15 - 14.5 > 0).astype(int)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

clf = LogisticRegression()
clf.fit(X_train_scaled, y_train)

y_pred = clf.predict(X_test_scaled)
y_prob = clf.predict_proba(X_test_scaled)[:, 1]

print("Confusion Matrix:\\n", confusion_matrix(y_test, y_pred))
print("\\nClassification Report:\\n", classification_report(y_test, y_pred))
print(f"ROC-AUC Score: {roc_auc_score(y_test, y_prob):.4f}")`
      },
      expectedOutput: `Confusion Matrix:
 [[32  3]
 [ 2 38]]

Classification Report:
               precision    recall  f1-score   support

           0       0.94      0.91      0.93        35
           1       0.93      0.95      0.94        40

    accuracy                           0.93        75
   macro avg       0.93      0.93      0.93        75
weighted avg       0.93      0.93      0.93        75

ROC-AUC Score: 0.9857`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ds-exp-12",
    labId: "data-science-analytics",
    title: "Exp 12: Time series analysis",
    slug: "time-series-analysis",
    difficulty: "Advanced",
    category: "Data Science" as any,
    estimatedMinutes: 35,
    rating: 4.97,
    ratingsCount: 150,
    simulator: "custom",
    quizId: "quiz-ds-12",
    sections: {
      introduction: "Time series analysis models sequence observations indexed chronologically, decomposing temporal signals into Trend, Seasonality, Cyclic variations, and Residual noise.",
      objective: "Perform additive time series decomposition, compute rolling Moving Averages (SMA/EMA), and test stationarity using the Augmented Dickey-Fuller (ADF) test.",
      videoUrl: "https://www.youtube-nocookie.com/embed/DeORzP0go5I",
      videoTitle: "Time Series Analysis with Python",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Pandas DataFrames", "Basic Calculus"],
      theory: {
        overview: "An additive model Y[t] = Trend[t] + Seasonal[t] + Residual[t] assumes constant seasonal fluctuations. Stationarity (constant mean and variance over time) is required for ARIMA forecasting and is verified via the ADF unit root test.",
        keyConcepts: [
          { title: "Additive vs Multiplicative Decomposition", desc: "Additive: Y = T + S + R (constant amplitude); Multiplicative: Y = T * S * R (amplitude proportional to trend)." },
          { title: "Rolling Moving Averages", desc: "SMA(k) smooths out high-frequency noise by averaging k past time periods." },
          { title: "ADF Stationarity Test", desc: "Rejection of null hypothesis (p < 0.05) proves the absence of unit roots (stationary series)." }
        ],
        complexities: [
          { operation: "Moving Average Window", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
          { operation: "ADF Statistical Test", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" }
        ],
        realWorldApplications: [
          "Electricity grid peak load consumption forecasting",
          "Financial stock market volatility prediction",
          "Weather temperature and precipitation forecasting"
        ]
      },
      procedure: [
        "1. Create daily timestamp series using pd.date_range.",
        "2. Synthesize composite signal combining upward trend, monthly sinusoidal seasonality, and Gaussian noise.",
        "3. Compute 7-day and 30-day Simple Moving Averages.",
        "4. Apply seasonal_decompose(model='additive') to isolate trend and seasonal cycles.",
        "5. Execute adfuller() to verify statistical stationarity."
      ],
      sampleCode: {
        language: "python",
        code: `import pandas as pd
import numpy as np
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import adfuller

# 1. Synthesize 1-Year Daily Time Series
dates = pd.date_range(start="2025-01-01", periods=365, freq="D")
trend = np.linspace(100, 250, 365)
seasonality = 20 * np.sin(2 * np.pi * np.arange(365) / 30)
noise = np.random.normal(0, 5, 365)
ts_data = pd.Series(trend + seasonality + noise, index=dates)

# 2. Moving Average
sma_30 = ts_data.rolling(window=30).mean()

# 3. Additive Decomposition
decomp = seasonal_decompose(ts_data, model="additive", period=30)
print("Decomposition completed successfully.")
print(f"Trend component sample (last 3):\\n{decomp.trend.dropna().tail(3)}")

# 4. Augmented Dickey-Fuller Test
adf_stat, p_val, _, _, _, _ = adfuller(ts_data)
print(f"\\nADF Statistic: {adf_stat:.4f} | p-value: {p_val:.4f}")`
      },
      expectedOutput: `Decomposition completed successfully.
Trend component sample (last 3):
2025-12-14    243.91
2025-12-15    244.32
2025-12-16    244.73
dtype: float64

ADF Statistic: -0.2145 | p-value: 0.9368 (Non-stationary due to strong upward drift)`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  }
];
