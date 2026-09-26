import { MaterialContent } from "./types";

export const AI_ML_MATERIALS: Record<string, MaterialContent> = {
  "ml-foundations-gfg": {
    id: "ml-foundations-gfg",
    title: "Machine Learning Foundations, Find-S & Candidate Elimination",
    subject: "Deep Learning Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "Concept Learning & Version Space",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/ai-machine-learning",
    simulatorName: "Machine Learning Simulator",
    overview:
      "Concept learning is the task of inferring a boolean-valued function from training examples of its input and output. This GeeksforGeeks reference covers the ordering of hypotheses from most specific to most general, the Find-S maximally specific hypothesis finder, and the Candidate-Elimination algorithm which maintains the complete Version Space bounded by sets S (Specific) and G (General).",
    learningObjectives: [
      "Understand hypothesis representations using attribute constraints and wildcards (?)",
      "Trace the Find-S algorithm on positive training instances",
      "Understand why Find-S ignores negative instances and cannot detect noisy data",
      "Execute the Candidate-Elimination algorithm to maintain the Version Space (S and G boundaries)",
      "Formulate inductive bias in concept learning"
    ],
    keyConcepts: [
      {
        title: "1. Hypothesis Representations & General-to-Specific Ordering",
        description:
          "Instances are described by attribute-value vectors. Hypotheses specify constraints: specific value (e.g. Sunny), wildcard (?) [any value accepted], or null (Ø) [no value accepted].",
        points: [
          "Most Specific Hypothesis: <Ø, Ø, Ø, Ø, Ø, Ø> (rejects all instances).",
          "Most General Hypothesis: <?, ?, ?, ?, ?, ?> (accepts all instances).",
          "Generalizes Relation: Hypothesis h1 is more general than h2 (h1 >= h2) if all instances satisfied by h2 are also satisfied by h1."
        ]
      },
      {
        title: "2. The Candidate-Elimination Algorithm",
        description:
          "Computes the Version Space: the subset of all hypotheses consistent with all observed training examples.",
        points: [
          "Boundary S: The set of maximally specific consistent hypotheses.",
          "Boundary G: The set of maximally general consistent hypotheses.",
          "Positive Instance: Generalize S as minimally as possible; prune G hypotheses that fail to satisfy instance.",
          "Negative Instance: Specialize G as minimally as possible; prune S hypotheses that satisfy the negative instance."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Initialize Boundaries",
        description: "Set S0 = {<Ø, Ø, ...>} and G0 = {<?, ?, ...>}."
      },
      {
        step: 2,
        title: "Process Positive Example",
        description: "Remove from G any hypothesis inconsistent with d. For each s in S not consistent with d, replace with minimal generalisations consistent with d."
      },
      {
        step: 3,
        title: "Process Negative Example",
        description: "Remove from S any hypothesis consistent with d. For each g in G consistent with d, replace with minimal specializations not consistent with d."
      }
    ],
    codeSnippets: {
      python: `def candidate_elimination(concepts, target):
    # Initialize S and G
    specific_h = concepts[0].copy()
    general_h = [["?" for _ in range(len(specific_h))] for _ in range(len(specific_h))]

    for i, h in enumerate(concepts):
        if target[i] == "Yes":
            for x in range(len(specific_h)):
                if h[x] != specific_h[x]:
                    specific_h[x] = '?'
                    general_h[x][x] = '?'
        if target[i] == "No":
            for x in range(len(specific_h)):
                if h[x] != specific_h[x]:
                    general_h[x][x] = specific_h[x]
                else:
                    general_h[x][x] = '?'

    # Filter out redundant wildcards
    indices = [i for i, val in enumerate(general_h) if val == ['?'] * len(specific_h)]
    for i in indices:
        general_h.remove(['?'] * len(specific_h))
        
    return specific_h, general_h

# Sample Weather Dataset
concepts = [
    ['Sunny', 'Warm', 'Normal', 'Strong', 'Warm', 'Same'],
    ['Sunny', 'Warm', 'High', 'Strong', 'Warm', 'Same'],
    ['Rainy', 'Cold', 'High', 'Strong', 'Warm', 'Change'],
    ['Sunny', 'Warm', 'High', 'Strong', 'Cool', 'Change']
]
target = ['Yes', 'Yes', 'No', 'Yes']

S, G = candidate_elimination(concepts, target)
print("Final S Boundary:", S)
print("Final G Boundary:", G)`
    },
    complexityAnalysis: {
      timeComplexity: "O(N * |H|) where N is training samples, |H| is hypothesis space",
      spaceComplexity: "O(|H|) version space boundary storage in worst-case exponential branching",
      bestCase: "O(N * M) for single feature updates",
      worstCase: "O(2^M) where M is number of discrete attributes",
      notes: "In the presence of noisy training data, Candidate-Elimination's Version Space can collapse to the empty set."
    },
    vivaQuestions: [
      {
        question: "Why does the Find-S algorithm completely ignore negative training instances?",
        answer: "Find-S assumes the target concept is in the hypothesis space and there is no noise. Since it starts from the most specific hypothesis and only generalizes upon encountering positive instances, negative instances do not require generalization and are thus ignored."
      },
      {
        question: "What happens to the Version Space if the training dataset contains contradictory label noise?",
        answer: "The Version Space collapses to the empty set (S and G cross over and become incompatible with each other), signaling that no single hypothesis can consistently explain the observed noisy data."
      }
    ],
    realWorldApplications: [
      "Rule-based diagnostic expert systems in medical screening",
      "Access control policy rule induction from employee audit logs",
      "Network intrusion rule synthesis from security honeypots"
    ],
    practiceProblems: [
      {
        title: "Find-S Step Tracer",
        difficulty: "Easy",
        description: "Given a dataset of 5 customer loan approval instances, trace the Find-S hypothesis state after each positive instance."
      }
    ]
  },

  "ml-decision-trees-gfg": {
    id: "ml-decision-trees-gfg",
    title: "ID3 Decision Trees with Entropy & Information Gain",
    subject: "Deep Learning Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "Decision Trees & Information Theory",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/ai-machine-learning",
    simulatorName: "Machine Learning Simulator",
    overview:
      "Decision trees are non-parametric supervised learning models used for classification and regression. The ID3 (Iterative Dichotomiser 3) algorithm builds a decision tree top-down by calculating Shannon Entropy to measure impurity and selecting the attribute that maximizes Information Gain at each node split.",
    learningObjectives: [
      "Calculate Shannon Entropy H(S) for binary and multi-class classification datasets",
      "Calculate Information Gain Gain(S, A) by computing weighted average subset entropies",
      "Implement the recursive ID3 tree construction algorithm in Python",
      "Understand tree pruning techniques to combat overfitting and high variance",
      "Compare ID3 with C4.5 (Gain Ratio) and CART (Gini Impurity)"
    ],
    keyConcepts: [
      {
        title: "1. Shannon Entropy Formula",
        description:
          "Entropy measures the degree of uncertainty or impurity in a set of training examples S.",
        points: [
          "Formula: H(S) = - sum_{c} [ p(c) * log2(p(c)) ] where p(c) is the probability of class c.",
          "Homogeneous Set: If all instances belong to the same class, H(S) = 0 (zero impurity).",
          "Maximum Impurity: For an even 50/50 binary split, H(S) = - [0.5 * (-1) + 0.5 * (-1)] = 1.0 bit."
        ]
      },
      {
        title: "2. Information Gain Calculation",
        description:
          "Information Gain represents the expected reduction in entropy achieved by partitioning S on attribute A.",
        points: [
          "Formula: Gain(S, A) = H(S) - sum_{v in Values(A)} [ (|S_v| / |S|) * H(S_v) ].",
          "Greedy Selection: At each decision step, pick the attribute with highest Gain(S, A) as the decision node.",
          "Stopping Criteria: All instances in a partition have the same class, or no remaining attributes exist."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Calculate Base Entropy",
        description: "Calculate H(S) of the target label on the current training subset S."
      },
      {
        step: 2,
        title: "Evaluate Information Gain for All Attributes",
        description: "For every available attribute A, partition S into subsets S_v and calculate Gain(S, A)."
      },
      {
        step: 3,
        title: "Split & Recurse",
        description: "Select best attribute A_best as root; branch on each value v and recursively call algorithm on S_v."
      }
    ],
    codeSnippets: {
      python: `import numpy as np
import pandas as pd

def entropy(target_col):
    elements, counts = np.unique(target_col, return_counts=True)
    probs = counts / counts.sum()
    return -np.sum(probs * np.log2(probs + 1e-9))

def info_gain(data, split_attribute_name, target_name="Play"):
    # Total entropy
    total_entropy = entropy(data[target_name])
    
    # Calculate weighted entropy of subsets
    vals, counts = np.unique(data[split_attribute_name], return_counts=True)
    weighted_entropy = sum(
        (counts[i] / sum(counts)) * entropy(data[data[split_attribute_name] == vals[i]][target_name])
        for i in range(len(vals))
    )
    return total_entropy - weighted_entropy

# Sample Weather Data
df = pd.DataFrame({
    'Outlook': ['Sunny', 'Sunny', 'Overcast', 'Rain', 'Rain', 'Overcast'],
    'Temp': ['Hot', 'Hot', 'Hot', 'Mild', 'Cool', 'Cool'],
    'Play': ['No', 'No', 'Yes', 'Yes', 'No', 'Yes']
})

print(f"Base Entropy H(Play): {entropy(df['Play']):.4f}")
print(f"Gain(Play, Outlook): {info_gain(df, 'Outlook'):.4f}")
print(f"Gain(Play, Temp): {info_gain(df, 'Temp'):.4f}")`
    },
    complexityAnalysis: {
      timeComplexity: "O(M * N log N) for tree training where N is instances, M is features",
      spaceComplexity: "O(Nodes) memory for storing the hierarchical tree pointer structure",
      bestCase: "O(M * N log N)",
      worstCase: "O(M * N^2) for skewed deep trees",
      notes: "C4.5 replaces Information Gain with Gain Ratio to penalize attributes with large numbers of distinct values (like IDs)."
    },
    vivaQuestions: [
      {
        question: "Why does standard Information Gain favor attributes with numerous distinct values?",
        answer: "If an attribute has a unique value for every record (like StudentID), each partition contains exactly one instance with entropy 0, creating maximum Information Gain but yielding a useless tree that fails to generalize. C4.5 solves this using Gain Ratio = Gain / SplitInformation."
      },
      {
        question: "What is the difference between pre-pruning and post-pruning in decision trees?",
        answer: "Pre-pruning stops tree growth early when a maximum depth or minimum sample split threshold is reached. Post-pruning lets the tree grow fully and then prunes subtrees that do not improve validation set accuracy (Reduced Error Pruning)."
      }
    ],
    realWorldApplications: [
      "Credit risk scoring and loan approval automated triage",
      "Medical triage diagnostic pathways for emergency patient categorization",
      "Churn risk factor identification in telecommunications"
    ],
    practiceProblems: [
      {
        title: "Compute Gini Impurity vs Entropy",
        difficulty: "Easy",
        description: "Given a dataset with 9 positive and 5 negative examples, compute both Shannon Entropy and Gini Impurity (1 - sum(p_i^2))."
      }
    ]
  },

  "ml-neural-networks-gfg": {
    id: "ml-neural-networks-gfg",
    title: "Multilayer Perceptron & Backpropagation Neural Networks",
    subject: "Deep Learning Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "Neural Networks & Backpropagation",
    readTime: "30 mins",
    difficulty: "Advanced",
    simulatorUrl: "/labs/ai-machine-learning",
    simulatorName: "Machine Learning Simulator",
    overview:
      "Artificial Neural Networks (ANN) are computational models inspired by biological neural circuits. A Single-Layer Perceptron can only classify linearly separable patterns and famously fails on the XOR problem. A Multilayer Perceptron (MLP) with non-linear activation functions (Sigmoid, ReLU) acts as a Universal Function Approximator and learns complex decision boundaries via the Backpropagation algorithm.",
    learningObjectives: [
      "Prove why a single-layer perceptron cannot solve non-linearly separable problems (XOR)",
      "Derive forward propagation equations: Z = W * X + b and A = sigma(Z)",
      "Derive gradient descent backpropagation using the multivariate calculus Chain Rule",
      "Implement a 2-layer Neural Network from scratch in Python to solve XOR",
      "Understand the Vanishing Gradient problem and activation function alternatives (ReLU, Leaky ReLU)"
    ],
    keyConcepts: [
      {
        title: "1. The Forward Pass & Activation Functions",
        description:
          "Input signals are propagated forward through weighted layers and non-linear activation functions.",
        points: [
          "Linear Transformation: Z^[l] = W^[l] * A^[l-1] + b^[l].",
          "Activation: A^[l] = g(Z^[l]).",
          "Sigmoid: sigma(z) = 1 / (1 + e^-z). Derivative: sigma'(z) = sigma(z) * (1 - sigma(z)).",
          "ReLU: f(z) = max(0, z). Solves vanishing gradient for positive activations."
        ]
      },
      {
        title: "2. The Backpropagation Algorithm (Chain Rule)",
        description:
          "Backpropagation calculates the partial derivative of the loss function J with respect to each weight and bias in the network.",
        points: [
          "Output Error: dZ^[2] = A^[2] - Y (for binary cross-entropy loss).",
          "Weight Gradient: dW^[2] = (1/m) * dZ^[2] * (A^[1])^T.",
          "Hidden Layer Error: dZ^[1] = (W^[2])^T * dZ^[2] * g'(Z^[1]).",
          "Weight Update: W := W - alpha * dW where alpha is the learning rate."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Forward Propagation",
        description: "Compute hidden activations Z1, A1 and output predictions Z2, A2."
      },
      {
        step: 2,
        title: "Compute Loss & Output Gradients",
        description: "Calculate MSE or Binary Cross-Entropy loss; compute output error delta2."
      },
      {
        step: 3,
        title: "Backpropagate Error & Update Weights",
        description: "Backpropagate delta2 through W2 to compute delta1; update weights W1, W2 via gradient descent."
      }
    ],
    codeSnippets: {
      python: `import numpy as np

# Sigmoid and its derivative
def sigmoid(x):
    return 1.0 / (1.0 + np.exp(-x))

def sigmoid_derivative(x):
    s = sigmoid(x)
    return s * (1.0 - s)

# XOR Dataset
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]]) # (4, 2)
y = np.array([[0], [1], [1], [0]])             # (4, 1)

# Initialize Weights and Biases randomly
np.random.seed(42)
W1 = np.random.uniform(-1, 1, (2, 4)) # Hidden layer (4 neurons)
b1 = np.zeros((1, 4))
W2 = np.random.uniform(-1, 1, (4, 1)) # Output layer (1 neuron)
b2 = np.zeros((1, 1))

lr = 0.5
epochs = 10000

for epoch in range(epochs):
    # Forward Pass
    Z1 = np.dot(X, W1) + b1
    A1 = sigmoid(Z1)
    Z2 = np.dot(A1, W2) + b2
    A2 = sigmoid(Z2)

    # Backward Pass (Chain Rule)
    dZ2 = (A2 - y) * sigmoid_derivative(Z2)
    dW2 = np.dot(A1.T, dZ2)
    db2 = np.sum(dZ2, axis=0, keepdims=True)

    dZ1 = np.dot(dZ2, W2.T) * sigmoid_derivative(Z1)
    dW1 = np.dot(X.T, dZ1)
    db1 = np.sum(dZ1, axis=0, keepdims=True)

    # Gradient Descent Updates
    W2 -= lr * dW2
    b2 -= lr * db2
    W1 -= lr * dW1
    b1 -= lr * db1

print("Trained XOR Output Predictions:\\n", np.round(A2, 3))`
    },
    complexityAnalysis: {
      timeComplexity: "O(Epochs * Samples * Sum(Layer_i * Layer_{i+1})) for forward/backward matrix multiplications",
      spaceComplexity: "O(Weights + Activations) cache memory for intermediate tensors",
      bestCase: "O(Epochs * N * W)",
      worstCase: "O(Epochs * N * W)",
      notes: "Hardware GPUs accelerate matrix multiplications using CUDA Tensor Cores with FP16/BF16 mixed precision."
    },
    vivaQuestions: [
      {
        question: "Why can a single-layer perceptron not classify the XOR gate?",
        answer: "A single-layer perceptron can only generate a linear hyper-plane (decision boundary) separating input space into two half-spaces. The XOR function is fundamentally non-linearly separable: (0,0) and (1,1) cannot be separated from (0,1) and (1,0) by any single straight line."
      },
      {
        question: "What causes the Vanishing Gradient problem in deep networks?",
        answer: "When using saturating activation functions like Sigmoid, the derivative maxes out at 0.25. As gradients are multiplied backward across many layers via the chain rule, the gradient shrinks exponentially towards zero, preventing early layers from updating their weights."
      }
    ],
    realWorldApplications: [
      "Image classification (ResNet, EfficientNet) in autonomous driving",
      "Speech-to-text acoustic modeling in voice assistants (Siri, Alexa)",
      "Drug molecule affinity prediction in computational chemistry"
    ],
    practiceProblems: [
      {
        title: "Implement ReLU Activation & Derivative",
        difficulty: "Easy",
        description: "Write Python functions for the ReLU activation function f(x) = max(0, x) and its subgradient derivative, and test on negative arrays."
      }
    ]
  },

  "ml-w3schools": {
    id: "ml-w3schools",
    title: "W3Schools Machine Learning & Scikit-Learn Practice",
    subject: "Deep Learning Laboratory",
    provider: "W3Schools Reference",
    category: "Scikit-Learn & Classical ML",
    readTime: "20 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/ai-machine-learning",
    simulatorName: "Machine Learning Simulator",
    overview:
      "A hands-on, beginner-friendly W3Schools-curated laboratory guide to classical machine learning using Python's Scikit-Learn library. Covers data splitting, K-Means unsupervised clustering, Random Forest classification, and evaluating predictive performance via Confusion Matrices.",
    learningObjectives: [
      "Master the uniform Scikit-Learn Estimator API: fit(), predict(), and transform()",
      "Execute stratified train_test_split to avoid class imbalance bias",
      "Train and tune K-Means Clustering and select optimal k via the Elbow Method (Inertia)",
      "Build Random Forest ensemble classifiers with hyperparameter tuning",
      "Evaluate models using Confusion Matrix, Accuracy, Precision, Recall, and F1-Score"
    ],
    keyConcepts: [
      {
        title: "1. The Unified Scikit-Learn Pipeline",
        description:
          "All machine learning models in Scikit-Learn adhere to a consistent object-oriented interface.",
        points: [
          "Estimator: Instantiates model architecture (e.g. clf = RandomForestClassifier()).",
          "fit(X_train, y_train): Trains the internal model parameters on the training subset.",
          "predict(X_test): Generates target label predictions on unseen test features.",
          "score(X_test, y_test): Computes default performance metric (e.g. Mean Accuracy)."
        ]
      },
      {
        title: "2. Model Evaluation Metrics",
        description:
          "Accuracy alone is misleading for imbalanced datasets; precision and recall provide balanced insights.",
        points: [
          "Confusion Matrix: True Positives (TP), False Positives (FP), True Negatives (TN), False Negatives (FN).",
          "Precision = TP / (TP + FP): Measures correctness of positive predictions.",
          "Recall = TP / (TP + FN): Measures ability to capture all actual positive cases.",
          "F1-Score: Harmonic mean of Precision and Recall = 2 * (P * R) / (P + R)."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Split Dataset",
        description: "Partition features and target into 80% training and 20% testing sets using train_test_split."
      },
      {
        step: 2,
        title: "Train Model",
        description: "Fit model on training data: model.fit(X_train, y_train)."
      },
      {
        step: 3,
        title: "Evaluate Metrics",
        description: "Predict test data and print classification_report() and confusion_matrix()."
      }
    ],
    codeSnippets: {
      python: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.cluster import KMeans

# 1. Load Iris Benchmark Dataset
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.25, random_state=42
)

# 2. Supervised Learning: Random Forest Classifier
rf_clf = RandomForestClassifier(n_estimators=50, random_state=42)
rf_clf.fit(X_train, y_train)
y_pred = rf_clf.predict(X_test)

print("Classification Report:\\n", classification_report(y_test, y_pred, target_names=iris.target_names))
print("Confusion Matrix:\\n", confusion_matrix(y_test, y_pred))

# 3. Unsupervised Learning: K-Means Clustering
kmeans = KMeans(n_clusters=3, random_state=42, n_init='auto')
clusters = kmeans.fit_predict(iris.data)
print("\\nCluster Centers Shape:", kmeans.cluster_centers_.shape)`
    },
    complexityAnalysis: {
      timeComplexity: "Random Forest: O(n_estimators * M * N log N); K-Means: O(I * K * N * M)",
      spaceComplexity: "O(n_trees * nodes) for ensemble model serialization",
      bestCase: "O(K * N * M) for fast K-Means convergence",
      worstCase: "O(M * N log N) per decision tree in ensemble",
      notes: "Scikit-Learn is built on top of NumPy, SciPy, and Cython for optimal C-level execution speed."
    },
    vivaQuestions: [
      {
        question: "What is the difference between supervised and unsupervised learning?",
        answer: "Supervised learning algorithms are provided labeled data (features paired with known target outputs) to learn a mapping function. Unsupervised learning receives unlabeled data and discovers intrinsic structures, clusters, or lower-dimensional representations."
      },
      {
        question: "How do you choose the optimal number of clusters k in K-Means?",
        answer: "By plotting the WCSS (Within-Cluster Sum of Squares, or Inertia) against a range of k values (1 to 10) and identifying the 'Elbow Point' where the rate of decrease abruptly bends and flattens."
      }
    ],
    realWorldApplications: [
      "Customer market segmentation based on purchasing behavior",
      "Email spam filtering using Naïve Bayes classifiers",
      "Real estate housing valuation using ensemble regression trees"
    ],
    practiceProblems: [
      {
        title: "K-Means Elbow Curve",
        difficulty: "Easy",
        description: "Write a script that computes K-Means inertia for k=1 to 8 on a synthetic dataset and plots the resulting elbow curve."
      }
    ]
  },

  "ai-search-gfg": {
    id: "ai-search-gfg",
    title: "A* Search Algorithm & Heuristics in Artificial Intelligence",
    subject: "Artificial Intelligence Lab",
    provider: "GeeksforGeeks Reference",
    category: "Heuristic Search & Graph Optimization",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/artificial-intelligence",
    simulatorName: "AI State Space Studio",
    overview:
      "A* (A-Star) Search is the most widely used pathfinding and graph traversal algorithm in artificial intelligence. It combines the strengths of Uniform Cost Search (guaranteeing shortest path cost from root) and Greedy Best-First Search (using heuristics to guide search towards the goal).",
    learningObjectives: [
      "Understand the evaluation function f(n) = g(n) + h(n)",
      "Formulate the condition for heuristic admissibility: h(n) <= h*(n)",
      "Understand heuristic consistency (monotonicity): h(n) <= c(n, a, n') + h(n')",
      "Solve the classic 8-Puzzle sliding tile problem using Manhattan Distance heuristic",
      "Implement A* search using a min-heap priority queue in Python"
    ],
    keyConcepts: [
      {
        title: "1. The A* Evaluation Function",
        description:
          "A* prioritizes expanding the node n in the frontier that minimizes total estimated path cost.",
        points: [
          "g(n): The exact path cost accumulated from the start node to node n.",
          "h(n): The estimated heuristic cost from node n to the nearest goal state.",
          "f(n) = g(n) + h(n): Total estimated cost of the cheapest solution passing through n."
        ]
      },
      {
        title: "2. Admissibility & Optimality Guarantees",
        description:
          "The choice of heuristic determines whether A* guarantees finding the optimal shortest path.",
        points: [
          "Admissible Heuristic: An admissible heuristic NEVER overestimates the true cost to reach the goal (optimistic).",
          "Theorem: If h(n) is admissible, A* using tree search is guaranteed to return an optimal solution.",
          "Consistency: An admissible heuristic is consistent if for every node n and neighbor n', h(n) <= cost(n, n') + h(n'). Consistent heuristics guarantee optimality in graph search without reopening closed nodes."
        ]
      },
      {
        title: "3. 8-Puzzle Heuristics",
        description:
          "Two standard heuristics illustrate admissibility tradeoffs.",
        points: [
          "Misplaced Tiles (h1): Count of tiles not in their goal position. Admissible, but weak.",
          "Manhattan Distance (h2): Sum of absolute horizontal and vertical coordinate differences: |x - x_goal| + |y - y_goal|. h2 strictly dominates h1 (h2 >= h1 for all nodes) and explores far fewer states."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Initialize Open and Closed Lists",
        description: "Insert start node into Open priority queue with f = g(start) + h(start); Closed set = empty."
      },
      {
        step: 2,
        title: "Pop Lowest f(n)",
        description: "Pop node with smallest f(n). If node is goal state, reconstruct path and terminate."
      },
      {
        step: 3,
        title: "Expand Neighbors",
        description: "For each valid neighbor, compute tentative g. If neighbor has lower g than previously recorded, update g, f and push to Open queue."
      }
    ],
    codeSnippets: {
      python: `import heapq

def a_star_search(graph, start, goal, heuristics):
    # priority queue stores: (f_score, current_node, path, g_score)
    open_set = []
    heapq.heappush(open_set, (heuristics[start], start, [start], 0))
    visited = {}

    while open_set:
        f_score, current, path, g_score = heapq.heappop(open_set)

        if current == goal:
            return path, g_score

        if current in visited and visited[current] <= g_score:
            continue
        visited[current] = g_score

        for neighbor, cost in graph.get(current, []):
            tentative_g = g_score + cost
            if neighbor not in visited or tentative_g < visited[neighbor]:
                f = tentative_g + heuristics.get(neighbor, 0)
                heapq.heappush(open_set, (f, neighbor, path + [neighbor], tentative_g))

    return None, float('inf')

# Sample Graph Topology
graph = {
    'A': [('B', 1), ('C', 4)],
    'B': [('D', 2), ('E', 5)],
    'C': [('E', 1)],
    'D': [('G', 3)],
    'E': [('G', 2)],
    'G': []
}
heuristics = {'A': 6, 'B': 4, 'C': 2, 'D': 3, 'E': 1, 'G': 0}

path, cost = a_star_search(graph, 'A', 'G', heuristics)
print("Optimal Path:", " -> ".join(path), "with Cost:", cost)`
    },
    complexityAnalysis: {
      timeComplexity: "O(b^d) where b is branching factor and d is solution depth; O(N log N) for planar grids",
      spaceComplexity: "O(b^d) as A* must keep all generated frontier and explored states in memory",
      bestCase: "O(d) when heuristic is exact (h = h*)",
      worstCase: "O(b^d) exponential in worst case",
      notes: "IDA* (Iterative Deepening A*) addresses A*'s memory bottleneck by limiting search depth by f-cost thresholds."
    },
    vivaQuestions: [
      {
        question: "What happens if a heuristic is not admissible (it overestimates the true cost)?",
        answer: "If h(n) overestimates, A* may find a suboptimal goal state early and terminate prematurely, losing its guarantee of finding the least-cost path."
      },
      {
        question: "What is meant by heuristic dominance?",
        answer: "If h2(n) >= h1(n) for all states n, and both are admissible, then h2 dominates h1. A* using h2 is guaranteed to expand fewer or equal states compared to A* using h1."
      }
    ],
    realWorldApplications: [
      "Video game NPC navigation and real-time obstacle avoidance",
      "Autonomous vehicle path planning on OpenStreetMap road graphs",
      "Robotic arm kinematic trajectory optimization in industrial manufacturing"
    ],
    practiceProblems: [
      {
        title: "8-Puzzle Manhattan Distance Calculator",
        difficulty: "Medium",
        description: "Given a 3x3 board state array, compute the total Manhattan Distance heuristic to the goal state [[1,2,3],[4,5,6],[7,8,0]]."
      }
    ]
  },

  "ai-minimax-gfg": {
    id: "ai-minimax-gfg",
    title: "Minimax Algorithm with Alpha-Beta Pruning",
    subject: "Artificial Intelligence Lab",
    provider: "GeeksforGeeks Reference",
    category: "Adversarial Search & Game Theory",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/artificial-intelligence",
    simulatorName: "AI State Space Studio",
    overview:
      "The Minimax algorithm is a decision rule used in two-player zero-sum games of perfect information (such as Chess, Checkers, and Tic-Tac-Toe). One player (MAX) aims to maximize their score, while the adversary (MIN) aims to minimize it. Alpha-Beta pruning is an adversarial search optimization that prunes branches that cannot influence the final decision, effectively doubling the search depth.",
    learningObjectives: [
      "Understand the zero-sum game formulation where Utility(MAX) + Utility(MIN) = 0",
      "Trace the recursive Minimax game tree value propagation",
      "Formulate Alpha (best value MAX can achieve) and Beta (best value MIN can achieve)",
      "Apply the Alpha-Beta pruning condition: Prune when beta <= alpha",
      "Analyze the impact of node ordering on pruning efficiency"
    ],
    keyConcepts: [
      {
        title: "1. The Minimax Principle",
        description:
          "MAX selects the move that maximizes the minimum utility MIN could force them to receive.",
        points: [
          "Max Node: V(s) = max_{a} [ Minimax(Result(s, a)) ].",
          "Min Node: V(s) = min_{a} [ Minimax(Result(s, a)) ].",
          "Terminal State: Returns static utility evaluation value (+1 win, 0 draw, -1 loss)."
        ]
      },
      {
        title: "2. Alpha-Beta Pruning Rules",
        description:
          "Alpha and Beta track the current bounds of acceptable moves along the search path.",
        points: [
          "Alpha (alpha): The highest score guaranteed to MAX along the path so far (initialized to -infinity).",
          "Beta (beta): The lowest score guaranteed to MIN along the path so far (initialized to +infinity).",
          "Cutoff Condition: If beta <= alpha, the opponent already has a move that makes this subtree worse than an existing option. Stop evaluating remaining children."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Base Case Check",
        description: "If depth == 0 or game is over, return static heuristic evaluation of state."
      },
      {
        step: 2,
        title: "MAX Player Turn",
        description: "Initialize maxEval = -inf. For each child, maxEval = max(maxEval, minimax(child, depth-1, alpha, beta, False)). alpha = max(alpha, maxEval). If beta <= alpha: break."
      },
      {
        step: 3,
        title: "MIN Player Turn",
        description: "Initialize minEval = +inf. For each child, minEval = min(minEval, minimax(child, depth-1, alpha, beta, True)). beta = min(beta, minEval). If beta <= alpha: break."
      }
    ],
    codeSnippets: {
      python: `def minimax_alpha_beta(node, depth, alpha, beta, is_maximizing):
    # Terminal or leaf condition
    if depth == 0 or not isinstance(node, list):
        return node

    if is_maximizing:
        max_eval = float('-inf')
        for child in node:
            eval_val = minimax_alpha_beta(child, depth - 1, alpha, beta, False)
            max_eval = max(max_eval, eval_val)
            alpha = max(alpha, eval_val)
            if beta <= alpha:
                break # Beta cutoff (prune)
        return max_eval
    else:
        min_eval = float('inf')
        for child in node:
            eval_val = minimax_alpha_beta(child, depth - 1, alpha, beta, True)
            min_eval = min(min_eval, eval_val)
            beta = min(beta, eval_val)
            if beta <= alpha:
                break # Alpha cutoff (prune)
        return min_eval

# Example Game Tree (Leaves: [3, 5, 6, 9, 1, 2, 0, -1])
game_tree = [
    [[3, 5], [6, 9]],
    [[1, 2], [0, -1]]
]
optimal_score = minimax_alpha_beta(game_tree, 3, float('-inf'), float('inf'), True)
print("Optimal Game Score for MAX:", optimal_score)`
    },
    complexityAnalysis: {
      timeComplexity: "Without pruning: O(b^d); With optimal Alpha-Beta move ordering: O(b^(d/2))",
      spaceComplexity: "O(b * d) recursion stack memory",
      bestCase: "O(b^(d/2)) with perfect move ordering",
      worstCase: "O(b^d) when moves evaluated in worst possible order",
      notes: "In practice, game engines (Stockfish) use transposition tables and iterative deepening to achieve optimal move ordering."
    },
    vivaQuestions: [
      {
        question: "Does Alpha-Beta pruning alter the final decision made by the Minimax algorithm?",
        answer: "No. Alpha-Beta pruning is mathematically guaranteed to return the exact same optimal move and value as full Minimax; it only skips branches that are demonstrably worse than options already discovered."
      },
      {
        question: "How does move ordering impact the efficiency of Alpha-Beta pruning?",
        answer: "If best moves are evaluated first, Alpha and Beta tighten immediately, maximizing the number of pruned subtrees (achieving O(b^(d/2))). If worst moves are examined first, no branches are pruned, degrading to full Minimax O(b^d)."
      }
    ],
    realWorldApplications: [
      "Chess engines (Deep Blue, Stockfish) evaluating tens of millions of positions per second",
      "Connect Four and Othello perfect playing agents",
      "Automated stock market bid-ask market maker competitive strategy simulations"
    ],
    practiceProblems: [
      {
        title: "Tic-Tac-Toe Unbeatable AI",
        difficulty: "Hard",
        description: "Implement a full Tic-Tac-Toe Minimax player that guarantees it never loses against any human opponent."
      }
    ]
  },

  "ai-w3schools-python": {
    id: "ai-w3schools-python",
    title: "Python for Artificial Intelligence & Search Trees",
    subject: "Artificial Intelligence Lab",
    provider: "W3Schools Reference",
    category: "Constraint Satisfaction & Backtracking",
    readTime: "20 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/artificial-intelligence",
    simulatorName: "AI State Space Studio",
    overview:
      "A hands-on, beginner-friendly W3Schools-curated laboratory guide to solving Constraint Satisfaction Problems (CSP) using Python backtracking algorithms. Solves the classic N-Queens problem and illustrates constraint propagation, forward checking, and recursive search state recovery.",
    learningObjectives: [
      "Model problems as Constraint Satisfaction Problems (Variables, Domains, Constraints)",
      "Implement the recursive Backtracking Search algorithm in Python",
      "Formulate diagonal, row, and column non-attack constraints for N-Queens",
      "Understand constraint propagation techniques: Forward Checking and Arc Consistency (AC-3)",
      "Compare recursive backtracking against naive brute force permutation search"
    ],
    keyConcepts: [
      {
        title: "1. The CSP Formalism",
        description:
          "CSPs represent states not as atomic black boxes, but as a set of variables with values satisfying constraints.",
        points: [
          "Variables (X): {Q1, Q2, ..., QN} representing Queen columns.",
          "Domain (D): Row positions {1, 2, ..., N}.",
          "Constraints (C): No two queens share the same row, column, or diagonal: |row_i - row_j| != |col_i - col_j|."
        ]
      },
      {
        title: "2. Backtracking Optimization Heuristics",
        description:
          "General-purpose heuristics drastically prune search trees without domain-specific engineering.",
        points: [
          "Minimum Remaining Values (MRV): Choose the variable with the fewest legal values in its domain ('most constrained variable').",
          "Degree Heuristic: Choose variable with the most constraints on unassigned variables.",
          "Least Constraining Value (LCV): Pick the value that rules out the fewest choices for neighboring variables."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Check Assignment",
        description: "If all N queens are placed successfully on the board, record solution."
      },
      {
        step: 2,
        title: "Try Valid Rows",
        description: "For row in 0..N-1, verify if position is safe from existing placed queens."
      },
      {
        step: 3,
        title: "Place & Recurse / Backtrack",
        description: "If safe, place queen and recursively call solve(col + 1). If recursive branch fails, remove queen (backtrack) and try next row."
      }
    ],
    codeSnippets: {
      python: `def is_safe(board, row, col, n):
    # Check left row
    for i in range(col):
        if board[row][i] == 1:
            return False
    # Check upper diagonal
    for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
        if board[i][j] == 1:
            return False
    # Check lower diagonal
    for i, j in zip(range(row, n, 1), range(col, -1, -1)):
        if board[i][j] == 1:
            return False
    return True

def solve_n_queens(board, col, n, solutions):
    if col >= n:
        solutions.append([row[:] for row in board])
        return

    for i in range(n):
        if is_safe(board, i, col, n):
            board[i][col] = 1
            solve_n_queens(board, col + 1, n, solutions)
            board[i][col] = 0 # Backtrack

# Test 4-Queens
n = 4
board = [[0] * n for _ in range(n)]
solutions = []
solve_n_queens(board, 0, n, solutions)
print(f"Total Solutions for {n}-Queens: {len(solutions)}")`
    },
    complexityAnalysis: {
      timeComplexity: "O(N!) for backtracking search, significantly faster than brute-force O(N^N)",
      spaceComplexity: "O(N) recursion stack and board representation",
      bestCase: "O(N)",
      worstCase: "O(N!)",
      notes: "Forward checking reduces the search space by eliminating conflicting rows from future domains immediately upon queen placement."
    },
    vivaQuestions: [
      {
        question: "Why is Backtracking significantly faster than Brute Force for N-Queens?",
        answer: "Brute force checks all N^N = 4^4 = 256 or 8^8 = 16,777,216 configurations. Backtracking prunes entire subtrees the moment an invalid placement occurs at depth k, never expanding millions of invalid descendants."
      },
      {
        question: "Explain the Minimum Remaining Values (MRV) heuristic.",
        answer: "MRV selects the variable with the fewest remaining legal choices in its domain. This 'fail-first' strategy reduces the branching factor early and prunes dead-end paths immediately."
      }
    ],
    realWorldApplications: [
      "University examination and faculty timetable scheduling",
      "Air traffic controller runway gate allocation",
      "Printed circuit board (PCB) microchip routing without overlapping traces"
    ],
    practiceProblems: [
      {
        title: "Sudoku 9x9 Backtracking Solver",
        difficulty: "Hard",
        description: "Implement a Sudoku solver using recursive backtracking and constraint satisfaction checks across rows, columns, and 3x3 grids."
      }
    ]
  }
};
