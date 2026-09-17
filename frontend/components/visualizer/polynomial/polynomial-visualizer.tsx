"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { PolynomialMultiplication } from "./polynomial-multiplication"
import { MultiLangCodeViewer } from "@/components/visualizer/code/multi-lang-code-viewer"
import { Card } from "@/components/ui/card"

interface PolynomialVisualizerProps {
  content?: React.ReactNode
}

const POLYNOMIAL_CODE_SNIPPETS = {
  java: `public class PolynomialMultiplication {
    static class PolyNode {
        int coeff, power;
        PolyNode next;
        PolyNode(int c, int p) { coeff = c; power = p; next = null; }
    }

    public static PolyNode multiply(PolyNode poly1, PolyNode poly2) {
        PolyNode result = null;
        for (PolyNode p1 = poly1; p1 != null; p1 = p1.next) {
            for (PolyNode p2 = poly2; p2 != null; p2 = p2.next) {
                int coeff = p1.coeff * p2.coeff;
                int power = p1.power + p2.power;
                result = addTerm(result, coeff, power);
            }
        }
        return result;
    }

    private static PolyNode addTerm(PolyNode head, int coeff, int power) {
        PolyNode curr = head, prev = null;
        while (curr != null && curr.power > power) {
            prev = curr;
            curr = curr.next;
        }
        if (curr != null && curr.power == power) {
            curr.coeff += coeff;
            return head;
        }
        PolyNode newNode = new PolyNode(coeff, power);
        if (prev == null) {
            newNode.next = head;
            return newNode;
        }
        newNode.next = curr;
        prev.next = newNode;
        return head;
    }
}`,
  python: `class PolyNode:
    def __init__(self, coeff, power):
        self.coeff = coeff
        self.power = power
        self.next = None

def multiply_polynomials(poly1, poly2):
    result = {}
    p1 = poly1
    while p1:
        p2 = poly2
        while p2:
            coeff = p1.coeff * p2.coeff
            power = p1.power + p2.power
            result[power] = result.get(power, 0) + coeff
            p2 = p2.next
        p1 = p1.next
    return sorted(result.items(), key=lambda x: x[0], reverse=True)`,
  cpp: `#include <iostream>
#include <map>
using namespace std;

struct Node {
    int coeff, power;
    Node* next;
    Node(int c, int p) : coeff(c), power(p), next(nullptr) {}
};

map<int, int, greater<int>> multiplyPoly(Node* p1, Node* p2) {
    map<int, int, greater<int>> result;
    for (Node* ptr1 = p1; ptr1 != nullptr; ptr1 = ptr1->next) {
        for (Node* ptr2 = p2; ptr2 != nullptr; ptr2 = ptr2->next) {
            result[ptr1->power + ptr2->power] += ptr1->coeff * ptr2->coeff;
        }
    }
    return result;
}`,
  javascript: `function multiplyPolynomials(poly1, poly2) {
  const result = {};
  for (const t1 of poly1) {
    for (const t2 of poly2) {
      const power = t1.power + t2.power;
      const coeff = t1.coeff * t2.coeff;
      result[power] = (result[power] || 0) + coeff;
    }
  }
  return Object.entries(result)
    .map(([p, c]) => ({ power: Number(p), coeff: c }))
    .sort((a, b) => b.power - a.power);
}`,
  typescript: `export interface Term {
  coeff: number;
  power: number;
}

export function multiplyPolynomials(poly1: Term[], poly2: Term[]): Term[] {
  const result: Record<number, number> = {};
  for (const t1 of poly1) {
    for (const t2 of poly2) {
      const power = t1.power + t2.power;
      const coeff = t1.coeff * t2.coeff;
      result[power] = (result[power] || 0) + coeff;
    }
  }
  return Object.entries(result)
    .map(([p, c]) => ({ power: Number(p), coeff: c }))
    .sort((a, b) => b.power - a.power);
}`
};

export function PolynomialVisualizer({ content }: PolynomialVisualizerProps) {
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Polynomial Multiplication</h1>
        <p className="text-muted-foreground">
          Visualize polynomial multiplication using linked lists and algebraic term combining.
        </p>
      </div>

      <Tabs defaultValue="multiply" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-xl">
          <TabsTrigger value="multiply">Multiply Simulator</TabsTrigger>
          <TabsTrigger value="code">Multi-Lang Code</TabsTrigger>
          <TabsTrigger value="explanation">Info</TabsTrigger>
        </TabsList>

        <TabsContent value="multiply" className="space-y-6">
          <Card className="p-6">
            <PolynomialMultiplication />
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <MultiLangCodeViewer
            title="Polynomial Multiplication using Linked List & Hash Map"
            subtitle="Term degree addition & coefficient multiplication in Java, Python, and C++."
            badge="Customizable IDE"
            snippets={POLYNOMIAL_CODE_SNIPPETS}
          />
        </TabsContent>
        
        <TabsContent value="explanation" className="prose dark:prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}