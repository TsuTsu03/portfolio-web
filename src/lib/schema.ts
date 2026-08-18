import type { CollectionEntry } from "astro:content";
import portrait from "../assets/portrait/den-jansen-flores.png";
import {
  faqs,
  person,
  services,
  primaryTopics,
  SITE_DOMAIN,
  SITE_NAME,
  SITE_UPDATED,
  SITE_URL,
  seo,
} from "../data/site";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Structured data is generated from the same values the page renders, so a
 * claim cannot appear in the graph without also appearing on screen.
 */

export function personNode(knowsAbout: string[]): Record<string, unknown> {
  const topics = [...new Set([...primaryTopics, ...knowsAbout])];

  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: person.name,
    alternateName: person.alternateName,
    givenName: "Den Jansen",
    familyName: "Flores",
    jobTitle: [person.role, person.secondRole],
    description: seo.description,
    url: `${SITE_URL}/`,
    email: `mailto:${person.email}`,
    telephone: person.phoneE164,
    image: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#primaryimage`,
      url: new URL(portrait.src, SITE_URL).href,
      contentUrl: new URL(portrait.src, SITE_URL).href,
      width: portrait.width,
      height: portrait.height,
      caption: `${person.name}, ${person.role} and ${person.secondRole}`,
    },
    sameAs: [person.github, person.linkedin, person.instagram],
    brand: { "@type": "Brand", name: SITE_NAME, url: `${SITE_URL}/` },
    address: {
      "@type": "PostalAddress",
      addressLocality: person.locality,
      addressRegion: person.region,
      addressCountry: person.countryCode,
    },
    knowsAbout: topics,
    hasOccupation: {
      "@type": "Occupation",
      name: person.role,
      description:
        "Full-stack product engineering across operational SaaS, secure web platforms and agentic AI workflows.",
      occupationLocation: { "@type": "Country", name: person.country },
      skills: topics.join(", "),
    },
    seeks: {
      "@type": "Demand",
      name: person.engagements,
    },
    knowsLanguage: [{ "@type": "Language", name: "English", alternateName: "en" }],
    workLocation: {
      "@type": "Place",
      name: `${person.locality}, ${person.region}, ${person.country}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: person.locality,
        addressRegion: person.region,
        addressCountry: person.countryCode,
      },
    },
    /* Each offer is also listed inside the visible services catalogue. */
    makesOffer: services.map((_, index) => ({
      "@id": `${SITE_URL}/#service-offer-${index + 1}`,
    })),
    mainEntityOfPage: { "@id": `${SITE_URL}/#profilepage` },
  };
}

export function websiteNode(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: `${person.name} | Portfolio`,
    /* The domain name and the person are the same entity to a reader; this is
       how an answer engine is told the same thing. */
    alternateName: [SITE_NAME, SITE_DOMAIN, `${SITE_NAME} portfolio`],
    description: seo.description,
    inLanguage: "en-PH",
    copyrightHolder: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

export function profilePageNode(
  entries: CollectionEntry<"work">[] = []
): Record<string, unknown> {
  return {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: `${SITE_URL}/`,
    name: seo.title,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
    dateModified: SITE_UPDATED,
    inLanguage: "en-PH",
    primaryImageOfPage: { "@id": `${SITE_URL}/#primaryimage` },
    significantLink: [
      `${SITE_URL}/#work`,
      `${SITE_URL}/#capabilities`,
      `${SITE_URL}/#contact`,
    ],
    hasPart: entries.map((entry) => ({
      "@id": `${SITE_URL}/work/${entry.id}#article`,
    })),
  };
}

/** Built from the same array the FAQ section renders. */
export function faqNode(): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    inLanguage: "en-PH",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: faqs.map((faq, index) => ({
      "@type": "Question",
      "@id": `${SITE_URL}/#faq-${index + 1}`,
      position: index + 1,
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * What Den is actually available to do, as a catalogue rather than prose.
 *
 * This is the node that answers "who builds operational SaaS in Metro Manila"
 * and "can he work with a team outside the Philippines" without an answer
 * engine having to infer either from the page copy.
 */
export function servicesNode(): Record<string, unknown> {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#services`,
    name: `${person.name}: full-stack and agentic AI engineering`,
    description:
      "Independent full-stack development and agentic AI engineering for operational SaaS, secure web platforms and controlled AI workflows, delivered remotely from Metro Manila.",
    url: `${SITE_URL}/#services`,
    provider: { "@id": PERSON_ID },
    founder: { "@id": PERSON_ID },
    email: `mailto:${person.email}`,
    telephone: person.phoneE164,
    priceRange: "Project and contract based",
    inLanguage: "en-PH",
    address: {
      "@type": "PostalAddress",
      addressLocality: person.locality,
      addressRegion: person.region,
      addressCountry: person.countryCode,
    },
    areaServed: [
      { "@type": "Country", name: person.country },
      { "@type": "AdministrativeArea", name: `${person.region}, ${person.country}` },
      { "@type": "Place", name: "Remote worldwide" },
    ],
    availableLanguage: [{ "@type": "Language", name: "English" }],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engineering services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        "@id": `${SITE_URL}/#service-offer-${index + 1}`,
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          serviceType: service.name,
          url: new URL(service.path, SITE_URL).href,
          provider: { "@id": PERSON_ID },
          areaServed: { "@type": "Place", name: "Remote worldwide" },
        },
      })),
    },
  };
}

