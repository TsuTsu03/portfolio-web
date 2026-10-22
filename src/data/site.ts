/**
 * Single source of truth for every factual claim the site makes about Den.
 *
 * Anything here is rendered into visible copy *and* into structured data, so a
 * value that stops being true has to be corrected in exactly one place.
 */

export const SITE_URL = "https://denforge.it.com";
export const SITE_DOMAIN = "denforge.it.com";

/**
 * DenForge is the name of Den's independent software practice. The person
 * stays the primary entity; `SITE_NAME` is the business name search and answer
 * engines can attach to him, not a separate company or team.
 */
export const SITE_NAME = "DenForge";
export const SITE_UPDATED = "2026-10-22";

/**
 * Retired hosts, kept so redirects and machine feeds can state where the site
 * used to live. A migration only carries its history if the old address is
 * still named somewhere crawlers can read it.
 */
export const previousDomains = ["jansen-dev.vercel.app"] as const;

export const person = {
  name: "Den Jansen Flores",
  alternateName: "Jansen Flores",
  shortName: "Den",
  initials: "DJF",
  /** The business positioning: what he does for clients, ahead of job titles. */
  headline: "software solutions and technology consulting for businesses",
  businessRole: "Software Solutions Consultant",
  role: "Senior Full-Stack Developer",
  secondRole: "Agentic AI Engineer",
  /** Named on its own so answer engines see mobile as a role, not only a topic. */
  thirdRole: "Mobile App Developer",
  locality: "Muntinlupa City",
  region: "Metro Manila",
  country: "Philippines",
  countryCode: "PH",
  timezone: "UTC+8",
  email: "floresjansen28@gmail.com",
  /** Published by the owner in the previous release; kept intentionally public. */
  phone: "+63 935 0361 046",
  phoneE164: "+639350361046",
  github: "https://github.com/TsuTsu03",
  linkedin: "https://www.linkedin.com/in/den-jansen-flores-79b8ba387/",
  instagram: "https://www.instagram.com/_dennndd",
  yearsActive: "4+",
  availability: "Taking on new client projects",
  engagements: "Custom software, mobile apps, AI automation and technology consulting for businesses",
} as const;

/**
 * Professional history as the website presents it. Rendered on the résumé
 * page, in the Person structured data and in the machine feeds, so the dates
 * only ever need correcting here.
 *
 * Salaried employment after January 2025 is deliberately left off the site; it
 * appears only on the downloadable CV Den sends directly.
 */
export const experience = [
  {
    title: "Software Solutions Consultant and Developer",
    organization: "DenForge (independent practice)",
    start: "2025-02",
    end: null,
    period: "February 2025 to present",
    highlights: [
      "Help businesses replace manual, spreadsheet-driven work with custom web platforms, mobile apps and AI automation.",
      "Advise owners and teams on what to build, which tools to use and what to leave out before any code is written.",
      "Designed and built web applications for clients across several JavaScript frameworks, with responsive and maintainable architecture.",
      "Built Android and iOS apps with React Native and Expo, and with Flutter and Dart, including on-device storage and camera pipelines.",
      "Implemented secure backend services, API integrations and server-side logic behind interactive interfaces.",
      "Work directly with clients to turn business needs into technical requirements, scope and delivery plans, and deliver within agreed deadlines.",
      "Optimised application workflows for usability, scalability and performance across devices.",
    ],
  },
  {
    title: "Senior Assistant Software Engineer",
    organization: "Advanced World Solutions, Inc.",
    start: "2024-07",
    end: "2025-01",
    period: "July 2024 to January 2025",
    highlights: [
      "Directed core front-end framework development and system maintenance.",
      "Streamlined client workflows with new UI utilities and automated testing tools.",
      "Modernised legacy component libraries, improving page speed by 35%.",
      "Ran cross-team code reviews to hold quality standards and resolve issues quickly.",
    ],
  },
  {
    title: "Assistant Software Engineer",
    organization: "Advanced World Solutions, Inc.",
    start: "2023-07",
    end: "2024-07",
    period: "July 2023 to July 2024",
    highlights: [
      "Developed web client features, API integrations and bug fixes from client requirements.",
      "Wrote automated unit tests for front-end components with Jest and ESLint.",
      "Worked with QA and backend teams to keep deployment cycles smooth.",
      "Kept front-end quality high and cross-browser behaviour consistent.",
    ],
  },
  {
    title: "Junior Software Engineer",
    organization: "Advanced World Solutions, Inc.",
    start: "2022-07",
    end: "2023-07",
    period: "July 2022 to July 2023",
    highlights: [
      "Supported the team lead on front-end design and implementation.",
      "Built responsive UI and interactive components with React and TypeScript.",
      "Wrote test plans and ran manual and unit tests for code reliability.",
      "Analysed and optimised existing front-end modules for stability.",
    ],
  },
] as const;

