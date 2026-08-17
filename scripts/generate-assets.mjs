/**
 * Social preview, favicon and touch icons.
 *
 * Typographic rather than illustrated: the same charcoal ground, ivory type and
 * single tungsten accent the site uses, plus the hard rectangular frame the
 * header mark carries. Run with `node scripts/generate-assets.mjs` whenever the
 * identity or the palette changes.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");

const INK = "#0c0e10";
const SURFACE = "#16191c";
const LINE = "#23282d";
const LINE_CONTROL = "#5c656d";
const TEXT = "#eceae4";
const TEXT_DIM = "#9ba6ae";
const ACCENT = "#e0a05c";

const SANS = "Archivo, Helvetica, Arial, sans-serif";
const MONO = "Consolas, 'DejaVu Sans Mono', monospace";

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="warm" cx="0.82" cy="0.18" r="0.55">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="${INK}"/>
  <rect width="1200" height="630" fill="url(#warm)"/>

  <!-- Architectural frame: two posts and a header, the way the portrait is framed -->
  <rect x="0" y="0" width="1200" height="72" fill="${SURFACE}"/>
  <line x1="0" y1="72" x2="1200" y2="72" stroke="${LINE}" stroke-width="1"/>
  <rect x="1046" y="72" width="26" height="558" fill="${SURFACE}"/>
  <rect x="1128" y="72" width="10" height="558" fill="${SURFACE}"/>

  <!-- Monogram plate -->
  <g transform="translate(72 20)">
    <rect x="0" y="0" width="34" height="34" fill="none" stroke="${LINE_CONTROL}" stroke-width="1.5"/>
    <text x="17" y="23" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" letter-spacing="0.4" fill="${TEXT}">DJF</text>
  </g>
  <text x="122" y="43" font-family="${SANS}" font-size="19" font-weight="600" fill="${TEXT_DIM}">jansen-dev.vercel.app</text>

  <text x="72" y="290" font-family="${SANS}" font-size="110" font-weight="800" letter-spacing="-5" fill="${TEXT}">Den Jansen</text>
  <text x="72" y="392" font-family="${SANS}" font-size="110" font-weight="800" letter-spacing="-5" fill="${TEXT}">Flores</text>

  <rect x="72" y="440" width="64" height="3" fill="${ACCENT}"/>

  <text x="72" y="500" font-family="${SANS}" font-size="30" font-weight="600" letter-spacing="-0.4" fill="${TEXT_DIM}">Senior Full-Stack Developer / Agentic AI Engineer</text>

  <line x1="72" y1="548" x2="1000" y2="548" stroke="${LINE}" stroke-width="1"/>
  <text x="72" y="586" font-family="${MONO}" font-size="19" font-weight="600" letter-spacing="2" fill="${TEXT_DIM}">SYSTEMS BUILT FOR PRESSURE</text>
  <text x="1000" y="586" text-anchor="end" font-family="${MONO}" font-size="19" font-weight="600" letter-spacing="2" fill="${ACCENT}">METRO MANILA / UTC+8</text>
</svg>`;

/** Square mark: the same framed monogram, nothing else. */
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${INK}"/>
  <rect x="8" y="8" width="48" height="48" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>
  <text x="32" y="40" text-anchor="middle" font-family="${SANS}" font-size="22" font-weight="700" letter-spacing="0.5" fill="${TEXT}">DJF</text>
</svg>`;

await mkdir(publicDir, { recursive: true });

await sharp(Buffer.from(ogSvg))
  .png({ quality: 90, compressionLevel: 9 })
  .toFile(join(publicDir, "og.png"));

for (const size of [180, 192, 512]) {
  await sharp(Buffer.from(iconSvg)).resize(size, size).png().toFile(join(publicDir, `icon-${size}.png`));
}

await writeFile(join(publicDir, "og.svg"), ogSvg, "utf8");
await writeFile(join(publicDir, "favicon.svg"), iconSvg, "utf8");

console.log("Generated og.png, og.svg, favicon.svg, icon-180.png, icon-192.png, icon-512.png");
