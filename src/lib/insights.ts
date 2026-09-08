import type { CollectionEntry } from "astro:content";

/** Newest first, then title for deterministic output when dates match. */
export function sortInsights(
  entries: CollectionEntry<"insights">[]
): CollectionEntry<"insights">[] {
  return [...entries].sort(
    (a, b) =>
      b.data.updated.getTime() - a.data.updated.getTime() ||
      a.data.title.localeCompare(b.data.title)
  );
}
