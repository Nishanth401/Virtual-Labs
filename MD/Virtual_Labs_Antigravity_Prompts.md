# Virtual Labs — Antigravity AI Build Prompts
Department of Artificial Intelligence & Data Science

This document gives you **one fixed structure prompt** (the app shell/UI/behavior — based on your reference screenshot) and **8 content blocks**, one per lab. For each lab, paste the FIXED STRUCTURE section unchanged, then paste that lab's CONTENT BLOCK in place of the placeholder. Nothing else should change between labs — only the topics/experiments/roadmap content.

---

## 🔒 FIXED STRUCTURE PROMPT (use exactly as-is for every lab, only swap the CONTENT BLOCK)

```
Build a "Virtual Lab" web module for a single course, following this exact structure and UI pattern:

LEFT SIDEBAR (persistent navigation), in this order:
1. Introduction
2. Objective
3. List of Experiments (show a count badge, e.g. "8")
4. Target Audience
5. Course Alignment
6. Video Tutorials
7. Topic Roadmap (highlighted/active by default)
8. Self-Assessment Quiz
9. Resources & Tutorials
10. Feedback
Include a progress indicator (e.g. "11%") and a floating "back to top" action button at the bottom of the sidebar.

CENTER PANEL — "Topic Roadmap":
- A header "[COURSE NAME] Laboratory Roadmap" with a book icon.
- A search box: "Search topic or algorithm..."
- A vertically stacked list of numbered MODULES (e.g. "1. Module Name", "2. Module Name"), each showing a completion fraction badge (e.g. "0/3").
- Each module expands to show its child experiments as a flat list (e.g. "Exp 1: <title>", "Exp 2: <title>"), each row clickable.
- The currently selected experiment row is visually highlighted (different background/accent color, colored square bullet).

RIGHT PANEL — Experiment detail view (opens when an experiment row is clicked):
- Breadcrumb at top: "[Module N. Module Name] > [Exp N: Experiment Title]"
- Two buttons top-right: "In-App Handbook" and "Mark Done"
- Large title: "Exp [N]: [Experiment Title]"
- Section "Learning Objective & Overview": 1-2 sentence plain-language summary of what will be built/learned.
- Section "Key Concepts & Principles": a numbered list (2-4 items) of the core ideas/formulas/steps involved, each with the concept bolded followed by a one-line explanation or formula.
- Section "Time & Space Complexity Summary": a table with columns Scope/Operation | Best Time | Average Time | Worst Time | Space — populate with the relevant complexity for the core operation(s) of that experiment (use "-" or "N/A" if not applicable, e.g. for cloud/DB/BI exercises where complexity doesn't apply — in that case replace this section with a "Tools & Environment Required" table instead: Tool | Purpose | Notes).
- Persistent bottom-right toolbar: "Labs" | "</> Visualizer" | "Dashboard"

Visual style: clean white background, blue accent color for headers/links/active states, orange/amber accent for the currently active sidebar item and active roadmap row, subtle borders between sections, sans-serif font, rounded corner cards for the module list.

Populate the sidebar's "List of Experiments" count, the Topic Roadmap's modules, and every experiment's title/overview/key-concepts/complexity strictly from the CONTENT BLOCK below — do not invent, rename, reorder, merge, or drop any experiment. Keep the module grouping exactly as given.

=== CONTENT BLOCK: [REPLACE WITH ONE LAB BLOCK BELOW] ===
```

---

## 1. Deep Learning (DL) Lab — CONTENT BLOCK

```
COURSE NAME: Deep Learning Laboratory
LIST OF EXPERIMENTS COUNT: 8

TOPIC ROADMAP MODULES:

Module 1: Foundational Neural Networks (0/1)
- Exp 1: Solving XOR Problem Using Deep Neural Networks (DNN)
  Overview: Build and train a small feed-forward DNN to learn the non-linearly-separable XOR function, showing why a single-layer perceptron fails but a hidden layer succeeds.
  Key Concepts: 1) Forward pass computes weighted sums through hidden/output layers with ReLU/sigmoid activations. 2) Binary cross-entropy loss measures prediction error for the 4 XOR input pairs. 3) Adam optimizer updates weights via backpropagated gradients over many epochs until the model fits all 4 cases.
  Complexity: Scope=Forward+Backward pass | Best=O(epochs·n·W) | Avg=O(epochs·n·W) | Worst=O(epochs·n·W) | Space=O(W) (n=samples, W=weights)

Module 2: Convolutional Neural Networks for Vision (0/2)
- Exp 2: Character Recognition Using Convolutional Neural Networks (CNN)
  Overview: Train a CNN on a digit/character image dataset (e.g. MNIST) to classify handwritten characters.
  Key Concepts: 1) Convolutional layers extract local spatial features (edges, strokes) via learnable filters. 2) Max-pooling layers downsample feature maps to reduce dimensionality and add translation invariance. 3) Fully connected + softmax layers map extracted features to class probabilities.
  Complexity: Scope=Conv+Pool forward pass | Best=O(k²·C_in·C_out·H·W) | Avg=O(k²·C_in·C_out·H·W) | Worst=same | Space=O(feature maps)

- Exp 3: Face Recognition Using Convolutional Neural Networks (CNN)
  Overview: Extend the CNN architecture (deeper conv stack + dropout) to recognize individual faces from an image dataset, using data augmentation to improve generalization.
  Key Concepts: 1) Deeper conv/pool stacks learn increasingly abstract facial features. 2) Dropout regularization reduces overfitting on small face datasets. 3) Image data augmentation (rotation, shift, flip) synthetically expands training data.
  Complexity: Scope=Training over augmented batches | Best=O(epochs·batches·conv_cost) | Avg=same | Worst=same | Space=O(model params + batch)

Module 3: Recurrent Networks & Sequence Modeling (0/3)
- Exp 4: Language Modeling Using Recurrent Neural Networks (RNN)
  Overview: Train an LSTM-based language model on sample text to predict the next word given a sequence of preceding words.
  Key Concepts: 1) Text is tokenized and converted into n-gram input-output sequences. 2) An embedding layer maps word indices to dense vectors before the LSTM processes them sequentially. 3) The model is used generatively by repeatedly predicting and appending the next most likely word.
  Complexity: Scope=Sequence forward pass | Best=O(T·H²) | Avg=O(T·H²) | Worst=O(T·H²) | Space=O(T·H) (T=sequence length, H=hidden size)

- Exp 5: Sentiment Analysis Using Long Short-Term Memory (LSTM) Networks
  Overview: Build a stacked LSTM classifier that reads a sentence and predicts its emotion label (happy, sad, angry, scared, etc.).
  Key Concepts: 1) LSTM cells use input/forget/output gates to retain long-range dependencies across a sentence. 2) Stacked LSTM layers with dropout capture higher-level sequential patterns while limiting overfitting. 3) A dense softmax output layer converts the final hidden state into emotion-class probabilities.
  Complexity: Scope=Sequence forward pass | Best=O(T·H²) | Avg=O(T·H²) | Worst=O(T·H²) | Space=O(T·H)

- Exp 6: Parts-of-Speech (POS) Tagging Using Sequence-to-Sequence (Seq2Seq) Architecture
  Overview: Use an encoder–decoder LSTM model to map an input sentence to a corresponding sequence of POS tags.
  Key Concepts: 1) An encoder LSTM compresses the input sentence into a fixed context vector (final hidden/cell state). 2) A decoder LSTM, initialized with that context, generates the tag sequence one token at a time. 3) Inference proceeds autoregressively, feeding each predicted tag back in until an end token is produced.
  Complexity: Scope=Encoder+Decoder pass | Best=O(T·H²) | Avg=O(T·H²) | Worst=O(T·H²) | Space=O(T·H)

Module 4: Generative Models & Real-World Applications (0/2)
- Exp 7: Machine Translation Using Encoder–Decoder Model
  Overview: Apply the same encoder–decoder LSTM pattern to translate short sentences from a source language to a target language.
  Key Concepts: 1) Source and target vocabularies are tokenized and embedded separately. 2) The encoder's final state seeds the decoder, which is trained via teacher forcing on shifted target sequences. 3) Greedy decoding at inference time produces the translated sentence word-by-word.
  Complexity: Scope=Encoder+Decoder pass | Best=O(T·H²) | Avg=O(T·H²) | Worst=O(T·H²) | Space=O(T·H)

- Exp 8: Image Augmentation Using Generative Adversarial Networks (GANs)
  Overview: Train a simple GAN (generator + discriminator) on an image dataset so the generator learns to synthesize new, realistic images for dataset augmentation.
  Key Concepts: 1) The generator maps random noise vectors into synthetic images. 2) The discriminator is trained to distinguish real images from generated ones, providing an adversarial training signal. 3) Generator and discriminator are trained in alternating steps until generated images become convincingly realistic.
  Complexity: Scope=Generator+Discriminator training step | Best=O(epochs·batch·net_cost) | Avg=same | Worst=same | Space=O(model params + batch)
```

