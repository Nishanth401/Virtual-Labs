"use client"

import { AVLTreeControls } from "@/components/visualizer/avl-tree/avl-tree-controls"
import { AVLTreeDisplay } from "@/components/visualizer/avl-tree/avl-tree-display"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { MultiLangCodeViewer } from "@/components/visualizer/code/multi-lang-code-viewer"
import { useAVLTree } from "@/hooks/use-avl-tree"
import { AVLTreeAnalysis } from "./avl-tree-analysis"

interface AVLTreeVisualizerProps {
  content?: React.ReactNode
}

const AVL_TREE_CODE_SNIPPETS = {
  java: `public class AVLTree {
    static class Node {
        int key, height;
        Node left, right;
        Node(int d) { key = d; height = 1; }
    }

    private Node root;

    int height(Node N) {
        return N == null ? 0 : N.height;
    }

    int getBalance(Node N) {
        return N == null ? 0 : height(N.left) - height(N.right);
    }

    Node rightRotate(Node y) {
        Node x = y.left;
        Node T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        return x;
    }

    Node leftRotate(Node x) {
        Node y = x.right;
        Node T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        return y;
    }

    public void insert(int key) {
        root = insertRec(root, key);
    }

    private Node insertRec(Node node, int key) {
        if (node == null) return new Node(key);
        if (key < node.key) node.left = insertRec(node.left, key);
        else if (key > node.key) node.right = insertRec(node.right, key);
        else return node;

        node.height = 1 + Math.max(height(node.left), height(node.right));
        int balance = getBalance(node);

        // Left Left Case
        if (balance > 1 && key < node.left.key) return rightRotate(node);
        // Right Right Case
        if (balance < -1 && key > node.right.key) return leftRotate(node);
        // Left Right Case
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        // Right Left Case
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        return node;
    }
}`,
  python: `class AVLNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1

class AVLTree:
    def get_height(self, node):
        return node.height if node else 0

    def get_balance(self, node):
        return self.get_height(node.left) - self.get_height(node.right) if node else 0

    def right_rotate(self, y):
        x = y.left
        T2 = x.right
        x.right = y
        y.left = T2
        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))
        x.height = 1 + max(self.get_height(x.left), self.get_height(x.right))
        return x

    def left_rotate(self, x):
        y = x.right
        T2 = y.left
        y.left = x
        x.right = T2
        x.height = 1 + max(self.get_height(x.left), self.get_height(x.right))
        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))
        return y

    def insert(self, root, key):
        if not root:
            return AVLNode(key)
        elif key < root.key:
            root.left = self.insert(root.left, key)
        else:
            root.right = self.insert(root.right, key)

        root.height = 1 + max(self.get_height(root.left), self.get_height(root.right))
        balance = self.get_balance(root)

        if balance > 1 and key < root.left.key:
            return self.right_rotate(root)
        if balance < -1 and key > root.right.key:
            return self.left_rotate(root)
        if balance > 1 and key > root.left.key:
            root.left = self.left_rotate(root.left)
            return self.right_rotate(root)
        if balance < -1 and key < root.right.key:
            root.right = self.right_rotate(root.right)
            return self.left_rotate(root)

        return root`,
  cpp: `#include <iostream>
#include <algorithm>

struct Node {
    int key, height;
    Node *left, *right;
    Node(int k) : key(k), height(1), left(nullptr), right(nullptr) {}
};

int height(Node* N) { return N ? N->height : 0; }
int getBalance(Node* N) { return N ? height(N->left) - height(N->right) : 0; }

Node* rightRotate(Node* y) {
    Node* x = y->left;
    Node* T2 = x->right;
    x->right = y;
    y->left = T2;
    y->height = std::max(height(y->left), height(y->right)) + 1;
    x->height = std::max(height(x->left), height(x->right)) + 1;
    return x;
}

Node* leftRotate(Node* x) {
    Node* y = x->right;
    Node* T2 = y->left;
    y->left = x;
    x->right = T2;
    x->height = std::max(height(x->left), height(x->right)) + 1;
    y->height = std::max(height(y->left), height(y->right)) + 1;
    return y;
}

Node* insert(Node* node, int key) {
    if (!node) return new Node(key);
    if (key < node->key) node->left = insert(node->left, key);
    else if (key > node->key) node->right = insert(node->right, key);
    else return node;

    node->height = 1 + std::max(height(node->left), height(node->right));
    int balance = getBalance(node);

    if (balance > 1 && key < node->left->key) return rightRotate(node);
    if (balance < -1 && key > node->right->key) return leftRotate(node);
    if (balance > 1 && key > node->left->key) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }
    if (balance < -1 && key < node->right->key) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }
    return node;
}`,
  javascript: `class AVLNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    return x;
  }

  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    return y;
  }

  insert(root, key) {
    if (!root) return new AVLNode(key);
    if (key < root.key) root.left = this.insert(root.left, key);
    else if (key > root.key) root.right = this.insert(root.right, key);
    else return root;

    root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
    const balance = this.getBalance(root);

    if (balance > 1 && key < root.left.key) return this.rightRotate(root);
    if (balance < -1 && key > root.right.key) return this.leftRotate(root);
    if (balance > 1 && key > root.left.key) {
      root.left = this.leftRotate(root.left);
      return this.rightRotate(root);
    }
    if (balance < -1 && key < root.right.key) {
      root.right = this.rightRotate(root.right);
      return this.leftRotate(root);
    }
    return root;
  }
}`,
  typescript: `export class AVLNode {
  key: number;
  left: AVLNode | null = null;
  right: AVLNode | null = null;
  height: number = 1;
  constructor(key: number) { this.key = key; }
}

export class AVLTree {
  public getHeight(node: AVLNode | null): number {
    return node ? node.height : 0;
  }

  public getBalance(node: AVLNode | null): number {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  public insert(root: AVLNode | null, key: number): AVLNode {
    if (!root) return new AVLNode(key);
    if (key < root.key) root.left = this.insert(root.left, key);
    else if (key > root.key) root.right = this.insert(root.right, key);
    else return root;

    root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
    const balance = this.getBalance(root);

    if (balance > 1 && key < (root.left?.key ?? 0)) return this.rightRotate(root);
    if (balance < -1 && key > (root.right?.key ?? 0)) return this.leftRotate(root);
    if (balance > 1 && key > (root.left?.key ?? 0)) {
      root.left = this.leftRotate(root.left!);
      return this.rightRotate(root);
    }
    if (balance < -1 && key < (root.right?.key ?? 0)) {
      root.right = this.rightRotate(root.right!);
      return this.leftRotate(root);
    }
    return root;
  }

  private rightRotate(y: AVLNode): AVLNode {
    const x = y.left!;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    return x;
  }

  private leftRotate(x: AVLNode): AVLNode {
    const y = x.right!;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    return y;
  }
}`
};

