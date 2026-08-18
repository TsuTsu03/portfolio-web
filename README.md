# Den Jansen Flores — Portfolio

Personal portfolio of Den Jansen Flores, Senior Full-Stack Developer and Agentic AI
Engineer. A static Astro site: no client-side framework, no hydration, one small
progressive-enhancement script.

Live: https://denforge.it.com

## Stack

| Concern     | Choice                                                        |
| ----------- | ------------------------------------------------------------- |
| Framework   | Astro 7, static output                                         |
| Interaction | Native HTML (`<details>`), inline SVG, CSS, and vanilla JS       |
| Styling     | Tailwind CSS v4 + CSS custom properties, one locked dark theme |
| Content     | Astro Content Collections with a strict Zod schema             |
| Images      | Astro `<Picture>` — AVIF and WebP, responsive `srcset`         |
| Fonts       | Two self-hosted variable faces: Archivo and Instrument Sans    |
| Deployment  | Vercel, static                                                 |

Metadata is set in a system monospace stack, so it costs no extra download.

## Commands

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`build` runs `astro check` first, so a type error fails the build.

```bash
npm run lint
```

```bash
npm test
```

```bash
node scripts/generate-assets.mjs
```

Regenerates `public/og.png`, `favicon.svg` and the icon set. Run it after any
change to the palette or the monogram.

```bash
node scripts/generate-portrait.mjs
```

Regenerates the archival `src/assets/portrait/den-mono.webp` derivative from the
original photograph. The live About state now uses the original full-colour source.

`src/assets/portrait/den-manga-vigilante.png` is the composition-matched counterpart
used by the About interaction. Astro converts it into responsive AVIF/WebP variants,
while the live CSS treatment locks it to black-and-white manga ink and screentone.

## Design system

Art direction: a nocturne editorial layout. Deep charcoal ground, graphite
surfaces, gunmetal rules, ivory type, and a single tungsten-amber accent that is
only used for warmth, attention or action. There is no light theme and no theme
switch: `:root` in `src/styles/global.css` is the whole palette.

Rules that keep it coherent:

- **One accent.** If something is amber, it is either the primary action, a live
  deployment, or a proven capability.
- **Two type cuts.** `.display` is Archivo at expanded width for openers,
  `.display-tight` is the narrower cut for long headings. `.meta` is monospace
  and reserved for technical metadata — never as a decorative eyebrow.
- **A different composition per section.** Hero is a centred full-viewport
  title card; About is one large portrait against the copy; Work runs lead, feature,
  counter, pair and index; Approach is typographic; Capabilities is grouped
  lists; Contact is a single large statement. No section repeats another's
  layout family.
- **Component classes live in `@layer components`** so Tailwind utilities can
  still override them.

### Motion

Motion stays purposeful: a page-entry stagger, viewport reveals, section ticks,
sparse rain, two slow fog banks, pointer-tracked practical light, a small bat-flight
accent around the centred name and a CSS scroll-timeline progress line. Project
evidence gets a local inspection light; the About portrait carries the only major
transformation sequence. There is no
animation library, scroll listener, scroll hijacking or parallax.
`prefers-reduced-motion: reduce` parks the weather and resolves all reveals and
the identity transformation immediately, so nothing is hidden as a side effect.

**One trap worth knowing:** `body` must keep `background-color: transparent`. A
block-level descendant's background paints after negative-z-index children, so
an opaque body sits on top of the light shaft, the architectural rules and the
vignette and hides all three. `<html>` carries the base colour.

### The portrait

The About section shows the original photograph uncropped, in full colour, with
responsive Astro output at high image quality.

On hover, focus or tap it becomes a cinematic **black-and-white manga panel**. The
alternate portrait preserves the face, physique, pose and civilian clothing while the
setting becomes a rain-soaked industrial night city with wet steel, fog, a distant
searchlight and a loose flight of bats. A pointer-origin circular reveal, deep vignette,
ink texture, screentone and pale page sweep handle the transition. The interaction has
no visible instruction or active-state tag. Astro supplies responsive AVIF/WebP output
and lazy-loads the manga image.