---

## 2. Cloud Service Management (CSM) Lab — CONTENT BLOCK

```
COURSE NAME: Cloud Service Management Laboratory
LIST OF EXPERIMENTS COUNT: 5

TOPIC ROADMAP MODULES:

Module 1: Cloud Organization & Access Control (0/1)
- Exp 1: Create a Cloud Organization in AWS/Google Cloud (or OpenStack/Eucalyptus/OpenNebula) with Role-Based Access Control
  Overview: Set up a cloud management account, enable an Organizations service, create Organizational Units, and enforce role-based permissions using IAM roles and Service Control Policies.
  Key Concepts: 1) A management (root) account governs member accounts grouped into Organizational Units. 2) Service Control Policies (SCPs) define the maximum allowed actions per OU/account. 3) IAM roles with attached policies implement role-based access control across the organization.
  Complexity (replace with Tools & Environment table): Tool=AWS Organizations | Purpose=Central account governance | Notes=Free to enable; Tool=IAM | Purpose=Role & policy management | Notes=Console or CLI

Module 2: Cost Modeling & Resource Monitoring (0/3)
- Exp 2: Create a Cost Model for a Web Application Using Various Services and Perform Cost-Benefit Analysis
  Overview: Identify the AWS services a typical web app uses (EC2, RDS, S3, CloudFront, etc.), estimate their monthly costs, and evaluate whether cloud deployment is cost-effective versus on-premises.
  Key Concepts: 1) Each service's usage-based cost (compute hours, storage GB, data transfer) is estimated individually. 2) Costs are summed into a monthly/annual total cost-of-ownership model. 3) A cost-benefit threshold comparison weighs scalability/availability benefits against the computed spend.
  Tools & Environment: Tool=AWS Pricing Calculator | Purpose=Estimate per-service cost | Notes=Or a custom script/spreadsheet

- Exp 3: Create Alerts for Usage of Cloud Resources
  Overview: Use CloudWatch metrics and a Lambda function to monitor a resource's usage (e.g. S3 bucket size) and trigger an alarm when a threshold is exceeded.
  Key Concepts: 1) An IAM role grants the Lambda function permission to read metrics and resource data. 2) The Lambda function publishes a custom CloudWatch metric on a schedule. 3) A CloudWatch Alarm compares the metric against a threshold and fires an SNS notification when exceeded.
  Tools & Environment: Tool=CloudWatch | Purpose=Metric collection & alarms | Notes=; Tool=Lambda | Purpose=Scheduled metric publisher | Notes=; Tool=SNS | Purpose=Alert delivery | Notes=

- Exp 4: Create Billing Alerts for Your Cloud Organization
  Overview: Configure an AWS Budget with a cost threshold and email/SNS notification so the organization is alerted when spending approaches or exceeds a set limit.
  Key Concepts: 1) A Cost Budget is defined with an amount, time unit (monthly), and cost filters/types. 2) A notification rule compares actual spend against a percentage threshold. 3) Subscribers (email/SNS) receive the alert when the threshold condition is met.
  Tools & Environment: Tool=AWS Budgets | Purpose=Spend threshold tracking | Notes=Console or CLI JSON config

Module 3: Multi-Cloud Cost Comparison (0/1)
- Exp 5: Compare Cloud Cost for a Simple Web Application Across AWS, Azure and GCP and Suggest the Best One
  Overview: Compare the pricing models, service breadth, and cost-effectiveness of AWS, Azure, and GCP for hosting the same simple web application, then justify a recommended provider.
  Key Concepts: 1) AWS offers the broadest service catalog with per-second billing flexibility. 2) Azure is competitive for enterprise integration and general-purpose/compute-optimized workloads. 3) GCP tends to be the most cost-effective for compute-optimized instances and open-source-aligned workloads.
  Tools & Environment: Tool=AWS/Azure/GCP pricing pages or calculators | Purpose=Cross-provider cost comparison | Notes=Comparative report deliverable
```

---

## 3. Object-Oriented Programming (Java/OOP) Lab — CONTENT BLOCK

