"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { LinkedListDisplay } from "@/components/visualizer/linked-list/linked-list-display"
import { LinkedListControls } from "@/components/visualizer/linked-list/linked-list-controls"
import { LinkedListOperations } from "@/components/visualizer/linked-list/linked-list-operations"
import { MultiLangCodeViewer } from "@/components/visualizer/code/multi-lang-code-viewer"
import { useLinkedList } from "@/hooks/use-linked-list"
import { ListType } from "./types"

const LIST_TYPES: { value: ListType; label: string }[] = [
  { value: 'SLL', label: 'SLL' },
  { value: 'DLL', label: 'DLL' },
  { value: 'CSLL', label: 'CSLL' },
  { value: 'CDLL', label: 'CDLL' },
]

const LINKED_LIST_CODE_SNIPPETS = {
  java: `// Java Singly & Doubly Linked List Node Implementation
public class SinglyLinkedList<T> {
    public static class Node<T> {
        T data;
        Node<T> next;
        Node(T data) {
            this.data = data;
            this.next = null;
        }
    }

    private Node<T> head = null;

    public void insertFront(T val) {
        Node<T> newNode = new Node<>(val);
        newNode.next = head;
        head = newNode;
    }

    public void insertBack(T val) {
        Node<T> newNode = new Node<>(val);
        if (head == null) {
            head = newNode;
            return;
        }
        Node<T> curr = head;
        while (curr.next != null) curr = curr.next;
        curr.next = newNode;
    }

    public void deleteFront() {
        if (head != null) head = head.next;
    }

    public void reverse() {
        Node<T> prev = null, curr = head;
        while (curr != null) {
            Node<T> next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        head = prev;
    }
}`,
  python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None

    def insert_front(self, val):
        new_node = ListNode(val, self.head)
        self.head = new_node

    def insert_back(self, val):
        new_node = ListNode(val)
        if not self.head:
            self.head = new_node
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = new_node

    def delete_front(self):
        if self.head:
            self.head = self.head.next

    def reverse(self):
        prev = None
        curr = self.head
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        self.head = prev`,
  cpp: `#include <iostream>

template <typename T>
struct Node {
    T data;
    Node* next;
    Node(T val) : data(val), next(nullptr) {}
};

template <typename T>
class LinkedList {
private:
    Node<T>* head = nullptr;

public:
    void insertFront(T val) {
        Node<T>* newNode = new Node<T>(val);
        newNode->next = head;
        head = newNode;
    }

    void insertBack(T val) {
        Node<T>* newNode = new Node<T>(val);
        if (!head) {
            head = newNode;
            return;
        }
        Node<T>* curr = head;
        while (curr->next) curr = curr->next;
        curr->next = newNode;
    }

    void reverse() {
        Node<T>* prev = nullptr;
        Node<T>* curr = head;
        while (curr) {
            Node<T>* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        head = prev;
    }
};`,
  javascript: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFront(val) {
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
  }

  insertBack(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = newNode;
  }

  reverse() {
    let prev = null;
    let curr = this.head;
    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.head = prev;
  }
}`,
  typescript: `export class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;
  prev?: ListNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class LinkedList<T> {
  head: ListNode<T> | null = null;

  insertFront(val: T): void {
    const newNode = new ListNode(val);
    newNode.next = this.head;
    this.head = newNode;
  }

  insertBack(val: T): void {
    const newNode = new ListNode(val);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = newNode;
  }

  reverse(): void {
    let prev: ListNode<T> | null = null;
    let curr = this.head;
    while (curr) {
      const next: ListNode<T> | null = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.head = prev;
  }
}`
};

interface LinkedListVisualizerProps {
  content?: React.ReactNode
}

export function LinkedListVisualizer({ content }: LinkedListVisualizerProps) {
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Linked List</h1>
        <p className="text-muted-foreground">
          A dynamic data structure with nodes connected through references.
        </p>
      </div>

      <Tabs defaultValue="SLL" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-6 max-w-2xl">
          {LIST_TYPES.map(type => (
            <TabsTrigger key={type.value} value={type.value}>
              {type.label}
            </TabsTrigger>
          ))}
          <TabsTrigger value="code">Multi-Lang Code</TabsTrigger>
          <TabsTrigger value="explanation">Info</TabsTrigger>
        </TabsList>

        {LIST_TYPES.map(type => (
          <TabsContent key={type.value} value={type.value} className="space-y-6">
            <LinkedListContent type={type.value} />
          </TabsContent>
        ))}

        <TabsContent value="code" className="space-y-6">
          <MultiLangCodeViewer
            title="Linked List Implementation (SLL, DLL, Circular)"
            subtitle="Pointer/Reference based dynamic memory chain operations in Java, Python, and C++."
            badge="Customizable IDE"
            snippets={LINKED_LIST_CODE_SNIPPETS}
          />
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LinkedListContent({ type }: { type: ListType }) {
  const {
    list,
    operations,
    animationState,
    isAnimating,
    insertFront,
    insertBack,
    deleteFront,
    deleteBack,
    reverse,
    search,
    clear,
    loadSample,
  } = useLinkedList(type)

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-1 space-y-6">
        <LinkedListControls 
          onInsertFront={insertFront}
          onInsertBack={insertBack}
          onDeleteFront={deleteFront}
          onDeleteBack={deleteBack}
          onReverse={reverse}
          onSearch={search}
          onClear={clear}
          onSample={loadSample}
          isAnimating={isAnimating}
          isEmpty={!list.head}
        />
        <LinkedListOperations operations={operations} />
      </div>
      <div className="xl:col-span-2">
        <LinkedListDisplay 
          list={list}
          highlightedNodes={animationState.highlightedNodes}
          message={animationState.message}
          onSample={loadSample}
        />
      </div>
    </div>
  )
}