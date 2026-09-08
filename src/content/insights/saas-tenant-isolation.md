---
title: "How I design tenant isolation for operational SaaS"
description: "A practical account of tenant identity, database access boundaries and role-specific interfaces, drawn from two documented SaaS builds."
summary: "Tenant isolation works when the application establishes identity once, carries it through the request and lets the data layer enforce the boundary."
topic: "Multi-tenant SaaS architecture"
published: 2026-09-09
updated: 2026-09-09
relatedWork:
  - "clinicflow"
  - "smiley"
keywords:
  - "multi-tenant SaaS"
  - "row-level security"
  - "role-based access control"
  - "Supabase"
  - "PostgreSQL"
---

The short answer is that tenant isolation cannot depend on every screen remembering to
add the correct filter. I establish the tenant or user boundary at the start of the
request, carry it through the session and enforce it again beside the data.

## Start with the boundary, not the dashboard

In Smiley, a clinic is resolved from its subdomain. That tenant identity belongs to the
request before the application reads patient or appointment data. The same scope then
follows every query through policy.

ClinicFlow uses a related rule for roles. Patients, practitioners and administrators do
not receive one large dashboard with hidden controls. They receive separate surfaces for
their work, while row-level policies decide which records each session can read.

## Keep authorization close to the records

An interface check helps people understand what they can do, but it is not the final
access boundary. A route can be called directly. A component can be changed. Data rules
need to survive both cases.

For these builds, PostgreSQL and Supabase policies hold the decisive checks. That makes a
missed interface condition less likely to expose another clinic's or patient's records.

## Make the safe path the default

A useful tenancy model should reduce the number of places where a developer has to
remember the tenant. Smiley stores clinic branding in the tenant record and uses one
shared schema with tenant-scoped policies. Adding a clinic is a data operation, not a
fork of the application.

The same principle applies to roles. ClinicFlow keeps appointment status on one record
and gives each role a focused view over that shared source. The data stays consistent
while the interface stays specific to the job.

## What I verify before calling it isolated

I look for three things: identity is established before protected reads, direct data
access is constrained by policy and ordinary product flows do not require callers to
restate the boundary manually. The related case studies show where those decisions sit
in the two builds.