```
COURSE NAME: Object-Oriented Programming Laboratory (Java)
LIST OF EXPERIMENTS COUNT: 15

TOPIC ROADMAP MODULES:

Module 1: Classes & Objects Fundamentals (0/3)
- Exp 1: Create a Java Program to Store Student Details and Calculate Total, Average, and Grade
  Overview: Model a Student class that captures marks and computes total/average/grade using simple class methods.
  Key Concepts: 1) Encapsulate related data (name, roll no., marks) as instance fields of a class. 2) Methods perform input capture and computation (total, average) separately from display. 3) Conditional grading logic maps the average to a letter grade.
  Complexity: Scope=Total/Average calc | Best=O(1) | Avg=O(1) | Worst=O(1) | Space=O(1)

- Exp 2: Develop a Java Application to Create Bank Accounts and Perform Deposit, Withdrawal, and Balance Enquiry Operations
  Overview: Build a BankAccount class supporting deposit, withdrawal (with balance checks), and balance display via a menu-driven interface.
  Key Concepts: 1) Object state (account number, balance) is modified through dedicated methods rather than direct field access. 2) Withdrawal logic validates sufficient balance before updating state. 3) A menu loop repeatedly dispatches to the chosen operation until exit.
  Complexity: Scope=Deposit/Withdraw | Best=O(1) | Avg=O(1) | Worst=O(1) | Space=O(1)

- Exp 3: Create a Product Catalog Using Classes and Objects to Store Product Name, Price, and Stock Details
  Overview: Model a Product class and manage a catalog (array/collection of Product objects) to store and display product name, price, and stock.
  Key Concepts: 1) Objects group related product attributes under one type. 2) A collection of objects represents the catalog as a whole. 3) Iteration over the collection supports catalog-wide display/search operations.
  Complexity: Scope=Catalog traversal | Best=O(1) | Avg=O(n) | Worst=O(n) | Space=O(n)

Module 2: Operators & Control Statements (0/3)
- Exp 4: Calculate Gross Salary, Deductions, and Net Salary Using Operators and Input/Output Statements
  Overview: Compute payroll figures (gross, deductions, net salary) using arithmetic operators and formatted I/O.
  Key Concepts: 1) Arithmetic operators combine basic pay and allowances into gross salary. 2) Deduction rules (tax, PF, etc.) are applied via further arithmetic expressions. 3) Formatted output presents the computed payslip values.
  Complexity: Scope=Payroll calc | Best=O(1) | Avg=O(1) | Worst=O(1) | Space=O(1)

- Exp 5: Use Conditional Statements to Check Minimum Balance and Withdrawal Eligibility
  Overview: Apply if-else logic to validate whether a withdrawal request meets minimum-balance and sufficient-funds rules.
  Key Concepts: 1) Conditional (if-else) branching encodes business rules like minimum balance thresholds. 2) Compound conditions combine multiple checks (balance and requested amount). 3) Appropriate messages/results are returned per branch outcome.
  Complexity: Scope=Eligibility check | Best=O(1) | Avg=O(1) | Worst=O(1) | Space=O(1)

- Exp 6: Implement OTP Generation and Verification Using Loops and Decision-Making Statements
  Overview: Generate a random OTP, then loop to accept user attempts and verify against the generated code with limited retries.
  Key Concepts: 1) Random number generation produces a fixed-length OTP. 2) A loop bounds the number of verification attempts allowed. 3) Decision statements compare user input to the OTP and control loop exit/success state.
  Complexity: Scope=Verification loop | Best=O(1) | Avg=O(k) | Worst=O(k) (k=max attempts) | Space=O(1)

Module 3: Inheritance & Polymorphism (0/3)
- Exp 7: Demonstrate Classes, Constructors, Inheritance, and Method Overriding to Generate Employee Payroll Details
  Overview: Build an Employee base class and specialized subclasses that override payroll calculation logic.
  Key Concepts: 1) Constructors initialize base and derived class state via `super()` chaining. 2) Inheritance lets subclasses reuse and extend common Employee behavior. 3) Method overriding customizes payroll computation per employee type while sharing a common interface.
  Complexity: Scope=Payroll dispatch | Best=O(1) | Avg=O(1) | Worst=O(1) | Space=O(1)

- Exp 8: Implement Inheritance for Student, Faculty, and Course Classes
  Overview: Design a class hierarchy relating Student, Faculty, and Course entities to model an academic domain.
  Key Concepts: 1) A common base (e.g. Person) captures shared attributes for Student and Faculty. 2) Association/composition links Course objects to enrolled Students and assigned Faculty. 3) Polymorphic method calls behave differently depending on the concrete subclass.
  Complexity: Scope=Object graph traversal | Best=O(1) | Avg=O(n) | Worst=O(n) | Space=O(n)

- Exp 9: Implement Recursive Functions (Factorial/Fibonacci) and Demonstrate Method Overloading and Overriding
  Overview: Write recursive factorial/Fibonacci methods, alongside overloaded and overridden method examples in a class hierarchy.
  Key Concepts: 1) Recursion solves factorial/Fibonacci by reducing to smaller subproblems with a base case. 2) Method overloading distinguishes methods by differing parameter signatures at compile time. 3) Method overriding redefines inherited behavior, resolved at runtime via dynamic dispatch.
  Complexity: Scope=Fibonacci(n) recursive | Best=O(2^n) naive / O(n) memoized | Avg=O(2^n) | Worst=O(2^n) | Space=O(n) (call stack)

Module 4: Arrays & Algorithmic Problem Solving (0/3)
- Exp 10: Perform Matrix Addition, Subtraction, Transpose, and Multiplication
  Overview: Implement the four standard matrix operations using 2D arrays and nested loops.
  Key Concepts: 1) Addition/subtraction operate element-wise on matrices of equal dimensions. 2) Transpose swaps row and column indices. 3) Multiplication accumulates dot products of rows and columns, requiring compatible dimensions.
  Complexity: Scope=Matrix multiply n×n | Best=O(n³) | Avg=O(n³) | Worst=O(n³) | Space=O(n²)

- Exp 11: Print a 2D Matrix in Spiral Order and Wave Order
  Overview: Traverse a 2D matrix using two distinct patterns — spiral (boundary-inward) and wave (column zig-zag).
  Key Concepts: 1) Spiral traversal maintains shrinking boundary indices (top/bottom/left/right). 2) Wave traversal alternates the direction of column traversal on each pass. 3) Both patterns visit every cell exactly once without extra storage.
  Complexity: Scope=Full matrix traversal | Best=O(n·m) | Avg=O(n·m) | Worst=O(n·m) | Space=O(1) extra

- Exp 12: Implement Anagram Checking, Pattern Matching, and Kadane's Algorithm for Maximum Subarray Sum
  Overview: Solve three classic array/string problems: anagram detection, substring pattern search, and maximum contiguous subarray sum.
  Key Concepts: 1) Anagram checking compares character frequency counts (or sorted strings) of two inputs. 2) Pattern matching scans the text for occurrences of a substring using a sliding comparison. 3) Kadane's Algorithm tracks a running sum, resetting when it turns negative, to find the maximum subarray sum in one pass.
  Complexity: Scope=Kadane's Algorithm | Best=O(n) | Avg=O(n) | Worst=O(n) | Space=O(1)

Module 5: Exceptions, Collections & Database Connectivity (0/3)
- Exp 13: Create a Program That Demonstrates Custom Exceptions and File Read/Write Operations
  Overview: Define a custom exception class for domain-specific error conditions and combine it with basic file I/O (read/write/append).
  Key Concepts: 1) Custom exceptions extend `Exception`/`RuntimeException` to represent domain-specific failure cases. 2) try-catch-finally blocks handle and clean up around risky operations. 3) File streams read and persist data to disk with proper resource closing.
  Complexity: Scope=File read/write | Best=O(1) | Avg=O(size) | Worst=O(size) | Space=O(1) buffered

- Exp 14: Use ArrayList, HashSet, HashMap, Lambda Expressions, and Stream API for Data Processing
  Overview: Apply Java Collections (List/Set/Map) together with lambdas and the Stream API to filter, transform, and aggregate data.
  Key Concepts: 1) ArrayList/HashSet/HashMap offer ordered-list, unique-set, and key-value storage respectively with different lookup costs. 2) Lambda expressions provide concise inline implementations of functional interfaces. 3) The Stream API chains filter/map/reduce operations to process collections declaratively.
  Complexity: Scope=HashMap get/put | Best=O(1) | Avg=O(1) | Worst=O(n) (collisions) | Space=O(n)

- Exp 15: Develop a JDBC-Based CRUD Application (Student/Employee/Hotel Reservation Management System)
  Overview: Build a menu-driven Java application that connects to a relational database via JDBC and performs Create, Read, Update, Delete operations on records.
  Key Concepts: 1) A JDBC Connection/Statement/PreparedStatement executes parameterized SQL against the database. 2) CRUD operations map directly to INSERT/SELECT/UPDATE/DELETE statements. 3) ResultSet processing converts query rows back into Java objects for display.
  Complexity: Scope=CRUD DB operation | Best=O(1) indexed | Avg=O(log n) indexed | Worst=O(n) full scan | Space=O(1) per op
```

---

## 4. Database Management Systems (DBMS) Lab — CONTENT BLOCK

