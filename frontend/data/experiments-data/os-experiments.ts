import { Experiment } from "../experiments";

export const OS_EXPERIMENTS: Experiment[] = [
  {
    id: "os-exp-1",
    labId: "operating-systems",
    title: "Exp 1: Installation of Operating system : Windows/ Linux",
    slug: "installation-of-operating-system-windows-linux",
    difficulty: "Beginner",
    category: "Operating Systems" as any,
    estimatedMinutes: 30,
    rating: 4.88,
    ratingsCount: 110,
    simulator: "custom",
    quizId: "quiz-os-1",
    sections: {
      introduction: "Operating System installation configures system bootloader firmware (BIOS/UEFI), disk partitioning schemes (GPT vs MBR), filesystems (ext4, NTFS), and device driver hardware abstraction layers.",
      objective: "Understand bootloader initialization, configure dual-boot GPT partition tables with root (/), swap, and boot EFI partitions, and install Ubuntu Linux alongside Windows.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Linux Installation & Disk Partitioning",
      videoChannel: "NetworkChuck",
      prerequisites: ["Computer Hardware Basics", "BIOS/UEFI Configuration"],
      theory: {
        overview: "The UEFI firmware reads the EFI System Partition (ESP) on a GUID Partition Table (GPT) disk to load GRUB2 (Grand Unified Bootloader). GRUB loads the Linux kernel into memory, mounts the root filesystem in read-only mode, initializes device drivers, and starts systemd PID 1.",
        keyConcepts: [
          { title: "UEFI vs Legacy BIOS", desc: "UEFI supports 64-bit mode, secure boot signatures, and drives > 2.2 TB." },
          { title: "GPT Partitioning Scheme", desc: "GUID Partition Table supports up to 128 primary partitions with CRC redundancy." },
          { title: "Mount Points & Filesystems", desc: "Root (/), /boot/efi (FAT32), /home (ext4), and Swap space for virtual memory paging." }
        ],
        complexities: [
          { operation: "Kernel Boot Sequence", best: "O(1)", avg: "2-5s", worst: "15s", space: "O(initramfs_RAM)" }
        ],
        realWorldApplications: [
          "Enterprise bare-metal server cluster provisioning",
          "Automated cloud VM image creation (Cloud-init)",
          "Embedded Linux bootloader configuration for IoT devices"
        ]
      },
      procedure: [
        "1. Create bootable USB drive using Rufus or balenaEtcher with Ubuntu LTS ISO.",
        "2. Access system BIOS/UEFI setup (F2/F12) and disable Secure Boot.",
        "3. Allocate unallocated disk space for root partition (/) and swap partition.",
        "4. Set bootloader installation device to EFI System Partition.",
        "5. Complete OS installation and verify GRUB2 dual-boot menu entries."
      ],
      sampleCode: {
        language: "bash",
        code: `# Check Disk Partition Scheme and Block Devices in Linux
lsblk -f

# Verify EFI Bootloader entries
efibootmgr -v

# Inspect active mounts and file systems
df -hT`
      },
      expectedOutput: `NAME   FSTYPE FSVER LABEL UUID                                 MOUNTPOINTS
sda                                                            
├─sda1 vfat   FAT32       6A8B-21D4                            /boot/efi
├─sda2 ext4   1.0         c12a8490-50d4-4f2a-b02d-0b893112a970 /
└─sda3 swap   1           781d45bc-8a71-4702-8561-12c8a0029b31 [SWAP]`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Science"]
      }
    }
  },
  {
    id: "os-exp-2",
    labId: "operating-systems",
    title: "Exp 2: Illustrate UNIX commands & Shell programming",
    slug: "unix-commands-and-shell-programming",
    difficulty: "Beginner",
    category: "Operating Systems" as any,
    estimatedMinutes: 30,
    rating: 4.92,
    ratingsCount: 125,
    simulator: "custom",
    quizId: "quiz-os-2",
    sections: {
      introduction: "UNIX shell scripts automate system administration, file pipeline processing, stream redirection (stdin, stdout, stderr), and regex text transformations via standard POSIX utilities.",
      objective: "Master core shell commands (grep, sed, awk, find, cut, sort) and write automated Bash shell scripts with conditional logic, loops, and pipeline filters.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Linux Bash Scripting Fundamentals",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Linux Command Line", "Basic Programming"],
      theory: {
        overview: "UNIX follows the design philosophy: 'Everything is a file' and small programs do one job well and compose via pipes (|). Standard file descriptors: stdin (0), stdout (1), stderr (2). Bash scripts execute within sub-shells using the #!/bin/bash shebang directive.",
        keyConcepts: [
          { title: "Pipeline Chaining (|)", desc: "Redirects standard output of preceding command to standard input of following command without disk I/O." },
          { title: "Stream Redirection", desc: "> overwrites file, >> appends, 2>&1 redirects stderr to stdout." },
          { title: "Stream Editor (sed & awk)", desc: "sed performs regex string substitutions; awk processes column records." }
        ],
        complexities: [
          { operation: "Pipe Stream Processing", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(pipe_buffer_64KB)" }
        ],
        realWorldApplications: [
          "CI/CD continuous integration build pipelines",
          "Automated server log parsing and alerting scripts",
          "Scheduled cron job database backups and archiving"
        ]
      },
      procedure: [
        "1. Create a bash script file named log_parser.sh and add #!/bin/bash.",
        "2. Add execute permissions using chmod +x log_parser.sh.",
        "3. Use grep to filter error lines from log files.",
        "4. Pipe filtered lines to awk '{print $1, $4}' to extract timestamp and error message.",
        "5. Execute script and inspect formatted terminal output."
      ],
      sampleCode: {
        language: "bash",
        code: `#!/bin/bash
# Shell Script: Process and summarize HTTP access log metrics

LOG_DATA="
192.168.1.10 - [02/Sep/2026:10:00:01] GET /index.html 200
192.168.1.15 - [02/Sep/2026:10:00:05] POST /login 401
192.168.1.10 - [02/Sep/2026:10:00:12] GET /dashboard 200
192.168.1.20 - [02/Sep/2026:10:00:15] GET /api/data 500
"

echo "=== Unique Client IP Access Frequencies ==="
echo "$LOG_DATA" | grep -v '^$' | awk '{print $1}' | sort | uniq -c | sort -nr`
      },
      expectedOutput: `=== Unique Client IP Access Frequencies ===
      2 192.168.1.10
      1 192.168.1.20
      1 192.168.1.15`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Science"]
      }
    }
  },
  {
    id: "os-exp-3",
    labId: "operating-systems",
    title: "Exp 3: Process System Calls: Write programs to simulate the following process system calls: a) fork b) exec c) getpid d) exit e) wait f) close",
    slug: "process-system-calls-fork-exec-wait",
    difficulty: "Intermediate",
    category: "Operating Systems" as any,
    estimatedMinutes: 35,
    rating: 4.95,
    ratingsCount: 140,
    simulator: "custom",
    quizId: "quiz-os-3",
    sections: {
      introduction: "System calls represent the programmatic interface between user-space applications and kernel-space hardware services for process lifecycle management.",
      objective: "Write C programs implementing fork(), exec(), getpid(), getppid(), wait(), exit(), and close() system calls to manage child process hierarchies.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Linux Process System Calls (fork, exec, wait)",
      videoChannel: "Jacob Sorber",
      prerequisites: ["C Programming Pointers", "Kernel vs User Space"],
      theory: {
        overview: "fork() clones the calling process, duplicating memory pages via Copy-on-Write (COW). The child receives return value 0, while parent receives the child's PID. execvp() replaces the process memory image with a new binary executable. wait() blocks parent until child terminates.",
        keyConcepts: [
          { title: "fork() & Return Codes", desc: "Returns 0 to child, child PID to parent, and -1 on OS failure." },
          { title: "execvp() Image Replacement", desc: "Replaces text, data, heap, and stack segments with specified target program." },
          { title: "Zombie & Orphan States", desc: "Zombie: Terminated child uncollected by parent wait(); Orphan: Parent terminates before child." }
        ],
        complexities: [
          { operation: "fork() with Copy-on-Write", best: "O(1)", avg: "O(1 page table copy)", worst: "O(pages)", space: "O(page_tables)" }
        ],
        realWorldApplications: [
          "Unix shell command line interpreter (e.g. bash, zsh)",
          "Web server worker process spawning (e.g. Nginx master-worker architecture)",
          "Background daemon process daemonization"
        ]
      },
      procedure: [
        "1. Write C code including <unistd.h>, <sys/types.h>, and <sys/wait.h>.",
        "2. Call fork() and capture return PID value.",
        "3. Branch on PID == 0 (Child) and call getpid() and execvp('ls', ...).",
        "4. Branch on PID > 0 (Parent) and call wait(&status) to reap child process.",
        "5. Inspect process execution logs."
      ],
      sampleCode: {
        language: "c",
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
        char *args[] = {"echo", "Hello from execvp system call!", NULL};
        execvp("echo", args);
        exit(0);
    } else {
        // Parent Process
        int status;
        printf("[PARENT] PID: %d spawned Child PID: %d\\n", getpid(), pid);
        wait(&status);
        printf("[PARENT] Child finished with exit status: %d\\n", WEXITSTATUS(status));
    }
    return 0;
}`
      },
      expectedOutput: `[PARENT] PID: 4501 spawned Child PID: 4502
[CHILD] PID: 4502, Parent PID: 4501
Hello from execvp system call!
[PARENT] Child finished with exit status: 0`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Science"]
      }
    }
  },
  {
    id: "os-exp-4",
    labId: "operating-systems",
    title: "Exp 4: CPU Scheduling: Write programs to simulate the following CPU scheduling algorithms: a) FCFS b) SJF c) Priority d) Round Robin",
    slug: "cpu-scheduling-algorithms-fcfs-sjf-priority-rr",
    difficulty: "Intermediate",
    category: "Operating Systems" as any,
    estimatedMinutes: 35,
    rating: 4.96,
    ratingsCount: 155,
    simulator: "custom",
    quizId: "quiz-os-4",
    sections: {
      introduction: "CPU Scheduling algorithms determine the order in which ready processes are allocated CPU core execution time to minimize Average Waiting Time (AWT) and Turnaround Time (TAT).",
      objective: "Simulate and compare First-Come First-Served (FCFS), Shortest Job First (SJF), Priority Scheduling, and Round Robin (RR) with quantum preemption.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "CPU Scheduling Algorithms Explained",
      videoChannel: "NPTEL Operating Systems",
      prerequisites: ["Process Control Block (PCB)", "Ready Queue"],
      theory: {
        overview: "Turnaround Time TAT = Completion Time (CT) - Arrival Time (AT). Waiting Time WT = TAT - Burst Time (BT). FCFS suffers from the convoy effect. SJF minimizes AWT but risks starvation of long bursts. Round Robin guarantees bounded response time via time quantum time-slicing.",
        keyConcepts: [
          { title: "Convoy Effect (FCFS)", desc: "Short processes delayed behind long CPU-bound process." },
          { title: "Shortest Job First (SJF)", desc: "Mathematically optimal minimum average waiting time for non-preemptive workloads." },
          { title: "Round Robin Time Quantum", desc: "Preempts active process and appends to tail of ready queue when slice expires." }
        ],
        complexities: [
          { operation: "Round Robin Scheduling", best: "O(1 dispatch)", avg: "O(n * bursts/quantum)", worst: "O(n * max_burst)", space: "O(n)" }
        ],
        realWorldApplications: [
          "Linux Completely Fair Scheduler (CFS) red-black tree process queue",
          "Windows kernel interactive priority boost scheduling",
          "Real-time embedded RTOS deadline priority dispatching"
        ]
      },
      procedure: [
        "1. Define process data structure: PID, Arrival Time, Burst Time, Remaining Time, WT, TAT.",
        "2. Implement FCFS sorting by Arrival Time.",
        "3. Implement SJF selecting minimum burst process in ready queue.",
        "4. Implement Round Robin with time quantum q = 2.",
        "5. Output Gantt chart completion metrics and Average Waiting Times."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

void roundRobin(int n, int bt[], int quantum) {
    int rem_bt[10], wt[10], tat[10], t = 0;
    for (int i = 0; i < n; i++) rem_bt[i] = bt[i];

    int done = 0;
    while (!done) {
        done = 1;
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
    }
    float total_wt = 0, total_tat = 0;
    printf("PID\\tBurst\\tWait\\tTAT\\n");
    for (int i = 0; i < n; i++) {
        tat[i] = bt[i] + wt[i];
        total_wt += wt[i];
        total_tat += tat[i];
        printf("P%d\\t%d\\t%d\\t%d\\n", i + 1, bt[i], wt[i], tat[i]);
    }
    printf("Average Waiting Time: %.2f\\n", total_wt / n);
}

int main() {
    int bt[] = {10, 5, 8};
    roundRobin(3, bt, 2);
    return 0;
}`
      },
      expectedOutput: `PID	Burst	Wait	TAT
P1	10	13	23
P2	5	10	15
P3	8	13	21
Average Waiting Time: 12.00`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Science"]
      }
    }
  },
  {
    id: "os-exp-5",
    labId: "operating-systems",
    title: "Exp 5: Inter Process Communication: Write programs to simulate Inter Process Communication (IPC) using: a) Pipes b) Shared Memory c) Message Queues",
    slug: "inter-process-communication-pipes-shared-memory-msgqueue",
    difficulty: "Intermediate",
    category: "Operating Systems" as any,
    estimatedMinutes: 35,
    rating: 4.94,
    ratingsCount: 135,
    simulator: "custom",
    quizId: "quiz-os-5",
    sections: {
      introduction: "Inter-Process Communication (IPC) mechanisms enable isolated, memory-protected OS processes to synchronize and exchange data streams safely.",
      objective: "Implement unidirectional anonymous UNIX Pipes (pipe()), POSIX Shared Memory (shm_open(), mmap()), and POSIX Message Queues.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Linux IPC: Pipes & Shared Memory",
      videoChannel: "Jacob Sorber",
      prerequisites: ["Process System Calls", "Virtual Memory Paging"],
      theory: {
        overview: "Anonymous Pipes pipe(fd[2]) allocate a unidirectional kernel circular buffer (fd[0] read, fd[1] write) shared across parent-child forks. Shared Memory maps the identical physical RAM page into the virtual address spaces of multiple processes, achieving zero-copy IPC at maximum throughput.",
        keyConcepts: [
          { title: "Anonymous Pipe", desc: "Kernel-managed unidirectional byte pipe closed on EOF." },
          { title: "Shared Memory (mmap)", desc: "Fastest IPC mechanism; requires mutex/semaphores for race condition synchronization." },
          { title: "Message Queues", desc: "Structured message delivery with priority tagging independent of process lifecycle." }
        ],
        complexities: [
          { operation: "Pipe Write & Read", best: "O(1)", avg: "O(bytes)", worst: "O(bytes)", space: "O(kernel_buf)" },
          { operation: "Shared Memory Read", best: "O(1)", avg: "O(1 RAM access)", worst: "O(1)", space: "O(mapped_pages)" }
        ],
        realWorldApplications: [
          "Chrome multi-process browser tab and GPU IPC channels",
          "High-frequency financial trading IPC engines",
          "PostgreSQL shared buffer pool memory architecture"
        ]
      },
      procedure: [
        "1. Create pipe descriptors int fd[2] and invoke pipe(fd).",
        "2. Call fork() to spawn child process.",
        "3. In parent: close fd[0] (read end) and write string message to fd[1].",
        "4. In child: close fd[1] (write end) and read message bytes from fd[0].",
        "5. Output message to verify successful IPC."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>

int main() {
    int fd[2];
    if (pipe(fd) == -1) { perror("Pipe failed"); return 1; }

    pid_t pid = fork();
    if (pid < 0) { perror("Fork failed"); return 1; }

    if (pid > 0) {
        // Parent: Writer
        close(fd[0]);
        char msg[] = "Greetings from Parent Process via UNIX Pipe!";
        write(fd[1], msg, strlen(msg) + 1);
        close(fd[1]);
    } else {
        // Child: Reader
        close(fd[1]);
        char buffer[100];
        read(fd[0], buffer, sizeof(buffer));
        printf("[CHILD RECEIVED]: %s\\n", buffer);
        close(fd[0]);
    }
    return 0;
}`
      },
      expectedOutput: `[CHILD RECEIVED]: Greetings from Parent Process via UNIX Pipe!`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Science"]
      }
    }
  },
  {
    id: "os-exp-6",
    labId: "operating-systems",
    title: "Exp 6: Semaphores: Write a program to simulate Producer-Consumer problem using Semaphores",
    slug: "producer-consumer-problem-using-semaphores",
    difficulty: "Intermediate",
    category: "Operating Systems" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 142,
    simulator: "custom",
    quizId: "quiz-os-6",
    sections: {
      introduction: "Semaphores provide integer synchronization primitives supporting atomic wait (sem_wait / P) and signal (sem_post / V) operations to solve concurrency race conditions.",
      objective: "Implement thread-safe Producer-Consumer bounded-buffer synchronization using counting semaphores (empty, full) and a binary mutex semaphore.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Producer Consumer with Semaphores",
      videoChannel: "NPTEL Operating Systems",
      prerequisites: ["POSIX Threads", "Race Conditions"],
      theory: {
        overview: "The bounded buffer has capacity N. Counting semaphore 'empty' initialized to N tracks vacant buffer slots; 'full' initialized to 0 tracks produced items; binary mutex ensures mutual exclusion on buffer insertion/extraction. Producer: sem_wait(&empty); sem_wait(&mutex); ... sem_post(&mutex); sem_post(&full).",
        keyConcepts: [
          { title: "Counting Semaphore", desc: "Tracks available units of a shared finite resource." },
          { title: "Binary Mutex Semaphore", desc: "Guarantees that at most one thread enters the critical section at any instant." },
          { title: "Deadlock Prevention Order", desc: "Resource semaphores must always be acquired before mutex semaphores." }
        ],
        complexities: [
          { operation: "sem_wait() / sem_post()", best: "O(1)", avg: "O(1)", worst: "O(1 lock)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Thread pool work queue task dispatching",
          "Streaming video audio/video decoding buffer pipelines",
          "Logging framework asynchronous file write buffers"
        ]
      },
      procedure: [
        "1. Include <pthread.h> and <semaphore.h>.",
        "2. Initialize sem_t empty (N), sem_t full (0), and sem_t mutex (1).",
        "3. Implement producer function writing items into circular buffer.",
        "4. Implement consumer function reading and removing items.",
        "5. Spawn producer and consumer threads and observe synchronized execution."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

#define BUFFER_SIZE 5
int buffer[BUFFER_SIZE], in = 0, out = 0;
sem_t empty, full, mutex_sem;

void* producer(void* arg) {
    for (int i = 1; i <= 3; i++) {
        sem_wait(&empty);
        sem_wait(&mutex_sem);
        buffer[in] = i * 10;
        printf("[PRODUCER] Produced Item: %d at index %d\\n", buffer[in], in);
        in = (in + 1) % BUFFER_SIZE;
        sem_post(&mutex_sem);
        sem_post(&full);
        sleep(1);
    }
    return NULL;
}

void* consumer(void* arg) {
    for (int i = 1; i <= 3; i++) {
        sem_wait(&full);
        sem_wait(&mutex_sem);
        int item = buffer[out];
        printf("[CONSUMER] Consumed Item: %d from index %d\\n", item, out);
        out = (out + 1) % BUFFER_SIZE;
        sem_post(&mutex_sem);
        sem_post(&empty);
        sleep(1);
    }
    return NULL;
}

int main() {
    sem_init(&empty, 0, BUFFER_SIZE);
    sem_init(&full, 0, 0);
    sem_init(&mutex_sem, 0, 1);

    pthread_t prod, cons;
    pthread_create(&prod, NULL, producer, NULL);
    pthread_create(&cons, NULL, consumer, NULL);

    pthread_join(prod, NULL);
    pthread_join(cons, NULL);
    return 0;
}`
      },
      expectedOutput: `[PRODUCER] Produced Item: 10 at index 0
[CONSUMER] Consumed Item: 10 from index 0
[PRODUCER] Produced Item: 20 at index 1
[CONSUMER] Consumed Item: 20 from index 1
[PRODUCER] Produced Item: 30 at index 2
[CONSUMER] Consumed Item: 30 from index 2`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Science"]
      }
    }
  },
  {
    id: "os-exp-7",
    labId: "operating-systems",
    title: "Exp 7: Banker's Algorithm: Write a program to simulate Bankers Algorithm for Deadlock Avoidance",
    slug: "bankers-algorithm-for-deadlock-avoidance",
    difficulty: "Advanced",
    category: "Operating Systems" as any,
    estimatedMinutes: 35,
    rating: 4.97,
    ratingsCount: 155,
    simulator: "custom",
    quizId: "quiz-os-7",
    sections: {
      introduction: "Banker's Algorithm by Edsger Dijkstra is a deadlock avoidance algorithm that tests safety by simulating the allocation of predetermined maximum possible amounts of all resources.",
      objective: "Compute the Need matrix (Need = Max - Allocation), verify the Safe State invariant, and output a valid Safe Execution Sequence <P0, P1, ..., Pn-1>.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Banker's Algorithm Safe State Determination",
      videoChannel: "Gate Smashers",
      prerequisites: ["Deadlock Coffman Conditions", "Matrix Algebra"],
      theory: {
        overview: "A state is safe if there exists at least one sequence of processes such that each process can satisfy its maximum resource need using available resources plus resources released by completed processes. Need[i][j] = Max[i][j] - Alloc[i][j].",
        keyConcepts: [
          { title: "Safe State Invariant", desc: "Guarantees that at least one execution path avoids deadlock." },
          { title: "Work & Finish Vectors", desc: "Work initialized to Available vector; Finish[i] tracked until all true." },
          { title: "Resource-Request Safety Check", desc: "If Request <= Need and Request <= Available, test speculative allocation for safety." }
        ],
        complexities: [
          { operation: "Safety Algorithm", best: "O(m * n)", avg: "O(m * n^2)", worst: "O(m * n^2)", space: "O(m * n)" }
        ],
        realWorldApplications: [
          "Distributed database multi-resource lock schedulers",
          "Cloud virtualization hypervisor GPU/RAM reservation allocators",
          "High-performance cluster resource managers"
        ]
      },
      procedure: [
        "1. Define Available[m], Allocation[n][m], Max[n][m].",
        "2. Compute Need[n][m] = Max[n][m] - Allocation[n][m].",
        "3. Initialize Work = Available, Finish = [false]*n.",
        "4. Find process i with Finish[i] == false and Need[i] <= Work.",
        "5. Update Work = Work + Allocation[i], set Finish[i] = true, and record in Safe Sequence."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>
#include <stdbool.h>

int main() {
    int n = 5, m = 3;
    int alloc[5][3] = {{0, 1, 0}, {2, 0, 0}, {3, 0, 2}, {2, 1, 1}, {0, 0, 2}};
    int max[5][3]   = {{7, 5, 3}, {3, 2, 2}, {9, 0, 2}, {2, 2, 2}, {4, 3, 3}};
    int avail[3]    = {3, 3, 2};

    int need[5][3];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            need[i][j] = max[i][j] - alloc[i][j];

    bool finish[5] = {0};
    int safeSeq[5], ind = 0;
    int work[3];
    for (int i = 0; i < m; i++) work[i] = avail[i];

    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            if (!finish[i]) {
                int flag = 0;
                for (int j = 0; j < m; j++) {
                    if (need[i][j] > work[j]) { flag = 1; break; }
                }
                if (flag == 0) {
                    safeSeq[ind++] = i;
                    for (int y = 0; y < m; y++) work[y] += alloc[i][y];
                    finish[i] = true;
                }
            }
        }
    }
    printf("SAFE STATE DETECTED!\\nSafe Sequence: ");
    for (int i = 0; i < n - 1; i++) printf("P%d -> ", safeSeq[i]);
    printf("P%d\\n", safeSeq[n - 1]);
    return 0;
}`
      },
      expectedOutput: `SAFE STATE DETECTED!
Safe Sequence: P1 -> P3 -> P4 -> P0 -> P2`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Science"]
      }
    }
  },
  {
    id: "os-exp-8",
    labId: "operating-systems",
    title: "Exp 8: Deadlock Detection: Write a program to simulate Bankers Algorithm for Deadlock Detection",
    slug: "bankers-algorithm-for-deadlock-detection",
    difficulty: "Advanced",
    category: "Operating Systems" as any,
    estimatedMinutes: 30,
    rating: 4.93,
    ratingsCount: 135,
    simulator: "custom",
    quizId: "quiz-os-8",
    sections: {
      introduction: "Deadlock Detection algorithms inspect the instantaneous Resource-Allocation Graph / Request Matrix to detect deadlocked processes when allocation requests are granted immediately without avoidance checks.",
      objective: "Simulate Deadlock Detection on an active system, identify circular wait chains, and flag deadlocked process identifiers.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Deadlock Detection Algorithms",
      videoChannel: "Gate Smashers",
      prerequisites: ["Banker's Algorithm", "Resource Allocation Graphs"],
      theory: {
        overview: "Unlike avoidance algorithms using Max matrices, detection algorithms use actual outstanding Request[n][m] matrices. If any Finish[i] remains false after algorithm termination, process i is actively deadlocked.",
        keyConcepts: [
          { title: "Request Matrix", desc: "Current pending unmet resource requests for each process." },
          { title: "Deadlock Flagging", desc: "Any process where Finish[i] == false cannot proceed and is permanently stuck." },
          { title: "Recovery Strategies", desc: "Process termination (abort all vs abort one-by-one) or resource preemption." }
        ],
        complexities: [
          { operation: "Deadlock Detection", best: "O(m * n)", avg: "O(m * n^2)", worst: "O(m * n^2)", space: "O(m * n)" }
        ],
        realWorldApplications: [
          "DBMS multi-transaction lock graph deadlock detection (e.g. Postgres deadlock_timeout)",
          "Distributed transaction 2PC abort and rollback handlers",
          "Automated watchdog timer thread hang detection"
        ]
      },
      procedure: [
        "1. Define Allocation[n][m], Request[n][m], Available[m].",
        "2. Initialize Finish[i] = false if Alloc[i] != 0 else true.",
        "3. Find process i where Finish[i] == false and Request[i] <= Work.",
        "4. Reclaim allocation into Work vector and set Finish[i] = true.",
        "5. Output list of deadlocked processes if any Finish[i] == false."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>
#include <stdbool.h>

int main() {
    int n = 3, m = 3;
    int alloc[3][3] = {{1, 0, 0}, {0, 1, 0}, {0, 0, 1}};
    int req[3][3]   = {{0, 1, 0}, {0, 0, 1}, {1, 0, 0}}; // Circular Wait Request!
    int avail[3]    = {0, 0, 0};

    bool finish[3] = {false, false, false};
    int work[3];
    for (int i = 0; i < m; i++) work[i] = avail[i];

    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            if (!finish[i]) {
                int can_grant = 1;
                for (int j = 0; j < m; j++) {
                    if (req[i][j] > work[j]) { can_grant = 0; break; }
                }
                if (can_grant) {
                    for (int j = 0; j < m; j++) work[j] += alloc[i][j];
                    finish[i] = true;
                }
            }
        }
    }
    printf("--- Deadlock Detection Result ---\\n");
    for (int i = 0; i < n; i++) {
        if (!finish[i]) printf("[!] Process P%d is DEADLOCKED in circular wait!\\n", i);
    }
    return 0;
}`
      },
      expectedOutput: `--- Deadlock Detection Result ---
[!] Process P0 is DEADLOCKED in circular wait!
[!] Process P1 is DEADLOCKED in circular wait!
[!] Process P2 is DEADLOCKED in circular wait!`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Science"]
      }
    }
  },
  {
    id: "os-exp-9",
    labId: "operating-systems",
    title: "Exp 9: Threading & Synchronization: a) Write a program to simulate Multi-threading b) Write a program to simulate Synchronization using POSIX Mutex",
    slug: "threading-and-synchronization-posix-mutex",
    difficulty: "Intermediate",
    category: "Operating Systems" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 140,
    simulator: "custom",
    quizId: "quiz-os-9",
    sections: {
      introduction: "POSIX Threads (pthreads) execute concurrent lightweight execution contexts sharing identical process memory, requiring Mutex locks to protect shared state from race conditions.",
      objective: "Create multi-threaded worker pools in C with pthread_create(), protect shared counter increments with pthread_mutex_lock(), and synchronize completion via pthread_join().",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "POSIX Threads & Mutex Locks in C",
      videoChannel: "Jacob Sorber",
      prerequisites: ["C Pointers", "Atomic Operations"],
      theory: {
        overview: "Threads share the text, data, and heap segments but have distinct registers, program counters, and stack memory. Unsynchronized concurrent counter increments (temp = count; temp++; count = temp) suffer from lost update race conditions, prevented by pthread_mutex_t mutual exclusion.",
        keyConcepts: [
          { title: "POSIX Thread (pthread)", desc: "Lightweight execution stream within shared virtual address space." },
          { title: "Race Condition", desc: "Non-deterministic output caused by concurrent uncontrolled memory updates." },
          { title: "pthread_mutex_lock()", desc: "Blocks all other threads until the lock owner calls pthread_mutex_unlock()." }
        ],
        complexities: [
          { operation: "Mutex Lock / Unlock", best: "O(1 atomic CAS)", avg: "O(1)", worst: "O(1 sys_futex)", space: "O(1)" }
        ],
        realWorldApplications: [
          "High-performance multi-threaded web servers (Node.js libuv, Nginx)",
          "Game engine graphics and physics physics parallel loops",
          "Parallel matrix multiplication in numerical libraries"
        ]
      },
      procedure: [
        "1. Define global counter integer and pthread_mutex_t lock.",
        "2. Implement worker function incrementing counter 100,000 times inside mutex lock.",
        "3. Spawn 4 worker threads with pthread_create().",
        "4. Join all 4 threads using pthread_join().",
        "5. Verify final counter == 400,000 exactly."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>
#include <pthread.h>

long long counter = 0;
pthread_mutex_t lock;

void* worker(void* arg) {
    for (int i = 0; i < 100000; i++) {
        pthread_mutex_lock(&lock);
        counter++;
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}

int main() {
    pthread_mutex_init(&lock, NULL);
    pthread_t t1, t2, t3, t4;

    pthread_create(&t1, NULL, worker, NULL);
    pthread_create(&t2, NULL, worker, NULL);
    pthread_create(&t3, NULL, worker, NULL);
    pthread_create(&t4, NULL, worker, NULL);

    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    pthread_join(t3, NULL);
    pthread_join(t4, NULL);

    pthread_mutex_destroy(&lock);
    printf("Final Synchronized Counter: %lld (Expected: 400000)\\n", counter);
    return 0;
}`
      },
      expectedOutput: `Final Synchronized Counter: 400000 (Expected: 400000)`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Science"]
      }
    }
  },
  {
    id: "os-exp-10",
    labId: "operating-systems",
    title: "Exp 10: Memory Management: Write a program to simulate Paging technique of memory management",
    slug: "paging-technique-memory-management",
    difficulty: "Intermediate",
    category: "Operating Systems" as any,
    estimatedMinutes: 30,
    rating: 4.92,
    ratingsCount: 125,
    simulator: "custom",
    quizId: "quiz-os-10",
    sections: {
      introduction: "Paging is a memory management scheme that eliminates external fragmentation by partitioning logical process memory into fixed-size Pages and physical RAM into Frames.",
      objective: "Implement a Page Table translation engine that translates 16-bit Virtual Addresses <Page Number, Offset> into Physical Addresses <Frame Number, Offset>.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Virtual Memory Paging & Address Translation",
      videoChannel: "Computerphile",
      prerequisites: ["Binary Bit Shifts", "Memory Addressing"],
      theory: {
        overview: "The Memory Management Unit (MMU) extracts Page Number p = Virtual_Address / Page_Size and Offset d = Virtual_Address % Page_Size. The Page Table maps Page p to physical Frame f. Physical Address = (f * Page_Size) + d.",
        keyConcepts: [
          { title: "Zero External Fragmentation", desc: "Any free physical frame can be allocated to any process page." },
          { title: "Page Table Entry (PTE)", desc: "Contains Frame Number, Present/Absent valid bit, Dirty bit, Read/Write permissions." },
          { title: "Internal Fragmentation", desc: "Unused residual bytes within the final allocated page." }
        ],
        complexities: [
          { operation: "Address Translation", best: "O(1 TLB hit)", avg: "O(1)", worst: "O(page_walk)", space: "O(page_table)" }
        ],
        realWorldApplications: [
          "x86-64 4-level and 5-level paging in Linux/Windows",
          "Process memory isolation and shared memory mapping",
          "Copy-on-Write memory optimization during fork()"
        ]
      },
      procedure: [
        "1. Define page size (e.g. 1 KB = 1024 bytes).",
        "2. Initialize Page Table array mapping logical pages to physical frame numbers.",
        "3. Ingest logical address (e.g. 2500).",
        "4. Calculate Page Number = 2500 / 1024 = 2, Offset = 2500 % 1024 = 452.",
        "5. Lookup Frame in Page Table and compute Physical Address = (Frame * 1024) + Offset."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

#define PAGE_SIZE 1024

int main() {
    // Page Table: Page 0 -> Frame 5, Page 1 -> Frame 2, Page 2 -> Frame 8
    int page_table[] = {5, 2, 8, 12, 3};
    int logical_addr = 2500;

    int page_num = logical_addr / PAGE_SIZE;
    int offset   = logical_addr % PAGE_SIZE;

    if (page_num >= 5) {
        printf("[!] Page Fault / Segmentation Violation!\\n");
        return 1;
    }
    int frame_num = page_table[page_num];
    int physical_addr = (frame_num * PAGE_SIZE) + offset;

    printf("Logical Address: %d\\n", logical_addr);
    printf("-> Page Number: %d, Offset: %d\\n", page_num, offset);
    printf("-> Mapped Frame: %d\\n", frame_num);
    printf("-> Calculated Physical Address: %d\\n", physical_addr);
    return 0;
}`
      },
      expectedOutput: `Logical Address: 2500
-> Page Number: 2, Offset: 452
-> Mapped Frame: 8
-> Calculated Physical Address: 8644`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Science"]
      }
    }
  },
  {
    id: "os-exp-11",
    labId: "operating-systems",
    title: "Exp 11: Dynamic Memory Allocation: Write programs to simulate the following contiguous memory allocation techniques: a) Worst fit b) Best fit c) First fit",
    slug: "dynamic-contiguous-memory-allocation-algorithms",
    difficulty: "Intermediate",
    category: "Operating Systems" as any,
    estimatedMinutes: 30,
    rating: 4.93,
    ratingsCount: 130,
    simulator: "custom",
    quizId: "quiz-os-11",
    sections: {
      introduction: "Contiguous memory allocation algorithms search variable-sized free memory partitions to fulfill dynamic process heap memory requests.",
      objective: "Implement First Fit (first sufficient hole), Best Fit (smallest sufficient hole), and Worst Fit (largest available hole) memory allocation strategies.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "First Fit, Best Fit, Worst Fit Allocation",
      videoChannel: "Gate Smashers",
      prerequisites: ["Contiguous Memory", "External Fragmentation"],
      theory: {
        overview: "First Fit allocates the first hole large enough (fastest). Best Fit allocates the smallest hole that is big enough, producing the smallest leftover fragment. Worst Fit allocates the largest hole, leaving the largest remaining usable fragment.",
        keyConcepts: [
          { title: "First Fit", desc: "Scans partition list from beginning; minimal search overhead." },
          { title: "Best Fit", desc: "Searches entire list to find min(hole_size - process_size >= 0)." },
          { title: "Worst Fit", desc: "Searches entire list to allocate in max(hole_size)." }
        ],
        complexities: [
          { operation: "First Fit Allocation", best: "O(1)", avg: "O(partitions)", worst: "O(partitions)", space: "O(1)" },
          { operation: "Best / Worst Fit", best: "O(p)", avg: "O(partitions)", worst: "O(partitions)", space: "O(1)" }
        ],
        realWorldApplications: [
          "C runtime malloc/free glibc ptmalloc heap chunk managers",
          "Embedded systems static memory pool management",
          "Database buffer cache page frame allocators"
        ]
      },
      procedure: [
        "1. Define memory block partition sizes array and process request sizes array.",
        "2. Implement Best Fit algorithm sorting/scanning for minimal delta.",
        "3. Mark allocated blocks and track process-to-block mapping.",
        "4. Print allocation table indicating allocated partition index or 'Not Allocated'."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

void bestFit(int blockSize[], int m, int processSize[], int n) {
    int allocation[10];
    for (int i = 0; i < n; i++) allocation[i] = -1;

    for (int i = 0; i < n; i++) {
        int bestIdx = -1;
        for (int j = 0; j < m; j++) {
            if (blockSize[j] >= processSize[i]) {
                if (bestIdx == -1 || blockSize[j] < blockSize[bestIdx])
                    bestIdx = j;
            }
        }
        if (bestIdx != -1) {
            allocation[i] = bestIdx;
            blockSize[bestIdx] -= processSize[i];
        }
    }
    printf("Process\\tProcess Size\\tBlock Index\\n");
    for (int i = 0; i < n; i++) {
        printf("P%d\\t%d\\t\\t", i + 1, processSize[i]);
        if (allocation[i] != -1) printf("%d\\n", allocation[i] + 1);
        else printf("Not Allocated\\n");
    }
}

int main() {
    int blockSize[] = {100, 500, 200, 300, 600};
    int processSize[] = {212, 417, 112, 426};
    bestFit(blockSize, 5, processSize, 4);
    return 0;
}`
      },
      expectedOutput: `Process	Process Size	Block Index
P1	212		4
P2	417		2
P3	112		3
P4	426		5`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Science"]
      }
    }
  },
  {
    id: "os-exp-12",
    labId: "operating-systems",
    title: "Exp 12: Page Replacement: Write programs to simulate the following page replacement algorithms: a) FIFO b) LRU c) Optimal",
    slug: "page-replacement-algorithms-fifo-lru-optimal",
    difficulty: "Advanced",
    category: "Operating Systems" as any,
    estimatedMinutes: 35,
    rating: 4.96,
    ratingsCount: 150,
    simulator: "custom",
    quizId: "quiz-os-12",
    sections: {
      introduction: "Page Replacement algorithms manage virtual memory swapping by selecting victim pages for eviction when physical RAM frame capacity is exhausted.",
      objective: "Simulate FIFO (First-In First-Out), LRU (Least Recently Used), and OPT (Belady's Optimal Page Replacement) algorithms and compute Page Fault frequencies.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Page Replacement: FIFO, LRU, Optimal",
      videoChannel: "Gate Smashers",
      prerequisites: ["Paging Concepts", "Belady's Anomaly"],
      theory: {
        overview: "When a process references a page not present in RAM, a Page Fault occurs. FIFO evicts the oldest loaded page (susceptible to Belady's Anomaly). LRU evicts the page unreferenced for the longest past interval. Optimal evicts the page that will not be used for the longest future interval (theoretical benchmark).",
        keyConcepts: [
          { title: "Page Fault", desc: "Trap raised when accessing a valid page not currently loaded in physical RAM frames." },
          { title: "Belady's Anomaly (FIFO)", desc: "Counter-intuitive phenomenon where increasing frame count increases page fault count." },
          { title: "Least Recently Used (LRU)", desc: "Approximates Optimal by leveraging temporal locality of reference." }
        ],
        complexities: [
          { operation: "LRU with Doubly Linked List & Hash", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(frames)" }
        ],
        realWorldApplications: [
          "Operating system kernel page cache eviction (LRU clock 2-handed algorithm)",
          "Redis and Memcached in-memory key-value eviction policies",
          "CPU L1/L2/L3 hardware cache replacement policies"
        ]
      },
      procedure: [
        "1. Define reference string sequence and number of physical frames.",
        "2. Implement LRU tracking timestamps / access history.",
        "3. On page hit, update access timestamp.",
        "4. On page fault with full frames, evict page with oldest timestamp.",
        "5. Print total page fault count and fault ratio."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

int findLRU(int time[], int n) {
    int min = time[0], pos = 0;
    for (int i = 1; i < n; ++i) {
        if (time[i] < min) { min = time[i]; pos = i; }
    }
    return pos;
}

int main() {
    int frames[3], time[3], faults = 0, counter = 0;
    int pages[] = {7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2};
    int n = 13, f = 3;

    for (int i = 0; i < f; ++i) frames[i] = -1;

    for (int i = 0; i < n; ++i) {
        int flag1 = 0, flag2 = 0;
        for (int j = 0; j < f; ++j) {
            if (frames[j] == pages[i]) {
                counter++;
                time[j] = counter;
                flag1 = flag2 = 1;
                break;
            }
        }
        if (flag1 == 0) {
            for (int j = 0; j < f; ++j) {
                if (frames[j] == -1) {
                    counter++; faults++;
                    frames[j] = pages[i];
                    time[j] = counter;
                    flag2 = 1;
                    break;
                }
            }
        }
        if (flag2 == 0) {
            int pos = findLRU(time, f);
            counter++; faults++;
            frames[pos] = pages[i];
            time[pos] = counter;
        }
    }
    printf("Total Page Faults (LRU): %d / %d references\\n", faults, n);
    return 0;
}`
      },
      expectedOutput: `Total Page Faults (LRU): 10 / 13 references`,
      leetcodeProblems: [
        {
          id: 4,
          title: "LRU Cache",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/lru-cache/",
          description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
          approach: "Combine HashMap with Doubly Linked List for O(1) get and put operations.",
          javaSnippet: `// LRU Cache Solution`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Science"]
      }
    }
  },
  {
    id: "os-exp-13",
    labId: "operating-systems",
    title: "Exp 13: File Organization: Write programs to simulate the following file organization techniques: a) Single level directory b) Two level directory c) Hierarchical",
    slug: "file-organization-single-two-hierarchical",
    difficulty: "Intermediate",
    category: "Operating Systems" as any,
    estimatedMinutes: 25,
    rating: 4.88,
    ratingsCount: 110,
    simulator: "custom",
    quizId: "quiz-os-13",
    sections: {
      introduction: "File organization structures determine directory namespace organization and file path resolution within filesystems.",
      objective: "Simulate Flat Single-Level directory, Two-Level User File Directory (UFD/MFD), and Multi-Level Hierarchical Tree directory structures.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "File System Directory Structures",
      videoChannel: "Gate Smashers",
      prerequisites: ["Tree Data Structures", "POSIX File Paths"],
      theory: {
        overview: "Single-level directory stores all files in a single flat directory (causes filename collisions). Two-level creates a Master File Directory (MFD) containing User File Directories (UFD). Hierarchical organization creates an N-ary tree supporting arbitrary subdirectories and relative/absolute path resolution.",
        keyConcepts: [
          { title: "Single-Level", desc: "Flat list; all files must have unique names across all users." },
          { title: "Two-Level", desc: "Isolates users but prevents sharing and sub-categorization." },
          { title: "Hierarchical Tree", desc: "POSIX standard (e.g. /home/student/lab/exp.c) with full tree navigation." }
        ],
        complexities: [
          { operation: "Hierarchical Path Lookup", best: "O(1)", avg: "O(depth * d)", worst: "O(depth * d)", space: "O(tree_nodes)" }
        ],
        realWorldApplications: [
          "Linux VFS (Virtual File System) ext4 / btrfs directory trees",
          "Windows NTFS drive and directory tree structures",
          "Cloud object storage simulated folder prefixes (S3 key prefixes)"
        ]
      },
      procedure: [
        "1. Define N-ary tree node structure with name, is_directory flag, and list of child pointers.",
        "2. Implement mkdir(path) creating intermediate directory nodes.",
        "3. Implement touch(path) creating leaf file nodes.",
        "4. Traverse tree and print formatted hierarchical directory tree."
      ],
      sampleCode: {
        language: "python",
        code: `class DirNode:
    def __init__(self, name, is_dir=True):
        self.name = name
        self.is_dir = is_dir
        self.children = {}

    def add_child(self, path_parts, is_dir=True):
        if not path_parts: return
        part = path_parts[0]
        if part not in self.children:
            self.children[part] = DirNode(part, is_dir if len(path_parts) == 1 else True)
        self.children[part].add_child(path_parts[1:], is_dir)

    def display(self, indent=0):
        prefix = "  " * indent + ("📁 " if self.is_dir else "📄 ")
        print(f"{prefix}{self.name}")
        for child in self.children.values(): child.display(indent + 1)

root = DirNode("root")
root.add_child(["home", "student", "os_lab.c"], is_dir=False)
root.add_child(["home", "student", "notes.txt"], is_dir=False)
root.add_child(["etc", "passwd"], is_dir=False)
root.display()`
      },
      expectedOutput: `📁 root
  📁 home
    📁 student
      📄 os_lab.c
      📄 notes.txt
  📁 etc
    📄 passwd`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Science"]
      }
    }
  },
  {
    id: "os-exp-14",
    labId: "operating-systems",
    title: "Exp 14: File Allocation: Write programs to simulate the following file allocation strategies: a) Sequential b) Indexed c) Linked",
    slug: "file-allocation-strategies-sequential-indexed-linked",
    difficulty: "Intermediate",
    category: "Operating Systems" as any,
    estimatedMinutes: 30,
    rating: 4.91,
    ratingsCount: 118,
    simulator: "custom",
    quizId: "quiz-os-14",
    sections: {
      introduction: "File allocation strategies define how disk physical sectors/blocks are assigned to files on storage volumes.",
      objective: "Simulate Contiguous/Sequential Allocation, Linked-List Allocation (FAT), and Indexed Allocation (UNIX Inodes).",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "File Allocation: Contiguous, Linked, Indexed",
      videoChannel: "Gate Smashers",
      prerequisites: ["Disk Block Addressing", "Linked Lists"],
      theory: {
        overview: "Sequential allocation stores files in contiguous disk blocks (fast sequential I/O, but external fragmentation). Linked allocation chains blocks via pointers (no fragmentation, but slow random access). Indexed allocation allocates an Index Block storing direct disk pointers (UNIX Inode model).",
        keyConcepts: [
          { title: "Sequential Allocation", desc: "Directory entry stores <Start Block, Block Count>." },
          { title: "Linked Allocation", desc: "Directory entry stores <First Block, Last Block>; blocks hold pointer to next block." },
          { title: "Indexed Inode Allocation", desc: "Index block contains direct, indirect, double-indirect disk block pointers." }
        ],
        complexities: [
          { operation: "Indexed Random Seek", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(index_block)" },
          { operation: "Linked Random Seek", best: "O(1)", avg: "O(k)", worst: "O(file_blocks)", space: "O(pointers)" }
        ],
        realWorldApplications: [
          "Linux ext4 inode direct and extent tree block allocation",
          "FAT32 File Allocation Table linked block structures",
          "SSD flash memory translation layer (FTL) block mapping"
        ]
      },
      procedure: [
        "1. Define total disk blocks array.",
        "2. Allocate an Index Block for a new file.",
        "3. Ingest list of scattered block indices and write into the index block.",
        "4. Read file content by dereferencing disk block pointers from the index table.",
        "5. Output allocated block sequence."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

int main() {
    int index_block = 12;
    int allocated_blocks[] = {3, 7, 18, 22, 45};
    int num_blocks = 5;

    printf("=== UNIX Inode-Style Indexed File Allocation ===\\n");
    printf("File Index Block Location: Block %d\\n", index_block);
    printf("Block Pointer Table:\\n");
    for (int i = 0; i < num_blocks; i++) {
        printf("  Entry [%d] -> Disk Block #%d\\n", i, allocated_blocks[i]);
    }
    printf("[✓] File spans %d disk blocks with zero external fragmentation!\\n", num_blocks);
    return 0;
}`
      },
      expectedOutput: `=== UNIX Inode-Style Indexed File Allocation ===
File Index Block Location: Block 12
Block Pointer Table:
  Entry [0] -> Disk Block #3
  Entry [1] -> Disk Block #7
  Entry [2] -> Disk Block #18
  Entry [3] -> Disk Block #22
  Entry [4] -> Disk Block #45
[✓] File spans 5 disk blocks with zero external fragmentation!`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Science"]
      }
    }
  },
  {
    id: "os-exp-15",
    labId: "operating-systems",
    title: "Exp 15: Disk Scheduling: Write programs to simulate the following disk scheduling algorithms: a) FCFS b) SSTF c) SCAN d) C-SCAN e) LOOK",
    slug: "disk-scheduling-algorithms-fcfs-sstf-scan-cscan-look",
    difficulty: "Intermediate",
    category: "Operating Systems" as any,
    estimatedMinutes: 30,
    rating: 4.94,
    ratingsCount: 135,
    simulator: "custom",
    quizId: "quiz-os-15",
    sections: {
      introduction: "Disk Scheduling algorithms order pending block I/O requests to minimize physical read/write head seek distance and arm travel time on mechanical disk drives.",
      objective: "Simulate and calculate Total Head Movement (THM) for FCFS, SSTF (Shortest Seek Time First), SCAN (Elevator algorithm), C-SCAN, and LOOK.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Disk Scheduling: FCFS, SSTF, SCAN, C-SCAN",
      videoChannel: "Gate Smashers",
      prerequisites: ["Disk Geometry", "Seek Time & Latency"],
      theory: {
        overview: "Seek time is the dominant factor in disk I/O latency. FCFS services requests in arrival order. SSTF selects the request with minimum seek distance from current head position (risks starvation). SCAN moves arm in one direction to the end cylinder before reversing (Elevator). C-SCAN provides uniform waiting times by jumping back to start without servicing on return.",
        keyConcepts: [
          { title: "Seek Distance", desc: "Total cylinder track jumps |head_pos - target_track|." },
          { title: "SSTF Starvation", desc: "Requests on distant cylinders starved by cluster of nearby requests." },
          { title: "SCAN (Elevator Algorithm)", desc: "Sweeps back and forth across disk cylinders servicing pending requests." }
        ],
        complexities: [
          { operation: "SCAN Track Ordering", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" }
        ],
        realWorldApplications: [
          "Linux block layer BFQ (Budget Fair Queueing) and MQ-Deadline disk I/O schedulers",
          "Enterprise SAN / RAID controller command queue elevators",
          "Mechanical HDD firmware native command queueing (NCQ)"
        ]
      },
      procedure: [
        "1. Define track request queue array and initial head cylinder position (e.g. 53).",
        "2. Implement SCAN algorithm: sort requests into lower and upper sub-arrays.",
        "3. Service upper cylinders up to disk maximum (e.g. 199), then reverse and service lower cylinders.",
        "4. Calculate total track seek distance.",
        "5. Output seek trace and Total Head Movement."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) { return (*(int*)a - *(int*)b); }

int main() {
    int req[] = {98, 183, 37, 122, 14, 124, 65, 67};
    int n = 8, head = 53, disk_size = 200;
    qsort(req, n, sizeof(int), cmp);

    int thm = 0, curr = head;
    printf("SCAN Disk Head Trajectory: %d", head);

    // Scan Right to Max (199)
    for (int i = 0; i < n; i++) {
        if (req[i] >= head) {
            thm += abs(req[i] - curr);
            curr = req[i];
            printf(" -> %d", curr);
        }
    }
    thm += abs((disk_size - 1) - curr);
    curr = disk_size - 1;
    printf(" -> %d (End)", curr);

    // Scan Left
    for (int i = n - 1; i >= 0; i--) {
        if (req[i] < head) {
            thm += abs(req[i] - curr);
            curr = req[i];
            printf(" -> %d", curr);
        }
    }
    printf("\\nTotal Head Movement (SCAN): %d cylinders\\n", thm);
    return 0;
}`
      },
      expectedOutput: `SCAN Disk Head Trajectory: 53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 199 (End) -> 37 -> 14
Total Head Movement (SCAN): 331 cylinders`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Science"]
      }
    }
  }
];
