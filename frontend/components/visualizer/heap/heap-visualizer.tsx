"use client"

import { HeapControls } from "@/components/visualizer/heap/heap-controls"
import { HeapDisplay } from "@/components/visualizer/heap/heap-display"
import { HeapArray } from "@/components/visualizer/heap/heap-array"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { MultiLangCodeViewer } from "@/components/visualizer/code/multi-lang-code-viewer"
import { useHeap } from "@/hooks/use-heap"

interface HeapVisualizerProps {
  content?: React.ReactNode
}

const HEAP_CODE_SNIPPETS = {
  java: `public class BinaryHeap {
    private int[] heap;
    private int size = 0;
    private boolean isMaxHeap = true;

    public BinaryHeap(int capacity, boolean isMaxHeap) {
        this.heap = new int[capacity];
        this.isMaxHeap = isMaxHeap;
    }

    public void insert(int val) {
        if (size == heap.length) throw new IllegalStateException("Heap is full");
        heap[size] = val;
        heapifyUp(size);
        size++;
    }

    public int extractRoot() {
        if (size == 0) throw new IllegalStateException("Heap is empty");
        int root = heap[0];
        heap[0] = heap[size - 1];
        size--;
        heapifyDown(0);
        return root;
    }

    private void heapifyUp(int i) {
        while (i > 0) {
            int parent = (i - 1) / 2;
            if (compare(heap[i], heap[parent])) {
                swap(i, parent);
                i = parent;
            } else break;
        }
    }

    private void heapifyDown(int i) {
        while (2 * i + 1 < size) {
            int left = 2 * i + 1, right = 2 * i + 2, target = left;
            if (right < size && compare(heap[right], heap[left])) target = right;
            if (compare(heap[target], heap[i])) {
                swap(i, target);
                i = target;
            } else break;
        }
    }

    private boolean compare(int a, int b) {
        return isMaxHeap ? a > b : a < b;
    }

    private void swap(int i, int j) {
        int temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }
}`,
  python: `class BinaryHeap:
    def __init__(self, is_max_heap=True):
        self.heap = []
        self.is_max_heap = is_max_heap

    def insert(self, val):
        self.heap.append(val)
        self._heapify_up(len(self.heap) - 1)

    def extract_root(self):
        if not self.heap:
            raise IndexError("Heap is empty")
        root = self.heap[0]
        last = self.heap.pop()
        if self.heap:
            self.heap[0] = last
            self._heapify_down(0)
        return root

    def _compare(self, a, b):
        return a > b if self.is_max_heap else a < b

    def _heapify_up(self, i):
        while i > 0:
            p = (i - 1) // 2
            if self._compare(self.heap[i], self.heap[p]):
                self.heap[i], self.heap[p] = self.heap[p], self.heap[i]
                i = p
            else:
                break

    def _heapify_down(self, i):
        n = len(self.heap)
        while 2 * i + 1 < n:
            left = 2 * i + 1
            right = 2 * i + 2
            target = left
            if right < n and self._compare(self.heap[right], self.heap[left]):
                target = right
            if self._compare(self.heap[target], self.heap[i]):
                self.heap[i], self.heap[target] = self.heap[target], self.heap[i]
                i = target
            else:
                break`,
  cpp: `#include <vector>
#include <iostream>
#include <stdexcept>

class BinaryHeap {
private:
    std::vector<int> heap;
    bool isMaxHeap;

    bool compare(int a, int b) {
        return isMaxHeap ? a > b : a < b;
    }

public:
    BinaryHeap(bool maxHeap = true) : isMaxHeap(maxHeap) {}

    void insert(int val) {
        heap.push_back(val);
        int i = heap.size() - 1;
        while (i > 0) {
            int p = (i - 1) / 2;
            if (compare(heap[i], heap[p])) {
                std::swap(heap[i], heap[p]);
                i = p;
            } else break;
        }
    }

    int extractRoot() {
        if (heap.empty()) throw std::runtime_error("Heap is empty");
        int root = heap.front();
        heap[0] = heap.back();
        heap.pop_back();

        int i = 0, n = heap.size();
        while (2 * i + 1 < n) {
            int left = 2 * i + 1, right = 2 * i + 2, target = left;
            if (right < n && compare(heap[right], heap[left])) target = right;
            if (compare(heap[target], heap[i])) {
                std::swap(heap[i], heap[target]);
                i = target;
            } else break;
        }
        return root;
    }
};`,
  javascript: `class BinaryHeap {
  constructor(isMaxHeap = true) {
    this.heap = [];
    this.isMaxHeap = isMaxHeap;
  }

  insert(val) {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.compare(this.heap[i], this.heap[p])) {
        [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
        i = p;
      } else break;
    }
  }

  extractRoot() {
    if (this.heap.length === 0) return null;
    const root = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }
    return root;
  }

  compare(a, b) {
    return this.isMaxHeap ? a > b : a < b;
  }

  heapifyDown(i) {
    const n = this.heap.length;
    while (2 * i + 1 < n) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let target = left;
      if (right < n && this.compare(this.heap[right], this.heap[left])) target = right;
      if (this.compare(this.heap[target], this.heap[i])) {
        [this.heap[i], this.heap[target]] = [this.heap[target], this.heap[i]];
        i = target;
      } else break;
    }
  }
}`,
  typescript: `export class BinaryHeap {
  private heap: number[] = [];
  private isMaxHeap: boolean;

  constructor(isMaxHeap: boolean = true) {
    this.isMaxHeap = isMaxHeap;
  }

  public insert(val: number): void {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.compare(this.heap[i], this.heap[p])) {
        [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
        i = p;
      } else break;
    }
  }

  public extractRoot(): number | null {
    if (this.heap.length === 0) return null;
    const root = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0 && last !== undefined) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }
    return root;
  }

  private compare(a: number, b: number): boolean {
    return this.isMaxHeap ? a > b : a < b;
  }

  private heapifyDown(i: number): void {
    const n = this.heap.length;
    while (2 * i + 1 < n) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let target = left;
      if (right < n && this.compare(this.heap[right], this.heap[left])) target = right;
      if (this.compare(this.heap[target], this.heap[i])) {
        [this.heap[i], this.heap[target]] = [this.heap[target], this.heap[i]];
        i = target;
      } else break;
    }
  }
}`
};

export function HeapVisualizer({ content }: HeapVisualizerProps) {
  const { 
    heap,
    heapArray,
    heapType,
    highlightedNodes,
    insert,
    insertMany,
    toggleHeapType,
    clear,
  } = useHeap()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {heapType === 'max' ? 'Max Heap' : 'Min Heap'}
        </h1>
        <p className="text-muted-foreground">
          A complete binary tree where each parent node is {heapType === 'max' ? 'greater' : 'smaller'} than its children.
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-xl">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="code">Multi-Lang Code</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
              <HeapControls 
                onInsert={insert}
                onInsertMany={insertMany}
                onClear={clear}
                onToggleType={toggleHeapType}
                heapType={heapType}
              />
              <HeapArray array={heapArray} />
            </div>
            <div className="xl:col-span-2">
              <HeapDisplay 
                heap={heap}
                highlightedNodes={highlightedNodes}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <MultiLangCodeViewer
            title={`${heapType === 'max' ? 'Max' : 'Min'} Binary Heap & Priority Queue`}
            subtitle="Array-backed Complete Binary Tree heapify algorithms in Java, Python, and C++."
            snippets={HEAP_CODE_SNIPPETS}
          />
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}