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
        "code": "CREATE TABLE statements.\r\n9. Insert sample data (seed data) using INSERT INTO statements.\r\n10. Execute SELECT queries to verify the structure and data.\r\n11. Execute JOIN queries to demonstrate inter-table relationships.\r\nEntities, Attributes, and Keys:\r\nEach entity, its attributes, and its primary key are listed below:\r\nEntity 1 — CUSTOMER\r\n• Primary Key: customer_id (INT, AUTO_INCREMENT)\r\n• Attributes: full_name (VARCHAR), email (VARCHAR, UNIQUE), phone (VARCHAR),\r\ncity (VARCHAR), wallet_balance (DECIMAL)\r\nEntity 2 — SUPPLIER\r\n• Primary Key: supplier_id (INT, AUTO_INCREMENT)\r\n• Attributes: supplier_name (VARCHAR), contact_email (VARCHAR), city (VARCHAR),\r\nrating (DECIMAL)\r\nEntity 3 — PRODUCT\r\n• Primary Key: product_id (INT, AUTO_INCREMENT)\r\n• Foreign Key: supplier_id → SUPPLIER(supplier_id)\r\n• Attributes: product_name (VARCHAR), category (VARCHAR), price (DECIMAL),\r\nstock_qty (INT)\r\nEntity 4 — ORDER\r\n• Primary Key: order_id (INT, AUTO_INCREMENT)\r\n• Foreign Key: customer_id → CUSTOMER(customer_id)\r\n• Attributes: order_date (DATETIME), total_amount (DECIMAL), order_status (ENUM)\r\n\r\nEntity 5 — ORDER_ITEM (Bridge: ORDER ↔ PRODUCT)\r\n•  Primary Key: item_id (INT, AUTO_INCREMENT)\r\n•  Foreign Keys: order_id → ORDER, product_id → PRODUCT\r\n•  Attributes: quantity (INT), unit_price (DECIMAL)\r\n\r\nEntity 6 — PAYMENT\r\n•  Primary Key: payment_id (INT, AUTO_INCREMENT)\r\n•  Foreign Key: order_id → ORDER(order_id)\r\n•  Attributes:  payment_mode  (VARCHAR),  payment_status  (ENUM),  paid_amount\r\n(DECIMAL), paid_at (DATETIME)\r\n\r\nRelationships and Cardinalities:\r\n| Relationship  | Entities Involved  | Cardinality            | Resolution   |         |\r\n| ------------- | ------------------ | ---------------------- | ------------ | ------- |\r\n| PLACES        | CUSTOMER           | →  One-to-Many (1:N)   | customer_id  | FK  in  |\r\n|               | ORDER              |                        | ORDER        |         |\r\n| CONTAINS      | ORDER              | ↔  Many-to-Many (M:N)  | Bridge       | table   |\r\n|               | PRODUCT            |                        | ORDER_ITEM   |         |\r\nSUPPLIES  SUPPLIER  →  One-to-Many (1:N)  supplier_id  FK  in\r\n|          | PRODUCT  |                      | PRODUCT   |         |\r\n| -------- | -------- | -------------------- | --------- | ------- |\r\n| PAID BY  | ORDER    | →  One-to-One (1:1)  | order_id  | FK  in  |\r\n|          | PAYMENT  |                      | PAYMENT   |         |\r\n\r\nER Diagram:\r\nThe diagram below shows the entities (rectangles), relationships (diamonds), and cardinalities:\r\n\r\nSQL Syntax Reference:\r\nThe following SQL commands are used in this experiment:\r\n1. CREATE DATABASE\r\nCreates a new database (schema). Must be executed before creating any tables.\r\nCREATE DATABASE database_name;\r\nUSE database_name;\r\n2. CREATE TABLE\r\nCreates a table with column definitions, data types, and constraints.\r\nCREATE TABLE table_name (\r\ncolumn_name DATA_TYPE [constraints],\r\n...\r\nCONSTRAINT pk_name PRIMARY KEY (col),\r\nCONSTRAI"
      },
      "expectedOutput": "---------------  --------------- \r\n Performance   50                               \r\n Viva-voce     10                               \r\n Record        15                               \r\n Total         75                               \r\n\r\nResult:",
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
        "code": "ALTER TABLE (add constraints after table creation)\r\nALTER TABLE Course\r\nADD CONSTRAINT fk_course_dept\r\nFOREIGN KEY (dept_id) REFERENCES Department(dept_id);\r\n3. SHOW TABLES / DESCRIBE\r\nSHOW TABLES; -- list all tables in current database\r\nDESCRIBE Student; -- show column structure of a table\r\nSHOW CREATE TABLE Enrollment; -- show full DDL including constraints\r\n4. UPDATE\r\nUPDATE Student\r\n\r\nSET dept_id = 2\r\nWHERE student_id = 3;\r\n5. GROUP BY with HAVING\r\nSELECT dept_id, COUNT(*) AS student_count\r\nFROM Student\r\nGROUP BY dept_id\r\nHAVING COUNT(*) > 2;\r\nREAL-TIME SCENARIO — UNIVERSITY MANAGEMENT SYSTEM (UNIMANAGE DB)\r\nUniManage is a digital platform for a technical university. It tracks departments, instructors, students,\r\ncourses offered each semester, and student enrollments with grades and attendance. All data must be\r\nstored without redundancy and with full referential integrity.\r\nStep 1 — Create the Database\r\nCREATE DATABASE UniManageDB;\r\nUSE UniManageDB;\r\nStep 2 — Create Table: DEPARTMENT (BCNF Table 1)\r\nCREATE TABLE Department (\r\ndept_id INT NOT NULL AUTO_INCREMENT,\r\ndept_name VARCHAR(100) NOT NULL,\r\nhod_name VARCHAR(100),\r\nestablished_year YEAR,\r\nCONSTRAINT pk_dept PRIMARY KEY (dept_id),\r\nCONSTRAINT uq_deptname UNIQUE (dept_name)\r\n);\r\nStep 3 — Create Table: INSTRUCTOR (BCNF Table 2)\r\nCREATE TABLE Instructor (\r\ninstructor_id INT NOT NULL AUTO_INCREMENT,\r\ndept_id INT NOT NULL,\r\ninstructor_name VARCHAR(100) NOT NULL,\r\nemail VARCHAR(100) NOT NULL,\r\nspecialization VARCHAR(100),\r\nCONSTRAINT pk_instr PRIMARY KEY (instructor_id),\r\nCONSTRAINT uq_instr_email UNIQUE (email),\r\nCONSTRAINT fk_instr_dept FOREIGN KEY (dept_id) REFERENCES\r\nDepartment(dept_id)\r\n);\r\nStep 4 — Create Table: STUDENT (BCNF Table 3)\r\nCREATE TABLE Student (\r\nstudent_id INT NOT NULL AUTO_INCREMENT,\r\ndept_id INT NOT NULL,\r\nstudent_name VARCHAR(100) NOT NULL,\r\nemail VARCHAR(100) NOT NULL,\r\ndob DATE,\r\n\r\nadmission_year YEAR,\r\nCONSTRAINT pk_stu PRIMARY KEY (student_id),\r\nCONSTRAINT uq_stu_email UNIQUE (email),\r\nCONSTRAINT fk_stu_dept FOREIGN KEY (dept_id) REFERENCES\r\nDepartment(dept_id)\r\n);\r\nStep 5 — Create Table: COURSE (BCNF Table 4)\r\nCREATE TABLE Course (\r\ncourse_id INT NOT NULL AUTO_INCREMENT,\r\ndept_id INT NOT NULL,\r\ninstructor_id INT NOT NULL,\r\ncourse_name VARCHAR(150) NOT NULL,\r\ncredits INT NOT NULL,\r\nsemester INT NOT NULL,\r\nCONSTRAINT pk_course PRIMARY KEY (course_id),\r\nCONSTRAINT fk_course_dept FOREIGN KEY (dept_id) REFERENCES\r\nDepartment(dept_id),\r\nCONSTRAINT fk_course_instr FOREIGN KEY (instructor_id) REFERENCES\r\nInstructor(instructor_id),\r\nCONSTRAINT chk_credits CHECK (credits BETWEEN 1 AND 6),\r\nCONSTRAINT chk_semester CHECK (semester BETWEEN 1 AND 8)\r\n);\r\nStep 6 — Create Table: ENROLLMENT (BCNF Table 5 — Bridge M:N)\r\nCREATE TABLE Enrollment (\r\nenrollment_id INT NOT NULL AUTO_INCREMENT,\r\nstudent_id INT NOT NULL,\r\ncourse_id INT NOT NULL,\r\nenrollment_date DATE NOT NULL,\r\ngrade VARCHAR(2) DEFAULT NULL,\r\nattendance_pct DECIMAL(5,2) DEFAULT 0.00,\r\nCONSTRAINT pk_enroll PRIMARY KEY (enro"
      },
      "expectedOutput": "---------------  --------------- \r\n Performance   50                               \r\n Viva-voce     10                               \r\n Record        15                               \r\n Total         75                               \r\n\r\nResult:",
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
        "code": "SELECT that data\r\nsurvives.\r\n7. Discuss CAP Theorem scenarios: Consistency vs Availability trade-off during a node failure.\r\nDatabase Schema Diagram:\r\nThe Online Shopping System uses four tables: Customers (wallet balance), Products (stock),\r\nOrders (status tracking), and Payments (payment status). Transactions span multiple tables, making it\r\nideal for demonstrating ACID properties.\r\n\r\nSQL Syntax Reference:\r\n1. START TRANSACTION / COMMIT / ROLLBACK\r\nA transaction is a logical unit of work that groups one or more SQL statements. START\r\nTRANSACTION begins the transaction. COMMIT makes all changes permanent. ROLLBACK\r\nundoes all changes since the last START TRANSACTION. Together they enforce Atomicity and\r\nDurability.\r\nSTART TRANSACTION;\r\n-- one or more SQL statements\r\nCOMMIT; -- make permanent\r\nROLLBACK; -- undo all changes\r\n2. SAVEPOINT / ROLLBACK TO SAVEPOINT\r\nA SAVEPOINT creates a named checkpoint inside a transaction. You can roll back to a\r\nspecific savepoint without undoing the entire transaction. This provides partial rollback capability and\r\nis useful for complex multi-step operations.\r\nSAVEPOINT savepoint_name;\r\nROLLBACK TO SAVEPOINT savepoint_name;\r\nRELEASE SAVEPOINT savepoint_name;\r\n3. SET autocommit\r\nBy default MySQL auto-commits each statement. Setting autocommit = 0 forces explicit\r\nCOMMIT or ROLLBACK for every transaction, giving you full control over when changes become\r\npermanent.\r\nSET autocommit = 0; -- disable auto-commit\r\nSET autocommit = 1; -- restore auto-commit (default)\r\n4. SELECT ... FOR UPDATE\r\nLocks the selected rows for the duration of the current transaction. Other transactions trying\r\nto read or modify those rows must wait. This enforces Isolation by preventing dirty reads and lost\r\nupdates in concurrent environments.\r\nSELECT column_list\r\nFROM table_name\r\nWHERE condition\r\nFOR UPDATE;\r\n5. CONSTRAINT CHECK (on table creation)\r\nCHECK constraints validate that column values satisfy a given condition before insertion or\r\nupdate. They enforce Consistency by rejecting any data that would leave the database in an invalid\r\nstate (e.g., stock quantity cannot go below zero).\r\nCONSTRAINT constraint_name CHECK (condition)\r\nReal-Time Practical Scenario — Online Shopping System\r\n\r\nREAL-TIME PRACTICAL SCENARIO (ONLINE SHOPPING SYSTEM)\r\nScenario\r\nShopEasy is an e-commerce platform. Customers have a wallet balance. When a customer\r\nplaces an order, the system must simultaneously deduct the wallet balance AND reduce product stock\r\nAND record payment — all as one atomic unit. If any step fails, every prior step must be rolled back\r\nautomatically.\r\nStep 1 — Create the Database\r\nCREATE DATABASE ShoppingDB;\r\nUSE ShoppingDB;\r\nStep 2 — Create the Tables\r\n-- Customers table\r\nCREATE TABLE Customers (\r\ncustomer_id INT NOT NULL AUTO_INCREMENT,\r\nfull_name VARCHAR(100) NOT NULL,\r\nemail VARCHAR(100) NOT NULL,\r\nwallet_balance DECIMAL(10,2) NOT NULL DEFAULT 0.00,\r\nCONSTRAINT pk_cust PRIMARY KEY (customer_id),\r\nCONSTRAINT uq_email UNIQUE (email),\r\nCONS"
      },
      "expectedOutput": "---------------  --------------- \r\n Performance   50                               \r\n Viva-voce     10                               \r\n Record        15                               \r\n Total         75                               \r\n\r\nResult:",
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
        "code": "ALTER TABLE Operations in MySQL\r\nDate:\r\nAim:\r\nTo create the Student, Department, and Course tables in a relational database using DDL\r\ncommands such as CREATE TABLE, and to modify the schema structure using ALTER TABLE\r\nstatements by adding new columns, modifying column data types, renaming columns, and dropping\r\ncolumns — demonstrating complete lifecycle management of a database schema in MySQL.\r\nProcedure:\r\nThe following steps are performed in sequence to complete this experiment:\r\nStep 1 : Launch MySQL and create a new database named CollegeDB using the CREATE\r\nDATABASE command.\r\nStep 2 : Switch to the database using the USE statement so all subsequent commands apply to it.\r\nStep 3 : Create the Department table first since Student and Course tables will reference it via\r\nforeign keys.\r\nStep 4 : Create the Student table with columns for student details, referencing dept_id from\r\nDepartment.\r\nStep 5 : Create the Course table with columns for course details, also referencing dept_id from\r\nDepartment.\r\nStep 6 : Verify all tables created successfully using SHOW TABLES and DESC commands.\r\nStep 7 : Perform ALTER TABLE operations: ADD a new column, MODIFY an existing column\r\ndata type, RENAME a column, DROP a column — on each table to demonstrate schema\r\nmodification.\r\nStep 8 : Re-verify the schema using DESC after every ALTER to confirm changes.\r\nStep 9 : Analyse the effect of each DDL and ALTER statement and record results.\r\nAlgorithm:\r\n1. START\r\n2. CREATE DATABASE CollegeDB;\r\n3. USE CollegeDB;\r\n4. CREATE TABLE Department with primary key dept_id.\r\n5. CREATE TABLE Student with primary key student_id and foreign key dept_id referencing\r\nDepartment.\r\n6. CREATE TABLE Course with primary key course_id and foreign key dept_id referencing\r\nDepartment.\r\n7. Verify schema using SHOW TABLES and DESC tablename.\r\n8. ALTER TABLE Student — ADD column, MODIFY column, RENAME column, DROP\r\ncolumn.\r\n9. ALTER TABLE Department — ADD column.\r\n10. ALTER TABLE Course — MODIFY column.\r\n11. Re-verify schema after each ALTER using DESC.\r\n12. STOP\r\n\r\nSchema Relationship Diagram:\r\n\r\nSQL Syntax Reference:\r\n| Command  |     | Syntax  |     | Description  |     |\r\n| -------- | --- | ------- | --- | ------------ | --- |\r\nCREATE  CREATE  DATABASE  Creates  a  new  database/schema  on  the\r\n| DATABASE  | db_name;      |     | server.   |              |                 |\r\n| --------- | ------------- | --- | --------- | ------------ | --------------- |\r\n| USE       | USE db_name;  |     | Switches  | context  to  | the  specified  |\r\ndatabase.\r\nCREATE  CREATE TABLE t (col TYPE  Defines a new table with columns, types,\r\n| TABLE  | [constraints]);  |     | and constraints.  |     |     |\r\n| ------ | ---------------- | --- | ----------------- | --- | --- |\r\nPRIMARY KEY  CONSTRAINT pk PRIMARY  Uniquely identifies each row; enforced at\r\n|     | KEY (col)  |     | table level.  |     |     |\r\n| --- | ---------- | --- | ------------- | --- | --- |\r\nFOREIGN KEY  FOREIGN  KEY  (col)  Links  a "
      },
      "expectedOutput": "---------------  --------------- \r\n Performance   50                               \r\n Viva-voce     10                               \r\n Record        15                               \r\n Total         75                               \r\n\r\nResult:",
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
        "code": "SELECT queries, demonstrating the complete impact of each\r\nDML command in a real-world HR scenario.\r\nProcedure:\r\nStep 1: Create the EmployeeDB database and switch to it using CREATE DATABASE and\r\nUSE.\r\nStep 2: Create the Dept table (master table for departments) with dept_id as primary key.\r\nStep 3: Create the Employee table with emp_id as primary key and dept_id as foreign key\r\nreferencing Dept.\r\nStep 4: Create the Salary table with sal_id as primary key and emp_id as foreign key\r\nreferencing Employee.\r\nStep 5: INSERT rows into Dept, Employee, and Salary tables and verify with SELECT.\r\nStep 6: Perform targeted UPDATE operations — raise salary, change department, correct\r\ndesignation — and verify.\r\nStep 7: Perform DELETE operations — remove a single record, conditional delete — and\r\nanalyse referential integrity.\r\nStep 8: Verify data integrity after every DML operation using SELECT queries.\r\nStep 9: Summarise the impact of each INSERT, UPDATE, and DELETE operation.\r\nAlgorithm:\r\n1. START\r\n2. CREATE DATABASE EmployeeDB; USE EmployeeDB;\r\n3. CREATE TABLE Dept — dept_id PK, dept_name, location.\r\n4. CREATE TABLE Employee — emp_id PK, emp_name, email, hire_date, designation, dept_id\r\nFK.\r\n5. CREATE TABLE Salary — sal_id PK, emp_id FK, basic, allowance, deduction,\r\neffective_date.\r\n6. INSERT 4 rows into Dept; SELECT * FROM Dept to verify.\r\n7. INSERT 6 rows into Employee; SELECT * FROM Employee to verify.\r\n8. INSERT 6 rows into Salary; SELECT * FROM Salary to verify.\r\n9. UPDATE Employee — change designation; SELECT to verify.\r\n10. UPDATE Salary — raise basic pay for a department; SELECT to verify.\r\n11. UPDATE Employee — transfer employee to another department; SELECT to verify.\r\n12. DELETE FROM Salary — remove salary record of resigned employee; SELECT to verify.\r\n13. DELETE FROM Employee — remove resigned employee; SELECT to verify.\r\n14. Attempt DELETE violating FK constraint; observe error.\r\n15. STOP\r\n\r\nEntity-Relationship Diagram — EmployeeDB\r\nSQL Syntax Reference:\r\nCommand Syntax Description\r\nINSERT (single) INSERT INTO t (c1,c2) Inserts one row into the table.\r\nVALUES (v1,v2);\r\nINSERT (multi) INSERT INTO t (c1,c2) Inserts multiple rows in one statement.\r\nVALUES (v1,v2),(v3,v4);\r\nSELECT * SELECT * FROM table; Retrieves all columns and rows from a\r\ntable.\r\nSELECT WHERE SELECT cols FROM t Retrieves rows matching the condition.\r\nWHERE condition;\r\nUPDATE UPDATE t SET col=val Modifies column values in matching\r\nWHERE condition; rows.\r\nUPDATE multi-col UPDATE t SET c1=v1, c2=v2 Updates multiple columns\r\nWHERE cond; simultaneously.\r\nDELETE DELETE FROM t WHERE Removes rows matching the condition.\r\ncondition;\r\nDELETE all rows DELETE FROM t; Removes every row (table structure\r\nremains).\r\nTRUNCATE TRUNCATE TABLE t; Faster delete-all; resets\r\nAUTO_INCREMENT.\r\nSELECT COUNT SELECT COUNT(*) FROM t Counts matching rows.\r\nWHERE cond;\r\n\r\nCommand Syntax Description\r\nINNER JOIN SELECT ... FROM t1 JOIN t2 Returns rows with match in both tables.\r\nON t1.id=t2.id;\r\nROLLBACK "
      },
      "expectedOutput": "---------------  --------------- \r\n Performance   50                               \r\n Viva-voce     10                               \r\n Record        15                               \r\n Total         75                               \r\n\r\nResult:",
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
        "code": "SELECT queries to view the current state of the data before performing any\r\ndestructive operation.\r\n Demonstrate the DELETE command with a WHERE clause to remove specific unwanted\r\nrows, first from the child table (Stock_Log) and then from the parent table (Product),\r\nrespecting foreign key constraints.\r\n Demonstrate the TRUNCATE command on the Stock_Log table to remove all rows instantly\r\nand reset its AUTO_INCREMENT counter, and verify the reset by inserting a fresh row.\r\n Demonstrate the DROP command by creating a temporary backup table, dropping it, and\r\nconfirming its removal using SHOW TABLES.\r\n Execute final SELECT queries to verify the resulting state of the database against the aim of\r\nthe experiment.\r\nEntities, Attributes and Keys:\r\nEntity 1 — CATEGORY\r\nPrimary Key: category_id (INT, AUTO_INCREMENT)\r\nAttributes: category_name (VARCHAR, UNIQUE)\r\nEntity 2 — PRODUCT\r\nPrimary Key: product_id (INT, AUTO_INCREMENT)\r\nForeign Key: category_id → CATEGORY(category_id)\r\nAttributes: product_name (VARCHAR), price (DECIMAL), stock_qty (INT), reorder_level (INT)\r\nEntity 3 — STOCK_LOG\r\nPrimary Key: log_id (INT, AUTO_INCREMENT)\r\nForeign Key: product_id → PRODUCT(product_id)\r\nAttributes: change_qty (INT), log_type (ENUM: IN/OUT), log_date (DATETIME)\r\n\r\nRelationships and Cardinalities:\r\nRelationship Entities Involved Cardinality Resolution\r\nHAS CATEGORY → One-to-Many category_id FK in\r\nPRODUCT (1:N) PRODUCT\r\nGENERATES PRODUCT → One-to-Many product_id FK in\r\nSTOCK_LOG (1:N) STOCK_LOG\r\nER Diagram:\r\nThe diagram below shows the three entities, their key attributes, and the one-to-many\r\ncardinalities between them:\r\nSQL Syntax Reference:\r\nThe following three commands are the focus of this experiment. All three remove data or objects, but\r\ndiffer sharply in scope, speed, and recoverability:\r\n1. DELETE\r\nRemoves one or more rows that satisfy a WHERE condition. It is a DML statement, is logged\r\nrow-by-row, can be rolled back inside a transaction, fires triggers, and does NOT reset the\r\nAUTO_INCREMENT counter. Omitting WHERE deletes every row, one at a time.\r\nDELETE FORM table_name\r\nWHERE condition;\r\n2. TRUNCATE\r\nRemoves ALL rows from a table instantly. It is a DDL statement (internally drops and re-\r\ncreates the table), cannot use a WHERE clause, resets the AUTO_INCREMENT counter back to 1,\r\nand is not rolled back on InnoDB in the normal sense. It fails if another table has a foreign key\r\npointing into it.\r\nTRUNCATE TABLE table_name;\r\n3. DROP\r\nPermanently removes the entire table (structure + data + indexes + constraints) or the entire\r\ndatabase from the schema. It is the most destructive of the three DDL statements and cannot be\r\nundone unless a backup exists.\r\nDROP TABLE table_name;\r\n\r\nComparison\r\nAspect DELETE TRUNCATE DROP\r\nType DML DDL DDL\r\nWHERE clause Allowed Not allowed Not applicable\r\nRows affected Selected rows All rows All rows\r\nTable structure Retained Retained Removed\r\nAUTO_INCREMENT Unaffected Reset to 1 Removed with table\r\nSlower (row-by-\r\nSpeed "
      },
      "expectedOutput": "---------------  --------------- \r\n Performance   50                               \r\n\r\n Viva-voce   10       \r\n ----------  ---  --- \r\n Record      15       \r\n Total       75       \r\n\r\nResult:",
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
        "code": "CREATE TABLE statements in MySQL, embedding all the above constraints using the\r\nCONSTRAINT keyword for clarity.\r\n8. Create the database and execute the CREATE TABLE statements in the given order (parent\r\ntables before child tables) so that foreign-key references succeed.\r\n9. Insert sample (seed) data using INSERT INTO statements, deliberately omitting a few\r\nDEFAULT-backed columns to demonstrate that MySQL fills them automatically.\r\n10. Execute SELECT and JOIN queries to verify that the data and the constraints behave as\r\nexpected.\r\nEntities, Attributes and Keys:\r\nEach entity, its attributes, and the constraints applied to it are listed below:\r\nEntity 1 – DEPARTMENT\r\nPrimary Key: department_id (INT, AUTO_INCREMENT)\r\nConstraints: department_name is UNIQUE; location has a DEFAULT value\r\nAttributes: department_name (VARCHAR), location (VARCHAR)\r\nEntity 2 – DOCTOR\r\nPrimary Key: doctor_id (INT, AUTO_INCREMENT)\r\nForeign Key: department_id → DEPARTMENT(department_id)\r\nConstraints: phone is UNIQUE; consultation_fee has a DEFAULT and a CHECK (fee > 0)\r\nAttributes: full_name (VARCHAR), specialization (VARCHAR), phone (VARCHAR),\r\nconsultation_fee (DECIMAL)\r\n\r\nEntity 3 – PATIENT\r\nPrimary Key: patient_id (INT, AUTO_INCREMENT)\r\nConstraints: phone and email are UNIQUE; gender has a CHECK (M/F/O); blood_group has a\r\nDEFAULT\r\nAttributes: full_name (VARCHAR), gender (ENUM), dob (DATE), phone (VARCHAR), email\r\n(VARCHAR), blood_group (VARCHAR)\r\nEntity 4 – APPOINTMENT\r\nPrimary Key: appointment_id (INT, AUTO_INCREMENT)\r\nForeign Keys: patient_id → PATIENT(patient_id), doctor_id → DOCTOR(doctor_id)\r\nConstraints: appointment_date DEFAULTs to CURRENT_TIMESTAMP; status DEFAULTs to\r\n'scheduled'\r\nAttributes: appointment_date (DATETIME), status (ENUM), reason (VARCHAR)\r\nEntity 5 – PRESCRIPTION\r\nPrimary Key: prescription_id (INT, AUTO_INCREMENT)\r\nForeign Key: appointment_id → APPOINTMENT(appointment_id)\r\nConstraints: appointment_id is UNIQUE (one prescription per appointment); dosage has a DEFAULT\r\nAttributes: medicine_details (VARCHAR), dosage (VARCHAR), notes (VARCHAR)\r\nEntity 6 – BILLING\r\nPrimary Key: bill_id (INT, AUTO_INCREMENT)\r\nForeign Key: appointment_id → APPOINTMENT(appointment_id)\r\nConstraints: appointment_id is UNIQUE (one bill per appointment); other_charges and\r\npayment_status have DEFAULTs; total_amount has a CHECK (>= 0)\r\nAttributes: consultation_fee (DECIMAL), other_charges (DECIMAL), total_amount (DECIMAL),\r\npayment_status (ENUM), payment_date (DATETIME)\r\nRelationships and Cardinalities:\r\nRelationship Entities Involved Cardinality Resolution\r\nWORKS_IN DEPARTMENT → One-to-Many (1:N) department_id FK in DOCTOR\r\nDOCTOR\r\nBOOKS PATIENT → One-to-Many (1:N) patient_id FK in\r\nAPPOINTMENT APPOINTMENT\r\nATTENDS DOCTOR → One-to-Many (1:N) doctor_id FK in\r\nAPPOINTMENT APPOINTMENT\r\nGENERATES APPOINTMENT One-to-One (1:1) appointment_id FK + UNIQUE\r\n→ in PRESCRIPTION\r\nPRESCRIPTION\r\nGENERATES APPOINTMENT One-to-One (1:1) appointment_id FK + UNIQUE\r\n→ BILLING in BILLING\r\nER D"
      },
      "expectedOutput": "---------------  --------------- \r\n Performance   50                               \r\n\r\n Viva-voce   10       \r\n ----------  ---  --- \r\n Record      15       \r\n Total       75       \r\n\r\nResult:",
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
        "code": "CREATE TABLE\r\nstatement.\r\n5. Insert sample data (seed data) using INSERT INTO statements, covering multiple cities,\r\nmembership tiers, and statuses (Active / Inactive / Suspended).\r\n6. Apply the WHERE clause to filter rows where status = 'Active'.\r\n7. Apply the ORDER BY clause to sort the filtered active customers by total_purchases.\r\n8. Apply the LIKE clause with wildcard patterns (%) to match email domains and name\r\nprefixes.\r\n9. Apply the IN clause to filter customers belonging to a specific set of cities.\r\n10. Apply the BETWEEN clause to filter customers within a numeric range (total_purchases) and\r\na date range (signup_date).\r\n11. Apply the DISTINCT clause to list unique cities and membership types among active\r\ncustomers.\r\n12. Combine WHERE, IN, BETWEEN, LIKE, and ORDER BY in a single analytical query.\r\n13. Execute all queries and record the result sets to verify correctness against the Aim.\r\nEntities, Attributes and Keys:\r\nThe entity, its attributes, and its primary key are listed below:\r\nEntity — CUSTOMER\r\nPrimary Key: customer_id (INT, AUTO_INCREMENT)\r\nAttributes: full_name (VARCHAR), email (VARCHAR, UNIQUE), phone (VARCHAR), city\r\n(VARCHAR), state (VARCHAR), membership_type (VARCHAR), signup_date (DATE),\r\ntotal_purchases (DECIMAL), last_purchase_date (DATE), status (VARCHAR:\r\nActive/Inactive/Suspended)\r\nTable Structure Diagram:\r\nThe diagram below shows the CUSTOMER table with its columns, data types, and primary key:\r\n\r\nSQL Syntax Reference:\r\nThe following SQL clauses are used in this experiment:\r\n1. WHERE\r\nFilters rows that satisfy a specified condition.\r\nSELECT columns FROM table_name\r\nWHERE condition;\r\n2. ORDER BY\r\nSorts the result set by one or more columns, ascending (ASC, default) or descending (DESC).\r\nSELECT columns FROM table_name\r\nWHERE condition\r\nORDER BY column [ASC|DESC];\r\n3. LIKE\r\nFilters rows using pattern matching with wildcards: % (any sequence of characters) and _ (any single\r\ncharacter).\r\nSELECT columns FROM table_name\r\nWHERE column LIKE 'pattern%';\r\n4. IN\r\nFilters rows whose column value matches any value in a given list — shorthand for multiple OR\r\nconditions.\r\nSELECT columns FROM table_name\r\nWHERE column IN (value1, value2, ...);\r\n5. BETWEEN\r\nFilters rows whose column value lies within an inclusive range (numeric or date).\r\n\r\nSELECT columns FROM table_name\r\nWHERE column BETWEEN value1 AND value2;\r\n6. DISTINCT\r\nRemoves duplicate values from the result set, returning only unique rows/values.\r\nSELECT DISTINCT column FROM table_name\r\nWHERE condition;\r\nREAL-TIME SCENARIO — CAREWELL MULTI-SPECIALTY HOSPITAL\r\nRetailPlus runs a loyalty program for its retail customers across several Indian cities. Customers are\r\ntagged with a membership tier (Bronze, Silver, Gold, Platinum) and a status (Active, Inactive,\r\nSuspended). The marketing team needs to run analytics queries to identify active customers, rank\r\nthem by spend, find customers by email/name pattern, target specific cities, filter by purchase or\r\nsignup range, and list"
      },
      "expectedOutput": "---------------  --------------- \r\n Performance   50                               \r\n Viva-voce     10                               \r\n Record        15                               \r\n Total         75                               \r\n\r\nResult:",
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
        "code": "CREATE TABLE statements.\r\n4. Insert sample transactional data spanning multiple months using INSERT INTO statements.\r\n5. Apply aggregate functions — COUNT(), SUM(), AVG(), MAX(), MIN() — to summarize\r\ntransaction data.\r\n6. Use GROUP BY to bucket transactions by month (and by category / salesperson where\r\nrequired).\r\n7. Apply HAVING to filter grouped results based on aggregate conditions (e.g., months\r\nexceeding a revenue threshold).\r\n8. Use CASE WHEN to classify each month's performance into descriptive tiers (Excellent /\r\nGood / Average / Below Target).\r\n9. Use string functions — CONCAT(), UPPER(), LOWER(), SUBSTRING(), LPAD(),\r\nFORMAT(), DATE_FORMAT() — to build clean, formatted report labels.\r\n10. Execute all queries against the sample data and verify the output matches the expected\r\nmonthly sales report.\r\nSQL Syntax Reference:\r\nThe following SQL clauses and functions are used in this experiment:\r\n1. Aggregate Functions\r\nPerform a calculation across a group of rows and return a single summary value.\r\nSELECT COUNT(*), SUM(column), AVG(column), MAX(column), MIN(column)\r\nFROM table_name;\r\n2. GROUP BY\r\nGroups rows that share the same value in one or more columns so aggregate functions apply per group\r\ninstead of the whole table.\r\nSELECT grouping_column, AGG_FUNC(column)\r\nFROM table_name\r\nGROUP BY grouping_column;\r\n3. HAVING\r\nFilters groups after aggregation (unlike WHERE, which filters rows before grouping).\r\nSELECT grouping_column, SUM(column) AS total\r\nFROM table_name\r\nGROUP BY grouping_column\r\n\r\nHAVING SUM(column) > value;\r\n4. CASE WHEN\r\nEvaluates conditions in order and returns a label for the first condition that is true — used here to\r\nclassify sales performance.\r\nSELECT column,\r\nCASE\r\nWHEN condition1 THEN 'Label1'\r\nWHEN condition2 THEN 'Label2'\r\nELSE 'DefaultLabel'\r\nEND AS derived_column\r\nFROM table_name;\r\n5. String Functions\r\nUsed to format, combine, and present text and date values cleanly in the final report.\r\nCONCAT(str1, str2, ...) -- joins strings together\r\nUPPER(str) / LOWER(str) -- changes letter case\r\nSUBSTRING(str, start, length) -- extracts part of a string\r\nLPAD(str, length, pad_str) -- left-pads a string to fixed width\r\nFORMAT(number, decimals) -- formats a number with thousand separators\r\nDATE_FORMAT(date, format) -- formats a date value as text\r\nMONTHNAME(date) -- returns the full month name of a date\r\nREAL-TIME SCENARIO — RETAIL SALES SYSTEM (BRIGHTMART)\r\nBrightMart is a multi-region retail store. Salespersons across regions sell products from three\r\ncategories — Furniture, Electronics, and Stationery. Every sale is logged as a transaction with a date\r\nand amount. Management wants a monthly sales report that shows total revenue, category-wise\r\nperformance, top salespersons, and an automatic performance rating for each month.\r\nEntities, Attributes, and Keys:\r\n SALESPERSON — Primary Key: sales_id. Attributes: first_name, last_name, region.\r\n PRODUCT — Primary Key: product_id. Attributes: product_name, category, unit_price.\r\n"
      },
      "expectedOutput": "---------------  --------------- \r\n Performance   50                               \r\n Viva-voce     10                               \r\n Record        15                               \r\n Total         75                               \r\n\r\nResult:",
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
        "code": "CREATE TABLE with PRIMARY\r\nKEY and FOREIGN KEY constraints.\r\n5. Insert sample PRODUCT and SALES records, including at least one intentional tie in total\r\nrevenue between two products, to observe rank behaviour on ties.\r\n6. Write an aggregate query using SUM() and GROUP BY to compute total_units_sold and\r\ntotal_revenue for every product.\r\n7. Wrap the aggregate query as a derived table (sub-query) and apply ROW_NUMBER() OVER\r\n(ORDER BY total_revenue DESC) to assign a unique sequential number to every row.\r\n8. Apply RANK() OVER (ORDER BY total_revenue DESC) on the same derived table and\r\nobserve that tied rows receive an identical rank, and the next rank is skipped.\r\n9. Apply DENSE_RANK() OVER (ORDER BY total_revenue DESC) and observe that tied\r\nrows receive an identical rank, but the next rank is NOT skipped.\r\n10. Apply PERCENT_RANK() OVER (ORDER BY total_revenue DESC) to compute the\r\nrelative standing of each product as a percentile between 0 and 1.\r\n11. Combine all four ranking functions in a single SELECT statement to compare their outputs\r\nside by side.\r\n12. Apply PARTITION BY category along with RANK() to rank products within each category\r\nindependently.\r\n13. Execute all queries, verify the output against the expected ranking logic, and record the\r\nresults.\r\nRelational Schema Diagram:\r\nPRODUCT and SALES are related in a One-to-Many (1:N) relationship — one product can appear in\r\nmany sales transactions, connected through the product_id foreign key.\r\n\r\nSQL Syntax Reference:\r\nThe following window (analytic) functions are used in this experiment. All of them require an\r\nOVER() clause; PARTITION BY inside OVER() is optional and restarts the ranking for every group.\r\n1. ROW_NUMBER()\r\nAssigns a unique, strictly sequential integer to every row in the result set, in the given order. Even if\r\ntwo rows are tied on the ORDER BY expression, they still get different numbers.\r\nROW_NUMBER() OVER (\r\n[PARTITION BY partition_expression]\r\nORDER BY sort_expression [ASC|DESC]\r\n) AS row_num\r\n2. RANK()\r\nAssigns the same rank to tied rows, then skips the following rank(s) by the number of tied rows (gaps\r\nappear after ties).\r\nRANK() OVER (\r\n[PARTITION BY partition_expression]\r\nORDER BY sort_expression [ASC|DESC]\r\n) AS rank_value\r\n3. DENSE_RANK()\r\nAssigns the same rank to tied rows, but the next rank continues consecutively with no gaps.\r\nDENSE_RANK() OVER (\r\n[PARTITION BY partition_expression]\r\nORDER BY sort_expression [ASC|DESC]\r\n) AS dense_rank_value\r\n4. PERCENT_RANK()\r\nReturns the relative rank of each row as a value between 0 and 1, calculated as (rank − 1) / (total_rows\r\n− 1). The top row always returns 0, and the last row always returns 1.\r\nPERCENT_RANK() OVER (\r\n[PARTITION BY partition_expression]\r\nORDER BY sort_expression [ASC|DESC]\r\n) AS percent_rank_value\r\nREAL-TIME SCENARIO — TECHMART ELECTRONICS\r\nTechMart Electronics is an online store that sells electronic gadgets across three categories:\r\nElectronics, Wearables, and Accessories. The sales manager wants"
      },
      "expectedOutput": "---------------  --------------- \r\n Performance   50                               \r\n\r\n Viva-voce   10       \r\n ----------  ---  --- \r\n Record      15       \r\n Total       75       \r\n\r\nResult:",
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
        "code": "CREATE TABLE with appropriate data types\r\nand constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK).\r\n4. Insert sample (seed) records into every table using INSERT INTO statements.\r\n5. Study the syntax of INNER JOIN, subqueries, and SELF JOIN before framing the required\r\nqueries.\r\n6. Frame Query 1 to retrieve complete customer transaction details by joining Customer,\r\nAccount, Branch, and Transactions.\r\n7. Frame Query 2 to compute the average account balance using a subquery, and select only\r\ncustomers whose balance exceeds it.\r\n8. Frame Query 3 as a SELF JOIN on the Account table (joined with Customer) to find pairs of\r\ncustomers who hold accounts in the same branch.\r\n9. Execute all queries in MySQL, verify the result sets against the inserted data, and record the\r\noutput.\r\n10. Compare the obtained output with the aim to confirm the experiment has been performed\r\ncorrectly.\r\nDatabase Schema — Table Relationship Diagram:\r\nThe diagram below shows the four tables used in this experiment and their cardinalities. CUSTOMER\r\nand BRANCH are independent entities; ACCOUNT is linked to both through foreign keys (many\r\naccounts can belong to one customer and one branch); TRANSACTIONS is linked to ACCOUNT\r\n(many transactions can belong to one account).\r\n\r\nSQL Syntax Reference:\r\n1. INNER JOIN\r\nCombines rows from two or more tables where the join condition matches in both tables.\r\nSELECT t1.col1, t2.col2\r\nFROM table1 t1\r\nINNER JOIN table2 t2 ON t1.common_col = t2.common_col;\r\n2. Subquery (Nested Query)\r\nA query placed inside the WHERE clause of an outer query; the inner query is evaluated first.\r\nSELECT col1, col2\r\nFROM table_name\r\nWHERE col3 > (SELECT AVG(col3) FROM table_name);\r\n3. SELF JOIN\r\nA table is joined with itself using two different aliases, used to compare rows within the same table.\r\nSELECT a1.col, a2.col\r\nFROM table_name a1\r\nINNER JOIN table_name a2\r\nON a1.common_col = a2.common_col\r\nAND a1.id <> a2.id;\r\nREAL-TIME SCENARIO — TRUSTBANK RETAIL BANKING SYSTEM:\r\nTrustBank operates through multiple branches. Each customer holds one or more accounts opened at a\r\nspecific branch, and every account records a history of deposit and withdrawal transactions. The bank\r\nneeds to analyse customer transaction history, identify high-value (above-average balance) customers,\r\nand find customers who share the same home branch for targeted branch-level offers.\r\nStep 1 — Create the Database\r\nCREATE DATABASE BankDB;\r\nUSE BankDB;\r\nStep 2 — Create Table: Branch\r\nCREATE TABLE Branch (\r\nbranch_id INT NOT NULL AUTO_INCREMENT,\r\nbranch_name VARCHAR(100) NOT NULL,\r\ncity VARCHAR(50) NOT NULL,\r\nifsc_code VARCHAR(20) NOT NULL,\r\nCONSTRAINT pk_branch PRIMARY KEY (branch_id),\r\nCONSTRAINT uq_ifsc UNIQUE (ifsc_code)\r\n);\r\nStep 3 — Create Table: Customer\r\nCREATE TABLE Customer (\r\ncustomer_id INT NOT NULL AUTO_INCREMENT,\r\nfull_name VARCHAR(100) NOT NULL,\r\nemail VARCHAR(100) NOT NULL,\r\nphone VARCHAR(15),\r\ncity VARCHAR(50),\r\n\r\nCONSTRAINT pk_cust PRIMARY KEY (customer_id),\r\nCONSTRAINT uq_e"
      },
      "expectedOutput": "---------------  --------------- \r\n Performance   50                               \r\n Viva-voce     10                               \r\n Record        15                               \r\n Total         75                               \r\n\r\nResult:",
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
        "code": "SELECT query> so the complex join\r\nlogic is stored and reused with a simple SELECT.\r\n4. Query each view directly using SELECT * FROM view_name to verify it returns correct, live\r\ndata from the base tables.\r\n5. Identify columns that are frequently used in WHERE, JOIN, or ORDER BY clauses — these\r\nare candidates for indexing.\r\n6. Run EXPLAIN on a sample query BEFORE creating an index and record the access type,\r\npossible keys, and number of rows scanned.\r\n7. Create a Single-Column Index on one filter column using CREATE INDEX index_name ON\r\ntable(column).\r\n8. Create a Composite (multi-column) Index on two columns that are frequently filtered together\r\nusing CREATE INDEX index_name ON table(col1, col2).\r\n9. Create a Unique Index on a column that must not contain duplicate values using CREATE\r\nUNIQUE INDEX index_name ON table(column).\r\n10. Run EXPLAIN again on the same queries AFTER indexing and compare the access type, key\r\nused, and rows examined against the earlier result.\r\n11. Use SHOW INDEX FROM table_name to verify that all indexes (PRIMARY, UNIQUE,\r\nsingle, composite) exist with the correct structure.\r\n12. Attempt to insert a duplicate value into the uniquely indexed column to confirm the constraint\r\nis enforced and rejects the duplicate.\r\n13. Document the before/after execution plans and conclude which indexing strategy improved\r\nperformance.\r\nProcedure Flow Diagram\r\nThe diagram below summarizes the workflow followed in this experiment — from creating views, to\r\nmeasuring query performance before indexing, applying the appropriate index type, and re-measuring\r\nperformance:\r\n\r\nSQL Syntax Reference:\r\nThe following SQL commands are used in this experiment:\r\n1. CREATE VIEW\r\nStores a SELECT query as a virtual table. The view always reflects live data from the underlying base\r\ntables.\r\nCREATE VIEW view_name AS\r\nSELECT column1, column2, ...\r\nFROM table_name\r\nWHERE condition;\r\n2. DROP VIEW\r\nRemoves a view definition without affecting the underlying base tables.\r\nDROP VIEW IF EXISTS view_name;\r\n3. CREATE INDEX (Single-Column)\r\nSpeeds up lookups/filters on one column by avoiding a full table scan.\r\nCREATE INDEX index_name\r\nON table_name (column_name);\r\n4. CREATE INDEX (Composite / Multi-Column)\r\nSpeeds up queries that filter or join on two or more columns together. Column order matters — the\r\nmost selective / most frequently filtered column is usually placed first.\r\nCREATE INDEX index_name\r\nON table_name (column1, column2);\r\n5. CREATE UNIQUE INDEX\r\nEnforces that no two rows can have the same value in the indexed column(s), in addition to speeding\r\nup lookups.\r\nCREATE UNIQUE INDEX index_name\r\nON table_name (column_name);\r\n6. DROP INDEX\r\nDROP INDEX index_name ON table_name;\r\n7. SHOW INDEX\r\nLists all indexes on a table, including the PRIMARY KEY, UNIQUE, single, and composite indexes.\r\nSHOW INDEX FROM table_name;\r\n8. EXPLAIN\r\nDisplays the query execution plan chosen by the optimizer — access type, index used, and estimated\r\nrows scanned — without actually"
      },
      "expectedOutput": "---------------  --------------- \r\n Performance   50                               \r\n\r\n Viva-voce   10       \r\n ----------  ---  --- \r\n Record      15       \r\n Total       75       \r\n\r\nResult:",
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
        "code": "INSERT INTO statements.\r\n5. Create a FUNCTION fn_calculate_hra() that returns HRA as 40% of basic salary.\r\n6. Create a FUNCTION fn_calculate_bonus() that returns bonus based on years of service and\r\nperformance rating.\r\n7. Create a PROCEDURE sp_calculate_salary() that uses both functions to compute gross salary\r\nand net salary for one employee, and inserts/updates the Payroll table using an OUT\r\nparameter to return the net salary.\r\n8. Create a PROCEDURE sp_generate_payroll_all() that uses a CURSOR to loop through every\r\nemployee and call sp_calculate_salary() for each one, automating the monthly payroll run.\r\n9. Execute the procedures using the CALL statement and execute the functions inside SELECT\r\nstatements.\r\n10. Execute SELECT and JOIN queries to verify payroll records, and aggregate queries to\r\nsummarise department-wise payroll cost.\r\nTable Structures (Entities, Attributes and Keys):\r\nEach table, its attributes, and its keys are listed below:\r\nTable 1 — DEPARTMENT\r\n Primary Key: dept_id (INT, AUTO_INCREMENT)\r\n Attributes: dept_name (VARCHAR)\r\nTable 2 — EMPLOYEE\r\n Primary Key: emp_id (INT, AUTO_INCREMENT)\r\n Foreign Key: dept_id → DEPARTMENT(dept_id)\r\n Attributes: full_name (VARCHAR), designation (VARCHAR), date_of_joining (DATE),\r\nbasic_salary (DECIMAL), performance_rating (DECIMAL)\r\nTable 3 — PAYROLL\r\n Primary Key: payroll_id (INT, AUTO_INCREMENT)\r\n Foreign Key: emp_id → EMPLOYEE(emp_id)\r\n Attributes: pay_month (VARCHAR), basic_salary, hra, da, bonus, deductions, gross_salary,\r\nnet_salary (all DECIMAL), generated_at (DATETIME)\r\n\r\nTable Relationship Diagram:\r\nThe diagram below shows how the three tables are related:\r\nFlowchart — Batch Payroll Procedure (sp_generate_payroll_all):\r\nSince this experiment is procedure-oriented, the flowchart below shows the algorithm followed by\r\nsp_generate_payroll_all(), which uses a cursor to loop through every employee and call\r\nsp_calculate_salary() for each one:\r\nSQL Syntax Reference:\r\nThe following SQL constructs are used in this experiment:\r\n1. CREATE FUNCTION\r\nCreates a reusable scalar function that returns a single value.\r\n\r\nDELIMITER $$\r\nCREATE FUNCTION function_name(param1 DATATYPE, ...)\r\nRETURNS return_datatype\r\nDETERMINISTIC\r\nBEGIN\r\nDECLARE variable_name DATATYPE;\r\n-- logic\r\nRETURN variable_name;\r\nEND$$\r\nDELIMITER ;\r\n2. CREATE PROCEDURE\r\nCreates a stored procedure that can accept IN, OUT, or INOUT parameters.\r\nDELIMITER $$\r\nCREATE PROCEDURE procedure_name(\r\nIN param1 DATATYPE,\r\nOUT param2 DATATYPE\r\n)\r\nBEGIN\r\n-- logic, SELECT ... INTO, INSERT, UPDATE, etc.\r\nEND$$\r\nDELIMITER ;\r\n3. IF ... ELSEIF ... END IF\r\nProvides conditional branching inside procedures and functions.\r\nIF condition1 THEN\r\n-- statements\r\nELSEIF condition2 THEN\r\n-- statements\r\nELSE\r\n-- statements\r\nEND IF;\r\n4. CURSOR (DECLARE, OPEN, FETCH, CLOSE)\r\nAllows row-by-row processing of a result set inside a procedure.\r\nDECLARE done INT DEFAULT 0;\r\nDECLARE cursor_name CURSOR FOR SELECT col FROM table_name;\r\nDECLARE CONTINUE HANDLER FOR "
      },
      "expectedOutput": "---------------  --------------- \r\n Performance   50                               \r\n\r\n Viva-voce   10       \r\n ----------  ---  --- \r\n Record      15       \r\n Total       75       \r\n\r\nResult:",
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
        "code": "CREATE TABLE with PRIMARY\r\nKEY, FOREIGN KEY, and CHECK constraints.\r\n4. Insert sample account data using INSERT INTO.\r\n5. Demonstrate manual transaction control: open a transaction with START TRANSACTION,\r\nperform an UPDATE, mark a SAVEPOINT, perform a second UPDATE, use ROLLBACK\r\nTO SAVEPOINT to undo only the second update, then COMMIT the transaction.\r\n6. Design a stored procedure sp_transfer_funds() that automates a fund transfer between two\r\naccounts.\r\n7. Inside the procedure, declare an EXIT HANDLER FOR SQLEXCEPTION that automatically\r\nissues ROLLBACK and returns a failure message whenever any SQL exception occurs.\r\n8. Within the procedure body, start a transaction, set a SAVEPOINT before the debit step,\r\nvalidate the source balance, and raise a custom exception using SIGNAL SQLSTATE '45000'\r\nwhen the balance is insufficient or the account does not exist.\r\n9. Debit the source account, log the transaction, set a second SAVEPOINT, credit the\r\ndestination account, log that transaction, and COMMIT only if every step succeeds.\r\n10. Call the procedure with valid data to demonstrate a successful, committed transaction.\r\n11. Call the procedure with an amount greater than the available balance to demonstrate the\r\nexception handler catching the error and automatically rolling back the entire transaction.\r\n12. Verify the final state of the Account and Transaction_Log tables using SELECT queries.\r\nTables Used:\r\nThe experiment uses two related tables:\r\n Account — Primary Key: account_no (INT, AUTO_INCREMENT) | Attributes:\r\naccount_holder, account_type, balance (CHECK >= 0), branch\r\n Transaction_Log — Primary Key: txn_id (INT, AUTO_INCREMENT) | Foreign Key:\r\naccount_no → Account(account_no) | Attributes: txn_type, amount, txn_date, description,\r\nstatus\r\n\r\nSQL Syntax Reference:\r\nThe following transaction-control and procedure constructs are used in this experiment:\r\n1. START TRANSACTION / BEGIN — marks the start of a transaction block.\r\nSTART TRANSACTION;\r\n-- or\r\nBEGIN;\r\n2. SAVEPOINT — marks an intermediate point inside a transaction that can be rolled back to.\r\nSAVEPOINT savepoint_name;\r\n3. ROLLBACK TO SAVEPOINT — undoes only the changes made after the named savepoint.\r\nROLLBACK TO SAVEPOINT savepoint_name;\r\n4. ROLLBACK — undoes all changes made since the transaction began.\r\nROLLBACK;\r\n5. COMMIT — permanently saves all changes made during the transaction.\r\nCOMMIT;\r\n6. DECLARE ... HANDLER — defines exception-handling logic inside a stored procedure.\r\nDECLARE EXIT HANDLER FOR SQLEXCEPTION\r\nBEGIN\r\nROLLBACK;\r\nSELECT 'Transaction Failed' AS message;\r\nEND;\r\n7. SIGNAL SQLSTATE — raises a custom, user-defined error condition.\r\nSIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Custom error message';\r\nStored Procedure Logic (Flowchart):\r\nSince this experiment is centred on a stored procedure, the diagram below shows the control flow of\r\nsp_transfer_funds(), including where the transaction is opened, where the savepoints are placed, and\r\nhow the exit handler intercepts "
      },
      "expectedOutput": "---------------  --------------- \r\n Performance   50                               \r\n\r\n Viva-voce   10       \r\n ----------  ---  --- \r\n Record      15       \r\n Total       75       \r\n\r\nResult:",
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
        "code": "CREATE TABLE, defining PRIMARY\r\nKEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK and DEFAULT constraints.\r\n5. Insert seed data for students, the exam, and the question bank using INSERT INTO\r\nstatements.\r\n6. Create views to expose a safe question paper (without answers) and a consolidated result-\r\nsummary report.\r\n7. Create indexes on frequently searched/joined columns to speed up lookups.\r\n8. Create triggers to automatically evaluate answer correctness on submission and to maintain an\r\naudit trail whenever a result is corrected.\r\n9. Create stored procedures to encapsulate the business logic for registering a student and for\r\nevaluating a result.\r\n10. Register students for the exam and submit their answers, using explicit transactions with\r\nSAVEPOINT/ROLLBACK to guarantee atomicity.\r\n11. Call the evaluation procedure to generate results, and demonstrate the audit trigger by\r\ncorrecting a result inside a transaction.\r\n12. Execute verification queries (SELECT, JOIN, views, aggregates) and record the output.\r\nEntities, Attributes, and Keys:\r\nEach entity of the Online Examination System, its primary key, foreign key(s), and other attributes are\r\nlisted below:\r\nEntity — STUDENT\r\n Primary Key: student_id (INT, AUTO_INCREMENT)\r\n Attributes: register_no (VARCHAR, UNIQUE), full_name (VARCHAR), email\r\n(VARCHAR, UNIQUE), phone (VARCHAR), department (VARCHAR)\r\nEntity — EXAM\r\n Primary Key: exam_id (INT, AUTO_INCREMENT)\r\n Attributes: exam_title (VARCHAR), subject (VARCHAR), total_marks (INT),\r\nduration_minutes (INT), exam_date (DATETIME)\r\n\r\nEntity — QUESTION\r\n  Primary Key: question_id (INT, AUTO_INCREMENT)\r\n  Foreign Key: exam_id → EXAM(exam_id)\r\n  Attributes: question_text (VARCHAR), option_a/b/c/d (VARCHAR), correct_option (ENUM\r\n'A','B','C','D'), marks (INT)\r\n\r\nEntity — REGISTRATION (Bridge: STUDENT ↔ EXAM)\r\n  Primary Key: registration_id (INT, AUTO_INCREMENT)\r\n  Foreign Key: student_id → STUDENT, exam_id → EXAM\r\n  Attributes: registered_at (DATETIME); UNIQUE(student_id, exam_id) prevents duplicate\r\nregistration\r\n\r\nEntity — STUDENT_ANSWER (Bridge: REGISTRATION ↔ QUESTION)\r\n  Primary Key: answer_id (INT, AUTO_INCREMENT)\r\n  Foreign Key: registration_id → REGISTRATION, question_id → QUESTION\r\n  Attributes:  chosen_option  (ENUM  'A','B','C','D'),  is_correct  (TINYINT,  set  by  trigger);\r\nUNIQUE(registration_id, question_id)\r\n\r\nEntity — RESULT (1:1 with REGISTRATION)\r\n\r\nPrimary Key: result_id (INT, AUTO_INCREMENT)\r\n  Foreign Key: registration_id → REGISTRATION (UNIQUE)\r\n  Attributes: total_score (INT), percentage (DECIMAL), grade (VARCHAR), status (ENUM\r\n'Pass','Fail'), evaluated_at (DATETIME)\r\n\r\nEntity — RESULT_AUDIT\r\n  Primary Key: audit_id (INT, AUTO_INCREMENT)\r\n\r\nForeign Key: registration_id → REGISTRATION\r\n  Attributes: old_score, new_score (INT), old_grade, new_grade (VARCHAR), changed_at\r\n(DATETIME) — populated automatically by trigger\r\n\r\nRelationships and Cardinalities:\r\n| Relationship  | Entities Involved  | Cardinality  | Resolution    "
      },
      "expectedOutput": "---------------  --------------- \r\n Performance   50                               \r\n\r\n Viva-voce   10       \r\n ----------  ---  --- \r\n Record      15       \r\n Total       75       \r\n\r\nResult:",
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
