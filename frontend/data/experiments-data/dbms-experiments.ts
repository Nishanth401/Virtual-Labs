import { Experiment } from "../experiments";

export const DBMS_EXPERIMENTS: Experiment[] = [
  {
    "id": "dbms-exp-1",
    "labId": "dbms-lab",
    "title": "Exp 1: Design of ER Diagram and Relational Schema for an E-Commerce System",
    "slug": "dbms-exp-1-design-of-er-diagram-and-relational-schema-for-an-e-commerce-system",
    "difficulty": "Beginner",
    "category": "Databases",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 184,
    "simulator": "sql",
    "quizId": "quiz-dbms-1",
    "sections": {
      "introduction": "To design a complete Entity-Relationship (ER) diagram for an E-Commerce System\rinvolving Customers, Products, Orders, Payments, and Suppliers, and to systematically convert the\rER model into a normalized relational schema with appropriate primary keys, foreign keys, and\rconstraints implemented in MySQL.",
      "objective": "To design a complete Entity-Relationship (ER) diagram for an E-Commerce System\rinvolving Customers, Products, Orders, Payments, and Suppliers, and to systematically convert the\rER model into a normalized relational schema with appropriate primary keys, foreign keys, and\rconstraints implemented in MySQL.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/HXV3zeRR3nw",
      "videoTitle": "DBMS Practical: Design of ER Diagram and Relational Schema for an E-Commerce System",
      "videoChannel": "Database Systems & SQL Lab",
      "prerequisites": [
        "Relational Model Basics",
        "SQL Fundamentals"
      ],
      "theory": {
        "overview": "This experiment implements Design of ER Diagram and Relational Schema for an E-Commerce System adhering to the V.S.B. Engineering College AI&DS Department curriculum. It covers relational integrity constraints, normalization, transaction ACID guarantees, indexing performance, and SQL procedural triggers.",
        "keyConcepts": [
          {
            "title": "Relational Integrity",
            "desc": "Primary key, foreign key, check, and default constraints enforcing data consistency."
          },
          {
            "title": "Query Execution & Optimization",
            "desc": "Execution plans, indexing, join mechanics, and aggregation pipelines."
          },
          {
            "title": "ACID Guarantees",
            "desc": "Atomic state transitions, consistency preservation, and isolation levels."
          }
        ],
        "complexities": [
          {
            "operation": "Indexed Lookup",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(log n)",
            "space": "O(n)"
          },
          {
            "operation": "Full Table Scan",
            "best": "O(n)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise resource planning (ERP) and e-commerce transactional engines",
          "Core banking and financial ledger processing systems",
          "Automated academic evaluation and examination management platforms"
        ]
      },
      "procedure": [
        "1. Connect to MySQL server and create the required database.",
        "2. Define relational tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "3. Insert representative transactional and master records.",
        "4. Execute analytical SQL queries with required clauses.",
        "5. Verify integrity constraints and transaction state consistency."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Exp 1: E-Commerce (ShopEasy) Schema, Tables, and Joins\nCREATE DATABASE IF NOT EXISTS ShopEasyDB;\nUSE ShopEasyDB;\n\nCREATE TABLE Customer (\n    customer_id INT NOT NULL AUTO_INCREMENT,\n    full_name VARCHAR(100) NOT NULL,\n    email VARCHAR(100) NOT NULL UNIQUE,\n    phone VARCHAR(15),\n    city VARCHAR(50),\n    wallet_balance DECIMAL(10,2) NOT NULL DEFAULT 0.00 CHECK (wallet_balance >= 0),\n    PRIMARY KEY (customer_id)\n);\n\nCREATE TABLE Supplier (\n    supplier_id INT NOT NULL AUTO_INCREMENT,\n    supplier_name VARCHAR(150) NOT NULL,\n    contact_email VARCHAR(100),\n    city VARCHAR(50),\n    rating DECIMAL(3,2) DEFAULT 0.00 CHECK (rating BETWEEN 0 AND 5),\n    PRIMARY KEY (supplier_id)\n);\n\nCREATE TABLE Product (\n    product_id INT NOT NULL AUTO_INCREMENT,\n    supplier_id INT NOT NULL,\n    product_name VARCHAR(200) NOT NULL,\n    category VARCHAR(100),\n    price DECIMAL(10,2) NOT NULL CHECK (price > 0),\n    stock_qty INT NOT NULL DEFAULT 0 CHECK (stock_qty >= 0),\n    PRIMARY KEY (product_id),\n    FOREIGN KEY (supplier_id) REFERENCES Supplier(supplier_id)\n);\n\nCREATE TABLE Orders (\n    order_id INT NOT NULL AUTO_INCREMENT,\n    customer_id INT NOT NULL,\n    order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,\n    order_status ENUM('pending','confirmed','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',\n    PRIMARY KEY (order_id),\n    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)\n);\n\nCREATE TABLE Order_Item (\n    item_id INT NOT NULL AUTO_INCREMENT,\n    order_id INT NOT NULL,\n    product_id INT NOT NULL,\n    quantity INT NOT NULL CHECK (quantity > 0),\n    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price > 0),\n    PRIMARY KEY (item_id),\n    FOREIGN KEY (order_id) REFERENCES Orders(order_id),\n    FOREIGN KEY (product_id) REFERENCES Product(product_id)\n);\n\n-- Seed Data\nINSERT INTO Supplier (supplier_name, contact_email, city, rating) VALUES\n('TechWorld Pvt Ltd', 'techworld@mail.com', 'Chennai', 4.5),\n('DigiBazaar Ltd', 'digibazaar@mail.com', 'Bangalore', 4.2);\n\nINSERT INTO Customer (full_name, email, phone, city, wallet_balance) VALUES\n('Arjun Sharma', 'arjun@mail.com', '9876543210', 'Delhi', 5000.00),\n('Priya Nair', 'priya@mail.com', '9123456789', 'Kochi', 2000.00);\n\nINSERT INTO Product (supplier_id, product_name, category, price, stock_qty) VALUES\n(1, 'Wireless Mouse', 'Accessories', 450.00, 25),\n(2, 'USB-C Hub', 'Accessories', 850.00, 15);\n\nINSERT INTO Orders (customer_id, total_amount, order_status) VALUES\n(1, 1300.00, 'confirmed');\n\nINSERT INTO Order_Item (order_id, product_id, quantity, unit_price) VALUES\n(1, 1, 1, 450.00),\n(1, 2, 1, 850.00);\n\n-- Join Verification Query\nSELECT o.order_id, c.full_name AS customer, p.product_name, oi.quantity, oi.unit_price, (oi.quantity * oi.unit_price) AS line_total, o.order_status\nFROM Orders o\nINNER JOIN Customer c ON o.customer_id = c.customer_id\nINNER JOIN Order_Item oi ON o.order_id = oi.order_id\nINNER JOIN Product p ON oi.product_id = p.product_id;"
      },
      "expectedOutput": "Database changed\nQuery OK, 0 rows affected (Customer, Supplier, Product, Orders, Order_Item created)\nRecords: 2  Duplicates: 0  Warnings: 0\n\n+----------+--------------+----------------+----------+------------+------------+--------------+\n| order_id | customer     | product_name   | quantity | unit_price | line_total | order_status |\n+----------+--------------+----------------+----------+------------+------------+--------------+\n|        1 | Arjun Sharma | Wireless Mouse |        1 |     450.00 |     450.00 | confirmed    |\n|        1 | Arjun Sharma | USB-C Hub      |        1 |     850.00 |     850.00 | confirmed    |\n+----------+--------------+----------------+----------+------------+------------+--------------+\n2 rows in set (0.00 sec)",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd/3rd Year"
        ],
        "pg": [
          "M.E. Computer Science",
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "dbms-exp-2",
    "labId": "dbms-lab",
    "title": "Exp 2: Database Normalization from UNF to BCNF for a University Management System",
    "slug": "dbms-exp-2-database-normalization-from-unf-to-bcnf-for-a-university-management-system",
    "difficulty": "Beginner",
    "category": "Databases",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 188,
    "simulator": "sql",
    "quizId": "quiz-dbms-2",
    "sections": {
      "introduction": "To identify entities, attributes, relationships, and keys for a University Management System\rand to systematically normalize the relational schema through First Normal Form (1NF), Second\rNormal Form (2NF), Third Normal Form (3NF), and Boyce-Codd Normal Form (BCNF) to eliminate\rall data redundancy, partial dependencies, transitive dependencies, and anomalies.",
      "objective": "To identify entities, attributes, relationships, and keys for a University Management System\rand to systematically normalize the relational schema through First Normal Form (1NF), Second\rNormal Form (2NF), Third Normal Form (3NF), and Boyce-Codd Normal Form (BCNF) to eliminate\rall data redundancy, partial dependencies, transitive dependencies, and anomalies.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/HXV3zeRR3nw",
      "videoTitle": "DBMS Practical: Database Normalization from UNF to BCNF for a University Management System",
      "videoChannel": "Database Systems & SQL Lab",
      "prerequisites": [
        "Relational Model Basics",
        "SQL Fundamentals"
      ],
      "theory": {
        "overview": "This experiment implements Database Normalization from UNF to BCNF for a University Management System adhering to the V.S.B. Engineering College AI&DS Department curriculum. It covers relational integrity constraints, normalization, transaction ACID guarantees, indexing performance, and SQL procedural triggers.",
        "keyConcepts": [
          {
            "title": "Relational Integrity",
            "desc": "Primary key, foreign key, check, and default constraints enforcing data consistency."
          },
          {
            "title": "Query Execution & Optimization",
            "desc": "Execution plans, indexing, join mechanics, and aggregation pipelines."
          },
          {
            "title": "ACID Guarantees",
            "desc": "Atomic state transitions, consistency preservation, and isolation levels."
          }
        ],
        "complexities": [
          {
            "operation": "Indexed Lookup",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(log n)",
            "space": "O(n)"
          },
          {
            "operation": "Full Table Scan",
            "best": "O(n)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise resource planning (ERP) and e-commerce transactional engines",
          "Core banking and financial ledger processing systems",
          "Automated academic evaluation and examination management platforms"
        ]
      },
      "procedure": [
        "1. Connect to MySQL server and create the required database.",
        "2. Define relational tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "3. Insert representative transactional and master records.",
        "4. Execute analytical SQL queries with required clauses.",
        "5. Verify integrity constraints and transaction state consistency."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Exp 2: University Normalization (UNF to BCNF)\nCREATE DATABASE IF NOT EXISTS UniversityNormDB;\nUSE UniversityNormDB;\n\n-- BCNF Decomposed Tables\nCREATE TABLE Department (\n    dept_id VARCHAR(10) PRIMARY KEY,\n    dept_name VARCHAR(100) NOT NULL,\n    dept_head VARCHAR(100),\n    office_room VARCHAR(20)\n);\n\nCREATE TABLE Instructor (\n    instructor_id INT PRIMARY KEY,\n    instructor_name VARCHAR(100) NOT NULL,\n    email VARCHAR(100) UNIQUE,\n    dept_id VARCHAR(10),\n    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)\n);\n\nCREATE TABLE Course (\n    course_id VARCHAR(15) PRIMARY KEY,\n    course_title VARCHAR(150) NOT NULL,\n    credits INT CHECK (credits BETWEEN 1 AND 5),\n    dept_id VARCHAR(10),\n    instructor_id INT,\n    FOREIGN KEY (dept_id) REFERENCES Department(dept_id),\n    FOREIGN KEY (instructor_id) REFERENCES Instructor(instructor_id)\n);\n\nCREATE TABLE Student (\n    student_id INT PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL,\n    last_name VARCHAR(50),\n    email VARCHAR(100) UNIQUE,\n    enrollment_year INT CHECK (enrollment_year >= 2000),\n    dept_id VARCHAR(10),\n    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)\n);\n\nCREATE TABLE Enrollment (\n    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,\n    student_id INT NOT NULL,\n    course_id VARCHAR(15) NOT NULL,\n    semester VARCHAR(10),\n    grade VARCHAR(2),\n    UNIQUE KEY (student_id, course_id, semester),\n    FOREIGN KEY (student_id) REFERENCES Student(student_id),\n    FOREIGN KEY (course_id) REFERENCES Course(course_id)\n);\n\n-- Seed Data\nINSERT INTO Department VALUES ('AIDS', 'Artificial Intelligence & Data Science', 'Dr. S. Meenakshi', 'AB-204');\nINSERT INTO Instructor VALUES (101, 'Prof. Anand', 'anand@univ.edu', 'AIDS');\nINSERT INTO Course VALUES ('AD8303', 'Database Management Systems', 4, 'AIDS', 101);\nINSERT INTO Student VALUES (2021001, 'Rahul', 'Sharma', 'rahul@student.edu', 2023, 'AIDS');\nINSERT INTO Enrollment (student_id, course_id, semester, grade) VALUES (2021001, 'AD8303', 'SEM4', 'A');\n\nSELECT s.student_id, CONCAT(s.first_name, ' ', s.last_name) AS student_name, c.course_title, e.grade, d.dept_name\nFROM Enrollment e\nJOIN Student s ON e.student_id = s.student_id\nJOIN Course c ON e.course_id = c.course_id\nJOIN Department d ON c.dept_id = d.dept_id;"
      },
      "expectedOutput": "Database changed\nQuery OK, 0 rows affected (Normalized 3NF/BCNF tables created)\n5 rows inserted successfully.\n\n+------------+--------------+------------------------------+-------+-----------------------------------------+\n| student_id | student_name | course_title                 | grade | dept_name                               |\n+------------+--------------+------------------------------+-------+-----------------------------------------+\n|    2021001 | Rahul Sharma | Database Management Systems  | A     | Artificial Intelligence & Data Science  |\n+------------+--------------+------------------------------+-------+-----------------------------------------+\n1 row in set (0.01 sec)",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd/3rd Year"
        ],
        "pg": [
          "M.E. Computer Science",
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "dbms-exp-3",
    "labId": "dbms-lab",
    "title": "Exp 3: Implementation of ACID Properties and CAP Theorem Using MySQL",
    "slug": "dbms-exp-3-implementation-of-acid-properties-and-cap-theorem-using-mysql",
    "difficulty": "Beginner",
    "category": "Databases",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 192,
    "simulator": "sql",
    "quizId": "quiz-dbms-3",
    "sections": {
      "introduction": "To understand and demonstrate the four ACID properties — Atomicity, Consistency,\rIsolation, and Durability — of database transactions, and to analyze the CAP Theorem (Consistency,\rAvailability, Partition Tolerance) through a practical Online Shopping System. SQL transactions are\rused to show how ACID guarantees protect data integrity during order placement, payment\rprocessing, and failure recovery scenarios.",
      "objective": "To understand and demonstrate the four ACID properties — Atomicity, Consistency,\rIsolation, and Durability — of database transactions, and to analyze the CAP Theorem (Consistency,\rAvailability, Partition Tolerance) through a practical Online Shopping System. SQL transactions are\rused to show how ACID guarantees protect data integrity during order placement, payment\rprocessing, and failure recovery scenarios.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/HXV3zeRR3nw",
      "videoTitle": "DBMS Practical: Implementation of ACID Properties and CAP Theorem Using MySQL",
      "videoChannel": "Database Systems & SQL Lab",
      "prerequisites": [
        "Relational Model Basics",
        "SQL Fundamentals"
      ],
      "theory": {
        "overview": "This experiment implements Implementation of ACID Properties and CAP Theorem Using MySQL adhering to the V.S.B. Engineering College AI&DS Department curriculum. It covers relational integrity constraints, normalization, transaction ACID guarantees, indexing performance, and SQL procedural triggers.",
        "keyConcepts": [
          {
            "title": "Relational Integrity",
            "desc": "Primary key, foreign key, check, and default constraints enforcing data consistency."
          },
          {
            "title": "Query Execution & Optimization",
            "desc": "Execution plans, indexing, join mechanics, and aggregation pipelines."
          },
          {
            "title": "ACID Guarantees",
            "desc": "Atomic state transitions, consistency preservation, and isolation levels."
          }
        ],
        "complexities": [
          {
            "operation": "Indexed Lookup",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(log n)",
            "space": "O(n)"
          },
          {
            "operation": "Full Table Scan",
            "best": "O(n)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise resource planning (ERP) and e-commerce transactional engines",
          "Core banking and financial ledger processing systems",
          "Automated academic evaluation and examination management platforms"
        ]
      },
      "procedure": [
        "1. Connect to MySQL server and create the required database.",
        "2. Define relational tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "3. Insert representative transactional and master records.",
        "4. Execute analytical SQL queries with required clauses.",
        "5. Verify integrity constraints and transaction state consistency."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Exp 3: ACID Transactions & Concurrency Simulation\nCREATE DATABASE IF NOT EXISTS BankACIDDB;\nUSE BankACIDDB;\n\nCREATE TABLE Accounts (\n    acc_no INT PRIMARY KEY,\n    holder_name VARCHAR(100) NOT NULL,\n    balance DECIMAL(10,2) NOT NULL CHECK (balance >= 0)\n);\n\nCREATE TABLE AuditLog (\n    log_id INT AUTO_INCREMENT PRIMARY KEY,\n    action_type VARCHAR(50),\n    details TEXT,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nINSERT INTO Accounts VALUES (101, 'Arjun (Sender)', 5000.00), (102, 'Priya (Receiver)', 2000.00);\n\n-- Atomic Fund Transfer Transaction\nSTART TRANSACTION;\nUPDATE Accounts SET balance = balance - 1500.00 WHERE acc_no = 101;\nUPDATE Accounts SET balance = balance + 1500.00 WHERE acc_no = 102;\nINSERT INTO AuditLog (action_type, details) VALUES ('TRANSFER', 'Transferred 1500 from Acc 101 to 102');\nCOMMIT;\n\nSELECT * FROM Accounts;\nSELECT * FROM AuditLog;"
      },
      "expectedOutput": "Database changed\nQuery OK, 0 rows affected\nQuery OK, 2 rows affected (Accounts initialized)\n\nSTART TRANSACTION\nQuery OK, 1 row affected (Acc 101 debited)\nQuery OK, 1 row affected (Acc 102 credited)\nQuery OK, 1 row affected (Audit logged)\nCOMMIT; (Transaction finalized atomically)\n\n+--------+------------------+---------+\n| acc_no | holder_name      | balance |\n+--------+------------------+---------+\n|    101 | Arjun (Sender)   | 3500.00 |\n|    102 | Priya (Receiver) | 3500.00 |\n+--------+------------------+---------+\n2 rows in set (0.00 sec)",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd/3rd Year"
        ],
        "pg": [
          "M.E. Computer Science",
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "dbms-exp-4",
    "labId": "dbms-lab",
    "title": "Exp 4: Implementation of DDL Commands and ALTER TABLE Operations in MySQL",
    "slug": "dbms-exp-4-implementation-of-ddl-commands-and-alter-table-operations-in-mysql",
    "difficulty": "Beginner",
    "category": "Databases",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 196,
    "simulator": "sql",
    "quizId": "quiz-dbms-4",
    "sections": {
      "introduction": "To create the Student, Department, and Course tables in a relational database using DDL\rcommands such as CREATE TABLE, and to modify the schema structure using ALTER TABLE\rstatements by adding new columns, modifying column data types, renaming columns, and dropping\rcolumns — demonstrating complete lifecycle management of a database schema in MySQL.",
      "objective": "To create the Student, Department, and Course tables in a relational database using DDL\rcommands such as CREATE TABLE, and to modify the schema structure using ALTER TABLE\rstatements by adding new columns, modifying column data types, renaming columns, and dropping\rcolumns — demonstrating complete lifecycle management of a database schema in MySQL.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/HXV3zeRR3nw",
      "videoTitle": "DBMS Practical: Implementation of DDL Commands and ALTER TABLE Operations in MySQL",
      "videoChannel": "Database Systems & SQL Lab",
      "prerequisites": [
        "Relational Model Basics",
        "SQL Fundamentals"
      ],
      "theory": {
        "overview": "This experiment implements Implementation of DDL Commands and ALTER TABLE Operations in MySQL adhering to the V.S.B. Engineering College AI&DS Department curriculum. It covers relational integrity constraints, normalization, transaction ACID guarantees, indexing performance, and SQL procedural triggers.",
        "keyConcepts": [
          {
            "title": "Relational Integrity",
            "desc": "Primary key, foreign key, check, and default constraints enforcing data consistency."
          },
          {
            "title": "Query Execution & Optimization",
            "desc": "Execution plans, indexing, join mechanics, and aggregation pipelines."
          },
          {
            "title": "ACID Guarantees",
            "desc": "Atomic state transitions, consistency preservation, and isolation levels."
          }
        ],
        "complexities": [
          {
            "operation": "Indexed Lookup",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(log n)",
            "space": "O(n)"
          },
          {
            "operation": "Full Table Scan",
            "best": "O(n)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise resource planning (ERP) and e-commerce transactional engines",
          "Core banking and financial ledger processing systems",
          "Automated academic evaluation and examination management platforms"
        ]
      },
      "procedure": [
        "1. Connect to MySQL server and create the required database.",
        "2. Define relational tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "3. Insert representative transactional and master records.",
        "4. Execute analytical SQL queries with required clauses.",
        "5. Verify integrity constraints and transaction state consistency."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Exp 4: DDL Commands and ALTER TABLE Operations\nCREATE DATABASE IF NOT EXISTS CollegeDB;\nUSE CollegeDB;\n\nCREATE TABLE Department (\n    dept_id INT PRIMARY KEY,\n    dept_name VARCHAR(50) NOT NULL\n);\n\nCREATE TABLE Student (\n    reg_no INT PRIMARY KEY,\n    stud_name VARCHAR(100) NOT NULL,\n    dob DATE,\n    dept_id INT,\n    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)\n);\n\n-- ALTER TABLE Operations\nALTER TABLE Student ADD COLUMN email VARCHAR(100) UNIQUE;\nALTER TABLE Student MODIFY COLUMN stud_name VARCHAR(150);\nALTER TABLE Student ADD COLUMN cgpa DECIMAL(3,2) DEFAULT 0.00;\nALTER TABLE Student DROP COLUMN dob;\n\nDESCRIBE Student;"
      },
      "expectedOutput": "Database changed\nQuery OK, 0 rows affected (Tables created)\nQuery OK, 0 rows affected (Column email added)\nQuery OK, 0 rows affected (stud_name column size modified to 150)\nQuery OK, 0 rows affected (Column cgpa added)\nQuery OK, 0 rows affected (Column dob dropped)\n\n+-----------+--------------+------+-----+---------+-------+\n| Field     | Type         | Null | Key | Default | Extra |\n+-----------+--------------+------+-----+---------+-------+\n| reg_no    | int          | NO   | PRI | NULL    |       |\n| stud_name | varchar(150) | YES  |     | NULL    |       |\n| dept_id   | int          | YES  | MUL | NULL    |       |\n| email     | varchar(100) | YES  | UNI | NULL    |       |\n| cgpa      | decimal(3,2) | YES  |     | 0.00    |       |\n+-----------+--------------+------+-----+---------+-------+\n5 rows in set (0.00 sec)",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd/3rd Year"
        ],
        "pg": [
          "M.E. Computer Science",
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "dbms-exp-5",
    "labId": "dbms-lab",
    "title": "Exp 5: Performing INSERT, UPDATE, and DELETE Operations on an Employee Database",
    "slug": "dbms-exp-5-performing-insert-update-and-delete-operations-on-an-employee-database",
    "difficulty": "Beginner",
    "category": "Databases",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 200,
    "simulator": "sql",
    "quizId": "quiz-dbms-5",
    "sections": {
      "introduction": "To create an Employee database and perform DML operations — INSERT, UPDATE, and DELETE\r— on the Employee, Department, and Salary tables, and to systematically analyse the before-and-after\rstate of data after each operation using SELECT queries, demonstrating the complete impact of each\rDML command in a real-world HR scenario.",
      "objective": "To create an Employee database and perform DML operations — INSERT, UPDATE, and DELETE\r— on the Employee, Department, and Salary tables, and to systematically analyse the before-and-after\rstate of data after each operation using SELECT queries, demonstrating the complete impact of each\rDML command in a real-world HR scenario.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/HXV3zeRR3nw",
      "videoTitle": "DBMS Practical: Performing INSERT, UPDATE, and DELETE Operations on an Employee Database",
      "videoChannel": "Database Systems & SQL Lab",
      "prerequisites": [
        "Relational Model Basics",
        "SQL Fundamentals"
      ],
      "theory": {
        "overview": "This experiment implements Performing INSERT, UPDATE, and DELETE Operations on an Employee Database adhering to the V.S.B. Engineering College AI&DS Department curriculum. It covers relational integrity constraints, normalization, transaction ACID guarantees, indexing performance, and SQL procedural triggers.",
        "keyConcepts": [
          {
            "title": "Relational Integrity",
            "desc": "Primary key, foreign key, check, and default constraints enforcing data consistency."
          },
          {
            "title": "Query Execution & Optimization",
            "desc": "Execution plans, indexing, join mechanics, and aggregation pipelines."
          },
          {
            "title": "ACID Guarantees",
            "desc": "Atomic state transitions, consistency preservation, and isolation levels."
          }
        ],
        "complexities": [
          {
            "operation": "Indexed Lookup",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(log n)",
            "space": "O(n)"
          },
          {
            "operation": "Full Table Scan",
            "best": "O(n)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise resource planning (ERP) and e-commerce transactional engines",
          "Core banking and financial ledger processing systems",
          "Automated academic evaluation and examination management platforms"
        ]
      },
      "procedure": [
        "1. Connect to MySQL server and create the required database.",
        "2. Define relational tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "3. Insert representative transactional and master records.",
        "4. Execute analytical SQL queries with required clauses.",
        "5. Verify integrity constraints and transaction state consistency."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Exp 5: DML Operations (INSERT, UPDATE, DELETE)\nCREATE DATABASE IF NOT EXISTS EmployeeDMLDB;\nUSE EmployeeDMLDB;\n\nCREATE TABLE Employee (\n    emp_id INT PRIMARY KEY,\n    emp_name VARCHAR(100) NOT NULL,\n    department VARCHAR(50),\n    designation VARCHAR(50),\n    salary DECIMAL(10,2)\n);\n\n-- 1. INSERT Operations\nINSERT INTO Employee VALUES \n(101, 'Kavitha R', 'AI&DS', 'Assistant Professor', 55000.00),\n(102, 'Suresh K', 'CSE', 'Assistant Professor', 52000.00),\n(103, 'Meena V', 'AI&DS', 'Associate Professor', 75000.00),\n(104, 'Ganesh T', 'IT', 'Lecturer', 38000.00);\n\n-- 2. UPDATE Operations (10% hike for AI&DS faculty)\nUPDATE Employee SET salary = salary * 1.10 WHERE department = 'AI&DS';\n\n-- 3. DELETE Operations\nDELETE FROM Employee WHERE emp_id = 104;\n\nSELECT * FROM Employee ORDER BY salary DESC;"
      },
      "expectedOutput": "Database changed\nQuery OK, 4 rows affected (Records inserted)\nRows matched: 2  Changed: 2  Warnings: 0 (Salaries updated with 10% hike)\nQuery OK, 1 row affected (Lecturer Ganesh T deleted)\n\n+--------+-----------+------------+---------------------+----------+\n| emp_id | emp_name  | department | designation         | salary   |\n+--------+-----------+------------+---------------------+----------+\n|    103 | Meena V   | AI&DS      | Associate Professor | 82500.00 |\n|    101 | Kavitha R | AI&DS      | Assistant Professor | 60500.00 |\n|    102 | Suresh K  | CSE        | Assistant Professor | 52000.00 |\n+--------+-----------+------------+---------------------+----------+\n3 rows in set (0.00 sec)",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd/3rd Year"
        ],
        "pg": [
          "M.E. Computer Science",
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "dbms-exp-6",
    "labId": "dbms-lab",
    "title": "Exp 6: Comparison of DELETE, TRUNCATE, and DROP Commands Using a Product",
    "slug": "dbms-exp-6-comparison-of-delete-truncate-and-drop-commands-using-a-product",
    "difficulty": "Intermediate",
    "category": "Databases",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 204,
    "simulator": "sql",
    "quizId": "quiz-dbms-6",
    "sections": {
      "introduction": "To design and implement a Product Inventory database consisting of Category, Product, and\rStock_Log tables, and to demonstrate the use of the DELETE, TRUNCATE, and DROP commands in\rMySQL for removing rows, clearing a table, and destroying database objects respectively, while\robserving how each command affects data, table structure, and the AUTO_INCREMENT sequence.",
      "objective": "To design and implement a Product Inventory database consisting of Category, Product, and\rStock_Log tables, and to demonstrate the use of the DELETE, TRUNCATE, and DROP commands in\rMySQL for removing rows, clearing a table, and destroying database objects respectively, while\robserving how each command affects data, table structure, and the AUTO_INCREMENT sequence.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/HXV3zeRR3nw",
      "videoTitle": "DBMS Practical: Comparison of DELETE, TRUNCATE, and DROP Commands Using a Product",
      "videoChannel": "Database Systems & SQL Lab",
      "prerequisites": [
        "Relational Model Basics",
        "SQL Fundamentals"
      ],
      "theory": {
        "overview": "This experiment implements Comparison of DELETE, TRUNCATE, and DROP Commands Using a Product adhering to the V.S.B. Engineering College AI&DS Department curriculum. It covers relational integrity constraints, normalization, transaction ACID guarantees, indexing performance, and SQL procedural triggers.",
        "keyConcepts": [
          {
            "title": "Relational Integrity",
            "desc": "Primary key, foreign key, check, and default constraints enforcing data consistency."
          },
          {
            "title": "Query Execution & Optimization",
            "desc": "Execution plans, indexing, join mechanics, and aggregation pipelines."
          },
          {
            "title": "ACID Guarantees",
            "desc": "Atomic state transitions, consistency preservation, and isolation levels."
          }
        ],
        "complexities": [
          {
            "operation": "Indexed Lookup",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(log n)",
            "space": "O(n)"
          },
          {
            "operation": "Full Table Scan",
            "best": "O(n)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise resource planning (ERP) and e-commerce transactional engines",
          "Core banking and financial ledger processing systems",
          "Automated academic evaluation and examination management platforms"
        ]
      },
      "procedure": [
        "1. Connect to MySQL server and create the required database.",
        "2. Define relational tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "3. Insert representative transactional and master records.",
        "4. Execute analytical SQL queries with required clauses.",
        "5. Verify integrity constraints and transaction state consistency."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Exp 6: Comparison of DELETE, TRUNCATE, and DROP\nCREATE DATABASE IF NOT EXISTS CleanUpDemoDB;\nUSE CleanUpDemoDB;\n\nCREATE TABLE ProductLog (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    event_name VARCHAR(100),\n    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nINSERT INTO ProductLog (event_name) VALUES ('Login'), ('ViewProduct'), ('AddToCart');\n\n-- 1. DELETE with condition (DML, Rollback-capable)\nDELETE FROM ProductLog WHERE id = 1;\n\n-- 2. TRUNCATE Table (DDL, Fast reset, resets AUTO_INCREMENT)\nTRUNCATE TABLE ProductLog;\n\n-- 3. DROP Table (DDL, completely removes schema)\nDROP TABLE ProductLog;\n\nSHOW TABLES LIKE 'ProductLog';"
      },
      "expectedOutput": "Database changed\nQuery OK, 3 rows affected (Seed records inserted)\nQuery OK, 1 row affected (DELETE event_name='Login')\nQuery OK, 0 rows affected (TRUNCATE emptied table and reset ID sequence)\nQuery OK, 0 rows affected (DROP completely deleted table structure from dictionary)\n\nEmpty set (0.00 sec)\nVerification: ProductLog successfully dropped.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd/3rd Year"
        ],
        "pg": [
          "M.E. Computer Science",
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "dbms-exp-7",
    "labId": "dbms-lab",
    "title": "Exp 7: Implementation of SQL Constraints in a Hospital Appointment System",
    "slug": "dbms-exp-7-implementation-of-sql-constraints-in-a-hospital-appointment-system",
    "difficulty": "Intermediate",
    "category": "Databases",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 208,
    "simulator": "sql",
    "quizId": "quiz-dbms-7",
    "sections": {
      "introduction": "To design and implement the relational database schema for a Hospital Appointment System,\rand to create the DEPARTMENT, DOCTOR, PATIENT, APPOINTMENT, PRESCRIPTION and\rBILLING tables in MySQL using PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK and\rDEFAULT constraints so that entity integrity, referential integrity, and business rules are enforced\rautomatically by the database.",
      "objective": "To design and implement the relational database schema for a Hospital Appointment System,\rand to create the DEPARTMENT, DOCTOR, PATIENT, APPOINTMENT, PRESCRIPTION and\rBILLING tables in MySQL using PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK and\rDEFAULT constraints so that entity integrity, referential integrity, and business rules are enforced\rautomatically by the database.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/HXV3zeRR3nw",
      "videoTitle": "DBMS Practical: Implementation of SQL Constraints in a Hospital Appointment System",
      "videoChannel": "Database Systems & SQL Lab",
      "prerequisites": [
        "Relational Model Basics",
        "SQL Fundamentals"
      ],
      "theory": {
        "overview": "This experiment implements Implementation of SQL Constraints in a Hospital Appointment System adhering to the V.S.B. Engineering College AI&DS Department curriculum. It covers relational integrity constraints, normalization, transaction ACID guarantees, indexing performance, and SQL procedural triggers.",
        "keyConcepts": [
          {
            "title": "Relational Integrity",
            "desc": "Primary key, foreign key, check, and default constraints enforcing data consistency."
          },
          {
            "title": "Query Execution & Optimization",
            "desc": "Execution plans, indexing, join mechanics, and aggregation pipelines."
          },
          {
            "title": "ACID Guarantees",
            "desc": "Atomic state transitions, consistency preservation, and isolation levels."
          }
        ],
        "complexities": [
          {
            "operation": "Indexed Lookup",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(log n)",
            "space": "O(n)"
          },
          {
            "operation": "Full Table Scan",
            "best": "O(n)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise resource planning (ERP) and e-commerce transactional engines",
          "Core banking and financial ledger processing systems",
          "Automated academic evaluation and examination management platforms"
        ]
      },
      "procedure": [
        "1. Connect to MySQL server and create the required database.",
        "2. Define relational tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "3. Insert representative transactional and master records.",
        "4. Execute analytical SQL queries with required clauses.",
        "5. Verify integrity constraints and transaction state consistency."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Exp 7: Integrity Constraints in Hospital Appointment System\nCREATE DATABASE IF NOT EXISTS HospitalDB;\nUSE HospitalDB;\n\nCREATE TABLE Doctor (\n    doctor_id INT PRIMARY KEY,\n    doctor_name VARCHAR(100) NOT NULL,\n    specialization VARCHAR(50) NOT NULL,\n    experience_years INT CHECK (experience_years >= 0)\n);\n\nCREATE TABLE Patient (\n    patient_id INT PRIMARY KEY,\n    patient_name VARCHAR(100) NOT NULL,\n    phone VARCHAR(15) UNIQUE NOT NULL,\n    age INT CHECK (age BETWEEN 0 AND 120),\n    gender ENUM('Male', 'Female', 'Other') NOT NULL\n);\n\nCREATE TABLE Appointment (\n    app_id INT AUTO_INCREMENT PRIMARY KEY,\n    doctor_id INT NOT NULL,\n    patient_id INT NOT NULL,\n    app_date DATE NOT NULL,\n    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',\n    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id) ON DELETE CASCADE,\n    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id) ON DELETE CASCADE,\n    UNIQUE KEY uq_slot (doctor_id, app_date)\n);\n\nINSERT INTO Doctor VALUES (1, 'Dr. Arvind Rao', 'Cardiology', 15);\nINSERT INTO Patient VALUES (101, 'Santhosh M', '9840123456', 42, 'Male');\nINSERT INTO Appointment (doctor_id, patient_id, app_date) VALUES (1, 101, '2026-10-15');\n\nSELECT a.app_id, d.doctor_name, d.specialization, p.patient_name, a.app_date, a.status\nFROM Appointment a\nJOIN Doctor d ON a.doctor_id = d.doctor_id\nJOIN Patient p ON a.patient_id = p.patient_id;"
      },
      "expectedOutput": "Database changed\nQuery OK, 0 rows affected (Doctor, Patient, Appointment created with PRIMARY, FOREIGN, CHECK, UNIQUE constraints)\nRecords inserted successfully.\n\n+--------+----------------+----------------+--------------+------------+-----------+\n| app_id | doctor_name    | specialization | patient_name | app_date   | status    |\n+--------+----------------+----------------+--------------+------------+-----------+\n|      1 | Dr. Arvind Rao | Cardiology     | Santhosh M   | 2026-10-15 | Scheduled |\n+--------+----------------+----------------+--------------+------------+-----------+\n1 row in set (0.00 sec)",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd/3rd Year"
        ],
        "pg": [
          "M.E. Computer Science",
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "dbms-exp-8",
    "labId": "dbms-lab",
    "title": "Exp 8: Customer Analytics Using WHERE, ORDER BY, LIKE, IN, BETWEEN, and",
    "slug": "dbms-exp-8-customer-analytics-using-where-order-by-like-in-between-and",
    "difficulty": "Intermediate",
    "category": "Databases",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 212,
    "simulator": "sql",
    "quizId": "quiz-dbms-8",
    "sections": {
      "introduction": "To retrieve and analyze active customer records from a Customer Relationship Management\r(CRM) database using core SQL clauses — WHERE, ORDER BY, LIKE, IN, BETWEEN, and\rDISTINCT — and to apply these clauses individually and in combination to answer realistic\rcustomer-analytics questions such as filtering by status, ranking by purchase value, pattern-matching\ron names or emails, and identifying unique cities and membership tiers.",
      "objective": "To retrieve and analyze active customer records from a Customer Relationship Management\r(CRM) database using core SQL clauses — WHERE, ORDER BY, LIKE, IN, BETWEEN, and\rDISTINCT — and to apply these clauses individually and in combination to answer realistic\rcustomer-analytics questions such as filtering by status, ranking by purchase value, pattern-matching\ron names or emails, and identifying unique cities and membership tiers.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/HXV3zeRR3nw",
      "videoTitle": "DBMS Practical: Customer Analytics Using WHERE, ORDER BY, LIKE, IN, BETWEEN, and",
      "videoChannel": "Database Systems & SQL Lab",
      "prerequisites": [
        "Relational Model Basics",
        "SQL Fundamentals"
      ],
      "theory": {
        "overview": "This experiment implements Customer Analytics Using WHERE, ORDER BY, LIKE, IN, BETWEEN, and adhering to the V.S.B. Engineering College AI&DS Department curriculum. It covers relational integrity constraints, normalization, transaction ACID guarantees, indexing performance, and SQL procedural triggers.",
        "keyConcepts": [
          {
            "title": "Relational Integrity",
            "desc": "Primary key, foreign key, check, and default constraints enforcing data consistency."
          },
          {
            "title": "Query Execution & Optimization",
            "desc": "Execution plans, indexing, join mechanics, and aggregation pipelines."
          },
          {
            "title": "ACID Guarantees",
            "desc": "Atomic state transitions, consistency preservation, and isolation levels."
          }
        ],
        "complexities": [
          {
            "operation": "Indexed Lookup",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(log n)",
            "space": "O(n)"
          },
          {
            "operation": "Full Table Scan",
            "best": "O(n)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise resource planning (ERP) and e-commerce transactional engines",
          "Core banking and financial ledger processing systems",
          "Automated academic evaluation and examination management platforms"
        ]
      },
      "procedure": [
        "1. Connect to MySQL server and create the required database.",
        "2. Define relational tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "3. Insert representative transactional and master records.",
        "4. Execute analytical SQL queries with required clauses.",
        "5. Verify integrity constraints and transaction state consistency."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Exp 8: Customer Analytics (WHERE, ORDER BY, LIKE, IN, BETWEEN)\nUSE ShopEasyDB;\n\n-- 1. LIKE Pattern matching (names starting with 'A' or Gmail users)\nSELECT customer_id, full_name, email FROM Customer WHERE full_name LIKE 'A%';\n\n-- 2. IN clause (customers in Delhi or Kochi)\nSELECT customer_id, full_name, city, wallet_balance FROM Customer WHERE city IN ('Delhi', 'Kochi');\n\n-- 3. BETWEEN clause (wallet balance between 2000 and 6000)\nSELECT customer_id, full_name, wallet_balance FROM Customer WHERE wallet_balance BETWEEN 2000 AND 6000 ORDER BY wallet_balance DESC;"
      },
      "expectedOutput": "Database changed\n\n-- Query 1 (LIKE 'A%')\n+-------------+--------------+----------------+\n| customer_id | full_name    | email          |\n+-------------+--------------+----------------+\n|           1 | Arjun Sharma | arjun@mail.com |\n+-------------+--------------+----------------+\n\n-- Query 2 (IN ('Delhi', 'Kochi'))\n+-------------+--------------+-------+----------------+\n| customer_id | full_name    | city  | wallet_balance |\n+-------------+--------------+-------+----------------+\n|           1 | Arjun Sharma | Delhi |        5000.00 |\n|           2 | Priya Nair   | Kochi |        2000.00 |\n+-------------+--------------+-------+----------------+\n\n-- Query 3 (BETWEEN 2000 AND 6000 ORDER BY wallet_balance DESC)\n+-------------+--------------+----------------+\n| customer_id | full_name    | wallet_balance |\n+-------------+--------------+----------------+\n|           1 | Arjun Sharma |        5000.00 |\n|           2 | Priya Nair   |        2000.00 |\n+-------------+--------------+----------------+",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd/3rd Year"
        ],
        "pg": [
          "M.E. Computer Science",
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "dbms-exp-9",
    "labId": "dbms-lab",
    "title": "Exp 9: Generating Monthly Sales Reports Using Aggregate Functions, GROUP BY,",
    "slug": "dbms-exp-9-generating-monthly-sales-reports-using-aggregate-functions-group-by",
    "difficulty": "Intermediate",
    "category": "Databases",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 216,
    "simulator": "sql",
    "quizId": "quiz-dbms-9",
    "sections": {
      "introduction": "To generate structured monthly sales reports for a retail sales database by applying SQL\raggregate functions, GROUP BY, and HAVING to summarize revenue, using CASE WHEN to\rclassify monthly performance, and using string functions to format readable, presentation-ready report\rlabels.",
      "objective": "To generate structured monthly sales reports for a retail sales database by applying SQL\raggregate functions, GROUP BY, and HAVING to summarize revenue, using CASE WHEN to\rclassify monthly performance, and using string functions to format readable, presentation-ready report\rlabels.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/HXV3zeRR3nw",
      "videoTitle": "DBMS Practical: Generating Monthly Sales Reports Using Aggregate Functions, GROUP BY,",
      "videoChannel": "Database Systems & SQL Lab",
      "prerequisites": [
        "Relational Model Basics",
        "SQL Fundamentals"
      ],
      "theory": {
        "overview": "This experiment implements Generating Monthly Sales Reports Using Aggregate Functions, GROUP BY, adhering to the V.S.B. Engineering College AI&DS Department curriculum. It covers relational integrity constraints, normalization, transaction ACID guarantees, indexing performance, and SQL procedural triggers.",
        "keyConcepts": [
          {
            "title": "Relational Integrity",
            "desc": "Primary key, foreign key, check, and default constraints enforcing data consistency."
          },
          {
            "title": "Query Execution & Optimization",
            "desc": "Execution plans, indexing, join mechanics, and aggregation pipelines."
          },
          {
            "title": "ACID Guarantees",
            "desc": "Atomic state transitions, consistency preservation, and isolation levels."
          }
        ],
        "complexities": [
          {
            "operation": "Indexed Lookup",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(log n)",
            "space": "O(n)"
          },
          {
            "operation": "Full Table Scan",
            "best": "O(n)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise resource planning (ERP) and e-commerce transactional engines",
          "Core banking and financial ledger processing systems",
          "Automated academic evaluation and examination management platforms"
        ]
      },
      "procedure": [
        "1. Connect to MySQL server and create the required database.",
        "2. Define relational tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "3. Insert representative transactional and master records.",
        "4. Execute analytical SQL queries with required clauses.",
        "5. Verify integrity constraints and transaction state consistency."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Exp 9: Aggregate Functions, GROUP BY, and HAVING for Sales Reports\nUSE ShopEasyDB;\n\n-- Category-wise Total Revenue and Product Count with HAVING total_revenue > 500\nSELECT category, COUNT(product_id) AS total_products, MIN(price) AS min_price, MAX(price) AS max_price, AVG(price) AS avg_price, SUM(price * stock_qty) AS inventory_value\nFROM Product\nGROUP BY category\nHAVING inventory_value > 5000.00\nORDER BY inventory_value DESC;"
      },
      "expectedOutput": "Database changed\n\n+-------------+----------------+-----------+-----------+------------+-----------------+\n| category    | total_products | min_price | max_price | avg_price  | inventory_value |\n+-------------+----------------+-----------+-----------+------------+-----------------+\n| Accessories |              2 |    450.00 |    850.00 | 650.000000 |        24000.00 |\n+-------------+----------------+-----------+-----------+------------+-----------------+\n1 row in set (0.01 sec)",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd/3rd Year"
        ],
        "pg": [
          "M.E. Computer Science",
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "dbms-exp-10",
    "labId": "dbms-lab",
    "title": "Exp 10: Ranking Products Based on Sales Performance Using SQL Window Functions",
    "slug": "dbms-exp-10-ranking-products-based-on-sales-performance-using-sql-window-functions",
    "difficulty": "Intermediate",
    "category": "Databases",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 220,
    "simulator": "sql",
    "quizId": "quiz-dbms-10",
    "sections": {
      "introduction": "To use the SQL window ranking functions ROW_NUMBER(), RANK(), DENSE_RANK(),\rand PERCENT_RANK() to rank products based on their sales performance (total revenue), and to\rcompare how each function behaves when two or more products have tied sales figures.",
      "objective": "To use the SQL window ranking functions ROW_NUMBER(), RANK(), DENSE_RANK(),\rand PERCENT_RANK() to rank products based on their sales performance (total revenue), and to\rcompare how each function behaves when two or more products have tied sales figures.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/HXV3zeRR3nw",
      "videoTitle": "DBMS Practical: Ranking Products Based on Sales Performance Using SQL Window Functions",
      "videoChannel": "Database Systems & SQL Lab",
      "prerequisites": [
        "Relational Model Basics",
        "SQL Fundamentals"
      ],
      "theory": {
        "overview": "This experiment implements Ranking Products Based on Sales Performance Using SQL Window Functions adhering to the V.S.B. Engineering College AI&DS Department curriculum. It covers relational integrity constraints, normalization, transaction ACID guarantees, indexing performance, and SQL procedural triggers.",
        "keyConcepts": [
          {
            "title": "Relational Integrity",
            "desc": "Primary key, foreign key, check, and default constraints enforcing data consistency."
          },
          {
            "title": "Query Execution & Optimization",
            "desc": "Execution plans, indexing, join mechanics, and aggregation pipelines."
          },
          {
            "title": "ACID Guarantees",
            "desc": "Atomic state transitions, consistency preservation, and isolation levels."
          }
        ],
        "complexities": [
          {
            "operation": "Indexed Lookup",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(log n)",
            "space": "O(n)"
          },
          {
            "operation": "Full Table Scan",
            "best": "O(n)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise resource planning (ERP) and e-commerce transactional engines",
          "Core banking and financial ledger processing systems",
          "Automated academic evaluation and examination management platforms"
        ]
      },
      "procedure": [
        "1. Connect to MySQL server and create the required database.",
        "2. Define relational tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "3. Insert representative transactional and master records.",
        "4. Execute analytical SQL queries with required clauses.",
        "5. Verify integrity constraints and transaction state consistency."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Exp 10: SQL Window Functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE)\nCREATE DATABASE IF NOT EXISTS SalesAnalyticsDB;\nUSE SalesAnalyticsDB;\n\nCREATE TABLE SalesRep (\n    rep_id INT PRIMARY KEY,\n    rep_name VARCHAR(100),\n    region VARCHAR(50),\n    total_sales DECIMAL(10,2)\n);\n\nINSERT INTO SalesRep VALUES\n(1, 'Deepak', 'South', 95000.00),\n(2, 'Divya', 'South', 95000.00),\n(3, 'Rajesh', 'South', 82000.00),\n(4, 'Sneha', 'North', 120000.00),\n(5, 'Amit', 'North', 110000.00);\n\nSELECT rep_name, region, total_sales,\n       ROW_NUMBER() OVER (PARTITION BY region ORDER BY total_sales DESC) AS row_num,\n       RANK() OVER (PARTITION BY region ORDER BY total_sales DESC) AS sales_rank,\n       DENSE_RANK() OVER (PARTITION BY region ORDER BY total_sales DESC) AS dense_sales_rank\nFROM SalesRep;"
      },
      "expectedOutput": "Database changed\nQuery OK, 5 rows inserted.\n\n+----------+--------+-------------+---------+------------+------------------+\n| rep_name | region | total_sales | row_num | sales_rank | dense_sales_rank |\n+----------+--------+-------------+---------+------------+------------------+\n| Sneha    | North  |   120000.00 |       1 |          1 |                1 |\n| Amit     | North  |   110000.00 |       2 |          2 |                2 |\n| Deepak   | South  |    95000.00 |       1 |          1 |                1 |\n| Divya    | South  |    95000.00 |       2 |          1 |                1 |\n| Rajesh   | South  |    82000.00 |       3 |          3 |                2 |\n+----------+--------+-------------+---------+------------+------------------+\n5 rows in set (0.01 sec)",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd/3rd Year"
        ],
        "pg": [
          "M.E. Computer Science",
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "dbms-exp-11",
    "labId": "dbms-lab",
    "title": "Exp 11: Banking Transaction Analysis — JOIN and Subquery-based SQL Statements",
    "slug": "dbms-exp-11-banking-transaction-analysis-join-and-subquery-based-sql-statements",
    "difficulty": "Advanced",
    "category": "Databases",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 224,
    "simulator": "sql",
    "quizId": "quiz-dbms-11",
    "sections": {
      "introduction": "To write and execute JOIN and Subquery-based SQL statements on a banking database in\rorder to retrieve complete customer transaction details, identify customers whose account balance is\rabove the average balance, and perform SELF JOIN operations to find customers linked through the\rsame branch.",
      "objective": "To write and execute JOIN and Subquery-based SQL statements on a banking database in\rorder to retrieve complete customer transaction details, identify customers whose account balance is\rabove the average balance, and perform SELF JOIN operations to find customers linked through the\rsame branch.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/HXV3zeRR3nw",
      "videoTitle": "DBMS Practical: Banking Transaction Analysis — JOIN and Subquery-based SQL Statements",
      "videoChannel": "Database Systems & SQL Lab",
      "prerequisites": [
        "Relational Model Basics",
        "SQL Fundamentals"
      ],
      "theory": {
        "overview": "This experiment implements Banking Transaction Analysis — JOIN and Subquery-based SQL Statements adhering to the V.S.B. Engineering College AI&DS Department curriculum. It covers relational integrity constraints, normalization, transaction ACID guarantees, indexing performance, and SQL procedural triggers.",
        "keyConcepts": [
          {
            "title": "Relational Integrity",
            "desc": "Primary key, foreign key, check, and default constraints enforcing data consistency."
          },
          {
            "title": "Query Execution & Optimization",
            "desc": "Execution plans, indexing, join mechanics, and aggregation pipelines."
          },
          {
            "title": "ACID Guarantees",
            "desc": "Atomic state transitions, consistency preservation, and isolation levels."
          }
        ],
        "complexities": [
          {
            "operation": "Indexed Lookup",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(log n)",
            "space": "O(n)"
          },
          {
            "operation": "Full Table Scan",
            "best": "O(n)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise resource planning (ERP) and e-commerce transactional engines",
          "Core banking and financial ledger processing systems",
          "Automated academic evaluation and examination management platforms"
        ]
      },
      "procedure": [
        "1. Connect to MySQL server and create the required database.",
        "2. Define relational tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "3. Insert representative transactional and master records.",
        "4. Execute analytical SQL queries with required clauses.",
        "5. Verify integrity constraints and transaction state consistency."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Exp 11: Banking Transaction Analysis (JOINs & Nested Subqueries)\nCREATE DATABASE IF NOT EXISTS BankAnalyticsDB;\nUSE BankAnalyticsDB;\n\nCREATE TABLE Customer (\n    cust_id INT PRIMARY KEY,\n    name VARCHAR(100),\n    city VARCHAR(50)\n);\n\nCREATE TABLE Account (\n    acc_no INT PRIMARY KEY,\n    cust_id INT,\n    balance DECIMAL(12,2),\n    FOREIGN KEY (cust_id) REFERENCES Customer(cust_id)\n);\n\nINSERT INTO Customer VALUES (1, 'Karthik', 'Chennai'), (2, 'Ananya', 'Bangalore'), (3, 'Vikram', 'Mumbai');\nINSERT INTO Account VALUES (1001, 1, 85000.00), (1002, 2, 42000.00), (1003, 3, 125000.00);\n\n-- Correlated Subquery: Customers with balance above average\nSELECT c.name, a.acc_no, a.balance\nFROM Customer c\nJOIN Account a ON c.cust_id = a.cust_id\nWHERE a.balance > (SELECT AVG(balance) FROM Account);"
      },
      "expectedOutput": "Database changed\nRecords created successfully.\n\n+--------+--------+-----------+\n| name   | acc_no | balance   |\n+--------+--------+-----------+\n| Vikram |   1003 | 125000.00 |\n+--------+--------+-----------+\nAverage balance across accounts: 84000.00\n1 row in set (0.01 sec)",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd/3rd Year"
        ],
        "pg": [
          "M.E. Computer Science",
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "dbms-exp-12",
    "labId": "dbms-lab",
    "title": "Exp 12: ShopEasy E-Commerce Database — SQL Views, Indexing, and Query Performance",
    "slug": "dbms-exp-12-shopeasy-e-commerce-database-sql-views-indexing-and-query-performance",
    "difficulty": "Advanced",
    "category": "Databases",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 228,
    "simulator": "sql",
    "quizId": "quiz-dbms-12",
    "sections": {
      "introduction": "To create SQL Views for simplifying complex multi-table queries on the ShopEasy e-\rcommerce database, to build Single-Column, Composite, and Unique Indexes on frequently queried\rcolumns, and to analyze and compare query execution performance before and after indexing using\rthe EXPLAIN plan.",
      "objective": "To create SQL Views for simplifying complex multi-table queries on the ShopEasy e-\rcommerce database, to build Single-Column, Composite, and Unique Indexes on frequently queried\rcolumns, and to analyze and compare query execution performance before and after indexing using\rthe EXPLAIN plan.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/HXV3zeRR3nw",
      "videoTitle": "DBMS Practical: ShopEasy E-Commerce Database — SQL Views, Indexing, and Query Performance",
      "videoChannel": "Database Systems & SQL Lab",
      "prerequisites": [
        "Relational Model Basics",
        "SQL Fundamentals"
      ],
      "theory": {
        "overview": "This experiment implements ShopEasy E-Commerce Database — SQL Views, Indexing, and Query Performance adhering to the V.S.B. Engineering College AI&DS Department curriculum. It covers relational integrity constraints, normalization, transaction ACID guarantees, indexing performance, and SQL procedural triggers.",
        "keyConcepts": [
          {
            "title": "Relational Integrity",
            "desc": "Primary key, foreign key, check, and default constraints enforcing data consistency."
          },
          {
            "title": "Query Execution & Optimization",
            "desc": "Execution plans, indexing, join mechanics, and aggregation pipelines."
          },
          {
            "title": "ACID Guarantees",
            "desc": "Atomic state transitions, consistency preservation, and isolation levels."
          }
        ],
        "complexities": [
          {
            "operation": "Indexed Lookup",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(log n)",
            "space": "O(n)"
          },
          {
            "operation": "Full Table Scan",
            "best": "O(n)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise resource planning (ERP) and e-commerce transactional engines",
          "Core banking and financial ledger processing systems",
          "Automated academic evaluation and examination management platforms"
        ]
      },
      "procedure": [
        "1. Connect to MySQL server and create the required database.",
        "2. Define relational tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "3. Insert representative transactional and master records.",
        "4. Execute analytical SQL queries with required clauses.",
        "5. Verify integrity constraints and transaction state consistency."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Exp 12: SQL Views, Indexing, and EXPLAIN Query Performance\nUSE ShopEasyDB;\n\n-- 1. Create View for secure non-confidential customer orders\nCREATE OR REPLACE VIEW V_CustomerOrderSummary AS\nSELECT c.customer_id, c.full_name, c.city, o.order_id, o.order_date, o.total_amount, o.order_status\nFROM Customer c\nJOIN Orders o ON c.customer_id = o.customer_id;\n\n-- 2. Create B-Tree Index on foreign key and search columns\nCREATE INDEX idx_product_category ON Product(category);\nCREATE INDEX idx_orders_customer ON Orders(customer_id);\n\n-- 3. Query the View\nSELECT * FROM V_CustomerOrderSummary;\n\n-- 4. Benchmark with EXPLAIN\nEXPLAIN SELECT * FROM Product WHERE category = 'Accessories';"
      },
      "expectedOutput": "Database changed\nQuery OK, 0 rows affected (View V_CustomerOrderSummary created)\nQuery OK, 0 rows affected (Indexes idx_product_category and idx_orders_customer created)\n\n+-------------+--------------+-------+----------+---------------------+--------------+--------------+\n| customer_id | full_name    | city  | order_id | order_date          | total_amount | order_status |\n+-------------+--------------+-------+----------+---------------------+--------------+--------------+\n|           1 | Arjun Sharma | Delhi |        1 | 2026-09-26 10:15:00 |      1300.00 | confirmed    |\n+-------------+--------------+-------+----------+---------------------+--------------+--------------+\n\nEXPLAIN Execution Plan:\n+----+-------------+---------+------+----------------------+----------------------+---------+-------+------+-------------+\n| id | select_type | table   | type | possible_keys        | key                  | key_len | ref   | rows | Extra       |\n+----+-------------+---------+------+----------------------+----------------------+---------+-------+------+-------------+\n|  1 | SIMPLE      | Product | ref  | idx_product_category | idx_product_category | 403     | const |    2 | Using index |\n+----+-------------+---------+------+----------------------+----------------------+---------+-------+------+-------------+\nIndex lookup used: Full Table Scan prevented.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd/3rd Year"
        ],
        "pg": [
          "M.E. Computer Science",
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "dbms-exp-13",
    "labId": "dbms-lab",
    "title": "Exp 13: Stored Procedures and Functions to Calculate Employee Salaries and Bonuses",
    "slug": "dbms-exp-13-stored-procedures-and-functions-to-calculate-employee-salaries-and-bonuses",
    "difficulty": "Advanced",
    "category": "Databases",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 232,
    "simulator": "sql",
    "quizId": "quiz-dbms-13",
    "sections": {
      "introduction": "To design and implement stored procedures and user-defined functions in MySQL that\rautomatically calculate an employee's House Rent Allowance (HRA), performance-based bonus,\rgross salary, and net salary for a Payroll Management System, and to generate monthly payroll\rrecords for a single employee as well as for all employees in one batch run using a cursor.",
      "objective": "To design and implement stored procedures and user-defined functions in MySQL that\rautomatically calculate an employee's House Rent Allowance (HRA), performance-based bonus,\rgross salary, and net salary for a Payroll Management System, and to generate monthly payroll\rrecords for a single employee as well as for all employees in one batch run using a cursor.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/HXV3zeRR3nw",
      "videoTitle": "DBMS Practical: Stored Procedures and Functions to Calculate Employee Salaries and Bonuses",
      "videoChannel": "Database Systems & SQL Lab",
      "prerequisites": [
        "Relational Model Basics",
        "SQL Fundamentals"
      ],
      "theory": {
        "overview": "This experiment implements Stored Procedures and Functions to Calculate Employee Salaries and Bonuses adhering to the V.S.B. Engineering College AI&DS Department curriculum. It covers relational integrity constraints, normalization, transaction ACID guarantees, indexing performance, and SQL procedural triggers.",
        "keyConcepts": [
          {
            "title": "Relational Integrity",
            "desc": "Primary key, foreign key, check, and default constraints enforcing data consistency."
          },
          {
            "title": "Query Execution & Optimization",
            "desc": "Execution plans, indexing, join mechanics, and aggregation pipelines."
          },
          {
            "title": "ACID Guarantees",
            "desc": "Atomic state transitions, consistency preservation, and isolation levels."
          }
        ],
        "complexities": [
          {
            "operation": "Indexed Lookup",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(log n)",
            "space": "O(n)"
          },
          {
            "operation": "Full Table Scan",
            "best": "O(n)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise resource planning (ERP) and e-commerce transactional engines",
          "Core banking and financial ledger processing systems",
          "Automated academic evaluation and examination management platforms"
        ]
      },
      "procedure": [
        "1. Connect to MySQL server and create the required database.",
        "2. Define relational tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "3. Insert representative transactional and master records.",
        "4. Execute analytical SQL queries with required clauses.",
        "5. Verify integrity constraints and transaction state consistency."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Exp 13: Stored Procedures & Functions for Salary and Bonus Calculation\nCREATE DATABASE IF NOT EXISTS PayrollProcedureDB;\nUSE PayrollProcedureDB;\n\nCREATE TABLE Employee (\n    emp_id INT PRIMARY KEY,\n    emp_name VARCHAR(100),\n    basic_salary DECIMAL(10,2),\n    performance_rating INT CHECK (performance_rating BETWEEN 1 AND 5)\n);\n\nINSERT INTO Employee VALUES (101, 'Naveen Kumar', 60000.00, 5), (102, 'Pooja R', 45000.00, 3);\n\nDELIMITER $$\n-- Stored Function to calculate Bonus percentage\nCREATE FUNCTION fn_CalculateBonus(salary DECIMAL(10,2), rating INT) \nRETURNS DECIMAL(10,2)\nDETERMINISTIC\nBEGIN\n    DECLARE bonus DECIMAL(10,2);\n    IF rating = 5 THEN SET bonus = salary * 0.25;\n    ELSEIF rating >= 4 THEN SET bonus = salary * 0.15;\n    ELSE SET bonus = salary * 0.05;\n    END IF;\n    RETURN bonus;\nEND $$\n\n-- Stored Procedure to generate employee salary statement\nCREATE PROCEDURE sp_GeneratePaySlip(IN p_emp_id INT)\nBEGIN\n    SELECT emp_id, emp_name, basic_salary, performance_rating,\n           fn_CalculateBonus(basic_salary, performance_rating) AS bonus_amount,\n           (basic_salary + fn_CalculateBonus(basic_salary, performance_rating)) AS total_payout\n    FROM Employee\n    WHERE emp_id = p_emp_id;\nEND $$\nDELIMITER ;\n\nCALL sp_GeneratePaySlip(101);"
      },
      "expectedOutput": "Database changed\nQuery OK, 2 rows inserted.\nQuery OK, 0 rows affected (Function fn_CalculateBonus created)\nQuery OK, 0 rows affected (Procedure sp_GeneratePaySlip created)\n\n+--------+--------------+--------------+--------------------+--------------+--------------+\n| emp_id | emp_name     | basic_salary | performance_rating | bonus_amount | total_payout |\n+--------+--------------+--------------+--------------------+--------------+--------------+\n|    101 | Naveen Kumar |     60000.00 |                  5 |     15000.00 |     75000.00 |\n+--------+--------------+--------------+--------------------+--------------+--------------+\n1 row in set (0.01 sec)",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd/3rd Year"
        ],
        "pg": [
          "M.E. Computer Science",
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "dbms-exp-14",
    "labId": "dbms-lab",
    "title": "Exp 14: Banking Transaction Processing using BEGIN, COMMIT, ROLLBACK and",
    "slug": "dbms-exp-14-banking-transaction-processing-using-begin-commit-rollback-and",
    "difficulty": "Advanced",
    "category": "Databases",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 236,
    "simulator": "sql",
    "quizId": "quiz-dbms-14",
    "sections": {
      "introduction": "To implement transaction control in MySQL using BEGIN/START TRANSACTION,\rCOMMIT, ROLLBACK, and SAVEPOINT, and to design a stored procedure that performs a secure\rbank fund transfer with structured exception handling, so that the database always remains in a\rconsistent state even if an error occurs midway through the transaction.",
      "objective": "To implement transaction control in MySQL using BEGIN/START TRANSACTION,\rCOMMIT, ROLLBACK, and SAVEPOINT, and to design a stored procedure that performs a secure\rbank fund transfer with structured exception handling, so that the database always remains in a\rconsistent state even if an error occurs midway through the transaction.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/HXV3zeRR3nw",
      "videoTitle": "DBMS Practical: Banking Transaction Processing using BEGIN, COMMIT, ROLLBACK and",
      "videoChannel": "Database Systems & SQL Lab",
      "prerequisites": [
        "Relational Model Basics",
        "SQL Fundamentals"
      ],
      "theory": {
        "overview": "This experiment implements Banking Transaction Processing using BEGIN, COMMIT, ROLLBACK and adhering to the V.S.B. Engineering College AI&DS Department curriculum. It covers relational integrity constraints, normalization, transaction ACID guarantees, indexing performance, and SQL procedural triggers.",
        "keyConcepts": [
          {
            "title": "Relational Integrity",
            "desc": "Primary key, foreign key, check, and default constraints enforcing data consistency."
          },
          {
            "title": "Query Execution & Optimization",
            "desc": "Execution plans, indexing, join mechanics, and aggregation pipelines."
          },
          {
            "title": "ACID Guarantees",
            "desc": "Atomic state transitions, consistency preservation, and isolation levels."
          }
        ],
        "complexities": [
          {
            "operation": "Indexed Lookup",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(log n)",
            "space": "O(n)"
          },
          {
            "operation": "Full Table Scan",
            "best": "O(n)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise resource planning (ERP) and e-commerce transactional engines",
          "Core banking and financial ledger processing systems",
          "Automated academic evaluation and examination management platforms"
        ]
      },
      "procedure": [
        "1. Connect to MySQL server and create the required database.",
        "2. Define relational tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "3. Insert representative transactional and master records.",
        "4. Execute analytical SQL queries with required clauses.",
        "5. Verify integrity constraints and transaction state consistency."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Exp 14: Transaction Processing with BEGIN, COMMIT, ROLLBACK and SAVEPOINT\nUSE BankACIDDB;\n\nSELECT * FROM Accounts;\n\nSTART TRANSACTION;\nUPDATE Accounts SET balance = balance - 500 WHERE acc_no = 101;\nSAVEPOINT sp_deduct;\n\nUPDATE Accounts SET balance = balance + 500 WHERE acc_no = 999; -- Non-existent account\n\n-- Rollback to safe point on detecting error\nROLLBACK TO sp_deduct;\nCOMMIT;\n\nSELECT * FROM Accounts;"
      },
      "expectedOutput": "Database changed\nInitial State: Acc 101 Balance = 3500.00\n\nSTART TRANSACTION;\nQuery OK, 1 row affected (Deducted 500 from 101)\nSavepoint 'sp_deduct' created.\nERROR 1644: Target account 999 not found!\nROLLBACK TO sp_deduct; (Acc 999 operation aborted, maintaining consistency)\nCOMMIT;\n\n+--------+------------------+---------+\n| acc_no | holder_name      | balance |\n+--------+------------------+---------+\n|    101 | Arjun (Sender)   | 3000.00 |\n|    102 | Priya (Receiver) | 3500.00 |\n+--------+------------------+---------+\nTransaction state successfully preserved with Savepoint.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd/3rd Year"
        ],
        "pg": [
          "M.E. Computer Science",
          "M.Tech Data Science"
        ]
      }
    }
  },
  {
    "id": "dbms-exp-15",
    "labId": "dbms-lab",
    "title": "Exp 15: Design and Implementation of a Complete Database Application – Online",
    "slug": "dbms-exp-15-design-and-implementation-of-a-complete-database-application-online",
    "difficulty": "Advanced",
    "category": "Databases",
    "estimatedMinutes": 35,
    "rating": 4.95,
    "ratingsCount": 240,
    "simulator": "sql",
    "quizId": "quiz-dbms-15",
    "sections": {
      "introduction": "To design and implement a complete database application for an Online Examination System\rby performing ER modelling and normalization, and by creating tables with integrity constraints,\rviews, indexes, stored procedures, triggers, and transactions in MySQL, so that students can be\rregistered for an exam, their answers evaluated automatically, and results generated and reported\raccurately and consistently.",
      "objective": "To design and implement a complete database application for an Online Examination System\rby performing ER modelling and normalization, and by creating tables with integrity constraints,\rviews, indexes, stored procedures, triggers, and transactions in MySQL, so that students can be\rregistered for an exam, their answers evaluated automatically, and results generated and reported\raccurately and consistently.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/HXV3zeRR3nw",
      "videoTitle": "DBMS Practical: Design and Implementation of a Complete Database Application – Online",
      "videoChannel": "Database Systems & SQL Lab",
      "prerequisites": [
        "Relational Model Basics",
        "SQL Fundamentals"
      ],
      "theory": {
        "overview": "This experiment implements Design and Implementation of a Complete Database Application – Online adhering to the V.S.B. Engineering College AI&DS Department curriculum. It covers relational integrity constraints, normalization, transaction ACID guarantees, indexing performance, and SQL procedural triggers.",
        "keyConcepts": [
          {
            "title": "Relational Integrity",
            "desc": "Primary key, foreign key, check, and default constraints enforcing data consistency."
          },
          {
            "title": "Query Execution & Optimization",
            "desc": "Execution plans, indexing, join mechanics, and aggregation pipelines."
          },
          {
            "title": "ACID Guarantees",
            "desc": "Atomic state transitions, consistency preservation, and isolation levels."
          }
        ],
        "complexities": [
          {
            "operation": "Indexed Lookup",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(log n)",
            "space": "O(n)"
          },
          {
            "operation": "Full Table Scan",
            "best": "O(n)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise resource planning (ERP) and e-commerce transactional engines",
          "Core banking and financial ledger processing systems",
          "Automated academic evaluation and examination management platforms"
        ]
      },
      "procedure": [
        "1. Connect to MySQL server and create the required database.",
        "2. Define relational tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "3. Insert representative transactional and master records.",
        "4. Execute analytical SQL queries with required clauses.",
        "5. Verify integrity constraints and transaction state consistency."
      ],
      "sampleCode": {
        "language": "sql",
        "code": "-- Exp 15: Complete Database Application (Online Examination System)\nCREATE DATABASE IF NOT EXISTS OnlineExamDB;\nUSE OnlineExamDB;\n\nCREATE TABLE Exam (\n    exam_id INT AUTO_INCREMENT PRIMARY KEY,\n    subject VARCHAR(100) NOT NULL,\n    max_marks INT DEFAULT 100\n);\n\nCREATE TABLE Candidate (\n    cand_id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(100) UNIQUE NOT NULL\n);\n\nCREATE TABLE Result (\n    result_id INT AUTO_INCREMENT PRIMARY KEY,\n    exam_id INT,\n    cand_id INT,\n    score INT CHECK (score BETWEEN 0 AND 100),\n    status VARCHAR(10),\n    FOREIGN KEY (exam_id) REFERENCES Exam(exam_id),\n    FOREIGN KEY (cand_id) REFERENCES Candidate(cand_id)\n);\n\nINSERT INTO Exam (subject, max_marks) VALUES ('DBMS Practical', 100);\nINSERT INTO Candidate (name, email) VALUES ('Dhanush K', 'dhanush@vsb.ac.in');\nINSERT INTO Result (exam_id, cand_id, score, status) VALUES (1, 1, 94, 'PASS');\n\nSELECT c.name AS candidate_name, e.subject, r.score, r.status\nFROM Result r\nJOIN Candidate c ON r.cand_id = c.cand_id\nJOIN Exam e ON r.exam_id = e.exam_id;"
      },
      "expectedOutput": "Database changed\nQuery OK, 0 rows affected (Exam, Candidate, Result tables created)\nRecords initialized.\n\n+----------------+----------------+-------+--------+\n| candidate_name | subject        | score | status |\n+----------------+----------------+-------+--------+\n| Dhanush K      | DBMS Practical |    94 | PASS   |\n+----------------+----------------+-------+--------+\n1 row in set (0.01 sec)\nOnline Examination Database Application fully operational.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd/3rd Year"
        ],
        "pg": [
          "M.E. Computer Science",
          "M.Tech Data Science"
        ]
      }
    }
  }
];
