import { DSACategory } from "../dsa-topic-data";

export const OS_ROADMAP_CATEGORIES: DSACategory[] = [
  {
    id: "os-commands-processes",
    name: "1. OS Installation, Shell & Process System Calls",
    shortDesc: "OS installation, UNIX shell scripting, and POSIX process management system calls.",
    iconName: "Terminal",
    topics: [
      {
        id: "os-installation",
        slug: "installation-of-operating-system",
        title: "Exp 1: Installation of Operating System (Windows / Linux)",
        categoryId: "os-commands-processes",
        categoryName: "1. OS Installation, Shell & Process System Calls",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "Operating system installation dual boot linux partition UEFI",
        gfgUrl: "https://www.geeksforgeeks.org/how-to-install-linux-in-virtualbox/",
        quickSummary: "Configure GPT/MBR partition tables, UEFI bootloaders, GRUB, and virtualized hypervisors.",
        keyPoints: [
          "UEFI firmware initializes hardware and delegates execution to EFI system partition.",
          "Linux partitioning: root (/), swap space, and home (/home) mounting points.",
          "VirtualBox / VMware hypervisors provide isolated guest virtual machines."
        ],
        diagramTitle: "UEFI Bootloader & Storage Partitioning Layout",
        diagram: `┌────────────────────────────────────────────────────────┐
│ Disk Storage (GPT / GUID Partition Table)              │
├──────────────┬──────────────┬──────────────┬───────────┤
│ EFI Partition│ Linux Root / │ Linux Swap   │ Data/Home │
│ (512 MB FAT) │ (50 GB ext4) │ (8 GB Swap)  │ (ext4)    │
└──────────────┴──────────────┴──────────────┴───────────┘
       ▲
       │ GRUB Bootloader Menu -> Loads Kernel & initramfs
       ▼
[ Linux Kernel v6.x ] ──► Systemd (PID 1) ──► Target Multi-User`,
        complexities: [
          { operation: "Boot Sequence", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(disk)" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Linux Partitioning CLI",
            code: `# 1. List block storage devices and GUID partitions
lsblk -f

# 2. Check disk free space and filesystem mount points
df -hT

# 3. Create ext4 filesystem on partition /dev/sdb1
sudo mkfs.ext4 /dev/sdb1

# 4. Mount partition to target directory
sudo mkdir -p /mnt/vlab_drive
sudo mount /dev/sdb1 /mnt/vlab_drive`
          }
        ],
        practiceProblems: [
          {
            title: "Operating System Architecture & Booting",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/how-to-install-linux-in-virtualbox/",
            platform: "GeeksforGeeks",
            topicTag: "OS Installation"
          }
        ]
      },
      {
        id: "os-unix-shell",
        slug: "unix-commands-and-shell-programming",
        title: "Exp 2: UNIX Commands & Shell Programming",
        categoryId: "os-commands-processes",
        categoryName: "1. OS Installation, Shell & Process System Calls",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "UNIX commands shell programming bash scripts pipes grep awk",
        gfgUrl: "https://www.geeksforgeeks.org/introduction-to-linux-shell-and-shell-scripting/",
        quickSummary: "Master essential shell commands (grep, awk, sed, find) and write structured bash automation scripts.",
        keyPoints: [
          "Unix philosophy: small modular utilities connected via standard Unix pipelines (|).",
          "Conditional branching (if-else), iterative loops (for, while), and functions in Bash.",
          "File permissions (chmod, chown) and process tracking (ps, top, kill)."
        ],
        diagramTitle: "UNIX Pipe Stream IPC Architecture",
        diagram: `  [ cat logfile.txt ] ──► (stdout) ──► [ grep "ERROR" ] ──► [ awk '{print $4}' ] ──► [ sort | uniq -c ]
                                 Pipeline Stream Flow`,
        complexities: [
          { operation: "Pipe Throughput", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(pipe_buf)" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Bash Shell Script",
            code: `#!/bin/bash
# Shell Script: Student Grade & Performance Evaluator

echo "=== VSB Virtual Labs: Student Evaluation Shell ==="
read -p "Enter student marks (0-100): " marks

if [ "$marks" -ge 90 ]; then
    grade="O (Outstanding)"
elif [ "$marks" -ge 80 ]; then
    grade="A+ (Excellent)"
elif [ "$marks" -ge 70 ]; then
    grade="A (Very Good)"
elif [ "$marks" -ge 50 ]; then
    grade="B (Pass)"
else
    grade="RA (Reappear)"
fi

echo "Computed Grade: $grade"

# File Processing with AWK
echo -e "101,Alice,95\\n102,Bob,82\\n103,Charlie,48" > grades.csv
echo "--- Students with Marks >= 80 ---"
awk -F',' '$3 >= 80 {print "ID: " $1 " | Name: " $2 " | Score: " $3}' grades.csv`
          }
        ],
        practiceProblems: [
          {
            title: "Shell Scripting & Command Pipelines",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/introduction-to-linux-shell-and-shell-scripting/",
            platform: "GeeksforGeeks",
            topicTag: "Shell Scripting"
          }
        ]
      },
      {
        id: "os-system-calls-proc",
        slug: "process-management-system-calls",
        title: "Exp 3: Process Management System Calls: fork(), exec(), getpid(), exit(), wait()",
        categoryId: "os-commands-processes",
        categoryName: "1. OS Installation, Shell & Process System Calls",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "fork exec getpid wait exit system calls in C Linux",
        gfgUrl: "https://www.geeksforgeeks.org/fork-system-call/",
        quickSummary: "Create child processes with copy-on-write virtual address spaces via fork() and execute programs using exec().",
        keyPoints: [
          "fork() clones the calling process; returns 0 in child, child PID in parent, -1 on failure.",
          "execvp() replaces child process image with a new binary program.",
          "wait(&status) synchronizes parent and prevents zombie process accumulation."
        ],
        diagramTitle: "POSIX Process Lifecycle: fork() -> exec() -> wait()",
        diagram: `  Parent Process (PID: 1000)
       │
       ├─ fork() ─────────────┐
       │ (returns Child PID)   ▼ Child Process (PID: 1001)
       │                       │
       ├─ wait(&status)        ├─ execvp("/bin/ls", ...) [Replaces address space]
       │ (Blocks until Child)  │
       │                       ├─ exit(0)
       │◄── Child Terminated ──┘
       ▼
  Parent Resumes (Collects Exit Status 0)`,
        complexities: [
          { operation: "Process Fork (Copy-on-Write)", best: "O(1)", avg: "O(1)", worst: "O(pages)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (System Calls)",
            code: `#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();

    if (pid < 0) {
        perror("fork failed");
        exit(EXIT_FAILURE);
    } else if (pid == 0) {
        // Child Process
        printf("[CHILD] PID: %d, Parent PID: %d\\n", getpid(), getppid());
        char *args[] = {"ls", "-l", NULL};
        execvp("ls", args);
        perror("execvp failed");
        exit(EXIT_FAILURE);
    } else {
        // Parent Process
        printf("[PARENT] PID: %d, Spawned Child PID: %d. Waiting...\\n", getpid(), pid);
        int status;
        waitpid(pid, &status, 0);
        if (WIFEXITED(status)) {
            printf("[PARENT] Child exited cleanly with status %d\\n", WEXITSTATUS(status));
        }
    }
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Process Creation and Synchronization",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/fork-system-call/",
            platform: "GeeksforGeeks",
            topicTag: "System Calls"
          }
        ]
      }
    ]
  },
  {
    id: "os-scheduling-ipc-deadlocks",
    name: "2. CPU Scheduling, IPC, Semaphores & Deadlocks",
    shortDesc: "FCFS/SJF/RR scheduling, Pipes/Shared Memory IPC, Semaphores, Banker's Algorithm, and Deadlock Detection.",
    iconName: "Cpu",
    topics: [
      {
        id: "os-cpu-scheduling",
        slug: "cpu-scheduling-algorithms",
        title: "Exp 4: CPU Scheduling Algorithms (FCFS, SJF, Priority, Round Robin)",
        categoryId: "os-scheduling-ipc-deadlocks",
        categoryName: "2. CPU Scheduling, IPC, Semaphores & Deadlocks",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "CPU scheduling FCFS SJF Priority Round Robin C Gantt chart",
        gfgUrl: "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/",
        quickSummary: "Simulate non-preemptive and preemptive CPU scheduling algorithms, calculating Waiting Time (WT) and Turnaround Time (TAT).",
        keyPoints: [
          "FCFS (First-Come, First-Served) suffers from Convoy Effect.",
          "SJF (Shortest Job First) is provably optimal for minimizing average waiting time.",
          "Round Robin uses fixed time quantum slices to provide fair interactive response times."
        ],
        diagramTitle: "Round Robin & FCFS Gantt Chart Execution",
        diagram: `  Gantt Chart (Round Robin, Quantum = 2ms):
  ┌──────┬──────┬──────┬──────┬──────┬──────┐
  │  P1  │  P2  │  P3  │  P1  │  P2  │  P1  │
  0      2      4      6      8      10     12
  Turnaround Time = Completion Time - Arrival Time
  Waiting Time    = Turnaround Time - Burst Time`,
        complexities: [
          { operation: "FCFS / SJF Scheduling", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
          { operation: "Round Robin Queue Simulation", best: "O(total_burst / quantum)", avg: "O(total_burst / quantum)", worst: "O(total_burst)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Round Robin Scheduling)",
            code: `#include <stdio.h>

void round_robin(int n, int burst[], int quantum) {
    int rem_burst[n], wt[n], tat[n], t = 0;
    for (int i = 0; i < n; i++) rem_burst[i] = burst[i];

    while (1) {
        int done = 1;
        for (int i = 0; i < n; i++) {
            if (rem_burst[i] > 0) {
                done = 0;
                if (rem_burst[i] > quantum) {
                    t += quantum;
                    rem_burst[i] -= quantum;
                } else {
                    t += rem_burst[i];
                    wt[i] = t - burst[i];
                    rem_burst[i] = 0;
                }
            }
        }
        if (done == 1) break;
    }

    float total_wt = 0, total_tat = 0;
    printf("\\nPID\\tBurst\\tWaiting\\tTurnaround\\n");
    for (int i = 0; i < n; i++) {
        tat[i] = burst[i] + wt[i];
        total_wt += wt[i];
        total_tat += tat[i];
        printf("P%d\\t%d\\t%d\\t%d\\n", i + 1, burst[i], wt[i], tat[i]);
    }
    printf("\\nAvg WT: %.2f | Avg TAT: %.2f\\n", total_wt / n, total_tat / n);
}

int main() {
    int burst[] = {6, 4, 8, 3};
    round_robin(4, burst, 2);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "CPU Scheduling Metrics & Gantt Charts",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/program-for-round-robin-scheduling-for-the-same-arrival-time/",
            platform: "GeeksforGeeks",
            topicTag: "CPU Scheduling"
          }
        ]
      },
      {
        id: "os-ipc-strategies",
        slug: "inter-process-communication-ipc",
        title: "Exp 5: Inter-Process Communication (Pipes, Shared Memory, Message Queues)",
        categoryId: "os-scheduling-ipc-deadlocks",
        categoryName: "2. CPU Scheduling, IPC, Semaphores & Deadlocks",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "IPC pipes shared memory shmget message queues Linux C",
        gfgUrl: "https://www.geeksforgeeks.org/inter-process-communication-ipc/",
        quickSummary: "Exchange data across process boundaries using Anonymous Pipes, POSIX Shared Memory (shmget/shmat), and Message Queues.",
        keyPoints: [
          "Anonymous Pipes pipe(fd) provide unidirectional byte streams between related processes.",
          "Shared Memory maps a shared physical RAM segment into virtual address spaces with zero copying overhead.",
          "POSIX Message Queues provide prioritized, structured message exchange."
        ],
        diagramTitle: "IPC Architectures: Pipe vs Shared Memory",
        diagram: `  Anonymous Pipe (Kernel Buffer):
  [ Process A ] ──► write(fd[1]) ──► [ Kernel Buffer ] ──► read(fd[0]) ──► [ Process B ]

  Shared Memory (Zero Copy Kernel Bypass):
  [ Process A ] ──┐
                  ├─► [ Shared Physical RAM Segment (shm_open / shmat) ] ◄─┤ [ Process B ]`,
        complexities: [
          { operation: "Pipe Read / Write", best: "O(bytes)", avg: "O(bytes)", worst: "O(bytes)", space: "O(pipe_buf)" },
          { operation: "Shared Memory Access", best: "O(1) Direct RAM", avg: "O(1)", worst: "O(1)", space: "O(segment)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Anonymous Pipe IPC)",
            code: `#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>

int main() {
    int pipefd[2];
    pipe(pipefd);  // pipefd[0] = read, pipefd[1] = write

    pid_t pid = fork();
    if (pid == 0) {
        // Child: Receiver
        close(pipefd[1]);  // Close unused write end
        char buffer[128];
        read(pipefd[0], buffer, sizeof(buffer));
        printf("[CHILD IPC] Received Message: %s\\n", buffer);
        close(pipefd[0]);
    } else {
        // Parent: Sender
        close(pipefd[0]);  // Close unused read end
        char msg[] = "IPC Data Packet from Parent Process!";
        write(pipefd[1], msg, strlen(msg) + 1);
        close(pipefd[1]);
        wait(NULL);
    }
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Inter-Process Communication in C",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/c-program-demonstrating-use-of-pipes/",
            platform: "GeeksforGeeks",
            topicTag: "IPC"
          }
        ]
      },
      {
        id: "os-semaphores-mutex",
        slug: "mutual-exclusion-using-semaphores",
        title: "Exp 6: Mutual Exclusion using Semaphores",
        categoryId: "os-scheduling-ipc-deadlocks",
        categoryName: "2. CPU Scheduling, IPC, Semaphores & Deadlocks",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "POSIX semaphores sem_wait sem_post mutex producer consumer C",
        gfgUrl: "https://www.geeksforgeeks.org/semaphores-in-process-synchronization/",
        quickSummary: "Implement Dijkstra counting semaphores and mutex locks to solve the Producer-Consumer bounded-buffer problem.",
        keyPoints: [
          "sem_wait() (P operation) decrements semaphore; blocks if value <= 0.",
          "sem_post() (V operation) increments semaphore; unblocks waiting threads.",
          "Guarantees Critical Section Mutual Exclusion, Progress, and Bounded Waiting."
        ],
        diagramTitle: "Producer-Consumer Bounded Buffer Synchronization",
        diagram: `  [ Producer Thread ]                              [ Consumer Thread ]
          │                                                │
    sem_wait(&empty)                                 sem_wait(&full)
    sem_wait(&mutex)                                 sem_wait(&mutex)
          ▼                                                ▼
  [ Insert item in Buffer[in] ]                     [ Remove item from Buffer[out] ]
          ▼                                                ▼
    sem_post(&mutex)                                 sem_post(&mutex)
    sem_post(&full)                                  sem_post(&empty)`,
        complexities: [
          { operation: "Semaphore Wait / Post", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (POSIX Semaphores)",
            code: `#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

#define BUFFER_SIZE 5
int buffer[BUFFER_SIZE], in = 0, out = 0;
sem_t empty_slots, full_slots;
pthread_mutex_t mutex_lock;

void* producer(void* arg) {
    for (int i = 1; i <= 5; i++) {
        sem_wait(&empty_slots);
        pthread_mutex_lock(&mutex_lock);
        
        buffer[in] = i * 10;
        printf("[PRODUCER] Produced %d at index %d\\n", buffer[in], in);
        in = (in + 1) % BUFFER_SIZE;
        
        pthread_mutex_unlock(&mutex_lock);
        sem_post(&full_slots);
        usleep(100000);
    }
    return NULL;
}

void* consumer(void* arg) {
    for (int i = 1; i <= 5; i++) {
        sem_wait(&full_slots);
        pthread_mutex_lock(&mutex_lock);
        
        int item = buffer[out];
        printf("  [CONSUMER] Consumed %d from index %d\\n", item, out);
        out = (out + 1) % BUFFER_SIZE;
        
        pthread_mutex_unlock(&mutex_lock);
        sem_post(&empty_slots);
        usleep(150000);
    }
    return NULL;
}

int main() {
    sem_init(&empty_slots, 0, BUFFER_SIZE);
    sem_init(&full_slots, 0, 0);
    pthread_mutex_init(&mutex_lock, NULL);

    pthread_t prod, cons;
    pthread_create(&prod, NULL, producer, NULL);
    pthread_create(&cons, NULL, consumer, NULL);

    pthread_join(prod, NULL);
    pthread_join(cons, NULL);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Producer-Consumer Semaphore Coordination",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/producer-consumer-problem-using-semaphores-in-c/",
            platform: "GeeksforGeeks",
            topicTag: "Semaphores"
          }
        ]
      },
      {
        id: "os-bankers-algorithm",
        slug: "deadlock-avoidance-bankers-algorithm",
        title: "Exp 7: Deadlock Avoidance: Banker's Algorithm",
        categoryId: "os-scheduling-ipc-deadlocks",
        categoryName: "2. CPU Scheduling, IPC, Semaphores & Deadlocks",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Bankers algorithm deadlock avoidance safe state C",
        gfgUrl: "https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/",
        quickSummary: "Evaluate resource allocation matrices (Allocation, Max, Need, Available) to find a Safe Sequence and avoid deadlocks.",
        keyPoints: [
          "Need Matrix = Max[i][j] - Allocation[i][j].",
          "Safety Algorithm checks if Need[i] <= Work; if true, process finishes and releases allocated resources.",
          "Resource Request Algorithm grants requests only if resulting state is provably safe."
        ],
        diagramTitle: "Banker's Algorithm Safe State Evaluation Loop",
        diagram: `┌────────────────────────────────────────────────────────┐
│ Find Process P_i where Finish[i] == false AND          │
│ Need[i][j] <= Work[j] (for all resources j)            │
├────────────────────────────┬───────────────────────────┤
│ Found: Work += Alloc[i]    │ None Found:               │
│ Finish[i] = true           │ If all Finish[i] == true: │
│ Append P_i to Safe Sequence│   --> SYSTEM IS SAFE      │
│ (Repeat until all finish)  │ Else: SYSTEM IS UNSAFE    │
└────────────────────────────┴───────────────────────────┘`,
        complexities: [
          { operation: "Safety Algorithm", best: "O(m * n^2)", avg: "O(m * n^2)", worst: "O(m * n^2)", space: "O(n * m)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Banker's Algorithm)",
            code: `#include <stdio.h>
#include <stdbool.h>

#define P 5  // Processes
#define R 3  // Resource types

bool check_safe_state(int alloc[P][R], int max[P][R], int avail[R]) {
    int need[P][R], work[R], safe_seq[P], count = 0;
    bool finish[P] = {false};

    for (int i = 0; i < R; i++) work[i] = avail[i];
    for (int i = 0; i < P; i++)
        for (int j = 0; j < R; j++)
            need[i][j] = max[i][j] - alloc[i][j];

    while (count < P) {
        bool found = false;
        for (int p = 0; p < P; p++) {
            if (!finish[p]) {
                int j;
                for (j = 0; j < R; j++)
                    if (need[p][j] > work[j]) break;
                if (j == R) {
                    for (int k = 0; k < R; k++) work[k] += alloc[p][k];
                    safe_seq[count++] = p;
                    finish[p] = true;
                    found = true;
                }
            }
        }
        if (!found) {
            printf("Deadlock Risk: System is NOT in a safe state!\\n");
            return false;
        }
    }

    printf("System is in a SAFE STATE!\\nSafe Sequence: ");
    for (int i = 0; i < P; i++) printf("P%d ", safe_seq[i]);
    printf("\\n");
    return true;
}

int main() {
    int alloc[P][R] = {{0, 1, 0}, {2, 0, 0}, {3, 0, 2}, {2, 1, 1}, {0, 0, 2}};
    int max[P][R]   = {{7, 5, 3}, {3, 2, 2}, {9, 0, 2}, {2, 2, 2}, {4, 3, 3}};
    int avail[R]    = {3, 3, 2};
    check_safe_state(alloc, max, avail);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Banker's Deadlock Avoidance Algorithm",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/",
            platform: "GeeksforGeeks",
            topicTag: "Banker's Algorithm"
          }
        ]
      },
      {
        id: "os-deadlock-detection",
        slug: "deadlock-detection-algorithm",
        title: "Exp 8: Deadlock Detection Algorithm",
        categoryId: "os-scheduling-ipc-deadlocks",
        categoryName: "2. CPU Scheduling, IPC, Semaphores & Deadlocks",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Deadlock detection algorithm wait for graph C",
        gfgUrl: "https://www.geeksforgeeks.org/deadlock-detection-algorithm-in-operating-system/",
        quickSummary: "Detect circular wait conditions across multi-instance resource systems and identify deadlocked processes.",
        keyPoints: [
          "Uses Request Matrix and Allocation Matrix to trace unfulfillable resource allocations.",
          "Wait-For Graph (WFG) detects cycles: cycle existence indicates active deadlock.",
          "Identifies exact deadlocked process PIDs for termination/preemption."
        ],
        diagramTitle: "Resource-Allocation Graph Cycle Detection (Deadlock)",
        diagram: `      ┌─────────────┐                      ┌─────────────┐
      │ Process P1  │ ───── Requests ────► │ Resource R1 │
      └──────▲──────┘                      └──────┬──────┘
             │                                    │
         Allocated                            Allocated
             │                                    │
      ┌──────┴──────┐                      ┌──────▼──────┐
      │ Resource R2 │ ◄──── Requests ───── │ Process P2  │
      └─────────────┘                      └─────────────┘
              ▲                                   │
              └──────── CIRCULAR WAIT CYCLE ──────┘`,
        complexities: [
          { operation: "Deadlock Cycle Detection", best: "O(m * n^2)", avg: "O(m * n^2)", worst: "O(m * n^2)", space: "O(n * m)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Deadlock Detection)",
            code: `#include <stdio.h>
#include <stdbool.h>

#define P 4
#define R 3

void detect_deadlock(int alloc[P][R], int request[P][R], int avail[R]) {
    int work[R];
    bool finish[P] = {false};
    for (int i = 0; i < R; i++) work[i] = avail[i];

    // Processes with 0 allocation are marked finished
    for (int i = 0; i < P; i++) {
        bool has_alloc = false;
        for (int j = 0; j < R; j++) if (alloc[i][j] != 0) has_alloc = true;
        if (!has_alloc) finish[i] = true;
    }

    while (1) {
        bool progress = false;
        for (int p = 0; p < P; p++) {
            if (!finish[p]) {
                int j;
                for (j = 0; j < R; j++) if (request[p][j] > work[j]) break;
                if (j == R) {
                    for (int k = 0; k < R; k++) work[k] += alloc[p][k];
                    finish[p] = true;
                    progress = true;
                }
            }
        }
        if (!progress) break;
    }

    bool deadlock_found = false;
    for (int i = 0; i < P; i++) {
        if (!finish[i]) {
            printf("[DEADLOCK] Process P%d is deadlocked!\\n", i);
            deadlock_found = true;
        }
    }
    if (!deadlock_found) printf("[SAFE] No deadlocks detected in system.\\n");
}

int main() {
    int alloc[P][R]   = {{0, 1, 0}, {2, 0, 0}, {3, 0, 3}, {2, 1, 1}};
    int request[P][R] = {{0, 0, 0}, {2, 0, 2}, {0, 0, 0}, {1, 0, 0}};
    int avail[R]      = {0, 0, 0};
    detect_deadlock(alloc, request, avail);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Deadlock Detection & Graph Reduction",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/deadlock-detection-algorithm-in-operating-system/",
            platform: "GeeksforGeeks",
            topicTag: "Deadlock Detection"
          }
        ]
      },
      {
        id: "os-posix-threads",
        slug: "multithreading-posix-threads",
        title: "Exp 9: Multi-Threading using POSIX Threads (pthreads)",
        categoryId: "os-scheduling-ipc-deadlocks",
        categoryName: "2. CPU Scheduling, IPC, Semaphores & Deadlocks",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "pthread_create pthread_join multithreading in C mutex",
        gfgUrl: "https://www.geeksforgeeks.org/multithreading-c-2/",
        quickSummary: "Create, synchronize, and join concurrent lightweight POSIX threads sharing heap and global variables.",
        keyPoints: [
          "pthread_create() launches thread routine; pthread_join() blocks until thread terminates.",
          "Threads share process address space (heap, data, code) but possess private registers and call stacks.",
          "Mutex locks prevent race conditions on shared memory counters."
        ],
        diagramTitle: "Multi-Threaded Process Shared Address Space",
        diagram: `┌────────────────────────────────────────────────────────┐
│ Process Virtual Address Space                          │
├────────────────────────────────────────────────────────┤
│ Text (Code) & Initialized Data (Global Variables)      │
│ Shared Heap Memory (malloc / free)                     │
├───────────────────┬──────────────────┬─────────────────┤
│ Thread 1: Stack   │ Thread 2: Stack  │ Thread 3: Stack │
│ Thread 1: Regs    │ Thread 2: Regs   │ Thread 3: Regs  │
└───────────────────┴──────────────────┴─────────────────┘`,
        complexities: [
          { operation: "Thread Spawning Overhead", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(stack_size)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (pthreads Matrix Multiplication)",
            code: `#include <stdio.h>
#include <pthread.h>

#define N 3
int A[N][N] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
int B[N][N] = {{9, 8, 7}, {6, 5, 4}, {3, 2, 1}};
int C[N][N];

typedef struct { int row; } ThreadData;

void* multiply_row(void* arg) {
    ThreadData* data = (ThreadData*)arg;
    int r = data->row;
    for (int j = 0; j < N; j++) {
        C[r][j] = 0;
        for (int k = 0; k < N; k++) C[r][j] += A[r][k] * B[k][j];
    }
    pthread_exit(NULL);
}

int main() {
    pthread_t threads[N];
    ThreadData data[N];

    for (int i = 0; i < N; i++) {
        data[i].row = i;
        pthread_create(&threads[i], NULL, multiply_row, (void*)&data[i]);
    }
    for (int i = 0; i < N; i++) pthread_join(threads[i], NULL);

    printf("Result Matrix C (Computed in parallel across %d threads):\\n", N);
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) printf("%d\\t", C[i][j]);
        printf("\\n");
    }
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Multi-Threading with POSIX Threads",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/multithreading-c-2/",
            platform: "GeeksforGeeks",
            topicTag: "pthreads"
          }
        ]
      }
    ]
  },
  {
    id: "os-memory-files-disk",
    name: "3. Memory Paging, File Systems & Disk Scheduling",
    shortDesc: "Paging, Dynamic allocation (First/Worst/Best), Page replacement, File allocation, and Disk scheduling.",
    iconName: "Database",
    topics: [
      {
        id: "os-paging-technique",
        slug: "paging-technique-simulation",
        title: "Exp 10: Implement Paging Technique",
        categoryId: "os-memory-files-disk",
        categoryName: "3. Memory Paging, File Systems & Disk Scheduling",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Paging technique in OS logical to physical address translation C",
        gfgUrl: "https://www.geeksforgeeks.org/paging-in-operating-system/",
        quickSummary: "Simulate MMU virtual-to-physical address translation via Page Tables: Physical Address = (Frame Number * Page Size) + Offset.",
        keyPoints: [
          "Logical Address partitioned into Page Number (p) and Offset (d).",
          "Page Table maps Page Number to Physical Frame Number (f).",
          "Eliminates external fragmentation by allocating non-contiguous physical memory frames."
        ],
        diagramTitle: "MMU Page Table Address Translation",
        diagram: `  Logical Address: [ Page Number p: 2 ] [ Offset d: 0x48 ]
                                │
                                ▼
                       ┌─────────────────┐
                       │   Page Table    │
                       ├─────┬───────────┤
                       │ p=0 │ Frame 5   │
                       │ p=1 │ Frame 2   │
                       │ p=2 │ Frame 8 ──┼──► Physical Frame 8
                       └─────┴───────────┘
                                                │
                                                ▼
  Physical Address: [ Frame Number f: 8 ] [ Offset d: 0x48 ]`,
        complexities: [
          { operation: "Page Table Lookup", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(pages)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Paging Address Translation)",
            code: `#include <stdio.h>

int main() {
    int page_size = 1024;  // 1 KB
    int page_table[] = {5, 2, 8, 1, 9};  // Page -> Frame mapping
    int num_pages = 5;

    int logical_addr = 2100;  // Query address
    int page_num = logical_addr / page_size;
    int offset = logical_addr % page_size;

    if (page_num < num_pages) {
        int frame_num = page_table[page_num];
        int physical_addr = (frame_num * page_size) + offset;
        printf("Logical Address: %d bytes\\n", logical_addr);
        printf("  -> Page Number: %d, Offset: %d\\n", page_num, offset);
        printf("  -> Mapped Frame: %d\\n", frame_num);
        printf("  -> Physical Address: %d bytes\\n", physical_addr);
    } else {
        printf("Page fault / Segmentation Fault: Page %d out of bounds!\\n", page_num);
    }
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Paging and Virtual Memory Mapping",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/paging-in-operating-system/",
            platform: "GeeksforGeeks",
            topicTag: "Paging"
          }
        ]
      },
      {
        id: "os-dynamic-mem-allocation",
        slug: "dynamic-memory-allocation-methods",
        title: "Exp 11: Dynamic Memory Allocation Methods: First Fit, Best Fit, Worst Fit",
        categoryId: "os-memory-files-disk",
        categoryName: "3. Memory Paging, File Systems & Disk Scheduling",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Dynamic memory allocation First Fit Best Fit Worst Fit C",
        gfgUrl: "https://www.geeksforgeeks.org/program-for-best-fit-algorithm-in-memory-management/",
        quickSummary: "Compare contiguous memory placement algorithms (First Fit, Best Fit, Worst Fit) and measure internal/external fragmentation.",
        keyPoints: [
          "First Fit allocates the first available hole large enough.",
          "Best Fit allocates the smallest hole that is big enough (minimizes leftover space).",
          "Worst Fit allocates the largest available hole (leaves maximum leftover chunk)."
        ],
        diagramTitle: "Dynamic Memory Allocation Partition Comparison",
        diagram: `  Memory Blocks: [ 100 KB ] [ 500 KB ] [ 200 KB ] [ 300 KB ] [ 600 KB ]
  Incoming Process Request: 212 KB

  First Fit: Allocates [ 500 KB ] (1st match) -> Leftover: 288 KB
  Best Fit:  Allocates [ 300 KB ] (Tightest)  -> Leftover: 88 KB
  Worst Fit: Allocates [ 600 KB ] (Largest)   -> Leftover: 388 KB`,
        complexities: [
          { operation: "First Fit", best: "O(1)", avg: "O(blocks)", worst: "O(blocks)", space: "O(1)" },
          { operation: "Best / Worst Fit", best: "O(blocks)", avg: "O(blocks)", worst: "O(blocks)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Best Fit Allocation)",
            code: `#include <stdio.h>

void best_fit(int block_size[], int m, int process_size[], int n) {
    int allocation[n];
    for (int i = 0; i < n; i++) allocation[i] = -1;

    for (int i = 0; i < n; i++) {
        int best_idx = -1;
        for (int j = 0; j < m; j++) {
            if (block_size[j] >= process_size[i]) {
                if (best_idx == -1 || block_size[j] < block_size[best_idx])
                    best_idx = j;
            }
        }
        if (best_idx != -1) {
            allocation[i] = best_idx;
            block_size[best_idx] -= process_size[i];
        }
    }

    printf("\\nProcess No.\\tProcess Size\\tAllocated Block No.\\n");
    for (int i = 0; i < n; i++) {
        printf(" %d\\t\\t%d\\t\\t", i + 1, process_size[i]);
        if (allocation[i] != -1) printf("%d\\n", allocation[i] + 1);
        else printf("Not Allocated\\n");
    }
}

int main() {
    int block_size[] = {100, 500, 200, 300, 600};
    int process_size[] = {212, 417, 112, 426};
    best_fit(block_size, 5, process_size, 4);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Contiguous Memory Allocation Algorithms",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/program-for-best-fit-algorithm-in-memory-management/",
            platform: "GeeksforGeeks",
            topicTag: "Memory Allocation"
          }
        ]
      },
      {
        id: "os-page-replacement",
        slug: "page-replacement-algorithms",
        title: "Exp 12: Page Replacement Algorithms (FIFO, LRU, Optimal)",
        categoryId: "os-memory-files-disk",
        categoryName: "3. Memory Paging, File Systems & Disk Scheduling",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Page replacement algorithms FIFO LRU Optimal Belady anomaly C",
        gfgUrl: "https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/",
        quickSummary: "Simulate demand paging page fault frequencies for FIFO, Least Recently Used (LRU), and Belady's Optimal algorithms.",
        keyPoints: [
          "FIFO replaces oldest loaded page; susceptible to Belady's Anomaly.",
          "LRU replaces the page that has not been referenced for the longest past interval.",
          "Optimal replaces the page that will not be used for the longest future period (theoretical benchmark)."
        ],
        diagramTitle: "LRU vs FIFO Page Replacement Trace (3 Frames)",
        diagram: `  Page Reference String: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3
  LRU Frames:
  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐
  │ 7 │ │ 7 │ │ 7 │ │ 2 │ │ 2 │ │ 2 │ (Page faults triggered when page missing)
  │   │ │ 0 │ │ 0 │ │ 0 │ │ 0 │ │ 0 │
  │   │ │   │ │ 1 │ │ 1 │ │ 1 │ │ 3 │
  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘`,
        complexities: [
          { operation: "FIFO Page Check", best: "O(1)", avg: "O(frames)", worst: "O(frames)", space: "O(frames)" },
          { operation: "LRU Timestamp / Stack", best: "O(1)", avg: "O(frames)", worst: "O(frames)", space: "O(frames)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (LRU Page Replacement)",
            code: `#include <stdio.h>

int find_lru(int time[], int n) {
    int min = time[0], pos = 0;
    for (int i = 1; i < n; ++i) {
        if (time[i] < min) { min = time[i]; pos = i; }
    }
    return pos;
}

int main() {
    int frames = 3, pages[] = {7, 0, 1, 2, 0, 3, 0, 4, 2, 3}, n = 10;
    int frame_arr[frames], time[frames], page_faults = 0, counter = 0;

    for (int i = 0; i < frames; ++i) frame_arr[i] = -1;

    for (int i = 0; i < n; ++i) {
        int flag1 = 0, flag2 = 0;
        for (int j = 0; j < frames; ++j) {
            if (frame_arr[j] == pages[i]) {
                counter++;
                time[j] = counter;
                flag1 = flag2 = 1;
                break;
            }
        }
        if (flag1 == 0) {
            for (int j = 0; j < frames; ++j) {
                if (frame_arr[j] == -1) {
                    counter++;
                    page_faults++;
                    frame_arr[j] = pages[i];
                    time[j] = counter;
                    flag2 = 1;
                    break;
                }
            }
        }
        if (flag2 == 0) {
            int pos = find_lru(time, frames);
            counter++;
            page_faults++;
            frame_arr[pos] = pages[i];
            time[pos] = counter;
        }
    }
    printf("Total LRU Page Faults: %d / %d references\\n", page_faults, n);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "LRU Cache Design & Page Replacement",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/lru-cache/",
            platform: "LeetCode",
            topicTag: "LRU"
          }
        ]
      },
      {
        id: "os-file-organization",
        slug: "file-organization-techniques",
        title: "Exp 13: File Organization Techniques (Single, Two-Level, Hierarchical)",
        categoryId: "os-memory-files-disk",
        categoryName: "3. Memory Paging, File Systems & Disk Scheduling",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "File directory organization single level two level hierarchical C",
        gfgUrl: "https://www.geeksforgeeks.org/structures-of-directory-in-operating-system/",
        quickSummary: "Model single-level flat namespaces, two-level per-user directories (UFD), and hierarchical N-ary directory trees.",
        keyPoints: [
          "Single-Level Directory causes naming collisions among multiple users.",
          "Two-Level Directory isolates Master File Directory (MFD) into User File Directories (UFD).",
          "Hierarchical Tree Directory allows arbitrary subdirectories with absolute and relative path resolution."
        ],
        diagramTitle: "Hierarchical N-Ary Directory Tree Structure",
        diagram: `                    Root Directory /
                  ┌─────────┴─────────┐
                  ▼                   ▼
                /home               /etc
            ┌─────┴─────┐             │
            ▼           ▼             ▼
         /alice       /bob         passwd
            │           │
         file.txt    script.py`,
        complexities: [
          { operation: "Tree Path Traversal", best: "O(depth)", avg: "O(depth * fanout)", worst: "O(nodes)", space: "O(tree)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Hierarchical Tree Simulation)",
            code: `#include <stdio.h>
#include <string.h>

struct Directory {
    char name[32];
    char files[5][32];
    int file_count;
};

int main() {
    struct Directory root = {"root", {"kernel.bin", "config.sys"}, 2};
    struct Directory user_docs = {"docs", {"lab1.c", "notes.txt"}, 2};

    printf("--- Directory Tree Listing ---\\n");
    printf("/%s/\\n", root.name);
    for (int i = 0; i < root.file_count; i++) printf("  ├── %s\\n", root.files[i]);
    printf("  └── /%s/\\n", user_docs.name);
    for (int i = 0; i < user_docs.file_count; i++) printf("      └── %s\\n", user_docs.files[i]);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Directory Hierarchy Traversal",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/structures-of-directory-in-operating-system/",
            platform: "GeeksforGeeks",
            topicTag: "File Systems"
          }
        ]
      },
      {
        id: "os-file-allocation",
        slug: "file-allocation-strategies",
        title: "Exp 14: File Allocation Strategies: Sequential, Indexed, Linked",
        categoryId: "os-memory-files-disk",
        categoryName: "3. Memory Paging, File Systems & Disk Scheduling",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "File allocation methods contiguous linked indexed allocation C",
        gfgUrl: "https://www.geeksforgeeks.org/file-allocation-methods/",
        quickSummary: "Simulate file block allocation strategies: Contiguous/Sequential, Linked list FAT blocks, and Indexed Inodes.",
        keyPoints: [
          "Contiguous allocation provides fast direct access but suffers from external fragmentation.",
          "Linked allocation eliminates external fragmentation but incurs pointer overhead and slow random seeking.",
          "Indexed allocation (UNIX Inode) maintains index blocks storing direct and indirect block pointers."
        ],
        diagramTitle: "UNIX Inode Indexed Block Allocation Hierarchy",
        diagram: `┌──────────────────────────────────────────────┐
│ Inode Metadata (Permissions, Size, Timestamps│
├──────────────────────────────────────────────┤
│ Direct Block Pointers [0..11] ──► Data Blocks│
│ Single Indirect Pointer ──► Pointer Table ──►│
│ Double Indirect Pointer ──► Index Table ────►│
└──────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Contiguous Direct Access", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Linked Sequential Seek", best: "O(1)", avg: "O(k)", worst: "O(k)", space: "O(pointers)" },
          { operation: "Indexed Inode Lookup", best: "O(1)", avg: "O(levels)", worst: "O(levels)", space: "O(index_blocks)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (Indexed File Allocation)",
            code: `#include <stdio.h>

struct InodeIndex {
    char filename[32];
    int index_block;
    int blocks[10];
    int length;
};

int main() {
    struct InodeIndex file = {"vlab_report.pdf", 99, {12, 13, 14, 25, 26}, 5};

    printf("File: %s | Index Block: %d\\n", file.filename, file.index_block);
    printf("Allocated Disk Blocks: ");
    for (int i = 0; i < file.length; i++) {
        printf("[%d] -> ", file.blocks[i]);
    }
    printf("EOF\\n");
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "File Allocation Strategies in Operating Systems",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/file-allocation-methods/",
            platform: "GeeksforGeeks",
            topicTag: "File Allocation"
          }
        ]
      },
      {
        id: "os-disk-scheduling",
        slug: "disk-scheduling-algorithms",
        title: "Exp 15: Disk Scheduling Algorithms (FCFS, SSTF, SCAN, C-SCAN, LOOK)",
        categoryId: "os-memory-files-disk",
        categoryName: "3. Memory Paging, File Systems & Disk Scheduling",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Disk scheduling algorithms FCFS SSTF SCAN CSCAN LOOK C total head movement",
        gfgUrl: "https://www.geeksforgeeks.org/disk-scheduling-algorithms/",
        quickSummary: "Calculate Total Head Movement (THM) cylinders for FCFS, Shortest Seek Time First (SSTF), SCAN (Elevator), and C-SCAN.",
        keyPoints: [
          "SSTF chooses request closest to current head position (minimizes average seek time, potential starvation).",
          "SCAN (Elevator) sweeps back and forth servicing requests until boundaries.",
          "C-SCAN (Circular SCAN) sweeps in one direction, returning to cylinder 0 without servicing on return."
        ],
        diagramTitle: "SCAN vs C-SCAN Cylinder Sweep Trajectory",
        diagram: `  Cylinder Range: 0 .................................................... 199
  Initial Head Position: 53 (Moving right)

  SCAN:   53 ──► 65 ──► 98 ──► 183 ──► 199 (Boundary) ──► 37 ──► 14 (Reverses)
  C-SCAN: 53 ──► 65 ──► 98 ──► 183 ──► 199 ──► 0 (Jumps without service) ──► 14 ──► 37`,
        complexities: [
          { operation: "SSTF Head Movement", best: "O(n^2)", avg: "O(n^2)", worst: "O(n^2)", space: "O(n)" },
          { operation: "SCAN / C-SCAN Sorting", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "c",
            label: "C (SCAN Disk Scheduling)",
            code: `#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b) { return (*(int*)a - *(int*)b); }

void scan_disk(int req[], int n, int head, int disk_size) {
    int seek_count = 0, cur_track;
    int left[n+1], right[n+1], l_idx = 0, r_idx = 0;

    right[r_idx++] = disk_size - 1;  // Sweep to maximum cylinder
    for (int i = 0; i < n; i++) {
        if (req[i] < head) left[l_idx++] = req[i];
        else right[r_idx++] = req[i];
    }
    qsort(left, l_idx, sizeof(int), compare);
    qsort(right, r_idx, sizeof(int), compare);

    printf("SCAN Head Trajectory: %d ", head);
    for (int i = 0; i < r_idx; i++) {
        cur_track = right[i];
        seek_count += abs(cur_track - head);
        head = cur_track;
        printf("-> %d ", cur_track);
    }
    for (int i = l_idx - 1; i >= 0; i--) {
        cur_track = left[i];
        seek_count += abs(cur_track - head);
        head = cur_track;
        printf("-> %d ", cur_track);
    }
    printf("\\nTotal Head Movement: %d cylinders\\n", seek_count);
}

int main() {
    int req[] = {98, 183, 37, 122, 14, 124, 65, 67};
    scan_disk(req, 8, 53, 200);
    return 0;
}`
          }
        ],
        practiceProblems: [
          {
            title: "Disk Scheduling Seek Time Optimization",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/disk-scheduling-algorithms/",
            platform: "GeeksforGeeks",
            topicTag: "Disk Scheduling"
          }
        ]
      }
    ]
  }
];
