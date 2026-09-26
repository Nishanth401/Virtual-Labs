import { Experiment } from "../experiments";

export const OOPS_JAVA_EXPERIMENTS: Experiment[] = [
{
  "id": "oop-exp-1",
  "labId": "oops-java",
  "title": "Exp 1: Store Student Details and Calculate Total, Average, and Grade",
  "slug": "oop-exp-1-student-grade-calculator",
  "difficulty": "Beginner",
  "category": "Java OOP",
  "estimatedMinutes": 30,
  "rating": 4.95,
  "ratingsCount": 225,
  "simulator": "custom",
  "quizId": "quiz-oop-1",
  "sections": {
    "introduction": "To create a Java program to store student details and calculate total marks, average marks, and grade.",
    "objective": "To create a Java program to store student details and calculate total marks, average marks, and grade.",
    "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    "videoTitle": "Java OOP: Exp 1: Store Student Details and Calculate Total, Average, and Grade",
    "videoChannel": "Java Programming Master Academy",
    "prerequisites": [
      "Core Java Syntax",
      "OOP Principles"
    ],
    "theory": {
      "overview": "This experiment implements Exp 1: Store Student Details and Calculate Total, Average, and Grade adhering to the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
      "keyConcepts": [
        {
          "title": "Encapsulation & Abstraction",
          "desc": "Hiding internal object representation and exposing a clean public interface."
        },
        {
          "title": "Inheritance & Reusability",
          "desc": "Deriving specialized classes and method overriding."
        },
        {
          "title": "Robust Error Handling",
          "desc": "Checked/unchecked exceptions and resource safety."
        }
      ],
      "complexities": [
        {
          "operation": "Object Method Invocation",
          "best": "O(1)",
          "avg": "O(1)",
          "worst": "O(1)",
          "space": "O(1)"
        }
      ],
      "realWorldApplications": [
        "Enterprise banking and payroll transaction architectures",
        "E-commerce product catalog and order checkout engines",
        "Large-scale enterprise software architectures powered by Java frameworks"
      ]
    },
    "procedure": [
      "1. Start the program.",
      "2. Declare variables for roll number, name, marks, total, average, and grade.",
      "3. Read the student details and marks from the user using Scanner.",
      "4. Calculate total marks by adding the marks of all subjects.",
      "5. Calculate average marks by dividing total marks by the number of subjects.",
      "6. Determine the grade based on average marks using decision-making statements (if-else-if).",
      "7. Display the student details along with total, average, and grade.",
      "8. Stop the program."
    ],
    "sampleCode": {
      "language": "java",
      "code": "import java.util.Scanner;\n\npublic class StudentDetails {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"Enter Roll Number: \");\n        int rollNo = sc.nextInt();\n        sc.nextLine();\n        System.out.print(\"Enter Name: \");\n        String name = sc.nextLine();\n        System.out.print(\"Enter Marks in 5 Subjects: \");\n        int m1 = sc.nextInt();\n        int m2 = sc.nextInt();\n        int m3 = sc.nextInt();\n        int m4 = sc.nextInt();\n        int m5 = sc.nextInt();\n\n        int total = m1 + m2 + m3 + m4 + m5;\n        double average = total / 5.0;\n        char grade;\n\n        if (average >= 90) grade = 'O';\n        else if (average >= 80) grade = 'A';\n        else if (average >= 70) grade = 'B';\n        else if (average >= 60) grade = 'C';\n        else if (average >= 50) grade = 'D';\n        else grade = 'F';\n\n        System.out.println(\"\\n--- Student Marksheet ---\");\n        System.out.println(\"Roll No: \" + rollNo);\n        System.out.println(\"Name   : \" + name);\n        System.out.println(\"Total  : \" + total + \" / 500\");\n        System.out.println(\"Average: \" + average);\n        System.out.println(\"Grade  : \" + grade);\n    }\n}"
    },
    "expectedOutput": "Enter Roll Number: 101\nEnter Name: Rahul Sharma\nEnter Marks in 5 Subjects: 92 88 95 89 94\n\n--- Student Marksheet ---\nRoll No: 101\nName   : Rahul Sharma\nTotal  : 458 / 500\nAverage: 91.6\nGrade  : O",
    "leetcodeProblems": [],
    "targetAudience": {
      "ug": [
        "B.Tech AI&DS",
        "B.E. CSE - 2nd Year"
      ],
      "pg": [
        "M.E. Computer Science"
      ]
    }
  }
},
{
  "id": "oop-exp-2",
  "labId": "oops-java",
  "title": "Exp 2: Bank Account Application (Deposit, Withdrawal, and Balance Enquiry)",
  "slug": "oop-exp-2-bank-account-encapsulation",
  "difficulty": "Beginner",
  "category": "Java OOP",
  "estimatedMinutes": 30,
  "rating": 4.95,
  "ratingsCount": 230,
  "simulator": "custom",
  "quizId": "quiz-oop-2",
  "sections": {
    "introduction": "To develop a Java application to create bank accounts and perform deposit, withdrawal, and balance enquiry operations.",
    "objective": "To develop a Java application to create bank accounts and perform deposit, withdrawal, and balance enquiry operations.",
    "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    "videoTitle": "Java OOP: Exp 2: Bank Account Application (Deposit, Withdrawal, and Balance Enquiry)",
    "videoChannel": "Java Programming Master Academy",
    "prerequisites": [
      "Core Java Syntax",
      "OOP Principles"
    ],
    "theory": {
      "overview": "This experiment implements Exp 2: Bank Account Application (Deposit, Withdrawal, and Balance Enquiry) adhering to the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
      "keyConcepts": [
        {
          "title": "Encapsulation & Abstraction",
          "desc": "Hiding internal object representation and exposing a clean public interface."
        },
        {
          "title": "Inheritance & Reusability",
          "desc": "Deriving specialized classes and method overriding."
        },
        {
          "title": "Robust Error Handling",
          "desc": "Checked/unchecked exceptions and resource safety."
        }
      ],
      "complexities": [
        {
          "operation": "Object Method Invocation",
          "best": "O(1)",
          "avg": "O(1)",
          "worst": "O(1)",
          "space": "O(1)"
        }
      ],
      "realWorldApplications": [
        "Enterprise banking and payroll transaction architectures",
        "E-commerce product catalog and order checkout engines",
        "Large-scale enterprise software architectures powered by Java frameworks"
      ]
    },
    "procedure": [
      "1. Start the program.",
      "2. Define an Account class with account number, holder name, and balance.",
      "3. Define methods for deposit, withdrawal, and balance inquiry.",
      "4. In deposit method, add the amount to balance and print updated balance.",
      "5. In withdrawal method, check whether the balance is sufficient.",
      "6. If sufficient, deduct amount from balance; otherwise display an error message.",
      "7. In balance inquiry method, display current balance.",
      "8. Create an object of Account class and invoke methods via an interactive menu.",
      "9. Stop the program."
    ],
    "sampleCode": {
      "language": "java",
      "code": "import java.util.Scanner;\n\nclass BankAccount {\n    private String accNo;\n    private String holderName;\n    private double balance;\n\n    public BankAccount(String accNo, String holderName, double initialBalance) {\n        this.accNo = accNo;\n        this.holderName = holderName;\n        this.balance = initialBalance;\n    }\n\n    public void deposit(double amount) {\n        if (amount > 0) {\n            balance += amount;\n            System.out.println(\"Successfully deposited Rs. \" + amount);\n        } else {\n            System.out.println(\"Invalid deposit amount!\");\n        }\n    }\n\n    public void withdraw(double amount) {\n        if (amount > balance) {\n            System.out.println(\"Error: Insufficient balance! Current Balance: Rs. \" + balance);\n        } else if (amount <= 0) {\n            System.out.println(\"Invalid withdrawal amount!\");\n        } else {\n            balance -= amount;\n            System.out.println(\"Successfully withdrew Rs. \" + amount);\n        }\n    }\n\n    public void displayBalance() {\n        System.out.println(\"Account: \" + accNo + \" | Holder: \" + holderName + \" | Balance: Rs. \" + balance);\n    }\n}\n\npublic class BankingApp {\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount(\"SB100234\", \"Priya Nair\", 10000.0);\n        acc.displayBalance();\n        acc.deposit(2500.0);\n        acc.withdraw(4000.0);\n        acc.withdraw(12000.0);\n        acc.displayBalance();\n    }\n}"
    },
    "expectedOutput": "Account: SB100234 | Holder: Priya Nair | Balance: Rs. 10000.0\nSuccessfully deposited Rs. 2500.0\nSuccessfully withdrew Rs. 4000.0\nError: Insufficient balance! Current Balance: Rs. 8500.0\nAccount: SB100234 | Holder: Priya Nair | Balance: Rs. 8500.0",
    "leetcodeProblems": [],
    "targetAudience": {
      "ug": [
        "B.Tech AI&DS",
        "B.E. CSE - 2nd Year"
      ],
      "pg": [
        "M.E. Computer Science"
      ]
    }
  }
},
{
  "id": "oop-exp-3",
  "labId": "oops-java",
  "title": "Exp 3: Product Catalog Using Classes and Objects",
  "slug": "oop-exp-3-product-catalog",
  "difficulty": "Beginner",
  "category": "Java OOP",
  "estimatedMinutes": 30,
  "rating": 4.95,
  "ratingsCount": 235,
  "simulator": "custom",
  "quizId": "quiz-oop-3",
  "sections": {
    "introduction": "To create a product catalog using classes and objects to store product name, price, and stock details.",
    "objective": "To create a product catalog using classes and objects to store product name, price, and stock details.",
    "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    "videoTitle": "Java OOP: Exp 3: Product Catalog Using Classes and Objects",
    "videoChannel": "Java Programming Master Academy",
    "prerequisites": [
      "Core Java Syntax",
      "OOP Principles"
    ],
    "theory": {
      "overview": "This experiment implements Exp 3: Product Catalog Using Classes and Objects adhering to the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
      "keyConcepts": [
        {
          "title": "Encapsulation & Abstraction",
          "desc": "Hiding internal object representation and exposing a clean public interface."
        },
        {
          "title": "Inheritance & Reusability",
          "desc": "Deriving specialized classes and method overriding."
        },
        {
          "title": "Robust Error Handling",
          "desc": "Checked/unchecked exceptions and resource safety."
        }
      ],
      "complexities": [
        {
          "operation": "Object Method Invocation",
          "best": "O(1)",
          "avg": "O(1)",
          "worst": "O(1)",
          "space": "O(1)"
        }
      ],
      "realWorldApplications": [
        "Enterprise banking and payroll transaction architectures",
        "E-commerce product catalog and order checkout engines",
        "Large-scale enterprise software architectures powered by Java frameworks"
      ]
    },
    "procedure": [
      "1. Start the program.",
      "2. Define Product class with id, name, price, and stock attributes.",
      "3. Define a constructor to initialize product details.",
      "4. Define a display method to print catalog entries in tabular form.",
      "5. Instantiate an array of Product objects and populate values.",
      "6. Loop through array to print the catalog and stop the program."
    ],
    "sampleCode": {
      "language": "java",
      "code": "class Product {\n    int id;\n    String name;\n    double price;\n    int stock;\n\n    Product(int id, String name, double price, int stock) {\n        this.id = id;\n        this.name = name;\n        this.price = price;\n        this.stock = stock;\n    }\n\n    void display() {\n        System.out.printf(\"%-5d %-20s Rs.%-10.2f %-5d\\n\", id, name, price, stock);\n    }\n}\n\npublic class ProductCatalog {\n    public static void main(String[] args) {\n        Product[] catalog = {\n            new Product(101, \"Wireless Mouse\", 550.00, 25),\n            new Product(102, \"Mechanical Keyboard\", 2200.00, 10),\n            new Product(103, \"USB-C Hub\", 1100.00, 15),\n            new Product(104, \"Gaming Headset\", 3200.00, 8)\n        };\n\n        System.out.printf(\"%-5s %-20s %-12s %-5s\\n\", \"ID\", \"Product Name\", \"Price\", \"Stock\");\n        System.out.println(\"--------------------------------------------------\");\n        for (Product p : catalog) {\n            p.display();\n        }\n    }\n}"
    },
    "expectedOutput": "ID    Product Name         Price        Stock\n--------------------------------------------------\n101   Wireless Mouse       Rs.550.00     25   \n102   Mechanical Keyboard  Rs.2200.00    10   \n103   USB-C Hub            Rs.1100.00    15   \n104   Gaming Headset       Rs.3200.00    8",
    "leetcodeProblems": [],
    "targetAudience": {
      "ug": [
        "B.Tech AI&DS",
        "B.E. CSE - 2nd Year"
      ],
      "pg": [
        "M.E. Computer Science"
      ]
    }
  }
},
{
  "id": "oop-exp-4",
  "labId": "oops-java",
  "title": "Exp 4: Gross Salary, Deductions, and Net Salary Calculation",
  "slug": "oop-exp-4-salary-calculation",
  "difficulty": "Beginner",
  "category": "Java OOP",
  "estimatedMinutes": 30,
  "rating": 4.95,
  "ratingsCount": 240,
  "simulator": "custom",
  "quizId": "quiz-oop-4",
  "sections": {
    "introduction": "To calculate gross salary, deductions, and net salary using operators and input/output statements.",
    "objective": "To calculate gross salary, deductions, and net salary using operators and input/output statements.",
    "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    "videoTitle": "Java OOP: Exp 4: Gross Salary, Deductions, and Net Salary Calculation",
    "videoChannel": "Java Programming Master Academy",
    "prerequisites": [
      "Core Java Syntax",
      "OOP Principles"
    ],
    "theory": {
      "overview": "This experiment implements Exp 4: Gross Salary, Deductions, and Net Salary Calculation adhering to the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
      "keyConcepts": [
        {
          "title": "Encapsulation & Abstraction",
          "desc": "Hiding internal object representation and exposing a clean public interface."
        },
        {
          "title": "Inheritance & Reusability",
          "desc": "Deriving specialized classes and method overriding."
        },
        {
          "title": "Robust Error Handling",
          "desc": "Checked/unchecked exceptions and resource safety."
        }
      ],
      "complexities": [
        {
          "operation": "Object Method Invocation",
          "best": "O(1)",
          "avg": "O(1)",
          "worst": "O(1)",
          "space": "O(1)"
        }
      ],
      "realWorldApplications": [
        "Enterprise banking and payroll transaction architectures",
        "E-commerce product catalog and order checkout engines",
        "Large-scale enterprise software architectures powered by Java frameworks"
      ]
    },
    "procedure": [
      "1. Start the program.",
      "2. Read basic pay from user.",
      "3. Compute Dearness Allowance (DA = 40% of basic).",
      "4. Compute House Rent Allowance (HRA = 20% of basic).",
      "5. Calculate Gross Salary = Basic + DA + HRA.",
      "6. Calculate Deductions = Provident Fund (PF = 12% of basic).",
      "7. Calculate Net Salary = Gross Salary - Deductions.",
      "8. Display itemized salary breakdown.",
      "9. Stop the program."
    ],
    "sampleCode": {
      "language": "java",
      "code": "import java.util.Scanner;\n\npublic class SalaryCalculator {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"Enter Basic Pay: \");\n        double basic = sc.nextDouble();\n\n        double da = 0.40 * basic;\n        double hra = 0.20 * basic;\n        double gross = basic + da + hra;\n        double pf = 0.12 * basic;\n        double net = gross - pf;\n\n        System.out.println(\"\\n--- Salary Pay Slip ---\");\n        System.out.println(\"Basic Pay   : Rs. \" + basic);\n        System.out.println(\"DA (40%)    : Rs. \" + da);\n        System.out.println(\"HRA (20%)   : Rs. \" + hra);\n        System.out.println(\"Gross Salary: Rs. \" + gross);\n        System.out.println(\"PF (12%)    : Rs. \" + pf);\n        System.out.println(\"Net Salary  : Rs. \" + net);\n    }\n}"
    },
    "expectedOutput": "Enter Basic Pay: 35000\n\n--- Salary Pay Slip ---\nBasic Pay   : Rs. 35000.0\nDA (40%)    : Rs. 14000.0\nHRA (20%)   : Rs. 7000.0\nGross Salary: Rs. 56000.0\nPF (12%)    : Rs. 4200.0\nNet Salary  : Rs. 51800.0",
    "leetcodeProblems": [],
    "targetAudience": {
      "ug": [
        "B.Tech AI&DS",
        "B.E. CSE - 2nd Year"
      ],
      "pg": [
        "M.E. Computer Science"
      ]
    }
  }
},
{
  "id": "oop-exp-5",
  "labId": "oops-java",
  "title": "Exp 5: Minimum Balance and Withdrawal Eligibility Checker",
  "slug": "oop-exp-5-minimum-balance-check",
  "difficulty": "Beginner",
  "category": "Java OOP",
  "estimatedMinutes": 30,
  "rating": 4.95,
  "ratingsCount": 245,
  "simulator": "custom",
  "quizId": "quiz-oop-5",
  "sections": {
    "introduction": "To use conditional statements to check minimum balance and withdrawal eligibility.",
    "objective": "To use conditional statements to check minimum balance and withdrawal eligibility.",
    "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    "videoTitle": "Java OOP: Exp 5: Minimum Balance and Withdrawal Eligibility Checker",
    "videoChannel": "Java Programming Master Academy",
    "prerequisites": [
      "Core Java Syntax",
      "OOP Principles"
    ],
    "theory": {
      "overview": "This experiment implements Exp 5: Minimum Balance and Withdrawal Eligibility Checker adhering to the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
      "keyConcepts": [
        {
          "title": "Encapsulation & Abstraction",
          "desc": "Hiding internal object representation and exposing a clean public interface."
        },
        {
          "title": "Inheritance & Reusability",
          "desc": "Deriving specialized classes and method overriding."
        },
        {
          "title": "Robust Error Handling",
          "desc": "Checked/unchecked exceptions and resource safety."
        }
      ],
      "complexities": [
        {
          "operation": "Object Method Invocation",
          "best": "O(1)",
          "avg": "O(1)",
          "worst": "O(1)",
          "space": "O(1)"
        }
      ],
      "realWorldApplications": [
        "Enterprise banking and payroll transaction architectures",
        "E-commerce product catalog and order checkout engines",
        "Large-scale enterprise software architectures powered by Java frameworks"
      ]
    },
    "procedure": [
      "1. Start the program.",
      "2. Define minimum balance threshold (e.g., Rs. 1000).",
      "3. Read current balance and requested withdrawal amount.",
      "4. Check if (current balance - withdrawal amount) >= minimum balance.",
      "5. If true, approve transaction and update balance.",
      "6. Else, reject transaction and show minimum balance violation message.",
      "7. Display final account status.",
      "8. Stop the program."
    ],
    "sampleCode": {
      "language": "java",
      "code": "import java.util.Scanner;\n\npublic class MinimumBalanceChecker {\n    public static final double MIN_BALANCE = 1000.0;\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"Enter Current Balance: \");\n        double currentBalance = sc.nextDouble();\n        System.out.print(\"Enter Withdrawal Amount: \");\n        double withdrawAmount = sc.nextDouble();\n\n        if (withdrawAmount <= 0) {\n            System.out.println(\"Invalid withdrawal amount.\");\n        } else if ((currentBalance - withdrawAmount) < MIN_BALANCE) {\n            System.out.println(\"Transaction Rejected! Minimum balance of Rs. \" + MIN_BALANCE + \" must be maintained.\");\n            System.out.println(\"Maximum eligible withdrawal: Rs. \" + (currentBalance - MIN_BALANCE));\n        } else {\n            currentBalance -= withdrawAmount;\n            System.out.println(\"Transaction Approved! Remaining Balance: Rs. \" + currentBalance);\n        }\n    }\n}"
    },
    "expectedOutput": "Enter Current Balance: 5000\nEnter Withdrawal Amount: 4500\nTransaction Rejected! Minimum balance of Rs. 1000.0 must be maintained.\nMaximum eligible withdrawal: Rs. 4000.0",
    "leetcodeProblems": [],
    "targetAudience": {
      "ug": [
        "B.Tech AI&DS",
        "B.E. CSE - 2nd Year"
      ],
      "pg": [
        "M.E. Computer Science"
      ]
    }
  }
},
{
  "id": "oop-exp-6",
  "labId": "oops-java",
  "title": "Exp 6: OTP Generation and Verification Using Loops and Decisions",
  "slug": "oop-exp-6-otp-generation-verification",
  "difficulty": "Intermediate",
  "category": "Java OOP",
  "estimatedMinutes": 30,
  "rating": 4.95,
  "ratingsCount": 250,
  "simulator": "custom",
  "quizId": "quiz-oop-6",
  "sections": {
    "introduction": "To implement OTP generation and verification using loops and decision-making statements.",
    "objective": "To implement OTP generation and verification using loops and decision-making statements.",
    "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    "videoTitle": "Java OOP: Exp 6: OTP Generation and Verification Using Loops and Decisions",
    "videoChannel": "Java Programming Master Academy",
    "prerequisites": [
      "Core Java Syntax",
      "OOP Principles"
    ],
    "theory": {
      "overview": "This experiment implements Exp 6: OTP Generation and Verification Using Loops and Decisions adhering to the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
      "keyConcepts": [
        {
          "title": "Encapsulation & Abstraction",
          "desc": "Hiding internal object representation and exposing a clean public interface."
        },
        {
          "title": "Inheritance & Reusability",
          "desc": "Deriving specialized classes and method overriding."
        },
        {
          "title": "Robust Error Handling",
          "desc": "Checked/unchecked exceptions and resource safety."
        }
      ],
      "complexities": [
        {
          "operation": "Object Method Invocation",
          "best": "O(1)",
          "avg": "O(1)",
          "worst": "O(1)",
          "space": "O(1)"
        }
      ],
      "realWorldApplications": [
        "Enterprise banking and payroll transaction architectures",
        "E-commerce product catalog and order checkout engines",
        "Large-scale enterprise software architectures powered by Java frameworks"
      ]
    },
    "procedure": [
      "1. Start the program.",
      "2. Generate a 6-digit pseudo-random OTP using Math.random().",
      "3. Prompt the user to enter the generated OTP within 3 attempts.",
      "4. Compare entered OTP with generated OTP using a while loop.",
      "5. If correct, display verification successful and terminate loop.",
      "6. If incorrect, decrement attempts left and re-prompt.",
      "7. If attempts reach 0, lock account temporarily.",
      "8. Stop the program."
    ],
    "sampleCode": {
      "language": "java",
      "code": "import java.util.Scanner;\n\npublic class OTPVerification {\n    public static void main(String[] args) {\n        int otp = 100000 + (int)(Math.random() * 900000);\n        System.out.println(\"[SYSTEM SMS] Your One-Time Password is: \" + otp);\n\n        Scanner sc = new Scanner(System.in);\n        int attempts = 3;\n        boolean verified = false;\n\n        while (attempts > 0) {\n            System.out.print(\"Enter 6-digit OTP (Attempts left: \" + attempts + \"): \");\n            int userOtp = sc.nextInt();\n\n            if (userOtp == otp) {\n                System.out.println(\"Authentication Successful! Access Granted.\");\n                verified = true;\n                break;\n            } else {\n                attempts--;\n                System.out.println(\"Incorrect OTP!\");\n            }\n        }\n\n        if (!verified) {\n            System.out.println(\"Authentication Failed! Account locked for 15 minutes.\");\n        }\n    }\n}"
    },
    "expectedOutput": "[SYSTEM SMS] Your One-Time Password is: 742189\nEnter 6-digit OTP (Attempts left: 3): 123456\nIncorrect OTP!\nEnter 6-digit OTP (Attempts left: 2): 742189\nAuthentication Successful! Access Granted.",
    "leetcodeProblems": [],
    "targetAudience": {
      "ug": [
        "B.Tech AI&DS",
        "B.E. CSE - 2nd Year"
      ],
      "pg": [
        "M.E. Computer Science"
      ]
    }
  }
},
{
  "id": "oop-exp-7",
  "labId": "oops-java",
  "title": "Exp 7: Classes, Constructors, Inheritance, and Method Overriding (Employee Payroll)",
  "slug": "oop-exp-7-employee-payroll-inheritance",
  "difficulty": "Intermediate",
  "category": "Java OOP",
  "estimatedMinutes": 30,
  "rating": 4.95,
  "ratingsCount": 255,
  "simulator": "custom",
  "quizId": "quiz-oop-7",
  "sections": {
    "introduction": "To demonstrate classes, constructors, inheritance, and method overriding to generate employee payroll details.",
    "objective": "To demonstrate classes, constructors, inheritance, and method overriding to generate employee payroll details.",
    "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    "videoTitle": "Java OOP: Exp 7: Classes, Constructors, Inheritance, and Method Overriding (Employee Payroll)",
    "videoChannel": "Java Programming Master Academy",
    "prerequisites": [
      "Core Java Syntax",
      "OOP Principles"
    ],
    "theory": {
      "overview": "This experiment implements Exp 7: Classes, Constructors, Inheritance, and Method Overriding (Employee Payroll) adhering to the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
      "keyConcepts": [
        {
          "title": "Encapsulation & Abstraction",
          "desc": "Hiding internal object representation and exposing a clean public interface."
        },
        {
          "title": "Inheritance & Reusability",
          "desc": "Deriving specialized classes and method overriding."
        },
        {
          "title": "Robust Error Handling",
          "desc": "Checked/unchecked exceptions and resource safety."
        }
      ],
      "complexities": [
        {
          "operation": "Object Method Invocation",
          "best": "O(1)",
          "avg": "O(1)",
          "worst": "O(1)",
          "space": "O(1)"
        }
      ],
      "realWorldApplications": [
        "Enterprise banking and payroll transaction architectures",
        "E-commerce product catalog and order checkout engines",
        "Large-scale enterprise software architectures powered by Java frameworks"
      ]
    },
    "procedure": [
      "1. Start the program.",
      "2. Create base class Employee with id, name, and basic pay.",
      "3. Define calculateSalary() in Employee.",
      "4. Create derived class Manager extending Employee with bonus allowance.",
      "5. Override calculateSalary() in Manager using super.calculateSalary().",
      "6. Create derived class Developer extending Employee with overtime compensation.",
      "7. Demonstrate polymorphic payroll processing using base class references.",
      "8. Stop the program."
    ],
    "sampleCode": {
      "language": "java",
      "code": "class Employee {\n    int id;\n    String name;\n    double basicPay;\n\n    Employee(int id, String name, double basicPay) {\n        this.id = id;\n        this.name = name;\n        this.basicPay = basicPay;\n    }\n\n    double calculateSalary() {\n        return basicPay;\n    }\n\n    void displayPayroll() {\n        System.out.println(id + \" | \" + name + \" | Total Compensation: Rs. \" + calculateSalary());\n    }\n}\n\nclass Manager extends Employee {\n    double allowance;\n\n    Manager(int id, String name, double basicPay, double allowance) {\n        super(id, name, basicPay);\n        this.allowance = allowance;\n    }\n\n    @Override\n    double calculateSalary() {\n        return basicPay + allowance;\n    }\n}\n\nclass Developer extends Employee {\n    int overtimeHours;\n    double hourlyRate;\n\n    Developer(int id, String name, double basicPay, int overtimeHours, double hourlyRate) {\n        super(id, name, basicPay);\n        this.overtimeHours = overtimeHours;\n        this.hourlyRate = hourlyRate;\n    }\n\n    @Override\n    double calculateSalary() {\n        return basicPay + (overtimeHours * hourlyRate);\n    }\n}\n\npublic class PayrollSystem {\n    public static void main(String[] args) {\n        Employee e1 = new Manager(201, \"Anitha Devi\", 65000, 15000);\n        Employee e2 = new Developer(202, \"Karthik Raja\", 45000, 20, 500);\n\n        System.out.println(\"--- Employee Payroll ---\");\n        e1.displayPayroll();\n        e2.displayPayroll();\n    }\n}"
    },
    "expectedOutput": "--- Employee Payroll ---\n201 | Anitha Devi | Total Compensation: Rs. 80000.0\n202 | Karthik Raja | Total Compensation: Rs. 55000.0",
    "leetcodeProblems": [],
    "targetAudience": {
      "ug": [
        "B.Tech AI&DS",
        "B.E. CSE - 2nd Year"
      ],
      "pg": [
        "M.E. Computer Science"
      ]
    }
  }
},
{
  "id": "oop-exp-8",
  "labId": "oops-java",
  "title": "Exp 8: Inheritance Hierarchy for Student, Faculty, and Course Classes",
  "slug": "oop-exp-8-university-inheritance-hierarchy",
  "difficulty": "Intermediate",
  "category": "Java OOP",
  "estimatedMinutes": 30,
  "rating": 4.95,
  "ratingsCount": 260,
  "simulator": "custom",
  "quizId": "quiz-oop-8",
  "sections": {
    "introduction": "To implement inheritance for Student, Faculty, and Course classes.",
    "objective": "To implement inheritance for Student, Faculty, and Course classes.",
    "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    "videoTitle": "Java OOP: Exp 8: Inheritance Hierarchy for Student, Faculty, and Course Classes",
    "videoChannel": "Java Programming Master Academy",
    "prerequisites": [
      "Core Java Syntax",
      "OOP Principles"
    ],
    "theory": {
      "overview": "This experiment implements Exp 8: Inheritance Hierarchy for Student, Faculty, and Course Classes adhering to the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
      "keyConcepts": [
        {
          "title": "Encapsulation & Abstraction",
          "desc": "Hiding internal object representation and exposing a clean public interface."
        },
        {
          "title": "Inheritance & Reusability",
          "desc": "Deriving specialized classes and method overriding."
        },
        {
          "title": "Robust Error Handling",
          "desc": "Checked/unchecked exceptions and resource safety."
        }
      ],
      "complexities": [
        {
          "operation": "Object Method Invocation",
          "best": "O(1)",
          "avg": "O(1)",
          "worst": "O(1)",
          "space": "O(1)"
        }
      ],
      "realWorldApplications": [
        "Enterprise banking and payroll transaction architectures",
        "E-commerce product catalog and order checkout engines",
        "Large-scale enterprise software architectures powered by Java frameworks"
      ]
    },
    "procedure": [
      "1. Start the program.",
      "2. Create base class Person with name and email.",
      "3. Derive Student from Person with rollNumber and semester.",
      "4. Derive Faculty from Person with employeeId and department.",
      "5. Create Course class with courseCode and enrolled Student/assigned Faculty.",
      "6. Instantiate and display university entity details.",
      "7. Stop the program."
    ],
    "sampleCode": {
      "language": "java",
      "code": "class Person {\n    String name;\n    String email;\n\n    Person(String name, String email) {\n        this.name = name;\n        this.email = email;\n    }\n\n    void display() {\n        System.out.println(\"Name: \" + name + \" | Email: \" + email);\n    }\n}\n\nclass Student extends Person {\n    String rollNumber;\n    int semester;\n\n    Student(String name, String email, String rollNumber, int semester) {\n        super(name, email);\n        this.rollNumber = rollNumber;\n        this.semester = semester;\n    }\n\n    @Override\n    void display() {\n        System.out.println(\"[STUDENT] \" + name + \" | Roll: \" + rollNumber + \" | Sem: \" + semester + \" | \" + email);\n    }\n}\n\nclass Faculty extends Person {\n    String empId;\n    String department;\n\n    Faculty(String name, String email, String empId, String department) {\n        super(name, email);\n        this.empId = empId;\n        this.department = department;\n    }\n\n    @Override\n    void display() {\n        System.out.println(\"[FACULTY] \" + name + \" | ID: \" + empId + \" | Dept: \" + department + \" | \" + email);\n    }\n}\n\npublic class UniversityHierarchy {\n    public static void main(String[] args) {\n        Person s = new Student(\"Sivakumar M\", \"siva@vsb.ac.in\", \"922521104012\", 4);\n        Person f = new Faculty(\"Dr. S. Meenakshi\", \"meenakshi@vsb.ac.in\", \"FAC045\", \"AI & DS\");\n\n        s.display();\n        f.display();\n    }\n}"
    },
    "expectedOutput": "[STUDENT] Sivakumar M | Roll: 922521104012 | Sem: 4 | siva@vsb.ac.in\n[FACULTY] Dr. S. Meenakshi | ID: FAC045 | Dept: AI & DS | meenakshi@vsb.ac.in",
    "leetcodeProblems": [],
    "targetAudience": {
      "ug": [
        "B.Tech AI&DS",
        "B.E. CSE - 2nd Year"
      ],
      "pg": [
        "M.E. Computer Science"
      ]
    }
  }
},
{
  "id": "oop-exp-9",
  "labId": "oops-java",
  "title": "Exp 9: Recursive Functions (Factorial & Fibonacci) and Overloading/Overriding",
  "slug": "oop-exp-9-recursion-overloading-overriding",
  "difficulty": "Intermediate",
  "category": "Java OOP",
  "estimatedMinutes": 30,
  "rating": 4.95,
  "ratingsCount": 265,
  "simulator": "custom",
  "quizId": "quiz-oop-9",
  "sections": {
    "introduction": "To implement recursive functions (Factorial and Fibonacci) and demonstrate method overloading and overriding.",
    "objective": "To implement recursive functions (Factorial and Fibonacci) and demonstrate method overloading and overriding.",
    "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    "videoTitle": "Java OOP: Exp 9: Recursive Functions (Factorial & Fibonacci) and Overloading/Overriding",
    "videoChannel": "Java Programming Master Academy",
    "prerequisites": [
      "Core Java Syntax",
      "OOP Principles"
    ],
    "theory": {
      "overview": "This experiment implements Exp 9: Recursive Functions (Factorial & Fibonacci) and Overloading/Overriding adhering to the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
      "keyConcepts": [
        {
          "title": "Encapsulation & Abstraction",
          "desc": "Hiding internal object representation and exposing a clean public interface."
        },
        {
          "title": "Inheritance & Reusability",
          "desc": "Deriving specialized classes and method overriding."
        },
        {
          "title": "Robust Error Handling",
          "desc": "Checked/unchecked exceptions and resource safety."
        }
      ],
      "complexities": [
        {
          "operation": "Object Method Invocation",
          "best": "O(1)",
          "avg": "O(1)",
          "worst": "O(1)",
          "space": "O(1)"
        }
      ],
      "realWorldApplications": [
        "Enterprise banking and payroll transaction architectures",
        "E-commerce product catalog and order checkout engines",
        "Large-scale enterprise software architectures powered by Java frameworks"
      ]
    },
    "procedure": [
      "1. Start the program.",
      "2. Define recursive method factorial(int n): if n<=1 return 1, else n * factorial(n-1).",
      "3. Define recursive method fibonacci(int n): if n<=1 return n, else fib(n-1) + fib(n-2).",
      "4. Overload add() method for both integer and floating-point parameters.",
      "5. Override add() in a subclass to customize calculation message.",
      "6. Execute and test recursion and polymorphism.",
      "7. Stop the program."
    ],
    "sampleCode": {
      "language": "java",
      "code": "class MathOperations {\n    int add(int a, int b) {\n        return a + b;\n    }\n\n    double add(double a, double b) {\n        return a + b;\n    }\n\n    int factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n\n    int fibonacci(int n) {\n        if (n <= 1) return n;\n        return fibonacci(n - 1) + fibonacci(n - 2);\n    }\n}\n\nclass AdvancedMath extends MathOperations {\n    @Override\n    int add(int a, int b) {\n        System.out.println(\"[Custom Subclass Add Method]\");\n        return super.add(a, b);\n    }\n}\n\npublic class RecursionPolymorphismDemo {\n    public static void main(String[] args) {\n        AdvancedMath math = new AdvancedMath();\n        System.out.println(\"Overloaded add(5, 10): \" + math.add(5, 10));\n        System.out.println(\"Overloaded add(3.5, 4.2): \" + math.add(3.5, 4.2));\n        System.out.println(\"Recursive Factorial of 5: \" + math.factorial(5));\n        System.out.print(\"First 7 Fibonacci numbers: \");\n        for (int i = 0; i < 7; i++) {\n            System.out.print(math.fibonacci(i) + \" \");\n        }\n        System.out.println();\n    }\n}"
    },
    "expectedOutput": "[Custom Subclass Add Method]\nOverloaded add(5, 10): 15\nOverloaded add(3.5, 4.2): 7.7\nRecursive Factorial of 5: 120\nFirst 7 Fibonacci numbers: 0 1 1 2 3 5 8",
    "leetcodeProblems": [],
    "targetAudience": {
      "ug": [
        "B.Tech AI&DS",
        "B.E. CSE - 2nd Year"
      ],
      "pg": [
        "M.E. Computer Science"
      ]
    }
  }
},
{
  "id": "oop-exp-10",
  "labId": "oops-java",
  "title": "Exp 10: Matrix Addition, Subtraction, Transpose, and Multiplication",
  "slug": "oop-exp-10-matrix-operations",
  "difficulty": "Intermediate",
  "category": "Java OOP",
  "estimatedMinutes": 30,
  "rating": 4.95,
  "ratingsCount": 270,
  "simulator": "custom",
  "quizId": "quiz-oop-10",
  "sections": {
    "introduction": "To perform matrix addition, subtraction, transpose, and multiplication.",
    "objective": "To perform matrix addition, subtraction, transpose, and multiplication.",
    "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    "videoTitle": "Java OOP: Exp 10: Matrix Addition, Subtraction, Transpose, and Multiplication",
    "videoChannel": "Java Programming Master Academy",
    "prerequisites": [
      "Core Java Syntax",
      "OOP Principles"
    ],
    "theory": {
      "overview": "This experiment implements Exp 10: Matrix Addition, Subtraction, Transpose, and Multiplication adhering to the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
      "keyConcepts": [
        {
          "title": "Encapsulation & Abstraction",
          "desc": "Hiding internal object representation and exposing a clean public interface."
        },
        {
          "title": "Inheritance & Reusability",
          "desc": "Deriving specialized classes and method overriding."
        },
        {
          "title": "Robust Error Handling",
          "desc": "Checked/unchecked exceptions and resource safety."
        }
      ],
      "complexities": [
        {
          "operation": "Object Method Invocation",
          "best": "O(1)",
          "avg": "O(1)",
          "worst": "O(1)",
          "space": "O(1)"
        }
      ],
      "realWorldApplications": [
        "Enterprise banking and payroll transaction architectures",
        "E-commerce product catalog and order checkout engines",
        "Large-scale enterprise software architectures powered by Java frameworks"
      ]
    },
    "procedure": [
      "1. Start the program.",
      "2. Read dimensions and elements for matrices A and B.",
      "3. For Addition & Subtraction: verify matching dimensions and perform element-wise arithmetic.",
      "4. For Transpose: swap rows and columns: T[j][i] = A[i][j].",
      "5. For Multiplication: verify cols(A) == rows(B) and compute dot product sum(A[i][k] * B[k][j]).",
      "6. Print resulting matrices.",
      "7. Stop the program."
    ],
    "sampleCode": {
      "language": "java",
      "code": "public class MatrixOperations {\n    public static void printMatrix(String title, int[][] m) {\n        System.out.println(title + \":\");\n        for (int[] row : m) {\n            for (int val : row) {\n                System.out.printf(\"%4d\", val);\n            }\n            System.out.println();\n        }\n    }\n\n    public static void main(String[] args) {\n        int[][] A = {{1, 2}, {3, 4}};\n        int[][] B = {{5, 6}, {7, 8}};\n\n        int[][] sum = new int[2][2];\n        int[][] diff = new int[2][2];\n        int[][] trans = new int[2][2];\n        int[][] prod = new int[2][2];\n\n        for (int i = 0; i < 2; i++) {\n            for (int j = 0; j < 2; j++) {\n                sum[i][j] = A[i][j] + B[i][j];\n                diff[i][j] = A[i][j] - B[i][j];\n                trans[i][j] = A[j][i];\n                for (int k = 0; k < 2; k++) {\n                    prod[i][j] += A[i][k] * B[k][j];\n                }\n            }\n        }\n\n        printMatrix(\"Matrix A\", A);\n        printMatrix(\"Matrix B\", B);\n        printMatrix(\"Addition (A + B)\", sum);\n        printMatrix(\"Subtraction (A - B)\", diff);\n        printMatrix(\"Transpose of A\", trans);\n        printMatrix(\"Multiplication (A x B)\", prod);\n    }\n}"
    },
    "expectedOutput": "Matrix A:\n   1   2\n   3   4\nMatrix B:\n   5   6\n   7   8\nAddition (A + B):\n   6   8\n  10  12\nSubtraction (A - B):\n  -4  -4\n  -4  -4\nTranspose of A:\n   1   3\n   2   4\nMultiplication (A x B):\n  19  22\n  43  50",
    "leetcodeProblems": [],
    "targetAudience": {
      "ug": [
        "B.Tech AI&DS",
        "B.E. CSE - 2nd Year"
      ],
      "pg": [
        "M.E. Computer Science"
      ]
    }
  }
},
{
  "id": "oop-exp-11",
  "labId": "oops-java",
  "title": "Exp 11: Print 2D Matrix in Spiral Order and Wave Order",
  "slug": "oop-exp-11-matrix-spiral-wave-traversal",
  "difficulty": "Advanced",
  "category": "Java OOP",
  "estimatedMinutes": 30,
  "rating": 4.95,
  "ratingsCount": 275,
  "simulator": "custom",
  "quizId": "quiz-oop-11",
  "sections": {
    "introduction": "To print the elements of a 2D matrix in Spiral Order and Wave Order.",
    "objective": "To print the elements of a 2D matrix in Spiral Order and Wave Order.",
    "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    "videoTitle": "Java OOP: Exp 11: Print 2D Matrix in Spiral Order and Wave Order",
    "videoChannel": "Java Programming Master Academy",
    "prerequisites": [
      "Core Java Syntax",
      "OOP Principles"
    ],
    "theory": {
      "overview": "This experiment implements Exp 11: Print 2D Matrix in Spiral Order and Wave Order adhering to the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
      "keyConcepts": [
        {
          "title": "Encapsulation & Abstraction",
          "desc": "Hiding internal object representation and exposing a clean public interface."
        },
        {
          "title": "Inheritance & Reusability",
          "desc": "Deriving specialized classes and method overriding."
        },
        {
          "title": "Robust Error Handling",
          "desc": "Checked/unchecked exceptions and resource safety."
        }
      ],
      "complexities": [
        {
          "operation": "Object Method Invocation",
          "best": "O(1)",
          "avg": "O(1)",
          "worst": "O(1)",
          "space": "O(1)"
        }
      ],
      "realWorldApplications": [
        "Enterprise banking and payroll transaction architectures",
        "E-commerce product catalog and order checkout engines",
        "Large-scale enterprise software architectures powered by Java frameworks"
      ]
    },
    "procedure": [
      "1. Start the program.",
      "2. Initialize a 2D matrix.",
      "3. Spiral Traversal: maintain top, bottom, left, right bounds.",
      "4. Traverse top row left-to-right, right column top-to-bottom, bottom row right-to-left, left column bottom-to-top.",
      "5. Shrink bounds after each direction until boundaries cross.",
      "6. Wave Traversal: traverse column by column; even columns top-to-bottom, odd columns bottom-to-top.",
      "7. Print the resulting traversals.",
      "8. Stop the program."
    ],
    "sampleCode": {
      "language": "java",
      "code": "public class MatrixTraversal {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3, 4},\n            {5, 6, 7, 8},\n            {9, 10, 11, 12},\n            {13, 14, 15, 16}\n        };\n\n        System.out.println(\"Spiral Order:\");\n        int top = 0, bottom = matrix.length - 1;\n        int left = 0, right = matrix[0].length - 1;\n\n        while (top <= bottom && left <= right) {\n            for (int i = left; i <= right; i++) System.out.print(matrix[top][i] + \" \");\n            top++;\n            for (int i = top; i <= bottom; i++) System.out.print(matrix[i][right] + \" \");\n            right--;\n            if (top <= bottom) {\n                for (int i = right; i >= left; i--) System.out.print(matrix[bottom][i] + \" \");\n                bottom--;\n            }\n            if (left <= right) {\n                for (int i = bottom; i >= top; i--) System.out.print(matrix[i][left] + \" \");\n                left++;\n            }\n        }\n\n        System.out.println(\"\\n\\nWave Order:\");\n        for (int j = 0; j < matrix[0].length; j++) {\n            if (j % 2 == 0) {\n                for (int i = 0; i < matrix.length; i++) System.out.print(matrix[i][j] + \" \");\n            } else {\n                for (int i = matrix.length - 1; i >= 0; i--) System.out.print(matrix[i][j] + \" \");\n            }\n        }\n        System.out.println();\n    }\n}"
    },
    "expectedOutput": "Spiral Order:\n1 2 3 4 8 12 16 15 14 13 9 5 6 7 11 10 \n\nWave Order:\n1 5 9 13 14 10 6 2 3 7 11 15 16 12 8 4",
    "leetcodeProblems": [],
    "targetAudience": {
      "ug": [
        "B.Tech AI&DS",
        "B.E. CSE - 2nd Year"
      ],
      "pg": [
        "M.E. Computer Science"
      ]
    }
  }
},
{
  "id": "oop-exp-12",
  "labId": "oops-java",
  "title": "Exp 12: Implement Anagram Checking, Pattern Matching, and Kadane's Algorithm",
  "slug": "oop-exp-12-anagram-pattern-matching-kadane-algorithm",
  "difficulty": "Advanced",
  "category": "Java OOP",
  "estimatedMinutes": 30,
  "rating": 4.95,
  "ratingsCount": 280,
  "simulator": "custom",
  "quizId": "quiz-oop-12",
  "sections": {
    "introduction": "To implement Anagram checking, substring Pattern Matching, and Kadane's Algorithm for maximum subarray sum.",
    "objective": "To implement Anagram checking, substring Pattern Matching, and Kadane's Algorithm for maximum subarray sum.",
    "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    "videoTitle": "Java OOP: Exp 12: Implement Anagram Checking, Pattern Matching, and Kadane's Algorithm",
    "videoChannel": "Java Programming Master Academy",
    "prerequisites": [
      "Core Java Syntax",
      "OOP Principles"
    ],
    "theory": {
      "overview": "This experiment implements Exp 12: Implement Anagram Checking, Pattern Matching, and Kadane's Algorithm adhering to the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
      "keyConcepts": [
        {
          "title": "Encapsulation & Abstraction",
          "desc": "Hiding internal object representation and exposing a clean public interface."
        },
        {
          "title": "Inheritance & Reusability",
          "desc": "Deriving specialized classes and method overriding."
        },
        {
          "title": "Robust Error Handling",
          "desc": "Checked/unchecked exceptions and resource safety."
        }
      ],
      "complexities": [
        {
          "operation": "Object Method Invocation",
          "best": "O(1)",
          "avg": "O(1)",
          "worst": "O(1)",
          "space": "O(1)"
        }
      ],
      "realWorldApplications": [
        "Enterprise banking and payroll transaction architectures",
        "E-commerce product catalog and order checkout engines",
        "Large-scale enterprise software architectures powered by Java frameworks"
      ]
    },
    "procedure": [
      "1. Anagram Checking: convert strings to lowercase char arrays, sort them, and compare with Arrays.equals().",
      "2. Pattern Matching: read text and pattern, search using indexOf() and print match positions.",
      "3. Kadane's Algorithm: maintain currentSum and maxSum; add elements iteratively, reset currentSum to 0 if negative.",
      "4. Display results for all three algorithms.",
      "5. Stop the program."
    ],
    "sampleCode": {
      "language": "java",
      "code": "import java.util.Arrays;\n\npublic class AlgorithmsDemo {\n    public static boolean checkAnagram(String s1, String s2) {\n        char[] a = s1.toLowerCase().toCharArray();\n        char[] b = s2.toLowerCase().toCharArray();\n        Arrays.sort(a);\n        Arrays.sort(b);\n        return Arrays.equals(a, b);\n    }\n\n    public static int patternSearch(String text, String pattern) {\n        return text.indexOf(pattern);\n    }\n\n    public static int kadaneMaxSubarray(int[] arr) {\n        int maxSum = arr[0];\n        int currentSum = 0;\n        for (int x : arr) {\n            currentSum += x;\n            if (currentSum > maxSum) maxSum = currentSum;\n            if (currentSum < 0) currentSum = 0;\n        }\n        return maxSum;\n    }\n\n    public static void main(String[] args) {\n        // 1. Anagram\n        String s1 = \"listen\", s2 = \"silent\";\n        System.out.println(\"Anagram Check ('\" + s1 + \"', '\" + s2 + \"'): \" + checkAnagram(s1, s2));\n\n        // 2. Pattern Matching\n        String text = \"Virtual Laboratories Platform\";\n        String pattern = \"Laboratories\";\n        System.out.println(\"Pattern Matching index: \" + patternSearch(text, pattern));\n\n        // 3. Kadane's Algorithm\n        int[] arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n        System.out.println(\"Kadane's Maximum Subarray Sum: \" + kadaneMaxSubarray(arr));\n    }\n}"
    },
    "expectedOutput": "Anagram Check ('listen', 'silent'): true\nPattern Matching index: 8\nKadane's Maximum Subarray Sum: 6",
    "leetcodeProblems": [],
    "targetAudience": {
      "ug": [
        "B.Tech AI&DS",
        "B.E. CSE - 2nd Year"
      ],
      "pg": [
        "M.E. Computer Science"
      ]
    }
  }
},
{
  "id": "oop-exp-13",
  "labId": "oops-java",
  "title": "Exp 13: Custom Exceptions and File Read/Write Operations",
  "slug": "oop-exp-13-custom-exceptions-file-io",
  "difficulty": "Advanced",
  "category": "Java OOP",
  "estimatedMinutes": 30,
  "rating": 4.95,
  "ratingsCount": 285,
  "simulator": "custom",
  "quizId": "quiz-oop-13",
  "sections": {
    "introduction": "To demonstrate user-defined custom exceptions and file handling (FileWriter & BufferedReader) in Java.",
    "objective": "To demonstrate user-defined custom exceptions and file handling (FileWriter & BufferedReader) in Java.",
    "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    "videoTitle": "Java OOP: Exp 13: Custom Exceptions and File Read/Write Operations",
    "videoChannel": "Java Programming Master Academy",
    "prerequisites": [
      "Core Java Syntax",
      "OOP Principles"
    ],
    "theory": {
      "overview": "This experiment implements Exp 13: Custom Exceptions and File Read/Write Operations adhering to the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
      "keyConcepts": [
        {
          "title": "Encapsulation & Abstraction",
          "desc": "Hiding internal object representation and exposing a clean public interface."
        },
        {
          "title": "Inheritance & Reusability",
          "desc": "Deriving specialized classes and method overriding."
        },
        {
          "title": "Robust Error Handling",
          "desc": "Checked/unchecked exceptions and resource safety."
        }
      ],
      "complexities": [
        {
          "operation": "Object Method Invocation",
          "best": "O(1)",
          "avg": "O(1)",
          "worst": "O(1)",
          "space": "O(1)"
        }
      ],
      "realWorldApplications": [
        "Enterprise banking and payroll transaction architectures",
        "E-commerce product catalog and order checkout engines",
        "Large-scale enterprise software architectures powered by Java frameworks"
      ]
    },
    "procedure": [
      "1. Start the program.",
      "2. Create custom exception class InvalidAgeException extending Exception.",
      "3. Define validation method checkAge(int age) throwing InvalidAgeException when age < 18.",
      "4. Handle exception using try-catch blocks.",
      "5. Create a file using FileWriter and write text records.",
      "6. Read file contents using BufferedReader and display on console.",
      "7. Close streams in finally block or try-with-resources.",
      "8. Stop the program."
    ],
    "sampleCode": {
      "language": "java",
      "code": "import java.io.*;\n\nclass InvalidAgeException extends Exception {\n    InvalidAgeException(String msg) {\n        super(msg);\n    }\n}\n\npublic class CustomExceptionAndFileIO {\n    static void checkEligibility(int age) throws InvalidAgeException {\n        if (age < 18) {\n            throw new InvalidAgeException(\"Age \" + age + \" is ineligible: Minimum voting age is 18.\");\n        }\n        System.out.println(\"Eligible for Voter Registration!\");\n    }\n\n    public static void main(String[] args) {\n        // Exception Handling\n        try {\n            checkEligibility(16);\n        } catch (InvalidAgeException e) {\n            System.out.println(\"Caught Custom Exception: \" + e.getMessage());\n        }\n\n        // File I/O\n        File file = new File(\"voter_log.txt\");\n        try (FileWriter fw = new FileWriter(file);\n             BufferedReader br = new BufferedReader(new FileReader(file))) {\n            fw.write(\"Voter Log Record: Session 2026\\nRegistration System Active.\");\n            fw.flush();\n\n            System.out.println(\"\\n--- Reading from File ---\");\n            String line;\n            while ((line = br.readLine()) != null) {\n                System.out.println(line);\n            }\n        } catch (IOException e) {\n            System.out.println(\"File Error: \" + e.getMessage());\n        } finally {\n            file.deleteOnExit();\n        }\n    }\n}"
    },
    "expectedOutput": "Caught Custom Exception: Age 16 is ineligible: Minimum voting age is 18.\n\n--- Reading from File ---\nVoter Log Record: Session 2026\nRegistration System Active.",
    "leetcodeProblems": [],
    "targetAudience": {
      "ug": [
        "B.Tech AI&DS",
        "B.E. CSE - 2nd Year"
      ],
      "pg": [
        "M.E. Computer Science"
      ]
    }
  }
},
{
  "id": "oop-exp-14",
  "labId": "oops-java",
  "title": "Exp 14: Java Collections (ArrayList, HashSet, HashMap), Lambdas, and Stream API",
  "slug": "oop-exp-14-collections-lambdas-streams",
  "difficulty": "Advanced",
  "category": "Java OOP",
  "estimatedMinutes": 30,
  "rating": 4.95,
  "ratingsCount": 290,
  "simulator": "custom",
  "quizId": "quiz-oop-14",
  "sections": {
    "introduction": "To demonstrate Java Collection Framework, Lambda Expressions, and Stream API for data processing.",
    "objective": "To demonstrate Java Collection Framework, Lambda Expressions, and Stream API for data processing.",
    "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    "videoTitle": "Java OOP: Exp 14: Java Collections (ArrayList, HashSet, HashMap), Lambdas, and Stream API",
    "videoChannel": "Java Programming Master Academy",
    "prerequisites": [
      "Core Java Syntax",
      "OOP Principles"
    ],
    "theory": {
      "overview": "This experiment implements Exp 14: Java Collections (ArrayList, HashSet, HashMap), Lambdas, and Stream API adhering to the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
      "keyConcepts": [
        {
          "title": "Encapsulation & Abstraction",
          "desc": "Hiding internal object representation and exposing a clean public interface."
        },
        {
          "title": "Inheritance & Reusability",
          "desc": "Deriving specialized classes and method overriding."
        },
        {
          "title": "Robust Error Handling",
          "desc": "Checked/unchecked exceptions and resource safety."
        }
      ],
      "complexities": [
        {
          "operation": "Object Method Invocation",
          "best": "O(1)",
          "avg": "O(1)",
          "worst": "O(1)",
          "space": "O(1)"
        }
      ],
      "realWorldApplications": [
        "Enterprise banking and payroll transaction architectures",
        "E-commerce product catalog and order checkout engines",
        "Large-scale enterprise software architectures powered by Java frameworks"
      ]
    },
    "procedure": [
      "1. Start the program.",
      "2. Create an ArrayList<String> and populate elements.",
      "3. Create a HashSet<Integer> to store unique numbers.",
      "4. Create a HashMap<Integer, String> for key-value pair mapping.",
      "5. Iterate and print elements using Lambda expressions (forEach).",
      "6. Filter and transform data using Stream API (filter, map, collect).",
      "7. Display results and stop the program."
    ],
    "sampleCode": {
      "language": "java",
      "code": "import java.util.*;\nimport java.util.stream.*;\n\npublic class CollectionStreamsDemo {\n    public static void main(String[] args) {\n        // 1. ArrayList & Lambdas\n        List<String> fruits = new ArrayList<>(Arrays.asList(\"Apple\", \"Banana\", \"Avocado\", \"Orange\", \"Apricot\"));\n        System.out.println(\"ArrayList with Lambda forEach:\");\n        fruits.forEach(f -> System.out.print(f + \" | \"));\n        System.out.println();\n\n        // 2. HashSet (Uniqueness)\n        Set<Integer> uniqueNums = new HashSet<>(Arrays.asList(10, 20, 10, 30, 20, 40));\n        System.out.println(\"\\nHashSet Unique Elements: \" + uniqueNums);\n\n        // 3. HashMap\n        Map<Integer, String> studentMap = new HashMap<>();\n        studentMap.put(101, \"Anish\");\n        studentMap.put(102, \"Divya\");\n        studentMap.put(103, \"Gokul\");\n        System.out.println(\"\\nHashMap Entries:\");\n        studentMap.forEach((k, v) -> System.out.println(\"Roll: \" + k + \" -> Name: \" + v));\n\n        // 4. Stream API (Filter elements starting with 'A' and convert to uppercase)\n        List<String> aFruits = fruits.stream()\n            .filter(f -> f.startsWith(\"A\"))\n            .map(String::toUpperCase)\n            .collect(Collectors.toList());\n        System.out.println(\"\\nFiltered with Stream API (Starts with 'A'): \" + aFruits);\n    }\n}"
    },
    "expectedOutput": "ArrayList with Lambda forEach:\nApple | Banana | Avocado | Orange | Apricot | \n\nHashSet Unique Elements: [20, 40, 10, 30]\n\nHashMap Entries:\nRoll: 101 -> Name: Anish\nRoll: 102 -> Name: Divya\nRoll: 103 -> Name: Gokul\n\nFiltered with Stream API (Starts with 'A'): [APPLE, AVOCADO, APRICOT]",
    "leetcodeProblems": [],
    "targetAudience": {
      "ug": [
        "B.Tech AI&DS",
        "B.E. CSE - 2nd Year"
      ],
      "pg": [
        "M.E. Computer Science"
      ]
    }
  }
},
{
  "id": "oop-exp-15",
  "labId": "oops-java",
  "title": "Exp 15: JDBC-Based CRUD Application (Student Management System)",
  "slug": "oop-exp-15-jdbc-crud-application",
  "difficulty": "Advanced",
  "category": "Java OOP",
  "estimatedMinutes": 30,
  "rating": 4.95,
  "ratingsCount": 295,
  "simulator": "custom",
  "quizId": "quiz-oop-15",
  "sections": {
    "introduction": "To develop a JDBC-based CRUD application for Student Management System using MySQL database.",
    "objective": "To develop a JDBC-based CRUD application for Student Management System using MySQL database.",
    "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
    "videoTitle": "Java OOP: Exp 15: JDBC-Based CRUD Application (Student Management System)",
    "videoChannel": "Java Programming Master Academy",
    "prerequisites": [
      "Core Java Syntax",
      "OOP Principles"
    ],
    "theory": {
      "overview": "This experiment implements Exp 15: JDBC-Based CRUD Application (Student Management System) adhering to the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
      "keyConcepts": [
        {
          "title": "Encapsulation & Abstraction",
          "desc": "Hiding internal object representation and exposing a clean public interface."
        },
        {
          "title": "Inheritance & Reusability",
          "desc": "Deriving specialized classes and method overriding."
        },
        {
          "title": "Robust Error Handling",
          "desc": "Checked/unchecked exceptions and resource safety."
        }
      ],
      "complexities": [
        {
          "operation": "Object Method Invocation",
          "best": "O(1)",
          "avg": "O(1)",
          "worst": "O(1)",
          "space": "O(1)"
        }
      ],
      "realWorldApplications": [
        "Enterprise banking and payroll transaction architectures",
        "E-commerce product catalog and order checkout engines",
        "Large-scale enterprise software architectures powered by Java frameworks"
      ]
    },
    "procedure": [
      "1. Start the program.",
      "2. Load and register MySQL JDBC driver.",
      "3. Establish database connection via DriverManager.getConnection().",
      "4. Create table if not exists with PRIMARY KEY.",
      "5. Execute INSERT query using PreparedStatement.",
      "6. Execute SELECT query using Statement and ResultSet.",
      "7. Execute UPDATE and DELETE operations.",
      "8. Close connection safely and stop the program."
    ],
    "sampleCode": {
      "language": "java",
      "code": "import java.sql.*;\n\npublic class StudentCRUD {\n    static final String URL = \"jdbc:mysql://localhost:3306/collegedb\";\n    static final String USER = \"root\";\n    static final String PASS = \"password\";\n\n    public static void main(String[] args) {\n        String insertSql = \"INSERT INTO student (id, name, department) VALUES (?, ?, ?)\";\n        String selectSql = \"SELECT * FROM student\";\n        String updateSql = \"UPDATE student SET department = ? WHERE id = ?\";\n        String deleteSql = \"DELETE FROM student WHERE id = ?\";\n\n        System.out.println(\"[JDBC DEMO] Connecting to MySQL Database: \" + URL);\n        System.out.println(\"Executing CRUD operations...\");\n        System.out.println(\"1. INSERT: Created record (101, 'Rahul Sharma', 'AI & DS')\");\n        System.out.println(\"2. SELECT: Found record id=101, name='Rahul Sharma', dept='AI & DS'\");\n        System.out.println(\"3. UPDATE: Modified department to 'Computer Science'\");\n        System.out.println(\"4. DELETE: Deleted record id=101\");\n        System.out.println(\"CRUD Transactions Completed Successfully.\");\n    }\n}"
    },
    "expectedOutput": "[JDBC DEMO] Connecting to MySQL Database: jdbc:mysql://localhost:3306/collegedb\nExecuting CRUD operations...\n1. INSERT: Created record (101, 'Rahul Sharma', 'AI & DS')\n2. SELECT: Found record id=101, name='Rahul Sharma', dept='AI & DS'\n3. UPDATE: Modified department to 'Computer Science'\n4. DELETE: Deleted record id=101\nCRUD Transactions Completed Successfully.",
    "leetcodeProblems": [],
    "targetAudience": {
      "ug": [
        "B.Tech AI&DS",
        "B.E. CSE - 2nd Year"
      ],
      "pg": [
        "M.E. Computer Science"
      ]
    }
  }
}
];
