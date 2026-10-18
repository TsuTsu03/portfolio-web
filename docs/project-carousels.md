# Project carousels

The homepage gives each kind of work its own presentation. Project records, screenshots, case-study links and both site themes remain the source of truth.

- Web applications use a wide browser preview beside the project description. Small edge previews, a progress line and square arrow controls establish a horizontal reading direction.
- Mobile applications use a screen gallery above an open, two-column caption. The gallery settles vertically as it approaches the centre, with named app selectors and round controls beneath it. Narrow screens stack the caption.
- AI agents use a numbered directory beside a workspace preview. Switching agents fades the outgoing panel and introduces the next screenshot from the navigation direction. Details follow with a short delay. The directory becomes a row of selectors on narrow screens.

## Interaction

Web and mobile tracks retain native scrolling and centre snapping. Their controller measures slide geometry once per animation frame, updates the active state, and announces position after scrolling settles. Rapid button presses advance the pending destination. Home, End and arrow keys work when the track has focus; focusing a project link brings its card into view immediately. Resizing preserves the selected project, and filtering returns to the first matching project.

Agent rotation starts only when the visitor presses Play. Hover, keyboard focus, a hidden browser tab, an offscreen carousel and reduced-motion preferences pause rotation. Explicit Play can start while its own button retains focus; the next focus movement into content pauses it again. Manual selection stops rotation. Inactive panels are excluded from focus and assistive technology. A horizontal touch gesture changes agents without opening the preview link.

Reduced motion removes decorative transforms and transitions and makes track navigation immediate. Without JavaScript, web and mobile remain native scrolling lists and every agent appears as a readable article. Controls that require JavaScript stay hidden.

## Implementation choices

The implementation uses Astro, CSS and native browser scrolling. It adds no dependencies. [Anime.js](https://animejs.com/), [shadcn/ui's carousel](https://ui.shadcn.com/docs/components/base/carousel), [Uiverse](https://uiverse.io/) and [21st.dev](https://21st.dev/) were evaluated. Their component and motion references informed control grouping and restrained transitions; this static Astro surface does not need an additional framework or animation runtime.

## Verification

The change was reviewed in a browser at 320, 390, 768 and 1440 pixels. Checks covered dark and light themes, overflow, filters, rapid navigation, endpoints, keyboard selection, resize preservation, optional agent playback, manual pause, and inactive-panel focus exclusion. A separate local page with scripts removed verified that all project links and all three agent articles remain available.

Automated accessibility checks on the three sections found no WCAG A/AA violations in either theme, including the 320-pixel layout. Build, lint, the existing eight tests and the search metadata checks passed. The agent interaction harness also covered reduced motion, swipe focus, and playback pause conditions.

These are browser and source checks. Physical touch hardware and operating-system reduced-motion emulation were not tested.
