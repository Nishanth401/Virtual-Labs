# 🏛️ Department Virtual Labs Platform & Learning Hub

[![Next.js 15](https://img.shields.io/badge/Next.js-15.x-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java 17](https://img.shields.io/badge/Java-17_LTS-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth_%26_Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **V.S.B. Engineering College** — **Department of Artificial Intelligence & Data Science (AI & DS)**  
> An enterprise-grade, simulation-based Virtual Laboratory Management System inspired by the National Virtual Labs initiative (`vlab.co.in`). Combining interactive algorithm simulators, JVM call-stack & recursion tree tracers, comprehensive laboratory syllabus alignment, real-time assessment quizzes, cloud file/notes management, and automated certificate generation.

---

## 📑 Table of Contents

- [System Architecture](#-system-architecture)
- [Key Features & Laboratory Modules](#-key-features--laboratory-modules)
- [Tech Stack Overview](#-tech-stack-overview)
- [Repository Structure](#-repository-structure)
- [Step-by-Step Setup Guide](#-step-by-step-setup-guide)
  - [Prerequisites](#prerequisites)
  - [1. Firebase & Environment Configuration](#1-firebase--environment-configuration)
  - [2. Cloud Firestore Rules Setup](#2-cloud-firestore-rules-setup)
  - [3. Frontend Setup (Next.js)](#3-frontend-setup-nextjs)
  - [4. Backend Setup (Spring Boot)](#4-backend-setup-spring-boot)
- [Authentication & Data Flow Diagram](#-authentication--data-flow-diagram)
- [REST API Reference](#-rest-api-reference)
- [Pre-Configured Test Credentials](#-pre-configured-test-credentials)
- [Institutional Alignment](#-institutional-alignment)

---

## 🏗️ System Architecture

```mermaid
graph TD
    subgraph Client ["Client Browser (Student / Faculty / Admin)"]
        UI["Next.js 15 App Router\n(React 19 + Tailwind + Framer Motion)"]
        AUTH_CTX["AuthContext & State Manager\n(Local Storage + Session)"]
        API_CLIENT["REST API Client (lib/api.ts)"]
    end

    subgraph FirebaseCloud ["Google Cloud & Firebase Infrastructure"]
        FB_AUTH["Firebase Authentication\n(Google OAuth & Email/Password)"]
        FIRESTORE["Cloud Firestore\n(/users, /students, /folders, /files, /notes, /teamMembers)"]
    end

    subgraph SpringBackend ["Enterprise Spring Boot 3.3.x Backend (:8080)"]
        SEC_FILTER["Dual-Auth Security Filter\n(JwtAuthenticationFilter)"]
        FB_VERIFIER["Firebase Admin Token Verifier\n(FirebaseTokenVerifier.java)"]
        CONTROLLERS["REST Controllers\n(Labs, Experiments, Quizzes, Progress, Feedback)"]
        H2_DB[("Embedded H2 Database / PostgreSQL\n(JPA & Hibernate)")]
    end

    UI --> AUTH_CTX
    AUTH_CTX <-->|Login / Register| FB_AUTH
    AUTH_CTX <-->|Sync Profile & Notes| FIRESTORE
    AUTH_CTX -->|Injects Firebase Bearer Token| API_CLIENT
    API_CLIENT -->|HTTP REST Requests| SEC_FILTER

    SEC_FILTER -->|Verify Firebase Token| FB_VERIFIER
    FB_VERIFIER <-->|Token Validation| FB_AUTH
    SEC_FILTER -->|JIT Provision / Authenticate| H2_DB
    SEC_FILTER --> CONTROLLERS
    CONTROLLERS <--> H2_DB
```

---

## 🌟 Key Features & Laboratory Modules

### 1. Pure Java DSA 4-Part Experiment Workspace
Every laboratory experiment follows an exhaustive 4-part educational workflow:
- **Part 1: Video Tutorial & Theory Breakdown**: Embedded YouTube lecture videos, learning objectives, asymptotic time/space complexity matrices, and real-world industrial use cases.
- **Part 2: Interactive Java DSA Simulator**: Visual step-by-step state animator with speed controls (0.5x, 1.0x, 2.0x), timeline scrubber, comparison/swap counters, and sound feedback synthesizer.
- **Part 3: JVM Call Stack & Recursion Tree Trace**: Live LIFO frame push/pop animation with stack depth counters, SVG recursive call hierarchy trees, and line-by-line Java code transpiler.
- **Part 4: LeetCode Practice & Self-Assessment**: Curated coding challenges with difficulty tags (Easy, Medium, Hard), Java starter templates, and self-assessment quiz engine with instant score calculation and rationale explanations.

### 2. Four Core AI & DS Laboratories
1. **Data Structures & Algorithms Lab (DSL — AD8381)**: Arrays, Stacks, Queues, Linked Lists, Trees (BST, AVL), Heaps, Graphs (Dijkstra), Sorting & Searching.
2. **Machine Learning & Deep Learning Lab (MLDL — AD8481)**: Linear Regression, Logistic Regression, Decision Trees, Random Forests, SVM, K-Means Clustering, Neural Networks.
3. **Database Management Systems Lab (DBMS — AD8382)**: SQL DDL/DML, Relational Algebra, Normalization (1NF to BCNF), Joins, Subqueries, Transaction ACID properties.
4. **Computer Networks & Protocols Lab (CEN — AD8581)**: Socket Programming, TCP/UDP Client-Server, Subnetting, Routing Algorithms, Packet Sniffing.

### 3. ML Prerequisite Track
- **12 Interactive NumPy Master Modules**: Array creation, dimensional slicing, boolean masking, broadcasting, reshaping, linear algebra dot products, and random weight initialization.
- **Pandas Data Analysis**: Series, DataFrames, NaN imputation, and GroupBy operations.

### 4. Student Learning Dashboard & Certification
- Dynamic learner metrics: Completed labs counter, quiz accuracy %, certification status.
- Printable, high-fidelity **Lab Completion Certificate** with dynamic QR verification badge.
- **Academic Tabs**:
  - 📋 **Lab Assessments**: Attempt history, scores, and timestamped reviews.
  - 📁 **Lab Files & Manuals**: Cloud-synced folder organizer for lab observation manuals and datasets.
  - 📝 **Viva Notes**: Algorithm cheat sheets, derivations, and exam preparation notes.
  - 👥 **Batch Partners**: Collaborative lab partner assignments and faculty mentor mapping.

---

## 🛠️ Tech Stack Overview

### Frontend
- **Framework**: Next.js 15 (App Router, React 19)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS, Radix UI primitives, Lucide Icons
- **Animation & FX**: Framer Motion, Canvas Confetti
- **State Management**: React Context (`auth-context.tsx`) + Cloud Firestore + LocalStorage fallback
- **Visualizers**: Interactive SVG Canvas, JVM Call Stack animator, AST Code Runner

### Backend
- **Framework**: Spring Boot 3.3.2
- **Language**: Java 17 LTS / 21
- **Security**: Spring Security + **Firebase Admin SDK 9.3.0** + `jjwt` 0.12.5
- **ORM & Data**: Spring Data JPA, Hibernate, H2 In-Memory Database (Embedded) / PostgreSQL
- **Documentation**: SpringDoc OpenAPI 3 / Swagger UI (`/swagger-ui.html`)

### Database & Cloud Services
- **Firebase Authentication**: Google OAuth 2.0 & Email/Password authentication
- **Cloud Firestore**: Real-time NoSQL cloud database for student profiles, files, notes, and teams
- **Firestore Security Rules**: Role and UID-based access control policies

---

## 📂 Repository Structure

```
clg dept/
├── backend/                               # Spring Boot 3.3 Java Backend
│   ├── pom.xml                            # Maven dependencies (Firebase Admin, JPA, Security)
│   ├── README.md                          # Backend REST API documentation
│   └── src/main/
│       ├── java/com/college/virtuallab/
│       │   ├── VirtualLabApplication.java # Spring Boot entrypoint
│       │   ├── config/                    # SecurityConfig, FirebaseConfig, FirebaseTokenVerifier, JwtFilter
│       │   ├── auth/                      # Login/Register endpoints & AuthService
│       │   ├── user/                      # User entity, Role enum, UserRepository
│       │   ├── lab/                       # Lab entity, LabController, LabService
│       │   ├── experiment/                # Experiment entity & REST controller
│       │   ├── quiz/                      # Quizzes, questions, attempt submission
│       │   ├── progress/                  # Student progress tracking & ratings
│       │   ├── department/                # Engineering departments & courses
│       │   └── feedback/                  # Student reviews & ratings
│       └── resources/
│           └── application.yml            # Server port (8080), DB config, JWT & Firebase properties
│
├── frontend/                              # Next.js 15 App Router Frontend
│   ├── app/                               # Route handlers & views
│   │   ├── page.tsx                       # Homepage (Hero, Objectives, Broad Areas, Announcements)
│   │   ├── labs/                          # Laboratory catalog & VLab sidebar pages
│   │   ├── experiments/[id]/              # 4-part experiment workspace
│   │   ├── visualizer/                    # Dedicated DSA visualization studio
│   │   ├── dashboard/                     # Student profile, certificate & tabs
│   │   └── auth/login/                    # Firebase authentication page
│   ├── components/                        # Modular React components
│   │   ├── auth/                          # StudentAuthDialog modal (Google & Email)
│   │   ├── dashboard/                     # ProgressCard, CertificateModal, Files, Notes, Team
│   │   ├── navigation/                    # Navbar (VSB logo, theme toggle, profile menu), Footer
│   │   ├── visualizer/                    # Dynamic animation controls & graph canvases
│   │   └── ui/                            # Shadcn UI primitives (dialog, tabs, badge, card)
│   ├── context/
│   │   └── auth-context.tsx               # Firebase Auth state & user synchronization
│   ├── lib/
│   │   ├── firebase.ts                    # Firebase client initialization & Firestore helpers
│   │   ├── api.ts                         # Spring Boot REST API client
│   │   ├── storage.ts                     # Local progress persistence fallback
│   │   └── recursion-code-runner.ts       # JVM stack trace simulator
│   ├── public/                            # Static images, icons, and logos
│   ├── .env.local                         # Active environment variables
│   ├── .env.local.example                 # Environment configuration template
│   └── firestore.rules                    # Frontend Firestore security rules
│
├── firestore.rules                        # Root Firestore security rules
├── package.json                           # Root scripts and workspace config
└── README.md                              # Main project documentation (this file)
```

---

## 🚀 Step-by-Step Setup Guide

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js**: `v18.x` or `v20.x` LTS ([Download](https://nodejs.org/))
- **Java JDK**: OpenJDK `17` or `21` LTS ([Download](https://adoptium.net/))
- **Apache Maven**: (Optional if using IDE runner) `3.8+` ([Download](https://maven.apache.org/))
- **Git**: ([Download](https://git-scm.com/))

---

### 1. Firebase & Environment Configuration

Create or verify the `.env.local` file inside the `frontend` folder:

```bash
# Location: frontend/.env.local

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAYS8N8C25-VWYUfCDh1OrUq__DxgVBgXk
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=virtual-lab-e7495.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=virtual-lab-e7495
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=virtual-lab-e7495.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=341602998056
NEXT_PUBLIC_FIREBASE_APP_ID=1:341602998056:web:3e78ace74d2fd34680e21d

# Spring Boot REST API Base URL
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

---

### 2. Cloud Firestore Rules Setup

Deploy the security rules from `firestore.rules` to your Firebase Console:

```rules
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // 1. User document and nested subcollections (folders, files, notes, teamMembers)
    match /users/{uid} {
      allow read, write: if request.auth != null && (request.auth.uid == uid || resource.data.uid == request.auth.uid);
      allow create: if request.auth != null;
      
      match /{allSubcollections=**} {
        allow read, write: if request.auth != null;
      }
    }

    // 2. Allow reading users collection for account validation
    match /users/{document} {
      allow read: if request.auth != null;
    }

    // 3. Students collection indexed by Register Number
    match /students/{registerNumber} {
      allow read: if true;
      allow write, create, update, delete: if request.auth != null;
    }

    // 4. Announcements, Feedbacks, and Quizzes
    match /announcements/{announcementId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /feedbacks/{feedbackId} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }

    match /quizzes/{quizId}/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

### 3. Frontend Setup (Next.js)

1. Open a terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

### 4. Backend Setup (Spring Boot)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Run the application via Maven:
   ```bash
   mvn spring-boot:run
   ```
   *Or open `backend` in IntelliJ IDEA / VS Code / Eclipse and run `VirtualLabApplication.java`.*

3. The backend will initialize on port **8080** with context path `/api/v1`:
   - **Base URL**: `http://localhost:8080/api/v1`
   - **Interactive Swagger UI**: [http://localhost:8080/api/v1/swagger-ui.html](http://localhost:8080/api/v1/swagger-ui.html)
   - **Embedded H2 Console**: [http://localhost:8080/api/v1/h2-console](http://localhost:8080/api/v1/h2-console) (JDBC URL: `jdbc:h2:mem:virtuallabdb`, User: `sa`, Password: *blank*)

---

## 🔄 Authentication & Data Flow Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Student as Student / User
    participant NextJS as Next.js 15 Client
    participant Firebase as Firebase Auth & Firestore
    participant Spring as Spring Boot Backend (:8080)
    participant Database as JPA Database (H2/Postgres)

    Student->>NextJS: Clicks "Continue with Google" / Email Login
    NextJS->>Firebase: signInWithPopup(googleProvider)
    Firebase-->>NextJS: Returns Firebase User + ID Token (JWT)
    NextJS->>NextJS: Stores token in localStorage ("vlab_auth_token")
    NextJS->>Firebase: Queries /users/{uid} or /students/{regNo}
    Firebase-->>NextJS: Returns Student Profile & Cloud Notes

    Note over NextJS,Spring: When interacting with Backend REST Endpoints
    NextJS->>Spring: GET /api/v1/progress (Header: Bearer <Firebase_ID_Token>)
    Spring->>Spring: JwtAuthenticationFilter checks token
    Spring->>Firebase: FirebaseTokenVerifier validates token signature
    Firebase-->>Spring: Valid Token (UID, Email, Name)
    Spring->>Database: Finds or auto-creates Student User (JIT Provisioning)
    Database-->>Spring: User Record (ROLE_STUDENT)
    Spring->>Spring: Sets SecurityContextHolder Authentication
    Spring->>Database: Fetches student completed lab records
    Database-->>Spring: Returns Progress List
    Spring-->>NextJS: 200 OK { success: true, data: [...] }
    NextJS-->>Student: Renders Progress Dashboard & Certificate Badge
```

---

## 📡 REST API Reference

| Method | Endpoint | Description | Access Level |
|---|---|---|---|
| `POST` | `/api/v1/auth/login` | Native email & password login, returns JWT | Public |
| `POST` | `/api/v1/auth/register` | Register new student or faculty account | Public |
| `GET` | `/api/v1/auth/me` | Fetch currently authenticated user profile | Authenticated (Firebase / JWT) |
| `GET` | `/api/v1/departments` | List all engineering departments | Public |
| `GET` | `/api/v1/courses` | List semester curriculum courses | Public |
| `GET` | `/api/v1/labs` | List all Virtual Laboratories | Public |
| `GET` | `/api/v1/labs/{slug}` | Get lab details and list of experiments | Public |
| `GET` | `/api/v1/experiments/{slug}` | Full experiment theory, procedure & simulator | Public |
| `GET` | `/api/v1/quizzes/experiment/{slug}` | Fetch quiz questions for an experiment | Public |
| `POST` | `/api/v1/quizzes/{quizId}/submit` | Submit answers, receive instant score & explanation | Authenticated |
| `GET` | `/api/v1/progress` | Student completed experiment history & badges | Authenticated |
| `POST` | `/api/v1/progress/experiments/{slug}` | Update experiment completion & star rating | Authenticated |
| `GET` | `/api/v1/announcements` | Department circulars, notices, and events | Public |
| `POST` | `/api/v1/feedback` | Submit student reviews and ratings | Public / Authenticated |

---

## 🔑 Pre-Configured Test Credentials

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Department Admin** | `admin@vsb.ac.in` | `admin123` | Full lab management, circulars, curriculum editing |
| **Faculty Mentor** | `faculty@vsb.ac.in` | `faculty123` | Student review, score monitoring, viva feedback |
| **Student** | `student@vsb.ac.in` | `student123` | Experiment simulation, quizzes, certificates, notes |

*(Google Sign-In with any Google account is also supported and automatically provisions a student profile).*

---

## 🏛️ Institutional Alignment

- **Institution**: **V.S.B. Engineering College**, Karur, Tamil Nadu
- **Department**: **Department of Artificial Intelligence & Data Science (AI & DS)**
- **Curriculum Alignment**: Anna University / Autonomous Regulation Syllabi
- **Standards Reference**: National Virtual Labs Initiative, NMEICT, Ministry of Education, Govt. of India

---

## 📄 License

This project is developed for educational and academic laboratory instruction under the **AGPL-3.0 License**.
