import { DSACategory } from "../dsa-topic-data";

export const OOPS_JAVA_ROADMAP_CATEGORIES: DSACategory[] = [
  // ========================================================
  // MODULE 1: CLASSES & OBJECTS FUNDAMENTALS (0/3)
  // ========================================================
  {
    id: "oops-classes-objects",
    name: "1. Classes & Objects Fundamentals",
    shortDesc: "Class modeling, state encapsulation, bank account logic, and product catalogs.",
    iconName: "Code2",
    topics: [
      {
        id: "oops-student-details",
        slug: "student-details-total-average-grade",
        title: "Exp 1: Create a Java Program to Store Student Details and Calculate Total, Average, and Grade",
        categoryId: "oops-classes-objects",
        categoryName: "1. Classes & Objects Fundamentals",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "Java classes objects student grade calculator OOP",
        gfgUrl: "https://www.geeksforgeeks.org/classes-objects-java/",
        quickSummary: "Model a Student class that captures marks and computes total/average/grade using simple class methods.",
        keyPoints: [
          "Encapsulation: Encapsulate related data (name, roll no., marks) as instance fields of a class.",
          "Separation of concerns: Methods perform input capture and computation (total, average) separately from display.",
          "Conditional grading: Conditional grading logic maps the average to a letter grade."
        ],
        diagramTitle: "Student Class UML Representation",
        diagram: `┌──────────────────────────────────────────────┐
│                  Student                     │
├──────────────────────────────────────────────┤
│ - rollNo: int                                │
│ - name: String                               │
│ - marks: double[]                            │
├──────────────────────────────────────────────┤
│ + calculateTotal(): double                   │
│ + calculateAverage(): double                 │
│ + getGrade(): char                           │
└──────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Total/Average calc", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Student Class)",
            code: `public class Student {
    private int rollNo;
    private String name;
    private double[] marks;

    public Student(int rollNo, String name, double[] marks) {
        this.rollNo = rollNo;
        this.name = name;
        this.marks = marks;
    }

    public double calculateTotal() {
        double total = 0;
        for (double m : marks) total += m;
        return total;
    }

    public double calculateAverage() {
        return calculateTotal() / marks.length;
    }

    public char calculateGrade() {
        double avg = calculateAverage();
        if (avg >= 90) return 'A';
        if (avg >= 75) return 'B';
        if (avg >= 60) return 'C';
        return 'D';
    }

    public void display() {
        System.out.printf("Roll: %d | Name: %s | Total: %.1f | Avg: %.2f | Grade: %c%n",
                rollNo, name, calculateTotal(), calculateAverage(), calculateGrade());
    }

    public static void main(String[] args) {
        Student s1 = new Student(101, "Alice", new double[]{92, 88, 95, 90, 85});
        s1.display();
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Java Classes & Objects",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/classes-objects-java/",
            platform: "GeeksforGeeks",
            topicTag: "Classes & Objects"
          }
        ]
      },
      {
        id: "oops-bank-account",
        slug: "bank-account-deposit-withdrawal-operations",
        title: "Exp 2: Develop a Java Application to Create Bank Accounts and Perform Deposit, Withdrawal, and Balance Enquiry Operations",
        categoryId: "oops-classes-objects",
        categoryName: "1. Classes & Objects Fundamentals",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Java bank account class deposit withdrawal balance menu driven",
        gfgUrl: "https://www.geeksforgeeks.org/java-program-to-create-a-banking-application/",
        quickSummary: "Build a BankAccount class supporting deposit, withdrawal (with balance checks), and balance display via a menu-driven interface.",
        keyPoints: [
          "State protection: Object state (account number, balance) is modified through dedicated methods rather than direct field access.",
          "Validation: Withdrawal logic validates sufficient balance before updating state.",
          "Menu dispatch: A menu loop repeatedly dispatches to the chosen operation until exit."
        ],
        diagramTitle: "Bank Account Transaction Flow",
        diagram: `  [ Balance: $1000 ] 
        ──► Deposit($500)   ──► [ New Balance: $1500 ]
        ──► Withdraw($2000) ──► [ Check Fails: Insufficient Funds! ]
        ──► Withdraw($300)  ──► [ Check OK: New Balance $1200 ]`,
        complexities: [
          { operation: "Deposit/Withdraw", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (BankAccount)",
            code: `public class BankAccount {
    private String accountNumber;
    private String accountHolder;
    private double balance;

    public BankAccount(String accNo, String holder, double initialDeposit) {
        this.accountNumber = accNo;
        this.accountHolder = holder;
        this.balance = initialDeposit;
    }

    public synchronized void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.printf("Deposited: $%.2f | Balance: $%.2f%n", amount, balance);
        }
    }

    public synchronized boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.printf("Withdrawn: $%.2f | Balance: $%.2f%n", amount, balance);
            return true;
        } else {
            System.out.println("Withdrawal rejected: Insufficient funds or invalid amount.");
            return false;
        }
    }

    public double getBalance() { return balance; }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("VSB-1001", "Rohith", 5000.0);
        acc.deposit(1200.0);
        acc.withdraw(2000.0);
        acc.withdraw(9000.0);
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Banking Application Implementation",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/java-program-to-create-a-banking-application/",
            platform: "GeeksforGeeks",
            topicTag: "OOP"
          }
        ]
      },
      {
        id: "oops-product-catalog",
        slug: "product-catalog-classes-and-objects",
        title: "Exp 3: Create a Product Catalog Using Classes and Objects to Store Product Name, Price, and Stock Details",
        categoryId: "oops-classes-objects",
        categoryName: "1. Classes & Objects Fundamentals",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Java product catalog class array of objects price stock",
        gfgUrl: "https://www.geeksforgeeks.org/inventory-management-system-using-java/",
        quickSummary: "Model a Product class and manage a catalog (array/collection of Product objects) to store and display product name, price, and stock.",
        keyPoints: [
          "Object grouping: Objects group related product attributes under one type.",
          "Collection representation: A collection of objects represents the catalog as a whole.",
          "Catalog iteration: Iteration over the collection supports catalog-wide display/search operations."
        ],
        diagramTitle: "Product Catalog Array of Objects Memory Layout",
        diagram: `  catalog[] ──► [0] Product(id=1, name="Laptop", price=$1200, stock=15)
            ──► [1] Product(id=2, name="Mouse",  price=$25,   stock=50)
            ──► [2] Product(id=3, name="KB",     price=$80,   stock=30)`,
        complexities: [
          { operation: "Catalog traversal", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Product Catalog)",
            code: `public class Product {
    private int id;
    private String name;
    private double price;
    private int stock;

    public Product(int id, String name, double price, int stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    public double calculateTotalValue() { return price * stock; }

    public void display() {
        System.out.printf("ID: %d | Name: %-15s | Price: $%7.2f | Stock: %3d | Value: $%8.2f%n",
                id, name, price, stock, calculateTotalValue());
    }

    public static void main(String[] args) {
        Product[] catalog = {
            new Product(1, "Laptop", 1200.0, 15),
            new Product(2, "Wireless Mouse", 25.0, 50),
            new Product(3, "Mechanical KB", 80.0, 30)
        };
        double totalVal = 0;
        for (Product p : catalog) {
            p.display();
            totalVal += p.calculateTotalValue();
        }
        System.out.printf("Total Inventory Value: $%.2f%n", totalVal);
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Inventory Management System using Java",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/inventory-management-system-using-java/",
            platform: "GeeksforGeeks",
            topicTag: "OOP"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 2: OPERATORS & CONTROL STATEMENTS (0/3)
  // ========================================================
  {
    id: "oops-operators-control",
    name: "2. Operators & Control Statements",
    shortDesc: "Arithmetic payroll equations, minimum balance conditionals, and OTP loops.",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "oops-payroll-calculation",
        slug: "gross-salary-deductions-net-salary",
        title: "Exp 4: Calculate Gross Salary, Deductions, and Net Salary Using Operators and Input/Output Statements",
        categoryId: "oops-operators-control",
        categoryName: "2. Operators & Control Statements",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Payroll salary calculation basic pay DA HRA PF tax Java operators",
        gfgUrl: "https://www.geeksforgeeks.org/payroll-management-system-using-java/",
        quickSummary: "Compute payroll figures (gross, deductions, net salary) using arithmetic operators and formatted I/O.",
        keyPoints: [
          "Arithmetic operators: Arithmetic operators combine basic pay and allowances into gross salary.",
          "Deduction formulas: Deduction rules (tax, PF, etc.) are applied via further arithmetic expressions.",
          "Formatted output: Formatted output presents the computed payslip values."
        ],
        diagramTitle: "Salary Component Decomposition",
        diagram: `┌────────────────────────────────────────────────────────┐
│ Basic Pay                                              │
├────────────────────────────┬───────────────────────────┤
│ + Allowances (DA 40%, HRA 15%) │ - Deductions (PF 12%, Tax 5%) │
├────────────────────────────┴───────────────────────────┤
│ = Net Salary (Take-Home Pay)                           │
└────────────────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Payroll calc", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Payroll Calculator)",
            code: `public class PayrollCalculator {
    public static void main(String[] args) {
        double basicPay = 45000.0;
        double da = basicPay * 0.40;   // 40% Dearness Allowance
        double hra = basicPay * 0.15;  // 15% House Rent Allowance
        double grossSalary = basicPay + da + hra;

        double pf = basicPay * 0.12;   // 12% Provident Fund
        double tax = grossSalary * 0.05; // 5% Professional Tax
        double totalDeductions = pf + tax;
        double netSalary = grossSalary - totalDeductions;

        System.out.println("=== Monthly Payslip ===");
        System.out.printf("Basic Pay:        $%10.2f%n", basicPay);
        System.out.printf("DA (40%%):        $%10.2f%n", da);
        System.out.printf("HRA (15%%):       $%10.2f%n", hra);
        System.out.printf("Gross Salary:     $%10.2f%n", grossSalary);
        System.out.printf("PF Deduction:     $%10.2f%n", pf);
        System.out.printf("Tax Deduction:    $%10.2f%n", tax);
        System.out.printf("Total Deductions: $%10.2f%n", totalDeductions);
        System.out.printf("Net Take-Home:    $%10.2f%n", netSalary);
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Java Arithmetic Operators & Payslip Program",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/payroll-management-system-using-java/",
            platform: "GeeksforGeeks",
            topicTag: "Operators"
          }
        ]
      },
      {
        id: "oops-min-balance-check",
        slug: "conditional-statements-minimum-balance-withdrawal",
        title: "Exp 5: Use Conditional Statements to Check Minimum Balance and Withdrawal Eligibility",
        categoryId: "oops-operators-control",
        categoryName: "2. Operators & Control Statements",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "Java conditional statements if else nested minimum balance withdrawal",
        gfgUrl: "https://www.geeksforgeeks.org/decision-making-javaif-else-switch-break-continue-jump/",
        quickSummary: "Apply if-else logic to validate whether a withdrawal request meets minimum-balance and sufficient-funds rules.",
        keyPoints: [
          "Business rule branching: Conditional (if-else) branching encodes business rules like minimum balance thresholds.",
          "Compound condition validation: Compound conditions combine multiple checks (balance and requested amount).",
          "Outcome signaling: Appropriate messages/results are returned per branch outcome."
        ],
        diagramTitle: "Withdrawal Eligibility Decision Tree",
        diagram: `  [ Withdrawal Request (Amt) ]
                │
        Amt <= CurrentBalance?
         ├── No  ──► [ REJECT: Insufficient Funds ]
         └── Yes ──► (CurrentBalance - Amt) >= MinBalance ($1000)?
                       ├── No  ──► [ REJECT: Violates Minimum Balance ]
                       └── Yes ──► [ APPROVE: Dispense Cash ]`,
        complexities: [
          { operation: "Eligibility check", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Withdrawal Eligibility)",
            code: `public class BalanceValidator {
    public static final double MIN_BALANCE = 1000.0;

    public static boolean checkEligibility(double currentBalance, double withdrawalAmount) {
        if (withdrawalAmount <= 0) {
            System.out.println("Error: Invalid withdrawal amount requested.");
            return false;
        } else if (withdrawalAmount > currentBalance) {
            System.out.println("Error: Insufficient funds in account.");
            return false;
        } else if ((currentBalance - withdrawalAmount) < MIN_BALANCE) {
            System.out.printf("Error: Transaction would breach minimum balance threshold ($%.2f).%n", MIN_BALANCE);
            return false;
        } else {
            System.out.printf("Approved! Remaining balance: $%.2f%n", currentBalance - withdrawalAmount);
            return true;
        }
    }

    public static void main(String[] args) {
        double balance = 3500.0;
        checkEligibility(balance, 1500.0); // Pass
        checkEligibility(balance, 3000.0); // Fails min balance
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Conditional Statements & Decision Making in Java",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/decision-making-javaif-else-switch-break-continue-jump/",
            platform: "GeeksforGeeks",
            topicTag: "Control Flow"
          }
        ]
      },
      {
        id: "oops-otp-verification",
        slug: "otp-generation-verification-loops",
        title: "Exp 6: Implement OTP Generation and Verification Using Loops and Decision-Making Statements",
        categoryId: "oops-operators-control",
        categoryName: "2. Operators & Control Statements",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Java OTP generation verification random number loop retry",
        gfgUrl: "https://www.geeksforgeeks.org/generate-otp-in-java/",
        quickSummary: "Generate a random OTP, then loop to accept user attempts and verify against the generated code with limited retries.",
        keyPoints: [
          "Random generation: Random number generation produces a fixed-length OTP.",
          "Bounded retries: A loop bounds the number of verification attempts allowed.",
          "Exit control: Decision statements compare user input to the OTP and control loop exit/success state."
        ],
        diagramTitle: "OTP Verification Bounded Retry Loop",
        diagram: `  [ Generate 6-Digit OTP ] ──► [ Prompt User (Attempts: 3) ]
                                      │
              ┌───────────────────────┴───────────────────────┐
              ▼                                               ▼
         Match OTP?                                      Match OTP?
           [ YES ] ──► Access Granted!                     [ NO ] ──► Attempts Left > 0?
                                                                         ├── Yes ──► Loop retry
                                                                         └── No  ──► Account Locked`,
        complexities: [
          { operation: "Verification loop", best: "O(1)", avg: "O(k)", worst: "O(k) (k=max attempts)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (OTP Auth Engine)",
            code: `import java.util.Random;

public class AuthEngine {
    private String generatedOtp;
    private int attemptsLeft = 3;

    public String generateOtp() {
        Random rand = new Random();
        int code = 100000 + rand.nextInt(900000);
        this.generatedOtp = String.valueOf(code);
        System.out.println("[SYSTEM SMS] OTP Generated: " + this.generatedOtp);
        return this.generatedOtp;
    }

    public boolean verifyOtp(String inputOtp) {
        if (attemptsLeft <= 0) {
            System.out.println("[-] Account temporarily locked due to too many failed attempts.");
            return false;
        }
        if (this.generatedOtp.equals(inputOtp)) {
            System.out.println("[✓] Authentication Successful! Access Granted.");
            return true;
        } else {
            attemptsLeft--;
            System.out.println("[-] Invalid OTP. Attempts remaining: " + attemptsLeft);
            return false;
        }
    }

    public static void main(String[] args) {
        AuthEngine auth = new AuthEngine();
        String otp = auth.generateOtp();
        auth.verifyOtp("111111");  // Wrong attempt
        auth.verifyOtp(otp);       // Correct attempt
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Generate OTP in Java",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/generate-otp-in-java/",
            platform: "GeeksforGeeks",
            topicTag: "Security"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 3: INHERITANCE & POLYMORPHISM (0/3)
  // ========================================================
  {
    id: "oops-inheritance-poly",
    name: "3. Inheritance & Polymorphism",
    shortDesc: "Class hierarchies, constructor super-chaining, dynamic dispatch, and recursion.",
    iconName: "Layers",
    topics: [
      {
        id: "oops-employee-payroll-inheritance",
        slug: "classes-constructors-inheritance-method-overriding-payroll",
        title: "Exp 7: Demonstrate Classes, Constructors, Inheritance, and Method Overriding to Generate Employee Payroll Details",
        categoryId: "oops-inheritance-poly",
        categoryName: "3. Inheritance & Polymorphism",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Java inheritance method overriding super constructor employee payroll",
        gfgUrl: "https://www.geeksforgeeks.org/inheritance-in-java/",
        quickSummary: "Build an Employee base class and specialized subclasses that override payroll calculation logic.",
        keyPoints: [
          "Constructor chaining: Constructors initialize base and derived class state via super() chaining.",
          "Code reusability: Inheritance lets subclasses reuse and extend common Employee behavior.",
          "Polymorphic dispatch: Method overriding customizes payroll computation per employee type while sharing a common interface."
        ],
        diagramTitle: "Employee Inheritance Class Hierarchy",
        diagram: `                 [ Employee (Base Class) ]
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
  [ FullTimeEmployee ]              [ PartTimeEmployee ]
  (+ benefits, + bonus)             (hoursWorked * hourlyRate)`,
        complexities: [
          { operation: "Payroll dispatch", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Inheritance & Overriding)",
            code: `class Employee {
    protected int empId;
    protected String name;
    protected double baseSalary;

    public Employee(int empId, String name, double baseSalary) {
        this.empId = empId;
        this.name = name;
        this.baseSalary = baseSalary;
    }

    public double calculateSalary() { return baseSalary; }
}

class Manager extends Employee {
    private double bonus;

    public Manager(int empId, String name, double baseSalary, double bonus) {
        super(empId, name, baseSalary);
        this.bonus = bonus;
    }

    @Override
    public double calculateSalary() { return baseSalary + bonus; }
}

class Developer extends Employee {
    private int overtimeHours;

    public Developer(int empId, String name, double baseSalary, int overtimeHours) {
        super(empId, name, baseSalary);
        this.overtimeHours = overtimeHours;
    }

    @Override
    public double calculateSalary() { return baseSalary + (overtimeHours * 50.0); }
}

public class PayrollDemo {
    public static void main(String[] args) {
        Employee[] staff = {
            new Manager(101, "Aiden", 80000, 15000),
            new Developer(102, "Blake", 65000, 20)
        };
        for (Employee e : staff) {
            System.out.printf("Emp %s: $%.2f%n", e.name, e.calculateSalary());
        }
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Inheritance and Polymorphism in Java",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/inheritance-in-java/",
            platform: "GeeksforGeeks",
            topicTag: "Inheritance"
          }
        ]
      },
      {
        id: "oops-student-faculty-course",
        slug: "inheritance-student-faculty-course-classes",
        title: "Exp 8: Implement Inheritance for Student, Faculty, and Course Classes",
        categoryId: "oops-inheritance-poly",
        categoryName: "3. Inheritance & Polymorphism",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Java inheritance Person Student Faculty Course association OOP",
        gfgUrl: "https://www.geeksforgeeks.org/association-composition-and-aggregation-in-java/",
        quickSummary: "Design a class hierarchy relating Student, Faculty, and Course entities to model an academic domain.",
        keyPoints: [
          "Common base type: A common base (e.g. Person) captures shared attributes for Student and Faculty.",
          "Association & composition: Association/composition links Course objects to enrolled Students and assigned Faculty.",
          "Subclass behavior: Polymorphic method calls behave differently depending on the concrete subclass."
        ],
        diagramTitle: "Academic Domain Association & Inheritance Model",
        diagram: `                 [ Person (Base) ]
                         │
             ┌───────────┴───────────┐
             ▼                       ▼
        [ Student ]             [ Faculty ]
             ▲                       ▲
             │ (Enrolled)            │ (Instructor)
             └─────── [ Course ] ────┘`,
        complexities: [
          { operation: "Object graph traversal", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Academic Domain)",
            code: `import java.util.ArrayList;
import java.util.List;

class Person {
    protected String name;
    protected String email;
    public Person(String name, String email) { this.name = name; this.email = email; }
    public void getProfile() { System.out.println(name + " (" + email + ")"); }
}

class AcademicStudent extends Person {
    private String rollNo;
    public AcademicStudent(String name, String email, String rollNo) {
        super(name, email);
        this.rollNo = rollNo;
    }
    @Override
    public void getProfile() { System.out.println("Student: " + name + " | Roll: " + rollNo); }
}

class Faculty extends Person {
    private String department;
    public Faculty(String name, String email, String dept) {
        super(name, email);
        this.department = dept;
    }
    @Override
    public void getProfile() { System.out.println("Faculty: Prof. " + name + " | Dept: " + department); }
}

class Course {
    String courseCode;
    Faculty instructor;
    List<AcademicStudent> enrolled = new ArrayList<>();

    public Course(String code, Faculty faculty) {
        this.courseCode = code;
        this.instructor = faculty;
    }
    public void enroll(AcademicStudent s) { enrolled.add(s); }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Association, Composition, and Aggregation in Java",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/association-composition-and-aggregation-in-java/",
            platform: "GeeksforGeeks",
            topicTag: "OOP Design"
          }
        ]
      },
      {
        id: "oops-recursion-overloading-overriding",
        slug: "recursive-functions-method-overloading-overriding",
        title: "Exp 9: Implement Recursive Functions (Factorial/Fibonacci) and Demonstrate Method Overloading and Overriding",
        categoryId: "oops-inheritance-poly",
        categoryName: "3. Inheritance & Polymorphism",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Java recursive factorial Fibonacci method overloading overriding",
        gfgUrl: "https://www.geeksforgeeks.org/recursion-in-java/",
        quickSummary: "Write recursive factorial/Fibonacci methods, alongside overloaded and overridden method examples in a class hierarchy.",
        keyPoints: [
          "Recursive base case: Recursion solves factorial/Fibonacci by reducing to smaller subproblems with a base case.",
          "Compile-time polymorphism: Method overloading distinguishes methods by differing parameter signatures at compile time.",
          "Runtime polymorphism: Method overriding redefines inherited behavior, resolved at runtime via dynamic dispatch."
        ],
        diagramTitle: "Polymorphism: Compile-Time Overloading vs Runtime Overriding",
        diagram: `  [ Overloading ] ──► calculate(int) vs calculate(int, int) [Compile-Time]
  [ Overriding ]  ──► Derived.compute() replaces Base.compute() [Runtime Dispatch]
  [ Recursion ]   ──► fib(4) -> fib(3) + fib(2) [Call Stack Unwinding]`,
        complexities: [
          { operation: "Fibonacci(n) recursive", best: "O(2^n) naive / O(n) memoized", avg: "O(2^n)", worst: "O(2^n)", space: "O(n) (call stack)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Recursion & Polymorphism)",
            code: `public class RecursionPolymorphism {
    // 1. Recursive Factorial
    public static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    // 2. Recursive Fibonacci
    public static long fibonacci(int n) {
        if (n <= 0) return 0;
        if (n == 1) return 1;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    // 3. Method Overloading (Compile-Time)
    public int multiply(int a, int b) { return a * b; }
    public double multiply(double a, double b) { return a * b; }
    public int multiply(int a, int b, int c) { return a * b * c; }

    public static void main(String[] args) {
        System.out.println("Factorial(5): " + factorial(5));
        System.out.println("Fibonacci(7): " + fibonacci(7));
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Recursion in Java",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/recursion-in-java/",
            platform: "GeeksforGeeks",
            topicTag: "Recursion"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 4: ARRAYS & ALGORITHMIC PROBLEM SOLVING (0/3)
  // ========================================================
  {
    id: "oops-arrays-algorithms",
    name: "4. Arrays & Algorithmic Problem Solving",
    shortDesc: "Matrix algebra, Spiral/Wave traversals, Anagrams, and Kadane's maximum subarray.",
    iconName: "Network",
    topics: [
      {
        id: "oops-matrix-operations",
        slug: "matrix-addition-subtraction-transpose-multiplication",
        title: "Exp 10: Perform Matrix Addition, Subtraction, Transpose, and Multiplication",
        categoryId: "oops-arrays-algorithms",
        categoryName: "4. Arrays & Algorithmic Problem Solving",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Java 2D array matrix addition multiplication transpose",
        gfgUrl: "https://www.geeksforgeeks.org/java-program-to-multiply-two-matrices-of-any-size/",
        quickSummary: "Implement the four standard matrix operations using 2D arrays and nested loops.",
        keyPoints: [
          "Element-wise operations: Addition/subtraction operate element-wise on matrices of equal dimensions.",
          "Transposition indexing: Transpose swaps row and column indices (A[i][j] -> A[j][i]).",
          "Matrix multiplication: Multiplication accumulates dot products of rows and columns, requiring compatible dimensions (m×k with k×n)."
        ],
        diagramTitle: "Matrix Multiplications Row-Column Dot Product",
        diagram: `  [ Row i of Matrix A ] • [ Col j of Matrix B ] ──► C[i][j] = Σ A[i][k] * B[k][j]`,
        complexities: [
          { operation: "Matrix multiply n×n", best: "O(n³)", avg: "O(n³)", worst: "O(n³)", space: "O(n²)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Matrix Operations)",
            code: `public class Matrix {
    private int rows, cols;
    private int[][] data;

    public Matrix(int rows, int cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = new int[rows][cols];
    }

    public static Matrix multiply(Matrix A, Matrix B) {
        if (A.cols != B.rows) throw new IllegalArgumentException("Incompatible matrix dimensions!");
        Matrix C = new Matrix(A.rows, B.cols);
        for (int i = 0; i < A.rows; i++) {
            for (int j = 0; j < B.cols; j++) {
                for (int k = 0; k < A.cols; k++) {
                    C.data[i][j] += A.data[i][k] * B.data[k][j];
                }
            }
        }
        return C;
    }

    public Matrix transpose() {
        Matrix T = new Matrix(cols, rows);
        for (int i = 0; i < rows; i++)
            for (int j = 0; j < cols; j++)
                T.data[j][i] = this.data[i][j];
        return T;
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Matrix Multiplication in Java",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/java-program-to-multiply-two-matrices-of-any-size/",
            platform: "GeeksforGeeks",
            topicTag: "Matrix"
          }
        ]
      },
      {
        id: "oops-spiral-wave-matrix",
        slug: "print-2d-matrix-spiral-order-wave-order",
        title: "Exp 11: Print a 2D Matrix in Spiral Order and Wave Order",
        categoryId: "oops-arrays-algorithms",
        categoryName: "4. Arrays & Algorithmic Problem Solving",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Spiral order matrix traversal wave order traversal 2D array Java",
        gfgUrl: "https://www.geeksforgeeks.org/print-a-given-matrix-in-spiral-form/",
        quickSummary: "Traverse a 2D matrix using two distinct patterns — spiral (boundary-inward) and wave (column zig-zag).",
        keyPoints: [
          "Shrinking boundaries: Spiral traversal maintains shrinking boundary indices (top/bottom/left/right).",
          "Alternating directions: Wave traversal alternates the direction of column traversal on each pass.",
          "Single-visit efficiency: Both patterns visit every cell exactly once without extra storage."
        ],
        diagramTitle: "Spiral & Wave Traversal Trajectories",
        diagram: `  [Spiral]  1 ──► 2 ──► 3     [Wave]  1   6   7
                        │             │   ▲   │
            8 ──► 9     4             2   5   8
            ▲           │             │   ▲   │
            7 ◄── 6 ◄── 5             3   4   9`,
        complexities: [
          { operation: "Full matrix traversal", best: "O(n·m)", avg: "O(n·m)", worst: "O(n·m)", space: "O(1) extra" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Spiral & Wave Traversal)",
            code: `public class MatrixTraversals {
    public static void printSpiral(int[][] matrix) {
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;
        System.out.print("Spiral: ");
        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) System.out.print(matrix[top][i] + " ");
            top++;
            for (int i = top; i <= bottom; i++) System.out.print(matrix[i][right] + " ");
            right--;
            if (top <= bottom) {
                for (int i = right; i >= left; i--) System.out.print(matrix[bottom][i] + " ");
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) System.out.print(matrix[i][left] + " ");
                left++;
            }
        }
        System.out.println();
    }

    public static void printWave(int[][] matrix) {
        System.out.print("Wave: ");
        int rows = matrix.length, cols = matrix[0].length;
        for (int j = 0; j < cols; j++) {
            if (j % 2 == 0) {
                for (int i = 0; i < rows; i++) System.out.print(matrix[i][j] + " ");
            } else {
                for (int i = rows - 1; i >= 0; i--) System.out.print(matrix[i][j] + " ");
            }
        }
        System.out.println();
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Spiral Matrix Traversal",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/print-a-given-matrix-in-spiral-form/",
            platform: "GeeksforGeeks",
            topicTag: "Matrix"
          }
        ]
      },
      {
        id: "oops-anagram-kadane",
        slug: "anagram-pattern-matching-kadane-algorithm",
        title: "Exp 12: Implement Anagram Checking, Pattern Matching, and Kadane's Algorithm for Maximum Subarray Sum",
        categoryId: "oops-arrays-algorithms",
        categoryName: "4. Arrays & Algorithmic Problem Solving",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Kadane's algorithm maximum subarray anagram pattern matching Java",
        gfgUrl: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/",
        quickSummary: "Solve three classic array/string problems: anagram detection, substring pattern search, and maximum contiguous subarray sum.",
        keyPoints: [
          "Frequency comparison: Anagram checking compares character frequency counts (or sorted strings) of two inputs.",
          "Sliding scan: Pattern matching scans the text for occurrences of a substring using a sliding comparison.",
          "Kadane's running sum: Kadane's Algorithm tracks a running sum, resetting when it turns negative, to find the maximum subarray sum in one pass."
        ],
        diagramTitle: "Kadane's Algorithm Dynamic Subarray Tracking",
        diagram: `  Array: [ -2, 1, -3, 4, -1, 2, 1, -5, 4 ]
  Curr:    -2  1  -2  4   3  5  6   1  5
  Max:     -2  1   1  4   4  5  6   6  6 ──► Max Sum = 6 ([4, -1, 2, 1])`,
        complexities: [
          { operation: "Kadane's Algorithm", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Kadane & Anagram)",
            code: `public class ArrayStringAlgorithms {
    // Kadane's Algorithm (O(n) time, O(1) space)
    public static int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currentMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentMax);
        }
        return maxSoFar;
    }

    // Valid Anagram Check (O(n) time, O(1) space)
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }
        for (int count : freq) if (count != 0) return false;
        return true;
    }

    public static void main(String[] args) {
        int[] arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println("Max Subarray Sum: " + maxSubArray(arr));
        System.out.println("Anagram check: " + isAnagram("listen", "silent"));
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Largest Sum Contiguous Subarray (Kadane's Algorithm)",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/",
            platform: "GeeksforGeeks",
            topicTag: "Algorithms"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 5: EXCEPTIONS, COLLECTIONS & DATABASE CONNECTIVITY (0/3)
  // ========================================================
  {
    id: "oops-exceptions-collections-jdbc",
    name: "5. Exceptions, Collections & Database Connectivity",
    shortDesc: "Custom exception hierarchies, Stream API pipelines, and JDBC CRUD database persistence.",
    iconName: "Sparkles",
    topics: [
      {
        id: "oops-custom-exceptions-file-io",
        slug: "custom-exceptions-file-read-write-operations",
        title: "Exp 13: Create a Program That Demonstrates Custom Exceptions and File Read/Write Operations",
        categoryId: "oops-exceptions-collections-jdbc",
        categoryName: "5. Exceptions, Collections & Database Connectivity",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Custom exceptions try catch finally BufferedReader BufferedWriter Java",
        gfgUrl: "https://www.geeksforgeeks.org/user-defined-custom-exception-in-java/",
        quickSummary: "Define a custom exception class for domain-specific error conditions and combine it with basic file I/O (read/write/append).",
        keyPoints: [
          "Exception inheritance: Custom exceptions extend Exception/RuntimeException to represent domain-specific failure cases.",
          "Resource protection: try-catch-finally and try-with-resources handle and clean up around risky I/O operations.",
          "Persistent streams: File streams read and persist data to disk with proper resource closing."
        ],
        diagramTitle: "Java Custom Exception & File I/O Architecture",
        diagram: `  [ Domain Logic ] ──► Throws InsufficientFundsException
                              │
                              ▼
                     [ try-catch block ] ──► Log to disk via BufferedWriter
                              │
                              ▼ (AutoCloseable)
                     [ File Stream Safely Closed ]`,
        complexities: [
          { operation: "File read/write", best: "O(1)", avg: "O(size)", worst: "O(size)", space: "O(1) buffered" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Custom Exception & File I/O)",
            code: `import java.io.*;

class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String msg) { super(msg); }
}

public class FileExceptionDemo {
    public static void logAudit(String file, String log) {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file, true))) {
            bw.write(log);
            bw.newLine();
            System.out.println("[Audit] Logged: " + log);
        } catch (IOException e) {
            System.err.println("I/O Error: " + e.getMessage());
        }
    }

    public static void withdraw(double bal, double amt) throws InsufficientFundsException {
        if (amt > bal) throw new InsufficientFundsException("Cannot withdraw $" + amt + " from $" + bal);
    }

    public static void main(String[] args) {
        try {
            withdraw(100, 500);
        } catch (InsufficientFundsException e) {
            System.err.println("Exception: " + e.getMessage());
            logAudit("audit.log", "ERROR: " + e.getMessage());
        }
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "User-defined Custom Exception in Java",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/user-defined-custom-exception-in-java/",
            platform: "GeeksforGeeks",
            topicTag: "Exceptions"
          }
        ]
      },
      {
        id: "oops-collections-stream-api",
        slug: "arraylist-hashset-hashmap-lambda-stream-api",
        title: "Exp 14: Use ArrayList, HashSet, HashMap, Lambda Expressions, and Stream API for Data Processing",
        categoryId: "oops-exceptions-collections-jdbc",
        categoryName: "5. Exceptions, Collections & Database Connectivity",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Java Collections ArrayList HashSet HashMap Stream API lambda filter map",
        gfgUrl: "https://www.geeksforgeeks.org/collections-in-java-2/",
        quickSummary: "Apply Java Collections (List/Set/Map) together with lambdas and the Stream API to filter, transform, and aggregate data.",
        keyPoints: [
          "Collection characteristics: ArrayList/HashSet/HashMap offer ordered-list, unique-set, and key-value storage respectively with different lookup costs.",
          "Lambda expressions: Lambda expressions provide concise inline implementations of functional interfaces.",
          "Declarative streams: The Stream API chains filter/map/reduce operations to process collections declaratively."
        ],
        diagramTitle: "Java Stream Pipeline Functional Transformation",
        diagram: `┌────────────────────────────────────────────────────────┐
│ List<Student> Source                                   │
├────────────────────────────────────────────────────────┤
│ .stream()                                              │
│ .filter(s -> s.getMarks() >= 90.0)    [Intermediate]   │
│ .map(Student::getName)                [Intermediate]   │
│ .collect(Collectors.toList())         [Terminal Reducer]│
└────────────────────────────────────────────────────────┘`,
        complexities: [
          { operation: "HashMap get/put", best: "O(1)", avg: "O(1)", worst: "O(n) (collisions)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Collections & Stream API)",
            code: `import java.util.*;
import java.util.stream.Collectors;

class Record {
    String name, dept;
    double gpa;
    Record(String n, String d, double g) { name = n; dept = d; gpa = g; }
}

public class StreamDemo {
    public static void main(String[] args) {
        List<Record> students = Arrays.asList(
            new Record("Alice", "AIDS", 3.9),
            new Record("Bob", "CSE", 3.2),
            new Record("Charlie", "AIDS", 3.8)
        );

        // Declarative Stream Pipeline: Filter & Map
        List<String> topAids = students.stream()
            .filter(s -> s.dept.equals("AIDS") && s.gpa >= 3.5)
            .map(s -> s.name.toUpperCase())
            .collect(Collectors.toList());

        System.out.println("Top AIDS Students: " + topAids);
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Java Stream Pipeline & Collectors",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/collections-in-java-2/",
            platform: "GeeksforGeeks",
            topicTag: "Collections"
          }
        ]
      },
      {
        id: "oops-jdbc-crud-app",
        slug: "jdbc-based-crud-application",
        title: "Exp 15: Develop a JDBC-Based CRUD Application (Student/Employee/Hotel Reservation Management System)",
        categoryId: "oops-exceptions-collections-jdbc",
        categoryName: "5. Exceptions, Collections & Database Connectivity",
        difficulty: "Advanced",
        estimatedTime: "35 mins",
        gfgSearchQuery: "Java JDBC CRUD application PreparedStatement DriverManager ResultSet",
        gfgUrl: "https://www.geeksforgeeks.org/introduction-to-jdbc/",
        quickSummary: "Build a menu-driven Java application that connects to a relational database via JDBC and performs Create, Read, Update, Delete operations on records.",
        keyPoints: [
          "Parameterized queries: A JDBC Connection/Statement/PreparedStatement executes parameterized SQL against the database safely.",
          "CRUD mapping: CRUD operations map directly to INSERT/SELECT/UPDATE/DELETE statements.",
          "Result processing: ResultSet processing converts query rows back into Java objects for display."
        ],
        diagramTitle: "JDBC Architecture & Query Lifecycle",
        diagram: `  [ Java DAO Application ]
               │
               ▼ PreparedStatement (Parameterized SQL)
     [ JDBC Driver Manager ]
               │
               ▼ TCP Socket
     [ MySQL / PostgreSQL Database ] ──► Returns ResultSet Rows`,
        complexities: [
          { operation: "CRUD DB operation", best: "O(1) indexed", avg: "O(log n) indexed", worst: "O(n) full scan", space: "O(1) per op" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (JDBC CRUD Application)",
            code: `import java.sql.*;

public class StudentDAO {
    private static final String URL = "jdbc:mysql://localhost:3306/vlab_db";
    private static final String USER = "root";
    private static final String PASS = "password";

    // 1. Create (Insert Record)
    public static void insertStudent(int id, String name, double gpa) {
        String sql = "INSERT INTO students (id, name, gpa) VALUES (?, ?, ?)";
        try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            pstmt.setString(2, name);
            pstmt.setDouble(3, gpa);
            pstmt.executeUpdate();
            System.out.println("[✓] Inserted student ID: " + id);
        } catch (SQLException e) {
            System.err.println("Database Error: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        System.out.println("JDBC DAO ready for MySQL transactions.");
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Java Database Connectivity (JDBC)",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/introduction-to-jdbc/",
            platform: "GeeksforGeeks",
            topicTag: "JDBC"
          }
        ]
      }
    ]
  }
];
