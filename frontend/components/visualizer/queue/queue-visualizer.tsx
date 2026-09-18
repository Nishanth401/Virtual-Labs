"use client"

import { QueueControls } from "@/components/visualizer/queue/queue-controls"
import { QueueDisplay } from "@/components/visualizer/queue/queue-display"
import { QueueOperations } from "@/components/visualizer/queue/queue-operations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { MultiLangCodeViewer } from "@/components/visualizer/code/multi-lang-code-viewer"
import { useQueue } from "@/hooks/use-queue"

interface QueueVisualizerProps {
  content?: React.ReactNode
}

const QUEUE_CODE_SNIPPETS = {
  java: `public class CircularQueue<T> {
    private Object[] data;
    private int front = 0;
    private int rear = -1;
    private int size = 0;
    private int capacity;

    public CircularQueue(int capacity) {
        this.capacity = capacity;
        this.data = new Object[capacity];
    }

    public boolean enqueue(T item) {
        if (isFull()) return false;
        rear = (rear + 1) % capacity;
        data[rear] = item;
        size++;
        return true;
    }

    @SuppressWarnings("unchecked")
    public T dequeue() {
        if (isEmpty()) return null;
        T item = (T) data[front];
        data[front] = null;
        front = (front + 1) % capacity;
        size--;
        return item;
    }

    @SuppressWarnings("unchecked")
    public T peek() {
        if (isEmpty()) return null;
        return (T) data[front];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == capacity;
    }

    public int size() {
        return size;
    }
}`,
  python: `class Queue:
    def __init__(self, capacity=10):
        self.capacity = capacity
        self.queue = [None] * capacity
        self.front = 0
        self.rear = -1
        self.size = 0

    def enqueue(self, item):
        """Enqueue an element at the rear. O(1)."""
        if self.is_full():
            raise OverflowError("Queue is full")
        self.rear = (self.rear + 1) % self.capacity
        self.queue[self.rear] = item
        self.size += 1
        return True

    def dequeue(self):
        """Dequeue an element from the front. O(1)."""
        if self.is_empty():
            raise IndexError("Queue is empty")
        item = self.queue[self.front]
        self.queue[self.front] = None
        self.front = (self.front + 1) % self.capacity
        self.size -= 1
        return item

    def peek(self):
        if self.is_empty():
            return None
        return self.queue[self.front]

    def is_empty(self):
        return self.size == 0

    def is_full(self):
        return self.size == self.capacity`,
  cpp: `#include <iostream>
#include <vector>
#include <stdexcept>

template <typename T>
class Queue {
private:
    std::vector<T> buffer;
    int front = 0;
    int rear = -1;
    int count = 0;
    int capacity;

public:
    Queue(int cap = 10) : capacity(cap), buffer(cap) {}

    bool enqueue(const T& item) {
        if (isFull()) return false;
        rear = (rear + 1) % capacity;
        buffer[rear] = item;
        count++;
        return true;
    }

    T dequeue() {
        if (isEmpty()) throw std::runtime_error("Queue Underflow");
        T item = buffer[front];
        front = (front + 1) % capacity;
        count--;
        return item;
    }

    T peek() const {
        if (isEmpty()) throw std::runtime_error("Queue is empty");
        return buffer[front];
    }

    bool isEmpty() const { return count == 0; }
    bool isFull() const { return count == capacity; }
    int size() const { return count; }
};`,
  javascript: `class Queue {
  constructor(capacity = 10) {
    this.items = [];
    this.capacity = capacity;
  }

  // Enqueue element to rear - O(1)
  enqueue(element) {
    if (this.isFull()) return false;
    this.items.push(element);
    return true;
  }

  // Dequeue element from front - O(1)
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }

  // Peek front element
  front() {
    if (this.isEmpty()) return null;
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  isFull() {
    return this.items.length >= this.capacity;
  }

  size() {
    return this.items.length;
  }
}`,
  typescript: `export class Queue<T> {
  private items: T[] = [];
  private capacity: number;

  constructor(capacity: number = 10) {
    this.capacity = capacity;
  }

  public enqueue(element: T): boolean {
    if (this.isFull()) return false;
    this.items.push(element);
    return true;
  }

  public dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.items.shift();
  }

  public front(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.items[0];
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  public isFull(): boolean {
    return this.items.length >= this.capacity;
  }

  public size(): number {
    return this.items.length;
  }
}`
};

export function QueueVisualizer({ content }: QueueVisualizerProps) {
  const { 
    queue,
    operations,
    isAnimating,
    highlightedIndex,
    enqueue,
    dequeue,
    clear,
    isFull,
    isEmpty,
  } = useQueue()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Queue</h1>
        <p className="text-muted-foreground">
          A First-In-First-Out (FIFO) data structure with enqueue and dequeue operations.
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
              <QueueControls 
                onEnqueue={enqueue}
                onDequeue={dequeue}
                onClear={clear}
                isAnimating={isAnimating}
                isFull={isFull}
                isEmpty={isEmpty}
              />
              <QueueOperations operations={operations} />
            </div>
            <div className="xl:col-span-2">
              <QueueDisplay 
                queue={queue}
                highlightedIndex={highlightedIndex}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <MultiLangCodeViewer
            title="Queue Implementation (FIFO / Circular Buffer)"
            subtitle="Ring Buffer & Array backed Queue implementations in Java, Python, and C++."
            snippets={QUEUE_CODE_SNIPPETS}
          />
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}