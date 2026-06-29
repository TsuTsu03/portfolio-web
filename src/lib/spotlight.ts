import type { MouseEvent } from "react";

/**
 * Cursor-following spotlight (Chronark-style card hover glow).
 * Writes the pointer position into CSS custom properties that the
 * `.spotlight-card::before` radial gradient reads. Attach to any element
 * that also carries the `spotlight-card` class.
 */
export function handleSpotlight(event: MouseEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
}
