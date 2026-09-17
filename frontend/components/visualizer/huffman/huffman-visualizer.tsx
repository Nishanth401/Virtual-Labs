"use client"

import { HuffmanControls } from "./huffman-controls"
import { HuffmanDisplay } from "./huffman-display"
import { HuffmanAnalysis } from "./huffman-analysis"
import { HuffmanCodes } from "./huffman-codes"
import { CompressionDisplay } from "./compression-display"
import { FrequencyList } from "./frequency-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { MultiLangCodeViewer } from "@/components/visualizer/code/multi-lang-code-viewer"
import { useHuffman } from "@/hooks/use-huffman"

interface HuffmanVisualizerProps {
  content?: React.ReactNode
}

const HUFFMAN_CODE_SNIPPETS = {
  java: `import java.util.*;

public class HuffmanCoding {
    static class Node implements Comparable<Node> {
        char ch;
        int freq;
        Node left, right;
        Node(char ch, int freq) { this.ch = ch; this.freq = freq; }
        public int compareTo(Node o) { return this.freq - o.freq; }
    }

    public static Map<Character, String> buildHuffmanCodes(String text) {
        Map<Character, Integer> freqMap = new HashMap<>();
        for (char c : text.toCharArray()) freqMap.put(c, freqMap.getOrDefault(c, 0) + 1);

        PriorityQueue<Node> pq = new PriorityQueue<>();
        for (var entry : freqMap.entrySet()) {
            pq.offer(new Node(entry.getKey(), entry.getValue()));
        }

        while (pq.size() > 1) {
            Node left = pq.poll();
            Node right = pq.poll();
            Node parent = new Node('\\0', left.freq + right.freq);
            parent.left = left;
            parent.right = right;
            pq.offer(parent);
        }

        Map<Character, String> codeMap = new HashMap<>();
        generateCodes(pq.peek(), "", codeMap);
        return codeMap;
    }

    private static void generateCodes(Node root, String code, Map<Character, String> map) {
        if (root == null) return;
        if (root.left == null && root.right == null) {
            map.put(root.ch, code);
            return;
        }
        generateCodes(root.left, code + "0", map);
        generateCodes(root.right, code + "1", map);
    }
}`,
  python: `import heapq
from collections import Counter

class HuffmanNode:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None

    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(text):
    freq = Counter(text)
    pq = [HuffmanNode(char, count) for char, count in freq.items()]
    heapq.heapify(pq)

    while len(pq) > 1:
        left = heapq.heappop(pq)
        right = heapq.heappop(pq)
        parent = HuffmanNode(None, left.freq + right.freq)
        parent.left = left
        parent.right = right
        heapq.heappush(pq, parent)

    codes = {}
    def generate_codes(node, code=""):
        if not node:
            return
        if node.char is not None:
            codes[node.char] = code
            return
        generate_codes(node.left, code + "0")
        generate_codes(node.right, code + "1")

    generate_codes(pq[0])
    return codes`,
  cpp: `#include <iostream>
#include <queue>
#include <unordered_map>
using namespace std;

struct Node {
    char ch;
    int freq;
    Node *left, *right;
    Node(char c, int f) : ch(c), freq(f), left(nullptr), right(nullptr) {}
};

struct Compare {
    bool operator()(Node* a, Node* b) { return a->freq > b->freq; }
};

void generateCodes(Node* root, string code, unordered_map<char, string>& codes) {
    if (!root) return;
    if (!root->left && !root->right) {
        codes[root->ch] = code;
        return;
    }
    generateCodes(root->left, code + "0", codes);
    generateCodes(root->right, code + "1", codes);
}

unordered_map<char, string> huffman(string text) {
    unordered_map<char, int> freq;
    for (char c : text) freq[c]++;

    priority_queue<Node*, vector<Node*>, Compare> pq;
    for (auto& [c, f] : freq) pq.push(new Node(c, f));

    while (pq.size() > 1) {
        Node* left = pq.top(); pq.pop();
        Node* right = pq.top(); pq.pop();
        Node* parent = new Node('$', left->freq + right->freq);
        parent->left = left;
        parent->right = right;
        pq.push(parent);
    }

    unordered_map<char, string> codes;
    generateCodes(pq.top(), "", codes);
    return codes;
}`,
  javascript: `class HuffmanNode {
  constructor(char, freq) {
    this.char = char;
    this.freq = freq;
    this.left = null;
    this.right = null;
  }
}

function buildHuffmanCodes(text) {
  const freq = {};
  for (const c of text) freq[c] = (freq[c] || 0) + 1;

  const nodes = Object.entries(freq).map(([c, f]) => new HuffmanNode(c, f));

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const left = nodes.shift();
    const right = nodes.shift();
    const parent = new HuffmanNode(null, left.freq + right.freq);
    parent.left = left;
    parent.right = right;
    nodes.push(parent);
  }

  const codes = {};
  function generate(node, code = "") {
    if (!node) return;
    if (node.char !== null) {
      codes[node.char] = code;
      return;
    }
    generate(node.left, code + "0");
    generate(node.right, code + "1");
  }

  generate(nodes[0]);
  return codes;
}`,
  typescript: `export class HuffmanNode {
  char: string | null;
  freq: number;
  left: HuffmanNode | null = null;
  right: HuffmanNode | null = null;
  constructor(char: string | null, freq: number) {
    this.char = char;
    this.freq = freq;
  }
}

export function buildHuffmanCodes(text: string): Record<string, string> {
  const freq: Record<string, number> = {};
  for (const c of text) freq[c] = (freq[c] || 0) + 1;

  const nodes: HuffmanNode[] = Object.entries(freq).map(([c, f]) => new HuffmanNode(c, f));

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const left = nodes.shift()!;
    const right = nodes.shift()!;
    const parent = new HuffmanNode(null, left.freq + right.freq);
    parent.left = left;
    parent.right = right;
    nodes.push(parent);
  }

  const codes: Record<string, string> = {};
  function generate(node: HuffmanNode | null, code: string = ""): void {
    if (!node) return;
    if (node.char !== null) {
      codes[node.char] = code;
      return;
    }
    generate(node.left, code + "0");
    generate(node.right, code + "1");
  }

  generate(nodes[0]);
  return codes;
}`
};

