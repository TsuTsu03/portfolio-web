export interface ServicePage {
  slug: string;
  shortTitle: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  answer: string;
  scopeHeading: string;
  scopeIntro: string;
  scope: { title: string; description: string; id?: string }[];
  fitHeading: string;
  fit: string[];
  evidenceIds: string[];
  proofIntro: string;
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  keywords: string[];
}

export const servicePages: ServicePage[] = [
  {
    slug: "full-stack-developer-metro-manila",
    shortTitle: "Full-stack development",
    title: "Full-Stack Developer in Metro Manila",
    metaTitle: "Full-Stack Developer in Metro Manila | Den Jansen Flores",
    metaDescription:
      "Hire Den Jansen Flores, a Metro Manila full-stack developer for freelance, contract or full-time work across SaaS, React, Next.js and Supabase.",
    eyebrow: "Metro Manila · Freelance, contract or full-time",
    answer:
      "Den Jansen Flores is a senior full-stack developer based in Muntinlupa City, Metro Manila. He is available for freelance builds, contract engagements and full-time roles. His work covers React and Next.js interfaces, TypeScript server logic, Supabase and PostgreSQL data models, access control, integrations and deployment.",
    scopeHeading: "What can one full-stack engagement cover?",
    scopeIntro:
      "The useful boundary is the system, not one layer of it. Den can own the route from an operational problem to a deployed web application, then make every handoff visible enough to maintain.",
    scope: [
      {
        title: "Product interface",
        description:
          "Responsive React or Next.js interfaces with clear states, accessible controls and workflows built around the real job users need to finish.",
      },
      {
        title: "Application and data layer",
        description:
          "TypeScript services, PostgreSQL schemas, Supabase policies, authentication and integrations designed as one authority chain rather than separate features.",
      },
      {
        id: "operational-saas",
        title: "Operational SaaS",
        description:
          "Multi-tenant scheduling, records, dispatch and workforce systems where permissions, history and recovery paths matter as much as the primary screen.",
      },
      {
        title: "Delivery and hardening",
        description:
          "Build checks, deployment configuration, responsive QA, failure-state review and a handoff that states what is verified and what still needs an owner decision.",
      },
    ],
    fitHeading: "When is Den the right fit?",
    fit: [
      "A business process has outgrown spreadsheets, chat threads or disconnected tools.",
      "A product needs one accountable engineer across database, API and interface work.",
      "An existing React or Next.js system needs a careful audit, stabilization or feature build.",
      "A founder or team wants an evidence-backed prototype without pretending it is already production-ready.",
    ],
    evidenceIds: ["clinicflow", "smiley", "biyahero-express", "shiftdesk"],
    proofIntro:
      "The portfolio contains shipped systems for healthcare operations, dental records, courier dispatch and workforce coordination. Each case study names the problem, architecture, ownership, deployment status and source visibility.",
    process: [
      {
        title: "Map the operation",
        description:
          "Identify the people, decisions, records and failure points before choosing screens or frameworks.",
      },
      {
        title: "Set the authority",
        description:
          "Define which layer owns validation, access and state so the interface cannot invent business truth.",
      },
      {
        title: "Build the critical path",
        description:
          "Ship the smallest end-to-end workflow that proves the model, then widen it without breaking the chain.",
      },
      {
        title: "Verify the release",
        description:
          "Run build, browser, responsive and accessibility checks, then separate verified behavior from remaining provider or owner gates.",
      },
    ],
    faqs: [
      {
        question: "Is Den available as a freelance full-stack developer in Metro Manila?",
        answer:
          "Yes. Den is based in Muntinlupa City, Metro Manila and is available for freelance projects, contract engagements and full-time roles. He can work remotely with Philippine or international teams.",
      },
      {
        question: "Which full-stack technologies does he use?",
        answer:
          "His primary stack is React, Next.js, TypeScript, Node.js, Supabase and PostgreSQL. The final choice follows the product constraints; the framework is not allowed to become the architecture.",
      },
      {
        question: "Can he take an application from database to deployment?",
        answer:
          "Yes. His documented work includes relational schemas, row-level security, server logic, authentication, responsive interfaces, integrations, deployment configuration and production-style verification.",
      },
      {
        question: "How does a potential client start?",
        answer:
          "Send the current workflow, the failure it causes and the deadline that matters. Den will identify the first useful boundary, the evidence needed and any scope risks before proposing a build.",
      },
    ],
    keywords: [
      "full-stack developer Metro Manila",
      "freelance full-stack developer Metro Manila",
      "React developer Philippines",
      "Next.js developer Metro Manila",
      "SaaS developer Philippines",
    ],
  },
  {
    slug: "agentic-ai-developer-metro-manila",
    shortTitle: "Agentic AI engineering",
    title: "Agentic AI Developer in Metro Manila",
    metaTitle: "Agentic AI Developer in Metro Manila | Den Jansen Flores",
    metaDescription:
      "Work with Den Jansen Flores, a Metro Manila agentic AI developer building controlled workflows with typed tools, grounded context and validated outputs.",
    eyebrow: "Metro Manila · Applied AI systems, not demo chat boxes",
    answer:
      "Den Jansen Flores is an agentic AI engineer and full-stack developer in Metro Manila. He builds AI features that perform bounded work inside real applications: calling typed tools, retrieving grounded context, returning schema-validated output and carrying state across guarded steps. He is available for freelance, contract and full-time work.",
    scopeHeading: "What does agentic AI engineering include?",
    scopeIntro:
      "The model is one component. The engineering value sits around it: authority, tools, state, evaluation, observability, recovery and cost control.",
    scope: [
      {
        title: "Typed tool workflows",
        description:
          "Models call explicit functions with validated arguments instead of improvising actions against production systems.",
      },
      {
        title: "Grounded retrieval",
        description:
          "Relevant business context is retrieved, scoped and attached to the task so answers can be traced to known data.",
      },
      {
        title: "Guarded state and recovery",
        description:
          "Multi-step work keeps an inspectable state, names failure paths and requires approval where an automated action would carry real consequence.",
      },
      {
        id: "data-workflows",
        title: "Data and analysis workflows",
        description:
          "Ingestion, normalization, validation and analysis pipelines that turn uploaded or operational data into dependable decision support.",
      },
    ],
    fitHeading: "When should a team use an AI agent?",
    fit: [
      "A repeatable task requires several tools or decisions, not one generated paragraph.",
      "The system can define what the model may read, call, change and escalate.",
      "A human needs evidence, approval or recovery controls around automated work.",
      "The business can measure success, latency and cost per completed task.",
    ],
    evidenceIds: ["data-analysis-platform", "career-path", "clinicflow"],
    proofIntro:
      "The published work covers AI-assisted business analysis, assessment workflows and operational software prepared for controlled automation. Claims stay tied to case studies, source status and dated deployment checks.",
    process: [
      {
        title: "Define the bounded job",
        description:
          "State the decision or task, available evidence, allowed tools and the exact conditions that require a human.",
      },
      {
        title: "Design the control layer",
        description:
          "Specify schemas, permissions, retries, timeouts, budgets and audit records before connecting a model.",
      },
      {
        title: "Evaluate real failure modes",
        description:
          "Test groundedness, tool selection, malformed output, unavailable dependencies and recovery rather than judging one polished demo.",
      },
      {
        title: "Ship with visibility",
        description:
          "Expose status, evidence and owner controls so the system can be trusted, corrected and stopped.",
      },
    ],
    faqs: [
      {
        question: "Is Den available as a freelance agentic AI developer in Metro Manila?",
        answer:
          "Yes. Den is based in Metro Manila and is available for freelance, contract and full-time agentic AI or full-stack engagements, including remote work with teams outside the Philippines.",
      },
      {
        question: "What is the difference between an AI agent and a chatbot?",
        answer:
          "A chatbot mainly returns language. An agent performs a bounded workflow: it may retrieve context, call typed tools, maintain state and request approval. Those actions require permissions, validation, observability and recovery controls.",
      },
      {
        question: "Which AI platforms can he work with?",
        answer:
          "His application work uses OpenAI and Claude APIs, tool calling, retrieval and schema-constrained output. Provider choice follows accuracy, latency, privacy, cost and deployment requirements.",
      },
      {
        question: "Can he add AI to an existing SaaS product?",
        answer:
          "Yes, when the product has a clear task and data boundary. He can map the workflow, add the model behind typed interfaces and preserve human approval for actions that should not run unattended.",
      },
    ],
    keywords: [
      "agentic AI developer Metro Manila",
      "freelance AI developer Metro Manila",
      "AI agent developer Philippines",
      "AI engineer Metro Manila",
      "agentic workflow developer",
    ],
  },
];
