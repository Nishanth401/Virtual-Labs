---
name: provisioning-college-clones
description: Provisions, brands, and clones custom virtual laboratory platforms for colleges and universities. Use when onboarding new institutional tenants, generating college-specific virtual lab clones, setting up isolated student databases, configuring custom subdomains, or managing institutional free demo bookings.
---

# Provisioning College Virtual Lab Clones

This skill guides the end-to-end architecture and workflow for cloning the Virtual Lab platform for any engineering institution or university department.

## When to use this skill

- A college or university requests/books a **Free Demo** for their department.
- Onboarding a new institutional tenant (e.g., ECE, CSE, AI&DS, or an entire college campus like PSG Tech, CIT, SKCT).
- Configuring a dedicated college subdomain (e.g., `cit.virtuallabs.cloud` or `/c/[collegeSlug]`).
- Provisioning isolated student credential databases (preventing cross-college data exposure).
- Customizing college-specific syllabi, observation manuals, and faculty video lectures.

---

## Institutional Cloning Workflow

Follow this systematic checklist when setting up a college clone:

- [ ] **Step 1: Institutional Intake & Registry Entry**
  - Obtain College Name, AICTE/Anna University Code, Location, Department, and Dean/HOD Contact.
  - Add college entry to `frontend/data/colleges.ts` with brand colors, logo, and regulation info.
- [ ] **Step 2: Subdomain & Routing Setup**
  - Verify routing: `/[collegeSlug]/student-form`, `/c/[collegeSlug]`, and `/[collegeSlug]/lab`.
  - Ensure canonical redirection so students entering `/[collegeSlug]` hit the onboarding verification flow.
- [ ] **Step 3: Multi-Tenant Database Isolation**
  - Configure tenant key in `frontend/lib/supabase-multitenant.ts`.
  - Isolate student profiles with `college_slug` and `register_number` scoping.
  - Verify that student progress, quiz scores, and lab files cannot be accessed by other colleges.
- [ ] **Step 4: Custom Curriculum & Pre-Recommended Videos**
  - Upload college-specific lab manuals and observation sheets.
  - Replace or configure recommended lecture videos (e.g., bilingual Tamil/English or college faculty recordings).
- [ ] **Step 5: Student & Faculty Credential Dispatch**
  - Generate student authentication credentials or batch CSV roster.
  - Dispatch login credentials (institutional email & password) to the college administrator.
- [ ] **Step 6: Demo Booking Validation**
  - Test the "Book Free Demo" inquiry pipeline from the institutional landing page.
  - Verify instant trial sandbox access.

---

## Technical Specifications & Architecture

### 1. Tenant Registry Schema (`frontend/data/colleges.ts`)
```typescript
export interface CollegeData {
  id: string;               // e.g., 'col_cit_02'
  slug: string;             // e.g., 'cit'
  name: string;             // e.g., 'Coimbatore Institute of Technology'
  shortName: string;        // e.g., 'CIT'
  code: string;             // e.g., '7176'
  tagline: string;
  location: string;
  logo: string;
  bannerGradient: string;
  accentColor: string;
  accreditation: string[];  // ['NAAC A+', 'NBA', 'Autonomous']
  affiliations: string;
  departments: {
    code: string;
    name: string;
    classes: string[];
    years: string[];
  }[];
  curriculumInfo: {
    regulation: string;
    semesterFocus: string;
    autonomousLabFeatures: string[];
  };
  subscriptionPlan: "Enterprise Campus" | "Pro Department" | "Autonomous University";
  status: "active" | "trial" | "pending";
}
```

### 2. Tenant Data Layer Isolation (`frontend/lib/supabase-multitenant.ts`)
Always scope queries by `college_slug`:
```typescript
// Strict tenant boundary enforcement
const { data, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("college_slug", cleanCollegeSlug)
  .order("last_active", { ascending: false });
```

### 3. Student Onboarding Form Requirements
Every college clone enforces a 5-point verification modal/page:
1. Student Full Name
2. Institutional Register Number (e.g., `717621104001`)
3. Academic Year (`1st Year`, `2nd Year`, `3rd Year`, `4th Year`)
4. Department (`AI&DS`, `CSE`, `ECE`, `IT`, `MECH`, etc.)
5. Section / Class (`Section A`, `Section B`, etc.)

---

## Free Demo Booking Inquiries

When institutional stakeholders (Principals, HODs, Deans) book a demo on the B2B landing page:
1. Capture: College Name, Official Email, Phone/WhatsApp, Designation, Department, Student Strength, and Preferred Subdomain.
2. Store in `vlab_demo_bookings` table / localStorage.
3. Automatically provision a temporary sandbox link: `/c/[collegeSlug]?trial=true`.
4. Provide immediate access to the interactive college sandbox without manual wait time.
