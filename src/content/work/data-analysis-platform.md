---
caseNumber: "005"
title: "SaaS Data Analysis Platform: AI-Assisted Insight Pipeline"
shortTitle: "Data Analysis Platform"
summary: "AI-assisted data platform that normalises business uploads, constrains model output and returns a dashboard the application can trust."
metaDescription: "AI data platform case study: normalise business uploads, constrain OpenAI output and render validated analysis in a dashboard."
category: "AI Systems"
sector: "Business intelligence"
role: "Full-stack developer, ingestion, AI layer and interface"
businessProblem: "Small businesses hold useful data without a dedicated analyst to interpret it. Pasting a spreadsheet into a generic chat produces confident prose, but it gives the application no dependable structure and no safe way to separate a source figure from an invented one."
solution: "The platform treats AI as one controlled stage in a data pipeline. It ingests and normalises the upload, prepares the context, constrains the response to a known schema and renders only the fields the dashboard expects."
ownership:
  - "Data ingestion and normalisation path"
  - "Prompt construction against prepared context rather than raw dumps"
  - "Structured output handling that maps responses into interface fields"
  - "Insight dashboard and analysis views"
  - "Application data layer and authentication"
architecture:
  - decision: "The model receives prepared context"
    rationale: "Normalising first keeps the prompt inside a predictable size and stops formatting noise from being read as signal."
  - decision: "Responses constrained to a defined shape"
    rationale: "The interface renders fields, not paragraphs. A response that does not fit the shape fails visibly instead of rendering as a broken card."
  - decision: "The analysis call remains one stage of the pipeline"
    rationale: "Ingestion and presentation are ordinary application code. Isolating the model call keeps the rest of the system testable and the cost surface small."
technologies:
  - "Next.js"
  - "TypeScript"
  - "OpenAI API"
  - "Supabase"
  - "Tailwind CSS"
capabilities:
  - "Data ingestion and normalisation"
  - "Structured model output"
  - "Prompt orchestration"
  - "Insight dashboard"
screenshot: "../../assets/projects/saas.png"
screenshotAlt: "Data analysis platform dashboard showing generated summaries alongside uploaded dataset figures."
liveUrl: "https://data-analysis-nine.vercel.app/"
repositoryUrl: "https://github.com/TsuTsu03/saas-data-analysis-platform"
repositoryVisibility: "public"
status: "Deployed"
featured: true
order: 5
lastVerified: 2026-08-15
---

An AI feature earns trust at the boundary around the model. The response must fit the
interface, the cost must stay visible and failure must leave the user somewhere safe.
Generating fluent prose is the easy part.

### The model stays inside the pipeline

The sequence is explicit: upload, parse, normalise, prompt, validate, render. One step
calls the model. Keeping it in that position makes the surrounding system testable and
puts a known boundary around the prompt.

### The interface receives a contract

The response must match the fields the dashboard renders. If it misses the contract, the
system fails visibly and stops. It never places persuasive prose where a verified figure
belongs.

### Evidence in the build

Context preparation, structured output and explicit failure states around a model that
will sometimes be wrong.
