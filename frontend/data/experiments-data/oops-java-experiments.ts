import { Experiment } from "../experiments";

export const OOPS_JAVA_EXPERIMENTS: Experiment[] = [
  {
    id: "java-exp-1",
    labId: "oops-java",
    title: "Exp 1: Student Grade Calculator: Read marks for multiple subjects, compute total, average, and assign grades based on criteria.",
    slug: "student-grade-calculator-java",
    difficulty: "Beginner",
    category: "Java OOP" as any,
    estimatedMinutes: 20,
    rating: 4.90,
    ratingsCount: 110,
    simulator: "custom",
    quizId: "quiz-java-1",
    sections: {
      introduction: "Java Scanner console I/O, arrays, conditional statements, and arithmetic operators for student academic performance calculation.",
      objective: "Read subject marks into an array, compute aggregate total, percentage average, and assign letter grades (O, A+, A, B, RA).",
      videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      videoTitle: "Java Programming for Beginners",
      videoChannel: "Programming with Mosh",
      prerequisites: ["Java Basics", "Array Syntax"],
      theory: {
        overview: "The program reads marks across N academic subjects, validates that each mark is within [0, 100], computes sum and average = total / N, and assigns grades using an if-else ladder.",
        keyConcepts: [
          { title: "Scanner Input Validation", desc: "Verifies marks between 0 and 100 before computing aggregates." },
          { title: "Grading Scale Criteria", desc: ">=90: O, >=80: A+, >=70: A, >=60: B+, >=50: B, <50: RA." },
          { title: "Floating Point Formatting", desc: "String.format(\"%.2f\", avg) provides clean 2-decimal point precision." }
        ],
        complexities: [
          { operation: "Grade Calculation", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" }
        ],
        realWorldApplications: [
          "University academic grading portal engines",
          "Automated GPA calculation systems",
          "Online evaluation and scorecard reporting platforms"
        ]
      },
      procedure: [
        "1. Instantiate java.util.Scanner.",
        "2. Read number of subjects N.",
        "3. Loop to input marks into int[] marks array.",
        "4. Calculate total sum and average.",
        "5. Evaluate grade letter and print formatted student scorecard."
      ],
      sampleCode: {
        language: "java",
        code: `public class StudentGradeCalculator {
    public static void main(String[] args) {
        int[] marks = {92, 88, 95, 84, 90};
        int total = 0;
        for (int m : marks) total += m;
        double avg = (double) total / marks.length;

        String grade;
        if (avg >= 90) grade = "O (Outstanding)";
        else if (avg >= 80) grade = "A+ (Excellent)";
        else if (avg >= 70) grade = "A (Very Good)";
        else if (avg >= 60) grade = "B+ (Good)";
        else if (avg >= 50) grade = "B (Above Average)";
        else grade = "RA (Re-Appear)";

        System.out.println("=== Student Performance Report ===");
        System.out.println("Total Marks: " + total + " / 500");
        System.out.println("Average Percentage: " + String.format("%.2f", avg) + "%");
        System.out.println("Assigned Grade: " + grade);
    }
}`
      },
      expectedOutput: `=== Student Performance Report ===
Total Marks: 449 / 500
Average Percentage: 89.80%
Assigned Grade: A+ (Excellent)`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA", "M.Tech Data Science"]
      }
    }
  },
  {
    id: "java-exp-2",
    labId: "oops-java",
    title: "Exp 2: Banking Application: Implement a simple banking system with deposit, withdraw, and balance check operations using a menu-driven program.",
    slug: "banking-application-menu-driven",
    difficulty: "Beginner",
    category: "Java OOP" as any,
    estimatedMinutes: 25,
    rating: 4.92,
    ratingsCount: 120,
    simulator: "custom",
    quizId: "quiz-java-2",
    sections: {
      introduction: "Encapsulation bundles account data (accountNumber, balance) with authorized operational methods (deposit, withdraw, getBalance).",
      objective: "Create a BankAccount class protecting balance from direct modification, enforcing business rules on deposit/withdrawal, and providing a switch-case CLI interface.",
      videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      videoTitle: "Java Encapsulation & Classes",
      videoChannel: "Programming with Mosh",
      prerequisites: ["Java Methods", "Switch-Case Statements"],
      theory: {
        overview: "Private fields prevent illegal balance manipulation from external classes. Public getter and setter methods enforce validation (e.g. amount > 0, amount <= balance).",
        keyConcepts: [
          { title: "Private Access Modifier", desc: "Restricts variable access strictly to methods within the BankAccount class." },
          { title: "Transaction Validation", desc: "Rejects negative deposits and overdraft withdrawals." },
          { title: "State Invariant", desc: "Guarantees account balance never becomes negative." }
        ],
        complexities: [
          { operation: "Deposit / Withdraw", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Core banking ledger transaction processing",
          "Automated Teller Machine (ATM) software terminals",
          "Digital mobile wallet balance tracking"
        ]
      },
      procedure: [
        "1. Create class BankAccount with private fields accNo, holderName, balance.",
        "2. Implement constructor initializing account details.",
        "3. Implement deposit(amount) and withdraw(amount) with validation.",
        "4. Create main method executing banking operations and printing balances."
      ],
      sampleCode: {
        language: "java",
        code: `public class BankAccount {
    private String accNo;
    private String holderName;
    private double balance;

    public BankAccount(String accNo, String holderName, double initBal) {
        this.accNo = accNo;
        this.holderName = holderName;
        this.balance = Math.max(0, initBal);
    }

    public void deposit(double amount) {
        if (amount <= 0) { System.out.println("[-] Invalid deposit amount!"); return; }
        balance += amount;
        System.out.println("[+] Deposited: $" + amount + " | New Balance: $" + balance);
    }

    public void withdraw(double amount) {
        if (amount > balance) { System.out.println("[-] Insufficient balance!"); return; }
        balance -= amount;
        System.out.println("[+] Withdrawn: $" + amount + " | Remaining Balance: $" + balance);
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("VSB-10024", "Alice Smith", 500.0);
        acc.deposit(250.0);
        acc.withdraw(100.0);
        acc.withdraw(800.0); // Overdraft test
    }
}`
      },
      expectedOutput: `[+] Deposited: $250.0 | New Balance: $750.0
[+] Withdrawn: $100.0 | Remaining Balance: $650.0
[-] Insufficient balance!`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "java-exp-3",
    labId: "oops-java",
    title: "Exp 3: Product Catalog System: Create a class Product with fields for ID, name, and price. Provide methods to display details and calculate discounted prices.",
    slug: "product-catalog-system",
    difficulty: "Beginner",
    category: "Java OOP" as any,
    estimatedMinutes: 20,
    rating: 4.88,
    ratingsCount: 105,
    simulator: "custom",
    quizId: "quiz-java-3",
    sections: {
      introduction: "Object modeling and methods in Java represent real-world commercial retail items with dynamic pricing algorithms.",
      objective: "Build a Product class supporting percentage discount calculation and formatted catalog display.",
      videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      videoTitle: "Java OOP Class Design",
      videoChannel: "Telusko",
      prerequisites: ["Constructor Overloading", "Methods"],
      theory: {
        overview: "A Product object encapsulates productId, productName, and basePrice. Method getDiscountedPrice(double discountPct) returns price * (1 - discountPct / 100.0).",
        keyConcepts: [
          { title: "Object Instantiation", desc: "Allocates heap memory for product instances using the new operator." },
          { title: "Method Parameters", desc: "Passes discount percentage and computes final discounted price." }
        ],
        complexities: [
          { operation: "Discount Computation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "E-commerce product inventory catalogs (Amazon, Flipkart)",
          "Point of Sale (POS) retail billing scanners",
          "Automated promotional discount engines"
        ]
      },
      procedure: [
        "1. Define class Product with private id, name, price.",
        "2. Add constructor and displayDetails() method.",
        "3. Add getDiscountedPrice(percentage) method.",
        "4. Instantiate multiple products and print discounted prices."
      ],
      sampleCode: {
        language: "java",
        code: `public class Product {
    private int id;
    private String name;
    private double price;

    public Product(int id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public double getDiscountedPrice(double discountPct) {
        return price * (1.0 - (discountPct / 100.0));
    }

    public void displayDetails(double discountPct) {
        System.out.printf("[%d] %-20s Base: $%.2f | With %.0f%% Off: $%.2f%n",
            id, name, price, discountPct, getDiscountedPrice(discountPct));
    }

    public static void main(String[] args) {
        Product p1 = new Product(101, "Mechanical Keyboard", 120.0);
        Product p2 = new Product(102, "Ultra-Wide Monitor", 450.0);
        p1.displayDetails(15);
        p2.displayDetails(20);
    }
}`
      },
      expectedOutput: `[101] Mechanical Keyboard  Base: $120.00 | With 15% Off: $102.00
[102] Ultra-Wide Monitor   Base: $450.00 | With 20% Off: $360.00`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "java-exp-4",
    labId: "oops-java",
    title: "Exp 4: Payroll Calculation: Define an Employee class with methods to calculate gross salary, deductions, and net salary.",
    slug: "payroll-calculation-employee",
    difficulty: "Beginner",
    category: "Java OOP" as any,
    estimatedMinutes: 25,
    rating: 4.91,
    ratingsCount: 115,
    simulator: "custom",
    quizId: "quiz-java-4",
    sections: {
      introduction: "Payroll calculations model organizational compensation structures including Dearness Allowance (DA), House Rent Allowance (HRA), Provident Fund (PF), and Professional Tax.",
      objective: "Design Employee class calculating Gross Salary (Basic + DA + HRA), Deductions (PF + Tax), and Net Salary (Gross - Deductions).",
      videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      videoTitle: "Java Methods & Payroll Systems",
      videoChannel: "Telusko",
      prerequisites: ["Java Classes", "Basic Arithmetic"],
      theory: {
        overview: "Standard compensation formulas: DA = 40% of Basic, HRA = 15% of Basic. Gross = Basic + DA + HRA. PF = 12% of Basic, Income Tax = 5% of Gross. Net Salary = Gross - Deductions.",
        keyConcepts: [
          { title: "Gross Salary", desc: "Total compensation before statutory and voluntary deductions." },
          { title: "Deductions", desc: "Provident Fund retirement contributions and applicable taxes." },
          { title: "Net Salary / Take-Home Pay", desc: "Actual liquid compensation disbursed to employee bank account." }
        ],
        complexities: [
          { operation: "Payroll Calculation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Corporate Human Resources payroll processing systems (Workday, SAP)",
          "Automated direct-deposit banking salary disbursement engines",
          "Tax deduction at source (TDS) compliance systems"
        ]
      },
      procedure: [
        "1. Define Employee class with empId, name, basicSalary.",
        "2. Implement calculateGross() and calculateDeductions().",
        "3. Implement calculateNetSalary().",
        "4. Print complete monthly payslip."
      ],
      sampleCode: {
        language: "java",
        code: `public class EmployeePayroll {
    private int empId;
    private String name;
    private double basicSalary;

    public EmployeePayroll(int id, String name, double basic) {
        this.empId = id;
        this.name = name;
        this.basicSalary = basic;
    }

    public void generatePayslip() {
        double da = 0.40 * basicSalary;
        double hra = 0.15 * basicSalary;
        double gross = basicSalary + da + hra;
        double pf = 0.12 * basicSalary;
        double tax = 0.05 * gross;
        double deductions = pf + tax;
        double net = gross - deductions;

        System.out.println("=== Monthly Payslip: " + name + " (" + empId + ") ===");
        System.out.println("Basic Pay:       $" + basicSalary);
        System.out.println("Gross Salary:    $" + gross + " (DA: $" + da + ", HRA: $" + hra + ")");
        System.out.println("Total Deduction: $" + deductions + " (PF: $" + pf + ", Tax: $" + tax + ")");
        System.out.println("Net Take-Home:   $" + net);
    }

    public static void main(String[] args) {
        EmployeePayroll emp = new EmployeePayroll(501, "Robert Chen", 50000.0);
        emp.generatePayslip();
    }
}`
      },
      expectedOutput: `=== Monthly Payslip: Robert Chen (501) ===
Basic Pay:       $50000.0
Gross Salary:    $77500.0 (DA: $20000.0, HRA: $7500.0)
Total Deduction: $9875.0 (PF: $6000.0, Tax: $3875.0)
Net Take-Home:   $67625.0`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "java-exp-5",
    labId: "oops-java",
    title: "Exp 5: Account Validation: Simulate an account validation system using conditions to check if a user is eligible to apply for a credit card.",
    slug: "account-validation-credit-card-eligibility",
    difficulty: "Beginner",
    category: "Java OOP" as any,
    estimatedMinutes: 20,
    rating: 4.89,
    ratingsCount: 110,
    simulator: "custom",
    quizId: "quiz-java-5",
    sections: {
      introduction: "Conditional underwriting engines validate customer risk profiles against age, annual income, credit bureau score, and existing debt obligations.",
      objective: "Implement a CreditCardUnderwriter class evaluating applicant parameters against eligibility thresholds.",
      videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      videoTitle: "Java Conditional Validation Logic",
      videoChannel: "Programming with Mosh",
      prerequisites: ["Boolean Logic", "Logical Operators && / ||"],
      theory: {
        overview: "Criteria for credit card approval: Age >= 21, Annual Income >= $30,000, and CIBIL / FICO credit score >= 700 with no active defaults.",
        keyConcepts: [
          { title: "Short-Circuit Logical Operators", desc: "&& and || evaluate operands lazily from left to right." },
          { title: "Multi-Criteria Risk Scoring", desc: "Ensures financial suitability and regulatory compliance." }
        ],
        complexities: [
          { operation: "Risk Validation", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Fintech automated instant loan origination engines",
          "Credit bureau API applicant screening gateways",
          "Mortgage and loan pre-qualification portals"
        ]
      },
      procedure: [
        "1. Define Applicant data class with age, income, creditScore, hasDefault.",
        "2. Implement isEligibleForCreditCard() method.",
        "3. Return approval status with specific reason on rejection.",
        "4. Test with multiple applicant profiles."
      ],
      sampleCode: {
        language: "java",
        code: `public class AccountValidation {
    public static boolean checkEligibility(int age, double annualIncome, int creditScore, boolean hasDefault) {
        if (age < 21) {
            System.out.println("[-] Rejected: Minimum age requirement is 21.");
            return false;
        }
        if (annualIncome < 30000) {
            System.out.println("[-] Rejected: Minimum annual income threshold is $30,000.");
            return false;
        }
        if (creditScore < 700 || hasDefault) {
            System.out.println("[-] Rejected: Credit score below 700 or prior default detected.");
            return false;
        }
        System.out.println("[✓] APPROVED: Applicant is eligible for Premium Credit Card!");
        return true;
    }

    public static void main(String[] args) {
        checkEligibility(25, 65000, 750, false);
        checkEligibility(19, 45000, 720, false);
    }
}`
      },
      expectedOutput: `[✓] APPROVED: Applicant is eligible for Premium Credit Card!
[-] Rejected: Minimum age requirement is 21.`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "java-exp-6",
    labId: "oops-java",
    title: "Exp 6: Authentication Engine: Simulate user login authentication with a limited number of OTP attempts.",
    slug: "authentication-engine-otp-verification",
    difficulty: "Intermediate",
    category: "Java OOP" as any,
    estimatedMinutes: 25,
    rating: 4.93,
    ratingsCount: 125,
    simulator: "custom",
    quizId: "quiz-java-6",
    sections: {
      introduction: "Two-Factor Authentication (2FA) generates dynamic pseudo-random One-Time Passwords (OTP) and locks accounts upon exceeding maximum failed verification attempts.",
      objective: "Implement an AuthenticationEngine class generating 6-digit random OTPs and enforcing maximum 3 verification attempts before locking the account.",
      videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      videoTitle: "Java Security & OTP Logic",
      videoChannel: "Telusko",
      prerequisites: ["java.util.Random", "While Loops"],
      theory: {
        overview: "Secure OTP generator creates integers in [100000, 999999]. A stateful verification loop decrements remaining attempts on mismatch and sets isLocked = true when attempts reach zero to prevent brute-force attacks.",
        keyConcepts: [
          { title: "Pseudo-Random Number Generation", desc: "Random.nextInt(900000) + 100000 generates non-zero-padded 6-digit integers." },
          { title: "Brute-Force Rate Limiting", desc: "Locks account state after 3 consecutive invalid attempts." },
          { title: "Authentication State Transitions", desc: "Unauthenticated -> OTP Sent -> Verified / Account Locked." }
        ],
        complexities: [
          { operation: "OTP Verification", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Banking 2FA SMS / Email authorization for wire transfers",
          "Single Sign-On (SSO) passwordless login portals",
          "Account password reset validation workflows"
        ]
      },
      procedure: [
        "1. Create class AuthEngine with secretOtp, attemptsRemaining = 3, isLocked = false.",
        "2. Implement generateOtp() creating 6-digit random code.",
        "3. Implement verifyOtp(inputOtp).",
        "4. Decrement attempts and lock if attempts reach 0.",
        "5. Demonstrate successful login and brute-force lockout scenario."
      ],
      sampleCode: {
        language: "java",
        code: `import java.util.Random;

public class AuthEngine {
    private int generatedOtp;
    private int attemptsRemaining = 3;
    private boolean isLocked = false;

    public void requestOtp() {
        generatedOtp = 100000 + new Random().nextInt(900000);
        attemptsRemaining = 3;
        isLocked = false;
        System.out.println("[SECURE DISPATCH] OTP generated and sent to registered phone: " + generatedOtp);
    }

    public boolean verify(int input) {
        if (isLocked) {
            System.out.println("[!] ERROR: Account is temporarily LOCKED due to excess failed attempts.");
            return false;
        }
        if (input == generatedOtp) {
            System.out.println("[✓] Authentication SUCCESSFUL! Access granted.");
            return true;
        }
        attemptsRemaining--;
        System.out.println("[-] Invalid OTP! Attempts remaining: " + attemptsRemaining);
        if (attemptsRemaining == 0) {
            isLocked = true;
            System.out.println("[!] SECURITY ALERT: 3 failed attempts exceeded. Account is now LOCKED.");
        }
        return false;
    }

    public static void main(String[] args) {
        AuthEngine auth = new AuthEngine();
        auth.requestOtp();
        auth.verify(111111);
        auth.verify(222222);
        auth.verify(auth.generatedOtp);
    }
}`
      },
      expectedOutput: `[SECURE DISPATCH] OTP generated and sent to registered phone: 582419
[-] Invalid OTP! Attempts remaining: 2
[-] Invalid OTP! Attempts remaining: 1
[✓] Authentication SUCCESSFUL! Access granted.`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "java-exp-7",
    labId: "oops-java",
    title: "Exp 7: Employee Management System: Demonstrate single, multilevel, and hierarchical inheritance using Employee, Manager, and Developer classes.",
    slug: "employee-management-inheritance-hierarchy",
    difficulty: "Intermediate",
    category: "Java OOP" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 135,
    simulator: "custom",
    quizId: "quiz-java-7",
    sections: {
      introduction: "Inheritance enables code reuse and polymorphism through is-a relationships, allowing derived subclasses to extend superclass fields and override behavior via super().",
      objective: "Demonstrate Single Inheritance (Employee -> Manager), Multilevel Inheritance (Employee -> Developer -> TechLead), and Hierarchical Inheritance using method overriding.",
      videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      videoTitle: "Java Inheritance & Polymorphism",
      videoChannel: "Programming with Mosh",
      prerequisites: ["Classes & Objects", "super Keyword"],
      theory: {
        overview: "The extends keyword establishes subclass inheritance. super(args) invokes the superclass constructor. Overridden methods with @Override annotation execute subclass implementations via dynamic method dispatch (runtime polymorphism).",
        keyConcepts: [
          { title: "Single & Multilevel Inheritance", desc: "Linear chain of subclass specialization extending base capabilities." },
          { title: "Hierarchical Inheritance", desc: "Multiple child classes (Manager, Developer) inheriting from single parent (Employee)." },
          { title: "super Keyword", desc: "Invokes parent constructor and accesses overridden parent methods." }
        ],
        complexities: [
          { operation: "Subclass Instantiation", best: "O(hierarchy_depth)", avg: "O(depth)", worst: "O(depth)", space: "O(object_fields)" }
        ],
        realWorldApplications: [
          "Enterprise Role-Based Access Control (RBAC) user hierarchies",
          "GUI widget component class hierarchies (Component -> Container -> Window -> Frame)",
          "Game entity object hierarchies (Entity -> Character -> Hero / Enemy)"
        ]
      },
      procedure: [
        "1. Create base class Employee with id, name, salary and displayRole().",
        "2. Create subclass Manager extending Employee with teamSize.",
        "3. Create subclass Developer extending Employee with programmingLanguage.",
        "4. Create subclass TechLead extending Developer.",
        "5. Demonstrate dynamic polymorphic array dispatch."
      ],
      sampleCode: {
        language: "java",
        code: `class Employee {
    protected int id;
    protected String name;
    protected double salary;

    public Employee(int id, String name, double salary) {
        this.id = id; this.name = name; this.salary = salary;
    }
    public void displayRole() {
        System.out.printf("[Employee] #%d %s - Salary: $%.2f%n", id, name, salary);
    }
}

class Manager extends Employee {
    private int teamSize;
    public Manager(int id, String name, double salary, int teamSize) {
        super(id, name, salary); this.teamSize = teamSize;
    }
    @Override
    public void displayRole() {
        System.out.printf("[Manager] #%d %s - Managing Team of %d engineers | Salary: $%.2f%n", id, name, teamSize, salary);
    }
}

class Developer extends Employee {
    protected String primaryLang;
    public Developer(int id, String name, double salary, String lang) {
        super(id, name, salary); this.primaryLang = lang;
    }
    @Override
    public void displayRole() {
        System.out.printf("[Developer] #%d %s - Stack: %s | Salary: $%.2f%n", id, name, primaryLang, salary);
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Employee[] staff = {
            new Manager(101, "Sarah Connor", 125000, 8),
            new Developer(102, "Alex Rivera", 95000, "Java / Spring Boot")
        };
        for (Employee e : staff) e.displayRole();
    }
}`
      },
      expectedOutput: `[Manager] #101 Sarah Connor - Managing Team of 8 engineers | Salary: $125000.00
[Developer] #102 Alex Rivera - Stack: Java / Spring Boot | Salary: $95000.00`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "java-exp-8",
    labId: "oops-java",
    title: "Exp 8: Academic Hierarchy: Create a base class Person and derive Student and Teacher classes to display academic details.",
    slug: "academic-hierarchy-person-student-teacher",
    difficulty: "Beginner",
    category: "Java OOP" as any,
    estimatedMinutes: 20,
    rating: 4.90,
    ratingsCount: 110,
    simulator: "custom",
    quizId: "quiz-java-8",
    sections: {
      introduction: "Hierarchical inheritance models real-world university domain entities sharing common demographic attributes (Person) while specializing institutional roles (Student, Teacher).",
      objective: "Build an abstract base class Person and specialized subclasses Student (rollNo, GPA) and Teacher (employeeId, subject, salary) to output formatted academic profiles.",
      videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      videoTitle: "Java Abstract Classes & Hierarchy",
      videoChannel: "Telusko",
      prerequisites: ["Inheritance", "Abstract Methods"],
      theory: {
        overview: "Abstract class Person defines shared state (name, email, age) and abstract method displayDetails(). Concrete subclasses Student and Teacher provide role-specific implementations.",
        keyConcepts: [
          { title: "Abstract Class", desc: "Cannot be directly instantiated; serves as a template contract for derived subclasses." },
          { title: "Polymorphic Collection", desc: "Storing Student and Teacher instances inside a Person[] array." }
        ],
        complexities: [
          { operation: "Polymorphic Dispatch", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Campus ERP and Student Information Management Systems",
          "Learning Management Systems (Canvas, Google Classroom)",
          "University accreditation reporting portals"
        ]
      },
      procedure: [
        "1. Declare abstract class Person with name, age.",
        "2. Implement concrete class Student with rollNo, gpa.",
        "3. Implement concrete class Teacher with empId, dept.",
        "4. Instantiate instances and call overridden displayDetails()."
      ],
      sampleCode: {
        language: "java",
        code: `abstract class Person {
    protected String name;
    protected int age;
    public Person(String name, int age) { this.name = name; this.age = age; }
    public abstract void displayDetails();
}

class Student extends Person {
    private String rollNo;
    private double gpa;
    public Student(String name, int age, String rollNo, double gpa) {
        super(name, age); this.rollNo = rollNo; this.gpa = gpa;
    }
    @Override
    public void displayDetails() {
        System.out.printf("[Student] %-15s Age: %d | Roll: %s | GPA: %.2f%n", name, age, rollNo, gpa);
    }
}

class Teacher extends Person {
    private String empId, department;
    public Teacher(String name, int age, String empId, String dept) {
        super(name, age); this.empId = empId; this.department = dept;
    }
    @Override
    public void displayDetails() {
        System.out.printf("[Faculty] %-15s Age: %d | ID: %s   | Dept: %s%n", name, age, empId, department);
    }
}

public class AcademicHierarchy {
    public static void main(String[] args) {
        Person[] campus = {
            new Student("Kavya Sharma", 20, "24AD104", 3.92),
            new Teacher("Dr. Aris Thorne", 45, "FAC-881", "AI & Data Science")
        };
        for (Person p : campus) p.displayDetails();
    }
}`
      },
      expectedOutput: `[Student] Kavya Sharma    Age: 20 | Roll: 24AD104 | GPA: 3.92
[Faculty] Dr. Aris Thorne Age: 45 | ID: FAC-881   | Dept: AI & Data Science`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "java-exp-9",
    labId: "oops-java",
    title: "Exp 9: Recursion and Polymorphism: Compute factorial using recursion and demonstrate method overloading with different parameter combinations.",
    slug: "recursion-and-method-overloading",
    difficulty: "Intermediate",
    category: "Java OOP" as any,
    estimatedMinutes: 25,
    rating: 4.92,
    ratingsCount: 120,
    simulator: "custom",
    quizId: "quiz-java-9",
    sections: {
      introduction: "Recursion solves problems through self-referential base and recursive steps on the call stack, while Compile-Time Polymorphism (Method Overloading) provides multiple method signatures sharing identical names.",
      objective: "Implement recursive factorial computation with stack overflow protection and overload math computation methods (different parameter types and counts).",
      videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      videoTitle: "Recursion & Method Overloading in Java",
      videoChannel: "Bro Code",
      prerequisites: ["Call Stack", "Method Signatures"],
      theory: {
        overview: "Method Overloading resolves target method statically at compile time based on parameter count, types, and sequence. Recursive functions require strict base cases (n <= 1) to avoid java.lang.StackOverflowError.",
        keyConcepts: [
          { title: "Call Stack Frames", desc: "Each recursive call pushes activation frame holding local variables and return address." },
          { title: "Method Overloading (Static Polymorphism)", desc: "Differentiated by parameter signature; return type alone is insufficient." }
        ],
        complexities: [
          { operation: "Recursive Factorial", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n stack frames)" },
          { operation: "Overloaded Dispatch", best: "O(1 compile time)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Tree and graph recursive traversals (DOM tree, JSON AST parsing)",
          "Overloaded utility API libraries (e.g. Math.max(int, int), Math.max(double, double))",
          "Divide-and-conquer sorting algorithms (Merge Sort, Quick Sort)"
        ]
      },
      procedure: [
        "1. Write recursive factorial(int n) function with base condition n <= 1.",
        "2. Overload area() method for Circle (1 double), Rectangle (2 doubles), and Triangle (3 doubles).",
        "3. Test recursive factorial and overloaded method invocations in main()."
      ],
      sampleCode: {
        language: "java",
        code: `public class RecursionPolymorphism {
    // 1. Recursive Factorial
    public static long factorial(int n) {
        if (n < 0) throw new IllegalArgumentException("Factorial undefined for negative numbers!");
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    // 2. Overloaded Shape Area Computations (Compile-Time Polymorphism)
    public static double computeArea(double radius) {
        return Math.PI * radius * radius; // Circle
    }

    public static double computeArea(double length, double width) {
        return length * width; // Rectangle
    }

    public static double computeArea(double a, double b, double c) {
        double s = (a + b + c) / 2.0; // Heron's Formula for Triangle
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    public static void main(String[] args) {
        System.out.println("Factorial of 6: " + factorial(6));
        System.out.printf("Area of Circle (r=5):    %.2f%n", computeArea(5.0));
        System.out.printf("Area of Rectangle (4x7): %.2f%n", computeArea(4.0, 7.0));
        System.out.printf("Area of Triangle (3,4,5):%.2f%n", computeArea(3.0, 4.0, 5.0));
    }
}`
      },
      expectedOutput: `Factorial of 6: 720
Area of Circle (r=5):    78.54
Area of Rectangle (4x7): 28.00
Area of Triangle (3,4,5):6.00`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "java-exp-10",
    labId: "oops-java",
    title: "Exp 10: Matrix Manipulation: Write a class for 2D matrix operations such as addition, multiplication, and transpose.",
    slug: "matrix-manipulation-class",
    difficulty: "Intermediate",
    category: "Java OOP" as any,
    estimatedMinutes: 30,
    rating: 4.94,
    ratingsCount: 130,
    simulator: "custom",
    quizId: "quiz-java-10",
    sections: {
      introduction: "2D Arrays in Java represent mathematical matrices, supporting vectorized addition, dot product multiplication, and in-place transposition.",
      objective: "Encapsulate matrix operations in a Matrix ADT class enforcing dimension compatibility checks for addition (identical shape) and multiplication (A.cols == B.rows).",
      videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      videoTitle: "Java 2D Array Matrix Operations",
      videoChannel: "Bro Code",
      prerequisites: ["2D Array Indexing", "Linear Algebra"],
      theory: {
        overview: "Matrix addition C[i][j] = A[i][j] + B[i][j] requires matching rows and cols. Matrix multiplication C[i][j] = sum_k(A[i][k] * B[k][j]) requires A.cols == B.rows. Transpose reflects elements across main diagonal: T[j][i] = M[i][j].",
        keyConcepts: [
          { title: "2D Array Memory Model", desc: "Java 2D arrays are arrays of array references (jagged arrays)." },
          { title: "Dimension Compatibility Invariant", desc: "Throws IllegalArgumentException if matrix shapes are invalid." },
          { title: "Matrix Dot Product Complexity", desc: "Triple nested loop executing in O(rows * cols * inner_dim)." }
        ],
        complexities: [
          { operation: "Matrix Addition", best: "O(r * c)", avg: "O(r * c)", worst: "O(r * c)", space: "O(r * c)" },
          { operation: "Matrix Multiplication", best: "O(r * c * k)", avg: "O(r * c * k)", worst: "O(r * c * k)", space: "O(r * k)" },
          { operation: "Matrix Transpose", best: "O(r * c)", avg: "O(r * c)", worst: "O(r * c)", space: "O(c * r)" }
        ],
        realWorldApplications: [
          "Computer graphics 3D affine projection and rotation transforms",
          "Deep learning convolutional and fully-connected layer weights",
          "Scientific finite-element simulations and robotics kinematics"
        ]
      },
      procedure: [
        "1. Create class Matrix with rows, cols, and int[][] data.",
        "2. Implement add(Matrix other) verifying dimensions.",
        "3. Implement multiply(Matrix other) executing triple loop dot product.",
        "4. Implement transpose() swapping indices [i][j] -> [j][i].",
        "5. Print matrices."
      ],
      sampleCode: {
        language: "java",
        code: `public class Matrix {
    private int rows, cols;
    private int[][] data;

    public Matrix(int[][] d) {
        this.rows = d.length; this.cols = d[0].length; this.data = d;
    }

    public Matrix multiply(Matrix other) {
        if (this.cols != other.rows) throw new IllegalArgumentException("Incompatible dimensions for multiplication!");
        int[][] res = new int[this.rows][other.cols];
        for (int i = 0; i < this.rows; i++)
            for (int j = 0; j < other.cols; j++)
                for (int k = 0; k < this.cols; k++)
                    res[i][j] += this.data[i][k] * other.data[k][j];
        return new Matrix(res);
    }

    public Matrix transpose() {
        int[][] res = new int[cols][rows];
        for (int i = 0; i < rows; i++)
            for (int j = 0; j < cols; j++) res[j][i] = data[i][j];
        return new Matrix(res);
    }

    public void display() {
        for (int[] row : data) {
            for (int val : row) System.out.printf("%4d", val);
            System.out.println();
        }
    }

    public static void main(String[] args) {
        Matrix A = new Matrix(new int[][]{{1, 2, 3}, {4, 5, 6}});
        Matrix B = new Matrix(new int[][]{{7, 8}, {9, 1}, {2, 3}});
        System.out.println("Matrix A (2x3) x Matrix B (3x2):");
        A.multiply(B).display();
    }
}`
      },
      expectedOutput: `Matrix A (2x3) x Matrix B (3x2):
  31  19
  85  55`,
      leetcodeProblems: [
        {
          id: 5,
          title: "Transpose Matrix",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/transpose-matrix/",
          description: "Given a 2D integer array matrix, return the transpose of matrix.",
          approach: "Create new matrix of dimensions [cols][rows] and set result[j][i] = matrix[i][j].",
          javaSnippet: `class Solution { public int[][] transpose(int[][] matrix) { int R = matrix.length, C = matrix[0].length; int[][] ans = new int[C][R]; for (int r = 0; r < R; ++r) for (int c = 0; c < C; ++c) ans[c][r] = matrix[r][c]; return ans; } }`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "java-exp-11",
    labId: "oops-java",
    title: "Exp 11: 2D Matrix Traversals: Implement algorithms for spiral traversal and boundary traversal of a matrix.",
    slug: "2d-matrix-traversals-spiral-and-boundary",
    difficulty: "Intermediate",
    category: "Java OOP" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 140,
    simulator: "custom",
    quizId: "quiz-java-11",
    sections: {
      introduction: "Matrix traversal algorithms navigate 2D grid structures in non-linear sequences including concentric inward Spiral order and perimeter Boundary order.",
      objective: "Implement 4-boundary pointer algorithm (top, bottom, left, right) for clockwise Spiral order traversal and perimeter Boundary traversal.",
      videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      videoTitle: "Spiral Matrix Traversal Algorithm",
      videoChannel: "NeetCode",
      prerequisites: ["2D Array Indexing", "Boundary Pointers"],
      theory: {
        overview: "Spiral traversal tracks 4 boundary pointers: top, bottom, left, right. Step 1: Traverse left->right across top row, top++. Step 2: Traverse top->bottom down right column, right--. Step 3: Traverse right->left across bottom row, bottom--. Step 4: Traverse bottom->top up left column, left++. Repeat while top <= bottom and left <= right.",
        keyConcepts: [
          { title: "4-Pointer Boundary Contraction", desc: "Inward boundary shifting after traversing each edge." },
          { title: "Single Row/Col Edge Cases", desc: "Checking top <= bottom and left <= right before reverse sweeps prevents duplicate visits." }
        ],
        complexities: [
          { operation: "Spiral Traversal", best: "O(m * n)", avg: "O(m * n)", worst: "O(m * n)", space: "O(m * n output)" }
        ],
        realWorldApplications: [
          "Image processing convolution kernels and raster scan conversions",
          "Robotic vacuum floor sweeping grid traversal paths",
          "Geographic spatial map quadtree tile rendering"
        ]
      },
      procedure: [
        "1. Define matrix and initialize top=0, bottom=R-1, left=0, right=C-1.",
        "2. Loop while top <= bottom && left <= right.",
        "3. Traverse and print top row, right column, bottom row, left column.",
        "4. Update boundary pointers on each phase completion."
      ],
      sampleCode: {
        language: "java",
        code: `import java.util.*;

public class MatrixTraversals {
    public static List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        if (matrix == null || matrix.length == 0) return res;
        int top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;

        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) res.add(matrix[top][i]);
            top++;
            for (int i = top; i <= bottom; i++) res.add(matrix[i][right]);
            right--;
            if (top <= bottom) {
                for (int i = right; i >= left; i--) res.add(matrix[bottom][i]);
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) res.add(matrix[i][left]);
                left++;
            }
        }
        return res;
    }

    public static void main(String[] args) {
        int[][] grid = {
            {1,  2,  3,  4},
            {5,  6,  7,  8},
            {9, 10, 11, 12}
        };
        System.out.println("Clockwise Spiral Traversal: " + spiralOrder(grid));
    }
}`
      },
      expectedOutput: `Clockwise Spiral Traversal: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]`,
      leetcodeProblems: [
        {
          id: 6,
          title: "Spiral Matrix",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/spiral-matrix/",
          description: "Given an m x n matrix, return all elements of the matrix in spiral order.",
          approach: "Maintain 4 boundary pointers (top, bottom, left, right) and shrink boundaries inward.",
          javaSnippet: `// Spiral Order Solution`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "java-exp-12",
    labId: "oops-java",
    title: "Exp 12: Strings and Arrays Algorithms: Implement programs for Anagram checking, substring pattern matching, and maximum subarray sum (Kadane’s Algorithm).",
    slug: "strings-and-arrays-algorithms-anagram-kadane",
    difficulty: "Intermediate",
    category: "Java OOP" as any,
    estimatedMinutes: 30,
    rating: 4.96,
    ratingsCount: 145,
    simulator: "custom",
    quizId: "quiz-java-12",
    sections: {
      introduction: "Master canonical array and string algorithmic patterns: Frequency Hash Counting for Anagram verification and Dynamic Programming Kadane's Algorithm for Maximum Subarray Sum.",
      objective: "Implement Valid Anagram check via character frequency counts in O(n) time, and Kadane's Maximum Contiguous Subarray Sum in O(n) time and O(1) space.",
      videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      videoTitle: "Kadane's Algorithm & Anagrams",
      videoChannel: "NeetCode",
      prerequisites: ["String Methods", "Dynamic Programming Basics"],
      theory: {
        overview: "Anagram checking verifies that two strings contain identical character permutations via frequency array counts[char - 'a']. Kadane's algorithm computes max_ending_here = max(arr[i], max_ending_here + arr[i]) and maintains global max_so_far.",
        keyConcepts: [
          { title: "Character Frequency Array", desc: "Fixed 26-element array counting occurrences in O(n) time without O(n log n) sorting." },
          { title: "Kadane's Optimal Substructure", desc: "Local maximum at index i either extends previous subarray or starts fresh at arr[i]." }
        ],
        complexities: [
          { operation: "Valid Anagram Check", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1) 26 ints" },
          { operation: "Kadane's Subarray Sum", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Financial stock market maximum profit continuous interval detection",
          "Genomic DNA sequence pattern matching and mutation detection",
          "Search engine typo tolerance and anagram solver dictionaries"
        ]
      },
      procedure: [
        "1. Implement isAnagram(s, t) comparing length and frequency counts array.",
        "2. Implement maxSubArray(nums) executing Kadane's dynamic programming loop.",
        "3. Output test results for both algorithms."
      ],
      sampleCode: {
        language: "java",
        code: `public class StringArrayAlgorithms {
    // 1. Valid Anagram Check (O(n) time, O(1) space)
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

    // 2. Kadane's Algorithm for Maximum Subarray Sum (O(n) time, O(1) space)
    public static int maxSubArray(int[] nums) {
        int maxSoFar = nums[0], maxEndingHere = nums[0];
        for (int i = 1; i < nums.length; i++) {
            maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        return maxSoFar;
    }

    public static void main(String[] args) {
        System.out.println("Is 'anagram' & 'nagaram' anagram? " + isAnagram("anagram", "nagaram"));
        int[] arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println("Maximum Subarray Sum (Kadane's): " + maxSubArray(arr)); // [4, -1, 2, 1] -> 6
    }
}`
      },
      expectedOutput: `Is 'anagram' & 'nagaram' anagram? true
Maximum Subarray Sum (Kadane's): 6`,
      leetcodeProblems: [
        {
          id: 7,
          title: "Maximum Subarray (LeetCode #53)",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/maximum-subarray/",
          description: "Find the subarray with the largest sum and return its sum.",
          approach: "Apply Kadane's Algorithm tracking current and global maximum.",
          javaSnippet: `// Kadane Solution`
        },
        {
          id: 8,
          title: "Valid Anagram (LeetCode #242)",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/valid-anagram/",
          description: "Given two strings s and t, return true if t is an anagram of s.",
          approach: "Use a fixed size frequency count table.",
          javaSnippet: `// Anagram Solution`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "java-exp-13",
    labId: "oops-java",
    title: "Exp 13: Exception Handling & File I/O: Handle custom and built-in exceptions and read/write data using file streams.",
    slug: "exception-handling-and-file-io",
    difficulty: "Intermediate",
    category: "Java OOP" as any,
    estimatedMinutes: 30,
    rating: 4.93,
    ratingsCount: 130,
    simulator: "custom",
    quizId: "quiz-java-13",
    sections: {
      introduction: "Robust Java applications handle runtime faults gracefully using try-catch-finally, create custom domain Exception subclasses, and perform resource-safe File I/O via try-with-resources.",
      objective: "Create custom InsufficientFundsException, handle checked vs unchecked exceptions, and read/write text records using BufferedReader and BufferedWriter.",
      videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      videoTitle: "Java Exception Handling & File I/O",
      videoChannel: "Programming with Mosh",
      prerequisites: ["try-catch Blocks", "java.io Packages"],
      theory: {
        overview: "Java Exception hierarchy roots at Throwable (Error vs Exception). Checked exceptions (IOException, SQLException) must be caught or declared in throws clause. Try-with-resources automatically closes AutoCloseable streams to prevent file handle memory leaks.",
        keyConcepts: [
          { title: "Custom Exception Class", desc: "Extends Exception (checked) or RuntimeException (unchecked) with custom error messaging." },
          { title: "Try-with-Resources", desc: "try (BufferedReader br = new BufferedReader(...)) guarantees stream closure on block exit." },
          { title: "finally Block Guarantee", desc: "Always executes regardless of whether an exception is thrown or caught." }
        ],
        complexities: [
          { operation: "Stream Read / Write", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(buffer_size)" }
        ],
        realWorldApplications: [
          "Enterprise audit trail file logging frameworks (Log4j / SLF4J)",
          "Transactional database rollbacks on business rule violation exceptions",
          "CSV/JSON configuration file loading and schema validation"
        ]
      },
      procedure: [
        "1. Define class InsufficientBalanceException extends Exception.",
        "2. Write text data to a local file using BufferedWriter inside try-with-resources.",
        "3. Read back file contents line-by-line using BufferedReader.",
        "4. Throw and catch InsufficientBalanceException during invalid withdrawal.",
        "5. Output log trace."
      ],
      sampleCode: {
        language: "java",
        code: `import java.io.*;

class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String msg) { super(msg); }
}

public class ExceptionFileIODemo {
    public static void processTransaction(double balance, double withdrawal) throws InsufficientBalanceException {
        if (withdrawal > balance) {
            throw new InsufficientBalanceException("Withdrawal of $" + withdrawal + " exceeds available balance of $" + balance);
        }
        System.out.println("[✓] Transaction authorized. Remaining balance: $" + (balance - withdrawal));
    }

    public static void main(String[] args) {
        // 1. File Writing with Auto-Closeable Resource
        File file = new File("vlab_audit.txt");
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            writer.write("AUDIT LOG: User #101 initiated secure wire transfer.\\n");
            writer.write("STATUS: Completed successfully.\\n");
            System.out.println("[FILE I/O] Audit log written successfully.");
        } catch (IOException e) {
            System.err.println("File write error: " + e.getMessage());
        }

        // 2. Custom Business Exception Test
        try {
            processTransaction(100.0, 250.0);
        } catch (InsufficientBalanceException e) {
            System.out.println("[CAUGHT CUSTOM EXCEPTION]: " + e.getMessage());
        } finally {
            if (file.exists()) file.delete(); // Cleanup scratch file
        }
    }
}`
      },
      expectedOutput: `[FILE I/O] Audit log written successfully.
[CAUGHT CUSTOM EXCEPTION]: Withdrawal of $250.0 exceeds available balance of $100.0`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "java-exp-14",
    labId: "oops-java",
    title: "Exp 14: Java Collections Framework & Stream API: Manipulate collections using ArrayList, HashMap, HashSet, and process data streams with filters, maps, and collectors.",
    slug: "java-collections-framework-and-stream-api",
    difficulty: "Advanced",
    category: "Java OOP" as any,
    estimatedMinutes: 35,
    rating: 4.97,
    ratingsCount: 160,
    simulator: "custom",
    quizId: "quiz-java-14",
    sections: {
      introduction: "The Java Collections Framework (JCF) provides standardized data structures (List, Set, Map), enhanced by Java 8 functional Stream APIs for declarative pipelined data processing.",
      objective: "Utilize ArrayList, HashMap, and HashSet, and process collections using Stream pipelines (.filter(), .map(), .sorted(), .collect(Collectors.toList())).",
      videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      videoTitle: "Java Collections & Streams Masterclass",
      videoChannel: "Amigoscode",
      prerequisites: ["Generics in Java", "Lambda Expressions"],
      theory: {
        overview: "ArrayList provides dynamic resizable arrays. HashMap stores key-value pairs with O(1) hash bucket lookups. HashSet stores unique distinct elements. Stream API processes collections declaratively via lazy intermediate operations and eager terminal collectors.",
        keyConcepts: [
          { title: "HashMap Bucket Array", desc: "Uses hashCode() and equals() to resolve collisions via linked lists and red-black trees." },
          { title: "Lazy Intermediate Streams", desc: "filter() and map() construct execution pipeline without computing until terminal operation is invoked." },
          { title: "Collectors.groupingBy()", desc: "Partitions stream records into grouped Map<K, List<V>> aggregates." }
        ],
        complexities: [
          { operation: "HashMap get() / put()", best: "O(1)", avg: "O(1)", worst: "O(log n) tree bucket", space: "O(n)" },
          { operation: "Stream Filter & Collect", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(filtered_size)" }
        ],
        realWorldApplications: [
          "Enterprise microservice JSON response payload transformations",
          "In-memory session token and user profile caching",
          "Data analytics aggregation and reporting pipelines"
        ]
      },
      procedure: [
        "1. Create Student record class with id, name, dept, and gpa.",
        "2. Populate List<Student> collection.",
        "3. Use Stream API to filter students with GPA >= 3.5, sort descending by GPA, and extract names.",
        "4. Group students by department using Collectors.groupingBy().",
        "5. Output processed streams."
      ],
      sampleCode: {
        language: "java",
        code: `import java.util.*;
import java.util.stream.Collectors;

class StudentRecord {
    int id; String name, dept; double gpa;
    public StudentRecord(int id, String name, String dept, double gpa) {
        this.id = id; this.name = name; this.dept = dept; this.gpa = gpa;
    }
    public double getGpa() { return gpa; }
    public String getDept() { return dept; }
    public String getName() { return name; }
}

public class CollectionsStreamDemo {
    public static void main(String[] args) {
        List<StudentRecord> students = Arrays.asList(
            new StudentRecord(1, "Alice", "AIDS", 3.92),
            new StudentRecord(2, "Bob", "CSE", 3.40),
            new StudentRecord(3, "Charlie", "AIDS", 3.85),
            new StudentRecord(4, "Diana", "IT", 3.95),
            new StudentRecord(5, "Evan", "CSE", 3.20)
        );

        // 1. Stream Filter, Sort, and Collect
        List<String> honorRoll = students.stream()
            .filter(s -> s.getGpa() >= 3.80)
            .sorted(Comparator.comparingDouble(StudentRecord::getGpa).reversed())
            .map(StudentRecord::getName)
            .collect(Collectors.toList());
        System.out.println("Honor Roll (GPA >= 3.80): " + honorRoll);

        // 2. Stream GroupingBy Department
        Map<String, List<String>> deptGroups = students.stream()
            .collect(Collectors.groupingBy(
                StudentRecord::getDept,
                Collectors.mapping(StudentRecord::getName, Collectors.toList())
            ));
        System.out.println("Department Breakdown: " + deptGroups);
    }
}`
      },
      expectedOutput: `Honor Roll (GPA >= 3.80): [Diana, Alice, Charlie]
Department Breakdown: {CSE=[Bob, Evan], AIDS=[Alice, Charlie], IT=[Diana]}`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA", "M.Tech Data Science"]
      }
    }
  },
  {
    id: "java-exp-15",
    labId: "oops-java",
    title: "Exp 15: Database Connectivity (JDBC): Connect Java with a database (MySQL/PostgreSQL) and perform CRUD operations.",
    slug: "database-connectivity-jdbc-crud",
    difficulty: "Advanced",
    category: "Java OOP" as any,
    estimatedMinutes: 35,
    rating: 4.96,
    ratingsCount: 155,
    simulator: "custom",
    quizId: "quiz-java-15",
    sections: {
      introduction: "Java Database Connectivity (JDBC) is the industry standard Java API for executing SQL statements and retrieving relational database result sets.",
      objective: "Configure JDBC Connection, execute PreparedStatement queries for Create, Read, Update, Delete (CRUD), and process ResultSet cursors securely without SQL injection.",
      videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
      videoTitle: "JDBC CRUD Operations Tutorial",
      videoChannel: "Telusko",
      prerequisites: ["SQL Basics", "Java Interfaces"],
      theory: {
        overview: "JDBC workflow: 1. DriverManager.getConnection(url, user, pass). 2. Create PreparedStatement with parameterized '?' placeholders to prevent SQL injection vulnerabilities. 3. Execute executeUpdate() (for INSERT/UPDATE/DELETE) or executeQuery() (for SELECT). 4. Iterate ResultSet cursor.",
        keyConcepts: [
          { title: "DriverManager & Connection", desc: "Manages database drivers and establishes TCP socket connection to relational database engine." },
          { title: "PreparedStatement", desc: "Pre-compiled SQL statement preventing SQL injection attacks." },
          { title: "ResultSet Cursor", desc: "Maintains a cursor pointing to its current row of data in result table." }
        ],
        complexities: [
          { operation: "JDBC PreparedStatement Query", best: "O(1 roundtrip)", avg: "O(network + db_query)", worst: "O(timeout)", space: "O(ResultSet_buffer)" }
        ],
        realWorldApplications: [
          "Enterprise Spring Boot Data JPA / Hibernate persistence layers",
          "Financial banking transaction processing systems",
          "Inventory and supply chain database management backends"
        ]
      },
      procedure: [
        "1. Load JDBC driver (e.g. org.sqlite.JDBC or com.mysql.cj.jdbc.Driver).",
        "2. Establish Connection using DriverManager.getConnection().",
        "3. Create table using Statement.executeUpdate().",
        "4. Perform INSERT, UPDATE, and DELETE using PreparedStatement.",
        "5. Execute SELECT query and iterate through ResultSet rows."
      ],
      sampleCode: {
        language: "java",
        code: `import java.sql.*;

public class JdbcCrudDemo {
    public static void main(String[] args) {
        String url = "jdbc:sqlite::memory:"; // In-memory database for demonstration

        try (Connection conn = DriverManager.getConnection(url)) {
            System.out.println("[✓] Connected to Database successfully.");

            // 1. CREATE TABLE
            try (Statement stmt = conn.createStatement()) {
                stmt.execute("CREATE TABLE Students (id INT PRIMARY KEY, name TEXT, gpa DOUBLE);");
            }

            // 2. INSERT (PreparedStatement)
            String insertSql = "INSERT INTO Students (id, name, gpa) VALUES (?, ?, ?);";
            try (PreparedStatement pstmt = conn.prepareStatement(insertSql)) {
                pstmt.setInt(1, 101); pstmt.setString(2, "Alice Johnson"); pstmt.setDouble(3, 3.92);
                pstmt.executeUpdate();
                pstmt.setInt(1, 102); pstmt.setString(2, "Bob Smith"); pstmt.setDouble(3, 3.45);
                pstmt.executeUpdate();
            }

            // 3. READ (SELECT)
            String selectSql = "SELECT id, name, gpa FROM Students WHERE gpa >= ?;";
            try (PreparedStatement pstmt = conn.prepareStatement(selectSql)) {
                pstmt.setDouble(1, 3.50);
                ResultSet rs = pstmt.executeQuery();
                System.out.println("=== Honor Students (GPA >= 3.50) ===");
                while (rs.next()) {
                    System.out.printf("[%d] %-15s GPA: %.2f%n", rs.getInt("id"), rs.getString("name"), rs.getDouble("gpa"));
                }
            }
        } catch (SQLException e) {
            System.err.println("JDBC Error: " + e.getMessage());
        }
    }
}`
      },
      expectedOutput: `[✓] Connected to Database successfully.
=== Honor Students (GPA >= 3.50) ===
[101] Alice Johnson   GPA: 3.92`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  }
];