export const certifications = [
  {
    name: "Certified Entry-Level JavaScript Programmer",
    issuer: "OpenEDG Python Institute",
    date: "2023-03",
    period: "March 2023",
  },
  {
    name: "Internal Java OCA Certification",
    issuer: "Advanced World Solutions, Inc.",
    date: "2022-12",
    period: "December 2022",
  },
  {
    name: "Certified Philippine IT Passport Passer",
    issuer: "Philippine National IT Standards Foundation",
    date: "2019-05",
    period: "May 2019",
  },
] as const;

export const education = {
  degree: "Bachelor of Science in Electronics Engineering",
  school: "Technological University of the Philippines, Manila",
  period: "2018 to 2022",
} as const;

/** Skills grouped the way the CV groups them, with mobile and AI named outright. */
export const skillGroups = [
  { name: "Frontend", items: ["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS"] },
  { name: "Mobile", items: ["React Native", "Expo", "Flutter", "Dart", "Android", "iOS"] },
  { name: "Backend", items: ["Node.js", "Express.js", "NestJS", "REST APIs", "Serverless APIs"] },
  { name: "Databases", items: ["PostgreSQL", "Supabase", "MySQL", "MongoDB", "Firebase", "Redis"] },
  { name: "Cloud and DevOps", items: ["AWS Lambda", "AWS S3", "Terraform", "Azure DevOps", "Docker", "GitHub Actions", "GitLab CI"] },
  { name: "AI engineering", items: ["OpenAI API", "Claude API", "Tool calling", "Retrieval", "Structured output"] },
  { name: "Testing and tools", items: ["Jest", "Vitest", "Postman", "ESLint", "SonarQube", "Zod", "Yup"] },
] as const;

/**
 * Résumé route. Kept on the canonical domain so recruiters and crawlers can
 * read the same current, source-backed professional profile.
 */
export const resumeUrl = "/resume";

export const seo = {
  title: `${person.name} | Software Solutions and Consulting for Business`,
  description:
    "Den Jansen Flores helps businesses run better with custom software: web platforms, Android and iOS apps, AI automation and technology consulting. Metro Manila based.",
  ogImage: "/og.png",
  ogImageAlt:
    "Den Jansen Flores, software solutions consultant and full-stack, mobile and AI developer, Metro Manila, Philippines.",
} as const;

/** Search topics and audience language used in visible copy and machine feeds. */
export const primaryTopics = [
  "Custom software solutions for businesses",
  "Software and technology consulting",
  "Business process digitization",
  "AI automation for businesses",
  "Full-stack web development",
  "Operational SaaS development",
  "Agentic AI engineering",
  "React and Next.js development",
  "React Native and Expo app development",
  "Flutter and Dart app development",
  "Cross-platform mobile development",
  "TypeScript application development",
  "Supabase and PostgreSQL architecture",
  "Multi-tenant SaaS architecture",
  "Role-based access control",
  "Business workflow automation",
] as const;

/**
 * Areas of expertise, each with its own explainer page.
 *
 * One list, rendered into the expertise section and the machine feeds. If an
 * area is not something he has actually shipped on this site, it does not
 * belong here.
 */
