# Dark Knight portfolio rebrand

The portfolio leads with an architectural charcoal backdrop and a faceted bat emblem. About follows the hero, before the project gallery and interactive agent showcase. The design uses aged gold, condensed typography and square edges. Den Jansen Flores remains the primary identity in headings, metadata and structured data; DenForge is the visual wordmark.

## Visitor experience

- Homepage sections and navigation introduce About before Work and AI Agents. Section numbers follow the same order.
- Project filters show all work, deployed builds or projects with public source. Counts come from the existing collection.
- Agent tabs expose Mara, Alfred and AI Front Desk, with links to their existing fictional-data demos. Arrow keys, Home and End move between tabs.
- About retains the original photograph and reversible manga interaction. Capabilities and engineering principles use native disclosures.
- Navigation, contact details, résumé, FAQs and existing routes remain available. Escape closes the mobile menu and restores focus.
- The shared palette, typography, header, footer and page spacing carry into case studies, services, insights, résumé and agent pages. Social previews and app icons use the new DF mark.

## Implementation

The site stays static-first Astro. Existing Archivo and Instrument Sans fonts remain self-hosted. The hero no longer imports or requests the city artwork. Its replacement uses CSS planes and an inline SVG emblem. Homepage behavior uses small native scripts, and all projects and agent panels remain accessible without JavaScript.

Anime.js, shadcn/ui, Uiverse and 21st.dev were evaluated. The existing native disclosures, Astro components and CSS transitions fit this build without adding a client framework or animation dependency. Reduced-motion and forced-colors fallbacks remain in place.

## Motion refinement, 14 October 2026

- Hero copy enters in a short sequence. The emblem draws its outline while one light pass crosses the background. These effects finish, rather than looping while someone reads.
- Section headings, project cards and process rows enter once as they reach the viewport. A short stagger groups items that arrive together. Entrances still work when a visitor pauses at the top for more than five seconds.
- Content is visible before JavaScript runs. The observer adds a temporary animation only on arrival; there is no hidden resting state. Keyboard focus cancels an entrance immediately.
- Reduced-motion preferences disable movement, including when changed during a visit. High-contrast mode removes decorative artwork. Small screens use a compact emblem above the copy.
- Existing buttons and project links retain their hover feedback; hero arrows now respond to keyboard focus as well.

### Refinement verification

- `npm run build`: 49 Astro files checked with zero errors, warnings or hints; 21 pages built.
- `npm run lint`, all eight existing tests and `npm run qa:seo` pass.
- Built homepage contains the inline emblem and no reference to `gotham-night`.
- Browser views checked at 320, 390, 768 and 1440 pixels, plus the default desktop viewport. Project filtering returns seven live builds; the mobile menu closes with Escape and restores focus; arrow-key selection activates Alfred's panel.
- Both themes checked. The hero name now keeps its light color against the charcoal background when the surrounding site uses the light theme. Captured browser logs contain no warnings or errors.
- Reduced-motion, high-contrast and JavaScript-free fallbacks reviewed in source. These preferences were not emulated in the browser. No physical-device testing was performed.

## Original rebrand verification, 24 September 2026

- Astro check: 49 files, zero errors, warnings or hints.
- Production build: 21 pages.
- ESLint and all eight existing tests pass.
- SEO checks pass for 20 indexable pages, eight case studies, two service pages, three insights and six machine-readable endpoints.
- Browser checks cover 320px, 390px, 768px and desktop layouts; project filters, agent mouse and keyboard selection, mobile menu navigation, theme switching and portrait toggle.
- Mobile checks on case study, agent, insights, résumé and service pages found no horizontal overflow.

These checks use desktop browser viewport emulation. Physical-device and microphone permission flows were not retested; embedded demo internals are unchanged.
