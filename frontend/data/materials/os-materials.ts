import { MaterialContent } from "./types";

export const OS_MATERIALS: Record<string, MaterialContent> = {
  "os-scheduling-gfg": {
    id: "os-scheduling-gfg",
    title: "CPU Scheduling Algorithms: FCFS, SJF, Round Robin & Priority",
    subject: "Operating Systems Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "CPU Scheduling & Process Management",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/operating-systems",
    simulatorName: "OS CPU & Deadlock Simulator",
    overview:
      "CPU Scheduling is the process by which the operating system decides which process in the ready queue is allocated the CPU core for execution. This GeeksforGeeks reference covers scheduling metrics (Turnaround Time, Waiting Time, Response Time), preemptive vs non-preemptive strategies, Convoy Effect in FCFS, Shortest Job First (SJF / SRTF), Priority scheduling with aging, and Round Robin time slicing.",
    learningObjectives: [
      "Distinguish preemptive from non-preemptive CPU scheduling algorithms",
      "Calculate Completion Time, Turnaround Time (CT - AT), and Waiting Time (TAT - BT)",
      "Analyze the Convoy Effect in First-Come, First-Served (FCFS) scheduling",
      "Implement the Round Robin algorithm using a FIFO ready queue and time quantum",
      "Explain how aging prevents process starvation in Priority Scheduling"
    ],
    keyConcepts: [
      {
        title: "1. Core CPU Scheduling Metrics",
        description:
          "Quantitative metrics used to benchmark and evaluate scheduling performance.",
        points: [
          "Arrival Time (AT): Time when a process enters the ready queue.",
          "Burst Time (BT): Total CPU execution time required by the process.",
          "Completion Time (CT): Absolute time when execution completes.",
          "Turnaround Time (TAT): TAT = CT - AT (total residency time in system).",
          "Waiting Time (WT): WT = TAT - BT (time spent waiting in ready queue)."
        ]
      },
      {
        title: "2. The Round Robin (RR) Algorithm",
        description:
          "Designed specifically for time-sharing systems where responsiveness is paramount.",
        points: [
          "Time Quantum (q): Small unit of CPU time (e.g. 10ms to 100ms) allocated to each process.",
          "Ready Queue: Maintained as a circular FIFO queue. If process burst exceeds q, timer interrupt fires context switch and process moves to tail.",
          "Quantum Tradeoff: If q is too large, RR degrades to FCFS; if q is too small, context switching overhead dominates CPU cycles."
        ]
      },
      {
        title: "3. Shortest Job First (SJF) & Preemption",
        description:
          "SJF schedules the process with minimum CPU burst time next.",
        points: [
          "Optimality: SJF is provably optimal—it gives the minimum average waiting time for a given set of stationary processes.",
          "SRTF: Shortest Remaining Time First is the preemptive version of SJF.",
          "Drawback: Cannot know exact future CPU bursts in advance (must estimate via exponential smoothing: tau_{n+1} = alpha * t_n + (1 - alpha) * tau_n)."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Queue Initialization",
        description: "Enlist processes into ready queue sorted by Arrival Time."
      },
      {
        step: 2,
        title: "Time Slice Execution",
        description: "Dispatch CPU to head process for min(remaining_burst, quantum). Advance current_time."
      },
      {
        step: 3,
        title: "Context Switch or Terminate",
        description: "If remaining burst > 0, push back to ready queue; else record Completion Time CT and compute TAT = CT - AT, WT = TAT - BT."
      }
    ],
    codeSnippets: {
      c: `#include <stdio.h>

void calculateRoundRobin(int n, int bt[], int quantum) {
    int rem_bt[32], wt[32], tat[32];
    for (int i = 0; i < n; i++) rem_bt[i] = bt[i];
    int t = 0;

    while (1) {
        int done = 1;
        for (int i = 0; i < n; i++) {
            if (rem_bt[i] > 0) {
                done = 0;
                if (rem_bt[i] > quantum) {
                    t += quantum;
                    rem_bt[i] -= quantum;
                } else {
                    t += rem_bt[i];
                    wt[i] = t - bt[i];
                    rem_bt[i] = 0;
                }
            }
        }
        if (done == 1) break;
    }

    for (int i = 0; i < n; i++) tat[i] = bt[i] + wt[i];

    printf("PID\\tBurst\\tWait\\tTurnaround\\n");
    for (int i = 0; i < n; i++) {
        printf("P%d\\t%d\\t%d\\t%d\\n", i + 1, bt[i], wt[i], tat[i]);
    }
}

int main() {
    int burst_times[] = {10, 5, 8};
    calculateRoundRobin(3, burst_times, 2);
    return 0;
}`
    },
    complexityAnalysis: {
      timeComplexity: "O(N * (max_burst / quantum)) for Round Robin; O(N log N) for SJF with min-heap",
      spaceComplexity: "O(N) queue storage for process control blocks (PCBs)",
      bestCase: "O(N) when all burst times <= quantum",
      worstCase: "O(N * max_burst) for tiny quantum",
      notes: "Linux kernel uses the Completely Fair Scheduler (CFS), an O(log N) red-black tree based algorithm tracking virtual runtime."
    },
    vivaQuestions: [
      {
        question: "What is the Convoy Effect in First-Come, First-Served (FCFS)?",
        answer: "When a CPU-bound process with a very long burst time occupies the CPU, all short I/O-bound processes queue behind it, resulting in poor CPU and device utilization and huge average waiting times."
      },
      {
        question: "How does the 'Aging' technique prevent process starvation?",
        answer: "Aging gradually increases the priority of processes that wait in the ready queue for a long time. Eventually, even the lowest-priority process ascends to highest priority and gains the CPU."
      }
    ],
    realWorldApplications: [
      "Operating system kernel task dispatchers (Linux CFS, Windows scheduler)",
      "High-throughput web servers handling concurrent incoming HTTP sockets",
      "Database query engine thread pool prioritization"
    ],
    practiceProblems: [
      {
        title: "Shortest Remaining Time First (SRTF) Simulator",
        difficulty: "Medium",
        description: "Write a program that takes 4 processes with non-zero arrival times and executes preemptive SRTF, calculating average waiting time."
      }
    ]
  },

  "os-deadlocks-gfg": {
    id: "os-deadlocks-gfg",
    title: "Process Synchronization, Semaphores & Banker's Algorithm",
    subject: "Operating Systems Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "Synchronization & Deadlock Avoidance",
    readTime: "25 mins",
    difficulty: "Advanced",
    simulatorUrl: "/labs/operating-systems",
    simulatorName: "OS CPU & Deadlock Simulator",
    overview:
      "Process synchronization coordinates concurrent cooperating processes to prevent race conditions and maintain data consistency. This reference explores the Critical Section problem, Mutex locks, Counting Semaphores, the 4 Coffman conditions for Deadlock, and Dijkstra's Banker's Algorithm for deadlock avoidance.",
    learningObjectives: [
      "Formulate the Critical Section problem and verify Mutual Exclusion, Progress, and Bounded Waiting",
      "Implement atomic Semaphore wait() [P] and signal() [V] operations",
      "Solve the Classical Producer-Consumer bounded buffer synchronization problem",
      "Identify the 4 Coffman conditions required for Deadlock occurrence",
      "Implement the Banker's Safety Algorithm to discover valid execution sequences"
    ],
    keyConcepts: [
      {
        title: "1. The 4 Necessary Coffman Conditions for Deadlock",
        description:
          "A deadlock can arise if and only if all four conditions hold simultaneously in a system.",
        points: [
          "Mutual Exclusion: At least one resource must be held in a non-shareable mode.",
          "Hold and Wait: A process must be holding at least one resource and requesting additional resources held by other processes.",
          "No Preemption: Resources cannot be forcibly preempted; they are released only voluntarily by the holding process.",
          "Circular Wait: A closed chain of processes exists where P0 waits for P1, P1 waits for P2, ..., Pn waits for P0."
        ]
      },
      {
        title: "2. The Banker's Algorithm Safety Test",
        description:
          "Banker's Algorithm tests whether allocating requested resources leaves the system in a Safe State (a state where there exists an order in which all processes can finish without deadlock).",
        points: [
          "Data Vectors: Available[m], Max[n][m], Allocation[n][m], Need[n][m] = Max - Allocation.",
          "Work Vector: Initialized to Available.",
          "Safety Check: Find process P_i whose Need <= Work. Add its Allocation to Work (P_i finishes) and append to Safe Sequence."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Calculate Need Matrix",
        description: "Need[i][j] = Max[i][j] - Allocation[i][j] for all processes i and resources j."
      },
      {
        step: 2,
        title: "Find Feasible Process",
        description: "Find an unfinished process i such that Need[i] <= Work. If none found, system is UNSAFE."
      },
      {
        step: 3,
        title: "Reclaim & Loop",
        description: "Work = Work + Allocation[i]; mark process i finished; repeat until all processes finish (SAFE) or deadlock occurs."
      }
    ],
    codeSnippets: {
      c: `#include <stdio.h>
#define P 5
#define R 3

int isSafe(int processes[], int avail[], int max[][R], int allot[][R]) {
    int need[P][R];
    for (int i = 0; i < P; i++)
        for (int j = 0; j < R; j++)
            need[i][j] = max[i][j] - allot[i][j];

    int finish[P] = {0};
    int safeSeq[P];
    int work[R];
    for (int i = 0; i < R; i++) work[i] = avail[i];

    int count = 0;
    while (count < P) {
        int found = 0;
        for (int p = 0; p < P; p++) {
            if (finish[p] == 0) {
                int j;
                for (j = 0; j < R; j++)
                    if (need[p][j] > work[j]) break;

                if (j == R) {
                    for (int k = 0; k < R; k++) work[k] += allot[p][k];
                    safeSeq[count++] = p;
                    finish[p] = 1;
                    found = 1;
                }
            }
        }
        if (found == 0) {
            printf("System is in UNSAFE state (Deadlock Risk)!\\n");
            return 0;
        }
    }

    printf("System is in SAFE State! Safe Sequence: ");
    for (int i = 0; i < P; i++) printf("P%d ", safeSeq[i]);
    printf("\\n");
    return 1;
}`
    },
    complexityAnalysis: {
      timeComplexity: "O(M * N^2) for Banker's Safety Algorithm where N is processes, M is resources",
      spaceComplexity: "O(N * M) matrix storage for Max, Allocation, Need",
      bestCase: "O(M * N) if processes can finish in linear order",
      worstCase: "O(M * N^2) checking every remaining process at each step",
      notes: "Modern desktop operating systems generally ignore deadlocks (Ostrich Algorithm) because avoidance overhead is too high."
    },
    vivaQuestions: [
      {
        question: "What is the difference between a Mutex and a Binary Semaphore?",
        answer: "A Mutex has ownership: only the thread that locked the mutex can unlock it. A Binary Semaphore has no ownership: any thread can signal (V) the semaphore to unblock another waiting thread."
      },
      {
        question: "Explain the difference between Deadlock Prevention and Deadlock Avoidance.",
        answer: "Deadlock Prevention eliminates at least one of the 4 Coffman conditions structurally (e.g. strict resource ordering). Deadlock Avoidance dynamically inspects resource requests at runtime (like Banker's algorithm) to guarantee the system stays in a Safe State."
      }
    ],
    realWorldApplications: [
      "Relational database two-phase locking (2PL) deadlock detection",
      "Operating system memory manager page allocation safeguards",
      "Industrial robotics automated warehouse multi-crane collision prevention"
    ],
    practiceProblems: [
      {
        title: "Banker's Resource Request Algorithm",
        difficulty: "Hard",
        description: "Given a 5-process 3-resource system, simulate a new resource request from P1: check if Request <= Need and Request <= Available, grant tentative allocation, and verify safe state."
      }
    ]
  },

  "os-linux-w3schools": {
    id: "os-linux-w3schools",
    title: "Linux & UNIX Shell Scripting Academic Handbook",
    subject: "Operating Systems Laboratory",
    provider: "W3Schools Reference",
    category: "Shell Scripting & System Calls",
    readTime: "20 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/operating-systems",
    simulatorName: "OS CPU & Deadlock Simulator",
    overview:
      "A hands-on, practical W3Schools-curated laboratory guide to POSIX Linux shell scripting and Unix system calls. Covers directory navigation, permissions (chmod, chown), pipeline redirection (stdin, stdout, stderr), process control system calls (fork, exec, wait, exit), and writing automated Bash scripts.",
    learningObjectives: [
      "Master POSIX terminal commands: ls, grep, find, awk, sed, and cut",
      "Configure Unix file permissions using octal (755, 644) and symbolic notation",
      "Construct pipeline chains redirecting stdout (>) and stderr (2>) streams",
      "Understand the fork() system call process creation mechanism and PID return values",
      "Write Bash shell scripts with conditionals, loops, and command-line arguments"
    ],
    keyConcepts: [
      {
        title: "1. The fork() and exec() System Calls",
        description:
          "Unix processes are spawned hierarchically from the init/systemd (PID 1) ancestor.",
        points: [
          "fork(): Clones the calling process. Returns 0 to the newly created child, returns child PID to the parent, and returns -1 on failure.",
          "execvp(): Replaces the current process address space with a new executable binary.",
          "wait(): Parent suspends execution until child process terminates to reap its exit status and prevent Zombie processes."
        ]
      },
      {
        title: "2. Unix File Permissions (chmod)",
        description:
          "Files have 3 permission tiers: User (Owner), Group, and Others.",
        points: [
          "Read (r = 4), Write (w = 2), Execute (x = 1).",
          "Octal 755: Owner rwx (7), Group r-x (5), Others r-x (5). Standard for executable scripts.",
          "Octal 644: Owner rw- (6), Group r-- (4), Others r-- (4). Standard for data files."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Fork Child Process",
        description: "Invoke pid = fork(). Check for error (pid < 0)."
      },
      {
        step: 2,
        title: "Branch Execution",
        description: "If pid == 0: Child branch. Execute target command via execvp(). If pid > 0: Parent branch."
      },
      {
        step: 3,
        title: "Reap Child Status",
        description: "Parent invokes wait(&status) to collect exit code and prevent zombie state."
      }
    ],
    codeSnippets: {
      c: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();

    if (pid < 0) {
        perror("Fork failed");
        return 1;
    } else if (pid == 0) {
        // Child Process
        printf("[CHILD] PID: %d, Parent PID: %d\\n", getpid(), getppid());
        char *args[] = {"ls", "-l", NULL};
        execvp("ls", args);
    } else {
        // Parent Process
        printf("[PARENT] Waiting for child PID %d to terminate...\\n", pid);
        wait(NULL);
        printf("[PARENT] Child execution complete. Exiting.\\n");
    }
    return 0;
}`,
      bash: `#!/bin/bash
# Backup and cleanup automation script
TARGET_DIR="/var/log/app"
BACKUP_DIR="/backups"

echo "Starting automated log compression..."
tar -czf "$BACKUP_DIR/logs_$(date +%F).tar.gz" "$TARGET_DIR" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "Backup succeeded! Setting file permissions..."
    chmod 600 "$BACKUP_DIR"/*
else
    echo "Error: Backup failed!" >&2
fi`
    },
    complexityAnalysis: {
      timeComplexity: "O(1) system call invocation overhead via CPU trap instruction (INT 0x80 / syscall)",
      spaceComplexity: "Copy-on-Write (COW) memory pages allocated only when modified",
      bestCase: "O(1)",
      worstCase: "O(1)",
      notes: "Modern Linux uses Copy-On-Write (COW) so fork() does not duplicate physical memory until the child writes to a page."
    },
    vivaQuestions: [
      {
        question: "What is a Zombie process versus an Orphan process in Linux?",
        answer: "A Zombie process has completed execution but still has an entry in the process table because its parent has not read its exit status with wait(). An Orphan process is one whose parent died before it; it is automatically adopted by init/systemd (PID 1)."
      },
      {
        question: "What does the file permission 'chmod 777' mean and why is it dangerous?",
        answer: "777 grants Read, Write, and Execute permissions to Owner, Group, and all Other users. It is a severe security risk because any unauthorized user or malware can overwrite or execute the file."
      }
    ],
    realWorldApplications: [
      "Container runtime isolation (Docker container spawning via clone() and namespaces)",
      "DevOps CI/CD build scripts automating testing and artifact bundling",
      "System administration cron jobs for automated database backup and health monitoring"
    ],
    practiceProblems: [
      {
        title: "Bash Word Frequency Counter",
        difficulty: "Easy",
        description: "Write a 1-line Bash command using cat, tr, sort, uniq -c, and sort -nr to print the top 5 most frequent words in a text file."
      }
    ]
  }
};