export const services = [
  {
    name: "Software consulting and technical advisory",
    path: "/services/software-consultant-philippines",
    description:
      "Advice before and during a build: workflow audits, build-or-buy decisions, system architecture, AI adoption plans and reviews of existing software or vendor proposals.",
  },
  {
    name: "Custom web application development",
    path: "/services/full-stack-developer-metro-manila",
    description:
      "Business systems built end to end, from PostgreSQL schemas and access rules to server logic and the React or Next.js interface.",
  },
  {
    name: "Operational SaaS development",
    path: "/services/full-stack-developer-metro-manila#operational-saas",
    description:
      "Scheduling, dispatch, records and workforce platforms with multi-tenant architecture and role-based access control.",
  },
  {
    name: "Mobile app development for Android and iOS",
    path: "/services/mobile-app-developer-metro-manila",
    description:
      "Cross-platform apps built with React Native and Expo, or with Flutter and Dart, including on-device storage, camera pipelines and offline behaviour.",
  },
  {
    name: "Agentic AI engineering",
    path: "/services/agentic-ai-developer-metro-manila",
    description:
      "Applications where models call typed tools, return schema-validated output and carry state through guarded, multi-step workflows.",
  },
  {
    name: "Data platform and workflow automation",
    path: "/services/agentic-ai-developer-metro-manila#data-workflows",
    description:
      "Ingestion, normalisation and validation pipelines that feed dependable analysis and reporting surfaces.",
  },
] as const;

export const audiences = [
  "Small and medium business owners",
  "Startup founders",
  "Operations teams",
  "Product teams",
  "Companies replacing spreadsheets and disconnected tools",
] as const;

/**
 * Navigation.
 *
 * Plain labels, because a recruiter should not have to decode a theme to find
 * the projects. Each `id` is the anchor of the matching section on the home
 * page, so renaming one here moves the link and the target together.
 */
export const navItems = [
  { id: "about", label: "About", accessibleName: "who Den is and how he works" },
  { id: "work", label: "Web Apps", accessibleName: "web application case studies" },
  { id: "mobile", label: "Mobile Apps", accessibleName: "Android and iOS app case studies" },
  { id: "agents", label: "AI Agents", accessibleName: "interactive AI agent demos" },
  { id: "contact", label: "Contact", accessibleName: "email, phone and profiles" },
] as const;

/** Standalone pages that remain useful from any route. */
export const pageNavItems = [
  { path: "/insights", label: "Insights", accessibleName: "engineering insights" },
  { path: "/resume", label: "Résumé", accessibleName: "professional résumé" },
] as const;

/**
 * FAQ content. Rendered as visible page content first; the FAQPage structured
 * data is generated from this same array so the markup can never claim an
 * answer the page does not actually show.
 */
