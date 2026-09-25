import { Experiment } from "../experiments";

export const ADVANCED_LABS_EXPERIMENTS: Experiment[] = [
  // Artificial Intelligence
  {
    id: "ai-exp-1",
    labId: "artificial-intelligence",
    title: "Exp 1: A* Search Algorithm & Manhattan Heuristic",
    slug: "astar-heuristic-search-algorithm",
    difficulty: "Intermediate",
    category: "Artificial Intelligence" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 140,
    simulator: "custom",
    quizId: "quiz-ai-1",
    sections: {
      introduction: "A* Search is an informed graph search evaluating f(n) = g(n) + h(n) to find shortest path routes efficiently.",
      objective: "Implement A* with PriorityQueue and admissible Manhattan distance heuristics.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "A* Heuristic Search",
      videoChannel: "Computerphile",
      prerequisites: ["Graph Search", "Heuristics"],
      theory: {
        overview: "A* combines actual cost g(n) from start with estimated cost h(n) to goal. Admissible heuristic guarantees optimality.",
        keyConcepts: [
          { title: "f(n) = g(n) + h(n)", desc: "Evaluation function balancing traveled path and remaining distance." },
          { title: "Admissibility", desc: "Never overestimates actual cost to goal." }
        ],
        complexities: [
          { operation: "A* Search", best: "O(d)", avg: "O(b^d)", worst: "O(b^d)", space: "O(b^d)" }
        ],
        realWorldApplications: ["Video game NPC pathfinding", "Robotic motion planning", "GPS map routing"]
      },
      procedure: ["1. Initialize open priority queue.", "2. Extract node with lowest f(n).", "3. Expand neighbors.", "4. Reconstruct path."],
      sampleCode: {
        language: "python",
        code: `import heapq\ndef a_star(graph, h, start, goal):\n    pq = [(h[start], 0, start, [start])]\n    visited = set()\n    while pq:\n        f, g, u, path = heapq.heappop(pq)\n        if u == goal: return path\n        if u in visited: continue\n        visited.add(u)\n        for v, cost in graph.get(u, []):\n            if v not in visited:\n                heapq.heappush(pq, (g + cost + h.get(v, 0), g + cost, v, path + [v]))\n    return None`
      },
      expectedOutput: `Path Found: ['A', 'C', 'G']`,
      leetcodeProblems: [],
      targetAudience: { ug: ["B.Tech AIDS"], pg: ["M.Tech AI"] }
    }
  }
];

