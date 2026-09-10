"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code2,
  BrainCircuit,
  Database,
  Network,
  Cpu,
  Bot,
  BarChart3,
  Cloud,
  Layers,
  ArrowRight,
  FlaskConical,
  Sparkles
} from "lucide-react";

export function LabsDirectoryGrid() {
  const labs = [
    {
      id: "data-structures",
      name: "Data Structures & Algorithms Lab",
      code: "AD8381",
      sem: "Semester 3",
      icon: Layers,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      desc: "Interactive JVM call stack animations, AVL tree rotations, Dijkstra graph traversals, and dynamic linked allocations.",
      exps: 15,
      tags: ["Linked List", "Stack & Queue", "BST & AVL", "Graphs", "Sorting"]
    },
    {
      id: "oops-java",
      name: "Object Oriented Programming (Java)",
      code: "CS3351",
      sem: "Semester 3",
      icon: Code2,
      color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
      desc: "Classes & objects, inheritance hierarchies, runtime polymorphism, matrix spirals, Java Collections & JDBC.",
      exps: 15,
      tags: ["Inheritance", "Polymorphism", "Collections", "JDBC", "Exceptions"]
    },
    {
      id: "dbms-lab",
      name: "Database Management Systems Lab",
      code: "AD8382",
      sem: "Semester 3",
      icon: Database,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      desc: "Relational schema design, SQL DDL/DML, joins & nested subqueries, views, PL/SQL procedures, and ACID transactions.",
      exps: 10,
      tags: ["SQL Queries", "PL/SQL", "Procedures", "Triggers", "ACID"]
    },
    {
      id: "c-programming",
      name: "C Programming Laboratory",
      code: "CS3151",
      sem: "Semester 1",
      icon: Code2,
      color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
      desc: "Formatted I/O, control loops, pointer dereferencing, dynamic memory allocation (malloc/free), and file streams.",
      exps: 10,
      tags: ["Pointers", "malloc/free", "Structures", "Recursion", "File I/O"]
    },
    {
      id: "python-programming",
      name: "Python Programming Laboratory",
      code: "GE3171",
      sem: "Semester 1",
      icon: Code2,
      color: "text-teal-500 bg-teal-500/10 border-teal-500/20",
      desc: "Dynamic typing, list comprehensions, lambdas, OOP dunder methods, exception handling, and CSV data pipelines.",
      exps: 10,
      tags: ["Lambdas", "List Comprehensions", "OOP Classes", "File Handlers"]
    },
    {
      id: "data-science-analytics",
      name: "Data Science and Analytics Lab",
      code: "AD8482",
      sem: "Semester 4",
      icon: BarChart3,
      color: "text-violet-500 bg-violet-500/10 border-violet-500/20",
      desc: "NumPy matrix vectorization, Pandas DataFrame wrangling, hypothesis testing (Z-test, T-test, ANOVA), and forecasting.",
      exps: 12,
      tags: ["NumPy", "Pandas", "Hypothesis Testing", "ANOVA", "Regression"]
    },
    {
      id: "computer-networks",
      name: "Computer Networks Laboratory",
      code: "AD8581",
      sem: "Semester 4",
      icon: Network,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      desc: "Packet sniffing with Wireshark/tcpdump, TCP/UDP sockets, DNS resolution, ARP/RARP simulation, and routing algorithms.",
      exps: 10,
      tags: ["Wireshark", "TCP Sockets", "UDP DNS", "Routing Protocols", "CRC"]
    },
    {
      id: "ai-machine-learning",
      name: "Machine Learning Laboratory",
      code: "AD8481",
      sem: "Semester 4",
      icon: BrainCircuit,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      desc: "Candidate-Elimination, ID3 decision trees, Backpropagation neural networks, Naïve Bayes, and EM vs k-Means clustering.",
      exps: 9,
      tags: ["Decision Trees", "Backpropagation", "Naïve Bayes", "k-Means", "KNN"]
    },
    {
      id: "operating-systems",
      name: "Operating Systems Laboratory",
      code: "CS3461",
      sem: "Semester 4",
      icon: Cpu,
      color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
      desc: "POSIX system calls, CPU scheduling (FCFS, SJF, RR), semaphores, Banker's deadlock safety, paging, and disk scheduling.",
      exps: 15,
      tags: ["CPU Scheduling", "System Calls", "Semaphores", "Banker's Algorithm"]
    },
    {
      id: "artificial-intelligence",
      name: "Artificial Intelligence Lab",
      code: "AI3401",
      sem: "Semester 5",
      icon: Bot,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      desc: "A* informed heuristic search on 8-puzzle, adversarial Minimax with Alpha-Beta pruning, and N-Queens CSP solvers.",
      exps: 5,
      tags: ["A* Search", "Minimax", "Alpha-Beta Pruning", "CSP Solvers"]
    },
    {
      id: "big-data-analytics",
      name: "Big Data Analytics Lab",
      code: "CS8711",
      sem: "Semester 5",
      icon: BarChart3,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      desc: "Hadoop HDFS cluster architecture, distributed MapReduce paradigms, and in-memory Apache PySpark DataFrame processing.",
      exps: 5,
      tags: ["Hadoop HDFS", "MapReduce", "Apache Spark", "PySpark", "NoSQL"]
    },
    {
      id: "cloud-service-management",
      name: "Cloud Service Management Lab",
      code: "CS8811",
      sem: "Semester 5",
      icon: Cloud,
      color: "text-teal-500 bg-teal-500/10 border-teal-500/20",
      desc: "Scalable AWS EC2/S3 cloud provisioning, Docker containerization, AWS Lambda serverless, and Kubernetes orchestration.",
      exps: 5,
      tags: ["AWS EC2", "AWS S3", "Docker", "Lambda Serverless", "Kubernetes"]
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-muted/10 border-b border-border/60 relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="text-xs uppercase font-mono px-3 py-1 bg-rose-500/10 text-rose-500 border-rose-500/25">
            Universal Engineering Curriculum
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground tracking-tight">
            12 Ready-to-Deploy Virtual Engineering Laboratories
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Every laboratory is fully aligned with Anna University and Autonomous CBCS Syllabi. Includes interactive step-by-step simulations, live code runners, and self-assessment quizzes.
          </p>
        </div>

        {/* 12 Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab) => {
            const Icon = lab.icon;
            return (
              <Card
                key={lab.id}
                className="border border-border/80 bg-card/70 backdrop-blur-xs flex flex-col justify-between hover:border-rose-500/50 hover:shadow-xl transition-all duration-300 rounded-2xl group"
              >
                <CardHeader className="p-6 pb-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${lab.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-[11px] font-mono font-bold">
                      {lab.code} • {lab.sem}
                    </Badge>
                  </div>

                  <CardTitle className="text-base font-bold font-heading text-foreground group-hover:text-rose-600 transition-colors">
                    {lab.name}
                  </CardTitle>

                  <CardDescription className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {lab.desc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {lab.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-muted text-[10px] font-mono text-muted-foreground border border-border/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                      <FlaskConical className="h-3.5 w-3.5 text-rose-500" />
                      <strong className="text-foreground">{lab.exps}</strong> Experiments
                    </span>

                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-500/10 gap-1.5 p-0 h-auto"
                    >
                      <Link href={`/labs/${lab.id}`}>
                        <span>Explore Syllabus</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
