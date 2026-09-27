import { DSACategory } from "../dsa-topic-data";

export const CLOUD_ROADMAP_CATEGORIES: DSACategory[] = [
  // ========================================================
  // MODULE 1: CLOUD ORGANIZATION & ACCESS CONTROL (0/1)
  // ========================================================
  {
    id: "cloud-org-access",
    name: "1. Cloud Organization & Access Control",
    shortDesc: "Cloud management root accounts, organizational units, and role-based access control.",
    iconName: "Cloud",
    topics: [
      {
        id: "csm-cloud-org-rbac",
        slug: "create-cloud-organization-rbac",
        title: "Exp 1: Create a Cloud Organization in AWS/Google Cloud (or OpenStack/Eucalyptus/OpenNebula) with Role-Based Access Control",
        categoryId: "cloud-org-access",
        categoryName: "1. Cloud Organization & Access Control",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "AWS Organizations IAM Role Based Access Control SCP",
        gfgUrl: "https://www.geeksforgeeks.org/aws-organizations/",
        quickSummary: "Set up a cloud management account, enable an Organizations service, create Organizational Units, and enforce role-based permissions using IAM roles and Service Control Policies.",
        keyPoints: [
          "Management root governance: A management (root) account governs member accounts hierarchically grouped into Organizational Units (OUs).",
          "Service Control Policies (SCPs): Define the boundary of maximum allowed actions per OU and member account.",
          "Role-based access control: IAM roles with attached policies implement fine-grained role-based access control across all accounts in the organization."
        ],
        diagramTitle: "AWS Organizations & IAM RBAC Hierarchy",
        diagram: `  [ Root Management Account ]
              │
      ┌───────┴───────┐
      ▼               ▼
  [ Production OU ]  [ Staging OU ] ──► SCP Guardrails (Deny unapproved regions)
      │               │
  [ IAM Admin Role ] [ IAM Dev Role ] ──► Least Privilege Access Policies`,
        complexities: [],
        tools: [
          { tool: "AWS Organizations", purpose: "Central account governance & OU hierarchy", notes: "Free to enable" },
          { tool: "IAM", purpose: "Role & policy management across accounts", notes: "Console or CLI" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "AWS CLI (Create Org & OU)",
            code: `# 1. Create Organization in AWS
aws organizations create-organization --feature-set ALL

# 2. Create Organizational Unit (OU)
aws organizations create-organizational-unit \\
    --parent-id r-examplerootid \\
    --name "Engineering-Workloads"

# 3. Create and Attach Service Control Policy (SCP)
aws organizations create-policy \\
    --content file://guardrail-policy.json \\
    --description "Restrict non-approved AWS regions" \\
    --name "RegionRestrictionPolicy" \\
    --type SERVICE_CONTROL_POLICY`
          }
        ],
        practiceProblems: [
          {
            title: "AWS Multi-Account Architecture with Organizations",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/aws-organizations/",
            platform: "GeeksforGeeks",
            topicTag: "Cloud Architecture"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 2: COST MODELING & RESOURCE MONITORING (0/3)
  // ========================================================
  {
    id: "cloud-cost-monitoring",
    name: "2. Cost Modeling & Resource Monitoring",
    shortDesc: "Cost-benefit models, CloudWatch telemetry alerts, and organization-wide budget tracking.",
    iconName: "BarChart3",
    topics: [
      {
        id: "csm-cost-model-web-app",
        slug: "cost-model-web-application-cost-benefit-analysis",
        title: "Exp 2: Create a Cost Model for a Web Application Using Various Services and Perform Cost-Benefit Analysis",
        categoryId: "cloud-cost-monitoring",
        categoryName: "2. Cost Modeling & Resource Monitoring",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "AWS pricing calculator total cost of ownership TCO cloud web application",
        gfgUrl: "https://www.geeksforgeeks.org/aws-pricing-calculator/",
        quickSummary: "Identify the AWS services a typical web app uses (EC2, RDS, S3, CloudFront, etc.), estimate their monthly costs, and evaluate whether cloud deployment is cost-effective versus on-premises.",
        keyPoints: [
          "Usage-based service decomposition: Compute hours (EC2), managed database instances (RDS), storage volume (S3), and egress bandwidth (CloudFront) are modeled independently.",
          "Total cost-of-ownership (TCO): Sums server hardware depreciation, operational maintenance, and electricity against pure cloud pay-as-you-go spend.",
          "Cost-benefit thresholding: Quantifies high availability, autoscaling agility, and disaster recovery against the modeled operational expenditure."
        ],
        diagramTitle: "Web Application Cloud Cost Model Breakdown",
        diagram: `  [ Web Traffic ] ──► CloudFront ($0.085/GB)
                           │
                           ▼
                  [ ALB ($0.0225/hr) ]
                           │
      ┌────────────────────┴────────────────────┐
      ▼                                         ▼
  [ 2x EC2 t3.medium ($60/mo) ]           [ RDS MySQL db.t3.medium ($68/mo) ]
      │                                         │
      └────────────────► S3 Storage ($0.023/GB) ◄┘`,
        complexities: [],
        tools: [
          { tool: "AWS Pricing Calculator", purpose: "Estimate per-service monthly and annual cost", notes: "Or custom spreadsheet / Python script" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (TCO Cost Modeling Calculator)",
            code: `# Monthly Cloud vs On-Premises Cost Estimation Model
services = {
    "EC2 (2x t3.medium)": 2 * 0.0416 * 730, # $60.74
    "RDS (1x db.t3.medium)": 0.068 * 730,   # $49.64
    "ALB (Application Load Balancer)": 0.0225 * 730 + (0.008 * 100), # $17.23
    "S3 (500 GB Standard)": 500 * 0.023,    # $11.50
    "CloudFront (1 TB Egress)": 1000 * 0.085 # $85.00
}

cloud_monthly = sum(services.values())
cloud_annual = cloud_monthly * 12
on_prem_annual = 5500.00 # Hardware + Power + Sysadmin labor

print(f"Total Cloud Monthly Spend: \${cloud_monthly:.2f}")
print(f"Total Cloud Annual Spend:  \${cloud_annual:.2f}")
print(f"On-Premises Annual Spend:  \${on_prem_annual:.2f}")
print(f"Annual Cloud Savings:      \${(on_prem_annual - cloud_annual):.2f}")`
          }
        ],
        practiceProblems: [
          {
            title: "AWS Pricing Calculator Configuration",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/aws-pricing-calculator/",
            platform: "GeeksforGeeks",
            topicTag: "Cloud Economics"
          }
        ]
      },
      {
        id: "csm-resource-usage-alerts",
        slug: "create-alerts-usage-cloud-resources",
        title: "Exp 3: Create Alerts for Usage of Cloud Resources",
        categoryId: "cloud-cost-monitoring",
        categoryName: "2. Cost Modeling & Resource Monitoring",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "AWS CloudWatch Alarm Lambda SNS custom metric threshold",
        gfgUrl: "https://www.geeksforgeeks.org/amazon-cloudwatch-alarms/",
        quickSummary: "Use CloudWatch metrics and a Lambda function to monitor a resource's usage (e.g. S3 bucket size) and trigger an alarm when a threshold is exceeded.",
        keyPoints: [
          "IAM policy authorization: An IAM execution role grants Lambda read permissions over target resource statistics.",
          "Scheduled telemetry publishing: EventBridge triggers the Lambda function periodically to publish custom CloudWatch metrics.",
          "CloudWatch alarm & SNS fanout: Compares published metric data points against a static threshold and invokes an SNS topic for immediate email/SMS alerting."
        ],
        diagramTitle: "CloudWatch Telemetry & SNS Alerting Pipeline",
        diagram: `  [ EventBridge (5m) ] ──► [ Lambda Function ] ──► Inspect S3 / EC2
                                   │
                                   ▼ (PutMetricData)
                        [ CloudWatch Alarm (Threshold > 80%) ]
                                   │
                                   ▼ (State: ALARM)
                        [ SNS Notification Topic ] ──► Email / Slack / SMS`,
        complexities: [],
        tools: [
          { tool: "CloudWatch", purpose: "Metric collection & threshold alarm evaluation", notes: "Standard & custom namespaces" },
          { tool: "Lambda", purpose: "Scheduled metric computation and publisher", notes: "Serverless Python runtime" },
          { tool: "SNS", purpose: "Alert delivery and email notification fanout", notes: "Immediate delivery" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python Lambda (Publish CloudWatch Metric)",
            code: `import boto3

cloudwatch = boto3.client('cloudwatch')
s3 = boto3.client('s3')

def lambda_handler(event, context):
    bucket_name = "vlab-enterprise-assets"
    
    # 1. Calculate Bucket Object Count
    response = s3.list_objects_v2(Bucket=bucket_name)
    count = response.get('KeyCount', 0)
    
    # 2. Publish Custom CloudWatch Metric
    cloudwatch.put_metric_data(
        Namespace='VLab/ResourceMonitoring',
        MetricData=[
            {
                'MetricName': 'BucketObjectCount',
                'Dimensions': [{'Name': 'BucketName', 'Value': bucket_name}],
                'Value': count,
                'Unit': 'Count'
            }
        ]
    )
    return {"statusCode": 200, "message": f"Metric published: {count} objects"}`
          }
        ],
        practiceProblems: [
          {
            title: "Configuring CloudWatch Metrics and Alarms",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/amazon-cloudwatch-alarms/",
            platform: "GeeksforGeeks",
            topicTag: "Cloud Monitoring"
          }
        ]
      },
      {
        id: "csm-billing-alerts",
        slug: "create-billing-alerts-cloud-organization",
        title: "Exp 4: Create Billing Alerts for Your Cloud Organization",
        categoryId: "cloud-cost-monitoring",
        categoryName: "2. Cost Modeling & Resource Monitoring",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "AWS Budgets billing alert email notification threshold",
        gfgUrl: "https://www.geeksforgeeks.org/how-to-set-up-aws-billing-alarm-using-aws-budgets/",
        quickSummary: "Configure an AWS Budget with a cost threshold and email/SNS notification so the organization is alerted when spending approaches or exceeds a set limit.",
        keyPoints: [
          "Cost budget definition: Establishes a fixed monthly monetary ceiling ($USD) scoped to linked accounts and service tags.",
          "Threshold evaluation: Rule evaluates actual vs. forecasted monthly spend against percentage thresholds (e.g. 80%, 100%).",
          "Automated alert notification: Sends proactive notification payloads to finance and DevOps subscribers before unexpected overages occur."
        ],
        diagramTitle: "AWS Budgets Spend Threshold & Alert Flow",
        diagram: `  [ Actual AWS Spend Data ] ──► [ AWS Budgets Engine ]
                                        │
                                        ▼ (Spend >= 80% of $500 Target)
                              [ Email / SNS Trigger ] ──► "WARNING: Budget Threshold Exceeded!"`,
        complexities: [],
        tools: [
          { tool: "AWS Budgets", purpose: "Spend threshold tracking and forecasting", notes: "Console or CLI JSON config" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "AWS CLI (Create Budget with Alerts)",
            code: `# Create a $200 Monthly Budget with an 80% Notification Trigger
aws budgets create-budget \\
    --account-id 123456789012 \\
    --budget '{
        "BudgetName": "MonthlyVirtualLabBudget",
        "BudgetLimit": {"Amount": "200.0", "Unit": "USD"},
        "CostTypes": {"IncludeTax": true, "IncludeSubscription": true},
        "TimeUnit": "MONTHLY",
        "BudgetType": "COST"
    }' \\
    --notifications-with-subscribers '[
        {
            "Notification": {
                "NotificationType": "ACTUAL",
                "ComparisonOperator": "GREATER_THAN",
                "Threshold": 80.0
            },
            "Subscribers": [
                {"SubscriptionType": "EMAIL", "Address": "admin@college.edu"}
            ]
        }
    ]'`
          }
        ],
        practiceProblems: [
          {
            title: "Setting Up AWS Billing Alarms",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/how-to-set-up-aws-billing-alarm-using-aws-budgets/",
            platform: "GeeksforGeeks",
            topicTag: "Cloud Economics"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 3: MULTI-CLOUD COST COMPARISON (0/1)
  // ========================================================
  {
    id: "cloud-multi-provider",
    name: "3. Multi-Cloud Cost Comparison",
    shortDesc: "Comparative analysis of AWS, Microsoft Azure, and Google Cloud Platform workloads.",
    iconName: "Network",
    topics: [
      {
        id: "csm-multi-cloud-comparison",
        slug: "compare-cloud-cost-aws-azure-gcp",
        title: "Exp 5: Compare Cloud Cost for a Simple Web Application Across AWS, Azure and GCP and Suggest the Best One",
        categoryId: "cloud-multi-provider",
        categoryName: "3. Multi-Cloud Cost Comparison",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "AWS vs Azure vs GCP price comparison simple web application",
        gfgUrl: "https://www.geeksforgeeks.org/aws-vs-azure-vs-google-cloud/",
        quickSummary: "Compare the pricing models, service breadth, and cost-effectiveness of AWS, Azure, and GCP for hosting the same simple web application, then justify a recommended provider.",
        keyPoints: [
          "AWS service catalog: Offers the broadest service catalog, vast global edge network, and granular per-second billing.",
          "Azure enterprise affinity: Provides aggressive cost-efficiency for existing Microsoft enterprise licensing and Windows Server instances.",
          "GCP open-source alignment: Highly cost-effective for containerized Kubernetes workloads, compute-optimized VMs, and data analytics pipelines."
        ],
        diagramTitle: "AWS vs Azure vs GCP Web App Cost Comparison",
        diagram: `  [ Baseline Workload: 4 vCPU, 16 GB RAM, 250 GB SSD, 500 GB Bandwidth ]
  ──────────────────────────────────────────────────────────────────────────
  AWS (t3.xlarge + RDS MySQL)        ──►  $168.40 / month
  Azure (Standard_B4ms + Azure DB)   ──►  $159.20 / month
  GCP (e2-standard-4 + Cloud SQL)    ──►  $144.80 / month (Recommended for pure compute)`,
        complexities: [],
        tools: [
          { tool: "AWS/Azure/GCP Pricing Calculators", purpose: "Cross-provider cost modeling & benchmarking", notes: "Comparative report deliverable" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Multi-Cloud Benchmark Matrix)",
            code: `# Multi-Cloud Monthly Cost Benchmark
benchmark = {
    "AWS": {
        "Compute (t3.xlarge)": 121.50,
        "Database (RDS db.t3.medium)": 49.60,
        "Storage & Egress": 24.30,
        "Total": 195.40
    },
    "Azure": {
        "Compute (B4ms)": 118.20,
        "Database (Flexible Server)": 47.50,
        "Storage & Egress": 22.80,
        "Total": 188.50
    },
    "GCP": {
        "Compute (e2-standard-4)": 98.40,
        "Database (Cloud SQL)": 44.10,
        "Storage & Egress": 21.00,
        "Total": 163.50
    }
}

for provider, costs in benchmark.items():
    print(f"{provider}: \${costs['Total']:.2f}/mo (Compute: \${costs[list(costs.keys())[0]]})")
print("\\nRecommendation: GCP offers the lowest monthly run-rate for containerized web apps.")`
          }
        ],
        practiceProblems: [
          {
            title: "Multi-Cloud Cost Optimization Strategy",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/aws-vs-azure-vs-google-cloud/",
            platform: "GeeksforGeeks",
            topicTag: "Cloud Economics"
          }
        ]
      }
    ]
  }
];
