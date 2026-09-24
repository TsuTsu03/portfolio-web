# Dark Knight portfolio rebrand

The portfolio now leads with a cinematic city scene, followed by a browsable project gallery and interactive agent showcase. The design uses charcoal, aged gold, condensed typography and square edges. Den Jansen Flores remains the primary identity in headings, metadata and structured data; DenForge is the visual wordmark.

## Visitor experience

- Project filters show all work, deployed builds or projects with public source. Counts come from the existing collection.
- Agent tabs expose Mara, Alfred and AI Front Desk, with links to their existing fictional-data demos. Arrow keys, Home and End move between tabs.
- About retains the original photograph and reversible manga interaction. Capabilities and engineering principles use native disclosures.
- Navigation, contact details, résumé, FAQs and existing routes remain available. Escape closes the mobile menu and restores focus.
- The shared palette, typography, header, footer and page spacing carry into case studies, services, insights, résumé and agent pages. Social previews and app icons use the new DF mark.

## Implementation

The site stays static-first Astro. Existing Archivo and Instrument Sans fonts remain self-hosted. The generated city artwork lives in `src/assets/brand/gotham-night.png`; Astro produces responsive AVIF and WebP variants. New homepage behavior uses small native scripts, and all projects and agent panels remain accessible without JavaScript.

Anime.js, shadcn/ui, Uiverse and 21st.dev were evaluated. The existing native disclosures, Astro components and CSS transitions fit this build without adding a client framework or animation dependency. Reduced-motion and forced-colors fallbacks remain in place.

## Verification

- Astro check: 49 files, zero errors, warnings or hints.
- Production build: 21 pages.
- ESLint and all eight existing tests pass.
- SEO checks pass for 20 indexable pages, eight case studies, two service pages, three insights and six machine-readable endpoints.
- Browser checks cover 320px, 390px, 768px and desktop layouts; project filters, agent mouse and keyboard selection, mobile menu navigation, theme switching and portrait toggle.
- Mobile checks on case study, agent, insights, résumé and service pages found no horizontal overflow.

These checks use desktop browser viewport emulation. Physical-device and microphone permission flows were not retested; embedded demo internals are unchanged.
