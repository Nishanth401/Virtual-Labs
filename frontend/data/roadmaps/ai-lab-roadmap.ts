import { DSACategory } from "../dsa-topic-data";

export const AI_LAB_ROADMAP_CATEGORIES: DSACategory[] = [
  {
    id: "heuristic-search",
    name: "1. State-Space & Heuristic Search",
    shortDesc: "A* search algorithm, Manhattan distance heuristics, and 8-puzzle state solver.",
    iconName: "Bot",
    topics: [
      {
        id: "astar-search-algorithm",
        slug: "astar-heuristic-search-algorithm",
        title: "1. A* Heuristic Search & Manhattan Distance",
        categoryId: "heuristic-search",
        categoryName: "1. State-Space & Heuristic Search",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        gfgSearchQuery: "A* Search Algorithm GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/a-search-algorithm/",
        quickSummary: "Informed graph search evaluating f(n) = g(n) + h(n) to find the shortest path efficiently.",
        keyPoints: [
          "Evaluation Function: f(n) = g(n) (path cost from start) + h(n) (estimated heuristic cost to goal).",
          "Admissible Heuristic: h(n) never overestimates the true cost to reach the goal.",
          "Consistent (Monotonic): Satisfies triangle inequality h(A) <= cost(A, B) + h(B)."
        ],
        diagramTitle: "A* Evaluation Function Graph",
        diagram: `[ Start Node S ] ──── g(n): Actual Travelled Cost ────> [ Current Node n ]
                                                        │
                                                 h(n): Estimated Heuristic
                                                        │
                                                        ▼
                                               [ Target Goal G ]`,
        complexities: [
          { operation: "A* Search with Min-Heap", best: "O(d)", avg: "O(b^d)", worst: "O(b^d)", space: "O(b^d)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python",
            code: `import heapq

def a_star_search(graph, heuristics, start, goal):
    pq = [(heuristics[start], 0, start, [start])]
    visited = set()
    while pq:
        f, g, current, path = heapq.heappop(pq)
        if current == goal: return (path, g)
        if current in visited: continue
        visited.add(current)
        for neighbor, cost in graph.get(current, []):
            if neighbor not in visited:
                new_g = g + cost
                new_f = new_g + heuristics.get(neighbor, 0)
                heapq.heappush(pq, (new_f, new_g, neighbor, path + [neighbor]))
    return None`
          }
        ],
        practiceProblems: [
          { title: "Shortest Path in Binary Matrix", difficulty: "Medium", url: "https://leetcode.com/problems/shortest-path-in-binary-matrix/", platform: "LeetCode" }
        ]
      },
      {
        id: "eight-puzzle-solver",
        slug: "eight-puzzle-problem-heuristics",
        title: "2. 8-Puzzle Problem & State-Space Search",
        categoryId: "heuristic-search",
        categoryName: "1. State-Space & Heuristic Search",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        gfgSearchQuery: "8 Puzzle Problem Artificial Intelligence",
        gfgUrl: "https://www.geeksforgeeks.org/8-puzzle-problem-using-branch-and-bound/",
        quickSummary: "Sliding tile puzzle navigating a 3x3 grid using misplaced tile count and Manhattan distance.",
        keyPoints: [
          "State representation: 3x3 matrix with integers 1-8 and 0 (empty blank tile).",
          "Heuristic h1: Number of misplaced tiles compared to the goal state.",
          "Heuristic h2: Total Manhattan distance sum = |x1 - x2| + |y1 - y2| for each tile."
        ],
        diagramTitle: "8-Puzzle State Transition Branching",
        diagram: `Initial State:           Move Blank:           Goal State:
┌───┬───┬───┐          ┌───┬───┬───┐          ┌───┬───┬───┐
│ 1 │ 2 │ 3 │          │ 1 │ 2 │ 3 │          │ 1 │ 2 │ 3 │
├───┼───┼───┤  ───>    ├───┼───┼───┤  ───>    ├───┼───┼───┤
│ 8 │ 0 │ 4 │          │ 8 │ 4 │ 0 │          │ 8 │ 0 │ 4 │
├───┼───┼───┤          ├───┼───┼───┤          ├───┼───┼───┤
│ 7 │ 6 │ 5 │          │ 7 │ 6 │ 5 │          │ 7 │ 6 │ 5 │
└───┴───┴───┘          └───┴───┴───┘          └───┴───┴───┘`,
        complexities: [
          { operation: "Manhattan Evaluation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(State Space)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python",
            code: `def manhattan_distance(state, goal):
    dist = 0
    for i in range(3):
        for j in range(3):
            val = state[i][j]
            if val != 0:
                target_x, target_y = divmod(val - 1, 3)
                dist += abs(i - target_x) + abs(j - target_y)
    return dist`
          }
        ],
        practiceProblems: [
          { title: "Sliding Puzzle", difficulty: "Hard", url: "https://leetcode.com/problems/sliding-puzzle/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    id: "game-adversarial",
    name: "2. Game Trees & Adversarial Search",
    shortDesc: "Minimax strategy for 2-player zero-sum games and Alpha-Beta pruning.",
    iconName: "Bot",
    topics: [
      {
        id: "minimax-alpha-beta",
        slug: "minimax-algorithm-alpha-beta-pruning",
        title: "3. Minimax Algorithm & Alpha-Beta Pruning",
        categoryId: "game-adversarial",
        categoryName: "2. Game Trees & Adversarial Search",
        difficulty: "Advanced",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Minimax Algorithm in AI GeeksforGeeks",
        gfgUrl: "https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-4-alpha-beta-pruning/",
        quickSummary: "Optimal decision making in 2-player zero-sum games (Tic-Tac-Toe, Chess) with Alpha-Beta branch pruning.",
        keyPoints: [
          "MAX Player aims to maximize evaluation score; MIN Player aims to minimize score.",
          "Alpha (α): Best score MAX can guarantee so far; Beta (β): Best score MIN can guarantee so far.",
          "Pruning condition: If α >= β, discard the remaining sub-branches immediately without evaluation."
        ],
        diagramTitle: "Minimax Game Tree with Alpha-Beta Cutoffs",
        diagram: `             [ MAX: 3 ]
            /          \\
     [ MIN: 3 ]      [ MIN: <=2 ] (Pruned when β <= α)
     /        \\       /
  [ 3 ]      [ 5 ]  [ 2 ]`,
        complexities: [
          { operation: "Minimax Tree", best: "O(b^(d/2))", avg: "O(b^(3d/4))", worst: "O(b^d)", space: "O(d)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python",
            code: `def minimax(depth, node_idx, is_max, scores, alpha, beta, h):
    if depth == h: return scores[node_idx]
    if is_max:
        best = -float('inf')
        for i in range(2):
            val = minimax(depth + 1, node_idx * 2 + i, False, scores, alpha, beta, h)
            best = max(best, val)
            alpha = max(alpha, best)
            if beta <= alpha: break # Beta Pruning
        return best
    else:
        best = float('inf')
        for i in range(2):
            val = minimax(depth + 1, node_idx * 2 + i, True, scores, alpha, beta, h)
            best = min(best, val)
            beta = min(beta, best)
            if beta <= alpha: break # Alpha Pruning
        return best`
          }
        ],
        practiceProblems: [
          { title: "Predict the Winner", difficulty: "Medium", url: "https://leetcode.com/problems/predict-the-winner/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    id: "csp-expert-systems",
    name: "3. Constraint Satisfaction & Expert Reasoning",
    shortDesc: "N-Queens CSP, Backtracking search, and Forward Chaining expert systems.",
    iconName: "Bot",
    topics: [
      {
        id: "n-queens-csp",
        slug: "n-queens-constraint-satisfaction-problem",
        title: "4. N-Queens Constraint Satisfaction Problem",
        categoryId: "csp-expert-systems",
        categoryName: "3. Constraint Satisfaction & Expert Reasoning",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        gfgSearchQuery: "N Queen Problem Backtracking",
        gfgUrl: "https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/",
        quickSummary: "Places N non-attacking queens on an N×N chessboard so no two share row, column, or diagonal.",
        keyPoints: [
          "Variables: Column positions of queens Q1, Q2, ..., QN.",
          "Domain: Rows {1, 2, ..., N}.",
          "Constraints: No identical rows (r1 != r2) and no diagonal clashes (|r1 - r2| != |c1 - c2|)."
        ],
        diagramTitle: "4-Queens Backtracking Board Configuration",
        diagram: `[ .  Q  .  . ]
[ .  .  .  Q ]
[ Q  .  .  . ]
[ .  .  Q  . ]`,
        complexities: [
          { operation: "N-Queens Search", best: "O(N)", avg: "O(N!)", worst: "O(N!)", space: "O(N)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python Backtracking",
            code: `def solve_n_queens(n):
    res = []
    cols, pos_diag, neg_diag = set(), set(), set()
    board = [["."] * n for _ in range(n)]

    def backtrack(r):
        if r == n:
            res.append(["".join(row) for row in board])
            return
        for c in range(n):
            if c in cols or (r + c) in pos_diag or (r - c) in neg_diag:
                continue
            cols.add(c); pos_diag.add(r + c); neg_diag.add(r - c)
            board[r][c] = "Q"
            backtrack(r + 1)
            cols.remove(c); pos_diag.remove(r + c); neg_diag.remove(r - c)
            board[r][c] = "."

    backtrack(0)
    return res`
          }
        ],
        practiceProblems: [
          { title: "N-Queens", difficulty: "Hard", url: "https://leetcode.com/problems/n-queens/", platform: "LeetCode" }
        ]
      }
    ]
  }
];
