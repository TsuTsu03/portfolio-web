import { access, readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url);
const dist = new URL("dist/", root);
const fail = (message) => {
  throw new Error(message);
};
const assert = (condition, message) => {
  if (!condition) fail(message);
};
const read = (path) => readFile(new URL(path, dist), "utf8");

/**
 * The site constants are the source of truth, so the QA gate reads them rather
 * than restating them. A domain or date change then cannot pass a check that is
 * quietly asserting the previous value.
 */
const siteSource = await readFile(new URL("src/data/site.ts", root), "utf8");
const constant = (name) => {
  const match = siteSource.match(new RegExp(`export const ${name} = "([^"]+)"`));
  if (!match) fail(`site.ts: ${name} not found`);
  return match[1];
};
const SITE_URL = constant("SITE_URL");
const SITE_UPDATED = constant("SITE_UPDATED");

const projectDirs = (await readdir(new URL("work/", dist), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const serviceDirs = (await readdir(new URL("services/", dist), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const htmlPaths = [
  "index.html",
  ...projectDirs.map((slug) => `work/${slug}/index.html`),
  ...serviceDirs.map((slug) => `services/${slug}/index.html`),
];
const htmlDocuments = await Promise.all(htmlPaths.map(async (path) => [path, await read(path)]));
const seenTitles = new Set();
const seenDescriptions = new Set();
let homepageGraph = [];

for (const [path, html] of htmlDocuments) {
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] || "";
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1] || "";
  const expectedCanonical = path === "index.html"
    ? `${SITE_URL}/`
    : `${SITE_URL}/${path.replace(/\/index\.html$/, "")}`;

  assert((html.match(/<h1\b/gi) || []).length === 1, `${path}: expected exactly one h1`);
  assert(/<html[^>]+lang="en-PH"/i.test(html), `${path}: missing en-PH language`);
  assert(title.length >= 20 && title.length <= 75, `${path}: title length is ${title.length}`);
  assert(description.length >= 70 && description.length <= 180, `${path}: description length is ${description.length}`);
  assert(!seenTitles.has(title), `${path}: duplicate title`);
  assert(!seenDescriptions.has(description), `${path}: duplicate meta description`);
  seenTitles.add(title);
  seenDescriptions.add(description);
  assert(html.includes(`<link rel="canonical" href="${expectedCanonical}">`), `${path}: canonical is not self-referential`);
  assert(/<meta name="robots" content="index, follow, max-image-preview:large/i.test(html), `${path}: incomplete robots directive`);
  assert(/<meta property="og:image" content="https:\/\//i.test(html), `${path}: missing absolute social image`);
  for (const image of html.match(/<img\b[^>]*>/gi) || []) {
    assert(/\balt(?:=|\s|>)/i.test(image), `${path}: image without alt attribute`);
  }

  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  assert(match, `${path}: missing JSON-LD graph`);
  const graph = JSON.parse(match[1])["@graph"];
  assert(Array.isArray(graph), `${path}: JSON-LD graph is not an array`);

  const types = new Set(graph.map((node) => node["@type"]));
  if (path === "index.html") {
    homepageGraph = graph;
    for (const type of ["Person", "WebSite", "ProfilePage", "ItemList", "FAQPage", "ProfessionalService"]) {
      assert(types.has(type), `${path}: missing ${type} schema`);
    }
    const profile = graph.find((node) => node["@type"] === "ProfilePage");
    const itemList = graph.find((node) => node["@type"] === "ItemList");
    assert(profile.dateModified === SITE_UPDATED, `${path}: stale profile dateModified`);
    assert(profile.hasPart.length === projectDirs.length, `${path}: profile/project relationship mismatch`);
    assert(itemList.numberOfItems === projectDirs.length, `${path}: ItemList count mismatch`);
    assert(html.includes('id="services"'), `${path}: visible services section missing`);
  } else if (path.startsWith("work/")) {
    assert(types.has("Article"), `${path}: missing Article schema`);
    assert(types.has("BreadcrumbList"), `${path}: missing BreadcrumbList schema`);
    assert(types.has("SoftwareApplication") || types.has("CreativeWork"), `${path}: missing project schema`);
    const article = graph.find((node) => node["@type"] === "Article");
    const project = graph.find((node) => ["SoftwareApplication", "CreativeWork"].includes(node["@type"]));
    /* The case study is dated by its own verification check, so the gate
       verifies the shape and that the date is real, not that every page
       carries one shared value. */
    assert(/^\d{4}-\d{2}-\d{2}$/.test(article.dateModified || ""), `${path}: Article dateModified is not a plain date`);
    assert(article.dateModified <= SITE_UPDATED, `${path}: Article dateModified is in the future`);
    assert(article.dateModified === project.dateModified, `${path}: Article and project disagree on the date`);
    assert(article.about?.["@id"] === project["@id"], `${path}: Article does not reference project`);
    assert(project.mainEntityOfPage?.["@id"] === article["@id"], `${path}: project does not reference Article`);
  } else {
    for (const type of ["Person", "WebSite", "Service", "WebPage", "FAQPage", "BreadcrumbList"]) {
      assert(types.has(type), `${path}: missing ${type} schema`);
    }
    const page = graph.find((node) => node["@type"] === "WebPage");
    const service = graph.find((node) => node["@type"] === "Service");
    assert(page.dateModified === SITE_UPDATED, `${path}: stale WebPage dateModified`);
    assert(page.mainEntity?.["@id"] === service["@id"], `${path}: WebPage does not reference Service`);
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    assert(faq.mainEntity.length === 4, `${path}: service FAQ count mismatch`);
  }
}

const sitemap = await read("sitemap.xml");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert(sitemapUrls.length === htmlPaths.length, "sitemap: URL count does not match indexable HTML pages");
assert(sitemapUrls.includes(`${SITE_URL}/`), "sitemap: homepage missing");
for (const slug of projectDirs) {
  assert(sitemapUrls.includes(`${SITE_URL}/work/${slug}`), `sitemap: ${slug} missing`);
}
for (const slug of serviceDirs) {
  assert(sitemapUrls.includes(`${SITE_URL}/services/${slug}`), `sitemap: ${slug} missing`);
}
assert((sitemap.match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g) || []).length === htmlPaths.length, "sitemap: lastmod missing");

const robots = await read("robots.txt");
for (const crawler of ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "Bingbot"]) {
  assert(robots.includes(`User-agent: ${crawler}`), `robots.txt: ${crawler} missing`);
}
assert(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), "robots.txt: sitemap declaration missing");

for (const endpoint of ["llms.txt", "llms-full.txt", "portfolio.json", "humans.txt", "sitemap.xml"]) {
  await access(new URL(endpoint, dist));
}
const portfolio = JSON.parse(await read("portfolio.json"));
assert(portfolio.projects.length === projectDirs.length, "portfolio.json: project count mismatch");
assert(portfolio.expertise.length >= 8, "portfolio.json: expertise list is too thin");
assert(portfolio.lastUpdated === SITE_UPDATED, "portfolio.json: stale lastUpdated value");
assert(portfolio.site?.language === "en-PH", "portfolio.json: language missing");
for (const endpoint of ["llms.txt", "llms-full.txt", "sitemap.xml", "humans.txt"]) {
  assert(
    Object.values(portfolio.site.machineReadable).includes(`${SITE_URL}/${endpoint}`),
    `portfolio.json: ${endpoint} machine-readable link missing`
  );
}

const homepage = htmlDocuments.find(([path]) => path === "index.html")[1];
for (const service of portfolio.services) {
  assert(homepage.includes(service.name), `index.html: visible service missing: ${service.name}`);
}
for (const faq of portfolio.questions) {
  assert(homepage.includes(faq.question), `index.html: visible FAQ missing: ${faq.question}`);
}

const personSchema = homepageGraph.find((node) => node["@type"] === "Person");
const serviceSchema = homepageGraph.find((node) => node["@type"] === "ProfessionalService");
const offerIds = new Set(
  serviceSchema.hasOfferCatalog.itemListElement.map((offer) => offer["@id"])
);
assert(personSchema.makesOffer.length === portfolio.services.length, "schema: Person offer count mismatch");
for (const offer of personSchema.makesOffer) {
  assert(offerIds.has(offer["@id"]), `schema: dangling Person offer reference ${offer["@id"]}`);
}
const llms = await read("llms.txt");
for (const endpoint of ["llms-full.txt", "portfolio.json", "humans.txt", "sitemap.xml"]) {
  assert(llms.includes(`${SITE_URL}/${endpoint}`), `llms.txt: ${endpoint} link missing`);
}

for (const [path, html] of htmlDocuments) {
  for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
    const route = href.split("#")[0].split("?")[0];
    if (!route || route.startsWith("/_astro/") || /\.[a-z0-9]+$/i.test(route)) continue;
    const target = route === "/" ? new URL("index.html", dist) : new URL(`${route.replace(/^\//, "")}/index.html`, dist);
    try {
      await access(target);
    } catch {
      fail(`${path}: broken internal route ${href}`);
    }
  }
}

console.log(`SEO QA passed: ${htmlPaths.length} indexable pages, ${projectDirs.length} case studies, ${serviceDirs.length} service pages, 5 machine-readable endpoints.`);
