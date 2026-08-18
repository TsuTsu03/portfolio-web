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
import { principles } from "../data/principles";

export const GET: APIRoute = async () => {
  const entries = (await getCollection("work")).sort((a, b) => a.data.order - b.data.order);

  const projects = entries
    .map((entry) => {
      const { data } = entry;
      const architecture = data.architecture
        .map((item) => `- **${item.decision}**: ${item.rationale}`)
        .join("\n");

      return `## ${data.title}

Canonical case study: ${SITE_URL}/work/${entry.id}

${data.summary}

**Problem**: ${data.businessProblem}

**Solution**: ${data.solution}

**Den's role**: ${data.role}

**What Den owned**:
${data.ownership.map((item) => `- ${item}`).join("\n")}

**Architecture decisions**:
${architecture || "- No architecture notes published."}

**Technology**: ${data.technologies.join(", ")}

**Demonstrated capabilities**: ${data.capabilities.join(", ")}

**Verification**: ${data.status}. Last checked ${data.lastVerified.toISOString().slice(0, 10)}.
${data.liveUrl ? `Live build: ${data.liveUrl}` : "Live build: not currently available."}
${data.repositoryUrl ? `Repository: ${data.repositoryUrl}` : "Repository: private."}`;
    })
    .join("\n\n");

  const questions = faqs.map((faq) => `## ${faq.question}\n\n${faq.answer}`).join("\n\n");

  const body = `# ${person.name}: full portfolio context

Last updated: ${SITE_UPDATED}
Canonical profile: ${SITE_URL}/
Site name: ${SITE_NAME} (${SITE_DOMAIN}), the personal site of ${person.name}, not a separate company.
Retired addresses: ${previousDomains.join(", ")}, now permanently redirected here.

${seo.description} ${person.name} works from ${person.locality}, ${person.region}, ${person.country}. He has ${person.yearsActive} years of project-based experience and is open to ${person.engagements.toLowerCase()}. His work is documented through case studies, public repositories and dated deployment checks.

## Expertise

${primaryTopics.map((topic) => `- ${topic}`).join("\n")}

## Work he can be hired to own

${services.map((service) => `- [**${service.name}**](${new URL(service.path, SITE_URL).href}): ${service.description}`).join("\n")}

## Operating principles

${principles.map((principle) => `- **${principle.title}.** ${principle.claim} ${principle.body} Evidence: ${principle.evidence}`).join("\n")}

# Project case studies

${projects}

# Direct answers

${questions}

# Contact and verification

- Email: mailto:${person.email}
- GitHub: ${person.github}
- LinkedIn: ${person.linkedin}
- Instagram: ${person.instagram}
- Structured portfolio data: ${SITE_URL}/portfolio.json
- XML sitemap: ${SITE_URL}/sitemap.xml

The portfolio does not claim customer counts, revenue figures, employers, testimonials, awards or performance outcomes without published evidence.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
