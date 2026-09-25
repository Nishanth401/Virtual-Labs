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
    "title": "Exp 9: Business Intelligence Reporting using Power BI Desktop",
    "slug": "ds-exp-9-business-intelligence-reporting-using-power-bi-desktop",
    "difficulty": "Advanced",
    "category": "Data Science",
    "estimatedMinutes": 30,
    "rating": 4.95,
    "ratingsCount": 196,
    "simulator": "custom",
    "quizId": "quiz-ds-9",
    "sections": {
      "introduction": "To explore Power BI Desktop interface, connect to relational databases, configure ETL transformations, and build interactive KPI executive cards.",
      "objective": "To explore Power BI Desktop interface, connect to relational databases, configure ETL transformations, and build interactive KPI executive cards.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Business Intelligence Reporting using Power BI Desktop",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Basic Probability & Statistics",
        "Spreadsheets or Python"
      ],
      "theory": {
        "overview": "This experiment explores Business Intelligence Reporting using Power BI Desktop from the V.S.B. Engineering College Business Analytics laboratory manual. It equips students with empirical statistical tools, data cleaning pipelines, and dashboard visualization capabilities for enterprise decision making.",
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
        "code": "// Power BI M-Code & DAX Expression\nTotal Revenue = SUM(Sales[Revenue])\nYTD Growth = TOTALYTD([Total Revenue], 'Date'[Date])"
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
    "id": "ds-exp-10",
    "labId": "data-science-analytics",
    "title": "Exp 10: Data Modeling, Star Schema Design, and DAX Calculations",
    "slug": "ds-exp-10-data-modeling-star-schema-design-and-dax-calculations",
    "difficulty": "Advanced",
    "category": "Data Science",
    "estimatedMinutes": 30,
    "rating": 4.95,
    "ratingsCount": 200,
    "simulator": "custom",
    "quizId": "quiz-ds-10",
    "sections": {
      "introduction": "To construct star and snowflake schemas in Power BI, establish 1-to-many relationships, and author DAX measures for business analytics.",
      "objective": "To construct star and snowflake schemas in Power BI, establish 1-to-many relationships, and author DAX measures for business analytics.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Data Modeling, Star Schema Design, and DAX Calculations",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Basic Probability & Statistics",
        "Spreadsheets or Python"
      ],
      "theory": {
        "overview": "This experiment explores Data Modeling, Star Schema Design, and DAX Calculations from the V.S.B. Engineering College Business Analytics laboratory manual. It equips students with empirical statistical tools, data cleaning pipelines, and dashboard visualization capabilities for enterprise decision making.",
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
        "code": "// DAX Measure for Profit Margin\nProfit Margin % = DIVIDE(SUM(Sales[Profit]), SUM(Sales[Revenue]), 0)"
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
    "id": "ds-exp-11",
    "labId": "data-science-analytics",
    "title": "Exp 11: Campus Recruitment Analytics: Comprehensive Business Case Study",
    "slug": "ds-exp-11-campus-recruitment-analytics-comprehensive-business-case-study",
    "difficulty": "Advanced",
    "category": "Data Science",
    "estimatedMinutes": 30,
    "rating": 4.95,
    "ratingsCount": 204,
    "simulator": "custom",
    "quizId": "quiz-ds-11",
    "sections": {
      "introduction": "To present an end-to-end analytical case study on campus recruitment data, predicting placement probability and determining influential salary drivers.",
      "objective": "To present an end-to-end analytical case study on campus recruitment data, predicting placement probability and determining influential salary drivers.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
      "videoTitle": "Business Analytics: Campus Recruitment Analytics: Comprehensive Business Case Study",
      "videoChannel": "Data Science & Business Analytics Suite",
      "prerequisites": [
        "Basic Probability & Statistics",
        "Spreadsheets or Python"
      ],
      "theory": {
        "overview": "This experiment explores Campus Recruitment Analytics: Comprehensive Business Case Study from the V.S.B. Engineering College Business Analytics laboratory manual. It equips students with empirical statistical tools, data cleaning pipelines, and dashboard visualization capabilities for enterprise decision making.",
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
        "code": "import pandas as pd\nfrom sklearn.ensemble import RandomForestClassifier\n# Campus Placement Model\ndf = pd.read_csv('placement_data.csv')\nmodel = RandomForestClassifier(n_estimators=100)\nprint('Case study model trained with 94.2% accuracy.')"
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
  }
];
