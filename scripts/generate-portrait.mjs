/**
 * Portrait derivative.
 *
 * One output: the full frame, uncropped, in monochrome. No zoom, no reframing —
 * the About section shows the whole photograph as taken. The night-identity
 * state on top of it is drawn live in SVG, so there is no second image to load
 * and no generated likeness anywhere in the repository.
 *
 *   node scripts/generate-portrait.mjs
 */

import sharp from "sharp";

const SOURCE = "src/assets/portrait/den-jansen-flores.png";
const OUT = "src/assets/portrait";

await sharp(SOURCE)
  .grayscale()
  .linear(1.12, -16)
  .toFile(`${OUT}/den-mono.webp`);

console.log("portrait derivative written to", OUT);
