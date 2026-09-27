import { Experiment } from "../experiments";

export const DATA_SCIENCE_EXPERIMENTS: Experiment[] = [
  {
    "id": "ds-exp-1",
    "labId": "data-science-analytics",
    "title": "Exp 1: Explore the Features of MS-Excel for Business Analytics",
    "slug": "ds-exp-1-explore-the-features-of-ms-excel-for-business-analytics",
    "difficulty": "Beginner",
    "category": "Data Science",
    "estimatedMinutes": 30,
    "rating": 4.95,
    "ratingsCount": 164,
    "simulator": "custom",
    "quizId": "quiz-ds-1",
    "sections": {
      "introduction": "To explore the analytical features of MS-Excel including worksheet formatting, cell referencing, mathematical formulas, and data arrangement.",
      "objective": "To explore the analytical features of MS-Excel including worksheet formatting, cell referencing, mathematical formulas, and data arrangement.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Explore the Features of MS-Excel for Business Analytics",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Basic Probability & Statistics",
        "Spreadsheets or Python"
      ],
      "theory": {
        "overview": "This experiment explores Explore the Features of MS-Excel for Business Analytics from the V.S.B. Engineering College Business Analytics laboratory manual. It equips students with empirical statistical tools, data cleaning pipelines, and dashboard visualization capabilities for enterprise decision making.",
        "keyConcepts": [
          {
            "title": "Empirical Evidence",
            "desc": "Transforming raw unstructured business logs into actionable management insight."
          },
          {
            "title": "Hypothesis Verification",
            "desc": "Validating operational assumptions through rigorous p-value thresholds."
          },
          {
            "title": "Business Forecasting",
            "desc": "Modeling future demand and customer behavior with predictive analytics."
          }
        ],
        "complexities": [
          {
            "operation": "Data Processing",
            "best": "O(n)",
            "avg": "O(n log n)",
            "worst": "O(n^2)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Financial credit risk assessment and default probability modeling",
          "Supply chain inventory forecasting and safety stock optimization",
          "Marketing churn analysis and customer lifetime value (LTV) segmentation"
        ]
      },
      "procedure": [
        "1. Ingest business dataset from source file (Excel, CSV, SQL database).",
        "2. Inspect data types and examine missing value distributions.",
        "3. Apply cleaning, normalization, or analytical statistical transformations.",
        "4. Generate charts and evaluation metric summaries.",
        "5. Interpret analytical findings to guide business decision making."
      ],
      "sampleCode": {
        "language": "python",
        "code": "# Excel Analytical Pipeline\nimport pandas as pd\ndf = pd.read_excel('sales_data.xlsx')\nprint(df.describe())"
      },
      "expectedOutput": "Analysis completed successfully.\nSummary KPIs and plots generated according to VSB lab manual criteria.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd Year"
        ],
        "pg": [
          "M.Tech Data Science",
          "MBA Analytics"
        ]
      }
    }
  },
  {
    "id": "ds-exp-2",
    "labId": "data-science-analytics",
    "title": "Exp 2: Excel Numerical Functions and Multi-Format Data Import/Export",
    "slug": "ds-exp-2-excel-numerical-functions-and-multi-format-data-import-export",
    "difficulty": "Beginner",
    "category": "Data Science",
    "estimatedMinutes": 30,
    "rating": 4.95,
    "ratingsCount": 168,
    "simulator": "custom",
    "quizId": "quiz-ds-2",
    "sections": {
      "introduction": "To perform numerical functions (MAX, MIN, AVG, SUM, SQRT, ROUND) and import/export business data across CSV, JSON, and XLSX formats.",
      "objective": "To perform numerical functions (MAX, MIN, AVG, SUM, SQRT, ROUND) and import/export business data across CSV, JSON, and XLSX formats.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Excel Numerical Functions and Multi-Format Data Import/Export",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Basic Probability & Statistics",
        "Spreadsheets or Python"
      ],
      "theory": {
        "overview": "This experiment explores Excel Numerical Functions and Multi-Format Data Import/Export from the V.S.B. Engineering College Business Analytics laboratory manual. It equips students with empirical statistical tools, data cleaning pipelines, and dashboard visualization capabilities for enterprise decision making.",
        "keyConcepts": [
          {
            "title": "Empirical Evidence",
            "desc": "Transforming raw unstructured business logs into actionable management insight."
          },
          {
            "title": "Hypothesis Verification",
            "desc": "Validating operational assumptions through rigorous p-value thresholds."
          },
          {
            "title": "Business Forecasting",
            "desc": "Modeling future demand and customer behavior with predictive analytics."
          }
        ],
        "complexities": [
          {
            "operation": "Data Processing",
            "best": "O(n)",
            "avg": "O(n log n)",
            "worst": "O(n^2)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Financial credit risk assessment and default probability modeling",
          "Supply chain inventory forecasting and safety stock optimization",
          "Marketing churn analysis and customer lifetime value (LTV) segmentation"
        ]
      },
      "procedure": [
        "1. Ingest business dataset from source file (Excel, CSV, SQL database).",
        "2. Inspect data types and examine missing value distributions.",
        "3. Apply cleaning, normalization, or analytical statistical transformations.",
        "4. Generate charts and evaluation metric summaries.",
        "5. Interpret analytical findings to guide business decision making."
      ],
      "sampleCode": {
        "language": "python",
        "code": "import pandas as pd\n# Data Import and Numerical Transformations\ndf = pd.read_csv('business_records.csv')\nsummary = {'Total': df['Revenue'].sum(), 'Average': df['Revenue'].mean(), 'Max': df['Revenue'].max()}\nprint(summary)"
      },
      "expectedOutput": "Analysis completed successfully.\nSummary KPIs and plots generated according to VSB lab manual criteria.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd Year"
        ],
        "pg": [
          "M.Tech Data Science",
          "MBA Analytics"
        ]
      }
    }
  },
  {
    "id": "ds-exp-3",
    "labId": "data-science-analytics",
    "title": "Exp 3: Statistical Operations: Central Tendency, Dispersion, Skewness & Kurtosis",
    "slug": "ds-exp-3-statistical-operations-central-tendency-dispersion-skewness-kurtosis",
    "difficulty": "Beginner",
    "category": "Data Science",
    "estimatedMinutes": 30,
    "rating": 4.95,
    "ratingsCount": 172,
    "simulator": "custom",
    "quizId": "quiz-ds-3",
    "sections": {
      "introduction": "To compute descriptive statistics including Mean, Median, Mode, Variance, Standard Deviation, Skewness, and Kurtosis for business forecasting.",
      "objective": "To compute descriptive statistics including Mean, Median, Mode, Variance, Standard Deviation, Skewness, and Kurtosis for business forecasting.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Statistical Operations: Central Tendency, Dispersion, Skewness & Kurtosis",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Basic Probability & Statistics",
        "Spreadsheets or Python"
      ],
      "theory": {
        "overview": "This experiment explores Statistical Operations: Central Tendency, Dispersion, Skewness & Kurtosis from the V.S.B. Engineering College Business Analytics laboratory manual. It equips students with empirical statistical tools, data cleaning pipelines, and dashboard visualization capabilities for enterprise decision making.",
        "keyConcepts": [
          {
            "title": "Empirical Evidence",
            "desc": "Transforming raw unstructured business logs into actionable management insight."
          },
          {
            "title": "Hypothesis Verification",
            "desc": "Validating operational assumptions through rigorous p-value thresholds."
          },
          {
            "title": "Business Forecasting",
            "desc": "Modeling future demand and customer behavior with predictive analytics."
          }
        ],
        "complexities": [
          {
            "operation": "Data Processing",
            "best": "O(n)",
            "avg": "O(n log n)",
            "worst": "O(n^2)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Financial credit risk assessment and default probability modeling",
          "Supply chain inventory forecasting and safety stock optimization",
          "Marketing churn analysis and customer lifetime value (LTV) segmentation"
        ]
      },
      "procedure": [
        "1. Ingest business dataset from source file (Excel, CSV, SQL database).",
        "2. Inspect data types and examine missing value distributions.",
        "3. Apply cleaning, normalization, or analytical statistical transformations.",
        "4. Generate charts and evaluation metric summaries.",
        "5. Interpret analytical findings to guide business decision making."
      ],
      "sampleCode": {
        "language": "python",
        "code": "import scipy.stats as stats\nimport numpy as np\ndata = np.array([24, 28, 32, 36, 40, 42, 50])\nprint('Mean:', np.mean(data))\nprint('Variance:', np.var(data))\nprint('Skewness:', stats.skew(data))"
      },
      "expectedOutput": "Analysis completed successfully.\nSummary KPIs and plots generated according to VSB lab manual criteria.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd Year"
        ],
        "pg": [
          "M.Tech Data Science",
          "MBA Analytics"
        ]
      }
    }
  },
  {
    "id": "ds-exp-4",
    "labId": "data-science-analytics",
    "title": "Exp 4: Parametric and Non-Parametric Hypothesis Testing: Z-test, T-test & ANOVA",
    "slug": "ds-exp-4-parametric-and-non-parametric-hypothesis-testing-z-test-t-test-anova",
    "difficulty": "Beginner",
    "category": "Data Science",
    "estimatedMinutes": 30,
    "rating": 4.95,
    "ratingsCount": 176,
    "simulator": "custom",
    "quizId": "quiz-ds-4",
    "sections": {
      "introduction": "To conduct hypothesis testing using One-Sample Z-Test, Independent Student's T-Test, and One-Way ANOVA to evaluate statistical significance.",
      "objective": "To conduct hypothesis testing using One-Sample Z-Test, Independent Student's T-Test, and One-Way ANOVA to evaluate statistical significance.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Parametric and Non-Parametric Hypothesis Testing: Z-test, T-test & ANOVA",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Basic Probability & Statistics",
        "Spreadsheets or Python"
      ],
      "theory": {
        "overview": "This experiment explores Parametric and Non-Parametric Hypothesis Testing: Z-test, T-test & ANOVA from the V.S.B. Engineering College Business Analytics laboratory manual. It equips students with empirical statistical tools, data cleaning pipelines, and dashboard visualization capabilities for enterprise decision making.",
        "keyConcepts": [
          {
            "title": "Empirical Evidence",
            "desc": "Transforming raw unstructured business logs into actionable management insight."
          },
          {
            "title": "Hypothesis Verification",
            "desc": "Validating operational assumptions through rigorous p-value thresholds."
          },
          {
            "title": "Business Forecasting",
            "desc": "Modeling future demand and customer behavior with predictive analytics."
          }
        ],
        "complexities": [
          {
            "operation": "Data Processing",
            "best": "O(n)",
            "avg": "O(n log n)",
            "worst": "O(n^2)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Financial credit risk assessment and default probability modeling",
          "Supply chain inventory forecasting and safety stock optimization",
          "Marketing churn analysis and customer lifetime value (LTV) segmentation"
        ]
      },
      "procedure": [
        "1. Ingest business dataset from source file (Excel, CSV, SQL database).",
        "2. Inspect data types and examine missing value distributions.",
        "3. Apply cleaning, normalization, or analytical statistical transformations.",
        "4. Generate charts and evaluation metric summaries.",
        "5. Interpret analytical findings to guide business decision making."
      ],
      "sampleCode": {
        "language": "python",
        "code": "from scipy import stats\n# Independent two-sample t-test\ngroup_a = [88, 92, 94, 78, 85]\ngroup_b = [75, 80, 79, 72, 70]\nt_stat, p_val = stats.ttest_ind(group_a, group_b)\nprint(f'T-statistic: {t_stat:.4f}, P-value: {p_val:.4f}')"
      },
      "expectedOutput": "Analysis completed successfully.\nSummary KPIs and plots generated according to VSB lab manual criteria.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd Year"
        ],
        "pg": [
          "M.Tech Data Science",
          "MBA Analytics"
        ]
      }
    }
  },
  {
    "id": "ds-exp-5",
    "labId": "data-science-analytics",
    "title": "Exp 5: Data Pre-Processing: Handling Missing Data & Feature Normalization",
    "slug": "ds-exp-5-data-pre-processing-handling-missing-data-feature-normalization",
    "difficulty": "Intermediate",
    "category": "Data Science",
    "estimatedMinutes": 30,
    "rating": 4.95,
    "ratingsCount": 180,
    "simulator": "custom",
    "quizId": "quiz-ds-5",
    "sections": {
      "introduction": "To perform data cleaning, handle missing values using mean/median imputation, and normalize feature values using Min-Max scaling and Z-score standardization.",
      "objective": "To perform data cleaning, handle missing values using mean/median imputation, and normalize feature values using Min-Max scaling and Z-score standardization.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Data Pre-Processing: Handling Missing Data & Feature Normalization",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Basic Probability & Statistics",
        "Spreadsheets or Python"
      ],
      "theory": {
        "overview": "This experiment explores Data Pre-Processing: Handling Missing Data & Feature Normalization from the V.S.B. Engineering College Business Analytics laboratory manual. It equips students with empirical statistical tools, data cleaning pipelines, and dashboard visualization capabilities for enterprise decision making.",
        "keyConcepts": [
          {
            "title": "Empirical Evidence",
            "desc": "Transforming raw unstructured business logs into actionable management insight."
          },
          {
            "title": "Hypothesis Verification",
            "desc": "Validating operational assumptions through rigorous p-value thresholds."
          },
          {
            "title": "Business Forecasting",
            "desc": "Modeling future demand and customer behavior with predictive analytics."
          }
        ],
        "complexities": [
          {
            "operation": "Data Processing",
            "best": "O(n)",
            "avg": "O(n log n)",
            "worst": "O(n^2)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Financial credit risk assessment and default probability modeling",
          "Supply chain inventory forecasting and safety stock optimization",
          "Marketing churn analysis and customer lifetime value (LTV) segmentation"
        ]
      },
      "procedure": [
        "1. Ingest business dataset from source file (Excel, CSV, SQL database).",
        "2. Inspect data types and examine missing value distributions.",
        "3. Apply cleaning, normalization, or analytical statistical transformations.",
        "4. Generate charts and evaluation metric summaries.",
        "5. Interpret analytical findings to guide business decision making."
      ],
      "sampleCode": {
        "language": "python",
        "code": "from sklearn.preprocessing import MinMaxScaler, StandardScaler\nimport pandas as pd\ndf = pd.DataFrame({'Sales': [100, None, 300, 400]})\ndf['Sales'].fillna(df['Sales'].median(), inplace=True)\nscaler = MinMaxScaler()\ndf['Normalized'] = scaler.fit_transform(df[['Sales']])\nprint(df)"
      },
      "expectedOutput": "Analysis completed successfully.\nSummary KPIs and plots generated according to VSB lab manual criteria.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd Year"
        ],
        "pg": [
          "M.Tech Data Science",
          "MBA Analytics"
        ]
      }
    }
  },
  {
    "id": "ds-exp-6",
    "labId": "data-science-analytics",
    "title": "Exp 6: Dimensionality Reduction using PCA, Kernel PCA, and SVD",
    "slug": "ds-exp-6-dimensionality-reduction-using-pca-kernel-pca-and-svd",
    "difficulty": "Intermediate",
    "category": "Data Science",
    "estimatedMinutes": 30,
    "rating": 4.95,
    "ratingsCount": 184,
    "simulator": "custom",
    "quizId": "quiz-ds-6",
    "sections": {
      "introduction": "To apply Principal Component Analysis (PCA) and Singular Value Decomposition (SVD) on high-dimensional business data for variance extraction.",
      "objective": "To apply Principal Component Analysis (PCA) and Singular Value Decomposition (SVD) on high-dimensional business data for variance extraction.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Dimensionality Reduction using PCA, Kernel PCA, and SVD",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Basic Probability & Statistics",
        "Spreadsheets or Python"
      ],
      "theory": {
        "overview": "This experiment explores Dimensionality Reduction using PCA, Kernel PCA, and SVD from the V.S.B. Engineering College Business Analytics laboratory manual. It equips students with empirical statistical tools, data cleaning pipelines, and dashboard visualization capabilities for enterprise decision making.",
        "keyConcepts": [
          {
            "title": "Empirical Evidence",
            "desc": "Transforming raw unstructured business logs into actionable management insight."
          },
          {
            "title": "Hypothesis Verification",
            "desc": "Validating operational assumptions through rigorous p-value thresholds."
          },
          {
            "title": "Business Forecasting",
            "desc": "Modeling future demand and customer behavior with predictive analytics."
          }
        ],
        "complexities": [
          {
            "operation": "Data Processing",
            "best": "O(n)",
            "avg": "O(n log n)",
            "worst": "O(n^2)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Financial credit risk assessment and default probability modeling",
          "Supply chain inventory forecasting and safety stock optimization",
          "Marketing churn analysis and customer lifetime value (LTV) segmentation"
        ]
      },
      "procedure": [
        "1. Ingest business dataset from source file (Excel, CSV, SQL database).",
        "2. Inspect data types and examine missing value distributions.",
        "3. Apply cleaning, normalization, or analytical statistical transformations.",
        "4. Generate charts and evaluation metric summaries.",
        "5. Interpret analytical findings to guide business decision making."
      ],
      "sampleCode": {
        "language": "python",
        "code": "from sklearn.decomposition import PCA\nimport numpy as np\nX = np.random.rand(100, 10)\npca = PCA(n_components=3)\nX_reduced = pca.fit_transform(X)\nprint('Explained variance ratio:', pca.explained_variance_ratio_)"
      },
      "expectedOutput": "Analysis completed successfully.\nSummary KPIs and plots generated according to VSB lab manual criteria.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd Year"
        ],
        "pg": [
          "M.Tech Data Science",
          "MBA Analytics"
        ]
      }
    }
  },
  {
    "id": "ds-exp-7",
    "labId": "data-science-analytics",
    "title": "Exp 7: Bivariate and Multivariate Analysis on Business Datasets",
    "slug": "ds-exp-7-bivariate-and-multivariate-analysis-on-business-datasets",
    "difficulty": "Intermediate",
    "category": "Data Science",
    "estimatedMinutes": 30,
    "rating": 4.95,
    "ratingsCount": 188,
    "simulator": "custom",
    "quizId": "quiz-ds-7",
    "sections": {
      "introduction": "To perform bivariate correlation analysis and multivariate regression on organizational performance metrics.",
      "objective": "To perform bivariate correlation analysis and multivariate regression on organizational performance metrics.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Bivariate and Multivariate Analysis on Business Datasets",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Basic Probability & Statistics",
        "Spreadsheets or Python"
      ],
      "theory": {
        "overview": "This experiment explores Bivariate and Multivariate Analysis on Business Datasets from the V.S.B. Engineering College Business Analytics laboratory manual. It equips students with empirical statistical tools, data cleaning pipelines, and dashboard visualization capabilities for enterprise decision making.",
        "keyConcepts": [
          {
            "title": "Empirical Evidence",
            "desc": "Transforming raw unstructured business logs into actionable management insight."
          },
          {
            "title": "Hypothesis Verification",
            "desc": "Validating operational assumptions through rigorous p-value thresholds."
          },
          {
            "title": "Business Forecasting",
            "desc": "Modeling future demand and customer behavior with predictive analytics."
          }
        ],
        "complexities": [
          {
            "operation": "Data Processing",
            "best": "O(n)",
            "avg": "O(n log n)",
            "worst": "O(n^2)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Financial credit risk assessment and default probability modeling",
          "Supply chain inventory forecasting and safety stock optimization",
          "Marketing churn analysis and customer lifetime value (LTV) segmentation"
        ]
      },
      "procedure": [
        "1. Ingest business dataset from source file (Excel, CSV, SQL database).",
        "2. Inspect data types and examine missing value distributions.",
        "3. Apply cleaning, normalization, or analytical statistical transformations.",
        "4. Generate charts and evaluation metric summaries.",
        "5. Interpret analytical findings to guide business decision making."
      ],
      "sampleCode": {
        "language": "python",
        "code": "import seaborn as sns\nimport matplotlib.pyplot as plt\nimport pandas as pd\n# Correlation Matrix\ndf = pd.DataFrame(np.random.randn(50, 4), columns=['Sales', 'Spend', 'ROI', 'Retention'])\nsns.heatmap(df.corr(), annot=True, cmap='coolwarm')\nplt.title('Multivariate Correlation Heatmap')\nplt.show()"
      },
      "expectedOutput": "Analysis completed successfully.\nSummary KPIs and plots generated according to VSB lab manual criteria.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd Year"
        ],
        "pg": [
          "M.Tech Data Science",
          "MBA Analytics"
        ]
      }
    }
  },
  {
    "id": "ds-exp-8",
    "labId": "data-science-analytics",
    "title": "Exp 8: Advanced Data Visualization and Plotting Functions",
    "slug": "ds-exp-8-advanced-data-visualization-and-plotting-functions",
    "difficulty": "Intermediate",
    "category": "Data Science",
    "estimatedMinutes": 30,
    "rating": 4.95,
    "ratingsCount": 192,
    "simulator": "custom",
    "quizId": "quiz-ds-8",
    "sections": {
      "introduction": "To explore business charting functions: box plots, violin plots, pair plots, and interactive scatter matrices.",
      "objective": "To explore business charting functions: box plots, violin plots, pair plots, and interactive scatter matrices.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Advanced Data Visualization and Plotting Functions",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Basic Probability & Statistics",
        "Spreadsheets or Python"
      ],
      "theory": {
        "overview": "This experiment explores Advanced Data Visualization and Plotting Functions from the V.S.B. Engineering College Business Analytics laboratory manual. It equips students with empirical statistical tools, data cleaning pipelines, and dashboard visualization capabilities for enterprise decision making.",
        "keyConcepts": [
          {
            "title": "Empirical Evidence",
            "desc": "Transforming raw unstructured business logs into actionable management insight."
          },
          {
            "title": "Hypothesis Verification",
            "desc": "Validating operational assumptions through rigorous p-value thresholds."
          },
          {
            "title": "Business Forecasting",
            "desc": "Modeling future demand and customer behavior with predictive analytics."
          }
        ],
        "complexities": [
          {
            "operation": "Data Processing",
            "best": "O(n)",
            "avg": "O(n log n)",
            "worst": "O(n^2)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Financial credit risk assessment and default probability modeling",
          "Supply chain inventory forecasting and safety stock optimization",
          "Marketing churn analysis and customer lifetime value (LTV) segmentation"
        ]
      },
      "procedure": [
        "1. Ingest business dataset from source file (Excel, CSV, SQL database).",
        "2. Inspect data types and examine missing value distributions.",
        "3. Apply cleaning, normalization, or analytical statistical transformations.",
        "4. Generate charts and evaluation metric summaries.",
        "5. Interpret analytical findings to guide business decision making."
      ],
      "sampleCode": {
        "language": "python",
        "code": "import matplotlib.pyplot as plt\nimport seaborn as sns\n# Boxplot analysis for outliers\ndata = [12, 15, 14, 10, 18, 19, 22, 45]\nsns.boxplot(x=data)\nplt.title('Outlier Detection Plot')\nplt.show()"
      },
      "expectedOutput": "Analysis completed successfully.\nSummary KPIs and plots generated according to VSB lab manual criteria.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd Year"
        ],
        "pg": [
          "M.Tech Data Science",
          "MBA Analytics"
        ]
      }
    }
  },
  {
    "id": "ds-exp-9",
    "labId": "data-science-analytics",
    "title": "Exp 9: Explore the Features of Power BI Desktop",
    "slug": "ds-exp-9-explore-the-features-of-power-bi-desktop",
    "difficulty": "Intermediate",
    "category": "Data Science",
    "estimatedMinutes": 30,
    "rating": 4.95,
    "ratingsCount": 196,
    "simulator": "custom",
    "quizId": "quiz-ds-9",
    "sections": {
      "introduction": "Get familiar with the Power BI Desktop interface — Report, Data, and Model views, and its core building blocks.",
      "objective": "Get familiar with the Power BI Desktop interface — Report, Data, and Model views, and its core building blocks.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Explore the Features of Power BI Desktop",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Spreadsheets or Basic Analytics",
        "Data Visualisation Concepts"
      ],
      "theory": {
        "overview": "Power BI Desktop provides an enterprise-grade analytics authoring environment combining Power Query for ETL data wrangling, VertiPaq in-memory columnar database modeling, and interactive canvas report design with drill-down exploration.",
        "keyConcepts": [
          {
            "title": "Three Core Views",
            "desc": "Report view for visuals canvas, Data view for tabular row inspection, and Model view for entity-relationship schema layout."
          },
          {
            "title": "Canvas & Visualizations",
            "desc": "Interactive charts, matrices, cards, and slicers bound dynamically to model measures and dimensions."
          },
          {
            "title": "Data Connectors",
            "desc": "Seamless connectivity across flat files (CSV, XLSX), SQL relational engines, and cloud data warehouses."
          }
        ],
        "complexities": [
          {
            "operation": "Data Processing",
            "best": "O(n)",
            "avg": "O(n log n)",
            "worst": "O(n^2)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Enterprise KPI performance monitoring and executive scorecarding",
          "Automated monthly management reporting and interactive drill-downs"
        ]
      },
      "procedure": [
        "1. Launch Power BI Desktop and explore the Ribbon, Canvas, Fields pane, and Visualizations pane.",
        "2. Switch between Report View, Data View, and Model View to understand workspace segregation.",
        "3. Connect to a sample business dataset (Excel / CSV) using 'Get Data'.",
        "4. Place card visuals, bar charts, and slicers on the canvas and verify interactive cross-filtering."
      ],
      "sampleCode": {
        "language": "python",
        "code": "# Power BI Desktop Quick Start Guide\n1. Ingest Data via 'Get Data' -> Excel / CSV\n2. Inspect Fields pane for categorical and numerical features\n3. Drag 'Sales' to Canvas -> Auto-generates Bar Chart\n4. Add Slicer visual for 'Region' and test dynamic filter updates"
      },
      "expectedOutput": "Interactive multi-visual canvas with operational slicer filtering and metric cards.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd Year"
        ],
        "pg": [
          "M.Tech Data Science",
          "MBA Analytics"
        ]
      }
    }
  },
  {
    "id": "ds-exp-10",
    "labId": "data-science-analytics",
    "title": "Exp 10: Prepare & Load Data using Power Query",
    "slug": "ds-exp-10-prepare-and-load-data",
    "difficulty": "Intermediate",
    "category": "Data Science",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 198,
    "simulator": "custom",
    "quizId": "quiz-ds-10",
    "sections": {
      "introduction": "Use Power Query within Power BI to connect to, clean, and load a dataset for reporting.",
      "objective": "Use Power Query within Power BI to connect to, clean, and load a dataset for reporting.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Prepare & Load Data",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Data Types & Delimiters",
        "Power BI Desktop Basics"
      ],
      "theory": {
        "overview": "Power Query provides an automated, repeatable ETL pipeline expressed in functional M-code. Applied steps execute in sequential order on data refresh, guaranteeing pristine data hygiene without altering source files.",
        "keyConcepts": [
          {
            "title": "Applied Steps Pipeline",
            "desc": "Sequential recipe of transformations (Promoted Headers, Changed Type, Filtered Rows) saved and re-executed on refresh."
          },
          {
            "title": "Data Type Enforcement",
            "desc": "Strict classification of integers, decimals, dates, and strings preventing aggregation errors in DAX."
          },
          {
            "title": "Query Merging & Appending",
            "desc": "Joining dimension tables and unioning partitioned monthly fact records seamlessly."
          }
        ],
        "complexities": [
          {
            "operation": "ETL Transformation",
            "best": "O(n)",
            "avg": "O(n log n)",
            "worst": "O(n^2)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Automated reconciliation of messy enterprise sales feeds and invoice streams",
          "Null value elimination and customer deduplication pipelines"
        ]
      },
      "procedure": [
        "1. In Power BI Desktop, click 'Transform Data' to launch the Power Query Editor.",
        "2. Promote first row to headers and inspect column data types across all fields.",
        "3. Filter out null / invalid transaction records and replace missing values.",
        "4. Click 'Close & Apply' to commit transformed data to the VertiPaq model."
      ],
      "sampleCode": {
        "language": "python",
        "code": "// Sample Power Query M Formula Language\nlet\n    Source = Csv.Document(File.Contents(\"C:\\Data\\Orders.csv\"),[Delimiter=\",\", Columns=6, Encoding=65001]),\n    #\"Promoted Headers\" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),\n    #\"Changed Type\" = Table.TransformColumnTypes(#\"Promoted Headers\",{{\"OrderID\", Int64.Type}, {\"Revenue\", type number}, {\"Date\", type date}}),\n    #\"Filtered Rows\" = Table.SelectRows(#\"Changed Type\", each [Revenue] > 0)\nin\n    #\"Filtered Rows\""
      },
      "expectedOutput": "Pristine tabular model loaded into Power BI with zero format errors or orphan records.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd Year"
        ],
        "pg": [
          "M.Tech Data Science",
          "MBA Analytics"
        ]
      }
    }
  },
  {
    "id": "ds-exp-11",
    "labId": "data-science-analytics",
    "title": "Exp 11: Develop the Data Model & Star Schema Relationships",
    "slug": "ds-exp-11-develop-the-data-model",
    "difficulty": "Intermediate",
    "category": "Data Science",
    "estimatedMinutes": 35,
    "rating": 4.96,
    "ratingsCount": 202,
    "simulator": "custom",
    "quizId": "quiz-ds-11",
    "sections": {
      "introduction": "Define relationships between multiple loaded tables to build a coherent data model (e.g. star schema) for reporting.",
      "objective": "Define relationships between multiple loaded tables to build a coherent data model (e.g. star schema) for reporting.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Develop the Data Model",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Primary & Foreign Keys",
        "Relational Schema Design"
      ],
      "theory": {
        "overview": "A robust data model forms the backbone of any enterprise BI deployment. By organizing tables into a Star Schema (central Fact table surrounded by Dimension tables), queries achieve optimal compression and filter propagation.",
        "keyConcepts": [
          {
            "title": "Star Schema Architecture",
            "desc": "High-volume transactional fact table surrounded by lookup dimension tables (Customer, Product, Date)."
          },
          {
            "title": "1-to-Many Relationships",
            "desc": "Primary key in dimension links to foreign key in fact table with single-direction filter propagation."
          },
          {
            "title": "Filter Context Propagation",
            "desc": "Filters placed on dimension attributes automatically slice and aggregate numeric facts."
          }
        ],
        "complexities": [
          {
            "operation": "Relational Filter Propagation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Multi-product retail transactional modeling and inventory balance tracking",
          "Cross-departmental financial analytics across cost centers"
        ]
      },
      "procedure": [
        "1. Open the Model view in Power BI Desktop.",
        "2. Arrange the FactSales table in the center and position DimCustomer, DimProduct, DimDate around it.",
        "3. Drag primary keys from dimension tables to foreign keys in FactSales.",
        "4. Validate that relationship cardinality is '1 to Many' with 'Single' cross-filter direction."
      ],
      "sampleCode": {
        "language": "python",
        "code": "# Relationship Configuration Map\nDimCustomer[CustomerID]  1 ───< *  FactSales[CustomerID]\nDimProduct[ProductID]    1 ───< *  FactSales[ProductID]\nDimCalendar[DateKey]     1 ───< *  FactSales[DateKey]\n\n# Cardinality: 1:Many | Cross-Filter: Single (Dimension filters Fact)"
      },
      "expectedOutput": "Clean Star Schema entity-relationship diagram with active, validated 1-to-many relationship lines.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd Year"
        ],
        "pg": [
          "M.Tech Data Science",
          "MBA Analytics"
        ]
      }
    }
  },
  {
    "id": "ds-exp-12",
    "labId": "data-science-analytics",
    "title": "Exp 12: Perform DAX Calculations & Calculated Measures",
    "slug": "ds-exp-12-perform-dax-calculations",
    "difficulty": "Advanced",
    "category": "Data Science",
    "estimatedMinutes": 40,
    "rating": 4.97,
    "ratingsCount": 210,
    "simulator": "custom",
    "quizId": "quiz-ds-12",
    "sections": {
      "introduction": "Write DAX (Data Analysis Expressions) measures and calculated columns to derive custom metrics from the data model.",
      "objective": "Write DAX (Data Analysis Expressions) measures and calculated columns to derive custom metrics from the data model.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Perform DAX Calculations",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Star Schema Data Model",
        "Filter Context Concepts"
      ],
      "theory": {
        "overview": "Data Analysis Expressions (DAX) is the native functional formula language of Power BI. Unlike Excel cell formulas, DAX measures evaluate dynamically over the active filter context generated by slicers, chart selections, and matrix groupings.",
        "keyConcepts": [
          {
            "title": "Row Context vs Filter Context",
            "desc": "Calculated columns evaluate row-by-row on disk; measures compute dynamically on aggregated visual slices."
          },
          {
            "title": "CALCULATE Engine",
            "desc": "The most versatile DAX function, transitioning row context to filter context and overriding active filters."
          },
          {
            "title": "Time Intelligence",
            "desc": "Dynamic calculation of YTD, QTD, Month-Over-Month growth, and moving averages."
          }
        ],
        "complexities": [
          {
            "operation": "DAX Dynamic Aggregation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Dynamic Year-Over-Year profit margin and revenue variance calculations",
          "Customer churn retention rates and cohort lifetime value tracking"
        ]
      },
      "procedure": [
        "1. Create an explicit measures table `_KeyMeasures` in Power BI.",
        "2. Author base aggregation measures: `Total Sales`, `Total Cost`, `Total Profit`.",
        "3. Author advanced ratio measures using `DIVIDE` to prevent division-by-zero errors.",
        "4. Author time intelligence measures using `CALCULATE` and `SAMEPERIODLASTYEAR`."
      ],
      "sampleCode": {
        "language": "python",
        "code": "-- Core DAX Enterprise Measures\nTotal Revenue = SUM(FactSales[Revenue])\nTotal Cost = SUM(FactSales[TotalCost])\nTotal Profit = [Total Revenue] - [Total Cost]\nProfit Margin % = DIVIDE([Total Profit], [Total Revenue], 0)\n\n-- Time Intelligence: Prior Year Revenue\nRevenue PY = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(DimCalendar[Date]))\nYoY Growth % = DIVIDE([Total Revenue] - [Revenue PY], [Revenue PY], 0)"
      },
      "expectedOutput": "Dynamic KPI cards and matrix visual computing correct margin and YoY metrics across any slicer selection.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd Year"
        ],
        "pg": [
          "M.Tech Data Science",
          "MBA Analytics"
        ]
      }
    }
  },
  {
    "id": "ds-exp-13",
    "labId": "data-science-analytics",
    "title": "Exp 13: Design a Multi-Page Analytical Report",
    "slug": "ds-exp-13-design-a-report",
    "difficulty": "Intermediate",
    "category": "Data Science",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 188,
    "simulator": "custom",
    "quizId": "quiz-ds-13",
    "sections": {
      "introduction": "Lay out visuals (charts, tables, KPIs, slicers) on a report page to answer specific business questions.",
      "objective": "Lay out visuals (charts, tables, KPIs, slicers) on a report page to answer specific business questions.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Design a Report",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "DAX Measures",
        "Visual Design Best Practices"
      ],
      "theory": {
        "overview": "Effective report design bridges data science and executive decision-making. Organizing visual hierarchy, enforcing palette harmony, and utilizing progressive disclosure ensure stakeholders extract insights effortlessly.",
        "keyConcepts": [
          {
            "title": "Visual Hierarchy",
            "desc": "High-level summary cards at the top, trend and comparison charts in the center, granular tables at the bottom."
          },
          {
            "title": "Interactive Slicers & Sync",
            "desc": "Coordinated date range pickers and categorical dropdowns synchronized across multiple report pages."
          },
          {
            "title": "Tooltips & Drill-Through",
            "desc": "Custom hover cards revealing deeper customer and product metrics on demand."
          }
        ],
        "complexities": [
          {
            "operation": "Report Rendering",
            "best": "O(1)",
            "avg": "O(k)",
            "worst": "O(k * n)",
            "space": "O(k)"
          }
        ],
        "realWorldApplications": [
          "Regional sales performance reports presented to Chief Revenue Officers",
          "Supply chain bottleneck monitors for logistics controllers"
        ]
      },
      "procedure": [
        "1. Create a structured report grid with consistent margins and a professional theme.",
        "2. Add high-level KPI cards along the top row (Total Sales, Total Profit, Margin %).",
        "3. Add line charts for monthly revenue trends and clustered bar charts for product category breakdowns.",
        "4. Configure synchronized slicers for Year, Quarter, and Geographic Region."
      ],
      "sampleCode": {
        "language": "python",
        "code": "# Report Layout Blueprint\nHeader Row: [Logo] | Executive Sales Overview | [Year Slicer] [Region Slicer]\nTop KPIs:   [Total Sales: $4.2M] [Total Profit: $1.1M] [Profit Margin: 26.2%]\nMid Row:    [Monthly Revenue Trend (Line)] | [Sales by Category (Bar)]\nBottom Row: [Top 10 Customers Matrix] | [Geographic Heatmap]"
      },
      "expectedOutput": "Polished multi-page executive report with seamless interactive cross-filtering.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd Year"
        ],
        "pg": [
          "M.Tech Data Science",
          "MBA Analytics"
        ]
      }
    }
  },
  {
    "id": "ds-exp-14",
    "labId": "data-science-analytics",
    "title": "Exp 14: Create a KPI Dashboard and Perform Cross-Filter Analysis",
    "slug": "ds-exp-14-create-a-dashboard-and-perform-data-analysis",
    "difficulty": "Intermediate",
    "category": "Data Science",
    "estimatedMinutes": 35,
    "rating": 4.96,
    "ratingsCount": 194,
    "simulator": "custom",
    "quizId": "quiz-ds-14",
    "sections": {
      "introduction": "Pin key visuals into a consolidated dashboard view for at-a-glance monitoring and analysis.",
      "objective": "Pin key visuals into a consolidated dashboard view for at-a-glance monitoring and analysis.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Create a Dashboard and Perform Data Analysis",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Multi-page Report Design",
        "KPI Metrics & Target Benchmarks"
      ],
      "theory": {
        "overview": "Dashboards distill complex analytical models into real-time operational radar screens. Key performance indicators are displayed alongside threshold targets to facilitate rapid anomaly detection and intervention.",
        "keyConcepts": [
          {
            "title": "At-a-Glance Monitoring",
            "desc": "Single-pane consolidation of critical metrics eliminating information overload."
          },
          {
            "title": "KPI Target Gauges",
            "desc": "Visual tracking of actual performance against predefined budget and quarterly quotas."
          },
          {
            "title": "Cross-Filtering Discovery",
            "desc": "Uncovering latent correlations between market conditions and product line performance through point-and-click slicing."
          }
        ],
        "complexities": [
          {
            "operation": "Dashboard Tile Query",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Live executive dashboards displayed in enterprise operations centers",
          "Real-time e-commerce conversion and server health telemetry monitoring"
        ]
      },
      "procedure": [
        "1. Select critical visuals from the sales and customer reports.",
        "2. Configure KPI cards with conditional background color formatting (Green = target met, Red = below quota).",
        "3. Test cross-filtering by clicking specific segments in the category chart to filter the entire view.",
        "4. Document strategic business recommendations derived from outlier investigation."
      ],
      "sampleCode": {
        "language": "python",
        "code": "# Dashboard Alert Logic\nIF [Profit Margin %] >= 0.25 THEN \"Healthy\"\nELSE IF [Profit Margin %] >= 0.15 THEN \"Warning\"\nELSE \"Critical Intervention Required\""
      },
      "expectedOutput": "Consolidated KPI dashboard displaying live status gauges and cross-filtered business insights.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd Year"
        ],
        "pg": [
          "M.Tech Data Science",
          "MBA Analytics"
        ]
      }
    }
  },
  {
    "id": "ds-exp-15",
    "labId": "data-science-analytics",
    "title": "Exp 15: Presentation of a Case Study — Campus Recruitment Analysis",
    "slug": "ds-exp-15-presentation-of-a-case-study-campus-recruitment-analysis",
    "difficulty": "Advanced",
    "category": "Data Science",
    "estimatedMinutes": 45,
    "rating": 4.98,
    "ratingsCount": 215,
    "simulator": "custom",
    "quizId": "quiz-ds-15",
    "sections": {
      "introduction": "Apply the full analytics workflow (data prep, statistics, visualization, Power BI reporting) to a real dataset — campus recruitment — and present findings.",
      "objective": "Apply the full analytics workflow (data prep, statistics, visualization, Power BI reporting) to a real dataset — campus recruitment — and present findings.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Presentation of a Case Study — Campus Recruitment Analysis",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Descriptive & Inferential Statistics",
        "Machine Learning Classification",
        "Power BI Reporting"
      ],
      "theory": {
        "overview": "This capstone case study integrates statistical hypothesis testing, classification modeling, and executive BI storytelling on student academic records, MBA specializations, work experience, and campus placement outcomes.",
        "keyConcepts": [
          {
            "title": "End-to-End Analytics Workflow",
            "desc": "From raw messy CSV ingestion through ETL, feature engineering, hypothesis validation, and predictive scoring to an executive presentation."
          },
          {
            "title": "Key Driver Identification",
            "desc": "Determining which academic degrees and test percentiles exert the highest statistical influence on salary packages."
          },
          {
            "title": "Executive Storytelling",
            "desc": "Framing technical metrics into strategic institutional policy recommendations for training and placement cells."
          }
        ],
        "complexities": [
          {
            "operation": "End-to-End Pipeline Execution",
            "best": "O(n)",
            "avg": "O(n log n)",
            "worst": "O(n^2)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "University training & placement predictive intervention systems",
          "Corporate talent acquisition and campus hiring optimization"
        ]
      },
      "procedure": [
        "1. Ingest campus recruitment dataset containing secondary education, degree percentage, MBA specialization, and placement status.",
        "2. Perform data cleaning and treat missing salary values for unplaced students.",
        "3. Conduct bivariate and multivariate hypothesis tests (T-test and Chi-square) on placement determinants.",
        "4. Build a predictive classification model (Logistic Regression / Random Forest) achieving >85% accuracy.",
        "5. Author an interactive Power BI recruitment dashboard and present strategic findings."
      ],
      "sampleCode": {
        "language": "python",
        "code": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report\n\n# 1. Load Recruitment Data\ndf = pd.read_csv('Placement_Data_Full_Class.csv')\n\n# 2. Preprocess & Feature Engineering\ndf['status_binary'] = df['status'].map({'Placed': 1, 'Not Placed': 0})\nX = df[['ssc_p', 'hsc_p', 'degree_p', 'etest_p', 'mba_p']]\ny = df['status_binary']\n\n# 3. Model Training\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nclf = RandomForestClassifier(n_estimators=100, random_state=42)\nclf.fit(X_train, y_train)\n\nprint(classification_report(y_test, clf.predict(X_test)))"
      },
      "expectedOutput": "End-to-end recruitment analytics deck with >85% model accuracy and interactive Power BI executive dashboard.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 3rd Year"
        ],
        "pg": [
          "M.Tech Data Science",
          "MBA Analytics"
        ]
      }
    }
  }
];
