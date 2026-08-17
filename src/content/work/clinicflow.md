---
caseNumber: "001"
title: "ClinicFlow: Healthcare Operations Platform"
shortTitle: "ClinicFlow"
summary: "Clinic operations platform that brings doctor availability, appointment scheduling and patient records under one role-aware system."
metaDescription: "Clinic operations case study covering doctor availability, appointments, patient records and role-separated staff and patient portals."
category: "SaaS"
sector: "Healthcare"
role: "Full-stack developer, data model through interface"
businessProblem: "Small clinics often run scheduling through paper diaries, group chats and memory. Reception cannot see which doctor is free, patients call to confirm appointments that were never recorded, and histories end up in whichever notebook was closest."
solution: "ClinicFlow gives availability, bookings and patient records one PostgreSQL schema. Reception manages the schedule, doctors control their queue and status, and patients can read only their own history and upcoming visits."
ownership:
  - "Relational data model for patients, practitioners, availability and appointments"
  - "Role-separated portals for administrators, doctors and patients"
  - "Appointment lifecycle and doctor status monitoring"
  - "Supabase auth, row-level access rules and query layer"
  - "Dashboard and record interfaces"
architecture:
  - decision: "Row-level security as the access boundary"
    rationale: "Access rules live next to the data rather than in interface conditionals, so a missed UI check cannot expose another patient's record."
  - decision: "One appointment table with explicit status transitions"
    rationale: "Booked, confirmed, completed and cancelled are states on one row, which keeps history intact and avoids reconciling parallel tables."
  - decision: "Portals split by role instead of one dashboard with toggles"
    rationale: "Reception, clinical and patient workflows share almost no screens. Separating them kept each surface small enough to stay usable."
technologies:
  - "Next.js"
  - "TypeScript"
  - "Supabase"
  - "PostgreSQL"
  - "Tailwind CSS"
capabilities:
  - "Role-based access control"
  - "Appointment scheduling"
  - "Practitioner status monitoring"
  - "Patient record management"
screenshot: "../../assets/projects/clinicflow.png"
screenshotAlt: "ClinicFlow dashboard showing doctor availability and the appointment schedule."
liveUrl: "https://clinicflow-beige.vercel.app/"
repositoryUrl: null
repositoryVisibility: "private"
status: "Deployed"
featured: true
order: 1
lastVerified: 2026-08-15
---

The front desk looks orderly until one question has to be answered quickly. Who is in
today? Which slot is open? Has this patient been here before? In many clinics, the answer
is divided between a wall calendar, a messaging app and one person's memory.

ClinicFlow gives those decisions one source. Availability, appointments and patient
records are different views over the same schema. When a doctor becomes unavailable,
the booking surface changes with the record.

### The database decides who sees what

Every table carries row-level policies. A patient session can read its own records. A
practitioner sees their queue. Administrators see the clinic. The interface reflects
those rules, while the database enforces them. A missed component check cannot open
another patient's file.

### An appointment keeps its history

An appointment carries its status on one row as it moves through booking, confirmation,
completion or cancellation. Its history stays intact. Patient timelines and reports no
longer have to reconstruct the truth from several tables.

### Evidence in the build

Multi-role product design, a relational model that holds up under real clinic
workflows, and access control implemented where it belongs.
