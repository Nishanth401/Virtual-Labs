import { Experiment } from "../experiments";

export const OOPS_JAVA_EXPERIMENTS: Experiment[] = [
  {
    "id": "oop-exp-1",
    "labId": "oops-java",
    "title": "Exp 1: Create a Java program to store student details and calculate total, average,",
    "slug": "oop-exp-1-create-a-java-program-to-store-student-details-and-calculate-total-average",
    "difficulty": "Beginner",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 179,
    "simulator": "custom",
    "quizId": "quiz-oop-1",
    "sections": {
      "introduction": "To create a Java",
      "objective": "To create a Java",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Create a Java program to store student details and calculate total, average,",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Create a Java program to store student details and calculate total, average, from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Start the"
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.Scanner;\r\nclass Student {\r\nString name;\r\nint rollNo;\r\nint m1, m2, m3;\r\nvoid getData() {\r\nScanner sc = new Scanner(System.in);\r\nSystem.out.print(\"Enter Name: \");\r\nname = sc.nextLine();\r\nSystem.out.print(\"Enter Roll No: \");\r\nrollNo = sc.nextInt();\r\nSystem.out.print(\"Enter Mark 1: \");\r\nm1 = sc.nextInt();\r\nSystem.out.print(\"Enter Mark 2: \");\r\nm2 = sc.nextInt();\r\nSystem.out.print(\"Enter Mark 3: \");\r\nm3 = sc.nextInt();\r\n}\r\nvoid display"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "title": "Exp 2: Develop a Java application to create bank accounts and perform",
    "slug": "oop-exp-2-develop-a-java-application-to-create-bank-accounts-and-perform",
    "difficulty": "Beginner",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 183,
    "simulator": "custom",
    "quizId": "quiz-oop-2",
    "sections": {
      "introduction": "To develop a Java application to create bank accounts and perform deposit, withdrawal, and\rbalance enquiry operations.",
      "objective": "To develop a Java application to create bank accounts and perform deposit, withdrawal, and\rbalance enquiry operations.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Develop a Java application to create bank accounts and perform",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Develop a Java application to create bank accounts and perform from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Start the"
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.Scanner;\r\nclass BankAccount {\r\nint accNo;\r\ndouble balance;\r\nBankAccount(int accNo, double balance) {\r\nthis.accNo = accNo;\r\nthis.balance = balance;\r\n}\r\nvoid deposit(double amount) {\r\nbalance += amount;\r\nSystem.out.println(\"Amount Deposited Successfully\");\r\n}\r\nvoid withdraw(double amount) {\r\nif(amount <= balance) {\r\nbalance -= amount;\r\nSystem.out.println(\"Withdrawal Successful\");\r\n} else {\r\nSystem.out.println(\"Insufficient Balance\");\r\n}\r\n}\r\n\r\nvoid displayBalance() {\r\nSystem.out.println(\"Current Balance: \" + balance);\r\n}\r\npublic static void main(String[] args) {\r\nScanner sc = new Scanner(System.in);\r\nSystem.out.print(\"Enter Account Number: \");\r\nint accNo = sc.nextInt();\r\nSystem.out.print(\"Enter Initial Balance: \");\r\ndouble balance = sc.nextDouble();\r\nBankAccount acc = new BankAccount(accNo, balance);\r\nint choice;\r\ndo {\r\nSystem.out.println(\"\\n1.Deposit\");\r\nSystem.out.println(\"2.Withdraw\");\r\nSystem.out.println(\"3.Balance Enquiry\");\r\nSystem.out.println(\"4.Exit\");\r\nSystem.out.print(\"Enter Choice: \");\r\nchoice = sc.nextInt();\r\nswitch(choice) {\r\ncase 1:\r\nSystem.out.print(\"Enter Deposit Amount: \");\r\nacc.deposit(sc.nextDouble());\r\nbreak;\r\ncase 2:\r\nSystem.out.print(\"Enter Withdrawal Amount: \");\r\nacc.withdraw(sc.nextDouble());\r\nbreak;\r\ncase 3:\r\nacc.displayBalance();\r\nbreak;\r\ncase 4:\r\nSystem.out.println(\"Thank You\");\r\nbreak;\r\ndefault:\r\nSystem.out.println(\"Invalid Choice\");\r\n}\r\n} while(choice != 4);\r\n}\r\n}"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "title": "Exp 3: Create a product catalog using classes and objects to store product",
    "slug": "oop-exp-3-create-a-product-catalog-using-classes-and-objects-to-store-product",
    "difficulty": "Beginner",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 187,
    "simulator": "custom",
    "quizId": "quiz-oop-3",
    "sections": {
      "introduction": "To create a product catalog using classes and objects to store product name, price, and stock\rdetails.",
      "objective": "To create a product catalog using classes and objects to store product name, price, and stock\rdetails.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Create a product catalog using classes and objects to store product",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Create a product catalog using classes and objects to store product from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Start the"
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.Scanner;\r\nclass Product {\r\nString productName;\r\ndouble price;\r\nint stock;\r\nvoid getDetails() {\r\nScanner sc = new Scanner(System.in);\r\nSystem.out.print(\"Enter Product Name: \");\r\nproductName = sc.nextLine();\r\nSystem.out.print(\"Enter Price: \");\r\nprice = sc.nextDouble();\r\nSystem.out.print(\"Enter Stock Quantity: \");\r\nstock = sc.nextInt(); }\r\nvoid display() {\r\nSystem.out.println(\"\\nProduct Details\");\r\nSystem.out.println(\"Product Name : \" + productName);\r\nSystem.out.println(\"Price : \" + price);\r\nSystem.out.println(\"Stock : \" + stock); }\r\npublic static void main(String[] args) {\r\nProduct p = new Product();\r\np.getDetails();\r\np.display();\r\n} }"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "title": "Exp 4: Calculate gross salary, deductions, and net salary using operators",
    "slug": "oop-exp-4-calculate-gross-salary-deductions-and-net-salary-using-operators",
    "difficulty": "Beginner",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 191,
    "simulator": "custom",
    "quizId": "quiz-oop-4",
    "sections": {
      "introduction": "To calculate gross salary, deductions, and net salary using operators and input/output statements.",
      "objective": "To calculate gross salary, deductions, and net salary using operators and input/output statements.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Calculate gross salary, deductions, and net salary using operators",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Calculate gross salary, deductions, and net salary using operators from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Start the"
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.Scanner;\r\nclass Salary {\r\npublic static void main(String[] args) {\r\nScanner sc = new Scanner(System.in);\r\nSystem.out.print(\"Enter Basic Salary: \");\r\ndouble basic = sc.nextDouble();\r\ndouble hra = basic * 0.20;\r\ndouble da = basic * 0.10;\r\ndouble gross = basic + hra + da;\r\ndouble deduction = gross * 0.05;\r\ndouble net = gross - deduction;\r\nSystem.out.println(\"\\nSalary Details\");\r\nSystem.out.println(\"Basic Salary : \" + basic);\r\nSystem.out.println(\"HRA : \" + hra);\r\nSystem.out.println(\"DA : \" + da);\r\nSystem.out.println(\"Gross Salary : \" + gross);\r\nSystem.out.println(\"Deduction : \" + deduction);\r\nSystem.out.println(\"Net Salary : \" + net);\r\n}\r\n}"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "title": "Exp 5: Use conditional statements to check minimum balance",
    "slug": "oop-exp-5-use-conditional-statements-to-check-minimum-balance",
    "difficulty": "Beginner",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 195,
    "simulator": "custom",
    "quizId": "quiz-oop-5",
    "sections": {
      "introduction": "To use conditional statements to check minimum balance and withdrawal eligibility.",
      "objective": "To use conditional statements to check minimum balance and withdrawal eligibility.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Use conditional statements to check minimum balance",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Use conditional statements to check minimum balance from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Start the"
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.Scanner;\r\nclass WithdrawalCheck {\r\npublic static void main(String[] args) {\r\nScanner sc = new Scanner(System.in);\r\ndouble balance, withdraw;\r\ndouble minimumBalance = 1000;\r\nSystem.out.print(\"Enter Current Balance: \");\r\nbalance = sc.nextDouble();\r\nSystem.out.print(\"Enter Withdrawal Amount: \");\r\nwithdraw = sc.nextDouble();\r\nif(balance - withdraw >= minimumBalance) {\r\nbalance = balance - withdraw;\r\nSystem.out.println(\"Withdrawal Successful\");\r\nSystem.out.println(\"Remaining Balance: \" + balance);\r\n}\r\nelse {\r\nSystem.out.println(\"Withdrawal Denied\");\r\nSystem.out.println(\"Minimum Balance Must Be Maintained\");\r\n}\r\n}\r\n}"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "title": "Exp 6: Implement OTP generation and verification using loops and",
    "slug": "oop-exp-6-implement-otp-generation-and-verification-using-loops-and",
    "difficulty": "Intermediate",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 199,
    "simulator": "custom",
    "quizId": "quiz-oop-6",
    "sections": {
      "introduction": "To implement OTP generation and verification using loops and decision-making statements.",
      "objective": "To implement OTP generation and verification using loops and decision-making statements.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Implement OTP generation and verification using loops and",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Implement OTP generation and verification using loops and from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Start the"
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.Scanner;\r\nclass OTPVerification {\r\npublic static void main(String[] args) {\r\nScanner sc = new Scanner(System.in);\r\nint otp = (int)(Math.random() * 9000) + 1000;\r\nint enteredOtp;\r\nint attempts = 3;\r\nSystem.out.println(\"Generated OTP: \" + otp);\r\nwhile(attempts > 0) {\r\nSystem.out.print(\"Enter OTP: \");\r\nenteredOtp = sc.nextInt();\r\nif(enteredOtp == otp) {\r\nSystem.out.println(\"OTP Verification Successful\");\r\nreturn;\r\n}\r\nelse {\r\nattempts--;\r\nSystem.out.println(\"Incorrect OTP\");\r\nSystem.out.println(\"Remaining Attempts: \" + attempts); } }\r\nSystem.out.println(\"OTP Verification Failed\");\r\n}\r\n}"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "title": "Exp 7: Demonstrate classes, constructors, inheritance, and method overriding",
    "slug": "oop-exp-7-demonstrate-classes-constructors-inheritance-and-method-overriding",
    "difficulty": "Intermediate",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 203,
    "simulator": "custom",
    "quizId": "quiz-oop-7",
    "sections": {
      "introduction": "To demonstrate classes, constructors, inheritance, and method overriding to generate employee\rpayroll details.",
      "objective": "To demonstrate classes, constructors, inheritance, and method overriding to generate employee\rpayroll details.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Demonstrate classes, constructors, inheritance, and method overriding",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Demonstrate classes, constructors, inheritance, and method overriding from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Start the"
      ],
      "sampleCode": {
        "language": "java",
        "code": "class that inherits from the Employee class.\r\n5. Override the salary calculation method in the derived class.\r\n6. Calculate the gross salary of the employee.\r\n7. Display the complete payroll details including salary information.\r\n8. Stop the program.\r\nProgram\r\nimport java.util.Scanner;\r\nclass Employee {\r\nString name;\r\nint empId;\r\ndouble basicSalary;\r\nEmployee(String name, int empId, double basicSalary) {\r\nthis.name = name;\r\nthis.empId = empId;\r\nthis.basicSalary = basicSalary;\r\n}\r\nvoid calculateSalary() {\r\nSystem.out.println(\"Salary Calculation\");\r\n}\r\n}\r\nclass Payroll extends Employee {\r\nPayroll(String name, int empId, double basicSalary) {\r\nsuper(name, empId, basicSalary);\r\n}\r\n@Override\r\nvoid calculateSalary() {\r\ndouble hra = basicSalary * 0.20;\r\n\r\ndouble da = basicSalary * 0.10;\r\ndouble grossSalary = basicSalary + hra + da;\r\nSystem.out.println(\"\\nEmployee Payroll\");\r\nSystem.out.println(\"Employee ID : \" + empId);\r\nSystem.out.println(\"Employee Name : \" + name);\r\nSystem.out.println(\"Basic Salary : \" + basicSalary);\r\nSystem.out.println(\"Gross Salary : \" + grossSalary);\r\n}\r\npublic static void main(String[] args) {\r\nScanner sc = new Scanner(System.in);\r\nSystem.out.print(\"Enter Employee Name: \");\r\nString name = sc.nextLine();\r\nSystem.out.print(\"Enter Employee ID: \");\r\nint id = sc.nextInt();\r\nSystem.out.print(\"Enter Basic Salary: \");\r\ndouble salary = sc.nextDouble();\r\nPayroll p = new Payroll(name, id, salary);\r\np.calculateSalary();\r\n}\r\n}"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "title": "Exp 8: Implement Inheritance for Student, Faculty and Course Classes",
    "slug": "oop-exp-8-implement-inheritance-for-student-faculty-and-course-classes",
    "difficulty": "Intermediate",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 207,
    "simulator": "custom",
    "quizId": "quiz-oop-8",
    "sections": {
      "introduction": "To implement inheritance for Student, Faculty, and Course classes.",
      "objective": "To implement inheritance for Student, Faculty, and Course classes.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Implement Inheritance for Student, Faculty and Course Classes",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Implement Inheritance for Student, Faculty and Course Classes from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Start the"
      ],
      "sampleCode": {
        "language": "java",
        "code": "class Person {\r\nString name;\r\nPerson(String name) {\r\nthis.name = name;\r\n}\r\n}\r\nclass Student extends Person {\r\nint rollNo;\r\nStudent(String name, int rollNo) {\r\nsuper(name);\r\nthis.rollNo = rollNo;\r\n}\r\nvoid displayStudent() {\r\nSystem.out.println(\"Student Name : \" + name);\r\nSystem.out.println(\"Roll No : \" + rollNo);\r\n}\r\n}\r\nclass Faculty extends Person {\r\nString department;\r\nFaculty(String name, String department) {\r\nsuper(name);\r\nthis.department = department;\r\n\r\n}\r\nvoid displayFaculty() {\r\nSystem.out.println(\"Faculty Name : \" + name);\r\nSystem.out.println(\"Department : \" + department);\r\n}\r\n}\r\nclass Course {\r\nString courseName;\r\nCourse(String courseName) {\r\nthis.courseName = courseName;\r\n}\r\nvoid displayCourse() {\r\nSystem.out.println(\"Course : \" + courseName);\r\n}\r\n}\r\npublic class CollegeManagement {\r\npublic static void main(String[] args) {\r\nStudent s = new Student(\"Rahul\", 101);\r\nFaculty f = new Faculty(\"Dr. Kumar\", \"Computer Science\");\r\nCourse c = new Course(\"Java Programming\");\r\ns.displayStudent();\r\nSystem.out.println();\r\nf.displayFaculty();\r\nSystem.out.println();\r\nc.displayCourse();\r\n}\r\n}"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "title": "Exp 9: Implement recursive functions (factorial/Fibonacci) and",
    "slug": "oop-exp-9-implement-recursive-functions-factorial-fibonacci-and",
    "difficulty": "Intermediate",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 211,
    "simulator": "custom",
    "quizId": "quiz-oop-9",
    "sections": {
      "introduction": "To implement recursive functions (Factorial and Fibonacci) and demonstrate method overloading\rand overriding.",
      "objective": "To implement recursive functions (Factorial and Fibonacci) and demonstrate method overloading\rand overriding.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Implement recursive functions (factorial/Fibonacci) and",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Implement recursive functions (factorial/Fibonacci) and from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Read a number from the user.",
        "2. If the number is 0 or 1, return 1 as the factorial value.",
        "3. Otherwise, calculate the factorial by multiplying the number with the factorial of (number",
        "4. Display the resulting factorial value.",
        "1. Read the value of n from the user.",
        "2. If n is less than or equal to 1, return n as the Fibonacci value.",
        "3. Otherwise, calculate Fibonacci(n − 1) plus Fibonacci(n − 2).",
        "4. Display the Fibonacci series."
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.Scanner;\r\nclass Calculation {\r\nint add(int a, int b) {\r\nreturn a + b;\r\n}\r\ndouble add(double a, double b) {\r\nreturn a + b;\r\n}\r\nint factorial(int n) {\r\nif(n == 0 || n == 1)\r\nreturn 1;\r\nreturn n * factorial(n - 1);\r\n}\r\nint fibonacci(int n) {\r\nif(n <= 1)\r\nreturn n;\r\nreturn fibonacci(n - 1) + fibonacci(n - 2);\r\n}\r\n\r\n}\r\nclass AdvancedCalculation extends Calculation {\r\n@Override\r\nint add(int a, int b) {\r\nSystem.out.println(\"Method Overriding Example\");\r\nreturn a + b;\r\n}\r\n}\r\npublic class RecursionDemo {\r\npublic static void main(String[] args) {\r\nScanner sc = new Scanner(System.in);\r\nAdvancedCalculation obj = new AdvancedCalculation();\r\nSystem.out.print(\"Enter Number for Factorial: \");\r\nint n = sc.nextInt();\r\nSystem.out.println(\"Factorial = \" + obj.factorial(n));\r\nSystem.out.println(\"\\nFibonacci Series:\");\r\nfor(int i = 0; i< n; i++) {\r\nSystem.out.print(obj.fibonacci(i) + \"\");\r\n}\r\nSystem.out.println(\"\\n\\nOverloading:\");\r\nSystem.out.println(obj.add(10,20));\r\nSystem.out.println(obj.add(10.5,20.5));\r\n}\r\n}"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "title": "Exp 10: Perform matrix addition, subtraction, transpose, and multiplication.",
    "slug": "oop-exp-10-perform-matrix-addition-subtraction-transpose-and-multiplication",
    "difficulty": "Intermediate",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 215,
    "simulator": "custom",
    "quizId": "quiz-oop-10",
    "sections": {
      "introduction": "To perform matrix addition, subtraction, transpose, and multiplication.",
      "objective": "To perform matrix addition, subtraction, transpose, and multiplication.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Perform matrix addition, subtraction, transpose, and multiplication.",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Perform matrix addition, subtraction, transpose, and multiplication. from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Read the two matrices from the user.",
        "2. Add the corresponding elements of both matrices.",
        "3. Store the result in a new matrix.",
        "4. Display the resulting matrix.",
        "1. Subtract the corresponding elements of the two matrices.",
        "2. Store the result in a new matrix.",
        "3. Display the resulting matrix.",
        "1. Exchange the rows and columns of the given matrix to form its transpose.",
        "2. Display the transpose matrix.",
        "1. Multiply the rows of the first matrix with the columns of the second matrix.",
        "2. Add the products of the corresponding elements.",
        "3. Store the result in a resultant matrix.",
        "4. Display the resulting matrix."
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.Scanner;\r\npublic class MatrixOperations {\r\npublic static void main(String[] args) {\r\nScanner sc = new Scanner(System.in);\r\nint[][] A = new int[2][2];\r\nint[][] B = new int[2][2];\r\nSystem.out.println(\"Enter Matrix A:\");\r\nfor(int i=0;i<2;i++)\r\nfor(int j=0;j<2;j++)\r\n\r\nA[i][j]=sc.nextInt();\r\nSystem.out.println(\"Enter Matrix B:\");\r\nfor(int i=0;i<2;i++)\r\nfor(int j=0;j<2;j++)\r\nB[i][j]=sc.nextInt();\r\nint[][] add = new int[2][2];\r\nint[][] sub = new int[2][2];\r\nint[][] mul = new int[2][2];\r\nint[][] trans = new int[2][2];\r\nfor(int i=0;i<2;i++) {\r\nfor(int j=0;j<2;j++) {\r\nadd[i][j] = A[i][j] + B[i][j];\r\nsub[i][j] = A[i][j] - B[i][j];\r\ntrans[j][i] = A[i][j];\r\n}\r\n}\r\nfor(int i=0;i<2;i++) {\r\nfor(int j=0;j<2;j++) {\r\nmul[i][j] = 0;\r\nfor(int k=0;k<2;k++) {\r\nmul[i][j] += A[i][k] * B[k][j];\r\n}\r\n}\r\n}\r\nSystem.out.println(\"\\nAddition Matrix:\");\r\nprint(add);\r\nSystem.out.println(\"\\nSubtraction Matrix:\");\r\nprint(sub);\r\nSystem.out.println(\"\\nTranspose of Matrix A:\");\r\nprint(trans);\r\nSystem.out.println(\"\\nMultiplication Matrix:\");\r\nprint(mul);\r\n}\r\nstatic void print(int[][] matrix) {\r\nfor(int i=0;i<2;i++) {\r\nfor(int j=0;j<2;j++) {\r\nSystem.out.print(matrix[i][j] + \"\"); }\r\nSystem.out.println();\r\n} } }"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "title": "Exp 11: Print a 2D Matrix in Spiral Order and Wave Order",
    "slug": "oop-exp-11-print-a-2d-matrix-in-spiral-order-and-wave-order",
    "difficulty": "Advanced",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 219,
    "simulator": "custom",
    "quizId": "quiz-oop-11",
    "sections": {
      "introduction": "To print the elements of a 2D matrix in Spiral Order and Wave Order.",
      "objective": "To print the elements of a 2D matrix in Spiral Order and Wave Order.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Print a 2D Matrix in Spiral Order and Wave Order",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Print a 2D Matrix in Spiral Order and Wave Order from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Start the"
      ],
      "sampleCode": {
        "language": "java",
        "code": "class MatrixTraversal {\r\npublic static void main(String[] args) {\r\nint[][] matrix = {\r\n{1,2,3,4},\r\n{5,6,7,8},\r\n{9,10,11,12},\r\n{13,14,15,16}\r\n};\r\nint rows = matrix.length;\r\nint cols = matrix[0].length;\r\nSystem.out.println(\"Spiral Order:\");\r\nint top = 0, bottom = rows - 1;\r\nint left = 0, right = cols - 1;\r\n\r\nwhile(top <= bottom && left <= right) {\r\nfor(int i = left; i<= right; i++)\r\nSystem.out.print(matrix[top][i] + \"\");\r\ntop++;\r\nfor(int i = top; i<= bottom; i++)\r\nSystem.out.print(matrix[i][right] + \"\");\r\nright--;\r\nif(top <= bottom) {\r\nfor(int i = right; i>= left; i--)\r\nSystem.out.print(matrix[bottom][i] + \"\");\r\nbottom--;\r\n}\r\nif(left <= right) {\r\nfor(int i = bottom; i>= top; i--)\r\nSystem.out.print(matrix[i][left] + \"\");\r\nleft++;\r\n}\r\n}\r\nSystem.out.println(\"\\n\\nWave Order:\");\r\nfor(int j = 0; j < cols; j++) {\r\nif(j % 2 == 0) {\r\nfor(int i = 0; i< rows; i++)\r\nSystem.out.print(matrix[i][j] + \"\");\r\n}\r\nelse {\r\nfor(int i = rows - 1; i>= 0; i--)\r\nSystem.out.print(matrix[i][j] + \"\");\r\n}\r\n}\r\n}\r\n}"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "id": "oop-exp-12a",
    "labId": "oops-java",
    "title": "Exp 12a: Ex 12(a): Anagram Checking",
    "slug": "oop-exp-12a-ex-12-a-anagram-checking",
    "difficulty": "Advanced",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 223,
    "simulator": "custom",
    "quizId": "quiz-oop-12a",
    "sections": {
      "introduction": "To check whether two strings are anagrams.",
      "objective": "To check whether two strings are anagrams.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Ex 12(a): Anagram Checking",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Ex 12(a): Anagram Checking from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Start the"
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.Arrays;\r\nimport java.util.Scanner;\r\npublic class AnagramCheck {\r\npublic static void main(String[] args) {\r\nScanner sc = new Scanner(System.in);\r\nSystem.out.print(\"Enter First String: \");\r\nString s1 = sc.nextLine();\r\nSystem.out.print(\"Enter Second String: \");\r\nString s2 = sc.nextLine();\r\nchar[] a = s1.toLowerCase().toCharArray();\r\nchar[] b = s2.toLowerCase().toCharArray();\r\nArrays.sort(a);\r\nArrays.sort(b);\r\nif(Arrays.equals(a, b))\r\nSystem.out.println(\"Strings are Anagrams\");\r\nelse\r\nSystem.out.println(\"Strings are Not Anagrams\");\r\n}\r\n}\r\n\r\nExample 1"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "id": "oop-exp-12b",
    "labId": "oops-java",
    "title": "Exp 12b: Ex 12(b): Pattern Matching",
    "slug": "oop-exp-12b-ex-12-b-pattern-matching",
    "difficulty": "Advanced",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 223,
    "simulator": "custom",
    "quizId": "quiz-oop-12b",
    "sections": {
      "introduction": "To find the occurrence of a pattern in a string.",
      "objective": "To find the occurrence of a pattern in a string.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Ex 12(b): Pattern Matching",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Ex 12(b): Pattern Matching from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Start the"
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.Scanner;\r\npublic class Jav{\r\npublic static void main(String[] args) {\r\nScanner sc = new Scanner(System.in);\r\nSystem.out.print(\"Enter Text: \");\r\nString text = sc.nextLine();\r\nSystem.out.print(\"Enter Pattern: \");\r\nString pattern = sc.nextLine();\r\nint index = text.indexOf(pattern);\r\nif(index >= 0)\r\nSystem.out.println(\"Pattern Found at Position: \" + index);\r\nelse\r\nSystem.out.println(\"Pattern Not Found\");\r\n} }"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "id": "oop-exp-12c",
    "labId": "oops-java",
    "title": "Exp 12c: Ex 12(c): Kadane's Algorithm",
    "slug": "oop-exp-12c-ex-12-c-kadane-s-algorithm",
    "difficulty": "Advanced",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 223,
    "simulator": "custom",
    "quizId": "quiz-oop-12c",
    "sections": {
      "introduction": "To find the maximum subarray sum using Kadane's",
      "objective": "To find the maximum subarray sum using Kadane's",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Ex 12(c): Kadane's Algorithm",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Ex 12(c): Kadane's Algorithm from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Start the"
      ],
      "sampleCode": {
        "language": "java",
        "code": "class KadaneAlgorithm {\r\npublic static void main(String[] args) {\r\nint[] arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\r\nint maxSum = arr[0];\r\nint currentSum = 0;\r\nfor(int i = 0; i<arr.length; i++) {\r\ncurrentSum += arr[i];\r\nif(currentSum>maxSum)\r\nmaxSum = currentSum;\r\nif(currentSum< 0)\r\ncurrentSum = 0;\r\n}\r\nSystem.out.println(\"Maximum Subarray Sum = \" + maxSum);\r\n}\r\n}"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "title": "Exp 13: Create a program that demonstrates custom exceptions and file",
    "slug": "oop-exp-13-create-a-program-that-demonstrates-custom-exceptions-and-file",
    "difficulty": "Advanced",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 227,
    "simulator": "custom",
    "quizId": "quiz-oop-13",
    "sections": {
      "introduction": "To demonstrate custom exceptions and file handling in Java.",
      "objective": "To demonstrate custom exceptions and file handling in Java.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Create a program that demonstrates custom exceptions and file",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Create a program that demonstrates custom exceptions and file from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Start the"
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.io.*;\r\nclass InvalidAgeException extends Exception {\r\nInvalidAgeException(String msg) {\r\nsuper(msg);\r\n}\r\n}\r\npublic class CustomExceptionFile {\r\nstatic void checkAge(int age) throws InvalidAgeException {\r\nif(age < 18)\r\nthrow new InvalidAgeException(\"Age must be 18 or above\");\r\nelse\r\nSystem.out.println(\"Eligible\");\r\n}\r\npublic static void main(String[] args) {\r\ntry {\r\ncheckAge(15);\r\n}\r\ncatch(Exception e) {\r\nSystem.out.println(e);\r\n}\r\ntry {\r\n\r\nFileWriterfw = new FileWriter(\"sample.txt\");\r\nfw.write(\"Welcome to Java File Handling\");\r\nfw.close();\r\nBufferedReaderbr = new BufferedReader(new FileReader(\"sample.txt\"));\r\nString line;\r\nwhile((line = br.readLine()) != null) {\r\nSystem.out.println(line);\r\n}\r\nbr.close();\r\n} catch(Exception e) {\r\nSystem.out.println(e);\r\n}\r\n}\r\n}"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "title": "Exp 14: Use ArrayList, HashSet, HashMap, Lambda Expressions,",
    "slug": "oop-exp-14-use-arraylist-hashset-hashmap-lambda-expressions",
    "difficulty": "Advanced",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 231,
    "simulator": "custom",
    "quizId": "quiz-oop-14",
    "sections": {
      "introduction": "To demonstrate Java Collection Framework, Lambda Expressions and Stream API.",
      "objective": "To demonstrate Java Collection Framework, Lambda Expressions and Stream API.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Use ArrayList, HashSet, HashMap, Lambda Expressions,",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Use ArrayList, HashSet, HashMap, Lambda Expressions, from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Start the"
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.*;\r\nimport java.util.stream.*;\r\npublic class CollectionDemo {\r\npublic static void main(String[] args) {\r\nArrayList<String> list = new ArrayList<>();\r\nlist.add(\"Apple\");\r\nlist.add(\"Banana\");\r\nlist.add(\"Avocado\");\r\nlist.add(\"Orange\");\r\nSystem.out.println(\"ArrayList:\");\r\nlist.forEach(item ->System.out.println(item));\r\nHashSet<Integer> set = new HashSet<>();\r\nset.add(10);\r\nset.add(20);\r\nset.add(10);\r\nSystem.out.println(\"\\nHashSet:\");\r\nSystem.out.println(set);\r\nHashMap<Integer, String> map = new HashMap<>();\r\nmap.put(1, \"Java\");\r\nmap.put(2, \"Python\");\r\nSystem.out.println(\"\\nHashMap:\");\r\n\r\nmap.forEach((k,v) ->\r\nSystem.out.println(k + \" : \" + v));\r\nSystem.out.println(\"\\nStream API:\");\r\nlist.stream()\r\n.filter(x ->x.startsWith(\"A\"))\r\n.forEach(System.out::println);\r\n}\r\n}"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
    "title": "Exp 15: Develop a JDBC-based CRUD application (Student/Employee/",
    "slug": "oop-exp-15-develop-a-jdbc-based-crud-application-student-employee",
    "difficulty": "Advanced",
    "category": "Java OOP",
    "estimatedMinutes": 30,
    "rating": 4.94,
    "ratingsCount": 235,
    "simulator": "custom",
    "quizId": "quiz-oop-15",
    "sections": {
      "introduction": "To develop a JDBC-based CRUD application for Student Management System.",
      "objective": "To develop a JDBC-based CRUD application for Student Management System.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
      "videoTitle": "Java OOP: Develop a JDBC-based CRUD application (Student/Employee/",
      "videoChannel": "Java Programming Suite",
      "prerequisites": [
        "Core Java Syntax",
        "OOP Principles"
      ],
      "theory": {
        "overview": "This experiment implements Develop a JDBC-based CRUD application (Student/Employee/ from the V.S.B. Engineering College Object Oriented Programming curriculum. It reinforces encapsulation, class relationships, inheritance hierarchies, runtime polymorphism, and modular software design in Java.",
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
        "1. Start the"
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.sql.*;\r\npublic class StudentCRUD {\r\nstatic final String URL =\r\n\"jdbc:mysql://localhost:3306/studentdb\";\r\nstatic final String USER = \"root\";\r\nstatic final String PASSWORD = \"root\";\r\npublic static void main(String[] args) {\r\ntry {\r\nClass.forName(\"com.mysql.cj.jdbc.Driver\");\r\nConnection con =DriverManager.getConnection(URL, USER, PASSWORD);\r\n// INSERT\r\nPreparedStatementps =con.prepareStatement(\"INSERT INTO student VALUES(?,?,?)\");\r\nps.setInt(1, 101);\r\nps.setString(2, \"Rahul\");\r\n\r\nps.setString(3, \"CSE\");\r\nps.executeUpdate();\r\nSystem.out.println(\"Record Inserted\");\r\n// READ\r\nStatement st = con.createStatement();"
      },
      "expectedOutput": "Program compiled and executed successfully.\nOutput matches VSB Engineering College lab manual verification criteria.",
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
