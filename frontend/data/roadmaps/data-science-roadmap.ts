import { DSACategory } from "../dsa-topic-data";

export const DATA_SCIENCE_ROADMAP_CATEGORIES: DSACategory[] = [
  // ========================================================
  // MODULE 1: EXCEL FUNDAMENTALS (0/3)
  // ========================================================
  {
    id: "ba-excel-fundamentals",
    name: "1. Excel Fundamentals",
    shortDesc: "Interface features, formulas, numerical operators, and multi-format data import/export.",
    iconName: "Code2",
    topics: [
      {
        id: "ba-excel-features",
        slug: "explore-features-of-ms-excel",
        title: "Exp 1: Explore the Features of MS-Excel",
        categoryId: "ba-excel-fundamentals",
        categoryName: "1. Excel Fundamentals",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "MS Excel interface ribbons formula bar cell referencing worksheet basics",
        gfgUrl: "https://www.geeksforgeeks.org/ms-excel-tutorial/",
        quickSummary: "Get familiar with the Excel interface — cells, formulas, formatting, and basic worksheet operations.",
        keyPoints: [
          "Cell coordinate addressing: Cells hold data or formulas referenced by row-column coordinates (e.g. A1, $B$4).",
          "Tabular formatting: Formatting (column width, text wrap, number types) improves readability of tabular data.",
          "Formula foundations: Formula entry and editing is the foundation for all later numeric analysis in Excel."
        ],
        diagramTitle: "MS Excel Grid Anatomy & Ribbon Structure",
        diagram: `  ┌────────────────────────────────────────────────────────┐
  │ [ Ribbon Toolbar ] [ Formula Bar: =SUM(A1:A10) ]       │
  ├──────┬───────────────┬───────────────┬─────────────────┤
  │      │       A       │       B       │        C        │
  ├──────┼───────────────┼───────────────┼─────────────────┤
  │  1   │ Product       │ Quantity      │ Price           │
  │  2   │ Laptop        │ 15            │ $1,200.00       │
  │  3   │ Mouse         │ 50            │ $25.00          │
  └──────┴───────────────┴───────────────┴─────────────────┘`,
        complexities: [],
        tools: [
          { tool: "MS Excel", purpose: "Spreadsheet basics, cell referencing, and worksheet operations", notes: "Standard desktop or web edition" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Excel Formulas & Shortcuts",
            code: `# Standard Excel Navigation & Grid Formulas
# 1. Total Revenue in Row 2
=B2 * C2

# 2. Cumulative Column Sum
=SUM(C2:C50)

# 3. Formatted Currency Representation
Ctrl + Shift + 4 (Applies $ Currency Format)`
          }
        ],
        practiceProblems: [
          {
            title: "MS Excel Basics Tutorial",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/ms-excel-tutorial/",
            platform: "GeeksforGeeks",
            topicTag: "Excel"
          }
        ]
      },
      {
        id: "ba-excel-numerical-ops",
        slug: "numerical-operations-max-min-avg-sum-sqrt-round",
        title: "Exp 2a: Get Input from the User and Perform Numerical Operations (MAX, MIN, AVG, SUM, SQRT, ROUND)",
        categoryId: "ba-excel-fundamentals",
        categoryName: "1. Excel Fundamentals",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Excel functions SUM AVERAGE MAX MIN SQRT ROUND syntax examples",
        gfgUrl: "https://www.geeksforgeeks.org/important-excel-functions/",
        quickSummary: "Apply Excel's built-in statistical/numeric functions to a set of user-entered values.",
        keyPoints: [
          "Summary functions: MAX/MIN/AVG/SUM summarize a range of numeric values efficiently.",
          "Mathematical transformations: SQRT and ROUND perform mathematical transformation and precision control.",
          "Dynamic range references: Function arguments reference cell ranges rather than hard-coded values, enabling reuse."
        ],
        diagramTitle: "Excel Statistical & Numeric Functions Pipeline",
        diagram: `  User Inputs: [ 45, 68, 92, 14, 83, 77 ]
        │
        ├── =SUM(A1:A6)     ──► 379
        ├── =AVERAGE(A1:A6) ──► 63.17 (with =ROUND(..., 2))
        ├── =MAX(A1:A6)     ──► 92
        └── =SQRT(379)      ──► 19.47`,
        complexities: [],
        tools: [
          { tool: "MS Excel", purpose: "Built-in numeric & statistical functions", notes: "Formula calculations" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Excel Formulas",
            code: `# Numerical Operations in Excel Cells
=SUM(B2:B20)               # Total Aggregate
=AVERAGE(B2:B20)           # Arithmetic Mean
=MAX(B2:B20)               # Peak Maximum
=MIN(B2:B20)               # Valley Minimum
=SQRT(C2)                  # Square Root Calculation
=ROUND(AVERAGE(B2:B20), 2) # Two-decimal precision round`
          }
        ],
        practiceProblems: [
          {
            title: "Important Functions in Excel",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/important-excel-functions/",
            platform: "GeeksforGeeks",
            topicTag: "Excel"
          }
        ]
      },
      {
        id: "ba-excel-import-export",
        slug: "data-import-export-operations-file-formats",
        title: "Exp 2b: Perform Data Import/Export Operations for Different File Formats",
        categoryId: "ba-excel-fundamentals",
        categoryName: "1. Excel Fundamentals",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Excel import CSV text wizard export PDF XLSX delimiter",
        gfgUrl: "https://www.geeksforgeeks.org/how-to-import-csv-file-into-excel/",
        quickSummary: "Practice importing data into Excel (CSV, text) and exporting Excel data to other formats.",
        keyPoints: [
          "Format wizards & delimiters: Different file formats (CSV, TXT, XLSX) require different import wizards and delimiter configurations (comma, tab).",
          "Data type integrity: Data types (dates, numbers, text) must be correctly interpreted during import to avoid corruption.",
          "Preservation tradeoffs: Exporting preserves or loses formatting/formulas depending on the target format chosen."
        ],
        diagramTitle: "Excel Ingress & Egress Data Conversions",
        diagram: `  [ External CSV / TXT ] ──► [ Text Import Wizard (Delimiter: Comma) ] ──► [ Excel Grid ]
                                                                                   │
                                [ Formatted XLSX / PDF / Clean CSV ] ◄── Export ───┘`,
        complexities: [],
        tools: [
          { tool: "MS Excel", purpose: "Import/export practice with CSV, TXT, and XLSX", notes: "Data tab -> Get Data" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Verifying CSV & Excel Export)",
            code: `import pandas as pd

# 1. Read Raw CSV
df = pd.read_csv("raw_student_data.csv")

# 2. Inspect Column Types and Delimiters
print(df.info())

# 3. Export to Clean Excel Format
df.to_excel("standardized_student_report.xlsx", index=False)
print("Dataset imported from CSV and exported to XLSX successfully.")`
          }
        ],
        practiceProblems: [
          {
            title: "Importing Data into Excel",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/how-to-import-csv-file-into-excel/",
            platform: "GeeksforGeeks",
            topicTag: "Data Ingestion"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 2: DESCRIPTIVE & INFERENTIAL STATISTICS (0/4)
  // ========================================================
  {
    id: "ba-statistics-hypothesis",
    name: "2. Descriptive & Inferential Statistics",
    shortDesc: "Central tendency, dispersion, Skewness, Kurtosis, Z-test, T-test, and ANOVA.",
    iconName: "BarChart3",
    topics: [
      {
        id: "ba-descriptive-stats",
        slug: "statistical-operations-descriptive-statistics",
        title: "Exp 3: Perform Statistical Operations — Mean, Median, Mode, Standard Deviation, Variance, Skewness, Kurtosis",
        categoryId: "ba-statistics-hypothesis",
        categoryName: "2. Descriptive & Inferential Statistics",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Excel Data Analysis ToolPak descriptive statistics skewness kurtosis",
        gfgUrl: "https://www.geeksforgeeks.org/descriptive-statistics-in-excel/",
        quickSummary: "Compute a full set of descriptive statistics on a dataset to summarize its central tendency, spread, and shape.",
        keyPoints: [
          "Central tendency: Mean, Median, and Mode describe central tendency from different perspectives (average, middle value, most frequent).",
          "Dispersion: Standard deviation and variance quantify spread and dispersion around the mean.",
          "Distribution shape: Skewness and kurtosis describe the asymmetry and tailedness of the data's distribution."
        ],
        diagramTitle: "Descriptive Statistics Variability & Distribution Shape",
        diagram: `  [ Left Skewed (< 0) ]       [ Normal (Bell: Skew=0) ]       [ Right Skewed (> 0) ]
        Tail on Left                 Mean = Median = Mode               Tail on Right`,
        complexities: [],
        tools: [
          { tool: "MS Excel (Data Analysis ToolPak)", purpose: "Descriptive statistics summary reports", notes: "Data -> Data Analysis" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Excel Statistical Formulas",
            code: `=AVERAGE(A2:A100) # Arithmetic Mean
=MEDIAN(A2:A100)  # Middle Centile
=MODE.SNGL(A2:A100) # Most Frequent
=VAR.S(A2:A100)   # Sample Variance
=STDEV.S(A2:A100) # Sample Standard Deviation
=SKEW(A2:A100)    # Distribution Asymmetry
=KURT(A2:A100)    # Distribution Tailedness / Kurtosis`
          }
        ],
        practiceProblems: [
          {
            title: "Descriptive Statistics in Excel",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/descriptive-statistics-in-excel/",
            platform: "GeeksforGeeks",
            topicTag: "Statistics"
          }
        ]
      },
      {
        id: "ba-z-test",
        slug: "perform-z-test",
        title: "Exp 4a: Perform Z-Test",
        categoryId: "ba-statistics-hypothesis",
        categoryName: "2. Descriptive & Inferential Statistics",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Z-test in Excel hypothesis testing two sample for means",
        gfgUrl: "https://www.geeksforgeeks.org/z-test/",
        quickSummary: "Run a Z-test to determine whether a sample mean differs significantly from a known population mean (large sample, known variance).",
        keyPoints: [
          "Assumption criteria: The Z-test assumes a known population standard deviation and a sufficiently large sample size (n >= 30).",
          "Z-statistic formula: A Z-statistic is computed from the sample mean, population mean, and standard error: Z = (x̄ - μ) / (σ / √n).",
          "Decision rule: The resulting p-value is compared against the significance level (alpha = 0.05) to accept or reject the null hypothesis."
        ],
        diagramTitle: "Standard Normal Z-Distribution Critical Rejection Region",
        diagram: `                 [ Null Hypothesis Region (Fail to Reject) ]
                       -1.96 <= Z <= +1.96 (95% Confidence)
          ┌───────────────────────────┴───────────────────────────┐
  ◄───────┴───────                                         ───────┴───────►
  Rejection Region (Z < -1.96)                             Rejection Region (Z > +1.96)`,
        complexities: [],
        tools: [
          { tool: "MS Excel (Data Analysis ToolPak)", purpose: "Hypothesis testing: z-Test: Two Sample for Means", notes: "Alpha = 0.05" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Excel Formula",
            code: `# Z-Test One-Sample P-Value in Excel
=Z.TEST(A2:A50, 75.0, 10.0) 
# Arguments: (Array, Hypothesized Mean, Population Sigma)`
          }
        ],
        practiceProblems: [
          {
            title: "Z-Test Overview & Calculations",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/z-test/",
            platform: "GeeksforGeeks",
            topicTag: "Hypothesis Testing"
          }
        ]
      },
      {
        id: "ba-t-test",
        slug: "perform-t-test",
        title: "Exp 4b: Perform T-Test",
        categoryId: "ba-statistics-hypothesis",
        categoryName: "2. Descriptive & Inferential Statistics",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "t-Test in Excel two sample unequal variances paired Student t-test",
        gfgUrl: "https://www.geeksforgeeks.org/t-test/",
        quickSummary: "Run a T-test to compare means when the population variance is unknown or the sample size is small.",
        keyPoints: [
          "Sample standard deviation: The T-test uses the sample standard deviation (s) in place of an unknown population value.",
          "Comparison variants: Different T-test variants (one-sample, paired before/after, two-sample independent) suit different scenarios.",
          "Degrees of freedom: Degrees of freedom (df = n - 1) govern the heavier tails of the Student t-distribution."
        ],
        diagramTitle: "Student t-Distribution vs Standard Normal Distribution",
        diagram: `  [ Student's t (df=10) has heavier tails than Normal Z ]
  ──► Accommodates smaller sample sizes without underestimating variance.`,
        complexities: [],
        tools: [
          { tool: "MS Excel (Data Analysis ToolPak)", purpose: "Hypothesis testing: t-Test Two-Sample Assuming Equal/Unequal Variances", notes: "Data Analysis ToolPak" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Excel Formula",
            code: `# Two-Sample Two-Tailed T-Test
=T.TEST(A2:A30, B2:B30, 2, 2)
# Arguments: (Array1, Array2, Tails=2, Type=2 [Two-sample equal variance])`
          }
        ],
        practiceProblems: [
          {
            title: "T-Test in Statistics",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/t-test/",
            platform: "GeeksforGeeks",
            topicTag: "Hypothesis Testing"
          }
        ]
      },
      {
        id: "ba-anova",
        slug: "perform-anova",
        title: "Exp 4c: Perform ANOVA",
        categoryId: "ba-statistics-hypothesis",
        categoryName: "2. Descriptive & Inferential Statistics",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "One way ANOVA in Excel Data Analysis F-statistic p-value",
        gfgUrl: "https://www.geeksforgeeks.org/anova-analysis-of-variance/",
        quickSummary: "Use Analysis of Variance to test whether the means of three or more groups differ significantly.",
        keyPoints: [
          "Variance partitioning: ANOVA partitions total variance into between-group variance and within-group error variance.",
          "F-statistic comparison: An F-statistic (MS_between / MS_within) compares these variance components to test the null hypothesis.",
          "Omnibus interpretation: A significant result indicates at least one group mean differs, though not which one (requiring post-hoc tests)."
        ],
        diagramTitle: "ANOVA Between-Group vs Within-Group Variance",
        diagram: `  Total Variance = SS_Between (Treatment Effect) + SS_Within (Random Error)
  F = MS_Between / MS_Within
  If F > F_critical (or p < 0.05) ──► Reject H0: At least one group mean differs!`,
        complexities: [],
        tools: [
          { tool: "MS Excel (Data Analysis ToolPak)", purpose: "Multi-group hypothesis testing (Anova: Single Factor)", notes: "Alpha = 0.05" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Excel ANOVA Workflow",
            code: `# Excel Ribbon Action:
# 1. Data -> Data Analysis -> Anova: Single Factor
# 2. Input Range: $A$1:$C$50 (Columns: Group A, Group B, Group C)
# 3. Check "Labels in first row", Alpha = 0.05
# 4. Review Summary: F-statistic, P-value, F critical`
          }
        ],
        practiceProblems: [
          {
            title: "Analysis of Variance (ANOVA)",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/anova-analysis-of-variance/",
            platform: "GeeksforGeeks",
            topicTag: "Hypothesis Testing"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 3: DATA PREPROCESSING & DIMENSIONALITY REDUCTION (0/3)
  // ========================================================
  {
    id: "ba-preprocessing-dim-reduction",
    name: "3. Data Preprocessing & Dimensionality Reduction",
    shortDesc: "Missing data handling, Min-Max / Z-score normalization, PCA, KPCA, and SVD.",
    iconName: "Layers",
    topics: [
      {
        id: "ba-missing-data-handling",
        slug: "data-preprocessing-handling-missing-data",
        title: "Exp 5a: Perform Data Pre-Processing Operations — Handling Missing Data",
        categoryId: "ba-preprocessing-dim-reduction",
        categoryName: "3. Data Preprocessing & Dimensionality Reduction",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Handling missing data imputation mean median mode Excel Power BI",
        gfgUrl: "https://www.geeksforgeeks.org/working-with-missing-data-in-pandas/",
        quickSummary: "Detect and treat missing values in a dataset using common strategies (removal, mean/median imputation, etc.).",
        keyPoints: [
          "Removal vs imputation: Missing data can be handled by row/column removal when missingness is minimal and random.",
          "Imputation strategies: Imputation (mean, median, mode, or linear interpolation) fills gaps while preserving dataset sample size.",
          "Downstream impact: The choice of imputation method affects downstream variance, standard deviation, and modeling results."
        ],
        diagramTitle: "Missing Data Imputation Strategies",
        diagram: `  [ Raw Dataset with Nulls ]
             │
             ├── MCAR Minimal (<3%)  ──► Listwise Deletion (Drop Row)
             └── Numeric Features    ──► Impute with Column Median / Mean`,
        complexities: [],
        tools: [
          { tool: "MS Excel / Power BI", purpose: "Data cleaning and missing value replacement", notes: "Power Query: Replace Values" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Power Query / Excel Formulas",
            code: `# Excel Conditional Imputation
=IF(ISBLANK(B2), AVERAGE($B$2:$B$100), B2)

# Power Query M Formula
Table.ReplaceValue(Source, null, 0, Replacer.ReplaceValue, {"Revenue"})`
          }
        ],
        practiceProblems: [
          {
            title: "Handling Missing Data Techniques",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/working-with-missing-data-in-pandas/",
            platform: "GeeksforGeeks",
            topicTag: "Data Cleaning"
          }
        ]
      },
      {
        id: "ba-data-normalization",
        slug: "data-preprocessing-normalization",
        title: "Exp 5b: Perform Data Pre-Processing Operations — Normalization",
        categoryId: "ba-preprocessing-dim-reduction",
        categoryName: "3. Data Preprocessing & Dimensionality Reduction",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Data normalization Min Max scaling Z-score standardization Excel",
        gfgUrl: "https://www.geeksforgeeks.org/data-normalization-in-data-mining/",
        quickSummary: "Rescale numeric features onto a common range (e.g. 0–1 or z-scores) to prepare data for comparison or modeling.",
        keyPoints: [
          "Min-Max normalization: Min-Max normalization rescales values into a bounded range [0, 1] based on dataset minimum and maximum: (x - min) / (max - min).",
          "Z-score standardization: Z-score standardization centers data around a mean of 0 with unit standard deviation: (x - μ) / σ.",
          "Scale discrepancy resolution: Normalization matters most when features are on drastically different scales (e.g. Salary in thousands vs. Age in tens)."
        ],
        diagramTitle: "Feature Rescaling: Min-Max vs Z-Score",
        diagram: `  Original Range [20,000 to 180,000]
        │
        ├── Min-Max Normalization  ──► [0.0 to 1.0]
        └── Z-Score Standardization ──► Mean = 0, Std = 1`,
        complexities: [],
        tools: [
          { tool: "MS Excel / Power BI", purpose: "Feature scaling and numeric transformation", notes: "Custom formula columns" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Excel Formulas",
            code: `# 1. Min-Max Normalization (Bounded [0, 1])
=(A2 - MIN($A$2:$A$100)) / (MAX($A$2:$A$100) - MIN($A$2:$A$100))

# 2. Z-Score Standardization
=(A2 - AVERAGE($A$2:$A$100)) / STDEV.S($A$2:$A$100)`
          }
        ],
        practiceProblems: [
          {
            title: "Data Normalization in Data Mining",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/data-normalization-in-data-mining/",
            platform: "GeeksforGeeks",
            topicTag: "Normalization"
          }
        ]
      },
      {
        id: "ba-dim-reduction-pca-kpca-svd",
        slug: "dimensionality-reduction-pca-kpca-svd",
        title: "Exp 6: Perform Dimensionality Reduction Operation Using PCA, KPCA & SVD",
        categoryId: "ba-preprocessing-dim-reduction",
        categoryName: "3. Data Preprocessing & Dimensionality Reduction",
        difficulty: "Advanced",
        estimatedTime: "35 mins",
        gfgSearchQuery: "Dimensionality reduction PCA Kernel PCA SVD Python Excel",
        gfgUrl: "https://www.geeksforgeeks.org/principal-component-analysis-pca/",
        quickSummary: "Apply Principal Component Analysis, Kernel PCA, and Singular Value Decomposition to reduce the number of variables while retaining most of the data's variance.",
        keyPoints: [
          "Orthogonal projection: PCA projects high-dimensional data onto orthogonal components ordered by the variance they explain.",
          "Non-linear kernel trick: Kernel PCA extends PCA to capture non-linear manifold structures via a kernel-transformed feature space.",
          "Matrix factorization: SVD decomposes a data matrix into singular vectors and singular values: X = U Σ V^T, underlying PCA and low-rank approximation."
        ],
        diagramTitle: "PCA Orthogonal Axis Rotation",
        diagram: `  [ Correlated 2D Features (X1, X2) ]
                   │
                   ▼ (Eigen Decomposition)
  [ Principal Component 1 (Max Variance) ] ──► [ PC 2 (Orthogonal) ]`,
        complexities: [],
        tools: [
          { tool: "Excel / Python add-in or equivalent", purpose: "Dimensionality reduction & covariance decomposition", notes: "PCA / SVD algorithms" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (PCA & SVD Decomposition)",
            code: `import numpy as np
from sklearn.decomposition import PCA, KernelPCA

# Sample Multidimensional Data
X = np.random.randn(100, 6) # 100 samples, 6 features

# 1. Standard PCA to 2 Components
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)
print("Explained Variance Ratio:", pca.explained_variance_ratio_)

# 2. Kernel PCA (RBF Non-linear)
kpca = KernelPCA(n_components=2, kernel='rbf')
X_kpca = kpca.fit_transform(X)

# 3. Direct Singular Value Decomposition (SVD)
U, S, Vt = np.linalg.svd(X - np.mean(X, axis=0))
print("Top 2 Singular Values:", S[:2])`
          }
        ],
        practiceProblems: [
          {
            title: "Principal Component Analysis (PCA)",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/principal-component-analysis-pca/",
            platform: "GeeksforGeeks",
            topicTag: "Dimensionality Reduction"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 4: EXPLORATORY DATA ANALYSIS (0/3)
  // ========================================================
  {
    id: "ba-exploratory-data-analysis",
    name: "4. Exploratory Data Analysis",
    shortDesc: "Bivariate correlation, multivariate interaction matrices, and statistical charting.",
    iconName: "Network",
    topics: [
      {
        id: "ba-bivariate-analysis",
        slug: "bivariate-analysis-on-dataset",
        title: "Exp 7a: Perform Bivariate Analysis on the Dataset",
        categoryId: "ba-exploratory-data-analysis",
        categoryName: "4. Exploratory Data Analysis",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Bivariate analysis Pearson correlation scatter plot cross-tabulation Excel",
        gfgUrl: "https://www.geeksforgeeks.org/bivariate-analysis/",
        quickSummary: "Examine the relationship between two variables (e.g. correlation, cross-tabulation, scatter comparison).",
        keyPoints: [
          "Linear correlation: Correlation coefficients (Pearson's r) quantify the strength and direction of a linear relationship between two numeric variables.",
          "Contingency tables: Cross-tabulation summarizes the co-occurrence relationships between two categorical variables.",
          "Visual pattern inspection: Scatter plots visually reveal clusters, linear trends, and outliers between two variables."
        ],
        diagramTitle: "Bivariate Correlation & Scatter Plot Matrix",
        diagram: `  [ Variable X (Ad Spend) ] vs [ Variable Y (Sales) ]
  Scatter: Upward slope with r = +0.87 (Strong Positive Correlation)`,
        complexities: [],
        tools: [
          { tool: "MS Excel", purpose: "Two-variable analysis, scatter plots, and correlation", notes: "Data Analysis ToolPak: Correlation" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Excel Formula",
            code: `# Pearson Correlation Coefficient
=CORREL(A2:A100, B2:B100)

# Linear Slope & Intercept for Trendline
=SLOPE(B2:B100, A2:A100)
=INTERCEPT(B2:B100, A2:A100)`
          }
        ],
        practiceProblems: [
          {
            title: "Bivariate Analysis in Data Science",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/bivariate-analysis/",
            platform: "GeeksforGeeks",
            topicTag: "EDA"
          }
        ]
      },
      {
        id: "ba-multivariate-analysis",
        slug: "multivariate-analysis-on-dataset",
        title: "Exp 7b: Perform Multivariate Analysis on the Dataset",
        categoryId: "ba-exploratory-data-analysis",
        categoryName: "4. Exploratory Data Analysis",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Multivariate analysis correlation matrix pair plot Excel Python",
        gfgUrl: "https://www.geeksforgeeks.org/multivariate-analysis/",
        quickSummary: "Extend the analysis to relationships among three or more variables simultaneously.",
        keyPoints: [
          "Correlation matrices: Correlation matrices summarize pairwise relationships across many variables at once in a heatmap grid.",
          "High-dimensional visualization: Multivariate visualization (pair plots, grouped bubble charts) reveals interactions not visible in single-pair analysis.",
          "Predictive foundation: Multivariate analysis lays the groundwork for regression and clustering involving multiple predictors."
        ],
        diagramTitle: "Multivariate Correlation Matrix Grid",
        diagram: `           │ Price │ Units │ Rating │ Margin
  ─────────┼───────┼───────┼────────┼───────
  Price    │  1.00 │ -0.42 │  0.15  │  0.68
  Units    │ -0.42 │  1.00 │  0.35  │ -0.25
  Rating   │  0.15 │  0.35 │  1.00  │  0.12
  Margin   │  0.68 │ -0.25 │  0.12  │  1.00`,
        complexities: [],
        tools: [
          { tool: "MS Excel", purpose: "Multi-variable analysis and correlation matrices", notes: "Data -> Data Analysis -> Correlation" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Correlation Matrix Heatmap)",
            code: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("business_metrics.csv")
corr_matrix = df.corr()

plt.figure(figsize=(8, 6))
sns.heatmap(corr_matrix, annot=True, cmap="Blues", fmt=".2f")
plt.title("Multivariate Correlation Matrix")
plt.show()`
          }
        ],
        practiceProblems: [
          {
            title: "Multivariate Analysis Techniques",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/multivariate-analysis/",
            platform: "GeeksforGeeks",
            topicTag: "EDA"
          }
        ]
      },
      {
        id: "ba-plotting-functions",
        slug: "various-plotting-functions-on-dataset",
        title: "Exp 8: Apply and Explore Various Plotting Functions on the Dataset",
        categoryId: "ba-exploratory-data-analysis",
        categoryName: "4. Exploratory Data Analysis",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Excel chart types bar line scatter histogram box plot visualization",
        gfgUrl: "https://www.geeksforgeeks.org/charts-in-excel/",
        quickSummary: "Create a range of chart types (bar, line, pie, scatter, histogram, box plot) to visualize different aspects of the dataset.",
        keyPoints: [
          "Analytical chart matching: Chart type should match the data type and analytical question (trend, comparison, distribution, relationship).",
          "Distribution shape & outliers: Histograms and box plots reveal distribution shape, quartiles, and outlier anomalies.",
          "Visual communication standards: Consistent labeling, legends, and axis scaling are essential for charts to communicate accurately."
        ],
        diagramTitle: "Chart Selection Matrix for Business Intelligence",
        diagram: `  [ Trend Over Time ] ──► Line Chart
  [ Category Compare ] ──► Bar / Column Chart
  [ Distribution ]    ──► Histogram / Box & Whisker
  [ Correlation ]     ──► Scatter Plot`,
        complexities: [],
        tools: [
          { tool: "MS Excel", purpose: "Business data visualization and chart generation", notes: "Insert -> Charts menu" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Excel Chart Shortcuts",
            code: `# Instant Chart Generation in Excel
1. Select Data Range (e.g. A1:D25)
2. Press Alt + F1 (Creates embedded 2D Column Chart)
3. Change Chart Type -> Box & Whisker or Histogram for statistical distributions`
          }
        ],
        practiceProblems: [
          {
            title: "Types of Charts in MS Excel",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/charts-in-excel/",
            platform: "GeeksforGeeks",
            topicTag: "Data Visualization"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 5: POWER BI FUNDAMENTALS (0/3)
  // ========================================================
  {
    id: "ba-power-bi-fundamentals",
    name: "5. Power BI Fundamentals",
    shortDesc: "Power BI Desktop views, Power Query ETL pipelines, and star schema data modeling.",
    iconName: "Sparkles",
    topics: [
      {
        id: "ba-powerbi-desktop-features",
        slug: "explore-features-power-bi-desktop",
        title: "Exp 9: Explore the Features of Power BI Desktop",
        categoryId: "ba-power-bi-fundamentals",
        categoryName: "5. Power BI Fundamentals",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Power BI Desktop interface Report Data Model view visuals",
        gfgUrl: "https://www.geeksforgeeks.org/power-bi-tutorial/",
        quickSummary: "Get familiar with the Power BI Desktop interface — Report, Data, and Model views, and its core building blocks.",
        keyPoints: [
          "Three core viewports: Power BI Desktop is organized into Report, Data, and Model views for building visuals, inspecting data, and defining relationships.",
          "Report building blocks: Reports are composed of interactive visuals placed on one or more report canvas pages.",
          "Hybrid connectivity: Power BI connects to hundreds of data sources for Import mode or DirectQuery live access."
        ],
        diagramTitle: "Power BI Desktop Interface Three-View Architecture",
        diagram: `  ┌────────────────────────────────────────────────────────┐
  │ [ Report View: Canvas & Visuals ]                      │
  ├────────────────────────────────────────────────────────┤
  │ [ Data View: Tabular Rows & Columns ]                  │
  ├────────────────────────────────────────────────────────┤
  │ [ Model View: Entity Relationships & Star Schema ]     │
  └────────────────────────────────────────────────────────┘`,
        complexities: [],
        tools: [
          { tool: "Power BI Desktop", purpose: "BI tool orientation, report authoring, and views", notes: "Free desktop download" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Power BI Workflow",
            code: `# Getting Started in Power BI Desktop
1. Home -> Get Data -> Excel Workbook / CSV
2. Navigator -> Select Target Tables -> Transform Data (Power Query)
3. Close & Apply -> Switch to Report Canvas
4. Drag Fields into Visualizations pane`
          }
        ],
        practiceProblems: [
          {
            title: "Power BI Architecture & Views",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/power-bi-tutorial/",
            platform: "GeeksforGeeks",
            topicTag: "Power BI"
          }
        ]
      },
      {
        id: "ba-powerbi-prepare-load",
        slug: "prepare-and-load-data-power-query",
        title: "Exp 10: Prepare & Load Data",
        categoryId: "ba-power-bi-fundamentals",
        categoryName: "5. Power BI Fundamentals",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Power Query Applied Steps data transformation clean load Power BI",
        gfgUrl: "https://www.geeksforgeeks.org/power-query-in-power-bi/",
        quickSummary: "Use Power Query within Power BI to connect to, clean, and load a dataset for reporting.",
        keyPoints: [
          "Repeatable transformation pipeline: Power Query provides a step-by-step, repeatable transformation pipeline (the Applied Steps list).",
          "Core data transforms: Common transforms include removing unnecessary columns, changing data types, filtering rows, and merging queries.",
          "Model data ingress: The loaded, transformed data becomes the clean model data source for downstream visuals."
        ],
        diagramTitle: "Power Query Applied Steps Pipeline",
        diagram: `  [ Source (Raw CSV) ] ──► [ Promoted Headers ] ──► [ Changed Column Types ]
                                                                 │
  [ Clean Model Source ] ◄── [ Filtered Out Nulls ] ◄── [ Removed Columns ]`,
        complexities: [],
        tools: [
          { tool: "Power BI (Power Query)", purpose: "Data preparation, ETL transformations, and loading", notes: "Applied Steps engine" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Power Query M Script Sample",
            code: `let
    Source = Csv.Document(File.Contents("C:\\Data\\sales.csv"), [Delimiter=",", Encoding=65001]),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",{{"SalesAmount", type number}, {"OrderDate", type date}}),
    #"Filtered Rows" = Table.SelectRows(#"Changed Type", each [SalesAmount] > 0)
in
    #"Filtered Rows"`
          }
        ],
        practiceProblems: [
          {
            title: "Data Transformation with Power Query",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/power-query-in-power-bi/",
            platform: "GeeksforGeeks",
            topicTag: "Power Query"
          }
        ]
      },
      {
        id: "ba-powerbi-data-model",
        slug: "develop-the-data-model-relationships",
        title: "Exp 11: Develop the Data Model",
        categoryId: "ba-power-bi-fundamentals",
        categoryName: "5. Power BI Fundamentals",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Power BI data modeling star schema cardinality relationship filter direction",
        gfgUrl: "https://www.geeksforgeeks.org/data-modeling-in-power-bi/",
        quickSummary: "Define relationships between multiple loaded tables to build a coherent data model (e.g. star schema) for reporting.",
        keyPoints: [
          "Common key relationships: Relationships link tables via common keys, enabling cross-table filtering and unified aggregation.",
          "Star schema pattern: A star schema (central fact table surrounded by dimension tables) is a standard, performant modeling pattern.",
          "Cardinality & cross-filter direction: Cardinality (1:*, 1:1, *.*) and filter direction control how visual filters propagate between related tables."
        ],
        diagramTitle: "Power BI Star Schema Data Model",
        diagram: `  [ DimCustomer (1) ] ──┐
                         │ (1:N)
  [ DimDate (1) ] ─────► [ FactSales (*) ] ◄───── [ DimProduct (1) ]
                         ▲
  [ DimStore (1) ] ──────┘`,
        complexities: [],
        tools: [
          { tool: "Power BI (Model view)", purpose: "Entity relationship modeling & star schema configuration", notes: "Manage Relationships" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Model Relationship Configuration",
            code: `# Configuring Star Schema in Model View:
1. Drag DimCustomer[CustomerID] -> FactSales[CustomerID] (1-to-Many)
2. Drag DimProduct[ProductID]   -> FactSales[ProductID]   (1-to-Many)
3. Set Cross filter direction to 'Single' (Dimension filters Fact)`
          }
        ],
        practiceProblems: [
          {
            title: "Data Modeling in Power BI",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/data-modeling-in-power-bi/",
            platform: "GeeksforGeeks",
            topicTag: "Data Modeling"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 6: POWER BI ANALYTICS & REPORTING (0/3)
  // ========================================================
  {
    id: "ba-powerbi-analytics-reporting",
    name: "6. Power BI Analytics & Reporting",
    shortDesc: "DAX dynamic measures, report canvas visual design, and executive dashboards.",
    iconName: "Award",
    topics: [
      {
        id: "ba-dax-calculations",
        slug: "perform-dax-calculations",
        title: "Exp 12: Perform DAX Calculations",
        categoryId: "ba-powerbi-analytics-reporting",
        categoryName: "6. Power BI Analytics & Reporting",
        difficulty: "Advanced",
        estimatedTime: "35 mins",
        gfgSearchQuery: "DAX in Power BI CALCULATE SUM FILTER measures calculated columns",
        gfgUrl: "https://www.geeksforgeeks.org/dax-in-power-bi/",
        quickSummary: "Write DAX (Data Analysis Expressions) measures and calculated columns to derive custom metrics from the data model.",
        keyPoints: [
          "Calculated columns vs measures: Calculated columns are computed row-by-row and stored in memory; measures are computed dynamically based on report filter context.",
          "Core DAX functions: DAX functions (SUM, CALCULATE, FILTER, RELATED) manipulate aggregations and modify filter contexts.",
          "Evaluation context: Context (row context vs. filter context) determines how a DAX expression evaluates within an individual visual."
        ],
        diagramTitle: "DAX Context Transition & CALCULATE Filter Override",
        diagram: `  [ Report Filter Context: Year=2026, Region='South' ]
                      │
                      ▼
  CALCULATE([Total Sales], ALL(Region)) ──► Strips Region Filter to compute Nationwide Total`,
        complexities: [],
        tools: [
          { tool: "Power BI (DAX)", purpose: "Custom metric calculation and context-aware business measures", notes: "DAX formula bar" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "DAX Formulas",
            code: `# 1. Basic Sum Measure
Total Sales = SUM(FactSales[SalesAmount])

# 2. Context-Modified Measure with CALCULATE
High Value Sales = 
CALCULATE(
    [Total Sales],
    FactSales[SalesAmount] > 1000
)

# 3. Year-over-Year Growth Measure
YoY Sales Growth = 
DIVIDE(
    [Total Sales] - CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date])),
    CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date])),
    0
)`
          }
        ],
        practiceProblems: [
          {
            title: "DAX in Power BI Tutorial",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/dax-in-power-bi/",
            platform: "GeeksforGeeks",
            topicTag: "DAX"
          }
        ]
      },
      {
        id: "ba-report-design",
        slug: "design-a-report-power-bi",
        title: "Exp 13: Design a Report",
        categoryId: "ba-powerbi-analytics-reporting",
        categoryName: "6. Power BI Analytics & Reporting",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Design report Power BI canvas visuals slicers KPIs bookmarks",
        gfgUrl: "https://www.geeksforgeeks.org/reports-in-power-bi/",
        quickSummary: "Lay out visuals (charts, tables, KPIs, slicers) on a report page to answer specific business questions.",
        keyPoints: [
          "Visual purposeful choice: Visual choice should match the underlying question (trend, comparison, part-to-whole, distribution).",
          "Interactive drill-down: Slicers, cross-filtering, and drill-through allow interactive drill-down without altering the underlying data model.",
          "Visual hierarchy: Consistent layout, coordinated color palettes, and clear labeling improve report readability and storytelling."
        ],
        diagramTitle: "Report Page Layout Wireframe",
        diagram: `  ┌────────────────────────────────────────────────────────┐
  │ [ KPI: Revenue ] [ KPI: Orders ] [ KPI: Conversion ]   │
  ├────────────────────────────┬───────────────────────────┤
  │ [ Monthly Revenue Trend ]  │ [ Top 5 Selling Products ]│
  │ (Line Chart)               │ (Horizontal Bar Chart)    │
  ├────────────────────────────┴───────────────────────────┤
  │ [ Interactive Slicers: Date Range, Region, Category ]  │
  └────────────────────────────────────────────────────────┘`,
        complexities: [],
        tools: [
          { tool: "Power BI (Report view)", purpose: "Interactive report design, canvas layout, and slicers", notes: "Visualizations pane" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Report Design Checklist",
            code: `# Business Report Best Practices:
1. Top-left: High-level KPI summary cards (Total Revenue, Active Customers)
2. Center: Primary trend and comparative charts
3. Bottom / Sidebar: Slicers (Date, Region, Segment) with single-select or multi-select`
          }
        ],
        practiceProblems: [
          {
            title: "Reports in Power BI",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/reports-in-power-bi/",
            platform: "GeeksforGeeks",
            topicTag: "Report Design"
          }
        ]
      },
      {
        id: "ba-dashboard-creation",
        slug: "create-dashboard-perform-data-analysis",
        title: "Exp 14: Create a Dashboard and Perform Data Analysis",
        categoryId: "ba-powerbi-analytics-reporting",
        categoryName: "6. Power BI Analytics & Reporting",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Power BI Service dashboards pin tiles data alerts mobile view",
        gfgUrl: "https://www.geeksforgeeks.org/dashboard-in-power-bi/",
        quickSummary: "Pin key visuals into a consolidated dashboard view for at-a-glance monitoring and analysis.",
        keyPoints: [
          "Cross-report aggregation: A dashboard aggregates pinned tiles from one or more reports into a single, high-level executive view.",
          "Operational KPI focus: Dashboards are typically optimized for monitoring vital KPIs rather than deep exploratory analysis.",
          "Interactivity links: Tile clicks and drill-through links connect dashboard tiles back to their underlying detailed report pages."
        ],
        diagramTitle: "Power BI Multi-Report Dashboard Pinning",
        diagram: `  [ Report A: Sales Performance ] ──► Pin Tile ──┐
                                                 ▼
  [ Report B: Inventory Health ]   ──► Pin Tile ──► [ Unified Executive Dashboard ]
                                                 ▲
  [ Report C: Customer Retention ] ──► Pin Tile ──┘`,
        complexities: [],
        tools: [
          { tool: "Power BI Service / Desktop", purpose: "Dashboard creation, tile pinning, and executive monitoring", notes: "Online service / Desktop" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Dashboard Workflow",
            code: `# Publishing & Dashboard Pinning
1. File -> Publish -> Select Power BI Workspace
2. In Web Service, open published report
3. Hover over visual -> Click Pin icon (📌)
4. Select "New dashboard" -> Name: Executive Overview
5. Set up Data Alert on KPI tile (e.g. Alert if Revenue < $50,000)`
          }
        ],
        practiceProblems: [
          {
            title: "Dashboards in Power BI",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/dashboard-in-power-bi/",
            platform: "GeeksforGeeks",
            topicTag: "Dashboards"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 7: CAPSTONE CASE STUDY (0/1)
  // ========================================================
  {
    id: "ba-capstone-case-study",
    name: "7. Capstone Case Study",
    shortDesc: "End-to-end recruitment analytics workflow from data preparation to executive presentation.",
    iconName: "GraduationCap",
    topics: [
      {
        id: "ba-campus-recruitment-case-study",
        slug: "presentation-case-study-campus-recruitment",
        title: "Exp 15: Presentation of a Case Study — Campus Recruitment Analysis",
        categoryId: "ba-capstone-case-study",
        categoryName: "7. Capstone Case Study",
        difficulty: "Advanced",
        estimatedTime: "40 mins",
        gfgSearchQuery: "Campus recruitment analysis Power BI case study placement predictive factors",
        gfgUrl: "https://www.geeksforgeeks.org/data-analysis-project-ideas/",
        quickSummary: "Apply the full analytics workflow (data prep, statistics, visualization, Power BI reporting) to a real dataset — campus recruitment — and present findings.",
        keyPoints: [
          "End-to-end pipeline: A complete analytics workflow moves from raw data through cleaning, exploration, modeling, and visualization to actionable insight.",
          "Framed around business questions: Findings should be framed around specific business questions (e.g. placement rate drivers, salary determinant factors).",
          "Executive communication: Clear presentation (charts + narrative) is essential for communicating analytical results to non-technical stakeholders."
        ],
        diagramTitle: "End-to-End Campus Recruitment Analytics Workflow",
        diagram: `  [ Raw Placement Data ] ──► [ Power Query Cleaning (Nulls, Types) ]
                                    │
                                    ▼ [ Descriptive Stats & Hypothesis Testing ]
                                    │ (GPA vs Placement Likelihood)
                                    ▼ [ Power BI Interactive Visuals & DAX ]
                                    │
                                    ▼ [ Executive Placement Strategy Presentation ]`,
        complexities: [],
        tools: [
          { tool: "Excel + Power BI", purpose: "End-to-end analytics workflow, modeling, and presentation", notes: "Capstone deliverable" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Capstone Deliverable Outline",
            code: `# Case Study Presentation Structure
1. Executive Summary & Problem Statement
2. Data Cleaning & Demographics Overview (Gender, Specialization)
3. Key Placement Drivers (CGPA, Internships, Technical Assessment Scores)
4. Salary Distribution Analysis by Stream
5. Recommendations for Training & Placement Cell Enhancement`
          }
        ],
        practiceProblems: [
          {
            title: "Data Analysis Case Study Ideas",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/data-analysis-project-ideas/",
            platform: "GeeksforGeeks",
            topicTag: "Capstone Project"
          }
        ]
      }
    ]
  }
];
