import { Experiment } from "../experiments";

export const DBMS_EXPERIMENTS: Experiment[] = [
  {
    id: "dbms-exp-1",
    labId: "dbms-lab",
    title: "Exp 1: DDL & Schema Management: Creating, altering, truncating, and dropping relational schemas and tables with integrity constraints (Primary Key, Foreign Key, Check, Unique).",
    slug: "ddl-schema-management-integrity-constraints",
    difficulty: "Beginner",
    category: "Databases" as any,
    estimatedMinutes: 25,
    rating: 4.92,
    ratingsCount: 130,
    simulator: "custom",
    quizId: "quiz-dbms-1",
    sections: {
      introduction: "Data Definition Language (DDL) commands (CREATE, ALTER, DROP, TRUNCATE) define and modify relational database catalog schemas and integrity constraints.",
      objective: "Create normalized database tables enforcing PRIMARY KEY, FOREIGN KEY ON DELETE CASCADE, CHECK, and UNIQUE constraints.",
      videoUrl: "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
      videoTitle: "SQL DDL & Constraints Tutorial",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Relational Model", "Entity Integrity"],
      theory: {
        overview: "Relational integrity constraints guarantee data accuracy and referential consistency across tables. Primary keys enforce entity integrity (unique, non-null). Foreign keys enforce referential integrity between parent and child tables.",
        keyConcepts: [
          { title: "PRIMARY KEY Constraint", desc: "Unique identifier for each record tuple; automatically creates clustered index." },
          { title: "FOREIGN KEY ON DELETE CASCADE", desc: "Automatically deletes child tuples when the corresponding parent tuple is deleted." },
          { title: "CHECK Constraint", desc: "Validates attribute domains (e.g. gpa >= 0.0 AND gpa <= 4.0)." }
        ],
        complexities: [
          { operation: "CREATE / ALTER TABLE", best: "O(1)", avg: "O(catalog_metadata)", worst: "O(table_rewrite)", space: "O(metadata)" }
        ],
        realWorldApplications: [
          "Enterprise schema migration scripts (Flyway / Liquibase)",
          "E-commerce relational order management schemas",
          "Banking core customer account and ledger database tables"
        ]
      },
      procedure: [
        "1. Write CREATE TABLE statements for Departments and Students.",
        "2. Add PRIMARY KEY, FOREIGN KEY, and CHECK constraints.",
        "3. ALTER TABLE to add new column.",
        "4. Verify schema structure with DESCRIBE / \\d+."
      ],
      sampleCode: {
        language: "sql",
        code: `-- 1. Create Parent Table
CREATE TABLE Departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Create Child Table with Constraints
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    dept_id INT,
    gpa DECIMAL(3, 2) CHECK (gpa >= 0.0 AND gpa <= 4.0),
    FOREIGN KEY (dept_id) REFERENCES Departments(dept_id) ON DELETE CASCADE
);

-- 3. Modify Schema
ALTER TABLE Students ADD enrollment_date DATE DEFAULT (CURRENT_DATE);`
      },
      expectedOutput: `Query OK, 0 rows affected (0.02 sec)
Query OK, 0 rows affected (0.03 sec)
Query OK, 0 rows affected (0.01 sec)`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA", "M.Tech Data Science"]
      }
    }
  },
  {
    id: "dbms-exp-2",
    labId: "dbms-lab",
    title: "Exp 2: DML & Query Operations: Basic INSERT, UPDATE, DELETE, and complex retrieval using SELECT with WHERE, ORDER BY, and GROUP BY.",
    slug: "dml-and-query-operations-select-group-by",
    difficulty: "Beginner",
    category: "Databases" as any,
    estimatedMinutes: 25,
    rating: 4.90,
    ratingsCount: 125,
    simulator: "custom",
    quizId: "quiz-dbms-2",
    sections: {
      introduction: "Data Manipulation Language (DML) commands (INSERT, UPDATE, DELETE) modify table tuples, queried via SQL SELECT statements with filtering, sorting, and grouping.",
      objective: "Execute batch tuple insertions, conditional updates, and aggregate queries using WHERE, GROUP BY, HAVING, and ORDER BY.",
      videoUrl: "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
      videoTitle: "SQL DML Queries & Aggregations",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["DDL Schemas", "Relational Algebra"],
      theory: {
        overview: "SQL query execution pipeline order: FROM / JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT. WHERE filters individual rows before grouping; HAVING filters aggregated groups.",
        keyConcepts: [
          { title: "WHERE vs HAVING", desc: "WHERE filters rows before grouping; HAVING filters aggregated grouped rows." },
          { title: "ORDER BY Sorting", desc: "Sorts final query result set in ASC or DESC sequence." },
          { title: "Aggregate Functions", desc: "COUNT(), SUM(), AVG(), MIN(), MAX() summarize grouped rows." }
        ],
        complexities: [
          { operation: "Indexed SELECT Filter", best: "O(log n)", avg: "O(log n)", worst: "O(n) Table Scan", space: "O(result_rows)" },
          { operation: "GROUP BY Aggregation", best: "O(n)", avg: "O(n log k)", worst: "O(n log n)", space: "O(k)" }
        ],
        realWorldApplications: [
          "Sales analytics business intelligence dashboard queries",
          "Customer order history filtering and pagination",
          "Inventory replenishment automated alert queries"
        ]
      },
      procedure: [
        "1. INSERT student records.",
        "2. UPDATE student GPA records.",
        "3. Execute GROUP BY query aggregating student count and average GPA per department.",
        "4. Output query results."
      ],
      sampleCode: {
        language: "sql",
        code: `INSERT INTO Students (student_id, name, email, dept_id, gpa) VALUES
(101, 'Alice Johnson', 'alice@vsb.edu', 1, 3.85),
(102, 'Bob Smith', 'bob@vsb.edu', 1, 3.40),
(103, 'Charlie Brown', 'charlie@vsb.edu', 2, 3.92);

SELECT 
    dept_id,
    COUNT(student_id) AS total_students,
    AVG(gpa) AS avg_gpa
FROM Students
WHERE gpa >= 3.0
GROUP BY dept_id
HAVING COUNT(student_id) >= 1
ORDER BY avg_gpa DESC;`
      },
      expectedOutput: `+---------+----------------+---------+
| dept_id | total_students | avg_gpa |
+---------+----------------+---------+
|       2 |              1 |    3.92 |
|       1 |              2 |    3.62 |
+---------+----------------+---------+`,
      leetcodeProblems: [
        {
          id: 20,
          title: "Recyclable and Low Fat Products (LeetCode #1757)",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/recyclable-and-low-fat-products/",
          description: "Write an SQL query to find the ids of products that are both low fat and recyclable.",
          approach: "SELECT product_id FROM Products WHERE low_fats = 'Y' AND recyclable = 'Y';",
          javaSnippet: `-- SQL Query`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dbms-exp-3",
    labId: "dbms-lab",
    title: "Exp 3: Set Operations & Aggregate Functions: Execution of UNION, INTERSECT, MINUS, alongside COUNT, SUM, AVG, MIN, MAX.",
    slug: "set-operations-and-aggregate-functions",
    difficulty: "Beginner",
    category: "Databases" as any,
    estimatedMinutes: 25,
    rating: 4.91,
    ratingsCount: 118,
    simulator: "custom",
    quizId: "quiz-dbms-3",
    sections: {
      introduction: "Relational set operators combine tuples from multiple queries based on set theory principles (UNION, INTERSECT, EXCEPT/MINUS).",
      objective: "Execute UNION, UNION ALL, INTERSECT, and EXCEPT queries with statistical aggregate calculations.",
      videoUrl: "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
      videoTitle: "SQL Set Operators Tutorial",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Basic SQL", "Set Theory"],
      theory: {
        overview: "UNION combines distinct tuples from both queries (removes duplicates). UNION ALL keeps duplicates. INTERSECT returns common tuples. MINUS/EXCEPT returns tuples in query 1 not present in query 2.",
        keyConcepts: [
          { title: "Union Compatibility", desc: "Both queries must select identical number of columns with matching data types." },
          { title: "UNION vs UNION ALL", desc: "UNION executes sort/hash deduplication; UNION ALL appends streams directly." }
        ],
        complexities: [
          { operation: "UNION (Hash Deduplication)", best: "O(n + m)", avg: "O(n + m)", worst: "O((n+m) log(n+m))", space: "O(n + m)" }
        ],
        realWorldApplications: [
          "Consolidating customer contacts across multiple legacy company databases",
          "Finding students enrolled in multiple academic majors",
          "Auditing registered accounts that have never performed a transaction"
        ]
      },
      procedure: [
        "1. Write UNION query combining active and archived student records.",
        "2. Write INTERSECT query finding multi-course enrollments.",
        "3. Output query result sets."
      ],
      sampleCode: {
        language: "sql",
        code: `-- UNION: Combine Student and Faculty directory names
SELECT name, 'Student' AS role FROM Students
UNION
SELECT 'Dr. Aris Thorne', 'Faculty' AS role;

-- INTERSECT: Students enrolled in both Lab 1 and Lab 2
SELECT student_id FROM CourseEnrollment WHERE course_id = 'AD8481'
INTERSECT
SELECT student_id FROM CourseEnrollment WHERE course_id = 'AD8381';`
      },
      expectedOutput: `+-----------------+---------+
| name            | role    |
+-----------------+---------+
| Alice Johnson   | Student |
| Bob Smith       | Student |
| Dr. Aris Thorne | Faculty |
+-----------------+---------+`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dbms-exp-4",
    labId: "dbms-lab",
    title: "Exp 4: Complex Joins & Nested Subqueries: Implementation of Inner, Left, Right, Full Outer Joins, and Correlated Subqueries.",
    slug: "complex-joins-and-nested-subqueries",
    difficulty: "Intermediate",
    category: "Databases" as any,
    estimatedMinutes: 30,
    rating: 4.94,
    ratingsCount: 140,
    simulator: "custom",
    quizId: "quiz-dbms-4",
    sections: {
      introduction: "Relational Joins combine columns from multiple tables using equality predicates, extended by Correlated Subqueries that evaluate dynamically for each outer tuple.",
      objective: "Master INNER JOIN, LEFT OUTER JOIN, RIGHT OUTER JOIN, and Correlated Subqueries.",
      videoUrl: "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
      videoTitle: "SQL Joins & Subqueries Masterclass",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Foreign Keys", "SELECT Queries"],
      theory: {
        overview: "INNER JOIN returns rows with matching keys in both tables. LEFT JOIN preserves all left table rows, populating missing right table columns with NULL. Correlated Subquery references columns from the outer query block.",
        keyConcepts: [
          { title: "INNER vs LEFT JOIN", desc: "INNER requires match on both sides; LEFT preserves all left records." },
          { title: "Correlated Subquery", desc: "Re-evaluates inner query for every outer tuple row." },
          { title: "Hash Join / Merge Join", desc: "RDBMS query optimizer physical join execution algorithms." }
        ],
        complexities: [
          { operation: "Hash Join", best: "O(n + m)", avg: "O(n + m)", worst: "O(n * m)", space: "O(min(n, m))" }
        ],
        realWorldApplications: [
          "Customer order invoice generation joining Customer, Order, and Item tables",
          "Finding employees earning more than their department average salary",
          "Generating comprehensive student transcript reports with course titles"
        ]
      },
      procedure: [
        "1. Write multi-table INNER JOIN query.",
        "2. Write LEFT JOIN preserving students without course enrollments.",
        "3. Write correlated subquery finding top student per department.",
        "4. Print results."
      ],
      sampleCode: {
        language: "sql",
        code: `-- Multi-Table Join
SELECT 
    s.student_id,
    s.name AS student_name,
    d.dept_name,
    s.gpa
FROM Students s
INNER JOIN Departments d ON s.dept_id = d.dept_id;

-- Correlated Subquery: Above-Average Department Students
SELECT s.student_id, s.name, s.dept_id, s.gpa
FROM Students s
WHERE s.gpa > (
    SELECT AVG(s2.gpa)
    FROM Students s2
    WHERE s2.dept_id = s.dept_id
);`
      },
      expectedOutput: `+------------+---------------+----------------------+------+
| student_id | student_name  | dept_name            | gpa  |
+------------+---------------+----------------------+------+
|        101 | Alice Johnson | AI & Data Science    | 3.85 |
|        102 | Bob Smith     | AI & Data Science    | 3.40 |
|        103 | Charlie Brown | Computer Engineering | 3.92 |
+------------+---------------+----------------------+------+`,
      leetcodeProblems: [
        {
          id: 21,
          title: "Department Highest Salary (LeetCode #184)",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/department-highest-salary/",
          description: "Find employees who have the highest salary in each department.",
          approach: "JOIN with subquery finding MAX(salary) grouped by departmentId.",
          javaSnippet: `-- Solution`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dbms-exp-5",
    labId: "dbms-lab",
    title: "Exp 5: Database Views & Indexing: Creation of simple/updatable views, unique indices, and B-Tree indexes for query performance optimization.",
    slug: "database-views-and-indexing-optimization",
    difficulty: "Intermediate",
    category: "Databases" as any,
    estimatedMinutes: 25,
    rating: 4.92,
    ratingsCount: 125,
    simulator: "custom",
    quizId: "quiz-dbms-5",
    sections: {
      introduction: "Database Views provide virtual query abstraction and data masking, while B-Tree Indices accelerate query lookup times from O(n) table scans to O(log n) tree seeks.",
      objective: "Create virtual views for security abstraction, build B-Tree and Composite indices, and analyze query execution plans with EXPLAIN.",
      videoUrl: "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
      videoTitle: "Database Indexing & Query Plans",
      videoChannel: "Hussein Nasser",
      prerequisites: ["SELECT Queries", "B-Tree Concepts"],
      theory: {
        overview: "A View is a stored virtual query. A B-Tree index creates a sorted balanced tree over indexed columns, drastically reducing disk block reads during WHERE filters. EXPLAIN ANALYZE inspects index scan usage.",
        keyConcepts: [
          { title: "CREATE VIEW", desc: "Masks sensitive columns and simplifies complex multi-table joins." },
          { title: "B-Tree Index Seek", desc: "Reduces search latency from O(n) to O(log n)." },
          { title: "EXPLAIN Plan", desc: "Shows query execution steps: Index Scan vs Seq Scan." }
        ],
        complexities: [
          { operation: "B-Tree Index Lookup", best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(index_size)" }
        ],
        realWorldApplications: [
          "Masking customer SSN / credit card numbers via security views",
          "Accelerating million-row e-commerce product search queries",
          "Optimizing database query performance in production APIs"
        ]
      },
      procedure: [
        "1. Create view V_HonorStudents filtering GPA >= 3.75.",
        "2. Create index idx_student_dept_gpa ON Students(dept_id, gpa DESC).",
        "3. Run EXPLAIN SELECT query and verify index seek.",
        "4. Print results."
      ],
      sampleCode: {
        language: "sql",
        code: `-- 1. Create Virtual View
CREATE VIEW V_HonorStudents AS
SELECT student_id, name, dept_id, gpa
FROM Students
WHERE gpa >= 3.75;

-- 2. Create Composite B-Tree Index
CREATE INDEX idx_student_dept_gpa ON Students(dept_id, gpa DESC);

-- 3. Query View and Analyze Execution Plan
EXPLAIN SELECT * FROM V_HonorStudents WHERE dept_id = 1;`
      },
      expectedOutput: `+-----------------------------------------------------------------------------------+
| QUERY PLAN                                                                        |
+-----------------------------------------------------------------------------------+
| Index Scan using idx_student_dept_gpa on students (cost=0.15..8.17 rows=2)       |
|   Index Cond: ((dept_id = 1) AND (gpa >= 3.75))                                  |
+-----------------------------------------------------------------------------------+`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dbms-exp-6",
    labId: "dbms-lab",
    title: "Exp 6: PL/SQL Fundamentals: Conditional blocks, iterative control loops, and cursor processing (IMPLICIT and EXPLICIT cursors).",
    slug: "plsql-fundamentals-loops-cursors",
    difficulty: "Intermediate",
    category: "Databases" as any,
    estimatedMinutes: 30,
    rating: 4.93,
    ratingsCount: 130,
    simulator: "custom",
    quizId: "quiz-dbms-6",
    sections: {
      introduction: "Procedural Language for SQL (PL/SQL) combines SQL data manipulation with procedural control structures (IF-THEN, LOOPS, CURSORS) executed within the database engine.",
      objective: "Write PL/SQL anonymous blocks with Explicit Cursors (DECLARE, OPEN, FETCH, %NOTFOUND, CLOSE) to process multi-row query results sequentially.",
      videoUrl: "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
      videoTitle: "PL/SQL Cursors Tutorial",
      videoChannel: "ProgrammingKnowledge",
      prerequisites: ["SQL DML", "Procedural Programming"],
      theory: {
        overview: "PL/SQL blocks consist of DECLARE, BEGIN, EXCEPTION, and END. A Cursor is a pointer to the database context area. Explicit cursors provide fine-grained control over multi-row queries using %FOUND, %NOTFOUND, and %ROWCOUNT.",
        keyConcepts: [
          { title: "Anonymous Block Structure", desc: "DECLARE variables -> BEGIN procedural logic -> END." },
          { title: "Explicit Cursor Lifecycle", desc: "DECLARE cursor -> OPEN -> LOOP FETCH INTO -> EXIT WHEN %NOTFOUND -> CLOSE." },
          { title: "%ROWCOUNT Attribute", desc: "Tracks the cumulative number of tuples fetched so far." }
        ],
        complexities: [
          { operation: "Cursor Row Fetch", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(row_buffer)" }
        ],
        realWorldApplications: [
          "Batch banking end-of-day account interest calculation scripts",
          "Automated monthly customer billing invoice generation",
          "Data warehouse nightly ETL cursor batch pipelines"
        ]
      },
      procedure: [
        "1. Declare explicit cursor c_students SELECT student_id, name, gpa.",
        "2. OPEN cursor.",
        "3. Loop to FETCH into local variables.",
        "4. Output formatted student records via DBMS_OUTPUT.PUT_LINE.",
        "5. CLOSE cursor."
      ],
      sampleCode: {
        language: "sql",
        code: `DECLARE
    v_id   Students.student_id%TYPE;
    v_name Students.name%TYPE;
    v_gpa  Students.gpa%TYPE;

    CURSOR c_students IS
        SELECT student_id, name, gpa FROM Students WHERE gpa >= 3.5 ORDER BY gpa DESC;
BEGIN
    OPEN c_students;
    LOOP
        FETCH c_students INTO v_id, v_name, v_gpa;
        EXIT WHEN c_students%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('Honor Roll: [' || v_id || '] ' || v_name || ' -> GPA: ' || v_gpa);
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('Total Processed: ' || c_students%ROWCOUNT);
    CLOSE c_students;
END;
/`
      },
      expectedOutput: `Honor Roll: [103] Charlie Brown -> GPA: 3.92
Honor Roll: [101] Alice Johnson -> GPA: 3.85
Total Processed: 2`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dbms-exp-7",
    labId: "dbms-lab",
    title: "Exp 7: Procedures & Functions: Writing parameterized stored procedures and user-defined functions with input/output modes.",
    slug: "stored-procedures-and-functions-plsql",
    difficulty: "Intermediate",
    category: "Databases" as any,
    estimatedMinutes: 30,
    rating: 4.94,
    ratingsCount: 135,
    simulator: "custom",
    quizId: "quiz-dbms-7",
    sections: {
      introduction: "Stored Procedures and Functions are pre-compiled database routines that encapsulate business logic, improve performance, and reduce client-server network roundtrips.",
      objective: "Create reusable Stored Functions returning scalar computed values and Stored Procedures using IN, OUT, and IN OUT parameter modes.",
      videoUrl: "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
      videoTitle: "Stored Procedures & Functions in SQL",
      videoChannel: "ProgrammingKnowledge",
      prerequisites: ["PL/SQL Basics", "Database Schema"],
      theory: {
        overview: "A Function always returns a single scalar value and can be embedded in SELECT statements. A Procedure performs actions and returns values via OUT parameters. Pre-compilation eliminates parsing overhead.",
        keyConcepts: [
          { title: "Stored Function", desc: "Deterministic computation returning a single scalar value." },
          { title: "Stored Procedure IN/OUT Modes", desc: "IN (pass by value), OUT (returns value to caller), IN OUT (bidirectional)." },
          { title: "Pre-Compiled Execution", desc: "Stored in database data dictionary in compiled byte-code format." }
        ],
        complexities: [
          { operation: "Procedure Invocation", best: "O(1)", avg: "O(query_cost)", worst: "O(query_cost)", space: "O(stack)" }
        ],
        realWorldApplications: [
          "Financial transaction ledger validation rules",
          "Automated monthly payroll tax bracket computations",
          "Inventory stock decrement and re-order triggers"
        ]
      },
      procedure: [
        "1. Write CREATE OR REPLACE FUNCTION fn_GetGrade(p_gpa IN NUMBER) RETURN VARCHAR2.",
        "2. Write CREATE OR REPLACE PROCEDURE sp_GetDeptStats(dept_id, OUT total, OUT avg_gpa).",
        "3. Invoke procedure and function in PL/SQL block and print results."
      ],
      sampleCode: {
        language: "sql",
        code: `-- 1. Stored Function
CREATE OR REPLACE FUNCTION fn_GetGrade(p_gpa IN NUMBER) 
RETURN VARCHAR2 IS
BEGIN
    IF p_gpa >= 3.75 THEN RETURN 'O';
    ELSIF p_gpa >= 3.50 THEN RETURN 'A+';
    ELSIF p_gpa >= 3.00 THEN RETURN 'A';
    ELSE RETURN 'B';
    END IF;
END fn_GetGrade;
/

-- 2. Stored Procedure with OUT parameter
CREATE OR REPLACE PROCEDURE sp_GetDeptCount(p_dept_id IN NUMBER, p_total OUT NUMBER) IS
BEGIN
    SELECT COUNT(*) INTO p_total FROM Students WHERE dept_id = p_dept_id;
END sp_GetDeptCount;
/`
      },
      expectedOutput: `Function FN_GETGRADE compiled.
Procedure SP_GETDEPTCOUNT compiled.`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dbms-exp-8",
    labId: "dbms-lab",
    title: "Exp 8: Database Triggers: Design of BEFORE and AFTER row/statement-level triggers for audit logging and constraint verification.",
    slug: "database-triggers-audit-logging",
    difficulty: "Intermediate",
    category: "Databases" as any,
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 140,
    simulator: "custom",
    quizId: "quiz-dbms-8",
    sections: {
      introduction: "Database Triggers are stored programs automatically fired by the database engine in response to DML events (INSERT, UPDATE, DELETE) on specific tables.",
      objective: "Design BEFORE UPDATE validation triggers and AFTER UPDATE row-level audit logging triggers utilizing :OLD and :NEW pseudo-records.",
      videoUrl: "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
      videoTitle: "SQL Database Triggers Tutorial",
      videoChannel: "ProgrammingKnowledge",
      prerequisites: ["PL/SQL", "DML Events"],
      theory: {
        overview: "BEFORE triggers inspect or sanitize :NEW values prior to writing to disk. AFTER triggers record historical audit trails into log tables with timestamps, user session details, and previous :OLD values.",
        keyConcepts: [
          { title: "Row-Level Trigger (FOR EACH ROW)", desc: "Fires once for every individual row modified by DML statement." },
          { title: ":OLD and :NEW Pseudo-Records", desc: ":OLD holds pre-update values; :NEW holds proposed post-update values." },
          { title: "Automated Audit Trail", desc: "Enforces non-repudiation and security compliance logging." }
        ],
        complexities: [
          { operation: "Trigger Execution Overhead", best: "O(1)", avg: "O(1)", worst: "O(audit_insert)", space: "O(row_log)" }
        ],
        realWorldApplications: [
          "Financial banking regulatory audit logging of account balance modifications",
          "Automated updated_at timestamp updating",
          "Preventing unauthorized salary reductions via BEFORE UPDATE checks"
        ]
      },
      procedure: [
        "1. Create Student_Audit table.",
        "2. Create AFTER UPDATE OF gpa ON Students FOR EACH ROW trigger.",
        "3. Update student GPA and verify audit record generation in Student_Audit.",
        "4. Print audit log."
      ],
      sampleCode: {
        language: "sql",
        code: `CREATE TABLE Student_Audit (
    audit_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id INT,
    old_gpa NUMBER(3,2),
    new_gpa NUMBER(3,2),
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE TRIGGER trg_StudentGpaAudit
AFTER UPDATE OF gpa ON Students
FOR EACH ROW
BEGIN
    INSERT INTO Student_Audit (student_id, old_gpa, new_gpa)
    VALUES (:OLD.student_id, :OLD.gpa, :NEW.gpa);
END;
/

-- Trigger Execution Test
UPDATE Students SET gpa = 3.98 WHERE student_id = 101;
SELECT * FROM Student_Audit;`
      },
      expectedOutput: `Trigger TRG_STUDENTGPAAUDIT compiled.
1 row updated.
+----------+------------+---------+---------+----------------------------+
| audit_id | student_id | old_gpa | new_gpa | modified_at                |
+----------+------------+---------+---------+----------------------------+
|        1 |        101 |    3.85 |    3.98 | 2026-09-02 21:00:15.123456 |
+----------+------------+---------+---------+----------------------------+`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dbms-exp-9",
    labId: "dbms-lab",
    title: "Exp 9: Exception Handling in PL/SQL: User-defined exceptions and pre-defined error interceptors.",
    slug: "exception-handling-in-plsql",
    difficulty: "Intermediate",
    category: "Databases" as any,
    estimatedMinutes: 25,
    rating: 4.90,
    ratingsCount: 115,
    simulator: "custom",
    quizId: "quiz-dbms-9",
    sections: {
      introduction: "PL/SQL exception handling traps runtime database errors using predefined system handlers (NO_DATA_FOUND, TOO_MANY_ROWS) and custom user-defined business exceptions via RAISE.",
      objective: "Implement structured EXCEPTION blocks with WHEN NO_DATA_FOUND, WHEN OTHERS, and custom user-defined exceptions.",
      videoUrl: "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
      videoTitle: "PL/SQL Exception Handling",
      videoChannel: "ProgrammingKnowledge",
      prerequisites: ["PL/SQL Blocks", "SQL Error Codes"],
      theory: {
        overview: "When a runtime error occurs, execution immediately jumps to the EXCEPTION section. RAISE_APPLICATION_ERROR(-20001, 'Custom Error') allows raising custom error codes in the user-definable range [-20999, -20000].",
        keyConcepts: [
          { title: "Predefined Exceptions", desc: "NO_DATA_FOUND (ORA-01403), TOO_MANY_ROWS (ORA-01422), ZERO_DIVIDE." },
          { title: "User-Defined Exception", desc: "Declared as EXCEPTION type and explicitly triggered using RAISE statement." },
          { title: "SQLERRM & SQLCODE", desc: "Built-in functions retrieving the exact error message and numeric code." }
        ],
        complexities: [
          { operation: "Exception Trap & Handle", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Graceful database error handling in API backends",
          "Enforcing custom business rules and validation errors",
          "Logging database errors without crashing transaction batches"
        ]
      },
      procedure: [
        "1. Declare ex_invalid_gpa EXCEPTION.",
        "2. Check validation condition and execute RAISE ex_invalid_gpa if violated.",
        "3. Write EXCEPTION block catching custom and NO_DATA_FOUND exceptions.",
        "4. Output handled error message."
      ],
      sampleCode: {
        language: "sql",
        code: `DECLARE
    v_id   Students.student_id%TYPE := 9999;
    v_name Students.name%TYPE;
    ex_invalid_gpa EXCEPTION;
    v_gpa NUMBER := 4.8;
BEGIN
    IF v_gpa > 4.0 OR v_gpa < 0.0 THEN RAISE ex_invalid_gpa; END IF;
    SELECT name INTO v_name FROM Students WHERE student_id = v_id;
EXCEPTION
    WHEN ex_invalid_gpa THEN
        DBMS_OUTPUT.PUT_LINE('[ERROR] GPA value ' || v_gpa || ' exceeds maximum scale [0.0 - 4.0]!');
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('[ERROR] Student ID ' || v_id || ' does not exist in database.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('[ERROR] Database fault: ' || SQLERRM);
END;
/`
      },
      expectedOutput: `[ERROR] GPA value 4.8 exceeds maximum scale [0.0 - 4.0]!`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  },
  {
    id: "dbms-exp-10",
    labId: "dbms-lab",
    title: "Exp 10: Transaction Processing (TCL): Simulation of ACID properties using COMMIT, ROLLBACK, and SAVEPOINT.",
    slug: "transaction-processing-tcl-acid",
    difficulty: "Intermediate",
    category: "Databases" as any,
    estimatedMinutes: 25,
    rating: 4.95,
    ratingsCount: 145,
    simulator: "custom",
    quizId: "quiz-dbms-10",
    sections: {
      introduction: "Transaction Control Language (TCL) commands (COMMIT, ROLLBACK, SAVEPOINT) maintain ACID properties (Atomicity, Consistency, Isolation, Durability) in database management systems.",
      objective: "Simulate banking fund transfer transactions with SAVEPOINT checkpoints and automatic exception ROLLBACK.",
      videoUrl: "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
      videoTitle: "Database ACID & Transactions",
      videoChannel: "Hussein Nasser",
      prerequisites: ["ACID Properties", "SQL DML"],
      theory: {
        overview: "A transaction is an atomic unit of work. Atomicity guarantees 'all or nothing' execution. SAVEPOINT creates intermediate rollback milestones. COMMIT persists write-ahead log buffers permanently to disk. ROLLBACK restores pre-transaction state.",
        keyConcepts: [
          { title: "ACID Properties", desc: "Atomicity, Consistency, Isolation, Durability." },
          { title: "SAVEPOINT", desc: "Allows partial rollback of subsequent operations without aborting entire transaction." },
          { title: "Write-Ahead Logging (WAL)", desc: "Guarantees durability before flushing dirty database pages to disk." }
        ],
        complexities: [
          { operation: "Transaction Commit", best: "O(1 WAL flush)", avg: "O(1)", worst: "O(disk_sync)", space: "O(undo_log)" }
        ],
        realWorldApplications: [
          "Banking double-entry fund transfer transactions",
          "E-commerce payment gateway order placement workflows",
          "Airline flight booking seat reservation systems"
        ]
      },
      procedure: [
        "1. Start transaction block.",
        "2. Deduct $500 from Sender account.",
        "3. Set SAVEPOINT sp_debit.",
        "4. Simulate receiver credit.",
        "5. COMMIT on success or ROLLBACK on exception."
      ],
      sampleCode: {
        language: "sql",
        code: `BEGIN
    -- 1. Deduct from Sender
    UPDATE BankAccounts SET balance = balance - 500.00 WHERE account_id = 1001;
    SAVEPOINT sp_after_debit;

    -- 2. Credit to Receiver
    UPDATE BankAccounts SET balance = balance + 500.00 WHERE account_id = 1002;

    -- 3. Finalize Atomic Transaction
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('[✓] Fund transfer of $500 committed successfully.');
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('[-] Transaction aborted and rolled back: ' || SQLERRM);
END;
/`
      },
      expectedOutput: `[✓] Fund transfer of $500 committed successfully.`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["MCA"]
      }
    }
  }
];
