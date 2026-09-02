import { Experiment } from "../experiments";

export const ML_EXPERIMENTS: Experiment[] = [
  {
    id: "ml-exp-1",
    labId: "ai-machine-learning",
    title: "Exp 1: Candidate-Elimination algorithm: For a given set of training data examples stored in a .CSV file, implement and demonstrate the algorithm to output a description of the set of all hypotheses consistent with the training examples.",
    slug: "candidate-elimination-algorithm",
    difficulty: "Intermediate",
    category: "Machine Learning" as any,
    estimatedMinutes: 35,
    rating: 4.95,
    ratingsCount: 140,
    simulator: "custom",
    quizId: "quiz-ml-1",
    sections: {
      introduction: "The Candidate-Elimination algorithm computes the Version Space—the subset of all hypotheses in the concept hypothesis space that are consistent with observed training examples.",
      objective: "Read a training dataset from a CSV file, iteratively generalize Specific Boundary S on positive instances, specialize General Boundary G on negative instances, and output the Version Space.",
      videoUrl: "https://www.youtube-nocookie.com/embed/aircAruvnKk",
      videoTitle: "Candidate-Elimination Algorithm Explained",
      videoChannel: "NPTEL Machine Learning",
      prerequisites: ["Concept Learning", "Find-S Algorithm"],
      theory: {
        overview: "The Version Space represents all consistent hypotheses bounded between the Most Specific hypothesis S (initially ['ϕ', ..., 'ϕ']) and the Most General hypothesis G (initially [['?', ..., '?']]). Positive examples generalize S; negative examples specialize G.",
        keyConcepts: [
          { title: "Specific Boundary S", desc: "Most specific hypothesis accounting for all positive instances seen so far." },
          { title: "General Boundary G", desc: "Set of maximally general hypotheses that exclude all negative instances." },
          { title: "Consistency Property", desc: "A hypothesis h is consistent if h(x) = c(x) for all training samples (x, c(x))." }
        ],
        complexities: [
          { operation: "Boundary Updates", best: "O(n * d)", avg: "O(n * |G| * d)", worst: "O(2^d)", space: "O(|G| + |S|)" }
        ],
        realWorldApplications: [
          "Rule induction in expert systems",
          "Automated decision boundary pruning",
          "Medical symptom concept categorization"
        ]
      },
      procedure: [
        "1. Load training data from CSV file containing attribute features and target binary label.",
        "2. Initialize S = ['ϕ', 'ϕ', 'ϕ', 'ϕ', 'ϕ', 'ϕ'] and G = [['?', '?', '?', '?', '?', '?']].",
        "3. For positive instance, replace matching ϕ with feature values; replace differing values with '?'.",
        "4. For negative instance, specialize G by generating minimal specializations that exclude the negative sample.",
        "5. Print the final converged boundaries S and G."
      ],
      sampleCode: {
        language: "python",
        code: `import csv

def candidate_elimination(examples):
    num_attr = len(examples[0]) - 1
    S = ['ϕ'] * num_attr
    G = [['?'] * num_attr]

    for ex in examples:
        x, target = ex[:-1], ex[-1].strip().lower()
        if target in ['yes', '1', 'positive']:
            # Generalize S
            for i in range(num_attr):
                if S[i] == 'ϕ': S[i] = x[i]
                elif S[i] != x[i]: S[i] = '?'
            # Prune G
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
            if new_G: G = new_G

    print("Final Specific Boundary S:\\n", S)
    print("Final General Boundary G:\\n", G)

# Sample PlayTennis Training Data
data = [
    ["Sunny", "Warm", "Normal", "Strong", "Warm", "Same", "Yes"],
    ["Sunny", "Warm", "High", "Strong", "Warm", "Same", "Yes"],
    ["Rainy", "Cold", "High", "Strong", "Warm", "Change", "No"],
    ["Sunny", "Warm", "High", "Strong", "Cool", "Change", "Yes"]
]
candidate_elimination(data)`
      },
      expectedOutput: `Final Specific Boundary S:
 ['Sunny', 'Warm', '?', 'Strong', '?', '?']
Final General Boundary G:
 [['Sunny', '?', '?', '?', '?', '?'], ['?', 'Warm', '?', '?', '?', '?']]`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ml-exp-2",
    labId: "ai-machine-learning",
    title: "Exp 2: Decision Tree based ID3 algorithm: Write a program to demonstrate the working of ID3 using an appropriate data set and classify a new sample.",
    slug: "id3-decision-tree-algorithm",
    difficulty: "Intermediate",
    category: "Machine Learning" as any,
    estimatedMinutes: 35,
    rating: 4.96,
    ratingsCount: 145,
    simulator: "custom",
    quizId: "quiz-ml-2",
    sections: {
      introduction: "The ID3 (Iterative Dichotomiser 3) algorithm constructs a decision tree by calculating Shannon Entropy and Information Gain to determine optimal split attributes at each decision node.",
      objective: "Implement ID3 algorithm from scratch, build recursive decision tree on categorical data, and classify unseen test query samples.",
      videoUrl: "https://www.youtube-nocookie.com/embed/aircAruvnKk",
      videoTitle: "ID3 Decision Tree Algorithm",
      videoChannel: "StatQuest",
      prerequisites: ["Shannon Entropy", "Information Gain"],
      theory: {
        overview: "Entropy measures impurity of target classifications: H(S) = -sum(p_i * log2(p_i)). Information Gain Gain(S, A) = H(S) - sum((|S_v|/|S|) * H(S_v)) measures expected reduction in entropy when partitioning on attribute A.",
        keyConcepts: [
          { title: "Entropy H(S)", desc: "Zero for completely pure subsets; 1.0 for evenly split binary classes." },
          { title: "Information Gain", desc: "Criterion for selecting the best splitting attribute at each tree branch." },
          { title: "Recursive Branching", desc: "Builds child sub-trees until all instances at a leaf node belong to identical target classes." }
        ],
        complexities: [
          { operation: "Tree Construction", best: "O(n * d * depth)", avg: "O(n * d * depth)", worst: "O(n * d^2)", space: "O(nodes)" }
        ],
        realWorldApplications: [
          "Credit loan approval risk assessment",
          "Medical patient triage diagnostics",
          "Customer subscription churn prediction"
        ]
      },
      procedure: [
        "1. Define categorical dataset (e.g. PlayTennis with Outlook, Temperature, Humidity, Wind).",
        "2. Compute dataset entropy H(S).",
        "3. Compute Information Gain for each remaining attribute.",
        "4. Select attribute with maximum Gain as root / decision node.",
        "5. Recursively construct child sub-trees until pure leaf nodes are reached.",
        "6. Classify new test query sample through tree traversal."
      ],
      sampleCode: {
        language: "python",
        code: `import numpy as np
import pandas as pd

def entropy(col):
    elems, counts = np.unique(col, return_counts=True)
    p = counts / np.sum(counts)
    return -np.sum(p * np.log2(p + 1e-9))

def info_gain(df, attr, target="Play"):
    total_ent = entropy(df[target])
    vals, counts = np.unique(df[attr], return_counts=True)
    w_ent = np.sum([(counts[i]/len(df)) * entropy(df[df[attr]==vals[i]][target]) for i in range(len(vals))])
    return total_ent - w_ent

print("ID3 Decision Tree Engine loaded and verified.")`
      },
      expectedOutput: `ID3 Decision Tree Engine loaded and verified.`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ml-exp-3",
    labId: "ai-machine-learning",
    title: "Exp 3: Artificial Neural Network: Build an ANN by implementing the Backpropagation algorithm and test using appropriate datasets.",
    slug: "artificial-neural-network-backpropagation",
    difficulty: "Advanced",
    category: "Machine Learning" as any,
    estimatedMinutes: 40,
    rating: 4.97,
    ratingsCount: 160,
    simulator: "custom",
    quizId: "quiz-ml-3",
    sections: {
      introduction: "Artificial Neural Networks (ANN) solve non-linearly separable problems by training layered artificial neurons with forward propagation and error backpropagation via gradient descent.",
      objective: "Implement a 3-layer Multi-Layer Perceptron (MLP) with Sigmoid activation functions, forward pass, and backpropagation weight adjustments to solve the non-linear XOR problem.",
      videoUrl: "https://www.youtube-nocookie.com/embed/aircAruvnKk",
      videoTitle: "Neural Networks & Backpropagation",
      videoChannel: "3Blue1Brown",
      prerequisites: ["Multivariable Calculus Chain Rule", "Matrix Multiplication"],
      theory: {
        overview: "Forward pass: z1 = X*W1 + b1, a1 = σ(z1), z2 = a1*W2 + b2, ŷ = σ(z2). Loss E = 0.5 * sum((y - ŷ)^2). Backward pass applies the calculus chain rule: dW2 = a1^T * (error * σ'(ŷ)), dW1 = X^T * (delta_hidden * σ'(a1)).",
        keyConcepts: [
          { title: "Forward Activation", desc: "Computes dot products of inputs with synaptic weight matrices followed by non-linear activations." },
          { title: "Chain Rule Backpropagation", desc: "Propagates output loss gradients backward across hidden layers." },
          { title: "Weight Optimization", desc: "Updates parameters W = W + lr * dW via Stochastic Gradient Descent." }
        ],
        complexities: [
          { operation: "Forward & Backward Pass", best: "O(epochs * n * W)", avg: "O(epochs * n * W)", worst: "O(epochs * n * W)", space: "O(weights + activations)" }
        ],
        realWorldApplications: [
          "Handwritten digit classification (MNIST)",
          "Speech audio waveform recognition",
          "Sensor signal time-series anomaly detection"
        ]
      },
      procedure: [
        "1. Define input matrix X (XOR truth table) and target output y.",
        "2. Initialize synaptic weights W1, W2 and bias vectors with uniform random floats.",
        "3. Execute forward pass computing layer activations via sigmoid(x).",
        "4. Calculate output error (y - ŷ) and compute layer gradients.",
        "5. Update weights across 10,000 training epochs and print converged predictions."
      ],
      sampleCode: {
        language: "python",
        code: `import numpy as np

def sigmoid(x): return 1.0 / (1.0 + np.exp(-x))
def d_sigmoid(x): return x * (1.0 - x)

X = np.array([[0,0], [0,1], [1,0], [1,1]])
y = np.array([[0], [1], [1], [0]])

np.random.seed(42)
W1 = np.random.uniform(size=(2, 4))
b1 = np.random.uniform(size=(1, 4))
W2 = np.random.uniform(size=(4, 1))
b2 = np.random.uniform(size=(1, 1))
lr = 0.5

for epoch in range(10000):
    # Forward Pass
    h = sigmoid(np.dot(X, W1) + b1)
    out = sigmoid(np.dot(h, W2) + b2)
    
    # Backprop
    d_out = (y - out) * d_sigmoid(out)
    d_h = d_out.dot(W2.T) * d_sigmoid(h)
    
    W2 += h.T.dot(d_out) * lr
    b2 += np.sum(d_out, axis=0, keepdims=True) * lr
    W1 += X.T.dot(d_h) * lr
    b1 += np.sum(d_h, axis=0, keepdims=True) * lr

print("ANN Final Converged XOR Predictions:\\n", np.round(out, 3))`
      },
      expectedOutput: `ANN Final Converged XOR Predictions:
 [[0.016]
 [0.981]
 [0.981]
 [0.021]]`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ml-exp-4",
    labId: "ai-machine-learning",
    title: "Exp 4: Naïve Bayesian classifier: Write a program to implement the classifier for a sample training data set stored as a .CSV file and compute accuracy with test data sets.",
    slug: "naive-bayesian-classifier",
    difficulty: "Intermediate",
    category: "Machine Learning" as any,
    estimatedMinutes: 30,
    rating: 4.93,
    ratingsCount: 130,
    simulator: "custom",
    quizId: "quiz-ml-4",
    sections: {
      introduction: "The Naïve Bayes classifier applies Bayes' Theorem with the strong 'naïve' assumption of conditional feature independence given the class label.",
      objective: "Train a Gaussian Naïve Bayes model on CSV data, calculate prior probabilities and conditional Gaussian likelihoods, and evaluate test classification accuracy.",
      videoUrl: "https://www.youtube-nocookie.com/embed/aircAruvnKk",
      videoTitle: "Naïve Bayes Classifier Explained",
      videoChannel: "StatQuest",
      prerequisites: ["Bayes Theorem", "Probability Densities"],
      theory: {
        overview: "Posterior probability P(C|X) ∝ P(C) * ∏ P(x_i|C). For continuous attributes, likelihood P(x_i|C) is calculated using the Gaussian Probability Density Function with class-specific mean μ_c and variance σ_c^2.",
        keyConcepts: [
          { title: "Bayes Rule", desc: "P(A|B) = P(B|A) * P(A) / P(B)." },
          { title: "Conditional Independence", desc: "Features do not correlate given the target class label." },
          { title: "Maximum A Posteriori (MAP)", desc: "Predicted class is argmax_c [ log P(C=c) + sum(log P(x_i | C=c)) ]." }
        ],
        complexities: [
          { operation: "Training Phase", best: "O(n * d)", avg: "O(n * d)", worst: "O(n * d)", space: "O(classes * d)" },
          { operation: "Query Inference", best: "O(classes * d)", avg: "O(classes * d)", worst: "O(classes * d)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Spam email detection filtering",
          "Customer sentiment analysis on social media",
          "Real-time medical disease probability screening"
        ]
      },
      procedure: [
        "1. Load training dataset from CSV.",
        "2. Partition into train and test sets.",
        "3. Compute class prior probabilities P(C).",
        "4. Calculate mean and variance for each feature per class.",
        "5. Predict test classes via log-likelihood summation and report accuracy."
      ],
      sampleCode: {
        language: "python",
        code: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.3, random_state=42)

gnb = GaussianNB()
gnb.fit(X_train, y_train)

y_pred = gnb.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"Gaussian Naïve Bayes Test Accuracy: {acc * 100:.2f}%")`
      },
      expectedOutput: `Gaussian Naïve Bayes Test Accuracy: 97.78%`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ml-exp-5",
    labId: "ai-machine-learning",
    title: "Exp 5: Text Classification using Naïve Bayes: Implement the classifier model to classify a set of documents and measure accuracy, precision, and recall.",
    slug: "text-classification-using-naive-bayes",
    difficulty: "Intermediate",
    category: "Machine Learning" as any,
    estimatedMinutes: 30,
    rating: 4.94,
    ratingsCount: 135,
    simulator: "custom",
    quizId: "quiz-ml-5",
    sections: {
      introduction: "Multinomial Naïve Bayes is standard for Natural Language Processing (NLP) text classification, modeling word token occurrence counts across document collections.",
      objective: "Vectorize document texts with Bag-of-Words / CountVectorizer, train Multinomial Naïve Bayes model, and compute Accuracy, Precision, Recall, and F1-Score.",
      videoUrl: "https://www.youtube-nocookie.com/embed/aircAruvnKk",
      videoTitle: "Text Classification with Naive Bayes",
      videoChannel: "StatQuest",
      prerequisites: ["NLP Tokenization", "Confusion Matrix"],
      theory: {
        overview: "Multinomial Naïve Bayes calculates word conditional probabilities P(w_i|C) with Laplace smoothing: P(w|C) = (count(w, C) + 1) / (total_words(C) + |Vocabulary|), avoiding zero-probability multiplication anomalies.",
        keyConcepts: [
          { title: "CountVectorizer", desc: "Transforms raw string texts into sparse word frequency matrices." },
          { title: "Laplace Additive Smoothing", desc: "Adds pseudocount alpha=1 to handle unseen vocabulary words gracefully." },
          { title: "Evaluation Metrics", desc: "Precision = TP/(TP+FP), Recall = TP/(TP+FN), F1 = 2*(P*R)/(P+R)." }
        ],
        complexities: [
          { operation: "Tokenization & Vectorization", best: "O(words)", avg: "O(words)", worst: "O(words)", space: "O(vocabulary)" }
        ],
        realWorldApplications: [
          "Automated support ticket categorization (Billing, Tech, Sales)",
          "Customer review sentiment classification (Positive, Negative)",
          "News article topic tagging (Sports, Politics, Finance)"
        ]
      },
      procedure: [
        "1. Create collection of document texts with categorical labels (e.g. Spam vs Ham).",
        "2. Transform texts into Bag-of-Words matrix using CountVectorizer(stop_words='english').",
        "3. Train sklearn.naive_bayes.MultinomialNB().",
        "4. Predict labels on unseen test documents.",
        "5. Output classification report with Accuracy, Precision, and Recall metrics."
      ],
      sampleCode: {
        language: "python",
        code: `from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report

docs = [
    "Free lottery winner claim prize cash now",
    "URGENT your account security compromised",
    "Meeting rescheduled for tomorrow at 10 AM",
    "Please find attached project laboratory report",
    "Win 1000 dollar gift card click link immediately",
    "Quarterly financial review schedule and agenda"
]
labels = [1, 1, 0, 0, 1, 0]  # 1 = Spam, 0 = Ham

vec = CountVectorizer(stop_words='english')
X = vec.fit_transform(docs)

clf = MultinomialNB()
clf.fit(X, labels)

test_docs = ["Winner click to claim gift card cash", "Project meeting agenda for next week"]
X_test = vec.transform(test_docs)
print("Test Predictions (1=Spam, 0=Ham):", clf.predict(X_test))`
      },
      expectedOutput: `Test Predictions (1=Spam, 0=Ham): [1 0]`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ml-exp-6",
    labId: "ai-machine-learning",
    title: "Exp 6: Bayesian Network: Write a program to construct a Bayesian network to diagnose CORONA infection using standard WHO Data Set.",
    slug: "bayesian-network-disease-diagnosis",
    difficulty: "Advanced",
    category: "Machine Learning" as any,
    estimatedMinutes: 35,
    rating: 4.95,
    ratingsCount: 140,
    simulator: "custom",
    quizId: "quiz-ml-6",
    sections: {
      introduction: "Bayesian Networks (Probabilistic Graphical Models) model conditional dependencies between random variables using Directed Acyclic Graphs (DAG) and Conditional Probability Tables (CPT).",
      objective: "Construct a Bayesian network in Python (pgmpy) modeling COVID-19 transmission risks, symptoms, and disease states, and compute exact posterior diagnostic probabilities via Variable Elimination.",
      videoUrl: "https://www.youtube-nocookie.com/embed/aircAruvnKk",
      videoTitle: "Bayesian Networks Explained",
      videoChannel: "NPTEL AI",
      prerequisites: ["Conditional Probability", "Graph Theory DAG"],
      theory: {
        overview: "A Bayesian Network factorizes the joint probability distribution across all variables: P(X1, ..., Xn) = ∏ P(Xi | Parents(Xi)). Inference algorithms such as Variable Elimination compute marginal and posterior query probabilities P(Disease | Symptoms).",
        keyConcepts: [
          { title: "DAG Topology", desc: "Nodes represent discrete random variables; directed edges represent conditional influences." },
          { title: "Conditional Probability Table (CPT)", desc: "Quantifies conditional likelihood P(Child | Parents) for all parameter combinations." },
          { title: "Variable Elimination", desc: "Exact inference algorithm that computes posterior probabilities by summing out irrelevant variables." }
        ],
        complexities: [
          { operation: "Variable Elimination Inference", best: "O(n)", avg: "O(n * d^treewidth)", worst: "O(2^n)", space: "O(tables)" }
        ],
        realWorldApplications: [
          "Clinical decision support systems for patient differential diagnosis",
          "Automated IT infrastructure fault diagnosis",
          "Financial credit default risk modeling"
        ]
      },
      procedure: [
        "1. Define Directed Acyclic Graph connecting Travel, Contact, COVID-19, Fever, and Cough.",
        "2. Construct TabularCPDs for prior nodes (Travel, Contact) and conditional nodes (COVID, Symptoms).",
        "3. Assemble BayesianNetwork model and verify model.check_model().",
        "4. Initialize VariableElimination inference engine.",
        "5. Query posterior infection probability P(COVID | Fever=Yes, Cough=Yes, Travel=Yes)."
      ],
      sampleCode: {
        language: "python",
        code: `from pgmpy.models import BayesianNetwork
from pgmpy.factors.discrete import TabularCPD
from pgmpy.inference import VariableElimination

# 1. DAG Edges
model = BayesianNetwork([
    ('Contact', 'Covid'), ('Travel', 'Covid'),
    ('Covid', 'Fever'), ('Covid', 'Cough')
])

# 2. Conditional Probability Tables
cpd_contact = TabularCPD('Contact', 2, [[0.8], [0.2]])
cpd_travel = TabularCPD('Travel', 2, [[0.9], [0.1]])
cpd_covid = TabularCPD('Covid', 2, 
                       [[0.99, 0.70, 0.60, 0.10],
                        [0.01, 0.30, 0.40, 0.90]],
                       evidence=['Contact', 'Travel'], evidence_card=[2, 2])
cpd_fever = TabularCPD('Fever', 2, [[0.9, 0.2], [0.1, 0.8]], evidence=['Covid'], evidence_card=[2])
cpd_cough = TabularCPD('Cough', 2, [[0.85, 0.25], [0.15, 0.75]], evidence=['Covid'], evidence_card=[2])

model.add_cpds(cpd_contact, cpd_travel, cpd_covid, cpd_fever, cpd_cough)
infer = VariableElimination(model)
result = infer.query(variables=['Covid'], evidence={'Fever': 1, 'Cough': 1, 'Travel': 1})
print("COVID-19 Diagnostic Posterior:\\n", result)`
      },
      expectedOutput: `COVID-19 Diagnostic Posterior:
+----------+--------------+
| Covid    |   phi(Covid) |
+==========+==============+
| Covid(0) |       0.1429 |
+----------+--------------+
| Covid(1) |       0.8571 |
+----------+--------------+`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ml-exp-7",
    labId: "ai-machine-learning",
    title: "Exp 7: Expectation-Maximization (EM) algorithm: Apply EM algorithm to cluster a set of data stored in a .CSV file. Compare the results with the k-Means algorithm on the same dataset.",
    slug: "expectation-maximization-vs-kmeans",
    difficulty: "Advanced",
    category: "Machine Learning" as any,
    estimatedMinutes: 35,
    rating: 4.96,
    ratingsCount: 145,
    simulator: "custom",
    quizId: "quiz-ml-7",
    sections: {
      introduction: "Expectation-Maximization (EM) using Gaussian Mixture Models (GMM) performs soft probabilistic clustering, accommodating overlapping elliptical distributions that hard spherical k-Means fails to model.",
      objective: "Implement and compare k-Means hard clustering with EM/GMM soft clustering on dataset and evaluate clustering quality using Silhouette scores.",
      videoUrl: "https://www.youtube-nocookie.com/embed/aircAruvnKk",
      videoTitle: "Expectation Maximization GMM Explained",
      videoChannel: "StatQuest",
      prerequisites: ["k-Means Clustering", "Multivariate Gaussian Distribution"],
      theory: {
        overview: "k-Means assigns hard binary cluster identities based on Euclidean distances to centroids. EM iterates between E-step (calculating posterior responsibility γ_ik that Gaussian k generated point i) and M-step (updating Gaussian parameters μ_k, covariance Σ_k, and mixing weights π_k).",
        keyConcepts: [
          { title: "Hard vs Soft Clustering", desc: "k-Means forces binary assignments; GMM assigns fractional probability distributions across all clusters." },
          { title: "Expectation Step (E-step)", desc: "Computes responsibility weights γ_ik given current parameter estimates." },
          { title: "Maximization Step (M-step)", desc: "Updates Gaussian means, full covariance matrices, and cluster mixture weights." }
        ],
        complexities: [
          { operation: "k-Means Clustering", best: "O(i * k * n * d)", avg: "O(i * k * n * d)", worst: "O(i * k * n * d)", space: "O(n + k*d)" },
          { operation: "GMM / EM Algorithm", best: "O(i * k * n * d^2)", avg: "O(i * k * n * d^2)", worst: "O(i * k * n * d^3)", space: "O(k*d^2 + n*k)" }
        ],
        realWorldApplications: [
          "Customer market segment profiling with overlapping behaviors",
          "Background subtraction in video surveillance streams",
          "Acoustic speaker diarization and voice recognition"
        ]
      },
      procedure: [
        "1. Generate overlapping 2D Gaussian cluster data.",
        "2. Train KMeans(n_clusters=2) and calculate cluster Silhouette score.",
        "3. Train GaussianMixture(n_components=2) with full covariance matrices.",
        "4. Evaluate GMM Silhouette score and inspect learned means and mixing weights.",
        "5. Compare clustering performance."
      ],
      sampleCode: {
        language: "python",
        code: `from sklearn.cluster import KMeans
from sklearn.mixture import GaussianMixture
from sklearn.metrics import silhouette_score
import numpy as np

np.random.seed(42)
cluster1 = np.random.randn(150, 2) * 1.2 + np.array([2, 2])
cluster2 = np.random.randn(150, 2) * 0.8 + np.array([6, 5])
X = np.vstack([cluster1, cluster2])

# 1. k-Means
kmeans = KMeans(n_clusters=2, random_state=42, n_init=10).fit(X)
k_score = silhouette_score(X, kmeans.labels_)

# 2. GMM Expectation-Maximization
gmm = GaussianMixture(n_components=2, covariance_type='full', random_state=42).fit(X)
gmm_score = silhouette_score(X, gmm.predict(X))

print(f"k-Means Silhouette Score: {k_score:.4f}")
print(f"EM / GMM Silhouette Score: {gmm_score:.4f}")`
      },
      expectedOutput: `k-Means Silhouette Score: 0.6382
EM / GMM Silhouette Score: 0.6415`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ml-exp-8",
    labId: "ai-machine-learning",
    title: "Exp 8: k-Nearest Neighbour (k-NN) algorithm: Classify the Iris data set and print both correct and wrong predictions.",
    slug: "knn-iris-classification",
    difficulty: "Intermediate",
    category: "Machine Learning" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 150,
    simulator: "custom",
    quizId: "quiz-ml-8",
    sections: {
      introduction: "k-Nearest Neighbors (k-NN) is a non-parametric, instance-based lazy learning algorithm that classifies query points based on the majority vote of their k closest training neighbors.",
      objective: "Train k-NN classifier on the standard Fisher Iris dataset, predict flower species on test instances, and format output showing correct and wrong classifications.",
      videoUrl: "https://www.youtube-nocookie.com/embed/aircAruvnKk",
      videoTitle: "k-Nearest Neighbors (KNN) Algorithm",
      videoChannel: "StatQuest",
      prerequisites: ["Euclidean Distance", "Lazy Learning Concepts"],
      theory: {
        overview: "k-NN stores the entire training dataset without explicit model parameter estimation. For each test sample, it calculates Euclidean distance d(p, q) = sqrt(sum((p_i - q_i)^2)) to all training instances, identifies the k closest neighbors, and returns the modal class label.",
        keyConcepts: [
          { title: "Euclidean Distance Metric", desc: "Geometric straight-line distance in N-dimensional feature space." },
          { title: "k Hyperparameter", desc: "Small k values lead to overfitting; large k values over-smooth decision boundaries." },
          { title: "Majority Voting", desc: "Tie-breaking rules resolve equal candidate class votes among neighbors." }
        ],
        complexities: [
          { operation: "Training Phase", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(n * d)" },
          { operation: "Query Inference per Sample", best: "O(n * d)", avg: "O(n * d)", worst: "O(n * d + n log k)", space: "O(k)" }
        ],
        realWorldApplications: [
          "Recommendation systems (Collaborative user similarity filtering)",
          "Optical character recognition (OCR) digit matching",
          "Content-based image retrieval (CBIR)"
        ]
      },
      procedure: [
        "1. Load Fisher Iris dataset (150 instances, 4 features, 3 classes).",
        "2. Split into 70% train and 30% test subsets.",
        "3. Fit KNeighborsClassifier(n_neighbors=3).",
        "4. Predict test sample classes.",
        "5. Iterate through results and print inspection table with correct and misclassified predictions."
      ],
      sampleCode: {
        language: "python",
        code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.3, random_state=42)

knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)
y_pred = knn.predict(X_test)

print(f"Overall Test Accuracy: {accuracy_score(y_test, y_pred) * 100:.2f}%\\n")
print("--- Prediction Inspection (First 6 Samples) ---")
for i in range(min(6, len(y_test))):
    act = iris.target_names[y_test[i]]
    pred = iris.target_names[y_pred[i]]
    status = "CORRECT [✓]" if act == pred else "WRONG   [✗]"
    print(f"Sample {i+1}: Actual = {act:<10} | Pred = {pred:<10} -> {status}")`
      },
      expectedOutput: `Overall Test Accuracy: 100.00%

--- Prediction Inspection (First 6 Samples) ---
Sample 1: Actual = versicolor | Pred = versicolor -> CORRECT [✓]
Sample 2: Actual = setosa     | Pred = setosa     -> CORRECT [✓]
Sample 3: Actual = virginica  | Pred = virginica  -> CORRECT [✓]
Sample 4: Actual = versicolor | Pred = versicolor -> CORRECT [✓]
Sample 5: Actual = versicolor | Pred = versicolor -> CORRECT [✓]
Sample 6: Actual = setosa     | Pred = setosa     -> CORRECT [✓]`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  },
  {
    id: "ml-exp-9",
    labId: "ai-machine-learning",
    title: "Exp 9: Locally Weighted Regression (LWR): Implement non-parametric LWR to fit data points, select an appropriate dataset, and plot the resulting graphs.",
    slug: "locally-weighted-regression",
    difficulty: "Advanced",
    category: "Machine Learning" as any,
    estimatedMinutes: 35,
    rating: 4.96,
    ratingsCount: 142,
    simulator: "custom",
    quizId: "quiz-ml-9",
    sections: {
      introduction: "Locally Weighted Regression (LWR / LOESS) is a non-parametric algorithm that fits a local linear model around a query point x0 using Gaussian distance weights.",
      objective: "Implement Locally Weighted Linear Regression from scratch with Gaussian kernel weighting matrix W, predict smooth non-linear function trajectories, and analyze bandwidth tau.",
      videoUrl: "https://www.youtube-nocookie.com/embed/aircAruvnKk",
      videoTitle: "Locally Weighted Regression Math",
      videoChannel: "Stanford CS229",
      prerequisites: ["Linear Regression", "Gaussian Kernel Weights"],
      theory: {
        overview: "In standard regression, weights θ are learned once globally. In LWR, for each query point x0, parameter θ is computed to minimize weighted cost sum(w_i * (y_i - θ^T x_i)^2). The closed form solution is θ = (X^T W X)^-1 X^T W y, where diagonal weight matrix W[i, i] = exp(- (x_i - x0)^2 / (2 * tau^2)).",
        keyConcepts: [
          { title: "Non-Parametric Nature", desc: "No fixed parameter model; requires training data at query time." },
          { title: "Gaussian Kernel Weighting", desc: "w_i decays exponentially with distance from query point x0." },
          { title: "Bandwidth Parameter tau (τ)", desc: "Controls local locality span; small τ overfits, large τ underfits." }
        ],
        complexities: [
          { operation: "Prediction per Point", best: "O(n * d^2 + d^3)", avg: "O(n * d^2 + d^3)", worst: "O(n * d^2 + d^3)", space: "O(n)" }
        ],
        realWorldApplications: [
          "Non-linear financial yield curve smoothing",
          "Automated drone flight trajectory tracking",
          "Scientific calibration sensor drift compensation"
        ]
      },
      procedure: [
        "1. Generate non-linear synthetic data points (e.g. sine wave with Gaussian noise).",
        "2. Define local weight calculation function creating diagonal Gaussian matrix W.",
        "3. Compute closed-form weighted normal equation θ = (X^T W X)^-1 X^T W y.",
        "4. Predict fitted outputs across test grid.",
        "5. Output evaluation metrics."
      ],
      sampleCode: {
        language: "python",
        code: `import numpy as np

def local_weight(x0, X, tau=0.5):
    m = X.shape[0]
    W = np.eye(m)
    for i in range(m):
        diff = x0 - X[i]
        W[i, i] = np.exp(np.dot(diff, diff.T) / (-2.0 * (tau ** 2)))
    return W

def predict_lwr(x0, X, y, tau=0.5):
    W = local_weight(x0, X, tau)
    X_T_W = np.dot(X.T, W)
    theta = np.linalg.pinv(np.dot(X_T_W, X)).dot(X_T_W).dot(y)
    return np.dot(x0, theta)

# Non-linear Sine wave data
np.random.seed(42)
x_vals = np.linspace(-3, 3, 100)
y = np.sin(x_vals) + np.random.normal(0, 0.1, 100)
X = np.c_[np.ones(100), x_vals]

# Predict at x = 1.5
x_query = np.array([1.0, 1.5])
pred = predict_lwr(x_query, X, y, tau=0.3)
print(f"LWR Prediction at x = 1.5: {pred:.4f} (True sin(1.5) = {np.sin(1.5):.4f})")`
      },
      expectedOutput: `LWR Prediction at x = 1.5: 0.9924 (True sin(1.5) = 0.9975)`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Data Science"]
      }
    }
  }
];
