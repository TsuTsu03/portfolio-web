# Gotham Protocol — Portfolio Redesign Spec

**Date:** 2026-08-15
**Project:** portfolio-app (Den Jansen Flores portfolio)
**Status:** Approved, implementing

## Goal

Restructure the portfolio's overall design into a Batman ambiance — specifically the Nolan
*Dark Knight* register: cold gunmetal, concrete, rain, restraint. The site should read as the
portfolio Batman would actually have: an operations dossier, not a fan page.

Constraint carried from prior decisions: recruiter clarity, crawlability, accessibility, and
performance are non-negotiable. The theme serves the content; it never eats it.

## Non-goals / IP boundary

Build **ambiance**, not DC assets. No bat logo, no "Wayne Enterprises" wordmark, no character
names as UI labels, no DC imagery. Gotham noir mood plus Jansen's real name and real content.
The word "Wayne" appears only as the internal name of the light persona in the toggle label,
which is a generic surname and carries no mark.

## Direction decisions

| Axis | Decision |
|---|---|
| Era | Nolan *Dark Knight* — cold gunmetal, concrete, rain, corporate-tactical restraint |
| Depth | Full dossier restructure **plus** dual identity (Day/Night persona toggle) |
| Motion budget | WebGL accepted — three.js + @react-three/fiber, lazy-loaded after LCP |
| Scene | "Descent Through Gotham" — one scene, two atmospheres, scroll drives camera descent |

## 1. Design system

### Palette — Night (Gotham, default)

| Token | Value | Use | Contrast on `--void` |
|---|---|---|---|
| `--void` | `#050708` | page base, blue-green-cast black | — |
| `--concrete` | `#0B0E11` | panel surface | — |
| `--concrete-raised` | `#131820` | hover / elevated surface | — |
| `--steel` | `#29323B` | 1px hairlines, borders | — |
| `--ash` | `#6D7A85` | muted / secondary text | ~6.5:1 |
| `--bone` | `#DCE4EA` | body text | ~14:1 |
| `--white-hot` | `#F2F6F9` | headings | ~16:1 |
| `--signal` | `#A8CBE2` | cold searchlight accent | ~11:1 |
| `--sodium` | `#E39A4F` | street-lamp amber — status only, rare | ~8.9:1 |

### Palette — Day (Wayne)

| Token | Value |
|---|---|
| `--void` | `#E7EAEC` |
| `--concrete` | `#F4F6F7` |
| `--concrete-raised` | `#FFFFFF` |
| `--steel` | `#C4CBD1` |
| `--ash` | `#5A646D` |
| `--bone` | `#161B20` |
| `--white-hot` | `#05080A` |
| `--signal` | `#1F5474` |
| `--sodium` | `#8A4E12` |

Two light sources is the Nolan signature: cold searchlight plus sodium practicals. Sodium stays
scarce — reserved for live status (availability dot, form success, active filter). Scarcity is
what makes it read expensive rather than decorative. Day mode is cold overcast, never warm.

### Typography

Self-hosted via `@fontsource-variable` so no third-party render-blocking request.

- **Display:** Archivo Variable — width axis pushed expanded + heavy for the name
- **Body:** Inter Variable
- **Data:** JetBrains Mono Variable — eyebrows, case numbers, coordinates, timestamps, tags

Replaces the current Google Fonts `<link>` (Geist / Hanken Grotesk / JetBrains Mono).

### Shape language

Hard corners. `--radius: 2px` maximum. Key panels carry a 14px 45° chamfer on one corner via
`clip-path` — armored, not friendly. No pills anywhere. All existing `rounded-xl` / `rounded-full`
treatments are removed.

### Texture

- Animated SVG `feTurbulence` grain, ~3.5% opacity, `mix-blend-mode: overlay`, fixed full-viewport
- Vignette
- Hairline concrete grid, masked toward center
- Grain animation freezes under `prefers-reduced-motion`

## 2. Structure — the dossier

Every section pairs a mono eyebrow with its unchanged semantic H2. Eyebrows are `<p>` / `<span>`,
never headings, so the heading outline and keyword targeting are untouched.

| Eyebrow | H2 (preserved) | Restructure |
|---|---|---|
| `01 — IDENTITY` | Den Jansen Flores | Role rotator restyled as a mono readout. Proof points become a 3-cell field-readout strip. CTAs: "View Case Files" / "Light the Signal". |
| `02 — OPERATOR FILE` | About Me | Monogram panel left; dossier `<dl>` right (ROLE, BASE, YEARS ACTIVE, SPECIALIZATION, STATUS). The 6 existing highlights become equipment-spec rows. |
| `03 — CASE FILES` | Featured Projects | 7 projects as case files: `CASE 001`–`007`, status stamp, chamfered screenshot frame with cold rim-light, mono tech tags, outcome line. Search + category filter preserved. |
| `04 — ARSENAL` | Skills & Technologies | Loadout tiers replace percentage bars (see below). Category filter preserved. |
| `05 — SIGNAL` | Get In Touch | The WebGL light cone peaks here and locks onto the form panel. CTA: "Send Signal". |
| — | footer | Thin mono strip: `METRO MANILA, PH · UTC+8 · AVAILABLE` |

