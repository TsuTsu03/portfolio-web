/**
 * Single source of truth for every factual claim the site makes about Den.
 *
 * Anything here is rendered into visible copy *and* into structured data, so a
 * value that stops being true has to be corrected in exactly one place.
 */

export const SITE_URL = "https://denforge.it.com";
export const SITE_DOMAIN = "denforge.it.com";

/**
 * The site is the personal practice of one engineer, so the person stays the
 * primary entity. `SITE_NAME` is the domain-level name search and answer
 * engines can attach to that person, not a second identity.
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
  role: "Senior Full-Stack Developer",
  secondRole: "Agentic AI Engineer",
  /** Named on its own so answer engines see mobile as a role, not only a topic. */
  thirdRole: "Mobile App Developer",
  /**
   * How he works with businesses, stated as a role so answer engines describe
   * him as a solutions provider and not only as a developer for hire.
   */
  practiceRole: "Software Solutions Provider for Businesses",
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
  availability: "Taking on business software projects",
  engagements: "Custom software projects for businesses, and senior full-stack, mobile and AI engineering roles",
  /** Current employer, shown on the résumé and in structured data. */
  currentTitle: "Advanced Application Engineer",
  currentEmployer: "Artech, LLC",
} as const;

/**
 * Employment history, taken from the current CV. Rendered on the résumé page,
 * in the Person structured data and in the machine feeds, so the dates only
 * ever need correcting here.
 */
