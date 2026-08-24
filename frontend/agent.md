# Agent Directives for Department Virtual Labs Platform

## 1. Project Context & Goals
This project transforms an existing DSA (Data Structures and Algorithms) visualizer repository into a full-scale **Department Virtual Labs Platform**, heavily inspired by the National Virtual Labs (`vlab.co.in`) educational architecture. 

The goal is to provide a complete, interactive Learning Management System (LMS) combining simulation-based experiments, comprehensive theory/procedure documentation, interactive quizzes, and a student progress dashboard.

## 2. Technology Stack
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19, Tailwind CSS, shadcn/ui
- **Animations:** Framer Motion, Canvas Confetti
- **State Management & Persistence:** React Hooks + `localStorage` (Zero-Backend architecture for the MVP)

## 3. Visual Design & Reference Images Mapping
When building or updating features, strictly align them with the provided reference images:
- **`Screenshot 2026-08-24 105417.png` & `105509.png`:** Implement the tabbed **Objectives & Philosophy** banner. Build the **Broad Areas** grid showcasing different engineering disciplines (e.g., AI & Data Science, Electronics) with lab counts and icons.
- **`Screenshot 2026-08-24 110041.png`:** Build an **Announcements section** featuring notices, circulars, an embedded video showcase, and a dedicated **Testimonials** area for student and faculty reviews.
- **`Screenshot 2026-08-24 110143.png` & `110225.png`:** Standard **VLab Left Sidebar** navigation. Every lab page must have a persistent sidebar with standardized tabs: Introduction, Objective, List of Experiments, Target Audience, Course Alignment, and Feedback.
- **`Screenshot 2026-08-24 110440.png` & `111240.png`:** **Course Alignment and Syllabus** integration. Display university syllabus mapping and reference books (Tata McGraw Hill, CLRS) using clean accordion, card, or drawer UI patterns.

## 4. Implementation Plan Requirements
You must strictly follow the finalized `implementation_plan.md` architecture:

### Step 1: Core Layout
- Maintain the root layout with a `ThemeProvider`.
- Global **Navbar**: Must include a search bar, navigation links, theme toggle, and a Role Switcher (Student, Faculty, Admin).
- Global **Footer**: Must include National Virtual Labs (NMEICT) and Department branding.

### Step 2: Dynamic Workspaces & Routing
- **Public Homepage (`/`)**: Landing page featuring the Hero Objectives, Broad Areas, Announcements, and Testimonials.
- **Labs Catalogue (`/labs`)**: Filterable and searchable list of all department labs.
- **Lab Detail View (`/labs/[labId]`)**: Features the standard VLab sidebar design outlining the lab's syllabus and experiment list.
- **Experiment Workspace (`/experiments/[experimentId]`)**: A dynamic, multi-section tabbed layout for individual experiments containing:
  - Introduction & Objective
  - Theory (Markdown-based)
  - Procedure (Step-by-step instructions)
  - **Simulation Sandbox** (Embedding the DSA visualizers: Stack, Queue, Linked List, Bubble Sort, Selection Sort, Insertion Sort, Dijkstra, etc.)
  - Self-Assessment Quiz (Interactive quiz engine with immediate scoring, rationale explanations, and confetti on pass)
  - Feedback Form

### Step 3: Dashboard & Persistence
- **Student Portal (`/dashboard`)**: Use typed `localStorage` hooks (`hooks/use-student-progress.ts`, `lib/storage.ts`) to persist state across sessions.
- Track quiz attempts, scores, and completed experiments.
- Provide a feature to generate a verified, printable **Lab Completion Certificate**.

## 5. Coding Standards & Guidelines
- **Aesthetics First:** Ensure all interfaces feel premium and dynamic. Use glassmorphism, subtle gradients, border-accents, and micro-animations to enhance user engagement. 
- **Component Reusability:** Reuse existing `shadcn/ui` primitives found in `components/ui`. Keep domain-specific components modular (e.g., `components/vlab`, `components/visualizer`, `components/dashboard`).
- **Mock Data Handling:** Rely strictly on the structures defined in `data/labs.ts`, `data/experiments.ts`, `data/quizzes.ts`, and `data/syllabus.ts` for populating the views. Do not hardcode content blocks directly into the TSX files.
- **Zero-Backend:** Do not introduce external databases or APIs. Rely entirely on Next.js server components where static, and client-side `localStorage` for dynamic user data.
