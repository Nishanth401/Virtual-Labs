import { DSACategory } from "../dsa-topic-data";

export const ML_ROADMAP_CATEGORIES: DSACategory[] = [
  {
    id: "ml-concept-trees-ann",
    name: "1. Concept Learning, Trees & Neural Networks",
    shortDesc: "Candidate-Elimination version space, ID3 Decision Trees, and Backpropagation ANN.",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "ml-candidate-elimination",
        slug: "candidate-elimination-algorithm",
        title: "Exp 1: Candidate-Elimination Algorithm",
        categoryId: "ml-concept-trees-ann",
        categoryName: "1. Concept Learning, Trees & Neural Networks",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Candidate Elimination Algorithm Python concept learning version space",
        gfgUrl: "https://www.geeksforgeeks.org/candidate-elimination-algorithm/",
        quickSummary: "Maintain Specific Boundary S and General Boundary G defining the Version Space consistent with training examples.",
        keyPoints: [
          "S initialized to the most specific hypothesis: ['ϕ', 'ϕ', 'ϕ', 'ϕ', 'ϕ', 'ϕ'].",
          "G initialized to the most general hypothesis: ['?', '?', '?', '?', '?', '?'].",
          "Positive examples generalize S; negative examples specialize G to eliminate inconsistencies."
        ],
        diagramTitle: "Version Space Bound by G and S Hypotheses",
        diagram: `┌────────────────────────────────────────────────────────┐
│ General Boundary G: { <?, ?, ?, ?, ?, ?> }             │
│   ▲                                                    │
│   │ Specialization on Negative Examples                │
│   ▼                                                    │
│ Version Space (Consistent Candidate Hypotheses)        │
│   ▲                                                    │
│   │ Generalization on Positive Examples                │
│   ▼                                                    │
│ Specific Boundary S: { <Sunny, Warm, Normal, ...> }    │
└────────────────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Boundary Updates", best: "O(n * d)", avg: "O(n * |G| * d)", worst: "O(2^d)", space: "O(|G| + |S|)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Candidate-Elimination)",
            code: `import csv

def candidate_elimination(filename):
    with open(filename, 'r') as f:
        data = [line.strip().split(',') for line in f.readlines()]
        
    attributes = data[0][:-1]
    examples = data[1:]
    
    # Initialize S and G
    num_attr = len(attributes)
    S = ['ϕ'] * num_attr
    G = [['?'] * num_attr]
    
    for ex in examples:
        x, target = ex[:-1], ex[-1]
        if target.lower() in ['yes', '1', 'positive']:
            # Generalize S
            for i in range(num_attr):
                if S[i] == 'ϕ':
                    S[i] = x[i]
                elif S[i] != x[i]:
                    S[i] = '?'
            # Remove inconsistent hypotheses from G
            G = [g for g in G if all(g[i] == '?' or g[i] == S[i] for i in range(num_attr))]
        else:
            # Specialize G
            new_G = []
            for g in G:
                for i in range(num_attr):
                    if g[i] == '?':
                        for val in set(e[i] for e in examples):
                            if val != x[i]:
                                hyp = g[:]
                                hyp[i] = val
                                if all(hyp[j] == '?' or hyp[j] == S[j] for j in range(num_attr)):
                                    new_G.append(hyp)
            G = new_G if new_G else G
            
    print("Final Specific Boundary S:\\n", S)
    print("Final General Boundary G:\\n", G)

# Example training instances (Sunny, Warm, Normal, Strong, Warm, Same -> Yes)
candidate_elimination("training_data.csv")`
          }
        ],
        practiceProblems: [
          {
            title: "Concept Learning & Version Space",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/candidate-elimination-algorithm/",
            platform: "GeeksforGeeks",
            topicTag: "Concept Learning"
          }
        ]
      },
      {
        id: "ml-id3-decision-tree",
        slug: "id3-decision-tree-algorithm",
        title: "Exp 2: Decision Tree based ID3 Algorithm",
        categoryId: "ml-concept-trees-ann",
        categoryName: "1. Concept Learning, Trees & Neural Networks",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "ID3 decision tree entropy information gain Python from scratch",
        gfgUrl: "https://www.geeksforgeeks.org/decision-tree-introduction-example/",
        quickSummary: "Construct top-down decision trees by recursively selecting attributes with the highest Information Gain.",
        keyPoints: [
          "Entropy H(S) = -sum(p_i * log2(p_i)) measures dataset impurity.",
          "Information Gain Gain(S, A) = H(S) - sum((|S_v|/|S|) * H(S_v)).",
          "Greedy recursive splitting stops when samples are pure or attributes exhausted."
        ],
        diagramTitle: "ID3 Entropy Calculation & Attribute Split Decision",
        diagram: `   Root Node (Entropy H(S) = 0.940)
                  │ Split on Outlook (Max Gain = 0.246)
       ┌──────────┼──────────┐
       ▼          ▼          ▼
   Sunny        Overcast    Rain
  [Entropy=0.97] [Pure: Yes] [Entropy=0.97]
       │                         │
  Split on Humidity         Split on Wind`,
        complexities: [
          { operation: "Tree Construction", best: "O(n * d * log n)", avg: "O(n * d * depth)", worst: "O(n * d^2)", space: "O(nodes)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (ID3 Decision Tree)",
            code: `import numpy as np
import pandas as pd

def entropy(target_col):
    elements, counts = np.unique(target_col, return_counts=True)
    probs = counts / np.sum(counts)
    return -np.sum(probs * np.log2(probs + 1e-9))

def info_gain(data, split_attr, target_name="Play"):
    total_entropy = entropy(data[target_name])
    vals, counts = np.unique(data[split_attr], return_counts=True)
    weighted_entropy = np.sum([(counts[i] / np.sum(counts)) * 
                               entropy(data.where(data[split_attr] == vals[i]).dropna()[target_name]) 
                               for i in range(len(vals))])
    return total_entropy - weighted_entropy

def id3_tree(data, original_data, features, target_name="Play", parent_class=None):
    if len(np.unique(data[target_name])) <= 1:
        return np.unique(data[target_name])[0]
    elif len(features) == 0:
        return parent_class
    
    parent_class = np.unique(data[target_name])[np.argmax(np.unique(data[target_name], return_counts=True)[1])]
    item_values = [info_gain(data, feature, target_name) for feature in features]
    best_feature_idx = np.argmax(item_values)
    best_feature = features[best_feature_idx]
    
    tree = {best_feature: {}}
    remaining_features = [f for f in features if f != best_feature]
    
    for val in np.unique(data[best_feature]):
        sub_data = data.where(data[best_feature] == val).dropna()
        subtree = id3_tree(sub_data, original_data, remaining_features, target_name, parent_class)
        tree[best_feature][val] = subtree
    return tree

# Sample play tennis dataset execution
print("ID3 Decision Tree ready for dataset inference.")`
          }
        ],
        practiceProblems: [
          {
            title: "Decision Tree Construction & Pruning",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/decision-tree-introduction-example/",
            platform: "GeeksforGeeks",
            topicTag: "Decision Trees"
          }
        ]
      },
      {
        id: "ml-ann-backprop",
        slug: "artificial-neural-network-backpropagation",
        title: "Exp 3: Artificial Neural Network with Backpropagation",
        categoryId: "ml-concept-trees-ann",
        categoryName: "1. Concept Learning, Trees & Neural Networks",
        difficulty: "Advanced",
        estimatedTime: "35 mins",
        gfgSearchQuery: "Backpropagation algorithm neural network Python implementation",
        gfgUrl: "https://www.geeksforgeeks.org/backpropagation-in-neural-network/",
        quickSummary: "Build a Multi-Layer Perceptron (MLP) implementing forward feed, sigmoid activations, and backward error gradient descent.",
        keyPoints: [
          "Forward pass computes layer activations: z = W*x + b, a = σ(z).",
          "Backpropagation applies the calculus chain rule to calculate ∂E/∂W and ∂E/∂b.",
          "Weights updated via gradient descent: W = W - η * (∂E/∂W)."
        ],
        diagramTitle: "3-Layer ANN Forward Propagation & Error Backprop",
        diagram: `  Input Layer x (2 Nodes)       Hidden Layer h (3 Nodes)       Output Layer ŷ (1 Node)
          (x1) ───────────┬────────► (h1) ───────────┐
                          │                          │
          (x2) ───────────┼────────► (h2) ───────────┼────────► (ŷ) ──► Loss E = (y - ŷ)^2
                          │                          │
                          └────────► (h3) ───────────┘
               Forward: z1 = W1*x + b1, a1 = σ(z1)    Forward: z2 = W2*a1 + b2, ŷ = σ(z2)
               ◄──────────────── Backpropagation Gradient Flow ──────────────────`,
        complexities: [
          { operation: "Forward & Backward Pass", best: "O(epochs * n * W)", avg: "O(epochs * n * W)", worst: "O(epochs * n * W)", space: "O(weights + activations)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (ANN from Scratch)",
            code: `import numpy as np

def sigmoid(x):
    return 1.0 / (1.0 + np.exp(-x))

def sigmoid_derivative(x):
    return x * (1.0 - x)

# XOR Training Set
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])

