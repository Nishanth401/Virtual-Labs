import { DSACategory, DSA_CATEGORIES_DATA } from "./dsa-topic-data";

export const LAB_ROADMAPS_DATA: Record<string, { title: string; badge: string; categories: DSACategory[] }> = {
  // ==========================================
  // 1. DATA STRUCTURES & ALGORITHMS LAB (12 CORE MODULES)
  // ==========================================
  "data-structures": {
    title: "DG & DSA Complete Curriculum",
    badge: "12 Core Modules • Top to Bottom",
    categories: DSA_CATEGORIES_DATA,
  },

  // ==========================================
  // 2. MACHINE LEARNING & DEEP LEARNING LAB (10 PYTHON TOPICS)
  // ==========================================
  "ai-machine-learning": {
    title: "ML & Deep Learning Roadmap",
    badge: "Python / NumPy / PyTorch / Scikit-Learn",
    categories: [
      {
        id: "numpy-pandas-ds",
        name: "1. Python Data Science Pipelines",
        shortDesc: "NumPy vectorization, Pandas DataFrames, and Seaborn visualizations.",
        iconName: "Code2",
        topics: [
          {
            id: "numpy-mastery",
            slug: "numpy-vectorization-tensors",
            title: "1. NumPy Vectorization & Ndarrays",
            categoryId: "numpy-pandas-ds",
            categoryName: "1. Python Data Science Pipelines",
            difficulty: "Beginner",
            estimatedTime: "15 mins",
            gfgSearchQuery: "Machine learning and deep learning NumPy",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "NumPy provides 50x faster vectorized C-memory operations for high-dimensional matrix math.",
            keyPoints: [
              "Vectorized C buffers avoid slow Python loop execution.",
              "Broadcasting automatically aligns trailing matrix dimensions.",
              "Boolean masking filters sub-matrices without loops."
            ],
            diagramTitle: "NumPy Vectorization Matrix Flowchart",
            diagram: `┌───────────────────────┐       ┌───────────────────────┐
│ Matrix X (1000 x 10) │   @   │ Weights W (10 x 1)    │
└───────────┬───────────┘       └───────────┬───────────┘
            │                               │
            └───────────────┬───────────────┘
                            ▼
             ┌──────────────────────────────┐
             │ Linear Output Y = X@W + b    │ (1000 x 1)
             └──────────────────────────────┘`,
            complexities: [
              { operation: "Vector Addition", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python (NumPy)",
                code: `import numpy as np
X = np.random.randn(1000, 10)
W = np.random.randn(10, 1)
Y = np.dot(X, W) + 0.5
print("Output Tensor Shape:", Y.shape)`
              }
            ],
            practiceProblems: [
              { title: "Reshape Matrix", difficulty: "Easy", url: "https://leetcode.com/problems/reshape-the-matrix/", platform: "LeetCode" }
            ]
          },
          {
            id: "pandas-cleaning",
            slug: "pandas-dataframe-cleaning",
            title: "2. Pandas DataFrames & Data Cleaning",
            categoryId: "numpy-pandas-ds",
            categoryName: "1. Python Data Science Pipelines",
            difficulty: "Beginner",
            estimatedTime: "15 mins",
            gfgSearchQuery: "Pandas Data Preprocessing GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Pandas cleans tabular data, imputes missing NaNs, and scales numeric feature columns.",
            keyPoints: [
              "Impute NaNs via mean/median df.fillna().",
              "One-hot encode categories via pd.get_dummies().",
              "Z-score standardization: Z = (X - μ) / σ."
            ],
            diagramTitle: "Data Preprocessing Pipeline Flowchart",
            diagram: `┌────────────┐   ┌────────────┐   ┌─────────────┐   ┌─────────────┐
│ Raw CSV    │──>│ Impute NaNs│──>│ Categorical │──>│ Standardize │
│ Ingestion  │   │  (df.mean) │   │ One-Hot Enc │   │ Z-score Scal│
└────────────┘   └────────────┘   └─────────────┘   └─────────────┘`,
            complexities: [
              { operation: "CSV Data Ingest", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python (Pandas)",
                code: `import pandas as pd
from sklearn.preprocessing import StandardScaler
df = pd.DataFrame({'age': [25, None, 45], 'income': [50000, 64000, None]})
df.fillna(df.mean(), inplace=True)
scaled_X = StandardScaler().fit_transform(df)
print("Cleaned Scaled Data:\\n", scaled_X)`
              }
            ],
            practiceProblems: [
              { title: "Fill Missing Data", difficulty: "Easy", url: "https://leetcode.com/problems/fill-missing-data/", platform: "LeetCode" }
            ]
          }
        ]
      },
      {
        id: "supervised-ml",
        name: "2. Supervised Learning Models",
        shortDesc: "Linear Regression, Logistic Regression, Decision Trees, KNN, and SVM.",
        iconName: "BrainCircuit",
        topics: [
          {
            id: "linear-regression",
            slug: "linear-regression-gradient-descent",
            title: "3. Linear Regression & Gradient Descent",
            categoryId: "supervised-ml",
            categoryName: "2. Supervised Learning Models",
            difficulty: "Intermediate",
            estimatedTime: "20 mins",
            gfgSearchQuery: "Linear Regression GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Linear regression predicts continuous targets y = W^T X + b by minimizing Mean Squared Error.",
            keyPoints: [
              "MSE Loss: L = (1/2N) ∑ (y_pred - y_true)².",
              "Gradient Update: W = W - α * (∂L/∂W).",
              "α = learning rate controlling step size."
            ],
            diagramTitle: "Gradient Descent Optimization Flowchart",
            diagram: `┌──────────────────────┐
│ Initial Weights W, b │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐    Calculates ∂L/∂W
│ Compute MSE Loss L   │ ───>  Update Rule:
└──────────┬───────────┘       W = W - α*(∂L/∂W)
           │                        │
           └────── Iterates ───────┘`,
            complexities: [
              { operation: "Gradient Step", best: "O(N*d)", avg: "O(N*d)", worst: "O(N*d)", space: "O(d)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python (Scikit-Learn)",
                code: `from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2.1, 3.9, 6.1, 8.0, 10.2])
model = LinearRegression().fit(X, y)
print(f"Slope: {model.coef_[0]:.2f}, Intercept: {model.intercept_:.2f}")`
              }
            ],
            practiceProblems: [
              { title: "Best Time to Buy Stock", difficulty: "Easy", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", platform: "LeetCode" }
            ]
          },
          {
            id: "logistic-regression",
            slug: "logistic-regression-classification",
            title: "4. Logistic Regression & Sigmoid Function",
            categoryId: "supervised-ml",
            categoryName: "2. Supervised Learning Models",
            difficulty: "Intermediate",
            estimatedTime: "20 mins",
            gfgSearchQuery: "Logistic Regression GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Logistic regression maps linear combinations to probabilities using the Sigmoid curve σ(z) = 1/(1+e⁻ᶻ).",
            keyPoints: [
              "Sigmoid squashes outputs into range (0, 1).",
              "Binary Cross-Entropy Loss evaluates prediction error.",
              "Classifies as 1 if probability p >= 0.5."
            ],
            diagramTitle: "Logistic Sigmoid Classification Pipeline",
            diagram: `┌────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Input X    │───>│ z = W^T X + b   │───>│ σ(z)=1/(1+e⁻ᶻ)  │───> Class 1 (p >= 0.5)
└────────────┘    └─────────────────┘    └────────┬────────┘
                                                  │
                                                  └───> Class 0 (p < 0.5)`,
            complexities: [
              { operation: "Sigmoid Activation", best: "O(d)", avg: "O(d)", worst: "O(d)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `from sklearn.linear_model import LogisticRegression
clf = LogisticRegression().fit([[0.5], [1.5], [2.5], [3.5]], [0, 0, 1, 1])
print("Probability for x=3.0:", clf.predict_proba([[3.0]])[0][1])`
              }
            ],
            practiceProblems: [
              { title: "Predict Classification", difficulty: "Medium", url: "https://leetcode.com/problems/predict-the-winner/", platform: "LeetCode" }
            ]
          },
          {
            id: "decision-trees",
            slug: "decision-trees-random-forest",
            title: "5. Decision Trees & Random Forests",
            categoryId: "supervised-ml",
            categoryName: "2. Supervised Learning Models",
            difficulty: "Intermediate",
            estimatedTime: "20 mins",
            gfgSearchQuery: "Decision Tree GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Tree-based recursive splitting using Gini Impurity and Entropy Information Gain.",
            keyPoints: [
              "Gini Impurity: G = 1 - ∑ pᵢ² (0 for pure nodes).",
              "Information Gain IG = H(parent) - ∑ (N_child / N) * H(child).",
              "Random Forests combine multiple decision trees via Bagging."
            ],
            diagramTitle: "Decision Tree Binary Split Flowchart",
            diagram: `       [ Feature X1 <= 2.5? ]
           /           \\
    [ Yes: Class 0 ]   [ No: Feature X2 <= 5.0? ]
                           /               \\
                    [ Class 1 ]         [ Class 0 ]`,
            complexities: [
              { operation: "Tree Construction", best: "O(d*N log N)", avg: "O(d*N log N)", worst: "O(d*N²)", space: "O(Depth)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python (Scikit-Learn)",
                code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=200, n_features=5, random_state=42)
rf = RandomForestClassifier(n_estimators=50).fit(X, y)
print("Top Feature Importances:", rf.feature_importances_)`
              }
            ],
            practiceProblems: [
              { title: "Construct Binary Tree", difficulty: "Medium", url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", platform: "LeetCode" }
            ]
          },
          {
            id: "knn-classifier",
            slug: "k-nearest-neighbors-knn",
            title: "6. K-Nearest Neighbors (KNN)",
            categoryId: "supervised-ml",
            categoryName: "2. Supervised Learning Models",
            difficulty: "Beginner",
            estimatedTime: "15 mins",
            gfgSearchQuery: "K Nearest Neighbors GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Instance-based classifier assigning majority label among K nearest Euclidean neighbors.",
            keyPoints: [
              "Euclidean Distance d(p,q) = √[ ∑ (pᵢ - qᵢ)² ].",
              "Lazy Learning: No training phase; query computes distances to all data points.",
              "KD-Trees optimize neighbor search to O(log N)."
            ],
            diagramTitle: "KNN Majority Voting Diagram",
            diagram: `Query Point (?)  ──> Calculate Distance to N points
                   ──> Pick Top K=3 Nearest Nodes
                   ──> Majority Vote ──> Assigned Class A`,
            complexities: [
              { operation: "Query Distance", best: "O(N*d)", avg: "O(N*d)", worst: "O(N*d)", space: "O(N*d)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python (Scikit-Learn)",
                code: `from sklearn.neighbors import KNeighborsClassifier
knn = KNeighborsClassifier(n_neighbors=3).fit([[1, 2], [2, 3], [5, 6]], [0, 0, 1])
print("Predicted Class:", knn.predict([[1.5, 2.5]]))`
              }
            ],
            practiceProblems: [
              { title: "K Closest Points to Origin", difficulty: "Medium", url: "https://leetcode.com/problems/k-closest-points-to-origin/", platform: "LeetCode" }
            ]
          }
        ]
      },
      {
        id: "unsupervised-deep-ml",
        name: "3. Unsupervised Learning & Deep Learning",
        shortDesc: "K-Means, PCA, PyTorch Multi-Layer Perceptrons, and CNNs.",
        iconName: "BrainCircuit",
        topics: [
          {
            id: "kmeans-clustering",
            slug: "k-means-clustering-elbow",
            title: "7. K-Means Clustering & Elbow Method",
            categoryId: "unsupervised-deep-ml",
            categoryName: "3. Unsupervised Learning & Deep Learning",
            difficulty: "Intermediate",
            estimatedTime: "20 mins",
            gfgSearchQuery: "K Means Clustering GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Partition dataset into K clusters minimizing Within-Cluster Sum of Squares (WCSS).",
            keyPoints: [
              "Assign points to nearest centroid using Euclidean distance.",
              "Recompute centroid as mean vector of cluster members.",
              "Elbow Method plots WCSS vs K to pick optimal cluster count."
            ],
            diagramTitle: "K-Means Centroid Iteration Flowchart",
            diagram: `┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
│ Initialize K Centroids│──>│ Assign Points to     │──>│ Recompute Centroids  │
└──────────────────────┘   │ Nearest Centroid     │   │ as Mean Vector       │
                           └──────────┬───────────┘   └──────────┬───────────┘
                                      │                          │
                                      └────── Iterates ──────────┘`,
            complexities: [
              { operation: "K-Means Step", best: "O(K*N*d)", avg: "O(K*N*d)", worst: "O(K*N*d)", space: "O(N+K)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python (Scikit-Learn)",
                code: `from sklearn.cluster import KMeans
import numpy as np

kmeans = KMeans(n_clusters=3, random_state=42).fit(np.random.randn(200, 2))
print("Centroid Coordinates:\\n", kmeans.cluster_centers_)`
              }
            ],
            practiceProblems: [
              { title: "Partition Array Three Parts", difficulty: "Easy", url: "https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum/", platform: "LeetCode" }
            ]
          },
          {
            id: "pca-reduction",
            slug: "principal-component-analysis-pca",
            title: "8. Principal Component Analysis (PCA)",
            categoryId: "unsupervised-deep-ml",
            categoryName: "3. Unsupervised Learning & Deep Learning",
            difficulty: "Advanced",
            estimatedTime: "20 mins",
            gfgSearchQuery: "Principal Component Analysis GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Linear dimensionality reduction projecting data onto orthogonal maximum-variance axes.",
            keyPoints: [
              "Covariance Matrix C = (1/N) X^T X captures feature variance.",
              "Eigenvalue Decomposition C * v = λ * v yields principal directions.",
              "Reduces high-dimensional noise while preserving variance."
            ],
            diagramTitle: "PCA Projection Diagram",
            diagram: `High Dim Data (20 Features) ──> Covariance Matrix C ──> Top K Eigenvectors ──> 2D Projection`,
            complexities: [
              { operation: "SVD / Eigendecomposition", best: "O(d³)", avg: "O(d³)", worst: "O(d³)", space: "O(d²)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python (Scikit-Learn)",
                code: `from sklearn.decomposition import PCA
import numpy as np
pca = PCA(n_components=2).fit(np.random.randn(100, 20))
print("Explained Variance Ratios:", pca.explained_variance_ratio_)`
              }
            ],
            practiceProblems: [
              { title: "Matrix Reduction", difficulty: "Medium", url: "https://leetcode.com/problems/rotate-image/", platform: "LeetCode" }
            ]
          },
          {
            id: "mlp-backprop",
            slug: "multi-layer-perceptron-backprop",
            title: "9. PyTorch Multi-Layer Perceptron (MLP)",
            categoryId: "unsupervised-deep-ml",
            categoryName: "3. Unsupervised Learning & Deep Learning",
            difficulty: "Advanced",
            estimatedTime: "25 mins",
            gfgSearchQuery: "PyTorch MLP Deep Learning",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Multi-Layer Perceptrons stack linear layers with non-linear activations, updating weights via Backprop Chain Rule.",
            keyPoints: [
              "Forward Pass: Computes z = Wx + b and h = ReLU(z).",
              "Backprop: Chain Rule calculates ∂Loss/∂Weights.",
              "PyTorch autograd handles automatic differentiation."
            ],
            diagramTitle: "Neural Network Architecture Diagram",
            diagram: `┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│ Input Layer │  ──>  │ Hidden Layer │  ──>  │ Output      │
│ (X1, X2)    │ (W1)  │ (ReLU)       │ (W2)  │ (Classes)   │
└─────────────┘       └──────────────┘       └─────────────┘`,
            complexities: [
              { operation: "Forward / Backprop", best: "O(L * d)", avg: "O(L * d)", worst: "O(L * d)", space: "O(Weights)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "PyTorch MLP",
                code: `import torch
import torch.nn as nn

class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(nn.Linear(10, 64), nn.ReLU(), nn.Linear(64, 2))
    def forward(self, x): return self.net(x)

model = MLP()
print("PyTorch Tensor Output Shape:", model(torch.randn(32, 10)).shape)`
              }
            ],
            practiceProblems: [
              { title: "Evaluate Expression / Chain", difficulty: "Medium", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", platform: "LeetCode" }
            ]
          },
          {
            id: "cnn-foundations",
            slug: "convolutional-neural-networks-cnn",
            title: "10. Convolutional Neural Networks (CNN)",
            categoryId: "unsupervised-deep-ml",
            categoryName: "3. Unsupervised Learning & Deep Learning",
            difficulty: "Advanced",
            estimatedTime: "25 mins",
            gfgSearchQuery: "CNN Architecture GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Machine%20learning%20and%20deep%20learning",
            quickSummary: "Spatial feature extraction using 2D kernels, stride, padding, and max pooling.",
            keyPoints: [
              "Kernel Convolution: Slides weight filters across image channels.",
              "Max Pooling: Downsamples spatial dimensions preserving key features.",
              "Translation Invariance: Detects features regardless of location."
            ],
            diagramTitle: "CNN Convolution & Pooling Flowchart",
            diagram: `Input Image (28x28) ──> Conv2d (3x3 Kernel) ──> ReLU ──> MaxPool2d (2x2) ──> Feature Map (14x14)`,
            complexities: [
              { operation: "2D Convolution", best: "O(K² * H * W)", avg: "O(K² * H * W)", worst: "O(K² * H * W)", space: "O(Channels)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "PyTorch CNN",
                code: `import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Conv2d(3, 16, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.relu = nn.ReLU()
    def forward(self, x):
        return self.pool(self.relu(self.conv(x)))`
              }
            ],
            practiceProblems: [
              { title: "Flood Fill / Grid Convolution", difficulty: "Easy", url: "https://leetcode.com/problems/flood-fill/", platform: "LeetCode" }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // 3. DATABASE MANAGEMENT SYSTEMS LAB (10 SQL TOPICS)
  // ==========================================
  "dbms-lab": {
    title: "DBMS Learning Roadmap",
    badge: "SQL / Normalization / B+ Trees / ACID",
    categories: [
      {
        id: "sql-queries",
        name: "1. SQL & Relational Queries",
        shortDesc: "DDL, DML, Aggregations, Joins, Subqueries, and CTE Window Functions.",
        iconName: "Layers",
        topics: [
          {
            id: "sql-ddl-dml",
            slug: "sql-ddl-dml-fundamentals",
            title: "1. SQL DDL, DML & Aggregations",
            categoryId: "sql-queries",
            categoryName: "1. SQL & Relational Queries",
            difficulty: "Beginner",
            estimatedTime: "15 mins",
            gfgSearchQuery: "SQL Tutorial GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "SQL DDL defines relational table schemas, while DML inserts, updates, and aggregates records.",
            keyPoints: [
              "DDL: CREATE TABLE, ALTER TABLE, DROP TABLE.",
              "DML: INSERT, UPDATE, DELETE, SELECT.",
              "Aggregation: GROUP BY column HAVING condition COUNT(*)."
            ],
            diagramTitle: "Relational Query Execution Flowchart",
            diagram: `┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐
│ FROM Table │──>│ WHERE Filter│──>│ GROUP BY   │──>│ HAVING     │──> SELECT
└────────────┘   └────────────┘   └────────────┘   └────────────┘`,
            complexities: [
              { operation: "Index Lookup", best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL",
                code: `CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dept VARCHAR(50),
    gpa DECIMAL(3,2)
);

SELECT dept, AVG(gpa) AS avg_gpa FROM Students GROUP BY dept HAVING AVG(gpa) > 3.50;`
              }
            ],
            practiceProblems: [
              { title: "Combine Two Tables", difficulty: "Easy", url: "https://leetcode.com/problems/combine-two-tables/", platform: "LeetCode" }
            ]
          },
          {
            id: "sql-joins",
            slug: "sql-joins-subqueries",
            title: "2. SQL Relational Joins",
            categoryId: "sql-queries",
            categoryName: "1. SQL & Relational Queries",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "SQL Joins GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "Joins combine matching rows across foreign-key related tables (INNER, LEFT, RIGHT, FULL).",
            keyPoints: [
              "INNER JOIN: Retains only matching key rows.",
              "LEFT JOIN: Retains all left table rows, padding NULLs.",
              "Hash Join scans left table into RAM hash table."
            ],
            diagramTitle: "Relational Join Venn Diagram",
            diagram: `  Table A (Left)               Table B (Right)
┌────────────────┐           ┌────────────────┐
│   [ A ONLY ]   │ ┌───────┐ │   [ B ONLY ]   │
│                │ │ MATCH │ │                │
└────────────────┘ └───────┘ └────────────────┘
      ▲                ▲
      │                │
      └── LEFT JOIN ───┴── INNER JOIN`,
            complexities: [
              { operation: "Hash Join", best: "O(M + N)", avg: "O(M + N)", worst: "O(M + N)", space: "O(M)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL",
                code: `SELECT e.name, d.dept_name
FROM Employees e
LEFT JOIN Departments d ON e.dept_id = d.dept_id;`
              }
            ],
            practiceProblems: [
              { title: "Department Highest Salary", difficulty: "Medium", url: "https://leetcode.com/problems/department-highest-salary/", platform: "LeetCode" }
            ]
          },
          {
            id: "sql-subqueries",
            slug: "sql-subqueries-nested",
            title: "3. SQL Subqueries & Correlated Queries",
            categoryId: "sql-queries",
            categoryName: "1. SQL & Relational Queries",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "SQL Subqueries GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "Nested queries inside WHERE or FROM clauses evaluated per row.",
            keyPoints: [
              "Scalar Subquery: Returns a single value.",
              "Correlated Subquery: Nested query references outer query columns.",
              "EXISTS operator checks for non-empty subquery result sets."
            ],
            diagramTitle: "Correlated Subquery Row-by-Row Execution",
            diagram: `Outer Loop (Row e in Employees) ──> Execute Subquery for e.dept_id ──> Filter Row`,
            complexities: [
              { operation: "Correlated Scan", best: "O(N)", avg: "O(N*M)", worst: "O(N*M)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL",
                code: `SELECT name, salary FROM Employees e
WHERE salary > (SELECT AVG(salary) FROM Employees WHERE dept_id = e.dept_id);`
              }
            ],
            practiceProblems: [
              { title: "Employees Earning More", difficulty: "Easy", url: "https://leetcode.com/problems/employees-earning-more-than-their-managers/", platform: "LeetCode" }
            ]
          },
          {
            id: "sql-window-functions",
            slug: "sql-window-functions-cte",
            title: "4. SQL Window Functions & CTEs",
            categoryId: "sql-queries",
            categoryName: "1. SQL & Relational Queries",
            difficulty: "Advanced",
            estimatedTime: "20 mins",
            gfgSearchQuery: "SQL Window Functions GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "ROW_NUMBER(), RANK(), DENSE_RANK(), and WITH CTE query modularization.",
            keyPoints: [
              "OVER (PARTITION BY col ORDER BY val): Ranks rows per partition.",
              "DENSE_RANK() does not skip ranking numbers after ties.",
              "CTEs: Temporary named result sets defined via WITH cte_name AS (...)."
            ],
            diagramTitle: "Window Function Partition Ranking",
            diagram: `Partition: Dept 10  ──> Sort Salary DESC ──> Assign ROW_NUMBER() [1, 2, 3]
Partition: Dept 20  ──> Sort Salary DESC ──> Assign ROW_NUMBER() [1, 2]`,
            complexities: [
              { operation: "Window Partition Sort", best: "O(N log N)", avg: "O(N log N)", worst: "O(N log N)", space: "O(N)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL",
                code: `WITH RankedSalaries AS (
    SELECT name, dept_id, salary,
           DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as rank_num
    FROM Employees
)
SELECT name, dept_id, salary FROM RankedSalaries WHERE rank_num <= 3;`
              }
            ],
            practiceProblems: [
              { title: "Department Top 3 Salaries", difficulty: "Hard", url: "https://leetcode.com/problems/department-top-three-salaries/", platform: "LeetCode" }
            ]
          }
        ]
      },
      {
        id: "normalization-indexes",
        name: "2. Schema Normalization & Indexing",
        shortDesc: "1NF to BCNF decomposition and B+ Tree index structures.",
        iconName: "Database",
        topics: [
          {
            id: "database-1nf-2nf",
            slug: "database-normalization-1nf-2nf",
            title: "5. 1NF & 2NF Normalization",
            categoryId: "normalization-indexes",
            categoryName: "2. Schema Normalization & Indexing",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "1NF 2NF Normalization GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "1NF enforces atomic attributes; 2NF eliminates partial functional dependencies.",
            keyPoints: [
              "1NF: Atomic values; no multi-valued attributes or repeating groups.",
              "2NF: In 1NF + no non-key attribute depends on part of a composite primary key.",
              "Decomposes tables by splitting partial dependencies into new tables."
            ],
            diagramTitle: "2NF Partial Dependency Removal",
            diagram: `[ Order_ID, Item_ID ] ──> Quantity  (Full Primary Key Dependency)
[ Item_ID ] ────────────> Item_Price (Partial Dependency ──> Split to Items Table)`,
            complexities: [
              { operation: "Schema Validation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL Schema",
                code: `CREATE TABLE OrderItems (order_id INT, item_id INT, qty INT, PRIMARY KEY(order_id, item_id));
CREATE TABLE Items (item_id INT PRIMARY KEY, item_price DECIMAL(10,2));`
              }
            ],
            practiceProblems: [
              { title: "Design Twitter", difficulty: "Medium", url: "https://leetcode.com/problems/design-twitter/", platform: "LeetCode" }
            ]
          },
          {
            id: "database-3nf-bcnf",
            slug: "database-normalization-3nf-bcnf",
            title: "6. 3NF & Boyce-Codd Normal Form (BCNF)",
            categoryId: "normalization-indexes",
            categoryName: "2. Schema Normalization & Indexing",
            difficulty: "Intermediate",
            estimatedTime: "20 mins",
            gfgSearchQuery: "3NF BCNF Normalization GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "3NF eliminates transitive dependencies (A -> B -> C); BCNF requires X to be a Super Key for all X -> Y.",
            keyPoints: [
              "3NF: No non-key attribute depends transitively on primary key.",
              "BCNF: Stricter version of 3NF eliminating all candidate key anomalies.",
              "Lossless Join & Dependency Preservation guarantees."
            ],
            diagramTitle: "3NF Transitive Dependency Decomposition",
            diagram: `Emp_ID ──> Zip_Code ──> City_Name  (Transitive Dependency!)
  ▼
Table 1: [ Emp_ID, Zip_Code ]
Table 2: [ Zip_Code, City_Name ] (Decomposed into 3NF)`,
            complexities: [
              { operation: "Schema Decomposition", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL Schema",
                code: `CREATE TABLE EmployeeZip (emp_id INT PRIMARY KEY, zip VARCHAR(10));
CREATE TABLE ZipCities (zip VARCHAR(10) PRIMARY KEY, city VARCHAR(50));`
              }
            ],
            practiceProblems: [
              { title: "Design Food Rating System", difficulty: "Medium", url: "https://leetcode.com/problems/design-a-food-rating-system/", platform: "LeetCode" }
            ]
          },
          {
            id: "bplus-tree-indexing",
            slug: "b-plus-tree-indexing-dbms",
            title: "7. B+ Tree Indexing & Range Queries",
            categoryId: "normalization-indexes",
            categoryName: "2. Schema Normalization & Indexing",
            difficulty: "Advanced",
            estimatedTime: "20 mins",
            gfgSearchQuery: "B+ Tree Indexing DBMS GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "Balanced N-ary tree storing data pointers exclusively in linked leaf nodes.",
            keyPoints: [
              "Leaf nodes linked via pointers for ultra-fast range queries L <= key <= R.",
              "Clustered Index: Physical data rows ordered by primary key.",
              "Non-Clustered Index: Secondary index pointing to primary key locators."
            ],
            diagramTitle: "B+ Tree Leaf Node Linkage Diagram",
            diagram: `       [ Root: 50 ]
      /            \\
  [ 20 | 30 ]     [ 60 | 80 ]
      │               │
  ( Leaf 1 ) ──Next─> ( Leaf 2 ) ──Next─> ( Leaf 3 )`,
            complexities: [
              { operation: "B+ Tree Search", best: "O(log_b N)", avg: "O(log_b N)", worst: "O(log_b N)", space: "O(N)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL Index",
                code: `CREATE INDEX idx_student_dept ON Students(dept);
CREATE UNIQUE INDEX idx_customer_email ON Customers(email);`
              }
            ],
            practiceProblems: [
              { title: "Find First and Last Position", difficulty: "Medium", url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", platform: "LeetCode" }
            ]
          },
          {
            id: "hash-indexing",
            slug: "hash-indexing-dbms",
            title: "8. Hash Indexing & Query Optimization",
            categoryId: "normalization-indexes",
            categoryName: "2. Schema Normalization & Indexing",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "Hash Indexing DBMS GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "Hash indexes map key values to bucket pointers using a hash function h(K) for O(1) equality lookups.",
            keyPoints: [
              "O(1) instant equality lookup WHERE key = value.",
              "Does NOT support range queries WHERE val BETWEEN A AND B.",
              "Extendible Hashing handles dynamic directory expansion."
            ],
            diagramTitle: "Hash Index Bucket Mapping",
            diagram: `Key: "Alice" ──> Hash Function h("Alice") = 3 ──> Bucket 3 [ Pointer to Row ]`,
            complexities: [
              { operation: "Equality Lookup", best: "O(1)", avg: "O(1)", worst: "O(N)", space: "O(N)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL Index",
                code: `CREATE INDEX idx_user_hash ON Users USING HASH (username);`
              }
            ],
            practiceProblems: [
              { title: "Design HashMap", difficulty: "Easy", url: "https://leetcode.com/problems/design-hashmap/", platform: "LeetCode" }
            ]
          }
        ]
      },
      {
        id: "transactions-concurrency",
        name: "3. Transactions & Concurrency Control",
        shortDesc: "ACID properties, 2PL locking, and isolation levels.",
        iconName: "BrainCircuit",
        topics: [
          {
            id: "acid-transactions",
            slug: "acid-properties-concurrency-control",
            title: "9. ACID Properties & Transaction States",
            categoryId: "transactions-concurrency",
            categoryName: "3. Transactions & Concurrency Control",
            difficulty: "Advanced",
            estimatedTime: "20 mins",
            gfgSearchQuery: "ACID Properties DBMS GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "Atomicity, Consistency, Isolation, and Durability guarantees for database modifications.",
            keyPoints: [
              "Atomicity: All-or-nothing execution via Commit or Rollback.",
              "Consistency: Database transitions from one valid state to another.",
              "Durability: Committed data survives system crashes via Write-Ahead Logging (WAL)."
            ],
            diagramTitle: "Transaction State Transition Diagram",
            diagram: `[ Active ] ──> [ Partially Committed ] ──> [ Committed ] (SUCCESS)
    │
    └───> [ Failed ] ──> [ Aborted ] (ROLLBACK)`,
            complexities: [
              { operation: "Commit / Rollback", best: "O(1)", avg: "O(1)", worst: "O(Log)", space: "O(WAL Log)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL Transaction",
                code: `BEGIN TRANSACTION;
UPDATE Accounts SET balance = balance - 500 WHERE acc_id = 101;
UPDATE Accounts SET balance = balance + 500 WHERE acc_id = 202;
COMMIT;`
              }
            ],
            practiceProblems: [
              { title: "Design Bank System", difficulty: "Medium", url: "https://leetcode.com/problems/simple-bank-system/", platform: "LeetCode" }
            ]
          },
          {
            id: "concurrency-2pl",
            slug: "two-phase-locking-2pl-deadlocks",
            title: "10. Two-Phase Locking (2PL) & Deadlocks",
            categoryId: "transactions-concurrency",
            categoryName: "3. Transactions & Concurrency Control",
            difficulty: "Advanced",
            estimatedTime: "25 mins",
            gfgSearchQuery: "Two Phase Locking GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Database%20Management%20Systems%20Lab",
            quickSummary: "Strict 2PL prevents dirty reads by requiring lock acquisition phase before any lock release phase.",
            keyPoints: [
              "Shared Lock (S): Read-only access; multiple transactions can hold S-locks.",
              "Exclusive Lock (X): Read-write access; only 1 transaction can hold X-lock.",
              "Deadlock Detection: Wait-For Graph cycles trigger transaction abortion."
            ],
            diagramTitle: "2PL Growing & Shrinking Phase",
            diagram: `Growing Phase (Acquires S & X Locks) ──> LOCK POINT ──> Shrinking Phase (Releases Locks)`,
            complexities: [
              { operation: "Lock Acquisition", best: "O(1)", avg: "O(1)", worst: "Deadlock O(V+E)", space: "O(Locks)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "SQL Locking",
                code: `SELECT * FROM Accounts WHERE acc_id = 101 FOR UPDATE; -- Exclusive X Lock`
              }
            ],
            practiceProblems: [
              { title: "Design Lock Manager", difficulty: "Hard", url: "https://leetcode.com/problems/design-bounded-blocking-queue/", platform: "LeetCode" }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // 4. COMPUTER NETWORKS & PROTOCOLS LAB (10 NETWORK TOPICS)
  // ==========================================
  "computer-networks": {
    title: "Computer Networks Roadmap",
    badge: "TCP/IP / ARQ Protocols / Dijkstra / Sockets",
    categories: [
      {
        id: "network-architecture",
        name: "1. Network Architecture & IP Subnetting",
        shortDesc: "OSI 7-Layer model, IPv4/IPv6 CIDR subnetting, and ARP.",
        iconName: "Network",
        topics: [
          {
            id: "osi-tcpip-model",
            slug: "osi-tcpip-architecture-layers",
            title: "1. OSI 7-Layer Architecture & TCP/IP Suite",
            categoryId: "network-architecture",
            categoryName: "1. Network Architecture & IP Subnetting",
            difficulty: "Beginner",
            estimatedTime: "15 mins",
            gfgSearchQuery: "OSI Model Computer Networks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "OSI 7-Layer model standardizes network communication from Physical bits up to Application data.",
            keyPoints: [
              "Encapsulation: Data -> Segment (L4) -> Packet (L3) -> Frame (L2) -> Bits (L1).",
              "L2 Data Link: MAC addresses & CRC error checking.",
              "L3 Network: IP routing across routers."
            ],
            diagramTitle: "OSI Layer Encapsulation Flowchart",
            diagram: `[ Application Data ] ──> [ L4 Header + Data ] (Segment)
                     ──> [ L3 Header + Segment ] (Packet)
                     ──> [ L2 Header + Packet + Trailer ] (Frame)
                     ──> [ 010110101 Bits ] (Physical)`,
            complexities: [
              { operation: "Header Encapsulation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(Header)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `import socket
print("Host IP:", socket.gethostbyname(socket.gethostname()))`
              }
            ],
            practiceProblems: [
              { title: "IP Address Validation", difficulty: "Medium", url: "https://leetcode.com/problems/validate-ip-address/", platform: "LeetCode" }
            ]
          },
          {
            id: "ipv4-subnetting",
            slug: "ipv4-addressing-cidr-subnetting",
            title: "2. IPv4 Subnetting & CIDR Calculations",
            categoryId: "network-architecture",
            categoryName: "1. Network Architecture & IP Subnetting",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "IP Subnetting CIDR",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "CIDR subnet masks (/24) divide 32-bit IPv4 addresses into Network ID and Host ID bits.",
            keyPoints: [
              "Subnet Mask /24 = 255.255.255.0 (24 Network bits, 8 Host bits).",
              "Usable Hosts = 2^(32 - CIDR) - 2.",
              "Private IP Ranges: 10.0.0.0/8, 192.168.0.0/16."
            ],
            diagramTitle: "IPv4 Subnet Bit Split Diagram",
            diagram: `┌───────────────────────────────┬───────────────┐
│ 24 Network Bits (192.168.1.x) │ 8 Host Bits   │
└───────────────────────────────┴───────────────┘
  <───── Subnet Mask /24 ────────>  254 Hosts`,
            complexities: [
              { operation: "Subnet Bitwise AND", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `import ipaddress
net = ipaddress.ip_network('192.168.1.0/24')
print("Total Usable Hosts:", net.num_addresses - 2)`
              }
            ],
            practiceProblems: [
              { title: "Defanging an IP Address", difficulty: "Easy", url: "https://leetcode.com/problems/defanging-an-ip-address/", platform: "LeetCode" }
            ]
          },
          {
            id: "arp-protocol",
            slug: "arp-mac-address-resolution",
            title: "3. MAC Addressing & ARP Protocol",
            categoryId: "network-architecture",
            categoryName: "1. Network Architecture & IP Subnetting",
            difficulty: "Beginner",
            estimatedTime: "12 mins",
            gfgSearchQuery: "ARP Protocol GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Address Resolution Protocol (ARP) translates 32-bit IP addresses to 48-bit MAC hardware addresses.",
            keyPoints: [
              "ARP Request is Broadcast (FF:FF:FF:FF:FF:FF) across LAN.",
              "ARP Reply is Unicast back from target node.",
              "ARP Cache stores IP-to-MAC mappings in local RAM."
            ],
            diagramTitle: "ARP Broadcast & Unicast Flowchart",
            diagram: `Sender (IP A) ── Broadcast ARP Request "Who has IP B?" ──> LAN Switch ──> All Hosts
Host B ── Unicast ARP Reply "IP B is at MAC B" ──> Sender`,
            complexities: [
              { operation: "Cache Lookup", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `import uuid
mac = ':'.join(['{:02x}'.format((uuid.getnode() >> ele) & 0xff) for ele in range(0,8*6,8)][::-1])
print("Hardware MAC Address:", mac)`
              }
            ],
            practiceProblems: [
              { title: "Validate MAC Address", difficulty: "Easy", url: "https://leetcode.com/problems/valid-ip-address/", platform: "LeetCode" }
            ]
          }
        ]
      },
      {
        id: "data-link-layer",
        name: "2. Data Link Protocols & ARQ",
        shortDesc: "CRC error detection, Stop-and-Wait, Go-Back-N, and Selective Repeat ARQ.",
        iconName: "Code2",
        topics: [
          {
            id: "crc-error-detection",
            slug: "crc-error-detection-polynomial",
            title: "4. CRC Polynomial Error Detection",
            categoryId: "data-link-layer",
            categoryName: "2. Data Link Protocols & ARQ",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "CRC Error Detection GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Cyclic Redundancy Check uses binary XOR modulo-2 division to detect bit flip errors.",
            keyPoints: [
              "Generator Polynomial G(x) appends r zero bits to message M(x).",
              "Modulo-2 XOR division computes r-bit CRC checksum remainder.",
              "Receiver validates frame if remainder is zero."
            ],
            diagramTitle: "CRC Modulo-2 XOR Division Diagram",
            diagram: `Message M(x) + r Zeros ──> Modulo-2 XOR Div by G(x) ──> Remainder R(x) (CRC Checksum)`,
            complexities: [
              { operation: "Modulo-2 Division", best: "O(N * r)", avg: "O(N * r)", worst: "O(N * r)", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `def xor(a, b):
    return ''.join(['0' if a[i] == b[i] else '1' for i in range(1, len(b))])`
              }
            ],
            practiceProblems: [
              { title: "Single Number XOR", difficulty: "Easy", url: "https://leetcode.com/problems/single-number/", platform: "LeetCode" }
            ]
          },
          {
            id: "stop-wait-arq",
            slug: "stop-and-wait-arq-protocol",
            title: "5. Stop-and-Wait ARQ Protocol",
            categoryId: "data-link-layer",
            categoryName: "2. Data Link Protocols & ARQ",
            difficulty: "Beginner",
            estimatedTime: "12 mins",
            gfgSearchQuery: "Stop and Wait ARQ GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Sender transmits 1 frame at a time, halting until receiving receiver ACK.",
            keyPoints: [
              "Sender holds frame in buffer until ACK arrives.",
              "Timer retransmits frame if ACK is lost.",
              "Sequence numbers (0 and 1) prevent duplicate frames."
            ],
            diagramTitle: "Stop-and-Wait Timeline Diagram",
            diagram: `Sender               Receiver
  │  Frame (Seq=0)     │
  │───────────────────>│  ACK 1
  │<───────────────────│`,
            complexities: [
              { operation: "Efficiency", best: "1 / (1 + 2a)", avg: "1 / (1 + 2a)", worst: "0", space: "O(1)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "Java",
                code: `import java.net.*;
public class StopWaitSender {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket();
        byte[] buf = "Frame 0".getBytes();
        socket.send(new DatagramPacket(buf, buf.length, InetAddress.getByName("localhost"), 9876));
    }
}`
              }
            ],
            practiceProblems: [
              { title: "Design Push Pop Protocol", difficulty: "Easy", url: "https://leetcode.com/problems/backspace-string-compare/", platform: "LeetCode" }
            ]
          },
          {
            id: "sliding-window-arq",
            slug: "sliding-window-arq-protocols",
            title: "6. Go-Back-N & Selective Repeat ARQ",
            categoryId: "data-link-layer",
            categoryName: "2. Data Link Protocols & ARQ",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "Sliding Window Protocol GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Sliding Window ARQ delivers error-free sequential packet frames using sequence numbers and ACKs.",
            keyPoints: [
              "Go-Back-N ARQ: Transmits window size N; drops out-of-order frames.",
              "Selective Repeat ARQ: Buffers out-of-order frames; retransmits missing frame.",
              "Optimizes link utilization on high latency channels."
            ],
            diagramTitle: "ARQ Window Transmission Diagram",
            diagram: `Sender Window [ 1, 2, 3, 4 ] ──> Transmit Frames 1..4
  Frame 2 Lost! ──> Selective Repeat Retransmits Frame 2 Only`,
            complexities: [
              { operation: "Efficiency", best: "O(1)", avg: "N / (1 + 2a)", worst: "1 / (1 + 2a)", space: "O(N)" }
            ],
            codeSnippets: [
              {
                language: "java",
                label: "Java",
                code: `import java.net.*;
public class ARQSender {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket();
        byte[] buf = "Packet Seq=1".getBytes();
        socket.send(new DatagramPacket(buf, buf.length, InetAddress.getByName("localhost"), 9876));
    }
}`
              }
            ],
            practiceProblems: [
              { title: "Encode and Decode Strings", difficulty: "Medium", url: "https://leetcode.com/problems/encode-and-decode-strings/", platform: "LeetCode" }
            ]
          }
        ]
      },
      {
        id: "routing-transport",
        name: "3. Routing & Transport Protocols",
        shortDesc: "Dijkstra, Bellman-Ford, TCP 3-way handshake, and Socket programming.",
        iconName: "Network",
        topics: [
          {
            id: "dijkstra-routing",
            slug: "dijkstra-link-state-routing",
            title: "7. Dijkstra Link-State Routing",
            categoryId: "routing-transport",
            categoryName: "3. Routing & Transport Protocols",
            difficulty: "Advanced",
            estimatedTime: "20 mins",
            gfgSearchQuery: "Dijkstra Routing GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Link-State routing algorithm calculating global shortest path trees across routers.",
            keyPoints: [
              "Every router floods Link-State Advertisements (LSA) to build full topology graph.",
              "Min-Heap Priority Queue optimizes runtime to O((V + E) log V).",
              "Used in Open Shortest Path First (OSPF) IP routing."
            ],
            diagramTitle: "Link-State Graph Traversal Diagram",
            diagram: `Router A ──(1)──> Router B ──(2)──> Router C
   │                                   ▲
   └───────────────(5)─────────────────┘`,
            complexities: [
              { operation: "Dijkstra Priority Queue", best: "O(E log V)", avg: "O(E log V)", worst: "O(E log V)", space: "O(V+E)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `import heapq

def dijkstra(graph, src, V):
    dist = [float('inf')] * V; dist[src] = 0
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w; heapq.heappush(pq, (dist[v], v))
    return dist`
              }
            ],
            practiceProblems: [
              { title: "Network Delay Time", difficulty: "Medium", url: "https://leetcode.com/problems/network-delay-time/", platform: "LeetCode" }
            ]
          },
          {
            id: "bellman-ford-routing",
            slug: "distance-vector-bellman-ford",
            title: "8. Distance-Vector & Bellman-Ford Routing",
            categoryId: "routing-transport",
            categoryName: "3. Routing & Transport Protocols",
            difficulty: "Advanced",
            estimatedTime: "20 mins",
            gfgSearchQuery: "Bellman Ford GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Distance-vector algorithm relaxing edges V-1 times; detects negative weight cycles.",
            keyPoints: [
              "Routers exchange routing tables with immediate neighbors.",
              "Relaxes all E edges V-1 times.",
              "Used in Routing Information Protocol (RIP)."
            ],
            diagramTitle: "Distance Vector Table Exchange Flowchart",
            diagram: `Router A Table ── Exchanged ──> Router B ── Updates Row if (dist_A + cost < dist_B)`,
            complexities: [
              { operation: "Bellman-Ford", best: "O(E)", avg: "O(V*E)", worst: "O(V*E)", space: "O(V)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `def bellman_ford(edges, V, src):
    dist = [float('inf')] * V; dist[src] = 0
    for _ in range(V - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]: dist[v] = dist[u] + w
    return dist`
              }
            ],
            practiceProblems: [
              { title: "Cheapest Flights Within K Stops", difficulty: "Medium", url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", platform: "LeetCode" }
            ]
          },
          {
            id: "tcp-handshake",
            slug: "tcp-three-way-handshake",
            title: "9. TCP 3-Way Handshake & Connection States",
            categoryId: "routing-transport",
            categoryName: "3. Routing & Transport Protocols",
            difficulty: "Intermediate",
            estimatedTime: "15 mins",
            gfgSearchQuery: "TCP 3 Way Handshake GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Establishes reliable connection via SYN, SYN-ACK, ACK packet exchange.",
            keyPoints: [
              "Step 1: Client sends SYN (Seq = x).",
              "Step 2: Server replies SYN-ACK (Seq = y, ACK = x+1).",
              "Step 3: Client sends ACK (ACK = y+1)."
            ],
            diagramTitle: "TCP 3-Way Handshake Sequence Diagram",
            diagram: `Client                               Server
  │           SYN (Seq=100)            │
  │───────────────────────────────────>│
  │       SYN-ACK (Seq=300, ACK=101)   │
  │<───────────────────────────────────│
  │           ACK (ACK=301)            │
  │───────────────────────────────────>│ (ESTABLISHED)`,
            complexities: [
              { operation: "Connection Setup", best: "1 RTT", avg: "1 RTT", worst: "Timeout", space: "O(Buffer)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python",
                code: `import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('google.com', 80)) # Triggers TCP 3-Way Handshake
print("TCP Connection Established!")`
              }
            ],
            practiceProblems: [
              { title: "Design Underground System", difficulty: "Medium", url: "https://leetcode.com/problems/design-underground-system/", platform: "LeetCode" }
            ]
          },
          {
            id: "socket-programming",
            slug: "socket-programming-tcp-udp",
            title: "10. TCP & UDP Socket Programming",
            categoryId: "routing-transport",
            categoryName: "3. Routing & Transport Protocols",
            difficulty: "Intermediate",
            estimatedTime: "20 mins",
            gfgSearchQuery: "Socket Programming GeeksforGeeks",
            gfgUrl: "https://www.geeksforgeeks.org/search/?gq=Computer%20Networks%20%26%20Protocols%20Lab",
            quickSummary: "Client-Server socket API communication over TCP streams or UDP datagrams.",
            keyPoints: [
              "Server API: socket(), bind(), listen(), accept(), recv(), send().",
              "Client API: socket(), connect(), send(), recv(), close().",
              "UDP DatagramSockets transmit lightweight un-acknowledged packets."
            ],
            diagramTitle: "Socket Client-Server Lifecycle Flowchart",
            diagram: `Server: socket() ──> bind() ──> listen() ──> accept() ──> recv() ──> send()
Client: socket() ───────────────────────────> connect() ──> send() ──> recv()`,
            complexities: [
              { operation: "Socket Transfer", best: "O(N)", avg: "O(N)", worst: "O(N)", space: "O(Buffer)" }
            ],
            codeSnippets: [
              {
                language: "python",
                label: "Python TCP Server",
                code: `import socket
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('localhost', 8080))
server.listen(1)
conn, addr = server.accept()
conn.sendall(b"Hello Network!")
conn.close()`
              }
            ],
            practiceProblems: [
              { title: "Design Bounded Blocking Queue", difficulty: "Hard", url: "https://leetcode.com/problems/design-bounded-blocking-queue/", platform: "LeetCode" }
            ]
          }
        ]
      }
    ]
  }
};
