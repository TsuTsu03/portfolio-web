---
caseNumber: "003"
title: "Biyahero Express: Logistics Operations System"
shortTitle: "Biyahero Express"
summary: "Logistics operations platform that follows a shipment through booking, dispatch, proof of delivery, COD remittance and invoicing."
metaDescription: "Courier logistics case study covering dispatch, shipment tracking, proof of delivery, COD reconciliation and client invoicing."
category: "Operations"
sector: "Logistics"
role: "Full-stack developer, operations model through interface"
businessProblem: "Regional couriers often coordinate by phone. A booking starts in one place, dispatch happens in another, proof of delivery arrives in a chat thread, and cash collected in the field is reconstructed from memory at the end of the week."
solution: "Biyahero Express follows one shipment from booking to remittance. Assignments, delivery status, proof, cash handling and invoicing stay attached to the same record, giving dispatch and finance one account of what happened."
ownership:
  - "Booking and dispatch data model"
  - "Delivery tracking and status lifecycle"
  - "Route planning views"
  - "Proof-of-delivery capture"
  - "Cash-on-delivery remittance and invoicing flows"
  - "Fleet and driver records"
architecture:
  - decision: "One shipment record carries the full lifecycle"
    rationale: "Booking, dispatch, delivery and remittance are stages on one record, so nothing has to be reconciled across tables at the end of a run."
  - decision: "Cash-on-delivery tracked as an obligation attached to the shipment"
    rationale: "Money collected in the field is the hardest thing to reconcile. Tying it to the delivery record makes the outstanding balance a query rather than a spreadsheet."
  - decision: "Operational dashboards built on the same tables as the workflow"
    rationale: "No reporting copy of the data means the dashboard cannot drift from what dispatch is actually looking at."
technologies:
  - "Next.js"
  - "TypeScript"
  - "Supabase"
  - "PostgreSQL"
  - "Tailwind CSS"
capabilities:
  - "Shipment lifecycle tracking"
  - "Route planning"
  - "Proof of delivery"
  - "COD reconciliation"
  - "Invoicing"
screenshot: "../../assets/projects/logistics.png"
screenshotAlt: "Biyahero Express logistics dashboard showing active deliveries and fleet status."
liveUrl: "https://logistics-system-five.vercel.app/dashboard"
repositoryUrl: "https://github.com/TsuTsu03/logistics-system"
repositoryVisibility: "public"
status: "Deployed"
featured: true
order: 3
lastVerified: 2026-08-15
---

Courier work leaves a trail of handoffs, physical evidence and money moving back toward
the business. A generic CRUD dashboard loses that trail. The model has to understand the
operation before the interface can tell the truth.

### One shipment carries the whole chain

Booking, assignment, transit, delivery, proof and remittance attach to the same shipment.
The end-of-day position becomes a query instead of an afternoon spent matching paper.

### Cash in the field remains accountable

Cash collected by a driver remains an obligation until remittance. Tying that obligation
to the shipment that created it turns reconciliation into a balance the system can show.

### Evidence in the build

Domain modelling under operational pressure, a shipment lifecycle that survives partial
failure and dashboards that read from the same working tables as dispatch.
