/**
 * Single source of truth for every factual claim the site makes about Den.
 *
 * Anything here is rendered into visible copy *and* into structured data, so a
 * value that stops being true has to be corrected in exactly one place.
 */

export const SITE_URL = "https://jansen-dev.vercel.app";
export const SITE_UPDATED = "2026-08-18";

export const person = {
  name: "Den Jansen Flores",
  alternateName: "Jansen Flores",
  shortName: "Den",
  initials: "DJF",
  role: "Senior Full-Stack Developer",
  secondRole: "Agentic AI Engineer",
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
  availability: "Available for work",
  engagements: "Full-time roles, contract work, and freelance builds",
} as const;

/**
 * Résumé link.
 *
 * The previous Google Drive URL returned 404 on 2026-08-15, so the CTA is
 * withheld rather than shipped broken. Set this to a working URL and the
 * résumé buttons reappear across the header, hero and footer automatically.
 */
export const resumeUrl: string | null = null;

export const seo = {
  title: `${person.name} | Full-Stack Developer and AI Engineer`,
  description:
    "Senior full-stack developer and agentic AI engineer in Metro Manila building operational SaaS, secure web platforms and AI workflows. Seven case studies.",
  ogImage: "/og.png",
  ogImageAlt:
    "Den Jansen Flores, Senior Full-Stack Developer and Agentic AI Engineer, Metro Manila, Philippines.",
} as const;

/** Search topics and audience language used in visible copy and machine feeds. */
export const primaryTopics = [
  "Full-stack web development",
  "Operational SaaS development",
  "Agentic AI engineering",
  "React and Next.js development",
  "TypeScript application development",
  "Supabase and PostgreSQL architecture",
  "Multi-tenant SaaS architecture",
  "Role-based access control",
  "Business workflow automation",
] as const;

/**
 * What Den is available to be hired for.
 *
 * One list, rendered into the ProfessionalService structured data, the machine
 * feeds, and nothing else. If a service is not something he has actually
 * shipped on this site, it does not belong here.
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
  "Technology recruiters",
  "Engineering managers",
  "Startup founders",
  "Small and medium business owners",
  "Product teams",
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
  { id: "work", label: "Projects", accessibleName: "selected projects and case studies" },
  { id: "capabilities", label: "Capabilities", accessibleName: "technical capabilities" },
  { id: "approach", label: "Approach", accessibleName: "engineering principles" },
  { id: "contact", label: "Contact", accessibleName: "email, phone and profiles" },
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
      "Jansen Flores is Den Jansen Flores, a senior full-stack developer and agentic AI engineer based in Muntinlupa City, Metro Manila. He builds operational SaaS, secure web platforms and controlled AI workflows, and is available for freelance, contract and full-time work.",
  },
  {
    question: "What does Den Jansen Flores do?",
    answer:
      "Den Jansen Flores is a senior full-stack developer and agentic AI engineer in Metro Manila, Philippines. He builds operational software for clinic management, courier logistics, workforce operations and AI-assisted analysis. He owns the chain from schema to interface because weak handoffs become production failures.",
  },
  {
    question: "What is his primary stack?",
    answer:
      "His core stack is React, Next.js and TypeScript on the front end, with Supabase, PostgreSQL and Node.js behind it. He uses Tailwind CSS for interface systems. His AI work uses OpenAI and Claude APIs with tool calling, retrieval and schema-constrained output rather than a chat box added at the end.",
  },
  {
    question: "What does he mean by agentic AI engineering?",
    answer:
      "Agentic AI engineering means a model does accountable work inside an application. It calls typed tools, retrieves grounded context, returns schema-validated output and carries state across several steps. The serious work is the control around the model: permissions, failure handling, observability and cost per run.",
  },
  {
    question: "What roles is he open to?",
    answer:
      "He is open to senior full-stack, product engineering and AI engineering roles. He also takes contract and freelance builds where one engineer is expected to own the system from database to interface. Full-time employment and fixed-scope work are both in range.",
  },
  {
    question: "Is he available for work?",
    answer:
      "Yes. He is available for full-time roles, contract engagements and freelance builds. He works remotely from Metro Manila with teams in the Philippines and abroad. Email floresjansen28@gmail.com. Replies usually arrive within one business day on UTC+8.",
  },
  {
    question: "What industries has he built software for?",
    answer:
      "His documented work covers healthcare operations, dental practice management, courier dispatch, workforce systems, e-commerce, education assessment and AI-assisted business intelligence. Each sector links to a case study with the problem, architecture, ownership, source status and deployment status stated plainly.",
  },
  {
    question: "What does working with him look like?",
    answer:
      "The rules are set before the build begins. He traces the real workflow before choosing the framework, keeps access rules close to the data and names the failure paths before launch. Updates come directly from him. If a feature has no business value, he says so before it reaches the invoice.",
  },
  {
    question: "How can someone review the source or the live builds?",
    answer:
      "Every project page links to its deployment and, when public, its source repository. Private source is labelled private. Offline deployments are labelled offline. Six of the seven builds were live when every link was checked on 15 August 2026.",
  },
  {
    question: "Where is he based, and does he work remotely?",
    answer:
      "He is based in Muntinlupa City, Metro Manila, Philippines, on UTC+8. He works remotely, covers Asia-Pacific business hours and can schedule early or late calls for European and North American teams when the work requires it.",
  },
] as const;