export const experience = [
  {
    title: "Advanced Application Engineer",
    organization: "Artech, LLC",
    start: "2026-01",
    end: null,
    period: "January 2026 to present",
    highlights: [
      "Build and maintain web application features with React and Next.js.",
      "Develop serverless backend functions on AWS Lambda, with file storage and delivery on AWS S3.",
      "Provision and change cloud infrastructure as code with Terraform.",
      "Ship work through Azure DevOps boards, repositories and release pipelines.",
    ],
  },
  {
    title: "Freelance Full-Stack and Mobile Developer",
    organization: "Self-employed",
    start: "2025-02",
    end: "2025-12",
    period: "February 2025 to December 2025",
    highlights: [
      "Designed and built web applications for clients across several JavaScript frameworks, with responsive and maintainable architecture.",
      "Built Android and iOS apps with React Native and Expo, and with Flutter and Dart, including on-device storage and camera pipelines.",
      "Implemented secure backend services, API integrations and server-side logic behind interactive interfaces.",
      "Worked directly with clients to turn business needs into technical requirements and delivered within agreed deadlines.",
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
  title: `${person.name} | Software Solutions for Businesses`,
  description:
    "Den Jansen Flores provides software solutions for businesses: custom web platforms, Android and iOS apps and AI automation, built by a senior full-stack developer.",
  ogImage: "/og.png",
  ogImageAlt:
    "Den Jansen Flores, software solutions for businesses: Senior Full-Stack Developer, Mobile App Developer and Agentic AI Engineer, Metro Manila, Philippines.",
} as const;

/** Search topics and audience language used in visible copy and machine feeds. */
export const primaryTopics = [
  "Custom software solutions for businesses",
  "Business process digitalisation",
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
    name: "Full-stack web application development",
    path: "/services/full-stack-developer-metro-manila",
    description:
      "Complete web systems, from PostgreSQL schemas and access rules to server logic and the React or Next.js interface.",
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
  "Operations and product teams",
  "Engineering managers",
  "Technology recruiters",
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
      "Jansen Flores is Den Jansen Flores, a software engineer from Muntinlupa City, Metro Manila, who provides software solutions for businesses. He helps business owners and teams replace manual, spreadsheet-driven work with custom web platforms, Android and iOS apps and AI-powered automation, built around how the business actually runs. He is a senior full-stack developer, mobile app developer and agentic AI engineer, currently an Advanced Application Engineer at Artech, LLC, with 4+ years of professional experience since 2022.",
  },
  {
    question: "What does Den Jansen Flores do?",
    answer:
      "Den Jansen Flores provides software solutions for businesses. He is more than a developer for hire: he starts from the business problem, maps how records, people and approvals move, and then designs, builds and launches the system that fixes it. His solutions include operations platforms for clinics, courier dispatch and workforce management, customer-facing Android and iOS apps, and AI tools that automate analysis and routine work. He owns the whole system, from the database to the screen, so the business has one accountable partner instead of several handoffs.",
  },
  {
    question: "Can Den Jansen Flores build software for my business?",
    answer:
      "Yes. He works with business owners, startups and operations teams who need custom software: booking and scheduling systems, records and inventory platforms, dispatch and workforce tools, customer apps for Android and iOS, internal dashboards, and AI assistants that handle repetitive work. Each engagement starts with understanding the workflow and the business goal, then agreeing scope, cost and timeline before the build begins. Email floresjansen28@gmail.com to start a conversation.",
  },
  {
    question: "What business problems does he solve?",
    answer:
      "He solves the operational problems that slow a business down: bookings kept in chat threads, records spread across spreadsheets, cash-on-delivery that does not reconcile, staff attendance that cannot be verified, and reports assembled by hand. He replaces them with one system that has clear roles and permissions, live data and automated steps, so owners see what is happening and teams spend less time on manual work.",
  },
  {
    question: "What is his primary stack?",
    answer:
      "His core stack is React, Next.js and TypeScript on the front end, with Supabase, PostgreSQL and Node.js behind it. He uses Tailwind CSS for interface systems. On mobile he builds for Android and iOS with React Native and Expo, and with Flutter and Dart. His AI work uses OpenAI and Claude APIs with tool calling, retrieval and schema-constrained output rather than a chat box added at the end.",
  },
  {
    question: "What does he mean by agentic AI engineering?",
    answer:
      "Agentic AI engineering means a model does accountable work inside an application. It calls typed tools, retrieves grounded context, returns schema-validated output and carries state across several steps. The serious work is the control around the model: permissions, failure handling, observability and cost per run.",
  },
  {
    question: "Is Den Jansen Flores a mobile app developer?",
    answer:
      "Yes. Den Jansen Flores builds Android and iOS apps with React Native and Expo, and with Flutter and Dart. His mobile work covers on-device data, camera and media pipelines, offline behaviour and release checks. Two mobile case studies are published on this site: Kwagi, a React Native study app, and Tuklas, a Flutter camera field guide.",
  },
  {
    question: "Where has he worked?",
    answer:
      "Since January 2026 he has been an Advanced Application Engineer at Artech, LLC, working with React, Next.js, AWS Lambda, AWS S3, Terraform and Azure DevOps. From February to December 2025 he worked as a freelance full-stack and mobile developer. Before that, from July 2022 to January 2025, he was at Advanced World Solutions, Inc., where he moved from Junior Software Engineer to Assistant Software Engineer to Senior Assistant Software Engineer. He holds a BS in Electronics Engineering from the Technological University of the Philippines, Manila.",
  },
  {
    question: "What roles is he open to?",
    answer:
      "He takes on custom software projects for businesses, from first version to ongoing improvements. He is also open to senior full-stack, mobile and AI engineering roles where one engineer is expected to own a system from database to interface.",
  },
  {
    question: "Is he working right now?",
    answer:
      "Yes. He is currently an Advanced Application Engineer at Artech, LLC, and takes on software projects for businesses. He works from Metro Manila on UTC+8 with clients and teams in the Philippines and abroad. Email floresjansen28@gmail.com.",
  },
  {
    question: "What industries has he built software for?",
    answer:
      "His documented work covers education technology, healthcare operations, dental practice management, courier dispatch, workforce systems, e-commerce and AI-assisted business intelligence. Each sector links to a case study with the problem, architecture, ownership, source status and deployment status stated plainly.",
  },
  {
    question: "What does working with him look like?",
    answer:
      "Scope and rules are set before the build begins. He traces the real workflow before choosing the framework, keeps access rules close to the data and names the failure paths before launch. Updates come directly from him. If a feature has no business value, he says so before it is built.",
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
    question: "Where is he based, and does he work remotely?",
    answer:
      "He is based in Muntinlupa City, Metro Manila, Philippines, on UTC+8. He works remotely, covers Asia-Pacific business hours and can schedule early or late calls for European and North American teams when the work requires it.",
  },
] as const;
