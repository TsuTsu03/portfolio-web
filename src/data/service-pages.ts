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
      "Den Jansen Flores is a senior full-stack developer in Metro Manila building operational SaaS with React, Next.js, TypeScript, Supabase and PostgreSQL.",
    eyebrow: "Metro Manila · React, Next.js and PostgreSQL",
    answer:
      "Den Jansen Flores is a senior full-stack developer based in Muntinlupa City, Metro Manila. His work covers React and Next.js interfaces, TypeScript server logic, Supabase and PostgreSQL data models, access control, integrations and deployment.",
    scopeHeading: "What does his full-stack work cover?",
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
    fitHeading: "What problems does this work solve?",
    fit: [
      "A business process has outgrown spreadsheets, chat threads or disconnected tools.",
      "A product needs one accountable engineer across database, API and interface work.",
      "An existing React or Next.js system needs a careful audit, stabilization or feature build.",
      "A team needs an evidence-backed prototype without pretending it is already production-ready.",
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
        question: "Who is Den Jansen Flores as a full-stack developer?",
        answer:
          "Den is a senior full-stack developer based in Muntinlupa City, Metro Manila, currently an Advanced Application Engineer at Artech, LLC. He has 4+ years of experience building React, Next.js and TypeScript applications with Node.js, Supabase and PostgreSQL behind them.",
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
        question: "How does he approach a new system?",
        answer:
          "He starts from the current workflow, the failure it causes and the deadline that matters. Then he finds the first useful boundary, the evidence needed and the scope risks before writing the build plan.",
      },
    ],
    keywords: [
      "full-stack developer Metro Manila",
      "senior full-stack developer Philippines",
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
      "Den Jansen Flores is a Metro Manila agentic AI developer building controlled workflows with typed tools, grounded context and validated outputs.",
    eyebrow: "Metro Manila · Applied AI systems, not demo chat boxes",
    answer:
      "Den Jansen Flores is an agentic AI engineer and full-stack developer in Metro Manila. He builds AI features that perform bounded work inside real applications: calling typed tools, retrieving grounded context, returning schema-validated output and carrying state across guarded steps.",
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
        question: "What AI work has Den Jansen Flores built?",
        answer:
          "His published AI work includes an AI-assisted data analysis platform and three agent demos with typed tools and validated output. Each one links to a case study or a public demo that states what it does and what it does not do.",
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
      "AI developer Philippines",
      "AI agent developer Philippines",
      "AI engineer Metro Manila",
      "agentic workflow developer",
    ],
  },
  {
    slug: "mobile-app-developer-metro-manila",
    shortTitle: "Mobile app development",
    title: "Mobile App Developer in Metro Manila",
    metaTitle: "Mobile App Developer in Metro Manila | Den Jansen Flores",
    metaDescription:
      "Den Jansen Flores is a Metro Manila mobile app developer building Android and iOS apps with React Native and Expo, or with Flutter and Dart.",
    eyebrow: "Metro Manila · Android and iOS, React Native or Flutter",
    answer:
      "Den Jansen Flores is a mobile and full-stack developer based in Muntinlupa City, Metro Manila. He builds Android and iOS applications with React Native and Expo, and with Flutter and Dart. The work covers on-device data models, camera and media pipelines, offline behaviour, navigation and state layers, and the checks a build passes before it is treated as a release candidate.",
    scopeHeading: "What does a mobile build cover?",
    scopeIntro:
      "A phone app is judged in the worst conditions it meets: no signal, a blurred photo, an interrupted session. The scope below is drawn around those conditions rather than around a list of screens.",
    scope: [
      {
        title: "Cross-platform applications",
        description:
          "One codebase for Android and iOS, built with React Native and Expo or with Flutter and Dart. The choice follows what the app needs from the device, not a framework preference.",
      },
      {
        title: "On-device data and offline behaviour",
        description:
          "Local SQLite schemas with versioned migrations, so records that exist nowhere else survive an app update and a session with no network.",
      },
      {
        title: "Camera, media and device features",
        description:
          "Capture with focus and flash control, gallery import, photo checks before anything is uploaded, and platform text-to-speech, each with a stated path for when it fails.",
      },
      {
        title: "Backend boundary and release checks",
        description:
          "Provider keys held in server-side functions instead of the app bundle, then lint, type checks, unit tests and clean platform exports before a build is called a candidate.",
      },
    ],
    fitHeading: "When is a mobile build the right call?",
    fit: [
      "The work happens away from a desk, on a phone, often with weak signal or none.",
      "The app needs the camera, local storage or another device feature a browser tab cannot reach reliably.",
      "One codebase has to serve Android and iOS without funding two separate teams.",
      "An existing React Native or Flutter app needs an audit, a data model it can migrate safely, or release checks it can trust.",
    ],
    evidenceIds: ["kwagi", "tuklas"],
    proofIntro:
      "Two mobile case studies are published here: a React Native study app that keeps its whole loop on the device, and a Flutter camera field guide that keeps provider keys off it. Both are in development, neither is on the App Store or Google Play, and each case study says so alongside its source visibility and the date its status was last checked.",
    process: [
      {
        title: "Decide what the phone owns",
        description:
          "Name the records, actions and sessions that must work with no network before choosing screens, because that answer sets the data model.",
      },
      {
        title: "Draw the backend boundary",
        description:
          "Keep provider keys and paid calls on the server, and define exactly what the app sends and receives, so an unpacked bundle gives nothing away.",
      },
      {
        title: "Build one loop end to end",
        description:
          "Ship a single complete path, from capture through result to a saved record, then widen it once the state and navigation layers hold.",
      },
      {
        title: "Prepare the release honestly",
        description:
          "Run lint, type checks, unit tests and clean Android and iOS exports, then separate what is verified from what still waits on a store review or an owner decision.",
      },
    ],
    faqs: [
      {
        question: "Is Den Jansen Flores a mobile app developer?",
        answer:
          "Yes. Den is a full-stack and mobile app developer based in Muntinlupa City, Metro Manila. He builds Android and iOS apps with React Native and Expo, and with Flutter and Dart, and has published two mobile case studies: Kwagi and Tuklas.",
      },
      {
        question: "Does he build with React Native or with Flutter?",
        answer:
          "Both, and the portfolio shows one of each. Kwagi is React Native with Expo, TypeScript, SQLite, NativeWind and Zustand. Tuklas is Flutter with Dart, Riverpod, go_router and a Supabase Edge Function. The choice follows what the app needs from the device and who will maintain it afterwards.",
      },
      {
        question: "Are his mobile apps on the App Store or Google Play?",
        answer:
          "Not yet. Kwagi and Tuklas are both marked in development. Kwagi has a public repository and a pipeline that produces clean Android, iOS and web exports, but a local build is not store availability and this site does not claim it.",
      },
      {
        question: "Can he make an app work without a network?",
        answer:
          "Yes, where the data allows it. Kwagi keeps notes, flashcards, review scheduling and progress in one local SQLite database with versioned migrations, so the app opens and works in airplane mode and sync stays a later decision rather than an early dependency.",
      },
    ],
    keywords: [
      "mobile app developer Metro Manila",
      "React Native developer Philippines",
      "Flutter developer Metro Manila",
      "Android and iOS developer Philippines",
      "cross-platform app developer Metro Manila",
    ],
  },
];