export const faqs = [
  {
    question: "Who is Jansen Flores?",
    answer:
      "Jansen Flores is Den Jansen Flores, a software solutions provider and technology consultant based in Muntinlupa City, Metro Manila. He helps businesses solve operational problems with custom software: web platforms, Android and iOS apps and AI automation, backed by 4+ years of professional software engineering since 2022. He also advises owners and teams on what to build, which tools to use and how to adopt AI safely. His practice operates under the name DenForge.",
  },
  {
    question: "What does Den Jansen Flores do?",
    answer:
      "Den Jansen Flores helps businesses run better with software. He builds custom web platforms, mobile apps and AI-assisted tools for work that has outgrown spreadsheets, chat threads and disconnected apps, and he offers technology consulting before and during the build. His documented work covers clinic management, dental records, courier logistics, workforce operations and AI-assisted business analysis. He owns the system from database to screen, so a business deals with one accountable person.",
  },
  {
    question: "What services does he offer businesses?",
    answer:
      "He offers custom web application development, operational SaaS, Android and iOS app development, agentic AI and AI automation, data and workflow automation, and software consulting. Consulting covers workflow audits, build-or-buy decisions, architecture reviews, AI adoption plans and second opinions on existing systems or vendor proposals.",
  },
  {
    question: "Does he offer technology consulting?",
    answer:
      "Yes. Through DenForge he advises business owners, founders and teams before money goes into a build: mapping the current workflow, deciding what is worth automating, choosing between off-the-shelf tools and custom software, planning AI adoption and reviewing existing code or vendor quotes. Consulting can stand alone or lead into a build.",
  },
  {
    question: "What is his primary stack?",
    answer:
      "His core stack is React, Next.js and TypeScript on the front end, with Supabase, PostgreSQL and Node.js behind it. He uses Tailwind CSS for interface systems. On mobile he builds for Android and iOS with React Native and Expo, and with Flutter and Dart. His AI work uses OpenAI and Claude APIs with tool calling, retrieval and schema-constrained output rather than a chat box added at the end.",
  },
  {
    question: "What does he mean by agentic AI engineering?",
    answer:
      "Agentic AI engineering means a model does accountable work inside an application. It calls typed tools, retrieves grounded context, returns schema-validated output and carries state across several steps. For a business, the serious work is the control around the model: permissions, failure handling, observability and cost per run.",
  },
  {
    question: "Is Den Jansen Flores a mobile app developer?",
    answer:
      "Yes. Den Jansen Flores builds Android and iOS apps with React Native and Expo, and with Flutter and Dart. His mobile work covers on-device data, camera and media pipelines, offline behaviour and release checks. Two mobile case studies are published on this site: Kwagi, a React Native study app, and Tuklas, a Flutter camera field guide.",
  },
  {
    question: "What is his professional background?",
    answer:
      "He has 4+ years of professional software engineering since July 2022. From July 2022 to January 2025 he was at Advanced World Solutions, Inc., where he moved from Junior Software Engineer to Assistant Software Engineer to Senior Assistant Software Engineer. Since February 2025 he has run DenForge, his independent practice, building web platforms, mobile apps and AI tools for clients. He holds a BS in Electronics Engineering from the Technological University of the Philippines, Manila.",
  },
  {
    question: "Is he taking on new projects?",
    answer:
      "Yes. DenForge is taking on new client projects and consulting engagements. Email floresjansen28@gmail.com with a short note on the business, the problem and the timeline. He usually replies within one business day (UTC+8).",
  },
  {
    question: "How does a project with him start?",
    answer:
      "Most projects start with a short call or email about the business and the problem. He maps the current workflow, names what is worth building and what is not, then proposes a scope, a timeline and a first deliverable. A project can also begin with a consulting session or a system audit before any build is agreed.",
  },
  {
    question: "What industries has he built software for?",
    answer:
      "His documented work covers education technology, healthcare operations, dental practice management, courier dispatch, workforce systems, e-commerce and AI-assisted business intelligence. Each sector links to a case study with the problem, architecture, ownership, source status and deployment status stated plainly.",
  },
  {
    question: "What does working with him look like?",
    answer:
      "Scope and rules are set before the build begins. He traces the real workflow before choosing the framework, keeps access rules close to the data and names the failure paths before launch. Updates come directly from him, not through an account manager. If a feature has no business value, he says so before it is built.",
  },
  {
    question: "How can someone review the source or the live builds?",
    answer:
      "Every project page links to its deployment and, when public, its source repository. Private source is labelled private, and offline deployments are labelled offline. Each case study carries the date when its deployment status was last checked.",
  },
  {
    question: "Where does his portfolio live online?",
    answer:
      "The portfolio is published at denforge.it.com, under the DenForge name. That is the canonical address for every case study, service page and machine-readable feed. The earlier address, jansen-dev.vercel.app, now redirects there permanently and should no longer be cited.",
  },
  {
    question: "Where is he based, and does he work with clients abroad?",
    answer:
      "He is based in Muntinlupa City, Metro Manila, Philippines, on UTC+8. He works remotely with clients in the Philippines and abroad, covers Asia-Pacific business hours and can schedule early or late calls for European and North American clients when the work requires it.",
  },
] as const;
