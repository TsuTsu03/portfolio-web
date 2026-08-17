---
date: 2026-08-17
project: portfolio-app
status: proposed
---

# Batman Dark Knight Portrait and Portfolio Enhancement

## Goal

Upgrade the current portrait hover from a lightweight SVG night identity into a convincing Batman transformation, then carry the same Dark Knight atmosphere through the full portfolio without hiding recruiter-facing content or making the site feel like a fan page.

## Chosen direction

Use two aligned portrait states:

1. The existing monochrome photograph remains the untouched default state.
2. A generated counterpart uses the same framing, pose, physique and facial identity, with every visible part of the body transformed into Batman's Dark Knight costume: black segmented armor, chest insignia, gauntlets, cowl, pointed ears, neck armor and cape.

The generated image may use recognizable Batman and Dark Knight costume details. Accurate likeness, matching pose and photographic alignment take priority over inventing an unrelated face or body.

## Portrait interaction

- Desktop hover begins with a cold rim light at the pointer position.
- A soft radial mask expands from the pointer, revealing the costume image beneath the original photograph.
- Armor highlights, rain and a brief tungsten reflection arrive in a short stagger so the change reads as a transformation rather than a crossfade.
- Moving the pointer across the portrait subtly shifts the reveal origin and lighting, without tilting the photograph or hijacking the cursor.
- Pointer exit reverses the transformation.
- Tap toggles the transformed state on touch devices.
- Keyboard activation uses the existing real button and `aria-pressed` state.
- Reduced-motion mode uses an immediate crossfade with no sweep, rain movement or light tracking.

## Image generation and quality control

- Source: `src/assets/portrait/den-jansen-flores.png`.
- Preserve the source aspect ratio, camera position, seated pose, shoulder width, arm placement, skin tone, jaw, mouth and recognizable facial proportions.
- Replace the cap, sunglasses and clothing with the costume while keeping the face recognizable.
- Costume covers all body regions visible in the photograph; no partial polo-shirt remnants.
- Retain the original architectural framing, but transform the garden background into a rain-dark metropolitan night scene that aligns with the site palette.
- Reject and regenerate outputs with changed identity, extra limbs, warped hands, altered build, detached armor, illegible insignia or mismatched framing.
- Store the original source unchanged and create optimized AVIF/WebP variants through Astro's image pipeline.

## Site-wide visual system

Keep the current Nocturne Editorial structure and content, then add a cinematic atmospheric layer:

- Fixed, low-contrast rain field built with CSS gradients and a small number of DOM layers.
- Slow fog banks and architectural shadow bands between major sections.
- A restrained searchlight sweep behind the hero and contact section.
- Section-number rails and small technical coordinates that reinforce the metropolitan surveillance mood without replacing useful headings.
- Project imagery gains cursor-aware cold light, slight depth translation, an armor-like edge highlight and a short amber scan line.
- Section entrances use staggered opacity, translation and rule drawing; no scroll hijacking, pinning or constant background camera motion.
- Header progress line, hero light and portrait reveal share one animation timing system.
- Mobile receives simplified rain, no pointer tracking and no transform-heavy card depth.

## Architecture

- Astro remains static-first; all identity, work, proof, FAQ and contact content stays in semantic HTML.
- CSS custom properties drive pointer coordinates, reveal radius, atmospheric intensity and shared timing.
- One small vanilla TypeScript script coordinates pointer input, touch toggles, IntersectionObserver reveals and requestAnimationFrame-throttled scroll state.
- No React island, Three.js, WebGL, GSAP or animation-library dependency is required for this pass.
- Existing design tokens remain the source of truth. New cold-blue, rain and armor values are added as named tokens instead of hard-coded throughout components.

## Accessibility and fallback

- Portrait remains a button with visible focus and accurate `aria-pressed` state.
- Generated costume image is decorative because the source portrait already carries the meaningful alt text.
- The effect works with mouse, keyboard and touch.
- `prefers-reduced-motion: reduce` removes tracking, rain animation, sweep motion and delayed reveals.
- Forced-colors mode removes atmospheric overlays.
- JavaScript failure leaves all content visible and the original portrait usable.

## Performance limits

- Costume image is lazy-loaded with responsive sources.
- Mobile source width is capped to the rendered portrait size.
- Atmospheric layers use transform and opacity only.
- Pointer and scroll updates are requestAnimationFrame-throttled.
- No filter animation on large full-page layers.
- Target: retain zero layout shift and keep Lighthouse accessibility, best-practices and SEO scores at 100 in the local production preview.

## Verification

1. Inspect generated portrait at full size for likeness, anatomy and complete costume coverage.
2. Run `npm run build`, `npm run lint` and `npm test`.
3. Test hover entry, pointer movement, exit reversal, keyboard activation and touch toggle.
4. Test reduced motion and forced colors.
5. Check home page at 390, 768, 1440 and 1920 pixel widths for overflow and image alignment.
6. Run axe and Lighthouse against the production preview.
7. Confirm critical identity, project, proof, FAQ and contact content remains present without JavaScript.

## Scope boundary

This pass changes portrait art, atmosphere, motion and visual detail. It does not rewrite project facts, add fabricated proof, change the content collection, restore WebGL, or alter case-study URLs.
