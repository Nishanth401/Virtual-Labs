import { DSACategory } from "../dsa-topic-data";

export const OOPS_JAVA_ROADMAP_CATEGORIES: DSACategory[] = [
  {
    id: "oops-classes-encapsulation",
    name: "1. Classes, Objects & Encapsulation Fundamentals",
    shortDesc: "Student grade calculation, Banking apps, Product catalogs, Payroll, and Account validation.",
    iconName: "Code2",
    topics: [
      {
        id: "oops-student-grade-calc",
        slug: "student-grade-calculator",
        title: "Exp 1: Student Grade Calculator",
        categoryId: "oops-classes-encapsulation",
        categoryName: "1. Classes, Objects & Encapsulation Fundamentals",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "Java classes objects student grade calculator OOP",
        gfgUrl: "https://www.geeksforgeeks.org/classes-objects-java/",
        quickSummary: "Store student records, calculate aggregate marks, compute GPA average, and assign letter grades using encapsulated Java classes.",
        keyPoints: [
          "Encapsulation: private member variables with public getter/setter methods.",
          "Constructor initializes roll number, name, and subject mark arrays.",
          "Grade mapping using tiered conditional grading logic."
        ],
        diagramTitle: "Student Class UML Representation",
        diagram: `┌──────────────────────────────────────────────┐
│                  Student                     │
├──────────────────────────────────────────────┤
│ - rollNo: int                                │
│ - name: String                               │
│ - marks: double[]                            │
├──────────────────────────────────────────────┤
│ + Student(rollNo: int, name: String, ...)    │
│ + calculateTotal(): double                   │
│ + calculateAverage(): double                 │
│ + getGrade(): char                           │
└──────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Total & Average Calculation", best: "O(subjects)", avg: "O(subjects)", worst: "O(subjects)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Student Grade Calculator)",
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

    public char getGrade() {
        double avg = calculateAverage();
        if (avg >= 90) return 'O';
        else if (avg >= 80) return 'A';
        else if (avg >= 70) return 'B';
        else if (avg >= 50) return 'C';
        else return 'F';
    }

    public void displayReport() {
        System.out.printf("Roll: %d | Name: %s | Total: %.1f | Avg: %.2f | Grade: %c%n",
                rollNo, name, calculateTotal(), calculateAverage(), getGrade());
    }

    public static void main(String[] args) {
        Student s1 = new Student(101, "Alice", new double[]{92.5, 88.0, 95.0, 89.5});
        s1.displayReport();
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Java Class Encapsulation",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/classes-objects-java/",
            platform: "GeeksforGeeks",
            topicTag: "OOP"
          }
        ]
      },
      {
        id: "oops-banking-app",
        slug: "banking-application-oop",
        title: "Exp 2: Banking Application (Deposit, Withdrawal & Balance Enquiry)",
        categoryId: "oops-classes-encapsulation",
        categoryName: "1. Classes, Objects & Encapsulation Fundamentals",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Java banking application classes objects deposit withdrawal",
        gfgUrl: "https://www.geeksforgeeks.org/java-program-to-create-a-banking-application/",
        quickSummary: "Implement robust BankAccount class with atomic deposit, withdrawal validation, and balance enquiry.",
        keyPoints: [
          "Maintains private balance state preventing unauthorized external tampering.",
          "Validates insufficient funds before deducting withdrawal amounts.",
          "Maintains audit log of transaction histories."
        ],
        diagramTitle: "BankAccount State & Operations",
        diagram: `┌──────────────────────────────────────────────┐
│                BankAccount                   │
├──────────────────────────────────────────────┤
│ - accountNumber: long                        │
│ - holderName: String                         │
│ - balance: double                            │
├──────────────────────────────────────────────┤
│ + deposit(amount: double): void              │
│ + withdraw(amount: double): boolean          │
│ + checkBalance(): double                     │
└──────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Deposit / Withdrawal", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Banking Application)",
            code: `public class BankAccount {
    private long accountNumber;
    private String holderName;
    private double balance;

    public BankAccount(long accNum, String name, double initialDeposit) {
        this.accountNumber = accNum;
        this.holderName = name;
        this.balance = initialDeposit;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.printf("[+] Deposited $%.2f. New Balance: $%.2f%n", amount, balance);
        }
    }

    public boolean withdraw(double amount) {
        if (amount > balance) {
            System.out.println("[-] Error: Insufficient funds!");
            return false;
        } else if (amount <= 0) {
            System.out.println("[-] Error: Invalid withdrawal amount!");
            return false;
        }
        balance -= amount;
        System.out.printf("[✓] Withdrawn $%.2f. Remaining Balance: $%.2f%n", amount, balance);
        return true;
    }

    public double getBalance() { return balance; }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount(100123456L, "Robert Fox", 5000.0);
        acc.deposit(1500.0);
        acc.withdraw(2000.0);
        acc.withdraw(8000.0);  // Triggers insufficient funds
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Banking Account Simulation in Java",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/java-program-to-create-a-banking-application/",
            platform: "GeeksforGeeks",
            topicTag: "Banking OOP"
          }
        ]
      },
      {
        id: "oops-product-catalog",
        slug: "product-catalog-system",
        title: "Exp 3: Product Catalog System",
        categoryId: "oops-classes-encapsulation",
        categoryName: "1. Classes, Objects & Encapsulation Fundamentals",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "Product catalog inventory management Java OOP",
        gfgUrl: "https://www.geeksforgeeks.org/inventory-management-system-using-java/",
        quickSummary: "Manage inventory product models (ID, name, price, stock quantity, category) with reorder alerts.",
        keyPoints: [
          "Object array storage representing product inventory line items.",
          "Stock addition, deduction, and restock notification triggers.",
          "Total inventory valuation aggregation."
        ],
        diagramTitle: "Product & Inventory Aggregation",
        diagram: `┌──────────────────────┐         ┌──────────────────────────────┐
│      Inventory       │ 1     * │           Product            │
│ - items: Product[]   │────────►│ - id: int, - name: String    │
│ + totalValue(): double         │ - price: double, - stock: int│
└──────────────────────┘         └──────────────────────────────┘`,
        complexities: [
          { operation: "Stock Lookup & Valuation", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
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

    public void updateStock(int quantity) {
        this.stock += quantity;
        System.out.printf("Product %s stock updated to %d units.%n", name, this.stock);
    }

    public double calculateTotalValue() { return price * stock; }

    public static void main(String[] args) {
        Product[] catalog = {
            new Product(1, "Laptop", 1200.0, 15),
            new Product(2, "Wireless Mouse", 25.0, 50),
            new Product(3, "Mechanical Keyboard", 80.0, 30)
        };
        double totalVal = 0;
        for (Product p : catalog) totalVal += p.calculateTotalValue();
        System.out.printf("Total Warehouse Inventory Value: $%.2f%n", totalVal);
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Inventory Catalog System",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/inventory-management-system-using-java/",
            platform: "GeeksforGeeks",
            topicTag: "Catalog OOP"
          }
        ]
      },
      {
        id: "oops-payroll-calculation",
        slug: "payroll-calculation-oop",
        title: "Exp 4: Payroll Calculation",
        categoryId: "oops-classes-encapsulation",
        categoryName: "1. Classes, Objects & Encapsulation Fundamentals",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Payroll system salary calculation DA HRA PF Java OOP",
        gfgUrl: "https://www.geeksforgeeks.org/payroll-management-system-using-java/",
        quickSummary: "Compute Gross Salary (Basic + DA + HRA), statutory deductions (PF + Tax), and Net Salary using standard I/O.",
        keyPoints: [
          "Dearness Allowance (DA = 40%), House Rent Allowance (HRA = 15%), Provident Fund (PF = 12%).",
          "Gross Salary = Basic + DA + HRA; Total Deductions = PF + Income Tax.",
          "Net Salary = Gross Salary - Total Deductions."
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
          { operation: "Payroll Breakdown", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Payroll Calculator)",
            code: `public class PayrollCalculator {
    private String empName;
    private double basicPay;

    public PayrollCalculator(String empName, double basicPay) {
        this.empName = empName;
        this.basicPay = basicPay;
    }

    public void generatePaySlip() {
        double da = 0.40 * basicPay;
        double hra = 0.15 * basicPay;
        double grossSalary = basicPay + da + hra;
        double pf = 0.12 * basicPay;
        double incomeTax = 0.05 * grossSalary;
        double netSalary = grossSalary - (pf + incomeTax);

        System.out.println("====== VSB PAYSLIP ======");
        System.out.println("Employee: " + empName);
        System.out.printf("Basic Pay: $%.2f | DA: $%.2f | HRA: $%.2f%n", basicPay, da, hra);
        System.out.printf("Gross Salary: $%.2f%n", grossSalary);
        System.out.printf("Deductions (PF + Tax): $%.2f%n", (pf + incomeTax));
        System.out.printf("Net Take-Home Salary: $%.2f%n", netSalary);
    }

    public static void main(String[] args) {
        PayrollCalculator emp = new PayrollCalculator("Dr. K. Sharma", 65000.0);
        emp.generatePaySlip();
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Payroll Management OOP",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/payroll-management-system-using-java/",
            platform: "GeeksforGeeks",
            topicTag: "Payroll"
          }
        ]
      },
      {
        id: "oops-account-validation",
        slug: "account-validation-conditionals",
        title: "Exp 5: Account Validation & Eligibility Engine",
        categoryId: "oops-classes-encapsulation",
        categoryName: "1. Classes, Objects & Encapsulation Fundamentals",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "Account validation minimum balance withdrawal eligibility Java",
        gfgUrl: "https://www.geeksforgeeks.org/java-if-else-statement-with-examples/",
        quickSummary: "Verify minimum balance requirements, overdraft limits, and transaction eligibility via tiered conditionals.",
        keyPoints: [
          "Enforces minimum operational balance (e.g. $1,000 for Savings, $5,000 for Current).",
          "Overdraft protection limits and penalties.",
          "KYC account status validation prior to transaction approval."
        ],
        diagramTitle: "Account Validation Decision Tree",
        diagram: `  [ Withdrawal Request ] ──► (Is KYC Active?)
                                  │
                          YES ────┴──── NO ──► [ Reject: Account Inactive ]
                           │
                 (Balance - Amount >= MinBalance?)
                           │
                  YES ─────┴──── NO ──► [ Reject: Below Min Balance ]
                   │
           [ Approve Transaction ]`,
        complexities: [
          { operation: "Validation Evaluation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Account Validation)",
            code: `public class AccountValidator {
    public static boolean validateTransaction(double balance, double withdrawAmount, double minBalance, boolean isKycVerified) {
        if (!isKycVerified) {
            System.out.println("Validation Error: KYC verification required!");
            return false;
        }
        if (withdrawAmount <= 0) {
            System.out.println("Validation Error: Invalid withdrawal amount!");
            return false;
        }
        if ((balance - withdrawAmount) < minBalance) {
            System.out.printf("Validation Error: Transaction would breach minimum balance of $%.2f%n", minBalance);
            return false;
        }
        System.out.println("Validation Passed: Transaction authorized.");
        return true;
    }

    public static void main(String[] args) {
        validateTransaction(2500.0, 1800.0, 1000.0, true);  // Fails (remaining $700 < $1000)
        validateTransaction(2500.0, 1200.0, 1000.0, true);  // Passes (remaining $1300 >= $1000)
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Conditional Account Validation",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/java-if-else-statement-with-examples/",
            platform: "GeeksforGeeks",
            topicTag: "Conditionals"
          }
        ]
      },
      {
        id: "oops-auth-engine",
        slug: "authentication-engine-otp",
        title: "Exp 6: Authentication Engine & OTP Verification",
        categoryId: "oops-classes-encapsulation",
        categoryName: "1. Classes, Objects & Encapsulation Fundamentals",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "OTP generation verification loops Java SecureRandom",
        gfgUrl: "https://www.geeksforgeeks.org/generate-otp-in-java/",
        quickSummary: "Generate cryptographic 6-digit One-Time Passwords (OTP), enforce time-to-live (TTL), and rate-limit retry attempts.",
        keyPoints: [
          "Uses java.security.SecureRandom for cryptographically strong OTP digits.",
          "Enforces maximum retry limit (3 attempts) before locking account.",
          "Validates expiry timestamp (e.g., 5-minute validity window)."
        ],
        diagramTitle: "OTP Verification & Rate Limiting Flow",
        diagram: `  [ Generate OTP ] ──► SecureRandom ──► Store (OTP, Timestamp, Retries=0)
          │
  [ User Input OTP ] ──► (Is Expired > 5m?) ──► Expired Error
          │ (Valid Time)
    (OTP Matches?)
    ├─ YES ──► [ Login Authorized ]
    └─ NO  ──► Increment Retries -> (Retries >= 3 ? Lockout : Retry)`,
        complexities: [
          { operation: "OTP Generation & Check", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (OTP Auth Engine)",
            code: `import java.security.SecureRandom;

public class AuthEngine {
    private String generatedOtp;
    private long expiryTimestamp;
    private int attemptsLeft = 3;

    public String generateOtp() {
        SecureRandom random = new SecureRandom();
        int otp = 100000 + random.nextInt(900000);
        this.generatedOtp = String.valueOf(otp);
        this.expiryTimestamp = System.currentTimeMillis() + (5 * 60 * 1000); // 5 mins
        this.attemptsLeft = 3;
        System.out.println("[SMS Simulator] OTP sent: " + generatedOtp);
        return generatedOtp;
    }

    public boolean verifyOtp(String inputOtp) {
        if (System.currentTimeMillis() > expiryTimestamp) {
            System.out.println("[-] OTP has expired. Please request a new one.");
            return false;
        }
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
            title: "Cryptographic OTP Generation in Java",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/generate-otp-in-java/",
            platform: "GeeksforGeeks",
            topicTag: "Security"
          }
        ]
      }
    ]
  },
  {
    id: "oops-inheritance-polymorphism",
    name: "2. Inheritance, Polymorphism & Matrix Traversals",
    shortDesc: "Employee hierarchy, Academic models, Overloading/Overriding, and 2D Matrix Spiral/Wave traversals.",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "oops-employee-management",
        slug: "employee-management-inheritance",
        title: "Exp 7: Employee Management (Inheritance & Method Overriding)",
        categoryId: "oops-inheritance-polymorphism",
        categoryName: "2. Inheritance, Polymorphism & Matrix Traversals",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Java inheritance method overriding super constructor employee",
        gfgUrl: "https://www.geeksforgeeks.org/inheritance-in-java/",
        quickSummary: "Build multi-tier Employee inheritance hierarchy (Manager, Developer, Intern) with customized salary overriding.",
        keyPoints: [
          "Superclass constructor invocation via super(id, name, basicPay).",
          "Dynamic Method Dispatch: runtime polymorphic salary calculation.",
          "Abstract Employee base class enforcing calculateBonus() contract."
        ],
        diagramTitle: "Employee Inheritance Class Hierarchy",
        diagram: `                    ┌──────────────────────┐
                    │  abstract Employee   │
                    ├──────────────────────┤
                    │ + calculateSalary()  │
                    └──────────┬───────────┘
           ┌───────────────────┼───────────────────┐
           ▼                   ▼                   ▼
┌────────────────────┐┌─────────────────┐┌───────────────────┐
│      Manager       ││    Developer    ││      Intern       │
│ + bonus = basic*0.3││ + bonus = 0.15  ││ + stipend = fixed │
└────────────────────┘└─────────────────┘└───────────────────┘`,
        complexities: [
          { operation: "Polymorphic Dispatch", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Inheritance & Overriding)",
            code: `abstract class Employee {
    protected int id;
    protected String name;
    protected double basicPay;

    public Employee(int id, String name, double basicPay) {
        this.id = id;
        this.name = name;
        this.basicPay = basicPay;
    }

    public abstract double calculateSalary();
}

class Manager extends Employee {
    private double performanceBonus;

    public Manager(int id, String name, double basicPay, double performanceBonus) {
        super(id, name, basicPay);
        this.performanceBonus = performanceBonus;
    }

    @Override
    public double calculateSalary() {
        return basicPay + performanceBonus;
    }
}

class Developer extends Employee {
    private int completedModules;

    public Developer(int id, String name, double basicPay, int completedModules) {
        super(id, name, basicPay);
        this.completedModules = completedModules;
    }

    @Override
    public double calculateSalary() {
        return basicPay + (completedModules * 250.0);
    }
}

public class EmployeeManagement {
    public static void main(String[] args) {
        Employee[] staff = {
            new Manager(101, "Sarah Connor", 8000.0, 2500.0),
            new Developer(102, "John Doe", 6000.0, 6)
        };
        for (Employee e : staff) {
            System.out.printf("Employee: %s | Final Salary: $%.2f%n", e.name, e.calculateSalary());
        }
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Inheritance and Dynamic Method Dispatch",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/dynamic-method-dispatch-runtime-polymorphism-java/",
            platform: "GeeksforGeeks",
            topicTag: "Inheritance"
          }
        ]
      },
      {
        id: "oops-academic-hierarchy",
        slug: "academic-hierarchy-oop",
        title: "Exp 8: Academic Hierarchy (Student, Faculty, Course Models)",
        categoryId: "oops-inheritance-polymorphism",
        categoryName: "2. Inheritance, Polymorphism & Matrix Traversals",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Academic hierarchy Person Student Faculty Course Java OOP",
        gfgUrl: "https://www.geeksforgeeks.org/aggregation-in-java/",
        quickSummary: "Model University domain using inheritance (Person -> Student, Faculty) and aggregation (Course -> Faculty, Students).",
        keyPoints: [
          "IS-A Relationship: Student is a Person; Faculty is a Person.",
          "HAS-A Aggregation: Course has an instructor and enrolled student list.",
          "Polymorphic displayDetails() across all university constituents."
        ],
        diagramTitle: "University Academic Aggregation Model",
        diagram: `          ┌───────────────────┐
          │      Person       │
          └─────────┬─────────┘
        ┌───────────┴───────────┐
        ▼                       ▼
  ┌───────────┐           ┌───────────┐
  │  Student  │           │  Faculty  │
  └─────▲─────┘           └─────▲─────┘
        │ *                   1 │
        └─────────┐   ┌─────────┘
                  ▼   ▼
               ┌─────────┐
               │ Course  │
               └─────────┘`,
        complexities: [
          { operation: "Course Roster Display", best: "O(students)", avg: "O(students)", worst: "O(students)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Academic Aggregation)",
            code: `import java.util.ArrayList;
import java.util.List;

class Person {
    protected String name;
    protected String email;
    public Person(String name, String email) { this.name = name; this.email = email; }
}

class StudentPerson extends Person {
    private String rollNo;
    public StudentPerson(String name, String email, String rollNo) {
        super(name, email);
        this.rollNo = rollNo;
    }
    public String getRollNo() { return rollNo; }
}

class Course {
    private String courseCode;
    private String courseName;
    private List<StudentPerson> roster = new ArrayList<>();

    public Course(String code, String name) {
        this.courseCode = code;
        this.courseName = name;
    }

    public void enroll(StudentPerson s) { roster.add(s); }

    public void printRoster() {
        System.out.printf("=== Course: %s (%s) ===%n", courseName, courseCode);
        for (StudentPerson s : roster) {
            System.out.printf("  - %s (%s, %s)%n", s.name, s.getRollNo(), s.email);
        }
    }
}

public class AcademicMain {
    public static void main(String[] args) {
        Course dsa = new Course("AD8381", "Data Structures Lab");
        dsa.enroll(new StudentPerson("Alice", "alice@vsb.ac.in", "22AD01"));
        dsa.enroll(new StudentPerson("Bob", "bob@vsb.ac.in", "22AD02"));
        dsa.printRoster();
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Class Aggregation & Composition",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/aggregation-in-java/",
            platform: "GeeksforGeeks",
            topicTag: "Aggregation"
          }
        ]
      },
      {
        id: "oops-recursion-polymorphism",
        slug: "recursion-and-polymorphism",
        title: "Exp 9: Recursion & Polymorphism (Method Overloading / Overriding)",
        categoryId: "oops-inheritance-polymorphism",
        categoryName: "2. Inheritance, Polymorphism & Matrix Traversals",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Recursion method overloading overriding Factorial Fibonacci Java",
        gfgUrl: "https://www.geeksforgeeks.org/recursion-in-java/",
        quickSummary: "Combine compile-time polymorphism (overloading) with recursive algorithms (Factorial, Fibonacci, Tower of Hanoi).",
        keyPoints: [
          "Compile-Time Polymorphism: methods with same name but distinct signatures/types.",
          "Recursive base condition prevents Infinite Recursion / StackOverflowError.",
          "Call stack frame lifecycle inspection."
        ],
        diagramTitle: "Fibonacci Recursive Call Stack Tree",
        diagram: `                      fib(4)
                  ┌──────┴──────┐
                fib(3)        fib(2)
              ┌───┴───┐       ┌───┴───┐
            fib(2)  fib(1)  fib(1)  fib(0)
            ┌─┴─┐
          fib(1) fib(0)`,
        complexities: [
          { operation: "Fibonacci (Naive Recursive)", best: "O(1)", avg: "O(2^n)", worst: "O(2^n)", space: "O(n) Call Stack" },
          { operation: "Factorial Recursive", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Recursion & Overloading)",
            code: `public class MathEngine {
    // Overloaded Method 1: Factorial of Integer
    public long compute(int n) {
        if (n <= 1) return 1;
        return n * compute(n - 1);
    }

    // Overloaded Method 2: Fibonacci of Integer with Memoization
    public long compute(int n, long[] memo) {
        if (n <= 0) return 0;
        if (n == 1) return 1;
        if (memo[n] != 0) return memo[n];
        memo[n] = compute(n - 1, memo) + compute(n - 2, memo);
        return memo[n];
    }

    public static void main(String[] args) {
        MathEngine engine = new MathEngine();
        System.out.println("Factorial(6): " + engine.compute(6));
        System.out.println("Fibonacci(10): " + engine.compute(10, new long[11]));
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Fibonacci Number with Recursion",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/fibonacci-number/",
            platform: "LeetCode",
            topicTag: "Recursion"
          }
        ]
      },
      {
        id: "oops-matrix-manipulation",
        slug: "matrix-manipulation-oop",
        title: "Exp 10: Matrix Manipulation (Addition, Transpose & Multiplication)",
        categoryId: "oops-inheritance-polymorphism",
        categoryName: "2. Inheritance, Polymorphism & Matrix Traversals",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Matrix multiplication addition transpose 2D arrays Java",
        gfgUrl: "https://www.geeksforgeeks.org/java-program-to-multiply-two-matrices-of-any-size/",
        quickSummary: "Encapsulate 2D matrices into an object-oriented Matrix ADT with matrix addition, transpose, and multiplication.",
        keyPoints: [
          "Matrix multiplication requires columns of A == rows of B (dim: m x k * k x n = m x n).",
          "Transpose swaps elements along main diagonal: T[j][i] = A[i][j].",
          "Encapsulated matrix bounds checking and dimensional validation."
        ],
        diagramTitle: "2D Matrix Multiplication Inner Product",
        diagram: `  Matrix A (2 x 3)            Matrix B (3 x 2)            Product C (2 x 2)
  ┌───┬───┬───┐               ┌───┬───┐                   ┌───────┬───────┐
  │ 1 │ 2 │ 3 │ ──Dot Product─►│ 7 │ 8 │                   │ C[0,0]│ C[0,1]│
  ├───┼───┼───┤               ├───┼───┤                   ├───────┼───────┤
  │ 4 │ 5 │ 6 │               │ 9 │ 1 │                   │ C[1,0]│ C[1,1]│
  └───┴───┴───┘               ├───┼───┤                   └───────┴───────┘
                              │ 2 │ 4 │
                              └───┴───┘`,
        complexities: [
          { operation: "Matrix Addition", best: "O(r * c)", avg: "O(r * c)", worst: "O(r * c)", space: "O(r * c)" },
          { operation: "Matrix Multiplication", best: "O(r1 * c1 * c2)", avg: "O(r1 * c1 * c2)", worst: "O(n^3)", space: "O(r1 * c2)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Matrix ADT)",
            code: `public class Matrix {
    private int rows, cols;
    private int[][] data;

    public Matrix(int r, int c) {
        this.rows = r; this.cols = c;
        this.data = new int[r][c];
    }

    public static Matrix multiply(Matrix A, Matrix B) {
        if (A.cols != B.rows) throw new IllegalArgumentException("Dimension Mismatch!");
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

    public void print() {
        for (int[] row : data) {
            for (int val : row) System.out.printf("%4d", val);
            System.out.println();
        }
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Matrix Multiplication & Transposition",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/java-program-to-multiply-two-matrices-of-any-size/",
            platform: "GeeksforGeeks",
            topicTag: "2D Arrays"
          }
        ]
      },
      {
        id: "oops-2d-spiral-wave",
        slug: "2d-matrix-traversals-spiral-wave",
        title: "Exp 11: 2D Matrix Traversals (Spiral Order & Wave Order)",
        categoryId: "oops-inheritance-polymorphism",
        categoryName: "2. Inheritance, Polymorphism & Matrix Traversals",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Spiral matrix traversal wave traversal 2D array Java",
        gfgUrl: "https://www.geeksforgeeks.org/print-a-given-matrix-in-spiral-form/",
        quickSummary: "Traverse 2D matrices using bounded boundary pointers (Spiral order) and alternating column directions (Wave order).",
        keyPoints: [
          "Spiral traversal shrinks four boundaries: top, bottom, left, right.",
          "Wave traversal alternates top-to-bottom and bottom-to-top across odd/even column indices.",
          "Zero extra space complexity oltre the output traversal list."
        ],
        diagramTitle: "2D Matrix Spiral & Wave Traversal Directions",
        diagram: `  Spiral Order (Inward Clockwise):           Wave Order (Alternating Cols):
  ┌────►────►────┐                            │  ▲  │  ▲
  │ 1    2    3  │                            ▼  │  ▼  │
  ▲   ┌──►─┐  │                            │  │  │  │
  │ 8 │ 9  4 │ │                            │  │  │  │
  │   └──◄─┘  ▼                            ▼  │  ▼  │
  │ 7    6    5  │                           Col 0: Top->Down, Col 1: Down->Top
  └────◄────◄────┘`,
        complexities: [
          { operation: "Spiral / Wave Traversal", best: "O(r * c)", avg: "O(r * c)", worst: "O(r * c)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Spiral Traversal)",
            code: `import java.util.ArrayList;
import java.util.List;

public class MatrixTraversals {
    public static List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix.length == 0) return result;

        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;

        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++) result.add(matrix[top][j]);
            top++;
            for (int i = top; i <= bottom; i++) result.add(matrix[i][right]);
            right--;
            if (top <= bottom) {
                for (int j = right; j >= left; j--) result.add(matrix[bottom][j]);
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) result.add(matrix[i][left]);
                left++;
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[][] mat = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12}
        };
        System.out.println("Spiral Order Traversal: " + spiralOrder(mat));
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Spiral Matrix",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/spiral-matrix/",
            platform: "LeetCode",
            topicTag: "Matrix"
          }
        ]
      }
    ]
  },
  {
    id: "oops-algorithms-collections-jdbc",
    name: "3. Algorithms, Exceptions, Collections & JDBC",
    shortDesc: "Kadane's Algorithm, Custom Exceptions, Java Collections/Streams, and JDBC database CRUD.",
    iconName: "Database",
    topics: [
      {
        id: "oops-strings-arrays-kadane",
        slug: "algorithms-strings-arrays-kadane",
        title: "Exp 12: Algorithms on Strings & Arrays (Anagrams, Pattern Matching & Kadane's)",
        categoryId: "oops-algorithms-collections-jdbc",
        categoryName: "3. Algorithms, Exceptions, Collections & JDBC",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Kadanes algorithm maximum subarray sum valid anagram Java",
        gfgUrl: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/",
        quickSummary: "Solve string anagram checking (frequency bucket array) and find maximum contiguous subarray sum in O(n) via Kadane's Algorithm.",
        keyPoints: [
          "Kadane's Algorithm maintains current_max = max(arr[i], current_max + arr[i]).",
          "Anagram validation checks character frequency histogram equality in O(n) time.",
          "Substring pattern matching using sliding window techniques."
        ],
        diagramTitle: "Kadane's Dynamic Programming Subarray Maximum",
        diagram: `  Array: [-2,  1, -3,  4, -1,  2,  1, -5,  4]
  Curr:   -2   1  -2   4   3   5   6   1   5
  Max:    -2   1   1   4   4   5   6   6   6 -> Max Subarray: [4, -1, 2, 1] Sum = 6`,
        complexities: [
          { operation: "Kadane's Subarray Sum", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Anagram Verification", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1) 26-char" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Kadane & Anagram)",
            code: `public class ArrayStringAlgorithms {
    // Kadane's Algorithm
    public static int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currentMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentMax);
        }
        return maxSoFar;
    }

    // Valid Anagram Check
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
        System.out.println("Max Subarray Sum (Kadane): " + maxSubArray(arr));
        System.out.println("Is 'listen' & 'silent' Anagram: " + isAnagram("listen", "silent"));
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Maximum Subarray (Kadane's Algorithm)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/maximum-subarray/",
            platform: "LeetCode",
            topicTag: "Kadane"
          }
        ]
      },
      {
        id: "oops-exception-io",
        slug: "exception-handling-file-io",
        title: "Exp 13: Exception Handling & File I/O",
        categoryId: "oops-algorithms-collections-jdbc",
        categoryName: "3. Algorithms, Exceptions, Collections & JDBC",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Custom exceptions try catch finally FileReader FileWriter Java",
        gfgUrl: "https://www.geeksforgeeks.org/exceptions-in-java/",
        quickSummary: "Create custom user-defined Exception subclasses, handle try-catch-finally blocks, and execute BufferedReader file I/O.",
        keyPoints: [
          "Custom Exception subclasses extend Exception (Checked) or RuntimeException (Unchecked).",
          "Try-with-resources automatically closes AutoCloseable stream descriptors.",
          "Finally block always executes ensuring zero resource leakage."
        ],
        diagramTitle: "Java Exception Hierarchy & Try-With-Resources",
        diagram: `                   Throwable
                 ┌─────┴─────┐
               Error       Exception
                             ┌───┴───┐
                      Checked Ex    RuntimeException (Unchecked)
                      (IOException) (NullPointer, InsufficientFunds)`,
        complexities: [
          { operation: "File Read / Write", best: "O(bytes)", avg: "O(bytes)", worst: "O(bytes)", space: "O(buffer)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Custom Exception & File I/O)",
            code: `import java.io.*;

// Custom User-Defined Exception
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) { super(message); }
}

public class ExceptionIODemo {
    public static void writeAuditLog(String filename, String logEntry) {
        // Try-with-resources auto closes FileWriter
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename, true))) {
            writer.write(logEntry);
            writer.newLine();
            System.out.println("[✓] Log persisted to file: " + filename);
        } catch (IOException e) {
            System.err.println("File I/O Error: " + e.getMessage());
        }
    }

    public static void validateWithdrawal(double balance, double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Attempted to withdraw $" + amount + " with balance $" + balance);
        }
    }

    public static void main(String[] args) {
        try {
            validateWithdrawal(500.0, 1200.0);
        } catch (InsufficientFundsException e) {
            System.out.println("[CAUGHT CUSTOM EXCEPTION] " + e.getMessage());
            writeAuditLog("audit_exceptions.log", "ERROR: " + e.getMessage());
        }
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Custom Exception Handling in Java",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/user-defined-custom-exception-in-java/",
            platform: "GeeksforGeeks",
            topicTag: "Exceptions"
          }
        ]
      },
      {
        id: "oops-collections-stream-api",
        slug: "java-collections-framework-stream-api",
        title: "Exp 14: Java Collections Framework & Stream API",
        categoryId: "oops-algorithms-collections-jdbc",
        categoryName: "3. Algorithms, Exceptions, Collections & JDBC",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Java Collections ArrayList HashMap Stream API lambda filter map collect",
        gfgUrl: "https://www.geeksforgeeks.org/collections-in-java-2/",
        quickSummary: "Process large data structures using ArrayList, HashSet, HashMap, Lambda Expressions, and functional Stream pipelines.",
        keyPoints: [
          "HashMap provides average O(1) key-value lookup using hash bucket chains / red-black trees.",
          "Stream API pipeline: Source -> Intermediate Filters/Maps -> Terminal Reducers/Collectors.",
          "Lambda expressions enable concise functional data transformations."
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
          { operation: "HashMap Lookup", best: "O(1)", avg: "O(1)", worst: "O(n) Collision", space: "O(1)" },
          { operation: "Stream Filter & Map", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
        ],
        codeSnippets: [
          {
            language: "java",
            label: "Java (Collections & Streams)",
            code: `import java.util.*;
import java.util.stream.Collectors;

class StudentRecord {
    String name; String dept; double gpa;
    public StudentRecord(String n, String d, double g) { this.name = n; this.dept = d; this.gpa = g; }
    public double getGpa() { return gpa; }
    public String getDept() { return dept; }
}

public class CollectionsStreamDemo {
    public static void main(String[] args) {
        List<StudentRecord> students = Arrays.asList(
            new StudentRecord("Alice", "AIDS", 3.9),
            new StudentRecord("Bob", "CSE", 3.2),
            new StudentRecord("Charlie", "AIDS", 3.8),
            new StudentRecord("Diana", "ECE", 3.7)
        );

        // Functional Stream Pipeline
        List<String> honorsAids = students.stream()
            .filter(s -> s.getDept().equals("AIDS") && s.getGpa() >= 3.5)
            .map(s -> s.name.toUpperCase())
            .collect(Collectors.toList());

        System.out.println("AIDS Honors List: " + honorsAids);

        // Grouping By Department
        Map<String, Long> deptCount = students.stream()
            .collect(Collectors.groupingBy(StudentRecord::getDept, Collectors.counting()));
        System.out.println("Department Headcount: " + deptCount);
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "Stream API & Lambda Transformations",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/stream-in-java/",
            platform: "GeeksforGeeks",
            topicTag: "Streams"
          }
        ]
      },
      {
        id: "oops-jdbc-crud",
        slug: "database-connectivity-jdbc-crud",
        title: "Exp 15: Database Connectivity (Complete JDBC CRUD Application)",
        categoryId: "oops-algorithms-collections-jdbc",
        categoryName: "3. Algorithms, Exceptions, Collections & JDBC",
        difficulty: "Advanced",
        estimatedTime: "35 mins",
        gfgSearchQuery: "Java JDBC CRUD application PreparedStatement DriverManager MySQL",
        gfgUrl: "https://www.geeksforgeeks.org/introduction-to-jdbc/",
        quickSummary: "Build complete relational database CRUD persistence layer using JDBC DriverManager, PreparedStatement, and ResultSet.",
        keyPoints: [
          "PreparedStatement pre-compiles SQL queries and prevents SQL Injection vulnerabilities.",
          "Connection lifecycle: DriverManager.getConnection() -> executeUpdate() / executeQuery().",
          "ResultSet cursor iteration: rs.next(), rs.getInt(), rs.getString()."
        ],
        diagramTitle: "JDBC Architecture & Database Connection Lifecycle",
        diagram: `┌────────────────────────────────────────────────────────┐
│ Java Application (Business Logic & Entities)           │
├────────────────────────────────────────────────────────┤
│ JDBC Driver Manager (com.mysql.cj.jdbc.Driver)         │
├────────────────────────────────────────────────────────┤
│ PreparedStatement ("INSERT INTO Students VALUES(?, ?)")│
├────────────────────────────────────────────────────────┤
│ TCP Socket ──► MySQL / PostgreSQL Relational Database  │
└────────────────────────────────────────────────────────┘`,
        complexities: [
          { operation: "JDBC Query Execution", best: "O(1)", avg: "O(network + index_seek)", worst: "O(table_scan)", space: "O(result_set)" }
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

    // 2. Read (Query Records)
    public static void listAllStudents() {
        String sql = "SELECT id, name, gpa FROM students WHERE gpa >= ?";
        try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setDouble(1, 3.5);
            ResultSet rs = pstmt.executeQuery();
            System.out.println("--- High GPA Students ---");
            while (rs.next()) {
                System.out.printf("ID: %d | Name: %s | GPA: %.2f%n",
                        rs.getInt("id"), rs.getString("name"), rs.getDouble("gpa"));
            }
        } catch (SQLException e) {
            System.err.println("Query Error: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        System.out.println("JDBC DAO ready for MySQL database transactions.");
    }
}`
          }
        ],
        practiceProblems: [
          {
            title: "JDBC CRUD Database Application",
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
