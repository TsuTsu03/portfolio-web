/**
 * Capabilities, grouped by what they are used for rather than by badge.
 *
 * A capability only counts as demonstrated when a project on this site proves
 * it. `provenBy` holds project short titles; `thisSite` covers the tools this
 * portfolio itself is built with. Anything with neither says so in its own
 * line — no percentages, no bars, no quiet padding.
 */

export type Capability = {
  name: string;
  /** What was built with it. Never a description of the tool itself. */
  proof: string;
  /** Project short titles that demonstrate it. */
  provenBy: string[];
  /** True when this portfolio is the demonstration. */
  thisSite?: boolean;
};

export type CapabilityGroup = {
  id: string;
  title: string;
  /** One line on what this group is responsible for. */
  role: string;
  items: Capability[];
};

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "systems",
    title: "Product and systems engineering",
    role: "I turn the real operation into rules the data can enforce.",
    items: [
      {
        name: "Domain modelling",
        proof: "Appointment lifecycles, shipment states and ticket threads mapped from the operation itself.",
        provenBy: ["ClinicFlow", "Biyahero Express", "ShiftDesk"],
      },
      {
        name: "Multi-tenant architecture",
        proof: "Per-practice isolation with subdomain routing.",
        provenBy: ["Smiley"],
      },
      {
        name: "Role-based access control",
        proof: "Role-separated portals where every user can reach only the records their role allows.",
        provenBy: ["ClinicFlow", "ShiftDesk", "Career Path"],
      },
      {
        name: "Operational workflow design",
        proof: "Scheduling and availability, dispatch and COD reconciliation, GPS-verified clock-in.",
        provenBy: ["ClinicFlow", "Biyahero Express", "ShiftDesk"],
      },
    ],
  },
  {
    id: "backend",
    title: "Backend and data",
    role: "The rules stay where a skipped screen cannot bypass them.",
    items: [
      {
        name: "PostgreSQL",
        proof: "Relational models behind scheduling, dispatch and ticket lifecycles.",
        provenBy: ["ClinicFlow", "Smiley", "Biyahero Express", "ShiftDesk"],
      },
      {
        name: "Supabase auth and row-level security",
        proof: "Sessions, tenant boundaries and row-level policies protecting deployed systems.",
        provenBy: ["ClinicFlow", "Smiley", "Biyahero Express", "ShiftDesk", "Data Analysis Platform"],
      },
      {
        name: "Next.js server routes",
        proof: "The server half of five deployed SaaS builds.",
        provenBy: ["ClinicFlow", "Smiley", "Biyahero Express", "ShiftDesk", "Data Analysis Platform"],
      },
      {
        name: "Node.js and Express",
        proof: "The API layer behind the student assessment platform.",
        provenBy: ["Career Path"],
      },
      {
        name: "MongoDB",
        proof: "Document storage where the assessment shape changes between cohorts.",
        provenBy: ["Career Path"],
      },
      {
        name: "Data ingestion pipelines",
        proof: "Uploads are normalised and validated before the analysis stage sees them.",
        provenBy: ["Data Analysis Platform"],
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend and interface",
    role: "Interfaces built for live data, impatient users and the screen already in their hand.",
    items: [
      {
        name: "React",
        proof: "Component systems across five deployed applications.",
        provenBy: ["ClinicFlow", "Smiley", "Biyahero Express", "ShiftDesk", "Career Path"],
      },
      {
        name: "TypeScript",
        proof: "Typed contracts across the interface, data layer and API boundary.",
        provenBy: ["ClinicFlow", "Smiley", "Biyahero Express", "Career Path", "Data Analysis Platform", "The Thrift Store"],
        thisSite: true,
      },
      {
        name: "Next.js",
        proof: "Six deployed applications, server and client boundaries included.",
        provenBy: ["ClinicFlow", "Smiley", "Biyahero Express", "ShiftDesk", "Data Analysis Platform", "The Thrift Store"],
      },
      {
        name: "Tailwind CSS",
        proof: "Token-driven interface systems, including the one you are reading.",
        provenBy: ["ClinicFlow", "Smiley", "Biyahero Express", "ShiftDesk", "Data Analysis Platform", "The Thrift Store"],
        thisSite: true,
      },
      {
        name: "Accessible interface patterns",
        proof: "Keyboard navigation, native disclosures, semantic landmarks and tested contrast on this site.",
        provenBy: [],
        thisSite: true,
      },
    ],
  },
  {
    id: "ai",
    title: "AI-assisted workflows",
    role: "Models do useful work inside clear permissions, schemas and failure boundaries.",
    items: [
      {
        name: "OpenAI API",
        proof: "The analysis stage of the ingestion pipeline.",
        provenBy: ["Data Analysis Platform"],
      },
      {
        name: "Structured model output",
        proof: "Schema-constrained responses the interface can render without interpretation.",
        provenBy: ["Data Analysis Platform"],
      },
      {
        name: "Prompt orchestration",
        proof: "Prepared context, explicit output shapes and iteration against observed failures.",
        provenBy: ["Data Analysis Platform"],
      },
      {
        name: "Claude API and tool use",
        proof: "Used in client and internal work. The evidence sits outside this portfolio, so the capability remains unverified here.",
        provenBy: [],
      },
    ],
  },
  {
    id: "delivery",
    title: "Deployment and operations",
    role: "A build counts when people can reach it and the evidence still holds.",
    items: [
      {
        name: "Vercel deployment",
        proof: "Six live deployments, each linked and status-checked on its project page.",
        provenBy: ["ClinicFlow", "Smiley", "Biyahero Express", "ShiftDesk", "Data Analysis Platform", "The Thrift Store"],
        thisSite: true,
      },
      {
        name: "Public repositories",
        proof: "Six builds have public source. The private repository is labelled without ambiguity.",
        provenBy: ["Smiley", "Biyahero Express", "ShiftDesk", "Data Analysis Platform", "Career Path", "The Thrift Store"],
      },
      {
        name: "Astro static delivery",
        proof: "This portfolio ships as static HTML with no client-side framework and no hydration.",
        provenBy: [],
        thisSite: true,
      },
      {
        name: "Deployment verification",
        proof: "Every deployment link is opened, checked and dated before its status is published.",
        provenBy: [],
        thisSite: true,
      },
    ],
  },
];

/** True when a project or this site demonstrates the capability. */
export const isProven = (item: Capability): boolean =>
  item.provenBy.length > 0 || Boolean(item.thisSite);