The control is a real `<button>` with `aria-pressed`, so pointer, keyboard and
touch all reach it.

## Content

Projects live in `src/content/work/*.md` and are validated by the schema in
`src/content.config.ts`. The schema is strict and mostly non-optional on purpose:
a missing field fails the build rather than rendering an empty claim.

Two rules the schema enforces:

- A project marked `Deployed` must carry a `liveUrl`.
- A project with `repositoryVisibility: public` must carry a `repositoryUrl`.

`lastVerified` records when the links were last checked by hand. `metaDescription`
is optional per project: when it is missing the summary is trimmed at a word
boundary, so no search snippet is cut mid-word.

Identity facts — name, role, contact details, availability, FAQs — live in
`src/data/site.ts`; capabilities in `src/data/capabilities.ts`; working
principles in `src/data/principles.ts`. They feed the visible copy, the JSON-LD
and `/llms.txt` from one place, so structured data cannot claim something the
page does not show.

`src/data/data.test.ts` guards the one thing that breaks quietly: a capability
citing a project that no longer exists.

### Résumé link

`resumeUrl` in `src/data/site.ts` is `null`, because the previous Google Drive
URL returned 404 on 2026-08-15. While it is null, the résumé buttons are not
rendered and the site says the résumé is sent on request. Set it to a working URL
and the buttons reappear.

## Discoverability

- `sitemap.xml`, generated at build, excluding the 404 page.
- Two indexable service pages for full-stack and agentic AI work in Metro Manila,
  including freelance, contract and full-time search intent.
- `robots.txt` explicitly allowing AI and answer-engine crawlers.
- `/llms.txt`, generated from the content collection in llms.txt link-list format.
- JSON-LD: `Person`, `WebSite`, `ProfilePage`, `ItemList`, `FAQPage` and
  `ProfessionalService` on the home page;
  `SoftwareApplication` (or `CreativeWork` where there is no live deployment),
  plus `BreadcrumbList`, on each project page.
- Canonical URLs, Open Graph and Twitter cards on every page.
- A `ProfessionalService` node with an `OfferCatalog` built from `services` in
  `src/data/site.ts`. The same service names and descriptions are visible under
  `#services`, so the structured data does not claim hidden content.
- Machine feeds carry the same data as the page: `/llms.txt`, `/llms-full.txt`
  (now including services and working principles), `/portfolio.json`,
  `/humans.txt`.

## Verified

Measured against the local Astro preview on 2026-08-18 after the voice,
typography and SEO/AEO/GEO pass:

- `astro check`: 0 errors. `eslint`: clean. `vitest`: 8 passed. Eleven static
  routes built. SEO QA passed across ten indexable pages: the home page, seven
  case studies and two service pages.
- axe-core: 0 violations on the home page. Composited colour contrast remains a
  manual-review item because the atmospheric layers prevent a conclusive automated
  result.
- The home page and an AI case study were checked at 390px, 768px and 1440px with
  no horizontal overflow. The hero contains no featured-project markup.
- No failed requests, browser console errors or page errors.
- Seven decorative bats render on desktop and four on mobile. Their motion stops
  under reduced motion, and forced colors removes them while retaining the H1.
- Portrait click and `aria-pressed` state passed in the final browser run. The
  idle portrait retains the original colour, while the active panel changes the
  complete setting rather than applying a monochrome filter.
- Reduced motion: rain parked, all reveal content visible and the manga state
  immediate.
- Forced colors: atmosphere, manga layer, ink treatment and interaction hint are
  removed; the unchanged source portrait remains.

The earlier Lighthouse mobile baseline was Performance 99, Accessibility 100,
Best Practices 100 and SEO 100. Lighthouse was not rerun for this image-only pass.
