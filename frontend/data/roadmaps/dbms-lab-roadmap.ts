import { DSACategory } from "../dsa-topic-data";

export const DBMS_LAB_ROADMAP_CATEGORIES: DSACategory[] = [
  {
    id: "dbms-sql-core",
    name: "1. Relational SQL, Constraints, Joins & Views",
    shortDesc: "DDL Schemas, DML Queries, Set Operations, Joins, and B-Tree Indexing.",
    iconName: "Database",
    topics: [
      {
        id: "dbms-ddl-schema",
        slug: "ddl-schema-management-constraints",
        title: "Exp 1: DDL & Schema Management (CREATE, ALTER, DROP & Constraints)",
        categoryId: "dbms-sql-core",
        categoryName: "1. Relational SQL, Constraints, Joins & Views",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "SQL DDL CREATE ALTER DROP TABLE Primary Key Foreign Key Check constraints",
        gfgUrl: "https://www.geeksforgeeks.org/sql-ddl-dql-dml-dcl-tcl-commands/",
        quickSummary: "Define normalized relational schemas enforcing PRIMARY KEY, FOREIGN KEY ON DELETE CASCADE, CHECK, and UNIQUE constraints.",
        keyPoints: [
          "CREATE TABLE establishes column data types (INT, VARCHAR, DECIMAL) and entity integrity.",
          "FOREIGN KEY enforces referential integrity constraints across related parent-child tables.",
          "ALTER TABLE adds, modifies, and drops columns and schema constraints dynamically."
        ],
        diagramTitle: "Relational Schema Table & Foreign Key Integrity",
        diagram: `┌──────────────────────────────────────────────┐
│ Department (Parent Table)                    │
├──────────────────────────────────────────────┤
│ dept_id INT PRIMARY KEY                      │
│ dept_name VARCHAR(50) NOT NULL UNIQUE        │
└──────────────────────┬───────────────────────┘
                       │ 1:N Referential Integrity
                       ▼
┌──────────────────────────────────────────────┐
│ Student (Child Table)                        │
├──────────────────────────────────────────────┤
│ student_id INT PRIMARY KEY                   │
│ name VARCHAR(100) NOT NULL                   │
│ gpa DECIMAL(3,2) CHECK (gpa >= 0.0 AND <=4.0)│
│ dept_id INT FOREIGN KEY REFERENCES Dept      │
└──────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Schema Modification (DDL)", best: "O(1)", avg: "O(catalog_metadata)", worst: "O(table_rewrite)", space: "O(metadata)" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (DDL & Constraints)",
            code: `-- 1. Create Parent Table (Departments)
CREATE TABLE Departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL UNIQUE,
    budget DECIMAL(12, 2) CHECK (budget > 0)
);

-- 2. Create Child Table with Referential Integrity Constraints
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    dept_id INT,
    gpa DECIMAL(3, 2) CHECK (gpa >= 0.0 AND gpa <= 4.0),
    FOREIGN KEY (dept_id) REFERENCES Departments(dept_id) ON DELETE CASCADE
);

-- 3. Alter Schema to Add New Column
ALTER TABLE Students ADD enrollment_date DATE DEFAULT (CURRENT_DATE);`
          }
        ],
        practiceProblems: [
          {
            title: "SQL Schema Design & Constraints",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/sql-constraints/",
            platform: "GeeksforGeeks",
            topicTag: "DDL"
          }
        ]
      },
      {
        id: "dbms-dml-queries",
        slug: "dml-and-query-operations",
        title: "Exp 2: DML & Query Operations (INSERT, UPDATE, DELETE & SELECT)",
        categoryId: "dbms-sql-core",
        categoryName: "1. Relational SQL, Constraints, Joins & Views",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "SQL DML INSERT UPDATE DELETE SELECT WHERE ORDER BY GROUP BY",
        gfgUrl: "https://www.geeksforgeeks.org/sql-dml-commands/",
        quickSummary: "Execute record insertions, bulk updates, deletions, and complex SELECT filtering with WHERE, ORDER BY, and GROUP BY.",
        keyPoints: [
          "INSERT INTO populates single or batch tuples with type validation.",
          "UPDATE and DELETE require WHERE predicates to prevent accidental whole-table alterations.",
          "GROUP BY aggregates tuples by category and filters grouped results using HAVING."
        ],
        diagramTitle: "SQL Query Execution Pipeline",
        diagram: `┌────────────────────────────────────────────────────────┐
│ FROM / JOIN (Source Tables)                            │
├────────────────────────────────────────────────────────┤
│ WHERE (Filter Tuples Before Aggregation)               │
├────────────────────────────────────────────────────────┤
│ GROUP BY (Partition Tuples into Buckets)               │
├────────────────────────────────────────────────────────┤
│ HAVING (Filter Aggregated Buckets)                     │
├────────────────────────────────────────────────────────┤
│ SELECT (Column Projections & Expressions)              │
├────────────────────────────────────────────────────────┤
│ ORDER BY (Sort Result Output ASC/DESC)                 │
└────────────────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Indexed SELECT Filter", best: "O(log n)", avg: "O(log n)", worst: "O(n) Table Scan", space: "O(result_rows)" },
          { operation: "GROUP BY Aggregation", best: "O(n)", avg: "O(n log k)", worst: "O(n log n)", space: "O(k)" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (DML Operations)",
            code: `-- 1. Insert Multiple Tuples
INSERT INTO Students (student_id, name, email, dept_id, gpa) VALUES
(101, 'Alice Johnson', 'alice@vsb.edu', 1, 3.85),
(102, 'Bob Smith', 'bob@vsb.edu', 1, 3.40),
(103, 'Charlie Brown', 'charlie@vsb.edu', 2, 3.92),
(104, 'Diana Prince', 'diana@vsb.edu', 2, 2.90);

-- 2. Update Record
UPDATE Students SET gpa = 3.95 WHERE student_id = 101;

-- 3. Complex Aggregation Query with HAVING & ORDER BY
SELECT 
    dept_id,
    COUNT(student_id) AS total_students,
    AVG(gpa) AS avg_gpa,
    MAX(gpa) AS highest_gpa
FROM Students
WHERE gpa >= 3.0
GROUP BY dept_id
HAVING COUNT(student_id) >= 1
ORDER BY avg_gpa DESC;`
          }
        ],
        practiceProblems: [
          {
            title: "Recyclable and Low Fat Products (LeetCode #1757)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/recyclable-and-low-fat-products/",
            platform: "LeetCode",
            topicTag: "DML"
          }
        ]
      },
      {
        id: "dbms-set-operations",
        slug: "set-operations-and-aggregate-functions",
        title: "Exp 3: Set Operations (UNION, INTERSECT, MINUS) & Aggregate Functions",
        categoryId: "dbms-sql-core",
        categoryName: "1. Relational SQL, Constraints, Joins & Views",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "SQL Set Operations UNION INTERSECT MINUS aggregate functions COUNT SUM AVG",
        gfgUrl: "https://www.geeksforgeeks.org/sql-set-operators/",
        quickSummary: "Combine relations using relational algebra set operators (UNION, UNION ALL, INTERSECT, EXCEPT/MINUS) and compute statistical aggregates.",
        keyPoints: [
          "UNION eliminates duplicate tuples; UNION ALL retains all duplicates without sorting overhead.",
          "INTERSECT returns common tuples appearing in both queries.",
          "EXCEPT / MINUS returns tuples present in the first relation but absent in the second."
        ],
        diagramTitle: "Relational Set Operations Venn Diagrams",
        diagram: `     UNION (A ∪ B)               INTERSECT (A ∩ B)             MINUS (A - B)
    ┌─────┬─────┐                ┌─────┬─────┐                ┌─────┬─────┐
    │  A  │ A∩B │  B             │  A  │*A∩B*│  B             │ *A* │ A∩B │  B
    └─────┴─────┘                └─────┴─────┘                └─────┴─────┘
    Combines all distinct       Only overlapping records     Records in A only`,
        complexities: [
          { operation: "UNION (Hash Deduplication)", best: "O(n + m)", avg: "O(n + m)", worst: "O((n+m) log(n+m))", space: "O(n + m)" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (Set Operators & Aggregates)",
            code: `-- 1. UNION: Combine Students and Faculty Names
SELECT name, 'Student' AS role FROM Students
UNION
SELECT faculty_name, 'Faculty' AS role FROM Faculty;

-- 2. INTERSECT: Students enrolled in both AI and Data Structures
SELECT student_id FROM CourseEnrollment WHERE course_id = 'AD8481'
INTERSECT
SELECT student_id FROM CourseEnrollment WHERE course_id = 'AD8381';

-- 3. EXCEPT / MINUS: Students who completed coursework but haven't submitted Lab
SELECT student_id FROM Students
EXCEPT
SELECT student_id FROM LabSubmissions;`
          }
        ],
        practiceProblems: [
          {
            title: "Combine Two Tables (LeetCode #175)",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/combine-two-tables/",
            platform: "LeetCode",
            topicTag: "Set Ops"
          }
        ]
      },
      {
        id: "dbms-joins-subqueries",
        slug: "complex-joins-and-nested-subqueries",
        title: "Exp 4: Complex Joins & Nested Subqueries (Inner, Left, Right, Full & Correlated)",
        categoryId: "dbms-sql-core",
        categoryName: "1. Relational SQL, Constraints, Joins & Views",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "SQL Joins Inner Left Right Full Outer Correlated Subqueries",
        gfgUrl: "https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/",
        quickSummary: "Combine multi-table relations via Inner, Left, Right, and Full Outer Joins and write Correlated Subqueries.",
        keyPoints: [
          "INNER JOIN matches rows with equality on join predicates.",
          "LEFT JOIN preserves all left-table rows and fills missing right attributes with NULL.",
          "Correlated subqueries re-evaluate the inner query for every outer tuple (e.g. finding above-average salaries per department)."
        ],
        diagramTitle: "Inner vs Left vs Right Join Venn Matrix",
        diagram: `  INNER JOIN:                   LEFT OUTER JOIN:              RIGHT OUTER JOIN:
  ┌───────┬───────┐             ┌───────┬───────┐             ┌───────┬───────┐
  │ Table │ Table │             │*Table*│*Table*│             │ Table │*Table*│
  │   A   │*A ∩ B*│  B          │  *A*  │*A ∩ B*│  B          │   A   │*A ∩ B*│ *B*
  └───────┴───────┘             └───────┴───────┘             └───────┴───────┘`,
        complexities: [
          { operation: "Hash Join", best: "O(n + m)", avg: "O(n + m)", worst: "O(n * m)", space: "O(min(n, m))" },
          { operation: "Nested Loop Join", best: "O(n)", avg: "O(n * m)", worst: "O(n * m)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (Joins & Subqueries)",
            code: `-- 1. Multi-Table Join
SELECT 
    s.student_id,
    s.name AS student_name,
    d.dept_name,
    c.course_name
FROM Students s
INNER JOIN Departments d ON s.dept_id = d.dept_id
LEFT JOIN CourseEnrollment ce ON s.student_id = ce.student_id
LEFT JOIN Courses c ON ce.course_id = c.course_id;

-- 2. Correlated Subquery: Students with GPA higher than their Department Average
SELECT s.student_id, s.name, s.dept_id, s.gpa
FROM Students s
WHERE s.gpa > (
    SELECT AVG(s2.gpa)
    FROM Students s2
    WHERE s2.dept_id = s.dept_id
);`
          }
        ],
        practiceProblems: [
          {
            title: "Department Highest Salary (LeetCode #184)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/department-highest-salary/",
            platform: "LeetCode",
            topicTag: "Joins"
          }
        ]
      },
      {
        id: "dbms-views-indexes",
        slug: "database-views-and-indexing",
        title: "Exp 5: Database Views & Indexing (Updatable Views, B-Tree & Hash Indexes)",
        categoryId: "dbms-sql-core",
        categoryName: "1. Relational SQL, Constraints, Joins & Views",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "SQL Views Updatable Views B-Tree Indexing query optimization EXPLAIN",
        gfgUrl: "https://www.geeksforgeeks.org/sql-views/",
        quickSummary: "Create virtual views for security abstraction and configure B-Tree and Composite indexes to accelerate query latency.",
        keyPoints: [
          "CREATE VIEW provides data security by masking sensitive columns (e.g. salary, passwords).",
          "B-Tree index reduces query search time from O(n) table scan to O(log n) tree seek.",
          "EXPLAIN ANALYZE traces query execution plans and index usage."
        ],
        diagramTitle: "B-Tree Index Search vs Full Table Scan",
        diagram: `  Full Table Scan (Slow O(n)):
  [ Row 1 ] ──► [ Row 2 ] ──► [ Row 3 ] ──► ... ──► [ Row 1,000,000 ]

  B-Tree Index Seek (Fast O(log n)):
                    [ Key: 50,000 ]
                ┌──────────┴──────────┐
                ▼                     ▼
          [ Key: 25,000 ]       [ Key: 75,000 ] ──► Direct Disk Pointer (Seek in 3 I/Os!)`,
        complexities: [
          { operation: "B-Tree Index Point Lookup", best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(index_size)" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL (Views & Indexes)",
            code: `-- 1. Create Virtual View for Department Honors
CREATE VIEW V_HonorsStudents AS
SELECT student_id, name, dept_id, gpa
FROM Students
WHERE gpa >= 3.75;

-- 2. Create B-Tree Composite Index for Fast Multi-Column Lookup
CREATE INDEX idx_student_dept_gpa ON Students(dept_id, gpa DESC);

-- 3. Verify Query Optimization Plan
EXPLAIN SELECT * FROM Students WHERE dept_id = 1 AND gpa >= 3.8;`
          }
        ],
        practiceProblems: [
          {
            title: "Database Indexing & Query Optimization",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/sql-indexes/",
            platform: "GeeksforGeeks",
            topicTag: "Indexing"
          }
        ]
      }
    ]
  },
  {
    id: "dbms-plsql-tcl",
    name: "2. PL/SQL Programming, Triggers & Transaction ACID",
    shortDesc: "PL/SQL Blocks, Cursors, Procedures, Triggers, Exceptions, and TCL ACID Transactions.",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "dbms-plsql-fundamentals",
        slug: "plsql-fundamentals-loops-cursors",
        title: "Exp 6: PL/SQL Fundamentals (Control Structures & Cursors)",
        categoryId: "dbms-plsql-tcl",
        categoryName: "2. PL/SQL Programming, Triggers & Transaction ACID",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "PL SQL anonymous blocks IF ELSE WHILE FOR implicit explicit cursors Oracle",
        gfgUrl: "https://www.geeksforgeeks.org/pl-sql-introduction/",
        quickSummary: "Write structured PL/SQL anonymous blocks with conditional branches, iterative loops, and Explicit Cursors (DECLARE, OPEN, FETCH, CLOSE).",
        keyPoints: [
          "PL/SQL block structure: DECLARE (variables), BEGIN (procedural logic), EXCEPTION, END.",
          "Explicit Cursors provide granular control over multi-row result sets using %NOTFOUND and %ROWCOUNT.",
          "Cursor FOR Loops automatically manage open, fetch, and close lifecycles."
        ],
        diagramTitle: "PL/SQL Explicit Cursor Processing Lifecycle",
        diagram: `  [ DECLARE Cursor ] ──► [ OPEN Cursor ] ──► [ FETCH Into Variables ]
                                                       │
                                               (%NOTFOUND == TRUE?)
                                               ├─ NO  ──► Process Tuple ──► Loop FETCH
                                               └─ YES ──► [ CLOSE Cursor ] ──► END`,
        complexities: [
          { operation: "Cursor Row Fetch", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(row_buffer)" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "PL/SQL (Explicit Cursor)",
            code: `DECLARE
    v_student_id Students.student_id%TYPE;
    v_name       Students.name%TYPE;
    v_gpa        Students.gpa%TYPE;

    -- Declare Explicit Cursor
    CURSOR c_students IS
        SELECT student_id, name, gpa 
        FROM Students 
        WHERE gpa >= 3.5 
        ORDER BY gpa DESC;
BEGIN
    OPEN c_students;
    LOOP
        FETCH c_students INTO v_student_id, v_name, v_gpa;
        EXIT WHEN c_students%NOTFOUND;
        
        DBMS_OUTPUT.PUT_LINE('Honor Roll: [' || v_student_id || '] ' || v_name || ' -> GPA: ' || v_gpa);
    END LOOP;
    
    DBMS_OUTPUT.PUT_LINE('Total Processed Records: ' || c_students%ROWCOUNT);
    CLOSE c_students;
END;
/`
          }
        ],
        practiceProblems: [
          {
            title: "PL/SQL Cursor Programming",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/pl-sql-cursor/",
            platform: "GeeksforGeeks",
            topicTag: "PL/SQL Cursors"
          }
        ]
      },
      {
        id: "dbms-procedures-functions",
        slug: "procedures-and-functions-plsql",
        title: "Exp 7: Procedures & Functions (IN, OUT, IN OUT Modes)",
        categoryId: "dbms-plsql-tcl",
        categoryName: "2. PL/SQL Programming, Triggers & Transaction ACID",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "PL SQL stored procedures functions IN OUT parameters Oracle MySQL",
        gfgUrl: "https://www.geeksforgeeks.org/pl-sql-procedures-and-functions/",
        quickSummary: "Create reusable modular stored procedures and deterministic scalar functions with parameter modes (IN, OUT, IN OUT).",
        keyPoints: [
          "Stored Procedures perform actions and return multiple values via OUT parameters.",
          "Stored Functions always return a single computed scalar value and can be embedded in SELECT statements.",
          "Pre-compiled database execution reduces client-server network roundtrips."
        ],
        diagramTitle: "Stored Procedure Parameter Modes (IN, OUT, IN OUT)",
        diagram: `┌────────────────────────────────────────────────────────┐
│ Caller (Application / SQL Script)                      │
├───────────────────┬──────────────────┬─────────────────┤
│ IN Parameter      │ OUT Parameter    │ IN OUT Parameter│
│ (Pass by value)   │ (Returns value)  │ (Initial + Ret) │
└─────────┬─────────┴─────────▲────────┴─────────▲───────┘
          ▼                   │                   │
┌─────────────────────────────────────────────────┴──────┐
│ Stored Procedure Body (Executed inside Database Engine)│
└────────────────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Procedure Invocation", best: "O(1)", avg: "O(query_cost)", worst: "O(query_cost)", space: "O(stack)" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "PL/SQL (Procedure & Function)",
            code: `-- 1. Stored Function: Compute Grade Letter from GPA
CREATE OR REPLACE FUNCTION fn_CalculateGrade(p_gpa IN NUMBER) 
RETURN VARCHAR2 IS
BEGIN
    IF p_gpa >= 3.75 THEN RETURN 'O';
    ELSIF p_gpa >= 3.50 THEN RETURN 'A+';
    ELSIF p_gpa >= 3.00 THEN RETURN 'A';
    ELSE RETURN 'B';
    END IF;
END fn_CalculateGrade;
/

-- 2. Stored Procedure with IN and OUT parameters
CREATE OR REPLACE PROCEDURE sp_GetDeptStats(
    p_dept_id IN NUMBER,
    p_total_students OUT NUMBER,
    p_avg_gpa OUT NUMBER
) IS
BEGIN
    SELECT COUNT(*), NVL(AVG(gpa), 0)
    INTO p_total_students, p_avg_gpa
    FROM Students
    WHERE dept_id = p_dept_id;
END sp_GetDeptStats;
/`
          }
        ],
        practiceProblems: [
          {
            title: "Stored Procedures and Functions in PL/SQL",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/pl-sql-procedures-and-functions/",
            platform: "GeeksforGeeks",
            topicTag: "Procedures"
          }
        ]
      },
      {
        id: "dbms-triggers",
        slug: "database-triggers-audit-logging",
        title: "Exp 8: Database Triggers (Row & Statement-Level Triggers)",
        categoryId: "dbms-plsql-tcl",
        categoryName: "2. PL/SQL Programming, Triggers & Transaction ACID",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "PL SQL database triggers BEFORE AFTER INSERT UPDATE DELETE audit log Oracle",
        gfgUrl: "https://www.geeksforgeeks.org/sql-triggers-set-1-before-after-insert-update-delete/",
        quickSummary: "Design automated BEFORE and AFTER row-level triggers to enforce data validation and write audit logs.",
        keyPoints: [
          "BEFORE triggers inspect and modify incoming :NEW values prior to disk write.",
          "AFTER triggers record audit history into log tables with timestamps and old/new values.",
          ":OLD and :NEW pseudo-records capture row state transitions."
        ],
        diagramTitle: "Database Trigger Execution Pipeline",
        diagram: `  [ DML Event: UPDATE Students ]
                │
                ▼
      [ BEFORE UPDATE Trigger ] ──► Validate constraint / Sanitize :NEW
                │
                ▼
      [ Perform Table Update ]
                │
                ▼
      [ AFTER UPDATE Trigger ] ──► INSERT INTO Student_Audit_Log (:OLD, :NEW, SYSDATE)`,
        complexities: [
          { operation: "Trigger Execution Overhead", best: "O(1)", avg: "O(1)", worst: "O(audit_insert)", space: "O(row_log)" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "PL/SQL (Audit Log Trigger)",
            code: `-- 1. Create Audit Trail Table
CREATE TABLE Student_Audit (
    audit_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id INT,
    old_gpa NUMBER(3,2),
    new_gpa NUMBER(3,2),
    modified_by VARCHAR2(50),
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create AFTER UPDATE Row Trigger
CREATE OR REPLACE TRIGGER trg_StudentGpaAudit
AFTER UPDATE OF gpa ON Students
FOR EACH ROW
BEGIN
    INSERT INTO Student_Audit (student_id, old_gpa, new_gpa, modified_by)
    VALUES (:OLD.student_id, :OLD.gpa, :NEW.gpa, USER);
END;
/`
          }
        ],
        practiceProblems: [
          {
            title: "Database Triggers and Audit Automation",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/sql-triggers-set-1-before-after-insert-update-delete/",
            platform: "GeeksforGeeks",
            topicTag: "Triggers"
          }
        ]
      },
      {
        id: "dbms-exception-handling",
        slug: "exception-handling-plsql",
        title: "Exp 9: Exception Handling in PL/SQL (Predefined & User-Defined)",
        categoryId: "dbms-plsql-tcl",
        categoryName: "2. PL/SQL Programming, Triggers & Transaction ACID",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "PL SQL exception handling NO_DATA_FOUND TOO_MANY_ROWS RAISE_APPLICATION_ERROR",
        gfgUrl: "https://www.geeksforgeeks.org/exception-handling-in-pl-sql/",
        quickSummary: "Trap runtime database errors using predefined exception handlers (NO_DATA_FOUND, TOO_MANY_ROWS) and custom user exceptions via RAISE.",
        keyPoints: [
          "Predefined System Exceptions: NO_DATA_FOUND, TOO_MANY_ROWS, ZERO_DIVIDE, DUP_VAL_ON_INDEX.",
          "User-Defined Exceptions declared in DECLARE block and triggered using RAISE statement.",
          "RAISE_APPLICATION_ERROR(-20001, 'Custom message') propagates error code back to caller."
        ],
        diagramTitle: "PL/SQL Exception Propagation Flow",
        diagram: `  [ BEGIN Block ] ──► Query returns 0 rows ──► Raises NO_DATA_FOUND
                                                        │
                                                        ▼
                                             ┌──────────────────────┐
                                             │ EXCEPTION Block      │
                                             ├──────────────────────┤
                                             │ WHEN NO_DATA_FOUND   │
                                             │ WHEN OTHERS          │
                                             └──────────────────────┘`,
        complexities: [
          { operation: "Exception Trap & Handle", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "PL/SQL (Exception Handling)",
            code: `DECLARE
    v_student_id Students.student_id%TYPE := 9999;
    v_name       Students.name%TYPE;
    ex_invalid_gpa EXCEPTION;
    v_input_gpa NUMBER := 4.8; -- Illegal GPA (> 4.0)
BEGIN
    -- Check Custom Business Rule
    IF v_input_gpa > 4.0 OR v_input_gpa < 0.0 THEN
        RAISE ex_invalid_gpa;
    END IF;

    -- Query that may raise NO_DATA_FOUND
    SELECT name INTO v_name FROM Students WHERE student_id = v_student_id;
    DBMS_OUTPUT.PUT_LINE('Found Student: ' || v_name);

EXCEPTION
    WHEN ex_invalid_gpa THEN
        DBMS_OUTPUT.PUT_LINE('[ERROR] GPA value out of valid scale [0.0 - 4.0]!');
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('[ERROR] Student ID ' || v_student_id || ' does not exist in database.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('[ERROR] Unexpected database fault: ' || SQLERRM);
END;
/`
          }
        ],
        practiceProblems: [
          {
            title: "PL/SQL Exception Trapping",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/exception-handling-in-pl-sql/",
            platform: "GeeksforGeeks",
            topicTag: "Exceptions"
          }
        ]
      },
      {
        id: "dbms-transaction-tcl",
        slug: "transaction-processing-tcl-acid",
        title: "Exp 10: Transaction Processing & ACID Properties (COMMIT, ROLLBACK, SAVEPOINT)",
        categoryId: "dbms-plsql-tcl",
        categoryName: "2. PL/SQL Programming, Triggers & Transaction ACID",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "TCL commands COMMIT ROLLBACK SAVEPOINT ACID properties database concurrency",
        gfgUrl: "https://www.geeksforgeeks.org/sql-tcl-commands/",
        quickSummary: "Simulate ACID transactions (Atomicity, Consistency, Isolation, Durability) using COMMIT, ROLLBACK, and partial SAVEPOINT rollbacks.",
        keyPoints: [
          "Atomicity: 'All or Nothing' transaction boundary.",
          "SAVEPOINT creates intermediate rollback checkpoints within large batches.",
          "COMMIT permanently persists write-ahead log buffers to disk; ROLLBACK restores pre-transaction state."
        ],
        diagramTitle: "Transaction Savepoint & Partial Rollback Workflow",
        diagram: `  [ BEGIN Transaction ]
          │
  Deduct $500 from Account A
          │
  SAVEPOINT sp_deducted;
          │
  Credit $500 to Account B ──► (Network Crash / Error Occurs!)
          │
  [ ROLLBACK TO sp_deducted; ] ──► (Reverts credit failure, allows retry)
          │
  [ COMMIT; ] ──► Permanent ACID Durability Guarantee`,
        complexities: [
          { operation: "Transaction Commit", best: "O(1 WAL flush)", avg: "O(1)", worst: "O(disk_sync)", space: "O(undo_log)" }
        ],
        codeSnippets: [
          {
            language: "sql",
            label: "SQL / PL/SQL (TCL ACID Simulation)",
            code: `-- Fund Transfer Transaction Simulation with Savepoints
BEGIN
    -- 1. Deduct from Sender
    UPDATE BankAccounts 
    SET balance = balance - 500.00 
    WHERE account_id = 1001;

    SAVEPOINT sp_after_debit;

    -- 2. Credit to Receiver
    UPDATE BankAccounts 
    SET balance = balance + 500.00 
    WHERE account_id = 1002;

    -- 3. Finalize Atomic Transaction
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('[✓] Fund transfer committed successfully.');

EXCEPTION
    WHEN OTHERS THEN
        -- Rollback on any failure
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('[-] Transaction aborted and rolled back: ' || SQLERRM);
END;
/`
          }
        ],
        practiceProblems: [
          {
            title: "Transaction Control Language (TCL) in SQL",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/sql-tcl-commands/",
            platform: "GeeksforGeeks",
            topicTag: "TCL ACID"
          }
        ]
      }
    ]
  }
];
