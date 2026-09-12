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
import { sortInsights } from "../lib/insights";
import { agents } from "../data/agents";

export const GET: APIRoute = async () => {
  const [work, insightEntries] = await Promise.all([
    getCollection("work"),
    getCollection("insights"),
  ]);
  const entries = work.sort((a, b) => a.data.order - b.data.order);
  const insights = sortInsights(insightEntries);

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

# AI agents with public demos

${agents.map((agent) => `## ${agent.name}\n\nCanonical page: ${SITE_URL}/agents/${agent.slug}\n\n${agent.summary}\n\nBuilt: ${agent.built}\n\nPublic demo boundary: ${agent.demo}`).join("\n\n")}

# Direct answers

${questions}

# Engineering insights

${insights.map((entry) => `## ${entry.data.title}\n\nCanonical article: ${SITE_URL}/insights/${entry.id}\n\n${entry.data.summary}\n\nTopic: ${entry.data.topic}. Related case studies: ${entry.data.relatedWork.map((id) => `${SITE_URL}/work/${id}`).join(", ")}.`).join("\n\n")}

# Contact and verification

- Email: mailto:${person.email}
- GitHub: ${person.github}
- LinkedIn: ${person.linkedin}
- Instagram: ${person.instagram}
- Résumé: ${SITE_URL}/resume
- Engineering insights: ${SITE_URL}/insights
- Structured portfolio data: ${SITE_URL}/portfolio.json
- XML sitemap: ${SITE_URL}/sitemap.xml
- RSS feed: ${SITE_URL}/rss.xml

The portfolio does not claim customer counts, revenue figures, employers, testimonials, awards or performance outcomes without published evidence.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