```
COURSE NAME: Database Management Systems Laboratory
LIST OF EXPERIMENTS COUNT: 15

TOPIC ROADMAP MODULES:

Module 1: ER Modeling & Normalization (0/2)
- Exp 1: Design of ER Diagram and Relational Schema for an E-Commerce System
  Overview: Model Customers, Products, Orders, Payments, and Suppliers as an ER diagram, then convert it into a normalized relational schema with keys and constraints in MySQL.
  Key Concepts: 1) Entities, attributes, and relationship cardinalities (1:1, 1:N, M:N) are identified before schema design. 2) Each entity becomes a table with a primary key; M:N relationships become bridge/associative tables. 3) PRIMARY KEY, FOREIGN KEY, and other constraints enforce referential integrity in the created tables.
  Tools & Environment: Tool=MySQL | Purpose=Schema creation & constraints | Notes=CREATE TABLE + sample INSERTs

- Exp 2: Database Normalization from UNF to BCNF for a University Management System
  Overview: Take an unnormalized university dataset and progressively normalize it through 1NF, 2NF, 3NF, up to BCNF.
  Key Concepts: 1) 1NF removes repeating groups/multivalued attributes. 2) 2NF/3NF remove partial and transitive functional dependencies on the primary key. 3) BCNF ensures every determinant is a candidate key, eliminating remaining anomalies.
  Tools & Environment: Tool=MySQL | Purpose=Implement normalized tables | Notes=Functional dependency analysis

Module 2: Transactions, Constraints & DDL (0/3)
- Exp 3: Implementation of ACID Properties and CAP Theorem Using MySQL
  Overview: Demonstrate Atomicity, Consistency, Isolation, Durability through transaction examples, and relate them to the CAP theorem's tradeoffs.
  Key Concepts: 1) Transactions group multiple statements so they either fully commit or fully roll back (Atomicity/Consistency). 2) Isolation levels control how concurrent transactions see each other's uncommitted changes. 3) CAP theorem states a distributed system can guarantee at most two of Consistency, Availability, and Partition tolerance.
  Tools & Environment: Tool=MySQL | Purpose=Transaction demo (COMMIT/ROLLBACK) | Notes=

- Exp 4: Implementation of DDL Commands and ALTER TABLE Operations in MySQL
  Overview: Practice Data Definition Language commands — CREATE, ALTER (add/drop/modify columns), DROP — on sample tables.
  Key Concepts: 1) CREATE TABLE defines table structure and column data types. 2) ALTER TABLE modifies existing structure (add/drop/rename columns, change types) without recreating the table. 3) DDL changes are auto-committed and affect schema metadata directly.
  Tools & Environment: Tool=MySQL | Purpose=Schema modification practice | Notes=

- Exp 7: Implementation of SQL Constraints in a Hospital Appointment System
  Overview: Apply NOT NULL, UNIQUE, CHECK, PRIMARY KEY, and FOREIGN KEY constraints to enforce data integrity in a hospital appointment schema.
  Key Concepts: 1) Column-level and table-level constraints restrict what data can be inserted/updated. 2) Foreign keys maintain referential integrity between related tables (e.g. patients ↔ appointments). 3) CHECK constraints enforce domain rules (e.g. valid appointment times).
  Tools & Environment: Tool=MySQL | Purpose=Constraint enforcement | Notes=

Module 3: Data Manipulation & Querying (0/2)
- Exp 5: Performing INSERT, UPDATE, and DELETE Operations on an Employee Database
  Overview: Practice core DML statements to add, modify, and remove employee records.
  Key Concepts: 1) INSERT adds new rows with specified column values. 2) UPDATE modifies existing rows matching a WHERE condition. 3) DELETE removes rows matching a condition, distinct from schema-level removal.
  Tools & Environment: Tool=MySQL | Purpose=DML practice | Notes=

- Exp 6: Comparison of DELETE, TRUNCATE, and DROP Commands Using a Product Inventory Database
  Overview: Contrast the three row/table-removal commands on an inventory database to understand their scope and reversibility.
  Key Concepts: 1) DELETE removes rows conditionally and can be rolled back within a transaction. 2) TRUNCATE removes all rows quickly, resets identity counters, and is typically non-rollback-able. 3) DROP removes the entire table structure along with its data.
  Tools & Environment: Tool=MySQL | Purpose=Command comparison | Notes=

- Exp 8: Customer Analytics Using WHERE, ORDER BY, LIKE, IN, BETWEEN, and DISTINCT
  Overview: Query a customer dataset using filtering, sorting, pattern matching, and de-duplication clauses.
  Key Concepts: 1) WHERE filters rows by condition; ORDER BY sorts the result set. 2) LIKE/IN/BETWEEN provide pattern, set-membership, and range filtering respectively. 3) DISTINCT removes duplicate rows from the result.
  Tools & Environment: Tool=MySQL | Purpose=Query practice | Notes=

Module 4: Aggregation, Reporting & Analytics (0/2)
- Exp 9: Generating Monthly Sales Reports Using Aggregate Functions, GROUP BY, HAVING, CASE WHEN, and String Functions
  Overview: Summarize sales data into monthly reports using aggregation, grouping, conditional logic, and string manipulation.
  Key Concepts: 1) Aggregate functions (SUM, COUNT, AVG) compute summary statistics per group. 2) GROUP BY partitions rows before aggregation; HAVING filters on aggregated results. 3) CASE WHEN adds conditional logic inline in SELECT statements, and string functions format text output.
  Tools & Environment: Tool=MySQL | Purpose=Reporting queries | Notes=

- Exp 10: Ranking Products Based on Sales Performance Using SQL Window Functions
  Overview: Use window functions to rank products by sales without collapsing the result set.
  Key Concepts: 1) Window functions (RANK, ROW_NUMBER, DENSE_RANK) compute per-row rankings over a defined partition. 2) OVER (PARTITION BY ... ORDER BY ...) defines the ranking scope and order. 3) Unlike GROUP BY, window functions retain individual row detail alongside the aggregate/rank value.
  Tools & Environment: Tool=MySQL | Purpose=Window function practice | Notes=

Module 5: Joins, Views & Query Performance (0/2)
- Exp 11: Banking Transaction Analysis — JOIN and Subquery-Based SQL Statements
  Overview: Analyze banking transactions across multiple related tables using various JOIN types and nested subqueries.
  Key Concepts: 1) INNER/LEFT/RIGHT JOINs combine rows from related tables based on matching keys. 2) Subqueries (nested SELECTs) filter or compute values used by an outer query. 3) Correlated subqueries reference the outer query's row for row-by-row evaluation.
  Tools & Environment: Tool=MySQL | Purpose=Multi-table analysis | Notes=

- Exp 12: ShopEasy E-Commerce Database — SQL Views, Indexing, and Query Performance Analysis
  Overview: Create views to simplify complex queries and apply indexing to improve query performance on an e-commerce database, then measure the impact.
  Key Concepts: 1) Views encapsulate a stored query as a virtual table for reuse and abstraction. 2) Indexes speed up lookups on frequently filtered/joined columns at the cost of extra write overhead. 3) EXPLAIN/query plans reveal whether an index is actually used and its performance impact.
  Tools & Environment: Tool=MySQL | Purpose=Views & indexing | Notes=EXPLAIN for performance analysis

Module 6: Stored Procedures & Transaction Control (0/2)
- Exp 13: Stored Procedures and Functions to Calculate Employee Salaries and Bonuses (Payroll Management System)
  Overview: Encapsulate payroll calculation logic inside reusable stored procedures and functions.
  Key Concepts: 1) Stored procedures bundle a sequence of SQL statements as a single callable unit. 2) Functions return a computed value (e.g. bonus amount) for use within other queries. 3) Parameters allow procedures/functions to be reused across different employees.
  Tools & Environment: Tool=MySQL | Purpose=Procedural SQL | Notes=

- Exp 14: Banking Transaction Processing Using BEGIN, COMMIT, ROLLBACK, and SAVEPOINT with Exception Handling in Stored Procedures
  Overview: Implement a multi-step banking transfer inside a stored procedure with explicit transaction control and error handling.
  Key Concepts: 1) BEGIN...COMMIT wraps multiple statements into one atomic transaction. 2) SAVEPOINT allows partial rollback to a marked point without undoing the entire transaction. 3) Exception handlers inside the procedure catch errors and trigger ROLLBACK to maintain consistency.
  Tools & Environment: Tool=MySQL | Purpose=Transaction control | Notes=

Module 7: Capstone Database Application (0/1)
- Exp 15: Design and Implementation of a Complete Database Application — Online Examination System
  Overview: Design and build an end-to-end database-backed application for conducting online examinations, integrating schema design, constraints, queries, and procedures learned earlier.
  Key Concepts: 1) A complete schema models students, exams, questions, and results with appropriate relationships. 2) Application logic combines DML, joins, and stored procedures to run and score an exam. 3) The system is validated end-to-end from data entry through report generation.
  Tools & Environment: Tool=MySQL (+ optional app layer) | Purpose=Capstone integration | Notes=
```

---

## 5. Data Structures and Algorithms (DSA) Lab — CONTENT BLOCK