export function HuffmanVisualizer({ content }: HuffmanVisualizerProps) {
  const {
    tree,
    steps,
    currentStep,
    highlightedNodes,
    codes,
    isAnimating,
    buildHuffmanTree,
    nextStep,
    previousStep,
    reset,
    originalText,
    frequencies
  } = useHuffman()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Huffman Coding</h1>
        <p className="text-muted-foreground">
          A data compression technique that assigns variable-length codes to characters based on their frequencies.
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
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
              <HuffmanControls
                onEncode={buildHuffmanTree}
                onNext={nextStep}
                onPrevious={previousStep}
                onReset={reset}
                isAnimating={isAnimating}
                currentStep={currentStep}
                totalSteps={steps.length}
              />
              <FrequencyList frequencies={frequencies} />
              <HuffmanCodes codes={codes} />
            </div>
            <div className="xl:col-span-2 space-y-6">
              <HuffmanDisplay
                tree={tree}
                highlightedNodes={highlightedNodes}
              />
              <CompressionDisplay
                originalText={originalText}
                codes={codes}
                frequencies={frequencies}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-6">
          <HuffmanAnalysis
            originalText={originalText}
            frequencies={frequencies}
            codes={codes}
          />
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <MultiLangCodeViewer
            title="Huffman Lossless Data Compression Algorithm"
            subtitle="Priority Queue (Min-Heap) Prefix Tree builder in Java, Python, C++, JS, and TS."
            badge="Customizable IDE"
            snippets={HUFFMAN_CODE_SNIPPETS}
          />
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}