# Department Virtual Labs Platform — Backend REST API

Enterprise Java 21 & Spring Boot 3.3.x REST API powering the Department Virtual Labs Platform.

## 🚀 Features
- **Dual Authentication**: Seamlessly authenticates **Firebase ID Tokens** (Google Sign-In & Firebase Auth) with automatic JIT user provisioning, plus native Spring Security JWT tokens.
- **Spring Security + Firebase Admin SDK**: Token-based security filter with role-based access control (`ROLE_STUDENT`, `ROLE_FACULTY`, `ROLE_LAB_ADMIN`, `ROLE_DEPARTMENT_ADMIN`).
- **Spring Data JPA & Hibernate**: Entity relationships for Departments, Courses, Labs, Experiments, Quizzes, Questions, Attempts, and Progress.
- **H2 & PostgreSQL Support**: Embedded H2 database enabled by default for zero-setup local execution; ready for PostgreSQL in production.
- **OpenAPI 3 / Swagger UI**: Full interactive API documentation available at `http://localhost:8080/api/v1/swagger-ui.html`.
- **Pre-seeded Sample Data**: Automatic `DataInitializer` populates admin, faculty, student accounts, syllabus courses (Sem 1-8), and Data Structures & ML lab experiments.

## 🛠️ Tech Stack
- **Java 17 LTS / 21**
- **Spring Boot 3.3.2**
- **Firebase Admin SDK 9.3.0**
- **Spring Security** (with `jjwt-api` 0.12.5)
- **Spring Data JPA**
- **SpringDoc OpenAPI 2.5.0**
- **PostgreSQL / H2 Database**

## 🔑 Pre-Configured Test Credentials
| Role | Email | Password |
|---|---|---|
| Department Admin | `admin@vsb.ac.in` | `admin123` |
| Faculty | `faculty@vsb.ac.in` | `faculty123` |
| Student | `student@vsb.ac.in` | `student123` |

## 🏃 Running the Application

### Option A: Using Maven (if installed)
```bash
cd backend
mvn spring-boot:run
```

### Option B: In VS Code / Antigravity IDE / IntelliJ
Open the `backend` folder and run `VirtualLabApplication.java`.

---

## 📡 REST API Endpoints Overview

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/v1/auth/login` | Login with email & password, receive JWT | Public |
| `POST` | `/api/v1/auth/register` | Register new student or faculty account | Public |
| `GET` | `/api/v1/auth/me` | Fetch logged-in profile | Authenticated |
| `GET` | `/api/v1/departments` | List engineering departments | Public |
| `GET` | `/api/v1/courses` | List semester curriculum courses | Public |
| `GET` | `/api/v1/labs` | List all Department Virtual Labs | Public |
| `GET` | `/api/v1/labs/{slug}` | Lab details & experiment list | Public |
| `GET` | `/api/v1/experiments/{slug}` | Full experiment theory, procedure & simulator | Public |
| `GET` | `/api/v1/quizzes/experiment/{slug}` | Quiz questions for experiment | Public |
| `POST` | `/api/v1/quizzes/{quizId}/submit` | Submit answers, receive instant score & explanation | Authenticated |
| `GET` | `/api/v1/progress` | Student completed experiments history | Authenticated |
| `POST` | `/api/v1/progress/experiments/{slug}` | Update experiment completion & rating | Authenticated |
| `GET` | `/api/v1/announcements` | Circulars, events, and notices | Public |
| `POST` | `/api/v1/feedback` | Submit student reviews and ratings | Public / Authenticated |
