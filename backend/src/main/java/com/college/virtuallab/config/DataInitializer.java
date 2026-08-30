package com.college.virtuallab.config;

import com.college.virtuallab.announcement.Announcement;
import com.college.virtuallab.announcement.AnnouncementRepository;
import com.college.virtuallab.department.*;
import com.college.virtuallab.experiment.Experiment;
import com.college.virtuallab.experiment.ExperimentRepository;
import com.college.virtuallab.lab.Lab;
import com.college.virtuallab.lab.LabRepository;
import com.college.virtuallab.quiz.Question;
import com.college.virtuallab.quiz.Quiz;
import com.college.virtuallab.quiz.QuizRepository;
import com.college.virtuallab.user.Role;
import com.college.virtuallab.user.User;
import com.college.virtuallab.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final CourseRepository courseRepository;
    private final LabRepository labRepository;
    private final ExperimentRepository experimentRepository;
    private final QuizRepository quizRepository;
    private final AnnouncementRepository announcementRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           DepartmentRepository departmentRepository,
                           CourseRepository courseRepository,
                           LabRepository labRepository,
                           ExperimentRepository experimentRepository,
                           QuizRepository quizRepository,
                           AnnouncementRepository announcementRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.courseRepository = courseRepository;
        this.labRepository = labRepository;
        this.experimentRepository = experimentRepository;
        this.quizRepository = quizRepository;
        this.announcementRepository = announcementRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedDepartmentAndCourses();
        seedLabsAndExperiments();
        seedAnnouncements();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            // Admin
            User admin = new User("admin@vsb.ac.in", passwordEncoder.encode("admin123"), "Dr. S. K. Narayanan", "FAC001", "Artificial Intelligence & Data Science", null, Role.ROLE_DEPARTMENT_ADMIN);
            userRepository.save(admin);

            // Faculty
            User faculty = new User("faculty@vsb.ac.in", passwordEncoder.encode("faculty123"), "Prof. M. Rajesh Kumar", "FAC012", "Artificial Intelligence & Data Science", null, Role.ROLE_FACULTY);
            userRepository.save(faculty);

            // Student
            User student = new User("student@vsb.ac.in", passwordEncoder.encode("student123"), "Anish V.", "922521104001", "Artificial Intelligence & Data Science", 3, Role.ROLE_STUDENT);
            userRepository.save(student);
        }
    }

    private void seedDepartmentAndCourses() {
        if (departmentRepository.count() == 0) {
            Department dept = new Department(
                    "AIDS",
                    "Department of Artificial Intelligence and Data Science",
                    "Center of excellence in artificial intelligence, machine learning, and data analytics. Affiliated to Anna University and approved by AICTE.",
                    "Dr. K. Sangeetha Ph.D.",
                    "hod.aids@vsb.ac.in",
                    "Block 3, Third Floor, VSB Engineering College, Karur"
            );
            Department savedDept = departmentRepository.save(dept);

            List<Course> courses = List.of(
                    new Course("CS101", "Problem Solving & Python Programming", 1, 4.0, "Foundation", "Introduction to algorithmic thinking and Python programming.", 36, "🐍", false),
                    new Course("MA201", "Statistics & Probability", 2, 4.0, "Foundation", "Core statistical concepts for machine learning.", 28, "📐", false),
                    new Course("CS301", "Data Structures", 3, 4.0, "Core", "Master arrays, linked lists, stacks, queues, trees, and graphs.", 46, "🧮", false),
                    new Course("CS302L", "Fundamentals of Data Science and Analytics Lab", 3, 1.5, "Foundation", "Hands-on data cleaning and exploratory analytics.", 18, "📊", true),
                    new Course("CS401", "Database Management Systems", 4, 4.0, "Core", "Relational database models, SQL, and normalization.", 38, "🗄️", false),
                    new Course("CS401L", "Design and Database Management System Lab", 4, 1.5, "Core", "Practical database querying and stored procedures.", 25, "🗄️", true),
                    new Course("CS402L", "Design and Analysis of Algorithms Lab", 4, 1.5, "Core", "Algorithm complexity analysis and divide-and-conquer.", 26, "🧮", true),
                    new Course("CS501", "Computer Networks", 5, 3.0, "Core", "OSI model, routing protocols, TCP/IP, socket programming.", 34, "🌐", false),
                    new Course("CS501L", "Computer Networks Lab", 5, 1.5, "Core", "Packet capturing and socket programming practicals.", 20, "🌐", true),
                    new Course("CS601", "Machine Learning", 6, 4.0, "Advanced", "Supervised, unsupervised, and reinforcement algorithms.", 42, "🧠", false),
                    new Course("CS601L", "Machine Learning Lab", 6, 1.5, "Advanced", "Python and scikit-learn models implementation.", 28, "🧠", true),
                    new Course("CS701", "Deep Learning", 7, 4.0, "Advanced", "CNNs, RNNs, Transformers, and PyTorch implementations.", 50, "🤖", false),
                    new Course("CS701L", "Deep Learning Lab", 7, 1.5, "Advanced", "Neural networks architecture and GPU training.", 24, "🤖", true)
            );

            courses.forEach(c -> {
                c.setDepartment(savedDept);
                courseRepository.save(c);
            });
        }
    }

    private void seedLabsAndExperiments() {
        if (labRepository.count() == 0) {
            // ==========================================
            // LAB 1: DATA STRUCTURES & ALGORITHMS LAB
            // ==========================================
            Lab dsaLab = new Lab(
                    "data-structures",
                    "Data Structures & Algorithms Lab",
                    "Master fundamental linear and non-linear data structures, recursive call traces, and asymptotic algorithm performance in pure Java.",
                    "Artificial Intelligence & Data Science",
                    "Core",
                    "Beginner",
                    6,
                    true,
                    "🧮"
            );
            dsaLab.setTags(Arrays.asList("Java", "Recursion", "Stacks & Queues", "Sorting", "LeetCode"));
            Lab savedDsaLab = labRepository.save(dsaLab);

            // Exp 1: Bubble Sort
            createExperimentWithQuiz(
                    savedDsaLab,
                    "bubble-sort",
                    "Bubble Sort Algorithm",
                    "Visualize adjacent comparison, swap operations, and pass optimizations in Bubble Sort in Java.",
                    "Java primitive arrays, nested loops, and swapping logic.",
                    "### Bubble Sort Algorithm\n\nBubble Sort is a comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.\n\n#### Complexity:\n- Best Case: $O(N)$ (with swapped flag)\n- Average & Worst Case: $O(N^2)$\n- Space Complexity: $O(1)$ (in-place)",
                    "bubble-sort",
                    "public class BubbleSort {\n    public static void sort(int[] arr) {\n        int n = arr.length;\n        boolean swapped;\n        for (int i = 0; i < n - 1; i++) {\n            swapped = false;\n            for (int j = 0; j < n - i - 1; j++) {\n                if (arr[j] > arr[j + 1]) {\n                    int temp = arr[j];\n                    arr[j] = arr[j + 1];\n                    arr[j + 1] = temp;\n                    swapped = true;\n                }\n            }\n            if (!swapped) break;\n        }\n    }\n}",
                    "Sorted Array: [11, 12, 22, 25, 34, 64, 90]\nTotal Passes: 5, Comparisons: 18, Swaps: 6",
                    "Students understand adjacent comparison mechanics and sorting stability in Java.",
                    1,
                    "Bubble Sort Self-Assessment",
                    List.of(
                            new Question("What is the worst-case time complexity of Bubble Sort?", List.of("O(N)", "O(N log N)", "O(N^2)", "O(1)"), 2, "Bubble sort has nested loops leading to O(N^2) comparisons."),
                            new Question("Is Bubble Sort a stable sorting algorithm?", List.of("Yes", "No", "Only for integers", "Depends on input"), 0, "Bubble Sort preserves the relative order of duplicate elements, making it stable.")
                    )
            );

            // Exp 2: Selection Sort
            createExperimentWithQuiz(
                    savedDsaLab,
                    "selection-sort",
                    "Selection Sort Algorithm",
                    "Observe minimum index scanning across the unsorted partition in Java and minimal swap characteristics.",
                    "Linear scanning, minimum element tracking, and array partitioning.",
                    "### Selection Sort Algorithm\n\nSelection Sort divides the array into sorted and unsorted partitions. In each pass, it finds the smallest element in the unsorted portion and exchanges it with the leftmost unsorted element.\n\n#### Complexity:\n- Best, Average & Worst Case: $O(N^2)$\n- Swaps: At most $N - 1$\n- Space Complexity: $O(1)$",
                    "selection-sort",
                    "public class SelectionSort {\n    public static void sort(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n - 1; i++) {\n            int minIdx = i;\n            for (int j = i + 1; j < n; j++) {\n                if (arr[j] < arr[minIdx]) minIdx = j;\n            }\n            int temp = arr[minIdx];\n            arr[minIdx] = arr[i];\n            arr[i] = temp;\n        }\n    }\n}",
                    "Sorted Array: [11, 12, 22, 25, 34, 64, 90]\nTotal Passes: 6, Swaps: 4",
                    "Understand minimum index scanning and the trade-offs of minimal swap count.",
                    2,
                    "Selection Sort Self-Assessment",
                    List.of(
                            new Question("How many swaps does Selection Sort perform in the worst case for an array of size N?", List.of("O(N^2)", "At most N - 1", "0", "N log N"), 1, "Selection sort performs at most one swap per outer pass, totaling at most N - 1 swaps."),
                            new Question("Is standard Selection Sort stable?", List.of("Yes", "No", "Always", "Depends on array size"), 1, "Standard Selection Sort is not stable because swapping long distances can alter relative order.")
                    )
            );

            // Exp 3: Insertion Sort
            createExperimentWithQuiz(
                    savedDsaLab,
                    "insertion-sort",
                    "Insertion Sort Algorithm",
                    "Simulate adaptive shifting and insertion of elements into a growing sorted subarray.",
                    "Array shifting, linear search, and adaptive sorting concepts.",
                    "### Insertion Sort Algorithm\n\nInsertion Sort iterates through an input array and removes one element per iteration, finding the place the element belongs within the sorted array, and then inserting it there.",
                    "insertion-sort",
                    "public class InsertionSort {\n    public static void sort(int[] arr) {\n        for (int i = 1; i < arr.length; i++) {\n            int key = arr[i], j = i - 1;\n            while (j >= 0 && arr[j] > key) {\n                arr[j + 1] = arr[j];\n                j--;\n            }\n            arr[j + 1] = key;\n        }\n    }\n}",
                    "Sorted Array: [11, 12, 22, 25, 34, 64, 90]",
                    "Understand adaptive sorting mechanics for small or nearly sorted datasets.",
                    3,
                    "Insertion Sort Self-Assessment",
                    List.of(
                            new Question("What is the time complexity of Insertion Sort for an already-sorted array?", List.of("O(1)", "O(N)", "O(N^2)", "O(N log N)"), 1, "Insertion Sort runs in O(N) linear time on sorted input.")
                    )
            );

            // Exp 4: Stack Operations
            createExperimentWithQuiz(
                    savedDsaLab,
                    "stack-operations",
                    "Stack Operations (LIFO)",
                    "Master Last-In First-Out (LIFO) stack operations: Push, Pop, Peek, and overflow/underflow handling in Java.",
                    "Linear arrays, top pointer mechanics, and dynamic memory allocation.",
                    "### Stack Abstract Data Type (ADT)\n\nA Stack is a linear collection of elements following the LIFO principle.\n\n#### Operations:\n- Push: $O(1)$\n- Pop: $O(1)$\n- Peek: $O(1)$",
                    "stack",
                    "public class ArrayStack {\n    private int[] data = new int[100];\n    private int top = -1;\n    public void push(int val) { data[++top] = val; }\n    public int pop() { return data[top--]; }\n    public int peek() { return data[top]; }\n}",
                    "Pushed: 10, 20, 30. Peek: 30. Popped: 30, Remaining Top: 20.",
                    "Students master JVM call stack mechanics, recursion, and parenthesis validation.",
                    4,
                    "Stack Operations Self-Assessment",
                    List.of(
                            new Question("Which principle does a Stack follow?", List.of("FIFO", "LIFO", "Priority", "Random"), 1, "Stack follows Last-In First-Out (LIFO)."),
                            new Question("What occurs when popping an empty stack?", List.of("Overflow", "Underflow", "Segmentation Fault", "Deadlock"), 1, "Underflow occurs when attempting to pop from an empty stack.")
                    )
            );

            // Exp 5: Queue Operations
            createExperimentWithQuiz(
                    savedDsaLab,
                    "queue-operations",
                    "Queue Operations (FIFO)",
                    "Understand First-In First-Out (FIFO) queue operations: Enqueue, Dequeue, Front, and Circular Queue wrap-around.",
                    "Front and rear pointer tracking and modulo arithmetic.",
                    "### Queue Abstract Data Type\n\nA Queue is a linear structure obeying FIFO order. Elements are inserted at the Rear and removed from the Front.",
                    "queue",
                    "public class ArrayQueue {\n    private int[] data = new int[100];\n    private int front = 0, rear = 0;\n    public void enqueue(int x) { data[rear++] = x; }\n    public int dequeue() { return data[front++]; }\n}",
                    "Enqueued: 10, 20. Dequeued: 10. Front: 20.",
                    "Master asynchronous buffering, CPU scheduling, and BFS graph traversals.",
                    5,
                    "Queue Operations Self-Assessment",
                    List.of(
                            new Question("Which data structure follows the FIFO principle?", List.of("Stack", "Queue", "Binary Tree", "Heap"), 1, "Queue follows First-In First-Out (FIFO).")
                    )
            );

            // Exp 6: Singly Linked List
            createExperimentWithQuiz(
                    savedDsaLab,
                    "singly-linked-list",
                    "Singly Linked List Operations",
                    "Implement node pointer chaining, head/tail insertion, deletion, and list reversal in Java.",
                    "Object reference pointers in Java and dynamic heap allocation.",
                    "### Singly Linked List\n\nA linear collection of node objects where each node contains a data payload and a next pointer to the subsequent node in memory.",
                    "linked-list",
                    "class Node {\n    int val;\n    Node next;\n    Node(int v) { this.val = v; }\n}",
                    "List: 10 -> 20 -> 30 -> null",
                    "Master dynamic memory structures and pointer manipulation.",
                    6,
                    "Linked List Self-Assessment",
                    List.of(
                            new Question("What is the time complexity to insert a node at the head of a linked list?", List.of("O(1)", "O(N)", "O(log N)", "O(N^2)"), 0, "Inserting at the head requires updating the head pointer in O(1) constant time.")
                    )
            );

            // ==========================================
            // LAB 2: MACHINE LEARNING & DEEP LEARNING LAB
            // ==========================================
            Lab mlLab = new Lab(
                    "ai-machine-learning",
                    "Machine Learning & Deep Learning Lab",
                    "Implement supervised/unsupervised machine learning models, neural networks, loss minimization, and prerequisite NumPy/Pandas pipelines.",
                    "Artificial Intelligence & Data Science",
                    "Advanced",
                    "Intermediate",
                    6,
                    true,
                    "🧠"
            );
            mlLab.setTags(Arrays.asList("NumPy", "Pandas", "Scikit-Learn", "Neural Networks", "Gradient Descent"));
            Lab savedMlLab = labRepository.save(mlLab);

            // Exp 1: Linear Regression
            createExperimentWithQuiz(
                    savedMlLab,
                    "linear-regression",
                    "Linear Regression & Gradient Descent",
                    "Implement Linear Regression using Gradient Descent loss minimization and visualize regression lines.",
                    "Partial derivatives, slope equations, and Mean Squared Error (MSE).",
                    "### Linear Regression with Gradient Descent\n\nModels linear relationships $y = mx + c$ minimizing Mean Squared Error (MSE) via gradient descent updates:\n\n$$m \\leftarrow m - \\alpha \\frac{\\partial L}{\\partial m}, \\quad c \\leftarrow c - \\alpha \\frac{\\partial L}{\\partial c}$$",
                    "lin-reg",
                    "import numpy as np\ndef fit(X, y, lr=0.01, epochs=1000):\n    m, c = 0.0, 0.0\n    n = len(X)\n    for _ in range(epochs):\n        y_pred = m * X + c\n        dm = (-2/n) * sum(X * (y - y_pred))\n        dc = (-2/n) * sum(y - y_pred)\n        m -= lr * dm\n        c -= lr * dc\n    return m, c",
                    "Trained Slope m = 2.01, Intercept c = 4.98, R² Score = 0.982",
                    "Gain geometric intuition for optimization surfaces and learning rates.",
                    1,
                    "Linear Regression Self-Assessment",
                    List.of(
                            new Question("In y = mx + c, what does 'm' represent?", List.of("Slope of the line", "Y-intercept", "Mean Squared Error", "Learning rate"), 0, "m represents the slope or rate of change."),
                            new Question("What happens if the learning rate is excessively large?", List.of("Converges instantly", "Overshoots and diverges", "Decreases automatically", "Becomes zero"), 1, "A high learning rate causes parameter updates to oscillate and diverge.")
                    )
            );

            // Exp 2: Logistic Regression
            createExperimentWithQuiz(
                    savedMlLab,
                    "logistic-regression",
                    "Logistic Regression Classification",
                    "Implement binary classification using the Sigmoid activation function and Binary Cross-Entropy loss.",
                    "Sigmoid function, probability thresholds, and log-loss.",
                    "### Logistic Regression\n\nMaps continuous inputs to probability values between 0 and 1 using the Sigmoid function $\\sigma(z) = \\frac{1}{1 + e^{-z}}$.",
                    "log-reg",
                    "import numpy as np\ndef sigmoid(z): return 1 / (1 + np.exp(-z))",
                    "Accuracy: 95.4%, Precision: 0.94, Recall: 0.96",
                    "Understand decision boundaries and classification metrics.",
                    2,
                    "Logistic Regression Self-Assessment",
                    List.of(
                            new Question("What is the output range of the Sigmoid function?", List.of("[-1, 1]", "[0, 1]", "[-infinity, infinity]", "[0, infinity]"), 1, "Sigmoid maps real numbers to probabilities in [0, 1].")
                    )
            );

            // ==========================================
            // LAB 3: DATABASE MANAGEMENT SYSTEMS LAB
            // ==========================================
            Lab dbmsLab = new Lab(
                    "dbms-lab",
                    "Database Management Systems Lab",
                    "Practice relational database design, complex SQL queries, B+ Tree indexing, relational normalization, and ACID transaction concurrency.",
                    "Artificial Intelligence & Data Science",
                    "Core",
                    "Intermediate",
                    5,
                    true,
                    "🗄️"
            );
            dbmsLab.setTags(Arrays.asList("SQL", "Normalization", "B+ Trees", "Transactions", "Query Optimization"));
            Lab savedDbmsLab = labRepository.save(dbmsLab);

            // Exp 1: SQL DDL & DML
            createExperimentWithQuiz(
                    savedDbmsLab,
                    "sql-ddl-dml",
                    "SQL DDL & DML Operations",
                    "Design relational tables with primary/foreign keys and execute SELECT, INSERT, UPDATE, DELETE queries.",
                    "Relational schema theory, entity relationship mapping.",
                    "### SQL Data Definition & Manipulation\n\nSQL provides DDL (CREATE, ALTER, DROP) for defining schema structures and DML (SELECT, INSERT, UPDATE, DELETE) for record manipulation.",
                    "sql-studio",
                    "CREATE TABLE Students (\n    reg_no VARCHAR(12) PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    department VARCHAR(50)\n);\nINSERT INTO Students VALUES ('922521104001', 'Anish V', 'AIDS');\nSELECT * FROM Students WHERE department = 'AIDS';",
                    "Rows matched: 1, Execution time: 2.4ms",
                    "Master schema constraints, cascading foreign keys, and query filtering.",
                    1,
                    "SQL DDL & DML Self-Assessment",
                    List.of(
                            new Question("Which SQL command is used to modify the structure of an existing table?", List.of("UPDATE", "ALTER", "MODIFY", "CHANGE"), 1, "ALTER TABLE modifies column definitions or constraints.")
                    )
            );

            // ==========================================
            // LAB 4: COMPUTER NETWORKS & PROTOCOLS LAB
            // ==========================================
            Lab netLab = new Lab(
                    "computer-networks",
                    "Computer Networks & Protocols Lab",
                    "Simulate sliding window protocols, packet routing algorithms (Dijkstra/Bellman-Ford), socket programming, and TCP/IP handshake states.",
                    "Artificial Intelligence & Data Science",
                    "Core",
                    "Intermediate",
                    5,
                    true,
                    "🌐"
            );
            netLab.setTags(Arrays.asList("TCP/IP", "Dijkstra Routing", "ARQ Protocols", "Sockets", "Wireshark"));
            Lab savedNetLab = labRepository.save(netLab);

            // Exp 1: Sliding Window ARQ
            createExperimentWithQuiz(
                    savedNetLab,
                    "sliding-window-arq",
                    "Sliding Window ARQ Protocols",
                    "Simulate Stop-and-Wait, Go-Back-N, and Selective Repeat flow control and error recovery over noisy channels.",
                    "OSI Data Link layer framing, ACK/NAK timers, sequence numbers.",
                    "### Sliding Window Flow Control\n\nEnables sender to transmit multiple data frames before needing an acknowledgement, utilizing window size $W$ for pipelined channel efficiency.",
                    "arq-sim",
                    "// Sliding Window Simulator\nint windowSize = 4;\nint nextSeqNum = 0;",
                    "Transmitted Frames: 0..3, ACK received for Frame 0, Window slid to 1..4",
                    "Understand channel bandwidth-delay product optimization and timeout recovery.",
                    1,
                    "Sliding Window ARQ Self-Assessment",
                    List.of(
                            new Question("In Go-Back-N with a window size of N, how many frames are retransmitted if frame k is lost?", List.of("1 frame", "All unacknowledged frames starting from k", "None", "N + 1 frames"), 1, "Go-Back-N retransmits frame k and all subsequent frames in the current window.")
                    )
            );
        }
    }

    private void createExperimentWithQuiz(Lab lab, String slug, String title, String objective, String prerequisites, String theory, String simulatorId, String code, String output, String outcome, int order, String quizTitle, List<Question> questions) {
        Experiment exp = new Experiment(slug, title, objective, prerequisites, theory, simulatorId, code, output, outcome, order);
        exp.setLab(lab);
        exp.setProcedureSteps(Arrays.asList(
                "1. Read the theoretical background, learning objectives, and time complexity.",
                "2. Open the Simulation Sandbox tab to execute step-by-step state animations.",
                "3. Inspect JVM Call Stack frames and recursion tree diagrams in the Code tab.",
                "4. Solve the practice LeetCode challenges and take the self-assessment quiz."
        ));
        Experiment savedExp = experimentRepository.save(exp);

        Quiz quiz = new Quiz(quizTitle, 75);
        quiz.setExperiment(savedExp);
        Quiz savedQuiz = quizRepository.save(quiz);

        for (Question q : questions) {
            q.setQuiz(savedQuiz);
        }
        savedQuiz.setQuestions(new ArrayList<>(questions));
        quizRepository.save(savedQuiz);
    }

    private void seedAnnouncements() {
        if (announcementRepository.count() == 0) {
            announcementRepository.save(new Announcement(
                    "AI & Data Science Department Virtual Labs Launch",
                    "Welcome to the official digital learning portal. Explore semester courses, run interactive virtual lab simulations, and track your progress.",
                    "Notice",
                    LocalDate.now().minusDays(2),
                    "All Students",
                    "/labs",
                    true
            ));
            announcementRepository.save(new Announcement(
                    "Data Structures & Algorithm Assessment Week",
                    "All 3rd Semester AIDS and CSE students must complete the Stack, Queue, and Bubble Sort self-assessment quizzes by Friday.",
                    "Exam",
                    LocalDate.now().minusDays(1),
                    "Semester 3",
                    "/labs/data-structures",
                    false
            ));
            announcementRepository.save(new Announcement(
                    "Machine Learning Model Training Workshop",
                    "Prerequisite NumPy and Scikit-Learn modules are now active for 4th and 5th Semester students in the MLDL lab.",
                    "Workshop",
                    LocalDate.now(),
                    "Semester 4 & 5",
                    "/labs/ai-machine-learning",
                    false
            ));
        }
    }
}
