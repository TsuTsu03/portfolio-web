import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  audiences,
  faqs,
  person,
  primaryTopics,
  services,
  seo,
  previousDomains,
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

  const body = {
    schemaVersion: "1.0",
    lastUpdated: SITE_UPDATED,
    canonicalUrl: `${SITE_URL}/`,
    site: {
      name: `${person.name} portfolio`,
      brand: SITE_NAME,
      domain: SITE_DOMAIN,
      previousDomains: [...previousDomains],
      title: seo.title,
      description: seo.description,
      language: "en-PH",
      machineReadable: {
        summary: `${SITE_URL}/llms.txt`,
        fullContext: `${SITE_URL}/llms-full.txt`,
        sitemap: `${SITE_URL}/sitemap.xml`,
        humans: `${SITE_URL}/humans.txt`,
        rss: `${SITE_URL}/rss.xml`,
      },
      resume: `${SITE_URL}/resume`,
      insights: `${SITE_URL}/insights`,
    },
    person: {
      name: person.name,
      alternateName: person.alternateName,
      roles: [person.role, person.secondRole],
      location: `${person.locality}, ${person.region}, ${person.country}`,
      timezone: person.timezone,
      yearsActive: person.yearsActive,
      availability: person.availability,
      openTo: person.engagements,
      email: person.email,
      phone: person.phoneE164,
      profiles: {
        github: person.github,
        linkedin: person.linkedin,
        instagram: person.instagram,
      },
    },
    audiences,
    expertise: primaryTopics,
    services,
    workingPrinciples: principles.map((principle) => ({
      title: principle.title,
      claim: principle.claim,
      detail: principle.body,
      evidence: principle.evidence,
    })),
    projects: entries.map((entry) => ({
      id: entry.id,
      caseNumber: entry.data.caseNumber,
      title: entry.data.title,
      shortTitle: entry.data.shortTitle,
      pageUrl: `${SITE_URL}/work/${entry.id}`,
      sector: entry.data.sector,
      category: entry.data.category,
      role: entry.data.role,
      summary: entry.data.summary,
      problem: entry.data.businessProblem,
      solution: entry.data.solution,
      ownership: entry.data.ownership,
      architecture: entry.data.architecture,
      technologies: entry.data.technologies,
      capabilities: entry.data.capabilities,
      status: entry.data.status,
      lastVerified: entry.data.lastVerified.toISOString().slice(0, 10),
      liveUrl: entry.data.liveUrl,
      repositoryUrl: entry.data.repositoryUrl,
      repositoryVisibility: entry.data.repositoryVisibility,
    })),
    aiAgents: agents.map((agent) => ({
      name: agent.name,
      role: agent.role,
      summary: agent.summary,
      project: agent.built,
      publicDemo: agent.demo,
      demoUrl: `${SITE_URL}${agent.demoUrl}`,
      screenshot: `${SITE_URL}${agent.screenshot}`,
      url: `${SITE_URL}/agents/${agent.slug}`,
    })),
    insights: insights.map((entry) => ({
      id: entry.id,
      title: entry.data.title,
      description: entry.data.description,
      summary: entry.data.summary,
      topic: entry.data.topic,
      url: `${SITE_URL}/insights/${entry.id}`,
      published: entry.data.published.toISOString().slice(0, 10),
      updated: entry.data.updated.toISOString().slice(0, 10),
      relatedWork: entry.data.relatedWork.map((id) => `${SITE_URL}/work/${id}`),
      keywords: entry.data.keywords,
    })),
    questions: faqs,
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