```
COURSE NAME: Data Structures and Algorithms Laboratory
LIST OF EXPERIMENTS COUNT: 15

TOPIC ROADMAP MODULES:

Module 1: Linked Lists (0/3)
- Exp 1: Implement a Singly Linked List and Perform Insertion, Deletion, Searching, and Traversal Operations
  Overview: Build a singly linked list from scratch with node-based insertion, deletion, search, and traversal.
  Key Concepts: 1) Each node stores data and a pointer/reference to the next node. 2) Insertion/deletion at head, tail, or a given position requires pointer re-linking. 3) Traversal walks the list from head until a null reference is reached.
  Complexity: Scope=Insert at head / Search | Best=O(1) / O(1) | Avg=O(1) / O(n) | Worst=O(1) / O(n) | Space=O(n)

- Exp 2: Implement Doubly Linked List and Circular Linked List with Insertion and Deletion at Different Positions
  Overview: Extend the linked list to support backward traversal (doubly) and a circular structure with wrap-around links.
  Key Concepts: 1) Doubly linked nodes maintain both `next` and `prev` pointers, enabling bidirectional traversal. 2) Circular lists link the tail back to the head, removing the null-terminated end. 3) Insertion/deletion must correctly update all affected neighboring pointers to preserve list integrity.
  Complexity: Scope=Insert/Delete at position | Best=O(1) | Avg=O(n) | Worst=O(n) | Space=O(n)

- Exp 3: Linked List Applications — Reverse a Singly Linked List, Detect a Cycle Using Fast and Slow Pointer Technique, Merge Two Sorted Linked Lists
  Overview: Solve three classic linked-list problems building on the base structure.
  Key Concepts: 1) Reversing a list iteratively re-points each node's `next` to its predecessor. 2) The Fast/Slow (Floyd's) pointer technique detects a cycle when the two pointers meet. 3) Merging two sorted lists interleaves nodes by comparing values, producing one sorted list without extra arrays.
  Complexity: Scope=Reverse / Cycle detect / Merge | Best=O(n) each | Avg=O(n) | Worst=O(n) | Space=O(1) (reverse/cycle) / O(1) (merge, in-place)

Module 2: Stacks & Queues (0/3)
- Exp 4: Implement Stack Using Arrays and Linked Lists — Push, Pop, Peek, Display
  Overview: Implement the stack ADT using both an array-backed and a linked-list-backed representation.
  Key Concepts: 1) A stack follows Last-In-First-Out (LIFO) ordering. 2) Array-based stacks need a top index and fixed/resizable capacity; linked-list stacks push/pop at the head node. 3) Push/Pop/Peek are all designed to run in constant time.
  Complexity: Scope=Push/Pop/Peek | Best=O(1) | Avg=O(1) | Worst=O(1) | Space=O(n)

- Exp 5: Infix to Postfix Conversion, Postfix Expression Evaluation, Parentheses Balancing
  Overview: Use a stack to convert infix expressions to postfix, evaluate postfix expressions, and check balanced parentheses.
  Key Concepts: 1) Operator precedence and a stack determine when to pop operators during infix-to-postfix conversion. 2) Postfix evaluation pushes operands and applies operators to the top two stack values as they're encountered. 3) Parentheses balancing pushes opening brackets and matches/pops them against closing brackets.
  Complexity: Scope=Conversion/Evaluation/Balance check | Best=O(n) | Avg=O(n) | Worst=O(n) | Space=O(n)

- Exp 6: Circular Queue, Priority Queue, Sliding Window Maximum Using Queue
  Overview: Implement a circular queue to reuse freed slots, a priority queue where elements are served by priority, and a deque-based sliding window maximum algorithm.
  Key Concepts: 1) A circular queue wraps front/rear indices modulo capacity to reuse array space. 2) A priority queue (often heap-backed) dequeues the highest/lowest-priority element first rather than FIFO. 3) The sliding window maximum uses a deque that discards indices outside the window or with smaller values, keeping the max accessible at the front.
  Complexity: Scope=Enqueue/Dequeue / Sliding window scan | Best=O(1) / O(n) total | Avg=O(1) / O(n) | Worst=O(1) or O(log n) heap / O(n) | Space=O(n)

Module 3: Trees (0/4)
- Exp 7: Implement Binary Search Tree (BST) with Insertion, Deletion, Searching, and Traversal Operations
  Overview: Build a BST maintaining the left-smaller/right-larger ordering property, with standard operations and in/pre/post-order traversals.
  Key Concepts: 1) BST insertion/search recursively compares the target value to decide left or right subtree traversal. 2) Deletion handles three cases: leaf node, one child, and two children (successor replacement). 3) In-order traversal of a BST yields values in sorted order.
  Complexity: Scope=Insert/Search/Delete | Best=O(log n) | Avg=O(log n) | Worst=O(n) (skewed tree) | Space=O(n)

- Exp 8: Implement AVL Tree and Perform Balancing Through Rotations During Insertion
  Overview: Extend the BST with self-balancing logic, using rotation operations to keep the tree height balanced after insertion.
  Key Concepts: 1) A balance factor (height difference of left/right subtrees) is tracked at every node. 2) Left, Right, Left-Right, and Right-Left rotations restore balance when the factor exceeds ±1. 3) Maintaining balance guarantees O(log n) height regardless of insertion order.
  Complexity: Scope=Insert with rebalancing | Best=O(log n) | Avg=O(log n) | Worst=O(log n) | Space=O(n)

- Exp 9: Lowest Common Ancestor (LCA) in a Binary Tree, Huffman Coding Tree Construction, Trie (Prefix Tree) for Dictionary Applications
  Overview: Solve three distinct tree problems — finding the LCA of two nodes, building a Huffman tree for compression, and building a Trie for prefix-based word lookup.
  Key Concepts: 1) LCA is found by recursively searching both subtrees and identifying the split point where paths diverge. 2) Huffman coding repeatedly merges the two lowest-frequency nodes using a min-heap to build an optimal prefix-code tree. 3) A Trie stores strings character-by-character along tree paths, enabling fast prefix search and autocomplete.
  Complexity: Scope=LCA / Huffman build / Trie insert-search | Best=O(log n)/O(n log n)/O(L) | Avg=same | Worst=O(n)/O(n log n)/O(L) (L=word length) | Space=O(n)

- Exp 10: Implement Insertion and Searching Operations in B-Tree and B+ Tree
  Overview: Implement multi-way search trees (B-Tree and B+ Tree) commonly used in database/file-system indexing.
  Key Concepts: 1) Each B-Tree/B+ Tree node holds multiple keys and children, keeping the tree shallow for large datasets. 2) Node splitting during insertion maintains the minimum/maximum key-count invariant per node. 3) B+ Trees additionally link all leaf nodes sequentially, optimizing range queries.
  Complexity: Scope=Insert/Search | Best=O(log n) | Avg=O(log n) | Worst=O(log n) | Space=O(n)

Module 4: Graphs (0/2)
- Exp 11: Represent Graphs Using Adjacency Matrix and Adjacency List; Perform BFS and DFS
  Overview: Represent a graph two ways and implement Breadth-First and Depth-First traversal on it.
  Key Concepts: 1) An adjacency matrix stores edges in an n×n grid (fast lookup, more space); an adjacency list stores per-vertex neighbor lists (space-efficient for sparse graphs). 2) BFS explores neighbors level-by-level using a queue. 3) DFS explores as deep as possible along each branch using recursion or an explicit stack.
  Complexity: Scope=BFS/DFS | Best=O(V+E) | Avg=O(V+E) | Worst=O(V+E) | Space=O(V) (matrix: O(V²))

- Exp 12: Dijkstra's Shortest Path Algorithm, Prim's Minimum Spanning Tree Algorithm, Kruskal's Minimum Spanning Tree Algorithm
  Overview: Implement three classic greedy graph algorithms for shortest paths and minimum spanning trees.
  Key Concepts: 1) Dijkstra's Algorithm greedily expands the nearest unvisited vertex using a priority queue to find shortest paths from a source. 2) Prim's Algorithm grows a minimum spanning tree one edge at a time by always adding the cheapest edge connecting a new vertex. 3) Kruskal's Algorithm sorts all edges by weight and adds them greedily while avoiding cycles, using a Union-Find structure.
  Complexity: Scope=Dijkstra/Prim/Kruskal | Best=O((V+E) log V) | Avg=same | Worst=O((V+E) log V) / O(E log E) (Kruskal) | Space=O(V+E)

Module 5: Searching, Sorting & Hashing (0/3)
- Exp 13: Implement and Compare Linear Search and Binary Search
  Overview: Implement both search strategies and compare their efficiency on sorted vs. unsorted data.
  Key Concepts: 1) Linear search checks each element sequentially, working on unsorted data. 2) Binary search repeatedly halves the search range on sorted data by comparing against the midpoint. 3) The precondition (sortedness) is what enables binary search's logarithmic advantage.
  Complexity: Scope=Linear/Binary search | Best=O(1) | Avg=O(n)/O(log n) | Worst=O(n)/O(log n) | Space=O(1)

- Exp 14: Implement and Analyze Bubble Sort, Merge Sort, Quick Sort
  Overview: Implement three sorting algorithms with contrasting strategies and compare their time complexity behavior.
  Key Concepts: 1) Bubble Sort repeatedly swaps adjacent out-of-order elements until the array is sorted. 2) Merge Sort recursively divides the array, sorts halves, and merges them — a stable divide-and-conquer approach. 3) Quick Sort partitions around a pivot and recursively sorts each side, with performance highly dependent on pivot choice.
  Complexity: Scope=Bubble/Merge/Quick | Best=O(n)/O(n log n)/O(n log n) | Avg=O(n²)/O(n log n)/O(n log n) | Worst=O(n²)/O(n log n)/O(n²) | Space=O(1)/O(n)/O(log n)

- Exp 15: Implement Hash Tables Using Separate Chaining, Open Addressing, and Rehashing Technique
  Overview: Build a hash table and implement three collision-resolution strategies plus dynamic rehashing when load factor grows too high.
  Key Concepts: 1) Separate chaining stores colliding entries in a linked list/bucket per hash slot. 2) Open addressing probes for the next free slot (linear/quadratic/double hashing) within the same array. 3) Rehashing resizes the table and reinserts all entries once the load factor exceeds a threshold, restoring near-constant-time operations.
  Complexity: Scope=Insert/Search/Delete | Best=O(1) | Avg=O(1) | Worst=O(n) (heavy collisions) | Space=O(n)
```

---

## 6. Big Data Analytics (BDA) Lab — CONTENT BLOCK

