import type { APIRoute } from "astro";
import { person, previousDomains, SITE_NAME, SITE_UPDATED, SITE_URL } from "../data/site";

export const GET: APIRoute = () => {
  const body = `/* PERSON */
Name: ${person.name}
Roles: ${person.role}, ${person.secondRole}
Location: ${person.locality}, ${person.region}, ${person.country}
Contact: ${person.email}
GitHub: ${person.github}
LinkedIn: ${person.linkedin}
Instagram: ${person.instagram}

/* SITE */
Name: ${SITE_NAME}
Canonical: ${SITE_URL}/
Previous addresses: ${previousDomains.join(", ")} (redirected)
Language: English (Philippines)
Technology: Astro, TypeScript, Tailwind CSS
Design direction: restrained noir, editorial typography, static-first delivery
Last updated: ${SITE_UPDATED}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
