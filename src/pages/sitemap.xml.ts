import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE_UPDATED, SITE_URL } from "../data/site";
import { servicePages } from "../data/service-pages";

const escapeXml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export const GET: APIRoute = async () => {
  const entries = (await getCollection("work")).sort((a, b) => a.data.order - b.data.order);
  const urls = [
    { path: "/", lastmod: SITE_UPDATED, priority: "1.0" },
    ...entries.map((entry) => ({
      path: `/work/${entry.id}`,
      lastmod: SITE_UPDATED,
      priority: entry.data.featured ? "0.9" : "0.8",
    })),
    ...servicePages.map((service) => ({
      path: `/services/${service.slug}`,
      lastmod: SITE_UPDATED,
      priority: "0.9",
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, lastmod, priority }) => `  <url>
    <loc>${escapeXml(new URL(path, SITE_URL).href)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