export function AVLTreeVisualizer({ content }: AVLTreeVisualizerProps) {
  const { 
    tree, 
    highlightedNodes, 
    insert, 
    inorderTraversal, 
    preorderTraversal, 
    postorderTraversal, 
    clear,
    isAnimating,
    traversalHistory,
    rotationHistory,
  } = useAVLTree()

  const handleTraversal = async (type: "inorder" | "preorder" | "postorder") => {
    switch (type) {
      case "inorder":
        await inorderTraversal()
        break
      case "preorder":
        await preorderTraversal()
        break
      case "postorder":
        await postorderTraversal()
        break
    }
  }

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AVL Tree</h1>
        <p className="text-muted-foreground">
          A self-balancing binary search tree where the heights of the two child subtrees of any node differ by at most one.
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
              <AVLTreeControls 
                onInsert={insert}
                onTraversal={handleTraversal}
                onClear={clear}
                isAnimating={isAnimating}
                traversalHistory={traversalHistory}
                rotationHistory={rotationHistory}
              />
              <AVLTreeAnalysis 
                tree={tree}
                rotationHistory={rotationHistory}
                traversalHistory={traversalHistory}
              />
            </div>
            <div className="xl:col-span-2">
              <AVLTreeDisplay 
                tree={tree}
                highlightedNodes={highlightedNodes}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-6">
          <AVLTreeAnalysis 
            tree={tree}
            rotationHistory={rotationHistory}
            traversalHistory={traversalHistory}
          />
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <MultiLangCodeViewer
            title="AVL Self-Balancing Binary Search Tree"
            subtitle="Rotations (LL, RR, LR, RL) and logarithmic self-balancing height maintenance in Java, Python, and C++."
            snippets={AVL_TREE_CODE_SNIPPETS}
          />
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}