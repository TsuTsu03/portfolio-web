// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://denforge.it.com",
  trailingSlash: "never",

  integrations: [mdx()],

  // Hover-only prefetch: case-study routes get warmed on intent, nothing is
  // speculatively fetched for visitors who never leave the landing page.
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },

  build: {
    // Measured both ways on a Slow 4G / 4x-CPU trace against the production
    // build. Linking the stylesheet: LCP 2719ms with a render-blocking request
    // on the critical path. Inlining it: LCP 2502ms and the render-blocking
    // insight disappears. The sheet is ~74kB raw but ~12kB gzip, so the cost
    // was the round trip rather than the bytes.
    //
    // (An earlier measurement on a much lighter version of this page found the
    // two options equivalent. They are not, once the stylesheet is big enough
    // to actually block.)
    inlineStylesheets: "always",
  },

  // Honour a PORT handed down by the environment; fall back to Astro's default.
  server: {
    port: Number(process.env.PORT) || 4321,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
