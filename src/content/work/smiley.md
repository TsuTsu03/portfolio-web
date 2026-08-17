---
caseNumber: "002"
title: "Smiley: Multi-Tenant Dental Practice Platform"
shortTitle: "Smiley"
summary: "Multi-tenant dental platform with isolated patient records, appointment scheduling, reminders and a branded subdomain for each clinic."
metaDescription: "Multi-tenant dental SaaS case study with clinic data isolation, subdomain routing, patient records, scheduling and reminders."
category: "SaaS"
sector: "Dental"
role: "Full-stack developer, tenancy model through interface"
businessProblem: "Independent dental practices often fall back to shared spreadsheets because practice software is priced for larger groups. A platform that serves several clinics must keep every patient's data inside the correct tenant without relying on developer memory."
solution: "Smiley serves several clinics from one application. The data layer enforces tenant scope, each practice has a branded subdomain, and records, schedules and reminders inherit the clinic boundary by default."
ownership:
  - "Multi-tenant data model with per-clinic isolation"
  - "Subdomain routing and per-clinic branding"
  - "Patient records and appointment scheduling"
  - "Appointment reminder flow"
  - "Clinic-facing portal and patient-facing surfaces"
architecture:
  - decision: "Tenant identity resolved from the subdomain, then carried through the session"
    rationale: "Tenant scope is established once at the edge of the request rather than passed as a parameter every query could forget."
  - decision: "Shared schema with tenant-scoped policies rather than a database per clinic"
    rationale: "Keeps migrations and deployment to one path while still isolating rows, which matters when the number of clinics is unknown."
  - decision: "Clinic branding lives in the tenant record"
    rationale: "Adding a practice creates a tenant record. The design system remains single-source."
technologies:
  - "Next.js"
  - "TypeScript"
  - "Supabase"
  - "PostgreSQL"
  - "Tailwind CSS"
capabilities:
  - "Multi-tenant isolation"
  - "Subdomain routing"
  - "Appointment scheduling"
  - "Automated reminders"
screenshot: "../../assets/projects/smiley.png"
screenshotAlt: "Smiley dental platform interface showing the clinic portal and appointment view."
liveUrl: "https://smiley-app-tau.vercel.app/"
repositoryUrl: "https://github.com/TsuTsu03/smiley-app"
repositoryVisibility: "public"
status: "Deployed"
featured: true
order: 2
lastVerified: 2026-08-15
---

Multi-tenancy decides whether a SaaS product can safely accept its second customer.
Smiley was designed around that fact from the schema up. The boundary existed before
another clinic had a chance to test it.

### Tenant scope starts at the request

A request arrives through a clinic's subdomain. The application resolves the tenant,
attaches it to the session and applies the same scope to every query through policy.
No screen or route has to remember the clinic filter on its own.

### Each clinic carries its own identity

The clinic name, accent and public details live as data. Onboarding a practice adds a
tenant instead of a fork. The design system remains one controlled system.

### Evidence in the build

Deliberate tenant isolation, subdomain routing and an onboarding model that treats a new
clinic as an operation the product can handle.
