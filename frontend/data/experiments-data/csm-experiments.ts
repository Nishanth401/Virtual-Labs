import { Experiment } from "../experiments";

export const CSM_EXPERIMENTS: Experiment[] = [
  {
    "id": "csm-exp-1",
    "labId": "cloud-service-management",
    "title": "Exp 1: Cloud Organization & Multi-Account Governance with Role-Based Access Control (RBAC)",
    "slug": "csm-exp-1-cloud-organization-multi-account-governance-with-role-based-access-control-rbac",
    "difficulty": "Beginner",
    "category": "Cloud Computing",
    "estimatedMinutes": 30,
    "rating": 4.93,
    "ratingsCount": 140,
    "simulator": "custom",
    "quizId": "quiz-csm-1",
    "sections": {
      "introduction": "To create a Cloud Organization in AWS with Role-Based Access Control, Organizational Units (OUs), Service Control Policies (SCPs), and cross-account IAM roles.",
      "objective": "To create a Cloud Organization in AWS with Role-Based Access Control, Organizational Units (OUs), Service Control Policies (SCPs), and cross-account IAM roles.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      "videoTitle": "Cloud Service Management: Cloud Organization & Multi-Account Governance with Role-Based Access Control (RBAC)",
      "videoChannel": "Cloud Architecture & DevOps Suite",
      "prerequisites": [
        "Cloud Computing Fundamentals",
        "Basic Networking & Security"
      ],
      "theory": {
        "overview": "This experiment implements Cloud Organization & Multi-Account Governance with Role-Based Access Control (RBAC) according to the V.S.B. Engineering College Cloud Service Management syllabus. It covers multi-account organization design, FinOps cloud cost management, automated health monitoring, and multi-cloud architectural trade-offs.",
        "keyConcepts": [
          {
            "title": "Governance & RBAC",
            "desc": "Centralized policy enforcement across distributed cloud accounts."
          },
          {
            "title": "FinOps & Cost Optimization",
            "desc": "Aligning operational expenditure with cloud pricing tiers and reserved commitments."
          },
          {
            "title": "Telemetry & Observability",
            "desc": "Proactive incident detection with metric thresholds and SNS alarms."
          }
        ],
        "complexities": [
          {
            "operation": "Cloud API Request",
            "best": "O(1)",
            "avg": "O(1)",
            "worst": "O(1)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise multi-tenant cloud migrations and compliance controls",
          "FinOps budget governance and cloud bill reduction programs",
          "High-availability disaster recovery and multi-cloud infrastructure strategy"
        ]
      },
      "procedure": [
        "1. Log in to the Cloud Console using administrator credentials.",
        "2. Navigate to Organization / Identity or Cost Management services.",
        "3. Configure policies, organizational units, or monitoring alarms.",
        "4. Simulate threshold breaches or test permission delegation.",
        "5. Review CloudTrail audit logs and cost reports to verify compliance."
      ],
      "sampleCode": {
        "language": "bash",
        "code": "# AWS CLI Commands for Organization & SCP Governance\naws organizations create-organization --feature-set ALL\naws organizations create-organizational-unit --parent-id r-root --name ProductionOU\n\n# Create Role-Based Policy\naws iam create-role --role-name VLabCloudAdminRole --assume-role-policy-document file://trust-policy.json"
      },
      "expectedOutput": "Cloud resources configured and active.\nPolicies, alarms, and budget limits successfully enforced.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 4th Year"
        ],
        "pg": [
          "M.Tech Cloud Computing"
        ]
      }
    }
  },
  {
    "id": "csm-exp-2",
    "labId": "cloud-service-management",
    "title": "Exp 2: Web Application Cloud Cost-Modeling and Total Cost of Ownership (TCO) Analysis",
    "slug": "csm-exp-2-web-application-cloud-cost-modeling-and-total-cost-of-ownership-tco-analysis",
    "difficulty": "Beginner",
    "category": "Cloud Computing",
    "estimatedMinutes": 30,
    "rating": 4.93,
    "ratingsCount": 145,
    "simulator": "custom",
    "quizId": "quiz-csm-2",
    "sections": {
      "introduction": "To create a cost-model for a 3-tier web application using AWS Pricing Calculator, evaluate resource utilization, and perform cost-benefit analysis comparing On-Demand vs Reserved vs Spot instances.",
      "objective": "To create a cost-model for a 3-tier web application using AWS Pricing Calculator, evaluate resource utilization, and perform cost-benefit analysis comparing On-Demand vs Reserved vs Spot instances.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      "videoTitle": "Cloud Service Management: Web Application Cloud Cost-Modeling and Total Cost of Ownership (TCO) Analysis",
      "videoChannel": "Cloud Architecture & DevOps Suite",
      "prerequisites": [
        "Cloud Computing Fundamentals",
        "Basic Networking & Security"
      ],
      "theory": {
        "overview": "This experiment implements Web Application Cloud Cost-Modeling and Total Cost of Ownership (TCO) Analysis according to the V.S.B. Engineering College Cloud Service Management syllabus. It covers multi-account organization design, FinOps cloud cost management, automated health monitoring, and multi-cloud architectural trade-offs.",
        "keyConcepts": [
          {
            "title": "Governance & RBAC",
            "desc": "Centralized policy enforcement across distributed cloud accounts."
          },
          {
            "title": "FinOps & Cost Optimization",
            "desc": "Aligning operational expenditure with cloud pricing tiers and reserved commitments."
          },
          {
            "title": "Telemetry & Observability",
            "desc": "Proactive incident detection with metric thresholds and SNS alarms."
          }
        ],
        "complexities": [
          {
            "operation": "Cloud API Request",
            "best": "O(1)",
            "avg": "O(1)",
            "worst": "O(1)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise multi-tenant cloud migrations and compliance controls",
          "FinOps budget governance and cloud bill reduction programs",
          "High-availability disaster recovery and multi-cloud infrastructure strategy"
        ]
      },
      "procedure": [
        "1. Log in to the Cloud Console using administrator credentials.",
        "2. Navigate to Organization / Identity or Cost Management services.",
        "3. Configure policies, organizational units, or monitoring alarms.",
        "4. Simulate threshold breaches or test permission delegation.",
        "5. Review CloudTrail audit logs and cost reports to verify compliance."
      ],
      "sampleCode": {
        "language": "bash",
        "code": "# AWS Pricing API Query for Compute EC2 Cost Estimation\nimport boto3\nclient = boto3.client('pricing', region_name='us-east-1')\nresponse = client.get_products(\n    ServiceCode='AmazonEC2',\n    Filters=[\n        {'Type': 'TERM_MATCH', 'Field': 'instanceType', 'Value': 't3.medium'},\n        {'Type': 'TERM_MATCH', 'Field': 'operatingSystem', 'Value': 'Linux'}\n    ]\n)\nprint(\"Cost breakdown retrieved.\")"
      },
      "expectedOutput": "Cloud resources configured and active.\nPolicies, alarms, and budget limits successfully enforced.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 4th Year"
        ],
        "pg": [
          "M.Tech Cloud Computing"
        ]
      }
    }
  },
  {
    "id": "csm-exp-3",
    "labId": "cloud-service-management",
    "title": "Exp 3: Cloud Infrastructure Resource Monitoring and CloudWatch Metric Alarms",
    "slug": "csm-exp-3-cloud-infrastructure-resource-monitoring-and-cloudwatch-metric-alarms",
    "difficulty": "Intermediate",
    "category": "Cloud Computing",
    "estimatedMinutes": 30,
    "rating": 4.93,
    "ratingsCount": 150,
    "simulator": "custom",
    "quizId": "quiz-csm-3",
    "sections": {
      "introduction": "To create CloudWatch metric alarms for compute instances, configure CPU utilization and memory thresholds, and integrate Amazon SNS topic notifications.",
      "objective": "To create CloudWatch metric alarms for compute instances, configure CPU utilization and memory thresholds, and integrate Amazon SNS topic notifications.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      "videoTitle": "Cloud Service Management: Cloud Infrastructure Resource Monitoring and CloudWatch Metric Alarms",
      "videoChannel": "Cloud Architecture & DevOps Suite",
      "prerequisites": [
        "Cloud Computing Fundamentals",
        "Basic Networking & Security"
      ],
      "theory": {
        "overview": "This experiment implements Cloud Infrastructure Resource Monitoring and CloudWatch Metric Alarms according to the V.S.B. Engineering College Cloud Service Management syllabus. It covers multi-account organization design, FinOps cloud cost management, automated health monitoring, and multi-cloud architectural trade-offs.",
        "keyConcepts": [
          {
            "title": "Governance & RBAC",
            "desc": "Centralized policy enforcement across distributed cloud accounts."
          },
          {
            "title": "FinOps & Cost Optimization",
            "desc": "Aligning operational expenditure with cloud pricing tiers and reserved commitments."
          },
          {
            "title": "Telemetry & Observability",
            "desc": "Proactive incident detection with metric thresholds and SNS alarms."
          }
        ],
        "complexities": [
          {
            "operation": "Cloud API Request",
            "best": "O(1)",
            "avg": "O(1)",
            "worst": "O(1)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise multi-tenant cloud migrations and compliance controls",
          "FinOps budget governance and cloud bill reduction programs",
          "High-availability disaster recovery and multi-cloud infrastructure strategy"
        ]
      },
      "procedure": [
        "1. Log in to the Cloud Console using administrator credentials.",
        "2. Navigate to Organization / Identity or Cost Management services.",
        "3. Configure policies, organizational units, or monitoring alarms.",
        "4. Simulate threshold breaches or test permission delegation.",
        "5. Review CloudTrail audit logs and cost reports to verify compliance."
      ],
      "sampleCode": {
        "language": "bash",
        "code": "# AWS CloudWatch CPU Utilization Alarm\naws cloudwatch put-metric-alarm \\\n  --alarm-name \"HighCPUUtilization-EC2\" \\\n  --metric-name CPUUtilization \\\n  --namespace AWS/EC2 \\\n  --statistic Average \\\n  --period 300 \\\n  --threshold 80.0 \\\n  --comparison-operator GreaterThanOrEqualToThreshold \\\n  --evaluation-periods 2 \\\n  --alarm-actions arn:aws:sns:us-east-1:123456789012:CloudAlertsTopic"
      },
      "expectedOutput": "Cloud resources configured and active.\nPolicies, alarms, and budget limits successfully enforced.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 4th Year"
        ],
        "pg": [
          "M.Tech Cloud Computing"
        ]
      }
    }
  },
  {
    "id": "csm-exp-4",
    "labId": "cloud-service-management",
    "title": "Exp 4: Cloud Organization Billing Alerts, Budgets, and Cost Threshold Enforcements",
    "slug": "csm-exp-4-cloud-organization-billing-alerts-budgets-and-cost-threshold-enforcements",
    "difficulty": "Intermediate",
    "category": "Cloud Computing",
    "estimatedMinutes": 30,
    "rating": 4.93,
    "ratingsCount": 155,
    "simulator": "custom",
    "quizId": "quiz-csm-4",
    "sections": {
      "introduction": "To create AWS Budgets and Billing alerts for your Cloud Organization, setting budget limits and proactive email alerts when actual or forecasted cost exceeds 80%.",
      "objective": "To create AWS Budgets and Billing alerts for your Cloud Organization, setting budget limits and proactive email alerts when actual or forecasted cost exceeds 80%.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      "videoTitle": "Cloud Service Management: Cloud Organization Billing Alerts, Budgets, and Cost Threshold Enforcements",
      "videoChannel": "Cloud Architecture & DevOps Suite",
      "prerequisites": [
        "Cloud Computing Fundamentals",
        "Basic Networking & Security"
      ],
      "theory": {
        "overview": "This experiment implements Cloud Organization Billing Alerts, Budgets, and Cost Threshold Enforcements according to the V.S.B. Engineering College Cloud Service Management syllabus. It covers multi-account organization design, FinOps cloud cost management, automated health monitoring, and multi-cloud architectural trade-offs.",
        "keyConcepts": [
          {
            "title": "Governance & RBAC",
            "desc": "Centralized policy enforcement across distributed cloud accounts."
          },
          {
            "title": "FinOps & Cost Optimization",
            "desc": "Aligning operational expenditure with cloud pricing tiers and reserved commitments."
          },
          {
            "title": "Telemetry & Observability",
            "desc": "Proactive incident detection with metric thresholds and SNS alarms."
          }
        ],
        "complexities": [
          {
            "operation": "Cloud API Request",
            "best": "O(1)",
            "avg": "O(1)",
            "worst": "O(1)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise multi-tenant cloud migrations and compliance controls",
          "FinOps budget governance and cloud bill reduction programs",
          "High-availability disaster recovery and multi-cloud infrastructure strategy"
        ]
      },
      "procedure": [
        "1. Log in to the Cloud Console using administrator credentials.",
        "2. Navigate to Organization / Identity or Cost Management services.",
        "3. Configure policies, organizational units, or monitoring alarms.",
        "4. Simulate threshold breaches or test permission delegation.",
        "5. Review CloudTrail audit logs and cost reports to verify compliance."
      ],
      "sampleCode": {
        "language": "bash",
        "code": "# Create AWS Monthly Budget Alert\naws budgets create-budget \\\n  --account-id 123456789012 \\\n  --budget file://budget-config.json \\\n  --notifications-with-subscribers file://notifications.json"
      },
      "expectedOutput": "Cloud resources configured and active.\nPolicies, alarms, and budget limits successfully enforced.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 4th Year"
        ],
        "pg": [
          "M.Tech Cloud Computing"
        ]
      }
    }
  },
  {
    "id": "csm-exp-5",
    "labId": "cloud-service-management",
    "title": "Exp 5: Multi-Cloud Cost Benchmarking across AWS, Azure, and GCP for Web Applications",
    "slug": "csm-exp-5-multi-cloud-cost-benchmarking-across-aws-azure-and-gcp-for-web-applications",
    "difficulty": "Intermediate",
    "category": "Cloud Computing",
    "estimatedMinutes": 30,
    "rating": 4.93,
    "ratingsCount": 160,
    "simulator": "custom",
    "quizId": "quiz-csm-5",
    "sections": {
      "introduction": "To compare cloud costs for a simple web application architecture across AWS, Microsoft Azure, and Google Cloud Platform (GCP) and recommend the most cost-effective cloud provider.",
      "objective": "To compare cloud costs for a simple web application architecture across AWS, Microsoft Azure, and Google Cloud Platform (GCP) and recommend the most cost-effective cloud provider.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      "videoTitle": "Cloud Service Management: Multi-Cloud Cost Benchmarking across AWS, Azure, and GCP for Web Applications",
      "videoChannel": "Cloud Architecture & DevOps Suite",
      "prerequisites": [
        "Cloud Computing Fundamentals",
        "Basic Networking & Security"
      ],
      "theory": {
        "overview": "This experiment implements Multi-Cloud Cost Benchmarking across AWS, Azure, and GCP for Web Applications according to the V.S.B. Engineering College Cloud Service Management syllabus. It covers multi-account organization design, FinOps cloud cost management, automated health monitoring, and multi-cloud architectural trade-offs.",
        "keyConcepts": [
          {
            "title": "Governance & RBAC",
            "desc": "Centralized policy enforcement across distributed cloud accounts."
          },
          {
            "title": "FinOps & Cost Optimization",
            "desc": "Aligning operational expenditure with cloud pricing tiers and reserved commitments."
          },
          {
            "title": "Telemetry & Observability",
            "desc": "Proactive incident detection with metric thresholds and SNS alarms."
          }
        ],
        "complexities": [
          {
            "operation": "Cloud API Request",
            "best": "O(1)",
            "avg": "O(1)",
            "worst": "O(1)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Enterprise multi-tenant cloud migrations and compliance controls",
          "FinOps budget governance and cloud bill reduction programs",
          "High-availability disaster recovery and multi-cloud infrastructure strategy"
        ]
      },
      "procedure": [
        "1. Log in to the Cloud Console using administrator credentials.",
        "2. Navigate to Organization / Identity or Cost Management services.",
        "3. Configure policies, organizational units, or monitoring alarms.",
        "4. Simulate threshold breaches or test permission delegation.",
        "5. Review CloudTrail audit logs and cost reports to verify compliance."
      ],
      "sampleCode": {
        "language": "bash",
        "code": "# Multi-Cloud Total Cost Comparison Table\n# Metrics: Compute (2 vCPU, 4GB RAM) + 50GB Managed Database + 100GB Egress\n# AWS (EC2 + RDS Postgres): ~$68/mo\n# Azure (VM + Azure DB): ~$71/mo\n# GCP (Compute Engine + Cloud SQL): ~$63/mo (Best Recommended with Sustained Use Discount)"
      },
      "expectedOutput": "Cloud resources configured and active.\nPolicies, alarms, and budget limits successfully enforced.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS - 4th Year"
        ],
        "pg": [
          "M.Tech Cloud Computing"
        ]
      }
    }
  }
];
