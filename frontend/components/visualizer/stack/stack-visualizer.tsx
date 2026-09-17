"use client"

import { StackControls } from "@/components/visualizer/stack/stack-controls"
import { StackDisplay } from "@/components/visualizer/stack/stack-display"
import { StackOperations } from "@/components/visualizer/stack/stack-operations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { MultiLangCodeViewer } from "@/components/visualizer/code/multi-lang-code-viewer"
import { useStack } from "@/hooks/use-stack"

interface StackVisualizerProps {
  content?: React.ReactNode
}

const STACK_CODE_SNIPPETS = {
  java: `public class Stack<T> {
    private Object[] elements;
    private int top = -1;
    private static final int DEFAULT_CAPACITY = 10;

    public Stack() {
        elements = new Object[DEFAULT_CAPACITY];
    }

    public void push(T item) {
        if (top == elements.length - 1) {
            resize(elements.length * 2);
        }
        elements[++top] = item;
    }

    @SuppressWarnings("unchecked")
    public T pop() {
        if (isEmpty()) throw new IllegalStateException("Stack Underflow");
        T item = (T) elements[top];
        elements[top--] = null;
        return item;
    }

    @SuppressWarnings("unchecked")
    public T peek() {
        if (isEmpty()) throw new IllegalStateException("Stack is empty");
        return (T) elements[top];
    }

    public boolean isEmpty() {
        return top == -1;
    }

    public int size() {
        return top + 1;
    }

    private void resize(int capacity) {
        Object[] newElements = new Object[capacity];
        System.arraycopy(elements, 0, newElements, 0, top + 1);
        elements = newElements;
    }
}`,
  python: `class Stack:
    def __init__(self):
        self._elements = []

    def push(self, item):
        """Push an element onto the stack. O(1) amortized."""
        self._elements.append(item)

    def pop(self):
        """Pop and return the top element. O(1)."""
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._elements.pop()

    def peek(self):
        """Return the top element without removing it. O(1)."""
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self._elements[-1]

    def is_empty(self):
        return len(self._elements) == 0

    def size(self):
        return len(self._elements)`,
  cpp: `#include <iostream>
#include <vector>
#include <stdexcept>

template <typename T>
class Stack {
private:
    std::vector<T> elements;

public:
    void push(const T& item) {
        elements.push_back(item);
    }

    T pop() {
        if (isEmpty()) {
            throw std::runtime_error("Stack Underflow: Stack is empty");
        }
        T item = elements.back();
        elements.pop_back();
        return item;
    }

    T top() const {
        if (isEmpty()) {
            throw std::runtime_error("Stack is empty");
        }
        return elements.back();
    }

    bool isEmpty() const {
        return elements.empty();
    }

    size_t size() const {
        return elements.size();
    }
};`,
  javascript: `class Stack {
  constructor() {
    this.items = [];
  }

  // Push element onto stack - O(1)
  push(element) {
    this.items.push(element);
  }

  // Remove and return top element - O(1)
  pop() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.pop();
  }

  // Return top element without removing
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get current stack size
  size() {
    return this.items.length;
  }

  // Clear stack
  clear() {
    this.items = [];
  }
}`,
  typescript: `export class Stack<T> {
  private items: T[] = [];

  public push(element: T): void {
    this.items.push(element);
  }

  public pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }

  public peek(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.items[this.items.length - 1];
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  public size(): number {
    return this.items.length;
  }

  public clear(): void {
    this.items = [];
  }
}`
};

export function StackVisualizer({ content }: StackVisualizerProps) {
  const { 
    stack,
    operations,
    isAnimating,
    highlightedIndex,
    push,
    pop,
    clear,
    isFull,
    isEmpty,
  } = useStack()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Stack</h1>
        <p className="text-muted-foreground">
          A Last-In-First-Out (LIFO) data structure with push and pop operations.
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
              <StackControls 
                onPush={push}
                onPop={pop}
                onClear={clear}
                isAnimating={isAnimating}
                isFull={isFull}
                isEmpty={isEmpty}
              />
              <StackOperations operations={operations} />
            </div>
            <div className="xl:col-span-2">
              <StackDisplay 
                stack={stack}
                highlightedIndex={highlightedIndex}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <MultiLangCodeViewer
            title="Stack Implementation (LIFO)"
            subtitle="Generic Array & Vector backed Stack implementations in Java, Python, C++, JS, and TS."
            badge="Customizable IDE"
            snippets={STACK_CODE_SNIPPETS}
          />
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}