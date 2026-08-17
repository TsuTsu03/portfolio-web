---
caseNumber: "004"
title: "ShiftDesk: Workforce Ticketing and Shift Tracking"
shortTitle: "ShiftDesk"
summary: "Workforce platform combining GPS-verified clock-ins, threaded support tickets and role-specific dashboards for employees and managers."
metaDescription: "Workforce SaaS case study with GPS-verified clock-ins, threaded ticket lifecycles and role-separated employee and admin views."
category: "SaaS"
sector: "HR and internal operations"
role: "Full-stack developer, schema through role dashboards"
businessProblem: "Distributed teams often track attendance in one tool, raise IT problems in another and escalate through a group chat where requests disappear. Managers cannot see who is on shift and what is blocking them from the same place."
solution: "ShiftDesk puts attendance and support inside one operating picture. Clock-ins carry location evidence, tickets move through named states with their history attached, and each role sees the decisions it is responsible for."
ownership:
  - "Shift and attendance data model with location capture"
  - "Ticket lifecycle and assignment logic"
  - "Chat-first support thread per ticket"
  - "Role-separated dashboards for employees, managers and administrators"
  - "Authentication and access boundaries"
architecture:
  - decision: "Clock-in stores the captured coordinates with the shift record"
    rationale: "Attendance disputes are settled against the record that created them rather than a separate location log that may not line up."
  - decision: "The conversation belongs to the ticket"
    rationale: "Context and resolution live together, so reassigning a ticket carries its history."
  - decision: "Dashboards derived per role from shared tables"
    rationale: "One source of attendance and ticket data, three read models, no synchronisation between them."
technologies:
  - "Next.js"
  - "Supabase"
  - "PostgreSQL"
  - "Tailwind CSS"
capabilities:
  - "GPS-verified clock-in"
  - "Ticket lifecycle management"
  - "Threaded support conversations"
  - "Role-based dashboards"
screenshot: "../../assets/projects/Employee.png"
screenshotAlt: "ShiftDesk dashboard showing the shift roster alongside the open ticket queue."
liveUrl: "https://employee-system-nine-rosy.vercel.app/"
repositoryUrl: "https://github.com/TsuTsu03/employee-ticketing-system"
repositoryVisibility: "public"
status: "Deployed"
featured: true
order: 4
lastVerified: 2026-08-15
---

A manager needs two answers at the start of a shift: who is working, and what is keeping
them from working. ShiftDesk keeps both answers in the same operating picture.

### Attendance keeps the evidence beside the claim

A clock-in stores its captured location on the shift record. If attendance is questioned
weeks later, the evidence is already attached to the event instead of waiting in another
log to be matched by timestamp.

### A ticket never loses its history

The support thread belongs to the ticket. Reassignment carries the history with it, so the
next person continues the diagnosis. Named states make progress visible without guessing
from the age of the latest reply.

### Evidence in the build

Two related workflows sharing one source of truth, role-separated employee and manager
surfaces, and evidence stored beside the event it may need to defend.
