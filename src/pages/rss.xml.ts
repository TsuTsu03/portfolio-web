import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { person, SITE_NAME, SITE_URL } from "../data/site";
import { sortInsights } from "../lib/insights";

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const GET: APIRoute = async () => {
  const entries = sortInsights(await getCollection("insights"));

  const items = entries
    .map((entry) => {
      const url = `${SITE_URL}/insights/${entry.id}`;
      return `    <item>
      <title>${escapeXml(entry.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(entry.data.description)}</description>
      <category>${escapeXml(entry.data.topic)}</category>
      <pubDate>${entry.data.published.toUTCString()}</pubDate>
      <dc:creator>${escapeXml(person.name)}</dc:creator>
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${person.name} engineering insights`)}</title>
    <link>${SITE_URL}/insights</link>
    <description>${escapeXml(`Engineering notes connected to documented builds by ${person.name}.`)}</description>
    <language>en-PH</language>
    <generator>${SITE_NAME}</generator>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
