---
caseNumber: "008"
title: "CodeDaddy: Browser-Based Web Development Learning Platform"
shortTitle: "CodeDaddy"
summary: "Free, project-led learning platform that teaches front-end development through small browser-based coding tasks, live previews and deterministic checks."
metaDescription: "CodeDaddy case study: a free, Philippines-first front-end learning platform with in-browser coding, deterministic checks and offline access."
category: "SaaS"
sector: "Education technology"
role: "Product and full-stack developer, curriculum system through deployment"
businessProblem: "Complete beginners are often asked to jump from passive lessons into an empty project. Local setup, unfamiliar tools and vague feedback add friction before they can practise the concept they just learned."
solution: "CodeDaddy keeps the learning loop in one browser tab. Ten ordered courses break front-end development into small tasks, then connect each edit to a live preview, a specific browser check and a project rooted in everyday Filipino life."
ownership:
  - "Product architecture and the complete learner journey from landing page to capstone proof"
  - "Typed curriculum model and structured content for 2,760 guided steps"
  - "Browser workspaces for HTML, CSS, JavaScript, React and TypeScript"
  - "Deterministic grading, curriculum integrity checks and real-browser regression harnesses"
  - "Local-first progress, offline course access and phone-sized learning workflows"
  - "Supabase authentication, persistence routes, row-level access policies and certificate gates"
architecture:
  - decision: "Deterministic checks before model-generated feedback"
    rationale: "A learner gets a repeatable pass or a specific requirement to inspect. Core grading does not depend on a probabilistic answer or a paid model call."
  - decision: "Purpose-specific sandboxed frames"
    rationale: "Learner code, previews and graders run in separate frames with only the browser capabilities each task needs, keeping authored content and application state outside the execution boundary."
  - decision: "Curriculum authored as typed data"
    rationale: "Courses, projects, steps and assertions share one closed model, so automated gates can catch broken starts, unreachable solutions and malformed teaching content before release."
  - decision: "Useful without an account"
    rationale: "Progress is saved in the browser first. Signing in adds explicit cross-device sync without making authentication a gate to the free learning path."
technologies:
  - "Next.js 16"
  - "React 19"
  - "TypeScript"
  - "Tailwind CSS 4"
  - "Supabase"
  - "PostgreSQL"
capabilities:
  - "Ten-course front-end learning path"
  - "In-browser editor and live preview"
  - "Deterministic browser-based grading"
  - "Offline course access"
  - "Phone-sized learning workspace"
  - "Practice activities and five capstone projects"
screenshot: "../../assets/projects/codedaddy.png"
screenshotAlt: "CodeDaddy landing page presenting its free browser-based web development learning path."
liveUrl: "https://www.codedaddy.online/"
repositoryUrl: "https://github.com/TsuTsu03/interactive-career-academy"
repositoryVisibility: "public"
status: "Deployed"
featured: true
order: 1
lastVerified: 2026-09-09
---

CodeDaddy begins with a practical constraint: a new learner should be able to write code
before installing a toolchain or creating an account. The task, editor, preview and check
all live in one workspace, so the distance between reading and doing stays short.

### The browser is the classroom and the safety boundary

HTML, CSS, JavaScript, React and TypeScript exercises run inside purpose-specific sandboxed
frames. A preview can execute learner code without receiving same-origin access to the
application. Grading runs separately and returns plain results to the workspace.

### The curriculum is testable software

Courses are typed data rather than pages assembled by hand. Starts, solutions, assertions
and teaching representations pass automated content gates and real-browser harnesses. The
completed front-end path contains 2,760 guided steps, eight practice activities and five
capstones.

### Progress works before an account does

The learning path saves progress locally and remains usable on a phone or after a loaded
course goes offline. Account sync is an explicit upgrade to that local record, not a gate
placed in front of the curriculum.

### Evidence in the build

Ten ordered courses, browser-based grading, offline recovery, responsive workspaces and a
public source repository that exposes the curriculum model and its verification tools.
