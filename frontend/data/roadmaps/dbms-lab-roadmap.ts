import { DSACategory } from "../dsa-topic-data";

export const DBMS_LAB_ROADMAP_CATEGORIES: DSACategory[] = [
  // ========================================================
  // MODULE 1: ER MODELING & NORMALIZATION (0/2)
  // ========================================================
  {
    id: "dbms-er-normalization",
    name: "1. ER Modeling & Normalization",
    shortDesc: "Entity-Relationship schemas, relational mapping, and UNF to BCNF decomposition.",
    iconName: "Database",
    topics: [
      {
        id: "dbms-er-diagram-ecommerce",
        slug: "er-diagram-relational-schema-ecommerce",
        title: "Exp 1: Design of ER Diagram and Relational Schema for an E-Commerce System",
        categoryId: "dbms-er-normalization",
        categoryName: "1. ER Modeling & Normalization",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "ER diagram relational schema e-commerce system MySQL",
        gfgUrl: "https://www.geeksforgeeks.org/er-model-to-relational-model/",
        quickSummary: "Model Customers, Products, Orders, Payments, and Suppliers as an ER diagram, then convert it into a normalized relational schema with keys and constraints in MySQL.",
        keyPoints: [
          "Entity identification: Entities, attributes, and relationship cardinalities (1:1, 1:N, M:N) are identified before schema design.",
          "Table mapping: Each entity becomes a table with a primary key; M:N relationships become bridge/associative tables.",
          "Integrity constraints: PRIMARY KEY, FOREIGN KEY, and other constraints enforce referential integrity in the created tables."
        ],
        diagramTitle: "E-Commerce ER Model to Relational Schema Mapping",
        diagram: `  [ Customers (1) ] ──< Places >──► [ (N) Orders ]
                                           │
                                           ▼ (1:N)
                                  [ OrderItems (M:N Bridge) ]
                                           ▲
                                           │ (N:1)
  [ Suppliers (1) ] ──< Supplies >─► [ (N) Products ]`,
        complexities: [],
        tools: [
          { tool: "MySQL", purpose: "Schema creation & constraints", notes: "CREATE TABLE + sample INSERTs" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (E-Commerce Schema)",
            code: `-- 1. Customers Table
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(50)
);

-- 2. Products Table
CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    stock INT DEFAULT 0 CHECK (stock >= 0)
);

-- 3. Orders Table
CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE
);

-- Sample Data
INSERT INTO Customers (name, email, city) VALUES ('Alice Smith', 'alice@mail.com', 'Chennai');
INSERT INTO Products (name, price, stock) VALUES ('Laptop Pro', 85000.00, 25);
INSERT INTO Orders (customer_id, order_date, total_amount) VALUES (1, '2026-03-15', 85000.00);

SELECT * FROM Orders;`
          }
        ],
        practiceProblems: [
          {
            title: "ER Model to Relational Model",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/er-model-to-relational-model/",
            platform: "GeeksforGeeks",
            topicTag: "ER Modeling"
          }
        ]
      },
      {
        id: "dbms-normalization-unf-bcnf",
        slug: "database-normalization-unf-to-bcnf",
        title: "Exp 2: Database Normalization from UNF to BCNF for a University Management System",
        categoryId: "dbms-er-normalization",
        categoryName: "1. ER Modeling & Normalization",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Database normalization 1NF 2NF 3NF BCNF functional dependencies",
        gfgUrl: "https://www.geeksforgeeks.org/introduction-of-database-normalization/",
        quickSummary: "Take an unnormalized university dataset and progressively normalize it through 1NF, 2NF, 3NF, up to BCNF.",
        keyPoints: [
          "1NF (First Normal Form): 1NF removes repeating groups and multivalued attributes ensuring atomic values.",
          "2NF & 3NF: 2NF/3NF remove partial and transitive functional dependencies on candidate keys.",
          "BCNF (Boyce-Codd): BCNF ensures every determinant is a candidate key, eliminating remaining insertion/update anomalies."
        ],
        diagramTitle: "University Database UNF to BCNF Normalization Pipeline",
        diagram: `  [ UNF: Student, Courses, Department, HOD (Redundant!) ]
                              │ 1NF (Atomic Fields)
                              ▼
  [ 1NF: Multi-valued courses separated into distinct rows ]
                              │ 2NF & 3NF (Remove Partial & Transitive FDs)
                              ▼
  [ Students ] ──► [ Departments (DeptID -> HOD) ] ──► [ CourseEnrollments ]`,
        complexities: [],
        tools: [
          { tool: "MySQL", purpose: "Implement normalized tables", notes: "Functional dependency analysis" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (Normalized Tables)",
            code: `-- 3NF / BCNF Normalized University Schema
CREATE TABLE Departments (
    dept_id VARCHAR(10) PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL,
    hod_name VARCHAR(50) NOT NULL
);

CREATE TABLE Students (
    reg_no VARCHAR(15) PRIMARY KEY,
    student_name VARCHAR(50) NOT NULL,
    dept_id VARCHAR(10),
    FOREIGN KEY (dept_id) REFERENCES Departments(dept_id)
);

CREATE TABLE Courses (
    course_code VARCHAR(10) PRIMARY KEY,
    course_title VARCHAR(100) NOT NULL,
    credits INT CHECK (credits > 0)
);

INSERT INTO Departments VALUES ('AIDS', 'AI & Data Science', 'Dr. Arunkumar');
INSERT INTO Students VALUES ('922521101', 'Rohith E', 'AIDS');
INSERT INTO Courses VALUES ('AD8482', 'Data Science & Analytics Lab', 2);

SELECT s.reg_no, s.student_name, d.dept_name, d.hod_name 
FROM Students s 
JOIN Departments d ON s.dept_id = d.dept_id;`
          }
        ],
        practiceProblems: [
          {
            title: "Database Normalization (1NF, 2NF, 3NF, BCNF)",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/introduction-of-database-normalization/",
            platform: "GeeksforGeeks",
            topicTag: "Normalization"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 2: TRANSACTIONS, CONSTRAINTS & DDL (0/3)
  // ========================================================
  {
    id: "dbms-transactions-ddl",
    name: "2. Transactions, Constraints & DDL",
    shortDesc: "ACID transactions, CAP theorem tradeoffs, DDL operations, and schema constraints.",
    iconName: "ShieldCheck",
    topics: [
      {
        id: "dbms-acid-cap-properties",
        slug: "acid-properties-cap-theorem-mysql",
        title: "Exp 3: Implementation of ACID Properties and CAP Theorem Using MySQL",
        categoryId: "dbms-transactions-ddl",
        categoryName: "2. Transactions, Constraints & DDL",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "ACID properties in DBMS transactions COMMIT ROLLBACK CAP theorem",
        gfgUrl: "https://www.geeksforgeeks.org/acid-properties-in-dbms/",
        quickSummary: "Demonstrate Atomicity, Consistency, Isolation, Durability through transaction examples, and relate them to the CAP theorem's tradeoffs.",
        keyPoints: [
          "Atomicity & Consistency: Transactions group multiple statements so they either fully commit or fully roll back.",
          "Isolation levels: Isolation levels control how concurrent transactions see each other's uncommitted changes.",
          "CAP theorem: CAP theorem states a distributed system can guarantee at most two of Consistency, Availability, and Partition tolerance."
        ],
        diagramTitle: "ACID Transaction State Machine",
        diagram: `  [ Active ] ──► [ Partially Committed ] ──► [ Committed (Durable) ]
        │                       │
        ▼                       ▼
  [ Failed ] ─────────────► [ Aborted / Rolled Back ]`,
        complexities: [],
        tools: [
          { tool: "MySQL", purpose: "Transaction demo (COMMIT/ROLLBACK)", notes: "InnoDB transaction engine" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (ACID Transaction)",
            code: `-- Bank Account Transfer Demonstrating Atomicity & Consistency
CREATE TABLE BankAccounts (
    acc_id INT PRIMARY KEY,
    name VARCHAR(50),
    balance DECIMAL(10,2) CHECK (balance >= 0)
);

INSERT INTO BankAccounts VALUES (1, 'Alice', 1000.00), (2, 'Bob', 500.00);

-- Atomic Transfer of $200 from Alice to Bob
START TRANSACTION;
UPDATE BankAccounts SET balance = balance - 200.00 WHERE acc_id = 1;
UPDATE BankAccounts SET balance = balance + 200.00 WHERE acc_id = 2;
COMMIT;

SELECT * FROM BankAccounts;`
          }
        ],
        practiceProblems: [
          {
            title: "ACID Properties in DBMS",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/acid-properties-in-dbms/",
            platform: "GeeksforGeeks",
            topicTag: "Transactions"
          }
        ]
      },
      {
        id: "dbms-ddl-commands-alter",
        slug: "ddl-commands-alter-table-operations",
        title: "Exp 4: Implementation of DDL Commands and ALTER TABLE Operations in MySQL",
        categoryId: "dbms-transactions-ddl",
        categoryName: "2. Transactions, Constraints & DDL",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "DDL commands CREATE ALTER DROP TRUNCATE TABLE MySQL",
        gfgUrl: "https://www.geeksforgeeks.org/sql-ddl-dql-dml-dcl-tcl-commands/",
        quickSummary: "Practice Data Definition Language commands — CREATE, ALTER (add/drop/modify columns), DROP — on sample tables.",
        keyPoints: [
          "Schema definition: CREATE TABLE defines table structure, primary keys, and column data types.",
          "Dynamic schema alteration: ALTER TABLE modifies existing structure (add/drop/rename columns, change types) without recreating the table.",
          "Immediate commit: DDL changes are auto-committed and affect schema metadata directly."
        ],
        diagramTitle: "ALTER TABLE Schema Operations",
        diagram: `  [ Table: Employees (id, name) ]
                 │
                 ├── ADD COLUMN (email VARCHAR(100))
                 ├── MODIFY COLUMN (name VARCHAR(150))
                 └── DROP COLUMN (temp_notes)`,
        complexities: [],
        tools: [
          { tool: "MySQL", purpose: "Schema modification practice", notes: "DDL statements" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (DDL & ALTER)",
            code: `-- 1. Create Initial Table
CREATE TABLE Staff (
    staff_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    salary DECIMAL(10,2)
);

-- 2. Add New Column
ALTER TABLE Staff ADD COLUMN email VARCHAR(100);

-- 3. Modify Existing Column Type
ALTER TABLE Staff MODIFY COLUMN first_name VARCHAR(100) NOT NULL;

-- 4. Rename Column
ALTER TABLE Staff RENAME COLUMN first_name TO full_name;

DESCRIBE Staff;`
          }
        ],
        practiceProblems: [
          {
            title: "SQL DDL Commands",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/sql-ddl-dql-dml-dcl-tcl-commands/",
            platform: "GeeksforGeeks",
            topicTag: "DDL"
          }
        ]
      },
      {
        id: "dbms-constraints-hospital-system",
        slug: "sql-constraints-hospital-appointment-system",
        title: "Exp 7: Implementation of SQL Constraints in a Hospital Appointment System",
        categoryId: "dbms-transactions-ddl",
        categoryName: "2. Transactions, Constraints & DDL",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "SQL constraints NOT NULL UNIQUE CHECK PRIMARY FOREIGN KEY hospital",
        gfgUrl: "https://www.geeksforgeeks.org/sql-constraints/",
        quickSummary: "Apply NOT NULL, UNIQUE, CHECK, PRIMARY KEY, and FOREIGN KEY constraints to enforce data integrity in a hospital appointment schema.",
        keyPoints: [
          "Integrity restriction: Column-level and table-level constraints restrict what data can be inserted/updated.",
          "Referential integrity: Foreign keys maintain referential integrity between related tables (e.g. patients <-> appointments).",
          "Domain validation: CHECK constraints enforce domain rules (e.g. valid appointment fees, positive age)."
        ],
        diagramTitle: "Hospital Appointment Constraints Architecture",
        diagram: `  [ Patients (patient_id PK, age > 0 CHECK, phone UNIQUE) ]
                                 │
                                 ▼ (1:N FK)
  [ Appointments (app_id PK, patient_id FK, status IN ('Booked','Completed') CHECK) ]`,
        complexities: [],
        tools: [
          { tool: "MySQL", purpose: "Constraint enforcement", notes: "Schema domain validation" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (Hospital Constraints)",
            code: `-- Hospital Schema Enforcing Strict Integrity Constraints
CREATE TABLE Patients (
    patient_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT CHECK (age >= 0 AND age <= 125),
    phone VARCHAR(15) UNIQUE NOT NULL
);

CREATE TABLE Appointments (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    appointment_date DATETIME NOT NULL,
    doctor_name VARCHAR(100) NOT NULL,
    fee DECIMAL(8,2) CHECK (fee >= 0),
    status VARCHAR(20) DEFAULT 'Booked' CHECK (status IN ('Booked', 'Completed', 'Cancelled')),
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE
);

INSERT INTO Patients VALUES (101, 'Kavitha R', 28, '9876543210');
INSERT INTO Appointments (patient_id, appointment_date, doctor_name, fee) 
VALUES (101, '2026-04-10 10:30:00', 'Dr. Sundaram', 500.00);

SELECT * FROM Appointments;`
          }
        ],
        practiceProblems: [
          {
            title: "SQL Constraints Implementation",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/sql-constraints/",
            platform: "GeeksforGeeks",
            topicTag: "Constraints"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 3: DATA MANIPULATION & QUERYING (0/3)
  // ========================================================
  {
    id: "dbms-data-manipulation",
    name: "3. Data Manipulation & Querying",
    shortDesc: "DML insert/update/delete, command comparison, and filtered analytics queries.",
    iconName: "Code2",
    topics: [
      {
        id: "dbms-dml-employee-db",
        slug: "insert-update-delete-employee-database",
        title: "Exp 5: Performing INSERT, UPDATE, and DELETE Operations on an Employee Database",
        categoryId: "dbms-data-manipulation",
        categoryName: "3. Data Manipulation & Querying",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "SQL DML INSERT UPDATE DELETE employee database",
        gfgUrl: "https://www.geeksforgeeks.org/sql-dml-commands/",
        quickSummary: "Practice core DML statements to add, modify, and remove employee records.",
        keyPoints: [
          "Row insertion: INSERT adds new rows with specified column values.",
          "Selective update: UPDATE modifies existing rows matching a WHERE condition.",
          "Row removal: DELETE removes rows matching a condition, distinct from schema-level removal."
        ],
        diagramTitle: "DML Lifecycle on Employee Database",
        diagram: `  [ Empty Table ] ──► INSERT (Create Employee Records)
                         │
                         ▼ UPDATE (Salary Increment WHERE dept='AIDS')
                  [ Modified Data ]
                         │
                         ▼ DELETE (Remove WHERE emp_id=103)`,
        complexities: [],
        tools: [
          { tool: "MySQL", purpose: "DML practice", notes: "CRUD statements" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (DML Operations)",
            code: `CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10,2)
);

-- 1. INSERT
INSERT INTO Employees VALUES 
(1, 'Anish', 'AIDS', 65000.00),
(2, 'Priya', 'CSE', 60000.00),
(3, 'Karthik', 'ECE', 55000.00);

-- 2. UPDATE (10% Hike for AIDS)
UPDATE Employees SET salary = salary * 1.10 WHERE department = 'AIDS';

-- 3. DELETE
DELETE FROM Employees WHERE emp_id = 3;

SELECT * FROM Employees;`
          }
        ],
        practiceProblems: [
          {
            title: "SQL DML Commands Tutorial",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/sql-dml-commands/",
            platform: "GeeksforGeeks",
            topicTag: "DML"
          }
        ]
      },
      {
        id: "dbms-delete-truncate-drop",
        slug: "comparison-delete-truncate-drop",
        title: "Exp 6: Comparison of DELETE, TRUNCATE, and DROP Commands Using a Product Inventory Database",
        categoryId: "dbms-data-manipulation",
        categoryName: "3. Data Manipulation & Querying",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        gfgSearchQuery: "Difference between DELETE TRUNCATE and DROP in SQL",
        gfgUrl: "https://www.geeksforgeeks.org/difference-between-drop-and-truncate-in-sql/",
        quickSummary: "Contrast the three row/table-removal commands on an inventory database to understand their scope and reversibility.",
        keyPoints: [
          "DELETE (DML): DELETE removes rows conditionally, logs individual row deletions, and can be rolled back within a transaction.",
          "TRUNCATE (DDL): TRUNCATE removes all rows quickly, resets auto-increment identity counters, and is non-rollback-able.",
          "DROP (DDL): DROP removes the entire table structure along with its data, constraints, and indexes completely from the database."
        ],
        diagramTitle: "DELETE vs TRUNCATE vs DROP Comparison",
        diagram: `  Command   │ Scope                │ Logged? │ Rollback? │ Schema Kept?
  ──────────┼──────────────────────┼─────────┼───────────┼─────────────
  DELETE    │ Selected or all rows │ Yes     │ Yes       │ Yes
  TRUNCATE  │ All rows in table    │ Minimal │ No        │ Yes (Clean)
  DROP      │ Whole table entity   │ No      │ No        │ Destroyed`,
        complexities: [],
        tools: [
          { tool: "MySQL", purpose: "Command comparison", notes: "Scope and transaction rollback benchmark" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (DELETE vs TRUNCATE vs DROP)",
            code: `-- Product Inventory Benchmarking Table
CREATE TABLE Inventory (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(50),
    qty INT
);

INSERT INTO Inventory (item_name, qty) VALUES ('Mouse', 100), ('Monitor', 20);

-- DELETE conditionally
DELETE FROM Inventory WHERE qty < 50;

-- TRUNCATE empties rows & resets AUTO_INCREMENT
TRUNCATE TABLE Inventory;

-- DROP removes structure
DROP TABLE Inventory;`
          }
        ],
        practiceProblems: [
          {
            title: "Difference between DROP, TRUNCATE and DELETE",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/difference-between-drop-and-truncate-in-sql/",
            platform: "GeeksforGeeks",
            topicTag: "SQL Commands"
          }
        ]
      },
      {
        id: "dbms-customer-analytics-clauses",
        slug: "customer-analytics-where-order-like-in-between-distinct",
        title: "Exp 8: Customer Analytics Using WHERE, ORDER BY, LIKE, IN, BETWEEN, and DISTINCT",
        categoryId: "dbms-data-manipulation",
        categoryName: "3. Data Manipulation & Querying",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "SQL queries WHERE ORDER BY LIKE IN BETWEEN DISTINCT customer",
        gfgUrl: "https://www.geeksforgeeks.org/sql-queries/",
        quickSummary: "Query a customer dataset using filtering, sorting, pattern matching, and de-duplication clauses.",
        keyPoints: [
          "Filtering & sorting: WHERE filters rows by condition; ORDER BY sorts the result set ascending or descending.",
          "Pattern & range expressions: LIKE, IN, and BETWEEN provide pattern matching, set membership, and bounded interval filtering.",
          "Deduplication: DISTINCT removes duplicate values from the query projection."
        ],
        diagramTitle: "SQL Filtering & Sorting Pipeline",
        diagram: `  [ Raw Customer Dataset (10,000 Rows) ]
                     │ WHERE balance BETWEEN 1000 AND 5000 AND city IN ('Chennai', 'Karur')
                     ▼
          [ Filtered Rows (350 Rows) ]
                     │ ORDER BY balance DESC
                     ▼
          [ Sorted Analytics View ]`,
        complexities: [],
        tools: [
          { tool: "MySQL", purpose: "Query practice", notes: "SELECT clause composition" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (Customer Analytics)",
            code: `CREATE TABLE CustomerAnalytics (
    cust_id INT PRIMARY KEY,
    name VARCHAR(100),
    city VARCHAR(50),
    credit_score INT,
    annual_spend DECIMAL(10,2)
);

INSERT INTO CustomerAnalytics VALUES
(1, 'Deepak S', 'Karur', 750, 45000.00),
(2, 'Divya M', 'Chennai', 820, 120000.00),
(3, 'Dinesh K', 'Coimbatore', 680, 28000.00),
(4, 'Devika P', 'Chennai', 790, 85000.00);

-- Analytics Query Using Clauses
SELECT DISTINCT city FROM CustomerAnalytics;

SELECT name, city, annual_spend 
FROM CustomerAnalytics 
WHERE name LIKE 'D%' 
  AND city IN ('Chennai', 'Karur') 
  AND credit_score BETWEEN 700 AND 850
ORDER BY annual_spend DESC;`
          }
        ],
        practiceProblems: [
          {
            title: "SQL Queries and Filtering",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/sql-queries/",
            platform: "GeeksforGeeks",
            topicTag: "SQL Queries"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 4: AGGREGATION, REPORTING & ANALYTICS (0/2)
  // ========================================================
  {
    id: "dbms-aggregation-reporting",
    name: "4. Aggregation, Reporting & Analytics",
    shortDesc: "GROUP BY, HAVING, CASE WHEN conditionals, and SQL window rankings.",
    iconName: "BarChart3",
    topics: [
      {
        id: "dbms-monthly-sales-reports",
        slug: "monthly-sales-reports-aggregate-group-by-having-case",
        title: "Exp 9: Generating Monthly Sales Reports Using Aggregate Functions, GROUP BY, HAVING, CASE WHEN, and String Functions",
        categoryId: "dbms-aggregation-reporting",
        categoryName: "4. Aggregation, Reporting & Analytics",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "SQL aggregate functions GROUP BY HAVING CASE WHEN sales report",
        gfgUrl: "https://www.geeksforgeeks.org/aggregate-functions-in-sql/",
        quickSummary: "Summarize sales data into monthly reports using aggregation, grouping, conditional logic, and string manipulation.",
        keyPoints: [
          "Summary statistics: Aggregate functions (SUM, COUNT, AVG, MAX, MIN) compute summary metrics per partition.",
          "Grouping & post-filter: GROUP BY partitions rows before aggregation; HAVING filters on aggregated results.",
          "Conditional projection: CASE WHEN adds conditional branching inline in SELECT projections, and string functions format reports."
        ],
        diagramTitle: "Sales Aggregation & Reporting Pipeline",
        diagram: `  [ Transactions ] ──► GROUP BY Month, Region 
                              ──► Aggregates: SUM(Sales), COUNT(Orders)
                              ──► HAVING SUM(Sales) > 50000
                              ──► CASE WHEN Category Tiering`,
        complexities: [],
        tools: [
          { tool: "MySQL", purpose: "Reporting queries", notes: "Aggregate calculations" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (Monthly Sales Report)",
            code: `CREATE TABLE Sales (
    sale_id INT PRIMARY KEY,
    product_category VARCHAR(50),
    amount DECIMAL(10,2),
    sale_month VARCHAR(10)
);

INSERT INTO Sales VALUES 
(1, 'Electronics', 15000, 'Jan'), (2, 'Furniture', 8000, 'Jan'),
(3, 'Electronics', 42000, 'Jan'), (4, 'Electronics', 60000, 'Feb'),
(5, 'Furniture', 12000, 'Feb');

-- Summary Report
SELECT 
    sale_month,
    UPPER(product_category) AS category_name,
    COUNT(*) AS total_orders,
    SUM(amount) AS total_revenue,
    AVG(amount) AS average_order_value,
    CASE 
        WHEN SUM(amount) >= 50000 THEN 'HIGH PERFORMING'
        ELSE 'STANDARD'
    END AS performance_tier
FROM Sales
GROUP BY sale_month, product_category
HAVING total_revenue > 10000
ORDER BY total_revenue DESC;`
          }
        ],
        practiceProblems: [
          {
            title: "Aggregate Functions and GROUP BY",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/aggregate-functions-in-sql/",
            platform: "GeeksforGeeks",
            topicTag: "Aggregation"
          }
        ]
      },
      {
        id: "dbms-window-functions-ranking",
        slug: "ranking-products-sql-window-functions",
        title: "Exp 10: Ranking Products Based on Sales Performance Using SQL Window Functions",
        categoryId: "dbms-aggregation-reporting",
        categoryName: "4. Aggregation, Reporting & Analytics",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "SQL window functions RANK DENSE_RANK ROW_NUMBER OVER PARTITION BY",
        gfgUrl: "https://www.geeksforgeeks.org/window-functions-in-sql/",
        quickSummary: "Use window functions to rank products by sales without collapsing the result set.",
        keyPoints: [
          "Non-collapsing ranking: Window functions (RANK, ROW_NUMBER, DENSE_RANK) compute per-row rankings over a defined partition.",
          "Window specification: OVER (PARTITION BY ... ORDER BY ...) defines the ranking scope and ordering criterion.",
          "Detail preservation: Unlike GROUP BY, window functions retain individual row detail alongside the rank value."
        ],
        diagramTitle: "SQL Window Ranking Over Partitions",
        diagram: `  [ Electronics Partition ]
    - Laptop ($1200)   ──► ROW_NUMBER: 1 | RANK: 1 | DENSE_RANK: 1
    - Phone ($800)     ──► ROW_NUMBER: 2 | RANK: 2 | DENSE_RANK: 2
  [ Furniture Partition ]
    - Desk ($450)      ──► ROW_NUMBER: 1 | RANK: 1 | DENSE_RANK: 1`,
        complexities: [],
        tools: [
          { tool: "MySQL", purpose: "Window function practice", notes: "OVER clause ranking" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (Window Functions)",
            code: `CREATE TABLE ProductSales (
    product_name VARCHAR(50),
    category VARCHAR(50),
    revenue DECIMAL(10,2)
);

INSERT INTO ProductSales VALUES
('MacBook Pro', 'Electronics', 95000),
('Dell XPS', 'Electronics', 95000),
('HP Pavilion', 'Electronics', 60000),
('Ergo Chair', 'Furniture', 25000),
('Oak Desk', 'Furniture', 32000);

-- Window Ranking Query
SELECT 
    product_name,
    category,
    revenue,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY revenue DESC) AS row_num,
    RANK() OVER (PARTITION BY category ORDER BY revenue DESC) AS category_rank,
    DENSE_RANK() OVER (PARTITION BY category ORDER BY revenue DESC) AS category_dense_rank
FROM ProductSales;`
          }
        ],
        practiceProblems: [
          {
            title: "Window Functions in SQL",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/window-functions-in-sql/",
            platform: "GeeksforGeeks",
            topicTag: "Window Functions"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 5: JOINS, VIEWS & QUERY PERFORMANCE (0/2)
  // ========================================================
  {
    id: "dbms-joins-views-performance",
    name: "5. Joins, Views & Query Performance",
    shortDesc: "Relational multi-table joins, subqueries, virtual views, and B-Tree indexing.",
    iconName: "Network",
    topics: [
      {
        id: "dbms-banking-joins-subqueries",
        slug: "banking-transaction-analysis-joins-subqueries",
        title: "Exp 11: Banking Transaction Analysis — JOIN and Subquery-Based SQL Statements",
        categoryId: "dbms-joins-views-performance",
        categoryName: "5. Joins, Views & Query Performance",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "SQL JOINs INNER LEFT RIGHT FULL subqueries banking transactions",
        gfgUrl: "https://www.geeksforgeeks.org/joins-in-sql/",
        quickSummary: "Analyze banking transactions across multiple related tables using various JOIN types and nested subqueries.",
        keyPoints: [
          "Join semantics: INNER/LEFT/RIGHT JOINs combine rows from related tables based on matching foreign key conditions.",
          "Subquery predicates: Subqueries (nested SELECTs) filter or compute dynamic thresholds used by an outer query.",
          "Correlated evaluation: Correlated subqueries reference outer query values for row-by-row comparisons."
        ],
        diagramTitle: "Relational Multi-Table JOIN Mapping",
        diagram: `  [ Accounts ] (acc_id PK) 
            │
            ├── INNER JOIN ──► [ Transactions ] (acc_id FK, txn_amt)
            │
            └── LEFT JOIN  ──► [ LoanDetails ] (acc_id FK, loan_status)`,
        complexities: [],
        tools: [
          { tool: "MySQL", purpose: "Multi-table analysis", notes: "JOIN & subquery composition" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (JOINs & Subqueries)",
            code: `CREATE TABLE BankUsers (
    user_id INT PRIMARY KEY,
    name VARCHAR(50),
    branch VARCHAR(50)
);

CREATE TABLE Txns (
    txn_id INT PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10,2),
    txn_type VARCHAR(10)
);

INSERT INTO BankUsers VALUES (1, 'Kavitha', 'Karur'), (2, 'Manoj', 'Chennai');
INSERT INTO Txns VALUES (101, 1, 15000, 'CR'), (102, 1, 2000, 'DR'), (103, 2, 5000, 'CR');

-- 1. Multi-Table INNER JOIN
SELECT u.name, u.branch, t.txn_id, t.amount, t.txn_type
FROM BankUsers u
INNER JOIN Txns t ON u.user_id = t.user_id;

-- 2. Subquery: Users with total transactions greater than average
SELECT name FROM BankUsers WHERE user_id IN (
    SELECT user_id FROM Txns GROUP BY user_id 
    HAVING SUM(amount) > (SELECT AVG(amount) FROM Txns)
);`
          }
        ],
        practiceProblems: [
          {
            title: "SQL JOIN Operations",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/joins-in-sql/",
            platform: "GeeksforGeeks",
            topicTag: "Joins"
          }
        ]
      },
      {
        id: "dbms-views-indexing-explain",
        slug: "ecommerce-database-views-indexing-query-performance",
        title: "Exp 12: ShopEasy E-Commerce Database — SQL Views, Indexing, and Query Performance Analysis",
        categoryId: "dbms-joins-views-performance",
        categoryName: "5. Joins, Views & Query Performance",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "SQL VIEW CREATE INDEX EXPLAIN query performance analysis MySQL",
        gfgUrl: "https://www.geeksforgeeks.org/sql-views/",
        quickSummary: "Create views to simplify complex queries and apply indexing to improve query performance on an e-commerce database, then measure the impact.",
        keyPoints: [
          "View abstraction: Views encapsulate a stored query as a virtual table for simplified reuse and security abstraction.",
          "Index acceleration: Indexes speed up lookups on frequently filtered/joined columns at the cost of extra write overhead.",
          "EXPLAIN query plan: EXPLAIN output reveals execution plans, key usage, and scan types (index seek vs. table scan)."
        ],
        diagramTitle: "B-Tree Index Lookup vs Full Table Scan",
        diagram: `  Without Index: Full Table Scan (O(N) - 1,000,000 rows examined)
  With B-Tree Index: B-Tree Root ──► Branch ──► Leaf Seek (O(log N) - 3 reads!)`,
        complexities: [],
        tools: [
          { tool: "MySQL", purpose: "Views & indexing", notes: "EXPLAIN for query plan optimization" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (Views & EXPLAIN Index)",
            code: `-- 1. Create Stored View
CREATE VIEW ActiveOrdersView AS
SELECT o.order_id, c.name AS customer_name, o.total_amount
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id;

-- 2. Create B-Tree Index on Search Column
CREATE INDEX idx_customer_city ON Customers(city);

-- 3. Analyze Query Execution Plan
EXPLAIN SELECT * FROM Customers WHERE city = 'Chennai';`
          }
        ],
        practiceProblems: [
          {
            title: "SQL Views and Query Optimization",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/sql-views/",
            platform: "GeeksforGeeks",
            topicTag: "Optimization"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 6: STORED PROCEDURES & TRANSACTION CONTROL (0/2)
  // ========================================================
  {
    id: "dbms-procedures-transactions",
    name: "6. Stored Procedures & Transaction Control",
    shortDesc: "Procedural SQL, parameter passing, savepoints, and transaction exception handling.",
    iconName: "Terminal",
    topics: [
      {
        id: "dbms-stored-procedures-payroll",
        slug: "stored-procedures-functions-employee-salaries-bonuses",
        title: "Exp 13: Stored Procedures and Functions to Calculate Employee Salaries and Bonuses (Payroll Management System)",
        categoryId: "dbms-procedures-transactions",
        categoryName: "6. Stored Procedures & Transaction Control",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "MySQL stored procedures functions IN OUT parameters payroll bonus",
        gfgUrl: "https://www.geeksforgeeks.org/stored-procedures-in-mysql/",
        quickSummary: "Encapsulate payroll calculation logic inside reusable stored procedures and functions.",
        keyPoints: [
          "Procedural encapsulation: Stored procedures bundle a sequence of SQL statements as a single callable server unit.",
          "Scalar functions: Functions return a computed value (e.g. bonus percentage) for inline use within other queries.",
          "Parameter abstraction: IN and OUT parameters allow procedures to be reused across different departments and roles."
        ],
        diagramTitle: "Stored Procedure Client-Server Execution",
        diagram: `  [ Client App ] ──► CALL CalculateBonus(emp_id, @bonus)
                                  │
                                  ▼ (Runs inside Database Engine)
                     [ Stored Procedure Logic ] ──► Returns Computed Value`,
        complexities: [],
        tools: [
          { tool: "MySQL", purpose: "Procedural SQL", notes: "Stored procedures & functions" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (Stored Procedure)",
            code: `DELIMITER //

CREATE PROCEDURE CalculateAnnualBonus(
    IN p_emp_id INT,
    OUT p_bonus DECIMAL(10,2)
)
BEGIN
    DECLARE v_salary DECIMAL(10,2);
    
    SELECT salary INTO v_salary FROM Employees WHERE emp_id = p_emp_id;
    
    IF v_salary >= 70000 THEN
        SET p_bonus = v_salary * 0.15;
    ELSE
        SET p_bonus = v_salary * 0.10;
    END IF;
END //

DELIMITER ;

-- Procedure Invocation
CALL CalculateAnnualBonus(1, @bonus_amount);
SELECT @bonus_amount AS CalculatedBonus;`
          }
        ],
        practiceProblems: [
          {
            title: "Stored Procedures in MySQL",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/stored-procedures-in-mysql/",
            platform: "GeeksforGeeks",
            topicTag: "PL/SQL"
          }
        ]
      },
      {
        id: "dbms-transaction-savepoint-handlers",
        slug: "banking-transaction-processing-begin-commit-rollback-savepoint",
        title: "Exp 14: Banking Transaction Processing Using BEGIN, COMMIT, ROLLBACK, and SAVEPOINT with Exception Handling in Stored Procedures",
        categoryId: "dbms-procedures-transactions",
        categoryName: "6. Stored Procedures & Transaction Control",
        difficulty: "Advanced",
        estimatedTime: "35 mins",
        gfgSearchQuery: "MySQL transactions SAVEPOINT ROLLBACK SQLEXCEPTION handler stored procedure",
        gfgUrl: "https://www.geeksforgeeks.org/sql-commit-rollback-and-savepoint/",
        quickSummary: "Implement a multi-step banking transfer inside a stored procedure with explicit transaction control and error handling.",
        keyPoints: [
          "Atomic encapsulation: BEGIN...COMMIT wraps multiple statements into one atomic transaction.",
          "Savepoint rollbacks: SAVEPOINT allows partial rollback to a marked state without undoing the entire transaction.",
          "Exception safety: SQLEXCEPTION handlers inside the procedure catch errors and trigger ROLLBACK to preserve consistency."
        ],
        diagramTitle: "Banking Transaction with Savepoint & Exception Handler",
        diagram: `  [ START TRANSACTION ]
              │
         Debit Sender Account
              │
         SAVEPOINT AfterDebit
              │
         Credit Receiver Account ──► Error Occurred!
              │                           │
              ├── No Error ──► COMMIT     └── Exception Handler ──► ROLLBACK TO AfterDebit`,
        complexities: [],
        tools: [
          { tool: "MySQL", purpose: "Transaction control", notes: "SAVEPOINT & SQLEXCEPTION handler" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (Transaction with Savepoint)",
            code: `DELIMITER //

CREATE PROCEDURE TransferWithSavepoint(
    IN from_acc INT,
    IN to_acc INT,
    IN amount DECIMAL(10,2)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Transaction Failed: Rolled Back' AS Status;
    END;

    START TRANSACTION;
        UPDATE BankAccounts SET balance = balance - amount WHERE acc_id = from_acc;
        SAVEPOINT after_debit;
        
        UPDATE BankAccounts SET balance = balance + amount WHERE acc_id = to_acc;
    COMMIT;
    SELECT 'Transaction Completed Successfully' AS Status;
END //

DELIMITER ;`
          }
        ],
        practiceProblems: [
          {
            title: "COMMIT, ROLLBACK and SAVEPOINT in SQL",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/sql-commit-rollback-and-savepoint/",
            platform: "GeeksforGeeks",
            topicTag: "Transactions"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 7: CAPSTONE DATABASE APPLICATION (0/1)
  // ========================================================
  {
    id: "dbms-capstone-application",
    name: "7. Capstone Database Application",
    shortDesc: "End-to-end relational schema, procedures, and reports for an online examination system.",
    iconName: "Sparkles",
    topics: [
      {
        id: "dbms-online-exam-system",
        slug: "online-examination-system-complete-dbms-application",
        title: "Exp 15: Design and Implementation of a Complete Database Application — Online Examination System",
        categoryId: "dbms-capstone-application",
        categoryName: "7. Capstone Database Application",
        difficulty: "Advanced",
        estimatedTime: "40 mins",
        gfgSearchQuery: "Online examination system database project schema queries procedures",
        gfgUrl: "https://www.geeksforgeeks.org/design-database-for-online-examination-system/",
        quickSummary: "Design and build an end-to-end database-backed application for conducting online examinations, integrating schema design, constraints, queries, and procedures learned earlier.",
        keyPoints: [
          "Comprehensive schema: A complete schema models students, exams, questions, submissions, and results with relational integrity.",
          "Unified logic: Application logic combines DML, joins, and stored procedures to conduct and score exams.",
          "End-to-end validation: The system is validated end-to-end from student registration through automated scorecard generation."
        ],
        diagramTitle: "Online Examination System Relational Schema",
        diagram: `  [ Students (PK: student_id) ] ──< Submits >──► [ ExamSubmissions ]
                                                        │
  [ Exams (PK: exam_id) ] ────────< Has >───────► [ Questions (PK: q_id) ]`,
        complexities: [],
        tools: [
          { tool: "MySQL (+ optional app layer)", purpose: "Capstone integration", notes: "Complete examination lifecycle application" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (Capstone Exam System)",
            code: `-- Complete Online Examination Schema
CREATE TABLE ExamMaster (
    exam_id INT PRIMARY KEY AUTO_INCREMENT,
    exam_title VARCHAR(100) NOT NULL,
    total_marks INT NOT NULL,
    pass_marks INT NOT NULL
);

CREATE TABLE ExamQuestions (
    question_id INT PRIMARY KEY AUTO_INCREMENT,
    exam_id INT,
    question_text TEXT NOT NULL,
    option_a VARCHAR(200), option_b VARCHAR(200),
    correct_option CHAR(1),
    FOREIGN KEY (exam_id) REFERENCES ExamMaster(exam_id)
);

CREATE TABLE StudentResults (
    result_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    exam_id INT,
    marks_scored INT,
    status VARCHAR(10),
    FOREIGN KEY (exam_id) REFERENCES ExamMaster(exam_id)
);

INSERT INTO ExamMaster (exam_title, total_marks, pass_marks) VALUES ('Database Systems Mid-Term', 100, 50);
INSERT INTO StudentResults (student_id, exam_id, marks_scored, status) VALUES (101, 1, 88, 'PASS');

SELECT r.student_id, e.exam_title, r.marks_scored, r.status
FROM StudentResults r
JOIN ExamMaster e ON r.exam_id = e.exam_id;`
          }
        ],
        practiceProblems: [
          {
            title: "Design Database for Online Examination System",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/design-database-for-online-examination-system/",
            platform: "GeeksforGeeks",
            topicTag: "Capstone Project"
          }
        ]
      }
    ]
  }
];
