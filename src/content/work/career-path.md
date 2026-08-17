---
caseNumber: "006"
title: "Career Path Recommender: Student Assessment Platform"
shortTitle: "Career Path"
summary: "Student assessment platform that explains career recommendations and gives administrators a separate view of institutional results."
metaDescription: "Student assessment case study with explained career recommendations, role-based access and MongoDB support for changing cohort formats."
category: "AI Systems"
sector: "Education"
role: "Full-stack developer, assessment model through dashboards"
businessProblem: "Career guidance in schools does not scale cleanly. One counsellor may cover hundreds of students, paper assessments move slowly, and results can arrive after the decision they were meant to inform."
solution: "Career Path turns a structured assessment into recommendations with visible reasoning. Students receive a result they can question, while administrators see a separate view of cohort choices and institutional records."
ownership:
  - "Assessment flow and response model"
  - "Recommendation output presented with supporting reasoning"
  - "Administrator dashboards over institutional data"
  - "Role-based authentication for students and administrators"
  - "Express and MongoDB API layer"
architecture:
  - decision: "Recommendations shown with their reasoning"
    rationale: "A career suggestion a student cannot interrogate is not guidance. Showing what drove the result makes it something to discuss with a counsellor."
  - decision: "Document store for assessment responses"
    rationale: "Assessment shape changes between institutions and cohorts. A document model absorbed those revisions without a migration for each one."
  - decision: "Institutional view kept separate from the student flow"
    rationale: "Administrators need aggregates, students need one result. Separate surfaces kept both readable."
technologies:
  - "React"
  - "TypeScript"
  - "Node.js"
  - "Express"
  - "MongoDB"
  - "Vite"
capabilities:
  - "Structured assessment flow"
  - "Explained recommendations"
  - "Administrator dashboards"
  - "Role-based access"
screenshot: "../../assets/projects/Carpath.png"
screenshotAlt: "Career Path Recommender interface showing an assessment result with its supporting reasoning."
liveUrl: null
repositoryUrl: "https://github.com/TsuTsu03/career-path"
repositoryVisibility: "public"
status: "Deployment offline"
featured: false
order: 6
lastVerified: 2026-08-15
---

> **Deployment status.** The previous hosted demo returned 404 when the links on
> this site were last checked on 15 August 2026, so no live link is offered here.
> The source repository is public and the screenshot is from the working build.

Career guidance becomes difficult when one counsellor is responsible for hundreds of
students. The platform handles the structured assessment so the human conversation can
begin with evidence already on the table.

### A recommendation must explain itself

The result shows which answers influenced the recommendation. A student can examine the
reasoning, challenge it and take a more informed conversation to a counsellor.

### The data model accepts changing assessments

Institutions revise their questions between cohorts. The document model accepts those
changes without demanding a schema migration for every new assessment shape.

### Evidence in the build

An explained recommendation flow, role-based access and a clean boundary between the
student result and the institutional view.
