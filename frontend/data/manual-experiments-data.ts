// =======================================================================
// V.S.B. ENGINEERING COLLEGE, KARUR (An Autonomous Institution)
// DEPARTMENT OF ARTIFICIAL INTELLIGENCE AND DATA SCIENCE
// OFFICIAL LABORATORY MANUAL EXPERIMENTS DATA (AIM, ALGORITHM, CODE, VIVA)
// =======================================================================

export interface ManualExperimentItem {
  expNo: number;
  title: string;
  aim: string;
  algorithm: string[];
  codeSnippet?: string;
  code?: string;          // alias used by lab-manual-experiments-browser
  outputSnippet?: string;
  sampleInput?: string;   // used by lab-manual-experiments-browser
  sampleOutput?: string;  // used by lab-manual-experiments-browser
  vivaVoce: { question: string; answer: string }[];
  vivaQuestions?: { question: string; answer: string }[]; // alias used by lab-manual-experiments-browser
}

export const MANUAL_EXPERIMENTS_DATA: Record<string, ManualExperimentItem[]> = {
  // =======================================================================
  // 1. DATABASE MANAGEMENT SYSTEMS (DBMS) - MD/AIDS_DBMS LAB MANUAL.md
  // =======================================================================
  "dbms-lab": [
    {
      expNo: 1,
      title: "Conceptual Database Design & Relational Schema Mapping",
      aim: "To design an Entity-Relationship (ER) diagram for an Online Shopping System and systematically map it into a normalized relational schema with primary and foreign key constraints in MySQL.",
      algorithm: [
        "Identify core business entities: Customer, Order, OrderItem, Product, and Category.",
        "Determine primary key attributes and entity cardinalities (1:1, 1:N, M:N).",
        "Resolve M:N relationships by introducing the associative entity OrderItem.",
        "Formulate CREATE TABLE DDL statements in MySQL enforcing NOT NULL, PRIMARY KEY, and FOREIGN KEY constraints.",
        "Insert representative tuples and verify relational integrity."
      ],
      codeSnippet: `CREATE DATABASE OnlineShoppingDB;
USE OnlineShoppingDB;

CREATE TABLE Category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    stock_qty INT NOT NULL DEFAULT 0,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES Category(category_id) ON DELETE SET NULL
);

CREATE TABLE Customer (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
      outputSnippet: `Query OK, 1 row affected (0.02 sec)
Database changed
Query OK, 0 rows affected (0.04 sec) - Category table created.
Query OK, 0 rows affected (0.05 sec) - Product table created with FK.
Query OK, 0 rows affected (0.04 sec) - Customer table created.`,
      vivaVoce: [
        {
          question: "How is a Many-to-Many (M:N) relationship converted into relational tables?",
          answer: "By creating an intermediate associative (junction) table containing foreign keys referencing the primary keys of both participating entities."
        },
        {
          question: "What is the effect of ON DELETE SET NULL on a foreign key?",
          answer: "When a parent row is deleted, the foreign key column in all associated child rows is automatically updated to NULL instead of cascading deletion."
        }
      ]
    },
    {
      expNo: 2,
      title: "Database Normalization (1NF, 2NF, 3NF & BCNF)",
      aim: "To normalize an unnormalized student course registration table sequentially through 1NF, 2NF, 3NF, and Boyce-Codd Normal Form (BCNF).",
      algorithm: [
        "Examine unnormalized records for repeating groups and multi-valued attributes.",
        "Convert to 1NF: ensure atomic attribute values and define composite primary key.",
        "Convert to 2NF: eliminate partial functional dependencies where non-key attributes depend on a part of the composite key.",
        "Convert to 3NF: eliminate transitive dependencies (A -> B, B -> C).",
        "Enforce BCNF: ensure for every non-trivial functional dependency X -> Y, X is a superkey."
      ],
      codeSnippet: `-- 3NF Normalized Schema
CREATE TABLE Student (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    dept_id INT
);

CREATE TABLE Department (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    hod_name VARCHAR(100)
);

CREATE TABLE Course (
    course_id VARCHAR(10) PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    credits INT CHECK (credits > 0)
);

CREATE TABLE Enrollment (
    student_id INT,
    course_id VARCHAR(10),
    grade VARCHAR(2),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);`,
      outputSnippet: `Schema decomposition successfully eliminated update, insertion, and deletion anomalies.
All relations satisfy 3NF and BCNF invariants.`,
      vivaVoce: [
        {
          question: "What is a Transitive Dependency?",
          answer: "A functional dependency X -> Z where X -> Y and Y -> Z hold, and Y is not a candidate key."
        },
        {
          question: "Why is BCNF considered stricter than 3NF?",
          answer: "3NF permits X -> Y if Y is a prime attribute even if X is not a superkey; BCNF strictly requires X to be a superkey for every non-trivial dependency."
        }
      ]
    },
    {
      expNo: 3,
      title: "ACID Properties & Transaction Control (COMMIT, ROLLBACK, SAVEPOINT)",
      aim: "To demonstrate Atomicity, Consistency, Isolation, and Durability (ACID) using explicit transactions in MySQL InnoDB.",
      algorithm: [
        "Disable autocommit mode (SET autocommit = 0).",
        "Start transaction with START TRANSACTION.",
        "Execute debit on Source Account and credit on Destination Account.",
        "Simulate failure and invoke ROLLBACK to restore initial balances (Atomicity).",
        "Introduce SAVEPOINT and rollback partially to verify checkpoint consistency.",
        "Execute COMMIT and verify physical durability in InnoDB redo logs."
      ],
      codeSnippet: `START TRANSACTION;
UPDATE Account SET balance = balance - 5000.00 WHERE account_no = 101;
SAVEPOINT sp_debit_complete;

-- Attempt credit to non-existent account
UPDATE Account SET balance = balance + 5000.00 WHERE account_no = 999;

-- Check error and rollback to savepoint
ROLLBACK TO SAVEPOINT sp_debit_complete;
-- Now credit valid account and commit
UPDATE Account SET balance = balance + 5000.00 WHERE account_no = 102;
COMMIT;`,
      outputSnippet: `Account 101 Initial: $15,000 | After Debit: $10,000
Rollback to savepoint sp_debit_complete executed.
Account 102 Final: $17,500 | Account 101 Final: $10,000
COMMIT successful. Durability verified.`,
      vivaVoce: [
        {
          question: "How does InnoDB implement the Isolation property?",
          answer: "Through Multi-Version Concurrency Control (MVCC) and Two-Phase Locking (2PL), preventing dirty reads and non-repeatable reads."
        },
        {
          question: "What is the difference between ROLLBACK and ROLLBACK TO SAVEPOINT?",
          answer: "ROLLBACK reverts the entire transaction back to START TRANSACTION, while ROLLBACK TO SAVEPOINT only reverts operations executed after that specific savepoint."
        }
      ]
    },
    {
      expNo: 4,
      title: "Analytical SQL Queries: Joins, Subqueries & Aggregations",
      aim: "To write complex analytical queries utilizing INNER JOIN, LEFT JOIN, RIGHT JOIN, correlated subqueries, and GROUP BY with HAVING.",
      algorithm: [
        "Construct multi-table joins matching foreign keys.",
        "Perform aggregate calculations (COUNT, SUM, AVG, MIN, MAX).",
        "Filter aggregated groups using HAVING clauses.",
        "Implement nested subqueries in WHERE and FROM clauses.",
        "Execute correlated subquery comparing individual values against group averages."
      ],
      codeSnippet: `-- Customers with total purchase amount exceeding department average
SELECT c.customer_id, c.full_name, SUM(p.price * oi.quantity) AS total_spent
FROM Customer c
JOIN Orders o ON c.customer_id = o.customer_id
JOIN OrderItem oi ON o.order_id = oi.order_id
JOIN Product p ON oi.product_id = p.product_id
GROUP BY c.customer_id, c.full_name
HAVING total_spent > (
    SELECT AVG(order_total) FROM (
        SELECT SUM(p2.price * oi2.quantity) AS order_total
        FROM Orders o2
        JOIN OrderItem oi2 ON o2.order_id = oi2.order_id
        JOIN Product p2 ON oi2.product_id = p2.product_id
        GROUP BY o2.order_id
    ) AS avg_orders
);`,
      outputSnippet: `+-------------+----------------+-------------+
| customer_id | full_name      | total_spent |
+-------------+----------------+-------------+
|         101 | Ramesh Kumar   |    42500.00 |
|         104 | Priya Sharma   |    38900.00 |
+-------------+----------------+-------------+
2 rows in set (0.01 sec)`,
      vivaVoce: [
        {
          question: "What is the difference between WHERE and HAVING clauses?",
          answer: "WHERE filters rows before aggregation occurs; HAVING filters aggregated grouped rows after GROUP BY execution."
        },
        {
          question: "What is a Correlated Subquery?",
          answer: "A subquery that references columns from the outer query, evaluated repeatedly once for each row processed by the outer query."
        }
      ]
    },
    {
      expNo: 5,
      title: "SQL Window Ranking Functions (ROW_NUMBER, RANK, DENSE_RANK)",
      aim: "To apply analytic window functions for sales performance ranking and cumulative revenue analysis without row collapse.",
      algorithm: [
        "Define window partitioning using OVER (PARTITION BY category_id ORDER BY total_sales DESC).",
        "Compute ROW_NUMBER() for unique continuous row indices.",
        "Apply RANK() to identify identical sales ties with sequence skips.",
        "Apply DENSE_RANK() for continuous consecutive ranks without gaps.",
        "Compute running cumulative sums using SUM() OVER (ORDER BY order_date)."
      ],
      codeSnippet: `SELECT 
    product_name,
    category_id,
    price,
    ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY price DESC) AS row_num,
    RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS rank_val,
    DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS dense_rank_val,
    SUM(price) OVER (PARTITION BY category_id ORDER BY price DESC) AS running_category_total
FROM Product;`,
      outputSnippet: `+--------------+-------------+-------+---------+----------+----------------+------------------------+
| product_name | category_id | price | row_num | rank_val | dense_rank_val | running_category_total |
+--------------+-------------+-------+---------+----------+----------------+------------------------+
| Laptop Pro   |           1 | 85000 |       1 |        1 |              1 |                  85000 |
| Gaming PC    |           1 | 85000 |       2 |        1 |              1 |                 170000 |
| Ultrabook    |           1 | 62000 |       3 |        3 |              2 |                 232000 |
+--------------+-------------+-------+---------+----------+----------------+------------------------+`,
      vivaVoce: [
        {
          question: "How do window functions differ from GROUP BY?",
          answer: "GROUP BY collapses multiple rows into a single aggregated summary row, whereas window functions calculate aggregates while preserving each original individual row."
        },
        {
          question: "What does the PARTITION BY subclause accomplish in an OVER() clause?",
          answer: "It divides the result set into distinct partitions to which the window function is independently applied."
        }
      ]
    },
    {
      expNo: 6,
      title: "Database Programmability: Stored Procedures & Triggers",
      aim: "To develop PL/SQL stored procedures with IN/OUT parameters and database triggers for automated transaction auditing.",
      algorithm: [
        "Create an AuditLog table to record historical account balance mutations.",
        "Define a BEFORE UPDATE trigger on Account to log user, old balance, new balance, and timestamp.",
        "Create a stored procedure TransferFunds(in_from, in_to, in_amt, out_status).",
        "Implement conditional balance validation and error rollback within the procedure.",
        "Execute procedure call and verify automatic trigger execution in AuditLog."
      ],
      codeSnippet: `DELIMITER //
CREATE TRIGGER trg_account_audit
AFTER UPDATE ON Account
FOR EACH ROW
BEGIN
    INSERT INTO AuditLog (account_no, old_balance, new_balance, changed_at, action_type)
    VALUES (OLD.account_no, OLD.balance, NEW.balance, NOW(), 'UPDATE');
END //

CREATE PROCEDURE TransferFunds(
    IN p_from INT,
    IN p_to INT,
    IN p_amount DECIMAL(10,2),
    OUT p_status VARCHAR(50)
)
BEGIN
    DECLARE v_bal DECIMAL(10,2);
    SELECT balance INTO v_bal FROM Account WHERE account_no = p_from;
    
    IF v_bal >= p_amount THEN
        START TRANSACTION;
        UPDATE Account SET balance = balance - p_amount WHERE account_no = p_from;
        UPDATE Account SET balance = balance + p_amount WHERE account_no = p_to;
        COMMIT;
        SET p_status = 'TRANSFER SUCCESSFUL';
    ELSE
        SET p_status = 'INSUFFICIENT FUNDS';
    END IF;
END //
DELIMITER ;`,
      outputSnippet: `CALL TransferFunds(101, 102, 3000.00, @status);
SELECT @status;
+---------------------+
| @status             |
+---------------------+
| TRANSFER SUCCESSFUL |
+---------------------+
SELECT * FROM AuditLog ORDER BY log_id DESC LIMIT 2;
Logged 2 automated audit rows via trigger.`,
      vivaVoce: [
        {
          question: "What is the difference between a BEFORE and AFTER trigger?",
          answer: "A BEFORE trigger runs prior to data modification and can validate or modify values; an AFTER trigger runs after data modification and is used for audit logging or cascading updates."
        },
        {
          question: "What are the advantages of Stored Procedures?",
          answer: "Reduced network traffic, precompiled execution plans for improved speed, and centralized business logic with fine-grained access control."
        }
      ]
    }
  ],

  // =======================================================================
  // 2. CLOUD SERVICE MANAGEMENT (CSM) - MD/CSM LAb manual updated.md
  // =======================================================================
  "cloud-service-management": [
    {
      expNo: 1,
      title: "Cloud Organization Architecture & Role-Based Access Control (RBAC)",
      aim: "To establish a multi-account AWS Organization with Organizational Units (OUs), Service Control Policies (SCPs), and cross-account IAM Role delegation.",
      algorithm: [
        "Create AWS Management master account and enable AWS Organizations.",
        "Create dedicated Organizational Units (OUs): Production, Staging, and Security.",
        "Invite or create member AWS accounts and allocate them to respective OUs.",
        "Author JSON Service Control Policies (SCPs) restricting allowed deployment regions to ap-south-1.",
        "Attach SCPs to OUs to enforce organizational security guardrails.",
        "Configure cross-account IAM roles with trust policies for administrator access."
      ],
      codeSnippet: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RestrictRegionPolicy",
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "StringNotEquals": {
          "aws:RequestedRegion": [
            "ap-south-1",
            "us-east-1"
          ]
        }
      }
    }
  ]
}`,
      outputSnippet: `AWS Organizations Root ID: r-abc123
Created OUs:
  - ou-prod-001 (Production Workloads)
  - ou-stage-002 (Staging & Testing)
SCP 'RestrictRegionPolicy' attached to ou-prod-001 successfully.
Cross-account role 'OrganizationAccountAccessRole' active.`,
      vivaVoce: [
        {
          question: "What is the role of an AWS Service Control Policy (SCP)?",
          answer: "SCPs define the maximum permission boundaries across accounts in an organization, overriding even local account administrators."
        },
        {
          question: "Why are multiple AWS accounts recommended over a single account with multiple VPCs?",
          answer: "Multiple accounts provide complete isolation of billing, blast radius containment, distinct security boundaries, and strict administrative segregation."
        }
      ]
    },
    {
      expNo: 2,
      title: "Cost Modeling & TCO Analysis using AWS Pricing Calculator",
      aim: "To create a comprehensive cloud cost model for a multi-tier web application and perform Total Cost of Ownership (TCO) and cost-benefit analysis.",
      algorithm: [
        "Define target architecture: 2x EC2 t3.large instances, 1x Multi-AZ RDS PostgreSQL db.m5.large, 500GB S3 Standard, CloudFront CDN, and Application Load Balancer.",
        "Open AWS Pricing Calculator (calculator.aws).",
        "Add Compute specs: configure On-Demand vs 1-Year All-Upfront Savings Plans.",
        "Add Database specs: Multi-AZ deployment with 200GB GP3 storage.",
        "Calculate monthly egress traffic (1,000 GB) and S3 API call estimates.",
        "Export detailed spreadsheet summary and compare on-premises server capital cost vs cloud operational expenditure."
      ],
      codeSnippet: `# AWS CLI Command to inspect instance pricing
aws pricing get-products \\
    --service-code AmazonEC2 \\
    --filters "Type=TERM_MATCH,Field=instanceType,Value=t3.large" \\
              "Type=TERM_MATCH,Field=location,Value=Asia Pacific (Mumbai)" \\
    --region us-east-1`,
      outputSnippet: `--- Monthly Cloud Cost Breakdown (ap-south-1) ---
1. Amazon EC2 (2x t3.large, Savings Plan 1-Yr): $62.80/month
2. Amazon RDS PostgreSQL (db.m5.large Multi-AZ): $184.20/month
3. Application Load Balancer (ALB + LCU): $22.50/month
4. Amazon S3 (500 GB Standard + 10,000 PUTs): $12.30/month
5. CloudFront Data Transfer Out (1 TB): $85.00/month
------------------------------------------------
Estimated Monthly Total: $366.80
Estimated 3-Year TCO Savings vs On-Premises CapEx: 42.6%`,
      vivaVoce: [
        {
          question: "What is the difference between CapEx and OpEx in cloud computing?",
          answer: "CapEx (Capital Expenditure) requires upfront capital investment for physical servers; OpEx (Operational Expenditure) is pay-as-you-go based on actual consumption."
        },
        {
          question: "How do AWS Savings Plans differ from standard Reserved Instances?",
          answer: "Savings Plans offer flexible hourly spend commitments across instance families, OS, and regions, whereas standard RIs are tied to specific instance types and configurations."
        }
      ]
    },
    {
      expNo: 3,
      title: "Proactive Cloud Resource Monitoring & CloudWatch Alarms",
      aim: "To configure Amazon CloudWatch alarms monitoring EC2 CPU utilization thresholds and deliver automated incident notifications via Amazon SNS.",
      algorithm: [
        "Create an Amazon SNS Topic 'CloudOperationsAlerts' and subscribe operational email addresses.",
        "Confirm SNS email subscription.",
        "Navigate to CloudWatch Alarms and select metric: AWS/EC2 -> CPUUtilization.",
        "Define static threshold: CPUUtilization >= 80% for 2 consecutive 1-minute evaluation periods.",
        "Configure alarm state action: Publish to 'CloudOperationsAlerts' SNS Topic.",
        "Stress test EC2 CPU using 'stress-ng --cpu 4 --timeout 180s' and verify automated alert receipt."
      ],
      codeSnippet: `aws cloudwatch put-metric-alarm \\
    --alarm-name "HighCPUUtilizationAlarm" \\
    --metric-name "CPUUtilization" \\
    --namespace "AWS/EC2" \\
    --statistic "Average" \\
    --period 60 \\
    --threshold 80 \\
    --comparison-operator "GreaterThanOrEqualToThreshold" \\
    --dimensions Name=InstanceId,Value=i-0123456789abcdef0 \\
    --evaluation-periods 2 \\
    --alarm-actions arn:aws:sns:ap-south-1:123456789012:CloudOperationsAlerts`,
      outputSnippet: `Alarm HighCPUUtilizationAlarm created successfully.
Simulating CPU load... CPUUtilization reached 94.2%.
CloudWatch Alarm State Transition: OK -> ALARM
Amazon SNS Notification dispatched to admin@vsb.ac.in:
"Alarm HighCPUUtilizationAlarm triggered at 2026-09-27T10:15:00Z."`,
      vivaVoce: [
        {
          question: "What are CloudWatch Metrics and Dimensions?",
          answer: "Metrics are time-ordered data points representing resource performance; Dimensions are key-value pairs that uniquely identify a metric (e.g., InstanceId=i-xxx)."
        },
        {
          question: "What are the three states of a CloudWatch Alarm?",
          answer: "OK (within threshold), ALARM (exceeded threshold for evaluation periods), and INSUFFICIENT_DATA (not enough data to determine status)."
        }
      ]
    },
    {
      expNo: 4,
      title: "Financial Governance: Cloud Billing Alarms & AWS Budgets",
      aim: "To establish proactive cloud financial management using AWS Budgets and CloudWatch EstimatedCharges billing alerts.",
      algorithm: [
        "Enable 'Receive Billing Alerts' in the AWS Management Console Billing Preferences.",
        "Create an AWS Cost Budget with a defined monthly threshold of $100.00 USD.",
        "Configure notification triggers at 50% (actual), 80% (actual), and 100% (forecasted).",
        "Set up an SNS notification channel and incident email distribution.",
        "Configure CloudWatch billing alarm on metric EstimatedCharges in us-east-1.",
        "Verify budget tracking dashboard."
      ],
      codeSnippet: `aws budgets create-budget \\
    --account-id 123456789012 \\
    --budget '{
        "BudgetName": "MonthlyDepartmentBudget",
        "BudgetLimit": { "Amount": "100", "Unit": "USD" },
        "CostFilters": {},
        "CostTypes": { "IncludeTax": true, "IncludeSubscription": true, "UseBlended": false },
        "TimeUnit": "MONTHLY",
        "BudgetType": "COST"
    }'`,
      outputSnippet: `Budget 'MonthlyDepartmentBudget' active.
Current Month Spend: $34.20 / $100.00 (34.2% consumed).
Forecasted End-of-Month Spend: $88.50 (Within 100% limit).
Alert Triggers Configured: [50% Actual, 80% Actual, 100% Forecasted].`,
      vivaVoce: [
        {
          question: "Why must CloudWatch Billing Alarms be configured in us-east-1 (N. Virginia)?",
          answer: "Because all global billing metric telemetry from AWS worldwide accounts aggregates exclusively into the us-east-1 region."
        },
        {
          question: "What is the difference between an Actual and Forecasted budget alert?",
          answer: "Actual alerts trigger when cumulative spend crosses a threshold; Forecasted alerts trigger proactively if machine learning trends project spend will exceed the threshold by month-end."
        }
      ]
    },
    {
      expNo: 5,
      title: "Multi-Cloud Cost & Performance Comparison: AWS vs Azure vs GCP",
      aim: "To benchmark compute, database, and network egress costs for an enterprise web application across AWS, Microsoft Azure, and Google Cloud Platform (GCP).",
      algorithm: [
        "Establish standardized SKU requirements: 4 vCPU, 16GB RAM compute, 100GB managed SQL database, and 500GB egress.",
        "Gather AWS pricing: EC2 m5.xlarge + RDS MySQL db.m5.large.",
        "Gather Azure pricing: Standard_D4s_v5 VM + Azure SQL Database General Purpose.",
        "Gather GCP pricing: e2-standard-4 VM + Cloud SQL for MySQL db-n1-standard-4.",
        "Compare regional pricing (India Central / ap-south-1).",
        "Synthesize comprehensive trade-off matrix recommending optimal cloud provider."
      ],
      codeSnippet: `# Multi-cloud pricing benchmark schema
provider_metrics = {
    "AWS": {"compute": 140.16, "db": 158.40, "egress": 45.00, "total": 343.56},
    "Azure": {"compute": 137.24, "db": 162.10, "egress": 43.50, "total": 342.84},
    "GCP": {"compute": 128.50, "db": 149.20, "egress": 42.00, "total": 319.70}
}`,
      outputSnippet: `--- Cross-Cloud Provider Comparison (4 vCPU / 16GB RAM Stack) ---
Provider | Compute/mo | Database/mo | Egress/mo | Total Monthly
---------------------------------------------------------------
AWS      | $140.16    | $158.40     | $45.00    | $343.56
Azure    | $137.24    | $162.10     | $43.50    | $342.84
GCP      | $128.50    | $149.20     | $42.00    | $319.70

Verdict: GCP delivers a 6.9% cost advantage for dynamic compute via committed use discounts.`,
      vivaVoce: [
        {
          question: "What are Sustained Use Discounts in Google Cloud Platform?",
          answer: "Automatic discounts applied by GCP when an instance runs for a substantial portion of the billing month, without requiring upfront contract commitments."
        },
        {
          question: "What key factors influence multi-cloud provider selection?",
          answer: "Geographic latency, pricing discounts, native enterprise tooling integration, data egress fees, and service level agreements (SLAs)."
        }
      ]
    }
  ],

  // =======================================================================
  // 3. DATA STRUCTURES & ALGORITHMS (DSA) - MD/AIDS_DSA LAB MANUAL.md
  // =======================================================================
  "data-structures": [
    {
      expNo: 1,
      title: "Singly Linked List Implementation & Manipulation",
      aim: "To implement a Singly Linked List in Java and perform insertion, deletion, searching, and traversal operations.",
      algorithm: [
        "Create a Node class with integer data and Node next reference.",
        "Implement insertAtBeginning(val): allocate node, set next to head, update head.",
        "Implement insertAtEnd(val): traverse to last node, set last.next = new node.",
        "Implement deleteByValue(val): find target node, update previous.next = target.next.",
        "Implement display(): traverse from head to null printing node values."
      ],
      codeSnippet: `class Node {
    int data;
    Node next;
    Node(int d) { data = d; next = null; }
}

public class SinglyLinkedList {
    Node head;

    public void insert(int data) {
        Node newNode = new Node(data);
        if (head == null) { head = newNode; return; }
        Node curr = head;
        while (curr.next != null) curr = curr.next;
        curr.next = newNode;
    }

    public void display() {
        Node curr = head;
        while (curr != null) {
            System.out.print(curr.data + " -> ");
            curr = curr.next;
        }
        System.out.println("null");
    }
}`,
      outputSnippet: `Inserted: 10, 20, 30, 40
List content: 10 -> 20 -> 30 -> 40 -> null
Deleted node: 20
Updated list: 10 -> 30 -> 40 -> null`,
      vivaVoce: [
        {
          question: "What is the time complexity of searching an element in a Singly Linked List?",
          answer: "O(n) in both average and worst cases because elements must be inspected sequentially from the head pointer."
        },
        {
          question: "What is the primary advantage of a Linked List over an Array?",
          answer: "Dynamic memory allocation without requiring contiguous physical memory, and O(1) insertions/deletions when pointer references are known."
        }
      ]
    },
    {
      expNo: 2,
      title: "Stack Implementation & Infix to Postfix Conversion",
      aim: "To implement a Stack using arrays and apply it to convert an infix arithmetic expression into postfix notation.",
      algorithm: [
        "Initialize operator stack and output string buffer.",
        "Scan the infix expression from left to right character by character.",
        "If the scanned character is an operand, append it to output.",
        "If '(', push it onto the operator stack.",
        "If ')', repeatedly pop from stack to output until '(' is encountered.",
        "If operator, pop operators of greater or equal precedence before pushing the new operator."
      ],
      codeSnippet: `public static String infixToPostfix(String exp) {
    StringBuilder result = new StringBuilder();
    Stack<Character> stack = new Stack<>();
    for (char c : exp.toCharArray()) {
        if (Character.isLetterOrDigit(c)) result.append(c);
        else if (c == '(') stack.push(c);
        else if (c == ')') {
            while (!stack.isEmpty() && stack.peek() != '(') result.append(stack.pop());
            stack.pop();
        } else {
            while (!stack.isEmpty() && precedence(c) <= precedence(stack.peek()))
                result.append(stack.pop());
            stack.push(c);
        }
    }
    while (!stack.isEmpty()) result.append(stack.pop());
    return result.toString();
}`,
      outputSnippet: `Infix Expression: a+b*(c^d-e)^(f+g*h)-i
Converted Postfix: abcd^e-fgh*+^*+i-
Evaluation time: 2ms | Stack depth peak: 6`,
      vivaVoce: [
        {
          question: "Why are postfix expressions preferred by compiler execution engines?",
          answer: "Postfix expressions eliminate parentheses and ambiguity of operator precedence, enabling direct evaluation using a single operand stack in O(n) time."
        },
        {
          question: "What error occurs when popping an empty stack?",
          answer: "Stack Underflow error."
        }
      ]
    },
    {
      expNo: 3,
      title: "Binary Search Tree (BST) & AVL Tree Self-Balancing",
      aim: "To implement a self-balancing AVL Tree performing Single and Double Rotations (LL, RR, LR, RL) upon insertion.",
      algorithm: [
        "Perform standard BST insertion recursively.",
        "Update the height of the current ancestor node: 1 + max(height(left), height(right)).",
        "Calculate Balance Factor: balance = height(left) - height(right).",
        "If balance > 1 and key < left.key, execute Right Rotation (LL Case).",
        "If balance < -1 and key > right.key, execute Left Rotation (RR Case).",
        "If balance > 1 and key > left.key, execute Left-Right Rotation (LR Case).",
        "If balance < -1 and key < right.key, execute Right-Left Rotation (RL Case)."
      ],
      codeSnippet: `AVLNode rightRotate(AVLNode y) {
    AVLNode x = y.left;
    AVLNode T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(height(y.left), height(y.right)) + 1;
    x.height = Math.max(height(x.left), height(x.right)) + 1;
    return x;
}

AVLNode leftRotate(AVLNode x) {
    AVLNode y = x.right;
    AVLNode T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(height(x.left), height(x.right)) + 1;
    y.height = Math.max(height(y.left), height(y.right)) + 1;
    return y;
}`,
      outputSnippet: `Inserting keys: 10, 20, 30, 40, 50, 25
Tree unbalanced at node 10. Executed Left Rotation (RR).
Tree unbalanced at node 30. Executed Right-Left Rotation (RL).
Inorder Traversal: 10 20 25 30 40 50
AVL Tree height maintained at 3. Balance factors verified in [-1, 0, 1].`,
      vivaVoce: [
        {
          question: "What is the allowable balance factor for every node in an AVL tree?",
          answer: "-1, 0, or +1. If it becomes +2 or -2, rotation rebalancing is required."
        },
        {
          question: "What is the time complexity of search, insert, and delete in an AVL Tree?",
          answer: "O(log n) in all cases because the tree height is strictly bounded by 1.44 * log2(n)."
        }
      ]
    },
    {
      expNo: 4,
      title: "Graph Traversal Algorithms: Breadth-First & Depth-First Search",
      aim: "To represent graphs using adjacency lists and implement Breadth-First Search (BFS) and Depth-First Search (DFS).",
      algorithm: [
        "Initialize boolean visited array of size V.",
        "BFS: Use a FIFO Queue. Enqueue start vertex and mark visited. While queue not empty, dequeue vertex, visit all unvisited neighbors, mark them visited, and enqueue.",
        "DFS: Use recursion / LIFO Stack. Mark current vertex visited. For each unvisited adjacent neighbor, recursively invoke DFS.",
        "Track discovery and finish sequences for topological ordering."
      ],
      codeSnippet: `void BFS(int startVertex) {
    boolean[] visited = new boolean[V];
    Queue<Integer> queue = new LinkedList<>();
    visited[startVertex] = true;
    queue.add(startVertex);

    while (!queue.isEmpty()) {
        int v = queue.poll();
        System.out.print(v + " ");
        for (int neighbor : adj[v]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.add(neighbor);
            }
        }
    }
}`,
      outputSnippet: `Graph with 6 vertices and 7 edges initialized.
BFS Traversal from vertex 0: 0 1 2 3 4 5
DFS Traversal from vertex 0: 0 1 3 5 4 2
Cycle Detection: No cycle detected in Directed Acyclic Graph.`,
      vivaVoce: [
        {
          question: "What is the space complexity of BFS vs DFS?",
          answer: "BFS uses O(V) space proportional to maximum graph breadth; DFS uses O(V) space proportional to maximum path depth (call stack)."
        },
        {
          question: "Which data structures underpin BFS and DFS?",
          answer: "BFS relies on a FIFO Queue; DFS relies on a LIFO Stack (or function call stack via recursion)."
        }
      ]
    },
    {
      expNo: 5,
      title: "Shortest Path Algorithm: Dijkstra's Greedy Method",
      aim: "To compute single-source shortest paths on a weighted directed graph using Dijkstra's algorithm with a Min-Priority Queue.",
      algorithm: [
        "Initialize distance array dist[] with infinity, setting dist[source] = 0.",
        "Insert (0, source) into Min-Priority Queue.",
        "While Priority Queue is not empty, extract vertex u with minimum dist[u].",
        "For each adjacent neighbor v of u with edge weight w: if dist[u] + w < dist[v], update dist[v] = dist[u] + w and insert (dist[v], v) into Priority Queue.",
        "Output final shortest distance from source to all vertices."
      ],
      codeSnippet: `public int[] dijkstra(int src) {
    int[] dist = new int[V];
    Arrays.fill(dist, Integer.MAX_VALUE);
    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
    dist[src] = 0;
    pq.offer(new int[]{src, 0});

    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int u = curr[0], d = curr[1];
        if (d > dist[u]) continue;

        for (Edge e : adj[u]) {
            if (dist[u] + e.weight < dist[e.to]) {
                dist[e.to] = dist[u] + e.weight;
                pq.offer(new int[]{e.to, dist[e.to]});
            }
        }
    }
    return dist;
}`,
      outputSnippet: `Source Vertex: 0 (College Gateway)
Shortest Distances:
  Node 0 -> Node 1 (Library): 4 km
  Node 0 -> Node 2 (AI Lab): 2 km
  Node 0 -> Node 3 (Hostel): 5 km
  Node 0 -> Node 4 (Auditorium): 7 km`,
      vivaVoce: [
        {
          question: "What is the time complexity of Dijkstra's algorithm with a Binary Min-Heap?",
          answer: "O((V + E) log V), where V is the number of vertices and E is the number of edges."
        },
        {
          question: "Can Dijkstra's algorithm handle negative edge weights?",
          answer: "No, Dijkstra assumes greedy non-decreasing path costs; for negative edge weights, Bellman-Ford must be used."
        }
      ]
    }
  ],

  // =======================================================================
  // 4. OBJECT ORIENTED PROGRAMMING (OOP JAVA) - MD/AIDS_OOP_final lab manual 02072026.md
  // =======================================================================
  "oops-java": [
    {
      expNo: 1,
      title: "Encapsulation & Domain Modeling: Bank Account Management",
      aim: "To develop a Java application modeling bank accounts with deposit, withdrawal, balance inquiry, and transaction integrity checks.",
      algorithm: [
        "Create BankAccount class with private members: accountNumber, accountHolder, and balance.",
        "Implement parameterized constructor initializing account credentials.",
        "Implement deposit(amount): validate amount > 0 and increment balance.",
        "Implement withdraw(amount): verify balance - amount >= minimumBalance before decrementing.",
        "Provide public getter methods ensuring secure access."
      ],
      codeSnippet: `public class BankAccount {
    private String accountNumber;
    private String holderName;
    private double balance;
    private static final double MIN_BALANCE = 1000.0;

    public BankAccount(String accNo, String name, double initialDeposit) {
        this.accountNumber = accNo;
        this.holderName = name;
        this.balance = initialDeposit;
    }

    public synchronized boolean withdraw(double amount) {
        if (amount > 0 && (balance - amount) >= MIN_BALANCE) {
            balance -= amount;
            return true;
        }
        return false;
    }

    public double getBalance() { return balance; }
}`,
      outputSnippet: `Account ACC-8891 initialized for 'V. Anbarasu' with $15,000.00
Deposit: $5,000.00 | New Balance: $20,000.00
Withdrawal: $18,000.00 | Status: SUCCESS | Remaining Balance: $2,000.00
Withdrawal: $1,500.00 | Status: REJECTED (Minimum balance of $1,000.00 required)`,
      vivaVoce: [
        {
          question: "Why are account fields declared private in Encapsulation?",
          answer: "To prevent external direct tampering and enforce strict business logic and validation through setter/getter methods."
        },
        {
          question: "What is the purpose of the 'this' keyword in Java constructors?",
          answer: "It eliminates ambiguity by referencing the current class instance variable when parameter names shadow field names."
        }
      ]
    },
    {
      expNo: 2,
      title: "Inheritance Hierarchies & Method Overriding: Employee Payroll",
      aim: "To demonstrate inheritance, constructors, super keyword, and polymorphic salary computation in an enterprise Employee hierarchy.",
      algorithm: [
        "Create abstract base class Employee with common attributes (id, name, baseSalary) and abstract calculateNetSalary().",
        "Derive subclasses: Manager, Developer, and HRSpecialist.",
        "In Manager, add bonus and allowance calculations, invoking super constructor.",
        "In Developer, add overtime incentive computation.",
        "Override calculateNetSalary() in each derived class and print structured payroll."
      ],
      codeSnippet: `abstract class Employee {
    protected int id;
    protected String name;
    protected double baseSalary;

    public Employee(int id, String name, double baseSalary) {
        this.id = id; this.name = name; this.baseSalary = baseSalary;
    }
    public abstract double calculateNetSalary();
}

class Manager extends Employee {
    private double performanceBonus;

    public Manager(int id, String name, double base, double bonus) {
        super(id, name, base);
        this.performanceBonus = bonus;
    }

    @Override
    public double calculateNetSalary() {
        return baseSalary + performanceBonus + (baseSalary * 0.15); // 15% allowance
    }
}`,
      outputSnippet: `--- Enterprise Payroll Summary ---
Manager: Rajesh Nair | Base: $80,000 | Bonus: $15,000 | Net: $107,000.00
Developer: Sneha Menon | Base: $65,000 | Overtime: $8,000 | Net: $73,000.00
Total Department Payroll Disbursed: $180,000.00`,
      vivaVoce: [
        {
          question: "Can an abstract class be instantiated directly in Java?",
          answer: "No, abstract classes cannot be instantiated with 'new'; they serve as blueprints to be extended by concrete subclasses."
        },
        {
          question: "What is the role of the '@Override' annotation?",
          answer: "It instructs the compiler to verify that the method actually overrides a signature present in a superclass or interface, catching typographical errors."
        }
      ]
    },
    {
      expNo: 3,
      title: "Custom Exception Handling Architecture",
      aim: "To create user-defined checked exceptions (InvalidBalanceException, AgeOutOfBoundsException) and handle them with try-catch-finally.",
      algorithm: [
        "Create custom exception class InvalidBalanceException extending java.lang.Exception.",
        "Define constructor accepting error message string and passing it to super(message).",
        "In BankAccount withdrawal logic, throw InvalidBalanceException when withdrawal amount exceeds permissible balance.",
        "In driver application, enclose critical invocations in try-catch blocks.",
        "Incorporate finally block to release locks and close resources."
      ],
      codeSnippet: `class InvalidBalanceException extends Exception {
    public InvalidBalanceException(String message) {
        super(message);
    }
}

public class AccountService {
    public static void debit(double balance, double amount) throws InvalidBalanceException {
        if (amount > balance) {
            throw new InvalidBalanceException("Debit failed: Amount $" + amount + " exceeds balance $" + balance);
        }
        System.out.println("Debit processed. Remaining: $" + (balance - amount));
    }
}`,
      outputSnippet: `Attempting withdrawal of $25,000 from balance $10,000...
CAUGHT CUSTOM EXCEPTION: InvalidBalanceException: Debit failed: Amount $25000.0 exceeds balance $10000.0
Finally block executed: Resource handles closed.`,
      vivaVoce: [
        {
          question: "What is the difference between 'throw' and 'throws' in Java?",
          answer: "'throw' explicitly triggers an exception instance within method body; 'throws' declares that a method signature might propagate an exception to callers."
        },
        {
          question: "When is the finally block executed?",
          answer: "The finally block always executes regardless of whether an exception was thrown, caught, or omitted, unless System.exit(0) is called."
        }
      ]
    },
    {
      expNo: 4,
      title: "2D Matrix Algorithms: Spiral Order & Wave Order Traversal",
      aim: "To implement algorithms for printing a 2D matrix in spiral boundary order and column-wise wave order.",
      algorithm: [
        "Initialize 4 boundary pointers: top = 0, bottom = rows - 1, left = 0, right = cols - 1.",
        "Traverse from left to right along top boundary; increment top.",
        "Traverse from top to bottom along right boundary; decrement right.",
        "If top <= bottom, traverse from right to left along bottom boundary; decrement bottom.",
        "If left <= right, traverse from bottom to top along left boundary; increment left.",
        "Repeat while top <= bottom and left <= right."
      ],
      codeSnippet: `public static List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> ans = new ArrayList<>();
    int top = 0, bottom = matrix.length - 1;
    int left = 0, right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        for (int i = left; i <= right; i++) ans.add(matrix[top][i]);
        top++;
        for (int i = top; i <= bottom; i++) ans.add(matrix[i][right]);
        right--;
        if (top <= bottom) {
            for (int i = right; i >= left; i--) ans.add(matrix[bottom][i]);
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) ans.add(matrix[i][left]);
            left++;
        }
    }
    return ans;
}`,
      outputSnippet: `Input 4x4 Matrix:
[ 1,  2,  3,  4 ]
[ 5,  6,  7,  8 ]
[ 9, 10, 11, 12 ]
[13, 14, 15, 16 ]

Spiral Traversal Output:
1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10`,
      vivaVoce: [
        {
          question: "What is the time complexity of Spiral Matrix Traversal?",
          answer: "O(R * C) where R is rows and C is columns, because every cell is visited exactly once."
        },
        {
          question: "Why must condition checks (top <= bottom, left <= right) be verified inside the loop?",
          answer: "To avoid re-traversing rows or columns in non-square matrices after boundary indices cross."
        }
      ]
    },
    {
      expNo: 5,
      title: "Multi-Threading & Concurrency: Producer-Consumer Model",
      aim: "To implement thread synchronization in Java using wait(), notify(), and synchronized blocks for a bounded buffer.",
      algorithm: [
        "Create shared BoundedBuffer class with capacity N.",
        "Implement produce(item): wait() while buffer is full; add item; notifyAll().",
        "Implement consume(): wait() while buffer is empty; remove item; notifyAll(); return item.",
        "Create Producer and Consumer Runnable threads.",
        "Spawn threads and observe thread-safe interleaved execution."
      ],
      codeSnippet: `class BoundedBuffer {
    private final Queue<Integer> queue = new LinkedList<>();
    private final int capacity;

    public BoundedBuffer(int cap) { this.capacity = cap; }

    public synchronized void produce(int val) throws InterruptedException {
        while (queue.size() == capacity) wait();
        queue.add(val);
        notifyAll();
    }

    public synchronized int consume() throws InterruptedException {
        while (queue.isEmpty()) wait();
        int val = queue.poll();
        notifyAll();
        return val;
    }
}`,
      outputSnippet: `Producer Thread spawned [Buffer Size: 5]
Consumer Thread spawned
[PRODUCED] Item 101 | Buffer Count: 1
[PRODUCED] Item 102 | Buffer Count: 2
[CONSUMED] Item 101 | Buffer Count: 1
[PRODUCED] Item 103 | Buffer Count: 2
Thread synchronization verified without race conditions or deadlock.`,
      vivaVoce: [
        {
          question: "Why must wait() and notify() be called from a synchronized context?",
          answer: "Because they operate on the monitor lock of the object; invoking them without holding the lock raises IllegalMonitorStateException."
        },
        {
          question: "Why is wait() placed inside a while loop rather than an if statement?",
          answer: "To guard against spurious wakeups, ensuring the condition is re-verified before proceeding."
        }
      ]
    }
  ],

  // =======================================================================
  // 5. BIG DATA ANALYTICS (BDA) - MD/BDA AIDS LAB  MANUAL.md
  // =======================================================================
  "big-data-analytics": [
    {
      expNo: 1,
      title: "Hadoop Distributed File System (HDFS) Configuration & Management",
      aim: "To install and configure Apache Hadoop in pseudo-distributed mode and perform distributed file management tasks via HDFS CLI.",
      algorithm: [
        "Configure Hadoop environment variables in ~/.bashrc (HADOOP_HOME, JAVA_HOME).",
        "Set core-site.xml fs.defaultFS to hdfs://localhost:9000.",
        "Configure hdfs-site.xml dfs.replication factor to 1.",
        "Format NameNode: hdfs namenode -format.",
        "Start daemons using start-dfs.sh and verify with jps (NameNode, DataNode, SecondaryNameNode).",
        "Execute file operations: mkdir, put, ls, cat, copyToLocal, rm."
      ],
      codeSnippet: `# HDFS Shell Commands
hdfs dfs -mkdir -p /user/vsb_aids/input
hdfs dfs -put /local/data/web_logs.csv /user/vsb_aids/input/
hdfs dfs -ls /user/vsb_aids/input
hdfs dfs -cat /user/vsb_aids/input/web_logs.csv | head -n 5
hdfs dfs -rm -r /user/vsb_aids/input/web_logs.csv`,
      outputSnippet: `Starting namenodes on [localhost]
Starting datanodes
Starting secondary namenodes [0.0.0.0]
jps Output:
  4120 NameNode
  4280 DataNode
  4510 SecondaryNameNode
  4890 Jps
Found 1 items
-rw-r--r--   1 hadoop supergroup   4528900 2026-09-27 10:30 /user/vsb_aids/input/web_logs.csv`,
      vivaVoce: [
        {
          question: "What is the default block size in Hadoop 3.x?",
          answer: "128 MB (configured via dfs.blocksize in hdfs-site.xml)."
        },
        {
          question: "What is the function of the Secondary NameNode?",
          answer: "It merges the edit log with the fsimage periodically to prevent the edit log from growing excessively large, acting as a checkpoint node."
        }
      ]
    },
    {
      expNo: 2,
      title: "MapReduce Paradigm: WordCount Parallel Processing",
      aim: "To develop, compile, and execute a MapReduce WordCount program on Hadoop YARN to process large text corpora.",
      algorithm: [
        "Define TokenizerMapper extending Mapper: emit (word, 1) for each token.",
        "Define IntSumReducer extending Reducer: aggregate counts for each distinct word key.",
        "Configure Job with jar, mapper, combiner, reducer, input/output paths.",
        "Compile to JAR and submit job using 'hadoop jar wordcount.jar'.",
        "Inspect output part files on HDFS."
      ],
      codeSnippet: `public static class TokenizerMapper 
       extends Mapper<Object, Text, Text, IntWritable>{
    private final static IntWritable one = new IntWritable(1);
    private Text word = new Text();

    public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
        StringTokenizer itr = new StringTokenizer(value.toString());
        while (itr.hasMoreTokens()) {
            word.set(itr.nextToken().toLowerCase().replaceAll("[^a-zA-Z]", ""));
            if (word.getLength() > 0) context.write(word, one);
        }
    }
}

public static class IntSumReducer 
       extends Reducer<Text,IntWritable,Text,IntWritable> {
    public void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
        int sum = 0;
        for (IntWritable val : values) sum += val.get();
        context.write(key, new IntWritable(sum));
    }
}`,
      outputSnippet: `Job job_1727400000000_0001 submitted to YARN.
Map 0% Reduce 0%
Map 100% Reduce 0%
Map 100% Reduce 100%
Job completed successfully.
HDFS Output:
  artificial   428
  intelligence 890
  data         1450
  science      1120`,
      vivaVoce: [
        {
          question: "What is a Combiner in MapReduce?",
          answer: "A mini-reducer that runs on the local mapper output node to perform pre-aggregation, minimizing the network bandwidth consumed during the shuffle phase."
        },
        {
          question: "What are the key differences between Writable and WritableComparable in Hadoop?",
          answer: "Writable serializes data over network; WritableComparable also implements compareTo() enabling sorting keys during shuffle."
        }
      ]
    },
    {
      expNo: 3,
      title: "Apache Hive: Data Warehousing & HiveQL Analytics",
      aim: "To create managed and external tables in Apache Hive, partition datasets by date, and execute HiveQL analytical queries.",
      algorithm: [
        "Launch Hive shell / Beeline client connected to Hive Metastore.",
        "Create external table SalesRecords with CSV SerDe.",
        "Create partitioned table SalesByRegion partitioned by (country STRING, year INT).",
        "Load data from HDFS into partitioned table.",
        "Execute analytical aggregation queries: compute average order values and category totals."
      ],
      codeSnippet: `CREATE EXTERNAL TABLE IF NOT EXISTS RawSales (
    order_id INT,
    customer_id INT,
    amount DOUBLE,
    category STRING,
    country STRING,
    order_date STRING
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
STORED AS TEXTFILE
LOCATION '/user/vsb_aids/hive_sales/';

-- Querying total revenue per category
SELECT category, COUNT(*) as tx_count, ROUND(SUM(amount), 2) as total_revenue
FROM RawSales
GROUP BY category
ORDER BY total_revenue DESC;`,
      outputSnippet: `OK
Time taken: 1.842 seconds
category       tx_count  total_revenue
Electronics    12,450    $1,890,400.50
Apparel        24,100    $940,250.20
Home Decor     8,900     $410,120.00`,
      vivaVoce: [
        {
          question: "What is the benefit of Table Partitioning in Hive?",
          answer: "Partitioning subdivides tables into subdirectory folders on HDFS based on partition columns, enabling query partition pruning and avoiding full table scans."
        },
        {
          question: "How does HiveQL translate queries into execution jobs?",
          answer: "HiveQL parses SQL statements into an abstract syntax tree (AST), optimizes execution plans, and compiles them into MapReduce, Apache Tez, or Spark DAG jobs."
        }
      ]
    },
    {
      expNo: 4,
      title: "Apache HBase: NoSQL Column-Family Database Operations",
      aim: "To create HBase tables with multiple column families, insert rows, scan ranges, and retrieve records via HBase Shell.",
      algorithm: [
        "Start HBase daemons via start-hbase.sh and enter hbase shell.",
        "Create table 'Students' with column families 'personal_info' and 'academic_info'.",
        "Put cells specifying row key, column family, qualifier, and value.",
        "Perform get operations to retrieve single row records.",
        "Execute scan with row prefix filters for range queries."
      ],
      codeSnippet: `# HBase Shell Commands
create 'Students', 'personal_info', 'academic_info'
put 'Students', '101', 'personal_info:name', 'Aravind'
put 'Students', '101', 'personal_info:city', 'Karur'
put 'Students', '101', 'academic_info:gpa', '8.92'
put 'Students', '101', 'academic_info:dept', 'AI&DS'

get 'Students', '101'
scan 'Students', {COLUMNS => 'academic_info:gpa'}`,
      outputSnippet: `0 row(s) in 1.4200 seconds
COLUMN                          CELL
 academic_info:dept             timestamp=1727400010, value=AI&DS
 academic_info:gpa              timestamp=1727400010, value=8.92
 personal_info:city             timestamp=1727400010, value=Karur
 personal_info:name             timestamp=1727400010, value=Aravind
1 row(s) in 0.0520 seconds`,
      vivaVoce: [
        {
          question: "How does HBase organize data on physical disk?",
          answer: "Data is organized by Column Families into separate HFiles stored on HDFS, sorted by RowKey, Column Qualifier, and Timestamp."
        },
        {
          question: "What is the purpose of ZooKeeper in an HBase cluster?",
          answer: "ZooKeeper handles distributed coordination, master election, RegionServer liveness tracking, and bootstrap location metadata."
        }
      ]
    }
  ],

  // =======================================================================
  // 6. BUSINESS ANALYTICS - MD/Business Analytics Record.md
  // =======================================================================
  "data-science-analytics": [
    {
      expNo: 1,
      title: "Exploration of MS-Excel Analytical Features & Formatting",
      aim: "To explore advanced features of MS-Excel including worksheet formatting, cell referencing (relative, absolute, mixed), mathematical formulas, and data arrangement.",
      algorithm: [
        "Open MS-Excel and configure grid parameters.",
        "Enter structured business records with employee IDs, hours worked, and pay rates.",
        "Demonstrate relative referencing ($A1), absolute referencing ($A$1), and mixed referencing.",
        "Apply built-in formulas: SUM, AVERAGE, MIN, MAX, ROUND, SQRT.",
        "Implement AutoFill series and custom business list fills.",
        "Save workbook and export formatted tables."
      ],
      codeSnippet: `// Excel Formulas
=SUM(C2:C100)
=AVERAGE(D2:D100)
=ROUND(SQRT(E2), 2)
=IF(F2 >= 80, "Distinction", IF(F2 >= 50, "Pass", "Fail"))
=VLOOKUP(A2, EmployeeMaster!$A$2:$E$500, 3, FALSE)`,
      outputSnippet: `Worksheet formatted with 150 rows.
Calculated Aggregate Gross Pay: $482,900.00
Average Productivity Index: 88.4%
Formulas verified with absolute cell locking ($B$2).`,
      vivaVoce: [
        {
          question: "What is the difference between relative and absolute cell references in Excel?",
          answer: "Relative references (A1) adjust automatically when copied to adjacent cells; absolute references ($A$1) lock the column and row coordinates."
        },
        {
          question: "What is the benefit of the XLOOKUP function over VLOOKUP?",
          answer: "XLOOKUP searches in any direction (left or right), does not break when columns are inserted, and handles missing values natively without #N/A errors."
        }
      ]
    },
    {
      expNo: 2,
      title: "Descriptive Statistics: Skewness, Kurtosis & Variance Analysis",
      aim: "To perform statistical operations in MS-Excel and Python: Mean, Median, Mode, Variance, Standard Deviation, Skewness, and Kurtosis.",
      algorithm: [
        "Load enterprise sales distribution dataset.",
        "Compute central tendency metrics: Mean, Median, Mode.",
        "Compute dispersion metrics: Variance and Standard Deviation.",
        "Calculate Skewness: measures asymmetry of distribution around mean.",
        "Calculate Kurtosis: measures heavy-tailed or light-tailed distribution relative to normal curve.",
        "Generate histogram and verify distribution shape."
      ],
      codeSnippet: `import pandas as pd
import scipy.stats as stats

data = pd.read_csv('retail_sales.csv')
sales = data['MonthlyRevenue']

mean_val = sales.mean()
median_val = sales.median()
std_val = sales.std()
skewness = stats.skew(sales)
kurtosis = stats.kurtosis(sales)

print(f"Mean: {mean_val:.2f}, Median: {median_val:.2f}, StdDev: {std_val:.2f}")
print(f"Skewness: {skewness:.3f} | Kurtosis: {kurtosis:.3f}")`,
      outputSnippet: `--- Descriptive Statistical Metrics ---
Mean: $42,500.80 | Median: $39,200.00 | StdDev: $8,420.50
Skewness: +0.482 (Moderately right-skewed revenue distribution)
Kurtosis: 1.120 (Leptokurtic: indicates outlier high-value transactions)`,
      vivaVoce: [
        {
          question: "What does positive skewness indicate about business sales data?",
          answer: "It indicates that the tail on the right side of the distribution is longer, meaning most customers make modest purchases while a few high-value customers spend heavily."
        },
        {
          question: "What does a high positive kurtosis indicate?",
          answer: "It indicates a leptokurtic distribution with heavy tails and a sharp peak, signaling frequent extreme outlier occurrences."
        }
      ]
    },
    {
      expNo: 3,
      title: "Hypothesis Testing: Z-Test, Independent Two-Sample T-Test & ANOVA",
      aim: "To formulate statistical hypotheses and perform Z-test, T-test, and One-Way ANOVA to evaluate marketing campaign conversion rates.",
      algorithm: [
        "State Null Hypothesis H0 (no difference in means) and Alternative Hypothesis H1.",
        "Set significance threshold alpha = 0.05.",
        "Perform Two-Sample T-Test for Campaign A vs Campaign B conversion rates.",
        "Perform One-Way ANOVA across 3 regional sales channels (Retail, Online, Wholesale).",
        "Compare computed p-value with alpha; reject H0 if p < 0.05."
      ],
      codeSnippet: `from scipy import stats

# Marketing Campaign A vs B Conversion Rates
camp_a = [12.4, 14.2, 13.8, 15.1, 12.9, 14.5, 13.2]
camp_b = [16.8, 17.5, 15.9, 18.2, 16.4, 17.1, 16.9]

t_stat, p_val = stats.ttest_ind(camp_a, camp_b)
print(f"T-statistic: {t_stat:.4f}, p-value: {p_val:.5f}")

# ANOVA across 3 sales channels
f_stat, anova_p = stats.f_oneway(channel_retail, channel_online, channel_wholesale)
print(f"ANOVA F-statistic: {f_stat:.4f}, p-value: {anova_p:.5f}")`,
      outputSnippet: `Independent Two-Sample T-Test:
  t-statistic = -6.8421, p-value = 0.00002
  Result: p < 0.05 -> Reject Null Hypothesis H0. Campaign B yields statistically significant higher conversion.

One-Way ANOVA:
  F-statistic = 14.89, p-value = 0.00014
  Result: Significant variance across sales channels.`,
      vivaVoce: [
        {
          question: "What is a p-value in hypothesis testing?",
          answer: "The probability of observing results at least as extreme as the sample data under the assumption that the null hypothesis is true."
        },
        {
          question: "Why is ANOVA preferred over multiple pairwise T-tests?",
          answer: "To avoid Type I error accumulation; running multiple t-tests increases false-positive risk, whereas ANOVA tests equality across all groups simultaneously."
        }
      ]
    },
    {
      expNo: 4,
      title: "Dimensionality Reduction: Principal Component Analysis (PCA)",
      aim: "To apply Principal Component Analysis (PCA) on multi-dimensional customer behavioral data to condense features while maximizing variance retention.",
      algorithm: [
        "Standardize customer feature matrix using StandardScaler (mean=0, variance=1).",
        "Compute the covariance matrix of normalized features.",
        "Compute eigenvalues and corresponding eigenvectors of the covariance matrix.",
        "Sort eigenvectors by decreasing eigenvalues.",
        "Select top 2 principal components explaining >80% cumulative variance.",
        "Project original data onto reduced 2D coordinate space and visualize customer clusters."
      ],
      codeSnippet: `from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import pandas as pd

features = ['AnnualSpend', 'VisitFrequency', 'AvgBasketSize', 'ReturnRate', 'OnlineShare']
X = data[features]
X_scaled = StandardScaler().fit_transform(X)

pca = PCA(n_components=2)
principal_components = pca.fit_transform(X_scaled)

print("Explained Variance Ratio:", pca.explained_variance_ratio_)
print("Cumulative Variance:", sum(pca.explained_variance_ratio_))`,
      outputSnippet: `Explained Variance Ratio: [0.584, 0.262]
Total Cumulative Variance Retained: 84.6%
Dimension reduced from 5 features to 2 principal components (PC1, PC2).
Customer clusters cleanly separated for targeted marketing segmentation.`,
      vivaVoce: [
        {
          question: "Why must data be standardized before executing PCA?",
          answer: "Because PCA is sensitive to data scale; features measured in thousands (e.g. annual salary) would dominate features measured in units (e.g. years of experience)."
        },
        {
          question: "What is an Eigenvector in PCA?",
          answer: "An eigenvector defines the directional axis of maximum variance in multi-dimensional space, and its eigenvalue indicates the amount of variance captured along that axis."
        }
      ]
    },
    {
      expNo: 5,
      title: "Power BI Desktop: Data Modeling, DAX Measures & Executive Dashboard",
      aim: "To load multi-source enterprise data into Power BI Desktop, build a Star Schema relationship model, formulate DAX measures, and publish an executive dashboard.",
      algorithm: [
        "Ingest Fact_Sales and Dimension tables (Customer, Product, Date) via Power Query.",
        "Cleanse data, remove nulls, and set appropriate data types.",
        "In Model View, configure 1-to-many single-direction relationships to form Star Schema.",
        "Write custom DAX measures: Total Sales, YoY Sales Growth, Customer Lifetime Value.",
        "Design visual dashboard with KPI Cards, Slicers, Stacked Bar Charts, and Geographic maps.",
        "Publish interactive report with cross-filtering capabilities."
      ],
      codeSnippet: `// DAX Expressions
Total Revenue = SUM(Fact_Sales[SalesAmount])

YoY Revenue Growth % = 
VAR PrevYear = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(Dim_Date[Date]))
RETURN
    DIVIDE([Total Revenue] - PrevYear, PrevYear, 0)

Top Products Ranking = 
RANKX(ALL(Dim_Product[ProductName]), [Total Revenue], , DESC)`,
      outputSnippet: `Power BI Data Model Initialized: Star Schema (1 Fact, 4 Dimensions)
DAX Measures Compiled: 6 active measures
Interactive Visuals Rendered:
  - KPI Card: Total Gross Revenue ($48.25M)
  - Clustered Bar: Top 10 Revenue Generating Categories
  - Slicer: Region / Fiscal Quarter filter context working seamlessly`,
      vivaVoce: [
        {
          question: "What is a Star Schema in Data Modeling?",
          answer: "A relational schema where a central Fact table containing quantifiable numerical metrics connects directly to multiple surrounding Dimension tables containing descriptive attributes."
        },
        {
          question: "What does the CALCULATE function do in DAX?",
          answer: "It evaluates an expression in a modified filter context, overriding, removing, or adding filter conditions."
        }
      ]
    }
  ],

  // =======================================================================
  // 7. DEEP LEARNING (DL) - MD/DL LAB MANUAL FINAL.md
  // =======================================================================
  "ai-machine-learning": [
    {
      expNo: 1,
      title: "Solving the Non-Linear XOR Problem Using Deep Neural Networks (DNN)",
      aim: "To demonstrate how a multi-layer deep neural network with non-linear activation functions overcomes single perceptron limitations to solve the XOR classification problem.",
      algorithm: [
        "Define XOR inputs [[0,0], [0,1], [1,0], [1,1]] and outputs [[0], [1], [1], [0]].",
        "Construct Sequential neural network: Input layer (2 neurons), Hidden layer (4 neurons with ReLU activation), Output layer (1 neuron with Sigmoid activation).",
        "Compile model using Binary Cross-Entropy loss and Adam optimizer (learning rate = 0.05).",
        "Train model for 500 epochs until loss converges below 0.01.",
        "Evaluate binary predictions against truth table."
      ],
      codeSnippet: `import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import numpy as np

X = np.array([[0,0], [0,1], [1,0], [1,1]], dtype=np.float32)
y = np.array([[0], [1], [1], [0]], dtype=np.float32)

model = Sequential([
    Dense(4, input_dim=2, activation='relu'),
    Dense(1, activation='sigmoid')
])

model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.05),
              loss='binary_crossentropy',
              metrics=['accuracy'])

model.fit(X, y, epochs=500, verbose=0)
predictions = (model.predict(X) > 0.5).astype(int)
print("XOR Predictions:\\n", predictions)`,
      outputSnippet: `Epoch 500/500 - Loss: 0.0042 - Accuracy: 1.0000
Input [0, 0] -> Prediction: 0 (Raw: 0.003)
Input [0, 1] -> Prediction: 1 (Raw: 0.992)
Input [1, 0] -> Prediction: 1 (Raw: 0.989)
Input [1, 1] -> Prediction: 0 (Raw: 0.007)
Non-linear boundary successfully established.`,
      vivaVoce: [
        {
          question: "Why can a single-layer perceptron not solve the XOR problem?",
          answer: "A single perceptron can only generate linear decision boundaries; XOR outputs cannot be separated by any single straight line or hyperplane."
        },
        {
          question: "What role does the ReLU activation function serve in the hidden layer?",
          answer: "ReLU (Rectified Linear Unit, max(0, x)) introduces non-linearity without suffering from vanishing gradients for positive inputs, enabling the network to learn complex coordinate transformations."
        }
      ]
    },
    {
      expNo: 2,
      title: "Handwritten Character Recognition Using Convolutional Neural Networks (CNN)",
      aim: "To build, train, and evaluate a Convolutional Neural Network (CNN) on the MNIST dataset for multi-class handwritten digit recognition.",
      algorithm: [
        "Load MNIST dataset (60,000 training, 10,000 testing images of 28x28 grayscale pixels).",
        "Normalize pixel intensities from [0, 255] to [0.0, 1.0] and reshape to (28, 28, 1).",
        "One-hot encode target labels into 10 classes.",
        "Construct CNN: Conv2D(32, (3,3), ReLU) -> MaxPooling2D((2,2)) -> Conv2D(64, (3,3), ReLU) -> MaxPooling2D((2,2)) -> Flatten -> Dense(128, ReLU) -> Dropout(0.25) -> Dense(10, Softmax).",
        "Compile with Categorical Cross-Entropy and train with early stopping.",
        "Evaluate test accuracy and generate confusion matrix."
      ],
      codeSnippet: `from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(28, 28, 1)),
    MaxPooling2D((2,2)),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D((2,2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.25),
    Dense(10, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=10, batch_size=64, validation_split=0.1)`,
      outputSnippet: `Epoch 10/10:
Loss: 0.0210 - Accuracy: 0.9934 - Val_Loss: 0.0340 - Val_Accuracy: 0.9912
Test Evaluation:
Test Accuracy: 99.18%
Parameter Count: 121,930 trainable parameters`,
      vivaVoce: [
        {
          question: "What is the purpose of MaxPooling in a CNN?",
          answer: "It downsamples feature maps, reducing spatial dimensions and computational complexity while granting translation invariance."
        },
        {
          question: "Why is Dropout applied before the final dense layers?",
          answer: "Dropout randomly deactivates a fraction of neurons during training, preventing co-adaptation and combating model overfitting."
        }
      ]
    },
    {
      expNo: 3,
      title: "Sentiment Analysis Using Long Short-Term Memory (LSTM) Networks",
      aim: "To implement an LSTM recurrent neural network architecture for natural language sentiment classification on customer review text.",
      algorithm: [
        "Tokenize review texts and build vocabulary index mapping.",
        "Pad input sequences to fixed length (max_len = 200) using pad_sequences.",
        "Build model: Embedding layer (vocab_size, 128) -> SpatialDropout1D(0.2) -> LSTM(64, dropout=0.2) -> Dense(1, Sigmoid).",
        "Compile with Adam optimizer and binary cross-entropy loss.",
        "Train model and evaluate sentiment polarity on novel user input sentences."
      ],
      codeSnippet: `from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, SpatialDropout1D

model = Sequential([
    Embedding(input_dim=10000, output_dim=128, input_length=200),
    SpatialDropout1D(0.2),
    LSTM(64, dropout=0.2, recurrent_dropout=0.2),
    Dense(1, activation='sigmoid')
])

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.fit(X_train_pad, y_train, epochs=5, batch_size=32, validation_data=(X_val, y_val))`,
      outputSnippet: `Test Review: "The AI laboratory simulator provides exceptional hands-on learning!"
Tokenized Sequence Length: 12 words (Padded to 200)
Predicted Sentiment Probability: 0.964 -> POSITIVE SENTIMENT (Confidence: 96.4%)

Test Review: "The server encountered repeated timeouts and failed execution."
Predicted Sentiment Probability: 0.042 -> NEGATIVE SENTIMENT (Confidence: 95.8%)`,
      vivaVoce: [
        {
          question: "How does the LSTM cell mitigate the vanishing gradient problem of vanilla RNNs?",
          answer: "Via the cell state highway and selective forget/input/output gates that allow gradient information to flow unchanged across extensive time horizons."
        },
        {
          question: "What is the role of the Embedding layer in NLP?",
          answer: "It maps high-dimensional sparse one-hot word vectors into dense continuous vectors of fixed dimension, capturing semantic similarities between tokens."
        }
      ]
    },
    {
      expNo: 4,
      title: "Synthetic Image Generation Using Generative Adversarial Networks (GANs)",
      aim: "To implement a Deep Convolutional GAN (DCGAN) consisting of a Generator and Discriminator to synthesize realistic hand-drawn digits.",
      algorithm: [
        "Construct Generator network: takes random latent vector z (shape 100) -> Dense -> Reshape -> Conv2DTranspose layers with BatchNormalization and LeakyReLU to output 28x28x1 image.",
        "Construct Discriminator network: takes 28x28x1 image -> Conv2D layers with LeakyReLU and Dropout -> Dense(1, Sigmoid) distinguishing real from synthetic images.",
        "Define combined adversarial model where Discriminator weights are frozen during Generator updates.",
        "Train alternately: train Discriminator on real + fake images; train Generator to trick Discriminator.",
        "Plot generated synthetic images across training epochs."
      ],
      codeSnippet: `def build_generator():
    model = Sequential([
        Dense(7 * 7 * 128, input_dim=100),
        Reshape((7, 7, 128)),
        BatchNormalization(),
        Conv2DTranspose(64, (4,4), strides=(2,2), padding='same', activation='relu'),
        BatchNormalization(),
        Conv2DTranspose(1, (4,4), strides=(2,2), padding='same', activation='tanh')
    ])
    return model

def build_discriminator():
    model = Sequential([
        Conv2D(64, (3,3), strides=(2,2), padding='same', input_shape=(28,28,1)),
        LeakyReLU(alpha=0.2),
        Dropout(0.3),
        Flatten(),
        Dense(1, activation='sigmoid')
    ])
    return model`,
      outputSnippet: `GAN Training Iteration: 5000 / 10000
Discriminator Loss: 0.428 (Real Accuracy: 84%, Fake Accuracy: 81%)
Generator Loss: 1.340
Synthetic 28x28 grayscale digits generated successfully with clear stroke contours.`,
      vivaVoce: [
        {
          question: "What is Mode Collapse in GAN training?",
          answer: "A failure scenario where the Generator produces only a limited variety of outputs (e.g. only drawing the digit '1') that fool the Discriminator, rather than capturing the full data distribution."
        },
        {
          question: "Why is LeakyReLU preferred over standard ReLU in Discriminators?",
          answer: "LeakyReLU allows a small positive gradient for negative inputs (e.g. alpha = 0.2), preventing dead neuron states."
        }
      ]
    }
  ],

  // =======================================================================
  // 8. PROGRAMMING IN C - MD/PROGRAMMING IN C LAB MANUAL.md
  // =======================================================================
  "c-programming": [
    {
      expNo: 1,
      title: "Formatted Console I/O & Mathematical Calculations (Distance Between Points)",
      aim: "To develop a C program to calculate the Euclidean distance between two points in a 2D Cartesian plane using the distance formula.",
      algorithm: [
        "Include standard headers <stdio.h> and <math.h>.",
        "Declare float variables x1, y1, x2, y2, and distance.",
        "Read coordinates of first point (x1, y1) using scanf.",
        "Read coordinates of second point (x2, y2) using scanf.",
        "Compute distance = sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2)).",
        "Display the calculated distance with two decimal places using printf."
      ],
      codeSnippet: `#include <stdio.h>
#include <math.h>

int main() {
    float x1, y1, x2, y2, distance;

    printf("Enter coordinates of Point 1 (x1 y1): ");
    scanf("%f %f", &x1, &y1);

    printf("Enter coordinates of Point 2 (x2 y2): ");
    scanf("%f %f", &x2, &y2);

    distance = sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));

    printf("Euclidean Distance between points = %.2f\\n", distance);
    return 0;
}`,
      outputSnippet: `Enter coordinates of Point 1 (x1 y1): 3 4
Enter coordinates of Point 2 (x2 y2): 7 1
Euclidean Distance between points = 5.00`,
      vivaVoce: [
        {
          question: "Why must the '-lm' linker flag be supplied when compiling programs using math.h on Linux GCC?",
          answer: "The standard C runtime library (libc) does not package floating-point math routines; '-lm' explicitly links the shared math library (libm)."
        },
        {
          question: "What is the difference between %f and %lf in printf vs scanf?",
          answer: "In scanf, %f reads float (4 bytes) and %lf reads double (8 bytes); in printf, floats are promoted to doubles so %f works for both."
        }
      ]
    },
    {
      expNo: 2,
      title: "Binary Digit Counter: Counting Zeros and Ones in a Binary Number",
      aim: "To develop a C program to count the frequency of zeros and ones in a given binary number using modulus and division loops.",
      algorithm: [
        "Declare long int binNum, int countZero = 0, countOne = 0, and digit.",
        "Prompt and read binary number from console.",
        "Execute while loop while binNum != 0.",
        "Extract rightmost digit: digit = binNum % 10.",
        "If digit == 0 increment countZero; if digit == 1 increment countOne.",
        "Discard rightmost digit: binNum = binNum / 10.",
        "Output total counts after loop termination."
      ],
      codeSnippet: `#include <stdio.h>

int main() {
    long int binNum;
    int digit, countZero = 0, countOne = 0;

    printf("Enter a binary number: ");
    scanf("%ld", &binNum);

    while (binNum != 0) {
        digit = binNum % 10;
        if (digit == 0) countZero++;
        else if (digit == 1) countOne++;
        binNum = binNum / 10;
    }

    printf("Number of zeros = %d\\n", countZero);
    printf("Number of ones = %d\\n", countOne);
    return 0;
}`,
      outputSnippet: `Enter a binary number: 110100101
Number of zeros = 4
Number of ones = 5`,
      vivaVoce: [
        {
          question: "Why is 'long int' used instead of standard 'int' for binary numbers?",
          answer: "Binary numbers with 8–10 digits quickly exceed the maximum 16-bit or 32-bit signed integer limits (2,147,483,647)."
        },
        {
          question: "How does bitwise shifting compare with arithmetic division by 10?",
          answer: "Bitwise shifts (>> 1) operate on base-2 in-memory representations; decimal / 10 is necessary when binary numbers are entered as base-10 numerical digits."
        }
      ]
    },
    {
      expNo: 3,
      title: "Mathematical Properties: Armstrong Number Validation",
      aim: "To write a C program that checks whether a given positive integer is an Armstrong number (Narcissistic number).",
      algorithm: [
        "Read positive integer num from user.",
        "Store original number in copy variable original.",
        "Count number of digits n by iteratively dividing by 10.",
        "Reset temp = num and initialize sum = 0.",
        "Extract each digit, raise it to power n using pow(digit, n), and accumulate into sum.",
        "Compare sum with original: if equal, print Armstrong number; otherwise not."
      ],
      codeSnippet: `#include <stdio.h>
#include <math.h>

int main() {
    int num, original, digit, n = 0, sum = 0;

    printf("Enter a number: ");
    scanf("%d", &num);

    original = num;
    int temp = num;
    while (temp != 0) {
        temp /= 10;
        n++;
    }

    temp = num;
    while (temp != 0) {
        digit = temp % 10;
        sum += (int)pow(digit, n);
        temp /= 10;
    }

    if (sum == original)
        printf("%d is an Armstrong number\\n", original);
    else
        printf("%d is NOT an Armstrong number\\n", original);

    return 0;
}`,
      outputSnippet: `Enter a number: 153
153 is an Armstrong number (1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153)`,
      vivaVoce: [
        {
          question: "What is an Armstrong number?",
          answer: "A number that equals the sum of its own digits each raised to the power of the total number of digits (e.g. 153, 370, 371, 9474)."
        },
        {
          question: "Why is (int) typecasting required with pow()?",
          answer: "pow() returns a double precision floating-point number; casting ensures clean integer assignment without rounding discrepancies."
        }
      ]
    },
    {
      expNo: 4,
      title: "Parameter Passing: Swapping via Call by Value vs Call by Reference",
      aim: "To implement swapping of two integer numbers using both Call by Value and Call by Reference to analyze memory address mutations.",
      algorithm: [
        "Define swapByValue(int a, int b): swap parameters using local temporary variable.",
        "Define swapByReference(int *a, int *b): dereference pointers (*a, *b) and swap memory contents.",
        "In main, declare x and y with initial values.",
        "Call swapByValue(x, y) and observe x and y remain unchanged in caller stack.",
        "Call swapByReference(&x, &y) and observe x and y swapped in caller stack."
      ],
      codeSnippet: `#include <stdio.h>

void swapByValue(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

void swapByReference(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;

    printf("Original: x = %d, y = %d\\n", x, y);
    swapByValue(x, y);
    printf("After swapByValue: x = %d, y = %d (Unchanged)\\n", x, y);

    swapByReference(&x, &y);
    printf("After swapByReference: x = %d, y = %d (Swapped!)\\n", x, y);

    return 0;
}`,
      outputSnippet: `Original: x = 10, y = 20
After swapByValue: x = 10, y = 20 (Unchanged)
After swapByReference: x = 20, y = 10 (Swapped!)`,
      vivaVoce: [
        {
          question: "Why does Call by Value fail to swap variables in the main function?",
          answer: "Because C creates isolated copies of the variables in the callee's stack frame; changes to copies vanish when the function returns."
        },
        {
          question: "What does the dereference operator (*) accomplish in C?",
          answer: "It accesses or modifies the value stored at the memory address pointed to by the pointer operand."
        }
      ]
    },
    {
      expNo: 5,
      title: "Heterogeneous Records & File Streams: Student Management System",
      aim: "To model student records using C structures and persist data to disk files using formatted file I/O operations (fopen, fprintf, fscanf, fclose).",
      algorithm: [
        "Define struct Student containing rollNo, name, department, and marks.",
        "Open file 'students.dat' in append mode 'a' using fopen.",
        "Validate file pointer != NULL.",
        "Prompt user for record details and write to disk using fprintf.",
        "Close file using fclose.",
        "Re-open file in read mode 'r' and parse records using fscanf, printing tabular reports."
      ],
      codeSnippet: `#include <stdio.h>
#include <stdlib.h>

struct Student {
    int rollNo;
    char name[50];
    char dept[30];
    float marks;
};

int main() {
    struct Student s;
    FILE *fp = fopen("students.txt", "a");
    if (fp == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    printf("Enter Roll No, Name, Dept, Marks: ");
    scanf("%d %s %s %f", &s.rollNo, s.name, s.dept, &s.marks);

    fprintf(fp, "%d %s %s %.2f\\n", s.rollNo, s.name, s.dept, s.marks);
    fclose(fp);
    printf("Student record persisted to disk successfully.\\n");
    return 0;
}`,
      outputSnippet: `Enter Roll No, Name, Dept, Marks: 101 Anitha AI&DS 94.50
Student record persisted to disk successfully.
--- File Contents (students.txt) ---
RollNo  Name        Dept    Marks
101     Anitha      AI&DS   94.50`,
      vivaVoce: [
        {
          question: "What is the return value of fopen() if the file cannot be opened?",
          answer: "It returns NULL."
        },
        {
          question: "What is the difference between text mode and binary mode in C file I/O?",
          answer: "Text mode translates newline characters (e.g. \\r\\n to \\n); binary mode writes and reads exact memory byte streams without character conversion."
        }
      ]
    }
  ]
};
