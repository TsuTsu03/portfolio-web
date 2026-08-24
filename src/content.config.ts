import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Projects.
 *
 * The schema is deliberately strict and mostly non-optional: a missing field
 * fails the build instead of quietly rendering an empty claim. Anything that
 * would read as a factual assertion (live deployment, public repository,
 * verified outcome) has to be stated explicitly per entry.
 */
const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: ({ image }) =>
    z
      .object({
        /** Zero-padded dossier number used across the UI. */
        caseNumber: z.string().regex(/^\d{3}$/),
        title: z.string().min(3),
        /** Short form used in dense UI (cards, breadcrumbs, nav). */
        shortTitle: z.string().min(2),
        summary: z.string().min(40),
        /**
         * Search-result description. Optional: when absent the summary is
         * trimmed instead, but a hand-written line under 158 characters reads
         * better in a result page than a cut-off sentence.
         */
        metaDescription: z.string().min(60).max(158).optional(),
        category: z.enum(["SaaS", "AI Systems", "Operations", "Commerce"]),
        sector: z.string(),

        role: z.string(),
        businessProblem: z.string().min(40),
        solution: z.string().min(40),
        /** What Den personally built. Never inferred — stated per entry. */
        ownership: z.array(z.string().min(4)).min(2),
        architecture: z
          .array(z.object({ decision: z.string(), rationale: z.string() }))
          .default([]),
        technologies: z.array(z.string()).min(2),
        /** Capabilities demonstrably present in the shipped build. */
        capabilities: z.array(z.string()).default([]),

        screenshot: image(),
        screenshotAlt: z.string().min(12),

        liveUrl: z.string().url().nullable(),
        repositoryUrl: z.string().url().nullable(),
        repositoryVisibility: z.enum(["public", "private"]),

        /** Verified deployment state, checked on `lastVerified`. */
        status: z.enum(["Deployed", "Deployment offline", "In development"]),
        featured: z.boolean().default(false),
        order: z.number().int().positive(),
        lastVerified: z.coerce.date(),
        /**
         * The date the case study itself was first published, when it is
         * known. Left unset rather than guessed: an invented publication date
         * is a claim the site cannot support, and `datePublished` is only
         * emitted when this is present.
         */
        published: z.coerce.date().optional(),
      })
      .strict()
      .refine((entry) => entry.status !== "Deployed" || entry.liveUrl !== null, {
        message: "A project marked Deployed must carry a liveUrl.",
        path: ["liveUrl"],
      })
      .refine(
        (entry) => entry.repositoryVisibility !== "public" || entry.repositoryUrl !== null,
        {
          message: "A project with a public repository must carry a repositoryUrl.",
          path: ["repositoryUrl"],
        }
      ),
});

export const collections = { work };