export function servicePageNode(service: {
  title: string;
  shortTitle: string;
  metaDescription: string;
  slug: string;
  keywords: string[];
}): Record<string, unknown> {
  const url = `${SITE_URL}/services/${service.slug}`;

  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    alternateName: service.shortTitle,
    description: service.metaDescription,
    serviceType: service.shortTitle,
    url,
    provider: { "@id": PERSON_ID },
    areaServed: [
      { "@type": "AdministrativeArea", name: `${person.region}, ${person.country}` },
      { "@type": "Country", name: person.country },
      { "@type": "Place", name: "Remote worldwide" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: {
        "@type": "ContactPoint",
        telephone: person.phoneE164,
        email: person.email,
        contactType: "sales",
        availableLanguage: ["English"],
      },
    },
    termsOfService: `${SITE_URL}/#contact`,
    keywords: service.keywords.join(", "),
  };
}

export function serviceWebPageNode(service: {
  title: string;
  metaDescription: string;
  slug: string;
}): Record<string, unknown> {
  const url = `${SITE_URL}/services/${service.slug}`;

  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: service.title,
    description: service.metaDescription,
    dateModified: SITE_UPDATED,
    inLanguage: "en-PH",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": `${url}#service` },
    mainEntity: { "@id": `${url}#service` },
    author: { "@id": PERSON_ID },
  };
}

export function serviceFaqNode(service: {
  slug: string;
  faqs: { question: string; answer: string }[];
}): Record<string, unknown> {
  const url = `${SITE_URL}/services/${service.slug}`;

  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url: `${url}#service-questions-heading`,
    inLanguage: "en-PH",
    isPartOf: { "@id": `${url}#webpage` },
    about: { "@id": `${url}#service` },
    mainEntity: service.faqs.map((faq, index) => ({
      "@type": "Question",
      "@id": `${url}#faq-${index + 1}`,
      position: index + 1,
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** A crawlable list that connects the profile page to every documented build. */
export function portfolioItemListNode(
  entries: CollectionEntry<"work">[]
): Record<string, unknown> {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#portfolio`,
    name: `${person.name} portfolio projects`,
    description:
      "Seven software case studies covering operational SaaS, healthcare, logistics, workforce systems, commerce and applied AI.",
    numberOfItems: entries.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/work/${entry.id}`,
      name: entry.data.title,
    })),
  };
}

/**
 * A deployed build is described as SoftwareApplication; anything without a
 * reachable deployment falls back to CreativeWork, which claims less.
 */
export function projectNode(
  entry: CollectionEntry<"work">,
  imageUrl: string
): Record<string, unknown> {
  const { data } = entry;
  const url = `${SITE_URL}/work/${entry.id}`;
  const deployed = data.status === "Deployed" && data.liveUrl !== null;

  const base = {
    "@id": `${url}#project`,
    name: data.title,
    alternateName: data.shortTitle,
    description: data.summary,
    url,
    image: imageUrl,
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    dateModified: data.lastVerified.toISOString().slice(0, 10),
    keywords: [...data.technologies, ...data.capabilities].join(", "),
    about: [data.sector, data.category, ...data.capabilities],
    featureList: data.capabilities,
    mainEntityOfPage: { "@id": `${url}#article` },
    isPartOf: { "@id": WEBSITE_ID },
    sameAs: [data.liveUrl, data.repositoryUrl].filter(Boolean),
    ...(data.repositoryUrl ? { codeRepository: data.repositoryUrl } : {}),
  };

  if (!deployed) {
    return { "@type": "CreativeWork", ...base };
  }

  return {
    "@type": "SoftwareApplication",
    ...base,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web browser",
    applicationSubCategory: data.category,
  };
}

/** The case-study page itself, separate from the software or creative work it describes. */
export function caseStudyArticleNode(
  entry: CollectionEntry<"work">,
  imageUrl: string
): Record<string, unknown> {
  const { data } = entry;
  const url = `${SITE_URL}/work/${entry.id}`;

  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: data.title,
    name: `${data.shortTitle} case study`,
    description: data.summary,
    url,
    mainEntityOfPage: url,
    image: imageUrl,
    dateModified: SITE_UPDATED,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    about: { "@id": `${url}#project` },
    articleSection: `${data.sector} ${data.category}`,
    keywords: [...data.technologies, ...data.capabilities].join(", "),
    inLanguage: "en-PH",
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function breadcrumbNode(
  trail: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: new URL(step.path, SITE_URL).href,
    })),
  };
}
