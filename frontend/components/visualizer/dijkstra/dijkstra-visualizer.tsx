"use client"

import { DijkstraControls } from "@/components/visualizer/dijkstra/dijkstra-controls"
import { DijkstraDisplay } from "@/components/visualizer/dijkstra/dijkstra-display"
import { DijkstraAnalysis } from "@/components/visualizer/dijkstra/dijkstra-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { MultiLangCodeViewer } from "@/components/visualizer/code/multi-lang-code-viewer"
import { useDijkstra } from "@/hooks/use-dijkstra"

interface DijkstraVisualizerProps {
  content?: React.ReactNode
}

const DIJKSTRA_CODE_SNIPPETS = {
  java: `import java.util.*;

public class DijkstraAlgorithm {
    static class Edge {
        int target, weight;
        Edge(int t, int w) { target = t; weight = w; }
    }

    public static int[] dijkstra(int V, List<List<Edge>> adj, int src) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
        pq.offer(new int[]{src, 0});

        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int u = curr[0], d = curr[1];

            if (d > dist[u]) continue;

            for (Edge edge : adj.get(u)) {
                if (dist[u] + edge.weight < dist[edge.target]) {
                    dist[edge.target] = dist[u] + edge.weight;
                    pq.offer(new int[]{edge.target, dist[edge.target]});
                }
            }
        }
        return dist;
    }
}`,
  python: `import heapq

def dijkstra(V, adj, src):
    """
    Dijkstra's shortest path algorithm using a Min-Heap.
    Time Complexity: O((V + E) log V), Space: O(V)
    """
    dist = [float('inf')] * V
    dist[src] = 0
    pq = [(0, src)]  # (distance, node)

    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue

        for v, weight in adj[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))

    return dist`,
  cpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

typedef pair<int, int> pii; // {distance, node}

vector<int> dijkstra(int V, vector<vector<pii>>& adj, int src) {
    vector<int> dist(V, 1e9);
    dist[src] = 0;

    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        if (d > dist[u]) continue;

        for (auto& [v, weight] : adj[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
  javascript: `function dijkstra(V, adj, src) {
  const dist = Array(V).fill(Infinity);
  dist[src] = 0;
  const visited = Array(V).fill(false);

  for (let i = 0; i < V - 1; i++) {
    let u = -1;
    for (let j = 0; j < V; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
        u = j;
      }
    }

    if (dist[u] === Infinity) break;
    visited[u] = true;

    for (const [v, weight] of adj[u]) {
      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
      }
    }
  }
  return dist;
}`,
  typescript: `export function dijkstra(V: number, adj: [number, number][][], src: number): number[] {
  const dist: number[] = Array(V).fill(Infinity);
  dist[src] = 0;
  const visited: boolean[] = Array(V).fill(false);

  for (let i = 0; i < V - 1; i++) {
    let u = -1;
    for (let j = 0; j < V; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
        u = j;
      }
    }

    if (dist[u] === Infinity) break;
    visited[u] = true;

    for (const [v, weight] of adj[u]) {
      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
      }
    }
  }
  return dist;
}`
};

export function DijkstraVisualizer({ content }: DijkstraVisualizerProps) {
  const {
    graph,
    distances,
    path,
    currentNode,
    visitedNodes,
    isAnimating,
    addNode,
    addEdge,
    setStartNode,
    setEndNode,
    findShortestPath,
    clear,
    nextStep,
    previousStep,
    currentStep,
    totalSteps,
    loadExample,
    startNodeId,
    endNodeId,
    isAutoPlaying,
    toggleAutoPlay,
  } = useDijkstra()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dijkstra's Algorithm</h1>
        <p className="text-muted-foreground">
          Visualize how Dijkstra's algorithm finds the shortest path between nodes in a weighted graph.
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="code">Multi-Lang Code</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <DijkstraControls
                onAddNode={addNode}
                onAddEdge={addEdge}
                onSetStartNode={setStartNode}
                onSetEndNode={setEndNode}
                onFindPath={findShortestPath}
                onClear={clear}
                onNext={nextStep}
                onPrevious={previousStep}
                isAnimating={isAnimating}
                currentStep={currentStep}
                totalSteps={totalSteps}
                onLoadExample={loadExample}
                startNodeId={startNodeId}
                endNodeId={endNodeId}
                path={path}
                distances={distances}
                onAutoPlay={toggleAutoPlay}
                isAutoPlaying={isAutoPlaying}
              />
            </div>
            <div className="lg:col-span-3">
              <DijkstraDisplay
                graph={graph}
                currentNode={currentNode}
                visitedNodes={visitedNodes}
                path={path}
                distances={distances}
                startNodeId={startNodeId}
                endNodeId={endNodeId}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-6">
          <DijkstraAnalysis
            distances={distances}
            path={path}
            startNodeId={startNodeId}
            endNodeId={endNodeId}
            graph={graph}
          />
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <MultiLangCodeViewer
            title="Dijkstra's Single-Source Shortest Path Algorithm"
            subtitle="Priority Queue (Min-Heap) and Adjacency List graph implementations in Java, Python, and C++."
            badge="Customizable IDE"
            snippets={DIJKSTRA_CODE_SNIPPETS}
          />
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}