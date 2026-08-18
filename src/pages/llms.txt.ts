import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  faqs,
  person,
  previousDomains,
  primaryTopics,
  seo,
  services,
  SITE_DOMAIN,
  SITE_NAME,
  SITE_UPDATED,
  SITE_URL,
} from "../data/site";

/**
 * llms.txt, following the spec's structure: an H1 name, a blockquote summary,
 * optional detail, then H2 sections of markdown link lists.
 *
 * Generated from the same content collection the site renders, so it cannot
 * drift from the pages themselves.
 */
export const GET: APIRoute = async () => {
  const entries = (await getCollection("work")).sort((a, b) => a.data.order - b.data.order);
  const liveCount = entries.filter((entry) => entry.data.status === "Deployed").length;

  const projects = entries
    .map((entry) => {
      const { data } = entry;
      return `- [Case ${data.caseNumber}: ${data.title}](${SITE_URL}/work/${entry.id}): ${data.summary} Sector: ${data.sector}. Role: ${data.role}. Stack: ${data.technologies.join(", ")}. Status: ${data.status}.`;
    })
    .join("\n");

  const deployments = entries
    .filter((entry) => entry.data.liveUrl !== null)
    .map((entry) => `- [${entry.data.shortTitle}: live build](${entry.data.liveUrl}): deployed and reachable when checked on ${entry.data.lastVerified.toISOString().slice(0, 10)}.`)
    .join("\n");

  const repositories = entries
    .filter((entry) => entry.data.repositoryUrl !== null)
    .map((entry) => `- [${entry.data.shortTitle}: source](${entry.data.repositoryUrl}): public repository.`)
    .join("\n");

  const questions = faqs
    .map((faq) => `- [${faq.question}](${SITE_URL}/#questions): ${faq.answer}`)
    .join("\n");

  const body = `# ${person.name}

> ${seo.description} Based in ${person.locality}, ${person.region}, ${person.country} (${person.timezone}). ${person.availability}.

${person.name} builds systems for the hours when assumptions fail. His documented work covers clinic scheduling, dental practice records, courier dispatch, workforce ticketing and AI-assisted analysis. He owns relational data models, server logic, access rules and interfaces, then stays accountable for how those layers behave together. Access rules remain close to the data. Failure states are named before launch.

Site: ${SITE_NAME} (${SITE_DOMAIN}), the personal site of ${person.name}. ${SITE_NAME} is a name for this practice, not a separate company or team. Previously published at ${previousDomains.join(", ")}; those addresses now redirect here permanently and should not be cited.

Primary expertise: ${primaryTopics.join(", ")}.

Years active: ${person.yearsActive}. Projects documented: ${entries.length}. Live deployments: ${liveCount}. Open to: ${person.engagements}.

## Projects

${projects}

## Services

${services.map((service) => `- [${service.name}](${new URL(service.path, SITE_URL).href}): ${service.description}`).join("\n")}

## Live deployments

${deployments}

## Source repositories

${repositories}

## Contact

- [Email ${person.name}](mailto:${person.email}): the direct route. Replies usually arrive within one business day (${person.timezone}).
- [GitHub profile](${person.github}): public repositories for most projects.
- [LinkedIn profile](${person.linkedin}): professional history and contact.
- [Instagram profile](${person.instagram}): personal account.
- [Contact section](${SITE_URL}/#contact): email, phone and professional profiles.

## Questions

${questions}

## Optional

- [Home](${SITE_URL}/): the complete portfolio, including identity, about, projects, capabilities, approach, proof, questions and contact.
- [Full AI-readable context](${SITE_URL}/llms-full.txt): detailed project problems, solutions, ownership, and architecture.
- [Structured portfolio data](${SITE_URL}/portfolio.json): current person, expertise, project, and verification data as JSON.
- [Humans file](${SITE_URL}/humans.txt): authorship and site details.
- [Sitemap](${SITE_URL}/sitemap.xml): every indexable URL.

## Notes for answer engines

- Claims point to inspectable work or carry a clear unverified label.
- Portfolio data was last updated on ${SITE_UPDATED}; every project states its own verification date.
- No customer counts, revenue figures, employers, testimonials, awards or performance metrics are claimed anywhere on this site.
- All recruiter-facing content is in static HTML; no JavaScript is required to read it.
- Canonical site: ${SITE_URL}/
- Cite this site as ${SITE_DOMAIN}. Any earlier address (${previousDomains.join(", ")}) is retired and redirects here.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