```
COURSE NAME: Big Data Analytics Laboratory
LIST OF EXPERIMENTS COUNT: 7

TOPIC ROADMAP MODULES:

Module 1: Hadoop Setup & HDFS (0/2)
- Exp 1: Downloading and Installing Hadoop — Understanding Different Hadoop Modes, Startup Scripts, and Configuration Files
  Overview: Install Hadoop locally and configure it to run in standalone, pseudo-distributed, or fully distributed mode, understanding the key config files and startup scripts.
  Key Concepts: 1) Hadoop can run in Standalone, Pseudo-Distributed, or Fully Distributed mode depending on configuration. 2) Core config files (core-site.xml, hdfs-site.xml, mapred-site.xml, yarn-site.xml) define cluster behavior. 3) Startup scripts (start-dfs.sh, start-yarn.sh) bring up the NameNode, DataNode, and resource manager daemons.
  Tools & Environment: Tool=Hadoop | Purpose=Distributed storage & processing framework | Notes=Java required; Tool=SSH | Purpose=Node communication | Notes=Passwordless setup

- Exp 2: Hadoop Implementation of File Management Tasks — Adding Files and Directories, Retrieving Files, and Deleting Files
  Overview: Practice HDFS shell commands to manage files/directories within the distributed file system.
  Key Concepts: 1) HDFS provides a hierarchical namespace similar to a local filesystem but distributed across DataNodes. 2) `hdfs dfs` commands (`-put`, `-get`, `-ls`, `-rm`, `-mkdir`) manage files and directories. 3) Files are internally split into blocks and replicated across nodes for fault tolerance.
  Tools & Environment: Tool=HDFS CLI | Purpose=File management | Notes=

Module 2: MapReduce Programming (0/2)
- Exp 3: Implementation of Matrix Multiplication with Hadoop MapReduce
  Overview: Express matrix multiplication as a MapReduce job, distributing the computation of output elements across mappers and reducers.
  Key Concepts: 1) The Map phase emits partial products keyed by output matrix position. 2) The Shuffle/Sort phase groups partial products by key across the cluster. 3) The Reduce phase sums grouped partial products to compute each final matrix element.
  Tools & Environment: Tool=Hadoop MapReduce | Purpose=Distributed matrix computation | Notes=Java MR job

- Exp 4: Run a Basic Word Count MapReduce Program to Understand the MapReduce Paradigm
  Overview: Implement the canonical Word Count job to learn the Map-Shuffle-Reduce execution model end-to-end.
  Key Concepts: 1) The Mapper tokenizes each input line and emits (word, 1) pairs. 2) The framework shuffles and groups all values by identical key (word). 3) The Reducer sums the counts per word to produce final frequency output.
  Tools & Environment: Tool=Hadoop MapReduce | Purpose=Canonical MR example | Notes=

Module 3: Hadoop Ecosystem Tools (0/3)
- Exp 5: Installation of Hive Along with Practice Examples
  Overview: Install Apache Hive on top of Hadoop and run SQL-like queries (HiveQL) against data stored in HDFS.
  Key Concepts: 1) Hive provides a SQL-like abstraction (HiveQL) over data stored in HDFS. 2) Hive queries are translated into MapReduce/Tez jobs under the hood. 3) Tables can be internal (managed) or external, affecting how dropping a table treats the underlying data.
  Tools & Environment: Tool=Apache Hive | Purpose=SQL-on-Hadoop querying | Notes=Requires Hadoop running

- Exp 6: Installation of HBase, Installing Thrift Along with Practice Examples
  Overview: Install HBase (a NoSQL column-family store on HDFS) and Thrift for cross-language access, then practice basic CRUD operations.
  Key Concepts: 1) HBase stores data in column families within regions, suited for sparse, wide-table, real-time read/write workloads. 2) It relies on HDFS for storage and ZooKeeper for coordination. 3) Thrift provides a cross-language RPC interface for applications to interact with HBase.
  Tools & Environment: Tool=HBase | Purpose=NoSQL wide-column store | Notes=; Tool=Thrift | Purpose=Cross-language client access | Notes=; Tool=ZooKeeper | Purpose=Coordination service | Notes=

- Exp 7: Practice Importing and Exporting Data from Various Databases
  Overview: Move data between relational databases and the Hadoop ecosystem (HDFS/Hive) using an ETL/import-export tool.
  Key Concepts: 1) Import operations pull relational table data into HDFS/Hive for large-scale analytics. 2) Export operations push processed HDFS/Hive data back into a relational database. 3) Connection parameters (JDBC URL, credentials) and mapping between source/target schemas must be configured correctly.
  Tools & Environment: Tool=Sqoop (or equivalent) | Purpose=RDBMS ↔ Hadoop data transfer | Notes=JDBC driver required
```

---

## 7. Business Analytics Lab — CONTENT BLOCK