**Header** becomes a fixed thin status bar: monogram left, nav center, persona toggle right
labeled by state (`WAYNE` / `GOTHAM`) rather than a sun/moon icon.

### Skill bars → loadout tiers

The `92%` / `88%` self-scored bars are removed. Self-assigned percentages are the loudest
AI-portfolio tell and recruiters discount them. The same underlying `level` data is re-expressed
as tiers, which fits the arsenal metaphor and reads more senior:

- `level >= 90` → **PRIMARY**
- `level 80–89` → **OPERATIONAL**
- `level < 80` → **SUPPORTING**

The per-skill `proof` line and the category filter are preserved unchanged.

## 3. Dual identity

The existing `ThemeProvider` light/dark becomes the persona switch.

Current bug being fixed: `ThemeProvider` defaults to `"light"` while every component is hardcoded
dark, so the toggle only flips a `.dark` class that nothing depends on. After this change the
provider defaults to Night, persists to `localStorage`, and honors `prefers-color-scheme` on first
visit.

On toggle:
- CSS custom properties crossfade over 500ms
- The WebGL scene relights — sun position, fog color, rain density → 0, window emissives → 0,
  exposure up

Same geometry, same content, two atmospheres. The world demonstrates the dual identity rather
than copy claiming it.

## 4. WebGL — "Descent Through Gotham"

Dependencies: `three` + `@react-three/fiber`. Deliberately **no** `@react-three/drei` (~40KB
saved); the handful of helpers needed are written directly.

### Layers

- **`Skyline`** — 4 parallax bands, each an `InstancedMesh` of boxes with seeded procedural
  placement. Windows drawn by a fract-grid fragment shader with pseudo-random lit cells; no
  textures loaded.
- **`Rain`** — instanced quads, fall and wind animated in the vertex shader. 12k desktop /
  3k coarse pointer / 0 under reduced motion.
- **`SignalCone`** — cone geometry with additive, view-dependent falloff. Fake volumetrics, not
  raymarched. Intensity tied to scroll progress, peaking at the Contact section.
- **`Fog`** — exponential height fog.

### Camera

Scroll progress drives camera Y, damped, written to a ref so there is zero React re-render per
frame: rooftop `y=180` → tower `y=70` → street `y=8`. Pointer parallax ±2°, disabled on coarse
pointers.

### Guardrails

- Canvas is `fixed`, `-z-10`, `pointer-events-none`, `aria-hidden="true"`
- All recruiter content stays in semantic HTML outside the canvas
- Three.js ships as its own lazy chunk, mounted on `requestIdleCallback` after LCP
- No WebGL support → CSS-only Gotham backdrop fallback
- `prefers-reduced-motion` → single static frame, no rain, no sweep
- Mobile: 2 skyline bands, 3k rain, no pointer parallax, static cone

## 5. Accessibility and SEO

- All body/heading text meets WCAG AA or better (see palette table)
- Focus rings: 2px `--signal`, 3px offset, never removed
- Canvas hidden from assistive tech; no content depends on it
- Heading outline and H1/H2 text unchanged in meaning
- Existing `index.html` meta, Open Graph, and JSON-LD (`Person` / `WebSite` / `FAQPage`) preserved
- `theme-color` meta updated per persona

## 6. File plan

**New**
- `src/scene/GothamScene.tsx`
- `src/scene/Skyline.tsx`
- `src/scene/Rain.tsx`
- `src/scene/SignalCone.tsx`
- `src/scene/useScrollDepth.ts`
- `src/components/GothamBackdrop.tsx` (CSS fallback)
- `src/components/ui/Panel.tsx`
- `src/components/ui/Eyebrow.tsx`
- `src/components/ui/DataRow.tsx`

**Modified**
- `src/index.css` — tokens, texture, utilities
- `src/App.tsx`
- `src/context/ThemeProvider.tsx` — persona, persistence, correct default
- All 7 components
- `index.html` — fonts, theme-color

**Deleted**
- `src/components/AuroraBackground.tsx` — superseded
- `src/App.css` — verified unimported, dead since the rebrand commit
- `bash.exe.stackdump` — untracked junk

## 7. Verification

- `npm run build` (tsc -b + vite build) clean
- `npm run lint` clean
- Dev server rendered and inspected in-browser: console clean, both personas, mobile viewport
- Contrast values confirmed against the palette table
