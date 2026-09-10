# 🚀 Virtual Labs Platform — B2B College Onboarding & Free Demo Engine

Welcome to the **Virtual Labs Institutional Landing Page & College Provisioning Module**.

## 🎯 Product Purpose

This module represents the primary public-facing portal for prospective engineering institutions, autonomous universities, and polytechnic colleges looking to adopt an accredited, turnkey Virtual Laboratory platform.

### Core Value Proposition for Institutions:
1. **Instant Institutional Clone**: Any college can request an isolated Virtual Lab clone branded with their college name, logo, color palette, and dedicated subdomain (e.g., `psg.virtuallabs.cloud` or `/c/psg`).
2. **Private Student Credential Roster**: Each institution receives an isolated database. Students log in with their institutional email and password. No cross-college access or data contamination.
3. **Personalized 5-Field Student Verification**: Students verify their University Register Number, Academic Year, Department, and Section.
4. **Tailored Curricular Assets**: Pre-configured with the college's syllabus regulation, faculty-curated video masterclasses, and observation lab sheets.
5. **Continuous Evaluation & Accreditation**: Automated Continuous Internal Evaluation (CIE) logging, rubric grading, and NAAC (Criteria 1 & 2) / NBA (Criteria 2, 4 & 5) compliant export sheets.

---

## 📂 Architecture & Directory Layout

```
landing-page/
├── README.md                              # This specification and operations manual
│
frontend/components/landing-page/          # Modular B2B React Component Suite
├── book-demo-modal.tsx                    # Interactive modal for booking institutional demos
├── hero-section.tsx                       # High-converting enterprise hero banner
├── how-clones-work.tsx                    # 4-step college clone setup pipeline
├── interactive-clone-switcher.tsx         # Live interactive college clone switcher
├── labs-directory-grid.tsx                # Visual showcase of all 12 engineering labs
├── student-journey-flow.tsx               # Walkthrough of the student onboarding experience
├── security-and-isolation.tsx             # Multi-tenant data isolation & zero-leak guarantees
├── accreditation-and-roi.tsx              # NAAC / NBA criteria & CIE automation overview
├── pricing-section.tsx                    # Institutional licensing tiers & ROI calculator
├── institutional-faq-section.tsx          # Top administrative & technical buyer FAQs
└── cta-banner.tsx                         # Persistent high-converting bottom action bar
```

---

## ⚡ 4-Step Institutional Cloning Pipeline

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│ 1. Demo Booking Request │ ──> │ 2. Isolated DB & Subdom │ ──> │ 3. Student Credentials  │ ──> │ 4. Custom Labs & CIE    │
│ College details & HOD   │     │ Dedicated tenant key    │     │ Email/Pass + RegNo      │     │ Custom videos, manuals  │
│ contact captured        │     │ & branded subpath       │     │ verification workflow   │     │ & NAAC/NBA score audit  │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
```

1. **Step 1: Demo Booking Request**: An authorized faculty member, HOD, or Dean fills the "Book Free Demo" form with student capacity and preferred subdomain.
2. **Step 2: Subdomain & Isolated Database Setup**: The platform registers the tenant entry in `colleges.ts` and isolates all future student activity in Supabase PostgreSQL tables scoped strictly by `college_slug`.
3. **Step 3: Student Credentials Dispatched**: Students log in with institutional credentials, verify their register number and department, and land on their personalized dashboard.
4. **Step 4: Custom Curriculum Activated**: The college's faculty can upload observation sheets and recommended videos via the Admin Portal (`/admin`), while students practice simulations and take timed quizzes.