```
COURSE NAME: Business Analytics Laboratory
LIST OF EXPERIMENTS COUNT: 15

TOPIC ROADMAP MODULES:

Module 1: Excel Fundamentals (0/3)
- Exp 1: Explore the Features of MS-Excel
  Overview: Get familiar with the Excel interface — cells, formulas, formatting, and basic worksheet operations.
  Key Concepts: 1) Cells hold data or formulas referenced by row-column coordinates. 2) Formatting (column width, text wrap) improves readability of tabular data. 3) Formula entry/editing is the foundation for all later numeric analysis in Excel.
  Tools & Environment: Tool=MS Excel | Purpose=Spreadsheet basics | Notes=

- Exp 2a: Get Input from the User and Perform Numerical Operations (MAX, MIN, AVG, SUM, SQRT, ROUND)
  Overview: Apply Excel's built-in statistical/numeric functions to a set of user-entered values.
  Key Concepts: 1) MAX/MIN/AVG/SUM summarize a range of numeric values. 2) SQRT and ROUND perform mathematical transformation and precision control. 3) Function arguments reference cell ranges rather than hard-coded values, enabling reuse.
  Tools & Environment: Tool=MS Excel | Purpose=Built-in numeric functions | Notes=

- Exp 2b: Perform Data Import/Export Operations for Different File Formats
  Overview: Practice importing data into Excel (CSV, text) and exporting Excel data to other formats.
  Key Concepts: 1) Different file formats (CSV, TXT, XLSX) require different import wizards/delimiters. 2) Data types (dates, numbers, text) must be correctly interpreted during import to avoid corruption. 3) Exporting preserves or loses formatting/formulas depending on the target format chosen.
  Tools & Environment: Tool=MS Excel | Purpose=Import/export practice | Notes=

Module 2: Descriptive & Inferential Statistics (0/4)
- Exp 3: Perform Statistical Operations — Mean, Median, Mode, Standard Deviation, Variance, Skewness, Kurtosis
  Overview: Compute a full set of descriptive statistics on a dataset to summarize its central tendency, spread, and shape.
  Key Concepts: 1) Mean/Median/Mode describe central tendency from different perspectives (average, middle value, most frequent). 2) Standard deviation and variance quantify spread/dispersion around the mean. 3) Skewness and kurtosis describe the asymmetry and "tailedness" of the data's distribution.
  Tools & Environment: Tool=MS Excel (Data Analysis ToolPak) | Purpose=Descriptive statistics | Notes=

- Exp 4a: Perform Z-Test
  Overview: Run a Z-test to determine whether a sample mean differs significantly from a known population mean (large sample, known variance).
  Key Concepts: 1) The Z-test assumes a known population standard deviation and a sufficiently large sample size. 2) A Z-statistic is computed from the sample mean, population mean, and standard error. 3) The resulting p-value is compared against a significance level to accept/reject the null hypothesis.
  Tools & Environment: Tool=MS Excel (Data Analysis ToolPak) | Purpose=Hypothesis testing | Notes=

- Exp 4b: Perform T-Test
  Overview: Run a T-test to compare means when the population variance is unknown or the sample size is small.
  Key Concepts: 1) The T-test uses the sample standard deviation in place of an unknown population value. 2) Different T-test variants (one-sample, paired, two-sample) suit different comparison scenarios. 3) Degrees of freedom affect the shape of the T-distribution used for the significance test.
  Tools & Environment: Tool=MS Excel (Data Analysis ToolPak) | Purpose=Hypothesis testing | Notes=

- Exp 4c: Perform ANOVA
  Overview: Use Analysis of Variance to test whether the means of three or more groups differ significantly.
  Key Concepts: 1) ANOVA partitions total variance into between-group and within-group components. 2) An F-statistic compares these variance components to test the null hypothesis of equal group means. 3) A significant result indicates at least one group mean differs, though not which one (requiring post-hoc tests).
  Tools & Environment: Tool=MS Excel (Data Analysis ToolPak) | Purpose=Multi-group hypothesis testing | Notes=

Module 3: Data Preprocessing & Dimensionality Reduction (0/3)
- Exp 5a: Perform Data Pre-Processing Operations — Handling Missing Data
  Overview: Detect and treat missing values in a dataset using common strategies (removal, mean/median imputation, etc.).
  Key Concepts: 1) Missing data can be handled by row/column removal when missingness is minimal. 2) Imputation (mean, median, mode, or interpolation) fills gaps while preserving dataset size. 3) The choice of method affects downstream statistical and modeling results.
  Tools & Environment: Tool=MS Excel / Power BI | Purpose=Data cleaning | Notes=

- Exp 5b: Perform Data Pre-Processing Operations — Normalization
  Overview: Rescale numeric features onto a common range (e.g. 0–1 or z-scores) to prepare data for comparison or modeling.
  Key Concepts: 1) Min-Max normalization rescales values into a fixed range based on the dataset's min/max. 2) Z-score standardization centers data around a mean of 0 with unit standard deviation. 3) Normalization matters most when features are on very different scales.
  Tools & Environment: Tool=MS Excel / Power BI | Purpose=Feature scaling | Notes=

- Exp 6: Perform Dimensionality Reduction Operation Using PCA, KPCA & SVD
  Overview: Apply Principal Component Analysis, Kernel PCA, and Singular Value Decomposition to reduce the number of variables while retaining most of the data's variance.
  Key Concepts: 1) PCA projects data onto orthogonal components ordered by the variance they explain. 2) Kernel PCA extends PCA to capture non-linear structure via a kernel-transformed feature space. 3) SVD decomposes a data matrix into singular vectors/values, underlying PCA's computation and enabling low-rank approximation.
  Tools & Environment: Tool=Excel/Python add-in or equivalent | Purpose=Dimensionality reduction | Notes=

Module 4: Exploratory Data Analysis (0/2)
- Exp 7a: Perform Bivariate Analysis on the Dataset
  Overview: Examine the relationship between two variables (e.g. correlation, cross-tabulation, scatter comparison).
  Key Concepts: 1) Correlation coefficients quantify the strength/direction of a linear relationship between two numeric variables. 2) Cross-tabulation summarizes the relationship between two categorical variables. 3) Scatter plots visually reveal patterns, clusters, or outliers between two variables.
  Tools & Environment: Tool=MS Excel | Purpose=Two-variable analysis | Notes=

- Exp 7b: Perform Multivariate Analysis on the Dataset
  Overview: Extend the analysis to relationships among three or more variables simultaneously.
  Key Concepts: 1) Correlation matrices summarize pairwise relationships across many variables at once. 2) Multivariate visualization (pair plots, grouped charts) reveals interactions not visible in single-pair analysis. 3) Multivariate analysis lays groundwork for further modeling (regression, clustering) involving multiple predictors.
  Tools & Environment: Tool=MS Excel | Purpose=Multi-variable analysis | Notes=

- Exp 8: Apply and Explore Various Plotting Functions on the Dataset
  Overview: Create a range of chart types (bar, line, pie, scatter, histogram, box plot) to visualize different aspects of the dataset.
  Key Concepts: 1) Chart type should match the data type and analytical question (trend, comparison, distribution, relationship). 2) Histograms and box plots reveal distribution shape and outliers. 3) Consistent labeling and scaling are essential for a chart to communicate accurately.
  Tools & Environment: Tool=MS Excel | Purpose=Data visualization | Notes=

Module 5: Power BI Fundamentals (0/3)
- Exp 9: Explore the Features of Power BI Desktop
  Overview: Get familiar with the Power BI Desktop interface — Report, Data, and Model views, and its core building blocks.
  Key Concepts: 1) Power BI Desktop is organized into Report, Data, and Model views for building visuals, inspecting data, and defining relationships. 2) Reports are composed of visuals placed on one or more pages. 3) Power BI connects to a wide range of data sources for import or DirectQuery access.
  Tools & Environment: Tool=Power BI Desktop | Purpose=BI tool orientation | Notes=

- Exp 10: Prepare & Load Data
  Overview: Use Power Query within Power BI to connect to, clean, and load a dataset for reporting.
  Key Concepts: 1) Power Query provides a step-by-step, repeatable transformation pipeline (the "Applied Steps"). 2) Common transforms include removing columns, changing data types, filtering rows, and merging queries. 3) The loaded/transformed data becomes the model's data source for visuals.
  Tools & Environment: Tool=Power BI (Power Query) | Purpose=Data preparation | Notes=

- Exp 11: Develop the Data Model
  Overview: Define relationships between multiple loaded tables to build a coherent data model (e.g. star schema) for reporting.
  Key Concepts: 1) Relationships link tables via common keys, enabling cross-table filtering and aggregation. 2) A star schema (fact table + dimension tables) is a common, performant data-modeling pattern. 3) Cardinality and filter direction settings control how relationships propagate filters between tables.
  Tools & Environment: Tool=Power BI (Model view) | Purpose=Data modeling | Notes=

Module 6: Power BI Analytics & Reporting (0/3)
- Exp 12: Perform DAX Calculations
  Overview: Write DAX (Data Analysis Expressions) measures and calculated columns to derive custom metrics from the data model.
  Key Concepts: 1) Calculated columns are computed row-by-row and stored in the model; measures are computed dynamically based on report context. 2) DAX functions (SUM, CALCULATE, FILTER) manipulate aggregations and apply context-aware filters. 3) Context (row context vs. filter context) determines how a DAX expression evaluates within a visual.
  Tools & Environment: Tool=Power BI (DAX) | Purpose=Custom metric calculation | Notes=

- Exp 13: Design a Report
  Overview: Lay out visuals (charts, tables, KPIs, slicers) on a report page to answer specific business questions.
  Key Concepts: 1) Visual choice should match the underlying question (trend, comparison, part-to-whole, distribution). 2) Slicers and filters allow interactive drill-down without altering the underlying model. 3) Consistent layout, color, and labeling improve report readability and storytelling.
  Tools & Environment: Tool=Power BI (Report view) | Purpose=Report design | Notes=

- Exp 14: Create a Dashboard and Perform Data Analysis
  Overview: Pin key visuals into a consolidated dashboard view for at-a-glance monitoring and analysis.
  Key Concepts: 1) A dashboard aggregates pinned tiles from one or more reports into a single, often high-level, view. 2) Dashboards are typically optimized for monitoring KPIs rather than deep exploratory analysis. 3) Interactions (drill-through, tooltips) can still connect dashboard tiles back to their underlying detailed reports.
  Tools & Environment: Tool=Power BI Service/Desktop | Purpose=Dashboard creation | Notes=

Module 7: Capstone Case Study (0/1)
- Exp 15: Presentation of a Case Study — Campus Recruitment Analysis
  Overview: Apply the full analytics workflow (data prep, statistics, visualization, Power BI reporting) to a real dataset — campus recruitment — and present findings.
  Key Concepts: 1) A complete analytics workflow moves from raw data through cleaning, exploration, modeling, and visualization to actionable insight. 2) Findings should be framed around specific business questions (e.g. placement rate drivers). 3) Clear presentation (charts + narrative) is essential for communicating analytical results to a non-technical audience.
  Tools & Environment: Tool=Excel + Power BI | Purpose=End-to-end case study | Notes=Capstone deliverable
```

---

## 8. Programming in C Lab — CONTENT BLOCK

