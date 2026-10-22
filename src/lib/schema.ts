import type { CollectionEntry } from "astro:content";
import portrait from "../assets/portrait/den-jansen-flores.png";
import {
  certifications,
  education,
  experience,
  faqs,
  person,
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
    jobTitle: [person.practiceRole, person.currentTitle, person.role, person.thirdRole, person.secondRole],
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
      caption: `${person.name}, ${person.role}, ${person.thirdRole} and ${person.secondRole}`,
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
    hasOccupation: [
      {
        "@type": "Occupation",
        name: person.practiceRole,
        description:
          "Custom software solutions for businesses: web platforms, Android and iOS apps and AI automation, scoped from the business workflow and delivered end to end.",
        occupationLocation: { "@type": "Country", name: person.country },
        skills: "Business process analysis, solution design, full-stack development, mobile app development, AI automation",
      },
      {
        "@type": "Occupation",
        name: person.role,
        description:
          "Full-stack product engineering across operational SaaS, secure web platforms and agentic AI workflows.",
        occupationLocation: { "@type": "Country", name: person.country },
        skills: topics.join(", "),
      },
      {
        "@type": "Occupation",
        name: person.thirdRole,
        description:
          "Cross-platform Android and iOS app development with React Native, Expo, Flutter and Dart.",
        occupationLocation: { "@type": "Country", name: person.country },
        skills: "React Native, Expo, Flutter, Dart, Android, iOS, offline-first storage, camera pipelines",
      },
    ],
    /* Former employer and university, both named on the résumé page. */
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: education.school,
      },
      ...[...new Set(experience.map((role) => role.organization))]
        .filter((organization) => organization !== "Self-employed")
        .map((organization) => ({ "@type": "Organization", name: organization })),
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: education.degree,
        credentialCategory: "degree",
        recognizedBy: { "@type": "CollegeOrUniversity", name: education.school },
      },
      ...certifications.map((cert) => ({
        "@type": "EducationalOccupationalCredential",
        name: cert.name,
        credentialCategory: "certification",
        dateCreated: cert.date,
        recognizedBy: { "@type": "Organization", name: cert.issuer },
      })),
    ],
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
    worksFor: { "@type": "Organization", name: person.currentEmployer },
    mainEntityOfPage: { "@id": `${SITE_URL}/#profilepage` },
  };
}

export function websiteNode(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    /* Google treats this as the preferred site name, so keep it identical to
       the name shown by the homepage title, heading and Open Graph metadata. */
    name: person.name,
    /* The brand, common shorter personal name and lowercase hostname are
       ordered fallbacks if Google cannot use the preferred personal name. */
    alternateName: [SITE_NAME, person.alternateName, SITE_DOMAIN],
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
      `${SITE_URL}/resume`,
      `${SITE_URL}/insights`,
    ],
    hasPart: entries.map((entry) => ({
      "@id": `${SITE_URL}/work/${entry.id}#article`,
    })),
  };
}

export function resumeWebPageNode(): Record<string, unknown> {
  const url = `${SITE_URL}/resume`;

  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: `${person.name} résumé`,
    description:
      "Résumé of Den Jansen Flores with work history, skills, certifications, education, selected web and mobile case studies, availability and contact details.",
    dateModified: SITE_UPDATED,
    inLanguage: "en-PH",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
  };
}

export function insightsCollectionNode(
  entries: CollectionEntry<"insights">[]
): Record<string, unknown> {
  const url = `${SITE_URL}/insights`;

  return {
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: `${person.name} engineering insights`,
    description:
      "Engineering notes drawn from documented SaaS, logistics and agentic AI builds by Den Jansen Flores.",
    dateModified: SITE_UPDATED,
    inLanguage: "en-PH",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    mainEntity: { "@id": `${url}#articles` },
    hasPart: entries.map((entry) => ({
      "@id": `${SITE_URL}/insights/${entry.id}#article`,
    })),
  };
}

export function insightsItemListNode(
  entries: CollectionEntry<"insights">[]
): Record<string, unknown> {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/insights#articles`,
    name: `${person.name} engineering articles`,
    numberOfItems: entries.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/insights/${entry.id}`,
      name: entry.data.title,
    })),
  };
}

export function insightArticleNode(
  entry: CollectionEntry<"insights">
): Record<string, unknown> {
  const { data } = entry;
  const url = `${SITE_URL}/insights/${entry.id}`;

  return {
    "@type": "Article",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: url,
    headline: data.title,
    name: data.title,
    description: data.description,
    image: `${SITE_URL}/og.png`,
    datePublished: data.published.toISOString().slice(0, 10),
    dateModified: data.updated.toISOString().slice(0, 10),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    articleSection: data.topic,
    keywords: data.keywords.join(", "),
    about: data.keywords,
    mentions: data.relatedWork.map((id) => ({
      "@id": `${SITE_URL}/work/${id}#project`,
    })),
    inLanguage: "en-PH",
    isPartOf: { "@id": WEBSITE_ID },
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
      `${entries.length} software case studies covering web platforms, Android and iOS apps, education technology, operational SaaS, healthcare, logistics, workforce systems, commerce and applied AI.`,
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
    applicationCategory: data.category === "Mobile" ? "MobileApplication" : "BusinessApplication",
    operatingSystem: data.category === "Mobile" ? "Android, iOS" : "Web browser",
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
    /* The page's own verification date. A site-wide date told every case study
       it had changed today, which was neither true nor useful as a signal. */
    dateModified: data.lastVerified.toISOString().slice(0, 10),
    ...(data.published
      ? { datePublished: data.published.toISOString().slice(0, 10) }
      : {}),
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
