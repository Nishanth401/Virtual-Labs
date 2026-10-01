import { Experiment } from "../experiments";

export const ADVANCED_LABS_EXPERIMENTS: Experiment[] = [
  // =========================================================================
  // 1. POLICY ITERATION (Official IIITH Lab Experiment 1 - Screenshots 103959-104649)
  // =========================================================================
  {
    id: "ai-exp-1",
    labId: "artificial-intelligence",
    title: "Exp 1: Policy Iteration",
    slug: "policy-iteration",
    difficulty: "Intermediate",
    category: "Artificial Intelligence" as any,
    estimatedMinutes: 45,
    rating: 4.96,
    ratingsCount: 280,
    simulator: "policy-iteration",
    quizId: "quiz-ai-policy-iteration",
    sections: {
      introduction:
        "This experiment is designed to demonstrate the policy iteration algorithm applied in a Gridworld setting. It offers an interactive platform where users can observe and analyze the evolution of policies at each iteration within the Markov Decision Process (MDP). Policy Iteration is like having a map and a compass in a territory where each crossroad is a decision point that leads to different paths with varying rewards. It methodically tests and refines each route, aiming to discover the most rewarding path through the set of decisions.",
      objective:
        "• Interactive Policy Visualization: Enable users to visually track policy changes in the Gridworld at each iteration.\n• Customizable MDP Dynamics: Allow users to modify the MDP dynamics, facilitating a deeper understanding of how policy adaptation occurs under different conditions.\n• Demonstrate Convergence: Clearly illustrate the process of convergence, showing how iterative policy refinement leads to optimal decision-making in the Gridworld.\n\nThe experiment is tailored for learners interested in reinforcement learning and decision theory, providing an engaging and educational exploration of policy iteration in a controlled, yet dynamic environment.",
      videoUrl: "https://www.youtube-nocookie.com/embed/5NgNicANyqM",
      videoTitle: "Policy Iteration & Reinforcement Learning in Gridworld",
      videoChannel: "Virtual Labs AI Series",
      prerequisites: [
        "Markov Decision Processes (MDP)",
        "State and Action Spaces",
        "Bellman Expectation Equations",
        "Discount Factor γ and Expected Returns",
      ],
      theory: {
        overview:
          "Policy Iteration is a fundamental algorithm in reinforcement learning, particularly suited for optimizing decision-making processes in environments modeled by Markov Decision Processes (MDPs). It's like having a map and a compass in a territory where each crossroad is a decision point that leads to different paths with varying rewards. Policy Iteration methodically tests and refines each route, aiming to discover the most rewarding path through the set of decisions.\n\nImagine playing a game where every move dictates the outcome, but the best strategies aren't clear-cut. This is where Policy Iteration comes into play. In artificial intelligence, particularly within environments that require a series of decisions leading to a goal, we seek a guide—a policy—that consistently leads to success. Policy Iteration is the rigorous, step-wise guide that leads the path to the best possible decisions in complex, uncertain environments known as Markov Decision Processes (MDPs).\n\nConsider a game of Gridworld, where an agent must navigate through a grid to reach a goal. The agent can move up, down, left, or right, and each action leads to a different cell—or state—on the grid. Some cells might offer rewards (like coins) while others might present penalties (like traps). Policy Iteration helps the agent explore different paths, learn from each move, and ultimately find the most rewarding route to the goal.",
        keyConcepts: [
          {
            title: "Markov Decision Processes (MDPs)",
            desc: "MDPs offer a structured approach to decision-making problems where outcomes are partly random and partly under the control of a decision-maker. They are defined by: States (S): The various positions or scenarios in which the decision-maker can find themselves; Actions (A): The set of decisions or moves the decision-maker can take; Transition Probabilities (P(s'|s,a)): The likelihood of moving to a new state s' from current state s after taking action a; Reward Functions (R(s,a,s')): The immediate payoff received after moving to a new state s' due to action a; Discount Factor (γ): A metric that values immediate rewards over future ones, influencing the long-term strategy. The objective is to formulate a policy (π) that specifies the best action to take in each state to maximize the sum of rewards collected over time.",
          },
          {
            title: "Components of Policy Iteration",
            desc: "Policy Iteration consists of two interlocking stages: (1) Policy Evaluation: This is where we determine the expected return from each state if we follow the current policy; (2) Policy Improvement: Based on the evaluations, we then adjust the policy by changing the actions in certain states to those that promise better returns.",
          },
          {
            title: "Mathematical Framework & Step-by-Step Explanation",
            desc: "1. Initialization: Assign a preliminary value function V(s) and policy π(s) for all states s in S. 2. Policy Evaluation: Initialize Δ to zero. For each state s in S: keep current value V(s); recalculate V(s) based on expected returns for all next states s': V(s) = ∑_{s'} P(s'|s, π(s)) [ R(s, π(s), s') + γV(s') ]; amend Δ to greatest change in value. Iterate until Δ < θ (convergence threshold). 3. Policy Improvement: Start with policy-stable = true. For each state s in S: opt for best action a given current valuation: π(s) = argmax_a ∑_{s'} P(s'|s, a) [ R(s, a, s') + γV(s') ]. If policy action changes, mark policy-stable = false. If no changes occur, return V and π; if changes are made, resume Policy Evaluation.",
          },
          {
            title: "Convergence and Optimality",
            desc: "Policy Iteration is guaranteed to find an optimal policy π* and value function V* after a finite number of iterations, as long as the MDP has a finite set of states and actions. The resulting policy will be the one that maximizes the expected reward from any given state.",
          },
          {
            title: "Significance in Reinforcement Learning & Conclusion",
            desc: "Policy Iteration is a critical tool in reinforcement learning for defining clear and effective strategies in environments where each action leads to a new situation. Its precision and methodical nature make it particularly powerful for tasks like navigating mazes or playing strategic games where the goal is to find the most advantageous path. Its iterative process of evaluation and improvement provides a robust framework for finding the optimal sequence of decisions that lead to the best possible outcomes.",
          },
        ],
        complexities: [
          {
            operation: "Policy Evaluation Step",
            best: "O(|S|)",
            avg: "O(|S|^2)",
            worst: "O(|S|^3)",
            space: "O(|S|)",
          },
          {
            operation: "Policy Improvement Step",
            best: "O(|S| · |A|)",
            avg: "O(|S| · |A|)",
            worst: "O(|S| · |A|)",
            space: "O(|S|)",
          },
        ],
        realWorldApplications: [
          "Autonomous robotic navigation and path planning in grid maps",
          "Automated trading systems and portfolio rebalancing",
          "Inventory control and dynamic supply chain optimization",
          "Game-playing AI agents and strategic decision engines",
        ],
      },
      procedure: [
        "Step 1: Modifying the Grid - Double Click/Single Click on any cell in the grid to change its state. Terminal States: These are your target or end points (like a charging station). Blocked States: These are obstacles or no-go areas.",
        "Step 2: Adjusting Settings - Use the Control Menu to change grid size and algorithm parameters. Adjust things like grid dimensions or algorithm settings to see how they affect the outcome.",
        "Step 3: Understanding the Grid - The grid shows the State Value Function for each cell. Each cell's value represents the expected reward for moving in the directions: Left, Up, Right, Down.",
        "Step 4: Iteration and Sub-Iterations - Click 'Next Value' to progress through the current iteration step-by-step. The Sub-Iterations count increases with each step. When a terminal state or the maximum steps per iteration are reached, the iteration count increases and the steps reset to 0.",
        "Step 5: Moving to the Next Iteration - Click 'Next Iteration' to proceed to the next cycle of the algorithm. This allows you to see how the algorithm refines its strategy over time.",
        "Step 6: Learning the Policy - The Arrows in the Left Grid indicate the currently learned policy. These arrows guide you towards the most rewarding actions in each state.",
        "Step 7: Reaching the Optimal Policy - When the State Value Functions of all cells stabilize, an Optimal Policy is achieved. A message will be displayed indicating that the best strategy has been found.",
      ],
      sampleCode: {
        language: "python",
        code: `import numpy as np

# Policy Iteration in Gridworld (Sutton & Barto Algorithm)
def policy_iteration(states, actions, P, R, gamma=0.9, theta=1e-4):
    # 1. Initialization
    V = {s: 0.0 for s in states}
    pi = {s: actions[0] for s in states}
    
    while True:
        # 2. Policy Evaluation
        while True:
            delta = 0.0
            for s in states:
                if s in terminal_states: continue
                v = V[s]
                a = pi[s]
                V[s] = sum(prob * (reward + gamma * V[next_s]) 
                           for next_s, reward, prob in P[s][a])
                delta = max(delta, abs(v - V[s]))
            if delta < theta:
                break
        
        # 3. Policy Improvement
        policy_stable = True
        for s in states:
            if s in terminal_states: continue
            old_action = pi[s]
            best_action = max(actions, key=lambda a: sum(
                prob * (reward + gamma * V[next_s]) 
                for next_s, reward, prob in P[s][a]
            ))
            pi[s] = best_action
            if old_action != best_action:
                policy_stable = False
                
        if policy_stable:
            return V, pi`,
      },
      expectedOutput: `Optimal Policy Converged in 3 Iterations:
State (0,0): → (V = 0.810)
State (0,1): → (V = 0.900)
State (0,2): GOAL (V = 1.000)
State (1,0): BLOCKED
State (1,1): ↑ (V = 0.729)
State (1,2): TRAP (V = -1.000)
State (2,0): ↑ (V = 0.656)
State (2,1): ↑ (V = 0.729)
State (2,2): ← (V = 0.656)`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["Computer Science and Engineering - UG 2nd and 3rd Year"],
        pg: ["M.Tech Artificial Intelligence & Data Science", "Ph.D. AI Researchers"],
      },
    },
  },

  // =========================================================================
  // 2. VALUE ITERATION (Official IIITH Lab Experiment 2)
  // =========================================================================
  {
    id: "ai-exp-2",
    labId: "artificial-intelligence",
    title: "Exp 2: Value Iteration",
    slug: "value-iteration",
    difficulty: "Intermediate",
    category: "Artificial Intelligence" as any,
    estimatedMinutes: 40,
    rating: 4.94,
    ratingsCount: 230,
    simulator: "policy-iteration",
    quizId: "quiz-ai-value-iteration",
    sections: {
      introduction:
        "Value Iteration is an essential Dynamic Programming algorithm for solving Markov Decision Processes. Unlike Policy Iteration which waits for policy evaluation to converge before improving the policy, Value Iteration combines policy evaluation and improvement into a single Bellman Optimality update per iteration.",
      objective:
        "Analyze the Bellman Optimality equation V_{k+1}(s) = max_a ∑ P(s'|s,a) [R + γV_k(s')], study convergence rates across discount factors, and extract optimal policies directly from optimal value functions.",
      videoUrl: "https://www.youtube-nocookie.com/embed/5NgNicANyqM",
      videoTitle: "Value Iteration & Bellman Optimality Equation",
      videoChannel: "Virtual Labs AI Series",
      prerequisites: [
        "Markov Decision Processes",
        "Bellman Optimality Principle",
        "Contraction Mapping Theorem",
      ],
      theory: {
        overview:
          "Value Iteration iteratively applies the Bellman Optimality Operator to state values until the change Δ between successive iterations falls below a threshold θ. Once V* is obtained, the optimal policy π* is extracted in a single greedy pass.",
        keyConcepts: [
          {
            title: "Bellman Optimality Operator",
            desc: "V_{k+1}(s) = max_a ∑_{s',r} p(s',r|s,a) [r + γ V_k(s')]",
          },
          {
            title: "Truncated Evaluation",
            desc: "Only one sweep of evaluation is performed per backup, accelerating convergence.",
          },
        ],
        complexities: [
          { operation: "Value Iteration Sweep", best: "O(|S| · |A|)", avg: "O(|S|^2 · |A|)", worst: "O(|S|^2 · |A|)", space: "O(|S|)" },
        ],
        realWorldApplications: [
          "Spacecraft trajectory re-optimization",
          "Automated HVAC temperature control systems",
        ],
      },
      procedure: [
        "Step 1: Initialize all state values V(s) to 0.0.",
        "Step 2: For each non-terminal state, compute Q(s,a) for all legal actions.",
        "Step 3: Update V(s) with the maximum Q-value.",
        "Step 4: Repeat until max |V_{k+1}(s) - V_k(s)| < θ.",
        "Step 5: Extract policy π*(s) = argmax_a Q(s,a).",
      ],
      sampleCode: {
        language: "python",
        code: `def value_iteration(states, actions, P, gamma=0.9, theta=1e-4):\n    V = {s: 0.0 for s in states}\n    while True:\n        delta = 0\n        for s in states:\n            if s in terminal_states: continue\n            v = V[s]\n            V[s] = max(sum(prob * (r + gamma * V[ns]) for ns, r, prob in P[s][a]) for a in actions)\n            delta = max(delta, abs(v - V[s]))\n        if delta < theta: break\n    return V`,
      },
      expectedOutput: `Optimal Value Function V* calculated in 14 sweeps.`,
      targetAudience: {
        ug: ["Computer Science and Engineering - UG 2nd and 3rd Year"],
        pg: ["M.Tech AI & Data Science"],
      },
    },
  },

  // =========================================================================
  // 3. Q-LEARNING (Official IIITH Lab Experiment 3)
  // =========================================================================
  {
    id: "ai-exp-3",
    labId: "artificial-intelligence",
    title: "Exp 3: Q learning",
    slug: "q-learning",
    difficulty: "Advanced",
    category: "Artificial Intelligence" as any,
    estimatedMinutes: 50,
    rating: 4.98,
    ratingsCount: 310,
    simulator: "policy-iteration",
    quizId: "quiz-ai-q-learning",
    sections: {
      introduction:
        "Q-Learning is a model-free, off-policy Temporal Difference reinforcement learning algorithm that learns the quality of state-action pairs without requiring prior knowledge of transition dynamics P(s'|s,a) or reward distributions.",
      objective:
        "Simulate agent interactions in an unknown environment, update the Q-table using TD errors Q(s,a) ← Q(s,a) + α [R + γ max_{a'} Q(s',a') - Q(s,a)], and analyze the exploration-exploitation tradeoff with ε-greedy policies.",
      videoUrl: "https://www.youtube-nocookie.com/embed/5NgNicANyqM",
      videoTitle: "Model-Free Q-Learning Algorithm Explained",
      videoChannel: "Virtual Labs AI Series",
      prerequisites: ["Temporal Difference Learning", "Exploration vs Exploitation", "Markov Decision Processes"],
      theory: {
        overview:
          "In Q-learning, the agent explores states and updates action-values using sample experiences (s, a, r, s'). Because it takes the maximum over next-state actions regardless of the action actually taken, it is off-policy and converges to Q* under standard Robbins-Monro conditions.",
        keyConcepts: [
          { title: "Temporal Difference Error", desc: "TD Error = R + γ max_{a'} Q(s',a') - Q(s,a)" },
          { title: "ε-Greedy Exploration", desc: "Select random action with probability ε, otherwise exploit greedy action." },
        ],
        complexities: [
          { operation: "Q-Update per Step", best: "O(1)", avg: "O(|A|)", worst: "O(|A|)", space: "O(|S| · |A|)" },
        ],
        realWorldApplications: ["Self-driving vehicle lane centering", "Atari game learning agents", "Drone landing control"],
      },
      procedure: [
        "Step 1: Initialize Q(s,a) table arbitrarily for all states and actions.",
        "Step 2: Observe current state s.",
        "Step 3: Select action a using ε-greedy strategy.",
        "Step 4: Execute action a, observe reward r and next state s'.",
        "Step 5: Update Q(s,a) with learning rate α and discount γ.",
        "Step 6: Repeat until episode termination.",
      ],
      sampleCode: {
        language: "python",
        code: `import numpy as np\ndef q_learning(env, episodes=500, alpha=0.1, gamma=0.9, epsilon=0.1):\n    Q = np.zeros((env.num_states, env.num_actions))\n    for ep in range(episodes):\n        s = env.reset()\n        done = False\n        while not done:\n            if np.random.rand() < epsilon: a = np.random.choice(env.num_actions)\n            else: a = np.argmax(Q[s])\n            ns, r, done = env.step(a)\n            Q[s, a] += alpha * (r + gamma * np.max(Q[ns]) - Q[s, a])\n            s = ns\n    return Q`,
      },
      expectedOutput: `Q-Table successfully trained over 500 episodes with ε decay.`,
      targetAudience: { ug: ["CSE UG 3rd Year"], pg: ["M.Tech AI"] },
    },
  },

  // =========================================================================
  // 4. AI DEPTH FIRST SEARCH (Official IIITH Lab Experiment 4)
  // =========================================================================
  {
    id: "ai-exp-4",
    labId: "artificial-intelligence",
    title: "Exp 4: AI Depth First Search",
    slug: "ai-depth-first-search",
    difficulty: "Beginner",
    category: "Artificial Intelligence" as any,
    estimatedMinutes: 35,
    rating: 4.91,
    ratingsCount: 195,
    simulator: "recursion",
    quizId: "quiz-ai-dfs",
    sections: {
      introduction:
        "AI Depth First Search (DFS) is an uninformed state-space exploration technique that systematically traverses down paths to the deepest leaf before backtracking. In AI problem solving, DFS forms the foundation for constraint satisfaction and game tree algorithms.",
      objective:
        "Implement uninformed graph search using an explicit LIFO frontier, handle cycle detection with visited sets, and evaluate completeness and optimality tradeoffs.",
      videoUrl: "https://www.youtube-nocookie.com/embed/5NgNicANyqM",
      videoTitle: "Depth First Search in AI State Spaces",
      videoChannel: "Virtual Labs AI Series",
      prerequisites: ["Graph Representation", "State Space Formulation", "Stack Data Structure"],
      theory: {
        overview:
          "DFS expands the deepest unexpanded node in the current frontier. While memory-efficient with O(b·m) space complexity, it is neither complete in infinite trees nor optimal for uniform step costs.",
        keyConcepts: [
          { title: "Completeness", desc: "Complete in finite state spaces with loop checking; incomplete in infinite spaces." },
          { title: "Space Complexity", desc: "Linear in depth: O(b · m), where b is branching factor and m is maximum depth." },
        ],
        complexities: [
          { operation: "DFS Search", best: "O(1)", avg: "O(b^m)", worst: "O(b^m)", space: "O(b · m)" },
        ],
        realWorldApplications: ["Maze solving", "Topological sorting of dependencies", "Game state tree exploration"],
      },
      procedure: [
        "Step 1: Put initial start state on the stack frontier.",
        "Step 2: Pop node n from stack.",
        "Step 3: If n is the goal state, return the solution path.",
        "Step 4: If n is not in visited, mark visited and push successors onto stack.",
        "Step 5: Repeat until goal is found or stack is empty.",
      ],
      sampleCode: {
        language: "python",
        code: `def ai_dfs(graph, start, goal):\n    stack = [(start, [start])]\n    visited = set()\n    while stack:\n        node, path = stack.pop()\n        if node == goal: return path\n        if node not in visited:\n            visited.add(node)\n            for neighbor in reversed(graph.get(node, [])):\n                if neighbor not in visited:\n                    stack.append((neighbor, path + [neighbor]))\n    return None`,
      },
      expectedOutput: `DFS Path: ['A', 'B', 'D', 'H', 'Goal']`,
      targetAudience: { ug: ["CSE UG 2nd Year"], pg: ["M.Tech AI"] },
    },
  },

  // =========================================================================
  // 5. GREEDY BEST FIRST SEARCH (Official IIITH Lab Experiment 5)
  // =========================================================================
  {
    id: "ai-exp-5",
    labId: "artificial-intelligence",
    title: "Exp 5: Greedy Best First Search",
    slug: "greedy-best-first-search",
    difficulty: "Intermediate",
    category: "Artificial Intelligence" as any,
    estimatedMinutes: 40,
    rating: 4.93,
    ratingsCount: 215,
    simulator: "custom",
    quizId: "quiz-ai-gbfs",
    sections: {
      introduction:
        "Greedy Best First Search (GBFS) is an informed heuristic search strategy that evaluates candidate nodes solely based on their estimated proximity to the goal using a heuristic function f(n) = h(n).",
      objective:
        "Explore how heuristic information guides search direction, analyze situations where greedy choices lead to suboptimal solutions or susceptibility to dead-ends, and compare GBFS with A* search.",
      videoUrl: "https://www.youtube-nocookie.com/embed/5NgNicANyqM",
      videoTitle: "Greedy Best First Search vs A*",
      videoChannel: "Virtual Labs AI Series",
      prerequisites: ["Heuristic Functions", "Priority Queues", "Informed State-Space Search"],
      theory: {
        overview:
          "GBFS always expands the node that appears closest to the goal according to h(n). While extremely fast in well-behaved search spaces, it ignores path cost g(n), making it neither complete nor optimal.",
        keyConcepts: [
          { title: "Evaluation Function", desc: "f(n) = h(n), ordering nodes purely by heuristic estimate." },
          { title: "Sub-optimality", desc: "Can be deceived by local minima and take circuitous detours." },
        ],
        complexities: [
          { operation: "GBFS Search", best: "O(d)", avg: "O(b^m)", worst: "O(b^m)", space: "O(b^m)" },
        ],
        realWorldApplications: ["Fast video game pathfinding", "Heuristic web crawlers", "Quick routing approximations"],
      },
      procedure: [
        "Step 1: Insert start node into priority queue ordered by h(n).",
        "Step 2: Dequeue node with minimal h(n).",
        "Step 3: If node is goal, terminate with path.",
        "Step 4: Generate successors, calculate h(successor), and push to priority queue.",
        "Step 5: Repeat until goal reached.",
      ],
      sampleCode: {
        language: "python",
        code: `import heapq\ndef gbfs(graph, h, start, goal):\n    pq = [(h[start], start, [start])]\n    visited = set()\n    while pq:\n        _, curr, path = heapq.heappop(pq)\n        if curr == goal: return path\n        if curr in visited: continue\n        visited.add(curr)\n        for neighbor in graph.get(curr, []):\n            if neighbor not in visited:\n                heapq.heappush(pq, (h[neighbor], neighbor, path + [neighbor]))\n    return None`,
      },
      expectedOutput: `Greedy Path Found: ['Arad', 'Sibiu', 'Fagaras', 'Bucharest']`,
      targetAudience: { ug: ["CSE UG 2nd & 3rd Year"], pg: ["M.Tech AI"] },
    },
  },

  // =========================================================================
  // 6. MINIMAX SEARCH (Official IIITH Lab Experiment 6)
  // =========================================================================
  {
    id: "ai-exp-6",
    labId: "artificial-intelligence",
    title: "Exp 6: Minimax Search",
    slug: "minimax-search",
    difficulty: "Intermediate",
    category: "Artificial Intelligence" as any,
    estimatedMinutes: 45,
    rating: 4.97,
    ratingsCount: 340,
    simulator: "recursion",
    quizId: "quiz-ai-minimax",
    sections: {
      introduction:
        "Minimax Search is the cornerstone of adversarial game playing for deterministic, turn-based, two-player zero-sum games with perfect information (such as Tic-Tac-Toe, Chess, and Checkers).",
      objective:
        "Model zero-sum game trees with alternating MAX and MIN layers, compute minimax values by recursive backtracking, and integrate Alpha-Beta pruning to discard suboptimal game branches without loss of precision.",
      videoUrl: "https://www.youtube-nocookie.com/embed/5NgNicANyqM",
      videoTitle: "Minimax Algorithm & Alpha-Beta Pruning",
      videoChannel: "Virtual Labs AI Series",
      prerequisites: ["Game Trees", "Recursive Backtracking", "Zero-Sum Games"],
      theory: {
        overview:
          "MAX seeks to maximize the payoff while MIN seeks to minimize it. Alpha-Beta pruning maintains α (the highest payoff MAX is guaranteed) and β (the lowest payoff MIN is guaranteed) and prunes whenever α ≥ β.",
        keyConcepts: [
          { title: "Minimax Decision Rule", desc: "V(s) = max_a V(s') for MAX player; min_a V(s') for MIN player." },
          { title: "Alpha-Beta Pruning", desc: "Cuts branch evaluation from O(b^d) to O(b^{d/2}) under optimal move ordering." },
        ],
        complexities: [
          { operation: "Standard Minimax", best: "O(b^d)", avg: "O(b^d)", worst: "O(b^d)", space: "O(b · d)" },
          { operation: "With Alpha-Beta", best: "O(b^{d/2})", avg: "O(b^{3d/4})", worst: "O(b^d)", space: "O(b · d)" },
        ],
        realWorldApplications: ["Chess engines (Stockfish)", "Checkers AI", "Strategic board game evaluation"],
      },
      procedure: [
        "Step 1: Construct root node representing current game board.",
        "Step 2: Call minimax(node, depth, is_max, alpha, beta).",
        "Step 3: If node is terminal or depth limit reached, return static evaluation.",
        "Step 4: For MAX: update alpha = max(alpha, eval); if beta <= alpha break.",
        "Step 5: For MIN: update beta = min(beta, eval); if beta <= alpha break.",
        "Step 6: Return optimal move from root.",
      ],
      sampleCode: {
        language: "python",
        code: `def minimax_alpha_beta(node, depth, is_maximizing, alpha, beta):\n    if depth == 0 or node.is_terminal():\n        return node.evaluate()\n    if is_maximizing:\n        max_eval = -float('inf')\n        for child in node.children():\n            ev = minimax_alpha_beta(child, depth - 1, False, alpha, beta)\n            max_eval = max(max_eval, ev)\n            alpha = max(alpha, ev)\n            if beta <= alpha: break\n        return max_eval\n    else:\n        min_eval = float('inf')\n        for child in node.children():\n            ev = minimax_alpha_beta(child, depth - 1, True, alpha, beta)\n            min_eval = min(min_eval, ev)\n            beta = min(beta, ev)\n            if beta <= alpha: break\n        return min_eval`,
      },
      expectedOutput: `Minimax Optimal Action: Move to Center (Utility = +1.0, Pruned 18 branches)`,
      targetAudience: { ug: ["CSE UG 2nd & 3rd Year"], pg: ["M.Tech AI"] },
    },
  },

  // =========================================================================
  // 7. CONSTRUCTION OF BAYESIAN NETWORK (Official IIITH Lab Experiment 7)
  // =========================================================================
  {
    id: "ai-exp-7",
    labId: "artificial-intelligence",
    title: "Exp 7: Construction of Bayesian Network",
    slug: "construction-bayesian-network",
    difficulty: "Advanced",
    category: "Artificial Intelligence" as any,
    estimatedMinutes: 45,
    rating: 4.95,
    ratingsCount: 220,
    simulator: "custom",
    quizId: "quiz-ai-bayes-construct",
    sections: {
      introduction:
        "A Bayesian Network is a Directed Acyclic Graph (DAG) that represents uncertain domain knowledge using conditional probability distributions. It enables compact representation of the full joint probability distribution by exploiting conditional independence.",
      objective:
        "Construct Bayesian Networks from domain specifications (such as the classic Burglary-Earthquake-Alarm network), specify Conditional Probability Tables (CPTs), and verify d-separation and conditional independence properties.",
      videoUrl: "https://www.youtube-nocookie.com/embed/5NgNicANyqM",
      videoTitle: "Bayesian Networks Representation and Construction",
      videoChannel: "Virtual Labs AI Series",
      prerequisites: ["Probability Axioms", "Conditional Probability & Bayes Rule", "Directed Acyclic Graphs (DAG)"],
      theory: {
        overview:
          "By the chain rule of probability factored by topological ordering: P(X_1, ..., X_n) = ∏_{i=1}^n P(X_i | Parents(X_i)). This reduces exponential parameter requirements O(2^n) to polynomial bounds O(n · 2^k), where k is the maximum number of parents.",
        keyConcepts: [
          { title: "Chain Rule Factorization", desc: "P(x_1, ..., x_n) = ∏ P(x_i | parents(X_i))" },
          { title: "d-Separation", desc: "Determines whether a set of variables X is conditionally independent of Y given Z." },
        ],
        complexities: [
          { operation: "CPT Storage", best: "O(n)", avg: "O(n · 2^k)", worst: "O(2^n)", space: "O(n · 2^k)" },
        ],
        realWorldApplications: ["Medical disease diagnostic systems", "Spam filtering engines", "Risk assessment & credit scoring"],
      },
      procedure: [
        "Step 1: Identify key random variables in the domain.",
        "Step 2: Choose a topological ordering of variables.",
        "Step 3: For each variable X_i, select the minimal set of parents that render X_i conditionally independent of previous variables.",
        "Step 4: Draw directed edges from each parent to X_i.",
        "Step 5: Fill in the Conditional Probability Table (CPT) for each node.",
      ],
      sampleCode: {
        language: "python",
        code: `from pgmpy.models import DiscreteBayesianNetwork\nfrom pgmpy.factors.discrete import TabularCPD\n\n# Construct Burglary-Alarm Network\nmodel = DiscreteBayesianNetwork([('Burglary', 'Alarm'), ('Earthquake', 'Alarm'), ('Alarm', 'JohnCalls')])\ncpd_b = TabularCPD('Burglary', 2, [[0.999], [0.001]])\ncpd_e = TabularCPD('Earthquake', 2, [[0.998], [0.002]])\ncpd_a = TabularCPD('Alarm', 2, [[0.999, 0.71, 0.06, 0.05], [0.001, 0.29, 0.94, 0.95]], \n                   evidence=['Burglary', 'Earthquake'], evidence_card=[2, 2])\nmodel.add_cpds(cpd_b, cpd_e, cpd_a)\nassert model.check_model()`,
      },
      expectedOutput: `Bayesian Network Topology validated: 3 nodes, 3 edges, CPTs consistent.`,
      targetAudience: { ug: ["CSE UG 3rd Year"], pg: ["M.Tech AI & Data Science"] },
    },
  },

  // =========================================================================
  // 8. INFERENCE FROM BAYESIAN NETWORK (Official IIITH Lab Experiment 8)
  // =========================================================================
  {
    id: "ai-exp-8",
    labId: "artificial-intelligence",
    title: "Exp 8: Inference from Bayesian Network",
    slug: "inference-bayesian-network",
    difficulty: "Advanced",
    category: "Artificial Intelligence" as any,
    estimatedMinutes: 50,
    rating: 4.96,
    ratingsCount: 260,
    simulator: "custom",
    quizId: "quiz-ai-bayes-inference",
    sections: {
      introduction:
        "Probabilistic inference in Bayesian Networks computes the posterior probability distribution for a query variable given observed evidence: P(Query | Evidence).",
      objective:
        "Implement exact inference by enumeration and variable elimination, study approximate inference via Markov Chain Monte Carlo (MCMC) and rejection sampling, and analyze computational hardness (NP-hard in general).",
      videoUrl: "https://www.youtube-nocookie.com/embed/5NgNicANyqM",
      videoTitle: "Probabilistic Inference in Bayesian Networks",
      videoChannel: "Virtual Labs AI Series",
      prerequisites: ["Bayesian Networks", "Bayes Rule", "Dynamic Programming & Factor Elimination"],
      theory: {
        overview:
          "Exact inference computes P(X | e) = α P(X, e) = α ∑_y P(X, e, y) by summing out hidden variables Y. Variable elimination optimizes this by interleaving factors to avoid duplicate sub-computations.",
        keyConcepts: [
          { title: "Inference by Enumeration", desc: "Sum over all joint configurations matching query and evidence: P(Q|e) = α ∑_h P(Q, e, h)." },
          { title: "Variable Elimination", desc: "Maintains intermediate probability factors, summing out hidden variables one at a time." },
        ],
        complexities: [
          { operation: "Exact Inference (Polytree)", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
          { operation: "Exact Inference (General DAG)", best: "O(n)", avg: "O(2^w)", worst: "O(2^n)", space: "O(2^w)" },
        ],
        realWorldApplications: ["Genomic pedigree inference", "Fault isolation in complex electrical networks", "Predictive maintenance"],
      },
      procedure: [
        "Step 1: Set evidence variables to their observed values.",
        "Step 2: Collect all CPTs containing query, evidence, or hidden variables.",
        "Step 3: Eliminate hidden variables in optimal order by multiplying relevant factors and summing out.",
        "Step 4: Multiply remaining factors and normalize results to sum to 1.0.",
      ],
      sampleCode: {
        language: "python",
        code: `from pgmpy.inference import VariableElimination\ninfer = VariableElimination(model)\n# Query probability of Burglary given JohnCalls=True\nresult = infer.query(variables=['Burglary'], evidence={'JohnCalls': 1})\nprint(result)`,
      },
      expectedOutput: `+---------------+------------------+
| Burglary      |   phi(Burglary)  |
+===============+==================+
| Burglary(0)   |           0.9841 |
+---------------+------------------+
| Burglary(1)   |           0.0159 |
+---------------+------------------+`,
      targetAudience: { ug: ["CSE UG 3rd Year"], pg: ["M.Tech AI & Data Science"] },
    },
  },
];