```
COURSE NAME: Programming in C Laboratory
LIST OF EXPERIMENTS COUNT: 15

TOPIC ROADMAP MODULES:

Module 1: Basics & Control Flow (0/4)
- Exp 1: Distance Between Two Points
  Overview: Read two coordinate pairs and compute the Euclidean distance between them using the distance formula.
  Key Concepts: 1) The distance formula √((x2−x1)² + (y2−y1)²) is implemented using the math library's `pow` and `sqrt`. 2) User input is read via `scanf` into float variables. 3) Formatted output (`printf` with precision specifiers) presents the computed result.
  Complexity: Scope=Distance computation | Best=O(1) | Avg=O(1) | Worst=O(1) | Space=O(1)

- Exp 2: Temperature Conversion (Fahrenheit to Celsius and Vice Versa)
  Overview: Build a menu-driven program converting temperature between Fahrenheit and Celsius scales.
  Key Concepts: 1) A menu-driven structure lets the user choose the conversion direction. 2) The formulas C = (F−32)×5/9 and F = (C×9/5)+32 implement the two conversions. 3) Conditional branching selects which formula to apply based on user choice.
  Complexity: Scope=Conversion | Best=O(1) | Avg=O(1) | Worst=O(1) | Space=O(1)

- Exp 3: Count Zeros and Ones in a Binary Number
  Overview: Read a binary number (as digits) and count how many 0s and 1s it contains.
  Key Concepts: 1) The number is processed digit-by-digit, typically via modulus and division by 10. 2) Two counters accumulate the tally of zero-digits and one-digits. 3) The loop terminates once all digits have been consumed.
  Complexity: Scope=Digit scan | Best=O(d) | Avg=O(d) | Worst=O(d) (d=number of digits) | Space=O(1)

- Exp 4: Armstrong Number Check
  Overview: Determine whether a given number equals the sum of its own digits each raised to the power of the digit count.
  Key Concepts: 1) Digit extraction uses modulus/division in a loop to isolate each digit. 2) Each digit is raised to the power of the total digit count and summed. 3) The computed sum is compared to the original number to decide Armstrong status.
  Complexity: Scope=Digit extraction & power sum | Best=O(d) | Avg=O(d) | Worst=O(d) | Space=O(1)

Module 2: Functions & Recursion (0/2)
- Exp 5: Swapping of Two Numbers Using Call by Value and Call by Reference
  Overview: Implement two swap functions to contrast pass-by-value (no effect on caller) with pass-by-reference (via pointers, effective swap).
  Key Concepts: 1) Call by value copies argument values into the function's local parameters, so changes don't persist outside. 2) Call by reference passes pointers, letting the function modify the caller's actual variables. 3) Comparing both demonstrates why pointers are needed for functions that must alter caller state.
  Complexity: Scope=Swap operation | Best=O(1) | Avg=O(1) | Worst=O(1) | Space=O(1)

- Exp 6: Recursive Programs — Fibonacci Series and GCD of Two Numbers
  Overview: Implement Fibonacci sequence generation and GCD computation using recursive function calls.
  Key Concepts: 1) Fibonacci recursion expresses F(n) = F(n−1) + F(n−2) with base cases F(0)=0, F(1)=1. 2) The Euclidean algorithm for GCD recursively reduces GCD(a,b) to GCD(b, a mod b) until b=0. 3) Each recursive call adds a stack frame, illustrating recursion's memory cost versus iteration.
  Complexity: Scope=Fibonacci(n) / GCD(a,b) | Best=O(2^n) / O(log(min(a,b))) | Avg=same | Worst=O(2^n) / O(log(min(a,b))) | Space=O(n) / O(log(min(a,b))) (call stack)

Module 3: Arrays & Matrices (0/2)
- Exp 7: Matrix Addition, Multiplication, and Transpose Using 2D Arrays
  Overview: Implement the three fundamental matrix operations using nested loops over 2D arrays.
  Key Concepts: 1) Addition operates element-wise on matrices of identical dimensions. 2) Multiplication accumulates row-column dot products, requiring compatible dimensions. 3) Transpose swaps each element's row and column index into a new matrix.
  Complexity: Scope=Matrix multiply n×n | Best=O(n³) | Avg=O(n³) | Worst=O(n³) | Space=O(n²)

- Exp 8: Largest, Smallest, Interchange, and Duplicate Count in an Array
  Overview: Scan an array to find its maximum/minimum values, swap them, and count duplicate elements.
  Key Concepts: 1) A single linear scan tracks the running max and min as it proceeds. 2) Interchanging the located max and min positions requires a temporary variable swap. 3) Duplicate counting compares each element against all others (or uses a frequency structure) to tally repeats.
  Complexity: Scope=Max/Min scan / Duplicate count | Best=O(n) / O(n²) naive | Avg=O(n) / O(n²) | Worst=O(n) / O(n²) | Space=O(1)

Module 4: Strings & Dynamic Memory (0/2)
- Exp 9: String Operations — Palindrome Checking, Reverse a String, Extract Last N Characters
  Overview: Implement three common string manipulation routines using character array indexing.
  Key Concepts: 1) Palindrome checking compares characters from both ends moving inward until they meet. 2) Reversing a string swaps characters symmetrically about its midpoint (or builds a new reversed copy). 3) Extracting the last N characters uses pointer/index arithmetic from `length − N` to the end of the string.
  Complexity: Scope=Palindrome/Reverse/Substring | Best=O(n) | Avg=O(n) | Worst=O(n) | Space=O(1) (in-place) / O(n) (copy)

- Exp 10: Dynamic Array Creation and Manipulation Using malloc(), calloc(), realloc(), and free()
  Overview: Allocate, resize, and free arrays at runtime using the four core dynamic memory management functions.
  Key Concepts: 1) `malloc` allocates uninitialized memory of a given size; `calloc` allocates and zero-initializes it. 2) `realloc` resizes a previously allocated block, potentially relocating it while preserving existing content. 3) `free` releases allocated memory back to the system, and must be called to avoid memory leaks.
  Complexity: Scope=Allocation/Resize | Best=O(1) amortized | Avg=O(1) amortized | Worst=O(n) (realloc copy) | Space=O(n)

Module 5: Structures & File Handling (0/5)
- Exp 11: Structures to Store and Display Student Information
  Overview: Define a `struct Student` grouping related fields (name, roll number, marks) and manage an array of such structures.
  Key Concepts: 1) A `struct` groups heterogeneous related fields under one user-defined type. 2) Arrays of structures allow managing multiple student records uniformly. 3) Dot notation accesses and updates individual structure member fields.
  Complexity: Scope=Structure array traversal | Best=O(1) | Avg=O(n) | Worst=O(n) | Space=O(n)

- Exp 12: Compute a Person's Age Using Structures and User-Defined Functions
  Overview: Store a birth date in a structure and compute the current age via a user-defined function.
  Key Concepts: 1) A `struct` holds day/month/year fields for the birth date. 2) A user-defined function encapsulates the age-calculation logic, taking the structure (or its fields) as input. 3) Date-difference logic must correctly handle month/day borrow cases when subtracting dates.
  Complexity: Scope=Age computation | Best=O(1) | Avg=O(1) | Worst=O(1) | Space=O(1)

- Exp 13: File Handling — Create, Write, Read, and Append Data to a File
  Overview: Practice the core file I/O operations in C using `fopen`, `fprintf`/`fscanf`, and different file modes.
  Key Concepts: 1) `fopen` with mode "w"/"r"/"a" controls whether a file is created/overwritten, read, or appended to. 2) `fprintf`/`fscanf` (or `fputs`/`fgets`) write and read formatted data to/from the file stream. 3) `fclose` must be called to flush buffers and release the file handle.
  Complexity: Scope=File read/write | Best=O(1) | Avg=O(size) | Worst=O(size) | Space=O(1) buffered

- Exp 14: File-Based Application to Store Employee Details and Evaluate Performance
  Overview: Extend file handling into a small application that persists employee records to a file and computes a performance evaluation from stored data.
  Key Concepts: 1) Structures combined with file I/O allow persisting structured records beyond a single program run. 2) Records are read back from the file and processed (e.g. average performance score) using the same struct layout used to write them. 3) Evaluation logic applies business rules (e.g. thresholds) to the read-back data to classify performance.
  Complexity: Scope=Record read + evaluation | Best=O(n) | Avg=O(n) | Worst=O(n) | Space=O(n) (or O(1) if streamed)

- Exp 15: Mini Inventory Management Application Using File Handling
  Overview: Build a small menu-driven inventory system that adds, updates, displays, and persists item records to a file.
  Key Concepts: 1) A menu-driven loop dispatches to add/update/delete/display operations on inventory records. 2) File handling persists the inventory across program runs, avoiding data loss on exit. 3) Update/delete operations typically involve reading all records, modifying the target one, and rewriting the file.
  Complexity: Scope=Add/Update/Display via file | Best=O(1) append | Avg=O(n) update/delete | Worst=O(n) | Space=O(n)
```

---

## How to use this with Antigravity AI

1. Start a new build/task in Antigravity for **one lab first** (e.g. DL Lab) — paste the FIXED STRUCTURE PROMPT followed immediately by that lab's CONTENT BLOCK in place of the `=== CONTENT BLOCK ===` line.
2. Once that build looks right, reuse it as your base project/template.
3. For each remaining lab, repeat the exact same FIXED STRUCTURE PROMPT and swap in only that lab's CONTENT BLOCK — do not edit the structure text at all, so all 8 labs stay visually and structurally identical.
4. Course name, experiment count, module names, and experiment titles/overviews/key-concepts/complexity (or tools table) are the only things that should differ between labs.