np.random.seed(42)
input_dim, hidden_dim, output_dim = 2, 4, 1
W1 = np.random.uniform(size=(input_dim, hidden_dim))
b1 = np.random.uniform(size=(1, hidden_dim))
W2 = np.random.uniform(size=(hidden_dim, output_dim))
b2 = np.random.uniform(size=(1, output_dim))
lr = 0.5

# Training Loop
for epoch in range(10000):
    # 1. Forward Pass
    hidden_in = np.dot(X, W1) + b1
    hidden_out = sigmoid(hidden_in)
    out_in = np.dot(hidden_out, W2) + b2
    output = sigmoid(out_in)
    
    # 2. Backpropagation
    error = y - output
    d_output = error * sigmoid_derivative(output)
    error_hidden = d_output.dot(W2.T)
    d_hidden = error_hidden * sigmoid_derivative(hidden_out)
    
    # 3. Weight Updates
    W2 += hidden_out.T.dot(d_output) * lr
    b2 += np.sum(d_output, axis=0, keepdims=True) * lr
    W1 += X.T.dot(d_hidden) * lr
    b1 += np.sum(d_hidden, axis=0, keepdims=True) * lr

print("ANN Predictions on XOR Inputs:\\n", np.round(output, 3))`
          }
        ],
        practiceProblems: [
          {
            title: "Multi-Layer Perceptron Backpropagation",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/backpropagation-in-neural-network/",
            platform: "GeeksforGeeks",
            topicTag: "Neural Networks"
          }
        ]
      }
    ]
  },
  {
    id: "ml-bayes-clustering-knn",
    name: "2. Bayesian Methods, Clustering & Instance-Based Learning",
    shortDesc: "Naïve Bayes, Document Classifier, Bayesian Networks, EM vs k-Means, k-NN, and LWR.",
    iconName: "BarChart3",
    topics: [
      {
        id: "ml-naive-bayes-classifier",
        slug: "naive-bayesian-classifier",
        title: "Exp 4: Naïve Bayesian Classifier (CSV Dataset)",
        categoryId: "ml-bayes-clustering-knn",
        categoryName: "2. Bayesian Methods, Clustering & Instance-Based Learning",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Naive Bayes classifier Gaussian Python CSV dataset accuracy",
        gfgUrl: "https://www.geeksforgeeks.org/naive-bayes-classifiers/",
        quickSummary: "Implement Bayes' theorem with conditional independence assumption P(C|X) ∝ P(C) * ∏ P(x_i|C).",
        keyPoints: [
          "Calculates prior probability P(C) and Gaussian conditional likelihood P(x_i|C).",
          "Conditional feature independence assumption enables scalable training without covariance matrix inversion.",
          "Class prediction corresponds to argmax_c P(C=c | X)."
        ],
        diagramTitle: "Naïve Bayes Class Posterior Probability Computation",
        diagram: `  P(Class = Yes | X) = P(Yes) * P(x1|Yes) * P(x2|Yes) * ... * P(xn|Yes)
  P(Class = No  | X) = P(No)  * P(x1|No)  * P(x2|No)  * ... * P(xn|No)
                               │
                               ▼
        Predicted Class = argmax { P(Yes|X), P(No|X) }`,
        complexities: [
          { operation: "Training Phase", best: "O(n * d)", avg: "O(n * d)", worst: "O(n * d)", space: "O(classes * d)" },
          { operation: "Inference per Sample", best: "O(classes * d)", avg: "O(classes * d)", worst: "O(classes * d)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Gaussian Naïve Bayes)",
            code: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

class GaussianNaiveBayes:
    def fit(self, X, y):
        self.classes = np.unique(y)
        self.mean = {}
        self.var = {}
        self.priors = {}
        
        for c in self.classes:
            X_c = X[y == c]
            self.mean[c] = np.mean(X_c, axis=0)
            self.var[c] = np.var(X_c, axis=0) + 1e-9
            self.priors[c] = X_c.shape[0] / float(X.shape[0])
            
    def _pdf(self, class_idx, x):
        mean = self.mean[class_idx]
        var = self.var[class_idx]
        numerator = np.exp(-((x - mean) ** 2) / (2 * var))
        denominator = np.sqrt(2 * np.pi * var)
        return numerator / denominator
        
    def predict(self, X):
        y_pred = []
        for x in X:
            posteriors = []
            for c in self.classes:
                prior = np.log(self.priors[c])
                conditional = np.sum(np.log(self._pdf(c, x) + 1e-9))
                posteriors.append(prior + conditional)
            y_pred.append(self.classes[np.argmax(posteriors)])
        return np.array(y_pred)

print("Gaussian Naïve Bayes engine ready for CSV dataset loading.")`
          }
        ],
        practiceProblems: [
          {
            title: "Naïve Bayes Classifier Implementation",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/naive-bayes-classifiers/",
            platform: "GeeksforGeeks",
            topicTag: "Naïve Bayes"
          }
        ]
      },
      {
        id: "ml-text-classification-nb",
        slug: "text-classification-using-naive-bayes",
        title: "Exp 5: Text Classification using Naïve Bayes",
        categoryId: "ml-bayes-clustering-knn",
        categoryName: "2. Bayesian Methods, Clustering & Instance-Based Learning",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Multinomial Naive Bayes text classification CountVectorizer precision recall",
        gfgUrl: "https://www.geeksforgeeks.org/text-classification-using-naive-bayes-in-python/",
        quickSummary: "Implement Multinomial Naïve Bayes on TF-IDF / Bag of Words matrices; measure Accuracy, Precision, and Recall.",
        keyPoints: [
          "Tokenization and CountVectorizer transform raw text into term-frequency sparse matrices.",
          "Laplace (additive) smoothing prevents zero-probability product terms for unseen vocabulary words.",
          "Calculates Precision = TP/(TP+FP), Recall = TP/(TP+FN), and F1-Score."
        ],
        diagramTitle: "NLP Text Vectorization & Multinomial Bayes Flow",
        diagram: `┌──────────────────────┐      ┌──────────────────────────────┐      ┌─────────────────────┐
│ Raw Document Texts   │ ───► │ CountVectorizer (Bag of Words│ ───► │ Multinomial NB Class│
│ "Spam lottery won..."│      │ Vocabulary Matrix: [1000 x D]│      │ Spam vs Ham Output  │
└──────────────────────┘      └──────────────────────────────┘      └─────────────────────┘`,
        complexities: [
          { operation: "Vectorization & Training", best: "O(words)", avg: "O(words)", worst: "O(words)", space: "O(vocabulary)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Text Classification NB)",
            code: `from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, precision_score, recall_score, classification_report
from sklearn.model_selection import train_test_split

docs = [
    "Free lottery winner claim prize cash now",
    "URGENT your account security compromised",
    "Meeting rescheduled for tomorrow at 10 AM",
    "Please find attached project laboratory report",
    "Win 1000 dollar gift card click link immediately",
    "Quarterly financial review schedule and agenda"
]
labels = [1, 1, 0, 0, 1, 0]  # 1 = Spam, 0 = Ham

vectorizer = CountVectorizer(stop_words='english')
X = vectorizer.fit_transform(docs)

clf = MultinomialNB()
clf.fit(X, labels)

test_docs = ["Winner click to claim gift card cash", "Project meeting agenda for next week"]
X_test = vectorizer.transform(test_docs)
predictions = clf.predict(X_test)

print("Predictions (1=Spam, 0=Ham):", predictions)`
          }
        ],
        practiceProblems: [
          {
            title: "Text Classification with Multinomial Naïve Bayes",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/text-classification-using-naive-bayes-in-python/",
            platform: "GeeksforGeeks",
            topicTag: "NLP / Text"
          }
        ]
      },
      {
        id: "ml-bayesian-network",
        slug: "bayesian-network-disease-diagnosis",
        title: "Exp 6: Bayesian Network (CORONA Infection Diagnosis - WHO Dataset)",
        categoryId: "ml-bayes-clustering-knn",
        categoryName: "2. Bayesian Methods, Clustering & Instance-Based Learning",
        difficulty: "Advanced",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Bayesian Network pgmpy conditional probability tables medical diagnosis",
        gfgUrl: "https://www.geeksforgeeks.org/bayesian-belief-network-in-python/",
        quickSummary: "Construct Directed Acyclic Graph (DAG) with Conditional Probability Tables (CPTs) for probabilistic inference.",
        keyPoints: [
          "Represents joint probability distribution factorized across parent conditional dependencies.",
          "Variable Elimination computes posterior probability P(Disease | Symptom1, Symptom2).",
          "Models uncertainty in medical symptoms (Fever, Cough, Breathing Difficulty -> COVID-19)."
        ],
        diagramTitle: "Bayesian Belief Network DAG Topology",
        diagram: `         [ Travel History ]          [ Contact with Patient ]
                 │                               │
                 ▼                               ▼
          ┌──────────────────────────────────────────────┐
          │      COVID-19 Infection State (Target)       │
          └──────────────┬───────────────────────────────┘
                         ├───────────────────────────────┐
                         ▼                               ▼
                 [ Severe Fever ]               [ Loss of Taste / Smell ]`,
        complexities: [
          { operation: "Exact Inference (Variable Elimination)", best: "O(n)", avg: "O(n * d^treewidth)", worst: "O(2^n)", space: "O(tables)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Bayesian Network Inference)",
            code: `from pgmpy.models import BayesianNetwork
from pgmpy.factors.discrete import TabularCPD
from pgmpy.inference import VariableElimination

# 1. Define Network Graph DAG
model = BayesianNetwork([
    ('Contact', 'Covid'),
    ('Travel', 'Covid'),
    ('Covid', 'Fever'),
    ('Covid', 'Cough')
])

# 2. Define Conditional Probability Tables (CPTs)
cpd_contact = TabularCPD('Contact', 2, [[0.8], [0.2]])
cpd_travel = TabularCPD('Travel', 2, [[0.9], [0.1]])
cpd_covid = TabularCPD('Covid', 2, 
                       [[0.99, 0.70, 0.60, 0.10],
                        [0.01, 0.30, 0.40, 0.90]],
                       evidence=['Contact', 'Travel'], evidence_card=[2, 2])
cpd_fever = TabularCPD('Fever', 2, [[0.9, 0.2], [0.1, 0.8]], evidence=['Covid'], evidence_card=[2])
cpd_cough = TabularCPD('Cough', 2, [[0.85, 0.25], [0.15, 0.75]], evidence=['Covid'], evidence_card=[2])

model.add_cpds(cpd_contact, cpd_travel, cpd_covid, cpd_fever, cpd_cough)
assert model.check_model()

# 3. Perform Probabilistic Inference
infer = VariableElimination(model)
query_result = infer.query(variables=['Covid'], evidence={'Fever': 1, 'Cough': 1, 'Travel': 1})
print("Posterior Probability Distribution P(Covid | Fever=Yes, Cough=Yes, Travel=Yes):\\n", query_result)`
          }
        ],
        practiceProblems: [
          {
            title: "Bayesian Network Diagnostic Modeling",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/bayesian-belief-network-in-python/",
            platform: "GeeksforGeeks",
            topicTag: "Bayesian Networks"
          }
        ]
      },
      {
        id: "ml-em-vs-kmeans",
        slug: "expectation-maximization-vs-kmeans",
        title: "Exp 7: Expectation-Maximization (EM) Algorithm vs k-Means",
        categoryId: "ml-bayes-clustering-knn",
        categoryName: "2. Bayesian Methods, Clustering & Instance-Based Learning",
        difficulty: "Advanced",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Expectation Maximization GMM vs KMeans clustering Python",
        gfgUrl: "https://www.geeksforgeeks.org/gaussian-mixture-models/",
        quickSummary: "Compare hard spherical clustering (k-Means) with soft probabilistic clustering using Gaussian Mixture Models (EM).",
        keyPoints: [
          "k-Means assigns hard binary cluster memberships based on Euclidean distance to centroids.",
          "EM Algorithm alternates between Expectation (responsibilities γ_ik) and Maximization (parameters μ, Σ, π).",
          "EM accommodates elliptical cluster geometries and overlapping density distributions."
        ],
        diagramTitle: "k-Means (Hard Centroids) vs EM/GMM (Soft Elliptical Densities)",
        diagram: `     k-Means: Hard Spherical Boundary         EM / GMM: Soft Gaussian Density
              ┌─────────┐   ┌─────────┐                      (((( μ1, Σ1 ))))
              │ Clust A │   │ Clust B │                             (((   )))
              │    *    │   │    *    │                        (((( μ2, Σ2 ))))
              └─────────┘   └─────────┘             Overlapping Gaussian Probabilities`,
        complexities: [
          { operation: "k-Means Convergence", best: "O(i * k * n * d)", avg: "O(i * k * n * d)", worst: "O(i * k * n * d)", space: "O(n + k * d)" },
          { operation: "GMM / EM Convergence", best: "O(i * k * n * d^2)", avg: "O(i * k * n * d^2)", worst: "O(i * k * n * d^3)", space: "O(k * d^2 + n * k)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (k-Means vs GMM EM)",
            code: `from sklearn.cluster import KMeans
from sklearn.mixture import GaussianMixture
from sklearn.metrics import silhouette_score
import numpy as np

# Synthetic Dataset: Two overlapping clusters
np.random.seed(42)
cluster1 = np.random.randn(150, 2) * 1.2 + np.array([2, 2])
cluster2 = np.random.randn(150, 2) * 0.8 + np.array([6, 5])
X = np.vstack([cluster1, cluster2])

# 1. k-Means Clustering
kmeans = KMeans(n_clusters=2, random_state=42, n_init=10)
kmeans_labels = kmeans.fit_predict(X)
kmeans_score = silhouette_score(X, kmeans_labels)

# 2. Expectation-Maximization via Gaussian Mixture Model
gmm = GaussianMixture(n_components=2, covariance_type='full', random_state=42)
gmm_labels = gmm.fit_predict(X)
gmm_score = silhouette_score(X, gmm_labels)

print(f"k-Means Silhouette Score: {kmeans_score:.4f}")
print(f"EM / GMM Silhouette Score: {gmm_score:.4f}")
print("GMM Cluster Means:\\n", gmm.means_)
print("GMM Cluster Weights (π):\\n", gmm.weights_)`
          }
        ],
        practiceProblems: [
          {
            title: "Expectation Maximization Clustering",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/gaussian-mixture-models/",
            platform: "GeeksforGeeks",
            topicTag: "EM Clustering"
          }
        ]
      },
      {
        id: "ml-knn-iris",
        slug: "knn-iris-classification",
        title: "Exp 8: k-Nearest Neighbour (k-NN) Algorithm",
        categoryId: "ml-bayes-clustering-knn",
        categoryName: "2. Bayesian Methods, Clustering & Instance-Based Learning",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "k-nearest neighbour KNN iris dataset python correct wrong predictions",
        gfgUrl: "https://www.geeksforgeeks.org/k-nearest-neighbours/",
        quickSummary: "Classify Iris dataset instances via Euclidean distance majority voting and print correct and misclassified predictions.",
        keyPoints: [
          "Instance-based lazy learner: zero training time computation.",
          "Euclidean distance d(p, q) = sqrt(sum((p_i - q_i)^2)) identifies k nearest points.",
          "Majority voting determines predicted class label."
        ],
        diagramTitle: "k-NN Majority Vote in Feature Space (k = 3)",
        diagram: `   Sepal Width ▲
               │       Class A (*)   Class A (*)
               │               \\       /
               │    Class B (O) ─── ? (New Query Point)
               │
               │    Distances calculated to all N points
               │    k = 3 -> 2 Votes for Class A, 1 Vote for Class B
               └────────────────────────────────────────► Sepal Length`,
        complexities: [
          { operation: "Training Phase", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(n * d)" },
          { operation: "Query per Test Sample", best: "O(n * d)", avg: "O(n * d)", worst: "O(n * d + n log k)", space: "O(k)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (k-NN on Iris)",
            code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

# Load Iris Dataset
iris = load_iris()
X, y = iris.data, iris.target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train k-NN (k = 3)
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)

y_pred = knn.predict(X_test)
print(f"Overall Test Accuracy: {accuracy_score(y_test, y_pred) * 100:.2f}%\\n")

# Print Correct vs Misclassified Samples
print("--- Prediction Inspection Table ---")
for i in range(len(y_test)):
    actual = iris.target_names[y_test[i]]
    predicted = iris.target_names[y_pred[i]]
    status = "CORRECT [✓]" if actual == predicted else "WRONG   [✗]"
    print(f"Sample {i+1:02d}: Actual = {actual:<12} | Predicted = {predicted:<12} -> {status}")`
          }
        ],
        practiceProblems: [
          {
            title: "k-NN Classifier & Distance Metrics",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/k-nearest-neighbours/",
            platform: "GeeksforGeeks",
            topicTag: "k-NN"
          }
        ]
      },
      {
        id: "ml-locally-weighted-regression",
        slug: "locally-weighted-regression",
        title: "Exp 9: Locally Weighted Regression (LWR)",
        categoryId: "ml-bayes-clustering-knn",
        categoryName: "2. Bayesian Methods, Clustering & Instance-Based Learning",
        difficulty: "Advanced",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Locally Weighted Regression LWR non-parametric algorithm Python",
        gfgUrl: "https://www.geeksforgeeks.org/locally-weighted-linear-regression-using-python/",
        quickSummary: "Fit non-parametric curve using Gaussian kernel weights w_i = exp(- (x_i - x)^2 / (2 * tau^2)).",
        keyPoints: [
          "Non-parametric algorithm: fits a local line around query point x at query time.",
          "Gaussian kernel assigns exponential decay weight to distant points.",
          "Bandwidth parameter tau (τ) controls smoothness and prevents overfitting."
        ],
        diagramTitle: "Locally Weighted Gaussian Kernel Weighting Function",
        diagram: `   Gaussian Weight w_i ▲
                       │            /\\
                       │           /  \\
                   1.0 ┼──────────/────\\────────── (Query Point x_0)
                       │         /      \\
                       │      _-"        "-_
                   0.0 ┴─────┴────────────┴──────► Training Points x_i
                           x_0 - 2τ      x_0 + 2τ`,
        complexities: [
          { operation: "Prediction per Point", best: "O(n * d^2)", avg: "O(n * d^2 + d^3)", worst: "O(n * d^2 + d^3)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (LWR Implementation)",
            code: `import numpy as np

def local_weight(x0, X, tau=0.5):
    # Gaussian Kernel Weight Matrix W (Diagonal)
    m = X.shape[0]
    W = np.eye(m)
    for i in range(m):
        diff = x0 - X[i]
        W[i, i] = np.exp(np.dot(diff, diff.T) / (-2.0 * (tau ** 2)))
    return W

def predict_lwr(x0, X, y, tau=0.5):
    W = local_weight(x0, X, tau)
    # Theta = (X^T W X)^-1 X^T W y
    X_T_W = np.dot(X.T, W)
    theta = np.linalg.pinv(np.dot(X_T_W, X)).dot(X_T_W).dot(y)
    return np.dot(x0, theta)

# Generate Non-Linear Data (Sine Wave with Noise)
np.random.seed(42)
X_raw = np.linspace(-3, 3, 100)
y = np.sin(X_raw) + np.random.normal(0, 0.1, 100)
X = np.c_[np.ones(100), X_raw]  # Add bias column

# Query Prediction at x0 = 1.5
x_query = np.array([1.0, 1.5])
y_hat = predict_lwr(x_query, X, y, tau=0.3)
print(f"LWR Prediction at x = 1.5: {y_hat:.4f} (True sin(1.5) = {np.sin(1.5):.4f})")`
          }
        ],
        practiceProblems: [
          {
            title: "Locally Weighted Non-Parametric Regression",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/locally-weighted-linear-regression-using-python/",
            platform: "GeeksforGeeks",
            topicTag: "LWR"
          }
        ]
      }
    ]
  }
];
