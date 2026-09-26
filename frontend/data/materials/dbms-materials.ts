import { MaterialContent } from "./types";

export const DBMS_MATERIALS: Record<string, MaterialContent> = {
  "dbms-sql-guide": {
    id: "dbms-sql-guide",
    title: "SQL Complete Curriculum & Relational Query Handbook",
    subject: "Database Management Systems",
    provider: "W3Schools Reference",
    category: "SQL & Relational Databases",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/dbms-lab",
    simulatorName: "SQL Query Simulator",
    overview:
      "Structured Query Language (SQL) is the standardized declarative language for defining, querying, and managing relational databases. This W3Schools-curated laboratory handbook covers DDL (Data Definition Language), DML (Data Manipulation Language), Integrity Constraints, INNER/OUTER JOINs, GROUP BY aggregations, and subqueries.",
    learningObjectives: [
      "Master DDL commands: CREATE, ALTER, DROP, TRUNCATE with foreign key constraints",
      "Execute DML operations: INSERT, UPDATE, DELETE with transaction safeguards",
      "Formulate complex multi-table joins: INNER, LEFT, RIGHT, and FULL OUTER JOIN",
      "Apply aggregation functions (COUNT, SUM, AVG, MIN, MAX) with GROUP BY and HAVING filters",
      "Construct correlated subqueries and understand the EXISTS operator"
    ],
    keyConcepts: [
      {
        title: "1. Relational Integrity Constraints",
        description:
          "Rules enforced by the RDBMS engine to ensure data validity and referential consistency.",
        points: [
          "PRIMARY KEY: Uniquely identifies each record; enforces UNIQUE and NOT NULL.",
          "FOREIGN KEY: References a Primary Key in another table; enforces referential integrity.",
          "ON DELETE CASCADE: Automatically deletes child rows when the referenced parent row is deleted.",
          "CHECK constraint: Enforces domain rules (e.g. CHECK (salary > 0))."
        ]
      },
      {
        title: "2. The SQL JOIN Taxonomy",
        description:
          "Joins combine rows from two or more tables based on a related common column.",
        points: [
          "INNER JOIN: Returns only records that have matching values in both tables.",
          "LEFT (OUTER) JOIN: Returns all records from the left table and matched records from the right table (unmatched columns filled with NULL).",
          "RIGHT JOIN: Returns all records from the right table and matched records from the left table.",
          "FULL OUTER JOIN: Returns all records when there is a match in either left or right table."
        ]
      },
      {
        title: "3. WHERE vs HAVING Clause",
        description:
          "Crucial distinction between filtering individual rows versus filtering aggregated groups.",
        points: [
          "WHERE: Filters individual candidate rows BEFORE aggregation occurs (cannot use aggregate functions).",
          "HAVING: Filters grouped results AFTER GROUP BY aggregation is computed (e.g. HAVING COUNT(*) > 5)."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Schema Construction",
        description: "Create parent and child tables with PRIMARY KEY and FOREIGN KEY integrity constraints."
      },
      {
        step: 2,
        title: "Populate Data",
        description: "Execute parameterized INSERT statements with verified transaction commits."
      },
      {
        step: 3,
        title: "Execute Relational Queries",
        description: "Formulate multi-table JOINs, group rows by category, filter via HAVING, and order results."
      }
    ],
    codeSnippets: {
      sql: `-- 1. Schema DDL with Constraints
CREATE TABLE Departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100) NOT NULL,
    dept_id INT,
    salary DECIMAL(10, 2) CHECK (salary > 0),
    hire_date DATE,
    FOREIGN KEY (dept_id) REFERENCES Departments(dept_id) ON DELETE SET NULL
);

-- 2. Populate Sample Records
INSERT INTO Departments VALUES (1, 'Engineering'), (2, 'Research'), (3, 'Human Resources');
INSERT INTO Employees VALUES 
(101, 'Ada Lovelace', 1, 95000.00, '2022-01-15'),
(102, 'Alan Turing', 1, 98000.00, '2021-03-10'),
(103, 'Grace Hopper', 2, 92000.00, '2023-06-01'),
(104, 'John Backus', NULL, 80000.00, '2024-02-20');

-- 3. Multi-Table Aggregation Query with JOIN
SELECT 
    d.dept_name,
    COUNT(e.emp_id) AS total_employees,
    ROUND(AVG(e.salary), 2) AS avg_salary,
    MAX(e.salary) AS peak_salary
FROM Departments d
LEFT JOIN Employees e ON d.dept_id = e.dept_id
GROUP BY d.dept_name
HAVING COUNT(e.emp_id) > 0
ORDER BY avg_salary DESC;`
    },
    complexityAnalysis: {
      timeComplexity: "Hash Join: O(M + N); Nested Loop Join: O(M * N); Index Seek: O(log N) via B+ Tree",
      spaceComplexity: "O(N) disk pages and buffer pool cache frames in DBMS memory",
      bestCase: "O(log N) index seek with covering index",
      worstCase: "O(M * N) full table scan cartesian product",
      notes: "The SQL Query Optimizer parses declarative SQL into relational algebra and evaluates multiple cost-based execution plans."
    },
    vivaQuestions: [
      {
        question: "Explain the difference between TRUNCATE, DROP, and DELETE in SQL.",
        answer: "DELETE is a DML command that removes specified rows using a WHERE clause, logs each row deletion (can be rolled back), and fires triggers. TRUNCATE is a DDL command that deallocates all pages in the table in one operation, is faster, cannot use WHERE, and resets auto-increment counters. DROP is a DDL command that completely deletes the table structure, data, and schema from the database."
      },
      {
        question: "What is the difference between a clustered index and a non-clustered index?",
        answer: "A Clustered Index alters the physical storage order of rows on disk to match the index order (hence only one clustered index per table, typically the Primary Key). A Non-Clustered Index stores a separate B+ tree containing pointers (row locators) back to the actual data pages."
      }
    ],
    realWorldApplications: [
      "Core banking transaction recording with ACID guarantees",
      "E-commerce inventory and order tracking systems (Shopify, Amazon)",
      "Hospital electronic health record (EHR) patient history storage"
    ],
    practiceProblems: [
      {
        title: "Second Highest Salary Query",
        difficulty: "Medium",
        description: "Write a SQL query using subqueries or DENSE_RANK() to find the second highest salary from an Employee table without using LIMIT 1, 1."
      }
    ]
  },

  "dbms-normalization-gfg": {
    id: "dbms-normalization-gfg",
    title: "DBMS Comprehensive Guide — ER Models & Normalization",
    subject: "Database Management Systems",
    provider: "GeeksforGeeks Reference",
    category: "Relational Theory & Normalization",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/dbms-lab",
    simulatorName: "SQL Query Simulator",
    overview:
      "Database Normalization is the systematic technique of organizing relational database tables to eliminate data redundancy and prevent update, insertion, and deletion anomalies. This GeeksforGeeks reference details Functional Dependencies, 1NF, 2NF, 3NF, Boyce-Codd Normal Form (BCNF), and the ACID properties of database transactions.",
    learningObjectives: [
      "Identify the 3 database anomalies: Insertion, Deletion, and Modification anomalies",
      "Formulate Functional Dependencies (FDs) and compute attribute closures X+",
      "Normalize schemas from Unnormalized Form through 1NF, 2NF, 3NF, and BCNF",
      "Verify Dependency Preservation and Lossless Join Decomposition",
      "Explain the ACID properties (Atomicity, Consistency, Isolation, Durability)"
    ],
    keyConcepts: [
      {
        title: "1. The Normal Forms Hierarchy",
        description:
          "Progressive mathematical constraints applied to table relations.",
        points: [
          "1NF (First Normal Form): Every column contains atomic (indivisible) values; no repeating groups or multivalued attributes.",
          "2NF (Second Normal Form): Table is in 1NF AND every non-prime attribute is fully functionally dependent on the entire primary key (No Partial Dependency on candidate keys).",
          "3NF (Third Normal Form): Table is in 2NF AND no non-prime attribute is transitively dependent on the primary key (No Transitive Dependency: X -> Y -> Z).",
          "BCNF (Boyce-Codd Normal Form): For every non-trivial functional dependency X -> Y, the determinant X must be a Super Key."
        ]
      },
      {
        title: "2. The ACID Transaction Properties",
        description:
          "Guarantees that database transactions are processed reliably.",
        points: [
          "Atomicity: 'All or nothing' — either all transaction operations commit or the entire transaction is rolled back (Write-Ahead Logging).",
          "Consistency: The database transitions from one valid state to another valid state, preserving all integrity constraints.",
          "Isolation: Concurrent transactions execute as if they were running serially without interfering with each other (Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable).",
          "Durability: Once a transaction commits, its updates survive any subsequent system crash or power outage."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Identify Functional Dependencies",
        description: "List all business logic FDs across attributes and calculate candidate keys using attribute closures."
      },
      {
        step: 2,
        title: "Detect Violations",
        description: "Check for partial dependencies (violates 2NF) and transitive dependencies (violates 3NF)."
      },
      {
        step: 3,
        title: "Lossless Decomposition",
        description: "Decompose table R into R1 and R2 such that R1 intersect R2 -> R1 or R1 intersect R2 -> R2 (guaranteeing lossless join)."
      }
    ],
    codeSnippets: {
      sql: `-- Example of Decomposition to 3NF
-- Original Unnormalized: StudentCourse(student_id, student_name, course_id, course_name, instructor_id, instructor_name)

-- Decomposed to 3NF:
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL
);

CREATE TABLE Instructors (
    instructor_id INT PRIMARY KEY,
    instructor_name VARCHAR(100) NOT NULL
);

CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    instructor_id INT,
    FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id)
);

CREATE TABLE Enrollments (
    student_id INT,
    course_id INT,
    grade CHAR(2),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);`
    },
    complexityAnalysis: {
      timeComplexity: "O(2^N) candidate key derivation in worst case; O(N^2) for attribute closure computation",
      spaceComplexity: "O(N) functional dependency set representation",
      bestCase: "O(N) for linear single-key checks",
      worstCase: "O(2^N) exponential when checking all attribute subsets",
      notes: "3NF always guarantees dependency preservation and lossless join; BCNF may sometimes sacrifice dependency preservation."
    },
    vivaQuestions: [
      {
        question: "What is the difference between 3NF and BCNF?",
        answer: "3NF permits a dependency X -> Y if X is a super key OR Y is a prime attribute (part of a candidate key). BCNF is stricter and removes this exception: X must ALWAYS be a super key for any non-trivial FD X -> Y."
      },
      {
        question: "What is a Lossless Join Decomposition?",
        answer: "A decomposition of relation R into R1 and R2 is lossless if joining R1 and R2 using a natural join reconstructs the exact original relation R without generating any extraneous or spurious tuples (R1 ⨝ R2 = R)."
      }
    ],
    realWorldApplications: [
      "Relational schema modeling for enterprise ERP systems (SAP, Oracle)",
      "Credit card transactional audit logging requiring strict Serializability",
      "Hotel reservation and flight seat booking engines"
    ],
    practiceProblems: [
      {
        title: "Attribute Closure & Candidate Key Finding",
        difficulty: "Medium",
        description: "Given R(A, B, C, D, E) and FDs {A -> BC, CD -> E, B -> D, E -> A}, find the attribute closure (A)+ and determine all candidate keys."
      }
    ]
  },

  "dbms-w3schools-sql": {
    id: "dbms-w3schools-sql",
    title: "SQL Joins, Aggregations & Subqueries Guide",
    subject: "Database Management Systems",
    provider: "W3Schools Reference",
    category: "SQL Queries & Aggregations",
    readTime: "20 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/dbms-lab",
    simulatorName: "SQL Query Simulator",
    overview:
      "A hands-on, practical W3Schools-curated laboratory guide to intermediate SQL querying techniques. Master multi-table joins, self joins, grouping with aggregations, window ranking functions (ROW_NUMBER, DENSE_RANK), and nested correlated subqueries.",
    learningObjectives: [
      "Execute multi-table INNER and OUTER JOIN operations with multiple join conditions",
      "Construct Self-Joins to model hierarchical organizational employee-manager relationships",
      "Apply window ranking functions: ROW_NUMBER(), RANK(), and DENSE_RANK()",
      "Implement correlated subqueries with the EXISTS and NOT EXISTS operators",
      "Create and query database VIEWs for simplified data access abstraction"
    ],
    keyConcepts: [
      {
        title: "1. Self-Joins for Hierarchical Data",
        description:
          "Joining a table to itself using distinct aliases to query parent-child relationships within the same relation.",
        points: [
          "Example: Employee table where each employee has a manager_id referencing another employee's emp_id.",
          "Syntax: SELECT e.name, m.name AS manager FROM Employee e LEFT JOIN Employee m ON e.manager_id = m.emp_id."
        ]
      },
      {
        title: "2. Window Ranking Functions",
        description:
          "Compute rankings over partitions of rows without collapsing rows like GROUP BY.",
        points: [
          "ROW_NUMBER(): Assigns unique sequential integers 1, 2, 3... to rows.",
          "RANK(): Assigns identical rank to ties, but skips subsequent rank numbers (e.g. 1, 2, 2, 4).",
          "DENSE_RANK(): Assigns identical rank to ties without skipping subsequent numbers (e.g. 1, 2, 2, 3)."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Partition & Order",
        description: "Specify OVER (PARTITION BY category ORDER BY score DESC) to define window bounds."
      },
      {
        step: 2,
        title: "Apply Rank Function",
        description: "Compute rank values per row within its respective partition."
      }
    ],
    codeSnippets: {
      sql: `-- Window Functions & Self-Join Example
SELECT 
    emp_name,
    dept_id,
    salary,
    DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as salary_rank_in_dept
FROM Employees;

-- View Creation for Reporting
CREATE VIEW HighEarnersView AS
SELECT emp_name, salary, dept_name
FROM Employees e
JOIN Departments d ON e.dept_id = d.dept_id
WHERE salary > 90000.00;

SELECT * FROM HighEarnersView;`
    },
    complexityAnalysis: {
      timeComplexity: "O(N log N) sorting step per partition in window functions",
      spaceComplexity: "O(N) memory window frame buffer",
      bestCase: "O(N)",
      worstCase: "O(N log N)",
      notes: "Views can be indexed (Materialized Views) to cache precomputed query results physically on disk."
    },
    vivaQuestions: [
      {
        question: "What is the difference between RANK() and DENSE_RANK()?",
        answer: "If two employees tie for rank 1, both receive rank 1. Under RANK(), the next employee receives rank 3 (gap). Under DENSE_RANK(), the next employee receives rank 2 (no gaps)."
      }
    ],
    realWorldApplications: [
      "Leaderboards and ranking in gaming platforms",
      "Top-performing salesperson per geographic region reporting"
    ],
    practiceProblems: [
      {
        title: "Department Top 3 Earners",
        difficulty: "Medium",
        description: "Write a SQL query using DENSE_RANK() to find the top 3 highest-paid employees in each department."
      }
    ]
  }
};
