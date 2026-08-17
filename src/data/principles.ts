/**
 * How the work gets done.
 *
 * Five positions, each with what it costs and where it is visible in a project
 * on this site. A principle with no cost is a slogan, and a principle with no
 * evidence is a wish, so both are required fields.
 */

export type Principle = {
  title: string;
  /** One line under the heading. */
  claim: string;
  /** What it rules out, or what it costs to hold. */
  body: string;
  /** Where it shows up in the work. */
  evidence: string;
};

export const principles: Principle[] = [
  {
    title: "Map the operation before choosing the stack",
    claim: "The workflow writes the schema.",
    body: "A clinic appointment and a courier shipment obey different rules. I trace the real process first, then choose the tools. It costs more attention in week one and prevents a careless rebuild in month six.",
    evidence:
      "One appointment row with explicit status transitions in ClinicFlow. A shipment lifecycle with proof of delivery and cash reconciliation in Biyahero Express.",
  },
  {
    title: "Own the whole chain",
    claim: "Responsibility runs from schema to interface.",
    body: "I write the data model, server logic, access rules and interface. I also answer for how they behave together. When a system fails at two in the morning, the handoff chart is irrelevant. Ownership is not.",
    evidence:
      "Every project here was built end to end. Each project page lists exactly which parts, so the claim can be checked instead of believed.",
  },
  {
    title: "Keep authority close to the data",
    claim: "A missed interface check should never become a disclosure.",
    body: "The database enforces row-level policies and tenant boundaries. A conditional in a component may improve the interface, but it does not decide who can read a record. That decision belongs at the boundary an attacker cannot skip.",
    evidence:
      "Row-level security across role-separated portals in ClinicFlow. Per-practice isolation with subdomain routing in Smiley.",
  },
  {
    title: "Put the model inside a controlled system",
    claim: "Prepared context in. Validated output out. Cost known.",
    body: "The model call is one stage. The surrounding code decides what context it receives, which tools it may use, what shape it must return and how the system recovers when it fails. Intelligence without control is still a liability.",
    evidence:
      "The ingestion and analysis pipeline in the SaaS Data Analysis Platform: normalise, prompt, validate the shape, then render.",
  },
  {
    title: "Design the recovery before launch",
    claim: "Every state needs a name, a transition and a way back.",
    body: "Operational software fails at the edges: a double booking, a delivery completed twice, cash that never reconciles. I design those paths before the demo. The edge cases are where a system reveals what it was built to survive.",
    evidence:
      "Booked, confirmed, completed and cancelled as states on one appointment row. Ticket lifecycles with threaded history in ShiftDesk.",
  },
];
