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
            // Lab 1: Data Structures
            Lab dsaLab = new Lab(
                    "data-structures",
                    "Data Structures & Algorithms Virtual Lab",
                    "Interactive simulation suite for foundational and non-linear data structures including Stack, Queue, Singly Linked List, Bubble Sort, Selection Sort, and Insertion Sort.",
                    "Computer Science & Engineering",
                    "Core",
                    "Beginner to Intermediate",
                    8,
                    true,
                    "🧮"
            );
            dsaLab.setTags(Arrays.asList("Arrays", "Linked Lists", "Sorting", "Complexity", "Algorithms"));
            Lab savedDsaLab = labRepository.save(dsaLab);

            // Experiment 1: Stack
            createExperimentWithQuiz(
                    savedDsaLab,
                    "stack-operations",
                    "Stack Operations (LIFO)",
                    "To understand the Last-In First-Out (LIFO) property of stacks and master Push, Pop, and Peek operations.",
                    "Understanding of linear arrays and dynamic memory allocation.",
                    "### Stack Abstract Data Type (ADT)\n\nA **Stack** is a linear data structure that follows the **Last-In, First-Out (LIFO)** principle. The element inserted last is the first one to be removed.\n\n#### Core Operations:\n- **Push**: Adds an element to the top of the stack ($O(1)$).\n- **Pop**: Removes the top element from the stack ($O(1)$).\n- **Peek/Top**: Inspects the value of the top element without removing it ($O(1)$).\n\n#### Time Complexity:\n- Push: $O(1)$\n- Pop: $O(1)$\n- Peek: $O(1)$",
                    "stack",
                    "#include <stdio.h>\n#define MAX 5\nint stack[MAX], top = -1;\nvoid push(int val) {\n    if (top == MAX - 1) printf(\"Overflow\\n\");\n    else stack[++top] = val;\n}\nint pop() {\n    if (top == -1) { printf(\"Underflow\\n\"); return -1; }\n    return stack[top--];\n}",
                    "Push 10 -> Stack: [10]\nPush 20 -> Stack: [10, 20]\nPop() -> Returns 20, Stack: [10]",
                    "Students can conceptualize call stack frames, expression evaluations, and backtracking mechanics.",
                    1,
                    "Stack Operations Self-Assessment",
                    List.of(
                            new Question("Which principle does a Stack follow?", List.of("FIFO", "LIFO", "Priority", "Random"), 1, "Stack follows Last-In First-Out (LIFO)."),
                            new Question("What happens when Pop() is executed on an empty stack?", List.of("Overflow", "Underflow", "Segmentation Fault", "Deadlock"), 1, "Underflow occurs when attempting to pop from an empty stack."),
                            new Question("What is the time complexity of the Push operation?", List.of("O(1)", "O(N)", "O(log N)", "O(N^2)"), 0, "Pushing to the top of a stack takes constant time O(1).")
                    )
            );

            // Experiment 2: Bubble Sort
            createExperimentWithQuiz(
                    savedDsaLab,
                    "bubble-sort",
                    "Bubble Sort Algorithm",
                    "Visualize adjacent comparison, swap operations, and pass optimizations in Bubble Sort.",
                    "Basic knowledge of 1D arrays and nested loop structures.",
                    "### Bubble Sort Algorithm\n\n**Bubble Sort** is a comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.\n\n#### Complexity:\n- Best Case: $O(N)$ (with swapped flag)\n- Average & Worst Case: $O(N^2)$\n- Space Complexity: $O(1)$ (in-place)",
                    "bubble-sort",
                    "void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int swapped = 0;\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                swap(&arr[j], &arr[j+1]);\n                swapped = 1;\n            }\n        }\n        if (!swapped) break;\n    }\n}",
                    "Initial: [64, 34, 25, 12, 22]\nSorted:  [12, 22, 25, 34, 64]",
                    "Understand comparison count mechanics and the significance of sorting stability.",
                    2,
                    "Bubble Sort Self-Assessment",
                    List.of(
                            new Question("What is the worst-case time complexity of Bubble Sort?", List.of("O(N)", "O(N log N)", "O(N^2)", "O(1)"), 2, "Bubble sort has nested loops leading to O(N^2) comparisons."),
                            new Question("Is Bubble Sort a stable sorting algorithm?", List.of("Yes", "No", "Only for integers", "Depends on input"), 0, "Bubble Sort preserves the relative order of duplicate elements, making it stable.")
                    )
            );

            // Lab 2: Machine Learning Lab
            Lab mlLab = new Lab(
                    "ml-lab",
                    "Machine Learning Virtual Lab",
                    "Interactive laboratory covering regression, clustering, neural networks, and model performance metrics.",
                    "Artificial Intelligence",
                    "Advanced",
                    "Intermediate",
                    6,
                    true,
                    "🧠"
            );
            mlLab.setTags(Arrays.asList("Python", "scikit-learn", "Gradient Descent", "K-Means"));
            Lab savedMlLab = labRepository.save(mlLab);

            createExperimentWithQuiz(
                    savedMlLab,
                    "linear-regression",
                    "Linear Regression Fitting",
                    "Implement Linear Regression using Gradient Descent and visualize the fitting line on a scatter plot.",
                    "Basic knowledge of derivative rules, line slope equations (y = mx + c), and Mean Squared Error.",
                    "### Linear Regression with Gradient Descent\n\nLinear regression models the linear relationship between a dependent scalar variable $y$ and independent explanatory variables $x$.\n\n$$\\text{MSE Loss} = \\frac{1}{N} \\sum_{i=1}^N (y_i - (m x_i + c))^2$$",
                    "lin-reg",
                    "import numpy as np\ndef gradient_descent(x, y, lr=0.01, epochs=1000):\n    m, c = 0.0, 0.0\n    N = len(x)\n    for _ in range(epochs):\n        y_pred = m * x + c\n        dm = (-2/N) * sum(x * (y - y_pred))\n        dc = (-2/N) * sum(y - y_pred)\n        m -= lr * dm\n        c -= lr * dc\n    return m, c",
                    "Trained Slope (m) = 2.01, Intercept (c) = 4.98",
                    "Students gain geometric intuition for gradient descent parameter updates.",
                    1,
                    "Linear Regression Self-Assessment",
                    List.of(
                            new Question("In y = mx + c, what does 'm' represent?", List.of("Slope of the line", "Y-intercept", "Mean Squared Error", "Learning rate"), 0, "m represents the slope or rate of change."),
                            new Question("What happens if the learning rate is excessively large?", List.of("Converges instantly", "Overshoots and diverges", "Decreases automatically", "Becomes zero"), 1, "A high learning rate causes parameter updates to oscillate and diverge.")
                    )
            );
        }
    }

    private void createExperimentWithQuiz(Lab lab, String slug, String title, String objective, String prerequisites, String theory, String simulatorId, String code, String output, String outcome, int order, String quizTitle, List<Question> questions) {
        Experiment exp = new Experiment(slug, title, objective, prerequisites, theory, simulatorId, code, output, outcome, order);
        exp.setLab(lab);
        exp.setProcedureSteps(Arrays.asList(
                "1. Read the theoretical background and inspect the time complexity.",
                "2. Open the Simulation Sandbox tab to interact with the visualizer.",
                "3. Perform operations using custom values or automated animation steps.",
                "4. Navigate to the Quiz tab to evaluate your understanding."
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
        }
    }
}
